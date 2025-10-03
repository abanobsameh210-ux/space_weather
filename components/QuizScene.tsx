import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';

interface QuizSceneProps {
    quizData: QuizQuestion[];
    onQuizComplete: (collectedResources: string[]) => void;
}

const QuizScene: React.FC<QuizSceneProps> = ({ quizData, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [collectedResources, setCollectedResources] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<{ message: string, resource?: string, correct: boolean } | null>(null);
    const [showSummary, setShowSummary] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        if (quizData.length > 0) {
            // Shuffle the questions array and set it to state for the current quiz session
            setShuffledQuestions([...quizData].sort(() => Math.random() - 0.5));
            // Reset state for a new quiz
            setCurrentQuestionIndex(0);
            setCollectedResources([]);
            setFeedback(null);
            setShowSummary(false);
        }
    }, [quizData]);

    const handleAnswer = (answerIndex: number) => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const isCorrect = answerIndex === currentQuestion.correctAnswerIndex;

        if (isCorrect) {
            setCollectedResources(prev => [...prev, currentQuestion.resource]);
            setFeedback({ message: 'Correct! Resource Secured:', resource: currentQuestion.resource, correct: true });
        } else {
            setFeedback({ message: 'Incorrect. Resource Lost.', correct: false });
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentQuestionIndex < shuffledQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setShowSummary(true);
            }
        }, 2000);
    };

    if (shuffledQuestions.length === 0) {
        return <div className="text-2xl animate-pulse">Loading questions...</div>;
    }

    if (showSummary) {
        return (
            <div className="w-3/4 max-w-2xl p-8 bg-gray-900/80 rounded-lg border border-blue-400 backdrop-blur-sm animate-fade-in">
                <h1 className="text-3xl font-bold text-center text-blue-300 mb-6">Defense Resources Acquired</h1>
                {collectedResources.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2 text-green-300 text-lg">
                        {collectedResources.map(res => <li key={res}>{res}</li>)}
                    </ul>
                ) : (
                    <p className="text-center text-red-400 text-lg">No resources were secured. Earth is vulnerable.</p>
                )}
                <div className="text-center mt-8">
                     <button
                        onClick={() => onQuizComplete(collectedResources)}
                        className="px-8 py-3 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
                    >
                        Proceed
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <style>{`.animate-fade-in { animation: fadeIn 1s ease-in-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <div className="w-3/4 max-w-3xl text-center p-10 bg-black/60 rounded-lg border border-yellow-500 shadow-lg shadow-yellow-500/30 backdrop-blur-sm animate-fade-in">
                {feedback ? (
                    <div className="animate-fade-in">
                        <h2 className={`text-4xl font-bold mb-4 ${feedback.correct ? 'text-green-400' : 'text-red-500'}`}>{feedback.message}</h2>
                        {feedback.resource && <p className="text-2xl text-yellow-300">{feedback.resource}</p>}
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-light mb-2 text-gray-300">Question {currentQuestionIndex + 1}/{shuffledQuestions.length}</h2>
                        <h3 className="text-3xl font-bold mb-8 text-yellow-300">{currentQuestion.question}</h3>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            {currentQuestion.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className="px-8 py-4 text-xl font-semibold text-white bg-blue-700/80 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-blue-500/40 w-full md:w-auto"
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizScene;