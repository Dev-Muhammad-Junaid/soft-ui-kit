import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  FROSTED_ICON_KEYS,
  FROSTED_STANDARDS,
  FROSTED_VERSIONS,
} from "../src/components/icons/soft/frostedRegistry";
import {
  FROSTED_BARE_ICON_MAP,
  FROSTED_SHAPED_BARE_KEYS,
} from "../src/components/icons/soft/frostedBareIcons";
import {
  FROSTED_ICON_MAP,
  renderFrostedIcon,
} from "../src/components/icons/soft/frostedIcons";

function renderIcon(name, version) {
  const node = renderFrostedIcon(name, {
    uid: `t-${name}-${version}`,
    size: 48,
    plate: version !== "bare",
    version,
    title: name,
  });
  expect(node, `${name}/${version} should render`).toBeTruthy();
  return renderToStaticMarkup(node);
}

describe("frosted icon registry", () => {
  it("maps every registry key for tiled Soft Complex", () => {
    const missing = FROSTED_ICON_KEYS.filter((k) => !FROSTED_ICON_MAP[k]);
    expect(missing).toEqual([]);
  });

  it("covers every key in bare SoftMark language", () => {
    const missing = FROSTED_ICON_KEYS.filter(
      (k) => !FROSTED_BARE_ICON_MAP[k] && !FROSTED_SHAPED_BARE_KEYS.includes(k)
    );
    expect(missing).toEqual([]);
  });
});

describe.each(FROSTED_ICON_KEYS)("frosted icon %s", (name) => {
  it.each(FROSTED_VERSIONS)("renders %s", (version) => {
    const html = renderIcon(name, version);
    expect(html).toContain(`data-soft-plate="${version}"`);
    expect(html).toContain('viewBox="0 0 48 48"');
  });

  it("bare uses SoftMark glass body (not hollow plate-off glyphs alone)", () => {
    const bare = renderIcon(name, "bare");
    const hasGlassBody =
      bare.includes('data-soft-layer="face"') || bare.includes('data-soft-layer="extrude"');
    expect(hasGlassBody, `${name} bare should have SoftMark face/extrude`).toBe(true);
    // TileMark plate chrome is a GlassTile extrude rect pair — bare SoftMarks should not
    // be the tiny tiled glyph-only markup without a body layer.
    expect(bare).toContain('data-soft-plate="bare"');
  });
});

describe("frosted standards export", () => {
  it("encodes Bare lab language rules", () => {
    expect(FROSTED_STANDARDS.viewBox).toBe("0 0 48 48");
    expect(FROSTED_STANDARDS.tile).toMatchObject({ x: 9, y: 9, w: 30, h: 30 });
    expect(FROSTED_VERSIONS[0]).toBe("bare");
    expect(
      FROSTED_STANDARDS.checklist.some((c) => /Lab reviews Bare SoftMark only/i.test(c))
    ).toBe(true);
    expect(
      FROSTED_STANDARDS.checklist.some((c) => /not plate-off TileMarks/i.test(c))
    ).toBe(true);
    expect(
      FROSTED_STANDARDS.checklist.some((c) => /No raw hex fills/i.test(c))
    ).toBe(true);
    expect(
      FROSTED_STANDARDS.checklist.some((c) => /Do not merge this catalog into main/i.test(c))
    ).toBe(true);
  });
});

/** Strip CSS var() including nested fallbacks so only true hardcoded hex remain. */
function stripCssVars(html) {
  let prev;
  let out = html;
  do {
    prev = out;
    out = out.replace(/var\((?:[^()]|\([^()]*\))*\)/g, "");
  } while (out !== prev);
  return out;
}

describe.each(FROSTED_ICON_KEYS)("frosted theme paints %s", (name) => {
  it.each(FROSTED_VERSIONS)("%s has no raw hex fills/strokes", (version) => {
    const html = renderIcon(name, version);
    const raw = stripCssVars(html).match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    expect(raw, `${name}/${version} raw hex: ${raw.join(", ")}`).toEqual([]);
  });

  it("binds glass fills to theme gradients / soft-cx tokens", () => {
    const tiled = renderIcon(name, "tiled");
    const bare = renderIcon(name, "bare");
    for (const [version, html] of [
      ["tiled", tiled],
      ["bare", bare],
    ]) {
      const hasThemePaint =
        html.includes("-core") ||
        html.includes("-face") ||
        html.includes("--soft-cx-") ||
        html.includes("currentColor");
      expect(hasThemePaint, `${name}/${version} missing theme paint`).toBe(true);
    }
  });
});
