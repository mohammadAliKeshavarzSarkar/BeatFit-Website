// Additional post-update QA on merged website source, local Vite Preview only.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import {createRequire} from "node:module";
import {join} from "node:path";
const require=createRequire(join(process.cwd(),"package.json"));
const {chromium}=require("playwright");
const origin="http://127.0.0.1:4173";
const preview=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{stdio:["ignore","pipe","pipe"]});
let out="";preview.stdout.on("data",d=>out+=d.toString());preview.stderr.on("data",d=>out+=d.toString());
let b;
try {
 let ready=false;
 for(let i=0;i<90;i++){try{const r=await fetch(origin+"/");if(r.ok){ready=true;break}}catch{}await new Promise(resolve=>setTimeout(resolve,350));}
 assert.ok(ready,"Preview failed: "+out.slice(-400));
 b=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const c=await b.newContext({viewport:{width:390,height:844},locale:"fa-IR"});
 const p=await c.newPage();const errors=[];
 p.on("pageerror",err=>errors.push(err.message));
 const routes=["/","/gym","/coach","/athlete","/resources","/demo","/blog/کنترل-شدت-تمرین-در-کلاس-گروهی"];
 for(const route of routes){
   const r=await p.goto(origin+route,{waitUntil:"domcontentloaded",timeout:22000});
   assert.equal(r.status(),200,"Expected 200 for "+route);
   await p.locator("main h1").first().waitFor({state:"visible",timeout:18000});
   const can=await p.locator('link[rel="canonical"]').getAttribute("href");
   assert.equal(decodeURIComponent(new URL(can).pathname),route);
   assert.equal(await p.locator("#bf-static-seo").count(),0,"Hydration completed "+route);
 }
 const body=await p.locator("main").textContent();
 assert.ok(body.includes("کنترل شدت تمرین"),"Group intensity article rendered");
 const sources=p.locator('a[href="https://www.cdc.gov/physical-activity-basics/measuring/index.html"]');
 assert.equal(await sources.count(),1,"Corrected CDC source link should appear once");
 const old=p.locator('a[href="https://www.cdc.gov/physicalactivity/basics/measuring/index.html"]');
 assert.equal(await old.count(),0,"Legacy CDC link should be absent");
 await p.goto(origin+"/demo",{waitUntil:"domcontentloaded",timeout:22000});
 assert.equal(await p.locator("fieldset.bf-demo__disabled-fieldset").count(),1);
 assert.equal(await p.locator('form.bf-demo__form input, form.bf-demo__form select, form.bf-demo__form textarea').count(),6);
 assert.equal(await p.locator('form.bf-demo__form button').isDisabled(),true);
 const note=await p.locator("#demo-form-availability").textContent();
 assert.ok(note.includes("فعلاً فعال نیست"),"Demo form unavailable notice visible");
 assert.deepEqual(errors,[],"No JS errors in visited routes");
 console.log("PASS LATEST MERGED SOURCE: seven routes, correct canonicals and hydration, updated CDC citation, demo disabled, no JS errors");
 await c.close();
}finally{if(b)await b.close();preview.kill("SIGTERM");}
