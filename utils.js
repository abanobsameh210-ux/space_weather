// --- ICONS ---

export const ShieldIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
</svg>`;

export const SatelliteIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <path d="M5 12l-2 2 2 2"/><path d="M19 12l2 2-2 2"/><path d="M12 5l2-2 2 2"/><path d="M12 19l2 2 2-2"/>
    <circle cx="12" cy="12" r="6"/><path d="M17.6 6.4L22 2"/><path d="M6.4 17.6L2 22"/>
</svg>`;

export const PowerIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <path d="M12 2L3 11h9l-1 10 9-9h-9L12 2z"/>
</svg>`;

export const WaveIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <path d="M3 12h2.5c1.5 0 2.5-1.5 2.5-2.5S7 7 5.5 7h-3"/><path d="M21 12h-2.5c-1.5 0-2.5 1.5-2.5 2.5s1 2.5 2.5 2.5h3"/><path d="M9 17c1.5 0 2.5-1.5 2.5-2.5S10.5 12 9 12h-3"/>
</svg>`;

export const DataIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
</svg>`;

export const NetworkIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <circle cx="12" cy="5" r="3"></circle><circle cx="19" cy="12" r="3"></circle><circle cx="5" cy="12" r="3"></circle><circle cx="12" cy="19" r="3"></circle>
    <path d="M12 8v8"></path><path d="M16.5 10.5l-9 3"></path><path d="M7.5 10.5l9 3"></path>
</svg>`;

export const AtomIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-5.91-4.3-8.2-4.31-2.28-8.22-.26-10.24 1.76-2.03 2.03-.02 5.91 4.3 8.2 4.31 2.28 8.22.26 10.24-1.76z"/>
    <path d="M3.8 20.2c-2.04-2.03-.02-5.91 4.3-8.2 4.31-2.28 8.22-.26 10.24 1.76 2.03 2.03.02 5.91-4.3 8.2-4.31 2.28-8.22-.26-10.24-1.76z"/>
</svg>`;

export const HeartbeatIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
</svg>`;

export const RealisticSatelliteIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <path d="M12.5 8.5L10 12h4l-2.5 3.5" stroke="cyan" /><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor" />
    <path d="M18.36 5.64l-1.41-1.41" /><path d="M12 2v2" /><path d="M5.64 5.64L4.22 4.22" /><path d="M2 12h2" />
    <path d="M20 12h2" /><path d="M18.36 18.36l-1.41-1.41" /><path d="M12 20v2" /><path d="M5.64 18.36l-1.42-1.42" />
    <path d="M22 7l-2.5 2.5" /><path d="M2 17l2.5-2.5" />
</svg>`;

export const LockIcon = (props = {}) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${props.className || ''}">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
</svg>`;

// --- RESOURCE VISUALS ---

const SatelliteNetwork = ({ orbitRadii, duration }) => `
    <style>
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-orbit { animation-name: orbit; animation-timing-function: linear; animation-iteration-count: infinite; }
    </style>
    ${orbitRadii.map((radius, i) => `
         <div class="absolute top-1/2 left-1/2 w-0 h-0 animate-orbit" style="animation-duration: ${duration + i*2}s; animation-delay: ${-i*3}s">
            <div class="absolute" style="transform: translateX(${radius}px) rotate(90deg)">
                ${RealisticSatelliteIcon({ className: "w-5 h-5 text-gray-300" })}
            </div>
        </div>
    `).join('')}
`;

const LayeredShield = ({ colors }) => `
    <style>
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }
    </style>
    <div class="absolute inset-[-1rem] rounded-full border-2 border-dashed opacity-50 animate-spin-slow" style="border-color: ${colors[0]}"></div>
    <div class="absolute inset-[-1.5rem] rounded-full border-2 opacity-50 animate-spin-slow-reverse" style="border-color: ${colors[1]}"></div>
    <div class="absolute inset-[-2.2rem] rounded-full border-2 border-dotted opacity-50 animate-spin-slow" style="border-color: ${colors[2]}"></div>
`;

const DataGrid = () => `
    <div class="absolute inset-[-3rem] rounded-full opacity-30" style="
        background: 
            repeating-conic-gradient(from 0deg, #89f7fe 0% 2.5%, transparent 2.5% 10%),
            repeating-radial-gradient(rgba(137, 247, 254, 0.2) 1px, transparent 1px, transparent 20px);
        animation: spin-slow-reverse 30s linear infinite;
    "></div>
`;

export const getResourceVisuals = (resourceName) => {
    const defaultIconProps = { className: "w-8 h-8 text-cyan-400 flex-shrink-0" };

    switch (resourceName) {
        // Level 1
        case "Magnetic Field Analyzers":
            return { icon: AtomIcon(defaultIconProps), visual: LayeredShield({ colors: ['#f472b6', '#a78bfa', '#60a5fa'] }) };
        case "Light-Speed Detectors":
            return { icon: SatelliteIcon(defaultIconProps), visual: SatelliteNetwork({ orbitRadii: [160, 180, 200], duration: 20 }) };
        case "Radiation Shielding":
            return { icon: ShieldIcon(defaultIconProps), visual: `<div class="absolute inset-[-2.5rem] rounded-full bg-yellow-300/20 blur-sm animate-pulse"></div>` };
        case "Ionospheric Stabilizers":
            return { icon: WaveIcon(defaultIconProps), visual: `<div class="absolute inset-[-1rem] rounded-full border-4 border-sky-400 opacity-60 animate-pulse-slow"></div>` };
        case "Communication Buffers":
            return { icon: DataIcon(defaultIconProps), visual: DataGrid() };
        case "Astronaut Health Monitors":
            return { icon: HeartbeatIcon(defaultIconProps), visual: SatelliteNetwork({ orbitRadii: [170], duration: 15 }) };
        
        // Level 2
        case "Plasma Containment Fields":
            return { icon: AtomIcon(defaultIconProps), visual: `<div class="absolute inset-[-1.8rem] rounded-full border-4 border-red-500 border-dashed animate-pulse-intense opacity-70"></div>` };
        case "Early Warning Satellite Network":
            return { icon: NetworkIcon(defaultIconProps), visual: SatelliteNetwork({ orbitRadii: [165, 190, 215, 240], duration: 25 }) };
        case "Magnetosphere Reinforcement":
            return { icon: ShieldIcon(defaultIconProps), visual: `<div class="absolute inset-[-3rem] rounded-full bg-blue-500/20 blur-md animate-pulse"></div>` };
        case "Grid Surge Protectors":
            return { icon: PowerIcon(defaultIconProps), visual: `<div class="absolute inset-[-0.5rem] rounded-full border-t-4 border-b-4 border-yellow-300 animate-spin-slow"></div>` };
        case "Satellite Shielding":
            return { icon: SatelliteIcon(defaultIconProps), visual: SatelliteNetwork({ orbitRadii: [175, 195], duration: 18 }) };
        case "Atmospheric Density Matrix":
            return { icon: DataIcon(defaultIconProps), visual: `<div class="absolute inset-0 rounded-full bg-green-500/10">${DataGrid()}</div>` };

        // Level 3
        case "Synchronized Alert System":
            return { icon: NetworkIcon(defaultIconProps), visual: SatelliteNetwork({ orbitRadii: [160, 180, 200, 220, 240], duration: 30 }) };
        case "Power Grid Capacitors":
            return { icon: PowerIcon(defaultIconProps), visual: `<div class="absolute inset-[-1.2rem] rounded-full border-8 border-double border-orange-400 animate-pulse-slow"></div>` };
        case "Dual-Phenomenon Particle Sorter":
            return { icon: AtomIcon(defaultIconProps), visual: LayeredShield({ colors: ['#fbbf24', '#f87171', '#a3e635'] }) };
        case "Solar Origin Triangulator":
            return { icon: SatelliteIcon(defaultIconProps), visual: SatelliteNetwork({ orbitRadii: [168, 205], duration: 22 }) };
        case "HF Radio Wave Stabilizer":
            return { icon: WaveIcon(defaultIconProps), visual: `<div class="absolute inset-[-2.8rem] rounded-full border-2 border-purple-400 opacity-70 animate-pulse"></div>` };
        case "Event Correlation Software":
            return { icon: DataIcon(defaultIconProps), visual: `<div class="absolute inset-0 rounded-full">${DataGrid()}</div>` };
        
        default:
            return { icon: ShieldIcon(defaultIconProps), visual: `<div class="absolute inset-[-2rem] rounded-full bg-white/20 blur-sm"></div>` };
    }
};
