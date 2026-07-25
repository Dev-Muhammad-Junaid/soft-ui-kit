import { useMemo, useState } from "react";
import clsx from "clsx";

/**
 * Autumn-style pixel / dot-matrix column chart.
 * Filled cells = value; empty cells = light grid texture.
 */
export function DotMatrixChart({
  series,
  labels,
  max = 400,
  rows = 20,
  /** Optional override. Defaults to theme/Taste `--accent`. */
  accent,
  formatTooltip,
  className,
}) {
  const [active, setActive] = useState(null);
  const cols = series.length;
  const step = max / rows;

  const grid = useMemo(
    () =>
      series.map((value) => {
        const filled = Math.max(0, Math.min(rows, Math.round(value / step)));
        return { value, filled };
      }),
    [series, rows, step],
  );

  const yTicks = [max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25)];

  return (
    <div
      className={clsx("dot-chart", className)}
      style={{
        "--dot-cols": cols,
        "--dot-rows": rows,
        ...(accent ? { "--dot-accent": accent } : null),
      }}
    >
      <div className="dot-chart__body">
        <div className="dot-chart__y" aria-hidden="true">
          {yTicks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div
          className="dot-chart__plot"
          onMouseLeave={() => setActive(null)}
        >
          {grid.map((col, ci) => (
            <button
              key={labels[ci] || ci}
              type="button"
              className={clsx("dot-chart__col", active === ci && "is-active")}
              onMouseEnter={() => setActive(ci)}
              onFocus={() => setActive(ci)}
              aria-label={`${labels[ci]}: ${col.value}`}
            >
              {Array.from({ length: rows }, (_, ri) => {
                const fromTop = ri;
                const fillFromTop = rows - col.filled;
                const isFilled = fromTop >= fillFromTop;
                return (
                  <span
                    key={ri}
                    className={clsx("dot-chart__cell", isFilled && "is-filled")}
                    style={{ animationDelay: `${(ci * 18 + (rows - ri) * 6) * 0.4}ms` }}
                  />
                );
              })}
            </button>
          ))}

          {active != null ? (
            <>
              <div
                className="dot-chart__guide"
                style={{
                  left: `calc(${(active + 0.5) / cols} * 100%)`,
                }}
              />
              <div
                className="dot-chart__tooltip"
                style={{
                  left: `calc(${(active + 0.5) / cols} * 100%)`,
                }}
              >
                {formatTooltip
                  ? formatTooltip(labels[active], series[active], active)
                  : `${labels[active]} · ${series[active]}`}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="dot-chart__x">
        <span className="dot-chart__y-spacer" aria-hidden="true" />
        <div className="dot-chart__x-labels">
          {labels.map((label, i) => (
            <span key={label} className={clsx(active === i && "is-active")}>
              {active === i ? <em>{label}</em> : label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SegmentedBar({ segments, className }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div className={clsx("seg-bar", className)}>
      <div className="seg-bar__track">
        {segments.map((seg) => (
          <div
            key={seg.id || seg.label}
            className="seg-bar__chunk"
            style={{
              width: `${(seg.value / total) * 100}%`,
              background: seg.color,
            }}
            title={`${seg.label}: ${seg.value}%`}
          />
        ))}
      </div>
      <ul className="seg-bar__legend">
        {segments.map((seg) => (
          <li key={seg.id || seg.label}>
            <i style={{ background: seg.color }} />
            <span>{seg.label}</span>
            <strong>{seg.value}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TimelineBar({ markers, className, stripedTail = true }) {
  return (
    <div className={clsx("timeline-bar", className)}>
      <div className="timeline-bar__track">
        {markers.map((m, i) => (
          <div
            key={m.id || m.label}
            className="timeline-bar__seg"
            style={{
              flex: m.weight || 1,
              background: m.color || "hsl(210 80% 70%)",
              opacity: 0.55 + i * 0.12,
            }}
          />
        ))}
        {stripedTail ? <div className="timeline-bar__tail" /> : null}
      </div>
      <div className="timeline-bar__marks">
        {markers.map((m) => (
          <div key={m.id || m.label} className="timeline-bar__mark" style={{ left: m.at }}>
            <span>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
