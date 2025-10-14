import React, { useState } from 'react';

export const ResistenciaContent = () => {
  const [selectedResistances, setSelectedResistances] = useState<string[]>([]);
  const [personalSituation, setPersonalSituation] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const resistanceTypes = [
    { id: 'miedo', icon: '😨', title: 'Miedo', description: 'No hacés lo que sabés que tenés que hacer... por miedo a hacerlo mal. O peor: ¡a hacerlo bien!' },
    { id: 'gratificacion', icon: '⚡', title: 'Gratificación instantánea', description: 'Elegís el placer rápido (scroll, comida, distracciones) antes que el resultado que toma tiempo' },
    { id: 'duda', icon: '❓', title: 'Duda', description: 'No avanzás porque no creés que podés. Y esa creencia te paraliza' },
    { id: 'ansiedad', icon: '😰', title: 'Ansiedad', description: 'Postergás porque hacerlo te incomoda. Entonces evitás' },
    { id: 'racionalizacion', icon: '🧠', title: 'Racionalización', description: 'Le ponés lógica a una excusa emocional. Pero en el fondo... sabés que te estás mintiendo' },
    { id: 'aprender', icon: '📚', title: '"Aprender más"', description: 'Te convencés de que necesitás saber más. Pero lo que te falta no es información, es acción' },
    { id: 'investigar', icon: '🔍', title: '"Investigar más"', description: 'Otro video. Otra guía. Otro curso. Pero nunca empezás' },
    { id: 'comodidad', icon: '🛋️', title: 'Comodidad', description: 'Estás tan a gusto que el cambio te parece una amenaza' },
    { id: 'perfeccionismo', icon: '🎯', title: 'Perfeccionismo', description: 'Esperás que todo esté perfecto. Spoiler: Nunca lo va a estar' },
    { id: 'esperar', icon: '⏳', title: 'Esperar', description: 'Creés que el universo tiene que moverse primero. Pero sos vos el que tiene que dar el primer paso' },
    { id: 'justificacion', icon: '🧾', title: 'Justificación', description: 'Te contás una historia coherente... para no admitir que te falta coraje' },
    { id: 'distracciones', icon: '🧨', title: 'Distracciones', description: 'Siempre hay algo más "urgente". Pero lo importante, sigue en pausa' },
    { id: 'apoyo', icon: '🧍‍♂️', title: 'Falta de apoyo', description: 'Decís que te falta motivación. Pero lo que te falta es decisión' },
    { id: 'vulnerabilidad', icon: '😶‍🌫️', title: 'Vulnerabilidad', description: 'Te da miedo el juicio ajeno, así que ni te mostrás' },
    { id: 'adiccion', icon: '🔁', title: 'Adicción', description: 'Elegís placer compulsivo en vez de progreso real' },
    { id: 'critica', icon: '🗣️', title: 'Crítica', description: 'Atacás a los que hacen... para no tener que admitir que vos no lo estás haciendo' },
    { id: 'negacion', icon: '🙈', title: 'Negación', description: 'Fingís que no pasa nada. Pero sabés que sí' },
    { id: 'drama', icon: '🎭', title: 'Drama', description: 'Creás caos inconsciente... para tener una excusa para no avanzar' }
  ];

  const ejemploReal = [
    { situacion: 'Evita empezar el proyecto', resistencia: 'Cree que se va a quemar otra vez... aunque no esté ni cerca' },
    { situacion: 'Procrastina tareas clave', resistencia: 'Su mente exagera el esfuerzo. Entonces evita tareas importantes' },
    { situacion: 'Espera el momento perfecto', resistencia: 'Cree que necesita una mañana perfecta para producir (spoiler: no la necesita)' },
    { situacion: 'Patea decisiones', resistencia: 'Se convence de que puede patear cosas sin consecuencias' },
    { situacion: 'Consume más cursos', resistencia: 'Estudia más para no ejecutar' },
    { situacion: 'Se frena cuando va bien', resistencia: 'Se dice que ya está bien, que puede frenar... justo cuando más debería apretar' }
  ];

  const toggleResistance = (id: string) => {
    if (selectedResistances.includes(id)) {
      setSelectedResistances(selectedResistances.filter(r => r !== id));
    } else {
      setSelectedResistances([...selectedResistances, id]);
    }
  };

  const getSelectedResistanceNames = () => {
    return selectedResistances.map(id => {
      const resistance = resistanceTypes.find(r => r.id === id);
      return resistance ? resistance.title : '';
    }).filter(Boolean);
  };

  const copyPrompt = () => {
    const selectedNames = getSelectedResistanceNames();
    const prompt = `🔓 Actuá como un entrenador de élite en alto rendimiento mental.

Quiero que analices mi comportamiento y me señales sin filtro mis tres formas más frecuentes de resistencia, basándote en mis hábitos actuales, excusas, y momentos donde postergo lo importante.

${selectedNames.length > 0 ? `Formas de resistencia que identifico en mí:\n${selectedNames.map(name => `- ${name}`).join('\n')}\n\n` : ''}${personalSituation ? `Situación actual donde postergo:\n${personalSituation}\n\n` : ''}Quiero claridad brutal. Dame además una estrategia personalizada para actuar a pesar de ellas, incluso en mis peores días.

Sé directo.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🛑 Resistencia
        </h1>
        <p className="text-2xl text-red-600 font-medium">
          El enemigo invisible que te mantiene quieto
        </p>
      </div>

      {/* Hook con los grandes */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎯 Todos enfrentamos resistencia. Pero no todos la enfrentan.
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          No importa quién seas. <strong>Elon Musk. Michael Jordan. Mike Tyson.</strong> Todos, absolutamente todos, 
          han sentido resistencia.
        </p>
        <div className="bg-white p-5 rounded-lg border-2 border-orange-300">
          <p className="text-lg text-gray-800 mb-3">
            <strong className="text-orange-600">La diferencia es que ellos la ven, la reconocen y la enfrentan.</strong>
          </p>
          <p className="text-lg text-gray-700">
            ¿Vos? Tal vez ni siquiera sabés que está ahí. Porque la resistencia no grita. Susurra. Se disfraza. 
            Se esconde. Y lo peor: <strong className="text-red-600">se hace pasar por vos.</strong>
          </p>
        </div>
      </div>

      {/* Este no es magia */}
      <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
        <p className="text-2xl font-bold mb-4">
          Este documento no es una solución mágica.
        </p>
        <div className="bg-white/10 backdrop-blur p-6 rounded-lg inline-block">
          <p className="text-3xl font-bold text-yellow-300 mb-3">Es un espejo.</p>
          <p className="text-xl text-gray-200">
            Uno que te muestra de frente lo que lleva años saboteando tus objetivos.
          </p>
        </div>
        <p className="text-lg text-gray-300 mt-6">
          Ahora sí, ya no vas a tener excusas.
        </p>
      </div>

      {/* ¿Qué es la resistencia? */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🔍</span>
          ¿Qué es la resistencia?
        </h2>
        
        <p className="text-xl text-gray-800 mb-6 font-medium">
          Es eso que aparece <strong className="text-blue-600">justo antes</strong> de dar un paso importante.
        </p>

        <div className="bg-white p-5 rounded-lg border-l-4 border-blue-500 mb-6">
          <p className="text-lg text-gray-700 mb-3">
            ¿Te pasó alguna vez que estás por empezar el gimnasio, lanzar ese proyecto, grabar un video, 
            o pedir algo que sabés que merecés... y de repente, <strong>algo te frena?</strong>
          </p>
          <p className="text-xl font-bold text-blue-600">
            No es flojera. Es resistencia.
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-lg border-2 border-red-300">
          <p className="text-lg font-bold text-gray-900 mb-3">La resistencia es esa vocecita interna que te dice:</p>
          <div className="space-y-2 text-gray-700">
            <p className="italic">"Mejor después."</p>
            <p className="italic">"¿Y si sale mal?"</p>
            <p className="italic">"No estás listo todavía."</p>
          </div>
          <p className="text-gray-700 mt-4">
            A veces suena lógica. A veces parece que te cuida. <br/>
            <strong className="text-red-600">Pero no te confundas: su único trabajo es mantenerte en el mismo lugar.</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-red-100 p-5 rounded-lg border-2 border-red-400 text-center">
            <p className="text-4xl mb-2">🚫</p>
            <p className="font-bold text-red-700">No podés eliminarla</p>
          </div>
          <div className="bg-green-100 p-5 rounded-lg border-2 border-green-400 text-center">
            <p className="text-4xl mb-2">✅</p>
            <p className="font-bold text-green-700">Podés reconocerla y seguir igual</p>
          </div>
        </div>

        <div className="mt-6 bg-blue-100 p-5 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-800 font-medium">
            💡 Cada vez que la enfrentes y avances, vas a sentirte más libre. <br/>
            <strong className="text-blue-700">Porque la resistencia solo pierde fuerza cuando la enfrentás en movimiento.</strong>
          </p>
        </div>
      </div>

      {/* Las 18 formas - INTERACTIVO */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🧩</span>
          Formas comunes de resistencia
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 font-medium">
          Leé con atención. <strong className="text-purple-600">Porque más de una es tuya.</strong>
        </p>

        <p className="text-sm text-gray-600 mb-6 bg-white p-3 rounded-lg border border-purple-200">
          💡 Hacé click en las que reconocés en vos. Ser honesto es el primer paso.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {resistanceTypes.map((resistance) => (
            <button
              key={resistance.id}
              onClick={() => toggleResistance(resistance.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedResistances.includes(resistance.id)
                  ? 'bg-red-100 border-red-400 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{resistance.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 mb-1">{resistance.title}</p>
                  <p className="text-xs text-gray-600">{resistance.description}</p>
                </div>
                {selectedResistances.includes(resistance.id) && (
                  <span className="text-red-500 font-bold">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {selectedResistances.length > 0 && (
          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-5 rounded-lg border-2 border-red-300">
            <p className="font-bold text-gray-900 mb-3">
              🎯 Identificaste {selectedResistances.length} formas de resistencia:
            </p>
            <div className="flex flex-wrap gap-2">
              {getSelectedResistanceNames().map((name, index) => (
                <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-red-300">
                  {name}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-700 mt-4 italic">
              Reconocerlas es el primer paso. Ahora sabés contra qué luchás.
            </p>
          </div>
        )}
      </div>

      {/* Ejemplo real */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🧠</span>
          Ejemplo real: Esto le pasa a todos
        </h2>
        
        <div className="space-y-3">
          {ejemploReal.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-lg border-l-4 border-orange-500">
              <p className="text-sm font-bold text-orange-600 mb-2">Situación {index + 1}:</p>
              <p className="font-semibold text-gray-900 mb-2">{item.situacion}</p>
              <p className="text-gray-700 text-sm italic">→ {item.resistencia}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 p-5 rounded-lg border-2 border-orange-400">
          <p className="text-lg font-bold text-gray-900 text-center">
            ¿Te suena familiar? Todos tenemos variaciones de esto.
          </p>
        </div>
      </div>

      {/* Tu situación personal - EJERCICIO */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">📝</span>
          Tu situación personal
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Describí una situación actual donde estés postergando algo importante:
        </p>

        <textarea
          value={personalSituation}
          onChange={(e) => setPersonalSituation(e.target.value)}
          placeholder="Ejemplo: Tengo que lanzar mi servicio, pero sigo 'perfeccionando' la web en vez de salir a vender..."
          className="w-full p-4 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none min-h-[120px] text-gray-800 mb-4"
        />

        {personalSituation.trim().length > 20 && (
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all mb-4"
          >
            {showAnalysis ? '🔒 Ocultar análisis' : '🔍 Analizar mi resistencia'}
          </button>
        )}

        {showAnalysis && personalSituation && (
          <div className="bg-white p-6 rounded-lg border-2 border-indigo-400">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">🎯 Preguntas para desenmascarar tu resistencia:</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Qué estoy evitando realmente?</p>
                <p className="text-sm text-gray-600">No la tarea en sí, sino el miedo o incomodidad detrás</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Qué excusa me estoy vendiendo?</p>
                <p className="text-sm text-gray-600">La historia que me cuento para justificar la postergación</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Qué pasaría si lo hago mal?</p>
                <p className="text-sm text-gray-600">El peor escenario real (probablemente no tan terrible)</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Cuál es el primer paso mínimo?</p>
                <p className="text-sm text-gray-600">La acción más pequeña que puedo hacer HOY</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mensaje final brutal */}
      <div className="bg-gray-900 text-white p-10 rounded-xl text-center">
        <h2 className="text-4xl font-bold mb-6">🔚 No podés vencer lo que no podés ver</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-2xl">
            Este documento no viene a darte motivación barata.
          </p>
          <p className="text-3xl font-bold text-yellow-300">
            Viene a darte algo más valioso: conciencia.
          </p>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg space-y-3 text-lg">
            <p>Ver tus propias trampas mentales.</p>
            <p>Escuchar esa vocecita y decirle: <strong className="text-red-400">"ya no te creo"</strong>.</p>
            <p>Actuar igual, <strong className="text-yellow-300">aunque tiemble la mano</strong>.</p>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-500/50 p-6 rounded-lg">
            <p className="text-2xl font-bold mb-3">Eso es lo que hacen los que avanzan.</p>
            <p className="text-xl text-gray-300">Los demás... siguen esperando el momento ideal.</p>
          </div>
        </div>
      </div>

      {/* Acción inmediata */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-xl">
        <h3 className="text-3xl font-bold mb-6 text-center">⚡ Acción inmediata</h3>
        <div className="max-w-2xl mx-auto">
          <p className="text-xl mb-6 text-center">
            La resistencia se vence con <strong>movimiento</strong>, no con pensamiento.
          </p>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-lg font-bold mb-3">✅ Tu plan de batalla:</p>
            <div className="space-y-3">
              <p className="flex items-start gap-2">
                <span className="text-yellow-300">1.</span>
                <span>Identificá la resistencia cuando aparece (ahora ya la reconocés)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-yellow-300">2.</span>
                <span>Nombrala en voz alta: "Esta es resistencia"</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-yellow-300">3.</span>
                <span>Hacé el primer paso mínimo AHORA (5 minutos, una llamada, un mensaje)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-yellow-300">4.</span>
                <span>Repetí mañana. Y pasado. Hasta que sea un hábito</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus prompt */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">🔓 BONUS: Activación profunda</h3>
        <p className="text-gray-300 mb-4">
          Usá este prompt en ChatGPT o Claude para un análisis brutal y personalizado:
        </p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {`🔓 Actuá como un entrenador de élite en alto rendimiento mental.

Quiero que analices mi comportamiento y me señales sin filtro mis tres formas más frecuentes de resistencia, basándote en mis hábitos actuales, excusas, y momentos donde postergo lo importante.

Quiero claridad brutal. Dame además una estrategia personalizada para actuar a pesar de ellas, incluso en mis peores días.

Sé directo.`}
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
              <span>Copiar prompt de análisis</span>
            </>
          )}
        </button>
        
        {(selectedResistances.length > 0 || personalSituation) && (
          <div className="mt-6 bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
            <p className="text-sm text-amber-200 flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Tu prompt incluye:</strong>
                {selectedResistances.length > 0 && ` Las ${selectedResistances.length} formas de resistencia que identificaste.`}
                {personalSituation && ` Tu situación personal donde estás postergando.`}
                {' '}La IA te dará un análisis ultra-personalizado.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const resistenciaMetadata = {
  id: 7,
  title: "Resistencia",
  type: "document" as const,
  duration: "20 min"
};