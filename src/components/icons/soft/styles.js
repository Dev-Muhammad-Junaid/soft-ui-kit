/**
 * Soft UI icon languages — chrome set only (isolated review branch).
 */

export const ICON_STYLE_GROUPS = [{ id: "chrome", label: "Chrome neon", hint: "Chrome Color Icons — Neon Reflections (kit-friendly SVG reads)" }];

export const ICON_STYLES = [
{
    id: "chrome-neon",
    group: "chrome",
    name: "Chrome Neon",
    tagline: "Liquid metal body + cyan→magenta sheen",
    fit: "Closest SVG read of the polished chrome + neon reflection boards.",
    mode: "chrome-neon",
    glow: 0.55,
  },
  {
    id: "neon-rim",
    group: "chrome",
    name: "Neon Rim",
    tagline: "Cool top / warm bottom rim light",
    fit: "Split lighting like the basketball & rocket — accent + magenta rim.",
    mode: "neon-rim",
    strokeWidth: 2.1,
    glow: 0.45,
  },
  {
    id: "liquid-metal",
    group: "chrome",
    name: "Liquid Metal",
    tagline: "Brushed radial chrome with specular catch",
    fit: "Speech-bubble style radial metal — works on dusk / midnight.",
    mode: "liquid-metal",
    glow: 0.35,
  },
  {
    id: "iridescent",
    group: "chrome",
    name: "Iridescent",
    tagline: "Diagonal neon gradient face",
    fit: "Lightning-bolt energy — accent through pink iridescence.",
    mode: "iridescent",
    glow: 0.5,
  },
  {
    id: "halo-chrome",
    group: "chrome",
    name: "Halo Chrome",
    tagline: "Chrome glyph in a soft neon aura",
    fit: "Hero / empty-state marks — pops on dark themes.",
    mode: "halo-chrome",
    glow: 0.65,
  },
];

export function getIconStyle(id) {
  return ICON_STYLES.find((s) => s.id === id) || ICON_STYLES[0];
}

export function stylesInGroup(groupId) {
  return ICON_STYLES.filter((s) => s.group === groupId);
}
