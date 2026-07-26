/**
 * Soft Complex SVG library — chrome neon scenes + glass bridge to frosted set.
 * Frosted isometric tiles live in frostedIcons.jsx (full SaaS vocabulary).
 */

import {
  ChromeDefs,
  ChromeShell,
  SoftSvg,
} from "./primitives";
import { FROSTED_ICON_KEYS } from "./frostedRegistry";
import { renderFrostedIcon } from "./frostedIcons";

/** Chrome subset keys; full SaaS glass set is FROSTED_ICON_KEYS */
export const COMPLEX_ICON_KEYS = FROSTED_ICON_KEYS;

function ChromeFrame({ uid, size, className, title, style, children, ...props }) {
  return (
    <SoftSvg
      size={size}
      className={className}
      title={title}
      style={style}
      data-soft-material="chrome"
      {...props}
    >
      <ChromeDefs uid={uid} />
      {children}
    </SoftSvg>
  );
}

/* ───────── Chrome neon scene icons ───────── */

function ChromeSearch({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <circle cx={20} cy={20} r={11} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <circle
          cx={20}
          cy={20}
          r={11}
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={1.4}
          data-soft-layer="glow"
        />
        <circle cx={20} cy={20} r={5.8} fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={2.6} data-soft-layer="glyph" />
        <path
          d="M28.4 28.4L37 37"
          stroke={`url(#${uid}-metal)`}
          strokeWidth={3.6}
          strokeLinecap="round"
          data-soft-layer="glyph"
        />
        <ellipse cx={16.5} cy={15.5} rx={4.5} ry={2.2} fill="#fff" opacity={0.35} data-soft-layer="specular" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeCheck({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <circle cx={24} cy={24} r={14.5} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <circle cx={24} cy={24} r={14.5} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth={1.5} data-soft-layer="glow" />
        <path
          data-soft-layer="glyph"
          d="M15.5 24.5l5.2 5.2L33 17"
          stroke={`url(#${uid}-metal)`}
          strokeWidth={3.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <ellipse cx={18} cy={17} rx={5} ry={2.4} fill="#fff" opacity={0.3} data-soft-layer="specular" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeClose({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <rect x={10} y={10} width={28} height={28} rx={9} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <rect
          x={10}
          y={10}
          width={28}
          height={28}
          rx={9}
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={1.4}
          data-soft-layer="glow"
        />
        <g data-soft-layer="glyph" stroke={`url(#${uid}-metal)`} strokeWidth={3.4} strokeLinecap="round">
          <path d="M17.5 17.5l13 13M30.5 17.5l-13 13" />
        </g>
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeBell({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <path
          data-soft-layer="face"
          d="M14 19a10 10 0 0 1 20 0c0 5.8 2 8 3 9.4a1.5 1.5 0 0 1-1.2 2.4H12.2a1.5 1.5 0 0 1-1.2-2.4C12 27 14 24.8 14 19Z"
          fill={`url(#${uid}-metal)`}
        />
        <path
          data-soft-layer="glow"
          d="M14 19a10 10 0 0 1 20 0c0 5.8 2 8 3 9.4a1.5 1.5 0 0 1-1.2 2.4H12.2a1.5 1.5 0 0 1-1.2-2.4C12 27 14 24.8 14 19Z"
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={1.3}
        />
        <path
          data-soft-layer="glyph"
          d="M21 34.5a3.2 3.2 0 0 0 6.4 0"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={2.6}
          strokeLinecap="round"
        />
        {/* sound waves */}
        <path
          data-soft-layer="glow"
          d="M35 18c2 2.2 2 6.8 0 9M38.5 15.5c3.2 3.4 3.2 11 0 14.5"
          stroke="#67e8f9"
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.85}
        />
        <ellipse cx={20} cy={16} rx={5} ry={2} fill="#fff" opacity={0.28} data-soft-layer="specular" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeSparkles({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <path
          data-soft-layer="face"
          d="M24 8l2.8 8.4L35.2 19.2l-8.4 2.8L24 30.4l-2.8-8.4L12.8 19.2l8.4-2.8L24 8Z"
          fill={`url(#${uid}-metal)`}
        />
        <path
          data-soft-layer="glow"
          d="M24 8l2.8 8.4L35.2 19.2l-8.4 2.8L24 30.4l-2.8-8.4L12.8 19.2l8.4-2.8L24 8Z"
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={1.2}
        />
        <path
          data-soft-layer="glyph"
          d="M36 28l1.3 3.6 3.6 1.3-3.6 1.3L36 37.8l-1.3-3.6-3.6-1.3 3.6-1.3L36 28Z"
          fill={`url(#${uid}-metal)`}
        />
        <path
          data-soft-layer="glyph"
          d="M11 30l1 2.8 2.8 1-2.8 1L11 37.6l-1-2.8-2.8-1 2.8-1L11 30Z"
          fill={`url(#${uid}-edge)`}
        />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeChart({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid} withHalo={false}>
        <ellipse cx={24} cy={40} rx={14} ry={3} fill={`url(#${uid}-glow)`} data-soft-layer="shadow" />
        {[
          { x: 11, h: 14, y: 24 },
          { x: 20.5, h: 22, y: 16 },
          { x: 30, h: 18, y: 20 },
        ].map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.y}
              width={7}
              height={b.h}
              rx={2.4}
              fill={i === 1 ? `url(#${uid}-metal)` : `url(#${uid}-sphere)`}
              data-soft-layer="face"
            />
            <rect
              x={b.x}
              y={b.y}
              width={7}
              height={b.h}
              rx={2.4}
              fill="none"
              stroke={`url(#${uid}-edge)`}
              strokeWidth={1}
              data-soft-layer="glow"
            />
          </g>
        ))}
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeCalendar({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <rect x={10} y={12} width={28} height={26} rx={7} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <rect x={10} y={12} width={28} height={9} rx={7} fill={`url(#${uid}-metal)`} data-soft-layer="glyph" />
        <rect x={10} y={17} width={28} height={4} fill={`url(#${uid}-metal)`} />
        {[17, 24, 31].map((x) => (
          <rect key={x} x={x - 1.4} y={8} width={2.8} height={7.5} rx={1.4} fill={`url(#${uid}-edge)`} data-soft-layer="glow" />
        ))}
        <path
          data-soft-layer="glyph"
          d="M18 28.5l4 4 9-9.5"
          stroke="#67e8f9"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeFolder({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <path
          data-soft-layer="face"
          d="M9 17h9.5l2.4 2.5H38a3.5 3.5 0 0 1 3.5 3.5v14A3.5 3.5 0 0 1 38 40.5H12A3.5 3.5 0 0 1 8.5 37V17Z"
          fill={`url(#${uid}-metal)`}
        />
        <path
          data-soft-layer="glow"
          d="M9 17h9.5l2.4 2.5H38a3.5 3.5 0 0 1 3.5 3.5v14A3.5 3.5 0 0 1 38 40.5H12A3.5 3.5 0 0 1 8.5 37V17Z"
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={1.3}
        />
        <ellipse cx={18} cy={22} rx={6} ry={2.2} fill="#fff" opacity={0.25} data-soft-layer="specular" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeSettings({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <rect x={10} y={11} width={28} height={26} rx={8} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <rect x={10} y={11} width={28} height={9} rx={8} fill={`url(#${uid}-metal)`} data-soft-layer="glyph" />
        <rect x={10} y={16} width={28} height={4} fill={`url(#${uid}-metal)`} />
        {[17, 24, 31].map((x) => (
          <rect key={x} x={x - 1.4} y={7.5} width={2.8} height={7} rx={1.4} fill={`url(#${uid}-edge)`} data-soft-layer="glow" />
        ))}
        <g data-soft-layer="glyph" transform="translate(24 28.5)">
          <circle r={5.6} fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={2.8} />
          <circle r={2.2} fill={`url(#${uid}-edge)`} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x={-1.4}
              y={-8.4}
              width={2.8}
              height={3.6}
              rx={1.2}
              fill={`url(#${uid}-metal)`}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
        <rect x={10} y={11} width={28} height={26} rx={8} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth={1.2} data-soft-layer="glow" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromePlus({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <circle cx={24} cy={24} r={14} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <circle cx={24} cy={24} r={14} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth={1.4} data-soft-layer="glow" />
        <g data-soft-layer="glyph" stroke={`url(#${uid}-metal)`} strokeWidth={3.6} strokeLinecap="round">
          <path d="M24 15.5v17M15.5 24h17" />
        </g>
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeHome({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <path
          data-soft-layer="face"
          d="M10 23L24 10l14 13v13.5A3.5 3.5 0 0 1 34.5 40h-21A3.5 3.5 0 0 1 10 36.5V23Z"
          fill={`url(#${uid}-metal)`}
        />
        <path
          data-soft-layer="glow"
          d="M10 23L24 10l14 13v13.5A3.5 3.5 0 0 1 34.5 40h-21A3.5 3.5 0 0 1 10 36.5V23Z"
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={1.3}
        />
        <rect x={20} y={26} width={8} height={11} rx={2} fill={`url(#${uid}-sphere)`} data-soft-layer="glyph" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeMail({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <rect x={8} y={14} width={32} height={22} rx={7} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <rect
          x={8}
          y={14}
          width={32}
          height={22}
          rx={7}
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={1.3}
          data-soft-layer="glow"
        />
        <path
          data-soft-layer="glyph"
          d="M11.5 19.5l12.5 9 12.5-9"
          stroke={`url(#${uid}-metal)`}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeUser({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <circle cx={24} cy={16.5} r={7.6} fill={`url(#${uid}-metal)`} data-soft-layer="face" />
        <path
          d="M11 37c2-6.8 6-10 13-10s11 3.2 13 10"
          fill={`url(#${uid}-sphere)`}
          data-soft-layer="face"
        />
        <circle cx={24} cy={16.5} r={7.6} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth={1.35} data-soft-layer="glow" />
        <path
          d="M11 37c2-6.8 6-10 13-10s11 3.2 13 10"
          fill="none"
          stroke={`url(#${uid}-edge)`}
          strokeWidth={1.2}
          data-soft-layer="glow"
        />
        <ellipse cx={21} cy={13.5} rx={3.6} ry={1.7} fill="#fff" opacity={0.35} data-soft-layer="specular" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeInfo({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <circle cx={24} cy={24} r={14.5} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <circle cx={24} cy={24} r={14.5} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth={1.4} data-soft-layer="glow" />
        <circle cx={24} cy={16.2} r={2} fill={`url(#${uid}-metal)`} data-soft-layer="glyph" />
        <rect x={22} y={20.5} width={4} height={12.5} rx={2} fill={`url(#${uid}-metal)`} data-soft-layer="glyph" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeArrowRight({ uid, ...frame }) {
  const face =
    "M8.5 19.5h16.5l-5.2-7.2h7.2L39 24 26.9 35.7h-7.2l5.2-7.2H8.5a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Z";
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <path data-soft-layer="face" d={face} fill={`url(#${uid}-metal)`} />
        <path data-soft-layer="glow" d={face} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth={1.35} />
        <path
          data-soft-layer="specular"
          d="M12 18.8h13l3.5-5"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
          opacity={0.4}
        />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeWallet({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <path
          data-soft-layer="face"
          d="M10 15.5l3-4.4A3.8 3.8 0 0 1 16.2 9.5h14A3.8 3.8 0 0 1 33.4 11.2l3 4.3"
          fill={`url(#${uid}-metal)`}
        />
        <rect x={8} y={15} width={32} height={19} rx={6.5} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        <rect x={8} y={15} width={32} height={19} rx={6.5} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth={1.3} data-soft-layer="glow" />
        <rect x={27.5} y={19.5} width={10} height={9} rx={3} fill={`url(#${uid}-metal)`} data-soft-layer="glyph" />
        <circle cx={32.5} cy={24} r={1.8} fill="#0f172a" data-soft-layer="glyph" />
        <ellipse cx={16} cy={19} rx={5} ry={1.8} fill="#fff" opacity={0.28} data-soft-layer="specular" />
      </ChromeShell>
    </ChromeFrame>
  );
}

function ChromeGrid({ uid, ...frame }) {
  return (
    <ChromeFrame uid={uid} {...frame}>
      <ChromeShell uid={uid}>
        <rect x={9} y={9} width={30} height={30} rx={9} fill={`url(#${uid}-sphere)`} data-soft-layer="face" />
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={14 + c * 11}
              y={14 + r * 11}
              width={9}
              height={9}
              rx={2.4}
              fill={`url(#${uid}-metal)`}
              data-soft-layer="glyph"
            />
          ))
        )}
        <rect x={9} y={9} width={30} height={30} rx={9} fill="none" stroke={`url(#${uid}-edge)`} strokeWidth={1.2} data-soft-layer="glow" />
      </ChromeShell>
    </ChromeFrame>
  );
}

const CHROME_MAP = {
  search: ChromeSearch,
  check: ChromeCheck,
  close: ChromeClose,
  chart: ChromeChart,
  calendar: ChromeCalendar,
  folder: ChromeFolder,
  settings: ChromeSettings,
  sparkles: ChromeSparkles,
  bell: ChromeBell,
  plus: ChromePlus,
  home: ChromeHome,
  mail: ChromeMail,
  user: ChromeUser,
  info: ChromeInfo,
  arrowRight: ChromeArrowRight,
  wallet: ChromeWallet,
  grid: ChromeGrid,
};

export const CHROME_ICON_KEYS = Object.keys(CHROME_MAP);

export function renderComplexIcon(name, material, props) {
  if (material !== "chrome") {
    return renderFrostedIcon(name, props);
  }
  const Comp = CHROME_MAP[name];
  if (!Comp) {
    // Fall back to frosted when chrome variant isn't authored yet
    return renderFrostedIcon(name, props);
  }
  return <Comp {...props} />;
}
