import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles, SlidersHorizontal, CopySimple } from "../components/icons";
import { useState } from "react";
import { GlassOrbField, GlassRing } from "../components/effects/GlassRing";
import { PlaygroundDrawer } from "../components/playground/PlaygroundDrawer";
import { ThemeFab } from "../components/layout/ThemeFab";
import { BarChart, DonutChart } from "../components/charts/Charts";
import { Badge, Button, Card } from "../components/ui";

const INSTALL = {
  npm: "npm install soft-ui-kit",
  pnpm: "pnpm add soft-ui-kit",
  bun: "bun add soft-ui-kit",
};

const USAGE = `import { Button, Card, ThemeProvider, cn } from "soft-ui-kit";
import "soft-ui-kit/styles.css";

export function App() {
  return (
    <ThemeProvider>
      <Card title="Hello" className={cn("is-hoverable")}>
        <Button>Ship UI</Button>
      </Card>
    </ThemeProvider>
  );
}`;

export function LandingPage() {
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [pkg, setPkg] = useState("npm");
  const [copied, setCopied] = useState(false);

  async function copyInstall() {
    try {
      await navigator.clipboard?.writeText(INSTALL[pkg]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="marketing">
      <GlassOrbField denser />
      <header className="marketing-nav glass sheen">
        <div className="row">
          <GlassRing size={40} tone="sky" active>
            <Sparkles size={16} />
          </GlassRing>
          <strong>Soft UI Kit</strong>
        </div>
        <nav className="row">
          <a href="#install">Install</a>
          <Link to="/saas">Samples</Link>
          <Link to="/ui">UI Kit</Link>
          <Link to="/charts">Charts</Link>
          <Link className="ui-btn ui-btn--primary ui-btn--sm" to="/ui">
            Open kit
          </Link>
        </nav>
      </header>

      <main className="marketing-hero">
        <Badge tone="accent">npm · pnpm · bun</Badge>
        <h1>Soft UI Kit</h1>
        <p>
          A glass + soft React UI kit you install like any other Node module —
          components, themes, and <code className="landing-code">cn</code>, ready
          for dashboards and product UI.
        </p>
        <div className="row">
          <a className="ui-btn ui-btn--primary ui-btn--lg" href="#install">
            Install package <ArrowRight size={16} />
          </a>
          <Link className="ui-btn ui-btn--outline ui-btn--lg" to="/ui">
            Browse UI Kit
          </Link>
          <Link className="ui-btn ui-btn--secondary ui-btn--lg" to="/saas/dashboard">
            Ops dashboard
          </Link>
        </div>

        <section id="install" className="landing-install glass sheen">
          <header className="landing-install__head">
            <div>
              <h2>Install in one command</h2>
              <p>Works with npm, pnpm, and Bun — same package, same imports.</p>
            </div>
            <div className="landing-pkg-tabs" role="tablist" aria-label="Package manager">
              {Object.keys(INSTALL).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={pkg === key}
                  className={`landing-pkg-tab${pkg === key ? " is-active" : ""}`}
                  onClick={() => setPkg(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          </header>

          <div className="landing-install__cmd">
            <code>{INSTALL[pkg]}</code>
            <Button size="sm" variant="secondary" onClick={copyInstall} leftIcon={<CopySimple size={14} />}>
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <p className="landing-install__alt">
            From GitHub before npm publish:{" "}
            <code className="landing-code">npm install github:Dev-Muhammad-Junaid/soft-ui-kit</code>
          </p>

          <pre className="landing-install__usage" tabIndex={0}>
            <code>{USAGE}</code>
          </pre>
        </section>

        <div className="marketing-preview grid-2">
          <Card className="is-hoverable" title="Product pulse" description="Animated charts">
            <BarChart values={[32, 44, 38, 56, 48, 62, 70]} labels={["M", "T", "W", "T", "F", "S", "S"]} />
          </Card>
          <Card className="is-hoverable" title="What you get" description="Install once, ship everywhere">
            <ul className="marketing-checks">
              {[
                "ThemeProvider + Taste-ready tokens",
                "UI Kit · Charts · Effects pages",
                "Forms, overlays, data tables, charts",
                "cn() helper for class merging",
              ].map((item) => (
                <li key={item}>
                  <Check size={14} /> {item}
                </li>
              ))}
            </ul>
            <DonutChart
              segments={[
                { label: "UI", value: 45, color: "#38bdf8" },
                { label: "Charts", value: 30, color: "#a78bfa" },
                { label: "Themes", value: 25, color: "#34d399" },
              ]}
            />
          </Card>
        </div>
      </main>

      <div className="fab-stack">
        <ThemeFab />
        <button
          type="button"
          className={`taste-fab glass sheen${playgroundOpen ? " is-active" : ""}`}
          onClick={() => setPlaygroundOpen((open) => !open)}
          aria-label={playgroundOpen ? "Close taste playground" : "Open taste playground"}
          aria-pressed={playgroundOpen}
        >
          <SlidersHorizontal size={18} />
          <span>Taste</span>
        </button>
      </div>
      <PlaygroundDrawer open={playgroundOpen} onClose={() => setPlaygroundOpen(false)} />
    </div>
  );
}
