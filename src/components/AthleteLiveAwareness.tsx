import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { athleteLive } from "../content/athlete";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const P0 = 0.05;
const P1 = 0.92;
const SCRUB = 1.15;
const RIDE = 1.35;
const RING_POP = 0.12;
const PAN_FOLLOW = 5.5;
const VB_W = 565;
const VB_H = 1137;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - (1 - clamp01(t)) ** 3;
const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

export function AthleteLiveAwareness() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const corsa = root.querySelector<HTMLElement>("[data-live-corsa]");
      const pin = root.querySelector<HTMLElement>("[data-live-pin]");
      const map = root.querySelector<HTMLElement>("[data-live-map]");
      const spine = root.querySelector<SVGPathElement>("[data-live-spine]");
      const tip = root.querySelector<HTMLElement>("[data-live-tip]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-live-step]");
      const visuals = gsap.utils.toArray<HTMLElement>("[data-live-visual]");
      const copies = gsap.utils.toArray<HTMLElement>("[data-live-copy]");
      const n = athleteLive.steps.length;
      const passo = (P1 - P0) / Math.max(1, n);
      const startAt = (i: number) => P0 + i * passo;

      const prepareStroke = (path: SVGPathElement | null) => {
        if (!path) return 0;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        return len;
      };

      const spineLen = prepareStroke(spine);

      const settle = () => {
        if (spine) spine.style.strokeDashoffset = "0";
        steps.forEach((step) => {
          step.style.opacity = "1";
        });
        visuals.forEach((visual) => {
          visual.style.opacity = "1";
          visual.style.setProperty("--bf-live-rise", "0px");
          visual.style.setProperty("--bf-live-pop", "1");
        });
        copies.forEach((copy) => {
          copy.style.opacity = "1";
          copy.style.setProperty("--bf-live-rise", "0px");
          copy.style.setProperty("--bf-live-shift", "0px");
        });
        if (tip && spine && spineLen) {
          const pt = spine.getPointAtLength(spineLen);
          tip.style.opacity = "1";
          tip.style.left = `${(pt.x / VB_W) * 100}%`;
          tip.style.top = `${(pt.y / VB_H) * 100}%`;
        }
        root.classList.add("is-settled");
      };

      if (reduced) {
        settle();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(max-width: 1100px)", () => {
        settle();
        gsap.from(steps, {
          opacity: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        });
      });

      mm.add("(min-width: 1101px)", () => {
        if (!corsa || !map || !pin) return;

        root.classList.remove("is-settled");
        if (spine) spine.style.strokeDashoffset = `${spineLen}`;
        steps.forEach((step) => {
          step.style.opacity = "1";
        });
        visuals.forEach((visual) => {
          visual.style.opacity = "0";
          visual.style.setProperty("--bf-live-rise", "22px");
          visual.style.setProperty("--bf-live-pop", "0.94");
        });
        copies.forEach((copy, i) => {
          const side = athleteLive.steps[i]?.side;
          const shift = side === "start" ? 18 : -18;
          copy.style.opacity = "0";
          copy.style.setProperty("--bf-live-rise", "16px");
          copy.style.setProperty("--bf-live-shift", `${shift}px`);
        });
        if (tip) tip.style.opacity = "0";

        corsa.style.setProperty("--bf-live-ride", `${320 * RIDE}vh`);

        /** Sticky window uses the available viewport; map keeps natural size and pans. */
        const fitFrame = () => {
          const header = document.querySelector<HTMLElement>(".bf-header");
          const headerH = Math.ceil(header?.getBoundingClientRect().height ?? 96);
          const topGap = 12;
          const bottomGap = 20;
          const pinTop = headerH + topGap;
          const viewH = Math.max(360, window.innerHeight - pinTop - bottomGap);

          pin.style.setProperty("--bf-live-pin-top", `${pinTop}px`);
          pin.style.setProperty("--bf-live-view-h", `${viewH}px`);
          return { pinTop, viewH };
        };

        let frame = fitFrame();
        const cam = { pan: 0, panMeta: 0 };

        const stepBounds = (i: number) => {
          const el = steps[i];
          if (!el) return { top: 0, height: 0 };
          return { top: el.offsetTop, height: el.offsetHeight };
        };

        const targetPanFor = (p: number) => {
          const mapH = map.scrollHeight;
          const viewH = frame.viewH;
          if (mapH <= viewH + 1) return 0;

          const travelStart = startAt(0);
          const travelEnd = startAt(n - 1);
          // Smoothstep softens the camera handoff between steps.
          const t = smoothstep(
            (p - travelStart) / Math.max(0.001, travelEnd - travelStart),
          );
          const idx = t * Math.max(0, n - 1);
          const i0 = Math.floor(idx);
          const i1 = Math.min(n - 1, i0 + 1);
          const local = smoothstep(idx - i0);
          const a = stepBounds(i0);
          const b = stepBounds(i1);
          const top = a.top + (b.top - a.top) * local;
          const height = a.height + (b.height - a.height) * local;
          const pad = 16;
          let pan: number;
          if (height + pad * 2 <= viewH) {
            pan = (viewH - height) / 2 - top;
          } else {
            pan = pad - top;
          }
          return Math.max(viewH - mapH, Math.min(0, pan));
        };

        const placeTip = (pathT: number, opacity: number) => {
          if (!tip || !spine || !spineLen) return;
          const pt = spine.getPointAtLength(spineLen * clamp01(pathT));
          tip.style.left = `${(pt.x / VB_W) * 100}%`;
          tip.style.top = `${(pt.y / VB_H) * 100}%`;
          tip.style.opacity = String(opacity);
        };

        const draw = (p: number) => {
          const spineT = clamp01((p - 0.02) / 0.92);
          if (spine && spineLen) {
            spine.style.strokeDashoffset = `${spineLen * (1 - spineT)}`;
          }

          athleteLive.steps.forEach((step, i) => {
            const u = (p - startAt(i)) / passo;
            const enter = easeOutCubic((u - 0.06) / 0.5);
            const popWave = Math.sin(Math.PI * smoothstep((u - 0.16) / 0.42));
            const pop = 1 + RING_POP * popWave * (enter > 0.08 ? 1 : 0);
            const visual = visuals[i];
            const copy = copies[i];
            const shift = step.side === "start" ? 18 : -18;

            if (visual) {
              visual.style.opacity = String(enter);
              visual.style.setProperty("--bf-live-rise", `${(1 - enter) * 22}px`);
              visual.style.setProperty(
                "--bf-live-pop",
                String((0.94 + 0.06 * enter) * pop),
              );
            }
            if (copy) {
              copy.style.opacity = String(enter);
              copy.style.setProperty("--bf-live-rise", `${(1 - enter) * 14}px`);
              copy.style.setProperty(
                "--bf-live-shift",
                `${(1 - enter) * shift}px`,
              );
            }
          });

          placeTip(spineT, easeOutCubic((p - 0.04) / 0.14));
          cam.panMeta = targetPanFor(p);
        };

        const onTick = (_t: number, dt: number) => {
          const s = Math.min(dt / 1000, 1 / 30);
          cam.pan += (cam.panMeta - cam.pan) * Math.min(1, s * PAN_FOLLOW);
          map.style.setProperty("--bf-live-pan", `${cam.pan}px`);
        };

        draw(0);
        cam.pan = cam.panMeta;
        map.style.setProperty("--bf-live-pan", `${cam.pan}px`);

        const trigger = ScrollTrigger.create({
          trigger: corsa,
          start: () => `top top+=${frame.pinTop}`,
          end: () => `bottom bottom+=${frame.pinTop}`,
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onUpdate: (self) => draw(self.progress),
          onRefresh: (self) => {
            frame = fitFrame();
            draw(self.progress);
            cam.pan = cam.panMeta;
            map.style.setProperty("--bf-live-pan", `${cam.pan}px`);
          },
        });

        gsap.ticker.add(onTick);

        const onResize = () => {
          frame = fitFrame();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        requestAnimationFrame(() => {
          frame = fitFrame();
          ScrollTrigger.refresh();
          draw(trigger.progress);
          cam.pan = cam.panMeta;
          map.style.setProperty("--bf-live-pan", `${cam.pan}px`);
        });

        return () => {
          gsap.ticker.remove(onTick);
          window.removeEventListener("resize", onResize);
          trigger.kill();
          corsa.style.removeProperty("--bf-live-ride");
          pin.style.removeProperty("--bf-live-pin-top");
          pin.style.removeProperty("--bf-live-view-h");
          map.style.removeProperty("--bf-live-pan");
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="athlete-live"
      className="bf-athlete-live"
      aria-labelledby="athlete-live-title"
    >
      <div className="bf-athlete-live__shell">
        <header className="bf-athlete-live__head">
          <h2 id="athlete-live-title" className="bf-athlete-live__title">
            {athleteLive.title}
          </h2>
          <p className="bf-athlete-live__lede">{athleteLive.lede}</p>
        </header>

        <div className="bf-athlete-live__corsa" data-live-corsa="">
          <div className="bf-athlete-live__pin" data-live-pin="">
            <div className="bf-athlete-live__map" data-live-map="">
              <div className="bf-athlete-live__path-wrap" data-live-path-wrap="">
                <svg
                  className="bf-athlete-live__path"
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    data-live-spine=""
                    d="M1 1C1 1 571.891 124.393 563 391.5C554.317 652.352 7.83125 494.558 2.5 755.5C-2.90407 1020.01 563 1136 563 1136"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="bf-athlete-live__tip" data-live-tip="" aria-hidden="true" />
              </div>

              <ol className="bf-athlete-live__steps">
                {athleteLive.steps.map((step) => (
                  <li
                    key={step.id}
                    className={`bf-athlete-live__step bf-athlete-live__step--${step.side}`}
                    data-live-step=""
                  >
                    <div
                      className={`bf-athlete-live__visual bf-athlete-live__visual--${step.tone}`}
                      data-live-visual=""
                    >
                      <span className="bf-athlete-live__bar" aria-hidden="true" />
                      <img
                        className="bf-athlete-live__phone"
                        src={athleteLive.phone}
                        alt={athleteLive.phoneAlt}
                        width={252}
                        height={468}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>

                    <div className="bf-athlete-live__copy" data-live-copy="" dir="rtl">
                      <h3 className="bf-athlete-live__step-title">{step.title}</h3>
                      <p className="bf-athlete-live__step-body">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
