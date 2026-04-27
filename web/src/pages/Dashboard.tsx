import React from 'react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Scans', value: '124', icon: '📡' },
    { label: 'Vulnerabilities', value: '42', icon: '⚠️', color: 'text-red-500' },
    { label: 'Resolved', value: '38', icon: '✅', color: 'text-green-500' },
    { label: 'Uptime', value: '99.9%', icon: '⏱️' },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* HEADER */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
          <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
          <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Overview // Status
          </span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Security <span className="text-[#00ff41]">Dashboard</span>
        </h1>

        <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
          Central hub for monitoring penetration testing progress, discovered assets,
          and vulnerability assessment metrics across the target infrastructure.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass-card p-6 rounded-lg border border-white/5 space-y-3 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>

            <p className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-[0.2em]">
              {stat.label}
            </p>

            <p className={`text-3xl font-bold ${stat.color || 'text-white'}`}>
              {stat.value}
            </p>

            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#00ff41]/40 rounded-full w-2/3 group-hover:w-full transition-all duration-1000" />
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-2 glass-card p-6 rounded-lg border border-white/5 space-y-5">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>

          <div className="space-y-3">
            {[
              { time: '2 mins ago', action: 'Nmap Scan completed on 192.168.1.10', status: 'Success' },
              { time: '15 mins ago', action: 'SQL injection detected on login.php', status: 'Critical' },
              { time: '1 hour ago', action: 'Wireshark capture saved (tcp_dump_01)', status: 'Saved' },
              { time: '3 hours ago', action: 'Burp proxy initialized', status: 'System' },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-md border border-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-xs border border-white/10 font-mono text-[#00ff41]">
                    {activity.status[0]}
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-sm text-slate-200">{activity.action}</p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">
                      {activity.time}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono px-2 py-1 rounded border font-bold uppercase ${activity.status === 'Critical'
                      ? 'border-red-500 text-red-500 bg-red-500/10'
                      : 'border-slate-500 text-slate-500'
                    }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SYSTEM HEALTH */}
        <div className="glass-card p-6 rounded-lg border border-white/5 space-y-5">
          <h3 className="text-lg font-semibold text-white">System Health</h3>

          <div className="space-y-6">
            {['CPU Usage', 'Memory', 'Network Load'].map((item, i) => {
              const value = 30 + i * 15;
              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 font-bold uppercase">
                    <span>{item}</span>
                    <span>{value}%</span>
                  </div>

                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${i === 2 ? 'bg-orange-500' : 'bg-[#00ff41]'
                        }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-black/40 rounded-lg p-3 border border-white/5">
            <p className="text-xs text-slate-500 font-mono text-center">
              System Version: v2.4.12-Stable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;