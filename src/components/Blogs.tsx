import { useEffect, useRef, useState } from "react";
import playPause from "react-useanimations/lib/playPause";
import refresh from "react-useanimations/lib/refresh";
import { BeatfitCta } from "./BeatfitCta";
import { UseAnimationIcon } from "./animations";
import { blogs } from "../content/home";
import { Container, Section, SectionHead } from "../ui";
import { cn } from "../lib/cn";

const AUTOPLAY_MS = 4500;
const SPIN_EXPAND_MS = 320;
const RELOAD_FALLBACK_MS = 1400;
const PROGRAMMATIC_SCROLL_MS = 900;
const SCROLL_SETTLE_MS = 140;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Cross-browser card offset inside a horizontal scroller (Safari-safe). */
function cardScrollLeft(track: HTMLDivElement, card: HTMLElement) {
  const pad =
    Number.parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
  const trackRect = track.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  return Math.max(0, track.scrollLeft + (cardRect.left - trackRect.left) - pad);
}

function scrollCardToStart(
  track: HTMLDivElement,
  card: HTMLElement,
  smooth = true,
) {
  const left = cardScrollLeft(track, card);
  const useSmooth = smooth && !prefersReducedMotion();

  try {
    track.scrollTo({ left, behavior: useSmooth ? "smooth" : "auto" });
  } catch {
    track.scrollLeft = left;
  }

  // Some mobile WebKits ignore smooth scrollTo with snap — hard-set if it didn't move.
  if (useSmooth) {
    window.setTimeout(() => {
      if (Math.abs(track.scrollLeft - left) > 2) {
        track.scrollLeft = left;
      }
    }, PROGRAMMATIC_SCROLL_MS);
  }
}

function supportsScrollEnd() {
  return typeof window !== "undefined" && "onscrollend" in window;
}

export function Blogs() {
  const items = blogs.items.filter((item) => item.published);
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reloadTimerRef = useRef<number | null>(null);
  const programmaticTimerRef = useRef<number | null>(null);
  const scrollSettleTimerRef = useRef<number | null>(null);
  const jumpingRef = useRef(false);
  const programmaticRef = useRef(false);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [reloading, setReloading] = useState(false);
  const count = items.length;
  const isLast = count > 0 && index >= count - 1;

  indexRef.current = index;

  const clearReloadTimer = () => {
    if (reloadTimerRef.current != null) {
      window.clearTimeout(reloadTimerRef.current);
      reloadTimerRef.current = null;
    }
  };

  const clearProgrammaticTimer = () => {
    if (programmaticTimerRef.current != null) {
      window.clearTimeout(programmaticTimerRef.current);
      programmaticTimerRef.current = null;
    }
  };

  const clearScrollSettleTimer = () => {
    if (scrollSettleTimerRef.current != null) {
      window.clearTimeout(scrollSettleTimerRef.current);
      scrollSettleTimerRef.current = null;
    }
  };

  const setProgrammatic = (active: boolean) => {
    programmaticRef.current = active;
    trackRef.current?.classList.toggle("is-programmatic", active);
  };

  useEffect(
    () => () => {
      clearReloadTimer();
      clearProgrammaticTimer();
      clearScrollSettleTimer();
    },
    [],
  );

  // Only run the carousel while the section is on screen (mobile + desktop).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setPlaying(false);
      return;
    }
    if (prefersReducedMotion()) {
      setPlaying(false);
      return;
    }
    setPlaying(true);
  }, [inView]);

  const finishReload = () => {
    const track = trackRef.current;
    jumpingRef.current = false;
    setProgrammatic(false);
    clearReloadTimer();
    clearProgrammaticTimer();
    track?.classList.remove("is-jumping");
    setIndex(0);
    setReloading(false);
    if (inView && !prefersReducedMotion()) setPlaying(true);
  };

  const goTo = (next: number, smooth = true) => {
    if (jumpingRef.current) return;
    const track = trackRef.current;
    if (!track || count < 1) return;
    const clamped = ((next % count) + count) % count;
    const card = track.children[clamped] as HTMLElement | undefined;
    if (!card) return;

    setProgrammatic(true);
    clearProgrammaticTimer();
    setIndex(clamped);
    scrollCardToStart(track, card, smooth);

    const release = () => {
      setProgrammatic(false);
      clearProgrammaticTimer();
    };

    if (supportsScrollEnd()) {
      track.addEventListener("scrollend", release, { once: true });
    }
    programmaticTimerRef.current = window.setTimeout(
      release,
      PROGRAMMATIC_SCROLL_MS,
    );
  };

  const reloadToFirst = () => {
    if (reloading || jumpingRef.current || count < 2) return;
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;

    clearReloadTimer();
    clearProgrammaticTimer();
    jumpingRef.current = true;
    setProgrammatic(true);
    setReloading(true);
    setPlaying(false);
    setIndex(0);

    track.classList.add("is-jumping");

    const onScrollEnd = () => {
      track.removeEventListener("scrollend", onScrollEnd);
      finishReload();
    };
    if (supportsScrollEnd()) {
      track.addEventListener("scrollend", onScrollEnd, { once: true });
    }

    scrollCardToStart(track, first, true);

    reloadTimerRef.current = window.setTimeout(() => {
      track.removeEventListener("scrollend", onScrollEnd);
      scrollCardToStart(track, first, false);
      finishReload();
    }, RELOAD_FALLBACK_MS);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const readIndex = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return 0;
      const pad =
        Number.parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
      const trackRect = track.getBoundingClientRect();
      const anchor = trackRect.left + pad;

      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left - anchor);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    const settleIndex = () => {
      if (jumpingRef.current || programmaticRef.current) return;
      setIndex(readIndex());
    };

    const onScrollEnd = () => settleIndex();

    const onScroll = () => {
      if (jumpingRef.current || programmaticRef.current) return;
      // Safari / older Chromium: no scrollend — debounce settle instead.
      if (supportsScrollEnd()) return;
      clearScrollSettleTimer();
      scrollSettleTimerRef.current = window.setTimeout(
        settleIndex,
        SCROLL_SETTLE_MS,
      );
    };

    const onResize = () => {
      if (jumpingRef.current || programmaticRef.current) return;
      setIndex(readIndex());
    };

    track.addEventListener("scrollend", onScrollEnd);
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => goTo(0, false));
    return () => {
      track.removeEventListener("scrollend", onScrollEnd);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearScrollSettleTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!playing || !inView || reloading || isLast || count < 2) return;
    if (prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, inView, count, reloading, isLast]);

  // On the last card: let the progress fill finish, then stop (no auto-reload).
  useEffect(() => {
    if (!playing || !inView || reloading || !isLast) return;
    if (prefersReducedMotion()) {
      setPlaying(false);
      return;
    }

    const id = window.setTimeout(() => {
      setPlaying(false);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(id);
  }, [playing, inView, reloading, isLast]);

  const atEnd = isLast && !playing;
  const showReload = atEnd || reloading;

  const controlLabel = showReload
    ? blogs.reloadLabel
    : playing
      ? blogs.pauseLabel
      : blogs.playLabel;

  if (count === 0) return null;

  return (
    <Section
      ref={rootRef}
      id="blogs"
      labelledBy="blogs-title"
      className="bf-blogs-section"
    >
      <Container wide>
        <SectionHead
          titleId="blogs-title"
          title={blogs.title}
          subtitle={blogs.subtitle}
        />
      </Container>

      <div className="bf-blogs">
        <div
          className="bf-blogs__track"
          ref={trackRef}
          tabIndex={0}
          dir="ltr"
        >
          {items.map((item) => (
            <article key={item.id} className="bf-blogs__card" dir="rtl">
              <figure className="bf-blogs__media">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width={720}
                  height={560}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="bf-blogs__copy">
                <p className="bf-blogs__eyebrow">{item.eyebrow}</p>
                <h3 className="bf-blogs__card-title">{item.title}</h3>
                <p className="bf-blogs__summary">{item.summary}</p>
                <BeatfitCta
                  variant="blog-card"
                  className="bf-blogs__more"
                  href={item.href}
                  dir="rtl"
                >
                  {blogs.readMore}
                </BeatfitCta>
              </div>
            </article>
          ))}
        </div>

        <div className="bf-blogs__controls" dir="ltr">
          <div
            className="bf-blogs__pager"
            role="tablist"
            aria-label={blogs.pagerLabel}
          >
            {items.map((item, i) => {
              const isActive = i === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${blogs.slideLabel} ${i + 1}`}
                  className={cn(
                    "bf-blogs__dot",
                    isActive ? "is-open" : "is-closed",
                    isActive && playing && !reloading && "is-loading",
                  )}
                  onClick={() => {
                    if (jumpingRef.current) return;
                    setPlaying(false);
                    goTo(i);
                  }}
                >
                  <span
                    key={
                      isActive && playing && !reloading
                        ? `load-${i}-${index}`
                        : `idle-${i}`
                    }
                    className="bf-blogs__dot-fill"
                    aria-hidden="true"
                    style={
                      isActive && playing && !reloading
                        ? {
                            animationDuration: `${AUTOPLAY_MS - SPIN_EXPAND_MS}ms`,
                            animationDelay: `${SPIN_EXPAND_MS}ms`,
                          }
                        : undefined
                    }
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={cn(
              "bf-blogs__play",
              showReload && "is-reload",
              reloading && "is-reloading",
            )}
            aria-label={controlLabel}
            onClick={() => {
              if (showReload) {
                reloadToFirst();
                return;
              }
              setPlaying((prev) => !prev);
            }}
          >
            {showReload ? (
              <UseAnimationIcon
                key={reloading ? "blogs-refresh-active" : "blogs-refresh-idle"}
                animation={refresh}
                size={18}
                autoplay={reloading}
              />
            ) : (
              <UseAnimationIcon
                animation={playPause}
                size={18}
                active={playing}
              />
            )}
          </button>
        </div>
      </div>
    </Section>
  );
}
