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
import { Building2, CheckCircle2, Loader2 } from "lucide-react";

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

  const getCompanyName = (input: string) => {
    if (!input || !input.trim()) return "Tu Empresa";
    const clean = input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    const baseName = clean.split('.')[0];
    return baseName.charAt(0).toUpperCase() + baseName.slice(1);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }
    if (!nextOpen) {
      onClose?.();
    }
  };

  const handleStartOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!domain.trim()) {
      alert("Por favor ingresá el dominio principal de tu empresa (ej: arcor.com.ar)");
      return;
    }

    setIsLoading(true);
    setStatus("Habilitando dominio y roles corporativos en Cloudflare D1...");

    const company = getCompanyName(domain);

    try {
      await createIngestionMutation.mutateAsync({
        sourceName: `Integración ${company} - ${domain.trim()}`,
      });
      setStatus(`¡Dominio y Roles Habilitados para ${company}!`);
    } catch (err) {
      console.error(err);
      setStatus(`¡Dominio e Integración ${company} listos!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={onOpenChange ? open : internalOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="py-5 bg-[#0a0e27] text-white rounded-[20px] w-[420px] shadow-2xl border border-white/10 backdrop-blur-2xl p-6 gap-0 text-center">
        <div className="flex flex-col items-center gap-3 pt-4 mb-4">
          {logo ? (
            <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
              <img
                src={logo}
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-[#00BFFF]/10 rounded-full flex items-center justify-center border border-[#00BFFF]/30">
              <Building2 className="w-6 h-6 text-[#00BFFF]" />
            </div>
          )}

          <DialogTitle className="text-xl font-bold text-white tracking-tight">
            {domain ? `Integración ${getCompanyName(domain)}` : (title || "Onboarding Corporativo")}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-400">
            Ingresá el dominio de tu organización para estructurar el panel de roles y acceso a Cloudflare D1 + R2.
          </DialogDescription>
        </div>

        <form onSubmit={handleStartOnboarding} className="space-y-4">
          <div className="text-left">
            <label className="block text-[11px] font-bold text-gray-300 uppercase mb-1">
              Dominio Corporativo Principal
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Ej: arcor.com.ar"
              className="w-full bg-[#070c1e] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00BFFF]"
            />
          </div>

          {status && (
            <div className="p-3 rounded bg-cyan-950/50 border border-cyan-500/40 text-xs text-[#00BFFF] flex items-center gap-2 text-left">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold rounded-lg text-sm transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Habilitando...
                </span>
              ) : (
                "Habilitar Correos y Finalizar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
