import { useEffect } from 'react'

const Home: React.FC = () => {

  // Typewriter effect for the terminal lines
  useEffect(() => {
    const lines = [
      { id: 'line1', text: '$ nmap -sV 192.168.1.100', delay: 400 },
      { id: 'line2', text: '> Target: DVWA (Damn Vulnerable Web App)', delay: 1200 },
      { id: 'line3', text: '> Vulnerabilities found: SQL Injection, XSS, CSRF...', delay: 2200 },
      { id: 'line4', text: '> Status: Penetration test in progress...', delay: 3200 },
    ]

    const timers: ReturnType<typeof setTimeout>[] = []

    lines.forEach(({ id, delay }) => {
      const t = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.style.opacity = '1'
      }, delay)
      timers.push(t)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#030405]" />
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #00ff41 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Animated Scanline */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-[#00ff41]/10 to-transparent animate-scanline opacity-20" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-[#00ff41]/20 bg-[#00ff41]/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]"></span>
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#00ff41] font-bold tracking-[0.3em] uppercase">Security Research Active</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
              <span className="text-white">Web</span>
              <br />
              <span className="text-gradient-green text-glow-green">Pentesting</span>
              <br />
              <span className="text-white/40">Portfolio.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Deep dive into ethical exploitation using <span className="text-white underline decoration-[#00ff41] decoration-2 underline-offset-4">DVWA</span>. 
              A comprehensive showcase of modern cybersecurity vulnerabilities and mitigation strategies.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <a
                href="#attacks"
                className="px-8 py-4 rounded-xl bg-[#00ff41] text-black font-bold tracking-tighter hover:scale-105 hover:bg-[#00e5ff] transition-all duration-300 shadow-[0_0_30px_rgba(0,255,65,0.3)] flex items-center gap-3"
              >
                Launch Analysis
                <span className="text-xl font-mono">→</span>
              </a>
              <a
                href="#tools"
                className="px-8 py-4 rounded-xl glass border border-white/10 text-white font-bold tracking-tighter hover:bg-white/5 transition-all duration-300"
              >
                Core Stack
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-12 pt-8">
              {[
                { label: 'Modules', value: '03' },
                { label: 'Tools', value: '03' },
                { label: 'Protocol', value: 'TCP' },
              ].map((item) => (
                <div key={item.label} className="group">
                  <div className="text-3xl font-mono font-bold text-white group-hover:text-[#00ff41] transition-colors">{item.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Terminal */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none animate-float">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl relative group">
              {/* Terminal Frame */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  terminal — pethuraja@kali
                </div>
                <div className="w-12" /> {/* alignment spacer */}
              </div>

              {/* Terminal Content */}
              <div className="p-8 font-mono text-sm leading-relaxed min-h-[320px] bg-black/40">
                <div className="space-y-4">
                  {[
                    { id: 'line1', prompt: 'visitor@dvwa:~$', color: 'text-white/60', text: 'nmap -sV 192.168.1.100' },
                    { id: 'line2', prompt: '[INFO]', color: 'text-cyan-400', text: 'Target: DVWA (Damn Vulnerable Web App)' },
                    { id: 'line3', prompt: '[WARN]', color: 'text-yellow-400', text: 'Vulnerabilities: SQLi, XSS, CSRF found' },
                    { id: 'line4', prompt: '[OK]', color: 'text-[#00ff41]', text: 'Session hijacking vectors identified' },
                  ].map((line) => (
                    <div
                      key={line.id}
                      id={line.id}
                      className={`flex gap-4 transition-all duration-700 ${line.color}`}
                      style={{ opacity: 0, transform: 'translateX(-10px)' }}
                    >
                      <span className="font-bold opacity-40 shrink-0">{line.prompt}</span>
                      <span className="text-white/90">{line.text}</span>
                    </div>
                  ))}
                  
                  <div className="flex gap-4 text-[#00ff41]">
                    <span className="font-bold opacity-40 shrink-0">visitor@dvwa:~$</span>
                    <span className="animate-blink">█</span>
                  </div>
                </div>

                {/* Floating Tags Overlay */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                  <div className="px-3 py-1 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/20 text-[10px] text-[#00ff41] font-bold uppercase tracking-widest">
                    Live Session
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual Flair */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-[#00ff41]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-[#00e5ff]/10 rounded-full blur-[100px] pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Home
