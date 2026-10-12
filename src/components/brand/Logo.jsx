import { useId } from "react";

/**
 * Soft UI Kit brand mark — a glass pebble holding two soft switches (off / on).
 * Mirrors docs/brand/logo.svg; ids are scoped per instance so several marks can share a page.
 */
export function Logo({ size = 40, title = "Soft UI Kit", className }) {
  const uid = useId().replace(/:/g, "");
  const fill = `suk-fill-${uid}`;
  const sheen = `suk-sheen-${uid}`;
  const glow = `suk-glow-${uid}`;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={fill} x1="8" y1="6" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7dd3fc" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id={sheen} x1="32" y1="4" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={glow}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(50 52) rotate(90) scale(22)"
        >
          <stop offset="0" stopColor="#f0abfc" stopOpacity="0.6" />
          <stop offset="1" stopColor="#f0abfc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="19" fill={`url(#${fill})`} />
      <rect x="4" y="4" width="56" height="56" rx="19" fill={`url(#${glow})`} />
      <rect x="5.5" y="5.5" width="53" height="28" rx="17.5" fill={`url(#${sheen})`} />
      <rect
        x="4.75"
        y="4.75"
        width="54.5"
        height="54.5"
        rx="18.25"
        stroke="#fff"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <rect x="13" y="14" width="38" height="16" rx="8" fill="#fff" fillOpacity="0.3" stroke="#fff" strokeOpacity="0.55" />
      <circle cx="21" cy="23" r="7" fill="#0f172a" fillOpacity="0.14" />
      <circle cx="21" cy="22" r="7" fill="#fff" />
      <rect x="13" y="34" width="38" height="16" rx="8" fill="#fff" />
      <circle cx="43" cy="43" r="6.5" fill="#0f172a" fillOpacity="0.12" />
      <circle cx="43" cy="42" r="6" fill={`url(#${fill})`} />
    </svg>
  );
}
