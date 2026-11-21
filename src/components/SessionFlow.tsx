import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { sessionFlow } from "../content/home";
import { JourneyIcon } from "./JourneyIcon";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const P0 = 0.05;
const P1 = 0.92;
const SCRUB = 1.15;
const RIDE = 1.3;
const HEAD_STIFFNESS = 220;
const HEAD_DAMPING = 28;
const PAN_FOLLOW = 4.5;
const RING_POP = 0.2;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - (1 - clamp01(t)) ** 3;
const smoothstep = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

function playNodeMotion(node: HTMLElement) {
  const target =
    node.querySelector<HTMLElement>(".bf-journey-icon--motion > div") ??
    node.querySelector<HTMLElement>(".bf-journey-icon--motion");
  if (!target) return;
  target.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
}

export function SessionFlow() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const corsa = root.querySelector<HTMLElement>("[data-journey-corsa]");
      const stage = root.querySelector<HTMLElement>("[data-journey-stage]");
      const spine = root.querySelector<SVGPathElement>("[data-journey-spine]");
      const branches = gsap.utils.toArray<SVGPathElement>("[data-journey-branch]");
      const disks = gsap.utils.toArray<SVGCircleElement>("[data-journey-disk]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-journey-node]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-journey-step]");
      const tip = root.querySelector<HTMLElement>("[data-journey-tip]");
      const n = sessionFlow.steps.length;
      const passo = (P1 - P0) / n;
      const startAt = (i: number) => P0 + i * passo;

      const prepareStroke = (path: SVGPathElement | null) => {
        if (!path) return 0;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        return len;
      };

      const spineLen = prepareStroke(spine);
      const branchLens = branches.map((path) => prepareStroke(path));
      const diskBaseR = disks.map((disk) => Number(disk.getAttribute("r")) || 80.5);

      const settle = () => {
        if (spine) spine.style.strokeDashoffset = "0";
        branches.forEach((path) => {
          path.style.strokeDashoffset = "0";
          path.style.opacity = "1";
        });
        disks.forEach((disk, i) => {
          disk.style.opacity = "1";
          disk.setAttribute("r", String(diskBaseR[i] ?? 80.5));
        });
        nodes.forEach((node) => {
          node.style.opacity = "1";
          node.style.setProperty("--bf-node-rise", "0px");
          node.style.setProperty("--bf-node-pop", "1");
        });
        gsap.set(steps, { opacity: 1, clearProps: "transform" });
        if (tip) {
          const last = sessionFlow.steps[n - 1];
          tip.style.opacity = "1";
          tip.style.top = `${last.nodeY * 100}%`;
        }
        root.classList.add("is-settled");
      };

      if (reduced) {
        settle();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(max-width: 900px)", () => {
        settle();
        gsap.from(steps, {
          opacity: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        });
      });

      mm.add("(min-width: 901px)", () => {
        if (!corsa || !stage) return;

        const map = root.querySelector<HTMLElement>(".bf-journey__map");
        if (!map) return;

        root.classList.remove("is-settled");
        gsap.set(steps, { opacity: 0 });
        nodes.forEach((node) => {
          node.style.opacity = "0";
          node.style.setProperty("--bf-node-rise", "16px");
          node.style.setProperty("--bf-node-pop", "0.86");
        });
        if (tip) gsap.set(tip, { opacity: 0 });
        if (spine) spine.style.strokeDashoffset = `${spineLen}`;
        branches.forEach((path, i) => {
          path.style.strokeDashoffset = `${branchLens[i]}`;
          path.style.opacity = "0";
        });
        disks.forEach((disk, i) => {
          disk.style.opacity = "0";
          disk.setAttribute("r", String((diskBaseR[i] ?? 80.5) * 0.86));
        });

        corsa.style.setProperty("--bf-journey-ride", `${300 * RIDE}vh`);

        const molla = {
          y: sessionFlow.steps[0].nodeY,
          v: 0,
          meta: sessionFlow.steps[0].nodeY,
          /** Bias toward step copy below the node so text stays in frame. */
          focus: sessionFlow.steps[0].y + 0.04,
          focusMeta: sessionFlow.steps[0].y + 0.04,
          pan: 0,
          visible: 0,
        };
        const playedMotion = new Set<number>();

        /** Fit sticky stage under the header and size the visible window. */
        const fitFrame = () => {
          const header = document.querySelector<HTMLElement>(".bf-header");
          const headerH = Math.ceil(header?.getBoundingClientRect().height ?? 72);
          const topGap = 12;
          const bottomGap = 24;
          const pinTop = headerH + topGap;
          const viewH = Math.max(360, window.innerHeight - pinTop - bottomGap);

          stage.style.setProperty("--bf-journey-pin-top", `${pinTop}px`);
          stage.style.setProperty("--bf-journey-view-h", `${viewH}px`);
          return { pinTop, viewH };
        };

        let frame = fitFrame();

        const targetPanFor = (focusY: number) => {
          const mapH = map.scrollHeight;
          const viewH = frame.viewH;
          if (mapH <= viewH + 1) return 0;
          const prefer = viewH * 0.42;
          const focusPx = focusY * mapH;
          return Math.max(viewH - mapH, Math.min(0, prefer - focusPx));
        };

        const draw = (p: number) => {
          if (spine && spineLen) {
            const spineT = clamp01((p - 0.02) / 0.92);
            spine.style.strokeDashoffset = `${spineLen * (1 - spineT)}`;
          }

          let latest = -1;

          sessionFlow.steps.forEach((step, i) => {
            const u = (p - startAt(i)) / passo;

            const branch = branches[i];
            if (branch) {
              const a = startAt(i) - passo * 0.18;
              const b = startAt(i) + passo * 0.4;
              const t = clamp01((p - a) / Math.max(0.001, b - a));
              branch.style.opacity = t > 0 ? "1" : "0";
              branch.style.strokeDashoffset = `${branchLens[i] * (1 - easeOutCubic(t))}`;
            }

            const enter = easeOutCubic((u - 0.08) / 0.52);
            const popWave = Math.sin(Math.PI * smoothstep((u - 0.18) / 0.42));
            const pop = 1 + RING_POP * popWave * (enter > 0.08 ? 1 : 0);
            const node = nodes[i];
            const copy = steps[i];
            const disk = disks[i];
            const baseR = diskBaseR[i] ?? 80.5;

            if (disk) {
              disk.style.opacity = String(enter);
              disk.setAttribute("r", String(baseR * (0.9 + 0.1 * enter) * pop));
            }
            if (node) {
              node.style.opacity = String(enter);
              node.style.setProperty("--bf-node-rise", `${(1 - enter) * 16}px`);
              node.style.setProperty("--bf-node-pop", String((0.86 + 0.14 * enter) * pop));

              if (enter < 0.28) playedMotion.delete(i);
              if (enter >= 0.58 && !playedMotion.has(i)) {
                playedMotion.add(i);
                playNodeMotion(node);
              }
            }
            if (copy) {
              const fromX = step.side === "left" ? 16 : -16;
              copy.style.opacity = String(enter);
              copy.style.transform = `translate3d(${(1 - enter) * fromX}px, ${(1 - enter) * 10}px, 0)`;
            }

            if (u >= 0.28) latest = i;
          });

          if (latest >= 0) {
            const active = sessionFlow.steps[latest];
            molla.meta = active.nodeY;
            molla.focusMeta = active.y + 0.05;
            molla.visible = 1;
          } else {
            molla.visible = 0;
          }
        };

        const onTick = (_t: number, dt: number) => {
          const s = Math.min(dt / 1000, 1 / 30);
          const tipForce =
            HEAD_STIFFNESS * (molla.meta - molla.y) - HEAD_DAMPING * molla.v;
          molla.v += tipForce * s;
          molla.y += molla.v * s;

          // Softer follow for the camera so pan eases with the tip.
          molla.focus += (molla.focusMeta - molla.focus) * Math.min(1, s * PAN_FOLLOW);
          const panMeta = targetPanFor(molla.focus);
          molla.pan += (panMeta - molla.pan) * Math.min(1, s * PAN_FOLLOW);
          map.style.setProperty("--bf-journey-pan", `${molla.pan}px`);

          if (tip) {
            tip.style.top = `${molla.y * 100}%`;
            const opacity = Number.parseFloat(tip.style.opacity || "0");
            tip.style.opacity = String(
              opacity + (molla.visible - opacity) * Math.min(1, s * 8),
            );
          }
        };

        draw(0);
        molla.pan = targetPanFor(molla.focus);
        map.style.setProperty("--bf-journey-pan", `${molla.pan}px`);

        const trigger = ScrollTrigger.create({
          trigger: corsa,
          start: () => `top top+=${frame.pinTop}`,
          end: "bottom bottom",
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            draw(self.progress);
          },
          onRefresh: (self) => {
            frame = fitFrame();
            draw(self.progress);
            molla.pan = targetPanFor(molla.focus);
            map.style.setProperty("--bf-journey-pan", `${molla.pan}px`);
          },
        });

        gsap.ticker.add(onTick);

        const onResize = () => {
          frame = fitFrame();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        // Height/sticky settle after CSS var applies
        requestAnimationFrame(() => {
          frame = fitFrame();
          ScrollTrigger.refresh();
          draw(trigger.progress);
          molla.pan = targetPanFor(molla.focus);
          map.style.setProperty("--bf-journey-pan", `${molla.pan}px`);
        });

        return () => {
          gsap.ticker.remove(onTick);
          window.removeEventListener("resize", onResize);
          trigger.kill();
          corsa.style.removeProperty("--bf-journey-ride");
          stage.style.removeProperty("--bf-journey-pin-top");
          stage.style.removeProperty("--bf-journey-view-h");
          map.style.removeProperty("--bf-journey-pan");
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
      id="live-class"
      className="bf-journey"
      aria-labelledby="journey-title"
    >
      <div className="bf-journey__shell">
        <header className="bf-journey__head">
          <h2 id="journey-title" className="bf-journey__title">
            {sessionFlow.title}
          </h2>
          <p className="bf-journey__lede">{sessionFlow.lede}</p>
        </header>

        <div className="bf-journey__corsa" data-journey-corsa="">
          <div className="bf-journey__stage" data-journey-stage="">
            <div className="bf-journey__map">
              <svg
                className="bf-journey__path"
                viewBox="0 0 1343 1311"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  className="bf-journey__spine"
                  data-journey-spine=""
                  d="M672 11V1310"
                  strokeLinecap="round"
                />
                <path
                  className="bf-journey__branch"
                  data-journey-branch=""
                  d="M671 81.5H80"
                  strokeLinecap="round"
                />
                <circle
                  cx="80.5"
                  cy="80.5"
                  r="80.5"
                  className="bf-journey__disk"
                  data-journey-disk=""
                />
                <path
                  className="bf-journey__branch"
                  data-journey-branch=""
                  d="M671 304.5H1262"
                  strokeLinecap="round"
                />
                <circle
                  cx="1262.5"
                  cy="304.5"
                  r="80.5"
                  className="bf-journey__disk"
                  data-journey-disk=""
                />
                <path
                  className="bf-journey__branch"
                  data-journey-branch=""
                  d="M671 594.5H80"
                  strokeLinecap="round"
                />
                <circle
                  cx="80.5"
                  cy="593.5"
                  r="80.5"
                  className="bf-journey__disk"
                  data-journey-disk=""
                />
                <path
                  className="bf-journey__branch"
                  data-journey-branch=""
                  d="M671 824.5H1262"
                  strokeLinecap="round"
                />
                <circle
                  cx="1262.5"
                  cy="824.5"
                  r="80.5"
                  className="bf-journey__disk"
                  data-journey-disk=""
                />
                <path
                  className="bf-journey__branch"
                  data-journey-branch=""
                  d="M671 1107.5H80"
                  strokeLinecap="round"
                />
                <circle
                  cx="80.5"
                  cy="1106.5"
                  r="80.5"
                  className="bf-journey__disk"
                  data-journey-disk=""
                />
              </svg>

              <span className="bf-journey__tip" data-journey-tip="" aria-hidden="true" />

              <ul className="bf-journey__nodes" aria-hidden="true">
                {sessionFlow.steps.map((item) => (
                  <li
                    key={`node-${item.id}`}
                    className="bf-journey__node"
                    data-journey-node=""
                    style={{
                      left: `${item.nodeX * 100}%`,
                      top: `${item.nodeY * 100}%`,
                    }}
                  >
                    <JourneyIcon
                      id={item.icon}
                      motion
                      size={48}
                      className="bf-journey__node-icon"
                    />
                  </li>
                ))}
              </ul>

              <ol className="bf-journey__steps">
                {sessionFlow.steps.map((item) => (
                  <li
                    key={item.id}
                    className={`bf-journey__step bf-journey__step--${item.side}`}
                    data-journey-step=""
                    style={{
                      left: `${item.x * 100}%`,
                      top: `${item.y * 100}%`,
                    }}
                  >
                    <span className="bf-journey__step-icon" aria-hidden="true">
                      <JourneyIcon id={item.icon} motion size={36} />
                    </span>
                    <p className="bf-journey__step-label">{item.step}</p>
                    <h3 className="bf-journey__name">{item.title}</h3>
                    <p className="bf-journey__text">{item.body}</p>
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
