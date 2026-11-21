# BeatFit SEO Documentation Hub

**Website:** beatfit.ir  
**Target SEO language:** Persian (`fa-IR`), RTL  
**Documentation language:** English  
**Repository:** `mohammadAliKeshavarzSarkar/BeatFit-Website`  
**Methodology:** [SEO Engineering](https://github.com/mohammadAliKeshavarzSarkar/SEO-Engineering)

This folder is the canonical home for all BeatFit-specific SEO research, technical audits, implementation proposals, verification, decisions, and activity logs.

## Documentation index

- [Project brief](project/project-brief.md) — scope, audiences, assumptions, authority, and gates.
- [Baseline source audit](audits/2026-11-21-source-baseline.md) — source observations, findings, severity and outstanding live tests.
- [Source verification](verification/2026-11-21-source-checks.md) — limited reproducible source checks, not production results.
- [URL inventory](inventory/source-route-inventory.csv) — source-declared marketing pages and Persian article URLs.
- [Decision log](decisions/decision-log.md) — recorded approvals, proposals, risks and dependencies.
- [Activity log](operations/run-log.md) — what was actually done and not done.
- [Historical playbook](../SEO-RESEARCH-PLAYBOOK.md) — research completed on 2026-11-18; prior findings must be revalidated.

## Rules

1. All documentation structure, filenames, headings and explanatory prose are **English**. Original Persian website text, keywords, article titles, search strings and URL slugs remain Persian when quoted as evidence.
2. Every report cites the inspected commit or deployed environment, date, evidence and verification status.
3. Keep source inspection, built output, live HTTP, rendered browser, Search Console indexing and measured business conversions distinct. Do not claim that a static presence check is a production PASS.
4. Use **PASS / FAIL / BLOCKED / NOT RUN / N/A** for actual tests and **observed / hypothesis / unknown** for evidence types.
5. Decisions are not implementation or verification. Changes to website source, production deployment, domains, tracking or private accounts require scoped authorization.
6. Do not publish secrets, user or athlete health data, lead records, analytics exports or private operational logs in this public repository.
7. Add every future BeatFit SEO work product to `docs/seo/` and update this index and the activity log.

## Initial evidence checkpoint

**Source revision:** `d11130cef8f941f54b06362bb9bd124f89853adb` (2026-11-21)

The repository declares six indexable marketing URLs and seven Persian articles, with 13 sitemap entries and 12 non-home rewrite entries. Eleven limited source checks were recorded. No complete build, deployed response audit, Google indexing inspection, or successful demo conversion test was performed as part of that source-only checkpoint.

## Next verification gate

Validate TLS and canonical origin, HTTP status/redirect chains, route-specific built HTML and rendered content, and production demo lead submission before claiming production SEO readiness.
