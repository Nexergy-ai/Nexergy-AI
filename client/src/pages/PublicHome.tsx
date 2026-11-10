import { useRef, useEffect } from 'react';
import { Lock, Play, MessageSquare, ExternalLink, Mail } from 'lucide-react';

const ECOSYSTEM = [
  {
    group: 'Instituciones y desarrollo productivo',
    items: [
      { name: 'Consejo Federal de Inversiones (CFI)', logo: 'https://video.nexergy.ar/cfi.png' },
      { name: 'Gobierno de la Provincia de San Luis', logo: 'https://video.nexergy.ar/san-luis.png' },
    ],
  },
  {
    group: 'Ecosistema financiero',
    items: [
      { name: 'Banco Galicia', logo: 'https://video.nexergy.ar/galicia.png' },
      { name: 'Banco BBVA', logo: 'https://video.nexergy.ar/bbva.png' },
    ],
  },
  {
    group: 'Emprendimiento y desarrollo empresarial',
    items: [{ name: 'Fundación Endeavor', logo: 'https://video.nexergy.ar/endeavor.png' }],
  },
  {
    group: 'Referentes tecnológicos globales',
    items: [
      { name: 'Siemens', logo: 'https://video.nexergy.ar/siemens.png' },
      { name: 'ABB', logo: 'https://video.nexergy.ar/abb.png' },
      { name: 'Schneider Electric', logo: 'https://video.nexergy.ar/schneider.png' },
      { name: {/*'NVIDIA', logo: 'https://video.nexergy.ar/nvidia.png' */},
      { name: {/*'Microsoft', logo: 'https://video.nexergy.ar/microsoft.png' */},
      { name: {/*'GE Vernova', logo: 'https://video.nexergy.ar/ge-vernova.png' */},
      { name: 'Hitachi Energy', logo: 'https://video.nexergy.ar/hitachi.png' },
      { name: {/*'All Power Labs', logo: 'https://video.nexergy.ar/all-power-labs.png' */},
    ],
  },
];

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

  // Correo: mailto con asunto preconfigurado + fallback a Gmail si no hay cliente de mail
  const handleContact = () => {
    const subject = encodeURIComponent('Consulta desde la web Nexergy');
    const body = encodeURIComponent('Hola Nexergy, quiero más información sobre el proyecto.');
    const mailto = `mailto:contacto@nexergy.ar?subject=${subject}&body=${body}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=contacto@nexergy.ar&su=${subject}&body=${body}`;
    window.location.href = mailto;
    setTimeout(() => {
      if (!document.hidden && document.hasFocus()) {
        window.open(gmail, '_blank');
      }
    }, 1500);
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
       {/* <div className="mt-20 text-center">
          <p className="text-gray-400 text-sm mb-5 max-w-xl mx-auto">
            Todo empieza con el asistente web.
          </p> */}
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

        {/* ECOSISTEMA DE INNOVACIÓN */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Ecosistema de Innovación
            {/* </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Conectamos tecnología, instituciones, capital y talento.
            </h2>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
              En NEXERGY creemos que la innovación se construye a través de la colaboración y la
              articulación entre empresas, instituciones, organismos públicos, entidades financieras
              y referentes tecnológicos.
            </p>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed mt-3">
              Impulsamos relaciones estratégicas con actores del ecosistema productivo, científico,
              tecnológico y financiero, que contribuyen al desarrollo de nuevas oportunidades de
              negocio, la transferencia de conocimiento y la implementación de soluciones innovadoras.
            </p>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed mt-3">
              Nuestro ecosistema integra vínculos institucionales, profesionales y empresariales, junto
              con referentes tecnológicos globales que inspiran nuestra visión de una infraestructura
              energética más inteligente, eficiente y sostenible.
            </p>
          </div> */}

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
                          alt={it.name}
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
        <p>
          © 2026 <strong>OPTINEX S.A.S.</strong> — Todos los derechos reservados.— Para solicitar acceso autorizado al portal confidencial {' '}
          <a
            href="https://wa.me/5491178148534"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:underline font-bold transition-colors inline-block"
          >
            Celular +54 9 11 7814 8534
          </a>{' '}
          — 
        </p>
        <div className="flex items-center justify-center gap-4 text-sm pt-1">
          <button
            onClick={handleContact}
            className="text-[#00BFFF] hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            title="Escribinos: contacto@nexergy.ar"
          >
            <Mail className="w-4 h-4" />
            contacto@nexergy.ar
          </button>
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
