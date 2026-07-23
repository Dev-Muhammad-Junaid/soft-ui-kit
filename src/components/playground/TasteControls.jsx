import { BorderBeam } from "border-beam";
import { MetalFx } from "metal-fx";
import { Button, Card, Slider } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";
import {
  BORDER_BEAM_COLORS,
  BORDER_BEAM_OPTIONS,
  METAL_FX_OPTIONS,
  TWEAK_GROUPS,
} from "./tweakControls";

const CORE_GROUPS = TWEAK_GROUPS.filter((g) => g.tier === "core");
const EFFECT_GROUPS = TWEAK_GROUPS.filter((g) => g.tier === "effects");

function OptionChips({ options, value, onChange, ariaLabel }) {
  return (
    <div className="taste-option-chips" role="group" aria-label={ariaLabel}>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`taste-option-chip${value === opt.id ? " is-active" : ""}`}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

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

function EffectsTasteBlock({
  tweaks,
  updateTweak,
  effects,
  updateEffect,
  effectTheme,
  resetEffects,
}) {
  const beamOn = effects.borderBeam !== "off";
  const metalOn = effects.metalFx !== "off";

  const previewCard = (
    <div className="taste-effect-preview__card glass sheen">
      <strong>Preview surface</strong>
      <p>Try beam + metal before you commit them in product UI.</p>
      {metalOn ? (
        <MetalFx variant="button" preset={effects.metalFx} theme={effectTheme} strength={0.85}>
          <button type="button" className="ui-btn ui-btn--primary ui-btn--sm metal-host">
            Metal CTA
          </button>
        </MetalFx>
      ) : (
        <Button size="sm">Primary CTA</Button>
      )}
    </div>
  );

  return (
    <div className="taste-effects">
      <header className="taste-tier-head">
        <h2>Effects</h2>
        <p>Optional motion packs — pick a look, preview live, turn off anytime.</p>
      </header>

      {EFFECT_GROUPS.map((group) => (
        <TweakGroupSection
          key={group.id}
          group={group}
          tweaks={tweaks}
          updateTweak={updateTweak}
        />
      ))}

      <section className="taste-group">
        <header className="taste-group__head">
          <h3>Border beam</h3>
          <p>Traveling / pulse glow around cards and panels (`border-beam`)</p>
        </header>
        <OptionChips
          ariaLabel="Border beam style"
          options={BORDER_BEAM_OPTIONS}
          value={effects.borderBeam}
          onChange={(id) => updateEffect("borderBeam", id)}
        />
        {beamOn ? (
          <>
            <p className="taste-option-label">Beam color</p>
            <OptionChips
              ariaLabel="Border beam color"
              options={BORDER_BEAM_COLORS}
              value={effects.borderBeamColor}
              onChange={(id) => updateEffect("borderBeamColor", id)}
            />
          </>
        ) : null}
      </section>

      <section className="taste-group">
        <header className="taste-group__head">
          <h3>Metal FX</h3>
          <p>Liquid-metal ring on buttons (`metal-fx`) — use sparingly</p>
        </header>
        <OptionChips
          ariaLabel="Metal FX preset"
          options={METAL_FX_OPTIONS}
          value={effects.metalFx}
          onChange={(id) => updateEffect("metalFx", id)}
        />
      </section>

      <section className="taste-group taste-effect-preview">
        <header className="taste-group__head">
          <h3>Live preview</h3>
          <p>
            {beamOn || metalOn
              ? "Your current effect mix on a sample surface"
              : "Effects are off — turn one on above to preview"}
          </p>
        </header>
        {beamOn ? (
          <BorderBeam
            size={effects.borderBeam}
            colorVariant={effects.borderBeamColor}
            theme={effectTheme}
            strength={0.85}
          >
            {previewCard}
          </BorderBeam>
        ) : (
          previewCard
        )}
        {(beamOn || metalOn) && (
          <div className="row" style={{ marginTop: 10 }}>
            <Button variant="secondary" size="sm" onClick={resetEffects}>
              Clear effects
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export function TasteControls({ compact = false }) {
  const {
    tweaks,
    updateTweak,
    resetTweaks,
    resetEffects,
    themeId,
    setThemeId,
    themes,
    effects,
    updateEffect,
    effectTheme,
  } = useTheme();

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
        <p>Radius, glass, color, and depth — the kit chrome first.</p>
      </header>

      <div className="taste-groups">
        {CORE_GROUPS.map((group) => (
          <TweakGroupSection
            key={group.id}
            group={group}
            tweaks={tweaks}
            updateTweak={updateTweak}
          />
        ))}
      </div>

      <EffectsTasteBlock
        tweaks={tweaks}
        updateTweak={updateTweak}
        effects={effects}
        updateEffect={updateEffect}
        effectTheme={effectTheme}
        resetEffects={resetEffects}
      />

      <div className="row" style={{ marginTop: 8 }}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            resetTweaks();
            resetEffects();
          }}
        >
          Reset all
        </Button>
        <Button
          size="sm"
          onClick={() => {
            navigator.clipboard?.writeText(
              JSON.stringify({ themeId, tweaks, effects }, null, 2),
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
