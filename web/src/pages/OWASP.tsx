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
    title: 'SQL Injection: Authentication Bypass',
    tool: 'DVWA',
    srcs: [owasp1],
    description: 'Bypassing login authentication using SQL injection by manipulating input fields.',
    explanation: `
Payload used:
1' OR '1'=1

This payload modifies the SQL query logic:

SELECT * FROM users WHERE username = '' OR '1'='1';

Since '1'='1' is always true, authentication is bypassed without valid credentials.

Impact:
- Unauthorized access
- Data exposure
- Full account compromise
    `
  },

  {
    id: 'owasp-2',
    title: 'Reflected XSS: Script Injection in Input Field',
    tool: 'DVWA',
    srcs: [owasp3, owasp2],
    description: 'Injecting JavaScript into input fields to execute in the browser context.',
    explanation: `
Payload used:
<script>document.body.innerHTML="Hacked"</script>

The input is reflected back into the page without proper sanitization,
allowing execution of malicious JavaScript.

Impact:
- Session hijacking
- Credential theft
- UI defacement
    `
  },

//   {
//     id: 'owasp-3',
//     title: 'Command Injection',
//     tool: 'DVWA',
//     srcs: [], // add when you capture screenshot
//     description: 'Executing system commands via unsanitized input fields.',
//     explanation: `
// Example input:
// 127.0.0.1; whoami

// The application executes:
// ping 127.0.0.1; whoami

// Impact:
// - Remote command execution
// - Server compromise
//     `
//   },

//   {
//     id: 'owasp-4',
//     title: 'Local File Inclusion (LFI)',
//     tool: 'DVWA',
//     srcs: [], // add when you capture screenshot
//     description: 'Accessing sensitive server files by manipulating file path parameters.',
//     explanation: `
// Example payload:
// ../../../../etc/passwd

// This allows attackers to read sensitive files from the server.

// Impact:
// - Information disclosure
// - Credential leakage
//     `
//   }

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
