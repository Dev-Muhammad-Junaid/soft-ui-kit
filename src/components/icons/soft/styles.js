/**
 * Glassy mix-gradient SoftIcon languages — overlapping translucent fills
 * with multiply-style color mixing (bird-logo inspired).
 */

export const ICON_STYLE_GROUPS = [
  {
    id: "glassy-mix",
    label: "Glassy mix",
    hint: "Overlapping translucent gradients that blend where shapes meet",
  },
];

export const ICON_STYLES = [
  {
    id: "triad-mix",
    group: "glassy-mix",
    name: "Triad Mix",
    tagline: "Blue · magenta · amber layers with multiply blend",
    fit: "Closest read of the overlapping bird mark — brand marks & empty states.",
    mode: "glassy-mix",
    layers: [
      { dx: -2.2, dy: 0.4, stops: ["#1d4ed8", "#38bdf8"], opacity: 0.82 },
      { dx: 0.2, dy: -0.2, stops: ["#db2777", "#f472b6"], opacity: 0.78 },
      { dx: 2.4, dy: 0.6, stops: ["#f59e0b", "#fb923c"], opacity: 0.8 },
    ],
  },
  {
    id: "aurora-mix",
    group: "glassy-mix",
    name: "Aurora Mix",
    tagline: "Cyan · violet · rose drift",
    fit: "Softer glass wash — marketing moments and hero chips.",
    mode: "glassy-mix",
    layers: [
      { dx: -1.8, dy: -0.6, stops: ["#0891b2", "#67e8f9"], opacity: 0.75 },
      { dx: 0.4, dy: 0.8, stops: ["#7c3aed", "#c4b5fd"], opacity: 0.72 },
      { dx: 2.0, dy: -0.4, stops: ["#e11d48", "#fb7185"], opacity: 0.7 },
    ],
  },
  {
    id: "duo-mix",
    group: "glassy-mix",
    name: "Duo Mix",
    tagline: "Accent + warm glass double",
    fit: "Taste accent still leads — denser chrome without losing the mix.",
    mode: "glassy-mix",
    layers: [
      { dx: -1.6, dy: 0.2, stops: ["currentColor", "#67e8f9"], opacity: 0.85 },
      { dx: 1.8, dy: 0.4, stops: ["#f472b6", "#fb923c"], opacity: 0.72 },
    ],
  },
  {
    id: "shard-mix",
    group: "glassy-mix",
    name: "Shard Mix",
    tagline: "Wider offsets — sharper glass facets",
    fit: "More separation between layers — reads as cut acrylic.",
    mode: "glassy-mix",
    layers: [
      { dx: -3.0, dy: 0.8, stops: ["#2563eb", "#22d3ee"], opacity: 0.8 },
      { dx: 0, dy: -1.0, stops: ["#c026d3", "#f472b6"], opacity: 0.76 },
      { dx: 3.0, dy: 1.0, stops: ["#ea580c", "#fbbf24"], opacity: 0.78 },
    ],
  },
  {
    id: "bloom-mix",
    group: "glassy-mix",
    name: "Bloom Mix",
    tagline: "Tight stack — deep multiply core",
    fit: "Heavy overlap for a dark glassy core like the bird’s center.",
    mode: "glassy-mix",
    layers: [
      { dx: -1.0, dy: 0.2, stops: ["#1e40af", "#38bdf8"], opacity: 0.88 },
      { dx: 0.4, dy: 0, stops: ["#be185d", "#f9a8d4"], opacity: 0.84 },
      { dx: 1.2, dy: 0.4, stops: ["#c2410c", "#fcd34d"], opacity: 0.82 },
    ],
  },
];

export function getIconStyle(id) {
  return ICON_STYLES.find((s) => s.id === id) || ICON_STYLES[0];
}

export function stylesInGroup(groupId) {
  return ICON_STYLES.filter((s) => s.group === groupId);
}
