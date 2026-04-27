import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
      )
    },
    {
      id: 'nmap',
      label: 'Nmap',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
      )
    },
    {
      id: 'burp',
      label: 'Burp Suite',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg>
      )
    },
    {
      id: 'wireshark',
      label: 'Wireshark',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
      )
    },
    {
      id: 'owasp',
      label: 'OWASP Top 10',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
      )
    },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-24' : 'w-80'} h-screen bg-[#050607] border-r border-white/5 sticky top-0 z-50 flex flex-col transition-all duration-500 ease-in-out shrink-0`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-black border border-white/10 rounded flex items-center justify-center text-white hover:text-[#00ff41] hover:border-[#00ff41]/50 transition-all z-50 cursor-pointer shadow-xl"
      >
        <span className={`text-[8px] transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </span>
      </button>

      <div className={`h-24 border-b border-white/5 flex items-center ${isCollapsed ? 'justify-center' : 'px-8 gap-4'}`}>
        <div className="w-10 h-10 rounded bg-[#00ff41] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,65,0.2)] shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
        </div>
        {!isCollapsed && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-500">
            <h1 className="text-sm font-black text-white tracking-[0.2em] uppercase leading-none">DVWA</h1>
            <h2 className="text-[10px] font-mono text-[#00ff41] font-bold uppercase tracking-widest mt-1">Pentest Lab</h2>
          </div>
        )}
      </div>

      <nav className="flex-1 py-10 pl-8 pr-4 space-y-2 overflow-y-auto scrollbar-hide pl-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center transition-all duration-300 group relative rounded ${isCollapsed ? 'justify-center  h-12 -ml-2' : 'gap-4 px-4 h-12'
              } ${activeTab === item.id
                ? 'bg-[#00ff41]/10 text-[#00ff41] shadow-[inset_0_0_10px_rgba(0,255,65,0.05)]'
                : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              }`}
          >
            <div className={`shrink-0 transition-transform  duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <span className="font-bold text-[11px] uppercase tracking-widest truncate animate-in fade-in slide-in-from-left-2 duration-300">
                {item.label}
              </span>
            )}
            {activeTab === item.id && (
              <div className="absolute left-0 w-1 h-1/2 bg-[#00ff41] rounded shadow-[0_0_10px_#00ff41]" />
            )}
          </button>
        ))}
      </nav>

      <div className={`p-6 pl-8 border-t border-white/5 bg-black/40 ${isCollapsed ? 'flex justify-center pl-0' : ''}`}>
        <div className={`flex items-center gap-4 p-3 rounded border border-white/5 bg-white/[0.02] ${isCollapsed ? 'w-12 h-12 p-0 justify-center' : ''}`}>
          <div className="w-8 h-8 rounded shrink-0 bg-gradient-to-br from-[#00ff41] to-[#00e5ff] p-[1px] shadow-lg">
            <div className="w-full h-full rounded bg-black flex items-center justify-center text-[10px]">🕵️</div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-white truncate">Pethuraja C</p>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Sec. Analyst</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
