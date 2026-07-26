/**
 * SoftMark primitives — Bare frosted mark language
 * (Arrow / User / Bell / Chart / Search shaped glass).
 *
 * Tiled Soft Complex plates live in frostedIcons.jsx (TileMark + GlassTile).
 * Bare catalog compositions live in frostedBareIcons.jsx.
 */

import {
  GlassDefs,
  SoftGroundShadow,
  SoftSvg,
} from "./primitives";

/**
 * Soft SVG frame. `plate` toggles SoftGroundShadow only.
 * Bare SoftMarks pass plate={false}.
 */
export function Frame({ uid, plate = true, size, className, title, style, children, ...props }) {
  const tiled = plate !== false;
  return (
    <SoftSvg
      size={size}
      className={className}
      title={title}
      style={style}
      data-soft-material="glass"
      data-soft-plate={tiled ? "tiled" : "bare"}
      {...props}
    >
      <GlassDefs uid={uid} />
      {tiled ? <SoftGroundShadow uid={uid} /> : null}
      {children}
    </SoftSvg>
  );
}

export function Spec({ uid, d = "M13 14.5h16", opacity = 0.55 }) {
  return (
    <path
      data-soft-layer="specular"
      d={d}
      stroke={`url(#${uid}-spec)`}
      strokeWidth={1.7}
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

/** SoftMark — shaped frosted glass silhouette. */
export function SoftMark({
  uid,
  d,
  children,
  spec,
  dx = 1.2,
  dy = 1.5,
  extrudeOpacity = 0.48,
  strokeWidth = 1.15,
  ...frame
}) {
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d={d}
          fill={`url(#${uid}-body)`}
          opacity={extrudeOpacity}
          transform={`translate(${dx} ${dy})`}
        />
        <path
          data-soft-layer="face"
          d={d}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={strokeWidth}
        />
        {children}
        {spec ? <Spec uid={uid} d={spec} /> : null}
      </g>
    </Frame>
  );
}

/** SoftStrokeMark — glass-weighted stroke marks (Arrow-adjacent Bare language). */
export function SoftStrokeMark({ uid, d, width = 4.2, children, paths, ...frame }) {
  const list = paths ?? (Array.isArray(d) ? d : [d]);
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {list.map((path, i) => {
          // objectBoundingBox gradients collapse on pure-horizontal geometry (height≈0).
          // Append a microscopic vertical hair so paints match Close / Check weight.
          const painted =
            /h[\d.]+$/i.test(path.trim()) && !/[vl]/i.test(path)
              ? `${path}M24 23.85v0.3`
              : path;
          return (
            <g key={i}>
              <path
                data-soft-layer="extrude"
                d={painted}
                stroke={`url(#${uid}-body)`}
                strokeWidth={width + 3.2}
                opacity={0.48}
                transform="translate(1.15 1.35)"
              />
              <path
                data-soft-layer="face"
                d={painted}
                stroke={`url(#${uid}-face)`}
                strokeWidth={width + 1.1}
                opacity={0.95}
              />
              <path
                data-soft-layer="glyph"
                d={painted}
                stroke={`url(#${uid}-core)`}
                strokeWidth={width * 0.62}
                opacity={0.95}
              />
              <path
                data-soft-layer="specular"
                d={painted}
                stroke={`url(#${uid}-rim)`}
                strokeWidth={Math.max(1.4, width * 0.34)}
                opacity={0.65}
              />
            </g>
          );
        })}
        {children}
      </g>
    </Frame>
  );
}

/** SoftRects — multi-panel SoftMark composition (Dashboard / Chart bars). */
export function SoftRects({ uid, rects, children, ...frame }) {
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {rects.map((r, i) => {
          const rx = r.rx ?? 3;
          const inset = r.inset ?? 2;
          return (
            <g key={i}>
              <rect
                data-soft-layer="extrude"
                x={r.x + 1.1}
                y={r.y + 1.4}
                width={r.w}
                height={r.h}
                rx={rx}
                fill={`url(#${uid}-body)`}
                opacity={0.45}
              />
              <rect
                data-soft-layer="face"
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={rx}
                fill={`url(#${uid}-face)`}
                stroke={`url(#${uid}-rim)`}
                strokeWidth={1}
              />
              {r.core === false ? null : (
                <rect
                  data-soft-layer="glyph"
                  x={r.x + inset}
                  y={r.y + r.h * (r.coreY ?? 0.35)}
                  width={Math.max(2, r.w - inset * 2)}
                  height={Math.max(2, r.h * (r.coreH ?? 0.45))}
                  rx={1.5}
                  fill={`url(#${uid}-core)`}
                  opacity={r.opacity ?? 0.78}
                />
              )}
            </g>
          );
        })}
        {children}
      </g>
    </Frame>
  );
}

/** SoftCircleMark — round SoftMark body. */
export function SoftCircleMark({
  uid,
  cx = 24,
  cy = 24,
  r = 12,
  children,
  spec,
  ...frame
}) {
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle
          data-soft-layer="extrude"
          cx={cx + 1.2}
          cy={cy + 1.5}
          r={r}
          fill={`url(#${uid}-body)`}
          opacity={0.48}
        />
        <circle
          data-soft-layer="face"
          cx={cx}
          cy={cy}
          r={r}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.2}
        />
        {children}
        {spec ? <Spec uid={uid} d={spec} /> : null}
      </g>
    </Frame>
  );
}
