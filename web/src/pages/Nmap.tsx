import React from 'react';
import Gallery from '../components/Gallery';

// Import actual screenshots from the folder
import nmap1 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 11-39-13.png';
import nmap2 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 11-49-40.png';
import nmap3 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 12-54-16.png';
import nmap4 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 12-56-21.png';
import nmap5 from '../../../screenshot/Nmap/Screenshot from 2026-04-25 12-45-10.png';
import nmap6 from '../../../screenshot/Nmap/Screenshot from 2026-04-26 11-11-18.png';
import nmap7 from '../../../screenshot/Nmap/Screenshot from 2026-04-26 11-15-54.png';



interface NmapProps {
  onItemClick: (item: any) => void;
}

const Nmap: React.FC<NmapProps> = ({ onItemClick }) => {
  const nmapItems = [
    {
  id: 'nmap-1',
  src: nmap1,
  title: 'Nmap Network Reconnaissance & Host Discovery',
  description: 'Demonstrates a complete network scanning workflow including ARP-based host discovery, single-host port scanning, range scanning with exclusion, and host availability checks using Nmap.',
  tool: 'Nmap',
  data: [
    {
      title: 'Host Discovery (ARP Scan)',
      description: 'Discovered active devices in the local network by sending ARP requests and mapping IP addresses to MAC addresses. This helps identify reachable hosts before deeper scanning.',
      command: 'sudo arp-scan -l',
    },
    {
      title: 'Single Host Port Scan',
      description: 'Performed a basic Nmap scan on a target host to identify open ports and running services. The scan revealed SSH (22) and HTTP (80) as active services.',
      command: 'nmap 10.231.44.234',
    },
    {
      title: 'Range Scan with Exclusion',
      description: 'Scanned multiple IP addresses within a specified range while excluding a particular host. This allows targeted scanning and avoids unnecessary systems.',
      command: 'nmap 10.231.44.230-235 --exclude 10.231.44.231',
    },
    {
      title: 'Host Availability Check (Ping Scan)',
      description: 'Verified that the target system is online without performing a full port scan. This is a fast method to confirm host availability.',
      command: 'nmap -sn 10.231.44.234',
    },
  ],
},
    {
  id: 'nmap-2',
  src: nmap2,
  title: 'Advanced Port Scanning Techniques',
  description: 'Demonstrates full port scanning, top port analysis, and scan speed optimization using Nmap to identify exposed services and improve scanning efficiency.',
  tool: 'Nmap',
  data: [
    {
      title: 'Full Port Scan (All Ports)',
      description: 'Scanned all 65,535 TCP ports on the target system to identify open services. The scan revealed SSH (22) and HTTP (80) as open ports while the rest were closed.',
      command: 'nmap 10.231.44.234 -p-',
    },
    {
      title: 'Top Ports Scan',
      description: 'Scanned the top 10 most common ports to quickly identify frequently used services. This method reduces scan time while still detecting critical services.',
      command: 'nmap 10.231.44.234 --top-ports 10',
    },
    {
      title: 'Scan Timing Optimization',
      description: 'Used aggressive timing (-T4) to speed up the scanning process. This improves scan performance but may increase detection risk in real-world environments.',
      command: 'nmap 10.231.44.234 -T4',
    },
  ],
},
    {
  id: 'nmap-3',
  srcs: [nmap3, nmap5],
  title: 'Service Enumeration & OS Detection',
  description: 'Demonstrates targeted port scanning, stealth SYN scanning, service version detection, and operating system fingerprinting using Nmap.',
  tool: 'Nmap',
  data: [
    {
      title: 'Specific Port Scan',
      description: 'Scanned a specific port (80) to check if the HTTP service is running on the target system. This helps in focused analysis of a particular service.',
      command: 'nmap -p 80 10.231.44.234',
    },
    {
      title: 'Stealth SYN Scan',
      description: 'Performed a half-open TCP SYN scan to identify open ports without completing the full handshake. This method is faster and less detectable.',
      command: 'sudo nmap -sS 10.231.44.234 -p 80',
    },
    {
      title: 'Service Version Detection',
      description: 'Identified the versions of services running on open ports, such as OpenSSH and Apache HTTP server, which helps in vulnerability assessment.',
      command: 'nmap -sV 10.231.44.234',
    },
    {
      title: 'Operating System Detection',
      description: 'Performed OS fingerprinting to determine the target system’s operating system and kernel version, aiding in deeper security analysis.',
      command: 'sudo nmap -O 10.231.44.234',
    },
  ],
},
    {
  id: 'nmap-4',
  srcs: [nmap4,nmap7,nmap6],
  title: 'Aggressive Scan & Deep Enumeration',
  description: 'Demonstrates advanced Nmap scanning using aggressive mode (-A) for service enumeration, script scanning, OS detection, and targeted UDP scanning.',
  tool: 'Nmap',
  data: [
    {
      title: 'Aggressive Scan (-A)',
      description: 'Performed an advanced scan combining service detection, OS fingerprinting, version detection, and script scanning to gather detailed information about the target system.',
      command: 'sudo nmap -A 10.231.44.234',
    },
    {
      title: 'Service & Version Enumeration',
      description: 'Identified detailed service versions such as OpenSSH and Apache HTTP server, which helps in vulnerability analysis and exploit identification.',
      command: 'nmap -sV 10.231.44.234',
    },
    {
      title: 'HTTP Enumeration (Directory Listing)',
      description: 'Detected web server information including Apache version and exposed directories such as DVWA, indicating a web application running on the target.',
      command: 'nmap --script=http-enum 10.231.44.234',
    },
    {
      title: 'OS Detection',
      description: 'Determined the target operating system as Linux with kernel version details, useful for identifying platform-specific vulnerabilities.',
      command: 'nmap -O 10.231.44.234',
    },
    {
      title: 'UDP Port Scan',
      description: 'Scanned UDP port 53 (DNS) to check if the service is active. The result shows the port is closed, indicating no DNS service running on the target.',
      command: 'sudo nmap -sU 10.231.44.234 -p 53',
    },
  ],
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
