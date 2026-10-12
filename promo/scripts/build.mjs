#!/usr/bin/env node
/**
 * Builds the HyperFrames projects for the Soft UI Kit promo:
 *   promo/video/landscape  — 1920×1080 (YouTube)
 *   promo/video/vertical   — 1080×1920 (Shorts, Instagram & Facebook Reels)
 *   promo/video/thumbnail  — 1280×720  (YouTube thumbnail still)
 *
 * Usage: node promo/scripts/build.mjs
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadSnippets } from "./ssr.mjs";
import { buildComposition, FORMATS } from "../src/composition.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROMO = resolve(HERE, "..");
const ROOT = resolve(PROMO, "..");
const SHARED = join(PROMO, "assets");

const HF_VERSION = "0.8.149";

function kitCss() {
  const parts = ["tokens.css", "components.css", "shell.css", "layout.css"].map((f) =>
    readFileSync(join(ROOT, "src/styles", f), "utf8"),
  );
  // Fonts ship locally via @font-face — drop the kit's Google Fonts import.
  // Browser-clock motion (CSS transitions/animations) can't be seeked, so
  // strip it: every movement in the promo lives on the GSAP timeline.
  return parts
    .join("\n")
    .replace(/@import url\([^)]*\);?/g, "")
    .replace(/\b(transition|animation)\s*:[^;{}]*;/g, "")
    .replace(/ui-monospace, SFMono-Regular, Menlo, monospace/g, "monospace");
}

// Manrope (SIL OFL 1.1) — vendored from @fontsource-variable/manrope.
const fontFile = () => join(SHARED, "manrope-latin-wght-normal.woff2");

const THUMB_JS = `
  (function () {
    const tl = gsap.timeline({ paused: true });
    window.__timelines["main"] = tl;
  })();
`;

async function main() {
  const snippets = await loadSnippets();
  const css = kitCss();
  const promoCss = readFileSync(join(PROMO, "src/promo.css"), "utf8");
  const timelineJs = readFileSync(join(PROMO, "src/timeline.js"), "utf8");
  const font = fontFile();
  const soundtrack = join(SHARED, "soundtrack.mp3");

  for (const format of Object.keys(FORMATS)) {
    const dir = join(PROMO, "video", format);
    mkdirSync(join(dir, "assets"), { recursive: true });
    copyFileSync(font, join(dir, "assets", "manrope-latin-wght-normal.woff2"));
    // GSAP 3.14.2 (GreenSock standard license), vendored so renders work offline.
    copyFileSync(join(SHARED, "gsap.min.js"), join(dir, "assets", "gsap.min.js"));
    if (format !== "thumbnail") {
      if (!existsSync(soundtrack)) {
        throw new Error("Missing promo/assets/soundtrack.mp3 — run: python3 promo/scripts/soundtrack.py");
      }
      copyFileSync(soundtrack, join(dir, "assets", "soundtrack.mp3"));
    }

    const html = buildComposition({
      format,
      snippets,
      kitCss: css,
      promoCss,
      timelineJs: format === "thumbnail" ? THUMB_JS : timelineJs,
    });
    writeFileSync(join(dir, "index.html"), html);
    writeFileSync(
      join(dir, "package.json"),
      `${JSON.stringify(
        {
          name: `soft-ui-kit-promo-${format}`,
          private: true,
          type: "module",
          scripts: {
            dev: `npx --yes hyperframes@${HF_VERSION} preview`,
            check: `npx --yes hyperframes@${HF_VERSION} check`,
            render: `npx --yes hyperframes@${HF_VERSION} render`,
          },
        },
        null,
        2,
      )}\n`,
    );
    writeFileSync(
      join(dir, "hyperframes.json"),
      `${JSON.stringify(
        {
          $schema: "https://hyperframes.heygen.com/schema/hyperframes.json",
          registry: "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
          paths: { blocks: "compositions", components: "compositions/components", assets: "assets" },
          media: { autoProxy: true },
        },
        null,
        2,
      )}\n`,
    );
    writeFileSync(
      join(dir, "meta.json"),
      `${JSON.stringify({ id: `soft-ui-kit-${format}`, name: `Soft UI Kit — ${format}` }, null, 2)}\n`,
    );
    console.log(`built promo/video/${format}/index.html (${(html.length / 1024).toFixed(0)} KB)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
