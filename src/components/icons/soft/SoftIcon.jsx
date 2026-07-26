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
          <path key={`u-${i}`} d={d} fill={color} fillOpacity={underlayOpacity ?? 0.28} />
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

/** Line & fill Soft UI icons — stroke / fill / duotone weights for dense chrome. */
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
