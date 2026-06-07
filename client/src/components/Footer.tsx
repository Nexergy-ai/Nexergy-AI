import { Activity, Shield, Zap } from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'DASHBOARD', href: '#dashboard' },
    { label: 'ORCHESTRATOR', href: '#orchestrator' },
    { label: 'ANALYTICS', href: '#analytics' },
  ],
  company: [
    { label: 'ABOUT', href: '#about' },
    { label: 'BLOG', href: '#blog' },
    { label: 'CAREERS', href: '#careers' },
  ],
  resources: [
    { label: 'DOCS', href: '#docs' },
    { label: 'API', href: '#api' },
    { label: 'SUPPORT', href: '#support' },
  ],
};

const statusIndicators = [
  { label: 'System Status', status: 'OPERATIONAL', icon: <Activity className="w-4 h-4" /> },
  { label: 'Security', status: 'SECURE', icon: <Shield className="w-4 h-4" /> },
  { label: 'Performance', status: 'OPTIMAL', icon: <Zap className="w-4 h-4" /> },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0e27] border-t border-white/5 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 bg-white flex items-center justify-center">
                <div className="w-3 h-3 bg-[#0a0e27]" />
              </div>
              <span className="text-lg font-bold tracking-tighter text-white">NEXERGY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The next generation of industrial operational intelligence. Powered by advanced AI orchestration.
            </p>
            <a 
              href="mailto:contacto@nexergy.ar" 
              className="text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-colors"
            >
              CONTACTO@NEXERGY.AR
            </a>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-white mb-8 uppercase">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold tracking-widest">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-white mb-8 uppercase">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold tracking-widest">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-white mb-8 uppercase">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-white transition-colors text-[10px] font-bold tracking-widest">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-24 p-10 border border-white/5 bg-white/[0.01]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {statusIndicators.map((indicator, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="text-white/20">{indicator.icon}</div>
                <div>
                  <p className="text-[10px] tracking-widest text-gray-600 uppercase mb-1">{indicator.label}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span className="text-[10px] font-bold tracking-widest text-white/80">{indicator.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] tracking-widest text-gray-600 uppercase">
            © 2026 NEXERGY AI. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] tracking-widest text-gray-600 hover:text-white uppercase transition-colors">Privacy</a>
            <a href="#" className="text-[10px] tracking-widest text-gray-600 hover:text-white uppercase transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
