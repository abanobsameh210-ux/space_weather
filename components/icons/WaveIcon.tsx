import React from 'react';

const WaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        <path d="M3 12h2.5c1.5 0 2.5-1.5 2.5-2.5S7 7 5.5 7h-3"/>
        <path d="M21 12h-2.5c-1.5 0-2.5 1.5-2.5 2.5s1 2.5 2.5 2.5h3"/>
        <path d="M9 17c1.5 0 2.5-1.5 2.5-2.5S10.5 12 9 12h-3"/>
    </svg>
  );
};

export default WaveIcon;