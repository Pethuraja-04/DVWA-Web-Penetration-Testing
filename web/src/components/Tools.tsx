interface ToolCardProps {
  icon: string
  name: string
  version?: string
  category: string
  description: string
  purpose: string
  features: string[]
  color: string
  glowColor: string
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon, name, version, category, description, purpose, features, color, glowColor,
}) => (
  <div
    className="group relative rounded-2xl glass border border-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
  >
    {/* Visual Accent */}
    <div 
      className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full transition-opacity group-hover:opacity-20"
      style={{ backgroundColor: color }}
    />

    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 border border-white/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
          style={{ backgroundColor: `${glowColor}10`, boxShadow: `inset 0 0 20px ${glowColor}20` }}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-glow transition-colors" style={{ color: name === 'Burp Suite' ? '#ff6b35' : name === 'Wireshark' ? '#00e5ff' : '#00ff41' } as any}>
              {name}
            </h3>
            {version && (
              <span className="text-[10px] font-mono font-bold text-white/30 px-2 py-0.5 rounded-md border border-white/5 uppercase tracking-widest">
                {version}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-[0.2em]">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <p className="text-sm text-slate-400 leading-relaxed font-medium">
          {description}
        </p>

        {/* Purpose */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
          <div className="flex items-start gap-3">
            <span className="text-white/20 font-bold font-mono">#</span>
            <p className="text-xs font-semibold leading-relaxed" style={{ color }}>
              <span className="text-slate-500 font-bold uppercase tracking-widest mr-2">Target Action:</span>
              {purpose}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-bold">Key Capabilities</span>
          <div className="grid grid-cols-1 gap-2">
            {features.slice(0, 4).map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-xs text-slate-400 font-medium group/feat">
                <span className="w-1 h-1 rounded-full bg-white/20 group-hover/feat:bg-white/60 transition-colors" />
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

/* ─── Section ─────────────────────────────────────────────────── */
const tools: ToolCardProps[] = [
  {
    icon: '🎯',
    name: 'Burp Suite',
    version: '2025.1',
    category: 'Proxy Architecture',
    description:
      'The definitive web security toolkit. Enabling granular control over HTTP/S traffic through interactive interception and automated fuzzing capabilities.',
    purpose: 'Granular HTTP manipulation and logic testing',
    features: [
      'Bidirectional request interception',
      'Advanced payload fuzzing (Intruder)',
      'Stateful request replay (Repeater)',
      'Automated vulnerability mapping',
    ],
    color: '#ff6b35',
    glowColor: '#ff6b35',
  },
  {
    icon: '🛸',
    name: 'Wireshark',
    version: '4.2.0',
    category: 'Packet Intelligence',
    description:
      'Deep-dive network protocol analysis. Capturing the digital pulse of the network to reveal hidden data flows and insecure authentication patterns.',
    purpose: 'Protocol-level forensics and traffic analysis',
    features: [
      'L7 protocol decomposition',
      'Plaintext credential harvesting',
      'TCP stream reconstruction',
      'Advanced Berkeley Packet Filters',
    ],
    color: '#00e5ff',
    glowColor: '#00e5ff',
  },
  {
    icon: '📡',
    name: 'Nmap',
    version: '7.94',
    category: 'Reconnaissance',
    description:
      'The gold standard for network discovery. Mapping the attack surface through sophisticated host discovery and service fingerprinting.',
    purpose: 'Attack surface mapping and enumeration',
    features: [
      'OS & Service fingerprinting',
      'NSE script-based auditing',
      'Stealth SYN scanning',
      'Topology visualization mapping',
    ],
    color: '#00ff41',
    glowColor: '#00ff41',
  },
]

const Tools: React.FC = () => (
  <section id="tools" className="py-32 relative bg-black/20">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
            <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toolkit // v4.2</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Advanced <span className="text-gradient-green">Instruments</span>
          </h2>
        </div>
        <p className="flex-1 text-slate-500 text-sm font-medium leading-relaxed max-w-lg lg:text-right">
          A curated selection of industry-standard security tools leveraged for 
          vulnerability discovery, exploitation, and post-exploitation forensics.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>

      {/* Methodology Section */}
      <div className="mt-20">
        <div className="glass rounded-3xl p-10 overflow-hidden relative group">
          {/* Subtle Background Text */}
          <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-white/[0.02] select-none pointer-events-none uppercase">
            Process
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
              <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-[#00ff41]/20 flex items-center justify-center text-[#00ff41] text-sm font-mono">$</span>
                Pentest Workflow
              </h3>
              <div className="h-px flex-1 bg-white/5 hidden sm:block mx-8" />
              <div className="flex gap-2">
                {['STABLE', '0x42', 'READY'].map(tag => (
                  <span key={tag} className="px-2 py-1 rounded bg-white/5 border border-white/5 font-mono text-[9px] text-slate-600 font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Reconnaissance', desc: 'OSINT & Port Scanning', tool: 'Nmap', icon: '🔍' },
                { step: '02', title: 'Analysis', desc: 'Logic & Fuzzing', tool: 'Burp Suite', icon: '📡' },
                { step: '03', title: 'Extraction', desc: 'Bypassing Filters', tool: 'Burp Suite', icon: '💥' },
                { step: '04', title: 'Evidence', desc: 'Packet Forensics', tool: 'Wireshark', icon: '📋' },
              ].map((phase) => (
                <div key={phase.step} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00ff41]/20 transition-all group/item">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl">{phase.icon}</span>
                    <span className="font-mono text-[10px] text-white/20 font-bold uppercase tracking-widest">{phase.step}</span>
                  </div>
                  <h4 className="text-white font-bold mb-1 group-hover/item:text-[#00ff41] transition-colors">{phase.title}</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-3 leading-none">{phase.desc}</p>
                  <div className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-1 rounded inline-block">
                    {phase.tool}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Tools
