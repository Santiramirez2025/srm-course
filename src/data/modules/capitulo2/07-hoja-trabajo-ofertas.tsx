import React, { useState } from 'react';
import { CheckCircle, Users, Target, Clock, Map, Gift, Shield, Filter, Scale, DollarSign, MessageSquare, Sparkles } from 'lucide-react';

export const HojaTrabajoOfertasContent = () => {
  const [formData, setFormData] = useState({
    quien: '',
    resultado: '',
    tiempo: '',
    metodo: '',
    garantia: '',
    polarizacion: '',
    precio: '',
    mensajeCorto: '',
    pitch: ''
  });

  const [seccionActiva, setSeccionActiva] = useState<number | null>(null);
  const [completados, setCompletados] = useState<{[key: number]: boolean}>({});

  const secciones = [
    {
      id: 1,
      icon: <Users className="w-6 h-6" />,
      titulo: 'Define a quién te dirigís',
      emoji: '🧱',
      campo: 'quien',
      descripcion: 'Sin precisión en este punto, tu oferta se vuelve genérica, y lo genérico no vende.',
      preguntas: [
        '¿Quién es exactamente tu cliente ideal?',
        '¿Qué problema específico tiene que nadie más está resolviendo bien?',
        '¿Qué palabras usa cuando describe su frustración?'
      ],
      placeholder: 'Ej: Psicólogos que quieren llevar su consulta online pero no saben por dónde empezar'
    },
    {
      id: 2,
      icon: <Target className="w-6 h-6" />,
      titulo: 'Prometé un resultado irresistible',
      emoji: '🎯',
      campo: 'resultado',
      descripcion: 'No lo que vos sabés hacer. Sino lo que ellos mueren por conseguir.',
      preguntas: [
        '¿Qué resultado específico van a lograr?',
        '¿Cómo se van a sentir cuando lo logren?',
        '¿Qué cambia en su vida o negocio?'
      ],
      placeholder: 'Ej: Conseguir 10 pacientes nuevos por mes sin depender de referidos'
    },
    {
      id: 3,
      icon: <Clock className="w-6 h-6" />,
      titulo: 'Tiempo realista y deseable',
      emoji: '⏳',
      campo: 'tiempo',
      descripcion: 'Un plazo que motive sin frustrar. Lo ideal: entre 21 y 90 días.',
      preguntas: [
        '¿En cuánto tiempo pueden lograr ese resultado?',
        '¿Por qué toma ese tiempo específicamente?',
        '¿Qué podés hacer para acelerar el proceso?'
      ],
      placeholder: 'Ej: En 60 días - 30 para implementar + 30 para ver resultados'
    },
    {
      id: 4,
      icon: <Map className="w-6 h-6" />,
      titulo: 'Método claro (3-5 pasos)',
      emoji: '🧭',
      campo: 'metodo',
      descripcion: 'Nadie compra confusión. Tu método debe entenderlo un chico de 10 años.',
      preguntas: [
        '¿Cuáles son los 3 a 5 pasos clave?',
        '¿Qué hace que este camino funcione y otros no?',
        '¿Por qué es más rápido/fácil/efectivo?'
      ],
      placeholder: 'Ej: 1. Configuras tu perfil en 10 min\n2. Te enviamos pacientes calificados\n3. Agendas consultas automáticamente\n4. Cobras online sin complicaciones'
    },
    {
      id: 5,
      icon: <Shield className="w-6 h-6" />,
      titulo: 'Inversión del riesgo',
      emoji: '🛡️',
      campo: 'garantia',
      descripcion: 'El cliente teme perder tiempo y quedar como tonto. Vos asumís el riesgo.',
      preguntas: [
        '¿Qué garantía podés ofrecer?',
        '¿Devolución de dinero? ¿Tiempo extra? ¿Compensación?',
        '¿Qué pasa si no funciona?'
      ],
      placeholder: 'Ej: Si en 60 días no conseguís al menos 5 pacientes nuevos, te devolvemos todo + 3 meses gratis'
    },
    {
      id: 6,
      icon: <Filter className="w-6 h-6" />,
      titulo: 'Polarización: no sos para todos',
      emoji: '🚫',
      campo: 'polarizacion',
      descripcion: 'Cuando sos claro sobre a quién NO ayudás, te posicionás como experto.',
      preguntas: [
        '¿Para quién NO es esto?',
        '¿Qué tipo de cliente rechazás?',
        '¿Qué mentalidad o actitud no tolerás?'
      ],
      placeholder: 'Ej: Esto NO es para vos si buscás resultados mágicos sin esfuerzo, o si no estás dispuesto a seguir un proceso probado'
    },
    {
      id: 7,
      icon: <DollarSign className="w-6 h-6" />,
      titulo: 'Precio con propósito',
      emoji: '💰',
      campo: 'precio',
      descripcion: 'No es "ponerle un número". Es hacer sentir que vale mucho más de lo que cuesta.',
      preguntas: [
        '¿Cuánto vale el resultado final para tu cliente?',
        '¿Qué cobra tu competencia?',
        '¿Qué extras podés sumar para justificar precio premium?'
      ],
      placeholder: 'Ej: $997/mes (si cada paciente vale $200 y conseguís 10, son $2000 de retorno)'
    },
    {
      id: 8,
      icon: <MessageSquare className="w-6 h-6" />,
      titulo: 'Mensaje corto (El anzuelo)',
      emoji: '🎣',
      campo: 'mensajeCorto',
      descripcion: 'Una frase que capte atención al instante. Para DMs, redes o publicaciones.',
      preguntas: [
        '¿Cómo resumís tu oferta en una línea?',
        '¿Qué gancho atrapa la atención?',
        '¿Genera curiosidad sin vender todo de una?'
      ],
      placeholder: 'Ej: ¿Y si pudieras llenar tu agenda de pacientes en 60 días sin gastar en publicidad?'
    },
    {
      id: 9,
      icon: <Sparkles className="w-6 h-6" />,
      titulo: 'Pitch (Presentación de 2 min)',
      emoji: '🚀',
      campo: 'pitch',
      descripcion: 'Cómo lo explicás en llamadas, reuniones o eventos. Claro, corto, enfocado.',
      preguntas: [
        '¿Cómo lo presentás cara a cara?',
        '¿Qué dijiste en menos de 2 minutos?',
        '¿Está enfocado en el resultado, no en el proceso?'
      ],
      placeholder: 'Ej: Ayudo a psicólogos a conseguir 10 pacientes por mes en 60 días usando un sistema probado de atracción digital, sin depender de referidos'
    }
  ];

  const handleInputChange = (campo: string, valor: string) => {
    setFormData(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const marcarCompletado = (id: number) => {
    const seccion = secciones.find(s => s.id === id);
    if (seccion && formData[seccion.campo as keyof typeof formData].trim()) {
      setCompletados(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  const calcularProgreso = () => {
    const total = secciones.length;
    const completado = Object.values(completados).filter(v => v).length;
    return Math.round((completado / total) * 100);
  };

  const generarOfertaCompleta = () => {
    if (!formData.quien || !formData.resultado || !formData.tiempo) {
      return null;
    }

    return `Te ayudo a ${formData.resultado.toLowerCase()} en ${formData.tiempo.toLowerCase()}, ${formData.metodo ? `usando ${formData.metodo.split('\n')[0].toLowerCase()}` : 'con un sistema probado'}.${formData.garantia ? ` Garantía: ${formData.garantia.toLowerCase()}` : ''}`;
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-200 mb-2">
            Módulo 7 · Aplicación Práctica
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            🛠️ Hoja de Trabajo
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Una hoja de ruta para construir ofertas tan irresistibles que tu mercado ideal no pueda ignorarlas.
          </p>
        </div>
      </div>

      {/* Regla de Oro */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-2">
            ⚡ La Regla de Oro
          </p>
          <p className="text-xl text-gray-800">
            Si tu oferta es lo suficientemente fuerte, todo lo demás se vuelve más fácil.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {calcularProgreso() > 0 && (
        <div className="bg-white p-6 rounded-xl border-2 border-green-200">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-gray-900">Tu Progreso:</p>
            <p className="text-3xl font-bold text-green-600">{calcularProgreso()}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all"
              style={{ width: `${calcularProgreso()}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            {calcularProgreso() < 30 ? 'Recién empezás, seguí adelante' :
             calcularProgreso() < 70 ? 'Vas muy bien, no pares' :
             calcularProgreso() < 100 ? 'Casi terminás, último esfuerzo' :
             '¡Completaste toda la hoja! 🎉'}
          </p>
        </div>
      )}

      {/* Secciones del Formulario */}
      <div className="space-y-6">
        {secciones.map((seccion) => (
          <div 
            key={seccion.id}
            className={`bg-white rounded-xl border-2 transition-all ${
              completados[seccion.id] 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Header de la Sección */}
            <button
              onClick={() => setSeccionActiva(seccionActiva === seccion.id ? null : seccion.id)}
              className="w-full p-5 text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  completados[seccion.id] 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {completados[seccion.id] ? <CheckCircle className="w-6 h-6" /> : seccion.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{seccion.emoji}</span>
                    <h3 className="font-bold text-gray-900">{seccion.titulo}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{seccion.descripcion}</p>
                </div>
              </div>
              <div className="text-2xl">
                {seccionActiva === seccion.id ? '▼' : '▶'}
              </div>
            </button>

            {/* Contenido Expandible */}
            {seccionActiva === seccion.id && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-200 pt-5">
                {/* Preguntas Guía */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <p className="font-bold text-blue-900 mb-2">💭 Preguntas guía:</p>
                  <ul className="space-y-1 text-sm text-blue-800">
                    {seccion.preguntas.map((pregunta, idx) => (
                      <li key={idx}>• {pregunta}</li>
                    ))}
                  </ul>
                </div>

                {/* Campo de Texto */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tu respuesta:
                  </label>
                  <textarea
                    value={formData[seccion.campo as keyof typeof formData]}
                    onChange={(e) => handleInputChange(seccion.campo, e.target.value)}
                    placeholder={seccion.placeholder}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[120px]"
                    rows={seccion.campo === 'metodo' ? 6 : 4}
                  />
                </div>

                {/* Botón Marcar como Completado */}
                {formData[seccion.campo as keyof typeof formData].trim() && (
                  <button
                    onClick={() => marcarCompletado(seccion.id)}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      completados[seccion.id]
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {completados[seccion.id] ? '✓ Completado' : 'Marcar como Completado'}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* El Ultimátum */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Scale className="w-7 h-7 text-red-600" />
          ⚖️ El Ultimátum: Dos Caminos
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-gray-300 mb-6">
          <p className="text-lg text-gray-800">
            Mostrale a tu cliente dos escenarios opuestos. Ayudalo a ver con claridad lo que gana si actúa y lo que pierde si no hace nada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
            <p className="font-bold text-green-700 mb-3 text-center">🎬 Escenario 1: El Camino Ganador</p>
            <p className="text-sm text-gray-700 italic">
              "En solo {formData.tiempo || '[tiempo]'} podrías estar {formData.resultado || '[resultado]'}, sin {formData.polarizacion ? 'las trabas que te frenan ahora' : '[obstáculos]'} y con un sistema que funciona."
            </p>
          </div>

          <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
            <p className="font-bold text-red-700 mb-3 text-center">🧨 Escenario 2: El Estancamiento</p>
            <p className="text-sm text-gray-700 italic">
              "Si seguís igual, vas a perder otra temporada. Tu competencia va a seguir creciendo. Y vos vas a seguir sintiendo frustración porque nada cambia."
            </p>
          </div>
        </div>

        <div className="mt-4 bg-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
          <p className="text-gray-800 text-center font-bold">
            👉 El verdadero riesgo no es probar algo nuevo... es quedarse donde está.
          </p>
        </div>
      </div>

      {/* Vista Previa de tu Oferta */}
      {generarOfertaCompleta() && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-600" />
            ✨ Vista Previa de tu Oferta
          </h2>

          <div className="bg-white p-6 rounded-lg border-2 border-purple-300">
            <p className="text-xl text-gray-800 leading-relaxed">
              {generarOfertaCompleta()}
            </p>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {formData.mensajeCorto && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-bold text-purple-700 mb-2">🎣 Tu Anzuelo:</p>
                <p className="text-sm text-gray-700">{formData.mensajeCorto}</p>
              </div>
            )}
            {formData.pitch && (
              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="font-bold text-pink-700 mb-2">🚀 Tu Pitch:</p>
                <p className="text-sm text-gray-700">{formData.pitch}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BONUS Final */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-xl border-2 border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🔓 BONUS: Tu Frase de Poder
        </h2>

        <div className="bg-white/10 backdrop-blur p-6 rounded-lg mb-6">
          <p className="text-lg mb-4">
            Completá esta frase como si tu negocio dependiera de ella:
          </p>
          <p className="text-xl font-bold text-yellow-300 text-center p-4 bg-white/5 rounded-lg">
            "Te ayudo a conseguir [resultado concreto] en [tiempo deseable] sin [obstáculo que más teme], gracias a [tu método único]."
          </p>
        </div>

        <div className="bg-yellow-900/30 p-5 rounded-lg border-l-4 border-yellow-500">
          <p className="text-yellow-200 mb-3">
            <strong>⚠️ Respondé con sinceridad brutal.</strong>
          </p>
          <p className="text-white">
            Una oferta poderosa no se arma con fórmulas, se construye con verdad, empatía y estrategia.
          </p>
          <p className="text-gray-300 mt-3">
            No te detengas hasta que cada respuesta te haga pensar: <strong>"¡Si yo fuera mi cliente… compraría ya!"</strong>
          </p>
        </div>
      </div>

      {/* Cierre */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          {calcularProgreso() === 100 
            ? '🎉 ¡Felicitaciones! Completaste tu Hoja de Trabajo'
            : '💪 Seguí completando cada sección'}
        </p>
        <p className="text-lg text-gray-700">
          {calcularProgreso() === 100
            ? 'Ahora tenés todos los elementos para una oferta irresistible. Es hora de probarla en el mercado real.'
            : 'Cada respuesta te acerca a una oferta que vende con magnetismo, no con esfuerzo.'}
        </p>
      </div>
    </div>
  );
};

export const hojaTrabajoOfertasMetadata = {
  id: 7,
  title: "Hoja de Trabajo - Construcción de Ofertas",
  type: "document" as const,
  duration: "Completar paso a paso"
};