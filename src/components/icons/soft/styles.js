/**
 * Soft UI icon languages for side-by-side evaluation.
 * Line set = chrome-weight variants · Glass set ≈ Iconora-style frosted 3D cues (SVG).
 */

export const ICON_STYLE_GROUPS = [
  {
    id: "line",
    label: "Line & fill",
    hint: "UI chrome weights — toolbars, nav, dense controls",
  },
  {
    id: "glass",
    label: "Glass & depth",
    hint: "Frosted / soft-3D language inspired by your glass icon refs",
  },
];

export const ICON_STYLES = [
  // —— Line & fill ——
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

  // —— Glass & depth (ref-inspired) ——
  {
    id: "frost-shell",
    group: "glass",
    name: "Frost Shell",
    tagline: "Translucent plate + solid glyph core",
    fit: "Closest 2D read of the frosted calendar / list tiles in your refs.",
    mode: "frost-shell",
    plateRx: 6.5,
    plateOpacityTop: 0.42,
    plateOpacityBottom: 0.12,
    rimOpacity: 0.55,
    glyphOpacity: 0.95,
  },
  {
    id: "iso-glass",
    group: "glass",
    name: "Iso Glass",
    tagline: "Soft isometric tilt + gradient glass body",
    fit: "Echoes the 3⁄4 frosted slabs without leaving SVG/theme tokens.",
    mode: "iso-glass",
    plateRx: 6,
    plateOpacityTop: 0.5,
    plateOpacityBottom: 0.14,
    rimOpacity: 0.65,
    skewX: -8,
    skewY: 4,
    glyphOpacity: 0.98,
  },
  {
    id: "glow-core",
    group: "glass",
    name: "Glow Core",
    tagline: "Luminous accent core in a soft halo",
    fit: "Matches the glowing blue centers / check discs in the refs.",
    mode: "glow-core",
    haloOpacity: 0.22,
    glyphOpacity: 1,
  },
  {
    id: "acrylic-slab",
    group: "glass",
    name: "Acrylic Slab",
    tagline: "Thick rounded tile with inset mark",
    fit: "Card-like glass blocks — great for KPI / empty-state hero marks.",
    mode: "acrylic-slab",
    plateRx: 7,
    plateOpacityTop: 0.55,
    plateOpacityBottom: 0.18,
    rimOpacity: 0.7,
    insetScale: 0.72,
    glyphOpacity: 1,
  },
  {
    id: "prism-soft",
    group: "glass",
    name: "Prism Soft",
    tagline: "Layered refraction + bright rim catch",
    fit: "Multi-layer glass like the chevrons / X marks — still themeable.",
    mode: "prism-soft",
    plateRx: 6.5,
    plateOpacityTop: 0.35,
    plateOpacityBottom: 0.08,
    rimOpacity: 0.75,
    backOffset: 1.4,
    glyphOpacity: 0.9,
  },
];

export function getIconStyle(id) {
  return ICON_STYLES.find((s) => s.id === id) || ICON_STYLES[0];
}

export function stylesInGroup(groupId) {
  return ICON_STYLES.filter((s) => s.group === groupId);
}
