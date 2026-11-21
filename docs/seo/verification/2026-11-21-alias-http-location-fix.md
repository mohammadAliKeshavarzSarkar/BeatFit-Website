# Alias Redirect Emitted `http://` Location — Fix

**Record:** BF-SEO-VERIFY-T3-ALIAS-001  
**Date:** 2026-11-21  
**Vantage:** Target-market (Iran) HTTPS client  
**Status:** LIVE PASS — owner redeployed 2026-11-21; re-probe confirms HTTPS `Location` headers

## Observation (pre-fix live)

```text
GET https://beatfit.ir/blog/heart-rate-zones
→ 301 Location: http://beatfit.ir/blog/%D8%B2%D9%88%D9%86-...
→ 301 Location: https://beatfit.ir/blog/%D8%B2%D9%88%D9%86-...   (host HTTP→HTTPS)
→ 200 Persian canonical article
```

Relative IIS redirect actions (`url="/blog/..."`) were absolutized as **HTTP** because the site sees the request as HTTP behind the current TLS binding/proxy (same class of issue as the earlier HTTPS-rewrite loop).

## GSC sample matrix (Iran, same session)

| URL | Status | Notes |
|---|---|---|
| `/` | 200 | Canonical `https://beatfit.ir/` |
| `/gym` | 200 | Route-specific title/canonical |
| `/demo` | 200 | Demo shell OK |
| `/blog/زون-های-ضربان-قلب` | 200 | Correct Persian canonical |
| `/sitemap.xml` / `/robots.txt` | 200 | Discovery files OK |
| verification HTML | 200 | Still present |
| unknown path | **404** | Real 404 (not soft homepage) |
| `/blog/heart-rate-zones` | 301→**http**→https→200 | **FAIL** before redeploy |

## Post-redeploy re-probe (2026-11-21)

| URL | Status | `Location` |
|---|---|---|
| `/blog/heart-rate-zones` | 301 | `https://beatfit.ir/blog/%D8%B2%D9%88%D9%86-...` (**no http://**) |
| `/blog/live-class-monitoring` | 301 | `https://beatfit.ir/blog/%DA%A9%D9%86%D8%AA...` |
| `/blog` | 301 | `https://beatfit.ir/resources` |
| `/gym/` | 301 | `https://beatfit.ir/gym` |
| `/`, `/gym`, Persian zones, sitemap | 200 | Canonicals remain HTTPS |

## Source fix

`public/web.config` permanent redirects now use absolute `https://beatfit.ir/...` targets for:

- Strip trailing slash  
- `/blog` → `/resources`  
- All five English blog aliases  

`scripts/emit-seo-html.ts` asserts each alias action contains `url="https://beatfit.ir{encodedPath}"` so relative targets cannot regress silently.

## Post-deploy acceptance

```bash
curl -sS -I --max-redirs 0 https://beatfit.ir/blog/heart-rate-zones
# Expect: 301 Location: https://beatfit.ir/blog/%D8%B2%D9%88%D9%86-...
# Must NOT start with http://
```

Repeat for one other alias (e.g. `live-class-monitoring`) and `/blog` → `https://beatfit.ir/resources`.
