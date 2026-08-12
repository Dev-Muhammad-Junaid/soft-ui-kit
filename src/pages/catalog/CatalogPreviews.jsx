import { useState } from "react";
import { Search } from "../../components/icons";
import { DashboardShellPreview } from "../../components/layout/DashboardShell";
import {
  Accordion,
  Alert,
  AlertDialog,
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
  ContextMenu,
  DataTable,
  Dialog,
  DropdownMenu,
  EmptyState,
  FormField,
  HoverCard,
  IconButton,
  Input,
  InputGroup,
  Kbd,
  Label,
  Menubar,
  OtpInput,
  Pagination,
  PasswordInput,
  Popover,
  Progress,
  Radio,
  Select,
  Separator,
  Sheet,
  Skeleton,
  Slider,
  Switch,
  Table,
  Tabs,
  Textarea,
  Toggle,
  ToggleGroup,
  Tooltip,
  useToast,
} from "../../components/ui";

/** Live preview for each UI Kit catalog registry id. */
export function CatalogPreview({ id }) {
  const [on, setOn] = useState(true);
  const [val, setVal] = useState(42);
  const [tab, setTab] = useState("a");
  const [tog, setTog] = useState("7d");
  const [combo, setCombo] = useState("a");
  const [otp, setOtp] = useState("");
  const [date, setDate] = useState("2026-07-22");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pressed, setPressed] = useState(true);

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
    case "label":
      return (
        <div className="preview-stack">
          <Label htmlFor="preview-label-input">Email</Label>
          <Input id="preview-label-input" placeholder="you@studio.dev" />
        </div>
      );
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
        <Collapsible title="More details">
          Hidden until opened.
        </Collapsible>
      );
    case "accordion":
      return (
        <Accordion
          items={[
            { id: "1", title: "What is Soft UI?", content: "Glass + soft kit for dashboards and CRMs." },
            { id: "2", title: "How do themes work?", content: "ThemeProvider + Taste tokens on the document." },
            { id: "3", title: "Where are charts?", content: "Charts and effects have their own gallery pages." },
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
          <Badge tone="success">Healthy</Badge>
          <Badge tone="warning">Watch</Badge>
          <Badge tone="danger">Sev-1</Badge>
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
            { key: "a", label: "ARR" },
            {
              key: "s",
              label: "Status",
              render: (r) => <Badge tone={r.sTone}>{r.s}</Badge>,
            },
          ]}
          rows={[
            { id: 1, n: "Northwind", a: "$48k", s: "Healthy", sTone: "success" },
            { id: 2, n: "Helix", a: "$96k", s: "Watch", sTone: "warning" },
          ]}
        />
      );
    case "data-table":
      return (
        <DataTable
          selectable
          columns={[
            { key: "n", label: "Account", sortable: true },
            { key: "a", label: "ARR", sortable: true },
            {
              key: "s",
              label: "Status",
              render: (r) => <Badge tone={r.sTone}>{r.s}</Badge>,
            },
          ]}
          rows={[
            { id: 1, n: "Northwind", a: "$48k", s: "Healthy", sTone: "success" },
            { id: 2, n: "Helix", a: "$96k", s: "Watch", sTone: "warning" },
            { id: 3, n: "Orbit", a: "$72k", s: "Sev-1", sTone: "danger" },
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
      return <ToastPreview />;
    case "empty-state":
      return (
        <EmptyState
          title="No items"
          description="Create one to begin."
          action={
            <Button size="sm" variant="outline">
              New item
            </Button>
          }
        />
      );
    case "dialog":
      return (
        <>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Save changes"
            description="This writes to the current theme."
            footer={
              <>
                <Button size="sm" variant="ghost" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setDialogOpen(false)}>
                  Save
                </Button>
              </>
            }
          >
            <p className="preview-note">Live Dialog — Escape and backdrop close it.</p>
          </Dialog>
        </>
      );
    case "alert-dialog":
      return (
        <>
          <Button size="sm" variant="danger" onClick={() => setAlertOpen(true)}>
            Delete
          </Button>
          <AlertDialog
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            title="Delete record?"
            description="This cannot be undone."
            confirmLabel="Delete"
            onConfirm={() => setAlertOpen(false)}
          />
        </>
      );
    case "sheet":
      return (
        <>
          <Button size="sm" variant="secondary" onClick={() => setSheetOpen(true)}>
            Open sheet
          </Button>
          <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Filters">
            <p className="preview-note">Side panel content.</p>
            <Button size="sm" onClick={() => setSheetOpen(false)}>
              Done
            </Button>
          </Sheet>
        </>
      );
    case "dropdown":
      return (
        <DropdownMenu
          trigger={
            <Button size="sm" variant="outline">
              Actions
            </Button>
          }
          items={[
            { label: "Edit" },
            { label: "Duplicate" },
            { id: "del", label: "Delete" },
          ]}
        />
      );
    case "popover":
      return (
        <Popover
          trigger={
            <Button size="sm" variant="outline">
              Details
            </Button>
          }
        >
          <strong>Popover</strong>
          <p className="preview-note">Floating rich content.</p>
        </Popover>
      );
    case "hover-card":
      return (
        <HoverCard trigger={<Button size="sm" variant="ghost">Hover</Button>}>
          Maya Chen · Product
        </HoverCard>
      );
    case "context-menu":
      return (
        <ContextMenu items={[{ label: "Copy" }, { label: "Paste" }]}>
          <Button size="sm" variant="soft">
            Right-click me
          </Button>
        </ContextMenu>
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
            { label: "Go to UI Kit", shortcut: "G U" },
            { label: "Open Charts", shortcut: "G H" },
            { label: "Open Effects", shortcut: "G E" },
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
          items={[{ label: "Kit" }, { label: "UI Kit" }, { label: "Button" }]}
        />
      );
    case "pagination":
      return <Pagination page={page} pages={3} onChange={setPage} />;
    case "menubar":
      return (
        <Menubar
          menus={[
            { label: "File", items: [{ label: "New" }, { label: "Save" }] },
            { label: "Edit", items: [{ label: "Undo" }] },
          ]}
        />
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
    case "dashboard-shell":
      return <DashboardShellPreview />;
    default: {
      const _exhaustive = id;
      return <span className="preview-note">No preview for {_exhaustive}</span>;
    }
  }
}

function ToastPreview() {
  const { push } = useToast();
  return (
    <Button size="sm" variant="secondary" onClick={() => push("Saved to kit")}>
      Show toast
    </Button>
  );
}
