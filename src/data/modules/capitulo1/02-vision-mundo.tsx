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
    <div className="space-y-8 pb-12 selectable">
      {/* Achievement Popup */}
      {showAchievement && (
        <div className="fixed top-20 right-4 z-50 animate-scaleIn">
          <div className="glass-strong p-6 rounded-2xl shadow-2xl glow-purple-strong border-2 border-purple-400/50 max-w-sm">
            <div className="flex items-center gap-4">
              <span className="text-5xl animate-spin-slow">
                {achievementsList.find(a => a.id === showAchievement)?.icon}
              </span>
              <div>
                <p className="font-bold text-lg text-gradient">¡Logro Desbloqueado!</p>
                <p className="text-sm text-gray-300">{achievementsList.find(a => a.id === showAchievement)?.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consciousness Level Bar - Fixed Top */}
      {selectedArea && (
        <div className="fixed top-0 left-0 right-0 z-40 glass backdrop-blur-2xl border-b border-white/10 p-4 safe-top">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <span className="text-sm font-bold text-gray-200">Nivel de Conciencia</span>
              </div>
              <span className="text-lg font-bold text-gradient">{consciousnessLevel}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden border border-white/10">
              <div 
                className="h-4 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative glow-purple"
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
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 animate-fadeIn">
          El Juego de la Percepción
        </h1>
        <p className="text-2xl text-gradient font-bold animate-fadeIn">
          ¿Y si el problema no es la realidad, sino tu forma de mirarla?
        </p>
      </div>

      {/* Hook potente */}
      <div className="card-elevated-lg p-8 border-l-4 border-purple-500 animate-fadeInUp">
        <p className="text-xl text-gray-200 leading-relaxed mb-4">
          Pensá en esto por un segundo:
        </p>
        <p className="text-xl text-gray-200 leading-relaxed mb-4">
          Dos personas pueden vivir la <strong className="text-gradient">misma situación</strong> y salir con 
          conclusiones completamente distintas. ¿Por qué?
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-3">
          No porque la situación sea diferente. Sino porque la <strong className="text-purple-400">interpretaron</strong> diferente.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          Y acá está lo interesante: esa interpretación no es neutra. Es la que decide qué hacés después, 
          cómo te sentís, y hasta qué creés que es posible para vos.
        </p>
      </div>

      {/* Idea central visual */}
      <div className="glass-strong p-8 rounded-2xl text-center shadow-2xl animate-fadeInUp glow-purple">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2 transform hover:scale-105 transition-transform">
            <div className="text-4xl animate-pulse-glow">🔒</div>
            <p className="text-gray-300">Cuando ves algo como imposible</p>
            <p className="text-red-400 font-bold">No lo intentás</p>
          </div>
          
          <div className="text-4xl text-purple-400 animate-pulse">→</div>
          
          <div className="space-y-2 transform hover:scale-105 transition-transform">
            <div className="text-4xl animate-pulse-glow">🚀</div>
            <p className="text-gray-300">Cuando lo ves como posible</p>
            <p className="text-gradient-green font-bold">Te ponés en movimiento</p>
          </div>
        </div>
        
        <p className="text-gray-300 mt-6 text-lg">
          No es solo optimismo. Es que literalmente <strong className="text-white">ves opciones diferentes.</strong>
        </p>
      </div>

      {/* Historia de Bezos */}
      <div className="card-elevated-lg p-8 border-l-4 border-amber-500 animate-fadeInUp">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <span className="text-4xl animate-bounce-soft">📦</span>
          <span className="text-gradient-amber">Un ejemplo: la diferencia no estuvo en lo que era real</span>
        </h2>
        
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Cuando Bezos arrancó Amazon, muchos pensaban: "Es una librería online. Hay mil librerías ya. 
          ¿Por qué esta sería distinta?"
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="glass p-5 rounded-xl transform hover:scale-105 transition-transform">
            <p className="text-sm font-bold text-gray-400 mb-3">LO QUE MUCHOS VEÍAN:</p>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-start gap-2">
                <span className="text-gray-500">•</span>
                <span>"Una tienda online más"</span>
              </p>
              <p className="text-gray-300 flex items-start gap-2">
                <span className="text-gray-500">•</span>
                <span>"Competir con librerías establecidas"</span>
              </p>
              <p className="text-gray-300 flex items-start gap-2">
                <span className="text-gray-500">•</span>
                <span>"Un riesgo grande"</span>
              </p>
            </div>
          </div>

          <div className="glass-strong p-5 rounded-xl border-2 border-green-500/30 transform hover:scale-105 transition-transform glow-green">
            <p className="text-sm font-bold text-gradient-green mb-3">LO QUE BEZOS VIO:</p>
            <div className="space-y-2">
              <p className="text-gray-200 flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>"Internet permite llegar a cualquier persona del mundo"</span>
              </p>
              <p className="text-gray-200 flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>"Si empiezo con libros, después puedo vender lo que sea"</span>
              </p>
              <p className="text-gray-200 flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>"Esto no es una librería. Es una nueva forma de comercio"</span>
              </p>
            </div>
          </div>
        </div>

        <div className="glass-strong border-l-4 border-amber-500 p-5 rounded-xl">
          <p className="text-gray-200 leading-relaxed">
            <strong className="text-amber-400">La realidad era la misma.</strong> Internet, libros, librerías competidoras... 
            todo eso existía para todos. La diferencia estuvo en <strong className="text-amber-400">lo que decidió ver como posible.</strong>
          </p>
        </div>
      </div>

      {/* Sección de selección de área o juego */}
      {!selectedArea ? (
        <div className={`card-elevated-lg p-8 transition-all ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-float">🗺️</div>
            <h2 className="text-3xl font-bold mb-4">
              Elegí tu Dimensión de Exploración
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Cada dimensión de tu vida tiene su propia historia. ¿Cuál querés explorar hoy?
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((area, index) => (
              <button
                key={area.id}
                onClick={() => handleAreaSelect(area.id)}
                className={`btn-base bg-gradient-to-br ${area.color} hover:scale-105 active:scale-95
                         border-2 border-white/10 p-6 rounded-2xl
                         flex flex-col items-center gap-3 text-center group shadow-2xl hover:shadow-3xl
                         animate-fadeIn glow-purple hover:glow-purple-strong`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-5xl group-hover:scale-125 transition-transform duration-300 animate-bounce-soft">
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
        <div className={`card-elevated-lg p-8 transition-all ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Header con área seleccionada */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-pulse-glow">{selectedAreaData?.icon}</span>
              <div>
                <h3 className="text-2xl font-bold">
                  {selectedAreaData?.dimension}
                </h3>
                <p className="text-sm text-gray-400">Tu viaje de autoconocimiento</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedArea('')}
              className="text-gray-400 hover:text-purple-400 text-sm underline transition-colors"
            >
              ← Cambiar dimensión
            </button>
          </div>

          {/* Progreso de misiones */}
          <div className="mb-6 glass-strong p-5 rounded-xl border-2 border-purple-500/30 glow-purple">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{questions[currentQuestion].emoji}</span>
                <span className="text-gradient font-bold">{questions[currentQuestion].mission}</span>
              </div>
              <span className="text-sm text-purple-400 font-semibold">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
              <div 
                className="h-3 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Pregunta actual */}
          <div className="space-y-6">
            <div className="glass-strong p-6 rounded-2xl border-2 border-purple-400/30">
              <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-3xl">{questions[currentQuestion].emoji}</span>
                <span className="text-gradient">{questions[currentQuestion].q}</span>
              </h3>
              <p className="text-gray-400 mb-4 pl-11">
                {questions[currentQuestion].helper}
              </p>
              <textarea
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                placeholder={questions[currentQuestion].placeholder}
                className="input-base min-h-[180px] resize-y text-lg"
              />
              
              {/* Depth indicator */}
              {answers[currentQuestion] && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-gray-400">Profundidad:</span>
                  <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        answers[currentQuestion].length > 100 ? 'bg-gradient-to-r from-green-500 to-emerald-600 glow-green' :
                        answers[currentQuestion].length > 50 ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
                        'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${Math.min(100, (answers[currentQuestion].length / 150) * 100)}%` }}
                    ></div>
                  </div>
                  {answers[currentQuestion].length > 100 && (
                    <span className="text-sm text-gradient-green font-semibold">¡Excelente! 💫</span>
                  )}
                </div>
              )}
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={`btn-base ${
                  currentQuestion === 0
                    ? 'opacity-40 cursor-not-allowed bg-white/5'
                    : 'btn-secondary'
                } flex items-center gap-2`}
              >
                <span>←</span>
                <span>Anterior</span>
              </button>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">Misiones completadas</div>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        answers[i] ? 'bg-green-500 scale-110 glow-green' : 
                        i === currentQuestion ? 'bg-purple-500 animate-pulse glow-purple' :
                        'bg-white/20'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={!canAdvance}
                className={`btn-base ${
                  canAdvance
                    ? 'btn-primary'
                    : 'opacity-40 cursor-not-allowed bg-white/5'
                } flex items-center gap-2`}
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
              <div className="text-center animate-scaleIn">
                <div className="text-9xl mb-4 animate-spin-slow">🎯</div>
                <h2 className="text-5xl font-bold text-gradient mb-4 animate-pulse-glow">
                  ¡Misiones Completadas!
                </h2>
                <p className="text-2xl text-gray-300">
                  Desbloqueando tu Mapa de Visión Personal...
                </p>
              </div>
            </div>
          )}

          {/* Mapa de Visión Personal */}
          <div className="card-elevated-lg p-8 border-2 border-purple-500/50 shadow-2xl animate-scaleIn glow-purple-strong">
            <div className="text-center mb-8">
              <div className="text-7xl mb-4 animate-float">🗺️</div>
              <h2 className="text-4xl font-bold mb-4 text-gradient">
                Tu Mapa de Visión Personal
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Has completado el viaje de autoconocimiento. Este es el mapa que creaste de tu propia realidad.
              </p>
            </div>

            {/* Achievement Dashboard */}
            <div className="glass-strong p-6 rounded-2xl mb-8 shadow-xl border border-purple-400/30">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🏆</span>
                <span className="text-gradient">Logros Desbloqueados</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map(achId => {
                  const ach = achievementsList.find(a => a.id === achId);
                  return ach ? (
                    <div key={achId} className="glass-strong p-4 rounded-xl border-2 border-amber-500/30 animate-scaleIn glow-green">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{ach.icon}</span>
                        <div>
                          <p className="font-bold text-gradient-amber">{ach.name}</p>
                          <p className="text-sm text-gray-400">{ach.desc}</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Respuestas en formato mapa */}
            <div className="glass-strong p-6 rounded-2xl mb-8 shadow-xl border border-purple-400/30">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">📝</span>
                <span className="text-gradient">Tu Viaje Cartografiado</span>
              </h3>
              <div className="space-y-6">
                {questions.map((q, i) => (
                  answers[i] && (
                    <div key={i} className="relative pl-12 pb-6 border-l-4 border-purple-500/50 last:border-l-0 animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="absolute left-[-1.5rem] top-0 w-12 h-12 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg glow-purple">
                        {q.emoji}
                      </div>
                      <div className="glass-strong p-5 rounded-xl border-2 border-purple-400/20">
                        <p className="font-bold text-gradient mb-2 text-lg">{q.mission}</p>
                        <p className="text-sm text-gray-400 mb-3 italic">"{q.insight}"</p>
                        <p className="text-gray-300 leading-relaxed selectable">{answers[i]}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Wisdom Section */}
            <div className="glass-strong border-4 border-amber-500/50 p-8 rounded-2xl mb-8 shadow-2xl animate-pulse-glow">
              <div className="flex items-start gap-4">
                <span className="text-6xl">💡</span>
                <div>
                  <h3 className="text-2xl font-bold text-gradient-amber mb-4">Epifanía del Nivel Final</h3>
                  <div className="space-y-3 text-gray-300 text-lg leading-relaxed">
                    <p>
                      Lo que acabás de hacer no es solo un ejercicio. Es una habilidad que podés usar toda la vida.
                    </p>
                    <p>
                      <strong className="text-amber-400">Cada vez que te sientas estancado,</strong> volvé a estas preguntas. 
                      No para encontrar "la verdad absoluta", sino para <strong className="text-amber-400">ver qué otras interpretaciones son posibles.</strong>
                    </p>
                    <p className="text-gradient-amber font-semibold">
                      Porque cuando cambiás la pregunta, cambiás las respuestas que aparecen. 
                      Y cuando cambiás las respuestas que ves... cambiás las acciones que tomás.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tesoro Desbloqueado - Prompt */}
            <div className="glass-strong border-4 border-amber-500 p-8 rounded-2xl shadow-2xl animate-scaleIn glow-green">
              <div className="text-center mb-6">
                <div className="text-7xl mb-4 animate-bounce-soft">🎁</div>
                <h3 className="text-3xl font-bold text-gradient-amber drop-shadow-lg mb-2">
                  ¡Tesoro Desbloqueado!
                </h3>
                <p className="text-xl text-gray-300">
                  Tu regalo final: Prompt de Expansión de Conciencia
                </p>
              </div>

              <div className="glass p-6 rounded-xl mb-6 border-2 border-amber-400/30">
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Este prompt personalizado te llevará más lejos. Copialo, pegalo en tu IA favorita, 
                  y prepárate para descubrir perspectivas que aún no imaginaste.
                </p>
                <p className="text-gray-400 text-sm">
                  💎 <strong className="text-amber-400">Bonus:</strong> Este prompt ya incluye todas tus respuestas del viaje.
                </p>
              </div>

              <button
                onClick={copyPrompt}
                className={`btn-base w-full font-bold py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-2xl ${
                  copiedPrompt 
                    ? 'btn-success' 
                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white glow-green'
                }`}
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

              <div className="mt-6 glass border-2 border-amber-400/30 p-5 rounded-xl">
                <p className="text-gray-300 text-sm flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <span>
                    <strong className="text-amber-400">Pro Tip:</strong> Una vez copiado, pegalo en ChatGPT, Claude o tu mentor digital favorito. 
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
                className="btn-primary py-4 px-8 rounded-2xl flex items-center gap-3 mx-auto"
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
          <div className="card-elevated-lg p-8 animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-3">
              <span className="text-4xl animate-pulse-glow">✨</span>
              <span className="text-gradient">¿Qué vas a descubrir en este juego?</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-strong p-5 rounded-xl border-l-4 border-blue-500 hover:scale-105 transition-transform">
                <p className="text-lg font-medium mb-2 flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <span className="text-gradient-blue">Tu punto de partida real</span>
                </p>
                <p className="text-gray-300">
                  Sin filtros ni autoengaño. Solo claridad sobre dónde estás parado ahora mismo.
                </p>
              </div>

              <div className="glass-strong p-5 rounded-xl border-l-4 border-purple-500 hover:scale-105 transition-transform">
                <p className="text-lg font-medium mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  <span className="text-gradient">Los patrones ocultos</span>
                </p>
                <p className="text-gray-300">
                  Las decisiones y creencias que te trajeron hasta acá, operando en piloto automático.
                </p>
              </div>

              <div className="glass-strong p-5 rounded-xl border-l-4 border-pink-500 hover:scale-105 transition-transform">
                <p className="text-lg font-medium mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎭</span>
                  <span className="text-gradient">Tus emociones reales</span>
                </p>
                <p className="text-gray-300">
                  No las que "deberías" sentir. Las que genuinamente están guiando tus acciones.
                </p>
              </div>

              <div className="glass-strong p-5 rounded-xl border-l-4 border-amber-500 hover:scale-105 transition-transform">
                <p className="text-lg font-medium mb-2 flex items-center gap-2">
                  <span className="text-2xl">🗺️</span>
                  <span className="text-gradient-amber">Nuevas opciones</span>
                </p>
                <p className="text-gray-300">
                  Caminos que antes no veías porque tu forma de mirar te los ocultaba.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-strong border-2 border-purple-500/50 p-10 rounded-2xl text-center shadow-2xl animate-fadeInUp glow-purple-strong">
            <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
              <span className="text-5xl animate-float">🎯</span>
              <span className="text-gradient">Tu Próxima Jugada</span>
            </h2>
            <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
              <p className="text-gray-300">
                No se trata de "despertar" ni de que todo cambie de golpe.
              </p>
              <p className="text-gray-300">
                Se trata de algo más simple y más poderoso: <strong className="text-white">darte cuenta de que tenés más opciones de las que creés.</strong>
              </p>
              <p className="text-2xl font-bold text-gradient-amber">
                Porque cuando ves lo que antes no veías... hacés lo que antes no hacías.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const visionMundoMetadata = {
  id: 2,
  title: "El Juego de la Percepción",
  type: "document" as const,
  duration: "20 min"
};