# Reported Server Update — Public Reachability and Source Verification

**Record:** BF-SEO-LIVE-POSTDEPLOY-002  
**Date:** 2026-11-21  
**Website:** https://beatfit.ir  
**Source snapshot tested:** `ae2eb506845380bc952d80c372851078b297d44f`  
**Latest main parent for this documentation:** `8dd677b6c7049115c42fd0f66a5d222220ba1cb6`  
**Scope:** Read-only public network probes plus independent real source Build and browser QA. No form POST, authenticated crawl, server modification or data collection.

## Findings

| Area | Direct evidence | Classification |
|---|---|---|
| Website source | HTTPS site origin, HTTPS Sitemap locs for 13 routes, HTTPS robots Sitemap | SOURCE CONFIGURED |
| Build and local browser | Node 22 + TypeScript/Vite Build, **254 SEO output checks**, 7 Chromium route checks and no JS page errors | **PASS — source only** |
| Public DNS | GitHub runner resolved apex A to `87.107.166.140` | PASS from runner |
| TCP | Runner connected to ports 80 and 443 | PASS transport only |
| TLS | Node handshake returned `ECONNRESET`, curl HTTPS SSL timeout | NO VALID HANDSHAKE IN SAMPLE |
| Public HTTP GET | Historical replay 0/14, expanded post-update 0/13; combined **0/27 HTTP response statuses** | NOT ACCESSIBLE FROM THIS RUNNER |
| `www` host | A/AAAA/CNAME ENOTFOUND from runner | NO DNS ANSWER IN SAMPLE |
| Distributed monitoring | Tehran/Isfahan/Switzerland/USA reported connection resets, Qom HTTP timeout and HTTPS incomplete | NO HTTP SUCCESS IN SAMPLED NODES |
| Live robots, sitemap, canonical, redirects, HTTP 404 | No usable page body, headers or status observed | **BLOCKED** |
| Googlebot / GSC indexing | No first-party Search Console observations | NOT VERIFIED |

## 1. GitHub Actions real public network test

[Read-only runner 44881936131](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44881936131), job `136778905924` executed DNS/TCP/TLS and two separate bounded HTTP GET sets. It completed **SUCCESS as a diagnostic program**, **not** as a successful site test. Both sets obtained zero HTTP status codes. Curl errors are predominantly exit 28 timeouts (apex) and exit 6 DNS lookup failure (www).

- A record: `87.107.166.140`.
- TCP ports 80 and 443: connect succeeded.
- TLS handshake: `ECONNRESET`.
- HTTP GET: **0/27** usable status results.
- `www.beatfit.ir`: `ENOTFOUND` for A, AAAA, CNAME from this runner.

[Complete 27-case CSV](2026-11-21-post-deploy-http-get-results.csv) preserves URL, curl exit, HTTP status field, error and run ID. Since **no HTTP status** was received, a timeout is NOT an HTTP 500/404/403 and tells us nothing definitive about the content of the live page.

## 2. Iran and international external monitoring

Official public tool documentation: https://check-host.net/about/api

[Runner 44882198848](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882198848) requested specific check-host.net HTTP nodes in **Tehran, Isfahan, Qom, Zurich, Los Angeles**, with separate HTTPS and HTTP requests.

- [HTTPS results](https://check-host.net/check-report/597b5aadk293): Tehran and Isfahan returned *Connection reset by peer*; Qom had **no completed result**; Zurich and Los Angeles also returned resets.
- [HTTP results](https://check-host.net/check-report/597b5db5ka04): Tehran and Isfahan returned resets, Qom timed out, Zurich and Los Angeles returned resets.
- These are **node-specific third-party observations**. They weaken the hypothesis that only the foreign GitHub runner is affected but cannot establish every Iranian ISP is unavailable, distinguish a WAF block from service failure, or prove a Google indexing issue.
- **Do not confuse HTTP 200 from Check-Host's own API** (creating a check) with an HTTP 200 from the target website. The completed target checks did **not** report successful site HTTP responses.

[Regional results CSV](2026-11-21-post-deploy-regional-results.csv) keeps incomplete/unknown outcomes distinct from reset/timeout.

## 3. Exact current merged application QA

[Build + browser CI 44882056225](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882056225), job `136779276910`, completed **SUCCESS** for application commit `ae2eb506845380bc952d80c372851078b297d44f`:

- `npm ci`, `npm run build`, **254 generated SEO checks PASS** and no `public/robots.txt`/`sitemap.xml`/`web.config` tracked drift.
- Chromium 390×844 loaded: `/`, `/gym`, `/coach`, `/athlete`, `/resources`, `/demo`, `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`.
- All tested route H1s and canonical paths rendered; source hydration completed; current CDC link appeared, deprecated path was absent, and the demo remained disabled. No browser pageerror observed.

**This confirms code functionality in the local Vite Preview, not that IIS serves this build or that Google has crawled it.**

## 4. Apparent configuration disagreement

The latest `src/config/site.ts` comment says HTTPS and an HTTP→HTTPS permanent redirect were verified. The source's actual HTTPS URL construction and 13 HTTPS Sitemap loc values are visible. However, this audit could not obtain a live HTTP status or `Location` redirect chain to independently reproduce that statement.

`public/web.config` deliberately keeps an internal IIS HTTPS Redirect rule disabled because it historically caused a proxy redirect loop. **Do not re-enable this blindly.** Confirm where TLS terminates and which trusted proxy/network policies control external requests first.

The absent `www` DNS from monitoring nodes is a separate optional host-policy issue; if the business promotes `www`, register and redirect it properly; if intentionally unsupported, do not confuse that with the apex timeout.

## 5. Evidence-based conclusion

**Source layer: PASS. Deployment/public accessibility layer: NOT VERIFIED and potentially impacted.** Multiple actual external monitoring nodes including two in Iran saw resets; however, without a normal end-user browser response and matching edge/IIS logs, the root cause and geographic reach are not established. We cannot claim that the website is globally offline or that Google is excluding it.

The urgent next gate is a real end-user Iranian browser comparison with time-correlated host/firewall/IIS/proxy logs, followed by repeat real HTTPS, HTTP 301, robots, Sitemap, canonical and true 404 checks. Refer to the [hosting investigation checklist](../strategy/2026-11-21-public-server-postdeploy-handoff.md).

**Change control:** This audit did not change production settings or create a working demo backend.
