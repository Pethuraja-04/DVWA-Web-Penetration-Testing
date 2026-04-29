import React from 'react';
import Gallery from '../components/Gallery';

// Import actual screenshots from the folder
import burp1 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 10-23-11.png';
import burp2 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 10-25-40.png';
import burp3 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 10-43-43.png';
import burp4 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 10-43-55.png';
import burp5 from '../../../screenshot/burp _suite/Screenshot from 2026-04-27 11-11-36.png';

interface BurpSuiteProps {
  onItemClick: (item: any) => void;
}

const BurpSuite: React.FC<BurpSuiteProps> = ({ onItemClick }) => {
  const burpItems = [
    {
  id: 'burp-1',
  src: burp1,
  title: 'Login Request Interception (POST Request)',
  description: 'Captured a POST request from the DVWA login page using Burp Suite Proxy to analyze user credentials, headers, and session data.',
  explanation: 'This interception shows how client-side data such as username, password, cookies, and CSRF tokens are transmitted to the server. By analyzing or modifying these values, attackers can test for vulnerabilities like SQL Injection, authentication bypass, or session manipulation.',
  tool: 'Burp Suite',
},
    {
  id: 'burp-2',
  src: burp2,
  title: 'Request Manipulation using Repeater',
  description: 'Analyzing and modifying a login POST request in Burp Suite Repeater to observe server responses and test input handling.',
  explanation: 'Burp Repeater allows manual modification of request parameters such as username and password. This helps in testing vulnerabilities like SQL Injection, authentication bypass, and input validation flaws by observing how the server responds to altered inputs.',
  tool: 'Burp Suite',
},
    {
  id: 'burp-3',
  srcs: [burp3, burp4, burp5],
  title: 'Automated Attack using Intruder (Cluster Bomb)',
  description: 'Configured a Cluster Bomb attack in Burp Suite Intruder to test multiple payload combinations against login parameters.',
  explanation: 'Burp Intruder automates the process of sending multiple requests with different payloads. In this setup, a Cluster Bomb attack is used to test combinations of usernames and passwords by iterating through payload positions. This helps identify weak credentials, authentication flaws, and potential brute-force vulnerabilities.',
  tool: 'Burp Suite',
},
    // {
    //   id: 'burp-4',
    //   src: burp4,
    //   title: 'Decoder: Base64 Analysis',
    //   description: 'Decoding session tokens and administrative cookies to understand their structure.',
    //   explanation: 'Often cookies contain encoded JSON or serialized data that can be manipulated if decoded.',
    //   tool: 'Burp Suite',
    // },
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
