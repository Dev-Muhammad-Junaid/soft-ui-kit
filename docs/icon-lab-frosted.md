# Frosted SoftMark lab (explore only)

This branch is an **icon language lab**, not the shipped Soft UI Kit.

| | Production (`main`, soft-ui-kit@0.2.0) | This lab (`explore/icons-frosted`) |
|---|---|---|
| Icons | Phosphor (`import { icons } from "soft-ui-kit"`) | SoftMark frosted catalog on `/icon-styles/frosted` |
| Merge | Kit PRs | **Do not merge this branch into `main`** |
| npm | Publish from `main` only | **Do not publish from this branch** |

Draft PR: https://github.com/Dev-Muhammad-Junaid/soft-ui-kit/pull/4 (keep draft).

## What this language is

**Bare SoftMark** — shaped / stroke glass marks (Arrow, User, Bell, Chart). The mark *is* the frosted body. It is not a TileMark glyph with the plate turned off.

- ViewBox `0 0 48 48`, safe area ~6–42
- Paints: `url(#…-body|face|core|rim|spec)` from `currentColor` (`--accent`) + `--soft-cx-frost|mark|cut`
- Stroke family (Close / Check / Plus / Minus): `SoftStrokeMark`
- Shape family (User / Chart / arrows): filled SoftMark / origin silhouettes
- Bright `#…-core` accent sits on frosted face where the mark has interior detail

Tiled Soft Complex plates remain in `frostedIcons.jsx` as origin artwork for shaped reuse. The **lab page reviews Bare only**.

## Preview

```bash
npm install
npm run build:demo
npm run preview -- --host 127.0.0.1 --port 4174
```

Open `/soft-ui-kit/icon-styles/frosted`. Theme FAB changes accent; icons should follow.

## Validate a new icon

1. Add Bare artwork in `frostedBareIcons.jsx` **or** list a shaped origin key in `FROSTED_SHAPED_BARE_KEYS` (do not plate-off TileMark glyphs).
2. Register the name in `frostedRegistry.js`.
3. `npm run validate:frosted`
4. Screenshot Bare on the lab page against Close / Check / Plus / User / Chart.

## Out of scope on this branch

- Replacing Phosphor in AppShell, catalog, or package exports
- Rebasing / merging `main`
- Kit primitives (button, tokens, themed badges/charts)
- Publishing or merging the draft PR into `main`
