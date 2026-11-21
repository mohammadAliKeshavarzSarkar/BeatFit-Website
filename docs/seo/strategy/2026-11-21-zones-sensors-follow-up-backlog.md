# Priority Follow-up — Zone Model and Sensor Claims

**Date:** 2026-11-21
**Status:** Proposed review backlog; no mass article rewrites or production edits authorized.
**Input:** [22-claim evidence review](../audits/2026-11-21-zones-and-sensors-claim-review.md)

| ID | Priority | Scope | Next step | Acceptance |
|---|---|---|---|---|
| BF-CLAIM-01 | P1 editorial | HR zones article | Review [Draft PR #8](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/8) Zone 2 convention vs physiological thresholds | Scientific wording approved, source citation correct, live non-prescriptive tone |
| BF-CLAIM-02 | P2 | Sensor article | Verify 2017 study source and exact wrist/forearm comparative statement | Correct named models, test context and reference |
| BF-CLAIM-03 | P2 | HR zones article | Map fat-burning Zone 2 and metabolism claims to appropriate papers | Avoid guaranteed fat-loss or fixed threshold advice |
| BF-CLAIM-04 | P2 | HR zones article | Check HR biological response lag vs optical sensor algorithm delay wording | Exact evidence and no conflation |
| BF-CLAIM-05 | P1 product gate | Sensor/BeatFit copy | Obtain actual supported sensor models, wearable compatibility and class receiver limits | Owner-signed accurate technical facts; no untested numeric performance claims |
| BF-CLAIM-06 | P2 | Sensor device marketing | Demand device-specific validation protocol before public accuracy figures | Real BeatFit model, sample, reference ECG/chest device, movement classes, statistic and limitations |
| BF-CLAIM-07 | P2 | Article navigation | Revisit Zone article /demo CTA for athlete search audience | Conversion path agreed; product/page availability verified |
| BF-CLAIM-08 | Infrastructure | Production Google | Verify hosted page and Search Console selected canonical after owner access exists | Actual live HTTP and first-party property evidence |

**Document constraints:** No fabricated lab accuracy or traffic numbers, no medical prescriptions, no fake publication update date, no automatic PR merge.

## Dated evidence update — 2026-11-21

- `BF-CLAIM-02` (2017 wrist-versus-forearm study): **RESOLVED FOR THE PRECISE SOURCE SENTENCE**. [2017 study resolution](../verification/2026-11-21-sensor-2017-claim-resolution.md) verifies the named-device ranking via PubMed and published scholarly review. This is not an endorsement of untested devices, a full literature review or medical advice.
- `BF-CLAIM-07` (Zone 2 article CTA): **DRAFT PR #10 CREATED; BUILD/BROWSER TESTED; OWNER APPROVAL PENDING**. Proposed `/athlete` destination, preserving separate `/demo` common footer. [CI evidence](../verification/2026-11-21-zones-cta-pr10-ci.md). Do not claim conversion gains without instrumentation.
- Parallel Draft PR #8 modifies different article content; both edits require integrated QA on the release candidate if approved.
