import { forwardRef, useState } from "react";
import clsx from "clsx";

export function Tabs({ tabs, value, onChange, className }) {
  return (
    <div className={clsx("ui-tabs", className)}>
      <div className="ui-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={value === tab.id}
            className={clsx("ui-tabs__tab", value === tab.id && "is-active")}
            onClick={() => onChange?.(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="ui-tabs__panel">{tabs.find((t) => t.id === value)?.content}</div>
    </div>
  );
}

export function Breadcrumb({ items, className }) {
  return (
    <nav className={clsx("ui-breadcrumb", className)} aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label} className="ui-breadcrumb__item">
          {i > 0 ? <span className="ui-breadcrumb__sep">/</span> : null}
          {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function Pagination({ page, pages, onChange, className }) {
  return (
    <div className={clsx("ui-pagination", className)}>
      <button type="button" disabled={page <= 1} onClick={() => onChange?.(page - 1)}>
        Prev
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          className={clsx(n === page && "is-active")}
          onClick={() => onChange?.(n)}
        >
          {n}
        </button>
      ))}
      <button type="button" disabled={page >= pages} onClick={() => onChange?.(page + 1)}>
        Next
      </button>
    </div>
  );
}

export function Command({ items = [], placeholder = "Type a command…", onSelect, className }) {
  const [q, setQ] = useState("");
  const filtered = items.filter((item) => item.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className={clsx("ui-command glass sheen", className)}>
      <input
        className="ui-command__input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
      />
      <div className="ui-command__list" role="listbox">
        {filtered.length === 0 ? (
          <div className="ui-command__empty">No results</div>
        ) : (
          filtered.map((item) => (
            <button
              key={item.id || item.label}
              type="button"
              className="ui-command__item"
              onClick={() => onSelect?.(item)}
            >
              {item.icon ? <span>{item.icon}</span> : null}
              <span>{item.label}</span>
              {item.shortcut ? <kbd className="ui-kbd">{item.shortcut}</kbd> : null}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export function Kbd({ children, className }) {
  return <kbd className={clsx("ui-kbd", className)}>{children}</kbd>;
}

export const Toggle = forwardRef(function Toggle(
  { pressed, onPressedChange, children, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      className={clsx("ui-toggle", pressed && "is-on", className)}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    >
      {children}
    </button>
  );
});

export function ToggleGroup({ value, onChange, options = [], className }) {
  return (
    <div className={clsx("ui-toggle-group", className)} role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={clsx("ui-toggle", value === opt.value && "is-on")}
          aria-pressed={value === opt.value}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function Menubar({ menus = [], className }) {
  const [open, setOpen] = useState(null);
  return (
    <div className={clsx("ui-menubar glass sheen", className)} role="menubar">
      {menus.map((menu) => (
        <div key={menu.id || menu.label} className="ui-menubar__item">
          <button
            type="button"
            className={clsx("ui-menubar__trigger", open === menu.label && "is-open")}
            onClick={() => setOpen((v) => (v === menu.label ? null : menu.label))}
          >
            {menu.label}
          </button>
          {open === menu.label ? (
            <div className="ui-menubar__panel glass sheen" role="menu">
              {(menu.items || []).map((item) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  className="ui-dropdown__item"
                  onClick={() => {
                    item.onSelect?.();
                    setOpen(null);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
