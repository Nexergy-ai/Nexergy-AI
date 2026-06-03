import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Upload, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/lib/trpc';
import { Streamdown } from 'streamdown';

interface Sector {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

const sectors: Sector[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    emoji: '🏭',
    description: 'Predictive maintenance & optimization',
  },
  {
    id: 'energy',
    name: 'Energy',
    emoji: '⚡',
    description: 'Energy efficiency & grid optimization',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    emoji: '📦',
    description: 'Supply chain optimization',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    emoji: '🏥',
    description: 'Operational efficiency',
  },
  {
    id: 'mining',
    name: 'Mining',
    emoji: '⛏️',
    description: 'Resource optimization',
  },
];

export default function OperationalInput() {
  const [context, setContext] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const analyzeMutation = trpc.ai.analyzeLLM.useMutation();

  const simulateIntelligence = async () => {
    if (!context.trim() && !selectedSector) {
      alert('Please enter operational context or select a sector');
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      const sectorName = selectedSector ? sectors.find(s => s.id === selectedSector)?.name : 'General';
      const prompt = `You are NEXERGY AI, an advanced operational intelligence platform. Based on the following operational context, provide a concise, technical analysis with specific recommendations.

Operational Context: ${context || `Default scenario for ${sectorName}`}
Industry Sector: ${sectorName}

Provide:
1. Operational Status Assessment (2-3 sentences)
2. Key Intelligence Findings (3-4 bullet points)
3. Recommended Actions (2-3 specific recommendations)
4. Risk Indicators (2-3 identified risks)

Be technical, specific, and actionable.`;

      const result = await analyzeMutation.mutateAsync({ prompt });
      const content = typeof result.content === 'string' ? result.content : JSON.stringify(result.content);
      setResponse(content);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error generating intelligence. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Operational</span>
            <span className="text-neon-blue"> Intelligence</span>
          </h2>
          <p className="text-gray-400 text-lg">Provide your operational context and receive AI-powered intelligence</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="p-8 rounded-lg border-2 border-neon-blue bg-[rgba(20,30,60,0.5)] backdrop-blur-sm mb-8"
        >
          <h3 className="text-xl font-bold text-neon-blue mb-6">Select Industry Sector</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                  selectedSector === sector.id
                    ? 'border-neon-blue bg-[rgba(0,191,255,0.2)]'
                    : 'border-gray-600 hover:border-neon-blue'
                }`}
              >
                <div className="text-3xl mb-2">{sector.emoji}</div>
                <div className="text-sm font-semibold text-white">{sector.name}</div>
                <div className="text-xs text-gray-400 mt-1">{sector.description}</div>
              </button>
            ))}
          </div>

          <h3 className="text-xl font-bold text-neon-blue mb-4">Operational Context</h3>
          <Textarea
            placeholder="Describe your operational scenario, challenges, or current status..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="mb-6 bg-[rgba(10,14,39,0.5)] border-gray-600 text-white placeholder-gray-500 focus:border-neon-blue"
            rows={5}
          />

          <Button
            onClick={simulateIntelligence}
            disabled={isLoading || (!context.trim() && !selectedSector)}
            className="w-full px-6 py-3 bg-neon-blue text-[#0a0e27] hover:bg-[#00BFFF] font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Activate Intelligence
              </>
            )}
          </Button>
        </motion.div>

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-lg border-2 border-neon-green bg-[rgba(20,30,60,0.5)] backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-neon-green mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Intelligence Analysis
            </h3>
            <div className="text-gray-300">
              <Streamdown>{response}</Streamdown>
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00BFFF] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#00FF7F] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
    </section>
  );
}
