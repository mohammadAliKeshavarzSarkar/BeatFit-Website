import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import type { Animation } from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import clock from "react-useanimations/lib/clock";
import target from "react-useanimations/lib/target";
import thermometer from "react-useanimations/lib/thermometer";
import trendingUp from "react-useanimations/lib/trendingUp";
import { hero } from "../content/home";
import { MarketingCtaIcon, UseAnimationIcon } from "./animations";
import { HeroProofRail } from "./HeroProofRail";
import { HeroWordmark } from "./HeroWordmark";

const HERO_FEATURE_ANIMS: Record<
  (typeof hero.features)[number]["icon"],
  Animation
> = {
  activity,
  trendingUp,
  thermometer,
  target,
  clock,
};

function introIsBlocking() {
  return document.documentElement.classList.contains("bf-intro-active");
}

function shellIsReady() {
  const shell = document.querySelector<HTMLElement>("[data-home-shell]");
  if (!shell) return true;
  return shell.classList.contains("is-revealed");
}

/** Run after home intro unlocks (or immediately when intro is skipped). */
function whenHeroCanEnter(run: () => void) {
  if (!introIsBlocking() && shellIsReady()) {
    run();
    return () => {};
  }

  let done = false;
  const tryRun = () => {
    if (done) return;
    if (introIsBlocking() || !shellIsReady()) return;
    done = true;
    observer.disconnect();
    run();
  };

  const observer = new MutationObserver(tryRun);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  const shell = document.querySelector("[data-home-shell]");
  if (shell) {
    observer.observe(shell, { attributes: true, attributeFilter: ["class"] });
  }

  tryRun();
  return () => {
    done = true;
    observer.disconnect();
  };
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [openFeature, setOpenFeature] = useState<string | null>(null);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.style.setProperty("--bf-hero-shrink", "0");
      node.classList.add("is-entered");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const range = Math.min(220, window.innerHeight * 0.28);
      const progress = Math.min(1, Math.max(0, window.scrollY / range));
      node.style.setProperty("--bf-hero-shrink", progress.toFixed(3));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wordmark = root.querySelector<HTMLElement>(".bf-hero__wordmark");
    const mark = root.querySelector<HTMLElement>(".bf-hero__mark");
    const sprinter = root.querySelector<HTMLElement>(".bf-hero__sprinter");
    const features = root.querySelectorAll<HTMLElement>(".bf-hero-feat");
    const proof = root.querySelectorAll<HTMLElement>(".bf-hero-proof");
    const copy = root.querySelectorAll<HTMLElement>(
      ".bf-hero__title, .bf-hero__lede, .bf-hero__app-link",
    );

    if (reduce) {
      root.classList.add("is-entered");
      return;
    }

    gsap.set(
      [wordmark, mark, sprinter, ...features, ...proof, ...copy].filter(Boolean),
      { autoAlpha: 0 },
    );
    gsap.set(wordmark, { y: 28, scale: 0.98, transformOrigin: "50% 50%" });
    gsap.set(mark, { scale: 0.9, y: 18, transformOrigin: "50% 80%" });
    gsap.set(sprinter, { y: 56, scale: 0.97, transformOrigin: "50% 100%" });
    gsap.set(features, { y: 16, scale: 0.92, transformOrigin: "50% 50%" });
    gsap.set(proof, { y: 20, x: 12 });
    gsap.set(copy, { y: 20, x: -12 });

    let tl: gsap.core.Timeline | null = null;

    const stopWait = whenHeroCanEnter(() => {
      tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => root.classList.add("is-entered"),
      });

      if (wordmark) {
        tl.to(
          wordmark,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          0.05,
        );
      }
      if (mark) {
        tl.to(
          mark,
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.95, ease: "power3.out" },
          0.2,
        );
      }
      if (sprinter) {
        tl.to(
          sprinter,
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.05, ease: "power3.out" },
          0.38,
        );
      }
      if (features.length) {
        tl.to(
          features,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
          },
          0.72,
        );
      }
      // Side rails settle on the hero floor — copy from the left, proof from the right.
      if (copy.length) {
        tl.to(
          copy,
          { autoAlpha: 1, x: 0, y: 0, duration: 0.5, stagger: 0.08 },
          0.9,
        );
      }
      if (proof.length) {
        tl.to(
          proof,
          { autoAlpha: 1, x: 0, y: 0, duration: 0.5, stagger: 0.08 },
          0.95,
        );
      }
    });

    return () => {
      stopWait();
      tl?.kill();
    };
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="bf-hero"
      aria-labelledby="hero-title"
    >
      <div className="bf-hero__stage">
        <div className="bf-hero__frame">
          <div className="bf-hero__copy" dir="rtl">
            <h1 id="hero-title" className="bf-hero__title">
              {hero.title}
            </h1>
            <p className="bf-hero__lede">{hero.lede}</p>
          </div>

          <div className="bf-hero__composition">
            <div className="bf-hero__wordmark" aria-hidden="true">
              <HeroWordmark />
            </div>

            <div className="bf-hero__visual">
              <img
                className="bf-hero__mark"
                src={hero.markSrc}
                alt=""
                width={589}
                height={506}
                decoding="async"
                aria-hidden="true"
              />
              <img
                className="bf-hero__sprinter"
                src={hero.sprinterSrc}
                alt={hero.sprinterAlt}
                width={498}
                height={623}
                decoding="async"
                fetchPriority="high"
              />

              <ul className="bf-hero__features" aria-label="قابلیت‌های بیت‌فیت">
                {hero.features.map((feature) => {
                  const isOpen = openFeature === feature.id;

                  return (
                    <li
                      key={feature.id}
                      className="bf-hero-feat"
                      style={
                        {
                          "--bf-hero-feat-x": feature.x,
                          "--bf-hero-feat-y": feature.y,
                        } as CSSProperties
                      }
                    >
                      <button
                        type="button"
                        className="bf-hero-feat__hit"
                        aria-label={feature.ariaLabel}
                        aria-expanded={isOpen}
                        onMouseEnter={() => {
                          if (window.matchMedia("(hover: hover)").matches) {
                            setOpenFeature(feature.id);
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.matchMedia("(hover: hover)").matches) {
                            setOpenFeature(null);
                          }
                        }}
                        onFocus={() => setOpenFeature(feature.id)}
                        onBlur={() => setOpenFeature(null)}
                        onClick={() => {
                          if (window.matchMedia("(hover: hover)").matches) return;
                          setOpenFeature((current) =>
                            current === feature.id ? null : feature.id,
                          );
                        }}
                      >
                        <span className="bf-hero-feat__icon" aria-hidden="true">
                          <UseAnimationIcon
                            animation={HERO_FEATURE_ANIMS[feature.icon]}
                            size={16}
                            interaction="hover-replay"
                          />
                        </span>
                        <span className="bf-hero-feat__label" aria-hidden="true">
                          {feature.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <a
            className="bf-hero__app-link"
            href={hero.appLinkHref}
            dir="rtl"
          >
            <span className="bf-hero__app-link-label">
              {hero.appLinkLabel}
            </span>
            <span className="bf-hero__app-link-icon" aria-hidden="true">
              <MarketingCtaIcon size={16} />
            </span>
          </a>

          <HeroProofRail />
        </div>
      </div>
    </section>
  );
}
