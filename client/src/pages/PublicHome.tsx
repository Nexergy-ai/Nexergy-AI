import { useRef, useEffect } from 'react';
import { Lock, Play, MessageSquare, ExternalLink } from 'lucide-react';

export default function PublicHome() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.playbackRate = 0.23; // un poco más lento
      v.play().catch(() => {});
    }
  }, []);

  const openAssistant = () => {
    if (typeof window !== 'undefined' && (window as any).nexergyAsistenteOpen) {
      (window as any).nexergyAsistenteOpen();
    } else {
      const btn = document.getElementById('nx-chat-btn');
      if (btn) (btn as HTMLElement).click();
    }
  };

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans flex flex-col justify-between selection:bg-[#00BFFF] selection:text-[#070c1e]">
      {/* HEADER */}
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-white/5 bg-[#050814]/80 backdrop-blur-md">
        <span className="font-extrabold tracking-wider text-[#00BFFF] text-xl font-mono">
          NEXERGY<span className="text-white">®</span>
        </span>
        <a
          href="https://privado.nexergy.ar/"
          className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/10"
        >
          <Lock className="w-3.5 h-3.5 text-purple-400" />
          Acceso Confidencial
        </a>
      </header>

      {/* HERO + VIDEO */}
      <main className="py-16 px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
            {/* Nexergy® */}
          </span>
          <h1 className="text-xl md:text-3xl font-extrabold text-white mb-4">
            Transforme energía y residuos en rentabilidad mediante gestión inteligente y gemelos digitales.
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            {/* Mirá en 1 minuto cómo Nexergy optimiza tu energía y costos asociados */}
          </p>
        </div>

        {/* VIDEO R2 — autoplay, muted, loop, velocidad lenta */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <video
            ref={videoRef}
            src="https://video.nexergy.ar/nexergy_publichome_explainer.mp4.mp4"
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
          <p className="text-gray-400 text-sm mb-5 max-w-xl mx-auto">
            Todo empieza con el asistente web.
          </p>
          <button
            onClick={openAssistant}
            className="inline-flex items-center gap-2 bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#00BFFF]/20"
          >
            <MessageSquare className="w-5 h-5" />
            Empezar con el asistente
          </button>
          <p className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1.5">
            {/* <Play className="w-3 h-3" />
             FOOTER También podés tocar el botón 💬 abajo a la derecha */}
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/5 bg-[#050814] text-center text-sm text-gray-500 space-y-2">
        <p>
          © 2026 <strong>OPTINEX S.A.S.</strong> — CUIT 30-71945566-9 —{' '}
          <a
            href="https://wa.me/5491178148534"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:underline font-bold transition-colors inline-block"
          >
            Celular +54 9 11 7814 8534
          </a>{' '}
          — Todos los derechos reservados.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm pt-1">
          <span className="text-emerald-400 font-medium inline-flex items-center gap-1.5">
            contacto@nexergy.ar
          </span>
          <span className="text-gray-700">•</span>
          <a
            href="https://linktr.ee/nexergy.ar"
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
