import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experience } from "../content/home";
import { Container } from "../ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const P0 = 0.08;
const P1 = 0.88;
const SCRUB = 0.5;
const RIDE = 1.05;
const RING_POP = 0.18;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - (1 - clamp01(t)) ** 3;
const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const corsa = root.querySelector<HTMLElement>("[data-experience-corsa]");
      const links = gsap.utils.toArray<SVGPathElement>("[data-experience-link]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-experience-step]");
      const marks = gsap.utils.toArray<HTMLElement>("[data-experience-mark]");
      const product = root.querySelector<HTMLElement>("[data-experience-product]");
      const close = root.querySelector<HTMLElement>("[data-experience-close]");
      const n = experience.steps.length;
      const passo = (P1 - P0) / Math.max(1, n);
      const startAt = (i: number) => P0 + i * passo;

      const prepareStroke = (path: SVGPathElement) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        return len;
      };

      const linkLens = links.map((path) => prepareStroke(path));

      const settle = () => {
        links.forEach((path) => {
          path.style.strokeDashoffset = "0";
          path.style.opacity = "1";
        });
        steps.forEach((step) => {
          step.style.opacity = "1";
          step.style.setProperty("--bf-step-rise", "0px");
          step.style.setProperty("--bf-step-shift", "0px");
        });
        marks.forEach((mark) => {
          mark.style.opacity = "1";
          mark.style.setProperty("--bf-mark-pop", "1");
        });
        if (product) {
          product.style.opacity = "1";
          product.style.setProperty("--bf-product-rise", "0px");
          product.style.setProperty("--bf-product-pop", "1");
        }
        if (close) {
          close.style.opacity = "1";
          close.style.setProperty("--bf-close-rise", "0px");
        }
        root.classList.add("is-settled");
      };

      if (reduced) {
        settle();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(max-width: 999px)", () => {
        settle();
        const mobileBits = [product, ...steps, close].filter(Boolean) as HTMLElement[];
        gsap.from(mobileBits, {
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

      mm.add("(min-width: 1000px)", () => {
        if (!corsa) return;

        const pin = root.querySelector<HTMLElement>("[data-experience-pin]");
        const stage = root.querySelector<HTMLElement>(".bf-experience__stage");

        root.classList.remove("is-settled");
        links.forEach((path, i) => {
          path.style.strokeDashoffset = `${linkLens[i]}`;
          path.style.opacity = "0";
        });
        steps.forEach((step, i) => {
          step.style.opacity = "0";
          step.style.setProperty("--bf-step-rise", "18px");
          step.style.setProperty(
            "--bf-step-shift",
            i === 0 ? "18px" : i === 1 ? "-18px" : "0px",
          );
        });
        marks.forEach((mark) => {
          mark.style.opacity = "0";
          mark.style.setProperty("--bf-mark-pop", "0.86");
        });
        if (product) {
          product.style.opacity = "0";
          product.style.setProperty("--bf-product-rise", "22px");
          product.style.setProperty("--bf-product-pop", "0.94");
        }
        if (close) {
          close.style.opacity = "0";
          close.style.setProperty("--bf-close-rise", "16px");
        }

        corsa.style.setProperty("--bf-experience-ride", `${220 * RIDE}vh`);

        /** Keep the sticky frame fully below the fixed header and inside the viewport. */
        const fitFrame = () => {
          if (!pin || !stage) return 104;
          const header = document.querySelector<HTMLElement>(".bf-header");
          const headerH = Math.ceil(header?.getBoundingClientRect().height ?? 96);
          const topGap = 12;
          const bottomGap = 16;
          const pinTop = headerH + topGap;

          pin.style.setProperty("--bf-experience-pin-top", `${pinTop}px`);

          // Measure close without the current stage width cap so fit can recompute cleanly.
          stage.style.removeProperty("--bf-experience-stage-w");
          const closeMargin = close
            ? Number.parseFloat(getComputedStyle(close).marginTop) || 0
            : 0;
          const closeBlock = close ? close.offsetHeight + closeMargin : 0;
          const avail = window.innerHeight - pinTop - bottomGap - closeBlock;
          const stageMaxH = Math.max(300, avail);
          const stageMaxW = stageMaxH * (1267 / 666);
          const containerW = pin.clientWidth || window.innerWidth;
          const stageW = Math.min(1267, containerW, stageMaxW);

          stage.style.setProperty("--bf-experience-stage-w", `${stageW}px`);
          return pinTop;
        };

        let pinTop = fitFrame();

        const draw = (p: number) => {
          const productEnter = easeOutCubic((p - 0.02) / 0.22);
          if (product) {
            product.style.opacity = String(productEnter);
            product.style.setProperty(
              "--bf-product-rise",
              `${(1 - productEnter) * 22}px`,
            );
            product.style.setProperty(
              "--bf-product-pop",
              String(0.94 + 0.06 * productEnter),
            );
          }

          experience.steps.forEach((_, i) => {
            const u = (p - startAt(i)) / passo;
            const enter = easeOutCubic((u - 0.08) / 0.42);
            const popWave = Math.sin(Math.PI * smoothstep((u - 0.18) / 0.36));
            const pop = 1 + RING_POP * popWave * (enter > 0.08 ? 1 : 0);

            const link = links[i];
            if (link) {
              const a = startAt(i) - passo * 0.12;
              const b = startAt(i) + passo * 0.38;
              const t = clamp01((p - a) / Math.max(0.001, b - a));
              link.style.opacity = t > 0 ? "1" : "0";
              link.style.strokeDashoffset = `${linkLens[i] * (1 - t)}`;
            }

            const step = steps[i];
            const mark = marks[i];
            if (mark) {
              mark.style.opacity = String(enter);
              mark.style.setProperty(
                "--bf-mark-pop",
                String((0.86 + 0.14 * enter) * pop),
              );
            }
            if (step) {
              const shift = i === 0 ? 18 : i === 1 ? -18 : 12;
              step.style.opacity = String(enter);
              step.style.setProperty("--bf-step-rise", `${(1 - enter) * 16}px`);
              step.style.setProperty("--bf-step-shift", `${(1 - enter) * shift}px`);
            }
          });

          if (close) {
            const closeEnter = easeOutCubic((p - 0.82) / 0.14);
            close.style.opacity = String(closeEnter);
            close.style.setProperty(
              "--bf-close-rise",
              `${(1 - closeEnter) * 16}px`,
            );
          }
        };

        draw(0);

        const trigger = ScrollTrigger.create({
          trigger: corsa,
          start: () => `top top+=${pinTop}`,
          end: "bottom bottom",
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onUpdate: (self) => draw(self.progress),
          onRefresh: (self) => {
            pinTop = fitFrame();
            draw(self.progress);
          },
        });

        const onResize = () => {
          pinTop = fitFrame();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        requestAnimationFrame(() => {
          pinTop = fitFrame();
          ScrollTrigger.refresh();
          draw(trigger.progress);
        });

        return () => {
          window.removeEventListener("resize", onResize);
          trigger.kill();
          corsa.style.removeProperty("--bf-experience-ride");
          pin?.style.removeProperty("--bf-experience-pin-top");
          stage?.style.removeProperty("--bf-experience-stage-w");
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
      id="experience"
      className="bf-section bf-experience"
      aria-labelledby="experience-title"
    >
      <Container wide>
        <header className="bf-experience__head">
          <h2 id="experience-title" className="bf-experience__title">
            {experience.title}
          </h2>
          <p className="bf-experience__lede">{experience.lede}</p>
        </header>

        <div className="bf-experience__corsa" data-experience-corsa="">
          <div className="bf-experience__pin" data-experience-pin="">
            <div className="bf-experience__stage">
              <svg
                className="bf-experience__links"
                viewBox="0 0 1267 666"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient
                    id="bf-experience-link-1"
                    gradientUnits="userSpaceOnUse"
                    x1="867.5"
                    y1="247.82"
                    x2="1237"
                    y2="86.5"
                  >
                    <stop offset="0" stopColor="var(--bf-ink)" stopOpacity="0.18" />
                    <stop offset="0.55" stopColor="var(--bf-ink)" stopOpacity="0.42" />
                    <stop offset="1" stopColor="var(--bf-ink)" stopOpacity="0.12" />
                  </linearGradient>
                  <linearGradient
                    id="bf-experience-link-2"
                    gradientUnits="userSpaceOnUse"
                    x1="550.5"
                    y1="238.32"
                    x2="350"
                    y2="178.4"
                  >
                    <stop offset="0" stopColor="var(--bf-ink)" stopOpacity="0.18" />
                    <stop offset="0.55" stopColor="var(--bf-ink)" stopOpacity="0.42" />
                    <stop offset="1" stopColor="var(--bf-ink)" stopOpacity="0.12" />
                  </linearGradient>
                  <linearGradient
                    id="bf-experience-link-3"
                    gradientUnits="userSpaceOnUse"
                    x1="797.5"
                    y1="385.82"
                    x2="961"
                    y2="613.2"
                  >
                    <stop offset="0" stopColor="var(--bf-ink)" stopOpacity="0.18" />
                    <stop offset="0.55" stopColor="var(--bf-ink)" stopOpacity="0.42" />
                    <stop offset="1" stopColor="var(--bf-ink)" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                <path
                  data-experience-link=""
                  d="M867.5 247.82L1198.27 171.281C1220.94 166.035 1237 145.84 1237 122.568V86.5"
                  stroke="url(#bf-experience-link-1)"
                />
                <path
                  data-experience-link=""
                  d="M550.5 238.32L439.153 178.465C429.333 173.187 418.032 171.341 407.043 173.222L368.5 179.82L350 178.4"
                  stroke="url(#bf-experience-link-2)"
                />
                <path
                  data-experience-link=""
                  d="M797.5 385.82L967.505 532.318C986.2 548.428 990.345 575.768 977.266 596.695L961 613.2"
                  stroke="url(#bf-experience-link-3)"
                />
              </svg>

              <ol className="bf-experience__steps">
                {experience.steps.map((step, index) => (
                  <li
                    key={step.n}
                    className={`bf-experience__step bf-experience__step--${index + 1}`}
                    data-experience-step=""
                  >
                    <span
                      className="bf-experience__mark"
                      data-experience-mark=""
                      aria-hidden="true"
                    >
                      <span className="bf-experience__num">{step.n}</span>
                    </span>
                    <div className="bf-experience__copy">
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <figure
                className="bf-experience__product"
                data-experience-product=""
              >
                <img
                  src={experience.image}
                  alt={experience.imageAlt}
                  width={1448}
                  height={1086}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <blockquote
              className="bf-experience__close"
              data-experience-close=""
            >
              <p>
                <span className="bf-experience__q" aria-hidden="true">
                  ”
                </span>
                {experience.close}
                <span className="bf-experience__q" aria-hidden="true">
                  “
                </span>
              </p>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
