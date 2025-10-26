import React, { useState, useEffect } from 'react';

export const NaturalezaMetaContent = () => {
  // Estados del juego
  const [currentTerritory, setCurrentTerritory] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
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

  // Los 6 territorios del viaje
  const territories = [
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
      bgGradient: "from-blue-50 to-cyan-50",
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
      bgGradient: "from-amber-50 to-orange-50",
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
      bgGradient: "from-purple-50 to-pink-50",
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
      bgGradient: "from-green-50 to-emerald-50",
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
      bgGradient: "from-teal-50 to-cyan-50",
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
      bgGradient: "from-violet-50 to-purple-50",
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

  // Feedback contextual basado en palabras clave
  const generateFeedback = (text: string, territoryIndex: number) => {
    const territory = territories[territoryIndex];
    const lowerText = text.toLowerCase();
    
    for (const trigger of territory.feedbackTriggers) {
      if (trigger.keywords.some(keyword => lowerText.includes(keyword))) {
        return trigger.feedback;
      }
    }
    
    // Feedback genérico si no hay match
    const genericFeedbacks = [
      "Interesante perspectiva 💭",
      "Eso tiene peso 🎯",
      "Hay claridad en lo que escribiste ✨",
      "Estás encontrando tu camino 🧭"
    ];
    return genericFeedbacks[Math.floor(Math.random() * genericFeedbacks.length)];
  };

  // Manejar cambio de respuesta
  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentTerritory]: value });
    
    // Actualizar energía basada en longitud
    const wordCount = value.trim().split(' ').length;
    setEnergyLevel(Math.min(100, (wordCount / 30) * 100));
  };

  // Avanzar al siguiente territorio
  const handleNext = () => {
    const feedback = generateFeedback(answers[currentTerritory], currentTerritory);
    setCurrentFeedback(feedback);
    setShowFeedback(true);
    
    // Desbloquear emblema
    if (!unlockedEmblems.includes(currentTerritory)) {
      setTimeout(() => {
        setUnlockedEmblems([...unlockedEmblems, currentTerritory]);
        setShowEmblemAnimation(true);
        setTimeout(() => setShowEmblemAnimation(false), 2000);
      }, 1000);
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      setIsTransitioning(true);
      
      setTimeout(() => {
        if (currentTerritory < territories.length - 1) {
          setCurrentTerritory(currentTerritory + 1);
          setEnergyLevel(0);
        } else {
          setShowResult(true);
        }
        setIsTransitioning(false);
      }, 300);
    }, 2500);
  };

  // Retroceder
  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentTerritory > 0) {
        setCurrentTerritory(currentTerritory - 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  // Completar desafío
  const handleCompleteChallenge = (territoryId: number) => {
    if (!completedChallenges.includes(territoryId)) {
      setCompletedChallenges([...completedChallenges, territoryId]);
    }
  };

  // Copiar prompt
  const copyPrompt = () => {
    const prompt = `🎯 Quiero entender cómo alinear mis metas con mi identidad profunda.

Estas son mis respuestas del Camino hacia mi Norte:

${territories.map((t, i) => `${t.icon} ${t.name}: ${t.title}
→ ${answers[i] || 'Sin respuesta'}`).join('\n\n')}

Actuá como un mentor que combina psicología, estrategia y visión de propósito. Mostrame lo que no estoy viendo todavía y cómo puedo integrar mis metas sin forzarme.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const canAdvance = answers[currentTerritory]?.trim().length > 10;
  const completedTerritories = Object.values(answers).filter(a => a && a.trim().length > 0).length;
  const currentTerritoryData = territories[currentTerritory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Fondo animado sutil */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Pantalla de introducción */}
        {!journeyStarted && (
          <div className="min-h-screen flex items-center justify-center animate-fade-in">
            <div className="text-center space-y-8 max-w-3xl">
              <div className="text-8xl mb-6 animate-float">🧭</div>
              <h1 className="text-6xl font-bold text-gray-900 mb-4">
                El Camino hacia tu Norte
              </h1>
              <p className="text-2xl text-gray-700 leading-relaxed">
                Un viaje de 6 territorios para descubrir la naturaleza profunda de tus metas
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl space-y-4">
                <p className="text-lg text-gray-700">
                  Este no es un formulario. Es una experiencia.
                </p>
                <p className="text-gray-600">
                  Atravesarás valles, santuarios y templos donde cada respuesta desbloqueará 
                  comprensión sobre quién eres y hacia dónde vas.
                </p>
                <div className="flex items-center justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏱️</span>
                    <span className="text-sm text-gray-600">~20 minutos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span className="text-sm text-gray-600">6 territorios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💎</span>
                    <span className="text-sm text-gray-600">Logros desbloqueables</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setJourneyStarted(true);
                  setCurrentTerritory(0);
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                         text-white text-xl font-bold py-6 px-12 rounded-2xl shadow-2xl 
                         transform hover:scale-105 transition-all duration-300 animate-pulse-slow"
              >
                🚀 Comenzar el Viaje
              </button>

              <p className="text-sm text-gray-500 italic">
                "No se trata de encontrar respuestas perfectas. Se trata de hacer las preguntas correctas."
              </p>
            </div>
          </div>
        )}

        {/* Juego principal */}
        {journeyStarted && !showResult && currentTerritory >= 0 && (
          <div className={`space-y-8 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {/* Header con progreso */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl animate-pulse-slow">{currentTerritoryData.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {currentTerritoryData.name}
                    </h2>
                    <p className="text-sm text-gray-600">{currentTerritoryData.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Territorio</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {currentTerritory + 1} / {territories.length}
                  </p>
                </div>
              </div>

              {/* Barra de progreso del viaje */}
              <div className="relative">
                <div className="flex justify-between mb-2">
                  {territories.map((t, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl
                        transition-all duration-500 ${
                          i < currentTerritory ? 'bg-green-500 scale-110' :
                          i === currentTerritory ? 'bg-indigo-600 scale-125 animate-pulse' :
                          'bg-gray-300'
                        }`}>
                        {i < currentTerritory ? '✓' : t.icon}
                      </div>
                      <span className="text-xs text-gray-600 mt-1">{t.name.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${((currentTerritory + 1) / territories.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Descripción del territorio */}
            <div className={`bg-gradient-to-br ${currentTerritoryData.bgGradient} p-8 rounded-2xl border-2 border-white/50 shadow-xl`}>
              <p className="text-lg text-gray-800 leading-relaxed italic">
                "{currentTerritoryData.description}"
              </p>
            </div>

            {/* Pregunta principal */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {currentTerritoryData.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {currentTerritoryData.helper}
              </p>

              <textarea
                value={answers[currentTerritory] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder={currentTerritoryData.placeholder}
                className="w-full min-h-[200px] p-6 border-2 border-gray-200 rounded-xl 
                         focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 
                         resize-y text-lg transition-all"
              />

              {/* Barra de energía de respuesta */}
              {answers[currentTerritory] && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profundidad de tu respuesta</span>
                    <span className="text-sm font-bold text-indigo-600">{Math.floor(energyLevel)}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        energyLevel > 70 ? 'bg-green-500' :
                        energyLevel > 40 ? 'bg-yellow-500' :
                        'bg-red-400'
                      }`}
                      style={{ width: `${energyLevel}%` }}
                    ></div>
                  </div>
                  {energyLevel > 70 && (
                    <p className="text-sm text-green-600 font-semibold animate-fade-in">
                      ✨ Respuesta profunda y poderosa
                    </p>
                  )}
                </div>
              )}

              {/* Desafío opcional */}
              {!completedChallenges.includes(currentTerritory) && (
                <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🎯</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 mb-2">Desafío Opcional:</p>
                      <p className="text-gray-700 mb-3">{currentTerritoryData.challenge.prompt}</p>
                      <button
                        onClick={() => handleCompleteChallenge(currentTerritory)}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
                      >
                        ✓ Reflexioné sobre esto
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {completedChallenges.includes(currentTerritory) && (
                <div className="bg-green-50 border-2 border-green-300 p-5 rounded-xl animate-fade-in">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <p className="font-bold text-green-900">{currentTerritoryData.challenge.reward}</p>
                      <p className="text-sm text-green-700">Completaste el desafío de este territorio</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navegación */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentTerritory === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  currentTerritory === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-800 shadow-md hover:shadow-lg'
                }`}
              >
                ← Territorio Anterior
              </button>

              <div className="flex items-center gap-2">
                {unlockedEmblems.map((emblemIndex) => (
                  <div key={emblemIndex} className="text-3xl animate-bounce-in">
                    {territories[emblemIndex].emblem}
                  </div>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!canAdvance}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  canAdvance
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentTerritory === territories.length - 1 ? 'Completar Viaje' : 'Siguiente Territorio'} →
              </button>
            </div>
          </div>
        )}

        {/* Feedback contextual */}
        {showFeedback && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-indigo-300 max-w-md">
              <p className="text-2xl text-center font-semibold text-gray-900">
                {currentFeedback}
              </p>
            </div>
          </div>
        )}

        {/* Animación de emblema desbloqueado */}
        {showEmblemAnimation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white p-12 rounded-3xl shadow-2xl text-center animate-scale-in">
              <div className="text-9xl mb-6 animate-bounce-celebration">
                {currentTerritoryData.emblem}
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">¡Emblema Desbloqueado!</p>
              <p className="text-xl text-indigo-600 font-semibold">
                {currentTerritoryData.emblemName}
              </p>
            </div>
          </div>
        )}

        {/* Mapa final */}
        {showResult && (
          <div className="space-y-8 animate-fade-in">
            {/* Celebración inicial */}
            <div className="text-center py-12">
              <div className="text-9xl mb-6 animate-float">🗺️</div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Tu Mapa del Norte Personal
              </h2>
              <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                Has completado el viaje. Este es el mapa de tu claridad.
              </p>
            </div>

            {/* Emblemas ganados */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-2xl border-2 border-yellow-300 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-4xl">🏆</span>
                Emblemas Conquistados
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {territories.map((t, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border-2 border-yellow-200 text-center">
                    <div className="text-5xl mb-3">{t.emblem}</div>
                    <p className="font-bold text-gray-900">{t.emblemName}</p>
                    <p className="text-xs text-gray-600">{t.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa visual de respuestas */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                📜 Tu Carta de Navegación
              </h3>
              <div className="space-y-6">
                {territories.map((t, i) => (
                  answers[i] && (
                    <div key={i} className={`bg-gradient-to-br ${t.bgGradient} p-6 rounded-xl border-2 border-white/50 shadow-md animate-slide-in`}
                         style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{t.icon}</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-lg mb-2">{t.name}</p>
                          <p className="text-sm text-gray-600 mb-3 italic">"{t.subtitle}"</p>
                          <div className="bg-white/70 p-4 rounded-lg">
                            <p className="text-gray-800 leading-relaxed">{answers[i]}</p>
                          </div>
                        </div>
                        <div className="text-3xl">{t.emblem}</div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Sabiduría final */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 rounded-2xl text-white text-center shadow-2xl">
              <p className="text-3xl font-bold mb-4">🌟</p>
              <p className="text-2xl mb-4">
                "No viniste aquí a encontrar todas las respuestas."
              </p>
              <p className="text-xl">
                Viniste a descubrir cuáles son las preguntas correctas.
              </p>
            </div>

            {/* Prompt de regalo */}
            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-amber-400 flex items-center gap-3">
                <span className="text-4xl">🎁</span>
                Tu Regalo: Mentor Digital Personalizado
              </h3>
              <p className="text-gray-300 mb-6">
                Copiá este prompt y usalo con tu IA favorita para profundizar tu visión:
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                  {`🎯 Quiero entender cómo alinear mis metas con mi identidad profunda.

Estas son mis respuestas del Camino hacia mi Norte:

${territories.map((t, i) => `${t.icon} ${t.name}: ${t.title}
→ ${answers[i] || 'Sin respuesta'}`).join('\n\n')}

Actuá como un mentor que combina psicología, estrategia y visión de propósito. Mostrame lo que no estoy viendo todavía y cómo puedo integrar mis metas sin forzarme.`}
                </p>
              </div>
              <button
                onClick={copyPrompt}
                className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {copiedPrompt ? (
                  <>
                    <span className="text-2xl">✓</span>
                    <span className="text-xl">¡Copiado! Listo para usar</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">📋</span>
                    <span className="text-xl">Copiar Mi Prompt Personalizado</span>
                  </>
                )}
              </button>
            </div>

            {/* Bonus secreto */}
            {!showBonusSecret ? (
              <div className="text-center">
                <button
                  onClick={() => setShowBonusSecret(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                           text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl 
                           transform hover:scale-110 transition-all animate-pulse-slow"
                >
                  💎 Bonus Oculto: Tocá para revelar tu carta
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-10 rounded-2xl border-4 border-pink-300 shadow-2xl animate-scale-in">
                <div className="text-center space-y-6">
                  <div className="text-8xl mb-6">🔮</div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">
                    Tu Carta del Universo
                  </h3>
                  <div className="bg-white/70 p-8 rounded-xl max-w-2xl mx-auto">
                    <p className="text-2xl text-gray-800 leading-relaxed mb-6">
                      "El camino que buscás ya existe dentro de vos. 
                      No lo fuerces. No lo apures. 
                      Solo caminalo con la certeza de quien sabe que cada paso cuenta."
                    </p>
                    <p className="text-lg text-gray-700 italic">
                      Tu siguiente paso aparecerá cuando estés listo para verlo.
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    ✨ Guardá esta carta. Volvé a ella cuando necesites recordar tu claridad.
                  </p>
                </div>
              </div>
            )}

            {/* Botón de nuevo viaje */}
            <div className="text-center pt-8">
              <button
                onClick={() => {
                  setJourneyStarted(false);
                  setCurrentTerritory(-1);
                  setAnswers({});
                  setShowResult(false);
                  setUnlockedEmblems([]);
                  setCompletedChallenges([]);
                  setShowBonusSecret(false);
                }}
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl transition-all"
              >
                🔄 Comenzar Nuevo Viaje
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Estilos CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(-20px, -20px) scale(1.05); }
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
        
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-bounce-celebration { animation: bounce-celebration 1s ease-in-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />
    </div>
  );
};

export const naturalezaMetaMetadata = {
  id: 3,
  title: "El Camino hacia tu Norte",
  type: "document" as const,
  duration: "20-25 min"
};