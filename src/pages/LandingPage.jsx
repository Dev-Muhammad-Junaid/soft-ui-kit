import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles, SlidersHorizontal } from "../components/icons";
import { useState } from "react";
import { GlassOrbField, GlassRing } from "../components/effects/GlassRing";
import { PlaygroundDrawer } from "../components/playground/PlaygroundDrawer";
import { ThemeFab } from "../components/layout/ThemeFab";
import { BarChart, DonutChart } from "../components/charts/Charts";
import { Badge, Button, Card } from "../components/ui";

export function LandingPage() {
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

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
          <Link to="/saas">Samples</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/login">Log in</Link>
          <Link className="ui-btn ui-btn--primary ui-btn--sm" to="/signup">
            Sign up
          </Link>
        </nav>
      </header>

      <main className="marketing-hero">
        <Badge tone="accent">Glass · Neumorphic · Themed</Badge>
        <h1>Design systems that feel soft — and ship like shadcn.</h1>
        <p>
            Soft UI Kit is a glass + neumorphic system for dashboards, CRMs, and
            chart apps. Search the catalog, tweak Taste live, ship consistent UI.
          </p>
          <div className="row">
            <Link className="ui-btn ui-btn--primary ui-btn--lg" to="/signup">
              Start free <ArrowRight size={16} />
            </Link>
            <Link className="ui-btn ui-btn--outline ui-btn--lg" to="/catalog">
              Browse catalog
            </Link>
            <Link className="ui-btn ui-btn--secondary ui-btn--lg" to="/saas/autumn">
              Autumn Insight
            </Link>
          </div>

        <div className="marketing-preview grid-2">
          <Card className="is-hoverable" title="Product pulse" description="Animated charts">
            <BarChart values={[32, 44, 38, 56, 48, 62, 70]} labels={["M", "T", "W", "T", "F", "S", "S"]} />
          </Card>
          <Card className="is-hoverable" title="Mix" description="Donut + checklist">
            <DonutChart
              segments={[
                { label: "Product", value: 40, color: "#38bdf8" },
                { label: "Design", value: 30, color: "#a78bfa" },
                { label: "Ops", value: 30, color: "#34d399" },
              ]}
            />
            <ul className="marketing-checks">
              {["Autumn Insight", "Travel · Finance · Kanban", "Taste playground"].map((item) => (
                <li key={item}>
                  <Check size={14} /> {item}
                </li>
              ))}
            </ul>
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
