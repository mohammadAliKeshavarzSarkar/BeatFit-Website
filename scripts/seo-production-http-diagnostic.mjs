// Read-only public HTTP/TLS/SEO diagnostic for BeatFit. No deployment or account access.
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtempSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const execFileAsync=promisify(execFile);
const legacyPersian=encodeURIComponent("زون-های-ضربان-قلب");
const cases=[
 ["HTTP_APEX_HOME","http://beatfit.ir/"],["HTTPS_APEX_HOME","https://beatfit.ir/"],
 ["HTTP_WWW_HOME","http://www.beatfit.ir/"],["HTTPS_WWW_HOME","https://www.beatfit.ir/"],
 ["HTTP_ROBOTS","http://beatfit.ir/robots.txt"],["HTTPS_ROBOTS","https://beatfit.ir/robots.txt"],
 ["HTTP_SITEMAP","http://beatfit.ir/sitemap.xml"],["HTTPS_SITEMAP","https://beatfit.ir/sitemap.xml"],
 ["HTTP_GYM","http://beatfit.ir/gym"],["HTTPS_GYM","https://beatfit.ir/gym"],
 ["HTTP_ARTICLE","http://beatfit.ir/blog/heart-rate-zones"],["HTTPS_ARTICLE","https://beatfit.ir/blog/heart-rate-zones"],
 ["HTTP_LEGACY_PERSIAN","http://beatfit.ir/blog/"+legacyPersian],
 ["HTTP_NOT_FOUND","http://beatfit.ir/nonexistent-seo-audit-20261121"]
];
function attr(tag,name){return tag?.match(new RegExp("\\b"+name+"\\s*=\\s*[\"']([^\"']+)[\"']","i"))?.[1]??null;}
function tags(html,t){return [...html.matchAll(new RegExp("<"+t+"\\b[^>]*>","gi"))].map(m=>m[0]);}
function seo(html){
 const head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]??"";
 return {title:head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()?.slice(0,180)??null,
   canonical:tags(head,"link").filter(t=>attr(t,"rel")==="canonical").map(t=>attr(t,"href")).slice(0,3),
   og_urls:tags(head,"meta").filter(t=>attr(t,"property")==="og:url").map(t=>attr(t,"content")).slice(0,3),
   robots:tags(head,"meta").filter(t=>attr(t,"name")==="robots").map(t=>attr(t,"content")).slice(0,3),
   lang:attr(tags(html,"html")[0],"lang"),dir:attr(tags(html,"html")[0],"dir"),
   initial_h1_shell:/<main\b[^>]*id=["']bf-static-seo["']/i.test(html),
   initial_article_body:/class=["'][^"']*bf-blog-post__body/i.test(html)};
}
async function probe(id,url){
 const dir=mkdtempSync(join(tmpdir(),"bf-seo-http-"));
 const bodyFile=join(dir,"body"),headersFile=join(dir,"headers");
 let exit=0,err=null,data={};
 try{
  let stdout="";
  try{
   const args=["--silent","--show-error","--location","--max-redirs","5",
    "--proto-redir","=http,https","--connect-timeout","6","--max-time","16","--compressed",
    "--dump-header",headersFile,"--output",bodyFile,"--write-out","%{json}",
    "--user-agent","BeatFitSEOAudit/1.0 (public read-only validation)",url];
   const result=await execFileAsync("curl",args,{timeout:18500,maxBuffer:100000});
   stdout=result.stdout;
  }catch(e){
   exit=typeof e.code==="number"?e.code:1;
   stdout=e.stdout??"";
   err=String(e.stderr??e.message??"request failed").trim().slice(0,200);
  }
  try{data=JSON.parse(stdout.trim())}catch{}
  const body=existsSync(bodyFile)?readFileSync(bodyFile,"utf8"):"";
  const headers=existsSync(headersFile)?readFileSync(headersFile,"utf8"):"";
  const http_code=Number(data.http_code??0);
  const response={id,url,curl_exit:exit,http_code,
   effective_url:String(data.url_effective??url),redirect_count:Number(data.num_redirects??0),
   status_chain:[...headers.matchAll(/^HTTP\/[\d.]+\s+(\d{3})/gim)].map(m=>Number(m[1])),
   locations:[...headers.matchAll(/^location:\s*(.+)$/gim)].map(m=>m[1].trim()).slice(0,5),
   tls_verify_result:http_code?data.ssl_verify_result??null:null,
   error:err,response_bytes:body.length};
  if(http_code&&/\/robots\.txt$/.test(url)){
   response.robots_file={sitemaps:[...body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)].map(m=>m[1]).slice(0,5),
    disallow_route_html:/^\s*Disallow:\s*\/route-html\//mi.test(body)};
  }else if(http_code&&/\/sitemap\.xml$/.test(url)){
   const locs=[...body.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map(m=>m[1]);
   response.sitemap={urls:locs.length,first:locs.slice(0,2),
    http:locs.filter(x=>x.startsWith("http://")).length,https:locs.filter(x=>x.startsWith("https://")).length};
  }else if(http_code&&/<html\b/i.test(body)){response.seo=seo(body);}
  return response;
 }finally{rmSync(dir,{recursive:true,force:true});}
}
const results=[];
for(let i=0;i<cases.length;i+=3){
 const batch=await Promise.all(cases.slice(i,i+3).map(([id,url])=>probe(id,url).catch(e=>({id,url,diagnostic_error:String(e)}))));
 results.push(...batch);
}
const http_count=results.filter(x=>x.http_code>0).length;
console.log("BF_SEO_PROBE_JSON="+JSON.stringify({record:"BF-SEO-LIVE-PROBE-001",date:new Date().toISOString(),
 environment:"GitHub Actions Ubuntu 24.04 public curl GET",requests:cases.length,http_responses:http_count,
 caveat:"Network errors from one runner cannot establish global site downtime or Google indexability.",results}));
console.log("Probe completed; observed HTTP responses: "+http_count+"/"+cases.length+". Review response codes individually.");
