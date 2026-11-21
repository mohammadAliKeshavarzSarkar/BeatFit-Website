# Production HTTP / DNS / TCP / TLS — Read-only External Verification

**Record:** BF-SEO-LIVE-001  
**Date:** 2026-11-21  
**Website:** beatfit.ir  
**Evidence sources:** [HTTP probe GitHub Actions run 44874973166](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874973166), [DNS/TCP/TLS run 44875160463](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44875160463)  
**Runner:** GitHub Actions Ubuntu 24.04, Node.js 22, curl and Node network APIs  
**Site source checked at:** `8799e7fa2bc6f3fe677ab4052e27da7a2dd6806d`; source configuration is not proof of deployed configuration  
**Classification:** **External access blocked/inconclusive; underlying cause not yet determined**. Not a verified global site outage or Google indexing failure.

## 1. Main outcome

The first fixed 14-URL public HTTP/HTTPS GET probe completed successfully *as a diagnostic script*, but **0/14 requests obtained an HTTP response status**. All 14 were network-level failures (curl exit 28 timeout or exit 6 DNS failure). A CI job conclusion of SUCCESS here only means the read-only diagnostic script executed and recorded results; it **does not imply the site is reachable**.

A second isolated DNS/TCP/TLS probe supplied additional lower-layer evidence:
- `beatfit.ir` A record resolved to `87.107.166.140` from this runner, consistent with the host address named in the repository's historical `public/web.config` comment (not independently verified as the currently deployed server).
- No AAAA or CNAME was returned for the apex; this is not inherently a DNS defect.
- `www.beatfit.ir` returned ENOTFOUND for A, AAAA and CNAME from this runner.
- TCP connect to `beatfit.ir:80` and `:443` succeeded, but this **does not establish an HTTP response or a valid TLS handshake**.
- A separate TLS handshake to `beatfit.ir:443` failed with `ECONNRESET` from the runner.
- Direct curl HTTPS attempts timed out during SSL establishment, while HTTP attempts timed out without any response bytes.

**Key distinction:** The apex resolved and TCP ports accepted connections from this environment, yet requested web pages did not return a usable HTTP status. This narrows an investigation toward service/proxy/IIS configuration and/or network treatment of those requests. It **does not identify which component is responsible**.

## 2. Exact 14-request HTTP probe results

**Run:** [44874973166](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44874973166)  
**Test timestamp:** `2026-11-21T06:20:40.423Z`  
**User agent:** `BeatFitSEOAudit/1.0 (public read-only validation)`  
**Method:** GET, standard TLS verification, 6s connect timeout, 16s request timeout, max five redirects, max three simultaneous requests, no login or form submission.

| Test | Curl exit | HTTP status | Last observed diagnostic |
|---|---:|---:|---|
| `HTTP_APEX_HOME` | `28` | 0 | curl: (28) Operation timed out after 16002 milliseconds with 0 bytes received |
| `HTTPS_APEX_HOME` | `28` | 0 | curl: (28) SSL connection timeout |
| `HTTP_WWW_HOME` | `6` | 0 | curl: (6) Could not resolve host: www.beatfit.ir |
| `HTTPS_WWW_HOME` | `6` | 0 | curl: (6) Could not resolve host: www.beatfit.ir |
| `HTTP_ROBOTS` | `28` | 0 | curl: (28) Operation timed out after 16002 milliseconds with 0 bytes received |
| `HTTPS_ROBOTS` | `28` | 0 | curl: (28) SSL connection timeout |
| `HTTP_SITEMAP` | `28` | 0 | curl: (28) Operation timed out after 16002 milliseconds with 0 bytes received |
| `HTTPS_SITEMAP` | `28` | 0 | curl: (28) SSL connection timeout |
| `HTTP_GYM` | `28` | 0 | curl: (28) Operation timed out after 16002 milliseconds with 0 bytes received |
| `HTTPS_GYM` | `28` | 0 | curl: (28) SSL connection timeout |
| `HTTP_ARTICLE` | `28` | 0 | curl: (28) Operation timed out after 16002 milliseconds with 0 bytes received |
| `HTTPS_ARTICLE` | `28` | 0 | curl: (28) SSL connection timeout |
| `HTTP_ALIAS` | `28` | 0 | curl: (28) Operation timed out after 16002 milliseconds with 0 bytes received |
| `HTTP_NOT_FOUND` | `28` | 0 | curl: (28) Operation timed out after 16002 milliseconds with 0 bytes received |

All HTTP codes in this run were **0** (no HTTP response observed), not HTTP `200`, `301`, `403`, `404` or `500`. The response bodies, canonical tags, redirect chains, deployed robots and Sitemap could therefore **not** be inspected.

[Machine-readable fixed-request results](2026-11-21-public-http-probe-results.csv).

## 3. DNS observations

**Run:** [44875160463](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44875160463)  
**Test timestamp:** `2026-11-21T06:21:48.559Z`

| Host | DNS record type | Observed | Response / error |
|---|---|---|---|
| `beatfit.ir` | A | RESOLVED | 87.107.166.140 |
| `beatfit.ir` | AAAA | NO RESULT | ENODATA |
| `beatfit.ir` | CNAME | NO RESULT | ENODATA |
| `www.beatfit.ir` | A | NO RESULT | ENOTFOUND |
| `www.beatfit.ir` | AAAA | NO RESULT | ENOTFOUND |
| `www.beatfit.ir` | CNAME | NO RESULT | ENOTFOUND |

The lack of a `www` record is a concrete finding for this DNS resolver and should be validated with authoritative DNS and the domain owner's intended host policy. The apex may be intentionally the only configured host. Whether `www` should be configured is a product/infrastructure decision, **not** automatically a ranking requirement.

## 4. TCP and TLS observations

| Host | TCP port | Observed from GitHub Runner |
|---|---:|---|
| `beatfit.ir` | 80 | CONNECTED |
| `beatfit.ir` | 443 | CONNECTED |
| `www.beatfit.ir` | 80 | ENOTFOUND |

**TLS handshake (apex 443):** `ECONNRESET`; `tls_connected=false`.

A TCP connection on 443 is not equivalent to a successful TLS handshake, and a TLS reset does not by itself prove an invalid certificate. The runner could be subject to regional filtering, transport middleboxes, proxy/security policy or a server-side listener/rewrite issue. Further independently sourced evidence is required.

## 5. Comparison with pinned repository configuration

| Source fact | File | Interpretation |
|---|---|---|
| `SITE_ORIGIN` fallback is `http://beatfit.ir` | `src/config/site.ts` | Current source canonical protocol is intentionally HTTP unless build-time environment overrides it |
| Source IIS HTTPS Redirect rule has `enabled="false"` | `public/web.config` | Do **not** enable HTTPS redirects without a verified working certificate, binding and host policy |
| Canonical Host redirect rule is disabled in source | `public/web.config` | Intended www/apex behavior must be reviewed; production may use a proxy/CDN differing from source |
| `public/web.config` comment names `87.107.166.140` | `public/web.config` | The runner's A result matches this source comment, but this does not prove IIS is running correctly or which revision is deployed |

Do not change `SITE_ORIGIN`, certificates, redirect rules, firewall permissions or DNS based solely on these runner results. Such production changes require appropriate owner authorization and controlled testing.

## 6. Status of SEO acceptance tests after this run

| Test | Current evidence status | Why |
|---|---|---|
| Public HTTP homepage status / canonical | BLOCKED | No HTTP response obtained from tested runner |
| HTTPS certificate validity and response | BLOCKED | TLS handshake reset/timeout from runner; certificate contents not observed |
| HTTP → HTTPS / www → apex redirects | BLOCKED | No redirect chain observed and www DNS unresolved |
| robots.txt / sitemap.xml live consistency | BLOCKED | No content returned; source-only validity remains separately verified |
| Published /gym and Persian article HTTP responses | BLOCKED | No successful live response |
| Alias 301 and unknown-route real 404 | BLOCKED | No usable HTTP status |
| Source-generated SEO Build | PASS ON REVIEW PR REVISION | Separate GitHub Actions build/QA records; does not prove production |
| Search Console indexing and chosen canonical | NOT RUN | First-party GSC data unavailable |
| General worldwide site availability | UNKNOWN | No verified multi-region or target-market observation |

## 7. Owner handoff and prerequisites

See [Hosting readiness and safe verification checklist](../strategy/2026-11-21-hosting-readiness-checklist.md) for the minimum DNS, TLS, IIS binding, firewall and deployed-HTTP checks to be performed by the authorized infrastructure owner. Validate both **a target-market connection** and **an independent external connection** before attributing failures to server outage versus geographic/network restrictions.

**Do not** mark LIVE tests PASS or FAIL for actual HTTP behavior without a captured response. Keep these as BLOCKED. Collect sanitized result metadata only; do not commit credentials, user logs, token-bearing headers or personally identifying information.

## 8. Review traceability

- [Read-only HTTP diagnostic branch](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/tree/seo/production-http-diagnostics-2026-11-21)
- [Read-only DNS/TCP/TLS diagnostic branch](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/tree/seo/dns-tcp-diagnostics-2026-11-21)
- [Actual source configuration](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/8799e7fa2bc6f3fe677ab4052e27da7a2dd6806d/public/web.config)
- [Source origin settings](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/blob/8799e7fa2bc6f3fe677ab4052e27da7a2dd6806d/src/config/site.ts)
- [Earlier production check plan](2026-11-21-production-access-and-test-plan.md)

**Release effect:** None. Diagnostic branches are not merged, and no website/hosting source code, DNS, TLS, redirects, user data or production configuration was changed.
