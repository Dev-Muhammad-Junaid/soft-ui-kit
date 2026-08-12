import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  title,
  description,
  action,
  padded = true,
  variant = "glass",
}) {
  return (
    <section
      className={clsx(
        "ui-card",
        variant === "glass" && "glass sheen",
        variant === "flat" && "ui-card--flat",
        variant === "soft" && "ui-card--soft",
        variant === "outline" && "ui-card--outline",
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

export function Separator({ className, label }) {
  return (
    <div className={clsx("ui-sep", className)} role="separator">
      {label ? <span>{label}</span> : null}
    </div>
  );
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

export function Collapsible({ title, children, defaultOpen = false, className }) {
  return (
    <details className={clsx("ui-collapsible", className)} open={defaultOpen || undefined}>
      <summary>{title}</summary>
      <div className="ui-collapsible__body">{children}</div>
    </details>
  );
}

export function Resizable({ left, right, initial = 42, min = 22, max = 78, className }) {
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
