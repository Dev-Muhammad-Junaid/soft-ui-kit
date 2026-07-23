import { useState } from "react";
import { Palette } from "lucide-react";
import { useTheme } from "../../theme/ThemeProvider";

/** Floating theme switcher — separate from Taste playground. */
export function ThemeFab() {
  const { themeId, selectTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="theme-fab-wrap">
      {open ? (
        <div className="theme-fab-menu glass sheen" role="listbox" aria-label="Themes">
          <p className="theme-fab-menu__hint">Shift + 1–{themes.length}</p>
          {themes.map((theme, i) => (
            <button
              key={theme.id}
              type="button"
              role="option"
              aria-selected={themeId === theme.id}
              className={`theme-fab-menu__item${themeId === theme.id ? " is-active" : ""}`}
              onClick={() => {
                selectTheme(theme.id);
                setOpen(false);
              }}
            >
              <span className={`theme-swatch theme-swatch--${theme.id}`} aria-hidden="true" />
              <span className="theme-fab-menu__name">{theme.name}</span>
              <kbd className="theme-fab-menu__kbd">⇧{i + 1}</kbd>
            </button>
          ))}
        </div>
      ) : null}
      <button
        type="button"
        className="theme-fab glass sheen"
        aria-expanded={open}
        aria-label="Change theme"
        title={`Themes · Shift+1–${themes.length}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Palette size={18} />
        <span>Theme</span>
      </button>
    </div>
  );
}
