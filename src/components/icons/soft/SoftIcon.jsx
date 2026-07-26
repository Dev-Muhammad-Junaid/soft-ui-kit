import { useId } from "react";
import { GLYPHS } from "./glyphs";
import { getIconStyle } from "./styles";

function GlyphPaint({
  glyph,
  color,
  mode,
  strokeWidth = 1.75,
  strokeLinecap = "round",
  strokeLinejoin = "round",
  fillOpacity = 1,
  strokeOpacity = 1,
  underlayOpacity,
}) {
  if (mode === "fill" || mode === "fill-only") {
    return (glyph.fill || []).map((d, i) => (
      <path key={`f-${i}`} d={d} fill={color} fillOpacity={fillOpacity} />
    ));
  }

  if (mode === "duotone") {
    return (
      <>
        {(glyph.fill || []).map((d, i) => (
          <path
            key={`u-${i}`}
            d={d}
            fill={color}
            fillOpacity={underlayOpacity ?? 0.28}
          />
        ))}
        {(glyph.stroke || []).map((d, i) => (
          <path
            key={`s-${i}`}
            d={d}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
            fill="none"
            strokeOpacity={strokeOpacity}
          />
        ))}
        {(glyph.circles || []).map((c, i) => (
          <circle
            key={`c-${i}`}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeOpacity={strokeOpacity}
          />
        ))}
      </>
    );
  }

  // stroke
  return (
    <>
      {(glyph.stroke || []).map((d, i) => (
        <path
          key={`s-${i}`}
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          fill="none"
        />
      ))}
      {(glyph.circles || []).map((c, i) => (
        <circle
          key={`c-${i}`}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={strokeOpacity}
          fill="none"
        />
      ))}
    </>
  );
}

function GlassPlate({
  uid,
  rx,
  top,
  bottom,
  rimOpacity,
  x = 2,
  y = 2,
  w = 20,
  h = 20,
}) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-plate`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={top} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={bottom} />
        </linearGradient>
        <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity={rimOpacity} />
          <stop offset="55%" stopColor="#fff" stopOpacity={rimOpacity * 0.25} />
          <stop offset="100%" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect data-soft-layer="face" x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${uid}-plate)`} />
      <rect
        data-soft-layer="specular"
        x={x + 0.4}
        y={y + 0.4}
        width={w - 0.8}
        height={h - 0.8}
        rx={Math.max(rx - 0.4, 2)}
        fill="none"
        stroke={`url(#${uid}-rim)`}
        strokeWidth={1.1}
      />
    </>
  );
}

/**
 * Handmade Soft UI icon — pick a style id from ICON_STYLES.
 * Glass modes use currentColor so Taste / theme accent still drives the tint.
 * Pass bare when the host already provides a pad/button/ring so plates don't double up.
 */
export function SoftIcon({
  name,
  styleId = "soft-stroke",
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

  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    role: title ? "img" : "presentation",
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
    style: { color, overflow: "visible", ...props.style },
    ...props,
  };

  if (style.mode === "fill") {
    return (
      <svg {...common}>
        <GlyphPaint glyph={glyph} color="currentColor" mode="fill" fillOpacity={style.opacity ?? 1} />
      </svg>
    );
  }

  if (style.mode === "duotone") {
    return (
      <svg {...common}>
        <GlyphPaint
          glyph={glyph}
          color="currentColor"
          mode="duotone"
          strokeWidth={style.strokeWidth}
          strokeLinecap={style.strokeLinecap}
          strokeLinejoin={style.strokeLinejoin}
          underlayOpacity={style.underlay?.opacity}
        />
      </svg>
    );
  }

  if (style.mode === "frost-shell" || style.mode === "acrylic-slab") {
    const inset = bare
      ? 0.92
      : style.mode === "acrylic-slab"
        ? style.insetScale ?? 0.72
        : 0.78;
    const ox = (24 - 24 * inset) / 2;
    return (
      <svg {...common}>
        {!bare ? (
          <GlassPlate
            uid={uid}
            rx={style.plateRx}
            top={style.plateOpacityTop}
            bottom={style.plateOpacityBottom}
            rimOpacity={style.rimOpacity}
          />
        ) : null}
        <g transform={`translate(${ox} ${ox}) scale(${inset})`}>
          <GlyphPaint
            glyph={glyph}
            color="currentColor"
            mode="fill"
            fillOpacity={style.glyphOpacity}
          />
        </g>
      </svg>
    );
  }

  if (style.mode === "iso-glass") {
    const inset = bare ? 0.9 : 0.74;
    const ox = (24 - 24 * inset) / 2;
    const glyphNode = (
      <g transform={`translate(${ox} ${ox}) scale(${inset})`}>
        <GlyphPaint
          glyph={glyph}
          color="currentColor"
          mode="fill"
          fillOpacity={style.glyphOpacity}
        />
      </g>
    );
    if (bare) {
      return <svg {...common}>{glyphNode}</svg>;
    }
    return (
      <svg {...common}>
        <g transform={`skewX(${style.skewX}) skewY(${style.skewY}) translate(1.2 -0.6)`}>
          <GlassPlate
            uid={uid}
            rx={style.plateRx}
            top={style.plateOpacityTop}
            bottom={style.plateOpacityBottom}
            rimOpacity={style.rimOpacity}
          />
          {glyphNode}
        </g>
      </svg>
    );
  }

  if (style.mode === "glow-core") {
    if (bare) {
      return (
        <svg {...common}>
          <GlyphPaint
            glyph={glyph}
            color="currentColor"
            mode="fill"
            fillOpacity={style.glyphOpacity}
          />
        </svg>
      );
    }
    return (
      <svg {...common}>
        <defs>
          <radialGradient id={`${uid}-halo`} cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="currentColor" stopOpacity={style.haloOpacity} />
            <stop offset="70%" stopColor="currentColor" stopOpacity={style.haloOpacity * 0.35} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
          </radialGradient>
          <filter id={`${uid}-blur`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        <circle cx="12" cy="12" r="10" fill={`url(#${uid}-halo)`} filter={`url(#${uid}-blur)`} />
        <circle
          cx="12"
          cy="12"
          r="8.2"
          fill="currentColor"
          fillOpacity={0.12}
          stroke="#fff"
          strokeOpacity={0.45}
          strokeWidth={1}
        />
        <g transform="translate(2.4 2.4) scale(0.8)">
          <GlyphPaint
            glyph={glyph}
            color="currentColor"
            mode="fill"
            fillOpacity={style.glyphOpacity}
          />
        </g>
      </svg>
    );
  }

  if (style.mode === "prism-soft") {
    const off = style.backOffset ?? 1.4;
    const inset = bare ? 0.9 : 0.76;
    const ox = (24 - 24 * inset) / 2;
    const glyphNode = (
      <g transform={`translate(${ox} ${ox}) scale(${inset})`}>
        <GlyphPaint
          glyph={glyph}
          color="currentColor"
          mode="duotone"
          strokeWidth={1.45}
          underlayOpacity={0.2}
          strokeOpacity={style.glyphOpacity}
        />
      </g>
    );
    if (bare) {
      return <svg {...common}>{glyphNode}</svg>;
    }
    return (
      <svg {...common}>
        <g transform={`translate(${off} ${off})`} opacity={0.35}>
          <GlassPlate
            uid={`${uid}-b`}
            rx={style.plateRx}
            top={style.plateOpacityTop}
            bottom={style.plateOpacityBottom}
            rimOpacity={style.rimOpacity * 0.4}
          />
        </g>
        <GlassPlate
          uid={uid}
          rx={style.plateRx}
          top={style.plateOpacityTop}
          bottom={style.plateOpacityBottom}
          rimOpacity={style.rimOpacity}
        />
        {glyphNode}
      </svg>
    );
  }

  // —— Chrome / neon reflection modes ——
  if (
    style.mode === "chrome-neon" ||
    style.mode === "liquid-metal" ||
    style.mode === "iridescent" ||
    style.mode === "halo-chrome"
  ) {
    const fillId =
      style.mode === "liquid-metal"
        ? `${uid}-metal`
        : style.mode === "iridescent"
          ? `${uid}-iri`
          : `${uid}-chrome`;
    return (
      <svg {...common}>
        <defs>
          <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="28%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#e2e8f0" />
            <stop offset="78%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id={`${uid}-metal`} cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="62%" stopColor="currentColor" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>
          <linearGradient id={`${uid}-iri`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="45%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <filter id={`${uid}-neon`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={1.2 + (style.glow ?? 0.4)} result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 0.7 0 0 0
                      0 0 1.2 0 0
                      0 0 0 0.85 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${uid}-halo`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {style.mode === "halo-chrome" && !bare ? (
          <circle
            cx="12"
            cy="12"
            r="10.5"
            fill="currentColor"
            fillOpacity={0.18}
            filter={`url(#${uid}-halo)`}
          />
        ) : null}
        <g filter={`url(#${uid}-neon)`}>
          <GlyphPaint
            glyph={glyph}
            color={`url(#${fillId})`}
            mode="fill"
            fillOpacity={1}
          />
          {(glyph.stroke || []).map((d, i) => (
            <path
              key={`rim-${i}`}
              d={d}
              fill="none"
              stroke="#67e8f9"
              strokeOpacity={0.55}
              strokeWidth={0.9}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>
      </svg>
    );
  }

  if (style.mode === "neon-rim") {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id={`${uid}-cool`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="55%" stopColor="currentColor" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <filter id={`${uid}-rimglow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.1" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter={`url(#${uid}-rimglow)`}>
          <GlyphPaint
            glyph={glyph}
            color="#0f172a"
            mode="fill"
            fillOpacity={0.82}
          />
          <GlyphPaint
            glyph={glyph}
            color={`url(#${uid}-cool)`}
            mode="stroke"
            strokeWidth={style.strokeWidth ?? 2.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={1}
          />
        </g>
      </svg>
    );
  }


  if (style.mode === "glassy-mix") {
    const layers = style.layers || [];
    return (
      <svg {...common}>
        <defs>
          {layers.map((layer, i) => {
            const [a, b] = layer.stops;
            return (
              <linearGradient key={`g-${i}`} id={`${uid}-mix-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={a === "currentColor" ? color : a} />
                <stop offset="100%" stopColor={b === "currentColor" ? color : b} />
              </linearGradient>
            );
          })}
          {!bare ? (
            <linearGradient id={`${uid}-plate`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.85" />
            </linearGradient>
          ) : null}
        </defs>
        {!bare ? (
          <rect data-soft-layer="face" x="1.5" y="1.5" width="21" height="21" rx="6" fill={`url(#${uid}-plate)`} opacity={0.9} />
        ) : null}
        <g style={{ isolation: "isolate" }}>
          {layers.map((layer, i) => (
            <g
              key={`layer-${i}`}
              data-soft-layer="glyph"
              transform={`translate(${layer.dx} ${layer.dy})`}
              style={{ mixBlendMode: "multiply" }}
              opacity={layer.opacity ?? 0.8}
            >
              <GlyphPaint glyph={glyph} color={`url(#${uid}-mix-${i})`} mode="fill" fillOpacity={1} />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  // stroke / clay / crystal
  return (
    <svg {...common}>
      <GlyphPaint
        glyph={glyph}
        color="currentColor"
        mode="stroke"
        strokeWidth={style.strokeWidth}
        strokeLinecap={style.strokeLinecap}
        strokeLinejoin={style.strokeLinejoin}
        strokeOpacity={style.opacity ?? 1}
      />
    </svg>
  );
}

/** Convenience factories matching common kit names. */
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
