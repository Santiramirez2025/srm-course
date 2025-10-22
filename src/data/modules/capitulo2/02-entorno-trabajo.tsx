import React, { useState } from 'react';

export const EntornoTrabajoContent = () => {
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [digitalAudit, setDigitalAudit] = useState<{distractions: string[]}>({
    distractions: []
  });
  const [weeklyProgress, setWeeklyProgress] = useState({
    spaceComfort: 5,
    bestChange: '',
    nextWeek: ''
  });
  const [checkedImprovements, setCheckedImprovements] = useState<string[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const espaciosTrabajo = [
    {
      id: 1,
      icon: '🛏️',
      title: 'Dormitorio Compartido',
      challenges: ['Poco espacio', 'Distracciones', 'Falta de privacidad'],
      solutions: ['Crear horarios', 'Usar auriculares', 'Señales visuales'],
      color: 'blue'
    },
    {
      id: 2,
      icon: '🍽️',
      title: 'Mesa de Cocina/Comedor',
      challenges: ['Uso múltiple', 'Necesidad de despejar', 'Ruido familiar'],
      solutions: ['Horarios definidos', 'Kit móvil de trabajo', 'Acuerdos familiares'],
      color: 'green'
    },
    {
      id: 3,
      icon: '🛋️',
      title: 'Sala Compartida',
      challenges: ['TV y distracciones', 'Tráfico constante', 'Sin espacio fijo'],
      solutions: ['Zona designada', 'Auriculares', 'Organización portátil'],
      color: 'purple'
    },
    {
      id: 4,
      icon: '📚',
      title: 'Biblioteca/Cafetería',
      challenges: ['Sin control del entorno', 'Tiempo limitado', 'Ruido variable'],
      solutions: ['Kit portátil', 'Múltiples opciones', 'Horarios estratégicos'],
      color: 'orange'
    }
  ];

  const mejorasPorPresupuesto = [
    {
      id: 'free',
      icon: '🆓',
      range: '$0',
      title: 'Sin Costo',
      items: [
        'Reorganizar cerca de ventana',
        'Limpiar y ordenar',
        'Ajustar altura de monitor con libros',
        'Crear ritual de trabajo',
        'Eliminar distracciones visuales'
      ],
      color: 'gray'
    },
    {
      id: 'low',
      icon: '💵',
      range: '$10-50',
      title: 'Inversión Mínima',
      items: [
        'Planta pequeña',
        'Lámpara de escritorio',
        'Cojín ergonómico',
        'Organizadores básicos',
        'Botella de agua reutilizable'
      ],
      color: 'green'
    },
    {
      id: 'medium',
      icon: '💰',
      range: '$50-200',
      title: 'Mejoras Significativas',
      items: [
        'Silla ergonómica básica',
        'Monitor externo usado',
        'Escritorio pequeño',
        'Auriculares con cancelación',
        'Lámpara de espectro completo'
      ],
      color: 'blue'
    }
  ];

  const principiosUniversales = [
    {
      icon: '🌅',
      title: 'Luz Natural',
      subtitle: 'Tu mejor aliado gratuito',
      tips: [
        'Trabaja cerca de ventanas',
        'Abre cortinas durante el día',
        'Toma descansos al aire libre',
        'Usa luz blanca si no hay ventanas'
      ],
      color: 'yellow'
    },
    {
      icon: '🌬️',
      title: 'Aire Fresco',
      subtitle: 'Energía y claridad mental',
      tips: [
        'Ventila 10-15 minutos cada 2 horas',
        'Sal regularmente si no puedes ventilar',
        'Una planta ayuda con el oxígeno',
        'Evita espacios cerrados por mucho tiempo'
      ],
      color: 'cyan'
    },
    {
      icon: '🧹',
      title: 'Orden Básico',
      subtitle: 'Claridad mental sin minimalismo extremo',
      tips: [
        'Superficie de trabajo despejada',
        'Un lugar para cada cosa',
        '5-10 minutos de orden al día',
        'Elimina lo que no uses'
      ],
      color: 'purple'
    },
    {
      icon: '🪑',
      title: 'Comodidad Física',
      subtitle: 'Tu cuerpo es tu herramienta',
      tips: [
        'Pantalla a altura de ojos',
        'Pies tocando el suelo',
        'Cambiar de posición cada hora',
        'Espalda apoyada correctamente'
      ],
      color: 'red'
    }
  ];

  const toggleImprovement = (id: string) => {
    if (checkedImprovements.includes(id)) {
      setCheckedImprovements(checkedImprovements.filter(i => i !== id));
    } else {
      setCheckedImprovements([...checkedImprovements, id]);
    }
  };

  const toggleDistraction = (distraction: string) => {
    const current = digitalAudit.distractions as string[];
    if (current.includes(distraction)) {
      setDigitalAudit({
        ...digitalAudit,
        distractions: current.filter(d => d !== distraction)
      });
    } else {
      setDigitalAudit({
        ...digitalAudit,
        distractions: [...current, distraction]
      });
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
            🏠 Tu Entorno de Trabajo
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Cómo crear un espacio que te apoye (sin gastar una fortuna)
          </p>
        </div>
      </div>

      {/* Historia de Andrea - Intro impactante */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-l-4 border-teal-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🤝 La Historia de Andrea (y Por Qué Importa)
        </h2>
        <div className="space-y-4 text-lg text-gray-700">
          <p>
            Andrea era estudiante universitaria. Vivía en una residencia compartida. 
            Su "oficina" era un escritorio básico junto a la ventana.
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-teal-300">
            <p className="text-red-600 font-semibold mb-2">
              😔 "Siento que no puedo ser productiva aquí. No tengo la iluminación perfecta, 
              mi compañera hace ruido, y mi escritorio es básico."
            </p>
          </div>
          <p>
            <strong className="text-teal-700">La transformación:</strong> En lugar de enfocarse en lo que NO tenía, 
            optimizó lo que SÍ controlaba.
          </p>
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border-2 border-green-400">
            <p className="font-bold text-green-800 mb-2">✅ 6 meses después:</p>
            <ul className="space-y-1">
              <li>• Mejoró significativamente sus calificaciones</li>
              <li>• Se sentía cómoda y productiva</li>
              <li>• Sin gastar en "oficina perfecta"</li>
            </ul>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-400">
            <p className="text-xl font-bold text-gray-900 text-center">
              💡 No necesitás un entorno perfecto para prosperar.<br/>
              Necesitás un entorno que funcione para vos.
            </p>
          </div>
        </div>
      </div>

      {/* Principios Universales - Grid interactivo */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          💡 4 Principios Universales (Funcionan Siempre)
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {principiosUniversales.map((principio) => (
            <button
              key={principio.title}
              onClick={() => setExpandedSection(
                expandedSection === principio.title ? null : principio.title
              )}
              className={`text-left p-5 rounded-lg border-2 transition-all ${
                expandedSection === principio.title
                  ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-400 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-gray-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{principio.icon}</span>
                    <div>
                      <p className="font-bold text-lg text-gray-900">{principio.title}</p>
                      <p className="text-sm text-gray-600 italic">{principio.subtitle}</p>
                    </div>
                  </div>
                  
                  {expandedSection === principio.title && (
                    <div className="mt-4 space-y-3">
                      <p className="text-gray-700 font-semibold">Implementación práctica:</p>
                      <div className="space-y-2">
                        {principio.tips.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-2xl">
                  {expandedSection === principio.title ? '👇' : '👉'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mejoras por Presupuesto - Sección expandible */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          💰 Mejoras Según Tu Presupuesto
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {mejorasPorPresupuesto.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setSelectedBudget(
                selectedBudget === categoria.id ? null : categoria.id
              )}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedBudget === categoria.id
                  ? 'bg-white border-green-400 shadow-lg'
                  : 'bg-white/50 border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="text-center mb-3">
                <span className="text-4xl">{categoria.icon}</span>
                <p className="font-bold text-xl text-gray-900 mt-2">{categoria.range}</p>
                <p className="text-sm text-gray-600">{categoria.title}</p>
              </div>
              
              {selectedBudget === categoria.id && (
                <div className="text-left mt-4 pt-4 border-t border-green-200">
                  <p className="font-semibold text-gray-700 mb-3">Opciones disponibles:</p>
                  <div className="space-y-2">
                    {categoria.items.map((item, i) => (
                      <label key={i} className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkedImprovements.includes(`${categoria.id}-${i}`)}
                          onChange={() => toggleImprovement(`${categoria.id}-${i}`)}
                          className="mt-1"
                        />
                        <span className="text-sm text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {checkedImprovements.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-400">
            <p className="font-bold text-gray-900">
              ✅ Has seleccionado {checkedImprovements.length} mejoras
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Empezá con 1-2 cambios esta semana. El progreso gradual es más sostenible.
            </p>
          </div>
        )}
      </div>

      {/* Adaptaciones por Situación */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          🏠 Soluciones Para Tu Situación
        </h2>
        
        <p className="text-center text-gray-600">
          Seleccioná tu tipo de espacio para ver soluciones específicas
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {espaciosTrabajo.map((espacio) => (
            <div key={espacio.id} className="space-y-3">
              <button
                onClick={() => setSelectedSpace(
                  selectedSpace === espacio.id ? null : espacio.id
                )}
                className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                  selectedSpace === espacio.id
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{espacio.icon}</span>
                    <p className="font-bold text-lg text-gray-900">{espacio.title}</p>
                  </div>
                  <span className="text-2xl">
                    {selectedSpace === espacio.id ? '👇' : '👉'}
                  </span>
                </div>
              </button>

              {selectedSpace === espacio.id && (
                <div className="bg-white p-5 rounded-lg border-2 border-blue-300 space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-semibold text-red-700 mb-2">🚨 Desafíos comunes:</p>
                    <ul className="space-y-1">
                      {espacio.challenges.map((challenge, i) => (
                        <li key={i} className="text-sm text-gray-700">• {challenge}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-semibold text-green-700 mb-2">✅ Soluciones prácticas:</p>
                    <ul className="space-y-1">
                      {espacio.solutions.map((solution, i) => (
                        <li key={i} className="text-sm text-gray-700">• {solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Higiene Digital - Sección interactiva */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">📱</span>
          Higiene Digital: Tu Espacio Virtual
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Tu entorno digital es tan importante como tu espacio físico. Las redes sociales pueden ser tu mayor distracción.
        </p>

        <div className="space-y-6">
          {/* Señales de alerta */}
          <div className="bg-red-50 p-5 rounded-lg border-2 border-red-200">
            <p className="font-bold text-red-700 mb-3">🚨 Señales de que necesitás limpieza digital:</p>
            <div className="space-y-2">
              {[
                'Revisás redes automáticamente sin razón',
                'Te sentís peor después de usar redes sociales',
                'No podés concentrarte sin revisar el teléfono',
                'Comparás constantemente tu vida con otros',
                'Perdés horas sin darte cuenta'
              ].map((signal, i) => (
                <label key={i} className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={() => toggleDistraction(signal)}
                    checked={digitalAudit.distractions.includes(signal)}
                  />
                  <span className="text-sm text-gray-700">{signal}</span>
                </label>
              ))}
            </div>
            
            {digitalAudit.distractions.length >= 3 && (
              <div className="mt-4 p-3 bg-red-100 rounded border-2 border-red-300">
                <p className="text-red-800 font-bold">
                  ⚠️ Identificaste {digitalAudit.distractions.length} señales. 
                  Es hora de actuar.
                </p>
              </div>
            )}
          </div>

          {/* Plan de 4 semanas */}
          <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
            <p className="font-bold text-gray-900 mb-4">📅 Plan de Limpieza Digital (4 Semanas)</p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-purple-400 pl-4">
                <p className="font-semibold text-purple-700">Semana 1: Auditoría</p>
                <p className="text-sm text-gray-600">Revisa tiempo de pantalla, identifica apps problemáticas</p>
              </div>
              
              <div className="border-l-4 border-pink-400 pl-4">
                <p className="font-semibold text-pink-700">Semana 2: Curación</p>
                <p className="text-sm text-gray-600">Deja de seguir cuentas tóxicas, silencia palabras negativas</p>
              </div>
              
              <div className="border-l-4 border-orange-400 pl-4">
                <p className="font-semibold text-orange-700">Semana 3: Límites</p>
                <p className="text-sm text-gray-600">Configura límites de tiempo, crea zonas libres de teléfono</p>
              </div>
              
              <div className="border-l-4 border-green-400 pl-4">
                <p className="font-semibold text-green-700">Semana 4: Hábitos nuevos</p>
                <p className="text-sm text-gray-600">Reemplaza scroll con actividades productivas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Herramienta de evaluación personal */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🎁 Tu Evaluador Personal de Espacio
        </h2>

        <div className="space-y-6">
          {/* Evaluación de espacio actual */}
          <div className="bg-white p-5 rounded-lg border-2 border-orange-200">
            <h3 className="font-bold text-gray-900 mb-4">📍 ¿Cómo está tu espacio ahora?</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nivel de comodidad actual (1-10):
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={weeklyProgress.spaceComfort}
                  onChange={(e) => setWeeklyProgress({
                    ...weeklyProgress,
                    spaceComfort: parseInt(e.target.value)
                  })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>😔 Incómodo</span>
                  <span className="font-bold text-lg text-orange-600">
                    {weeklyProgress.spaceComfort}/10
                  </span>
                  <span>😊 Perfecto</span>
                </div>
              </div>

              {weeklyProgress.spaceComfort <= 5 && (
                <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-300">
                  <p className="text-sm text-gray-700">
                    💡 Con pequeños cambios podés mejorar mucho. Empezá con los principios universales.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ¿Qué cambio tuvo mayor impacto esta semana?
                </label>
                <textarea
                  value={weeklyProgress.bestChange}
                  onChange={(e) => setWeeklyProgress({
                    ...weeklyProgress,
                    bestChange: e.target.value
                  })}
                  placeholder="Ej: Reorganicé mi escritorio cerca de la ventana y ahora tengo mejor luz..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ¿Qué querés mejorar la próxima semana?
                </label>
                <textarea
                  value={weeklyProgress.nextWeek}
                  onChange={(e) => setWeeklyProgress({
                    ...weeklyProgress,
                    nextWeek: e.target.value
                  })}
                  placeholder="Ej: Voy a configurar límites de tiempo en Instagram..."
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {(weeklyProgress.bestChange || weeklyProgress.nextWeek) && (
            <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
              <p className="font-bold text-green-800 mb-2">
                🎯 Tu plan está tomando forma
              </p>
              <p className="text-sm text-gray-700">
                Recordá: Progreso gradual &gt; Perfección instantánea
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mensaje final potente */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-6">✨ La Verdad Sobre Espacios "Perfectos"</h2>
        
        <div className="space-y-4 text-xl leading-relaxed max-w-3xl mx-auto">
          <p>
            No existe el entorno perfecto universal.
          </p>
          <p className="text-2xl font-bold text-yellow-300">
            Tu mejor espacio es el que se adapta a TU realidad.
          </p>
          <p>
            Miles de personas exitosas trabajaron desde cocinas, bibliotecas, 
            cafeterías y espacios compartidos.
          </p>
        </div>
        
        <div className="mt-8 bg-white/10 backdrop-blur p-6 rounded-lg max-w-2xl mx-auto">
          <p className="text-lg mb-3">
            Tu entorno debe apoyarte...
          </p>
          <p className="text-2xl font-bold">
            Pero NO define tu potencial. 💪
          </p>
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-lg">
            El objetivo no es impresionar a otros con tu espacio.
          </p>
          <p className="text-2xl font-bold text-yellow-300">
            Es crear condiciones para que VOS prosperes.
          </p>
        </div>
      </div>

      {/* Transición al siguiente módulo */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          🚀 Ya tenés tu espacio optimizado...
        </p>
        <p className="text-xl text-gray-700">
          Ahora es hora de aprender a encontrar tu nicho perfecto en el mundo online.
        </p>
        <p className="text-lg text-gray-600 mt-4">
          En el próximo módulo descubrirás cómo identificar exactamente a quién servir 
          y cómo posicionarte para que te encuentren.
        </p>
      </div>
    </div>
  );
};

export const entornoTrabajoMetadata = {
  id: 2,
  title: "Tu Entorno de Trabajo",
  type: "document" as const,
  duration: "25 min"
};