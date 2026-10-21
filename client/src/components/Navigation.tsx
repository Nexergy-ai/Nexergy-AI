import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ManusDialog } from "./ManusDialog";
import { Globe, ChevronDown } from "lucide-react";

type Language = 'ES' | 'EN' | 'PT';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'ES', label: 'Español', flag: '🇦🇷' },
  { code: 'EN', label: 'English', flag: '🇺🇸' },
  { code: 'PT', label: 'Português', flag: '🇧🇷' },
];

export function Navigation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('ES');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const selectedLangOption = languages.find((l) => l.code === currentLang) || languages[0];

  const handleSelectLanguage = (code: Language) => {
    setCurrentLang(code);
    setIsLangMenuOpen(false);
    // Nota: Aquí se conectará el estado global de i18n o diccionario de traducciones
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070c1e]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-wider text-white">NEXERGY</span>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#analytics" className="hover:text-white transition-colors">Data Ingestion</a>
          <a href="#intelligence" className="hover:text-white transition-colors">Intelligence</a>
          <a href="#governance" className="hover:text-white transition-colors">Governance</a>
        </nav>

        {/* ZONA DERECHA: SELECTOR DE IDIOMA Y BOTÓN DE ONBOARDING */}
        <div className="flex items-center gap-4">
          {/* Selector de Idiomas */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 bg-[#0a0e27] hover:bg-white/10 text-gray-200 border border-white/15 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#00BFFF]" />
              <span>{selectedLangOption.flag}</span>
              <span className="font-bold">{selectedLangOption.code}</span>
              <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Menú Desplegable de Idiomas */}
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#0a0e27] border border-white/15 rounded-lg shadow-2xl py-1 z-50 backdrop-blur-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-[#00BFFF]/20 transition-colors ${
                      currentLang === lang.code ? 'text-[#00BFFF] font-bold bg-white/5' : 'text-gray-300'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botón Onboarding */}
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
