import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock3,
  Search,
  Server,
  Users,
} from "lucide-react";
import { BarChart, LineChart, Sparkline } from "../../components/charts/Charts";
import {
  Badge,
  Button,
  Card,
  IconButton,
  Input,
  Progress,
  Table,
  Tabs,
} from "../../components/ui";

const KPIS = [
  { label: "Active users", value: "12.4k", delta: "+8.2%", icon: Users, tone: "success" },
  { label: "Uptime", value: "99.98%", delta: "30d", icon: Server, tone: "accent" },
  { label: "Avg. latency", value: "142ms", delta: "-12ms", icon: Clock3, tone: "success" },
  { label: "Open incidents", value: "3", delta: "2 sev-2", icon: Activity, tone: "warning" },
];

export function OpsDashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="ops-dashboard">
      <header className="page-header">
        <div>
          <h1>Ops dashboard</h1>
          <p>
            Classic product dashboard — collapse the sidebar for an icon rail and
            more canvas. That control lives on the shell, not in Taste.
          </p>
        </div>
        <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
          <Input className="ops-search" placeholder="Search services…" aria-label="Search" />
          <IconButton label="Notifications" variant="glass">
            <Bell size={18} />
          </IconButton>
          <IconButton label="Search" variant="glass">
            <Search size={18} />
          </IconButton>
          <Button size="sm" rightIcon={<ArrowUpRight size={14} />}>
            Deploy
          </Button>
        </div>
      </header>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          {
            id: "overview",
            label: "Overview",
            content: (
              <div className="stack" style={{ gap: 16, marginTop: 4 }}>
                <div className="grid-4">
                  {KPIS.map((kpi) => {
                    const Icon = kpi.icon;
                    return (
                      <Card key={kpi.label} className="is-hoverable" padded>
                        <div className="row" style={{ justifyContent: "space-between" }}>
                          <span className="ops-kpi__label">{kpi.label}</span>
                          <Icon size={16} style={{ color: "var(--ink-muted)" }} />
                        </div>
                        <div className="ops-kpi__value">{kpi.value}</div>
                        <Badge tone={kpi.tone}>{kpi.delta}</Badge>
                        <div style={{ marginTop: 10 }}>
                          <Sparkline values={[4, 6, 5, 8, 7, 9, 8, 11, 10, 12]} />
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div className="grid-2">
                  <Card title="Traffic" description="Requests / min" className="is-hoverable" padded>
                    <LineChart
                      values={[42, 48, 51, 47, 60, 68, 72, 70, 78, 84, 90, 88]}
                      labels={Array.from({ length: 12 }, (_, i) => `${i + 1}m`)}
                      formatValue={(v) => `${v}k`}
                    />
                  </Card>
                  <Card title="Error budget" description="Burn vs target" className="is-hoverable" padded>
                    <BarChart
                      values={[2, 5, 3, 1, 4]}
                      labels={["Auth", "API", "Jobs", "CDN", "DB"]}
                      formatValue={(v) => `${v}%`}
                    />
                    <div className="stack" style={{ marginTop: 14, gap: 10 }}>
                      <Progress label="Month budget" value={72} />
                      <div className="row" style={{ gap: 8 }}>
                        <CheckCircle2 size={16} color="var(--success)" />
                        <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                          Still within SLO for this window
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ),
          },
          {
            id: "services",
            label: "Services",
            content: (
              <Card
                title="Service health"
                description="Collapse the nav to focus this table"
                className="is-hoverable"
                padded
              >
                <Table
                  columns={[
                    { key: "service", label: "Service" },
                    {
                      key: "status",
                      label: "Status",
                      render: (r) => (
                        <Badge tone={r.status === "Healthy" ? "success" : "warning"}>
                          {r.status}
                        </Badge>
                      ),
                    },
                    { key: "p95", label: "p95" },
                    { key: "errors", label: "Error rate" },
                  ]}
                  rows={[
                    { id: 1, service: "Checkout API", status: "Healthy", p95: "98ms", errors: "0.02%" },
                    { id: 2, service: "Billing worker", status: "Degraded", p95: "410ms", errors: "1.1%" },
                    { id: 3, service: "Search index", status: "Healthy", p95: "64ms", errors: "0.01%" },
                    { id: 4, service: "Notify queue", status: "Healthy", p95: "120ms", errors: "0.04%" },
                  ]}
                />
              </Card>
            ),
          },
          {
            id: "alerts",
            label: "Alerts",
            content: (
              <Card title="Active alerts" className="is-hoverable" padded>
                <div className="stack" style={{ gap: 10 }}>
                  <div className="ops-alert glass">
                    <Badge tone="warning">sev-2</Badge>
                    <div>
                      <strong>Billing worker latency</strong>
                      <p>p95 above 400ms for 12 minutes</p>
                    </div>
                  </div>
                  <div className="ops-alert glass">
                    <Badge tone="danger">sev-1</Badge>
                    <div>
                      <strong>Payment webhook retries</strong>
                      <p>Elevated 5xx from Stripe relay</p>
                    </div>
                  </div>
                  <div className="ops-alert glass">
                    <Badge tone="accent">info</Badge>
                    <div>
                      <strong>Scheduled maintenance</strong>
                      <p>Search reindex window tonight 02:00 UTC</p>
                    </div>
                  </div>
                </div>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
