// src/components/Paradigmas/TestQuestion.tsx

import React from 'react';

interface TestQuestionProps {
    question: string;
    index: number;
    currentAnswer: boolean | undefined;
    handleAnswer: (index: number, answer: boolean) => void;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({ question, index, currentAnswer, handleAnswer }) => {
    return (
        <div 
            className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 animate-fade-in" 
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <p className="text-gray-800 mb-3 font-medium">{question}</p>
            <div className="flex gap-3">
                <button
                    onClick={() => handleAnswer(index, true)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all transform hover:scale-105 ${
                        currentAnswer === true
                            ? 'bg-amber-100 border-amber-400 text-amber-800 shadow-md'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-amber-300'
                    }`}
                >
                    Sí
                </button>
                <button
                    onClick={() => handleAnswer(index, false)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all transform hover:scale-105 ${
                        currentAnswer === false
                            ? 'bg-green-100 border-green-400 text-green-700 shadow-md'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-green-300'
                    }`}
                >
                    No
                </button>
            </div>
        </div>
    );
};