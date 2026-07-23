import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "../components/ui";
import { useTheme } from "../theme/ThemeProvider";
import { SAAS_PRESETS } from "../theme/presets";

export function SaasHubPage() {
  const { themes } = useTheme();

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>SaaS samples</h1>
          <p>
            Separate product surfaces with distinct components and charts. Each
            kit opens with its suggested taste already applied — use the refresh
            control to reset, or Theme / Taste FABs to explore.
          </p>
        </div>
      </header>

      <div className="saas-hub-grid">
        {Object.values(SAAS_PRESETS).map((preset) => {
          const themeName = themes.find((t) => t.id === preset.suggestedTheme)?.name;
          return (
            <Card key={preset.id} className="is-hoverable saas-hub-card" padded>
              <span className="ui-badge ui-badge--accent">{themeName}</span>
              <h3 style={{ margin: "12px 0 6px", fontSize: 20, letterSpacing: "-0.02em" }}>
                {preset.name}
              </h3>
              <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 14, lineHeight: 1.45 }}>
                {preset.tagline}. {preset.why}
              </p>
              <div className="row" style={{ marginTop: 18 }}>
                <Link className="ui-btn ui-btn--primary ui-btn--sm" to={preset.path}>
                  Open <ArrowRight size={14} />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
