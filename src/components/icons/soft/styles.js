/**
 * Soft UI icon languages — glass set only (isolated review branch).
 */

export const ICON_STYLE_GROUPS = [{ id: "glass", label: "Glass & depth", hint: "Frosted / soft-3D language inspired by your glass icon refs" }];

export const ICON_STYLES = [
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
