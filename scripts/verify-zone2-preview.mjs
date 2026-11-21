// Review-only Chromium smoke for the exact Zone 2 content PR in Vite Preview.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";
const require=createRequire(join(process.cwd(),"package.json"));
const {chromium}=require("playwright");
const base="http://127.0.0.1:4173",path="/blog/heart-rate-zones";
const note="در این راهنما، «زون ۲» به بازه ۶۰ تا ۷۰ درصد HRmax در مدل پنج‌زونی اشاره دارد.";
const url="https://pubmed.ncbi.nlm.nih.gov/40225831/";
const preview=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{stdio:["ignore","pipe","pipe"]});
let output="";preview.stdout.on("data",d=>output+=d);preview.stderr.on("data",d=>output+=d);
let browserInstance=null;
try{
  let ready=false;
  for(let i=0;i<85;i++){
    try {const resp=await fetch(base+"/");if(resp.ok){ready=true;break}}catch{}
    await new Promise(r=>setTimeout(r,400));
  }
  assert.ok(ready,"Vite Preview not ready: "+output.slice(-700));
  browserInstance=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const context=await browserInstance.newContext({locale:"fa-IR",viewport:{width:390,height:844}});
  const page=await context.newPage();
  const runtimeErrors=[];page.on("pageerror",e=>runtimeErrors.push(e.message));
  const resp=await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:25000});
  assert.equal(resp.status(),200,"Article must return 200 under Vite Preview");
  await page.locator(".bf-blog-post__body").waitFor({state:"attached",timeout:20000});
  const content=await page.locator(".bf-blog-post__body").textContent();
  assert.ok(content.includes(note),"The Zone 2 explanatory note should be visible");
  assert.ok(content.includes("آستانه‌های تهویه‌ای یا لاکتات"),"Physiological threshold caveat missing");
  const faq=page.locator(".bf-blog-block-faq");
  assert.equal(await faq.locator("h3").count(),6,"Must retain six FAQ questions");
  const z2Faq=faq.locator("article").filter({hasText:"زون ۲ ضربان قلب چیست؟"});
  assert.equal(await z2Faq.count(),1);
  assert.ok((await z2Faq.textContent()).includes("آستانه‌های فیزیولوژیک"),"FAQ not aligned with note");
  const citation=page.locator('.bf-blog-block-sources a[href="'+url+'"]');
  assert.equal(await citation.count(),1,"New PubMed source link must render");
  const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
  assert.equal(decodeURIComponent(new URL(canonical).pathname),path);
  assert.equal(await page.locator("#bf-static-seo").count(),0);
  assert.deepEqual(runtimeErrors,[]);
  console.log("PASS Zone 2 mobile Chromium: explanatory note, six FAQs, PubMed reference, canonical, no runtime errors");
  await context.close();
}finally{
  if(browserInstance)await browserInstance.close();
  preview.kill("SIGTERM");
}
