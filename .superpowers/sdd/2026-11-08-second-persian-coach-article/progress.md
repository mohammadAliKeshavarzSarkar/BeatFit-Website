# SDD ledger — plan: D:\Project\BeatFit\docs\superpowers\plans\2026-11-08-second-persian-coach-article.md

Setup Ruling: The workspace is not a Git repository, so isolated worktrees, commit ranges, and Git-backed review packages are unavailable. Execute in place, preserve unrelated files, and use RED→GREEN content contracts, production builds, browser checks, and an author self-review. Cost if wrong: these changes cannot be reverted through Git in this folder.

Pre-flight: Task 1 produces the canonical coach slug and hero asset consumed by Task 2; names and paths match the spec.

Task 1 Ruling: This project has no unit/integration test runner; use the existing executable content-contract convention plus compiler and browser behavior checks. Cost if wrong: the validator inspects source contracts rather than mounting React, so browser verification remains required for rendering behavior.

Task 1: complete (no Git range; tests: `npm run test:blog:second` and `npx tsc -b` → passed). RED evidence: validator failed with `Canonical coach slug is missing`; GREEN evidence: contract and TypeScript both exited 0.

Task 2: complete (no Git range; tests: first contract, second contract, and production build → passed). Browser evidence: Resources card exposed the new hero and Persian URL; canonical page exposed H1, two tables, two-bar chart, inline image, FAQ, seven sources, article-one link, and coach CTA; legacy URL redirected; homepage retained `/beatfitImages/blog-live-class.png`.

Final review: self-review (subagents are disallowed unless explicitly requested). Reviewed plan alignment, route aliases, related-slug resolution, image loading, internal links, SEO/FAQ JSON-LD, card behavior, type safety, and content structure. No Critical, Important, or Minor findings. Declined to judge: source accuracy beyond the user-supplied article and references, because the task was publication integration rather than independent editorial fact-checking.

Final: Ruling: Source accuracy was outside this implementation review — preserve the supplied editorial content and its citations without independently rewriting its scientific claims — cost if wrong: a source or claim could require later editorial correction.

