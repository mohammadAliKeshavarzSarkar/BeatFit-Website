# HTTPS/TLS Transport Differential — Repeat Probe After Server Update

**Evidence record:** BF-SEO-TRANSPORT-DIFF-001
**Date:** 2026-11-21
**Target:** `beatfit.ir`
**Observed direct IP from runner DNS:** `87.107.166.140`
**GitHub Actions run:** [44882903669](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882903669), job `136781863103`, **COMPLETED SUCCESS AS DIAGNOSTIC EXECUTION**.
**QA branch:** `seo/transport-layer-differential-qa-2026-11-21`, exact script commit `d1ce56d647f73ac65a301584ea7d65633720fd51`.
**Source main before this documentation:** `09e5f696bee514224aa70f747392484ffc3001da`
**Runner:** GitHub-hosted Ubuntu 24.04, Node 22, curl, OpenSSL. No proxy environment variables were set for HTTP_PROXY, HTTPS_PROXY, ALL_PROXY, or NO_PROXY.
**Permissions:** Public-site GET/HEAD and public TLS handshakes only; no login, form request, credentials or production mutation.

## Executive interpretation

**No HTTP status was returned by any of eight curl HTTP/HTTPS tests.** Three separate OpenSSL TLS probes (TLS 1.2/SNI, TLS 1.3/SNI, default/no SNI) did not yield a handshake result before a bounded process timeout. The runner resolved the apex to `87.107.166.140`, and curl reached the remote IP at TCP level in approximately **0.23 seconds** before application-layer timeout. These results are consistent with a **pre-HTTP or edge/upstream-response problem from this runner**, but cannot independently identify IIS, certificate, security filtering, reverse proxy, or origin as the cause.

### Exact differential outcomes

| Probe | Observed result | TCP connect |
|---|---|---|
| `HTTP_GET` | 0 (curl 28; No HTTP response bytes) | 0.23 s |
| `HTTP_HEAD` | 0 (curl 28; No HTTP response bytes) | 0.23 s |
| `HTTPS_GET` | 0 (curl 28; TLS timeout) | 0.23 s |
| `HTTPS_GET_HTTP1` | 0 (curl 28; TLS timeout) | 0.23 s |
| `HTTPS_HEAD` | 0 (curl 28; TLS timeout) | 0.23 s |
| `TLS12_SNI` | Process timeout; no handshake result | — |
| `TLS13_SNI` | Process timeout; no handshake result | — |
| `TLS_DEFAULT_NO_SNI` | Process timeout; no handshake result | — |
| `HTTPS_FIXED_IP_SNI` | 0 (curl 28; TLS timeout) | 0.23 s |
| `HTTP_FIXED_IP_HOST` | 0 (curl 28; No HTTP response bytes) | 0.23 s |
| `IP_DIRECT_TLS_DIAGNOSTIC_UNVERIFIED` | 0 (curl 28; TLS timeout) | 0.23 s |

- **GET vs HEAD:** Both HTTP methods timed out receiving any HTTP bytes; the symptom does not appear limited to one method from this runner.
- **TLS 1.2 vs 1.3:** The OpenSSL processes were terminated after a maximum of approximately 10.5 seconds with **no usable handshake output**. Consequently, **TLS-version support is unknown**; do not interpret these as a confirmed server-side rejection of either protocol.
- **SNI vs no SNI:** No TLS handshake result was returned; the current sample is **not enough to identify an SNI virtual-host mapping fault**.
- **DNS vs fixed target IP:** `--resolve beatfit.ir:443:87.107.166.140` and equivalent HTTP fixed-IP Host tests failed similarly to default DNS resolution. This argues against an incidental DNS lookup difference as the sole issue **from this runner**, not against geographic DNS or network policy issues elsewhere.
- **IP-only TLS diagnosis with trust bypass:** An explicitly labeled `--insecure` test to the IP still timed out **before certificate validation**, so there was no evidence that client trust-chain validation alone explained this failure. **This is NOT a valid certificate test and cannot establish HTTPS safety.**
- **Proxy variable inspection:** All four common proxy environment variables were absent (only presence/absence was logged; no secrets). The runner made direct public network requests.

The probe's workflow conclusion SUCCESS means the bounded tests completed and logged their failure details; it is **not** an HTTP availability success. Full [11-case CSV](2026-11-21-transport-differential-results.csv).

## What earlier independent evidence adds

The prior [27 GET live audit](2026-11-21-post-deployment-public-server-audit.md) recorded **0/27 usable HTTP statuses**, although apex A DNS resolution and TCP 80/443 connectivity succeeded. [Independent HTTPS Check-Host report](https://check-host.net/check-report/597b5aadk293) and [HTTP Check-Host report](https://check-host.net/check-report/597b5db5ka04) sampled nodes in Tehran, Isfahan, Qom, Zurich and Los Angeles. Completed Tehran/Isfahan/Zurich/Los Angeles checks returned connection resets; Qom HTTP timed out and Qom HTTPS was incomplete.

The combination makes a **single GitHub-runner-only routing issue less likely**, but **does not prove a global site outage**, specific security product block, or Googlebot failure. User-browser checks and authoritative edge request logs are still needed. No actual public `/robots.txt`, `/sitemap.xml`, `/gym` or article HTML body was obtained from these monitored networks.

## Triage sequence for the hosting owner

1. **Correlate a timestamped test request at the public edge.** Does a request appear at the firewall/WAF/load-balancer listener for `beatfit.ir:443` and `:80`? If not, inspect upstream network route, ACL, IP/geo policy, threat filtering and listener attachment.
2. **If TLS traffic reaches the edge, inspect SNI/cert binding and handshake logs.** Verify actual certificate chain, binding selection, ALPN, protocol/cipher compatibility, and whether the edge terminates TLS; do not rely on a source code comment or check with `-k`.
3. **If the edge completes TLS, test edge → IIS origin.** Inspect upstream connection resets, timeouts, pool health, IIS site bindings, host header forwarding, ARR/proxy configuration, request filtering and HTTP 80 routing. Preserve an operator-controlled record of the failing timestamp/connection ID.
4. **Avoid speculative redirect edits.** `public/web.config` intentionally disables its IIS HTTPS redirect because an edge/proxy redirect loop was historically observed. Determine the authoritative redirect layer and forwarded scheme first.
5. **Verify the normal user path on an Iranian ISP and one other ISP.** If normal browsers work but Check-Host/GitHub probes fail, document the intentional monitoring/IP-class restriction and separately verify search-crawler access using authorized controls. Do not assume bots are unaffected.
6. **After transport is established**, require real external `HTTP 301 → HTTPS 200`, trusted TLS and served HTML, live robots/Sitemap (13 intended URLs), canonical consistency, genuine HTTP 404 and hydrated browser content; then inspect first-party Search Console.

[Extended hosting handoff](../strategy/2026-11-21-public-server-postdeploy-handoff.md).

## Unresolved facts and safety guardrails

- This did not measure Google indexing, search clicks/rankings, genuine leads or real deployed source version.
- No conclusive certificate expiry/chain data was obtained because TLS did not complete.
- The static marketing site remains **source-testable**: prior GitHub CI [44882056225](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882056225) passed build, 254 SEO checks and seven route browser smoke.
- The demo form remains intentionally disabled in source. Fixing the network layer does not create an authorized lead receiver.
- Never weaken WAF/certificate validation globally just to make this test pass.

**Current decision:** Public reachability **UNVERIFIED** from sampled networks; incident owner diagnosis required before SEO production signoff. Re-run probes only after an actual reported configuration/network change to avoid unnecessary repeated traffic.
