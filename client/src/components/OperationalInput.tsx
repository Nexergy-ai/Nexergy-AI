import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, FileUp, CheckCircle2, Database, Building2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { Streamdown } from 'streamdown';

export default function OperationalInput() {
  const [sourceName, setSourceName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mutaciones tRPC hacia Cloudflare D1, R2 y LLM
  const analyzeMutation = trpc.ai.analyzeLLM.useMutation();
  const getUploadUrlMutation = trpc.ai.getUploadUrl.useMutation();
  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus(`Archivo seleccionado: ${e.target.files[0].name}`);
    }
  };

  const simulateIntelligence = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!sourceName.trim() && !file) {
      alert('Por favor ingresá el Nombre de tu instalación / Dominio Corporativo o adjuntá un archivo.');
      return;
    }

    setIsLoading(true);
    setResponse('');
    setUploadStatus('Conectando con Cloudflare D1 + R2...');

    try {
      // 1. Guardar registro de dominio en Cloudflare D1
      if (sourceName.trim()) {
        await createIngestionMutation.mutateAsync({
          sourceName: sourceName.trim(),
        });
      }

      // 2. Subida directa del archivo a Cloudflare R2
      if (file) {
        setUploadStatus(`Subiendo ${file.name} a Cloudflare R2...`);
        setIsUploading(true);

        const { uploadUrl } = await getUploadUrlMutation.mutateAsync({
          fileName: file.name,
          fileType: file.type || 'application/octet-stream',
        });

        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type || 'application/octet-stream' },
          body: file,
        });

        if (!uploadRes.ok) throw new Error('Error al enviar el archivo a Cloudflare R2');
        setIsUploading(false);
      }

      setUploadStatus(`¡Instalación "${sourceName || file?.name}" e información técnica indexadas con éxito!`);

      // 3. Generar evaluación preliminar técnica
      const prompt = `You are NEXERGY AI. Provide a brief operational status assessment for domain/plant: ${sourceName || file?.name}. Include technical recommendations.`;
      const result = await analyzeMutation.mutateAsync({ prompt });
      const content = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
      setResponse(content);

      setSourceName('');
      setFile(null);
    } catch (error: any) {
      console.error('Error durante la ingesta:', error);
      setUploadStatus(`Error al procesar: ${error?.message || 'Fallo de conexión'}`);
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  return (
    <section id="analytics" className="py-24 px-6 border-t border-white/5 bg-[#070c1e]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Onboarding Corporativo
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Ingresá los datos de contexto de tu planta o instalación industrial para estructurar el modelo de gemelo digital y simular escenarios de optimización.
          </p>
        </div>

        <div className="bg-[#0a0e27] border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl space-y-5 mb-8">
          {/* Campo Dominio / Instalación */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#00BFFF]" />
              Nombre de tu instalación, Dominio Corporativo...
            </label>
            <input
              type="text"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="Ej: agd.com.ar / Planta Industrial Central"
              className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
            />
          </div>

          {/* Carga de Archivos */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
              Adjuntar Archivo Técnico / Factura (Opcional)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 hover:border-[#00BFFF] p-6 rounded-lg text-center bg-[#070c1e] cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv,.pdf,.docx,.txt,.pst"
              />
              <FileUp className="w-8 h-8 text-[#00BFFF]" />
              <p className="text-sm font-medium text-gray-200">
                {file ? `Seleccionado: ${file.name}` : "Hacé clic para seleccionar un archivo (.xlsx, .pdf, .csv, .txt)"}
              </p>
            </div>
          </div>

          {/* Mensaje de Estado */}
          {uploadStatus && (
            <div className="p-3 rounded bg-cyan-950/40 border border-cyan-500/30 text-xs text-[#00BFFF] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {/* Botón de Ingesta */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-[#00BFFF] text-xs font-mono">
              <Database className="w-4 h-4" />
              <span>Cloudflare D1 + R2 Ready</span>
            </div>

            <Button
              type="button"
              onClick={simulateIntelligence}
              disabled={isLoading || isUploading || createIngestionMutation.isPending}
              className="w-full sm:w-auto px-6 py-3 bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading || isUploading || createIngestionMutation.isPending ? (
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
        </div>

        {/* Respuesta Analysis */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-lg border border-cyan-500/40 bg-[#0a0e27] shadow-2xl"
          >
            <h3 className="text-xl font-bold text-[#00BFFF] mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Análisis Técnico de Inteligencia Operativa
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
