/**
 * Shared Soft SVG primitives — layered, themeable, animation-ready.
 * Layers expose data-soft-layer for CSS / SMIL control.
 */

export function SoftSvg({
  size = 48,
  className,
  title,
  children,
  viewBox = "0 0 48 48",
  style,
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{ overflow: "visible", color: "var(--accent)", ...style }}
      {...props}
    >
      {children}
    </svg>
  );
}

/** Soft drop shadow under isometric glass tiles */
export function SoftGroundShadow({ uid, cx = 24, cy = 42, rx = 14, ry = 3.2 }) {
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-ground`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        data-soft-layer="shadow"
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={`url(#${uid}-ground)`}
      />
    </>
  );
}

export function GlassDefs({ uid }) {
  // Frost tokens (--soft-cx-frost / --soft-cx-mark) keep dusk/midnight readable
  return (
    <defs>
      <linearGradient id={`${uid}-body`} x1="0.15" y1="0" x2="0.85" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
        <stop offset="40%" stopColor="currentColor" stopOpacity="0.58" />
        <stop offset="100%" stopColor="var(--soft-cx-frost, #ffffff)" stopOpacity="0.82" />
      </linearGradient>
      <linearGradient id={`${uid}-face`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--soft-cx-frost, #ffffff)" stopOpacity="0.78" />
        <stop offset="40%" stopColor="currentColor" stopOpacity="0.38" />
        <stop offset="100%" stopColor="var(--soft-cx-frost, #ffffff)" stopOpacity="0.62" />
      </linearGradient>
      <linearGradient id={`${uid}-core`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.98" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.52" />
      </linearGradient>
      <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--soft-cx-frost, #ffffff)" stopOpacity="0.95" />
        <stop offset="55%" stopColor="var(--soft-cx-frost, #ffffff)" stopOpacity="0.28" />
        <stop offset="100%" stopColor="var(--soft-cx-frost, #ffffff)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${uid}-spec`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--soft-cx-frost, #ffffff)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="var(--soft-cx-frost, #ffffff)" stopOpacity="0" />
      </linearGradient>
      <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="0.7" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

export function ChromeDefs({ uid }) {
  return (
    <defs>
      <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="22%" stopColor="#67e8f9" />
        <stop offset="48%" stopColor="currentColor" />
        <stop offset="72%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#fb923c" />
      </linearGradient>
      <linearGradient id={`${uid}-edge`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
        <stop offset="55%" stopColor="currentColor" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#f472b6" stopOpacity="0.95" />
      </linearGradient>
      <radialGradient id={`${uid}-sphere`} cx="32%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="28%" stopColor="#cbd5e1" />
        <stop offset="55%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="82%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0f172a" />
      </radialGradient>
      <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.55" />
        <stop offset="55%" stopColor="#f472b6" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
      </radialGradient>
      <filter id={`${uid}-neon`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.35" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id={`${uid}-halo`} x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="2.4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/** Rounded glass tile with thickness cue + specular */
export function GlassTile({
  uid,
  x = 8,
  y = 8,
  w = 32,
  h = 32,
  rx = 9,
  depth = 2.4,
  children,
}) {
  return (
    <g data-soft-layer="body">
      {/* extruded side */}
      <rect
        data-soft-layer="extrude"
        x={x + depth * 0.35}
        y={y + depth}
        width={w}
        height={h}
        rx={rx}
        fill={`url(#${uid}-body)`}
        opacity={0.55}
      />
      {/* face */}
      <rect
        data-soft-layer="face"
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        fill={`url(#${uid}-face)`}
        stroke={`url(#${uid}-rim)`}
        strokeWidth={1.2}
      />
      {/* specular catch */}
      <path
        data-soft-layer="specular"
        d={`M${x + 4} ${y + 5} Q${x + w * 0.35} ${y + 2} ${x + w * 0.55} ${y + 6}`}
        stroke={`url(#${uid}-spec)`}
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.85}
      />
      {children}
    </g>
  );
}

export function ChromeShell({ uid, children, withHalo = true }) {
  return (
    <g data-soft-layer="body" filter={withHalo ? `url(#${uid}-neon)` : undefined}>
      {withHalo ? (
        <circle
          data-soft-layer="glow"
          cx="24"
          cy="24"
          r="18"
          fill={`url(#${uid}-glow)`}
          opacity={0.85}
        />
      ) : null}
      {children}
    </g>
  );
}
