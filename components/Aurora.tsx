import React from 'react';

const Aurora: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-900">
       <style>{`
        .aurora {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .aurora-band {
          position: absolute;
          width: 200%;
          height: 200%;
          mix-blend-mode: screen;
          filter: blur(50px) brightness(1.7);
          opacity: 0;
        }

        .aurora-band.one {
          background: radial-gradient(ellipse at center, rgba(40, 255, 150, 0.8) 0%, rgba(40, 255, 150, 0) 60%);
          animation: drift 20s linear infinite, fade 10s ease-in-out infinite alternate;
          transform-origin: 50% 100%;
        }

        .aurora-band.two {
          background: radial-gradient(ellipse at center, rgba(100, 150, 255, 0.8) 0%, rgba(100, 150, 255, 0) 60%);
          animation: drift 25s linear infinite reverse, fade 12s ease-in-out infinite alternate;
          transform-origin: 30% 80%;
        }
        
        .aurora-band.three {
          background: radial-gradient(ellipse at center, rgba(220, 100, 255, 0.7) 0%, rgba(220, 100, 255, 0) 60%);
          animation: drift 30s linear infinite, fade 15s ease-in-out infinite alternate;
          transform-origin: 80% 70%;
        }

        .aurora-band.four {
          background: radial-gradient(ellipse at center, rgba(255, 100, 100, 0.6) 0%, rgba(255, 100, 100, 0) 60%);
          animation: drift 35s linear infinite reverse, fade 18s ease-in-out infinite alternate;
          transform-origin: 60% 90%;
        }

        .aurora-band.five {
          background: radial-gradient(ellipse at center, rgba(0, 255, 255, 0.7) 0%, rgba(0, 255, 255, 0) 60%);
          animation: drift 18s linear infinite, fade 9s ease-in-out infinite alternate;
          transform-origin: 40% 60%;
        }

        .aurora-band.six {
            background: radial-gradient(ellipse at center, rgba(255, 0, 255, 0.6) 0%, rgba(255, 0, 255, 0) 60%);
            animation: drift 28s linear infinite reverse, fade 14s ease-in-out infinite alternate;
            transform-origin: 70% 50%;
        }

        .aurora-band.seven {
            background: radial-gradient(ellipse at center, rgba(100, 255, 200, 0.8) 0%, rgba(100, 255, 200, 0) 60%);
            animation: drift 22s linear infinite, fade 11s ease-in-out infinite alternate;
            transform-origin: 20% 90%;
        }

        .aurora-band.eight {
            background: radial-gradient(ellipse at center, rgba(255, 200, 100, 0.7) 0%, rgba(255, 200, 100, 0) 60%);
            animation: drift-2 32s linear infinite, fade 16s ease-in-out infinite alternate;
            transform-origin: 90% 60%;
        }


        @keyframes drift {
          0% { transform: rotate(0deg) scale(1.5); }
          100% { transform: rotate(360deg) scale(1.5); }
        }

        @keyframes drift-2 {
          0% { transform: rotate(0deg) scale(1.8); }
          100% { transform: rotate(-360deg) scale(1.8); }
        }
        
        @keyframes fade {
          0% { opacity: 0.7; }
          50% { opacity: 1.0; }
          100% { opacity: 0.7; }
        }
        
        .sky-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        }
      `}</style>
      <div className="sky-bg"></div>
      <div className="absolute w-full h-1/2 top-0 left-0 bg-repeat-x" style={{backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
      <div className="aurora">
        <div className="aurora-band one"></div>
        <div className="aurora-band two"></div>
        <div className="aurora-band three"></div>
        <div className="aurora-band four"></div>
        <div className="aurora-band five"></div>
        <div className="aurora-band six"></div>
        <div className="aurora-band seven"></div>
        <div className="aurora-band eight"></div>
      </div>
       <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default Aurora;