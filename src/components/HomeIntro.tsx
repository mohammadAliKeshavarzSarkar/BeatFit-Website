import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  markHomeIntroSeen,
  setHomeIntroActive,
  shouldPlayHomeIntro,
} from "../lib/homeIntroGate";
import { mountOneStrokeLogo } from "../lib/oneStrokeLogo";

const LOGO_SRC = "/assets/brand/beatfit-logo.svg";

function preloadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

type HomeIntroProps = {
  onDone?: () => void;
};

/**
 * First-visit home overlay — not a route.
 * Keeps the real home shell hidden until the stroke settles, then hands off.
 */
export function HomeIntro({ onDone }: HomeIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [active, setActive] = useState(() => shouldPlayHomeIntro());

  useEffect(() => {
    if (!active) {
      onDoneRef.current?.();
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    let disposed = false;
    let engineDispose: (() => void) | undefined;

    setHomeIntroActive(true);

    gsap.fromTo(
      root,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.28, ease: "power2.out" },
    );

    let faded = false;
    const finish = () => {
      if (faded || disposed) return;
      faded = true;
      markHomeIntroSeen();

      const stage = root.querySelector<SVGElement>("[data-stage]");
      const tl = gsap.timeline({
        onComplete: () => {
          setHomeIntroActive(false);
          setActive(false);
          onDoneRef.current?.();
        },
      });

      if (stage) {
        tl.to(
          stage,
          {
            scale: 0.9,
            y: -18,
            duration: 0.5,
            ease: "power2.inOut",
            transformOrigin: "50% 45%",
          },
          0,
        );
      }
      tl.to(
        root,
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.06,
      );
    };

    (async () => {
      try {
        await preloadImage(LOGO_SRC);
      } catch {
        /* engine still attempts load */
      }
      if (disposed) return;

      engineDispose = mountOneStrokeLogo(root, {
        image: LOGO_SRC,
        draw: 2.1,
        line: 1.35,
        fill: true,
        bounce: 1,
        speed: 1.25,
        rest: 0.55,
        loop: false,
        period: true,
        onRest: finish,
      });
    })();

    return () => {
      disposed = true;
      engineDispose?.();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className="bf-home-intro"
      role="dialog"
      aria-modal="true"
      aria-label="بیت‌فیت"
      data-home-intro=""
    >
      <div className="bf-home-intro__glow" aria-hidden="true" />
      <div className="bf-home-intro__scena" data-scena="">
        <svg
          className="bf-home-intro__stage"
          data-stage=""
          role="img"
          aria-label="BeatFit"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs data-defs="" />
          <g data-world="">
            <g data-picture="" />
            <g data-pieces="" />
            <g data-links="" />
            <path className="bf-home-intro__glint" data-glint="" />
            <g data-nib="">
              <rect className="bf-home-intro__nib" data-nib-rect="" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
