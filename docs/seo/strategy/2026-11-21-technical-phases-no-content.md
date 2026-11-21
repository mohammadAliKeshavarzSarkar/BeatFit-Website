# Technical SEO Phases — No Content Changes

**Record:** BF-SEO-TECH-PHASES-001  
**Date:** 2026-11-21  
**Status:** ACTIVE execution plan  
**Owner instruction:** Proceed with professional SEO phases; **exclude content/copy/editorial PRs** for now (PR #1, #3, #4, #8 and backlog copy work stay parked).

## Scope boundary

| In scope now | Out of scope for this track |
|---|---|
| Indexing safety, CI gates, robots/sitemap/shell integrity | Gym/hero/article copy edits |
| Production HTTP/TLS/IIS evidence | Related-article link rebalancing |
| Canonical/HTTPS policy once cert is proven | Zone-2 / citation / authorship text |
| Search Console property verification & sitemap submit | New keyword pages or calculators |
| Demo/CRM conversion plumbing (engineering) | Privacy/terms policy drafting (needs legal text) |
| Build reproducibility (public/ drift) | Performance/CWV campaigns before field data |

## Phase map (aligned to project brief Stages 0–7)

| Phase | Name | Goal | Entry criteria | Exit criteria |
|---|---|---|---|---|
| **T0** | Sync & freeze content | Local `main` matches GitHub; content PRs remain draft | Repo access | Clean `main`; content PRs listed as parked |
| **T1** | Artifact integrity | Generated SEO output always verified | PR #2 merged | `test:seo:fixtures` + `build` + `test:seo` PASS on trusted checkout |
| **T2** | Live reachability | Know real HTTP/TLS/www behavior from target market | Hosting access or local vantage | Dated PASS/FAIL matrix for home, robots, sitemap, /gym, article, 404, alias, HTTP vs HTTPS |
| **T3** | Canonical & redirects | One preferred origin; no mixed signals | T2 HTTPS proven or explicitly deferred | `SITE_ORIGIN`, sitemap, robots, OG, IIS HTTPS rule agree; aliases 301; unknown → 404 |
| **T4** | Search Console foundation | Ownership + discovery | Deployed verification file/meta | Property verified; sitemap submitted; URL Inspection sampled |
| **T5** | Render evidence | Confirm what Google can see | T2 + T4 | JS-on vs JS-off notes for marketing + one article; no SSR forced without evidence |
| **T6** | Conversion plumbing | Organic traffic can become a lead | API/CRM + privacy consent approved | Demo form posts successfully; measurable conversion event |
| **T7** | Measurement loop | Ongoing professional ops | T4 connected | Weekly GSC review; annotate releases; no ranking promises |

## Parked (content track — do not start in this plan)

- Draft PR #1 — gym copy  
- Draft PR #3 — related links  
- Draft PR #4 — CDC citation  
- Draft PR #8 — Zone 2 editorial  
- Content backlog BF-CONT-001 / 004–010  

## Immediate execution order

1. Confirm T1 on current `main` (fixtures + build + 254 checks). ✅  
2. Collect T2 evidence from an Iran / target-market vantage (not only GitHub runners). ✅  
3. Align source canonicals to HTTPS once T2 proves TLS (completed in source 2026-11-21). ✅  
4. **Deploy** latest `dist`; complete T4 Verify. ✅ ownership; ⏳ sitemap submit + URL Inspection  
5. Spec T6 demo API under separate approval; do not invent endpoints. ✅ contract drafted — implementation blocked on owner API  
6. Keep T5 observational until GSC URL Inspection exists. ✅ shell parity; Inspection still owner action  
7. Run T7 weekly GSC loop once sitemap is submitted.

## Progress snapshot — 2026-11-21

| Phase | Status | Evidence |
|---|---|---|
| T0 Sync | PASS | Local `main` at `7d5dddb` |
| T1 Artifact integrity | PASS | 10/10 fixtures; build; 254 SEO checks |
| T2 Live reachability | PASS (Iran) / FAIL (external) | Live HTTPS 200 for shells; HTTP→HTTPS 301; external fetch/GSC HTML verify cannot reach host |
| T3 Canonical HTTPS | PASS (live) | HTTPS canonicals; IIS HTTPS rewrite **disabled**; aliases/trailing-slash/`/blog` now **301 → https://beatfit.ir/...** after redeploy (RUN-020) |
| T4 GSC | PARTIAL | Ownership verified (DNS TXT). Live sitemap **200** / 13 URLs; robots declares Sitemap. **Owner still needs:** submit sitemap + sample URL Inspection |
| T5 Render shells | PASS | Preview↔live shell parity for home/gym/article/404; JS-on full content on preview |
| T6 Conversion | SPEC READY | [Demo conversion contract](2026-11-21-demo-conversion-contract.md); form still `preventDefault` only — needs approved endpoint |
| T7 Measurement | READY | [Weekly GSC ops checklist](../operations/2026-11-21-gsc-weekly-measurement-loop.md); first real data pass after sitemap submit |

## Non-goals

- No ranking guarantees.  
- No HTTPS redirect enablement without a working certificate.  
- No full SSG/SSR migration in this track.  
- No silent merge of content PRs under a “technical SEO” label.
