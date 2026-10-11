import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ManusDialog } from "./ManusDialog";

export function Navigation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070c1e]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-wider text-white">NEXERGY</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#data-ingestion" className="hover:text-white transition-colors">Data Ingestion</a>
          <a href="#intelligence" className="hover:text-white transition-colors">Intelligence</a>
          <a href="#governance" className="hover:text-white transition-colors">Governance</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold px-5 py-2 rounded-lg text-xs tracking-wider transition-all"
          >
            JOIN / ONBOARDING
          </Button>
        </div>
      </div>

      <ManusDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </header>
  );
}
