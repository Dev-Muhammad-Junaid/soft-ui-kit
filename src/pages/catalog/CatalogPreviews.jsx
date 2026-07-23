import { useState } from "react";
import { Bell, Check, Info, Search } from "lucide-react";
import { BorderBeam } from "border-beam";
import { MetalFx } from "metal-fx";
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

/** Compact live preview for each catalog registry id. */
export function CatalogPreview({ id }) {
  const [on, setOn] = useState(true);
  const [val, setVal] = useState(42);
  const [tab, setTab] = useState("a");
  const [tog, setTog] = useState("7d");
  const [combo, setCombo] = useState("a");
  const [otp, setOtp] = useState("");
  const [date, setDate] = useState("2026-07-22");
  const [page, setPage] = useState(1);
  const [pressed, setPressed] = useState(false);

  switch (id) {
    case "button":
      return (
        <div className="preview-row">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
          <Button size="sm" variant="soft">
            Soft
          </Button>
        </div>
      );
    case "icon-button":
      return (
        <IconButton label="Search" variant="glass">
          <Search size={16} />
        </IconButton>
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
        <Card title="Card" description="Glass surface" padded>
          Content
        </Card>
      );
    case "separator":
      return <Separator label="Or" />;
    case "scroll-area":
      return (
        <div className="ui-scroll" style={{ maxHeight: 72 }}>
          <p>Scrollable block</p>
          <p>More lines…</p>
          <p>And more…</p>
        </div>
      );
    case "aspect-ratio":
      return (
        <div className="ui-aspect" style={{ paddingBottom: "56%" }}>
          <div className="ui-aspect__inner" style={{ display: "grid", placeItems: "center" }}>
            16:9
          </div>
        </div>
      );
    case "resizable":
      return (
        <div className="ui-resizable" style={{ minHeight: 88 }}>
          <div className="ui-resizable__pane" style={{ width: "45%" }}>
            Left
          </div>
          <div className="ui-resizable__handle" />
          <div className="ui-resizable__pane" style={{ width: "55%" }}>
            Right
          </div>
        </div>
      );
    case "collapsible":
      return <Collapsible title="Details">Hidden copy for FAQs.</Collapsible>;
    case "accordion":
      return (
        <Accordion
          items={[{ id: "1", title: "What is Soft UI?", content: "Glass kit for apps." }]}
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
        <div className="preview-row">
          <GlassRing size={48} tone="sky" soft>
            <Bell size={18} />
          </GlassRing>
          <GlassRing size={48} tone="mint" active>
            <Check size={18} />
          </GlassRing>
          <GlassRing size={48} tone="peach">
            <Info size={18} />
          </GlassRing>
        </div>
      );
    case "border-beam":
      return (
        <BorderBeam size="sm" colorVariant="ocean" theme="auto" strength={0.8}>
          <Button size="sm">Beam</Button>
        </BorderBeam>
      );
    case "metal-fx":
      return (
        <MetalFx variant="button" preset="chromatic" theme="auto">
          <button type="button" className="ui-btn ui-btn--primary ui-btn--sm metal-host">
            Metal
          </button>
        </MetalFx>
      );
    default:
      return <span className="preview-note">Preview coming soon</span>;
  }
}
