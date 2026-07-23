import { useEffect, useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, PanelLeft, PanelLeftClose, Users } from "lucide-react";
import clsx from "clsx";
import { IconButton } from "../ui";

const COLLAPSE_KEY = "suk-sidebar-collapsed";

export function useSidebarCollapsed(defaultCollapsed = false) {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const raw = localStorage.getItem(COLLAPSE_KEY);
      if (raw == null) return defaultCollapsed;
      return raw === "1";
    } catch {
      return defaultCollapsed;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  return [collapsed, setCollapsed];
}

/**
 * Dashboard layout with a collapsible sidebar (icon rail when collapsed).
 * Collapse is a layout control — not part of Taste.
 */
export function DashboardShell({
  children,
  brand,
  items = [],
  footer,
  collapsed: collapsedProp,
  onCollapsedChange,
  defaultCollapsed = false,
  mobileOpen = false,
  onMobileOpenChange,
  className,
  collapsible = true,
}) {
  const labelId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultCollapsed);
  const collapsed = collapsedProp ?? uncontrolled;
  const setCollapsed = onCollapsedChange ?? setUncontrolled;

  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  return (
    <div
      className={clsx(
        "app-shell",
        "dashboard-shell",
        collapsed && "is-collapsed",
        className,
      )}
    >
      <aside
        className={clsx(
          "app-sidebar",
          "glass",
          mobileOpen && "is-open",
          collapsed && "is-collapsed",
        )}
        aria-labelledby={labelId}
      >
        <div className="dashboard-shell__brand-row">
          <div className="brand" id={labelId}>
            {brand?.icon}
            <div className="brand__text">
              <span className="brand__name">{brand?.name ?? "Dashboard"}</span>
              {brand?.tag ? <span className="brand__tag">{brand.tag}</span> : null}
            </div>
          </div>
          {collapsible ? (
            <IconButton
              className="sidebar-collapse-btn desktop-only"
              variant="ghost"
              label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={collapsed}
              onClick={toggleCollapsed}
            >
              {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </IconButton>
          ) : null}
        </div>

        <nav className="side-nav" aria-label="Primary">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to || item.id}
                to={item.to}
                end={item.end}
                aria-label={item.label}
                onClick={() => onMobileOpenChange?.(false)}
              >
                {Icon ? <Icon size={18} strokeWidth={1.7} aria-hidden /> : null}
                <span className="side-nav__label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {footer ? <div className="side-meta glass">{footer}</div> : null}
      </aside>

      <div className="app-main">{children}</div>
    </div>
  );
}

/** Compact interactive preview for the component catalog. */
export function DashboardShellPreview() {
  const [collapsed, setCollapsed] = useState(false);
  const demoItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "team", label: "Team", icon: Users },
  ];

  return (
    <div className={`dash-preview${collapsed ? " is-collapsed" : ""}`}>
      <aside className="dash-preview__side glass">
        <div className="dash-preview__brand">
          <strong>{collapsed ? "S" : "Studio"}</strong>
          <IconButton
            variant="ghost"
            label={collapsed ? "Expand" : "Collapse"}
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? <PanelLeft size={14} /> : <PanelLeftClose size={14} />}
          </IconButton>
        </div>
        <div className="dash-preview__nav">
          {demoItems.map((item) => {
            const Icon = item.icon;
            return (
              <span key={item.id} className="dash-preview__link">
                <Icon size={14} />
                {!collapsed ? <span>{item.label}</span> : null}
              </span>
            );
          })}
        </div>
      </aside>
      <div className="dash-preview__main">
        <div className="dash-preview__kpi" />
        <div className="dash-preview__kpi" />
        <div className="dash-preview__chart" />
      </div>
    </div>
  );
}
