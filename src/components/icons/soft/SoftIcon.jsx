import { GLYPHS } from "./glyphs";
import { getIconStyle } from "./styles";

/**
 * Handmade Soft UI icon — pick a style id from ICON_STYLES.
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
    ...props,
  };

  if (style.mode === "fill") {
    return (
      <svg {...common}>
        {(glyph.fill || []).map((d, i) => (
          <path key={i} d={d} fill={color} fillOpacity={style.opacity} />
        ))}
      </svg>
    );
  }

  if (style.mode === "duotone") {
    return (
      <svg {...common}>
        {(glyph.fill || []).map((d, i) => (
          <path
            key={`u-${i}`}
            d={d}
            fill={color}
            fillOpacity={style.underlay?.opacity ?? 0.28}
          />
        ))}
        {(glyph.stroke || []).map((d, i) => (
          <path
            key={`s-${i}`}
            d={d}
            stroke={color}
            strokeWidth={style.strokeWidth}
            strokeLinecap={style.strokeLinecap}
            strokeLinejoin={style.strokeLinejoin}
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
            strokeWidth={style.strokeWidth}
            fill="none"
          />
        ))}
      </svg>
    );
  }

  // stroke / clay / crystal
  return (
    <svg {...common}>
      {(glyph.stroke || []).map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={style.strokeWidth}
          strokeLinecap={style.strokeLinecap}
          strokeLinejoin={style.strokeLinejoin}
          strokeOpacity={style.opacity}
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
          strokeWidth={style.strokeWidth}
          strokeOpacity={style.opacity}
          fill="none"
        />
      ))}
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
