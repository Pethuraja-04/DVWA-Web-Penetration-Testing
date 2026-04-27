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
    <div className="min-h-screen bg-[#030405] text-slate-200 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main className="flex-1 p-12 sm:p-16 lg:p-24 lg:pl-48 min-h-screen relative overflow-x-hidden transition-all duration-500 ease-in-out">
        {/* Background Grid Decoration */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
          <div className="absolute inset-0 bg-[linear-gradient(#00ff41_1px,transparent_1px),linear-gradient(90deg,#00ff41_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#030405] opacity-50" />
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {renderContent()}
        </div>

        {/* Footer info fixed to bottom right of content */}
        <footer className="mt-20 border-t border-white/5 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 font-mono text-[10px]">
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
