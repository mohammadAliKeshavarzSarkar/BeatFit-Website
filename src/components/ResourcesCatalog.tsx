import { useEffect, useMemo, useRef, useState } from "react";
import { BeatfitCta } from "./BeatfitCta";
import { ResourcesSearchIcon } from "./animations";
import {
  resourcesCatalog,
  type ResourceCategory,
} from "../content/resources";

export function ResourcesCatalog() {
  const [active, setActive] = useState<ResourceCategory>("all");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const items = useMemo(() => {
    const q = query.trim();
    return resourcesCatalog.items.filter((item) => {
      const byCategory = active === "all" || item.category === active;
      if (!byCategory) return false;
      if (!q) return true;
      return item.title.includes(q) || item.body.includes(q) || item.tag.includes(q);
    });
  }, [active, query]);

  return (
    <section
      className="bf-resources-catalog"
      aria-labelledby="resources-catalog-title"
    >
      <h2 id="resources-catalog-title" className="sr-only">
        مقالات و راهنماهای تمرین و پایش ضربان قلب
      </h2>

      <div className="bf-resources-catalog__shell">
        <div
          className={`bf-resources-catalog__toolbar${
            searchOpen ? " is-search-open" : ""
          }`}
          dir="rtl"
        >
          <div className="bf-resources-catalog__toolbar-row">
            <div className="bf-resources-catalog__filters">
              <div className="bf-resources-catalog__filters-track">
                <div
                  className="bf-resources-catalog__tabs"
                  role="tablist"
                  aria-label="دسته‌بندی مطالب"
                >
                  {resourcesCatalog.filters.map((filter) => {
                    const isActive = active === filter.id;
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={
                          isActive
                            ? "bf-resources-catalog__tab is-active"
                            : "bf-resources-catalog__tab"
                        }
                        onClick={() => setActive(filter.id)}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
                <div
                  className="bf-resources-catalog__rule"
                  aria-hidden="true"
                />
              </div>
            </div>

            <button
              type="button"
              className="bf-resources-catalog__search-toggle"
              aria-expanded={searchOpen}
              aria-controls="resources-catalog-search"
              onClick={() => setSearchOpen((open) => !open)}
            >
              <ResourcesSearchIcon
                className="bf-resources-catalog__search-glyph"
                active={searchOpen}
              />
              <span className="sr-only">{resourcesCatalog.searchPlaceholder}</span>
            </button>

            <label
              id="resources-catalog-search"
              className="bf-resources-catalog__search"
            >
              <span className="sr-only">{resourcesCatalog.searchPlaceholder}</span>
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={resourcesCatalog.searchPlaceholder}
                dir="rtl"
              />
              <ResourcesSearchIcon
                className="bf-resources-catalog__search-glyph"
                active={searchOpen || query.length > 0}
              />
            </label>
          </div>
        </div>

        <div className="bf-resources-catalog__grid">
          {items.map((item) => (
            <article key={item.id} className="bf-resources-card">
              <a
                className="bf-resources-card__media"
                href={item.href}
                tabIndex={-1}
                aria-hidden="true"
              >
                {"image" in item ? (
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </a>

              <div className="bf-resources-card__body" dir="rtl">
                <div className="bf-resources-card__copy">
                  <span className="bf-resources-card__tag">{item.tag}</span>
                  <h3 className="bf-resources-card__title">
                    <a href={item.href}>{item.title}</a>
                  </h3>
                  <p className="bf-resources-card__text">{item.body}</p>
                </div>

                <BeatfitCta
                  variant="blog-card"
                  className="bf-resources-card__more"
                  href={item.href}
                >
                  {resourcesCatalog.ctaLabel}
                </BeatfitCta>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="bf-resources-catalog__empty" dir="rtl">
            مطلبی با این جستجو پیدا نشد.
          </p>
        ) : null}
      </div>
    </section>
  );
}
