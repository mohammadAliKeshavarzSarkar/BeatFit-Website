import {
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import arrowLeft from "react-useanimations/lib/arrowLeft";
import { BeatfitCta } from "./BeatfitCta";
import { BeatfitCtaIconSlot } from "./BeatfitCta";
import { UseAnimationIcon } from "./animations";
import { coachTools } from "../content/coach";

gsap.registerPlugin(Flip);

const FLIP_EASE = "power2.inOut";
const FLIP_DURATION = 0.95;
const REVEAL_EASE = "power3.out";
const EXIT_EASE = "power2.in";

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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Visible gray cards in LTR paint order: [left=third][middle=next][primary].
 * Middle is always active+1 so “next” expands from the middle slot.
 */
function secondaryIndices(active: number, count: number) {
  if (count < 2) return [] as number[];
  const next = (active + 1) % count;
  if (count === 2) return [next];
  const third = (active + 2) % count;
  /* left first, middle second → orders 10, 11 */
  return [third, next];
}

export function CoachTools() {
  const items = coachTools.items;
  const count = items.length;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<gsap.core.Timeline | null>(null);
  const leaveTlRef = useRef<gsap.core.Timeline | null>(null);
  const enterTlRef = useRef<gsap.core.Timeline | null>(null);
  const pendingRef = useRef<number | null>(null);
  const readyRef = useRef(false);

  activeRef.current = active;

  const roleFor = (index: number) => {
    if (index === active) return "primary" as const;
    if (secondaryIndices(active, count).includes(index)) return "secondary" as const;
    return "offstage" as const;
  };

  const applyRoles = (index: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const cards = Array.from(
      deck.querySelectorAll<HTMLElement>("[data-tools-card]"),
    );
    const secs = secondaryIndices(index, count);
    const secSet = new Set(secs);
    cards.forEach((card) => {
      const i = Number(card.dataset.toolsIndex);
      const primary = i === index;
      const secondary = secSet.has(i);
      const secRank = secs.indexOf(i);
      card.classList.toggle("is-primary", primary);
      card.classList.toggle("is-secondary", secondary);
      card.classList.toggle("is-offstage", !primary && !secondary);
      card.style.order = primary ? "30" : secondary ? String(10 + secRank) : "0";
      if (primary) card.setAttribute("aria-current", "true");
      else card.removeAttribute("aria-current");
    });
    deck.setAttribute("data-tools-active", String(index));
  };

  const runContentMotion = (from: number, to: number, dir: number) => {
    const deck = deckRef.current;
    if (!deck) return;

    const fromCard = deck.querySelector<HTMLElement>(
      `[data-tools-index="${from}"]`,
    );
    const toCard = deck.querySelector<HTMLElement>(`[data-tools-index="${to}"]`);

    leaveTlRef.current?.kill();
    enterTlRef.current?.kill();

    /*
      Left (dir < 0) was already solid. Right (dir > 0) was spilling the phone
      horizontally during Flip — keep the same vertical mask recipe for both,
      and never x-shift / scale the media (overflow stays clipped).
    */
    const clipHide = "inset(0% 0% 100% 0%)";
    const clipShow = "inset(0% 0% 0% 0%)";
    const clipEnterFrom = "inset(100% 0% 0% 0%)";
    const slide = dir > 0 ? 1 : -1;

    if (fromCard) {
      const titleInner = fromCard.querySelector<HTMLElement>(
        "[data-tools-title-inner]",
      );
      const masks = Array.from(
        fromCard.querySelectorAll<HTMLElement>("[data-tools-detail]"),
      );
      const textMasks = masks.filter(
        (mask) => !mask.classList.contains("bf-coach-tools__mask--media"),
      );
      const mediaMask = fromCard.querySelector<HTMLElement>(
        ".bf-coach-tools__mask--media",
      );
      const textInners = textMasks
        .map((mask) => mask.querySelector<HTMLElement>("[data-tools-inner]"))
        .filter(Boolean) as HTMLElement[];
      const mediaInner = fromCard.querySelector<HTMLElement>(
        "[data-tools-media-inner]",
      );

      leaveTlRef.current = gsap
        .timeline({ defaults: { ease: EXIT_EASE } })
        .to(
          titleInner,
          { yPercent: slide * -12, duration: 0.34, ease: "power1.out" },
          0,
        )
        .to(titleInner, { yPercent: 0, duration: 0.4, ease: REVEAL_EASE }, 0.3)
        .to(
          textInners,
          { yPercent: slide * -45, duration: 0.38, stagger: 0.045 },
          0.02,
        )
        .to(
          textMasks,
          { clipPath: clipHide, duration: 0.42, stagger: 0.05 },
          0.04,
        )
        .to(
          mediaMask,
          { clipPath: clipHide, duration: 0.42, ease: EXIT_EASE },
          0.06,
        )
        .to(
          mediaInner,
          { yPercent: slide * -18, duration: 0.42, ease: EXIT_EASE },
          0.06,
        );
    }

    if (toCard) {
      const titleInner = toCard.querySelector<HTMLElement>(
        "[data-tools-title-inner]",
      );
      const masks = Array.from(
        toCard.querySelectorAll<HTMLElement>("[data-tools-detail]"),
      );
      const textMasks = masks.filter(
        (mask) => !mask.classList.contains("bf-coach-tools__mask--media"),
      );
      const mediaMask = toCard.querySelector<HTMLElement>(
        ".bf-coach-tools__mask--media",
      );
      const textInners = textMasks
        .map((mask) => mask.querySelector<HTMLElement>("[data-tools-inner]"))
        .filter(Boolean) as HTMLElement[];
      const mediaInner = toCard.querySelector<HTMLElement>(
        "[data-tools-media-inner]",
      );

      gsap.set([titleInner, ...textInners, mediaInner].filter(Boolean), {
        x: 0,
        xPercent: 0,
      });
      gsap.set(titleInner, { yPercent: slide * 36, autoAlpha: 0 });
      gsap.set(textMasks, { clipPath: clipEnterFrom, autoAlpha: 1 });
      gsap.set(textInners, { yPercent: slide * 55, autoAlpha: 1 });
      gsap.set(mediaMask, { clipPath: clipEnterFrom, autoAlpha: 1 });
      gsap.set(mediaInner, { yPercent: slide * 22, scale: 1 });

      const at = FLIP_DURATION * 0.3;

      enterTlRef.current = gsap
        .timeline({ defaults: { ease: REVEAL_EASE } })
        .to(
          titleInner,
          { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: FLIP_EASE },
          at,
        )
        .to(
          textMasks,
          {
            clipPath: clipShow,
            duration: 0.68,
            stagger: 0.06,
            ease: FLIP_EASE,
          },
          at + 0.04,
        )
        .to(
          textInners,
          {
            yPercent: 0,
            duration: 0.68,
            stagger: 0.06,
            ease: FLIP_EASE,
          },
          at + 0.04,
        )
        .to(
          mediaMask,
          { clipPath: clipShow, duration: 0.72, ease: FLIP_EASE },
          at + 0.08,
        )
        .to(
          mediaInner,
          { yPercent: 0, duration: 0.72, ease: FLIP_EASE },
          at + 0.08,
        );
    }
  };

  const animateTo = (next: number) => {
    const deck = deckRef.current;
    if (!deck || next === activeRef.current || next < 0 || next >= count) return;

    const flipActive =
      flipRef.current &&
      "isActive" in flipRef.current &&
      flipRef.current.isActive();
    if (flipActive) {
      pendingRef.current = next;
      return;
    }

    const prev = activeRef.current;
    const forward = (next - prev + count) % count;
    const backward = (prev - next + count) % count;
    const dir = forward <= backward ? 1 : -1;

    const cards = Array.from(
      deck.querySelectorAll<HTMLElement>("[data-tools-card]"),
    );

    if (prefersReducedMotion()) {
      activeRef.current = next;
      applyRoles(next);
      setActive(next);
      cards.forEach((card) => {
        gsap.set(
          card.querySelectorAll(
            "[data-tools-detail], [data-tools-inner], [data-tools-title], [data-tools-title-inner], [data-tools-media-inner]",
          ),
          { clearProps: "opacity,visibility,transform,clipPath" },
        );
      });
      return;
    }

    const state = Flip.getState(cards, {
      props: "borderRadius,backgroundColor,color,opacity",
    });

    activeRef.current = next;
    applyRoles(next);
    setActive(next);

    const leaving = cards.find((card) => Number(card.dataset.toolsIndex) === prev);
    const entering = cards.find((card) => Number(card.dataset.toolsIndex) === next);
    /*
      Forward (green on the right): leave shrinks toward bottom-right and fades out;
      middle card expands from its current gray size into the primary slot.
      Backward mirrors the diagonal.
    */
    if (leaving) {
      gsap.set(leaving, {
        transformOrigin: dir > 0 ? "100% 100%" : "0% 100%",
      });
    }
    if (entering) {
      /* Grow from the card’s own box — not from scale 0. */
      gsap.set(entering, {
        transformOrigin: dir > 0 ? "50% 50%" : "50% 50%",
      });
    }

    flipRef.current?.kill();
    flipRef.current = Flip.from(state, {
      duration: FLIP_DURATION,
      ease: FLIP_EASE,
      absolute: true,
      nested: true,
      props: "borderRadius,backgroundColor,color,opacity",
      onComplete: () => {
        cards.forEach((card) => {
          gsap.set(card, { clearProps: "transformOrigin" });
          if (card.classList.contains("is-primary")) {
            gsap.set(
              card.querySelectorAll(
                "[data-tools-detail], [data-tools-inner], [data-tools-title], [data-tools-title-inner], [data-tools-media-inner]",
              ),
              { clearProps: "opacity,visibility,transform,clipPath" },
            );
          }
        });
        const queued = pendingRef.current;
        pendingRef.current = null;
        if (queued !== null && queued !== activeRef.current) {
          animateTo(queued);
        }
      },
    });

    runContentMotion(prev, next, dir);
  };

  const step = (delta: number) =>
    animateTo((activeRef.current + delta + count) % count);

  useLayoutEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    applyRoles(activeRef.current);
    return () => {
      flipRef.current?.kill();
      leaveTlRef.current?.kill();
      enterTlRef.current?.kill();
    };
  }, []);

  return (
    <section className="bf-coach-tools" aria-labelledby="coach-tools-title">
      <div className="bf-coach-tools__shell">
        <h2 id="coach-tools-title" className="bf-coach-tools__title">
          {coachTools.title}
        </h2>

        <div className="bf-coach-tools__stage">
          <div ref={deckRef} className="bf-coach-tools__deck" data-tools-deck="">
            {items.map((item, index) => {
              const role = roleFor(index);
              const isPrimary = role === "primary";
              const isSecondary = role === "secondary";
              const secRank = secondaryIndices(active, count).indexOf(index);

              return (
                <article
                  key={item.id}
                  data-tools-card={item.id}
                  data-tools-index={index}
                  data-flip-id={item.id}
                  className={[
                    "bf-coach-tools__card",
                    isPrimary ? "is-primary" : "",
                    isSecondary ? "is-secondary" : "",
                    role === "offstage" ? "is-offstage" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{
                    order: isPrimary ? 30 : isSecondary ? 10 + secRank : 0,
                  }}
                  aria-current={isPrimary ? "true" : undefined}
                  aria-hidden={role === "offstage" ? true : undefined}
                  dir="rtl"
                  {...(isSecondary
                    ? {
                        role: "button" as const,
                        tabIndex: 0,
                        onClick: () => animateTo(index),
                        onKeyDown: (event: ReactKeyboardEvent) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            animateTo(index);
                          }
                        },
                        "aria-label": `انتخاب ${item.title}`,
                      }
                    : {})}
                >
                  <div className="bf-coach-tools__primary-main">
                    <div className="bf-coach-tools__primary-copy">
                      <div
                        className="bf-coach-tools__mask bf-coach-tools__mask--title"
                        data-tools-title=""
                      >
                        <h3
                          className="bf-coach-tools__card-title"
                          data-tools-title-inner=""
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div
                        className="bf-coach-tools__mask bf-coach-tools__mask--body"
                        data-tools-detail=""
                      >
                        <p
                          className="bf-coach-tools__card-body"
                          data-tools-inner=""
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                    <div
                      className="bf-coach-tools__mask bf-coach-tools__mask--cta"
                      data-tools-detail=""
                    >
                      <div data-tools-inner="">
                        <BeatfitCta
                          variant="banner-on-dark"
                          className="bf-coach-tools__cta"
                          href={coachTools.ctaHref}
                        >
                          {coachTools.ctaLabel}
                        </BeatfitCta>
                      </div>
                    </div>
                  </div>

                  <figure
                    className="bf-coach-tools__media bf-coach-tools__mask bf-coach-tools__mask--media"
                    data-tools-detail=""
                  >
                    <div className="bf-coach-tools__media-frame" data-tools-inner="">
                      <img
                        className="bf-coach-tools__image"
                        data-tools-media-inner=""
                        src={item.image}
                        alt={isPrimary ? item.imageAlt : ""}
                        width={item.imageWidth}
                        height={item.imageHeight}
                        decoding="async"
                        loading={isPrimary ? "eager" : "lazy"}
                        aria-hidden={isPrimary ? undefined : true}
                      />
                    </div>
                  </figure>

                  <span
                    className="bf-cta bf-cta--icon-circle bf-coach-tools__mini-cta"
                    aria-hidden="true"
                    data-tools-spine=""
                  >
                    <BeatfitCtaIconSlot kind="external" size={20} />
                  </span>
                </article>
              );
            })}
          </div>

          <div className="bf-coach-tools__controls" dir="ltr">
            <button
              type="button"
              className="bf-coach-tools__nav"
              onClick={() => step(-1)}
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
                if (event.key === "ArrowLeft") step(-1);
                if (event.key === "ArrowRight") step(1);
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
              onClick={() => step(1)}
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
