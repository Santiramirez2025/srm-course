// src/components/Paradigmas/PhaseElements.tsx

import React from 'react';
import { Check, Lock, ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { PhaseState } from './types/phase';

interface ProgressBarProps {
    completed: number;
    total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
    const progressPercentage = (completed / total) * 100;
    
    return (
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 shadow-2xl">
            {/* Gradient line en el top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-80" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="space-y-3">
                    {/* Header con stats */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Progreso del Módulo
                                </p>
                                <p className="text-sm font-bold text-white">
                                    {completed} de {total} fases completadas
                                </p>
                            </div>
                        </div>
                        
                        {/* Porcentaje grande */}
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
                                    {Math.round(progressPercentage)}%
                                </p>
                            </div>
                            {progressPercentage === 100 && (
                                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                            )}
                        </div>
                    </div>

                    {/* Progress bar premium */}
                    <div className="relative">
                        {/* Background track */}
                        <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                            {/* Gradient progress con shimmer */}
                            <div 
                                className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-all duration-1000 ease-out relative overflow-hidden"
                                style={{ width: `${progressPercentage}%` }}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                
                                {/* Glow effect */}
                                {progressPercentage > 0 && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-sm opacity-50" />
                                )}
                            </div>
                        </div>

                        {/* Milestone markers */}
                        <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
                            {[...Array(total)].map((_, i) => {
                                const milestonePercentage = ((i + 1) / total) * 100;
                                const isPassed = progressPercentage >= milestonePercentage;
                                
                                return (
                                    <div 
                                        key={i}
                                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                            isPassed 
                                                ? 'bg-white shadow-lg shadow-white/50' 
                                                : 'bg-white/20'
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Motivational message */}
                    {progressPercentage > 0 && progressPercentage < 100 && (
                        <p className="text-xs text-gray-400 text-center animate-fade-in">
                            {progressPercentage < 30 && "🚀 Excelente comienzo!"}
                            {progressPercentage >= 30 && progressPercentage < 60 && "💪 Vas por buen camino!"}
                            {progressPercentage >= 60 && progressPercentage < 90 && "🔥 Casi ahí, seguí así!"}
                            {progressPercentage >= 90 && "⭐ Un último esfuerzo!"}
                        </p>
                    )}

                    {progressPercentage === 100 && (
                        <div className="flex items-center justify-center gap-2 text-yellow-400 animate-bounce">
                            <Sparkles className="w-4 h-4" />
                            <p className="text-xs font-bold uppercase tracking-wide">
                                ¡Módulo Completado!
                            </p>
                            <Sparkles className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

interface PhaseIndicatorProps {
    phaseNum: number;
    title: string;
    phaseState: PhaseState;
    goToPhase: (phaseNum: number) => void;
}

export const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({ 
    phaseNum, 
    title, 
    phaseState, 
    goToPhase 
}) => {
    const isCompleted = phaseState.completedPhases.has(phaseNum);
    const isUnlocked = phaseState.unlockedPhases.has(phaseNum);
    const isCurrent = phaseState.currentPhase === phaseNum;

    return (
        <button
            onClick={() => goToPhase(phaseNum)}
            disabled={!isUnlocked}
            className={`
                group relative w-full text-left overflow-hidden transition-all duration-300
                ${!isUnlocked ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {/* Glow effect en hover */}
            {isUnlocked && (
                <div className={`
                    absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300
                    ${isCurrent 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                        : isCompleted 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gradient-to-r from-purple-500 to-fuchsia-500'
                    }
                `} />
            )}

            {/* Card principal */}
            <div className={`
                relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                ${isCurrent 
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-400/50 shadow-lg shadow-amber-500/20' 
                    : isCompleted 
                        ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 hover:bg-green-500/20'
                        : isUnlocked
                            ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/30'
                            : 'bg-white/5 border border-white/10 opacity-40'
                }
            `}>
                {/* Número/icono de fase */}
                <div className="relative flex-shrink-0">
                    <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg
                        ${isCompleted 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30 group-hover:scale-110' 
                            : isCurrent
                                ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30 group-hover:scale-110'
                                : isUnlocked 
                                    ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-500/30 group-hover:scale-110'
                                    : 'bg-gradient-to-br from-gray-600 to-gray-700 shadow-gray-500/20'
                        }
                    `}>
                        {isCompleted ? (
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                        ) : isUnlocked ? (
                            <span className="text-lg font-black text-white">{phaseNum}</span>
                        ) : (
                            <Lock className="w-5 h-5 text-white/60" />
                        )}
                    </div>

                    {/* Badge de estado */}
                    {isCurrent && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full border-2 border-slate-900 animate-pulse">
                            <div className="absolute inset-0 bg-amber-400 rounded-full blur animate-pulse" />
                        </div>
                    )}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Fase {phaseNum}
                        </span>
                        {isCurrent && (
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                                    Activa
                                </span>
                            </div>
                        )}
                        {isCompleted && !isCurrent && (
                            <div className="flex items-center gap-1">
                                <Check className="w-3 h-3 text-green-400" />
                                <span className="text-xs font-semibold text-green-400">
                                    Completada
                                </span>
                            </div>
                        )}
                    </div>
                    <p className={`
                        text-sm font-bold truncate transition-colors duration-200
                        ${isUnlocked 
                            ? 'text-white group-hover:text-gray-200' 
                            : 'text-gray-500'
                        }
                    `}>
                        {title}
                    </p>
                </div>

                {/* Arrow indicator */}
                {isUnlocked && (
                    <ArrowRight className={`
                        w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300
                        ${isCurrent ? 'text-amber-400' : isCompleted ? 'text-green-400' : 'text-purple-400'}
                    `} />
                )}
            </div>
        </button>
    );
};

interface ContinueButtonProps { 
    phaseNum: number; 
    label?: string; 
    onClick: (phaseNum: number) => void;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({ 
    phaseNum, 
    label = "Continuar", 
    onClick 
}) => {
    return (
        <div className="flex justify-center">
            <button
                onClick={() => onClick(phaseNum)}
                className="group relative overflow-hidden"
            >
                {/* Animated glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-2xl opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                
                {/* Button content */}
                <div className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 rounded-2xl transition-all duration-300 shadow-2xl shadow-orange-500/40 group-hover:shadow-orange-600/60">
                    {/* Icon izquierdo */}
                    <Zap className="w-5 h-5 text-white animate-pulse" />
                    
                    {/* Texto */}
                    <span className="text-lg font-black text-white uppercase tracking-wide">
                        {label}
                    </span>
                    
                    {/* Arrow derecho con animación */}
                    <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-2 transition-transform duration-300" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast" />
                </div>

                <style>{`
                    @keyframes shimmer-fast {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(200%); }
                    }
                    
                    .animate-shimmer-fast {
                        animation: shimmer-fast 1.5s infinite;
                    }
                `}</style>
            </button>
        </div>
    );
};