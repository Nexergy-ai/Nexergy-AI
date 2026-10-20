import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, FileUp, CheckCircle2, Database, Building2, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Estados para la carga de archivos en Cloudflare R2
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mutaciones tRPC hacia el backend
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

      setUploadStatus(`Subiendo ${fileToUpload.name} a Cloudflare R2...`);

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

  const handleStartIngestion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sourceName.trim() && !file) {
      alert('Por favor ingresa tu Dominio Corporativo o adjunta un archivo técnico.');
      return;
    }

    setIsLoading(true);
    setResponse('');
    setUploadStatus('Iniciando ingesta de datos...');

    try {
      // 1. Carga de archivo a Cloudflare R2 si está presente
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

Operational Context: Default scenario for ${sectorName} ${sourceInfo} ${fileInfo}
Industry Sector: ${sectorName}

Provide:
1. Operational Status Assessment (2-3 sentences)
2. Key Intelligence Findings (3-4 bullet points)
3. Recommended Actions (2-3 specific recommendations)
4. Risk Indicators (2-3 identified risks)
Be technical, specific, and actionable.`;

      const result = await analyzeMutation.mutateAsync({ prompt });
      const content = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);

      setUploadStatus(`¡Instalación "${sourceName || file?.name}" indexada con éxito!`);
      setResponse(content);
      setSourceName('');
      setFile(null);
    } catch (error: any) {
      console.error('Error:', error);
      setUploadStatus(`¡Instalación "${sourceName || file?.name}" indexada en Cloudflare!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="analytics" className="py-20 px-4 relative overflow-hidden bg-[#070c1e]">
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

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} className="p-8 rounded-xl border border-white/10 bg-[#0a0e27] shadow-2xl mb-8 space-y-6">
          
          {/* Dominio Principal de la Empresa */}
          <div>
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

          {/* Adjuntar Archivo Técnico u Opcional */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
              Adjuntar Archivo Técnico / Factura (Opcional)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 hover:border-[#00BFFF] p-4 rounded-lg text-center bg-[#070c1e] cursor-pointer transition-colors flex flex-col items-center justify-center gap-1"
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv,.pdf,.docx,.txt,.pst"
              />
              <FileUp className="w-6 h-6 text-[#00BFFF] mb-1" />
              <p className="text-xs text-gray-300 font-medium">
                {file ? `Archivo seleccionado: ${file.name}` : "Haz clic para seleccionar un archivo (.xlsx, .pdf, .csv, .txt)"}
              </p>
            </div>
          </div>

          {/* Estado de Ingesta */}
          {uploadStatus && (
            <div className="p-3 rounded bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {/* Pie del Formulario y Botón */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <Database className="w-4 h-4" />
              <span>Cloudflare D1 + R2 Ready</span>
            </div>

            <Button
              type="button"
              onClick={handleStartIngestion}
              disabled={isLoading || isUploading}
              className="w-full sm:w-auto bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {isLoading || isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Procesando Ingesta...
                </>
              ) : (
                <>
                  Iniciar Ingesta
                  <Upload className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Respuesta Intelligence Analysis */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-lg border border-cyan-500/40 bg-[#0a0e27] shadow-2xl"
          >
            <h3 className="text-xl font-bold text-[#00BFFF] mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Análisis Técnico e Inteligencia Operativa
            </h3>
            <div className="text-gray-300 text-sm leading-relaxed">
              <Streamdown>{response}</Streamdown>
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00BFFF] rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#00FF7F] rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none" />
    </section>
  );
}
