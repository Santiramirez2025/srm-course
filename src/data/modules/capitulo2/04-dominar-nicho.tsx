import React, { useState, useEffect, useCallback } from 'react';
import { 
  Target, Compass, TrendingUp, CheckCircle2, ChevronRight,
  Eye, Lightbulb, AlertTriangle, Zap, Heart, Users,
  DollarSign, Award, Star, Brain, Gift, Rocket,
  Search, ArrowRight, Flame, Shield, Sparkles,
  XCircle, BarChart3, Copy, Check, Focus, Layers,
  TrendingDown, AlertCircle
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Boat {
  id: number;
  title: string;
  icon: string;
  effort: string;
  result: string;
  description: string;
  color: string;
  gradient: string;
}

interface Principle {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  example: string;
  color: string;
  gradient: string;
}

interface ChecklistItem {
  id: string;
  area: string;
  icon: string;
  question: string;
}

export const DominarNichoContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'principles' | 'complexity' | 'research' | 'complete'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Boat state
  const [selectedBoat, setSelectedBoat] = useState<number | null>(null);
  
  // Checklist state
  const [checklist, setChecklist] = useState({
    problemas: false,
    deseos: false,
    lenguaje: false,
    objeciones: false
  });
  
  // Research state
  const [nichoInput, setNichoInput] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const boats: Boat[] = [
    {
      id: 1,
      title: 'Barco Equivocado',
      icon: '🚣',
      effort: 'Remar 12 horas/día',
      result: 'Sin avanzar',
      description: 'Nicho saturado, sin diferenciación, competencia feroz',
      color: 'from-red-500 to-orange-500',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 2,
      title: 'Barco Correcto',
      icon: '⛵',
      effort: 'Remar 4 horas/día',
      result: 'Progreso claro',
      description: 'Nicho específico, necesidad real, competencia manejable',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  const principles: Principle[] = [
    {
      id: 1,
      icon: <Focus className="w-8 h-8" />,
      title: 'Enfocarte te da poder',
      description: 'Si querés hablarle a todo el mundo, nadie te presta atención. Es como usar una lupa: cuando concentrás la luz en un punto, podés encender fuego.',
      example: 'Mejor "Ayudo a psicólogos a llevar su consulta online" que "Hago marketing digital"',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 2,
      icon: <Award className="w-8 h-8" />,
      title: 'El especialista genera confianza',
      description: 'La gente no busca a alguien que "hace de todo". Busca a quien realmente entiende su problema específico.',
      example: 'Preferís un cardiólogo para tu corazón, no un médico general',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Más conocimiento = más ventas',
      description: 'Si dominás tu nicho, conocés sus dolores, deseos y lenguaje. Eso te permite vender con más facilidad.',
      example: 'Sabés exactamente qué palabras usar y qué problemas resolver',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 4,
      icon: <Target className="w-8 h-8" />,
      title: 'Sin nicho = tiros al aire',
      description: 'Sin claridad sobre a quién ayudás, perdés tiempo, energía y dinero. Los que se especializan cobran mejor.',
      example: 'Un generalista cobra $300. Un especialista cobra $3000 por lo mismo',
      color: 'from-orange-500 to-amber-500',
      gradient: 'from-orange-500/20 to-amber-500/20'
    }
  ];

  const complexityLevels = [
    { 
      nichos: 1, 
      productos: 1, 
      combinaciones: 1, 
      status: 'Simple y controlado', 
      color: 'green',
      icon: '✅',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    { 
      nichos: 2, 
      productos: 1, 
      combinaciones: 2, 
      status: 'Doble de trabajo', 
      color: 'yellow',
      icon: '⚠️',
      gradient: 'from-yellow-500/20 to-amber-500/20'
    },
    { 
      nichos: 2, 
      productos: 3, 
      combinaciones: 6, 
      status: 'Caos total', 
      color: 'red',
      icon: '🚫',
      gradient: 'from-red-500/20 to-orange-500/20'
    }
  ];

  const checklistItems: ChecklistItem[] = [
    {
      id: 'problemas',
      area: 'Problemas urgentes',
      icon: '⚠️',
      question: '¿Qué los frustra? ¿Qué les hace perder tiempo, plata o energía?'
    },
    {
      id: 'deseos',
      area: 'Deseos ocultos',
      icon: '💭',
      question: '¿Qué quieren en el fondo, aunque no lo digan?'
    },
    {
      id: 'lenguaje',
      area: 'Lenguaje interno',
      icon: '🗣️',
      question: '¿Qué palabras usan exactamente para expresar sus problemas?'
    },
    {
      id: 'objeciones',
      area: 'Objeciones comunes',
      icon: '🤔',
      question: '¿Por qué dudan en comprar? ¿Qué miedos tienen?'
    }
  ];

  const prompts = [
    {
      id: 1,
      title: 'Descubrir Problemas Urgentes',
      icon: '🧠',
      prompt: (niche: string) => `Actuá como un experto en análisis de mercado. ¿Cuáles son los 5 problemas más urgentes que enfrentan hoy las personas que están en ${niche || '[tu nicho]'} y cómo afectan su vida cotidiana o su negocio?`
    },
    {
      id: 2,
      title: 'Entender Deseos Profundos',
      icon: '💡',
      prompt: (niche: string) => `¿Cuáles son los deseos más profundos, emociones ocultas y resultados soñados de las personas en el nicho de ${niche || '[tu nicho]'}? Explicámelo como si yo tuviera que conectar con ellos emocionalmente para ofrecerles una solución.`
    },
    {
      id: 3,
      title: 'Capturar su Lenguaje Real',
      icon: '🗣️',
      prompt: (niche: string) => `¿Qué palabras, frases o expresiones reales suelen usar las personas de ${niche || '[tu nicho]'} cuando hablan de sus problemas o sueños? Dame ejemplos que suenen auténticos y cotidianos.`
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => p.life > 0).map(p => ({...p, life: p.life - 1}));
        if (Math.random() > 0.8 && filtered.length < 25) {
          filtered.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            life: 120,
            speed: Math.random() * 1.5 + 0.5
          });
        }
        return filtered;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const toggleChecklist = useCallback((id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  }, []);

  const checklistProgress = useCallback(() => {
    const completed = Object.values(checklist).filter(v => v).length;
    return Math.round((completed / 4) * 100);
  }, [checklist]);

  const copyPrompt = useCallback((promptText: string, id: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2500);
  }, []);

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 120) * 0.6,
              transform: `translateY(-${(120 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 120})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)'
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
            {/* Chapter Badge */}
            <div className="inline-block">
              <div className="bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20">
                <p className="text-blue-300 font-bold text-sm uppercase tracking-wider">
                  Módulo 4 · El Poder del Especialista
                </p>
              </div>
            </div>

            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🎯
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 leading-tight">
                  Dominar un Nicho
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-cyan-400 font-bold">
                No se trata de remar más fuerte. Se trata de elegir el barco correcto.
              </p>
            </div>
            
            {/* Boat Analogy Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Compass className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white text-center mb-6">
                      🌊 El Barco Es Más Importante Que El Remo
                    </h3>
                    
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Podés trabajar <strong className="text-cyan-400">12 horas al día</strong>, crear contenido, 
                      hacer llamadas y diseñar estrategias…
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                  {/* Problem */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 rounded-2xl border-2 border-red-400/30 backdrop-blur-xl text-center">
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 leading-tight">
                        💥 Pero si estás en el nicho equivocado,
                        <br />
                        todo ese esfuerzo es energía desperdiciada.
                      </p>
                    </div>
                  </div>

                  {/* Two Boats Comparison */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {boats.map((boat, index) => (
                      <div
                        key={boat.id}
                        className="relative group/boat"
                        style={{
                          opacity: mounted ? 1 : 0,
                          transform: mounted ? 'scale(1)' : 'scale(0.95)',
                          transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                        }}
                      >
                        <div className={`absolute -inset-1 bg-gradient-to-r ${boat.color} rounded-3xl opacity-20 group-hover/boat:opacity-30 blur-xl transition-opacity duration-500`} />
                        
                        <div className={`relative bg-gradient-to-br ${boat.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                          boat.color === 'from-red-500 to-orange-500'
                            ? 'border-red-400/30 hover:border-red-400/50'
                            : 'border-green-400/30 hover:border-green-400/50'
                        }`}>
                          <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                              <span className="text-6xl">{boat.icon}</span>
                              <div>
                                <h4 className="text-2xl font-bold text-white mb-1">
                                  {boat.title}
                                </h4>
                                <p className="text-white/60 text-sm">{boat.description}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-white/5 p-4 rounded-xl">
                                <p className="text-white/70 text-sm mb-1">Esfuerzo:</p>
                                <p className="text-white font-bold">{boat.effort}</p>
                              </div>
                              <div className="bg-white/5 p-4 rounded-xl">
                                <p className="text-white/70 text-sm mb-1">Resultado:</p>
                                <p className={`font-bold ${
                                  boat.color === 'from-red-500 to-orange-500' ? 'text-red-400' : 'text-green-400'
                                }`}>
                                  {boat.result}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Insight */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 rounded-2xl border-2 border-amber-400/30 backdrop-blur-xl text-center">
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 leading-tight">
                        💡 "No importa cuánto remes si estás en el barco equivocado."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => setGameState('principles')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Target className="relative w-7 h-7" />
              <span className="relative">Descubrir los principios</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              El especialista siempre gana. 🎯
            </p>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // ============= PRINCIPLES SCREEN =============
  if (gameState === 'principles') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Subtle particles */}
        {particles.slice(0, 10).map(particle => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 rounded-full bg-purple-400/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life / 200,
              boxShadow: '0 0 4px rgba(168, 85, 247, 0.3)'
            }}
          />
        ))}

        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Header */}
          <div 
            className="mb-12 text-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              🔑 Los 4 Principios del Especialista Exitoso
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Por qué enfocarte te da una ventaja injusta
            </p>
          </div>

          {/* Principles Grid */}
          <div 
            className="mb-12 space-y-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            {principles.map((principle, index) => (
              <div
                key={principle.id}
                className="relative group"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${principle.color} rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                
                <div className={`relative bg-gradient-to-br ${principle.gradient} backdrop-blur-2xl rounded-3xl border-2 border-white/10 group-hover:border-white/20 transition-all duration-300`}>
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${principle.color} rounded-2xl flex items-center justify-center shadow-xl`}>
                        {principle.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {principle.title}
                        </h3>
                        <p className="text-white/80 leading-relaxed mb-4 font-light">
                          {principle.description}
                        </p>
                        
                        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10">
                          <p className="text-white/70 text-sm mb-2 font-semibold">
                            Ejemplo:
                          </p>
                          <p className="text-white/90 leading-relaxed font-light">
                            {principle.example}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Takeaway */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-purple-400/30 text-center">
                <div className="text-6xl mb-6">🚀</div>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-tight">
                  Cuanto más te enfocás, más fácil es crecer, ganar bien y destacarte.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('complexity')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Ver por qué menos es más</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= COMPLEXITY SCREEN =============
  if (gameState === 'complexity') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Header */}
          <div 
            className="mb-12 text-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              ⚙️ Por Qué Menos es Más
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              La complejidad mata los negocios
            </p>
          </div>

          {/* Warning */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-orange-400/30">
                <div className="flex items-start gap-4 mb-6">
                  <AlertTriangle className="w-12 h-12 text-orange-400 flex-shrink-0" />
                  <div>
                    <p className="text-xl text-white/90 leading-relaxed font-light mb-4">
                      Cada vez que agregás un nuevo producto o querés hablarle a otro tipo de cliente, 
                      <strong className="text-red-400"> tu negocio se vuelve exponencialmente más difícil de manejar.</strong>
                    </p>
                    <p className="text-white/70 font-light">
                      Tenés que crear nuevos mensajes, nuevas estrategias, sistemas distintos… 
                      y eso consume tiempo, energía y dinero.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Complexity Levels */}
          <div 
            className="mb-12 space-y-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            {complexityLevels.map((level, index) => (
              <div
                key={index}
                className="relative group"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'scale(1)' : 'scale(0.95)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                }}
              >
                <div className={`absolute -inset-1 rounded-3xl transition-all duration-500 ${
                  level.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 blur-xl' :
                  level.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-amber-500 opacity-20 blur-xl' :
                  'bg-gradient-to-r from-red-500 to-orange-500 opacity-30 blur-xl'
                }`} />
                
                <div className={`relative bg-gradient-to-br ${level.gradient} backdrop-blur-2xl rounded-3xl border-2 ${
                  level.color === 'green' ? 'border-green-400/30' :
                  level.color === 'yellow' ? 'border-yellow-400/30' :
                  'border-red-400/30'
                }`}>
                  <div className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl">{level.icon}</span>
                          <div>
                            <p className="text-3xl font-black text-white">
                              {level.nichos} {level.nichos === 1 ? 'Nicho' : 'Nichos'} + {level.productos} {level.productos === 1 ? 'Producto' : 'Productos'}
                            </p>
                            <p className="text-white/60 font-light">
                              = {level.combinaciones} {level.combinaciones === 1 ? 'combinación' : 'combinaciones'}
                            </p>
                          </div>
                        </div>
                        <p className={`text-2xl font-bold ${
                          level.color === 'green' ? 'text-green-400' :
                          level.color === 'yellow' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {level.status}
                        </p>
                      </div>
                      
                      {level.color === 'green' && (
                        <div className="flex-shrink-0 ml-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rule */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-amber-400/30 text-center">
                <div className="text-6xl mb-6">💡</div>
                <p className="text-2xl font-bold text-white mb-4">
                  Regla de Oro para Escalar:
                </p>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 leading-tight">
                  Lo simple crece. Lo complejo se cae.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('research')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Investigar mi nicho</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= RESEARCH SCREEN =============
  if (gameState === 'research') {
    const progress = checklistProgress();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Header */}
          <div 
            className="mb-12 text-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              🔍 Investigación Real del Nicho
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Conocé a tu audiencia como si fueran tus mejores amigos
            </p>
          </div>

          {/* Key Insight */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-indigo-400/30 text-center">
                <p className="text-xl text-white/90 leading-relaxed font-light mb-4">
                  Una vez que elegís un nicho, tu verdadero trabajo recién empieza:
                </p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 leading-tight">
                  Tenés que conocer a esas personas como si fueran tus mejores amigos.
                </p>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/30">
                <h3 className="text-2xl font-bold text-white mb-6">
                  🔑 Checklist de Investigación
                </h3>

                <div className="space-y-4 mb-6">
                  {checklistItems.map((item, index) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-4 cursor-pointer bg-white/5 hover:bg-white/10 p-5 rounded-2xl transition-all duration-300 group/item"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                        transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checklist[item.id as keyof typeof checklist]}
                        onChange={() => toggleChecklist(item.id)}
                        className="mt-1 w-6 h-6 cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{item.icon}</span>
                          <p className="font-bold text-white text-lg">{item.area}</p>
                        </div>
                        <p className="text-white/70 leading-relaxed font-light">
                          {item.question}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {progress > 0 && (
                  <div className="bg-indigo-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-indigo-400/30 animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-bold text-white">Progreso de Investigación:</p>
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                        {progress}%
                      </p>
                    </div>
                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden border border-white/20">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${progress}%`,
                          boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prompts Section */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-green-400/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      BONUS: Prompts para Investigar
                    </h3>
                    <p className="text-white/70">Personalizá con tu nicho</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white/80 font-semibold mb-3">
                    Primero, escribí tu nicho:
                  </label>
                  <input
                    type="text"
                    value={nichoInput}
                    onChange={(e) => setNichoInput(e.target.value)}
                    placeholder="Ej: psicólogos que quieren trabajar online"
                    className="w-full bg-white/5 backdrop-blur-xl text-white text-xl placeholder-white/40 px-6 py-5 rounded-2xl border-2 border-white/20 focus:border-green-400 focus:outline-none transition-all duration-300"
                  />
                </div>

                {nichoInput.trim().length > 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    {prompts.map((prompt, index) => (
                      <div
                        key={prompt.id}
                        className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
                        style={{
                          opacity: mounted ? 1 : 0,
                          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                          transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{prompt.icon}</span>
                            <h4 className="font-bold text-white text-lg">{prompt.title}</h4>
                          </div>
                          <button
                            onClick={() => copyPrompt(prompt.prompt(nichoInput), prompt.id)}
                            className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                          >
                            {copiedPrompt === prompt.id ? (
                              <>
                                <Check className="w-5 h-5" />
                                <span>Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-5 h-5" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10">
                          <p className="text-white/80 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                            {prompt.prompt(nichoInput)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="bg-green-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-green-400/30">
                      <p className="text-green-200 leading-relaxed">
                        <strong className="text-green-300">💡 Cómo usar:</strong> Copiá cada prompt, 
                        pegalo en ChatGPT, y usá las respuestas para conocer a fondo tu nicho.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('complete')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Ver conclusiones finales</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
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

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // ============= COMPLETE SCREEN =============
  if (gameState === 'complete') {
    const progress = checklistProgress();
    const hasNiche = nichoInput.trim().length > 3;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
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
            {/* Epic Hero Section */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-indigo-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Award className="w-32 h-32 text-blue-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  🎯 No Se Trata de
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                    Remar Más Fuerte
                  </span>
                </h2>
                
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-12">
                  Se trata de elegir mejor el barco.
                </p>

                <p className="text-2xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto">
                  El esfuerzo solo no alcanza si estás en la dirección equivocada.
                </p>
              </div>
            </div>

            {/* Real Case: Oscar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl opacity-20 blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-teal-400/30">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-6xl">🚣‍♂️</span>
                  <h3 className="text-3xl font-bold text-white">
                    Caso Real: Mismo Esfuerzo, Mejor Barco
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-red-500/20 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-red-400">
                    <p className="text-red-300 font-bold text-lg mb-3">❌ Barco Equivocado:</p>
                    <p className="text-white/90 leading-relaxed">
                      Oscar ofrecía servicios a abogados durante años. Mandó miles de mensajes, 
                      trabajó muchísimo… pero no tenía resultados. Estaba remando sin avanzar.
                    </p>
                  </div>

                  <div className="bg-green-500/20 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-green-400">
                    <p className="text-green-300 font-bold text-lg mb-3">✅ Barco Correcto:</p>
                    <p className="text-white/90 leading-relaxed">
                      Cambió de nicho. Buscó otro tipo de cliente, ajustó su oferta…
                      Y en menos de 3 meses, ganó mucho más que en años trabajando con abogados.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-8 rounded-2xl text-center">
                    <p className="text-2xl font-black leading-tight">
                      👉 No trabajó más. No se volvió un superhéroe.
                      <br />
                      Simplemente eligió un mejor barco.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Benefits */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-indigo-400/30">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  📌 Enfocar es Escalar
                </h3>

                <p className="text-xl text-white/90 text-center mb-8 leading-relaxed font-light">
                  Cuando te enfocás en un solo tipo de cliente y una sola solución, 
                  todo se vuelve más simple y más rápido:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: '🚀', text: 'Podés crecer sin enredarte' },
                    { icon: '✅', text: 'Cometés menos errores' },
                    { icon: '⚙️', text: 'Automatizás con claridad' },
                    { icon: '👥', text: 'Delegás sin caos' }
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                        transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                      }}
                    >
                      <span className="text-4xl">{benefit.icon}</span>
                      <p className="text-white font-medium text-lg">{benefit.text}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 rounded-2xl text-center">
                  <p className="text-2xl font-bold mb-3">
                    No es cuestión de esforzarte más.
                  </p>
                  <p className="text-3xl font-black">
                    Es cuestión de elegir mejor dónde poner tu esfuerzo.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            {(progress > 0 || hasNiche) && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-2xl" />
                
                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-green-400/30">
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">
                    🎯 Tu Progreso
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center">
                      <p className="text-white/70 mb-3">Investigación completada</p>
                      <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                        {progress}%
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center">
                      <p className="text-white/70 mb-3">Nicho definido</p>
                      <p className="text-6xl">
                        {hasNiche ? '✅' : '⏳'}
                      </p>
                    </div>
                  </div>

                  {hasNiche && (
                    <div className="mt-6 bg-green-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-green-400/30 text-center animate-fadeIn">
                      <p className="text-green-300 font-bold text-lg mb-2">
                        🎉 Tu nicho: {nichoInput}
                      </p>
                      <p className="text-white/70">
                        Ahora tenés las herramientas para dominarlo
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-400" />
                <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-400" />
              </div>
              
              <p className="text-2xl font-bold text-white">
                ✅ Ya entendés el poder de especializarte...
              </p>
              <p className="text-xl text-white/70">
                En el próximo módulo aprenderás a posicionarte como experto
                y atraer a tus clientes ideales.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export const dominarNichoMetadata = {
  id: 4,
  title: "Cómo Dominar un Nicho",
  type: "document" as const,
  duration: "35 min"
};

export default DominarNichoContent;