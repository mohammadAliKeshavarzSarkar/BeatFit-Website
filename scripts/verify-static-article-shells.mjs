#!/usr/bin/env node
// Verify real generated full article HTML, without executing JavaScript.
// This is a source/build gate, NOT Googlebot or public server verification.
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const outputDir = resolve(process.cwd(), process.argv[2] ?? "dist");
const blogDir = join(outputDir, "route-html", "blog");
const files = readdirSync(blogDir).filter(name => name.endsWith(".html")).sort();
assert.equal(files.length, 7, "Expected exactly seven emitted published blog route shells");

for (const filename of files) {
  const html = readFileSync(join(blogDir, filename), "utf8");
  const article = html.match(/<article data-bf-static-article="true"[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? "";
  const main = html.match(/<main id="bf-static-seo"[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
  assert.ok(main.includes('data-bf-static-article="true"'), `Missing article content inside initial main: ${filename}`);
  assert.ok(article.length > 4500, `Article HTML too short to represent real source content: ${filename}`);
  assert.ok((article.match(/<h2\b/g) ?? []).length >= 5, `Article subsections missing: ${filename}`);
  assert.ok((article.match(/<p\b/g) ?? []).length >= 9, `Full explanatory paragraphs missing: ${filename}`);
  assert.ok((article.match(/<a href="(?:\/|https:\/\/)/g) ?? []).length >= 4, `Article source/internal links missing: ${filename}`);
  assert.equal((main.match(/<h1\b/g) ?? []).length, 1, `Expected only one H1 in initial article: ${filename}`);
  assert.ok(!/<script\b|onerror\s*=|onload\s*=|href="javascript:/i.test(article), `Unexpected executable markup in article HTML: ${filename}`);
  assert.ok(!html.includes('bfStaticSeo.remove()'), `Article fallback must remain until the React article commits: ${filename}`);
  assert.ok(Buffer.byteLength(html, "utf8") < 350_000, `Unreasonably large initial HTML page: ${filename}`);
  console.log(`PASS static article ${filename}: ${article.length} chars, no JavaScript required for full text`);
}
console.log(`All ${files.length} published article shells contain substantive semantic source content.`);
