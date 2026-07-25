import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_EFFECTS } from "../components/playground/tweakControls";

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
  ringShine: 0.85,
  ringThickness: 2.5,
  ringSpread: 6,
  ringGlow: 0.55,
  shadowIntensity: 1,
  radiusScale: 1,
  accentHue: 199,
  surfaceLift: 1,
  hoverLift: 0.2,
  motionStrength: 1,
};

export { DEFAULT_EFFECTS };


const ThemeContext = createContext(null);

function applyDocumentTheme(themeId, tweaks) {
  const root = document.documentElement;
  root.dataset.theme = themeId;

  const hue = tweaks.accentHue ?? THEME_ACCENT_HUE[themeId] ?? 199;

  root.style.setProperty("--t-glass-blur", `${tweaks.glassBlur}px`);
  root.style.setProperty("--t-glass-opacity", String(tweaks.glassOpacity));
  root.style.setProperty("--t-glass-sat", String(tweaks.glassSaturation));
  root.style.setProperty("--t-rim", String(tweaks.rimStrength));
  root.style.setProperty("--t-ring-shine", String(tweaks.ringShine));
  root.style.setProperty("--t-ring-thickness", `${tweaks.ringThickness}px`);
  root.style.setProperty("--t-ring-spread", `${tweaks.ringSpread}px`);
  root.style.setProperty("--t-ring-glow", String(tweaks.ringGlow));
  root.style.setProperty("--t-shadow", String(tweaks.shadowIntensity));
  root.style.setProperty("--t-radius", String(tweaks.radiusScale));
  root.style.setProperty("--t-accent-h", String(hue));
  root.style.setProperty("--t-lift", String(tweaks.surfaceLift));
  root.style.setProperty("--t-hover-lift", String(tweaks.hoverLift));
  root.style.setProperty("--t-motion", String(tweaks.motionStrength));

  // Keep semantic accent tokens in sync with the active hue (themes may override in CSS).
  const isDark = themeId === "dusk" || themeId === "midnight";
  root.style.setProperty("--accent", `hsl(${hue} 85% ${isDark ? 58 : 48}%)`);
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
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeIdState] = useState(() => {
    const saved = localStorage.getItem("suk-theme") || "soft-glass";
    return LEGACY_THEMES[saved] || saved;
  });
  const [tweaks, setTweaks] = useState(() => {
    try {
      const raw = localStorage.getItem("suk-tweaks");
      return raw ? { ...DEFAULT_TWEAKS, ...JSON.parse(raw) } : DEFAULT_TWEAKS;
    } catch {
      return DEFAULT_TWEAKS;
    }
  });
  const [effects, setEffects] = useState(() => {
    try {
      const raw = localStorage.getItem("suk-effects");
      if (!raw) return DEFAULT_EFFECTS;
      const parsed = JSON.parse(raw);
      const { metalFx: _legacyMetal, ...rest } = parsed;
      return { ...DEFAULT_EFFECTS, ...rest };
    } catch {
      return DEFAULT_EFFECTS;
    }
  });

  function selectTheme(nextId) {
    const id = LEGACY_THEMES[nextId] || nextId;
    setThemeIdState(id);
    setTweaks((prev) => ({
      ...prev,
      accentHue: THEME_ACCENT_HUE[id] ?? prev.accentHue,
    }));
  }

  const effectTheme = themeId === "dusk" || themeId === "midnight" ? "dark" : "light";

  useEffect(() => {
    applyDocumentTheme(themeId, tweaks);
    localStorage.setItem("suk-theme", themeId);
  }, [themeId, tweaks]);

  useEffect(() => {
    localStorage.setItem("suk-tweaks", JSON.stringify(tweaks));
  }, [tweaks]);

  useEffect(() => {
    localStorage.setItem("suk-effects", JSON.stringify(effects));
    document.documentElement.dataset.beam = effects.borderBeam;
    delete document.documentElement.dataset.metal;
  }, [effects]);

  // Shift+1 … Shift+N cycles themes by index (1-based).
  useEffect(() => {
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
  }, []);

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
      effects,
      effectTheme,
      setEffects,
      updateEffect: (key, value) => {
        setEffects((prev) => ({ ...prev, [key]: value }));
      },
      resetEffects: () => setEffects(DEFAULT_EFFECTS),
    }),
    [themeId, tweaks, effects, effectTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
