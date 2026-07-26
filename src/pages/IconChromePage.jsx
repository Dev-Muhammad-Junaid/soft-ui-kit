import { useMemo, useState } from "react";
import { SoftIcon, makeSoftIcons } from "../components/icons/soft/SoftIcon";
import { ICON_STYLES } from "../components/icons/soft/styles";
import { GLYPH_KEYS } from "../components/icons/soft/glyphs";
import { SoftComplexIconSet } from "../components/icons/soft/SoftComplexIcon";
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

function styleTone(style) {
  if (style.group === "chrome") return "chrome";
  if (style.group === "glass") return "glass";
  return "line";
}

function StyledIconButton({ style, label, children }) {
  return (
    <IconButton
      label={label}
      variant="plain"
      className={`icon-style-ibtn icon-style-ibtn--${style.id} icon-style-ibtn--${styleTone(style)}`}
    >
      {children}
    </IconButton>
  );
}

function StyleShowcase({ style }) {
  const I = useMemo(() => makeSoftIcons(style.id, { bare: true }), [style.id]);
  const [on, setOn] = useState(true);
  const tone = styleTone(style);
  const fat = tone !== "line";

  return (
    <article
      className={`icon-style-card glass sheen icon-style-card--${tone} icon-style-card--id-${style.id}`}
      id={`style-${style.id}`}
    >
      <header className="icon-style-card__head">
        <div>
          <h2>{style.name}</h2>
          <p>{style.tagline}</p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Badge tone={tone === "line" ? "neutral" : "accent"}>{style.group}</Badge>
          <Badge>{style.id}</Badge>
        </div>
      </header>
      <p className="icon-style-card__fit">{style.fit}</p>

      <div
        className={`icon-style-grid icon-style-grid--${tone} icon-style-grid--id-${style.id}`}
        aria-label={`${style.name} glyph set`}
      >
        {GLYPH_KEYS.map((key) => (
          <div key={key} className={`icon-style-glyph icon-style-glyph--${style.id}`}>
            <span className={`icon-style-pad icon-style-pad--${style.id} icon-style-pad--${tone}`}>
              <SoftIcon name={key} styleId={style.id} size={fat ? 26 : 20} bare />
            </span>
            <span>{LABELS[key] || key}</span>
          </div>
        ))}
      </div>

      <div className="section-title">In components</div>

      <div className="icon-style-demos">
        <Card title="Buttons" description="Primary / outline / soft with icons" padded>
          <div className="preview-row" style={{ flexWrap: "wrap" }}>
            <Button size="sm" leftIcon={<I.Plus size={fat ? 16 : 15} />}>New item</Button>
            <Button size="sm" variant="outline" rightIcon={<I.ArrowRight size={fat ? 16 : 15} />}>Continue</Button>
            <Button size="sm" variant="soft" leftIcon={<I.Sparkles size={fat ? 16 : 15} />}>Taste</Button>
            <Button size="sm" variant="ghost" leftIcon={<I.Settings size={fat ? 16 : 15} />}>Settings</Button>
          </div>
        </Card>

        <Card title="Icon buttons" description="Backgrounds matched to this set" padded>
          <div className="preview-row icon-style-ibtn-row">
            <StyledIconButton style={style} label="Search"><I.Search size={fat ? 20 : 17} /></StyledIconButton>
            <StyledIconButton style={style} label="Alerts"><I.Bell size={fat ? 20 : 17} /></StyledIconButton>
            <StyledIconButton style={style} label="Close"><I.X size={fat ? 20 : 17} /></StyledIconButton>
            <StyledIconButton style={style} label="Mail"><I.Mail size={fat ? 20 : 17} /></StyledIconButton>
            <StyledIconButton style={style} label="Plus"><I.Plus size={fat ? 20 : 17} /></StyledIconButton>
          </div>
        </Card>

        <Card title="Glass rings" description="Brand / KPI badges" padded>
          <div className="preview-row preview-row--rings">
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="sky" active><I.Sparkles size={fat ? 22 : 20} /></GlassRing>
              <span>Brand</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="mint" soft><I.Check size={fat ? 22 : 20} /></GlassRing>
              <span>OK</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="lavender" active><I.Bell size={fat ? 22 : 20} /></GlassRing>
              <span>Alert</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="peach" soft><I.Wallet size={fat ? 22 : 20} /></GlassRing>
              <span>Finance</span>
            </div>
          </div>
        </Card>

        <Card title="Nav rail" description="Sidebar-style destinations" padded>
          <nav className={`icon-style-nav icon-style-nav--${tone}`}>
            {[
              { Icon: I.Home, label: "Overview" },
              { Icon: I.BarChart3, label: "Charts" },
              { Icon: I.Folder, label: "Projects" },
              { Icon: I.CalendarDays, label: "Schedule" },
              { Icon: I.Settings, label: "Settings" },
            ].map(({ Icon, label }, i) => (
              <button key={label} type="button" className={`icon-style-nav__item${i === 0 ? " is-active" : ""}`}>
                <span className={`icon-style-pad icon-style-pad--sm icon-style-pad--${style.id} icon-style-pad--${tone}`}>
                  <Icon size={fat ? 18 : 16} />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </Card>

        <Card title="Form field" description="Search input chrome" padded>
          <div className={`icon-style-field glass sheen icon-style-field--${tone}`}>
            <span className={`icon-style-pad icon-style-pad--sm icon-style-pad--${style.id} icon-style-pad--${tone}`}>
              <I.Search size={fat ? 16 : 15} />
            </span>
            <input className="ui-input ui-input--bare" placeholder="Search workspace…" />
            <StyledIconButton style={style} label="Clear"><I.X size={14} /></StyledIconButton>
          </div>
          <div style={{ marginTop: 12 }}>
            <Input label="Owner" placeholder="Alex" />
          </div>
        </Card>

        <Card title="Feedback" description="Alert + toolbar strip" padded>
          <Alert tone="info" title="Synced">
            <span className="row" style={{ gap: 8 }}>
              <I.Info size={fat ? 18 : 16} /> Nightly job finished with no blockers.
            </span>
          </Alert>
          <div className={`icon-style-toolbar glass sheen icon-style-toolbar--${tone}`} style={{ marginTop: 12 }}>
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

export function IconChromePage() {
  const [hoverFx, setHoverFx] = useState(true);
  const [complexAnimate, setComplexAnimate] = useState(true);

  return (
    <div className={`icon-styles-page${hoverFx ? " icon-styles-page--hover-fx" : ""}`}>
      <header className="page-header">
        <div>
          <h1>Chrome neon icons</h1>
          <p>Liquid-metal SoftIcon modes plus a Soft Complex chrome neon subset for dark, reflective UI moments.</p>
        </div>
        <div className="icon-styles-page__controls">
          <Switch checked={hoverFx} onCheckedChange={setHoverFx} label="Style hover FX" />
          <Switch checked={complexAnimate} onCheckedChange={setComplexAnimate} label="Complex idle FX" />
          <Badge tone="accent">{ICON_STYLES.length} styles</Badge>
        </div>
      </header>

      <Card className="icon-styles-refs glass sheen" title="Reference mood" description="Chrome neon icons mood boards">
        <div className="icon-styles-refs__grid">
          {[
            { src: `${import.meta.env.BASE_URL}icon-refs/chrome-a.png`, label: "Neon reflections" },
            { src: `${import.meta.env.BASE_URL}icon-refs/chrome-b.png`, label: "Chrome board" },
            { src: `${import.meta.env.BASE_URL}icon-refs/chrome-c.png`, label: "Liquid metal" }
          ].map((img) => (
            <figure key={img.src} className="icon-styles-refs__fig">
              <img src={img.src} alt={img.label} loading="lazy" />
              <figcaption>{img.label}</figcaption>
            </figure>
          ))}
        </div>
      </Card>

      <Card className="icon-styles-complex glass sheen" title="Chrome neon subset" description="Liquid metal + neon rim Soft Complex explorations">
        <SoftComplexIconSet material="chrome" size={52} animate={complexAnimate} className="soft-cx-set--chrome" />
      </Card>

      <div className="icon-styles-jump">
        <div className="icon-styles-jump__group">
          <h3>Jump to style</h3>
          <div className="icon-styles-jump__chips">
            {ICON_STYLES.map((style) => (
              <a
                key={style.id}
                href={`#style-${style.id}`}
                className={`icon-styles-compare-chip icon-styles-compare-chip--${styleTone(style)}`}
              >
                <span className={`icon-style-pad icon-style-pad--sm icon-style-pad--${style.id} icon-style-pad--${styleTone(style)}`}>
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
