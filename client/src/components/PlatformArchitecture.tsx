import { motion } from 'framer-motion';
import { Zap, Brain, Cpu, Shield } from 'lucide-react';

interface Pillar {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const pillars: Pillar[] = [
  {
    title: 'Real-Time Intelligence',
    description: 'Live metrics, instant analysis, and active monitoring of your operational systems',
    icon: <Zap className="w-8 h-8" />,
    color: '#00BFFF',
    features: ['Live Metrics', 'Instant Analysis', 'Active Monitoring'],
  },
  {
    title: 'Predictive Analytics',
    description: 'Anomaly detection, risk forecasting, and proactive optimization',
    icon: <Brain className="w-8 h-8" />,
    color: '#00FF7F',
    features: ['Anomaly Detection', 'Risk Forecasting', 'Optimization'],
  },
  {
    title: 'Autonomous Execution',
    description: 'AI agents, auto-actions, and intelligent orchestration of your operations',
    icon: <Cpu className="w-8 h-8" />,
    color: '#C800FF',
    features: ['AI Agents', 'Auto-Actions', 'Orchestration'],
  },
  {
    title: 'Enterprise Governance',
    description: 'ISO 42001 compliance, audit trails, and comprehensive compliance management',
    icon: <Shield className="w-8 h-8" />,
    color: '#00FFFF',
    features: ['ISO 42001', 'Audit Trails', 'Compliance'],
  },
];

export default function PlatformArchitecture() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Platform</span>
            <span className="text-neon-blue"> Capabilities</span>
          </h2>
          <p className="text-gray-400 text-lg">Four pillars of enterprise operational intelligence</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 p-8 rounded-lg border border-neon-blue bg-[rgba(20,30,60,0.3)] backdrop-blur-sm"
        >
          <svg
            viewBox="0 0 1000 300"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0, 191, 255, 0.3))' }}
          >
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <rect x="50" y="100" width="120" height="100" rx="10" fill="rgba(0, 191, 255, 0.2)" stroke="#00BFFF" strokeWidth="2" />
              <text x="110" y="155" textAnchor="middle" fill="#00BFFF" fontSize="16" fontWeight="bold">
                Data Flow
              </text>
            </motion.g>

            <motion.line
              x1="170"
              y1="150"
              x2="220"
              y2="150"
              stroke="#00BFFF"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            />

            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <rect x="230" y="100" width="120" height="100" rx="10" fill="rgba(0, 255, 127, 0.2)" stroke="#00FF7F" strokeWidth="2" />
              <text x="290" y="155" textAnchor="middle" fill="#00FF7F" fontSize="16" fontWeight="bold">
                Intelligence
              </text>
            </motion.g>

            <motion.line
              x1="350"
              y1="150"
              x2="400"
              y2="150"
              stroke="#00FF7F"
              strokeWidth="2"
              markerEnd="url(#arrowhead2)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />

            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <rect x="410" y="100" width="120" height="100" rx="10" fill="rgba(200, 0, 255, 0.2)" stroke="#C800FF" strokeWidth="2" />
              <text x="470" y="155" textAnchor="middle" fill="#C800FF" fontSize="16" fontWeight="bold">
                Automation
              </text>
            </motion.g>

            <motion.line
              x1="530"
              y1="150"
              x2="580"
              y2="150"
              stroke="#C800FF"
              strokeWidth="2"
              markerEnd="url(#arrowhead3)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              viewport={{ once: true }}
            />

            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <rect x="590" y="100" width="120" height="100" rx="10" fill="rgba(0, 255, 255, 0.2)" stroke="#00FFFF" strokeWidth="2" />
              <text x="650" y="155" textAnchor="middle" fill="#00FFFF" fontSize="16" fontWeight="bold">
                Compliance
              </text>
            </motion.g>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#00BFFF" />
              </marker>
              <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#00FF7F" />
              </marker>
              <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#C800FF" />
              </marker>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {pillars.map((pillar, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div
                className="h-full p-6 rounded-lg border-2 bg-[rgba(20,30,60,0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                style={{
                  borderColor: pillar.color,
                  boxShadow: `0 0 15px ${pillar.color}33`,
                }}
              >
                <div
                  className="mb-4 p-3 rounded-lg inline-block"
                  style={{ backgroundColor: `${pillar.color}33` }}
                >
                  <div style={{ color: pillar.color }}>{pillar.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{pillar.description}</p>
                <div className="space-y-2">
                  {pillar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: pillar.color }}
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-lg border border-neon-blue bg-[rgba(0,191,255,0.1)] text-center"
        >
          <p className="text-gray-300">
            All four capabilities work seamlessly together to create a unified operational intelligence platform. Real-time data feeds predictive models, which inform autonomous agents, all governed by enterprise compliance frameworks.
          </p>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00BFFF] rounded-full mix-blend-screen filter blur-3xl opacity-10 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#C800FF] rounded-full mix-blend-screen filter blur-3xl opacity-10 translate-y-1/2" />
    </section>
  );
}
