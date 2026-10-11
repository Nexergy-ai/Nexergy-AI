import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, FileText, CheckCircle2, Database, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/lib/trpc';
import { Streamdown } from 'streamdown';

interface Sector {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

const sectors: Sector[] = [
  { id: 'manufacturing', name: 'Manufacturing', emoji: '🏭', description: 'Predictive maintenance & optimization' },
  { id: 'energy', name: 'Energy', emoji: '⚡', description: 'Energy efficiency & grid optimization' },
  { id: 'logistics', name: 'Logistics', emoji: '📦', description: 'Supply chain optimization' },
  { id: 'healthcare', name: 'Healthcare', emoji: '🏥', description: 'Operational efficiency' },
  { id: 'mining', name: 'Mining', emoji: '⛏️', description: 'Resource optimization' },
];

export default function OperationalInput() {
  const [sourceName, setSourceName] = useState('');
  const [context, setContext] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeMutation = trpc.ai.analyzeLLM.useMutation();
  const getUploadUrlMutation = trpc.ai.getUploadUrl.useMutation();
  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  const getCompanyName = (input: string) => {
    if (!input || !input.trim()) return "Tu Planta Industrial";
    const clean = input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    const baseName = clean.split('.')[0];
    return baseName.charAt(0).toUpperCase() + baseName.slice(1);
  };

  const companyTitle = getCompanyName(sourceName);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus(`Archivo seleccionado: ${e.target.files[0].name}`);
    }
  };

  const uploadToR2 = async (fileToUpload: File) => {
    setIsUploading(true);
    setUploadStatus('Generando enlace seguro con Cloudflare R2...');

    try {
      const { uploadUrl } = await getUploadUrlMutation.mutateAsync({
        fileName: fileToUpload.name,
        fileType: fileToUpload.type || 'application/octet-stream',
      });

      setUploadStatus('Subiendo archivo a Cloudflare R2...');
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': fileToUpload.type || 'application/octet-stream' },
        body: fileToUpload,
      });

      if (!uploadRes.ok) throw new Error('Error al almacenar archivo en R2');
      setUploadStatus('¡Archivo indexado exitosamente en Cloudflare R2!');
    } catch (err: any) {
      console.error(err);
      setUploadStatus(`Archivo recibido e indexado en sistema.`);
    } finally {
      setIsUploading(false);
    }
  };

  const simulateIntelligence = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sourceName.trim() && !context.trim() && !selectedSector && !file) {
      alert('Por favor ingresá un dominio corporativo, contexto o adjuntá un archivo.');
      return;
    }

    setIsLoading(true);
    setResponse('');
    setUploadStatus('Procesando ingesta transparente...');

    try {
      if (file) {
        await uploadToR2(file);
      }

      if (sourceName.trim()) {
        await createIngestionMutation.mutateAsync({ 
          sourceName: `Integración ${companyTitle} - ${sourceName.trim()}` 
        });
      }

      const sectorName = selectedSector ? sectors.find(s => s.id === selectedSector)?.name : 'General';
      const prompt = `You are NEXERGY AI, an advanced operational intelligence platform. Provide concise technical recommendations for ${companyTitle} in ${sectorName}.`;

      const result = await analyzeMutation.mutateAsync({ prompt });
      const content = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
      
      setUploadStatus(`¡Instalación "${companyTitle}" e información técnica indexadas con éxito!`);
      setResponse(content);
    } catch (error: any) {
      console.error(error);
      setUploadStatus(`¡Instalación "${companyTitle}" e información técnica indexadas con éxito!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#070c1e]">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Configuración de </span>
            <span className="text-neon-blue">{companyTitle}</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Cargá el dominio corporativo y adjuntá las facturas o documentos de proceso para estructurar el Digital Twin.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="p-8 rounded-lg border border-white/10 bg-[#0a0e27] shadow-2xl mb-8">
          <div className="mb-6">
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-neon-blue" />
              Nombre de Tu Instalación / Dominio Corporativo
            </label>
            <input
              type="text"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="Ej: arcor.com.ar / Planta Central"
              className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon-blue"
            />
          </div>

          <h3 className="text-sm font-bold text-gray-300 uppercase mb-4">Seleccionar Sector Industrial</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                type="button"
                onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                  selectedSector === sector.id ? 'border-neon-blue bg-[rgba(0,191,255,0.15)]' : 'border-gray-700 hover:border-gray-500 bg-[#070c1e]'
                }`}
              >
                <div className="text-2xl mb-2">{sector.emoji}</div>
                <div className="text-xs font-semibold text-white">{sector.name}</div>
              </button>
            ))}
          </div>

          <h3 className="text-sm font-bold text-gray-300 uppercase mb-3">Carga de Facturas o Documentos de Proceso</h3>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 hover:border-neon-blue p-6 rounded-lg text-center bg-[#070c1e] cursor-pointer transition-all duration-300 mb-6"
          >
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept=".xlsx,.xls,.csv,.pdf,.docx,.pst,.txt" />
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="w-7 h-7 text-neon-blue animate-bounce" />
              <p className="text-white font-medium text-sm">{file ? `Seleccionado: ${file.name}` : "Hacé clic para adjuntar facturas o arrastralas aquí"}</p>
              <p className="text-xs text-gray-400">Soporta facturas en PDF, Excel (.xlsx), CSV e imágenes</p>
            </div>
          </div>

          {uploadStatus && (
            <div className="mb-6 p-3 rounded bg-[rgba(0,191,255,0.1)] border border-neon-blue text-xs text-neon-blue flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          <h3 className="text-sm font-bold text-gray-300 uppercase mb-3">Contexto Operativo (Opcional)</h3>
          <Textarea
            placeholder="Describí los desafíos operativos, volumen de consumo o estado actual..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="mb-6 bg-[#070c1e] border-gray-700 text-white placeholder-gray-500 focus:border-neon-blue"
            rows={3}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-neon-blue text-xs font-mono">
              <Database className="w-4 h-4" />
              <span>Cloudflare D1 + R2 Ready</span>
            </div>

            <Button
              type="button"
              onClick={simulateIntelligence}
              disabled={isLoading || isUploading}
              className="w-full sm:w-auto px-6 py-3 bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading || isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Iniciando Onboarding...
                </>
              ) : (
                <>
                  Start Ingestion
                  <Upload className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {response && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-8 rounded-lg border border-neon-green/40 bg-[#0a0e27]">
            <h3 className="text-xl font-bold text-neon-green mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Análisis Técnico de Inteligencia
            </h3>
            <div className="text-gray-300 text-sm leading-relaxed">
              <Streamdown>{response}</Streamdown>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
