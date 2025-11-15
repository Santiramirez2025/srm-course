// src/components/Paradigmas/TestQuestion.tsx

import React, { useState } from 'react';
import { Check, X, Circle } from 'lucide-react';

interface TestQuestionProps {
    question: string;
    index: number;
    currentAnswer: boolean | undefined;
    handleAnswer: (index: number, answer: boolean) => void;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({ 
    question, 
    index, 
    currentAnswer, 
    handleAnswer 
}) => {
    const [hoveredOption, setHoveredOption] = useState<'yes' | 'no' | null>(null);

    return (
        <div 
            className="relative group"
            style={{ 
                animation: 'fadeInUp 0.6s ease-out both',
                animationDelay: `${index * 100}ms` 
            }}
        >
            {/* Glow effect */}
            <div className={`
                absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500
                ${currentAnswer === true 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                    : currentAnswer === false
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'bg-gradient-to-r from-purple-500 to-fuchsia-500'
                }
            `} />
            
            <div className={`
                relative backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500
                ${currentAnswer !== undefined
                    ? currentAnswer === true
                        ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-400/30 shadow-lg shadow-amber-500/10'
                        : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/30 shadow-lg shadow-green-500/10'
                    : 'bg-white/5 border-2 border-white/10 hover:border-purple-400/30'
                }
            `}>
                {/* Decorative gradient top */}
                {currentAnswer !== undefined && (
                    <div className={`
                        h-1 w-full
                        ${currentAnswer === true
                            ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500'
                            : 'bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500'
                        }
                    `} />
                )}

                <div className="p-6 space-y-4">
                    {/* Número de pregunta + Pregunta */}
                    <div className="flex items-start gap-4">
                        {/* Número badge */}
                        <div className={`
                            flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow-lg transition-all duration-300
                            ${currentAnswer !== undefined
                                ? currentAnswer === true
                                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30'
                                    : 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30'
                                : 'bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-500/30'
                            }
                        `}>
                            {currentAnswer !== undefined ? (
                                currentAnswer === true ? (
                                    <Check className="w-6 h-6" strokeWidth={3} />
                                ) : (
                                    <X className="w-6 h-6" strokeWidth={3} />
                                )
                            ) : (
                                <span className="text-lg">{index + 1}</span>
                            )}
                        </div>

                        {/* Pregunta */}
                        <div className="flex-1 pt-1">
                            <p className="text-gray-200 text-lg leading-relaxed font-medium">
                                {question}
                            </p>
                        </div>
                    </div>

                    {/* Botones de respuesta */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Botón SÍ */}
                        <button
                            onClick={() => handleAnswer(index, true)}
                            onMouseEnter={() => setHoveredOption('yes')}
                            onMouseLeave={() => setHoveredOption(null)}
                            className="group/btn relative overflow-hidden"
                        >
                            {/* Glow effect para botón */}
                            <div className={`
                                absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl opacity-0 blur transition-opacity duration-300
                                ${currentAnswer === true 
                                    ? 'opacity-50' 
                                    : hoveredOption === 'yes' ? 'opacity-30' : ''
                                }
                            `} />
                            
                            {/* Botón content */}
                            <div className={`
                                relative flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl border-2 font-bold text-lg transition-all duration-300 transform
                                ${currentAnswer === true
                                    ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30 border-amber-400/50 text-white shadow-xl shadow-amber-500/20 scale-105'
                                    : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-amber-400/40 hover:scale-105 hover:text-white'
                                }
                            `}>
                                {/* Icono */}
                                <div className={`
                                    w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300
                                    ${currentAnswer === true
                                        ? 'bg-white/20'
                                        : hoveredOption === 'yes' ? 'bg-amber-500/20' : 'bg-white/10'
                                    }
                                `}>
                                    {currentAnswer === true ? (
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    ) : (
                                        <Circle className={`
                                            w-4 h-4 transition-colors duration-300
                                            ${hoveredOption === 'yes' ? 'text-amber-400' : 'text-gray-400'}
                                        `} />
                                    )}
                                </div>
                                
                                <span>Sí</span>

                                {/* Shimmer effect cuando está seleccionado */}
                                {currentAnswer === true && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow" />
                                )}
                            </div>
                        </button>

                        {/* Botón NO */}
                        <button
                            onClick={() => handleAnswer(index, false)}
                            onMouseEnter={() => setHoveredOption('no')}
                            onMouseLeave={() => setHoveredOption(null)}
                            className="group/btn relative overflow-hidden"
                        >
                            {/* Glow effect para botón */}
                            <div className={`
                                absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 blur transition-opacity duration-300
                                ${currentAnswer === false 
                                    ? 'opacity-50' 
                                    : hoveredOption === 'no' ? 'opacity-30' : ''
                                }
                            `} />
                            
                            {/* Botón content */}
                            <div className={`
                                relative flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl border-2 font-bold text-lg transition-all duration-300 transform
                                ${currentAnswer === false
                                    ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-green-400/50 text-white shadow-xl shadow-green-500/20 scale-105'
                                    : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-green-400/40 hover:scale-105 hover:text-white'
                                }
                            `}>
                                {/* Icono */}
                                <div className={`
                                    w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300
                                    ${currentAnswer === false
                                        ? 'bg-white/20'
                                        : hoveredOption === 'no' ? 'bg-green-500/20' : 'bg-white/10'
                                    }
                                `}>
                                    {currentAnswer === false ? (
                                        <X className="w-4 h-4 text-white" strokeWidth={3} />
                                    ) : (
                                        <Circle className={`
                                            w-4 h-4 transition-colors duration-300
                                            ${hoveredOption === 'no' ? 'text-green-400' : 'text-gray-400'}
                                        `} />
                                    )}
                                </div>
                                
                                <span>No</span>

                                {/* Shimmer effect cuando está seleccionado */}
                                {currentAnswer === false && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow" />
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Feedback visual cuando está respondida */}
                    {currentAnswer !== undefined && (
                        <div 
                            className="flex items-center gap-2 text-sm animate-fade-in"
                            style={{ animationDelay: '200ms' }}
                        >
                            <div className={`
                                w-2 h-2 rounded-full animate-pulse
                                ${currentAnswer === true ? 'bg-amber-400' : 'bg-green-400'}
                            `} />
                            <span className={`
                                font-semibold
                                ${currentAnswer === true ? 'text-amber-300' : 'text-green-300'}
                            `}>
                                Respuesta registrada
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out both;
                }

                @keyframes shimmer-slow {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                
                .animate-shimmer-slow {
                    animation: shimmer-slow 4s infinite;
                }
            `}</style>
        </div>
    );
};