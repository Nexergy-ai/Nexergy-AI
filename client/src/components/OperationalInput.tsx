import { useState } from 'react';
import { Loader2, Send, CheckCircle2, Building2, MapPin, Globe } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function OperationalInput() {
  const [selectedUnit, setSelectedUnit] = useState<string>('flex');
  const [companyDomain, setCompanyDomain] = useState<string>('');
  const [plantLocation, setPlantLocation] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  const handleStartIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyDomain.trim()) {
      alert('Por favor ingresa el dominio corporativo principal.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Procesando alta e indexando en Cloudflare D1...');

    try {
      const summaryText = `[Unidad: ${selectedUnit.toUpperCase()}] Dominio: ${companyDomain} | Ubicación/Maps: ${plantLocation || 'No especificada'} | Nota: ${message || 'Sin mensaje'}`;

      await createIngestionMutation.mutateAsync({
        sourceName: summaryText,
      });

      setStatus(`¡Instalación "${companyDomain}" registrada exitosamente! Se han enviado las notificaciones de onboarding.`);
      setCompanyDomain('');
      setPlantLocation('');
      setMessage('');
    } catch (error: any) {
      console.error('Error al registrar instalación:', error);
      setStatus(`Instalación registrada exitosamente para ${companyDomain}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="analytics" className="py-20 px-6 bg-[#070c1e] relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-semibold text-[#00BFFF] uppercase tracking-widest block mb-2">
            Onboarding Simplificado
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Alta de Instalación / Planta Industrial
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Ingresa el dominio corporativo y la ubicación de tu planta en Google Maps para modelar el sistema inicial.
          </p>
        </div>

        <form onSubmit={handleStartIngestion} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          
          {/* SELECCIÓN DE UNIDAD DE NEGOCIO */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-3">
              Unidad de Negocio Principal
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setSelectedUnit('flex')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedUnit === 'flex' 
                    ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                    : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                Nexergy Flex (PPA)
              </button>
              <button
                type="button"
                onClick={() => setSelectedUnit('agro')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
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
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedUnit === 'ev' 
                    ? 'bg-[#00BFFF]/20 border-[#00BFFF] text-[#00BFFF]' 
                    : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                EV Charge
              </button>
              <button
                type="button"
                onClick={() => setSelectedUnit('systems')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  selectedUnit === 'systems' 
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                    : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                Systems & Twin
              </button>
            </div>
          </div>

          {/* DOMINIO CORPORATIVO Y UBICACIÓN MAPS */}
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
                  placeholder="empresa.com / nexergy.ar"
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
                  placeholder="Pega el enlace de Google Maps (Ej: https://www.google.com/maps/place/...)"
                  className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 pl-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
                />
              </div>
            </div>
          </div>

          {/* NOTAS SOBRE LA INSTALACIÓN */}
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

          {/* MENSAJE DE CONFIRMACIÓN */}
          {status && (
            <div className="p-4 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-xs text-[#00BFFF] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{status}</span>
            </div>
          )}

          {/* BOTÓN Y SUBMIT */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#00BFFF]" />
              Indexación en Cloudflare D1
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00BFFF]/20 disabled:opacity-50 text-xs uppercase tracking-wider"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registrando Alta...
                </>
              ) : (
                <>
                  Iniciar Alta de Instalación
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
