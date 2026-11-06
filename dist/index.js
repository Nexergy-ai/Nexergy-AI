const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";

const SYSTEM_PROMPT = (biz) => `Sos el asistente virtual de ${biz}, una empresa de innovación energética (proyecto CFI Innova).
Tu único objetivo es PRE-CALIFICAR visitantes interesados y capturar sus datos de contacto.

Reglas:
- Respondé SIEMPRE en español, en tono profesional, cálido y conciso (máximo 3 frases por mensaje).
- Hacé UNA sola pregunta a la vez. No pidas todo de golpe.
- Seguí este orden de preguntas, solo avanzá cuando tengas la respuesta anterior:
  1. ¿En qué estás interesado de ${biz}? (ofrecé: información del proyecto, inversión/alianza, contacto comercial, otro)
  2. ¿Cuál es tu nombre?
  3. ¿Cuál es tu email de contacto?
  4. ¿Tenés algún plazo o presupuesto definido? (opcional)
- NUNCA inventes datos del proyecto. Si no sabés algo, decí que un humano del equipo les contactará.
- Cuando tengas nombre + email, agradecé y decí: "¡Gracias! Alguien del equipo de ${biz} se va a comunicar con vos a la brevedad."
- No respondas preguntas fuera de tema; redirigí con amabilidad al objetivo del proyecto.`;

function cors() {
  return new Response(null, {
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
    },
  });
}

function extractEmail(text) {
  const m = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return m ? m[0] : null;
}

function extractName(history) {
  for (const m of history) {
    if (m.role !== "user") continue;
    const match = m.content.match(/(?:me llamo|soy|mi nombre es)\s+([a-záéíóúñ]{2,}(\s[a-záéíóúñ]{2,})?)/i);
    if (match) return match[1].trim();
  }
  return null;
}

async function sendTelegram(env, text) {
  if (!env.TG_BOT_TOKEN || !env.TG_CHAT_ID) return false;
  try {
    const r = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text, parse_mode: "HTML" }),
    });
    return r.ok;
  } catch (e) {
    console.error("Telegram falló:", e.message);
    return false;
  }
}

async function handleChat(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "JSON inválido" }, 400);
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  const biz = env.BUSINESS_NAME || "Nexergy";

  const messages = [
    { role: "system", content: SYSTEM_PROMPT(biz) },
    ...history.slice(-12).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || ""),
    })),
  ];

  let reply;
  try {
    const res = await env.AI.run(MODEL, { messages });
    reply = typeof res === "string" ? res : res.response || res.result || "";
  } catch (e) {
    return json({ error: "No pude generar respuesta: " + e.message }, 502);
  }

  const fullText = history.map((m) => m.content).join(" ") + " " + reply;
  const email = extractEmail(fullText);
  let lead_captured = false;

  if (email) {
    const name = extractName(history) || "Interesado";
    const convo = history.map((m) => `${m.role === "user" ? "👤" : "🤖"} ${m.content}`).join("\n");
    const text =
      `🟢 <b>Nuevo lead calificado — ${biz}</b>\n\n` +
      `<b>Nombre:</b> ${name}\n<b>Email:</b> ${email}\n\n` +
      `<b>Conversación:</b>\n${convo}\n\n<b>🤖 ${reply}</b>`;
    lead_captured = await sendTelegram(env, text);
  }

  return json({ reply, lead_captured, email: lead_captured ? email : undefined });
}

const WIDGET_JS = `
(function(){
  var ORIGIN = (window.NEXERGY_ASISTENTE_ORIGIN || "").replace(/\\/$/,"");
  if(!ORIGIN){ console.error("Definí window.NEXERGY_ASISTENTE_ORIGIN con la URL del Worker"); return; }
  var open=false;
  var btn=document.createElement("div");
  btn.id="nx-chat-btn";
  btn.innerHTML="💬";
  Object.assign(btn.style,{position:"fixed",bottom:"20px",right:"20px",width:"58px",height:"58px",borderRadius:"50%",background:"#36d399",color:"#0b1220",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,.3)",zIndex:"2147483000",transition:"transform .2s"});
  btn.onmouseover=function(){btn.style.transform="scale(1.08)"};btn.onmouseout=function(){btn.style.transform="scale(1)"};

  var box=document.createElement("div");
  Object.assign(box.style,{position:"fixed",bottom:"90px",right:"20px",width:"340px",maxWidth:"calc(100vw - 40px)",height:"460px",maxHeight:"calc(100vh - 120px)",background:"#0b1220",border:"1px solid #1c2a40",borderRadius:"14px",display:"none",flexDirection:"column",zIndex:"2147483000",fontFamily:"system-ui,sans-serif",overflow:"hidden"});
  box.innerHTML='<div style="padding:12px 14px;background:#111c2e;color:#e6edf3;font-weight:600">Asistente Nexergy</div><div id="nx-msgs" style="flex:1;overflow-y:auto;padding:12px;color:#e6edf3;font-size:14px;line-height:1.5"></div><div style="display:flex;padding:10px;border-top:1px solid #1c2a40"><input id="nx-in" style="flex:1;background:#0b1220;border:1px solid #1c2a40;color:#e6edf3;borderRadius:8px;padding:8px 10px;outline:none"/><button id="nx-send" style="margin-left:8px;background:#36d399;border:none;borderRadius:8px;padding:0 12px;cursor:pointer;color:#0b1220;font-weight:600">Enviar</button></div>';

  document.body.appendChild(box);document.body.appendChild(btn);
  btn.onclick=function(){open=!open;box.style.display=open?"flex":"none";if(open)document.getElementById("nx-in").focus();};
  window.nexergyAsistenteOpen=function(){open=true;box.style.display="flex";document.getElementById("nx-in").focus();};

  var msgs=[];var busy=false;
  var el=document.getElementById("nx-msgs");
  function add(text,who){var d=document.createElement("div");d.style.marginBottom="8px";d.innerHTML=(who==="bot"?"🤖 ":"🧑 ")+text;el.appendChild(d);el.scrollTop=el.scrollHeight;}
  add("¡Hola! Soy el asistente de Nexergy. ¿En qué estás interesado?","bot");

  async function send(){
    if(busy)return;var inp=document.getElementById("nx-in");var t=inp.value.trim();if(!t)return;
    add(t,"user");inp.value="";busy=true;
    msgs.push({role:"user",content:t});
    try{
      var r=await fetch(ORIGIN+"/api/chat",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({messages:msgs})});
      var d=await r.json();
      if(d.error){add("Hubo un problema. Probá de nuevo.","bot");}
      else{add(d.reply,"bot");msgs.push({role:"assistant",content:d.reply});
        if(d.lead_captured){add("✅ Tu consulta fue enviada al equipo de Nexergy.","bot");}
      }
    }catch(e){add("Error de conexión.","bot");}
    busy=false;
  }
  document.getElementById("nx-send").onclick=send;
  document.getElementById("nx-in").addEventListener("keydown",function(e){if(e.key==="Enter")send();});
})();
`;

const DEMO_HTML = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Asistente Nexergy</title>
<style>body{font-family:system-ui,sans-serif;background:#0b1220;color:#e6edf3;margin:0;padding:2rem}h1{color:#36d399}.card{background:#111c2e;border:1px solid #1c2a40;border-radius:14px;padding:1.4rem;max-width:680px;margin:1rem auto}.muted{color:#8b98a9}</style></head>
<body><div class="card"><h1>Asistente de Nexergy</h1><p>Worker activo con notificaciones a Telegram.</p>
<p class="muted">El botón flotante de chat aparecerá abajo a la derecha.</p></div>
<script>window.NEXERGY_ASISTENTE_ORIGIN=location.origin;</script>
<script src="/widget.js"></script>
</body></html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return cors();
    if (url.pathname === "/api/chat") return handleChat(request, env);
    if (url.pathname === "/widget.js")
      return new Response(WIDGET_JS, { headers: { "content-type": "application/javascript; charset=utf-8", "access-control-allow-origin": "*" } });
    if (url.pathname === "/")
      return new Response(DEMO_HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    return new Response("Not found", { status: 404 });
  },
};
