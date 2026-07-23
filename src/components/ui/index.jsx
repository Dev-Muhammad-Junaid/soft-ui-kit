import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

function useEscapeClose(open, onClose) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function useAnchorCoords(open, anchorRef) {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    if (!open || !anchorRef.current) {
      setCoords(null);
      return undefined;
    }
    function measure() {
      const r = anchorRef.current.getBoundingClientRect();
      const menuWidth = 200;
      const left = Math.min(r.left, window.innerWidth - menuWidth - 12);
      const top = Math.min(r.bottom + 8, window.innerHeight - 12);
      setCoords({ top, left, width: Math.max(r.width, 180) });
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, anchorRef]);
  return coords;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  ...props
}) {
  return (
    <button
      type="button"
      className={clsx("ui-btn", `ui-btn--${variant}`, `ui-btn--${size}`, className)}
      {...props}
    >
      {leftIcon ? <span className="ui-btn__icon">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="ui-btn__icon">{rightIcon}</span> : null}
    </button>
  );
}

export function IconButton({ children, className, label, variant = "ghost", ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={clsx("ui-icon-btn", `ui-icon-btn--${variant}`, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className, label, hint, error, id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className={clsx("ui-field", error && "has-error", className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <input id={inputId} className="ui-input" {...props} />
      {error ? <span className="ui-hint ui-hint--error">{error}</span> : null}
      {!error && hint ? <span className="ui-hint">{hint}</span> : null}
    </label>
  );
}

export function FormField({ label, hint, error, htmlFor, children, className, id }) {
  return (
    <div id={id} className={clsx("ui-field", error && "has-error", className)}>
      {label ? (
        <label className="ui-label" htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      {children}
      {error ? <span className="ui-hint ui-hint--error">{error}</span> : null}
      {!error && hint ? <span className="ui-hint">{hint}</span> : null}
    </div>
  );
}

export function InputGroup({ children, className, prepend, append }) {
  return (
    <div className={clsx("ui-input-group", className)}>
      {prepend ? <span className="ui-input-group__affix">{prepend}</span> : null}
      {children}
      {append ? <span className="ui-input-group__affix">{append}</span> : null}
    </div>
  );
}

export function PasswordInput({ label, hint, error, id, className, ...props }) {
  const [visible, setVisible] = useState(false);
  const inputId = id || props.name || "password";
  return (
    <FormField label={label} hint={hint} error={error} htmlFor={inputId} className={className}>
      <InputGroup
        append={
          <button
            type="button"
            className="ui-input-group__btn"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      >
        <input
          id={inputId}
          className="ui-input ui-input--bare"
          type={visible ? "text" : "password"}
          {...props}
        />
      </InputGroup>
    </FormField>
  );
}

export function Textarea({ className, label, hint, id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className={clsx("ui-field", className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <textarea id={inputId} className="ui-input ui-textarea" {...props} />
      {hint ? <span className="ui-hint">{hint}</span> : null}
    </label>
  );
}

export function Select({ className, label, options = [], id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className={clsx("ui-field", className)} htmlFor={inputId}>
      {label ? <span className="ui-label">{label}</span> : null}
      <select id={inputId} className="ui-input ui-select" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Checkbox({ label, className, ...props }) {
  return (
    <label className={clsx("ui-check", className)}>
      <input type="checkbox" {...props} />
      <span className="ui-check__box" aria-hidden="true" />
      {label ? <span>{label}</span> : null}
    </label>
  );
}

export function Radio({ label, className, ...props }) {
  return (
    <label className={clsx("ui-radio", className)}>
      <input type="radio" {...props} />
      <span className="ui-radio__dot" aria-hidden="true" />
      {label ? <span>{label}</span> : null}
    </label>
  );
}

export function Switch({ checked, onCheckedChange, label, className, ...props }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={clsx("ui-switch", checked && "is-on", className)}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span className="ui-switch__track">
        <span className="ui-switch__thumb" />
      </span>
      {label ? <span className="ui-switch__label">{label}</span> : null}
    </button>
  );
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step,
  label,
  hint,
  className,
  ...props
}) {
  return (
    <label className={clsx("ui-slider", className)}>
      {label ? (
        <span className="ui-slider__head">
          <span>
            <span className="ui-label">{label}</span>
            {hint ? <span className="ui-slider__hint">{hint}</span> : null}
          </span>
          <span className="ui-slider__value">{value}</span>
        </span>
      ) : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        {...props}
      />
    </label>
  );
}

export function Card({ children, className, title, description, action, padded = true, variant = "glass" }) {
  return (
    <section
      className={clsx(
        "ui-card",
        variant === "glass" && "glass sheen",
        variant === "flat" && "ui-card--flat",
        variant === "soft" && "ui-card--soft",
        padded && "ui-card--padded",
        className,
      )}
    >
      {(title || action) && (
        <header className="ui-card__head">
          <div>
            {title ? <h3 className="ui-card__title">{title}</h3> : null}
            {description ? <p className="ui-card__desc">{description}</p> : null}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export function Badge({ children, tone = "neutral", className }) {
  return <span className={clsx("ui-badge", `ui-badge--${tone}`, className)}>{children}</span>;
}

export function Avatar({ name, src, size = "md", className }) {
  const initials = name
    ?.split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className={clsx("ui-avatar", `ui-avatar--${size}`, className)} title={name}>
      {src ? <img src={src} alt={name} /> : initials}
    </span>
  );
}

export function Alert({ title, children, tone = "info", className }) {
  return (
    <div className={clsx("ui-alert", `ui-alert--${tone}`, className)} role="status">
      {title ? <strong>{title}</strong> : null}
      {children ? <p>{children}</p> : null}
    </div>
  );
}

export function Progress({ value = 0, className, label }) {
  return (
    <div className={clsx("ui-progress", className)}>
      {label ? (
        <div className="ui-progress__head">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      ) : null}
      <div className="ui-progress__track">
        <div className="ui-progress__bar" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
}

export function Skeleton({ className, style }) {
  return <div className={clsx("ui-skeleton", className)} style={style} aria-hidden="true" />;
}

export function Separator({ className, label }) {
  return (
    <div className={clsx("ui-sep", className)} role="separator">
      {label ? <span>{label}</span> : null}
    </div>
  );
}

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

export function Accordion({ items, className }) {
  return (
    <div className={clsx("ui-accordion", className)}>
      {items.map((item) => (
        <details key={item.id} className="ui-accordion__item">
          <summary>{item.title}</summary>
          <div className="ui-accordion__body">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

export function Table({ columns, rows, className }) {
  return (
    <div className={clsx("ui-table-wrap", className)}>
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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

export function Dialog({ open, onClose, title, children, footer, description }) {
  useEscapeClose(open, onClose);
  useBodyScrollLock(open);
  if (!open) return null;
  return createPortal(
    <div className="ui-dialog-root" role="presentation">
      <button type="button" className="ui-dialog__backdrop" aria-label="Close" onClick={onClose} />
      <div className="ui-dialog glass sheen" role="dialog" aria-modal="true" aria-label={title}>
        <header className="ui-dialog__head">
          <div>
            <h3>{title}</h3>
            {description ? <p className="ui-dialog__desc">{description}</p> : null}
          </div>
          <button type="button" className="ui-icon-btn ui-icon-btn--ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <div className="ui-dialog__body">{children}</div>
        {footer ? <footer className="ui-dialog__foot">{footer}</footer> : null}
      </div>
    </div>,
    document.body,
  );
}

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  tone = "danger",
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}

export function Label({ children, className, htmlFor }) {
  return (
    <label className={clsx("ui-label", className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export function Collapsible({ title, children, defaultOpen = false, className }) {
  return (
    <details className={clsx("ui-collapsible", className)} open={defaultOpen || undefined}>
      <summary>{title}</summary>
      <div className="ui-collapsible__body">{children}</div>
    </details>
  );
}

export function Command({ items = [], placeholder = "Type a command…", onSelect, className }) {
  const [q, setQ] = useState("");
  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(q.toLowerCase()),
  );
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

export function ScrollArea({ children, className, style }) {
  return (
    <div className={clsx("ui-scroll", className)} style={style}>
      {children}
    </div>
  );
}

export function AspectRatio({ ratio = 16 / 9, children, className }) {
  return (
    <div className={clsx("ui-aspect", className)} style={{ paddingBottom: `${100 / ratio}%` }}>
      <div className="ui-aspect__inner">{children}</div>
    </div>
  );
}

export function Tooltip({ content, children }) {
  return (
    <span className="ui-tooltip">
      {children}
      <span className="ui-tooltip__bubble" role="tooltip">
        {content}
      </span>
    </span>
  );
}

export function EmptyState({ title, description, action, className }) {
  return (
    <div className={clsx("ui-empty", className)}>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action}
    </div>
  );
}

export function Toggle({ pressed, onPressedChange, children, className, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={clsx("ui-toggle", pressed && "is-on", className)}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    >
      {children}
    </button>
  );
}

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

export function DropdownMenu({ trigger, items, className }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const coords = useAnchorCoords(open, anchorRef);
  useEscapeClose(open, () => setOpen(false));

  return (
    <div className={clsx("ui-dropdown", className)} ref={anchorRef}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && coords
        ? createPortal(
            <>
              <button
                type="button"
                className="ui-dropdown__scrim"
                aria-label="Close"
                onClick={() => setOpen(false)}
              />
              <div
                className="ui-dropdown__menu glass sheen is-portaled"
                role="menu"
                style={{ top: coords.top, left: coords.left, minWidth: coords.width }}
              >
                {items.map((item) => (
                  <button
                    key={item.id || item.label}
                    type="button"
                    role="menuitem"
                    className="ui-dropdown__item"
                    disabled={item.disabled}
                    onClick={() => {
                      item.onSelect?.();
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}

export function Popover({ trigger, children, className }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const coords = useAnchorCoords(open, anchorRef);
  useEscapeClose(open, () => setOpen(false));

  return (
    <div className={clsx("ui-popover", className)} ref={anchorRef}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && coords
        ? createPortal(
            <>
              <button
                type="button"
                className="ui-dropdown__scrim"
                aria-label="Close"
                onClick={() => setOpen(false)}
              />
              <div
                className="ui-popover__panel glass sheen is-portaled"
                style={{ top: coords.top, left: coords.left, minWidth: Math.max(coords.width, 220) }}
              >
                {children}
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}

export function Sheet({ open, onClose, title, children, side = "right" }) {
  useEscapeClose(open, onClose);
  useBodyScrollLock(open);
  if (!open) return null;
  return createPortal(
    <div className="ui-sheet-root" role="presentation">
      <button type="button" className="ui-sheet__backdrop" aria-label="Close" onClick={onClose} />
      <aside
        className={clsx("ui-sheet glass sheen", `ui-sheet--${side}`)}
        role="dialog"
        aria-modal="true"
      >
        <header className="ui-sheet__head">
          <h3>{title}</h3>
          <button type="button" className="ui-icon-btn ui-icon-btn--ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <div className="ui-sheet__body">{children}</div>
      </aside>
    </div>,
    document.body,
  );
}

export function DateField({ label, className, ...props }) {
  return <Input className={className} label={label} type="date" {...props} />;
}

export function OtpInput({ length = 6, value = "", onChange, className }) {
  const chars = Array.from({ length }, (_, i) => value[i] || "");
  return (
    <div className={clsx("ui-otp", className)}>
      {chars.map((ch, i) => (
        <input
          key={i}
          className="ui-otp__cell"
          inputMode="numeric"
          maxLength={1}
          value={ch}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => {
            const next = value.split("");
            next[i] = e.target.value.replace(/\D/g, "").slice(-1);
            onChange?.(next.join("").slice(0, length));
          }}
        />
      ))}
    </div>
  );
}

export function Combobox({ label, options = [], value, onChange, placeholder = "Search…", className }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const coords = useAnchorCoords(open, anchorRef);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );
  const selected = options.find((o) => o.value === value);
  useEscapeClose(open, () => setOpen(false));

  return (
    <div className={clsx("ui-combobox ui-field", className)} ref={anchorRef}>
      {label ? <span className="ui-label">{label}</span> : null}
      <input
        className="ui-input"
        value={open ? query : selected?.label || ""}
        placeholder={placeholder}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />
      {open && coords
        ? createPortal(
            <>
              <button
                type="button"
                className="ui-dropdown__scrim"
                aria-label="Close"
                onClick={() => setOpen(false)}
              />
              <div
                className="ui-combobox__list glass sheen is-portaled"
                role="listbox"
                style={{ top: coords.top, left: coords.left, width: coords.width }}
              >
                {filtered.length === 0 ? (
                  <div className="ui-combobox__empty">No matches</div>
                ) : (
                  filtered.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      className={clsx("ui-combobox__option", value === opt.value && "is-active")}
                      onClick={() => {
                        onChange?.(opt.value);
                        setOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))
                )}
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}

export function Toast({ open, message, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const t = window.setTimeout(() => onClose?.(), 2200);
    return () => window.clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="ui-toast glass sheen" role="status">
      {message}
    </div>,
    document.body,
  );
}

export function Calendar({ value, onChange, className }) {
  const base = value ? new Date(value) : new Date();
  const year = base.getFullYear();
  const month = base.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: first + days }, (_, i) => {
    if (i < first) return null;
    return i - first + 1;
  });

  return (
    <div className={clsx("ui-calendar glass sheen", className)}>
      <div className="ui-calendar__head">
        {base.toLocaleString("default", { month: "long", year: "numeric" })}
      </div>
      <div className="ui-calendar__grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <span key={d} className="ui-calendar__dow">
            {d}
          </span>
        ))}
        {cells.map((day, i) =>
          day == null ? (
            <span key={`e-${i}`} />
          ) : (
            <button
              key={day}
              type="button"
              className={clsx(
                "ui-calendar__day",
                value === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` &&
                  "is-active",
              )}
              onClick={() =>
                onChange?.(
                  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
                )
              }
            >
              {day}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export function Carousel({ items = [], className }) {
  const [index, setIndex] = useState(0);
  const item = items[index];
  return (
    <div className={clsx("ui-carousel glass sheen", className)}>
      <div className="ui-carousel__frame">{item}</div>
      <div className="ui-carousel__nav">
        <button type="button" onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}>
          Prev
        </button>
        <span>
          {index + 1}/{items.length}
        </span>
        <button type="button" onClick={() => setIndex((i) => (i + 1) % items.length)}>
          Next
        </button>
      </div>
    </div>
  );
}

export function HoverCard({ trigger, children, className }) {
  return (
    <span className={clsx("ui-hovercard", className)}>
      {trigger}
      <span className="ui-hovercard__panel glass sheen">{children}</span>
    </span>
  );
}

export function ContextMenu({ children, items = [], className }) {
  const [pos, setPos] = useState(null);
  useEscapeClose(Boolean(pos), () => setPos(null));

  return (
    <div
      className={clsx("ui-context", className)}
      onContextMenu={(e) => {
        e.preventDefault();
        const menuW = 200;
        const menuH = Math.min(280, (items.length || 1) * 42 + 16);
        const x = Math.min(e.clientX, window.innerWidth - menuW - 8);
        const y = Math.min(e.clientY, window.innerHeight - menuH - 8);
        setPos({ x, y });
      }}
    >
      {children}
      {pos
        ? createPortal(
            <>
              <button
                type="button"
                className="ui-dropdown__scrim"
                aria-label="Close"
                onClick={() => setPos(null)}
              />
              <div
                className="ui-context__menu glass sheen is-portaled"
                style={{ left: pos.x, top: pos.y }}
                role="menu"
              >
                {items.map((item) => (
                  <button
                    key={item.id || item.label}
                    type="button"
                    role="menuitem"
                    className="ui-dropdown__item"
                    disabled={item.disabled}
                    onClick={() => {
                      item.onSelect?.();
                      setPos(null);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </>,
            document.body,
          )
        : null}
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

export function DataTable({
  columns,
  rows,
  className,
  selectable = false,
  onSelectionChange,
}) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [selected, setSelected] = useState(() => new Set());

  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort]);

  function toggleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }

  function toggleRow(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onSelectionChange?.([...next]);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => {
      const next =
        prev.size === rows.length ? new Set() : new Set(rows.map((r) => r.id));
      onSelectionChange?.([...next]);
      return next;
    });
  }

  return (
    <div className={clsx("ui-table-wrap", className)}>
      <table className="ui-table ui-data-table">
        <thead>
          <tr>
            {selectable ? (
              <th className="ui-data-table__check">
                <input
                  type="checkbox"
                  checked={selected.size === rows.length && rows.length > 0}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
            ) : null}
            {columns.map((col) => (
              <th key={col.key}>
                {col.sortable ? (
                  <button type="button" className="ui-data-table__sort" onClick={() => toggleSort(col.key)}>
                    {col.label}
                    <span aria-hidden="true">
                      {sort.key === col.key ? (sort.dir === "asc" ? " ↑" : " ↓") : " ↕"}
                    </span>
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={clsx(selected.has(row.id) && "is-selected")}>
              {selectable ? (
                <td className="ui-data-table__check">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`Select ${row.id}`}
                  />
                </td>
              ) : null}
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Resizable({
  left,
  right,
  initial = 42,
  min = 22,
  max = 78,
  className,
}) {
  const [pct, setPct] = useState(initial);
  const dragging = useRef(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onMove(e) {
      if (!dragging.current || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const next = ((e.clientX - rect.left) / rect.width) * 100;
      setPct(Math.min(max, Math.max(min, next)));
    }
    function onUp() {
      dragging.current = false;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [min, max]);

  return (
    <div className={clsx("ui-resizable", className)} ref={rootRef}>
      <div className="ui-resizable__pane" style={{ width: `${pct}%` }}>
        {left}
      </div>
      <button
        type="button"
        className="ui-resizable__handle"
        aria-label="Resize panes"
        onPointerDown={() => {
          dragging.current = true;
        }}
      />
      <div className="ui-resizable__pane" style={{ width: `${100 - pct}%` }}>
        {right}
      </div>
    </div>
  );
}

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const api = useMemo(
    () => ({
      push: (message, tone = "default") => {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts((prev) => [...prev, { id, message, tone }]);
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2600);
      },
    }),
    [],
  );

  return (
    <ToastCtx.Provider value={api}>
      {children}
      {createPortal(
        <div className="ui-toast-stack" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} className={clsx("ui-toast glass sheen", `ui-toast--${t.tone}`)}>
              {t.message}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    return {
      push: (message) => {
        console.warn("useToast requires ToastProvider", message);
      },
    };
  }
  return ctx;
}


