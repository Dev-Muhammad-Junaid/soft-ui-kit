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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ChartsGalleryPage() {
  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Charts gallery</h1>
          <p>
            Theme-aware chart primitives for dashboards, CRMs, and analytics —
            bars, radials, heatmaps, and more.
          </p>
        </div>
        <Badge tone="accent">12 chart types</Badge>
      </header>

      <div className="grid-2 charts-gallery">
        <Card className="is-hoverable chart-card--lg" title="Heatmap" description="Intensity grid">
          <HeatmapChart rows={8} cols={14} />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Radial progress" description="KPI ring">
          <div className="row" style={{ justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
            <RadialProgress value={78} size={180} label="Health" />
            <RadialBars
              size={220}
              series={[
                { label: "Move", value: 86, color: "#fb7185" },
                { label: "Exercise", value: 64, color: "#34d399" },
                { label: "Stand", value: 92, color: "#38bdf8" },
              ]}
            />
          </div>
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Radar" description="Multi-axis scores">
          <RadarChart
            size={280}
            axes={["UX", "Perf", "A11y", "API", "Docs", "Brand"]}
            values={[82, 70, 88, 64, 76, 90]}
          />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Funnel" description="Conversion stages">
          <FunnelChart
            stages={[
              { label: "Visits", value: 1200, color: "#38bdf8" },
              { label: "Signups", value: 640, color: "#a78bfa" },
              { label: "Trials", value: 310, color: "#34d399" },
              { label: "Paid", value: 128, color: "#fb923c" },
            ]}
          />
        </Card>
        <Card className="is-hoverable chart-card--lg" title="Scatter" description="Hover along the line">
          <ScatterChart
            points={[
              { x: 12, y: 22 },
              { x: 18, y: 30 },
              { x: 24, y: 28 },
              { x: 30, y: 44 },
              { x: 36, y: 40 },
              { x: 42, y: 58 },
              { x: 48, y: 52 },
              { x: 55, y: 70 },
              { x: 62, y: 66 },
              { x: 70, y: 82 },
            ]}
          />
        </Card>
        <Card className="is-hoverable" title="Dot matrix" description="Square pixel columns">
          <DotMatrixChart
            series={[120, 180, 150, 260, 210, 290, 240, 310, 280, 340, 300, 320]}
            labels={MONTHS}
            formatTooltip={(l, v) => `${l} · ${v}`}
          />
        </Card>
        <Card className="is-hoverable" title="Area trend" description="Draw-in polyline">
          <LineChart
            fill
            values={[18, 24, 20, 32, 28, 40, 36, 48, 42, 55, 50, 62]}
            labels={MONTHS}
            formatValue={(v) => `${v}k`}
          />
        </Card>
        <Card className="is-hoverable" title="Bars" description="Hover tooltips">
          <BarChart
            values={[42, 58, 36, 70, 48, 82, 64]}
            labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          />
        </Card>
        <Card className="is-hoverable" title="Donut mix" description="Legend hover sync">
          <DonutChart
            centerLabel="Share"
            centerValue="100%"
            segments={[
              { label: "Product", value: 42, color: "#38bdf8" },
              { label: "Sales", value: 28, color: "#a78bfa" },
              { label: "Support", value: 18, color: "#34d399" },
              { label: "Other", value: 12, color: "#fb923c" },
            ]}
          />
        </Card>
        <Card className="is-hoverable" title="Segmented breakdown" description="Workflow health">
          <SegmentedBar
            segments={[
              { label: "Issues", value: 18, color: "#f97316" },
              { label: "Moderate", value: 24, color: "#fbbf24" },
              { label: "Stable", value: 58, color: "#2dd4bf" },
            ]}
          />
        </Card>
        <Card className="is-hoverable" title="Timeline + sparklines" description="Ops + KPI glyphs">
          <TimelineBar
            markers={[
              { label: "15", at: "20%", weight: 1, color: "#93c5fd" },
              { label: "48", at: "48%", weight: 1.4, color: "#60a5fa" },
              { label: "87%", at: "78%", weight: 2, color: "#3b82f6" },
            ]}
          />
          <div className="row" style={{ marginTop: 18, justifyContent: "space-between" }}>
            {[
              [12, 14, 13, 16, 18, 17, 21],
              [30, 28, 26, 24, 22, 20, 18],
              [8, 12, 10, 16, 14, 20, 24],
            ].map((vals, i) => (
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
