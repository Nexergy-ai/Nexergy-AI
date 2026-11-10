import { useRef, useEffect, memo } from 'react';
import { Lock, MessageSquare, ExternalLink, Mail, FileText, ShieldCheck, Users, Rocket, Briefcase, Globe, Scale } from 'lucide-react';

// ── Tipos ──────────────────────────────────────────────
interface EcosystemItem {
  name: string;
  logo?: string;
}
interface EcosystemGroup {
  group: string;
  items: EcosystemItem[];
}
interface TeamMember {
  name: string;
  role: string;
  initials: string;
  credentials: string;
  focus: string;
}
interface LifecycleStage {
  label: string;
  status: 'done' | 'current' | 'next';
  description: string;
}
interface Advisor {
  name: string;
  area: string;
  role: string;
  focus: string;
  icon: 'briefcase' | 'globe' | 'scale';
}

// ── Datos: Ecosistema ──────────────────────────────────
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

// ── Datos: Equipo ──────────────────────────────────────
const TEAM: TeamMember[] = [
  {
    name: 'Dr. Ing. Jonathan Bosso',
    role: 'CEO & Director Ejecutivo',
    initials: 'JB',
    credentials: 'Doctor en Ingeniería (UNRC) · Investigador CONICET',
    focus: '15 años en electrónica de potencia y microredes. Co-inventor de la patente USPTO.',
  },
  {
    name: 'Mgtr. Ing. Juan José López',
    role: 'CTO & Representante Legal',
    initials: 'JL',
    credentials: 'Magíster en Ingeniería de Software (UNSL)',
    focus: '14 años en industria (ADG, MABE). Experto en SCADA/IoT y Cloud Edge. Co-inventor.',
  },
  {
    name: 'Dr. Eduardo Guerrero',
    role: 'CSO & Director Científico',
    initials: 'EG',
    credentials: 'Doctor en Química (UNSL) · Ex Gerente I+D en Colgate y Bayer',
    focus: 'Master Black Belt. Especialista en biomasa e hidrógeno. Co-inventor.',
  },
];

// ── Datos: Gobernanza & Alianzas Estratégicas ──────────
const ADVISORS: Advisor[] = [
  {
    name: 'Estudio Arcondo & Asociados',
    area: 'Argentina',
    role: 'Contabilidad corporativa y fiscal',
    focus: 'Encuadre bajo Ley de Economía del Conocimiento (27.506) y gestión MiPyME.',
    icon: 'briefcase',
  },
  {
    name: 'Brasil Fácil MX',
    area: 'Brasil · São Paulo',
    role: 'Softlanding y expansión regional',
    focus: 'Estructuración legal, registro fiscal y acompañamiento corporativo para el ingreso al mercado brasileño.',
    icon: 'globe',
  },
  {
    name: 'Estudio Legal · Propiedad Intelectual',
    area: 'Internacional',
    role: 'Patentes y marcas',
    focus: 'Asesoría especializada en patentes USPTO y registro de marcas INPI.',
    icon: 'scale',
  },
];

// ── Datos: Ciclo de vida ───────────────────────────────
const LIFECYCLE: LifecycleStage[] = [
  {
    label: 'Validación en laboratorio',
    status: 'done',
    description: 'Núcleo tecnológico desarrollado, arquitectura de software definida y calibración de datos de biomasa.',
  },
  {
    label: 'Pruebas en entorno real',
    status: 'current',
    description: 'Prototipo funcional en ensayos con equipos industriales. Postulación al Programa Innova CFI en curso.',
  },
  {
    label: 'Despliegue en pilotos industriales',
    status: 'next',
    description: 'Validación en vivo en nodos productivos de campo: agroindustria y energías renovables.',
  },
  {
    label: 'Certificación y escalamiento comercial',
    status: 'next',
    description: 'Certificación final del producto, endurecimiento de ciberseguridad y apertura de Data Room para inversores.',
  },
];

// ── Constantes ──────────────────────────────────────────
const VIDEO_SRC = 'https://video.nexergy.ar/nexergy_publichome_explainer.mp4.mp4';
const CONTACT_EMAIL = 'contacto@nexergy.ar';
const WHATSAPP_URL = 'https://wa.me/5491178148534';
const LINKTREE_URL = 'https://linktr.ee/nexergy.ar';
const PORTAL_URL = 'https://privado.nexergy.ar/';
const BROCHURE_PDF_URL = 'https://video.nexergy.ar/Brochure_Hibrido_Completo_NEXERGY.pdf';

// ── Declaración global para el asistente inyectado ────
declare global {
  interface Window {
    nexergyAsistenteOpen?: () => void;
  }
}

// ── Componente: Tarjeta de equipo ──────────────────────
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center text-center bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-[#00BFFF]/40 transition-colors">
      <div className="w-16 h-16 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center mb-4">
        <span className="text-xl font-extrabold text-[#00BFFF] font-mono">{member.initials}</span>
      </div>
      <h4 className="text-base font-bold text-white mb-1">{member.name}</h4>
      <span className="text-xs font-bold text-[#00BFFF] uppercase tracking-wider mb-3">{member.role}</span>
      <p className="text-xs text-gray-400 mb-2 leading-relaxed">{member.credentials}</p>
      <p className="text-sm text-gray-300 leading-relaxed">{member.focus}</p>
    </div>
  );
}

// ── Componente: Tarjeta de asesor ───────────────────────
const ADVISOR_ICONS = {
  briefcase: Briefcase,
  globe: Globe,
  scale: Scale,
} as const;

function AdvisorCard({ advisor }: { advisor: Advisor }) {
  const Icon = ADVISOR_ICONS[advisor.icon];
  return (
    <div className="flex flex-col bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-[#00BFFF]/40 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[#00BFFF]" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white leading-tight">{advisor.name}</h4>
          <span className="text-xs text-purple-300 font-mono">{advisor.area}</span>
        </div>
      </div>
      <span className="text-xs font-bold text-[#00BFFF] uppercase tracking-wider mb-2">{advisor.role}</span>
      <p className="text-sm text-gray-400 leading-relaxed">{advisor.focus}</p>
    </div>
  );
}

// ── Componente: Etapa del ciclo de vida ─────────────────
const STATUS_STYLES: Record<LifecycleStage['status'], { dot: string; text: string; border: string }> = {
  done: { dot: 'bg-green-500', text: 'text-green-400', border: 'border-green-500/30' },
  current: { dot: 'bg-[#00BFFF] animate-pulse', text: 'text-[#00BFFF]', border: 'border-[#00BFFF]/40' },
  next: { dot: 'bg-gray-600', text: 'text-gray-500', border: 'border-white/10' },
};

function LifecycleStep({ stage, isLast }: { stage: LifecycleStage; isLast: boolean }) {
  const s = STATUS_STYLES[stage.status];
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 ${s.border} ${s.dot} shrink-0 mt-1`} />
        {!isLast && <div className="w-px flex-1 bg-white/10 mt-2" />}
      </div>
      <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
        <div className="flex items-center gap-3 mb-1">
          <span className={`text-base font-bold ${stage.status === 'current' ? 'text-white' : 'text-gray-400'}`}>
            {stage.label}
          </span>
          {stage.status === 'current' && (
            <span className="text-xs bg-[#00BFFF]/10 text-[#00BFFF] px-2 py-0.5 rounded-full font-mono">
              etapa actual
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{stage.description}</p>
      </div>
    </div>
  );
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

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    'Consulta desde la web Nexergy',
  )}&body=${encodeURIComponent('Hola Nexergy, quiero más información sobre el proyecto y la ronda de inversión.')}`;

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans flex flex-col selection:bg-[#00BFFF] selection:text-[#070c1e]">
      {/* HEADER — siempre visible (sticky) */}
      <header className="sticky top-0 z-50 w-full py-4 px-6 md:px-8 flex justify-between items-center border-b border-white/5 bg-[#050814]/80 backdrop-blur-md">
        <button
          onClick={openAssistant}
          className="font-extrabold tracking-wider text-[#00BFFF] text-xl font-mono cursor-pointer hover:text-cyan-300 transition-colors"
          title="Abrir asistente"
        >
          NEXERGY<span className="text-white">®</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href={BROCHURE_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all items-center gap-1.5 shadow-lg shadow-cyan-500/10"
            title="Ver Brochure y Tesis de Inversión"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Deck / Brochure</span>
          </a>

          <a
            href={PORTAL_URL}
            className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/10"
          >
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>Acceso Confidencial</span>
          </a>
        </div>
      </header>

      {/* HERO + VIDEO */}
      <main className="py-12 px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          {/* Badge de Patente Internacional */}
          <div className="inline-flex items-center gap-2 bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-4 py-1.5 rounded-full text-xs font-mono text-[#00BFFF] mb-6 shadow-md">
            <ShieldCheck className="w-4 h-4 text-[#00BFFF]" />
            <span>USPTO Provisional PPA N.º 64/181,819 • INPI Reg. Nº 3.941.093</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Transforme energía y residuos en rentabilidad mediante gestión inteligente y gemelos digitales.
          </h1>

          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Plataforma de orquestación multi-vectorial con validación industrial.{' '}
            <strong className="text-gray-200">Postulación al Programa Innova CFI en curso</strong> para escalar hacia el despliegue comercial.
          </p>
        </div>

        {/* VIDEO R2 — autoplay, muted, loop */}
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
        <div className="mt-16 text-center">
          <button
            onClick={openAssistant}
            className="inline-flex items-center gap-2 bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#00BFFF]/20"
          >
            <MessageSquare className="w-5 h-5" />
            Empezar con el asistente
          </button>
        </div>

        {/* ── SECCIÓN: CICLO DE VIDA ── */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[#00BFFF] mb-3">
              <Rocket className="w-5 h-5" />
              <span className="text-xs font-bold font-mono tracking-widest uppercase">Nuestra Trayectoria</span>
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-4">
              OPTINEX S.A.S. — Empresa de Base Tecnológica
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              De la validación en laboratorio al despliegue industrial. Ronda pre-seed abierta para llegar a la etapa comercial.
            </p>
          </div>

          {/* Timeline vertical */}
          <div className="max-w-2xl mx-auto">
            {LIFECYCLE.map((stage, i) => (
              <LifecycleStep key={stage.label} stage={stage} isLast={i === LIFECYCLE.length - 1} />
            ))}
          </div>

          {/* Indicadores clave */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-5 text-center">
              <p className="text-lg font-extrabold text-[#00BFFF]">Pruebas en campo</p>
              <p className="text-xs text-gray-400 mt-1">Etapa actual</p>
            </div>
            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-5 text-center">
              <p className="text-lg font-extrabold text-[#00BFFF]">Pre-seed</p>
              <p className="text-xs text-gray-400 mt-1">Ronda de inversión abierta</p>
            </div>
            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-5 text-center">
              <p className="text-lg font-extrabold text-[#00BFFF]">2036</p>
              <p className="text-xs text-gray-400 mt-1">Marca INPI vigente</p>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN: EQUIPO ── */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[#00BFFF] mb-3">
              <Users className="w-5 h-5" />
              <span className="text-xs font-bold font-mono tracking-widest uppercase">Equipo Fundador</span>
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-4">
              Liderazgo técnico y científico
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Tres co-inventores con +40 años combinados en ingeniería de potencia, software industrial y química de biomasa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* ── SECCIÓN: GOBERNANZA & ALIANZAS ESTRATÉGICAS ── */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-purple-300 mb-3">
              <Scale className="w-5 h-5" />
              <span className="text-xs font-bold font-mono tracking-widest uppercase">Gobernanza & Alianzas</span>
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-4">
              Respaldo institucional y cumplimiento
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Asesores externos y estudios estratégicos que garantizan rigor contable, legal y fiscal
              en Argentina y en la expansión hacia Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADVISORS.map((advisor) => (
              <AdvisorCard key={advisor.name} advisor={advisor} />
            ))}
          </div>
        </section>

        {/* ── SECCIÓN: ECOSISTEMA ── */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-4">
              Con quiénes trabajamos
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Instituciones, entidades financieras y referentes tecnológicos que nos acompañan en el camino
              hacia el despliegue comercial. Cada vínculo suma: validación institucional, acceso a capital,
              infraestructura de ensayo y escalabilidad industrial.
            </p>
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
        <p>
          © 2026 <strong>OPTINEX S.A.S.</strong> — Todos los derechos reservados. —{' '}
          <strong>Para solicitar acceso autorizado al portal confidencial: </strong>
        </p>

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
