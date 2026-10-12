import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { AlertOctagon, AlertTriangle, CheckCircle2, Info } from "../icons";

const TONE_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertOctagon,
};

export function Skeleton({ className, style }) {
  return <div className={clsx("ui-skeleton", className)} style={style} aria-hidden="true" />;
}

/** `icon` overrides the tone icon; pass `icon={false}` to hide it. */
export function Alert({ title, children, tone = "info", icon, className }) {
  const ToneIcon = TONE_ICONS[tone] || Info;
  const glyph = icon === undefined ? <ToneIcon size={16} weight="regular" /> : icon;
  return (
    <div
      className={clsx("ui-alert", `ui-alert--${tone}`, className)}
      role={tone === "danger" || tone === "warning" ? "alert" : "status"}
    >
      {glyph ? (
        <span className="ui-alert__icon" aria-hidden="true">
          {glyph}
        </span>
      ) : null}
      <div className="ui-alert__body">
        {title ? <strong>{title}</strong> : null}
        {children ? <p>{children}</p> : null}
      </div>
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
  // Portal only after mount: document.body does not exist during server rendering.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
      {mounted && createPortal(
        <div className="ui-toast-stack" aria-live="polite">
          {toasts.map((t) => {
            const ToneIcon = TONE_ICONS[t.tone];
            return (
              <div key={t.id} className={clsx("ui-toast glass sheen", `ui-toast--${t.tone}`)}>
                {ToneIcon ? (
                  <span className="ui-toast__icon" aria-hidden="true">
                    <ToneIcon size={16} weight="regular" />
                  </span>
                ) : null}
                <span>{t.message}</span>
              </div>
            );
          })}
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
