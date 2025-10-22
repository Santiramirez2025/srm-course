import React, { useState } from 'react';
import { MessageSquare, AlignLeft, Map, Megaphone, Lightbulb, Copy, CheckCircle, Sparkles } from 'lucide-react';

export const ComunicacionMensajesContent = () => {
  const [mensajeCorto, setMensajeCorto] = useState('');
  const [mensajeLargo, setMensajeLargo] = useState({
    quien: '',
    resultado: '',
    tiempo: '',
    garantia: '',
    polarizacion: ''
  });
  const [estrategia, setEstrategia] = useState('');
  const [pitch, setPitch] = useState({
    promesa: '',
    estrategia: '',
    garantia: '',
    ultimatum: '',
    empaque: ''
  });
  const [seccionActiva, setSeccionActiva] = useState<number | null>(null);
  const [copiado, setCopiado] = useState<string | null>(null);

  const ejemplosReales = [
    {
      marca: 'Nike',
      mensaje: 'Just Do It',
      explicacion: 'No habla de zapatillas, habla de la actitud: ser valiente y activo.'
    },
    {
      marca: 'Apple',
      mensaje: 'Think Different',
      explicacion: 'No habla de computadoras, habla de sentirse único e innovador.'
    },
    {
      marca: 'L\'Oréal',
      mensaje: 'Because You\'re Worth It',
      explicacion: 'Habla de autoestima y valor personal, no de maquillaje.'
    }
  ];

  const componentes = [
    {
      id: 1,
      icon: <MessageSquare className="w-6 h-6" />,
      titulo: 'El Mensaje Corto',
      emoji: '🧠',
      subtitulo: 'Tu carta de presentación (3-6 palabras)',
      descripcion: 'Es lo primero que la gente va a recordar de vos. Tiene que ser fuerte y clara.',
      caracteristicas: [
        'Clara: se entiende al instante',
        'Fuerte: genera emoción o curiosidad',
        'Memorable: fácil de recordar y compartir'
      ],
      tips: [
        'No expliques paso a paso lo que hacés',
        'Hablá de la transformación que lográs',
        'Conectá con el deseo profundo del cliente'
      ]
    },
    {
      id: 2,
      icon: <AlignLeft className="w-6 h-6" />,
      titulo: 'El Mensaje Largo',
      emoji: '📝',
      subtitulo: 'Ampliá el zoom sin perder fuerza (1-4 oraciones)',
      descripcion: 'Explica claramente a quién ayudás, qué resultado entregás, en cuánto tiempo y con qué garantía.',
      caracteristicas: [
        'A quién ayudás',
        'Qué resultado entregás',
        'En cuánto tiempo',
        'Qué garantía ofrecés'
      ],
      tips: [
        'Sé claro y concreto',
        'Usa números o plazos tangibles',
        'Incluí una garantía creíble'
      ]
    },
    {
      id: 3,
      icon: <Map className="w-6 h-6" />,
      titulo: 'La Estrategia',
      emoji: '⚙️',
      subtitulo: '¿Cómo vas a lograr el resultado?',
      descripcion: 'Mostrá que tenés un camino claro, bien pensado y probado. No cuentes todo, solo genera confianza.',
      caracteristicas: [
        'Un método claro y estructurado',
        'Pasos concretos que dan confianza',
        'Sin improvisar, con sistema'
      ],
      tips: [
        'No tiene que contar todos los secretos',
        'Solo despertar interés y dar seguridad',
        'Dejar con ganas de saber más'
      ]
    },
    {
      id: 4,
      icon: <Megaphone className="w-6 h-6" />,
      titulo: 'El Pitch Final',
      emoji: '💥',
      subtitulo: 'Tu mensaje estrella (menos de 2 minutos)',
      descripcion: 'La presentación completa de tu oferta, lista para usar en videos, webs, correos, llamadas.',
      caracteristicas: [
        'La Promesa: resultado concreto',
        'La Estrategia: cómo lo lográs',
        'La Garantía: qué pasa si no funciona',
        'El Ultimátum: qué pierde si no actúa',
        'El Empaque: comparación clara'
      ],
      tips: [
        'Debe leerse en menos de 2 minutos',
        'Hacer pensar: "Esto es justo lo que necesito"',
        'Es tu carta maestra en cualquier situación'
      ]
    }
  ];

  const generarMensajeLargo = () => {
    if (!mensajeLargo.quien || !mensajeLargo.resultado || !mensajeLargo.tiempo) {
      return null;
    }

    let mensaje = `Te ayudo a ${mensajeLargo.quien} a lograr ${mensajeLargo.resultado} en ${mensajeLargo.tiempo}.`;
    
    if (mensajeLargo.garantia) {
      mensaje += ` ${mensajeLargo.garantia}`;
    }
    
    if (mensajeLargo.polarizacion) {
      mensaje += `\n\n⚠️ Esto NO es para vos si ${mensajeLargo.polarizacion}`;
    }

    return mensaje;
  };

  const generarPitchCompleto = () => {
    if (!pitch.promesa || !pitch.estrategia || !pitch.garantia) {
      return null;
    }

    return `🎯 La Promesa:\n${pitch.promesa}\n\n⚙️ Cómo lo logramos:\n${pitch.estrategia}\n\n🛡️ Garantía:\n${pitch.garantia}\n\n⚠️ El Ultimátum:\n${pitch.ultimatum || 'Podés seguir igual... o probar algo que sí funciona.'}\n\n📦 En resumen:\n${pitch.empaque || 'Somos la solución más clara y efectiva para tu problema.'}`;
  };

  const copiarTexto = (texto: string, id: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-200 mb-2">
            Módulo 8 · El Arte de Comunicar Valor
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            🎙️ Mensajes Irresistibles
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Cómo construir ofertas que el mercado no pueda ignorar
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎯 De qué se trata esto
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-800">
            Imaginá que tenés algo valioso entre manos: una solución real, que transforma vidas o negocios.
          </p>
          <p className="text-lg text-gray-800">
            Ahora, la pregunta es... <strong>¿cómo lo contás de forma que el mercado no solo entienda tu valor, sino que lo desee, lo busque y esté dispuesto a pagarlo sin pensarlo dos veces?</strong>
          </p>
          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-800">
              <strong>Este módulo te enseña a convertir tu oferta en un activo irresistible.</strong> No estamos hablando de slogans vacíos o discursos forzados. Esto es estrategia pura, aplicada.
            </p>
          </div>
        </div>
      </div>

      {/* Ejemplos de Marcas Famosas */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          💡 Ejemplos que Funcionan
        </h2>
        <p className="text-gray-700 mb-6">
          Estas marcas no explican lo que hacen. Hablan de la transformación, la identidad y el sentimiento.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {ejemplosReales.map((ejemplo, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border-2 border-yellow-300">
              <p className="font-bold text-gray-900 mb-2">{ejemplo.marca}</p>
              <p className="text-2xl font-bold text-yellow-700 mb-3">"{ejemplo.mensaje}"</p>
              <p className="text-sm text-gray-600">{ejemplo.explicacion}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-gray-800">
            <strong>¿Qué tienen en común?</strong> No explican paso a paso. Hablan de transformación, identidad y deseo profundo.
          </p>
        </div>
      </div>

      {/* Los 4 Componentes */}
      <div className="space-y-6">
        {componentes.map((comp) => (
          <div key={comp.id} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setSeccionActiva(seccionActiva === comp.id ? null : comp.id)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  {comp.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{comp.emoji}</span>
                    <h3 className="text-xl font-bold text-gray-900">{comp.titulo}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{comp.subtitulo}</p>
                </div>
              </div>
              <div className="text-2xl">
                {seccionActiva === comp.id ? '▼' : '▶'}
              </div>
            </button>

            {/* Contenido Expandible */}
            {seccionActiva === comp.id && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="pt-6 space-y-6">
                  {/* Descripción */}
                  <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-800">{comp.descripcion}</p>
                  </div>

                  {/* Características */}
                  <div>
                    <p className="font-bold text-gray-900 mb-3">✅ Debe incluir:</p>
                    <div className="space-y-2">
                      {comp.caracteristicas.map((caract, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700">{caract}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <p className="font-bold text-gray-900 mb-3">💡 Tips clave:</p>
                    <div className="space-y-2">
                      {comp.tips.map((tip, idx) => (
                        <div key={idx} className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                          <p className="text-sm text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formularios según el componente */}
                  {comp.id === 1 && (
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Creá tu Mensaje Corto (3-6 palabras):
                      </label>
                      <input
                        type="text"
                        value={mensajeCorto}
                        onChange={(e) => setMensajeCorto(e.target.value)}
                        placeholder="Ej: Creá. Conectá. Vendé."
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        maxLength={50}
                      />
                      {mensajeCorto && (
                        <div className="mt-4 p-4 bg-white rounded-lg border-2 border-blue-300">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-gray-900">Tu Mensaje:</p>
                            <button
                              onClick={() => copiarTexto(mensajeCorto, 'corto')}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded transition-all"
                            >
                              {copiado === 'corto' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-2xl font-bold text-blue-700">{mensajeCorto}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {comp.id === 2 && (
                    <div className="bg-gray-50 p-5 rounded-lg space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          ¿A quién ayudás?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.quien}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, quien: e.target.value})}
                          placeholder="Ej: clínicas de estética"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          ¿Qué resultado entregás?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.resultado}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, resultado: e.target.value})}
                          placeholder="Ej: organizar turnos sin perder sesiones"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          ¿En cuánto tiempo?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.tiempo}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, tiempo: e.target.value})}
                          placeholder="Ej: 30 días"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          ¿Qué garantía ofrecés?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.garantia}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, garantia: e.target.value})}
                          placeholder="Ej: Si no funciona, te devolvemos el dinero"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Polarización (opcional): ¿Para quién NO es?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.polarizacion}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, polarizacion: e.target.value})}
                          placeholder="Ej: buscás soluciones rápidas sin comprometerte"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      {generarMensajeLargo() && (
                        <div className="mt-4 p-4 bg-white rounded-lg border-2 border-green-300">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-gray-900">Tu Mensaje Largo:</p>
                            <button
                              onClick={() => copiarTexto(generarMensajeLargo()!, 'largo')}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded transition-all flex items-center gap-2"
                            >
                              {copiado === 'largo' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              Copiar
                            </button>
                          </div>
                          <p className="text-gray-800 whitespace-pre-wrap">{generarMensajeLargo()}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {comp.id === 3 && (
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Describe tu estrategia (sin contar todo):
                      </label>
                      <textarea
                        value={estrategia}
                        onChange={(e) => setEstrategia(e.target.value)}
                        placeholder="Ej: Usamos un sistema de 3 pasos probado con más de 100 clínicas: automatizamos la agenda, recordamos turnos y analizamos patrones para optimizar horarios."
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[120px]"
                        rows={4}
                      />
                      {estrategia && (
                        <div className="mt-4 p-4 bg-white rounded-lg border-2 border-blue-300">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-gray-900">Tu Estrategia:</p>
                            <button
                              onClick={() => copiarTexto(estrategia, 'estrategia')}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded transition-all flex items-center gap-2"
                            >
                              {copiado === 'estrategia' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              Copiar
                            </button>
                          </div>
                          <p className="text-gray-800">{estrategia}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {comp.id === 4 && (
                    <div className="bg-gray-50 p-5 rounded-lg space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          1. La Promesa (resultado concreto):
                        </label>
                        <input
                          type="text"
                          value={pitch.promesa}
                          onChange={(e) => setPitch({...pitch, promesa: e.target.value})}
                          placeholder="Ej: Te ayudamos a duplicar tus ventas en 90 días"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          2. La Estrategia (cómo lo lográs):
                        </label>
                        <textarea
                          value={pitch.estrategia}
                          onChange={(e) => setPitch({...pitch, estrategia: e.target.value})}
                          placeholder="Ej: Con un sistema probado de 3 pasos..."
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          3. La Garantía (qué pasa si no funciona):
                        </label>
                        <input
                          type="text"
                          value={pitch.garantia}
                          onChange={(e) => setPitch({...pitch, garantia: e.target.value})}
                          placeholder="Ej: Si no ves resultados en 90 días, te devolvemos todo"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          4. El Ultimátum (qué pierde si no actúa):
                        </label>
                        <input
                          type="text"
                          value={pitch.ultimatum}
                          onChange={(e) => setPitch({...pitch, ultimatum: e.target.value})}
                          placeholder="Ej: Podés seguir igual... o probar algo que sí funciona"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          5. El Empaque (comparación clara):
                        </label>
                        <input
                          type="text"
                          value={pitch.empaque}
                          onChange={(e) => setPitch({...pitch, empaque: e.target.value})}
                          placeholder="Ej: Somos como el Uber de las citas profesionales"
                          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      {generarPitchCompleto() && (
                        <div className="mt-4 p-5 bg-white rounded-lg border-2 border-purple-300">
                          <div className="flex items-center justify-between mb-3">
                            <p className="font-bold text-gray-900 text-lg">🎯 Tu Pitch Completo:</p>
                            <button
                              onClick={() => copiarTexto(generarPitchCompleto()!, 'pitch')}
                              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-all flex items-center gap-2"
                            >
                              {copiado === 'pitch' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                              Copiar Pitch
                            </button>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{generarPitchCompleto()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lo que ganás */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🚀 ¿Qué ganás si aplicás todo esto?
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Mensajes que destacan, incluso cuando todo el mundo grita lo mismo',
            'Explicar tu oferta con tanta claridad que cualquiera lo entiende al instante',
            'Dar confianza desde el primer contacto',
            'Contar tu negocio en menos de 2 minutos de forma memorable'
          ].map((beneficio, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border-2 border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-800">{beneficio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BONUS */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-600" />
          🔓 BONUS: Desbloqueá tu Diferencial Invisible
        </h2>
        <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
          <p className="text-gray-800 mb-4">
            Usá este prompt para descubrir mensajes únicos que nadie más puede copiarte:
          </p>
          <div className="bg-purple-50 p-4 rounded border-2 border-purple-200">
            <p className="text-sm text-gray-800 font-mono">
              "Actuá como mi cliente ideal frustrado y contame, en voz alta, qué problema tiene cada día, qué ha probado sin éxito, qué busca desesperadamente, y qué desearía encontrar en alguien como yo."
            </p>
          </div>
          <button
            onClick={() => copiarTexto('Actuá como mi cliente ideal frustrado y contame, en voz alta, qué problema tiene cada día, qué ha probado sin éxito, qué busca desesperadamente, y qué desearía encontrar en alguien como yo.', 'bonus')}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {copiado === 'bonus' ? <><CheckCircle className="w-5 h-5" /> Copiado</> : <><Copy className="w-5 h-5" /> Copiar Prompt</>}
          </button>
        </div>
      </div>

      {/* Cierre */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          💎 No es sobre ventas. Es sobre liderazgo.
        </h2>
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-200">
            Dejar de pensar como vendedor y empezar a pensar cómo puedo ofrecer valor.
          </p>
          <p className="text-xl text-gray-300">
            No es lo que hacés. Es cómo lo empaquetás. Cómo lo contás. Y cómo lo hacés llegar a quien lo necesita.
          </p>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg mt-6">
            <p className="text-2xl font-bold text-yellow-300">
              👉 Si construís estos activos con honestidad, claridad y empatía…
            </p>
            <p className="text-xl mt-3">
              No solo vas a vender más. Vas a liderar tu mercado.
            </p>
          </div>
        </div>
      </div>

      {/* Transición */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          ✅ Ya sabés cómo comunicar tu oferta de forma irresistible...
        </p>
        <p className="text-xl text-gray-700">
          En el próximo módulo aprenderás dónde y cómo mostrar estos mensajes al mundo para que lleguen a tu cliente ideal.
        </p>
      </div>
    </div>
  );
};

export const comunicacionMensajesMetadata = {
  id: 8,
  title: "Comunicación - Mensajes Irresistibles",
  type: "document" as const,
  duration: "35 min"
};