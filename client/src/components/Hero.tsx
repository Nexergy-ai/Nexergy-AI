import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from './ParticleBackground';
import { ContactButton } from '@/components/ContactButton'; // Asegúrate de esta ruta

interface HeroProps {
  onExperienceOrchestrator?: () => void;
  onViewDashboard?: () => void;
}

export default function Hero({ onExperienceOrchestrator, onViewDashboard }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground />

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main headline */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="text-neon-blue">NEXERGY</span>
            <span className="text-white"> AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">Operational Intelligence</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            onClick={onExperienceOrchestrator}
            className="px-8 py-6 text-lg font-semibold bg-[#00BFFF] text-[#0a0e27] hover:bg-[#00BFFF] hover:shadow-[0_0_30px_rgba(0,191,255,0.6)] transition-all duration-300 rounded-lg"
          >
            Experience Orchestrator
          </Button>
          <Button
            onClick={onViewDashboard}
            variant="outline"
            className="px-8 py-6 text-lg font-semibold border-[#00BFFF] text-[#00BFFF] hover:bg-[rgba(0,191,255,0.1)] transition-all duration-300 rounded-lg"
          >
            View Dashboard
          </Button>
          {/* NUEVO BOTÓN INTEGRADO */}
          <ContactButton />
        </motion.div>

        {/* Scroll indicator... */}
      </motion.div>
    </section>
  );
}
