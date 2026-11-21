# Post-Deployment HTTP and TLS Reachability — Hosting Owner Action Plan

**Date:** 2026-11-21  
**Priority:** P1 — establish real user and crawler reachability  
**Evidence:** [27 GET live probe](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44881936131), [Iran/global HTTPS](https://check-host.net/check-report/597b5aadk293), [Iran/global HTTP](https://check-host.net/check-report/597b5db5ka04), [full audit](../verification/2026-11-21-post-deployment-public-server-audit.md).

## What is established

A GitHub runner resolved apex A to `87.107.166.140` and connected to TCP ports 80 and 443 but could not complete TLS or retrieve any HTTP status across 27 requests. Third-party monitoring nodes in Tehran, Isfahan, Zurich and Los Angeles also received connection resets; Qom HTTP timed out. Monitoring-node blocking by security policy is possible. **No globally applicable outage or Googlebot status has been established.**

## Step 1 — Compare a normal user connection

From a trusted regular connection **inside Iran** and separately outside, record ISP, time and full but non-sensitive output of:

```bash
nslookup beatfit.ir
nslookup www.beatfit.ir
curl -vI --connect-timeout 8 --max-time 20 http://beatfit.ir/
curl -vI --connect-timeout 8 --max-time 20 https://beatfit.ir/
curl -vL --max-redirs 5 --connect-timeout 8 --max-time 30 -o /dev/null -w 'status=%{http_code} final=%{url_effective} redirects=%{num_redirects} tls_verify=%{ssl_verify_result}\n' https://beatfit.ir/
curl -vL --max-time 30 https://beatfit.ir/robots.txt
curl -vL --max-time 30 https://beatfit.ir/sitemap.xml
```

For PowerShell/Windows IIS, use `Resolve-DnsName beatfit.ir -Type A`, `Test-NetConnection beatfit.ir -Port 443` and `curl.exe -vI https://beatfit.ir/`. A successful TCP connection is NOT a successful TLS handshake or HTTP response. Do not treat `curl -k` as verified HTTPS.

## Step 2 — Correlate edge/server evidence

Hosting/Network owners should match timestamps to public gateway and IIS logs and check:
- Actual firewall/WAF/IP/geo filtering versus unintentionally dropped/reset monitoring connections.
- TLS termination and SNI `beatfit.ir` certificate binding, validity and chain, reverse-proxy upstream health.
- Host header and proxy HTTPS forwarding semantics; previous IIS redirect rule was disabled due loop risk. Avoid enabling it without checking edge policy.
- IIS worker/site binding/port configuration and 80→443 redirect Location behavior.
- Whether `www` is intentionally unsupported or should have DNS/certificate/301 canonical consolidation.
- Actual deployed webroot and build checksum/commit provenance.

Do not disable production security globally or modify proxy redirect logic without the host owner's review.

## Step 3 — Public SEO acceptance (only after HTTP works)

1. HTTPS homepage returns a trusted TLS **200** with intended canonical.
2. HTTP homepage returns an intentional permanent redirect to HTTPS with no loop.
3. `/robots.txt` is 200, has correct HTTPS Sitemap location and blocks only intended nonindexable internal shell paths.
4. `/sitemap.xml` is valid XML and exposes 13 intended HTTPS URLs.
5. `/gym`, `/coach`, `/athlete`, `/resources`, `/demo` and one Persian blog slug return correct title/canonical and render as expected in browser.
6. A deliberately unknown page returns true HTTP **404**; old aliases redirect consistently.
7. Final public assets match an approved, known Git commit; compare version provenance rather than assuming merge implies deployment.
8. Independently inspect important URLs in an authorized Google Search Console property. No search metrics or indexing outcome was verified in this audit.

## Separate product caveat

Current source intentionally shows **demo submission unavailable** above six disabled inputs and submit button. The server accessibility fix will NOT restore lead intake by itself. A secure approved receiver and privacy policy are required before enabling personal-data collection.

**No server modifications or live form submissions were performed as part of this plan.**

## Differential follow-up — 2026-11-21, independent runner

[GitHub Actions run 44882903669](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44882903669) tested bounded protocol variants after the reported deployment. **Eight curl HTTP/HTTPS GET/HEAD/fixed-IP/HTTP1 variants returned zero HTTP statuses**; TCP connect took about 0.23 seconds. **Three OpenSSL SNI/TLS tests timed out without usable handshake output**, so protocol/certificate/SNI support cannot be specifically classified. No HTTP proxy environment was present. These results do not distinguish intentional security filtering from reverse-proxy/IIS listener issues.

Before modifying source redirect rules or firewall settings, correlate a normal user request and one GitHub monitoring request by exact timestamp and client IP with **the first public listener**. If the edge did not record a request, triage upstream ACL/WAF/routing. If it did, inspect reset reason, TLS SNI certificate selection and edge-to-IIS upstream. A sample IP-only `-k` probe timed out before TLS establishment and must **never** be counted as a verified certificate pass.

See [detailed test matrix and decision](../verification/2026-11-21-transport-differential-audit.md). Do not schedule frequent repeating probes without a reported edge/server change.
