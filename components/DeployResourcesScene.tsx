import React, { useState } from 'react';
import { getResourceVisuals } from './resourceUtils';

interface DeployResourcesSceneProps {
    collectedResources: string[];
    onComplete: (deployedResources: string[]) => void;
}

const DeployResourcesScene: React.FC<DeployResourcesSceneProps> = ({ collectedResources, onComplete }) => {
    const [selectedResources, setSelectedResources] = useState<string[]>([]);
    const [isDeploying, setIsDeploying] = useState(false);

    const toggleResource = (resource: string) => {
        setSelectedResources(prev =>
            prev.includes(resource) ? prev.filter(r => r !== resource) : [...prev, resource]
        );
    };

    const handleDeploy = () => {
        setIsDeploying(true);
        // Simulate a deployment delay
        setTimeout(() => {
            onComplete(selectedResources);
        }, 2000);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 animate-fade-in">
            <style>{`.animate-fade-in { animation: fadeIn 1.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <h1 className="text-4xl font-bold text-center text-blue-300 mb-2">Deploy Defenses</h1>
            <p className="text-lg text-gray-300 mb-8">Select the resources you wish to deploy to protect Earth.</p>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {collectedResources.map(resource => (
                    <button
                        key={resource}
                        onClick={() => toggleResource(resource)}
                        className={`p-4 rounded-lg border-2 flex items-center gap-4 transition-all duration-200 ${
                            selectedResources.includes(resource)
                                ? 'bg-cyan-900/50 border-cyan-400 scale-105'
                                : 'bg-gray-800/60 border-gray-600 hover:bg-gray-700/80'
                        }`}
                    >
                        {getResourceVisuals(resource).icon}
                        <span className="text-left text-lg font-semibold text-white">{resource}</span>
                    </button>
                ))}
            </div>

            {isDeploying ? (
                <p className="text-2xl text-yellow-300 animate-pulse">Deploying resources...</p>
            ) : (
                <button
                    onClick={handleDeploy}
                    disabled={selectedResources.length === 0}
                    className="px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
                >
                    Deploy {selectedResources.length} Resource{selectedResources.length !== 1 && 's'}
                </button>
            )}
        </div>
    );
};

export default DeployResourcesScene;