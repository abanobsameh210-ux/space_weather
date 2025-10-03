import React, { useState, useEffect, useRef } from 'react';
import { GameScene, GameLevel } from './types';
import { LEVEL_1_QUIZ, LEVEL_2_QUIZ, LEVEL_3_QUIZ } from './constants';

import StartScene from './components/StartScene';
import LevelSelectScene from './components/LevelSelectScene';
import StoryScene from './components/StoryScene';
import TravelScene from './components/TravelScene';
import EarthScene from './components/EarthScene';
import QuizScene from './components/QuizScene';
import DefendScene from './components/DefendScene';
import AftermathScene from './components/AftermathScene';
import EndScene from './components/EndScene';
import DeployResourcesScene from './components/DeployResourcesScene';

const PauseButton: React.FC<{ isPaused: boolean, onToggle: () => void }> = ({ isPaused, onToggle }) => (
  <button 
    onClick={onToggle} 
    className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
    aria-label={isPaused ? "Resume game" : "Pause game"}
  >
    {isPaused ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
      </svg>
    )}
  </button>
);


const App: React.FC = () => {
  const [unlockedLevels, setUnlockedLevels] = useState<number>(1);
  const [currentLevel, setCurrentLevel] = useState<GameLevel | null>(null);
  const [scene, setScene] = useState<GameScene>(GameScene.StartMenu);
  const [collectedResources, setCollectedResources] = useState<string[]>([]);
  const [deployedResources, setDeployedResources] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const sceneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSceneChange = (nextScene: GameScene, delay: number) => {
    if (sceneTimerRef.current) clearTimeout(sceneTimerRef.current);
    sceneTimerRef.current = setTimeout(() => {
        if (!isPaused) {
           setScene(nextScene);
        }
    }, delay);
  };
  
  useEffect(() => {
     if (isPaused && sceneTimerRef.current) {
        clearTimeout(sceneTimerRef.current);
     }
  }, [isPaused]);


  const handleStartGame = () => setScene(GameScene.LevelSelect);

  const handleLevelSelect = (level: GameLevel) => {
    if (level <= unlockedLevels) {
      setCurrentLevel(level);
      setScene(GameScene.Story);
    }
  };

  const handleStoryComplete = () => setScene(GameScene.Travel);
  
  const handleTravelComplete = () => {
    setScene(GameScene.EarthArrival);
    scheduleSceneChange(GameScene.Quiz, 8000); // Earth scene duration
  }

  const handleQuizComplete = (resources: string[]) => {
    setCollectedResources(resources);
    setScene(GameScene.DeployResources);
  };

  const handleDeployComplete = (newlyDeployedResources: string[]) => {
    setDeployedResources(newlyDeployedResources);
    setScene(GameScene.Defend);
  }
  
  const handleAftermathComplete = () => {
     setScene(GameScene.Victory);
  }
  
  const handleDefendComplete = (success: boolean) => {
    if (success) {
      setScene(GameScene.Aftermath);
    } else {
      setScene(GameScene.Loss);
    }
  }

  const handleRestartLevel = () => {
    setScene(GameScene.Story);
    setCollectedResources([]);
    setDeployedResources([]);
  };
  
  const handleBackToMenu = () => {
    setCurrentLevel(null);
    setCollectedResources([]);
    setDeployedResources([]);
    setScene(GameScene.LevelSelect);
  }

  const handleNextLevel = () => {
    if (currentLevel && currentLevel < 3) {
        setUnlockedLevels(prev => Math.max(prev, currentLevel + 1));
    }
    handleBackToMenu();
  }

  const getQuizData = () => {
    switch (currentLevel) {
        case 1: return LEVEL_1_QUIZ;
        case 2: return LEVEL_2_QUIZ;
        case 3: return LEVEL_3_QUIZ;
        default: return [];
    }
  }


  const renderScene = () => {
    switch (scene) {
      case GameScene.StartMenu:
        return <StartScene onStart={handleStartGame} />;
      case GameScene.LevelSelect:
        return <LevelSelectScene unlockedLevels={unlockedLevels} onSelect={handleLevelSelect} />;
      case GameScene.Story:
        return <StoryScene level={currentLevel!} onComplete={handleStoryComplete} />;
      case GameScene.Travel:
        return <TravelScene level={currentLevel!} onComplete={handleTravelComplete} />;
      case GameScene.EarthArrival:
        return <EarthScene />;
      case GameScene.Quiz:
        return <QuizScene quizData={getQuizData()} onQuizComplete={handleQuizComplete} />;
      case GameScene.DeployResources:
        return <DeployResourcesScene collectedResources={collectedResources} onComplete={handleDeployComplete} />;
      case GameScene.Defend:
        return <DefendScene deployedResources={deployedResources} onComplete={handleDefendComplete} />;
      case GameScene.Aftermath:
        return <AftermathScene deployedResources={deployedResources} onComplete={handleAftermathComplete} />;
      case GameScene.Loss:
        return <EndScene outcome="loss" onRestart={handleRestartLevel} onMenu={handleBackToMenu} />;
      case GameScene.Victory:
        return <EndScene outcome="victory" currentLevel={currentLevel} onNext={handleNextLevel} onMenu={handleBackToMenu} />;
      default:
        return null;
    }
  };

  return (
    <div className={`w-screen h-screen bg-slate-900 text-white overflow-hidden relative font-sans ${isPaused ? 'game-paused' : ''}`}>
       <style>{`
        @keyframes nebula-drift {
          0% { transform: rotate(0deg) scale(1.5); opacity: 0.6; }
          50% { opacity: 1; }
          100% { transform: rotate(360deg) scale(1.5); opacity: 0.6; }
        }
        @keyframes stars-drift-far {
          from { background-position: 0 0; }
          to { background-position: -5000px 1000px; }
        }
        @keyframes stars-drift-mid {
          from { background-position: 0 0; }
          to { background-position: -10000px 2000px; }
        }
        @keyframes stars-drift-near {
          from { background-position: 0 0; }
          to { background-position: -15000px 3000px; }
        }
       `}</style>
       {scene !== GameScene.LevelSelect && scene !== GameScene.StartMenu && <PauseButton isPaused={isPaused} onToggle={() => setIsPaused(p => !p)} />}

       {/* New Enhanced Background */}
       <div className="absolute inset-0 overflow-hidden">
            {/* Main Nebula Background */}
            <div className="absolute inset-[-20%]" style={{
                backgroundImage: `radial-gradient(ellipse 50% 60% at 30% 40%, rgba(100, 80, 160, 0.4), transparent),
                                radial-gradient(ellipse 40% 50% at 70% 60%, rgba(80, 120, 180, 0.4), transparent),
                                radial-gradient(ellipse 30% 30% at 50% 90%, rgba(180, 80, 120, 0.3), transparent)`,
                animation: 'nebula-drift 400s linear infinite alternate',
            }}></div>

            {/* Distant Galaxies & Gas Clouds */}
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(ellipse 20% 5% at 20% 30%, rgba(200, 220, 255, 0.5), transparent),
                                radial-gradient(ellipse 15% 3% at 80% 70%, rgba(200, 220, 255, 0.4), transparent),
                                radial-gradient(ellipse 10% 2% at 50% 50%, rgba(255, 230, 200, 0.3), transparent)`,
                backgroundSize: '1200px 1200px',
                animation: 'stars-drift-far 800s linear infinite',
                filter: 'blur(3px)',
                opacity: 0.9
            }}></div>

            {/* Far Starfield (Small, Dense, Colorful) */}
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(1px 1px at 20px 30px, rgba(180, 200, 255, 0.8), transparent),
                                 radial-gradient(1px 1px at 80px 120px, #fff, transparent),
                                 radial-gradient(0.5px 0.5px at 150px 180px, rgba(255, 220, 180, 0.7), transparent)`,
                backgroundSize: '200px 200px',
                animation: 'stars-drift-far 550s linear infinite',
            }}></div>

            {/* Mid Starfield (Medium) */}
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(1.5px 1.5px at 50px 100px, #fff, transparent),
                                 radial-gradient(1.5px 1.5px at 150px 200px, rgba(220, 230, 255, 0.9), transparent)`,
                backgroundSize: '350px 350px',
                animation: 'stars-drift-mid 320s linear infinite',
            }}></div>
            
            {/* Drifting Planets (Closest non-star layer) */}
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle 4px at 15% 25%, rgba(90, 62, 62, 0.9), transparent),
                                 radial-gradient(circle 2px at 80% 10%, rgba(74, 90, 122, 0.8), transparent),
                                 radial-gradient(circle 3px at 50% 85%, rgba(143, 143, 127, 0.8), transparent)`,
                backgroundSize: '800px 800px',
                animation: 'stars-drift-near 180s linear infinite',
                opacity: 0.9,
            }}></div>

            {/* Near Starfield (Larger, Sparse) */}
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(2px 2px at 100px 50px, #fff, transparent),
                                 radial-gradient(2.5px 2.5px at 200px 150px, rgba(255, 255, 221, 0.9), transparent)`,
                backgroundSize: '500px 500px',
                animation: 'stars-drift-near 210s linear infinite',
            }}></div>
        </div>

      <div className="relative w-full h-full flex items-center justify-center">
        {renderScene()}
      </div>
    </div>
  );
};

export default App;