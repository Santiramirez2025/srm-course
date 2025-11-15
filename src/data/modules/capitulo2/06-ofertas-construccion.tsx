import React, { useState, useEffect, useCallback } from 'react';
import { 
  Target, Compass, TrendingUp, CheckCircle2, ChevronRight,
  Eye, Lightbulb, AlertTriangle, Zap, Heart, Users,
  DollarSign, Award, Star, Brain, Gift, Rocket,
  Search, ArrowRight, Flame, Shield, Sparkles,
  Copy, Check, Activity, TrendingDown, AlertCircle,
  Layers, Focus, BarChart3, Building2, Radio
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Pillar {
  id: number;
  emoji: string;
  nombre: string;
  descripcion: string;
  gradient: string;
}

interface FatalError {
  error: string;
  consecuencia: string;
  solucion: string;
  icon: string;
}

export const OfertasIIConstruccionContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'recap' | 'gap' | 'pillars' | 'errors' | 'pricing' | 'bonus' | 'complete'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Pillars state
  const [checkedPillars, setCheckedPillars] = useState<{ [key: number]: boolean }>({});
  
  // Bonus state
  const [nicheInput, setNicheInput] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const pillars: Pillar[] = [
    {
      id: 1,
      emoji: '🎯',
      nombre: 'Promesa clara y específica',
      descripcion: 'Mostrá el destino, no el camino.',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 2,
      emoji: '⏱️',
      nombre: 'Tiempo estimado para lograrlo',
      descripcion: 'Cuanto más concreto, más creíble.',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 3,
      emoji: '🧭',
      nombre: 'Método paso a paso',
      descripcion: 'Si lo entienden, lo compran.',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 4,
      emoji: '🧠',
      nombre: 'Diferenciación real',
      descripcion: 'Lo común no vende. Lo único, sí.',
      gradient: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 5,
      emoji: '🛟',
      nombre: 'Garantía o red de seguridad',
      descripcion: 'Si compartís el riesgo, el cliente avanza.',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 6,
      emoji: '⚡',
      nombre: 'Filtro claro (polarización)',
      descripcion: 'Cuando repelés a quien no querés, atraés con más fuerza a quien sí.',
      gradient: 'from-indigo-500/20 to-purple-500/20'
    },
    {
      id: 7,
      emoji: '💰',
      nombre: 'Precio basado en el valor',
      descripcion: 'Cuando resolvés algo importante, el precio deja de importar.',
      gradient: 'from-yellow-500/20 to-amber-500/20'
    }
  ];

  const fatalErrors: FatalError[] = [
    {
      error: 'Copiar sin pensar',
      consecuencia: 'te volvés invisible',
      solucion: 'Lo que funciona para otros puede no tener alma para tu público. No imites. Interpretá.',
      icon: '📋'
    },
    {
      error: 'Jugar a lo seguro',
      consecuencia: 'no generás confianza',
      solucion: 'Una oferta tibia no transmite autoridad. La gente sigue a quien se la juega, no a quien duda.',
      icon: '🥶'
    },
    {
      error: 'Hablar complicado',
      consecuencia: 'confundís, perdés',
      solucion: 'Si tu mensaje no se entiende en 5 segundos, se pierde para siempre.',
      icon: '🤯'
    },
    {
      error: 'No hablar su idioma',
      consecuencia: 'no hay conexión',
      solucion: 'Usar lenguaje genérico es como gritar en una sala vacía. Conectá con sus palabras.',
      icon: '🗣️'
    },
    {
      error: 'Empezar por el producto',
      consecuencia: 'error fatal',
      solucion: 'Una oferta irresistible no nace del producto, nace del cliente. Primero entendé el dolor.',
      icon: '💀'
    }
  ];

  const multiplierEffects = [
    {
      title: 'Atrae más personas',
      description: 'Porque habla con las palabras exactas que tu cliente usa y siente. Se sienten entendidos.',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Convierte más rápido',
      description: 'Porque elimina dudas, miedos y complicaciones. Todo se ve simple, seguro y claro.',
      icon: Zap,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      title: 'Retiene por más tiempo',
      description: 'Porque entrega lo que promete. Las personas confían y quieren seguir.',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Te deja cobrar más',
      description: 'Porque el valor que perciben es tan alto, que el precio parece barato en comparación.',
      icon: Award,
      color: 'from-purple-500 to-pink-500'
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

  const togglePillar = useCallback((id: number) => {
    setCheckedPillars(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const pillarProgress = useCallback(() => {
    const completed = Object.values(checkedPillars).filter(v => v).length;
    return Math.round((completed / pillars.length) * 100);
  }, [checkedPillars, pillars.length]);

  const copyPrompt = useCallback(() => {
    const prompt = `Quiero que me ayudes a crear una oferta irresistible para [${nicheInput}]. Necesito que incluya: 
- Una promesa transformadora clara,
- Un ángulo único que me diferencie de mi competencia,
- Una justificación lógica del valor,
- Una garantía sólida o red de seguridad,
- Una razón para actuar ahora.
También quiero que hables con el tono y lenguaje que usa ese cliente cuando expresa su dolor y su deseo. Quiero que se sienta comprendido y urgido a tomar acción. Dame varias opciones si es posible.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  }, [nicheInput]);

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 120) * 0.6,
              transform: `translateY(-${(120 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 120})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(168, 85, 247, 0.5)'
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
                <p className="text-purple-300 font-bold text-sm uppercase tracking-wider">
                  Módulo 5B · Parte 2 de 2
                </p>
              </div>
            </div>

            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🏗️
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 leading-tight">
                  Construcción
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 leading-tight">
                  y Ejecución
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-purple-400 font-bold">
                Ahora que entendés la psicología, construí tu oferta irresistible
              </p>
            </div>
            
            {/* Main Hook Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Building2 className="w-16 h-16 text-purple-400" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white text-center mb-6">
                      🎯 De la Teoría a la Práctica
                    </h3>
                    
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Ya dominás la psicología. Ahora es momento de <strong className="text-purple-400">construir ofertas</strong> que 
                      <strong className="text-pink-400"> vendan solas</strong>.
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

                  {/* Key Insight */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-pink-500/10 to-red-500/10 p-8 rounded-2xl border-2 border-pink-400/30 backdrop-blur-xl text-center">
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400 leading-tight">
                        💡 Una gran oferta no persigue clientes.
                        <br />
                        Los atrae, convierte y retiene con naturalidad.
                      </p>
                    </div>
                  </div>

                  {/* What You'll Build */}
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      🛠️ Vas a construir:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { icon: '🏛️', text: 'Los 7 Pilares Irresistibles' },
                        { icon: '🚫', text: 'Cómo Evitar Errores Letales' },
                        { icon: '💵', text: 'Filosofía de Precio Premium' },
                        { icon: '🤖', text: 'Prompt IA para tu Oferta' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
                          <span className="text-3xl">{item.icon}</span>
                          <p className="text-white font-medium">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => setGameState('recap')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Rocket className="relative w-7 h-7" />
              <span className="relative">Empezar a construir</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              La mejor oferta gana el mercado. 🏆
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

  // ============= RECAP SCREEN =============
  if (gameState === 'recap') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
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
              📚 Recap Rápido: Lo que ya sabés
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Recordemos los fundamentos antes de construir
            </p>
          </div>

          {/* Recap Cards */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: 'Las 6 Fuerzas',
                  desc: 'Impulso, Meta, Problema, Dolor, Acción, Confianza',
                  icon: '🔥',
                  color: 'from-red-500 to-orange-500'
                },
                {
                  title: 'Las 3 Llaves',
                  desc: 'Tu Oferta, Vos, Tus Clientes',
                  icon: '🔒',
                  color: 'from-cyan-500 to-blue-500'
                },
                {
                  title: 'El Umbral de Acción',
                  desc: 'Dolor × Confianza = Decisión',
                  icon: '🧮',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative group"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'scale(1)' : 'scale(0.95)',
                    transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`
                  }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-3xl opacity-20 blur-xl`} />
                  
                  <div className="relative bg-white/[0.03] backdrop-blur-2xl p-6 rounded-3xl border border-white/10">
                    <div className="text-5xl mb-4 text-center">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2 text-center">
                      ✓ {item.title}
                    </h3>
                    <p className="text-white/70 text-sm text-center">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insight */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-blue-400/30 text-center">
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 leading-tight">
                  Ahora vamos a usar todo eso para construir ofertas que vendan solas.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('gap')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Entender la brecha A → B</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= GAP SCREEN =============
  if (gameState === 'gap') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
        </div>

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
              🔧 La Brecha que Tu Oferta Debe Cerrar
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Toda oferta exitosa es un puente entre dos puntos
            </p>
          </div>

          {/* The Gap Visualization */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-teal-400/30">
                
                <div className="grid lg:grid-cols-3 gap-6 items-center">
                  {/* Point A */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
                    
                    <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-red-400/30 text-center">
                      <div className="text-7xl mb-4">😰</div>
                      <h3 className="text-2xl font-black text-white mb-4">
                        PUNTO A
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        Un lugar incómodo, doloroso, frustrante
                      </p>
                    </div>
                  </div>

                  {/* The Bridge */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-30 blur-xl animate-pulse" />
                    
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl text-center">
                      <div className="text-5xl mb-4">🌉</div>
                      <h3 className="text-2xl font-black text-white mb-3">
                        TU OFERTA
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        El puente más directo, claro, seguro y atractivo
                      </p>
                    </div>
                  </div>

                  {/* Point B */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
                    
                    <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-green-400/30 text-center">
                      <div className="text-7xl mb-4">🎯</div>
                      <h3 className="text-2xl font-black text-white mb-4">
                        PUNTO B
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        Su meta, su deseo, su estado ideal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Task */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-teal-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-teal-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  💡 Tu tarea como emprendedor:
                </h3>
                
                <div className="space-y-4">
                  {[
                    { num: '1', text: 'Hacer que sientan el dolor de estar en A', icon: '😰' },
                    { num: '2', text: 'Hacer que deseen intensamente llegar a B', icon: '🎯' },
                    { num: '3', text: 'Mostrar que tu oferta es el único puente que vale la pena cruzar', icon: '🌉' }
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                        transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`
                      }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90 leading-relaxed font-light text-lg">
                          {step.text}
                        </p>
                      </div>
                      <span className="text-4xl">{step.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-r from-teal-600 to-cyan-600 backdrop-blur-2xl p-10 rounded-3xl text-center">
                <p className="text-2xl font-bold text-white mb-4">
                  La venta no sucede en el producto.
                </p>
                <p className="text-3xl font-black text-white">
                  Sucede en la historia que le contás sobre cómo va a pasar de A a B gracias a vos.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('pillars')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-teal-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Construir los 7 pilares</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= PILLARS SCREEN =============
  if (gameState === 'pillars') {
    const progress = pillarProgress();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
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
              🏛️ Los 7 Pilares de una Oferta Irresistible
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Una buena oferta se construye como una casa firme: paso a paso
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
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-red-400/30 text-center">
                <p className="text-xl text-white/90 leading-relaxed font-light mb-4">
                  Una buena oferta no se improvisa, se construye con <strong className="text-red-400">estrategia</strong>.
                </p>
                <p className="text-2xl font-bold text-red-300">
                  ⚠️ Si te falta uno de estos pilares… la gente duda, se va o simplemente no compra.
                </p>
              </div>
            </div>
          </div>

          {/* Pillars Checklist */}
          <div 
            className="mb-12 space-y-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            {pillars.map((pillar, index) => (
              <label
                key={pillar.id}
                className="relative group cursor-pointer"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`
                }}
              >
                <div className={`absolute -inset-1 rounded-3xl transition-all duration-300 ${
                  checkedPillars[pillar.id] 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 blur-xl' 
                    : 'opacity-0'
                }`} />

                <div className={`relative bg-gradient-to-br ${pillar.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                  checkedPillars[pillar.id]
                    ? 'border-green-400/30 shadow-xl'
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <input
                        type="checkbox"
                        checked={checkedPillars[pillar.id] || false}
                        onChange={() => togglePillar(pillar.id)}
                        className="mt-2 w-6 h-6 cursor-pointer"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-5xl">{pillar.emoji}</span>
                          <h3 className="text-2xl font-bold text-white">
                            {pillar.nombre}
                          </h3>
                        </div>
                        <p className="text-white/80 leading-relaxed font-light text-lg">
                          {pillar.descripcion}
                        </p>
                      </div>

                      {checkedPillars[pillar.id] && (
                        <div className="flex-shrink-0 animate-fadeIn">
                          <CheckCircle2 className="w-8 h-8 text-green-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* Progress Bar */}
          {progress > 0 && (
            <div 
              className="mb-12 animate-fadeIn"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-indigo-400/30">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-white font-bold text-xl">
                      Fortaleza de tu Oferta:
                    </p>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      {progress}%
                    </p>
                  </div>
                  
                  <div className="relative h-4 bg-white/10 rounded-full overflow-hidden border border-white/20 mb-4">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${progress}%`,
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>

                  <p className="text-center text-white/80 text-lg">
                    {progress < 50 ? '⚠️ Tu oferta necesita más trabajo' :
                     progress < 85 ? '👍 Vas bien, pero podés mejorar' :
                     '🔥 ¡Oferta sólida! Estás listo para vender'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Key Takeaway */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-2xl p-10 rounded-3xl text-center">
                <p className="text-3xl font-black text-white leading-tight">
                  🧲 Una oferta irresistible no necesita perseguir a nadie.
                  <br />
                  <span className="text-white/90 font-light">
                    Atrae sola, genera confianza y convierte con naturalidad.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('errors')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Evitar los errores letales</span>
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

  // ============= ERRORS SCREEN =============
  if (gameState === 'errors') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />
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
              🚫 Los Errores que Matan Ofertas
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Podés tener un gran producto, pero si caés en estos errores...
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
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-slate-600 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-gray-500/10 to-slate-600/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-gray-400/30 text-center">
                <p className="text-2xl text-white/90 leading-relaxed font-light">
                  Podés tener un <strong className="text-red-400">gran producto</strong>, pero si caés en estos errores, 
                  tu oferta va a pasar desapercibida.
                </p>
              </div>
            </div>
          </div>

          {/* Fatal Errors */}
          <div 
            className="mb-12 space-y-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            {fatalErrors.map((error, index) => (
              <div
                key={index}
                className="relative group"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                <div className="relative bg-gradient-to-br from-gray-700/50 to-gray-900/50 backdrop-blur-2xl rounded-3xl border-2 border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
                  
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="text-6xl flex-shrink-0">{error.icon}</div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-red-400 mb-4">
                          ❌ {error.error} → {error.consecuencia}
                        </h3>
                        
                        <div className="bg-green-900/30 backdrop-blur-xl p-5 rounded-2xl border-l-4 border-green-500">
                          <p className="text-white/90 leading-relaxed">
                            ✅ {error.solucion}
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
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-red-900/50 backdrop-blur-2xl p-10 rounded-3xl border-2 border-red-500/40 text-center">
                <p className="text-3xl font-black text-white leading-tight">
                  Evitá estos errores, y ya estarás varios pasos adelante del 90% del mercado.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('pricing')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 via-slate-700 to-gray-900 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-slate-600 to-gray-800 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Dominar filosofía de precios</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= PRICING SCREEN =============
  if (gameState === 'pricing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[150px]" />
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
              💵 Filosofía de Precios de Alto Valor
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              El precio comunica tanto como la oferta misma
            </p>
          </div>

          {/* Myth Buster */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-amber-400/30">
                <p className="text-xl text-white/90 leading-relaxed font-light mb-4 text-center">
                  Muchos creen que para vender más, hay que ser <strong className="text-amber-400">más barato</strong>.
                </p>
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 text-center mb-4">
                  Error.
                </p>
                <p className="text-white/80 text-center text-lg">
                  La gente no busca "lo más barato". Busca lo que <strong className="text-yellow-400">más vale</strong> por lo que paga.
                </p>
              </div>
            </div>
          </div>

          {/* Three Truths */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-amber-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-amber-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  🧠 Tres verdades clave:
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      num: '1',
                      text: 'El precio no solo cobra. También comunica.',
                      detail: 'Si es muy bajo, genera desconfianza. Si está bien posicionado, transmite calidad.'
                    },
                    {
                      num: '2',
                      text: 'No sigas el promedio del mercado.',
                      detail: 'Vos no estás compitiendo por ser "uno más". Estás compitiendo por ser el mejor en la mente de tu cliente ideal.'
                    },
                    {
                      num: '3',
                      text: 'Lo caro se respeta. Lo barato se justifica.',
                      detail: 'Y justificar mata ventas.'
                    }
                  ].map((truth, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                        transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-black text-lg">
                          {truth.num}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-lg mb-2">
                            {truth.text}
                          </p>
                          <p className="text-white/70 leading-relaxed">
                            {truth.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Wrong Way */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-red-400/30 text-center">
                  <div className="text-6xl mb-4">❌</div>
                  <h3 className="text-2xl font-bold text-red-300 mb-4">
                    Vendés lo que ya tenés
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Competís por precio, te posicionás como commodity, y terminás trabajando más por menos.
                  </p>
                </div>
              </div>

              {/* Right Way */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-green-400/30 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-300 mb-4">
                    Creás lo que la gente necesita
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Competís por valor, te posicionás como experto, y cobrás lo que realmente valés.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Multiplier Effect Preview */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-green-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  💥 El Efecto Multiplicador de una Gran Oferta
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {multiplierEffects.map((effect, i) => {
                    const Icon = effect.icon;
                    return (
                      <div
                        key={i}
                        className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10"
                        style={{
                          opacity: mounted ? 1 : 0,
                          transform: mounted ? 'scale(1)' : 'scale(0.95)',
                          transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${effect.color}`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="font-bold text-white">{effect.title}</h4>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {effect.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-green-500/20 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-green-400">
                  <p className="text-green-200 leading-relaxed">
                    <strong className="text-green-300">📈 Apalancamiento Asimétrico:</strong> Invertís poco tiempo en crearla… 
                    y te devuelve resultados enormes, repetibles y escalables.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-r from-amber-600 to-yellow-600 backdrop-blur-2xl p-10 rounded-3xl text-center">
                <p className="text-2xl font-bold text-white mb-3">
                  🎯 Vendé por valor, no por miedo a perder la venta.
                </p>
                <p className="text-3xl font-black text-white">
                  Porque cuando tu oferta es fuerte, el precio se defiende solo.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('bonus')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Desbloquear BONUS IA</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= BONUS SCREEN =============
  if (gameState === 'bonus') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Header */}
          <div 
            className="mb-12 text-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <Sparkles className="w-12 h-12 text-purple-400" />
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                🔓 BONUS: Generador de Ofertas con IA
              </h2>
            </div>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Usá inteligencia artificial para crear tu oferta irresistible
            </p>
          </div>

          {/* Input Section */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/30">
                <label className="block text-white font-bold text-lg mb-4">
                  Primero, escribí tu nicho o cliente ideal:
                </label>
                <input
                  type="text"
                  value={nicheInput}
                  onChange={(e) => setNicheInput(e.target.value)}
                  placeholder="Ej: coaches de vida que recién empiezan"
                  className="w-full bg-white/5 backdrop-blur-xl text-white text-xl placeholder-white/40 px-6 py-5 rounded-2xl border-2 border-purple-300/30 focus:border-purple-400 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Generated Prompt */}
          {nicheInput.trim().length > 3 && (
            <div 
              className="mb-12 animate-fadeIn"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Tu Prompt Personalizado:
                    </h3>
                    <button
                      onClick={copyPrompt}
                      className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          <span>Copiar Prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 mb-6">
                    <p className="text-white/90 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {`Quiero que me ayudes a crear una oferta irresistible para [${nicheInput}]. Necesito que incluya: 
- Una promesa transformadora clara,
- Un ángulo único que me diferencie de mi competencia,
- Una justificación lógica del valor,
- Una garantía sólida o red de seguridad,
- Una razón para actuar ahora.
También quiero que hables con el tono y lenguaje que usa ese cliente cuando expresa su dolor y su deseo. Quiero que se sienta comprendido y urgido a tomar acción. Dame varias opciones si es posible.`}
                    </p>
                  </div>

                  <div className="bg-purple-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-purple-400/40">
                    <p className="text-purple-200 leading-relaxed">
                      <strong className="text-purple-300">💡 Cómo usar:</strong> Copiá este prompt, 
                      pegalo en ChatGPT o Claude, y usá las respuestas para crear una oferta 
                      que resuene profundamente con tu audiencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resonance Section */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-pink-400/30">
                <div className="text-center mb-6">
                  <Radio className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-4">
                    📻 La Sintonía de la Resonancia
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 leading-relaxed mb-6 text-center">
                  Una gran oferta no solo se escucha, <strong className="text-pink-400">se siente</strong>. 
                  Es como sintonizar una radio en la frecuencia exacta del cliente.
                </p>
                
                <div className="bg-gradient-to-r from-pink-100/10 to-rose-100/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                  <p className="text-white/90 text-center leading-relaxed">
                    Cuando hablás con las emociones que no dicen en voz alta —pero que los mueven por dentro— 
                    se genera algo mágico: <strong className="text-pink-300">resonás con ellos.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('complete')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Ver conclusión final</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= COMPLETE SCREEN =============
  if (gameState === 'complete') {
    const progress = pillarProgress();
    const hasNiche = nicheInput.trim().length > 3;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
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
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Award className="w-32 h-32 text-indigo-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  📌 Conclusión Final:
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    La Oferta Gana el Juego
                  </span>
                </h2>
                
                <p className="text-2xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto mb-8">
                  Una oferta poderosa no es casualidad. Es estrategia, empatía y precisión quirúrgica.
                </p>

                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                  <p className="text-xl text-white/90 leading-relaxed">
                    Convertí tu producto en el vehículo más confiable para cruzar la brecha 
                    entre el dolor de tu cliente y su meta soñada.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 backdrop-blur-2xl p-10 rounded-3xl text-center">
                <p className="text-2xl font-bold text-white mb-3">
                  Y recordá siempre:
                </p>
                <p className="text-4xl font-black text-white leading-tight">
                  El que tiene la mejor oferta, no solo gana ventas… gana el mercado.
                </p>
              </div>
            </div>

            {/* What You Mastered + Action Plan */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* What You Mastered */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-green-500/30">
                  <CheckCircle2 className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="font-bold text-2xl mb-4 text-white">Lo que dominás ahora:</h3>
                  <ul className="space-y-3 text-white/80">
                    {[
                      'La psicología completa de compra',
                      'Los 7 pilares de una oferta',
                      'Cómo evitar los errores letales',
                      'La relación producto-oferta',
                      'Filosofía de precios de alto valor',
                      'El efecto multiplicador'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✅</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Plan */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-orange-500/30">
                  <Target className="w-12 h-12 text-orange-400 mb-4" />
                  <h3 className="font-bold text-2xl mb-4 text-white">Tu plan de acción:</h3>
                  <ul className="space-y-3 text-white/80">
                    {[
                      'Aplicá los 7 pilares a tu oferta',
                      'Usá el prompt de IA para versiones',
                      'Testeá con 5-10 clientes reales',
                      'Refiná según feedback',
                      'Aumentá precio conforme crece valor',
                      'Documenta qué funciona mejor'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-orange-400 flex-shrink-0">🎯</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Your Progress */}
            {(progress > 0 || hasNiche) && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-blue-400/30">
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">
                    🎯 Tu Progreso en este Módulo
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center">
                      <p className="text-white/70 mb-3">Pilares completados</p>
                      <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        {progress}%
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center">
                      <p className="text-white/70 mb-3">Prompt generado</p>
                      <p className="text-6xl">
                        {hasNiche ? '✅' : '⏳'}
                      </p>
                    </div>
                  </div>

                  {hasNiche && (
                    <div className="mt-6 bg-blue-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-blue-400/30 text-center animate-fadeIn">
                      <p className="text-blue-300 font-bold text-lg mb-2">
                        🎉 Tu nicho: {nicheInput}
                      </p>
                      <p className="text-white/70">
                        Ya tenés las herramientas para crear una oferta irresistible
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gray-50/5 backdrop-blur-2xl p-10 rounded-3xl border-2 border-white/10 text-center">
                <p className="text-3xl font-bold text-white mb-4">
                  ✅ Ya tenés tu nicho, tu oferta irresistible y la psicología dominada...
                </p>
                <p className="text-2xl text-white/80 mb-6">
                  Ahora es momento de volverse ultra productivo para ejecutar sin dispersión.
                </p>
                <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-xl">
                  Siguiente: Productividad sin Límites →
                </div>
              </div>
            </div>

            {/* Final Message */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-indigo-400" />
                <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-indigo-400" />
              </div>
              
              <p className="text-xl text-white/70">
                Construí tu oferta con confianza. El mercado está esperando. 💪
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

export const ofertasIIConstruccionMetadata = {
  id: 6,
  title: "Ofertas II - Construcción y Ejecución",
  type: "document" as const,
  duration: "25 min"
};

export default OfertasIIConstruccionContent;