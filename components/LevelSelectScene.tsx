import React from 'react';
import { GameLevel } from '../types';
import LockIcon from './icons/LockIcon';

interface LevelSelectSceneProps {
    unlockedLevels: number;
    onSelect: (level: GameLevel) => void;
}

const LevelCard: React.FC<{
    level: GameLevel;
    title: string;
    description: string;
    unlocked: boolean;
    onSelect: () => void;
}> = ({ level, title, description, unlocked, onSelect }) => {
    return (
        <button
            onClick={onSelect}
            disabled={!unlocked}
            className={`w-72 h-80 p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center ${
                unlocked
                ? 'bg-gray-800/50 border-cyan-400 shadow-lg shadow-cyan-500/20 hover:bg-gray-700/70 hover:shadow-cyan-500/40 transform hover:-translate-y-2 cursor-pointer'
                : 'bg-gray-900/70 border-gray-700 cursor-not-allowed'
            }`}
        >
            <h2 className={`text-3xl font-bold mb-2 ${unlocked ? 'text-cyan-300' : 'text-gray-500'}`}>Level {level}</h2>
            <h3 className={`text-2xl font-semibold mb-4 ${unlocked ? 'text-white' : 'text-gray-400'}`}>{title}</h3>
            <p className={`text-sm mb-auto ${unlocked ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
            {!unlocked && <LockIcon className="w-12 h-12 text-gray-600 mt-4" />}
        </button>
    );
};

const LevelSelectScene: React.FC<LevelSelectSceneProps> = ({ unlockedLevels, onSelect }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 animate-fade-in">
            <style>{`.animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <h1 className="text-6xl font-extrabold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Space Weather</h1>
            <h2 className="text-3xl font-light mb-12 text-cyan-300">Interactive</h2>
            <div className="flex flex-wrap justify-center gap-8">
                <LevelCard
                    level={1}
                    title="The Solar Flare"
                    description="Meet Flavo, a fast and energetic solar flare. Learn about its rapid journey to Earth and its effects on technology."
                    unlocked={unlockedLevels >= 1}
                    onSelect={() => onSelect(1)}
                />
                <LevelCard
                    level={2}
                    title="The CME"
                    description="Face Riho, a massive and powerful Coronal Mass Ejection. Understand its slower, but more impactful, threat to our power grids."
                    unlocked={unlockedLevels >= 2}
                    onSelect={() => onSelect(2)}
                />
                <LevelCard
                    level={3}
                    title="The Perfect Storm"
                    description="A solar flare and a CME have erupted together! Defend Earth from this combined, ultimate space weather event."
                    unlocked={unlockedLevels >= 3}
                    onSelect={() => onSelect(3)}
                />
            </div>
        </div>
    );
};

export default LevelSelectScene;
