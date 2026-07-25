import { BorderBeam } from "border-beam";
import { Bell, Check, Info, Sparkles } from "../components/icons";
import { GlassRing } from "../components/effects/GlassRing";
import { Badge, Button, Card } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";

const RING_TONES = [
  { tone: "sky", label: "Sky", soft: true },
  { tone: "mint", label: "Mint", active: true },
  { tone: "peach", label: "Peach" },
  { tone: "lavender", label: "Lavender", active: true },
  { tone: "rose", label: "Rose" },
  { tone: "warn", label: "Warn", soft: true },
];

export function EffectsPage() {
  const { effectTheme, effects, tweaks } = useTheme();
  const theme = effectTheme;
  const beamSize = effects.borderBeam === "off" ? "md" : effects.borderBeam;
  const beamColor = effects.borderBeamColor;
  const tasteActive = effects.borderBeam !== "off";

  return (
    <div className="effects-page">
      <header className="page-header">
        <div>
          <h1>Effects</h1>
          <p>
            Glass ring badges and <code>border-beam</code> wrappers — tuned live
            from Taste. UI Kit primitives stay on the UI Kit page.
            {tasteActive
              ? " Your Taste beam selection tints the demos below."
              : " Open Taste to try beam styles and ring dials."}
          </p>
        </div>
        <Badge tone="accent">Taste-linked</Badge>
      </header>

      <div className="section-title">Glass rings</div>
      <p className="effect-demo-copy" style={{ marginTop: -8, marginBottom: 14 }}>
        Shine {Number(tweaks.ringShine).toFixed(2)} · Thickness {Number(tweaks.ringThickness).toFixed(1)} ·
        Spread {Number(tweaks.ringSpread).toFixed(1)} · Glow {Number(tweaks.ringGlow).toFixed(2)}
      </p>
      <div className="grid-2">
        <Card className="effect-demo-card" title="Tone set" description="Soft + active modes" padded>
          <div className="preview-row preview-row--rings">
            {RING_TONES.map((ring) => (
              <div key={ring.tone} className="preview-ring-cell">
                <GlassRing size={56} tone={ring.tone} soft={ring.soft} active={ring.active}>
                  {ring.tone === "mint" ? (
                    <Check size={18} />
                  ) : ring.tone === "peach" ? (
                    <Info size={18} />
                  ) : (
                    <Bell size={18} />
                  )}
                </GlassRing>
                <span>{ring.label}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="effect-demo-card" title="Brand mark" description="Sidebar / hero badge" padded>
          <div className="preview-row" style={{ gap: 18, alignItems: "center" }}>
            <GlassRing size={72} tone="sky" active>
              <Sparkles size={24} />
            </GlassRing>
            <div>
              <strong>Soft UI Kit</strong>
              <p className="effect-demo-copy" style={{ margin: "6px 0 0" }}>
                Ring dials in Taste update shine, thickness, spread, and glow instantly.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="section-title">Border beam</div>
      <div className="grid-2">
        <BorderBeam size={beamSize} colorVariant={beamColor} theme={theme} strength={1}>
          <Card className="effect-demo-card" title="Live Taste beam" description="Traveling border glow" padded>
            <p className="effect-demo-copy">
              Size and color follow Taste when beam is on — otherwise shows Travel / Ocean.
            </p>
            <Button size="sm">Primary action</Button>
          </Card>
        </BorderBeam>

        <BorderBeam size="pulse-inner" colorVariant="sunset" theme={theme} duration={2.4} strength={1}>
          <Card className="effect-demo-card" title="Sunset pulse" description="Breathing glow" padded>
            <p className="effect-demo-copy">
              Pulse variants work well for featured KPIs and promo panels.
            </p>
            <Button size="sm" variant="secondary">
              Explore
            </Button>
          </Card>
        </BorderBeam>

        <BorderBeam size="line" colorVariant="colorful" theme={theme} strength={1}>
          <div className="effect-search glass sheen">
            <Sparkles size={16} />
            <input className="ui-input ui-input--bare" placeholder="Search with line beam…" />
          </div>
        </BorderBeam>

        <BorderBeam size="sm" colorVariant="mono" theme={theme} strength={1}>
          <Button>Compact mono beam</Button>
        </BorderBeam>

        <BorderBeam size="pulse-outside" colorVariant={beamColor} theme={theme} strength={1}>
          <div className="effect-compose glass sheen">
            <Button size="md">Featured CTA</Button>
            <p className="effect-demo-copy">
              Outer pulse halo around a glass surface — good for hero moments.
            </p>
          </div>
        </BorderBeam>

        <BorderBeam size="md" colorVariant="sunset" theme={theme} strength={1}>
          <Card className="effect-demo-card" title="Outline pair" description="Beam + outline chrome" padded>
            <p className="effect-demo-copy">Compose with outline buttons without fighting glass depth.</p>
            <Button size="sm" variant="outline">
              Outline action
            </Button>
          </Card>
        </BorderBeam>
      </div>
    </div>
  );
}
