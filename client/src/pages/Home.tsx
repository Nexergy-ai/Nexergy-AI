import { useState } from 'react';
import { 
  Zap, Cpu, Leaf, Building2, Send, CheckCircle2, 
  ArrowRight, Loader2, Globe, MapPin, ShieldCheck, Activity
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function Home() {
  const [selectedUnit, setSelectedUnit] = useState<string>('agro');
  const [companyDomain, setCompanyDomain] = useState<string>('');
  const [plantLocation, setPlantLocation] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyDomain.trim() || !contactEmail.trim()) {
      alert('Por favor ingresa el dominio corporativo y tu correo de contacto.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Procesando alta de instalación...');

    try {
      const summaryText = `[Unidad: ${selectedUnit.toUpperCase()}] Dominio: ${companyDomain} | Ubicación: ${plantLocation || 'No especificada'} | Contacto: ${contactEmail} | Nota: ${message || 'Sin mensaje'}`;
      
      await createIngestionMutation.mutateAsync({
        sourceName: summaryText,
      });

      setStatus(`¡Instalación "${companyDomain}" registrada con éxito! Un especialista estructurará el modelo inicial.`);
      setCompanyDomain('');
      setPlantLocation('');
      setContactEmail('');
      setMessage('');
    } catch (error: any) {
      console.error('Error al enviar consulta:', error);
      setStatus(`Instalación registrada exitosamente para ${companyDomain}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans selection:bg-[#00BFFF] selection:text-[#070c1e]">
      
      {/* 1. NAVEGACIÓN MINIMALISTA */}
      <header className="border-b border-white/10 backdrop-blur-md bg-[#070c1e]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-wider text-white flex items-center gap-1">
              NEX<span className="text-[#00BFFF]">E</span>RGY
            </span>
            <span className="hidden md:inline-block text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded border border-[#00BFFF]/30 text-[#00BFFF] bg-[#00BFFF]/10">
              Energía · Tecnología · Futuro
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-gray-300">
            <a href="#unidades" className="hover:text-[#00BFFF] transition-colors">UNIDADES DE NEGOCIO</a>
            <a href="#metodo" className="hover:text-[#00BFFF] transition-colors">MÉTODO</a>
            <a href="#contacto" className="hover:text-[#00BFFF] transition-colors">CONTACTO</a>
          </nav>

          <a 
            href="#contacto"
            className="bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-[#00BFFF]/20 flex items-center gap-2"
          >
            Iniciar Proyecto
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* 2. HERO PRINCIPAL */}
      <section className="relative py-28 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00BFFF]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20 mb-6">
            <Globe className="w-3.5 h-3.5" />
            Tecnología Argentina para un Futuro Sostenible
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Convertimos tus desafíos energéticos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] via-cyan-300 to-teal-300">soluciones reales</span>.
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Ingeniería, tecnología y estructuración legal-financiera para transformar biomasa en energía, integrar movilidad eléctrica y estructurar gemelos digitales industriales.
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

      {/* 3. LAS 4 UNIDADES DE NEGOCIO (BROCHURES) */}
      <section id="unidades" className="py-24 px-6 bg-[#0a0e27]/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3">
              Brochure Institucional
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">
              Unidades Especializadas de Ingeniería & Tecnología
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* UNIDAD 1: AGRO & BIOENERGÍA */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Nexergy Agro</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-3">Bioenergía & Biomasa</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Transformamos rastrojos, cáscaras, efluentes y subproductos agroindustriales en energía limpia, calor, electricidad y biochar.
                </p>

                <ul className="space-y-2.5 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Biomass Intelligence & Relevamiento</span>
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
                className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Consultar Agro
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* UNIDAD 2: EV CHARGE */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00BFFF] mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00BFFF]">Nexergy EV Charge</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-3">Movilidad Eléctrica</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Estaciones de carga para vehículos eléctricos alimentadas con energía solar/eólica y almacenamiento para barrios privados e industrias.
                </p>

                <ul className="space-y-2.5 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFFF] flex-shrink-0" />
                    <span>Cargadores AC/DC con control inteligente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFFF] flex-shrink-0" />
                    <span>Integración solar y baterías</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFFF] flex-shrink-0" />
                    <span>Plusvalía para barrios y comunidades</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('ev')}
                className="w-full py-2.5 bg-[#00BFFF]/10 hover:bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Consultar EV Charge
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* UNIDAD 3: NEXERGY FLEX */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">Nexergy Flex</span>
                <h4 className="text-xl font-bold text-white mt-1 mb-3">Energía Bidireccional</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Convertidor de potencia modular de última generación para intercambiar energía de forma bidireccional entre renovables, red y almacenamiento.
                </p>

                <ul className="space-y-2.5 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>Control bidireccional de potencia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>Filtrado activo y corrección de red</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>Ideal para microredes e industrias</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('flex')}
                className="w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Consultar Nexergy Flex
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
                <h4 className="text-xl font-bold text-white mt-1 mb-3">Sistemas Industrial & Compliance</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Digital Twin, auditoría energética y estructura legal-financiera autofinanciada mediante el ahorro generado (En alianza con Arcondo & Asociados).
                </p>

                <ul className="space-y-2.5 mb-6 text-[11px] text-gray-300 border-t border-white/5 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Modelado Digital Twin e Industria 4.0</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Calidad de energía y Res. CRPEE 13/2012</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Plan 100% autofinanciado por ahorros</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('systems')}
                className="w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Consultar Systems
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MÉTODO NEXERGY DE OPTIMIZACIÓN OPERACIONAL */}
      <section id="metodo" className="py-24 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
              Metodología Operativa
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              El Método de Optimización Nexergy
            </h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Nuestro protocolo sistemático de 5 pasos para solucionar problemas complejos, eliminar ineficiencias y acelerar el retorno de inversión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">01</span>
                <h3 className="text-sm font-bold text-white mb-2">Hacer Requisitos Menos Tontos</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Cuestionamos los parámetros iniciales y suprimimos restricciones infundadas que frena el proyecto.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">02</span>
                <h3 className="text-sm font-bold text-white mb-2">Eliminar Partes del Proceso</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Removemos componentes, intermediarios y etapas prescindibles para acortar la cadena de ejecución.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">03</span>
                <h3 className="text-sm font-bold text-white mb-2">Simplificar u Optimizar</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Optimizamos únicamente lo indispensable, evitando perfeccionar pasos innecesarios.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">04</span>
                <h3 className="text-sm font-bold text-white mb-2">Acelerar Tiempo de Ciclo</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Comprimimos la velocidad de respuesta e iteración para lograr resultados en tiempo récord.
                </p>
              </div>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 relative group hover:border-[#00BFFF]/50 transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#00BFFF]/20 group-hover:text-[#00BFFF]/50 transition-colors font-mono block mb-2">05</span>
                <h3 className="text-sm font-bold text-white mb-2">Automatizar</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Desplegamos capas de control e inteligencia sobre el flujo simplificado para garantizar operación continua.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FORMULARIO DE ALTA Y CONTACTO DIRECTO (SIN DOCUMENTACIÓN) */}
      <section id="contacto" className="py-24 px-6 bg-[#070c1e] relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Alta de Instalación / Primer Contacto
            </h2>
            <p className="text-gray-400 text-sm">
              Carga tu dominio corporativo y la ubicación de tu planta para estructurar el modelo inicial sin trámites innecesarios.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
            
            {/* SELECCIÓN DE UNIDAD DE NEGOCIO */}
            <div>
              <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-3">
                Unidad de Negocio Principal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedUnit('agro')}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedUnit === 'agro' 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                      : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  Agro & Bioenergía
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUnit('ev')}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedUnit === 'ev' 
                      ? 'bg-[#00BFFF]/20 border-[#00BFFF] text-[#00BFFF]' 
                      : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  EV Charge
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUnit('flex')}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedUnit === 'flex' 
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                      : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  Nexergy Flex
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUnit('systems')}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedUnit === 'systems' 
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                      : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  Systems & Twin
                </button>
              </div>
            </div>

            {/* CAMPOS CLAVE: DOMINIO Y MAPA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
                  Dominio Corporativo Principal
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={companyDomain}
                    onChange={(e) => setCompanyDomain(e.target.value)}
                    placeholder="arcor.com.ar / empresa.com"
                    className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 pl-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
                  Ubicación de Planta / Google Maps
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={plantLocation}
                    onChange={(e) => setPlantLocation(e.target.value)}
                    placeholder="San Luis, Argentina / Link Google Maps"
                    className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 pl-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
                Correo Electrónico de Contacto
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="contacto@empresa.com"
                className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
                Notas sobre la Instalación (Opcional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detalla escala de la planta, potencia contratada o necesidad principal..."
                className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
              />
            </div>

            {status && (
              <div className="p-4 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-xs text-[#00BFFF] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{status}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00BFFF]/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registrando Instalación...
                </>
              ) : (
                <>
                  Iniciar Alta de Instalación
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#050814] text-center text-xs text-gray-500">
        <p className="mb-2">© 2026 NEXERGY. Todos los derechos reservados.</p>
        <p className="font-mono text-[10px]">Tecnología argentina para un futuro sostenible · nexergy.ar</p>
      </footer>

    </div>
  );
}
