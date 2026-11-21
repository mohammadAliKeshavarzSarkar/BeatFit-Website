import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import type { Animation } from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import target from "react-useanimations/lib/target";
import thermometer from "react-useanimations/lib/thermometer";
import { hero } from "../content/home";
import { UseAnimationIcon } from "./animations";

gsap.registerPlugin(Flip);

const HERO_PROOF_ANIMS: Record<(typeof hero.proof)[number]["icon"], Animation> =
  {
    activity,
    target,
    thermometer,
  };

/** Soft Folio-like settle — long ease-out so the page feels weighted. */
const FLIP_EASE = "power2.inOut";
const FLIP_DURATION = 0.95;
const REVEAL_EASE = "power3.out";
const EXIT_EASE = "power2.in";
const HOVER_LOCK = 0.36;
const HOVER_INTENT = 0.08;

type PanelBits = {
  item: HTMLElement;
  spine: HTMLElement | null;
  page: HTMLElement | null;
  head: HTMLElement | null;
  metric: HTMLElement | null;
  leaveTl: gsap.core.Timeline | null;
  enterTl: gsap.core.Timeline | null;
};

/**
 * Compact Folio/ARCO-style Flip accordion for hero proof metrics.
 * Flip resizes the shells; leave/enter timelines hand inner content softly.
 */
export function HeroProofRail() {
  const bookRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const flipRef = useRef<gsap.core.Timeline | null>(null);
  const intentRef = useRef<gsap.core.Tween | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  activeRef.current = active;

  useEffect(() => {
    const book = bookRef.current;
    if (!book) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const panels: PanelBits[] = Array.from(
      book.querySelectorAll<HTMLElement>(".bf-hero-proof"),
    ).map((item) => ({
      item,
      spine: item.querySelector<HTMLElement>(".bf-hero-proof__spine"),
      page: item.querySelector<HTMLElement>(".bf-hero-proof__page"),
      head: item.querySelector<HTMLElement>(".bf-hero-proof__head"),
      metric: item.querySelector<HTMLElement>(".bf-hero-proof__metric"),
      leaveTl: null,
      enterTl: null,
    }));

    const resetPanel = (panel: PanelBits, open: boolean) => {
      panel.leaveTl?.kill();
      panel.enterTl?.kill();
      panel.leaveTl = null;
      panel.enterTl = null;
      gsap.set(panel.spine, { autoAlpha: open ? 0 : 1, y: 0 });
      gsap.set(panel.page, { autoAlpha: open ? 1 : 0, xPercent: 0 });
      gsap.set(panel.head, { autoAlpha: open ? 1 : 0, y: 0 });
      gsap.set(panel.metric, { autoAlpha: open ? 1 : 0, y: 0 });
    };

    panels.forEach((panel, i) => resetPanel(panel, i === activeRef.current));

    const leave = (panel: PanelBits, dir: number) => {
      panel.leaveTl?.kill();
      panel.enterTl?.kill();

      panel.leaveTl = gsap
        .timeline({ defaults: { ease: EXIT_EASE } })
        .to(
          [panel.head, panel.metric].filter(Boolean),
          { autoAlpha: 0, y: dir * -6, duration: 0.22, stagger: 0.04 },
          0,
        )
        .to(
          panel.page,
          { autoAlpha: 0, xPercent: dir * -6, duration: 0.38 },
          0.04,
        )
        .to(
          panel.spine,
          { autoAlpha: 1, duration: 0.55, ease: REVEAL_EASE },
          FLIP_DURATION * 0.38,
        );
    };

    const enter = (panel: PanelBits, dir: number) => {
      panel.leaveTl?.kill();
      panel.enterTl?.kill();

      gsap.set(panel.page, { autoAlpha: 0, xPercent: dir * 8 });
      gsap.set(panel.head, { autoAlpha: 0, y: 10 });
      gsap.set(panel.metric, { autoAlpha: 0, y: 14 });
      gsap.set(panel.spine, { autoAlpha: 1 });

      const at = FLIP_DURATION * 0.22;

      panel.enterTl = gsap
        .timeline({ defaults: { ease: REVEAL_EASE } })
        .to(panel.spine, { autoAlpha: 0, duration: 0.28, ease: "power1.out" }, 0)
        .to(
          panel.page,
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: FLIP_DURATION * 0.95,
            ease: FLIP_EASE,
          },
          0.06,
        )
        .to(panel.head, { autoAlpha: 1, y: 0, duration: 0.55 }, at)
        .to(panel.metric, { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.08);
    };

    const go = (index: number) => {
      if (index === activeRef.current || !panels[index]) return;

      const from = panels[activeRef.current];
      const to = panels[index];
      const dir = index > activeRef.current ? 1 : -1;
      const items = panels.map((panel) => panel.item);
      const state = Flip.getState(items, {
        props: "borderRadius,backgroundColor,borderColor",
      });

      activeRef.current = index;
      setActive(index);

      panels.forEach((panel, i) => {
        const open = i === index;
        panel.item.classList.toggle("is-active", open);
        const btn = panel.item.querySelector<HTMLButtonElement>(
          ".bf-hero-proof__hit",
        );
        if (btn) {
          btn.setAttribute("aria-expanded", String(open));
          btn.tabIndex = open ? 0 : -1;
        }
        if (panel.page) panel.page.inert = !open;
      });

      if (reduce) {
        panels.forEach((panel, i) => resetPanel(panel, i === index));
        return;
      }

      flipRef.current?.kill();
      flipRef.current = Flip.from(state, {
        duration: FLIP_DURATION,
        ease: FLIP_EASE,
        absolute: true,
        props: "borderRadius,backgroundColor,borderColor",
      });

      leave(from, dir);
      enter(to, dir);
    };

    const hoveredIndex = () => {
      if (!pointerRef.current) return -1;
      const hit = document.elementFromPoint(
        pointerRef.current.x,
        pointerRef.current.y,
      );
      const item = hit?.closest<HTMLElement>(".bf-hero-proof");
      return item ? panels.findIndex((panel) => panel.item === item) : -1;
    };

    const resolveHover = () => {
      intentRef.current?.kill();
      const locked = flipRef.current?.isActive()
        ? Math.max(HOVER_LOCK - (flipRef.current.time() || 0), 0)
        : 0;
      intentRef.current = gsap.delayedCall(locked + HOVER_INTENT, () => {
        const index = hoveredIndex();
        if (index > -1) go(index);
      });
    };

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !canHover.matches) return;
      const before = hoveredIndex();
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (hoveredIndex() !== before) resolveHover();
    };

    const onPointerLeave = () => {
      pointerRef.current = null;
      intentRef.current?.kill();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keys: Record<string, number> = {
        ArrowRight: -1,
        ArrowLeft: 1,
        ArrowDown: 1,
        ArrowUp: -1,
      };
      let next: number | null = null;
      if (event.key in keys) {
        next =
          (activeRef.current + keys[event.key] + panels.length) % panels.length;
      }
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = panels.length - 1;
      if (next === null) return;
      event.preventDefault();
      go(next);
      panels[next].item
        .querySelector<HTMLButtonElement>(".bf-hero-proof__hit")
        ?.focus();
    };

    book.addEventListener("pointermove", onPointerMove);
    book.addEventListener("pointerleave", onPointerLeave);
    book.addEventListener("keydown", onKeyDown);

    const clicks = panels.map((panel, i) => {
      const btn = panel.item.querySelector<HTMLButtonElement>(
        ".bf-hero-proof__hit",
      );
      const onClick = () => go(i);
      btn?.addEventListener("click", onClick);
      return { btn, onClick };
    });

    return () => {
      book.removeEventListener("pointermove", onPointerMove);
      book.removeEventListener("pointerleave", onPointerLeave);
      book.removeEventListener("keydown", onKeyDown);
      clicks.forEach(({ btn, onClick }) =>
        btn?.removeEventListener("click", onClick),
      );
      intentRef.current?.kill();
      flipRef.current?.kill();
      panels.forEach((panel) => {
        panel.leaveTl?.kill();
        panel.enterTl?.kill();
      });
    };
  }, []);

  return (
    <ul
      ref={bookRef}
      className="bf-hero__proof"
      aria-label="نمای زنده تمرین"
      data-hero-folio=""
      style={
        { "--bf-hero-proof-count": hero.proof.length } as CSSProperties
      }
    >
      {hero.proof.map((item, index) => {
        const open = active === index;

        return (
          <li
            key={item.id}
            className={open ? "bf-hero-proof is-active" : "bf-hero-proof"}
            data-proof={item.id}
          >
            <button
              type="button"
              className="bf-hero-proof__hit"
              aria-label={item.label}
              aria-expanded={open}
              tabIndex={open ? 0 : -1}
            />

            <div className="bf-hero-proof__spine" aria-hidden="true">
              <span className="bf-hero-proof__icon">
                <UseAnimationIcon
                  animation={HERO_PROOF_ANIMS[item.icon]}
                  size={16}
                  interaction="hover-replay"
                />
              </span>
              <span className="bf-hero-proof__spine-label">{item.spine}</span>
            </div>

            <div
              className="bf-hero-proof__page"
              dir="rtl"
              {...(!open ? { inert: true } : {})}
            >
              <header className="bf-hero-proof__head">
                <span className="bf-hero-proof__icon" aria-hidden="true">
                  <UseAnimationIcon
                    animation={HERO_PROOF_ANIMS[item.icon]}
                    size={16}
                    interaction="hover-replay"
                  />
                </span>
                <span className="bf-hero-proof__label">{item.label}</span>
                {item.live ? (
                  <span className="bf-hero-proof__live">زنده</span>
                ) : null}
              </header>
              <p className="bf-hero-proof__metric">
                <span className="bf-hero-proof__value">{item.value}</span>
                <span className="bf-hero-proof__unit">{item.unit}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
