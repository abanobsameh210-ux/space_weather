import React, { useState } from 'react';

const InstructionsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div 
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fade-in-fast"
        onClick={onClose}
    >
        <div 
            className="w-11/12 max-w-2xl p-8 bg-gray-900 rounded-xl border-2 border-cyan-500 shadow-2xl shadow-cyan-500/30 text-white relative"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6">How to Play</h2>
            <div className="space-y-4 text-lg text-gray-200">
                <p><strong className="text-yellow-300">1. Learn the Story:</strong> Watch the story of the incoming solar storm to understand the threat.</p>
                <p><strong className="text-yellow-300">2. Answer Questions:</strong> Correctly answer quiz questions to earn valuable defense resources for Earth.</p>
                <p><strong className="text-yellow-300">3. Deploy Defenses:</strong> Strategically choose which of your earned resources to deploy around the planet.</p>
                <p><strong className="text-yellow-300">4. Win the Level:</strong> You must deploy at least <strong className="text-green-400">4 resources</strong> to successfully defend the planet and unlock the next level!</p>
            </div>
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close instructions"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <style>{`.animate-fade-in-fast { animation: fadeIn 0.3s ease-out; }`}</style>
    </div>
);

interface StartSceneProps {
    onStart: () => void;
}

const StartScene: React.FC<StartSceneProps> = ({ onStart }) => {
    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
             <style>{`.animate-fade-in { animation: fadeIn 2s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            
            <h1 className="text-7xl md:text-8xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                Space Weather
            </h1>
            <h2 className="text-4xl md:text-5xl font-light text-cyan-300 mt-2 mb-16">
                Interactive
            </h2>

            <div className="flex flex-col sm:flex-row gap-6">
                <button
                    onClick={onStart}
                    className="px-10 py-5 text-2xl font-bold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:bg-blue-500"
                >
                    Start Game
                </button>
                <button
                    onClick={() => setShowInstructions(true)}
                    className="px-10 py-5 text-2xl font-bold text-white bg-gray-700 rounded-lg shadow-lg shadow-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:bg-gray-600"
                >
                    How to Play
                </button>
            </div>

            {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
        </div>
    );
};

export default StartScene;
