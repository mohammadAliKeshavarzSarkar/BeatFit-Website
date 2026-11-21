// CI-only, read-only source and generated build snapshot checks.
// This tool lives in a QA branch; it does not modify the production application.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const kind=process.env.QA_KIND;
const root=process.cwd();
const read=p=>readFileSync(resolve(root,p),"utf8");
function count(s,v){return s.split(v).length-1;}
assert.ok(["gym","article-links"].includes(kind), "QA_KIND must be gym or article-links");

if(kind==="gym"){
  const gym=read("src/content/gym.ts");
  const meta=read("src/seo/marketing.ts");
  const html=read("dist/route-html/gym.html");
  const title="پایش زنده ضربان قلب در باشگاه‌ها | بیت‌فیت";
  const h1="تجربه‌ای بسازید که اعضا ارزشش را در هر جلسه ببینند.";
  const body="با بیت‌فیت، ضربان قلب و شدت تمرین اعضای کلاس را با حسگرهای پوشیدنی به‌صورت زنده روی نمایشگر باشگاه و پنل مربی ببینید؛ نتیجه هر جلسه هم برای پیگیری بعدی ثبت می‌شود.";
  assert.equal(count(gym,body),1,"Exactly one new gym description in source");
  assert.equal(count(meta,title),1,"Exactly one new title in SEO metadata");
  assert.ok(gym.includes(h1),"Original H1 retained");
  assert.ok(meta.includes("description: gymHero.body"),"Meta description uses hero copy");
  assert.ok(meta.includes("summary: gymHero.body"),"Static summary uses hero copy");
  assert.ok(html.includes(`<title>${title}</title>`),"Built SEO title must reflect PR #1");
  assert.ok(html.includes(body),"Generated gym HTML must contain proposed description");
  assert.ok(html.includes(`<h1>${h1}</h1>`),"SEO shell H1 unchanged");
  console.log("PASS gym copy: source, H1, SEO title, generated HTML summary");
}else{
  const files={
    "زون-های-ضربان-قلب":"heartRateZones",
    "کنترل-شدت-تمرین-در-کلاس-گروهی":"groupClassIntensity",
    "پایش-ضربان-قلب-در-باشگاه":"gymHeartRateMonitoring",
    "تاریخچه-تمرین":"trainingHistory",
    "بار-تمرینی-چیست":"trainingLoad",
    "مقایسه-سنسور-ضربان-قلب":"heartRateSensorComparison",
    "طراحی-تمرین-گروهی":"groupClassDesign"
  };
  const valid=new Set(Object.keys(files));
  const inbound=Object.fromEntries([...valid].map(k=>[k,0]));
  const lists={};
  for(const [slug,filename] of Object.entries(files)){
    const content=read(`src/content/blog/${filename}.ts`);
    const match=content.match(/relatedSlugs:\s*\[([^\]]*)\]/);
    assert.ok(match,`No related slugs: ${slug}`);
    const related=[...match[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]);
    assert.equal(related.length,2,`Exactly two related destinations: ${slug}`);
    for(const target of related){
      assert.ok(valid.has(target),`Related slug not in published inventory: ${target}`);
      assert.notEqual(slug,target,"Do not link article to itself");
      inbound[target]++;
    }
    lists[slug]=related;
  }
  assert.deepEqual(lists["تاریخچه-تمرین"],["زون-های-ضربان-قلب","بار-تمرینی-چیست"]);
  assert.deepEqual(lists["پایش-ضربان-قلب-در-باشگاه"],["مقایسه-سنسور-ضربان-قلب","کنترل-شدت-تمرین-در-کلاس-گروهی"]);
  assert.ok(Object.values(inbound).every(value=>value>=1),"All seven articles get at least one related-card inbound reference");
  console.log("PASS related articles: 14 valid edges; incoming related-card coverage",JSON.stringify(inbound));
}