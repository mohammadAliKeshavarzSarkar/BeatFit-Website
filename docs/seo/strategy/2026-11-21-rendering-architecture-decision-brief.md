# React SEO Rendering Architecture — Evidence and Decision Gate

**Record ID:** BF-SEO-RENDER-001  
**Date:** 2026-11-21  
**Status:** Evidence collected; architecture change **NOT approved** and **NOT implemented**.  
**Scope:** Persian BeatFit marketing and seven blog pages; source and built-preview behavior.  
**Evidence:** [Successful cross-PR browser run](../verification/2026-11-21-cross-pr-build-and-browser-qa.md), [source baseline audit](../audits/2026-11-21-source-baseline.md).

## Observed facts

1. The repository generates SEO-specific HTML files per route. These contain route-specific title, description, canonical and JSON-LD head, plus a temporary static H1 and summary paragraph.
2. During JavaScript execution, an inline script removes `main#bf-static-seo`, and React renders the full page, including blog article text and related links.
3. The real GitHub Actions TypeScript + Vite builds passed; generated head, Sitemap, robots, IIS routes and JSON-LD passed 254 bounded cross-artifact checks for each pinned review revision.
4. In a JavaScript-enabled mobile Chromium Vite Preview, the tested gym page, resources catalog and two article pages rendered content and expected links.
5. In a JavaScript-disabled Chromium Vite Preview, a sampled blog page retained the initial H1/summary shell but contained **no full `.bf-blog-post__body`** and **no related-article anchors**.
6. Production IIS/HTTP output and actual Google rendering/indexing have **not** been observed.

## Search interpretation — avoid overclaiming

Google Search Central documents that Google Search can render and process JavaScript, extract links from rendered content, and use rendered HTML for indexing. A JS-off experiment is useful for understanding dependencies; it **does not establish indexing failure**. Other crawlers and browsers may have different capabilities. Source HTML accessibility still matters for resilience and non-JavaScript consumers.

The current architecture should therefore remain an **evidence-gated improvement question**, not an automatic high-priority framework migration.

## Options for a future reviewed decision

| Option | Impact | Advantages | Costs / risks | Decision |
|---|---|---|---|---|
| A — Keep existing shells + verify Google rendering | No code refactor | Low risk; maintain current animations and client routing | Some content/links remain JS-dependent | Valid interim option; needs first-party rendering evidence |
| B — Prerender only article and resource content | Scoped build/render work | Important editorial text and links in initial HTML | Must avoid duplicate nodes, hydration mismatch and double H1; preserve exact visible content | Investigate feasibility only |
| C — Full-site SSG/SSR architecture | More extensive change | Initial meaningful markup for all templates | Framework/router/data/GSAP migration; higher QA and hosting cost | Deferred until evidence/business value justify |
| D — Bot-only dynamic rendering | Specialized crawler workaround | May serve static HTML to some bots | User/bot parity and operational complexity; not preferred as general approach | Not recommended as default |

**No new technique should serve materially different user/bot content or promise guaranteed indexing.**

## Required evidence before choosing an implementation

- Google Search Console URL Inspection: tested URL, Google-selected canonical, rendered HTML, loaded JS resources and indexing state for each template.
- Production HTTP direct fetch: actual HTML, status codes, redirects and intended preferred origin.
- Repeat browser tests on `/`, `/resources`, `/gym`, `/coach`, `/athlete` and representative article pages on staging/IIS, both JS-enabled and disabled.
- Determine which essential article paragraphs, tables, FAQs, citations, structured data and internal links are truly missing from the first HTML response.
- Measure real index coverage, qualified search traffic, field performance and engineering cost rather than guessing at ranking or crawl improvements.
- Compare smallest reversible content-prerender prototype against full architecture rewrite; ensure visual/GSAP performance, hydration safety, schema parity, accessibility and no duplicate SEO tags.

## Acceptance criteria if full article prerender is eventually approved

1. For each of the seven article URLs, initial fetched HTML contains meaningful unique paragraphs, primary headings and relevant internal links, not merely the existing H1 and summary.
2. JavaScript-enabled DOM matches substantive content and page metadata of initial HTML; no duplicate H1/FAQ/schema or React hydration errors.
3. Source and rendered canonical/schema URLs are normalized-equivalent, including Persian readable and percent-encoded path forms.
4. A real HTTP 404 is returned for unknown routes, and legacy aliases redirect appropriately on the deployed stack.
5. No regression to mobile animations, interaction, design-system consistency or app loading.
6. Search Console shows Google rendering/index behavior as actually observed; no guaranteed rank/traffic claims.
7. Separate reviewed PR, reproducible CI, rollback and owner approval exist before deployment.

## Current recommendation

**Do not rewrite the website yet.** Keep BF-SEO-F02 as a verified source/preview **JavaScript dependency**, not an observed Google search failure. Obtain first-party Search Console and real IIS/HTTP evidence, then decide whether partial static prerender of blog content has sufficient value and acceptable complexity.

## Official Google references

- [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Fix Search-related JavaScript issues](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript)
- [Dynamic rendering as a workaround](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering)
