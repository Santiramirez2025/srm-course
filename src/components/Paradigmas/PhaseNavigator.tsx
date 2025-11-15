// src/components/Paradigmas/PhaseNavigator.tsx

import React from 'react';
import { Sparkles, Layers, TrendingUp, Award } from 'lucide-react';
import { PhaseState } from './types/phase';
import { PhaseIndicator } from './PhaseElements';

interface PhaseNavigatorProps {
    phaseState: PhaseState;
    goToPhase: (phaseNum: number) => void;
}

const PHASE_MAP = [
    { num: 1, title: "Test Inicial", icon: "🤔" },
    { num: 2, title: "Tu Resultado", icon: "📊" },
    { num: 3, title: "El Concepto", icon: "🧩" },
    { num: 4, title: "Ejemplo Real", icon: "💡" },
    { num: 5, title: "Transforma Creencias", icon: "🔄" },
    { num: 6, title: "Plan de Acción", icon: "📱" },
    { num: 7, title: "Reflexión Personal", icon: "✍️" },
    { num: 8, title: "Cierre + Bonus", icon: "🎯" },
];

export const PhaseNavigator: React.FC<PhaseNavigatorProps> = ({ phaseState, goToPhase }) => {
    const completedCount = phaseState.completedPhases.size;
    const totalPhases = PHASE_MAP.length;
    const progressPercentage = (completedCount / totalPhases) * 100;

    return (
        <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            {/* Header Card Premium */}
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Gradient overlay decorativo */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-2xl" />
                    
                    <div className="relative p-6 space-y-4">
                        {/* Título con icono */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <Layers className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Navegación
                                </p>
                                <h3 className="text-lg font-black text-white">
                                    Fases del Módulo
                                </h3>
                            </div>
                        </div>

                        {/* Progress mini-bar */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400 font-semibold">
                                    Progreso
                                </span>
                                <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                                    {Math.round(progressPercentage)}%
                                </span>
                            </div>
                            
                            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <div 
                                    className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-all duration-1000 ease-out relative"
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>{completedCount} completadas</span>
                                <span>{totalPhases} fases</span>
                            </div>
                        </div>

                        {/* Stats badges */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-blue-400" />
                                    <span className="text-xs text-gray-400">En progreso</span>
                                </div>
                                <p className="text-xl font-black text-white mt-1">
                                    {phaseState.currentPhase}
                                </p>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                                <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4 text-green-400" />
                                    <span className="text-xs text-gray-400">Finalizadas</span>
                                </div>
                                <p className="text-xl font-black text-white mt-1">
                                    {completedCount}
                                </p>
                            </div>
                        </div>

                        {/* Motivational message */}
                        {completedCount > 0 && completedCount < totalPhases && (
                            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-400/20 rounded-xl">
                                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5 animate-pulse" />
                                <p className="text-xs text-gray-300 leading-relaxed">
                                    {progressPercentage < 50 
                                        ? "¡Excelente comienzo! Seguí avanzando a tu ritmo." 
                                        : "¡Vas más de la mitad! El final está cerca."}
                                </p>
                            </div>
                        )}

                        {completedCount === totalPhases && (
                            <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl">
                                <Award className="w-5 h-5 text-green-400 animate-bounce" />
                                <span className="text-sm font-bold text-green-300">
                                    ¡Módulo Completado!
                                </span>
                                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lista de fases */}
            <div className="relative group">
                {/* Subtle glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-4 space-y-2">
                        {PHASE_MAP.map((phase, index) => (
                            <div 
                                key={phase.num}
                                style={{
                                    animation: 'fadeInLeft 0.5s ease-out both',
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                <PhaseIndicator
                                    phaseNum={phase.num}
                                    title={phase.title}
                                    phaseState={phaseState}
                                    goToPhase={goToPhase}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tips card - solo desktop */}
            <div className="hidden lg:block relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-400/20 rounded-3xl p-6">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-xl">💡</span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-white">
                                Tip de navegación
                            </p>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Podés volver a cualquier fase completada haciendo clic en ella. 
                                Tu progreso se guarda automáticamente.
                            </p>
                        </div>
                    </div>
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

                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Ocultar scrollbar pero mantener funcionalidad */
                .space-y-2::-webkit-scrollbar {
                    display: none;
                }
                
                .space-y-2 {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};