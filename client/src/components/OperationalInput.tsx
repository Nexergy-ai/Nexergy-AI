import React, { useState, useRef } from 'react';
import { trpc } from '@/lib/trpc';
import { Database, UploadCloud, CheckCircle2, AlertCircle, Loader2, Building2, FileText } from 'lucide-react';

export default function OperationalInput() {
  const [sourceName, setSourceName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mutaciones tRPC
  const createIngestionMutation = trpc.ai.createIngestion.useMutation();
  const getUploadUrlMutation = trpc.ai.getUploadUrl.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus(`Archivo listo: ${e.target.files[0].name}`);
    }
  };

  const handleStartIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sourceName.trim() && !file) {
      alert('Por favor ingresa el Nombre de tu instalación o Dominio Corporativo.');
      return;
    }

    setIsProcessing(true);
    setUploadStatus('Conectando con Cloudflare D1 + R2...');

    try {
      // 1. Guardar en Cloudflare D1
      if (sourceName.trim()) {
        await createIngestionMutation.mutateAsync({ sourceName: sourceName.trim() });
      }

      // 2. Subida a Cloudflare R2 si existe archivo
      if (file) {
        setUploadStatus(`Subiendo ${file.name} a Cloudflare R2...`);
        const { uploadUrl } = await getUploadUrlMutation.mutateAsync({
          fileName: file.name,
          fileType: file.type || 'application/octet-stream',
        });

        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type || 'application/octet-stream' },
          body: file,
        });

        if (!uploadRes.ok) throw new Error('Error al subir archivo a Cloudflare R2');
      }

      setUploadStatus(`¡Instalación "${sourceName || 'Registrada'}" indexada con éxito en Cloudflare!`);
      setSourceName('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      console.error('Error durante la ingesta:', err);
      setUploadStatus(`Error al procesar: ${err?.message || 'Fallo de conexión'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#070c1e]/90 border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
      <form onSubmit={handleStartIngestion} className="space-y-6">
        {/* Campo Principal Corregido */}
        <div>
          <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#00BFFF]" />
            Nombre de tu instalación, Dominio Corporativo...
          </label>
          <input
            type="text"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            placeholder="Ej: arcor.com.ar / Planta Central"
            className="w-full bg-[#0a0e27] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF] transition-colors"
          />
        </div>

        {/* Carga Opcional de Documentos */}
        <div>
          <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00BFFF]" />
            Documentos Técnicos / Facturas (Opcional)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              id="file-upload-input"
            />
            <label
              htmlFor="file-upload-input"
              className="cursor-pointer bg-[#0a0e27] hover:bg-gray-800 text-gray-300 border border-gray-700 font-medium text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4 text-[#00BFFF]" />
              {file ? file.name : 'Seleccionar Archivo (.pdf, .xlsx, .csv)'}
            </label>
            {file && (
              <span className="text-xs text-emerald-400 font-mono">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            )}
          </div>
        </div>

        {/* Botón de Ingesta */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <Database className="w-4 h-4 text-[#00BFFF]" />
            <span>Cloudflare D1 + R2 Ready</span>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full sm:w-auto bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Procesando Ingesta...
              </>
            ) : (
              <>
                Start Ingestion
                <UploadCloud className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Mensaje de Estado */}
        {uploadStatus && (
          <div className={`mt-4 text-xs flex items-center gap-2 p-3 rounded-lg border ${
            uploadStatus.includes('Error') 
              ? 'bg-rose-950/30 border-rose-800/50 text-rose-300' 
              : 'bg-cyan-950/30 border-[#00BFFF]/40 text-cyan-300'
          }`}>
            {uploadStatus.includes('Error') ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#00BFFF] shrink-0" />
            )}
            <span>{uploadStatus}</span>
          </div>
        )}
      </form>
    </div>
  );
}
