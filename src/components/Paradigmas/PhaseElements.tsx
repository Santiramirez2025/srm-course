// src/components/Paradigmas/PhaseElements.tsx

import React from 'react';
import { Check, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { PhaseState } from './types/phase';

interface ProgressBarProps {
    completed: number;
    total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
    const progressPercentage = (completed / total) * 100;
    return (
        <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                        Progreso: {completed}/{total} fases
                    </span>
                    <span className="text-sm font-bold text-amber-600">
                        {Math.round(progressPercentage)}%
                    </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

interface PhaseIndicatorProps {
    phaseNum: number;
    title: string;
    phaseState: PhaseState;
    goToPhase: (phaseNum: number) => void;
}

export const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({ phaseNum, title, phaseState, goToPhase }) => {
    const isCompleted = phaseState.completedPhases.has(phaseNum);
    const isUnlocked = phaseState.unlockedPhases.has(phaseNum);
    const isCurrent = phaseState.currentPhase === phaseNum;

    return (
        <button
            onClick={() => goToPhase(phaseNum)}
            disabled={!isUnlocked}
            className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-200 w-full text-left
                ${isCurrent ? 'bg-amber-100 border-2 border-amber-400' : ''}
                ${isCompleted && !isCurrent ? 'bg-green-50 border border-green-300 hover:bg-green-100' : ''}
                ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
            `}
        >
            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-amber-500' : 'bg-gray-300'}
            `}>
                {isCompleted ? (
                    <Check size={18} className="text-white" />
                ) : isUnlocked ? (
                    <span className="text-white font-bold text-sm">{phaseNum}</span>
                ) : (
                    <Lock size={16} className="text-white" />
                )}
            </div>
            <span className={`text-sm font-medium ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                {title}
            </span>
        </button>
    );
};


interface ContinueButtonProps { 
    phaseNum: number; 
    label?: string; 
    onClick: (phaseNum: number) => void;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({ phaseNum, label = "Continuar", onClick }) => (
    <button
        onClick={() => onClick(phaseNum)}
        className="group w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
    >
        <span>{label}</span>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
    </button>
);