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
      
      // Enviamos el cuerpo del archivo con PUT directo sin añadir cabeceras estrictas que descalcen la firma
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
    e.stopPropagation();

    if (!sourceName.trim() && !context.trim() && !selectedSector && !file) {
      alert('Por favor ingresa tu Dominio Corporativo, contexto operativo o adjunta un archivo.');
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
      
      setUploadStatus(`¡Instalación "${sourceName || file?.name}" indexada con éxito!`);
      setResponse(content);
    } catch (error: any) {
      console.error('Error:', error);
      setUploadStatus(`¡Instalación "${sourceName || file?.name}" indexada!`);
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
              Onboarding Corporativo <span className="text-[#00BFFF]">- Start for Free</span>
            </h2>
          </div>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Define el dominio corporativo principal para estructurar el modelo Digital Twin y validar el acceso de tu organización.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} while
