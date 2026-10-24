import { useState } from 'react';
import { 
  Zap, Cpu, Leaf, CheckCircle2, 
  ArrowRight, Globe, Activity 
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import OperationalInput from '@/components/OperationalInput';

export default function Home() {
  const [selectedUnit, setSelectedUnit] = useState<string>('flex');

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans selection:bg-[#00BFFF] selection:text-[#070c1e]">
      
      {/* 1. NAVEGACIÓN SUPERIOR */}
      <Navigation />

      {/* 2. HERO PRINCIPAL */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20 mb-6">
            <Globe className="w-3.5 h-3.5" />
            Propiedad Intelectual Protegida & Tecnología Argentina
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Convertimos tus desafíos energéticos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] via-cyan-300 to-teal-300">soluciones reales</span>.
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Ingeniería, electrónica de potencia e inteligencia operacional para transformar biomasa, integrar movilidad eléctrica y orquestar excedentes energéticos con patente pendiente ante la USPTO.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#unidades"
              className="w-full sm:w-auto bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-[#00BFFF]/20 flex items-center justify-center gap-2"
            >
              Explorar Unidades de Negocio
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#contacto"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              Hablemos de tu Proyecto
            </a>
          </div>
        </div>
      </section>

      {/* 3. TRES UNIDADES DE NEGOCIO + COMPLIANCE */}
      <section id="unidades" className="py-24 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3">
              Brochure Institucional & Propiedad Intelectual
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">
              Unidades Especializadas de Ingeniería & Tecnología
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* UNIDAD 1: NEXERGY FLEX */}
            <div className="bg-[#0a0e27] border border-purple-500/40 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-[9px] font-mono font-bold px-2.5 py-1 rounded-bl border-b border-l border-purple-500/30">
                PATENT PENDING
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">Nexergy Flex</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-2">Energía Bidireccional</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  Convertidores de potencia de última generación (SST/VSC) y motor multivector (MVDE) para valorizar excedentes y estabilizar la red.
                </p>

                <div className="p-2.5 mb-5 rounded bg-purple-950/40 border border-purple-500/20 text-[10px] font-mono text-purple-300">
                  <span className="font-bold block text-purple-200">USPTO PPA App #: 64/181,819</span>
                  Multi-Vector Energy Surplus Valorization
                </div>

                <ul className="space-y-2 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>Control bidireccional SST / VSC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>Índice CVI (Zero Curtailment)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>Optimización BESS e Hidrógeno</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('flex')}
                className="w-full py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors text-center"
              >
                Consultar Nexergy Flex
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* UNIDAD 2: AGRO & BIOENERGÍA */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Nexergy Agro</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-2">Bioenergía & Biomasa</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Transformamos rastrojos, cáscaras, efluentes y subproductos agroindustriales en energía limpia, calor, electricidad y biochar.
                </p>

                <ul className="space-y-2 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Biomass Intelligence & Mapeo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Gasificación y co-generación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Economía circular y reducción CO₂</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('agro')}
                className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors text-center"
              >
                Consultar Agro
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* UNIDAD 3: EV CHARGE */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00BFFF] mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00BFFF]">Nexergy EV Charge</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-2">Movilidad Eléctrica</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Estaciones de carga para vehículos eléctricos alimentadas con energía solar/eólica y almacenamiento para barrios privados e industrias.
                </p>

                <ul className="space-y-2 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFFF] flex-shrink-0" />
                    <span>Cargadores AC/DC inteligentes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFFF] flex-shrink-0" />
                    <span>Integración solar y BESS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFFF] flex-shrink-0" />
                    <span>Plusvalía para comunidades</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('ev')}
                className="w-full py-2.5 bg-[#00BFFF]/10 hover:bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors text-center"
              >
                Consultar EV Charge
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* UNIDAD 4: NEXERGY SYSTEMS & COMPLIANCE */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">Nexergy Systems</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-2">Sistemas & Compliance</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Digital Twin, auditoría energética y estructura legal-financiera autofinanciada mediante el ahorro generado (En alianza con Arcondo & Asoc.).
                </p>

                <ul className="space-y-2 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Modelado Digital Twin e Industria 4.0</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Res. CRPEE 13/2012 e ISO 50001</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Plan 100% autofinanciado</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('systems')}
                className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors text-center"
              >
                Consultar Systems
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SECCIÓN VISUAL DEL MÉTODO NEXERGY */}
      <section id="metodo" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Metodología Operativa
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              El Método de Optimización y Solución de Problemas
            </h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Nuestro protocolo sistemático de 5 pasos para eliminar ineficiencias, simplificar procesos y acelerar la transformación energética.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">01</span>
                <h3 className="text-sm font-bold text-white mb-2">Hacer Requisitos SMART</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Cuestionamos los parámetros iniciales y suprimimos restricciones infundadas que frenan la factibilidad.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">02</span>
                <h3 className="text-sm font-bold text-white mb-2">Eliminar Partes del Proceso</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Removemos componentes, intermediarios y trámites prescindibles para acortar la cadena de ejecución.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">03</span>
                <h3 className="text-sm font-bold text-white mb-2">Simplificar u Optimizar</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Optimizamos únicamente lo indispensable, evitando perfeccionar etapas que nunca debieron existir.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">04</span>
                <h3 className="text-sm font-bold text-white mb-2">Acelerar Tiempo de Ciclo</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Comprimimos la velocidad de respuesta e iteración para lograr resultados operativos en tiempo récord.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">05</span>
                <h3 className="text-sm font-bold text-white mb-2">Automatizar</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Desplegamos capas de control e inteligencia operacional sobre el flujo simplificado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FORMULARIO DE ALTA Y CONTACTO OPERACIONAL */}
      <section id="contacto" className="py-24 px-6 bg-[#070c1e] relative">
        <div className="max-w-4xl mx-auto">
          <OperationalInput />
        </div>
      </section>

      {/* FOOTER CON MARCA DE PATENTE PPA */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050814] text-center text-xs text-gray-500 space-y-3">
        <p>© 2026 NEXERGY. Todos los derechos reservados. Optinex SAS.</p>
        <p className="font-mono text-[10px] text-gray-400">
          USPTO Patent Pending Application Serial No. 64/181,819 · Docket: PYUS/PV/001
        </p>
      </footer>

    </div>
  );
}
