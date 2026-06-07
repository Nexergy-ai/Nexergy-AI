import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ParticleBackground from './ParticleBackground';
import { ContactButton } from '@/components/ContactButton';

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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <ParticleBackground />

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-white">NEXERGY</span>
            <span className="text-white/40"> AI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide uppercase">
            Operational Intelligence
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            onClick={onExperienceOrchestrator}
            className="px-8 py-6 text-sm font-semibold bg-white text-black hover:bg-gray-200 transition-colors rounded-none border border-white"
          >
            EXPERIENCE ORCHESTRATOR
          </Button>
          <Button
            onClick={onViewDashboard}
            variant="outline"
            className="px-8 py-6 text-sm font-semibold border-white/20 text-white hover:bg-white/5 transition-colors rounded-none"
          >
            VIEW DASHBOARD
          </Button>
          <ContactButton />
        </motion.div>
      </motion.div>
    </section>
  );
}
