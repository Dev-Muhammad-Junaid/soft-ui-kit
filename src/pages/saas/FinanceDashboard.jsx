import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
  Wallet,
} from "../../components/icons";
import { BarChart, DonutChart, LineChart, Sparkline } from "../../components/charts/Charts";
import { GlassRing } from "../../components/effects/GlassRing";
import { SuggestedTasteBanner } from "../../components/saas/SuggestedTasteBanner";
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Pagination,
  Progress,
  Select,
  Separator,
  Switch,
  Table,
  ToggleGroup,
  Tooltip,
} from "../../components/ui";
import { SAAS_PRESETS } from "../../theme/presets";

export function FinanceDashboard() {
  const preset = SAAS_PRESETS.finance;
  const [range, setRange] = useState("30d");
  const [alertsOn, setAlertsOn] = useState(true);
  const [page, setPage] = useState(1);

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>{preset.name}</h1>
          <p>{preset.tagline}</p>
        </div>
        <div className="page-actions">
          <ToggleGroup
            value={range}
            onChange={setRange}
            options={[
              { value: "7d", label: "7d" },
              { value: "30d", label: "30d" },
              { value: "ytd", label: "YTD" },
            ]}
          />
          <Button variant="secondary">Download CSV</Button>
          <Button>Reconcile</Button>
        </div>
      </header>

      <SuggestedTasteBanner presetId="finance" />

      {alertsOn ? (
        <div style={{ marginTop: 16 }}>
          <Alert tone="warning" title="Cash runway notice">
            Operating cash covers 4.2 months at current burn. Review invoice aging.
          </Alert>
        </div>
      ) : null}

      <div className="grid-4" style={{ marginTop: 18, marginBottom: 18 }}>
        {[
          { label: "Cash", value: "$2.4M", spark: [40, 42, 39, 45, 48, 52, 50], icon: Wallet, tone: "mint" },
          { label: "MRR", value: "$186k", spark: [20, 22, 24, 23, 26, 28, 30], icon: PiggyBank, tone: "sky" },
          { label: "Burn", value: "$74k", spark: [30, 28, 32, 31, 29, 27, 26], icon: ArrowDownLeft, tone: "peach" },
          { label: "Collections", value: "92%", spark: [70, 72, 75, 78, 80, 88, 92], icon: CreditCard, tone: "lavender" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="stat-card is-hoverable" padded>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="stat-card__label">{s.label}</span>
                <GlassRing size={52} tone={s.tone} soft>
                  <Icon size={20} strokeWidth={1.75} />
                </GlassRing>
              </div>
              <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                <span className="stat-card__value">{s.value}</span>
                <Sparkline values={s.spark} />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid-2">
        <Card title="Cashflow" description={`Net movement · ${range}`} className="is-hoverable">
          <LineChart
            values={[12, 18, 9, 22, 16, 28, 21, 30, 26, 34, 29, 38]}
            labels={Array.from({ length: 12 }, (_, i) => `M${i + 1}`)}
            formatValue={(v) => `$${v}0k`}
          />
        </Card>
        <Card title="Expense mix" description="This period" className="is-hoverable">
          <DonutChart
            centerLabel="Spend"
            centerValue="$740k"
            segments={[
              { label: "Payroll", value: 42, color: "var(--chart-1)" },
              { label: "Cloud", value: 18, color: "var(--chart-2)" },
              { label: "Marketing", value: 16, color: "var(--chart-3)" },
              { label: "Ops", value: 14, color: "var(--chart-4)" },
              { label: "Other", value: 10, color: "var(--ink-muted)" },
            ]}
          />
        </Card>
      </div>

      <div className="section-title">Treasury controls</div>
      <div className="grid-2">
        <Card title="Risk & alerts" className="is-hoverable">
          <div className="stack">
            <Switch checked={alertsOn} onCheckedChange={setAlertsOn} label="Cash alerts" />
            <Checkbox label="Flag invoices &gt; 45 days" defaultChecked />
            <Checkbox label="Require dual approval &gt; $10k" defaultChecked />
            <Select
              label="Default ledger"
              options={[
                { value: "ops", label: "Operating" },
                { value: "tax", label: "Tax reserve" },
                { value: "growth", label: "Growth" },
              ]}
            />
            <Separator label="Targets" />
            <Progress label="Gross margin" value={68} />
            <Progress label="Collection rate" value={92} />
            <BarChart
              values={[44, 52, 49, 61, 58, 70]}
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
              formatValue={(v) => `${v}%`}
            />
          </div>
        </Card>

        <Card title="Transactions" className="is-hoverable" padded={false}>
          <div style={{ padding: 18 }}>
            <div className="row" style={{ marginBottom: 12 }}>
              <Input placeholder="Search payee…" style={{ maxWidth: 220 }} />
              <Tooltip content="Export filtered rows">
                <Button variant="secondary" size="sm" rightIcon={<ArrowUpRight size={14} />}>
                  Export
                </Button>
              </Tooltip>
            </div>
            <Table
              columns={[
                { key: "payee", label: "Payee" },
                { key: "category", label: "Category" },
                {
                  key: "amount",
                  label: "Amount",
                  render: (r) => (
                    <span style={{ color: r.amount.startsWith("+") ? "var(--success)" : "var(--ink)" }}>
                      {r.amount}
                    </span>
                  ),
                },
                {
                  key: "state",
                  label: "State",
                  render: (r) => (
                    <Badge tone={r.state === "Posted" ? "success" : "warning"}>{r.state}</Badge>
                  ),
                },
              ]}
              rows={[
                { id: 1, payee: "Northwind Cloud", category: "Infra", amount: "-$12,400", state: "Posted" },
                { id: 2, payee: "Acme Corp", category: "Revenue", amount: "+$48,000", state: "Posted" },
                { id: 3, payee: "Bright Ads", category: "Marketing", amount: "-$6,220", state: "Pending" },
                { id: 4, payee: "Helix Labs", category: "Revenue", amount: "+$19,500", state: "Posted" },
              ]}
            />
            <div style={{ marginTop: 12 }}>
              <Pagination page={page} pages={5} onChange={setPage} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
