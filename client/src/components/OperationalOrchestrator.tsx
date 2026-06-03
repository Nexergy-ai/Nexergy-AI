import { motion } from 'framer-motion';
import { ArrowRight, Database, Brain, Zap, BarChart3, Cpu } from 'lucide-react';

interface OrchestratorStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const steps: OrchestratorStep[] = [
  {
    id: 1,
    title: 'Data Ingestion',
    description: 'Collect operational context',
    icon: <Database className="w-8 h-8" />,
    color: '#00BFFF',
    glowColor: 'rgba(0, 191, 255, 0.5)',
  },
  {
    id: 2,
    title: 'AI Analysis',
    description: 'Process and understand',
    icon: <Brain className="w-8 h-8" />,
    color: '#00FF7F',
    glowColor: 'rgba(0, 255, 127, 0.5)',
  },
  {
    id: 3,
    title: 'Digital Twin',
    description: 'Simulate scenarios',
    icon: <Zap className="w-8 h-8" />,
    color: '#C800FF',
    glowColor: 'rgba(200, 0, 255, 0.5)',
  },
  {
    id: 4,
    title: 'Risk & Efficiency',
    description: 'Evaluate outcomes',
    icon: <BarChart3 className="w-8 h-8" />,
    color: '#00FFFF',
    glowColor: 'rgba(0, 255, 255, 0.5)',
  },
  {
    id: 5,
    title: 'Business Unit',
    description: 'Activate intelligence',
    icon: <Cpu className="w-8 h-8" />,
    color: '#FF00FF',
    glowColor: 'rgba(255, 0, 255, 0.5)',
  },
];

export default function OperationalOrchestrator() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-blue">Operational</span>
            <span className="text-white"> Orchestrator</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Describe your operation. NEXERGY AI activates the correct intelligence layer.
          </p>
        </motion.div>

        {/* Orchestrator flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16"
        >
          {steps.map((step, index) => (
            <motion.div key={step.id} variants={stepVariants} className="relative">
              {/* Step card */}
              <div
                className="p-6 rounded-lg border-2 bg-[rgba(20,30,60,0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg cursor-pointer group"
                style={{
                  borderColor: step.color,
                  boxShadow: `0 0 20px ${step.glowColor}`,
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 p-3 rounded-lg inline-block"
                  style={{ backgroundColor: step.glowColor }}
                >
                  <div style={{ color: step.color }}>{step.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-neon-blue transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400">{step.description}</p>

                {/* Step number */}
                <div
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: step.glowColor,
                    color: step.color,
                  }}
                >
                  {step.id}
                </div>
              </div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:flex absolute top-1/2 -right-8 transform -translate-y-1/2 z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6 text-neon-blue" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Orchestration flow description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-[rgba(20,30,60,0.3)] border border-[#00BFFF] rounded-lg p-8 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-neon-blue mb-4">Orchestration Flow</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            NEXERGY AI receives your operational context and intelligently routes it through our orchestration pipeline. Each stage processes the data with increasing sophistication, building a comprehensive understanding of your operational reality.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The result is precise, actionable intelligence delivered to the right business unit. Our system learns from each orchestration cycle, continuously improving its understanding of your unique operational environment.
          </p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00BFFF] rounded-full mix-blend-screen filter blur-3xl opacity-10 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C800FF] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
    </section>
  );
}
