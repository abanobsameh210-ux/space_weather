import React, { useState, useEffect, useMemo } from 'react';
import { GameLevel, StoryCharacter } from '../types';
import { LEVEL_1_STORY, LEVEL_2_STORY, LEVEL_3_STORY } from '../constants';

interface StorySceneProps {
    level: GameLevel;
    onComplete: () => void;
}

const Character: React.FC<{ character: StoryCharacter }> = ({ character }) => {
    const renderCharacter = () => {
        switch (character) {
            case 'Flavo':
                return <div className="w-32 h-32 bg-yellow-400 rounded-full shadow-[0_0_30px_10px_#facc15] animate-pulse-flare"><div className="w-full h-full bg-orange-500 rounded-full scale-75 blur-sm"></div></div>;
            case 'Riho':
                return <div className="w-48 h-48 bg-red-600 rounded-full shadow-[0_0_40px_15px_#ef4444] animate-pulse-cme opacity-80"><div className="w-full h-full bg-red-800 rounded-full scale-90 blur-md animate-spin-slow"></div></div>;
            default: return null;
        }
    }
    
    return (
        <div className="relative transition-all duration-500 transform scale-100 opacity-100">
            {renderCharacter()}
        </div>
    );
};

const StoryScene: React.FC<StorySceneProps> = ({ level, onComplete }) => {
    const storyData = useMemo(() => ({ 1: LEVEL_1_STORY, 2: LEVEL_2_STORY, 3: LEVEL_3_STORY }[level]), [level]);
    const [lineIndex, setLineIndex] = useState(0);
    const [activeEffect, setActiveEffect] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setLineIndex(prev => {
                if (prev < storyData.length - 1) {
                    return prev + 1;
                }
                clearInterval(timer);
                setTimeout(onComplete, 2000); // Wait after the last line
                return prev;
            });
        }, 4000); // Time per line

        return () => clearInterval(timer);
    }, [storyData, onComplete]);
    
    const currentLine = storyData[lineIndex];

    useEffect(() => {
        if (currentLine.effect) {
            setActiveEffect(currentLine.effect);
            const effectTimer = setTimeout(() => setActiveEffect(null), 1500); // Duration of the effect animation
            return () => clearTimeout(effectTimer);
        }
    }, [lineIndex, currentLine]);

    const mainCharacters = useMemo(() => {
        if (level === 1) return <Character character="Flavo" />;
        if (level === 2) return <Character character="Riho" />;
        if (level === 3) return (
            <div className="flex items-center justify-center gap-8">
                <Character character="Flavo" />
                <Character character="Riho" />
            </div>
        );
        return null;
    }, [level]);
    
    return (
        <div className="w-full h-full relative overflow-hidden flex flex-col justify-end items-center">
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes pulse-flare { 0%, 100% { transform: scale(1); box-shadow: 0 0 30px 10px #facc15; } 50% { transform: scale(1.05); box-shadow: 0 0 40px 15px #fde047; } }
                @keyframes pulse-cme { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.02); opacity: 0.9; } }
                .animate-pulse-flare { animation: pulse-flare 3s infinite ease-in-out; }
                .animate-pulse-cme { animation: pulse-cme 5s infinite ease-in-out; }
                .animate-spin-slow { animation: spin 20s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg) scale(0.9); } to { transform: rotate(360deg) scale(0.9); } }

                /* --- Story Effects --- */
                .effect-container > div {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    pointer-events: none;
                }
                @keyframes boom-effect { from { width: 0%; height: 0%; opacity: 1; } to { width: 400%; height: 400%; opacity: 0; } }
                .effect-boom { border: 4px solid white; animation: boom-effect 0.5s ease-out forwards; }

                @keyframes shake-effect { 0%, 100% { transform: translate(-50%, -50%) translateX(0); } 20% { transform: translate(-50%, -50%) translateX(-10px); } 40% { transform: translate(-50%, -50%) translateX(10px); } 60% { transform: translate(-50%, -50%) translateX(-10px); } 80% { transform: translate(-50%, -50%) translateX(10px); } }
                .effect-shake { animation: shake-effect 0.4s ease-in-out forwards; }
                
                @keyframes aurora-effect { 0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); } 50% { opacity: 0.6; transform: translate(-50%, -50%) scale(2); } }
                .effect-aurora { width: 200%; height: 200%; background: radial-gradient(circle, #34d399, #818cf8, #f472b6); filter: blur(50px); animation: aurora-effect 1.5s ease-in-out forwards; }

                @keyframes glitch-effect { 0% { clip-path: inset(10% 0 80% 0); } 20% { clip-path: inset(40% 0 40% 0); } 40% { clip-path: inset(80% 0 10% 0); } 60% { clip-path: inset(20% 0 70% 0); } 80% { clip-path: inset(60% 0 30% 0); } 100% { clip-path: inset(50% 0 50% 0); } }
                .effect-glitch::before, .effect-glitch::after { content: ''; position: absolute; top: 0; left: -2px; width: 100%; height: 100%; background: transparent; }
                .effect-glitch::before { animation: glitch-effect 0.5s steps(2, end) infinite; box-shadow: 2px 0 red; }
                .effect-glitch::after { animation: glitch-effect 0.5s steps(2, end) infinite reverse; box-shadow: -2px 0 blue; }

                @keyframes power-effect { 0% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); } }
                .effect-power { width: 150%; height: 150%; box-shadow: 0 0 10px 5px #fef9c3, 0 0 20px 10px #fde047, inset 0 0 5px 2px #fef9c3; animation: power-effect 1s ease-out forwards; }

                @keyframes speak-effect { from { width: 100%; height: 100%; opacity: 0.7; border: 2px solid white; } to { width: 250%; height: 250%; opacity: 0; border: 2px solid white; } }
                .effect-speak { animation: speak-effect 0.8s ease-out forwards; }
                
                @keyframes earth-effect { 0%, 100% { box-shadow: 0 0 40px 20px rgba(52, 144, 220, 0), inset 0 0 20px 10px rgba(70, 200, 150, 0); } 50% { box-shadow: 0 0 60px 30px rgba(52, 144, 220, 0.5), inset 0 0 30px 15px rgba(70, 200, 150, 0.4); } }
                .effect-earth { width: 120%; height: 120%; animation: earth-effect 1.5s ease-in-out forwards; }
                
                @keyframes info-effect {
                  0% { opacity: 0; } 20% { opacity: 0.5; } 80% { opacity: 0.5; } 100% { opacity: 0;}
                }
                .effect-info {
                    width: 200%; height: 200%;
                    background: 
                        repeating-linear-gradient(0deg, rgba(173, 216, 230, 0.3) 0, rgba(173, 216, 230, 0.3) 1px, transparent 1px, transparent 10px),
                        repeating-linear-gradient(90deg, rgba(173, 216, 230, 0.3) 0, rgba(173, 216, 230, 0.3) 1px, transparent 1px, transparent 10px);
                    animation: info-effect 1.5s ease-in-out forwards;
                }
            `}</style>
            
            <div className="absolute top-1/2 -translate-y-[calc(50%+8rem)] w-full flex justify-center items-end animate-fade-in">
                 <div className="relative">
                    {mainCharacters}
                    <div className={`effect-container ${activeEffect === 'shake' ? 'effect-shake' : ''}`}>
                        {activeEffect === 'boom' && <div className="effect-boom" key={lineIndex}></div>}
                        {activeEffect === 'aurora' && <div className="effect-aurora" key={lineIndex}></div>}
                        {activeEffect === 'glitch' && <div className="effect-glitch" key={lineIndex}></div>}
                        {activeEffect === 'power' && <div className="effect-power" key={lineIndex}></div>}
                        {activeEffect === 'speak' && <div className="effect-speak" key={lineIndex}></div>}
                        {activeEffect === 'earth' && <div className="effect-earth" key={lineIndex}></div>}
                        {activeEffect === 'info' && <div className="effect-info" key={lineIndex}></div>}
                    </div>
                 </div>
            </div>

            <div className="absolute bottom-1/4 w-3/4 max-w-4xl p-6 bg-black/70 rounded-lg border border-gray-700 backdrop-blur-sm animate-fade-in">
                <p className="text-center text-2xl text-gray-200" key={lineIndex}>
                    {currentLine.text}
                </p>
            </div>
        </div>
    );
};

export default StoryScene;