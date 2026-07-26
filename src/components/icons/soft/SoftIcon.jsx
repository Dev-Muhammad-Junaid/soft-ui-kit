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
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${uid}-plate)`} />
      <rect
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
 */
export function SoftIcon({
  name,
  styleId = "soft-stroke",
  size = 18,
  color = "currentColor",
  className,
  title,
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
    const inset = style.mode === "acrylic-slab" ? style.insetScale ?? 0.72 : 0.78;
    const ox = (24 - 24 * inset) / 2;
    return (
      <svg {...common}>
        <GlassPlate
          uid={uid}
          rx={style.plateRx}
          top={style.plateOpacityTop}
          bottom={style.plateOpacityBottom}
          rimOpacity={style.rimOpacity}
        />
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
    const inset = 0.74;
    const ox = (24 - 24 * inset) / 2;
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
          <g transform={`translate(${ox} ${ox}) scale(${inset})`}>
            <GlyphPaint
              glyph={glyph}
              color="currentColor"
              mode="fill"
              fillOpacity={style.glyphOpacity}
            />
          </g>
        </g>
      </svg>
    );
  }

  if (style.mode === "glow-core") {
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
    const inset = 0.76;
    const ox = (24 - 24 * inset) / 2;
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
export function makeSoftIcons(styleId) {
  const wrap = (name) => {
    function Icon(props) {
      return <SoftIcon name={name} styleId={styleId} {...props} />;
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
