import React, { useState, useRef } from 'react';
import { Loader2, Upload, FileText, CheckCircle2, Database, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

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

  const uploadToR2 = async (fileToUpload: File) => {
    setIsUploading(true);
    setUploadStatus('Generando enlace seguro con Cloudflare R2...');

    try {
      const { uploadUrl } = await getUploadUrlMutation.mutateAsync({
        fileName: fileToUpload.name,
        fileType: fileToUpload.type || 'application/octet-stream',
      });

      setUploadStatus(`Subiendo ${fileToUpload.name} a Cloudflare R2...`);

      // PUT directo sin cabeceras Content-Type redundantes para evitar descalce de firma en R2
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: fileToUpload,
      });

      if (!uploadRes.ok) throw new Error('Error al almacenar el archivo en Cloudflare R2.');

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
      alert('Por favor ingresá el Dominio Corporativo o adjuntá un archivo.');
      return;
    }

    setIsLoading(true);
    setResponse('');
    setUploadStatus('Conectando con Cloudflare D1 + R2...');

    try {
      // 1. Guardar registro del dominio en Cloudflare D1
      if (sourceName.trim()) {
        await createIngestionMutation.mutateAsync({
          sourceName: sourceName.trim(),
        });
      }

      // 2. Subida directa del archivo técnico/factura a Cloudflare R2 vía presigned URL
      if (file) {
        await uploadToR2(file);
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
    <div className="max-w-4xl mx-auto bg-[#0a0e27] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="mb-6">
        <label className="block text-xs font-bold tracking-wider text-cyan-400 uppercase mb-2 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Nombre de tu instalación, Dominio Corporativo...
        </label>
        <div className="relative">
          <input
            type="text"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
            placeholder="Ej: arcor.com.ar / Planta Central"
            className="w-full bg-[#070c1e] border border-gray-700 rounded-xl p-3.5 pl-4 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>
      </div>

      {/* Selector de Archivos para Cloudflare R2 */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-700 hover:border-cyan-400 p-6 rounded-xl text-center bg-[#070c1e] cursor-pointer mb-6 transition-all group"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".xlsx,.xls,.csv,.pdf,.docx,.txt"
        />
        <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
        <p className="text-sm text-gray-200 font-medium">
          {file ? `Archivo seleccionado: ${file.name}` : 'Click para seleccionar o arrastrar facturas o datos para Cloudflare R2'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Soporta Excel (.xlsx), PDF, Word (.docx), WhatsApp (.txt)
        </p>
      </div>

      {uploadStatus && (
        <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-400 flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{uploadStatus}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
          <Database className="w-4 h-4" />
          <span>Cloudflare D1 + R2 Ready</span>
        </div>

        <Button
          type="button"
          onClick={simulateIntelligence}
          disabled={isLoading || isUploading}
          className="w-full sm:w-auto bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          {isLoading || isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Procesando...
            </>
          ) : (
            'Iniciar Alta de Instalación'
          )}
        </Button>
      </div>

      {response && (
        <div className="mt-8 p-6 bg-[#070c1e] border border-cyan-500/20 rounded-xl text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
            Evaluación Técnica Preliminar
          </h4>
          {response}
        </div>
      )}
    </div>
  );
}
