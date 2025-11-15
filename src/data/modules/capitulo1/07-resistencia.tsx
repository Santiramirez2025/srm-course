import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, Lock, Unlock, Flame, Zap, Target, AlertTriangle, 
  CheckCircle2, XCircle, Sparkles, TrendingUp, Award,
  ChevronRight, Eye, Gift, Trash2, Brain, Heart
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Resistance {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  gradient: string;
  intensity: 'low' | 'medium' | 'high';
  category: 'emotional' | 'mental' | 'behavioral';
}

interface ResistanceSelection {
  id: string;
  recognitionLevel: number; // 1-5
}

export const ResistenciaContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'assessment' | 'situation' | 'analysis' | 'complete'>('intro');
  const [selectedResistances, setSelectedResistances] = useState<ResistanceSelection[]>([]);
  const [personalSituation, setPersonalSituation] = useState('');
  const [awarenessScore, setAwarenessScore] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [hoveredResistance, setHoveredResistance] = useState<string | null>(null);

  const resistanceTypes: Resistance[] = [
    { 
      id: 'miedo', 
      icon: '😨', 
      title: 'Miedo', 
      description: 'No hacés lo que sabés que tenés que hacer... por miedo a hacerlo mal. O peor: ¡a hacerlo bien!',
      color: 'from-red-500 to-rose-500',
      gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
      intensity: 'high',
      category: 'emotional'
    },
    { 
      id: 'gratificacion', 
      icon: '⚡', 
      title: 'Gratificación instantánea', 
      description: 'Elegís el placer rápido (scroll, comida, distracciones) antes que el resultado que toma tiempo',
      color: 'from-orange-500 to-amber-500',
      gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
      intensity: 'high',
      category: 'behavioral'
    },
    { 
      id: 'duda', 
      icon: '❓', 
      title: 'Duda', 
      description: 'No avanzás porque no creés que podés. Y esa creencia te paraliza',
      color: 'from-purple-500 to-violet-500',
      gradient: 'from-purple-500/20 via-violet-500/20 to-indigo-500/20',
      intensity: 'medium',
      category: 'mental'
    },
    { 
      id: 'ansiedad', 
      icon: '😰', 
      title: 'Ansiedad', 
      description: 'Postergás porque hacerlo te incomoda. Entonces evitás',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
      intensity: 'high',
      category: 'emotional'
    },
    { 
      id: 'racionalizacion', 
      icon: '🧠', 
      title: 'Racionalización', 
      description: 'Le ponés lógica a una excusa emocional. Pero en el fondo... sabés que te estás mintiendo',
      color: 'from-indigo-500 to-blue-500',
      gradient: 'from-indigo-500/20 via-blue-500/20 to-cyan-500/20',
      intensity: 'medium',
      category: 'mental'
    },
    { 
      id: 'aprender', 
      icon: '📚', 
      title: '"Aprender más"', 
      description: 'Te convencés de que necesitás saber más. Pero lo que te falta no es información, es acción',
      color: 'from-emerald-500 to-green-500',
      gradient: 'from-emerald-500/20 via-green-500/20 to-teal-500/20',
      intensity: 'medium',
      category: 'behavioral'
    },
    { 
      id: 'investigar', 
      icon: '🔍', 
      title: '"Investigar más"', 
      description: 'Otro video. Otra guía. Otro curso. Pero nunca empezás',
      color: 'from-teal-500 to-cyan-500',
      gradient: 'from-teal-500/20 via-cyan-500/20 to-blue-500/20',
      intensity: 'medium',
      category: 'behavioral'
    },
    { 
      id: 'comodidad', 
      icon: '🛋️', 
      title: 'Comodidad', 
      description: 'Estás tan a gusto que el cambio te parece una amenaza',
      color: 'from-lime-500 to-green-500',
      gradient: 'from-lime-500/20 via-green-500/20 to-emerald-500/20',
      intensity: 'low',
      category: 'emotional'
    },
    { 
      id: 'perfeccionismo', 
      icon: '🎯', 
      title: 'Perfeccionismo', 
      description: 'Esperás que todo esté perfecto. Spoiler: Nunca lo va a estar',
      color: 'from-pink-500 to-rose-500',
      gradient: 'from-pink-500/20 via-rose-500/20 to-red-500/20',
      intensity: 'high',
      category: 'mental'
    },
    { 
      id: 'esperar', 
      icon: '⏳', 
      title: 'Esperar', 
      description: 'Creés que el universo tiene que moverse primero. Pero sos vos el que tiene que dar el primer paso',
      color: 'from-amber-500 to-orange-500',
      gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
      intensity: 'medium',
      category: 'behavioral'
    },
    { 
      id: 'justificacion', 
      icon: '🧾', 
      title: 'Justificación', 
      description: 'Te contás una historia coherente... para no admitir que te falta coraje',
      color: 'from-slate-500 to-gray-500',
      gradient: 'from-slate-500/20 via-gray-500/20 to-zinc-500/20',
      intensity: 'medium',
      category: 'mental'
    },
    { 
      id: 'distracciones', 
      icon: '🧨', 
      title: 'Distracciones', 
      description: 'Siempre hay algo más "urgente". Pero lo importante, sigue en pausa',
      color: 'from-fuchsia-500 to-pink-500',
      gradient: 'from-fuchsia-500/20 via-pink-500/20 to-rose-500/20',
      intensity: 'high',
      category: 'behavioral'
    },
    { 
      id: 'apoyo', 
      icon: '🧍‍♂️', 
      title: 'Falta de apoyo', 
      description: 'Decís que te falta motivación. Pero lo que te falta es decisión',
      color: 'from-sky-500 to-blue-500',
      gradient: 'from-sky-500/20 via-blue-500/20 to-indigo-500/20',
      intensity: 'low',
      category: 'emotional'
    },
    { 
      id: 'vulnerabilidad', 
      icon: '😶‍🌫️', 
      title: 'Vulnerabilidad', 
      description: 'Te da miedo el juicio ajeno, así que ni te mostrás',
      color: 'from-violet-500 to-purple-500',
      gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
      intensity: 'high',
      category: 'emotional'
    },
    { 
      id: 'adiccion', 
      icon: '🔁', 
      title: 'Adicción', 
      description: 'Elegís placer compulsivo en vez de progreso real',
      color: 'from-red-500 to-orange-500',
      gradient: 'from-red-500/20 via-orange-500/20 to-amber-500/20',
      intensity: 'high',
      category: 'behavioral'
    },
    { 
      id: 'critica', 
      icon: '🗣️', 
      title: 'Crítica', 
      description: 'Atacás a los que hacen... para no tener que admitir que vos no lo estás haciendo',
      color: 'from-rose-500 to-pink-500',
      gradient: 'from-rose-500/20 via-pink-500/20 to-fuchsia-500/20',
      intensity: 'medium',
      category: 'behavioral'
    },
    { 
      id: 'negacion', 
      icon: '🙈', 
      title: 'Negación', 
      description: 'Fingís que no pasa nada. Pero sabés que sí',
      color: 'from-gray-500 to-slate-500',
      gradient: 'from-gray-500/20 via-slate-500/20 to-zinc-500/20',
      intensity: 'low',
      category: 'mental'
    },
    { 
      id: 'drama', 
      icon: '🎭', 
      title: 'Drama', 
      description: 'Creás caos inconsciente... para tener una excusa para no avanzar',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
      intensity: 'medium',
      category: 'emotional'
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => p.life > 0).map(p => ({...p, life: p.life - 1}));
        if (Math.random() > 0.8 && filtered.length < 20) {
          filtered.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            life: 100,
            speed: Math.random() * 1.5 + 0.5
          });
        }
        return filtered;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const toggleResistance = useCallback((id: string) => {
    setSelectedResistances(prev => {
      const exists = prev.find(r => r.id === id);
      if (exists) {
        return prev.filter(r => r.id !== id);
      } else {
        // Calculate awareness score increase
        setAwarenessScore(s => s + 10);
        return [...prev, { id, recognitionLevel: 3 }];
      }
    });
  }, []);

  const generatePrompt = useCallback(() => {
    const selectedNames = selectedResistances.map(sel => {
      const resistance = resistanceTypes.find(r => r.id === sel.id);
      return resistance ? resistance.title : '';
    }).filter(Boolean);

    const prompt = `🔓 Actuá como un entrenador de élite en alto rendimiento mental.

Quiero que analices mi comportamiento y me señales sin filtro mis tres formas más frecuentes de resistencia, basándote en mis hábitos actuales, excusas, y momentos donde postergo lo importante.

${selectedNames.length > 0 ? `Formas de resistencia que identifico en mí:\n${selectedNames.map(name => `- ${name}`).join('\n')}\n\n` : ''}${personalSituation ? `Situación actual donde postergo:\n${personalSituation}\n\n` : ''}Quiero claridad brutal. Dame además una estrategia personalizada para actuar a pesar de ellas, incluso en mis peores días.

Sé directo.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  }, [selectedResistances, personalSituation, resistanceTypes]);

  const getCategoryCount = useCallback((category: Resistance['category']) => {
    return selectedResistances.filter(sel => {
      const resistance = resistanceTypes.find(r => r.id === sel.id);
      return resistance?.category === category;
    }).length;
  }, [selectedResistances, resistanceTypes]);

  const getIntensityCount = useCallback((intensity: Resistance['intensity']) => {
    return selectedResistances.filter(sel => {
      const resistance = resistanceTypes.find(r => r.id === sel.id);
      return resistance?.intensity === intensity;
    }).length;
  }, [selectedResistances, resistanceTypes]);

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-red-400 to-orange-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 100) * 0.6,
              transform: `translateY(-${(100 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 100})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(248, 113, 113, 0.5)'
            }}
          />
        ))}
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
          <div 
            className="text-center space-y-12 max-w-5xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🛑
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 leading-tight">
                  Resistencia
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-red-400 font-bold">
                El enemigo invisible que te mantiene quieto
              </p>
            </div>
            
            {/* Content Card Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook */}
                  <div className="space-y-6">
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Todos enfrentan resistencia.
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                      Pero no todos la enfrentan.
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-red-400 to-transparent" />

                  {/* Key Message */}
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-400/20 backdrop-blur-xl">
                    <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-light">
                      <strong className="text-red-400 font-bold">Elon Musk. Michael Jordan. Mike Tyson.</strong>
                      <br />
                      Todos sintieron resistencia.
                    </p>
                    <p className="text-xl sm:text-2xl text-white mt-6 font-semibold">
                      La diferencia: <span className="text-orange-400">ellos la ven, la reconocen y la enfrentan.</span>
                    </p>
                  </div>

                  {/* Warning Card */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 rounded-2xl border-2 border-amber-400/30 backdrop-blur-xl">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-12 h-12 text-amber-400 flex-shrink-0" />
                        <div>
                          <p className="text-white/90 text-lg leading-relaxed font-light">
                            ¿Vos? Tal vez ni siquiera sabés que está ahí. Porque la resistencia no grita. <strong className="text-amber-300">Susurra.</strong> Se disfraza. Se esconde.
                          </p>
                          <p className="text-xl font-bold text-red-400 mt-4">
                            Y lo peor: se hace pasar por vos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Preview */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-2">
                        18
                      </div>
                      <p className="text-white/60 text-sm font-medium">Formas de resistencia</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
                        100%
                      </div>
                      <p className="text-white/60 text-sm font-medium">Nivel de honestidad</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mb-2">
                        ∞
                      </div>
                      <p className="text-white/60 text-sm font-medium">Impacto en tu vida</p>
                    </div>
                  </div>

                  {/* Mission Statement */}
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-black text-white">
                      Este no es un curso.
                    </p>
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                      Es un espejo.
                    </p>
                    <p className="text-lg text-white/70 font-light">
                      Uno que te muestra de frente lo que lleva años saboteando tus objetivos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => {
                setGameState('assessment');
                setCurrentStep(1);
              }}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Shield className="relative w-7 h-7" />
              <span className="relative">Enfrentar mi resistencia</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              Ahora sí, ya no vas a tener excusas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============= ASSESSMENT SCREEN =============
  if (gameState === 'assessment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Subtle particles */}
        {particles.slice(0, 10).map(particle => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 rounded-full bg-red-400/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life / 200,
              boxShadow: '0 0 4px rgba(248, 113, 113, 0.3)'
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Progress Header */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
                  
                  {/* Score */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-500/30 rounded-2xl blur-xl animate-pulse" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Eye className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                        Puntos de Consciencia
                      </p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                        {awarenessScore}
                      </p>
                    </div>
                  </div>

                  {/* Selected Count */}
                  <div className="flex items-center gap-6 sm:justify-end">
                    <div className="text-right">
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                        Resistencias Identificadas
                      </p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                        {selectedResistances.length}<span className="text-white/30">/{resistanceTypes.length}</span>
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/30 rounded-2xl blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Target className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(selectedResistances.length / resistanceTypes.length) * 100}%`,
                      boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>

                <p className="text-white/50 text-sm mt-4 text-center">
                  {selectedResistances.length === 0 && "Seleccioná las resistencias que reconocés en vos"}
                  {selectedResistances.length > 0 && selectedResistances.length < 5 && "Buen comienzo. Seguí identificando..."}
                  {selectedResistances.length >= 5 && selectedResistances.length < 10 && "Excelente honestidad. Vas por buen camino."}
                  {selectedResistances.length >= 10 && "Nivel de auto-consciencia excepcional 🔥"}
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div 
            className="mb-8 max-w-4xl mx-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl p-6 rounded-2xl border-2 border-orange-400/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Identificá tus resistencias</h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    Hacé click en cada forma de resistencia que reconocés en vos mismo. 
                    <strong className="text-orange-300"> Ser honesto es el único camino.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resistances Grid Premium */}
          <div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            {resistanceTypes.map((resistance, index) => {
              const isSelected = selectedResistances.some(r => r.id === resistance.id);
              const isHovered = hoveredResistance === resistance.id;

              return (
                <div
                  key={resistance.id}
                  className="relative transition-all duration-300"
                  onMouseEnter={() => setHoveredResistance(resistance.id)}
                  onMouseLeave={() => setHoveredResistance(null)}
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateX(0)' : 'translateX(-30px)',
                    transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    className={`absolute -inset-1 bg-gradient-to-r ${resistance.color} rounded-2xl transition-all duration-500 ${
                      isSelected 
                        ? 'opacity-40 blur-xl' 
                        : isHovered
                          ? 'opacity-20 blur-lg'
                          : 'opacity-0'
                    }`}
                  />

                  <button
                    onClick={() => toggleResistance(resistance.id)}
                    className={`relative w-full text-left cursor-pointer transform transition-all duration-300 ${
                      isHovered ? 'scale-[1.02]' : ''
                    }`}
                  >
                    <div className={`bg-gradient-to-br ${resistance.gradient} backdrop-blur-2xl rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      isSelected 
                        ? 'border-white/30 shadow-2xl' 
                        : 'border-white/10 shadow-xl hover:border-white/20'
                    }`}>
                      
                      <div className="p-5">
                        <div className="flex items-start gap-4 mb-3">
                          {/* Icon */}
                          <div className={`flex-shrink-0 transition-all duration-500 ${
                            isHovered ? 'scale-110 rotate-6' : ''
                          }`}>
                            <div className="relative">
                              <div className={`absolute inset-0 bg-gradient-to-r ${resistance.color} rounded-xl blur-lg transition-opacity duration-300 ${
                                isSelected ? 'opacity-50' : 'opacity-0'
                              }`} />
                              <div className="relative text-4xl">
                                {resistance.icon}
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-white mb-1 leading-tight">
                              {resistance.title}
                            </h4>
                            <p className="text-white/60 text-sm font-light leading-relaxed">
                              {resistance.description}
                            </p>
                          </div>

                          {/* Status Icon */}
                          <div className="flex-shrink-0">
                            {isSelected ? (
                              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                <div className="w-4 h-4 rounded-full border-2 border-white/30" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Intensity Badge */}
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            resistance.intensity === 'high' 
                              ? 'bg-red-500/20 text-red-300 border border-red-400/30'
                              : resistance.intensity === 'medium'
                                ? 'bg-orange-500/20 text-orange-300 border border-orange-400/30'
                                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                          }`}>
                            <Flame className="w-3 h-3" />
                            {resistance.intensity === 'high' ? 'Alta intensidad' : resistance.intensity === 'medium' ? 'Media' : 'Baja'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Category Analysis */}
          {selectedResistances.length >= 3 && (
            <div 
              className="max-w-5xl mx-auto mb-12 animate-fadeInScale"
              style={{
                animation: 'fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl opacity-20 blur-2xl" />
                
                <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-purple-400" />
                    Tu perfil de resistencia
                  </h3>

                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Heart className="w-6 h-6 text-red-400" />
                        <p className="text-white/60 text-sm font-medium">Emocionales</p>
                      </div>
                      <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                        {getCategoryCount('emotional')}
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Brain className="w-6 h-6 text-purple-400" />
                        <p className="text-white/60 text-sm font-medium">Mentales</p>
                      </div>
                      <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                        {getCategoryCount('mental')}
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-6 h-6 text-orange-400" />
                        <p className="text-white/60 text-sm font-medium">Conductuales</p>
                      </div>
                      <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                        {getCategoryCount('behavioral')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-5 rounded-2xl border border-amber-400/30">
                    <p className="text-white/80 text-center font-light">
                      <strong className="text-amber-300">Insight:</strong> Reconocer estos patrones es el primer paso hacia la libertad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {selectedResistances.length >= 3 && (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setGameState('situation');
                  setCurrentStep(2);
                }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <span className="relative">Continuar con mi análisis</span>
                <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============= SITUATION SCREEN =============
  if (gameState === 'situation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 py-16">
          
          <div 
            className="space-y-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="relative text-7xl">📝</div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                Tu situación actual
              </h2>
              <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Describí una situación concreta donde estés postergando algo importante.
                <strong className="text-orange-400"> Sin filtros. Sin justificaciones.</strong>
              </p>
            </div>

            {/* Input Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                <textarea
                  value={personalSituation}
                  onChange={(e) => setPersonalSituation(e.target.value)}
                  placeholder="Ejemplo: Tengo que lanzar mi servicio, pero sigo 'perfeccionando' la web en vez de salir a vender. Cada día encuentro algo más que 'arreglar' y posterg o las ventas reales..."
                  autoFocus
                  className="w-full bg-white/5 backdrop-blur-xl text-white placeholder-white/40 px-6 py-6 rounded-2xl border-2 border-white/20 focus:border-orange-400 focus:outline-none min-h-[200px] text-lg font-light focus:bg-white/10 transition-all duration-300 resize-none"
                />

                {/* Character counter */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-white/50 text-sm">
                    {personalSituation.length < 30 && "Escribí al menos 30 caracteres para un análisis profundo"}
                    {personalSituation.length >= 30 && personalSituation.length < 100 && "Buen comienzo, seguí..."}
                    {personalSituation.length >= 100 && "Excelente nivel de detalle 👏"}
                  </p>
                  <p className="text-white/30 text-sm">
                    {personalSituation.length} caracteres
                  </p>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl p-8 rounded-3xl border-2 border-blue-400/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                Ejemplos reales de resistencia
              </h3>
              
              <div className="space-y-3">
                {[
                  { situacion: 'Evita empezar el proyecto', resistencia: 'Cree que se va a quemar otra vez... aunque no esté ni cerca' },
                  { situacion: 'Procrastina tareas clave', resistencia: 'Su mente exagera el esfuerzo. Entonces evita tareas importantes' },
                  { situacion: 'Espera el momento perfecto', resistencia: 'Cree que necesita una mañana perfecta para producir (spoiler: no la necesita)' },
                  { situacion: 'Consume más cursos', resistencia: 'Estudia más para no ejecutar' }
                ].map((item, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-blue-300/20">
                    <p className="font-semibold text-white mb-2">{item.situacion}</p>
                    <p className="text-white/60 text-sm italic">→ {item.resistencia}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Button */}
            {personalSituation.trim().length >= 30 && (
              <div className="space-y-6">
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="w-full group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white text-xl font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-[1.02] active:scale-98"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  <Target className="relative w-6 h-6" />
                  <span className="relative">{showAnalysis ? 'Ocultar preguntas' : 'Analizar mi resistencia'}</span>
                </button>

                {/* Analysis Questions */}
                {showAnalysis && (
                  <div 
                    className="animate-fadeInScale"
                    style={{
                      animation: 'fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    <div className="bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/20">
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Brain className="w-8 h-8 text-purple-400" />
                        Preguntas para desenmascarar tu resistencia
                      </h3>
                      
                      <div className="space-y-5">
                        {[
                          { q: '¿Qué estoy evitando realmente?', hint: 'No la tarea en sí, sino el miedo o incomodidad detrás', color: 'blue' },
                          { q: '¿Qué excusa me estoy vendiendo?', hint: 'La historia que me cuento para justificar la postergación', color: 'purple' },
                          { q: '¿Qué pasaría si lo hago mal?', hint: 'El peor escenario real (probablemente no tan terrible)', color: 'green' },
                          { q: '¿Cuál es el primer paso mínimo?', hint: 'La acción más pequeña que puedo hacer HOY', color: 'orange' }
                        ].map((item, index) => (
                          <div key={index} className={`bg-${item.color}-500/10 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-${item.color}-400`}>
                            <p className="font-semibold text-white text-lg mb-2">❓ {item.q}</p>
                            <p className="text-white/60 text-sm font-light">{item.hint}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Continue */}
            {personalSituation.trim().length >= 30 && (
              <div className="flex justify-center pt-6">
                <button
                  onClick={() => {
                    setGameState('complete');
                    setCurrentStep(3);
                  }}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  <span className="relative">Ver mi análisis completo</span>
                  <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============= COMPLETE SCREEN =============
  if (gameState === 'complete') {
    const intensityHigh = getIntensityCount('high');
    const intensityMedium = getIntensityCount('medium');
    const intensityLow = getIntensityCount('low');

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 py-16">
          
          <div 
            className="space-y-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Hero */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Shield className="w-24 h-24 text-purple-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  ✨ Ya no podés vencer
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                    lo que no podés ver
                  </span>
                </h2>
                
                <p className="text-xl sm:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  Este documento no vino a darte motivación barata. Vino a darte algo más valioso: <strong className="text-amber-300">conciencia.</strong>
                </p>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">
                      {awarenessScore}
                    </div>
                    <p className="text-white/60 font-medium">Puntos de consciencia</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-2">
                      {selectedResistances.length}
                    </div>
                    <p className="text-white/60 font-medium">Resistencias identificadas</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                      100%
                    </div>
                    <p className="text-white/60 font-medium">Nivel de honestidad</p>
                  </div>
                </div>

                {/* Insight Cards */}
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-green-400/30">
                    <p className="text-2xl font-bold text-white mb-4">
                      Ver tus propias trampas mentales.
                    </p>
                    <p className="text-xl text-white/80 font-light">
                      Escuchar esa vocecita y decirle: <strong className="text-red-400">"ya no te creo"</strong>.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-amber-400/30">
                    <p className="text-2xl font-bold text-white mb-4">
                      Actuar igual, <strong className="text-amber-300">aunque tiemble la mano</strong>.
                    </p>
                    <p className="text-xl text-white/70 font-light">
                      Eso es lo que hacen los que avanzan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Plan */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl opacity-20 blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-green-400/30">
                <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                  <Zap className="w-10 h-10 text-green-400" />
                  Tu plan de batalla
                </h3>

                <p className="text-2xl text-white/90 mb-8 text-center font-light">
                  La resistencia se vence con <strong className="text-green-400">movimiento</strong>, no con pensamiento.
                </p>

                <div className="space-y-4 max-w-2xl mx-auto">
                  {[
                    'Identificá la resistencia cuando aparece (ahora ya la reconocés)',
                    'Nombrala en voz alta: "Esta es resistencia"',
                    'Hacé el primer paso mínimo AHORA (5 minutos, una llamada, un mensaje)',
                    'Repetí mañana. Y pasado. Hasta que sea un hábito'
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-green-400/20">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg">
                        {index + 1}
                      </div>
                      <p className="flex-1 text-white/90 text-lg pt-2 font-light leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt Generator */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-amber-400/30">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    BONUS: Activación Profunda
                  </h3>
                  <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                    Tu prompt personalizado para un análisis brutal con IA
                  </p>
                </div>

                <button
                  onClick={generatePrompt}
                  className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl px-12 py-6 rounded-2xl hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-2xl mb-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500" />
                  {copiedPrompt ? (
                    <>
                      <CheckCircle2 className="relative w-6 h-6" />
                      <span className="relative">¡Copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Gift className="relative w-6 h-6" />
                      <span className="relative">Copiar prompt personalizado</span>
                    </>
                  )}
                </button>

                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-amber-400/20">
                  <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4 text-center">
                    💡 Tu prompt incluye
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-2">
                        {selectedResistances.length}
                      </div>
                      <p className="text-white/60 text-sm font-light">Resistencias identificadas</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
                        {personalSituation ? '1' : '0'}
                      </div>
                      <p className="text-white/60 text-sm font-light">Situación personal</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mb-2">
                        100%
                      </div>
                      <p className="text-white/60 text-sm font-light">Personalización</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Message */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-400" />
                <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-400" />
              </div>
              
              <p className="text-2xl text-white/70 font-light">
                La resistencia solo pierde fuerza cuando <strong className="text-purple-400">la enfrentás en movimiento</strong>.
              </p>
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

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          .animate-fadeInScale {
            animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export const resistenciaMetadata = {
  id: 7,
  title: "Resistencia",
  type: "document" as const,
  duration: "20 min"
};