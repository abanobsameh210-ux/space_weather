import React from 'react';

const RealisticSatelliteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M12.5 8.5L10 12h4l-2.5 3.5" stroke="cyan" />
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor" />
        <path d="M18.36 5.64l-1.41-1.41" />
        <path d="M12 2v2" />
        <path d="M5.64 5.64L4.22 4.22" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M18.36 18.36l-1.41-1.41" />
        <path d="M12 20v2" />
        <path d="M5.64 18.36l-1.42-1.42" />
        <path d="M22 7l-2.5 2.5" />
        <path d="M2 17l2.5-2.5" />
    </svg>
  );
};

export default RealisticSatelliteIcon;