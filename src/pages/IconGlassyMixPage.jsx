import { useMemo, useState } from "react";
import { SoftIcon, makeSoftIcons } from "../components/icons/soft/SoftIcon";
import { ICON_STYLES } from "../components/icons/soft/styles";
import { GLYPH_KEYS } from "../components/icons/soft/glyphs";
import { GlassRing } from "../components/effects/GlassRing";
import { Alert, Badge, Button, Card, IconButton, Input, Switch } from "../components/ui";

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

function StyledIconButton({ style, label, children }) {
  return (
    <IconButton
      label={label}
      variant="plain"
      className={`icon-style-ibtn icon-style-ibtn--${style.id} icon-style-ibtn--glassy-mix`}
    >
      {children}
    </IconButton>
  );
}

function StyleShowcase({ style }) {
  const I = useMemo(() => makeSoftIcons(style.id, { bare: true }), [style.id]);
  const [on, setOn] = useState(true);

  return (
    <article
      className={`icon-style-card glass sheen icon-style-card--glassy-mix icon-style-card--id-${style.id}`}
      id={`style-${style.id}`}
    >
      <header className="icon-style-card__head">
        <div>
          <h2>{style.name}</h2>
          <p>{style.tagline}</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Badge tone="accent">{style.group}</Badge>
          <Badge>{style.id}</Badge>
        </div>
      </header>
      <p className="icon-style-card__fit">{style.fit}</p>

      <div className={`icon-style-grid icon-style-grid--id-${style.id}`} aria-label={`${style.name} glyph set`}>
        {GLYPH_KEYS.map((key) => (
          <div key={key} className={`icon-style-glyph icon-style-glyph--${style.id}`}>
            <span className={`icon-style-pad icon-style-pad--${style.id}`}>
              <SoftIcon name={key} styleId={style.id} size={26} bare />
            </span>
            <span>{LABELS[key] || key}</span>
          </div>
        ))}
      </div>

      <div className="section-title">In components</div>

      <div className="icon-style-demos">
        <Card title="Buttons" description="Primary / outline / soft with icons" padded>
          <div className="preview-row" style={{ flexWrap: "wrap" }}>
            <Button size="sm" leftIcon={<I.Plus size={16} />}>
              New item
            </Button>
            <Button size="sm" variant="outline" rightIcon={<I.ArrowRight size={16} />}>
              Continue
            </Button>
            <Button size="sm" variant="soft" leftIcon={<I.Sparkles size={16} />}>
              Taste
            </Button>
            <Button size="sm" variant="ghost" leftIcon={<I.Settings size={16} />}>
              Settings
            </Button>
          </div>
        </Card>

        <Card title="Icon buttons" description="Light pads so multiply layers can mix" padded>
          <div className="preview-row icon-style-ibtn-row">
            <StyledIconButton style={style} label="Search">
              <I.Search size={20} />
            </StyledIconButton>
            <StyledIconButton style={style} label="Alerts">
              <I.Bell size={20} />
            </StyledIconButton>
            <StyledIconButton style={style} label="Close">
              <I.X size={20} />
            </StyledIconButton>
            <StyledIconButton style={style} label="Mail">
              <I.Mail size={20} />
            </StyledIconButton>
            <StyledIconButton style={style} label="Plus">
              <I.Plus size={20} />
            </StyledIconButton>
          </div>
        </Card>

        <Card title="Glass rings" description="Brand / KPI badges" padded>
          <div className="preview-row preview-row--rings">
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="sky" active>
                <I.Sparkles size={22} />
              </GlassRing>
              <span>Brand</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="mint" soft>
                <I.Check size={22} />
              </GlassRing>
              <span>OK</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="lavender" active>
                <I.Bell size={22} />
              </GlassRing>
              <span>Alert</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="peach" soft>
                <I.Wallet size={22} />
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
                <span className={`icon-style-pad icon-style-pad--sm icon-style-pad--${style.id}`}>
                  <Icon size={18} />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </Card>

        <Card title="Form field" description="Search input chrome" padded>
          <div className="icon-style-field glass sheen">
            <span className={`icon-style-pad icon-style-pad--sm icon-style-pad--${style.id}`}>
              <I.Search size={16} />
            </span>
            <input className="ui-input ui-input--bare" placeholder="Search workspace…" />
            <StyledIconButton style={style} label="Clear">
              <I.X size={14} />
            </StyledIconButton>
          </div>
          <div style={{ marginTop: 12 }}>
            <Input label="Owner" placeholder="Alex" />
          </div>
        </Card>

        <Card title="Feedback" description="Alert + toolbar strip" padded>
          <Alert tone="info" title="Synced">
            <span className="row" style={{ gap: 8 }}>
              <I.Info size={18} /> Nightly job finished with no blockers.
            </span>
          </Alert>
          <div className="icon-style-toolbar glass sheen" style={{ marginTop: 12 }}>
            <button type="button" className="icon-style-toolbar__btn" onClick={() => setOn(!on)}>
              <I.LayoutGrid size={16} /> Board
            </button>
            <button type="button" className="icon-style-toolbar__btn">
              <I.User size={16} /> People
            </button>
            <button type="button" className="icon-style-toolbar__btn is-active">
              <I.BarChart3 size={16} /> Insights
            </button>
            <Badge tone={on ? "success" : "neutral"}>{on ? "Live" : "Paused"}</Badge>
          </div>
        </Card>
      </div>
    </article>
  );
}

export function IconGlassyMixPage() {
  const [hoverFx, setHoverFx] = useState(true);

  return (
    <div className={`icon-styles-page${hoverFx ? " icon-styles-page--hover-fx" : ""}`}>
      <header className="page-header">
        <div>
          <h1>Glassy mix icons</h1>
          <p>
            Overlapping translucent gradient layers that mix where they meet — the bird-mark
            glass language for Soft UI.
          </p>
        </div>
        <div className="icon-styles-page__controls">
          <Switch checked={hoverFx} onCheckedChange={setHoverFx} label="Style hover FX" />
          <Badge tone="accent">{ICON_STYLES.length} styles</Badge>
        </div>
      </header>

      <Card
        className="icon-styles-refs glass sheen"
        title="Reference mood"
        description="Translucent overlap + mix-color gradients"
      >
        <div className="icon-styles-refs__grid">
          <figure className="icon-styles-refs__fig">
            <img
              src={`${import.meta.env.BASE_URL}icon-refs/glassy-mix-bird.png`}
              alt="Overlapping translucent bird mark"
              loading="lazy"
            />
            <figcaption>Layered glass bird</figcaption>
          </figure>
          <div className="icon-styles-refs__copy">
            <h3>How this set works</h3>
            <p>
              Each glyph is drawn as 2–3 offset fills with distinct gradients (blue→cyan,
              magenta→pink, amber→orange). Layers use <code>mix-blend-mode: multiply</code>{" "}
              inside an isolated group so overlaps deepen into purple / burnt orange — the same
              glassy mix as the reference.
            </p>
          </div>
        </div>
      </Card>

      <div className="icon-styles-jump">
        <div className="icon-styles-jump__group">
          <h3>Jump to style</h3>
          <div className="icon-styles-jump__chips">
            {ICON_STYLES.map((style) => (
              <a
                key={style.id}
                href={`#style-${style.id}`}
                className="icon-styles-compare-chip"
              >
                <span className={`icon-style-pad icon-style-pad--sm icon-style-pad--${style.id}`}>
                  <SoftIcon name="sparkles" styleId={style.id} size={18} bare />
                </span>
                <span>{style.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="icon-styles-stack">
        {ICON_STYLES.map((style) => (
          <StyleShowcase key={style.id} style={style} />
        ))}
      </div>
    </div>
  );
}
