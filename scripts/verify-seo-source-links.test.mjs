#!/usr/bin/env node
// Disposable source-fixture checks for the internal link validator.
// No website, crawler, browser or production requests are made.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(new URL("./verify-seo-source-links.mjs", import.meta.url));
const records = [
  { slug: "الف", variable: "firstPost", file: "first", publicSlug: "first-article", related: ["ب", "پ"] },
  { slug: "ب", variable: "secondPost", file: "second", publicSlug: "second-article", related: ["الف", "پ"] },
  { slug: "پ", variable: "thirdPost", file: "third", publicSlug: "third-article", related: ["الف", "ب"] },
];

function withFixture(run) {
  const root = mkdtempSync(join(tmpdir(), "beatfit-seo-source-links-"));
  const write = (relative, content) => {
    const filename = join(root, relative);
    mkdirSync(dirname(filename), { recursive: true });
    writeFileSync(filename, content, "utf8");
  };
  const read = relative => readFileSync(join(root, relative), "utf8");
  const change = (relative, before, after) => {
    const original = read(relative);
    assert.ok(original.includes(before), `Test fixture was missing expected text in ${relative}`);
    write(relative, original.replace(before, after));
  };
  const execute = () => spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8" });

  try {
    write(
      "src/content/blog/posts.ts",
      [
        ...records.map(r => `import { ${r.variable} } from "./${r.file}";`),
        "const posts = {",
        ...records.map(r => `  "${r.slug}": ${r.variable},`),
        "};",
        "export const blogPublicSlugByContentSlug = {",
        ...records.map(r => `  "${r.slug}": "${r.publicSlug}",`),
        "} as const;",
      ].join("\n") + "\n",
    );
    for (const r of records) {
      write(
        `src/content/blog/${r.file}.ts`,
        `export const ${r.variable} = {\n  slug: "${r.slug}",\n  published: true,\n  relatedSlugs: ["${r.related[0]}", "${r.related[1]}"],\n  content: [{ href: "/coach" }],\n};\n`,
      );
    }
    for (const name of ["home", "resources"]) {
      write(
        `src/content/${name}.ts`,
        [
          "export const links = [",
          ...records.map(r => `  { href: "/blog/${r.publicSlug}" },`),
          "  { href: \"/coach\" },",
          "  { href: \"https://app.beatfit.ir\" },",
          "  { href: \"#section\" },",
          "];",
        ].join("\n") + "\n",
      );
    }
    write("src/content/gym.ts", 'export const gym = { ctaHref: "/demo" };\n');
    write("src/content/coach.ts", 'export const coach = { ctaHref: "/demo" };\n');
    write("src/content/athlete.ts", 'export const athlete = { ctaHref: "/resources" };\n');
    write("src/content/demo.ts", 'export const demo = { title: "Demo" };\n');
    run({ write, read, change, execute });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test("passes registered ASCII article links and marketing CTAs", () => withFixture(({ execute }) => {
  const result = execute();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /3 published articles, 6 related-slug references/);
}));

test("rejects a broken coach CTA destination", () => withFixture(({ change, execute }) => {
  change("src/content/coach.ts", 'ctaHref: "/demo"', 'ctaHref: "/demoo"');
  const result = execute();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unregistered internal href \/demoo in src\/content\/coach\.ts/);
}));

test("rejects a broken homepage navigation destination", () => withFixture(({ change, execute }) => {
  change("src/content/home.ts", 'href: "/coach"', 'href: "/coah"');
  const result = execute();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unregistered internal href \/coah in src\/content\/home\.ts/);
}));

test("rejects an unknown article path in an athlete CTA", () => withFixture(({ change, execute }) => {
  change("src/content/athlete.ts", 'ctaHref: "/resources"', 'ctaHref: "/blog/nonexistent"');
  const result = execute();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unregistered internal href \/blog\/nonexistent/);
}));

test("rejects a non-ASCII article URL in a marketing CTA", () => withFixture(({ change, execute }) => {
  change("src/content/gym.ts", 'ctaHref: "/demo"', 'ctaHref: "/blog/الف"');
  const result = execute();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Non-ASCII blog href \/blog\/الف/);
}));

test("rejects a relative marketing CTA path", () => withFixture(({ change, execute }) => {
  change("src/content/coach.ts", 'ctaHref: "/demo"', 'ctaHref: "demo"');
  const result = execute();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unrecognized or relative link demo/);
}));

test("rejects duplicate canonical public slugs", () => withFixture(({ change, execute }) => {
  change("src/content/blog/posts.ts", '"ب": "second-article"', '"ب": "first-article"');
  const result = execute();
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Duplicate public ASCII slug assignments/);
}));
