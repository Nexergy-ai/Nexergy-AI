import { useState, useEffect } from 'react';
import { LogOut, Download, Lock, Eye, MousePointerClick, Users, FileText, TrendingUp, AlertCircle, Star, BookOpen } from 'lucide-react';

const WORKER_URL = 'https://brochure-access.inglopezjj.workers.dev/api/dashboard';

interface Lead {
  name: string;
  email?: string;
  phone?: string;
  pdfType?: string;
  org?: string | null;
  ip: string;
  timestamp: string;
  accessed: boolean;
}

interface AnalyticsDay {
  date: string;
  pageViews: number;
  requests: number;
  uniques: number;
}

export default function Dashboard() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('nx_dash_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsDay[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) loadData(token);
  }, []);

  const loadData = async (authToken: string) => {
    setLoading(true);
    try {
      const [leadsRes, analyticsRes] = await Promise.all([
        fetch(`${WORKER_URL}/leads?token=${authToken}`),
        fetch(`${WORKER_URL}/analytics?token=${authToken}`),
      ]);
      const leadsData = await leadsRes.json();
      const analyticsData = await analyticsRes.json();
      if (!leadsData.ok) {
        localStorage.removeItem('nx_dash_token');
        setToken(null);
        return;
      }
      setLeads(leadsData.leads || []);
      if (analyticsData.ok) setAnalytics(analyticsData.analytics?.last7days || []);
    } catch {
      setLoginError('Error al cargar datos.');
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!email.trim() || !password) {
      setLoginError('Completá todos los campos.');
      return;
    }
    try {
      const res = await fetch(`${WORKER_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error('Error de conexión.'); }
      if (!data.ok) {
        setLoginError(data.error || 'Error al ingresar.');
        return;
      }
      localStorage.setItem('nx_dash_token', data.token);
      setToken(data.token);
      loadData(data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Error de conexión.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nx_dash_token');
    setToken(null);
    setLeads([]);
    setAnalytics([]);
    setEmail('');
    setPassword('');
  };

  const exportCSV = () => {
    window.open(`${WORKER_URL}/export?token=${token}`, '_blank');
  };

  const downloadBrochureCompleto = () => {
    window.open(`${WORKER_URL}/brochure-completo?token=${token}`, '_blank');
  };

  // ── Login ──
  if (!token) {
    return (
      <div className="min-h-screen bg-[#070c1e] text-white font-sans flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <a href="/" className="font-extrabold tracking-wider text-[#00BFFF] text-2xl font-mono hover:text-cyan-300 transition-colors">
              NEXERGY<span className="text-white">®</span>
            </a>
            <h1 className="text-lg font-bold text-white mt-4">Dashboard de Leads</h1>
            <p className="text-gray-500 text-xs mt-1">Acceso restringido · @nexergy.ar</p>
          </div>
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-[#00BFFF]" />
              <h2 className="text-base font-bold text-white">Ingresar</h2>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070c1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#00BFFF]/50 focus:outline-none"
                  placeholder="nombre@nexergy.ar" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#070c1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#00BFFF]/50 focus:outline-none"
                  placeholder="••••••••" />
              </div>
              {loginError && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">{loginError}</p>
              )}
              <button type="submit"
                className="w-full bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#00BFFF]/20">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  const totalLeads = leads.length;
  const todayLeads = leads.filter((l) => l.timestamp?.startsWith(new Date().toISOString().slice(0, 10))).length;
  const downloaded = leads.filter((l) => l.accessed).length;
  const priorityLeads = leads.filter((l) => l.org);
  const totalPageViews = analytics.reduce((sum, d) => sum + d.pageViews, 0);
  const totalUniques = analytics.reduce((sum, d) => sum + d.uniques, 0);
  const maxPageViews = Math.max(...analytics.map((d) => d.pageViews), 1);

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans">
      <header className="sticky top-0 z-50 w-full py-4 px-6 flex justify-between items-center border-b border-white/5 bg-[#050814]/80 backdrop-blur-md">
        <a href="/" className="font-extrabold tracking-wider text-[#00BFFF] text-xl font-mono hover:text-cyan-300 transition-colors">
          NEXERGY<span className="text-white">®</span>
          <span className="text-gray-500 text-xs ml-2">Dashboard</span>
        </a>
        <button onClick={handleLogout}
          className="text-gray-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5">
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </header>

      <main className="py-8 px-6 max-w-5xl mx-auto w-full">
        {/* Alerta de leads prioritarios */}
        {priorityLeads.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-amber-300">
                {priorityLeads.length} lead{priorityLeads.length > 1 ? 's' : ''} prioritario{priorityLeads.length > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-amber-500/70 mt-0.5">
                {priorityLeads.map((l) => l.org).filter((v, i, a) => a.indexOf(v) === i).join(' · ')}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-[#00BFFF]" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Visitantes 7d</span>
            </div>
            <p className="text-2xl font-extrabold text-[#00BFFF] font-mono">{totalUniques.toLocaleString('es-AR')}</p>
          </div>
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <MousePointerClick className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Page views 7d</span>
            </div>
            <p className="text-2xl font-extrabold text-green-400 font-mono">{totalPageViews.toLocaleString('es-AR')}</p>
          </div>
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Leads</span>
            </div>
            <p className="text-2xl font-extrabold text-purple-400 font-mono">{totalLeads}</p>
          </div>
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Descargas</span>
            </div>
            <p className="text-2xl font-extrabold text-cyan-400 font-mono">{downloaded}</p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-amber-500/70 uppercase tracking-wider">Prioritarios</span>
            </div>
            <p className="text-2xl font-extrabold text-amber-400 font-mono">{priorityLeads.length}</p>
          </div>
        </div>

        {/* Gráfico de tráfico */}
        {analytics.length > 0 && (
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#00BFFF]" />
              <h3 className="text-sm font-bold text-white">Tráfico de los últimos 7 días</h3>
            </div>
            <div className="flex items-end justify-between gap-2 h-32">
              {analytics.map((d) => (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-[#00BFFF]/30 hover:bg-[#00BFFF]/50 rounded-t transition-colors"
                    style={{ height: `${(d.pageViews / maxPageViews) * 100}%`, minHeight: '4px' }}
                    title={`${d.pageViews} page views`} />
                  <span className="text-[10px] text-gray-600 font-mono">{d.date.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón Brochure Completo + Exportar */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
          <h2 className="text-lg font-bold text-white">Leads capturados</h2>
          <div className="flex gap-3">
            <button onClick={downloadBrochureCompleto}
              className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              title="Descargar Brochure Híbrido Completo">
              <BookOpen className="w-4 h-4" />
              Brochure Completo
            </button>
            <button onClick={exportCSV}
              className="bg-[#00BFFF]/10 hover:bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Tabla de leads */}
        <div className="bg-[#0a0e27] border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-12">Cargando...</p>
          ) : leads.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No hay leads todavía.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                  <th className="text-left px-4 py-3">Nombre</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Organización</th>
                  <th className="text-left px-4 py-3">Brochure</th>
                  <th className="text-left px-4 py-3">IP</th>
                  <th className="text-left px-4 py-3">Fecha</th>
                  <th className="text-center px-4 py-3">Descargó</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i} className={`border-b border-white/5 hover:bg-white/5 ${l.org ? 'bg-amber-500/5' : ''}`}>
                    <td className="px-4 py-3 text-white font-medium">{l.name || '-'}</td>
                    <td className="px-4 py-3 text-gray-400">{l.email || l.phone || '-'}</td>
                    <td className="px-4 py-3">
                      {l.org ? (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full text-xs font-bold">
                          <Star className="w-3 h-3" />
                          {l.org}
                        </span>
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {l.pdfType === 'intermedio' ? 'Intermedio' : l.pdfType === 'completo' ? 'Completo' : '-'}
                    </td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{l.ip || '-'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {l.timestamp ? new Date(l.timestamp).toLocaleString('es-AR') : '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {l.accessed ? <span className="text-green-400">✓</span> : <span className="text-gray-700">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
