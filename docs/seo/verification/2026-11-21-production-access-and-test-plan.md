# Production HTTP and Rendering Verification — Attempt and Runbook

**Record:** BF-SEO-VERIFY-002
**Date:** 2026-11-21
**Website:** beatfit.ir
**Source reference:** `d11130cef8f941f54b06362bb9bd124f89853adb` (source behavior is not assumed to match deployment)
**Mode:** Read-only external attempts plus a future reproducible acceptance plan.

## 1. Actual attempts (this run)

| Test | Attempted target | Observed tool response | Result classification |
|---|---|---|---|
| LIVE-01 | `https://beatfit.ir/` | Public web fetch did not return usable headers/body | BLOCKED |
| LIVE-02 | `http://beatfit.ir/` | Public web fetch did not return usable headers/body | BLOCKED |
| LIVE-03 | `https://beatfit.ir/robots.txt` | Public web fetch did not return usable resource | BLOCKED |
| LIVE-04 | `https://beatfit.ir/sitemap.xml` | Public web fetch did not return usable resource | BLOCKED |
| LIVE-05 | Site-specific public web search | No dependable BeatFit site-result evidence was returned | INCONCLUSIVE |
| LIVE-06 | External container Python requests to HTTP/HTTPS and robots | DNS resolution failed inside the test container | BLOCKED |

**Interpretation:** These results show limits of the available testing networks and do not establish a 404, outage, misconfiguration, DNS issue for real users, noindex, or lack of Google indexing. Actual HTTP status, TLS details and live host redirects remain unknown.

**No claim of a production PASS or FAIL was made.** The source has an intentionally disabled HTTPS redirect; do not enable it until TLS and host routing are verified.

## 2. Authorized test matrix

| ID | Environment | Inputs | Pass criteria | Current |
|---|---|---|---|---|
| HTTP-01 | Production | http/https × apex/www for home | Preferred secure canonical host; permanent redirect from alternatives; no loop | BLOCKED |
| HTTP-02 | Production | /gym /coach /athlete /resources /demo | Stable response, route-specific head and correct body | NOT RUN |
| HTTP-03 | Production | One Persian blog slug | 200, canonical matches intended URL, correct article | NOT RUN |
| HTTP-04 | Production | /blog/heart-rate-zones | Permanent server redirect to established Persian slug | NOT RUN |
| HTTP-05 | Production | /nonexistent-seo-audit-test | Actual HTTP 404 with nonindexable error body | NOT RUN |
| HTTP-06 | Production | /robots.txt and /sitemap.xml | Fetchable, consistent canonical host; 13 expected source URLs if deployed revision matches | BLOCKED |
| BUILD-01 | Trusted checkout | npm ci, npm run build | Successful build, expected 13 URL outputs, 12 non-home route shells, 404 template | NOT RUN |
| BUILD-02 | Built output | HTML of /, /gym and two articles | Unique title, description, canonical, JSON-LD, no duplicate tags | NOT RUN |
| RENDER-01 | Preview/staging | JS enabled vs disabled | Important headings, passages, links and canonical remain accessible; content parity reviewed | NOT RUN |
| RENDER-02 | Preview/staging | Mobile viewport and slow network | Visible content, accessible links, no layout-blocking animation | NOT RUN |
| GSC-01 | Authorized GSC | URL Inspection per template | Actual indexing status and Google-selected canonical recorded | NOT RUN |
| BIZ-01 | Authorized lead system | Demo test submission using approved dummy input | Real lead accepted, confirmation shown, safe analytics event emitted | NOT RUN |

## 3. Safe external diagnostics (run from a trusted network)

Commands below **are examples only**; they were NOT executed successfully against production in this environment. Do not substitute these snippets for captured results.

```bash
# DNS: confirm records; NXDOMAIN here would require investigation from multiple networks.
dig +short beatfit.ir A
dig +short www.beatfit.ir A

# Headers and redirect chains. Avoid passing production tokens in the shell.
curl -sS -I --max-redirs 5 -L http://beatfit.ir/
curl -sS -I --max-redirs 5 -L https://beatfit.ir/
curl -sS -I --max-redirs 5 -L https://www.beatfit.ir/

# Capture GET response codes and final URL (some servers handle HEAD differently).
curl -sS -L --max-redirs 5 -o /dev/null \
  -w 'status=%{http_code} final=%{url_effective} redirects=%{num_redirects}\n' \
  https://beatfit.ir/gym

# Source markup, robots and sitemap; record unredacted public response only.
curl -sS -D headers-gym.txt -o body-gym.html https://beatfit.ir/gym
curl -sS https://beatfit.ir/robots.txt
curl -sS https://beatfit.ir/sitemap.xml

# Confirm REAL 404 code. Use a URL known never to have existed.
curl -sS -o /dev/null -w '%{http_code}\n' \
  https://beatfit.ir/nonexistent-seo-audit-test

# Validate legacy redirects; follow chain separately.
curl -sS -I https://beatfit.ir/blog/heart-rate-zones
```

If HTTPS is not ready, report the certificate/handshake failure accurately; never disable certificate validation just to force a PASS. IIS URL Rewrite settings must be tested on the real hosting stack, not inferred solely from the repository file.

## 4. Build and browser verification (trusted checkout, no deploy)

```bash
npm ci
npm run build
npm run preview -- --host 127.0.0.1
```

Capture build version, exit code, generated `dist/index.html`, `dist/404.html`, `dist/route-html/*`, `dist/sitemap.xml`, `dist/robots.txt`, and any dirty tracked files after build. Compare source HTML and fully rendered DOM across marketing, resources and Persian article pages.

The generator `scripts/emit-seo-html.ts` also writes to tracked `public/` files. Run this only in an isolated working tree and **review the git diff**; do not automatically commit or deploy generated file changes.

## 5. How to record actual results

For each test capture: test ID, date/time with timezone, environment, requested URL, deployed code revision (if known), exact command, HTTP status/headers, redirect sequence, canonical, rendered-vs-source observations, screenshot or trace reference, actual result, PASS/FAIL/BLOCKED classification, reviewer and follow-up finding.

**Escalation logic:** Confirmed canonical/SSL mismatch and bad 200/404 behavior are early technical priorities; a JS-rendering failure must be proven with actual observed output rather than inferred from source architecture.

## Official references

- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: Redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Google: Canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
