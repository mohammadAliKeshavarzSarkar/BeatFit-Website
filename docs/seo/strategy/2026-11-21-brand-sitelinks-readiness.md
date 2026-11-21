# Brand Sitelinks Readiness — بیت‌فیت / BeatFit / beatfit

**Record:** BF-SEO-SITELINKS-001  
**Date:** 2026-11-21  
**Status:** Engineering readiness only — **Google chooses sitelinks; they cannot be forced**

## What sitelinks are

When someone searches branded queries (`بیت فیت`, `بیت‌فیت`, `beatfit`, `BeatFit`), Google may show extra links under the homepage result (e.g. باشگاه‌ها، مربیان، درخواست دمو). Appearance depends on indexing trust, click behavior, and clear site structure — not a Search Console toggle.

## What we implemented

| Lever | Change |
|---|---|
| Brand aliases | `Organization` / `WebSite` `alternateName`: بیت فیت، بیتفیت، BeatFit، beatfit، Beat Fit، BEATFIT |
| Destination clarity | Home SEO shell + JSON-LD `SiteNavigationElement` for `/gym`, `/coach`, `/athlete`, `/resources`, `/demo` |
| Internal links | Footer «دسترسی سریع» lists all five destinations; resources uses `/resources` (not `/#blogs`) |
| Page titles | Unique titles on those destinations (marketing SEO pack) |

## What still depends on Google / ops

1. Property verified + sitemap submitted (T4).  
2. Homepage and the five destinations indexed.  
3. Time and branded search traffic — sitelinks often appear weeks after stable indexing.  
4. Official social / sameAs URLs when available (placeholders `#` must **not** be added to schema).  
5. No guarantee every brand spelling shows the same sitelink set.

## Owner checks after deploy

1. GSC → search `site:beatfit.ir` and branded queries when data exists.  
2. URL Inspection on `/`, `/gym`, `/demo`, `/resources`.  
3. Do not expect sitelinks in the first days after a new property.

## Official reference

- [Google: Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks) — automatic; improve site structure and navigation quality.
