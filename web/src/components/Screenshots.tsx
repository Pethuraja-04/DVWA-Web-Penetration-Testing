import { useState } from 'react'

interface Screenshot {
  id: string
  src?: string          // real image path
  alt: string
  caption: string
  category: 'SQLi' | 'XSS' | 'Brute Force' | 'Recon' | 'Other'
  tool?: string
}

const screenshots: Screenshot[] = [
  {
    id: 'ss1',
    alt: 'SQL Injection Login Bypass',
    caption: 'SQLi: Authentication bypass using payload \' OR \'1\'=\'1',
    category: 'SQLi',
    tool: 'Browser / DVWA',
    // src: '/src/assets/screenshots/sqli-login-bypass.png',
  },
  {
    id: 'ss2',
    alt: 'SQL Injection Data Extraction',
    caption: 'SQLi: UNION-based extraction of user credentials from database',
    category: 'SQLi',
    tool: 'Burp Suite',
    // src: '/src/assets/screenshots/sqli-union.png',
  },
  {
    id: 'ss3',
    alt: 'Reflected XSS Alert',
    caption: 'XSS: JavaScript alert popup triggered via reflected XSS',
    category: 'XSS',
    tool: 'Browser / DVWA',
  },
  {
    id: 'ss4',
    alt: 'Stored XSS Cookie Theft',
    caption: 'XSS: Stored XSS payload leaking session cookie to attacker',
    category: 'XSS',
    tool: 'Browser Console',
  },
  {
    id: 'ss5',
    alt: 'Hydra Brute Force Result',
    caption: 'Brute Force: Hydra recovering admin password from DVWA',
    category: 'Brute Force',
    tool: 'Hydra',
  },
  {
    id: 'ss6',
    alt: 'Burp Suite Intercept',
    caption: 'Burp Suite: HTTP request intercepted and modified mid-flight',
    category: 'Recon',
    tool: 'Burp Suite',
  },
  {
    id: 'ss7',
    alt: 'Nmap Port Scan',
    caption: 'Nmap: Full port scan revealing open services on DVWA host',
    category: 'Recon',
    tool: 'Nmap',
  },
  {
    id: 'ss8',
    alt: 'Wireshark HTTP Capture',
    caption: 'Wireshark: Capturing plaintext HTTP credentials in transit',
    category: 'Recon',
    tool: 'Wireshark',
  },
]

const categoryColor: Record<string, string> = {
  SQLi:         'text-red-400 border-red-500/30 bg-red-500/10',
  XSS:          'text-orange-400 border-orange-500/30 bg-orange-500/10',
  'Brute Force':'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  Recon:        'text-[#00e5ff] border-[#00e5ff]/30 bg-[#00e5ff]/10',
  Other:        'text-slate-400 border-slate-600/30 bg-slate-600/10',
}

const allCategories = ['All', 'SQLi', 'XSS', 'Brute Force', 'Recon'] as const

const PlaceholderImage: React.FC<{ alt: string; tool?: string }> = ({ alt, tool }) => (
  <div className="w-full h-56 bg-[#030405] flex flex-col items-center justify-center gap-4 relative overflow-hidden group/img">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#00ff41_1px,transparent_1px),linear-gradient(90deg,#00ff41_1px,transparent_1px)] bg-[size:20px_20px]" />
    
    {/* Animated scanning bar */}
    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/40 to-transparent animate-scanline opacity-0 group-hover/img:opacity-100" />

    <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover/img:scale-110 transition-transform duration-500">
      📸
    </div>
    
    <div className="relative z-10 text-center px-6">
      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{alt}</p>
      {tool && <p className="font-mono text-[9px] text-[#00ff41]/40 font-bold uppercase">Source: {tool}</p>}
    </div>

    {/* Corner Decorations */}
    <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20" />
    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/20" />
    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/20" />
    <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20" />
  </div>
)

const Screenshots: React.FC = () => {
  const [filter, setFilter] = useState<string>('All')
  const [lightbox, setLightbox] = useState<Screenshot | null>(null)

  const filtered = filter === 'All'
    ? screenshots
    : screenshots.filter((s) => s.category === filter)

  return (
    <section id="screenshots" className="py-32 relative bg-black/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#bc13fe]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#bc13fe]/20 bg-[#bc13fe]/5">
              <span className="font-mono text-[10px] text-[#bc13fe] font-bold uppercase tracking-widest">Archive // Evidence</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Visual <span className="text-[#bc13fe]">Intelligence</span>
            </h2>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 p-2 rounded-2xl glass border border-white/5 bg-white/5">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  filter === cat
                    ? 'bg-[#bc13fe] text-white shadow-[0_0_20px_rgba(188,19,254,0.3)]'
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
                <span className="ml-2 opacity-40">
                  {cat === 'All' ? screenshots.length : screenshots.filter((s) => s.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((ss) => (
            <div
              key={ss.id}
              className="group rounded-2xl glass-card overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
              onClick={() => setLightbox(ss)}
            >
              <div className="relative aspect-video sm:aspect-square lg:aspect-video overflow-hidden">
                {ss.src ? (
                  <img
                    src={ss.src}
                    alt={ss.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <PlaceholderImage alt={ss.alt} tool={ss.tool} />
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white">
                    <span className="font-mono text-xl">+</span>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-md border font-mono text-[9px] font-bold uppercase tracking-widest ${categoryColor[ss.category]}`}>
                    {ss.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">Instance_{ss.id}</span>
                  {ss.tool && (
                    <span className="text-[10px] font-mono text-white/40 font-bold uppercase">{ss.tool}</span>
                  )}
                </div>
                <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-2">
                  {ss.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Footer */}
        <div className="mt-20 border-t border-white/5 pt-12">
          <div className="grid sm:grid-cols-3 gap-12">
            {[
              { label: 'Data Integrity', value: 'SHA-256 Verified', icon: '🛡️' },
              { label: 'Encryption', value: 'AES-256 Bit', icon: '🔐' },
              { label: 'Access Control', value: 'Restricted', icon: '🚫' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-white/10 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 font-black uppercase tracking-widest">{item.label}</div>
                  <div className="text-sm text-white font-bold">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 sm:p-12 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button 
            className="absolute top-8 right-8 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-[110]"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>

          <div
            className="max-w-6xl w-full rounded-2xl glass-card border border-white/10 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {lightbox.src ? (
                <img src={lightbox.src} alt={lightbox.alt} className="w-full h-full object-contain" />
              ) : (
                <PlaceholderImage alt={lightbox.alt} tool={lightbox.tool} />
              )}
            </div>
            
            <div className="p-8 sm:p-12 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-lg border font-mono text-[10px] font-bold uppercase tracking-widest ${categoryColor[lightbox.category]}`}>
                    {lightbox.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                    Captured By: <span className="text-white/60">{lightbox.tool || 'System'}</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{lightbox.alt}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{lightbox.caption}</p>
              </div>
              
              <div className="shrink-0 flex flex-col gap-4">
                <button className="px-8 py-3 rounded-xl bg-white text-black font-bold text-sm tracking-tighter hover:bg-white/90 transition-colors">
                  Download Frame
                </button>
                <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest text-center">
                  Ref_ID_{lightbox.id}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Screenshots
