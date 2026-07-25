import { BorderBeam } from "border-beam";
import { Sparkles } from "../components/icons";
import { Badge, Button, Card } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";

export function EffectsPage() {
  const { effectTheme, effects } = useTheme();
  const theme = effectTheme;
  const beamSize = effects.borderBeam === "off" ? "md" : effects.borderBeam;
  const beamColor = effects.borderBeamColor;
  const tasteActive = effects.borderBeam !== "off";

  return (
    <div className="effects-page">
      <header className="page-header">
        <div>
          <h1>Motion effects</h1>
          <p>
            Explore <code>border-beam</code> wrappers — plug them onto Soft UI Kit
            surfaces without rewriting chrome.
            {tasteActive
              ? " Taste panel selections tint the demos below."
              : " Open Taste to try styles before shipping them."}
          </p>
        </div>
        <Badge tone="accent">npm effects</Badge>
      </header>

      <div className="section-title">Border beam</div>
      <div className="grid-2">
        <BorderBeam size={beamSize} colorVariant={beamColor} theme={theme} strength={1}>
          <Card className="effect-demo-card" title="Ocean beam" description="Traveling border glow" padded>
            <p className="effect-demo-copy">
              Wrap any card or panel. Radius is detected from the child surface.
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
