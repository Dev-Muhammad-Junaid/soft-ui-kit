import { useState } from "react";
import {
  SoftFrostedCatalog,
  FROSTED_ICON_KEYS,
} from "../components/icons/soft/SoftComplexIcon";
import { Badge, Card, Switch } from "../components/ui";

export function IconFrostedPage() {
  const [complexAnimate, setComplexAnimate] = useState(true);

  return (
    <div className="icon-styles-page">
      <header className="page-header">
        <div>
          <h1>Frosted isometric icons</h1>
          <p>
            Soft Complex glass-material SVG catalog for SaaS, dashboard, and admin chrome —
            layered tiles themed by Taste accent.
          </p>
        </div>
        <div className="icon-styles-page__controls">
          <Switch
            checked={complexAnimate}
            onCheckedChange={setComplexAnimate}
            label="Complex idle FX"
          />
          <Badge tone="accent">{FROSTED_ICON_KEYS.length} icons</Badge>
        </div>
      </header>

      <Card
        className="icon-styles-complex glass sheen"
        title="Frosted isometric set"
        description={`${FROSTED_ICON_KEYS.length} common SaaS / dashboard / admin icons — layered SVG, Taste accent, idle shimmer`}
      >
        <div className="icon-styles-complex__label" style={{ marginBottom: 8 }}>
          <Badge tone="accent">frosted</Badge>
          <span>Nav · actions · people · comms · data · content · system</span>
        </div>
        <SoftFrostedCatalog size={48} animate={complexAnimate} />
      </Card>
    </div>
  );
}
