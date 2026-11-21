import { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogPostPage } from "./pages/BlogPostPage";
import { AthletePage } from "./pages/AthletePage";
import { CoachPage } from "./pages/CoachPage";
import { DemoPage } from "./pages/DemoPage";
import { GymPage } from "./pages/GymPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ResourcesPage } from "./pages/ResourcesPage";

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Keep ST from re-applying the previous page's recorded scroll after SPA navigations.
    ScrollTrigger.clearScrollMemory("manual");

    // Dana fonts + late images change layout after first ST measure; refresh once settled.
    const refresh = () => ScrollTrigger.refresh();
    const fontsReady =
      "fonts" in document ? document.fonts.ready.then(refresh).catch(() => undefined) : undefined;
    window.addEventListener("load", refresh, { once: true });
    const late = window.setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(late);
      void fontsReady;
    };
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    // Global CSS uses scroll-behavior: smooth — force an instant jump on route changes.
    html.style.scrollBehavior = "auto";

    const goTop = () => {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const settle = () => {
      if (hash) {
        const id = decodeURIComponent(hash.replace(/^#/, ""));
        const target = id ? document.getElementById(id) : null;
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
      }
      goTop();
    };

    // Drop prior-route scroll memory before the new page's ScrollTriggers measure.
    ScrollTrigger.clearScrollMemory("manual");
    settle();

    const timers: number[] = [];
    const rafs: number[] = [];

    // Re-assert after layout / pin creation / late image-driven reflow.
    // Root cause of "sometimes not top": ScrollTrigger.refresh() + late layout
    // re-applied the previous page scroll after the first jump-to-top.
    rafs.push(
      window.requestAnimationFrame(() => {
        settle();
        ScrollTrigger.refresh();
        settle();
        rafs.push(
          window.requestAnimationFrame(() => {
            settle();
          }),
        );
      }),
    );

    for (const ms of [0, 50, 120, 250]) {
      timers.push(
        window.setTimeout(() => {
          settle();
          if (ms === 120) ScrollTrigger.refresh();
          settle();
        }, ms),
      );
    }

    timers.push(
      window.setTimeout(() => {
        html.style.scrollBehavior = previousBehavior;
      }, 280),
    );

    return () => {
      rafs.forEach((id) => window.cancelAnimationFrame(id));
      timers.forEach((id) => window.clearTimeout(id));
      html.style.scrollBehavior = previousBehavior;
    };
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gym" element={<GymPage />} />
        <Route path="/coach" element={<CoachPage />} />
        <Route path="/athlete" element={<AthletePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        <Route path="/demo" element={<DemoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
