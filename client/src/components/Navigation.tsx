import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ContactButton } from '@/components/ContactButton';

export function Hero() {
  return (
    <section>
      <h1>Impulsa tu IA con Nexergy</h1>
      <ContactButton className="mt-4" />
    </section>
  );
}

interface NavItem {
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', id: 'dashboard' },
  { label: 'Orchestrator', id: 'orchestrator' },
  { label: 'Analytics', id: 'analytics' },
  { label: 'About', id: 'about' },
  { label: 'Blog', id: 'blog' },
  { label: 'Careers', id: 'careers' },
  { label: 'Docs', id: 'docs' },
  { label: 'API', id: 'api' },
  { label: 'Support', id: 'support' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navClasses = isScrolled
    ? 'bg-[rgba(10,14,39,0.95)] backdrop-blur-md border-b border-[#00BFFF]/20'
    : 'bg-transparent';

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClasses}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold">
            <span className="text-neon-blue">NEXERGY</span>
            <span className="text-white"> AI</span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-neon-blue bg-[rgba(0,191,255,0.1)]'
                  : 'text-gray-400 hover:text-neon-blue'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-[rgba(0,191,255,0.1)] text-neon-blue"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden bg-[rgba(10,14,39,0.95)] border-t border-[#00BFFF]/20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-neon-blue bg-[rgba(0,191,255,0.1)]'
                    : 'text-gray-400 hover:text-neon-blue'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
