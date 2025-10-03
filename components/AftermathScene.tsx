import React, { useEffect } from 'react';
import Aurora from './Aurora';
import { getResourceVisuals } from './resourceUtils';

interface AftermathSceneProps {
    deployedResources: string[];
    onComplete: () => void;
}

const AftermathScene: React.FC<AftermathSceneProps> = ({ deployedResources, onComplete }) => {
    useEffect(() => {
        const completeTimer = setTimeout(onComplete, 8000); // Scene duration
        return () => clearTimeout(completeTimer);
    }, [onComplete]);

    return (
        <div className="w-full h-full relative flex items-center justify-center">
            <Aurora />
            <div className="relative z-10 w-11/12 max-w-3xl text-center p-8 bg-black/60 rounded-lg border border-cyan-400 backdrop-blur-sm animate-fade-in space-y-6">
                <h1 className="text-4xl font-bold text-cyan-300">SYSTEM REPORT</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="p-4 bg-gray-900/50 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-400 border-b border-gray-600 pb-2 mb-2">Planetary Status</h2>
                        <p className="text-2xl font-bold text-green-400">SECURE</p>
                    </div>
                     <div className="p-4 bg-gray-900/50 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-400 border-b border-gray-600 pb-2 mb-2">Atmospheric Conditions</h2>
                        <p className="text-2xl font-bold text-purple-400">Intense Auroral Activity</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-300 mb-4">
                        {deployedResources.length} Defense Resources Were Crucial
                    </h2>
                    {deployedResources.length > 0 ? (
                        <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-900/50 rounded-lg max-h-48 overflow-y-auto">
                            {deployedResources.map(resource => (
                                <div key={resource} className="flex flex-col items-center gap-2 p-2 bg-gray-800/70 rounded-md w-32 text-center" title={resource}>
                                    {React.cloneElement(getResourceVisuals(resource).icon, { className: "w-10 h-10 text-cyan-300" })}
                                    <span className="text-xs text-gray-300 truncate w-full">{resource}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <p className="text-yellow-400">No resources were deployed.</p>
                    )}
                </div>
            </div>
            <style>{`.animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>
        </div>
    );
};

export default AftermathScene;
