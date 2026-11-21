// Fixed, read-only network diagnostic. No HTTP crawl, forms, or deployment.
import dns from "node:dns/promises";
import net from "node:net";
import tls from "node:tls";
async function resolve(kind,host){
 try{
  const data=kind==="A"?await dns.resolve4(host):kind==="AAAA"?await dns.resolve6(host):await dns.resolveCname(host);
  return {kind,host,ok:true,values:data};
 }catch(e){return{kind,host,ok:false,code:e.code??null,message:String(e.message??e).slice(0,120)};}
}
function tcp(host,port){
 return new Promise(resolve=>{
  const socket=net.createConnection({host,port});
  const finish=(obj)=>{socket.removeAllListeners();socket.destroy();resolve({host,port,...obj});};
  socket.setTimeout(5000,()=>finish({connected:false,error:"TIMEOUT"}));
  socket.once("connect",()=>finish({connected:true}));
  socket.once("error",e=>finish({connected:false,error:e.code??String(e).slice(0,100)}));
 });
}
function handshake(host){
 return new Promise(resolve=>{
  const s=tls.connect({host,port:443,servername:host,rejectUnauthorized:true});
  const finish=obj=>{s.removeAllListeners();s.destroy();resolve({host,port:443,...obj});};
  s.setTimeout(6000,()=>finish({tls_connected:false,error:"TIMEOUT"}));
  s.once("secureConnect",()=>finish({tls_connected:true,authorized:s.authorized,protocol:s.getProtocol(),certificate_expiry:s.getPeerCertificate()?.valid_to??null}));
  s.once("error",e=>finish({tls_connected:false,error:e.code??String(e.message??e).slice(0,180)}));
 });
}
const hosts=["beatfit.ir","www.beatfit.ir"];
const dnsResults=await Promise.all(hosts.flatMap(h=>["A","AAAA","CNAME"].map(k=>resolve(k,h))));
const network=await Promise.all([tcp("beatfit.ir",80),tcp("beatfit.ir",443),tcp("www.beatfit.ir",80)]);
const tlsResult=await handshake("beatfit.ir");
console.log("BF_SEO_NETWORK_JSON="+JSON.stringify({record:"BF-SEO-NETWORK-001",timestamp:new Date().toISOString(),environment:"GitHub Actions ubuntu-24.04",dns:dnsResults,tcp:network,tls:tlsResult,notice:"Runner-specific observations; not universal public availability or search indexing."}));
