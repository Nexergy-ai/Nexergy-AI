import { useState, useEffect } from 'react';
import type { ComponentType } from 'react';
import {
  Zap, Cpu, Leaf, Building2, Send, CheckCircle2, AlertCircle,
  Loader2, MapPin, Activity, AtSign, Lock, ExternalLink
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

type UnitId = 'flex' | 'agro' | 'systems' | 'ev';

interface Unit {
  id: UnitId;
  Icon: ComponentType<{ className?: string }>;
  selector: string;
  active: string;
}

const UNITS: Unit[] = [
  { id: 'flex', Icon: Cpu, selector: 'Nexergy Flex', active: 'bg-purple-500/20 border-purple-500 text-purple-400' },
  { id: 'agro', Icon: Leaf, selector: 'Agro & Bioenergía', active: 'bg-emerald-500/20 border-emerald-500 text-emerald-400' },
  { id: 'systems', Icon: Activity, selector: 'Systems & SaaS', active: 'bg-amber-500/20 border-amber-500 text-amber-400' },
  { id: 'ev', Icon: Zap, selector: 'EV Charge', active: 'bg-[#00BFFF]/20 border-[#00BFFF] text-[#00BFFF]' },
];

const inputClass =
  'w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 pl-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]';
const labelClass = 'block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2';

type Feedback = { type: 'success' | 'error'; text: string } | null;

export default function PublicHome() {
  const [selectedUnit, setSelectedUnit] = useState<UnitId>('flex');
  const [companyDomain, setCompanyDomain] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [plantLocation, setPlantLocation] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "NEXERGY® | Evaluación Energética Inicial";
  }, []);

  const createIngestionMutation = trpc?.ai?.createIngestion?.useMutation
    ? trpc.ai.createIngestion.useMutation()
    : null;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const domain = companyDomain.trim();
    const email = contactEmail.trim();

    if (!domain) {
      setFeedback({ type: 'error', text: 'Ingresa el dominio corporativo para continuar.' });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFeedback({ type: 'error', text: 'Ingresa un correo electrónico válido.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const summaryText = `[Unidad: ${selectedUnit.toUpperCase()}] Dominio: ${domain} | Correo: ${email} | Ubicación: ${
        plantLocation.trim() || 'No especificada'
      } | Nota: ${message.trim() || 'Sin parámetros'}`;

      if (createIngestionMutation) {
        await createIngestionMutation.mutateAsync({ sourceName: summaryText });
      } else {
        await fetch('https://formspree.io/f/static_lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ summaryText }),
        }).catch(() => {});
      }

      setFeedback({
        type: 'success',
        text: `Solicitud registrada para ${domain}. Nos comunicaremos a ${email}.`,
      });
      setCompanyDomain('');
      setContactEmail('');
      setPlantLocation('');
      setMessage('');
    } catch (error) {
      console.error('Error al registrar la instalación:', error);
      setFeedback({
        type: 'error',
        text: 'No se pudo completar el registro. Inténtalo nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans flex flex-col justify-between selection:bg-[#00BFFF] selection:text-[#070c1e]">
      {/* HEADER MINIMALISTA CON ACCESO CONFIDENCIAL */}
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-white/5 bg-[#050814]/80 backdrop-blur-md">
        <span className="font-extrabold tracking-wider text-[#00BFFF] text-xl font-mono">
          NEXERGY<span className="text-white">®</span>
        </span>
        <a
          href="https://privado.nexergy.ar/"
          className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/10"
        >
          <Lock className="w-3.5 h-3.5 text-purple-400" />
          Acceso Confidencial
        </a>
      </header>

      {/* SECCIÓN ÚNICA DE CONTACTO / EVALUACIÓN ENERGÉTICA */}
      <main className="py-16 px-6 relative max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold font-mono tracking-widest text-[#00BFFF] uppercase mb-3 block">
            Diagnóstico de Oportunidad
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Evaluación Energética Inicial
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Analizamos el potencial técnico y económico para identificar oportunidades de valorización energética y reducción de OPEX.
          </p>
        </div>

        <form onSubmit={handleContactSubmit} noValidate className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          <div>
            <span className={labelClass}>Módulo de Interés</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {UNITS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  aria-pressed={selectedUnit === u.id}
                  onClick={() => setSelectedUnit(u.id)}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedUnit === u.id ? u.active : 'bg-[#070c1e] border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  {u.selector}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="domain" className={labelClass}>Dominio Corporativo</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input id="domain" type="text" required maxLength={120} value={companyDomain} onChange={(e) => setCompanyDomain(e.target.value)} placeholder="empresa.com" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Correo de Contacto</label>
              <div className="relative">
                <AtSign className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input id="email" type="email" required maxLength={120} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="contacto@empresa.com" className={inputClass} />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="location" className={labelClass}>Ubicación de la Planta</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
              <input id="location" type="text" maxLength={200} value={plantLocation} onChange={(e) => setPlantLocation(e.target.value)} placeholder="Ciudad, Provincia o Enlace Maps" className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className={labelClass}>Parámetros de Planta (Opcional)</label>
            <textarea id="notes" rows={3} maxLength={400} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Potencia contratada (kW/MW), tipo de tarifa o principales requerimientos" className="w-full bg-[#070c1e] border border-gray-800 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]" />
          </div>

          <div aria-live="polite">
            {feedback && (
              <div className={`p-4 rounded-lg border text-xs flex items-start gap-2 ${feedback.type === 'success' ? 'bg-[#00BFFF]/10 border-[#00BFFF]/30 text-[#00BFFF]' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                <span>{feedback.text}</span>
              </div>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00BFFF]/20 disabled:opacity-50">
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Procesando...</>
            ) : (
              <>Registrar Solicitud <Send className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </main>

      {/* FOOTER SOBRIO */}
      <footer className="py-8 px-6 border-t border-white/5 bg-[#050814] text-center text-xs text-gray-500 space-y-2">
        <p>© 2026 <strong>OPTINEX S.A.S.</strong> — CUIT 30-71945566-9 — Todos los derechos reservados.</p>
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
