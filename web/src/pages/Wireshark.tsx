import React from 'react';
import Gallery from '../components/Gallery';

// Import actual screenshots from the folder
import wire1 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 11-52-15.png';
import wire2 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 11-59-04.png';
import wire3 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-07-41.png';
import wire4 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-20-36.png';

interface WiresharkProps {
  onItemClick: (item: any) => void;
}

const Wireshark: React.FC<WiresharkProps> = ({ onItemClick }) => {
  const wiresharkItems = [
    {
      id: 'wire-1',
      src: wire1,
      title: 'TCP Three-Way Handshake',
      description: 'Analysis of SYN, SYN-ACK, and ACK packets establishing a reliable connection.',
      explanation: 'Visualizing the handshake helps in identifying issues like connection resets or filtering by firewalls.',
      tool: 'Wireshark',
    },
    {
      id: 'wire-2',
      src: wire2,
      title: 'HTTP Cleartext Capture',
      description: 'Capturing unencrypted HTTP traffic to extract session cookies and login credentials.',
      explanation: 'Plaintext protocols are highly susceptible to sniffing. This capture demonstrates the danger of NOT using TLS.',
      tool: 'Wireshark',
    },
    {
      id: 'wire-3',
      src: wire3,
      title: 'DNS Query Analysis',
      description: 'Monitoring DNS requests to identify target domains and potential data exfiltration via DNS.',
      explanation: 'DNS traffic can be used as a covert channel for C2 communication or metadata leakage.',
      tool: 'Wireshark',
    },
    {
      id: 'wire-4',
      src: wire4,
      title: 'TLS Handshake Inspection',
      description: 'Observing the negotiation of encrypted sessions and certificate exchange.',
      explanation: 'Even if traffic is encrypted, the initial handshake reveals server names (SNI) and certificate details.',
      tool: 'Wireshark',
    },
  ];

  return (
    <Gallery 
      title="Packet Level Inspection" 
      subtitle="Wireshark // Protocol Analysis" 
      items={wiresharkItems} 
      onItemClick={onItemClick} 
    />
  );
};

export default Wireshark;
