import { BorderBeam } from "border-beam";
import { Bell, Check, Sparkles } from "../icons";
import { GlassRing } from "../effects/GlassRing";
import { Button, Card, Slider } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";
import {
  BORDER_BEAM_COLORS,
  BORDER_BEAM_OPTIONS,
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

  const previewCard = (
    <div className="taste-effect-preview__card glass sheen">
      <strong>Preview surface</strong>
      <p>Border beam wraps kit surfaces at full strength.</p>
      <div className="preview-row" style={{ gap: 10 }}>
        <GlassRing size={40} tone="mint" active>
          <Check size={16} />
        </GlassRing>
        <Button size="sm">Primary CTA</Button>
      </div>
    </div>
  );

  return (
    <div className="taste-effects">
      <header className="taste-tier-head">
        <h2>Effects</h2>
        <p>
          Glass rings + border beam — mirrored on the Effects page. UI Kit chrome
          stays in Core above.
        </p>
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
          <h3>Ring preview</h3>
          <p>Live badges using the dials above</p>
        </header>
        <div className="preview-row preview-row--rings">
          {[
            { tone: "sky", icon: <Sparkles size={16} />, active: true },
            { tone: "mint", icon: <Check size={16} />, soft: true },
            { tone: "lavender", icon: <Bell size={16} />, active: true },
          ].map((ring) => (
            <div key={ring.tone} className="preview-ring-cell">
              <GlassRing size={48} tone={ring.tone} soft={ring.soft} active={ring.active}>
                {ring.icon}
              </GlassRing>
              <span>{ring.tone}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="taste-group">
        <header className="taste-group__head">
          <h3>Border beam</h3>
          <p>Traveling / pulse glow (`border-beam`) — full strength in demos</p>
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

      <section className="taste-group taste-effect-preview">
        <header className="taste-group__head">
          <h3>Live preview</h3>
          <p>
            {beamOn
              ? "Beam + rings on a sample surface"
              : "Beam is off — rings still follow the dials"}
          </p>
        </header>
        {beamOn ? (
          <BorderBeam
            size={effects.borderBeam}
            colorVariant={effects.borderBeamColor}
            theme={effectTheme}
            strength={1}
          >
            {previewCard}
          </BorderBeam>
        ) : (
          previewCard
        )}
        {beamOn && (
          <div className="row" style={{ marginTop: 10 }}>
            <Button variant="secondary" size="sm" onClick={resetEffects}>
              Clear beam
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
        <p>Radius, glass, color, and depth — shared by UI Kit, Charts, and Effects.</p>
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
