import React, { useEffect } from 'react';
import { GameLevel } from '../types';

interface TravelSceneProps {
    level: GameLevel;
    onComplete: () => void;
}

const TravelScene: React.FC<TravelSceneProps> = ({ level, onComplete }) => {

    useEffect(() => {
        const timer = setTimeout(onComplete, 9000);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const FlareParticle: React.FC<{delay: number}> = ({delay}) => (
        <div className="absolute top-1/2 left-0 w-16 h-1 bg-yellow-300 rounded-full shadow-[0_0_10px_2px_#fef08a] animate-travel-flare" style={{animationDelay: `${delay}s`}}></div>
    )

    const CmeCloud: React.FC<{delay: number}> = ({delay}) => (
        <div className="absolute top-1/2 left-0 w-48 h-32 rounded-full bg-red-500/50 blur-xl shadow-[0_0_30px_10px_#ef4444] animate-travel-cme" style={{animationDelay: `${delay}s`}}>
            <div className="w-full h-full rounded-full bg-red-700/50 scale-75 animate-pulse-cme"></div>
        </div>
    )

    const renderPhenomenon = () => {
        switch (level) {
            case 1: // Flare
                return [...Array(30)].map((_, i) => <FlareParticle key={i} delay={i * 0.1} />);
            case 2: // CME
                return <CmeCloud delay={0}/>;
            case 3: // Both
                return <>
                    {[...Array(20)].map((_, i) => <FlareParticle key={`f-${i}`} delay={i * 0.05} />)}
                    <CmeCloud delay={1}/>
                </>
        }
    }

    return (
        <div className="w-full h-full overflow-hidden relative">
            <style>{`
                 @keyframes travel-flare {
                    0% { transform: translateX(-10vw) scaleX(0.5); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateX(110vw) scaleX(2); opacity: 0; }
                }
                .animate-travel-flare { animation: travel-flare 4s ease-in forwards; }

                @keyframes travel-cme {
                    0% { transform: translateX(-20vw) scale(0.5); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateX(120vw) scale(1.2); opacity: 0; }
                }
                .animate-travel-cme { animation: travel-cme 8s linear forwards; }
                
                @keyframes pulse-cme { 0%, 100% { transform: scale(0.75); opacity: 0.8; } 50% { transform: scale(0.8); opacity: 1; } }
                .animate-pulse-cme { animation: pulse-cme 2s infinite ease-in-out; }
            `}</style>
             <div className="absolute top-1/2 left-[-200px] -translate-y-1/2 w-[400px] h-[400px]">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 animate-pulse shadow-[0_0_100px_40px_rgba(251,146,60,0.7)]"></div>
            </div>

            <div className="absolute inset-0">
                {renderPhenomenon()}
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-8 bg-black/50 rounded-lg animate-fade-in-out">
                <h2 className="text-4xl font-bold text-yellow-300">It's heading towards Earth...</h2>
            </div>
             <style>{`.animate-fade-in-out { animation: fadeInOut 9s ease-in-out; } @keyframes fadeInOut { 0% { opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; } }`}</style>
        </div>
    );
};

export default TravelScene;