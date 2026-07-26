/**
 * Soft UI icon languages — line set only (isolated review branch).
 */

export const ICON_STYLE_GROUPS = [{ id: "line", label: "Line & fill", hint: "UI chrome weights — toolbars, nav, dense controls" }];

export const ICON_STYLES = [
{
    id: "soft-stroke",
    group: "line",
    name: "Soft Stroke",
    tagline: "Rounded 1.75 stroke — airy glass chrome",
    fit: "Closest to frosted UI outlines and soft buttons.",
    mode: "stroke",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 1,
  },
  {
    id: "soft-fill",
    group: "line",
    name: "Soft Fill",
    tagline: "Solid glyphs with gentle mass",
    fit: "Reads clearly in rings, nav rails, and dense toolbars.",
    mode: "fill",
    opacity: 1,
  },
  {
    id: "glass-duotone",
    group: "line",
    name: "Glass Duotone",
    tagline: "Soft fill wash + crisp stroke rim",
    fit: "Matches sheen / glass rings — brand-forward moments.",
    mode: "duotone",
    strokeWidth: 1.55,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    underlay: { opacity: 0.28 },
  },
  {
    id: "clay-bold",
    group: "line",
    name: "Clay Bold",
    tagline: "Chunky 2.35 rounded stroke",
    fit: "Soft / neumorphic weight — friendly SaaS samples.",
    mode: "stroke",
    strokeWidth: 2.35,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 1,
  },
  {
    id: "crystal-line",
    group: "line",
    name: "Crystal Line",
    tagline: "Hairline 1.25 geometric stroke",
    fit: "Crystal / dusk themes — precise, quieter chrome.",
    mode: "stroke",
    strokeWidth: 1.25,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: 0.92,
  },
];

export function getIconStyle(id) {
  return ICON_STYLES.find((s) => s.id === id) || ICON_STYLES[0];
}

export function stylesInGroup(groupId) {
  return ICON_STYLES.filter((s) => s.group === groupId);
}
