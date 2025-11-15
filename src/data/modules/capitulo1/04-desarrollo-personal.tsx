import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos
type GameStage = 'intro' | 'select-area' | 'mirror' | 'actions' | 'balance' | 'map' | 'reward' | 'complete';

interface Area {
  id: string;
  name: string;
  icon: string;
  limitante: string;
  potenciadora: string;
  color: string;
}

export const DesarrolloPersonalGame = () => {
  // Estados principales
  const [gameStage, setGameStage] = useState<GameStage>('intro');
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [greenScore, setGreenScore] = useState(0);
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedBelief, setSelectedBelief] = useState<'limitante' | 'potenciadora' | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [balanceValue, setBalanceValue] = useState(50);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Áreas disponibles con colores premium
  const areas: Area[] = [
    { id: 'dinero', name: 'Dinero', icon: '💰', limitante: 'Siempre fui malo con el dinero', potenciadora: 'Soy capaz de generar y administrar riqueza', color: 'from-yellow-500 to-amber-600' },
    { id: 'amor', name: 'Amor', icon: '❤️', limitante: 'No merezco amor verdadero', potenciadora: 'Soy digno de amor profundo y recíproco', color: 'from-pink-500 to-rose-600' },
    { id: 'creatividad', name: 'Creatividad', icon: '🎨', limitante: 'No soy creativo', potenciadora: 'La creatividad fluye naturalmente en mí', color: 'from-purple-500 to-violet-600' },
    { id: 'liderazgo', name: 'Liderazgo', icon: '👑', limitante: 'No puedo liderar', potenciadora: 'Inspiro y guío a otros con confianza', color: 'from-blue-500 to-indigo-600' },
    { id: 'salud', name: 'Salud', icon: '💪', limitante: 'Mi cuerpo no responde', potenciadora: 'Mi cuerpo es fuerte y resiliente', color: 'from-green-500 to-emerald-600' },
    { id: 'hablar', name: 'Hablar en público', icon: '🎤', limitante: 'Me paraliza hablar en público', potenciadora: 'Me expreso con claridad y seguridad', color: 'from-orange-500 to-red-600' }
  ];

  // Acciones por área
  const getActionsForArea = (areaId: string) => {
    const actions: Record<string, string[]> = {
      dinero: [
        'Revisar mis gastos de esta semana y hacer una lista simple',
        'Investigar 10 minutos sobre inversión o finanzas personales',
        'Ahorrar aunque sea $100 esta semana con intención'
      ],
      amor: [
        'Escribir 3 cualidades que merezco en una relación',
        'Hacer algo amable por mí mismo hoy',
        'Establecer un límite saludable con alguien cercano'
      ],
      creatividad: [
        'Crear algo pequeño hoy: un dibujo, una foto, una frase',
        'Probar una técnica nueva en mi campo (aunque salga mal)',
        'Compartir una idea que tengo guardada hace tiempo'
      ],
      liderazgo: [
        'Tomar una decisión sin pedir aprobación de nadie',
        'Dar feedback constructivo a alguien de mi equipo',
        'Proponer una idea en una reunión (aunque dé miedo)'
      ],
      salud: [
        'Caminar 15 minutos hoy sin excusas',
        'Elegir una comida nutritiva en vez de la fácil',
        'Dormir 30 minutos antes esta noche'
      ],
      hablar: [
        'Grabarme hablando 1 minuto sobre algo que me apasiona',
        'Hablar primero en una conversación grupal hoy',
        'Hacer una pregunta en una reunión o clase'
      ]
    };
    return actions[areaId] || actions.dinero;
  };

  // Guardar progreso en localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('dev-personal-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setGreenScore(progress.greenScore || 0);
      setCompletedStages(progress.completedStages || []);
    }
  }, []);

  useEffect(() => {
    const progress = {
      greenScore,
      completedStages,
      selectedArea: selectedArea?.id
    };
    localStorage.setItem('dev-personal-progress', JSON.stringify(progress));
  }, [greenScore, completedStages, selectedArea]);

  // Función para avanzar de stage
  const advanceStage = (nextStage: GameStage, points: number = 0) => {
    if (points > 0) {
      setGreenScore(prev => Math.min(prev + points, 100));
    }
    if (!completedStages.includes(gameStage)) {
      setCompletedStages(prev => [...prev, gameStage]);
    }
    setGameStage(nextStage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reiniciar juego
  const resetGame = () => {
    setGameStage('intro');
    setSelectedArea(null);
    setGreenScore(0);
    setCompletedStages([]);
    setSelectedBelief(null);
    setSelectedAction(null);
    setBalanceValue(50);
    localStorage.removeItem('dev-personal-progress');
  };

  // Copiar prompt final
  const copyFinalPrompt = () => {
    const prompt = `Generá un plan diario para consolidar mi nueva identidad como "${selectedArea?.potenciadora}".

Quiero ejercicios prácticos, visualizaciones guiadas y afirmaciones personalizadas para los próximos 7 días.

Contexto:
- Área de trabajo: ${selectedArea?.name}
- Creencia vieja que estoy soltando: "${selectedArea?.limitante}"
- Nueva identidad que estoy practicando: "${selectedArea?.potenciadora}"

Dame un plan estructurado día por día, con acciones pequeñas pero significativas.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setShowConfetti(true);
    setTimeout(() => {
      setCopiedPrompt(false);
      setShowConfetti(false);
    }, 3000);
  };

  // Animaciones de confetti PREMIUM
  const ConfettiParticle = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute w-3 h-3 rounded-full shadow-lg"
      style={{
        background: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB'][Math.floor(Math.random() * 5)],
        left: `${Math.random() * 100}%`,
        top: '-10px',
        boxShadow: '0 0 10px currentColor'
      }}
      initial={{ y: 0, opacity: 1, rotate: 0 }}
      animate={{ 
        y: window.innerHeight, 
        opacity: 0,
        rotate: Math.random() * 360
      }}
      transition={{ duration: 2 + Math.random(), delay, ease: 'easeIn' }}
    />
  );

  // Barra de progreso PREMIUM
  const ProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl blur-lg opacity-50 animate-pulse" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🎮</span>
              </div>
            </div>
            <div>
              <span className="text-white font-black text-base uppercase tracking-wide">Tu Transformación</span>
              {selectedArea && (
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                  <span>{selectedArea.icon}</span>
                  <span>{selectedArea.name}</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={resetGame}
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all text-gray-400 hover:text-white font-semibold"
          >
            <span className="text-lg group-hover:rotate-180 transition-transform duration-500">🔄</span>
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
        
        {/* Progress bar con shimmer */}
        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${greenScore}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            {greenScore > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-sm opacity-50" />
            )}
          </motion.div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-400 font-semibold mt-2">
          <span>Vaso verde: {greenScore}% lleno</span>
          {greenScore >= 100 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-green-400 flex items-center gap-1"
            >
              <span>✨</span>
              <span>¡Completado!</span>
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );

  // STAGE 1: INTRO CINEMATOGRÁFICA PREMIUM
  const IntroStage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-violet-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grain Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Hero icon con mega glow */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="relative inline-block mb-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 transform hover:scale-110 transition-all duration-500">
            <span className="text-8xl animate-float">🧠</span>
          </div>
        </motion.div>

        {/* Título premium */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 leading-tight mb-6"
        >
          El Juego de la Identidad
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl sm:text-3xl text-gray-300 mb-12 font-medium leading-relaxed"
        >
          Una experiencia interactiva para transformar cómo te ves a vos mismo
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="space-y-8"
        >
          {/* Info card premium */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8">
              <p className="text-white text-lg font-semibold mb-2">
                En los próximos minutos, vas a descubrir qué está frenando tu crecimiento.
              </p>
              <p className="text-gray-300 text-base">
                Y más importante: cómo cambiarlo.
              </p>
            </div>
          </div>

          {/* CTA Button premium */}
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 animate-pulse" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => advanceStage('select-area', 5)}
              className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-12 py-6 rounded-3xl text-xl sm:text-2xl font-black shadow-2xl hover:shadow-green-500/50 transition-all flex items-center gap-3"
            >
              <span>Empezar mi transformación</span>
              <span className="text-2xl">→</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Meta info premium */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12 flex items-center justify-center gap-8 flex-wrap"
        >
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
            <span className="text-2xl">⏱️</span>
            <span className="text-sm text-gray-300 font-semibold">5-10 minutos</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
            <span className="text-2xl">💾</span>
            <span className="text-sm text-gray-300 font-semibold">Progreso automático</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // STAGE 2: SELECCIÓN DE ÁREA PREMIUM
  const SelectAreaStage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grain texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            ⚡ Elegí tu campo de batalla
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            ¿En qué área de tu vida sentís que tu identidad actual te está limitando?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, type: 'spring', bounce: 0.3 }}
              className="relative group"
            >
              {/* Mega glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${area.color} rounded-3xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500`} />
              
              <motion.button
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedArea(area);
                  advanceStage('mirror', 10);
                }}
                className={`relative w-full bg-gradient-to-br ${area.color} p-8 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 hover:border-white/30 transition-all`}
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl" />
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {area.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                    {area.name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 font-medium">
                    Trabajar en mi relación con {area.name.toLowerCase()}
                  </p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 text-4xl opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0, rotate: -180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                >
                  ✨
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // STAGE 3: ESPEJO DE CREENCIAS PREMIUM
  const MirrorStage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            🪞 El Espejo de Creencias
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            Frente a ti hay dos versiones. ¿Cuál elegís practicar hoy?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Creencia limitante */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="relative group"
          >
            <div className={`absolute -inset-2 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 ${
              selectedBelief === 'limitante' 
                ? 'bg-gradient-to-r from-red-500 to-orange-500 opacity-50' 
                : 'group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:opacity-30'
            }`} />
            
            <motion.button
              whileHover={selectedBelief === null ? { scale: 1.02, y: -4 } : {}}
              whileTap={selectedBelief === null ? { scale: 0.98 } : {}}
              onClick={() => {
                if (selectedBelief === null) {
                  setSelectedBelief('limitante');
                  setTimeout(() => advanceStage('actions', 0), 1500);
                }
              }}
              disabled={selectedBelief !== null}
              className={`relative w-full h-full p-8 sm:p-10 rounded-3xl border-2 transition-all shadow-2xl ${
                selectedBelief === 'limitante'
                  ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/50 backdrop-blur-2xl'
                  : selectedBelief === null
                  ? 'bg-white/5 border-white/10 hover:border-red-400/30 hover:bg-white/10 backdrop-blur-2xl'
                  : 'bg-white/[0.02] border-white/5 opacity-40 backdrop-blur-xl'
              }`}
            >
              {/* Icon con glow */}
              <div className="relative inline-block mb-8">
                {selectedBelief === 'limitante' && (
                  <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                )}
                <div className={`relative text-8xl ${selectedBelief === 'limitante' ? 'animate-pulse' : ''}`}>
                  ❌
                </div>
              </div>
              
              <h3 className="text-3xl font-black text-white mb-6">Identidad Vieja</h3>
              <p className="text-lg sm:text-xl text-gray-300 italic mb-8 leading-relaxed font-medium">
                "{selectedArea?.limitante}"
              </p>
              <div className={`px-6 py-3 rounded-2xl border ${
                selectedBelief === 'limitante' 
                  ? 'bg-red-500/20 border-red-400/30' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <p className="text-sm text-red-300 font-semibold">
                  Si elegís esta, tu vaso rojo se llena más
                </p>
              </div>
            </motion.button>

            {selectedBelief === 'limitante' && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.6 }}
                className="absolute -top-6 -right-6 z-20"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-red-500 to-orange-600 rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-2xl border-4 border-white/20">
                    🔴
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Creencia potenciadora */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="relative group"
          >
            <div className={`absolute -inset-2 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 ${
              selectedBelief === 'potenciadora' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-50' 
                : 'group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-500 group-hover:opacity-30'
            }`} />
            
            <motion.button
              whileHover={selectedBelief === null ? { scale: 1.02, y: -4 } : {}}
              whileTap={selectedBelief === null ? { scale: 0.98 } : {}}
              onClick={() => {
                if (selectedBelief === null) {
                  setSelectedBelief('potenciadora');
                  setTimeout(() => advanceStage('actions', 20), 1500);
                }
              }}
              disabled={selectedBelief !== null}
              className={`relative w-full h-full p-8 sm:p-10 rounded-3xl border-2 transition-all shadow-2xl ${
                selectedBelief === 'potenciadora'
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50 backdrop-blur-2xl'
                  : selectedBelief === null
                  ? 'bg-white/5 border-white/10 hover:border-green-400/30 hover:bg-white/10 backdrop-blur-2xl'
                  : 'bg-white/[0.02] border-white/5 opacity-40 backdrop-blur-xl'
              }`}
            >
              {/* Icon con glow */}
              <div className="relative inline-block mb-8">
                {selectedBelief === 'potenciadora' && (
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                )}
                <div className={`relative text-8xl ${selectedBelief === 'potenciadora' ? 'animate-pulse' : ''}`}>
                  ✨
                </div>
              </div>
              
              <h3 className="text-3xl font-black text-white mb-6">Identidad Nueva</h3>
              <p className="text-lg sm:text-xl text-gray-300 italic mb-8 leading-relaxed font-medium">
                "{selectedArea?.potenciadora}"
              </p>
              <div className={`px-6 py-3 rounded-2xl border ${
                selectedBelief === 'potenciadora' 
                  ? 'bg-green-500/20 border-green-400/30' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <p className="text-sm text-green-300 font-semibold">
                  Si elegís esta, tu vaso verde empieza a brillar
                </p>
              </div>
            </motion.button>

            {selectedBelief === 'potenciadora' && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.6 }}
                className="absolute -top-6 -right-6 z-20"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-2xl border-4 border-white/20">
                    🟢
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {selectedBelief && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="mt-12"
          >
            <div className="relative group">
              <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-30 ${
                selectedBelief === 'potenciadora' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
              }`} />
              
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl">
                <p className="text-white text-lg sm:text-xl leading-relaxed text-center">
                  {selectedBelief === 'potenciadora' ? (
                    <>
                      <span className="text-3xl mr-2">💚</span>
                      <strong className="font-black">¡Excelente elección!</strong> Elegir practicar la nueva identidad es el primer paso. 
                      Ahora viene lo importante: las acciones que la hacen real.
                    </>
                  ) : (
                    <>
                      <span className="text-3xl mr-2">🧡</span>
                      <strong className="font-black">Está bien.</strong> A veces necesitamos reconocer dónde estamos parados. 
                      Pero recordá: esta creencia es solo una historia, no la verdad.
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // STAGE 4: MICROACCIONES PREMIUM
  const ActionsStage = () => {
    const actions = selectedArea ? getActionsForArea(selectedArea.id) : [];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              🎯 Microacciones de Hoy
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
              Elegí UNA acción pequeña que vas a hacer hoy para llenar tu vaso verde
            </p>
          </motion.div>

          <div className="space-y-6">
            {actions.map((action, index) => {
              const isSelected = selectedAction === action;
              
              return (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15, type: 'spring', bounce: 0.3 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-1 rounded-3xl blur-xl transition-opacity duration-500 ${
                    isSelected 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-50' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20'
                  }`} />
                  
                  <motion.button
                    whileHover={!selectedAction ? { scale: 1.02, x: 8 } : {}}
                    whileTap={!selectedAction ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (!selectedAction) {
                        setSelectedAction(action);
                        setTimeout(() => advanceStage('balance', 20), 1500);
                      }
                    }}
                    disabled={selectedAction !== null}
                    className={`relative w-full p-8 rounded-3xl border-2 transition-all text-left shadow-2xl ${
                      isSelected
                        ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/50 backdrop-blur-2xl'
                        : selectedAction === null
                        ? 'bg-white/5 border-white/10 hover:border-green-400/30 hover:bg-white/10 backdrop-blur-2xl'
                        : 'bg-white/[0.02] border-white/5 opacity-40 backdrop-blur-xl'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      {/* Number/Check icon */}
                      <div className="flex-shrink-0">
                        <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black transition-all ${
                          isSelected 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50' 
                            : 'bg-white/10 text-gray-400 border-2 border-white/20'
                        }`}>
                          {isSelected ? '✅' : index + 1}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <p className="text-white text-lg sm:text-xl font-semibold leading-relaxed mb-2">
                          {action}
                        </p>
                        
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mt-4 bg-green-500/20 border border-green-400/30 rounded-xl px-4 py-2 inline-flex"
                          >
                            <span className="text-2xl">🎉</span>
                            <span className="text-green-300 font-bold text-sm">
                              ¡Comprometido! Esto suma en tu vaso verde.
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {selectedAction && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.3 }}
              className="mt-12"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl border-2 border-green-400/30 p-8 rounded-3xl">
                  <p className="text-white text-center text-lg leading-relaxed">
                    <span className="text-3xl mr-2">💪</span>
                    <strong className="font-black">Recordá:</strong> No importa si sale perfecto. Lo que importa es que lo hagas. 
                    Cada acción, por pequeña que sea, cambia tu identidad.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // STAGE 5: BALANCE GAME PREMIUM
  const BalanceStage = () => {
    const [isDragging, setIsDragging] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              ⚖️ El Juego del Balance
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
              Moviendo el control, equilibrá tu identidad. Tu objetivo: llenar el vaso verde al máximo.
            </p>
          </motion.div>

          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 sm:p-12 rounded-3xl shadow-2xl">
              {/* Balanza visual PREMIUM */}
              <div className="flex items-end justify-center gap-12 sm:gap-20 mb-12">
                {/* Vaso Verde */}
                <motion.div
                  className="text-center"
                  animate={{ 
                    y: isDragging ? [0, -5, 0] : 0,
                    scale: balanceValue > 70 ? [1, 1.05, 1] : 1
                  }}
                  transition={{ 
                    repeat: isDragging || balanceValue > 70 ? Infinity : 0, 
                    duration: 1 
                  }}
                >
                  <div className="relative">
                    {/* Glow effect cuando está lleno */}
                    {balanceValue > 70 && (
                      <div className="absolute -inset-4 bg-green-500/30 rounded-full blur-2xl animate-pulse" />
                    )}
                    
                    {/* Líquido del vaso */}
                    <div 
                      className="relative w-32 sm:w-40 bg-gradient-to-t from-green-500 via-emerald-500 to-green-400 rounded-t-2xl mx-auto transition-all duration-700 shadow-2xl shadow-green-500/50"
                      style={{ height: `${balanceValue * 3}px` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      
                      {/* Sparkles cuando llega a 70%+ */}
                      {balanceValue > 70 && (
                        <motion.div
                          className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <span className="text-4xl">✨</span>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Recipiente del vaso */}
                    <div className="w-32 sm:w-40 h-48 border-4 border-green-500 border-t-0 rounded-b-2xl mx-auto bg-white/[0.02] backdrop-blur-sm shadow-xl" />
                  </div>
                  
                  <p className="mt-6 text-sm font-black text-green-400 uppercase tracking-wide">Vaso Verde</p>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mt-2">
                    {balanceValue}%
                  </p>
                </motion.div>

                {/* Ícono central de balanza */}
                <motion.div 
                  className="text-7xl sm:text-8xl mb-16"
                  animate={{
                    rotate: isDragging ? [-5, 5, -5] : 0
                  }}
                  transition={{
                    repeat: isDragging ? Infinity : 0,
                    duration: 0.5
                  }}
                >
                  ⚖️
                </motion.div>

                {/* Vaso Rojo */}
                <motion.div
                  className="text-center"
                  animate={{ 
                    y: isDragging ? [0, -5, 0] : 0,
                    scale: balanceValue < 30 ? [1, 1.05, 1] : 1
                  }}
                  transition={{ 
                    repeat: isDragging || balanceValue < 30 ? Infinity : 0, 
                    duration: 1,
                    delay: 0.5 
                  }}
                >
                  <div className="relative">
                    {/* Líquido del vaso */}
                    <div 
                      className="relative w-32 sm:w-40 bg-gradient-to-t from-red-500 via-orange-500 to-red-400 rounded-t-2xl mx-auto transition-all duration-700 shadow-2xl shadow-red-500/50"
                      style={{ height: `${(100 - balanceValue) * 3}px` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ animationDelay: '0.5s' }} />
                    </div>
                    
                    {/* Recipiente del vaso */}
                    <div className="w-32 sm:w-40 h-48 border-4 border-red-500 border-t-0 rounded-b-2xl mx-auto bg-white/[0.02] backdrop-blur-sm shadow-xl" />
                  </div>
                  
                  <p className="mt-6 text-sm font-black text-red-400 uppercase tracking-wide">Vaso Rojo</p>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mt-2">
                    {100 - balanceValue}%
                  </p>
                </motion.div>
              </div>

              {/* Control interactivo PREMIUM */}
              <div className="space-y-6">
                <div className="relative">
                  {/* Track del slider con glow */}
                  <div className="relative h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden shadow-inner border-2 border-white/20">
                    {/* Shimmer effect en el track */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                  
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={balanceValue}
                    onChange={(e) => setBalanceValue(Number(e.target.value))}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    className="absolute inset-0 w-full h-6 appearance-none cursor-pointer opacity-0"
                  />
                </div>

                {/* Feedback dinámico */}
                <div className="text-center">
                  <motion.div
                    key={balanceValue > 70 ? 'good' : balanceValue > 40 ? 'medium' : 'bad'}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.4 }}
                    className={`inline-block px-8 py-4 rounded-2xl border-2 backdrop-blur-xl ${
                      balanceValue > 70 
                        ? 'bg-green-500/20 border-green-400/50' 
                        : balanceValue > 40 
                        ? 'bg-yellow-500/20 border-yellow-400/50'
                        : 'bg-red-500/20 border-red-400/50'
                    }`}
                  >
                    <p className="text-lg sm:text-xl font-black text-white leading-relaxed">
                      {balanceValue > 70 && "🎉 ¡Tu identidad potenciadora domina! Así se hace."}
                      {balanceValue > 40 && balanceValue <= 70 && "⚖️ En transición. Seguí llenando el vaso verde."}
                      {balanceValue <= 40 && "💪 Todavía hay peso en el vaso rojo. Pero podés cambiarlo."}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Botón de continuar */}
              {balanceValue >= 60 ? (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="mt-10 relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => advanceStage('map', 15)}
                    className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-6 rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-3"
                  >
                    <span>Continuar al mapa de transformación</span>
                    <span className="text-2xl">→</span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-10"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl opacity-20 blur-xl" />
                    
                    <div className="relative bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-xl border-2 border-yellow-400/30 p-6 rounded-2xl">
                      <p className="text-yellow-200 text-center font-semibold leading-relaxed">
                        <span className="text-2xl mr-2">💡</span>
                        <strong className="font-black">Tip:</strong> Llevá el vaso verde al 60% o más para desbloquear el siguiente nivel
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // STAGE 6: MAPA DE TRANSFORMACIÓN PREMIUM
  const MapStage = () => {
    const [unlockedSteps, setUnlockedSteps] = useState<number[]>([0]);

    const steps = [
      {
        id: 0,
        icon: '🔍',
        title: 'Reconocé la identidad vieja',
        description: `Aceptá que "${selectedArea?.limitante}" solo es una creencia, no la verdad`,
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 1,
        icon: '💚',
        title: 'Llená el vaso verde',
        description: `Creá pequeñas experiencias que validen: "${selectedArea?.potenciadora}"`,
        color: 'from-green-500 to-green-600'
      },
      {
        id: 2,
        icon: '🎭',
        title: 'Actuá "como si"',
        description: '¿Qué haría alguien que ya encarna esta identidad?',
        color: 'from-purple-500 to-purple-600'
      },
      {
        id: 3,
        icon: '🔄',
        title: 'Repetí hasta que sea real',
        description: 'Con tiempo y consistencia, la nueva identidad se vuelve tu nueva normalidad',
        color: 'from-orange-500 to-orange-600'
      }
    ];

    const unlockStep = (stepId: number) => {
      if (!unlockedSteps.includes(stepId)) {
        setUnlockedSteps([...unlockedSteps, stepId]);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              🗺️ Tu Mapa de Transformación
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
              Desbloqueá cada paso haciendo click. Este es tu camino.
            </p>
          </motion.div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const isUnlocked = unlockedSteps.includes(step.id);
              const isNextToUnlock = index === unlockedSteps.length;

              return (
                <motion.div
                  key={step.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.15, type: 'spring', bounce: 0.3 }}
                  className="relative group"
                >
                  {/* Mega glow for unlocked */}
                  {isUnlocked && (
                    <div className={`absolute -inset-2 bg-gradient-to-r ${step.color} rounded-3xl opacity-30 blur-xl`} />
                  )}
                  
                  <motion.button
                    onClick={() => isNextToUnlock && unlockStep(step.id)}
                    disabled={!isNextToUnlock && !isUnlocked}
                    whileHover={isNextToUnlock ? { scale: 1.02, x: 8 } : {}}
                    whileTap={isNextToUnlock ? { scale: 0.98 } : {}}
                    className={`relative w-full p-8 rounded-3xl border-2 transition-all text-left overflow-hidden shadow-2xl ${
                      isUnlocked
                        ? `bg-gradient-to-br ${step.color}/20 border-white/30 backdrop-blur-2xl`
                        : isNextToUnlock
                        ? 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 backdrop-blur-2xl'
                        : 'bg-white/[0.02] border-white/5 opacity-30 backdrop-blur-xl'
                    }`}
                  >
                    {/* Shimmer effect para desbloqueados */}
                    {isUnlocked && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    )}

                    <div className="relative z-10 flex items-start gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-5xl transition-all ${
                          isUnlocked 
                            ? `bg-gradient-to-br ${step.color} shadow-2xl` 
                            : 'bg-white/10 border-2 border-white/20'
                        }`}>
                          {isUnlocked ? step.icon : '🔒'}
                          
                          {isUnlocked && (
                            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-50`} />
                          )}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-black text-white">
                            Paso {step.id + 1}: {step.title}
                          </h3>
                          {isUnlocked && (
                            <motion.span
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', bounce: 0.6 }}
                              className="text-green-400 text-2xl"
                            >
                              ✅
                            </motion.span>
                          )}
                        </div>
                        <p className={`text-base sm:text-lg leading-relaxed ${
                          isUnlocked ? 'text-white/90 font-medium' : 'text-gray-500'
                        }`}>
                          {isUnlocked ? step.description : 'Desbloqueá el paso anterior para ver este'}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Botón final cuando todos están desbloqueados */}
          {unlockedSteps.length === steps.length && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
              className="mt-12 relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => advanceStage('reward', 20)}
                className="relative w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-slate-900 py-8 rounded-3xl font-black text-2xl shadow-2xl flex items-center justify-center gap-3"
              >
                <span className="text-3xl">🎁</span>
                <span>Reclamar mi recompensa final</span>
                <span className="text-3xl">→</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // STAGE 7: RECOMPENSA FINAL PREMIUM
  const RewardStage = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Confetti premium */}
        {showConfetti && [...Array(50)].map((_, i) => (
          <ConfettiParticle key={i} delay={i * 0.05} />
        ))}

        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Hero celebration */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.4 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <motion.div 
                className="relative text-9xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2
                }}
              >
                🎉
              </motion.div>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              ¡Lo lograste!
            </h2>
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-30" />
              <p className="relative text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-black">
                Tu vaso verde está lleno al {greenScore}%
              </p>
            </div>
          </motion.div>

          {/* Prompt card premium */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', bounce: 0.3 }}
            className="relative group mb-8"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative bg-white/5 backdrop-blur-2xl border-2 border-yellow-400/30 p-10 rounded-3xl shadow-2xl">
              <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                <span className="text-5xl">🎁</span>
                <span>Tu Recompensa: Prompt Personalizado</span>
              </h3>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Copiá este prompt y usalo en ChatGPT o Claude para recibir un plan de 7 días 
                diseñado específicamente para consolidar tu nueva identidad:
              </p>

              {/* Prompt box premium */}
              <div className="relative group/code mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl opacity-20 blur-xl group-hover/code:opacity-30 transition-opacity" />
                
                <div className="relative bg-slate-950/80 border-2 border-yellow-400/20 p-8 rounded-2xl max-h-80 overflow-y-auto backdrop-blur-xl">
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-mono">
                    {`Generá un plan diario para consolidar mi nueva identidad como "${selectedArea?.potenciadora}".

Quiero ejercicios prácticos, visualizaciones guiadas y afirmaciones personalizadas para los próximos 7 días.

Contexto:
- Área de trabajo: ${selectedArea?.name}
- Creencia vieja que estoy soltando: "${selectedArea?.limitante}"
- Nueva identidad que estoy practicando: "${selectedArea?.potenciadora}"

Dame un plan estructurado día por día, con acciones pequeñas pero significativas.`}
                  </p>
                </div>
              </div>

              {/* Copy button premium */}
              <div className="relative inline-block w-full">
                <div className={`absolute -inset-1 rounded-2xl blur-xl transition-opacity ${
                  copiedPrompt 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-50' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-30 group-hover:opacity-50'
                }`} />
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyFinalPrompt}
                  className={`relative w-full py-6 rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-3 transition-all ${
                    copiedPrompt
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                  }`}
                >
                  {copiedPrompt ? (
                    <>
                      <span className="text-2xl">✓</span>
                      <span>¡Copiado al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">📋</span>
                      <span>Copiar mi prompt personalizado</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Learnings card premium */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, type: 'spring', bounce: 0.3 }}
            className="relative group mb-8"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl border-2 border-purple-400/30 p-8 rounded-3xl">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <span className="text-4xl">💎</span>
                <span>Lo que aprendiste hoy:</span>
              </h3>
              <ul className="space-y-4">
                {[
                  'Tu identidad no es fija, es una construcción que podés cambiar',
                  'El vaso que pese más (experiencias positivas o negativas) define tu identidad',
                  'No necesitás "vaciar" el pasado, solo llenar el presente con nuevas experiencias',
                  'Las microacciones consistentes transforman tu identidad más que los cambios radicales'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-start gap-3 text-white/90 leading-relaxed"
                  >
                    <span className="text-green-400 text-xl flex-shrink-0">✅</span>
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Action buttons premium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => advanceStage('complete', 0)}
              className="relative group bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-white/20 text-white py-5 rounded-2xl font-bold transition-all backdrop-blur-xl"
            >
              <span>Ver mi resumen completo</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetGame}
              className="relative group bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-white/20 text-white py-5 rounded-2xl font-bold transition-all backdrop-blur-xl flex items-center justify-center gap-2"
            >
              <span className="text-xl group-hover:rotate-180 transition-transform duration-500">🔄</span>
              <span>Empezar de nuevo</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  // STAGE 8: COMPLETE PREMIUM
  const CompleteStage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            📊 Tu Resumen de Transformación
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
            Esto es lo que lograste en esta sesión
          </p>
        </motion.div>

        {/* Stats grid premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { icon: selectedArea?.icon || '🎯', title: 'Área trabajada', value: selectedArea?.name || 'N/A', delay: 0, color: 'from-blue-500 to-indigo-600' },
            { icon: '🎯', title: 'Puntuación final', value: `${greenScore}% vaso verde`, delay: 0.1, color: 'from-green-500 to-emerald-600' },
            { icon: '❌', title: 'Identidad vieja', value: selectedArea?.limitante || '', delay: 0.2, color: 'from-red-500 to-orange-600', italic: true },
            { icon: '✨', title: 'Identidad nueva', value: selectedArea?.potenciadora || '', delay: 0.3, color: 'from-purple-500 to-fuchsia-600', italic: true, highlight: true }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: stat.delay, type: 'spring', bounce: 0.3 }}
              className="relative group"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
              
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl">
                <div className="text-6xl mb-4">{stat.icon}</div>
                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-wide">{stat.title}</h3>
                <p className={`text-xl ${stat.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-black' : 'text-gray-300'} ${stat.italic ? 'italic' : ''} leading-relaxed`}>
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action card premium */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', bounce: 0.3 }}
          className="relative group mb-10"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
          
          <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-2xl border-2 border-green-400/30 p-10 rounded-3xl">
            <h3 className="text-3xl font-black text-white mb-6 text-center flex items-center justify-center gap-3">
              <span className="text-4xl">🌟</span>
              <span>Tu acción comprometida</span>
            </h3>
            <p className="text-white text-xl text-center font-semibold leading-relaxed">
              {selectedAction || 'Elegiste empezar tu transformación'}
            </p>
          </div>
        </motion.div>

        {/* Key takeaways premium */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, type: 'spring', bounce: 0.3 }}
          className="relative group mb-10"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
          
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl">
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">🔑</span>
              <span>Para llevar:</span>
            </h3>
            <ul className="space-y-4">
              {[
                'Tu identidad actual es resultado de experiencias pasadas, pero podés cambiarla con nuevas experiencias',
                'No se trata de "vaciar el vaso rojo", sino de llenar el vaso verde hasta que pese más',
                'Las microacciones consistentes transforman más que los cambios radicales',
                'Actuar "como si" ya fueras esa persona es el puente hacia convertirte realmente en ella'
              ].map((takeaway, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start gap-3 text-white/90 leading-relaxed"
                >
                  <span className="text-purple-400 text-xl flex-shrink-0 mt-0.5">•</span>
                  <span className="font-medium">{takeaway}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameStage('reward')}
              className="relative w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-900 py-5 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-2"
            >
              <span className="text-xl">←</span>
              <span>Volver a mi recompensa</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetGame}
              className="relative w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white py-5 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-2"
            >
              <span className="text-xl">🔄</span>
              <span>Jugar de nuevo</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative">
      {gameStage !== 'intro' && <ProgressBar />}
      
      <AnimatePresence mode="wait">
        {gameStage === 'intro' && <IntroStage key="intro" />}
        {gameStage === 'select-area' && <SelectAreaStage key="select-area" />}
        {gameStage === 'mirror' && <MirrorStage key="mirror" />}
        {gameStage === 'actions' && <ActionsStage key="actions" />}
        {gameStage === 'balance' && <BalanceStage key="balance" />}
        {gameStage === 'map' && <MapStage key="map" />}
        {gameStage === 'reward' && <RewardStage key="reward" />}
        {gameStage === 'complete' && <CompleteStage key="complete" />}
      </AnimatePresence>

      {/* Estilos CSS PREMIUM */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Custom scrollbar premium */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }

        /* GPU acceleration */
        [style*="transform"] {
          will-change: transform;
          backface-visibility: hidden;
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
};

export const desarrolloPersonalGameMetadata = {
  id: 4,
  title: "El Juego de la Identidad",
  type: "game" as const,
  duration: "5-10 min"
};