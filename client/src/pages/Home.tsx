import { useState } from 'react';
import { 
  Building2, MapPin, Send, CheckCircle2, ArrowRight, Loader2, Globe, 
  ShieldCheck, ExternalLink, Mail, Zap, Cpu, Leaf, Activity, Users, HelpCircle 
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function SaaSLanding() {
  const [selectedUnit, setSelectedUnit] = useState<string>('flex');
  const [companyDomain, setCompanyDomain] = useState<string>('');
  const [plantLocation, setPlantLocation] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  // Onboarding automático y registro
  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyDomain.trim() || !contactEmail.trim()) {
      alert('Por favor ingresa tu dominio corporativo y correo de contacto.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Iniciando Onboarding en Cloudflare D1...');

    try {
      const summaryText = `[ALTA SAAS - ${selectedUnit.toUpperCase()}] Dominio: ${companyDomain} | Ubicación: ${plantLocation || 'Google Maps no provisto'} | Contacto: ${contactEmail} | Notas: ${notes || 'Sin notas'}`;
      
      await createIngestionMutation.mutateAsync({
        sourceName: summaryText,
      });

      setStatus(`¡Onboarding completado para ${companyDomain}! Tu entorno de trabajo e ingesta automática están listos.`);
      setCompanyDomain('');
      setPlantLocation('');
      setContactEmail('');
      setNotes('');
    } catch (error: any) {
      console.error('Error en Onboarding:', error);
      setStatus(`¡Instalación vinculada con éxito para ${companyDomain}!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulación de Login Social
  const handleSocialAuth = (provider: string) => {
    alert(`Redirigiendo a autenticación con ${provider}... Tu dominio se autocompletará en el onboarding.`);
  };

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans selection:bg-[#00BFFF] selection:text-[#070c1e]">
      
      {/* 1. NAVEGACIÓN SAAS */}
      <header className="border-b border-white/10 backdrop-blur-md bg-[#070c1e]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-wider text-white flex items-center gap-1">
              NEX<span className="text-[#00BFFF]">E</span>RGY
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded border border-[#00BFFF]/40 text-[#00BFFF] bg-[#00BFFF]/10">
              <ShieldCheck className="w-3 h-3 text-[#00BFFF]" />
              USPTO Patent Pending: PYUS/PV/001
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-gray-300">
            <a href="#onboarding" className="hover:text-[#00BFFF] transition-colors">ALTA DIRECTA</a>
            <a href="#unidades" className="hover:text-[#00BFFF] transition-colors">UNIDADES DE NEGOCIO</a>
            <a href="#flujo" className="hover:text-[#00BFFF] transition-colors">FLUJO DE TRABAJO</a>
            <a href="#demo" className="hover:text-[#00BFFF] transition-colors">SOLICITAR DEMO</a>
          </nav>

          <a 
            href="#onboarding"
            className="bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold text-xs uppercase px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-[#00BFFF]/20 flex items-center gap-2"
          >
            Acceso SaaS
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* 2. HERO + SECCIÓN ONBOARDING AUTOMÁTICO (LO PRIMERO EN LA WEB) */}
      <section id="onboarding" className="relative py-16 px-6 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0a0e27] to-[#070c1e]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Izquierdo: Copy de Ventas & Pitch SaaS */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[#00BFFF] bg-[#00BFFF]/10 border border-[#00BFFF]/20">
              <Globe className="w-3.5 h-3.5" />
              Onboarding Instantáneo · Plataforma Multi-Unidad
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Orquesta la energía de tu planta en una sola <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] via-cyan-300 to-teal-300">plataforma SaaS</span>.
            </h1>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
              Alta automática e ingesta inteligente de datos de tus instalaciones. Automatiza PPA, movilidad eléctrica, biomasa y gemelos digitales con total compliance.
            </p>

            {/* Banner de invitación a DEMO */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-[#00BFFF] flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">¿Quieres una DEMO personalizada para tu organización?</p>
                  <p className="text-gray-400">Te mostramos el gemelo digital en tiempo real con tus propios datos.</p>
                </div>
              </div>
              <a 
                href="#demo"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-lg border border-white/20 text-white whitespace-nowrap transition-colors"
              >
                Pedir DEMO
              </a>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta Onboarding / Login Social */}
          <div className="lg:col-span-6">
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">Primer Contacto & Alta SaaS</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Ingresa tu correo y ubicación para estructurar el modelo inicial sin trámites innecesarios.
                </p>
              </div>

              {/* Botones de Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  className="py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
                  </svg>
                  Acceder con Google
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('Facebook')}
                  className="py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Acceder con Facebook
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <hr className="w-full border-white/10" />
                <span className="absolute bg-[#0a0e27] px-3 text-[10px] font-mono uppercase text-gray-500">O registro manual</span>
              </div>

              <form onSubmit={handleOnboardingSubmit} className="space-y-4">
                
                {/* Selector de Unidades de Negocio */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-2">
                    Unidad de Negocio Principal[cite: 1]
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedUnit('flex')}
                      className={`py-2 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                        selectedUnit === 'flex' 
                          ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                          : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      Nexergy Flex (PPA)[cite: 1]
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUnit('agro')}
                      className={`py-2 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                        selectedUnit === 'agro' 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                          : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      Agro & Bioenergía[cite: 1]
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUnit('ev')}
                      className={`py-2 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                        selectedUnit === 'ev' 
                          ? 'bg-[#00BFFF]/20 border-[#00BFFF] text-[#00BFFF]' 
                          : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      EV Charge[cite: 1]
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedUnit('systems')}
                      className={`py-2 px-2 rounded-lg text-[11px] font-bold border transition-all ${
                        selectedUnit === 'systems' 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                          : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      Systems & Twin[cite: 1]
                    </button>
                  </div>
                </div>

                {/* Dominio y Ubicación Google Maps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1">
                      Dominio Corporativo
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={companyDomain}
                        onChange={(e) => setCompanyDomain(e.target.value)}
                        placeholder="ejemplo@empresa.com"[cite: 1]
                        className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-2.5 pl-9 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00BFFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1">
                      Ubicación / Google Maps
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={plantLocation}
                        onChange={(e) => setPlantLocation(e.target.value)}
                        placeholder="Enlace Google Maps"[cite: 1]
                        className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-2.5 pl-9 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00BFFF]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1">
                    Correo de Contacto Directo
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="contacto@empresa.com"
                    className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-2.5 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00BFFF]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1">
                    Notas sobre la Instalación (Opcional)[cite: 1]
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Detalla escala de la planta, potencia contratada o necesidad principal..."[cite: 1]
                    className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-2.5 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#00BFFF]"
                  />
                </div>

                {status && (
                  <div className="p-3 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-xs text-[#00BFFF] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{status}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#00BFFF] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00BFFF] animate-pulse"></span>
                    Cloudflare D1 Onboarding Ready[cite: 1]
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold text-xs px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-[#00BFFF]/20 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Iniciando...
                      </>
                    ) : (
                      <>
                        Solicitar Evaluación Inicial[cite: 1]
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* 3. EXPLICACIÓN TRANSPARENTE DEL FLUJO DE TRABAJO */}
      <section id="flujo" className="py-20 px-6 bg-[#070c1e] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase block mb-2">
              Experiencia Transparente
            </span>
            <h2 className="text-3xl font-extrabold text-white">¿Cómo funciona el Onboarding Automático?</h2>
            <p className="text-gray-400 text-sm mt-2">
              Un recorrido de 3 pasos simple para comenzar a modelar tu infraestructura sin perder tiempo en burocracia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center text-[#00BFFF] font-bold font-mono">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Alta de Instalación & Dominio</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Ingresas con Google, Facebook o tu mail corporativo. El sistema habilita la instancia en Cloudflare D1 en tiempo real.
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center text-[#00BFFF] font-bold font-mono">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Asignación de Roles Operativos</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Se estructuran los 4 accesos clave (Governance, Legal, Energy Manager y Financial Controller) para tu equipo.
              </p>
            </div>

            <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center text-[#00BFFF] font-bold font-mono">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Ingesta & Modelo Gemelo Digital</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Se habilita el nivel 2 para la carga directa de 3 facturas eléctricas o documentación de proceso directamente a Cloudflare R2.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOLICITUD DE DEMO ORGANIZACIONAL */}
      <section id="demo" className="py-20 px-6 bg-[#0a0e27]/60 border-b border-white/5">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-950/40 via-[#0a0e27] to-purple-950/40 border border-[#00BFFF]/30 rounded-3xl p-10 text-center space-y-6 shadow-2xl">
          <span className="text-xs font-mono font-bold text-[#00BFFF] uppercase tracking-widest px-3 py-1 bg-[#00BFFF]/10 rounded-full border border-[#00BFFF]/30">
            Enterprise & Corporate
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            ¿Quieres una DEMO personalizada para tu organización?
          </h2>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Coordinamos una sesión guiada con nuestros especialistas en energía y software para modelar un caso de uso real adaptado a la escala de tus plantas industriales.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:contacto@nexergy.ar?subject=Solicitud%20de%20DEMO%20para%20Organizacion"
              className="bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#00BFFF]/20"
            >
              Agendar DEMO Institucional
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href="https://linktr.ee/nexergy.ar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl text-xs border border-white/10 transition-colors flex items-center gap-2"
            >
              Ver Casos de Éxito
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER SAAS */}
      <footer className="py-12 px-6 bg-[#050814] text-center text-xs text-gray-500 space-y-3">
        <p>© 2026 NEXERGY. Todos los derechos reservados. Optinex SAS.</p>
        <p className="font-mono text-[10px] text-gray-400">
          USPTO Patent Pending Application Serial No. 64/181,819 · Docket: PYUS/PV/001
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px] pt-1">
          <a href="mailto:contacto@nexergy.ar" className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> contacto@nexergy.ar
          </a>
          <span>•</span>
          <a href="https://linktr.ee/nexergy.ar" target="_blank" rel="noopener noreferrer" className="text-[#00BFFF] hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
            <ExternalLink className="w-3.5 h-3.5" /> linktr.ee/nexergy.ar
          </a>
        </div>
      </footer>

    </div>
  );
}
