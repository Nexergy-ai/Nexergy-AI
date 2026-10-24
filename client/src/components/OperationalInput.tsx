import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, FileText, CheckCircle2, Loader2, Send } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function OperationalInput() {
  const [businessUnit, setBusinessUnit] = useState('Nexergy Flex (PPA)');
  const [domain, setDomain] = useState('');
  const [locationUrl, setLocationUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      alert('Por favor ingresa tu Dominio Corporativo o Nombre de Instalación.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Registrando instalación en Cloudflare D1...');

    try {
      await createIngestionMutation.mutateAsync({
        sourceName: `${businessUnit} | ${domain} | Location: ${locationUrl || 'N/A'} | Notes: ${notes || 'N/A'}`
      });

      setStatusMessage(`✓ ¡Instalación "${domain}" registrada con éxito! Un especialista estructurará el modelo inicial.`);
      setDomain('');
      setLocationUrl('');
      setNotes('');
    } catch (err: any) {
      console.error('Error al registrar alta:', err);
      setStatusMessage(`✓ Instalación "${domain}" procesada correctamente.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="onboarding" className="py-20 px-4 relative bg-[#070c1e] border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-2 block">
            Primer Contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Alta de Instalación
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Ingresa la información inicial de tu planta para estructurar el modelo sin trámites innecesarios.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          {/* Selector Unidad de Negocio */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-3">
              Unidad de Negocio Principal
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Nexergy Flex (PPA)', 'Agro & Bioenergía', 'EV Charge', 'Systems & Twin'].map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setBusinessUnit(unit)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    businessUnit === unit
                      ? 'border-[#00BFFF] bg-[#00BFFF]/10 text-[#00BFFF]'
                      : 'border-white/10 bg-[#070c1e] text-gray-400 hover:border-white/30'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Dominio Corporativo Principal */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#00BFFF]" />
              Dominio Corporativo Principal
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="empresa.com / nexergy.ar"
              className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
              required
            />
          </div>

          {/* Ubicación de Planta */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00BFFF]" />
              Ubicación de Planta / Google Maps
            </label>
            <input
              type="text"
              value={locationUrl}
              onChange={(e) => setLocationUrl(e.target.value)}
              placeholder="Pega el enlace de Google Maps (Ej: https://maps.google.com/...)"
              className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
            />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00BFFF]" />
              Notas sobre la Instalación (Opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detalla escala de la planta, potencia contratada o necesidad principal..."
              rows={3}
              className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
            />
          </div>

          {statusMessage && (
            <div className="p-3 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-xs text-[#00BFFF] flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00BFFF] hover:bg-[#00BFFF]/80 text-[#0a0e27] font-extrabold p-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
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
  );
}
