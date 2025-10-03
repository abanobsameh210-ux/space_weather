import React, { useEffect, useState } from 'react';
import { getResourceVisuals } from './resourceUtils';

interface DefendSceneProps {
    deployedResources: string[];
    onComplete: (success: boolean) => void;
}

const Commentary: React.FC<{ messages: string[] }> = ({ messages }) => (
    <div className="absolute top-1/3 right-8 w-64 p-4 bg-black/70 rounded-lg border border-gray-700 backdrop-blur-sm space-y-2 max-h-[50vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-cyan-300 border-b border-cyan-500/50 pb-2 mb-2">Defense Log</h3>
        {messages.map((msg, index) => (
            <p key={index} className="text-sm text-gray-300 animate-fade-in-fast">
                &gt; {msg}
            </p>
        ))}
    </div>
);


const DefendScene: React.FC<DefendSceneProps> = ({ deployedResources, onComplete }) => {
    const [statusText, setStatusText] = useState("Solar storm incoming...");
    const [shieldStrength, setShieldStrength] = useState(0);
    const [commentaryLog, setCommentaryLog] = useState<string[]>([]);

    useEffect(() => {
        const resourceCount = deployedResources.length;
        const success = resourceCount >= 4; // Victory condition updated for better challenge
        
        const strength = Math.min(100, (resourceCount / 6) * 100);
        setShieldStrength(strength);

        const getResourceCommentary = (keyword: string, fallback: string) => {
            const relevantResource = deployedResources.find(r => r.toLowerCase().includes(keyword));
            return relevantResource ? `${relevantResource} are active!` : fallback;
        }

        const sequence = [
            { delay: 2000, text: "Raising planetary shields...", commentary: "Initializing defense grid." },
            { delay: 2000, text: `Shields at ${Math.round(strength)}% capacity.`, commentary: getResourceCommentary('shield', 'Core shields powered up.') },
            { delay: 3000, text: "Brace for impact!", commentary: "Particle density increasing rapidly." },
            { delay: 2500, text: "Impact detected on the outer perimeter!", commentary: getResourceCommentary('satellite', 'Satellite network deflecting initial wave.') },
            { delay: 3000, text: success ? "Shields holding! We're weathering the storm!" : "Shields failing! Critical systems exposed!", commentary: getResourceCommentary('power', 'Power grid stabilizers are critical.') },
            { delay: 3000, text: success ? "Storm subsiding. Planetary integrity maintained." : "Catastrophic failure detected. The planet is vulnerable.", commentary: "Assessing final damage..." },
        ];

        let totalDelay = 0;
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        sequence.forEach(step => {
            totalDelay += step.delay;
            timeouts.push(setTimeout(() => {
                setStatusText(step.text);
                setCommentaryLog(prev => [...prev, step.commentary]);
            }, totalDelay));
        });

        const endTimer = setTimeout(() => {
            onComplete(success);
        }, totalDelay + 2000);
        timeouts.push(endTimer);

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [deployedResources, onComplete]);

    const shieldColor = `rgba(59, 130, 246, ${0.2 + (shieldStrength / 100) * 0.7})`;
    const shieldGlow = `rgba(59, 130, 246, ${0.4 + (shieldStrength / 100) * 0.6})`;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInFast { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in-fast { animation: fadeInFast 0.5s ease-in-out forwards; }
                @keyframes pulse-shield { 
                    0%, 100% { transform: scale(1); opacity: 0.8; } 
                    50% { transform: scale(1.03); opacity: 1; } 
                }
                @keyframes storm-particle-fly {
                    from { transform: translate(-100px, var(--y-start)) scale(0.5); opacity: 0; }
                    to { transform: translate(calc(100vw + 100px), var(--y-end)) scale(1.5); opacity: 1; }
                }
                .storm-particle {
                    position: absolute; left: 0; top: 0;
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: yellow;
                    box-shadow: 0 0 15px 5px orange;
                    animation-name: storm-particle-fly;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                 @keyframes movebg {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>
            
            <div className="absolute top-20 text-center p-4 bg-black/60 rounded-lg animate-fade-in">
                <h2 className="text-3xl font-bold text-yellow-300">{statusText}</h2>
            </div>
            
            <Commentary messages={commentaryLog} />


            {/* Earth and Shield */}
            <div className="relative w-72 h-72">
                 <div 
                    className="absolute inset-[-2rem] rounded-full transition-all duration-1000"
                    style={{ 
                        boxShadow: `0 0 80px 40px ${shieldColor}, inset 0 0 60px 30px ${shieldGlow}`,
                        animation: shieldStrength > 10 ? `pulse-shield 3s ease-in-out infinite` : 'none',
                        opacity: shieldStrength / 100
                    }}
                ></div>
                <div 
                    className="w-full h-full rounded-full bg-black bg-cover overflow-hidden" 
                    style={{ 
                        backgroundImage: 'url(https://unpkg.com/three-globe@2.27.2/example/img/earth-day.jpg)',
                        backgroundSize: '200% auto',
                        animation: 'movebg 60s linear infinite',
                        backgroundPosition: 'center',
                    }}
                >
                     <div className="w-full h-full rounded-full shadow-[inset_40px_0_80px_30px_rgba(0,0,0,0.9)]"></div>
                </div>

                {/* Render Deployed Resource Visuals */}
                {deployedResources.map(resource => {
                    const { visual } = getResourceVisuals(resource);
                    return <React.Fragment key={resource}>{visual}</React.Fragment>;
                })}
            </div>

            {/* Storm Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div 
                        key={i}
                        className="storm-particle"
                        style={{
                            '--y-start': `${Math.random() * 100}vh`,
                            '--y-end': `${Math.random() * 100}vh`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        } as React.CSSProperties}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default DefendScene;