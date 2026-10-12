/* oxlint-disable react/only-export-components -- SSR-only build module, never hot-reloaded. */
/**
 * Server-renders real Soft UI Kit components to static HTML for the
 * HyperFrames promo. Every slot below is the kit's own markup + CSS —
 * GSAP only moves, reveals, and re-themes it.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import * as Ph from "@phosphor-icons/react";

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Calendar,
  Checkbox,
  Command,
  IconButton,
  Input,
  Kbd,
  OtpInput,
  Pagination,
  PasswordInput,
  Progress,
  Radio,
  Select,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  ToggleGroup,
  Breadcrumb,
} from "../../src/components/ui/index.js";
import {
  BarChart,
  DonutChart,
  LineChart,
  Sparkline,
} from "../../src/components/charts/Charts.jsx";
import {
  FunnelChart,
  HeatmapChart,
  RadarChart,
  RadialBars,
  RadialProgress,
  ScatterChart,
} from "../../src/components/charts/AdvancedCharts.jsx";
import {
  DotMatrixChart,
  SegmentedBar,
  TimelineBar,
} from "../../src/components/charts/DotMatrixChart.jsx";
import { GlassRing } from "../../src/components/effects/GlassRing.jsx";
import {
  Bell,
  Search,
  Settings,
  Sparkles,
  ArrowUpRight,
  Plus,
} from "../../src/components/icons.jsx";
import { ThemeProvider } from "../../src/theme/ThemeProvider.jsx";
import { DashboardShell } from "../../src/components/layout/DashboardShell.jsx";
import {
  Activity,
  BarChart3,
  BookOpen,
  Store,
  Wand2,
} from "../../src/components/icons.jsx";
import { OpsDashboard } from "../../src/pages/saas/OpsDashboard.jsx";
import { AutumnInsightDashboard } from "../../src/pages/saas/AutumnInsightDashboard.jsx";
import { TravelDashboard } from "../../src/pages/saas/TravelDashboard.jsx";
import { FinanceDashboard } from "../../src/pages/saas/FinanceDashboard.jsx";
import { KanbanDashboard } from "../../src/pages/saas/KanbanDashboard.jsx";

const html = (node) => renderToStaticMarkup(node);
const noop = () => {};

/* ——— Data ——— */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BAR = [42, 58, 51, 74, 66, 88, 79, 96, 84, 110, 102, 124];
const LINE = [18, 26, 22, 38, 34, 52, 47, 63, 58, 76, 71, 92];
const DOTS = [180, 240, 210, 300, 260, 340, 290, 370, 330, 390, 350, 400, 310, 360];
const DOT_LABELS = ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"].map(
  (d, i) => `${d}${i}`,
);
const HEAT = Array.from({ length: 7 * 16 }, (_, i) => {
  const r = Math.floor(i / 16);
  const c = i % 16;
  return Math.round(30 + 60 * Math.abs(Math.sin(c * 0.55 + r * 0.8)) + ((i * 37) % 23));
});
const SCATTER = [3, 7, 5, 11, 9, 14, 12, 18, 15, 21, 19, 24].map((y, x) => ({ x, y }));

/* ——— Component wall tiles ——— */
function Tile({ k, wide, tall, children, label }) {
  return (
    <div className={`w-tile glass sheen${wide ? " w-wide" : ""}${tall ? " w-tall" : ""}`} data-k={k}>
      {label ? <span className="w-tile__label">{label}</span> : null}
      <div className="w-tile__body">{children}</div>
    </div>
  );
}

const WALL = [
  <Tile key="btn" k="btn" label="Button">
    <Button leftIcon={<Sparkles size={16} />}>Ship UI</Button>
  </Tile>,
  <Tile key="switch" k="switch" label="Switch">
    <div className="w-stack">
      <Switch checked={false} label="Glass" className="sw-a" />
      <Switch checked label="Motion" className="sw-b" />
    </div>
  </Tile>,
  <Tile key="badges" k="badges" label="Badge">
    <div className="w-row">
      <Badge tone="accent">New</Badge>
      <Badge tone="success">Live</Badge>
      <Badge tone="warning">Beta</Badge>
    </div>
  </Tile>,
  <Tile key="otp" k="otp" label="OTP">
    <OtpInput length={4} value="4821" onChange={noop} />
  </Tile>,
  <Tile key="slider" k="slider" label="Slider">
    <Slider value={64} onChange={noop} className="w-slider" />
  </Tile>,
  <Tile key="avatar" k="avatar" label="Avatar">
    <div className="w-avatars">
      <Avatar name="Ava Stone" />
      <Avatar name="Leo Park" />
      <Avatar name="Mia Chen" />
      <Avatar name="Noah Kim" />
    </div>
  </Tile>,
  <Tile key="tabs" k="tabs" label="Tabs" wide>
    <Tabs
      tabs={[
        { id: "a", label: "Overview" },
        { id: "b", label: "Usage" },
        { id: "c", label: "Logs" },
      ]}
      value="a"
      onChange={noop}
    />
  </Tile>,
  <Tile key="input" k="input" label="Input">
    <Input placeholder="you@studio.dev" defaultValue="hello@soft.ui" readOnly />
  </Tile>,
  <Tile key="progress" k="progress" label="Progress">
    <Progress value={72} label="Upload" />
  </Tile>,
  <Tile key="check" k="check" label="Checkbox">
    <div className="w-stack">
      <Checkbox label="Glass rims" defaultChecked readOnly />
      <Checkbox label="Soft shadows" readOnly className="ck-b" />
    </div>
  </Tile>,
  <Tile key="toggle" k="toggle" label="Toggle group" wide>
    <ToggleGroup
      value="week"
      onChange={noop}
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  </Tile>,
  <Tile key="kbd" k="kbd" label="Kbd">
    <div className="w-row">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  </Tile>,
  <Tile key="spark" k="spark" label="Sparkline">
    <div className="w-kpi">
      <strong>12.4k</strong>
      <Sparkline values={LINE} />
    </div>
  </Tile>,
  <Tile key="alert" k="alert" label="Alert" wide>
    <Alert tone="success" title="Deployed">All systems glass.</Alert>
  </Tile>,
  <Tile key="radial" k="radial" label="Radial">
    <RadialProgress value={78} size={86} label="Health" />
  </Tile>,
  <Tile key="icons" k="icons" label="Icon button">
    <div className="w-row">
      <IconButton label="Search" variant="glass"><Search size={18} /></IconButton>
      <IconButton label="Bell" variant="glass"><Bell size={18} /></IconButton>
      <IconButton label="Settings" variant="glass"><Settings size={18} /></IconButton>
    </div>
  </Tile>,
  <Tile key="radio" k="radio" label="Radio">
    <div className="w-stack">
      <Radio name="plan" label="Pro" defaultChecked readOnly />
      <Radio name="plan" label="Team" readOnly />
    </div>
  </Tile>,
  <Tile key="pager" k="pager" label="Pagination" wide>
    <Pagination page={2} pages={4} onChange={noop} />
  </Tile>,
  <Tile key="select" k="select" label="Select">
    <Select defaultValue="design" readOnly>
      <option value="design">Design</option>
    </Select>
  </Tile>,
  <Tile key="skeleton" k="skeleton" label="Skeleton">
    <div className="w-stack w-skel">
      <Skeleton style={{ height: 10, width: "90%" }} />
      <Skeleton style={{ height: 10, width: "70%" }} />
      <Skeleton style={{ height: 10, width: "80%" }} />
    </div>
  </Tile>,
  <Tile key="buttons" k="buttons" label="Variants" wide>
    <div className="w-row">
      <Button size="sm">Primary</Button>
      <Button size="sm" variant="outline">Outline</Button>
      <Button size="sm" variant="soft">Soft</Button>
      <Button size="sm" variant="ghost">Ghost</Button>
    </div>
  </Tile>,
  <Tile key="password" k="password" label="Password">
    <PasswordInput defaultValue="glassy-ui" readOnly />
  </Tile>,
  <Tile key="crumb" k="crumb" label="Breadcrumb">
    <Breadcrumb items={[{ label: "Kit" }, { label: "Forms" }, { label: "Input" }]} />
  </Tile>,
  <Tile key="cta" k="cta" label="Icon + text">
    <Button variant="outline" rightIcon={<ArrowUpRight size={16} />}>Explore</Button>
  </Tile>,
];

/* ——— Theme hero cluster (re-rendered per theme layer) ——— */
function HeroCluster() {
  return (
    <div className="hc">
      <div className="hc-card hc-kpis glass sheen">
        {[
          ["Revenue", "$84.2k", "+12%"],
          ["Users", "12.4k", "+8%"],
          ["Uptime", "99.98%", "30d"],
        ].map(([l, v, d]) => (
          <div className="hc-kpi" key={l}>
            <span>{l}</span>
            <strong>{v}</strong>
            <Badge tone="success">{d}</Badge>
          </div>
        ))}
      </div>
      <div className="hc-card hc-line glass sheen">
        <div className="hc-head">
          <b>Growth</b>
          <ToggleGroup
            value="w"
            onChange={noop}
            options={[
              { value: "d", label: "D" },
              { value: "w", label: "W" },
              { value: "m", label: "M" },
            ]}
          />
        </div>
        <LineChart values={LINE} labels={MONTHS} fill />
      </div>
      <div className="hc-card hc-donut glass sheen">
        <b>Traffic</b>
        <DonutChart
          centerLabel="Visits"
          centerValue="48k"
          segments={[
            { label: "Direct", value: 42 },
            { label: "Social", value: 26 },
            { label: "Search", value: 20 },
            { label: "Mail", value: 12 },
          ]}
        />
      </div>
      <div className="hc-card hc-bars glass sheen">
        <b>Weekly</b>
        <BarChart values={BAR.slice(0, 8)} labels={MONTHS.slice(0, 8)} />
      </div>
      <div className="hc-card hc-actions glass sheen">
        <Switch checked label="Live" />
        <Button size="sm" leftIcon={<Plus size={14} />}>Create</Button>
        <Button size="sm" variant="soft">Share</Button>
      </div>
    </div>
  );
}

/* ——— Taste scene ——— */
function TasteSliders() {
  return (
    <div className="taste-panel glass sheen">
      <div className="taste-title">
        <b>Taste</b>
        <Badge tone="accent">Live</Badge>
      </div>
      <Slider label="Border radius" value={1} min={0} max={2} step={0.01} className="ts ts-radius" onChange={noop} />
      <Slider label="Glass blur" value={22} min={0} max={40} className="ts ts-blur" onChange={noop} />
      <Slider label="Accent hue" value={199} min={0} max={360} className="ts ts-hue" onChange={noop} />
      <Slider label="Ring glow" value={55} min={0} max={100} className="ts ts-glow" onChange={noop} />
    </div>
  );
}

function TasteTarget() {
  return (
    <div className="tt">
      <div className="tt-card glass sheen">
        <div className="tt-head">
          <GlassRing size={44}><Sparkles size={20} /></GlassRing>
          <div>
            <b>Soft UI Kit</b>
            <span>Design tokens</span>
          </div>
          <Switch checked />
        </div>
        <BarChart values={BAR.slice(2, 11)} labels={MONTHS.slice(2, 11)} />
        <div className="w-row">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Badge tone="accent">Accent</Badge>
        </div>
      </div>
      <div className="tt-mini">
        <div className="tt-chip glass sheen"><RadialProgress value={72} size={74} label="Score" /></div>
        <div className="tt-chip glass sheen"><Progress value={64} label="Sync" /></div>
      </div>
    </div>
  );
}

/* ——— Charts ——— */
const CHARTS = [
  ["Bar", <BarChart key="c1" values={BAR} labels={MONTHS} />],
  ["Line", <LineChart key="c2" values={LINE} labels={MONTHS} fill />],
  [
    "Donut",
    <DonutChart key="c3"
      centerLabel="Total"
      centerValue="2.4k"
      segments={[
        { label: "Design", value: 38 },
        { label: "Code", value: 30 },
        { label: "Ship", value: 20 },
        { label: "Docs", value: 12 },
      ]}
    />,
  ],
  ["Radial", <RadialProgress key="c4" value={86} size={180} label="Health" />],
  [
    "Activity rings",
    <RadialBars key="c5"
      size={190}
      series={[
        { label: "Move", value: 86 },
        { label: "Exercise", value: 64 },
        { label: "Stand", value: 92 },
      ]}
    />,
  ],
  [
    "Radar",
    <RadarChart key="c6"
      size={240}
      axes={["Speed", "Craft", "Docs", "A11y", "Themes", "Motion"]}
      values={[88, 76, 64, 82, 95, 90]}
    />,
  ],
  [
    "Funnel",
    <FunnelChart key="c7"
      stages={[
        { label: "Visits", value: 1200 },
        { label: "Signups", value: 860 },
        { label: "Trials", value: 540 },
        { label: "Paid", value: 310 },
      ]}
    />,
  ],
  ["Heatmap", <HeatmapChart key="c8" rows={7} cols={16} values={HEAT} />],
  ["Dot matrix", <DotMatrixChart key="c9" series={DOTS} labels={DOT_LABELS} max={400} rows={16} />],
  ["Scatter", <ScatterChart key="c10" points={SCATTER} />],
  [
    "Segmented",
    <SegmentedBar key="c11"
      segments={[
        { label: "Glass", value: 44, color: "var(--chart-1)" },
        { label: "Soft", value: 31, color: "var(--chart-2)" },
        { label: "Flat", value: 25, color: "var(--chart-3)" },
      ]}
    />,
  ],
  [
    "Timeline",
    <TimelineBar key="c12"
      markers={[
        { label: "Plan", at: "0%", weight: 2 },
        { label: "Build", at: "30%", weight: 3, color: "var(--chart-2)" },
        { label: "Ship", at: "72%", weight: 2, color: "var(--chart-3)" },
      ]}
    />,
  ],
];

function ChartCard({ title, children, idx }) {
  return (
    <div className="chart-card glass sheen" data-chart={idx}>
      <div className="chart-card__title">{title}</div>
      <div className="chart-card__body">{children}</div>
    </div>
  );
}

/* ——— Dashboards ——— */
const DASHBOARDS = [
  ["ops", "soft-glass", OpsDashboard],
  ["autumn", "soft-glass", AutumnInsightDashboard],
  ["travel", "crystal", TravelDashboard],
  ["finance", "midnight", FinanceDashboard],
  ["kanban", "aurora", KanbanDashboard],
];

const SHELL_LINKS = [
  { to: "#ui", label: "UI Kit", icon: BookOpen },
  { to: "#charts", label: "Charts", icon: BarChart3 },
  { to: "#effects", label: "Effects", icon: Wand2 },
  { to: "#saas", label: "SaaS samples", icon: Store },
  { to: "#landing", label: "Landing", icon: Activity },
];

function withProviders(node, themeName) {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <DashboardShell
          brand={{
            name: "Soft UI Kit",
            tag: themeName,
            icon: (
              <GlassRing size={44} tone="sky" active>
                <Sparkles size={18} />
              </GlassRing>
            ),
          }}
          items={SHELL_LINKS}
        >
          {node}
        </DashboardShell>
      </ThemeProvider>
    </MemoryRouter>
  );
}

/* ——— Icons ——— */
const ICON_NAMES = [
  "Sparkle", "Lightning", "Palette", "ChartLineUp", "Cube", "Heart", "Rocket", "Bell",
  "Globe", "Lock", "Camera", "Cloud", "Code", "Compass", "Crown", "Diamond",
  "Fire", "Flag", "Gift", "Headphones", "House", "Key", "Leaf", "MagicWand",
  "MapPin", "Moon", "MusicNotes", "PaperPlaneTilt", "Planet", "Pulse", "PuzzlePiece", "Shield",
  "ShoppingBag", "Star", "Sun", "Target", "Terminal", "Trophy", "Umbrella", "Wallet",
];
const TONES = ["sky", "lavender", "mint", "peach", "rose", "warn"];

export function renderSnippets() {
  const out = {};

  out.logo = html(
    <GlassRing size={112}>
      <Sparkles size={52} />
    </GlassRing>,
  );
  out.logoSmall = html(
    <GlassRing size={64}>
      <Sparkles size={30} />
    </GlassRing>,
  );

  out.wall = WALL.map((n) => html(n)).join("");
  out.hero = html(<HeroCluster />);
  out.tastePanel = html(<TasteSliders />);
  out.tasteTarget = html(<TasteTarget />);

  out.chartTitles = CHARTS.map(([title]) => title);
  out.wallFew = [0, 1, 2, 3, 4, 8].map((i) => html(WALL[i])).join("");
  out.charts = CHARTS.map(([title, node], i) => html(<ChartCard title={title} idx={i}>{node}</ChartCard>));

  out.dashboards = DASHBOARDS.map(([id, theme, Page]) => ({
    id,
    theme,
    html: html(withProviders(<Page />, theme)),
  }));

  out.icons = ICON_NAMES.map((name, i) => {
    const Icon = Ph[name] || Ph.Sparkle;
    return html(
      <GlassRing size={64} tone={TONES[i % TONES.length]} className="ic-ring">
        <Icon size={28} weight={i % 3 === 0 ? "duotone" : "light"} />
      </GlassRing>,
    );
  });

  out.command = html(
    <Command
      placeholder="Search components…"
      items={[
        { label: "Button", shortcut: "B", icon: <Sparkles size={14} /> },
        { label: "Charts", shortcut: "C", icon: <Sparkles size={14} /> },
        { label: "Themes", shortcut: "T", icon: <Sparkles size={14} /> },
      ]}
    />,
  );

  out.calendar = html(<Calendar value="2026-10-14" onChange={noop} />);
  return out;
}
