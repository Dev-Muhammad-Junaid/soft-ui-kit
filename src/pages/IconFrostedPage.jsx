import { useState } from "react";
import {
  SoftFrostedCatalog,
  FROSTED_ICON_KEYS,
  FROSTED_STANDARDS,
} from "../components/icons/soft/SoftComplexIcon";
import { Badge, Card, Switch } from "../components/ui";

export function IconFrostedPage() {
  const [complexAnimate, setComplexAnimate] = useState(true);

  return (
    <div className="icon-styles-page">
      <header className="page-header">
        <div>
          <h1>Frosted SoftMark lab</h1>
          <p>
            Standalone Bare glass-mark catalog for review on this branch only. Production Soft UI
            Kit icons stay Phosphor on <code>main</code> — this set is not a kit export.
          </p>
        </div>
        <div className="icon-styles-page__controls">
          <Switch
            checked={complexAnimate}
            onCheckedChange={setComplexAnimate}
            label="Idle FX"
          />
          <Badge tone="accent">{FROSTED_ICON_KEYS.length} marks</Badge>
        </div>
      </header>

      <Card
        className="icon-styles-lab-note glass"
        title="Lab, not product"
        description="explore/icons-frosted · draft PR #4 · do not merge to main · do not publish npm"
      >
        <p className="frosted-standards__hint">
          Language notes: <code>docs/icon-lab-frosted.md</code>. Validate with{" "}
          <code>npm run validate:frosted</code>. Theme FAB recolors via <code>--accent</code>.
        </p>
      </Card>

      <Card
        className="icon-styles-complex glass sheen"
        title="Bare SoftMark set"
        description={`${FROSTED_ICON_KEYS.length} marks · shaped / stroke frosted glass · Taste accent`}
      >
        <div className="icon-styles-complex__label" style={{ marginBottom: 8 }}>
          <Badge tone="accent">frosted · bare</Badge>
          <span>Nav · actions · people · comms · data · content · system</span>
        </div>
        <SoftFrostedCatalog size={48} animate={complexAnimate} version="bare" />
      </Card>

      <Card
        className="icon-styles-standards glass sheen"
        title="Language rules"
        description="Apply to every new Bare mark before calling the lab done."
      >
        <div className="frosted-standards">
          <ul className="frosted-standards__rules">
            <li>
              <strong>ViewBox</strong> {FROSTED_STANDARDS.viewBox}; safe area ~6–42
            </li>
            <li>
              <strong>Glyph inset</strong> ~{FROSTED_STANDARDS.glyphInset.min}–
              {FROSTED_STANDARDS.glyphInset.max}; stroke {FROSTED_STANDARDS.strokeWidth.min}–
              {FROSTED_STANDARDS.strokeWidth.max}
            </li>
            <li>
              <strong>Layers</strong> {FROSTED_STANDARDS.layers.join(" → ")}
            </li>
            <li>
              <strong>Language</strong> SoftMark / SoftStrokeMark — not plate-off TileMarks
            </li>
            <li>
              <strong>Color</strong> <code>currentColor</code> (<code>--accent</code>) +{" "}
              <code>--soft-cx-*</code> · core accent on interior detail
            </li>
          </ul>
          <ol className="frosted-standards__checklist">
            {FROSTED_STANDARDS.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </Card>
    </div>
  );
}
