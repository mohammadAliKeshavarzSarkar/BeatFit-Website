# Full Article Content in Initial HTML — No-JavaScript SEO Hardening

**Date:** 2026-11-24  
**Record:** BF-SEO-ARTICLE-STATIC-001  
**Scope:** Seven published article route HTML shells; no new URLs, no content rewriting, no Google Search Console account access.  
**Status:** Review-only implementation, exact-commit source/build and browser CI PASS; live Google-rendered/indexing inspection NOT RUN.

## Observed gap

Before this change, `src/seo/html.ts` generated only `<h1>` plus the article summary into the initial HTML. The full rich article body was created later by the React client. Our earlier mobile browser QA observed that with JavaScript disabled the body was absent. This is an **architecture risk**, not proof of non-indexing: Google can execute JavaScript, but [Google Search Central recommends pre-rendering](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) to reduce crawler/user dependency on JavaScript.

## Implementation

- `src/seo/article-static.ts` renders the **same published source blocks** into escaped, semantic HTML with no secondary copy database. The renderer supports heading, paragraph, rich inline links/strong/emphasis, list, table, figure, chart as `<dl>`, process as `<ol>`, FAQ, references and CTA. Related article links and a resources return link remain crawlable. Unknown or unsafe URL schemes throw and break the build; text, link attributes and alt text are HTML-escaped.
- `src/seo/html.ts` accepts an optional article content fragment alongside the existing H1, summary, branded navigation and canonical SEO head. For the homepage and marketing pages the shell is unchanged.
- `scripts/emit-seo-html.ts` maps each published article document ID to its original source post and inserts the generated article HTML only into that article's route shell. Article metadata, JSON-LD, sitemap, canonical URL and file names stay unchanged.
- Existing pre-React cleanup script removes `#bf-static-seo` when JavaScript executes, so the normal React article renderer remains the sole visible body on hydrated pages. With JavaScript disabled, the semantically complete static body is readable.
- A new `scripts/verify-static-article-shells.mjs` checks **exactly seven** generated route HTML files with one H1 each, at least five H2s, nine paragraphs, four links, substantive article text, no executable inline article markup and a bounded HTML response size.
- CI runs the static content gate after the real TypeScript/Vite build, before existing SEO artifact tests. A passing CI is evidence of **build output**, not proof of live server rewrites or Googlebot indexing.

## Exact successful GitHub CI evidence

- **Tested code commit:** `1cd4ef29c03307d5b8d0e4ec0abdb576413e770c`.
- [SEO Build Verification 45386243445](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/45386243445): SUCCESS. Ten existing SEO fixture tests, seven link fixtures, 62 literal internal links, locked build, seven complete static article shells, 255 generated artifact checks and tracked-public consistency all passed.
- [SEO Article Static HTML Browser QA 45386243535](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/45386243535): SUCCESS, job `138417788463`. Actual headless Chromium / mobile 390px / Persian locale validated **7/7 JavaScript-disabled generated article HTML route shells**. Each had 14,465–16,742 readable text characters plus H2s, links and correct canonical. Two representative public SPA routes (heart-rate zones, gym monitoring guide) passed JS-enabled React hydration, removal of `#bf-static-seo`, title consistency and canonical checks.
- The JavaScript-disabled browser inspected the generated **route HTML shell files** under Vite Preview, not a deployed IIS rewrite response. That distinction is intentional: Vite Preview's generic fallback is not evidence of how production IIS rewrites `/blog/...`. Production response/Google URL Inspection gates below remain open.
- The later documentation-only commit that records this result is **not** represented as a re-run on its new exact head; the implementation code was already tested at the pinned revision above.

## QA / acceptance

1. Run locked Node 22 `npm ci`, existing SEO fixtures, link-fixtures and source link check.
2. Run `npm run build`, then `npm run test:seo:static-articles` and `npm run test:seo`. Confirm clean tracked-public diff; no changes to sitemap or IIS rewrite rules are intended.
3. Inspect built `dist/route-html/blog/heart-rate-zones.html` with JavaScript disabled or as plain HTML. Confirm a genuine article paragraph, five-zone sections, source citations and related links are present. All seven sources must produce equivalent complete substantive bodies.
4. In a JavaScript-enabled **production build**, ensure normal React hydration removes the static shell before showing the full article, keeps only one visible article H1, and preserves internal navigation and canonical.
5. **After an approved deployment**, inspect an actual public article URL (not the hidden route HTML file) via Google Search Console URL Inspection. Compare crawled HTML, Google-rendered HTML, Google-selected canonical, indexed status and any errors. Verify live IIS rewrite sends the correct shell to `/blog/<public-slug>`. Do not claim Google rankings improve purely from an improved initial HTML document.

## Release constraints

- This branch must not merge automatically with **draft PR #44** because that separately proposes moving `/blog/live-tv-group-training` to `/blog/training-load`. The static renderer is deliberately generated from the current public URL registry and must be retested after any URL move.
- Demo metadata changes in PR #43 are unrelated to article-body rendering.
- No keyword-stuffed duplicate content, hidden content for Googlebot, different Googlebot-only response or fabricated medical guidance has been added. The static content matches the source and is available to ordinary no-JS users.
- Google may choose different snippets and can index JavaScript sites. This is a preventive technical improvement, not a guarantee of indexing.
