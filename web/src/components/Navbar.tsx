import { useState, useEffect } from 'react'

const links = [
  { label: 'Home',        href: '#home' },
  { label: 'Attacks',     href: '#attacks' },
  { label: 'Tools',       href: '#tools' },
  { label: 'Screenshots', href: '#screenshots' },
]

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [active,   setActive]       = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setActive(href)
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass py-3 border-b border-white/5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group" onClick={() => handleNav('#home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff41] to-[#00e5ff] p-[1px] group-hover:rotate-12 transition-transform duration-300">
              <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                <span className="text-[#00ff41] text-xl font-mono font-bold">&gt;</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-lg tracking-tighter text-white">
                DVWA<span className="text-[#00ff41]">LAB</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold -mt-1">Security Shell</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={`relative px-6 py-2 rounded-full font-mono text-xs font-semibold tracking-widest transition-all duration-300 ${
                  active === link.href
                    ? 'text-white bg-[#00ff41]/20 shadow-[inset_0_0_12px_rgba(0,255,65,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute -bottom-1 left-1.2 right-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00ff41] shadow-[0_0_8px_#00ff41]" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Status dot */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse shadow-[0_0_8px_#00ff41]" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">System: Stable</span>
            </div>

            {/* Hamburger */}
            <button
              id="menu-toggle"
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 hover:border-[#00ff41]/50 transition-colors duration-200 bg-white/5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-[#00ff41] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#00ff41] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#00ff41] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-96 border-b border-white/5 opacity-100' : 'max-h-0 opacity-0'
        } glass p-4 m-2 rounded-2xl`}
      >
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNav(link.href)}
              className={`block px-4 py-3 font-mono text-sm font-medium rounded-xl transition-all duration-200 ${
                active === link.href
                  ? 'text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-[#00ff41]/50 mr-2">&gt;</span> {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
