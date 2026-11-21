# Hosting Readiness and Live SEO Verification — Infrastructure Owner Checklist

**Record:** BF-SEO-INFRA-001  
**Date:** 2026-11-21  
**Status:** Investigation handoff; **not** authorization to modify production infrastructure.  
**Priority:** Investigate access to the publicly intended domain before changing canonical protocol or claiming deployed SEO readiness.  
**Evidence:** [External probes](../verification/2026-11-21-public-http-and-network-evidence.md).

## Context

A GitHub-hosted Ubuntu runner resolved apex `beatfit.ir` to `87.107.166.140` and established TCP connections to ports 80 and 443, but public GETs returned no HTTP status, and TLS handshake reset/timeout was observed. The same runner could not resolve `www.beatfit.ir`. Another public-web retrieval service also could not obtain usable page responses.

These are reproducible **tester-specific observations**, not a reliable conclusion about uptime in Iran or Google indexing.

## Checks for the authorized hosting/DNS owner

### 1. Establish target hosting and DNS policy

- Confirm authoritative DNS records for `beatfit.ir` and the intended target origin. Check A/AAAA and TTL, and determine whether `87.107.166.140` is still the actual public endpoint, proxy or load-balancer address.
- Decide explicitly whether `www.beatfit.ir` is a supported alternate host. If supported, configure its DNS and the eventual redirect to the chosen canonical origin **only after certificate and host-binding coverage is confirmed**. Missing www DNS is not automatically an SEO emergency if the host was never intended, but can affect users who type it.
- Test DNS from an Iranian client network and at least one independent external resolver; capture responses and timestamps.

### 2. Verify access to the web service

- From the hosting environment, verify expected port listeners and site bindings for HTTP 80 and HTTPS 443.
- Inspect IIS website state, URL Rewrite installation, site-specific host binding and any upstream proxy/CDN/WAF. Investigate whether requests from GitHub/cloud provider IP ranges are subject to deny, geo restrictions, connection reset or timeout.
- Reproduce public GETs from within the target market and a second external vantage point. A successful TCP handshake does **not** prove successful HTTP or TLS.
- Do not disable protective security controls broadly to make a remote test pass. If access restrictions are intentional, document their implications for legitimate crawlers and users before deciding on scoped changes.

### 3. Confirm TLS before touching canonical URLs

- Confirm a valid certificate, matching Subject Alternative Names for every supported host, correct private-key binding, SNI and expiry, intermediate chain and TLS handshake.
- Only after actual `https://beatfit.ir/` works should the approved preferred-origin policy, redirect code and `VITE_SITE_ORIGIN` build setting be reconsidered together.
- Never force a redirect to HTTPS when its listener or certificate is not ready.

### 4. Re-run the exact endpoint acceptance set

| URL or route | Expected condition after hosting policy is agreed |
|---|---|
| `/` | 200 on preferred origin, or a stable permanent redirect to it |
| `/gym` | 200, route-specific head and correct generated HTML shell |
| `/blog/زون-های-ضربان-قلب` | 200 and corresponding Persian article canonical |
| `/robots.txt` | 200 text, correct Sitemap URL, correct public path rules |
| `/sitemap.xml` | 200 XML, expected source inventory + any approved additions, consistent origin |
| `/blog/heart-rate-zones` | Permanent redirect to existing Persian canonical URL |
| Unknown test path | Real HTTP 404 and appropriate error-document/noindex behavior |
| HTTP/HTTPS and www/apex variants | Intended permanent redirects, no loops, no invalid certificate |

These are **acceptance criteria**, not actual observed live statuses.

### 5. Example read-only diagnostics

From a trusted, non-production-data workstation or approved operational terminal:

```bash
# DNS and basic server response. Never suppress TLS certificate validation.
dig +short beatfit.ir A
dig +short www.beatfit.ir A
curl --max-time 15 -sS -D - -o /dev/null http://beatfit.ir/
curl --max-time 15 -sS -D - -o /dev/null https://beatfit.ir/
curl --max-time 15 -sS -L --max-redirs 5 -o /dev/null \
  -w 'status=%{http_code} final=%{url_effective} redirects=%{num_redirects}\n' \
  https://beatfit.ir/gym
```

On an authorized Windows/IIS host, check actual bound site names and certificates through IIS Manager or approved PowerShell tools (for example `Get-WebBinding` after loading WebAdministration). Do not paste private key material, session tokens, raw logs or personal data into GitHub.

## Recording and decision contract

- Capture date, vantage point/region, exact URL, DNS answer, HTTP status and redirect chain, certificate result, final canonical, expected vs actual, reviewed action and owner.
- Mark **PASS** only with direct evidence. If the site works for target-market users but not remote GitHub runners, document access restrictions separately and determine their intended effect on search crawlers.
- Avoid changing app/source canonical metadata based on the presence of a TCP listener. Deployment and SSL changes require owner approval and a rollback plan.
- When infrastructure checks are complete, update [the technical acceptance plan](../verification/2026-11-21-production-access-and-test-plan.md) with a new dated record rather than erasing historical blocked results.

## Next engineering checks after reachability

1. Compare real deployed raw HTML and JS-rendered DOM for marketing/one Persian article.
2. Verify true IIS redirect/404 behavior and route-specific generated HTML.
3. Use Google Search Console URL Inspection to observe Google-selected canonical and rendered content.
4. Continue PR #1/#2/#3 through explicit owner review/merge gates, not by treating infrastructure testing as content approval.
