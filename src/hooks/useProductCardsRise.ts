import { useEffect, useRef } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type CardMotion = {
  /** Extra delay before this card starts rising (0–1 of its own progress). */
  lag: number;
  startY: number;
  startRotateX: number;
  startScale: number;
  startOpacity: number;
};

const DEFAULT_MOTION: CardMotion = {
  lag: 0,
  startY: 72,
  startRotateX: 18,
  startScale: 0.96,
  startOpacity: 0.4,
};

/**
 * Scroll-linked 3D card rise:
 * cards enter from below (tilted toward camera) and settle face-on.
 * Each card uses its own viewport progress + light inertia.
 */
export function useProductCardsRise(count: number) {
  const cardRefs = useRef<Array<HTMLElement | null>>(Array(count).fill(null));
  const motionRefs = useRef<CardMotion[]>(
    Array.from({ length: count }, (_, index) => ({
      ...DEFAULT_MOTION,
      lag: index * 0.06,
      startY: 72 + index * 8,
      startRotateX: 16 + (index % 2) * 2,
    })),
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let active = true;
    const target = Array(count).fill(0) as number[];
    const smooth = Array(count).fill(0) as number[];

    const readTargets = () => {
      const viewH = window.innerHeight;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        // Begin as the card approaches the viewport; finish once mostly visible
        const raw = (viewH * 0.9 - rect.top) / (viewH * 0.62);
        const lagged = (raw - motionRefs.current[index].lag) / (1 - motionRefs.current[index].lag);
        target[index] = easeOutCubic(clamp(lagged, 0, 1));
      });
    };

    const paint = () => {
      let needsMore = false;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const motion = motionRefs.current[index];
        smooth[index] = lerp(smooth[index], target[index], 0.14);
        const t = smooth[index];

        const y = motion.startY * (1 - t);
        const rotateX = motion.startRotateX * (1 - t);
        const scale = lerp(motion.startScale, 1, t);
        const opacity = lerp(motion.startOpacity, 1, t);

        card.style.opacity = opacity.toFixed(3);
        card.style.transform = [
          `translate3d(0, ${y.toFixed(2)}px, 0)`,
          `rotateX(${rotateX.toFixed(2)}deg)`,
          `scale(${scale.toFixed(4)})`,
        ].join(" ");

        if (Math.abs(smooth[index] - target[index]) > 0.001) needsMore = true;
      });

      if (active && needsMore) {
        raf = window.requestAnimationFrame(paint);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      readTargets();
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) kick();
      },
      { root: null, rootMargin: "25% 0px 25% 0px", threshold: [0, 0.15, 0.4, 0.7, 1] },
    );
    cards.forEach((card) => io.observe(card));

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });

    return () => {
      active = false;
      io.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) window.cancelAnimationFrame(raf);
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = "";
        card.style.opacity = "";
      });
    };
  }, [count]);

  const setCardRef = (index: number) => (node: HTMLElement | null) => {
    cardRefs.current[index] = node;
  };

  return { setCardRef };
}
