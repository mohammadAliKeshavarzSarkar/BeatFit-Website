# CDC Citation URL Maintenance — Source-Only Review

**Date:** 2026-11-21
**Source base:** `4eb3d6914eeddb2ffea9e8414cbbf218606cdcc1`
**Change status:** Draft PR; not merged or deployed
**Impacted article:** `/blog/کنترل-شدت-تمرین-در-کلاس-گروهی`
**File:** `src/content/blog/groupClassIntensity.ts`

## Observed evidence

The historical CDC citation URL `https://www.cdc.gov/physicalactivity/basics/measuring/index.html` was opened in a public web retrieval on 2026-11-21 and returned the intended exercise intensity content **with** visible `Error processing SSI file` template-error messages. The current canonical CDC page `https://www.cdc.gov/physical-activity-basics/measuring/index.html` was independently retrieved with its talk-test and relative-intensity guidance intact.

**This is a URL quality/readability maintenance change.** The old resource was not proven to be an HTTP 404, and Google indexing or SEO impact has not been measured.

## Exact patch

Replace **one** source citation URL with the equivalent current CDC path. Preserve the Persian article body, visible citation label, datePublished, H1, metadata, FAQ, JSON-LD generation, canonical URL, assets and related links.

## Source acceptance checks

| Test | Result |
|---|---|
| Old CDC URL occurred exactly once in reviewed file | PASS (static) |
| New CDC URL replaces old URL exactly once | PASS (static) |
| All article body text other than this URL unchanged | PASS (exact replacement logic) |
| Current CDC webpage topic checked | PASS (public web retrieval) |
| Real TypeScript + Vite build for this PR | NOT RUN |
| Generated SEO HTML, browser and link navigation | NOT RUN |
| Production HTTP/Google indexing | BLOCKED — separate infrastructure issue |

**Review gate:** Verify new citation in rendered article with a browser and execute the actual build before merge. Do not change original publication date to claim freshness because a citation URL was maintained. No other website files should change in this PR.
