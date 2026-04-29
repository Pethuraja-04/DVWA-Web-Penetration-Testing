import React from 'react';
import Gallery from '../components/Gallery';

// Import actual screenshots from the folder
import wire1 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 11-52-15.png';
// TCP Handshake
import wireHandshake1 from '../../../screenshot/wireshark/Screenshot from 2026-04-25 12-45-10.png';
import wireHandshake2 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-11-46.png';

// HTTP Login (DVWA)
import wireHttp1 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-07-41.png';
import wireHttp2 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-07-54.png';

// DNS + ICMP + QUIC (same capture reused)
import wireDnsQuic from '../../../screenshot/wireshark/Screenshot from 2026-04-26 11-11-18.png';

// TCP Reset
import wireReset from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-11-56.png';

// TCP Deep Analysis
import wireTcpDeep from '../../../screenshot/wireshark/Screenshot from 2026-04-26 11-59-04.png';

// Conversations
import wireConv1 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-20-12.png';
import wireConv2 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-20-23.png';
import wireConv3 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-20-36.png';

// Endpoints
import wireEndpoint1 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 12-23-35.png';
import wireEndpoint2 from '../../../screenshot/wireshark/Screenshot from 2026-04-26 11-52-15.png';

interface WiresharkProps {
  onItemClick: (item: any) => void;
}

const Wireshark: React.FC<WiresharkProps> = ({ onItemClick }) => {
  const wiresharkItems = [

  {
    id: 'wire-1',
    title: 'TCP Three-Way Handshake',
    tool: 'Wireshark',
    srcs: [wireHandshake1, wireHandshake2],
    description: 'Establishing a reliable TCP connection using SYN, SYN-ACK, and ACK packets.',
    explanation: `
This capture shows the TCP handshake process:
1. SYN → Client initiates connection
2. SYN-ACK → Server acknowledges
3. ACK → Connection established

Useful to detect:
- Connection failures
- Firewall blocking
- Reset attacks
    `
  },

  {
    id: 'wire-2',
    title: 'HTTP Traffic Analysis (DVWA Login)',
    tool: 'Wireshark',
    srcs: [wireHttp1, wireHttp2],
    description: 'Captured HTTP POST request showing login credentials in plaintext.',
    explanation: `
The HTTP request shows:
- POST /DVWA/login.php
- Username & password visible
- No encryption (HTTP)

This demonstrates:
- Why HTTPS is important
- Risk of credential sniffing
    `
  },

  {
    id: 'wire-3',
    title: 'DNS Query & Response Analysis',
    tool: 'Wireshark',
    srcs: [wireDnsQuic],
    description: 'DNS lookup requests and responses including PTR and A records.',
    explanation: `
Captured DNS traffic includes:
- PTR queries (reverse lookup)
- AAAA and A records
- "No such name" responses

Used for:
- Domain resolution tracking
- Detecting DNS anomalies
    `
  },

  {
    id: 'wire-4',
    title: 'ICMP Destination Unreachable',
    tool: 'Wireshark',
    srcs: [wireDnsQuic], // same image reused (correct)
    description: 'ICMP error indicating port unreachable.',
    explanation: `
ICMP Destination Unreachable occurs when:
- Port is closed
- Service is not running

Useful for:
- Network troubleshooting
- Port scanning detection
    `
  },

  {
    id: 'wire-5',
    title: 'TCP Reset (RST) Analysis',
    tool: 'Wireshark',
    srcs: [wireReset],
    description: 'TCP RST packet indicating abrupt connection termination.',
    explanation: `
RST packets are used to:
- Immediately close connection
- Reject unwanted traffic

Can indicate:
- Firewall rejection
- Service crash
- Security filtering
    `
  },

  {
    id: 'wire-6',
    title: 'QUIC Protocol Traffic (HTTP/3)',
    tool: 'Wireshark',
    srcs: [wireDnsQuic], // reused (QUIC present there)
    description: 'Encrypted QUIC traffic used by modern web applications.',
    explanation: `
QUIC protocol features:
- Runs over UDP
- Used in HTTP/3
- Encrypted payload

Seen in:
- Google services
- Modern browsers

Hard to inspect due to encryption
    `
  },

  {
    id: 'wire-7',
    title: 'TLS Encrypted Traffic',
    tool: 'Wireshark',
    srcs: [wireHandshake1], // contains TLS section
    description: 'Encrypted TLS packets securing communication.',
    explanation: `
TLS provides:
- Encryption
- Integrity
- Authentication

Packets show:
- TLSv1.2 handshake
- Encrypted application data

Used in HTTPS
    `
  },

  {
    id: 'wire-8',
    title: 'Network Conversations Analysis',
    tool: 'Wireshark',
    srcs: [wireConv1, wireConv2, wireConv3],
    description: 'Tracking communication between endpoints.',
    explanation: `
Conversation statistics show:
- Source ↔ Destination
- Packet count
- Data transfer size
- Duration

Useful for:
- Traffic profiling
- Identifying heavy connections
    `
  },

  {
    id: 'wire-9',
    title: 'Endpoint Analysis',
    tool: 'Wireshark',
    srcs: [wireEndpoint1, wireEndpoint2],
    description: 'Analysis of network endpoints and traffic distribution.',
    explanation: `
Endpoint stats include:
- IP/MAC addresses
- Packets sent/received
- Bytes transferred

Useful for:
- Detecting active hosts
- Network mapping
    `
  },

  {
    id: 'wire-10',
    title: 'TCP Packet Deep Inspection',
    tool: 'Wireshark',
    srcs: [wireTcpDeep],
    description: 'Detailed inspection of TCP flags and sequence numbers.',
    explanation: `
Shows:
- Sequence numbers
- Acknowledgments
- Window size
- Flags (SYN, ACK)

Useful for:
- Debugging TCP issues
- Understanding flow control
    `
  }

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
