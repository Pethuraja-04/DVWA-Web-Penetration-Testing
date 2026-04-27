import React from 'react';
import Gallery from '../components/Gallery';

// Import actual screenshots from the folder
import burp1 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 10-22-07.png';
import burp2 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 10-23-11.png';
import burp3 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 10-25-40.png';
import burp4 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 10-33-21.png';

interface BurpSuiteProps {
  onItemClick: (item: any) => void;
}

const BurpSuite: React.FC<BurpSuiteProps> = ({ onItemClick }) => {
  const burpItems = [
    {
      id: 'burp-1',
      src: burp1,
      title: 'Intercept Request',
      description: 'Capturing a POST request to analyze parameters and headers before they reach the server.',
      explanation: 'Intercepting allows us to modify client-side data like hidden fields or cookies that are normally not accessible.',
      tool: 'Burp Suite',
    },
    {
      id: 'burp-2',
      src: burp2,
      title: 'Repeater: Request Manipulation',
      description: 'Manually modifying and re-sending individual HTTP requests to test server responses.',
      explanation: 'Repeater is essential for testing vulnerabilities like IDOR or SQL injection by tweaking parameters one by one.',
      tool: 'Burp Suite',
    },
    {
      id: 'burp-3',
      src: burp3,
      title: 'Intruder: Brute Force Attack',
      description: 'Automating customized attacks against web applications to discover valid credentials.',
      explanation: 'Using a dictionary of common surnames and passwords to identify weak authentication points.',
      tool: 'Burp Suite',
    },
    {
      id: 'burp-4',
      src: burp4,
      title: 'Decoder: Base64 Analysis',
      description: 'Decoding session tokens and administrative cookies to understand their structure.',
      explanation: 'Often cookies contain encoded JSON or serialized data that can be manipulated if decoded.',
      tool: 'Burp Suite',
    },
  ];

  return (
    <Gallery 
      title="Web Proxy Analysis" 
      subtitle="Burp Suite // Interception" 
      items={burpItems} 
      onItemClick={onItemClick} 
    />
  );
};

export default BurpSuite;
