# Draft PR #11 — Actual Source Build and Demo Form Browser QA

**Date:** 2026-11-21
**PR:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/11
**Exact proposed application commit:** `1b9571d03296a14694f97af2c8d68d6838a3df81`
**Standard PR CI:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880438660 — SUCCESS (existing SEO workflow)
**Isolated browser QA branch:** `seo/demo-form-pr11-qa-2026-11-21`
**Isolated browser QA run:** https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880488104

## Boundaries

This PR addresses an observed **silent source-level no-op**; the form does **not** gain a backend. The submitted contact data is not sent, saved, or counted as an accepted lead. The interim status message says so explicitly.

## Verification matrix

| Gate | Status | Interpretation |
|---|---|---|
| Exact source/component diff review | PASS | Form, CSS, English preflight only |
| Standard PR SEO GitHub Actions | PASS | See exact successful run above |
| Isolated pinned real `npm ci` + `npm run build` | **PASS** | GitHub job `136774519308` |
| Pinned generated SEO checker | **PASS — 254 checks** | `SEO build verification PASSED: 254 checks` in actual CI log |
| Tracked `public/` drift check | **PASS** | Real `git diff --exit-code` on the built application checkout |
| Chromium 390px essential field validation | **PASS** | Six controls, exactly three required, empty form blocked by native validity |
| Chromium explicit no-delivery alert | **PASS** | Shown after test-only valid-looking form input; says not sent |
| Chromium no non-GET requests | **PASS** | Browser observer recorded **zero** non-GET network requests during the tested flow |
| Deployed HTTPS / first-party receiver | BLOCKED | No approved backend, actual public HTTPS unverified |
| Privacy policy and retention approval | BLOCKED | Current footer links are placeholders |
| Real staging lead capture/recipient | NOT IMPLEMENTED | Requires separate backend and operational implementation |
| Actual GSC / CRM conversion outcomes | NOT RUN | No first-party evidence |

## Interpretation

A PASS on this PR's browser/build suite means the **interim client form guard is working**, not that a lead funnel is operating. **No production merge or deploy** and no user data was collected. The product owner must choose between shipping an honest temporary unavailable state and implementing a real secure receiver with privacy terms first.

Related: [Source funnel audit](../audits/2026-11-21-demo-request-funnel-audit.md) · [Proposed backend contract](../strategy/2026-11-21-demo-lead-submission-contract.md).

## Completed pinned CI record

**Run:** [44880488104](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880488104) — **SUCCESS**, exact pinned application commit `1b9571d03296a14694f97af2c8d68d6838a3df81`, job `136774519308`. **Standard PR CI** [44880438660](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44880438660) also concluded **SUCCESS**.

Actual job log contains `SEO build verification PASSED: 254 checks` and:

```text
PASS demo form QA: six fields, three required, invalid native block, honest alert, zero non-GET requests, /demo canonical, mobile 390px
```

**Outcome scope:** Browser-native validity, visible no-delivery response, zero observed non-GET requests, generated SEO integrity and no tracked public drift. This is not a successful lead-capture test or proof that real visitors can submit contact details. The form remains unable to deliver leads, because no receiver is configured.

**Additional UX gate:** An unavailable form that reveals the warning only after users fill in private details can waste effort. Before releasing any temporary disabled state, product UX should decide whether the limitation is stated **before entry**, whether fields should be disabled, and whether the site's existing public mailto contact (from `src/content/home.ts`) is a verified, approved fallback. Do not assume email deliverability based solely on the presence of a link in source.
