import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, AlertCircle, Zap, Brain } from 'lucide-react';

interface KPIData {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
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

const COLORS = ['#00BFFF', '#00FF7F', '#C800FF', '#00FFFF'];

export default function OperationalDashboard() {
  const [kpis, setKpis] = useState<KPIData[]>([
    {
      title: 'System Uptime',
      value: '99.97%',
      change: 2.5,
      icon: <TrendingUp className="w-6 h-6" />,
      color: '#00BFFF',
    },
    {
      title: 'Active Agents',
      value: '247',
      change: 2.5,
      icon: <Brain className="w-6 h-6" />,
      color: '#00FF7F',
    },
    {
      title: 'Anomalies Detected',
      value: '12',
      change: -1.2,
      icon: <AlertCircle className="w-6 h-6" />,
      color: '#C800FF',
    },
    {
      title: 'AI Recommendations',
      value: '1847',
      change: 2.5,
      icon: <Zap className="w-6 h-6" />,
      color: '#00FFFF',
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
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Operational</span>
            <span className="text-neon-blue"> Dashboard</span>
          </h2>
          <p className="text-gray-400 text-lg">Mock but realistic. Real-time metrics, anomalies, and AI recommendations</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {kpis.map((kpi, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div
                className="p-6 rounded-lg border-2 bg-[rgba(20,30,60,0.5)] backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                style={{
                  borderColor: kpi.color,
                  boxShadow: `0 0 15px ${kpi.color}33`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div style={{ color: kpi.color }} className="opacity-80">
                    {kpi.icon}
                  </div>
                  <div
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{
                      color: kpi.change >= 0 ? '#00FF7F' : '#FF6B6B',
                      backgroundColor: kpi.change >= 0 ? 'rgba(0,255,127,0.1)' : 'rgba(255,107,107,0.1)',
                    }}
                  >
                    {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                  </div>
                </div>
                <h3 className="text-gray-400 text-sm font-medium mb-2">{kpi.title}</h3>
                <p className="text-2xl font-bold text-white">{kpi.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-6 rounded-lg border border-[#00BFFF] bg-[rgba(20,30,60,0.5)] backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold text-neon-blue mb-4">24h Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,191,255,0.2)" />
                <XAxis dataKey="time" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10,14,39,0.8)',
                    border: '1px solid #00BFFF',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#00BFFF' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00BFFF"
                  strokeWidth={2}
                  dot={{ fill: '#00BFFF', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-6 rounded-lg border border-neon-green bg-[rgba(20,30,60,0.5)] backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold text-neon-green mb-4">Active Agents Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={agentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {agentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(10,14,39,0.8)',
                    border: '1px solid #00FF7F',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              {agentStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400">{item.name}</span>
                  <span style={{ color: COLORS[index % COLORS.length] }} className="font-semibold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="p-6 rounded-lg border border-neon-purple bg-[rgba(20,30,60,0.5)] backdrop-blur-sm"
        >
          <h3 className="text-lg font-bold text-neon-purple mb-4">Business Unit Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={businessUnitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,0,255,0.2)" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10,14,39,0.8)',
                  border: '1px solid #C800FF',
                }}
              />
              <Bar dataKey="value" fill="#C800FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00BFFF] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C800FF] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
    </section>
  );
}
