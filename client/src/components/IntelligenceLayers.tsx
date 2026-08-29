import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain, Cpu, Microscope, Shield, Upload, Database, CheckCircle2, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface IntelligenceLayer {
  id: string;
  name: string;
  metrics: string[];
  icon: React.ReactNode;
  description: string;
  href?: string;
}

const layers: IntelligenceLayer[] = [
  {
    id: 'industrial',
    name: 'INDUSTRIAL',
    metrics: ['Uptime', 'Efficiency', 'Downtime'],
    icon: <Cpu className="w-5 h-5" />,
    description: 'Predictive maintenance and industrial optimization',
  },
  {
    id: 'energy',
    name: 'ENERGY',
    metrics: ['Efficiency', 'Consumption', 'Optimization'],
    icon: <Zap className="w-5 h-5" />,
    description: 'Energy efficiency and operational energy intelligence',
    href: 'https://optinexai.vercel.app',
  },
  {
    id: 'agents',
    name: 'AGENTS',
    metrics: ['Autonomy', 'Actions', 'Decisions'],
    icon: <Brain className="w-5 h-5" />,
    description: 'AI operational orchestration',
  },
  {
    id: 'digital-twin',
    name: 'DIGITAL TWIN',
    metrics: ['Prediction', 'Scenarios', 'Simulation'],
    icon: <Microscope className="w-5 h-5" />,
    description: 'Simulation and predictive modeling',
  },
  {
    id: 'labs',
    name: 'LABS',
    metrics: ['Innovation', 'Research', 'Development'],
    icon: <Shield className="w-5 h-5" />,
    description: 'Governance, AI integrity and R&D',
  },
];

export default function IntelligenceLayers() {
  // Estados para la sección Data Ingestion
  const [sourceName, setSourceName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUploadUrlMutation = trpc.ai.getUploadUrl.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('');
    }
  };

  const handleStartIngestion = async () => {
    if (!sourceName.trim() && !file) {
      alert('Por favor, ingresa el nombre de la fuente o selecciona un archivo.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Generando enlace seguro con Cloudflare R2...');

    try {
      if (file) {
        // 1. Solicitar presigned URL a tRPC
        const { uploadUrl } = await getUploadUrlMutation.mutateAsync({
          fileName: file.name,
          fileType: file.type || 'application/octet-stream',
        });

        // 2. Subida directa a Cloudflare R2
        setUploadStatus('Subiendo archivo a Cloudflare R2...');
        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type || 'application/octet-stream' },
          body: file,
        });

        if (!uploadRes.ok) throw new Error('Error al subir el archivo a Cloudflare R2');
      }

      setUploadStatus('¡Ingesta e indexación completada exitosamente!');
    } catch (error: any) {
      console.error('Error durante la ingesta:', error);
      setUploadStatus(`Error: ${error?.message || 'Fallo en la carga'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* SECCIÓN 1: Formulario Data Ingestion */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Data Ingestion
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Load the context data for digital twin modeling, simulate optimization scenarios, and benchmark the results against your industry peers.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-[#0a0e27] border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl">
            <div className="mb-6">
              <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
                Source Name
              </label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="e.g. Refinery Plant A / Polimetal Llantas"
                className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Zone de subida de archivos */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 hover:border-cyan-400 p-6 rounded-lg text-center bg-[#070c1e] cursor-pointer mb-6 transition-colors"
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv,.pdf,.docx,.pst,.txt"
              />
              <Upload className="w-7 h-7 text-cyan-400 mx-auto mb-2 animate-bounce" />
              <p className="text-sm text-gray-200 font-medium">
                {file ? `Archivo seleccionado: ${file.name}` : "Click to select or drag data files for Cloudflare R2 ingestion"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports Excel (.xlsx), PDF, Word (.docx), WhatsApp (.txt) & PST
              </p>
            </div>

            {uploadStatus && (
              <div className="mb-6 p-3 rounded bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{uploadStatus}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                <Database className="w-4 h-4" />
                <span>Cloudflare D1 + R2 Ready</span>
              </div>

              <button
                type="button"
                onClick={handleStartIngestion}
                disabled={isUploading}
                className="w-full sm:w-auto bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Ingesting...
                  </>
                ) : (
                  <>
                    Start Ingestion
                    <Upload className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: Rejilla de Intelligence Layers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            INTELLIGENCE LAYERS
          </h2>
          <p className="text-gray-500 max-w-2xl">
            Modular AI capabilities designed for enterprise operational intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
          {layers.map((layer) => {
            const CardContent = (
              <div className="h-full p-8 bg-[#0a0e27] hover:bg-white/[0.02] transition-colors group">
                <div className="mb-6 text-gray-400 group-hover:text-white transition-colors">
                  {layer.icon}
                </div>
                <h3 className="text-xs font-bold tracking-widest text-white mb-3">
                  {layer.name}
                </h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                  {layer.description}
                </p>
                <div className="space-y-3">
                  {layer.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[10px] tracking-wider text-gray-600 uppercase">
                      <span>{metric}</span>
                      <span className="text-gray-400 font-mono">
                        {Math.floor(Math.random() * 40 + 60)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );

            return (
              <div key={layer.id} className="h-full">
                {layer.href ? (
                  <a href={layer.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
