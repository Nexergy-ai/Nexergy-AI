import { useState } from 'react';
import { Mail, MapPin, Database, CheckCircle2, Loader2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

export default function OperationalInput() {
  const [email, setEmail] = useState('');
  const [locationUrl, setLocationUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('flex');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mutación tRPC hacia Cloudflare D1
  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      alert('Por favor ingresa un correo de contacto válido.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Registrando solicitud en Cloudflare D1...');

    try {
      // 1. Guardar registro del Lead en Cloudflare D1
      await createIngestionMutation.mutateAsync({
        sourceName: `[Lead ${selectedUnit.toUpperCase()}] Email: ${email.trim()} | Ubicación: ${locationUrl.trim() || 'No provista'} | Notas: ${notes.trim()}`,
      });

      setStatusMessage(`¡Contacto "${email}" registrado con éxito! Un especialista estructurará el modelo inicial.`);
      setEmail('');
      setLocationUrl('');
      setNotes('');
    } catch (error: any) {
      console.error('Error durante el registro:', error);
      setStatusMessage(`Error al registrar: ${error?.message || 'Fallo de conexión'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#070c1e]/90 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Primer Contacto
        </h2>
        <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-2xl mx-auto">
          Ingresa tu correo corporativo y la ubicación de tu planta para estructurar el modelo inicial sin trámites innecesarios.
        </p>
      </div>

      <form onSubmit={handleLeadSubmit} className="space-y-6">
        {/* Selector de Unidad de Negocio Principal */}
        <div>
          <label className="block text-xs font-bold tracking-wider text-cyan-400 uppercase mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Unidad de Negocio Principal
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'flex', name: 'Nexergy Flex (PPA)' },
              { id: 'agro', name: 'Agro & Bioenergía' },
              { id: 'ev', name: 'EV Charge' },
              { id: 'twin', name: 'Systems & Twin' },
            ].map((unit) => (
              <button
                key={unit.id}
                type="button"
                onClick={() => setSelectedUnit(unit.id)}
                className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                  selectedUnit === unit.id
                    ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#0a0e27] border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                {unit.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bloque de Correo de Contacto y Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              Ingresa tu correo de contacto
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@empresa.com"
              className="w-full bg-[#0a0e27] border border-gray-700 rounded-xl p-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Ubicación de Planta / Google Maps
            </label>
            <input
              type="text"
              value={locationUrl}
              onChange={(e) => setLocationUrl(e.target.value)}
              placeholder="Pega el enlace de Google Maps (Ej: https://maps.google.com/...)"
              className="w-full bg-[#0a0e27] border border-gray-700 rounded-xl p-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Notas sobre la Instalación */}
        <div>
          <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
            Notas sobre la Instalación (Opcional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Detalla escala de la planta, potencia contratada o necesidad principal..."
            className="w-full bg-[#0a0e27] border border-gray-700 rounded-xl p-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        {/* Feedback de Estado */}
        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-400 flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
            <Database className="w-4 h-4" />
            <span>Cloudflare D1 Onboarding Ready</span>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registrando...
              </>
            ) : (
              'Solicitar Evaluación Inicial'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
