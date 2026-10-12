import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  Menu,
  SlidersHorizontal,
  Store,
} from "../icons";
import { GlassOrbField } from "./GlassOrbField";
import { Logo } from "../brand/Logo";
import { PlaygroundDrawer } from "../playground/PlaygroundDrawer";
import { IconButton } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";
import { ThemeFab } from "./ThemeFab";
import { DashboardShell, useSidebarCollapsed } from "./DashboardShell";

const LINKS = [
  { to: "/ui", label: "UI Kit", icon: BookOpen },
  { to: "/charts", label: "Charts", icon: BarChart3 },
  { to: "/saas", label: "SaaS samples", icon: Store },
  { to: "/", label: "Landing", icon: Activity },
];

export function AppShell({ children, sidebarOpen, setSidebarOpen }) {
  const { themeId, themes } = useTheme();
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [collapsed, setCollapsed] = useSidebarCollapsed(false);
  const themeName = themes.find((t) => t.id === themeId)?.name;

  return (
    <>
      <GlassOrbField denser />
      <div
        className={`sidebar-backdrop${sidebarOpen ? " is-open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <DashboardShell
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        mobileOpen={sidebarOpen}
        onMobileOpenChange={setSidebarOpen}
        brand={{
          name: "Soft UI Kit",
          tag: themeName,
          icon: <Logo size={42} />,
        }}
        items={LINKS}
        linkComponent={NavLink}
        footer="Use the sidebar icon to collapse to a rail — Theme and Taste FABs stay on every page."
      >
        <div className="page-actions page-actions--shell">
          <IconButton
            className="mobile-nav-toggle"
            variant="glass"
            label="Open navigation"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </IconButton>
        </div>
        {children}
      </DashboardShell>

      <div className="fab-stack">
        <ThemeFab />
        <button
          type="button"
          className={`taste-fab glass sheen${playgroundOpen ? " is-active" : ""}`}
          onClick={() => setPlaygroundOpen((open) => !open)}
          aria-label={playgroundOpen ? "Close taste playground" : "Open taste playground"}
          aria-pressed={playgroundOpen}
        >
          <SlidersHorizontal size={18} />
          <span>Taste</span>
        </button>
      </div>

      <PlaygroundDrawer open={playgroundOpen} onClose={() => setPlaygroundOpen(false)} />
    </>
  );
}
