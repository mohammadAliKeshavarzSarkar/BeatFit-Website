// BeatFit bounded read-only HTTPS/HTTP diagnostic, run from GitHub Actions.
// Never submit forms, accept TLS validation bypass as healthy, or log environment secrets.
import dns from "node:dns/promises";
import {spawn} from "node:child_process";
const host="beatfit.ir",maxMs=10500;
function run(label,bin,args){
 return new Promise(resolve=>{
  const child=spawn(bin,args,{stdio:["ignore","pipe","pipe"]});
  let stdout="",stderr="",done=false;
  const timer=setTimeout(()=>child.kill("SIGKILL"),maxMs);
  for(const [name,stream] of [["stdout",child.stdout],["stderr",child.stderr]]){
   stream.on("data",chunk=>{
    if(name==="stdout")stdout=(stdout+chunk.toString()).slice(-4800);
    else stderr=(stderr+chunk.toString()).slice(-4800);
   });
  }
  child.on("error",err=>{if(done)return;done=true;clearTimeout(timer);resolve({label,error:String(err.message??err).slice(0,250)})});
  child.on("close",(code,signal)=>{
    if(done)return;done=true;clearTimeout(timer);
    const parsed=stdout.includes("BF_METRIC=")?stdout.slice(stdout.lastIndexOf("BF_METRIC=")+10).trim():null;
    let metrics=null;try{metrics=JSON.parse(parsed)}catch{}
    resolve({label,exit:code,signal,metrics,
      stderr:stderr.replace(/^\s+/,"").slice(-1100),
      tls_output:bin==="openssl"?(stdout+"\n"+stderr).slice(-1000):undefined});
  });
 });
}
let ips=[];try{ips=await dns.resolve4(host)}catch(e){console.log("BF_TRANSPORT_DNS="+JSON.stringify({host,error:e.code??String(e)}));}
console.log("BF_TRANSPORT_DNS="+JSON.stringify({host,ipv4:ips,proxy_environment_present:{
 HTTPS_PROXY:!!process.env.HTTPS_PROXY,HTTP_PROXY:!!process.env.HTTP_PROXY,ALL_PROXY:!!process.env.ALL_PROXY,NO_PROXY:!!process.env.NO_PROXY
}}));
const ip=ips[0];
const cbase=["--silent","--show-error","--no-progress-meter","--ipv4","--noproxy","*",
 "--connect-timeout","5","--max-time","8","--max-redirs","0","--output","/dev/null",
 "--write-out","BF_METRIC=%{json}"];
const probes=[
 ["HTTP_GET", "curl", [...cbase,"http://"+host+"/"]],
 ["HTTP_HEAD", "curl", [...cbase,"--head","http://"+host+"/"]],
 ["HTTPS_GET", "curl", [...cbase,"https://"+host+"/"]],
 ["HTTPS_GET_HTTP1", "curl", [...cbase,"--http1.1","https://"+host+"/"]],
 ["HTTPS_HEAD", "curl", [...cbase,"--head","https://"+host+"/"]],
 ["TLS12_SNI","openssl",["s_client","-connect",host+":443","-servername",host,"-tls1_2","-brief","-verify_return_error"]],
 ["TLS13_SNI","openssl",["s_client","-connect",host+":443","-servername",host,"-tls1_3","-brief","-verify_return_error"]],
 ["TLS_DEFAULT_NO_SNI","openssl",["s_client","-connect",host+":443","-noservername","-brief","-verify_return_error"]]
];
if(ip){
 probes.push(["HTTPS_FIXED_IP_SNI","curl",[...cbase,"--resolve",host+":443:"+ip,"https://"+host+"/"]]);
 probes.push(["HTTP_FIXED_IP_HOST","curl",[...cbase,"--resolve",host+":80:"+ip,"http://"+host+"/"]]);
 probes.push(["IP_DIRECT_TLS_DIAGNOSTIC_UNVERIFIED","curl",[...cbase,"--insecure","https://"+ip+"/"]]);
}
for(let i=0;i<probes.length;i+=3){
 const data=await Promise.all(probes.slice(i,i+3).map(([name,bin,args])=>run(name,bin,args)));
 for(const row of data){
  const m=row.metrics??{};
  const concise={label:row.label,exit:row.exit,signal:row.signal,error:row.error??null,
   http_code:typeof m.http_code==="number"?m.http_code:null,
   ssl_verify_result:m.ssl_verify_result??null,remote_ip:m.remote_ip??null,
   connect_s:m.time_connect??null,appconnect_s:m.time_appconnect??null,total_s:m.time_total??null,
   redirects:m.num_redirects??null,stderr:row.stderr??null,
   tls_output:row.tls_output??null};
  console.log("BF_TRANSPORT_RESULT="+JSON.stringify(concise));
 }
}
console.log("BF_TRANSPORT_FINISH="+JSON.stringify({date:new Date().toISOString(),host,probes:probes.length,
 statement:"A successful workflow means probes finished. No target HTTP success is inferred. -k was used ONLY for a clearly labeled IP-only diagnosis; never treat that as trusted TLS."}));
