import { useState, useEffect } from 'react';
import { LogOut, Download, Lock } from 'lucide-react';

const WORKER_URL = 'https://brochure-access.inglopezjj.workers.dev/api/dashboard';

interface Lead {
  name: string;
  email?: string;
  phone?: string;
  pdfType?: string;
  ip: string;
  timestamp: string;
  accessed: boolean;
}

export default function Dashboard() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('nx_dash_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) loadLeads();
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${WORKER_URL}/leads?token=${token}`);
      const data = await res.json();
      if (!data.ok) {
        localStorage.removeItem('nx_dash_token');
        setToken(null);
        return;
      }
      setLeads(data.leads);
    } catch {
      setLoginError('Error al cargar los leads.');
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
      const data = await res.json();
      if (!data.ok) {
        setLoginError(data.error || 'Error al ingresar.');
        return;
      }
      localStorage.setItem('nx_dash_token', data.token);
      setToken(data.token);
      loadLeads();
    } catch {
      setLoginError('Error de conexión.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nx_dash_token');
    setToken(null);
    setLeads([]);
    setEmail('');
    setPassword('');
  };

  const exportCSV = () => {
    window.open(`${WORKER_URL}/export?token=${token}`, '_blank');
  };

  // ── Pantalla de login ──
  if (!token) {
    return (
      <div className="min-h-screen bg-[#070c1e] text-white font-sans flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <span className="font-extrabold tracking-wider text-[#00BFFF] text-2xl font-mono">
              NEXERGY<span className="text-white">®</span>
            </span>
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
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070c1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#00BFFF]/50 focus:outline-none"
                  placeholder="nombre@nexergy.ar"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#070c1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-[#00BFFF]/50 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              {loginError && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                  {loginError}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-[#00BFFF] hover:bg-cyan-400 text-[#070c1e] font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#00BFFF]/20"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  const total = leads.length;
  const today = leads.filter((l) => l.timestamp?.startsWith(new Date().toISOString().slice(0, 10))).length;
  const downloaded = leads.filter((l) => l.accessed).length;

  return (
    <div className="min-h-screen bg-[#070c1e] text-white font-sans">
      <header className="sticky top-0 z-50 w-full py-4 px-6 flex justify-between items-center border-b border-white/5 bg-[#050814]/80 backdrop-blur-md">
        <span className="font-extrabold tracking-wider text-[#00BFFF] text-xl font-mono">
          NEXERGY<span className="text-white">®</span>
          <span className="text-gray-500 text-xs ml-2">Dashboard</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </header>

      <main className="py-8 px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-3xl font-extrabold text-[#00BFFF] font-mono">{total}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Total leads</p>
          </div>
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-3xl font-extrabold text-green-400 font-mono">{today}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Hoy</p>
          </div>
          <div className="bg-[#0a0e27] border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-3xl font-extrabold text-purple-400 font-mono">{downloaded}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Descargaron</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white">Leads capturados</h2>
          <button
            onClick={exportCSV}
            className="bg-[#00BFFF]/10 hover:bg-[#00BFFF]/20 text-[#00BFFF] border border-[#00BFFF]/30 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>

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
                  <th className="text-left px-4 py-3">Brochure</th>
                  <th className="text-left px-4 py-3">IP</th>
                  <th className="text-left px-4 py-3">Fecha</th>
                  <th className="text-center px-4 py-3">Descargó</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 text-white font-medium">{l.name || '-'}</td>
                    <td className="px-4 py-3 text-gray-400">{l.email || l.phone || '-'}</td>
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
