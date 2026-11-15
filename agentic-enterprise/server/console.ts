/**
 * وحدة تحكم ويب خفيفة تُقدَّم من /console. ملف واحد بلا اعتماديات خارجية، ثنائية اللغة (العربية افتراضيًا، والإنجليزية).
 * - الرمز يُدخل يدويًا ويبقى في الذاكرة فقط (لا localStorage)، فيزول بإغلاق الصفحة.
 * - الموافقة: المفتاح الخاص يُقرأ من ملف محلي ويوقّع داخل المتصفح (WebCrypto Ed25519)؛ لا يغادر الجهاز.
 *   الرسالة الموقعة مطابقة لـ decisionMessage في الخادم (JSON قانوني بمفاتيح مرتبة).
 * - كل بيانات الخادم تُعرض عبر textContent فقط، لأن ملخصات الموافقات قد تحمل نصًا من مصادر خارجية (فواتير وبريد).
 * - عناصر التفاعل تحمل data-testid ثابتة، فلا تعتمد الاختبارات على لغة العرض.
 */
export const CONSOLE_HTML = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Agentic Enterprise</title>
<style>
:root{--bg:#f7f7f5;--fg:#1b1b1b;--muted:#666;--card:#fff;--line:#ddd;--accent:#0b5cad;--bad:#b42318;--ok:#067647}
@media (prefers-color-scheme: dark){:root{--bg:#121212;--fg:#eee;--muted:#aaa;--card:#1d1d1d;--line:#333;--accent:#6aa9ff;--bad:#ff7b72;--ok:#56d364}}
*{box-sizing:border-box}body{margin:0;font:14px/1.6 system-ui,"Segoe UI","Noto Sans Arabic",Tahoma,sans-serif;background:var(--bg);color:var(--fg)}
header{padding:12px 16px;border-bottom:1px solid var(--line);display:flex;gap:8px;flex-wrap:wrap;align-items:center}
header h1{font-size:16px;margin:0;margin-inline-end:12px}
input,select,button{font:inherit;padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--fg);max-width:100%}
button{cursor:pointer}button.primary{background:var(--accent);color:#fff;border-color:var(--accent)}
nav{display:flex;gap:4px;padding:8px 16px;flex-wrap:wrap}nav button[aria-selected=true]{border-color:var(--accent);color:var(--accent)}
main{padding:0 16px 32px;max-width:1100px}
.card{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:12px;margin:8px 0;overflow-wrap:anywhere}
.muted{color:var(--muted)}.bad{color:var(--bad)}.ok{color:var(--ok)}
.ltr{direction:ltr;unicode-bidi:isolate;display:inline-block}
.table-wrap{overflow-x:auto}
table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid var(--line);padding:6px;text-align:start;vertical-align:top}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:8px}
#status{min-height:1.5em}
</style>
</head>
<body>
<header>
  <h1 id="title"></h1>
  <input id="token" data-testid="token" type="password" autocomplete="off" size="36">
  <button id="connect" data-testid="connect" class="primary"></button>
  <select id="lang" data-testid="lang" aria-label="Language"><option value="ar">العربية</option><option value="en">English</option></select>
  <span id="status" data-testid="status" class="muted" role="status"></span>
</header>
<nav id="tabs"></nav>
<main id="view"></main>
<script>
"use strict";
const I18N={
 ar:{title:"المنظومة الوكيلة",token:"رمز API (يبقى في الذاكرة فقط)",connect:"اتصال",enterToken:"أدخل رمز API للبدء.",loading:"جارٍ التحميل…",
  tabs:{approvals:"الموافقات المعلّقة",tasks:"المهام",escalations:"التصعيدات",metrics:"المؤشرات"},
  connected:"متصل",error:"خطأ",signingKey:"مفتاح التوقيع: ",keyHint:"يُقرأ مفتاحك الخاص Ed25519 ويُستخدم داخل هذا المتصفح فقط، ولا يُرفع.",
  keyLoaded:"حُمّل المفتاح محليًا (لم يُرفع)",chooseKey:"اختر ملف مفتاحك الخاص أولًا",noApprovals:"لا موافقات معلّقة.",
  humanId:"معرّفك (مثل u-cfo)",comment:"تعليق (إلزامي للرفض)",approve:"اعتماد (توقيع)",reject:"رفض (توقيع)",
  requires:(n,d,e)=>"يتطلب "+n+" موافقة؛ القرارات حتى الآن: "+d+"؛ ينتهي "+e,payloadHash:"بصمة الحمولة: ",decisionRecorded:"سُجّل القرار: ",
  cols:["المهمة","النوع","الوكيل","الحالة","المحاولات","آخر تحديث"],noEscalations:"لا تصعيدات مفتوحة.",task:"مهمة",
  killSwitch:"الإيقاف الطارئ: ",engaged:"مُفعّل",off:"متوقف",audit:"سجل التدقيق: ",intact:"سليم",broken:"تالف",entries:"حدث",anchoring:"التثبيت",
  alerts:"التنبيهات",none:"لا يوجد",tasksByStatus:"المهام حسب الحالة: ",approvals:"الموافقات: ",pending:"معلّقة",approvedNotExecuted:"معتمدة غير منفذة",cost:"التكلفة (دولار): "},
 en:{title:"Agentic Enterprise",token:"API token (kept in memory only)",connect:"Connect",enterToken:"Enter an API token to begin.",loading:"Loading…",
  tabs:{approvals:"Pending approvals",tasks:"Tasks",escalations:"Escalations",metrics:"Metrics"},
  connected:"Connected",error:"Error",signingKey:"Signing key: ",keyHint:"Your Ed25519 private key is read and used in this browser only.",
  keyLoaded:"Key loaded locally (not uploaded)",chooseKey:"Choose your private key file first",noApprovals:"No pending approvals.",
  humanId:"your human id (e.g. u-cfo)",comment:"comment (required to reject)",approve:"Approve (sign)",reject:"Reject (sign)",
  requires:(n,d,e)=>"Requires "+n+" approval(s); decisions so far: "+d+"; expires "+e,payloadHash:"Payload hash: ",decisionRecorded:"Decision recorded: ",
  cols:["Task","Type","Agent","Status","Attempts","Updated"],noEscalations:"No open escalations.",task:"task",
  killSwitch:"Kill switch: ",engaged:"ENGAGED",off:"off",audit:"Audit: ",intact:"intact",broken:"BROKEN",entries:"entries",anchoring:"anchoring",
  alerts:"Alerts",none:"none",tasksByStatus:"Tasks by status: ",approvals:"Approvals: ",pending:"pending",approvedNotExecuted:"approved-not-executed",cost:"Cost (USD): "}
};
const TABS=["approvals","tasks","escalations","metrics"];
let token="",tab="approvals",keyPem=null,lang="ar";
const T=()=>I18N[lang];
const $=(id)=>document.getElementById(id);
function el(tag,attrs,...kids){const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs||{})){if(k==="class")e.className=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else e.setAttribute(k,v)}for(const c of kids)if(c!=null)e.append(c instanceof Node?c:document.createTextNode(String(c)));return e}
const code=(s)=>el("span",{class:"ltr"},s);
function status(msg,cls){const s=$("status");s.textContent=msg;s.className=cls||"muted"}
function applyLang(){document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";$("title").textContent=T().title;$("token").placeholder=T().token;$("connect").textContent=T().connect;$("lang").value=lang;load()}
async function api(path,opts){const r=await fetch(path,{...opts,headers:{"authorization":"Bearer "+token,"content-type":"application/json"}});const b=await r.json().catch(()=>({}));if(!r.ok)throw new Error((b.error&&b.error.code)+": "+(b.error&&b.error.message));return b}
function canonical(v){if(v===null||typeof v!=="object")return JSON.stringify(v===undefined?null:v);if(Array.isArray(v))return"["+v.map(canonical).join(",")+"]";return"{"+Object.keys(v).filter(k=>v[k]!==undefined).sort().map(k=>JSON.stringify(k)+":"+canonical(v[k])).join(",")+"}"}
function pemToDer(pem){const b=atob(pem.replace(/-----[^-]+-----/g,"").replace(/\\s+/g,""));const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer}
async function signDecision(d){if(!keyPem)throw new Error(T().chooseKey);const key=await crypto.subtle.importKey("pkcs8",pemToDer(keyPem),{name:"Ed25519"},false,["sign"]);const msg=new TextEncoder().encode(canonical({purpose:"approval-decision/v1",...d}));const sig=new Uint8Array(await crypto.subtle.sign({name:"Ed25519"},key,msg));let s="";for(const x of sig)s+=String.fromCharCode(x);return{...d,signature:btoa(s)}}
function renderTabs(){$("tabs").replaceChildren(...TABS.map(id=>el("button",{"data-testid":"tab-"+id,"aria-selected":String(tab===id),onclick:()=>{tab=id;load()}},T().tabs[id])))}
async function load(){renderTabs();const v=$("view");if(!token){v.replaceChildren(el("p",{class:"muted"},T().enterToken));return}v.replaceChildren(el("p",{class:"muted"},T().loading));try{const fn={approvals:viewApprovals,tasks:viewTasks,escalations:viewEscalations,metrics:viewMetrics}[tab];v.replaceChildren(...await fn());if(!$("status").dataset.sticky)status(T().connected,"ok")}catch(e){v.replaceChildren(el("p",{class:"bad"},e.message));status(T().error,"bad")}}
async function viewApprovals(){const list=await api("/v1/approvals?status=pending");const keyRow=el("div",{class:"card"},el("strong",{},T().signingKey),el("input",{type:"file",accept:".pem","data-testid":"key-file",onchange:async(ev)=>{keyPem=await ev.target.files[0].text();status(T().keyLoaded,"ok")}}),el("div",{class:"muted"},T().keyHint));if(!list.length)return[keyRow,el("p",{class:"muted","data-testid":"no-approvals"},T().noApprovals)];return[keyRow,...list.map(a=>{const human=el("input",{placeholder:T().humanId,size:"24","data-testid":"human-id"});const comment=el("input",{placeholder:T().comment,size:"36","data-testid":"comment"});const act=(decision)=>async()=>{try{const d={approvalId:a.id,humanId:human.value.trim(),decision,payloadHash:a.payloadHash,comment:comment.value,issuedAt:new Date().toISOString()};const proof=await signDecision(d);const r=await api("/v1/approvals/"+encodeURIComponent(a.id)+"/decision",{method:"POST",body:JSON.stringify({humanId:d.humanId,decision,comment:d.comment,proof})});await load();status(T().decisionRecorded+r.approval.status,"ok");$("status").dataset.result=r.approval.status}catch(e){status(e.message,"bad")}};return el("div",{class:"card","data-testid":"approval"},el("div",{},el("strong",{},code(a.toolName))," · ",code(a.actionType)," · ",el("span",{class:"muted"},code(a.id))),el("p",{"data-testid":"summary"},a.summary),el("div",{class:"muted"},T().requires(a.requiredApprovals,a.decisions.length,a.expiresAt)),el("div",{class:"muted"},T().payloadHash,code(a.payloadHash)),el("div",{class:"row"},human,comment,el("button",{class:"primary","data-testid":"approve",onclick:act("approve")},T().approve),el("button",{"data-testid":"reject",onclick:act("reject")},T().reject)))})]}
async function viewTasks(){const list=await api("/v1/tasks");return[el("div",{class:"table-wrap"},el("table",{},el("thead",{},el("tr",{},...T().cols.map(h=>el("th",{},h)))),el("tbody",{},...list.slice().reverse().map(t=>el("tr",{},el("td",{},code(t.id)),el("td",{},code(t.type)),el("td",{},code(t.assignee)),el("td",{class:t.status==="failed"||t.status==="escalated"?"bad":""},code(t.status)),el("td",{},t.attempts),el("td",{},code(t.updatedAt)))))))]}
async function viewEscalations(){const list=await api("/v1/escalations");if(!list.length)return[el("p",{class:"muted"},T().noEscalations)];return list.map(e=>el("div",{class:"card"},el("strong",{class:e.severity==="critical"?"bad":""},code(e.severity+" · "+e.reason))," → ",code(e.toRole),el("p",{},e.summary),el("div",{class:"muted"},code(e.id)," · ",T().task," ",code(e.taskId)," · ",code(e.createdAt))))}
async function viewMetrics(){const m=await api("/v1/metrics");return[el("div",{class:"card"},T().killSwitch,el("strong",{class:m.killSwitch?"bad":"ok"},m.killSwitch?T().engaged:T().off)," · ",T().audit,el("strong",{class:m.audit.valid?"ok":"bad"},m.audit.valid?T().intact:T().broken)," ("+m.audit.entries+" "+T().entries+"، "+T().anchoring+" ",code(m.audit.anchoring),")"),el("div",{class:"card"},el("strong",{},T().alerts),...(m.alerts.length?m.alerts.map(a=>el("div",{class:a.level==="critical"?"bad":""},code(a.level+" · "+a.code)," · ",a.message)):[el("div",{class:"muted"},T().none)])),el("div",{class:"card"},el("strong",{},T().tasksByStatus),code(Object.entries(m.tasks.byStatus).map(([k,v])=>k+"="+v).join("  "))),el("div",{class:"card"},el("strong",{},T().approvals),T().pending+" "+m.approvals.pending+"، "+T().approvedNotExecuted+" "+m.approvals.approvedNotExecuted),el("div",{class:"card"},el("strong",{},T().cost),code(String(m.costUsd.total)))]}
$("connect").addEventListener("click",()=>{token=$("token").value.trim();$("token").value="";load()});
$("lang").addEventListener("change",()=>{lang=$("lang").value;applyLang()});
applyLang();
</script>
</body>
</html>`;
