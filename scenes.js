import { getResourceVisuals } from './utils.js';
import { LEVEL_1_STORY, LEVEL_2_STORY, LEVEL_3_STORY, LEVEL_1_QUIZ, LEVEL_2_QUIZ, LEVEL_3_QUIZ } from './constants.js';
import { LockIcon } from './utils.js';

// --- Helper for Aurora ---
const createAurora = () => {
    const element = document.createElement('div');
    element.className = "absolute inset-0 overflow-hidden bg-slate-900";
    element.innerHTML = `
       <style>
        .aurora { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
        .aurora-band { position: absolute; width: 200%; height: 200%; mix-blend-mode: screen; filter: blur(50px) brightness(1.7); opacity: 0; }
        .aurora-band.one { background: radial-gradient(ellipse at center, rgba(40, 255, 150, 0.8) 0%, rgba(40, 255, 150, 0) 60%); animation: drift 20s linear infinite, fade 10s ease-in-out infinite alternate; transform-origin: 50% 100%; }
        .aurora-band.two { background: radial-gradient(ellipse at center, rgba(100, 150, 255, 0.8) 0%, rgba(100, 150, 255, 0) 60%); animation: drift 25s linear infinite reverse, fade 12s ease-in-out infinite alternate; transform-origin: 30% 80%; }
        .aurora-band.three { background: radial-gradient(ellipse at center, rgba(220, 100, 255, 0.7) 0%, rgba(220, 100, 255, 0) 60%); animation: drift 30s linear infinite, fade 15s ease-in-out infinite alternate; transform-origin: 80% 70%; }
        .aurora-band.four { background: radial-gradient(ellipse at center, rgba(255, 100, 100, 0.6) 0%, rgba(255, 100, 100, 0) 60%); animation: drift 35s linear infinite reverse, fade 18s ease-in-out infinite alternate; transform-origin: 60% 90%; }
        .aurora-band.five { background: radial-gradient(ellipse at center, rgba(0, 255, 255, 0.7) 0%, rgba(0, 255, 255, 0) 60%); animation: drift 18s linear infinite, fade 9s ease-in-out infinite alternate; transform-origin: 40% 60%; }
        .aurora-band.six { background: radial-gradient(ellipse at center, rgba(255, 0, 255, 0.6) 0%, rgba(255, 0, 255, 0) 60%); animation: drift 28s linear infinite reverse, fade 14s ease-in-out infinite alternate; transform-origin: 70% 50%; }
        .aurora-band.seven { background: radial-gradient(ellipse at center, rgba(100, 255, 200, 0.8) 0%, rgba(100, 255, 200, 0) 60%); animation: drift 22s linear infinite, fade 11s ease-in-out infinite alternate; transform-origin: 20% 90%; }
        .aurora-band.eight { background: radial-gradient(ellipse at center, rgba(255, 200, 100, 0.7) 0%, rgba(255, 200, 100, 0) 60%); animation: drift-2 32s linear infinite, fade 16s ease-in-out infinite alternate; transform-origin: 90% 60%; }
        @keyframes drift { 0% { transform: rotate(0deg) scale(1.5); } 100% { transform: rotate(360deg) scale(1.5); } }
        @keyframes drift-2 { 0% { transform: rotate(0deg) scale(1.8); } 100% { transform: rotate(-360deg) scale(1.8); } }
        @keyframes fade { 0% { opacity: 0.7; } 50% { opacity: 1.0; } 100% { opacity: 0.7; } }
        .sky-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%); }
      </style>
      <div class="sky-bg"></div>
      <div class="absolute w-full h-1/2 top-0 left-0 bg-repeat-x" style="background-image: radial-gradient(ellipse at center, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 10px 10px;"></div>
      <div class="aurora">
        <div class="aurora-band one"></div>
        <div class="aurora-band two"></div>
        <div class="aurora-band three"></div>
        <div class="aurora-band four"></div>
        <div class="aurora-band five"></div>
        <div class="aurora-band six"></div>
        <div class="aurora-band seven"></div>
        <div class="aurora-band eight"></div>
      </div>
       <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
    `;
    return element;
};


// --- Scene Functions ---

export const createStartScene = ({ onStart }) => {
    const element = document.createElement('div');
    element.className = "w-full h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in";
    element.innerHTML = `
        <style>.animate-fade-in { animation: fadeIn 2s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</style>
        
        <h1 class="text-7xl md:text-8xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
            Space Weather
        </h1>
        <h2 class="text-4xl md:text-5xl font-light text-cyan-300 mt-2 mb-16">
            Interactive
        </h2>

        <div class="flex flex-col sm:flex-row gap-6">
            <button id="start-btn" class="px-10 py-5 text-2xl font-bold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:bg-blue-500">
                Start Game
            </button>
            <button id="instructions-btn" class="px-10 py-5 text-2xl font-bold text-white bg-gray-700 rounded-lg shadow-lg shadow-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:bg-gray-600">
                How to Play
            </button>
        </div>
    `;

    element.querySelector('#start-btn').addEventListener('click', onStart);
    element.querySelector('#instructions-btn').addEventListener('click', () => {
        const modal = createInstructionsModal(() => document.body.removeChild(modal));
        document.body.appendChild(modal);
    });

    return element;
};

const createInstructionsModal = (onClose) => {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fade-in-fast";
    modal.innerHTML = `
        <style>.animate-fade-in-fast { animation: fadeIn 0.3s ease-out; } @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }</style>
        <div class="w-11/12 max-w-2xl p-8 bg-gray-900 rounded-xl border-2 border-cyan-500 shadow-2xl shadow-cyan-500/30 text-white relative">
            <h2 class="text-3xl font-bold text-center text-cyan-300 mb-6">How to Play</h2>
            <div class="space-y-4 text-lg text-gray-200">
                <p><strong class="text-yellow-300">1. Learn the Story:</strong> Watch the story of the incoming solar storm to understand the threat.</p>
                <p><strong class="text-yellow-300">2. Answer Questions:</strong> Correctly answer quiz questions to earn valuable defense resources for Earth.</p>
                <p><strong class="text-yellow-300">3. Deploy Defenses:</strong> Strategically choose which of your earned resources to deploy around the planet.</p>
                <p><strong class="text-yellow-300">4. Win the Level:</strong> You must deploy at least <strong class="text-green-400">4 resources</strong> to successfully defend the planet and unlock the next level!</p>
            </div>
            <button id="close-btn" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close instructions">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    `;
    modal.addEventListener('click', onClose);
    modal.querySelector('#close-btn').addEventListener('click', onClose);
    modal.firstElementChild.addEventListener('click', (e) => e.stopPropagation());
    return modal;
};

export const createLevelSelectScene = ({ unlockedLevels, onSelect }) => {
    const element = document.createElement('div');
    element.className = "w-full h-full flex flex-col items-center justify-center p-8 animate-fade-in";
    const levels = [
        { level: 1, title: "The Solar Flare", description: "Meet Flavo, a fast and energetic solar flare. Learn about its rapid journey to Earth and its effects on technology." },
        { level: 2, title: "The CME", description: "Face Riho, a massive and powerful Coronal Mass Ejection. Understand its slower, but more impactful, threat to our power grids." },
        { level: 3, title: "The Perfect Storm", description: "A solar flare and a CME have erupted together! Defend Earth from this combined, ultimate space weather event." },
    ];
    element.innerHTML = `
        <style>.animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</style>
        <h1 class="text-6xl font-extrabold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Space Weather</h1>
        <h2 class="text-3xl font-light mb-12 text-cyan-300">Interactive</h2>
        <div class="flex flex-wrap justify-center gap-8">
            ${levels.map(levelInfo => {
                const unlocked = unlockedLevels >= levelInfo.level;
                return `
                <button
                    data-level="${levelInfo.level}"
                    ${!unlocked ? 'disabled' : ''}
                    class="w-72 h-80 p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center ${
                        unlocked
                        ? 'bg-gray-800/50 border-cyan-400 shadow-lg shadow-cyan-500/20 hover:bg-gray-700/70 hover:shadow-cyan-500/40 transform hover:-translate-y-2 cursor-pointer'
                        : 'bg-gray-900/70 border-gray-700 cursor-not-allowed'
                    }"
                >
                    <h2 class="text-3xl font-bold mb-2 ${unlocked ? 'text-cyan-300' : 'text-gray-500'}">Level ${levelInfo.level}</h2>
                    <h3 class="text-2xl font-semibold mb-4 ${unlocked ? 'text-white' : 'text-gray-400'}">${levelInfo.title}</h3>
                    <p class="text-sm mb-auto ${unlocked ? 'text-gray-300' : 'text-gray-500'}">${levelInfo.description}</p>
                    ${!unlocked ? LockIcon({className: "w-12 h-12 text-gray-600 mt-4"}) : ''}
                </button>
                `
            }).join('')}
        </div>
    `;

    element.querySelectorAll('button[data-level]').forEach(button => {
        button.addEventListener('click', () => onSelect(parseInt(button.dataset.level)));
    });

    return element;
};

export const createStoryScene = ({ level, onComplete }) => {
    const storyData = { 1: LEVEL_1_STORY, 2: LEVEL_2_STORY, 3: LEVEL_3_STORY }[level];
    let lineIndex = 0;

    const element = document.createElement('div');
    element.className = "w-full h-full relative overflow-hidden flex flex-col justify-end items-center";
    element.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes pulse-flare { 0%, 100% { transform: scale(1); box-shadow: 0 0 30px 10px #facc15; } 50% { transform: scale(1.05); box-shadow: 0 0 40px 15px #fde047; } }
            @keyframes pulse-cme { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.02); opacity: 0.9; } }
            .animate-pulse-flare { animation: pulse-flare 3s infinite ease-in-out; }
            .animate-pulse-cme { animation: pulse-cme 5s infinite ease-in-out; }
            .animate-spin-slow { animation: spin 20s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg) scale(0.9); } to { transform: rotate(360deg) scale(0.9); } }
            .effect-container > div { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none; }
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
            @keyframes info-effect { 0% { opacity: 0; } 20% { opacity: 0.5; } 80% { opacity: 0.5; } 100% { opacity: 0;} }
            .effect-info { width: 200%; height: 200%; background: repeating-linear-gradient(0deg, rgba(173, 216, 230, 0.3) 0, rgba(173, 216, 230, 0.3) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(90deg, rgba(173, 216, 230, 0.3) 0, rgba(173, 216, 230, 0.3) 1px, transparent 1px, transparent 10px); animation: info-effect 1.5s ease-in-out forwards; }
        </style>
        <div id="character-container" class="absolute top-1/2 -translate-y-[calc(50%+8rem)] w-full flex justify-center items-end animate-fade-in"></div>
        <div id="dialogue-box" class="absolute bottom-1/4 w-3/4 max-w-4xl p-6 bg-black/70 rounded-lg border border-gray-700 backdrop-blur-sm animate-fade-in">
            <p id="dialogue-text" class="text-center text-2xl text-gray-200"></p>
        </div>
    `;

    const characterContainer = element.querySelector('#character-container');
    const dialogueText = element.querySelector('#dialogue-text');

    const updateScene = () => {
        const currentLine = storyData[lineIndex];
        dialogueText.textContent = currentLine.text;

        const characterHTML = (() => {
            const flavo = `<div class="relative"><div class="w-32 h-32 bg-yellow-400 rounded-full shadow-[0_0_30px_10px_#facc15] animate-pulse-flare"><div class="w-full h-full bg-orange-500 rounded-full scale-75 blur-sm"></div></div></div>`;
            const riho = `<div class="relative"><div class="w-48 h-48 bg-red-600 rounded-full shadow-[0_0_40px_15px_#ef4444] animate-pulse-cme opacity-80"><div class="w-full h-full bg-red-800 rounded-full scale-90 blur-md animate-spin-slow"></div></div></div>`;
            if (level === 1) return flavo;
            if (level === 2) return riho;
            if (level === 3) return `<div class="flex items-center justify-center gap-8">${flavo}${riho}</div>`;
            return '';
        })();

        const effectHTML = currentLine.effect ? `<div class="effect-container ${currentLine.effect === 'shake' ? 'effect-shake' : ''}"><div class="effect-${currentLine.effect}"></div></div>` : '';

        characterContainer.innerHTML = `<div class="relative">${characterHTML}${effectHTML}</div>`;
    };
    
    updateScene();
    
    const timer = setInterval(() => {
        if (lineIndex < storyData.length - 1) {
            lineIndex++;
            updateScene();
        } else {
            clearInterval(timer);
            setTimeout(onComplete, 2000);
        }
    }, 4000);

    return { element, cleanup: () => clearInterval(timer) };
};

export const createTravelScene = ({ level, onComplete }) => {
    const element = document.createElement('div');
    element.className = "w-full h-full overflow-hidden relative";

    const flareParticle = (delay) => `<div class="absolute top-1/2 left-0 w-16 h-1 bg-yellow-300 rounded-full shadow-[0_0_10px_2px_#fef08a] animate-travel-flare" style="animation-delay: ${delay}s"></div>`;
    const cmeCloud = (delay) => `<div class="absolute top-1/2 left-0 w-48 h-32 rounded-full bg-red-500/50 blur-xl shadow-[0_0_30px_10px_#ef4444] animate-travel-cme" style="animation-delay: ${delay}s"><div class="w-full h-full rounded-full bg-red-700/50 scale-75 animate-pulse-cme"></div></div>`;

    const phenomenonHTML = (() => {
        switch (level) {
            case 1: return [...Array(30)].map((_, i) => flareParticle(i * 0.1)).join('');
            case 2: return cmeCloud(0);
            case 3: return [...Array(20)].map((_, i) => flareParticle(i * 0.05)).join('') + cmeCloud(1);
            default: return '';
        }
    })();
    
    element.innerHTML = `
        <style>
            @keyframes travel-flare { 0% { transform: translateX(-10vw) scaleX(0.5); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateX(110vw) scaleX(2); opacity: 0; } }
            .animate-travel-flare { animation: travel-flare 4s ease-in forwards; }
            @keyframes travel-cme { 0% { transform: translateX(-20vw) scale(0.5); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateX(120vw) scale(1.2); opacity: 0; } }
            .animate-travel-cme { animation: travel-cme 8s linear forwards; }
            @keyframes pulse-cme { 0%, 100% { transform: scale(0.75); opacity: 0.8; } 50% { transform: scale(0.8); opacity: 1; } }
            .animate-pulse-cme { animation: pulse-cme 2s infinite ease-in-out; }
            .animate-fade-in-out { animation: fadeInOut 9s ease-in-out; } @keyframes fadeInOut { 0% { opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; } }
        </style>
        <div class="absolute top-1/2 left-[-200px] -translate-y-1/2 w-[400px] h-[400px]">
            <div class="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 animate-pulse shadow-[0_0_100px_40px_rgba(251,146,60,0.7)]"></div>
        </div>
        <div class="absolute inset-0">${phenomenonHTML}</div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-8 bg-black/50 rounded-lg animate-fade-in-out">
            <h2 class="text-4xl font-bold text-yellow-300">It's heading towards Earth...</h2>
        </div>
    `;

    const timer = setTimeout(onComplete, 9000);
    return { element, cleanup: () => clearTimeout(timer) };
};

export const createEarthScene = () => {
    const element = document.createElement('div');
    element.className = "w-full h-full flex items-center justify-center";
    element.innerHTML = `
        <style>
            .animate-fade-in { animation: fadeIn 1s ease-in-out forwards; } @keyframes fadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
            .animate-fade-in-scale { animation: fadeInScale 1s ease-in-out forwards; } @keyframes fadeInScale { from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
            @keyframes movebg { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
            @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-orbit { animation-name: orbit; animation-timing-function: linear; animation-iteration-count: infinite; }
        </style>
        <div class="relative w-72 h-72 animate-fade-in">
            <div class="absolute inset-0 rounded-full shadow-[0_0_50px_10px_rgba(100,180,255,0.3)]"></div>
            <div class="w-full h-full rounded-full bg-black bg-cover overflow-hidden" style="background-image: url(https://unpkg.com/three-globe@2.27.2/example/img/earth-day.jpg); background-size: 200% auto; animation: movebg 60s linear infinite;">
                <div class="w-full h-full rounded-full shadow-[inset_40px_0_80px_30px_rgba(0,0,0,0.9)]"></div>
            </div>
            <div class="absolute top-1/2 left-1/2 w-0 h-0 animate-orbit" style="animation-duration: 15s; animation-delay: 0s;"><div class="absolute" style="transform: translateX(160px);"><svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm4 0h-2v-2h2v2zm-4-4H9V8h2v4zm4-1h-2V8h2v3zM4.07 11h-1.02C3.01 9.94 3.16 8.84 3.5 7.8l.92 1.6c-.22.82-.35 1.68-.35 2.6zm15.91 0c0-.92-.13-1.78-.35-2.6l.92-1.6c.34 1.04.49 2.14.45 3.2h-1.02zM12 5.5c-1.3 0-2.42.39-3.41 1.05l-1.05-1.82C8.7 3.96 10.26 3.5 12 3.5s3.3.46 4.46 1.23l-1.05 1.82C14.42 5.89 13.3 5.5 12 5.5zm0 13c-1.74 0-3.3-.46-4.46-1.23l1.05-1.82C9.58 16.11 10.7 16.5 12 16.5s2.42-.39 3.41-1.05l1.05 1.82C15.3 18.04 13.74 18.5 12 18.5z"/><path d="M11.5 8.5h-1v3h1v-3zm3 0h-1v3h1v-3z" /><path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg></div></div>
            <div class="absolute top-1/2 left-1/2 w-0 h-0 animate-orbit" style="animation-duration: 20s; animation-delay: -5s;"><div class="absolute" style="transform: translateX(180px);"><svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm4 0h-2v-2h2v2zm-4-4H9V8h2v4zm4-1h-2V8h2v3zM4.07 11h-1.02C3.01 9.94 3.16 8.84 3.5 7.8l.92 1.6c-.22.82-.35 1.68-.35 2.6zm15.91 0c0-.92-.13-1.78-.35-2.6l.92-1.6c.34 1.04.49 2.14.45 3.2h-1.02zM12 5.5c-1.3 0-2.42.39-3.41 1.05l-1.05-1.82C8.7 3.96 10.26 3.5 12 3.5s3.3.46 4.46 1.23l-1.05 1.82C14.42 5.89 13.3 5.5 12 5.5zm0 13c-1.74 0-3.3-.46-4.46-1.23l1.05-1.82C9.58 16.11 10.7 16.5 12 16.5s2.42-.39 3.41-1.05l1.05 1.82C15.3 18.04 13.74 18.5 12 18.5z"/><path d="M11.5 8.5h-1v3h1v-3zm3 0h-1v3h1v-3z" /><path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg></div></div>
            <div class="absolute top-1/2 left-1/2 w-0 h-0 animate-orbit" style="animation-duration: 18s; animation-delay: -10s;"><div class="absolute" style="transform: translateX(170px);"><svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm4 0h-2v-2h2v2zm-4-4H9V8h2v4zm4-1h-2V8h2v3zM4.07 11h-1.02C3.01 9.94 3.16 8.84 3.5 7.8l.92 1.6c-.22.82-.35 1.68-.35 2.6zm15.91 0c0-.92-.13-1.78-.35-2.6l.92-1.6c.34 1.04.49 2.14.45 3.2h-1.02zM12 5.5c-1.3 0-2.42.39-3.41 1.05l-1.05-1.82C8.7 3.96 10.26 3.5 12 3.5s3.3.46 4.46 1.23l-1.05 1.82C14.42 5.89 13.3 5.5 12 5.5zm0 13c-1.74 0-3.3-.46-4.46-1.23l1.05-1.82C9.58 16.11 10.7 16.5 12 16.5s2.42-.39 3.41-1.05l1.05 1.82C15.3 18.04 13.74 18.5 12 18.5z"/><path d="M11.5 8.5h-1v3h1v-3zm3 0h-1v3h1v-3z" /><path d="M12 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg></div></div>
        </div>
        <div id="warning-message" class="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl text-center p-6 bg-red-900/80 rounded-xl border-2 border-red-500 shadow-2xl shadow-red-500/50 backdrop-blur-sm animate-fade-in-scale z-20">
            <h2 class="text-3xl font-bold text-white tracking-wider">Warning: Incoming Solar Storm!</h2>
        </div>
    `;

    const warningTimer = setTimeout(() => {
        element.querySelector('#warning-message').classList.remove('hidden');
    }, 2000);

    return { element, cleanup: () => clearTimeout(warningTimer) };
};

export const createQuizScene = ({ onQuizComplete, level }) => {
    const quizData = { 1: LEVEL_1_QUIZ, 2: LEVEL_2_QUIZ, 3: LEVEL_3_QUIZ }[level];
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
    let currentQuestionIndex = 0;
    let collectedResources = [];

    const element = document.createElement('div');
    element.className = "w-full h-full flex items-center justify-center";
    element.innerHTML = `<div id="quiz-container" class="w-3/4 max-w-3xl text-center p-10 bg-black/60 rounded-lg border border-yellow-500 shadow-lg shadow-yellow-500/30 backdrop-blur-sm animate-fade-in"></div>`;

    const quizContainer = element.querySelector('#quiz-container');

    const renderQuestion = () => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <style>.animate-fade-in { animation: fadeIn 1s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</style>
            <h2 class="text-2xl font-light mb-2 text-gray-300">Question ${currentQuestionIndex + 1}/${shuffledQuestions.length}</h2>
            <h3 class="text-3xl font-bold mb-8 text-yellow-300">${currentQuestion.question}</h3>
            <div class="flex flex-col md:flex-row justify-center gap-6">
                ${currentQuestion.answers.map((answer, index) => `
                    <button data-index="${index}" class="px-8 py-4 text-xl font-semibold text-white bg-blue-700/80 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-blue-500/40 w-full md:w-auto">
                        ${answer}
                    </button>
                `).join('')}
            </div>
        `;
        quizContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => handleAnswer(parseInt(e.currentTarget.dataset.index)));
        });
    };

    const renderFeedback = (isCorrect, resource) => {
        quizContainer.innerHTML = `
            <div class="animate-fade-in">
                <h2 class="text-4xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-500'}">${isCorrect ? 'Correct! Resource Secured:' : 'Incorrect. Resource Lost.'}</h2>
                ${isCorrect ? `<p class="text-2xl text-yellow-300">${resource}</p>` : ''}
            </div>
        `;
        setTimeout(() => {
            if (currentQuestionIndex < shuffledQuestions.length - 1) {
                currentQuestionIndex++;
                renderQuestion();
            } else {
                renderSummary();
            }
        }, 2000);
    };

    const renderSummary = () => {
        quizContainer.className = "w-3/4 max-w-2xl p-8 bg-gray-900/80 rounded-lg border border-blue-400 backdrop-blur-sm animate-fade-in";
        quizContainer.innerHTML = `
            <h1 class="text-3xl font-bold text-center text-blue-300 mb-6">Defense Resources Acquired</h1>
            ${collectedResources.length > 0 ? 
                `<ul class="list-disc list-inside space-y-2 text-green-300 text-lg">${collectedResources.map(res => `<li>${res}</li>`).join('')}</ul>` : 
                `<p class="text-center text-red-400 text-lg">No resources were secured. Earth is vulnerable.</p>`}
            <div class="text-center mt-8">
                 <button id="proceed-btn" class="px-8 py-3 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105">
                    Proceed
                </button>
            </div>
        `;
        quizContainer.querySelector('#proceed-btn').addEventListener('click', () => onQuizComplete(collectedResources));
    };

    const handleAnswer = (answerIndex) => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const isCorrect = answerIndex === currentQuestion.correctAnswerIndex;
        if (isCorrect) {
            collectedResources.push(currentQuestion.resource);
        }
        renderFeedback(isCorrect, currentQuestion.resource);
    };

    renderQuestion();
    return element;
};

export const createDeployResourcesScene = ({ collectedResources, onComplete }) => {
    let selectedResources = [];
    let isDeploying = false;

    const element = document.createElement('div');
    element.className = "w-full h-full flex flex-col items-center justify-center p-8 animate-fade-in";

    const render = () => {
        element.innerHTML = `
            <style>.animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</style>
            <h1 class="text-4xl font-bold text-center text-blue-300 mb-2">Deploy Defenses</h1>
            <p class="text-lg text-gray-300 mb-8">Select the resources you wish to deploy to protect Earth.</p>
            <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                ${collectedResources.map(resource => `
                    <button data-resource="${resource}" class="p-4 rounded-lg border-2 flex items-center gap-4 transition-all duration-200 ${selectedResources.includes(resource) ? 'bg-cyan-900/50 border-cyan-400 scale-105' : 'bg-gray-800/60 border-gray-600 hover:bg-gray-700/80'}">
                        ${getResourceVisuals(resource).icon}
                        <span class="text-left text-lg font-semibold text-white">${resource}</span>
                    </button>
                `).join('')}
            </div>
            <div id="deploy-action-container">
            ${isDeploying ? 
                `<p class="text-2xl text-yellow-300 animate-pulse">Deploying resources...</p>` :
                `<button id="deploy-btn" ${selectedResources.length === 0 ? 'disabled' : ''} class="px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100">
                    Deploy ${selectedResources.length} Resource${selectedResources.length !== 1 ? 's' : ''}
                </button>`
            }
            </div>
        `;

        element.querySelectorAll('button[data-resource]').forEach(button => {
            button.addEventListener('click', (e) => {
                const resource = e.currentTarget.dataset.resource;
                if (selectedResources.includes(resource)) {
                    selectedResources = selectedResources.filter(r => r !== resource);
                } else {
                    selectedResources.push(resource);
                }
                render();
            });
        });
        
        if (!isDeploying) {
            const deployBtn = element.querySelector('#deploy-btn');
            if (deployBtn) {
                deployBtn.addEventListener('click', () => {
                    isDeploying = true;
                    render();
                    setTimeout(() => onComplete(selectedResources), 2000);
                });
            }
        }
    };
    
    render();
    return element;
};

export const createDefendScene = ({ deployedResources, onComplete }) => {
    const element = document.createElement('div');
    element.className = "w-full h-full flex flex-col items-center justify-center overflow-hidden";
    
    const resourceCount = deployedResources.length;
    const success = resourceCount >= 4;
    const strength = Math.min(100, (resourceCount / 6) * 100);
    const shieldColor = `rgba(59, 130, 246, ${0.2 + (strength / 100) * 0.7})`;
    const shieldGlow = `rgba(59, 130, 246, ${0.4 + (strength / 100) * 0.6})`;
    const visuals = deployedResources.map(r => getResourceVisuals(r).visual).join('');

    element.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes fadeInFast { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in-fast { animation: fadeInFast 0.5s ease-in-out forwards; }
            @keyframes pulse-shield { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.03); opacity: 1; } }
            @keyframes storm-particle-fly { from { transform: translate(-100px, var(--y-start)) scale(0.5); opacity: 0; } to { transform: translate(calc(100vw + 100px), var(--y-end)) scale(1.5); opacity: 1; } }
            .storm-particle { position: absolute; left: 0; top: 0; width: 5px; height: 5px; border-radius: 50%; background: yellow; box-shadow: 0 0 15px 5px orange; animation-name: storm-particle-fly; animation-timing-function: linear; animation-iteration-count: infinite; }
            @keyframes movebg { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
        </style>
        <div class="absolute top-20 text-center p-4 bg-black/60 rounded-lg animate-fade-in">
            <h2 id="status-text" class="text-3xl font-bold text-yellow-300">Solar storm incoming...</h2>
        </div>
        <div id="commentary-log" class="absolute top-1/3 right-8 w-64 p-4 bg-black/70 rounded-lg border border-gray-700 backdrop-blur-sm space-y-2 max-h-[50vh] overflow-y-auto">
            <h3 class="text-lg font-bold text-cyan-300 border-b border-cyan-500/50 pb-2 mb-2">Defense Log</h3>
        </div>
        <div class="relative w-72 h-72">
             <div class="absolute inset-[-2rem] rounded-full transition-all duration-1000" style="box-shadow: 0 0 80px 40px ${shieldColor}, inset 0 0 60px 30px ${shieldGlow}; animation: ${strength > 10 ? `pulse-shield 3s ease-in-out infinite` : 'none'}; opacity: ${strength / 100}"></div>
            <div class="w-full h-full rounded-full bg-black bg-cover overflow-hidden" style="background-image: url(https://unpkg.com/three-globe@2.27.2/example/img/earth-day.jpg); background-size: 200% auto; animation: movebg 60s linear infinite; background-position: center;">
                 <div class="w-full h-full rounded-full shadow-[inset_40px_0_80px_30px_rgba(0,0,0,0.9)]"></div>
            </div>
            ${visuals}
        </div>
        <div class="absolute inset-0 pointer-events-none">
            ${[...Array(50)].map((_, i) => `<div class="storm-particle" style="--y-start: ${Math.random() * 100}vh; --y-end: ${Math.random() * 100}vh; animation-duration: ${2 + Math.random() * 3}s; animation-delay: ${Math.random() * 5}s;"></div>`).join('')}
        </div>
    `;

    const statusTextEl = element.querySelector('#status-text');
    const commentaryLogEl = element.querySelector('#commentary-log');
    const timeouts = [];

    const getResourceCommentary = (keyword, fallback) => {
        const relevantResource = deployedResources.find(r => r.toLowerCase().includes(keyword));
        return relevantResource ? `${relevantResource} are active!` : fallback;
    };

    const sequence = [
        { delay: 2000, text: "Raising planetary shields...", commentary: "Initializing defense grid." },
        { delay: 2000, text: `Shields at ${Math.round(strength)}% capacity.`, commentary: getResourceCommentary('shield', 'Core shields powered up.') },
        { delay: 3000, text: "Brace for impact!", commentary: "Particle density increasing rapidly." },
        { delay: 2500, text: "Impact detected on the outer perimeter!", commentary: getResourceCommentary('satellite', 'Satellite network deflecting initial wave.') },
        { delay: 3000, text: success ? "Shields holding! We're weathering the storm!" : "Shields failing! Critical systems exposed!", commentary: getResourceCommentary('power', 'Power grid stabilizers are critical.') },
        { delay: 3000, text: success ? "Storm subsiding. Planetary integrity maintained." : "Catastrophic failure detected. The planet is vulnerable.", commentary: "Assessing final damage..." },
    ];
    
    let totalDelay = 0;
    sequence.forEach(step => {
        totalDelay += step.delay;
        timeouts.push(setTimeout(() => {
            statusTextEl.textContent = step.text;
            const p = document.createElement('p');
            p.className = "text-sm text-gray-300 animate-fade-in-fast";
            p.textContent = `> ${step.commentary}`;
            commentaryLogEl.appendChild(p);
        }, totalDelay));
    });

    const endTimer = setTimeout(() => onComplete(success), totalDelay + 2000);
    timeouts.push(endTimer);

    const cleanup = () => timeouts.forEach(clearTimeout);
    return { element, cleanup };
};


export const createAftermathScene = ({ deployedResources, onComplete }) => {
    const element = document.createElement('div');
    element.className = "w-full h-full relative flex items-center justify-center";
    element.appendChild(createAurora());
    
    const content = document.createElement('div');
    content.className = "relative z-10 w-11/12 max-w-3xl text-center p-8 bg-black/60 rounded-lg border border-cyan-400 backdrop-blur-sm animate-fade-in space-y-6";
    content.innerHTML = `
        <style>.animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }</style>
        <h1 class="text-4xl font-bold text-cyan-300">SYSTEM REPORT</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div class="p-4 bg-gray-900/50 rounded-lg"><h2 class="text-lg font-semibold text-gray-400 border-b border-gray-600 pb-2 mb-2">Planetary Status</h2><p class="text-2xl font-bold text-green-400">SECURE</p></div>
            <div class="p-4 bg-gray-900/50 rounded-lg"><h2 class="text-lg font-semibold text-gray-400 border-b border-gray-600 pb-2 mb-2">Atmospheric Conditions</h2><p class="text-2xl font-bold text-purple-400">Intense Auroral Activity</p></div>
        </div>
        <div>
            <h2 class="text-xl font-semibold text-gray-300 mb-4">${deployedResources.length} Defense Resources Were Crucial</h2>
            ${deployedResources.length > 0 ? `
                <div class="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-900/50 rounded-lg max-h-48 overflow-y-auto">
                    ${deployedResources.map(resource => `
                        <div class="flex flex-col items-center gap-2 p-2 bg-gray-800/70 rounded-md w-32 text-center" title="${resource}">
                            ${getResourceVisuals(resource).icon.replace('class="w-8 h-8 text-cyan-400 flex-shrink-0"', 'class="w-10 h-10 text-cyan-300"')}
                            <span class="text-xs text-gray-300 truncate w-full">${resource}</span>
                        </div>
                    `).join('')}
                </div>
            ` : `<p class="text-yellow-400">No resources were deployed.</p>`}
        </div>
    `;
    element.appendChild(content);

    const timer = setTimeout(onComplete, 8000);
    return { element, cleanup: () => clearTimeout(timer) };
};


export const createEndScene = ({ outcome, currentLevel, onRestart, onNext, onMenu }) => {
    const isFinalLevel = currentLevel === 3;
    const element = document.createElement('div');
    element.className = "w-full h-full flex items-center justify-center relative";

    if (outcome === 'victory') {
        element.appendChild(createAurora());
        const content = document.createElement('div');
        content.className = "relative z-10 text-center p-8 bg-black/50 rounded-lg animate-fade-in space-y-6";
        content.innerHTML = `
            <style>.animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }</style>
            <h1 class="text-6xl font-bold text-green-300">Victory!</h1>
            <p class="text-2xl text-gray-200">Level ${currentLevel} Complete. The planet is safe.</p>
            <div class="flex justify-center gap-4">
                <button id="menu-btn" class="px-6 py-2 text-lg font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">Main Menu</button>
                ${!isFinalLevel ? 
                    `<button id="next-btn" class="px-6 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">Next Level</button>` :
                    `<button id="play-again-btn" class="px-6 py-2 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-500 transition-colors">Play Again</button>`
                }
            </div>
        `;
        element.appendChild(content);
        if (onMenu) content.querySelector('#menu-btn').addEventListener('click', onMenu);
        if (!isFinalLevel && onNext) content.querySelector('#next-btn').addEventListener('click', onNext);
        if (isFinalLevel && onMenu) content.querySelector('#play-again-btn').addEventListener('click', onMenu);
    } else { // Loss
        element.innerHTML = `
            <style>
              .animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              .flicker { animation: flicker 3s linear infinite; }
              @keyframes flicker {
                0%, 100% { box-shadow: 0 0 60px 30px rgba(220,38,38,0.6), inset 0 0 40px 20px rgba(100,0,0,0.8); }
                50% { box-shadow: 0 0 70px 35px rgba(255,50,50,0.7), inset 0 0 50px 25px rgba(150,0,0,0.9); }
              }
              .cracks { background: linear-gradient(105deg, rgba(255, 0, 0, 0.5) 2px, transparent 2px), linear-gradient(195deg, rgba(255, 0, 0, 0.5) 1px, transparent 1px); background-size: 40px 40px, 30px 30px; }
            </style>
            <div class="relative w-72 h-72 animate-fade-in">
                <div class="w-full h-full rounded-full bg-red-900 bg-cover flicker" style="background-image: url(https://i.imgur.com/B9zQ4e8.jpeg)">
                    <div class="w-full h-full rounded-full opacity-50 cracks"></div>
                </div>
            </div>
            <div class="absolute text-center p-8 bg-black/50 rounded-lg animate-fade-in space-y-6">
                <h1 class="text-6xl font-bold text-red-500">Failure</h1>
                <p class="text-2xl mt-4 text-red-400">The planetary shield was not strong enough.</p>
                <div class="flex justify-center gap-4">
                    <button id="menu-btn" class="px-6 py-2 text-lg font-bold text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">Main Menu</button>
                    <button id="restart-btn" class="px-6 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">Try Again</button>
                </div>
            </div>
        `;
        if (onMenu) element.querySelector('#menu-btn').addEventListener('click', onMenu);
        if (onRestart) element.querySelector('#restart-btn').addEventListener('click', onRestart);
    }
    return element;
};
