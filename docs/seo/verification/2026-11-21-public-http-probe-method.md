# Authorized Public HTTP SEO Probe — Method
**Date:** 2026-11-21
**Scope:** Non-authenticated public GET requests to beatfit.ir and www variants.
**Status:** Diagnostic workflow in isolated branch, not merged/deployed.
**Purpose:** Inspect live origin behavior, HTTP/HTTPS, response codes, robots, Sitemap, one gym route, one Persian blog article, legacy alias and an unknown route.

The isolated workflow uses curl in GitHub Actions Ubuntu 24.04 and Node 22. It sends 14 fixed GETs with normal certificate validation, at most three concurrent requests, six-second connect and sixteen-second total timeouts, and maximum five redirects. It does not authenticate, bypass access controls, submit forms, crawl broadly, or modify production. Only bounded public metadata and errors appear in the job log.

Output is a JSON line prefixed BF_SEO_PROBE_JSON. A network failure observed in one CI runner does not prove the site is offline globally. The workflow can complete without proving a healthy endpoint: interpret each HTTP result separately.

The findings will be preserved under docs/seo/verification on main after the job completes. No HTTPS setting, deployment, redirect rule or Search Console account is changed by this work.
