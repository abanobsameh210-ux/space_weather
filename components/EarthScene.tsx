import React, { useState, useEffect } from 'react';
import SatelliteIcon from './icons/SatelliteIcon';

const Message: React.FC<{ text: string, visible: boolean }> = ({ text, visible }) => {
    if (!visible) return null;
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl text-center p-6 bg-red-900/80 rounded-xl border-2 border-red-500 shadow-2xl shadow-red-500/50 backdrop-blur-sm animate-fade-in-scale z-20">
            <h2 className="text-3xl font-bold text-white tracking-wider">{text}</h2>
        </div>
    );
};

const EarthScene: React.FC = () => {
    const [earthVisible, setEarthVisible] = useState(false);
    const [warningVisible, setWarningVisible] = useState(false);

    useEffect(() => {
        setEarthVisible(true);
        const warningTimer = setTimeout(() => {
            setWarningVisible(true);
        }, 2000);

        return () => {
            clearTimeout(warningTimer);
        }
    }, []);

    const Satellite: React.FC<{ orbitRadius: number, duration: number, delay: number, size: number }> = ({ orbitRadius, duration, delay, size }) => (
        <div className="absolute top-1/2 left-1/2 w-0 h-0 animate-orbit" style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
            <div className="absolute" style={{ transform: `translateX(${orbitRadius}px)` }}>
                <SatelliteIcon className={`w-${size} h-${size} text-gray-400`} />
            </div>
             <style>{`
                @keyframes orbit {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-orbit {
                    animation-name: orbit;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );

    return (
        <div className="w-full h-full flex items-center justify-center">
            <style>{`
                .animate-fade-in { animation: fadeIn 1s ease-in-out forwards; } @keyframes fadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
                .animate-fade-in-scale { animation: fadeInScale 1s ease-in-out forwards; } @keyframes fadeInScale { from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
                @keyframes movebg {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>
            {earthVisible && (
                <div className="relative w-72 h-72 animate-fade-in">
                    <div className="absolute inset-0 rounded-full shadow-[0_0_50px_10px_rgba(100,180,255,0.3)]"></div>
                    <div 
                        className="w-full h-full rounded-full bg-black bg-cover overflow-hidden" 
                        style={{
                            backgroundImage: 'url(https://unpkg.com/three-globe@2.27.2/example/img/earth-day.jpg)',
                            backgroundSize: '200% auto',
                            animation: 'movebg 60s linear infinite',
                        }}
                    >
                        <div className="w-full h-full rounded-full shadow-[inset_40px_0_80px_30px_rgba(0,0,0,0.9)]"></div>
                    </div>
                    <Satellite orbitRadius={160} duration={15} delay={0} size={6} />
                    <Satellite orbitRadius={180} duration={20} delay={-5} size={5} />
                    <Satellite orbitRadius={170} duration={18} delay={-10} size={4} />
                </div>
            )}
            
            <Message text="Warning: Incoming Solar Storm!" visible={warningVisible} />
        </div>
    );
};

export default EarthScene;