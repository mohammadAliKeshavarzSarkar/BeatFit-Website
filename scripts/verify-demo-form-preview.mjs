// Read-only 390px Vite Preview QA of the proposed pre-entry unavailable form state.
import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {createRequire} from "node:module";
import {join} from "node:path";
const require=createRequire(join(process.cwd(),"package.json"));
const {chromium}=require("playwright");
const host="http://127.0.0.1:4173";
const preview=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{stdio:["ignore","pipe","pipe"]});
let output="";preview.stdout.on("data",d=>output+=d.toString());preview.stderr.on("data",d=>output+=d.toString());
let browser;
try {
 let ready=false;
 for(let i=0;i<100;i++){
  try{const r=await fetch(host+"/");if(r.status===200){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,300));
 }
 assert.ok(ready,"Vite Preview unavailable: "+output.slice(-500));
 browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},locale:"fa-IR"});
 const page=await context.newPage();
 const errors=[],nonGet=[];
 page.on("pageerror",e=>errors.push(e.message));
 page.on("request",req=>{if(req.method()!=="GET")nonGet.push({method:req.method(),url:req.url()});});
 const response=await page.goto(host+"/demo",{waitUntil:"domcontentloaded",timeout:25000});
 assert.equal(response.status(),200);
 const form=page.locator("form.bf-demo__form");
 await form.waitFor({state:"visible",timeout:18000});
 const note=page.locator("#demo-form-availability");
 await note.waitFor({state:"visible"});
 assert.equal(await note.getAttribute("role"),"status");
 assert.ok((await note.textContent()).includes("ثبت آنلاین درخواست دمو فعلاً فعال نیست"));
 assert.ok((await note.textContent()).includes("اطلاعات تماس خود را در این فرم وارد نکنید"));
 assert.equal(await form.getAttribute("aria-describedby"),"demo-form-availability");
 const noteBottom=await note.evaluate(el=>el.getBoundingClientRect().bottom);
 const firstTop=await form.locator('input[name="fullName"]').evaluate(el=>el.getBoundingClientRect().top);
 assert.ok(noteBottom<=firstTop,"The warning must be before the first input");
 const fields=form.locator("input,select,textarea");
 assert.equal(await fields.count(),6,"Retain the six original fields");
 assert.equal(await form.locator("[required]").count(),3,"Retain three essential required attributes");
 const set=form.locator("fieldset.bf-demo__disabled-fieldset");
 assert.equal(await set.count(),1);
 assert.equal(await set.getAttribute("disabled"),"","Native fieldset must be disabled");
 for(const name of ["fullName","gymName","phone","city","gymType","notes"]){
  const input=form.locator('[name="'+name+'"]');
  assert.equal(await input.isDisabled(),true,name+" must be disabled by fieldset");
 }
 const button=form.locator('button[type="submit"]');
 assert.equal(await button.count(),1);
 assert.equal(await button.isDisabled(),true,"CTA must be non-interactive");
 assert.equal(await form.locator('[role="alert"]').count(),0,"No after-submit status is necessary");
 let fillFailed=false;
 try{await form.locator('input[name="fullName"]').fill("QA Visitor",{timeout:700});}catch{fillFailed=true;}
 assert.ok(fillFailed,"Browser must prevent entry in unavailable form");
 assert.equal(await form.locator('input[name="fullName"]').inputValue(),"");
 assert.equal(nonGet.length,0,"No attempted POST, fetch/beacon or other non-GET requests");
 const canonical=await page.locator('link[rel="canonical"]').getAttribute("href");
 assert.equal(decodeURIComponent(new URL(canonical).pathname),"/demo");
 assert.deepEqual(errors,[],"No JavaScript page errors");
 console.log("PASS demo pre-entry unavailable QA: 390px notice before fields, six controls disabled, three required attrs, submit disabled, no PII entry, zero non-GET requests, /demo canonical");
 await context.close();
} finally{
 if(browser)await browser.close();
 preview.kill("SIGTERM");
}
