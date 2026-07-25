import {
  FunnelChart,
  HeatmapChart,
  RadarChart,
  RadialBars,
  RadialProgress,
  ScatterChart,
} from "../components/charts/AdvancedCharts";
import { DotMatrixChart, SegmentedBar, TimelineBar } from "../components/charts/DotMatrixChart";
import { BarChart, DonutChart, LineChart, Sparkline } from "../components/charts/Charts";
import { Badge, Card } from "../components/ui";

function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function makeSeries(count, min, max) {
  return Array.from({ length: count }, () => randInt(min, max));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKS = Array.from({ length: 16 }, (_, i) => `W${i + 1}`);

const DEMO = {
  bars: makeSeries(12, 42, 98),
  area: makeSeries(16, 22, 94),
  dots: makeSeries(12, 90, 280),
  heatmap: Array.from({ length: 8 * 16 }, () => randInt(8, 96)),
  radar: makeSeries(6, 48, 96),
  scatter: Array.from({ length: 28 }, () => ({ x: randInt(4, 96), y: randInt(8, 92) })),
  donut: [
    { label: "Product", value: randInt(28, 40), color: "var(--chart-1)" },
    { label: "Services", value: randInt(18, 28), color: "var(--chart-2)" },
    { label: "Support", value: randInt(12, 20), color: "var(--chart-3)" },
    { label: "Other", value: randInt(8, 16), color: "var(--chart-4)" },
    { label: "Partner", value: randInt(6, 12), color: "var(--accent)" },
  ],
  funnel: [
    { label: "Visitors", value: 1200, color: "var(--chart-1)" },
    { label: "Signups", value: randInt(620, 780), color: "var(--chart-2)" },
    { label: "Trials", value: randInt(300, 420), color: "var(--chart-3)" },
    { label: "Paid", value: randInt(120, 180), color: "var(--chart-4)" },
    { label: "Retained", value: randInt(60, 110), color: "var(--accent)" },
  ],
  segments: [
    { label: "Direct", value: randInt(18, 28), color: "var(--chart-1)" },
    { label: "Search", value: randInt(16, 26), color: "var(--chart-2)" },
    { label: "Social", value: randInt(12, 22), color: "var(--chart-3)" },
    { label: "Referral", value: randInt(10, 18), color: "var(--chart-4)" },
    { label: "Email", value: randInt(8, 16), color: "var(--accent)" },
  ],
  radial: randInt(68, 92),
  radialBars: [
    { label: "Move", value: randInt(72, 94), color: "var(--chart-1)" },
    { label: "Exercise", value: randInt(55, 80), color: "var(--chart-2)" },
    { label: "Stand", value: randInt(70, 96), color: "var(--chart-3)" },
    { label: "Focus", value: randInt(48, 78), color: "var(--chart-4)" },
  ],
  sparks: [
    makeSeries(24, 10, 28),
    makeSeries(24, 14, 32),
    makeSeries(24, 8, 26),
  ],
};

export function ChartsGalleryPage() {
  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Charts</h1>
          <p>
            Theme-aware chart primitives for dashboards, CRMs, and analytics —
            denser demos so every type reads as production-ready.
          </p>
        </div>
        <Badge tone="accent">12 chart types</Badge>
      </header>

      <div className="grid-2 charts-gallery">
        <Card className="is-hoverable chart-card--lg" title="Heatmap" description="Intensity grid">
          <HeatmapChart rows={8} cols={16} values={DEMO.heatmap} />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Radial progress" description="KPI rings">
          <div className="row" style={{ justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
            <RadialProgress value={DEMO.radial} size={180} label="Health" />
            <RadialBars size={220} series={DEMO.radialBars} />
          </div>
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Radar" description="Multi-axis scores">
          <RadarChart
            size={280}
            axes={["UX", "Perf", "A11y", "API", "Docs", "Brand"]}
            values={DEMO.radar}
          />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Funnel" description="Conversion stages">
          <FunnelChart stages={DEMO.funnel} />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Scatter" description="Correlation cloud">
          <ScatterChart points={DEMO.scatter} />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Dot matrix" description="Square pixel columns">
          <DotMatrixChart
            series={DEMO.dots}
            labels={MONTHS}
            rows={18}
            max={300}
            formatTooltip={(l, v) => `${l} · ${v}`}
          />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Area trend" description="16-week draw-in">
          <LineChart
            fill
            values={DEMO.area}
            labels={WEEKS}
            formatValue={(v) => `${v}k`}
          />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Bars" description="12-month hover tooltips">
          <BarChart values={DEMO.bars} labels={MONTHS} />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Donut mix" description="Legend hover sync">
          <DonutChart centerLabel="Share" segments={DEMO.donut} />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Segmented breakdown" description="Channel mix">
          <SegmentedBar segments={DEMO.segments} />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Timeline + sparklines" description="Ops + KPI glyphs">
          <TimelineBar
            markers={[
              { label: "Kickoff", at: "12%", weight: 1, color: "var(--chart-4)" },
              { label: "Alpha", at: "34%", weight: 1.2, color: "var(--chart-1)" },
              { label: "Beta", at: "58%", weight: 1.6, color: "var(--chart-2)" },
              { label: "GA", at: "82%", weight: 2, color: "var(--accent)" },
            ]}
          />
          <div className="row" style={{ marginTop: 18, justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            {DEMO.sparks.map((vals, i) => (
              <div key={i} className="row">
                <strong style={{ fontSize: 18 }}>KPI {i + 1}</strong>
                <Sparkline values={vals} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
