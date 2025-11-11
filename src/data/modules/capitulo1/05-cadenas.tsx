import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos
interface Area {
  id: string;
  name: string;
  icon: string;
  color: string;
  oldFloor: string;
  newFloor: string;
  versionA: string;
  versionB: string;
  chainExample: string;
  freedomPrompt: string;
}

interface PlayerAnswers {
  currentFloor?: string;
  newFloor?: string;
}

interface Level {
  id: number;
  title: string;
  subtitle: string;
  type: string;
}

type AreaId = 'salud' | 'finanzas' | 'relaciones' | 'productividad';

const CadenasGame: React.FC = () => {
  // Estado del juego
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [consciousnessPoints, setConsciousnessPoints] = useState<number>(0);
  const [selectedArea, setSelectedArea] = useState<AreaId | null>(null);
  const [playerAnswers, setPlayerAnswers] = useState<PlayerAnswers>({});
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [techoValue, setTechoValue] = useState<number>(80);
  const [sueloValue, setSueloValue] = useState<number>(30);
  const [journeyComplete, setJourneyComplete] = useState<boolean>(false);

  // Áreas de enfoque con datos completos
  const areas: Record<AreaId, Area> = {
    salud: {
      id: 'salud',
      name: 'Salud & Energía',
      icon: '💪',
      color: 'from-green-500 to-emerald-600',
      oldFloor: 'Cuando estoy estresado, como cualquier cosa y salto el gym',
      newFloor: 'Aunque no vaya al gym, hago mínimo 10 min de movimiento. Incluyo vegetales en al menos una comida del día',
      versionA: 'Entreno 5 veces por semana, como balanceado, duermo 8 horas',
      versionB: 'No hago ejercicio, como comida chatarra, duermo 4 horas',
      chainExample: 'Toleras comer cualquier cosa cuando estás cansado',
      freedomPrompt: '¿Y si tu peor día de salud fuera mejor que tu promedio actual?'
    },
    finanzas: {
      id: 'finanzas',
      name: 'Finanzas & Abundancia',
      icon: '💰',
      color: 'from-yellow-500 to-amber-600',
      oldFloor: 'Gasto sin pensar cuando tengo un mal día',
      newFloor: 'Aunque gaste de más, nunca toco mi cuenta de ahorros. Reviso gastos una vez por semana',
      versionA: 'Ahorro 30%, invierto, reviso mis gastos semanalmente',
      versionB: 'Gasto más de lo que gano, compras emocionales, cero ahorros',
      chainExample: 'Toleras gastar tu seguridad financiera en gratificación instantánea',
      freedomPrompt: '¿Y si incluso en tus días más difíciles protegieras tu futuro?'
    },
    relaciones: {
      id: 'relaciones',
      name: 'Relaciones & Vínculos',
      icon: '❤️',
      color: 'from-pink-500 to-rose-600',
      oldFloor: 'Evito conflictos y digo que sí a todo por no incomodar',
      newFloor: 'Aunque me cueste, comunico cuando algo no me parece bien. Digo no al menos una vez por semana cuando es necesario',
      versionA: 'Comunico límites claros, expreso necesidades, elijo relaciones sanas',
      versionB: 'Evito conflictos, digo sí a todo, permito faltas de respeto',
      chainExample: 'Toleras que te falten el respeto con tal de mantener la paz',
      freedomPrompt: '¿Y si tus peores días incluyeran respeto propio intacto?'
    },
    productividad: {
      id: 'productividad',
      name: 'Productividad & Propósito',
      icon: '⚡',
      color: 'from-blue-500 to-indigo-600',
      oldFloor: 'Procrastino todo lo que no me gusta hacer',
      newFloor: 'Aunque no tenga ganas, trabajo enfocado mínimo 1 hora al día. Empiezo por la tarea más difícil',
      versionA: 'Deep work 4 horas diarias, prioridades claras, momentum constante',
      versionB: 'Procrastino todo el día, multitasking caótico, cero progreso real',
      chainExample: 'Toleras desperdiciar tu potencial porque "no tienes ganas"',
      freedomPrompt: '¿Y si incluso sin motivación, movieras tu vida hacia adelante?'
    }
  };

  // Niveles del juego
  const levels: Level[] = [
    { id: 0, title: "🌌 Despertar", subtitle: "Tu viaje hacia la libertad comienza...", type: "intro" },
    { id: 1, title: "🔗 Reconocer tus Cadenas", subtitle: "Lo que no ves, te controla", type: "awareness" },
    { id: 2, title: "🎭 El Loop del Yo-Yo", subtitle: "Tus dos versiones en batalla", type: "versions" },
    { id: 3, title: "📊 Techo vs Suelo", subtitle: "Tu vida es tu promedio, no tus picos", type: "metrics" },
    { id: 4, title: "🏗️ Diseña tu Nuevo Suelo", subtitle: "Redefine tu mínimo aceptable", type: "rebuild" },
    { id: 5, title: "💎 Evolución Completa", subtitle: "Tu nueva identidad", type: "integration" }
  ];

  // Efectos de sonido (simulados visualmente)
  const playSound = (type: string): void => {
    console.log(`🔊 Playing ${type} sound`);
  };

  // Funciones de gamificación
  const earnPoints = (amount: number, reason: string): void => {
    setConsciousnessPoints(prev => prev + amount);
    playSound('points');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const nextLevel = (): void => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      earnPoints(10, 'Level completed');
      playSound('levelup');
    }
  };

  const selectArea = (areaId: AreaId): void => {
    setSelectedArea(areaId);
    earnPoints(20, 'Area selected');
  };

  const saveAnswer = (key: string, value: string): void => {
    setPlayerAnswers(prev => ({ ...prev, [key]: value }));
    earnPoints(15, 'Honest reflection');
  };

  // Copiar prompt personalizado
  const copyPrompt = (): void => {
    if (!selectedArea) return;
    
    const area = areas[selectedArea];
    const prompt = `Hola. Quiero reprogramar mis estándares mínimos para elevar mi identidad.

Área: ${area.name}
Suelo actual: ${playerAnswers.currentFloor || area.oldFloor}
Nuevo suelo: ${playerAnswers.newFloor || area.newFloor}

Necesito que me ayudes a identificar las creencias limitantes detrás de mi suelo actual y a diseñar 3 hábitos base que lo refuercen.
Quiero que sea práctico, amable y sin perfeccionismo.`;

    navigator.clipboard.writeText(prompt);
    earnPoints(50, 'Commitment to change');
    setJourneyComplete(true);
  };

  // Componente de confetti
  const Confetti: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -20, 
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            rotate: Math.random() * 720,
            opacity: 0
          }}
          transition={{ 
            duration: Math.random() * 2 + 2,
            ease: "easeOut"
          }}
          className="absolute text-2xl"
        >
          {['✨', '💎', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  );

  // Barra de progreso
  const ProgressBar: React.FC = () => (
    <div className="w-full bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(currentLevel / (levels.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      />
    </div>
  );

  // Componente de puntos
  const ConsciousnessDisplay: React.FC = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed top-6 right-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-2xl shadow-2xl z-40 flex items-center gap-3"
    >
      <motion.span
        key={consciousnessPoints}
        initial={{ scale: 1.5, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.3 }}
        className="text-3xl"
      >
        💎
      </motion.span>
      <div>
        <div className="text-xs opacity-80">Conciencia</div>
        <div className="text-2xl font-bold">{consciousnessPoints}</div>
      </div>
    </motion.div>
  );

  // NIVEL 0: INTRO
  const IntroLevel: React.FC = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-6"
    >
      <div className="max-w-3xl text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-8xl mb-8"
        >
          🔗
        </motion.div>
        
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl font-bold text-white mb-6"
        >
          Cadenas
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl text-blue-200 mb-12"
        >
          Un viaje de autodescubrimiento sobre las cadenas invisibles que te mantienen atrapado... y cómo romperlas.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8"
        >
          <p className="text-lg text-white mb-4">
            En los próximos minutos vas a descubrir:
          </p>
          <div className="space-y-3 text-left text-white/90">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎭</span>
              <p>Por qué oscilás entre versiones de vos mismo</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <p>Qué realmente define tu vida (pista: no es tu mejor día)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <p>Cómo elevar tu "suelo" y transformar tu identidad</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={nextLevel}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold px-12 py-4 rounded-full shadow-2xl"
          >
            Comenzar el Viaje 🚀
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-white/50 mt-8"
        >
          Duración estimada: 10-15 minutos de transformación profunda
        </motion.p>
      </div>
    </motion.div>
  );

  // NIVEL 1: RECONOCER CADENAS
  const AwarenessLevel: React.FC = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-6 py-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="text-7xl mb-4">🔗</div>
          <h2 className="text-5xl font-bold text-white mb-4">
            {levels[1].title}
          </h2>
          <p className="text-2xl text-orange-200">
            {levels[1].subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8"
        >
          <p className="text-xl text-white leading-relaxed mb-6">
            Hay dos versiones de vos:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-green-500/20 border-2 border-green-400 rounded-2xl p-6"
            >
              <div className="text-5xl mb-4">😇</div>
              <h3 className="text-2xl font-bold text-green-300 mb-3">Versión A</h3>
              <p className="text-white/90">
                La que mostrás al mundo: organizada, disciplinada, con todo bajo control.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-red-500/20 border-2 border-red-400 rounded-2xl p-6"
            >
              <div className="text-5xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-red-300 mb-3">Versión B</h3>
              <p className="text-white/90">
                La de las 3 AM cuando nadie te ve: "ya qué importa", "mañana empiezo en serio".
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-400 rounded-2xl p-6"
          >
            <p className="text-2xl text-yellow-300 font-bold mb-4 text-center">
              🔥 Tu identidad no es lo que decís que sos...
            </p>
            <p className="text-xl text-white text-center mb-4">
              Es lo que hacés cuando nadie te está mirando.
            </p>
            <p className="text-lg text-white/80 text-center">
              La buena noticia: Si son hábitos aprendidos, pueden desaprenderse.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <p className="text-white/70 mb-4">¿Listo para ver qué cadenas te están frenando?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextLevel}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-bold px-10 py-4 rounded-full shadow-2xl"
          >
            Descubrir mis Cadenas 🔓
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );

  // NIVEL 2: EL LOOP
  const VersionsLevel: React.FC = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 py-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="text-7xl mb-4">🎭</div>
            <h2 className="text-5xl font-bold text-white mb-4">
              {levels[2].title}
            </h2>
            <p className="text-2xl text-purple-200">
              {levels[2].subtitle}
            </p>
          </motion.div>

          {!selectedArea ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-12"
            >
              <div className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">
                <p className="text-xl text-white leading-relaxed mb-6">
                  Elegí un área de tu vida para ver cómo funciona tu loop personal:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.values(areas).map((area, index) => (
                    <motion.button
                      key={area.id}
                      initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => selectArea(area.id as AreaId)}
                      className={`bg-gradient-to-br ${area.color} text-white rounded-2xl p-6 shadow-xl text-left`}
                    >
                      <div className="text-5xl mb-3">{area.icon}</div>
                      <h3 className="text-2xl font-bold mb-2">{area.name}</h3>
                      <p className="text-sm opacity-90">Toca para explorar</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedArea}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {(() => {
                const area = areas[selectedArea];
                return (
                  <div className="space-y-6">
                    <div className={`bg-gradient-to-br ${area.color} rounded-3xl p-8 text-white`}>
                      <div className="text-6xl mb-4">{area.icon}</div>
                      <h3 className="text-3xl font-bold mb-4">{area.name}</h3>
                      <p className="text-lg opacity-90">{area.freedomPrompt}</p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                      <h4 className="text-2xl font-bold text-white mb-6 text-center">
                        🎢 Tu Loop Personal
                      </h4>
                      
                      <div className="space-y-6">
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-green-500/20 border-2 border-green-400 rounded-2xl p-6"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-4xl">😇</div>
                            <h5 className="text-xl font-bold text-green-300">Tu Versión A</h5>
                          </div>
                          <p className="text-white text-lg">{area.versionA}</p>
                        </motion.div>

                        <div className="text-center text-6xl">
                          ↕️
                        </div>

                        <motion.div
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-red-500/20 border-2 border-red-400 rounded-2xl p-6"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-4xl">😔</div>
                            <h5 className="text-xl font-bold text-red-300">Tu Versión B</h5>
                          </div>
                          <p className="text-white text-lg">{area.versionB}</p>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400 rounded-2xl p-6"
                      >
                        <p className="text-xl text-yellow-300 font-bold mb-3 text-center">
                          💡 La verdad incómoda:
                        </p>
                        <p className="text-white text-lg text-center">
                          {area.chainExample}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextLevel}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold px-10 py-4 rounded-full shadow-2xl"
                      >
                        Entiendo el Loop → Siguiente 📊
                      </motion.button>
                    </motion.div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // NIVEL 3: TECHO VS SUELO
  const MetricsLevel: React.FC = () => {
    const promedio = Math.round((techoValue + sueloValue) / 2);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-6 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="text-7xl mb-4">📊</div>
            <h2 className="text-5xl font-bold text-white mb-4">
              {levels[3].title}
            </h2>
            <p className="text-2xl text-cyan-200">
              {levels[3].subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8"
          >
            <div className="mb-8">
              <p className="text-xl text-white mb-6 text-center">
                Moviendo los sliders, observá lo que realmente importa:
              </p>

              {/* Techo */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🌟</span>
                    <span className="text-xl text-white font-semibold">Tu Techo (mejores días)</span>
                  </div>
                  <motion.span
                    key={techoValue}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-yellow-300"
                  >
                    {techoValue}%
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={techoValue}
                  onChange={(e) => setTechoValue(Number(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>

              {/* Suelo */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏚️</span>
                    <span className="text-xl text-white font-semibold">Tu Suelo (peores días)</span>
                  </div>
                  <motion.span
                    key={sueloValue}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-red-300"
                  >
                    {sueloValue}%
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={sueloValue}
                  onChange={(e) => setSueloValue(Number(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-400"
                />
              </div>

              {/* Promedio */}
              <motion.div
                key={promedio}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-purple-600/40 to-pink-600/40 border-3 border-purple-400 rounded-2xl p-6 text-center"
              >
                <p className="text-lg text-white mb-2">Tu Promedio Real (tu vida)</p>
                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {promedio}%
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-2 border-cyan-400 rounded-2xl p-6"
            >
              <p className="text-2xl text-cyan-300 font-bold mb-4 text-center">
                💡 El Insight que Cambia Todo
              </p>
              <p className="text-white text-lg mb-4 text-center">
                Tu vida no está definida por tu techo (mejores días)...
              </p>
              <p className="text-2xl text-yellow-300 font-bold text-center">
                Está definida por tu SUELO (peores días)
              </p>
              <p className="text-white/80 mt-4 text-center">
                Subir el suelo del {sueloValue}% al 40% impacta más que subir el techo del {techoValue}% al 95%
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextLevel}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-bold px-10 py-4 rounded-full shadow-2xl"
            >
              Voy a Elevar mi Suelo 🏗️
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // NIVEL 4: DISEÑAR NUEVO SUELO
  const RebuildLevel: React.FC = () => {
    const area = selectedArea ? areas[selectedArea] : null;
    const [customFloor, setCustomFloor] = useState<string>('');

    const handleCommit = (): void => {
      if (customFloor.trim()) {
        saveAnswer('newFloor', customFloor);
      } else if (area) {
        saveAnswer('newFloor', area.newFloor);
      }
      nextLevel();
    };

    if (!area) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 p-6 py-20 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-2xl mb-4">Por favor, selecciona un área en el nivel anterior</p>
            <button 
              onClick={() => setCurrentLevel(2)}
              className="bg-white text-green-900 px-8 py-4 rounded-full font-bold"
            >
              Volver
            </button>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 p-6 py-20"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="text-7xl mb-4">🏗️</div>
            <h2 className="text-5xl font-bold text-white mb-4">
              {levels[4].title}
            </h2>
            <p className="text-2xl text-emerald-200">
              {levels[4].subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                📝 Tu Área: {area.name} {area.icon}
              </h3>

              <div className="space-y-6">
                <div className="bg-red-500/20 border-2 border-red-400 rounded-2xl p-6">
                  <p className="text-sm text-red-300 font-semibold mb-2">Tu Suelo Actual:</p>
                  <p className="text-white text-lg italic">"{area.oldFloor}"</p>
                </div>

                <div className="text-center text-5xl">
                  ⚡
                </div>

                <div className="bg-green-500/20 border-2 border-green-400 rounded-2xl p-6">
                  <p className="text-sm text-green-300 font-semibold mb-2">Tu Nuevo Suelo (sugerido):</p>
                  <p className="text-white text-lg italic mb-4">"{area.newFloor}"</p>
                  <p className="text-sm text-white/70">
                    💡 Nota: Realista, no perfecto. Elevado, pero sostenible.
                  </p>
                </div>

                <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-2xl p-6">
                  <label className="text-lg text-yellow-300 font-semibold mb-3 block">
                    ✏️ Personalizá tu nuevo suelo (opcional):
                  </label>
                  <textarea
                    value={customFloor}
                    onChange={(e) => setCustomFloor(e.target.value)}
                    placeholder="Escribe tu propio suelo si quieres adaptarlo..."
                    className="w-full bg-black/40 text-white border-2 border-yellow-400/50 rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-amber-600/30 to-orange-600/30 border-2 border-amber-400 rounded-2xl p-6"
            >
              <p className="text-xl text-amber-300 font-bold mb-3 text-center">
                🎯 Tu Compromiso
              </p>
              <p className="text-white text-lg text-center mb-4">
                "Incluso en mis peores días, mi mínimo será esto."
              </p>
              <p className="text-white/80 text-center">
                No perfección. No techo inalcanzable. Solo un suelo que respete quién elegís ser.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCommit}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl font-bold px-12 py-5 rounded-full shadow-2xl"
              >
                Comprometerme con mi Nuevo Suelo 💚
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // NIVEL 5: INTEGRACIÓN FINAL
  const IntegrationLevel: React.FC = () => {
    const area = selectedArea ? areas[selectedArea] : null;
    const [showPrompt, setShowPrompt] = useState<boolean>(false);

    if (!area) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 p-6 py-20 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-2xl mb-4">Por favor, completa los niveles anteriores</p>
            <button 
              onClick={() => setCurrentLevel(2)}
              className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold"
            >
              Volver
            </button>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 p-6 py-20"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-8xl mb-4 inline-block"
            >
              💎
            </motion.div>
            <h2 className="text-5xl font-bold text-white mb-4">
              {levels[5].title}
            </h2>
            <p className="text-2xl text-pink-200">
              {levels[5].subtitle}
            </p>
          </motion.div>

          {/* Escena de integración visual */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-3xl p-12 mb-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              🌟 El Laboratorio Interior
            </h3>

            <div className="flex items-center justify-center gap-8 mb-8">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-7xl mb-3">
                  😇
                </div>
                <p className="text-green-300 font-semibold">Versión A</p>
                <p className="text-white/70 text-sm">Tu potencial</p>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="relative"
              >
                <div className="text-8xl">
                  🫱🏼‍🫲🏽
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                >
                  <span className="text-2xl">✨</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-7xl mb-3">
                  😔
                </div>
                <p className="text-red-300 font-semibold">Versión B</p>
                <p className="text-white/70 text-sm">Tu realidad</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center"
            >
              <div className="text-7xl mb-4">
                🦋
              </div>
              <p className="text-2xl text-purple-300 font-bold mb-3">
                La Integración
              </p>
              <p className="text-xl text-white mb-2">
                Ya no son dos versiones en guerra.
              </p>
              <p className="text-lg text-white/80">
                Es una sola identidad elevada, con un suelo que protege tu progreso.
              </p>
            </motion.div>
          </motion.div>

          {/* Resumen del viaje */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="bg-gradient-to-r from-amber-600/30 to-yellow-600/30 border-2 border-amber-400 rounded-3xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-amber-300 mb-6 text-center flex items-center justify-center gap-3">
              <span>🏆</span>
              <span>Resumen de tu Viaje</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-yellow-300 font-semibold mb-2">💎 Puntos de Conciencia</p>
                <p className="text-4xl font-bold text-white">{consciousnessPoints}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-green-300 font-semibold mb-2">🎯 Área Elegida</p>
                <p className="text-2xl font-bold text-white">{area.name}</p>
              </div>

              <div className="bg-white/10 rounded-xl p-4 sm:col-span-2">
                <p className="text-purple-300 font-semibold mb-2">🌱 Tu Compromiso</p>
                <p className="text-white italic">"{playerAnswers.newFloor || area.newFloor}"</p>
              </div>
            </div>
          </motion.div>

          {/* Botón de prompt */}
          {!showPrompt ? (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPrompt(true)}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white text-2xl font-bold px-12 py-6 rounded-full shadow-2xl"
              >
                🎁 Desbloquear Mi Prompt Personalizado
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400 rounded-3xl p-8"
            >
                <div className="text-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-6xl mb-3"
                  >
                    🎁
                  </motion.div>
                  <h3 className="text-3xl font-bold text-purple-300 mb-2">
                    ¡Logro Desbloqueado!
                  </h3>
                  <p className="text-white/80">Tu prompt personalizado para continuar la transformación</p>
                </div>

                <div className="bg-black/40 rounded-2xl p-6 mb-6 border border-purple-400/50">
                  <pre className="text-white text-sm leading-relaxed whitespace-pre-wrap font-mono">
{`Hola. Quiero reprogramar mis estándares mínimos para elevar mi identidad.

Área: ${area.name}
Suelo actual: ${area.oldFloor}
Nuevo suelo: ${playerAnswers.newFloor || area.newFloor}

Necesito que me ayudes a identificar las creencias limitantes detrás de mi suelo actual y a diseñar 3 hábitos base que lo refuercen.
Quiero que sea práctico, amable y sin perfeccionismo.`}
                  </pre>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={copyPrompt}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-bold px-8 py-4 rounded-full shadow-xl flex items-center justify-center gap-3"
                  >
                    {journeyComplete ? (
                      <>
                        <span className="text-2xl">✅</span>
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">📋</span>
                        <span>Copiar Prompt</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {journeyComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400 rounded-2xl p-6"
                  >
                    <p className="text-xl text-green-300 font-bold mb-3 text-center">
                      🌟 ¡Viaje Completado!
                    </p>
                    <p className="text-white text-center mb-4">
                      Ahora llevá este prompt a ChatGPT o Claude y diseñá tu plan de acción.
                    </p>
                    <p className="text-white/80 text-center text-sm">
                      Recordá: Tu vida mejora cuando elevás tu suelo, no cuando soñás con el techo.
                    </p>
                  </motion.div>
                )}
              </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // Renderizar nivel actual
  const renderCurrentLevel = (): JSX.Element => {
    const level = levels[currentLevel];
    
    switch (level?.type) {
      case 'intro':
        return <IntroLevel />;
      case 'awareness':
        return <AwarenessLevel />;
      case 'versions':
        return <VersionsLevel />;
      case 'metrics':
        return <MetricsLevel />;
      case 'rebuild':
        return <RebuildLevel />;
      case 'integration':
        return <IntegrationLevel />;
      default:
        return <IntroLevel />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {currentLevel > 0 && (
          <>
            <ConsciousnessDisplay />
            <div className="fixed top-6 left-6 right-20 z-40">
              <ProgressBar />
            </div>
          </>
        )}
        
        <div key={currentLevel}>
          {renderCurrentLevel()}
        </div>
      </div>

      {/* Confetti effect */}
      {showConfetti && <Confetti />}

      {/* Instrucción de música */}
      {currentLevel > 0 && (
        <div className="fixed bottom-6 left-6 bg-black/60 backdrop-blur text-white/60 px-4 py-2 rounded-full text-sm z-50">
          💡 Tip: Reproduce música lo-fi para mejor experiencia
        </div>
      )}
    </div>
  );
};

export default CadenasGame;

export const cadenasGameMetadata = {
  id: 5,
  title: "🔗 Cadenas",
  type: "game" as const,
  duration: "15 min"
};