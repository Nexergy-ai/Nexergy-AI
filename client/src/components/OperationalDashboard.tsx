import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Activity, BarChart3, Layers, Zap, TrendingUp, AlertCircle, Brain } from 'lucide-react';

interface KPIData {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const activityData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 78 },
  { time: '12:00', value: 95 },
  { time: '16:00', value: 87 },
  { time: '20:00', value: 72 },
  { time: '24:00', value: 65 },
];

const businessUnitData = [
  { name: 'INDUSTRIAL', value: 85 },
  { name: 'ENERGY', value: 72 },
  { name: 'AGENTS', value: 68 },
  { name: 'DIGITAL TWIN', value: 91 },
  { name: 'LABS', value: 55 },
];

const agentStatusData = [
  { name: 'Monitoring', value: 45 },
  { name: 'Analyzing', value: 38 },
  { name: 'Optimizing', value: 12 },
  { name: 'Learning', value: 5 },
];

const COLORS = ['#ffffff', '#ffffff80', '#ffffff40', '#ffffff20'];

export default function OperationalDashboard() {
  const [kpis, setKpis] = useState<KPIData[]>([
    {
      title: 'System Uptime',
      value: '99.97%',
      change: 2.5,
      icon: <Activity className="w-4 h-4" />,
    },
    {
      title: 'Active Agents',
      value: 247,
      change: 2.5,
      icon: <Brain className="w-4 h-4" />,
    },
    {
      title: 'Anomalies Detected',
      value: 12,
      change: -1.2,
      icon: <AlertCircle className="w-4 h-4" />,
    },
    {
      title: 'AI Recommendations',
      value: 1847,
      change: 2.5,
      icon: <Zap className="w-4 h-4" />,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis((prev) =>
        prev.map((kpi) => {
          if (kpi.title === 'Active Agents') {
            return {
              ...kpi,
              value: Math.max(200, Math.min(300, (kpi.value as number) + Math.floor(Math.random() * 10 - 5))),
            };
          }
          if (kpi.title === 'AI Recommendations') {
            return {
              ...kpi,
              value: (kpi.value as number) + Math.floor(Math.random() * 20),
            };
          }
          return kpi;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 border-t border-white/5 bg-[#0a0e27]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4 uppercase">
            OPERATIONAL DASHBOARD
          </h2>
          <p className="text-gray-500 max-w-2xl">
            Real-time monitoring and predictive analysis of industrial operational layers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-8">
          {kpis.map((kpi, index) => (
            <div key={index} className="p-8 bg-[#0a0e27] hover:bg-white/[0.01] transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="text-white/40">{kpi.icon}</div>
                <span className={`text-[10px] font-mono ${kpi.change >= 0 ? 'text-white/60' : 'text-white/30'}`}>
                  {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                </span>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">{kpi.title}</p>
              <p className="text-2xl font-bold text-white tracking-tight">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border-x border-b border-white/5">
          <div className="lg:col-span-2 p-10 bg-[#0a0e27]">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 mb-12 uppercase">24h Activity Flow</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0a0e27',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0px',
                      fontSize: '10px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={1}
                    dot={false}
                    activeDot={{ r: 4, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-10 bg-[#0a0e27]">
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 mb-12 uppercase">Agent Distribution</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={agentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {agentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 space-y-3">
              {agentStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-[10px] tracking-widest uppercase">
                  <span className="text-gray-500">{item.name}</span>
                  <span className="text-white/60 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-10 border border-white/5 bg-[#0a0e27]">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/40 mb-12 uppercase">Business Unit Performance</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={businessUnitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0e27',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0px',
                    fontSize: '10px',
                  }}
                />
                <Bar dataKey="value" fill="rgba(255,255,255,0.2)" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
