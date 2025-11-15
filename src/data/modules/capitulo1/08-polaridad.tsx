import React, { useState, useEffect, useCallback } from 'react';
import { 
  Target, Sliders, Brain, Sparkles, Eye, Gift, 
  ChevronRight, TrendingUp, Zap, AlertTriangle,
  Glasses, Palette, Compass, CheckCircle2, BarChart3,
  RefreshCw, Lock, Unlock, Activity
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

type SliderKey = 'humor' | 'orgullo' | 'juicio' | 'escucha' | 'formalidad' | 
                 'energia' | 'exigencia' | 'paciencia' | 'defensiva' | 'honestidad';

type SliderValues = Record<SliderKey, number>;

interface SliderConfig {
  key: SliderKey;
  label: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  leftLabel: string;
  rightLabel: string;
}

interface Situation {
  id: string;
  title: string;
  icon: string;
  description: string;
  adjustments: Partial<SliderValues>;
  explanation: string;
  color: string;
  gradient: string;
}

export const PolaridadContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'calibration' | 'decision' | 'complete'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [awarenessScore, setAwarenessScore] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  
  // Sliders state
  const initialSliders: SliderValues = {
    humor: 50,
    orgullo: 50,
    juicio: 50,
    escucha: 50,
    formalidad: 50,
    energia: 50,
    exigencia: 50,
    paciencia: 50,
    defensiva: 50,
    honestidad: 50
  };
  
  const [sliders, setSliders] = useState<SliderValues>(initialSliders);
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);
  const [userDecision, setUserDecision] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hoveredSlider, setHoveredSlider] = useState<SliderKey | null>(null);

  const sliderConfigs: SliderConfig[] = [
    { 
      key: 'humor', 
      label: 'Humor', 
      icon: '😄',
      description: 'De serio a divertido',
      color: 'from-yellow-500 to-amber-500',
      gradient: 'from-yellow-500/20 to-amber-500/20',
      leftLabel: 'Serio',
      rightLabel: 'Divertido'
    },
    { 
      key: 'orgullo', 
      label: 'Orgullo', 
      icon: '👑',
      description: 'De humilde a orgulloso',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
      leftLabel: 'Humilde',
      rightLabel: 'Orgulloso'
    },
    { 
      key: 'juicio', 
      label: 'Juicio', 
      icon: '⚖️',
      description: 'De aceptación a crítica',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      leftLabel: 'Acepto',
      rightLabel: 'Crítico'
    },
    { 
      key: 'escucha', 
      label: 'Escucha', 
      icon: '👂',
      description: 'De hablar a escuchar',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
      leftLabel: 'Hablo',
      rightLabel: 'Escucho'
    },
    { 
      key: 'formalidad', 
      label: 'Formalidad', 
      icon: '🎩',
      description: 'De casual a formal',
      color: 'from-slate-500 to-gray-600',
      gradient: 'from-slate-500/20 to-gray-600/20',
      leftLabel: 'Casual',
      rightLabel: 'Formal'
    },
    { 
      key: 'energia', 
      label: 'Energía', 
      icon: '⚡',
      description: 'De calmado a enérgico',
      color: 'from-orange-500 to-red-500',
      gradient: 'from-orange-500/20 to-red-500/20',
      leftLabel: 'Calma',
      rightLabel: 'Enérgico'
    },
    { 
      key: 'exigencia', 
      label: 'Exigencia', 
      icon: '🎯',
      description: 'De flexible a exigente',
      color: 'from-red-500 to-rose-500',
      gradient: 'from-red-500/20 to-rose-500/20',
      leftLabel: 'Flexible',
      rightLabel: 'Exigente'
    },
    { 
      key: 'paciencia', 
      label: 'Paciencia', 
      icon: '⏳',
      description: 'De impaciente a paciente',
      color: 'from-teal-500 to-cyan-500',
      gradient: 'from-teal-500/20 to-cyan-500/20',
      leftLabel: 'Rápido',
      rightLabel: 'Paciente'
    },
    { 
      key: 'defensiva', 
      label: 'Defensiva', 
      icon: '🛡️',
      description: 'De abierto a defensivo',
      color: 'from-indigo-500 to-purple-500',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      leftLabel: 'Abierto',
      rightLabel: 'Defensivo'
    },
    { 
      key: 'honestidad', 
      label: 'Honestidad', 
      icon: '💎',
      description: 'De diplomático a directo',
      color: 'from-cyan-500 to-blue-500',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      leftLabel: 'Diplomático',
      rightLabel: 'Directo'
    }
  ];

  const situations: Situation[] = [
    {
      id: 'reunion',
      title: 'Reunión familiar tensa',
      icon: '👨‍👩‍👧',
      description: 'Conflictos familiares que necesitan ser manejados con cuidado',
      adjustments: { humor: 70, orgullo: 20, paciencia: 75 },
      explanation: 'Subís el humor para aliviar tensión, bajás el orgullo para no engancharte, aumentás paciencia',
      color: 'from-pink-500 to-rose-500',
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      id: 'amigo',
      title: 'Amigo cuenta algo personal',
      icon: '🤝',
      description: 'Momento de vulnerabilidad que requiere empatía',
      adjustments: { juicio: 20, escucha: 85, honestidad: 70 },
      explanation: 'Bajás el juicio, subís la escucha activa, mantenés honestidad compasiva',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'presentacion',
      title: 'Presentación aburrida',
      icon: '🎤',
      description: 'Necesitás captar atención y conectar',
      adjustments: { formalidad: 30, energia: 85, humor: 75 },
      explanation: 'Bajás formalidad, subís energía y humor para enganchar a la audiencia',
      color: 'from-orange-500 to-amber-500',
      gradient: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 'hijo',
      title: 'Hijo frustrado',
      icon: '👶',
      description: 'Momento educativo que requiere comprensión',
      adjustments: { exigencia: 20, paciencia: 85, escucha: 80 },
      explanation: 'Bajás exigencia, subís paciencia y escucha empática',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 'entrevista',
      title: 'Entrevista sobre errores',
      icon: '💼',
      description: 'Momento profesional que necesita madurez',
      adjustments: { defensiva: 15, honestidad: 85, orgullo: 30 },
      explanation: 'Bajás defensiva, subís honestidad madura, controlás orgullo',
      color: 'from-purple-500 to-indigo-500',
      gradient: 'from-purple-500/20 to-indigo-500/20'
    },
    {
      id: 'negociacion',
      title: 'Negociación importante',
      icon: '🤝',
      description: 'Equilibrio entre firmeza y flexibilidad',
      adjustments: { exigencia: 70, escucha: 75, formalidad: 60 },
      explanation: 'Mantenés exigencia alta, escuchás activamente, balance de formalidad',
      color: 'from-teal-500 to-cyan-500',
      gradient: 'from-teal-500/20 to-cyan-500/20'
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

  const handleSliderChange = useCallback((key: SliderKey, value: number) => {
    setSliders(prev => ({ ...prev, [key]: value }));
    if (!hasInteracted) {
      setHasInteracted(true);
      setAwarenessScore(prev => prev + 10);
    }
  }, [hasInteracted]);

  const handleSituationSelect = useCallback((situationId: string) => {
    const situation = situations.find(s => s.id === situationId);
    if (situation) {
      setSelectedSituation(situationId);
      setSliders(prev => ({ ...prev, ...situation.adjustments }));
      setAwarenessScore(prev => prev + 20);
    }
  }, [situations]);

  const resetSliders = useCallback(() => {
    setSliders(initialSliders);
    setSelectedSituation(null);
  }, []);

  const calculateBalance = useCallback(() => {
    const values = Object.values(sliders);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
    return Math.max(0, 100 - Math.sqrt(variance));
  }, [sliders]);

  const generatePrompt = useCallback(() => {
    const prompt = `🔓 Actuá como un entrenador mental experto en neuroplasticidad y pensamiento estratégico.

Estoy por tomar una decisión importante. Quiero que me ayudes a verla desde todos los ángulos, no solo en blanco o negro.

${userDecision ? `Decisión a analizar:\n${userDecision}\n\n` : ''}Mostrame:
- Qué no estoy viendo por pensar en forma binaria
- Cómo moverme con flexibilidad entre extremos, como si fueran deslizadores de una consola mental
- Cómo usar inversión lógica y pensamiento espectral para encontrar soluciones inesperadas

Sé directo. No me digas lo que quiero oír. Mostrame lo que importa.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  }, [userDecision]);

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
              opacity: (particle.life / 100) * 0.6,
              transform: `translateY(-${(100 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 100})`,
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
                  Polaridad
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-purple-400 font-bold">
                Rompé el pensamiento binario. Movete entre extremos.
              </p>
            </div>
            
            {/* Content Card Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook with Glasses Analogy */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Glasses className="w-16 h-16 text-indigo-400" strokeWidth={1.5} />
                    </div>
                    
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Imaginá que toda tu vida usaste anteojos que solo te muestran el mundo en <strong className="text-white font-bold">blanco o negro</strong>.
                    </p>
                    
                    <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      Ahora alguien te los quita...
                    </p>
                    
                    <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                      Y ves una gama infinita de colores 🌈
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

                  {/* Binary Thinking Problem */}
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-400/20 backdrop-blur-xl">
                    <div className="flex items-start gap-4 mb-6">
                      <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3">El pensamiento binario te encadena</h3>
                        <p className="text-white/80 leading-relaxed font-light">
                          Nos educaron a elegir bandos. <strong className="text-red-300">Y una vez que elegís... te quedás atrapado.</strong>
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      {['Derecha o izquierda', 'Carnívoro o vegano', 'Disciplinado o espontáneo', 'Lógico o emocional'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/5 backdrop-blur-xl p-3 rounded-xl border border-red-400/20">
                          <span className="text-red-400">⚔️</span>
                          <span className="text-white/90">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 rounded-2xl border-2 border-green-400/30 backdrop-blur-xl">
                      <div className="flex items-start gap-4">
                        <Palette className="w-12 h-12 text-green-400 flex-shrink-0" />
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-3">La solución: Pensamiento espectral</h3>
                          <p className="text-white/90 text-lg leading-relaxed font-light">
                            Movete entre extremos como un <strong className="text-green-300">diseñador que juega con tonos</strong>, no como un juez que sentencia.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Preview */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
                        10
                      </div>
                      <p className="text-white/60 text-sm font-medium">Deslizadores mentales</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                        ∞
                      </div>
                      <p className="text-white/60 text-sm font-medium">Combinaciones posibles</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-2">
                        100%
                      </div>
                      <p className="text-white/60 text-sm font-medium">Flexibilidad</p>
                    </div>
                  </div>

                  {/* Mission */}
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-black text-white">
                      Esto no es un documento.
                    </p>
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      Es tu consola mental.
                    </p>
                    <p className="text-lg text-white/70 font-light">
                      Un sistema para calibrar tu respuesta en cada situación.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => {
                setGameState('calibration');
              }}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Sliders className="relative w-7 h-7" />
              <span className="relative">Calibrar mi mente</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              Ser camaleónico no es ser falso. Es ser estratégico.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============= CALIBRATION SCREEN =============
  if (gameState === 'calibration') {
    const balanceScore = calculateBalance();

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
          
          {/* Stats Header */}
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
                <div className="grid sm:grid-cols-3 gap-6">
                  
                  {/* Awareness Score */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-indigo-500/30 rounded-2xl blur-xl animate-pulse" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                        Consciencia
                      </p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        {awarenessScore}
                      </p>
                    </div>
                  </div>

                  {/* Balance Score */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Activity className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                        Balance
                      </p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {Math.round(balanceScore)}%
                      </p>
                    </div>
                  </div>

                  {/* Interactions */}
                  <div className="flex items-center gap-6 sm:justify-end">
                    <div>
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1 text-right">
                        Ajustes
                      </p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 text-right">
                        {hasInteracted ? '✓' : '—'}
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-pink-500/30 rounded-2xl blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Sliders className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
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
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl p-6 rounded-2xl border-2 border-indigo-400/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Tu consola mental</h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    No sos una sola cosa. Tenés múltiples aspectos que podés <strong className="text-indigo-300">calibrar según la situación</strong>. 
                    Esto no es fingir ni actuar, es responder de manera consciente y estratégica.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Situations */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">📌</span>
                Situaciones comunes
              </h3>
              {selectedSituation && (
                <button
                  onClick={resetSliders}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white/70 hover:text-white transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Reset</span>
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {situations.map((situation, index) => {
                const isSelected = selectedSituation === situation.id;

                return (
                  <div
                    key={situation.id}
                    className="relative transition-all duration-300"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`
                    }}
                  >
                    <div 
                      className={`absolute -inset-1 bg-gradient-to-r ${situation.color} rounded-2xl transition-all duration-500 ${
                        isSelected ? 'opacity-40 blur-xl' : 'opacity-0'
                      }`}
                    />

                    <button
                      onClick={() => handleSituationSelect(situation.id)}
                      className={`relative w-full text-left cursor-pointer transform transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className={`bg-gradient-to-br ${situation.gradient} backdrop-blur-2xl rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                        isSelected 
                          ? 'border-white/30 shadow-2xl' 
                          : 'border-white/10 shadow-xl hover:border-white/20'
                      }`}>
                        
                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="text-5xl">{situation.icon}</div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                                {situation.title}
                              </h4>
                              <p className="text-white/60 text-sm font-light leading-relaxed">
                                {situation.description}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            )}
                          </div>

                          {isSelected && (
                            <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 animate-fadeIn">
                              <p className="text-white/80 text-sm font-light leading-relaxed">
                                💡 {situation.explanation}
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

          {/* Sliders Console */}
          <div 
            className="max-w-6xl mx-auto mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl opacity-20 blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/20">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                  Ajustá tu respuesta
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {sliderConfigs.map((config) => {
                    const value = sliders[config.key];
                    const isHovered = hoveredSlider === config.key;

                    return (
                      <div
                        key={config.key}
                        className={`bg-white/5 backdrop-blur-xl p-6 rounded-2xl border-2 transition-all duration-300 ${
                          isHovered ? 'border-white/30 shadow-2xl scale-[1.02]' : 'border-white/10'
                        }`}
                        onMouseEnter={() => setHoveredSlider(config.key)}
                        onMouseLeave={() => setHoveredSlider(null)}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{config.icon}</span>
                            <div>
                              <p className="font-bold text-white">{config.label}</p>
                              <p className="text-xs text-white/50">{config.description}</p>
                            </div>
                          </div>
                          <div className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${config.color}`}>
                            {value}
                          </div>
                        </div>

                        {/* Slider */}
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => handleSliderChange(config.key, Number(e.target.value))}
                            className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider-thumb"
                            style={{
                              background: `linear-gradient(to right, 
                                rgb(${getGradientRGB(config.color, 0)}) 0%, 
                                rgb(${getGradientRGB(config.color, 0)}) ${value}%, 
                                rgba(255,255,255,0.1) ${value}%, 
                                rgba(255,255,255,0.1) 100%)`
                            }}
                          />
                          
                          {/* Labels */}
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-white/40 font-medium">{config.leftLabel}</span>
                            <span className="text-xs text-white/40 font-medium">{config.rightLabel}</span>
                          </div>
                        </div>

                        {/* Indicator */}
                        {isHovered && (
                          <div className="mt-4 bg-white/10 backdrop-blur-xl p-3 rounded-xl border border-white/20 animate-fadeIn">
                            <p className="text-xs text-white/70 text-center">
                              {value < 30 && `Más hacia ${config.leftLabel.toLowerCase()}`}
                              {value >= 30 && value <= 70 && 'Equilibrado'}
                              {value > 70 && `Más hacia ${config.rightLabel.toLowerCase()}`}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Insight */}
                <div className="mt-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-indigo-400/30">
                  <p className="text-white/80 text-center leading-relaxed">
                    <strong className="text-indigo-300">Recordá:</strong> Ser camaleónico no es ser falso. 
                    Es ser inteligente, flexible y emocionalmente maduro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          {hasInteracted && (
            <div className="flex justify-center">
              <button
                onClick={() => setGameState('decision')}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <span className="relative">Aplicar a una decisión real</span>
                <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>

        <style>{`
          .slider-thumb::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
          }

          .slider-thumb::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          }

          .slider-thumb::-moz-range-thumb {
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border: none;
            transition: all 0.2s ease;
          }

          .slider-thumb::-moz-range-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          }

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

  // ============= DECISION SCREEN =============
  if (gameState === 'decision') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
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
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-50 animate-pulse" />
                <div className="relative text-7xl">🌈</div>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                Rompé tu pensamiento binario
              </h2>
              <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Describí una decisión donde te sentís atrapado entre dos opciones.
                <strong className="text-pink-400"> Vamos a encontrar el espectro completo.</strong>
              </p>
            </div>

            {/* Input Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                <textarea
                  value={userDecision}
                  onChange={(e) => setUserDecision(e.target.value)}
                  placeholder="Ejemplo: ¿Dejo mi trabajo estable o arriesgo con mi emprendimiento? Me siento atrapado entre seguridad y libertad..."
                  autoFocus
                  className="w-full bg-white/5 backdrop-blur-xl text-white placeholder-white/40 px-6 py-6 rounded-2xl border-2 border-white/20 focus:border-pink-400 focus:outline-none min-h-[200px] text-lg font-light focus:bg-white/10 transition-all duration-300 resize-none"
                />

                <div className="flex items-center justify-between mt-4">
                  <p className="text-white/50 text-sm">
                    {userDecision.length < 30 && "Describí tu dilema con más detalle"}
                    {userDecision.length >= 30 && userDecision.length < 100 && "Buen comienzo, seguí..."}
                    {userDecision.length >= 100 && "Excelente nivel de detalle 👏"}
                  </p>
                  <p className="text-white/30 text-sm">
                    {userDecision.length} caracteres
                  </p>
                </div>
              </div>
            </div>

            {/* Analysis Button */}
            {userDecision.trim().length >= 30 && (
              <div className="space-y-6">
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="w-full group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-xl font-bold px-12 py-6 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-[1.02] active:scale-98"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  <Palette className="relative w-6 h-6" />
                  <span className="relative">{showAnalysis ? 'Ocultar preguntas' : 'Ver desde todos los colores'}</span>
                </button>

                {/* Analysis Questions */}
                {showAnalysis && (
                  <div 
                    className="animate-fadeInScale"
                    style={{
                      animation: 'fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-pink-400/20">
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Eye className="w-8 h-8 text-pink-400" />
                        Preguntas para salir del blanco o negro
                      </h3>
                      
                      <div className="space-y-5">
                        {[
                          { 
                            q: '¿Y si no fueran las únicas opciones?', 
                            hint: '¿Existe una tercera vía que combine lo mejor de ambas?', 
                            color: 'blue',
                            gradient: 'from-blue-500/20 to-cyan-500/20'
                          },
                          { 
                            q: '¿Qué estoy suponiendo que es verdad?', 
                            hint: '¿Qué creencia rígida me hace ver solo dos caminos?', 
                            color: 'green',
                            gradient: 'from-green-500/20 to-emerald-500/20'
                          },
                          { 
                            q: '¿Cómo lo vería alguien que admiro?', 
                            hint: '¿Qué harían con esta situación los que ya lograron lo que quiero?', 
                            color: 'purple',
                            gradient: 'from-purple-500/20 to-pink-500/20'
                          },
                          { 
                            q: '¿Puedo moverme entre ambas en fases?', 
                            hint: '¿Y si no es una decisión única sino un deslizador que ajusto con el tiempo?', 
                            color: 'orange',
                            gradient: 'from-orange-500/20 to-amber-500/20'
                          }
                        ].map((item, index) => (
                          <div key={index} className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl p-6 rounded-2xl border-l-4 border-${item.color}-400`}>
                            <p className="font-semibold text-white text-lg mb-2">❓ {item.q}</p>
                            <p className="text-white/60 text-sm font-light leading-relaxed">{item.hint}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Continue */}
            {userDecision.trim().length >= 30 && (
              <div className="flex justify-center pt-6">
                <button
                  onClick={() => setGameState('complete')}
                  className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  <span className="relative">Ver mi análisis completo</span>
                  <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // ============= COMPLETE SCREEN =============
  if (gameState === 'complete') {
    const balanceScore = calculateBalance();

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
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Palette className="w-24 h-24 text-indigo-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  🧩 Moverse entre
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    polos es poder
                  </span>
                </h2>
                
                <p className="text-xl sm:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  Esto no es un documento. Es un <strong className="text-purple-300">mapa mental</strong> para hackear el sistema binario que limita tu potencial.
                </p>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
                      {awarenessScore}
                    </div>
                    <p className="text-white/60 font-medium">Puntos de consciencia</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                      {Math.round(balanceScore)}%
                    </div>
                    <p className="text-white/60 font-medium">Balance alcanzado</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-2">
                      ∞
                    </div>
                    <p className="text-white/60 font-medium">Posibilidades</p>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-green-400/30">
                    <p className="text-xl text-white/90 mb-2">
                      📍 <strong>Autoconciencia</strong>
                    </p>
                    <p className="text-white/70 font-light">
                      Reconocer que no sos una sola cosa
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-blue-400/30">
                    <p className="text-xl text-white/90 mb-2">
                      📍 <strong>Práctica</strong>
                    </p>
                    <p className="text-white/70 font-light">
                      Calibrar tu respuesta en tiempo real
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-purple-400/30">
                    <p className="text-xl text-white/90 mb-2">
                      📍 <strong>Valentía</strong>
                    </p>
                    <p className="text-white/70 font-light">
                      Romper con lo que creías que eras
                    </p>
                  </div>
                </div>

                <div className="mt-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl p-8 rounded-3xl border-2 border-amber-400/30">
                  <p className="text-2xl font-bold text-white mb-4">
                    Si te animás a moverte entre extremos...
                  </p>
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    Te convertís en alguien adaptable, estratégico y libre
                  </p>
                </div>
              </div>
            </div>

            {/* Prompt Generator */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-indigo-400/30">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    BONUS: Pensamiento Espectral
                  </h3>
                  <p className="text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                    Tu prompt personalizado para ver tu decisión desde todos los ángulos
                  </p>
                </div>

                <button
                  onClick={generatePrompt}
                  className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-xl px-12 py-6 rounded-2xl hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-2xl mb-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500" />
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

                {userDecision && (
                  <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-indigo-400/20">
                    <p className="text-white/70 text-center font-light">
                      <strong className="text-indigo-300">Tu prompt incluye:</strong> Tu decisión actual. 
                      La IA te mostrará los ángulos ciegos y las opciones que no estás viendo por pensar en blanco o negro.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Final Message */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-indigo-400" />
                <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-indigo-400" />
              </div>
              
              <p className="text-2xl text-white/70 font-light">
                Como un <strong className="text-indigo-400">diseñador que juega con tonos</strong>, no como un juez que sentencia.
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

// Helper function to get RGB values from gradient
function getGradientRGB(gradient: string, position: number): string {
  const colors: Record<string, [number, number, number][]> = {
    'from-yellow-500 to-amber-500': [[234, 179, 8], [245, 158, 11]],
    'from-purple-500 to-pink-500': [[168, 85, 247], [236, 72, 153]],
    'from-blue-500 to-cyan-500': [[59, 130, 246], [6, 182, 212]],
    'from-green-500 to-emerald-500': [[34, 197, 94], [16, 185, 129]],
    'from-slate-500 to-gray-600': [[100, 116, 139], [75, 85, 99]],
    'from-orange-500 to-red-500': [[249, 115, 22], [239, 68, 68]],
    'from-red-500 to-rose-500': [[239, 68, 68], [244, 63, 94]],
    'from-teal-500 to-cyan-500': [[20, 184, 166], [6, 182, 212]],
    'from-indigo-500 to-purple-500': [[99, 102, 241], [168, 85, 247]],
    'from-cyan-500 to-blue-500': [[6, 182, 212], [59, 130, 246]]
  };

  const colorPair = colors[gradient] || [[168, 85, 247], [236, 72, 153]];
  return colorPair[position].join(',');
}

export const polaridadMetadata = {
  id: 8,
  title: "Polaridad",
  type: "document" as const,
  duration: "20 min"
};

export default PolaridadContent;