import React from 'react';

// Generic icons
import ShieldIcon from './icons/ShieldIcon';
import SatelliteIcon from './icons/resources/SatelliteIcon';
import PowerIcon from './icons/PowerIcon';
import WaveIcon from './icons/WaveIcon';
import DataIcon from './icons/resources/DataIcon';
import NetworkIcon from './icons/resources/NetworkIcon';
import AtomIcon from './icons/resources/AtomIcon';
import HeartbeatIcon from './icons/resources/HeartbeatIcon';
import RealisticSatelliteIcon from './icons/resources/RealisticSatelliteIcon';


const SatelliteNetwork: React.FC<{ orbitRadii: number[], duration: number }> = ({ orbitRadii, duration }) => (
    <>
        {orbitRadii.map((radius, i) => (
             <div key={i} className="absolute top-1/2 left-1/2 w-0 h-0 animate-orbit" style={{ animationDuration: `${duration + i*2}s`, animationDelay: `${-i*3}s` }}>
                <div className="absolute" style={{ transform: `translateX(${radius}px) rotate(90deg)` }}>
                    <RealisticSatelliteIcon className="w-5 h-5 text-gray-300" />
                </div>
            </div>
        ))}
        <style>{`
            @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-orbit { animation-name: orbit; animation-timing-function: linear; animation-iteration-count: infinite; }
        `}</style>
    </>
);

const LayeredShield: React.FC<{ colors: [string, string, string] }> = ({ colors }) => (
    <>
        <div className="absolute inset-[-1rem] rounded-full border-2 border-dashed opacity-50 animate-spin-slow" style={{borderColor: colors[0]}}></div>
        <div className="absolute inset-[-1.5rem] rounded-full border-2 opacity-50 animate-spin-slow-reverse" style={{borderColor: colors[1]}}></div>
        <div className="absolute inset-[-2.2rem] rounded-full border-2 border-dotted opacity-50 animate-spin-slow" style={{borderColor: colors[2]}}></div>
        <style>{`
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
            .animate-spin-slow { animation: spin-slow 20s linear infinite; }
            .animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }
        `}</style>
    </>
);

const DataGrid: React.FC = () => (
    <div className="absolute inset-[-3rem] rounded-full opacity-30" style={{
        background: `
            repeating-conic-gradient(from 0deg, #89f7fe 0% 2.5%, transparent 2.5% 10%),
            repeating-radial-gradient(rgba(137, 247, 254, 0.2) 1px, transparent 1px, transparent 20px)
        `,
        animation: 'spin-slow-reverse 30s linear infinite'
    }}></div>
);


// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
export const getResourceVisuals = (resourceName: string): { icon: React.ReactElement, visual: React.ReactElement | null } => {
    const defaultIconProps = { className: "w-8 h-8 text-cyan-400 flex-shrink-0" };

    switch (resourceName) {
        // Level 1
        case "Magnetic Field Analyzers":
            return { icon: <AtomIcon {...defaultIconProps} />, visual: <LayeredShield colors={['#f472b6', '#a78bfa', '#60a5fa']} /> };
        case "Light-Speed Detectors":
            return { icon: <SatelliteIcon {...defaultIconProps} />, visual: <SatelliteNetwork orbitRadii={[160, 180, 200]} duration={20} /> };
        case "Radiation Shielding":
            return { icon: <ShieldIcon {...defaultIconProps} />, visual: <div className="absolute inset-[-2.5rem] rounded-full bg-yellow-300/20 blur-sm animate-pulse"></div> };
        case "Ionospheric Stabilizers":
            return { icon: <WaveIcon {...defaultIconProps} />, visual: <div className="absolute inset-[-1rem] rounded-full border-4 border-sky-400 opacity-60 animate-pulse-slow"></div> };
        case "Communication Buffers":
            return { icon: <DataIcon {...defaultIconProps} />, visual: <DataGrid /> };
        case "Astronaut Health Monitors":
            return { icon: <HeartbeatIcon {...defaultIconProps} />, visual: <SatelliteNetwork orbitRadii={[170]} duration={15} /> };
        
        // Level 2
        case "Plasma Containment Fields":
            return { icon: <AtomIcon {...defaultIconProps} />, visual: <div className="absolute inset-[-1.8rem] rounded-full border-4 border-red-500 border-dashed animate-pulse-intense opacity-70"></div> };
        case "Early Warning Satellite Network":
            return { icon: <NetworkIcon {...defaultIconProps} />, visual: <SatelliteNetwork orbitRadii={[165, 190, 215, 240]} duration={25} /> };
        case "Magnetosphere Reinforcement":
            return { icon: <ShieldIcon {...defaultIconProps} />, visual: <div className="absolute inset-[-3rem] rounded-full bg-blue-500/20 blur-md animate-pulse"></div> };
        case "Grid Surge Protectors":
            return { icon: <PowerIcon {...defaultIconProps} />, visual: <div className="absolute inset-[-0.5rem] rounded-full border-t-4 border-b-4 border-yellow-300 animate-spin-slow"></div> };
        case "Satellite Shielding":
            return { icon: <SatelliteIcon {...defaultIconProps} />, visual: <SatelliteNetwork orbitRadii={[175, 195]} duration={18} /> };
        case "Atmospheric Density Matrix":
            return { icon: <DataIcon {...defaultIconProps} />, visual: <div className="absolute inset-0 rounded-full bg-green-500/10"><DataGrid /></div> };

        // Level 3
        case "Synchronized Alert System":
            return { icon: <NetworkIcon {...defaultIconProps} />, visual: <SatelliteNetwork orbitRadii={[160, 180, 200, 220, 240]} duration={30} /> };
        case "Power Grid Capacitors":
            return { icon: <PowerIcon {...defaultIconProps} />, visual: <div className="absolute inset-[-1.2rem] rounded-full border-8 border-double border-orange-400 animate-pulse-slow"></div> };
        case "Dual-Phenomenon Particle Sorter":
            return { icon: <AtomIcon {...defaultIconProps} />, visual: <LayeredShield colors={['#fbbf24', '#f87171', '#a3e635']} /> };
        case "Solar Origin Triangulator":
            return { icon: <SatelliteIcon {...defaultIconProps} />, visual: <SatelliteNetwork orbitRadii={[168, 205]} duration={22} /> };
        case "HF Radio Wave Stabilizer":
            return { icon: <WaveIcon {...defaultIconProps} />, visual: <div className="absolute inset-[-2.8rem] rounded-full border-2 border-purple-400 opacity-70 animate-pulse"></div> };
        case "Event Correlation Software":
            return { icon: <DataIcon {...defaultIconProps} />, visual: <div className="absolute inset-0 rounded-full"><DataGrid /></div> };
        
        default:
            return { icon: <ShieldIcon {...defaultIconProps} />, visual: <div className="absolute inset-[-2rem] rounded-full bg-white/20 blur-sm"></div> };
    }
};