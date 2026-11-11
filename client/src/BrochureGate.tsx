import { useState, useRef, useEffect } from 'react';
import { ShieldCheck, FileText, Mail, ArrowRight, CheckCircle2, Lock, Building2, Leaf, TrendingUp, Globe2 } from 'lucide-react';

// ── Constantes ──────────────────────────────────────────
const TURNSTILE_SITE_KEY = '0x4AAAAAAF8GDi-q_0ZpPWbn';

const WORKER_URL = 'https://brochure-access.inglopezjj.workers.dev/api/brochure';
const WORKER_ORIGIN = 'https://brochure-access.inglopezjj.workers.dev';
const CONTACT_EMAIL = 'contacto@nexergy.ar';

// ── Datos: Teaser del brochure (sin información sensible) ─
const TEASER_SECTIONS = [
  {
    icon: Building2,
    title: 'Modelo de negocio',
    points: [
      'Plataforma B2B con licenciamiento por nodo productivo',
      'Tres unidades de negocio: software, biochar y créditos de carbono',
      'Ingresos recurrentes por suscripción + ingresos por producción',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Oportunidad de mercado',
    points: [
      'Mercado argentino de bioenergía en expansión acelerada',
      'Expansión confirmada hacia Brasil (softlanding en São Paulo)',
      'Demanda creciente de créditos de remoción de carbono (dCORs)',
    ],
  },
  {
    icon: Leaf,
    title: 'Propuesta de valor',
    points: [
      'Gemelos digitales para optimización energética en tiempo real',
      'Transformación de residuos agroindustriales en biochar comercializable',
      'Reducción medible de huella de carbono certificable',
    ],
  },
  {
    icon: Globe2,
    title: 'Roadmap de expansión',
    points: [
      'Validación en laboratorio completada',
      'Pruebas en entorno real en curso',
      'Despliegue en pilotos industriales como próxima etapa',
      'Escalamiento comercial con certificación y Data Room',
    ],
  },
];

const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'yahoo.com.ar',
  'protonmail.com', 'proton.me', 'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'zoho.com', 'mail.com', 'gmx.com', 'yandex.com',
  'live.com', 'msn.com', 'earthlink.net', 'comcast.net', 'bellsouth.net',
  'googlemail.com', 'hotmail.es', 'outlook.es', 'yahoo.es',
];

function isFreeEmailDomain(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) return true;
  return FREE_EMAIL_DOMAINS.includes(domain);
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function BrochureGate() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!(window as any).turnstile) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => renderTurnstile();
    } else {
      renderTurnstile();
    }
  }, []);

  const renderTurnstile = () => {
    if (!turnstileRef.current) return;
    (window as any).turnstile?.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Ingresá tu nombre.');
      return;
    }
    if (!email.trim()) {
      setError('Ingresá tu email corporativo.');
      return;
    }
    if (isFreeEmailDomain(email)) {
      setError('Usá un email de dominio corporativo (no se aceptan gmail, hotmail, etc.).');
      return;
    }
    if (!turnstileToken) {
      setError('Completá la verificación de seguridad.');
      return;
    }

    setFormState('submitting');
    try {
      const res = await fetch(`${WORKER_URL}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'email',
          name: name.trim(),
          email: email.trim().toLowerCase(),
          pdfType: 'intermedio',
          turnstileToken,
        }),
      });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error('El servidor no respondió correctamente.'); }
      if (!data.ok) throw new Error(data.error || 'Error al procesar');
      setPdfUrl(WORKER_ORIGIN + data.pdfUrl);
      setFormState('success');
    } catch (err: any) {
      setError(err.message || 'Error al procesar la solicitud.');
      setFormState('error');
    }
  };

  // ── Estado: éxito ─────────────────────────────────────
  if (formState === 'success') {
    return (
      <div className="min-h-screen bg-[#070c1e] text-white font-sans flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3">¡Acceso concedido!</h2>
          <p className="text-gray-400 text-sm mb-8">
            Gracias, <strong className="text-white">{name}</strong>. Tu solicitud fue registrada.
            A continuación podés descargar el brochure.
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#00BFFF]/20"
          >
            <FileText className="w-5 h-5" />
            Descargar Brochure
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-bold transition-colors mt-4"
          >
            ← Volver al inicio
          </a>
          <p className="text-xs text-gray-600 mt-6">
            El enlace es válido por 30 minutos. Para consultas: {CONTACT_EMAIL}
          </p>
        </div>
      </div>
    );
  }

  // ── Página principal: teaser + formulario ────────────
  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full py-4 px-6 md:px-8 flex justify-between items-center border-b border-white/5 bg-[#050814]/80 backdrop-blur-md">
       <a href="/" className="font-extrabold tracking-wider text-[#00BFFF] text-xl font-mono hover:text-cyan-300 transition-colors">
        NEXERGY<span className="text-white">®</span>
        </a>
        <a href="/" className="text-gray-400 hover:text-white text-xs font-bold transition-colors">
          ← Volver al inicio
        </a>
      </header>

      <main className="py-12 px-6 max-w-4xl mx-auto w-full">
        {/* Badge de confianza */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#00BFFF]/10 border border-[#00BFFF]/30 px-4 py-1.5 rounded-full text-xs font-mono text-[#00BFFF] mb-6 shadow-md">
            <ShieldCheck className="w-4 h-4 text-[#00BFFF]" />
            <span>Acceso restringido · OPTINEX S.A.S. · Patente USPTO PPA Nº 64/181,819</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
            Brochure Institucional y Tesis de Inversión
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Información extendida para inversores, organismos y socios estratégicos.
            Para acceder al documento completo, validá tu identidad.
          </p>
        </div>

        {/* Teaser: qué incluye el brochure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {TEASER_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#00BFFF]" />
                  </div>
                  <h3 className="text-base font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.points.map((point, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-[#00BFFF] mt-0.5 shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Formulario de acceso */}
        <div className="max-w-md mx-auto">
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-[#00BFFF]" />
              <h2 className="text-lg font-bold text-white">Validar acceso</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Nombre y apellido
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#070c1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#00BFFF]/50 focus:outline-none"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Email corporativo
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070c1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#00BFFF]/50 focus:outline-none"
                  placeholder="nombre@empresa.com"
                />
                <p className="text-xs text-gray-600 mt-1.5">
                  No se aceptan correos gratuitos (gmail, hotmail, etc.)
                </p>
              </div>

              {/* Turnstile */}
              <div ref={turnstileRef} className="min-h-[65px]" />

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full flex items-center justify-center gap-2 bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00BFFF]/20"
              >
                {formState === 'submitting' ? (
                  'Procesando...'
                ) : (
                  <>
                    Acceder al brochure
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-600 mt-4">
            Al acceder aceptás ser contactado por OPTINEX S.A.S. con fines informativos.
            Tus datos no se comparten con terceros.
          </p>
        </div>
      </main>
    </div>
  );
}
