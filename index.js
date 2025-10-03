import { GameScene } from './constants.js';
import * as scenes from './scenes.js';

const sceneContainer = document.getElementById('scene-container');
const pauseContainer = document.getElementById('pause-container');
const root = document.getElementById('root');

let state = {
    unlockedLevels: 1,
    currentLevel: null,
    scene: GameScene.StartMenu,
    collectedResources: [],
    deployedResources: [],
    isPaused: false,
};

let sceneTimer = null;
let currentSceneCleanup = () => {};

const scheduleSceneChange = (nextScene, delay) => {    
    if (sceneTimer) clearTimeout(sceneTimer);
    sceneTimer = setTimeout(() => {
        if (!state.isPaused) {
           setScene(nextScene);
        }
    }, delay);
};

// --- State Management ---
function setState(newState) {
    state = { ...state, ...newState };
    render();
}

function setScene(newScene) {
    setState({ scene: newScene });
}

// --- Event Handlers ---
const handleStartGame = () => setScene(GameScene.LevelSelect);
const handleTogglePause = () => setState({ isPaused: !state.isPaused });

const handleLevelSelect = (level) => {
    if (level <= state.unlockedLevels) {
        setState({ currentLevel: level, scene: GameScene.Story });
    }
};

const handleStoryComplete = () => setScene(GameScene.Travel);

const handleTravelComplete = () => {
    setScene(GameScene.EarthArrival);
    scheduleSceneChange(GameScene.Quiz, 8000); // Earth scene duration
};

const handleQuizComplete = (resources) => {
    setState({ collectedResources: resources, scene: GameScene.DeployResources });
};

const handleDeployComplete = (newlyDeployedResources) => {
    setState({ deployedResources: newlyDeployedResources, scene: GameScene.Defend });
};

const handleDefendComplete = (success) => {
    if (success) {
        setScene(GameScene.Aftermath);
    } else {
        setScene(GameScene.Loss);
    }
};

const handleAftermathComplete = () => setScene(GameScene.Victory);

const handleRestartLevel = () => {
    setState({
        scene: GameScene.Story,
        collectedResources: [],
        deployedResources: [],
    });
};

const handleBackToMenu = () => {
    setState({
        currentLevel: null,
        collectedResources: [],
        deployedResources: [],
        scene: GameScene.LevelSelect,
    });
};

const handleNextLevel = () => {
    if (state.currentLevel && state.currentLevel < 3) {
        setState({ unlockedLevels: Math.max(state.unlockedLevels, state.currentLevel + 1) });
    }
    handleBackToMenu();
};

const renderPauseButton = () => {
    if (state.scene === GameScene.StartMenu || state.scene === GameScene.LevelSelect) {
        pauseContainer.innerHTML = '';
        return;
    }
    const isPaused = state.isPaused;
    const button = document.createElement('button');
    button.className = "absolute top-4 right-4 z-50 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors";
    button.setAttribute('aria-label', isPaused ? "Resume game" : "Pause game");
    button.innerHTML = isPaused ? 
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z" /></svg>` :
        `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" /></svg>`;
    
    button.addEventListener('click', handleTogglePause);
    pauseContainer.innerHTML = '';
    pauseContainer.appendChild(button);
}

// --- Main Render Function ---
function render() {
    // Cleanup previous scene
    if (typeof currentSceneCleanup === 'function') {
        currentSceneCleanup();
    }
    currentSceneCleanup = () => {};
    sceneContainer.innerHTML = '';

    // Pause logic
    root.classList.toggle('game-paused', state.isPaused);
     if (state.isPaused && sceneTimer) {
        clearTimeout(sceneTimer);
     }
    renderPauseButton();

    let sceneElement;
    let sceneResult;

    switch (state.scene) {
        case GameScene.StartMenu:
            sceneElement = scenes.createStartScene({ onStart: handleStartGame });
            break;
        case GameScene.LevelSelect:
            sceneElement = scenes.createLevelSelectScene({ unlockedLevels: state.unlockedLevels, onSelect: handleLevelSelect });
            break;
        case GameScene.Story:
            sceneResult = scenes.createStoryScene({ level: state.currentLevel, onComplete: handleStoryComplete });
            sceneElement = sceneResult.element;
            currentSceneCleanup = sceneResult.cleanup;
            break;
        case GameScene.Travel:
            sceneResult = scenes.createTravelScene({ level: state.currentLevel, onComplete: handleTravelComplete });
            sceneElement = sceneResult.element;
            currentSceneCleanup = sceneResult.cleanup;
            break;
        case GameScene.EarthArrival:
             sceneResult = scenes.createEarthScene();
             sceneElement = sceneResult.element;
             currentSceneCleanup = sceneResult.cleanup;
            break;
        case GameScene.Quiz:
             sceneElement = scenes.createQuizScene({ onQuizComplete: handleQuizComplete, level: state.currentLevel });
            break;
        case GameScene.DeployResources:
            sceneElement = scenes.createDeployResourcesScene({ collectedResources: state.collectedResources, onComplete: handleDeployComplete });
            break;
        case GameScene.Defend:
            sceneResult = scenes.createDefendScene({ deployedResources: state.deployedResources, onComplete: handleDefendComplete });
            sceneElement = sceneResult.element;
            currentSceneCleanup = sceneResult.cleanup;
            break;
        case GameScene.Aftermath:
            sceneResult = scenes.createAftermathScene({ deployedResources: state.deployedResources, onComplete: handleAftermathComplete });
            sceneElement = sceneResult.element;
            currentSceneCleanup = sceneResult.cleanup;
            break;
        case GameScene.Loss:
            sceneElement = scenes.createEndScene({ outcome: 'loss', onRestart: handleRestartLevel, onMenu: handleBackToMenu });
            break;
        case GameScene.Victory:
            sceneElement = scenes.createEndScene({ outcome: 'victory', currentLevel: state.currentLevel, onNext: handleNextLevel, onMenu: handleBackToMenu });
            break;
        default:
            sceneContainer.textContent = 'Unknown scene';
    }

    if (sceneElement) {
        sceneContainer.appendChild(sceneElement);
    }
}

// Initial Render
render();
