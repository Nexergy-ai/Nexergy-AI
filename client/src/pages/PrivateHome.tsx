import { useEffect } from 'react';
import type { ComponentType } from 'react';
import {
  Zap, Cpu, Leaf, CheckCircle2, ArrowRight, Globe, Activity, ExternalLink,
  AtSign, ShieldCheck, FlaskConical, Users, Microscope, Briefcase, Sun,
  BatteryCharging,
  AlertTriangle, Network, Recycle, TrendingDown,
  Gauge, Target, Factory, Cog, Database, BarChart3,
  DollarSign, Award, MapPin, FileText, Scale, Lock, Sprout,
  TrendingUp, UserCheck,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';

type UnitId = 'flex' | 'agro' | 'systems';

interface Unit {
  id: UnitId;
  Icon: ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  patent?: boolean;
  primary?: boolean;
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
  { component: 'Convertidor SST/VSC', metric: 'THD de corriente', baseline: '2,45%', objective: '≤ 5% (IEEE 519)' },
  { component: 'Convertidor SST/VSC', metric: 'Potencia nominal', baseline: '50 kW', objective: '≥ 50 kW (validado en campo)' },
  { component: 'Gasificación APL PP30', metric: 'Poder calorífico syngas', baseline: '4,84 MJ/Nm³', objective: '≥ 5,5 MJ/Nm³' },
  { component: 'Gasificación APL PP30', metric: 'Caudal de syngas', baseline: '82,6 Nm³/h', objective: '≥ 100 Nm³/h' },
  { component: 'Gasificación APL PP30', metric: 'Generación eléctrica', baseline: '25 kW / 30 kW pico', objective: '≥ 35 kW / 45 kW' },
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

const ATS_CRITERIA = [
  { criterio: 'Experiencia en Ventas B2B Consultivas/Industriales', peso: '35', desc: 'Historial comprobable en ciclos de venta largos con decisores técnicos.' },
  { criterio: 'Formación Técnica y Académica', peso: '20', desc: 'Capacidad de dialogar en lenguaje de ingeniería y procesos productivos.' },
  { criterio: 'Ubicación y Cobertura Territorial en Bs. As.', peso: '20', desc: 'Radicación y movilidad en el corredor industrial bonaerense.' },
  { criterio: 'Red de Contactos / Cartera en Parques e Industrias', peso: '15', desc: 'Acceso directo a Gerentes de Planta y Directores de Operaciones.' },
  { criterio: 'Alineación con IA, Datos y Eficiencia Energética', peso: '10', desc: 'Familiaridad con tecnologías de la plataforma NEXERGY®.' },
];

const CANDIDATES = [
  {
    nombre: 'Linerbeth García',
    formacion: 'Máster e Ing. en Petróleo',
    score: '93',
    estado: 'Recomendada',
    destacado: '+8 años en venta consultiva B2B de ingeniería e hidráulica industrial (Verion Argentina). Facturación > USD 1M/año, +30 cuentas corporativas nuevas/año. Métrica comercial y base de ingeniería más sólidas del proceso.',
    badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    nombre: 'Lindomar Moreno Ávila',
    formacion: 'Ing. Química (UTN, 4º año) + Analista de Datos',
    score: '92',
    estado: 'Recomendado',
    destacado: 'Inside Sales B2B en insumos químicos para Oil & Gas e industria (Clariant). Analista de Datos (Power BI, SQL). Habilidad para traducir datos de procesos productivos en propuestas comerciales.',
    badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    nombre: 'Federico Meaca',
    formacion: 'Téc. Electromecánico + Téc. Sup. Higiene y Seguridad',
    score: '88',
    estado: 'Recomendado',
    destacado: 'Ex Secretario de Producción de Gral. Alvarado, creador del Sector Industrial Planificado (SIP). Asesor INTI. Aporta la red de contactos institucionales y de parques industriales más importante de la Provincia de Buenos Aires.',
    badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  },
];

const COMMERCIAL_IMPACT = [
  {
    title: 'Monetización de Gemelos Digitales e IA',
    desc: 'Perfiles que dialogan directamente con Gerentes de Planta y Directores de Operaciones, recortando el ciclo de venta mediante dominio del lenguaje de datos y procesos productivos.',
  },
  {
    title: 'Aceleración en Parques Industriales',
    desc: 'Inserción territorial y red institucional que facilita el desembarco en plantas manufactureras medianas y grandes del corredor bonaerense, acortando la curva de prospección en frío.',
  },
  {
    title: 'Sinergia con Estudio Arcondo & Asoc.',
    desc: 'Identificación de oportunidades tecnológicas (mantenimiento predictivo, eficiencia energética) + aspectos regulatorios, normativos y tarifarios eléctricos para cierre de proyectos llave en mano.',
  },
];

const MARKETING_ACTIONS = [
  { Icon: Globe, title: 'LinkedIn', desc: 'Campaña de reclutamiento EVT-BA: 26 solicitudes en 24h. 58% senior, 52% universitario.', status: 'Activo', color: 'text-[#00BFFF]' },
  { Icon: Lock, title: 'Portal CFI', desc: 'Portal confidencial activo para evaluadores con acceso restringido @cfi.org.ar y 2FA.', status: 'Activo', color: 'text-emerald-400' },
  { Icon: ExternalLink, title: 'Web Pública', desc: 'nexergy.ar + linktr.ee/nexergy.ar con información corporativa y de contacto.', status: 'Activo', color: 'text-[#00BFFF]' },
  { Icon: Target, title: 'Eventos Sectoriales', desc: 'Próxima participación en congresos de energía renovable y agroindustria (2027).', status: 'Planificado', color: 'text-amber-400' },
];

const SALES_FUNNEL = [
  { stage: 'Prospección', target: '12 contactos/mes', desc: 'Identificación de parques industriales y plantas electrointensivas en el corredor bonaerense.' },
  { stage: 'Reunión técnica', target: '4/mes', desc: 'Presentación de Digital Twin y diagnóstico energético al Gerente de Planta o Director de Operaciones.' },
  { stage: 'Propuesta', target: '2/mes', desc: 'Propuesta SaaS + integración con estimación de ahorro y payback < 24 meses para el cliente.' },
  { stage: 'Cierre', target: '1 cada 3 meses', desc: 'Ciclo de venta 3-9 meses. Primer cierre esperado: Q1 2027 (Piloto San Luis).' },
];

const ENTRY_STRATEGY = [
  { step: '1', product: 'NEXERGY SYSTEMS™', action: 'SaaS de diagnóstico (USD 800/mes)', desc: 'Entrada de bajo CAPEX y onboarding rápido. Autofinanciado por ahorros auditados. Sin riesgo para el cliente.' },
  { step: '2', product: 'NEXERGY FLEX™', action: 'Integración + licencia de control', desc: 'Upsell una vez demostrado el ahorro. Valorización de excedentes con CVI y BESS.' },
  { step: '3', product: 'NEXERGY AGRO™', action: 'Gasificación + biochar', desc: 'Para clientes con residuos biomásicos. Coproducto: biochar + créditos de carbono (dCORs).' },
];

const COMMERCIAL_TIMELINE = [
  { quarter: 'Q1 2027', event: 'Cierre Piloto 1 — Microrred & Biomasa (San Luis)', revenue: 'USD 25K/año', status: 'MoU en firma', color: 'text-emerald-400' },
  { quarter: 'Q2 2027', event: 'Cierre Piloto 2 — Planta Electrointensiva (Bs. As.)', revenue: 'USD 18K/año', status: 'MoU pendiente', color: 'text-amber-400' },
  { quarter: 'Q3 2027', event: 'Cierre Piloto 3 — Parque Renovable (Patagonia)', revenue: 'USD 30K/año', status: 'MoU pendiente', color: 'text-amber-400' },
  { quarter: 'Q4 2027', event: 'Prospección Brasil — Grupo Agroindustrial (São Paulo)', revenue: 'USD 45K/año', status: 'Prospección', color: 'text-gray-400' },
];

const FISCAL_BENEFITS = [
  { Icon: TrendingDown, title: 'Contribuciones Patronales (−80%)', desc: 'Reducción del 80% en contribuciones patronales para personal técnico vinculado a actividades de economía del conocimiento. No aplica al ejecutivo comercial.', impact: '~USD 29K', color: 'text-emerald-400' },
  { Icon: DollarSign, title: 'Impuesto a las Ganancias (15%)', desc: 'Alícuota reducida del 15% durante los primeros 3 ejercicios fiscales (empresa nueva), luego 25%. Aplica cuando la empresa genere renta imponible.', impact: 'Post-TRL 6', color: 'text-[#00BFFF]' },
  { Icon: Scale, title: 'Exención Impuesto Bancario', desc: 'Exención del impuesto sobre créditos y débitos bancarios para operaciones vinculadas a la actividad promovida.', impact: '~USD 5-7K', color: 'text-purple-400' },
  { Icon: Globe, title: 'Beneficios por Exportación', desc: 'Reducción adicional de alícuota y beneficios específicos para exportación de servicios de software/SaaS (relevante para expansión Brasil).', impact: 'A confirmar', color: 'text-cyan-400' },
];

const FISCAL_IMPACT = [
  { rubro: 'RRHH Técnico (USD 195K)', impacto: 'Contribuciones patronales reducidas 80% para personal de I+D y software', ahorro: '~USD 29K' },
  { rubro: 'RRHH Comercial (USD 45K)', impacto: 'No califica — actividad comercial no es de economía del conocimiento', ahorro: 'USD 0' },
  { rubro: 'Certificación ISO 9001', impacto: 'Costo único de certificación de calidad (probable requisito del RPEC)', ahorro: '−USD 10-15K' },
  { rubro: 'Inscripción RPEC + honorarios', impacto: 'Trámite AFIP/SEPYME + honorarios contables/legales', ahorro: '−USD 2-5K' },
  { rubro: 'Impuesto bancario', impacto: 'Exención en operaciones vinculadas a actividad promovida', ahorro: '~USD 5-7K' },
];

const FISCAL_RISKS = [
  { riesgo: 'El 80% de la actividad debe ser de economía del conocimiento. El hardware (SST/VSC) y la gasificación (AGRO) no califican directamente.', mitigacion: 'Estructurar el ingreso como SaaS + servicios de I+D (721010) + licencias de IP. Mantener el hardware como R&D interno o licenciado, no como producto vendido.' },
  { riesgo: 'El ejecutivo comercial no califica para la reducción del 80% de contribuciones patronales.', mitigacion: 'El cargo de RRHH Comercial (USD 45K) se mantiene a costo completo en el presupuesto. Solo el personal técnico recibe el beneficio.' },
  { riesgo: 'La certificación de calidad (ISO 9001 o equivalente) puede ser requisito obligatorio para acceder al beneficio de Ganancias.', mitigacion: 'Presupuestar USD 10-15K para certificación en H1. Iniciar el proceso en paralelo con la inscripción RPEC.' },
  { riesgo: 'Los beneficios aplican desde la inscripción en el RPEC, no retroactivamente. Si la inscripción tarda, se pierde ahorro del período previo.', mitigacion: 'Iniciar el trámite de reencuadre AFIP inmediatamente (mes 1-2) para maximizar el período de beneficio dentro del proyecto.' },
];

const FISCAL_CHECKLIST = [
  'Alícuotas vigentes de Ganancias bajo Ley EC (post Ley 27.630) para empresa nueva',
  '¿La reducción del 80% de contribuciones exige certificación de calidad?',
  '¿El personal de I+D en hardware (SST/VSC, gasificación) cuenta para el 80% de actividad?',
  '¿El ejecutivo comercial puede encuadrarse como "servicios conexos" o queda excluido?',
  'Fecha efectiva de beneficios: ¿inscripción o inicio del ejercicio fiscal?',
  '¿El costo de certificación puede imputarse al presupuesto CFI o va con fondos propios?',
  'Alcance exacto de la exención del impuesto bancario',
  'Confirmar si Ley 27.630 modificó la alícuota general y el impacto neto del beneficio',
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
              <span className="text-purple-400 font-semibold">NEXERGY FLEX™</span> es el activo de propiedad intelectual principal (Patente USPTO 64/181,819 e INPI AR113009B1), integrando las aplicaciones de bioenergía y SaaS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVIDENCIA EXPERIMENTAL — TRL 4 */}
      <section id="evidencia" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-3 block">
              Línea Base Experimental
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Evidencia de Validación TRL 4
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ensayos en laboratorio sobre banco SST/VSC (50 kW) y planta gasificadora APL PP30. N=15 corridas experimentales (agosto-octubre 2026), CV &lt; 4%.
            </p>
          </div>

          {/* Tabla de KPIs */}
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="text-left px-4 py-3 font-bold text-gray-300">Componente</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-300">Métrica</th>
                    <th className="text-right px-4 py-3 font-bold text-emerald-400">Línea Base (TRL 4)</th>
                    <th className="text-right px-4 py-3 font-bold text-[#00BFFF]">Objetivo (TRL 6)</th>
                  </tr>
                </thead>
                <tbody>
                  {KPIS.map((k, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-gray-300">{k.component}</td>
                      <td className="px-4 py-3 text-gray-400">{k.metric}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-emerald-400">{k.baseline}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-[#00BFFF]">{k.objective}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Registro de fallos */}
          <div className="mb-8">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Registro de Fallos y Acciones Correctivas</h4>
            <div className="space-y-2">
              {FAILURES.map((f) => (
                <div key={f.code} className="bg-[#0a0e27] border border-white/10 rounded-lg p-4 flex items-start gap-4">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded flex-shrink-0">{f.code}</span>
                  <div className="flex-1">
                    <p className="text-gray-300 text-xs mb-1">{f.event}</p>
                    <p className="text-emerald-400 text-xs"><span className="font-semibold">Correctiva:</span> {f.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validación de terceros e integridad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0e27] border border-emerald-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Validación Independiente</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-300">UNViMe:</strong> Informe INF-POWER-2026-08 (caracterización SST y calidad de potencia)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-300">CONICET:</strong> Reporte REF-BIO-2026-03 (caracterización fisicoquímica de biomasa)</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#0a0e27] border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h4 className="text-sm font-bold text-white">Declaración de Integridad Técnica</h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Los datos crudos, estadísticas, protocolos y resultados presentados son auténticos, verificables y reproducibles, conforme a la Declaración Jurada suscrita por los responsables técnicos (Noviembre 2026).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIACIÓN COMPETITIVA */}
      <section id="diferenciacion" className="py-20 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Diferenciación
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ventajas Competitivas
            </h2>
          </div>

          <div className="bg-[#070c1e] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="text-left px-4 py-3 font-bold text-gray-300">Atributo</th>
                    <th className="text-left px-4 py-3 font-bold text-[#00BFFF]">NEXERGY®</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-500">Competencia Tradicional</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITIVE.map((c, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-semibold text-gray-300">{c.attribute}</td>
                      <td className="px-4 py-3 text-[#00BFFF]">{c.nexergy}</td>
                      <td className="px-4 py-3 text-gray-500">{c.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* PLAN DE INVERSIÓN */}
      <section id="inversion" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Plan de Inversión — USD 600.000
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Presupuesto y Cronograma de Hitos
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              24 meses · 4 hitos tecnológicos secuenciales · Deuda Condicionada Innova CFI
            </p>
          </div>

          {/* Tabla de presupuesto */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Destino de los Fondos</h4>
            <div className="space-y-3">
              {BUDGET.map((b, i) => (
                <div key={i} className="bg-[#0a0e27] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 text-[#00BFFF] flex-shrink-0" />
                      <span className="text-sm font-bold text-white">{b.rubro}</span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-sm font-mono font-bold text-[#00BFFF]">USD {b.amount}</span>
                      <span className="text-xs font-mono text-gray-400 w-12 text-right">{b.percent}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-2 pl-7">{b.funcion}</p>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00BFFF] to-cyan-400 rounded-full" style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="bg-[#0a0e27] border border-[#00BFFF]/30 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm font-bold text-white">TOTAL</span>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-mono font-bold text-[#00BFFF]">USD 600.000</span>
                  <span className="text-xs font-mono text-gray-400">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cronograma de hitos */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Cronograma de Desembolsos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MILESTONES.map((m) => (
                <div key={m.hito} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold font-mono text-[#00BFFF]">{m.hito}</span>
                    <span className="text-[10px] font-mono text-gray-500">{m.meses}</span>
                  </div>
                  <div className="mb-3 pb-3 border-b border-white/5">
                    <div className="text-lg font-mono font-bold text-white">USD {m.desembolso}</div>
                    <div className="text-xs text-gray-400">Desembolso CFI ({m.percent})</div>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{m.entregables}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proyecciones financieras */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Proyecciones Financieras Clave</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {FINANCIAL_HIGHLIGHTS.map((f, i) => (
                <div key={i} className="bg-[#0a0e27] border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-sm font-bold font-mono text-[#00BFFF] mb-1">{f.value}</div>
                  <div className="text-[10px] text-gray-400 mb-1">{f.label}</div>
                  <div className="text-[9px] text-gray-500">{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ESTRATEGIA FISCAL — LEY DE ECONOMÍA DEL CONOCIMIENTO */}
      <section id="fiscal" className="py-20 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-3 block">
              Información Complementaria
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Estrategia Fiscal — Ley de Economía del Conocimiento
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              OPTINEX S.A.S. está en proceso de inscripción en el RPEC (Registro Público de Empresas de la Economía del Conocimiento). Esta sección detalla el encuadre, los beneficios esperados y el impacto en el plan de inversión.
            </p>
          </div>

          {/* Aviso de validación pendiente */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-12 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-300 text-xs font-semibold mb-1">Validación pendiente con Estudio Arcondo &amp; Asoc.</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Las cifras aquí presentadas son estimaciones preliminares basadas en la normativa vigente (Ley 27.506 y modif.). Los montos finales de alícuotas, requisitos de certificación y alcance de beneficios deben ser confirmados por el contador de la empresa antes de su incorporación definitiva al Anexo Financiero.
              </p>
            </div>
          </div>

          {/* Reencuadre de actividades */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Reencuadre AFIP / SEPYME</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#070c1e] border border-emerald-500/30 rounded-2xl p-5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3 inline-block">PRINCIPAL</span>
                <h3 className="text-sm font-bold text-white mb-1">620100</h3>
                <p className="text-gray-400 text-xs">Desarrollo de software / SaaS</p>
              </div>
              <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 mb-3 inline-block">SECUNDARIA</span>
                <h3 className="text-sm font-bold text-white mb-1">711001</h3>
                <p className="text-gray-400 text-xs">Servicios de ingeniería y asesoramiento técnico</p>
              </div>
              <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 mb-3 inline-block">SECUNDARIA</span>
                <h3 className="text-sm font-bold text-white mb-1">721010</h3>
                <p className="text-gray-400 text-xs">Servicios de I+D en ciencias naturales e ingeniería</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-3 text-center">
              Con 620100 como actividad principal, el Certificado MiPyME se reclasifica automáticamente de <span className="text-gray-400">Industria</span> → <span className="text-emerald-400">Servicios</span>, requisito para el RPEC.
            </p>
          </div>

          {/* Beneficios esperados */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Beneficios Esperados</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FISCAL_BENEFITS.map((b, i) => (
                <div key={i} className="bg-[#070c1e] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <b.Icon className={`w-5 h-5 ${b.color}`} />
                    <h3 className="text-sm font-bold text-white">{b.title}</h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">{b.desc}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono text-gray-500">Impacto estimado:</span>
                    <span className={`text-xs font-mono font-bold ${b.color}`}>{b.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impacto en el plan de inversión */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Impacto en el Plan de Inversión CFI</h4>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="text-left px-4 py-3 font-bold text-gray-300">Rubro</th>
                      <th className="text-left px-4 py-3 font-bold text-gray-300">Impacto Ley EC</th>
                      <th className="text-right px-4 py-3 font-bold text-emerald-400">Ahorro est. (24 meses)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FISCAL_IMPACT.map((r, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-3 text-gray-300 font-semibold">{r.rubro}</td>
                        <td className="px-4 py-3 text-gray-400">{r.impacto}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-emerald-400">{r.ahorro}</td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-500/5 border-t border-emerald-500/20">
                      <td className="px-4 py-3 text-white font-bold" colSpan={2}>Neto estimado (ahorro − costos de certificación)</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-emerald-400">+ USD 10-20K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Riesgos y mitigaciones */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Riesgos y Mitigaciones</h4>
            <div className="space-y-3">
              {FISCAL_RISKS.map((r, i) => (
                <div key={i} className="bg-[#070c1e] border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-gray-300 text-xs mb-1"><span className="font-semibold text-amber-400">Riesgo:</span> {r.riesgo}</p>
                      <p className="text-emerald-400 text-xs"><span className="font-semibold">Mitigación:</span> {r.mitigacion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist de validación */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Pendientes de Validación — Estudio Arcondo</h4>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6">
              <ul className="space-y-2">
                {FISCAL_CHECKLIST.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="w-4 h-4 rounded border border-gray-600 flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROPIEDAD INTELECTUAL */}
      <section id="ip" className="py-20 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Propiedad Intelectual
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Activos de Propiedad Intelectual
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Titularidad 100% exclusiva de OPTINEX S.A.S. Sin reclamos de terceros ni restricciones a la explotación comercial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IP_ASSETS.map((ip, i) => (
              <div key={i} className={`bg-[#070c1e] border ${ip.color} rounded-2xl p-6 relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 text-[9px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l ${ip.badge}`}>
                  {ip.tipo.toUpperCase()}
                </div>
                <ip.Icon className={`w-8 h-8 ${ip.iconColor} mb-4`} />
                <h3 className="text-base font-bold text-white mb-2">{ip.identificador}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">{ip.descripcion}</p>
                <p className="text-gray-500 text-xs">{ip.estado}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#070c1e] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-purple-400" />
              <h4 className="text-sm font-bold text-white">Licencias</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400"><strong className="text-gray-300">Explotación comercial:</strong> Propiedad exclusiva 100% OPTINEX S.A.S. (respaldada por PPA USPTO y Marca INPI).</p>
              </div>
              <div>
                <p className="text-xs text-gray-400"><strong className="text-gray-300">Módulos base / conectores:</strong> Licencia Abierta Permisiva (MIT License) para conectores SCADA/IoT, SDKs de integración y motores de telemetría.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Equipo Fundador y Asesores
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Investigación, Industria, Ciencia y Finanzas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((m, i) => (
              <div key={i} className={`bg-[#0a0e27] border ${m.card} rounded-2xl p-6`}>
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${m.iconBox}`}>
                    <m.Icon className={`w-6 h-6 ${m.text}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{m.name}</h3>
                    <p className={`text-[11px] font-mono ${m.text}`}>{m.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{m.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((t) => (
                    <span key={t} className={`text-[10px] font-mono px-2 py-0.5 rounded ${m.iconBox} ${m.text}`}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">A incorporar durante el proyecto: Ing. Software Senior + Científico de Datos + Ing. Electrónica + Ing. Industrial/SCADA + Técnico de campo + Ing. Datos/GIS</p>
            <p className="text-[#00BFFF] text-xs mt-2 font-medium">Ejecutivo/a de Ventas Técnicas B2B — en proceso de selección (ver sección Comercial ↓)</p>
          </div>
        </div>
      </section>

      {/* EXPANSIÓN COMERCIAL — EVT-BA */}
      <section id="comercial" className="py-20 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Expansión Comercial — Ref. EVT-BA
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ejecutivo/a de Ventas Técnicas B2B
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Proceso de selección en curso para fortalecer la capacidad comercial en la Provincia de Buenos Aires.
            </p>
          </div>

          {/* Stats del proceso */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-[#00BFFF] mb-1">26</div>
              <div className="text-xs text-gray-400">Solicitudes en 24h (LinkedIn)</div>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-emerald-400 mb-1">58%</div>
              <div className="text-xs text-gray-400">Con experiencia relevante / Senior</div>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl font-extrabold text-purple-400 mb-1">52%</div>
              <div className="text-xs text-gray-400">Con nivel universitario (Grado / Posgrado)</div>
            </div>
          </div>

          {/* Matriz ATS */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Matriz de Evaluación ATS (0-100 pts)</h4>
            <div className="space-y-3">
              {ATS_CRITERIA.map((c, i) => (
                <div key={i} className="bg-[#070c1e] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-gray-200">{c.criterio}</span>
                      <p className="text-gray-500 text-xs mt-0.5">{c.desc}</p>
                    </div>
                    <span className="text-sm font-mono font-bold text-[#00BFFF] flex-shrink-0 ml-4">{c.peso}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-[#00BFFF] to-cyan-400 rounded-full" style={{ width: `${c.peso}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 candidatos */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Top 3 Preseleccionados</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CANDIDATES.map((c, i) => (
                <div key={i} className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold font-mono text-[#00BFFF]">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{c.nombre}</h3>
                        <p className="text-[10px] text-gray-400">{c.formacion}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-extrabold text-[#00BFFF]">{c.score}</div>
                      <div className="text-[9px] text-gray-500">/ 100</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${c.badge} inline-flex items-center gap-1`}>
                      <UserCheck className="w-3 h-3" /> {c.estado}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{c.destacado}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">
              Suplentes: Juan León Martel (85 pts) · Matías Prediger (84 pts) · Alejandro Nogal Pintos (83 pts)
            </p>
          </div>

          {/* Impacto estratégico */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Impacto Estratégico</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COMMERCIAL_IMPACT.map((imp, i) => (
                <div key={i} className="bg-[#070c1e] border border-white/10 rounded-2xl p-6">
                  <TrendingUp className="w-6 h-6 text-[#00BFFF] mb-3" />
                  <h3 className="text-sm font-bold text-white mb-2">{imp.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{imp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARKETING Y VENTAS */}
      <section id="ventas" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Marketing y Ventas
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Estrategia Comercial e Impacto Esperado
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Acciones de marketing ejecutadas, embudo de ventas B2B y proyección de ingresos por trimestre.
            </p>
          </div>

          {/* Acciones de marketing */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Acciones de Marketing</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MARKETING_ACTIONS.map((m, i) => (
                <div key={i} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <m.Icon className={`w-5 h-5 ${m.color}`} />
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${m.status === 'Activo' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>{m.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{m.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Embudo de ventas */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Embudo Comercial B2B (con ejecutivo incorporado)</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SALES_FUNNEL.map((s, i) => (
                <div key={i} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-5 relative">
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center">
                    <span className="text-xs font-bold font-mono text-[#00BFFF]">{i + 1}</span>
                  </div>
                  <div className="pt-3">
                    <h3 className="text-sm font-bold text-white mb-1">{s.stage}</h3>
                    <div className="text-lg font-mono font-bold text-[#00BFFF] mb-2">{s.target}</div>
                    <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estrategia de entrada */}
          <div className="mb-12">
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Estrategia de Entrada: SaaS → Upsell</h4>
            <div className="space-y-3">
              {ENTRY_STRATEGY.map((e, i) => (
                <div key={i} className="bg-[#0a0e27] border border-white/10 rounded-xl p-5 flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center">
                    <span className="text-sm font-bold font-mono text-[#00BFFF]">{e.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">{e.product}</h3>
                      <span className="text-xs text-gray-400">— {e.action}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline comercial */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Timeline de Cierres Esperados</h4>
            <div className="space-y-3">
              {COMMERCIAL_TIMELINE.map((t, i) => (
                <div key={i} className="bg-[#0a0e27] border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="flex-shrink-0 text-center w-20">
                    <div className="text-sm font-bold font-mono text-[#00BFFF]">{t.quarter}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">{t.event}</h3>
                    <span className={`text-xs ${t.color}`}>{t.status}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-mono font-bold text-[#00BFFF]">{t.revenue}</div>
                  </div>
                </div>
              ))}
              <div className="bg-[#0a0e27] border border-[#00BFFF]/30 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm font-bold text-white">Pipeline total anual (si se cierran los 4)</span>
                <span className="text-lg font-mono font-bold text-[#00BFFF]">USD 118K/año</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACTO */}
      <section id="impacto" className="py-20 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Impacto del Proyecto
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Impacto Productivo, Ambiental y Federal
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {IMPACT_STATS.map((s, i) => (
              <div key={i} className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center">
                <s.Icon className={`w-6 h-6 ${s.color} mx-auto mb-3`} />
                <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Impacto federal y ecosistema */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#00BFFF]" />
                <h4 className="text-sm font-bold text-white">Impacto Federal</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><strong className="text-gray-300">CABA:</strong> Sede legal y financiera</li>
                <li><strong className="text-gray-300">San Luis:</strong> I+D, laboratorios y pilotos (Villa Mercedes)</li>
                <li><strong className="text-gray-300">Buenos Aires:</strong> Gestión y desarrollo de software</li>
                <li><strong className="text-gray-300">Expansión:</strong> Brasil (São Paulo) → Chile, Uruguay, Colombia</li>
              </ul>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Ecosistema y Vinculación</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><strong className="text-gray-300">UNSL:</strong> Universidad Nacional de San Luis</li>
                <li><strong className="text-gray-300">UNViMe:</strong> Universidad Nacional de Villa María</li>
                <li><strong className="text-gray-300">UNRC:</strong> Universidad Nacional de Río Cuarto</li>
                <li><strong className="text-gray-300">CONICET:</strong> Validación experimental independiente</li>
              </ul>
            </div>
          </div>

          {/* Pipeline comercial */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase mb-4">Pipeline Comercial</h4>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="text-left px-4 py-3 font-bold text-gray-300">Cliente / Prospecto</th>
                      <th className="text-left px-4 py-3 font-bold text-gray-300">Estado</th>
                      <th className="text-right px-4 py-3 font-bold text-gray-300">Monto anual estimado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PIPELINE.map((p, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-3 text-gray-300">{p.nombre}</td>
                        <td className="px-4 py-3 text-gray-400">{p.estado}</td>
                        <td className="px-4 py-3 text-right font-mono text-[#00BFFF]">{p.monto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050814] text-center text-xs text-gray-500 space-y-3">
        <p>© 2026 <strong>OPTINEX S.A.S.</strong> — CUIT 30-71945566-9 — Todos los derechos reservados.</p>
        <p className="font-mono text-[10px] text-gray-400">
          Marca Registrada INPI Arg. Reg. Nº 3.941.093 (vto. 14/09/2036) · Patente INPI AR113009B1 · USPTO Provisional App. Nº 64/181,819 (PCT antes 22/10/2027)
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px] pt-1">
          <span className="text-emerald-400 font-medium inline-flex items-center gap-1.5">
            <AtSign className="w-3.5 h-3.5" /> contacto@nexergy.ar
          </span>
          <span className="text-gray-700">•</span>
          <a href="https://nexergy.ar" target="_blank" rel="noopener noreferrer" className="text-[#00BFFF] hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5" /> nexergy.ar
          </a>
          <span className="text-gray-700">•</span>
          <a href="https://linktr.ee/nexergy.ar" target="_blank" rel="noopener noreferrer" className="text-[#00BFFF] hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5" /> linktr.ee/nexergy.ar
          </a>
        </div>
        <p className="text-[10px] text-gray-600 pt-2">
          Programa Innova CFI — Fideicomiso Fondo de Inversión en Innovación · Deuda Condicionada USD 600.000 · 24 meses
        </p>
      </footer>
    </div>
  );
}
