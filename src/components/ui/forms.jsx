import { forwardRef, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Eye, EyeOff } from "../icons";
import { useAnchorCoords, useEscapeClose } from "./hooks";

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

export function Label({ children, className, htmlFor }) {
  return (
    <label className={clsx("ui-label", className)} htmlFor={htmlFor}>
      {children}
    </label>
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

export const Input = forwardRef(function Input(
  { className, label, hint, error, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id || props.name || autoId;
  return (
    <div className={clsx("ui-field", error && "has-error", className)}>
      {label ? (
        <label className="ui-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input ref={ref} id={inputId} className="ui-input" {...props} />
      {error ? <span className="ui-hint ui-hint--error">{error}</span> : null}
      {!error && hint ? <span className="ui-hint">{hint}</span> : null}
    </div>
  );
});

export const PasswordInput = forwardRef(function PasswordInput(
  { label, hint, error, id, className, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const autoId = useId();
  const inputId = id || props.name || autoId;
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
          ref={ref}
          id={inputId}
          className="ui-input ui-input--bare"
          type={visible ? "text" : "password"}
          {...props}
        />
      </InputGroup>
    </FormField>
  );
});

export const Textarea = forwardRef(function Textarea(
  { className, label, hint, error, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id || props.name || autoId;
  return (
    <div className={clsx("ui-field", error && "has-error", className)}>
      {label ? (
        <label className="ui-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <textarea ref={ref} id={inputId} className="ui-input ui-textarea" {...props} />
      {error ? <span className="ui-hint ui-hint--error">{error}</span> : null}
      {!error && hint ? <span className="ui-hint">{hint}</span> : null}
    </div>
  );
});

export const Select = forwardRef(function Select(
  { className, label, hint, error, options = [], id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id || props.name || autoId;
  return (
    <div className={clsx("ui-field", error && "has-error", className)}>
      {label ? (
        <label className="ui-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <select ref={ref} id={inputId} className="ui-input ui-select" {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? <span className="ui-hint ui-hint--error">{error}</span> : null}
      {!error && hint ? <span className="ui-hint">{hint}</span> : null}
    </div>
  );
});

export const Checkbox = forwardRef(function Checkbox({ label, className, ...props }, ref) {
  return (
    <label className={clsx("ui-check", className)}>
      <input ref={ref} type="checkbox" {...props} />
      <span className="ui-check__box" aria-hidden="true" />
      {label ? <span>{label}</span> : null}
    </label>
  );
});

export const Radio = forwardRef(function Radio({ label, className, ...props }, ref) {
  return (
    <label className={clsx("ui-radio", className)}>
      <input ref={ref} type="radio" {...props} />
      <span className="ui-radio__dot" aria-hidden="true" />
      {label ? <span>{label}</span> : null}
    </label>
  );
});

export const Switch = forwardRef(function Switch(
  { checked, onCheckedChange, label, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
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
});

export const Slider = forwardRef(function Slider(
  { value, onChange, min = 0, max = 100, step, label, hint, className, ...props },
  ref,
) {
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
        ref={ref}
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
});

export const DateField = forwardRef(function DateField({ label, className, ...props }, ref) {
  return <Input ref={ref} className={className} label={label} type="date" {...props} />;
});

export function OtpInput({ length = 6, value = "", onChange, className }) {
  const chars = Array.from({ length }, (_, i) => value[i] || "");
  return (
    <div className={clsx("ui-otp", className)}>
      {chars.map((ch, i) => (
        <input
          key={`otp-${i}`}
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
  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
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
