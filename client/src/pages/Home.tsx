import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import {
  Zap, Cpu, Leaf, Building2, Send, CheckCircle2, AlertCircle, ArrowRight,
  Loader2, Globe, MapPin, Activity, ExternalLink, AtSign, ShieldCheck,
  FlaskConical, FileText, Sun, BatteryCharging, Car, Users, Microscope,
  TrendingUp, Briefcase,
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
  primary?: boolean;
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
    tag: 'NEXERGY FLEX™',
    title: 'Energía Bidireccional',
    selector: 'Nexergy Flex',
    cta: 'Evaluar Flexibilidad Energética',
    description:
      'Orquestación multi-vectorial para optimizar excedentes renovables y eventos de curtailment mediante IA y optimización multiobjetivo.',
    bullets: [
      'Motor MIOM™ — orquestación en tiempo real',
      'Valorización de excedentes renovables (CVI)',
      'Orquestación de BESS, H₂ Verde y e-fuels',
    ],
    patent: true,
    primary: true,
    card: 'border-purple-500/40 hover:border-purple-400 ring-1 ring-purple-500/20',
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
    title: 'Bioenergía & Biomasa',
    selector: 'Agro y Bioenergía',
    cta: 'Evaluar Biomasa & Biochar',
    description:
      'Conversión de residuos agroindustriales en energía térmica, eléctrica y créditos ambientales con economía circular.',
    bullets: [
      'Reducción directa de huella de carbono',
      'Autogeneración y cogeneración',
      'Valorización de residuos agroindustriales',
    ],
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
    title: 'Movilidad Eléctrica Pesada',
    selector: 'EV Charge',
    cta: 'Evaluar Infraestructura EV',
    description:
      'Carga inteligente AC/DC con BESS integrado para flotas industriales sin saturar la red de distribución.',
    bullets: [
      'Carga de alta potencia sin picos de red',
      'Integración solar y eólica in situ',
      'Reducción de OPEX en logística',
    ],
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
    title: 'Sistemas & Compliance',
    selector: 'Systems y Twin',
    cta: 'Solicitar Diagnóstico Autofinanciado',
    description:
      'Digital Twin, auditoría ISO 50001 y estructura legal-financiera autofinanciada con el ahorro generado.',
    bullets: [
      'Modelado Digital Twin e Industria 4.0',
      'Res. CRPEE 13/2012 e ISO 50001',
      'Esquema autofinanciado por ahorros',
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

  useEffect(() => {
    document.title = "NEXERGY® | Tecnología propietaria para gestión inteligente de energía distribuida";
  }, []);

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
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20">
              <Globe className="w-3.5 h-3.5" />
              OPTINEX S.A.S. · CUIT 30-71945566-9
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Patent Pending USPTO 64/181,819 · Marca Reg. INPI 3.941.093
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Tecnología propietaria para la{' '}
            <span className="text-[#00BFFF] bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#00BFFF] md:via-cyan-300 md:to-teal-300 print:text-[#00BFFF]">
              gestión inteligente de energía distribuida
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Arquitectura basada en electrónica de potencia, control adaptativo e inteligencia operacional para
            coordinar activos energéticos en tiempo real y maximizar su valor económico.
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
              href="#plataforma"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              Conocer la plataforma
            </a>
          </div>
        </div>
      </section>
      {/* PLATAFORMA */}
      <section id="plataforma" className="py-24 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Plataforma
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Una plataforma. Múltiples vectores energéticos.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Control adaptativo que coordina generación renovable, almacenamiento, biomasa, movilidad eléctrica
              e hidrógeno para maximizar eficiencia y valorización.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-[#00BFFF]/10 border border-purple-500/30 rounded-2xl p-8 mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 mb-4">
              <Cpu className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-mono font-bold text-purple-300">Motor MIOM™</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Motor Inteligente de Orquestación Multi-Vectorial</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
              977 requerimientos formales (ISO/IEC 25010) + Machine Learning multimodal. Procesa variables
              estructuradas y texto libre para aislar fallas críticas y predecir el comportamiento dinámico de
              demanda y generación.{' '}
              <strong className="text-purple-300">
                Sustentado por la Solicitud de Patente Provisional USPTO Nº 64/181,819.
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-[#00BFFF]/40">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">RENOVABLES</h4>
              <p className="text-gray-400 text-xs">Integración y valorización de excedentes.</p>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-emerald-500/40">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">BIOMASA</h4>
              <p className="text-gray-400 text-xs">Conversión de residuos en energía.</p>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-purple-500/40">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-4">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">BESS E HIDRÓGENO</h4>
              <p className="text-gray-400 text-xs">Flexibilidad y almacenamiento inteligente.</p>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-[#00BFFF]/40">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border-cyan-500/30 text-[#00BFFF] flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">MOVILIDAD ELÉCTRICA</h4>
              <p className="text-gray-400 text-xs">Infraestructura para flotas industriales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* APLICACIONES */}
      <section id="unidades" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Aplicaciones
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Aplicaciones de la arquitectura tecnológica
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Todas comparten la misma base.{' '}
              <span className="text-purple-400 font-semibold">NEXERGY FLEX™</span> es el producto principal,
              en validación TRL 5 y amparado por la Patente Provisional USPTO.
            </p>
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
                {u.primary && (
                  <div className="absolute top-0 left-0 bg-[#00BFFF]/20 text-[#00BFFF] text-[9px] font-mono font-bold px-2.5 py-1 rounded-br border-b border-r border-[#00BFFF]/30">
                    PRODUCTO PRINCIPAL
                  </div>
                )}
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${u.iconBox}`}>
                    <u.Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${u.text}`}>{u.tag}</span>
                  <h4 className="text-xl font-bold text-white mt-1 mb-2">{u.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{u.description}</p>
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
      {/* TRL 5 + PATENTE */}
      <section id="madurez" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-2 block">
              Validación & Propiedad Intelectual
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              TRL 5 — base de la Patente Provisional USPTO
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Los resultados experimentales sustentan la Solicitud de Patente Provisional USPTO Nº 64/181,819,
              titularidad de OPTINEX S.A.S.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0a0e27] border border-emerald-500/30 rounded-2xl p-6 text-center">
              <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-3xl font-extrabold text-emerald-400">0.942</div>
              <div className="text-xs text-gray-400 mt-1">AUC-ROC</div>
            </div>
            <div className="bg-[#0a0e27] border border-[#00BFFF]/30 rounded-2xl p-6 text-center">
              <FileText className="w-6 h-6 text-[#00BFFF] mx-auto mb-2" />
              <div className="text-3xl font-extrabold text-[#00BFFF]">6.528</div>
              <div className="text-xs text-gray-400 mt-1">Registros reales</div>
            </div>
            <div className="bg-[#0a0e27] border border-purple-500/30 rounded-2xl p-6 text-center">
              <Microscope className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-extrabold text-purple-400">977</div>
              <div className="text-xs text-gray-400 mt-1">Req. ISO/IEC 25010</div>
            </div>
            <div className="bg-[#0a0e27] border border-amber-500/30 rounded-2xl p-6 text-center">
              <FlaskConical className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-3xl font-extrabold text-amber-400">&lt;4.8%</div>
              <div className="text-xs text-gray-400 mt-1">Falsos positivos</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0e27] border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-purple-500/30">
                PATENTE PROVISIONAL
              </div>
              <ShieldCheck className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-white">USPTO Nº 64/181,819</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-2">
                <strong>"Systems and Methods for Intelligent Valorization of Renewable Energy Surplus Through
                Adaptive Multi-Vector Management"</strong>
              </p>
              <p className="text-gray-500 text-xs">
                Provisional (35 USC 111(b)) · 22/10/2026 · Titular: OPTINEX S.A.S.
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-[#00BFFF]/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#00BFFF]/20 text-[#00BFFF] text-[10px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-[#00BFFF]/30">
                MARCA REGISTRADA
              </div>
              <ShieldCheck className="w-8 h-8 text-[#00BFFF] mb-4" />
              <h3 className="text-lg font-bold mb-2 text-white">INPI Nº 3.941.093</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-2">
                Marca <strong>OPTINEX</strong> — Clase 9 (Niza)
              </p>
              <p className="text-gray-500 text-xs">
                Concedida 14/09/2026 · Vence 14/09/2036 · DI-2026-319-APN-DNM#INPI
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400">2 Cartas de Intención (LOI) firmadas</span>
            </div>
            <a href="#contacto" className="text-xs font-semibold text-[#00BFFF] hover:text-cyan-300 inline-flex items-center gap-1.5">
              Solicitar acceso a Data Room <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Equipo
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Investigación + Industria + Ciencia + Finanzas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0a0e27] border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Microscope className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Dr. Ing. Jonathan Bosso</h3>
                  <p className="text-purple-400 text-xs font-mono">CEO — Director Ejecutivo</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Doctor en Ingeniería. 18 publicaciones científicas. 15+ años en electrónica de potencia e
                hidrógeno verde. Inventor de la Patente USPTO Nº 64/181,819.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Dr. Ingeniería</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Inventor USPTO</span>
              </div>
              <a href="https://www.linkedin.com/in/jonathan-bosso-6138b849/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#00BFFF] hover:text-cyan-300 inline-flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>

            <div className="bg-[#0a0e27] border border-[#00BFFF]/30 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-[#00BFFF]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Mgtr. Ing. Juan José López</h3>
                  <p className="text-[#00BFFF] text-xs font-mono">CTO — Director Científico</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Magíster en Ingeniería de Software. 14+ años en empresas industriales líderes. Especialista en
                SCADA/IoT, Digital Twin y eficiencia energética. Ing. matriculado.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20">M.Sc. Software</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20">SCADA/IoT</span>
              </div>
              <a href="https://www.linkedin.com/in/iejjlopez/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#00BFFF] hover:text-cyan-300 inline-flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>

            <div className="bg-[#0a0e27] border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Dr. Eduardo Guerreiro</h3>
                  <p className="text-emerald-400 text-xs font-mono">CSO — Chief Science Officer</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Doctor en Química. Master en Innovación Empresarial. 21+ años en empresas multinacionales.
                Six Sigma Master Black Belt. Auditor ISO 9001/14000. Especialista en hidrógeno y biomasa.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Dr. Química</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Six Sigma MBB</span>
              </div>
              <span className="text-xs text-gray-500 inline-flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> CV bajo solicitud
              </span>
            </div>

            <div className="bg-[#0a0e27] border border-amber-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Cp. Joaquín Arcondo</h3>
                  <p className="text-amber-400 text-xs font-mono">CFO — Asesor Financiero</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Contador Público. Especialista en estructuración financiera de EBTs, rendición de fondos
                públicos y auditoría.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">Contador Público</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">Auditoría</span>
              </div>
              <a href="https://estudioarcondo.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#00BFFF] hover:text-cyan-300 inline-flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> estudioarcondo.com
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">
              A incorporar: Ingeniero/a de Software Senior + Especialista en IA y Ciencia de Datos (Full Time)
            </p>
          </div>
        </div>
      </section>
      {/* CONTACTO */}
      <section id="contacto" className="py-24 px-6 bg-[#070c1e] relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Diagnóstico Inicial
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Diagnóstico de Oportunidad Energética
            </h2>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
              Analizamos el potencial técnico y económico de cada instalación para identificar oportunidades de
              valorización energética, reducción de costos y descarbonización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0a0e27] border border-white/10 p-4 rounded-xl text-center">
              <span className="text-lg font-bold text-[#00BFFF] block">Cero Curtailment</span>
              <span className="text-xs text-gray-400">100% de excedentes valorizados</span>
            </div>
            <div className="bg-[#0a0e27] border border-white/10 p-4 rounded-xl text-center">
              <span className="text-lg font-bold text-emerald-400 block">Autofinanciado</span>
              <span className="text-xs text-gray-400">Repagado con el ahorro generado</span>
            </div>
            <div className="bg-[#0a0e27] border border-white/10 p-4 rounded-xl text-center">
              <span className="text-lg font-bold text-purple-400 block">Control Adaptativo</span>
              <span className="text-xs text-gray-400">Respuesta en milisegundos</span>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} noValidate className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
            <div>
              <span className={labelClass}>Unidad de interés</span>
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
                <label htmlFor="domain" className={labelClass}>Dominio corporativo</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input id="domain" type="text" required maxLength={120} value={companyDomain} onChange={(e) => setCompanyDomain(e.target.value)} placeholder="empresa.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Correo de contacto</label>
                <div className="relative">
                  <AtSign className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input id="email" type="email" required maxLength={120} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="nombre@empresa.com" className={inputClass} />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>Ubicación de la planta</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input id="location" type="text" maxLength={200} value={plantLocation} onChange={(e) => setPlantLocation(e.target.value)} placeholder="Ciudad, provincia o enlace de Google Maps" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className={labelClass}>Parámetros (Opcional)</label>
              <textarea id="notes" rows={2} maxLength={400} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Potencia contratada (kW/MW), tipo de tarifa o principal desafío" className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]" />
            </div>

            <div aria-live="polite">
              {feedback && (
                <div className={`p-4 rounded-lg border text-xs flex items-start gap-2 ${feedback.type === 'success' ? 'bg-[#00BFFF]/10 border-[#00BFFF]/30 text-[#00BFFF]' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                  {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                  <span>{feedback.text}</span>
                </div>
              )}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00BFFF]/20 disabled:opacity-50">
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Procesando...</>
              ) : (
                <>Registrar instalación <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050814] text-center text-xs text-gray-500 space-y-3">
        <p>© 2026 <strong>NEXERGY®</strong> — OPTINEX S.A.S. — Todos los derechos reservados.</p>
        <div className="flex items-center justify-center gap-4 text-[11px] pt-1">
          <span className="text-emerald-400 font-medium inline-flex items-center gap-1.5">
            <AtSign className="w-3.5 h-3.5" /> contacto@nexergy.ar
          </span>
          <span className="text-gray-700">•</span>
          <a href="https://linktr.ee/nexergy.ar" target="_blank" rel="noopener noreferrer" className="text-[#00BFFF] hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5" /> linktr.ee/nexergy.ar
          </a>
        </div>
      </footer>
    </div>
  );
}
