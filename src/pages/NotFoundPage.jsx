import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";

export function NotFoundPage() {
  return (
    <div className="catalog-page">
      <Card title="Page not found" description="That route is not part of the Soft UI Kit demo.">
        <p style={{ margin: "0 0 16px", color: "var(--ink-muted)" }}>
          Try the UI Kit catalog, charts, or SaaS samples.
        </p>
        <div className="row">
          <Link className="ui-btn ui-btn--primary ui-btn--sm" to="/ui">
            UI Kit
          </Link>
          <Link className="ui-btn ui-btn--outline ui-btn--sm" to="/charts">
            Charts
          </Link>
          <Button type="button" size="sm" variant="ghost" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
}
