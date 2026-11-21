# SDD ledger — plan: D:\Project\BeatFit\docs\superpowers\plans\2026-11-09-fourth-persian-training-history-article.md

Setup Ruling: The workspace is not a Git repository, so isolated worktrees, commits, and Git-backed review packages are unavailable. Execute in place and use RED→GREEN content contracts, compiler/build checks, browser verification, and an author self-review. Cost if wrong: these changes cannot be reverted through Git in this folder.

Pre-flight: Task 1 produces the canonical history slug and hero asset consumed by Task 2; names and paths match the spec.

Task 1 Ruling: The existing reusable chart already represents the supplied four-session educational data, so no new renderer is needed. Cost if wrong: article-four styling remains coupled to the shared chart block, which is already used and browser-tested by article one.

Task 1 Complete: RED confirmed with `Canonical training-history slug is missing`; GREEN confirmed with `npm run test:blog:fourth` and `npx tsc -b`. Added the complete rich article, canonical post registration, legacy alias, and copied hero asset.

Task 2 Complete: Updated homepage copy/href while preserving `/beatfitImages/blog-workout-history.png`; updated both Resources links and assigned the supplied hero to the athlete card. All four article contracts and `npm run build` pass.

Browser Evidence: Verified `/resources`, `/blog/تاریخچه-تمرین`, `/blog/workout-history-progress`, and `/` at `127.0.0.1:5173`. Observed the correct H1, SEO title, meta description, canonical URL, Persian RTL document, 2 tables, 4 chart rows, 6 FAQ items, 6 sources, FAQ JSON-LD, internal zones link, athlete CTA, loaded hero and inline dashboard, legacy redirect, and preserved homepage image source.

Review Ruling: The active collaboration instruction forbids subagents unless explicitly requested, so the final review is an author self-review using the code-review checklist. Cost if wrong: it lacks an independent second pair of eyes. The supplied editorial/scientific content was integrated as provided and not independently fact-checked.
