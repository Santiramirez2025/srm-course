import React, { useState } from 'react';

export const PolaridadContent = () => {
  const [sliders, setSliders] = useState<{ [key: string]: number }>({
    humor: 50,
    orgullo: 50,
    juicio: 50,
    escucha: 50,
    formalidad: 50,
    energia: 50,
    exigencia: 50,
    paciencia: 50,
    defensiva: 50,
    honestidad: 50
  });
  
  const [selectedSituation, setSelectedSituation] = useState('');
  const [userDecision, setUserDecision] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const situations = [
    {
      id: 'reunion',
      title: 'Reunión familiar tensa',
      icon: '👨‍👩‍👧',
      adjustments: { humor: 70, orgullo: 20 },
      explanation: 'Subís el humor para aliviar, bajás el orgullo para no engancharte'
    },
    {
      id: 'amigo',
      title: 'Amigo cuenta algo personal',
      icon: '🤝',
      adjustments: { juicio: 20, escucha: 80 },
      explanation: 'Bajás el juicio, subís la escucha, te volvés espacio seguro'
    },
    {
      id: 'presentacion',
      title: 'Presentación aburrida',
      icon: '🎤',
      adjustments: { formalidad: 30, energia: 80 },
      explanation: 'Bajás formalidad, subís energía, contás una historia'
    },
    {
      id: 'hijo',
      title: 'Hijo frustrado',
      icon: '👶',
      adjustments: { exigencia: 20, paciencia: 80 },
      explanation: 'Bajás exigencia, subís paciencia, hablás con ternura'
    },
    {
      id: 'entrevista',
      title: 'Entrevista sobre errores',
      icon: '💼',
      adjustments: { defensiva: 20, honestidad: 80 },
      explanation: 'Bajás defensiva, subís honestidad madura'
    }
  ];

  const handleSliderChange = (key: string, value: number) => {
    setSliders({ ...sliders, [key]: value });
  };

  const handleSituationSelect = (situationId: string) => {
    setSelectedSituation(situationId);
    const situation = situations.find(s => s.id === situationId);
    if (situation) {
      setSliders({ ...sliders, ...situation.adjustments });
    }
  };

  const copyPrompt = () => {
    const prompt = `🔓 Actuá como un entrenador mental experto en neuroplasticidad y pensamiento estratégico.

Estoy por tomar una decisión importante. Quiero que me ayudes a verla desde todos los ángulos, no solo en blanco o negro.

${userDecision ? `Decisión a analizar:\n${userDecision}\n\n` : ''}Mostrame:
• Qué no estoy viendo por pensar en forma binaria
• Cómo moverme con flexibilidad entre extremos, como si fueran deslizadores de una consola mental
• Cómo usar inversión lógica y pensamiento espectral para encontrar soluciones inesperadas

Sé directo. No me digas lo que quiero oír. Mostrame lo que importa.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🎯 Polaridad
        </h1>
        <p className="text-2xl text-purple-600 font-medium">
          Rompé el pensamiento binario. Movete entre extremos.
        </p>
      </div>

      {/* Analogía de los anteojos */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          👓 La vida no es blanco o negro
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Imaginá que toda tu vida hubieras estado usando unos anteojos que solo te muestran el mundo en 
          <strong> blanco o negro.</strong> Bueno o malo. Éxito o fracaso. Correcto o incorrecto.
        </p>
        <div className="bg-white p-5 rounded-lg border-2 border-purple-300 mb-4">
          <p className="text-xl text-gray-800 font-medium">
            Y ahora, alguien te los quita. <br/>
            <strong className="text-purple-600">Y ves... que hay una gama infinita de colores.</strong>
          </p>
        </div>
        <p className="text-lg text-gray-700">
          Este documento no te pide que pienses distinto. <br/>
          <strong className="text-purple-700">Te reta a ser distinto.</strong>
        </p>
      </div>

      {/* Pensamiento binario */}
      <div className="bg-gray-900 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span className="text-4xl">🧠</span>
          Pensamiento binario: El mayor obstáculo
        </h2>
        
        <div className="space-y-6">
          <p className="text-xl text-gray-200">
            El mayor obstáculo no es <strong>lo que pensás</strong>. <br/>
            Es <strong className="text-red-400">cómo pensás</strong>.
          </p>

          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-lg mb-4">Nos educaron a elegir bandos:</p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-red-400">⚔️</span>
                Derecha o izquierda
              </p>
              <p className="flex items-center gap-2">
                <span className="text-red-400">⚔️</span>
                Carnívoro o vegano
              </p>
              <p className="flex items-center gap-2">
                <span className="text-red-400">⚔️</span>
                Disciplinado o espontáneo
              </p>
              <p className="flex items-center gap-2">
                <span className="text-red-400">⚔️</span>
                Lógico o emocional
              </p>
            </div>
            <p className="text-yellow-300 font-bold mt-4">
              Y una vez que elegís... te encadenás.
            </p>
          </div>

          <div className="bg-red-900/30 border-2 border-red-500/50 p-6 rounded-lg">
            <p className="text-xl text-center">
              Porque definir lo "correcto" es también declarar la guerra a todo lo "incorrecto". <br/>
              <strong className="text-red-400">Y con eso, cerrás puertas.</strong>
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 p-6 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-300 mb-3">¿Querés evolucionar?</p>
            <p className="text-lg">Entonces hay que romper el molde. <br/>
            Abrazar la contradicción. <br/>
            <strong className="text-yellow-300">Ser capaz de jugar en ambos extremos... según lo que la situación demande.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Deslizadores - INTERACTIVO PRINCIPAL */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">⚖️</span>
          Deslizadores: No sos una sola cosa. Sos adaptable.
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Muchas veces nos encasillamos con etiquetas como "soy introvertido", "soy muy lógico", o "soy demasiado sensible". 
          Pero la verdad es que <strong className="text-blue-600">no sos solo una cosa.</strong>
        </p>

        <div className="bg-white p-5 rounded-lg border-2 border-blue-300 mb-6">
          <p className="text-lg text-gray-800 font-medium mb-3">
            🎚 Tenés muchas partes dentro tuyo, y podés usarlas como una consola de sonido: 
            <strong className="text-blue-600"> subir o bajar el volumen según lo que pide la situación.</strong>
          </p>
        </div>

        {/* Situaciones predefinidas */}
        <div className="mb-6">
          <p className="font-bold text-gray-900 mb-3">📌 Situaciones comunes:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {situations.map((situation) => (
              <button
                key={situation.id}
                onClick={() => handleSituationSelect(situation.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedSituation === situation.id
                    ? 'bg-blue-100 border-blue-400 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-3xl mb-2">{situation.icon}</div>
                <p className="font-semibold text-gray-900 text-sm">{situation.title}</p>
              </button>
            ))}
          </div>
          
          {selectedSituation && (
            <div className="mt-4 bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-800 font-medium">
                💡 {situations.find(s => s.id === selectedSituation)?.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Consola de deslizadores */}
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg border-2 border-indigo-300">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">🎛️ Tu consola mental:</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(sliders).slice(0, 5).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700 capitalize">{key}</label>
                  <span className="text-sm font-bold text-indigo-600">{value}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleSliderChange(key, Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg border-2 border-indigo-400">
            <p className="text-sm text-gray-700 text-center">
              💡 Ajustá los deslizadores para ver cómo respondés a cada situación. 
              <strong className="text-indigo-600"> Esto no es fingir ni actuar. Es responder de manera consciente y estratégica.</strong>
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border-2 border-purple-300">
          <p className="text-xl font-bold text-gray-900 mb-3 text-center">
            👉 La idea central:
          </p>
          <p className="text-lg text-gray-800 text-center">
            Ser camaleónico no es ser falso. <br/>
            <strong className="text-purple-700">Es ser inteligente, flexible y emocionalmente maduro.</strong>
          </p>
        </div>
      </div>

      {/* El juicio como brújula */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🧭</span>
          El juicio como brújula
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Está bien ser flexible y adaptarte, pero no podés estar cambiando todo el tiempo sin saber a dónde vas. <br/>
          <strong className="text-orange-600">Por eso necesitás una brújula interna.</strong>
        </p>

        <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500 mb-6">
          <p className="text-xl font-bold text-gray-900 mb-3">¿Qué es el juicio?</p>
          <p className="text-gray-700 mb-3">Es tu capacidad de:</p>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-start gap-2">
              <span className="text-orange-500">1.</span>
              <span>Observar lo que pasa a tu alrededor</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-orange-500">2.</span>
              <span>Frenar antes de reaccionar por impulso</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-orange-500">3.</span>
              <span>Decidir qué versión de vos es la mejor para cada momento</span>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg border-2 border-orange-300">
          <p className="font-bold text-gray-900 mb-4">🎯 Cómo usar tu juicio para tener claridad:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">▶️ Definí tu objetivo</p>
              <p className="text-sm text-gray-600">¿Qué querés lograr realmente?</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">⛔ Soltá tus caprichos</p>
              <p className="text-sm text-gray-600">No todo lo que querés ahora te lleva a donde querés ir</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">🧘‍♂️ Despegate emocionalmente</p>
              <p className="text-sm text-gray-600">Respirá, bajá la ansiedad</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">👁️ Pensá como outsider</p>
              <p className="text-sm text-gray-600">¿Qué consejo te darías si fueras tu propio entrenador?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dejar de pensar en blanco o negro */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-6 rounded-xl border-2 border-gray-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🌈</span>
          Dejar de pensar en blanco o negro
        </h2>
        
        <div className="space-y-6">
          <p className="text-xl text-gray-800 font-medium">
            Nada en tu vida es 100% bueno o 100% malo. <br/>
            Ni tu éxito, ni tus errores, <strong className="text-indigo-600">ni vos mismo.</strong>
          </p>

          <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
            <p className="font-bold text-gray-900 mb-3">🎨 La vida no es una etiqueta fija</p>
            <p className="text-gray-700 mb-4">
              ("soy un fracasado", "lo hice perfecto")
            </p>
            <p className="text-lg text-gray-800">
              Es una escala de colores, como un degradado. A veces estás más cerca de un extremo, 
              a veces del otro... pero <strong className="text-purple-600">siempre estás en movimiento.</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
              <p className="font-bold text-red-600 mb-3">❌ El error común:</p>
              <p className="text-gray-700">
                Pensar que tenés que estar siempre bien o todo está mal. 
                Esa forma de pensar es rígida, y te hace sufrir más.
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
              <p className="font-bold text-green-600 mb-3">✅ La clave:</p>
              <p className="text-gray-700">
                En vez de juzgarte, aprendé a ver dónde estás hoy en la escala. 
                ¿Estás un poco mejor que ayer? Eso ya es progreso.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg border-2 border-indigo-300 text-center">
            <p className="text-xl font-bold text-gray-900">
              🎨 Como un diseñador que juega con tonos, <br/>
              no como un juez que sentencia.
            </p>
          </div>
        </div>
      </div>

      {/* Tu decisión - EJERCICIO */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">💭</span>
          Rompé tu pensamiento binario
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Describí una decisión que estés enfrentando donde te sientas atrapado entre dos opciones:
        </p>

        <textarea
          value={userDecision}
          onChange={(e) => setUserDecision(e.target.value)}
          placeholder="Ejemplo: ¿Dejo mi trabajo estable o arriesgo con mi emprendimiento? Me siento entre seguridad o libertad..."
          className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none min-h-[120px] text-gray-800 mb-4"
        />

        {userDecision.trim().length > 20 && (
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all mb-4"
          >
            {showAnalysis ? '🔒 Ocultar análisis' : '🌈 Ver desde todos los colores'}
          </button>
        )}

        {showAnalysis && userDecision && (
          <div className="bg-white p-6 rounded-lg border-2 border-purple-400">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">🔍 Preguntas para salir del blanco o negro:</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Y si no fueran las únicas opciones?</p>
                <p className="text-sm text-gray-600">¿Existe una tercera vía que combine lo mejor de ambas?</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Qué estoy suponiendo que es verdad?</p>
                <p className="text-sm text-gray-600">¿Qué creencia rígida me hace ver solo dos caminos?</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Cómo lo vería alguien que admiro?</p>
                <p className="text-sm text-gray-600">¿Qué harían con esta situación los que ya lograron lo que quiero?</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Puedo moverme entre ambas en fases?</p>
                <p className="text-sm text-gray-600">¿Y si no es una decisión única sino un deslizador que ajusto con el tiempo?</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mensaje final */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">🧩 Moverse entre polos</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-xl">
            Esto no es un documento. Es un mapa mental.
          </p>
          <p className="text-2xl font-bold text-yellow-300">
            Una guía para hackear el sistema binario que limita tu potencial.
          </p>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-lg mb-3">Aplicarlo requiere algo que muchos evitan:</p>
            <div className="space-y-2">
              <p>📍 Autoconciencia</p>
              <p>📍 Práctica</p>
              <p>📍 Valentía para romper con lo que creías que eras</p>
            </div>
          </div>

          <div className="text-xl">
            <p className="mb-3">Pero si lo hacés...</p>
            <p className="mb-3">Si te animás a moverte entre extremos, a soltar tus certezas como verdades fijas...</p>
            <p className="text-2xl font-bold text-yellow-300 mt-4">
              Te convertís en alguien mucho más poderoso: <br/>
              Adaptable. Estratégico. Libre.
            </p>
          </div>
        </div>
      </div>

      {/* Bonus prompt */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">🔓 BONUS: Pensamiento espectral</h3>
        <p className="text-gray-300 mb-4">
          Usá este prompt en ChatGPT o Claude para ver tu decisión desde todos los ángulos:
        </p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {`🔓 Actuá como un entrenador mental experto en neuroplasticidad y pensamiento estratégico.

Estoy por tomar una decisión importante. Quiero que me ayudes a verla desde todos los ángulos, no solo en blanco o negro.

Mostrame:
• Qué no estoy viendo por pensar en forma binaria
• Cómo moverme con flexibilidad entre extremos, como si fueran deslizadores de una consola mental
• Cómo usar inversión lógica y pensamiento espectral para encontrar soluciones inesperadas

Sé directo. No me digas lo que quiero oír. Mostrame lo que importa.`}
          </p>
        </div>
        <button 
          onClick={copyPrompt}
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
              <span>Copiar prompt de pensamiento espectral</span>
            </>
          )}
        </button>
        
        {userDecision && (
          <div className="mt-6 bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
            <p className="text-sm text-amber-200 flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Tu prompt incluye:</strong> Tu decisión actual. La IA te mostrará los ángulos ciegos, 
                las opciones que no estás viendo por pensar en blanco o negro.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const EnergiaContent = PolaridadContent;

export const polaridadMetadata = {
  id: 8,
  title: "Polaridad",
  type: "document" as const,
  duration: "20 min"
};

// Exportar metadata con el nombre alternativo
export const energiaMetadata = polaridadMetadata;