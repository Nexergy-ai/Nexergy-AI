import { useEffect } from 'react';
import type { ComponentType } from 'react';
import {
  Zap, Cpu, Leaf, CheckCircle2, ArrowRight, Globe, Activity, ExternalLink,
  AtSign, ShieldCheck, FlaskConical, Users, Microscope, Briefcase, Sun,
  BatteryCharging, Car,
  AlertTriangle, Network, Recycle, TrendingDown,
  Gauge, Target, Factory, Cog, Database, BarChart3,
  DollarSign, Award, MapPin, FileText, Scale, Lock, Sprout,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';

type UnitId = 'flex' | 'agro' | 'ev' | 'systems';

interface Unit {
  id: UnitId;
  Icon: ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  patent?: boolean;
  primary?: boolean;
  derived?: boolean;
  card: string;
  iconBox: string;
  text: string;
  check: string;
}

const UNITS: Unit[] = [
  {
    id: 'flex',
    Icon: Cpu,
    tag: 'NEXERGY FLEX™',
    title: 'Control Bidireccional',
    description:
      'Núcleo de la plataforma. Convertidor SST/VSC de 50 kW, índice CVI para valorización de excedentes, integración BESS e H₂ verde. Patente INPI AR113009B1 + PPA USPTO 64/181,819.',
    bullets: [
      'Convertidor SST/VSC 50 kW — 91,2% eficiencia, THD 2,45%',
      'Índice CVI (valorización de excedentes en tiempo real)',
      'Integración BESS e Hidrógeno Verde',
    ],
    patent: true,
    primary: true,
    card: 'border-purple-500/40 hover:border-purple-400 ring-1 ring-purple-500/20',
    iconBox: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    text: 'text-purple-400',
    check: 'text-purple-400',
  },
  {
    id: 'agro',
    Icon: Leaf,
    tag: 'NEXERGY AGRO™',
    title: 'Gasificación & Biochar',
    description:
      'Conversión termoquímica de residuos agroindustriales en planta APL PP30. Producción de syngas (4,84 MJ/Nm³), cogeneración (25 kW cont.) y biochar como coproducto de alto valor.',
    bullets: [
      'Gasificador APL PP30 — 82,6 Nm³/h syngas, 25-35 kg/h biomasa',
      'Biochar: enmienda de suelos, créditos de carbono (dCORs)',
      'Inteligencia territorial GIS+ETL de biomasa',
    ],
    card: 'border-white/10 hover:border-[#00BFFF]/50',
    iconBox: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    text: 'text-emerald-400',
    check: 'text-emerald-400',
  },
  {
    id: 'systems',
    Icon: Activity,
    tag: 'NEXERGY SYSTEMS™',
    title: 'SaaS & Compliance',
    description:
      'SaaS de diagnóstico energético, Digital Twins y auditoría ISO 50001. Módulo de entrada autofinanciado por ahorros reales auditados. Infraestructura Cloud/Edge sobre Cloudflare Workers.',
    bullets: [
      'Digital Twin e IA de diagnóstico energético (R² 0,74)',
      'Auditoría automática ISO 50001 y facturas',
      'Esquema autofinanciado por ahorros verificados',
    ],
    card: 'border-white/10 hover:border-[#00BFFF]/50',
    iconBox: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    text: 'text-amber-400',
    check: 'text-amber-400',
  },
  {
    id: 'ev',
    Icon: Zap,
    tag: 'NEXERGY EV CHARGE™',
    title: 'Movilidad Eléctrica',
    description:
      'Aplicación derivada de FLEX. Infraestructura de carga AC/DC con almacenamiento BESS integrado para flotas industriales y logísticas.',
    bullets: [
      'Gestión de carga sin picos de demanda',
      'Integración con FLEX y baterías BESS',
      'Reducción de OPEX en logística pesada',
    ],
    derived: true,
    card: 'border-white/10 hover:border-[#00BFFF]/50',
    iconBox: 'bg-cyan-500/10 border-cyan-500/30 text-[#00BFFF]',
    text: 'text-[#00BFFF]',
    check: 'text-[#00BFFF]',
  },
];

const PROBLEMS = [
  {
    Icon: AlertTriangle,
    title: 'Curtailment',
    description: 'Vertimiento de energía limpia ante congestión de redes y falta de flexibilidad operativa.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/30',
  },
  {
    Icon: Network,
    title: 'Operación en Silos',
    description: 'BESS, electrólisis de H₂ y biomasa operan aislados con latencias >200-500 ms.',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/30',
  },
  {
    Icon: Recycle,
    title: 'Subutilización Agroindustrial',
    description: 'Residuos biomásicos sin modelos integrados de aprovechamiento térmico, eléctrico o de materiales.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/30',
  },
  {
    Icon: TrendingDown,
    title: 'OPEX Elevado',
    description: 'Penalizaciones por picos de demanda, mala calidad de potencia y desgaste prematuro de equipamiento.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/30',
  },
];

const CORE_TECHS = [
  {
    Icon: Gauge,
    name: 'ΩEFS — Espacio de Flexibilidad',
    description: 'Cálculo dinámico en tiempo real de la capacidad operativa de activos distribuidos (generación, almacenamiento, conversión, demanda).',
    color: 'text-[#00BFFF]',
    bg: 'bg-[#00BFFF]/10 border-[#00BFFF]/30',
  },
  {
    Icon: Target,
    name: 'CVI — Curtailment Valorization Index',
    description: 'Algoritmo propietario que determina el destino técnicamente más eficiente y económicamente más rentable para cada unidad de energía excedente.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/30',
  },
  {
    Icon: Zap,
    name: 'Control Edge ≤50 ms',
    description: 'Control adaptativo en bucle cerrado sobre Cloudflare Workers. Decisiones en el borde de la red con latencia objetivo sub-segundo.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/30',
  },
];

const VECTORS = [
  { Icon: Sun, title: 'RENOVABLES', desc: 'Integración y valorización de excedentes (CVI).', bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400', hover: 'hover:border-amber-500/40' },
  { Icon: Leaf, title: 'BIOMASA', desc: 'Mapeo territorial y conversión de residuos en energía.', bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', hover: 'hover:border-emerald-500/40' },
  { Icon: BatteryCharging, title: 'BESS E HIDRÓGENO', desc: 'Almacenamiento dinámico y flexibilidad de red.', bg: 'bg-purple-500/10 border-purple-500/30 text-purple-400', hover: 'hover:border-purple-500/40' },
  { Icon: Car, title: 'MOVILIDAD ELÉCTRICA', desc: 'Infraestructura inteligente de carga para flotas.', bg: 'bg-cyan-500/10 border-cyan-500/30 text-[#00BFFF]', hover: 'hover:border-[#00BFFF]/40' },
];

const ARCH_LAYERS = [
  { level: '1', title: 'Infraestructura Energética', desc: 'Fuentes renovables, almacenamiento, convertidores, generación distribuida y equipos de conversión de biomasa.', Icon: Factory },
  { level: '2', title: 'Instrumentación y Comunicaciones', desc: 'Sensores, medidores, controladores y dispositivos de adquisición con interfaces industriales (Modbus-TCP, MQTT).', Icon: Cog },
  { level: '3', title: 'Modelado y Procesamiento', desc: 'Procesamiento de variables operativas, modelos de sistemas energéticos, simulación y representación digital (Digital Twin).', Icon: Database },
  { level: '4', title: 'Gestión y Optimización', desc: 'Algoritmos ΩEFS y CVI para asignación de recursos, evaluación de alternativas y estrategias de valorización.', Icon: Cpu },
  { level: '5', title: 'Supervisión y Explotación', desc: 'Visualización, seguimiento de indicadores, análisis técnico-económico y asistencia a la toma de decisiones (SaaS).', Icon: BarChart3 },
];

const KPIS = [
  { component: 'Convertidor SST/VSC', metric: 'Eficiencia de conversión', baseline: '91,2%', objective: '≥ 97%' },
  { component: 'Convertidor SST/VSC', metric: 'THD de corriente', baseline: '2,45%', objective: '—' },
  { component: 'Convertidor SST/VSC', metric: 'Potencia nominal', baseline: '50 kW', objective: '—' },
  { component: 'Gasificación APL PP30', metric: 'Poder calorífico syngas', baseline: '4,84 MJ/Nm³', objective: '—' },
  { component: 'Gasificación APL PP30', metric: 'Caudal de syngas', baseline: '82,6 Nm³/h', objective: '—' },
  { component: 'Gasificación APL PP30', metric: 'Generación eléctrica', baseline: '25 kW / 30 kW pico', objective: '—' },
  { component: 'SCADA/IoT', metric: 'Latencia Edge', baseline: '98,4 ms', objective: '≤ 50 ms' },
  { component: 'Digital Twin', metric: 'Precisión (R²)', baseline: '0,74', objective: '≥ 0,90' },
  { component: 'Algoritmo CVI', metric: 'Precisión (MAPE)', baseline: '28%', objective: '≤ 10%' },
  { component: 'Plataforma', metric: 'Disponibilidad', baseline: '95%', objective: '≥ 99,9%' },
  { component: 'Conectores industriales', metric: 'Protocolos soportados', baseline: '2', objective: '≥ 10' },
];

const FAILURES = [
  { code: 'ERR-2026-04', event: 'Disparo por sobretemperatura en driver MOSFET SiC', fix: 'Rediseño de ducto de aire + sensor PT100 directo en driver' },
  { code: 'ERR-2026-09', event: 'Caída de presión en reactor PP30 — PCI syngas a 3,8 MJ/Nm³', fix: 'Tamizado previo (granulometría 20-40 mm) + vibrador en tolva' },
  { code: 'ERR-2026-12', event: 'Pérdida de paquetes en broker MQTT Edge', fix: 'Memoria circular en C++ + reconexión mTLS automática' },
];

const COMPETITIVE = [
  { attribute: 'Multi-vectorialidad', nexergy: 'Orquesta electricidad + biomasa + H₂ en una sola capa de decisión', traditional: 'Soluciones rígidas de un único vector' },
  { attribute: 'Arquitectura Edge', nexergy: 'Control adaptativo en bucle cerrado (≤ 50 ms)', traditional: 'Control en nube centralizada (> 200-500 ms)' },
  { attribute: 'Propiedad Intelectual', nexergy: 'Patente USPTO + INPI (100% OPTINEX S.A.S.)', traditional: 'Sin protección tecnológica equivalente' },
  { attribute: 'Estrategia de Entrada', nexergy: 'SaaS autofinanciado por ahorros reales auditados', traditional: 'Requerimientos de CAPEX inicial elevados' },
  { attribute: 'Motor Propietario', nexergy: 'Algoritmos ΩEFS y CVI (Curtailment Valorization Index)', traditional: 'Inexistentes en el mercado' },
];

const BUDGET = [
  { rubro: 'Recursos Humanos I+D+i', funcion: 'Equipo técnico (software, datos, electrónica de potencia, control, biomasa) y directores', amount: '240.000', percent: '40,0%', pct: 40 },
  { rubro: 'NEXERGY FLEX™', funcion: 'Electrónica SST/VSC (USD 85k) + integración y validación en campo (USD 60k)', amount: '145.000', percent: '24,2%', pct: 24.2 },
  { rubro: 'NEXERGY AGRO™', funcion: 'Inteligencia GIS+ETL + validación experimental biomasa/gasificación APL PP30', amount: '120.000', percent: '20,0%', pct: 20 },
  { rubro: 'NEXERGY SYSTEMS™', funcion: 'Infraestructura Cloud/Edge, motor SaaS, Digital Twins e ISO 50001', amount: '65.000', percent: '10,8%', pct: 10.8 },
  { rubro: 'PI y Validación Comercial', funcion: 'Fase PCT / marcas INPI (USD 20k) + softlanding Brasil (USD 10k)', amount: '30.000', percent: '5,0%', pct: 5 },
];

const MILESTONES = [
  { hito: 'H1', meses: 'Meses 1-6', desembolso: '210.000', percent: '35%', entregables: 'Ingeniería de base, arquitectura serverless y protocolos experimentales.' },
  { hito: 'H2', meses: 'Meses 7-12', desembolso: '180.000', percent: '30%', entregables: 'Prototipos funcionales, ensayos HIL en PP30 y presentación Fase PCT antes del 22/10/2027.' },
  { hito: 'H3', meses: 'Meses 13-18', desembolso: '120.000', percent: '20%', entregables: 'Integración tecnológica y demostración en 3 pilotos industriales en campo.' },
  { hito: 'H4', meses: 'Meses 19-24', desembolso: '90.000', percent: '15%', entregables: 'Validación integral TRL 6, consolidación precomercial y fases nacionales PCT.' },
];

const FINANCIAL_HIGHLIGHTS = [
  { label: 'Runway con CFI', value: '24 meses', sub: 'Cubre el plan completo' },
  { label: 'Runway CFI + Semilla', value: '44 meses', sub: 'Plan + 20 meses post-TRL 6' },
  { label: 'Ronda Semilla', value: 'USD 500K', sub: 'Post-H2 (equity)' },
  { label: 'ARR Año 2 → 3', value: '28,8K → 288K', sub: 'Escenario base (USD)' },
  { label: 'LTV/CAC', value: '5,8x → 14,4x', sub: 'Año 2 → Año 3' },
  { label: 'Condición de Repago', value: '3% trimestral', sub: 'Facturación ≥ USD 2M' },
];

const IP_ASSETS = [
  {
    tipo: 'Patente Provisional',
    identificador: 'USPTO Nº 64/181,819',
    descripcion: '"Systems and Methods for Intelligent Valorization of Renewable Energy Surplus Through Adaptive Multi-Vector Management"',
    estado: 'En trámite (EE.UU.). Fase PCT antes del 22/10/2027.',
    color: 'border-purple-500/30',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Icon: ShieldCheck,
    iconColor: 'text-purple-400',
  },
  {
    tipo: 'Patente de Invención',
    identificador: 'INPI AR113009B1',
    descripcion: 'Topología de conversión bidireccional SST/VSC. Título otorgado por el Instituto Nacional de la Propiedad Industrial.',
    estado: 'Concedida. Titular: OPTINEX S.A.S.',
    color: 'border-emerald-500/30',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Icon: ShieldCheck,
    iconColor: 'text-emerald-400',
  },
  {
    tipo: 'Marca Registrada',
    identificador: 'INPI Nº 3.941.093',
    descripcion: 'NEXERGY® — Clase 9 (Niza). Concedida por INPI Argentina.',
    estado: 'Concedida. Vencimiento: 14/09/2036. Titular: OPTINEX S.A.S.',
    color: 'border-[#00BFFF]/30',
    badge: 'bg-[#00BFFF]/20 text-[#00BFFF] border-[#00BFFF]/30',
    Icon: ShieldCheck,
    iconColor: 'text-[#00BFFF]',
  },
  {
    tipo: 'Marca Internacional',
    identificador: 'NEXERGY® Brasil',
    descripcion: 'Extensión regional de marca ante INPI Brasil.',
    estado: 'En preparación de solicitud formal.',
    color: 'border-amber-500/30',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Icon: ShieldCheck,
    iconColor: 'text-amber-400',
  },
];

const TEAM = [
  {
    Icon: Microscope,
    name: 'Dr. Ing. Jonathan Bosso',
    role: 'CEO — Director Ejecutivo',
    description: 'Doctor en Ingeniería (UNRC), Investigador CONICET. 15+ años en electrónica de potencia y convertidores bidireccionales. Co-inventor Patente USPTO 64/181,819. Co-fundador (50%).',
    tags: ['Inventor USPTO', 'CONICET', 'Co-fundador 50%'],
    card: 'border-purple-500/30',
    iconBox: 'bg-purple-500/10 border-purple-500/30',
    text: 'text-purple-400',
  },
  {
    Icon: Users,
    name: 'Mgtr. Ing. Juan José López',
    role: 'CTO — Director Técnico',
    description: 'Magíster en Ing. de Software (UNSL). 14+ años en industria (AGD, MABE). Especialista SCADA/IoT y Digital Twin. Co-inventor Patente USPTO 64/181,819. Co-fundador (50%).',
    tags: ['Inventor USPTO', 'SCADA/IoT', 'Co-fundador 50%'],
    card: 'border-[#00BFFF]/30',
    iconBox: 'bg-[#00BFFF]/10 border-[#00BFFF]/30',
    text: 'text-[#00BFFF]',
  },
  {
    Icon: FlaskConical,
    name: 'Dr. Eduardo Guerreiro',
    role: 'CSO — Director Científico',
    description: 'Doctor en Química (UNSL), Master en Innovación. 21+ años en multinacionales (Colgate, Bayer). Six Sigma Master Black Belt. Especialista en biomasa e H₂. Co-inventor.',
    tags: ['Inventor USPTO', 'Six Sigma MBB', 'Biomasa e H₂'],
    card: 'border-emerald-500/30',
    iconBox: 'bg-emerald-500/10 border-emerald-500/30',
    text: 'text-emerald-400',
  },
  {
    Icon: Briefcase,
    name: 'Cp. Joaquín Arcondo',
    role: 'CFO — Asesor Financiero',
    description: 'Contador Público. Especialista en estructuración financiera de EBTs, rendición de fondos públicos y auditoría contable.',
    tags: ['Auditoría', 'Rendición fondos'],
    card: 'border-amber-500/30',
    iconBox: 'bg-amber-500/10 border-amber-500/30',
    text: 'text-amber-400',
  },
  {
    Icon: Globe,
    name: 'Diego Lavega de Farias',
    role: 'Asesor Expansión LATAM',
    description: 'Contador Público (CRC/SP). Fundador de Brasil Fácil MX. Especialista en softlanding y estructuración de negocios en Brasil.',
    tags: ['Softlanding Brasil', 'CRC/SP'],
    card: 'border-cyan-500/30',
    iconBox: 'bg-cyan-500/10 border-cyan-500/30',
    text: 'text-cyan-400',
  },
];

const IMPACT_STATS = [
  { value: '23-32', label: 'Puestos de trabajo (directos + indirectos)', Icon: Users, color: 'text-[#00BFFF]' },
  { value: '≥ 450', label: 'tCO₂e/año evitadas', Icon: Sprout, color: 'text-emerald-400' },
  { value: '≥ 1.500', label: 't/año residuos valorizados', Icon: Recycle, color: 'text-emerald-400' },
  { value: '≥ 30%', label: 'Reducción de curtailment en pilotos', Icon: TrendingDown, color: 'text-amber-400' },
];

const PIPELINE = [
  { nombre: 'Piloto 1 — Microrred & Biomasa (San Luis)', estado: 'MoU en firma', monto: 'USD 25.000/año' },
  { nombre: 'Piloto 2 — Planta Electrointensiva (Bs. As.)', estado: 'MoU pendiente', monto: 'USD 18.000/año' },
  { nombre: 'Piloto 3 — Parque Renovable & BESS (Patagonia)', estado: 'MoU pendiente', monto: 'USD 30.000/año' },
  { nombre: 'Prospecto Brasil — Grupo Agroindustrial (São Paulo)', estado: 'Prospección inicial', monto: 'USD 45.000/año' },
];

export default function PrivateHome() {
  useEffect(() => {
    document.title = "NEXERGY® | Portal Confidencial EBT — Innova CFI";
  }, []);

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans selection:bg-[#00BFFF] selection:text-[#070c1e]">
      <Navigation />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20">
              <Globe className="w-3.5 h-3.5" />
              OPTINEX S.A.S. · CUIT 30-71945566-9
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              USPTO 64/181,819 · INPI AR113009B1 · Marca 3.941.093
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Valorización energética de{' '}
            <span className="text-[#00BFFF] bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#00BFFF] md:via-cyan-300 md:to-teal-300 print:text-[#00BFFF]">
              residuos agroindustriales
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-6 leading-relaxed font-light">
            Plataforma de inteligencia energética para la gestión multivectorial basada en IA, gasificación y generación distribuida.
          </p>

          <p className="text-gray-500 text-sm max-w-2xl mx-auto mb-10 font-mono">
            Programa Innova CFI · USD 600.000 · 24 meses · TRL 4 → TRL 6
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#modulos"
              className="bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-[#00BFFF]/20 flex items-center justify-center gap-2"
            >
              Módulos Tecnológicos
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#evidencia"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              Evidencia Experimental
            </a>
          </div>
        </div>
      </section>

      {/* ACCESO Y SEGURIDAD */}
      <div className="bg-[#0a0e27] border-b border-white/5 py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            Acceso restringido a evaluadores <span className="font-mono text-emerald-400">@cfi.org.ar</span>
          </span>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00BFFF]" />
            Autenticación 2FA (OTP por correo)
          </span>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            Licencia: 100% OPTINEX (comercial) · MIT (conectores)
          </span>
        </div>
      </div>

      {/* PROBLEMA Y OPORTUNIDAD */}
      <section id="problema" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Problema y Oportunidad
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ineficiencias estructurales del sector energético
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              La penetración de renovables variables y la necesidad de descarbonizar la industria generan pérdidas económicas y subutilización de recursos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${p.bg}`}>
                  <p.Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0a0e27] border border-[#00BFFF]/20 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-[#00BFFF] font-semibold">Oportunidad:</span> Biochar como coproducto de alta rentabilidad (enmienda de suelos, créditos de carbono dCORs, usos industriales), exigencia creciente de certificaciones ISO 50001 y expansión regional hacia Brasil, Chile, Uruguay y Colombia.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUCIÓN */}
      <section id="solucion" className="py-20 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Solución Tecnológica
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Capa de decisión inteligente en el borde de la red
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
              NEXERGY® orquesta adaptativamente múltiples vectores energéticos bajo una única capa de decisión en tiempo real, mediante edge computing sobre Cloudflare Workers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_TECHS.map((t) => (
              <div key={t.name} className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${t.bg}`}>
                  <t.Icon className={`w-6 h-6 ${t.color}`} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{t.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARQUITECTURA MULTI-VECTOR */}
      <section id="arquitectura" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Arquitectura Integrada
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Vectores Energéticos y Capas Funcionales
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Orquestación unificada de cinco capas funcionales desde los sensores físicos hasta el portal SaaS.
            </p>
          </div>

          {/* Vectores energéticos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {VECTORS.map((v) => (
              <div key={v.title} className={`bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all ${v.hover}`}>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mx-auto mb-4 ${v.bg}`}>
                  <v.Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{v.title}</h4>
                <p className="text-gray-400 text-xs">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* 5 capas funcionales */}
          <div className="space-y-3">
            {ARCH_LAYERS.map((layer) => (
              <div key={layer.level} className="bg-[#0a0e27] border border-white/10 rounded-xl p-4 flex items-start gap-4 hover:border-white/20 transition-all">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center">
                  <span className="text-sm font-bold font-mono text-[#00BFFF]">{layer.level}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <layer.Icon className="w-4 h-4 text-gray-400" />
                    <h4 className="text-sm font-bold text-white">{layer.title}</h4>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÓDULOS TECNOLÓGICOS */}
      <section id="modulos" className="py-20 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Programa de Inversión Innova CFI
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Módulos Tecnológicos
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-purple-400 font-semibold">NEXERGY FLEX™</span> es el activo de propiedad intelectual principal (Patente USPTO 64/181,819 e INPI AR113009B1), integrando las aplicaciones de bioenergía, SaaS y electromovilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UNITS.map((u) => (
              <div
                key={u.id}
                className={`bg-[#070c1e] border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden ${u.card}`}
              >
                {u.patent && (
                  <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-purple-500/30">
                    PATENT PENDING
                  </div>
                )}
                {u.primary && (
                  <div className="absolute top-0 left-0 bg-[#00BFFF]/20 text-[#00BFFF] text-[9px] font-mono font-bold px-2.5 py-1 rounded-br border-b border-r border-[#00BFFF]/30">
                    ACTIVO DE IP PRINCIPAL
                  </div>
                )}
                {u.derived && (
                  <div className="absolute top-0 right-0 bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-cyan-500/30">
                    DERIVADO DE FLEX
                  </div>
                )}
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${u.iconBox}`}>
                    <u.Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${u.text}`}>{u.tag}</span>
                  <h4
