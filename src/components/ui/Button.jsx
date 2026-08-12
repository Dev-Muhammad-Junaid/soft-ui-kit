import { forwardRef } from "react";
import clsx from "clsx";

export const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx("ui-btn", `ui-btn--${variant}`, `ui-btn--${size}`, className)}
      {...props}
    >
      {leftIcon ? <span className="ui-btn__icon">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className="ui-btn__icon">{rightIcon}</span> : null}
    </button>
  );
});

export const IconButton = forwardRef(function IconButton(
  { children, className, label, variant = "ghost", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={clsx("ui-icon-btn", `ui-icon-btn--${variant}`, className)}
      {...props}
    >
      {children}
    </button>
  );
});
