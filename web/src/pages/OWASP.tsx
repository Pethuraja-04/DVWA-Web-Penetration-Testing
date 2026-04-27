import React from 'react';
import Gallery from '../components/Gallery';

// Import actual screenshots from the folder
import owasp1 from '../../../screenshot/OWASP/Screenshot from 2026-04-27 11-18-12.png';
import owasp2 from '../../../screenshot/OWASP/Screenshot from 2026-04-27 11-33-50.png';
import owasp3 from '../../../screenshot/OWASP/Screenshot from 2026-04-27 12-13-26.png';

interface OWASPProps {
  onItemClick: (item: any) => void;
}

const OWASP: React.FC<OWASPProps> = ({ onItemClick }) => {
  const owaspItems = [
    {
      id: 'owasp-1',
      src: owasp1,
      title: 'SQL Injection: Authentication Bypass',
      description: 'Using tautology payloads to bypass login screens and gain unauthorized access.',
      explanation: 'Payload used: \' OR \'1\'=\'1\' -- . This forces the SQL query to return true regardless of the password.',
      tool: 'DVWA / OWASP',
    },
    {
      id: 'owasp-2',
      src: owasp2,
      title: 'Reflected XSS: Cookie Theft',
      description: 'Injecting malicious scripts into the web page to capture user session cookies.',
      explanation: 'Script: <script>alert(document.cookie)</script>. This demonstrates how an attacker can hijack a session.',
      tool: 'DVWA / OWASP',
    },
    {
      id: 'owasp-3',
      src: owasp3,
      title: 'Command Injection: RCE',
      description: 'Exploiting input fields to execute operating system commands on the server.',
      explanation: 'Input: 127.0.0.1; cat /etc/passwd. The server fails to sanitize the semicolon, allowing arbitrary command execution.',
      tool: 'DVWA / OWASP',
    },
    {
      id: 'owasp-4',
      src: undefined, // Using placeholder for File Inclusion if no screenshot found
      title: 'Local File Inclusion (LFI)',
      description: 'Accessing sensitive local files on the server by manipulating file path parameters.',
      explanation: 'Path: ../../../../../etc/passwd. This allows reading any file the web server has access to.',
      tool: 'DVWA / OWASP',
    },
  ];

  return (
    <Gallery 
      title="Vulnerability Assessment" 
      subtitle="OWASP // Top 10 Risks" 
      items={owaspItems} 
      onItemClick={onItemClick} 
    />
  );
};

export default OWASP;
