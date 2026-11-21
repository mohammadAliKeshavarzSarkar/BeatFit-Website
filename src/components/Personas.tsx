import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { journeys, personasCopy } from "../content/home";
import type { PersonaId } from "../types/persona";
import { Container, Section, SectionHead } from "../ui";
import { cn } from "../lib/cn";
import { JourneyIcon } from "./JourneyIcon";

type PersonasProps = {
  value: PersonaId | null;
  onChange: (persona: PersonaId | null) => void;
};

type MorphRect = {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  flying: boolean;
};

const EXIT_MS = 380;
const MORPH_MS = 560;
const DESKTOP_FADE_MS = 520;
const BACK_MS = 420;
const GRID_ENTER_MS = 380;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isDesktopPersonas() {
  return window.matchMedia("(min-width: 900px)").matches;
}

export function Personas({ value, onChange }: PersonasProps) {
  const stickyImgRef = useRef<HTMLImageElement>(null);
  const cardImgRefs = useRef<Partial<Record<PersonaId, HTMLImageElement | null>>>({});
  const timersRef = useRef<number[]>([]);
  const morphRef = useRef<MorphRect | null>(null);
  const morphGenRef = useRef(0);

  const [exitingId, setExitingId] = useState<PersonaId | null>(null);
  const [leavingDetail, setLeavingDetail] = useState(false);
  const [entered, setEntered] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [morph, setMorph] = useState<MorphRect | null>(null);
  const [gridEntering, setGridEntering] = useState(false);

  morphRef.current = morph;

  const isDetail = Boolean(value);
  const isExiting = Boolean(exitingId);

  const focusTabAt = (index: number) => {
    const items = personasCopy.items;
    const next = items[(index + items.length) % items.length];
    document.getElementById(next.tabId)?.focus();
  };

  const onTabListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const tabs = personasCopy.items;
    const currentIndex = tabs.findIndex(
      (item) => item.tabId === (event.target as HTMLElement).id,
    );
    if (currentIndex < 0) return;

    event.preventDefault();

    // RTL: ArrowRight moves to previous item, ArrowLeft to next
    if (event.key === "ArrowRight") focusTabAt(currentIndex - 1);
    else if (event.key === "ArrowLeft") focusTabAt(currentIndex + 1);
    else if (event.key === "Home") focusTabAt(0);
    else if (event.key === "End") focusTabAt(tabs.length - 1);
  };

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  useEffect(() => () => clearTimers(), []);

  const scrollToSection = (behavior: ScrollBehavior = "smooth") => {
    const section = document.getElementById("personas");
    if (!section) return;
    section.scrollIntoView({ behavior, block: "start" });
  };

  /** Reveal sticky image + unlock UI after the handoff (morph or soft fade). */
  const finishHandoff = (gen: number, settleMs = 40) => {
    if (gen !== morphGenRef.current) return;
    setImageReady(true);
    later(() => {
      if (gen !== morphGenRef.current) return;
      setMorph(null);
      setEntered(true);
      setBusy(false);
    }, settleMs);
  };

  useEffect(() => {
    if (!isDetail || !value || leavingDetail) return;

    const gen = ++morphGenRef.current;
    const reduce = prefersReducedMotion();
    const desktop = isDesktopPersonas();
    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;

    /* Jump section into place first so the morph target does not move mid-flight. */
    scrollToSection("auto");

    const startHandoff = () => {
      if (cancelled || gen !== morphGenRef.current) return;

      /* Desktop: soft fade out → soft fade in. No flying image transfer. */
      if (desktop || reduce) {
        raf1 = requestAnimationFrame(() => {
          raf2 = requestAnimationFrame(() => {
            if (cancelled || gen !== morphGenRef.current) return;
            if (reduce) {
              finishHandoff(gen, 40);
              return;
            }
            /* Image + copy fade in together; unlock after the soft settle. */
            setImageReady(true);
            setEntered(true);
            later(() => {
              if (gen !== morphGenRef.current) return;
              setMorph(null);
              setBusy(false);
            }, DESKTOP_FADE_MS);
          });
        });
        return;
      }

      const currentMorph = morphRef.current;
      if (!currentMorph) {
        finishHandoff(gen);
        return;
      }

      const target = stickyImgRef.current;
      if (!target) {
        finishHandoff(gen);
        return;
      }

      const to = target.getBoundingClientRect();
      if (to.width < 2 || to.height < 2) {
        finishHandoff(gen);
        return;
      }

      /* Mobile: two frames — paint start pose, then fly to the sticky box. */
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          if (cancelled || gen !== morphGenRef.current) return;
          const settled = stickyImgRef.current?.getBoundingClientRect() ?? to;
          setMorph((prev) =>
            prev
              ? {
                  ...prev,
                  left: settled.left,
                  top: settled.top,
                  width: settled.width,
                  height: settled.height,
                  flying: true,
                }
              : prev,
          );

          later(() => {
            if (cancelled || gen !== morphGenRef.current) return;
            finishHandoff(gen);
          }, MORPH_MS);
        });
      });
    };

    raf1 = requestAnimationFrame(startHandoff);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handoff is keyed by persona enter
  }, [isDetail, value, leavingDetail]);

  const selectPersona = (id: PersonaId) => {
    if (busy || isExiting || leavingDetail) return;
    clearTimers();
    morphGenRef.current += 1;
    setBusy(true);
    setExitingId(id);
    setEntered(false);
    setImageReady(false);

    const reduce = prefersReducedMotion();
    const desktop = isDesktopPersonas();
    const img = cardImgRefs.current[id];
    const persona = personasCopy.items.find((item) => item.id === id);

    // Morph flight is mobile-only; desktop uses a soft fade handoff.
    if (!reduce && !desktop && img && persona) {
      const rect = img.getBoundingClientRect();
      if (rect.width > 2 && rect.height > 2) {
        setMorph({
          src: persona.image,
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          flying: false,
        });
      } else {
        setMorph(null);
      }
    } else {
      setMorph(null);
    }

    later(() => {
      onChange(id);
      setExitingId(null);
    }, reduce ? 0 : EXIT_MS);
  };

  const resetPersona = () => {
    if (busy || leavingDetail || isExiting) return;
    clearTimers();
    morphGenRef.current += 1;
    setBusy(true);
    setLeavingDetail(true);
    setEntered(false);
    setImageReady(false);
    setMorph(null);

    const reduce = prefersReducedMotion();
    scrollToSection(reduce ? "auto" : "smooth");

    later(() => {
      onChange(null);
      setLeavingDetail(false);
      setGridEntering(true);
      setBusy(false);
      requestAnimationFrame(() => {
        scrollToSection(reduce ? "auto" : "smooth");
        const firstTab = document.getElementById(personasCopy.items[0].tabId);
        firstTab?.focus();
      });
      later(() => setGridEntering(false), reduce ? 0 : GRID_ENTER_MS);
    }, reduce ? 0 : BACK_MS);
  };

  return (
    <Section
      id="personas"
      labelledBy="personas-title"
      className={cn("bf-personas-section", isDetail && "is-detail")}
    >
      <Container wide>
        <SectionHead
          titleId="personas-title"
          title={personasCopy.title}
          subtitle={personasCopy.subtitle}
        />

        {!isDetail ? (
          <div
            className={cn(
              "bf-persona__grid",
              isExiting && "is-exiting",
              gridEntering && "is-entering",
            )}
            role="tablist"
            aria-label={personasCopy.rolesLabel}
            onKeyDown={onTabListKeyDown}
          >
            {personasCopy.items.map((persona, index) => {
              const isChosen = exitingId === persona.id;
              return (
                <button
                  key={persona.id}
                  type="button"
                  role="tab"
                  id={persona.tabId}
                  aria-controls={persona.panelId}
                  aria-selected={false}
                  className={cn(
                    "bf-persona-card",
                    isExiting && (isChosen ? "is-chosen" : "is-fading"),
                  )}
                  style={{ ["--bf-card-i" as string]: index }}
                  onClick={() => selectPersona(persona.id)}
                  disabled={busy}
                >
                  <div className="bf-persona-card__avatar">
                    <img
                      ref={(node) => {
                        cardImgRefs.current[persona.id] = node;
                      }}
                      src={persona.image}
                      alt={persona.imageAlt}
                      width={400}
                      height={533}
                      className={cn(isChosen && morph && "is-morphing")}
                    />
                  </div>
                  <h3>{persona.title}</h3>
                  <p>{persona.body}</p>
                </button>
              );
            })}
          </div>
        ) : null}

        {/* All journeys stay in initial HTML for SEO; interaction only toggles visibility */}
        <div
          className={cn("bf-persona-panels", !isDetail && "is-dormant")}
          aria-hidden={!isDetail}
        >
          {personasCopy.items.map((persona) => {
            const journey = journeys[persona.id];
            const isActive = isDetail && value === persona.id;
            const noteCount = journey.steps.length;

            return (
              <div
                key={persona.id}
                id={persona.panelId}
                role="tabpanel"
                aria-labelledby={persona.tabId}
                hidden={!isActive}
                className={cn(
                  "bf-persona-detail",
                  isActive && "is-active",
                  isActive && entered && "is-entered",
                  isActive && leavingDetail && "is-leaving",
                  isActive && imageReady && "is-image-ready",
                )}
                dir="rtl"
              >
                <aside className="bf-persona-detail__sticky">
                  <figure className="bf-persona-detail__media">
                    <img
                      ref={isActive ? stickyImgRef : undefined}
                      src={persona.image}
                      alt={persona.imageAlt}
                      width={520}
                      height={700}
                    />
                  </figure>
                  <div className="bf-persona-detail__copy">
                    <h3 className="bf-persona-detail__role">{persona.title}</h3>
                    <p className="bf-persona-detail__lead">{journey.message}</p>
                    <button
                      type="button"
                      className="bf-persona-detail__back bf-persona-detail__back--sticky"
                      onClick={resetPersona}
                      disabled={busy || !isActive}
                      tabIndex={isActive ? 0 : -1}
                    >
                      {personasCopy.changeRoleLabel}
                    </button>
                  </div>
                </aside>

                <div className="bf-persona-detail__notes">
                  {journey.steps.map((step, index) => (
                    <article
                      key={step.title}
                      className={cn(
                        "bf-persona-note",
                        index % 2 === 1 && "bf-persona-note--alt",
                        step.image && "bf-persona-note--media",
                      )}
                      style={{
                        ["--bf-note-i" as string]: index,
                        ["--bf-note-rev" as string]: noteCount - 1 - index,
                      }}
                    >
                      <div className="bf-persona-note__copy">
                        <span className="bf-persona-note__icon" aria-hidden="true">
                          <JourneyIcon id={step.icon} motion />
                        </span>
                        <h4 className="bf-persona-note__title">{step.title}</h4>
                        <p className="bf-persona-note__body">{step.body}</p>
                      </div>
                      {step.image ? (
                        <figure className="bf-persona-note__media">
                          <img
                            src={step.image}
                            alt={step.imageAlt ?? ""}
                            loading="lazy"
                            decoding="async"
                          />
                        </figure>
                      ) : null}
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="bf-persona-detail__back bf-persona-detail__back--foot"
                  onClick={resetPersona}
                  disabled={busy || !isActive}
                  tabIndex={isActive ? 0 : -1}
                >
                  {personasCopy.changeRoleLabel}
                </button>
              </div>
            );
          })}
        </div>
      </Container>

      {morph ? (
        <img
          className={cn("bf-persona-morph", morph.flying && "is-flying")}
          src={morph.src}
          alt=""
          aria-hidden="true"
          style={{
            left: morph.left,
            top: morph.top,
            width: morph.width,
            height: morph.height,
          }}
        />
      ) : null}
    </Section>
  );
}
