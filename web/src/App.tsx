import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Modal from './components/Modal'
import Dashboard from './pages/Dashboard'
import Nmap from './pages/Nmap'
import BurpSuite from './pages/BurpSuite'
import Wireshark from './pages/Wireshark'
import OWASP from './pages/OWASP'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'nmap':
        return <Nmap onItemClick={handleItemClick} />
      case 'burp':
        return <BurpSuite onItemClick={handleItemClick} />
      case 'wireshark':
        return <Wireshark onItemClick={handleItemClick} />
      case 'owasp':
        return <OWASP onItemClick={handleItemClick} />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-[#030405] text-slate-200 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden h-16 bg-[#050607] border-b border-white/5 px-6 flex items-center justify-between sticky top-0 z-[60]">
        <h1 className="text-sm font-black text-white tracking-widest uppercase">DVWA <span className="text-[#00ff41]">LABS</span></h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white hover:text-[#00ff41] transition-colors"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </button>
      </header>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileMenuOpen}
      />

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 py-4 md:py-8 px-4 md:px-6 lg:py-10 lg:px-12 min-h-screen relative transition-all duration-500 ease-in-out">
        {/* Background Grid Decoration */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
          <div className="absolute inset-0 bg-[linear-gradient(#00ff41_1px,transparent_1px),linear-gradient(90deg,#00ff41_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#030405] opacity-50" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 w-full">
          {renderContent()}
        </div>

        {/* Footer info fixed to bottom right of content */}
        <footer className="mt-20 px-10  border-t border-white/5 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" />
            <span>SYSTEM ONLINE // DVWA LABS</span>
          </div>
          <p>© {new Date().getFullYear()} CYBERSECURITY PORTFOLIO</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">SECURITY ENFORCED</span>
            <span className="hover:text-white cursor-pointer transition-colors">DATA ENCRYPTED</span>
          </div>
        </footer>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedItem}
      />
    </div>
  )
}

export default App
