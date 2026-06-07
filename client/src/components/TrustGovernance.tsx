import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Scale, CheckCircle, Zap } from 'lucide-react';

const trustItems = [
  {
    title: 'ISO 42001',
    description: 'AI Management System compliance and certification',
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    title: 'Transparent Operations',
    description: 'Full audit trails and explainability for all decisions',
    icon: <Eye className="w-5 h-5" />,
  },
  {
    title: 'Autonomous Integrity',
    description: 'Blockchain-verified actions and immutable records',
    icon: <Lock className="w-5 h-5" />,
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
  return (
    <section className="py-24 px-6 border-t border-white/5 bg-[#0a0e27]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            TRUST & GOVERNANCE
          </h2>
          <p className="text-gray-500 max-w-2xl">
            Enterprise-grade security, compliance, and transparency framework for operational AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 mb-16">
          {trustItems.map((item, index) => (
            <div key={index} className="p-10 bg-[#0a0e27] hover:bg-white/[0.01] transition-colors">
              <div className="mb-6 text-white/40">{item.icon}</div>
              <h3 className="text-xs font-bold tracking-widest text-white mb-3 uppercase">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          <div className="p-12 bg-[#0a0e27]">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="w-5 h-5 text-white/60" />
              <h3 className="text-xs font-bold tracking-widest text-white uppercase">Compliance & Certification</h3>
            </div>
            <ul className="space-y-4">
              {complianceItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="w-1 h-1 bg-white/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-12 bg-[#0a0e27]">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-5 h-5 text-white/60" />
              <h3 className="text-xs font-bold tracking-widest text-white uppercase">Transparency & Accountability</h3>
            </div>
            <ul className="space-y-4">
              {accountabilityItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="w-1 h-1 bg-white/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 p-10 border border-white/5 bg-white/[0.01]">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 mb-8 uppercase">Real-time System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: 'Compliance Status', status: 'ACTIVE' },
              { label: 'Audit Trail', status: 'RECORDING' },
              { label: 'Blockchain Sync', status: 'SYNCED' },
              { label: 'Security Level', status: 'MAXIMUM' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-[10px] tracking-widest text-gray-600 uppercase">{item.label}</p>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="text-xs font-mono text-white/80">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
