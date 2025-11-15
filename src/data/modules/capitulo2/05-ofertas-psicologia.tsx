import React, { useState, useEffect, useCallback } from 'react';
import { 
  Target, Compass, TrendingUp, CheckCircle2, ChevronRight,
  Eye, Lightbulb, AlertTriangle, Zap, Heart, Users,
  DollarSign, Award, Star, Brain, Gift, Rocket,
  Search, ArrowRight, Flame, Shield, Sparkles,
  Lock, Unlock, Activity, Focus, Waves
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Force {
  id: number;
  nombre: string;
  emoji: string;
  descripcion: string;
  color: string;
  gradient: string;
}

interface JourneyStep {
  paso: number;
  titulo: string;
  emoji: string;
  descripcion: string;
  nota: string;
}

interface TrustKey {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  sentimiento: string;
  color: string;
  gradient: string;
}

interface PainPool {
  id: number;
  nivel: string;
  nombre: string;
  emoji: string;
  profundidad: number;
  descripcion: string;
  nota: string;
  gradient: string;
}

export const OfertasIPsicologiaContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'forces' | 'journey' | 'trust' | 'pain' | 'threshold' | 'complete'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Forces state
  const [selectedForce, setSelectedForce] = useState<number | null>(null);
  
  // Trust keys state
  const [unlockedKeys, setUnlockedKeys] = useState<number[]>([]);
  
  // Pain pools state
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  
  // Threshold state
  const [painLevel, setPainLevel] = useState(50);
  const [confidenceLevel, setConfidenceLevel] = useState(50);

  const forces: Force[] = [
    {
      id: 1,
      nombre: 'Impulso (Drive)',
      emoji: '🔥',
      descripcion: 'Es la chispa emocional que lo empuja a moverse, el "ya no aguanto más esto" o el "quiero eso con todo mi ser".',
      color: 'from-red-500 to-orange-500',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 2,
      nombre: 'Meta (Goal)',
      emoji: '🎯',
      descripcion: 'Es el "para qué" de todo. Una visión clara, deseable y realista de su futuro ideal.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 3,
      nombre: 'Problema (Problem)',
      emoji: '🧱',
      descripcion: 'Es la barrera que lo frena, aunque tenga ganas. Lo que hace que sus intentos terminen en frustración.',
      color: 'from-orange-500 to-amber-500',
      gradient: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 4,
      nombre: 'Dolor (Pain)',
      emoji: '😣',
      descripcion: 'Es la experiencia emocional de ese problema. No es racional: es visceral. Se siente en el cuerpo, en el día a día.',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 5,
      nombre: 'Acción (Action)',
      emoji: '🩹',
      descripcion: 'Es el parche momentáneo. Lo que hace para calmar la angustia… aunque no sea lo que realmente necesita.',
      color: 'from-yellow-500 to-amber-500',
      gradient: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      id: 6,
      nombre: 'Confianza (Confidence)',
      emoji: '🛡',
      descripcion: 'Es lo que hace que diga: "con esta persona sí me animo". Es credibilidad + conexión emocional.',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  const journeySteps: JourneyStep[] = [
    {
      paso: 1,
      titulo: 'El impulso enciende un deseo',
      emoji: '⚡',
      descripcion: 'Algo interno se enciende. Es como una alarma emocional que dice: "¡Basta!" o "¡Necesito eso ya!"',
      nota: 'Este impulso no siempre se nota en voz alta, pero se manifiesta en búsquedas, en frustraciones internas, en comparaciones con otros.'
    },
    {
      paso: 2,
      titulo: 'El deseo revela un problema',
      emoji: '🔍',
      descripcion: 'Cuando desea algo mejor, se da cuenta de que está lejos. Aparece el "pero" que lo frena.',
      nota: 'El deseo por sí solo no basta. El cliente empieza a ser consciente de lo que le falta. Ahí nace el problema.'
    },
    {
      paso: 3,
      titulo: 'El problema genera incomodidad',
      emoji: '😰',
      descripcion: 'Esa brecha empieza a doler. Lo siente en su día a día, en sus decisiones, en su autoestima.',
      nota: 'La incomodidad no es solo racional, es emocional. Es lo que lo hace decir: "Así no puedo seguir."'
    },
    {
      paso: 4,
      titulo: 'El dolor empuja a la acción',
      emoji: '🏃',
      descripcion: 'El dolor se vuelve insoportable… y entonces actúa. Busca, compara, investiga, se mueve.',
      nota: 'Nadie actúa solo por lógica. Actúan porque algo les duele lo suficiente como para dejar la inercia.'
    },
    {
      paso: 5,
      titulo: 'La confianza desbloquea la decisión',
      emoji: '🔓',
      descripcion: 'Está por decidir, pero hay una última barrera: ¿puedo confiar en vos? ¿en tu método? ¿en mí mismo?',
      nota: 'Confianza no es solo credibilidad técnica. Es emocional: tiene que sentir que vos sos la persona correcta para ayudarlo.'
    }
  ];

  const trustKeys: TrustKey[] = [
    {
      id: 1,
      titulo: 'Tu Oferta',
      subtitulo: 'Lo que decís que hacés',
      descripcion: 'Cuando está bien estructurada, transmite seguridad inmediata. Es concreta, enfocada, clara y valiente.',
      sentimiento: '"Esto es justo lo que necesito, y está hecho para mí."',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 2,
      titulo: 'Vos',
      subtitulo: 'Cómo lo decís y lo transmitís',
      descripcion: 'Las personas no confían en empresas. Confían en personas. Si hablás desde la experiencia, con seguridad, empatía y convicción, el cliente lo siente.',
      sentimiento: '"Si vos confiás tanto en lo que hacés... quizás yo también debería hacerlo."',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 3,
      titulo: 'Tus Clientes',
      subtitulo: 'Lo que otros dicen de vos',
      descripcion: 'Casos de éxito, testimonios, capturas reales, antes y después, historias de transformación.',
      sentimiento: 'Nada genera más confianza que ver que otros ya lograron lo que yo quiero lograr.',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const painPools: PainPool[] = [
    {
      id: 1,
      nivel: 'Superficial',
      nombre: 'Problemas Concretos',
      emoji: '🟣',
      profundidad: 20,
      descripcion: 'Son los dolores evidentes. Los que el cliente reconoce y hasta puede googlear. Es lo que dice en voz alta.',
      nota: 'Esta piscina es superficial, pero es la puerta de entrada.',
      gradient: 'from-purple-500/20 to-violet-500/20'
    },
    {
      id: 2,
      nivel: 'Media',
      nombre: 'Vacíos Emocionales',
      emoji: '🟡',
      profundidad: 40,
      descripcion: 'Deseos silenciosos. No son visibles, pero están todo el tiempo detrás de sus acciones. Son lo que realmente duele.',
      nota: 'Esta es la piscina que genera conexión emocional profunda. Cuando tu mensaje toca esto, la persona siente que le estás hablando a su alma.',
      gradient: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      id: 3,
      nivel: 'Profunda',
      nombre: 'Cargas No Deseadas',
      emoji: '🔴',
      profundidad: 60,
      descripcion: 'Responsabilidades que no eligió, pero que lo aplastan. Siente que no tiene derecho a soltar ni equivocarse.',
      nota: 'Esta piscina es silenciosa pero pesada. El cliente no lo dice, pero lo vive cada día. Y tu oferta puede ser el alivio que espera.',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 4,
      nivel: 'Muy Profunda',
      nombre: 'Deseos No Cumplidos',
      emoji: '🟢',
      profundidad: 80,
      descripcion: 'Metas postergadas, promesas olvidadas, sueños que alguna vez tuvo… y fue dejando por falta de guía, apoyo o tiempo.',
      nota: 'Esta piscina es profunda. Cuando tu oferta le recuerda ese sueño que enterró, se activa algo muy poderoso: el deseo de volver a intentarlo.',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 5,
      nivel: 'Abismal',
      nombre: 'Consecuencias Acumuladas',
      emoji: '⚫',
      profundidad: 100,
      descripcion: 'Es el deterioro silencioso. Lo que se va sumando con el tiempo y lo desgasta por dentro. No explota… pero lo carcome.',
      nota: 'Esta es la piscina más peligrosa. Porque el cliente puede estar al borde de rendirse. Y una buena oferta no solo vende: rescata.',
      gradient: 'from-gray-700/20 to-gray-900/20'
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

  const toggleKey = useCallback((id: number) => {
    setUnlockedKeys(prev => 
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  }, []);

  const thresholdMet = useCallback(() => {
    return (painLevel * confidenceLevel) > 2500;
  }, [painLevel, confidenceLevel]);

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-red-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-orange-400 to-red-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 120) * 0.6,
              transform: `translateY(-${(120 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 120})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(251, 146, 60, 0.5)'
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
                <p className="text-orange-300 font-bold text-sm uppercase tracking-wider">
                  Módulo 5A · Parte 1 de 2
                </p>
              </div>
            </div>

            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🧠
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 leading-tight">
                  Psicología
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 leading-tight">
                  de la Compra
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-orange-400 font-bold">
                Antes de construir tu oferta, entendé cómo piensa y siente tu cliente
              </p>
            </div>
            
            {/* Main Insight Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Brain className="w-16 h-16 text-orange-400" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white text-center mb-6">
                      🚀 El Motor Invisible de tu Negocio
                    </h3>
                    
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Si querés transformar <strong className="text-orange-400">completos desconocidos</strong> en 
                      <strong className="text-red-400"> clientes fieles</strong> de manera sistemática, predecible y escalable...
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

                  {/* Key Insight */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 rounded-2xl border-2 border-red-400/30 backdrop-blur-xl text-center">
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 leading-tight">
                        💥 La oferta es el motor invisible.
                        <br />
                        Sin entender la psicología detrás, todo tu esfuerzo se desperdicia.
                      </p>
                    </div>
                  </div>

                  {/* What You'll Learn */}
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      🧠 Vas a entender:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { icon: '🔥', text: 'Las 6 Fuerzas de la Compra' },
                        { icon: '🔁', text: 'La Ruta Interna del Cliente' },
                        { icon: '🔒', text: 'Las 3 Llaves de la Confianza' },
                        { icon: '😖', text: 'Las 5 Piscinas del Dolor' },
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
              onClick={() => setGameState('forces')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Brain className="relative w-7 h-7" />
              <span className="relative">Descubrir las 6 fuerzas</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              Toda venta sucede primero en la mente. 🧠
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

  // ============= FORCES SCREEN =============
  if (gameState === 'forces') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Subtle particles */}
        {particles.slice(0, 10).map(particle => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 rounded-full bg-blue-400/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life / 200,
              boxShadow: '0 0 4px rgba(59, 130, 246, 0.3)'
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
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
              🧠 Las 6 Fuerzas que Activan una Compra
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Para que una persona diga "sí, lo quiero", deben alinearse seis fuerzas fundamentales
            </p>
          </div>

          {/* Key Insight */}
          <div 
            className="mb-12 max-w-4xl mx-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-blue-400/30 text-center">
                <p className="text-xl text-white/90 leading-relaxed font-light mb-4">
                  Toda venta, antes de suceder en la billetera, sucede en la <strong className="text-blue-400">mente y el corazón</strong> del cliente.
                </p>
                <div className="bg-red-500/20 backdrop-blur-xl p-5 rounded-2xl border-2 border-red-400/30 mt-6">
                  <p className="text-2xl font-bold text-red-300">
                    ⚠️ Si una sola falta, la venta se cae.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Forces Grid */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forces.map((force, index) => {
                const isSelected = selectedForce === force.id;

                return (
                  <div
                    key={force.id}
                    className="relative transition-all duration-300"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'scale(1)' : 'scale(0.95)',
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`
                    }}
                  >
                    <div 
                      className={`absolute -inset-1 bg-gradient-to-r ${force.color} rounded-3xl transition-all duration-500 ${
                        isSelected ? 'opacity-40 blur-xl' : 'opacity-0'
                      }`}
                    />

                    <button
                      onClick={() => setSelectedForce(isSelected ? null : force.id)}
                      className="relative w-full text-left"
                    >
                      <div className={`bg-gradient-to-br ${force.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-white/30 shadow-2xl' 
                          : 'border-white/10 hover:border-white/20'
                      }`}>
                        
                        <div className="p-8">
                          <div className="text-center mb-6">
                            <span className="text-7xl">{force.emoji}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-2 text-center">
                            {force.nombre}
                          </h3>

                          {isSelected && (
                            <div className="mt-6 pt-6 border-t border-white/10 animate-fadeIn">
                              <p className="text-white/90 leading-relaxed font-light">
                                {force.descripcion}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Takeaway */}
          <div 
            className="mb-12 max-w-4xl mx-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-indigo-400/30 text-center">
                <div className="text-6xl mb-6">🎯</div>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 leading-tight">
                  No es intuición. Es estructura.
                  <br />
                  Una oferta potente los activa todos al mismo tiempo.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('journey')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Ver la ruta del cliente</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <style>{`
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

  // ============= JOURNEY SCREEN =============
  if (gameState === 'journey') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px]" />
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
              🔁 La Ruta Interna del Cliente
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              El dominó emocional que lleva de la incomodidad a la acción
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
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/30 text-center">
                <p className="text-xl text-white/90 leading-relaxed font-light mb-4">
                  El cliente atraviesa una <strong className="text-purple-400">cadena emocional</strong> que, si no se completa, nunca llega a decidirse.
                </p>
                <p className="text-2xl font-bold text-purple-300">
                  Imaginá esto como un dominó emocional: si una pieza no cae, la siguiente tampoco.
                </p>
              </div>
            </div>
          </div>

          {/* Journey Steps */}
          <div 
            className="mb-12 space-y-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            {journeySteps.map((step, index) => (
              <div
                key={step.paso}
                className="relative group"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                <div className="relative bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl text-white font-black text-2xl">
                        {step.paso}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl">{step.emoji}</span>
                          <h3 className="text-2xl font-bold text-white">
                            {step.titulo}
                          </h3>
                        </div>
                        
                        <p className="text-white/80 leading-relaxed mb-4 font-light text-lg">
                          {step.descripcion}
                        </p>
                        
                        <div className="bg-purple-500/20 backdrop-blur-xl p-5 rounded-2xl border-l-4 border-purple-400">
                          <p className="text-purple-200 leading-relaxed">
                            💡 {step.nota}
                          </p>
                        </div>
                      </div>

                      {index < journeySteps.length - 1 && (
                        <div className="flex-shrink-0 hidden lg:block">
                          <ArrowRight className="w-8 h-8 text-purple-400" />
                        </div>
                      )}
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
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-purple-400/30 text-center">
                <div className="text-6xl mb-6">🔥</div>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-tight mb-4">
                  No necesitás inventar el dolor. Está ahí.
                </p>
                <p className="text-xl text-white/80 font-light">
                  Tu trabajo es amplificarlo con empatía. No obligás a nadie a comprar. 
                  Solo creás las condiciones para que quieran moverse.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('trust')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Desbloquear las 3 llaves</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= TRUST SCREEN =============
  if (gameState === 'trust') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
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
              🔒 Las 3 Llaves de la Confianza
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              El puente invisible entre el deseo y la acción
            </p>
          </div>

          {/* Key Insight */}
          <div 
            className="mb-12 max-w-4xl mx-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-cyan-400/30 text-center">
                <p className="text-xl text-white/90 leading-relaxed font-light mb-4">
                  Podés tener el <strong className="text-cyan-400">mejor producto del mundo</strong>, pero si tu cliente no confía... no te compra.
                </p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 leading-tight">
                  La confianza es el puente invisible entre el deseo y la acción.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Keys Grid */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {trustKeys.map((key, index) => {
                const isUnlocked = unlockedKeys.includes(key.id);

                return (
                  <div
                    key={key.id}
                    className="relative transition-all duration-300"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'scale(1)' : 'scale(0.95)',
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                    }}
                  >
                    <div 
                      className={`absolute -inset-1 bg-gradient-to-r ${key.color} rounded-3xl transition-all duration-500 ${
                        isUnlocked ? 'opacity-40 blur-xl' : 'opacity-0'
                      }`}
                    />

                    <button
                      onClick={() => toggleKey(key.id)}
                      className="relative w-full text-left"
                    >
                      <div className={`bg-gradient-to-br ${key.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                        isUnlocked 
                          ? 'border-white/30 shadow-2xl' 
                          : 'border-white/10 hover:border-white/20'
                      }`}>
                        
                        <div className="p-8">
                          <div className="flex items-center justify-between mb-6">
                            <div className={`p-4 rounded-2xl bg-gradient-to-r ${key.color}`}>
                              {isUnlocked ? (
                                <Unlock className="w-8 h-8 text-white" />
                              ) : (
                                <Lock className="w-8 h-8 text-white" />
                              )}
                            </div>
                            <span className="text-5xl">
                              {isUnlocked ? '🔓' : '🔐'}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-white mb-2">
                            {key.titulo}
                          </h3>
                          <p className="text-white/60 text-sm mb-4">{key.subtitulo}</p>

                          {isUnlocked && (
                            <div className="space-y-4 animate-fadeIn">
                              <div className="pt-6 border-t border-white/10">
                                <p className="text-white/90 leading-relaxed font-light mb-4">
                                  {key.descripcion}
                                </p>
                                
                                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10">
                                  <p className="text-white/80 italic leading-relaxed text-sm">
                                    {key.sentimiento}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicator */}
          {unlockedKeys.length > 0 && (
            <div 
              className="mb-12 max-w-4xl mx-auto animate-fadeIn"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-green-400/30">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-white font-bold text-xl">
                      Llaves Desbloqueadas:
                    </p>
                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                      {unlockedKeys.length}/3
                    </p>
                  </div>
                  
                  <div className="relative h-4 bg-white/10 rounded-full overflow-hidden border border-white/20">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${(unlockedKeys.length / 3) * 100}%`,
                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)'
                      }}
                    />
                  </div>

                  {unlockedKeys.length === 3 && (
                    <div className="mt-6 bg-green-500/20 backdrop-blur-xl p-5 rounded-2xl border-2 border-green-400/40 text-center animate-fadeIn">
                      <p className="text-green-300 font-bold text-xl">
                        🎉 ¡Todas las llaves desbloqueadas!
                      </p>
                      <p className="text-white/70 mt-2">
                        Con las tres sólidas, te volvés imparable.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Key Takeaway */}
          <div 
            className="mb-12 max-w-4xl mx-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-cyan-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-cyan-400/30">
                <p className="text-white/90 leading-relaxed text-center text-lg">
                  <strong className="text-cyan-300">🎯 Con solo una de estas bien trabajada podés cerrar ventas.</strong>
                  <br />
                  <span className="text-white/70 font-light">
                    Pero si las tres están sólidas, te volvés imparable. Y si tenés que elegir por dónde empezar... empezá por tu oferta.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('pain')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Explorar las piscinas del dolor</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= PAIN SCREEN =============
  if (gameState === 'pain') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gray-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-500/10 rounded-full blur-[150px]" />
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
              😖 Las 5 Piscinas del Dolor
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              El combustible de toda decisión importante
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
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-slate-600 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-gray-500/10 to-slate-600/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-gray-400/30 text-center">
                <p className="text-xl text-white/90 leading-relaxed font-light mb-4">
                  El dolor es el <strong className="text-red-400">combustible de toda decisión importante</strong>. 
                  Cuando algo duele lo suficiente, el cliente se mueve.
                </p>
                <p className="text-white/70 font-light">
                  Pensá en estos dolores como cinco piscinas donde tu cliente se ahoga… y vos llegás con un salvavidas.
                </p>
              </div>
            </div>
          </div>

          {/* Pain Pools */}
          <div 
            className="mb-12 space-y-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            {painPools.map((pool, index) => {
              const isSelected = selectedPool === pool.id;

              return (
                <div
                  key={pool.id}
                  className="relative group"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                  }}
                >
                  <div 
                    className={`absolute -inset-1 rounded-3xl transition-all duration-500 ${
                      isSelected ? 'opacity-20 blur-xl bg-gradient-to-r from-blue-500 to-purple-500' : 'opacity-0'
                    }`}
                  />

                  <button
                    onClick={() => setSelectedPool(isSelected ? null : pool.id)}
                    className="relative w-full text-left"
                  >
                    <div className={`bg-gradient-to-br ${pool.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'border-white/30 shadow-2xl' 
                        : 'border-white/10 hover:border-white/20'
                    }`}>
                      
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <span className="text-5xl">{pool.emoji}</span>
                            <div>
                              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                                {pool.nivel}
                              </p>
                              <h3 className="text-2xl font-bold text-white">
                                {pool.nombre}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="w-32 bg-white/10 rounded-full h-3 mb-2 overflow-hidden border border-white/20">
                              <div 
                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${pool.profundidad}%` }}
                              />
                            </div>
                            <p className="text-white/60 text-sm font-medium">
                              {pool.profundidad}% profundo
                            </p>
                          </div>
                        </div>

                        <p className="text-white/90 leading-relaxed font-light mb-4">
                          {pool.descripcion}
                        </p>

                        {isSelected && (
                          <div className="pt-6 border-t border-white/10 animate-fadeIn">
                            <div className="bg-blue-500/20 backdrop-blur-xl p-5 rounded-2xl border-l-4 border-blue-400">
                              <p className="text-blue-200 leading-relaxed">
                                💡 {pool.nota}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
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
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-gray-700/10 to-gray-900/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-gray-400/30 text-center">
                <div className="text-6xl mb-6">🔥</div>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 leading-tight mb-4">
                  Activar el dolor no es herir. Es reflejar la verdad que ya existe.
                </p>
                <p className="text-xl text-white/80 font-light">
                  Y mostrar que hay una salida. Porque cuando el dolor es claro… el movimiento se vuelve urgente.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('threshold')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 via-slate-700 to-gray-900 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-gray-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-slate-600 to-gray-800 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Calcular el umbral de acción</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= THRESHOLD SCREEN =============
  if (gameState === 'threshold') {
    const threshold = thresholdMet();
    const score = painLevel * confidenceLevel;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[150px]" />
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
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              🧮 El Umbral de Acción
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              La fórmula que activa la decisión de compra
            </p>
          </div>

          {/* Formula */}
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
                <p className="text-xl text-white/90 leading-relaxed font-light mb-6 text-center">
                  Toda persona necesita cruzar una <strong className="text-orange-400">barrera interna</strong> antes de tomar una decisión.
                </p>
                
                <div className="bg-gradient-to-r from-orange-100/10 to-red-100/10 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/10">
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-4">
                    Dolor × Confianza {'>'} Umbral = ACCIÓN
                  </p>
                  <p className="text-white/70 leading-relaxed font-light">
                    Tu cliente solo actúa cuando lo que siente (dolor) y lo que cree (confianza) superan cierto punto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator */}
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
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  🎛️ Calculadora del Umbral de Acción
                </h3>

                <div className="space-y-8">
                  {/* Pain Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-bold text-white text-lg">
                        😣 Nivel de Dolor:
                      </label>
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                        {painLevel}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={painLevel}
                      onChange={(e) => setPainLevel(Number(e.target.value))}
                      className="w-full h-4 bg-red-200/20 rounded-full appearance-none cursor-pointer slider-thumb-red"
                      style={{
                        background: `linear-gradient(to right, 
                          rgb(239, 68, 68) 0%, 
                          rgb(239, 68, 68) ${painLevel}%, 
                          rgba(239,68,68,0.2) ${painLevel}%, 
                          rgba(239,68,68,0.2) 100%)`
                      }}
                    />
                    <p className="text-white/60 text-sm mt-2">
                      {painLevel < 30 ? '😌 Muy cómodo - No se mueve' : 
                       painLevel < 60 ? '😐 Incómodo - Está pensando' : 
                       '😖 Muy incómodo - Busca solución urgente'}
                    </p>
                  </div>

                  {/* Confidence Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-bold text-white text-lg">
                        🛡️ Nivel de Confianza:
                      </label>
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                        {confidenceLevel}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={confidenceLevel}
                      onChange={(e) => setConfidenceLevel(Number(e.target.value))}
                      className="w-full h-4 bg-green-200/20 rounded-full appearance-none cursor-pointer slider-thumb-green"
                      style={{
                        background: `linear-gradient(to right, 
                          rgb(34, 197, 94) 0%, 
                          rgb(34, 197, 94) ${confidenceLevel}%, 
                          rgba(34,197,94,0.2) ${confidenceLevel}%, 
                          rgba(34,197,94,0.2) 100%)`
                      }}
                    />
                    <p className="text-white/60 text-sm mt-2">
                      {confidenceLevel < 30 ? '😰 Muy inseguro - Muchas dudas' : 
                       confidenceLevel < 60 ? '🤔 Dudoso - Necesita más pruebas' : 
                       '😊 Confiado - Listo para decidir'}
                    </p>
                  </div>

                  {/* Result */}
                  <div 
                    className="p-8 rounded-2xl border-4 transition-all duration-500"
                    style={{
                      backgroundColor: threshold ? '#dcfce7' : '#fee2e2',
                      borderColor: threshold ? '#22c55e' : '#ef4444'
                    }}
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-700 mb-3 font-medium">Resultado:</p>
                      <p 
                        className="text-6xl font-black mb-4"
                        style={{ color: threshold ? '#16a34a' : '#dc2626' }}
                      >
                        {score}
                      </p>
                      {threshold ? (
                        <div>
                          <p className="text-3xl font-black text-green-700 mb-3">
                            ✅ ¡UMBRAL SUPERADO!
                          </p>
                          <p className="text-lg text-gray-700">
                            El cliente está listo para comprar
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-3xl font-black text-red-700 mb-3">
                            ❌ Bajo el Umbral
                          </p>
                          <p className="text-lg text-gray-700">
                            {painLevel < 50 
                              ? '🔥 Aumentá el dolor (mostrá urgencia)' 
                              : '🛡️ Aumentá la confianza (mostrá pruebas)'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
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
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-orange-400/30">
                <p className="text-white/90 leading-relaxed text-center">
                  <strong className="text-orange-300 text-lg">🎯 Esto no es magia. Es matemática emocional.</strong>
                  <br />
                  <span className="text-white/70 font-light">
                    Cada acción de tu mensaje debe aumentar uno de estos indicadores: 
                    🔹 Dolor → Urgencia o 🔹 Confianza → Seguridad
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('complete')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Ver resumen completo</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <style>{`
          .slider-thumb-red::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
            transition: all 0.2s ease;
          }

          .slider-thumb-red::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 16px rgba(239, 68, 68, 0.7);
          }

          .slider-thumb-green::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.5);
            transition: all 0.2s ease;
          }

          .slider-thumb-green::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 16px rgba(34, 197, 94, 0.7);
          }
        `}</style>
      </div>
    );
  }

  // ============= COMPLETE SCREEN =============
  if (gameState === 'complete') {
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
            {/* Epic Hero Section */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Award className="w-32 h-32 text-purple-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  ✅ Ya Entendés la
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                    Psicología de la Compra
                  </span>
                </h2>
                
                <p className="text-2xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto mb-12">
                  Ahora sabés cómo piensa y siente tu cliente antes de comprar
                </p>

                {/* Summary Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { icon: '🔥', label: 'Las 6 Fuerzas', desc: 'Impulso, Meta, Problema, Dolor, Acción, Confianza' },
                    { icon: '🔁', label: 'La Ruta del Cliente', desc: 'El dominó emocional de 5 pasos' },
                    { icon: '🔒', label: 'Las 3 Llaves', desc: 'Tu Oferta, Vos, Tus Clientes' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`
                      }}
                    >
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <p className="text-white font-bold text-lg mb-2">{item.label}</p>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Concepts */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  icon: '😖', 
                  title: 'Las 5 Piscinas', 
                  desc: 'Problemas Concretos → Vacíos Emocionales → Cargas No Deseadas → Deseos No Cumplidos → Consecuencias Acumuladas',
                  color: 'from-gray-500 to-slate-600'
                },
                { 
                  icon: '🧮', 
                  title: 'El Umbral de Acción', 
                  desc: 'Dolor × Confianza > Umbral = ACCIÓN. La matemática emocional de la decisión.',
                  color: 'from-orange-500 to-red-500'
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative group"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${(i + 3) * 0.1}s`
                  }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-3xl opacity-20 blur-xl`} />
                  
                  <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                    <div className="text-6xl mb-4 text-center">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">{item.title}</h3>
                    <p className="text-white/70 text-center leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Step */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-white/20 text-center">
                <div className="text-6xl mb-6">🚀</div>
                <p className="text-3xl font-black text-white mb-4">
                  Siguiente Paso:
                </p>
                <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 font-bold">
                  Ahora vamos a construir tu oferta irresistible usando todo esto.
                </p>
              </div>
            </div>

            {/* Final Message */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-400" />
                <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-400" />
              </div>
              
              <p className="text-xl text-white/70">
                Con esta base sólida, tu oferta será mucho más poderosa. 💪
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

export const ofertasIPsicologiaMetadata = {
  id: 5,
  title: "Ofertas I - Psicología de la Compra",
  type: "document" as const,
  duration: "25 min"
};

export default OfertasIPsicologiaContent;