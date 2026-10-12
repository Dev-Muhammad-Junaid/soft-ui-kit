# Changelog

## 0.3.0

Design review pass: consistency, contrast, icons, and a new brand mark.

### Fixed
- **Glass sheen covered content.** The `.sheen` highlight was painted over card text, washing out every title in light themes. It now sits behind content.
- **Background orbs covered text.** Decorative orbs painted over page copy on narrow screens (the landing hero was nearly invisible on mobile).
- **RadialBars** ignored per-series colors and stroke widths (CSS beat the SVG attributes).
- **Progress** collapsed to its content width inside flex rows ("Upload64%").
- **Toast stack** was declared twice with conflicting positions.
- Several `color-mix()` calls added up to under 100%, so skeletons, progress tracks, switch tracks, and donut tracks rendered semi-transparent.
- Landing nav "Sign up" button text was invisible (nav link color overrode the button).

### Contrast and theming
- `--ink-muted` and `--ink-faint` raised to WCAG AA (≥ 4.5:1 and ≥ 3:1 on glass) in Soft Glass, Crystal, Aurora, Dusk, and Midnight.
- Primary and danger buttons use a deeper gradient so white labels stay readable.
- New semantic text tokens `--success-ink`, `--warning-ink`, `--danger-ink`, `--info-ink`. Badges, alerts, toasts, and error hints use them instead of pastel fills.
- Form controls get a visible `--control-border` (unchecked checkboxes, radios, and OTP cells were white-on-white).
- Switch on-state follows the accent (it was hard-coded mint).
- Dark themes set `color-scheme: dark`, so native date pickers, selects, and scrollbars match. Knobs, avatars, and glass rings are toned for dark surfaces.
- Soft Glass tokens are the default when no `data-theme` is set.

### Consistency
- Shared control heights: `--control-sm/md/lg` (34 / 42 / 50px) across Buttons, IconButtons, inputs, tabs, toggles, pagination, and carousel.
- IconButton is pill-shaped like every other control and takes `size="sm" | "md" | "lg"`.
- Hard-coded radii replaced with radius tokens.
- Slider: round 22px knob (matches the Switch) with a filled track.
- Badges no longer lift on hover (they are not interactive).
- Keyboard focus rings for checkbox, radio, slider, and OTP. Tooltips and hover cards open on focus.
- Disabled styles for inputs, icon buttons, toggles, pagination, and menu items.
- `prefers-reduced-motion` is respected.

### Icons
- Every chevron and status glyph is now a Phosphor light icon: Select caret, Accordion/Collapsible disclosure, DataTable sort, Pagination and Carousel arrows, Breadcrumb separators.
- Alert and Toast show tone icons (`icon` prop overrides it, `icon={false}` hides it).
- DataTable selection uses the kit Checkbox.
- New icon aliases: `ChevronLeft`, `ChevronRight`, `ChevronUp`, `ChevronsUpDown`, `Menu`, `AlertTriangle`, `AlertOctagon`.

### Package
- `ThemeProvider` takes `defaultTheme`, `persist`, and `hotkeys` props, is safe to server-render, and survives blocked storage.
- `ToastProvider` is safe to server-render.
- Badge `tone="info"`, toast tones `info` / `warning`.

### Brand
- New logo: a glass pebble holding two soft switches. Favicon, apple-touch icon, and README wordmark (light and dark) in `docs/brand`.
