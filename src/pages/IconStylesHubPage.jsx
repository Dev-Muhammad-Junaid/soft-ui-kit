import { Link } from "react-router-dom";
import { SoftIcon } from "../components/icons/soft/SoftIcon";
import { SoftComplexIcon } from "../components/icons/soft/SoftComplexIcon";
import { Badge, Card } from "../components/ui";

const SETS = [
  {
    to: "/icon-styles/line",
    title: "Line & fill",
    blurb: "Soft stroke, fill, duotone, clay, and crystal weights for dense UI chrome.",
    preview: <SoftIcon name="sparkles" styleId="soft-stroke" size={28} bare />,
    pad: "soft-stroke",
    tone: "line",
    count: "5 styles",
  },
  {
    to: "/icon-styles/glass",
    title: "Glass & depth",
    blurb: "Frost shell, iso tilt, glow core, acrylic slab, and prism SoftIcon modes.",
    preview: <SoftIcon name="folder" styleId="frost-shell" size={28} bare />,
    pad: "frost-shell",
    tone: "glass",
    count: "5 styles",
  },
  {
    to: "/icon-styles/chrome",
    title: "Chrome neon",
    blurb: "Liquid-metal SoftIcon modes plus a Soft Complex chrome neon subset.",
    preview: <SoftIcon name="sparkles" styleId="chrome-neon" size={28} bare />,
    pad: "chrome-neon",
    tone: "chrome",
    count: "5 styles + complex",
  },
  {
    to: "/icon-styles/frosted",
    title: "Frosted isometric",
    blurb: "Soft Complex glass-material SaaS / dashboard / admin SVG catalog.",
    preview: <SoftComplexIcon name="home" material="glass" size={40} />,
    pad: null,
    tone: "frosted",
    count: "90+ icons",
  },
  {
    to: "/icon-styles/glassy-mix",
    title: "Glassy mix",
    blurb: "Overlapping translucent gradients that multiply where shapes meet.",
    preview: <SoftIcon name="sparkles" styleId="triad-mix" size={28} bare />,
    pad: "triad-mix",
    tone: "mix",
    count: "5 styles",
  },
];

export function IconStylesHubPage() {
  return (
    <div className="icon-styles-page icon-styles-hub">
      <header className="page-header">
        <div>
          <h1>Icon style labs</h1>
          <p>
            Each set lives on its own review page so you can evaluate and iterate independently.
            Open a lab below — sidebar links stay in sync.
          </p>
        </div>
        <Badge tone="accent">{SETS.length} sets</Badge>
      </header>

      <div className="icon-styles-hub__grid">
        {SETS.map((set) => (
          <Link key={set.to} to={set.to} className={`icon-styles-hub__card glass sheen icon-styles-hub__card--${set.tone}`}>
            <div className="icon-styles-hub__preview">
              {set.pad ? (
                <span className={`icon-style-pad icon-style-pad--${set.pad}`}>{set.preview}</span>
              ) : (
                set.preview
              )}
            </div>
            <div className="icon-styles-hub__body">
              <div className="icon-styles-hub__title-row">
                <h2>{set.title}</h2>
                <Badge>{set.count}</Badge>
              </div>
              <p>{set.blurb}</p>
              <span className="icon-styles-hub__cta">Open lab →</span>
            </div>
          </Link>
        ))}
      </div>

      <Card className="glass sheen" title="How this hub relates to PRs" padded>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 13, lineHeight: 1.5 }}>
          Individual branches (<code>explore/icons-*</code>) keep each set mergeable on its own.
          This hub branch gathers every lab as separate routes for side-by-side product review
          without checking out each branch.
        </p>
      </Card>
    </div>
  );
}
