import clsx from "clsx";

/** Soft blurred color fields behind glass surfaces, so the frost has something to blur. Static. */
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
