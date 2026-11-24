#!/usr/bin/env node
// Browser-only, review-stage check of rendered journeys and SEO shell behavior.
// Requires a completed production build, temporary Playwright + Chromium on CI.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(join(process.cwd(), "package.json"));
const { chromium } = require("playwright");
const origin = "http://127.0.0.1:4173";
const preview = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--host", "127.0.0.1", "--port", "4173", "--strictPort"], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
preview.stdout.on("data", d => logs += String(d));
preview.stderr.on("data", d => logs += String(d));
let browser;

async function open(page, path) {
  const result = await page.goto(origin + path, { waitUntil: "domcontentloaded", timeout: 25000 });
  assert.equal(result?.status(), 200, `Unexpected HTTP response for ${path}: ${result?.status()}`);
  await page.locator("main h1").first().waitFor({ state: "attached", timeout: 20000 });
  return result;
}
function pathOf(url) { return new URL(url, origin).pathname; }

try {
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt++) {
    if (preview.exitCode !== null) break;
    try {
      const result = await fetch(origin + "/");
      if (result.ok) { ready = true; break; }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 350));
  }
  assert.ok(ready, `Vite Preview startup failed: ${logs.slice(-1400)}`);

  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const context = await browser.newContext({ locale: "fa-IR", viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const pageErrors = [];
  const nonGet = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("request", req => { if (!["GET", "HEAD"].includes(req.method())) nonGet.push(req.method() + " " + req.url()); });

  for (const journey of [
    { source: "/gym", selector: ".bf-gym-banner-b__cta", dest: "/demo" },
    { source: "/coach", selector: ".bf-gym-banner-b__cta", dest: "/demo" },
    { source: "/athlete", selector: ".bf-athlete-banner__cta", dest: "/resources" },
  ]) {
    await open(page, journey.source);
    const cta = page.locator(journey.selector).first();
    await cta.waitFor({ state: "visible", timeout: 15000 });
    assert.equal(pathOf(await cta.getAttribute("href")), journey.dest, `Bad link in ${journey.source}`);
    await cta.click();
    await page.waitForURL(url => url.pathname === journey.dest, { timeout: 16000 });
    await page.locator("main h1").first().waitFor({ state: "visible" });
    const canonical = await page.locator('link[rel="canonical"]').first().getAttribute("href");
    assert.equal(pathOf(canonical), journey.dest, `Canonical differs after ${journey.source} CTA click`);
    assert.equal(await page.locator("#bf-static-seo").count(), 0, "Temporary SEO shell remained after hydration");
    console.log(`PASS browser 390px: ${journey.source} CTA -> ${journey.dest}, rendered H1 + canonical`);
  }

  await open(page, "/demo");
  assert.equal(await page.title(), "آشنایی با دموی سیستم پایش ضربان قلب | بیت‌فیت");
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  assert.match(description, /ثبت آنلاین درخواست دمو فعلاً فعال نیست/);
  const note = page.locator("#demo-form-availability");
  assert.match(await note.textContent(), /فعلاً فعال نیست/);
  const fieldset = page.locator(".bf-demo__disabled-fieldset");
  assert.equal(await fieldset.count(), 1);
  assert.equal(await fieldset.isDisabled(), true);
  assert.equal(await fieldset.locator("input, select, textarea, button").count(), 6);
  assert.equal(nonGet.length, 0, "Unexpected data-submitting request during disabled demo journey");
  console.log("PASS browser /demo: truthful SEO metadata, pre-entry notice, disabled six controls, no non-GET");

  await open(page, "/resources");
  const cards = page.locator(".bf-resources-card__title a");
  await cards.first().waitFor({ state: "visible" });
  assert.equal(await cards.count(), 7, "Resources must expose seven visible article-card anchors");
  const hrefs = await cards.evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
  assert.equal(new Set(hrefs).size, 7, "Duplicate resource article link");
  assert.ok(hrefs.every(href => /^\/blog\/[a-z0-9-]+$/.test(href)), "Noncanonical resource article URL");

  await cards.first().click();
  await page.waitForURL(url => url.pathname.startsWith("/blog/"), { timeout: 15000 });
  await page.locator(".bf-blog-post__body").first().waitFor({ state: "visible" });
  const articleText = await page.locator(".bf-blog-post__body").innerText();
  assert.ok(articleText.length > 500, "Article text was not rendered in JavaScript-enabled browser");
  const articleCanonical = await page.locator('link[rel="canonical"]').first().getAttribute("href");
  assert.equal(pathOf(articleCanonical), page.url().replace(origin, "").split("?")[0]);
  assert.equal(await page.locator("#bf-static-seo").count(), 0);
  console.log("PASS browser /resources -> article: seven links, JS-rendered content and canonical");

  assert.deepEqual(pageErrors, [], "Unexpected browser JavaScript exceptions");
  await context.close();

  const noJs = await browser.newContext({ javaScriptEnabled: false, locale: "fa-IR", viewport: { width: 390, height: 844 } });
  const noJsPage = await noJs.newPage();
  await open(noJsPage, "/blog/heart-rate-zones");
  assert.equal(await noJsPage.locator("#bf-static-seo h1").count(), 1, "Expected no-JS article shell heading");
  assert.equal(await noJsPage.locator(".bf-blog-post__body").count(), 0, "Expected full article body to require JS");
  console.log("OBSERVATION: no-JS article has SEO heading shell, not the full article body; requires Google rendered HTML evidence");
  await noJs.close();
} finally {
  if (browser) await browser.close();
  preview.kill("SIGTERM");
}
