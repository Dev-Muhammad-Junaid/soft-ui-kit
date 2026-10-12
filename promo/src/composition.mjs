/**
 * Assembles one HyperFrames composition (index.html) per output format from
 * server-rendered kit snippets, the kit stylesheet, and the shared timeline.
 */

export const FORMATS = {
  landscape: { width: 1920, height: 1080, stageW: 1280, stageH: 720 },
  vertical: { width: 1080, height: 1920, stageW: 720, stageH: 1280 },
  thumbnail: { width: 1280, height: 720, stageW: 1280, stageH: 720 },
};

export const DURATION = 32.5;

export const THEMES = [
  { id: "soft-glass", name: "Soft Glass", dot: "#38bdf8" },
  { id: "crystal", name: "Crystal", dot: "#22d3ee" },
  { id: "aurora", name: "Aurora", dot: "#c084fc" },
  { id: "dusk", name: "Dusk", dot: "#1e3a5f" },
  { id: "midnight", name: "Midnight", dot: "#f59e0b" },
];

// Rapid-fire chart slides: [chart index, theme, accent hue override or null]
export const CHART_SLIDES = [
  [0, "soft-glass", null],
  [1, "dusk", null],
  [2, "aurora", null],
  [3, "midnight", null],
  [4, "crystal", null],
  [5, "dusk", 330],
  [6, "soft-glass", 262],
  [7, "midnight", 150],
  [8, "soft-glass", 24],
  [9, "aurora", 200],
];

const DASH_NAMES = {
  ops: "Ops",
  autumn: "Autumn Insight",
  travel: "Voyage CRM",
  finance: "Ledger Finance",
  kanban: "Flowboard",
};

const blobs = () =>
  `<div class="bgfx" aria-hidden="true"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><i class="blob b4"></i></div>`;

function themeSwitch(active) {
  const dots = THEMES.map(
    (t, i) =>
      `<span class="tdot${i === active ? " is-on" : ""}" style="--dot:${t.dot}"></span>`,
  ).join("");
  return `<div class="tswitch glass sheen"><div class="tdots">${dots}</div><span class="tname">${THEMES[active].name}</span></div>`;
}

function hueStyle(hue, theme) {
  if (hue == null) return "";
  const dark = theme === "dusk" || theme === "midnight";
  const accent = `hsl(${hue} 85% ${dark ? 58 : 48}%)`;
  return [
    `--t-accent-h:${hue}`,
    `--accent:${accent}`,
    `--accent-soft:${dark ? `hsl(${hue} 42% 20%)` : `hsl(${hue} 90% 92%)`}`,
    `--accent-ink:${dark ? `hsl(${hue} 90% 78%)` : `hsl(${hue} 70% 28%)`}`,
    `--chart-1:${accent}`,
    `--chart-2:hsl(${(hue + 48) % 360} 75% ${dark ? 68 : 58}%)`,
    `--chart-3:hsl(${(hue + 130) % 360} 70% ${dark ? 58 : 46}%)`,
    `--chart-4:hsl(${(hue + 210) % 360} 80% ${dark ? 62 : 52}%)`,
  ].join(";");
}

function sceneHtml(s) {
  const chartSlides = CHART_SLIDES.map(([idx, theme, hue], i) => {
    const title = s.chartTitles[idx];
    return `<section class="scene cslide" id="cs-${i}" data-theme="${theme}" style="${hueStyle(hue, theme)}">
      ${blobs()}
      <div class="cslide__word" aria-hidden="true">${title}</div>
      <div class="cslide__card">${s.charts[idx]}</div>
      <div class="cslide__count"><b>${String(i + 1).padStart(2, "0")}</b><span>/ 12</span></div>
    </section>`;
  }).join("");

  const mosaic = s.charts
    .map((c, i) => `<div class="mz" data-mz="${i}">${c}</div>`)
    .join("");

  const themeLayers = THEMES.map(
    (t, i) => `<section class="scene theme-layer" id="th-${i}" data-theme="${t.id}">
      ${blobs()}
      ${themeSwitch(i)}
      <div class="hc-wrap">${s.hero}</div>
    </section>`,
  ).join("");

  const dashes = s.dashboards
    .map(
      (d, i) => `<div class="dash" data-dash="${i}">
        <div class="dash-frame" data-theme="${d.theme}">
          <div class="dash-bar"><i></i><i></i><i></i><span>${DASH_NAMES[d.id]}</span></div>
          <div class="dash-body">${blobs()}${d.html}</div>
        </div>
      </div>`,
    )
    .join("");

  const title = "Soft UI Kit"
    .split("")
    .map((c) => `<span class="ch">${c === " " ? "&nbsp;" : c}</span>`)
    .join("");

  return `
  <section class="scene" id="s-intro" data-theme="soft-glass">
    ${blobs()}
    <div class="intro">
      <div class="intro__pulse"></div>
      <div class="intro__logo">${s.logo}</div>
      <h1 class="intro__title">${title}</h1>
      <div class="intro__chips">
        <span class="chip glass sheen">React</span>
        <span class="chip glass sheen">Glass</span>
        <span class="chip glass sheen">Charts</span>
        <span class="chip glass sheen">Themes</span>
      </div>
    </div>
  </section>

  <section class="scene" id="s-wall" data-theme="soft-glass">
    ${blobs()}
    <div class="wall-cam"><div class="wall">${s.wall}</div></div>
    <div class="big-stat"><b class="count" data-to="52">0</b><span>components</span></div>
  </section>

  ${themeLayers}

  <section class="scene" id="s-taste" data-theme="soft-glass">
    ${blobs()}
    <div class="taste-shapes" aria-hidden="true"><i class="ts1"></i><i class="ts2"></i><i class="ts3"></i><i class="ts4"></i><i class="ts5"></i></div>
    <div class="taste-presets" aria-hidden="true">
      ${["Glassy", "Frosted", "Solid", "Squared", "Rounded", "Any accent"]
        .map((p) => `<span class="preset">${p}</span>`)
        .join("")}
    </div>
    <div class="taste">
      ${s.tastePanel}
      ${s.tasteTarget}
    </div>
  </section>

  ${chartSlides}

  <section class="scene" id="s-mosaic" data-theme="dusk">
    ${blobs()}
    <div class="mosaic-cam"><div class="mosaic">${mosaic}</div></div>
  </section>

  <section class="scene" id="s-dash" data-theme="soft-glass">
    ${blobs()}
    <div class="dash-cam">${dashes}</div>
    <div class="big-stat big-stat--dash"><b>5</b><span>SaaS templates</span></div>
  </section>

  <section class="scene" id="s-icons" data-theme="aurora">
    ${blobs()}
    <div class="icons">${s.icons.join("")}</div>
  </section>

  <section class="scene" id="s-outro" data-theme="soft-glass">
    ${blobs()}
    <div class="outro">
      <div class="outro__logo">${s.logo}</div>
      <h2 class="outro__title">${title}</h2>
      <div class="outro__npm glass sheen"><span class="pr">$</span><span class="cmd">npm i soft-ui-kit</span><span class="caret"></span></div>
      <div class="outro__stats">
        <span class="stat glass sheen"><b>5</b> themes</span>
        <span class="stat glass sheen"><b>52</b> components</span>
        <span class="stat glass sheen"><b>12</b> charts</span>
      </div>
    </div>
  </section>`;
}

function thumbnailHtml(s) {
  const cards = [
    ["soft-glass", 0],
    ["dusk", 2],
    ["aurora", 5],
    ["midnight", 1],
  ]
    .map(
      ([theme, idx], i) =>
        `<div class="th-card th-card--${i}" data-theme="${theme}"><div class="th-card__bg">${blobs()}</div>${s.charts[idx]}</div>`,
    )
    .join("");
  return `
  <section class="scene is-thumb" id="s-thumb" data-theme="dusk">
    ${blobs()}
    <div class="th-left">
      <div class="th-logo">${s.logo}</div>
      <h1 class="th-title"><span>SOFT</span><span>UI KIT</span></h1>
      <div class="th-tags">
        <span class="th-tag">5 THEMES</span>
        <span class="th-tag">52 COMPONENTS</span>
        <span class="th-tag">12 CHARTS</span>
      </div>
    </div>
    <div class="th-right">${cards}</div>
    <div class="th-wall">${s.wallFew}</div>
  </section>`;
}

export function buildComposition({ format, snippets, kitCss, promoCss, timelineJs }) {
  const f = FORMATS[format];
  const isThumb = format === "thumbnail";
  const duration = isThumb ? 1 : DURATION;
  const body = isThumb ? thumbnailHtml(snippets) : sceneHtml(snippets);
  const audio = isThumb
    ? ""
    : `<audio id="soundtrack" src="assets/soundtrack.mp3" data-start="0" data-duration="${DURATION}" data-track-index="9" data-volume="1"></audio>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${f.width}, height=${f.height}" />
    <title>Soft UI Kit — ${format}</title>
    <script src="assets/gsap.min.js"></script>
    <style>
      @font-face {
        font-family: "Manrope";
        src: url("assets/manrope-latin-wght-normal.woff2") format("woff2");
        font-weight: 200 800;
        font-style: normal;
      }
    </style>
    <style>
${kitCss}
    </style>
    <style>
${promoCss}
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${duration}"
      data-width="${f.width}"
      data-height="${f.height}"
    >
      <div class="stage fmt-${format}" style="width:${f.stageW}px;height:${f.stageH}px">
${body}
      </div>
      ${audio}
    </div>
    <script>
      window.__PROMO = { format: "${format}", W: ${f.stageW}, H: ${f.stageH}, duration: ${duration} };
${timelineJs}
    </script>
  </body>
</html>
`;
}
