import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {join} from 'node:path';
const require=createRequire(join(process.cwd(),'package.json'));
const {chromium}=require('playwright');
const target='http://127.0.0.1:4173', articlePath='/blog/زون-های-ضربان-قلب';
const preview=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:['ignore','pipe','pipe']});
let output='';preview.stdout.on('data',x=>output+=x.toString());preview.stderr.on('data',x=>output+=x.toString());
let browser=null;
try {
 let ready=false;
 for(let n=0;n<90;n++){
  try { const res=await fetch(target+'/'); if(res.ok){ready=true;break;}}catch{}
  await new Promise(resolve=>setTimeout(resolve,350));
 }
 assert.ok(ready,'Vite Preview failed: '+output.slice(-600));
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const ctx=await browser.newContext({viewport:{width:390,height:844},locale:'fa-IR'});
 const page=await ctx.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(target+articlePath,{waitUntil:'domcontentloaded',timeout:25000});
 assert.ok(response?.ok(),'Article did not load');
 await page.locator('.bf-blog-block-cta a').first().waitFor({state:'attached',timeout:18000});
 const cta=page.locator('.bf-blog-block-cta a');
 assert.equal(await cta.count(),1,'Exactly one article-specific CTA expected');
 assert.equal(await cta.getAttribute('href'),'/athlete');
 assert.match((await cta.textContent())??'',/آشنایی با بیت‌فیت/);
 const separateDemo=page.locator('.bf-blog-post__foot-cta');
 assert.equal(await separateDemo.count(),1,'Separate footer demo link must remain');
 assert.equal(await separateDemo.getAttribute('href'),'/demo');
 const titleBefore=await page.title();
 const canonicalBefore=await page.locator('link[rel="canonical"]').getAttribute('href');
 assert.equal(decodeURIComponent(new URL(canonicalBefore).pathname),articlePath);
 await cta.click();
 await page.waitForURL('**/athlete',{timeout:20000});
 await page.locator('main h1').first().waitFor({state:'visible',timeout:18000});
 const heading=await page.locator('main h1').first().textContent();
 assert.match(heading??'',/از لحظه تمرین تا مسیر پیشرفت/);
 assert.equal(decodeURIComponent(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).pathname),'/athlete');
 assert.deepEqual(errors,[]);
 console.log('PASS CTA review: /blog/زون-های-ضربان-قلب CTA → /athlete clicked, H1/canonical correct, separate /demo footer preserved');
 console.log('Original article document title: '+titleBefore);
 await ctx.close();
}finally{
 if(browser)await browser.close();
 preview.kill('SIGTERM');
}
