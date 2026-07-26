import { useMemo, useState } from "react";
import { SoftIcon, makeSoftIcons } from "../components/icons/soft/SoftIcon";
import {
  ICON_STYLES,
  ICON_STYLE_GROUPS,
  stylesInGroup,
} from "../components/icons/soft/styles";
import { GLYPH_KEYS } from "../components/icons/soft/glyphs";
import { GlassRing } from "../components/effects/GlassRing";
import {
  Alert,
  Badge,
  Button,
  Card,
  IconButton,
  Input,
} from "../components/ui";

const LABELS = {
  search: "Search",
  bell: "Bell",
  check: "Check",
  home: "Home",
  settings: "Settings",
  sparkles: "Sparkles",
  user: "User",
  plus: "Plus",
  chart: "Chart",
  folder: "Folder",
  info: "Info",
  arrowRight: "Arrow",
  calendar: "Calendar",
  wallet: "Wallet",
  grid: "Grid",
  close: "Close",
  mail: "Mail",
};

const REF_IMAGES = [
  { src: `${import.meta.env.BASE_URL}icon-refs/glass-a.png`, label: "Frosted tiles" },
  { src: `${import.meta.env.BASE_URL}icon-refs/glass-b.png`, label: "Iso glass system" },
  { src: `${import.meta.env.BASE_URL}icon-refs/glass-c.png`, label: "Glow cores" },
];

function StyleShowcase({ style }) {
  const I = useMemo(() => makeSoftIcons(style.id), [style.id]);
  const [on, setOn] = useState(true);
  const isGlass = style.group === "glass";

  return (
    <article className="icon-style-card glass sheen" id={`style-${style.id}`}>
      <header className="icon-style-card__head">
        <div>
          <h2>{style.name}</h2>
          <p>{style.tagline}</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Badge tone={isGlass ? "accent" : "neutral"}>{style.group}</Badge>
          <Badge>{style.id}</Badge>
        </div>
      </header>
      <p className="icon-style-card__fit">{style.fit}</p>

      <div
        className={`icon-style-grid${isGlass ? " icon-style-grid--glass" : ""}`}
        aria-label={`${style.name} glyph set`}
      >
        {GLYPH_KEYS.map((key) => (
          <div key={key} className="icon-style-glyph">
            <SoftIcon name={key} styleId={style.id} size={isGlass ? 28 : 22} />
            <span>{LABELS[key] || key}</span>
          </div>
        ))}
      </div>

      <div className="section-title">In components</div>

      <div className="icon-style-demos">
        <Card title="Buttons" description="Primary / outline / soft with icons" padded>
          <div className="preview-row" style={{ flexWrap: "wrap" }}>
            <Button size="sm" leftIcon={<I.Plus size={isGlass ? 16 : 15} />}>
              New item
            </Button>
            <Button size="sm" variant="outline" rightIcon={<I.ArrowRight size={isGlass ? 16 : 15} />}>
              Continue
            </Button>
            <Button size="sm" variant="soft" leftIcon={<I.Sparkles size={isGlass ? 16 : 15} />}>
              Taste
            </Button>
            <Button size="sm" variant="ghost" leftIcon={<I.Settings size={isGlass ? 16 : 15} />}>
              Settings
            </Button>
          </div>
        </Card>

        <Card title="Icon buttons" description="Ghost · glass · outline" padded>
          <div className="preview-row">
            <IconButton label="Search" variant="ghost">
              <I.Search size={isGlass ? 20 : 17} />
            </IconButton>
            <IconButton label="Alerts" variant="glass">
              <I.Bell size={isGlass ? 20 : 17} />
            </IconButton>
            <IconButton label="Close" variant="outline">
              <I.X size={isGlass ? 20 : 17} />
            </IconButton>
            <IconButton label="Mail" variant="glass">
              <I.Mail size={isGlass ? 20 : 17} />
            </IconButton>
          </div>
        </Card>

        <Card title="Glass rings" description="Brand / KPI badges" padded>
          <div className="preview-row preview-row--rings">
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="sky" active>
                <I.Sparkles size={isGlass ? 22 : 20} />
              </GlassRing>
              <span>Brand</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="mint" soft>
                <I.Check size={isGlass ? 22 : 20} />
              </GlassRing>
              <span>OK</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="lavender" active>
                <I.Bell size={isGlass ? 22 : 20} />
              </GlassRing>
              <span>Alert</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="peach" soft>
                <I.Wallet size={isGlass ? 22 : 20} />
              </GlassRing>
              <span>Finance</span>
            </div>
          </div>
        </Card>

        <Card title="Nav rail" description="Sidebar-style destinations" padded>
          <nav className="icon-style-nav">
            {[
              { Icon: I.Home, label: "Overview" },
              { Icon: I.BarChart3, label: "Charts" },
              { Icon: I.Folder, label: "Projects" },
              { Icon: I.CalendarDays, label: "Schedule" },
              { Icon: I.Settings, label: "Settings" },
            ].map(({ Icon, label }, i) => (
              <button
                key={label}
                type="button"
                className={`icon-style-nav__item${i === 0 ? " is-active" : ""}`}
              >
                <Icon size={isGlass ? 20 : 18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </Card>

        <Card title="Form field" description="Search input chrome" padded>
          <div className="icon-style-field glass sheen">
            <I.Search size={isGlass ? 18 : 17} />
            <input className="ui-input ui-input--bare" placeholder="Search workspace…" />
            <IconButton label="Clear" variant="ghost">
              <I.X size={14} />
            </IconButton>
          </div>
          <div style={{ marginTop: 12 }}>
            <Input label="Owner" placeholder="Alex" />
          </div>
        </Card>

        <Card title="Feedback" description="Alert + toolbar strip" padded>
          <Alert tone="info" title="Synced">
            <span className="row" style={{ gap: 8 }}>
              <I.Info size={isGlass ? 18 : 16} /> Nightly job finished with no blockers.
            </span>
          </Alert>
          <div className="icon-style-toolbar glass sheen" style={{ marginTop: 12 }}>
            <button type="button" className="icon-style-toolbar__btn" onClick={() => setOn(!on)}>
              <I.LayoutGrid size={16} />
              Board
            </button>
            <button type="button" className="icon-style-toolbar__btn">
              <I.User size={16} />
              People
            </button>
            <button type="button" className="icon-style-toolbar__btn is-active">
              <I.BarChart3 size={16} />
              Insights
            </button>
            <Badge tone={on ? "success" : "neutral"}>{on ? "Live" : "Paused"}</Badge>
          </div>
        </Card>
      </div>
    </article>
  );
}

export function IconStylesPage() {
  const [focus, setFocus] = useState("frost-shell");
  const [group, setGroup] = useState("glass");

  const visible = stylesInGroup(group);

  return (
    <div className="icon-styles-page">
      <header className="page-header">
        <div>
          <h1>Icon style lab</h1>
          <p>
            Line weights plus a new <strong>Glass & depth</strong> set inspired by your
            frosted 3D references — still SVG + <code>currentColor</code>, so Taste /
            theme accent keeps tinting them.
          </p>
        </div>
        <Badge tone="accent">{ICON_STYLES.length} styles</Badge>
      </header>

      <Card className="icon-styles-refs glass sheen" title="Reference mood" description="Your glass / isometric boards">
        <div className="icon-styles-refs__grid">
          {REF_IMAGES.map((img) => (
            <figure key={img.src} className="icon-styles-refs__fig">
              <img src={img.src} alt={img.label} loading="lazy" />
              <figcaption>{img.label}</figcaption>
            </figure>
          ))}
        </div>
      </Card>

      <Card className="icon-styles-picker glass sheen">
        <div className="catalog-filters" role="tablist" aria-label="Style groups">
          {ICON_STYLE_GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={group === g.id}
              className={`theme-chip${group === g.id ? " is-active" : ""}`}
              onClick={() => setGroup(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>
        <p className="catalog-count">
          {ICON_STYLE_GROUPS.find((g) => g.id === group)?.hint}
        </p>
        <div className={`icon-styles-compare-row icon-styles-compare-row--${visible.length}`}>
          {visible.map((style) => (
            <button
              key={style.id}
              type="button"
              className={`icon-styles-compare-chip${focus === style.id ? " is-active" : ""}`}
              onClick={() => {
                setFocus(style.id);
                document
                  .getElementById(`style-${style.id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <SoftIcon name="sparkles" styleId={style.id} size={22} />
              <SoftIcon name="search" styleId={style.id} size={22} />
              <SoftIcon name="check" styleId={style.id} size={22} />
              <span>{style.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="icon-styles-stack">
        {visible.map((style) => (
          <StyleShowcase key={style.id} style={style} />
        ))}
      </div>

      <Card padded>
        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 13, lineHeight: 1.5 }}>
          Tip: switch Taste theme / accent hue while looking at <strong>Glass & depth</strong> —
          plates and cores should re-tint. True Blender-style isometrics stay image assets;
          these SVG languages are the kit-friendly versions you can ship in buttons and nav.
        </p>
      </Card>
    </div>
  );
}
