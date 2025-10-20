import React, { useState } from 'react';

export const FuerzasIrracionalidadContent = () => {
  const [selectedForce, setSelectedForce] = useState<number | null>(null);
  const [creenciasInput, setCreenciasInput] = useState('');
  const [showCreenciasAnalysis, setShowCreenciasAnalysis] = useState(false);
  const [experienceReflection, setExperienceReflection] = useState('');
  const [checkedForces, setCheckedForces] = useState<number[]>([]);

  const fuerzas = [
    {
      id: 1,
      icon: '🎯',
      title: 'Sesgo',
      subtitle: 'Tu mente decide antes que vos',
      description: 'Tu cerebro no ve la realidad tal como es. La ve filtrada por tus creencias.',
      ejemplo: 'Si creés que "nadie va a querer lo que ofrezco", ni te vas a molestar en intentarlo.',
      color: 'blue'
    },
    {
      id: 2,
      icon: '💣',
      title: 'Emoción',
      subtitle: 'Lo que sentís te puede nublar',
      description: 'Ansiedad, miedo, entusiasmo exagerado, frustración... Las emociones fuertes son como una neblina mental.',
      ejemplo: '¿Nunca cancelaste una acción importante solo porque estabas de mal humor?',
      regla: 'No cambies lo que hacés por cómo te sentís. Cambiá solo si los datos lo justifican.',
      color: 'red'
    },
    {
      id: 3,
      icon: '🔐',
      title: 'Creencias malas',
      subtitle: 'Lo que das por cierto puede ser tu cárcel',
      description: 'Ejemplo clásico: "Los clientes no contestan." Entonces... ni lo intentás.',
      ejercicio: true,
      color: 'purple'
    },
    {
      id: 4,
      icon: '🧍',
      title: 'Ego',
      subtitle: 'Querer tener razón te puede hacer perder ventas',
      description: 'Cuando te tomás las cosas personales, perdés el foco. Querés demostrar algo, defenderte, discutir.',
      frase: 'No necesito tener razón. Necesito tener resultados.',
      color: 'orange'
    },
    {
      id: 5,
      icon: '🪨',
      title: 'Resistencia',
      subtitle: 'La vocecita del "mañana"',
      description: 'Se disfraza de perfeccionismo: "Cuando tenga mi web lista arranco..." "Todavía no estoy preparado..."',
      solucion: 'No la combatas pensando. Combatila haciendo. Hacé una acción chiquita... ahora mismo.',
      color: 'gray'
    },
    {
      id: 6,
      icon: '🔄',
      title: 'Experiencia',
      subtitle: 'Lo hiciste mal una vez y ya lo descartás',
      description: '"No, eso ya lo probé... y no funcionó." Pero... ¿lo hiciste bien? ¿Con constancia? ¿Con estrategia?',
      recordatorio: 'Haberlo hecho mal no significa que no funcione. Significa que aún no lo dominaste.',
      color: 'teal'
    },
    {
      id: 7,
      icon: '🔮',
      title: 'Proyección',
      subtitle: 'Asumís que todos piensan como vos',
      description: 'Si a vos te da vergüenza vender por mensaje privado, asumís que todos odian que les escriban.',
      clave: 'Soltá las suposiciones. Observá. Preguntá. Escuchá. Lo que vos pensás no es ley universal.',
      color: 'pink'
    }
  ];

  const toggleForce = (id: number) => {
    if (checkedForces.includes(id)) {
      setCheckedForces(checkedForces.filter(f => f !== id));
    } else {
      setCheckedForces([...checkedForces, id]);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'from-blue-50 to-indigo-50', border: 'border-blue-300', text: 'text-blue-600', accent: 'bg-blue-100' },
      red: { bg: 'from-red-50 to-orange-50', border: 'border-red-300', text: 'text-red-600', accent: 'bg-red-100' },
      purple: { bg: 'from-purple-50 to-pink-50', border: 'border-purple-300', text: 'text-purple-600', accent: 'bg-purple-100' },
      orange: { bg: 'from-orange-50 to-yellow-50', border: 'border-orange-300', text: 'text-orange-600', accent: 'bg-orange-100' },
      gray: { bg: 'from-gray-50 to-slate-50', border: 'border-gray-300', text: 'text-gray-600', accent: 'bg-gray-100' },
      teal: { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-300', text: 'text-teal-600', accent: 'bg-teal-100' },
      pink: { bg: 'from-pink-50 to-rose-50', border: 'border-pink-300', text: 'text-pink-600', accent: 'bg-pink-100' }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Hero - Nuevo diseño para Capítulo 2 */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-2">
            Capítulo 2 · Trabajar Online
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            🧠 Las Fuerzas de la Irracionalidad
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Las 7 fuerzas invisibles que te frenan (y cómo vencerlas)
          </p>
        </div>
      </div>

      {/* Intro impactante */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          💥 Todo empieza en tu cabeza
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Estas fuerzas no son un defecto. <strong className="text-orange-600">Son parte de ser humano.</strong>
        </p>
        <div className="bg-white p-5 rounded-lg border-2 border-yellow-300">
          <p className="text-lg text-gray-800 mb-3">
            Pero si no las ves, <strong className="text-red-600">te manejan.</strong>
          </p>
          <p className="text-xl font-bold text-green-600">
            Y si las ves... te liberás.
          </p>
        </div>
        <p className="text-lg text-gray-700 mt-4 italic">
          La captación de clientes no empieza con un funnel de ventas. <br/>
          <strong>Empieza con vos.</strong>
        </p>
      </div>

      {/* Las 7 Fuerzas - Grid interactivo */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Las 7 Fuerzas Invisibles
        </h2>
        
        <p className="text-center text-gray-600 mb-6">
          Click en cada fuerza para explorarla en profundidad
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {fuerzas.map((fuerza) => {
            const colors = getColorClasses(fuerza.color);
            const isSelected = selectedForce === fuerza.id;
            const isChecked = checkedForces.includes(fuerza.id);

            return (
              <div key={fuerza.id} className="space-y-3">
                <button
                  onClick={() => setSelectedForce(isSelected ? null : fuerza.id)}
                  className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                    isSelected
                      ? `bg-gradient-to-br ${colors.bg} ${colors.border} shadow-lg`
                      : `bg-white border-gray-200 hover:${colors.border}`
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{fuerza.icon}</span>
                        <div>
                          <p className={`font-bold text-lg ${colors.text}`}>
                            {fuerza.id}. {fuerza.title}
                          </p>
                          <p className="text-sm text-gray-600 italic">{fuerza.subtitle}</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-2xl">{isSelected ? '👇' : '👉'}</span>
                  </div>
                </button>

                {isSelected && (
                  <div className={`bg-white p-5 rounded-lg border-2 ${colors.border} space-y-4`}>
                    <p className="text-gray-700 leading-relaxed">
                      {fuerza.description}
                    </p>

                    {fuerza.ejemplo && (
                      <div className={`${colors.accent} p-4 rounded-lg border-l-4 ${colors.border}`}>
                        <p className="text-sm font-semibold text-gray-700 mb-2">📌 Ejemplo:</p>
                        <p className="text-gray-800 italic">{fuerza.ejemplo}</p>
                      </div>
                    )}

                    {fuerza.regla && (
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border-2 border-green-300">
                        <p className="text-sm font-semibold text-green-700 mb-2">🧭 Regla de oro:</p>
                        <p className="text-gray-800 font-medium">{fuerza.regla}</p>
                      </div>
                    )}

                    {fuerza.frase && (
                      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-lg border-2 border-orange-300">
                        <p className="text-sm font-semibold text-orange-700 mb-2">💬 Frase clave:</p>
                        <p className="text-gray-800 font-bold italic">"{fuerza.frase}"</p>
                      </div>
                    )}

                    {fuerza.solucion && (
                      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-lg border-2 border-blue-300">
                        <p className="text-sm font-semibold text-blue-700 mb-2">⚡ Solución inmediata:</p>
                        <p className="text-gray-800">{fuerza.solucion}</p>
                      </div>
                    )}

                    {fuerza.recordatorio && (
                      <div className="bg-gradient-to-r from-teal-100 to-green-100 p-4 rounded-lg border-2 border-teal-300">
                        <p className="text-sm font-semibold text-teal-700 mb-2">🚧 Recordatorio:</p>
                        <p className="text-gray-800 font-medium">{fuerza.recordatorio}</p>
                      </div>
                    )}

                    {fuerza.clave && (
                      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg border-2 border-pink-300">
                        <p className="text-sm font-semibold text-pink-700 mb-2">🎯 Clave práctica:</p>
                        <p className="text-gray-800">{fuerza.clave}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-3 border-t">
                      <input
                        type="checkbox"
                        id={`check-${fuerza.id}`}
                        checked={isChecked}
                        onChange={() => toggleForce(fuerza.id)}
                        className="w-5 h-5 text-green-600 rounded"
                      />
                      <label htmlFor={`check-${fuerza.id}`} className="text-sm text-gray-700 cursor-pointer">
                        Ya reconozco esta fuerza en mí
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {checkedForces.length > 0 && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg border-2 border-green-300">
            <p className="font-bold text-gray-900 mb-2">
              ✅ Reconociste {checkedForces.length} de 7 fuerzas
            </p>
            <p className="text-gray-700">
              El primer paso para liberarte es verlas. Ahora que las reconocés, podés trabajar en ellas.
            </p>
          </div>
        )}
      </div>

      {/* Ejercicio: Creencias malas */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">📄</span>
          Ejercicio inmediato: Tus creencias sobre clientes
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Escribí lo que creés sobre conseguir clientes. Sé brutalmente honesto:
        </p>

        <textarea
          value={creenciasInput}
          onChange={(e) => setCreenciasInput(e.target.value)}
          placeholder="Ejemplo: Los clientes no contestan. Nadie va a pagar lo que vale mi servicio. Es muy difícil conseguir clientes online..."
          className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none min-h-[120px] text-gray-800 mb-4"
        />

        {creenciasInput.trim().length > 20 && (
          <button
            onClick={() => setShowCreenciasAnalysis(!showCreenciasAnalysis)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all mb-4"
          >
            {showCreenciasAnalysis ? '🔒 Ocultar análisis' : '🔍 Analizar mis creencias'}
          </button>
        )}

        {showCreenciasAnalysis && creenciasInput && (
          <div className="bg-white p-6 rounded-lg border-2 border-purple-400">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">💡 Preguntate:</h3>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Es verdad... o es una excusa?</p>
                <p className="text-sm text-gray-600">¿Tenés datos reales o es solo una historia que te contás?</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Te protege del rechazo?</p>
                <p className="text-sm text-gray-600">¿Esta creencia te ayuda a no intentar para no fallar?</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <p className="font-semibold text-gray-900 mb-2">❓ ¿Qué pasaría si fuera falsa?</p>
                <p className="text-sm text-gray-600">¿Cómo cambiaría tu forma de actuar?</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ejercicio: Experiencia */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">🔄</span>
          Reflexión: ¿Qué descartaste demasiado rápido?
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Pensá en algo que probaste una vez, no funcionó, y nunca más lo intentaste:
        </p>

        <textarea
          value={experienceReflection}
          onChange={(e) => setExperienceReflection(e.target.value)}
          placeholder="Ejemplo: Probé Instagram pero nadie me seguía. Intenté mandar DMs pero me ignoraron. Hice un video y fue un fracaso..."
          className="w-full p-4 border-2 border-teal-200 rounded-lg focus:border-teal-400 focus:outline-none min-h-[100px] text-gray-800 mb-4"
        />

        {experienceReflection.trim().length > 20 && (
          <div className="bg-white p-5 rounded-lg border-2 border-teal-300">
            <p className="font-bold text-gray-900 mb-3">🤔 Ahora preguntate:</p>
            <div className="space-y-2 text-gray-700">
              <p>• ¿Lo hiciste con constancia o fue un intento suelto?</p>
              <p>• ¿Tenías una estrategia clara o ibas a ciegas?</p>
              <p>• ¿Pediste ayuda o lo hiciste solo?</p>
              <p>• ¿Le diste tiempo suficiente para que funcione?</p>
            </div>
            <p className="mt-4 text-teal-700 font-bold">
              💡 Tal vez no fue que "no funciona". Tal vez fue que "aún no lo dominaste".
            </p>
          </div>
        )}
      </div>

      {/* Mensaje final potente */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-6">🎯 La Clave Final</h2>
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            Estas 7 fuerzas están actuando en vos <strong>ahora mismo.</strong>
          </p>
          <p className="text-2xl font-bold text-yellow-300">
            No podés eliminarlas. Pero podés reconocerlas.
          </p>
          <p>
            Y cuando las reconocés, dejás de ser su víctima... <br/>
            y te convertís en su observador.
          </p>
        </div>
        
        <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg mb-3">
            La próxima vez que sientas que algo te frena...
          </p>
          <p className="text-2xl font-bold">
            Preguntate: ¿Cuál de las 7 fuerzas está hablando?
          </p>
        </div>
      </div>

      {/* Transición al siguiente módulo */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          🚀 Ahora que conocés las fuerzas invisibles...
        </p>
        <p className="text-xl text-gray-700">
          Es hora de aprender las estrategias concretas para trabajar online.
        </p>
        <p className="text-lg text-gray-600 mt-4">
          En los próximos módulos vas a descubrir cómo encontrar tu nicho, construir tu marca, 
          y captar clientes de forma sistemática.
        </p>
      </div>
    </div>
  );
};

export const fuerzasIrracionalidadMetadata = {
  id: 1,
  title: "Las Fuerzas de la Irracionalidad",
  type: "document" as const,
  duration: "20 min"
};