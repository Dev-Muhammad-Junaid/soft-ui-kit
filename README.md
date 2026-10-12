<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/logo-wordmark-dark.svg" />
    <img src="docs/brand/logo-wordmark.svg" alt="Soft UI Kit" width="360" />
  </picture>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/soft-ui-kit"><img src="https://img.shields.io/npm/v/soft-ui-kit?color=38bdf8&label=npm" alt="npm version" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-8b5cf6" alt="MIT license" /></a>
</p>

Glass + soft React UI kit — install it like any other Node module, then import components, themes, and `cn`.

<p align="center">
  <a href="https://dev-muhammad-junaid.github.io/soft-ui-kit/">
    <img src="docs/preview/preview.gif" alt="Soft UI Kit preview" width="960" />
  </a>
</p>

<p align="center">
  <a href="https://dev-muhammad-junaid.github.io/soft-ui-kit/"><strong>Live demo →</strong></a>
</p>

---

## Install

```bash
npm install soft-ui-kit
```

```bash
pnpm add soft-ui-kit
```

```bash
bun add soft-ui-kit
```

From GitHub (works before/without npm publish):

```bash
npm install github:Dev-Muhammad-Junaid/soft-ui-kit
```

Peer deps: `react`, `react-dom` (and `react-router-dom` if you use `DashboardShell`).

## Usage

```jsx
import { Button, Card, ThemeProvider, cn } from "soft-ui-kit";
import "soft-ui-kit/styles.css";

export function App() {
  return (
    <ThemeProvider>
      <Card title="Hello" className={cn("is-hoverable")}>
        <Button>Ship UI</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### ThemeProvider options

```jsx
<ThemeProvider defaultTheme="dusk" persist={false} hotkeys={false}>
  …
</ThemeProvider>
```

| Prop | Default | What it does |
| --- | --- | --- |
| `defaultTheme` | `"soft-glass"` | Theme used when nothing is saved yet |
| `persist` | `true` | Remember theme and Taste tweaks in `localStorage` |
| `hotkeys` | `true` | `Shift+1…5` switches themes. Turn off in product apps |

`ThemeProvider` and `ToastProvider` are safe to server-render (Next.js, Remix). Without a provider, the stylesheet falls back to Soft Glass tokens.

### Design tokens

Every component pulls from shared tokens, so overrides stay consistent:

- **Control heights:** `--control-sm` 34px · `--control-md` 42px · `--control-lg` 50px (Buttons, IconButtons, inputs, toggles, pagination)
- **Text:** `--ink`, `--ink-muted` (≥ 4.5:1 on glass), `--ink-faint` (≥ 3:1, hints and placeholders)
- **Semantic:** `--success` / `--warning` / `--danger` / `--info` for tints, and matching `*-ink` tokens for text and icons
- **Accent:** `--accent`, `--accent-soft`, `--accent-ink`, `--accent-strong` (carries white text)

### What’s exported

- **UI** — Button, Card, IconTile, Input, Dialog, Table, Tabs, ToastProvider, …
- **Theme** — `ThemeProvider`, `useTheme`, `THEMES`, `DEFAULT_TWEAKS`
- **Charts** — Bar, Line, Donut, Sparkline, Heatmap, Radar, Funnel, …
- **Layout** — `GlassOrbField` (static blurred backdrop for glass pages), `DashboardShell` (collapsible sidebar). Pass `linkComponent={NavLink}` if you use React Router; otherwise links render as `<a href>`.
- **Utils** — `cn()`
- **Icons** — `import { icons } from "soft-ui-kit"` (Phosphor, light weight, used for every chevron, caret, and status glyph in the kit). Custom icon style labs live on `explore/icons-*` and are **not** part of this package.

## Demo site (this repo)

```bash
npm install
npm run dev
```

```bash
npm test          # Vitest suite
npm run build     # demo site + library bundle
npm run build:lib # package entry only → dist/lib
```

## Features

- **5 themes** — Soft Glass, Crystal, Aurora, Dusk, Midnight
- **Taste playground** (demo) — live radius, glass, color, and depth
- **UI Kit · Charts** — separate galleries; Taste dials stay in sync
- **SaaS samples** — Ops, Autumn, Travel, Finance, Kanban
- **Phosphor icons** — light-stroke set for kit chrome; experimental icon languages stay on `explore/icons-*` (do not merge into `main`)

## Brand

The logo is a glass pebble holding two soft switches, one off and one on. Assets live in [`docs/brand`](docs/brand): `logo.svg`, `logo-512.png`, and light/dark wordmarks.

## License

MIT
