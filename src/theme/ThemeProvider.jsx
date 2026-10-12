import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const THEMES = [
  {
    id: "soft-glass",
    name: "Soft Glass",
    description: "Frosted pills, pastel badges, soft depth",
  },
  {
    id: "crystal",
    name: "Crystal",
    description: "Cooler glass, sharper rims, airy translucency",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Colorful glow, vibrant rings, playful energy",
  },
  {
    id: "dusk",
    name: "Dusk",
    description: "Dark blue glass with luminous accents",
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Warm charcoal panels with amber highlights",
  },
];

/** Default accent hue per theme — keeps focus/hover rings on-brand. */
export const THEME_ACCENT_HUE = {
  "soft-glass": 199,
  crystal: 198,
  aurora: 280,
  dusk: 205,
  midnight: 32,
};

const LEGACY_THEMES = {
  "neo-clay": "soft-glass",
  ink: "soft-glass",
};

export const DEFAULT_TWEAKS = {
  glassBlur: 22,
  glassOpacity: 0.55,
  glassSaturation: 1.35,
  rimStrength: 0.92,
  shadowIntensity: 1,
  radiusScale: 1,
  accentHue: 199,
  surfaceLift: 1,
  hoverLift: 0.2,
  motionStrength: 1,
};



const ThemeContext = createContext(null);

// Storage can be missing (SSR) or throw (privacy mode, blocked site data).
function readStorage(key) {
  try {
    return typeof window === "undefined" ? null : window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* non-fatal: theme still applies for this session */
  }
}

function readJson(key) {
  const raw = readStorage(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function applyDocumentTheme(themeId, tweaks) {
  const root = document.documentElement;
  root.dataset.theme = themeId;

  const hue = tweaks.accentHue ?? THEME_ACCENT_HUE[themeId] ?? 199;

  root.style.setProperty("--t-glass-blur", `${tweaks.glassBlur}px`);
  root.style.setProperty("--t-glass-opacity", String(tweaks.glassOpacity));
  root.style.setProperty("--t-glass-sat", String(tweaks.glassSaturation));
  root.style.setProperty("--t-rim", String(tweaks.rimStrength));
  root.style.setProperty("--t-shadow", String(tweaks.shadowIntensity));
  root.style.setProperty("--t-radius", String(tweaks.radiusScale));
  root.style.setProperty("--t-accent-h", String(hue));
  root.style.setProperty("--t-lift", String(tweaks.surfaceLift));
  root.style.setProperty("--t-hover-lift", String(tweaks.hoverLift));
  root.style.setProperty("--t-motion", String(tweaks.motionStrength));

  // Keep semantic accent + primary chart tokens in sync with the active hue.
  const isDark = themeId === "dusk" || themeId === "midnight";
  const accent = `hsl(${hue} 85% ${isDark ? 58 : 48}%)`;
  root.style.setProperty("--accent", accent);
  root.style.setProperty(
    "--accent-soft",
    isDark ? `hsl(${hue} 42% 20%)` : `hsl(${hue} 90% 92%)`,
  );
  root.style.setProperty(
    "--accent-ink",
    isDark ? `hsl(${hue} 90% 78%)` : `hsl(${hue} 70% 28%)`,
  );
  root.style.setProperty("--focus-ring", `hsl(${hue} 85% ${isDark ? 62 : 52}%)`);
  root.style.setProperty("--focus-glow", `hsl(${hue} 90% 60% / 0.28)`);
  // Chart series follow Taste hue; offsets keep multi-series readable.
  root.style.setProperty("--chart-1", accent);
  root.style.setProperty(
    "--chart-2",
    `hsl(${(hue + 48) % 360} 75% ${isDark ? 68 : 58}%)`,
  );
  root.style.setProperty(
    "--chart-3",
    `hsl(${(hue + 130) % 360} 70% ${isDark ? 58 : 46}%)`,
  );
  root.style.setProperty(
    "--chart-4",
    `hsl(${(hue + 210) % 360} 80% ${isDark ? 62 : 52}%)`,
  );
}

/**
 * @param defaultTheme  theme used when nothing is saved yet
 * @param persist       remember theme and Taste tweaks in localStorage
 * @param hotkeys       Shift+1…5 switches themes (demo-friendly; turn off in product apps)
 */
export function ThemeProvider({
  children,
  defaultTheme = "soft-glass",
  persist = true,
  hotkeys = true,
}) {
  const [themeId, setThemeIdState] = useState(() => {
    const saved = (persist && readStorage("suk-theme")) || defaultTheme;
    const id = LEGACY_THEMES[saved] || saved;
    return THEMES.some((t) => t.id === id) ? id : "soft-glass";
  });
  const [tweaks, setTweaks] = useState(() => {
    const saved = persist ? readJson("suk-tweaks") : null;
    if (saved) {
      // Drop dials from the removed glass-ring effect that older saves still carry.
      const { ringShine: _s, ringThickness: _t, ringSpread: _p, ringGlow: _g, ...rest } = saved;
      return { ...DEFAULT_TWEAKS, ...rest };
    }
    // Seed the accent from the resolved theme, so a saved Aurora loads violet, not the default sky.
    return { ...DEFAULT_TWEAKS, accentHue: THEME_ACCENT_HUE[themeId] ?? DEFAULT_TWEAKS.accentHue };
  });

  function selectTheme(nextId) {
    const id = LEGACY_THEMES[nextId] || nextId;
    setThemeIdState(id);
    setTweaks((prev) => ({
      ...prev,
      accentHue: THEME_ACCENT_HUE[id] ?? prev.accentHue,
    }));
  }

  useEffect(() => {
    applyDocumentTheme(themeId, tweaks);
    if (persist) writeStorage("suk-theme", themeId);
  }, [themeId, tweaks, persist]);

  useEffect(() => {
    if (persist) writeStorage("suk-tweaks", JSON.stringify(tweaks));
  }, [tweaks, persist]);


  // Shift+1 … Shift+N cycles themes by index (1-based).
  useEffect(() => {
    if (!hotkeys) return undefined;
    function onKeyDown(e) {
      if (!e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }
      const digit = e.code.match(/^Digit([1-9])$/)?.[1];
      if (!digit) return;
      const index = Number(digit) - 1;
      if (index < 0 || index >= THEMES.length) return;
      e.preventDefault();
      selectTheme(THEMES[index].id);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hotkeys]);

  const value = useMemo(
    () => ({
      themeId,
      setThemeId: selectTheme,
      selectTheme,
      themes: THEMES,
      tweaks,
      setTweaks,
      updateTweak: (key, value) => {
        setTweaks((prev) => ({ ...prev, [key]: value }));
      },
      resetTweaks: () =>
        setTweaks({
          ...DEFAULT_TWEAKS,
          accentHue: THEME_ACCENT_HUE[themeId] ?? DEFAULT_TWEAKS.accentHue,
        }),
      applyTaste: ({ theme, tweaks: nextTweaks }) => {
        if (theme) {
          const id = LEGACY_THEMES[theme] || theme;
          setThemeIdState(id);
        }
        if (nextTweaks) setTweaks({ ...DEFAULT_TWEAKS, ...nextTweaks });
      },
    }),
    [themeId, tweaks],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
