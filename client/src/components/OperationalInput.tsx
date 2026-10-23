import React, { useState, useRef } from 'react';
import { trpc } from '@/lib/trpc';
import { Database, UploadCloud, CheckCircle2, Loader2, Building2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

      // 2. Subida a Cloudflare R2 si existe archivo (PUT directo sin cabeceras duplicadas)
      if (file) {
        setUploadStatus(`Subiendo ${file.name} a Cloudflare R2...`);
        const { uploadUrl } = await getUploadUrlMutation.mutateAsync({
          fileName: file.name,
          fileType: file.type || 'application/octet-stream',
        });

        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
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
            className="w-full bg-[#0a0e27] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF] transition-colors font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold tracking-wider text-gray-300 uppercase mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00BFFF]" />
            Facturas de Energía / Documentos de Proceso (Opcional)
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 hover:border-[#00BFFF] p-6 rounded-lg text-center bg-[#0a0e27] cursor-pointer transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv,.pdf,.docx,.txt"
            />
            <UploadCloud className="w-8 h-8 text-[#00BFFF] mx-auto mb-2" />
            <p className="text-sm text-gray-300 font-medium">
              {file ? file.name : 'Haz clic para adjuntar facturas o archivos técnicos'}
            </p>
          </div>
        </div>

        {uploadStatus && (
          <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-[#00BFFF] flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{uploadStatus}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-[#00BFFF] text-xs font-mono">
            <Database className="w-4 h-4" />
            <span>Cloudflare D1 + R2 Ready</span>
          </div>

          <Button
            type="submit"
            disabled={isProcessing}
            className="bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-3 rounded-lg text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registrando...
              </>
            ) : (
              'Iniciar Alta de Instalación'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
