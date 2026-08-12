import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { X } from "../icons";
import { Button } from "./Button";
import { useAnchorCoords, useBodyScrollLock, useEscapeClose } from "./hooks";

export function Dialog({ open, onClose, title, children, footer, description }) {
  useEscapeClose(open, onClose);
  useBodyScrollLock(open);
  if (!open) return null;
  return createPortal(
    <div className="ui-dialog-root" role="presentation">
      <button type="button" className="ui-dialog__backdrop" aria-label="Dismiss dialog" onClick={onClose} />
      <div className="ui-dialog glass sheen" role="dialog" aria-modal="true" aria-label={title}>
        <header className="ui-dialog__head">
          <div>
            <h3>{title}</h3>
            {description ? <p className="ui-dialog__desc">{description}</p> : null}
          </div>
          <button type="button" className="ui-icon-btn ui-icon-btn--ghost" onClick={onClose} aria-label="Close">
            <X size={16} />
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

export function Sheet({ open, onClose, title, children, side = "right" }) {
  useEscapeClose(open, onClose);
  useBodyScrollLock(open);
  if (!open) return null;
  return createPortal(
    <div className="ui-sheet-root" role="presentation">
      <button type="button" className="ui-sheet__backdrop" aria-label="Dismiss sheet" onClick={onClose} />
      <aside
        className={clsx("ui-sheet glass sheen", `ui-sheet--${side}`)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="ui-sheet__head">
          <h3>{title}</h3>
          <button type="button" className="ui-icon-btn ui-icon-btn--ghost" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </header>
        <div className="ui-sheet__body">{children}</div>
      </aside>
    </div>,
    document.body,
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
