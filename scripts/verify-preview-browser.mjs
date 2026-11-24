// CI-only Playwright smoke test against the built Vite preview.
// Uses actual JavaScript-enabled DOM and a separate JavaScript-disabled observation.
// It does not crawl production, deploy, or contact Google.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";

const require=createRequire(join(process.cwd(),"package.json"));
const { chromium }=require("playwright");
const kind=process.env.QA_KIND;
assert.ok(["gym","article-links"].includes(kind),"QA_KIND must be gym or article-links");
const base="http://127.0.0.1:4173";
const preview=spawn(process.execPath,["node_modules/vite/bin/vite.js","preview","--host","127.0.0.1","--port","4173","--strictPort"],{cwd:process.cwd(),stdio:["ignore","pipe","pipe"]});
let previewOutput="";
preview.stdout.on("data",d=>previewOutput+=d.toString());
preview.stderr.on("data",d=>previewOutput+=d.toString());
let browserInstance=null;
const decodeUrlPath=value=>decodeURIComponent(new URL(value,base).pathname);
async function open(page,pathname){
  const response=await page.goto(base+pathname,{waitUntil:"domcontentloaded",timeout:25000});
  assert.ok(response?.ok(),`Preview HTTP failed ${pathname}: ${response?.status()}`);
  await page.locator("h1").first().waitFor({state:"attached",timeout:20000});
}
try{
  let ready=false;
  for(let i=0;i<90;i++){
    if(preview.exitCode!==null)break;
    try {const r=await fetch(base+"/"); if(r.status===200){ready=true;break;}}catch{}
    await new Promise(resolve=>setTimeout(resolve,400));
  }
  assert.ok(ready,`Vite preview did not start: ${previewOutput.slice(-1000)}`);
  browserInstance=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const context=await browserInstance.newContext({locale:"fa-IR",viewport:{width:390,height:844}});
  const page=await context.newPage();
  const jsErrors=[];
  page.on("pageerror",error=>jsErrors.push(error.message));

  if(kind==="gym"){
    await open(page,"/gym");
    const expectedTitle="پایش زنده ضربان قلب در باشگاه‌ها | بیت‌فیت";
    const expectedH1="تجربه‌ای بسازید که اعضا ارزشش را در هر جلسه ببینند.";
    const expectedBody="با بیت‌فیت، ضربان قلب و شدت تمرین اعضای کلاس را با حسگرهای پوشیدنی به‌صورت زنده روی نمایشگر باشگاه و پنل مربی ببینید؛ نتیجه هر جلسه هم برای پیگیری بعدی ثبت می‌شود.";
    await page.locator("h1").first().waitFor({state:"attached",timeout:20000});
    assert.equal((await page.locator("h1").first().textContent())?.trim(),expectedH1);
    assert.equal(await page.title(),expectedTitle);
    assert.ok((await page.locator("body").textContent())?.includes(expectedBody),"Updated hero paragraph not in React DOM");
    const canonical=await page.locator('link[rel="canonical"]').first().getAttribute("href");
    assert.equal(decodeUrlPath(canonical),"/gym");
    assert.equal(await page.locator("#bf-static-seo").count(),0,"Temporary SEO shell must be removed after hydration");
    console.log("PASS browser /gym (390px): visible content in DOM, revised title, H1, canonical");
  }else{
    await open(page,"/resources");
    const catalogue=page.locator(".bf-resources-card__title a");
    await catalogue.first().waitFor({state:"attached",timeout:15000});
    const urls=await catalogue.evaluateAll(nodes=>nodes.map(n=>n.getAttribute("href")));
    const blogPaths=urls.map(decodeUrlPath).filter(path=>path.startsWith("/blog/"));
    assert.equal(new Set(blogPaths).size,7,"Seven unique article cards must be rendered on /resources");
    console.log("PASS browser /resources (390px): seven unique article card links");
    const expected={
      "/blog/workout-history-progress":["/blog/heart-rate-zones","/blog/training-load"],
      "/blog/connected-training-system":["/blog/heart-rate-sensor-comparison","/blog/live-class-monitoring"]
    };
    for(const [pathname,desired] of Object.entries(expected)){
      await open(page,pathname);
      const links=page.locator(".bf-blog-post__related-link");
      await links.first().waitFor({state:"attached",timeout:15000});
      const actual=(await links.evaluateAll(nodes=>nodes.map(n=>n.getAttribute("href")))).map(decodeUrlPath);
      assert.deepEqual(actual,desired,`Incorrect rendered related links for ${pathname}`);
      const canonical=await page.locator('link[rel="canonical"]').first().getAttribute("href");
      assert.equal(decodeUrlPath(canonical),pathname);
      assert.ok((await page.locator(".bf-blog-post__body").textContent())?.length>500,"Article body not rendered");
      assert.equal(await page.locator("#bf-static-seo").count(),0);
      console.log(`PASS browser article ${pathname}: two correct links, substantial article body, canonical`);
    }
  }
  assert.deepEqual(jsErrors,[],"JavaScript runtime errors during smoke test");
  await context.close();

  const noJs=await browserInstance.newContext({javaScriptEnabled:false,locale:"fa-IR",viewport:{width:390,height:844}});
  const noJsPage=await noJs.newPage();
  const noJsPath=kind==="gym"?"/gym":"/blog/workout-history-progress";
  await open(noJsPage,noJsPath);
  const main=await noJsPage.locator("#bf-static-seo").count();
  const articleCards=await noJsPage.locator(".bf-blog-post__related-link").count();
  const bodyBlocks=await noJsPage.locator(".bf-blog-post__body").count();
  assert.equal(main,1,"Expected initial SEO shell with JS disabled");
  console.log(`NO-JS observation ${noJsPath}: static shell=${main}; rendered article body=${bodyBlocks}; related links=${articleCards}`);
  // The lack of article content without JS is a known architecture risk, NOT
  // automatic proof of failed Google rendering or a blocker for copy-only PRs.
  await noJs.close();
  console.log(`PASS browser smoke for pinned ${kind} PR`);
}finally{
  if(browserInstance)await browserInstance.close();
  preview.kill("SIGTERM");
}