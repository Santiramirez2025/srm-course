import React, { useState, useEffect, useCallback } from 'react';
import { 
  Target, Rocket, Users, AlertCircle, Lightbulb, Clock, 
  ChevronRight, Sparkles, TrendingUp, Award, CheckCircle2,
  Flame, Eye, Gift, Brain, Heart, Zap, Lock, Unlock,
  Shield, Star, ArrowRight, CircleDot
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Constant {
  id: number;
  key: 'nicho' | 'problema' | 'solucion' | 'tiempo';
  title: string;
  icon: React.ReactNode;
  question: string;
  placeholder: string;
  description: string;
  color: string;
  gradient: string;
  examples?: { bad?: string; good: string }[];
  insight: string;
}

export const ConstantesContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'definition' | 'commitment' | 'complete'>('intro');
  const [currentConstant, setCurrentConstant] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [clarityScore, setClarityScore] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  
  // Constants values
  const [nicho, setNicho] = useState('');
  const [problema, setProblema] = useState('');
  const [solucion, setSolucion] = useState('');
  const [tiempo, setTiempo] = useState('6');
  const [commitment, setCommitment] = useState(false);
  const [hasCommitted, setHasCommitted] = useState(false);

  const constants: Constant[] = [
    {
      id: 1,
      key: 'nicho',
      title: 'Tu Nicho',
      icon: <Users className="w-12 h-12" />,
      question: '¿A quién vas a dedicarle tu vida?',
      placeholder: 'Ej: Dentistas que quieren más pacientes privados',
      description: 'Tu nicho no es solo tu mercado. Es tu tribu. Vas a pasar años entendiendo sus problemas, hablando su idioma, diseñando soluciones para ellos.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      examples: [
        { bad: 'Ayudo a emprendedores', good: 'Ayudo a dentistas que quieren más pacientes privados' },
        { bad: 'Trabajo con empresas', good: 'Trabajo con restaurantes que luchan por llenar mesas' }
      ],
      insight: '¿Con qué grupo de personas podrías pasar los próximos 3 años sin aburrirte?'
    },
    {
      id: 2,
      key: 'problema',
      title: 'El Problema Real',
      icon: <AlertCircle className="w-12 h-12" />,
      question: '¿Qué dolor concreto vas a resolver?',
      placeholder: 'Ej: No saben cómo conseguir pacientes que paguen sin descuentos',
      description: 'No se trata de lo que VOS sabés hacer. Se trata de lo que ELLOS no pueden resolver solos.',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-500/20 to-red-500/20',
      insight: 'El mejor negocio nace cuando alguien grita: "¡Necesito ayuda con esto y no sé a quién acudir!"'
    },
    {
      id: 3,
      key: 'solucion',
      title: 'Tu Solución',
      icon: <Lightbulb className="w-12 h-12" />,
      question: '¿Cuál es tu respuesta concreta?',
      placeholder: 'Ej: Crear un sistema de marketing que atrae pacientes privados de alto valor',
      description: 'Tu solución debe ser como una llave que abre la puerta del problema específico de tu nicho.',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
      insight: 'Una buena solución: funciona, es accesible, es rápida, es simple y es repetible.'
    },
    {
      id: 4,
      key: 'tiempo',
      title: 'El Compromiso',
      icon: <Clock className="w-12 h-12" />,
      question: '¿Cuánto tiempo vas a comprometerte?',
      placeholder: '6 meses',
      description: 'Sin tiempo constante, todo se diluye. El ingrediente que nadie ve, pero lo cambia todo.',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
      insight: 'Mes 1-3: Aprendés. Mes 4-6: Primeros resultados. Mes 7-12: Consistencia. Año 2+: Exponencial.'
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

  const getCurrentValue = useCallback(() => {
    const constant = constants[currentConstant];
    switch(constant.key) {
      case 'nicho': return nicho;
      case 'problema': return problema;
      case 'solucion': return solucion;
      case 'tiempo': return tiempo;
      default: return '';
    }
  }, [currentConstant, nicho, problema, solucion, tiempo, constants]);

  const setCurrentValue = useCallback((value: string) => {
    const constant = constants[currentConstant];
    switch(constant.key) {
      case 'nicho': setNicho(value); break;
      case 'problema': setProblema(value); break;
      case 'solucion': setSolucion(value); break;
      case 'tiempo': setTiempo(value); break;
    }
  }, [currentConstant, constants]);

  const handleNext = useCallback(() => {
    const constant = constants[currentConstant];
    const currentValue = getCurrentValue();
    
    // ✅ FIX: Misma validación condicional que en isValid
    const isValid = constant.key === 'tiempo' 
      ? currentValue.trim().length > 0 
      : currentValue.trim().length >= 10;
    
    if (isValid) {
      setClarityScore(prev => prev + 25);
      if (currentConstant < constants.length - 1) {
        setCurrentConstant(prev => prev + 1);
      } else {
        setGameState('commitment');
      }
    }
  }, [currentConstant, getCurrentValue, constants]);

  const handleCommit = useCallback(() => {
    setCommitment(true);
    setHasCommitted(true);
    setClarityScore(100);
    setTimeout(() => {
      setGameState('complete');
    }, 1000);
  }, []);

  const generatePrompt = useCallback(() => {
    const prompt = `🎯 Actuá como un mentor experto en estrategia de negocios, desarrollo personal y posicionamiento digital.

Tu tarea es ayudarme a descubrir mi NICHO IDEAL de trabajo o negocio, combinando tres factores clave:

1. Lo que me apasiona (intereses y temas que disfruto profundamente)
2. Lo que sé hacer o puedo aprender rápido (habilidades, talentos, conocimientos)
3. Lo que el mercado realmente necesita y por lo que la gente está dispuesta a pagar

Quiero que me hagas preguntas poderosas para identificar:
- Mis temas o actividades con las que más disfruto ayudar a otros
- Los problemas o dolores que más me interesa resolver
- El tipo de personas con las que más me gustaría trabajar
- Ejemplos concretos de oportunidades de mercado alineadas con mi perfil

Al final, mostrame:
✅ 3 posibles nichos bien definidos
✅ Para cada nicho: el tipo de cliente ideal, problema que resuelve y oferta potencial que podría crear
✅ Una breve reflexión sobre cuál parece más alineado con mi propósito y mis fortalezas

Empecemos.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  }, []);

  const isComplete = nicho.trim() && problema.trim() && solucion.trim() && tiempo;

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"
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
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 120) * 0.6,
              transform: `translateY(-${(120 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 120})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(139, 92, 246, 0.5)'
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
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🎯
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 leading-tight">
                  CONSTANTES
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-purple-400 font-bold">
                El éxito es la suma de decisiones constantes
              </p>
            </div>
            
            {/* Content Card Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook */}
                  <div className="space-y-6">
                    <p className="text-3xl sm:text-4xl font-black text-white leading-tight">
                      El éxito no es casualidad.
                    </p>
                    
                    <p className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">
                      Es la suma de decisiones constantes.
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

                  {/* The Problem */}
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-400/20 backdrop-blur-xl">
                    <div className="flex items-start gap-4 mb-6">
                      <Flame className="w-12 h-12 text-red-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3">La mayoría improvisa</h3>
                        <p className="text-white/80 leading-relaxed font-light">
                          Cambian de nicho cada mes. Prueban estrategias al azar. <strong className="text-red-300">Y terminan igual dentro de un año.</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 rounded-2xl border-2 border-green-400/30 backdrop-blur-xl">
                      <div className="flex items-start gap-4">
                        <Shield className="w-12 h-12 text-green-400 flex-shrink-0" />
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-3">Los que construyen definen constantes</h3>
                          <p className="text-white/90 text-lg leading-relaxed font-light">
                            Eligen su <strong className="text-green-300">nicho, problema, solución y tiempo</strong>. Y se comprometen sin cambiar de rumbo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Constants Preview */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: '👥', title: 'Tu Nicho', desc: 'Tu tribu por los próximos años', color: 'from-blue-400 to-cyan-400' },
                      { icon: '❗', title: 'El Problema', desc: 'El dolor que vas a resolver', color: 'from-orange-400 to-red-400' },
                      { icon: '💡', title: 'Tu Solución', desc: 'Tu respuesta única', color: 'from-green-400 to-emerald-400' },
                      { icon: '⏳', title: 'El Tiempo', desc: 'Tu compromiso inquebrantable', color: 'from-purple-400 to-pink-400' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <p className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-2`}>
                          {item.title}
                        </p>
                        <p className="text-white/60 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mission */}
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-black text-white">
                      Este no es un ejercicio más.
                    </p>
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      Es el fundamento de todo lo que construirás.
                    </p>
                    <p className="text-lg text-white/70 font-light">
                      Las decisiones que tomes aquí determinarán dónde estés el próximo año.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => setGameState('definition')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Rocket className="relative w-7 h-7" />
              <span className="relative">Definir mis constantes</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              Última oportunidad para decidir quién querés ser.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============= DEFINITION SCREEN =============
  // ============= DEFINITION SCREEN =============
  if (gameState === 'definition') {
    const constant = constants[currentConstant];
    const currentValue = getCurrentValue();
    
    // ✅ FIX: Validación diferente para tiempo vs otros campos
    const isValid = constant.key === 'tiempo' 
      ? currentValue.trim().length > 0  // Para tiempo, solo necesita tener un valor
      : currentValue.trim().length >= 10; // Para el resto, necesita al menos 10 caracteres

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
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

        <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
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
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                {/* Progress Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl animate-pulse" />
                      <div className="relative w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider">
                        Claridad
                      </p>
                      <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {clarityScore}%
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                      Progreso
                    </p>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      {currentConstant + 1}<span className="text-white/30">/{constants.length}</span>
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${((currentConstant + (isValid ? 1 : 0)) / constants.length) * 100}%`,
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>

                {/* Steps */}
                <div className="flex justify-between mt-6">
                  {constants.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        i < currentConstant 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg'
                          : i === currentConstant
                            ? 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg animate-pulse'
                            : 'bg-white/10 border border-white/20'
                      }`}>
                        {i < currentConstant ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-sm font-bold text-white/70">{i + 1}</span>
                        )}
                      </div>
                      <p className="text-xs text-white/50 font-medium hidden sm:block">{c.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Constant Card */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <div className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r ${constant.color} rounded-3xl opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-500`} />
              
              <div className={`relative bg-gradient-to-br ${constant.gradient} backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border-2 border-white/10 shadow-2xl`}>
                
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="relative inline-block mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${constant.color} rounded-full blur-2xl opacity-60 animate-pulse`} />
                    <div className={`relative w-24 h-24 bg-gradient-to-br ${constant.color} rounded-3xl flex items-center justify-center shadow-2xl`}>
                      {constant.icon}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl sm:text-5xl font-black text-white">
                      {constant.title}
                    </h2>
                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                      {constant.question}
                    </p>
                    <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
                      {constant.description}
                    </p>
                  </div>
                </div>

                {/* Examples if available */}
                {constant.examples && (
                  <div className="mb-8 space-y-4">
                    <p className="text-white font-semibold text-center mb-4">Ejemplos:</p>
                    {constant.examples.map((ex, i) => (
                      <div key={i} className="grid md:grid-cols-2 gap-4">
                        {ex.bad && (
                          <div className="bg-red-500/10 backdrop-blur-xl p-5 rounded-2xl border-2 border-red-400/30">
                            <p className="text-sm font-bold text-red-300 mb-2">❌ Malo:</p>
                            <p className="text-white/80 font-light">"{ex.bad}"</p>
                          </div>
                        )}
                        <div className="bg-green-500/10 backdrop-blur-xl p-5 rounded-2xl border-2 border-green-400/30">
                          <p className="text-sm font-bold text-green-300 mb-2">✅ Bueno:</p>
                          <p className="text-white/80 font-light">"{ex.good}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input Area */}
                <div className="space-y-6">
                  {constant.key === 'tiempo' ? (
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border-2 border-white/20">
                      <label className="block text-white font-semibold mb-4 text-lg">
                        Voy a comprometerme por:
                      </label>
                      <select
                        value={tiempo}
                        onChange={(e) => setTiempo(e.target.value)}
                        className="w-full bg-white/10 backdrop-blur-xl text-white text-xl px-6 py-5 rounded-2xl border-2 border-white/20 focus:border-purple-400 focus:outline-none transition-all duration-300"
                      >
                        <option value="3">3 meses</option>
                        <option value="6">6 meses</option>
                        <option value="12">12 meses</option>
                        <option value="24">24 meses</option>
                      </select>
                    </div>
                  ) : (
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border-2 border-white/20">
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        placeholder={constant.placeholder}
                        autoFocus
                        className="w-full bg-transparent text-white text-xl placeholder-white/40 focus:outline-none font-light"
                      />
                    </div>
                  )}

                  {/* Character counter - Solo para inputs de texto */}
                  {constant.key !== 'tiempo' && (
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-white/50">
                        {currentValue.length < 10 && "Escribí al menos 10 caracteres"}
                        {currentValue.length >= 10 && currentValue.length < 30 && "Buen comienzo..."}
                        {currentValue.length >= 30 && "Excelente nivel de detalle 🔥"}
                      </p>
                      <p className="text-white/30">
                        {currentValue.length} caracteres
                      </p>
                    </div>
                  )}
                  
                  {/* ✅ Nuevo: Feedback para tiempo */}
                  {constant.key === 'tiempo' && (
                    <div className="text-center">
                      <p className="text-green-400 text-sm font-medium">
                        ✓ Compromiso de {tiempo} meses seleccionado
                      </p>
                    </div>
                  )}
                </div>

                {/* Insight */}
                <div className="mt-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-amber-400/30">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-3xl">💡</div>
                    <p className="text-white/90 leading-relaxed font-light italic">
                      {constant.insight}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            {currentConstant > 0 && (
              <button
                onClick={() => setCurrentConstant(prev => prev - 1)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white font-semibold rounded-2xl border border-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Anterior</span>
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={!isValid}
              className={`group relative inline-flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 ${
                isValid
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 shadow-2xl hover:shadow-purple-500/50'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              {isValid && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              )}
              <span className="relative">
                {currentConstant === constants.length - 1 ? 'Hacer mi compromiso' : 'Siguiente'}
              </span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
        `}</style>
      </div>
    );
  }

  // ============= COMMITMENT SCREEN =============
  if (gameState === 'commitment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 relative overflow-hidden">
        
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
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="relative text-7xl">⚔️</div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                La Decisión Final
              </h2>
              <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Llegaste hasta aquí. Ahora tenés <strong className="text-red-400">dos opciones</strong>.
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Option 1 - Improvise */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
                <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-red-400/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">❌</span>
                    </div>
                    <h3 className="text-2xl font-bold text-red-300">Seguir Improvisando</h3>
                  </div>
                  
                  <div className="space-y-3 text-white/70">
                    {[
                      'Volver a tu rutina normal',
                      'Seguir probando cosas al azar',
                      'Cambiar de enfoque cada mes',
                      'Seguir igual dentro de un año'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span className="font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Option 2 - Build */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-green-400/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="text-2xl font-bold text-green-300">Construir con Constantes</h3>
                  </div>
                  
                  <div className="space-y-3 text-white/70">
                    {[
                      'Definir tus 4 constantes HOY',
                      `Comprometerte por ${tiempo} meses`,
                      'Trabajar de forma enfocada y sistemática',
                      'Tener resultados reales dentro de un año'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">•</span>
                        <span className="font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Your Constants Review */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-white/20">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  📋 Tus Constantes Definidas
                </h3>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  {[
                    { label: 'Nicho', value: nicho, color: 'from-blue-400 to-cyan-400' },
                    { label: 'Problema', value: problema, color: 'from-orange-400 to-red-400' },
                    { label: 'Solución', value: solucion, color: 'from-green-400 to-emerald-400' },
                    { label: 'Tiempo', value: `${tiempo} meses`, color: 'from-purple-400 to-pink-400' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                      <p className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-3`}>
                        {item.label}
                      </p>
                      <p className="text-white/90 leading-relaxed font-light">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl p-8 rounded-2xl border-2 border-amber-400/30 text-center">
                  <p className="text-2xl font-bold text-white mb-4">
                    ¿Cuál elegís?
                  </p>
                  <p className="text-white/70 mb-6 font-light">
                    Si no podés hacer esta promesa, no estás listo.
                    <br />
                    Si SÍ podés hacerla... estás a punto de cambiar todo.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={handleCommit}
                disabled={hasCommitted}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white text-2xl font-bold px-16 py-8 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <Award className="relative w-8 h-8" />
                <span className="relative">
                  {hasCommitted ? '✓ Compromiso realizado' : 'Hacer mi compromiso'}
                </span>
              </button>

              {hasCommitted && (
                <div className="text-center animate-fadeIn">
                  <p className="text-green-400 text-xl font-bold">
                    🎉 Tu compromiso ha sido registrado
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Redirigiendo...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
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

        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 py-16">
          
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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Rocket className="w-32 h-32 text-purple-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  🏆 Tu Nuevo
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                    Comienzo
                  </span>
                </h2>
                
                <p className="text-2xl sm:text-3xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  Este no es el final del curso.
                  <br />
                  <strong className="text-amber-300 font-bold">Es el inicio de tu transformación.</strong>
                </p>

                {/* Transformation Cards */}
                <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                  {[
                    { from: 'Buscabas respuestas', to: 'Construyes soluciones', color: 'from-green-400 to-emerald-400' },
                    { from: 'Improvisabas', to: 'Trabajas con constantes', color: 'from-blue-400 to-cyan-400' },
                    { from: 'Esperabas que pasen', to: 'Haces que pasen', color: 'from-purple-400 to-pink-400' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                      <p className="text-white/50 text-sm mb-2 line-through">{item.from}</p>
                      <ArrowRight className="w-5 h-5 text-white/30 mx-auto my-2" />
                      <p className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                        {item.to}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-amber-400/30">
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-4">
                    Tu futuro está esperando
                  </p>
                  <p className="text-white/80 text-xl font-light">
                    del otro lado de estas 4 constantes.
                  </p>
                </div>
              </div>
            </div>

            {/* The Truth */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-2xl p-12 rounded-3xl border-2 border-white/20">
                <h3 className="text-4xl font-black text-white mb-8 text-center">
                  🎯 La Verdad Final
                </h3>

                <div className="space-y-6 text-center max-w-3xl mx-auto">
                  <p className="text-4xl font-black text-white">
                    El éxito no es casualidad.
                  </p>
                  <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-bold">
                    Es la suma de decisiones constantes.
                  </p>
                  <p className="text-2xl text-white/70 font-light leading-relaxed">
                    Las constantes que definiste hoy van a determinar dónde estés el próximo año.
                  </p>

                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 mt-8">
                    <p className="text-3xl font-bold text-white mb-4">
                      El momento es ahora.
                    </p>
                    <p className="text-2xl font-bold text-white mb-2">
                      La decisión es tuya.
                    </p>
                    <p className="text-xl text-white/60 font-light">
                      Como siempre lo ha sido.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-green-400/30">
                <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                  <Flame className="w-10 h-10 text-orange-400" />
                  Tu Plan de Acción
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { step: 'Define', desc: 'Tus 4 constantes están claras', icon: <Target className="w-8 h-8" /> },
                    { step: 'Compromete', desc: `${tiempo} meses sin cambiar de rumbo`, icon: <Shield className="w-8 h-8" /> },
                    { step: 'Construye', desc: 'Ejecuta con foco y disciplina', icon: <Rocket className="w-8 h-8" /> }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        {item.icon}
                      </div>
                      <p className="text-2xl font-bold text-green-300 mb-3">{item.step}</p>
                      <p className="text-white/70 font-light">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bonus Prompt */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-amber-400/30">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    BONUS FINAL: Descubrí tu Nicho Ideal
                  </h3>
                  <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                    Si aún necesitás más claridad sobre tu nicho perfecto
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
                      <span className="relative">Copiar prompt de descubrimiento</span>
                    </>
                  )}
                </button>

                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-amber-400/20">
                  <p className="text-white/70 text-center font-light">
                    <strong className="text-amber-300">💡 Pro tip:</strong> Este prompt te guiará paso a paso para descubrir tu nicho ideal combinando pasión, habilidades y necesidades del mercado.
                  </p>
                </div>
              </div>
            </div>

            {/* Final Epic Message */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-purple-400" />
                <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-purple-400" />
              </div>
              
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                Es hora de dejar de ser espectador de tu propia vida.
              </p>

              <p className="text-white/50 text-sm font-light">
                Tu transformación comienza ahora. 🚀
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

export const constantesMetadata = {
  id: 9,
  title: "Constantes - El Éxito",
  type: "document" as const,
  duration: "30 min"
};

export default ConstantesContent;