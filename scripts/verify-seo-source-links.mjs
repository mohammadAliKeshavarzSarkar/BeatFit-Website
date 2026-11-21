#!/usr/bin/env node
// Validate literal editorial links and related article references against the
// published source registry. This is source integrity, NOT browser/crawler QA.
// After BF-SEO-D025, public hrefs use ASCII slugs; relatedSlugs stay content slugs.
import { readFileSync } from "node:fs";
import path from "node:path";

const read = file => readFileSync(file, "utf8");
const registry = read("src/content/blog/posts.ts");
const imports = new Map(
  [...registry.matchAll(/^import\s+\{\s*(\w+)\s*\}\s+from\s+["']\.\/(\w+)["'];?\s*$/gm)]
    .map(match => [match[1], match[2]]),
);
const entries = [...registry.matchAll(/^\s*["']([^"'\n]+)["']:\s*(\w+),\s*$/gm)]
  .map(match => ({ slug: match[1], symbol: match[2] }));
const failures = [];
function assert(condition, message) { if (!condition) failures.push(message); }

assert(entries.length > 0, "No published article registry entries discovered");
assert(new Set(entries.map(x => x.slug)).size === entries.length, "Duplicate article slugs in registry");

const articleFiles = [];
for (const { slug, symbol } of entries) {
  const filename = imports.get(symbol);
  assert(Boolean(filename), `Missing registry import for ${slug} (${symbol})`);
  if (!filename) continue;
  const file = path.join("src/content/blog", filename + ".ts");
  const source = read(file);
  articleFiles.push({ slug, file, source });
  assert(source.includes(`slug: "${slug}"`), `Canonical slug differs from registry in ${file}`);
  assert(/published:\s*true/.test(source), `Registry article is not published: ${file}`);
}
const contentSlugs = new Set(entries.map(x => x.slug));

// Public ASCII slug map from blogPublicSlugByContentSlug only (D025).
const publicMapBlock = registry.match(
  /export const blogPublicSlugByContentSlug\s*=\s*\{([\s\S]*?)\}\s*as const/,
)?.[1] ?? "";
const publicByContent = new Map(
  [...publicMapBlock.matchAll(/^\s*["']([^"'\n]+)["']:\s*["']([a-z0-9-]+)["'],\s*$/gm)]
    .map(match => [match[1], match[2]]),
);
const contentByPublic = new Map(
  [...publicByContent.entries()].map(([content, pub]) => [pub, content]),
);
assert(
  publicByContent.size === contentSlugs.size,
  `Expected ${contentSlugs.size} public ASCII slug mappings, found ${publicByContent.size}`,
);
for (const slug of contentSlugs) {
  assert(publicByContent.has(slug), `Missing public ASCII slug for content slug ${slug}`);
}

function isAsciiPublicSegment(segment) {
  return /^[a-z0-9-]+$/.test(segment);
}

const allowedMarketing = new Set(["/", "/gym", "/coach", "/athlete", "/resources", "/demo"]);

let hrefs = 0;
let related = 0;
for (const { file, source, slug } of [
  ...articleFiles,
  { file: "src/content/resources.ts", source: read("src/content/resources.ts") },
  { file: "src/content/home.ts", source: read("src/content/home.ts") },
]) {
  // Literal hrefs cover editorial cards, inline rich-text links and article CTAs.
  for (const match of source.matchAll(/\bhref:\s*["'](\/[^"'\n]*)["']/g)) {
    const href = match[1];
    hrefs++;
    const [pathname] = href.split(/[?#]/);
    if (pathname.startsWith("/blog/")) {
      const segment = pathname.slice("/blog/".length);
      // Public hrefs must use ASCII slugs (D025). relatedSlugs stay content slugs.
      assert(
        isAsciiPublicSegment(segment),
        `Non-ASCII blog href ${href} in ${file} — use public ASCII slug`,
      );
      assert(
        contentByPublic.has(segment),
        `Unregistered internal href ${href} in ${file}`,
      );
    } else {
      assert(allowedMarketing.has(pathname), `Unregistered internal href ${href} in ${file}`);
    }
  }
  if (!slug) continue;
  const relatedMatch = source.match(/\brelatedSlugs:\s*\[([\s\S]*?)\]/);
  assert(Boolean(relatedMatch), `Missing relatedSlugs in ${file}`);
  if (!relatedMatch) continue;
  const relatedSlugs = [...relatedMatch[1].matchAll(/["']([^"'\n]+)["']/g)].map(m => m[1]);
  assert(relatedSlugs.length === 2, `Expected two related articles in ${file}`);
  assert(new Set(relatedSlugs).size === relatedSlugs.length, `Repeated related article in ${file}`);
  for (const target of relatedSlugs) {
    related++;
    assert(contentSlugs.has(target), `Unregistered related slug ${target} in ${file}`);
    assert(target !== slug, `Self-referential related article in ${file}`);
  }
}

// Discovery surfaces must expose every published article via its public ASCII path.
for (const file of ["src/content/resources.ts", "src/content/home.ts"]) {
  const source = read(file);
  for (const contentSlug of contentSlugs) {
    const publicSlug = publicByContent.get(contentSlug);
    assert(
      source.includes(`href: "/blog/${publicSlug}"`),
      `Published article ${contentSlug} missing ASCII discovery href /blog/${publicSlug} in ${file}`,
    );
  }
}
if (failures.length) {
  console.error(`SEO source-link integrity FAILED: ${failures.length} issue(s)`);
  for (const issue of failures) console.error(` - ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`SEO source-link integrity PASSED: ${entries.length} published articles, ${related} related-slug references, ${hrefs} internal hrefs`);
  console.log("Scope: declared literal source links only; does not test rendered DOM, deployment or Google discovery.");
}
