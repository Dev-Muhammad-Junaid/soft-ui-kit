import { useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  Folder,
  HelpCircle,
  LayoutGrid,
  Search,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import {
  DotMatrixChart,
  SegmentedBar,
  TimelineBar,
} from "../../components/charts/DotMatrixChart";
import { SuggestedTasteBanner } from "../../components/saas/SuggestedTasteBanner";
import {
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Card,
  Command,
  Dialog,
  DropdownMenu,
  IconButton,
  Sheet,
  Toast,
} from "../../components/ui";
import { SAAS_PRESETS } from "../../theme/presets";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const METRICS = {
  prod: {
    id: "prod",
    label: "Prod. execution",
    value: "320",
    delta: "+5%",
    up: true,
    series: [120, 180, 150, 260, 210, 290, 240, 310, 280, 340, 300, 320],
  },
  failed: {
    id: "failed",
    label: "Failed prod. execution",
    value: "12",
    delta: "-18%",
    up: false,
    series: [40, 55, 48, 70, 60, 45, 38, 42, 35, 30, 28, 22],
  },
  runtime: {
    id: "runtime",
    label: "Avg. runtime",
    value: "1.4s",
    delta: "-0.2s",
    up: true,
    series: [200, 210, 190, 220, 205, 185, 170, 160, 155, 150, 145, 140],
  },
  queue: {
    id: "queue",
    label: "Queue depth",
    value: "48",
    delta: "+9%",
    up: false,
    series: [80, 90, 100, 120, 110, 130, 140, 125, 135, 150, 145, 160],
  },
};

export function AutumnInsightDashboard() {
  const preset = SAAS_PRESETS.autumn;
  const [metric, setMetric] = useState("prod");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [healthOpen, setHealthOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const active = METRICS[metric];

  const tooltip = useMemo(
    () => (label, value) =>
      `${label} 30, 2026 · ${((value / 400) * 100).toFixed(2)}%`,
    [],
  );

  return (
    <div className="autumn-dash">
      <header className="page-header">
        <div>
          <h1>Insight</h1>
          <p>
            Autumn-style analytics workspace — dot-matrix trends, KPI tabs,
            workflow breakdown, and system health. A sellable “ops insight” kit flow.
          </p>
        </div>
        <div className="page-actions">
          <IconButton label="Search" variant="glass" onClick={() => setCmdOpen(true)}>
            <Search size={18} />
          </IconButton>
          <IconButton label="Notifications" variant="glass" onClick={() => setToast(true)}>
            <span className="notif-dot">
              <Bell size={18} />
            </span>
          </IconButton>
        </div>
      </header>

      <SuggestedTasteBanner presetId="autumn" />

      <div className="autumn-toolbar">
        <DropdownMenu
          trigger={
            <Button variant="outline" size="sm" rightIcon={<ChevronDown size={14} />}>
              Previous period
            </Button>
          }
          items={[
            { label: "Previous period", onSelect: () => setToast(true) },
            { label: "Last 30 days", onSelect: () => setToast(true) },
            { label: "Year to date", onSelect: () => setToast(true) },
          ]}
        />
        <DropdownMenu
          trigger={
            <Button variant="outline" size="sm" rightIcon={<ChevronDown size={14} />}>
              Compare to
            </Button>
          }
          items={[
            { label: "Prior period", onSelect: () => {} },
            { label: "Prior year", onSelect: () => {} },
          ]}
        />
        <DropdownMenu
          trigger={
            <Button variant="outline" size="sm" leftIcon={<Folder size={14} />} rightIcon={<ChevronDown size={14} />}>
              All projects
            </Button>
          }
          items={[
            { label: "Uxeflow 101", onSelect: () => {} },
            { label: "Benchmarking", onSelect: () => {} },
            { label: "Marketing", onSelect: () => {} },
          ]}
        />
        <Button
          variant="outline"
          size="sm"
          rightIcon={<ChevronDown size={14} />}
          onClick={() => setExportOpen(true)}
        >
          Export
        </Button>
      </div>

      <Card
        className="is-hoverable"
        title="Performance trend"
        action={
          <DropdownMenu
            trigger={
              <Button variant="outline" size="sm" rightIcon={<ChevronDown size={14} />}>
                Executions
              </Button>
            }
            items={[
              { label: "Executions", onSelect: () => setMetric("prod") },
              { label: "Failures", onSelect: () => setMetric("failed") },
              { label: "Runtime", onSelect: () => setMetric("runtime") },
            ]}
          />
        }
      >
        <DotMatrixChart
          series={active.series}
          labels={MONTHS}
          max={400}
          rows={20}
          formatTooltip={tooltip}
        />
      </Card>

      <div className="kpi-tabs" role="tablist">
        {Object.values(METRICS).map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={metric === m.id}
            className={`kpi-tab${metric === m.id ? " is-active" : ""}`}
            onClick={() => setMetric(m.id)}
          >
            <span className="kpi-tab__label">{m.label}</span>
            <span className="kpi-tab__value">{m.value}</span>
            <span className={`kpi-tab__delta ${m.up ? "up" : "down"}`}>
              {m.delta} vs last month
            </span>
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <Card
          className="is-hoverable"
          title="Workflow breakdown"
          action={
            <Button variant="outline" size="sm" onClick={() => setDetailsOpen(true)}>
              Details
            </Button>
          }
        >
          <div className="autumn-hero-stat">
            <strong>78%</strong>
            <span className="up">▲ 4%</span>
          </div>
          <SegmentedBar
            segments={[
              { label: "Issues", value: 18, color: "#f97316" },
              { label: "Moderate", value: 24, color: "#fbbf24" },
              { label: "Stable", value: 58, color: "#2dd4bf" },
            ]}
          />
          <ul className="workflow-list">
            {[
              { name: "Customer support bot", value: "92%", up: true },
              { name: "Invoice sync", value: "81%", up: true },
              { name: "Lead enrichment", value: "64%", up: false },
              { name: "SLA digest", value: "57%", up: true },
            ].map((row) => (
              <li key={row.name}>
                <span>{row.name}</span>
                <em className={row.up ? "up" : "down"}>
                  {row.value} {row.up ? "▲" : "▼"}
                </em>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          className="is-hoverable"
          title="System health"
          action={
            <Button variant="outline" size="sm" onClick={() => setHealthOpen(true)}>
              Details
            </Button>
          }
        >
          <div className="autumn-hero-stat">
            <strong>87%</strong>
            <Badge tone="success">Running smoothly</Badge>
          </div>
          <TimelineBar
            markers={[
              { label: "15", at: "18%", weight: 1.2, color: "#93c5fd" },
              { label: "24", at: "42%", weight: 1.6, color: "#60a5fa" },
              { label: "87%", at: "78%", weight: 2.2, color: "#3b82f6" },
            ]}
          />
          <p className="autumn-note">
            Latency and error budgets within target. Click Details for region drill-down.
          </p>
        </Card>
      </div>

      <div className="section-title">Workspace chrome</div>
      <div className="grid-3">
        {[
          { title: "Menu", items: ["Overview", "Personal", "Insight", "Templates"], icon: LayoutGrid },
          { title: "Projects", items: ["Uxeflow 101", "Benchmarking", "Marketing"], icon: Folder },
          { title: "Settings", items: ["Admin panel", "Variables", "Get Help"], icon: Settings },
        ].map((block) => (
          <Card key={block.title} className="is-hoverable" padded>
            <div className="row" style={{ marginBottom: 10 }}>
              <block.icon size={16} />
              <strong>{block.title}</strong>
            </div>
            <ul className="mini-nav">
              {block.items.map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => setToast(true)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            {block.title === "Settings" ? (
              <div className="user-chip">
                <Avatar name="Alex Autumn" size="sm" />
                <div>
                  <strong>Alex Autumn</strong>
                  <span>alex@autumn.app</span>
                </div>
              </div>
            ) : null}
          </Card>
        ))}
      </div>

      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        title="Workflow details"
        description="Stable share leads; issues concentrated in enrichment."
        footer={
          <>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => { setDetailsOpen(false); setToast(true); }}>
              Open runbook
            </Button>
          </>
        }
      >
        Drill into failed steps, owners, and SLA impact without leaving Insight.
      </Dialog>

      <Sheet open={healthOpen} onClose={() => setHealthOpen(false)} title="Region health">
        <div className="stack">
          <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 14 }}>
            us-east 94% · eu-west 88% · ap-south 79%
          </p>
          <Button variant="soft" leftIcon={<HelpCircle size={14} />} onClick={() => setToast(true)}>
            Page on-call
          </Button>
        </div>
      </Sheet>

      <AlertDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        title="Export Insight report?"
        description="CSV includes KPI tabs, trend series, and workflow segments for the selected period."
        confirmLabel="Export CSV"
        tone="primary"
        onConfirm={() => setToast(true)}
      />

      <Sheet open={cmdOpen} onClose={() => setCmdOpen(false)} title="Command menu">
        <Command
          items={[
            { label: "Go to Travel CRM", shortcut: "G T", id: "t" },
            { label: "Go to Finance", shortcut: "G F", id: "f" },
            { label: "Open Taste playground", shortcut: "⌘ K", id: "p" },
            { label: "Export Insight", shortcut: "⌘ E", id: "e" },
          ]}
          onSelect={() => {
            setCmdOpen(false);
            setToast(true);
          }}
        />
      </Sheet>

      <Toast open={toast} message="Autumn Insight action complete" onClose={() => setToast(false)} />

      <div className="autumn-footnote">
        <Sparkles size={14} />
        <span>
          Suggested taste: Soft Glass · orange execution series · glassy cards
          with the Autumn dot-matrix chart
        </span>
        <span className="row">
          <User size={14} /> Demo user Alex Autumn
        </span>
      </div>
    </div>
  );
}
