import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = "https://dev-muhammad-junaid.github.io/soft-ui-kit";
const OUT = join(process.cwd(), "docs/preview");

mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "01-landing", path: "/", wait: 1200 },
  { name: "02-catalog", path: "/catalog", wait: 1500 },
  { name: "03-charts", path: "/charts", wait: 1800 },
  { name: "04-saas-autumn", path: "/saas/autumn", wait: 1800 },
  { name: "05-effects", path: "/effects", wait: 2000 },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1.25,
});

for (const shot of shots) {
  await page.goto(`${BASE}${shot.path}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(shot.wait);
  const file = join(OUT, `${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log("saved", file);
}

// Taste panel open on catalog for GIF frame
await page.goto(`${BASE}/catalog`, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);
await page.getByRole("button", { name: /taste playground/i }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: join(OUT, "06-taste.png"), fullPage: false });
console.log("saved taste");

// Theme dusk for variety
await page.keyboard.down("Shift");
await page.keyboard.press("Digit4");
await page.keyboard.up("Shift");
await page.waitForTimeout(800);
await page.screenshot({ path: join(OUT, "07-dusk.png"), fullPage: false });
console.log("saved dusk");

await browser.close();
console.log("done");
