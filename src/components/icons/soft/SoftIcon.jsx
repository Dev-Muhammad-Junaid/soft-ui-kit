import { useId } from "react";
import { GLYPHS } from "./glyphs";
import { getIconStyle } from "./styles";

function FillPaths({ glyph, fill, opacity = 1 }) {
  return (glyph.fill || []).map((d, i) => (
    <path key={`f-${i}`} d={d} fill={fill} fillOpacity={opacity} />
  ));
}

/**
 * Glassy mix Soft UI icon — overlapping translucent gradient fills
 * that multiply where they meet (bird-logo inspired).
 */
export function SoftIcon({
  name,
  styleId = "triad-mix",
  size = 18,
  color = "currentColor",
  className,
  title,
  bare = false,
  ...props
}) {
  const uid = useId().replace(/:/g, "");
  const glyph = GLYPHS[name];
  const style = getIconStyle(styleId);

  if (!glyph) {
    return (
      <span
        className={className}
        style={{ width: size, height: size, display: "inline-block" }}
        aria-hidden={!title}
      />
    );
  }

  const layers = style.layers || [];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{ color, overflow: "visible", ...props.style }}
      {...props}
    >
      <defs>
        {layers.map((layer, i) => {
          const [a, b] = layer.stops;
          return (
            <linearGradient
              key={`g-${i}`}
              id={`${uid}-mix-${i}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={a === "currentColor" ? color : a} />
              <stop offset="100%" stopColor={b === "currentColor" ? color : b} />
            </linearGradient>
          );
        })}
        {/* Soft plate behind bare=false so multiply has a light surface */}
        {!bare ? (
          <linearGradient id={`${uid}-plate`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.85" />
          </linearGradient>
        ) : null}
      </defs>

      {!bare ? (
        <rect
          data-soft-layer="face"
          x="1.5"
          y="1.5"
          width="21"
          height="21"
          rx="6"
          fill={`url(#${uid}-plate)`}
          opacity={0.9}
        />
      ) : null}

      {/* Isolation group so multiply blends between layers, not the page */}
      <g style={{ isolation: "isolate" }}>
        {layers.map((layer, i) => (
          <g
            key={`layer-${i}`}
            data-soft-layer="glyph"
            transform={`translate(${layer.dx} ${layer.dy})`}
            style={{ mixBlendMode: "multiply" }}
            opacity={layer.opacity ?? 0.8}
          >
            <FillPaths glyph={glyph} fill={`url(#${uid}-mix-${i})`} opacity={1} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function makeSoftIcons(styleId, defaults = {}) {
  const wrap = (name) => {
    function Icon(props) {
      return <SoftIcon name={name} styleId={styleId} {...defaults} {...props} />;
    }
    Icon.displayName = `Soft_${name}_${styleId}`;
    return Icon;
  };

  return {
    Search: wrap("search"),
    Bell: wrap("bell"),
    Check: wrap("check"),
    Home: wrap("home"),
    Settings: wrap("settings"),
    Sparkles: wrap("sparkles"),
    User: wrap("user"),
    Plus: wrap("plus"),
    BarChart3: wrap("chart"),
    Folder: wrap("folder"),
    Info: wrap("info"),
    ArrowRight: wrap("arrowRight"),
    CalendarDays: wrap("calendar"),
    Wallet: wrap("wallet"),
    LayoutGrid: wrap("grid"),
    X: wrap("close"),
    Mail: wrap("mail"),
  };
}
