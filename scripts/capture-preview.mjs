import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

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

await page.goto(`${BASE}/catalog`, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);
await page.getByRole("button", { name: /taste playground/i }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: join(OUT, "06-taste.png"), fullPage: false });
console.log("saved taste");

await page.keyboard.down("Shift");
await page.keyboard.press("Digit4");
await page.keyboard.up("Shift");
await page.waitForTimeout(800);
await page.screenshot({ path: join(OUT, "07-dusk.png"), fullPage: false });
console.log("saved dusk");

await browser.close();

const frames = [
  "01-landing",
  "02-catalog",
  "03-charts",
  "04-saas-autumn",
  "05-effects",
  "06-taste",
  "07-dusk",
];

for (const name of frames) {
  spawnSync(
    "ffmpeg",
    ["-y", "-i", `${name}.png`, "-vf", "scale=800:-1", `${name}-sm.jpg", "-q:v", "4"],
    { cwd: OUT, stdio: "inherit" },
  );
}

const gifArgs = [];
for (const name of frames) {
  const duration = name === "06-taste" ? "2.0" : "1.6";
  gifArgs.push("-loop", "1", "-t", duration, "-i", `${name}.png`);
}
gifArgs.push(
  "-filter_complex",
  "[0:v][1:v][2:v][3:v][4:v][5:v][6:v]concat=n=7:v=1:a=0,scale=960:-1:flags=lanczos,fps=8,split[s0][s1];[s0]palettegen=max_colors=160:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=4",
  "preview.gif",
);
spawnSync("ffmpeg", ["-y", ...gifArgs], { cwd: OUT, stdio: "inherit" });
console.log("wrote preview.gif + *-sm.jpg");
