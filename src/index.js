/**
 * Soft UI Kit — public package entry.
 *
 * @example
 * import { Button, Card, ThemeProvider, cn } from "soft-ui-kit";
 * import "soft-ui-kit/styles.css";
 */

import "./styles.css";

export { cn } from "./lib/cn.js";

export * from "./components/ui/index.js";
export {
  ThemeProvider,
  useTheme,
  THEMES,
  THEME_ACCENT_HUE,
  DEFAULT_TWEAKS,
  DEFAULT_EFFECTS,
} from "./theme/ThemeProvider.jsx";

export {
  BarChart,
  LineChart,
  DonutChart,
  Sparkline,
  HoverChart,
} from "./components/charts/Charts.jsx";
export {
  HeatmapChart,
  RadialProgress,
  RadialBars,
  RadarChart,
  FunnelChart,
  ScatterChart,
} from "./components/charts/AdvancedCharts.jsx";
export {
  DotMatrixChart,
  SegmentedBar,
  TimelineBar,
} from "./components/charts/DotMatrixChart.jsx";

export { GlassRing, GlassOrbField } from "./components/effects/GlassRing.jsx";
export {
  DashboardShell,
  DashboardShellPreview,
  useSidebarCollapsed,
} from "./components/layout/DashboardShell.jsx";

export * as icons from "./components/icons.jsx";
export {
  COMPONENT_CATEGORIES,
  COMPONENT_REGISTRY,
  searchComponents,
} from "./components/ui/registry.js";
