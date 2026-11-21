// Browser smoke for a pinned merged main revision; synthetic, read-only and local Vite Preview only.
import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {createRequire} from "node:module";
import {join} from "node:path";
const require=createRequire(join(process.cwd(),"package.json"));
const {chromium}=require("playwright");
const host="http://127.0.0.1:4173",article="/blog/زون-های-ضربان-قلب";
const server=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{stdio:["ignore","pipe","pipe"]});
let output="";server.stdout.on("data",b=>output+=b.toString());server.stderr.on("data",b=>output+=b.toString());
let browser;
try{
 let ready=false;
 for(let i=0;i<100;i++){
  try{const r=await fetch(host+"/");if(r.ok){ready=true;break}}catch{}
  await new Promise(r=>setTimeout(r,350));
 }
 assert.ok(ready,"Vite Preview did not start: "+output.slice(-500));
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const ctx=await browser.newContext({viewport:{width:390,height:844},locale:"fa-IR"});
 const page=await ctx.newPage();const errors=[],nonGet=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",r=>{if(r.method()!=="GET")nonGet.push({method:r.method(),url:r.url()});});
 const a=await page.goto(host+article,{waitUntil:"domcontentloaded",timeout:25000});
 assert.equal(a.status(),200);
 await page.locator(".bf-blog-post__body").waitFor({state:"visible",timeout:19000});
 const text=await page.locator(".bf-blog-post__body").textContent();
 assert.ok(text.includes("در این راهنما، «زون ۲» به بازه ۶۰ تا ۷۰ درصد HRmax"));
 assert.ok(text.includes("آستانه‌های تهویه‌ای یا لاکتات"));
 assert.equal(await page.locator(".bf-blog-block-faq h3").count(),6);
 const q=page.locator(".bf-blog-block-faq article").filter({hasText:"زون ۲ ضربان قلب چیست؟"});
 assert.equal(await q.count(),1);
 assert.ok((await q.textContent()).includes("آستانه‌های فیزیولوژیک"));
 assert.equal(await page.locator('.bf-blog-block-sources a[href="https://pubmed.ncbi.nlm.nih.gov/40225831/"]').count(),1);
 const articleCanonical=await page.locator('link[rel="canonical"]').getAttribute("href");
 assert.equal(decodeURIComponent(new URL(articleCanonical).pathname),article);
 const cta=page.locator(".bf-blog-block-cta a");
 assert.equal(await cta.count(),1);
 assert.equal(await cta.getAttribute("href"),"/athlete");
 assert.equal(await page.locator(".bf-blog-post__foot-cta").getAttribute("href"),"/demo");
 await cta.click();
 await page.waitForURL("**/athlete",{timeout:16000});
 await page.locator("main h1").first().waitFor({state:"visible",timeout:15000});
 assert.match(await page.locator("main h1").first().textContent(),/از لحظه تمرین تا مسیر پیشرفت/);
 assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute("href")).pathname,"/athlete");
 console.log("PASS MERGED MAIN ZONES: Zone 2 note, six FAQs, new source, athlete CTA click and common demo footer");
 const demo=await page.goto(host+"/demo",{waitUntil:"domcontentloaded",timeout:25000});
 assert.equal(demo.status(),200);
 const form=page.locator("form.bf-demo__form");
 await form.waitFor({state:"visible",timeout:19000});
 const notice=page.locator("#demo-form-availability");
 await notice.waitFor({state:"visible"});
 assert.equal(await notice.getAttribute("role"),"status");
 assert.ok((await notice.textContent()).includes("ثبت آنلاین درخواست دمو فعلاً فعال نیست"));
 assert.equal(await form.getAttribute("aria-describedby"),"demo-form-availability");
 assert.equal(await page.getByText("اطلاعات باشگاه خود را ثبت کنید تا برای هماهنگی با شما تماس بگیریم.").count(),0);
 assert.ok((await notice.evaluate(n=>n.getBoundingClientRect().bottom))<=(await form.locator('input[name="fullName"]').evaluate(n=>n.getBoundingClientRect().top)));
 assert.equal(await form.locator("input,select,textarea").count(),6);
 assert.equal(await form.locator("[required]").count(),3);
 const fields=form.locator("input,select,textarea,button");
 assert.equal(await fields.count(),7);
 for(let i=0;i<7;i++)assert.equal(await fields.nth(i).isDisabled(),true,"Control "+i+" should be disabled");
 let blocked=false;try{await form.locator('input[name="fullName"]').fill("QA",{timeout:700})}catch{blocked=true;}
 assert.ok(blocked,"Data entry must be blocked");
 assert.equal(await form.locator('input[name="fullName"]').inputValue(),"");
 assert.equal(nonGet.length,0,"No non-GET request should be issued");
 assert.equal(decodeURIComponent(new URL(await page.locator('link[rel="canonical"]').getAttribute("href")).pathname),"/demo");
 assert.deepEqual(errors,[]);
 console.log("PASS MERGED MAIN DEMO: warning before disabled six fields, no misleading promise, no data entry, zero non-GET requests, canonical, 390px Chromium");
 await ctx.close();
}finally{if(browser)await browser.close();server.kill("SIGTERM")}
