import { useMemo, useState } from "react";
import arrowLeft from "react-useanimations/lib/arrowLeft";
import { BeatfitCta } from "./BeatfitCta";
import { BeatfitCtaIconSlot } from "./BeatfitCta";
import { UseAnimationIcon } from "./animations";
import { coachTools } from "../content/coach";

function ArrowIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <span
      className="bf-coach-tools__nav-icon"
      style={dir === "next" ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <UseAnimationIcon animation={arrowLeft} size={22} interaction="hover-replay" />
    </span>
  );
}

export function CoachTools() {
  const items = coachTools.items;
  const count = items.length;
  const [active, setActive] = useState(0);

  /** Primary + next two secondaries */
  const visibleCount = Math.min(3, count);
  const ordered = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, offset) => {
      const index = (active + offset) % count;
      return {
        item: items[index],
        index,
        selected: offset === 0,
      };
    });
  }, [active, count, items, visibleCount]);

  const primary = ordered[0];
  const secondaries = ordered.slice(1);

  const go = (delta: number) => {
    setActive((current) => (current + delta + count) % count);
  };

  const select = (index: number) => {
    setActive(index);
  };

  return (
    <section className="bf-coach-tools" aria-labelledby="coach-tools-title">
      <div className="bf-coach-tools__shell">
        <h2 id="coach-tools-title" className="bf-coach-tools__title">
          {coachTools.title}
        </h2>

        <div className="bf-coach-tools__stage">
          <div className="bf-coach-tools__secondaries" dir="rtl">
            {secondaries.map(({ item, index }) => (
              <button
                key={item.id}
                type="button"
                className="bf-coach-tools__card bf-coach-tools__card--secondary"
                onClick={() => select(index)}
                aria-label={`انتخاب ${item.title}`}
              >
                <h3 className="bf-coach-tools__card-title">{item.title}</h3>
                <span
                  className="bf-cta bf-cta--icon-circle bf-coach-tools__mini-cta"
                  aria-hidden="true"
                >
                  <BeatfitCtaIconSlot kind="external" size={20} />
                </span>
              </button>
            ))}
          </div>

          {primary ? (
            <article
              key={primary.item.id}
              className="bf-coach-tools__card bf-coach-tools__card--primary"
              aria-current="true"
              dir="rtl"
            >
              <div className="bf-coach-tools__primary-copy">
                <h3 className="bf-coach-tools__card-title">{primary.item.title}</h3>
                <p className="bf-coach-tools__card-body">{primary.item.body}</p>
              </div>
              <BeatfitCta
                variant="banner-on-dark"
                className="bf-coach-tools__cta"
                href={coachTools.ctaHref}
              >
                {coachTools.ctaLabel}
              </BeatfitCta>
            </article>
          ) : null}

          <div className="bf-coach-tools__controls" dir="ltr">
            <button
              type="button"
              className="bf-coach-tools__nav"
              onClick={() => go(-1)}
              aria-label="کارت قبلی"
            >
              <ArrowIcon dir="prev" />
            </button>

            <div
              className="bf-coach-tools__scrub"
              role="slider"
              aria-valuemin={1}
              aria-valuemax={count}
              aria-valuenow={active + 1}
              aria-label="موقعیت کارت‌ها"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") go(-1);
                if (event.key === "ArrowRight") go(1);
              }}
            >
              <span
                className="bf-coach-tools__scrub-thumb"
                style={{
                  width: `${100 / count}%`,
                  insetInlineStart: `${(active / count) * 100}%`,
                }}
              />
            </div>

            <button
              type="button"
              className="bf-coach-tools__nav"
              onClick={() => go(1)}
              aria-label="کارت بعدی"
            >
              <ArrowIcon dir="next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
