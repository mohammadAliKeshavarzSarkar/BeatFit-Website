import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { coachDecisions } from "../content/coach";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const P0 = 0.06;
const P1 = 0.9;
const SCRUB = 0.55;
const RIDE = 1.1;
const RING_POP = 0.18;
const VB_W = 1364;
const VB_H = 722;

const NODE_XY = coachDecisions.steps.map((step) => ({
  x: step.x * VB_W,
  y: step.y * VB_H,
}));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - (1 - clamp01(t)) ** 3;
const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

const progressAtPoint = (path: SVGPathElement, x: number, y: number, len: number) => {
  let bestT = 0;
  let bestD = Number.POSITIVE_INFINITY;
  const samples = 240;
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const pt = path.getPointAtLength(len * t);
    const d = (pt.x - x) ** 2 + (pt.y - y) ** 2;
    if (d < bestD) {
      bestD = d;
      bestT = t;
    }
  }
  return bestT;
};

export function CoachDecisions() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const corsa = root.querySelector<HTMLElement>("[data-decisions-corsa]");
      const pin = root.querySelector<HTMLElement>("[data-decisions-pin]");
      const map = root.querySelector<HTMLElement>("[data-decisions-map]");
      const spine = root.querySelector<SVGPathElement>("[data-decisions-spine]");
      const disks = gsap.utils.toArray<SVGCircleElement>("[data-decisions-disk]");
      const icons = gsap.utils.toArray<SVGGElement>("[data-decisions-icon]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-decisions-step]");
      const tip = root.querySelector<HTMLElement>("[data-decisions-tip]");
      const n = coachDecisions.steps.length;
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
      const diskBaseR = disks.map((disk) => Number(disk.getAttribute("r")) || 35);
      const nodeAt = NODE_XY.map((pt) =>
        spine && spineLen ? progressAtPoint(spine, pt.x, pt.y, spineLen) : 0,
      );

      const settle = () => {
        if (spine) spine.style.strokeDashoffset = "0";
        disks.forEach((disk, i) => {
          disk.style.opacity = "1";
          disk.setAttribute("r", String(diskBaseR[i] ?? 35));
        });
        icons.forEach((icon) => {
          icon.style.opacity = "1";
        });
        steps.forEach((step) => {
          step.style.opacity = "1";
          step.style.setProperty("--bf-decisions-rise", "0px");
          step.style.setProperty("--bf-decisions-shift", "0px");
        });
        if (tip) {
          const last = NODE_XY[n - 1];
          tip.style.opacity = "1";
          tip.style.left = `${(last.x / VB_W) * 100}%`;
          tip.style.top = `${(last.y / VB_H) * 100}%`;
        }
        root.classList.add("is-settled");
      };

      if (reduced) {
        settle();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(max-width: 800px)", () => {
        settle();
        gsap.from(steps, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        });
      });

      mm.add("(min-width: 801px)", () => {
        if (!corsa || !map) return;

        root.classList.remove("is-settled");
        if (spine) spine.style.strokeDashoffset = `${spineLen}`;
        disks.forEach((disk, i) => {
          disk.style.opacity = "0";
          disk.setAttribute("r", String((diskBaseR[i] ?? 35) * 0.86));
        });
        icons.forEach((icon) => {
          icon.style.opacity = "0";
        });
        steps.forEach((step, i) => {
          const place = coachDecisions.steps[i]?.place;
          const shift = place === "left" ? 18 : place === "right" ? -18 : 0;
          step.style.opacity = "0";
          step.style.setProperty("--bf-decisions-rise", "16px");
          step.style.setProperty("--bf-decisions-shift", `${shift}px`);
        });
        if (tip) tip.style.opacity = "0";

        corsa.style.setProperty("--bf-decisions-ride", `${240 * RIDE}vh`);

        const fitFrame = () => {
          if (!pin || !map) return 108;
          const header = document.querySelector<HTMLElement>(".bf-header");
          const headerH = Math.ceil(header?.getBoundingClientRect().height ?? 96);
          const topGap = 12;
          const bottomGap = 16;
          const pinTop = headerH + topGap;
          pin.style.setProperty("--bf-decisions-pin-top", `${pinTop}px`);

          map.style.removeProperty("--bf-decisions-map-w");
          const avail = window.innerHeight - pinTop - bottomGap;
          const mapMaxH = Math.max(280, avail);
          const mapMaxW = mapMaxH * (VB_W / VB_H);
          const containerW = pin.clientWidth || window.innerWidth;
          const mapW = Math.min(VB_W, containerW, mapMaxW);
          map.style.setProperty("--bf-decisions-map-w", `${mapW}px`);
          return pinTop;
        };

        let pinTop = fitFrame();

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

          coachDecisions.steps.forEach((step, i) => {
            const u = (p - startAt(i)) / passo;
            const enter = easeOutCubic((u - 0.1) / 0.42);
            const popWave = Math.sin(Math.PI * smoothstep((u - 0.2) / 0.36));
            const pop = 1 + RING_POP * popWave * (enter > 0.08 ? 1 : 0);
            const baseR = diskBaseR[i] ?? 35;
            const disk = disks[i];
            const icon = icons[i];
            const copy = steps[i];

            // Reveal as the stroke reaches each node (with a little lead-in).
            const at = nodeAt[i] ?? i / Math.max(1, n - 1);
            const pathEnter = easeOutCubic((spineT - (at - 0.02)) / 0.1);
            const shown = Math.max(enter * 0.35, pathEnter);

            if (disk) {
              disk.style.opacity = String(shown);
              disk.setAttribute("r", String(baseR * (0.9 + 0.1 * shown) * pop));
            }
            if (icon) icon.style.opacity = String(shown);
            if (copy) {
              const shift =
                step.place === "left" ? 18 : step.place === "right" ? -18 : 0;
              const rise = step.place === "below" ? 14 : 10;
              copy.style.opacity = String(shown);
              copy.style.setProperty(
                "--bf-decisions-rise",
                `${(1 - shown) * rise}px`,
              );
              copy.style.setProperty(
                "--bf-decisions-shift",
                `${(1 - shown) * shift}px`,
              );
            }
          });

          const tipOpacity = easeOutCubic((p - 0.04) / 0.12);
          placeTip(spineT, tipOpacity);
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
          corsa.style.removeProperty("--bf-decisions-ride");
          pin?.style.removeProperty("--bf-decisions-pin-top");
          map.style.removeProperty("--bf-decisions-map-w");
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
      id="coach-decisions"
      className="bf-coach-decisions"
      aria-labelledby="coach-decisions-title"
    >
      <div className="bf-coach-decisions__shell">
        <header className="bf-coach-decisions__head">
          <h2 id="coach-decisions-title" className="bf-coach-decisions__title">
            {coachDecisions.title}
          </h2>
          <p className="bf-coach-decisions__lede">{coachDecisions.lede}</p>
        </header>

        <div className="bf-coach-decisions__corsa" data-decisions-corsa="">
          <div className="bf-coach-decisions__pin" data-decisions-pin="">
            <div className="bf-coach-decisions__map" data-decisions-map="">
              <svg
                className="bf-coach-decisions__path"
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  data-decisions-spine=""
                  d="M35 35 H1049 A114 114 0 0 1 1049 263 H282.5 A114.5 114.5 0 0 0 282.5 492 H1278.5 A50 50 0 0 1 1328.5 542 V721"
                  stroke="currentColor"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Node 1 — eye */}
                <g data-decisions-node="">
                  <circle data-decisions-disk="" cx="35" cy="35" r="35" fill="#D9D9D9" />
                  <g data-decisions-icon="">
                    <path
                      d="M15.125 36.2209C14.9583 35.7558 14.9583 35.2442 15.125 34.7791C16.7483 30.7018 19.5038 27.2157 23.0421 24.7626C26.5805 22.3096 30.7423 21 35 21C39.2577 21 43.4195 22.3096 46.9579 24.7626C50.4962 27.2157 53.2517 30.7018 54.875 34.7791C55.0417 35.2442 55.0417 35.7558 54.875 36.2209C53.2517 40.2982 50.4962 43.7843 46.9579 46.2374C43.4195 48.6904 39.2577 50 35 50C30.7423 50 26.5805 48.6904 23.0421 46.2374C19.5038 43.7843 16.7483 40.2982 15.125 36.2209ZM40.9997 35.5C40.9997 38.9324 38.3135 41.7148 35 41.7148C31.6865 41.7148 29.0003 38.9324 29.0003 35.5C29.0003 32.0676 31.6865 29.2852 35 29.2852C38.3135 29.2852 40.9997 32.0676 40.9997 35.5Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="black"
                      fill="none"
                    />
                  </g>
                </g>

                {/* Node 2 — activity */}
                <g data-decisions-node="" transform="translate(113 0)">
                  <circle data-decisions-disk="" cx="1050" cy="149" r="35" fill="#D9D9D9" />
                  <g data-decisions-icon="">
                    <path
                      d="M1061.11 149H1056.67L1052.22 160.111L1047.78 137.889L1043.33 149H1038.89M1034.44 129H1065.56C1068.01 129 1070 130.99 1070 133.444V164.556C1070 167.01 1068.01 169 1065.56 169H1034.44C1031.99 169 1030 167.01 1030 164.556V133.444C1030 130.99 1031.99 129 1034.44 129Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="black"
                      fill="none"
                    />
                  </g>
                </g>

                {/* Node 3 — radar */}
                <g data-decisions-node="" transform="translate(-114.5 0.5)">
                  <circle data-decisions-disk="" cx="283" cy="377" r="35" fill="#D9D9D9" />
                  <g data-decisions-icon="">
                    <path
                      d="M282.999 379V373M282.999 373V357L299.888 365L282.999 373ZM301.073 373.444C302.196 376.725 302.301 380.242 301.375 383.577C300.45 386.912 298.532 389.926 295.851 392.258C293.17 394.591 289.837 396.144 286.251 396.735C282.664 397.325 278.974 396.926 275.62 395.587C272.266 394.247 269.388 392.023 267.33 389.179C265.271 386.334 264.118 382.989 264.009 379.542C263.899 376.095 264.837 372.691 266.71 369.734C268.584 366.777 271.315 364.393 274.578 362.864M274.559 372.994C273.501 374.328 272.813 375.892 272.556 377.543C272.299 379.194 272.482 380.879 273.089 382.445C273.696 384.012 274.706 385.41 276.029 386.511C277.352 387.613 278.945 388.384 280.662 388.753C282.38 389.122 284.168 389.079 285.863 388.626C287.558 388.173 289.107 387.326 290.368 386.161C291.629 384.996 292.562 383.551 293.082 381.957C293.603 380.363 293.694 378.67 293.348 377.034"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="black"
                      fill="none"
                    />
                  </g>
                </g>

                {/* Node 4 — flags */}
                <g data-decisions-node="">
                  <circle data-decisions-disk="" cx="1329" cy="607" r="35" fill="#D9D9D9" />
                  <g data-decisions-icon="">
                    <path
                      d="M1312 627V614.056M1312 614.056V591C1312 590.69 1312.08 590.383 1312.23 590.106C1312.38 589.828 1312.6 589.586 1312.88 589.4C1315.15 587.842 1317.91 587 1320.75 587C1327.31 587 1331.69 591 1336.79 591C1339.71 591 1341.94 590.467 1343.5 589.4C1343.82 589.177 1344.21 589.041 1344.62 589.008C1345.02 588.975 1345.43 589.045 1345.79 589.211C1346.15 589.377 1346.46 589.633 1346.67 589.949C1346.89 590.264 1347 590.629 1347 591V611C1347 611.31 1346.92 611.617 1346.77 611.894C1346.62 612.172 1346.4 612.414 1346.13 612.6C1343.85 614.158 1341.09 615 1338.25 615C1331.69 615 1327.31 611 1320.75 611C1317.52 611 1314.41 612.088 1312 614.056Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="black"
                      fill="none"
                    />
                  </g>
                </g>
              </svg>

              <span className="bf-coach-decisions__tip" data-decisions-tip="" aria-hidden="true" />

              <ol className="bf-coach-decisions__steps">
                {coachDecisions.steps.map((step) => (
                  <li
                    key={step.id}
                    className={`bf-coach-decisions__step bf-coach-decisions__step--${step.place}`}
                    data-decisions-step=""
                    style={{
                      left: `${step.x * 100}%`,
                      top: `${step.y * 100}%`,
                    }}
                  >
                    <span className="bf-coach-decisions__step-label">{step.label}</span>
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
