import React from 'react';
import Gallery from '../components/Gallery';

// Import actual screenshots from the folder
import nmap1 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 11-39-13.png';
import nmap2 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 11-49-40.png';
import nmap3 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 12-45-10.png';
import nmap4 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 12-54-16.png';

interface NmapProps {
  onItemClick: (item: any) => void;
}

const Nmap: React.FC<NmapProps> = ({ onItemClick }) => {
  const nmapItems = [
    {
      id: 'nmap-1',
      src: nmap1,
      title: 'Host Discovery (ARP Scan)',
      description: 'Identified active hosts on the local subnet using ARP requests to bypass local firewalls.',
      command: 'nmap -sn 192.168.1.0/24',
      tool: 'Nmap',
    },
    {
      id: 'nmap-2',
      src: nmap2,
      title: 'Default Port Scan',
      description: 'Scanning the top 1000 most common ports to identify exposed services on the target.',
      command: 'nmap 192.168.1.10',
      tool: 'Nmap',
    },
    {
      id: 'nmap-3',
      src: nmap3,
      title: 'Stealth SYN Scan',
      description: 'Performing a half-open scan to identify ports without completing the TCP handshake.',
      command: 'nmap -sS -T4 192.168.1.10',
      tool: 'Nmap',
    },
    {
      id: 'nmap-4',
      src: nmap4,
      title: 'OS and Service Detection',
      description: 'Enumerating service versions and attempting to fingerprint the target operating system.',
      command: 'nmap -A -v 192.168.1.10',
      tool: 'Nmap',
    },
  ];

  return (
    <Gallery 
      title="Network Reconnaissance" 
      subtitle="Nmap // Port Auditing" 
      items={nmapItems} 
      onItemClick={onItemClick} 
    />
  );
};

export default Nmap;
