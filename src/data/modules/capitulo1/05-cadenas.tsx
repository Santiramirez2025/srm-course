import React, { useState } from 'react';

export const CadenasContent = () => {
  const [techoValue, setTechoValue] = useState(80);
  const [sueloValue, setSueloValue] = useState(30);
  const [selectedArea, setSelectedArea] = useState('');
  const [newFloor, setNewFloor] = useState('');
  const [showMapping, setShowMapping] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const areas = [
    { id: 'salud', name: 'Salud', icon: '💪', oldFloor: 'Como mal cuando estoy estresado', newFloor: 'Nunca como procesados, sin excusas' },
    { id: 'finanzas', name: 'Finanzas', icon: '💰', oldFloor: 'Gasto todo lo que gano', newFloor: 'Ahorro mínimo 20% siempre' },
    { id: 'relaciones', name: 'Relaciones', icon: '❤️', oldFloor: 'Tolero que me falten el respeto', newFloor: 'Comunico límites con claridad' },
    { id: 'productividad', name: 'Productividad', icon: '⚡', oldFloor: 'Procrastino cuando no tengo ganas', newFloor: 'Trabajo mínimo 2h enfocado diario' }
  ];

  const promedio = Math.round((techoValue + sueloValue) / 2);
  const selectedAreaData = areas.find(a => a.id === selectedArea);

  const copyPrompt = () => {
    const prompt = `🔓 Actuá como un entrenador mental de élite.

Observá mi identidad actual y decime con total honestidad: ¿Qué creencias, hábitos o formas de pensar me están frenando en mi salud, finanzas, relaciones y productividad?

Ayudame a definir un "suelo mínimo" para cada área: reglas internas simples pero irrompibles que eleven mi estándar, incluso en mis peores días.

${selectedArea ? `Área prioritaria: ${selectedAreaData?.name}
Mi suelo actual: ${selectedAreaData?.oldFloor}
Mi nuevo suelo: ${newFloor || selectedAreaData?.newFloor}` : ''}

Quiero que ese nuevo nivel me empuje a crecer, sin excusas. Sé claro, concreto y directo.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          ⛓️ Cadenas
        </h1>
        <p className="text-2xl text-red-600 font-medium">
          Rompé el ciclo. Elevá tu suelo.
        </p>
      </div>

      {/* Hook brutal */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          👁️ ¿Quién sos cuando nadie te mira?
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-4">
          ¿Quién creés que sos... y quién sos en realidad?
        </p>
        <div className="bg-white p-5 rounded-lg border-2 border-red-300">
          <p className="text-lg text-gray-800 mb-3">
            No sos un nombre, ni un título, ni una historia fija.
          </p>
          <p className="text-lg text-gray-800 font-bold">
            Sos una construcción mental hecha de creencias, hábitos y opiniones prestadas.
          </p>
          <p className="text-red-600 text-xl font-bold mt-3 text-center">
            La identidad no es un destino. Es un hábito.
          </p>
        </div>
      </div>

      {/* Verdad brutal */}
      <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
        <p className="text-2xl font-bold mb-4">
          La mayoría no cambia porque cree que no puede cambiar.
        </p>
        <div className="bg-red-900/30 border-2 border-red-500/50 p-6 rounded-lg inline-block">
          <p className="text-xl mb-2">Pero la verdad es brutal:</p>
          <p className="text-3xl font-bold text-red-400">
            No alcanzás metas, te convertís en alguien nuevo.
          </p>
        </div>
        <p className="text-lg text-gray-300 mt-6">
          Cada resultado que tenés afuera, empezó con quien decidiste ser adentro.
        </p>
      </div>

      {/* El Loop - Visual del ciclo */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🔄</span>
          En Loop
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          ¿Te pasa que avanzás... y después te autosaboteás? 
          <strong className="text-orange-600"> Subís. Caés. Volvés a empezar.</strong>
        </p>

        <div className="bg-white p-6 rounded-lg border-2 border-orange-300 mb-6">
          <p className="text-gray-900 font-bold mb-4 text-center">
            ⚠️ Vivís atrapado en una oscilación constante entre dos versiones de vos:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
              <div className="text-4xl mb-3 text-center">😇</div>
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
              <div className="text-4xl mb-3 text-center">😈</div>
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
                  <span>Destructivo</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg text-center">
            <p className="text-gray-800 font-medium">
              🔁 Estos dos "yo" se turnan como si tuviesen un acuerdo secreto.
            </p>
            <p className="text-orange-700 font-bold mt-2">
              Mientras no rompas ese ciclo, tu vida seguirá girando en círculos.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border-l-4 border-orange-500">
          <p className="text-gray-800 font-medium text-lg">
            💡 No se trata de motivación. <br/>
            <strong className="text-orange-600">Se trata de promedio.</strong>
          </p>
          <p className="text-gray-700 mt-2">
            Si querés cambiar tu vida, tenés que cambiar tu promedio emocional y conductual.
          </p>
        </div>
      </div>

      {/* Techo vs Suelo - INTERACTIVO */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">📊</span>
          Techo vs. Suelo
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Tu vida se mueve entre dos niveles. Ajustá los controles para ver tu promedio real:
        </p>

        {/* Visualización interactiva */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mb-6">
          <div className="relative h-80 bg-gradient-to-b from-blue-100 to-red-100 rounded-lg p-4 mb-6">
            {/* Techo */}
            <div 
              className="absolute left-0 right-0 transition-all duration-500"
              style={{ top: `${100 - techoValue}%` }}
            >
              <div className="flex items-center justify-between bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="font-bold">🏔️ TECHO (Mejor versión)</span>
                <span className="text-xl font-bold">{techoValue}%</span>
              </div>
            </div>

            {/* Promedio */}
            <div 
              className="absolute left-0 right-0 transition-all duration-500"
              style={{ top: `${100 - promedio}%` }}
            >
              <div className="flex items-center justify-between bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-lg border-2 border-yellow-600">
                <span className="font-bold">📍 TU PROMEDIO</span>
                <span className="text-xl font-bold">{promedio}%</span>
              </div>
            </div>

            {/* Suelo */}
            <div 
              className="absolute left-0 right-0 transition-all duration-500"
              style={{ top: `${100 - sueloValue}%` }}
            >
              <div className="flex items-center justify-between bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="font-bold">🕳️ SUELO (Peor versión)</span>
                <span className="text-xl font-bold">{sueloValue}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏔️ Tu TECHO (mejor versión): {techoValue}%
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={techoValue}
                onChange={(e) => setTechoValue(Number(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-1">Motivado, enfocado, haciendo todo bien</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🕳️ Tu SUELO (peor versión): {sueloValue}%
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={sueloValue}
                onChange={(e) => setSueloValue(Number(e.target.value))}
                className="w-full h-2 bg-red-200 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-1">Lo mínimo que tolerás sin sentir que todo se derrumba</p>
            </div>
          </div>

          <div className="mt-6 p-5 rounded-lg" style={{ 
            backgroundColor: promedio > 60 ? '#dcfce7' : promedio > 40 ? '#fef3c7' : '#fee2e2',
            border: `2px solid ${promedio > 60 ? '#22c55e' : promedio > 40 ? '#f59e0b' : '#ef4444'}`
          }}>
            <p className="font-bold text-gray-900 mb-2">📊 Tu promedio real de vida:</p>
            <p className="text-2xl font-bold" style={{ 
              color: promedio > 60 ? '#15803d' : promedio > 40 ? '#b45309' : '#dc2626'
            }}>
              {promedio}%
            </p>
            <p className="text-sm text-gray-700 mt-2">
              {promedio > 60 
                ? '✅ Promedio saludable. Estás construyendo bien.' 
                : promedio > 40 
                ? '⚠️ Promedio medio. Hay potencial de mejora.'
                : '🚨 Promedio bajo. Tu suelo te está arrastrando.'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-lg border-2 border-blue-300">
          <p className="text-xl font-bold text-gray-900 mb-3 text-center">
            🎯 Lo importante no es tu mejor momento.
          </p>
          <p className="text-lg text-gray-800 text-center">
            <strong className="text-blue-600">Lo importante es lo peor que estás dispuesto a aceptar.</strong>
          </p>
          <p className="text-gray-700 mt-4 text-center">
            No vivís en el techo, vivís entre el techo y el suelo. <br/>
            Si ese suelo es bajo, tu promedio también lo va a ser.
          </p>
        </div>
      </div>

      {/* La clave */}
      <div className="bg-gray-900 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">💡 Entonces, ¿la clave cuál es?</h2>
        
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded-lg">
            <p className="text-2xl font-bold text-red-400 mb-3 text-center">
              No es soñar más alto.
            </p>
            <p className="text-3xl font-bold text-green-400 text-center">
              Es no aceptar menos de vos mismo.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 p-6 rounded-lg">
            <p className="text-xl text-gray-200 leading-relaxed text-center">
              Cuando decidís que tu nueva "peor versión" es mejor que la anterior, 
              <strong className="text-yellow-300"> automáticamente toda tu vida mejora</strong>, 
              incluso sin hacer grandes cambios.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-lg">
            <p className="text-lg font-bold text-white mb-2">📌 Para recordar:</p>
            <p className="text-gray-200">
              Tu verdadero poder no está en lo que podés lograr, 
              <strong className="text-yellow-300"> sino en lo que ya no estás dispuesto a tolerar.</strong>
            </p>
          </div>

          <div className="text-center bg-purple-900/30 border-2 border-purple-500/50 p-6 rounded-lg">
            <p className="text-2xl font-bold text-purple-300">
              Los grandes no sueñan más alto. <br/>
              <span className="text-white">Se exigen más abajo.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Creencias */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🧠</span>
          Está en lo que creés
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Tus acciones son el reflejo de tus creencias. Y esas creencias están divididas en tres niveles:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg border-2 border-blue-300">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-bold text-gray-900 mb-2">Sobre el mundo</h3>
            <p className="text-sm text-gray-600">Cómo funciona la realidad</p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-green-300">
            <div className="text-3xl mb-3">🧍‍♂️</div>
            <h3 className="font-bold text-gray-900 mb-2">Sobre vos mismo</h3>
            <p className="text-sm text-gray-600">Quién creés que sos</p>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-orange-300">
            <div className="text-3xl mb-3">🔁</div>
            <h3 className="font-bold text-gray-900 mb-2">Sobre lo que hacés</h3>
            <p className="text-sm text-gray-600">Tu relación con la acción</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
          <p className="font-bold text-gray-900 mb-3">📌 Ejemplo del ciclo:</p>
          <div className="space-y-2 text-gray-700">
            <p>1. Creés que vender es difícil</p>
            <p>2. Evitás vender por esa creencia</p>
            <p>3. No vendés (resultado lógico)</p>
            <p>4. Te confirmás: "¿Ves? Vender ES difícil"</p>
          </div>
          <p className="text-purple-700 font-bold mt-4 text-center">
            🔄 Tu realidad se forma con lo que creés adentro, no con lo que pasa afuera.
          </p>
        </div>
      </div>

      {/* Mapeo de identidad - EJERCICIO */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🗺️</span>
          Mapeo de Identidad
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Elegí un área donde querés elevar tu suelo mínimo:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`p-5 rounded-lg border-2 transition-all text-left ${
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
                <p className="text-sm font-bold text-red-600 mb-3">🕳️ SUELO ACTUAL (Lo que tolerás)</p>
                <p className="text-gray-800 font-medium">{selectedAreaData.oldFloor}</p>
                <p className="text-xs text-gray-600 mt-2 italic">Tu peor versión en esta área</p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <p className="text-sm font-bold text-green-600 mb-3">🏔️ NUEVO SUELO (Tu nuevo mínimo)</p>
                <textarea
                  value={newFloor}
                  onChange={(e) => setNewFloor(e.target.value)}
                  placeholder={selectedAreaData.newFloor}
                  className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-400 focus:outline-none min-h-[60px] text-gray-800"
                />
                <p className="text-xs text-gray-600 mt-2 italic">Lo mínimo que aceptarás de ahora en adelante</p>
              </div>
            </div>

            <button
              onClick={() => setShowMapping(!showMapping)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg"
            >
              {showMapping ? '👁️ Ocultar preguntas' : '🔮 Ver preguntas de transformación'}
            </button>

            {showMapping && (
              <div className="bg-white p-6 rounded-lg border-2 border-indigo-300 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg">🎯 Preguntate con honestidad:</h3>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="font-semibold text-gray-900 mb-2">❓ ¿Este yo puede lograr mi meta?</p>
                    <p className="text-sm text-gray-600">Si la respuesta es no... es una oportunidad de evolucionar</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    <p className="font-semibold text-gray-900 mb-2">🧠 ¿Cómo piensa el "yo que sí puede"?</p>
                    <p className="text-sm text-gray-600">Visualizá su forma de ver los problemas y oportunidades</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <p className="font-semibold text-gray-900 mb-2">💪 ¿Qué hace cuando está cansado?</p>
                    <p className="text-sm text-gray-600">Ahí se ve el verdadero suelo de alguien</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                    <p className="font-semibold text-gray-900 mb-2">🚫 ¿Qué tolera y qué ya no permite?</p>
                    <p className="text-sm text-gray-600">Define tus nuevos límites no negociables</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-5 rounded-lg mt-4">
                  <p className="text-gray-800 font-medium text-center">
                    🔄 Y paso a paso, empezás a convertirte en esa versión.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conclusión poderosa */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">🧩 Esto no es autoayuda</h2>
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p className="text-2xl font-bold">
            No obtenés lo que querés.
          </p>
          <p className="text-3xl font-bold text-yellow-300">
            Obtenés lo que tolerás.
          </p>
          <p className="text-lg mt-6">
            Tu verdadero progreso no empieza cuando soñás más grande... <br/>
            <strong>Empieza cuando dejás de tolerar tus versiones más pequeñas.</strong>
          </p>
        </div>
      </div>

      {/* Manifiesto personal */}
      <div className="bg-gray-900 text-white p-8 rounded-xl border-2 border-gray-700">
        <h3 className="text-2xl font-bold mb-6 text-amber-400 text-center">📜 Tu nuevo manifiesto</h3>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="bg-white/10 p-4 rounded-lg italic">
            <p className="text-lg">Si me equivoco, <strong className="text-green-400">aprendo y vuelvo más preparado.</strong></p>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg italic">
            <p className="text-lg">Si dudo, <strong className="text-blue-400">actúo rápido.</strong></p>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg italic">
            <p className="text-lg">Si me distraigo, <strong className="text-purple-400">vuelvo a mí.</strong></p>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg italic">
            <p className="text-lg">Y si me alejo de lo que soy, <strong className="text-yellow-400">me perdono...</strong></p>
            <p className="text-lg mt-2"><strong className="text-red-400">pero no me permito quedarme ahí.</strong></p>
          </div>
        </div>
      </div>

      {/* Bonus prompt */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">🔓 BONUS: Prompt de Elevación de Suelo</h3>
        <p className="text-gray-300 mb-4">
          Usá este prompt en ChatGPT o Claude para definir tus nuevos mínimos:
        </p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {`🔓 Actuá como un entrenador mental de élite.

Observá mi identidad actual y decime con total honestidad: ¿Qué creencias, hábitos o formas de pensar me están frenando en mi salud, finanzas, relaciones y productividad?

Ayudame a definir un "suelo mínimo" para cada área: reglas internas simples pero irrompibles que eleven mi estándar, incluso en mis peores días.

Quiero que ese nuevo nivel me empuje a crecer, sin excusas. Sé claro, concreto y directo.`}
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
              <span>{selectedArea ? 'Copiar prompt personalizado' : 'Copiar prompt general'}</span>
            </>
          )}
        </button>
        
        {selectedArea && (
          <div className="mt-6 bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
            <p className="text-sm text-amber-200 flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Tu prompt incluye:</strong> Tu área prioritaria ({selectedAreaData?.name}), 
                tu suelo actual y tu nuevo suelo mínimo. La IA te ayudará a diseñar reglas irrompibles.
              </span>
            </p>
          </div>
        )}
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