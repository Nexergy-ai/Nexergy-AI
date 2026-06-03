import { motion } from 'framer-motion';
import { CheckCircle, Shield, Lock, Zap } from 'lucide-react';

interface GovernanceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const trustItems: GovernanceItem[] = [
  {
    title: 'ISO 42001',
    description: 'AI Management System compliance and certification',
    icon: <CheckCircle className="w-6 h-6" />,
    color: '#00BFFF',
  },
  {
    title: 'Transparent Operations',
    description: 'Full audit trails and explainability for all decisions',
    icon: <Shield className="w-6 h-6" />,
    color: '#00FF7F',
  },
  {
    title: 'Autonomous Integrity',
    description: 'Blockchain-verified actions and immutable records',
    icon: <Lock className="w-6 h-6" />,
    color: '#C800FF',
  },
];

const complianceItems = [
  'ISO 42001 AI Management System',
  'SOC 2 Type II Certification',
  'GDPR & Data Privacy Compliance',
  'Industry-specific Regulations',
];

const accountabilityItems = [
  'Complete Audit Trails',
  'Decision Explainability',
  'Blockchain Verification',
  'Real-time Monitoring',
];

export default function TrustGovernance() {
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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Trust &</span>
            <span className="text-neon-blue"> Governance</span>
          </h2>
          <p className="text-gray-400 text-lg">Enterprise-grade security, compliance, and transparency</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {trustItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div
                className="p-8 rounded-lg border-2 bg-[rgba(20,30,60,0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg text-center"
                style={{
                  borderColor: item.color,
                  boxShadow: `0 0 20px ${item.color}33`,
                }}
              >
                <div
                  className="mb-4 flex justify-center"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="p-8 rounded-lg border-2 border-neon-green bg-[rgba(20,30,60,0.3)] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-neon-green" />
              <h3 className="text-xl font-bold text-neon-green">Compliance & Certification</h3>
            </div>
            <ul className="space-y-3">
              {complianceItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-neon-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-lg border-2 border-neon-purple bg-[rgba(20,30,60,0.3)] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-neon-purple" />
              <h3 className="text-xl font-bold text-neon-purple">Transparency & Accountability</h3>
            </div>
            <ul className="space-y-3">
              {accountabilityItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-neon-purple" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-lg border border-neon-cyan bg-[rgba(20,30,60,0.5)] backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-neon-cyan mb-6">Real-time System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Compliance Status', status: 'Active' },
              { label: 'Audit Trail', status: 'Recording' },
              { label: 'Blockchain Sync', status: 'Synced' },
              { label: 'Security Level', status: 'Critical' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[rgba(0,255,255,0.1)] border border-neon-cyan">
                <p className="text-xs text-gray-400 mb-2">{item.label}</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="text-sm font-semibold text-neon-cyan">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00FF7F] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#00BFFF] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
    </section>
  );
}
