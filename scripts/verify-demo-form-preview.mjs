// Runs only against local Vite Preview with synthetic fields. No real contact details or leads.
import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {createRequire} from "node:module";
import {join} from "node:path";
const require=createRequire(join(process.cwd(),"package.json"));
const {chromium}=require("playwright");
const host="http://127.0.0.1:4173";
const preview=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{stdio:["ignore","pipe","pipe"]});
let captured="";preview.stdout.on("data",buf=>captured+=buf.toString());preview.stderr.on("data",buf=>captured+=buf.toString());
let browser;
try{
 let ready=false;
 for(let i=0;i<100;i++){
  try{const r=await fetch(host+"/");if(r.status===200){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,300));
 }
 assert.ok(ready,"preview failed: "+captured.slice(-500));
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},locale:"fa-IR"});
 const page=await context.newPage();
 const errors=[],outbound=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",request=>{if(request.method()!=="GET")outbound.push({method:request.method(),url:request.url()});});
 const r=await page.goto(host+"/demo",{waitUntil:"domcontentloaded",timeout:25000});
 assert.equal(r.status(),200,"GET /demo Vite Preview");
 const form=page.locator("form.bf-demo__form");
 await form.waitFor({state:"visible",timeout:18000});
 assert.equal(await form.locator("input,select,textarea").count(),6,"All original six fields remain");
 assert.equal(await form.locator("[required]").count(),3,"Three essential fields required");
 const submit=form.locator('button[type="submit"]');
 assert.equal(await submit.count(),1,"Submit CTA exists");
 assert.equal(await form.locator('[role="alert"]').count(),0,"No false status before an attempt");
 const initialValidity=await form.evaluate(node=>node.checkValidity());
 assert.equal(initialValidity,false,"Empty form must be invalid");
 await submit.click();
 assert.equal(await form.locator('[role="alert"]').count(),0,"Browser should block invalid submit");
 assert.equal(await form.evaluate(node=>node.checkValidity()),false,"Empty form stays invalid");
 await form.locator('input[name="fullName"]').fill("QA Visitor");
 await form.locator('input[name="gymName"]').fill("QA Test Gym");
 await form.locator('input[name="phone"]').fill("0000000000");
 assert.equal(await form.evaluate(node=>node.checkValidity()),true,"Valid essential test inputs expected");
 await submit.click();
 const alert=form.locator('[role="alert"]');
 await alert.waitFor({state:"visible",timeout:12000});
 const status=(await alert.textContent())?.trim()??"";
 assert.ok(status.includes("اطلاعات فرم ارسال نشده‌اند"),"No-submission warning must be explicit");
 assert.equal(outbound.length,0,"No POST or other non-GET network requests allowed");
 assert.equal(await form.locator('input[name="fullName"]').inputValue(),"QA Visitor");
 assert.equal(decodeURIComponent(new URL(await page.locator('link[rel="canonical"]').getAttribute("href")).pathname),"/demo");
 assert.deepEqual(errors,[],"No runtime errors");
 console.log("PASS demo form QA: six fields, three required, invalid native block, honest alert, zero non-GET requests, /demo canonical, mobile 390px");
 await context.close();
} finally{
 if(browser)await browser.close();
 preview.kill("SIGTERM");
}
