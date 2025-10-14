import React, { useState } from 'react';

export const VisionMundoContent = () => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showInsight, setShowInsight] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const areas = [
    { id: 'negocio', label: '💼 Mi negocio o carrera', icon: '💼' },
    { id: 'cuerpo', label: '💪 Mi salud y energía', icon: '💪' },
    { id: 'relaciones', label: '❤️ Mis relaciones', icon: '❤️' },
    { id: 'proposito', label: '🎯 Mi propósito', icon: '🎯' },
    { id: 'dinero', label: '💰 Mis finanzas', icon: '💰' },
    { id: 'otra', label: '✨ Otra área', icon: '✨' }
  ];

  const questions = [
    {
      q: "¿Dónde estás hoy en esa área?",
      helper: "Sé brutal y honesto. ¿Avanzando, estancado o retrocediendo?",
      placeholder: "Ejemplo: Estoy estancado hace 6 meses, siento que no avanzo..."
    },
    {
      q: "¿Qué hiciste o dejaste de hacer que te llevó ahí?",
      helper: "Sin excusas. Tu parte en esto.",
      placeholder: "Ejemplo: Dejé de priorizar mi salud, elegí comodidad sobre disciplina..."
    },
    {
      q: "¿Desde dónde tomaste esa decisión?",
      helper: "¿Miedo? ¿Duda? ¿Comodidad? ¿Inercia?",
      placeholder: "Ejemplo: Desde el miedo a fracasar, desde la zona de confort..."
    },
    {
      q: "¿Qué opciones creías tener en ese momento?",
      helper: "¿Sentías que no había salida? ¿Qué veías como posible?",
      placeholder: "Ejemplo: Creía que solo podía elegir entre A o B, no vi otras opciones..."
    },
    {
      q: "¿Qué pensás y sentís cuando repasás esto?",
      helper: "Culpa, frustración, enojo, tristeza, vergüenza...",
      placeholder: "Ejemplo: Siento frustración conmigo mismo, enojo por haber perdido tiempo..."
    },
    {
      q: "¿Qué creencia está sosteniendo todo esto?",
      helper: "La verdad oculta. Lo que creés sobre vos en el fondo.",
      placeholder: "Ejemplo: Creo que no soy capaz, que es muy tarde para mí, que no merezco más..."
    }
  ];

  const handleAreaSelect = (areaId: string) => {
    setSelectedArea(areaId);
    setAnswers({});
    setShowInsight(false);
    setCurrentQuestion(0);
  };

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowInsight(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canAdvance = answers[currentQuestion]?.trim().length > 5;
  const completedQuestions = Object.values(answers).filter(a => a && a.trim().length > 0).length;

  const copyPrompt = () => {
    const prompt = `🔓 Actuá como un mentor experto en transformación personal y conciencia estratégica.

Ya hice introspección y detecté creencias limitantes. Ahora quiero que:

1. Me ayudes a reinterpretar la situación desde una mirada más empoderadora.
2. Me propongas nuevas creencias alineadas con la vida que quiero.
3. Me hagas preguntas que aún no me hice para desbloquear percepciones ocultas.
4. Me muestres cómo aplicar este modelo en otras áreas: negocio, vínculos, propósito, cuerpo.
5. Me des una visión inspiradora de lo que podría suceder si sostengo esta perspectiva 90 días.

Sé directo y profundo.

Mi área de trabajo es: ${areas.find(a => a.id === selectedArea)?.label || selectedArea}

Mis respuestas:
${questions.map((q, i) => `${q.q}\n→ ${answers[i] || 'Sin respuesta'}`).join('\n\n')}`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🎙️ Cambiar tu forma de ver
        </h1>
        <p className="text-2xl text-blue-600 font-medium">
          La realidad no es fija. Es tu interpretación.
        </p>
      </div>

      {/* Hook potente */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <p className="text-xl text-gray-800 leading-relaxed mb-4">
          Todo lo que estás viviendo hoy —tus logros, tus problemas, tus decisiones— tiene un 
          <strong className="text-blue-700"> origen común:</strong>
        </p>
        <p className="text-2xl font-bold text-gray-900 text-center py-4">
          La forma en que ves el mundo.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Y lo mejor es que esa forma de ver no está escrita en piedra. 
          <strong className="text-blue-700"> Se puede cuestionar. Y se puede cambiar.</strong>
        </p>
      </div>

      {/* Idea central visual */}
      <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2">
            <div className="text-4xl">🔒</div>
            <p className="text-gray-300">Lo que ves como imposible</p>
            <p className="text-red-400 font-bold">Te mantiene quieto</p>
          </div>
          
          <div className="text-4xl">→</div>
          
          <div className="space-y-2">
            <div className="text-4xl">🚀</div>
            <p className="text-gray-300">Lo que ves como alcanzable</p>
            <p className="text-green-400 font-bold">Te activa</p>
          </div>
        </div>
      </div>

      {/* Historia de Bezos - Mejorada */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">📦</span>
          El secreto de Bezos no fue la suerte
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg border-2 border-gray-200">
            <p className="text-sm font-bold text-gray-500 mb-3">LO QUE OTROS VEÍAN:</p>
            <div className="space-y-2">
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-red-500">❌</span>
                <span>"Una tienda online más"</span>
              </p>
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-red-500">❌</span>
                <span>"Un experimento arriesgado"</span>
              </p>
              <p className="text-gray-700 flex items-start gap-2">
                <span className="text-red-500">❌</span>
                <span>"Competir con librerías es difícil"</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-lg border-2 border-green-300">
            <p className="text-sm font-bold text-green-700 mb-3">LO QUE BEZOS VIO:</p>
            <div className="space-y-2">
              <p className="text-gray-800 flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span className="font-medium">"Una plataforma global"</span>
              </p>
              <p className="text-gray-800 flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span className="font-medium">"El futuro del comercio"</span>
              </p>
              <p className="text-gray-800 flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span className="font-medium">"Una oportunidad histórica"</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white mt-6 p-5 rounded-lg border-2 border-amber-300">
          <p className="text-lg text-gray-800 font-medium text-center">
            💡 La diferencia no fue el capital ni la suerte. <br/>
            <span className="text-amber-600 font-bold">Fue su claridad de visión.</span>
          </p>
          <p className="text-gray-600 text-center mt-3 text-sm">
            Y esa misma claridad está disponible para vos. Solo tenés que aprender a mirar diferente.
          </p>
        </div>
      </div>

      {/* Transición al ejercicio */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">🧭 Ahora te toca a vos</h2>
        <p className="text-xl leading-relaxed">
          Este no es un ejercicio teórico. <br/>
          Es una herramienta de <strong>transformación real</strong>.
        </p>
        <p className="text-lg mt-4 text-purple-100">
          Te propongo un viaje hacia adentro. Un ejercicio de introspección honesta, 
          directa y sin filtros. Para descubrir qué está realmente moviendo tus decisiones.
        </p>
      </div>

      {/* Selector de área */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ✅ Paso 1: Elegí un área para transformar
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Solo una. La que más te incomoda hoy. Donde sentís que algo tiene que cambiar.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => handleAreaSelect(area.id)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedArea === area.id
                  ? 'bg-blue-100 border-blue-400 shadow-lg scale-105'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="text-4xl mb-3">{area.icon}</div>
              <p className="font-semibold text-gray-900">{area.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Ejercicio de preguntas */}
      {selectedArea && (
        <div className="bg-white border-2 border-purple-200 rounded-xl p-6 shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                🔍 Paso 2: Respondé con total honestidad
              </h2>
              <span className="text-sm font-medium text-purple-600">
                {completedQuestions}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedQuestions / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {!showInsight ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-300">
                <p className="text-sm font-bold text-purple-600 mb-2">
                  PREGUNTA {currentQuestion + 1} DE {questions.length}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {questions[currentQuestion].q}
                </h3>
                <p className="text-sm text-gray-600 italic mb-4">
                  💭 {questions[currentQuestion].helper}
                </p>
                
                <textarea
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                  placeholder={questions[currentQuestion].placeholder}
                  className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none min-h-[120px] text-gray-800"
                />
                
                <div className="mt-4 flex justify-between items-center">
                  {currentQuestion > 0 && (
                    <button
                      onClick={handlePreviousQuestion}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
                    >
                      ← Anterior
                    </button>
                  )}
                  
                  <button
                    onClick={handleNextQuestion}
                    disabled={!canAdvance}
                    className={`${currentQuestion === 0 ? '' : 'ml-auto'} px-6 py-3 rounded-lg font-bold transition-all ${
                      canAdvance
                        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Ver insight 🔍' : 'Siguiente →'}
                  </button>
                </div>
              </div>

              {currentQuestion > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-bold text-gray-600 mb-3">TUS RESPUESTAS ANTERIORES:</p>
                  <div className="space-y-3">
                    {questions.slice(0, currentQuestion).map((q, i) => (
                      <div key={i} className="text-sm pb-3 border-b border-gray-200 last:border-0">
                        <p className="font-medium text-gray-700 mb-1">{q.q}</p>
                        <p className="text-gray-600 italic line-clamp-2">→ {answers[i] || 'Sin respuesta'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Insight principal */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">⚡</span>
                  La revelación
                </h3>
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Al responder estas preguntas, acabás de hacer algo que muy pocas personas se animan a hacer:
                </p>
                <div className="bg-white p-5 rounded-lg border-l-4 border-amber-500">
                  <p className="text-gray-900 font-bold mb-2">
                    👁️ Hiciste visible lo invisible
                  </p>
                  <p className="text-gray-700">
                    Tus creencias ocultas —las que te dirigen sin que lo notes— ahora están frente a vos. 
                    Y cuando podés verlas, podés elegir diferente.
                  </p>
                </div>
              </div>

              {/* Tu construcción de realidad */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  🧵 Lo que descubriste:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">1️⃣</span>
                    <p className="text-gray-700 flex-1">
                      <strong>Tu realidad no es un accidente.</strong> Es una construcción basada en tus creencias.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">2️⃣</span>
                    <p className="text-gray-700 flex-1">
                      <strong>Tus decisiones vienen de tu percepción.</strong> Y tu percepción viene de tus creencias.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">3️⃣</span>
                    <p className="text-gray-700 flex-1">
                      <strong>Si fue construida, puede ser rediseñada.</strong> Tenés el poder de elegir nuevas creencias.
                    </p>
                  </div>
                </div>
              </div>

              {/* Resumen de respuestas */}
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  📋 Tu mapa de conciencia:
                </h3>
                <div className="space-y-4">
                  {questions.map((q, i) => (
                    <div key={i} className="border-l-4 border-purple-300 pl-4">
                      <p className="text-sm font-semibold text-purple-600 mb-1">{q.q}</p>
                      <p className="text-gray-700 italic">{answers[i]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de copiar prompt */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Siguiente nivel: Transformación asistida
                </h3>
                <p className="text-gray-700 mb-4">
                  Llevá este ejercicio al siguiente nivel. Copiá tu análisis completo y pegalo en ChatGPT o Claude 
                  para recibir una guía personalizada de transformación.
                </p>
                <button
                  onClick={copyPrompt}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {copiedPrompt ? (
                    <>
                      <span>✓</span>
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <span>📋</span>
                      <span>Copiar análisis + prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Qué te llevás */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🔦 Lo que te llevás de este ejercicio</h2>
        
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-indigo-400">
            <p className="text-lg text-gray-800 font-medium mb-2">
              Una herramienta para toda la vida
            </p>
            <p className="text-gray-700">
              Podés usar este proceso en cualquier situación: decisiones importantes, conflictos diarios, 
              para entender qué te duele o te frena, para diseñar una vida más auténtica.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-400">
            <p className="text-lg text-gray-800 font-medium mb-2">
              Un cambio de posición
            </p>
            <p className="text-gray-700">
              Ya no estás reaccionando a la realidad como si fuera un enemigo que te sorprende. 
              Ahora la entendés, la cuestionás y la rediseñás.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-pink-400">
            <p className="text-lg text-gray-800 font-medium mb-2">
              El verdadero poder
            </p>
            <p className="text-gray-700">
              La realidad deja de ser algo que te pasa... y empieza a ser algo que podés transformar.
            </p>
          </div>
        </div>
      </div>

      {/* Llamado final épico */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">🎯 Esta es tu invitación</h2>
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            A despertar. A mirar el mundo con una mirada nueva, más consciente, más libre.
          </p>
          <p>
            A desafiar las ideas que te limitan, esas que repetís sin darte cuenta y que moldean tu día a día.
          </p>
          <p>
            A reescribir tu historia, no desde el miedo ni la costumbre... 
            sino desde un lugar más auténtico, más profundo, más verdadero.
          </p>
        </div>
        
        <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-2xl font-bold mb-3">
            Porque al final, no se trata solo de cambiar lo que hacés.
          </p>
          <p className="text-3xl font-bold text-yellow-300">
            Se trata de cambiar cómo ves la vida.
          </p>
          <p className="text-xl mt-4">
            Y cuando eso cambia... <strong>todo cambia.</strong>
          </p>
        </div>
      </div>

      {/* Aplicaciones prácticas */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          ✔️ Usá esta herramienta para:
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Tomar decisiones importantes</h3>
            <p className="text-sm text-gray-600">
              Cuando tengas que elegir un camino crítico en tu vida
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-bold text-gray-900 mb-2">Resolver conflictos del día a día</h3>
            <p className="text-sm text-gray-600">
              Entender por qué algo te molesta y cómo cambiarlo
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">💔</div>
            <h3 className="font-bold text-gray-900 mb-2">Entender qué te duele o te frena</h3>
            <p className="text-sm text-gray-600">
              Identificar bloqueos emocionales y creencias limitantes
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🌟</div>
            <h3 className="font-bold text-gray-900 mb-2">Diseñar tu vida ideal</h3>
            <p className="text-sm text-gray-600">
              Alinearte con quien realmente querés ser
            </p>
          </div>
        </div>
      </div>

      {/* Mensaje final poderoso */}
      <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
        <p className="text-2xl font-bold mb-4">
          🔦 Cuando ves lo que otros no ven...
        </p>
        <p className="text-3xl font-bold text-amber-400">
          Hacés lo que otros no se animan a hacer.
        </p>
        <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
          Desde hoy, tenés en tus manos una de las herramientas más poderosas para la transformación personal. 
          Usala. Compartila. Viví desde ella.
        </p>
      </div>

      {/* Bonus prompt - NUEVO */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">🔓 BONUS: Prompt de Transformación</h3>
        <p className="text-gray-300 mb-4">
          Si ya completaste el ejercicio de introspección, usá este prompt con ChatGPT, Claude o tu coach digital favorito 
          para llevar tu transformación al siguiente nivel:
        </p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {`🎯 Actuá como un mentor experto en transformación personal y conciencia estratégica.

Ya hice introspección y detecté creencias limitantes. Ahora quiero que:

1. Me ayudes a reinterpretar la situación desde una mirada más empoderadora.
2. Me propongas nuevas creencias alineadas con la vida que quiero.
3. Me hagas preguntas que aún no me hice para desbloquear percepciones ocultas.
4. Me muestres cómo aplicar este modelo en otras áreas: negocio, vínculos, propósito, cuerpo.
5. Me des una visión inspiradora de lo que podría suceder si sostengo esta perspectiva 90 días.

Sé directo y profundo.`}
          </p>
        </div>
        <button 
          onClick={() => {
            const promptText = `🎯 Actuá como un mentor experto en transformación personal y conciencia estratégica.

Ya hice introspección y detecté creencias limitantes. Ahora quiero que:

1. Me ayudes a reinterpretar la situación desde una mirada más empoderadora.
2. Me propongas nuevas creencias alineadas con la vida que quiero.
3. Me hagas preguntas que aún no me hice para desbloquear percepciones ocultas.
4. Me muestres cómo aplicar este modelo en otras áreas: negocio, vínculos, propósito, cuerpo.
5. Me des una visión inspiradora de lo que podría suceder si sostengo esta perspectiva 90 días.

Sé directo y profundo.`;
            navigator.clipboard.writeText(promptText);
            setCopiedPrompt(true);
            setTimeout(() => setCopiedPrompt(false), 2000);
          }}
          className="mt-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {copiedPrompt ? (
            <>
              <span>✓</span>
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copiar prompt de transformación</span>
            </>
          )}
        </button>
        
        <div className="mt-6 bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
          <p className="text-sm text-amber-200 flex items-start gap-2">
            <span className="text-lg">💡</span>
            <span>
              <strong>Pro tip:</strong> Después de copiar este prompt, pegalo en tu IA favorita y agregale tus respuestas 
              del ejercicio de introspección. Esto te dará una guía personalizada ultra-específica para tu transformación.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const visionMundoMetadata = {
  id: 2,
  title: "Cambiar tu forma de ver",
  type: "document" as const,
  duration: "20 min"
};