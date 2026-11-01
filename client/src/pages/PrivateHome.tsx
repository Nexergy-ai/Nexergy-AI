import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import {
  Zap, Cpu, Leaf, CheckCircle2, ArrowRight, Globe, Activity, ExternalLink,
  AtSign, ShieldCheck, FlaskConical, Users, Microscope, Briefcase, Sun, BatteryCharging, Car
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
    title: 'Energía Bidireccional',
    description:
      'Núcleo tecnológico principal (Patente PPA). Orquestación adaptativa para la gestión inteligente de excedentes renovables mediante el índice CVI e integración BESS/H₂.',
    bullets: [
      'Control bidireccional SST / VSC',
      'Índice CVI (Zero Curtailment)',
      'Optimización BESS e Hidrógeno Verde',
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
    title: 'Bioenergía & Biomasa',
    description:
      'Inteligencia territorial de biomasa para la conversión de residuos y efluentes agroindustriales en energía limpia, térmica y biochar bajo economía circular.',
    bullets: [
      'Mapeo e inteligencia territorial GIS+ETL',
      'Ensayos de gasificación y cogeneración',
      'Modelado de reducción de huella de CO₂',
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
      'SaaS energético de monetización temprana. Diagnóstico automático por IA, Digital Twins, auditoría ISO 50001 y proyectos autofinanciados.',
    bullets: [
      'Digital Twin e IA de diagnóstico energético',
      'Auditoría automática de facturas y potencia',
      'Esquema autofinanciado por ahorros reales',
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
    title: 'Movilidad Eléctrica Pesada',
    description:
      'Aplicación derivada de FLEX. Infraestructura de carga inteligente AC/DC con almacenamiento BESS integrado para flotas industriales y logísticas.',
    bullets: [
      'Gestión de carga sin picos de demanda',
      'Integración con FLEX y baterías BESS',
      'Reducción de OPEX en logística pesada',
    ],
    card: 'border-white/10 hover:border-[#00BFFF]/50',
    iconBox: 'bg-cyan-500/10 border-cyan-500/30 text-[#00BFFF]',
    text: 'text-[#00BFFF]',
    check: 'text-[#00BFFF]',
  },
];

export default function PrivateHome() {
  useEffect(() => {
    document.title = "NEXERGY® | Portal Confidencial EBT";
  }, []);

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans selection:bg-[#00BFFF] selection:text-[#070c1e]">
      <Navigation />

      {/* HERO SECTION */}
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
              Patent Pending USPTO 64/181,819 · Marca Reg. INPI 3.941.093
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Plataforma integrada de{' '}
            <span className="text-[#00BFFF] bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#00BFFF] md:via-cyan-300 md:to-teal-300 print:text-[#00BFFF]">
              inteligencia energética distribuida
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Programa de escalamiento tecnológico (TRL 3-4 ➔ TRL 6) basado en electrónica de potencia, IA y control adaptativo para orquestar recursos distribuidos en tiempo real.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#unidades"
              className="bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-[#00BFFF]/20 flex items-center justify-center gap-2"
            >
              Módulos Tecnológicos
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ARQUITECTURA MULTI-VECTOR */}
      <section id="plataforma" className="py-20 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Plataforma Integrada
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Control Adaptativo Multi-Vector
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Orquestación unificada de generación renovable, biomasa, almacenamiento BESS, movilidad e hidrógeno verde.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-[#00BFFF]/40">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">RENOVABLES</h4>
              <p className="text-gray-400 text-xs">Integración y valorización de excedentes (CVI).</p>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-emerald-500/40">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">BIOMASA</h4>
              <p className="text-gray-400 text-xs">Mapeo territorial y conversión de residuos en energía.</p>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-purple-500/40">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-4">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">BESS E HIDRÓGENO</h4>
              <p className="text-gray-400 text-xs">Almacenamiento dinámico y flexibilidad de red.</p>
            </div>
            <div className="bg-[#070c1e] border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-[#00BFFF]/40">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border-cyan-500/30 text-[#00BFFF] flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">MOVILIDAD ELÉCTRICA</h4>
              <p className="text-gray-400 text-xs">Infraestructura inteligente de carga para flotas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MÓDULOS TECNOLÓGICOS DEL PROGRAMA */}
      <section id="unidades" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Programa de Inversión Innova CFI
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Módulos Tecnológicos Complementarios
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="text-purple-400 font-semibold">NEXERGY FLEX™</span> actúa como activo de propiedad intelectual principal (Patente USPTO 64/181,819), integrando las aplicaciones de bioenergía, SaaS y electromovilidad.
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

      {/* ROADMAP TRL 3-4 A TRL 6 & PROPIEDAD INTELECTUAL */}
      <section id="madurez" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-2 block">
              Escalamiento Tecnológico (24 Meses)
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Objetivo de Madurez: TRL 3-4 ➔ TRL 6
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              El financiamiento del programa se destina principalmente a I+D, validaciones experimentales, ensayos de laboratorio, prototipos en hardware e integración de pilotos industriales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0e27] border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-purple-500/30">
                PATENTE PROVISIONAL
              </div>
              <ShieldCheck className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-white">USPTO Nº 64/181,819</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-2">
                <strong>"Systems and Methods for Intelligent Valorization of Renewable Energy Surplus Through Adaptive Multi-Vector Management"</strong>
              </p>
              <p className="text-gray-500 text-xs">
                Provisional App (35 USC 111(b)) · Titular: OPTINEX S.A.S.
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-[#00BFFF]/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#00BFFF]/20 text-[#00BFFF] text-[10px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-[#00BFFF]/30">
                MARCA REGISTRADA
              </div>
              <ShieldCheck className="w-8 h-8 text-[#00BFFF] mb-4" />
              <h3 className="text-lg font-bold mb-2 text-white">INPI Nº 3.941.093</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-2">
                Marca Registrada <strong>OPTINEX® / NEXERGY®</strong> — Clase 9
              </p>
              <p className="text-gray-500 text-xs">
                Concedida · DI-2026-319-APN-DNM#INPI · Titular: OPTINEX S.A.S.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO TECNOLÓGICO & FINANCIERO */}
      <section id="equipo" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Equipo Fundador & Dirección Ejecutiva
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Investigación, Industria, Ciencia y Finanzas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0a0e27] border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Microscope className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Dr. Ing. Jonathan Bosso</h3>
                  <p className="text-purple-400 text-[11px] font-mono">CEO — Director Ejecutivo</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Doctor en Ingeniería. 15+ años en electrónica de potencia y convertidores bidireccionales. Co-inventor de la Patente USPTO Nº 64/181,819.
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-[#00BFFF]/30 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#00BFFF]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Mgtr. Ing. Juan José López</h3>
                  <p className="text-[#00BFFF] text-[11px] font-mono">CTO — Director de Software</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Magíster en Ingeniería de Software. 14+ años en industria. Especialista en SCADA, IoT y Digital Twin. Co-inventor de la Patente USPTO Nº 64/181,819.
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Dr. Eduardo Guerreiro</h3>
                  <p className="text-emerald-400 text-[11px] font-mono">CSO — Director Científico</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Doctor en Química. 21+ años en industria. Especialista en hidrógeno, biomasa y Six Sigma MBB. Co-inventor de la Patente USPTO Nº 64/181,819.
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-amber-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Cp. Joaquín Arcondo</h3>
                  <p className="text-amber-400 text-[11px] font-mono">CFO — Asesor Financiero</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Contador Público. Especialista en estructuración financiera de EBTs, rendición de fondos públicos y auditoría contable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050814] text-center text-xs text-gray-500 space-y-3">
        <p>© 2026 <strong>OPTINEX S.A.S.</strong> — CUIT 30-71945566-9 — Todos los derechos reservados.</p>
        <p className="font-mono text-[10px] text-gray-400">
          Marca Registrada INPI Arg. Reg. Nº 3.941.093 · USPTO Provisional App. Nº 64/181,819
        </p>
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
