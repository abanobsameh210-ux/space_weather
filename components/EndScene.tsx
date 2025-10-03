import React from 'react';
import Aurora from './Aurora';
import { GameLevel } from '../types';

interface EndSceneProps {
  outcome: 'victory' | 'loss';
  currentLevel?: GameLevel | null;
  onRestart?: () => void;
  onNext?: () => void;
  onMenu?: () => void;
}

const EndScene: React.FC<EndSceneProps> = ({ outcome, currentLevel, onRestart, onNext, onMenu }) => {
  const isFinalLevel = currentLevel === 3;

  const renderVictory = () => (
     <div className="w-full h-full relative flex items-center justify-center">
        <Aurora />
        <div className="relative z-10 text-center p-8 bg-black/50 rounded-lg animate-fade-in space-y-6">
          <h1 className="text-6xl font-bold text-green-300">Victory!</h1>
          <p className="text-2xl text-gray-200">Level {currentLevel} Complete. The planet is safe.</p>
          <div className="flex justify-center gap-4">
            {onMenu && <button onClick={onMenu} className="px-6 py-2 text-lg font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">Main Menu</button>}
            {currentLevel && !isFinalLevel && onNext && (
                <button onClick={onNext} className="px-6 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">Next Level</button>
            )}
            {isFinalLevel && onMenu && (
                 <button onClick={onMenu} className="px-6 py-2 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-500 transition-colors">Play Again</button>
            )}
          </div>
        </div>
        <style>{`.animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      </div>
  );

  const renderLoss = () => (
     <div className="w-full h-full flex items-center justify-center relative">
        <style>{`
          .animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .flicker { animation: flicker 3s linear infinite; }
          @keyframes flicker {
            0%, 100% { box-shadow: 0 0 60px 30px rgba(220,38,38,0.6), inset 0 0 40px 20px rgba(100,0,0,0.8); }
            50% { box-shadow: 0 0 70px 35px rgba(255,50,50,0.7), inset 0 0 50px 25px rgba(150,0,0,0.9); }
          }
          .cracks {
            background:
              linear-gradient(105deg, rgba(255, 0, 0, 0.5) 2px, transparent 2px),
              linear-gradient(195deg, rgba(255, 0, 0, 0.5) 1px, transparent 1px);
            background-size: 40px 40px, 30px 30px;
          }
        `}</style>
      <div className="relative w-72 h-72 animate-fade-in">
        <div className="w-full h-full rounded-full bg-red-900 bg-cover flicker" style={{backgroundImage: 'url(https://i.imgur.com/B9zQ4e8.jpeg)'}}>
          <div className="w-full h-full rounded-full opacity-50 cracks"></div>
        </div>
      </div>
      <div className="absolute text-center p-8 bg-black/50 rounded-lg animate-fade-in space-y-6">
        <h1 className="text-6xl font-bold text-red-500">Failure</h1>
        <p className="text-2xl mt-4 text-red-400">The planetary shield was not strong enough.</p>
        <div className="flex justify-center gap-4">
            {onMenu && <button onClick={onMenu} className="px-6 py-2 text-lg font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">Main Menu</button>}
            {onRestart && <button onClick={onRestart} className="px-6 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">Try Again</button>}
        </div>
      </div>
    </div>
  );

  return outcome === 'victory' ? renderVictory() : renderLoss();
};

export default EndScene;