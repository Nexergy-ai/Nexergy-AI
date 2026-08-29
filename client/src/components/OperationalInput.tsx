import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, Zap, FileText, CheckCircle2, Database } from 'lucide-react';
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
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    emoji: '🏭',
    description: 'Predictive maintenance & optimization',
  },
  {
    id: 'energy',
    name: 'Energy',
    emoji: '⚡',
    description: 'Energy efficiency & grid optimization',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    emoji: '📦',
    description: 'Supply chain optimization',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    emoji: '🏥',
    description: 'Operational efficiency',
  },
  {
    id: 'mining',
    name: 'Mining',
    emoji: '⛏️',
    description: 'Resource optimization',
  },
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

  // Mutaciones de tRPC
  const analyzeMutation = trpc.ai.analyzeLLM.useMutation();
  const getUploadUrlMutation = trpc.ai.getUploadUrl.useMutation();

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
      alert('Por favor ingresa un Source Name, contexto, selecciona un sector o adjunta un archivo.');
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      if (file) {
        await uploadToR2(file);
      }

      const sectorName = selectedSector ? sectors.find(s => s.id === selectedSector)?.name : 'General';
      const fileInfo = file ? `\nAttached File: ${file.name}` : '';
      const sourceInfo = sourceName ? `\nSource Name: ${sourceName}` : '';
      
      const prompt = `You are NEXERGY AI, an advanced operational intelligence platform. Based on the following operational context and attached assets, provide a concise, technical analysis with specific recommendations.

Operational Context: ${context || `Default scenario for ${sectorName}`}${sourceInfo}${fileInfo}
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
      setResponse(`Error al generar análisis de inteligencia: ${error?.message || 'Error de conexión'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#070c1e]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Data</span>
            <span className="text-neon-blue"> Ingestion</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Load the context data for digital twin modeling, simulate optimization scenarios, and benchmark the results against your industry peers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="p-8 rounded-lg border border-white/10 bg-[#0a0e27] shadow-2xl mb-8"
        >
          {/* Source Name Input */}
          <div className="mb-6">
            <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2">
              Source Name
            </label>
            <input
              type="text"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="e.g. Refinery Plant A / Polimetal Inyección"
              className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon-blue"
            />
          </div>

          <h3 className="text-sm font-bold text-gray-300 uppercase mb-4">Select Industry Sector</h3>
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

          {/* Universal Data Ingestion (Cloudflare D1 + R2 Ready) */}
          <h3 className="text-sm font-bold text-gray-300 uppercase mb-3">Data File Upload</h3>
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
                {file ? `Selected: ${file.name}` : "Click or drag files to upload for ingestion"}
              </p>
              <p className="text-xs text-gray-400">
                Supports Excel (.xlsx), PDF, Word (.docx), WhatsApp chats (.txt) & PST
              </p>
            </div>
          </div>

          {uploadStatus && (
            <div className="mb-6 p-3 rounded bg-[rgba(0,191,255,0.1)] border border-neon-blue text-xs text-neon-blue flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          <h3 className="text-sm font-bold text-gray-300 uppercase mb-3">Operational Context</h3>
          <Textarea
            placeholder="Describe your operational scenario, challenges, or current status..."
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
                  {isUploading ? 'Uploading to R2...' : 'Ingesting Data...'}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-lg border border-neon-green/40 bg-[#0a0e27]"
          >
            <h3 className="text-xl font-bold text-neon-green mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Intelligence Analysis
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
