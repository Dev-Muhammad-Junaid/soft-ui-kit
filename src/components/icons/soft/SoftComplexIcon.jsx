import { useId } from "react";
import { CHROME_ICON_KEYS, COMPLEX_ICON_KEYS, renderComplexIcon } from "./complexIcons";
import {
  FROSTED_CATEGORIES,
  FROSTED_ICON_KEYS,
  FROSTED_LABELS,
  FROSTED_STANDARDS,
  FROSTED_VERSIONS,
} from "./frostedRegistry";

/**
 * Soft Complex SVG icon — layered glass / chrome scenes for animation & control.
 *
 * Controllable via CSS variables on the host:
 *   --soft-cx-intensity (0–1)
 * Layers: [data-soft-layer="shadow|extrude|face|glyph|specular|glow"]
 *
 * Frosted glass `version`:
 *   - "bare"  — lab surface: SoftMark language (Arrow / User / Bell / Chart)
 *   - "tiled" — origin Soft Complex plates (not shown on the lab page)
 */
export function SoftComplexIcon({
  name = "check",
  material = "glass",
  version = "bare",
  size = 48,
  intensity = 1,
  animate = false,
  className,
  title,
  style,
  /** Override icon accent; defaults to theme `--accent` via SoftSvg currentColor. */
  color,
  ...props
}) {
  const uid = useId().replace(/:/g, "");
  const plate = version !== "bare";
  const node = renderComplexIcon(name, material, {
    uid,
    size,
    plate,
    version,
    color,
    title: title ?? FROSTED_LABELS[name] ?? name,
    className: [
      "soft-cx",
      `soft-cx--${material}`,
      plate ? "soft-cx--tiled" : "soft-cx--bare",
      animate ? "soft-cx--animate" : "",
      className,
    ]
      .filter(Boolean)
      .join(" "),
    style: {
      "--soft-cx-intensity": intensity,
      ...(color != null ? { color } : null),
      ...style,
    },
    ...props,
  });

  if (!node) {
    return (
      <span
        className={className}
        style={{ width: size, height: size, display: "inline-block" }}
        aria-hidden={!title}
      />
    );
  }

  return node;
}

export function SoftComplexIconSet({
  material = "glass",
  version = "bare",
  size = 44,
  animate = false,
  intensity = 1,
  names = material === "chrome" ? CHROME_ICON_KEYS : FROSTED_ICON_KEYS,
  labels = FROSTED_LABELS,
  className,
}) {
  return (
    <div
      className={["soft-cx-set", `soft-cx-set--${version}`, className].filter(Boolean).join(" ")}
      data-soft-material={material}
      data-soft-version={version}
    >
      {names.map((name) => (
        <figure key={`${material}-${version}-${name}`} className="soft-cx-set__cell">
          <SoftComplexIcon
            name={name}
            material={material}
            version={version}
            size={size}
            animate={animate}
            intensity={intensity}
            title={labels[name] || name}
          />
          <figcaption>{labels[name] || name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function SoftFrostedCatalog({
  size = 48,
  animate = false,
  intensity = 1,
  version = "bare",
  className,
}) {
  return (
    <div
      className={["soft-frosted-catalog", className].filter(Boolean).join(" ")}
      data-soft-version={version}
    >
      {FROSTED_CATEGORIES.map((cat) => (
        <section key={cat.id} className="soft-frosted-catalog__section" id={`frosted-${cat.id}`}>
          <header className="soft-frosted-catalog__head">
            <h3>{cat.label}</h3>
            <p>{cat.hint}</p>
            <span className="soft-frosted-catalog__count">{cat.icons.length}</span>
          </header>
          <SoftComplexIconSet
            material="glass"
            version={version}
            size={size}
            animate={animate}
            intensity={intensity}
            names={cat.icons}
          />
        </section>
      ))}
    </div>
  );
}

export {
  CHROME_ICON_KEYS,
  COMPLEX_ICON_KEYS,
  FROSTED_CATEGORIES,
  FROSTED_ICON_KEYS,
  FROSTED_LABELS,
  FROSTED_STANDARDS,
  FROSTED_VERSIONS,
};
