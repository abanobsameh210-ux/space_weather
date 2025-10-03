import React from 'react';

const AtomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        <circle cx="12" cy="12" r="1"/>
        <path d="M20.2 20.2c2.04-2.03.02-5.91-4.3-8.2-4.31-2.28-8.22-.26-10.24 1.76-2.03 2.03-.02 5.91 4.3 8.2 4.31 2.28 8.22.26 10.24-1.76z"/>
        <path d="M3.8 20.2c-2.04-2.03-.02-5.91 4.3-8.2 4.31-2.28 8.22-.26 10.24 1.76 2.03 2.03.02 5.91-4.3 8.2-4.31 2.28-8.22-.26-10.24-1.76z"/>
    </svg>
  );
};

export default AtomIcon;
