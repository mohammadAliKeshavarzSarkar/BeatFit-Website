#!/usr/bin/env node
// Verify the built SEO artifacts. Run after `npm run build`.
// This is an output-integrity check, NOT a crawler, a JavaScript-rendering test,
// or evidence of how the production IIS server or Google serves/indexes pages.
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const outputDirectory = resolve(process.cwd(), process.argv[2] ?? 'dist');
const failures = [];
let checks = 0;

function check(condition, label) {
  checks++;
  if (!condition) failures.push(label);
}

function read(relative) {
  const file = join(outputDirectory, relative);
  if (!existsSync(file)) {
    check(false, `Missing built file: ${relative}`);
    return null;
  }
  return readFileSync(file, 'utf8');
}

function decodeEntities(value) {
  return value.replace(/&(?:amp|lt|gt|quot|apos|#39);/g, entity => ({
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&apos;': "'", '&#39;': "'",
  })[entity]);
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match ? decodeEntities(match[2]) : null;
}

function findTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map(match => match[0]);
}

function metadata(html, field, value) {
  return findTags(html, 'meta').filter(tag => attribute(tag, field) === value);
}

const requiredMarketing = ['/', '/gym', '/coach', '/athlete', '/resources', '/demo'];
const requiredArticles = [
  'زون-های-ضربان-قلب',
  'کنترل-شدت-تمرین-در-کلاس-گروهی',
  'پایش-ضربان-قلب-در-باشگاه',
  'تاریخچه-تمرین',
  'بار-تمرینی-چیست',
  'مقایسه-سنسور-ضربان-قلب',
  'طراحی-تمرین-گروهی',
].map(slug => `/blog/${slug}`);

const sitemap = read('sitemap.xml');
const robots = read('robots.txt');
const webConfig = read('web.config');
const notFound = read('404.html');

if (sitemap && robots && webConfig) {
  const urls = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
    .map(match => decodeEntities(match[1]));
  check(urls.length >= 13, 'Sitemap must contain at least the 13 source-baseline URLs');
  check(urls.length === new Set(urls).size, 'Sitemap contains duplicate <loc> URLs');
  check(urls.every(value => { try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) && !u.search && !u.hash; } catch { return false; } }), 'Sitemap <loc> entries must be absolute clean HTTP(S) URLs');
  let origin = null;
  try { if (urls.length) origin = new URL(urls[0]).origin; } catch {}
  check(Boolean(origin) && urls.every(value => { try { return new URL(value).origin === origin; } catch { return false; } }), 'Sitemap URLs do not share one canonical origin');

  const paths = new Map();
  for (const value of urls) {
    try {
      const url = new URL(value);
      paths.set(decodeURIComponent(url.pathname), value);
    } catch {}
  }
  for (const path of [...requiredMarketing, ...requiredArticles]) {
    check(paths.has(path), `Expected source-baseline URL absent from Sitemap: ${path}`);
  }
  check(![...paths.keys()].some(path => path.startsWith('/route-html/')), 'Internal HTML shell path must not be an indexable URL');
  if (origin) check(robots.includes(`Sitemap: ${origin}/sitemap.xml`), 'robots.txt Sitemap origin mismatch');
  check(/Disallow:\s*\/route-html\//i.test(robots), 'robots.txt must disallow internal route shell URLs');

  const routeBlock = webConfig.match(/<!-- bf:routes -->([\s\S]*?)<!-- \/bf:routes -->/);
  check(Boolean(routeBlock), 'web.config route-map marker block is missing');
  const routeTags = routeBlock ? findTags(routeBlock[1], 'add') : [];
  const routes = new Map();
  for (const tag of routeTags) {
    const key = attribute(tag, 'key');
    const value = attribute(tag, 'value');
    check(Boolean(key && value && value.startsWith('/route-html/') && value.endsWith('.html')), `Invalid route-map entry: ${tag}`);
    if (key) {
      check(!routes.has(key), `Duplicate route-map key: ${key}`);
      routes.set(key, value);
    }
  }
  check(routes.size === Math.max(paths.size - 1, 0), 'Route-map entries and nonhome sitemap URLs differ');

  const seenTitles = new Set();
  const seenDescriptions = new Set();
  for (const [pathname, canonical] of paths) {
    const routeKey = pathname.replace(/^\//, '');
    const filename = pathname === '/' ? 'index.html' : routes.get(routeKey)?.replace(/^\//, '');
    check(Boolean(filename), `Missing rewrite-map target for ${pathname}`);
    if (!filename) continue;
    const html = read(filename);
    if (!html) continue;

    const htmlRoot = findTags(html, 'html')[0] ?? '';
    check(attribute(htmlRoot, 'lang') === 'fa', `Missing HTML lang=fa: ${pathname}`);
    check(attribute(htmlRoot, 'dir') === 'rtl', `Missing HTML dir=rtl: ${pathname}`);

    const heads = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
    check(Boolean(heads), `Missing HTML head: ${pathname}`);
    if (!heads) continue;
    const head = heads[1];
    const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
    check(titles.length === 1 && Boolean(titles[0][1].trim()), `Expected one nonempty title: ${pathname}`);
    if (titles.length === 1) {
      const title = decodeEntities(titles[0][1].trim());
      check(!seenTitles.has(title), `Duplicate title: ${pathname}`);
      seenTitles.add(title);
    }

    const descriptions = metadata(head, 'name', 'description');
    check(descriptions.length === 1 && Boolean(attribute(descriptions[0] ?? '', 'content')?.trim()), `Expected one description: ${pathname}`);
    if (descriptions.length === 1) {
      const description = attribute(descriptions[0], 'content');
      check(!seenDescriptions.has(description), `Duplicate meta description: ${pathname}`);
      seenDescriptions.add(description);
    }

    const canonicals = findTags(head, 'link').filter(tag => attribute(tag, 'rel') === 'canonical');
    check(canonicals.length === 1 && attribute(canonicals[0] ?? '', 'href') === canonical, `Wrong or duplicate canonical: ${pathname}`);
    const robotsMeta = metadata(head, 'name', 'robots');
    check(robotsMeta.length === 1 && /\bindex\b/i.test(attribute(robotsMeta[0] ?? '', 'content') ?? '') && !/\bnoindex\b/i.test(attribute(robotsMeta[0] ?? '', 'content') ?? ''), `Invalid robots index directive: ${pathname}`);
    const ogUrls = metadata(head, 'property', 'og:url');
    check(ogUrls.length === 1 && attribute(ogUrls[0], 'content') === canonical, `Wrong og:url: ${pathname}`);
    check(/<main\b[^>]*id=["']bf-static-seo["'][\s\S]*?<h1\b/i.test(html), `Missing initial SEO H1 shell: ${pathname}`);

    const jsonLdMatches = [...head.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
      .filter(match => attribute(match[1], 'id') === 'bf-jsonld');
    check(jsonLdMatches.length === 1, `Expected one managed JSON-LD block: ${pathname}`);
    if (jsonLdMatches.length === 1) {
      try {
        const data = JSON.parse(jsonLdMatches[0][2]);
        check(typeof data === 'object' && data !== null, `Empty JSON-LD: ${pathname}`);
      } catch {
        check(false, `Invalid JSON-LD syntax: ${pathname}`);
      }
    }
  }

  for (const [routeKey, target] of routes) {
    check(paths.has(`/${routeKey}`), `Rewrite route is not listed in Sitemap: /${routeKey}`);
    check(existsSync(join(outputDirectory, target.replace(/^\//, ''))), `Missing rewrite destination: ${target}`);
  }
}

if (notFound) {
  const head = notFound.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  check(metadata(head, 'name', 'robots').some(tag => /\bnoindex\b/i.test(attribute(tag, 'content') ?? '')), '404 shell missing noindex');
  check(!findTags(head, 'link').some(tag => attribute(tag, 'rel') === 'canonical'), '404 shell must not emit canonical');
}

if (failures.length) {
  console.error(`SEO build verification FAILED: ${failures.length}/${checks} checks failed`);
  for (const problem of failures) console.error(` - ${problem}`);
  process.exitCode = 1;
} else {
  console.log(`SEO build verification PASSED: ${checks} checks; ${outputDirectory}`);
  console.log('Scope: generated files only; not deployed HTTP, rendered DOM or search index.');
}
