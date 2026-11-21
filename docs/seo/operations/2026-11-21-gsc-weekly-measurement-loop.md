# T7 Measurement Loop — Google Search Console Weekly Ops

**Record:** BF-SEO-T7-OPS-001  
**Date:** 2026-11-21  
**Status:** ACTIVE ops checklist (ownership verified; discovery still completing)  
**Property:** `https://beatfit.ir/`  
**Rule:** No ranking promises. Log observations; separate hypotheses from evidence.

## Entry criteria

- [x] Search Console property verified (DNS TXT) — 2026-11-21  
- [ ] Sitemap submitted: `https://beatfit.ir/sitemap.xml`  
- [ ] URL Inspection sampled for `/`, `/gym`, one Persian article  

Live probe (Iran vantage, 2026-11-21): sitemap **200**, **13** `<loc>` entries, all `https://beatfit.ir/...`; robots.txt declares the same Sitemap URL.

## One-time setup (complete ASAP)

1. **Sitemaps** → Add `https://beatfit.ir/sitemap.xml` → confirm “Success” / discovered URL count (expect ~13 once processed).  
2. **URL Inspection** → test and optionally **Request indexing** for:
   - `https://beatfit.ir/`
   - `https://beatfit.ir/gym`
   - `https://beatfit.ir/blog/زون-های-ضربان-قلب` (or the encoded form Google shows)
3. Note any “URL is not on Google” / fetch failures — especially if Googlebot cannot reach the host from outside Iran (known external-reach risk).

## Weekly review (15–20 minutes)

Capture date + property in a new BF-SEO-RUN note (or append a short table row). Do **not** paste personal Search Console account details.

| Check | What to record | Action if bad |
|---|---|---|
| Coverage / Pages | Indexed vs not indexed; top reasons | Fix blocked by robots, soft-404, redirect, or server error first |
| Sitemaps | Submitted vs discovered vs indexed | Re-submit only after a real sitemap change |
| Crawl stats | Fetch success vs host errors | Hosting/WAF allowlist for Googlebot if errors dominate |
| Performance | Clicks, impressions, top queries/pages (fa) | Content work stays parked unless owner opens content track |
| Enhancements | Manual actions / security issues | Escalate immediately |
| Releases | Deploy date vs GSC annotation | Annotate deploys that change shells, redirects, or sitemap |

## Release annotation habit

When a production deploy changes SEO shells, `robots.txt`, `sitemap.xml`, or redirects:

1. Note deploy time in the run-log.  
2. Optionally add a Search Console performance annotation.  
3. Re-inspect 1–2 changed URLs within a few days.

## External crawl risk (ongoing)

Target-market HTTPS works; some external fetchers and HTML file verification previously could not reach the host. If GSC crawl stats show repeated fetch failures after sitemap submit, treat that as a **hosting/network** issue for Googlebot — not a meta-tag problem.

## Out of scope for T7

- Guaranteeing positions or traffic growth.  
- Merging parked content PRs.  
- Publishing raw GSC CSV exports with account identifiers into the public repo unless scrubbed.

## Exit criteria for “T7 operating”

Weekly checklist run at least once with real property data (even if indexed count is still zero), and sitemap submission status recorded as Success or Failed with reason.
