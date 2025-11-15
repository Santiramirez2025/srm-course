import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Lock, Unlock, Flame, Eye, Gift, Star, ChevronRight, Zap, Trash2, CheckCircle2 } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Layer {
  id: number;
  title: string;
  icon: string;
  description: string;
  color: string;
  question: string;
  insight: string;
  pointsValue: number;
  gradient: string;
}

interface LayerReflections {
  [key: number]: string;
}

export const HonestidadContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'journey'>('intro');
  const [clarityPoints, setClarityPoints] = useState<number>(0);
  const [unlockedLayers, setUnlockedLayers] = useState<number[]>([]);
  const [currentLayer, setCurrentLayer] = useState<number | null>(null);
  const [burningItems, setBurningItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [layerReflections, setLayerReflections] = useState<LayerReflections>({});
  const [showFinalMirror, setShowFinalMirror] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [burnAnimation, setBurnAnimation] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const layers: Layer[] = [
    { 
      id: 1, 
      title: 'Tus excusas', 
      icon: '🎭', 
      description: 'Las historias que te contás',
      color: 'from-violet-500 to-purple-500',
      gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
      question: '¿Qué excusa usás más seguido para no actuar?',
      insight: 'Las excusas son defensas. Reconocerlas te da poder de elección.',
      pointsValue: 5
    },
    { 
      id: 2, 
      title: 'Tus autoengaños', 
      icon: '🤥', 
      description: 'Las verdades que evitás',
      color: 'from-amber-500 to-orange-500',
      gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
      question: '¿Qué verdad sobre vos sabés pero evitás aceptar?',
      insight: 'Los autoengaños cuestan energía mental. Liberarlos es liberador.',
      pointsValue: 10
    },
    { 
      id: 3, 
      title: 'Tu dependencia de aplausos', 
      icon: '👏', 
      description: 'Vivir para validación externa',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
      question: '¿Cuándo buscás aprobación en vez de confiar en vos?',
      insight: 'Buscar validación es humano. Depender solo de ella te debilita.',
      pointsValue: 10
    },
    { 
      id: 4, 
      title: 'Tu adicción a la comodidad', 
      icon: '🛋️', 
      description: 'Elegir lo fácil sobre lo necesario',
      color: 'from-emerald-500 to-green-500',
      gradient: 'from-emerald-500/20 via-green-500/20 to-lime-500/20',
      question: '¿Qué situación incómoda estás evitando?',
      insight: 'La comodidad no es enemiga. Pero el exceso te estanca.',
      pointsValue: 10
    },
    { 
      id: 5, 
      title: 'Tu tolerancia al "más o menos"', 
      icon: '😐', 
      description: 'Conformarte con la mediocridad',
      color: 'from-rose-500 to-pink-500',
      gradient: 'from-rose-500/20 via-pink-500/20 to-fuchsia-500/20',
      question: '¿En qué área de tu vida aceptás menos de lo que merecés?',
      insight: 'Conformarte no te hace débil. Pero te aleja de tu potencial.',
      pointsValue: 15
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

  const unlockLayer = useCallback((layerId: number) => {
    if (!unlockedLayers.includes(layerId)) {
      setUnlockedLayers(prev => [...prev, layerId]);
      const layer = layers.find(l => l.id === layerId);
      if (layer) {
        setClarityPoints(prev => prev + layer.pointsValue);
      }
    }
    setCurrentLayer(layerId);
  }, [unlockedLayers, layers]);

  const completeLayerReflection = useCallback((layerId: number, reflection: string) => {
    setLayerReflections(prev => ({...prev, [layerId]: reflection}));
    setCurrentLayer(null);
  }, []);

  const addBurningItem = useCallback(() => {
    if (newItem.trim()) {
      setBurningItems(prev => [...prev, newItem]);
      setClarityPoints(prev => prev + 5);
      setNewItem('');
      setBurnAnimation(true);
      setTimeout(() => setBurnAnimation(false), 800);
    }
  }, [newItem]);

  const removeBurningItem = useCallback((index: number) => {
    setBurningItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const generatePrompt = useCallback(() => {
    const prompt = `🌅 Imaginá que pasó un año. Lograste cambios reales en tu vida. Ahora, desde ese "yo más consciente", escribile una carta honesta a tu "yo de hoy".

Contale:
- Qué patrones dejaste ir (sin castigarte, solo observando)
- Qué aprendiste sobre vos mismo en el proceso
- Qué cambió en tu día a día y cómo te sentís ahora

${burningItems.length > 0 ? `\nCosas que decidí soltar:\n${burningItems.map(item => `- ${item}`).join('\n')}` : ''}

${Object.keys(layerReflections).length > 0 ? `\nReflexiones que tuve:\n${Object.values(layerReflections).map(r => `- ${r}`).join('\n')}` : ''}

Escribí con claridad y compasión. Como alguien que se conoce mejor... y se acepta más.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  }, [burningItems, layerReflections]);

  const allLayersCompleted = unlockedLayers.length === layers.length;

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs Premium */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>

        {/* Refined particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 120) * 0.6,
              transform: `translateY(-${(120 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 120})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(96, 165, 250, 0.5)'
            }}
          />
        ))}
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
          <div 
            className="text-center space-y-12 max-w-4xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🔮
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 leading-tight">
                  El Motor del
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 leading-tight">
                  Por Qué
                </span>
              </h1>
            </div>
            
            {/* Content Card Premium */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  <p className="text-2xl sm:text-3xl text-white/90 leading-relaxed font-light">
                    Bienvenido a tu <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">viaje interior</span>
                  </p>
                  
                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                  
                  <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
                    No es un test. No es una lección. Es un <span className="font-semibold text-pink-300">espejo interactivo</span> donde vas a explorar 5 capas de tu ser.
                  </p>

                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 gap-6 pt-4">
                    <div className="relative group/card">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl opacity-0 group-hover/card:opacity-30 blur transition-opacity duration-300" />
                      <div className="relative bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-6 rounded-2xl border border-purple-400/20 backdrop-blur-xl">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-white font-semibold mb-1">Puntos de Claridad</p>
                            <p className="text-white/60 text-sm font-light">Cada capa desbloqueada suma puntos</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group/card">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover/card:opacity-30 blur transition-opacity duration-300" />
                      <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl border border-cyan-400/20 backdrop-blur-xl">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Gift className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-white font-semibold mb-1">Mensaje Futuro</p>
                            <p className="text-white/60 text-sm font-light">Al final: tu yo futuro te escribe</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => setGameState('journey')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-xl sm:text-2xl font-bold px-10 sm:px-14 py-5 sm:py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Sparkles className="relative w-6 h-6 animate-pulse" />
              <span className="relative">Comenzar el viaje</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= JOURNEY SCREEN =============
  if (gameState === 'journey') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Subtle particles */}
        {particles.slice(0, 12).map(particle => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life / 200,
              boxShadow: '0 0 4px rgba(96, 165, 250, 0.3)'
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Stats Header Premium */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                <div className="grid sm:grid-cols-2 gap-6">
                  
                  {/* Clarity Points */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-500/30 rounded-2xl blur-xl animate-pulse" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Zap className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                        Puntos de Claridad
                      </p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                        {clarityPoints}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-6 sm:justify-end">
                    <div className="text-right">
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                        Capas Desbloqueadas
                      </p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        {unlockedLayers.length}<span className="text-white/30">/{layers.length}</span>
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Star className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${(unlockedLayers.length / layers.length) * 100}%`,
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Layers Grid Premium */}
          <div 
            className="grid gap-6 mb-16"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            {layers.map((layer, index) => {
              const isUnlocked = unlockedLayers.includes(layer.id);
              const isCompleted = layerReflections[layer.id];
              const isActive = currentLayer === layer.id;
              const isHovered = hoveredLayer === layer.id;

              return (
                <div
                  key={layer.id}
                  className={`relative transition-all duration-500 ${
                    isActive ? 'scale-[1.02]' : ''
                  }`}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateX(0)' : 'translateX(-50px)',
                    transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                  }}
                >
                  {/* Glow effect */}
                  <div 
                    className={`absolute -inset-1 bg-gradient-to-r ${layer.color} rounded-3xl transition-all duration-500 ${
                      isUnlocked 
                        ? isHovered || isActive 
                          ? 'opacity-40 blur-2xl' 
                          : 'opacity-20 blur-xl'
                        : 'opacity-0'
                    }`}
                  />

                  <div
                    className={`relative cursor-pointer transform transition-all duration-500 ${
                      !isUnlocked 
                        ? 'opacity-60 grayscale hover:opacity-80' 
                        : 'hover:scale-[1.01]'
                    }`}
                    onClick={() => !isActive && unlockLayer(layer.id)}
                  >
                    <div className={`bg-gradient-to-br ${layer.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                      isActive 
                        ? `border-white/30 shadow-2xl` 
                        : isUnlocked
                          ? 'border-white/10 shadow-xl'
                          : 'border-white/5'
                    }`}>
                      
                      {/* Main Content */}
                      <div className="p-6 sm:p-8">
                        <div className="flex items-start gap-6">
                          
                          {/* Icon */}
                          <div className={`flex-shrink-0 transition-all duration-500 ${
                            isHovered ? 'scale-110 rotate-6' : ''
                          }`}>
                            <div className="relative">
                              <div className={`absolute inset-0 bg-gradient-to-r ${layer.color} rounded-2xl blur-xl transition-opacity duration-300 ${
                                isUnlocked ? 'opacity-50' : 'opacity-0'
                              }`} />
                              <div className={`relative text-6xl sm:text-7xl transition-all duration-500 ${
                                !isUnlocked ? 'grayscale' : ''
                              }`}>
                                {layer.icon}
                              </div>
                            </div>
                          </div>

                          {/* Text Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                                  {layer.title}
                                </h3>
                                <p className="text-white/60 text-base font-light">
                                  {layer.description}
                                </p>
                              </div>
                              
                              {/* Status Icon */}
                              <div className="flex-shrink-0">
                                {isCompleted ? (
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-yellow-500/30 rounded-xl blur-lg animate-pulse" />
                                    <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl">
                                      <Star className="w-6 h-6 text-white fill-white" />
                                    </div>
                                  </div>
                                ) : isUnlocked ? (
                                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Unlock className="w-6 h-6 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                    <Lock className="w-6 h-6 text-white/30" />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Points Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                              <Zap className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm font-semibold text-yellow-400">
                                +{layer.pointsValue} puntos
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {isActive && (
                          <div 
                            className="mt-8 space-y-6 animate-fadeIn"
                            style={{
                              animation: 'fadeInScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                          >
                            {/* Question Card */}
                            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                              <div className="flex items-start gap-3 mb-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                  <span className="text-xl">🤔</span>
                                </div>
                                <div>
                                  <p className="text-cyan-300 font-semibold mb-1">Pregunta de reflexión</p>
                                  <p className="text-white/90 text-lg leading-relaxed font-light">
                                    {layer.question}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Input */}
                            <input
                              type="text"
                              placeholder="Escribí tu respuesta honesta..."
                              autoFocus
                              className="w-full bg-white/5 backdrop-blur-xl text-white placeholder-white/40 px-6 py-5 rounded-2xl border-2 border-white/20 focus:border-cyan-400 focus:outline-none transition-all duration-300 text-lg font-light focus:bg-white/10"
                              onKeyPress={(e) => {
                                const target = e.target as HTMLInputElement;
                                if (e.key === 'Enter' && target.value.trim()) {
                                  completeLayerReflection(layer.id, target.value);
                                }
                              }}
                            />

                            {/* Insight Card */}
                            <div className={`bg-gradient-to-br ${layer.gradient} backdrop-blur-xl p-6 rounded-2xl border-2 border-white/10`}>
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 text-2xl">💡</div>
                                <p className="text-white/90 text-base leading-relaxed font-light italic">
                                  {layer.insight}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Liberation Ritual Premium */}
          <div 
            className="max-w-5xl mx-auto mb-16"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border-2 border-orange-300/20 shadow-2xl">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/30 rounded-2xl blur-xl animate-pulse" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      Ritual de Liberación
                    </h2>
                    <p className="text-white/60 font-light">
                      Suelta con consciencia, no con destrucción
                    </p>
                  </div>
                </div>
                
                <p className="text-white/70 mb-8 text-lg leading-relaxed font-light">
                  Escribí algo que estés listo para soltar. No para destruirlo, sino para dejarlo ir con consciencia.
                </p>

                {/* Input Section */}
                <div className="flex gap-3 mb-8">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addBurningItem()}
                    placeholder="Ej: Decir que sí cuando quiero decir que no..."
                    className="flex-1 bg-white/5 backdrop-blur-xl text-white placeholder-white/40 px-6 py-5 rounded-2xl border-2 border-white/20 focus:border-orange-400 focus:outline-none transition-all duration-300 text-base font-light focus:bg-white/10"
                  />
                  <button
                    onClick={addBurningItem}
                    disabled={!newItem.trim()}
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl font-semibold hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl flex items-center justify-center"
                  >
                    <Flame className="w-7 h-7" />
                  </button>
                </div>

                {/* Burning Items */}
                {burningItems.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🍃</span>
                      <p className="text-white/60 text-sm font-medium uppercase tracking-wider">
                        Estás soltando ({burningItems.length})
                      </p>
                    </div>
                    
                    <div className="grid gap-3">
                      {burningItems.map((item, index) => (
                        <div
                          key={index}
                          className={`group/item bg-white/5 backdrop-blur-xl p-5 rounded-2xl border-2 border-orange-300/20 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 ${
                            burnAnimation ? 'animate-pulse' : ''
                          }`}
                        >
                          <span className="text-3xl flex-shrink-0 animate-flicker">🔥</span>
                          <span className="flex-1 text-white/90 font-light leading-relaxed">
                            {item}
                          </span>
                          <button
                            onClick={() => removeBurningItem(index)}
                            className="flex-shrink-0 w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-all duration-300 opacity-0 group-hover/item:opacity-100 flex items-center justify-center"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Final Mirror Premium */}
          {allLayersCompleted && (
            <div 
              className="max-w-5xl mx-auto"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
                
                <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                  
                  {/* Icon */}
                  <div className="relative inline-block mb-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                    <div className="relative">
                      <Eye className="w-24 h-24 text-cyan-400 mx-auto animate-float" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                    ✨ Has completado
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                      el viaje interior
                    </span>
                  </h2>
                  
                  <p className="text-xl sm:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                    El coraje de ser honesto con vos mismo es el inicio de toda transformación.
                  </p>

                  {/* Stats Cards */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
                        {clarityPoints}
                      </div>
                      <p className="text-white/60 font-medium">Puntos de claridad</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                      <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                        {unlockedLayers.length}
                      </div>
                      <p className="text-white/60 font-medium">Capas desbloqueadas</p>
                    </div>
                  </div>

                  {!showFinalMirror ? (
                    <button
                      onClick={() => setShowFinalMirror(true)}
                      className="group/btn relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500" />
                      <Gift className="relative w-6 h-6 animate-bounce" />
                      <span className="relative">Recibir mensaje de mi Yo Futuro</span>
                      <ChevronRight className="relative w-6 h-6 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </button>
                  ) : (
                    <div 
                      className="space-y-8 animate-fadeInScale"
                      style={{
                        animation: 'fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-xl p-10 rounded-3xl border-2 border-amber-300/30">
                        <div className="text-5xl mb-6">🎁</div>
                        <h3 className="text-3xl font-bold text-white mb-4">
                          Tu prompt personalizado está listo
                        </h3>
                        <p className="text-white/70 mb-8 text-lg font-light leading-relaxed">
                          Copialo y úsalo en ChatGPT o Claude para recibir una carta desde tu yo futuro
                        </p>
                        <button
                          onClick={generatePrompt}
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg px-10 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
                        >
                          {copiedPrompt ? (
                            <>
                              <CheckCircle2 className="w-6 h-6" />
                              <span>¡Copiado al portapapeles!</span>
                            </>
                          ) : (
                            <>
                              <span className="text-2xl">📋</span>
                              <span>Copiar prompt personalizado</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                        <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-4">
                          💡 Tu prompt incluye
                        </p>
                        <div className="grid sm:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="text-4xl font-black text-orange-400 mb-2">
                              {burningItems.length}
                            </div>
                            <p className="text-white/60 text-sm font-light">Cosas soltadas</p>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-black text-purple-400 mb-2">
                              {Object.keys(layerReflections).length}
                            </div>
                            <p className="text-white/60 text-sm font-light">Reflexiones</p>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-black text-cyan-400 mb-2">
                              100%
                            </div>
                            <p className="text-white/60 text-sm font-light">Autoconocimiento</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
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

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }

          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          .animate-fadeInScale {
            animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          .animate-flicker {
            animation: flicker 2s ease-in-out infinite;
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

export const honestidadMetadata = {
  id: 6,
  title: "Honestidad",
  type: "document" as const,
  duration: "20 min"
};