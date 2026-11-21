# Source Verification — 2026-11-21

**ID:** BF-SEO-SOURCE-CHECKS-001  
**Pinned commit:** `d11130cef8f941f54b06362bb9bd124f89853adb`  
**Environment:** GitHub source contents, not production  
**Method:** Eleven bounded text/predicate checks on fetched source and declared route data.

| ID | Static predicate | Observed source value | Live/build result |
|---|---|---|---|
| SRC-01 | `index.html` has `lang=fa`, `dir=rtl` | TRUE | NOT RUN |
| SRC-02 | `public/sitemap.xml` has 13 `loc` entries | TRUE (13) | NOT RUN |
| SRC-03 | Seven declared published blog slugs in Sitemap | TRUE (7/7) | NOT RUN |
| SRC-04 | All Sitemap locations start `http://beatfit.ir` | TRUE (13/13) | BLOCKED (TLS) |
| SRC-05 | Vite calls `emitSeoFiles` for route shells | TRUE | NOT RUN (build) |
| SRC-06 | `public/web.config` has 12 route-map entries | TRUE (12) | NOT RUN (IIS) |
| SRC-07 | 404 status and template declared in config | TRUE | NOT RUN (HTTP) |
| SRC-08 | HTTPS Redirect configured with `enabled="false"` | TRUE | BLOCKED (TLS) |
| SRC-09 | Generated static SEO body consists of H1 and summary | TRUE | NOT RUN (browser) |
| SRC-10 | Demo form `onSubmit` only prevents default | TRUE | NOT RUN (lead) |
| SRC-11 | Footer legal links use `href="#"` | TRUE | NOT RUN (browser) |

**Important:** The eleven checks document *source evidence*. They must not be presented as eleven successful live tests or a production SEO readiness score.

## Test backlog

| Test ID | Expected observation | Status |
|---|---|---|
| LIVE-01 | Accurate deployed HTTP status and Location chain for marketing routes | BLOCKED |
| LIVE-02 | Verified valid TLS and canonical host behavior for HTTPS | BLOCKED |
| LIVE-03 | Nonexistent URL returns HTTP 404 | BLOCKED |
| LIVE-04 | Old blog alias redirects permanently to correct Persian canonical | BLOCKED |
| LIVE-05 | Robots and Sitemap are fetchable and agree with canonical origin | BLOCKED |
| BUILD-01 | Clean checkout builds; generated route HTML inspected | NOT RUN |
| BUILD-02 | Head tags, unique metadata and initial HTML sampled per template | NOT RUN |
| BROWSER-01 | Main content and links verified with JS on/off and mobile viewport | NOT RUN |
| PLATFORM-01 | Actual GSC coverage and canonical selection recorded | NOT RUN |
| CONV-01 | Approved endpoint confirms lead storage and consent behavior | NOT RUN |

For subsequent tests, record exact URL, command, environment, time, revision, expected result, actual evidence and pass/fail classification. Do not retroactively relabel these checks as production passes.

[Baseline findings](../audits/2026-11-21-source-baseline.md) · [URL inventory](../inventory/source-route-inventory.csv)
