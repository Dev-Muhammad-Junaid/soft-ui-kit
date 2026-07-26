/**
 * Bare SoftMark catalog — frosted shaped / stroke marks matching Arrow, User, Bell, Chart.
 * Parallel to Soft Complex tiled definitions in frostedIcons.jsx (do not mutate those).
 *
 * Rule: Bare = SoftMark language · Tiled = Soft Complex TileMark / shaped originals.
 * Theme paints: SoftMark gradients + --soft-cx-frost / --soft-cx-mark / --soft-cx-cut.
 */

import {
  Frame,
  SoftCircleMark,
  SoftMark,
  SoftRects,
  SoftStrokeMark,
  Spec,
} from "./softMark";

const CX_FROST = "var(--soft-cx-frost)";
const CX_CUT = "var(--soft-cx-cut)";

/* ── Navigation ── */

function Dashboard(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 9.5, y: 9.5, w: 13, h: 13, rx: 3.5, opacity: 0.88 },
        { x: 25.5, y: 9.5, w: 13, h: 8, rx: 3, opacity: 0.72 },
        { x: 25.5, y: 20.5, w: 13, h: 18, rx: 3.5, opacity: 0.8 },
        { x: 9.5, y: 25.5, w: 13, h: 13, rx: 3.5, opacity: 0.68 },
      ]}
    />
  );
}

function Grid(p) {
  const { uid, ...frame } = p;
  const cells = [0, 1].flatMap((r) =>
    [0, 1].map((c) => ({
      x: 10 + c * 14,
      y: 10 + r * 14,
      w: 12,
      h: 12,
      rx: 3.5,
      opacity: 0.78 - (r + c) * 0.08,
    }))
  );
  return <SoftRects uid={uid} {...frame} rects={cells} />;
}

function Layout(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 9.5, y: 9.5, w: 11, h: 29, rx: 3.5, opacity: 0.85 },
        { x: 23.5, y: 9.5, w: 15, h: 13, rx: 3.5, opacity: 0.72 },
        { x: 23.5, y: 25.5, w: 15, h: 13, rx: 3.5, opacity: 0.6 },
      ]}
    />
  );
}

function Sidebar(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 10, y: 10, w: 10, h: 28, rx: 3.2, opacity: 0.88 },
        { x: 23, y: 11.5, w: 15, h: 5.2, rx: 2.6, opacity: 0.78 },
        { x: 23, y: 21.4, w: 15, h: 5.2, rx: 2.6, opacity: 0.68 },
        { x: 23, y: 31.3, w: 15, h: 5.2, rx: 2.6, opacity: 0.58 },
      ]}
    />
  );
}

function Panels(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 9.5, y: 10, w: 13.5, h: 28, rx: 3.5, opacity: 0.82 },
        { x: 25.5, y: 10, w: 13.5, h: 28, rx: 3.5, opacity: 0.62 },
      ]}
    />
  );
}

function Table(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 10, y: 11, w: 28, h: 7, rx: 3, opacity: 0.88 },
        { x: 10, y: 20.5, w: 28, h: 5.2, rx: 2.6, opacity: 0.72 },
        { x: 10, y: 28.5, w: 28, h: 5.2, rx: 2.6, opacity: 0.62 },
        { x: 10, y: 36.5, w: 28, h: 5.2, rx: 2.6, opacity: 0.52 },
      ]}
    />
  );
}

function List(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {[0, 1, 2].map((i) => {
          const y = 12 + i * 9;
          return (
            <g key={i}>
              <circle
                data-soft-layer="extrude"
                cx={14.2}
                cy={y + 1.4}
                r={2.6}
                fill={`url(#${uid}-body)`}
                opacity={0.45}
              />
              <circle
                data-soft-layer="face"
                cx={13}
                cy={y}
                r={2.6}
                fill={`url(#${uid}-face)`}
                stroke={`url(#${uid}-rim)`}
                strokeWidth={1}
              />
              <rect
                data-soft-layer="extrude"
                x={19.2}
                y={y - 1.2}
                width={18}
                height={5.2}
                rx={2.4}
                fill={`url(#${uid}-body)`}
                opacity={0.4}
              />
              <rect
                data-soft-layer="face"
                x={18}
                y={y - 2.6}
                width={18}
                height={5.2}
                rx={2.4}
                fill={`url(#${uid}-face)`}
                stroke={`url(#${uid}-rim)`}
                strokeWidth={1}
              />
            </g>
          );
        })}
      </g>
    </Frame>
  );
}

function Columns(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[0, 1, 2].map((i) => ({
        x: 10 + i * 11,
        y: 10,
        w: 9,
        h: 28,
        rx: 3,
        opacity: 0.78 - i * 0.1,
      }))}
    />
  );
}

function Search(p) {
  const { uid, ...frame } = p;
  // Optical center: lens slightly NW so handle balances the mark
  const cx = 21.6;
  const cy = 21.2;
  const r = 11.4;
  const handle = "M29.6 29.2L37.4 37";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={cx + 1.2} cy={cy + 1.4} r={r} fill={`url(#${uid}-body)`} opacity={0.48} />
        <circle
          data-soft-layer="face"
          cx={cx}
          cy={cy}
          r={r}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.2}
        />
        <circle
          data-soft-layer="glyph"
          cx={cx}
          cy={cy}
          r={6.4}
          fill="none"
          stroke={`url(#${uid}-core)`}
          strokeWidth={3.3}
        />
        <path
          data-soft-layer="extrude"
          d={handle}
          stroke={`url(#${uid}-body)`}
          strokeWidth={6.4}
          strokeLinecap="round"
          opacity={0.42}
          transform="translate(1 1.2)"
        />
        <path
          data-soft-layer="face"
          d={handle}
          stroke={`url(#${uid}-face)`}
          strokeWidth={5.1}
          strokeLinecap="round"
          opacity={0.95}
        />
        <path
          data-soft-layer="glyph"
          d={handle}
          stroke={`url(#${uid}-core)`}
          strokeWidth={3.3}
          strokeLinecap="round"
        />
        <Spec uid={uid} d={`M${cx - 6.5} ${cy - 5}c2.6-2.8 7.2-3.2 10.5-1`} opacity={0.7} />
      </g>
    </Frame>
  );
}

function Menu(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[0, 1, 2].map((i) => ({
        x: 11,
        y: 13 + i * 8,
        w: 26,
        h: 5.2,
        rx: 2.6,
        opacity: 0.85 - i * 0.1,
      }))}
    />
  );
}

/* ── Actions ── */

function Filter(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M12 14.5h24l-8 10v8.5l-8-4v-4.5L12 14.5Z"
      spec="M16 17h14"
    />
  );
}

function Sort(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.2}
      paths={["M13 15h22M13 24h15M13 33h10M34 18l4 5-4 5"]}
    />
  );
}

function More(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {[16, 24, 32].map((x) => (
          <g key={x}>
            <circle
              data-soft-layer="extrude"
              cx={x + 1.1}
              cy={25.4}
              r={3.4}
              fill={`url(#${uid}-body)`}
              opacity={0.45}
            />
            <circle
              data-soft-layer="face"
              cx={x}
              cy={24}
              r={3.4}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1.1}
            />
            <circle cx={x} cy={24} r={1.5} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
          </g>
        ))}
      </g>
    </Frame>
  );
}

function Close(p) {
  return <SoftStrokeMark {...p} width={3.8} paths={["M15 15l18 18M33 15L15 33"]} />;
}

function Check(p) {
  return <SoftStrokeMark {...p} width={4} d="M14 24.5l6 6L35 15.5" />;
}

function Plus(p) {
  return <SoftStrokeMark {...p} width={3.9} d="M24 14v20M14 24h20" />;
}

function Minus(p) {
  return <SoftStrokeMark {...p} width={3.9} d="M14 24h20" />;
}

function Edit(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M14.5 33.5h6.2L36 18.2l-6.2-6.2L14.5 27.3v6.2Z"
      spec="M18 24l8-8"
    >
      <path
        data-soft-layer="glyph"
        d="M28.5 13.5l6 6"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </SoftMark>
  );
}

function Copy(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <rect
          data-soft-layer="extrude"
          x={18.5}
          y={12.5}
          width={16}
          height={18}
          rx={3.5}
          fill={`url(#${uid}-body)`}
          opacity={0.4}
        />
        <rect
          data-soft-layer="face"
          x={17}
          y={11}
          width={16}
          height={18}
          rx={3.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
          opacity={0.75}
        />
        <rect
          data-soft-layer="extrude"
          x={13.2}
          y={17.5}
          width={16}
          height={18}
          rx={3.5}
          fill={`url(#${uid}-body)`}
          opacity={0.48}
        />
        <rect
          data-soft-layer="face"
          x={11.5}
          y={16}
          width={16}
          height={18}
          rx={3.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <Spec uid={uid} d="M15 19h10" />
      </g>
    </Frame>
  );
}

function Save(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M12 11h18l6 6v18a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3Z"
      spec="M15 15h14"
    >
      <rect x={17} y={11} width={11} height={8} rx={1.6} fill={`url(#${uid}-core)`} opacity={0.55} data-soft-layer="glyph" />
      <rect x={18.5} y={28} width={11} height={7} rx={2} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Download(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.4}
      paths={["M24 12v18M16.5 23.5L24 31l7.5-7.5M14 36h20"]}
    />
  );
}

function Upload(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.4}
      paths={["M24 36V18M16.5 24.5L24 17l7.5 7.5M14 12h20"]}
    />
  );
}

function Refresh(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.3}
      paths={[
        "M15.5 20.5A9 9 0 0 1 33 19.5M33 13.5v6.5h-6.5",
        "M32.5 27.5A9 9 0 0 1 15 28.5M15 34.5V28h6.5",
      ]}
    />
  );
}

function ExternalLink(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.2}
      paths={[
        "M28 23v8a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V23a3 3 0 0 1 3-3h8",
        "M24 24L36 12M28 12h8v8",
      ]}
    />
  );
}

function Chevron(dir, p) {
  const d = dir === "left" ? "M29 14L19 24l10 10" : "M19 14l10 10-10 10";
  return <SoftStrokeMark {...p} width={4} d={d} />;
}

/* ── People ── */

function Users(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {/* Back figure — smaller, same SoftMark language as User */}
        <circle data-soft-layer="extrude" cx={31.3} cy={18.4} r={5.2} fill={`url(#${uid}-body)`} opacity={0.38} />
        <circle
          data-soft-layer="face"
          cx={30}
          cy={17}
          r={5.2}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.82}
        />
        <path
          data-soft-layer="face"
          d="M22.5 36.2c1.2-4.2 3.6-6.4 8-6.4 4.2 0 6.8 2 8 5.6"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.78}
        />
        {/* Front figure — User proportions, optically centered pair */}
        <circle data-soft-layer="extrude" cx={19.4} cy={17.8} r={6.2} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle
          data-soft-layer="face"
          cx={18}
          cy={16.2}
          r={6.2}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <path
          data-soft-layer="face"
          d="M7.5 36.8c1.7-5.8 5-8.8 11-8.8s9.2 3 11 8.8"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <circle cx={18} cy={16.2} r={3.1} fill={`url(#${uid}-core)`} opacity={0.78} data-soft-layer="glyph" />
        <ellipse cx={15.8} cy={13.8} rx={2.8} ry={1.35} fill={CX_FROST} opacity={0.4} data-soft-layer="specular" />
      </g>
    </Frame>
  );
}

function UserPlus(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={19.5} cy={17.5} r={5.8} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle data-soft-layer="face" cx={18} cy={16} r={5.8} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.1} />
        <path
          data-soft-layer="face"
          d="M8.5 36.5c1.8-6.5 5.4-9.8 11.5-9.8s9.7 3.3 11.5 9.8"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <path
          data-soft-layer="glyph"
          d="M33 15v10M28 20h10"
          stroke={`url(#${uid}-core)`}
          strokeWidth={2.8}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function Lock(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M14 22h20a3.5 3.5 0 0 1 3.5 3.5v9A3.5 3.5 0 0 1 34 38H14a3.5 3.5 0 0 1-3.5-3.5v-9A3.5 3.5 0 0 1 14 22Z"
      spec="M17 25h12"
    >
      <path
        data-soft-layer="glyph"
        d="M18 22v-3.5a6 6 0 0 1 12 0V22"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.8}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={24} cy={29.5} r={2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Unlock(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M14 22h20a3.5 3.5 0 0 1 3.5 3.5v9A3.5 3.5 0 0 1 34 38H14a3.5 3.5 0 0 1-3.5-3.5v-9A3.5 3.5 0 0 1 14 22Z"
      spec="M17 25h12"
    >
      <path
        data-soft-layer="glyph"
        d="M18 22v-3.8a6.2 6.2 0 0 1 11.5-3.2"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.8}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={24} cy={29.5} r={2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Shield(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M24 9.5l12 4.5v9.5c0 7.2-5 11.8-12 14-7-2.2-12-6.8-12-14V14L24 9.5Z"
      spec="M16 16c3.5-3 10-3 13.5 0"
    >
      <path
        data-soft-layer="glyph"
        d="M19 24.5l3.2 3.2L29.5 20"
        stroke={CX_CUT}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SoftMark>
  );
}

function Key(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={17.5} cy={25.5} r={7.2} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle
          data-soft-layer="face"
          cx={16}
          cy={24}
          r={7.2}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <circle cx={16} cy={24} r={2.8} fill={`url(#${uid}-core)`} opacity={0.75} data-soft-layer="glyph" />
        <path
          data-soft-layer="face"
          d="M22 24h14.5l-.2 4.2h-3.2l-.3 3.2h-3.4V28.2H26.5"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
      </g>
    </Frame>
  );
}

function Eye(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M6.5 24c3.8-7.5 9.2-11.5 17.5-11.5S37.7 16.5 41.5 24c-3.8 7.5-9.2 11.5-17.5 11.5S10.3 31.5 6.5 24Z"
      spec="M14 20c3-3.5 9-4 14-1"
    >
      <circle cx={24} cy={24} r={5.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <circle cx={22.2} cy={22.4} r={1.8} fill={CX_FROST} opacity={0.55} data-soft-layer="specular" />
    </SoftMark>
  );
}

function EyeOff(p) {
  const { uid, ...frame } = p;
  // Same almond as Eye SoftMark + Close-weight slash on top
  const eye =
    "M6.5 24c3.8-7.5 9.2-11.5 17.5-11.5S37.7 16.5 41.5 24c-3.8 7.5-9.2 11.5-17.5 11.5S10.3 31.5 6.5 24Z";
  const slash = "M14.5 33.5L33.5 14.5";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d={eye}
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1.2 1.5)"
        />
        <path
          data-soft-layer="face"
          d={eye}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <circle cx={24} cy={24} r={5.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
        <circle cx={22.2} cy={22.4} r={1.8} fill={CX_FROST} opacity={0.45} data-soft-layer="specular" />
        <path
          data-soft-layer="extrude"
          d={slash}
          stroke={`url(#${uid}-body)`}
          strokeWidth={6.8}
          strokeLinecap="round"
          opacity={0.45}
          transform="translate(1.15 1.35)"
        />
        <path
          data-soft-layer="face"
          d={slash}
          stroke={`url(#${uid}-face)`}
          strokeWidth={5.2}
          strokeLinecap="round"
          opacity={0.95}
        />
        <path
          data-soft-layer="glyph"
          d={slash}
          stroke={`url(#${uid}-core)`}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function Login(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.3}
      paths={["M20 12h-6a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h6M24 24h14M32 17l7 7-7 7"]}
    />
  );
}

function Logout(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.3}
      paths={["M28 12h6a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-6M24 24H10M16 17l-7 7 7 7"]}
    />
  );
}

/* ── Comms ── */

function Mail(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M9 15h30a3.5 3.5 0 0 1 3.5 3.5v13A3.5 3.5 0 0 1 39 35H9a3.5 3.5 0 0 1-3.5-3.5v-13A3.5 3.5 0 0 1 9 15Z"
      spec="M12 18h20"
    >
      <path
        data-soft-layer="glyph"
        d="M9.5 16.5L24 26.5 38.5 16.5"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        fill="none"
        strokeLinejoin="round"
      />
    </SoftMark>
  );
}

function Send(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M10 22.5L38 12l-8.5 24-5.5-9.5L10 22.5Z"
      spec="M16 21l10-4"
    >
      <path
        data-soft-layer="glyph"
        d="M24 26.5L29.5 36"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </SoftMark>
  );
}

function Inbox(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M7 11h34v13.5l-7.5 15.5H14.5L7 24.5V11Z"
      spec="M12 15h22"
    >
      <path
        data-soft-layer="glyph"
        d="M7 24.5h9.5a7.5 7.5 0 0 0 15 0H41"
        stroke={`url(#${uid}-core)`}
        strokeWidth={3.2}
        fill="none"
        strokeLinejoin="round"
      />
    </SoftMark>
  );
}

function Phone(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M17 10h14a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z"
      spec="M20 14h8"
    >
      <circle cx={24} cy={33} r={1.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M20.5 14.5h7"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </SoftMark>
  );
}

function Link(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.3}
      paths={[
        "M20 28.5a5.5 5.5 0 0 1 0-8l4-4a5.5 5.5 0 1 1 8 8L29 27.5",
        "M28 19.5a5.5 5.5 0 0 1 0 8l-4 4a5.5 5.5 0 1 1-8-8L19 20.5",
      ]}
    />
  );
}

function Share(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {[
          { x: 31, y: 15 },
          { x: 15, y: 24 },
          { x: 31, y: 33 },
        ].map(({ x, y }) => (
          <g key={`${x}-${y}`}>
            <circle data-soft-layer="extrude" cx={x + 1} cy={y + 1.2} r={3.6} fill={`url(#${uid}-body)`} opacity={0.45} />
            <circle
              data-soft-layer="face"
              cx={x}
              cy={y}
              r={3.6}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1.1}
            />
          </g>
        ))}
        <path
          data-soft-layer="glyph"
          d="M18 22.4l10-5.2M18 25.6l10 5.2"
          stroke={`url(#${uid}-core)`}
          strokeWidth={2.6}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function At(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={13} spec="M16 17c3-3 8-3 12-1">
      <circle cx={24} cy={24} r={5} fill="none" stroke={`url(#${uid}-core)`} strokeWidth={2.6} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M28.5 24v2.2a3.4 3.4 0 0 0 6.2 1.6"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      />
    </SoftCircleMark>
  );
}

/* ── Data ── */

function TrendingUp(p) {
  return <SoftStrokeMark {...p} width={3.4} paths={["M13 31l8.5-9 5.5 4.5 9-12M30 14.5h8v8"]} />;
}

function TrendingDown(p) {
  return <SoftStrokeMark {...p} width={3.4} paths={["M13 17l8.5 9 5.5-4.5 9 12M30 33.5h8v-8"]} />;
}

function PieChart(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={25.2} cy={25.5} r={13.8} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle
          data-soft-layer="face"
          cx={24}
          cy={24}
          r={13.8}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        {/* Primary wedge — glass face language like Chart bars */}
        <path
          data-soft-layer="glyph"
          d="M24 24V10.2A13.8 13.8 0 0 1 37.8 24H24Z"
          fill={`url(#${uid}-core)`}
          opacity={0.88}
        />
        <path
          data-soft-layer="glyph"
          d="M24 24l11.6 7.4A13.8 13.8 0 0 1 24 37.8V24Z"
          fill={`url(#${uid}-core)`}
          opacity={0.55}
        />
        <Spec uid={uid} d="M15.5 16c3.2-3.2 9-3.6 13.2-1" opacity={0.65} />
      </g>
    </Frame>
  );
}

function Activity(p) {
  return <SoftStrokeMark {...p} width={3.3} d="M12 24h4.5l3.5-10 5 20 4.5-12 3.5 5H36" />;
}

function Report(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M13 10h22a3.5 3.5 0 0 1 3.5 3.5v21A3.5 3.5 0 0 1 35 38H13a3.5 3.5 0 0 1-3.5-3.5v-21A3.5 3.5 0 0 1 13 10Z"
      spec="M16 14h16"
    >
      {[18, 24, 30].map((y, i) => (
        <rect
          key={y}
          x={17}
          y={y}
          width={14 - i * 2}
          height={3}
          rx={1.4}
          fill={`url(#${uid}-core)`}
          opacity={0.85 - i * 0.15}
          data-soft-layer="glyph"
        />
      ))}
    </SoftMark>
  );
}

function CreditCard(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M8.5 15h31a3.5 3.5 0 0 1 3.5 3.5v13A3.5 3.5 0 0 1 39.5 35h-31A3.5 3.5 0 0 1 5 31.5v-13A3.5 3.5 0 0 1 8.5 15Z"
      spec="M12 18h18"
    >
      <rect x={8.5} y={20} width={31} height={5} fill={`url(#${uid}-core)`} opacity={0.8} data-soft-layer="glyph" />
      <rect x={12} y={28} width={10} height={3} rx={1.2} fill={`url(#${uid}-core)`} opacity={0.55} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Dollar(p) {
  // Single path (stem + S) so SoftStrokeMark layers keep the vertical through the curve
  return (
    <SoftStrokeMark
      {...p}
      width={3.5}
      d="M24 10.5v27M31.2 16.2c-1.1-2.9-3.6-4.6-7.2-4.6-3.9 0-6.7 2.3-6.7 5.2 0 7 12.8 3.2 12.8 10.2 0 3.1-3.1 5.2-6.7 5.2-3.6 0-6.3-1.9-7.4-4.6"
    />
  );
}

function Cart(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="face"
          d="M11 14h4l3.5 15h15l3-10.5H18"
          fill="none"
          stroke={`url(#${uid}-face)`}
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          data-soft-layer="glyph"
          d="M11 14h4l3.5 15h15l3-10.5H18"
          fill="none"
          stroke={`url(#${uid}-core)`}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={21} cy={34.5} r={2.4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1} data-soft-layer="face" />
        <circle cx={31} cy={34.5} r={2.4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1} data-soft-layer="face" />
      </g>
    </Frame>
  );
}

function Receipt(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M14 10h20v28l-3.2-2-3.3 2-3.3-2-3.3 2-3.3-2-3.6 2V10Z"
      spec="M17 14h12"
    >
      <rect x={18} y={16} width={12} height={2.6} rx={1.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <rect x={18} y={22} width={9} height={2.4} rx={1.1} fill={`url(#${uid}-core)`} opacity={0.7} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Package(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M12 18.5L24 12l12 6.5v13L24 38 12 31.5v-13Z"
      spec="M16 20l8 4.5 8-4.5"
    >
      <path
        data-soft-layer="glyph"
        d="M12 18.5l12 6.5 12-6.5M24 25v13"
        stroke={CX_CUT}
        strokeWidth={1.8}
        fill="none"
        opacity={0.85}
      />
    </SoftMark>
  );
}

/* ── Content ── */

function Calendar(p) {
  const { uid, ...frame } = p;
  // Binder rings sit above the header but inside viewBox inset (≥10), not flush/scalloped
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <rect data-soft-layer="extrude" x={11.6} y={16} width={27} height={24} rx={6.5} fill={`url(#${uid}-body)`} opacity={0.48} />
        <rect
          data-soft-layer="face"
          x={10}
          y={14}
          width={28}
          height={24}
          rx={6.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <rect x={10} y={14} width={28} height={8.5} rx={6.5} fill={`url(#${uid}-core)`} opacity={0.9} data-soft-layer="glyph" />
        <rect x={10} y={19} width={28} height={3.5} fill={`url(#${uid}-core)`} opacity={0.9} data-soft-layer="glyph" />
        {[16.5, 24, 31.5].map((x) => (
          <g key={x} data-soft-layer="glyph">
            <rect x={x - 1.25} y={10.4} width={2.5} height={6.2} rx={1.25} fill={`url(#${uid}-core)`} />
            <circle cx={x} cy={11.2} r={1.85} fill={CX_FROST} opacity={0.95} />
          </g>
        ))}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              data-soft-layer="glyph"
              x={14.2 + c * 6.4}
              y={25.5 + r * 4.1}
              width={4.4}
              height={3.1}
              rx={1.1}
              fill={`url(#${uid}-core)`}
              opacity={0.42 + (r + c) * 0.05}
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
    <SoftCircleMark uid={uid} {...frame} r={14} spec="M16 16c3.5-3.5 9-4 13.5-1">
      <path
        data-soft-layer="glyph"
        d="M24 15v10l6.5 3.5"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SoftCircleMark>
  );
}

function File(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M14 10h12l8 8v18a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z"
      spec="M16 14h10"
    >
      <path data-soft-layer="glyph" d="M26 10v8h8" fill={`url(#${uid}-core)`} opacity={0.55} />
    </SoftMark>
  );
}

function Files(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <rect data-soft-layer="extrude" x={19} y={11} width={16} height={20} rx={3.5} fill={`url(#${uid}-body)`} opacity={0.4} />
        <rect
          data-soft-layer="face"
          x={17.5}
          y={9.5}
          width={16}
          height={20}
          rx={3.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.75}
        />
        <rect data-soft-layer="extrude" x={13.2} y={15} width={16} height={20} rx={3.5} fill={`url(#${uid}-body)`} opacity={0.48} />
        <rect
          data-soft-layer="face"
          x={11.5}
          y={13.5}
          width={16}
          height={20}
          rx={3.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <Spec uid={uid} d="M15 17h10" />
      </g>
    </Frame>
  );
}

function Image(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M9 12h30a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z"
      spec="M13 16h16"
    >
      <circle cx={17.5} cy={20.5} r={3} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M9 32l9-9 6 6 5-5 10 8"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.4}
        fill="none"
        strokeLinejoin="round"
      />
    </SoftMark>
  );
}

function Database(p) {
  const { uid, ...frame } = p;
  // SoftMark cylinder: identical rx/ry lids + two body bands (no broken cubic stack)
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M12 14v18c0 2.2 5.4 4 12 4s12-1.8 12-4V14"
          fill={`url(#${uid}-body)`}
          opacity={0.4}
          transform="translate(1.1 1.3)"
        />
        <path
          data-soft-layer="face"
          d="M12 22v10c0 2.2 5.4 4 12 4s12-1.8 12-4V22"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.7}
        />
        <path
          data-soft-layer="face"
          d="M12 14v10c0 2.2 5.4 4 12 4s12-1.8 12-4V14"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.85}
        />
        <ellipse data-soft-layer="face" cx={24} cy={32} rx={12} ry={4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1} opacity={0.65} />
        <ellipse data-soft-layer="face" cx={24} cy={24} rx={12} ry={4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.05} opacity={0.8} />
        <ellipse data-soft-layer="extrude" cx={25.2} cy={15.5} rx={12} ry={4} fill={`url(#${uid}-body)`} opacity={0.42} />
        <ellipse data-soft-layer="face" cx={24} cy={14} rx={12} ry={4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.15} />
        <ellipse cx={24} cy={14} rx={6.5} ry={1.9} fill={`url(#${uid}-core)`} opacity={0.34} data-soft-layer="glyph" />
        <Spec uid={uid} d="M15 12.2c2.8-1.6 8-1.8 12-0.3" opacity={0.55} />
      </g>
    </Frame>
  );
}

function Cloud(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M14 30h18a7 7 0 0 0 1-14 9.2 9.2 0 0 0-17.8 3.2A6.2 6.2 0 0 0 14 30Z"
      spec="M16 20c3-4 10-5 15-2"
    />
  );
}

function Server(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[0, 1, 2].map((i) => ({
        x: 11,
        y: 10 + i * 11,
        w: 26,
        h: 9,
        rx: 3,
        opacity: 0.8 - i * 0.1,
        coreY: 0.28,
        coreH: 0.4,
      }))}
    >
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={16}
          cy={14.5 + i * 11}
          r={1.5}
          fill={`url(#${uid}-core)`}
          data-soft-layer="glyph"
        />
      ))}
    </SoftRects>
  );
}

function Tag(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M12.5 24l9-9h13a3.5 3.5 0 0 1 3.5 3.5v11A3.5 3.5 0 0 1 34.5 33H21.5L12.5 24Z"
      spec="M22 18h10"
    >
      <circle cx={31} cy={24} r={2.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Bookmark(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M14 9h20v30l-10-6.5L14 39V9Z"
      spec="M17 13h12"
    />
  );
}

function Star(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M24 9.5l4.2 8.5 9.4 1.4-6.8 6.6 1.6 9.4L24 30.8l-8.4 4.6 1.6-9.4-6.8-6.6 9.4-1.4L24 9.5Z"
      spec="M18 18h10"
    />
  );
}

function Flag(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M17 14h16l-3.2 6 3.2 6H17V14Z"
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1.1 1.3)"
        />
        <path
          data-soft-layer="face"
          d="M16 12.5h16l-3.2 6 3.2 6H16V12.5Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <path
          data-soft-layer="glyph"
          d="M16 12v26"
          stroke={`url(#${uid}-core)`}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function MapPin(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M24 8c7 0 12.5 5.4 12.5 12.2 0 9-12.5 21-12.5 21S11.5 29.2 11.5 20.2C11.5 13.4 17 8 24 8Z"
      spec="M18 15c2.5-3 8-3.5 12 0"
    >
      <circle cx={24} cy={20} r={4} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Globe(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={13.5} spec="M16 16c3.5-3.5 9-4 13.5-1">
      <ellipse cx={24} cy={24} rx={5.5} ry={13.5} fill="none" stroke={`url(#${uid}-core)`} strokeWidth={2.2} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M11 24h26M12.5 18.5h23M12.5 29.5h23"
        stroke={`url(#${uid}-core)`}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </SoftCircleMark>
  );
}

/* ── System ── */

function Settings(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={8.5} spec="M18 18c2-2 5-2.5 8-1">
      <g data-soft-layer="glyph" transform="translate(24 24)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x={-2}
            y={-14}
            width={4}
            height={8.5}
            rx={1.4}
            fill={`url(#${uid}-face)`}
            stroke={`url(#${uid}-rim)`}
            strokeWidth={0.8}
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
      <circle cx={24} cy={24} r={4} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </SoftCircleMark>
  );
}

function Help(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={14} spec="M16 16c3.5-3.5 9-4 13.5-1">
      <path
        data-soft-layer="glyph"
        d="M20 20c0-2.4 1.8-4 4-4s4 1.7 4 4c0 2.4-2 3.2-4 4v2.5"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={24} cy={32} r={1.7} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </SoftCircleMark>
  );
}

function Alert(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={14} spec="M16 16c3.5-3.5 9-4 13.5-1">
      <rect x={22.2} y={16} width={3.6} height={11} rx={1.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <circle cx={24} cy={32} r={1.8} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </SoftCircleMark>
  );
}

function Warning(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M24 10l14 24H10L24 10Z"
      spec="M18 28h10"
    >
      <rect x={22.4} y={20} width={3.2} height={8} rx={1.5} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <circle cx={24} cy={31.5} r={1.6} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Ban(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={13.5} spec="M16 16c3.5-3.5 9-4 13.5-1">
      <path
        data-soft-layer="glyph"
        d="M15 33L33 15"
        stroke={`url(#${uid}-core)`}
        strokeWidth={3.2}
        strokeLinecap="round"
      />
    </SoftCircleMark>
  );
}

function Sparkles(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M24 11l2.2 6 6 2.2-6 2.2L24 27.4l-2.2-6-6-2.2 6-2.2L24 11Z"
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1.1 1.3)"
        />
        <path
          data-soft-layer="face"
          d="M24 11l2.2 6 6 2.2-6 2.2L24 27.4l-2.2-6-6-2.2 6-2.2L24 11Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <path
          data-soft-layer="face"
          d="M34 26l1.2 3.2 3.2 1.2-3.2 1.2L34 34.8l-1.2-3.2-3.2-1.2 3.2-1.2L34 26Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1}
          opacity={0.85}
        />
        <path
          data-soft-layer="face"
          d="M14 28l1 2.6 2.6 1-2.6 1L14 35.2l-1-2.6-2.6-1 2.6-1L14 28Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1}
          opacity={0.75}
        />
      </g>
    </Frame>
  );
}

function Rocket(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M24 9c5 4.2 7.5 10.2 7.5 16.5l-3.5 1.8-4-9.5-4 9.5-3.5-1.8C16.5 19.2 19 13.2 24 9Z"
      spec="M20 16c1.8-2.5 5.5-3 8.5-1"
    >
      <circle cx={24} cy={20} r={2.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <path
        data-soft-layer="glyph"
        d="M19.5 30c-1.5 1.5-2.5 3.5-2.5 3.5s2.2-.6 3.6-2M28.5 30c1.5 1.5 2.5 3.5 2.5 3.5s-2.2-.6-3.6-2"
        stroke={`url(#${uid}-core)`}
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />
    </SoftMark>
  );
}

function Zap(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M28 9L15 25.5h8.5L19.5 39 35 21.5h-8.5L28 9Z"
      spec="M20 18h8"
    />
  );
}

function Layers(p) {
  const { uid, ...frame } = p;
  // Three filled diamonds — consistent spacing / perspective / SoftMark weight
  const layers = [
    { d: "M24 22.5l12.5 6.2-12.5 6.2-12.5-6.2L24 22.5Z", opacity: 0.58 },
    { d: "M24 16.5l12.5 6.2-12.5 6.2-12.5-6.2L24 16.5Z", opacity: 0.74 },
    { d: "M24 10.5l12.5 6.2-12.5 6.2-12.5-6.2L24 10.5Z", opacity: 1 },
  ];
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {layers.map((layer, i) => (
          <g key={i}>
            <path
              data-soft-layer="extrude"
              d={layer.d}
              fill={`url(#${uid}-body)`}
              opacity={0.38}
              transform="translate(1.1 1.3)"
            />
            <path
              data-soft-layer="face"
              d={layer.d}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1.1}
              opacity={layer.opacity}
            />
          </g>
        ))}
        <Spec uid={uid} d="M16 14.5l8-4 8 4" opacity={0.5} />
      </g>
    </Frame>
  );
}

function Code(p) {
  return <SoftStrokeMark {...p} width={3.3} paths={["M19 15l-7 9 7 9M29 15l7 9-7 9M27 13.5l-5.5 21"]} />;
}

function Terminal(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      d="M9 11h30a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4Z"
      spec="M13 15h18"
    >
      <path
        data-soft-layer="glyph"
        d="M14 20l6.5 5-6.5 5M23 30h10"
        stroke={CX_CUT}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SoftMark>
  );
}

function Support(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="face"
          d="M15 24.5a9 9 0 0 1 18 0"
          fill="none"
          stroke={`url(#${uid}-face)`}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
        <rect data-soft-layer="extrude" x={13.5} y={25} width={6} height={10} rx={2.5} fill={`url(#${uid}-body)`} opacity={0.45} />
        <rect
          data-soft-layer="face"
          x={12}
          y={23.5}
          width={6}
          height={10}
          rx={2.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <rect data-soft-layer="extrude" x={30.5} y={25} width={6} height={10} rx={2.5} fill={`url(#${uid}-body)`} opacity={0.45} />
        <rect
          data-soft-layer="face"
          x={29}
          y={23.5}
          width={6}
          height={10}
          rx={2.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
      </g>
    </Frame>
  );
}

function Book(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M11 12h12v26H13a2.5 2.5 0 0 1-2.5-2.5V12Z"
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1 1.3)"
        />
        <path
          data-soft-layer="face"
          d="M10 10.5h12v26H12.5A2.5 2.5 0 0 1 10 34V10.5Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <path
          data-soft-layer="face"
          d="M26 10.5h12V34a2.5 2.5 0 0 1-2.5 2.5H26V10.5Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
          opacity={0.8}
        />
        <path data-soft-layer="glyph" d="M24 10.5v26" stroke={`url(#${uid}-core)`} strokeWidth={2.2} />
      </g>
    </Frame>
  );
}

function Power(p) {
  // Single path + absolute arc so stem sits in the open gap center
  return <SoftStrokeMark {...p} width={3.6} d="M24 11.5v13M31.8 18.5A9.8 9.8 0 1 1 16.2 18.5" />;
}

/** Keys with dedicated SoftMark bare bodies (TileMark counterparts). */
export const FROSTED_BARE_ICON_MAP = {
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
  copy: Copy,
  save: Save,
  download: Download,
  upload: Upload,
  refresh: Refresh,
  externalLink: ExternalLink,
  chevronRight: (p) => Chevron("right", p),
  chevronLeft: (p) => Chevron("left", p),
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
  phone: Phone,
  link: Link,
  share: Share,
  at: At,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  pieChart: PieChart,
  activity: Activity,
  report: Report,
  creditCard: CreditCard,
  dollar: Dollar,
  cart: Cart,
  receipt: Receipt,
  package: Package,
  calendar: Calendar,
  clock: Clock,
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

/**
 * Original Soft Complex shaped SoftMarks — already Bare language.
 * Bare mode reuses tiled bodies with plate/shadow off (no separate artwork).
 */
export const FROSTED_SHAPED_BARE_KEYS = [
  "home",
  "trash",
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "arrowDown",
  "user",
  "chat",
  "bell",
  "chart",
  "wallet",
  "folder",
  "info",
];
