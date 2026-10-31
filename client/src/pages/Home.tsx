import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import {
  Zap, Cpu, Leaf, Building2, Send, CheckCircle2, AlertCircle, ArrowRight,
  Loader2, Globe, MapPin, Activity, ExternalLink, AtSign, ShieldCheck, FlaskConical, FileText,
  Sun, BatteryCharging, Car, Users, Award, Microscope, TrendingUp,
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
      'Plataforma inteligente de orquestación multi-vectorial para optimizar excedentes de generación renovable y eventos de curtailment mediante IA, analítica predictiva y optimización multiobjetivo.',
    bullets: [
      'Motor MIOM™ — orquestación multi-vectorial en tiempo real',
      'Valorización de excedentes renovables (CVI)',
      'Orquestación de BESS, Hidrógeno Verde y e-fuels',
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
      'Transformamos efluentes, rastrojos y subproductos agroindustriales en energía térmica, eléctrica y créditos ambientales con economía circular.',
    bullets: [
      'Reducción directa de huella de carbono',
      'Autogeneración continua y cogeneración',
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
      'Estaciones de carga inteligente AC/DC con BESS integrado para flotas industriales y parques sin saturar la red de distribución.',
    bullets: [
      'Carga de alta potencia sin picos de red',
      'Integración solar y eólica in situ',
      'Reducción de OPEX en logística corporativa',
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
      'Digital Twin, auditoría energética ISO 50001 y estructura legal-financiera autofinanciada con el ahorro energético generado.',
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
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20">
              <Globe className="w-3.5 h-3.5" />
              EBT OPTINEX S.A.S. · CUIT 30-71945566-9
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Marca Reg. INPI Nº 3.941.093 · Patent Pending USPTO 64/181,819
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              <FlaskConical className="w-3.5 h-3.5" />
              TRL 5 VALIDADO
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              PATENT PENDING USPTO
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              MARCA REGISTRADA INPI
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Tecnología propietaria para la{' '}
            <span className="text-[#00BFFF] bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#00BFFF] md:via-cyan-300 md:to-teal-300 print:text-[#00BFFF]">
              gestión inteligente de energía distribuida
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            NEXERGY® desarrolla una arquitectura tecnológica basada en electrónica de potencia, control adaptativo e
            inteligencia operacional para coordinar activos energéticos complejos en tiempo real y maximizar su valor
            económico.
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
      {/* PLATAFORMA TECNOLÓGICA */}
      <section id="plataforma" className="py-24 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Plataforma Tecnológica
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Una plataforma. Múltiples vectores energéticos.
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
              La transición energética está incorporando generación renovable, almacenamiento energético, biomasa,
              movilidad eléctrica e hidrógeno dentro de una misma infraestructura industrial.
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              NEXERGY® desarrolla una arquitectura de control adaptativo capaz de coordinar estos activos energéticos
              para maximizar eficiencia, disponibilidad operativa y valorización económica.
            </p>
          </div>

          {/* Motor MIOM™ */}
          <div className="bg-gradient-to-r from-purple-500/10 to-[#00BFFF]/10 border border-purple-500/30 rounded-2xl p-8 mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 mb-4">
              <Cpu className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-mono font-bold text-purple-300">Motor MIOM™</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Motor Inteligente de Orquestación Multi-Vectorial</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
              Núcleo analítico híbrido que combina ingeniería de requerimientos formales (977 requerimientos según
              ISO/IEC 25010) con algoritmos de Machine Learning multimodal para procesar variables estructuradas y
              texto libre, aislar fallas críticas y predecir el comportamiento dinámico de la demanda y generación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-[#00BFFF]/40">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">RENOVABLES</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Integración y valorización de excedentes energéticos.
              </p>
            </div>

            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-emerald-500/40">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">BIOMASA</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Conversión de residuos en energía y valor ambiental.
              </p>
            </div>

            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-purple-500/40">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-4">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">BESS E HIDRÓGENO</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Flexibilidad energética y almacenamiento inteligente.
              </p>
            </div>

            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-[#00BFFF]/40">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[#00BFFF] flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">MOVILIDAD ELÉCTRICA</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Infraestructura para movilidad eléctrica industrial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UNIDADES */}
      <section id="unidades" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3">
              Aplicaciones comerciales
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Aplicaciones comerciales de nuestra arquitectura tecnológica
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Todas las unidades comparten la misma base tecnológica: electrónica de potencia, control adaptativo e
              inteligencia operacional para la gestión multi-vector de activos energéticos.{' '}
              <span className="text-purple-400 font-semibold">NEXERGY FLEX™</span> es el producto principal, actualmente
              en validación TRL 5.
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

                  {u.patent && (
                    <div className="p-2.5 mb-5 rounded bg-purple-950/40 border border-purple-500/20 text-[10px] font-mono text-purple-300">
                      Patent pending · USPTO Nº 64/181,819
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

      {/* OPORTUNIDAD TECNOLÓGICA */}
      <section className="py-24 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
            Oportunidad Tecnológica
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            La transición energética necesita nuevas herramientas
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
            La electrificación industrial, el almacenamiento energético, la movilidad eléctrica y las energías
            renovables están incrementando la complejidad de los sistemas energéticos.
          </p>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Sin embargo, la mayoría de estos activos continúan operándose de forma aislada. NEXERGY® desarrolla una
            arquitectura capaz de coordinarlos en tiempo real para transformar complejidad técnica en eficiencia y
            rentabilidad.
          </p>
        </div>
      </section>
      {/* TECNOLOGÍA DEEP-TECH con métricas reales */}
      <section id="madurez" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-2 block">
              Validación Científica & Respaldo I+D+i
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Tecnología Deep-Tech aplicada a la transición energética
            </h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Tecnología desarrollada por <strong>OPTINEX S.A.S.</strong> para la coordinación inteligente de activos
              energéticos distribuidos mediante control adaptativo y electrónica de potencia avanzada. Origen en
              proyectos <strong>PFI 2022</strong>, <strong>PFI 2023</strong> y <strong>PDTS OPTIMIA-HV</strong> (Cod. 32756)
              de la <strong>Universidad Nacional de Villa Mercedes (UNViMe)</strong>.
            </p>
          </div>

          {/* Métricas TRL 5 */}
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
              <div className="text-xs text-gray-400 mt-1">Requerimientos ISO/IEC 25010</div>
            </div>
            <div className="bg-[#0a0e27] border border-amber-500/30 rounded-2xl p-6 text-center">
              <FlaskConical className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <div className="text-3xl font-extrabold text-amber-400">&lt;4.8%</div>
              <div className="text-xs text-gray-400 mt-1">Falsos positivos</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0e27] border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-emerald-500/30">
                TRL 5 VALIDADO
              </div>
              <FlaskConical className="w-6 h-6 text-emerald-400 mb-4" />
              <h3 className="text-base font-bold mb-2 text-white">Prototipo en Entorno Relevante</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Validado en microrred experimental UNViMe (fotovoltaica + BESS + electrólisis PEM + Power-to-X).
                Modelo Random Forest con 100 estimadores, K-Fold Cross-Validation (20 repeticiones, σ &lt; 0.015).
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-purple-500/30">
                IP PROTEGIDA
              </div>
              <ShieldCheck className="w-6 h-6 text-purple-400 mb-4" />
              <h3 className="text-base font-bold mb-2 text-white">Activos de propiedad intelectual</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                • <strong>Patent Pending USPTO Nº 64/181,819</strong> — "Systems and Methods for Intelligent Valorization
                of Renewable Energy Surplus Through Adaptive Multi-Vector Management" (Provisional, 22/10/2026).<br />
                • <strong>Marca Registrada INPI Nº 3.941.093</strong> — OPTINEX, Clase 9 (Software & Control de Energía).
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
              <FileText className="w-6 h-6 text-amber-400 mb-4" />
              <h3 className="text-base font-bold mb-2 text-white">Data Room técnico bajo NDA</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Acceso a dataset analítico, informe contable y arquitectura de software para evaluadores e inversores
                institucionales.
              </p>
              <a href="#contacto" className="text-xs font-semibold text-[#00BFFF] hover:text-cyan-300 inline-flex items-center gap-1.5">
                Solicitar acceso a Data Room <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INVERSORES */}
      <section className="py-24 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold font-mono tracking-widest text-amber-400 uppercase mb-3 block">
            Inversores · Organismos · Venture Capital
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Data Room técnico disponible bajo NDA
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-8">
            NEXERGY® dispone de documentación técnica, modelos económicos, propiedad intelectual, datasets industriales,
            arquitectura de software y evidencia experimental para procesos de due diligence, evaluación tecnológica y
            programas de financiamiento a la innovación.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-emerald-400">2 Cartas de Intención (LOI) firmadas</span>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Equipo Fundador
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Investigación + Industria = Tecnología con impacto real
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dr. Bosso */}
            <div className="bg-[#0a0e27] border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Microscope className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Dr. Ing. Jonathan Bosso</h3>
                  <p className="text-purple-400 text-xs font-mono">CEO — Director Ejecutivo</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Investigador CONICET. Doctor en Ciencias de la Ingeniería (UNRC). Profesor Asociado UNViMe y UNSL.
                18 publicaciones científicas (Elsevier, IET). Director del PDTS OPTIMIA-HV UNViMe (1er lugar región
                Nuevo Cuyo, 2do lugar nacional — Res. CIN P Nº 522/25). 15+ años en electrónica de potencia, microrredes
                e hidrógeno verde.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">CONICET</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">UNViMe</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">18 publicaciones</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">CYTED</span>
              </div>
              <a
                href="https://www.linkedin.com/in/jonathan-bosso-6138b849/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#00BFFF] hover:text-cyan-300 inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Ver perfil en LinkedIn
              </a>
            </div>

            {/* Mgtr. López */}
            <div className="bg-[#0a0e27] border border-[#00BFFF]/30 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-[#00BFFF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Mgtr. Ing. Juan José López</h3>
                  <p className="text-[#00BFFF] text-xs font-mono">CTO — Director Científico</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Magíster en Ingeniería de Software (UNSL). Diplomatura en IA aplicada a Ingeniería Eléctrica (UNSJ).
                14+ años en gestión de activos industriales (AGD, Mabe, Maxion Wheels). Especialista en automatización
                industrial, SCADA, Digital Twin y eficiencia energética. Ingeniero matriculado MP 3.026 (Cynitec, San Luis).
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20">M.Sc. Software</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20">IA Eléctrica</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20">SCADA/IoT</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20">14+ años industria</span>
              </div>
              <a
                href="https://www.linkedin.com/in/iejjlopez/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#00BFFF] hover:text-cyan-300 inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Ver perfil en LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">
              Equipo a incorporar: Ingeniero/a de Software Senior + Especialista en IA y Ciencia de Datos (Full Time)
            </p>
          </div>
        </div>
      </section>
      {/* FORMULARIO */}
      <section id="contacto" className="py-24 px-6 bg-[#070c1e] relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Funnel de Onboarding & Diagnóstico Inicial
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Diagnóstico Inicial de Oportunidad Energética
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Analizamos el potencial técnico y económico de cada instalación para identificar oportunidades de
              valorización energética, reducción de costes operativos y descarbonización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0a0e27] border border-white/10 p-4 rounded-xl text-center">
              <span className="text-lg font-bold text-[#00BFFF] block">Cero Curtailment</span>
              <span className="text-xs text-gray-400">Valorización del 100% de excedentes renovables</span>
            </div>
            <div className="bg-[#0a0e27] border border-white/10 p-4 rounded-xl text-center">
              <span className="text-lg font-bold text-emerald-400 block">Esquema Autofinanciado</span>
              <span className="text-xs text-gray-400">Repagado mediante el ahorro económico generado</span>
            </div>
            <div className="bg-[#0a0e27] border border-white/10 p-4 rounded-xl text-center">
              <span className="text-lg font-bold text-purple-400 block">Control Adaptativo</span>
              <span className="text-xs text-gray-400">Respuesta en milisegundos sin desgaste de activos</span>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} noValidate className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
            <div>
              <span className={labelClass}>Unidad de negocio o vector principal de interés</span>
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
                <label htmlFor="email" className={labelClass}>Correo corporativo de contacto</label>
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
              <label htmlFor="notes" className={labelClass}>Parámetros de la instalación (Opcional)</label>
              <textarea
                id="notes"
                rows={2}
                maxLength={400}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Potencia contratada (kW/MW), tipo de tarifa o principal desafío de costo/sustentabilidad"
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
                  Generando modelo de onboarding...
                </>
              ) : (
                <>
                  Registrar instalación y solicitar modelo inicial
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050814] text-center text-xs text-gray-500 space-y-3">
        <p>© 2026 <strong>NEXERGY®</strong> — Todos los derechos reservados.</p>
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
