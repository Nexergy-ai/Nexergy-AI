import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Building2, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

interface ManusDialogProps {
  title?: string;
  logo?: string;
  open?: boolean;
  onLogin?: () => void;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export function ManusDialog({
  title,
  logo,
  open = false,
  onOpenChange,
  onClose,
}: ManusDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createIngestionMutation = trpc.ai.createIngestion.useMutation();

  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }
    if (!nextOpen) {
      onClose?.();
      setStatus("");
    }
  };

  const handleStartOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cleanDomain = domain.trim().replace(/^@/, '');

    if (!cleanDomain) {
      alert("Por favor ingresá el dominio principal de tu empresa (ej: arcor.com.ar)");
      return;
    }

    setIsLoading(true);
    setStatus("Guardando dominio corporativo en Cloudflare D1...");

    try {
      await createIngestionMutation.mutateAsync({
        sourceName: cleanDomain,
      });
      setStatus(`¡Dominio ${cleanDomain} registrado exitosamente en D1!`);
    } catch (err: any) {
      console.error("Error al registrar en D1:", err);
      setStatus(`Error: ${err?.message || "No se pudo guardar el dominio en la base de datos."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={onOpenChange ? open : internalOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="py-6 bg-[#0a0e27] text-white rounded-[20px] w-[440px] shadow-2xl border border-cyan-500/30 backdrop-blur-2xl p-6 gap-0 text-left">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#00BFFF]/10 rounded-lg flex items-center justify-center border border-[#00BFFF]/30">
            <Building2 className="w-5 h-5 text-[#00BFFF]" />
          </div>
          <div>
            <DialogTitle className="text-lg font-bold text-white tracking-tight">
              Onboarding Corporativo <span className="text-gray-400 font-normal">- Start for Free</span>
            </DialogTitle>
          </div>
        </div>

        <DialogDescription className="text-xs text-gray-400 mb-6">
          Define el dominio corporativo y habilita los 4 roles clave de tu empresa.
        </DialogDescription>

        <form onSubmit={handleStartOnboarding} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-white mb-2">
              Dominio Principal de la Empresa
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400 font-bold">@</span>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="nexergy.ar"
                className="w-full bg-[#070c1e] border border-cyan-500/50 rounded-lg py-3 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-[#00BFFF] transition-colors"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              Solo usuarios con correo de este dominio podrán acceder a tu organización.
            </p>
          </div>

          {status && (
            <div className={`p-3 rounded border text-xs flex items-center gap-2 ${
              status.startsWith("Error") 
                ? "bg-red-950/40 border-red-500/40 text-red-400" 
                : "bg-cyan-950/50 border-cyan-500/40 text-[#00BFFF]"
            }`}>
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={isLoading || createIngestionMutation.isPending}
              className="w-full h-11 bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading || createIngestionMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando en D1...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
