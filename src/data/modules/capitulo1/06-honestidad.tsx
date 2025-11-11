import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, Unlock, Flame, Eye, Gift, Star, ChevronRight, Zap } from 'lucide-react';

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

  const layers: Layer[] = [
    { 
      id: 1, 
      title: 'Tus excusas', 
      icon: '🎭', 
      description: 'Las historias que te contás',
      color: 'from-purple-500 to-pink-500',
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
      question: '¿Cuándo buscás aprobación en vez de confiar en vos?',
      insight: 'Buscar validación es humano. Depender solo de ella te debilita.',
      pointsValue: 10
    },
    { 
      id: 4, 
      title: 'Tu adicción a la comodidad', 
      icon: '🛋️', 
      description: 'Elegir lo fácil sobre lo necesario',
      color: 'from-green-500 to-emerald-500',
      question: '¿Qué situación incómoda estás evitando?',
      insight: 'La comodidad no es enemiga. Pero el exceso te estanca.',
      pointsValue: 10
    },
    { 
      id: 5, 
      title: 'Tu tolerancia al "más o menos"', 
      icon: '😐', 
      description: 'Conformarte con la mediocridad',
      color: 'from-red-500 to-rose-500',
      question: '¿En qué área de tu vida aceptás menos de lo que merecés?',
      insight: 'Conformarte no te hace débil. Pero te aleja de tu potencial.',
      pointsValue: 15
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev.filter(p => p.life > 0).map(p => ({...p, life: p.life - 1}))];
        if (Math.random() > 0.7 && newParticles.length < 20) {
          newParticles.push({
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            life: 100,
            speed: Math.random() * 2 + 1
          });
        }
        return newParticles;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const unlockLayer = (layerId: number) => {
    if (!unlockedLayers.includes(layerId)) {
      setUnlockedLayers([...unlockedLayers, layerId]);
      const layer = layers.find(l => l.id === layerId);
      if (layer) {
        setClarityPoints(prev => prev + layer.pointsValue);
      }
    }
    setCurrentLayer(layerId);
  };

  const completeLayerReflection = (layerId: number, reflection: string) => {
    setLayerReflections({...layerReflections, [layerId]: reflection});
    setCurrentLayer(null);
  };

  const addBurningItem = () => {
    if (newItem.trim()) {
      setBurningItems([...burningItems, newItem]);
      setClarityPoints(prev => prev + 5);
      setNewItem('');
      setBurnAnimation(true);
      setTimeout(() => setBurnAnimation(false), 1000);
    }
  };

  const removeBurningItem = (index: number) => {
    setBurningItems(burningItems.filter((_, i) => i !== index));
  };

  const generatePrompt = () => {
    const prompt = `🌅 Imaginá que pasó un año. Lograste cambios reales en tu vida. Ahora, desde ese "yo más consciente", escribile una carta honesta a tu "yo de hoy".

Contale:
• Qué patrones dejaste ir (sin castigarte, solo observando)
• Qué aprendiste sobre vos mismo en el proceso
• Qué cambió en tu día a día y cómo te sentís ahora

${burningItems.length > 0 ? `\nCosas que decidí soltar:\n${burningItems.map(item => `- ${item}`).join('\n')}` : ''}

${Object.keys(layerReflections).length > 0 ? `\nReflexiones que tuve:\n${Object.values(layerReflections).map(r => `- ${r}`).join('\n')}` : ''}

Escribí con claridad y compasión. Como alguien que se conoce mejor... y se acepta más.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const allLayersCompleted = unlockedLayers.length === layers.length;

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life / 100,
              transform: `translateY(-${(100 - particle.life) * particle.speed}px)`
            }}
          />
        ))}
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-8 max-w-3xl">
            <div className="animate-pulse">
              <div className="text-8xl mb-6">🔮</div>
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                El Motor del Por Qué
              </h1>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
              <p className="text-2xl text-white/90 leading-relaxed mb-6">
                Bienvenido a tu <span className="text-cyan-300 font-semibold">viaje interior</span>.
              </p>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                No es un test. No es una lección. Es un <span className="text-pink-300 font-semibold">espejo interactivo</span> donde vas a explorar 5 capas de tu ser.
              </p>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-300/30 mb-8">
                <p className="text-lg text-white/90">
                  Cada capa desbloqueada te da <span className="text-yellow-300 font-bold">puntos de claridad</span>.
                  <br/>Al final, recibirás un <span className="text-cyan-300 font-bold">mensaje de tu yo futuro</span>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setGameState('journey')}
              className="group bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <Sparkles className="w-6 h-6 animate-pulse" />
              Comenzar el viaje
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'journey') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden p-4 sm:p-8">
        {particles.slice(0, 15).map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life / 150,
              animation: 'float 4s ease-in-out infinite'
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
              <div>
                <p className="text-white/60 text-sm">Puntos de Claridad</p>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  {clarityPoints}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-sm">Capas Desbloqueadas</p>
              <p className="text-2xl font-bold text-cyan-400">
                {unlockedLayers.length} / {layers.length}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 mb-12">
          {layers.map((layer) => {
            const isUnlocked = unlockedLayers.includes(layer.id);
            const isCompleted = layerReflections[layer.id];
            const isActive = currentLayer === layer.id;

            return (
              <div
                key={layer.id}
                className={`relative transition-all duration-500 ${
                  isActive ? 'scale-105' : ''
                }`}
              >
                <div
                  className={`bg-gradient-to-r ${layer.color} p-1 rounded-3xl cursor-pointer transform hover:scale-102 transition-all duration-300 ${
                    !isUnlocked ? 'opacity-50 grayscale' : 'shadow-2xl'
                  }`}
                  onClick={() => !isActive && unlockLayer(layer.id)}
                >
                  <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{layer.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {layer.title}
                        </h3>
                        <p className="text-white/60">{layer.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                        ) : isUnlocked ? (
                          <Unlock className="w-8 h-8 text-cyan-400" />
                        ) : (
                          <Lock className="w-8 h-8 text-white/30" />
                        )}
                      </div>
                    </div>

                    {isActive && (
                      <div className="mt-6 space-y-4 animate-fadeIn">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                          <p className="text-cyan-300 font-medium mb-2">🤔 Pregunta de reflexión:</p>
                          <p className="text-white/90 text-lg">{layer.question}</p>
                        </div>
                        
                        <input
                          type="text"
                          placeholder="Escribí tu respuesta honesta..."
                          className="w-full bg-white/10 backdrop-blur text-white placeholder-white/40 p-4 rounded-2xl border border-white/20 focus:border-cyan-400 focus:outline-none transition-all"
                          onKeyPress={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (e.key === 'Enter' && target.value.trim()) {
                              completeLayerReflection(layer.id, target.value);
                            }
                          }}
                        />

                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-2xl border border-purple-300/30">
                          <p className="text-white/80 text-sm italic">💡 {layer.insight}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl p-8 rounded-3xl border border-orange-300/30">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-8 h-8 text-orange-400" />
              <h2 className="text-3xl font-bold text-white">Ritual de Liberación</h2>
            </div>
            
            <p className="text-white/80 mb-6">
              Escribí algo que estés listo para soltar. No para destruirlo, sino para dejarlo ir con consciencia.
            </p>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addBurningItem()}
                placeholder="Ej: Decir que sí cuando quiero decir que no..."
                className="flex-1 bg-white/10 backdrop-blur text-white placeholder-white/40 p-4 rounded-2xl border border-white/20 focus:border-orange-400 focus:outline-none"
              />
              <button
                onClick={addBurningItem}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-transform"
              >
                <Flame className="w-6 h-6" />
              </button>
            </div>

            {burningItems.length > 0 && (
              <div className="space-y-3">
                <p className="text-white/60 text-sm mb-3">🍃 Estás soltando:</p>
                {burningItems.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-white/5 p-4 rounded-2xl border border-orange-300/30 flex items-center gap-3 ${
                      burnAnimation ? 'animate-pulse' : ''
                    }`}
                  >
                    <span className="text-2xl">🔥</span>
                    <span className="flex-1 text-white/90">{item}</span>
                    <button
                      onClick={() => removeBurningItem(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {allLayersCompleted && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 backdrop-blur-xl p-12 rounded-3xl border-2 border-white/30 shadow-2xl text-center">
              <div className="animate-pulse mb-6">
                <Eye className="w-20 h-20 text-cyan-400 mx-auto" />
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                ✨ Has completado el viaje interior
              </h2>
              
              <p className="text-2xl text-white/80 mb-8">
                El coraje de ser honesto con vos mismo es el inicio de toda transformación.
              </p>

              <div className="bg-white/10 p-6 rounded-2xl mb-8">
                <p className="text-xl text-cyan-300 mb-2">
                  Ganaste {clarityPoints} puntos de claridad
                </p>
                <p className="text-white/70">
                  Desbloqueaste {unlockedLayers.length} capas de autoconocimiento
                </p>
              </div>

              {!showFinalMirror ? (
                <button
                  onClick={() => setShowFinalMirror(true)}
                  className="group bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <Gift className="w-6 h-6 animate-bounce" />
                  Recibir mensaje de mi Yo Futuro
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              ) : (
                <div className="animate-fadeIn space-y-6">
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-8 rounded-3xl border border-amber-300/30">
                    <p className="text-2xl text-white/90 mb-4">
                      🎁 Tu prompt personalizado está listo
                    </p>
                    <p className="text-white/70 mb-6">
                      Copialo y úsalo en ChatGPT o Claude para recibir una carta desde tu yo futuro
                    </p>
                    <button
                      onClick={generatePrompt}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                    >
                      {copiedPrompt ? (
                        <>
                          <span>✓</span>
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <span>📋</span>
                          <span>Copiar prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <p className="text-sm text-white/60 mb-2">💡 Incluye:</p>
                    <ul className="text-left text-white/80 space-y-1">
                      <li>• {burningItems.length} cosas que decidiste soltar</li>
                      <li>• {Object.keys(layerReflections).length} reflexiones profundas</li>
                      <li>• Tu viaje completo de autoconocimiento</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
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