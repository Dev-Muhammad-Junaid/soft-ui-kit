import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  JSX,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export function cn(...inputs: Array<string | false | null | undefined>): string;

export const THEMES: Array<{ id: string; name: string; description: string }>;
export const THEME_ACCENT_HUE: Record<string, number>;
export const DEFAULT_TWEAKS: Record<string, number>;
export const DEFAULT_EFFECTS: Record<string, string>;

export function ThemeProvider(props: { children: ReactNode }): JSX.Element;
export function useTheme(): {
  themeId: string;
  setThemeId: (id: string) => void;
  themes: typeof THEMES;
  tweaks: typeof DEFAULT_TWEAKS;
  setTweaks: (next: typeof DEFAULT_TWEAKS | ((prev: typeof DEFAULT_TWEAKS) => typeof DEFAULT_TWEAKS)) => void;
  effects: typeof DEFAULT_EFFECTS;
  effectTheme: string;
};

export const Button: ForwardRefExoticComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline" | "soft" | "ghost" | "link" | "danger";
    size?: "sm" | "md" | "lg";
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  }
>;
export const IconButton: ForwardRefExoticComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    variant?: "ghost" | "glass" | "outline";
  }
>;

export function FormField(props: {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
}): JSX.Element;
export function Label(props: { children?: ReactNode; className?: string; htmlFor?: string }): JSX.Element;
export function InputGroup(props: {
  children?: ReactNode;
  className?: string;
  prepend?: ReactNode;
  append?: ReactNode;
}): JSX.Element;

export const Input: ForwardRefExoticComponent<
  InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode; hint?: ReactNode; error?: ReactNode }
>;
export const PasswordInput: ForwardRefExoticComponent<
  InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode; hint?: ReactNode; error?: ReactNode }
>;
export const Textarea: ForwardRefExoticComponent<
  TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: ReactNode; hint?: ReactNode; error?: ReactNode }
>;
export const Select: ForwardRefExoticComponent<
  SelectHTMLAttributes<HTMLSelectElement> & {
    label?: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    options?: Array<{ value: string; label: string }>;
  }
>;
export const Checkbox: ForwardRefExoticComponent<
  InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }
>;
export const Radio: ForwardRefExoticComponent<
  InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }
>;
export const Switch: ForwardRefExoticComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    checked?: boolean;
    onCheckedChange?: (next: boolean) => void;
    label?: ReactNode;
  }
>;
export const Slider: ForwardRefExoticComponent<
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    value?: number;
    onChange?: (value: number) => void;
    label?: ReactNode;
    hint?: ReactNode;
  }
>;
export const DateField: ForwardRefExoticComponent<
  InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }
>;
export function OtpInput(props: {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}): JSX.Element;
export function Combobox(props: {
  label?: ReactNode;
  options?: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}): JSX.Element;

export function Card(props: {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  padded?: boolean;
  variant?: "glass" | "flat" | "soft" | "outline";
}): JSX.Element;
export function Separator(props: { className?: string; label?: ReactNode }): JSX.Element;
export function ScrollArea(props: { children?: ReactNode; className?: string; style?: CSSProperties }): JSX.Element;
export function AspectRatio(props: { ratio?: number; children?: ReactNode; className?: string }): JSX.Element;
export function Accordion(props: {
  items: Array<{ id: string; title: ReactNode; content: ReactNode }>;
  className?: string;
}): JSX.Element;
export function Collapsible(props: {
  title: ReactNode;
  children?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}): JSX.Element;
export function Resizable(props: {
  left: ReactNode;
  right: ReactNode;
  initial?: number;
  min?: number;
  max?: number;
  className?: string;
}): JSX.Element;

export function Skeleton(props: { className?: string; style?: CSSProperties }): JSX.Element;
export function Alert(props: {
  title?: ReactNode;
  children?: ReactNode;
  tone?: "info" | "success" | "warning" | "danger";
  className?: string;
}): JSX.Element;
export function Progress(props: { value?: number; className?: string; label?: ReactNode }): JSX.Element;
export function EmptyState(props: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}): JSX.Element;
export function Toast(props: { open?: boolean; message?: ReactNode; onClose?: () => void }): JSX.Element | null;
export function ToastProvider(props: { children?: ReactNode }): JSX.Element;
export function useToast(): { push: (message: ReactNode, tone?: string) => void };

export function Badge(props: {
  children?: ReactNode;
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  className?: string;
}): JSX.Element;
export function Avatar(props: { name?: string; src?: string; size?: "sm" | "md" | "lg"; className?: string }): JSX.Element;
export function Table(props: {
  columns: Array<{ key: string; label: ReactNode; render?: (row: Record<string, unknown>) => ReactNode }>;
  rows: Array<Record<string, unknown> & { id: string | number }>;
  className?: string;
}): JSX.Element;
export function DataTable(props: {
  columns: Array<{
    key: string;
    label: ReactNode;
    sortable?: boolean;
    render?: (row: Record<string, unknown>) => ReactNode;
  }>;
  rows: Array<Record<string, unknown> & { id: string | number }>;
  className?: string;
  selectable?: boolean;
  onSelectionChange?: (ids: Array<string | number>) => void;
}): JSX.Element;
export function Carousel(props: { items?: ReactNode[]; className?: string }): JSX.Element;
export function Calendar(props: { value?: string; onChange?: (value: string) => void; className?: string }): JSX.Element;

export function Dialog(props: {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  description?: ReactNode;
}): JSX.Element | null;
export function AlertDialog(props: {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "primary";
  onConfirm?: () => void;
}): JSX.Element | null;
export function Sheet(props: {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children?: ReactNode;
  side?: "left" | "right";
}): JSX.Element | null;
export function DropdownMenu(props: {
  trigger: ReactNode;
  items: Array<{ id?: string; label: string; disabled?: boolean; onSelect?: () => void }>;
  className?: string;
}): JSX.Element;
export function Popover(props: { trigger: ReactNode; children?: ReactNode; className?: string }): JSX.Element;
export function Tooltip(props: { content: ReactNode; children?: ReactNode }): JSX.Element;
export function HoverCard(props: { trigger: ReactNode; children?: ReactNode; className?: string }): JSX.Element;
export function ContextMenu(props: {
  children?: ReactNode;
  items?: Array<{ id?: string; label: string; disabled?: boolean; onSelect?: () => void }>;
  className?: string;
}): JSX.Element;

export function Tabs(props: {
  tabs: Array<{ id: string; label: ReactNode; content?: ReactNode }>;
  value: string;
  onChange?: (id: string) => void;
  className?: string;
}): JSX.Element;
export function Breadcrumb(props: { items: Array<{ label: string; href?: string }>; className?: string }): JSX.Element;
export function Pagination(props: { page: number; pages: number; onChange?: (page: number) => void; className?: string }): JSX.Element;
export function Command(props: {
  items?: Array<{ id?: string; label: string; icon?: ReactNode; shortcut?: string }>;
  placeholder?: string;
  onSelect?: (item: { id?: string; label: string }) => void;
  className?: string;
}): JSX.Element;
export function Kbd(props: { children?: ReactNode; className?: string }): JSX.Element;
export const Toggle: ForwardRefExoticComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & { pressed?: boolean; onPressedChange?: (next: boolean) => void }
>;
export function ToggleGroup(props: {
  value?: string;
  onChange?: (value: string) => void;
  options?: Array<{ value: string; label: ReactNode }>;
  className?: string;
}): JSX.Element;
export function Menubar(props: {
  menus?: Array<{ id?: string; label: string; items?: Array<{ label: string; onSelect?: () => void }> }>;
  className?: string;
}): JSX.Element;

export function BarChart(props: {
  values: number[];
  labels?: string[];
  className?: string;
  formatValue?: (value: number) => string;
}): JSX.Element;
export function LineChart(props: {
  values: number[];
  labels?: string[];
  className?: string;
  formatValue?: (value: number) => string;
  fill?: boolean;
}): JSX.Element;
export function DonutChart(props: {
  segments: Array<{ label: string; value: number; color?: string }>;
  centerLabel?: string;
  className?: string;
}): JSX.Element;
export function Sparkline(props: { values: number[]; className?: string }): JSX.Element;
export function HeatmapChart(props: Record<string, unknown>): JSX.Element;
export function RadialProgress(props: Record<string, unknown>): JSX.Element;
export function RadialBars(props: Record<string, unknown>): JSX.Element;
export function RadarChart(props: Record<string, unknown>): JSX.Element;
export function FunnelChart(props: Record<string, unknown>): JSX.Element;
export function ScatterChart(props: Record<string, unknown>): JSX.Element;
export function DotMatrixChart(props: Record<string, unknown>): JSX.Element;
export function SegmentedBar(props: Record<string, unknown>): JSX.Element;
export function TimelineBar(props: Record<string, unknown>): JSX.Element;

export function GlassRing(props: {
  size?: number;
  tone?: string;
  active?: boolean;
  soft?: boolean;
  children?: ReactNode;
}): JSX.Element;
export function GlassOrbField(props: { denser?: boolean }): JSX.Element;

export function DashboardShell(props: {
  children?: ReactNode;
  brand?: { name?: ReactNode; tag?: ReactNode; icon?: ReactNode };
  items?: Array<{
    to: string;
    id?: string;
    label: string;
    icon?: (props: { size?: number; strokeWidth?: number; "aria-hidden"?: boolean }) => ReactNode;
    end?: boolean;
  }>;
  footer?: ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (next: boolean) => void;
  defaultCollapsed?: boolean;
  mobileOpen?: boolean;
  onMobileOpenChange?: (next: boolean) => void;
  className?: string;
  collapsible?: boolean;
  linkComponent?: (props: {
    to: string;
    end?: boolean;
    children?: ReactNode;
    "aria-label"?: string;
    onClick?: () => void;
  }) => ReactNode;
}): JSX.Element;
export function DashboardShellPreview(): JSX.Element;
export function useSidebarCollapsed(defaultCollapsed?: boolean): [boolean, (next: boolean) => void];

export const icons: Record<string, (props: { size?: number; weight?: string; color?: string }) => JSX.Element>;

export const COMPONENT_CATEGORIES: Array<{ id: string; label: string }>;
export const COMPONENT_REGISTRY: Array<{
  id: string;
  name: string;
  category: string;
  span?: string;
  description: string;
  tags?: string[];
  variants?: string[];
  sizes?: string[];
  animated?: boolean;
  exportName?: string;
}>;
export function searchComponents(query: string, category?: string): typeof COMPONENT_REGISTRY;
