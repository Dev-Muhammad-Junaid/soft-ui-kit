import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Activity,
  BarChart3,
  BookOpen,
  Boxes,
  SlidersHorizontal,
  Sparkles,
  Store,
  Wand2,
} from "../icons";
import { GlassOrbField, GlassRing } from "../effects/GlassRing";
import { PlaygroundDrawer } from "../playground/PlaygroundDrawer";
import { IconButton } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";
import { ThemeFab } from "./ThemeFab";
import { DashboardShell, useSidebarCollapsed } from "./DashboardShell";

const LINKS = [
  { to: "/ui", label: "UI Kit", icon: BookOpen },
  { to: "/charts", label: "Charts", icon: BarChart3 },
  { to: "/effects", label: "Effects", icon: Wand2 },
  { to: "/icon-styles/frosted", label: "Icons · Frosted", icon: Boxes },
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
          icon: (
            <GlassRing size={44} tone="sky" active>
              <Sparkles size={18} strokeWidth={1.7} />
            </GlassRing>
          ),
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
            <Boxes size={18} />
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
