import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {createRequire} from "node:module";
import {join} from "node:path";
const require=createRequire(join(process.cwd(),"package.json"));
const {chromium}=require("playwright");
const host="http://127.0.0.1:4173";
const expectedTitle="بیت‌فیت | سیستم پایش زنده ضربان قلب و تمرین گروهی";
const expectedDescription="بیت‌فیت سیستم پایش زنده ضربان قلب در تمرین‌های گروهی است؛ با حسگرهای پوشیدنی، نمایشگر کلاس، پنل مربی و تاریخچه جلسات، روند تمرین را بهتر دنبال کنید.";
const expectedGymTitle="پایش زنده ضربان قلب در باشگاه‌ها | بیت‌فیت";
const preview=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{stdio:["ignore","pipe","pipe"]});
let output="";preview.stdout.on("data",v=>output+=v.toString());preview.stderr.on("data",v=>output+=v.toString());
let browser;
try{
 let ready=false;
 for(let attempt=0;attempt<95;attempt++){
  try{const res=await fetch(host+"/");if(res.ok){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,350));
 }
 assert.ok(ready,"Vite Preview unavailable: "+output.slice(-450));
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const ctx=await browser.newContext({viewport:{width:390,height:844},locale:"fa-IR"});
 const page=await ctx.newPage(),errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 let r=await page.goto(host+"/",{waitUntil:"domcontentloaded",timeout:25000});
 assert.equal(r.status(),200);
 await page.locator("main h1").first().waitFor({state:"visible",timeout:19000});
 assert.equal(await page.title(),expectedTitle);
 assert.equal(await page.locator('meta[name="description"]').getAttribute("content"),expectedDescription);
 assert.equal(await page.locator('meta[property="og:title"]').getAttribute("content"),expectedTitle);
 assert.equal(await page.locator('meta[property="og:description"]').getAttribute("content"),expectedDescription);
 const h1=await page.locator("main h1").first().textContent();
 assert.equal(h1?.trim(),"با بیت فیت ضربان به ضربان، بدنت رو بساز.");
 assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute("href")).pathname,"/");
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://beatfit.ir/");
 console.log("PASS HOMEPAGE: new unique title and description, og tags, original H1, https canonical");
 r=await page.goto(host+"/gym",{waitUntil:"domcontentloaded",timeout:25000});
 assert.equal(r.status(),200);
 await page.locator("main h1").first().waitFor({state:"visible",timeout:19000});
 assert.equal(await page.title(),expectedGymTitle,"Gym title must not change");
 assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute("href")).pathname,"/gym");
 assert.deepEqual(errors,[],"No runtime errors in either route");
 console.log("PASS GYM NON-REGRESSION: original commercial SEO title and /gym canonical unchanged");
 await ctx.close();
}finally{if(browser)await browser.close();preview.kill("SIGTERM");}
