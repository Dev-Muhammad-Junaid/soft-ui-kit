import { useMemo, useState } from "react";
import {
  SoftFrostedCatalog,
  FROSTED_ICON_KEYS,
  FROSTED_STANDARDS,
  FROSTED_VERSIONS,
} from "../components/icons/soft/SoftComplexIcon";
import { Badge, Card, Switch, ToggleGroup } from "../components/ui";

const VERSION_OPTIONS = [
  { value: "tiled", label: "Tiled" },
  { value: "bare", label: "Bare" },
];

export function IconFrostedPage() {
  const [complexAnimate, setComplexAnimate] = useState(true);
  const [version, setVersion] = useState("tiled");

  const versionHint = useMemo(
    () =>
      version === "tiled"
        ? "Original Soft Complex identity — frosted plates and shaped SoftMarks as designed."
        : "SoftMark bare language — shaped / stroke glass marks (Arrow, User, Bell, Chart), not plate-off tiles.",
    [version]
  );

  return (
    <div className="icon-styles-page">
      <header className="page-header">
        <div>
          <h1>Frosted isometric icons</h1>
          <p>
            Soft Complex glass catalog for SaaS, dashboard, and admin chrome — Tiled (origin Soft
            Complex) vs Bare (SoftMark language). Taste accent.
          </p>
        </div>
        <div className="icon-styles-page__controls">
          <div className="icon-styles-page__version" role="group" aria-label="Frosted version">
            <span className="icon-styles-page__version-label">Version</span>
            <ToggleGroup
              value={version}
              onChange={(v) => FROSTED_VERSIONS.includes(v) && setVersion(v)}
              options={VERSION_OPTIONS}
            />
          </div>
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
        title={`Frosted isometric set — ${version}`}
        description={`${FROSTED_ICON_KEYS.length} icons · ${versionHint}`}
      >
        <div className="icon-styles-complex__label" style={{ marginBottom: 8 }}>
          <Badge tone="accent">frosted · {version}</Badge>
          <span>Nav · actions · people · comms · data · content · system</span>
        </div>
        <SoftFrostedCatalog size={48} animate={complexAnimate} version={version} />
      </Card>

      <Card
        className="icon-styles-standards glass sheen"
        title="Frosted standards & review checklist"
        description="Encode once, validate every new icon in BOTH versions before merge."
      >
        <div className="frosted-standards">
          <ul className="frosted-standards__rules">
            <li>
              <strong>ViewBox</strong> {FROSTED_STANDARDS.viewBox}; tile{" "}
              {FROSTED_STANDARDS.tile.x}/{FROSTED_STANDARDS.tile.y}/
              {FROSTED_STANDARDS.tile.w}/{FROSTED_STANDARDS.tile.h}, rx≈
              {FROSTED_STANDARDS.tile.rx}
            </li>
            <li>
              <strong>Glyph inset</strong> ~{FROSTED_STANDARDS.glyphInset.min}–
              {FROSTED_STANDARDS.glyphInset.max}; stroke{" "}
              {FROSTED_STANDARDS.strokeWidth.min}–{FROSTED_STANDARDS.strokeWidth.max}
            </li>
            <li>
              <strong>Layers</strong> {FROSTED_STANDARDS.layers.join(" → ")}
            </li>
            <li>
              <strong>Tiled</strong> Soft Complex plates / shaped marks · <strong>Bare</strong>{" "}
              SoftMark language (not plate-off)
            </li>
            <li>
              <strong>Colors</strong> core / face / rim / spec / frost / mark / cut —
              theme via <code>currentColor</code> (<code>--accent</code>) +{" "}
              <code>--soft-cx-*</code>
            </li>
          </ul>
          <ol className="frosted-standards__checklist">
            {FROSTED_STANDARDS.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p className="frosted-standards__hint">
            Structural audit: <code>npm run validate:frosted</code> · review both toggle states on
            this page for every icon.
          </p>
        </div>
      </Card>
    </div>
  );
}
