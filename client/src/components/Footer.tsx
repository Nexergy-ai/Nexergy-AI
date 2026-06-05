import { motion } from 'framer-motion';
import { Activity, Shield, Zap } from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Orchestrator', href: '#orchestrator' },
    { label: 'Analytics', href: '#analytics' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
  ],
  resources: [
    { label: 'Docs', href: '#docs' },
    { label: 'API', href: '#api' },
    { label: 'Support', href: '#support' },
  ],
};

const statusIndicators = [
  { label: 'System Status', status: 'Operational', icon: <Activity className="w-4 h-4" /> },
  { label: 'Security', status: 'Secure', icon: <Shield className="w-4 h-4" /> },
  { label: 'Performance', status: 'Optimal', icon: <Zap className="w-4 h-4" /> },
];

export default function Footer() {
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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <footer className="bg-[rgba(10,14,39,0.8)] border-t border-[#00BFFF]/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
        >
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <span className="text-2xl font-bold">
                <span className="text-neon-blue">NEXERGY</span>
                <span className="text-white"> AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              AI-Native Operational Infrastructure for enterprise intelligence and autonomous execution.
            </p>
            {/* Correo de contacto destacado */}
            <a 
              href="mailto:contacto@nexergy.ar" 
              className="text-sm text-neon-cyan hover:text-white transition-colors flex items-center gap-2"
            >
              ✉️ contacto@nexergy.ar
            </a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-neon-blue transition-colors text-sm">{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-neon-blue transition-colors text-sm">{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-neon-blue transition-colors text-sm">{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-8 p-4 rounded-lg border border-neon-cyan bg-[rgba(0,255,255,0.05)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statusIndicators.map((indicator, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="text-neon-cyan">{indicator.icon}</div>
                <div>
                  <p className="text-xs text-gray-400">{indicator.label}</p>
                  <p className="text-sm font-semibold text-neon-cyan flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    {indicator.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-[#00BFFF]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-400 text-sm">© 2026 NEXERGY AI. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="mailto:contacto@nexergy.ar" className="text-neon-blue hover:text-white transition-colors">Contact</a>
            <a href="#privacy" className="text-gray-400 hover:text-neon-blue transition-colors">Privacy</a>
            <a href="#terms" className="text-gray-400 hover:text-neon-blue transition-colors">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
