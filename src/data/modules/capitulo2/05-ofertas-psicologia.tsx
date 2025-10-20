import React, { useState } from 'react';
import { Zap, Target, AlertCircle, Heart, Activity, Shield, Lock, Unlock, ArrowRight } from 'lucide-react';

export const OfertasIPsicologiaContent = () => {
  const [fuerzaSeleccionada, setFuerzaSeleccionada] = useState<number | null>(null);
  const [llaveDesbloqueada, setLlaveDesbloqueada] = useState<number[]>([]);
  const [piscinaSeleccionada, setPiscinaSeleccionada] = useState<number | null>(null);
  const [dolorSlider, setDolorSlider] = useState(50);
  const [confianzaSlider, setConfianzaSlider] = useState(50);

  const seissFuerzas = [
    {
      id: 1,
      nombre: 'Impulso (Drive)',
      emoji: '🔥',
      descripcion: 'Es la chispa emocional que lo empuja a moverse, el "ya no aguanto más esto" o el "quiero eso con todo mi ser".',
      color: 'red'
    },
    {
      id: 2,
      nombre: 'Meta (Goal)',
      emoji: '🎯',
      descripcion: 'Es el "para qué" de todo. Una visión clara, deseable y realista de su futuro ideal.',
      color: 'blue'
    },
    {
      id: 3,
      nombre: 'Problema (Problem)',
      emoji: '🧱',
      descripcion: 'Es la barrera que lo frena, aunque tenga ganas. Lo que hace que sus intentos terminen en frustración.',
      color: 'orange'
    },
    {
      id: 4,
      nombre: 'Dolor (Pain)',
      emoji: '😣',
      descripcion: 'Es la experiencia emocional de ese problema. No es racional: es visceral. Se siente en el cuerpo, en el día a día.',
      color: 'purple'
    },
    {
      id: 5,
      nombre: 'Acción (Action)',
      emoji: '🩹',
      descripcion: 'Es el parche momentáneo. Lo que hace para calmar la angustia… aunque no sea lo que realmente necesita.',
      color: 'yellow'
    },
    {
      id: 6,
      nombre: 'Confianza (Confidence)',
      emoji: '🛡',
      descripcion: 'Es lo que hace que diga: "con esta persona sí me animo". Es credibilidad + conexión emocional.',
      color: 'green'
    }
  ];

  const rutaCliente = [
    {
      paso: 1,
      titulo: 'El impulso enciende un deseo',
      emoji: '⚡',
      descripcion: 'Algo interno se enciende. Es como una alarma emocional que dice: "¡Basta!" o "¡Necesito eso ya!"',
      nota: 'Este impulso no siempre se nota en voz alta, pero se manifiesta en búsquedas, en frustraciones internas, en comparaciones con otros.'
    },
    {
      paso: 2,
      titulo: 'El deseo revela un problema',
      emoji: '🔍',
      descripcion: 'Cuando desea algo mejor, se da cuenta de que está lejos. Aparece el "pero" que lo frena.',
      nota: 'El deseo por sí solo no basta. El cliente empieza a ser consciente de lo que le falta. Ahí nace el problema.'
    },
    {
      paso: 3,
      titulo: 'El problema genera incomodidad',
      emoji: '😰',
      descripcion: 'Esa brecha empieza a doler. Lo siente en su día a día, en sus decisiones, en su autoestima.',
      nota: 'La incomodidad no es solo racional, es emocional. Es lo que lo hace decir: "Así no puedo seguir."'
    },
    {
      paso: 4,
      titulo: 'El dolor empuja a la acción',
      emoji: '🏃',
      descripcion: 'El dolor se vuelve insoportable… y entonces actúa. Busca, compara, investiga, se mueve.',
      nota: 'Nadie actúa solo por lógica. Actúan porque algo les duele lo suficiente como para dejar la inercia.'
    },
    {
      paso: 5,
      titulo: 'La confianza desbloquea la decisión',
      emoji: '🔓',
      descripcion: 'Está por decidir, pero hay una última barrera: ¿puedo confiar en vos? ¿en tu método? ¿en mí mismo?',
      nota: 'Confianza no es solo credibilidad técnica. Es emocional: tiene que sentir que vos sos la persona correcta para ayudarlo.'
    }
  ];

  const tresLlaves = [
    {
      id: 1,
      titulo: 'Tu Oferta',
      subtitulo: 'Lo que decís que hacés',
      descripcion: 'Cuando está bien estructurada, transmite seguridad inmediata. Es concreta, enfocada, clara y valiente.',
      sentimiento: '"Esto es justo lo que necesito, y está hecho para mí."',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      titulo: 'Vos',
      subtitulo: 'Cómo lo decís y lo transmitís',
      descripcion: 'Las personas no confían en empresas. Confían en personas. Si hablás desde la experiencia, con seguridad, empatía y convicción, el cliente lo siente.',
      sentimiento: '"Si vos confiás tanto en lo que hacés... quizás yo también debería hacerlo."',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      titulo: 'Tus Clientes',
      subtitulo: 'Lo que otros dicen de vos',
      descripcion: 'Casos de éxito, testimonios, capturas reales, antes y después, historias de transformación.',
      sentimiento: 'Nada genera más confianza que ver que otros ya lograron lo que yo quiero lograr.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const cincoPiscinas = [
    {
      id: 1,
      nivel: 'Superficial',
      nombre: 'Problemas Concretos',
      emoji: '🟣',
      profundidad: 20,
      descripcion: 'Son los dolores evidentes. Los que el cliente reconoce y hasta puede googlear. Es lo que dice en voz alta.',
      nota: 'Esta piscina es superficial, pero es la puerta de entrada.'
    },
    {
      id: 2,
      nivel: 'Media',
      nombre: 'Vacíos Emocionales',
      emoji: '🟡',
      profundidad: 40,
      descripcion: 'Deseos silenciosos. No son visibles, pero están todo el tiempo detrás de sus acciones. Son lo que realmente duele.',
      nota: 'Esta es la piscina que genera conexión emocional profunda. Cuando tu mensaje toca esto, la persona siente que le estás hablando a su alma.'
    },
    {
      id: 3,
      nivel: 'Profunda',
      nombre: 'Cargas No Deseadas',
      emoji: '🔴',
      profundidad: 60,
      descripcion: 'Responsabilidades que no eligió, pero que lo aplastan. Siente que no tiene derecho a soltar ni equivocarse.',
      nota: 'Esta piscina es silenciosa pero pesada. El cliente no lo dice, pero lo vive cada día. Y tu oferta puede ser el alivio que espera.'
    },
    {
      id: 4,
      nivel: 'Muy Profunda',
      nombre: 'Deseos No Cumplidos',
      emoji: '🟢',
      profundidad: 80,
      descripcion: 'Metas postergadas, promesas olvidadas, sueños que alguna vez tuvo… y fue dejando por falta de guía, apoyo o tiempo.',
      nota: 'Esta piscina es profunda. Cuando tu oferta le recuerda ese sueño que enterró, se activa algo muy poderoso: el deseo de volver a intentarlo.'
    },
    {
      id: 5,
      nivel: 'Abismal',
      nombre: 'Consecuencias Acumuladas',
      emoji: '⚫',
      profundidad: 100,
      descripcion: 'Es el deterioro silencioso. Lo que se va sumando con el tiempo y lo desgasta por dentro. No explota… pero lo carcome.',
      nota: 'Esta es la piscina más peligrosa. Porque el cliente puede estar al borde de rendirse. Y una buena oferta no solo vende: rescata.'
    }
  ];

  const toggleLlave = (id: number) => {
    if (llaveDesbloqueada.includes(id)) {
      setLlaveDesbloqueada(llaveDesbloqueada.filter(l => l !== id));
    } else {
      setLlaveDesbloqueada([...llaveDesbloqueada, id]);
    }
  };

  const umbralSuperado = () => {
    return (dolorSlider * confianzaSlider) > 2500;
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-orange-200 mb-2">
            Módulo 5A · Parte 1 de 2
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            🧠 Ofertas I: La Psicología de la Compra
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Antes de construir tu oferta, necesitás entender cómo piensa y siente tu cliente cuando decide comprar.
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl border-2 border-gray-700">
        <h2 className="text-2xl font-bold mb-4">🚀 El Motor Invisible de tu Negocio</h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-200">
            Si querés transformar completos desconocidos en clientes fieles de manera sistemática, predecible y escalable... esta es tu hoja de ruta.
          </p>
          <div className="bg-red-900/50 p-5 rounded-lg border-2 border-red-500">
            <p className="text-xl font-bold text-center">
              La oferta es el motor invisible. Sin entender la psicología detrás, todo tu esfuerzo se desperdicia.
            </p>
          </div>
        </div>
      </div>

      {/* Las 6 Fuerzas */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🧠 Las 6 Fuerzas que Activan una Compra
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-blue-300 mb-6">
          <p className="text-lg text-gray-800 mb-3">
            Toda venta, antes de suceder en la billetera, sucede en la mente y el corazón del cliente.
          </p>
          <p className="text-xl font-bold text-blue-700 text-center">
            Para que una persona diga "sí, lo quiero", deben alinearse seis fuerzas fundamentales.
          </p>
          <p className="text-center text-red-600 font-bold mt-3">
            ⚠️ Si una sola falta, la venta se cae.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {seissFuerzas.map((fuerza) => (
            <button
              key={fuerza.id}
              onClick={() => setFuerzaSeleccionada(fuerzaSeleccionada === fuerza.id ? null : fuerza.id)}
              className={`text-left p-5 rounded-lg border-2 bg-white transition-all ${
                fuerzaSeleccionada === fuerza.id 
                  ? 'ring-4 ring-blue-300 border-blue-500' 
                  : 'border-blue-200 hover:border-blue-400'
              }`}
            >
              <div className="text-center mb-3">
                <span className="text-5xl">{fuerza.emoji}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{fuerza.nombre}</h3>
              {fuerzaSeleccionada === fuerza.id && (
                <p className="text-sm text-gray-700 mt-3 pt-3 border-t border-gray-200">
                  {fuerza.descripcion}
                </p>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-lg text-center">
          <p className="text-lg font-bold">
            No es intuición. Es estructura. Una oferta potente los activa todos al mismo tiempo.
          </p>
        </div>
      </div>

      {/* La Ruta Interna del Cliente */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🔁 La Ruta Interna del Cliente
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-purple-300 mb-6">
          <p className="text-lg text-gray-800">
            El cliente atraviesa una cadena emocional que, si no se completa, nunca llega a decidirse.
          </p>
          <p className="text-center text-purple-700 font-bold mt-3">
            Imaginá esto como un dominó emocional: si una pieza no cae, la siguiente tampoco.
          </p>
        </div>

        <div className="space-y-4">
          {rutaCliente.map((paso, idx) => (
            <div key={paso.paso} className="bg-white p-5 rounded-lg border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {paso.paso}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{paso.emoji}</span>
                    <h3 className="font-bold text-gray-900">{paso.titulo}</h3>
                  </div>
                  <p className="text-gray-700 mb-3">{paso.descripcion}</p>
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                    <p className="text-sm text-gray-700">💡 {paso.nota}</p>
                  </div>
                </div>
                {idx < rutaCliente.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-purple-400 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-5 rounded-lg">
          <p className="text-lg font-bold text-center mb-2">
            🔥 No necesitás inventar el dolor. Está ahí.
          </p>
          <p className="text-center">
            Tu trabajo es amplificarlo con empatía. No obligás a nadie a comprar. Solo creás las condiciones para que quieran moverse.
          </p>
        </div>
      </div>

      {/* Las 3 Llaves */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🔒 Las 3 Llaves de la Confianza
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-cyan-300 mb-6">
          <p className="text-lg text-gray-800 mb-3">
            Podés tener el mejor producto del mundo, pero si tu cliente no confía... no te compra.
          </p>
          <p className="text-xl font-bold text-cyan-700 text-center">
            La confianza es el puente invisible entre el deseo y la acción.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {tresLlaves.map((llave) => (
            <button
              key={llave.id}
              onClick={() => toggleLlave(llave.id)}
              className="text-left p-6 bg-white rounded-lg border-2 border-cyan-200 hover:border-cyan-400 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${llave.color}`}>
                  {llaveDesbloqueada.includes(llave.id) ? (
                    <Unlock className="w-6 h-6 text-white" />
                  ) : (
                    <Lock className="w-6 h-6 text-white" />
                  )}
                </div>
                <span className="text-2xl">
                  {llaveDesbloqueada.includes(llave.id) ? '🔓' : '🔐'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{llave.titulo}</h3>
              <p className="text-sm text-gray-600 mb-3">{llave.subtitulo}</p>

              {llaveDesbloqueada.includes(llave.id) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-700 mb-3">{llave.descripcion}</p>
                  <div className="bg-cyan-50 p-3 rounded border-l-4 border-cyan-400">
                    <p className="text-xs text-gray-700 italic">{llave.sentimiento}</p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-cyan-100 p-5 rounded-lg border-l-4 border-cyan-600">
          <p className="text-gray-800 mb-2">
            <strong>🎯 Con solo una de estas bien trabajada podés cerrar ventas.</strong>
          </p>
          <p className="text-gray-700">
            Pero si las tres están sólidas, te volvés imparable. Y si tenés que elegir por dónde empezar... empezá por tu oferta.
          </p>
        </div>
      </div>

      {/* Las 5 Piscinas del Dolor */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          😖 Las 5 Piscinas del Dolor
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-gray-300 mb-6">
          <p className="text-lg text-gray-800 mb-3">
            El dolor es el combustible de toda decisión importante. Cuando algo duele lo suficiente, el cliente se mueve.
          </p>
          <p className="text-gray-700">
            Pensá en estos dolores como cinco piscinas donde tu cliente se ahoga… y vos llegás con un salvavidas.
          </p>
        </div>

        <div className="space-y-4">
          {cincoPiscinas.map((piscina) => (
            <button
              key={piscina.id}
              onClick={() => setPiscinaSeleccionada(piscinaSeleccionada === piscina.id ? null : piscina.id)}
              className={`w-full text-left p-5 rounded-lg border-2 bg-white transition-all ${
                piscinaSeleccionada === piscina.id 
                  ? 'ring-4 ring-blue-300 border-blue-500' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{piscina.emoji}</span>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">{piscina.nivel}</p>
                    <h3 className="text-lg font-bold text-gray-900">{piscina.nombre}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${piscina.profundidad}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">{piscina.profundidad}% profundo</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-2">{piscina.descripcion}</p>

              {piscinaSeleccionada === piscina.id && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-gray-700">💡 {piscina.nota}</p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white p-5 rounded-lg">
          <p className="text-lg font-bold text-center mb-3">
            🔥 Activar el dolor no es herir. Es reflejar la verdad que ya existe.
          </p>
          <p className="text-center">
            Y mostrar que hay una salida. Porque cuando el dolor es claro… el movimiento se vuelve urgente.
          </p>
        </div>
      </div>

      {/* El Umbral de Acción */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🧮 El Umbral de Acción
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-orange-300 mb-6">
          <p className="text-lg text-gray-800 mb-4">
            Toda persona necesita cruzar una barrera interna antes de tomar una decisión.
          </p>
          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-lg text-center">
            <p className="text-2xl font-bold text-gray-900 mb-2">
              Dolor × Confianza {'>'} Umbral = ACCIÓN
            </p>
            <p className="text-sm text-gray-700">
              Tu cliente solo actúa cuando lo que siente (dolor) y lo que cree (confianza) superan cierto punto.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-orange-300">
          <h3 className="font-bold text-gray-900 mb-4 text-center">
            🎛️ Calculadora del Umbral de Acción
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-gray-700">😣 Nivel de Dolor:</label>
                <span className="text-2xl font-bold text-red-600">{dolorSlider}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={dolorSlider}
                onChange={(e) => setDolorSlider(Number(e.target.value))}
                className="w-full h-3 bg-red-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-1">
                {dolorSlider < 30 ? 'Muy cómodo - No se mueve' : 
                 dolorSlider < 60 ? 'Incómodo - Está pensando' : 
                 'Muy incómodo - Busca solución urgente'}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-bold text-gray-700">🛡️ Nivel de Confianza:</label>
                <span className="text-2xl font-bold text-green-600">{confianzaSlider}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={confianzaSlider}
                onChange={(e) => setConfianzaSlider(Number(e.target.value))}
                className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-600 mt-1">
                {confianzaSlider < 30 ? 'Muy inseguro - Muchas dudas' : 
                 confianzaSlider < 60 ? 'Dudoso - Necesita más pruebas' : 
                 'Confiado - Listo para decidir'}
              </p>
            </div>

            <div className="mt-6 p-6 rounded-lg border-4 transition-all" style={{
              backgroundColor: umbralSuperado() ? '#dcfce7' : '#fee2e2',
              borderColor: umbralSuperado() ? '#22c55e' : '#ef4444'
            }}>
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-2">Resultado:</p>
                <p className="text-4xl font-bold mb-3" style={{
                  color: umbralSuperado() ? '#16a34a' : '#dc2626'
                }}>
                  {dolorSlider * confianzaSlider}
                </p>
                {umbralSuperado() ? (
                  <div>
                    <p className="text-xl font-bold text-green-700 mb-2">✅ ¡UMBRAL SUPERADO!</p>
                    <p className="text-sm text-gray-700">El cliente está listo para comprar</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xl font-bold text-red-700 mb-2">❌ Bajo el Umbral</p>
                    <p className="text-sm text-gray-700">
                      {dolorSlider < 50 ? 'Aumentá el dolor (mostrá urgencia)' : 'Aumentá la confianza (mostrá pruebas)'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-orange-100 p-5 rounded-lg border-2 border-orange-400">
          <p className="text-sm text-gray-800 mb-2">
            <strong>🎯 Esto no es magia. Es matemática emocional.</strong>
          </p>
          <p className="text-sm text-gray-700">
            Cada acción de tu mensaje debe aumentar uno de estos indicadores: 🔹 Dolor → Urgencia o 🔹 Confianza → Seguridad
          </p>
        </div>
      </div>

      {/* Transición */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ✅ Ya entendés la Psicología de la Compra
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-center">
            Ahora sabés cómo piensa y siente tu cliente antes de comprar:
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
              <p className="font-bold">✓ Las 6 Fuerzas</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
              <p className="font-bold">✓ Las 3 Llaves</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-3 rounded-lg text-center">
              <p className="font-bold">✓ Las 5 Piscinas</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur p-5 rounded-lg text-center mt-6">
            <p className="text-xl font-bold mb-2">
              🚀 Siguiente Paso:
            </p>
            <p className="text-lg">
              Ahora vamos a construir tu oferta irresistible usando todo esto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ofertasIPsicologiaMetadata = {
  id: 5,
  title: "Ofertas I - Psicología de la Compra",
  type: "document" as const,
  duration: "25 min"
};