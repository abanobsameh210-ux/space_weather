import React from 'react';

const NetworkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        <circle cx="12" cy="5" r="3"></circle>
        <circle cx="19" cy="12" r="3"></circle>
        <circle cx="5" cy="12" r="3"></circle>
        <circle cx="12" cy="19" r="3"></circle>
        <path d="M12 8v8"></path>
        <path d="M16.5 10.5l-9 3"></path>
        <path d="M7.5 10.5l9 3"></path>
    </svg>
  );
};

export default NetworkIcon;
