// data/modules/capitulo1/01-paradigmas.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Check, ChevronRight, Sparkles, Zap, Target, Brain, Lightbulb } from 'lucide-react';

// ==================== AJUSTE DE IMPORTACIONES MODULARES ====================
import { usePhaseState } from '../../../components/Paradigmas/hooks/usePhaseState'; 
import { ProgressBar, ContinueButton } from '../../../components/Paradigmas/PhaseElements';
import { PhaseContainer } from '../../../components/Paradigmas/PhaseContainer';
import { PhaseNavigator } from '../../../components/Paradigmas/PhaseNavigator';
import { TestQuestion } from '../../../components/Paradigmas/TestQuestion';

// ==================== EXPORTACIÓN REQUERIDA: METADATA ====================
export const paradigmasMetadata = {
    id: 1,
    type: "game" as const,
    title: "Paradigmas",
    icon: "🎙️",
    chapter: 1,
    description: "Identifica y reconfigura las creencias que limitan tu potencial.",
};

// ==================== DATA GLOBAL ====================
const limitingBeliefs = [
    "No soy bueno para esto", "No tengo suerte", "Soy malo con el dinero", 
    "No tengo tiempo", "Ya es muy tarde para mí", "No soy creativo"
];

const empoweringBeliefs: { [key: string]: string } = {
    "No soy bueno para esto": "Estoy aprendiendo y mejorando cada día",
    "No tengo suerte": "Creo mis propias oportunidades",
    "Soy malo con el dinero": "Estoy desarrollando inteligencia financiera",
    "No tengo tiempo": "Administro mi tiempo según mis prioridades",
    "Ya es muy tarde para mí": "Es el momento perfecto para empezar",
    "No soy creativo": "La creatividad se desarrolla con práctica"
};

const testQuestions = [
    "Suelo decir 'no puedo' antes de intentar",
    "Cuando algo sale mal, lo tomo como confirmación de mis límites",
    "Me cuesta aceptar elogios o logros",
    "Evito situaciones nuevas por miedo a fallar"
];
const totalPhases = 8;

// ==================== MAIN COMPONENT (COORDINADOR) ====================
export const ParadigmasContent: React.FC = () => { 

    const { phaseState, unlockNextPhase, goToPhase } = usePhaseState(totalPhases);
    
    const [testAnswers, setTestAnswers] = useState<boolean[]>([]);
    const [showTestResult, setShowTestResult] = useState(false);
    const [selectedBelief, setSelectedBelief] = useState<string>('');
    const [showBeliefResult, setShowBeliefResult] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [copiedPrompt, setCopiedPrompt] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    
    const phaseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    // ==================== EFFECTS ====================
    useEffect(() => {
        if (phaseState.currentPhase > 0) {
            const targetRef = phaseRefs.current[phaseState.currentPhase];
            if (targetRef) {
                targetRef.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    }, [phaseState.currentPhase]);

    // ==================== HANDLERS ====================
    const handleTestAnswer = useCallback((index: number, answer: boolean) => {
        setTestAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[index] = answer;
            
            if (newAnswers.filter(a => a !== undefined).length === testQuestions.length) {
                setShowTestResult(true);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
            }
            
            return newAnswers;
        });
    }, []);

    const handleBeliefSelect = useCallback((belief: string) => {
        setSelectedBelief(belief);
        setShowBeliefResult(true);
    }, []);

    const copyPrompt = useCallback(() => {
        const prompt = "Ayudame a ver qué creencias sobre mí mismo podrían estar frenándome sin que me dé cuenta. Basate en cómo hablo de mí, de mis hábitos y resultados. Después, charlemos cómo podría verlo distinto. Sé directo pero amigable.";
        navigator.clipboard.writeText(prompt);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2500);
    }, []);

    const countYes = testAnswers.filter(a => a === true).length;
    
    // ==================== RENDER ====================
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
            
            {/* Animated Background Orbs - Premium */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Grain Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
            />

            <ProgressBar 
                completed={phaseState.completedPhases.size} 
                total={totalPhases} 
            />

            {/* Confetti Premium */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-4xl animate-ping"
                                style={{
                                    left: `${50 + Math.cos((i * Math.PI * 2) / 12) * 30}%`,
                                    top: `${50 + Math.sin((i * Math.PI * 2) / 12) * 30}%`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: '1.5s'
                                }}
                            >
                                {['🎉', '✨', '🌟', '💫'][i % 4]}
                            </div>
                        ))}
                    </div>
                    <div className="text-8xl animate-bounce z-10">🎊</div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid lg:grid-cols-4 gap-8">
                    
                    {/* Sidebar */}
                    <PhaseNavigator phaseState={phaseState} goToPhase={goToPhase} />

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        
                        {/* Hero Premium */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-1000" />
                            
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />
                                
                                <div className="relative text-center space-y-6">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/50 animate-pulse">
                                        <span className="text-4xl">🎙️</span>
                                    </div>
                                    
                                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 leading-tight tracking-tight">
                                        Paradigmas
                                    </h1>
                                    
                                    <div className="max-w-3xl mx-auto space-y-4">
                                        <p className="text-xl sm:text-2xl text-gray-300 font-medium leading-relaxed">
                                            Cuando algo te sale mal, ¿pensás{' '}
                                            <span className="text-red-400 font-bold">"mala suerte"</span> o{' '}
                                            <span className="text-red-400 font-bold">"lo sabía, no soy para esto"</span>?
                                        </p>
                                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-400/30 rounded-full backdrop-blur-sm">
                                            <Sparkles className="w-5 h-5 text-purple-300" />
                                            <span className="text-lg font-bold text-white">
                                                Esa diferencia lo cambia todo
                                            </span>
                                            <Sparkles className="w-5 h-5 text-fuchsia-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FASE 1: Test Inicial */}
                        <PhaseContainer 
                            phaseNum={1} 
                            title="Pregunta honesta antes de seguir" 
                            icon="🤔"
                            phaseState={phaseState}
                            phaseRefs={phaseRefs}
                        >
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-2xl backdrop-blur-sm">
                                    <Brain className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        No es un test. Es simplemente para que veas si te identificás con algo de esto. 
                                        <span className="block mt-2 text-white font-semibold">Respondé honesto (nadie más lo ve):</span>
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    {testQuestions.map((question, index) => (
                                        <TestQuestion
                                            key={index}
                                            index={index}
                                            question={question}
                                            currentAnswer={testAnswers[index]}
                                            handleAnswer={handleTestAnswer}
                                        />
                                    ))}
                                </div>

                                {showTestResult && (
                                    <div className="mt-8 animate-fade-in-up">
                                        <ContinueButton 
                                            phaseNum={1} 
                                            label="Ver mi resultado" 
                                            onClick={unlockNextPhase}
                                        />
                                    </div>
                                )}
                            </div>
                        </PhaseContainer>

                        {/* FASE 2: Resultado del Test */}
                        <PhaseContainer 
                            phaseNum={2} 
                            title="Tu resultado" 
                            icon="📊"
                            phaseState={phaseState}
                            phaseRefs={phaseRefs}
                        >
                            <div className={`relative group overflow-hidden rounded-3xl ${
                                countYes >= 3 ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400/30' :
                                countYes >= 2 ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/30' :
                                'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30'
                            } border-2 backdrop-blur-xl`}>
                                
                                {/* Glow effect */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                                    countYes >= 3 ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10' :
                                    countYes >= 2 ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10' :
                                    'bg-gradient-to-r from-green-500/10 to-emerald-500/10'
                                }`} />
                                
                                <div className="relative p-8 space-y-6">
                                    <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${
                                        countYes >= 3 ? 'bg-amber-500/20 border border-amber-400/40' :
                                        countYes >= 2 ? 'bg-blue-500/20 border border-blue-400/40' :
                                        'bg-green-500/20 border border-green-400/40'
                                    }`}>
                                        <Target className={`w-5 h-5 ${
                                            countYes >= 3 ? 'text-amber-400' :
                                            countYes >= 2 ? 'text-blue-400' :
                                            'text-green-400'
                                        }`} />
                                        <span className="text-white font-bold text-sm uppercase tracking-wide">
                                            {countYes >= 3 ? 'Área de oportunidad' : countYes >= 2 ? 'Zona de reflexión' : 'Buen punto de partida'}
                                        </span>
                                    </div>

                                    <div className="prose prose-invert prose-lg max-w-none">
                                        {countYes >= 3 && (
                                            <div className="space-y-4 text-gray-200 leading-relaxed">
                                                <p className="text-2xl font-bold text-white flex items-center gap-3">
                                                    <Zap className="w-7 h-7 text-amber-400" />
                                                    Si contestaste "sí" a varias:
                                                </p>
                                                
                                                <p className="text-lg">
                                                    No voy a decirte "tranqui, es normal". Porque sí, es común, pero que sea común no significa que esté bueno.
                                                </p>
                                                
                                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                                    <p className="text-lg">
                                                        Lo que sí te digo: esto no es un diagnóstico de "algo está mal con vos". Es simplemente que en algún momento 
                                                        tu cerebro aprendió a protegerte de una forma que <span className="text-amber-300 font-bold">ahora te limita</span>.
                                                    </p>
                                                </div>
                                                
                                                <p className="text-lg">
                                                    Tipo, cuando eras pibe y evitabas ciertas situaciones porque genuinamente no estabas listo. 
                                                    Pero ahora sos adulto y ese mecanismo sigue activado.
                                                </p>
                                                
                                                <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 rounded-xl">
                                                    <Sparkles className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                                                    <p className="text-lg font-semibold text-white">
                                                        Este módulo no va a "arreglarte". Va a mostrarte cómo funciona ese mecanismo para que vos decidas si querés ajustarlo.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {countYes === 2 && (
                                            <div className="space-y-4 text-gray-200">
                                                <p className="text-2xl font-bold text-white">Interesante:</p>
                                                <p className="text-lg leading-relaxed">
                                                    Hay algunos patrones ahí que capaz nunca miraste de cerca. 
                                                    Seguí leyendo, puede que entiendas algo que no tenías en el radar.
                                                </p>
                                            </div>
                                        )}
                                        {countYes <= 1 && (
                                            <div className="space-y-4 text-gray-200">
                                                <p className="text-2xl font-bold text-white">Bien ahí:</p>
                                                <p className="text-lg leading-relaxed">
                                                    Parece que tenés bastante claridad mental sobre estas cosas. 
                                                    Igual el módulo puede darte un par de herramientas para afinar lo que ya tenés.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <ContinueButton phaseNum={2} label="Entender por qué pasa esto" onClick={unlockNextPhase} />
                            </div>
                        </PhaseContainer>

                        {/* FASE 3: ¿Qué es un paradigma? */}
                        <PhaseContainer phaseNum={3} title="Fijate si te pasa esto" icon="🧩" phaseState={phaseState} phaseRefs={phaseRefs}>
                            <div className="space-y-8">
                                {/* Intro con gradiente */}
                                <div className="space-y-6">
                                    <p className="text-xl text-gray-300 leading-relaxed">
                                        ¿Alguna vez estuviste por mandar un mensaje, aplicar a un laburo o arrancar algo... 
                                        <span className="text-white font-bold"> y justo antes pensaste "mejor no"?</span>
                                    </p>
                                    <p className="text-xl text-gray-300 leading-relaxed">
                                        Y después, cuando no pasó nada, te dijiste:{' '}
                                        <span className="text-red-400 font-bold italic">"Claro, sabía que no iba a funcionar"</span>.
                                    </p>
                                </div>

                                {/* Definición impactante */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                                    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border border-purple-500/30 p-8 rounded-2xl backdrop-blur-xl">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Brain className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-white mb-3">
                                                    Eso. Eso que acabás de sentir leyendo esto tiene un nombre:
                                                </p>
                                                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400">
                                                    Paradigma
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Explicación con cards */}
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                        <span className="text-3xl">🔍</span>
                                        Un paradigma es el filtro con el que mirás todo:
                                    </h3>
                                    
                                    <div className="grid gap-4">
                                        {[
                                            { 
                                                color: 'from-blue-500 to-cyan-500',
                                                text: 'Si creés que sos malo para algo',
                                                result: 'ni lo intentás (o lo intentás esperando fallar)',
                                                icon: '🚫'
                                            },
                                            { 
                                                color: 'from-green-500 to-emerald-500',
                                                text: 'Si creés que la gente no te valora',
                                                result: 'buscás confirmación de eso en cada interacción',
                                                icon: '👥'
                                            },
                                            { 
                                                color: 'from-orange-500 to-red-500',
                                                text: 'Si creés que "ya es tarde para vos"',
                                                result: 'cada año que pasa lo confirma',
                                                icon: '⏰'
                                            }
                                        ].map((item, i) => (
                                            <div key={i} className="group relative">
                                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur`} />
                                                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300">
                                                    <div className="flex items-start gap-4">
                                                        <span className="text-3xl flex-shrink-0">{item.icon}</span>
                                                        <div className="space-y-2 flex-1">
                                                            <p className="text-white font-bold text-lg">
                                                                {item.text}
                                                            </p>
                                                            <div className="flex items-center gap-3">
                                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                                                <p className="text-gray-300">
                                                                    {item.result}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Callout importante */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl" />
                                    <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-400/30 p-8 rounded-2xl backdrop-blur-xl">
                                        <div className="flex items-start gap-4">
                                            <Zap className="w-8 h-8 text-amber-400 flex-shrink-0 animate-pulse" />
                                            <div className="space-y-3">
                                                <p className="text-xl font-black text-white">Acá está el tema:</p>
                                                <p className="text-lg text-gray-200 leading-relaxed">
                                                    No es que seas pesimista. Es que tu cerebro está <span className="text-amber-300 font-bold">configurado</span> para ver una versión de la realidad.
                                                </p>
                                                <p className="text-lg text-gray-200 leading-relaxed">
                                                    Y lo jodido es que cuanto más tiempo operás con ese filtro,{' '}
                                                    <span className="text-orange-300 font-bold">más pruebas encontrás de que "tenés razón"</span>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <ContinueButton phaseNum={3} label="Ver ejemplo concreto" onClick={unlockNextPhase} />
                            </div>
                        </PhaseContainer>

                        {/* FASE 4: Ejemplo Visceral */}
                        <PhaseContainer phaseNum={4} title="Ejemplo concreto" icon="💡" phaseState={phaseState} phaseRefs={phaseRefs}>
                            <div className="space-y-8">
                                {/* Situación */}
                                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 p-8 rounded-3xl backdrop-blur-xl">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-3xl">📱</span>
                                        </div>
                                        <p className="text-2xl font-bold text-white">
                                            Situación: Te llega una llamada de un número que no conocés
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Paradigma A */}
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur" />
                                            <div className="relative bg-white/5 backdrop-blur-sm border border-red-400/30 p-6 rounded-2xl space-y-4 h-full">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                                        <span className="text-xl">🚫</span>
                                                    </div>
                                                    <p className="text-lg font-bold text-red-400">Paradigma A: Desconfianza</p>
                                                </div>
                                                
                                                <div className="space-y-3 text-gray-300">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-red-400 mt-1">→</span>
                                                        <p>Pensás: "Seguro es spam" o "Va a ser algo malo"</p>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-red-400 mt-1">→</span>
                                                        <p>No atendés</p>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-red-400 mt-1">→</span>
                                                        <p className="italic text-red-300">Confirmación: "Menos mal que no atendí, seguro era una boludez"</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Paradigma B */}
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur" />
                                            <div className="relative bg-white/5 backdrop-blur-sm border border-green-400/30 p-6 rounded-2xl space-y-4 h-full">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                        <span className="text-xl">✅</span>
                                                    </div>
                                                    <p className="text-lg font-bold text-green-400">Paradigma B: Curiosidad</p>
                                                </div>
                                                
                                                <div className="space-y-3 text-gray-300">
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-green-400 mt-1">→</span>
                                                        <p>Pensás: "No sé quién es, veamos"</p>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-green-400 mt-1">→</span>
                                                        <p>Atendés</p>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <span className="text-green-400 mt-1">→</span>
                                                        <p className="italic text-green-300">Era una oportunidad (o spam, cortás y listo)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Conclusión impactante */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-400/50 p-10 rounded-3xl backdrop-blur-xl text-center space-y-4">
                                        <Lightbulb className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
                                        <p className="text-3xl md:text-4xl font-black text-white leading-tight">
                                            Misma llamada.<br />
                                            Misma realidad.<br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400">
                                                Resultados completamente diferentes.
                                            </span>
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/20 border border-amber-400/30 rounded-full">
                                            <Sparkles className="w-5 h-5 text-amber-400" />
                                            <p className="text-xl font-bold text-amber-300">
                                                Eso es un paradigma en acción
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <ContinueButton phaseNum={4} label="Transformar mis creencias" onClick={unlockNextPhase} />
                            </div>
                        </PhaseContainer>

                        {/* FASE 5: Selector de Creencias */}
                        <PhaseContainer phaseNum={5} title="Mismo tema, filtros distintos" icon="🔄" phaseState={phaseState} phaseRefs={phaseRefs}>
                            <div className="space-y-8">
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    Elegí una de estas creencias y fijate cómo cambia cuando la mirás con{' '}
                                    <span className="text-purple-400 font-bold">otro filtro</span>:
                                </p>
                                
                                {/* Grid de creencias con hover effect premium */}
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {limitingBeliefs.map((belief, index) => (
                                        <button
                                            key={belief}
                                            onClick={() => handleBeliefSelect(belief)}
                                            className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 text-left transform hover:scale-105 ${
                                                selectedBelief === belief
                                                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-400/50 shadow-2xl shadow-amber-500/20'
                                                    : 'bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-white/10'
                                            }`}
                                            style={{ 
                                                animationDelay: `${index * 75}ms`,
                                                animation: 'fadeInUp 0.6s ease-out both'
                                            }}
                                        >
                                            {selectedBelief === belief && (
                                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity" />
                                            )}
                                            <div className="relative flex items-start gap-3">
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                                    selectedBelief === belief 
                                                        ? 'bg-amber-500/30 text-amber-300' 
                                                        : 'bg-white/10 text-gray-400 group-hover:text-purple-400'
                                                }`}>
                                                    {selectedBelief === belief ? <Check className="w-5 h-5" /> : <span className="font-bold">{index + 1}</span>}
                                                </div>
                                                <p className={`text-base font-semibold ${
                                                    selectedBelief === belief ? 'text-white' : 'text-gray-300 group-hover:text-white'
                                                }`}>
                                                    {belief}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Resultado de transformación */}
                                {showBeliefResult && selectedBelief && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-xl" />
                                            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl space-y-8">
                                                
                                                {/* Creencia limitante */}
                                                <div className="flex items-start gap-6">
                                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                                                        <span className="text-3xl">🔴</span>
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <p className="text-sm font-bold text-red-400 uppercase tracking-wide">Lo que venías creyendo</p>
                                                        <p className="text-2xl font-bold text-white leading-tight">
                                                            {selectedBelief}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                {/* Separador animado */}
                                                <div className="flex items-center justify-center py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400" />
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50 animate-pulse" />
                                                            <ChevronRight className="relative w-10 h-10 text-purple-400 animate-pulse" />
                                                        </div>
                                                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-400" />
                                                    </div>
                                                </div>
                                                
                                                {/* Creencia potenciadora */}
                                                <div className="flex items-start gap-6">
                                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 animate-pulse">
                                                        <span className="text-3xl">🟢</span>
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <p className="text-sm font-bold text-green-400 uppercase tracking-wide">Mismo tema, otro filtro</p>
                                                        <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 leading-tight">
                                                            {empoweringBeliefs[selectedBelief]}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <ContinueButton phaseNum={5} label="Crear mi plan de acción" onClick={unlockNextPhase} />
                                    </div>
                                )}
                            </div>
                        </PhaseContainer>

                        {/* FASE 6: Plan de Acción */}
                        {selectedBelief && (
                            <PhaseContainer phaseNum={6} title="Tu plan de 7 días" icon="📱" phaseState={phaseState} phaseRefs={phaseRefs}>
                                <div className="space-y-8">
                                    {/* Frase de transformación destacada */}
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl opacity-50 blur-2xl group-hover:opacity-75 transition-opacity duration-500" />
                                        <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-2 border-green-400/30 p-8 rounded-3xl">
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                                    <Target className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-green-400 uppercase tracking-wide mb-2">Tu frase de transformación</p>
                                                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 leading-tight">
                                                        "{empoweringBeliefs[selectedBelief]}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pasos del plan */}
                                    <div className="grid gap-5">
                                        {[
                                            {
                                                step: 1,
                                                title: "Configurá tu alarma",
                                                description: "Guardate una alarma en el celu con esta frase de nombre. Que suene todos los días a una hora random.",
                                                icon: "⏰",
                                                color: "from-blue-500 to-cyan-500"
                                            },
                                            {
                                                step: 2,
                                                title: "Cuando suene, hacé esto",
                                                description: "No la repitas como robot. Leela y preguntate:",
                                                highlight: "\"¿En qué cosa chiquita de hoy puedo ver esto?\"",
                                                icon: "🤔",
                                                color: "from-purple-500 to-fuchsia-500"
                                            },
                                            {
                                                step: 3,
                                                title: "Ejemplo práctico",
                                                description: "Si tu frase es \"Estoy aprendiendo cada día\", cuando suene pensá: \"¿Qué aprendí hoy, aunque sea algo pelotudo?\"",
                                                subtext: "(tipo \"aprendí que el café frío me cae mal\" cuenta)",
                                                icon: "💡",
                                                color: "from-amber-500 to-orange-500"
                                            }
                                        ].map((item, i) => (
                                            <div key={i} className="relative group">
                                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur`} />
                                                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
                                                    <div className="flex items-start gap-5">
                                                        <div className="flex-shrink-0">
                                                            <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg mb-2`}>
                                                                <span className="text-2xl">{item.icon}</span>
                                                            </div>
                                                            <div className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                                                <span className="text-lg font-black text-white">{item.step}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 space-y-2">
                                                            <p className="text-xl font-bold text-white">{item.title}</p>
                                                            <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                                            {item.highlight && (
                                                                <p className="text-lg font-bold text-purple-300 italic pl-4 border-l-2 border-purple-400">
                                                                    {item.highlight}
                                                                </p>
                                                            )}
                                                            {item.subtext && (
                                                                <p className="text-sm text-gray-400 italic">{item.subtext}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Nota importante */}
                                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-400/30 p-6 rounded-2xl backdrop-blur-sm">
                                        <div className="flex items-start gap-4">
                                            <Sparkles className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                                            <div className="space-y-2">
                                                <p className="text-lg font-bold text-white">¿Por qué 7 días y no 21?</p>
                                                <p className="text-gray-300 leading-relaxed">
                                                    Porque 21 días suena a compromiso de gym en enero. 7 días suena a "puedo hacer esto". 
                                                    Y si después de una semana funciona, lo vas a seguir solo. Si no, al menos probaste.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <ContinueButton phaseNum={6} label="Reflexión personal" onClick={unlockNextPhase} />
                                </div>
                            </PhaseContainer>
                        )}

                        {/* FASE 7: Reflexión Personal */}
                        <PhaseContainer phaseNum={7} title="Tu turno de reflexionar" icon="✍️" phaseState={phaseState} phaseRefs={phaseRefs}>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-400/20 rounded-2xl">
                                    <Brain className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        ¿Hay algo que te repetís seguido y que capaz te está cagando?{' '}
                                        <span className="text-white font-bold">Escribilo acá abajo.</span>
                                        <span className="block mt-2 text-gray-400 text-base">
                                            A veces solo el hecho de ponerlo en palabras ya cambia algo.
                                        </span>
                                    </p>
                                </div>
                                
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl opacity-20 group-focus-within:opacity-40 transition-opacity blur" />
                                    <textarea
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Ej: No puedo aprender a programar porque..."
                                        className="relative w-full p-6 bg-white/5 backdrop-blur-sm border-2 border-white/10 focus:border-purple-400/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 min-h-[160px] text-lg text-white placeholder-gray-500 transition-all duration-300 resize-none"
                                    />
                                </div>

                                {userInput && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-purple-400/30 rounded-3xl p-8">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Lightbulb className="w-7 h-7 text-purple-400" />
                                                <p className="text-xl font-bold text-white">
                                                    Preguntate esto (en serio, tomate un minuto):
                                                </p>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                {[
                                                    "¿Desde cuándo pienso esto? ¿Me lo dijeron o lo concluí yo?",
                                                    "¿Es una verdad universal o una interpretación mía de algo que pasó?",
                                                    "¿Cómo lo diría alguien que cree en sí mismo? (no hace falta que lo creas, solo pensá cómo lo diría)",
                                                    "¿Hubo alguna vez algo que contradice esta creencia? Aunque sea chiquito."
                                                ].map((question, i) => (
                                                    <div key={i} className="group/item relative">
                                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl opacity-0 group-hover/item:opacity-20 transition-opacity blur" />
                                                        <div className="relative flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                                                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
                                                                {i + 1}
                                                            </div>
                                                            <p className="text-gray-200 leading-relaxed pt-1">{question}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-10">
                                <ContinueButton phaseNum={7} label="Ir al cierre" onClick={unlockNextPhase} />
                            </div>
                        </PhaseContainer>

                        {/* FASE 8: Cierre + Bonus */}
                        <PhaseContainer phaseNum={8} title="Para cerrar" icon="🎯" phaseState={phaseState} phaseRefs={phaseRefs}>
                            <div className="space-y-8">
                                {/* Mensaje principal */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 rounded-3xl opacity-50 blur-2xl group-hover:opacity-75 transition-opacity duration-1000" />
                                    <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-400/30 p-12 rounded-3xl text-center space-y-6">
                                        <div className="flex justify-center mb-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse">
                                                <Target className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                        
                                        <p className="text-4xl md:text-5xl font-black text-white leading-tight">
                                            Cambiar cómo pensás no es lo mismo que{' '}
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">
                                                "pensar positivo"
                                            </span>
                                        </p>
                                        
                                        <p className="text-2xl text-gray-200 font-medium leading-relaxed max-w-3xl mx-auto">
                                            Es ver las mismas cosas de siempre y darte cuenta de que hay{' '}
                                            <span className="text-blue-300 font-bold">otra forma de leerlas</span>.
                                        </p>
                                        
                                        <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent my-8" />
                                        
                                        <p className="text-xl text-blue-200 leading-relaxed max-w-2xl mx-auto">
                                            No te va a cambiar la vida en una semana. Pero en seis meses, cuando mires para atrás, 
                                            vas a ver que empezaste a tomar decisiones distintas{' '}
                                            <span className="text-white font-bold">sin darte cuenta</span>.
                                        </p>
                                        
                                        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm">
                                            <Sparkles className="w-6 h-6 text-blue-300" />
                                            <p className="text-2xl font-black text-white">
                                                Y eso sí te cambia la vida
                                            </p>
                                            <Sparkles className="w-6 h-6 text-purple-300" />
                                        </div>
                                    </div>
                                </div>

                                {/* Bonus IA */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
                                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-green-400/30 rounded-3xl overflow-hidden">
                                        <div className="p-8 space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                                    <span className="text-3xl">🤖</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-green-400 uppercase tracking-wide">Bonus</p>
                                                    <p className="text-2xl font-bold text-white">Usá IA para autoconocimiento</p>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                Si querés ir más profundo en entender tus propios patrones, probá este prompt con ChatGPT, Claude o tu asistente favorito:
                                            </p>
                                            
                                            <div className="bg-slate-950/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                                                <p className="text-gray-300 leading-relaxed font-mono text-sm">
                                                    Ayudame a ver qué creencias sobre mí mismo podrían estar frenándome sin que me dé cuenta. 
                                                    Basate en cómo hablo de mí, de mis hábitos y resultados. 
                                                    Después, charlemos cómo podría verlo distinto. Sé directo pero amigable.
                                                </p>
                                            </div>
                                            
                                            <button 
                                                onClick={copyPrompt}
                                                className="group/btn w-full relative overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl opacity-100 group-hover/btn:opacity-90 transition-opacity" />
                                                <div className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-lg">
                                                    {copiedPrompt ? (
                                                        <>
                                                            <Check className="w-6 h-6" />
                                                            <span>¡Copiado al portapapeles!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-2xl">📋</span>
                                                            <span>Copiar prompt</span>
                                                        </>
                                                    )}
                                                </div>
                                            </button>
                                            
                                            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-400/20 rounded-xl">
                                                <Lightbulb className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-gray-300">
                                                    <span className="font-bold text-white">Tip pro:</span> Cuanto más honesto seas en tu conversación, más útil va a ser el feedback que recibas.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Módulo completado */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl opacity-50 blur-2xl animate-pulse" />
                                    <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-400/50 p-12 rounded-3xl text-center">
                                        <div className="space-y-6">
                                            <div className="flex justify-center">
                                                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/50 animate-bounce">
                                                    <span className="text-5xl">🎉</span>
                                                </div>
                                            </div>
                                            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                                                ¡Módulo completado!
                                            </p>
                                            <p className="text-xl text-gray-300">
                                                Has dado el primer paso para reconfigurar tus paradigmas
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PhaseContainer>
                    </div>
                </div>
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

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }

                /* Smooth scrolling */
                html {
                    scroll-behavior: smooth;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 10px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }

                ::-webkit-scrollbar-thumb {
                    background: rgba(147, 51, 234, 0.5);
                    border-radius: 5px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(147, 51, 234, 0.7);
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
};