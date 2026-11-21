# Baseline Technical SEO Audit 001 — Pinned Source Review

**Finding set:** BF-SEO-BASELINE-001  
**Date:** 2026-11-21  
**Target:** beatfit.ir — Persian SEO (`fa-IR`)  
**Pinned source:** `d11130cef8f941f54b06362bb9bd124f89853adb`  
**Method:** GitHub source inspection plus 11 bounded static checks. No application code was changed.

## 1. Evidence scope and limitations

Files inspected include `src/App.tsx`, `src/seo/*`, `src/config/site.ts`, `src/content/blog/posts.ts`, `src/content/home.ts`, `src/components/DemoForm.tsx`, `src/components/BlogArticle.tsx`, `index.html`, `vite.config.ts`, `scripts/emit-seo-html.ts`, `public/web.config`, `public/robots.txt` and `public/sitemap.xml`.

**Not performed:** trusted full checkout/build, live IIS/HTTP/TLS inspection, browser JavaScript-off/rendered comparison, Google Search Console inspection, conversion/CRM acceptance or field performance measurement. Unsuccessful prior retrieval attempts do not establish site downtime.

The [2026-11-18 research playbook](../references/2026-11-18-research-playbook.md) is historical. Some of its earlier source deficiencies (missing blog Sitemap URLs, missing route metadata, missing 404 template) have source-side implementations now and cannot be reasserted without review.

## 2. Source-declared pages

- Marketing: `/`, `/gym`, `/coach`, `/athlete`, `/resources`, `/demo`.
- Seven article URLs appear under the existing Persian `/blog/{slug}` routes; see [URL inventory](../inventory/source-route-inventory.csv).
- `public/sitemap.xml` declares 13 entries. `public/web.config` includes 12 non-home route rewrite-map entries, a 404 configuration and five legacy English blog alias redirects.
- Generated title, meta description, canonical, OG data and JSON-LD are defined per page. Source declarations are not evidence that production serves the intended output.

## 3. Findings

### BF-SEO-F01 — Demo lead form cannot submit in reviewed source

**Severity:** P1 business conversion.  
**Status:** CONFIRMED SOURCE OBSERVATION; live/CRM impact NOT RUN.  
**Evidence:** `src/components/DemoForm.tsx`: `onSubmit={(event) => event.preventDefault()}`. The form component has no API request, persistence or success/error state.
**Expected:** A secure, consent-aware workflow validates fields, submits to the approved endpoint and records a conversion only upon accepted lead.
**Risk:** Organic landing visitors cannot use this exact source component to complete a demo request.
**Actions:** Confirm API/CRM owner, endpoint, consent/privacy policy, error handling, rate limits and event semantics before coding.
**Acceptance:** Real tests of valid/invalid input, server errors, network failures, repeated submits and confirmed lead storage.

### BF-SEO-F02 — SEO HTML shells do not include full page body

**Severity:** P1 investigation (effect unknown).  
**Status:** CONFIRMED ARCHITECTURAL OBSERVATION; deployed/rendered impact NOT RUN.  
**Evidence:** `src/seo/html.ts`, `scripts/emit-seo-html.ts`, `vite.config.ts`, `src/main.tsx`.
**Observed:** The HTML generator produces route-specific metadata, but inserts only an H1 and summary paragraph as temporary static content; an inline script removes the block before React builds the full page.
**Risk:** Main body content, article passages and internal links require reliable JavaScript. This does not establish a Google indexing failure.
**Next check:** Compare initial HTML, JavaScript-disabled browser, fully rendered DOM and authorized Search Console rendering for sampled templates.
**Decision gate:** Consider actual prerender/SSG/SSR only if needed, preserving React/GSAP behavior.

### BF-SEO-F03 — Preferred HTTP/HTTPS canonical origin is unresolved

**Severity:** Conditional P1; may be intentional staging/deployment constraint.  
**Status:** SOURCE OBSERVATION; live TLS and host checks BLOCKED.
**Evidence:** `src/config/site.ts` defaults to `http://beatfit.ir`; Sitemap and robots use HTTP; `public/web.config` has an explicitly disabled HTTPS Redirect rule.
**Risk:** Source origin could disagree with actual HTTPS deployment, while prematurely enabling redirect could break a server without a valid certificate.
**Actions:** Confirm certificate, apex/www hosts, CDN or proxy, both protocol responses and Location chains before changing settings.
**Acceptance:** Stable approved canonical origin, correct permanent redirects, no loops and consistent sitemap/canonical/OG metadata.

### BF-SEO-F04 — Placeholder policy and social destinations

**Severity:** P2 trust/navigation.  
**Status:** CONFIRMED SOURCE OBSERVATION.
**Evidence:** `src/content/home.ts` contains `href: "#"` for privacy, terms and social accounts.
**Actions:** Obtain approved policies and real official destinations; provide accessible valid links or omit placeholders.
**Acceptance:** Verified destinations, consistency with demo lead privacy notice and functional browser navigation.

### BF-SEO-F05 — SEO generator writes tracked public assets

**Severity:** P2 build/release reproducibility.  
**Status:** CONFIRMED SOURCE CODE PATH; build NOT RUN.
**Evidence:** `scripts/emit-seo-html.ts` writes Sitemap and robots to both `dist` and `public`; rewrites `public/web.config` route-map entries.
**Risk:** Build may leave source-tree modifications or produce undocumented drift.
**Actions:** Prefer dist-only output, or review/validate generated tracked artifacts in CI.
**Acceptance:** Clean-checkout build, deterministic outputs and tracked-diff gate.

### BF-SEO-F06 — Health/editorial content accountability needs a review

**Severity:** P2 content/trust.  
**Status:** REVIEW CANDIDATE, not a claim that articles are scientifically wrong.
**Evidence:** `src/components/BlogArticle.tsx` displays `تیم محتوای بیت‌فیت`; `src/seo/schema.ts` uses an Organization as `BlogPosting.author`.
**Actions:** Identify genuine authors/reviewers, verify evidence and publication/update dates, evaluate sport/health claims and cite qualified sources.
**Acceptance:** Visible accurate bylines, reviewed claims and markup matching the page. No invented qualifications.

## 4. Verified source facts

| Source check | Observed |
|---|---|
| Base HTML locale | `lang=fa`, `dir=rtl` present |
| Sitemap | 13 URLs declared |
| Article registry vs sitemap | Seven published Persian slugs represented |
| Sitemap protocol | 13 of 13 HTTP |
| SEO Vite plugin | Present in code |
| IIS rewrite keys | 12 non-home entries |
| IIS 404 rule | Declared |
| IIS HTTPS redirect | Disabled in source |
| Temporary SEO body | H1 plus summary |
| Demo submit | Prevent-default only |
| Footer policy links | Placeholder destinations |

Eleven source predicates were observed; **they do not constitute eleven production test passes**.

## 5. Outstanding acceptance tests

| ID | Layer | Target | Result |
|---|---|---|---|
| LIVE-01 | HTTP | Home, gym, representative article, redirects | BLOCKED |
| LIVE-02 | HTTPS/TLS | Preferred host, certificate, www/apex | BLOCKED |
| LIVE-03 | Response status | Unknown route returns real 404 | BLOCKED |
| LIVE-04 | Redirects | Five legacy aliases return server-side permanent redirects | BLOCKED |
| LIVE-05 | Discovery | Robots/sitemap accessibility and canonical consistency | BLOCKED |
| BUILD-01 | Build | `npm ci && npm run build`, route shell output | NOT RUN |
| BROWSER-01 | Browser | JS-off and rendered DOM, mobile/desktop | NOT RUN |
| PLATFORM-01 | GSC | Indexed/canonical status by representative template | NOT RUN |
| CONV-01 | Forms | Confirmed legitimate lead receipt and privacy handling | NOT RUN |

See [verification record](../verification/2026-11-21-source-checks.md).

## 6. Priorities and next steps

1. Verify production TLS/origin, status codes, canonical alignment and redirects before touching HTTP/HTTPS settings.
2. Evaluate generated build output and critical page/article content availability before changing the rendering architecture.
3. Specify the real consent-aware demo submission and conversion flow, then implement under separate authorization.
4. Resolve placeholder links, editorial review and build reproducibility.
5. Begin evidence-backed Persian query research, SERP comparison, audience intent clustering and page mapping.
6. Track all actual tests, revisions and reviewed decisions in this folder.

**Potential SEO Engineering learning candidates:** Historical findings can become stale after implementation; source SEO shells are not full prerender; visual forms can lack a real business conversion flow. These are project observations, not claims of independently validated universal system improvement.

## Source references

- [Application routing](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/d11130cef8f941f54b06362bb9bd124f89853adb/src/App.tsx)
- [SEO HTML generation](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/d11130cef8f941f54b06362bb9bd124f89853adb/src/seo/html.ts)
- [Generator](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/d11130cef8f941f54b06362bb9bd124f89853adb/scripts/emit-seo-html.ts)
- [Origin](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/d11130cef8f941f54b06362bb9bd124f89853adb/src/config/site.ts)
- [IIS config](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/d11130cef8f941f54b06362bb9bd124f89853adb/public/web.config)
- [Sitemap](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/d11130cef8f941f54b06362bb9bd124f89853adb/public/sitemap.xml)
- [Demo form](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/d11130cef8f941f54b06362bb9bd124f89853adb/src/components/DemoForm.tsx)
- [Brand/footer links](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/d11130cef8f941f54b06362bb9bd124f89853adb/src/content/home.ts)
