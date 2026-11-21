# Demo Form — Upfront Disabled State QA (Exact Source Revision)

**Record:** BF-SEO-DEMO-UNAVAILABLE-001
**Date:** 2026-11-21
**Exact PR #11 proposed source revision:** `87128b6a7744a96d43972024ce78fd77746fe109`
**Independent QA source revision:** `db016a46b8b862a3767b72e89e95d854b87024d6`
**GitHub Actions:** [44881338714](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44881338714), job `136777085486`, **completed SUCCESS**.
**Standard PR SEO CI:** [44881308501](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/actions/runs/44881308501), **completed SUCCESS**.
**Merge status at documentation time:** [PR #11](https://github.com/mohammadAliKeshavarzSarkar/BeatFit-Website/pull/11) merged on **2026-11-21 at 07:43:12 UTC**, merge commit `c5463cb246281773ad8dd4da1d1d8658301b8cf1`. This QA preceded the merge and tested the exact proposed source revision.
**Release/production status:** Not independently verified.

## Why the change was revised

The earlier PR #11 revision used browser-native essential-field validation but waited until **after** a visitor filled in data and attempted submission to display a truthful **not sent** warning. [The original successful CI](2026-11-21-demo-form-pr11-qa.md) is still historically valid for older commit `1b9571d03296a14694f97af2c8d68d6838a3df81` but is not test evidence for this revised form.

The final source version:

1. Displays a Persian no-delivery notice **before** contact fields: `ثبت آنلاین درخواست دمو فعلاً فعال نیست؛ لطفاً اطلاعات تماس خود را در این فرم وارد نکنید.`
2. Associates the notice with the form through `aria-describedby` and gives the notice `role="status"`.
3. Wraps the original six controls and submit CTA in a native disabled fieldset; no contact details can be typed into those controls.
4. Retains three `required` field attributes and conservative max lengths as inactive future integration scaffolding.
5. Removes the displayed callback promise and the old after-submit React state/alert.
6. Preserves the `/demo` route, canonical source policy, headings, all original field labels and article SEO content.

No receiver, fictitious success state, PII telemetry, external endpoint or unapproved contact mailbox was introduced.

## Exact independent checks

| Test | Evidence | Outcome |
|---|---|---|
| Pinned site checkout | Commit `87128b6...` | PASS |
| Locked dependency installation and real TypeScript/Vite build | `npm ci`, `npm run build` | PASS |
| Generated SEO outputs | `SEO build verification PASSED: 254 checks` | **PASS — 254** |
| Tracked public files | Git diff on robots/sitemap/IIS config after build | PASS |
| Upfront notice before first field | 390×844 Chromium DOM and rectangle positioning | PASS |
| Notice accessibility semantics | `role=status`, `aria-describedby` | PASS |
| Contradictory callback promise absent | Browser exact-text assertion | PASS |
| Form controls | Six original controls preserved, all disabled | PASS |
| Underlying future required attributes | Three required fields still in source DOM | PASS |
| Submit button | Disabled by native fieldset | PASS |
| Data entry | Browser `fill()` into disabled field fails; input value stays empty | PASS |
| Accidental requests | Zero **non-GET** requests in this sampled browser flow | PASS |
| `/demo` canonical | Rendered canonical path checked | PASS |
| JS exceptions | Browser pageerror list empty | PASS |
| Production IIS/HTTPS | No deployed response observed | **NOT VERIFIED** |
| Actual lead delivery / owner privacy approval | No receiving system approved | **NOT IMPLEMENTED / BLOCKED** |

The independent job log contains:

```text
SEO build verification PASSED: 254 checks
PASS demo pre-entry unavailable QA: 390px notice before fields, six controls disabled, three required attrs, submit disabled, no PII entry, zero non-GET requests, /demo canonical
```

**Important distinction:** Successful CI validates this **unavailable** form behavior. It does not validate a demo lead funnel, real contact reception, site uptime or search performance. PR #11 was merged through repository activity outside this audit, not by this evidence author.

## Related records

- [Integrated merged main audit](2026-11-21-merged-main-conversion-seo-qa.md) verifies merged source at a separate exact main revision.
- [Original source lead funnel audit](../audits/2026-11-21-demo-request-funnel-audit.md).
- [Demo funnel owner release choice](../strategy/2026-11-21-demo-funnel-release-decision.md).
- [Proposed receiver and privacy contract](../strategy/2026-11-21-demo-lead-submission-contract.md).

**Next gate:** Authorized product owner reviews whether the publicly deployed `/demo` should show this temporarily disabled experience, whether a monitored contact alternative exists, and when a secure server-backed request path can be released. No PII should be collected through an unapproved destination.
