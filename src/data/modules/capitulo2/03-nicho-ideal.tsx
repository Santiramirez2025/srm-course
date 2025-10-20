import React, { useState } from 'react';

export const NichoIdealContent = () => {
  const [nichoCandidates, setNichoCandidates] = useState([
    { id: 1, name: '', score: 0 },
    { id: 2, name: '', score: 0 },
    { id: 3, name: '', score: 0 }
  ]);
  const [keyQuestions, setKeyQuestions] = useState<Record<number, boolean[]>>({});
  const [generalQuestions, setGeneralQuestions] = useState<Record<number, boolean[]>>({});
  const [selectedNicho, setSelectedNicho] = useState<number | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [expandedExample, setExpandedExample] = useState<number | null>(null);

  const ejemplosNichos = [
    {
      id: 1,
      icon: '🏠',
      title: 'Dueños de Airbnb sin tiempo',
      solution: 'Gestión remota de reservas y atención al huésped',
      urgency: 'Alto',
      payment: '$500-2000/mes',
      color: 'blue'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Tatuadores sin agenda online',
      solution: 'Creación de sistemas de reservas automatizadas',
      urgency: 'Medio',
      payment: '$300-800 único',
      color: 'purple'
    },
    {
      id: 3,
      icon: '👨‍🍳',
      title: 'Cocineros caseros que venden por WhatsApp',
      solution: 'Tienda online simple + delivery local',
      urgency: 'Alto',
      payment: '$400-1200 único',
      color: 'green'
    },
    {
      id: 4,
      icon: '🧠',
      title: 'Psicólogos tradicionales',
      solution: 'Asesoría para llevar su consulta a Zoom y escalar online',
      urgency: 'Alto',
      payment: '$800-3000 único',
      color: 'teal'
    },
    {
      id: 5,
      icon: '📊',
      title: 'Contadores con clientes desordenados',
      solution: 'Automatización de reportes y recordatorios',
      urgency: 'Medio',
      payment: '$500-1500/mes',
      color: 'orange'
    },
    {
      id: 6,
      icon: '💪',
      title: 'Coaches sin contenido',
      solution: 'Creación de mini productos digitales y lanzamientos express',
      urgency: 'Alto',
      payment: '$600-2000 único',
      color: 'pink'
    },
    {
      id: 7,
      icon: '📱',
      title: 'Negocios con Instagram activo pero sin ventas',
      solution: 'Optimización de perfil y estrategia de DM',
      urgency: 'Muy Alto',
      payment: '$400-1500/mes',
      color: 'red'
    },
    {
      id: 8,
      icon: '🏪',
      title: 'Locales con mucha demanda pero sin sistema',
      solution: 'Implementar turnos online y pagos previos',
      urgency: 'Alto',
      payment: '$500-1800 único',
      color: 'indigo'
    }
  ];

  const preguntasClave = [
    '¿Este grupo tiene un problema urgente que le moleste de verdad?',
    '¿Saben que tienen ese problema y buscan ayuda activamente?',
    '¿Es un mercado que está creciendo o tiene potencial futuro?',
    '¿Pueden pagar por una solución premium sin problemas?',
    '¿Te interesa genuinamente este tema o estas personas?'
  ];

  const preguntasGenerales = [
    '¿Es un mercado grande? (+30.000 personas)',
    '¿Ya hay competidores ganando en este nicho?',
    '¿Podés destacarte en menos de 6 meses?',
    '¿Podés estandarizar lo que hacés?',
    '¿Sabés dónde encontrar a estas personas online?',
    '¿Este nicho genera impacto positivo?',
    '¿Están activos en redes sociales?',
    '¿Podés contactarlos sin intermediarios?',
    '¿Entendés cómo piensan o podés aprenderlo rápido?',
    '¿Podés hablar su idioma (literal y emocional)?'
  ];

  const updateNichoName = (id: number, name: string) => {
    setNichoCandidates(prev => prev.map(n => 
      n.id === id ? { ...n, name } : n
    ));
  };

  const toggleKeyQuestion = (nichoId: number, questionIndex: number) => {
    setKeyQuestions(prev => {
      const current = prev[nichoId] || new Array(5).fill(false);
      const updated = [...current];
      updated[questionIndex] = !updated[questionIndex];
      return { ...prev, [nichoId]: updated };
    });
  };

  const toggleGeneralQuestion = (nichoId: number, questionIndex: number) => {
    setGeneralQuestions(prev => {
      const current = prev[nichoId] || new Array(10).fill(false);
      const updated = [...current];
      updated[questionIndex] = !updated[questionIndex];
      return { ...prev, [nichoId]: updated };
    });
  };

  const calculateScore = (nichoId: number) => {
    const keyAnswers = keyQuestions[nichoId] || [];
    const generalAnswers = generalQuestions[nichoId] || [];
    
    // Si falla alguna pregunta clave, el puntaje es 0
    if (keyAnswers.some((answer, index) => index < 5 && !answer)) {
      return 0;
    }
    
    // Calcular porcentaje de preguntas generales respondidas positivamente
    const generalPositives = generalAnswers.filter(a => a).length;
    const generalPercentage = (generalPositives / 10) * 100;
    
    return Math.round(generalPercentage);
  };

  const getNichoStatus = (nichoId: number) => {
    const keyAnswers = keyQuestions[nichoId] || [];
    const score = calculateScore(nichoId);
    
    // Verificar si todas las preguntas clave están contestadas
    const allKeyAnswered = keyAnswers.length === 5;
    
    if (!allKeyAnswered) return { color: 'gray', message: 'Completá las preguntas clave' };
    
    // Si falla alguna pregunta clave
    if (keyAnswers.some(a => !a)) {
      return { color: 'red', message: '🔴 Descartado - Falla en preguntas clave' };
    }
    
    if (score >= 70) {
      return { color: 'green', message: '🟢 Excelente nicho - Adelante!' };
    } else if (score >= 50) {
      return { color: 'yellow', message: '🟡 Nicho con potencial - Requiere trabajo' };
    } else {
      return { color: 'orange', message: '🟠 Nicho débil - Considerá otras opciones' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero - Estilo Capítulo 2 */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-2">
            Capítulo 2 · Trabajar Online
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            🧭 Cómo Elegir tu Nicho Ideal
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Todo empieza en un solo lugar: elegir el nicho correcto
          </p>
        </div>
      </div>

      {/* Introducción con analogía */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎯 La Verdad Sobre los Nichos
        </h2>
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <p className="text-lg text-gray-800">
              <strong className="text-red-600">Elegir mal el nicho</strong> es como invertir tiempo 
              en aprender a cocinar sushi... en un pueblo donde todos odian el pescado. 🍣❌
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <p className="text-lg text-gray-800">
              <strong className="text-green-600">Pero si elegís bien</strong>, es como abrir una panadería 
              en una ciudad donde todos aman el pan caliente: te buscan, te recomiendan y te pagan bien. 🥖✅
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-yellow-400">
            <p className="text-xl font-bold text-gray-900 text-center">
              Este módulo es tu brújula para evitar errores caros<br/>
              y comenzar con el pie derecho.
            </p>
          </div>
        </div>
      </div>

      {/* ¿Qué es un nicho? */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🧩 ¿Qué es un Nicho?
        </h2>
        <div className="bg-white p-5 rounded-lg border-2 border-blue-300 mb-6">
          <p className="text-lg text-gray-800 font-medium">
            Un nicho es un <span className="text-blue-600 font-bold">grupo específico de personas</span> que 
            tiene un <span className="text-red-600 font-bold">problema, deseo o necesidad</span>... 
            y vos <span className="text-green-600 font-bold">podés ayudarlas con eso</span>.
          </p>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">📌 Ejemplos Reales de Nichos Rentables:</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {ejemplosNichos.map((ejemplo) => (
            <button
              key={ejemplo.id}
              onClick={() => setExpandedExample(expandedExample === ejemplo.id ? null : ejemplo.id)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                expandedExample === ejemplo.id 
                  ? 'bg-white border-blue-400 shadow-lg' 
                  : 'bg-white/70 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{ejemplo.icon}</span>
                    <p className="font-bold text-gray-900">{ejemplo.title}</p>
                  </div>
                  <p className="text-sm text-gray-600">➜ {ejemplo.solution}</p>
                  
                  {expandedExample === ejemplo.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">Urgencia:</span> {ejemplo.urgency}
                      </p>
                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">Rango de pago:</span> {ejemplo.payment}
                      </p>
                    </div>
                  )}
                </div>
                <span className="text-lg">{expandedExample === ejemplo.id ? '🔽' : '▶️'}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
          <p className="text-center font-bold text-gray-900">
            💡 Vos no vas a venderle "a todo el mundo".<br/>
            Vas a ayudar a un grupo que tiene un problema real.<br/>
            <span className="text-yellow-700">Eso hace que te escuchen, te valoren y estén dispuestos a pagarte.</span>
          </p>
        </div>
      </div>

      {/* Evaluador de Nichos Interactivo */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          📋 Evaluá Tus Ideas de Nicho
        </h2>

        <div className="bg-white p-4 rounded-lg border-2 border-purple-300 mb-6">
          <p className="text-gray-800 mb-2">
            <strong className="text-purple-700">✅ Preguntas Clave:</strong> Si fallás en UNA, descartá el nicho.
          </p>
          <p className="text-gray-800">
            <strong className="text-blue-700">💡 Preguntas Generales:</strong> Si al menos el 70% da positivo, es un buen nicho.
          </p>
        </div>

        <div className="space-y-8">
          {nichoCandidates.map((nicho) => (
            <div key={nicho.id} className="bg-white p-6 rounded-lg border-2 border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nicho Candidato #{nicho.id}:
                </label>
                <input
                  type="text"
                  value={nicho.name}
                  onChange={(e) => updateNichoName(nicho.id, e.target.value)}
                  placeholder="Ej: Psicólogos que quieren trabajar online"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                />
              </div>

              {nicho.name.trim().length > 3 && (
                <>
                  {/* Preguntas Clave */}
                  <div className="mb-6">
                    <h4 className="font-bold text-red-600 mb-3">✅ Preguntas Clave (no negociables):</h4>
                    <div className="space-y-2">
                      {preguntasClave.map((pregunta, index) => (
                        <label key={index} className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-red-50">
                          <input
                            type="checkbox"
                            checked={keyQuestions[nicho.id]?.[index] || false}
                            onChange={() => toggleKeyQuestion(nicho.id, index)}
                            className="mt-1"
                          />
                          <span className="text-sm text-gray-700">{pregunta}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preguntas Generales - Solo si pasó las clave */}
                  {keyQuestions[nicho.id]?.every((q, i) => i >= 5 || q) && (
                    <div className="mb-6">
                      <h4 className="font-bold text-blue-600 mb-3">💡 Preguntas Generales (útiles pero negociables):</h4>
                      <div className="space-y-2">
                        {preguntasGenerales.map((pregunta, index) => (
                          <label key={index} className="flex items-start gap-3 cursor-pointer p-2 rounded hover:bg-blue-50">
                            <input
                              type="checkbox"
                              checked={generalQuestions[nicho.id]?.[index] || false}
                              onChange={() => toggleGeneralQuestion(nicho.id, index)}
                              className="mt-1"
                            />
                            <span className="text-sm text-gray-700">{pregunta}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resultado */}
                  {(keyQuestions[nicho.id]?.length === 5) && (
                    <div className={`p-4 rounded-lg border-2 ${
                      getNichoStatus(nicho.id).color === 'green' ? 'bg-green-50 border-green-400' :
                      getNichoStatus(nicho.id).color === 'yellow' ? 'bg-yellow-50 border-yellow-400' :
                      getNichoStatus(nicho.id).color === 'orange' ? 'bg-orange-50 border-orange-400' :
                      getNichoStatus(nicho.id).color === 'red' ? 'bg-red-50 border-red-400' :
                      'bg-gray-50 border-gray-300'
                    }`}>
                      <p className="font-bold text-gray-900 text-lg">
                        {getNichoStatus(nicho.id).message}
                      </p>
                      {calculateScore(nicho.id) > 0 && (
                        <p className="text-sm text-gray-700 mt-1">
                          Puntaje en preguntas generales: {calculateScore(nicho.id)}%
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Resumen de resultados */}
        {nichoCandidates.some(n => n.name.trim().length > 3) && (
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
            <h3 className="font-bold text-gray-900 mb-4">🎯 Resumen de tus Nichos:</h3>
            <div className="space-y-2">
              {nichoCandidates.filter(n => n.name.trim()).map((nicho) => {
                const status = getNichoStatus(nicho.id);
                const score = calculateScore(nicho.id);
                return (
                  <div key={nicho.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium text-gray-800">{nicho.name}</span>
                    <span className={`font-bold ${
                      status.color === 'green' ? 'text-green-600' :
                      status.color === 'yellow' ? 'text-yellow-600' :
                      status.color === 'orange' ? 'text-orange-600' :
                      status.color === 'red' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {score > 0 ? `${score}%` : status.color === 'red' ? 'Descartado' : 'Incompleto'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Conclusión Realista */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl border-2 border-gray-400">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          🧠 Conclusión Realista
        </h2>
        <div className="bg-white p-5 rounded-lg space-y-4">
          <p className="text-lg text-gray-800 font-medium text-center">
            Este no es un test de "ideas lindas".<br/>
            Es una herramienta para que no pierdas meses trabajando<br/>
            en algo que nunca iba a funcionar.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔴</span>
              <p className="text-gray-700">
                <strong>Si tu idea falla en las Preguntas Clave:</strong> descartala.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🟡</span>
              <p className="text-gray-700">
                <strong>Si cumple con al menos 70% de las Generales:</strong> es una semilla que vale la pena plantar.
              </p>
            </div>
          </div>

          <div className="p-4 bg-green-100 rounded-lg border-2 border-green-400 text-center">
            <p className="text-xl font-bold text-green-800">
              Elegir bien el nicho es el 50% del negocio.
            </p>
          </div>
        </div>
      </div>

      {/* Bonus: Prompt para ChatGPT */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">🔓</span>
          Bonus: Prompt Para ChatGPT
        </h2>

        <p className="text-gray-700 mb-4">
          Usá esta herramienta para descubrir nichos que no habías considerado:
        </p>

        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all mb-4"
        >
          {showPrompt ? '🔒 Ocultar Prompt' : '🔓 Ver Prompt Completo'}
        </button>

        {showPrompt && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-indigo-300">
              <p className="text-sm text-gray-800 whitespace-pre-line font-mono">
                {`Actuá como un mentor experto en negocios digitales y análisis de mercado.
Con base en estas habilidades, intereses, experiencias y pasiones que te doy: [completá], 
quiero que me ayudes a descubrir nichos rentables que pueda trabajar 100% desde mi computadora 
y que me permitan tener libertad de tiempo y lugar.

Sugiere entre 3 y 5 nichos reales con potencial comprobado y para cada uno dime:
• Por qué es rentable
• Qué problema específico resuelve
• Qué tipo de cliente lo compra
• Cuál tiene mejor equilibrio entre demanda y competencia para un principiante

Finalmente, recomiéndame cuál sería el mejor para arrancar ahora mismo y explícame por qué.`}
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Completá con tus habilidades e intereses:
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ej: Sé diseño gráfico, me apasiona el fitness, trabajé 3 años en marketing digital..."
                className="w-full p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none"
                rows={3}
              />
            </div>

            {promptInput.trim().length > 20 && (
              <div className="p-4 bg-indigo-100 rounded-lg border-2 border-indigo-300">
                <p className="text-sm text-indigo-800">
                  <strong>💡 Tip:</strong> Copiá el prompt completo con tu información y pegalo en ChatGPT. 
                  Luego evaluá las sugerencias con el test de este módulo.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mensaje final motivador */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-6">🎯 Tu Decisión Más Importante</h2>
        
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            Analizá con atención tus opciones.
          </p>
          <p className="text-2xl font-bold text-yellow-300">
            Reflexioná sinceramente sobre lo que querés lograr.
          </p>
          <p>
            Elegí con claridad el nicho que mejor se adapta<br/>
            a vos y a tus objetivos.
          </p>
        </div>
        
        <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg mb-3">
            Cuando tengas esa decisión firme...
          </p>
          <p className="text-2xl font-bold">
            Avanzá con confianza al próximo módulo 🚀
          </p>
        </div>
      </div>

      {/* Transición al siguiente módulo */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          ✅ Ya elegiste tu nicho ideal...
        </p>
        <p className="text-xl text-gray-700">
          Ahora es hora de construir tu marca personal y destacarte.
        </p>
        <p className="text-lg text-gray-600 mt-4">
          En el próximo módulo aprenderás a posicionarte como la opción #1 
          en tu nicho elegido.
        </p>
      </div>
    </div>
  );
};

export const nichoIdealMetadata = {
  id: 3,
  title: "Cómo Elegir tu Nicho Ideal",
  type: "document" as const,
  duration: "30 min"
};
