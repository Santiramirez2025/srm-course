import React, { useState, useEffect } from 'react';
import { 
  Phone, Mic, Volume2, Clock, CheckCircle, XCircle, 
  Play, Pause, RotateCcw, Target, Award, Zap, Heart,
  MessageCircle, Brain, Eye, AlertTriangle, Sparkles,
  TrendingUp, Star, Shield
} from 'lucide-react';

export const GuiaVozCerrarContent = () => {
  const [pasoActivo, setPasoActivo] = useState<number | null>(null);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [excusaSimulador, setExcusaSimulador] = useState<number | null>(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (pasoActivo !== null && !pausado) {
      let interval: number;
      interval = window.setInterval(() => {
        setTiempoTranscurrido(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [pasoActivo, pausado]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const pasos = [
    {
      id: 1,
      fase: 'Apertura',
      titulo: 'Romper el Hielo',
      duracion: '2-3 min',
      objetivo: 'Generar rapport y bajar defensas',
      script: [
        'Hola [Nombre], ¿cómo estás?',
        '¿Te agarro en buen momento?',
        'Perfecto. Gracias por tomarte este tiempo.'
      ],
      queDecir: 'Tono cálido pero profesional. Energía positiva sin ser invasivo.',
      queNoDecir: 'No arranques con pitch. No suenes robótico. No te disculpes por "molestar".',
      truco: 'Sonreí mientras hablás. Se nota en la voz.',
      color: 'from-blue-500 to-cyan-500',
      icono: <Phone className="w-6 h-6" />
    },
    {
      id: 2,
      fase: 'Descubrimiento',
      titulo: 'Preguntas Profundas',
      duracion: '10-15 min',
      objetivo: 'Descubrir el dolor real y el deseo verdadero',
      script: [
        '¿Qué te llevó a agendar esta llamada?',
        '¿Cómo está tu situación ahora con [problema]?',
        '¿Hace cuánto que viene pasando esto?',
        '¿Qué intentaste antes?',
        '¿Y qué pasó?',
        'Si seguís así 6 meses más... ¿dónde te ves?',
        '¿Y cómo te hace sentir eso?'
      ],
      queDecir: 'Preguntas abiertas. Silencios estratégicos. "Contame más sobre eso..."',
      queNoDecir: 'No interrumpas. No ofrezcas soluciones todavía. No minimices su dolor.',
      truco: 'Después de cada respuesta importante, esperá 3 segundos antes de hablar. Ellos dirán más.',
      color: 'from-purple-500 to-pink-500',
      icono: <Brain className="w-6 h-6" />
    },
    {
      id: 3,
      fase: 'Amplificación',
      titulo: 'Dolor y Consecuencias',
      duracion: '5-8 min',
      objetivo: 'Que vean el costo REAL de no actuar',
      script: [
        'Entonces, si entiendo bien... [resumir dolor]',
        '¿Cuánto te está costando esto? No solo en plata, en tiempo, energía, oportunidades...',
        '¿Y esto cómo impacta en [área de vida importante]?',
        'Si esto sigue así... ¿qué perdés?',
        '¿Cuál es el precio de esperar otro año?'
      ],
      queDecir: 'Empático pero directo. "Te entiendo" + "Esto es serio".',
      queNoDecir: 'No asustes por asustar. No manipules. Mostrá consecuencias reales.',
      truco: 'Que ELLOS digan el costo. No se lo digas vos. Preguntá y callate.',
      color: 'from-orange-500 to-red-500',
      icono: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 4,
      fase: 'Visión',
      titulo: 'El Futuro Deseado',
      duracion: '3-5 min',
      objetivo: 'Pintar la vida que quieren vivir',
      script: [
        '¿Cómo sería tu vida si esto estuviera resuelto?',
        '¿Qué cambiaría para vos?',
        '¿Cómo te sentirías?',
        '¿Qué más podrías hacer con ese tiempo/energía/plata?'
      ],
      queDecir: 'Entusiasmo genuino. "Mirá qué podés lograr..."',
      queNoDecir: 'No vendas fantasías. No prometas lo imposible.',
      truco: 'Que visualicen. Que sientan. Emociones > lógica.',
      color: 'from-green-500 to-emerald-500',
      icono: <Eye className="w-6 h-6" />
    },
    {
      id: 5,
      fase: 'Presentación',
      titulo: 'La Solución',
      duracion: '5-7 min',
      objetivo: 'Mostrar que tu oferta es el puente entre dolor y deseo',
      script: [
        'Basándome en todo lo que me contaste...',
        'Creo que [tu programa] es exactamente lo que necesitás',
        'Te voy a contar cómo funciona...',
        '[Explicar en términos de BENEFICIOS, no features]',
        'Lo que vas a lograr es [resultado específico]'
      ],
      queDecir: 'Seguridad tranquila. Conectá cada feature con SU dolor específico.',
      queNoDecir: 'No listas de características. No jerga técnica. No divagues.',
      truco: 'Hablá en "vos/tu". "Vas a poder...", "Tu negocio va a..."',
      color: 'from-indigo-500 to-purple-500',
      icono: <Target className="w-6 h-6" />
    },
    {
      id: 6,
      fase: 'Inversión',
      titulo: 'El Precio',
      duracion: '1-2 min',
      objetivo: 'Presentar el precio con confianza',
      script: [
        'La inversión es de [precio]',
        '[SILENCIO ABSOLUTO]',
        '[Esperás su reacción]'
      ],
      queDecir: 'El número. Nada más. Y cerrás la boca.',
      queNoDecir: 'No justifiques. No te disculpes. No hables después del precio.',
      truco: 'El que habla primero después del precio... pierde. Aguantá el silencio.',
      color: 'from-yellow-500 to-amber-500',
      icono: <Zap className="w-6 h-6" />
    },
    {
      id: 7,
      fase: 'Manejo de Objeciones',
      titulo: 'Desarmar Excusas',
      duracion: '5-10 min',
      objetivo: 'Convertir dudas en decisión',
      script: [
        '[Si dicen "es caro"] → "¿Caro comparado con qué?"',
        '[Si dicen "lo tengo que pensar"] → "¿Qué parte te hace ruido?"',
        '[Si dicen "no tengo tiempo"] → "¿No es por eso que estás acá?"',
        '[Si dicen "no tengo plata"] → "¿Esto es algo que realmente querés hacer?"'
      ],
      queDecir: 'Preguntas, no defensas. "Entiendo. ¿Puedo preguntarte...?"',
      queNoDecir: 'No pelees. No te pongas a la defensiva. No rogues.',
      truco: 'Toda objeción es una pregunta disfrazada. Encontrá la pregunta real.',
      color: 'from-red-500 to-pink-500',
      icono: <Shield className="w-6 h-6" />
    },
    {
      id: 8,
      fase: 'Cierre',
      titulo: 'La Decisión',
      duracion: '2-3 min',
      objetivo: 'Que digan SÍ o NO. Nada de "lo pienso".',
      script: [
        '¿Tiene sentido para vos?',
        '¿Estás listo para empezar?',
        '¿Avanzamos?',
        'O el cierre asumido: "Perfecto, entonces te voy a mandar el link de pago..."'
      ],
      queDecir: 'Directitud con calidez. "Sé que podés hacerlo."',
      queNoDecir: 'No aceptes "tal vez". No dejes puertas abiertas sin compromiso.',
      truco: 'Si no cierran, agendá follow-up CON fecha y hora. "Te llamo el martes a las 15h."',
      color: 'from-green-600 to-emerald-600',
      icono: <Award className="w-6 h-6" />
    }
  ];

  const excusasComunes = [
    {
      id: 1,
      excusa: '"Está muy caro"',
      respuestaDebil: '"Pero fijate todo lo que incluye..."',
      respuestaFuerte: '"¿Caro comparado con qué?" [SILENCIO]',
      porque: 'Los obligás a justificar su objeción. La mayoría no tiene respuesta.',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      excusa: '"Tengo que pensarlo"',
      respuestaDebil: '"OK, pensalo y me avisás"',
      respuestaFuerte: '"Te entiendo. ¿Qué parte específicamente necesitás pensar?"',
      porque: 'Descubrís la objeción real escondida detrás de la excusa genérica.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      excusa: '"No tengo tiempo ahora"',
      respuestaDebil: '"Cuando tengas tiempo me avisás"',
      respuestaFuerte: '"¿No es justamente por eso que estás acá? Para recuperar tiempo?"',
      porque: 'Reencuadrás: el programa ES la solución a su falta de tiempo.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      excusa: '"Tengo que hablarlo con mi pareja/socio"',
      respuestaDebil: '"Claro, hablalo y después hablamos"',
      respuestaFuerte: '"Perfecto. ¿Vos estás decidido y solo necesitás su aprobación? ¿O hay algo que no te cierra todavía?"',
      porque: 'Separás la excusa real de la camuflada. Si es real, cerrás con depósito.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      excusa: '"Ya probé cosas así y no funcionó"',
      respuestaDebil: '"Esto es diferente, te lo prometo"',
      respuestaFuerte: '"Entiendo. ¿Qué probaste exactamente? ¿Y por qué creés que no funcionó?"',
      porque: 'Encontrás el verdadero problema: mal método, falta de compromiso, timing, etc.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const principiosOro = [
    {
      principio: 'El que hace más preguntas, controla la conversación',
      explicacion: 'No vendas. Guiá. Con preguntas estratégicas.',
      icono: <MessageCircle className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      principio: 'El silencio es tu arma más poderosa',
      explicacion: 'Después del precio: CALLATE. Después de una pregunta profunda: CALLATE.',
      icono: <Volume2 className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      principio: 'Amplificá el dolor antes de dar la solución',
      explicacion: 'Si no sienten urgencia, no compran. Mostrales el costo de esperar.',
      icono: <AlertTriangle className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      principio: 'Vendé la transformación, no el producto',
      explicacion: 'No quieren un curso. Quieren libertad, seguridad, resultados.',
      icono: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      principio: 'No cierres con "lo pienso". Cerrá con decisión o fecha.',
      explicacion: 'SÍ, NO, o follow-up agendado. Nada más.',
      icono: <Target className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const iniciarPaso = (id: number) => {
    setPasoActivo(id);
    setTiempoTranscurrido(0);
    setPausado(false);
  };

  const togglePausa = () => {
    setPausado(!pausado);
  };

  const resetearPaso = () => {
    setTiempoTranscurrido(0);
    setPausado(false);
  };

  const finalizarPaso = () => {
    setPasoActivo(null);
    setTiempoTranscurrido(0);
    setPausado(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-12 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
          }} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-purple-300">
              Capítulo 3 · Módulo 3
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <Phone className="w-20 h-20 text-purple-400" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-purple-300 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            📞 GUÍA DE VOZ
          </h1>
          <h2 className="text-4xl font-bold text-center mb-4 text-purple-100">
            PARA CERRAR
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-xl text-purple-200">
              El script paso a paso para llevar una llamada
            </p>
            <p className="text-xl text-purple-200">
              desde "hola" hasta "sí, quiero empezar"
            </p>
            <div className="my-6 h-1 w-64 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
            <p className="text-2xl text-white font-black">
              8 fases. 30-45 minutos. 1 objetivo: cerrar.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Timer Activo */}
      {pasoActivo !== null && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-2xl border-2 border-purple-400">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold mb-1">PASO {pasoActivo} EN CURSO</p>
              <p className="text-2xl font-black">{pasos.find(p => p.id === pasoActivo)?.titulo}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold mb-1">TIEMPO</p>
                <p className="text-3xl font-black">{formatTime(tiempoTranscurrido)}</p>
              </div>
              <button
                onClick={togglePausa}
                className="p-4 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all"
              >
                {pausado ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
              </button>
              <button
                onClick={resetearPaso}
                className="p-4 bg-white/20 backdrop-blur rounded-full hover:bg-white/30 transition-all"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              <button
                onClick={finalizarPaso}
                className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-all"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Los 8 Pasos */}
      <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎯 Los 8 Pasos del Cierre
          </h2>
          <p className="text-lg text-slate-600">
            Tu guía completa para dominar cada llamada
          </p>
        </div>

        <div className="space-y-6">
          {pasos.map((paso) => (
            <div key={paso.id} className={`bg-gradient-to-r ${paso.color} rounded-xl overflow-hidden shadow-lg`}>
              <div className="p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 bg-white/20 backdrop-blur rounded-full w-16 h-16 flex items-center justify-center font-black text-3xl">
                      {paso.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold uppercase">
                          {paso.fase}
                        </span>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-4 h-4" />
                          <span className="font-bold">{paso.duracion}</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-black mb-2">{paso.titulo}</h3>
                      <p className="text-lg text-white/90 mb-4">
                        <span className="font-bold">Objetivo:</span> {paso.objetivo}
                      </p>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-5 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Mic className="w-5 h-5" />
                          <p className="font-bold text-sm uppercase">Script:</p>
                        </div>
                        <div className="space-y-2">
                          {paso.script.map((linea, idx) => (
                            <p key={idx} className="text-white/95 italic">"{linea}"</p>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div className="bg-green-500/20 backdrop-blur border border-green-300/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5" />
                            <p className="font-bold text-sm">QUÉ DECIR:</p>
                          </div>
                          <p className="text-sm text-white/90">{paso.queDecir}</p>
                        </div>
                        <div className="bg-red-500/20 backdrop-blur border border-red-300/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <XCircle className="w-5 h-5" />
                            <p className="font-bold text-sm">QUÉ NO DECIR:</p>
                          </div>
                          <p className="text-sm text-white/90">{paso.queNoDecir}</p>
                        </div>
                      </div>

                      <div className="bg-yellow-500/20 backdrop-blur border border-yellow-300/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5" />
                          <p className="font-bold text-sm">TRUCO MAESTRO:</p>
                        </div>
                        <p className="text-sm text-white font-bold">{paso.truco}</p>
                      </div>
                    </div>
                  </div>
                  
                  {pasoActivo !== paso.id && (
                    <button
                      onClick={() => iniciarPaso(paso.id)}
                      className="ml-4 px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 flex-shrink-0"
                    >
                      <Play className="w-5 h-5" />
                      Iniciar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Excusas Comunes */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 shadow-xl">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🛡️ Las 5 Excusas Más Comunes
          </h2>
          <p className="text-lg text-slate-600">
            Y cómo desarmarlas con elegancia
          </p>
        </div>

        <div className="space-y-4">
          {excusasComunes.map((excusaObj) => (
            <div key={excusaObj.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                    EXCUSA #{excusaObj.id}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-4">{excusaObj.excusa}</p>
              </div>

              <div className="space-y-3">
                <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
                  <p className="text-sm font-bold text-red-900 mb-2">❌ Respuesta Débil:</p>
                  <p className="text-slate-800 italic">{excusaObj.respuestaDebil}</p>
                </div>

                <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm font-bold text-green-900 mb-2">✅ Respuesta Fuerte:</p>
                  <p className="text-slate-800 font-bold text-lg italic">{excusaObj.respuestaFuerte}</p>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-bold text-blue-900 mb-2">💡 Por qué funciona:</p>
                  <p className="text-slate-800">{excusaObj.porque}</p>
                </div>
              </div>

              {!showFeedback || excusaSimulador !== excusaObj.id ? (
                <button
                  onClick={() => {
                    setExcusaSimulador(excusaObj.id);
                    setShowFeedback(false);
                    setRespuestaUsuario('');
                  }}
                  className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Practicar Esta Objeción
                </button>
              ) : (
                <div className="mt-4 bg-slate-50 p-5 rounded-lg">
                  {!showFeedback ? (
                    <div>
                      <label className="block font-bold text-slate-900 mb-3">
                        ¿Cómo responderías?
                      </label>
                      <textarea
                        value={respuestaUsuario}
                        onChange={(e) => setRespuestaUsuario(e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        className="w-full p-4 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 min-h-24 mb-3"
                      />
                      <button
                        onClick={() => setShowFeedback(true)}
                        disabled={!respuestaUsuario.trim()}
                        className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Ver Feedback
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                        <p className="font-bold text-blue-900 mb-2">Tu respuesta:</p>
                        <p className="text-slate-800 italic">"{respuestaUsuario}"</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                        <p className="font-bold text-green-900 mb-2">La respuesta maestra:</p>
                        <p className="text-slate-800 font-bold">{excusaObj.respuestaFuerte}</p>
                      </div>
                      <button
                        onClick={() => {
                          setExcusaSimulador(null);
                          setShowFeedback(false);
                          setRespuestaUsuario('');
                        }}
                        className="w-full py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition-all"
                      >
                        Cerrar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Principios de Oro */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-300 shadow-xl">
        <div className="text-center mb-8">
          <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            ⭐ Los 5 Principios de Oro
          </h2>
          <p className="text-lg text-slate-600">
            Las leyes universales del cierre
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {principiosOro.map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-r ${item.color} rounded-xl p-6 text-white`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-white/20 backdrop-blur rounded-lg">
                  {item.icono}
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold mb-3">{item.principio}</p>
                  <p className="text-white/90">{item.explicacion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BONUS */}
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 text-white border-2 border-purple-500 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-purple-200 text-center mb-6">
          Entrenamiento de roleplay con IA
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-purple-200 leading-relaxed">
            Actuá como un prospecto realista y desafiante en una llamada de ventas. Yo soy el vendedor. Empezá presentándote brevemente y decime por qué agendaste esta llamada. Luego, respondé a mis preguntas de forma natural, poniendo objeciones realistas cuando corresponda. Al final, dame feedback honesto sobre mi desempeño: qué hice bien, qué podría mejorar, y qué tan cerca estuve de cerrar la venta.
          </p>
        </div>
      </div>

      {/* Cierre */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <Phone className="w-24 h-24 mx-auto text-purple-400 mb-6" />
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-300 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            📞 AHORA SÍ, A CERRAR
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-white">
              Este no es un script para leer.
            </p>
            <p className="text-2xl font-bold text-purple-300">
              Es un mapa para dominar.
            </p>
            <div className="my-8 h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
            <p className="text-xl text-slate-200">
              Cada palabra, cada pausa, cada pregunta...
            </p>
            <p className="text-xl text-slate-200">
              tiene un propósito estratégico.
            </p>
            <div className="my-8" />
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl mt-8 inline-block shadow-2xl">
              <p className="text-3xl font-black text-white mb-3">
                Practicalo. Dominalo. Cerrá.
              </p>
              <p className="text-xl font-bold text-white">
                Las ventas no son suerte.<br/>
                Son sistema.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/30 to-purple-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const guiaVozCerrarMetadata = {
  id: 3,
  title: "Guía de Voz para Cerrar",
  type: "document" as const,
  duration: "45 min"
};