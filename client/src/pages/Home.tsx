import { useState } from 'react';
import type { ComponentType } from 'react';
import {
  Zap, Cpu, Leaf, Building2, Send, CheckCircle2, AlertCircle, ArrowRight,
  Loader2, Globe, MapPin, Activity, ExternalLink, AtSign, ShieldCheck, FlaskConical, FileText,
} from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Navigation } from '@/components/Navigation';

type UnitId = 'flex' | 'agro' | 'ev' | 'systems';

interface Unit {
  id: UnitId;
  Icon: ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  selector: string;
  cta: string;
  description: string;
  bullets: string[];
  patent?: boolean;
  card: string;
  iconBox: string;
  text: string;
  check: string;
  btn: string;
  active: string;
}

const UNITS: Unit[] = [
  {
    id: 'flex',
    Icon: Cpu,
    tag: 'Nexergy Flex',
    title: 'Energía bidireccional',
    selector: 'Nexergy Flex',
    cta: 'Consultar Nexergy Flex',
    description:
      'Convertidores de potencia (SST/VSC) y motor de control adaptativo para la orquestación y gestión de flexibilidad energética.',
    bullets: ['Control bidireccional SST / VSC', 'Gestión de flexibilidad y excedentes', 'Optimización BESS e hidrógeno'],
    patent: true,
    card: 'border-purple-500/40 hover:border-purple-400',
    iconBox: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    text: 'text-purple-400',
    check: 'text-purple-400',
    btn: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-500/40',
    active: 'bg-purple-500/20 border-purple-500 text-purple-400',
  },
  {
    id: 'agro',
    Icon: Leaf,
    tag: 'Nexergy Agro',
    title: 'Bioenergía y biomasa',
    selector: 'Agro y bioenergía',
    cta: 'Consultar Agro',
    description:
      'Transformamos rastrojos, cáscaras, efluentes y subproductos agroindustriales en energía limpia, calor, electricidad y biochar.',
    bullets: ['Biomass Intelligence y mapeo', 'Gasificación y cogeneración', 'Economía circular y reducción de CO₂'],
    card: 'border-white/10 hover:border-[#00BFFF]/50',
    iconBox: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    text: 'text-emerald-400',
    check: 'text-emerald-400',
    btn: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    active: 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
  },
  {
    id: 'ev',
    Icon: Zap,
    tag: 'Nexergy EV Charge',
    title: 'Movilidad eléctrica',
    selector: 'EV Charge',
    cta: 'Consultar EV Charge',
    description:
      'Estaciones de carga para vehículos eléctricos con energía solar o eólica y almacenamiento, para barrios privados e industrias.',
    bullets: ['Cargadores AC/DC inteligentes', 'Integración solar y BESS', 'Plusvalía para comunidades'],
    card: 'border-white/10 hover:border-[#00BFFF]/50',
    iconBox: 'bg-cyan-500/10 border-cyan-500/30 text-[#00BFFF]',
    text: 'text-[#00BFFF]',
    check: 'text-[#00BFFF]',
    btn: 'bg-[#00BFFF]/10 hover:bg-[#00BFFF]/20 text-[#00BFFF] border-[#00BFFF]/30',
    active: 'bg-[#00BFFF]/20 border-[#00BFFF] text-[#00BFFF]',
  },
  {
    id: 'systems',
    Icon: Activity,
    tag: 'Nexergy Systems',
    title: 'Sistemas y cumplimiento',
    selector: 'Systems y Twin',
    cta: 'Consultar Systems',
    description:
      'Digital Twin, auditoría energética y estructura legal-financiera autofinanciada con el ahorro generado (alianza Arcondo & Asoc.).',
    bullets: [
      'Modelado Digital Twin e Industria 4.0',
      'Res. CRPEE 13/2012 e ISO 50001',
      'Esquema financiable con el ahorro generado',
    ],
    card: 'border-white/10 hover:border-[#00BFFF]/50',
    iconBox: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    text: 'text-amber-400',
    check: 'text-amber-400',
    btn: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30',
    active: 'bg-amber-500/20 border-amber-500 text-amber-400',
  },
];

const inputClass =
  'w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 pl-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]';
const labelClass = 'block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2';

type Feedback = { type: 'success' | 'error'; text: string } | null;

export default function Home() {
  const [selectedUnit, setSelectedUnit] = useState<UnitId>('flex');
  const [companyDomain, setCompanyDomain] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [plantLocation, setPlantLocation] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const domain = companyDomain.trim();
    const email = contactEmail.trim();

    if (!domain) {
      setFeedback({ type: 'error', text: 'Ingresa el dominio de tu empresa para continuar.' });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFeedback({ type: 'error', text: 'Ingresa un correo válido para que podamos responderte.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const summaryText = `[Unidad: ${selectedUnit.toUpperCase()}] Dominio: ${domain} | Correo: ${email} | Ubicación/Maps: ${
        plantLocation.trim() || 'No especificada'
      } | Nota: ${message.trim() || 'Sin mensaje'}`;

      await createIngestionMutation.mutateAsync({ sourceName: summaryText });

      setFeedback({
        type: 'success',
        text: `Registramos la instalación de ${domain}. Revisaremos los datos y te escribiremos a ${email}.`,
      });
      setCompanyDomain('');
      setContactEmail('');
      setPlantLocation('');
      setMessage('');
    } catch (error) {
      console.error('Error al registrar la instalación:', error);
      setFeedback({
        type: 'error',
        text: 'No pudimos registrar la instalación. Revisa tu conexión e inténtalo de nuevo en unos minutos.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans selection:bg-[#00BFFF] selection:text-[#070c1e]">
      <Navigation />

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20">
              <Globe className="w-3.5 h-3.5" />
              EBT OPTINEX S.A.S. · CUIT 30-71945566-9
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Marca Reg. INPI Nº 3.941.093 · Solicitud de Patente USPTO
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Convertimos tus desafíos energéticos en{' '}
            <span className="text-[#00BFFF] bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#00BFFF] md:via-cyan-300 md:to-teal-300 print:text-[#00BFFF]">
              soluciones reales
            </span>
            .
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Ingeniería, electrónica de potencia e inteligencia operacional para transformar biomasa, integrar movilidad
            eléctrica y orquestar excedentes energéticos con tecnología propietaria desarrollada por OPTINEX S.A.S.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contacto"
              className="w-full sm:w-auto bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-[#00BFFF]/20 flex items-center justify-center gap-2"
            >
              Iniciar alta de instalación
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#unidades"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              Ver unidades de negocio
            </a>
          </div>
        </div>
      </section>

      {/* UNIDADES */}
      <section id="unidades" className="py-24 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3">
              Brochure institucional
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">
              Unidades especializadas de ingeniería y tecnología
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UNITS.map((u) => (
              <div
                key={u.id}
                className={`bg-[#0a0e27] border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden ${u.card}`}
              >
                {u.patent && (
                  <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-purple-500/30">
                    PATENT PENDING
                  </div>
                )}
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${u.iconBox}`}>
                    <u.Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${u.text}`}>{u.tag}</span>
                  <h4 className="text-xl font-bold text-white mt-1 mb-2">{u.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{u.description}</p>

                  {u.patent && (
                    <div className="p-2.5 mb-5 rounded bg-purple-950/40 border border-purple-500/20 text-[10px] font-mono text-purple-300">
                      Patent pending · Solicitud provisional USPTO Nº 64/181,819
                    </div>
                  )}

                  <ul className="space-y-2 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-3">
                    {u.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${u.check}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contacto"
                  onClick={() => setSelectedUnit(u.id)}
                  className={`w-full py-2.5 border font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors text-center ${u.btn}`}
                >
                  {u.cta}
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MADUREZ Y PROPIEDAD INTELECTUAL */}
      <section id="madurez" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-2 block">
              Validación Científica & Respaldo I+D+i
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Estado de la tecnología (TRL 5)</h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Tecnología desarrollada por <strong>OPTINEX S.A.S.</strong> enfocada en la gestión adaptativa multi-vector de activos energéticos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0e27] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-emerald-500/30">
                TRL 5 VALIDADO
              </div>
              <FlaskConical className="w-6 h-6 text-emerald-400 mb-4" />
              <h3 className="text-base font-bold mb-2 text-white">Prototipo en Entorno Relevante</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Nivel de madurez TRL 5 alcanzado mediante modelo de simulación y calibración funcional sobre datos industriales de planta piloto. Plataforma orientada a la detección temprana y control adaptativo de activos energéticos.
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-purple-500/30">
                IP PROTEGIDA
              </div>
              <ShieldCheck className="w-6 h-6 text-purple-400 mb-4" />
              <h3 className="text-base font-bold mb-2 text-white">Activos de propiedad intelectual</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                • <strong>Marca Registrada INPI Nº 3.941.093</strong> (Clase 9, Software & Control de Energía).<br />
                • <strong>Patent Pending USPTO Nº 64/181,819</strong> (Solicitud provisional EE.UU. de método adaptativo multi-vector).
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
              <FileText className="w-6 h-6 text-amber-400 mb-4" />
              <h3 className="text-base font-bold mb-2 text-white">Data Room Técnico bajo NDA</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Acceso a dataset analítico, informe contable y arquitectura de software para evaluadores e inversores institucionales.
              </p>
              <a href="#contacto" className="text-xs font-semibold text-[#00BFFF] hover:text-cyan-300 inline-flex items-center gap-1.5">
                Solicitar acceso a Data Room <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ALTA DE INSTALACIÓN */}
      <section id="contacto" className="py-24 px-6 bg-[#070c1e] relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Alta de instalación</h2>
            <p className="text-gray-400 text-sm">
              Cuéntanos quién eres y dónde está tu planta. Con eso armamos el modelo inicial, sin trámites innecesarios.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} noValidate className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
            <div>
              <span className={labelClass}>Unidad de negocio principal</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {UNITS.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    aria-pressed={selectedUnit === u.id}
                    onClick={() => setSelectedUnit(u.id)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedUnit === u.id ? u.active : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {u.selector}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="domain" className={labelClass}>Dominio corporativo principal</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    id="domain"
                    type="text"
                    required
                    maxLength={120}
                    value={companyDomain}
                    onChange={(e) => setCompanyDomain(e.target.value)}
                    placeholder="empresa.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Correo de contacto</label>
                <div className="relative">
                  <AtSign className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={120}
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="nombre@empresa.com"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>Ubicación de la planta o enlace de Google Maps</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input
                  id="location"
                  type="text"
                  maxLength={200}
                  value={plantLocation}
                  onChange={(e) => setPlantLocation(e.target.value)}
                  placeholder="Ciudad, provincia o enlace de Google Maps"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className={labelClass}>Notas sobre la instalación (opcional)</label>
              <textarea
                id="notes"
                rows={2}
                maxLength={400}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escala de la planta, potencia contratada o necesidad principal"
                className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
              />
            </div>

            <div aria-live="polite">
              {feedback && (
                <div
                  className={`p-4 rounded-lg border text-xs flex items-start gap-2 ${
                    feedback.type === 'success'
                      ? 'bg-[#00BFFF]/10 border-[#00BFFF]/30 text-[#00BFFF]'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00BFFF]/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registrando instalación...
                </>
              ) : (
                <>
                  Registrar instalación
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050814] text-center text-xs text-gray-500 space-y-3">
        <p>© 2026 <strong>OPTINEX S.A.S.</strong> — CUIT 30-71945566-9. Todos los derechos reservados.</p>
        <p className="font-mono text-[10px] text-gray-400">
          Marca Registrada INPI Arg. Reg. Nº 3.941.093 · USPTO Provisional App. Nº 64/181,819
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px] pt-1">
          <span className="text-emerald-400 font-medium inline-flex items-center gap-1.5">
            <AtSign className="w-3.5 h-3.5" />
            contacto@nexergy.ar
          </span>
          <span className="text-gray-700">•</span>
          <a
            href="https://linktr.ee/nexergy.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00BFFF] hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            linktr.ee/nexergy.ar
          </a>
        </div>
      </footer>
    </div>
  );
}
