import React, { useState, useEffect } from 'react';
import { 
  Mic, Phone, Shield, Heart, CheckCircle, XCircle, Clock, 
  Volume2, VolumeX, Target, Brain, Zap, ArrowRight, Lock,
  AlertTriangle, Sparkles, Timer, PlayCircle, PauseCircle,
  MessageCircle, TrendingUp, Award, Eye, EyeOff, Flame
} from 'lucide-react';

export const GuiaVozCerrarContent = () => {
  const [preCallChecks, setPreCallChecks] = useState<boolean[]>(new Array(8).fill(false));
  const [pasoExpandido, setPasoExpandido] = useState<number | null>(null);
  const [silencioActivo, setSilencioActivo] = useState(false);
  const [silencioSegundos, setSilencioSegundos] = useState(0);
  const [excusaSimulador, setExcusaSimulador] = useState<string | null>(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const preCallChecklist = [
    { item: '📵 Celular en modo avión', categoria: 'Distracciones', emoji: '📵' },
    { item: '💻 Cerré todas las pestañas innecesarias', categoria: 'Distracciones', emoji: '💻' },
    { item: '🎧 Tengo buenos audífonos', categoria: 'Técnico', emoji: '🎧' },
    { item: '📝 Tengo papel y lapicera', categoria: 'Técnico', emoji: '📝' },
    { item: '🎯 Revisé el perfil del prospecto', categoria: 'Preparación', emoji: '🎯' },
    { item: '💡 Tengo clara mi propuesta de valor', categoria: 'Preparación', emoji: '💡' },
    { item: '😌 Hice 3 respiraciones profundas', categoria: 'Mentalidad', emoji: '😌' },
    { item: '🔥 Estoy listo para ayudar, no para rogar', categoria: 'Mentalidad', emoji: '🔥' }
  ];

  const los12Pasos = [
    {
      numero: 1,
      titulo: 'Romper el Hielo',
      subtitulo: 'Micro-rapport',
      objetivo: 'Crear conexión humana en 30 segundos',
      duracion: '30 seg',
      script: [
        '"¡Hola! ¿Cómo estás? Antes que nada, ¿te agarra bien el horario?"',
        '"Perfecto. Gracias por tu tiempo, sé que es valioso."'
      ],
      preguntasClave: [
        '¿Cómo estás?',
        '¿Te agarra bien ahora?'
      ],
      señalExito: '🟢 Responden con buena onda, no están apurados',
      errorComun: '❌ Entrar directo a vender sin crear rapport',
      tip: '💡 Sonreí cuando hables. Se nota en el tono de voz.',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      numero: 2,
      titulo: 'Marcar el Ritmo',
      subtitulo: 'Agenda + Liderazgo',
      objetivo: 'Establecer que VOS liderás la conversación',
      duracion: '1 min',
      script: [
        '"Te voy a hacer unas preguntas para ver si tiene sentido lo que hacemos."',
        '"Si veo que encajamos, te cuento más. Si no, te lo digo con honestidad."',
        '"Y después, vos decidís. ¿Te parece?"'
      ],
      preguntasClave: [
        '¿Te parece bien que arranquemos así?'
      ],
      señalExito: '🟢 Dicen "sí" o "dale"',
      errorComun: '❌ No establecer liderazgo desde el inicio',
      tip: '💡 Este "mini-acuerdo" te da permiso para hacer preguntas difíciles.',
      color: 'from-purple-400 to-pink-400'
    },
    {
      numero: 3,
      titulo: 'Descubrir el "Por Qué" Real',
      subtitulo: 'Motivación profunda',
      objetivo: 'Entender qué los trajo hasta acá AHORA',
      duracion: '3-4 min',
      script: [
        '"¿Por qué están buscando ayuda justo ahora?"',
        '"¿Qué intentaron antes que no les funcionó?"'
      ],
      preguntasClave: [
        '¿Por qué ahora?',
        '¿Qué probaste antes?',
        '¿Qué no funcionó?'
      ],
      señalExito: '🟢 Comparten frustraciones y experiencias pasadas',
      errorComun: '❌ Asumir que sabés lo que necesitan',
      tip: '💡 Calláte y escuchá. La venta se gana en el silencio.',
      color: 'from-orange-400 to-red-400'
    },
    {
      numero: 4,
      titulo: 'Entender su Situación Actual',
      subtitulo: 'Diagnóstico',
      objetivo: 'Saber exactamente dónde están parados',
      duracion: '3-4 min',
      script: [
        '"¿Qué vendés exactamente?"',
        '"¿Cuál es tu mejor producto o servicio?"',
        '"¿Cómo conseguís clientes hoy?"',
        '"¿Cuánto facturás por mes aproximadamente?"'
      ],
      preguntasClave: [
        '¿Qué vendés?',
        '¿Cuál es tu mejor oferta?',
        '¿Cómo conseguís clientes?',
        '¿Cuánto facturás?'
      ],
      señalExito: '🟢 Te dan números y detalles concretos',
      errorComun: '❌ No preguntar por facturación (por miedo)',
      tip: '💡 Si no te dan números, no están listos para comprar.',
      color: 'from-green-400 to-emerald-400'
    },
    {
      numero: 5,
      titulo: 'Mostrar lo que NO Funciona',
      subtitulo: 'Dolor oculto',
      objetivo: 'Que reconozcan que algo está roto',
      duracion: '2-3 min',
      script: [
        '"¿Estás contento con esos resultados?"',
        '"¿Tu sistema de conseguir clientes funciona bien... o te gustaría que sea más predecible?"'
      ],
      preguntasClave: [
        '¿Estás contento con los resultados?',
        '¿Tu sistema funciona?'
      ],
      señalExito: '🟢 Admiten que algo no está funcionando',
      errorComun: '❌ Tener miedo de señalar problemas',
      tip: '💡 No seas cruel, pero sé directo. La verdad duele... y vende.',
      color: 'from-red-500 to-pink-500'
    },
    {
      numero: 6,
      titulo: 'Visualizar su Meta',
      subtitulo: 'El futuro deseado',
      objetivo: 'Hacerlos imaginar la vida que quieren',
      duracion: '2-3 min',
      script: [
        '"¿Cuánto querés ganar en 12 meses?"',
        '"Si lográs eso, ¿qué cambiaría en tu vida?"',
        '"¿Cómo te sentirías?"'
      ],
      preguntasClave: [
        '¿Cuánto querés ganar?',
        '¿Qué cambiaría en tu vida?',
        '¿Cómo te sentirías?'
      ],
      señalExito: '🟢 Se emocionan, hablan con pasión del futuro',
      errorComun: '❌ Hablar solo de números, no de emociones',
      tip: '💡 La gente no compra resultados. Compra cómo se van a sentir.',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      numero: 7,
      titulo: 'Que Reconozcan que Necesitan Ayuda',
      subtitulo: 'Quiebre del ego',
      objetivo: 'Que digan "no puedo solo"',
      duracion: '1-2 min',
      script: [
        '"¿Por qué no lo hacés por tu cuenta?"',
        '"¿Qué te frena?"'
      ],
      preguntasClave: [
        '¿Por qué no lo hacés solo?'
      ],
      señalExito: '🟢 Dicen: "No sé cómo" o "Quiero resultados más rápidos"',
      errorComun: '❌ Asumir que ya reconocen que necesitan ayuda',
      tip: '💡 Si no admiten que necesitan ayuda, no están listos.',
      color: 'from-indigo-400 to-purple-400'
    },
    {
      numero: 8,
      titulo: 'Activar Emociones Profundas',
      subtitulo: 'El costo de no actuar',
      objetivo: 'Que sientan el dolor de seguir igual',
      duracion: '2-3 min',
      script: [
        '"¿Qué pasa si dentro de 6 meses seguís igual?"',
        '"¿Cómo te afecta eso personalmente?"',
        '"¿Qué estás dispuesto a hacer para que esto cambie?"'
      ],
      preguntasClave: [
        '¿Qué pasa si no cambia nada?',
        '¿Cómo te afecta?',
        '¿Qué estás dispuesto a hacer?'
      ],
      señalExito: '🟢 Se quiebran un poco, hablan de miedos o frustraciones',
      errorComun: '❌ Tener miedo de ir profundo',
      tip: '💡 Este es el momento que define si cerrás o no.',
      color: 'from-red-600 to-red-800'
    },
    {
      numero: 9,
      titulo: 'Mostrar Confianza y Pedir Permiso',
      subtitulo: 'El giro',
      objetivo: 'Cambiar de preguntar a ofrecer',
      duracion: '30 seg',
      script: [
        '"Mirá, estoy seguro de que podemos ayudarte."',
        '"¿Querés que te cuente cómo?"'
      ],
      preguntasClave: [
        '¿Querés que te cuente cómo te ayudamos?'
      ],
      señalExito: '🟢 Dicen "sí" con entusiasmo',
      errorComun: '❌ Pasar al pitch sin pedir permiso',
      tip: '💡 Ese "sí" abre las compuertas. Ahora te escuchan de verdad.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      numero: 10,
      titulo: 'Posicionamiento Claro',
      subtitulo: 'A quién ayudás',
      objetivo: 'Que se sientan identificados',
      duracion: '1-2 min',
      script: [
        '"Trabajamos con negocios como el tuyo, que facturan entre X y Y..."',
        '"...y los ayudamos a llegar a Z con un sistema probado."'
      ],
      preguntasClave: [],
      señalExito: '🟢 Dicen "exacto" o "eso es lo que necesito"',
      errorComun: '❌ Hablar en genérico sin posicionarte',
      tip: '💡 Cuanto más específico, más creíble.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      numero: 11,
      titulo: 'Presentar Sin Revelar Todo',
      subtitulo: 'Resultados, no proceso',
      objetivo: 'Crear curiosidad y deseo',
      duracion: '2-3 min',
      script: [
        '"Te ayudamos a conseguir más clientes de forma predecible."',
        '"Sin tener que perseguir a nadie."',
        '"¿Cómo? Con un sistema que ya probamos con +50 negocios."'
      ],
      preguntasClave: [],
      señalExito: '🟢 Preguntan "¿cómo funciona exactamente?"',
      errorComun: '❌ Explicar todo el proceso técnico',
      tip: '💡 No des la consultoría gratis. Vendé el resultado.',
      color: 'from-green-500 to-teal-500'
    },
    {
      numero: 12,
      titulo: 'Precio + Silencio Estratégico',
      subtitulo: 'El momento definitivo',
      objetivo: 'Cerrar sin presionar',
      duracion: '30 seg + silencio',
      script: [
        '"Cobramos $1.500 al mes..."',
        '"...y una configuración inicial de $2.000."',
        '"Pero si decidís hoy, eliminamos ese costo inicial."',
        '[SILENCIO TOTAL]'
      ],
      preguntasClave: [],
      señalExito: '🟢 Hablan primero y procesan la info',
      errorComun: '❌ Hablar después del precio (FATAL)',
      tip: '💡 EL PRÓXIMO EN HABLAR... PIERDE.',
      color: 'from-amber-500 to-yellow-500'
    }
  ];

  const excusasComunes = [
    {
      id: 1,
      excusa: '"Lo tengo que pensar"',
      opciones: [
        { id: 'A', texto: '"Ok, avisame cuando decidas"', correcta: false, feedback: '❌ Perdiste. Nunca te van a avisar. El "pensarlo" es una objeción cortina.' },
        { id: 'B', texto: '"¿Qué parte específicamente tenés que pensar?"', correcta: true, feedback: '✅ CORRECTO. Profundizás para descubrir la objeción real.' },
        { id: 'C', texto: '"Pero la oferta termina hoy..."', correcta: false, feedback: '❌ Presión artificial. Se siente desesperado y manipulador.' }
      ]
    },
    {
      id: 2,
      excusa: '"Tengo que consultarlo con mi socio"',
      opciones: [
        { id: 'A', texto: '"Dale, consultalo y me avisás"', correcta: false, feedback: '❌ Perdiste el control. Dejaste que otro decida.' },
        { id: 'B', texto: '"¿Tu socio toma estas decisiones generalmente?"', correcta: true, feedback: '✅ CORRECTO. Calificás si realmente es una objeción o una excusa.' },
        { id: 'C', texto: '"¿Y si le mandamos la info por mail?"', correcta: false, feedback: '❌ El mail va a la carpeta de spam mental. Nunca funciona.' }
      ]
    },
    {
      id: 3,
      excusa: '"Está muy caro"',
      opciones: [
        { id: 'A', texto: '"Te puedo hacer un descuento..."', correcta: false, feedback: '❌ Acabás de bajar tu valor. Ahora van a regatear todo.' },
        { id: 'B', texto: '"¿Caro comparado con qué?"', correcta: true, feedback: '✅ CORRECTO. Reencuadrás y entendés qué están comparando.' },
        { id: 'C', texto: '"Pero es una inversión, no un gasto"', correcta: false, feedback: '❌ Frase cliché que todo vendedor dice. No convence a nadie.' }
      ]
    }
  ];

  const frasesQueMatanVentas = [
    {
      frase: '"Lo pienso y te aviso"',
      porQueMatá: 'Significa: "No estoy convencido pero no quiero decirte que no"',
      queHacer: 'Preguntá: "¿Qué parte específica te genera más duda?"',
      color: 'from-red-500 to-red-700'
    },
    {
      frase: '"Mandame la info por mail"',
      porQueMatá: 'Es la forma educada de decir "no me interesa"',
      queHacer: 'Respondé: "Te la mando, pero antes, ¿qué querés saber específicamente?"',
      color: 'from-orange-500 to-red-500'
    },
    {
      frase: '"Tengo que ver mi presupuesto"',
      porQueMatá: 'No es tema de plata, es tema de prioridad',
      queHacer: 'Preguntá: "Si fuera gratis, ¿lo harías ahora mismo?"',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const togglePreCallCheck = (index: number) => {
    const newChecks = [...preCallChecks];
    newChecks[index] = !newChecks[index];
    setPreCallChecks(newChecks);
  };

  const preCallScore = preCallChecks.filter(c => c).length;
  const preCallPercentage = (preCallScore / 8) * 100;

  const iniciarSilencio = () => {
    setSilencioActivo(true);
    setSilencioSegundos(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (silencioActivo && silencioSegundos < 10) {
      interval = setInterval(() => {
        setSilencioSegundos(prev => prev + 1);
      }, 1000);
    } else if (silencioSegundos >= 10) {
      setSilencioActivo(false);
    }
    return () => clearInterval(interval);
  }, [silencioActivo, silencioSegundos]);

  const handleExcusaSelect = (excusaId: number, opcionId: string) => {
    setRespuestaSeleccionada(opcionId);
    setShowFeedback(true);
  };

  const resetExcusaSimulador = () => {
    setRespuestaSeleccionada(null);
    setShowFeedback(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Ultra Moderno */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black via-cyan-900 to-blue-900 p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-cyan-300">
              Capítulo 3 · Módulo 3
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Phone className="w-16 h-16 text-cyan-400" />
              <div className="absolute inset-0 animate-ping">
                <Phone className="w-16 h-16 text-cyan-400 opacity-20" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            🎙️ GUÍA DE VOZ
          </h1>
          <h2 className="text-3xl font-bold text-center mb-4 text-cyan-100">
            PARA CERRAR VENTAS
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-xl text-cyan-200">
              Imaginá esto: estás al borde de una llamada...
            </p>
            <p className="text-xl text-cyan-200">
              Y al otro lado, alguien que necesita tu ayuda, aunque todavía no lo sepa.
            </p>
            <p className="text-2xl text-white font-black mt-6">
              Esta no es solo una venta. Es una transformación.
            </p>
            <p className="text-2xl text-cyan-300 font-bold">
              Y vos sos el catalizador.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* El Dolor como Impulso */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl mb-4">
            <Zap className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🔁 Cuando el Dolor se Convierte en Impulso
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
          <p className="text-2xl font-bold text-center text-red-900">
            El dolor es el verdadero motor de toda venta.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-100 p-6 rounded-xl text-center border-2 border-red-300">
              <div className="text-4xl mb-3">😣</div>
              <h3 className="font-bold text-red-900 mb-2">REALIDAD ACTUAL</h3>
              <p className="text-sm text-red-800">El prospecto</p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-green-500 p-6 rounded-xl text-center flex items-center justify-center">
              <div>
                <Phone className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="font-bold text-white text-sm">TU LLAMADA</p>
                <p className="text-xs text-white/90">El puente</p>
              </div>
            </div>
            <div className="bg-green-100 p-6 rounded-xl text-center border-2 border-green-300">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-green-900 mb-2">VIDA DESEADA</h3>
              <p className="text-sm text-green-800">Transformación</p>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl text-white">
            <p className="text-lg font-bold text-center mb-3">
              📌 La fórmula que nunca falla:
            </p>
            <p className="text-xl text-center font-black text-cyan-300">
              Preguntás → Mostrás → Resolvés dudas → Cerrás
            </p>
            <p className="text-center text-slate-300 mt-3">
              En una sola llamada. Sin zonas grises. Sin "lo pienso y te aviso".
            </p>
          </div>
        </div>
      </div>

      {/* El Poder de la Ética */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-4">
            <Shield className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            ⚖️ El Poder de la Ética
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
          <p className="text-xl text-slate-800 text-center leading-relaxed">
            Este sistema para vender funciona <span className="font-bold text-green-700">tan bien</span>... que podrías convencer a casi cualquiera de comprarte.
          </p>
          
          <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-xl border-l-4 border-red-500">
            <p className="text-lg font-bold text-red-900 mb-2">⚠️ Pero ahí aparece el desafío más importante:</p>
            <p className="text-slate-800">
              Usar ese poder <span className="font-bold">solo cuando sabés que realmente podés ayudar</span> a la persona.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-5 rounded-lg border-2 border-red-200 text-center">
              <XCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
              <p className="font-bold text-red-900">NO es manipular</p>
            </div>
            <div className="bg-red-50 p-5 rounded-lg border-2 border-red-200 text-center">
              <XCircle className="w-10 h-10 text-red-600 mx-auto mb-3" />
              <p className="font-bold text-red-900">NO es mentir</p>
            </div>
            <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300 text-center">
              <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <p className="font-bold text-green-900">SÍ es ser honesto</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-xl text-white text-center">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <p className="text-2xl font-bold mb-3">El Juramento del Vendedor Ético</p>
            <div className="text-left max-w-2xl mx-auto space-y-2 text-lg">
              <p>✋ Solo vendo cuando SÉ que puedo ayudar</p>
              <p>✋ Digo la verdad, incluso si pierdo la venta</p>
              <p>✋ Rechazo clientes que no son fit</p>
              <p>✋ Cumplo lo que prometo, siempre</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Call Checklist */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            ✅ Pre-Call Checklist
          </h2>
          <p className="text-lg text-slate-600">
            Antes de levantar el teléfono, verificá estos 8 puntos
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold text-slate-700">Tu preparación:</p>
              <p className="text-2xl font-black text-blue-600">{preCallScore}/8</p>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  preCallPercentage === 100 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                }`}
                style={{ width: `${preCallPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {preCallChecklist.map((item, idx) => (
              <label 
                key={idx}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border-2 border-slate-200 cursor-pointer hover:border-blue-400 transition-all"
              >
                <input
                  type="checkbox"
                  checked={preCallChecks[idx]}
                  onChange={() => togglePreCallCheck(idx)}
                  className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{item.item}</p>
                  <p className="text-xs text-slate-500 mt-1">Categoría: {item.categoria}</p>
                </div>
              </label>
            ))}
          </div>

          {preCallScore === 8 && (
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-xl text-white text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-3" />
              <p className="text-2xl font-bold">¡Estás listo para arrasar! 🔥</p>
              <p className="text-lg mt-2">Ahora sí, levantá ese teléfono con confianza.</p>
            </div>
          )}

          {preCallScore < 8 && preCallScore > 0 && (
            <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300 text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <p className="font-bold text-yellow-900">Te faltan {8 - preCallScore} puntos</p>
              <p className="text-yellow-800">Completá el checklist antes de llamar.</p>
            </div>
          )}
        </div>
      </div>

      {/* Los 12 Pasos */}
      <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📞 Los 12 Pasos para Cerrar
          </h2>
          <p className="text-lg text-slate-600">
            El paso a paso exacto. Hacé click en cada uno para ver el script completo.
          </p>
        </div>

        <div className="space-y-3">
          {los12Pasos.map((paso) => (
            <div key={paso.numero} className="bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <button
                onClick={() => setPasoExpandido(pasoExpandido === paso.numero ? null : paso.numero)}
                className={`w-full p-6 flex items-center justify-between transition-all ${
                  pasoExpandido === paso.numero ? `bg-gradient-to-r ${paso.color} text-white` : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl ${
                    pasoExpandido === paso.numero 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {paso.numero}
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                      pasoExpandido === paso.numero ? 'text-white/80' : 'text-slate-500'
                    }`}>
                      {paso.duracion} · Paso {paso.numero} de 12
                    </p>
                    <h3 className={`text-xl font-bold ${
                      pasoExpandido === paso.numero ? 'text-white' : 'text-slate-900'
                    }`}>
                      {paso.titulo}
                    </h3>
                    <p className={`text-sm ${
                      pasoExpandido === paso.numero ? 'text-white/90' : 'text-slate-600'
                    }`}>
                      {paso.subtitulo}
                    </p>
                  </div>
                </div>
                <ArrowRight className={`w-6 h-6 transition-transform ${
                  pasoExpandido === paso.numero ? 'rotate-90 text-white' : 'text-slate-400'
                }`} />
              </button>

              {pasoExpandido === paso.numero && (
                <div className="p-6 bg-white border-t-2 border-slate-200">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                      <p className="font-bold text-blue-900 mb-2">🎯 Objetivo:</p>
                      <p className="text-slate-800">{paso.objetivo}</p>
                    </div>

                    <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                      <p className="font-bold text-purple-900 mb-3">💬 Script exacto:</p>
                      <div className="space-y-2">
                        {paso.script.map((linea, idx) => (
                          <div key={idx} className="bg-white p-3 rounded border border-purple-200">
                            <p className="text-slate-800 italic">{linea}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {paso.preguntasClave.length > 0 && (
                      <div className="bg-cyan-50 p-5 rounded-lg border-l-4 border-cyan-500">
                        <p className="font-bold text-cyan-900 mb-2">❓ Preguntas clave:</p>
                        <ul className="space-y-1">
                          {paso.preguntasClave.map((pregunta, idx) => (
                            <li key={idx} className="text-slate-800">• {pregunta}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                        <p className="font-bold text-green-900 text-sm mb-1">{paso.señalExito}</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                        <p className="font-bold text-red-900 text-sm mb-1">{paso.errorComun}</p>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                      <p className="text-amber-900">{paso.tip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* El Precio y el Silencio - SECCIÓN ESPECIAL */}
      <div className="bg-gradient-to-br from-slate-900 to-amber-900 rounded-2xl p-8 border-2 border-amber-500 shadow-2xl">
        <div className="text-center mb-6">
          <Timer className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-3">
            ⏳ EL SILENCIO QUE CIERRA VENTAS
          </h2>
          <p className="text-xl text-amber-200">
            El momento más importante de toda la llamada
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
          <div className="bg-slate-100 p-6 rounded-lg">
            <p className="font-bold text-slate-900 mb-3 text-lg">📜 El script exacto:</p>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-slate-800">"Cobramos $1.500 al mes..."</p>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <p className="text-slate-800">"...y una configuración inicial de $2.000."</p>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <p className="text-slate-800">"Pero si decidís hoy, eliminamos ese costo inicial."</p>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded">
                <p className="text-white font-black text-center text-xl">[SILENCIO TOTAL]</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
            <p className="text-2xl font-black text-red-900 text-center mb-3">
              ⚠️ LA REGLA DE ORO
            </p>
            <p className="text-3xl font-black text-center text-slate-900">
              El próximo en hablar... pierde.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={iniciarSilencio}
              disabled={silencioActivo}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                silencioActivo 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {silencioActivo ? 'Silencio en progreso...' : 'Simular Silencio Estratégico'}
            </button>
          </div>

          {silencioActivo && (
            <div className="bg-slate-900 p-8 rounded-xl text-center">
              <div className="text-8xl font-black text-amber-400 mb-4">
                {silencioSegundos}
              </div>
              <p className="text-2xl text-white font-bold">segundos de silencio...</p>
              <p className="text-slate-300 mt-3">
                {silencioSegundos < 3 && 'Mantené la calma...'}
                {silencioSegundos >= 3 && silencioSegundos < 6 && 'Va a sentirse incómodo. Es normal.'}
                {silencioSegundos >= 6 && silencioSegundos < 10 && 'Ellos están procesando. NO HABLES.'}
                {silencioSegundos >= 10 && '✅ Perfecto. Ya pueden hablar (ellos primero).'}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-100 p-5 rounded-lg border-2 border-red-300">
              <p className="font-bold text-red-900 mb-2">❌ Si hablás primero:</p>
              <ul className="space-y-1 text-sm text-red-800">
                <li>• Perdés poder</li>
                <li>• Das más descuentos</li>
                <li>• Te ven desesperado</li>
                <li>• Justificás el precio (no deberías)</li>
              </ul>
            </div>
            <div className="bg-green-100 p-5 rounded-lg border-2 border-green-300">
              <p className="font-bold text-green-900 mb-2">✅ Si callás:</p>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Ellos procesan</li>
                <li>• Piensan en el valor</li>
                <li>• Revelan su objeción real</li>
                <li>• Hablan desde el dolor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detector de Excusas - Simulador */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-6">
          <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎮 Detector de Excusas
          </h2>
          <p className="text-lg text-slate-600">
            Practica cómo responder a las excusas más comunes
          </p>
        </div>

        <div className="space-y-6">
          {excusasComunes.map((excusaObj) => (
            <div key={excusaObj.id} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-slate-100 p-5 rounded-lg mb-4">
                <p className="text-sm font-bold text-slate-600 mb-2">💬 El cliente dice:</p>
                <p className="text-2xl font-bold text-slate-900">{excusaObj.excusa}</p>
              </div>

              {!showFeedback || excusaSimulador !== excusaObj.id ? (
                <div className="space-y-3">
                  <p className="font-bold text-slate-700">¿Cómo respondés?</p>
                  {excusaObj.opciones.map((opcion) => (
                    <button
                      key={opcion.id}
                      onClick={() => {
                        setExcusaSimulador(excusaObj.id);
                        handleExcusaSelect(excusaObj.id, opcion.id);
                      }}
                      className="w-full p-5 text-left rounded-xl border-2 border-slate-300 bg-white hover:border-purple-400 hover:bg-purple-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-slate-200 text-slate-700">
                          {opcion.id}
                        </div>
                        <p className="flex-1 font-medium text-slate-900">{opcion.texto}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                excusaSimulador === excusaObj.id && (
                  <div className="space-y-4">
                    {excusaObj.opciones.map((opcion) => (
                      respuestaSeleccionada === opcion.id && (
                        <div key={opcion.id} className={`p-6 rounded-xl ${
                          opcion.correcta ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                        }`}>
                          <div className="flex items-start gap-3">
                            {opcion.correcta ? (
                              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="font-bold text-lg text-slate-900 mb-2">
                                Opción {opcion.id}: {opcion.texto}
                              </p>
                              <p className={`text-lg ${opcion.correcta ? 'text-green-900' : 'text-red-900'}`}>
                                {opcion.feedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    <button
                      onClick={() => {
                        resetExcusaSimulador();
                        setExcusaSimulador(null);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      Intentar otra excusa
                    </button>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Frases que Matan Ventas */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-300 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            ❌ Frases que Matan Ventas
          </h2>
          <p className="text-lg text-slate-600">
            Reconocelas y sabé qué hacer cuando las escuchés
          </p>
        </div>

        <div className="space-y-4">
          {frasesQueMatanVentas.map((frase, idx) => (
            <div key={idx} className={`bg-gradient-to-r ${frase.color} rounded-xl p-6 text-white shadow-lg`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <XCircle className="w-12 h-12" />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold mb-3">{frase.frase}</p>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 mb-3">
                    <p className="text-sm font-bold mb-1">🔍 Por qué mata la venta:</p>
                    <p className="text-sm">{frase.porQueMatá}</p>
                  </div>
                  <div className="bg-white/30 backdrop-blur rounded-lg p-4">
                    <p className="text-sm font-bold mb-1">✅ Qué hacer en su lugar:</p>
                    <p className="text-sm font-bold">{frase.queHacer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-900 p-6 rounded-xl text-white text-center">
          <p className="text-xl font-bold">
            💡 Recordá: Las excusas son puertas. Tu trabajo es abrirlas con las preguntas correctas.
          </p>
        </div>
      </div>

      {/* Contador de Tiempo */}
      <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
        <div className="text-center mb-6">
          <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            ⏱️ La Regla del 33/67
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-xl p-6 border-2 border-red-300">
            <Volume2 className="w-12 h-12 text-red-600 mb-3" />
            <p className="text-4xl font-black text-red-900 mb-2">33%</p>
            <p className="text-xl font-bold text-slate-900 mb-2">TÚ HABLÁS</p>
            <p className="text-slate-700">~15 minutos de 45</p>
            <p className="text-sm text-slate-600 mt-3">Hacé preguntas. Presentá. Cerrá.</p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
            <VolumeX className="w-12 h-12 text-green-600 mb-3" />
            <p className="text-4xl font-black text-green-900 mb-2">67%</p>
            <p className="text-xl font-bold text-slate-900 mb-2">TÚ ESCUCHÁS</p>
            <p className="text-slate-700">~30 minutos de 45</p>
            <p className="text-sm text-slate-600 mt-3">Dejá que hablen. Ahí está el oro.</p>
          </div>
        </div>

        <div className="mt-6 bg-slate-900 p-6 rounded-xl text-white text-center">
          <p className="text-2xl font-bold">
            "El que más habla... pierde"
          </p>
          <p className="text-slate-300 mt-2">
            Tu trabajo es hacer las preguntas correctas, no dar discursos.
          </p>
        </div>
      </div>

      {/* BONUS OCULTO */}
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 text-white border-2 border-purple-500 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-purple-200 text-center mb-6">
          Querés llegar al siguiente nivel. Lo sabés.
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-purple-200 leading-relaxed">
            Actuá como un mentor experto en ventas éticas, neurodecisión y psicología del comportamiento humano. Enseñame cómo detectar las motivaciones invisibles de un cliente en menos de 15 minutos y cómo convertir esas emociones ocultas en el motor de un cierre auténtico, sin manipulación.
            <br/><br/>
            Quiero que me entregues:
            <br/>
            • Una estructura mental clara y rápida que pueda seguir durante una llamada para identificar la verdadera razón por la que el cliente está interesado.
            <br/>
            • Técnicas concretas para profundizar emocionalmente sin parecer invasivo.
            <br/>
            • Una lista precisa de preguntas estratégicas divididas por momentos clave de la conversación (inicio, medio y final) que me ayuden a descubrir: El dolor real, La aspiración emocional, Lo que los frena, Lo que los haría decir "sí" hoy mismo.
            <br/>
            • Errores comunes que debería evitar al intentar descubrir estas motivaciones.
          </p>
        </div>
      </div>

      {/* Cierre Épico */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-900 to-blue-900 rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        <div className="relative z-10">
          <Phone className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
            🎯 ESTE PLAYBOOK
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-white">
              No es solo una forma de vender.
            </p>
            <p className="text-2xl font-bold text-cyan-300">
              Es una forma de liderar conversaciones que transforman vidas.
            </p>
            <div className="my-8 h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full" />
            <p className="text-xl text-slate-200">
              Si lo dominás, vas a:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                <p className="font-bold">Guiar con confianza</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
                <Heart className="w-10 h-10 text-red-400 mx-auto mb-2" />
                <p className="font-bold">Conectar con empatía</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
                <Target className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
                <p className="font-bold">Cerrar sin presionar</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const guiaVozCerrarMetadata = {
  id: 3,
  title: "Guía de Voz para Cerrar",
  type: "document" as const,
  duration: "60 min"
};
