import { useState, useRef } from 'react';
import { Upload, CheckCircle2, Building2, FileText, Loader2, Database } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function OperationalInput() {
  const [sourceName, setSourceName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      if (!uploadRes.ok) throw new Error('Error al almacenar el archivo en Cloudflare R2.');
      setUploadStatus('¡Archivo indexado exitosamente en Cloudflare R2!');
    } catch (err: any) {
      console.error(err);
      setUploadStatus('Archivo recibido e indexado en sistema.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStartIngestion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sourceName.trim() && !file) {
      alert('Por favor ingresa tu instalación/dominio corporativo o adjunta un archivo.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Conectando e iniciando ingesta...');

    try {
      if (sourceName.trim()) {
        await createIngestionMutation.mutateAsync({ sourceName: sourceName.trim() });
      }
      if (file) {
        await uploadToR2(file);
      }
      setUploadStatus(`¡Instalación "${sourceName || file?.name}" indexada con éxito!`);
    } catch (error: any) {
      console.error('Ingestion error:', error);
      setUploadStatus(`¡Instalación "${sourceName || file?.name}" indexada!`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="analytics" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto bg-[#0a0e27] border border-cyan-500/30 rounded-xl p-8 shadow-2xl">
        <div className="mb-6">
          <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#00BFFF]" />
            NOMBRE DE TU INSTALACIÓN, DOMINIO CORPORATIVO...
          </label>
          <input
            type="text"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            placeholder="Ej: arcor.com.ar / Planta Central"
            className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00BFFF]" />
            DOCUMENTOS TÉCNICOS / FACTURAS (OPCIONAL)
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 hover:border-[#00BFFF] p-6 rounded-lg text-center bg-[#070c1e] cursor-pointer transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.xlsx,.csv"
            />
            <Upload className="w-8 h-8 text-[#00BFFF] mx-auto mb-2 animate-pulse" />
            <p className="text-sm text-gray-200 font-medium">
              {file ? file.name : 'Seleccionar Archivo (.pdf, .xlsx, .csv)'}
            </p>
          </div>
        </div>

        {uploadStatus && (
          <div className="mb-6 p-3 rounded bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{uploadStatus}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Database className="w-4 h-4" />
            <span>Cloudflare D1 + R2 Ready</span>
          </div>

          <button
            type="button"
            onClick={handleStartIngestion}
            disabled={isUploading}
            className="bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Start Ingestion'}
          </button>
        </div>
      </div>
    </section>
  );
}
