import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const articlePath = "src/content/blog/groupClassDesign.ts";
const article = existsSync(articlePath) ? readFileSync(articlePath, "utf8") : "";
const posts = readFileSync("src/content/blog/posts.ts", "utf8");
const home = readFileSync("src/content/home.ts", "utf8");
const resources = readFileSync("src/content/resources.ts", "utf8");

assert.match(posts, /["']طراحی-تمرین-گروهی["']\s*:/, "Canonical group-class-design slug is missing");
assert.match(article, /seoTitle:\s*["']طراحی تمرین گروهی برای سطوح مختلف آمادگی \| راهنمای مربی["']/, "SEO title is missing");
assert.match(article, /metaDescription:\s*\n?\s*["']چطور برای ورزشکاران با آمادگی متفاوت کلاس گروهی طراحی کنیم\؟ با انتخاب حرکات جایگزین، تنظیم شدت و نمونه برنامه ۴۵دقیقه‌ای آشنا شوید\.["']/, "Meta description is missing");
assert.equal((article.match(/kind:\s*["']table["']/g) ?? []).length, 2, "Article must contain exactly two tables");
assert.equal((article.match(/kind:\s*["']process["']/g) ?? []).length, 1, "Article must contain one class-design process");
assert.equal((article.match(/kind:\s*["']chart["']/g) ?? []).length, 0, "Article must not invent a chart");
assert.ok(article.includes("/assets/gym/eco-panel.png"), "Inline coach panel is missing");
assert.ok(article.includes("/blog/کنترل-شدت-تمرین-در-کلاس-گروهی"), "Intensity article link is missing");
assert.ok(article.includes("/blog/زون-های-ضربان-قلب"), "Heart-rate-zones link is missing");
assert.ok(article.includes("/blog/تاریخچه-تمرین"), "Training-history link is missing");
assert.match(article, /href:\s*["']\/coach["']/, "Coach CTA is missing");
assert.equal((article.match(/question:/g) ?? []).length, 7, "Article must contain seven FAQ items");
assert.equal((article.match(/href:\s*["']https:\/\//g) ?? []).length, 7, "Article must contain seven external sources");
assert.match(article, /این نمونه برای نشان دادن روش برنامه‌ریزی است/, "The 45-minute example needs its safety framing");
assert.match(article, /جایگزین طراحی برنامه یا تصمیم‌گیری مربی نمی‌شود/, "BeatFit product limitation is missing");

for (const image of [
  "/beatfitImages/blog-heart-rate-zones.png",
  "/beatfitImages/blog-live-class.png",
  "/beatfitImages/blog-club-data-flow.png",
  "/beatfitImages/blog-workout-history.png",
  "/beatfitImages/blog-live-tv.png",
  "/beatfitImages/articles/مقایسه-سنسور-ضربان-قلب.png",
]) {
  assert.match(home, new RegExp(image.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `Existing Home image changed or disappeared: ${image}`);
}

assert.match(home, /id:\s*["']class-design["']/, "Seventh Home card is missing");
assert.match(home, /href:\s*["']\/blog\/طراحی-تمرین-گروهی["']/, "Seventh Home card link is missing");
assert.match(resources, /id:\s*["']coach-class-design["']/, "Resources coach card is missing");
assert.match(resources, /href:\s*["']\/blog\/طراحی-تمرین-گروهی["']/, "Resources coach card link is missing");

assert.ok(existsSync("public/beatfitImages/articles/طراحی-تمرین-گروهی.png"), "Hero asset is missing");
assert.ok(existsSync("public/assets/gym/eco-panel.png"), "Coach panel asset is missing");

console.log("Seventh Persian group-class-design article content contract passed.");
