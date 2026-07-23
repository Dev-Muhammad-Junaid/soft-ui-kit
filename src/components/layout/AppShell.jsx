import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Activity,
  BarChart3,
  BookOpen,
  Boxes,
  Briefcase,
  Plane,
  SlidersHorizontal,
  Sparkles,
  Store,
  TrendingUp,
  Wand2,
  Wallet,
} from "lucide-react";
import { GlassOrbField, GlassRing } from "../effects/GlassRing";
import { PlaygroundDrawer } from "../playground/PlaygroundDrawer";
import { IconButton } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";
import { ThemeFab } from "./ThemeFab";

const LINKS = [
  { to: "/catalog", label: "Catalog", icon: BookOpen },
  { to: "/charts", label: "Charts", icon: BarChart3 },
  { to: "/effects", label: "Effects", icon: Wand2 },
  { to: "/saas", label: "SaaS samples", icon: Store },
  { to: "/saas/autumn", label: "Autumn Insight", icon: TrendingUp },
  { to: "/saas/travel", label: "Travel CRM", icon: Plane },
  { to: "/saas/finance", label: "Finance", icon: Wallet },
  { to: "/saas/kanban", label: "Kanban KPIs", icon: Briefcase },
  { to: "/", label: "Landing", icon: Activity },
];

export function AppShell({ children, sidebarOpen, setSidebarOpen }) {
  const { themeId, themes } = useTheme();
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const themeName = themes.find((t) => t.id === themeId)?.name;

  return (
    <>
      <GlassOrbField denser />
      <div
        className={`sidebar-backdrop${sidebarOpen ? " is-open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <div className="app-shell">
        <aside className={`app-sidebar glass${sidebarOpen ? " is-open" : ""}`}>
          <div className="brand">
            <GlassRing size={44} tone="sky" active>
              <Sparkles size={18} strokeWidth={1.7} />
            </GlassRing>
            <div className="brand__text">
              <span className="brand__name">Soft UI Kit</span>
              <span className="brand__tag">{themeName}</span>
            </div>
          </div>

          <nav className="side-nav" aria-label="Primary">
            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={18} strokeWidth={1.7} />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="side-meta glass">
            Theme and Taste FABs stay available on every page — switch look, then
            fine-tune frost and motion.
          </div>
        </aside>

        <div className="app-main">
          <div className="page-actions" style={{ marginBottom: 12 }}>
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
        </div>
      </div>

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
