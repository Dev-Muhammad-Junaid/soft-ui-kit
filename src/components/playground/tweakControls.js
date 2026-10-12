/**
 * Taste dials — radius, glass, color, and depth shared by every kit surface.
 * Keep in sync with the /ui and /charts demos.
 */
export const TWEAK_GROUPS = [
  {
    id: "layout",
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
];

/** Flat list of slider controls. */
export const TWEAK_CONTROLS = TWEAK_GROUPS.flatMap((g) => g.controls);
