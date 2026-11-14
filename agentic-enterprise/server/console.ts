/**
 * وحدة تحكم ويب خفيفة تُقدَّم من /console. ملف واحد بلا اعتماديات خارجية.
 * - الرمز يُدخل يدويًا ويبقى في الذاكرة فقط (لا localStorage)، فيزول بإغلاق الصفحة.
 * - الموافقة: المفتاح الخاص يُقرأ من ملف محلي ويوقّع داخل المتصفح (WebCrypto Ed25519)؛ لا يغادر الجهاز.
 *   الرسالة الموقعة مطابقة لـ decisionMessage في الخادم (JSON قانوني بمفاتيح مرتبة).
 * - كل بيانات الخادم تُعرض عبر textContent فقط، لأن ملخصات الموافقات قد تحمل نصًا من مصادر خارجية (فواتير وبريد).
 */
export const CONSOLE_HTML = `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Agentic Enterprise Console</title>
<style>
:root{--bg:#f7f7f5;--fg:#1b1b1b;--muted:#666;--card:#fff;--line:#ddd;--accent:#0b5cad;--bad:#b42318;--ok:#067647}
@media (prefers-color-scheme: dark){:root{--bg:#121212;--fg:#eee;--muted:#aaa;--card:#1d1d1d;--line:#333;--accent:#6aa9ff;--bad:#ff7b72;--ok:#56d364}}
*{box-sizing:border-box}body{margin:0;font:14px/1.45 system-ui,sans-serif;background:var(--bg);color:var(--fg)}
header{padding:12px 16px;border-bottom:1px solid var(--line);display:flex;gap:8px;flex-wrap:wrap;align-items:center}
header h1{font-size:16px;margin:0 12px 0 0}
input,select,button{font:inherit;padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--fg)}
button{cursor:pointer}button.primary{background:var(--accent);color:#fff;border-color:var(--accent)}
nav{display:flex;gap:4px;padding:8px 16px;flex-wrap:wrap}nav button[aria-selected=true]{border-color:var(--accent);color:var(--accent)}
main{padding:0 16px 32px;max-width:1100px}
.card{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:12px;margin:8px 0;overflow-wrap:anywhere}
.muted{color:var(--muted)}.bad{color:var(--bad)}.ok{color:var(--ok)}
table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid var(--line);padding:6px;text-align:left;vertical-align:top}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:8px}
#status{min-height:1.5em}
</style>
</head>
<body>
<header>
  <h1>Agentic Enterprise</h1>
  <input id="token" type="password" placeholder="API token (kept in memory only)" autocomplete="off" size="40">
  <button id="connect" class="primary">Connect</button>
  <span id="status" class="muted"></span>
</header>
<nav id="tabs"></nav>
<main id="view"><p class="muted">Enter an API token to begin.</p></main>
<script>
"use strict";
const TABS=[["approvals","Pending approvals"],["tasks","Tasks"],["escalations","Escalations"],["metrics","Metrics"]];
let token="",tab="approvals",keyPem=null;
const $=(id)=>document.getElementById(id);
function el(tag,attrs,...kids){const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs||{})){if(k==="class")e.className=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else e.setAttribute(k,v)}for(const c of kids)if(c!=null)e.append(c instanceof Node?c:document.createTextNode(String(c)));return e}
function status(msg,cls){const s=$("status");s.textContent=msg;s.className=cls||"muted"}
async function api(path,opts){const r=await fetch(path,{...opts,headers:{"authorization":"Bearer "+token,"content-type":"application/json"}});const b=await r.json().catch(()=>({}));if(!r.ok)throw new Error((b.error&&b.error.code)+": "+(b.error&&b.error.message));return b}
function canonical(v){if(v===null||typeof v!=="object")return JSON.stringify(v===undefined?null:v);if(Array.isArray(v))return"["+v.map(canonical).join(",")+"]";return"{"+Object.keys(v).filter(k=>v[k]!==undefined).sort().map(k=>JSON.stringify(k)+":"+canonical(v[k])).join(",")+"}"}
function pemToDer(pem){const b=atob(pem.replace(/-----[^-]+-----/g,"").replace(/\\s+/g,""));const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer}
async function signDecision(d){if(!keyPem)throw new Error("Choose your private key file first");const key=await crypto.subtle.importKey("pkcs8",pemToDer(keyPem),{name:"Ed25519"},false,["sign"]);const msg=new TextEncoder().encode(canonical({purpose:"approval-decision/v1",...d}));const sig=new Uint8Array(await crypto.subtle.sign({name:"Ed25519"},key,msg));let s="";for(const x of sig)s+=String.fromCharCode(x);return{...d,signature:btoa(s)}}
function renderTabs(){const n=$("tabs");n.replaceChildren(...TABS.map(([id,label])=>el("button",{"aria-selected":String(tab===id),onclick:()=>{tab=id;load()}},label)))}
async function load(){renderTabs();const v=$("view");if(!token){return}v.replaceChildren(el("p",{class:"muted"},"Loading…"));try{const fn={approvals:viewApprovals,tasks:viewTasks,escalations:viewEscalations,metrics:viewMetrics}[tab];v.replaceChildren(...await fn());status("Connected","ok")}catch(e){v.replaceChildren(el("p",{class:"bad"},e.message));status("Error","bad")}}
async function viewApprovals(){const list=await api("/v1/approvals?status=pending");const keyRow=el("div",{class:"card"},el("strong",{},"Signing key: "),el("input",{type:"file",accept:".pem",onchange:async(ev)=>{keyPem=await ev.target.files[0].text();status("Key loaded locally (not uploaded)","ok")}}),el("div",{class:"muted"},"Your Ed25519 private key is read and used in this browser only."));if(!list.length)return[keyRow,el("p",{class:"muted"},"No pending approvals.")];return[keyRow,...list.map(a=>{const human=el("input",{placeholder:"your human id (e.g. u-cfo)",size:"24"});const comment=el("input",{placeholder:"comment (required to reject)",size:"40"});const act=(decision)=>async()=>{try{const d={approvalId:a.id,humanId:human.value.trim(),decision,payloadHash:a.payloadHash,comment:comment.value,issuedAt:new Date().toISOString()};const proof=await signDecision(d);const r=await api("/v1/approvals/"+encodeURIComponent(a.id)+"/decision",{method:"POST",body:JSON.stringify({humanId:d.humanId,decision,comment:d.comment,proof})});await load();status("Decision recorded: "+r.approval.status,"ok")}catch(e){status(e.message,"bad")}};return el("div",{class:"card"},el("div",{},el("strong",{},a.toolName)," · ",a.actionType," · ",el("span",{class:"muted"},a.id)),el("p",{},a.summary),el("div",{class:"muted"},"Requires "+a.requiredApprovals+" approval(s); decisions so far: "+a.decisions.length+"; expires "+a.expiresAt),el("div",{class:"muted"},"Payload hash: "+a.payloadHash),el("div",{class:"row"},human,comment,el("button",{class:"primary",onclick:act("approve")},"Approve (sign)"),el("button",{onclick:act("reject")},"Reject (sign)")))})]}
async function viewTasks(){const list=await api("/v1/tasks");return[el("table",{},el("thead",{},el("tr",{},...["Task","Type","Agent","Status","Attempts","Updated"].map(h=>el("th",{},h)))),el("tbody",{},...list.slice().reverse().map(t=>el("tr",{},el("td",{},t.id),el("td",{},t.type),el("td",{},t.assignee),el("td",{class:t.status==="failed"||t.status==="escalated"?"bad":""},t.status),el("td",{},t.attempts),el("td",{},t.updatedAt)))))]}
async function viewEscalations(){const list=await api("/v1/escalations");if(!list.length)return[el("p",{class:"muted"},"No open escalations.")];return list.map(e=>el("div",{class:"card"},el("strong",{class:e.severity==="critical"?"bad":""},e.severity+" · "+e.reason)," → ",e.toRole,el("p",{},e.summary),el("div",{class:"muted"},e.id+" · task "+e.taskId+" · "+e.createdAt)))}
async function viewMetrics(){const m=await api("/v1/metrics");return[el("div",{class:"card"},"Kill switch: ",el("strong",{class:m.killSwitch?"bad":"ok"},m.killSwitch?"ENGAGED":"off")," · Audit: ",el("strong",{class:m.audit.valid?"ok":"bad"},m.audit.valid?"intact":"BROKEN")," ("+m.audit.entries+" entries, anchoring "+m.audit.anchoring+")"),el("div",{class:"card"},el("strong",{},"Alerts"),...(m.alerts.length?m.alerts.map(a=>el("div",{class:a.level==="critical"?"bad":""},a.level+" · "+a.code+" · "+a.message)):[el("div",{class:"muted"},"none")])),el("div",{class:"card"},el("strong",{},"Tasks by status: "),Object.entries(m.tasks.byStatus).map(([k,v])=>k+"="+v).join("  ")),el("div",{class:"card"},el("strong",{},"Approvals: "),"pending "+m.approvals.pending+", approved-not-executed "+m.approvals.approvedNotExecuted),el("div",{class:"card"},el("strong",{},"Cost (USD): "),String(m.costUsd.total))]}
$("connect").addEventListener("click",()=>{token=$("token").value.trim();$("token").value="";load()});
renderTabs();
</script>
</body>
</html>`;
