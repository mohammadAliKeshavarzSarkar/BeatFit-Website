import { useMemo, useState } from "react";
import { faq } from "../content/home";
import { Container, Section } from "../ui";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`bf-faq__chevron${open ? " is-open" : ""}`}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zM16.5 16.5 21 21"
      />
    </svg>
  );
}

function normalizeSearch(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function Faq() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const normalized = normalizeSearch(query);
    if (!normalized) return faq.items;

    return faq.items.filter((item) => {
      const haystack = normalizeSearch(`${item.question} ${item.answer}`);
      return haystack.includes(normalized);
    });
  }, [query]);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <Section id="faq" labelledBy="faq-title" className="bf-faq-section">
      <Container wide>
        <div className="bf-faq" dir="rtl">
          <header className="bf-faq__head">
            <h2 id="faq-title" className="bf-faq__title">
              {faq.title}
            </h2>
            <p className="bf-faq__subtitle">{faq.subtitle}</p>
          </header>

          <label className="bf-faq__search" htmlFor="faq-search">
            <SearchIcon />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={faq.searchPlaceholder}
              autoComplete="off"
              enterKeyHint="search"
            />
            {query ? (
              <button
                type="button"
                className="bf-faq__search-clear"
                onClick={() => setQuery("")}
                aria-label={faq.clearLabel}
              >
                ×
              </button>
            ) : null}
          </label>

          <div className="bf-faq__list" role="list">
            {filteredItems.map((item) => {
              const isOpen = openId === item.id;

              return (
                <article key={item.id} className="bf-faq__item" role="listitem">
                  <h3 className="bf-faq__question">
                    <button
                      type="button"
                      className="bf-faq__trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <span>{item.question}</span>
                      <ChevronIcon open={isOpen} />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${item.id}`}
                    className={`bf-faq__panel${isOpen ? " is-open" : ""}`}
                    aria-hidden={!isOpen}
                  >
                    <div className="bf-faq__panel-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredItems.length === 0 ? (
            <p className="bf-faq__empty">{faq.emptyLabel}</p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
