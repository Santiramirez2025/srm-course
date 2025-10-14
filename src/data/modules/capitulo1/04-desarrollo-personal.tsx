import React, { useState } from 'react';

export const DesarrolloPersonalContent = () => {
  const [balanceGreen, setBalanceGreen] = useState(50);
  const [selectedArea, setSelectedArea] = useState('');
  const [oldBeliefs, setOldBeliefs] = useState('');
  const [newIdentity, setNewIdentity] = useState('');
  const [showTransformation, setShowTransformation] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const areas = [
    { id: 'dinero', name: 'Dinero', icon: '💰', limitante: 'Siempre fui malo con el dinero', potenciadora: 'Soy capaz de generar y administrar riqueza' },
    { id: 'amor', name: 'Amor', icon: '❤️', limitante: 'No merezco amor verdadero', potenciadora: 'Soy digno de amor profundo y recíproco' },
    { id: 'creatividad', name: 'Creatividad', icon: '🎨', limitante: 'No soy creativo', potenciadora: 'La creatividad fluye naturalmente en mí' },
    { id: 'liderazgo', name: 'Liderazgo', icon: '👑', limitante: 'No puedo liderar', potenciadora: 'Inspiro y guío a otros con confianza' },
    { id: 'salud', name: 'Salud', icon: '💪', limitante: 'Mi cuerpo no responde', potenciadora: 'Mi cuerpo es fuerte y resiliente' },
    { id: 'hablar', name: 'Hablar en público', icon: '🎤', limitante: 'Me paraliza hablar en público', potenciadora: 'Me expreso con claridad y seguridad' }
  ];

  const handleAreaSelect = (areaId: string) => {
    setSelectedArea(areaId);
    const area = areas.find(a => a.id === areaId);
    if (area) {
      setOldBeliefs(area.limitante);
      setNewIdentity(area.potenciadora);
    }
  };

  const handleBalanceChange = (value: number) => {
    setBalanceGreen(value);
  };

  const copyPrompt = () => {
    const prompt = `🔓 Ayúdame a identificar qué creencias están sosteniendo la versión de mí que ya no quiero ser.

¿Qué nueva identidad necesito empezar a practicar, aunque hoy todavía no me la crea del todo?

Área de trabajo: ${areas.find(a => a.id === selectedArea)?.name || 'General'}
Creencia actual que me limita: ${oldBeliefs}
Nueva identidad que quiero encarnar: ${newIdentity}

Sé claro, directo y concreto.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const selectedAreaData = areas.find(a => a.id === selectedArea);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🧠 Desarrollo Personal
        </h1>
        <p className="text-2xl text-purple-600 font-medium">
          La verdad sobre tu identidad y tu poder
        </p>
      </div>

      {/* El Origen - Hook brutal */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ⚡ El Origen
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Imaginá que hay una fuerza invisible, salvaje, casi indomable, que decide cuánto dinero ganás, 
          cuán feliz sos, qué relaciones tenés, cómo reaccionás, qué resultados obtenés.
        </p>
        <p className="text-2xl font-bold text-red-600 text-center py-4">
          Esa fuerza... sos vos.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          No es tu infancia. No son tus padres. No es tu ansiedad. No es el país, ni tus clientes, ni tu edad. 
          <strong className="text-red-700"> Sos vos.</strong>
        </p>
        <div className="mt-6 bg-white p-5 rounded-lg border-2 border-red-300">
          <p className="text-gray-800 font-medium text-center">
            💎 Y aunque duela, esa verdad es un regalo. Porque si el origen está en vos, 
            <strong className="text-red-600"> el poder también.</strong>
          </p>
        </div>
      </div>

      {/* El verdadero enemigo */}
      <div className="bg-gray-900 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <span className="text-4xl">🎭</span>
          El Verdadero Enemigo
        </h2>
        
        <div className="space-y-4">
          <p className="text-xl text-gray-200 leading-relaxed">
            Tu cerebro no distingue entre lo que viviste, lo que imaginaste o lo que temés.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Recordás una vergüenza</p>
              <p className="text-white font-medium">→ Tu cuerpo se contrae</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Visualizás un fracaso</p>
              <p className="text-white font-medium">→ Tu corazón late más fuerte</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Cada experiencia, real o no</p>
              <p className="text-white font-medium">→ Deja una huella</p>
            </div>
          </div>

          <div className="bg-red-900/30 border-2 border-red-500/50 p-5 rounded-lg mt-6">
            <p className="text-lg font-bold text-red-300 mb-3">La cadena de tu identidad:</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-lg">
              <span className="text-white">Experiencias</span>
              <span className="text-red-400">→</span>
              <span className="text-white">Creencias</span>
              <span className="text-red-400">→</span>
              <span className="text-yellow-300 font-bold">TU IDENTIDAD</span>
            </div>
            <p className="text-gray-300 mt-4 text-center italic">
              Literalmente, sos el eco de lo que creíste una y otra vez.
            </p>
          </div>
        </div>
      </div>

      {/* Las Balanzas - INTERACTIVO */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">⚖️</span>
          Las Balanzas de tu Identidad
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Imaginá que estás sobre una balanza, con dos vasos en las manos: uno verde para las experiencias positivas 
          y uno rojo para las negativas. El vaso que pese más... define tu identidad en ese tema.
        </p>

        {/* Balanza visual interactiva */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 mb-6">
          <p className="text-center text-sm font-medium text-gray-600 mb-4">
            Moviendo el control, ves cómo cambia tu identidad según tus experiencias acumuladas:
          </p>
          
          <div className="flex items-end justify-center gap-8 mb-6">
            <div className="text-center">
              <div 
                className="w-24 bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg mx-auto transition-all duration-500"
                style={{ height: `${balanceGreen * 2}px` }}
              />
              <div className="w-24 h-32 border-4 border-green-500 border-t-0 rounded-b-lg mx-auto" />
              <p className="mt-2 text-sm font-bold text-green-600">Experiencias +</p>
              <p className="text-xs text-gray-600">{balanceGreen}%</p>
            </div>

            <div className="text-6xl mb-8">⚖️</div>

            <div className="text-center">
              <div 
                className="w-24 bg-gradient-to-t from-red-500 to-red-300 rounded-t-lg mx-auto transition-all duration-500"
                style={{ height: `${(100 - balanceGreen) * 2}px` }}
              />
              <div className="w-24 h-32 border-4 border-red-500 border-t-0 rounded-b-lg mx-auto" />
              <p className="mt-2 text-sm font-bold text-red-600">Experiencias -</p>
              <p className="text-xs text-gray-600">{100 - balanceGreen}%</p>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={balanceGreen}
            onChange={(e) => handleBalanceChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          />

          <div className="mt-4 p-4 rounded-lg border-2 transition-all duration-500" 
               style={{ 
                 backgroundColor: balanceGreen > 60 ? '#dcfce7' : balanceGreen > 40 ? '#fef3c7' : '#fee2e2',
                 borderColor: balanceGreen > 60 ? '#22c55e' : balanceGreen > 40 ? '#f59e0b' : '#ef4444'
               }}>
            <p className="font-bold text-gray-900 mb-2">Tu identidad resultante:</p>
            <p className="text-gray-700">
              {balanceGreen > 60 
                ? '✅ "Soy bueno en esto. Puedo lograrlo."' 
                : balanceGreen > 40 
                ? '⚠️ "A veces funciona, a veces no."'
                : '❌ "No soy bueno en esto. Mejor ni intento."'}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border-l-4 border-green-500">
          <p className="text-gray-800 font-medium">
            💡 Tu identidad en cualquier tema (dinero, amor, creatividad) es el resultado acumulado de lo que 
            sentiste, creíste y repetiste... <strong className="text-green-600">una y otra vez.</strong>
          </p>
        </div>
      </div>

      {/* La identidad sólida - La trampa */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🔒</span>
          La Identidad Sólida: La Trampa
        </h2>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Acá empieza la verdadera trampa: <strong>te creés tu historia.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg border-2 border-red-300">
              <p className="font-bold text-red-600 mb-2">❌ Las frases que te encierran:</p>
              <div className="space-y-2 text-gray-700 text-sm">
                <p className="italic">"Soy así y punto."</p>
                <p className="italic">"Siempre fui malo con el dinero."</p>
                <p className="italic">"No sirvo para hablar en público."</p>
                <p className="italic">"No puedo cambiar a esta altura."</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border-2 border-blue-300">
              <p className="font-bold text-blue-600 mb-2">⚠️ La sociedad te lo refuerza:</p>
              <div className="space-y-2 text-gray-700 text-sm">
                <p className="italic">"Sé auténtico."</p>
                <p className="italic">"Amate tal como sos."</p>
                <p className="italic">"No cambies."</p>
                <p className="italic">"Sé fiel a ti mismo."</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-lg border-2 border-orange-400">
            <p className="text-xl font-bold text-gray-900 text-center mb-3">
              🔥 Pero... ¿y si "quién sos" es justamente lo que te está estancando?
            </p>
            <p className="text-gray-700 text-center font-medium">
              A veces, "ser vos mismo" es la excusa perfecta para no evolucionar.
            </p>
          </div>
        </div>
      </div>

      {/* El conflicto interno */}
      <div className="bg-gray-900 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span className="text-4xl">⚔️</span>
          El Conflicto Interno
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/30 border-2 border-red-500/50 p-6 rounded-lg">
            <div className="text-4xl mb-3 text-center">😰</div>
            <p className="text-lg font-bold text-red-300 mb-3 text-center">Tu YO actual</p>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• "No puedo hacerlo"</p>
              <p>• "Siempre fui así"</p>
              <p>• "Es muy difícil para mí"</p>
              <p>• "No tengo lo que se necesita"</p>
            </div>
          </div>

          <div className="bg-green-900/30 border-2 border-green-500/50 p-6 rounded-lg">
            <div className="text-4xl mb-3 text-center">🚀</div>
            <p className="text-lg font-bold text-green-300 mb-3 text-center">El YO que deberías ser</p>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>• "Lo logro naturalmente"</p>
              <p>• "Estoy en constante evolución"</p>
              <p>• "Es parte de quien soy"</p>
              <p>• "Tengo todo lo necesario"</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/10 p-6 rounded-lg">
          <p className="text-xl font-bold text-yellow-300 mb-3 text-center">
            🔥 Esa fricción, esa incomodidad, ese conflicto...
          </p>
          <p className="text-lg text-center text-white">
            Es la puerta de entrada a tu transformación.
          </p>
        </div>

        <div className="mt-6 bg-purple-900/30 border-2 border-purple-500/50 p-5 rounded-lg">
          <p className="text-lg text-gray-200 text-center">
            No se trata de "hacer más". <br/>
            <strong className="text-purple-300 text-xl">Se trata de convertirte en otro.</strong> <br/>
            En una versión de vos que aún no conocés.
          </p>
        </div>
      </div>

      {/* Transformador de identidad - EJERCICIO */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🦋</span>
          Transformador de Identidad
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Elegí un área donde sentís que tu identidad te está limitando:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => handleAreaSelect(area.id)}
              className={`p-5 rounded-lg border-2 transition-all text-left ${
                selectedArea === area.id
                  ? 'bg-purple-100 border-purple-400 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-purple-300'
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
                <p className="text-sm font-bold text-red-600 mb-3">❌ IDENTIDAD LIMITANTE</p>
                <textarea
                  value={oldBeliefs}
                  onChange={(e) => setOldBeliefs(e.target.value)}
                  className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-400 focus:outline-none min-h-[80px] text-gray-800"
                  placeholder="¿Qué creés sobre vos en esta área?"
                />
                <p className="text-xs text-gray-600 mt-2 italic">La versión que ya no te sirve</p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <p className="text-sm font-bold text-green-600 mb-3">✅ NUEVA IDENTIDAD</p>
                <textarea
                  value={newIdentity}
                  onChange={(e) => setNewIdentity(e.target.value)}
                  className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-400 focus:outline-none min-h-[80px] text-gray-800"
                  placeholder="¿Quién necesitás ser?"
                />
                <p className="text-xs text-gray-600 mt-2 italic">La versión que te lleva a tus metas</p>
              </div>
            </div>

            <button
              onClick={() => setShowTransformation(!showTransformation)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg"
            >
              {showTransformation ? '👁️ Ocultar proceso' : '🔮 Ver proceso de transformación'}
            </button>

            {showTransformation && (
              <div className="bg-white p-6 rounded-lg border-2 border-purple-300 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg">🔄 Tu Plan de Transformación:</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <p className="font-semibold text-gray-900">Reconocé la identidad vieja</p>
                      <p className="text-sm text-gray-600">Aceptá que "{oldBeliefs}" solo es una creencia, no la verdad</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <p className="font-semibold text-gray-900">Llená el vaso verde</p>
                      <p className="text-sm text-gray-600">Creá experiencias pequeñas que validen: "{newIdentity}"</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <p className="font-semibold text-gray-900">Actuá como si ya lo fueras</p>
                      <p className="text-sm text-gray-600">Preguntate: "¿Qué haría alguien que cree '{newIdentity}'?"</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-orange-50 p-4 rounded-lg">
                    <span className="text-2xl">4️⃣</span>
                    <div>
                      <p className="font-semibold text-gray-900">Repetí hasta que sea real</p>
                      <p className="text-sm text-gray-600">Con el tiempo, la nueva identidad se vuelve tu nueva normalidad</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Llama a la acción final */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">🔥 Evolucionar o Repetir</h2>
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            La realidad no se cambia con deseo, <strong>se cambia con identidad.</strong>
          </p>
          <p className="text-2xl font-bold text-yellow-300">
            No vas a lograr lo que querés siendo quien sos hoy.
          </p>
          <p>
            Porque si esta versión tuya fuera capaz... ya lo habría hecho.
          </p>
        </div>
        
        <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg mb-4">
            Entonces, soltá. Soltá la identidad vieja. Soltá las creencias heredadas. 
            Soltá la rigidez de lo que "siempre fuiste".
          </p>
          <p className="text-2xl font-bold">
            Y elegí evolucionar. Convertite en lo que merecés ser.
          </p>
          <p className="text-lg mt-4 text-purple-200">
            No para encajar en el mundo. Para crear el tuyo.
          </p>
        </div>
      </div>

      {/* Resumen de conceptos */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          🔑 Conceptos clave para recordar
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">El origen sos vos</h3>
            <p className="text-sm text-gray-600">Si el problema está en vos, el poder también</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="font-bold text-gray-900 mb-2">Las balanzas</h3>
            <p className="text-sm text-gray-600">Tu identidad = suma de experiencias acumuladas</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-900 mb-2">Identidad sólida</h3>
            <p className="text-sm text-gray-600">"Ser vos mismo" puede ser la trampa que te estanca</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🦋</div>
            <h3 className="font-bold text-gray-900 mb-2">Transformación</h3>
            <p className="text-sm text-gray-600">No hacer más, sino convertirte en otro</p>
          </div>
        </div>
      </div>

      {/* Bonus prompt */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">🔓 BONUS: Prompt de Transformación de Identidad</h3>
        <p className="text-gray-300 mb-4">
          Usá este prompt en ChatGPT o Claude para profundizar tu transformación:
        </p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {`🔓 Ayúdame a identificar qué creencias están sosteniendo la versión de mí que ya no quiero ser.

¿Qué nueva identidad necesito empezar a practicar, aunque hoy todavía no me la crea del todo?

Sé claro, directo y concreto.`}
          </p>
        </div>
        <button 
          onClick={copyPrompt}
          disabled={!selectedArea}
          className={`mt-4 w-full sm:w-auto font-semibold px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            selectedArea 
              ? 'bg-amber-500 hover:bg-amber-600 text-gray-900' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {copiedPrompt ? (
            <>
              <span>✓</span>
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>{selectedArea ? 'Copiar prompt personalizado' : 'Primero elegí un área arriba'}</span>
            </>
          )}
        </button>
        
        {selectedArea && (
          <div className="mt-6 bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
            <p className="text-sm text-amber-200 flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Tu prompt incluye:</strong> El área de {selectedAreaData?.name}, tu creencia limitante y tu nueva identidad. 
                La IA te ayudará a diseñar el puente entre ambas versiones de vos.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const desarrolloPersonalMetadata = {
  id: 4,
  title: "Desarrollo Personal",
  type: "document" as const,
  duration: "20 min"
};