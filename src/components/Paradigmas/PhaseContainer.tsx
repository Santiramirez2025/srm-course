// src/components/Paradigmas/PhaseContainer.tsx

import React from 'react';
import { Check, Lock } from 'lucide-react';
import { PhaseState } from './types/phase';

interface PhaseContainerProps {
    phaseNum: number;
    title: string;
    icon: string;
    phaseState: PhaseState;
    phaseRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
    children: React.ReactNode;
}

export const PhaseContainer: React.FC<PhaseContainerProps> = ({ 
    phaseNum, 
    title, 
    icon, 
    phaseState,
    phaseRefs,
    children
}) => {
    const isUnlocked = phaseState.unlockedPhases.has(phaseNum);
    const isCompleted = phaseState.completedPhases.has(phaseNum);

    if (!isUnlocked) {
        return (
            <div 
                ref={el => { if (el) phaseRefs.current[phaseNum] = el }}
                className="bg-gray-100 border-2 border-gray-300 rounded-xl p-8 relative overflow-hidden opacity-60"
            >
                {/* Overlay de Bloqueado */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center">
                        <Lock size={48} className="text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-semibold">Completa la fase anterior</p>
                    </div>
                </div>
                {/* Contenido de preview borroso */}
                <div className="blur-sm pointer-events-none">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {icon} {title}
                    </h2>
                    <div className="h-32 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={el => phaseRefs.current[phaseNum] = el}
            className={`
                bg-white border-2 rounded-xl p-6 sm:p-8 transition-all duration-500
                ${isCompleted ? 'border-green-400 shadow-md' : 'border-amber-400 shadow-xl'}
                animate-fade-in-up
            `}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {icon} {title}
                </h2>
                {isCompleted && (
                    <div className="flex items-center gap-2 text-green-600 font-semibold animate-scale-in">
                        <Check size={20} />
                        <span className="hidden sm:inline">Completado</span>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};