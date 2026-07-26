/**
 * Frosted isometric tile icons — Soft Complex glass material.
 * Built for SaaS / dashboard / admin chrome. Theme via currentColor (--accent).
 */

import {
  GlassDefs,
  GlassTile,
  SoftGroundShadow,
  SoftSvg,
} from "./primitives";
import { FROSTED_ICON_KEYS } from "./frostedRegistry";

function Frame({ uid, size, className, title, style, children, ...props }) {
  return (
    <SoftSvg
      size={size}
      className={className}
      title={title}
      style={style}
      data-soft-material="glass"
      {...props}
    >
      <GlassDefs uid={uid} />
      <SoftGroundShadow uid={uid} />
      {children}
    </SoftSvg>
  );
}

function Spec({ uid, d = "M13 14.5h16", opacity = 0.55 }) {
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

/** Standard frosted tile with stroke/fill glyph children */
function TileMark({ uid, children, x = 9, y = 9, w = 30, h = 30, rx = 10, ...frame }) {
  return (
    <Frame uid={uid} {...frame}>
      <GlassTile uid={uid} x={x} y={y} w={w} h={h} rx={rx}>
        {children}
      </GlassTile>
    </Frame>
  );
}

/**
 * Glyphs should sit in ~16–32 inside the default 9/9/30/30 tile
 * (same optical weight as Close / Sort / chevrons).
 */
function StrokeGlyph({ uid, d, width = 2.8, opacity = 0.95 }) {
  return (
    <path
      data-soft-layer="glyph"
      d={d}
      stroke={`url(#${uid}-core)`}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity={opacity}
    />
  );
}

function FillGlyph({ uid, d, opacity = 0.9 }) {
  return <path data-soft-layer="glyph" d={d} fill={`url(#${uid}-core)`} opacity={opacity} />;
}

/* ── Navigation ── */

function Home(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M11 23.5L24 12l13 11.5V36a3.5 3.5 0 0 1-3.5 3.5h-19A3.5 3.5 0 0 1 11 36V23.5Z"
          fill={`url(#${uid}-body)`}
          opacity={0.48}
          transform="translate(1.2 1.5)"
        />
        <path
          data-soft-layer="face"
          d="M10 22.5L24 10.5 38 22.5V35.5A3.5 3.5 0 0 1 34.5 39h-21A3.5 3.5 0 0 1 10 35.5V22.5Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <rect x={20} y={26} width={8} height={10} rx={2} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
        <Spec uid={uid} d="M14 22L24 13.5 34 22" opacity={0.5} />
      </g>
    </Frame>
  );
}

function Dashboard(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={13} y={13} width={10} height={10} rx={2.5} fill={`url(#${uid}-core)`} opacity={0.9} data-soft-layer="glyph" />
      <rect x={25} y={13} width={10} height={6} rx={2} fill={`url(#${uid}-core)`} opacity={0.65} data-soft-layer="glyph" />
      <rect x={25} y={21} width={10} height={14} rx={2.5} fill={`url(#${uid}-core)`} opacity={0.8} data-soft-layer="glyph" />
      <rect x={13} y={25} width={10} height={10} rx={2.5} fill={`url(#${uid}-core)`} opacity={0.7} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Grid(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <rect
            key={`${r}-${c}`}
            data-soft-layer="glyph"
            x={14 + c * 11}
            y={14 + r * 11}
            width={9}
            height={9}
            rx={2.5}
            fill={`url(#${uid}-core)`}
            opacity={0.7 + (r + c) * 0.08}
          />
        ))
      )}
    </TileMark>
  );
}

function Layout(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={13} y={13} width={8} height={22} rx={2.2} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
      <rect x={23} y={13} width={12} height={10} rx={2.2} fill={`url(#${uid}-core)`} opacity={0.7} data-soft-layer="glyph" />
      <rect x={23} y={25} width={12} height={10} rx={2.2} fill={`url(#${uid}-core)`} opacity={0.55} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Sidebar(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame} x={10} y={10} w={28} h={28} rx={8}>
      <rect x={13} y={13} width={7} height={22} rx={2} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
      <rect x={22} y={13} width={13} height={4} rx={1.5} fill={`url(#${uid}-core)`} opacity={0.45} data-soft-layer="glyph" />
      <rect x={22} y={20} width={13} height={4} rx={1.5} fill={`url(#${uid}-core)`} opacity={0.45} data-soft-layer="glyph" />
      <rect x={22} y={27} width={10} height={4} rx={1.5} fill={`url(#${uid}-core)`} opacity={0.45} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Panels(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={12.5} y={13} width={10.5} height={22} rx={2.5} fill={`url(#${uid}-core)`} opacity={0.8} data-soft-layer="glyph" />
      <rect x={25} y={13} width={10.5} height={22} rx={2.5} fill={`url(#${uid}-core)`} opacity={0.55} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Table(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={13} y={14} width={22} height={5} rx={1.5} fill={`url(#${uid}-core)`} opacity={0.9} data-soft-layer="glyph" />
      {[0, 1, 2].map((r) => (
        <g key={r} data-soft-layer="glyph">
          <rect x={13} y={21 + r * 5.2} width={10} height={3.6} rx={1.2} fill={`url(#${uid}-core)`} opacity={0.45} />
          <rect x={25} y={21 + r * 5.2} width={10} height={3.6} rx={1.2} fill={`url(#${uid}-core)`} opacity={0.35} />
        </g>
      ))}
    </TileMark>
  );
}

function List(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame} x={11} y={9} w={26} h={30} rx={8}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} data-soft-layer="glyph">
          <circle cx={17} cy={15.5 + i * 6.2} r={1.6} fill={`url(#${uid}-core)`} />
          <rect x={21} y={14 + i * 6.2} width={12} height={3} rx={1.4} fill={`url(#${uid}-core)`} opacity={0.55} />
        </g>
      ))}
    </TileMark>
  );
}

function Columns(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          data-soft-layer="glyph"
          x={13 + i * 8}
          y={14}
          width={6}
          height={20}
          rx={2}
          fill={`url(#${uid}-core)`}
          opacity={0.55 + i * 0.12}
        />
      ))}
    </TileMark>
  );
}

function Menu(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          data-soft-layer="glyph"
          x={14}
          y={15.5 + i * 6}
          width={20}
          height={3.2}
          rx={1.6}
          fill={`url(#${uid}-core)`}
          opacity={0.85 - i * 0.1}
        />
      ))}
    </TileMark>
  );
}

/* ── Actions ── */

function Search(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={21.8} cy={21.8} r={12} fill={`url(#${uid}-body)`} opacity={0.48} />
        <circle
          data-soft-layer="face"
          cx={19.8}
          cy={19.8}
          r={12}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.35}
        />
        <circle cx={19.8} cy={19.8} r={7.4} fill={`url(#${uid}-core)`} opacity={0.22} data-soft-layer="glyph" />
        <circle data-soft-layer="glyph" cx={19.8} cy={19.8} r={6.4} fill="none" stroke={`url(#${uid}-core)`} strokeWidth={2.8} />
        <path data-soft-layer="glyph" d="M28.4 28.4L37.2 37.2" stroke={`url(#${uid}-core)`} strokeWidth={3.8} strokeLinecap="round" />
        <Spec uid={uid} d="M13.5 15c2.8-3 7.6-3.4 11-1.1" opacity={0.72} />
      </g>
    </Frame>
  );
}

function Filter(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M16 16.5h16l-6 7.5v7l-4-2v-5L16 16.5Z"
        fill={`url(#${uid}-core)`}
        opacity={0.9}
      />
    </TileMark>
  );
}

function Sort(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M16 16h16M16 24h11M16 32h7" width={2.6} />
      <StrokeGlyph uid={uid} d="M33 20l3 4-3 4" width={2.4} />
    </TileMark>
  );
}

function More(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame} x={10} y={14} w={28} h={20} rx={8}>
      {[18, 24, 30].map((x) => (
        <circle key={x} cx={x} cy={24} r={2.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      ))}
    </TileMark>
  );
}

function Close(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M17 17l14 14M31 17L17 31" width={3.2} />
    </TileMark>
  );
}

function Check(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M16.5 24.2l4.6 4.6L32.2 17.5" width={3.4} />
      <path
        data-soft-layer="glyph-shine"
        d="M16.5 24.2l4.6 4.6L32.2 17.5"
        stroke="var(--soft-cx-frost, #fff)"
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />
    </TileMark>
  );
}

function Plus(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame} rx={12}>
      <rect x={14} y={14} width={20} height={20} rx={8} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="core" />
      <path
        data-soft-layer="glyph"
        d="M24 18.5v11M18.5 24h11"
        stroke="var(--soft-cx-frost, #fff)"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </TileMark>
  );
}

function Minus(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame} rx={12}>
      <rect x={14} y={14} width={20} height={20} rx={8} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="core" />
      <path
        data-soft-layer="glyph"
        d="M18.5 24h11"
        stroke="var(--soft-cx-frost, #fff)"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
    </TileMark>
  );
}

function Edit(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      {/* Pencil — tip bottom-left, eraser top-right */}
      <FillGlyph
        uid={uid}
        d="M29.2 15.2l3.6 3.6-12.8 12.8H16.4v-3.6L29.2 15.2Zm1.8-1.8a1.6 1.6 0 0 1 2.3 0l1.3 1.3a1.6 1.6 0 0 1 0 2.3l-1.2 1.2-3.6-3.6 1.2-1.2Z"
      />
    </TileMark>
  );
}

function Trash(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <rect data-soft-layer="extrude" x={14} y={18} width={22} height={20} rx={4} fill={`url(#${uid}-body)`} opacity={0.45} transform="translate(1 1.4)" />
        <rect data-soft-layer="face" x={13} y={17} width={22} height={20} rx={4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.1} />
        <path data-soft-layer="glyph" d="M11 14h26M18 14V11.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V14" stroke={`url(#${uid}-core)`} strokeWidth={2.4} strokeLinecap="round" fill="none" />
        <path data-soft-layer="glyph" d="M20 22v8M24 22v8M28 22v8" stroke={`url(#${uid}-core)`} strokeWidth={2} strokeLinecap="round" />
        <Spec uid={uid} d="M16 20h14" opacity={0.45} />
      </g>
    </Frame>
  );
}

function Copy(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={18} y={14} width={14} height={16} rx={3} fill={`url(#${uid}-core)`} opacity={0.45} data-soft-layer="glyph" />
      <rect x={14} y={18} width={14} height={16} rx={3} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-core)`} strokeWidth={2} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Save(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M15 14h14l5 5v15a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2Z"
        fill={`url(#${uid}-core)`}
        opacity={0.85}
      />
      <rect x={18.5} y={14} width={9} height={6} rx={1.4} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
      {/* Label window — compact, fully inside floppy body */}
      <rect x={20} y={26.8} width={8} height={5.4} rx={1.4} fill={`url(#${uid}-face)`} opacity={0.92} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Download(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M24 15.5v13M18.5 23l5.5 5.5L29.5 23M16.5 32.5h15" width={2.7} />
    </TileMark>
  );
}

function Upload(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M24 32.5V19.5M18.5 25l5.5-5.5L29.5 25M16.5 15.5h15" width={2.7} />
    </TileMark>
  );
}

function Refresh(p) {
  const { uid, ...frame } = p;
  // One arc+head, mirrored 180° so both arrows match exactly
  return (
    <TileMark uid={uid} {...frame}>
      <g
        data-soft-layer="glyph"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <g>
          <path d="M17.5 21A7.5 7.5 0 0 1 31.2 20" />
          <path d="M31.2 15.2v4.8h-4.8" />
        </g>
        <g transform="rotate(180 24 24)">
          <path d="M17.5 21A7.5 7.5 0 0 1 31.2 20" />
          <path d="M31.2 15.2v4.8h-4.8" />
        </g>
      </g>
    </TileMark>
  );
}

function ExternalLink(p) {
  const { uid, ...frame } = p;
  // ArrowSquareOut: open-TR window + stem + one joined L head (equal arms)
  return (
    <TileMark uid={uid} {...frame}>
      <g
        data-soft-layer="glyph"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M28 22.5v7a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 14 29.5v-9A2.5 2.5 0 0 1 16.5 18H24" />
        <path d="M24.5 23.5L34 14" />
        <path d="M27 14h7v7" />
      </g>
    </TileMark>
  );
}

function arrowFace(dir) {
  // dir: right | left | up | down — block arrow path
  if (dir === "left") {
    return "M39.5 19.5H23l5.2-7.2h-7.2L9 24l12.1 11.7h7.2L23.1 28.5h16.4a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3Z";
  }
  if (dir === "up") {
    return "M19.5 39.5V23l-7.2 5.2v-7.2L24 9l11.7 12.1v7.2L28.5 23.1v16.4a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3Z";
  }
  if (dir === "down") {
    return "M19.5 8.5V25l-7.2-5.2v7.2L24 39l11.7-12.1v-7.2L28.5 24.9V8.5a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3Z";
  }
  return "M8.5 19.5h16.5l-5.2-7.2h7.2L39 24 26.9 35.7h-7.2l5.2-7.2H8.5a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Z";
}

function Arrow({ dir, ...p }) {
  const { uid, ...frame } = p;
  const face = arrowFace(dir);
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <path data-soft-layer="extrude" d={face} fill={`url(#${uid}-body)`} opacity={0.48} transform="translate(1.3 1.6)" />
        <path data-soft-layer="face" d={face} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.15} />
        <Spec uid={uid} d="M14 18.5h14" opacity={0.5} />
      </g>
    </Frame>
  );
}

function Chevron({ dir, ...p }) {
  const { uid, ...frame } = p;
  const d = dir === "left" ? "M28 16L20 24l8 8" : "M20 16l8 8-8 8";
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d={d} width={3.2} />
    </TileMark>
  );
}

/* ── People & access ── */

function User(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={25.4} cy={18.2} r={7.2} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle data-soft-layer="face" cx={24} cy={16.5} r={7.2} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.15} />
        <path
          data-soft-layer="face"
          d="M11.5 36.8c1.9-6.4 5.7-9.6 12.5-9.6s10.6 3.2 12.5 9.6"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <circle cx={24} cy={16.5} r={3.6} fill={`url(#${uid}-core)`} opacity={0.8} data-soft-layer="glyph" />
        <ellipse cx={21.2} cy={13.8} rx={3.4} ry={1.6} fill="var(--soft-cx-frost, #fff)" opacity={0.4} data-soft-layer="specular" />
      </g>
    </Frame>
  );
}

function Users(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle cx={19} cy={18} r={4.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <circle cx={29} cy={19} r={3.4} fill={`url(#${uid}-core)`} opacity={0.65} data-soft-layer="glyph" />
      <path d="M12 33c1.4-4.2 4-6.2 8.5-6.2S27.6 28.8 29 33" fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path d="M27 32.5c1-3 2.8-4.5 6-4.5s4.4 1.2 5.2 3.5" fill={`url(#${uid}-core)`} opacity={0.55} data-soft-layer="glyph" />
    </TileMark>
  );
}

function UserPlus(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle cx={20} cy={18} r={4.5} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path d="M12 34c1.5-4.5 4.2-6.8 9-6.8s7.5 2.3 9 6.8" fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <StrokeGlyph uid={uid} d="M32 18v8M28 22h8" width={2.6} />
    </TileMark>
  );
}

function Lock(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={16} y={22} width={16} height={11} rx={3} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path
        d="M19.5 22v-3a4.5 4.5 0 0 1 9 0v3"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.7}
        fill="none"
        strokeLinecap="round"
        data-soft-layer="glyph"
      />
      <circle cx={24} cy={27.5} r={1.6} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Unlock(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={16} y={22} width={16} height={11} rx={3} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      {/* Open shackle lifted to the right */}
      <path
        d="M19 22v-3.2a5 5 0 0 1 9.2-2.6"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.7}
        fill="none"
        strokeLinecap="round"
        data-soft-layer="glyph"
      />
      <circle cx={24} cy={27.5} r={1.6} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Shield(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M24 15l9 3.5v7c0 5.2-3.6 8.4-9 10-5.4-1.6-9-4.8-9-10v-7L24 15Z"
        fill={`url(#${uid}-core)`}
        opacity={0.9}
      />
      <path
        data-soft-layer="glyph"
        d="M20.5 24.5l2.6 2.6L28 21.5"
        stroke="var(--soft-cx-frost, #fff)"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </TileMark>
  );
}

function Key(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle
        cx={18}
        cy={24}
        r={5}
        fill="none"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.7}
        data-soft-layer="glyph"
      />
      <circle cx={18} cy={24} r={1.7} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M23 24h11M31 24v3.5M27.5 24v2.8"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.7}
        strokeLinecap="round"
        fill="none"
      />
    </TileMark>
  );
}

function Eye(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M15 24c2.4-4.2 5.6-6.5 9-6.5s6.6 2.3 9 6.5c-2.4 4.2-5.6 6.5-9 6.5s-6.6-2.3-9-6.5Z"
        fill="none"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      <circle cx={24} cy={24} r={3.4} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function EyeOff(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M15 24c2.4-4.2 5.6-6.5 9-6.5s6.6 2.3 9 6.5c-2.4 4.2-5.6 6.5-9 6.5s-6.6-2.3-9-6.5Z"
        fill="none"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      <circle cx={24} cy={24} r={3.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <StrokeGlyph uid={uid} d="M16.5 31.5L31.5 16.5" width={2.7} />
    </TileMark>
  );
}

function Login(p) {
  const { uid, ...frame } = p;
  // Door on right, arrow entering from left
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph
        uid={uid}
        width={2.7}
        d="M27 15.5h3.5a2.2 2.2 0 0 1 2.2 2.2v12.6a2.2 2.2 0 0 1-2.2 2.2H27M12.5 24H24M20 18.5L25.5 24 20 29.5"
      />
    </TileMark>
  );
}

function Logout(p) {
  const { uid, ...frame } = p;
  // Door on left, arrow exiting right (mirror of Login)
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph
        uid={uid}
        width={2.7}
        d="M21 15.5h-3.5a2.2 2.2 0 0 0-2.2 2.2v12.6a2.2 2.2 0 0 0 2.2 2.2H21M24 24h11.5M30.5 18.5L36 24l-5.5 5.5"
      />
    </TileMark>
  );
}

/* ── Communication ── */

function Mail(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect
        x={15}
        y={17}
        width={18}
        height={14}
        rx={3}
        fill="none"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        data-soft-layer="glyph"
      />
      <StrokeGlyph uid={uid} d="M16.5 19.5L24 25l7.5-5.5" width={2.5} />
    </TileMark>
  );
}

function Send(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <FillGlyph uid={uid} d="M16 22.2L32.5 15.5 25.2 32.5 22.4 25.8 16 22.2Z" />
      <path
        data-soft-layer="glyph"
        d="M22.6 25.6L32.2 16"
        stroke="var(--soft-cx-frost, #fff)"
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
        opacity={0.75}
      />
    </TileMark>
  );
}

function Inbox(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M16 17h16v7.5l-3.5 7H19.5L16 24.5V17Z"
        fill={`url(#${uid}-core)`}
        opacity={0.78}
      />
      <path
        d="M16 24.5h5.5L23 27h2l1.5-2.5H32"
        stroke={`url(#${uid}-face)`}
        strokeWidth={2}
        fill="none"
        strokeLinejoin="round"
        data-soft-layer="glyph"
      />
    </TileMark>
  );
}

function Chat(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M12 14h24a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H22l-7 6v-6h-3a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z"
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1 1.4)"
        />
        <path
          data-soft-layer="face"
          d="M11 13h24a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H21l-7 6v-6h-3a4 4 0 0 1-4-4V17a4 4 0 0 1 4-4Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        {[18, 24, 30].map((x) => (
          <circle key={x} cx={x} cy={22} r={1.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
        ))}
      </g>
    </Frame>
  );
}

function Bell(p) {
  const { uid, ...frame } = p;
  const dome =
    "M14.2 18.5a9.8 9.8 0 0 1 19.6 0c0 5.8 2 8.1 3 9.5a1.5 1.5 0 0 1-1.25 2.35H12.45a1.5 1.5 0 0 1-1.25-2.35c1-1.4 3-3.7 3-9.5Z";
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <path data-soft-layer="extrude" d={dome} fill={`url(#${uid}-body)`} opacity={0.5} transform="translate(1.1 1.6)" />
        <path data-soft-layer="face" d={dome} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.15} />
        <path data-soft-layer="glyph" d="M20.6 34.4a3.4 3.4 0 0 0 6.8 0" stroke={`url(#${uid}-core)`} strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <circle cx={24} cy={12.2} r={1.6} fill={`url(#${uid}-core)`} data-soft-layer="glyph" opacity={0.85} />
        <Spec uid={uid} d="M17.5 15.5c2.8-3.6 9.5-3.6 12.2 0" opacity={0.55} />
      </g>
    </Frame>
  );
}

function Phone(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect
        x={18}
        y={14}
        width={12}
        height={20}
        rx={3}
        fill="none"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        data-soft-layer="glyph"
      />
      <circle cx={24} cy={30.5} r={1.4} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M21.5 16.5h5"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </TileMark>
  );
}

function Link(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      {/* Two chain links — open rings that clearly read as a link */}
      <path
        data-soft-layer="glyph"
        d="M21.5 27.5a4.2 4.2 0 0 1 0-6l3.2-3.2a4.2 4.2 0 1 1 6 6L28.5 26.5"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
      />
      <path
        data-soft-layer="glyph"
        d="M26.5 20.5a4.2 4.2 0 0 1 0 6l-3.2 3.2a4.2 4.2 0 1 1-6-6L19.5 21.5"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
      />
    </TileMark>
  );
}

function Share(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle cx={30.5} cy={17} r={2.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <circle cx={17.5} cy={24} r={2.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <circle cx={30.5} cy={31} r={2.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M20 22.6l8-4.2M20 25.4l8 4.2"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      />
    </TileMark>
  );
}

function At(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle
        cx={24}
        cy={24}
        r={8.2}
        fill="none"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        data-soft-layer="glyph"
      />
      <circle
        cx={24}
        cy={24}
        r={3.6}
        fill="none"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        data-soft-layer="glyph"
      />
      <path
        data-soft-layer="glyph"
        d="M27.6 24v1.8a2.8 2.8 0 0 0 5.2 1.4"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      />
    </TileMark>
  );
}

/* ── Data & commerce ── */

function Chart(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        {[
          { x: 10.5, h: 18, y: 20 },
          { x: 20, h: 26, y: 12 },
          { x: 29.5, h: 21, y: 17 },
        ].map((b, i) => (
          <g key={i}>
            <rect data-soft-layer="extrude" x={b.x + 1.4} y={b.y + 2.2} width={7.2} height={b.h} rx={2.8} fill={`url(#${uid}-body)`} opacity={0.48} />
            <rect data-soft-layer="face" x={b.x} y={b.y} width={7.2} height={b.h} rx={2.8} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1} />
            <rect data-soft-layer="glyph" x={b.x + 1.35} y={b.y + b.h * 0.38} width={4.5} height={b.h * 0.52} rx={1.6} fill={`url(#${uid}-core)`} opacity={0.82} />
          </g>
        ))}
      </g>
    </Frame>
  );
}

function TrendingUp(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M15.5 29l6.5-7 4.5 3.5 6.5-9" width={2.7} />
      <StrokeGlyph uid={uid} d="M27 16.5h6.5v6.5" width={2.6} />
    </TileMark>
  );
}

function TrendingDown(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M15.5 19l6.5 7 4.5-3.5 6.5 9" width={2.7} />
      <StrokeGlyph uid={uid} d="M27 31.5h6.5v-6.5" width={2.6} />
    </TileMark>
  );
}

function PieChart(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle cx={24} cy={24} r={11} fill={`url(#${uid}-core)`} opacity={0.35} data-soft-layer="glyph" />
      <path d="M24 13A11 11 0 0 1 35 24H24V13Z" fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path d="M24 24l9.5 5.5A11 11 0 0 1 24 35V24Z" fill={`url(#${uid}-core)`} opacity={0.7} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Activity(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M15 24h3.5l2.5-7 3.5 14 3-9 2.5 4H33" width={2.6} />
    </TileMark>
  );
}

function Report(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={16} y={14} width={16} height={20} rx={3} fill="none" stroke={`url(#${uid}-core)`} strokeWidth={2.5} data-soft-layer="glyph" />
      <rect x={19} y={18} width={10} height={2.4} rx={1.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <rect x={19} y={23} width={8} height={2.2} rx={1.1} fill={`url(#${uid}-core)`} opacity={0.65} data-soft-layer="glyph" />
      <rect x={19} y={28} width={6} height={2.2} rx={1.1} fill={`url(#${uid}-core)`} opacity={0.5} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Wallet(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="face"
          d="M10 15.8l3.2-4.6A4 4 0 0 1 16.6 9.2h14A4 4 0 0 1 34 11.3l3 4.5"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1}
        />
        <rect data-soft-layer="extrude" x={9.5} y={17.5} width={31} height={18} rx={6} fill={`url(#${uid}-body)`} opacity={0.5} />
        <rect data-soft-layer="face" x={8} y={15.5} width={31} height={18} rx={6} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.15} />
        <rect data-soft-layer="glyph" x={27} y={20} width={9.5} height={9} rx={3} fill={`url(#${uid}-core)`} opacity={0.85} />
        <circle cx={31.8} cy={24.5} r={1.7} fill="var(--soft-cx-frost, #fff)" opacity={0.7} data-soft-layer="glyph" />
      </g>
    </Frame>
  );
}

function CreditCard(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect
        x={14}
        y={17}
        width={20}
        height={14}
        rx={3}
        fill="none"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.5}
        data-soft-layer="glyph"
      />
      <rect x={14} y={20.5} width={20} height={3.5} fill={`url(#${uid}-core)`} opacity={0.75} data-soft-layer="glyph" />
      <rect x={17} y={26.5} width={7} height={2.2} rx={1} fill={`url(#${uid}-core)`} opacity={0.55} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Dollar(p) {
  const { uid, ...frame } = p;
  // Clean $ — stem + S-curve, Close-weight stroke (no badge circle)
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} width={2.7} d="M24 15.5v17" />
      <StrokeGlyph
        uid={uid}
        width={2.7}
        d="M29 19c-.9-2-2.6-3.2-5-3.2-2.8 0-4.8 1.6-4.8 3.6 0 5 9 2.4 9 7.4 0 2.2-2.2 3.7-4.8 3.7-2.6 0-4.5-1.3-5.3-3.2"
      />
    </TileMark>
  );
}

function Cart(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M15 16.5h2.5l2.8 12h12.5l2.2-8.5H19" width={2.5} />
      <circle cx={22} cy={32.5} r={1.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <circle cx={30.5} cy={32.5} r={1.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Receipt(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M17 14h14v18l-2.2-1.4-2.3 1.4-2.3-1.4-2.3 1.4-2.3-1.4-2.6 1.4V14Z"
        fill={`url(#${uid}-core)`}
        opacity={0.8}
      />
      <rect x={20} y={18} width={8} height={2} rx={1} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
      <rect x={20} y={22.5} width={6} height={2} rx={1} fill={`url(#${uid}-face)`} opacity={0.85} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Package(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M15.5 19.5l8.5-4.5 8.5 4.5v10l-8.5 4.5-8.5-4.5v-10Z"
        fill={`url(#${uid}-core)`}
        opacity={0.75}
      />
      <path
        data-soft-layer="glyph"
        d="M15.5 19.5l8.5 4.5 8.5-4.5M24 24v10"
        stroke="var(--soft-cx-frost, #fff)"
        strokeWidth={1.8}
        fill="none"
        opacity={0.85}
      />
    </TileMark>
  );
}

/* ── Content & places ── */

function Calendar(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <rect data-soft-layer="extrude" x={11.8} y={14.2} width={27} height={27} rx={7.5} fill={`url(#${uid}-body)`} opacity={0.52} />
        <rect data-soft-layer="face" x={9.5} y={11.5} width={27} height={27} rx={7.5} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.15} />
        <rect x={9.5} y={11.5} width={27} height={9.5} rx={7.5} fill={`url(#${uid}-core)`} opacity={0.92} data-soft-layer="glyph" />
        <rect x={9.5} y={17} width={27} height={4} fill={`url(#${uid}-core)`} opacity={0.92} data-soft-layer="glyph" />
        {[16.2, 23.5, 30.8].map((x) => (
          <g key={x} data-soft-layer="glyph">
            <rect x={x - 1.45} y={7.8} width={2.9} height={7.4} rx={1.45} fill={`url(#${uid}-core)`} />
            <circle cx={x} cy={8.6} r={2.25} fill="var(--soft-cx-frost, #fff)" opacity={0.9} />
          </g>
        ))}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              data-soft-layer="glyph"
              x={13.6 + c * 6.4}
              y={23.8 + r * 4.7}
              width={4.6}
              height={3.4}
              rx={1.1}
              fill="var(--soft-cx-mark, #fff)"
              opacity={0.5 + (r + c) * 0.06}
            />
          ))
        )}
      </g>
    </Frame>
  );
}

function Clock(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame} rx={14}>
      <circle cx={24} cy={24} r={11} fill={`url(#${uid}-core)`} opacity={0.3} data-soft-layer="glyph" />
      <StrokeGlyph uid={uid} d="M24 16v9l5 3" width={2.6} />
    </TileMark>
  );
}

function Folder(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M10 18.5h9l2.4 2.4H38v16.5A4 4 0 0 1 34 41.4H14A4 4 0 0 1 10 37.4V18.5Z"
          fill={`url(#${uid}-body)`}
          opacity={0.5}
          transform="translate(1.2 1.6)"
        />
        <path
          data-soft-layer="face"
          d="M9 17h9.2l2.5 2.6H37.5A3.5 3.5 0 0 1 41 23.1v14.3A3.5 3.5 0 0 1 37.5 41H12.5A3.5 3.5 0 0 1 9 37.4V17Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <Spec uid={uid} d="M13 22h22" opacity={0.5} />
      </g>
    </Frame>
  );
}

function File(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M17.5 14h8.5l6.5 6.5V33a2.5 2.5 0 0 1-2.5 2.5h-12.5A2.5 2.5 0 0 1 15 33V16.5A2.5 2.5 0 0 1 17.5 14Z"
        fill={`url(#${uid}-core)`}
        opacity={0.85}
      />
      <path data-soft-layer="glyph" d="M26 14v6.5h6.5" fill={`url(#${uid}-face)`} />
    </TileMark>
  );
}

function Files(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={19} y={14} width={13} height={17} rx={2.5} fill={`url(#${uid}-core)`} opacity={0.4} data-soft-layer="glyph" />
      <rect x={15} y={17} width={13} height={17} rx={2.5} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Image(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={13} y={14} width={22} height={20} rx={4} fill={`url(#${uid}-core)`} opacity={0.35} data-soft-layer="glyph" />
      <circle cx={19} cy={21} r={2.5} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path d="M13 30l7-7 5 5 4-4 6 6" stroke={`url(#${uid}-core)`} strokeWidth={2.4} fill="none" strokeLinejoin="round" data-soft-layer="glyph" />
    </TileMark>
  );
}

function Database(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <ellipse cx={24} cy={16.5} rx={9} ry={3.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path d="M15 16.5v6.5c0 1.8 4 3.2 9 3.2s9-1.4 9-3.2v-6.5" fill={`url(#${uid}-core)`} opacity={0.55} data-soft-layer="glyph" />
      <path d="M15 23v6.5c0 1.8 4 3.2 9 3.2s9-1.4 9-3.2V23" fill={`url(#${uid}-core)`} opacity={0.4} data-soft-layer="glyph" />
      <ellipse cx={24} cy={23} rx={9} ry={3.2} fill="none" stroke={`url(#${uid}-face)`} strokeWidth={1.4} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Cloud(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M17.5 29h13a5.5 5.5 0 0 0 .8-10.9 7.2 7.2 0 0 0-13.8 2.4A4.8 4.8 0 0 0 17.5 29Z"
        fill={`url(#${uid}-core)`}
        opacity={0.88}
      />
    </TileMark>
  );
}

function Server(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      {[0, 1, 2].map((i) => (
        <g key={i} data-soft-layer="glyph">
          <rect x={13} y={12 + i * 9} width={22} height={7} rx={2.2} fill={`url(#${uid}-core)`} opacity={0.75 - i * 0.1} />
          <circle cx={17} cy={15.5 + i * 9} r={1.3} fill={`url(#${uid}-face)`} />
        </g>
      ))}
    </TileMark>
  );
}

function Tag(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      {/* Price-tag: hole near tip, body to the right */}
      <path
        data-soft-layer="glyph"
        d="M16 24l7-7h10.5a2.5 2.5 0 0 1 2.5 2.5V28.5a2.5 2.5 0 0 1-2.5 2.5H23L16 24Z"
        fill={`url(#${uid}-core)`}
        opacity={0.88}
      />
      <circle cx={30} cy={24} r={1.8} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Bookmark(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path d="M16 12h16v24l-8-5-8 5V12Z" fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Star(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <FillGlyph uid={uid} d="M24 13l3.2 6.5 7.2 1-5.2 5.1 1.3 7.2L24 29.2l-6.5 3.6 1.3-7.2-5.2-5.1 7.2-1L24 13Z" />
    </TileMark>
  );
}

function Flag(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M18 32.5V16" width={2.7} />
      <path
        data-soft-layer="glyph"
        d="M18 16.5h12.5l-2.5 4.5 2.5 4.5H18V16.5Z"
        fill={`url(#${uid}-core)`}
      />
    </TileMark>
  );
}

function MapPin(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path d="M24 12c5.5 0 10 4.2 10 9.5 0 7-10 16.5-10 16.5S14 28.5 14 21.5C14 16.2 18.5 12 24 12Z" fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
      <circle cx={24} cy={21} r={3.2} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Globe(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle cx={24} cy={24} r={9} fill="none" stroke={`url(#${uid}-core)`} strokeWidth={2.5} data-soft-layer="glyph" />
      <ellipse cx={24} cy={24} rx={4} ry={9} fill="none" stroke={`url(#${uid}-core)`} strokeWidth={2} data-soft-layer="glyph" />
      <path
        d="M15.5 24h17M16.5 19.5h15M16.5 28.5h15"
        stroke={`url(#${uid}-core)`}
        strokeWidth={1.7}
        strokeLinecap="round"
        data-soft-layer="glyph"
      />
    </TileMark>
  );
}

/* ── System ── */

function Settings(p) {
  const { uid, ...frame } = p;
  // Connected cog (teeth overlap hub) — not a calendar, not a sun
  return (
    <TileMark uid={uid} {...frame}>
      <g data-soft-layer="glyph" transform="translate(24 24)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x={-1.7}
            y={-11.6}
            width={3.4}
            height={7.2}
            rx={1.25}
            fill={`url(#${uid}-core)`}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r={6.3} fill={`url(#${uid}-core)`} />
        <circle r={2.7} fill={`url(#${uid}-face)`} />
      </g>
    </TileMark>
  );
}

function Info(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="face" cx={24} cy={24} r={14} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.2} />
        <circle cx={24} cy={16.5} r={1.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
        <rect x={22.2} y={20.5} width={3.6} height={12} rx={1.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      </g>
    </Frame>
  );
}

function Help(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle cx={24} cy={24} r={9.5} fill="none" stroke={`url(#${uid}-core)`} strokeWidth={2.5} data-soft-layer="glyph" />
      <StrokeGlyph uid={uid} d="M21 20c0-1.8 1.4-3 3-3s3 1.3 3 3c0 1.8-1.5 2.4-3 3v2" width={2.5} />
      <circle cx={24} cy={30.5} r={1.4} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Alert(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle cx={24} cy={24} r={9.5} fill={`url(#${uid}-core)`} opacity={0.9} data-soft-layer="glyph" />
      <rect x={22.4} y={18} width={3.2} height={9} rx={1.6} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
      <circle cx={24} cy={30.5} r={1.5} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Warning(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M24 15.5l10.5 18H13.5L24 15.5Z"
        fill={`url(#${uid}-core)`}
        opacity={0.9}
      />
      <rect x={22.5} y={21.5} width={3} height={6.5} rx={1.4} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
      <circle cx={24} cy={30.5} r={1.4} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Ban(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <circle cx={24} cy={24} r={9.5} fill="none" stroke={`url(#${uid}-core)`} strokeWidth={2.7} data-soft-layer="glyph" />
      <StrokeGlyph uid={uid} d="M17.5 30.5L30.5 17.5" width={2.7} />
    </TileMark>
  );
}

function Sparkles(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <g data-soft-layer="glyph" fill={`url(#${uid}-core)`}>
        <path d="M24 14.5l1.5 4.2 4.2 1.5-4.2 1.5L24 25.9l-1.5-4.2-4.2-1.5 4.2-1.5L24 14.5Z" />
        <path d="M32.2 26.2l.85 2.4 2.4.85-2.4.85-.85 2.4-.85-2.4-2.4-.85 2.4-.85.85-2.4Z" opacity={0.85} />
        <path d="M15.5 27l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z" opacity={0.75} />
      </g>
    </TileMark>
  );
}

function Rocket(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M24 14c3.5 3 5.5 7.5 5.5 12l-2.8 1.4-2.7-7-2.7 7-2.8-1.4c0-4.5 2-9 5.5-12Z"
        fill={`url(#${uid}-core)`}
      />
      <circle cx={24} cy={21} r={1.8} fill={`url(#${uid}-face)`} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M20.5 29.5c-1.2 1.2-2 2.8-2 2.8s1.8-.5 3-1.6M27.5 29.5c1.2 1.2 2 2.8 2 2.8s-1.8-.5-3-1.6"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />
    </TileMark>
  );
}

function Zap(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <FillGlyph uid={uid} d="M26.5 15L17.5 25.5h6.2L21.5 33.5 31 22.2h-6.2L26.5 15Z" />
    </TileMark>
  );
}

function Layers(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path
        data-soft-layer="glyph"
        d="M24 15.5l10 5-10 5-10-5 10-5Z"
        fill={`url(#${uid}-core)`}
        opacity={0.9}
      />
      <path
        data-soft-layer="glyph"
        d="M15.5 24.5l8.5 4.2 8.5-4.2"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        fill="none"
        strokeLinejoin="round"
      />
      <path
        data-soft-layer="glyph"
        d="M15.5 29l8.5 4.2 8.5-4.2"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        fill="none"
        strokeLinejoin="round"
        opacity={0.55}
      />
    </TileMark>
  );
}

function Code(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} d="M20 17.5l-5 6.5 5 6.5M28 17.5l5 6.5-5 6.5M26 16.5l-4 15" width={2.6} />
    </TileMark>
  );
}

function Terminal(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <rect x={12} y={13} width={24} height={22} rx={4} fill={`url(#${uid}-core)`} opacity={0.75} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M16 20l5 4-5 4M23 28h8"
        stroke="var(--soft-cx-frost, #fff)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </TileMark>
  );
}

function Support(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      {/* Headset cups + band */}
      <path
        data-soft-layer="glyph"
        d="M16.5 24.5a7.5 7.5 0 0 1 15 0"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
      />
      <rect x={15} y={24} width={4.5} height={8} rx={2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <rect x={28.5} y={24} width={4.5} height={8} rx={2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Book(p) {
  const { uid, ...frame } = p;
  return (
    <TileMark uid={uid} {...frame}>
      <path d="M12 14h11v22H14a2 2 0 0 1-2-2V14Z" fill={`url(#${uid}-core)`} opacity={0.75} data-soft-layer="glyph" />
      <path d="M25 14h11v20a2 2 0 0 1-2 2H25V14Z" fill={`url(#${uid}-core)`} opacity={0.55} data-soft-layer="glyph" />
      <path d="M24 14v22" stroke={`url(#${uid}-face)`} strokeWidth={2} data-soft-layer="glyph" />
    </TileMark>
  );
}

function Power(p) {
  const { uid, ...frame } = p;
  // Stem through top gap + open arc (majority through bottom)
  return (
    <TileMark uid={uid} {...frame}>
      <StrokeGlyph uid={uid} width={2.7} d="M24 14.5v10" />
      <StrokeGlyph uid={uid} width={2.7} d="M30.6 19a8.6 8.6 0 1 1-13.2 0" />
    </TileMark>
  );
}

export const FROSTED_ICON_MAP = {
  home: Home,
  dashboard: Dashboard,
  grid: Grid,
  layout: Layout,
  sidebar: Sidebar,
  panels: Panels,
  table: Table,
  list: List,
  columns: Columns,
  menu: Menu,
  search: Search,
  filter: Filter,
  sort: Sort,
  more: More,
  close: Close,
  check: Check,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  trash: Trash,
  copy: Copy,
  save: Save,
  download: Download,
  upload: Upload,
  refresh: Refresh,
  externalLink: ExternalLink,
  arrowLeft: (p) => <Arrow dir="left" {...p} />,
  arrowRight: (p) => <Arrow dir="right" {...p} />,
  arrowUp: (p) => <Arrow dir="up" {...p} />,
  arrowDown: (p) => <Arrow dir="down" {...p} />,
  chevronRight: (p) => <Chevron dir="right" {...p} />,
  chevronLeft: (p) => <Chevron dir="left" {...p} />,
  user: User,
  users: Users,
  userPlus: UserPlus,
  lock: Lock,
  unlock: Unlock,
  shield: Shield,
  key: Key,
  eye: Eye,
  eyeOff: EyeOff,
  login: Login,
  logout: Logout,
  mail: Mail,
  send: Send,
  inbox: Inbox,
  chat: Chat,
  bell: Bell,
  phone: Phone,
  link: Link,
  share: Share,
  at: At,
  chart: Chart,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  pieChart: PieChart,
  activity: Activity,
  report: Report,
  wallet: Wallet,
  creditCard: CreditCard,
  dollar: Dollar,
  cart: Cart,
  receipt: Receipt,
  package: Package,
  calendar: Calendar,
  clock: Clock,
  folder: Folder,
  file: File,
  files: Files,
  image: Image,
  database: Database,
  cloud: Cloud,
  server: Server,
  tag: Tag,
  bookmark: Bookmark,
  star: Star,
  flag: Flag,
  mapPin: MapPin,
  globe: Globe,
  settings: Settings,
  info: Info,
  help: Help,
  alert: Alert,
  warning: Warning,
  ban: Ban,
  sparkles: Sparkles,
  rocket: Rocket,
  zap: Zap,
  layers: Layers,
  code: Code,
  terminal: Terminal,
  support: Support,
  book: Book,
  power: Power,
};

// Ensure registry and map stay aligned
const missing = FROSTED_ICON_KEYS.filter((k) => !FROSTED_ICON_MAP[k]);
if (missing.length && import.meta.env?.DEV) {
  console.warn("[frostedIcons] missing implementations:", missing);
}

export function renderFrostedIcon(name, props) {
  const Comp = FROSTED_ICON_MAP[name];
  if (!Comp) return null;
  return <Comp {...props} />;
}
