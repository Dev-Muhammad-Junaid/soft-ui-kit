import { BorderBeam } from "border-beam";
import { MetalFx } from "metal-fx";
import { Sparkles } from "lucide-react";
import { Badge, Button, Card } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";

export function EffectsPage() {
  const { effectTheme, effects } = useTheme();
  const theme = effectTheme;
  const beamSize = effects.borderBeam === "off" ? "md" : effects.borderBeam;
  const beamColor = effects.borderBeamColor;
  const metalPreset = effects.metalFx === "off" ? "chromatic" : effects.metalFx;
  const tasteActive = effects.borderBeam !== "off" || effects.metalFx !== "off";

  return (
    <div className="effects-page">
      <header className="page-header">
        <div>
          <h1>Motion effects</h1>
          <p>
            Explore <code>border-beam</code> and <code>metal-fx</code> wrappers —
            plug them onto Soft UI Kit surfaces without rewriting chrome.
            {tasteActive
              ? " Taste panel selections tint the demos below."
              : " Open Taste to try styles before shipping them."}
          </p>
        </div>
        <Badge tone="accent">npm effects</Badge>
      </header>

      <div className="section-title">Border beam</div>
      <div className="grid-2">
        <BorderBeam size={beamSize} colorVariant={beamColor} theme={theme} strength={0.85}>
          <Card className="effect-demo-card" title="Ocean beam" description="Traveling border glow" padded>
            <p className="effect-demo-copy">
              Wrap any card or panel. Radius is detected from the child surface.
            </p>
            <Button size="sm">Primary action</Button>
          </Card>
        </BorderBeam>

        <BorderBeam size="pulse-inner" colorVariant="sunset" theme={theme} duration={2.4}>
          <Card className="effect-demo-card" title="Sunset pulse" description="Breathing glow" padded>
            <p className="effect-demo-copy">
              Pulse variants work well for featured KPIs and promo panels.
            </p>
            <Button size="sm" variant="secondary">
              Explore
            </Button>
          </Card>
        </BorderBeam>

        <BorderBeam size="line" colorVariant="colorful" theme={theme}>
          <div className="effect-search glass sheen">
            <Sparkles size={16} />
            <input className="ui-input ui-input--bare" placeholder="Search with line beam…" />
          </div>
        </BorderBeam>

        <BorderBeam size="sm" colorVariant="mono" theme={theme}>
          <Button>Compact mono beam</Button>
        </BorderBeam>
      </div>

      <div className="section-title">Metal FX</div>
      <div className="grid-2">
        <Card className="effect-demo-card is-hoverable" title="Metal buttons" description="WebGL liquid metal rings" padded>
          <div className="row" style={{ flexWrap: "wrap", gap: 14 }}>
            <MetalFx variant="button" preset={metalPreset} theme={theme} strength={0.9}>
              <button type="button" className="ui-btn ui-btn--primary ui-btn--md metal-host">
                Upgrade to Pro
              </button>
            </MetalFx>
            <MetalFx variant="button" preset="gold" theme={theme}>
              <button type="button" className="ui-btn ui-btn--secondary ui-btn--md metal-host">
                Gold preset
              </button>
            </MetalFx>
            <MetalFx variant="button" preset="silver" theme={theme}>
              <button type="button" className="ui-btn ui-btn--outline ui-btn--md metal-host">
                Silver
              </button>
            </MetalFx>
            <MetalFx variant="circle" preset="chromatic" theme={theme}>
              <button type="button" className="metal-circle" aria-label="Spark">
                <Sparkles size={18} />
              </button>
            </MetalFx>
          </div>
          <p className="effect-demo-copy" style={{ marginTop: 14 }}>
            Theme follows Soft UI Kit (dark for Dusk/Midnight, light otherwise).
          </p>
        </Card>

        <Card className="effect-demo-card is-hoverable" title="Compose with glass" description="Beam + metal together" padded>
          <BorderBeam size="pulse-outside" colorVariant={beamColor} theme={theme} strength={0.7}>
            <div className="effect-compose glass sheen">
              <MetalFx variant="button" preset={metalPreset} theme={theme}>
                <button type="button" className="ui-btn ui-btn--primary ui-btn--md metal-host">
                  Ship the kit
                </button>
              </MetalFx>
              <p className="effect-demo-copy">
                Outer pulse halo + metal CTA — use sparingly on hero moments.
              </p>
            </div>
          </BorderBeam>
        </Card>
      </div>
    </div>
  );
}
