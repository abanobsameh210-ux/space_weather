
import React from 'react';

const SatelliteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm4 0h-2v-2h2v2zm-4-4H9V8h2v4zm4-1h-2V8h2v3zM4.07 11h-1.02C3.01 9.94 3.16 8.84 3.5 7.8l.92 1.6c-.22.82-.35 1.68-.35 2.6zm15.91 0c0-.92-.13-1.78-.35-2.6l.92-1.6c.34 1.04.49 2.14.45 3.2h-1.02zM12 5.5c-1.3 0-2.42.39-3.41 1.05l-1.05-1.82C8.7 3.96 10.26 3.5 12 3.5s3.3.46 4.46 1.23l-1.05 1.82C14.42 5.89 13.3 5.5 12 5.5zm0 13c-1.74 0-3.3-.46-4.46-1.23l1.05-1.82C9.58 16.11 10.7 16.5 12 16.5s2.42-.39 3.41-1.05l1.05 1.82C15.3 18.04 13.74 18.5 12 18.5z"/>
      <path d="M11.5 8.5h-1v3h1v-3zm3 0h-1v3h1v-3z" />
      <path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  );
};

export default SatelliteIcon;
