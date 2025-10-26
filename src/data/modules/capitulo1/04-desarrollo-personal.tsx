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

  // Áreas disponibles
  const areas: Area[] = [
    { id: 'dinero', name: 'Dinero', icon: '💰', limitante: 'Siempre fui malo con el dinero', potenciadora: 'Soy capaz de generar y administrar riqueza', color: 'from-yellow-400 to-amber-500' },
    { id: 'amor', name: 'Amor', icon: '❤️', limitante: 'No merezco amor verdadero', potenciadora: 'Soy digno de amor profundo y recíproco', color: 'from-pink-400 to-rose-500' },
    { id: 'creatividad', name: 'Creatividad', icon: '🎨', limitante: 'No soy creativo', potenciadora: 'La creatividad fluye naturalmente en mí', color: 'from-purple-400 to-violet-500' },
    { id: 'liderazgo', name: 'Liderazgo', icon: '👑', limitante: 'No puedo liderar', potenciadora: 'Inspiro y guío a otros con confianza', color: 'from-blue-400 to-indigo-500' },
    { id: 'salud', name: 'Salud', icon: '💪', limitante: 'Mi cuerpo no responde', potenciadora: 'Mi cuerpo es fuerte y resiliente', color: 'from-green-400 to-emerald-500' },
    { id: 'hablar', name: 'Hablar en público', icon: '🎤', limitante: 'Me paraliza hablar en público', potenciadora: 'Me expreso con claridad y seguridad', color: 'from-orange-400 to-red-500' }
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

  // Animaciones de confetti
  const ConfettiParticle = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        background: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB'][Math.floor(Math.random() * 5)],
        left: `${Math.random() * 100}%`,
        top: '-10px'
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: window.innerHeight, opacity: 0 }}
      transition={{ duration: 2, delay, ease: 'easeIn' }}
    />
  );

  // Barra de progreso
  const ProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">🎮 Tu Transformación</span>
            {selectedArea && (
              <span className="text-sm text-gray-300">
                {selectedArea.icon} {selectedArea.name}
              </span>
            )}
          </div>
          <button
            onClick={resetGame}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            🔄 Reiniciar
          </button>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${greenScore}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-right">
          Vaso verde: {greenScore}% lleno
        </div>
      </div>
    </div>
  );

  // STAGE 1: INTRO CINEMATOGRÁFICA
  const IntroStage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Partículas de fondo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            🧠
          </h1>
        </motion.div>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          El Juego de la Identidad
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl text-purple-200 mb-8"
        >
          Una experiencia interactiva para transformar cómo te ves a vos mismo
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-white/80 mb-8">
            En los próximos minutos, vas a descubrir qué está frenando tu crecimiento.<br />
            Y más importante: cómo cambiarlo.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => advanceStage('select-area', 5)}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-green-500/50 transition-all"
          >
            Empezar mi transformación →
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-sm text-purple-300 mt-8"
        >
          ⏱️ Duración: 5-10 minutos • 💾 Tu progreso se guarda automáticamente
        </motion.p>
      </div>
    </motion.div>
  );

  // STAGE 2: SELECCIÓN DE ÁREA
  const SelectAreaStage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-24 pb-12 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ⚡ Elegí tu campo de batalla
          </h2>
          <p className="text-xl text-gray-300">
            ¿En qué área de tu vida sentís que tu identidad actual te está limitando?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <motion.button
              key={area.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedArea(area);
                advanceStage('mirror', 10);
              }}
              className={`relative bg-gradient-to-br ${area.color} p-8 rounded-2xl text-white overflow-hidden group`}
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              
              <div className="relative z-10">
                <div className="text-6xl mb-4">{area.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{area.name}</h3>
                <p className="text-sm opacity-90">
                  Trabajar en mi relación con {area.name.toLowerCase()}
                </p>
              </div>

              {/* Indicador de selección */}
              <motion.div
                className="absolute bottom-4 right-4 text-3xl"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                ✨
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // STAGE 3: ESPEJO DE CREENCIAS
  const MirrorStage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 pt-24 pb-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🪞 El Espejo de Creencias
          </h2>
          <p className="text-xl text-purple-200">
            Frente a ti hay dos versiones. ¿Cuál elegís practicar hoy?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Creencia limitante */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedBelief('limitante');
                setTimeout(() => advanceStage('actions', 0), 1500);
              }}
              disabled={selectedBelief !== null}
              className={`w-full h-full p-8 rounded-2xl border-4 transition-all ${
                selectedBelief === 'limitante'
                  ? 'bg-red-900/50 border-red-500'
                  : selectedBelief === null
                  ? 'bg-gray-800/50 border-gray-600 hover:border-red-400'
                  : 'bg-gray-900/30 border-gray-700 opacity-50'
              }`}
            >
              <div className="text-6xl mb-6">❌</div>
              <h3 className="text-2xl font-bold text-white mb-4">Identidad Vieja</h3>
              <p className="text-lg text-gray-300 italic mb-6">
                "{selectedArea?.limitante}"
              </p>
              <p className="text-sm text-red-300">
                Si elegís esta, tu vaso rojo se llena más
              </p>
            </motion.button>

            {selectedBelief === 'limitante' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl"
              >
                🔴
              </motion.div>
            )}
          </motion.div>

          {/* Creencia potenciadora */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedBelief('potenciadora');
                setTimeout(() => advanceStage('actions', 20), 1500);
              }}
              disabled={selectedBelief !== null}
              className={`w-full h-full p-8 rounded-2xl border-4 transition-all ${
                selectedBelief === 'potenciadora'
                  ? 'bg-green-900/50 border-green-500'
                  : selectedBelief === null
                  ? 'bg-gray-800/50 border-gray-600 hover:border-green-400'
                  : 'bg-gray-900/30 border-gray-700 opacity-50'
              }`}
            >
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-2xl font-bold text-white mb-4">Identidad Nueva</h3>
              <p className="text-lg text-gray-300 italic mb-6">
                "{selectedArea?.potenciadora}"
              </p>
              <p className="text-sm text-green-300">
                Si elegís esta, tu vaso verde empieza a brillar
              </p>
            </motion.button>

            {selectedBelief === 'potenciadora' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl"
              >
                🟢
              </motion.div>
            )}
          </motion.div>
        </div>

        {selectedBelief && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl">
              <p className="text-white text-lg">
                {selectedBelief === 'potenciadora' ? (
                  <>
                    💚 <strong>¡Excelente elección!</strong> Elegir practicar la nueva identidad es el primer paso. 
                    Ahora viene lo importante: las acciones que la hacen real.
                  </>
                ) : (
                  <>
                    🧡 <strong>Está bien.</strong> A veces necesitamos reconocer dónde estamos parados. 
                    Pero recordá: esta creencia es solo una historia, no la verdad.
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // STAGE 4: MICROACCIONES
  const ActionsStage = () => {
    const actions = selectedArea ? getActionsForArea(selectedArea.id) : [];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-emerald-900 to-teal-900 pt-24 pb-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🎯 Microacciones de Hoy
            </h2>
            <p className="text-xl text-emerald-200">
              Elegí UNA acción pequeña que vas a hacer hoy para llenar tu vaso verde
            </p>
          </motion.div>

          <div className="space-y-6">
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedAction(action);
                  setTimeout(() => advanceStage('balance', 20), 1500);
                }}
                disabled={selectedAction !== null}
                className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                  selectedAction === action
                    ? 'bg-green-500/30 border-green-400'
                    : selectedAction === null
                    ? 'bg-white/5 border-white/20 hover:border-green-400 hover:bg-white/10'
                    : 'bg-gray-900/30 border-gray-700 opacity-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {selectedAction === action ? '✅' : `${index + 1}️⃣`}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-lg font-medium">
                      {action}
                    </p>
                    {selectedAction === action && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-300 text-sm mt-2"
                      >
                        🎉 ¡Comprometido! Esto suma en tu vaso verde.
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {selectedAction && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur p-6 rounded-xl border border-green-400/30"
            >
              <p className="text-white text-center">
                💪 <strong>Recordá:</strong> No importa si sale perfecto. Lo que importa es que lo hagas. 
                Cada acción, por pequeña que sea, cambia tu identidad.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // STAGE 5: BALANCE GAME
  const BalanceStage = () => {
    const [isDragging, setIsDragging] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 pt-24 pb-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ⚖️ El Juego del Balance
            </h2>
            <p className="text-xl text-blue-200">
              Moviendo el control, equilibrá tu identidad. Tu objetivo: llenar el vaso verde al máximo.
            </p>
          </motion.div>

          <div className="bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20">
            {/* Balanza visual */}
            <div className="flex items-end justify-center gap-12 mb-8">
              <motion.div
                className="text-center"
                animate={{ y: isDragging ? [0, -5, 0] : 0 }}
                transition={{ repeat: isDragging ? Infinity : 0, duration: 1 }}
              >
                <div 
                  className="w-32 bg-gradient-to-t from-green-500 to-green-300 rounded-t-xl mx-auto transition-all duration-500 relative"
                  style={{ height: `${balanceValue * 2.5}px` }}
                >
                  {balanceValue > 70 && (
                    <motion.div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      ✨
                    </motion.div>
                  )}
                </div>
                <div className="w-32 h-40 border-4 border-green-500 border-t-0 rounded-b-xl mx-auto bg-white/5" />
                <p className="mt-4 text-sm font-bold text-green-400">Vaso Verde</p>
                <p className="text-2xl font-bold text-white">{balanceValue}%</p>
              </motion.div>

              <div className="text-7xl mb-12">⚖️</div>

              <motion.div
                className="text-center"
                animate={{ y: isDragging ? [0, -5, 0] : 0 }}
                transition={{ repeat: isDragging ? Infinity : 0, duration: 1, delay: 0.5 }}
              >
                <div 
                  className="w-32 bg-gradient-to-t from-red-500 to-red-300 rounded-t-xl mx-auto transition-all duration-500"
                  style={{ height: `${(100 - balanceValue) * 2.5}px` }}
                />
                <div className="w-32 h-40 border-4 border-red-500 border-t-0 rounded-b-xl mx-auto bg-white/5" />
                <p className="mt-4 text-sm font-bold text-red-400">Vaso Rojo</p>
                <p className="text-2xl font-bold text-white">{100 - balanceValue}%</p>
              </motion.div>
            </div>

            {/* Control interactivo */}
            <div className="space-y-4">
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
                className="w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #fbbf24 50%, #10b981 100%)`
                }}
              />

              <div className="text-center">
                <motion.p
                  key={balanceValue > 70 ? 'good' : balanceValue > 40 ? 'medium' : 'bad'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-lg font-semibold text-white"
                >
                  {balanceValue > 70 && "🎉 ¡Tu identidad potenciadora domina! Así se hace."}
                  {balanceValue > 40 && balanceValue <= 70 && "⚖️ En transición. Seguí llenando el vaso verde."}
                  {balanceValue <= 40 && "💪 Todavía hay peso en el vaso rojo. Pero podés cambiarlo."}
                </motion.p>
              </div>
            </div>

            {balanceValue >= 60 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => advanceStage('map', 15)}
                className="mt-8 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl"
              >
                Continuar al mapa de transformación →
              </motion.button>
            )}

            {balanceValue < 60 && (
              <div className="mt-8 bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-xl">
                <p className="text-yellow-200 text-center text-sm">
                  💡 <strong>Tip:</strong> Llevá el vaso verde al 60% o más para desbloquear el siguiente nivel
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // STAGE 6: MAPA DE TRANSFORMACIÓN
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
        description: 'Preguntate: "¿Qué haría alguien que ya encarna esta identidad?"',
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
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🗺️ Tu Mapa de Transformación
            </h2>
            <p className="text-xl text-purple-200">
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
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.button
                    onClick={() => isNextToUnlock && unlockStep(step.id)}
                    disabled={!isNextToUnlock && !isUnlocked}
                    whileHover={isNextToUnlock ? { scale: 1.02, x: 10 } : {}}
                    whileTap={isNextToUnlock ? { scale: 0.98 } : {}}
                    className={`w-full p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden ${
                      isUnlocked
                        ? `bg-gradient-to-r ${step.color} border-white/30`
                        : isNextToUnlock
                        ? 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10'
                        : 'bg-gray-900/30 border-gray-700 opacity-40'
                    }`}
                  >
                    {/* Efecto de brillo en desbloqueados */}
                    {isUnlocked && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                    )}

                    <div className="relative z-10 flex items-start gap-4">
                      <div className="text-5xl">
                        {isUnlocked ? step.icon : '🔒'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            Paso {step.id + 1}: {step.title}
                          </h3>
                          {isUnlocked && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-green-400"
                            >
                              ✅
                            </motion.span>
                          )}
                        </div>
                        <p className={`text-sm ${isUnlocked ? 'text-white/90' : 'text-gray-400'}`}>
                          {isUnlocked ? step.description : 'Desbloqueá el paso anterior para ver este'}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {unlockedSteps.length === steps.length && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => advanceStage('reward', 20)}
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-gray-900 py-6 rounded-2xl font-bold text-xl shadow-2xl"
              >
                🎁 Reclamar mi recompensa final →
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // STAGE 7: RECOMPENSA FINAL
  const RewardStage = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 pt-24 pb-12 px-4 relative overflow-hidden"
      >
        {/* Confetti */}
        {showConfetti && [...Array(30)].map((_, i) => (
          <ConfettiParticle key={i} delay={i * 0.1} />
        ))}

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="text-8xl mb-6">🎉</div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              ¡Lo lograste!
            </h2>
            <p className="text-2xl text-yellow-200">
              Tu vaso verde está lleno al <strong>{greenScore}%</strong>
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border-2 border-yellow-400/50 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🎁</span>
              Tu Recompensa: Prompt Personalizado
            </h3>
            <p className="text-yellow-100 mb-6">
              Copiá este prompt y usalo en ChatGPT o Claude para recibir un plan de 7 días 
              diseñado específicamente para consolidar tu nueva identidad:
            </p>

            <div className="bg-gray-900/80 p-6 rounded-xl border border-yellow-500/30 mb-4">
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {`Generá un plan diario para consolidar mi nueva identidad como "${selectedArea?.potenciadora}".

Quiero ejercicios prácticos, visualizaciones guiadas y afirmaciones personalizadas para los próximos 7 días.

Contexto:
- Área de trabajo: ${selectedArea?.name}
- Creencia vieja que estoy soltando: "${selectedArea?.limitante}"
- Nueva identidad que estoy practicando: "${selectedArea?.potenciadora}"

Dame un plan estructurado día por día, con acciones pequeñas pero significativas.`}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyFinalPrompt}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2"
            >
              {copiedPrompt ? (
                <>
                  <span>✓</span>
                  <span>¡Copiado al portapapeles!</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Copiar mi prompt personalizado</span>
                </>
              )}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur p-6 rounded-xl border border-purple-400/30 mb-8"
          >
            <h3 className="text-xl font-bold text-white mb-3">
              💎 Lo que aprendiste hoy:
            </h3>
            <ul className="space-y-2 text-white/90">
              <li>✅ Tu identidad no es fija, es una construcción que podés cambiar</li>
              <li>✅ El vaso que pese más (experiencias positivas o negativas) define tu identidad</li>
              <li>✅ No necesitás "vaciar" el pasado, solo llenar el presente con nuevas experiencias</li>
              <li>✅ Las microacciones consistentes transforman tu identidad más que los cambios radicales</li>
            </ul>
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => advanceStage('complete', 0)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-semibold transition-all"
            >
              Ver mi resumen completo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-semibold transition-all"
            >
              🔄 Empezar de nuevo
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  // STAGE 8: COMPLETE
  const CompleteStage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-24 pb-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📊 Tu Resumen de Transformación
          </h2>
          <p className="text-xl text-purple-200">
            Esto es lo que lograste en esta sesión
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20"
          >
            <div className="text-5xl mb-4">{selectedArea?.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">Área trabajada</h3>
            <p className="text-purple-200">{selectedArea?.name}</p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20"
          >
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Puntuación final</h3>
            <p className="text-3xl font-bold text-green-400">{greenScore}% vaso verde</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20"
          >
            <div className="text-5xl mb-4">❌</div>
            <h3 className="text-xl font-bold text-white mb-2">Identidad vieja</h3>
            <p className="text-gray-300 italic">"{selectedArea?.limitante}"</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20"
          >
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-white mb-2">Identidad nueva</h3>
            <p className="text-green-300 italic font-semibold">"{selectedArea?.potenciadora}"</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur p-8 rounded-2xl border border-green-400/30 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            🌟 Tu acción comprometida
          </h3>
          <p className="text-white text-lg text-center">
            {selectedAction || 'Elegiste empezar tu transformación'}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            🔑 Para llevar:
          </h3>
          <ul className="space-y-3 text-white/90">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Tu identidad actual es resultado de experiencias pasadas, pero podés cambiarla con nuevas experiencias</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>No se trata de "vaciar el vaso rojo", sino de llenar el vaso verde hasta que pese más</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Las microacciones consistentes transforman más que los cambios radicales</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Actuar "como si" ya fueras esa persona es el puente hacia convertirte realmente en ella</span>
            </li>
          </ul>
        </motion.div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameStage('reward')}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-4 rounded-xl font-bold shadow-xl"
          >
            ← Volver a mi recompensa
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold shadow-xl"
          >
            🔄 Jugar de nuevo
          </motion.button>
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
    </div>
  );
};

export const desarrolloPersonalGameMetadata = {
  id: 4,
  title: "El Juego de la Identidad",
  type: "game" as const,
  duration: "5-10 min"
};