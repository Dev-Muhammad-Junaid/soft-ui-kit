import { useId, useMemo, useState } from "react";
import clsx from "clsx";

export function BarChart({
  values,
  labels,
  className = "",
  formatValue = (v) => String(v),
}) {
  const [active, setActive] = useState(null);
  const max = Math.max(...values, 1);

  return (
    <div className={clsx("chart chart--bar", className)}>
      <div className="chart__meta" aria-live="polite">
        {active != null ? (
          <>
            <strong>{labels?.[active] ?? `Point ${active + 1}`}</strong>
            <span>{formatValue(values[active])}</span>
          </>
        ) : (
          <span className="chart__hint">Hover a bar</span>
        )}
      </div>
      <div className="chart-bars chart-bars--interactive">
        {values.map((value, i) => {
          const height = Math.max(8, Math.round((value / max) * 100));
          return (
            <button
              key={i}
              type="button"
              className={clsx("chart-bar", active === i && "is-active")}
              style={{
                "--bar-h": `${height}%`,
                animationDelay: `${i * 40 * 1}ms`,
              }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              aria-label={`${labels?.[i] ?? i}: ${formatValue(value)}`}
            >
              <span className="chart-bar__fill chart-bar__fill--anim" />
              <span className="chart-bar__tip">{formatValue(value)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function LineChart({
  values,
  labels,
  className = "",
  formatValue = (v) => String(v),
  fill = false,
}) {
  const [active, setActive] = useState(null);
  const gradId = useId().replace(/:/g, "");
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = Math.max(max - min, 1);
  const w = 320;
  const h = 180;
  const pad = 10;

  const points = useMemo(
    () =>
      values.map((v, i) => {
        const x = pad + (i / Math.max(values.length - 1, 1)) * (w - pad * 2);
        const y = h - pad - ((v - min) / span) * (h - pad * 2);
        return { x, y, v, i };
      }),
    [values, min, span],
  );

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pad},${h - pad} ${line} ${w - pad},${h - pad}`;

  function nearestIndex(clientX, svg) {
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * w;
    let best = 0;
    let bestDist = Infinity;
    for (const p of points) {
      const d = Math.abs(p.x - x);
      if (d < bestDist) {
        bestDist = d;
        best = p.i;
      }
    }
    return best;
  }

  return (
    <div className={clsx("chart chart--line", fill && "chart--area", className)}>
      <div className="chart__meta">
        {active != null ? (
          <>
            <strong>{labels?.[active] ?? `P${active + 1}`}</strong>
            <span>{formatValue(values[active])}</span>
          </>
        ) : (
          <span className="chart__hint">Hover the path</span>
        )}
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="chart-svg"
        role="img"
        onMouseMove={(e) => setActive(nearestIndex(e.clientX, e.currentTarget))}
        onMouseLeave={() => setActive(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {fill ? (
          <polygon className="chart-area" points={area} fill={`url(#${gradId})`} />
        ) : null}
        {/* Wide invisible stroke for easier path hover */}
        <polyline
          className="chart-line-hit"
          points={line}
          fill="none"
          pointerEvents="stroke"
        />
        <polyline className="chart-line" points={line} fill="none" pointerEvents="none" />
        {active != null ? (
          <line
            className="chart-crosshair"
            x1={points[active].x}
            x2={points[active].x}
            y1={pad}
            y2={h - pad}
            pointerEvents="none"
          />
        ) : null}
        {points.map((p) => (
          <circle
            key={p.i}
            className={clsx("chart-dot", active === p.i && "is-active")}
            cx={p.x}
            cy={p.y}
            r={active === p.i ? 6 : 4}
            pointerEvents="none"
          />
        ))}
      </svg>
    </div>
  );
}

export function DonutChart({
  segments,
  className = "",
  centerLabel = "Total",
  centerValue,
}) {
  const [active, setActive] = useState(null);
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className={clsx("chart chart--donut", className)}>
      <div className="donut-wrap">
        <svg viewBox="0 0 120 120" className="donut-svg">
          <circle className="donut-track" cx="60" cy="60" r={r} />
          {segments.map((seg, i) => {
            const len = (seg.value / total) * c;
            const dash = `${len} ${c - len}`;
            const el = (
              <circle
                key={seg.id || seg.label}
                className={clsx("donut-seg", active === i && "is-active")}
                cx="60"
                cy="60"
                r={r}
                stroke={seg.color || `hsl(${(i * 57 + 190) % 360} 75% 55%)`}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ animationDelay: `${i * 80}ms` }}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="donut-center">
          <strong>{active != null ? segments[active].label : centerLabel}</strong>
          <span>
            {active != null
              ? segments[active].value
              : centerValue ?? total}
          </span>
        </div>
      </div>
      <ul className="donut-legend">
        {segments.map((seg, i) => (
          <li
            key={seg.id || seg.label}
            className={clsx(active === i && "is-active")}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <i style={{ background: seg.color || `hsl(${(i * 57 + 190) % 360} 75% 55%)` }} />
            <span>{seg.label}</span>
            <em>{Math.round((seg.value / total) * 100)}%</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Sparkline({ values, className = "" }) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = Math.max(max - min, 1);
  const w = 80;
  const h = 28;
  const points = values
    .map((v, i) => {
      const x = (i / Math.max(values.length - 1, 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={clsx("sparkline", className)} aria-hidden="true">
      <polyline points={points} fill="none" />
    </svg>
  );
}

/** @deprecated prefer BarChart */
export { BarChart as HoverChart };
