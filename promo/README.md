# Soft UI Kit — promo video

A 32.5 second motion promo for the kit, built with [HyperFrames](https://hyperframes.heygen.com) (HTML → MP4).
Every component, chart, dashboard, and icon in the video is the kit's own React markup and CSS,
server-rendered to static HTML. A single seekable GSAP timeline drives all the motion.

| Output | Size | Use |
| --- | --- | --- |
| `docs/promo/soft-ui-kit-landscape-16x9.mp4` | 1920×1080 · 60fps | YouTube, X, LinkedIn, site hero |
| `docs/promo/soft-ui-kit-vertical-9x16.mp4` | 1080×1920 · 60fps | Instagram Reels, Facebook Reels, YouTube Shorts, TikTok |
| `docs/promo/soft-ui-kit-youtube-thumbnail.png` | 1280×720 | YouTube thumbnail |

## Storyboard (120 BPM, one cut per beat)

| Time | Scene |
| --- | --- |
| 0.0s | Kit `Logo` + title |
| 2.5s | Component wall: 24 live components (52 in the kit) fly in, then switches, tabs, sliders, and progress react on the beat |
| 6.0s | Theme run: Soft Glass → Crystal → Aurora → Dusk → Midnight (iris wipes from the theme dots) |
| 10.0s | Instant customization with the Taste dials: Glassy → Frosted → Solid → Squared → Rounded → Any accent, over crisp shapes so blur and opacity are visible |
| 15.0s | 10 charts, one per beat, each with its own theme and accent |
| 20.0s | Bento wall of all 12 chart types |
| 22.5s | Coverflow through the 5 SaaS dashboards inside `DashboardShell` |
| 26.5s | Phosphor icons in `IconTile`s |
| 28.9s | Outro with the kit `Logo`: `npm i soft-ui-kit` |

## Rebuild and render

```bash
npm install
pip install numpy scipy                 # soundtrack synth (ffmpeg required)
python3 promo/scripts/soundtrack.py     # → promo/assets/soundtrack.mp3 (already committed)
node promo/scripts/build.mjs            # → promo/video/{landscape,vertical,thumbnail}/

cd promo/video/landscape
npx hyperframes@0.8.149 preview         # Studio preview / editor
npx hyperframes@0.8.149 render --fps 60 --crf 18 --output ../../../docs/promo/soft-ui-kit-landscape-16x9.mp4

cd ../vertical
npx hyperframes@0.8.149 render --fps 60 --crf 18 --output ../../../docs/promo/soft-ui-kit-vertical-9x16.mp4

cd ../thumbnail
npx hyperframes@0.8.149 snapshot --at 0.5   # PNG lands in snapshots/
```

## Files

- `src/snippets.jsx` — real kit components to static HTML (wall tiles, hero cluster, charts, dashboards, icons)
- `src/composition.mjs` — scene markup and HyperFrames root for each format
- `src/promo.css` — stage, scene, and per-format layouts
- `src/timeline.js` — the GSAP timeline: transitions, chart reveals, theme and Taste animation
- `scripts/build.mjs` — SSR through Vite, inlines the kit CSS, and writes the HyperFrames projects
- `scripts/soundtrack.py` — a royalty-free 120 BPM track, synthesised in code, with cues on every cut
- `assets/` — Manrope (SIL OFL), GSAP 3.14.2, and the soundtrack

The kit's CSS transitions and keyframe animations are stripped from the video build because they
run on the browser clock and can't be seeked frame by frame. Every reveal is re-created on the
timeline instead.
