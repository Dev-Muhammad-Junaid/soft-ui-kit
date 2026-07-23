import clsx from "clsx";

/**
 * Shiny glass ring — decorative / accent ring with tweakable shine.
 * `soft` reduces elevation for KPI / dense dashboard use.
 */
export function GlassRing({
  children,
  className,
  size = 56,
  tone = "accent",
  active = true,
  soft = false,
  as: Comp = "div",
  ...props
}) {
  return (
    <Comp
      className={clsx(
        "glass-ring",
        `glass-ring--${tone}`,
        soft && "glass-ring--soft",
        active && "is-active",
        className,
      )}
      style={{ "--ring-size": `${size}px` }}
      {...props}
    >
      {!soft ? <span className="glass-ring__shine" aria-hidden="true" /> : null}
      {!soft ? <span className="glass-ring__glow" aria-hidden="true" /> : null}
      <span className="glass-ring__core">{children}</span>
    </Comp>
  );
}

export function GlassOrbField({ denser = false }) {
  return (
    <div className={clsx("orb-field", denser && "orb-field--dense")} aria-hidden="true">
      <span className="orb orb--a" />
      <span className="orb orb--b" />
      <span className="orb orb--c" />
      <span className="orb orb--d" />
      {denser ? (
        <>
          <span className="orb orb--e" />
          <span className="orb orb--f" />
        </>
      ) : null}
    </div>
  );
}
