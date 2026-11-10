import { useRef, useEffect, memo } from 'react';
import { Lock, MessageSquare, ExternalLink, Mail } from 'lucide-react';

// ── Tipos ──────────────────────────────────────────────
interface EcosystemItem {
  name: string;
  logo?: string;
}
interface EcosystemGroup {
  group: string;
  items: EcosystemItem[];
}

// ── Datos ──────────────────────────────────────────────
const ECOSYSTEM: EcosystemGroup[] = [
  {
    group: 'Instituciones y desarrollo productivo',
    items: [
      { name: 'Consejo Federal de Inversiones (CFI)', logo: 'https://video.nexergy.ar/cfi.png' },
      { name: 'Banco Galicia', logo: 'https://video.nexergy.ar/galicia.png' },
      { name: 'Gobierno de la Provincia de San Luis', logo: 'https://video.nexergy.ar/san-luis.png' },
      { name: 'Banco BBVA', logo: 'https://video.nexergy.ar/bbva.png' },
      { name: 'Fundación Endeavor', logo: 'https://video.nexergy.ar/endeavor.png' },
    ],
  },
  {
    group: 'Referentes tecnológicos globales',
    items: [
      { name: 'Siemens', logo: 'https://video.nexergy.ar/siemens.png' },
      { name: 'ABB', logo: 'https://video.nexergy.ar/abb.png' },
      { name: 'Schneider Electric', logo: 'https://video.nexergy.ar/schneider.png' },
      { name: 'Hitachi Energy', logo: 'https://video.nexergy.ar/hitachi.png' },
    ],
  },
];

// ── Constantes ──────────────────────────────────────────
const VIDEO_SRC = 'https://video.nexergy.ar/nexergy_publichome_explainer.mp4.mp4'; // R2 — doble .mp4 intencional
const CONTACT_EMAIL = 'contacto@nexergy.ar';
const WHATSAPP_URL = 'https://wa.me/5491178148534';
const LINKTREE_URL = 'https://linktr.ee/nexergy.ar';
const PORTAL_URL = 'https://privado.nexergy.ar/';

// ── Declaración global para el asistente inyectado ────
declare global {
  interface Window {
    nexergyAsistenteOpen?: () => void;
  }
}

function PublicHome() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.23;
    v.play().catch(() => {});
  }, []);

  const openAssistant = () => {
    if (window.nexergyAsistenteOpen) {
      window.nexergyAsistenteOpen();
      return;
    }
    document.getElementById('nx-chat-btn')?.click();
  };

  // mailto semántico — el navegador abre el cliente de correo nativo
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    'Consulta desde la web Nexergy',
  )}&body=${encodeURIComponent('Hola Nexergy, quiero más información sobre el proyecto.')}`;

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans flex flex-col selection:bg-[#00BFFF] selection:text-[#070c1e]">
      {/* HEADER — siempre visible (sticky) */}
      <header className="sticky top-0 z-50 w-full py-6 px-8 flex justify-between items-center border-b border-white/5 bg-[#050814]/80 backdrop-blur-md">
        <button
          onClick={openAssistant}
          className="font-extrabold tracking-wider text-[#00BFFF] text-xl font-mono cursor-pointer hover:text-cyan-300 transition-colors"
          title="Abrir asistente"
        >
          NEXERGY<span className="text-white">®</span>
        </button>
        <a
          href={PORTAL_URL}
          className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/10"
        >
          <Lock className="w-3.5 h-3.5 text-purple-400" />
          Acceso Confidencial
        </a>
      </header>

      {/* HERO + VIDEO */}
      <main className="py-16 px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-xl md:text-3xl font-extrabold text-white mb-4">
            Transforme energía y residuos en rentabilidad mediante gestión inteligente y gemelos digitales.
          </h1>
        </div>

        {/* VIDEO R2 — autoplay, muted, loop, velocidad lenta (< 10 MB) */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/logo.png"
            className="w-full h-auto bg-black"
          >
            Tu navegador no soporta video HTML5.
          </video>
        </div>

        {/* CTA ASISTENTE */}
        <div className="mt-20 text-center">
          <button
            onClick={openAssistant}
            className="inline-flex items-center gap-2 bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#00BFFF]/20"
          >
            <MessageSquare className="w-5 h-5" />
            Empezar con el asistente
          </button>
        </div>

        {/* ECOSISTEMA DE INNOVACIÓN */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-4">
              Ecosistema de Innovación
            </h2>
          </div>

          <div className="space-y-10">
            {ECOSYSTEM.map((g) => (
              <div key={g.group}>
                <h3 className="text-sm font-bold tracking-wider text-[#00BFFF] uppercase mb-4 text-center">
                  {g.group}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {g.items.map((it) => (
                    <div
                      key={it.name}
                      className="flex items-center justify-center bg-[#0a0e27] border border-white/10 rounded-xl px-5 py-4 min-w-[140px] hover:border-[#00BFFF]/40 transition-colors"
                    >
                      {it.logo ? (
                        <img
                          src={it.logo}
                          alt={`Logo de ${it.name}`}
                          loading="lazy"
                          className="h-8 w-auto object-contain"
                          title={it.name}
                        />
                      ) : (
                        <span className="text-sm font-semibold text-gray-200 text-center">{it.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/5 bg-[#050814] text-center text-sm text-gray-500 space-y-2">
        {/* Renglón 1 — solo copyright */}
        <p>
          © 2026 <strong>OPTINEX S.A.S.</strong> — Todos los derechos reservados. — <strong>Para solicitar acceso
          autorizado al portal confidencial: </strong>
        </p>

        {/* Renglón 2 — Celular • Correo • Linktree */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm pt-1">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:underline font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.043z" />
            </svg>
            Celular +54 9 11 7814 8534
          </a>

          <span className="text-gray-700">•</span>

          <a
            href={mailtoHref}
            className="text-[#00BFFF] hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1.5"
            title="Escribinos: contacto@nexergy.ar"
          >
            <Mail className="w-4 h-4" />
            {CONTACT_EMAIL}
          </a>

          <span className="text-gray-700">•</span>

          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00BFFF] hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1.5"
          >
            Linktree <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default memo(PublicHome);
