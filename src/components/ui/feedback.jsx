import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export function Skeleton({ className, style }) {
  return <div className={clsx("ui-skeleton", className)} style={style} aria-hidden="true" />;
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

export function EmptyState({ title, description, action, className }) {
  return (
    <div className={clsx("ui-empty", className)}>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action}
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
