//  ███████╗███████╗    █████╗    ██████╗
//  ██╔════╝██╔════╝   ██╔══██╗   ██╔══██╗
//  █████╗  █████╗     ███████║   ██████╔╝
//  ██╔══╝  ██╔══╝     ██╔══██║   ██╔══██╗
//  ██║██╗  ███████╗██╗██║  ██║██╗██║  ██║
//  ╚═╝╚═╝  ╚══════╝╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
// Forcefully Eliminating Advertising Redirects
// by iWoozy_Real - OPEN SOURCE - V2.4.1
// Discord Server : https://trw.lat/ds
// "Un tabaco no hace que un sapo que vuelva un capo y un revolver no hace que un muchacho se haga un macho" - Canserbero

// ==UserScript==
// @name         F.E.A.R. V2.4.1
// @namespace    ⃟⃞⃟⃞  -THE NOTORIUS Ⱳ.Ø.Ẓ̣̣ ✞
// @version      V2.4.1
// @description  made by https://trw.lat
// @author       iWoozy_real
// @license      MIT
// @run-at       document-start
// @match        *://linkvertise.com/*
// @match        *://loot-link.com/*
// @match        *://loot-links.com/*
// @match        *://lootdest.com/*
// @match        *://lootdest.org/*
// @match        *://lootlinks.co/*
// @match        *://lootlinks.com/*
// @match        *://daughablelea.com/*
// @match        *://*.*/s?*
// @match        *://cuty.io/*
// @match        *://www.cuty.io/*
// @match        *://cety.app/*
// @match        *://www.cety.app/*
// @match        *://work.ink/*
// @match        *://lockr.so/*
// @match        *://link-unlock.com/*
// @match        *://rip.linkvertise.lol/bypass?url=*
// @match        *://rip.linkvertise.lol/workink?url=*
// @match        *://trw.lat/?url=*
// @match        *://*.*.*/riplvlol*
// @exclude      *://tria.ge/*
// @exclude      *://*.google.*/*
// @exclude      *://work.ink/token/*

// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue


// @downloadURL  https://trw.lat/install/userscript/u.user.js
// @updateURL    https://trw.lat/install/userscript/u.user.js
// @homepageURL  https://trw.lat
// @supportURL   https://trw.lat/ds
// ==/UserScript==

const CONFIG = {
  wait: 5, // Normal Waiting time
  site: 'rip.linkvertise.lol/bypass?url=', // In case of domain change, replace rip.linkvertise.lol with sub.host.TLD
  interval: 500, // Check for result interval (In LAG Case up to 1000 / 2000)
  SecureMode: true, // Secure mode to avoid getting detected
  REFParamtr: "d3452b59-d179-4d25-8b72-6a1b8004c799",
  // Client-Side bypasses - Userscript makes requests to the server to get payloads but the requests are made in your client, this bypasses IP-Checks from LootLabs & Work.ink
  LootLabs:true, // LootLabs Client-Side bypass
  WorkInk:true, // Work.ink Client-Side bypass
  // DO NOT CHANGE
  UVersion:"V2.4",
  CS_Workink_HST : "https://work-direct.ink"
};

if (window.self !== window.top) {return}

if (CONFIG.WorkInk && location.hostname=="work.ink"){
    async function sleep(e){return new Promise((n=>setTimeout(n,e)))}async function TheWhatByTheNotoriousBIG(){return new Promise((e=>{const n=setInterval((()=>{const o=document.head;if(o){clearInterval(n);const t=o.innerText;e(t.toLowerCase().includes("just a mome")||t.toLowerCase().includes("just a second"))}}),100)}))}(async()=>{if(await TheWhatByTheNotoriousBIG())return;if(!location.href.includes("cdn-cgi/trace")){!function(){const e=setInterval((()=>{if(document.body){clearInterval(e),document.documentElement.innerHTML="";const n=document.createElement("style");n.textContent="\n *{margin:0;padding:0;box-sizing:border-box}\n body{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:#fff;overflow:hidden}\n #vm-loader{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:#fff;z-index:2147483647!important;pointer-events:all}\n #vm-text{font-family:monospace;font-size:24px;color:#000;font-weight:600}\n .dot{animation:blink 1.4s infinite}\n .dot:nth-child(2){animation-delay:0.2s}\n .dot:nth-child(3){animation-delay:0.4s}\n @keyframes blink{0%,60%,100%{opacity:1}30%{opacity:0}}\n ";const o=document.createElement("body"),t=document.createElement("div");t.id="vm-loader";const a=document.createElement("div");a.id="vm-text",a.innerHTML='Starting VM<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>',t.appendChild(a),o.appendChild(t),document.documentElement.appendChild(document.createElement("head")),document.head.appendChild(n),document.documentElement.appendChild(o),new MutationObserver((()=>{if(document.getElementById("vm-loader")){const e=document.getElementById("vm-loader");"2147483647"!==e.style.zIndex&&(e.style.zIndex="2147483647")}else document.body.appendChild(t)})).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style"]})}}),10)}();try{const e=await fetch(location.href),n=(await e.text()).match(/f_user_id\s*:\s*["']?(\d+)["']?/);n?.[1]?location.href="https://work.ink/cdn-cgi/trace?a="+encodeURIComponent(location.href)+"&b="+n[1]:location.reload()}catch(e){location.reload()}return}document.body.innerHTML="",document.title="STARTING VM...",setTimeout((()=>document.title="TRW-VM"),3e3);const e=new URLSearchParams(location.search).get("a"),n=new URLSearchParams(location.search).get("b"),o=new URLSearchParams(new URL(e).search).get("sr")||"",t=new URL(e).pathname.split("/").filter(Boolean)[1];function a(){return"/"+([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)))}history.replaceState(null,null,a()),setInterval((()=>history.replaceState(null,null,a())),1e3+500*Math.random());let r=0,i=!1;unsafeWindow.wokeresponse=null;let s=null,l=!1;const c=new WebSocket(`wss://work.ink/_api/v2/ws?userId=${n}&custom=${t}&referrer=&toLink=&serverOverride=${o}&customerSessionToken=`);function d(e){if(!s)return;const n=s.querySelector("#fear-console-body");if(!n)return;const o=n.querySelector("#fear-console-empty");o&&o.remove();const t=document.createElement("div");t.className="fear-console-line",t.innerHTML=`<span class="fear-console-time">[${(new Date).toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"})}]</span><span class="fear-console-prefix">›</span><span class="fear-console-text">${function(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}(e)}</span>`,n.appendChild(t),n.scrollTop=n.scrollHeight,l&&(s.classList.remove("minimized"),s.querySelector(".fear-console-btn.minimize").textContent="─",l=!1)}function p(){const e=document.getElementById("fear-redirect-btn");e&&(e.style.display="inline-block")}c.onopen=()=>{console.log("[F.E.A.R] WebSocket connected!"),function(){if(i)return;i=!0;const e=document.createElement("style");e.textContent='@import url(\'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600&display=swap\');*{box-sizing:border-box}@keyframes fearFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes fearBlink{0%,50%{opacity:1}51%,100%{opacity:0}}@keyframes fearSlideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}@keyframes fearPulse{0%,100%{opacity:.6}50%{opacity:1}}#fear-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:linear-gradient(180deg,#000 0%,#0a0a0a 100%);color:#fff;font-family:"Roboto Mono","Consolas",monospace;display:flex;flex-direction:column;align-items:center;z-index:999999;overflow-y:auto;overflow-x:hidden}#fear-overlay::-webkit-scrollbar{width:10px}#fear-overlay::-webkit-scrollbar-track{background:#0a0a0a}#fear-overlay::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#333,#222);border-radius:5px;border:2px solid #0a0a0a}#fear-overlay::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#444,#333)}#fear-content{display:flex;flex-direction:column;align-items:center;width:100%;max-width:900px;padding:40px 20px 60px;margin:0 auto}#fear-header{text-align:center;margin-bottom:30px;animation:fearSlideDown .6s ease-out}#fear-title{font-size:clamp(2.5rem,10vw,4.5rem);margin:0;letter-spacing:clamp(4px,2vw,12px);color:#0066cc;font-weight:600;text-shadow:0 0 30px rgba(0,102,204,.3)}#fear-subtitle{font-size:clamp(.85rem,2.5vw,1.3rem);margin:10px 0 0;opacity:.65;letter-spacing:clamp(1px,0.5vw,3px);font-weight:400;color:#aaa}#fear-console{width:100%;max-width:700px;height:220px;background:#0c0c0c;border:1px solid #1a1a1a;border-radius:12px;font-family:"Consolas","Lucida Console","Courier New",monospace;box-shadow:0 8px 32px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.03),inset 0 1px 0 rgba(255,255,255,.02);display:flex;flex-direction:column;animation:fearFadeIn .5s ease-out;overflow:hidden;margin:0 auto 35px;flex-shrink:0}#fear-console.minimized{height:42px}#fear-console.minimized #fear-console-body,#fear-console.minimized #fear-console-input-line{display:none}#fear-console-header{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:linear-gradient(180deg,#1c1c1c 0%,#141414 100%);border-bottom:1px solid #252525;user-select:none;min-height:42px;flex-shrink:0}#fear-console-title{display:flex;align-items:center;gap:12px;color:#888;font-size:12px;letter-spacing:.5px}#fear-console-title-icon{width:18px;height:18px;background:linear-gradient(135deg,#00cc44 0%,#00aa33 100%);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#000;font-weight:700;box-shadow:0 2px 8px rgba(0,200,70,.25)}#fear-console-status{font-size:10px;color:#555;display:flex;align-items:center;gap:6px}#fear-console-status::before{content:\'\';width:6px;height:6px;background:#00aa44;border-radius:50%;animation:fearPulse 2s infinite}#fear-console-controls{display:flex;gap:8px}.fear-console-btn{width:28px;height:28px;border-radius:6px;border:1px solid #2a2a2a;cursor:pointer;transition:all .2s ease;background:#1a1a1a;color:#666;font-size:14px;display:flex;align-items:center;justify-content:center}.fear-console-btn:hover{background:#2a2a2a;color:#fff;border-color:#3a3a3a;transform:scale(1.05)}.fear-console-btn:active{transform:scale(.95)}#fear-console-body{flex:1;overflow-y:auto;overflow-x:hidden;padding:14px 16px;font-size:12px;line-height:1.7;color:#bbb;background:#0c0c0c}#fear-console-body::-webkit-scrollbar{width:6px}#fear-console-body::-webkit-scrollbar-track{background:transparent}#fear-console-body::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:3px}#fear-console-body::-webkit-scrollbar-thumb:hover{background:#3a3a3a}.fear-console-line{margin-bottom:6px;animation:fearFadeIn .3s ease-out;word-wrap:break-word;padding:4px 10px;display:flex;align-items:flex-start;gap:12px;border-radius:4px;transition:background .15s}.fear-console-line:hover{background:rgba(0,170,0,.05)}.fear-console-prefix{color:#00cc44;font-weight:600;flex-shrink:0;font-size:14px}.fear-console-time{color:#3a3a3a;font-size:10px;flex-shrink:0;min-width:65px}.fear-console-text{flex:1;color:#ccc;word-break:break-word}.fear-console-waiting{display:flex;align-items:center;gap:12px;color:#555;padding:8px 10px;font-size:11px}.fear-console-waiting-dots::after{content:\'...\';animation:fearPulse 1s infinite}#fear-console-input-line{display:flex;align-items:center;padding:10px 16px;background:#111;border-top:1px solid #1a1a1a;color:#00cc44;font-size:12px;flex-shrink:0}#fear-console-input-line span{color:#666}.fear-console-cursor{display:inline-block;width:8px;height:15px;background:#00cc44;animation:fearBlink 1s step-end infinite;margin-left:4px}#fear-console-empty{color:#444;text-align:center;padding:30px 20px;font-size:12px;display:flex;flex-direction:column;align-items:center;gap:8px}#fear-console-empty::before{content:\'◦\';font-size:24px;opacity:.3}#fear-info{text-align:center;max-width:700px;margin:0 auto;animation:fearFadeIn .6s ease-out .2s both}#fear-description{font-size:clamp(.75rem,2vw,.9rem);line-height:1.7;color:#777;margin:0 0 25px;padding:0 10px;font-family:"Segoe UI",Arial,sans-serif}#fear-description a{color:#3399ff;text-decoration:none;font-weight:600;transition:color .2s}#fear-description a:hover{color:#66bbff;text-decoration:underline}#fear-status{font-size:clamp(.9rem,2.5vw,1.1rem);line-height:1.8;color:#999;margin:0 0 10px}#fear-status strong{display:block;font-size:clamp(1.1rem,3vw,1.4rem);color:#fff;margin-top:8px}#fear-counter{color:#0066cc;font-weight:600}#fear-redirect-btn{margin:35px 0;padding:18px 60px;font-size:clamp(1rem,3vw,1.3rem);font-weight:600;background:linear-gradient(180deg,#0077dd 0%,#0055aa 100%);border:none;border-radius:10px;color:#fff;cursor:pointer;transition:all .3s ease;display:none;box-shadow:0 4px 20px rgba(0,100,200,.3);letter-spacing:1px}#fear-redirect-btn:hover{background:linear-gradient(180deg,#0088ee 0%,#0066cc 100%);transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,120,220,.4)}#fear-redirect-btn:active{transform:translateY(0)}@media(max-width:500px){#fear-content{padding:30px 15px 50px}#fear-console{height:200px;border-radius:8px}#fear-console-header{padding:8px 12px}#fear-console-body{padding:10px 12px;font-size:11px}#fear-console-input-line{padding:8px 12px}.fear-console-btn{width:32px;height:32px}.fear-console-time{display:none}.fear-console-line{padding:3px 8px;gap:8px}}',document.head.appendChild(e);const n=document.createElement("div");n.id="fear-overlay";const o=document.createElement("div");o.id="fear-content";const t=document.createElement("div");t.id="fear-header",t.innerHTML='<h1 id="fear-title">F.E.A.R</h1><p id="fear-subtitle">Forcefully Eliminating Advertising Redirects</p>',o.appendChild(t);const a=document.createElement("div");a.id="fear-console",a.innerHTML='<div id="fear-console-header"><div id="fear-console-title"><div id="fear-console-title-icon">F</div><span>Console Output</span><span id="fear-console-status">ACTIVE</span></div><div id="fear-console-controls"><button class="fear-console-btn minimize" title="Minimize/Expand">─</button></div></div><div id="fear-console-body"><div id="fear-console-empty">Processing messages...</div></div><div id="fear-console-input-line"><span>FEAR://</span><span class="fear-console-cursor"></span></div>',o.appendChild(a),s=a,a.querySelector(".fear-console-btn.minimize").addEventListener("click",(e=>{l=!l,a.classList.toggle("minimized",l),e.target.textContent=l?"□":"─"}));const r=document.createElement("div");r.id="fear-info",r.innerHTML='<p id="fear-description">Server-Side captcha solving by Captcha Challenger!<br><br>Having issues? Report them in our <a href="https://trw.lat/ds" target="_blank">Discord</a></p><p id="fear-status">F.E.A.R Is bypassing Work.ink...<strong>Requests completed: <span id="fear-counter">0/3 (aprox)</span></strong></p>',o.appendChild(r);const c=document.createElement("button");c.textContent="Continue →",c.id="fear-redirect-btn",c.onclick=()=>{unsafeWindow.wokeresponse&&unsafeWindow.open(unsafeWindow.wokeresponse,"_blank")},o.appendChild(c),n.appendChild(o),document.body.appendChild(n)}(),d("WebSocket connection established")},c.onmessage=async e=>{const n=e.data;console.log("[DEBUG-WS] Mensaje crudo recibido del WS:",n.substring(0,200)+(n.length>200?"...":"")),"string"==typeof n&&await async function(e,n){try{const o=encodeURIComponent(n),t=String("string"==typeof CONFIG?.UVersion&&CONFIG.UVersion.trim()?CONFIG.UVersion.trim():"v0.0-T"),a={payl:o,pal:location.href,UVA:t,SST:!0},i=await fetch(`${CONFIG.CS_Workink_HST}/api/clientSides/workink`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(a)});if(!i.ok)return;r++,function(){const e=document.getElementById("fear-counter");e&&(e.textContent=`${r}/3 (aprox)`)}();const s=await i.json();s.ToCMSGs&&Array.isArray(s.ToCMSGs)&&s.ToCMSGs.length>0&&(console.log("[DEBUG] Processing server ToCMSGs, L :",s.ToCMSGs.length),async function(e){if(!Array.isArray(e)||0===e.length)return;for(const n of e)if("string"==typeof n)if(n.startsWith("USC:wait(")){const e=n.match(/USC:wait\((\d+(?:\.\d+)?)\)/);if(e){const n=parseFloat(e[1]);await sleep(1e3*n)}}else d(n)}(s.ToCMSGs));let l=[n];s.pyl&&Array.isArray(s.pyl)&&s.pyl.length>0?l=s.pyl:console.log("[DEBUG] No payload in server response");for(let n=0;n<l.length;n++){const o=l[n];if("string"==typeof o)if(console.log(`[DEBUG] Procesing item ${n}/${l.length-1} → longitud ${o.length} → ${o.substring(0,120)}${o.length>120?"...":""}`),o.startsWith("USC:startOperaGXSpoofing()"))document.cookie="__cf_bm=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.work.ink",GM.xmlHttpRequest({method:"HEAD",url:"https://work.ink/_api/v2/affiliate/operaGX",onload:function(e){function n(){GM.xmlHttpRequest({method:"POST",url:"https://work.ink/_api/v2/callback/operaGX",headers:{"User-Agent":"Opera Installer/1.0"},data:JSON.stringify({noteligible:!0}),onload:function(e){200!==e.status?setTimeout(n,0):d("OperaGX Forced! (method by skipped.lol)")},onerror:()=>setTimeout(n,0)})}n()}});else if(o.startsWith("USC:wait(")){const e=o.match(/USC:wait\((\d+(?:\.\d+)?)\)/);e&&await sleep(1e3*parseFloat(e[1]))}else if(o.startsWith("USC:setrep")){const n=o.match(/USC:setrep[ao]?\((.+)\)/);n&&n[1]&&(unsafeWindow.wokeresponse=n[1].trim(),p(),e.close())}else e.send(o)}}catch(o){console.error("[F.E.A.R] Error general en processWebSocketMessage:",o),e.send(n)}}(c,n)},c.onerror=e=>{console.error("[F.E.A.R] WebSocket Error:",e),d("WebSocket error occurred")},c.onclose=e=>{console.log("[F.E.A.R] WebSocket closed:",e.code,e.reason),d(`Connection closed: ${e.code}`)},console.log("[F.E.A.R]: VM started... v2.3")})();
    return
}

if (CONFIG.LootLabs && location.href.includes("/s?")){
    if (!false) {
      !function(){"use strict";const e=unsafeWindow.fetch;unsafeWindow.fetch=async function(t,n={}){if("string"!=typeof t&&!(t instanceof Request))return e(t,n);const o=t instanceof Request?t.url:t;if("POST"!==(n.method||(t instanceof Request?t.method:"GET")).toUpperCase()||!o.endsWith("/tc"))return e(t,n);let s=n.body||(t instanceof Request?await t.clone().text():null);if(!s)return e(t,n);let r,c=!1;try{const e=JSON.parse(s);e&&"object"==typeof e&&("max_tasks"in e&&(e.max_tasks=1,e.num_of_tasks="1",e.bl=[18,2,33,7,21,49],e.tier_id="0",e.taboola_user_sync="0",c=!0),r=JSON.stringify(e))}catch(e){}if(c){const s={...n,body:r,headers:{...n.headers,"Content-Type":"application/json"}};return e(t instanceof Request?t:o,s)}return e(t,n)}}();let overlayCreated=!1,requestCount=0,zIndexInterval=null;function createFEAROverlay(){if(overlayCreated)return;overlayCreated=!0;const e=document.createElement("style");e.textContent="@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500;600&display=swap');",document.head.appendChild(e);const t=document.createElement("div");t.id="fear-overlay",Object.assign(t.style,{position:"fixed",top:"0",left:"0",width:"100vw",height:"100vh",background:"#000000",color:"#ffffff",fontFamily:'"Roboto Mono", "Courier New", monospace',display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:"2147483647",textAlign:"center",padding:"40px",boxSizing:"border-box",overflow:"hidden",pointerEvents:"none"});const n=document.createElement("h1");n.textContent="F.E.A.R",n.style.fontSize="5em",n.style.margin="0 0 10px 0",n.style.letterSpacing="8px",n.style.color="#0066cc",t.appendChild(n);const o=document.createElement("h2");o.textContent="Forcefully Eliminating Advertising Redirects",o.style.fontSize="1.4em",o.style.margin="0 0 40px 0",o.style.opacity="0.7",o.style.letterSpacing="2px",t.appendChild(o);const s=document.createElement("p");s.innerHTML='Bypassing your loot-links URL client-side to bypass IP-Checks...<br><strong style="font-size:1.3em; color:#ffffff;">TRW-Server requests done : <span id="wkest-count">0/6</span></strong>',s.style.fontSize="1.2em",s.style.lineHeight="1.8",s.style.maxWidth="800px",s.style.color="#cccccc",t.appendChild(s);const r=document.createElement("button");r.textContent="Next",r.id="fear-redirect-btn",Object.assign(r.style,{marginTop:"50px",padding:"16px 48px",fontSize:"1.4em",fontWeight:"600",background:"#0066cc",border:"none",borderRadius:"8px",color:"white",cursor:"pointer",transition:"background 0.3s ease",display:"none",pointerEvents:"auto"}),r.onmouseover=()=>r.style.background="#0052a3",r.onmouseout=()=>r.style.background="#0066cc",r.onclick=()=>{unsafeWindow.wokeresponse&&unsafeWindow.open(unsafeWindow.wokeresponse)},t.appendChild(r),document.body.appendChild(t),zIndexInterval=setInterval((()=>{t.style.zIndex="2147483647"}),500)}function updateWKestCount(){const e=document.getElementById("wkest-count");e&&(e.textContent=`${requestCount}/6`)}function showRedirectButton(e){unsafeWindow.wokeresponse=e;const t=document.getElementById("fear-redirect-btn");t&&(t.style.display="block")}console.log("[F.E.A.R]: Started!");const originalFetch=unsafeWindow.fetch;unsafeWindow.fetch=async function(...e){const[t]=e;if(("string"==typeof t?t:t.url).includes("/tc"))try{const t=await originalFetch(...e),n=await t.clone().json();if(console.log("[F.E.A.R]: Intercepted TC!"),setTimeout((()=>{createFEAROverlay()}),1500),Array.isArray(n)&&n.length>0){let{urid:e,task_id:t,action_pixel_url:o,session_id:s}=n[0];1===n.length?(e=n[0].urid,t=n[0].task_id):(e=n.map((e=>e.urid)).join(","),t=n.map((e=>e.task_id)).join(","));const r=parseInt(e.slice(-5))%3;console.log("[F.E.A.R]: Started WS...");const c="undefined"!=typeof INCENTIVE_SERVER_DOMAIN?INCENTIVE_SERVER_DOMAIN:"onsultingco.com",i="undefined"!=typeof INCENTIVE_SYNCER_DOMAIN?INCENTIVE_SYNCER_DOMAIN:"nismscoldnesfspu.org",a="undefined"!=typeof KEY?KEY:unsafeWindow.conf_rew.key,l="undefined"!=typeof TID?TID:unsafeWindow.conf_rew.cd,d=location.href.includes("loot")?"1":"0",u=new WebSocket(`wss://${r}.${c}/c?uid=${e}&cat=${t}&key=${a}&session_id=${s}&is_loot=${d}&tid=${l}`);let p;u.onopen=()=>{p=setInterval((()=>{u.send("0"),console.log("[F.E.A.R]: PG0"),fetch("https://trw.lat/api/status?op=llbs"),requestCount++,updateWKestCount()}),1e4)},u.onclose=()=>{console.log("ws closed"),document.getElementById("wkest-count").textContent="Websocket closed by server",clearInterval(p)},u.onerror=()=>{console.log("ws error"),document.getElementById("wkest-count").textContent="websocket error! please refresh the page",clearInterval(p)},u.onmessage=async e=>{if(console.log("[F.E.A.R]: MEOB",e.data),e.data.startsWith("r:")){const t=e.data.replace("r:","").trim().replace(/[^ -~]/g,""),n=await fetch(`https://trw.lat/api/clientSides/lootlabs?payl=${encodeURIComponent(t)}&pal=${encodeURIComponent(location.href)}`);showRedirectButton((await n.json()).pyl),u.close()}},navigator.sendBeacon(`https://${r}.${c}/st?uid=${e}&cat=${t}`),fetch(o),fetch(`https://${i}/td?ac=auto_complete&urid=${e}&cat=${t}&tid=${l}`)}return t}catch(t){return console.error("Bypass error:",t),originalFetch(...e)}return originalFetch(...e)};
    }
    return
}

(function () {
  'use strict';

  if (location.href.startsWith('https://rip.linkvertise.lol/workink?url=')) {
    unsafeWindow.TRW_Running = true;
    return;
  }

  if (CONFIG.SecureMode) {
    CONFIG.wait = 10;
  }

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function isBot() {
    const t = document.title;
    return t.includes('Just a moment') || t.includes('Just a second')
  }

  async function findHref() {
    const start = Date.now();
    while (Date.now() - start < 6000000000000) {
      await sleep(CONFIG.interval + Math.random() * 100);
      try {
        if (unsafeWindow.o1success) {
          return unsafeWindow.o1result;
        }
      } catch (err) {}
    }
    return false;
  }

  function generateRandomPath() {
    return '/' + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  function handleReferrerRedirect(ref) {
    const dest = atob(ref);

    history.replaceState(null, null, generateRandomPath());
    setInterval(() => history.replaceState(null, null, generateRandomPath()), 1000 + Math.random() * 500);

    document.documentElement.innerHTML = `<!DOCTYPE html><html><head><title>RIP.LINKVERTISE.LOL</title>` +
      `<style>body{font-family:Arial,sans-serif;background:#1a1a1a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;color:#e0e0e0}h2{font-size:2.5em;margin-bottom:10px}p{font-size:1.2em;text-align:center;margin:5px 0}button{font-size:1.5em;padding:15px 30px;background:#333;color:#e0e0e0;border:none;border-radius:8px;cursor:pointer;transition:transform .2s,background .2s}button:hover{transform:scale(1.05);background:#4a4a4a}button:disabled{background:#555;color:#999;cursor:not-allowed}#countdown{font-size:1.3em;margin-bottom:10px}</style>` +
      `</head><body><h2>F.E.A.R - Forcefully Eliminating Advertising Redirects</h2><p>Click the button below to proceed.</p>` +
      `<div id="countdown"></div><button id="nextBtn">Next</button></body></html>`;

    setTimeout(() => {
      const countdownEl = document.getElementById('countdown');
      const btn = document.getElementById('nextBtn');

      btn.addEventListener('click', () => {
        if (!btn.disabled && dest) {
          window.location.href = dest;
        }
      });

      function hasHash(url) {
        try {
          return url.includes('hash=');
        } catch {
          return false;
        }
      }

      if (hasHash(dest)) {
        countdownEl.style.color = 'red';
        countdownEl.style.fontWeight = 'bold';
        let time = 8;
        countdownEl.textContent = `YOU HAVE EXACTLY ${time} SECONDS TO CLICK THE BUTTON BEFORE YOUR HASH EXPIRES`;
        const interval = setInterval(() => {
          time--;
          if (time > 0) {
            countdownEl.textContent = `YOU HAVE EXACTLY ${time} SECONDS TO CLICK THE BUTTON BEFORE YOUR HASH EXPIRES`;
          } else {
            countdownEl.textContent = `WELL DONE, NOW THE HASH IS INVALID AND IF YOU CLICK YOU WILL BE DETECTED, STARTING BYPASS AGAIN...`;
            countdownEl.style.color = '';
            countdownEl.style.fontWeight = '';
            btn.disabled = true;
            clearInterval(interval);
            setTimeout(() => {
              location.replace(location.href.split('?')[0]);
            }, 3500);
          }
        }, 1000);
      } else {
        countdownEl.style.display = 'none';
      }
    }, 100);
  }

  async function handleRipBypass() {
    if (location.hostname === 'rip.linkvertise.lol' && location.pathname === '/bypass') {
      const success = await findHref();
      if (success) {
        const p = new URLSearchParams(window.location.search);
        const redirect = p.get('url');
        const host = new URL(redirect).hostname;
        await sleep(2000 + Math.random() * 1000);
        const bypassUrl = `https://${host}/cdn-cgi/rum`;
        GM_setValue(CONFIG.REFParamtr, btoa(success));
        window.location.href = bypassUrl;
      }
      return true;
    }
    return false;
  }

  async function handleTrwRedirect() {
    if (location.href.includes('https://trw.lat/?url=')) {
      await sleep(1500);
      const info = document.getElementById('information');
      if (info) info.click();

      let timeLeft = CONFIG.wait;
      const h1 = document.querySelector("html body div.centered h1");
      if (h1) {
        h1.textContent = `Redirecting in ${timeLeft}s...`;
        const countdown = setInterval(() => {
          timeLeft--;
          if (timeLeft <= 0) {
            clearInterval(countdown);
            h1.textContent = 'Redirecting now...';
          } else {
            h1.textContent = `Redirecting in ${timeLeft}s...`;
          }
        }, 1000);
      }

      await sleep(CONFIG.wait * 1000);
      const u = new URLSearchParams(location.search).get('url');
      window.location.href = `https://${CONFIG.site}${encodeURIComponent(atob(u))}`;
      return true;
    }
    return false;
  }

  function createCopyOverlay(text) {
    const overlay = document.createElement('div');
    overlay.id = 'copy-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:2147483647;';
    const panel = document.createElement('div');
    panel.style.cssText = 'background:#1a1a1a;color:#e0e0e0;padding:20px;border-radius:10px;text-align:center;max-width:80%;font-family:sans-serif;';
    panel.innerHTML = `<p style="margin:0 0 10px;">Copy this:</p><p style="margin:0 0 15px;word-break:break-all;background:#333;padding:10px;border-radius:5px;">${text}</p><button id="copy-btn" style="padding:10px 20px;background:#2ea44f;color:white;border:none;border-radius:5px;cursor:pointer;font-weight:bold;">Copy</button><button id="close-btn" style="padding:10px 20px;background:#2d3a57;color:#e0e0e0;border:none;border-radius:5px;cursor:pointer;font-weight:bold;margin-left:10px;">Close</button>`;
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    const copyBtn = document.getElementById('copy-btn');
    const closeBtn = document.getElementById('close-btn');

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#4a4a4a';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.style.background = '#2ea44f';
        }, 2000);
      });
    });

    closeBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.remove(); }, { once: true });
  }

  async function handleDefaultBypass(originalHref) {
    const bypassUrl = `https://trw.lat/?url=${btoa(originalHref)}`;
    window.location.assign(bypassUrl);
  }

  async function main() {
    const ref = GM_getValue(CONFIG.REFParamtr);

    if (ref && location.href.includes("/cdn-cgi/")) {
      GM_deleteValue(CONFIG.REFParamtr);
      handleReferrerRedirect(ref);
      return;
    }

    if (isBot()) {
      return;
    }

    const originalHref = location.href;

    if (await handleTrwRedirect()) return;
    if (await handleRipBypass()) return;
    if (!confirm('F.E.A.R - Do you want to bypass this link?')) {
      return;
    }
    handleDefaultBypass(originalHref);
  }

  (async () => {
    try {
      await main();
    } catch (e) {
      console.log(e)
    }
  })();
})();