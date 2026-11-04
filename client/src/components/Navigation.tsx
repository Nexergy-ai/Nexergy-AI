import { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#problema', label: 'Problema' },
  { href: '#solucion', label: 'Solución' },
  { href: '#modulos', label: 'Módulos' },
  { href: '#evidencia', label: 'Evidencia' },
  { href: '#inversion', label: 'Inversión' },
  { href: '#ip', label: 'Propiedad Intelectual' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#impacto', label: 'Impacto' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#070c1e]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#00BFFF]" />
          <span className="text-sm font-bold font-mono text-white">
            NEXERGY<span className="text-[#00BFFF]">®</span>
            <span className="text-gray-500 font-normal hidden sm:inline"> Portal CFI</span>
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="px-3 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              {link.label}
            </a>
          ))}
        </div>
        <button className="lg:hidden text-gray-400" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-[#070c1e] border-t border-white/5 px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
