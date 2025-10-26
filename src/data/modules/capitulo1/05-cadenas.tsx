import React, { useState } from 'react';

export const CadenasContent = () => {
  const [techoValue, setTechoValue] = useState(80);
  const [sueloValue, setSueloValue] = useState(30);
  const [selectedArea, setSelectedArea] = useState('');
  const [newFloor, setNewFloor] = useState('');
  const [showMapping, setShowMapping] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const areas = [
    { 
      id: 'salud', 
      name: 'Salud', 
      icon: '💪', 
      oldFloor: 'Cuando estoy estresado, como cualquier cosa y salto el gym', 
      newFloor: 'Aunque no vaya al gym, hago mínimo 10 min de movimiento. Incluyo vegetales en al menos una comida del día' 
    },
    { 
      id: 'finanzas', 
      name: 'Finanzas', 
      icon: '💰', 
      oldFloor: 'Gasto sin pensar cuando tengo un mal día', 
      newFloor: 'Aunque gaste de más, nunca toco mi cuenta de ahorros. Reviso gastos una vez por semana' 
    },
    { 
      id: 'relaciones', 
      name: 'Relaciones', 
      icon: '❤️', 
      oldFloor: 'Evito conflictos y digo que sí a todo por no incomodar', 
      newFloor: 'Aunque me cueste, comunico cuando algo no me parece bien. Digo no al menos una vez por semana cuando es necesario' 
    },
    { 
      id: 'productividad', 
      name: 'Productividad', 
      icon: '⚡', 
      oldFloor: 'Procrastino todo lo que no me gusta hacer', 
      newFloor: 'Aunque no tenga ganas, trabajo enfocado mínimo 1 hora al día. Empiezo por la tarea más difícil' 
    }
  ];

  const promedio = Math.round((techoValue + sueloValue) / 2);
  const selectedAreaData = areas.find(a => a.id === selectedArea);

  const copyPrompt = () => {
    const prompt = `Hola. Quiero trabajar en elevar mis estándares mínimos (mi 'suelo') en diferentes áreas de mi vida.

Te cuento mi situación actual:

Área en la que quiero mejorar: ${selectedAreaData?.name || '[Tu área]'}

Mi suelo actual (lo que tolero en mis peores días):
"${selectedAreaData?.oldFloor || 'Describe tu comportamiento en tus peores días'}"

El suelo que quiero establecer (realista pero elevado):
"${newFloor || selectedAreaData?.newFloor || 'Define tu nuevo mínimo aceptable'}"

¿Podrías ayudarme a:
1. Identificar qué patrones mentales o creencias están manteniendo mi suelo actual bajo
2. Diseñar 3-5 "reglas irrompibles" simples que eleven mi suelo de forma sostenible
3. Sugerirme cómo responder cuando sienta que voy a bajar de ese nuevo suelo

Necesito que sea práctico y realista, sin perfeccionismo ni exigencias imposibles.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🔗 Cadenas
        </h1>
        <p className="text-2xl text-indigo-600 font-medium">
          Cómo romper el ciclo y elevar tu estándar mínimo
        </p>
      </div>

      {/* Intro mejorado */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          ¿Por qué es tan difícil cambiar de verdad?
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          No porque no sepas qué hacer. No porque te falte motivación.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong className="text-indigo-700">Sino porque cada vez que intentás cambiar tu vida... lo hacés siendo la misma persona.</strong> Y eventualmente, volvés a los comportamientos que te son "naturales".
        </p>
        <div className="mt-4 bg-white p-4 rounded-lg border-2 border-indigo-200">
          <p className="text-gray-800 text-center font-medium">
            💡 Hoy vas a entender cómo funciona ese ciclo. Y cómo romperlo de una vez.
          </p>
        </div>
      </div>

      {/* Hook mejorado */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          👥 Hay dos versiones de vos
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Está la versión que mostrás al mundo: organizada, disciplinada, con todo bajo control.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Y después está la versión de las 3 de la mañana cuando nadie te ve: la que come cualquier cosa porque "ya qué importa", la que promete "mañana empiezo en serio", la que sabe exactamente qué tendría que hacer... pero igual no lo hace.
        </p>
        <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
          <p className="text-lg text-gray-800 mb-3">
            <strong className="text-purple-700">Acá viene lo interesante:</strong>
          </p>
          <p className="text-lg text-gray-800 mb-3">
            Tu identidad no es lo que decís que sos. Es lo que hacés cuando nadie te está mirando.
          </p>
          <p className="text-lg text-gray-700">
            Y eso no es algo fijo o definitivo. Es simplemente el conjunto de hábitos y respuestas automáticas que aprendiste con el tiempo.
          </p>
          <p className="text-purple-600 text-xl font-bold mt-4 text-center">
            La buena noticia: Si son hábitos aprendidos, pueden desaprenderse.
          </p>
        </div>
      </div>

      {/* Verdad mejorada */}
      <div className="bg-gray-900 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🔄 Por qué tantos intentos de cambio fallan
        </h2>
        
        <p className="text-xl text-gray-200 leading-relaxed mb-6 text-center">
          La mayoría de la gente trata de cambiar <strong>resultados</strong> (bajar de peso, ahorrar plata, mejorar relaciones) pero sin cambiar <strong>quién es por dentro</strong>.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Hacen la dieta...</p>
            <p className="text-white font-medium">pero siguen siendo "alguien que come sus emociones"</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Empiezan a ahorrar...</p>
            <p className="text-white font-medium">pero siguen siendo "alguien que se premia con compras"</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Mejoran la comunicación...</p>
            <p className="text-white font-medium">pero siguen siendo "alguien que evita conflictos"</p>
          </div>
        </div>

        <div className="bg-indigo-900/30 border-2 border-indigo-500/50 p-6 rounded-lg">
          <p className="text-lg mb-3 text-gray-300">El patrón es este:</p>
          <p className="text-2xl font-bold text-indigo-300 text-center mb-4">
            No alcanzás metas permanentes sin convertirte en una versión distinta de vos.
          </p>
          <p className="text-gray-300 text-center">
            Porque si tu identidad no cambia, eventualmente volvés a los comportamientos que te son "naturales".
          </p>
        </div>

        <div className="mt-6 bg-white/10 p-5 rounded-lg">
          <p className="text-lg text-white mb-2"><strong>La pregunta no es:</strong></p>
          <p className="text-gray-300 mb-4">"¿Cómo logro X?"</p>
          <p className="text-lg text-white mb-2"><strong>La pregunta es:</strong></p>
          <p className="text-green-400 font-bold text-xl">"¿En quién me tengo que convertir para que X sea natural?"</p>
        </div>
      </div>

      {/* El Loop mejorado */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🎢</span>
          El patrón del yo-yo
        </h2>
        
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          ¿Te pasa esto?
        </p>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Arrancás la semana con todo: gym, comida sana, trabajo enfocado. Te sentís imparable.
        </p>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Y después... algo pasa. Un día estresante. Una discusión. Un bajón. Y de golpe volvés a la versión de vos que procrastina, come mal, evita todo.
        </p>

        <div className="bg-white p-6 rounded-lg border-2 border-orange-300 mb-6">
          <p className="text-gray-900 font-bold mb-4 text-center">
            💚 No estás solo en esto. Se llama "el loop" y le pasa a casi todos.
          </p>
          
          <p className="text-gray-700 mb-4 text-center">
            Es como si tuvieras dos versiones de vos que se turnan el control:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
              <div className="text-4xl mb-3 text-center">🟢</div>
              <h3 className="font-bold text-green-700 text-center mb-3">Versión A</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Disciplinado</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Enfocado</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Imparable</span>
                </p>
              </div>
            </div>

            <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
              <div className="text-4xl mb-3 text-center">🔴</div>
              <h3 className="font-bold text-red-700 text-center mb-3">Versión B</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Perezoso</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Ansioso</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Autodestructivo</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg">
            <p className="text-gray-800 font-medium text-center mb-2">
              Y lo más loco es que ambas versiones se sienten "reales" cuando estás en ellas.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500">
          <p className="text-gray-800 font-bold text-lg mb-3">
            🎯 Acá está el problema:
          </p>
          <p className="text-gray-700 mb-3">
            No se trata de motivación (porque cuando estás en modo A, tenés toda la motivación del mundo).
          </p>
          <p className="text-lg mb-3">
            <strong className="text-orange-600">Se trata de promedio.</strong>
          </p>
          <p className="text-gray-700 mb-3">
            Si pasás 3 días en versión A y 4 días en versión B cada semana, tu promedio es... versión B.
          </p>
          <p className="text-gray-800 font-bold">
            Y tu vida no es el resultado de tus picos. Es el resultado de tu promedio.
          </p>
        </div>
      </div>

      {/* Techo vs Suelo - INTERACTIVO mejorado */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🏢</span>
          La metáfora que cambia todo
        </h2>
        
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Imaginá tu vida como un edificio. Tiene un <strong className="text-blue-700">techo</strong> (tu mejor versión) y tiene un <strong className="text-red-700">suelo</strong> (tu peor versión).
        </p>

        <div className="bg-white p-6 rounded-lg border-2 border-blue-300 mb-6">
          <p className="font-bold text-gray-900 mb-4">Ejemplo con alimentación:</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏔️</span>
              <div>
                <p className="font-semibold text-blue-700">Tu techo:</p>
                <p className="text-sm text-gray-600">Ese día que comiste súper sano, hiciste ejercicio, dormiste 8 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🕳️</span>
              <div>
                <p className="font-semibold text-red-700">Tu suelo:</p>
                <p className="text-sm text-gray-600">Ese día que te comiste la pizza entera viendo series hasta las 3AM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-5 rounded-lg mb-6">
          <p className="text-gray-800 font-medium mb-3">
            Ahora viene lo importante: <strong className="text-blue-700">la mayoría de la gente intenta elevar el techo.</strong>
          </p>
          <p className="text-gray-700 mb-3">
            "Voy a correr un maratón", "Voy a comer 100% vegano", "Voy a despertar a las 5AM todos los días".
          </p>
          <p className="text-gray-700 mb-3">
            Y está bien tener metas ambiciosas. El problema es que <strong className="text-red-700">tu vida real no la define el techo. La define el suelo.</strong>
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-indigo-300 mb-6">
          <p className="font-bold text-gray-900 mb-3">¿Por qué?</p>
          <p className="text-gray-700 mb-3">
            Porque el techo es lo que hacés en tus mejores días (cuando estás motivado, descansado, con energía).
          </p>
          <p className="text-gray-700 mb-3">
            Pero el suelo es lo que hacés en tus peores días (cuando estás cansado, estresado, triste).
          </p>
          <p className="text-gray-800 font-bold">
            Y todos tenemos más días promedio y malos que días perfectos.
          </p>
        </div>

        <p className="text-gray-700 mb-4 font-medium">
          💡 Probá mover los controles para ver cómo tu promedio depende más del suelo que del techo:
        </p>

        {/* Visualización interactiva */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mb-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="mb-4">
                <div className="text-6xl mb-2">🏔️</div>
                <p className="font-bold text-blue-600 text-lg">Techo</p>
                <p className="text-3xl font-bold text-gray-900">{techoValue}%</p>
                <p className="text-xs text-gray-600 mt-1">Tus mejores días</p>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={techoValue}
                onChange={(e) => setTechoValue(Number(e.target.value))}
                className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-5xl mb-3">⚖️</div>
              <div className="bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Tu promedio real:</p>
                <p className="text-4xl font-bold text-gray-900">{promedio}%</p>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                {promedio >= 70 && "🎉 Promedio alto!"}
                {promedio >= 50 && promedio < 70 && "⚖️ Promedio medio"}
                {promedio < 50 && "💪 Hay que elevar el suelo"}
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="text-6xl mb-2">🕳️</div>
                <p className="font-bold text-red-600 text-lg">Suelo</p>
                <p className="text-3xl font-bold text-gray-900">{sueloValue}%</p>
                <p className="text-xs text-gray-600 mt-1">Tus peores días</p>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={sueloValue}
                onChange={(e) => setSueloValue(Number(e.target.value))}
                className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
            <p className="text-center text-gray-800 font-medium">
              💡 Fijate cómo aunque el techo sea alto, si el suelo es bajo, el promedio también baja.
              <br />
              <strong className="text-indigo-600">Elevar el suelo tiene más impacto que elevar el techo.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Elevá tu Suelo - MEJORADO */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🎯</span>
          Definí tu nuevo suelo (sin volverlo tóxico)
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Acá viene la parte práctica: vas a elegir un área de tu vida y definir un nuevo suelo.
        </p>

        <div className="bg-yellow-50 border-2 border-yellow-300 p-5 rounded-lg mb-6">
          <p className="font-bold text-gray-900 mb-3">
            ⚠️ Importante: Tu nuevo suelo no es "la perfección"
          </p>
          <p className="text-gray-700">
            Es tu <strong>mínimo aceptable</strong>, incluso en un mal día. Si lo ponés demasiado alto, vas a fracasar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
            <p className="font-bold text-red-700 mb-3">❌ Suelos mal definidos (demasiado extremos):</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>"Nunca como procesados, sin excusas"</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>"Ahorro el 50% de mi sueldo siempre"</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>"Entreno 2 horas diarias sin falta"</span>
              </li>
            </ul>
            <p className="text-xs text-red-600 mt-3 italic">Estos suelos son techos disfrazados. Si te los ponés como mínimos, vas a fracasar.</p>
          </div>

          <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
            <p className="font-bold text-green-700 mb-3">✅ Suelos bien definidos (realistas pero elevados):</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>"Aunque coma mal, incluyo al menos una comida con verduras al día"</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>"Aunque gaste de más, nunca toco mi cuenta de ahorros"</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>"Aunque no vaya al gym, hago mínimo 10 minutos de movimiento"</span>
              </li>
            </ul>
            <p className="text-xs text-green-600 mt-3 italic">Estos suelos SÍ son sostenibles, incluso en tus peores días.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-green-400 mb-6">
          <p className="font-bold text-gray-900 mb-2 text-center">
            💡 La clave:
          </p>
          <p className="text-gray-800 text-center text-lg">
            Tu nuevo suelo tiene que ser algo que <strong className="text-green-700">SÍ puedas cumplir en tu peor día</strong>.
          </p>
        </div>

        <p className="text-gray-700 font-medium mb-4">
          Elegí tu área y definí tu nuevo suelo:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                selectedArea === area.id
                  ? 'bg-indigo-100 border-indigo-400 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="text-3xl mb-2">{area.icon}</div>
              <p className="font-semibold text-gray-900">{area.name}</p>
            </button>
          ))}
        </div>

        {selectedArea && selectedAreaData && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
                <p className="text-sm font-bold text-red-600 mb-3">🕳️ TU SUELO ACTUAL</p>
                <p className="text-gray-800 font-medium mb-2">{selectedAreaData.oldFloor}</p>
                <p className="text-xs text-gray-600 italic">Lo que tolerás en tus peores días</p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <p className="text-sm font-bold text-green-600 mb-3">🏔️ TU NUEVO SUELO</p>
                <textarea
                  value={newFloor}
                  onChange={(e) => setNewFloor(e.target.value)}
                  placeholder={selectedAreaData.newFloor}
                  className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-400 focus:outline-none min-h-[80px] text-gray-800"
                />
                <p className="text-xs text-gray-600 mt-2 italic">Tu mínimo aceptable de ahora en adelante (realista)</p>
              </div>
            </div>

            <button
              onClick={() => setShowMapping(!showMapping)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg"
            >
              {showMapping ? '👁️ Ocultar preguntas reflexivas' : '💭 Ver preguntas para profundizar'}
            </button>

            {showMapping && (
              <div className="bg-white p-6 rounded-lg border-2 border-indigo-300 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg">🤔 Preguntate con honestidad:</h3>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-900 mb-2">1. ¿La versión actual de mí puede lograr mi meta?</p>
                    <p className="text-sm text-gray-600">Si la respuesta es no... es una señal de que necesitás evolucionar</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <p className="font-semibold text-gray-900 mb-2">2. ¿Cómo piensa la versión de mí que sí puede?</p>
                    <p className="text-sm text-gray-600">Intentá visualizar cómo esa persona ve los problemas y las oportunidades</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <p className="font-semibold text-gray-900 mb-2">3. ¿Qué hace esa versión cuando está cansada o estresada?</p>
                    <p className="text-sm text-gray-600">Ahí se ve el verdadero suelo de alguien</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                    <p className="font-semibold text-gray-900 mb-2">4. ¿Qué ya no voy a tolerar de mí mismo?</p>
                    <p className="text-sm text-gray-600">Definí tus nuevos límites no negociables (pero realistas)</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-5 rounded-lg mt-4">
                  <p className="text-gray-800 font-medium text-center">
                    🌱 Con pequeños pasos sostenidos, empezás a convertirte en esa versión.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conclusión mejorada */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">💡 Una verdad incómoda (pero liberadora)</h2>
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p className="text-lg">
            Escuché muchas veces esta frase y la primera vez me cayó mal:
          </p>
          <p className="text-3xl font-bold text-yellow-300">
            "No obtenés lo que querés. Obtenés lo que tolerás."
          </p>
          <p className="text-lg mt-6">
            Suena a que todo lo malo en tu vida es "tu culpa" por tolerarlo.
          </p>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg mb-4">
            <strong>Pero cuando lo entendí mejor, me cambió la perspectiva:</strong>
          </p>
          <p className="text-lg mb-4">
            No se trata de culpa. Se trata de estándares.
          </p>
          <div className="space-y-2 text-left mb-4">
            <p className="text-base">• Si tolerás saltarte el gym 5 veces por semana, tu cuerpo refleja eso.</p>
            <p className="text-base">• Si tolerás gastar más de lo que ganás, tu cuenta bancaria refleja eso.</p>
            <p className="text-base">• Si tolerás que te falten el respeto, tus relaciones reflejan eso.</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="font-bold mb-2">La pregunta no es:</p>
            <p className="mb-4">"¿Por qué no logro lo que quiero?"</p>
            <p className="font-bold mb-2">La pregunta es:</p>
            <p className="text-yellow-300 font-bold text-xl">"¿Qué estoy tolerando que está saboteando lo que quiero?"</p>
          </div>
          <p className="text-lg mt-4">
            Y cuando identificás eso... tenés poder real para cambiarlo.
          </p>
        </div>
      </div>

      {/* Manifiesto personal */}
      <div className="bg-gray-900 text-white p-8 rounded-xl border-2 border-gray-700">
        <h3 className="text-2xl font-bold mb-6 text-amber-400 text-center">📜 Tu nuevo manifiesto personal</h3>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-lg">Si me equivoco, <strong className="text-green-400">aprendo y vuelvo más preparado.</strong></p>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-lg">Si dudo, <strong className="text-blue-400">actúo igual.</strong></p>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-lg">Si me distraigo, <strong className="text-purple-400">vuelvo a centrarme.</strong></p>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg border-2 border-amber-400">
            <p className="text-lg">Y si caigo por debajo de mi nuevo suelo, <strong className="text-yellow-400">me perdono...</strong></p>
            <p className="text-lg mt-2"><strong className="text-amber-400">pero no me permito quedarme ahí.</strong></p>
          </div>
        </div>
      </div>

      {/* Bonus prompt mejorado */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">💬 BONUS: Tu Prompt Personalizado</h3>
        <p className="text-gray-300 mb-4">
          Usá este prompt en ChatGPT o Claude para diseñar tu plan de elevación de suelo.
          {selectedArea && ' Ya incluye tu área y tus respuestas:'}
        </p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 mb-4">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {selectedArea ? 
              `Hola. Quiero trabajar en elevar mis estándares mínimos (mi 'suelo') en diferentes áreas de mi vida.

Te cuento mi situación actual:

Área en la que quiero mejorar: ${selectedAreaData?.name}

Mi suelo actual (lo que tolero en mis peores días):
"${selectedAreaData?.oldFloor}"

El suelo que quiero establecer (realista pero elevado):
"${newFloor || selectedAreaData?.newFloor}"

¿Podrías ayudarme a:
1. Identificar qué patrones mentales o creencias están manteniendo mi suelo actual bajo
2. Diseñar 3-5 "reglas irrompibles" simples que eleven mi suelo de forma sostenible
3. Sugerirme cómo responder cuando sienta que voy a bajar de ese nuevo suelo

Necesito que sea práctico y realista, sin perfeccionismo ni exigencias imposibles.`
              :
              `Hola. Quiero trabajar en elevar mis estándares mínimos (mi 'suelo') en diferentes áreas de mi vida.

Te cuento mi situación actual:

Área en la que quiero mejorar: [Elige un área arriba primero]

Mi suelo actual (lo que tolero en mis peores días):
"[Tu comportamiento en tus peores días]"

El suelo que quiero establecer (realista pero elevado):
"[Tu nuevo mínimo aceptable]"

¿Podrías ayudarme a:
1. Identificar qué patrones mentales o creencias están manteniendo mi suelo actual bajo
2. Diseñar 3-5 "reglas irrompibles" simples que eleven mi suelo de forma sostenible
3. Sugerirme cómo responder cuando sienta que voy a bajar de ese nuevo suelo

Necesito que sea práctico y realista, sin perfeccionismo ni exigencias imposibles.`
            }
          </p>
        </div>
        <button 
          onClick={copyPrompt}
          className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {copiedPrompt ? (
            <>
              <span>✓</span>
              <span>¡Copiado al portapapeles!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>{selectedArea ? 'Copiar mi prompt personalizado' : 'Primero elegí un área arriba ☝️'}</span>
            </>
          )}
        </button>
        
        {selectedArea && (
          <div className="mt-6 bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
            <p className="text-sm text-amber-200 flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Tu prompt incluye:</strong> Tu área prioritaria ({selectedAreaData?.name}), 
                tu suelo actual y tu nuevo suelo. La IA te ayudará a diseñar un plan realista y sostenible.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Resumen final */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          🔑 Para llevar de este módulo
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🎢</div>
            <h3 className="font-bold text-gray-900 mb-2">El loop del yo-yo</h3>
            <p className="text-sm text-gray-600">Todos oscilamos entre versión A y B. Tu vida es tu promedio, no tus picos.</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🏢</div>
            <h3 className="font-bold text-gray-900 mb-2">Techo vs Suelo</h3>
            <p className="text-sm text-gray-600">Tu vida la define tu suelo (peores días), no tu techo (mejores días)</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="font-bold text-gray-900 mb-2">Elevar el suelo</h3>
            <p className="text-sm text-gray-600">Definí tu nuevo mínimo aceptable (realista, no perfecto)</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="font-bold text-gray-900 mb-2">Evolucionar con compasión</h3>
            <p className="text-sm text-gray-600">Me perdono cuando caigo, pero no me permito quedarme ahí</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const cadenasMetadata = {
  id: 5,
  title: "Cadenas",
  type: "document" as const,
  duration: "20 min"
};