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

  // Componente de confetti PREMIUM
  const Confetti: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -20, 
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            rotate: 0,
            opacity: 1,
            scale: 1
          }}
          animate={{ 
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            rotate: Math.random() * 720,
            opacity: 0,
            scale: [1, 1.5, 0.5]
          }}
          transition={{ 
            duration: Math.random() * 2 + 2,
            ease: "easeOut"
          }}
          className="absolute text-3xl"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
          }}
        >
          {['✨', '💎', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  );

  // Barra de progreso PREMIUM
  const ProgressBar: React.FC = () => (
    <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden shadow-inner border border-white/10">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(currentLevel / (levels.length - 1)) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
        style={{
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        {(currentLevel / (levels.length - 1)) * 100 > 0 && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-pink-400 blur-sm opacity-50" />
        )}
      </motion.div>
    </div>
  );

  // Componente de puntos PREMIUM
  const ConsciousnessDisplay: React.FC = () => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.5 }}
      className="fixed top-6 right-6 z-50 group"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
      
      <div className="relative bg-gradient-to-br from-purple-600 to-indigo-700 backdrop-blur-xl border-2 border-white/20 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4">
        <motion.div
          key={consciousnessPoints}
          initial={{ scale: 1.5, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-yellow-500 rounded-full blur-lg opacity-50 animate-pulse" />
          <span className="relative text-4xl">💎</span>
        </motion.div>
        <div>
          <div className="text-xs opacity-80 font-semibold uppercase tracking-wide">Conciencia</div>
          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
            {consciousnessPoints}
          </div>
        </div>
      </div>
    </motion.div>
  );

  // NIVEL 0: INTRO PREMIUM
  const IntroLevel: React.FC = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grain Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
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
              y: [0, -30, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        {/* Hero icon mega premium */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
          className="relative inline-block mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="relative w-40 h-40 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 transform hover:scale-110 transition-all duration-500">
            <motion.span 
              className="text-9xl"
              animate={{
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔗
            </motion.span>
          </div>
        </motion.div>
        
        {/* Title premium */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-7xl sm:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 leading-tight mb-8"
        >
          Cadenas
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl sm:text-3xl text-gray-300 mb-16 font-medium leading-relaxed max-w-4xl mx-auto"
        >
          Un viaje de autodescubrimiento sobre las cadenas invisibles que te mantienen atrapado... y cómo romperlas.
        </motion.p>

        {/* Info card premium */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, type: 'spring', bounce: 0.3 }}
          className="relative group mb-16"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
          
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            <p className="text-2xl font-black text-white mb-8 uppercase tracking-wide">
              En los próximos minutos vas a descubrir:
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: '🎭', text: 'Por qué oscilás entre versiones de vos mismo' },
                { icon: '📊', text: 'Qué realmente define tu vida (pista: no es tu mejor día)' },
                { icon: '⚡', text: 'Cómo elevar tu "suelo" y transformar tu identidad' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <p className="text-white/90 leading-relaxed font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Button premium */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="relative inline-block mb-12"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 animate-pulse" />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextLevel}
            className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white text-2xl sm:text-3xl font-black px-16 py-8 rounded-3xl shadow-2xl flex items-center gap-4"
          >
            <span>Comenzar el Viaje</span>
            <span className="text-4xl">🚀</span>
          </motion.button>
        </motion.div>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
            <span className="text-2xl">⏱️</span>
            <span className="text-sm text-gray-300 font-semibold">10-15 minutos</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
            <span className="text-2xl">🎯</span>
            <span className="text-sm text-gray-300 font-semibold">Transformación profunda</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // NIVEL 1: RECONOCER CADENAS PREMIUM
  const AwarenessLevel: React.FC = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative text-8xl">🔗</div>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
            {levels[1].title}
          </h2>
          <p className="text-2xl sm:text-3xl text-orange-200 leading-relaxed">
            {levels[1].subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', bounce: 0.3 }}
          className="relative group mb-10"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
          
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            <p className="text-2xl text-white leading-relaxed mb-10 text-center font-semibold">
              Hay dos versiones de vos:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Versión A */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="relative group/card"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl opacity-30 blur-xl group-hover/card:opacity-50 transition-opacity" />
                
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
                >
                  <div className="text-7xl mb-6 text-center">😇</div>
                  <h3 className="text-3xl font-black text-green-300 mb-4 text-center">Versión A</h3>
                  <p className="text-white/90 text-lg leading-relaxed text-center">
                    La que mostrás al mundo: organizada, disciplinada, con todo bajo control.
                  </p>
                </motion.div>
              </motion.div>

              {/* Versión B */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="relative group/card"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl opacity-30 blur-xl group-hover/card:opacity-50 transition-opacity" />
                
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-400/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
                >
                  <div className="text-7xl mb-6 text-center">😔</div>
                  <h3 className="text-3xl font-black text-red-300 mb-4 text-center">Versión B</h3>
                  <p className="text-white/90 text-lg leading-relaxed text-center">
                    La de las 3 AM cuando nadie te ve: "ya qué importa", "mañana empiezo en serio".
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Truth card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring', bounce: 0.3 }}
              className="relative group/truth"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-30 blur-xl group-hover/truth:opacity-50 transition-opacity" />
              
              <div className="relative bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-2 border-purple-400/50 rounded-3xl p-8 backdrop-blur-xl">
                <p className="text-3xl text-yellow-300 font-black mb-6 text-center flex items-center justify-center gap-3">
                  <span className="text-4xl">🔥</span>
                  <span>Tu identidad no es lo que decís que sos...</span>
                </p>
                <p className="text-2xl text-white text-center mb-4 font-semibold">
                  Es lo que hacés cuando nadie te está mirando.
                </p>
                <p className="text-xl text-white/80 text-center font-medium">
                  La buena noticia: Si son hábitos aprendidos, pueden desaprenderse.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center"
        >
          <p className="text-white/70 text-lg mb-6 font-medium">¿Listo para ver qué cadenas te están frenando?</p>
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextLevel}
              className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl sm:text-2xl font-black px-12 py-6 rounded-3xl shadow-2xl flex items-center gap-3"
            >
              <span>Descubrir mis Cadenas</span>
              <span className="text-3xl">🔓</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // NIVEL 2: EL LOOP PREMIUM
  const VersionsLevel: React.FC = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative text-8xl">🎭</div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              {levels[2].title}
            </h2>
            <p className="text-2xl sm:text-3xl text-purple-200 leading-relaxed">
              {levels[2].subtitle}
            </p>
          </motion.div>

          {!selectedArea ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                <p className="text-2xl text-white leading-relaxed mb-10 text-center font-semibold">
                  Elegí un área de tu vida para ver cómo funciona tu loop personal:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {Object.values(areas).map((area, index) => (
                    <motion.div
                      key={area.id}
                      initial={{ 
                        x: index % 2 === 0 ? -50 : 50, 
                        opacity: 0 
                      }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.1, 
                        type: 'spring', 
                        bounce: 0.3 
                      }}
                      className="relative group/area"
                    >
                      <div className={`absolute -inset-1 bg-gradient-to-r ${area.color} rounded-3xl opacity-0 group-hover/area:opacity-40 blur-xl transition-opacity duration-500`} />
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectArea(area.id as AreaId)}
                        className={`relative w-full bg-gradient-to-br ${area.color} rounded-3xl p-8 shadow-2xl border-2 border-white/20 hover:border-white/40 transition-all`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl" />
                        
                        <div className="relative text-center">
                          <div className="text-7xl mb-6 transform group-hover/area:scale-110 transition-transform duration-300">
                            {area.icon}
                          </div>
                          <h3 className="text-3xl font-black text-white mb-3 leading-tight">
                            {area.name}
                          </h3>
                          <p className="text-base text-white/90 font-semibold">
                            Toca para explorar
                          </p>
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedArea}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              {(() => {
                const area = areas[selectedArea];
                return (
                  <div className="space-y-8">
                    {/* Area header premium */}
                    <div className="relative group">
                      <div className={`absolute -inset-2 bg-gradient-to-r ${area.color} rounded-3xl opacity-30 blur-xl`} />
                      
                      <div className={`relative bg-gradient-to-br ${area.color} rounded-3xl p-10 border-2 border-white/20 shadow-2xl`}>
                        <div className="text-8xl mb-6 text-center">{area.icon}</div>
                        <h3 className="text-4xl font-black text-white mb-6 text-center">{area.name}</h3>
                        <p className="text-2xl text-white/90 text-center font-semibold leading-relaxed">
                          {area.freedomPrompt}
                        </p>
                      </div>
                    </div>

                    {/* Loop visualization premium */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
                      
                      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                        <h4 className="text-3xl font-black text-white mb-10 text-center flex items-center justify-center gap-3">
                          <span className="text-4xl">🎢</span>
                          <span>Tu Loop Personal</span>
                        </h4>
                        
                        <div className="space-y-8">
                          {/* Versión A */}
                          <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="relative group/version"
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-xl" />
                            
                            <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-3xl p-8 backdrop-blur-xl">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                                  😇
                                </div>
                                <h5 className="text-2xl font-black text-green-300">Tu Versión A</h5>
                              </div>
                              <p className="text-white text-xl leading-relaxed font-medium">{area.versionA}</p>
                            </div>
                          </motion.div>

                          {/* Separator */}
                          <div className="text-center">
                            <motion.div 
                              className="text-8xl inline-block"
                              animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              ↕️
                            </motion.div>
                          </div>

                          {/* Versión B */}
                          <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, type: 'spring' }}
                            className="relative group/version"
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-30 blur-xl" />
                            
                            <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-400/50 rounded-3xl p-8 backdrop-blur-xl">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                                  😔
                                </div>
                                <h5 className="text-2xl font-black text-red-300">Tu Versión B</h5>
                              </div>
                              <p className="text-white text-xl leading-relaxed font-medium">{area.versionB}</p>
                            </div>
                          </motion.div>
                        </div>

                        {/* Truth card */}
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6, type: 'spring', bounce: 0.3 }}
                          className="mt-10 relative group/truth"
                        >
                          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl opacity-30 blur-xl" />
                          
                          <div className="relative bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-3xl p-8 backdrop-blur-xl">
                            <p className="text-2xl text-yellow-300 font-black mb-4 text-center flex items-center justify-center gap-3">
                              <span className="text-3xl">💡</span>
                              <span>La verdad incómoda:</span>
                            </p>
                            <p className="text-white text-xl text-center leading-relaxed font-semibold">
                              {area.chainExample}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <div className="relative inline-block">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={nextLevel}
                          className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl sm:text-2xl font-black px-12 py-6 rounded-3xl shadow-2xl flex items-center gap-3"
                        >
                          <span>Entiendo el Loop → Siguiente</span>
                          <span className="text-3xl">📊</span>
                        </motion.button>
                      </div>
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

  // NIVEL 3: TECHO VS SUELO PREMIUM
  const MetricsLevel: React.FC = () => {
    const promedio = Math.round((techoValue + sueloValue) / 2);
    const [isDraggingTecho, setIsDraggingTecho] = useState(false);
    const [isDraggingSuelo, setIsDraggingSuelo] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative text-8xl">📊</div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              {levels[3].title}
            </h2>
            <p className="text-2xl sm:text-3xl text-cyan-200 leading-relaxed">
              {levels[3].subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.3 }}
            className="relative group mb-10"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
              <p className="text-2xl text-white mb-10 text-center font-semibold">
                Moviendo los sliders, observá lo que realmente importa:
              </p>

              {/* Techo Slider Premium */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl">🌟</span>
                    </div>
                    <span className="text-xl sm:text-2xl text-white font-black">Tu Techo (mejores días)</span>
                  </div>
                  <motion.div
                    key={techoValue}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-right"
                  >
                    <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
                      {techoValue}%
                    </div>
                  </motion.div>
                </div>
                
                <div className="relative">
                  <div className="h-6 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full relative"
                      style={{ 
                        width: `${techoValue}%`,
                        boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)'
                      }}
                      animate={{
                        boxShadow: isDraggingTecho 
                          ? '0 0 30px rgba(245, 158, 11, 0.8)' 
                          : '0 0 20px rgba(245, 158, 11, 0.6)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </motion.div>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={techoValue}
                    onChange={(e) => setTechoValue(Number(e.target.value))}
                    onMouseDown={() => setIsDraggingTecho(true)}
                    onMouseUp={() => setIsDraggingTecho(false)}
                    onTouchStart={() => setIsDraggingTecho(true)}
                    onTouchEnd={() => setIsDraggingTecho(false)}
                    className="absolute inset-0 w-full h-6 appearance-none cursor-pointer opacity-0"
                  />
                </div>
              </div>

              {/* Suelo Slider Premium */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl">🏚️</span>
                    </div>
                    <span className="text-xl sm:text-2xl text-white font-black">Tu Suelo (peores días)</span>
                  </div>
                  <motion.div
                    key={sueloValue}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="text-right"
                  >
                    <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                      {sueloValue}%
                    </div>
                  </motion.div>
                </div>
                
                <div className="relative">
                  <div className="h-6 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-600 rounded-full relative"
                      style={{ 
                        width: `${sueloValue}%`,
                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)'
                      }}
                      animate={{
                        boxShadow: isDraggingSuelo 
                          ? '0 0 30px rgba(239, 68, 68, 0.8)' 
                          : '0 0 20px rgba(239, 68, 68, 0.6)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ animationDelay: '0.5s' }} />
                    </motion.div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={sueloValue}
                    onChange={(e) => setSueloValue(Number(e.target.value))}
                    onMouseDown={() => setIsDraggingSuelo(true)}
                    onMouseUp={() => setIsDraggingSuelo(false)}
                    onTouchStart={() => setIsDraggingSuelo(true)}
                    onTouchEnd={() => setIsDraggingSuelo(false)}
                    className="absolute inset-0 w-full h-6 appearance-none cursor-pointer opacity-0"
                  />
                </div>
              </div>

              {/* Promedio Card Premium */}
              <motion.div
                key={promedio}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.4 }}
                className="relative group/promedio"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse" />
                
                <div className="relative bg-gradient-to-r from-purple-600/40 to-pink-600/40 border-4 border-purple-400/50 rounded-3xl p-10 text-center backdrop-blur-xl shadow-2xl">
                  <p className="text-2xl text-white mb-4 font-bold">Tu Promedio Real (tu vida)</p>
                  <motion.div 
                    className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400"
                    animate={{
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {promedio}%
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Insight Card Premium */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring', bounce: 0.3 }}
            className="relative group mb-10"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-2 border-cyan-400/50 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
              <p className="text-3xl text-cyan-300 font-black mb-6 text-center flex items-center justify-center gap-3">
                <span className="text-4xl">💡</span>
                <span>El Insight que Cambia Todo</span>
              </p>
              <p className="text-white text-2xl mb-6 text-center leading-relaxed font-semibold">
                Tu vida no está definida por tu techo (mejores días)...
              </p>
              <p className="text-3xl text-yellow-300 font-black text-center mb-6">
                Está definida por tu SUELO (peores días)
              </p>
              <p className="text-white/90 text-xl text-center leading-relaxed font-medium">
                Subir el suelo del {sueloValue}% al 40% impacta más que subir el techo del {techoValue}% al 95%
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextLevel}
                className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl sm:text-2xl font-black px-12 py-6 rounded-3xl shadow-2xl flex items-center gap-3"
              >
                <span>Voy a Elevar mi Suelo</span>
                <span className="text-3xl">🏗️</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // NIVEL 4: DISEÑAR NUEVO SUELO PREMIUM
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center text-white max-w-md">
            <div className="text-7xl mb-6">⚠️</div>
            <p className="text-2xl mb-8 font-semibold">Por favor, selecciona un área en el nivel anterior</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentLevel(2)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl"
            >
              Volver
            </motion.button>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative text-8xl">🏗️</div>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              {levels[4].title}
            </h2>
            <p className="text-2xl sm:text-3xl text-emerald-200 leading-relaxed">
              {levels[4].subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="space-y-8"
          >
            {/* Main card */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                <h3 className="text-3xl font-black text-white mb-10 text-center flex items-center justify-center gap-3">
                  <span>{area.icon}</span>
                  <span>Tu Área: {area.name}</span>
                </h3>

                <div className="space-y-8">
                  {/* Old floor */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative group/old"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-20 blur-xl" />
                    
                    <div className="relative bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-400/50 rounded-2xl p-8 backdrop-blur-xl">
                      <p className="text-sm text-red-300 font-black mb-3 uppercase tracking-wide">Tu Suelo Actual:</p>
                      <p className="text-white text-xl italic leading-relaxed">"{area.oldFloor}"</p>
                    </div>
                  </motion.div>

                  {/* Separator */}
                  <div className="text-center">
                    <motion.div 
                      className="text-7xl inline-block"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ⚡
                    </motion.div>
                  </div>

                  {/* New floor */}
                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative group/new"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-30 blur-xl" />
                    
                    <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-2xl p-8 backdrop-blur-xl">
                      <p className="text-sm text-green-300 font-black mb-3 uppercase tracking-wide">Tu Nuevo Suelo (sugerido):</p>
                      <p className="text-white text-xl italic mb-6 leading-relaxed">"{area.newFloor}"</p>
                      <div className="bg-white/10 border border-green-400/30 rounded-xl p-4">
                        <p className="text-sm text-white/70 font-medium flex items-start gap-2">
                          <span className="text-xl flex-shrink-0">💡</span>
                          <span>Nota: Realista, no perfecto. Elevado, pero sostenible.</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Custom input */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative group/custom"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl opacity-20 blur-xl group-hover/custom:opacity-30 transition-opacity" />
                    
                    <div className="relative bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-xl">
                      <label className="text-xl text-yellow-300 font-black mb-4 block flex items-center gap-2">
                        <span className="text-2xl">✏️</span>
                        <span>Personalizá tu nuevo suelo (opcional):</span>
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl opacity-20 blur" />
                        <textarea
                          value={customFloor}
                          onChange={(e) => setCustomFloor(e.target.value)}
                          placeholder="Escribe tu propio suelo si quieres adaptarlo..."
                          className="relative w-full bg-black/40 text-white border-2 border-yellow-400/50 rounded-xl p-6 min-h-[150px] focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-500/20 transition-all resize-y text-lg"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Commitment card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring', bounce: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-r from-amber-600/30 to-orange-600/30 border-2 border-amber-400/50 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
                <p className="text-3xl text-amber-300 font-black mb-6 text-center flex items-center justify-center gap-3">
                  <span className="text-4xl">🎯</span>
                  <span>Tu Compromiso</span>
                </p>
                <p className="text-white text-2xl text-center mb-6 font-semibold leading-relaxed">
                  "Incluso en mis peores días, mi mínimo será esto."
                </p>
                <p className="text-white/80 text-xl text-center font-medium leading-relaxed">
                  No perfección. No techo inalcanzable. Solo un suelo que respete quién elegís ser.
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCommit}
                  className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl sm:text-2xl font-black px-16 py-8 rounded-3xl shadow-2xl flex items-center gap-4"
                >
                  <span>Comprometerme con mi Nuevo Suelo</span>
                  <span className="text-4xl">💚</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // NIVEL 5: INTEGRACIÓN FINAL PREMIUM
  const IntegrationLevel: React.FC = () => {
    const area = selectedArea ? areas[selectedArea] : null;
    const [showPrompt, setShowPrompt] = useState<boolean>(false);

    if (!area) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center text-white max-w-md">
            <div className="text-7xl mb-6">⚠️</div>
            <p className="text-2xl mb-8 font-semibold">Por favor, completa los niveles anteriores</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentLevel(2)}
              className="bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl"
            >
              Volver
            </motion.button>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden pt-32 pb-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
              className="relative inline-block mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <motion.div 
                className="relative text-9xl"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                💎
              </motion.div>
            </motion.div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              {levels[5].title}
            </h2>
            <p className="text-2xl sm:text-3xl text-pink-200 leading-relaxed">
              {levels[5].subtitle}
            </p>
          </motion.div>

          {/* Integration visualization */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="relative group mb-12"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-4xl font-black text-white mb-12 text-center flex items-center justify-center gap-3">
                <span className="text-5xl">🌟</span>
                <span>El Laboratorio Interior</span>
              </h3>

              <div className="flex items-center justify-center gap-12 mb-12 flex-wrap">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-center"
                >
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative text-8xl">😇</div>
                  </div>
                  <p className="text-green-300 font-black text-xl">Versión A</p>
                  <p className="text-white/70 font-medium">Tu potencial</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring', bounce: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-30 animate-pulse" />
                  <div className="relative text-9xl">🫱🏼‍🫲🏽</div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  >
                    <motion.span 
                      className="text-4xl"
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      ✨
                    </motion.span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="text-center"
                >
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative text-8xl">😔</div>
                  </div>
                  <p className="text-red-300 font-black text-xl">Versión B</p>
                  <p className="text-white/70 font-medium">Tu realidad</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, type: 'spring', bounce: 0.3 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                  <div className="relative text-8xl">🦋</div>
                </div>
                <p className="text-3xl text-purple-300 font-black mb-4">
                  La Integración
                </p>
                <p className="text-2xl text-white mb-3 font-semibold">
                  Ya no son dos versiones en guerra.
                </p>
                <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                  Es una sola identidad elevada, con un suelo que protege tu progreso.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Summary card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, type: 'spring', bounce: 0.3 }}
            className="relative group mb-12"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-r from-amber-600/30 to-yellow-600/30 border-2 border-amber-400/50 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-black text-amber-300 mb-8 text-center flex items-center justify-center gap-3">
                <span className="text-4xl">🏆</span>
                <span>Resumen de tu Viaje</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
                >
                  <p className="text-yellow-300 font-black mb-3 uppercase tracking-wide text-sm">💎 Puntos de Conciencia</p>
                  <p className="text-5xl font-black text-white">{consciousnessPoints}</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
                >
                  <p className="text-green-300 font-black mb-3 uppercase tracking-wide text-sm">🎯 Área Elegida</p>
                  <p className="text-3xl font-black text-white">{area.name}</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.9 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:col-span-2"
                >
                  <p className="text-purple-300 font-black mb-3 uppercase tracking-wide text-sm">🌱 Tu Compromiso</p>
                  <p className="text-white text-xl italic leading-relaxed">"{playerAnswers.newFloor || area.newFloor}"</p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Prompt section */}
          {!showPrompt ? (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPrompt(true)}
                  className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white text-2xl sm:text-3xl font-black px-16 py-8 rounded-3xl shadow-2xl flex items-center gap-4"
                >
                  <span className="text-4xl">🎁</span>
                  <span>Desbloquear Mi Prompt Personalizado</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400/50 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 0.8,
                      repeat: 3
                    }}
                    className="text-7xl mb-4 inline-block"
                  >
                    🎁
                  </motion.div>
                  <h3 className="text-4xl font-black text-purple-300 mb-3">
                    ¡Logro Desbloqueado!
                  </h3>
                  <p className="text-white/80 text-xl font-medium">Tu prompt personalizado para continuar la transformación</p>
                </div>

                <div className="relative group/code mb-8">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl group-hover/code:opacity-30 transition-opacity" />
                  
                  <div className="relative bg-slate-950/80 border-2 border-purple-400/30 rounded-2xl p-8 max-h-96 overflow-y-auto backdrop-blur-xl">
                    <pre className="text-white text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-mono">
{`Hola. Quiero reprogramar mis estándares mínimos para elevar mi identidad.

Área: ${area.name}
Suelo actual: ${area.oldFloor}
Nuevo suelo: ${playerAnswers.newFloor || area.newFloor}

Necesito que me ayudes a identificar las creencias limitantes detrás de mi suelo actual y a diseñar 3 hábitos base que lo refuercen.
Quiero que sea práctico, amable y sin perfeccionismo.`}
                    </pre>
                  </div>
                </div>

                <div className="relative inline-block w-full">
                  <div className={`absolute -inset-1 rounded-2xl blur-xl transition-opacity ${
                    journeyComplete 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 opacity-50' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 group-hover:opacity-50'
                  }`} />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={copyPrompt}
                    className={`relative w-full py-6 rounded-2xl font-black text-2xl shadow-2xl flex items-center justify-center gap-4 ${
                      journeyComplete
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    }`}
                  >
                    {journeyComplete ? (
                      <>
                        <span className="text-4xl">✅</span>
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl">📋</span>
                        <span>Copiar Mi Prompt Personalizado</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {journeyComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 relative group/success"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-30 blur-xl" />
                    
                    <div className="relative bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-2xl p-8 backdrop-blur-xl">
                      <p className="text-2xl text-green-300 font-black mb-4 text-center flex items-center justify-center gap-3">
                        <span className="text-3xl">🌟</span>
                        <span>¡Viaje Completado!</span>
                      </p>
                      <p className="text-white text-xl text-center mb-4 font-semibold">
                        Ahora llevá este prompt a ChatGPT o Claude y diseñá tu plan de acción.
                      </p>
                      <p className="text-white/80 text-center font-medium leading-relaxed">
                        Recordá: Tu vida mejora cuando elevás tu suelo, no cuando soñás con el techo.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
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
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Grain overlay global */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />

      {/* UI Elements */}
      <div className="relative z-10">
        {currentLevel > 0 && (
          <>
            <ConsciousnessDisplay />
            <div className="fixed top-6 left-6 right-32 z-40">
              <ProgressBar />
            </div>
          </>
        )}
        
        <AnimatePresence mode="wait">
          <div key={currentLevel}>
            {renderCurrentLevel()}
          </div>
        </AnimatePresence>
      </div>

      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Tip musical */}
      {currentLevel > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 left-6 bg-black/60 backdrop-blur-xl border border-white/10 text-white/60 px-6 py-3 rounded-2xl text-sm z-50 font-medium"
        >
          💡 Tip: Reproduce música lo-fi para mejor experiencia
        </motion.div>
      )}

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

export default CadenasGame;

export const cadenasGameMetadata = {
  id: 5,
  title: "🔗 Cadenas",
  type: "game" as const,
  duration: "15 min"
};