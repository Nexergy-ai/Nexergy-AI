import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from './ParticleBackground';
import { ContactButton } from '@/components/ContactButton';

export function Hero() {
  return (
    <section>
      <h1>Impulsa tu IA con Nexergy</h1>
      <ContactButton className="mt-4" />
    </section>
  );
}

interface HeroProps {
  onExperienceOrchestrator?: () => void;
  onViewDashboard?: () => void;
}

export default function Hero({ onExperienceOrchestrator, onViewDashboard }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Particle background */}
      <ParticleBackground />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-block px-4 py-2 rounded-full border border-[#00BFFF] bg-[rgba(0,191,255,0.1)] text-[#00BFFF] text-sm font-semibold">
            AI-Native Operational Infrastructure
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div variants={titleVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="text-neon-blue">NEXERGY</span>
            <span className="text-white"> AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Operational Intelligence
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Receive industrial operational context and activate the correct intelligence layer automatically.
        </motion.p>

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
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-400 flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 text-neon-blue" />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00BFFF] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#C800FF] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
    </section>
  );
}
