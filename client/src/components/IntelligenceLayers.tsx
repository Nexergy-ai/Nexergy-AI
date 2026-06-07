import { motion } from 'framer-motion';
import { Zap, Brain, Cpu, Microscope, Shield } from 'lucide-react';

interface IntelligenceLayer {
  id: string;
  name: string;
  metrics: string[];
  icon: React.ReactNode;
  description: string;
  href?: string;
}

const layers: IntelligenceLayer[] = [
  {
    id: 'industrial',
    name: 'INDUSTRIAL',
    metrics: ['Uptime', 'Efficiency', 'Downtime'],
    icon: <Cpu className="w-5 h-5" />,
    description: 'Predictive maintenance and industrial optimization',
  },
  {
    id: 'energy',
    name: 'ENERGY',
    metrics: ['Efficiency', 'Consumption', 'Optimization'],
    icon: <Zap className="w-5 h-5" />,
    description: 'Energy efficiency and operational energy intelligence',
    href: 'https://optinexai.vercel.app',
  },
  {
    id: 'agents',
    name: 'AGENTS',
    metrics: ['Autonomy', 'Actions', 'Decisions'],
    icon: <Brain className="w-5 h-5" />,
    description: 'AI operational orchestration',
  },
  {
    id: 'digital-twin',
    name: 'DIGITAL TWIN',
    metrics: ['Prediction', 'Scenarios', 'Simulation'],
    icon: <Microscope className="w-5 h-5" />,
    description: 'Simulation and predictive modeling',
  },
  {
    id: 'labs',
    name: 'LABS',
    metrics: ['Innovation', 'Research', 'Development'],
    icon: <Shield className="w-5 h-5" />,
    description: 'Governance, AI integrity and R&D',
  },
];

export default function IntelligenceLayers() {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            INTELLIGENCE LAYERS
          </h2>
          <p className="text-gray-500 max-w-2xl">
            Modular AI capabilities designed for enterprise operational intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 border border-white/5">
          {layers.map((layer) => {
            const CardContent = (
              <div className="h-full p-8 bg-[#0a0e27] hover:bg-white/[0.02] transition-colors group">
                <div className="mb-6 text-gray-400 group-hover:text-white transition-colors">
                  {layer.icon}
                </div>
                <h3 className="text-xs font-bold tracking-widest text-white mb-3">
                  {layer.name}
                </h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                  {layer.description}
                </p>
                <div className="space-y-3">
                  {layer.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[10px] tracking-wider text-gray-600 uppercase">
                      <span>{metric}</span>
                      <span className="text-gray-400 font-mono">
                        {Math.floor(Math.random() * 40 + 60)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );

            return (
              <div key={layer.id} className="h-full">
                {layer.href ? (
                  <a href={layer.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
