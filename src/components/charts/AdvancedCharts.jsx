import { useMemo, useState } from "react";
import clsx from "clsx";

/** Calendar-style intensity grid for ops / product heatmaps. */
export function HeatmapChart({
  rows = 7,
  cols = 14,
  values,
  labels = [],
  className = "",
  formatCell = (v) => String(v),
}) {
  const [active, setActive] = useState(null);
  const data = useMemo(() => {
    if (values?.length) return values;
    return Array.from({ length: rows * cols }, (_, i) =>
      Math.round(20 + ((i * 37) % 80)),
    );
  }, [values, rows, cols]);
  const max = Math.max(...data, 1);

  return (
    <div className={clsx("chart chart--heatmap", className)}>
      <div className="chart__meta" aria-live="polite">
        {active != null ? (
          <>
            <strong>{labels[active] ?? `Cell ${active + 1}`}</strong>
            <span>{formatCell(data[active])}</span>
          </>
        ) : (
          <span className="chart__hint">Hover a cell</span>
        )}
      </div>
      <div
        className="heatmap-grid"
        style={{ "--hm-cols": cols }}
        role="img"
        aria-label="Heatmap"
      >
        {data.map((v, i) => {
          const intensity = v / max;
          return (
            <button
              key={i}
              type="button"
              className={clsx("heatmap-cell", active === i && "is-active")}
              style={{ "--hm-i": intensity }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              aria-label={`${labels[i] ?? i}: ${formatCell(v)}`}
            />
          );
        })}
      </div>
    </div>
  );
}

/** Radial progress / KPI ring. */
export function RadialProgress({
  value = 72,
  max = 100,
  size = 160,
  label = "Progress",
  className = "",
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const r = 42;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <div className={clsx("chart chart--radial", className)}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="radial-svg">
        <circle className="radial-track" cx="50" cy="50" r={r} />
        <circle
          className="radial-fill"
          cx="50"
          cy="50"
          r={r}
          strokeDasharray={`${dash} ${c}`}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="48" textAnchor="middle" className="radial-value">
          {Math.round(pct)}%
        </text>
        <text x="50" y="60" textAnchor="middle" className="radial-label">
          {label}
        </text>
      </svg>
    </div>
  );
}

/** Multi-metric radial bars (activity rings style). */
export function RadialBars({
  series = [],
  className = "",
  size = 200,
}) {
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className={clsx("chart chart--radial-bars", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {series.map((s, i) => {
          const r = size * 0.38 - i * (size * 0.1);
          const c = 2 * Math.PI * r;
          const pct = Math.min(100, Math.max(0, s.value));
          const dash = (pct / 100) * c;
          return (
            <g key={s.label}>
              <circle
                className="radial-track"
                cx={cx}
                cy={cy}
                r={r}
                strokeWidth={size * 0.07}
              />
              <circle
                className="radial-fill"
                cx={cx}
                cy={cy}
                r={r}
                strokeWidth={size * 0.07}
                stroke={s.color || `var(--chart-${(i % 4) + 1})`}
                strokeDasharray={`${dash} ${c}`}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            </g>
          );
        })}
      </svg>
      <ul className="radial-bars__legend">
        {series.map((s, i) => (
          <li key={s.label}>
            <i style={{ background: s.color || `var(--chart-${(i % 4) + 1})` }} />
            <span>{s.label}</span>
            <strong>{s.value}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Spider / radar chart for multi-axis scores. */
export function RadarChart({
  axes = [],
  values = [],
  className = "",
  size = 260,
}) {
  const n = axes.length || 1;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.36;

  const poly = useMemo(() => {
    return values
      .map((v, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const r = (Math.min(100, Math.max(0, v)) / 100) * R;
        return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
      })
      .join(" ");
  }, [values, n, cx, cy, R]);

  const rings = [0.33, 0.66, 1];

  return (
    <div className={clsx("chart chart--radar", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rings.map((t) => (
          <polygon
            key={t}
            className="radar-ring"
            points={Array.from({ length: n }, (_, i) => {
              const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
              return `${cx + Math.cos(a) * R * t},${cy + Math.sin(a) * R * t}`;
            }).join(" ")}
          />
        ))}
        {axes.map((label, i) => {
          const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
          const x = cx + Math.cos(a) * (R + 14);
          const y = cy + Math.sin(a) * (R + 14);
          return (
            <g key={label}>
              <line
                className="radar-spoke"
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(a) * R}
                y2={cy + Math.sin(a) * R}
              />
              <text x={x} y={y} textAnchor="middle" className="radar-axis">
                {label}
              </text>
            </g>
          );
        })}
        <polygon className="radar-area" points={poly} />
      </svg>
    </div>
  );
}

/** Conversion funnel stages. */
export function FunnelChart({
  stages = [],
  className = "",
}) {
  const max = Math.max(...stages.map((s) => s.value), 1);
  return (
    <div className={clsx("chart chart--funnel", className)}>
      {stages.map((s, i) => {
        const w = Math.max(28, Math.round((s.value / max) * 100));
        return (
          <div key={s.label} className="funnel-row">
            <div
              className="funnel-bar"
              style={{
                width: `${w}%`,
                background: s.color || `var(--chart-${(i % 4) + 1})`,
              }}
            >
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Simple scatter plot with line hover (nearest point by X). */
export function ScatterChart({
  points = [],
  className = "",
  formatPoint = (p) => `${p.x}, ${p.y}`,
}) {
  const [active, setActive] = useState(null);
  const w = 360;
  const h = 220;
  const pad = 16;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs, 0);
  const maxX = Math.max(...xs, 1);
  const minY = Math.min(...ys, 0);
  const maxY = Math.max(...ys, 1);

  const mapped = useMemo(
    () =>
      points.map((p, i) => ({
        ...p,
        i,
        px: pad + ((p.x - minX) / (maxX - minX || 1)) * (w - pad * 2),
        py: h - pad - ((p.y - minY) / (maxY - minY || 1)) * (h - pad * 2),
      })),
    [points, minX, maxX, minY, maxY],
  );

  const line = mapped.map((p) => `${p.px},${p.py}`).join(" ");

  function nearestIndex(clientX, svg) {
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * w;
    let best = 0;
    let bestDist = Infinity;
    for (const p of mapped) {
      const d = Math.abs(p.px - x);
      if (d < bestDist) {
        bestDist = d;
        best = p.i;
      }
    }
    return best;
  }

  return (
    <div className={clsx("chart chart--scatter", className)}>
      <div className="chart__meta" aria-live="polite">
        {active != null ? (
          <span>{formatPoint(points[active])}</span>
        ) : (
          <span className="chart__hint">Hover the line</span>
        )}
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="scatter-svg"
        role="img"
        onMouseMove={(e) => setActive(nearestIndex(e.clientX, e.currentTarget))}
        onMouseLeave={() => setActive(null)}
      >
        <polyline className="scatter-line" points={line} fill="none" pointerEvents="none" />
        <polyline className="chart-line-hit" points={line} fill="none" pointerEvents="stroke" />
        {active != null ? (
          <line
            className="chart-crosshair"
            x1={mapped[active].px}
            x2={mapped[active].px}
            y1={pad}
            y2={h - pad}
            pointerEvents="none"
          />
        ) : null}
        {mapped.map((p) => (
          <circle
            key={p.i}
            className={clsx("scatter-dot", active === p.i && "is-active")}
            cx={p.px}
            cy={p.py}
            r={active === p.i ? 7 : 5}
            pointerEvents="none"
          />
        ))}
      </svg>
    </div>
  );
}
