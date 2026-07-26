/**
 * Five from-scratch Soft UI icon languages for side-by-side evaluation.
 * Each style shares the same handmade glyph set with different paint rules.
 */

export const ICON_STYLES = [
  {
    id: "soft-stroke",
    name: "Soft Stroke",
    tagline: "Rounded 1.75 stroke — airy glass chrome",
    fit: "Closest to frosted UI outlines and soft buttons.",
    mode: "stroke",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 1,
    underlay: null,
  },
  {
    id: "soft-fill",
    name: "Soft Fill",
    tagline: "Solid glyphs with gentle mass",
    fit: "Reads clearly in rings, nav rails, and dense toolbars.",
    mode: "fill",
    strokeWidth: 0,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 1,
    underlay: null,
  },
  {
    id: "glass-duotone",
    name: "Glass Duotone",
    tagline: "Soft fill wash + crisp stroke rim",
    fit: "Matches sheen / glass rings — brand-forward moments.",
    mode: "duotone",
    strokeWidth: 1.55,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 1,
    underlay: { opacity: 0.28, useFill: true },
  },
  {
    id: "clay-bold",
    name: "Clay Bold",
    tagline: "Chunky 2.35 rounded stroke",
    fit: "Soft / neumorphic weight — friendly SaaS samples.",
    mode: "stroke",
    strokeWidth: 2.35,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 1,
    underlay: null,
  },
  {
    id: "crystal-line",
    name: "Crystal Line",
    tagline: "Hairline 1.25 geometric stroke",
    fit: "Crystal / dusk themes — precise, quieter chrome.",
    mode: "stroke",
    strokeWidth: 1.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 0.92,
    underlay: null,
  },
];

export function getIconStyle(id) {
  return ICON_STYLES.find((s) => s.id === id) || ICON_STYLES[0];
}
