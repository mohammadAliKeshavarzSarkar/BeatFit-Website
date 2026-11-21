import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import {
  Blogs,
  Cta,
  Ecosystem,
  Experience,
  Faq,
  Footer,
  Header,
  HomeIntro,
  Hero,
  Personas,
  Product,
  SessionFlow,
} from "../components";
import { shouldPlayHomeIntro } from "../lib/homeIntroGate";
import { cn } from "../lib/cn";
import { DocumentSeo } from "../seo/DocumentSeo";
import { homeDocument } from "../seo/marketing";
import type { PersonaId } from "../types/persona";

export function HomePage() {
  const [persona, setPersona] = useState<PersonaId | null>(null);
  const [playIntro] = useState(() => shouldPlayHomeIntro());
  const [shellRevealed, setShellRevealed] = useState(() => !playIntro);

  /* Layout effect so the home shell never paints visible for a frame before the fade-in */
  useLayoutEffect(() => {
    if (!shellRevealed || !playIntro) return;

    const shell = document.querySelector<HTMLElement>("[data-home-shell]");
    if (!shell) return;

    gsap.fromTo(
      shell,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.55, ease: "power2.out" },
    );
  }, [shellRevealed, playIntro]);

  return (
    <>
      <DocumentSeo document={homeDocument} />
      {playIntro ? <HomeIntro onDone={() => setShellRevealed(true)} /> : null}
      <div
        className={cn("bf-home-shell", shellRevealed && "is-revealed")}
        data-home-shell=""
        aria-hidden={shellRevealed ? undefined : true}
        style={
          shellRevealed
            ? undefined
            : { opacity: 0, visibility: "hidden", pointerEvents: "none" }
        }
      >
        <Header />
        <main>
          <Hero />
          <Ecosystem />
          <Experience />
          <SessionFlow />
          <Product />
          <Personas value={persona} onChange={setPersona} />
          <Blogs />
          <Faq />
          <Cta />
        </main>
        <Footer />
      </div>
    </>
  );
}
