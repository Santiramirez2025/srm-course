import React, { useState } from 'react';

export const NaturalezaMetaContent = () => {
  const [sixForces, setSixForces] = useState<{ [key: number]: string }>({});
  const [currentForce, setCurrentForce] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [selectedVacuum, setSelectedVacuum] = useState<string>('');

  const forces = [
    {
      title: "¿Qué querés realmente?",
      subtitle: "Apuntando",
      helper: "Concreto, específico, medible. No 'ser feliz', sino algo tangible.",
      placeholder: "Ejemplo: Facturar $5.000 por mes haciendo diseño gráfico para marcas que respeto",
      icon: "🎯"
    },
    {
      title: "¿Cuándo lo querés?",
      subtitle: "Tiempo",
      helper: "Sé realista. Triplicá tu estimación inicial. ¿Estás dispuesto a sostenerlo?",
      placeholder: "Ejemplo: En 12 meses, pero estoy preparado para que tome 24",
      icon: "⏰"
    },
    {
      title: "¿Por qué lo querés?",
      subtitle: "Aspiraciones",
      helper: "El verdadero 'por qué' casi siempre nace de un vacío emocional del pasado.",
      placeholder: "Ejemplo: Quiero validación porque de chico no me sentí valorado",
      icon: "💎"
    },
    {
      title: "¿Cómo lo vas a lograr?",
      subtitle: "Causalidad",
      helper: "Hábitos, aprendizajes, acciones clave. ¿Qué causas deben estar presentes?",
      placeholder: "Ejemplo: Estudiar diseño 2h diarias, construir portfolio, contactar 5 marcas por semana",
      icon: "🔧"
    },
    {
      title: "¿Dónde deberías estar?",
      subtitle: "Entorno",
      helper: "Tu ambiente físico y social. ¿Favorece tu progreso o te distrae?",
      placeholder: "Ejemplo: Necesito un espacio de trabajo dedicado y rodearme de diseñadores exitosos",
      icon: "🌍"
    },
    {
      title: "¿En quién necesitás convertirte?",
      subtitle: "Identidad",
      helper: "No podés lograr algo nuevo siendo la misma persona. ¿Qué cualidad debés desarrollar?",
      placeholder: "Ejemplo: Debo desarrollar disciplina, confianza en mi trabajo y habilidad para vender",
      icon: "🦋"
    }
  ];

  const driveVacuums = [
    {
      external: "Quiero ganar $20.000 al mes",
      internal: "Quiero atención y reconocimiento",
      root: "De chico no me sentí valorado"
    },
    {
      external: "Quiero dejar mi trabajo",
      internal: "Quiero tener control sobre mi vida",
      root: "Siempre sentí que otros decidían por mí"
    },
    {
      external: "Quiero estar en forma",
      internal: "Quiero sentirme suficiente",
      root: "Me comparé toda la vida y nunca alcanzaba"
    }
  ];

  const handleForceChange = (value: string) => {
    setSixForces({ ...sixForces, [currentForce]: value });
  };

  const handleNext = () => {
    if (currentForce < forces.length - 1) {
      setCurrentForce(currentForce + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentForce > 0) {
      setCurrentForce(currentForce - 1);
    }
  };

  const canAdvance = sixForces[currentForce]?.trim().length > 5;
  const completedForces = Object.values(sixForces).filter(v => v && v.trim().length > 0).length;

  const copyPrompt = () => {
    const prompt = `🔓 Ayúdame a redefinir mi meta utilizando el Modelo de las Seis Fuerzas Ocultas.

Quiero descubrir mi verdadero 'por qué' y construir una visión de autotrascendencia alineada con la identidad que debo encarnar para lograrlo.

Mis respuestas a las 6 fuerzas:

${forces.map((f, i) => `${f.icon} ${f.title}
→ ${sixForces[i] || 'Sin respuesta'}`).join('\n\n')}

Sé preciso, desafiante y sin rodeos.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🎯 La Naturaleza de la Meta
        </h1>
        <p className="text-2xl text-indigo-600 font-medium">
          Tu brújula hacia la autotrascendencia
        </p>
      </div>

      {/* Hook inicial */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          🧭 Esto no es motivación. Es entrenamiento.
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Hablar de metas no es hablar de listas de deseos ni de frases bonitas. 
          <strong className="text-indigo-700"> Es hablar de la brújula que dirige tu vida.</strong>
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Sin una meta clara, sos un barco a la deriva. Con una meta, te convertís en capitán.
        </p>
      </div>

      {/* Analogía del barco - VISUAL */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
          <div className="text-6xl mb-4 text-center">🌊</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Sin meta clara</h3>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Cualquier viento te arrastra
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Dudás constantemente
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500">❌</span>
              Te desvías con facilidad
            </p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
          <div className="text-6xl mb-4 text-center">⛵</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Con meta clara</h3>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Trazás un rumbo definido
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Ajustás tus velas con propósito
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Atravesás cualquier tormenta
            </p>
          </div>
        </div>
      </div>

      {/* 3 Características de una meta poderosa */}
      <div className="bg-white p-6 rounded-xl border-2 border-indigo-200 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📍 Una meta poderosa tiene que ser:</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border-2 border-blue-200">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Concreta</h3>
            <p className="text-sm text-gray-700">Que se pueda visualizar con claridad</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg border-2 border-purple-200">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-gray-900 mb-2">Medible</h3>
            <p className="text-sm text-gray-700">Que sepas si estás más cerca o más lejos</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-lg border-2 border-orange-200">
            <div className="text-3xl mb-3">❤️‍🔥</div>
            <h3 className="font-bold text-gray-900 mb-2">Emocionalmente vibrante</h3>
            <p className="text-sm text-gray-700">Que te haga latir el corazón</p>
          </div>
        </div>

        <div className="mt-6 bg-indigo-100 p-5 rounded-lg border-l-4 border-indigo-500">
          <p className="text-gray-900 font-medium mb-2">📌 Ejemplo potente:</p>
          <p className="text-lg text-indigo-700 italic">
            "Quiero ganar $5.000 al mes haciendo lo que amo."
          </p>
          <p className="text-sm text-gray-600 mt-3">
            No se trata solo de plata. Se trata de dirección. De identidad. De declarar: 
            <strong> "Esto es lo que quiero. Esto es lo que soy."</strong>
          </p>
        </div>
      </div>

      {/* Transición a las 6 fuerzas */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">🧩 Las Seis Fuerzas Ocultas</h2>
        <p className="text-xl leading-relaxed max-w-3xl mx-auto">
          Estas seis preguntas funcionan como una linterna. No iluminan el mundo exterior. 
          <strong> Iluminan tu interior.</strong>
        </p>
        <p className="text-lg mt-4 text-purple-100">
          Te ayudan a descubrir qué querés de verdad, por qué lo querés, y quién necesitás ser para conseguirlo.
        </p>
      </div>

      {/* Ejercicio de las 6 fuerzas */}
      <div className="bg-white border-2 border-purple-200 rounded-xl p-6 shadow-lg">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              ✨ Definí tu meta con las 6 Fuerzas
            </h2>
            <span className="text-sm font-medium text-purple-600">
              {completedForces}/{forces.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedForces / forces.length) * 100}%` }}
            />
          </div>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-5xl">{forces[currentForce].icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-indigo-600 mb-1">
                    FUERZA {currentForce + 1} DE {forces.length} · {forces[currentForce].subtitle.toUpperCase()}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {forces[currentForce].title}
                  </h3>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 italic mb-4 bg-white p-3 rounded border-l-4 border-indigo-400">
                💭 {forces[currentForce].helper}
              </p>
              
              <textarea
                value={sixForces[currentForce] || ''}
                onChange={(e) => handleForceChange(e.target.value)}
                placeholder={forces[currentForce].placeholder}
                className="w-full p-4 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none min-h-[100px] text-gray-800"
              />
              
              <div className="mt-4 flex justify-between items-center">
                {currentForce > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    ← Anterior
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  disabled={!canAdvance}
                  className={`${currentForce === 0 ? '' : 'ml-auto'} px-6 py-3 rounded-lg font-bold transition-all ${
                    canAdvance
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentForce === forces.length - 1 ? 'Ver mi mapa completo 🗺️' : 'Siguiente →'}
                </button>
              </div>
            </div>

            {/* Mini preview */}
            {currentForce > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-bold text-gray-600 mb-3">TUS FUERZAS ANTERIORES:</p>
                <div className="space-y-2">
                  {forces.slice(0, currentForce).map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-lg">{f.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-700">{f.title}</p>
                        <p className="text-gray-600 italic line-clamp-1">→ {sixForces[i]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Resultado principal */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">🎯</span>
                Tu Mapa de Autotrascendencia
              </h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                Acabás de hacer lo que muy pocas personas logran: definir tu meta con precisión quirúrgica. 
                Este no es un ejercicio motivacional. Es tu arquitectura interna.
              </p>
            </div>

            {/* Resumen de las 6 fuerzas */}
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🗺️ Tu sistema completo:
              </h3>
              <div className="space-y-4">
                {forces.map((f, i) => (
                  <div key={i} className="border-l-4 border-indigo-400 pl-4 bg-indigo-50 p-3 rounded-r">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{f.icon}</span>
                      <p className="text-sm font-bold text-indigo-600">{f.subtitle.toUpperCase()}: {f.title}</p>
                    </div>
                    <p className="text-gray-700 font-medium">{sixForces[i]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón copiar */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Profundizá tu claridad con IA
              </h3>
              <p className="text-gray-700 mb-4">
                Copiá tu mapa completo y usalo con ChatGPT o Claude para recibir un análisis profundo y desafiante.
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
                    <span>Copiar mapa + prompt de profundización</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Drive Vacuums - INTERACTIVO */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border-2 border-pink-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🧠 Drive Vacuums: El verdadero "Por qué"
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Tus metas no nacen de la nada. Son espejos de vacíos emocionales que buscás llenar. 
          <strong className="text-pink-700"> Y eso no está mal... si sos consciente de ello.</strong>
        </p>

        <div className="space-y-4 mb-6">
          {driveVacuums.map((vacuum, index) => (
            <button
              key={index}
              onClick={() => setSelectedVacuum(selectedVacuum === vacuum.external ? '' : vacuum.external)}
              className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                selectedVacuum === vacuum.external
                  ? 'bg-white border-pink-400 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-bold text-gray-900">{vacuum.external}</p>
                <span className="text-2xl">{selectedVacuum === vacuum.external ? '👇' : '👉'}</span>
              </div>
              
              {selectedVacuum === vacuum.external && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                    <span className="text-xl">🎭</span>
                    <div>
                      <p className="text-sm font-semibold text-orange-600">Capa interna:</p>
                      <p className="text-gray-700">{vacuum.internal}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-red-50 p-3 rounded border-l-4 border-red-400">
                    <span className="text-xl">💔</span>
                    <div>
                      <p className="text-sm font-semibold text-red-600">Raíz emocional:</p>
                      <p className="text-gray-700">{vacuum.root}</p>
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-pink-300">
          <p className="text-gray-800 font-medium">
            ⚠️ El problema aparece cuando lográs la meta externa... pero el vacío interno sigue ahí. 
            Sin un nuevo "por qué", te quedás sin norte.
          </p>
          <p className="text-pink-700 font-bold mt-3">
            👉 Tu "por qué" necesita renovarse con el tiempo. Evolucionar como vos evolucionás.
          </p>
        </div>
      </div>

      {/* El "Cuándo" - Los optimistas mueren primero */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">⏳</span>
          "Los optimistas mueren primero"
        </h2>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Muchas personas se ilusionan con plazos irreales. Se convencen de que todo va a salir rápido y fácil. 
            Pero cuando la realidad no responde a su calendario... <strong className="text-red-600">se frustran, se cansan, y se rinden.</strong>
          </p>

          <div className="bg-white p-5 rounded-lg border-l-4 border-red-500">
            <p className="text-gray-900 font-bold mb-2">💥 No seas ese optimista ingenuo.</p>
            <p className="text-gray-700">
              Convertite en un <strong>realista con fe inquebrantable</strong>: alguien que no niega las dificultades, 
              pero que cree profundamente que vale la pena seguir.
            </p>
          </div>

          <div className="bg-orange-100 p-5 rounded-lg border-2 border-orange-300">
            <p className="text-xl font-bold text-gray-900 mb-2">🎯 La regla del x3</p>
            <p className="text-gray-700">
              Si pensás que te va a llevar 3 meses, <strong>preparate para 9.</strong>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              No para resignarte, sino para que el proceso no te saque del juego.
            </p>
          </div>

          <p className="text-gray-700 text-center font-medium italic">
            La tolerancia al proceso, a la incertidumbre, a lo incómodo... 
            <span className="text-orange-600 font-bold"> eso es lo que diferencia al que llega del que solo sueña.</span>
          </p>
        </div>
      </div>

      {/* El "Cómo" - Causalidad */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🔍</span>
          Toda meta es un efecto, no una casualidad
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Nada "pasa porque sí". Si lográs algo, es porque hubo <strong>causas</strong> detrás que lo hicieron posible.
        </p>

        <div className="bg-white p-6 rounded-lg border-2 border-blue-300 mb-6">
          <p className="text-xl font-bold text-gray-900 mb-4 text-center">
            👉 Si querés resultados distintos, necesitás causas distintas
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-gray-900">Precisión en tu rutina</p>
                <p className="text-sm text-gray-600">No hacer mucho, sino lo que importa, todos los días</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-gray-900">Energía enfocada</p>
                <p className="text-sm text-gray-600">Tu atención es tu activo más valioso</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-gray-900">Cuidar cuerpo y mente</p>
                <p className="text-sm text-gray-600">Sin combustible real, no hay movimiento</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-gray-900">Alineación total</p>
                <p className="text-sm text-gray-600">Todo lo que hacés apunta al objetivo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-5 rounded-lg text-center">
          <p className="text-lg font-bold text-gray-900">
            🎯 La meta no se fuerza... <span className="text-blue-600">se provoca.</span>
          </p>
          <p className="text-gray-700 mt-2">
            Cuando todo lo que hacés, pensás y sentís está alineado... el resultado llega como consecuencia natural.
          </p>
        </div>
      </div>

      {/* El "Dónde" y "Quién" */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🌍</span>
          No podés florecer en cualquier suelo
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="font-bold text-gray-900 mb-2">El "Dónde" importa</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Las personas que te rodean, los lugares en los que te movés, las ideas que consumís... 
              todo eso moldea tu realidad, te potencia o te frena.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-indigo-300">
            <div className="text-3xl mb-3">🦋</div>
            <h3 className="font-bold text-gray-900 mb-2">El "Quién" eres define todo</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Quién sos mientras vas en busca de tu meta es lo que determina si vas a alcanzarla... 
              y sostenerla sin romperte.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-5 rounded-lg">
          <p className="text-lg font-bold text-gray-900 mb-3">
            💡 No se trata solo de "tener" más. Se trata de "ser" más.
          </p>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-start gap-2">
              <span className="text-purple-600">→</span>
              <span>Desarrollar habilidades que antes no tenías</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-600">→</span>
              <span>Carácter para resistir los momentos duros</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-600">→</span>
              <span>Hábitos que te eleven en lugar de sabotearte</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-600">→</span>
              <span>Conciencia para no perderte en el camino</span>
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white p-5 rounded-lg border-2 border-purple-300">
          <p className="text-gray-800 font-medium text-center">
            🚫 Si el entorno no acompaña, y vos no evolucionás... 
            <strong className="text-purple-700"> esa meta que tanto soñás se vuelve inalcanzable, o peor: insostenible.</strong>
          </p>
        </div>
      </div>

      {/* Ciclo de estancamiento */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-xl border-2 border-gray-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🔄</span>
          El Ciclo de Estancamiento
        </h2>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            ¿Alguna vez lograste algo que parecía enorme... y no sentiste nada? 
            <strong className="text-gray-900"> Ese "¿y ahora qué?" silencioso.</strong>
          </p>

          <div className="bg-white p-5 rounded-lg border-l-4 border-gray-500">
            <p className="text-gray-900 font-bold mb-2">Eso es estancamiento.</p>
            <p className="text-gray-700">
              No ocurre por falta de éxito, sino por una desconexión interna. 
              Cuando tu meta era solo un parche para un dolor emocional.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="bg-slate-100 p-4 rounded text-center">
              <div className="text-3xl mb-2">💼</div>
              <p className="text-sm text-gray-700">Ganan mucho dinero</p>
            </div>
            <div className="bg-slate-100 p-4 rounded text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm text-gray-700">Consiguen estatus</p>
            </div>
            <div className="bg-slate-100 p-4 rounded text-center">
              <div className="text-3xl mb-2">👏</div>
              <p className="text-sm text-gray-700">Reciben aplausos</p>
            </div>
          </div>

          <p className="text-center text-gray-700 font-medium">
            ...y de pronto se apagan. Su motor emocional se quedó sin gasolina.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border-2 border-green-300">
            <p className="text-lg font-bold text-gray-900 mb-3">🔥 La solución:</p>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Una nueva causa, algo que te trascienda</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Un nuevo "por qué", más alineado con quién sos hoy</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Un nuevo nivel de conciencia que convierta el éxito en sentido</span>
              </p>
            </div>
          </div>

          <p className="text-center text-lg font-medium text-gray-800 italic">
            Cuando el alma no está involucrada... el logro se siente hueco. <br/>
            <span className="text-green-600 font-bold">Pero cuando todo tu ser está en juego... cada paso vibra.</span>
          </p>
        </div>
      </div>

      {/* Llamado final */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">🖼️ La realidad es una obra de arte</h2>
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            Pero cada uno la mira con lentes que no eligió. Lentes distorsionados por creencias, traumas, historias heredadas.
          </p>
          <p className="text-2xl font-bold text-yellow-300">
            Limpiar esas gafas es el acto más revolucionario que podés hacer.
          </p>
          <p>
            Porque solo cuando ves con claridad, podés crear con intención.
          </p>
        </div>
        
        <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg mb-3">
            Este documento no te motiva. <strong>Te entrena.</strong>
          </p>
          <p className="text-xl">
            Te entrena para pensar con precisión. Para actuar con propósito. 
            Para convertirte en alguien que no solo persigue una meta, sino que <strong>se eleva a través de ella.</strong>
          </p>
        </div>
      </div>

      {/* Resumen visual de conceptos clave */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          🔑 Conceptos clave para recordar
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Meta clara</h3>
            <p className="text-sm text-gray-600">Concreta, medible y emocionalmente vibrante</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">⏰</div>
            <h3 className="font-bold text-gray-900 mb-2">Regla del x3</h3>
            <p className="text-sm text-gray-600">Triplicá tus tiempos estimados. Prepárate para el proceso largo</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">💔</div>
            <h3 className="font-bold text-gray-900 mb-2">Drive Vacuums</h3>
            <p className="text-sm text-gray-600">Tus metas son espejos de vacíos emocionales. Sé consciente de ellos</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="font-bold text-gray-900 mb-2">Causalidad</h3>
            <p className="text-sm text-gray-600">La meta no se fuerza, se provoca. Alineá tus causas</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-bold text-gray-900 mb-2">Entorno</h3>
            <p className="text-sm text-gray-600">No podés florecer en cualquier suelo. Elegí bien tu contexto</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🦋</div>
            <h3 className="font-bold text-gray-900 mb-2">Identidad</h3>
            <p className="text-sm text-gray-600">No se trata de tener más, sino de ser más</p>
          </div>
        </div>
      </div>

      {/* Bonus prompt */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">🔓 BONUS: Prompt de Redefinición</h3>
        <p className="text-gray-300 mb-4">
          Si querés llevar tu claridad al siguiente nivel, usá este prompt con ChatGPT o Claude:
        </p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {`🔓 Ayúdame a redefinir mi meta utilizando el Modelo de las Seis Fuerzas Ocultas.

Quiero descubrir mi verdadero 'por qué' y construir una visión de autotrascendencia alineada con la identidad que debo encarnar para lograrlo.

Sé preciso, desafiante y sin rodeos.`}
          </p>
        </div>
        <button 
          onClick={() => {
            const promptText = `🔓 Ayúdame a redefinir mi meta utilizando el Modelo de las Seis Fuerzas Ocultas.

Quiero descubrir mi verdadero 'por qué' y construir una visión de autotrascendencia alineada con la identidad que debo encarnar para lograrlo.

Sé preciso, desafiante y sin rodeos.`;
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
              <span>Copiar prompt de redefinición</span>
            </>
          )}
        </button>
        
        <div className="mt-6 bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
          <p className="text-sm text-amber-200 flex items-start gap-2">
            <span className="text-lg">💡</span>
            <span>
              <strong>Pro tip:</strong> Agregá al prompt tus respuestas de las 6 Fuerzas para recibir un análisis 
              ultra-personalizado que te desafíe a pensar más profundo.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const naturalezaMetaMetadata = {
  id: 3,
  title: "La Naturaleza de la Meta",
  type: "document" as const,
  duration: "25 min"
};