import React, { useState } from 'react';
import { 
  Shield, Sword, Target, Crosshair, Heart, Brain, Zap,
  AlertTriangle, CheckCircle, XCircle, Lock, Unlock, Star,
  TrendingUp, Award, Flame, Eye, MessageCircle, Clock,
  DollarSign, Users, Calendar, ThumbsUp, Sparkles, Trophy,
  BookOpen, Edit3, Play, BarChart3
} from 'lucide-react';

export const EdicionMaestraContent = () => {
  const [objecionesDesbloqueadas, setObjecionesDesbloqueadas] = useState<number[]>([]);
  const [simuladorActivo, setSimuladorActivo] = useState<number | null>(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [objecionAleatoria, setObjecionAleatoria] = useState<number | null>(null);

  const objeciones = [
    {
      id: 1,
      objecion: '"Tengo que hablarlo con mi pareja/socio"',
      tipo: 'Decisor Faltante',
      frecuencia: 85,
      prevencion: {
        momento: 'Antes de empezar la presentación',
        script: '"¿Quién más además de vos influye en esta decisión? Quiero asegurarme de que todos los puntos estén cubiertos."'
      },
      respuestas: [
        {
          tipo: 'Si es excusa camuflada',
          script: '"¿Entonces estás completamente decidido… y solo buscás su aprobación? ¿O hay algo que todavía no te cierra?"',
          cuando: 'Cuando sentís que es una cortina de humo'
        },
        {
          tipo: 'Si es real',
          script: '"Perfecto, lo entiendo. Yo tampoco decidiría solo. Pero para respetarte este incentivo, ¿te sirve dejar un depósito reembolsable de $250 mientras coordinamos esa charla juntos?"',
          cuando: 'Cuando es genuino'
        }
      ],
      notaDeOro: 'Si no están dispuestos a dejar un depósito… nunca iban a comprar.',
      icono: <Users className="w-8 h-8" />,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 2,
      objecion: '"¿Puedo hablar con alguno de tus clientes?"',
      tipo: 'Validación Social',
      frecuencia: 60,
      prevencion: {
        momento: 'Antes de la llamada',
        script: 'Enviá testimonios por anticipado. Siempre.'
      },
      respuestas: [
        {
          tipo: 'Respuesta firme con postura',
          script: '"Por confidencialidad no compartimos datos de clientes, pero tenemos una biblioteca llena de casos reales. Si querés verla mientras me hago un café, en 5 minutos seguimos."',
          cuando: 'Siempre'
        }
      ],
      notaDeOro: 'Si insisten demasiado… pedí fecha de seguimiento y depósito. Sin compromiso no hay cierre.',
      icono: <ThumbsUp className="w-8 h-8" />,
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 3,
      objecion: '"¿Cuál es tu garantía?"',
      tipo: 'Seguridad',
      frecuencia: 70,
      prevencion: {
        momento: 'Durante la presentación',
        script: 'Mencioná la garantía naturalmente cuando hables de resultados'
      },
      respuestas: [
        {
          tipo: 'Reencuadre poderoso',
          script: '"La única garantía que te puedo dar es esta: si no hacés nada, nada va a cambiar. Y si accionás, tenés mi compromiso total. Además, nuestra garantía es [tu garantía específica]."',
          cuando: 'Como respuesta principal'
        },
        {
          tipo: 'Si lo preguntan antes del precio',
          script: '"Tiene sentido hablar de eso cuando tengas claro lo que vas a invertir, ¿te parece?"',
          cuando: 'Cuando es muy prematuro'
        }
      ],
      notaDeOro: 'Marcá territorio. La incertidumbre es parte del crecimiento.',
      icono: <Shield className="w-8 h-8" />,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 4,
      objecion: '"No tomo decisiones en el momento"',
      tipo: 'Estilo de Decisión',
      frecuencia: 75,
      prevencion: {
        momento: 'Durante descubrimiento',
        script: 'Preguntá: "¿Cómo tomás decisiones importantes normalmente?"'
      },
      respuestas: [
        {
          tipo: 'Reencuadre temporal',
          script: '"Lo entiendo. Pero si venís escuchando, participando y resonando… esto no suena a decisión impulsiva. Esto suena a decisión esperada. Y no es disparar al aire… es apostar por vos mismo. ¿Te animás?"',
          cuando: 'Cuando han estado comprometidos'
        },
        {
          tipo: 'Si es excusa',
          script: '"Cuando alguien dice eso, suele ser falta de información o confianza. ¿Qué te está faltando ahora?"',
          cuando: 'Cuando sentís resistencia'
        }
      ],
      notaDeOro: 'La mayoría que "no decide en el momento" está buscando una salida elegante.',
      icono: <Clock className="w-8 h-8" />,
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 5,
      objecion: '"Necesito pensarlo"',
      tipo: 'Cortina de Humo Clásica',
      frecuencia: 95,
      prevencion: {
        momento: 'Después del precio',
        script: 'Usá silencio estratégico antes de que lo digan'
      },
      respuestas: [
        {
          tipo: 'Confrontación suave',
          script: '"Obvio. Pensalo. Te doy 5 minutos y volvemos para ver qué se te ocurrió."',
          cuando: 'Para desarmar la excusa'
        },
        {
          tipo: 'Profundización',
          script: '"¿Qué parte es la que más te hace ruido? Lo que se puede nombrar… se puede resolver."',
          cuando: 'Para descubrir la objeción real'
        }
      ],
      notaDeOro: 'El "pensarlo" casi nunca es real. Es miedo disfrazado.',
      icono: <Brain className="w-8 h-8" />,
      color: 'from-yellow-600 to-amber-600'
    },
    {
      id: 6,
      objecion: '"No tengo el dinero"',
      tipo: 'Presupuesto',
      frecuencia: 80,
      prevencion: {
        momento: 'En descubrimiento',
        script: 'Calificá presupuesto: "¿Tenés algún rango de inversión en mente?"'
      },
      respuestas: [
        {
          tipo: 'Reencuadre del problema',
          script: '"¿No es justamente por eso que llegaste hasta acá?" → "¿Esto es algo que de verdad querés hacer?" → Si dicen sí: "Lo último que quiero es que el dinero te frene a conseguir lo que más querés. Entonces… ¿cómo lo hacemos viable juntos?"',
          cuando: 'Cuando es genuino pero superable'
        }
      ],
      notaDeOro: '¿Excusa o realidad? Vas a sentirlo. Confiá en tu intuición.',
      icono: <DollarSign className="w-8 h-8" />,
      color: 'from-red-600 to-pink-600'
    },
    {
      id: 7,
      objecion: '"Voy a ahorrar y después vuelvo"',
      tipo: 'Postergación',
      frecuencia: 65,
      prevencion: {
        momento: 'Al establecer urgencia',
        script: 'Mostrá el costo de NO actuar ahora'
      },
      respuestas: [
        {
          tipo: 'Confrontación directa',
          script: '"¿Y mientras tanto… vas a seguir haciendo lo mismo que no te está funcionando?" → "¿Cómo hacemos para que esto pase hoy?"',
          cuando: 'Siempre. Sin miedo.'
        }
      ],
      notaDeOro: 'Los que "vuelven después" nunca vuelven. El momento es ahora.',
      icono: <Calendar className="w-8 h-8" />,
      color: 'from-indigo-600 to-purple-600'
    },
    {
      id: 8,
      objecion: '"No es el momento adecuado"',
      tipo: 'Timing',
      frecuencia: 70,
      prevencion: {
        momento: 'Al descubrir motivación',
        script: 'Preguntá: "¿Por qué ahora? ¿Qué cambió?"'
      },
      respuestas: [
        {
          tipo: 'Desafío filosófico',
          script: '"¿Y cuándo sería el momento perfecto? Cuando tengas más tiempo, más energía, más plata… ¿O cuando decidas dejar de esperar?" → "Lo que hablamos hoy es exactamente lo que te puede llevar a ese \'después\'. ¿De verdad vas a seguir posponiéndolo?"',
          cuando: 'Para romper el loop mental'
        }
      ],
      notaDeOro: 'El "momento perfecto" no existe. Es una ilusión de control.',
      icono: <Clock className="w-8 h-8" />,
      color: 'from-teal-600 to-cyan-600'
    },
    {
      id: 9,
      objecion: '"Trabajé con agencias y me fue mal"',
      tipo: 'Experiencia Negativa Previa',
      frecuencia: 55,
      prevencion: {
        momento: 'En descubrimiento',
        script: 'Preguntá: "¿Probaste algo así antes? ¿Qué pasó?"'
      },
      respuestas: [
        {
          tipo: 'Empatía + Diferenciación',
          script: '"Te entiendo. A mí también me han fallado. Pero una experiencia negativa no puede definir tu futuro. Contame qué pasó…" → Después: "Eso tiene solución. Acá hacemos las cosas distinto. Y te lo voy a demostrar."',
          cuando: 'Con paciencia y firmeza'
        }
      ],
      notaDeOro: 'Las heridas del pasado son reales. Validá primero, diferenciá después.',
      icono: <AlertTriangle className="w-8 h-8" />,
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 10,
      objecion: '"Tengo otras llamadas con agencias"',
      tipo: 'Comparación',
      frecuencia: 50,
      prevencion: {
        momento: 'Durante la llamada',
        script: 'Posicionáte como único desde el inicio'
      },
      respuestas: [
        {
          tipo: 'Urgencia elegante',
          script: '"Perfecto. Comparar es sano. Pero postergar lo correcto… puede salir muy caro." → "¿Cuándo pensás decidir?" → "¡La semana que viene ya podríamos tener campañas en vivo! ¿Por qué esperar para conseguir lo que ya sabés que querés?"',
          cuando: 'Para crear FOMO sano'
        }
      ],
      notaDeOro: 'Repetí sus frases con una leve ironía amable. No los ataca. Los hace pensar.',
      icono: <BarChart3 className="w-8 h-8" />,
      color: 'from-slate-600 to-gray-700'
    }
  ];

  const toggleObjecion = (id: number) => {
    if (objecionesDesbloqueadas.includes(id)) {
      setObjecionesDesbloqueadas(objecionesDesbloqueadas.filter(o => o !== id));
    } else {
      setObjecionesDesbloqueadas([...objecionesDesbloqueadas, id]);
    }
  };

  const dominioScore = objecionesDesbloqueadas.length;
  const dominioPercentage = (dominioScore / 10) * 100;

  const iniciarEntrenamiento = () => {
    const randomIndex = Math.floor(Math.random() * objeciones.length);
    setObjecionAleatoria(randomIndex);
    setSimuladorActivo(objeciones[randomIndex].id);
    setRespuestaUsuario('');
    setShowFeedback(false);
  };

  const evaluarRespuesta = () => {
    setShowFeedback(true);
  };

  return (
    <div className="space-y-8">
      {/* Hero Quirúrgico */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black via-red-900 to-black p-12 text-white">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,.05) 10px, rgba(255,0,0,.05) 20px)'
        }} />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-amber-500 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-red-300">
              Capítulo 3 · Módulo 7
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-red-500 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sword className="w-20 h-20 text-red-500" />
              <Shield className="w-12 h-12 text-amber-400 absolute -bottom-2 -right-2" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-red-400 via-amber-300 to-red-200 bg-clip-text text-transparent">
            🗡️ EDICIÓN MAESTRA
          </h1>
          <h2 className="text-4xl font-bold text-center mb-4 text-red-100">
            OBJECIONES
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-xl text-red-200">
              Imaginá esto: estás en una llamada, todo fluye.
            </p>
            <p className="text-xl text-red-200">
              La conexión es buena, el prospecto asiente, sonríe, se entusiasma.
            </p>
            <p className="text-2xl text-white font-black">
              Y de repente… ¡bam! Llega la objeción.
            </p>
            <div className="my-6 h-1 w-64 bg-gradient-to-r from-red-500 to-amber-500 mx-auto rounded-full" />
            <p className="text-xl text-amber-300">
              No te asustes. Son solo reflejos.
            </p>
            <p className="text-2xl text-white font-bold">
              Este documento es tu escudo, tu espada y tu brújula.
            </p>
            <p className="text-lg text-slate-300">
              Una colección de respuestas estratégicas y empáticas para cortar con precisión quirúrgica las dudas que frenan decisiones.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-500/20 to-red-500/20 rounded-full blur-3xl" />
      </div>

      {/* Medidor de Dominio */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-300 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Tu Dominio de Objeciones</h3>
            <p className="text-slate-600">Desbloqueá cada objeción para dominarla</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-3">
              <Trophy className="w-12 h-12 text-amber-600" />
              <div>
                <p className="text-4xl font-black text-amber-600">{dominioScore}/10</p>
                <p className="text-sm text-slate-600">Desbloqueadas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden shadow-inner mb-6">
          <div 
            className={`h-full transition-all duration-700 ${
              dominioPercentage === 100 
                ? 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600' 
                : 'bg-gradient-to-r from-slate-400 to-slate-600'
            }`}
            style={{ width: `${dominioPercentage}%` }}
          />
        </div>

        {dominioPercentage === 100 && (
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-6 rounded-xl text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-3" />
            <p className="text-3xl font-black mb-2">🏆 MAESTRO DE OBJECIONES</p>
            <p className="text-xl">Dominaste las 10 objeciones más comunes. Sos imparable.</p>
          </div>
        )}

        <button
          onClick={iniciarEntrenamiento}
          className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-lg rounded-xl hover:from-red-700 hover:to-amber-700 transition-all flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6" />
          Modo Entrenamiento: Objeción Aleatoria
        </button>
      </div>

      {/* Las 10 Objeciones */}
      <div className="bg-white rounded-2xl p-8 border-2 border-red-200 shadow-xl">
        <div className="text-center mb-8">
          <BookOpen className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📚 Manual de las 10 Objeciones Maestras
          </h2>
          <p className="text-lg text-slate-600">
            Hacé click en cada una para desbloquear la respuesta completa
          </p>
        </div>

        <div className="space-y-4">
          {objeciones.map((obj) => (
            <div key={obj.id} className="bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <button
                onClick={() => toggleObjecion(obj.id)}
                className={`w-full p-6 flex items-center justify-between transition-all ${
                  objecionesDesbloqueadas.includes(obj.id) ? `bg-gradient-to-r ${obj.color} text-white` : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${
                    objecionesDesbloqueadas.includes(obj.id) ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {obj.icono}
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        objecionesDesbloqueadas.includes(obj.id) 
                          ? 'bg-white/20 text-white' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        #{obj.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        objecionesDesbloqueadas.includes(obj.id) 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {obj.tipo}
                      </span>
                      <span className={`text-xs font-bold ${
                        objecionesDesbloqueadas.includes(obj.id) ? 'text-white/80' : 'text-slate-600'
                      }`}>
                        Frecuencia: {obj.frecuencia}%
                      </span>
                    </div>
                    <h3 className={`text-2xl font-bold ${
                      objecionesDesbloqueadas.includes(obj.id) ? 'text-white' : 'text-slate-900'
                    }`}>
                      {obj.objecion}
                    </h3>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {objecionesDesbloqueadas.includes(obj.id) ? (
                    <Unlock className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-slate-400" />
                  )}
                </div>
              </button>

              {objecionesDesbloqueadas.includes(obj.id) && (
                <div className="p-6 bg-white border-t-2 border-slate-200">
                  <div className="space-y-4">
                    {/* Prevención */}
                    <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start gap-3 mb-2">
                        <Eye className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-bold text-blue-900 mb-2">🛡️ Prevención Elegante:</p>
                          <p className="text-sm text-blue-800 mb-2">
                            <span className="font-bold">Momento:</span> {obj.prevencion.momento}
                          </p>
                          <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="text-slate-800 italic">{obj.prevencion.script}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Respuestas */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Sword className="w-6 h-6 text-red-600" />
                        <p className="font-bold text-slate-900">⚔️ Respuestas Estratégicas:</p>
                      </div>
                      {obj.respuestas.map((resp, idx) => (
                        <div key={idx} className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
                          <p className="font-bold text-red-900 mb-2">{resp.tipo}</p>
                          <div className="bg-white p-4 rounded border border-red-200 mb-2">
                            <p className="text-slate-800 italic">{resp.script}</p>
                          </div>
                          <p className="text-sm text-red-700">
                            <span className="font-bold">Cuándo usarla:</span> {resp.cuando}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Nota de Oro */}
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-5 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Star className="w-6 h-6 text-white flex-shrink-0" />
                        <div>
                          <p className="font-bold text-white mb-1">🧠 Nota de Oro:</p>
                          <p className="text-white font-medium">{obj.notaDeOro}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* The Dream Question */}
      <div className="bg-gradient-to-br from-black to-red-900 rounded-2xl p-8 border-2 border-amber-500 shadow-2xl">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <Target className="w-16 h-16 text-amber-400 mx-auto" />
            <div className="absolute inset-0 animate-ping opacity-20">
              <Target className="w-16 h-16 text-amber-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 mt-4">
            🌟 THE DREAM QUESTION
          </h2>
          <p className="text-xl text-red-300">
            Cuando la conversación da vueltas y vueltas...
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
          <p className="text-2xl text-white font-bold text-center mb-6 leading-relaxed">
            "Juan, esto no se trata de mí.<br/>
            Se trata de vos.<br/>
            <span className="text-amber-300">¿Vas a comprometerte</span> a llevar tu negocio a <span className="text-green-400">[$XX]</span> y vivir la libertad que eso representa…<br/>
            <span className="text-red-400">o vas a quedarte atrapado</span> en la misma jaula de siempre?"
          </p>

          <div className="bg-amber-500 p-6 rounded-lg">
            <p className="text-black font-bold text-center text-xl">
              🔑 Esta es la pregunta que transforma "objeciones" en decisiones.
            </p>
          </div>
        </div>
      </div>

      {/* Manejo Emocional */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-300 shadow-xl">
        <div className="text-center mb-6">
          <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            💜 Manejo Emocional de la Duda
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
            <p className="text-xl text-slate-800 mb-4">
              <span className="font-bold text-purple-900">"Tener dudas es normal.</span><br/>
              Si no tuvieras dudas… serías un psicópata."
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-800 mb-2">
                <span className="font-bold">Vos:</span> "¿Querés que esto funcione?"
              </p>
              <p className="text-green-700 font-bold">
                Cliente: "Sí."
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-800 mb-2">
                <span className="font-bold">Vos:</span> "¿Y si todo lo que te dije es cierto, creés que funcionará?"
              </p>
              <p className="text-green-700 font-bold">
                Cliente: "Sí."
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg text-white text-center">
              <p className="text-2xl font-bold">
                "Entonces lo que te pido es simple: tu voto de confianza. ¿Avanzamos?"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulador de Entrenamiento */}
      {simuladorActivo !== null && objecionAleatoria !== null && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border-2 border-indigo-300 shadow-xl">
          <div className="text-center mb-6">
            <Crosshair className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              🎯 Modo Entrenamiento
            </h2>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="bg-slate-900 p-6 rounded-lg mb-6">
              <p className="text-sm font-bold text-red-400 mb-2">⚡ OBJECIÓN ALEATORIA</p>
              <p className="text-3xl font-bold text-white mb-3">
                {objeciones[objecionAleatoria].objecion}
              </p>
              <p className="text-slate-300">
                Tipo: {objeciones[objecionAleatoria].tipo}
              </p>
            </div>

            {!showFeedback ? (
              <div>
                <label className="block font-bold text-slate-900 mb-3 text-lg">
                  ¿Cómo responderías?
                </label>
                <textarea
                  value={respuestaUsuario}
                  onChange={(e) => setRespuestaUsuario(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                  className="w-full p-4 border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 min-h-32 mb-4"
                />
                <button
                  onClick={evaluarRespuesta}
                  disabled={!respuestaUsuario.trim()}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ver Respuestas Maestras
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-3">✅ Tu respuesta:</p>
                  <p className="text-slate-800 italic mb-4">"{respuestaUsuario}"</p>
                  <p className="text-sm text-green-700">
                    Ahora compará con las respuestas maestras abajo 👇
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-300">
                  <p className="font-bold text-blue-900 mb-3">🎓 Respuestas Maestras:</p>
                  {objeciones[objecionAleatoria].respuestas.map((resp, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg mb-3">
                      <p className="font-bold text-slate-900 mb-2">{resp.tipo}</p>
                      <p className="text-slate-800 italic">"{resp.script}"</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={iniciarEntrenamiento}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all"
                >
                  Siguiente Objeción
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BONUS OCULTO */}
      <div className="bg-gradient-to-br from-slate-900 to-red-900 rounded-2xl p-8 text-white border-2 border-red-500 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-red-200 text-center mb-6">
          Entrenamiento diario de objeciones
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-red-200 leading-relaxed">
            Actuá como mi mentor personal en cierres de alto ticket. Quiero que me entrenes a diario con un escenario desafiante, una objeción compleja y la forma más empática y poderosa de responderla. Que sea realista, breve y brutalmente efectiva. Quiero que me conviertas en una máquina de cierres con corazón.
          </p>
        </div>
      </div>

      {/* Cierre Épico */}
      <div className="bg-gradient-to-r from-black via-red-900 to-black rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,.05) 10px, rgba(255,0,0,.05) 20px)'
        }} />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sword className="w-16 h-16 text-red-500" />
            <Shield className="w-16 h-16 text-amber-400" />
            <Target className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-red-400 via-amber-300 to-red-200 bg-clip-text text-transparent">
            🎯 CIERRE FILOSÓFICO
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-white">
              Tus dudas no vienen del miedo a que falle.
            </p>
            <p className="text-2xl font-bold text-red-300">
              Vienen del miedo a que funcione.
            </p>
            <p className="text-xl text-slate-200">
              Y a lo que eso te obligaría a ser, a cambiar, a soltar.
            </p>
            <div className="my-8 h-1 w-32 bg-gradient-to-r from-red-500 to-amber-500 mx-auto rounded-full" />
            <p className="text-2xl text-amber-300 font-bold">
              Pero ese miedo…
            </p>
            <p className="text-3xl text-white font-black">
              es la prueba de que vas en la dirección correcta.
            </p>
            <div className="my-8" />
            <div className="bg-gradient-to-r from-red-600 to-amber-600 p-8 rounded-2xl mt-8 inline-block shadow-2xl">
              <p className="text-3xl font-black text-white mb-3">
                ✅ Este no es un guion de ventas.
              </p>
              <p className="text-2xl font-bold text-white mb-3">
                Es un sistema de influencia honesta, directa, con respeto y autoridad.
              </p>
              <p className="text-xl text-white">
                No estás presionando. Estás liberando a tu cliente… de sus propias excusas.
              </p>
              <div className="mt-6 pt-6 border-t-2 border-white/30">
                <p className="text-2xl font-black text-white">
                  Sos guía, no vendedor.
                </p>
                <p className="text-xl text-amber-100 mt-2">
                  Y tu mayor herramienta… es tu convicción.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/30 to-amber-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-500/30 to-red-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const edicionMaestraMetadata = {
  id: 7,
  title: "Edición Maestra - Objeciones",
  type: "document" as const,
  duration: "60 min"
};