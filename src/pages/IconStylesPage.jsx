import { useMemo, useState } from "react";
import { SoftIcon, makeSoftIcons } from "../components/icons/soft/SoftIcon";
import { ICON_STYLES } from "../components/icons/soft/styles";
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

function StyleShowcase({ style }) {
  const I = useMemo(() => makeSoftIcons(style.id), [style.id]);
  const [on, setOn] = useState(true);

  return (
    <article className="icon-style-card glass sheen" id={`style-${style.id}`}>
      <header className="icon-style-card__head">
        <div>
          <h2>{style.name}</h2>
          <p>{style.tagline}</p>
        </div>
        <Badge tone="accent">{style.id}</Badge>
      </header>
      <p className="icon-style-card__fit">{style.fit}</p>

      <div className="icon-style-grid" aria-label={`${style.name} glyph set`}>
        {GLYPH_KEYS.map((key) => (
          <div key={key} className="icon-style-glyph">
            <SoftIcon name={key} styleId={style.id} size={22} />
            <span>{LABELS[key] || key}</span>
          </div>
        ))}
      </div>

      <div className="section-title">In components</div>

      <div className="icon-style-demos">
        <Card title="Buttons" description="Primary / outline / soft with icons" padded>
          <div className="preview-row" style={{ flexWrap: "wrap" }}>
            <Button size="sm" leftIcon={<I.Plus size={15} />}>
              New item
            </Button>
            <Button size="sm" variant="outline" rightIcon={<I.ArrowRight size={15} />}>
              Continue
            </Button>
            <Button size="sm" variant="soft" leftIcon={<I.Sparkles size={15} />}>
              Taste
            </Button>
            <Button size="sm" variant="ghost" leftIcon={<I.Settings size={15} />}>
              Settings
            </Button>
          </div>
        </Card>

        <Card title="Icon buttons" description="Ghost · glass · outline" padded>
          <div className="preview-row">
            <IconButton label="Search" variant="ghost">
              <I.Search size={17} />
            </IconButton>
            <IconButton label="Alerts" variant="glass">
              <I.Bell size={17} />
            </IconButton>
            <IconButton label="Close" variant="outline">
              <I.X size={17} />
            </IconButton>
            <IconButton label="Mail" variant="glass">
              <I.Mail size={17} />
            </IconButton>
          </div>
        </Card>

        <Card title="Glass rings" description="Brand / KPI badges" padded>
          <div className="preview-row preview-row--rings">
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="sky" active>
                <I.Sparkles size={20} />
              </GlassRing>
              <span>Brand</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="mint" soft>
                <I.Check size={20} />
              </GlassRing>
              <span>OK</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="lavender" active>
                <I.Bell size={20} />
              </GlassRing>
              <span>Alert</span>
            </div>
            <div className="preview-ring-cell">
              <GlassRing size={52} tone="peach" soft>
                <I.Wallet size={20} />
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
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </Card>

        <Card title="Form field" description="Search input chrome" padded>
          <div className="icon-style-field glass sheen">
            <I.Search size={17} />
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
              <I.Info size={16} /> Nightly job finished with no blockers.
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
  const [focus, setFocus] = useState("soft-stroke");

  return (
    <div className="icon-styles-page">
      <header className="page-header">
        <div>
          <h1>Icon style lab</h1>
          <p>
            Five handmade Soft UI icon languages — same glyphs, different paint.
            Compare them in real kit chrome (buttons, rings, nav, forms) and pick
            a direction. This page is on the <code>explore/icon-styles</code> branch only.
          </p>
        </div>
        <Badge tone="accent">5 styles · scratch set</Badge>
      </header>

      <Card className="icon-styles-picker glass sheen">
        <p className="catalog-count" style={{ marginTop: 0 }}>
          Jump to a style · current focus: <strong>{ICON_STYLES.find((s) => s.id === focus)?.name}</strong>
        </p>
        <div className="catalog-filters" role="tablist" aria-label="Icon styles">
          {ICON_STYLES.map((style) => (
            <a
              key={style.id}
              href={`#style-${style.id}`}
              role="tab"
              aria-selected={focus === style.id}
              className={`theme-chip${focus === style.id ? " is-active" : ""}`}
              onClick={() => setFocus(style.id)}
            >
              {style.name}
            </a>
          ))}
        </div>
        <div className="icon-styles-compare-row">
          {ICON_STYLES.map((style) => (
            <button
              key={style.id}
              type="button"
              className={`icon-styles-compare-chip${focus === style.id ? " is-active" : ""}`}
              onClick={() => {
                setFocus(style.id);
                document.getElementById(`style-${style.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <SoftIcon name="sparkles" styleId={style.id} size={20} />
              <SoftIcon name="search" styleId={style.id} size={20} />
              <SoftIcon name="bell" styleId={style.id} size={20} />
              <span>{style.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="icon-styles-stack">
        {ICON_STYLES.map((style) => (
          <StyleShowcase key={style.id} style={style} />
        ))}
      </div>
    </div>
  );
}
