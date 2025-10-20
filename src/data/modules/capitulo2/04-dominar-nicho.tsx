import React, { useState } from 'react';

export const DominarNichoContent = () => {
  const [selectedBoat, setSelectedBoat] = useState<number | null>(null);
  const [nichoInput, setNichoInput] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [checklist, setChecklist] = useState({
    problemas: false,
    deseos: false,
    lenguaje: false,
    objeciones: false,
    competencia: false,
    canales: false
  });

  const barcos = [
    {
      id: 1,
      title: 'Barco Equivocado',
      icon: '🚣',
      effort: 'Remar 12 horas/día',
      result: 'Sin avanzar',
      color: 'red',
      description: 'Nicho saturado, sin diferenciación, competencia feroz'
    },
    {
      id: 2,
      title: 'Barco Correcto',
      icon: '⛵',
      effort: 'Remar 4 horas/día',
      result: 'Progreso claro',
      color: 'green',
      description: 'Nicho específico, necesidad real, competencia manejable'
    }
  ];

  const erroresComunes = [
    {
      id: 1,
      icon: '😰',
      error: 'Tenerle miedo a la competencia',
      realidad: 'Si hay competencia, hay mercado. Necesitás diferenciarte, no evitarla.',
      ejemplo: 'Ver que hay 100 coaches y pensar "ya no hay lugar para mí"'
    },
    {
      id: 2,
      icon: '🚫',
      error: 'Creer que el nicho está saturado',
      realidad: 'No hay nichos saturados, hay ofertas genéricas repetidas.',
      ejemplo: 'Decir "ya hay muchos diseñadores" sin buscar tu ángulo único'
    },
    {
      id: 3,
      icon: '📋',
      error: 'Elegir por imitación (copiar y pegar)',
      realidad: 'Lo que funciona para otros no siempre funciona para vos.',
      ejemplo: 'Copiar el nicho de un influencer sin entender tu contexto'
    }
  ];

  const principiosEspecialista = [
    {
      id: 1,
      icon: '🔍',
      title: 'Enfocarte te da poder',
      description: 'Si querés hablarle a todo el mundo, nadie te presta atención. Es como usar una lupa: cuando concentrás la luz en un punto, podés encender fuego.',
      ejemplo: 'Mejor "Ayudo a psicólogos a llevar su consulta online" que "Hago marketing digital"'
    },
    {
      id: 2,
      icon: '🏆',
      title: 'El especialista genera confianza',
      description: 'La gente no busca a alguien que "hace de todo". Busca a quien realmente entiende su problema específico.',
      ejemplo: 'Preferís un cardiólogo para tu corazón, no un médico general'
    },
    {
      id: 3,
      icon: '💰',
      title: 'Más conocimiento = más ventas',
      description: 'Si dominás tu nicho, conocés sus dolores, deseos y lenguaje. Eso te permite vender con más facilidad.',
      ejemplo: 'Sabés exactamente qué palabras usar y qué problemas resolver'
    },
    {
      id: 4,
      icon: '🎯',
      title: 'Sin nicho = tiros al aire',
      description: 'Sin claridad sobre a quién ayudás, perdés tiempo, energía y dinero. Los que se especializan cobran mejor.',
      ejemplo: 'Un generalista cobra $300. Un especialista cobra $3000 por lo mismo'
    }
  ];

  const complejidadNegocio = [
    { nichos: 1, productos: 1, combinaciones: 1, status: 'Simple y controlado', color: 'green' },
    { nichos: 2, productos: 1, combinaciones: 2, status: 'Doble de trabajo', color: 'yellow' },
    { nichos: 2, productos: 3, combinaciones: 6, status: 'Caos total', color: 'red' }
  ];

  const investigacionAreas = [
    {
      id: 1,
      area: 'Problemas urgentes',
      icon: '⚠️',
      pregunta: '¿Qué los frustra? ¿Qué les hace perder tiempo, plata o energía?',
      checked: checklist.problemas
    },
    {
      id: 2,
      area: 'Deseos ocultos',
      icon: '💭',
      pregunta: '¿Qué quieren en el fondo, aunque no lo digan?',
      checked: checklist.deseos
    },
    {
      id: 3,
      area: 'Lenguaje interno',
      icon: '🗣️',
      pregunta: '¿Qué palabras usan exactamente para expresar sus problemas?',
      checked: checklist.lenguaje
    },
    {
      id: 4,
      area: 'Objeciones comunes',
      icon: '🤔',
      pregunta: '¿Por qué dudan en comprar? ¿Qué miedos tienen?',
      checked: checklist.objeciones
    }
  ];

  const prompts = [
    {
      id: 1,
      title: 'Descubrir Problemas Urgentes',
      icon: '🧠',
      prompt: `Actuá como un experto en análisis de mercado. ¿Cuáles son los 5 problemas más urgentes que enfrentan hoy las personas que están en [${nichoInput || 'tu nicho'}] y cómo afectan su vida cotidiana o su negocio?`
    },
    {
      id: 2,
      title: 'Entender Deseos Profundos',
      icon: '💡',
      prompt: `¿Cuáles son los deseos más profundos, emociones ocultas y resultados soñados de las personas en el nicho de [${nichoInput || 'tu nicho'}]? Explicámelo como si yo tuviera que conectar con ellos emocionalmente para ofrecerles una solución.`
    },
    {
      id: 3,
      title: 'Capturar su Lenguaje Real',
      icon: '🗣️',
      prompt: `¿Qué palabras, frases o expresiones reales suelen usar las personas de [${nichoInput || 'tu nicho'}] cuando hablan de sus problemas o sueños? Dame ejemplos que suenen auténticos y cotidianos.`
    }
  ];

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checklistProgress = () => {
    const total = Object.keys(checklist).length;
    const completed = Object.values(checklist).filter(v => v).length;
    return Math.round((completed / total) * 100);
  };

  const copyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-200 mb-2">
            Módulo 4 · El Poder del Especialista
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            🎯 Cómo Dominar un Nicho
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            No se trata de remar más fuerte. Se trata de elegir el barco correcto.
          </p>
        </div>
      </div>

      {/* El Barco Es Más Importante Que El Remo */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-l-4 border-cyan-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🌊 El Barco Es Más Importante Que El Remo
        </h2>
        
        <div className="bg-white p-5 rounded-lg mb-6 border-2 border-cyan-200">
          <p className="text-lg text-gray-800 mb-4">
            Podés trabajar 12 horas al día, crear contenido, hacer llamadas y diseñar estrategias…
          </p>
          <p className="text-xl font-bold text-red-600 text-center p-3 bg-red-50 rounded">
            Pero si estás en el nicho equivocado, todo ese esfuerzo es energía desperdiciada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {barcos.map((barco) => (
            <button
              key={barco.id}
              onClick={() => setSelectedBoat(selectedBoat === barco.id ? null : barco.id)}
              className={`text-left p-5 rounded-lg border-2 transition-all ${
                barco.color === 'red' 
                  ? 'bg-red-50 border-red-300 hover:border-red-400' 
                  : 'bg-green-50 border-green-300 hover:border-green-400'
              } ${selectedBoat === barco.id ? 'ring-4 ring-blue-300' : ''}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{barco.icon}</span>
                <h3 className="text-xl font-bold text-gray-900">{barco.title}</h3>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>Esfuerzo:</strong> {barco.effort}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Resultado:</strong> {barco.result}
                </p>
                
                {selectedBoat === barco.id && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <p className="text-sm text-gray-600">{barco.description}</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-5 rounded-lg border-2 border-yellow-400">
          <p className="text-xl font-bold text-center text-gray-900">
            "No importa cuánto remes si estás en el barco equivocado."
          </p>
        </div>
      </div>

      {/* Posicionamiento Funcional */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🔑 Los 4 Principios del Especialista Exitoso
        </h2>

        <div className="space-y-4">
          {principiosEspecialista.map((principio) => (
            <div key={principio.id} className="bg-white p-5 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{principio.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{principio.title}</h3>
                  <p className="text-gray-700 mb-3">{principio.description}</p>
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                    <p className="text-sm text-gray-700">
                      <strong className="text-purple-700">Ejemplo:</strong> {principio.ejemplo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-center">
          <p className="text-xl font-bold">
            Cuanto más te enfocás, más fácil es crecer, ganar bien y destacarte.
          </p>
        </div>
      </div>

      {/* Complejidad del Negocio */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ⚙️ ¿Por qué Menos es Más en tu Negocio?
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-orange-300 mb-6">
          <p className="text-lg text-gray-800 mb-3">
            Cada vez que agregás un nuevo producto o querés hablarle a otro tipo de cliente, 
            <strong className="text-red-600"> tu negocio se vuelve exponencialmente más difícil de manejar.</strong>
          </p>
          <p className="text-gray-700">
            Tenés que crear nuevos mensajes, nuevas estrategias, sistemas distintos… 
            y eso consume tiempo, energía y dinero.
          </p>
        </div>

        <div className="space-y-4">
          {complejidadNegocio.map((nivel, index) => (
            <div 
              key={index}
              className={`p-5 rounded-lg border-2 ${
                nivel.color === 'green' ? 'bg-green-50 border-green-400' :
                nivel.color === 'yellow' ? 'bg-yellow-50 border-yellow-400' :
                'bg-red-50 border-red-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {nivel.nichos} {nivel.nichos === 1 ? 'Nicho' : 'Nichos'} + {nivel.productos} {nivel.productos === 1 ? 'Producto' : 'Productos'}
                  </p>
                  <p className="text-sm text-gray-600">
                    = {nivel.combinaciones} {nivel.combinaciones === 1 ? 'combinación' : 'combinaciones'}
                  </p>
                </div>
                <span className={`text-3xl font-bold ${
                  nivel.color === 'green' ? 'text-green-600' :
                  nivel.color === 'yellow' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {nivel.color === 'green' ? '✅' : nivel.color === 'yellow' ? '⚠️' : '🚫'}
                </span>
              </div>
              <p className="font-bold text-gray-900">{nivel.status}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg">
          <p className="text-lg font-bold text-center mb-2">💡 Regla de Oro para Escalar:</p>
          <p className="text-2xl font-bold text-center">Lo simple crece. Lo complejo se cae.</p>
        </div>
      </div>

      {/* Errores Letales */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border-2 border-red-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          ❌ Errores Letales al Elegir un Nicho
        </h2>

        <div className="space-y-4">
          {erroresComunes.map((error) => (
            <div key={error.id} className="bg-white p-5 rounded-lg border-2 border-red-200">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{error.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-600 mb-2">{error.error}</h3>
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500 mb-3">
                    <p className="text-sm font-semibold text-green-800 mb-1">✅ La realidad:</p>
                    <p className="text-gray-700">{error.realidad}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">
                      <strong>Ejemplo:</strong> {error.ejemplo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caso Real: Oscar */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">🚣‍♂️</span>
          Caso Real: Mismo Esfuerzo, Mejor Barco
        </h2>

        <div className="space-y-4">
          <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
            <p className="font-bold text-red-700 mb-2">❌ Barco Equivocado:</p>
            <p className="text-gray-800">
              Oscar ofrecía servicios a abogados durante años. Mandó miles de mensajes, 
              trabajó muchísimo… pero no tenía resultados. Estaba remando sin avanzar.
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
            <p className="font-bold text-green-700 mb-2">✅ Barco Correcto:</p>
            <p className="text-gray-800">
              Cambió de nicho. Buscó otro tipo de cliente, ajustó su oferta…
              Y en menos de 3 meses, ganó mucho más que en años trabajando con abogados.
            </p>
          </div>

          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-5 rounded-lg text-center">
            <p className="text-xl font-bold">
              👉 No trabajó más. No se volvió un superhéroe.<br/>
              Simplemente eligió un mejor barco.
            </p>
          </div>
        </div>
      </div>

      {/* Investigación del Nicho */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🔍 Investigación Real del Nicho
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-indigo-300 mb-6">
          <p className="text-lg text-gray-800 mb-3">
            Una vez que elegís un nicho, tu verdadero trabajo recién empieza:
          </p>
          <p className="text-xl font-bold text-indigo-700 text-center">
            Tenés que conocer a esas personas como si fueran tus mejores amigos.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">🔑 Checklist de Investigación:</h3>
          <div className="space-y-3">
            {investigacionAreas.map((area) => (
              <label
                key={area.id}
                className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-indigo-200 cursor-pointer hover:border-indigo-400 transition-all"
              >
                <input
                  type="checkbox"
                  checked={area.checked}
                  onChange={() => toggleChecklist(area.area.toLowerCase().replace(/\s/g, '_') as keyof typeof checklist)}
                  className="mt-1 w-5 h-5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{area.icon}</span>
                    <p className="font-bold text-gray-900">{area.area}</p>
                  </div>
                  <p className="text-sm text-gray-600">{area.pregunta}</p>
                </div>
              </label>
            ))}
          </div>

          {checklistProgress() > 0 && (
            <div className="mt-4 p-4 bg-indigo-100 rounded-lg border-2 border-indigo-300">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-900">Progreso de Investigación:</p>
                <p className="text-2xl font-bold text-indigo-700">{checklistProgress()}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${checklistProgress()}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prompts para ChatGPT */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">🔓</span>
          BONUS: Prompts para Investigar tu Nicho
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Primero, escribí tu nicho:
          </label>
          <input
            type="text"
            value={nichoInput}
            onChange={(e) => setNichoInput(e.target.value)}
            placeholder="Ej: psicólogos que quieren trabajar online"
            className="w-full p-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none"
          />
        </div>

        {nichoInput.trim().length > 3 && (
          <>
            <button
              onClick={() => setShowPrompts(!showPrompts)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg transition-all mb-4"
            >
              {showPrompts ? '🔒 Ocultar Prompts' : '🔓 Ver Prompts Personalizados'}
            </button>

            {showPrompts && (
              <div className="space-y-4">
                {prompts.map((prompt) => (
                  <div key={prompt.id} className="bg-white p-5 rounded-lg border-2 border-green-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{prompt.icon}</span>
                        <h3 className="font-bold text-gray-900">{prompt.title}</h3>
                      </div>
                      <button
                        onClick={() => {
                          copyPrompt(prompt.prompt);
                          setSelectedPrompt(prompt.id);
                          setTimeout(() => setSelectedPrompt(null), 2000);
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded transition-all"
                      >
                        {selectedPrompt === prompt.id ? '✓ Copiado' : '📋 Copiar'}
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded border-2 border-gray-200">
                      <p className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
                        {prompt.prompt}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                  <p className="text-sm text-green-800">
                    <strong>💡 Cómo usar:</strong> Copiá cada prompt, pegalo en ChatGPT, 
                    y usá las respuestas para conocer a fondo tu nicho.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Cierre: Enfocar es Escalar */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl border-2 border-gray-400">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          📌 Enfocar es Escalar
        </h2>

        <div className="bg-white p-6 rounded-lg space-y-4">
          <p className="text-lg text-gray-800 text-center mb-4">
            Cuando te enfocás en un solo tipo de cliente y una sola solución, 
            todo se vuelve más simple y más rápido:
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Podés crecer sin enredarte',
              'Cometés menos errores',
              'Automatizás con claridad',
              'Delegás sin caos'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-2 border-green-200">
                <span className="text-2xl">✅</span>
                <p className="text-gray-800 font-medium">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg">
            <p className="text-xl font-bold text-center mb-3">
              No es cuestión de esforzarte más.
            </p>
            <p className="text-2xl font-bold text-center">
              Es cuestión de elegir mejor dónde poner tu esfuerzo.
            </p>
          </div>
        </div>
      </div>

      {/* Mensaje Final */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-6">🎯 No Se Trata de Remar Más Fuerte</h2>
        
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p className="text-2xl font-bold text-yellow-300">
            Se trata de elegir mejor el barco.
          </p>
          <p>
            El esfuerzo solo no alcanza si estás en la dirección equivocada.
          </p>
        </div>
        
        <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg mb-3">
            Ahora que sabés cómo dominar un nicho...
          </p>
          <p className="text-2xl font-bold">
            Es momento de construir tu autoridad y destacarte 🚀
          </p>
        </div>
      </div>

      {/* Transición */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          ✅ Ya entendés el poder de especializarte...
        </p>
        <p className="text-xl text-gray-700">
          En el próximo módulo aprenderás a posicionarte como experto
          y atraer a tus clientes ideales.
        </p>
      </div>
    </div>
  );
};

export const dominarNichoMetadata = {
  id: 4,
  title: "Cómo Dominar un Nicho",
  type: "document" as const,
  duration: "35 min"
};