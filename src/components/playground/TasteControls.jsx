import { Button, Card, Slider } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";
import { TWEAK_GROUPS } from "./tweakControls";

function TweakGroupSection({ group, tweaks, updateTweak }) {
  return (
    <section className="taste-group">
      <header className="taste-group__head">
        <h3>{group.title}</h3>
        <p>{group.hint}</p>
      </header>
      <div className="stack">
        {group.controls.map((control) => (
          <Slider
            key={control.key}
            label={control.label}
            hint={control.tip}
            min={control.min}
            max={control.max}
            step={control.step}
            value={Number(tweaks[control.key])}
            onChange={(value) => updateTweak(control.key, value)}
          />
        ))}
      </div>
    </section>
  );
}

export function TasteControls({ compact = false }) {
  const { tweaks, updateTweak, resetTweaks, themeId, setThemeId, themes } = useTheme();

  return (
    <div className={`taste-controls${compact ? " taste-controls--compact" : ""}`}>
      <div className="taste-controls__themes">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={`theme-chip${themeId === theme.id ? " is-active" : ""}`}
            onClick={() => setThemeId(theme.id)}
          >
            {theme.name}
          </button>
        ))}
      </div>

      <header className="taste-tier-head">
        <h2>Core UI</h2>
        <p>Radius, glass, color, and depth — shared by the UI Kit and Charts.</p>
      </header>

      <div className="taste-groups">
        {TWEAK_GROUPS.map((group) => (
          <TweakGroupSection
            key={group.id}
            group={group}
            tweaks={tweaks}
            updateTweak={updateTweak}
          />
        ))}
      </div>

      <div className="row" style={{ marginTop: 8 }}>
        <Button
          variant="secondary"
          size="sm"
          onClick={resetTweaks}
        >
          Reset all
        </Button>
        <Button
          size="sm"
          onClick={() => {
            navigator.clipboard?.writeText(
              JSON.stringify({ themeId, tweaks }, null, 2),
            );
          }}
        >
          Copy JSON
        </Button>
      </div>
    </div>
  );
}

export function TastePanelCard({ title = "Taste controls", description }) {
  return (
    <Card title={title} description={description}>
      <TasteControls />
    </Card>
  );
}
