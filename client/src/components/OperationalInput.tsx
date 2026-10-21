import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, FileText, CheckCircle2, Database, Building2, Zap, Factory, Sprout, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { Streamdown } from 'streamdown';

interface BusinessUnit {
  id: string;
  name: string;
  icon: any;
  description: string;
}

const businessUnits: BusinessUnit[] = [
  { id: 'industrial', name: 'Industrial', icon: Factory, description: 'Auditoría, Gemelo Digital y Eficiencia' },
  { id: 'agro', name: 'Agro & Biomasa', icon: Sprout, description: 'Valorización de residuos y Bioenergía' },
  { id: 'ev-charge', name: 'EV Charge', icon: Car, description: 'Estaciones de Carga y Microredes' },
  { id: 'flex', name: 'Nexergy Flex', icon: Zap, description: 'Convertidores SST/VSC Bidireccionales' },
];

export default function OperationalInput() {
  const [sourceName, setSourceName] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('industrial');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [response, setResponse] = useState<string>('');
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

    if (!sourceName.trim() && !file) {
      alert('Por favor ingresá el Nombre de tu instalación / Dominio Corporativo o adjuntá un archivo.');
      return;
    }

    setIsLoading(true);
    setResponse('');
    setUploadStatus('Iniciando ingesta de datos...');

    try {
      // 1. Carga de archivo a R2 si está presente
      if (file) {
        await uploadToR2(file);
      }

      // 2. Registro de Ingesta en Cloudflare D1 vinculando la Unidad de Negocio
      if (sourceName.trim()) {
        const fullSourceName = `[${selectedUnit.toUpperCase()}] ${sourceName.trim()}`;
        await createIngestionMutation.mutateAsync({ sourceName: fullSourceName });
      }

      // 3. Generación de Análisis Técnico Operativo con LLM
      const unitLabel = businessUnits.find(u => u.id === selectedUnit)?.name || 'Industrial';
      const prompt = `You are NEXERGY AI, an advanced operational intelligence platform. Provide a concise operational analysis for installation: ${sourceName || file?.name} under business unit: ${unitLabel}. Include specific technical recommendations.`;

      const res = await analyzeMutation.mutateAsync({ prompt });
      const content = typeof res.content === 'string' ? res.content : JSON.stringify(res.content);

      setResponse(content);
      setUploadStatus(`¡Instalación "${sourceName || file?.name}" indexada con éxito para la unidad ${unitLabel}!`);
    } catch (error: any) {
      console.error('Ingestion error:', error);
      setUploadStatus(`Error durante la ingesta: ${error?.message || 'Fallo de conexión'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="analytics" className="py-20 px-4 relative overflow-hidden bg-[#070c1e]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Onboarding Corporativo
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            Ingresá los datos de contexto de tu instalación y seleccioná la unidad de negocio correspondiente para estructurar el Digital Twin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="p-8 rounded-xl border border-white/10 bg-[#0a0e27] shadow-2xl mb-8 space-y-6"
        >
          {/* Selector de Unidad de Negocio */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-3">
              Unidad de Negocio
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {businessUnits.map((unit) => {
                const Icon = unit.icon;
                const isSelected = selectedUnit === unit.id;
                return (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => setSelectedUnit(unit.id)}
                    className={`p-3 rounded-lg border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#00BFFF] bg-[rgba(0,191,255,0.12)] text-white'
                        : 'border-gray-800 bg-[#070c1e] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#00BFFF]' : 'text-gray-500'}`} />
                    <div>
                      <div className="text-xs font-bold">{unit.name}</div>
                      <div className="text-[10px] text-gray-500 line-clamp-1">{unit.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campo Nombre de Instalación / Dominio */}
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
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00BFFF]" />
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
                accept=".xlsx,.xls,.csv,.pdf,.docx,.txt"
              />
              <Upload className="w-7 h-7 text-[#00BFFF] animate-pulse" />
              <p className="text-sm text-gray-200 font-medium">
                {file ? `Seleccionado: ${file.name}` : 'Hacé clic para seleccionar un archivo (.xlsx, .pdf, .csv, .txt)'}
              </p>
            </div>
          </div>

          {/* Estado de Transmisión */}
          {uploadStatus && (
            <div className="p-3 rounded bg-cyan-950/40 border border-cyan-500/30 text-xs text-[#00BFFF] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {/* Acciones */}
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
        </motion.div>

        {/* Muestreo de Respuesta del LLM */}
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
