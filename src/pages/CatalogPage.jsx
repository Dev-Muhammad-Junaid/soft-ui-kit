import { useMemo, useState } from "react";
import { Search } from "../components/icons";
import {
  COMPONENT_CATEGORIES,
  searchComponents,
} from "../components/ui/registry";
import { Card } from "../components/ui";
import { CatalogPreview } from "./catalog/CatalogPreviews";

export function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const items = useMemo(
    () => searchComponents(query, category),
    [query, category],
  );

  const grouped = useMemo(() => {
    const map = new Map();
    for (const item of items) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category).push(item);
    }
    return map;
  }, [items]);

  return (
    <div className="catalog-page">
      <header className="page-header">
        <div>
          <h1>Component catalog</h1>
          <p>Live previews of every Soft UI Kit primitive.</p>
        </div>
      </header>

      <Card className="catalog-search glass sheen">
        <div className="catalog-search__row">
          <Search size={18} aria-hidden="true" />
          <input
            className="ui-input"
            placeholder="Search buttons, tables, charts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search components"
          />
        </div>
        <div className="catalog-filters" role="tablist">
          {COMPONENT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              className={`theme-chip${category === cat.id ? " is-active" : ""}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <p className="catalog-count">
          {items.length} component{items.length === 1 ? "" : "s"}
        </p>
      </Card>

      {[...grouped.entries()].map(([cat, list]) => (
        <section key={cat} className="catalog-section">
          <h2 className="section-title">{cat}</h2>
          <div className="catalog-grid">
            {list.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="catalog-card glass sheen"
              >
                <h3>{item.name}</h3>
                <div className="catalog-card__preview">
                  <CatalogPreview id={item.id} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {items.length === 0 ? (
        <Card>
          <p style={{ margin: 0, color: "var(--ink-muted)" }}>
            No components match “{query}”.
          </p>
        </Card>
      ) : null}
    </div>
  );
}
