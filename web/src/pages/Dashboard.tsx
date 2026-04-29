import React, { useEffect, useState, } from 'react';

/* ─── Animated Counter Hook ─── */
function useCounter(target: number, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(ease * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return value;
}



/* ─── Animated Progress Bar ─── */
const AnimatedBar: React.FC<{ percent: number; color: string; shadow: string; delay?: number }> = ({
  percent, color, shadow, delay = 0
}) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(percent), delay + 300);
    return () => clearTimeout(t);
  }, [percent, delay]);
  return (
    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
      <div
        className={`${color} h-full rounded-full ${shadow}`}
        style={{ width: `${width}%`, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </div>
  );
};

/* ─── Threat Gauge ─── */
const ThreatGauge: React.FC<{ score: number }> = ({ score }) => {
  const [dash, setDash] = useState(440);
  const circumference = 440;
  useEffect(() => {
    const t = setTimeout(() => {
      setDash(circumference - (score / 100) * circumference);
    }, 600);
    return () => clearTimeout(t);
  }, [score]);
  return (
    <div className="relative w-44 h-44 flex items-center justify-center mx-auto">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-xl animate-pulse" />
      <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]">
        <circle cx="88" cy="88" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="transparent" />
        <circle
          cx="88" cy="88" r="70"
          stroke="url(#gaugeGrad)"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-white tracking-tighter">{score}</span>
        <span className="text-[10px] text-orange-400 uppercase font-bold tracking-widest mt-1">Elevated</span>
      </div>
    </div>
  );
};

/* ─── Stat Card ─── */
const StatCard: React.FC<{
  label: string; rawValue: string; numericValue: number; suffix?: string;
  icon: React.ReactNode; color: string; gradient: string; borderColor: string; delay: number;
}> = ({ label, numericValue, suffix = '', icon, color, gradient, borderColor, delay }) => {
  const count = useCounter(numericValue, 1400, delay);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <div
      className={`relative bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 lg:p-8 flex flex-col justify-between min-h-[160px] overflow-hidden group hover:bg-white/[0.02] transition-all duration-500 ${borderColor}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s`
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-tl ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-4 rounded-xl bg-white/5 border border-white/5 shadow-lg ${color} group-hover:scale-110 transition-transform duration-500`}>
          {icon}
        </div>
        <span className="text-4xl lg:text-5xl font-black text-white tracking-tighter tabular-nums">
          {count}{suffix}
        </span>
      </div>
      <div className="relative z-10">
        <p className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold">{label}</p>
        <div className={`mt-2 h-px w-0 group-hover:w-full bg-gradient-to-r ${gradient} transition-all duration-700`} />
      </div>
    </div>
  );
};

/* ─── Live Terminal Line ─── */
const TerminalLine: React.FC<{ activity: any; idx: number }> = ({ activity, idx }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200 + idx * 150); return () => clearTimeout(t); }, [idx]);
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 lg:p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 group cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.5s ease, transform 0.5s ease`
      }}
    >
      {/* Pulse dot */}
      <div className="shrink-0">
        <span className={`relative flex h-2 w-2`}>
          {idx === 0 && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${activity.color.replace('text-', 'bg-')} opacity-60`} />}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${activity.color.replace('text-', 'bg-')}`} />
        </span>
      </div>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <span className={`text-[10px] font-mono uppercase font-black px-3 py-1.5 rounded shrink-0 ${activity.bg} ${activity.color} ${activity.border} border`}>
          {activity.status}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-slate-200 font-bold text-sm truncate group-hover:text-white transition-colors">{activity.action}</p>
          <p className="text-slate-500 text-xs mt-0.5 truncate">Target: <span className="text-slate-400 font-mono">{activity.target}</span></p>
        </div>
      </div>
      <div className="text-right shrink-0 pl-4 sm:pl-0">
        <p className="text-slate-500 text-xs font-mono tracking-widest">{activity.time}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════ MAIN COMPONENT ═══════════════════════════════════════════ */
const Dashboard: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    setHeaderVisible(true);
    // Scan-line animation for the threat card
    const interval = setInterval(() => setScanLine(p => (p + 1) % 100), 30);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: 'Hosts Discovered',
      rawValue: '2',
      numericValue: 2,
      // Monitor / computer screen — represents a discovered host machine
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      color: 'text-[#00ff41]',
      gradient: 'from-[#00ff41]/20 to-transparent',
      borderColor: 'hover:border-[#00ff41]/40',
    },
    {
      label: 'Open Ports',
      rawValue: '2',
      numericValue: 2,
      // Network plug / ethernet — represents open network ports
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22V12" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
          <rect x="8" y="2" width="8" height="10" rx="2" />
          <line x1="10" y1="6" x2="10" y2="2" />
          <line x1="14" y1="6" x2="14" y2="2" />
        </svg>
      ),
      color: 'text-[#00e5ff]',
      gradient: 'from-[#00e5ff]/20 to-transparent',
      borderColor: 'hover:border-[#00e5ff]/40',
    },
    {
      label: 'Vulnerabilities',
      rawValue: '4',
      numericValue: 4,
      // Shield with exclamation — security vulnerability warning
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      color: 'text-red-400',
      gradient: 'from-red-500/20 to-transparent',
      borderColor: 'hover:border-red-500/40',
    },
    {
      label: 'Services',
      rawValue: '2',
      numericValue: 2,
      // Server rack — represents running network services
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
      color: 'text-yellow-400',
      gradient: 'from-yellow-400/20 to-transparent',
      borderColor: 'hover:border-yellow-400/40',
    },
  ];

  const activities = [
    { time: '12:44:02', action: 'Nmap Scan completed', target: '192.168.1.10', status: 'Success', color: 'text-[#00ff41]', border: 'border-[#00ff41]/30', bg: 'bg-[#00ff41]/10' },
    { time: '12:40:15', action: 'Injection Attempt', target: 'DVWA Login', status: 'Critical', color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10' },
    { time: '11:52:30', action: 'PCAP Export', target: 'tcp_dump_01', status: 'Saved', color: 'text-blue-400', border: 'border-blue-400/30', bg: 'bg-blue-400/10' },
    { time: '09:12:05', action: 'Session Initialized', target: 'Burp Proxy', status: 'System', color: 'text-slate-400', border: 'border-white/10', bg: 'bg-white/5' },
  ];

  const severities = [
    { label: 'Critical', count: 6, percent: 15, color: 'bg-red-500', shadow: 'shadow-[0_0_10px_rgba(239,68,68,0.6)]' },
    { label: 'High', count: 10, percent: 25, color: 'bg-orange-500', shadow: '' },
    { label: 'Medium', count: 17, percent: 42, color: 'bg-yellow-400', shadow: '' },
    { label: 'Low', count: 9, percent: 22, color: 'bg-blue-500', shadow: '' },
  ];

  return (
<div className="space-y-10 w-full ">
      {/* ── HEADER ── */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease'
        }}
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00ff41]/20 bg-[#00ff41]/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]" />
            </span>
            <span className="text-[#00ff41] font-mono text-xs tracking-[0.2em] uppercase font-bold">System Online // Secure</span>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase mb-3">
              Platform{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-[#00e5ff] animate-pulse">
                Overview
              </span>
            </h1>
            <p className="text-slate-400 max-w-2xl text-base lg:text-lg leading-relaxed">
              Real-time monitoring of penetration testing telemetry, active scanners, and infrastructure vulnerabilities.
            </p>
          </div>
        </div>

        {/* Live clock badge */}
        <LiveClock />
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} delay={idx * 120} />
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Activity Feed */}
        <div
          className="xl:col-span-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl flex flex-col overflow-hidden"
          style={{ animation: 'slideUp 0.6s ease 0.5s both' }}
        >
          <div className="p-6 md:p-7 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]" />
              </span>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Live Activity Feed</h2>
            </div>
            <button className="text-xs font-mono font-bold text-slate-400 hover:text-[#00ff41] uppercase tracking-widest transition-colors flex items-center gap-2 group">
              View Logs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex-1 p-5 md:p-6 space-y-3">
            {activities.map((activity, idx) => (
              <TerminalLine key={idx} activity={activity} idx={idx} />
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-5">

          {/* Severity Distribution */}
          <div
            className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-7"
            style={{ animation: 'slideUp 0.6s ease 0.65s both' }}
          >
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center justify-between">
              Severity Distribution
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </h2>
            <div className="space-y-5">
              {severities.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                    <span className="text-sm font-black text-white">{item.count}</span>
                  </div>
                  <AnimatedBar percent={item.percent} color={item.color} shadow={item.shadow} delay={idx * 150} />
                </div>
              ))}
            </div>
          </div>

          {/* Threat Gauge */}
          <div
            className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-7 relative overflow-hidden group"
            style={{ animation: 'slideUp 0.6s ease 0.8s both' }}
          >
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full group-hover:bg-orange-500/20 transition-colors duration-700" />
            {/* Scan line effect */}
            <div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent pointer-events-none"
              style={{ top: `${scanLine}%`, transition: 'top 30ms linear' }}
            />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 relative z-10">System Threat Level</h2>
            <ThreatGauge score={72} />
            <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center relative z-10">
              <p className="text-xs text-orange-200/80 leading-relaxed font-medium">
                Immediate attention required for{' '}
                <strong className="text-orange-400 font-bold">6 Critical</strong>{' '}
                vulnerabilities in the current infrastructure.
              </p>
            </div>
          </div>

        </div>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Target Info */}
          <div className="bg-black/40 backdrop-blur-xl border border-[#00ff41]/10 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
              Attack Surface
            </h2>

            <div className="space-y-3 text-sm font-mono">
              <p className="text-slate-400">
                Target IP: <span className="text-[#00ff41]">10.231.44.234</span>
              </p>

              <p className="text-slate-400">
                Open Ports:
                <span className="ml-2 text-white">22 (SSH), 80 (HTTP)</span>
              </p>

              <p className="text-slate-400">
                Services:
                <span className="ml-2 text-white">OpenSSH 9.6p1, Apache 2.4.58</span>
              </p>

              <p className="text-slate-400">
                OS:
                <span className="ml-2 text-white">Linux 5.x</span>
              </p>
            </div>
          </div>

          {/* Vulnerability Overview */}
          <div className="bg-black/40 backdrop-blur-xl border border-red-500/10 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
              Vulnerability Overview
            </h2>

            <div className="space-y-3 text-sm font-mono">

              <div className="flex justify-between">
                <span className="text-red-400">SQL Injection</span>
                <span className="text-red-400 font-bold">Critical</span>
              </div>

              <div className="flex justify-between">
                <span className="text-orange-400">XSS</span>
                <span className="text-orange-400 font-bold">High</span>
              </div>

              <div className="flex justify-between">
                <span className="text-red-400">Command Injection</span>
                <span className="text-red-400 font-bold">Critical</span>
              </div>

              <div className="flex justify-between">
                <span className="text-orange-400">File Inclusion</span>
                <span className="text-orange-400 font-bold">High</span>
              </div>

            </div>
          </div>

        </div>


      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

/* ─── Live Clock ─── */
const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="shrink-0 flex flex-col items-end gap-1">
      <div className="font-mono text-2xl font-black text-white tracking-widest tabular-nums">
        {pad(time.getHours())}:{pad(time.getMinutes())}:
        <span className="text-[#00ff41]">{pad(time.getSeconds())}</span>
      </div>
      <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">
        {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </p>
    </div>
  );
};

export default Dashboard;