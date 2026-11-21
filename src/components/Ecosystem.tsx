import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ECOSYSTEM_POINT_ANIM } from "./animations/homeSectionIcons";
import { UseAnimationIcon } from "./animations";
import { ecosystem } from "../content/home";
import { Section } from "../ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WAVE =
  "M1.29619 200.662C-15.5027 191.259 135.525 286.195 191.533 252.684C247.541 219.174 202.5 246.264 265.5 208.264C328.5 170.264 398.562 282.19 468.572 277.091C538.582 271.991 578.588 216.261 646.597 200.963C714.607 185.665 792.391 284.349 860.127 294.211C949.842 307.273 942.481 196.138 1033.65 201.69C1139.9 208.16 1117.51 303.81 1223.68 310.963C1336.32 318.552 1446 180.264 1446 180.264";

const ICONS = {
  progress: {
    width: 22,
    height: 20,
    viewBox: "0 0 22 20",
    d: "M11 14V19M15 12.639V19M19 8.656V19M21 1L12.354 9.646C12.3076 9.69256 12.2524 9.72951 12.1916 9.75471C12.1309 9.77992 12.0658 9.79289 12 9.79289C11.9342 9.79289 11.8691 9.77992 11.8084 9.75471C11.7476 9.72951 11.6924 9.69256 11.646 9.646L8.354 6.354C8.26024 6.26026 8.13308 6.20761 8.0005 6.20761C7.86792 6.20761 7.74076 6.26026 7.647 6.354L1 13M3 16.463V19M7 12.656V19",
  },
  attention: {
    width: 22,
    height: 21,
    viewBox: "0 0 22 21",
    d: "M16 20C16 18.6739 15.4732 17.4021 14.5355 16.4645C13.5979 15.5268 12.3261 15 11 15M11 15C9.67392 15 8.40215 15.5268 7.46447 16.4645C6.52678 17.4021 6 18.6739 6 20M11 15C12.6569 15 14 13.6569 14 12C14 10.3431 12.6569 9 11 9C9.34315 9 8 10.3431 8 12C8 13.6569 9.34315 15 11 15ZM21 9.5C21.0001 8.85971 20.8246 8.23166 20.4925 7.68421C20.1604 7.13676 19.6846 6.69089 19.1167 6.39514C18.5488 6.09939 17.9106 5.96508 17.2717 6.00685C16.6328 6.04861 16.0176 6.26484 15.493 6.632M6.507 6.632C5.98244 6.26484 5.36721 6.04861 4.72829 6.00685C4.08936 5.96508 3.45122 6.09939 2.88333 6.39514C2.31544 6.69089 1.83956 7.13676 1.50749 7.68421C1.17542 8.23166 0.999889 8.85971 1 9.5M20 3.5C20 4.88071 18.8807 6 17.5 6C16.1193 6 15 4.88071 15 3.5C15 2.11929 16.1193 1 17.5 1C18.8807 1 20 2.11929 20 3.5ZM7 3.5C7 4.88071 5.88071 6 4.5 6C3.11929 6 2 4.88071 2 3.5C2 2.11929 3.11929 1 4.5 1C5.88071 1 7 2.11929 7 3.5Z",
  },
  repeat: {
    width: 20,
    height: 22,
    viewBox: "866 380.264 20 22",
    d: "M879 393.264H875V389.264M875 393.264L876.535 391.659C877.109 391.107 877.807 390.701 878.569 390.473C879.332 390.245 880.139 390.203 880.921 390.35C881.704 390.497 882.44 390.828 883.068 391.317C883.697 391.805 884.2 392.437 884.535 393.159M880 381.264V382.264M880 382.264V384.264M880 382.264H883C883.53 382.264 884.039 382.475 884.414 382.85C884.789 383.225 885 383.734 885 384.264V387.781M880 382.264H872M885 397.264L883.465 398.869C882.891 399.421 882.193 399.827 881.431 400.055C880.668 400.283 879.861 400.325 879.079 400.179C878.296 400.032 877.56 399.7 876.932 399.212C876.303 398.723 875.8 398.091 875.465 397.369M881 397.264H885V401.264M872 382.264H869C868.47 382.264 867.961 382.475 867.586 382.85C867.211 383.225 867 383.734 867 384.264V388.264M872 382.264V381.264M872 382.264V384.264M867 388.264V398.264C867 398.795 867.211 399.303 867.586 399.678C867.961 400.053 868.47 400.264 869 400.264H872.517M867 388.264H871",
  },
  value: {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    d: "M7 3V7M7 13V15M15 1V3M15 11V14M1 1V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H19M6 7H8C8.55228 7 9 7.44772 9 8V12C9 12.5523 8.55228 13 8 13H6C5.44772 13 5 12.5523 5 12V8C5 7.44772 5.44772 7 6 7ZM14 3H16C16.5523 3 17 3.44772 17 4V10C17 10.5523 16.5523 11 16 11H14C13.4477 11 13 10.5523 13 10V4C13 3.44772 13.4477 3 14 3Z",
  },
} as const;

function PointIcon({ id }: { id: string }) {
  const motion = ECOSYSTEM_POINT_ANIM[id];
  if (motion) {
    return (
      <UseAnimationIcon animation={motion} size={22} interaction="hover-replay" />
    );
  }

  const icon = ICONS[id as keyof typeof ICONS] ?? ICONS.value;
  return (
    <svg
      viewBox={icon.viewBox}
      width={icon.width}
      height={icon.height}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={icon.d}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function playPointMotion(point: HTMLElement) {
  const target =
    point.querySelector<HTMLElement>(".bf-gap__icon > div") ??
    point.querySelector<HTMLElement>(".bf-gap__icon");
  if (!target) return;
  target.dispatchEvent(new MouseEvent("mouseenter", { bubbles: false }));
}

export function Ecosystem() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const intro = root.querySelector<HTMLElement>("[data-gap-intro]");
      const wave = root.querySelector<SVGPathElement>("[data-gap-wave]");
      const waveClip = root.querySelector<SVGRectElement>("[data-gap-wave-clip]");
      const points = gsap.utils.toArray<HTMLElement>("[data-gap-point]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-gap-dot]");
      const stems = gsap.utils.toArray<HTMLElement>("[data-gap-stem]");
      const icons = gsap.utils.toArray<HTMLElement>("[data-gap-icon]");
      const titles = gsap.utils.toArray<HTMLElement>("[data-gap-title]");
      const bodies = gsap.utils.toArray<HTMLElement>("[data-gap-body]");
      const WAVE_VB_W = 1446;

      const settle = () => {
        if (waveClip) waveClip.setAttribute("width", String(WAVE_VB_W));
        if (wave) {
          wave.style.removeProperty("stroke-dasharray");
          wave.style.removeProperty("stroke-dashoffset");
          wave.style.opacity = "1";
        }
        gsap.set([intro, ...points, ...dots, ...stems, ...icons, ...titles, ...bodies], {
          clearProps: "all",
        });
        root.classList.add("is-settled");
      };

      if (reduced) {
        settle();
        return;
      }

      // Clip wipe — dash-draw breaks on this stretched preserveAspectRatio="none" SVG.
      if (waveClip) waveClip.setAttribute("width", "0");
      if (wave) {
        wave.style.removeProperty("stroke-dasharray");
        wave.style.removeProperty("stroke-dashoffset");
        wave.style.opacity = "1";
      }

      gsap.set(intro, { autoAlpha: 0, y: 22 });
      gsap.set(points, { autoAlpha: 1 });
      gsap.set(dots, { autoAlpha: 0, scale: 0.55 });
      gsap.set(stems, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(icons, { autoAlpha: 0, y: 14, scale: 0.86 });
      gsap.set(titles, { autoAlpha: 0, y: 14 });
      gsap.set(bodies, { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      tl.to(intro, { autoAlpha: 1, y: 0, duration: 0.7 }, 0);

      if (waveClip) {
        tl.to(
          waveClip,
          {
            attr: { width: WAVE_VB_W },
            duration: 1.55,
            ease: "power1.inOut",
          },
          0.28,
        );
      }

      // Follow the wave draw: left → right across the chart.
      const order = [...points.keys()].sort(
        (a, b) =>
          Number.parseFloat(ecosystem.points[a].x) -
          Number.parseFloat(ecosystem.points[b].x),
      );

      order.forEach((i, seq) => {
        const point = points[i];
        const at = 0.55 + seq * 0.28;
        const dot = dots[i];
        const stem = stems[i];
        const icon = icons[i];
        const title = titles[i];
        const body = bodies[i];

        if (dot) {
          tl.to(
            dot,
            { autoAlpha: 1, scale: 1, duration: 0.38, ease: "back.out(1.7)" },
            at,
          );
        }
        if (stem) {
          tl.to(stem, { scaleY: 1, duration: 0.42 }, at + 0.06);
        }
        if (icon) {
          tl.to(
            icon,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.42,
              ease: "back.out(1.4)",
              onStart: () => playPointMotion(point),
            },
            at + 0.16,
          );
        }
        if (title) {
          tl.to(title, { autoAlpha: 1, y: 0, duration: 0.4 }, at + 0.22);
        }
        if (body) {
          tl.to(body, { autoAlpha: 1, y: 0, duration: 0.42 }, at + 0.3);
        }
      });

      tl.eventCallback("onComplete", () => {
        root.classList.add("is-settled");
      });

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top 72%",
        once: true,
        onEnter: () => {
          tl.play(0);
        },
      });

      return () => {
        trigger.kill();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <Section
      ref={rootRef}
      id="ecosystem"
      labelledBy="ecosystem-title"
      className="bf-gap"
    >
      <div className="bf-gap__intro" data-gap-intro="">
        <h2 id="ecosystem-title" className="bf-gap__title">
          {ecosystem.titleBefore}{" "}
          <br className="bf-gap__br" />
          {ecosystem.titleAfter}
        </h2>
        <p className="bf-gap__lede">{ecosystem.lede}</p>
      </div>

      <div className="bf-gap__chart">
        <svg
          className="bf-gap__wave"
          viewBox="0 160 1446 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="bf-gap-wave"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="1446"
              y2="0"
            >
              <stop offset="0" stopColor="var(--bf-ink)" stopOpacity="0" />
              <stop offset="0.07" stopColor="var(--bf-ink)" stopOpacity="1" />
              <stop offset="0.93" stopColor="var(--bf-ink)" stopOpacity="1" />
              <stop offset="1" stopColor="var(--bf-ink)" stopOpacity="0" />
            </linearGradient>
            <clipPath id="bf-gap-wave-clip">
              <rect
                data-gap-wave-clip=""
                x="0"
                y="160"
                width="1446"
                height="220"
              />
            </clipPath>
          </defs>
          <path
            data-gap-wave=""
            d={WAVE}
            fill="none"
            stroke="url(#bf-gap-wave)"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            clipPath="url(#bf-gap-wave-clip)"
          />
        </svg>

        <ol className="bf-gap__points">
          {ecosystem.points.map((point) => (
            <li
              key={point.id}
              className="bf-gap__point"
              data-gap-point=""
              style={{ "--x": point.x, "--dot": point.dot } as CSSProperties}
            >
              <span className="bf-gap__marker" aria-hidden="true">
                <span className="bf-gap__dot" data-gap-dot="" />
                <span className="bf-gap__stem" data-gap-stem="" />
                <span className="bf-gap__icon" data-gap-icon="">
                  <PointIcon id={point.id} />
                </span>
              </span>
              <h3 data-gap-title="">{point.title}</h3>
              <p data-gap-body="">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
