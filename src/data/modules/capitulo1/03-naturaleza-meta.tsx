import React, { useState, useCallback, useMemo } from 'react';

// === Tipos de Datos (Interfaces) ===
interface FeedbackTrigger {
  keywords: string[];
  feedback: string;
}

interface Challenge {
  prompt: string;
  reward: string;
}

interface Territory {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  helper: string;
  placeholder: string;
  icon: string;
  color: string;
  bgGradient: string;
  emblem: string;
  emblemName: string;
  feedbackTriggers: FeedbackTrigger[];
  challenge: Challenge;
}

interface Answers {
  [key: number]: string;
}

// === Datos Estáticos del Viaje ===
const territoriesData: Territory[] = [
  {
    id: 0,
    name: "El Valle del Qué",
    title: "¿Qué estás buscando realmente?",
    subtitle: "Tu destino debe ser visible",
    description: "En este valle, la niebla se disipa cuando nombras con claridad lo que deseas. No sueños vagos, sino algo que puedas ver, tocar, medir.",
    helper: "Algo concreto y medible. No 'ser feliz', sino algo específico que puedas reconocer cuando lo veas.",
    placeholder: "Ejemplo: Facturar $5.000 mensuales diseñando para marcas que me gusten",
    icon: "🎯",
    color: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    emblem: "💎",
    emblemName: "Visionario",
    feedbackTriggers: [
      { keywords: ['quiero', 'lograr', 'alcanzar'], feedback: "Eso suena a meta con dirección 🧭" },
      { keywords: ['facturar', 'ganar', '$', 'dinero'], feedback: "Medible y concreto. Excelente punto de partida 💰" },
      { keywords: ['crear', 'construir', 'desarrollar'], feedback: "Hay poder en lo que estás construyendo 🏗️" }
    ],
    challenge: {
      prompt: "¿Podés visualizar el momento exacto en que lográs esto? Describilo en 3 palabras.",
      reward: "Carta del Futuro Desbloqueada"
    }
  },
  {
    id: 1,
    name: "La Línea del Tiempo",
    title: "¿Cuándo te gustaría lograrlo?",
    subtitle: "El tiempo es tu aliado, no tu enemigo",
    description: "Aquí el tiempo se estira como un río. Los impacientes se ahogan. Los realistas aprenden a navegar.",
    helper: "Pensá en un horizonte realista. Si dudás, agregale tiempo. Es mejor llegar 'tarde' que abandonar porque era imposible.",
    placeholder: "Ejemplo: En 12-18 meses, pero estoy preparado si toma más tiempo",
    icon: "⏰",
    color: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    emblem: "⌛",
    emblemName: "Paciente Estratégico",
    feedbackTriggers: [
      { keywords: ['meses', 'año', 'años'], feedback: "Pensás en el largo plazo. Eso es madurez 🌱" },
      { keywords: ['preparado', 'flexible', 'realista'], feedback: "La flexibilidad es sabiduría en acción 🧘" },
      { keywords: ['rápido', 'pronto', 'ya'], feedback: "La urgencia es comprensible, pero recordá multiplicar x3 ⚠️" }
    ],
    challenge: {
      prompt: "Si esto tomara el doble del tiempo que imaginás, ¿seguirías adelante?",
      reward: "Sello de Persistencia Desbloqueado"
    }
  },
  {
    id: 2,
    name: "El Santuario del Por Qué",
    title: "¿Por qué te importa esto?",
    subtitle: "Tu verdadero motor vive aquí",
    description: "En el santuario más profundo de tu viaje, descubrís que tus metas no son solo tus metas. Son respuestas a llamados que vienen de muy atrás.",
    helper: "A veces es obvio. Otras veces hay algo más profundo. No hay respuesta correcta o incorrecta acá.",
    placeholder: "Ejemplo: Quiero independencia económica porque siempre sentí que dependía de otros para las decisiones importantes",
    icon: "💎",
    color: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    emblem: "🔥",
    emblemName: "Buscador de Sentido",
    feedbackTriggers: [
      { keywords: ['sentí', 'siento', 'siempre'], feedback: "Tocaste algo profundo. Esto es auténtico 💜" },
      { keywords: ['quiero', 'necesito', 'anhelo'], feedback: "Tu deseo tiene raíz. Eso le da fuerza 🌳" },
      { keywords: ['porque', 'para', 'así'], feedback: "Estás conectando causa y propósito. Poderoso 🎯" }
    ],
    challenge: {
      prompt: "Si ya tuvieras esto que buscás, ¿cómo te sentirías diferente?",
      reward: "Espejo del Alma Desbloqueado"
    }
  },
  {
    id: 3,
    name: "El Laboratorio de la Causalidad",
    title: "¿Cómo pensás lograrlo?",
    subtitle: "No fuerces. Provocá.",
    description: "En este laboratorio, aprendés que las metas no se fuerzan. Se cultivan. Cada acción es una semilla.",
    helper: "Hábitos, aprendizajes, acciones clave. No hace falta un plan perfecto, solo las primeras piezas.",
    placeholder: "Ejemplo: Estudiar diseño 2h diarias, armar portfolio, contactar 5 marcas por semana",
    icon: "🔧",
    color: "from-green-500 to-emerald-600",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    emblem: "⚙️",
    emblemName: "Arquitecto del Cambio",
    feedbackTriggers: [
      { keywords: ['diarias', 'cada día', 'rutina'], feedback: "Los hábitos diarios son tu superpoder secreto 💪" },
      { keywords: ['aprender', 'estudiar', 'practicar'], feedback: "El aprendizaje constante te convierte en imparable 📚" },
      { keywords: ['contactar', 'buscar', 'probar'], feedback: "La acción imperfecta vence a la planificación perfecta 🚀" }
    ],
    challenge: {
      prompt: "¿Qué harías hoy si solo tuvieras 15 minutos para avanzar?",
      reward: "Llave de la Acción Desbloqueada"
    }
  },
  {
    id: 4,
    name: "El Jardín del Contexto",
    title: "¿Dónde te conviene estar?",
    subtitle: "Tu ambiente es invisible hasta que te frena",
    description: "En este jardín, cada flor crece donde el suelo la alimenta. ¿Dónde está tu suelo fértil?",
    helper: "Tu ambiente importa. ¿Te ayuda a avanzar o te distrae? ¿Qué cambios de entorno te facilitarían las cosas?",
    placeholder: "Ejemplo: Necesito un espacio de trabajo dedicado y conectar con diseñadores que ya lo lograron",
    icon: "🌍",
    color: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-500/10 to-cyan-500/10",
    emblem: "🌱",
    emblemName: "Cultivador de Ecosistemas",
    feedbackTriggers: [
      { keywords: ['espacio', 'lugar', 'ambiente'], feedback: "El espacio físico moldea tu mente 🏡" },
      { keywords: ['gente', 'personas', 'comunidad'], feedback: "Sos el promedio de las 5 personas con las que pasás más tiempo 👥" },
      { keywords: ['cambiar', 'mover', 'nuevo'], feedback: "A veces un cambio de contexto lo cambia todo 🔄" }
    ],
    challenge: {
      prompt: "¿Qué tendrías que eliminar de tu entorno para que sea más fácil avanzar?",
      reward: "Brújula del Entorno Desbloqueada"
    }
  },
  {
    id: 5,
    name: "El Templo de la Identidad",
    title: "¿Qué versión de vos necesita aparecer?",
    subtitle: "No se trata de tener más, sino de ser más",
    description: "En el último templo, el más sagrado, te encontrás con quien necesitás convertirte. No es otra persona. Es vos, más completo.",
    helper: "No se trata de convertirte en otra persona. Se trata de qué habilidades o actitudes vas a necesitar desarrollar.",
    placeholder: "Ejemplo: Necesito ser más constante, confiar más en mi criterio, y aprender a vender mi trabajo",
    icon: "🦋",
    color: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    emblem: "👑",
    emblemName: "Alquimista Interior",
    feedbackTriggers: [
      { keywords: ['ser', 'convertirme', 'desarrollar'], feedback: "Estás hablando de transformación real 🦋" },
      { keywords: ['constante', 'disciplina', 'enfoque'], feedback: "La consistencia es el camino de los maestros 🎯" },
      { keywords: ['confiar', 'creer', 'seguro'], feedback: "La confianza se construye paso a paso 🪜" }
    ],
    challenge: {
      prompt: "¿Cómo se comportaría la persona que ya logró esto?",
      reward: "Corona de la Metamorfosis Desbloqueada"
    }
  }
];

// === COMPONENTES MODULARES ===

// 1. Pantalla de Introducción PREMIUM
const IntroScreen = ({ onStartJourney }: { onStartJourney: () => void }) => (
  <div className="min-h-screen flex items-center justify-center relative">
    {/* Orbes de fondo premium */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>

    <div className="relative z-10 text-center space-y-10 max-w-4xl px-6 animate-fade-in">
      {/* Icono hero con mega glow */}
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 transform hover:scale-110 transition-all duration-500">
          <span className="text-7xl animate-float">🧭</span>
        </div>
      </div>

      {/* Título premium */}
      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 leading-tight tracking-tight mb-6">
        El Camino hacia tu Norte
      </h1>
      
      <p className="text-2xl sm:text-3xl text-gray-300 leading-relaxed font-medium">
        Un viaje de 6 territorios para descubrir la naturaleza profunda de tus metas
      </p>

      {/* Card de info premium con glassmorphism */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
        
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-10 space-y-6">
          <p className="text-xl text-white font-semibold">
            Este no es un formulario. Es una experiencia.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Atravesarás valles, santuarios y templos donde cada respuesta desbloqueará
            comprensión sobre quién eres y hacia dónde vas.
          </p>
          
          {/* Stats premium */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-2">⏱️</div>
              <div className="text-2xl font-bold text-white">~20 min</div>
              <div className="text-sm text-gray-400 font-medium">Duración</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-sm text-gray-400 font-medium">Territorios</div>
            </div>
            <div className="bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-2">💎</div>
              <div className="text-2xl font-bold text-white">Logros</div>
              <div className="text-sm text-gray-400 font-medium">Desbloqueables</div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón CTA premium */}
      <div className="relative inline-block">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 animate-pulse" />
        <button
          onClick={onStartJourney}
          className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-pink-700
                     text-white text-2xl font-black py-8 px-16 rounded-3xl shadow-2xl
                     transform hover:scale-105 transition-all duration-300"
        >
          🚀 Comenzar el Viaje
        </button>
      </div>

      {/* Quote premium */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-xl" />
        <p className="relative text-lg text-gray-400 italic bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          "No se trata de encontrar respuestas perfectas. Se trata de hacer las preguntas correctas."
        </p>
      </div>
    </div>
  </div>
);

// 2. Cabecera del Juego PREMIUM
const GameHeader = ({ currentTerritoryData, currentTerritory }: { currentTerritoryData: Territory, currentTerritory: number }) => {
  const totalTerritories = territoriesData.length;
  const progressWidth = ((currentTerritory + 1) / totalTerritories) * 100;

  return (
    <div className="relative group">
      {/* Mega glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
      
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10">
        {/* Decorative gradient overlays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-fuchsia-500/20 to-transparent rounded-full blur-3xl" />
        
        <div className="relative">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl blur-xl opacity-50 animate-pulse" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-5xl animate-pulse-slow">{currentTerritoryData.icon}</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  {currentTerritoryData.name}
                </h2>
                <p className="text-base sm:text-lg text-gray-400 font-medium">{currentTerritoryData.subtitle}</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide mb-1">Territorio</p>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                {currentTerritory + 1} / {totalTerritories}
              </p>
            </div>
          </div>

          {/* Barra de progreso PREMIUM */}
          <div className="space-y-6">
            {/* Iconos de territorios */}
            <div className="flex justify-between">
              {territoriesData.map((t, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl
                    transition-all duration-500 ${
                      i < currentTerritory 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 scale-110 shadow-lg shadow-green-500/50' :
                      i === currentTerritory 
                        ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600 scale-125 shadow-2xl shadow-purple-500/50' :
                      'bg-white/10 backdrop-blur-sm border border-white/20'
                    }`}>
                    {i < currentTerritory ? (
                      <span className="text-white font-black">✓</span>
                    ) : (
                      <span>{t.icon}</span>
                    )}
                    {i === currentTerritory && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full blur-xl opacity-50 animate-pulse" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400 font-semibold hidden sm:block">{t.name.split(' ')[1]}</span>
                </div>
              ))}
            </div>
            
            {/* Progress bar con shimmer effect */}
            <div className="relative h-4 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/10">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${progressWidth}%`,
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                {progressWidth > 0 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-sm opacity-50" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Contenido Principal del Territorio PREMIUM
const TerritoryContent = ({
  currentTerritoryData,
  currentAnswer,
  energyLevel,
  completedChallenges,
  onAnswerChange,
  onCompleteChallenge
}: {
  currentTerritoryData: Territory;
  currentAnswer: string;
  energyLevel: number;
  completedChallenges: number[];
  onAnswerChange: (value: string) => void;
  onCompleteChallenge: (id: number) => void;
}) => (
  <div className="space-y-6">
    {/* Descripción del territorio PREMIUM */}
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
      
      <div className={`relative bg-gradient-to-br ${currentTerritoryData.bgGradient} backdrop-blur-sm border-2 border-white/10 p-8 sm:p-10 rounded-3xl shadow-xl`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-2xl" />
        <p className="relative text-xl sm:text-2xl text-white leading-relaxed italic font-medium">
          "{currentTerritoryData.description}"
        </p>
      </div>
    </div>

    {/* Pregunta principal PREMIUM */}
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
      
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10 space-y-8">
        <div className="space-y-4">
          <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            {currentTerritoryData.title}
          </h3>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            {currentTerritoryData.helper}
          </p>
        </div>

        {/* Textarea premium */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl opacity-20 blur" />
          <textarea
            value={currentAnswer || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder={currentTerritoryData.placeholder}
            className="relative w-full min-h-[240px] p-6 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl
                     focus:border-purple-400/50 focus:outline-none focus:ring-4 focus:ring-purple-500/20
                     resize-y text-lg text-white placeholder-gray-500 transition-all"
          />
        </div>

        {/* Barra de energía PREMIUM */}
        {currentAnswer && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-300 uppercase tracking-wide">Profundidad de tu respuesta</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                {Math.floor(energyLevel)}%
              </span>
            </div>
            
            <div className="relative h-4 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/10">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                  energyLevel > 70 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50' :
                  energyLevel > 40 
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/50' :
                    'bg-gradient-to-r from-red-500 to-orange-600 shadow-lg shadow-red-500/50'
                }`}
                style={{ width: `${energyLevel}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
            
            {energyLevel > 70 && (
              <div className="flex items-center justify-center gap-2 text-green-400 font-bold animate-fade-in">
                <span className="text-xl">✨</span>
                <span>Respuesta profunda y poderosa</span>
                <span className="text-xl">✨</span>
              </div>
            )}
          </div>
        )}

        {/* Desafío opcional */}
        <ChallengeCard
          territoryId={currentTerritoryData.id}
          challenge={currentTerritoryData.challenge}
          completedChallenges={completedChallenges}
          onCompleteChallenge={onCompleteChallenge}
        />
      </div>
    </div>
  </div>
);

// 4. Componente de Desafío PREMIUM
const ChallengeCard = ({ territoryId, challenge, completedChallenges, onCompleteChallenge }: {
  territoryId: number;
  challenge: Challenge;
  completedChallenges: number[];
  onCompleteChallenge: (id: number) => void;
}) => {
  const isCompleted = completedChallenges.includes(territoryId);

  return (
    <>
      {!isCompleted ? (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
          
          <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border-2 border-amber-400/30 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎯</span>
              </div>
              <div className="flex-1">
                <p className="font-black text-white text-lg mb-3 uppercase tracking-wide">Desafío Opcional:</p>
                <p className="text-gray-300 text-base mb-5 leading-relaxed">{challenge.prompt}</p>
                <button
                  onClick={() => onCompleteChallenge(territoryId)}
                  className="relative group/btn bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 
                           text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="relative z-10">✓ Reflexioné sobre esto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-30 blur-xl" />
          
          <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-2 border-green-400/30 p-6 sm:p-8 rounded-2xl animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50">
                <span className="text-3xl">🏆</span>
              </div>
              <div>
                <p className="font-black text-white text-lg mb-1">{challenge.reward}</p>
                <p className="text-sm text-green-300 font-medium">Completaste el desafío de este territorio</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// 5. Navegación PREMIUM
const GameNavigation = ({
  currentTerritory,
  territoriesLength,
  canAdvance,
  unlockedEmblems,
  onPrevious,
  onNext
}: {
  currentTerritory: number;
  territoriesLength: number;
  canAdvance: boolean;
  unlockedEmblems: number[];
  onPrevious: () => void;
  onNext: () => void;
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
    <button
      onClick={onPrevious}
      disabled={currentTerritory === 0}
      className={`relative group w-full sm:w-auto px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
        currentTerritory === 0
          ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
          : 'bg-white/10 hover:bg-white/15 text-white shadow-lg hover:shadow-xl border border-white/20 hover:border-white/30 transform hover:scale-105'
      }`}
    >
      <span className={`text-xl ${currentTerritory === 0 ? '' : 'group-hover:-translate-x-1 transition-transform'}`}>←</span>
      <span>Territorio Anterior</span>
    </button>

    {/* Emblemas ganados con animación */}
    <div className="flex items-center gap-3">
      {unlockedEmblems.map((emblemIndex) => (
        <div key={emblemIndex} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="relative text-4xl animate-bounce-in">
            {territoriesData[emblemIndex].emblem}
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={onNext}
      disabled={!canAdvance}
      className={`relative group w-full sm:w-auto px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${
        canAdvance
          ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-lg hover:shadow-2xl border-2 border-purple-400/30 transform hover:scale-105'
          : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
      }`}
    >
      <span>{currentTerritory === territoriesLength - 1 ? 'Completar Viaje' : 'Siguiente Territorio'}</span>
      <span className={`text-xl ${canAdvance ? 'group-hover:translate-x-1 transition-transform' : ''}`}>→</span>
      
      {canAdvance && (
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
      )}
    </button>
  </div>
);

// 6. Pantalla de Resultados PREMIUM
const ResultScreen = ({
  answers,
  copiedPrompt,
  showBonusSecret,
  setShowBonusSecret,
  copyPrompt,
  onStartNewJourney
}: {
  answers: Answers;
  copiedPrompt: boolean;
  showBonusSecret: boolean;
  setShowBonusSecret: (show: boolean) => void;
  copyPrompt: () => void;
  onStartNewJourney: () => void;
}) => {
  const finalPrompt = useMemo(() => {
    return `🎯 Quiero entender cómo alinear mis metas con mi identidad profunda.

Estas son mis respuestas del Camino hacia mi Norte:

${territoriesData.map((t, i) => `${t.icon} ${t.name}: ${t.title}
→ ${answers[i] || 'Sin respuesta'}`).join('\n\n')}

Actuá como un mentor que combina psicología, estrategia y visión de propósito. Mostrame lo que no estoy viendo todavía y cómo puedo integrar mis metas sin forzarme.`;
  }, [answers]);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt).then(() => {
        copyPrompt(); 
    }).catch(err => {
        console.error('No se pudo copiar el texto: ', err);
    });
  }

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Celebración inicial PREMIUM */}
      <div className="text-center py-16 relative">
        {/* Orbes decorativos */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="relative text-9xl animate-float">🗺️</div>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 leading-tight mb-6">
            Tu Mapa del Norte Personal
          </h2>
          <p className="text-2xl sm:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Has completado el viaje. Este es el mapa de tu claridad.
          </p>
        </div>
      </div>

      {/* Emblemas ganados PREMIUM */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
        
        <div className="relative bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-2xl border-2 border-yellow-400/30 p-10 rounded-3xl shadow-2xl">
          <h3 className="text-4xl font-black text-white mb-8 flex items-center justify-center gap-4">
            <span className="text-5xl">🏆</span>
            Emblemas Conquistados
            <span className="text-5xl">🏆</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {territoriesData.map((t, i) => (
              <div key={i} className="relative group/card">
                <div className="absolute -inset-1 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl opacity-20 blur-xl group-hover/card:opacity-40 transition-opacity" />
                
                <div className="relative bg-white/5 backdrop-blur-xl border-2 border-yellow-400/20 p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-6xl mb-4">{t.emblem}</div>
                  <p className="font-black text-white text-lg mb-2">{t.emblemName}</p>
                  <p className="text-sm text-gray-400 font-medium">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mapa visual de respuestas PREMIUM */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
        
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <h3 className="text-4xl font-black text-white mb-10 text-center flex items-center justify-center gap-3">
            <span className="text-5xl">📜</span>
            Tu Carta de Navegación
          </h3>
          
          <div className="space-y-6">
            {territoriesData.map((t, i) => (
              answers[i] && (
                <div key={i} className="relative group/answer"
                     style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl opacity-10 blur-xl group-hover/answer:opacity-20 transition-opacity" />
                  
                  <div className={`relative bg-gradient-to-br ${t.bgGradient} backdrop-blur-xl border-2 border-white/10 p-8 rounded-2xl shadow-lg animate-slide-in`}>
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center text-4xl border border-white/20">
                          {t.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-black text-white text-xl mb-2">{t.name}</p>
                        <p className="text-sm text-gray-400 mb-4 italic font-medium">"{t.subtitle}"</p>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                          <p className="text-gray-200 leading-relaxed text-base">{answers[i]}</p>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center text-4xl shadow-lg shadow-yellow-500/30">
                          {t.emblem}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Sabiduría final PREMIUM */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000" />
        
        <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 p-12 rounded-3xl text-white text-center shadow-2xl">
          <p className="text-5xl font-bold mb-6">🌟</p>
          <p className="text-3xl sm:text-4xl font-black mb-6 leading-tight">
            "No viniste aquí a encontrar todas las respuestas."
          </p>
          <p className="text-xl sm:text-2xl font-medium">
            Viniste a descubrir cuáles son las preguntas correctas.
          </p>
        </div>
      </div>

      {/* Prompt de regalo PREMIUM */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
        
        <div className="relative bg-slate-950 backdrop-blur-2xl border-2 border-amber-400/30 p-10 rounded-3xl shadow-2xl">
          <h3 className="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center gap-4">
            <span className="text-5xl">🎁</span>
            Tu Regalo: Mentor Digital Personalizado
          </h3>
          
          <p className="text-gray-300 text-lg mb-8 text-center">
            Copiá este prompt y usalo con tu IA favorita para profundizar tu visión:
          </p>
          
          <div className="relative group/code">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur-xl group-hover/code:opacity-30 transition-opacity" />
            
            <div className="relative bg-slate-900 border-2 border-amber-400/20 p-8 rounded-2xl mb-8 max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-mono">
                {finalPrompt}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleCopy}
            className="relative group/btn w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 
                     text-slate-900 font-black py-6 px-8 rounded-2xl transition-all flex items-center justify-center gap-4 
                     shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity" />
            
            <span className="relative z-10 flex items-center gap-4">
              {copiedPrompt ? (
                <>
                  <span className="text-3xl">✓</span>
                  <span className="text-xl">¡Copiado! Listo para usar</span>
                </>
              ) : (
                <>
                  <span className="text-3xl">📋</span>
                  <span className="text-xl">Copiar Mi Prompt Personalizado</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Bonus secreto */}
      <BonusSecret showBonusSecret={showBonusSecret} setShowBonusSecret={setShowBonusSecret} />

      {/* Botón de nuevo viaje PREMIUM */}
      <div className="text-center pt-8">
        <button
          onClick={onStartNewJourney}
          className="relative group bg-white/10 hover:bg-white/15 border-2 border-white/20 hover:border-white/30 
                   text-white font-bold py-4 px-10 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="flex items-center gap-3">
            <span className="text-xl">🔄</span>
            <span>Comenzar Nuevo Viaje</span>
          </span>
        </button>
      </div>
    </div>
  );
};

// 7. Componente de Bonus Secreto PREMIUM
const BonusSecret = ({ showBonusSecret, setShowBonusSecret }: { showBonusSecret: boolean; setShowBonusSecret: (show: boolean) => void }) => (
  <div className="text-center">
    {!showBonusSecret ? (
      <div className="relative inline-block">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 rounded-full blur-2xl opacity-50 animate-pulse" />
        
        <button
          onClick={() => setShowBonusSecret(true)}
          className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 hover:from-purple-700 hover:via-pink-700 hover:to-fuchsia-700
                     text-white font-black py-6 px-12 rounded-full shadow-2xl hover:shadow-3xl
                     transform hover:scale-110 transition-all"
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">💎</span>
            <span className="text-lg">Bonus Oculto: Tocá para revelar tu carta</span>
          </span>
        </button>
      </div>
    ) : (
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 rounded-3xl blur-3xl opacity-50" />
        
        <div className="relative bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-2xl border-4 border-pink-400/30 p-12 rounded-3xl shadow-2xl animate-scale-in">
          <div className="text-center space-y-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl mb-6 animate-float">🔮</div>
            </div>
            
            <h3 className="text-5xl font-black text-white mb-6 leading-tight">
              Tu Carta del Universo
            </h3>
            
            <div className="relative group/card">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-white/5 backdrop-blur-xl border-2 border-white/10 p-10 rounded-3xl max-w-3xl mx-auto">
                <p className="text-2xl sm:text-3xl text-white leading-relaxed mb-8 font-medium">
                  "El camino que buscás ya existe dentro de vos.
                  No lo fuerces. No lo apures.
                  Solo caminalo con la certeza de quien sabe que cada paso cuenta."
                </p>
                <p className="text-xl text-gray-300 italic font-medium">
                  Tu siguiente paso aparecerá cuando estés listo para verlo.
                </p>
              </div>
            </div>
            
            <p className="text-base text-gray-400 font-medium">
              ✨ Guardá esta carta. Volvé a ella cuando necesites recordar tu claridad.
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

// 8. Componente de Animación de Emblema PREMIUM
const EmblemAnimation = ({ currentTerritoryData }: { currentTerritoryData: Territory }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl animate-fade-in">
    <div className="relative">
      {/* Mega glow effect */}
      <div className="absolute -inset-10 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-full blur-3xl opacity-50 animate-pulse" />
      
      <div className="relative bg-white/10 backdrop-blur-2xl border-2 border-white/20 p-16 rounded-3xl shadow-2xl text-center animate-scale-in">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-yellow-500 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="relative text-9xl animate-bounce-celebration">
            {currentTerritoryData.emblem}
          </div>
        </div>
        
        <p className="text-4xl font-black text-white mb-4">¡Emblema Desbloqueado!</p>
        <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 font-black">
          {currentTerritoryData.emblemName}
        </p>
      </div>
    </div>
  </div>
);

// 9. Componente de Feedback Flotante PREMIUM
const FeedbackFloating = ({ currentFeedback }: { currentFeedback: string }) => (
  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in max-w-2xl w-full px-4">
    <div className="relative">
      {/* Mega glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl blur-3xl opacity-50 animate-pulse" />
      
      <div className="relative bg-white/10 backdrop-blur-2xl border-4 border-purple-400/30 p-10 rounded-3xl shadow-2xl">
        <p className="text-3xl text-center font-black text-white leading-relaxed">
          {currentFeedback}
        </p>
      </div>
    </div>
  </div>
);

// === COMPONENTE PRINCIPAL (Contenedor de Lógica) ===
export const NaturalezaMetaContent = () => {
  // Estados del juego
  const [currentTerritory, setCurrentTerritory] = useState(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [unlockedEmblems, setUnlockedEmblems] = useState<number[]>([]);
  const [showEmblemAnimation, setShowEmblemAnimation] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [showBonusSecret, setShowBonusSecret] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentTerritoryData = useMemo(() => territoriesData[currentTerritory], [currentTerritory]);
  const canAdvance = answers[currentTerritory]?.trim().length > 10;
  
  const generateFeedback = useCallback((text: string, territoryIndex: number) => {
    const territory = territoriesData[territoryIndex];
    const lowerText = text.toLowerCase();
    
    for (const trigger of territory.feedbackTriggers) {
      if (trigger.keywords.some(keyword => lowerText.includes(keyword))) {
        return trigger.feedback;
      }
    }
    
    const genericFeedbacks = [
      "Interesante perspectiva 💭",
      "Eso tiene peso 🎯",
      "Hay claridad en lo que escribiste ✨",
      "Estás encontrando tu camino 🧭"
    ];
    return genericFeedbacks[Math.floor(Math.random() * genericFeedbacks.length)];
  }, []);

  const handleAnswerChange = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, [currentTerritory]: value }));
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    setEnergyLevel(Math.min(100, (wordCount / 30) * 100));
  }, [currentTerritory]);

  const handleNext = useCallback(() => {
    if (!canAdvance) return;

    const feedback = generateFeedback(answers[currentTerritory] || '', currentTerritory);
    setCurrentFeedback(feedback);
    setShowFeedback(true);
    
    if (!unlockedEmblems.includes(currentTerritory)) {
      setTimeout(() => {
        setUnlockedEmblems(prev => [...prev, currentTerritory]);
        setShowEmblemAnimation(true);
        setTimeout(() => setShowEmblemAnimation(false), 2000);
      }, 1000);
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      setIsTransitioning(true);
      
      setTimeout(() => {
        if (currentTerritory < territoriesData.length - 1) {
          setCurrentTerritory(currentTerritory + 1);
          setEnergyLevel(0);
        } else {
          setShowResult(true);
        }
        setIsTransitioning(false);
      }, 300);
    }, 2500);
  }, [currentTerritory, answers, canAdvance, generateFeedback, unlockedEmblems]);

  const handlePrevious = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentTerritory > 0) {
        setCurrentTerritory(currentTerritory - 1);
      }
      setIsTransitioning(false);
    }, 300);
  }, [currentTerritory]);

  const handleCompleteChallenge = useCallback((territoryId: number) => {
    if (!completedChallenges.includes(territoryId)) {
      setCompletedChallenges(prev => [...prev, territoryId]);
    }
  }, [completedChallenges]);

  const copyPrompt = useCallback(() => {
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  }, []);

  const handleStartNewJourney = useCallback(() => {
    setJourneyStarted(false);
    setCurrentTerritory(-1);
    setAnswers({});
    setShowResult(false);
    setUnlockedEmblems([]);
    setCompletedChallenges([]);
    setShowBonusSecret(false);
  }, []);

  const handleStartJourney = useCallback(() => {
    setJourneyStarted(true);
    setCurrentTerritory(0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      
      {/* Animated Background Orbs PREMIUM */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
        }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Pantalla de introducción */}
        {!journeyStarted && (
          <IntroScreen onStartJourney={handleStartJourney} />
        )}

        {/* Juego principal */}
        {journeyStarted && currentTerritory >= 0 && !showResult && (
          <div className={`space-y-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <GameHeader
              currentTerritoryData={currentTerritoryData}
              currentTerritory={currentTerritory}
            />
            
            <TerritoryContent
              currentTerritoryData={currentTerritoryData}
              currentAnswer={answers[currentTerritory] || ''}
              energyLevel={energyLevel}
              completedChallenges={completedChallenges}
              onAnswerChange={handleAnswerChange}
              onCompleteChallenge={handleCompleteChallenge}
            />

            <GameNavigation
              currentTerritory={currentTerritory}
              territoriesLength={territoriesData.length}
              canAdvance={canAdvance}
              unlockedEmblems={unlockedEmblems}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        )}

        {/* Mapa final */}
        {showResult && (
          <ResultScreen
            answers={answers}
            copiedPrompt={copiedPrompt}
            showBonusSecret={showBonusSecret}
            setShowBonusSecret={setShowBonusSecret}
            copyPrompt={copyPrompt}
            onStartNewJourney={handleStartNewJourney}
          />
        )}
      </div>

      {/* Feedback contextual */}
      {showFeedback && (
        <FeedbackFloating currentFeedback={currentFeedback} />
      )}

      {/* Animación de emblema desbloqueado */}
      {showEmblemAnimation && currentTerritoryData && (
        <EmblemAnimation currentTerritoryData={currentTerritoryData} />
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
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes bounce-celebration {
          0%, 100% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-30px) scale(1.1); }
          50% { transform: translateY(0) scale(1); }
          75% { transform: translateY(-15px) scale(1.05); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-bounce-celebration { animation: bounce-celebration 1s ease-in-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out; }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* GPU acceleration */
        [style*="transform"] {
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Custom scrollbar PREMIUM */
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

export default NaturalezaMetaContent;

export const naturalezaMetaMetadata = {
  id: 3,
  title: "El Camino hacia tu Norte",
  type: "document" as const,
  duration: "20-25 min"
};