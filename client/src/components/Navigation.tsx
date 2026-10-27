import { useState } from "react";
import { ManusDialog } from "./ManusDialog";
import { Mail } from "lucide-react";

export function Navigation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070c1e]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* BRAND LOGO CON LA 'E' CIAN DE MERCHANDISING */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="text-xl font-black tracking-wider text-white">
              NEX<span className="text-[#00BFFF]">E</span>RGY
            </span>
          </a>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-gray-300">
          <a href="#unidades" className="hover:text-[#00BFFF] transition-colors uppercase">Unidades de Negocio</a>
          <a href="#madurez" className="hover:text-[#00BFFF] transition-colors uppercase">Madurez TRL 5</a>
          <a href="#contacto" className="hover:text-[#00BFFF] transition-colors uppercase">Contacto</a>
        </nav>

        {/* BOTOÓN DE ACCIÓN DIRECTO */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:contacto@nexergy.ar?subject=Consulta%20Proyecto%20-%20Nexergy%20AI"
            className="bg-[#00BFFF] hover:bg-cyan-400 text-[#0a0e27] font-bold px-5 py-2 rounded-lg text-xs tracking-wider transition-all flex items-center gap-2 shadow-md shadow-[#00BFFF]/20 cursor-pointer"
          >
            INICIAR PROYECTO
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <ManusDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </header>
  );
}
