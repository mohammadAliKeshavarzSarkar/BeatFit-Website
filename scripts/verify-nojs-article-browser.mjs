#!/usr/bin/env node
// Browser QA of the actual generated route-specific article shell.
// Vite preview does not reproduce IIS rewrites, so no-JS checks directly open
// /route-html/blog/*.html and JS-enabled checks use public /blog/* routes.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(join(process.cwd(), "package.json"));
const { chromium } = require("playwright");
const origin = "http://127.0.0.1:4174";
const slugs = [
  "heart-rate-zones",
  "live-class-monitoring",
  "connected-training-system",
  "workout-history-progress",
  "training-load",
  "heart-rate-sensor-comparison",
  "group-class-design",
];
const preview = spawn(process.execPath, [
  "node_modules/vite/bin/vite.js", "preview",
  "--host", "127.0.0.1", "--port", "4174", "--strictPort",
], { cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"] });
let serverOutput = "";
preview.stdout.on("data", chunk => serverOutput += String(chunk));
preview.stderr.on("data", chunk => serverOutput += String(chunk));
let browser;

async function ready() {
  for (let attempt = 0; attempt < 80; attempt++) {
    if (preview.exitCode !== null) break;
    try { if ((await fetch(origin + "/")).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  throw new Error(`Preview unavailable: ${serverOutput.slice(-1200)}`);
}

async function visit(page, pathname) {
  const response = await page.goto(origin + pathname, {
    waitUntil: "domcontentloaded", timeout: 30000,
  });
  assert.equal(response?.status(), 200, `Unexpected response for ${pathname}`);
}

try {
  await ready();
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const noJs = await browser.newContext({
    javaScriptEnabled: false, locale: "fa-IR",
    viewport: { width: 390, height: 844 },
  });
  const noJsPage = await noJs.newPage();
  const expectedTitles = new Map();

  for (const slug of slugs) {
    // This is the exact initial HTML that IIS should rewrite the public URL to.
    await visit(noJsPage, `/route-html/blog/${slug}.html`);
    const article = noJsPage.locator('[data-bf-static-article="true"]');
    await article.waitFor({ state: "visible", timeout: 15000 });
    const text = await article.innerText();
    assert.ok(text.length > 3000, `No-JS body missing substantial text: ${slug}`);
    assert.ok((await article.locator("h2").count()) >= 5, `No-JS H2 sections missing: ${slug}`);
    assert.ok((await article.locator('a[href]').count()) >= 4, `No-JS links missing: ${slug}`);
    assert.equal(await noJsPage.locator("main h1").count(), 1);
    const heading = await noJsPage.locator("main h1").textContent();
    assert.ok(heading?.trim(), `Missing heading: ${slug}`);
    expectedTitles.set(slug, heading.trim());
    const canonical = await noJsPage.locator('link[rel="canonical"]').getAttribute("href");
    assert.equal(new URL(canonical).pathname, `/blog/${slug}`);
    console.log(`PASS no-JS browser ${slug}: ${text.length} text chars, headings/links/canonical present`);
  }
  await noJs.close();

  const normal = await browser.newContext({
    locale: "fa-IR", viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const normalPage = await normal.newPage();
  const pageErrors = [];
  normalPage.on("pageerror", error => pageErrors.push(error.message));
  for (const slug of ["heart-rate-zones", "connected-training-system"]) {
    await visit(normalPage, `/blog/${slug}`);
    await normalPage.locator(".bf-blog-post__body").waitFor({ state: "visible", timeout: 15000 });
    assert.equal((await normalPage.locator(".bf-blog-post__title").textContent())?.trim(), expectedTitles.get(slug));
    assert.equal(await normalPage.locator("#bf-static-seo").count(), 0, "Static shell not removed on hydration");
    assert.ok((await normalPage.locator(".bf-blog-post__body").innerText()).length > 3000);
    const canonical = await normalPage.locator('link[rel="canonical"]').getAttribute("href");
    assert.equal(new URL(canonical).pathname, `/blog/${slug}`);
    console.log(`PASS JS browser ${slug}: React article replaces fallback and preserves canonical`);
  }
  assert.deepEqual(pageErrors, [], "Browser runtime errors");
  await normal.close();
} finally {
  if (browser) await browser.close();
  preview.kill("SIGTERM");
}
