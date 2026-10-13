import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, FileText, CheckCircle2, Database, Building2, ArrowRight } from 'lucide-react';
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
  { id: 'manufacturing', name: 'Manufactura', emoji: '🏭', description: 'Mantenimiento predictivo y optimización' },
  { id: 'energy', name: 'Energía', emoji: '⚡', description: 'Eficiencia energética y gestión de red' },
  { id: 'logistics', name: 'Logística', emoji: '📦', description: 'Optimización de cadena de suministro' },
  { id: 'healthcare', name: 'Salud', emoji: '🏥', description: 'Eficiencia operativa e insumos' },
  { id: 'mining', name: 'Minería', emoji: '⛏️', description: 'Optimización de recursos y procesos' },
];

export default function OperationalInput() {
  const [sourceName, setSourceName] = useState('');
  const [context, setContext] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Estados para la carga de archivos en Cloudflare R2
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mutaciones tRPC
  const analyzeMutation = trpc.ai.analyzeLLM.useMutation();
  const getUploadUrlMutation = trpc.ai.getUploadUrl.useMutation();
  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

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

      if (!uploadRes.ok) throw new Error('Error al almacenar el archivo en R2.');

      setUploadStatus('¡Archivo indexado exitosamente en Cloudflare R2!');
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadStatus(`Error al subir archivo: ${err?.message || 'Fallo de red'}`);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const simulateIntelligence = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!sourceName.trim() && !context.trim() && !selectedSector && !file) {
      alert('Por favor ingresa tu Dominio Corporativo, contexto operativo o adjunta un archivo.');
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      // 1. Carga de archivo a R2 si está presente
      if (file) {
        await uploadToR2(file);
      }

      // 2. Registro del Dominio Corporativo en Cloudflare D1
      if (sourceName.trim()) {
        await createIngestionMutation.mutateAsync({ sourceName: sourceName.trim() });
      }

      const sectorName = selectedSector ? sectors.find(s => s.id === selectedSector)?.name : 'General';
      const fileInfo = file ? `\nArchivo Adjunto: ${file.name}` : '';
      const sourceInfo = sourceName ? `\nDominio Corporativo: ${sourceName}` : '';

      const prompt = `You are NEXERGY AI, an advanced operational intelligence platform. Based on the following operational context and attached assets, provide a concise, technical analysis with specific recommendations.

Operational Context: ${context || `Default scenario for ${sectorName}`} ${sourceInfo} ${fileInfo}
Industry Sector: ${sectorName}

Provide:
1. Operational Status Assessment (2-3 sentences)
2. Key Intelligence Findings (3-4 bullet points)
3. Recommended Actions (2-3 specific recommendations)
4. Risk Indicators (2-3 identified risks)
Be technical, specific, and actionable.`;

      const result = await analyzeMutation.mutateAsync({ prompt });
      const content = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
      setResponse(content);
    } catch (error: any) {
      console.error('Error:', error);
      setResponse(`Error al procesar la ingesta: ${error?.message || 'Error de conexión'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#070c1e]">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-[#00BFFF]" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Onboarding Corporativo
            </h2>
          </div>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Define el dominio corporativo principal para estructurar el modelo Digital Twin y validar el acceso de tu organización.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="p-8 rounded-xl border border-white/10 bg-[#0a0e27] shadow-2xl mb-8">
          
          {/* Dominio Principal de la Empresa */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-white mb-2">
              Dominio Corporativo Principal
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 font-bold text-lg">@</span>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value.replace(/^@/, ''))}
                placeholder="empresa.com / nexergy.ar"
                className="w-full bg-[#070c1e] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF] transition-colors"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              El acceso a la organización estará restringido a usuarios con correos pertenecientes a este dominio.
            </p>
          </div>

          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Sector Industrial</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                type="button"
                onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                  selectedSector === sector.id
                    ? 'border-neon-blue bg-[rgba(0,191,255,0.15)]'
                    : 'border-gray-700 hover:border-gray-500 bg-[#070c1e]'
                }`}
              >
                <div className="text-2xl mb-2">{sector.emoji}</div>
                <div className="text-xs font-semibold text-white">{sector.name}</div>
              </button>
            ))}
          </div>

          {/* Carga de Archivos */}
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Carga de Documentación (Opcional)</h3>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 hover:border-neon-blue p-6 rounded-lg text-center bg-[#070c1e] cursor-pointer transition-all duration-300 mb-6"
          >
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv,.pdf,.docx,.pst,.txt"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <Upload className="w-7 h-7 text-neon-blue animate-bounce" />
              <p className="text-white font-medium text-sm">
                {file ? `Seleccionado: ${file.name}` : "Haz clic o arrastra archivos para iniciar la ingesta"}
              </p>
              <p className="text-xs text-gray-400">
                Soporta archivos Excel (.xlsx), PDF, Word (.docx), WhatsApp (.txt) y backups de Outlook (.pst)
              </p>
            </div>
          </div>

          {uploadStatus && (
            <div className="mb-6 p-3 rounded bg-[rgba(0,191,255,0.1)] border border-neon-blue text-xs text-neon-blue flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Contexto Operativo</h3>
          <Textarea
            placeholder="Describe el escenario operativo, desafíos o estado actual..."
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
              disabled={isLoading || isUploading || createIngestionMutation.isPending}
              className="w-full sm:w-auto px-8 py-3 bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading || isUploading || createIngestionMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {createIngestionMutation.isPending
                    ? 'Guardando Dominio en D1...'
                    : isUploading
                    ? 'Subiendo a R2...'
                    : 'Ingestando Datos...'}
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {response && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-8 rounded-lg border border-neon-green
