# SEO Content and Intent Backlog — Proposed Next Actions

**Record:** BF-SEO-STRATEGY-BACKLOG-001
**Date:** 2026-11-21
**Status:** Proposed. No website code/copy change is authorized or completed.
**Inputs:** Source audits and [exploratory search discovery](../research/2026-11-21-persian-search-discovery.md).

## Qualitative priority rubric

- **P1:** Page or conversion path important to BeatFit's business flow, with source evidence and relatively few prerequisites.
- **P2:** Important improvement to existing educational coverage; needs editorial, product or safety validation.
- **P3:** Research/question whose benefit is uncertain; do not launch a new URL before GSC and targeted SERP validation.
- Priority is **not** a keyword-volume or expected-ranking score.

| ID | Priority | Current URL | Proposed action | Basis | Dependency / verification |
|---|---|---|---|---|---|
| BF-CONT-001 | P1 | `/gym` | Add visible, concise, concrete description of actual group monitoring system and operations | Gym-vendor pages show buyer-specific hardware/live display/product workflows; source H1 is aspirational | Confirm product details, accurate screen visuals and real buyer FAQs; reviewer approves copy |
| BF-CONT-002 | P1 | `/demo` | Define and deliver functioning qualified gym lead flow | Existing source form prevents submit and captures gym-oriented fields | API/CRM owner, consent/privacy, invalid/error/success cases, real lead acceptance; separate engineering authorization |
| BF-CONT-003 | P1 | `/athlete` + article footer | Route athletes and education readers toward audience-relevant next step | Source CTA currently leads to gym-only form | Approved conversion matrix, safe links, usability tests; no invented routes |
| BF-CONT-004 | P2 | `/blog/زون-های-ضربان-قلب` | Add reviewed worked example, five-zone comparison and practical interpretation with caveats | Search sample includes articles and tools | Qualified exercise review; clarify calculation method; calculator only after feasibility/QA |
| BF-CONT-005 | P2 | `/blog/مقایسه-سنسور-ضربان-قلب` | Audit and enhance table comparing device types and measurement tradeoffs | Sample mixes retail and explanatory intent | Scientifically defensible device-specific claims; do not imply BeatFit-specific tested accuracy |
| BF-CONT-006 | P2 | `/blog/تاریخچه-تمرین` | Add a representative and clearly labeled session-to-session illustration | Sample guides emphasize practical tracking | Real supported metrics only; no fabricated user or health data |
| BF-CONT-007 | P2 | `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی` | Confirm HR, RPE and talk-test guidance and real coach workflow | Scientific reference plus commercial product overlap | Qualified reviewer, realistic product scenario and safety boundaries |
| BF-CONT-008 | P2 | `/coach` | Clarify coach-specific class workflow and links to both coach educational articles | Separate coaching intent from gym buying | User testing and honest feature scope |
| BF-CONT-009 | P3 | Existing zone article | Evaluate whether a standalone Zone-2 page is needed | Specific Zone-2 topics appear in sampled results | Distinct query-page evidence and no duplicate intent; do not create yet |
| BF-CONT-010 | P3 | `/gym` + `/resources` | Evaluate dedicated gym purchase/implementation explainer if new intent proven | Commercial examples show procurement concerns | GSC and localized Google SERP; avoid thin duplicated landing page |
| BF-CONT-011 | P1 verification | All SEO pages | Validate deployed HTTP/canonical and rendered core content | Previous technical gate blocked, source-specific HTML shells | Actual trusted network/browser access and published revision |
| BF-CONT-012 | P2 process | `docs/seo/` | Obtain first-party query/page data and segment ownership to reprioritize map | Current sample cannot provide volumes or ranks | Approved GSC access and aggregated privacy-safe findings |

## Suggested execution sequence

1. Confirm business owner and real conversion definition (gym leads vs coach/athlete journeys). Fix the demo submission path only under separate authorization.
2. Validate current product capability facts, official support/installation terms, and actual screenshots before editing the gym page.
3. Obtain specific Persian SERP/GSC observations and compare target pages to their query tasks.
4. Implement **one existing-page improvement at a time** with revisioned before/after screenshots, source HTML, rendered DOM and content QA.
5. Request independent review of heart-rate/intensity/accuracy claims, and test accessibility and conversion relevance.
6. Measure impressions, clicks and qualified leads over appropriate time windows without promising ranking gains.

## Non-goals

- No invented keyword volume, difficulty, rank, estimated ROI or guaranteed traffic.
- No duplicate keyword-spelling pages for `زون های` vs `زون‌های`, `سنسور` vs `حسگر`, or Persian/Arabic characters.
- No fabricated sensor specifications, precise medical/exercise prescriptions or unverified competitive superiority.
- No code commits, deployment, GSC submission or tracking activation in this research run.

## Approval gate

Before an implementation PR, record the exact copy/URL changes, source and search evidence, owner approval, any safety or privacy review, acceptance tests, expected rollback and baseline measurement. Strategy proposals here are NOT an approval for production changes.
