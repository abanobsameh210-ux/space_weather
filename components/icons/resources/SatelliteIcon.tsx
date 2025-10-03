import React from 'react';

const SatelliteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
        <path d="M5 12l-2 2 2 2"/>
        <path d="M19 12l2 2-2 2"/>
        <path d="M12 5l2-2 2 2"/>
        <path d="M12 19l2 2 2-2"/>
        <circle cx="12" cy="12" r="6"/>
        <path d="M17.6 6.4L22 2"/>
        <path d="M6.4 17.6L2 22"/>
    </svg>
  );
};

export default SatelliteIcon;