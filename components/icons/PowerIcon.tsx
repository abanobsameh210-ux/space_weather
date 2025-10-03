import React from 'react';

const PowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        <path d="M12 2L3 11h9l-1 10 9-9h-9L12 2z"/>
    </svg>
  );
};

export default PowerIcon;