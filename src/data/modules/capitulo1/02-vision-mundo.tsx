import React, { useState, useEffect } from 'react';

export const VisionMundoContent = () => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showInsight, setShowInsight] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [consciousnessLevel, setConsciousnessLevel] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const [depthScore, setDepthScore] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);

  const areas = [
    { 
      id: 'negocio', 
      label: '💼 Mi negocio o carrera', 
      icon: '💼',
      dimension: 'La Dimensión Profesional',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'cuerpo', 
      label: '💪 Mi salud y energía', 
      icon: '💪',
      dimension: 'La Dimensión Física',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'relaciones', 
      label: '❤️ Mis relaciones', 
      icon: '❤️',
      dimension: 'La Dimensión Relacional',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'proposito', 
      label: '🎯 Mi propósito', 
      icon: '🎯',
      dimension: 'La Dimensión Existencial',
      color: 'from-purple-500 to-violet-600'
    },
    { 
      id: 'dinero', 
      label: '💰 Mis finanzas', 
      icon: '💰',
      dimension: 'La Dimensión Económica',
      color: 'from-amber-500 to-orange-600'
    },
    { 
      id: 'otra', 
      label: '✨ Otra área', 
      icon: '✨',
      dimension: 'Tu Dimensión Personal',
      color: 'from-cyan-500 to-teal-600'
    }
  ];

  const questions = [
    {
      q: "¿Cómo describirías dónde estás hoy en esa área?",
      helper: "Sin juzgarte. Solo describí: ¿te sentís avanzando, estancado, o como si retrocedieras?",
      placeholder: "Ejemplo: Siento que estoy en pausa hace meses, como si algo me frenara...",
      mission: "MISIÓN 1: Mapear tu ubicación actual",
      emoji: "📍",
      insight: "Has trazado tu punto de partida"
    },
    {
      q: "¿Qué decisiones o hábitos te llevaron acá?",
      helper: "No se trata de buscar culpables. Solo observá: ¿qué acciones o no-acciones te trajeron hasta este punto?",
      placeholder: "Ejemplo: Dejé de priorizar esta área, elegí otras cosas, me distraje con lo urgente...",
      mission: "MISIÓN 2: Rastrear tu camino",
      emoji: "🔍",
      insight: "Has identificado los patrones que te trajeron aquí"
    },
    {
      q: "¿Desde qué emoción o estado tomaste esas decisiones?",
      helper: "¿Fue miedo, cansancio, comodidad, o simplemente falta de claridad?",
      placeholder: "Ejemplo: Desde el cansancio, desde el miedo a fallar, desde la zona conocida...",
      mission: "MISIÓN 3: Descubrir el combustible emocional",
      emoji: "🎭",
      insight: "Has revelado la emoción detrás de tus acciones"
    },
    {
      q: "¿Qué opciones creías tener en ese momento?",
      helper: "¿Te sentías con muchas alternativas o como si solo tuvieras un camino?",
      placeholder: "Ejemplo: Sentía que solo podía elegir entre A o B, no vi otras salidas...",
      mission: "MISIÓN 4: Explorar tu mapa mental",
      emoji: "🗺️",
      insight: "Has cartografiado tus límites percibidos"
    },
    {
      q: "¿Qué sentís cuando repasás todo esto?",
      helper: "Sin dramatizar ni minimizar. ¿Qué emoción aparece?",
      placeholder: "Ejemplo: Siento frustración, un poco de enojo conmigo, pero también curiosidad...",
      mission: "MISIÓN 5: Conectar con tu verdad emocional",
      emoji: "💫",
      insight: "Has honrado tu experiencia emocional"
    },
    {
      q: "¿Qué historia te estás contando sobre esto?",
      helper: "A veces tenemos una creencia silenciosa: 'No soy capaz', 'Es tarde', 'No merezco más'. ¿Hay algo así que te resuene?",
      placeholder: "Ejemplo: Me digo que ya es tarde, que otros lo logran pero yo no, que quizás no sea para mí...",
      mission: "MISIÓN FINAL: Desenmascarar la creencia raíz",
      emoji: "🎯",
      insight: "Has encontrado la historia que guía tu realidad"
    }
  ];

  const achievementsList = [
    { id: 'first_area', name: 'Explorador Dimensional', icon: '🌟', desc: 'Elegiste tu primera dimensión' },
    { id: 'depth_master', name: 'Maestro de Profundidad', icon: '🔮', desc: 'Respuestas profundas y honestas' },
    { id: 'truth_seeker', name: 'Buscador de Verdad', icon: '💎', desc: 'Completaste todas las misiones' },
    { id: 'paradigm_breaker', name: 'Rompe-Paradigmas', icon: '⚡', desc: 'Identificaste tu creencia limitante' },
    { id: 'consciousness_rise', name: 'Elevación Consciente', icon: '🦋', desc: 'Alcanzaste nivel de conciencia máximo' }
  ];

  useEffect(() => {
    if (selectedArea && !achievements.includes('first_area')) {
      unlockAchievement('first_area');
    }
  }, [selectedArea]);

  useEffect(() => {
    const totalWords = Object.values(answers).join(' ').split(' ').length;
    const avgWordsPerAnswer = totalWords / Object.keys(answers).length;
    
    if (avgWordsPerAnswer > 20 && !achievements.includes('depth_master')) {
      unlockAchievement('depth_master');
    }

    setDepthScore(Math.min(100, Math.floor(avgWordsPerAnswer * 3)));
  }, [answers]);

  useEffect(() => {
    if (Object.keys(answers).length === questions.length && !achievements.includes('truth_seeker')) {
      unlockAchievement('truth_seeker');
    }
  }, [answers]);

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievementsList.find(a => a.id === achievementId);
    if (achievement && !achievements.includes(achievementId)) {
      setAchievements([...achievements, achievementId]);
      setShowAchievement(achievementId);
      setConsciousnessLevel(prev => Math.min(100, prev + 20));
      
      // Efecto de sonido simulado con vibración en móvil
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
      
      setTimeout(() => setShowAchievement(null), 3000);
    }
  };

  const handleAreaSelect = (areaId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedArea(areaId);
      setAnswers({});
      setShowInsight(false);
      setCurrentQuestion(0);
      setIsTransitioning(false);
    }, 300);
  };

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleNextQuestion = () => {
    setIsTransitioning(true);
    setConsciousnessLevel(prev => Math.min(100, prev + 10));
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        if (!achievements.includes('paradigm_breaker')) {
          unlockAchievement('paradigm_breaker');
        }
        if (!achievements.includes('consciousness_rise')) {
          unlockAchievement('consciousness_rise');
        }
        setCelebrationMode(true);
        setTimeout(() => {
          setShowInsight(true);
          setCelebrationMode(false);
        }, 2000);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handlePreviousQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const canAdvance = answers[currentQuestion]?.trim().length > 5;
  const completedQuestions = Object.values(answers).filter(a => a && a.trim().length > 0).length;
  const selectedAreaData = areas.find(a => a.id === selectedArea);

  const copyPrompt = () => {
    const prompt = `🎯 Actuá como un mentor con experiencia en transformación personal y autoconocimiento.

Ya hice un ejercicio de reflexión sobre mi situación actual. Me gustaría que:

1. Me ayudes a ver esta situación desde otra perspectiva, una que me empodere en lugar de limitarme.
2. Me propongas creencias o enfoques alternativos que estén alineados con donde quiero estar.
3. Me hagas preguntas que quizás no me hice, para descubrir puntos ciegos o nuevas opciones.
4. Me muestres cómo podría aplicar este enfoque en otras áreas de mi vida: trabajo, relaciones, salud, propósito.
5. Me des una visión realista pero inspiradora de qué podría pasar si mantengo este nuevo enfoque durante los próximos 90 días.

Hablame con claridad y profundidad, pero sin solemnidad. Como hablaría un amigo que sabe del tema.

Mi área de trabajo es: ${selectedAreaData?.label || selectedArea}

Mis respuestas:
${questions.map((q, i) => `${q.q}\n→ ${answers[i] || 'Sin respuesta'}`).join('\n\n')}`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Achievement Popup */}
      {showAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-bounce-in">
          <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white p-6 rounded-2xl shadow-2xl border-4 border-yellow-300 max-w-sm">
            <div className="flex items-center gap-4">
              <span className="text-5xl animate-spin-slow">
                {achievementsList.find(a => a.id === showAchievement)?.icon}
              </span>
              <div>
                <p className="font-bold text-lg">¡Logro Desbloqueado!</p>
                <p className="text-sm">{achievementsList.find(a => a.id === showAchievement)?.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consciousness Level Bar - Fixed Top */}
      {selectedArea && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm shadow-md p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <span className="text-sm font-bold text-gray-700">Nivel de Conciencia</span>
              </div>
              <span className="text-lg font-bold text-indigo-600">{consciousnessLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="h-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${consciousnessLevel}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="text-center py-6 mt-16">
        <div className="inline-block animate-float mb-4">
          <span className="text-7xl">🎮</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
          El Juego de la Percepción
        </h1>
        <p className="text-2xl text-blue-600 font-medium animate-fade-in-delay">
          ¿Y si el problema no es la realidad, sino tu forma de mirarla?
        </p>
      </div>

      {/* Hook potente */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-lg animate-slide-up shadow-lg hover:shadow-xl transition-shadow">
        <p className="text-xl text-gray-800 leading-relaxed mb-4">
          Pensá en esto por un segundo:
        </p>
        <p className="text-xl text-gray-800 leading-relaxed mb-4">
          Dos personas pueden vivir la <strong className="text-blue-700">misma situación</strong> y salir con 
          conclusiones completamente distintas. ¿Por qué?
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-3">
          No porque la situación sea diferente. Sino porque la <strong className="text-blue-700">interpretaron</strong> diferente.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Y acá está lo interesante: esa interpretación no es neutra. Es la que decide qué hacés después, 
          cómo te sentís, y hasta qué creés que es posible para vos.
        </p>
      </div>

      {/* Idea central visual */}
      <div className="bg-gray-900 text-white p-8 rounded-xl text-center shadow-2xl animate-slide-up-delay">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2 transform hover:scale-105 transition-transform">
            <div className="text-4xl animate-pulse-slow">🔒</div>
            <p className="text-gray-300">Cuando ves algo como imposible</p>
            <p className="text-red-400 font-bold">No lo intentás</p>
          </div>
          
          <div className="text-4xl animate-bounce-subtle">→</div>
          
          <div className="space-y-2 transform hover:scale-105 transition-transform">
            <div className="text-4xl animate-pulse-slow animation-delay-500">🚀</div>
            <p className="text-gray-300">Cuando lo ves como posible</p>
            <p className="text-green-400 font-bold">Te ponés en movimiento</p>
          </div>
        </div>
        
        <p className="text-gray-300 mt-6 text-lg">
          No es solo optimismo. Es que literalmente <strong className="text-white">ves opciones diferentes.</strong>
        </p>
      </div>

      {/* Historia de Bezos */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200 animate-slide-up shadow-lg hover:shadow-xl transition-all">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl animate-bounce-subtle">📦</span>
          Un ejemplo: la diferencia no estuvo en lo que era real
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Cuando Bezos arrancó Amazon, muchos pensaban: "Es una librería online. Hay mil librerías ya. 
          ¿Por qué esta sería distinta?"
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg border-2 border-gray-200 transform hover:scale-105 transition-transform">
            <p className="text-sm font-bold text-gray-500 mb-3">LO QUE MUCHOS VEÍAN:</p>
            <div className="space-y-2">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>"Una tienda online más"</span>
              </p>
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>"Competir con librerías establecidas"</span>
              </p>
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>"Un riesgo grande"</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg border-2 border-green-300 transform hover:scale-105 transition-transform">
            <p className="text-sm font-bold text-green-700 mb-3">LO QUE BEZOS VIO:</p>
            <div className="space-y-2">
              <p className="text-gray-800 flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>"Internet permite llegar a cualquier persona del mundo"</span>
              </p>
              <p className="text-gray-800 flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>"Si empiezo con libros, después puedo vender lo que sea"</span>
              </p>
              <p className="text-gray-800 flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>"Esto no es una librería. Es una nueva forma de comercio"</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-100 border-l-4 border-amber-500 p-5 rounded-lg">
          <p className="text-gray-800 leading-relaxed">
            <strong className="text-amber-900">La realidad era la misma.</strong> Internet, libros, librerías competidoras... 
            todo eso existía para todos. La diferencia estuvo en <strong className="text-amber-900">lo que decidió ver como posible.</strong>
          </p>
        </div>
      </div>

      {/* Sección de selección de área o juego */}
      {!selectedArea ? (
        <div className={`bg-white p-8 rounded-xl border-2 border-blue-200 shadow-md transition-all ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-float">🗺️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Elegí tu Dimensión de Exploración
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Cada dimensión de tu vida tiene su propia historia. ¿Cuál querés explorar hoy?
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area, index) => (
              <button
                key={area.id}
                onClick={() => handleAreaSelect(area.id)}
                className={`bg-gradient-to-br ${area.color} hover:scale-105 active:scale-95
                         border-2 border-white p-6 rounded-xl transition-all duration-300
                         flex flex-col items-center gap-3 text-center group shadow-lg hover:shadow-2xl
                         animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-5xl group-hover:scale-125 transition-transform duration-300 animate-bounce-subtle">
                  {area.icon}
                </span>
                <span className="text-lg font-bold text-white drop-shadow-md">
                  {area.label.replace(area.icon, '').trim()}
                </span>
                <span className="text-sm text-white/80 font-medium">{area.dimension}</span>
              </button>
            ))}
          </div>
        </div>
      ) : !showInsight ? (
        <div className={`bg-white p-8 rounded-xl border-2 border-blue-200 shadow-md transition-all ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Header con área seleccionada */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-pulse-slow">{selectedAreaData?.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedAreaData?.dimension}
                </h3>
                <p className="text-sm text-gray-600">Tu viaje de autoconocimiento</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedArea('')}
              className="text-gray-500 hover:text-gray-700 text-sm underline transition-colors"
            >
              ← Cambiar dimensión
            </button>
          </div>

          {/* Progreso de misiones */}
          <div className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border-2 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{questions[currentQuestion].emoji}</span>
                <span className="text-purple-700 font-bold">{questions[currentQuestion].mission}</span>
              </div>
              <span className="text-sm text-purple-600 font-semibold">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Pregunta actual */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-3xl">{questions[currentQuestion].emoji}</span>
                {questions[currentQuestion].q}
              </h3>
              <p className="text-gray-600 mb-4 pl-11">
                {questions[currentQuestion].helper}
              </p>
              <textarea
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                placeholder={questions[currentQuestion].placeholder}
                className="w-full min-h-[180px] p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-y transition-all text-lg"
              />
              
              {/* Depth indicator */}
              {answers[currentQuestion] && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-gray-600">Profundidad:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        answers[currentQuestion].length > 100 ? 'bg-green-500' :
                        answers[currentQuestion].length > 50 ? 'bg-yellow-500' :
                        'bg-red-400'
                      }`}
                      style={{ width: `${Math.min(100, (answers[currentQuestion].length / 150) * 100)}%` }}
                    ></div>
                  </div>
                  {answers[currentQuestion].length > 100 && (
                    <span className="text-sm text-green-600 font-semibold">¡Excelente! 💫</span>
                  )}
                </div>
              )}
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  currentQuestion === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <span>←</span>
                <span>Anterior</span>
              </button>
              
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Misiones completadas</div>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        answers[i] ? 'bg-green-500 scale-110' : 
                        i === currentQuestion ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={!canAdvance}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  canAdvance
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{currentQuestion === questions.length - 1 ? 'Completar' : 'Siguiente'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Celebration Mode */}
          {celebrationMode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
              <div className="text-center animate-scale-in">
                <div className="text-9xl mb-4 animate-spin-celebration">🎯</div>
                <h2 className="text-5xl font-bold text-white mb-4 animate-pulse">
                  ¡Misiones Completadas!
                </h2>
                <p className="text-2xl text-white/90">
                  Desbloqueando tu Mapa de Visión Personal...
                </p>
              </div>
            </div>
          )}

          {/* Mapa de Visión Personal */}
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-8 rounded-xl border-2 border-purple-300 shadow-2xl animate-scale-in">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4 animate-float">🗺️</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tu Mapa de Visión Personal
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Has completado el viaje de autoconocimiento. Este es el mapa que creaste de tu propia realidad.
              </p>
            </div>

            {/* Achievement Dashboard */}
            <div className="bg-white p-6 rounded-xl mb-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">🏆</span>
                Logros Desbloqueados
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map(achId => {
                  const ach = achievementsList.find(a => a.id === achId);
                  return ach ? (
                    <div key={achId} className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg border-2 border-yellow-300 animate-bounce-in">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{ach.icon}</span>
                        <div>
                          <p className="font-bold text-gray-900">{ach.name}</p>
                          <p className="text-sm text-gray-600">{ach.desc}</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Respuestas en formato mapa */}
            <div className="bg-white p-6 rounded-xl mb-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">📝</span>
                Tu Viaje Cartografiado
              </h3>
              <div className="space-y-6">
                {questions.map((q, i) => (
                  answers[i] && (
                    <div key={i} className="relative pl-12 pb-6 border-l-4 border-indigo-300 last:border-l-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="absolute left-[-1.5rem] top-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                        {q.emoji}
                      </div>
                      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-5 rounded-lg border-2 border-indigo-200">
                        <p className="font-bold text-gray-900 mb-2 text-lg">{q.mission}</p>
                        <p className="text-sm text-gray-600 mb-3 italic">"{q.insight}"</p>
                        <p className="text-gray-800 leading-relaxed">{answers[i]}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Wisdom Section */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-400 p-8 rounded-xl mb-8 shadow-lg animate-pulse-slow">
              <div className="flex items-start gap-4">
                <span className="text-6xl">💡</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Epifanía del Nivel Final</h3>
                  <div className="space-y-3 text-gray-800 text-lg leading-relaxed">
                    <p>
                      Lo que acabás de hacer no es solo un ejercicio. Es una habilidad que podés usar toda la vida.
                    </p>
                    <p>
                      <strong>Cada vez que te sientas estancado,</strong> volvé a estas preguntas. 
                      No para encontrar "la verdad absoluta", sino para <strong>ver qué otras interpretaciones son posibles.</strong>
                    </p>
                    <p className="text-amber-900 font-semibold">
                      Porque cuando cambiás la pregunta, cambiás las respuestas que aparecen. 
                      Y cuando cambiás las respuestas que ves... cambiás las acciones que tomás.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tesoro Desbloqueado - Prompt */}
            <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-8 rounded-xl shadow-2xl border-4 border-yellow-300 animate-scale-in">
              <div className="text-center mb-6">
                <div className="text-7xl mb-4 animate-bounce-subtle">🎁</div>
                <h3 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
                  ¡Tesoro Desbloqueado!
                </h3>
                <p className="text-xl text-white/90">
                  Tu regalo final: Prompt de Expansión de Conciencia
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-lg mb-6 border-2 border-white/30">
                <p className="text-white text-lg leading-relaxed mb-4">
                  Este prompt personalizado te llevará más lejos. Copialo, pegalo en tu IA favorita, 
                  y prepárate para descubrir perspectivas que aún no imaginaste.
                </p>
                <p className="text-white/90 text-sm">
                  💎 <strong>Bonus:</strong> Este prompt ya incluye todas tus respuestas del viaje.
                </p>
              </div>

              <button
                onClick={copyPrompt}
                className="w-full bg-white hover:bg-gray-50 text-amber-600 font-bold py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
              >
                {copiedPrompt ? (
                  <>
                    <span className="text-3xl">✓</span>
                    <span className="text-xl">¡Tesoro Copiado! Listo para usar</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">📋</span>
                    <span className="text-xl">Copiar Mi Tesoro de Sabiduría</span>
                  </>
                )}
              </button>

              <div className="mt-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 p-5 rounded-lg">
                <p className="text-white text-sm flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <span>
                    <strong className="text-yellow-200">Pro Tip:</strong> Una vez copiado, pegalo en ChatGPT, Claude o tu mentor digital favorito. 
                    La IA usará tus respuestas para darte una guía ultra-personalizada de transformación. 
                    Es como tener un coach personal disponible 24/7.
                  </span>
                </p>
              </div>
            </div>

            {/* Botón para nueva exploración */}
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setSelectedArea('');
                  setAnswers({});
                  setShowInsight(false);
                  setCurrentQuestion(0);
                  setConsciousnessLevel(0);
                }}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <span className="text-2xl">🗺️</span>
                <span>Explorar Otra Dimensión</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Sección final de enseñanza (solo si no está en el juego) */}
      {!selectedArea && (
        <>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border-2 border-purple-200 shadow-lg animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
              <span className="text-4xl animate-pulse-slow">✨</span>
              ¿Qué vas a descubrir en este juego?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-400 hover:shadow-xl transition-shadow">
                <p className="text-lg text-gray-800 font-medium mb-2 flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  Tu punto de partida real
                </p>
                <p className="text-gray-700">
                  Sin filtros ni autoengaño. Solo claridad sobre dónde estás parado ahora mismo.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-400 hover:shadow-xl transition-shadow">
                <p className="text-lg text-gray-800 font-medium mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Los patrones ocultos
                </p>
                <p className="text-gray-700">
                  Las decisiones y creencias que te trajeron hasta acá, operando en piloto automático.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-pink-400 hover:shadow-xl transition-shadow">
                <p className="text-lg text-gray-800 font-medium mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎭</span>
                  Tus emociones reales
                </p>
                <p className="text-gray-700">
                  No las que "deberías" sentir. Las que genuinamente están guiando tus acciones.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-amber-400 hover:shadow-xl transition-shadow">
                <p className="text-lg text-gray-800 font-medium mb-2 flex items-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  Nuevas opciones
                </p>
                <p className="text-gray-700">
                  Caminos que antes no veías porque tu forma de mirar te los ocultaba.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-10 rounded-xl text-center shadow-2xl animate-slide-up-delay">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
              <span className="text-5xl animate-float">🎯</span>
              Tu Próxima Jugada
            </h2>
            <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
              <p>
                No se trata de "despertar" ni de que todo cambie de golpe.
              </p>
              <p>
                Se trata de algo más simple y más poderoso: <strong>darte cuenta de que tenés más opciones de las que creés.</strong>
              </p>
              <p className="text-2xl font-bold text-yellow-300">
                Porque cuando ves lo que antes no veías... hacés lo que antes no hacías.
              </p>
            </div>
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0) translateY(-50px); opacity: 0; }
          60% { transform: scale(1.1) translateY(0); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-delay {
          0%, 30% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-up-delay {
          0%, 20% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes spin-celebration {
          from { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          to { transform: rotate(360deg) scale(1); }
        }
        
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-fade-in-delay { animation: fade-in-delay 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-slide-up-delay { animation: slide-up-delay 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-spin-celebration { animation: spin-celebration 2s ease-in-out; }
        .animation-delay-500 { animation-delay: 500ms; }
      `}} />
    </div>
  );
};

export const visionMundoMetadata = {
  id: 2,
  title: "El Juego de la Percepción",
  type: "document" as const,
  duration: "20 min"
};