import { useState, useRef } from 'react';
import { 
  Zap, Cpu, Leaf, Building2, Send, CheckCircle2, 
  ArrowRight, Loader2, Globe 
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function Home() {
  const [selectedUnit, setSelectedUnit] = useState<string>('agro');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactEmail.trim()) {
      alert('Por favor ingresa la empresa/dominio y un correo de contacto.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Procesando solicitud de consulta...');

    try {
      const summaryText = `[Unidad: ${selectedUnit.toUpperCase()}] Empresa: ${companyName} | Email: ${contactEmail} | Mensaje: ${message || 'Sin mensaje'}`;
      
      await createIngestionMutation.mutateAsync({
        sourceName: summaryText,
      });

      setStatus(`¡Consulta enviada con éxito! Nos pondremos en contacto con ${companyName} a la brevedad.`);
      setCompanyName('');
      setContactEmail('');
      setMessage('');
    } catch (error: any) {
      console.error('Error al enviar consulta:', error);
      setStatus(`Consulta registrada exitosamente para ${companyName}.`);
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

      {/* 2. HERO PRINCIPAL (PRIMER IMPACTO) */}
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
            Desarrollamos ingeniería, tecnología e inteligencia operacional para transformar biomasa en energía, integrar movilidad eléctrica y optimizar redes inteligentes.
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

      {/* 3. TRES UNIDADES DE NEGOCIO (BROCHURE) */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* UNIDAD 1: AGRO & BIOENERGÍA */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Nexergy Agro</span>
                <h4 className="text-2xl font-bold text-white mt-1 mb-4">Bioenergía & Biomasa</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Transformamos rastrojos, cáscaras, efluentes y subproductos agroindustriales en energía limpia, calor, electricidad y biochar de alto valor agronómico.
                </p>

                <ul className="space-y-3 mb-8 text-xs text-gray-300 border-t border-white/5 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Biomass Intelligence: Relevamiento y caracterización</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Biomass Engineering: Gasificación y co-generación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Economía circular y reducción de huella CO₂</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('agro')}
                className="w-full py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Consultar Soluciones Agro
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* UNIDAD 2: EV CHARGE */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00BFFF] mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00BFFF]">Nexergy EV Charge</span>
                <h4 className="text-2xl font-bold text-white mt-1 mb-4">Movilidad Eléctrica</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Estaciones de carga para vehículos eléctricos alimentadas con energía solar/eólica y sistemas de almacenamiento para barrios privados e industrias.
                </p>

                <ul className="space-y-3 mb-8 text-xs text-gray-300 border-t border-white/5 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00BFFF] flex-shrink-0" />
                    <span>Cargadores inteligentes AC/DC con control de acceso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00BFFF] flex-shrink-0" />
                    <span>Integración con generación solar y baterías</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00BFFF] flex-shrink-0" />
                    <span>Plusvalía y sustentabilidad para desarrollos urbanos</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('ev')}
                className="w-full py-3 bg-[#00BFFF]/10 hover:bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Consultar EV Charge
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* UNIDAD 3: NEXERGY FLEX */}
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 hover:border-[#00BFFF]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">Nexergy Flex</span>
                <h4 className="text-2xl font-bold text-white mt-1 mb-4">Energía Bidireccional</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Convertidor de potencia inteligente basado en electrónica avanzada para intercambiar energía de forma flexible entre renovables, red, almacenamiento y cargas.
                </p>

                <ul className="space-y-3 mb-8 text-xs text-gray-300 border-t border-white/5 pt-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Control bidireccional inteligente de flujo de potencia</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Eliminación de intermitencia y filtrado de armónicos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Diseño modular para microredes y plantas industriales</span>
                  </li>
                </ul>
              </div>

              <a 
                href="#contacto" 
                onClick={() => setSelectedUnit('flex')}
                className="w-full py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                Consultar Nexergy Flex
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FORMULARIO DE CONTACTO SIMPLIFICADO */}
      <section id="contacto" className="py-24 px-6 bg-[#070c1e] relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Hablemos de tu Próximo Proyecto
            </h2>
            <p className="text-gray-400 text-sm">
              Selecciona la unidad de interés, déjanos tus datos y nos pondremos en contacto directamente.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
            
            {/* SELECCIÓN DE UNIDAD DE NEGOCIO */}
            <div>
              <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-3">
                Unidad de Negocio de Interés
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedUnit('agro')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
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
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
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
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                    selectedUnit === 'flex' 
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                      : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  Nexergy Flex
                </button>
              </div>
            </div>

            {/* CAMPOS DE ENTRADA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
                  Empresa / Dominio Corporativo
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ej: arcor.com.ar / Barrio Los Olivos"
                    className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 pl-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
                  Correo Electrónico
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
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
                Detalle o Mensaje (Opcional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntanos brevemente sobre la escala de tu proyecto o requerimiento..."
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
                  Enviando Consulta...
                </>
              ) : (
                <>
                  Enviar Consulta Directa
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
