// Public, read-only distributed GET probes of a public website. Check-Host is third-party and may be rate-limited.
// No user data, sign-ins, credentials or form submissions are involved.
const nodes=["ir1.node.check-host.net","ir2.node.check-host.net","ir6.node.check-host.net","ch1.node.check-host.net","us1.node.check-host.net"];
const calls=[["HTTPS_APEX","https://beatfit.ir/"],["HTTP_APEX","http://beatfit.ir/"]];
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
async function jsonGet(url){
 const controller=new AbortController();const time=setTimeout(()=>controller.abort(),14000);
 try{
  const response=await fetch(url,{headers:{"Accept":"application/json","User-Agent":"BeatFitSEOExternalAudit/1.0"},signal:controller.signal});
  const body=await response.text();
  try{return {status:response.status,json:JSON.parse(body)}}catch{return {status:response.status,body:body.slice(0,200)}}
 }finally{clearTimeout(time)}
}
for(const [id,host] of calls){
 const url="https://check-host.net/check-http?host="+encodeURIComponent(host)+nodes.map(n=>"&node="+encodeURIComponent(n)).join("");
 try{
  const created=await jsonGet(url);
  const data=created.json??{};
  console.log("BF_MULTI_INITIAL_JSON="+JSON.stringify({id,http_api_status:created.status,ok:data.ok??null,request_id:data.request_id??null,permanent_link:data.permanent_link??null,nodes:data.nodes??null,error:data.error??created.body??null}));
  if(!data.request_id)continue;
  let result=null;
  for(let attempt=1;attempt<=10;attempt++){
   await sleep(1500);
   const received=await jsonGet("https://check-host.net/check-result/"+encodeURIComponent(data.request_id));
   const arr=received.json??null;
   if(arr){result=arr;const ready=Object.values(arr).filter(v=>v!==null).length;
     if(ready>=Object.keys(data.nodes??{}).length)break;}
  }
  console.log("BF_MULTI_FINAL_JSON="+JSON.stringify({id,host,request_id:data.request_id,permanent_link:data.permanent_link,nodes:result,limits:"Third-party nodes, results vary by network/time; HTTP 200 implies accessibility only from named node."}));
 }catch(err){console.log("BF_MULTI_ERROR_JSON="+JSON.stringify({id,message:String(err.message??err).slice(0,250)}));}
}
