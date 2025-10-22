import React, { useState } from 'react';
import { 
  Heart, Brain, Shield, Mic, Zap, Target, TrendingUp, 
  AlertTriangle, CheckCircle, X, XCircle, Sparkles, 
  ArrowRight, Award, Flame, Lock, Unlock, Clock,
  MessageCircle, Users, ThumbsUp, Loader
} from 'lucide-react';

export const LaBaseRealContent = () => {
  const [mitosRevelados, setMitosRevelados] = useState<number[]>([]);
  const [integrityChecks, setIntegrityChecks] = useState<boolean[]>([false, false, false, false]);
  const [estructuraExpandida, setEstructuraExpandida] = useState<number | null>(null);
  const [painDetectorStep, setPainDetectorStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const mitos = [
    {
      id: 1,
      mito: 'Los buenos vendedores nacen',
      verdad: 'Se hacen. Venta tras venta. Práctica tras práctica.',
      ejemplo: 'Jordan Belfort empezó vendiendo helados de puerta en puerta. Grant Cardone vendía autos usados.'
    },
    {
      id: 2,
      mito: 'Hay que ser extrovertido',
      verdad: 'Muchos introvertidos cierran tratos millonarios. La escucha profunda vence al carisma superficial.',
      ejemplo: 'Warren Buffett es introvertido y cerró los mejores deals de la historia.'
    },
    {
      id: 3,
      mito: 'Cerrar lleva semanas y muchos seguimientos',
      verdad: 'Se puede cerrar en una sola llamada bien estructurada.',
      ejemplo: 'Los mejores closers cierran en 45-60 minutos con la estructura correcta.'
    },
    {
      id: 4,
      mito: 'A los dueños no les gusta que les vendan',
      verdad: 'Les encanta cuando alguien entiende su problema y muestra una salida real.',
      ejemplo: 'Los CEOs pagan consultores de $500/hora... porque valoran soluciones claras.'
    },
    {
      id: 5,
      mito: 'Tengo que ayudar gratis para que vean mi valor',
      verdad: 'Tu valor está en tu claridad y visión, no en regalar soluciones.',
      ejemplo: 'Los médicos no operan gratis para "demostrar valor". Diagnostican y cobran.'
    },
    {
      id: 6,
      mito: 'Hay que cerrar a todos',
      verdad: 'Solo a los que realmente podés ayudar. Los demás... dejalos ir con integridad.',
      ejemplo: 'Decir "no sos fit para esto" te posiciona como experto, no como vendedor desesperado.'
    },
    {
      id: 7,
      mito: 'Vender es manipular',
      verdad: 'Vender con integridad es liderazgo. Es guiar a alguien hacia su mejor versión.',
      ejemplo: 'Un coach que no cobra... no está ayudando. Está validando la mediocridad.'
    }
  ];

  const nivelesdolor = [
    {
      nivel: 1,
      nombre: 'Molestia',
      descripcion: 'Saben que algo podría mejorar, pero no es urgente',
      señales: ['Dicen "estaría bueno"', 'Preguntan por curiosidad', 'No tienen timeline'],
      accion: 'Educar y crear urgencia',
      color: 'from-yellow-500 to-orange-500',
      icono: <AlertTriangle className="w-8 h-8" />
    },
    {
      nivel: 2,
      nombre: 'Problema',
      descripcion: 'Están activamente buscando soluciones, comparando opciones',
      señales: ['Dicen "necesito resolver esto"', 'Comparan alternativas', 'Tienen budget asignado'],
      accion: 'Diferenciarte y posicionarte',
      color: 'from-orange-500 to-red-500',
      icono: <Flame className="w-8 h-8" />
    },
    {
      nivel: 3,
      nombre: 'Crisis',
      descripcion: 'Están sufriendo ahora. Necesitan la solución YA',
      señales: ['Dicen "esto me está matando"', 'No regatean precio', 'Quieren empezar mañana'],
      accion: 'Cerrar rápido y con confianza',
      color: 'from-red-600 to-red-900',
      icono: <Zap className="w-8 h-8" />
    }
  ];

  const estructura = [
    {
      id: 1,
      paso: 'Descubrimiento',
      descripcion: 'Preguntás. Diagnosticás. Escuchás de verdad.',
      icono: <Brain className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      preguntas: [
        '¿Qué te trajo a buscar esta solución ahora?',
        '¿Cuánto tiempo llevas con este problema?',
        '¿Qué has probado antes que no funcionó?',
        '¿Si esto no cambia, dónde te ves en 6 meses?'
      ],
      errorComun: '❌ Hablar de tu producto antes de entender su dolor',
      señalVerde: '🟢 El cliente se abre y empieza a compartir frustraciones',
      señalAmarilla: '🟡 Respuestas cortas o evasivas',
      señalRoja: '🔴 No comparten detalles o dicen "todo está bien"'
    },
    {
      id: 2,
      paso: 'Pitch',
      descripcion: 'Presentás tu oferta como la solución a SU dolor. No como un catálogo.',
      icono: <Target className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      preguntas: [
        'Conectá su dolor con tu solución específica',
        'Usá sus propias palabras que dijeron antes',
        'Mostrá el "después" que van a vivir',
        'Hacé que se vean en ese futuro mejor'
      ],
      errorComun: '❌ Listar features sin conectarlas a su situación',
      señalVerde: '🟢 Dicen "exacto, eso es lo que necesito"',
      señalAmarilla: '🟡 Preguntan por detalles técnicos irrelevantes',
      señalRoja: '🔴 Dicen "ya tengo algo parecido"'
    },
    {
      id: 3,
      paso: 'Respuestas',
      descripcion: 'Aclarás. Guiás. Sin regalar consultoría.',
      icono: <MessageCircle className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      preguntas: [
        'Respondé con confianza y brevedad',
        'No des la solución completa gratis',
        'Redirigí a la decisión de compra',
        'Si preguntan mucho técnico → no están convencidos del valor'
      ],
      errorComun: '❌ Convertir la llamada en consultoría gratis',
      señalVerde: '🟢 Preguntas simples sobre implementación',
      señalAmarilla: '🟡 Muchas preguntas técnicas sin avanzar',
      señalRoja: '🔴 Están tomando notas para hacerlo ellos'
    },
    {
      id: 4,
      paso: 'Objeciones',
      descripcion: 'Acá se decide todo. Si no sabés manejarlas, no cerrás.',
      icono: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      preguntas: [
        '¿Qué parte específicamente te genera duda?',
        '¿Qué necesitarías ver para sentirte 100% seguro?',
        '¿Es el momento o es la solución lo que te frena?',
        '¿Si resolvemos esto, hay algo más que te detenga?'
      ],
      errorComun: '❌ Defenderte o dar más información sin preguntar',
      señalVerde: '🟢 Dan objeciones específicas y reales',
      señalAmarilla: '🟡 Objeciones vagas o cortina de humo',
      señalRoja: '🔴 Cambian de objeción constantemente'
    },
    {
      id: 5,
      paso: 'Cierre',
      descripcion: 'Llamado directo a la acción. Nada de "te mando algo y lo pensás".',
      icono: <CheckCircle className="w-6 h-6" />,
      color: 'from-amber-500 to-yellow-500',
      preguntas: [
        '¿Tiene sentido para vos lo que vimos?',
        '¿Te gustaría que trabajemos juntos?',
        '¿Cuándo te gustaría empezar?',
        '¿Preferís pagar en X o en Y forma?'
      ],
      errorComun: '❌ Decir "pensalo" sin pedir el cierre',
      señalVerde: '🟢 Preguntan por formas de pago o logística',
      señalAmarilla: '🟡 Dicen "déjame pensarlo"',
      señalRoja: '🔴 Evitan responder directamente'
    }
  ];

  const painDetectorScenario = {
    situacion: 'Cliente dice: "Déjame pensarlo"',
    opciones: [
      {
        id: 'A',
        texto: '¿Cuándo podemos hablar de nuevo?',
        feedback: '❌ Estás dejando el control en sus manos. No identificaste el dolor real.',
        correcta: false
      },
      {
        id: 'B',
        texto: '¿Qué parte necesitás pensar específicamente?',
        feedback: '✅ CORRECTO. Estás profundizando para descubrir la objeción real escondida detrás del "pensarlo".',
        correcta: true
      },
      {
        id: 'C',
        texto: 'Perfecto, cualquier cosa me avisás',
        feedback: '❌ Acabás de perder la venta. Nunca te van a avisar. El "pensarlo" es una objeción cortina.',
        correcta: false
      }
    ]
  };

  const toggleMito = (id: number) => {
    if (mitosRevelados.includes(id)) {
      setMitosRevelados(mitosRevelados.filter(m => m !== id));
    } else {
      setMitosRevelados([...mitosRevelados, id]);
    }
  };

  const toggleIntegrityCheck = (index: number) => {
    const newChecks = [...integrityChecks];
    newChecks[index] = !newChecks[index];
    setIntegrityChecks(newChecks);
  };

  const integrityScore = integrityChecks.filter(c => c).length;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowFeedback(true);
  };

  const resetDetector = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Ultra Moderno */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-red-900 to-black p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-red-400 to-orange-400 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-red-300">
              Capítulo 3 · Módulo 2
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Mic className="w-16 h-16 text-red-400" />
              <div className="absolute inset-0 animate-ping">
                <Mic className="w-16 h-16 text-red-400 opacity-20" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
            🎙️ LA BASE REAL
          </h1>
          <h2 className="text-3xl font-bold text-center mb-4 text-red-100">
            DE TODA VENTA PODEROSA
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-xl text-red-200">
              Olvidate de los mantras de Instagram.
            </p>
            <p className="text-xl text-red-200">
              Olvidate de las frases de coaches motivacionales.
            </p>
            <p className="text-xl text-white font-bold">
              Esto no es un TED Talk sobre "creer en vos mismo".
            </p>
            <p className="text-2xl text-white font-black mt-6">
              Esto es la verdad desnuda sobre por qué la gente compra.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>

      {/* El Dolor es el Motor */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl mb-4">
            <Heart className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            💔 El Dolor es el Motor de Toda Venta
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
          <p className="text-2xl font-bold text-center text-red-900 mb-6">
            "Las personas no compran porque quieren algo nuevo…<br/>
            <span className="text-red-600">compran porque quieren dejar de sufrir."</span>
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-red-100 p-6 rounded-xl text-center border-2 border-red-300">
              <div className="text-4xl mb-3">😣</div>
              <h3 className="font-bold text-red-900 mb-2">DOLOR</h3>
              <p className="text-sm text-red-800">Punto A incómodo</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-green-500 p-6 rounded-xl text-center flex items-center justify-center">
              <div>
                <ArrowRight className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="font-bold text-white text-sm">TU SOLUCIÓN</p>
                <p className="text-xs text-white/90">El puente</p>
              </div>
            </div>
            <div className="bg-green-100 p-6 rounded-xl text-center border-2 border-green-300">
              <div className="text-4xl mb-3">😊</div>
              <h3 className="font-bold text-green-900 mb-2">ALIVIO</h3>
              <p className="text-sm text-green-800">Punto B deseado</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-red-900 p-6 rounded-xl text-white text-center">
          <p className="text-xl font-bold">
            🎯 Tu rol no es convencer. Es descubrir el dolor, trazar el mapa, y mostrar el puente.
          </p>
          <p className="text-lg text-red-200 mt-3">
            No estás vendiendo productos. Estás ofreciendo un mejor futuro.
          </p>
        </div>
      </div>

      {/* El Mapa del Dolor - 3 Niveles */}
      <div className="bg-white rounded-2xl p-8 border-2 border-orange-200 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🗺️ El Mapa del Dolor
          </h2>
          <p className="text-lg text-slate-600">
            No todos los dolores son iguales. Identificá en qué nivel está tu cliente.
          </p>
        </div>

        <div className="space-y-4">
          {nivelesdolor.map((nivel) => (
            <div key={nivel.nivel} className={`bg-gradient-to-r ${nivel.color} rounded-xl p-6 text-white shadow-lg`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-white/20 p-3 rounded-lg">
                  {nivel.icono}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-black">NIVEL {nivel.nivel}</span>
                    <span className="text-xl font-bold">· {nivel.nombre}</span>
                  </div>
                  <p className="text-lg mb-4 text-white/90">{nivel.descripcion}</p>
                  
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-3">
                    <p className="font-bold mb-2 text-sm">🔍 Señales:</p>
                    <ul className="space-y-1">
                      {nivel.señales.map((señal, idx) => (
                        <li key={idx} className="text-sm text-white/90">• {señal}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <p className="font-bold text-sm">→ Tu acción: <span className="font-black">{nivel.accion}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-900 p-6 rounded-xl text-white text-center">
          <p className="text-lg font-bold">
            💡 Tu objetivo: Detectar el nivel de dolor y ajustar tu estrategia. Un cliente en Nivel 1 necesita educación. Un cliente en Nivel 3 necesita acción inmediata.
          </p>
        </div>
      </div>

      {/* Destructor de Mitos */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border-2 border-slate-300 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🔨 Destruyendo Mitos que Sabotean tus Ventas
          </h2>
          <p className="text-lg text-slate-600">
            Hacé click en cada card para revelar la verdad
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {mitos.map((mito) => (
            <div key={mito.id} className="perspective-1000">
              <div 
                className={`relative h-64 transition-all duration-500 transform-style-3d cursor-pointer ${
                  mitosRevelados.includes(mito.id) ? 'rotate-y-180' : ''
                }`}
                onClick={() => toggleMito(mito.id)}
              >
                {/* Frente de la card */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 flex flex-col items-center justify-center text-white shadow-lg">
                  <XCircle className="w-16 h-16 mb-4" />
                  <h3 className="text-xl font-bold text-center mb-2">{mito.mito}</h3>
                  <p className="text-sm text-center text-red-200">Click para revelar la verdad</p>
                </div>

                {/* Reverso de la card */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 flex flex-col justify-between text-white shadow-lg rotate-y-180">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-8 h-8" />
                      <p className="font-bold text-sm">LA VERDAD:</p>
                    </div>
                    <p className="text-lg font-bold mb-4">{mito.verdad}</p>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                      <p className="text-xs font-bold mb-1">💡 Ejemplo:</p>
                      <p className="text-sm">{mito.ejemplo}</p>
                    </div>
                  </div>
                  <p className="text-xs text-center text-green-200 mt-3">Click para volver</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caso Real */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4">
            <Award className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            📖 CASO REAL: El Empresario que Dijo "No Tengo Tiempo"
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
          <div className="bg-slate-100 p-4 rounded-lg">
            <p className="font-bold text-slate-900 mb-2">📋 Contexto:</p>
            <p className="text-slate-700">CEO de startup tecnológica. 3 reuniones rechazadas con la excusa "estoy muy ocupado".</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <p className="font-bold text-red-900 text-sm mb-2">😐 Dolor superficial:</p>
              <p className="text-slate-800">"Estoy ocupado"</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <p className="font-bold text-orange-900 text-sm mb-2">😰 Dolor emocional:</p>
              <p className="text-slate-800">"Estoy colapsado y no sé cómo delegar"</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg border-l-4 border-red-700">
              <p className="font-bold text-red-900 text-sm mb-2">😱 Dolor profundo:</p>
              <p className="text-slate-800">"Creo que me voy a enfermar"</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-300">
            <p className="font-bold text-green-900 mb-3">✅ Qué hizo el vendedor:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">→</span>
                <span className="text-slate-800">No insistió con "solo 15 minutos"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">→</span>
                <span className="text-slate-800">Preguntó: <span className="font-bold">"¿Qué pasaría si seguís así 6 meses más?"</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">→</span>
                <span className="text-slate-800">El CEO se quebró: <span className="italic">"Honestamente... creo que me enfermo"</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">→</span>
                <span className="text-slate-800 font-bold">Cerró en 24hs</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 p-5 rounded-xl text-white text-center">
            <p className="text-xl font-bold">
              💎 Lección: El dolor encuentra tiempo
            </p>
            <p className="text-slate-300 mt-2">
              Cuando tocás el dolor profundo, todas las excusas desaparecen.
            </p>
          </div>
        </div>
      </div>

      {/* Tu Deber Moral + Test de Integridad */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-300 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl mb-4">
            <Shield className="w-12 h-12 text-amber-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            ⚖️ Tu Deber Moral
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
          <p className="text-2xl font-bold text-center text-slate-900 mb-4">
            Si sabés que podés mejorar su vida, negocio o situación...
          </p>
          <p className="text-3xl font-black text-center bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            No es solo tu derecho cerrar.<br/>Es tu DEBER.
          </p>
          <p className="text-lg text-center text-slate-700">
            Vendé con integridad. Porque la verdadera venta no es manipulación.<br/>
            <span className="font-bold text-amber-700">Es liderazgo.</span>
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 border-2 border-slate-300">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
            ✅ Test de Integridad
          </h3>
          <p className="text-center text-slate-600 mb-6">Marcá solo si es verdad:</p>
          
          <div className="space-y-3 mb-6">
            {[
              '¿Realmente puedo resolver su problema?',
              '¿Tengo casos de éxito similares?',
              '¿Estoy prometiendo solo lo que puedo cumplir?',
              '¿Mi precio refleja el valor real que doy?'
            ].map((pregunta, idx) => (
              <label 
                key={idx} 
                className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-slate-200 cursor-pointer hover:border-amber-400 transition-all"
              >
                <input
                  type="checkbox"
                  checked={integrityChecks[idx]}
                  onChange={() => toggleIntegrityCheck(idx)}
                  className="mt-1 w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                />
                <span className="text-slate-800 font-medium">{pregunta}</span>
              </label>
            ))}
          </div>

          <div className={`p-6 rounded-xl text-center transition-all ${
            integrityScore === 4 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
              : integrityScore >= 2
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
              : 'bg-gradient-to-r from-red-600 to-red-700 text-white'
          }`}>
            {integrityScore === 4 && (
              <div>
                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                <p className="text-2xl font-bold mb-2">✅ Tenés el DEBER de cerrar</p>
                <p className="text-lg">Tu integridad está intacta. Ahora cerrá con confianza.</p>
              </div>
            )}
            {integrityScore >= 2 && integrityScore < 4 && (
              <div>
                <AlertTriangle className="w-12 h-12 mx-auto mb-3" />
                <p className="text-2xl font-bold mb-2">⚠️ Evaluá mejor</p>
                <p className="text-lg">Necesitás más información antes de cerrar.</p>
              </div>
            )}
            {integrityScore < 2 && (
              <div>
                <X className="w-12 h-12 mx-auto mb-3" />
                <p className="text-2xl font-bold mb-2">❌ No cierres</p>
                <p className="text-lg">No sos el fit correcto para este cliente. Dejalo ir con honestidad.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* La Estructura Exacta */}
      <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎯 La Estructura Exacta para Cerrar
          </h2>
          <p className="text-lg text-slate-600">
            Una llamada de ventas no es charla random. Tiene coreografía.
          </p>
        </div>

        <div className="space-y-4">
          {estructura.map((paso, idx) => (
            <div key={paso.id} className="bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <button
                onClick={() => setEstructuraExpandida(estructuraExpandida === paso.id ? null : paso.id)}
                className={`w-full p-6 flex items-center justify-between transition-all ${
                  estructuraExpandida === paso.id ? `bg-gradient-to-r ${paso.color} text-white` : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    estructuraExpandida === paso.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {paso.icono}
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                      estructuraExpandida === paso.id ? 'text-white/80' : 'text-slate-500'
                    }`}>
                      Paso {idx + 1}
                    </p>
                    <h3 className={`text-xl font-bold ${
                      estructuraExpandida === paso.id ? 'text-white' : 'text-slate-900'
                    }`}>
                      {paso.paso}
                    </h3>
                    <p className={`text-sm ${
                      estructuraExpandida === paso.id ? 'text-white/90' : 'text-slate-600'
                    }`}>
                      {paso.descripcion}
                    </p>
                  </div>
                </div>
                <ArrowRight className={`w-6 h-6 transition-transform ${
                  estructuraExpandida === paso.id ? 'rotate-90 text-white' : 'text-slate-400'
                }`} />
              </button>

              {estructuraExpandida === paso.id && (
                <div className="p-6 bg-white border-t-2 border-slate-200">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="font-bold text-blue-900 mb-2">💬 Preguntas clave:</p>
                      <ul className="space-y-2">
                        {paso.preguntas.map((pregunta, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <span className="text-slate-700">{pregunta}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                        <p className="font-bold text-green-900 text-sm mb-1">{paso.señalVerde}</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                        <p className="font-bold text-yellow-900 text-sm mb-1">{paso.señalAmarilla}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                        <p className="font-bold text-red-900 text-sm mb-1">{paso.señalRoja}</p>
                      </div>
                    </div>

                    <div className="bg-red-100 p-4 rounded-lg border-2 border-red-300">
                      <p className="font-bold text-red-900">{paso.errorComun}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white text-center">
          <p className="text-xl font-bold">
            🎯 Tu meta: Cerrar en UNA sola llamada. No más propuestas que se pierden en la carpeta de "después lo veo".
          </p>
        </div>
      </div>

      {/* Pain Point Detector - Simulador */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4">
            <Target className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎮 Pain Point Detector
          </h2>
          <p className="text-lg text-slate-600">
            Simulador de situación real. ¿Qué harías vos?
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="bg-slate-100 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-slate-600 mb-2">🎬 Situación:</p>
            <p className="text-2xl font-bold text-slate-900">{painDetectorScenario.situacion}</p>
          </div>

          {!showFeedback ? (
            <div className="space-y-3">
              <p className="font-bold text-slate-700 mb-4">¿Qué preguntás?</p>
              {painDetectorScenario.opciones.map((opcion) => (
                <button
                  key={opcion.id}
                  onClick={() => handleAnswerSelect(opcion.id)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-5 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === opcion.id
                      ? opcion.correcta
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-indigo-50'
                  } ${selectedAnswer && selectedAnswer !== opcion.id ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      selectedAnswer === opcion.id
                        ? opcion.correcta
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {opcion.id}
                    </div>
                    <p className="flex-1 font-medium text-slate-900">{opcion.texto}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {painDetectorScenario.opciones.map((opcion) => (
                selectedAnswer === opcion.id && (
                  <div key={opcion.id} className={`p-6 rounded-xl ${
                    opcion.correcta ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                  }`}>
                    <div className="flex items-start gap-3 mb-3">
                      {opcion.correcta ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-lg text-slate-900 mb-2">
                          Opción {opcion.id}: "{opcion.texto}"
                        </p>
                        <p className={`text-lg ${opcion.correcta ? 'text-green-900' : 'text-red-900'}`}>
                          {opcion.feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ))}

              {selectedAnswer && painDetectorScenario.opciones.find(o => o.id === selectedAnswer)?.correcta && (
                <div className="bg-indigo-600 p-6 rounded-xl text-white">
                  <p className="text-lg font-bold mb-2">💡 Por qué funciona:</p>
                  <p>
                    Cuando alguien dice "déjame pensarlo", hay una objeción real escondida. Tu trabajo es desenterrarla 
                    con preguntas específicas. Una vez que sabés el dolor real, podés conquistarlo.
                  </p>
                </div>
              )}

              <button
                onClick={resetDetector}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ejercicio Práctico */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl mb-4">
            <Brain className="w-12 h-12 text-cyan-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📝 TU TURNO: Ejercicio de Reflexión
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <p className="text-lg text-slate-700 mb-6 text-center">
            Pensá en tu última venta que NO cerraste. Ahora respondé con honestidad:
          </p>

          <div className="space-y-4">
            {[
              '¿Qué dolor expresó el cliente en palabras?',
              '¿Qué dolor emocional probablemente sentía (aunque no lo dijera)?',
              '¿Llegaste a descubrir su dolor profundo?',
              '¿En qué nivel de dolor estaba? (1-Molestia, 2-Problema, 3-Crisis)',
              'Si pudieras tener esa llamada de nuevo, ¿qué preguntarías diferente?'
            ].map((pregunta, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-lg border-l-4 border-cyan-500">
                <p className="font-bold text-slate-900 mb-2">{idx + 1}. {pregunta}</p>
                <div className="bg-white p-3 rounded border border-slate-200 min-h-16">
                  <p className="text-sm text-slate-400 italic">Tomá un momento para reflexionar...</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-xl text-white text-center">
            <p className="text-lg font-bold">
              💎 Este ejercicio es oro puro. La mayoría nunca analiza sus ventas perdidas. Vos ya estás un paso adelante.
            </p>
          </div>
        </div>
      </div>

      {/* BONUS OCULTO */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-8 text-white border-2 border-indigo-500 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-indigo-200 text-center mb-6">
          Prompt para desbloquear tu poder de detección de dolor
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-indigo-200 leading-relaxed">
            🎯 Actuá como un coach experto en ventas de alto impacto. Quiero que me entrenes paso a paso para detectar el dolor oculto de un cliente, crear una narrativa emocional irresistible en mi pitch, y cerrar con seguridad sin sonar agresivo. Quiero ejemplos reales, estructuras probadas y consejos accionables.
          </p>
        </div>
      </div>

      {/* Cierre Épico */}
      <div className="bg-gradient-to-r from-slate-900 via-red-900 to-black rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        <div className="relative z-10">
          <div className="mb-6">
            <Heart className="w-20 h-20 mx-auto text-red-400 mb-4" />
          </div>
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
            LA VERDAD INCÓMODA
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-white">
              Vender no es opcional cuando podés ayudar.
            </p>
            <p className="text-2xl font-bold text-red-300">
              Es tu responsabilidad.
            </p>
            <div className="my-8 h-1 w-32 bg-gradient-to-r from-red-400 to-orange-400 mx-auto rounded-full" />
            <p className="text-xl text-slate-200">
              No sos un vendedor.<br/>
              Sos un <span className="text-white font-bold">guía</span>.<br/>
              Sos el que tiene el <span className="text-red-300 font-bold">mapa</span>.<br/>
              Sos el que conoce la <span className="text-green-300 font-bold">salida</span>.
            </p>
            <div className="my-8" />
            <p className="text-2xl font-bold text-white">
              Y dejar que alguien sufra... cuando vos tenés la solución...
            </p>
            <p className="text-xl text-red-400">
              Eso no es humildad.
            </p>
            <p className="text-3xl font-black text-white mt-4">
              Es cobardía disfrazada de modestia.
            </p>
            <div className="my-8 h-1 w-64 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full" />
            <p className="text-2xl font-bold text-green-300">
              Así que la próxima vez que sientas culpa por "vender"...
            </p>
            <p className="text-3xl font-black text-white mt-4">
              Recordá esto:
            </p>
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 rounded-2xl mt-8 inline-block">
              <p className="text-3xl font-black">
                No estás vendiendo.<br/>
                <span className="text-4xl">Estás salvando.</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-500/30 to-pink-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const laBaseRealMetadata = {
  id: 2,
  title: "La Base Real - El Dolor como Motor de Venta",
  type: "document" as const,
  duration: "45 min"
};