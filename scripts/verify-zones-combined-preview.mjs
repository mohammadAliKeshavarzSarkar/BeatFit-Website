import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";
const require=createRequire(join(process.cwd(),"package.json"));
const {chromium}=require("playwright");
const base="http://127.0.0.1:4173";
const article="/blog/زون-های-ضربان-قلب";
const p=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{stdio:["ignore","pipe","pipe"]});
let out="";p.stdout.on("data",x=>out+=x.toString());p.stderr.on("data",x=>out+=x.toString());
let browser;
try{
 let ready=false;
 for(let i=0;i<90;i++){
  try{const r=await fetch(base+"/");if(r.ok){ready=true;break}}catch{}
  await new Promise(r=>setTimeout(r,350));
 }
 assert.ok(ready,"Vite Preview unavailable: "+out.slice(-500));
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const ctx=await browser.newContext({viewport:{width:390,height:844},locale:"fa-IR"});
 const page=await ctx.newPage();const errors=[];page.on("pageerror",e=>errors.push(e.message));
 const response=await page.goto(base+article,{waitUntil:"domcontentloaded",timeout:25000});
 assert.equal(response.status(),200,"Vite Preview article response");
 await page.locator(".bf-blog-post__body").waitFor({state:"attached",timeout:20000});
 const body=await page.locator(".bf-blog-post__body").textContent();
 assert.ok(body.includes("در این راهنما، «زون ۲» به بازه ۶۰ تا ۷۰ درصد HRmax"));
 assert.ok(body.includes("آستانه‌های تهویه‌ای یا لاکتات"));
 assert.equal(await page.locator(".bf-blog-block-faq h3").count(),6);
 const faq=page.locator(".bf-blog-block-faq article").filter({hasText:"زون ۲ ضربان قلب چیست؟"});
 assert.equal(await faq.count(),1);
 assert.ok((await faq.textContent()).includes("آستانه‌های فیزیولوژیک"));
 assert.equal(await page.locator('.bf-blog-block-sources a[href="https://pubmed.ncbi.nlm.nih.gov/40225831/"]').count(),1);
 const cta=page.locator(".bf-blog-block-cta a");
 assert.equal(await cta.count(),1);
 assert.equal(await cta.getAttribute("href"),"/athlete");
 assert.equal(await page.locator(".bf-blog-post__foot-cta").getAttribute("href"),"/demo");
 assert.equal(decodeURIComponent(new URL(await page.locator('link[rel="canonical"]').getAttribute("href")).pathname),article);
 await cta.click();
 await page.waitForURL("**/athlete",{timeout:20000});
 await page.locator("main h1").first().waitFor({state:"visible",timeout:20000});
 assert.match((await page.locator("main h1").first().textContent())??"",/از لحظه تمرین تا مسیر پیشرفت/);
 assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute("href")).pathname,"/athlete");
 assert.deepEqual(errors,[]);
 console.log("PASS COMBINED ZONE2+CTA: new zone note + FAQ + PMID + athlete CTA click + separate demo footer, Chromium 390px, no runtime errors");
 await ctx.close();
}finally{if(browser)await browser.close();p.kill("SIGTERM")}
