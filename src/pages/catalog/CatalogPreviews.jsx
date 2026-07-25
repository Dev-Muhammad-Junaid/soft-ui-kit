import { useState } from "react";
import { Bell, Check, Info, Search, Sparkles } from "../../components/icons";
import { BorderBeam } from "border-beam";
import { MetalFx } from "metal-fx";
import { useTheme } from "../../theme/ThemeProvider";
import {
  BORDER_BEAM_COLORS,
  BORDER_BEAM_OPTIONS,
  METAL_FX_OPTIONS,
} from "../../components/playground/tweakControls";
import { BarChart, DonutChart, LineChart, Sparkline } from "../../components/charts";
import {
  FunnelChart,
  HeatmapChart,
  RadarChart,
  RadialBars,
  RadialProgress,
  ScatterChart,
} from "../../components/charts/AdvancedCharts";
import {
  DotMatrixChart,
  SegmentedBar,
  TimelineBar,
} from "../../components/charts/DotMatrixChart";
import { GlassRing } from "../../components/effects/GlassRing";
import { DashboardShellPreview } from "../../components/layout/DashboardShell";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Checkbox,
  Collapsible,
  Combobox,
  Command,
  FormField,
  IconButton,
  Input,
  InputGroup,
  Kbd,
  Label,
  OtpInput,
  Pagination,
  PasswordInput,
  Progress,
  Radio,
  Select,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Table,
  Tabs,
  Textarea,
  Toggle,
  ToggleGroup,
  Tooltip,
} from "../../components/ui";

/** Live preview for each catalog registry id. */
export function CatalogPreview({ id }) {
  const { effectTheme } = useTheme();
  const [on, setOn] = useState(true);
  const [val, setVal] = useState(42);
  const [tab, setTab] = useState("a");
  const [tog, setTog] = useState("7d");
  const [combo, setCombo] = useState("a");
  const [otp, setOtp] = useState("");
  const [date, setDate] = useState("2026-07-22");
  const [page, setPage] = useState(1);
  const [pressed, setPressed] = useState(false);
  const [beamSize, setBeamSize] = useState("md");
  const [beamColor, setBeamColor] = useState("ocean");
  const [metalPreset, setMetalPreset] = useState("chromatic");

  switch (id) {
    case "button":
      return (
        <div className="preview-stack">
          <div className="preview-row">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
            <Button size="sm" variant="soft">
              Soft
            </Button>
          </div>
          <div className="preview-row">
            <Button size="sm" variant="ghost">
              Ghost
            </Button>
            <Button size="sm" variant="link">
              Link
            </Button>
            <Button size="sm" variant="danger">
              Danger
            </Button>
            <Button size="md" variant="outline">
              Outline md
            </Button>
          </div>
        </div>
      );
    case "icon-button":
      return (
        <div className="preview-row">
          <IconButton label="Ghost" variant="ghost">
            <Search size={16} />
          </IconButton>
          <IconButton label="Glass" variant="glass">
            <Search size={16} />
          </IconButton>
          <IconButton label="Outline" variant="outline">
            <Search size={16} />
          </IconButton>
        </div>
      );
    case "input":
      return <Input label="Email" placeholder="you@studio.dev" />;
    case "textarea":
      return <Textarea label="Notes" placeholder="Write…" />;
    case "select":
      return (
        <Select
          label="Role"
          options={[
            { value: "a", label: "Design" },
            { value: "b", label: "Eng" },
          ]}
        />
      );
    case "checkbox":
      return <Checkbox label="Subscribe" defaultChecked />;
    case "radio":
      return (
        <div className="preview-row">
          <Radio name="p" label="A" defaultChecked />
          <Radio name="p" label="B" />
        </div>
      );
    case "switch":
      return <Switch checked={on} onCheckedChange={setOn} label={on ? "On" : "Off"} />;
    case "slider":
      return <Slider label="Level" value={val} onChange={setVal} />;
    case "toggle":
      return (
        <Toggle pressed={pressed} onPressedChange={setPressed}>
          Bold
        </Toggle>
      );
    case "toggle-group":
      return (
        <ToggleGroup
          value={tog}
          onChange={setTog}
          options={[
            { value: "7d", label: "7d" },
            { value: "30d", label: "30d" },
          ]}
        />
      );
    case "combobox":
      return (
        <Combobox
          label="Project"
          value={combo}
          onChange={setCombo}
          options={[
            { value: "a", label: "Aurora" },
            { value: "b", label: "Beacon" },
          ]}
        />
      );
    case "otp":
      return <OtpInput value={otp} onChange={setOtp} length={4} />;
    case "date-field":
      return (
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      );
    case "calendar":
      return <Calendar value={date} onChange={setDate} />;
    case "label":
      return <Label>Field label</Label>;
    case "form-field":
      return (
        <FormField label="Name" hint="Visible on invoices" htmlFor="pv-name">
          <input id="pv-name" className="ui-input" placeholder="Acme" />
        </FormField>
      );
    case "input-group":
      return (
        <FormField label="Amount" htmlFor="pv-amt">
          <InputGroup prepend="$">
            <input id="pv-amt" className="ui-input ui-input--bare" placeholder="0.00" />
          </InputGroup>
        </FormField>
      );
    case "password-input":
      return <PasswordInput label="Password" placeholder="••••••••" />;
    case "card":
      return (
        <div className="preview-card-grid">
          <Card title="Glass" description="Default frost" padded variant="glass">
            Soft content
          </Card>
          <Card title="Outline" description="Border only" padded variant="outline">
            Crisp edge
          </Card>
          <Card title="Soft" description="Lifted panel" padded variant="soft">
            Elevated
          </Card>
          <Card title="Flat" description="No glass" padded variant="flat">
            Minimal
          </Card>
        </div>
      );
    case "dashboard-shell":
      return <DashboardShellPreview />;
    case "separator":
      return <Separator label="Or" />;
    case "scroll-area":
      return (
        <div className="ui-scroll catalog-scroll-demo">
          {["Inbox", "Mentions", "Approvals", "Billing", "Audit log", "Integrations"].map((row) => (
            <div key={row} className="catalog-scroll-demo__row">
              {row}
            </div>
          ))}
        </div>
      );
    case "aspect-ratio":
      return (
        <div className="ui-aspect" style={{ paddingBottom: "56%" }}>
          <div className="ui-aspect__inner" style={{ display: "grid", placeItems: "center" }}>
            16:9 media frame
          </div>
        </div>
      );
    case "resizable":
      return (
        <div className="ui-resizable catalog-resizable-demo">
          <div className="ui-resizable__pane" style={{ width: "42%" }}>
            <strong>Nav</strong>
            <p className="preview-note">Sidebar pane</p>
          </div>
          <div className="ui-resizable__handle" />
          <div className="ui-resizable__pane" style={{ width: "58%" }}>
            <strong>Canvas</strong>
            <p className="preview-note">Drag the handle to resize</p>
          </div>
        </div>
      );
    case "collapsible":
      return (
        <Collapsible title="Release notes" defaultOpen>
          Shipping notes, changelog bullets, and optional detail that stays out of the way until opened.
        </Collapsible>
      );
    case "accordion":
      return (
        <Accordion
          items={[
            { id: "1", title: "What is Soft UI?", content: "Glass + soft kit for dashboards and CRMs." },
            { id: "2", title: "How do themes work?", content: "ThemeProvider + Taste tokens on the document." },
            { id: "3", title: "Can I collapse the shell?", content: "Yes — DashboardShell icon rail is built in." },
          ]}
        />
      );
    case "skeleton":
      return (
        <div className="stack">
          <Skeleton style={{ width: "80%" }} />
          <Skeleton style={{ width: "55%" }} />
        </div>
      );
    case "badge":
      return (
        <div className="preview-row">
          <Badge>Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success">OK</Badge>
        </div>
      );
    case "avatar":
      return (
        <div className="preview-row">
          <Avatar name="Maya Chen" />
          <Avatar name="Jordan Lee" size="sm" />
        </div>
      );
    case "table":
      return (
        <Table
          columns={[
            { key: "n", label: "Name" },
            { key: "r", label: "Role" },
          ]}
          rows={[{ id: 1, n: "Maya", r: "Design" }]}
        />
      );
    case "data-table":
      return (
        <Table
          columns={[
            { key: "n", label: "Account" },
            { key: "a", label: "ARR" },
          ]}
          rows={[
            { id: 1, n: "Northwind", a: "$48k" },
            { id: 2, n: "Helix", a: "$96k" },
          ]}
        />
      );
    case "progress":
      return <Progress label="Upload" value={64} />;
    case "alert":
      return (
        <Alert tone="info" title="Synced">
          Nightly job finished.
        </Alert>
      );
    case "toast":
      return <Badge tone="accent">Use Taste / actions to fire toasts</Badge>;
    case "empty-state":
      return (
        <div className="ui-empty" style={{ padding: 12 }}>
          <h3 style={{ fontSize: 14 }}>No items</h3>
          <p style={{ fontSize: 12 }}>Create one to begin.</p>
        </div>
      );
    case "dialog":
      return (
        <div className="preview-chrome glass sheen">
          <strong>Dialog</strong>
          <p className="preview-note">Confirm this action?</p>
          <div className="preview-row">
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
            <Button size="sm">Confirm</Button>
          </div>
        </div>
      );
    case "alert-dialog":
      return (
        <div className="preview-chrome glass sheen">
          <strong>Delete project?</strong>
          <p className="preview-note">This cannot be undone.</p>
          <div className="preview-row">
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
            <Button size="sm" variant="danger">
              Delete
            </Button>
          </div>
        </div>
      );
    case "sheet":
      return (
        <div className="preview-chrome preview-chrome--sheet glass sheen">
          <strong>Sheet</strong>
          <p className="preview-note">Side panel content</p>
          <Button size="sm" variant="secondary">
            Done
          </Button>
        </div>
      );
    case "dropdown":
    case "popover":
    case "hover-card":
    case "context-menu":
      return (
        <div className="preview-menu glass sheen">
          <button type="button" className="preview-menu__item">
            Edit
          </button>
          <button type="button" className="preview-menu__item">
            Duplicate
          </button>
          <button type="button" className="preview-menu__item is-danger">
            Delete
          </button>
        </div>
      );
    case "tooltip":
      return (
        <Tooltip content="Hint">
          <Button size="sm" variant="soft">
            Hover me
          </Button>
        </Tooltip>
      );
    case "command":
      return (
        <Command
          items={[
            { label: "Go to Catalog", shortcut: "G C" },
            { label: "Open Charts", shortcut: "G H" },
          ]}
        />
      );
    case "tabs":
      return (
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "a", label: "One", content: <span className="preview-note">Panel A</span> },
            { id: "b", label: "Two", content: <span className="preview-note">Panel B</span> },
          ]}
        />
      );
    case "breadcrumb":
      return (
        <Breadcrumb
          items={[{ label: "Kit" }, { label: "Catalog" }, { label: "Button" }]}
        />
      );
    case "pagination":
      return <Pagination page={page} pages={3} onChange={setPage} />;
    case "menubar":
      return (
        <div className="ui-menubar glass sheen">
          <button type="button" className="ui-menubar__trigger">
            File
          </button>
          <button type="button" className="ui-menubar__trigger">
            Edit
          </button>
        </div>
      );
    case "kbd":
      return <Kbd>⌘K</Kbd>;
    case "carousel":
      return (
        <Carousel
          items={[
            <div key="1">Slide one</div>,
            <div key="2">Slide two</div>,
          ]}
        />
      );
    case "bar-chart":
      return <BarChart values={[20, 35, 28, 44]} labels={["A", "B", "C", "D"]} />;
    case "line-chart":
      return <LineChart fill values={[10, 18, 14, 24, 20]} labels={["1", "2", "3", "4", "5"]} />;
    case "donut-chart":
      return (
        <DonutChart
          segments={[
            { label: "A", value: 40, color: "#38bdf8" },
            { label: "B", value: 35, color: "#a78bfa" },
            { label: "C", value: 25, color: "#34d399" },
          ]}
        />
      );
    case "sparkline":
      return (
        <div className="preview-row">
          <strong>KPI</strong>
          <Sparkline values={[8, 12, 10, 16, 14, 20]} />
        </div>
      );
    case "dot-matrix":
      return (
        <DotMatrixChart
          series={[80, 120, 100, 160, 140, 180]}
          labels={["J", "F", "M", "A", "M", "J"]}
          rows={12}
          max={200}
        />
      );
    case "segmented-bar":
      return (
        <SegmentedBar
          segments={[
            { label: "A", value: 30, color: "#f97316" },
            { label: "B", value: 25, color: "#fbbf24" },
            { label: "C", value: 45, color: "#2dd4bf" },
          ]}
        />
      );
    case "timeline-bar":
      return (
        <TimelineBar
          markers={[
            { label: "12", at: "20%", weight: 1, color: "#93c5fd" },
            { label: "64%", at: "70%", weight: 2, color: "#3b82f6" },
          ]}
        />
      );
    case "heatmap":
      return <HeatmapChart rows={5} cols={8} />;
    case "radial-progress":
      return <RadialProgress value={72} size={96} label="Score" />;
    case "radial-bars":
      return (
        <RadialBars
          series={[
            { label: "A", value: 80, color: "#fb7185" },
            { label: "B", value: 60, color: "#34d399" },
            { label: "C", value: 90, color: "#38bdf8" },
          ]}
        />
      );
    case "radar-chart":
      return (
        <RadarChart axes={["A", "B", "C", "D", "E"]} values={[70, 55, 80, 60, 75]} />
      );
    case "funnel-chart":
      return (
        <FunnelChart
          stages={[
            { label: "In", value: 100, color: "#38bdf8" },
            { label: "Mid", value: 62, color: "#a78bfa" },
            { label: "Out", value: 28, color: "#34d399" },
          ]}
        />
      );
    case "scatter-chart":
      return (
        <ScatterChart
          points={[
            { x: 10, y: 20 },
            { x: 25, y: 35 },
            { x: 40, y: 30 },
            { x: 55, y: 55 },
            { x: 70, y: 48 },
          ]}
        />
      );
    case "glass-ring":
      return (
        <div className="preview-stack">
          <div className="preview-row preview-row--rings">
            {[
              { tone: "sky", label: "Sky", soft: true },
              { tone: "mint", label: "Mint", active: true },
              { tone: "peach", label: "Peach" },
              { tone: "lavender", label: "Lavender", active: true },
              { tone: "rose", label: "Rose" },
              { tone: "warn", label: "Warn", soft: true },
            ].map((ring) => (
              <div key={ring.tone} className="preview-ring-cell">
                <GlassRing size={52} tone={ring.tone} soft={ring.soft} active={ring.active}>
                  {ring.tone === "mint" ? <Check size={18} /> : ring.tone === "peach" ? <Info size={18} /> : <Bell size={18} />}
                </GlassRing>
                <span>{ring.label}</span>
              </div>
            ))}
          </div>
          <p className="preview-note">Shine / glow follow Taste ring dials — soft mode for dense KPIs.</p>
        </div>
      );
    case "border-beam":
      return (
        <div className="preview-stack catalog-effect-demo">
          <div className="preview-row">
            {BORDER_BEAM_OPTIONS.filter((o) => o.id !== "off").map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`taste-option-chip${beamSize === opt.id ? " is-active" : ""}`}
                onClick={() => setBeamSize(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="preview-row">
            {BORDER_BEAM_COLORS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`taste-option-chip${beamColor === opt.id ? " is-active" : ""}`}
                onClick={() => setBeamColor(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="catalog-effect-demo__stage">
            <BorderBeam size={beamSize} colorVariant={beamColor} theme={effectTheme} strength={0.85}>
              <div className="catalog-effect-demo__card glass sheen">
                <strong>{beamSize}</strong>
                <p>Travel, compact, line, pulse, and halo — pick a color variant.</p>
                <Button size="sm" variant="outline">
                  Outline CTA
                </Button>
              </div>
            </BorderBeam>
          </div>
        </div>
      );
    case "metal-fx":
      return (
        <div className="preview-stack catalog-effect-demo">
          <div className="preview-row">
            {METAL_FX_OPTIONS.filter((o) => o.id !== "off").map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`taste-option-chip${metalPreset === opt.id ? " is-active" : ""}`}
                onClick={() => setMetalPreset(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="catalog-effect-demo__stage catalog-effect-demo__stage--metal">
            <MetalFx variant="button" preset={metalPreset} theme={effectTheme} strength={0.9}>
              <button type="button" className="ui-btn ui-btn--primary ui-btn--md metal-host">
                {metalPreset} metal
              </button>
            </MetalFx>
            <MetalFx variant="button" preset={metalPreset} theme={effectTheme}>
              <button type="button" className="ui-btn ui-btn--outline ui-btn--md metal-host">
                Outline host
              </button>
            </MetalFx>
            <MetalFx variant="circle" preset={metalPreset} theme={effectTheme}>
              <button type="button" className="metal-circle" aria-label="Spark">
                <Sparkles size={18} />
              </button>
            </MetalFx>
          </div>
        </div>
      );
    default:
      return <span className="preview-note">Preview coming soon</span>;
  }
}
