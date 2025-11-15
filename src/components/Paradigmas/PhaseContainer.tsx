// src/components/Paradigmas/PhaseContainer.tsx

import React from 'react';
import { Check, Lock, Sparkles } from 'lucide-react';
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
                className="relative group"
            >
                {/* Glow effect sutil para locked */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-3xl opacity-10 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-3xl overflow-hidden">
                    {/* Overlay de Bloqueado Premium */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-md flex items-center justify-center z-10">
                        <div className="text-center space-y-6 p-8">
                            {/* Icono de candado con animación */}
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-gray-500/20 rounded-full blur-2xl animate-pulse" />
                                <div className="relative w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <Lock size={40} className="text-gray-400 animate-pulse" />
                                </div>
                            </div>
                            
                            {/* Texto */}
                            <div className="space-y-2">
                                <p className="text-2xl font-bold text-gray-300">
                                    Fase Bloqueada
                                </p>
                                <p className="text-gray-400 text-lg font-medium">
                                    Completá la fase anterior para desbloquear
                                </p>
                            </div>

                            {/* Badge de fase */}
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-700/30 border border-gray-600/30 rounded-full backdrop-blur-sm">
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                                    Fase {phaseNum}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contenido de preview borroso */}
                    <div className="blur-md opacity-30 pointer-events-none p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-gray-700/50 rounded-xl flex items-center justify-center">
                                <span className="text-3xl opacity-50">{icon}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-500">
                                {title}
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="h-24 bg-gray-700/30 rounded-xl" />
                            <div className="h-20 bg-gray-700/30 rounded-xl" />
                            <div className="h-16 bg-gray-700/30 rounded-xl w-3/4" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={el => phaseRefs.current[phaseNum] = el}
            className="relative group"
            style={{
                animation: 'fadeInUp 0.6s ease-out both',
                animationDelay: `${phaseNum * 50}ms`
            }}
        >
            {/* Glow effect dinámico */}
            <div className={`
                absolute -inset-1 rounded-3xl opacity-20 group-hover:opacity-40 blur-2xl transition-all duration-500
                ${isCompleted 
                    ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500' 
                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500'
                }
            `} />
            
            {/* Container principal */}
            <div className={`
                relative backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500
                ${isCompleted 
                    ? 'bg-green-500/10 border-2 border-green-400/30 shadow-xl shadow-green-500/10' 
                    : 'bg-white/5 border-2 border-white/10 shadow-2xl hover:border-purple-400/30'
                }
            `}>
                {/* Gradient overlay decorativo */}
                <div className={`
                    absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none
                    ${isCompleted ? 'bg-green-500' : 'bg-purple-500'}
                `} />

                {/* Header */}
                <div className="relative p-6 sm:p-8 border-b border-white/10">
                    <div className="flex items-start justify-between gap-4">
                        {/* Título con icono */}
                        <div className="flex items-start gap-4 flex-1">
                            {/* Icono con badge de fase */}
                            <div className="relative flex-shrink-0">
                                <div className={`
                                    w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300
                                    ${isCompleted 
                                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30' 
                                        : 'bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-500/30 group-hover:scale-110'
                                    }
                                `}>
                                    <span className="text-3xl">{icon}</span>
                                </div>
                                {/* Badge de número de fase */}
                                <div className={`
                                    absolute -bottom-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-lg
                                    ${isCompleted 
                                        ? 'bg-gradient-to-br from-green-600 to-emerald-700' 
                                        : 'bg-gradient-to-br from-amber-500 to-orange-600'
                                    }
                                `}>
                                    {phaseNum}
                                </div>
                            </div>

                            {/* Título */}
                            <div className="flex-1 pt-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Fase {phaseNum}
                                    </span>
                                    {!isCompleted && (
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                                                En progreso
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                                    {title}
                                </h2>
                            </div>
                        </div>

                        {/* Badge de completado */}
                        {isCompleted && (
                            <div 
                                className="flex-shrink-0"
                                style={{
                                    animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                                    animationDelay: '0.3s'
                                }}
                            >
                                <div className="relative group/badge">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-50 blur group-hover/badge:opacity-75 transition-opacity" />
                                    <div className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
                                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-bold text-green-300 hidden sm:inline">
                                            Completado
                                        </span>
                                        <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-6 sm:p-8">
                    {children}
                </div>

                {/* Borde inferior decorativo si está completado */}
                {isCompleted && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-50" />
                )}
            </div>

            {/* Estilos personalizados */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8) rotate(-10deg);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) rotate(0deg);
                    }
                }
            `}</style>
        </div>
    );
};