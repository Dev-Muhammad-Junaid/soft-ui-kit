/**
 * Taste dials — Core UI (kit chrome) then Effects (glass rings + border-beam).
 * Keep in sync with /ui, /charts, and /effects demos.
 */
export const TWEAK_GROUPS = [
  {
    id: "layout",
    tier: "core",
    title: "Layout",
    hint: "Corner radius across cards, buttons, inputs, and panels",
    controls: [
      {
        key: "radiusScale",
        label: "Border radius",
        min: 0,
        max: 1.4,
        step: 0.05,
        tip: "0 = sharp · 1 = default · higher = softer",
      },
    ],
  },
  {
    id: "glass",
    tier: "core",
    title: "Glass",
    hint: "Frost on cards, sheets, sidebar, and glass panels",
    controls: [
      { key: "glassBlur", label: "Blur", min: 4, max: 40, step: 1, tip: "How frosted glass surfaces look" },
      { key: "glassOpacity", label: "Opacity", min: 0.15, max: 0.9, step: 0.01, tip: "Transparency of glass fills" },
      { key: "glassSaturation", label: "Saturation", min: 0.8, max: 2, step: 0.05, tip: "Color punch through the frost" },
      {
        key: "rimStrength",
        label: "Rim highlight",
        min: 0.2,
        max: 1,
        step: 0.01,
        tip: "Bright edge on glass borders",
      },
    ],
  },
  {
    id: "color",
    tier: "core",
    title: "Color",
    hint: "Accent used for buttons, focus rings, and highlights",
    controls: [
      {
        key: "accentHue",
        label: "Accent hue",
        min: 0,
        max: 360,
        step: 1,
        tip: "Primary brand tint for the kit",
      },
    ],
  },
  {
    id: "depth",
    tier: "core",
    title: "Depth & motion",
    hint: "Shadows, elevation, and how lively the UI feels",
    controls: [
      {
        key: "shadowIntensity",
        label: "Shadow",
        min: 0.2,
        max: 1.8,
        step: 0.05,
        tip: "Depth of cards and floating panels",
      },
      {
        key: "surfaceLift",
        label: "Surface lift",
        min: 0.4,
        max: 1.6,
        step: 0.05,
        tip: "Baseline elevation of surfaces",
      },
      {
        key: "hoverLift",
        label: "Hover lift",
        min: 0,
        max: 1.2,
        step: 0.05,
        tip: "How much cards rise on hover",
      },
      {
        key: "motionStrength",
        label: "Motion",
        min: 0,
        max: 1.5,
        step: 0.05,
        tip: "Chart draw-in and UI animation strength",
      },
    ],
  },
  {
    id: "rings",
    tier: "effects",
    title: "Glass ring badges",
    hint: "Shown on the Effects page — brand marks & KPI icons",
    controls: [
      { key: "ringShine", label: "Shine", min: 0, max: 1.5, step: 0.01, tip: "Spinning highlight on the ring" },
      { key: "ringThickness", label: "Thickness", min: 1, max: 6, step: 0.1, tip: "Ring stroke width" },
      { key: "ringSpread", label: "Spread", min: 2, max: 14, step: 0.5, tip: "Gap to the outer glow" },
      { key: "ringGlow", label: "Glow", min: 0, max: 1.2, step: 0.01, tip: "Soft halo around the ring" },
    ],
  },
];

export const BORDER_BEAM_OPTIONS = [
  { id: "off", label: "Off" },
  { id: "md", label: "Travel" },
  { id: "sm", label: "Compact" },
  { id: "line", label: "Line" },
  { id: "pulse-inner", label: "Pulse" },
  { id: "pulse-outside", label: "Halo" },
];

export const BORDER_BEAM_COLORS = [
  { id: "ocean", label: "Ocean" },
  { id: "sunset", label: "Sunset" },
  { id: "colorful", label: "Rainbow" },
  { id: "mono", label: "Mono" },
];

export const DEFAULT_EFFECTS = {
  borderBeam: "off",
  borderBeamColor: "ocean",
};

/** Flat list of slider controls. */
export const TWEAK_CONTROLS = TWEAK_GROUPS.flatMap((g) => g.controls);
