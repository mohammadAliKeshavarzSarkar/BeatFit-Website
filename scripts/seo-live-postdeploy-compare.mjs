// Read-only, bounded external-network probe; never sends contact forms or writes to production.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const exe=promisify(execFile);
const zone=encodeURIComponent("زون-های-ضربان-قلب");
const urls=[
 ["HTTPS_HOME","https://beatfit.ir/"],
 ["HTTP_HOME","http://beatfit.ir/"],
 ["HTTPS_WWW","https://www.beatfit.ir/"],
 ["HTTPS_ROBOTS","https://beatfit.ir/robots.txt"],
 ["HTTPS_SITEMAP","https://beatfit.ir/sitemap.xml"],
 ["HTTPS_GYM","https://beatfit.ir/gym"],
 ["HTTPS_COACH","https://beatfit.ir/coach"],
 ["HTTPS_ATHLETE","https://beatfit.ir/athlete"],
 ["HTTPS_RESOURCES","https://beatfit.ir/resources"],
 ["HTTPS_DEMO","https://beatfit.ir/demo"],
 ["HTTPS_ZONES","https://beatfit.ir/blog/"+zone],
 ["HTTPS_ALIAS","https://beatfit.ir/blog/heart-rate-zones"],
 ["HTTPS_BAD","https://beatfit.ir/nonexistent-seo-postdeploy-20261121"]
];
const base="https://beatfit.ir";
function getAll(re,s){return [...s.matchAll(re)].map(x=>x[1]);}
function first(re,s){return s.match(re)?.[1]??null;}
async function one(id,url){
 let code=0,error=null,info={},text="";
 const args=["--silent","--show-error","--location","--max-redirs","5","--connect-timeout","4","--max-time","12","--compressed",
 "--user-agent","BeatFit SEO read-only post-deployment audit/1.1","--write-out","\nBF_CURL_METRICS=%{json}",url];
 try{
   const r=await exe("curl",args,{timeout:15000,maxBuffer:500000});
   text=r.stdout??"";
 }catch(e){code=Number.isInteger(e.code)?e.code:-1;error=String(e.stderr??e.message??"").slice(0,160);text=e.stdout??"";}
 const sep=text.lastIndexOf("\nBF_CURL_METRICS=");
 const body=sep>=0?text.slice(0,sep):text;
 if(sep>=0){try{info=JSON.parse(text.slice(sep+"\nBF_CURL_METRICS=".length))}catch{}}
 const status=Number(info.http_code??0);
 const result={id,url,curl_exit:code,http_code:status,redirect_count:Number(info.num_redirects??0),
 effective_url:String(info.url_effective??url),error,body_length:body.length,ssl_verify:info.ssl_verify_result??null};
 if(status && id==="HTTPS_ROBOTS"){
 result.robots={sitemap:getAll(/^\s*Sitemap:\s*(\S+)\s*$/gim,body),disallow_route_html:/^\s*Disallow:\s*\/route-html\//im.test(body)};
 }
 if(status && id==="HTTPS_SITEMAP"){
 const loc=getAll(/<loc>\s*([^<]+)\s*<\/loc>/gi,body);
 result.sitemap={urls:loc.length,https:loc.filter(x=>x.startsWith("https://")).length,http:loc.filter(x=>x.startsWith("http://")).length,all_beatfit:loc.every(x=>x.startsWith(base+"/")||x===base),sample:loc.slice(0,4)};
 }
 if(status && /<html\b/i.test(body)){
 const head=first(/<head\b[^>]*>([\s\S]*?)<\/head>/i,body)??"";
 result.seo={title:first(/<title\b[^>]*>([\s\S]*?)<\/title>/i,head),
 canonical:getAll(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)/gi,head),
 robots:getAll(/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["']([^"']+)/gi,head),
 lang:first(/<html\b[^>]*\blang=["']([^"']+)/i,body),
 dir:first(/<html\b[^>]*\bdir=["']([^"']+)/i,body),
 staticShell:body.includes('id="bf-static-seo"'),
 zone2Note:body.includes("در این راهنما، «زون ۲»"),
 disabledFormMarkup:body.includes("demo-form-availability")&&body.includes("bf-demo__disabled-fieldset")};
 }
 return result;
}
const results=[];
for(let i=0;i<urls.length;i+=4){
 const group=await Promise.all(urls.slice(i,i+4).map(([id,url])=>one(id,url).catch(e=>({id,url,error:String(e).slice(0,200)}))));
 results.push(...group);
}
console.log("BEATFIT_POSTDEPLOY_JSON="+JSON.stringify({date:new Date().toISOString(),source:"GitHub Actions external runner GET only",
 source_revision:"PINNED_AT_WORKFLOW_CHECKOUT",requests:results.length,http_responses:results.filter(x=>x.http_code>0).length,results,
 important:"A successful audit job means the script finished, not that the site is available. No backend or form POST was performed."}));
