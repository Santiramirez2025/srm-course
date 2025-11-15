import React, { useState, useEffect, useCallback } from 'react';
import { 
  Target, Compass, TrendingUp, CheckCircle2, ChevronRight,
  Eye, Lightbulb, AlertTriangle, Zap, Heart, Users,
  DollarSign, Award, Star, Brain, Gift, Rocket,
  Search, ArrowRight, Flame, Shield, Sparkles,
  XCircle, BarChart3
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface NicheExample {
  id: number;
  icon: string;
  title: string;
  solution: string;
  urgency: string;
  payment: string;
  color: string;
  gradient: string;
}

interface NicheCandidate {
  id: number;
  name: string;
  keyAnswers: boolean[];
  generalAnswers: boolean[];
}

export const NichoIdealContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'exploration' | 'evaluation' | 'results' | 'complete'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Niche candidates
  const [nicheCandidates, setNicheCandidates] = useState<NicheCandidate[]>([
    { id: 1, name: '', keyAnswers: Array(5).fill(false), generalAnswers: Array(10).fill(false) },
    { id: 2, name: '', keyAnswers: Array(5).fill(false), generalAnswers: Array(10).fill(false) },
    { id: 3, name: '', keyAnswers: Array(5).fill(false), generalAnswers: Array(10).fill(false) }
  ]);
  const [currentNiche, setCurrentNiche] = useState(0);
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  
  // Prompt state
  const [promptInput, setPromptInput] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const nicheExamples: NicheExample[] = [
    {
      id: 1,
      icon: '🏠',
      title: 'Dueños de Airbnb sin tiempo',
      solution: 'Gestión remota de reservas y atención al huésped',
      urgency: 'Alto',
      payment: '$500-2000/mes',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Tatuadores sin agenda online',
      solution: 'Creación de sistemas de reservas automatizadas',
      urgency: 'Medio',
      payment: '$300-800 único',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 3,
      icon: '👨‍🍳',
      title: 'Cocineros caseros (WhatsApp)',
      solution: 'Tienda online simple + delivery local',
      urgency: 'Alto',
      payment: '$400-1200 único',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 4,
      icon: '🧠',
      title: 'Psicólogos tradicionales',
      solution: 'Asesoría para consulta online y escalar',
      urgency: 'Alto',
      payment: '$800-3000 único',
      color: 'from-teal-500 to-cyan-500',
      gradient: 'from-teal-500/20 to-cyan-500/20'
    },
    {
      id: 5,
      icon: '📊',
      title: 'Contadores con clientes desordenados',
      solution: 'Automatización de reportes y recordatorios',
      urgency: 'Medio',
      payment: '$500-1500/mes',
      color: 'from-orange-500 to-amber-500',
      gradient: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 6,
      icon: '💪',
      title: 'Coaches sin contenido',
      solution: 'Creación de mini productos digitales',
      urgency: 'Alto',
      payment: '$600-2000 único',
      color: 'from-pink-500 to-rose-500',
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      id: 7,
      icon: '📱',
      title: 'Instagram activo sin ventas',
      solution: 'Optimización de perfil y estrategia de DM',
      urgency: 'Muy Alto',
      payment: '$400-1500/mes',
      color: 'from-red-500 to-orange-500',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 8,
      icon: '🏪',
      title: 'Locales sin sistema de turnos',
      solution: 'Implementar turnos online y pagos previos',
      urgency: 'Alto',
      payment: '$500-1800 único',
      color: 'from-indigo-500 to-purple-500',
      gradient: 'from-indigo-500/20 to-purple-500/20'
    }
  ];

  const keyQuestions = [
    '¿Este grupo tiene un problema urgente que le moleste de verdad?',
    '¿Saben que tienen ese problema y buscan ayuda activamente?',
    '¿Es un mercado que está creciendo o tiene potencial futuro?',
    '¿Pueden pagar por una solución premium sin problemas?',
    '¿Te interesa genuinamente este tema o estas personas?'
  ];

  const generalQuestions = [
    '¿Es un mercado grande? (+30.000 personas)',
    '¿Ya hay competidores ganando en este nicho?',
    '¿Podés destacarte en menos de 6 meses?',
    '¿Podés estandarizar lo que hacés?',
    '¿Sabés dónde encontrar a estas personas online?',
    '¿Este nicho genera impacto positivo?',
    '¿Están activos en redes sociales?',
    '¿Podés contactarlos sin intermediarios?',
    '¿Entendés cómo piensan o podés aprenderlo rápido?',
    '¿Podés hablar su idioma (literal y emocional)?'
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

  const updateNicheName = useCallback((id: number, name: string) => {
    setNicheCandidates(prev => prev.map(n => 
      n.id === id ? { ...n, name } : n
    ));
  }, []);

  const toggleKeyAnswer = useCallback((nicheId: number, questionIndex: number) => {
    setNicheCandidates(prev => prev.map(n => {
      if (n.id === nicheId) {
        const answers = [...n.keyAnswers];
        answers[questionIndex] = !answers[questionIndex];
        return { ...n, keyAnswers: answers };
      }
      return n;
    }));
  }, []);

  const toggleGeneralAnswer = useCallback((nicheId: number, questionIndex: number) => {
    setNicheCandidates(prev => prev.map(n => {
      if (n.id === nicheId) {
        const answers = [...n.generalAnswers];
        answers[questionIndex] = !answers[questionIndex];
        return { ...n, generalAnswers: answers };
      }
      return n;
    }));
  }, []);

  const calculateScore = useCallback((niche: NicheCandidate) => {
    // Si falla alguna pregunta clave, score = 0
    if (niche.keyAnswers.some(a => !a)) {
      return 0;
    }
    
    // Calcular porcentaje de preguntas generales
    const positives = niche.generalAnswers.filter(a => a).length;
    return Math.round((positives / 10) * 100);
  }, []);

  const getNicheStatus = useCallback((niche: NicheCandidate) => {
    if (!niche.name.trim()) {
      return { color: 'gray', message: 'Sin nombre', icon: '⚪', gradient: 'from-gray-500/20 to-slate-600/20' };
    }

    const score = calculateScore(niche);
    
    if (score === 0) {
      return { color: 'red', message: 'Descartado', icon: '🔴', gradient: 'from-red-500/20 to-orange-500/20' };
    }
    
    if (score >= 70) {
      return { color: 'green', message: 'Excelente nicho', icon: '🟢', gradient: 'from-green-500/20 to-emerald-500/20' };
    }
    
    if (score >= 50) {
      return { color: 'yellow', message: 'Con potencial', icon: '🟡', gradient: 'from-yellow-500/20 to-amber-500/20' };
    }
    
    return { color: 'orange', message: 'Débil', icon: '🟠', gradient: 'from-orange-500/20 to-red-500/20' };
  }, [calculateScore]);

  const generatePrompt = useCallback(() => {
    const fullPrompt = `Actuá como un mentor experto en negocios digitales y análisis de mercado.
Con base en estas habilidades, intereses, experiencias y pasiones que te doy: ${promptInput || '[completá]'}, 
quiero que me ayudes a descubrir nichos rentables que pueda trabajar 100% desde mi computadora 
y que me permitan tener libertad de tiempo y lugar.

Sugiere entre 3 y 5 nichos reales con potencial comprobado y para cada uno dime:
- Por qué es rentable
- Qué problema específico resuelve
- Qué tipo de cliente lo compra
- Cuál tiene mejor equilibrio entre demanda y competencia para un principiante

Finalmente, recomiéndame cuál sería el mejor para arrancar ahora mismo y explícame por qué.`;
    
    navigator.clipboard.writeText(fullPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  }, [promptInput]);

  const completedNiches = nicheCandidates.filter(n => n.name.trim());
  const canProceedToResults = completedNiches.length > 0 && completedNiches.every(n => n.keyAnswers.every(a => a !== undefined));

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
            {/* Chapter Badge */}
            <div className="inline-block">
              <div className="bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20">
                <p className="text-indigo-300 font-bold text-sm uppercase tracking-wider">
                  Capítulo 2 · Trabajar Online
                </p>
              </div>
            </div>

            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🧭
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 leading-tight">
                  Tu Nicho Ideal
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-purple-400 font-bold">
                Todo empieza en un solo lugar: elegir el nicho correcto
              </p>
            </div>
            
            {/* Analogy Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Target className="w-16 h-16 text-indigo-400" strokeWidth={1.5} />
                    </div>
                    
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Elegir mal el nicho es como <strong className="text-red-400">invertir tiempo en aprender a cocinar sushi</strong>... 
                      en un pueblo donde todos odian el pescado. 🍣❌
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

                  {/* Solution */}
                  <div className="space-y-6">
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Pero si elegís bien, es como <strong className="text-green-400">abrir una panadería en una ciudad 
                      donde todos aman el pan caliente</strong>: te buscan, te recomiendan y te pagan bien. 🥖✅
                    </p>
                  </div>

                  {/* Key Insight */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 rounded-2xl border-2 border-amber-400/30 backdrop-blur-xl text-center">
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 leading-tight">
                        💡 Este módulo es tu brújula para evitar errores caros
                        <br />
                        y comenzar con el pie derecho.
                      </p>
                    </div>
                  </div>

                  {/* What is a Niche */}
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      🧩 ¿Qué es un Nicho?
                    </h3>
                    <p className="text-xl text-white/90 leading-relaxed font-light text-center">
                      Un nicho es un <strong className="text-blue-400">grupo específico de personas</strong> que 
                      tiene un <strong className="text-red-400">problema, deseo o necesidad</strong>... 
                      y vos <strong className="text-green-400">podés ayudarlas con eso</strong>.
                    </p>
                  </div>

                  {/* Stats Preview */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { icon: <Search className="w-6 h-6" />, label: 'Explorar', desc: '8 ejemplos reales' },
                      { icon: <CheckCircle2 className="w-6 h-6" />, label: 'Evaluar', desc: '15 preguntas clave' },
                      { icon: <Award className="w-6 h-6" />, label: 'Decidir', desc: 'Tu nicho perfecto' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                          {item.icon}
                        </div>
                        <p className="text-white font-bold mb-1">{item.label}</p>
                        <p className="text-white/60 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mission */}
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-black text-white">
                      No vas a venderle "a todo el mundo".
                    </p>
                    <p className="text-xl text-white/70 font-light">
                      Vas a ayudar a un grupo que tiene un problema real.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => setGameState('exploration')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Compass className="relative w-7 h-7" />
              <span className="relative">Explorar nichos rentables</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              Elegir bien el nicho es el 50% del negocio. 🎯
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============= EXPLORATION SCREEN =============
  if (gameState === 'exploration') {
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
              🔍 Nichos Rentables Reales
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Explorá estos ejemplos para inspirarte. Cada uno resuelve un problema específico con potencial comprobado.
            </p>
          </div>

          {/* Niche Examples Grid */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nicheExamples.map((example, index) => {
                const isSelected = selectedExample === example.id;

                return (
                  <div
                    key={example.id}
                    className="relative transition-all duration-300"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'scale(1)' : 'scale(0.95)',
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`
                    }}
                  >
                    <div 
                      className={`absolute -inset-1 bg-gradient-to-r ${example.color} rounded-3xl transition-all duration-500 ${
                        isSelected ? 'opacity-40 blur-xl' : 'opacity-0'
                      }`}
                    />

                    <button
                      onClick={() => setSelectedExample(isSelected ? null : example.id)}
                      className="relative w-full text-left"
                    >
                      <div className={`bg-gradient-to-br ${example.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-white/30 shadow-2xl' 
                          : 'border-white/10 hover:border-white/20'
                      }`}>
                        
                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <span className="text-5xl">{example.icon}</span>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                                {example.title}
                              </h4>
                              <p className="text-white/70 text-sm font-light">
                                ➜ {example.solution}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="space-y-3 animate-fadeIn pt-4 border-t border-white/10">
                              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
                                <span className="text-white/70 text-sm">Urgencia:</span>
                                <span className={`font-bold text-sm ${
                                  example.urgency === 'Muy Alto' ? 'text-red-400' :
                                  example.urgency === 'Alto' ? 'text-orange-400' :
                                  'text-yellow-400'
                                }`}>
                                  {example.urgency}
                                </span>
                              </div>
                              <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
                                <span className="text-white/70 text-sm">Rango de pago:</span>
                                <span className="font-bold text-green-400 text-sm">
                                  {example.payment}
                                </span>
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

          {/* Key Insight */}
          <div 
            className="mb-12 max-w-4xl mx-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-amber-400/30 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Lightbulb className="w-12 h-12 text-amber-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-4">
                  Eso hace que te escuchen, te valoren y estén dispuestos a pagarte.
                </p>
                <p className="text-xl text-white/70 font-light">
                  Ahora es tu turno de identificar TU nicho ideal.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('evaluation')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Evaluar mis ideas</span>
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

  // ============= EVALUATION SCREEN =============
  if (gameState === 'evaluation') {
    const currentNicheData = nicheCandidates[currentNiche];
    const allKeyAnswered = currentNicheData.keyAnswers.every(a => a !== undefined);
    const failedKey = currentNicheData.keyAnswers.some(a => a === false);
    const canShowGeneral = allKeyAnswered && !failedKey;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Header with Progress */}
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
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-white">
                    📋 Evaluá Tus Nichos
                  </h2>
                  <div className="text-right">
                    <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                      Progreso
                    </p>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      {currentNiche + 1}<span className="text-white/30">/3</span>
                    </p>
                  </div>
                </div>

                {/* Niche Tabs */}
                <div className="flex gap-3">
                  {nicheCandidates.map((niche, index) => (
                    <button
                      key={niche.id}
                      onClick={() => setCurrentNiche(index)}
                      className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        currentNiche === index
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      Nicho #{index + 1}
                      {niche.name.trim() && (
                        <span className="block text-xs mt-1 truncate">
                          {niche.name}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div 
            className="mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-6 rounded-2xl border-2 border-purple-400/20">
              <div className="space-y-3">
                <p className="text-white/90">
                  <strong className="text-red-400">✅ Preguntas Clave:</strong> Si fallás en UNA, descartá el nicho.
                </p>
                <p className="text-white/90">
                  <strong className="text-blue-400">💡 Preguntas Generales:</strong> Si al menos el 70% da positivo, es un buen nicho.
                </p>
              </div>
            </div>
          </div>

          {/* Niche Name Input */}
          <div 
            className="mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-3xl border-2 border-white/10">
                <label className="block text-white/80 font-semibold mb-3">
                  Nicho Candidato #{currentNiche + 1}:
                </label>
                <input
                  type="text"
                  value={currentNicheData.name}
                  onChange={(e) => updateNicheName(currentNicheData.id, e.target.value)}
                  placeholder="Ej: Psicólogos que quieren trabajar online"
                  autoFocus
                  className="w-full bg-white/5 backdrop-blur-xl text-white text-xl placeholder-white/40 px-6 py-5 rounded-2xl border-2 border-white/20 focus:border-indigo-400 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {currentNicheData.name.trim().length > 3 && (
            <>
              {/* Key Questions */}
              <div 
                className="mb-8"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
                }}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
                  
                  <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-red-400/30">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                      Preguntas Clave (no negociables)
                    </h3>

                    <div className="space-y-4">
                      {keyQuestions.map((question, index) => (
                        <label
                          key={index}
                          className="flex items-start gap-4 cursor-pointer bg-white/5 hover:bg-white/10 p-5 rounded-2xl transition-all duration-300"
                        >
                          <input
                            type="checkbox"
                            checked={currentNicheData.keyAnswers[index] || false}
                            onChange={() => toggleKeyAnswer(currentNicheData.id, index)}
                            className="mt-1 w-5 h-5"
                          />
                          <span className="text-white/90 leading-relaxed font-light flex-1">
                            {question}
                          </span>
                        </label>
                      ))}
                    </div>

                    {failedKey && allKeyAnswered && (
                      <div className="mt-6 bg-red-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-red-400/40 animate-fadeIn">
                        <p className="text-red-300 font-bold text-lg flex items-center gap-2">
                          <XCircle className="w-6 h-6" />
                          Este nicho no cumple con las preguntas clave. Descartalo.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* General Questions */}
              {canShowGeneral && (
                <div 
                  className="mb-8 animate-fadeIn"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
                    
                    <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-blue-400/30">
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Lightbulb className="w-8 h-8 text-blue-400" />
                        Preguntas Generales (útiles pero negociables)
                      </h3>

                      <div className="space-y-4">
                        {generalQuestions.map((question, index) => (
                          <label
                            key={index}
                            className="flex items-start gap-4 cursor-pointer bg-white/5 hover:bg-white/10 p-5 rounded-2xl transition-all duration-300"
                          >
                            <input
                              type="checkbox"
                              checked={currentNicheData.generalAnswers[index] || false}
                              onChange={() => toggleGeneralAnswer(currentNicheData.id, index)}
                              className="mt-1 w-5 h-5"
                            />
                            <span className="text-white/90 leading-relaxed font-light flex-1">
                              {question}
                            </span>
                          </label>
                        ))}
                      </div>

                      {currentNicheData.generalAnswers.every(a => a !== undefined) && (
                        <div className="mt-6 bg-blue-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-blue-400/40 animate-fadeIn">
                          <p className="text-blue-300 font-bold text-lg">
                            ✓ Evaluación completa para este nicho
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            {currentNiche > 0 && (
              <button
                onClick={() => setCurrentNiche(prev => prev - 1)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white font-semibold rounded-2xl border border-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Anterior</span>
              </button>
            )}
            
            <div className="flex-1" />

            {currentNiche < nicheCandidates.length - 1 ? (
              <button
                onClick={() => setCurrentNiche(prev => prev + 1)}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center gap-2"
              >
                <span>Siguiente nicho</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setGameState('results')}
                disabled={!canProceedToResults}
                className={`group relative inline-flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 ${
                  canProceedToResults
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 shadow-2xl hover:shadow-purple-500/50'
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                {canProceedToResults && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                )}
                <span className="relative">Ver resultados</span>
                <ChevronRight className="relative w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============= RESULTS SCREEN =============
  if (gameState === 'results') {
    const rankedNiches = [...nicheCandidates]
      .filter(n => n.name.trim())
      .map(n => ({ ...n, score: calculateScore(n), status: getNicheStatus(n) }))
      .sort((a, b) => b.score - a.score);

    const bestNiche = rankedNiches[0];

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
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-7xl">📊</div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Tus Resultados
            </h2>
            <p className="text-xl text-white/70 font-light">
              Análisis completo de tus nichos candidatos
            </p>
          </div>

          {/* Ranking */}
          <div 
            className="mb-12 space-y-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            {rankedNiches.map((niche, index) => (
              <div
                key={niche.id}
                className="relative group"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                }}
              >
                <div className={`absolute -inset-1 rounded-3xl transition-all duration-500 ${
                  niche.status.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-30 blur-xl' :
                  niche.status.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-amber-500 opacity-20 blur-xl' :
                  niche.status.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-red-500 opacity-20 blur-xl' :
                  'bg-gradient-to-r from-red-500 to-orange-500 opacity-20 blur-xl'
                }`} />
                
                <div className={`relative bg-gradient-to-br ${niche.status.gradient} backdrop-blur-2xl p-8 rounded-3xl border-2 ${
                  niche.status.color === 'green' ? 'border-green-400/30' :
                  niche.status.color === 'yellow' ? 'border-yellow-400/30' :
                  niche.status.color === 'orange' ? 'border-orange-400/30' :
                  'border-red-400/30'
                }`}>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 text-6xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {niche.name}
                          </h3>
                          <p className="text-lg text-white/80 flex items-center gap-2">
                            {niche.status.icon} {niche.status.message}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            {niche.score}%
                          </p>
                          <p className="text-white/60 text-sm mt-1">Score</p>
                        </div>
                      </div>

                      {/* Score Breakdown */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                          <p className="text-white/60 text-sm mb-2">Preguntas Clave</p>
                          <p className={`text-2xl font-bold ${
                            niche.keyAnswers.every(a => a) ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {niche.keyAnswers.filter(a => a).length}/5
                          </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl">
                          <p className="text-white/60 text-sm mb-2">Preguntas Generales</p>
                          <p className="text-2xl font-bold text-blue-400">
                            {niche.generalAnswers.filter(a => a).length}/10
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Best Niche Recommendation */}
          {bestNiche && bestNiche.score >= 50 && (
            <div 
              className="mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
                
                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-green-400/30 text-center">
                  <div className="text-6xl mb-6">🎯</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Tu Mejor Opción
                  </h3>
                  <p className="text-2xl text-green-300 font-bold mb-6">
                    {bestNiche.name}
                  </p>
                  <p className="text-xl text-white/80 max-w-2xl mx-auto">
                    Este nicho cumple con los requisitos clave y tiene el mejor puntaje general. 
                    <strong className="text-green-400"> Es tu mejor apuesta para comenzar.</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Conclusion */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-indigo-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  🧠 Recordatorio Importante
                </h3>
                
                <div className="space-y-4 text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔴</span>
                    <p>
                      <strong className="text-white">Si tu idea falla en las Preguntas Clave:</strong> descartala.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🟡</span>
                    <p>
                      <strong className="text-white">Si cumple con al menos 70% de las Generales:</strong> es una semilla que vale la pena plantar.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-green-500/20 backdrop-blur-xl rounded-2xl border-2 border-green-400/30 text-center">
                  <p className="text-2xl font-bold text-green-300">
                    Elegir bien el nicho es el 50% del negocio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('complete')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Ver bonus final</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= COMPLETE SCREEN =============
  if (gameState === 'complete') {
    const bestNiches = [...nicheCandidates]
      .filter(n => n.name.trim())
      .map(n => ({ ...n, score: calculateScore(n) }))
      .filter(n => n.score >= 50)
      .sort((a, b) => b.score - a.score);

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
            {/* Hero */}
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
                  🎯 Tu Decisión
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Más Importante
                  </span>
                </h2>
                
                <p className="text-2xl sm:text-3xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  {bestNiches.length > 0 ? (
                    <>Tenés <strong className="text-purple-400">{bestNiches.length} {bestNiches.length === 1 ? 'nicho viable' : 'nichos viables'}</strong></>
                  ) : (
                    <>Revisá tus opciones y ajustá según los criterios</>
                  )}
                </p>

                {bestNiches.length > 0 && (
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {bestNiches.map((niche, i) => (
                      <div key={niche.id} className="bg-white/10 backdrop-blur-xl px-8 py-6 rounded-2xl border-2 border-indigo-400/30">
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="text-white font-bold text-xl mb-1">{niche.name}</p>
                            <p className="text-white/60 text-sm">Puntuación: {niche.score}%</p>
                          </div>
                          {i === 0 && (
                            <div className="text-4xl">🥇</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bonus Prompt */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-amber-400/30">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    BONUS: Descubrí Más Nichos
                  </h3>
                  <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                    Usá esta herramienta para que ChatGPT te sugiera nichos personalizados
                  </p>
                </div>

                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                    <label className="block text-white/80 font-semibold mb-3">
                      Completá con tus habilidades e intereses:
                    </label>
                    <textarea
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder="Ej: Sé diseño gráfico, me apasiona el fitness, trabajé 3 años en marketing digital..."
                      className="w-full bg-white/5 backdrop-blur-xl text-white placeholder-white/40 px-6 py-4 rounded-xl border-2 border-white/20 focus:border-amber-400 focus:outline-none min-h-[120px] resize-none font-light"
                    />
                  </div>

                  <button
                    onClick={generatePrompt}
                    className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl px-12 py-6 rounded-2xl hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-2xl"
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

                  {promptInput.trim().length > 20 && (
                    <div className="bg-amber-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-amber-400/30 animate-fadeIn">
                      <p className="text-amber-200 text-sm leading-relaxed">
                        <strong>💡 Tip:</strong> Copiá el prompt con tu información y pegalo en ChatGPT. 
                        Luego evaluá las sugerencias con el test de este módulo.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Final Message */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-12 rounded-3xl border-2 border-white/20 text-center">
                <div className="space-y-6 max-w-3xl mx-auto">
                  <p className="text-3xl font-bold text-white">
                    Analizá con atención tus opciones.
                  </p>
                  <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-black">
                    Reflexioná sinceramente sobre lo que querés lograr.
                  </p>
                  <p className="text-xl text-white/80 leading-relaxed">
                    Elegí con claridad el nicho que mejor se adapta a vos y a tus objetivos.
                  </p>

                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 mt-8">
                    <p className="text-2xl font-bold text-white mb-4">
                      Cuando tengas esa decisión firme...
                    </p>
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      Avanzá con confianza al próximo módulo 🚀
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-indigo-400" />
                <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-indigo-400" />
              </div>
              
              <p className="text-2xl font-bold text-white">
                ✅ Ya elegiste tu nicho ideal...
              </p>
              <p className="text-xl text-white/70">
                Ahora es hora de construir tu marca personal y destacarte.
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

export const nichoIdealMetadata = {
  id: 3,
  title: "Cómo Elegir tu Nicho Ideal",
  type: "document" as const,
  duration: "30 min"
};

export default NichoIdealContent;