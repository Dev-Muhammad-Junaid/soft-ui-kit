import { useMemo, useState } from "react";
import clsx from "clsx";

export function Badge({ children, tone = "neutral", className }) {
  return <span className={clsx("ui-badge", `ui-badge--${tone}`, className)}>{children}</span>;
}

export function Avatar({ name, src, size = "md", className }) {
  const initials = name
    ?.split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className={clsx("ui-avatar", `ui-avatar--${size}`, className)} title={name}>
      {src ? <img src={src} alt={name} /> : initials}
    </span>
  );
}

export function Table({ columns, rows, className }) {
  return (
    <div className={clsx("ui-table-wrap", className)}>
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DataTable({ columns, rows, className, selectable = false, onSelectionChange }) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [selected, setSelected] = useState(() => new Set());

  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort]);

  function toggleSort(key) {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" },
    );
  }

  function toggleRow(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onSelectionChange?.([...next]);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => {
      const next = prev.size === rows.length ? new Set() : new Set(rows.map((r) => r.id));
      onSelectionChange?.([...next]);
      return next;
    });
  }

  return (
    <div className={clsx("ui-table-wrap", className)}>
      <table className="ui-table ui-data-table">
        <thead>
          <tr>
            {selectable ? (
              <th className="ui-data-table__check">
                <input
                  type="checkbox"
                  checked={selected.size === rows.length && rows.length > 0}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
            ) : null}
            {columns.map((col) => (
              <th key={col.key}>
                {col.sortable ? (
                  <button type="button" className="ui-data-table__sort" onClick={() => toggleSort(col.key)}>
                    {col.label}
                    <span aria-hidden="true">
                      {sort.key === col.key ? (sort.dir === "asc" ? " ↑" : " ↓") : " ↕"}
                    </span>
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={clsx(selected.has(row.id) && "is-selected")}>
              {selectable ? (
                <td className="ui-data-table__check">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                    aria-label={`Select ${row.id}`}
                  />
                </td>
              ) : null}
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Carousel({ items = [], className }) {
  const [index, setIndex] = useState(0);
  const count = items.length || 1;
  const item = items[index];
  return (
    <div className={clsx("ui-carousel glass sheen", className)}>
      <div className="ui-carousel__frame">{item}</div>
      <div className="ui-carousel__nav">
        <button type="button" onClick={() => setIndex((i) => (i - 1 + count) % count)}>
          Prev
        </button>
        <span>
          {items.length === 0 ? 0 : index + 1}/{items.length}
        </span>
        <button type="button" onClick={() => setIndex((i) => (i + 1) % count)}>
          Next
        </button>
      </div>
    </div>
  );
}

const WEEKDAYS = [
  { key: "sun", label: "S" },
  { key: "mon", label: "M" },
  { key: "tue", label: "T" },
  { key: "wed", label: "W" },
  { key: "thu", label: "T" },
  { key: "fri", label: "F" },
  { key: "sat", label: "S" },
];

export function Calendar({ value, onChange, className }) {
  const base = value ? new Date(value) : new Date();
  const year = base.getFullYear();
  const month = base.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: first + days }, (_, i) => {
    if (i < first) return null;
    return i - first + 1;
  });

  return (
    <div className={clsx("ui-calendar glass sheen", className)}>
      <div className="ui-calendar__head">
        {base.toLocaleString("default", { month: "long", year: "numeric" })}
      </div>
      <div className="ui-calendar__grid">
        {WEEKDAYS.map((d) => (
          <span key={d.key} className="ui-calendar__dow">
            {d.label}
          </span>
        ))}
        {cells.map((day, i) =>
          day == null ? (
            <span key={`e-${i}`} />
          ) : (
            <button
              key={day}
              type="button"
              className={clsx(
                "ui-calendar__day",
                value === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` &&
                  "is-active",
              )}
              onClick={() =>
                onChange?.(`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`)
              }
            >
              {day}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
