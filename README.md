# Soft UI Kit

Glass + soft UI playground — themes, live **Taste** dials, component catalog, charts, motion effects, and SaaS samples.

<p align="center">
  <a href="https://dev-muhammad-junaid.github.io/soft-ui-kit/">
    <img src="docs/preview/preview.gif" alt="Soft UI Kit preview — landing, catalog, charts, SaaS, effects, and Taste panel" width="960" />
  </a>
</p>

<p align="center">
  <a href="https://dev-muhammad-junaid.github.io/soft-ui-kit/"><strong>Live demo →</strong></a>
  &nbsp;·&nbsp;
  Open <strong>Taste</strong> (bottom-right) to tweak radius, glass, color, and effects live
</p>

---

## What's in the box

| Landing | Catalog + Taste |
| :---: | :---: |
| <img src="docs/preview/01-landing-sm.jpg" alt="Landing page" width="420" /> | <img src="docs/preview/06-taste-sm.jpg" alt="Catalog with Taste panel" width="420" /> |
| Marketing hero with glass cards & charts | Searchable component previews + live Taste dials |

| Charts gallery | SaaS sample |
| :---: | :---: |
| <img src="docs/preview/03-charts-sm.jpg" alt="Charts gallery" width="420" /> | <img src="docs/preview/04-saas-autumn-sm.jpg" alt="Autumn Insight dashboard" width="420" /> |
| Line, bar, heatmap, radar, funnel & more | Autumn Insight analytics workspace |

| Motion effects | Dark theme |
| :---: | :---: |
| <img src="docs/preview/05-effects-sm.jpg" alt="Effects page" width="420" /> | <img src="docs/preview/07-dusk-sm.jpg" alt="Dusk theme" width="420" /> |
| `border-beam` + `metal-fx` playground | Dusk / Midnight + Shift+1…N theme switch |

---

## Features

- **5 themes** — Soft Glass, Crystal, Aurora, Dusk, Midnight
- **Taste playground** — radius, blur, opacity, accent hue, depth, glass rings, border-beam & metal-fx
- **Component catalog** — buttons, forms, overlays, navigation, charts, effects
- **SaaS samples** — Autumn Insight, Travel CRM, Finance, Kanban
- **Charts** — interactive gallery with soft glass chrome

## Local

```bash
npm install
npm run dev
```

Build / preview (Pages base path `/soft-ui-kit/`):

```bash
npm run build
npm run preview
```

Regenerate README screenshots from the live site:

```bash
npm run preview:capture
```

## Stack

- React 19 + Vite + React Router
- CSS tokens + Taste playground
- Icons: [`@phosphor-icons/react`](https://phosphoricons.com/) (light strokes for glass UI)
- Optional packs: [`border-beam`](https://www.npmjs.com/package/border-beam), [`metal-fx`](https://www.npmjs.com/package/metal-fx)
