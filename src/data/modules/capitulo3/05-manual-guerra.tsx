import React, { useState } from 'react';
import { 
  Shield, Sword, Target, Crosshair, Radio, Eye, Brain,
  Zap, Clock, Lock, Unlock, Award, AlertTriangle, Flame,
  CheckCircle, XCircle, Activity, Gauge, TrendingUp, Star,
  Skull, Heart, Volume2, VolumeX, MessageCircle, Sparkles
} from 'lucide-react';

export const ManualGuerraContent = () => {
  const [armasEquipadas, setArmasEquipadas] = useState<number[]>([]);
  const [simuladorActivo, setSimuladorActivo] = useState<number | null>(null);
  const [respuestaSimulador, setRespuestaSimulador] = useState<string | null>(null);
  const [showFeedbackSimulador, setShowFeedbackSimulador] = useState(false);

  const arsenal = [
    {
      id: 1,
      nombre: 'El Silencio que Vende',
      categoria: 'Arma Psicológica',
      poder: 'Máximo',
      descripcion: 'Tu mejor herramienta no es lo que decís... es lo que callás.',
      comoUsarla: 'Cuando hacés una pregunta, quedate en silencio. No expliques, no completes, no ayudes. Ese silencio incomoda, y en esa incomodidad, la otra persona empieza a hablar más... y dice lo que realmente piensa.',
      cuando: 'Después de una pregunta profunda o después de dar el precio',
      resultado: 'La persona revela su verdadera objeción o pensamiento',
      icono: <VolumeX className="w-8 h-8" />,
      color: 'from-slate-700 to-slate-900',
      efectividad: 95
    },
    {
      id: 2,
      nombre: 'Cero Juicios',
      categoria: 'Arma Mental',
      poder: 'Alto',
      descripcion: 'Si pensás "este no va a comprar", ya empezaste mal. Esa actitud se te nota.',
      comoUsarla: 'Entrá a cada llamada con mente de principiante. Sin prejuicios. Sin asumir nada. Tratá a todos como si fueran tu cliente ideal hasta que demuestren lo contrario.',
      cuando: 'Desde el primer segundo de la llamada',
      resultado: 'El prospecto se abre porque no siente tu juicio',
      icono: <Eye className="w-8 h-8" />,
      color: 'from-blue-600 to-indigo-600',
      efectividad: 85
    },
    {
      id: 3,
      nombre: 'Amplificar el Dolor',
      categoria: 'Arma Emocional',
      poder: 'Extremo',
      descripcion: 'No calmes el dolor. Mostralo. Hacé que lo vean en toda su magnitud.',
      comoUsarla: 'Cuando te cuentan un problema, no digas "no te preocupes". Decí: "Esto es serio. ¿Te das cuenta de lo que esto implica a largo plazo?" Como un médico: "Tenemos que actuar ya."',
      cuando: 'En la fase de diagnóstico y descubrimiento',
      resultado: 'Crean urgencia interna para resolver',
      icono: <Flame className="w-8 h-8" />,
      color: 'from-red-600 to-orange-600',
      efectividad: 90
    },
    {
      id: 4,
      nombre: 'Contagio de Seguridad',
      categoria: 'Arma Energética',
      poder: 'Alto',
      descripcion: 'La venta es contagio emocional. Si dudás, pierden. Si confiás, compran.',
      comoUsarla: 'Hablá con seguridad tranquila. No arrogancia, sino certeza. "Estoy seguro de que esto es lo correcto para vos" con tono firme pero empático.',
      cuando: 'Durante todo el proceso, especialmente al presentar y cerrar',
      resultado: 'El prospecto absorbe tu confianza',
      icono: <Zap className="w-8 h-8" />,
      color: 'from-yellow-600 to-amber-600',
      efectividad: 88
    },
    {
      id: 5,
      nombre: 'Paciencia Táctica',
      categoria: 'Arma Temporal',
      poder: 'Medio-Alto',
      descripcion: 'No apurés el proceso. Una buena venta lleva tiempo.',
      comoUsarla: '¿Te dicen que tienen 15 minutos? Reagendá. "Para hacer esto bien necesitamos 45 minutos. ¿Cuándo tenés ese tiempo disponible?" Tener paciencia no es perder tiempo. Es mostrar profesionalismo.',
      cuando: 'Al inicio, si no hay tiempo suficiente',
      resultado: 'Demostrás que tu solución vale el tiempo',
      icono: <Clock className="w-8 h-8" />,
      color: 'from-green-600 to-emerald-600',
      efectividad: 75
    },
    {
      id: 6,
      nombre: 'Láser de Enfoque',
      categoria: 'Arma Direccional',
      poder: 'Medio',
      descripcion: 'No te desvíes. Mantené la conversación enfocada en el objetivo.',
      comoUsarla: 'Si se van por las ramas con "¿viste el partido?" o charlas random, volvé al punto: "OK, sigamos con esto que es importante..." Eso muestra que vos llevás la conversación.',
      cuando: 'Cuando pierden el foco o se distraen',
      resultado: 'Mantenés el control y el momentum',
      icono: <Target className="w-8 h-8" />,
      color: 'from-purple-600 to-pink-600',
      efectividad: 70
    },
    {
      id: 7,
      nombre: 'Espejo Empático',
      categoria: 'Arma de Conexión',
      poder: 'Alto',
      descripcion: 'Repetí lo que dijeron, pero con tus palabras.',
      comoUsarla: 'Cliente: "Estoy frustrado con mi sistema actual." Vos: "Entiendo, sentís que tu sistema actual no te está dando los resultados que necesitás." Eso le muestra que lo escuchaste y lo entendiste.',
      cuando: 'Después de que compartan algo importante',
      resultado: 'Confianza inmediata porque se sienten comprendidos',
      icono: <Heart className="w-8 h-8" />,
      color: 'from-pink-600 to-red-600',
      efectividad: 92
    },
    {
      id: 8,
      nombre: 'Cuestionador Socrático',
      categoria: 'Arma Filosófica',
      poder: 'Máximo',
      descripcion: 'Hacelo dudar de sus creencias, sin confrontar.',
      comoUsarla: 'No corrijas directamente. Hacé preguntas que lo hagan pensar. Cliente: "Esto es muy caro." Vos: "¿Comparado con qué?" o "¿Cuánto te está costando NO tener esto resuelto?"',
      cuando: 'Cuando tienen creencias limitantes u objeciones',
      resultado: 'Ellos mismos descubren su error',
      icono: <Brain className="w-8 h-8" />,
      color: 'from-indigo-600 to-purple-600',
      efectividad: 93
    },
    {
      id: 9,
      nombre: 'Diagnóstico Médico',
      categoria: 'Arma Profesional',
      poder: 'Alto',
      descripcion: 'Primero revisa, después decide el tratamiento.',
      comoUsarla: 'Tu tarea no es venderle a todos. Es entender si realmente podés ayudar. "Dejame entender tu situación primero..." Como médico: diagnosticar antes de prescribir.',
      cuando: 'En la fase de descubrimiento completa',
      resultado: 'Posicionamiento de experto autoridad',
      icono: <Activity className="w-8 h-8" />,
      color: 'from-cyan-600 to-blue-600',
      efectividad: 87
    },
    {
      id: 10,
      nombre: 'Minimalismo Verbal',
      categoria: 'Arma de Escucha',
      poder: 'Medio-Alto',
      descripcion: 'Respondé solo "OK". Dejá que hablen.',
      comoUsarla: 'Cuando te dicen algo, no analices ni opines. Decí: "OK" o "Ajá" y esperá. Eso hace que sigan hablando. Cuanto más hablás vos, menos escuchás lo que necesitan.',
      cuando: 'Durante descubrimiento y diagnóstico',
      resultado: 'Obtenes información valiosa que no buscarías',
      icono: <MessageCircle className="w-8 h-8" />,
      color: 'from-teal-600 to-green-600',
      efectividad: 80
    },
    {
      id: 11,
      nombre: 'Solo Audio',
      categoria: 'Arma Técnica',
      poder: 'Medio',
      descripcion: 'Llamada de voz > Videollamada. Sin distracciones visuales.',
      comoUsarla: 'Mejor una llamada que video. Sin caras, sin fondos, sin distracciones. Solo voz. Eso te obliga a escuchar mejor y estar más presente.',
      cuando: 'Preferir siempre audio para ventas importantes',
      resultado: 'Mayor enfoque y concentración mutua',
      icono: <Radio className="w-8 h-8" />,
      color: 'from-slate-600 to-gray-700',
      efectividad: 65
    }
  ];

  const escenariosCombate = [
    {
      id: 1,
      situacion: 'El prospecto dice: "Está muy caro"',
      contexto: 'Acabás de dar el precio. Hay un silencio incómodo.',
      opciones: [
        {
          id: 'A',
          arma: 'Contagio de Seguridad',
          respuesta: '"Entiendo que puede parecer una inversión. Y justamente por eso trabajamos solo con personas que entienden el valor."',
          correcta: false,
          feedback: '❌ Suena defensivo. Perdiste el control del frame.'
        },
        {
          id: 'B',
          arma: 'Cuestionador Socrático',
          respuesta: '"¿Caro comparado con qué?" [SILENCIO]',
          correcta: true,
          feedback: '✅ PERFECTO. Reencuadraste y usaste silencio. Ahora ellos tienen que justificar su objeción.'
        },
        {
          id: 'C',
          arma: 'Amplificar el Dolor',
          respuesta: '"Sí, pero pensá cuánto te está costando NO tener esto resuelto cada mes que pasa."',
          correcta: false,
          feedback: '⚠️ Funciona, pero es agresivo. Mejor hacer la pregunta y dejar que ellos lleguen a esa conclusión.'
        }
      ]
    },
    {
      id: 2,
      situacion: 'El prospecto empieza a hablar del partido de fútbol',
      contexto: 'Están en medio de la fase de descubrimiento.',
      opciones: [
        {
          id: 'A',
          arma: 'Láser de Enfoque',
          respuesta: '"Ajá... Bueno, volviendo a tu negocio, me contabas que..."',
          correcta: true,
          feedback: '✅ CORRECTO. Redirigiste con suavidad pero firmeza. Mantenés el control.'
        },
        {
          id: 'B',
          arma: 'Espejo Empático',
          respuesta: '"¡Sí! ¿Viste el golazo? Increíble..." [5 minutos de fútbol]',
          correcta: false,
          feedback: '❌ Perdiste 5 minutos y el momentum. El foco se fue.'
        },
        {
          id: 'C',
          arma: 'Cero Juicios',
          respuesta: '"No sigo fútbol. Sigamos con tu situación..."',
          correcta: false,
          feedback: '❌ Demasiado seco. Podías ser más diplomático.'
        }
      ]
    },
    {
      id: 3,
      situacion: 'El prospecto comparte una frustración profunda',
      contexto: '"Estoy cansado de que nada funcione. Ya probé todo."',
      opciones: [
        {
          id: 'A',
          arma: 'Espejo Empático',
          respuesta: '"Sentís que ya probaste todo y nada te dio los resultados que esperabas." [SILENCIO]',
          correcta: true,
          feedback: '✅ EXCELENTE. Validaste sin minimizar. Ahora van a profundizar más.'
        },
        {
          id: 'B',
          arma: 'Contagio de Seguridad',
          respuesta: '"No te preocupes, esto es diferente. Te voy a mostrar cómo..."',
          correcta: false,
          feedback: '❌ Invalidaste su emoción. Ahora están a la defensiva.'
        },
        {
          id: 'C',
          arma: 'Cuestionador Socrático',
          respuesta: '"¿Qué probaste exactamente?"',
          correcta: false,
          feedback: '⚠️ No es mal camino, pero primero tenías que validar la emoción.'
        }
      ]
    }
  ];

  const erroresFatales = [
    {
      error: 'Hablar demasiado',
      consecuencia: 'Pierden interés y no revelás necesidades reales',
      porcentaje: 70,
      solucion: 'Regla 33/67: Vos hablás 33%, ellos 67%',
      color: 'from-red-600 to-red-800'
    },
    {
      error: 'Justificar el precio inmediatamente',
      consecuencia: 'Demuestras inseguridad y pierdes poder',
      porcentaje: 65,
      solucion: 'Usa silencio o pregunta "¿Por qué decís eso?"',
      color: 'from-orange-600 to-red-600'
    },
    {
      error: 'No calificar antes de presentar',
      consecuencia: 'Perdés tiempo con personas que no son fit',
      porcentaje: 60,
      solucion: 'Diagnóstico Médico: revisa antes de prescribir',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      error: 'Ser amigo en lugar de profesional',
      consecuencia: 'No te toman en serio, dificulta el cierre',
      porcentaje: 55,
      solucion: 'Amable sí, amigo no. Láser de Enfoque',
      color: 'from-green-600 to-yellow-600'
    },
    {
      error: 'Asumir que no pueden pagar',
      consecuencia: 'Tu energía cambia y ellos lo sienten',
      porcentaje: 50,
      solucion: 'Cero Juicios desde el inicio',
      color: 'from-blue-600 to-green-600'
    }
  ];

  const toggleArma = (id: number) => {
    if (armasEquipadas.includes(id)) {
      setArmasEquipadas(armasEquipadas.filter(a => a !== id));
    } else {
      setArmasEquipadas([...armasEquipadas, id]);
    }
  };

  const arsenalScore = armasEquipadas.length;
  const arsenalPercentage = (arsenalScore / 11) * 100;

  const handleSimuladorSelect = (escenarioId: number, opcionId: string) => {
    setRespuestaSimulador(opcionId);
    setShowFeedbackSimulador(true);
  };

  const resetSimulador = () => {
    setRespuestaSimulador(null);
    setShowFeedbackSimulador(false);
    setSimuladorActivo(null);
  };

  return (
    <div className="space-y-8">
      {/* Hero Militar */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black via-slate-900 to-red-900 p-12 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
          }} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-red-300">
              Capítulo 3 · Módulo 5
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sword className="w-20 h-20 text-red-500" />
              <div className="absolute inset-0 animate-pulse">
                <Sword className="w-20 h-20 text-red-500 opacity-30" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-red-400 via-orange-300 to-red-200 bg-clip-text text-transparent">
            ⚔️ MANUAL DE GUERRA
          </h1>
          <h2 className="text-4xl font-bold text-center mb-4 text-red-100">
            DEL VENDEDOR
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-xl text-red-200">
              Imaginá entrar a cada llamada como si fueras un guerrero entrenado.
            </p>
            <p className="text-xl text-red-200">
              No con fuerza bruta. Con precisión.
            </p>
            <p className="text-xl text-red-200">
              Con armas psicológicas afiladas como cuchillas.
            </p>
            <div className="my-6 h-1 w-64 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full" />
            <p className="text-2xl text-white font-black">
              Este no es un guión.
            </p>
            <p className="text-2xl text-white font-black">
              Este no es un esquema de objeciones.
            </p>
            <p className="text-3xl text-red-400 font-black mt-4">
              Esto es un arsenal de destrucción masiva...
            </p>
            <p className="text-xl text-slate-300">
              de creencias limitantes, de excusas y de silencios incómodos.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-red-500/20 rounded-full blur-3xl" />
      </div>

      {/* El Arsenal Completo */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 border-2 border-slate-400 shadow-xl">
        <div className="text-center mb-6">
          <Shield className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🛡️ Tu Arsenal Personal
          </h2>
          <p className="text-lg text-slate-600">
            11 armas psicológicas. Hacé click para equipar cada una.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Estado de Arsenal</p>
              <p className="text-3xl font-black text-slate-900">{arsenalScore}/11 Armas</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Nivel de Preparación</p>
              <div className="flex items-center gap-2">
                <Gauge className="w-8 h-8 text-red-600" />
                <p className="text-3xl font-black text-red-600">{Math.round(arsenalPercentage)}%</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-300 rounded-full h-6 overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-700 ${
                arsenalPercentage === 100 
                  ? 'bg-gradient-to-r from-red-600 via-orange-600 to-red-600' 
                  : 'bg-gradient-to-r from-slate-500 to-slate-700'
              }`}
              style={{ width: `${arsenalPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {arsenal.map((arma) => (
            <button
              key={arma.id}
              onClick={() => toggleArma(arma.id)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                armasEquipadas.includes(arma.id)
                  ? `bg-gradient-to-r ${arma.color} text-white border-transparent shadow-lg transform scale-105`
                  : 'bg-white border-slate-300 hover:border-slate-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${
                    armasEquipadas.includes(arma.id) ? 'bg-white/20' : 'bg-slate-100'
                  }`}>
                    <div className={armasEquipadas.includes(arma.id) ? 'text-white' : 'text-slate-600'}>
                      {arma.icono}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-xs font-bold uppercase tracking-wider ${
                        armasEquipadas.includes(arma.id) ? 'text-white/70' : 'text-slate-500'
                      }`}>
                        {arma.categoria}
                      </p>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        armasEquipadas.includes(arma.id) 
                          ? 'bg-white/20 text-white' 
                          : arma.poder === 'Máximo' || arma.poder === 'Extremo'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {arma.poder}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      armasEquipadas.includes(arma.id) ? 'text-white' : 'text-slate-900'
                    }`}>
                      {arma.nombre}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      armasEquipadas.includes(arma.id) ? 'text-white/90' : 'text-slate-700'
                    }`}>
                      {arma.descripcion}
                    </p>
                    
                    {armasEquipadas.includes(arma.id) && (
                      <div className="space-y-2 mt-4">
                        <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                          <p className="text-xs font-bold text-white/80 mb-1">🎯 Cómo usarla:</p>
                          <p className="text-sm text-white">{arma.comoUsarla}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                          <p className="text-xs font-bold text-white/80 mb-1">⏰ Cuándo:</p>
                          <p className="text-sm text-white">{arma.cuando}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                          <p className="text-xs font-bold text-white/80 mb-1">✅ Resultado:</p>
                          <p className="text-sm text-white">{arma.resultado}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex-1 bg-white/30 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full bg-white"
                              style={{ width: `${arma.efectividad}%` }}
                            />
                          </div>
                          <p className="text-sm font-bold text-white">{arma.efectividad}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {armasEquipadas.includes(arma.id) ? (
                    <Unlock className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-slate-400" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {arsenalScore === 11 && (
          <div className="mt-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 p-8 rounded-xl text-white text-center shadow-2xl">
            <Sword className="w-20 h-20 mx-auto mb-4" />
            <p className="text-4xl font-black mb-2">⚔️ ARSENAL COMPLETO</p>
            <p className="text-2xl font-bold">Sos un guerrero completamente armado</p>
            <p className="text-lg mt-3 text-red-100">
              Ahora llevá estas armas al campo de batalla y dominá cada conversación.
            </p>
          </div>
        )}
      </div>

      {/* Simulador de Combate */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-300 shadow-xl">
        <div className="text-center mb-6">
          <Crosshair className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎯 Campo de Batalla
          </h2>
          <p className="text-lg text-slate-600">
            Escenarios reales. Elegí tu arma y respondé.
          </p>
        </div>

        <div className="space-y-6">
          {escenariosCombate.map((escenario) => (
            <div key={escenario.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
              <div className="bg-slate-900 p-5 rounded-lg mb-4">
                <p className="text-sm font-bold text-red-400 mb-2">⚔️ SITUACIÓN DE COMBATE #{escenario.id}</p>
                <p className="text-xl font-bold text-white mb-3">"{escenario.situacion}"</p>
                <p className="text-sm text-slate-300">{escenario.contexto}</p>
              </div>

              {(!showFeedbackSimulador || simuladorActivo !== escenario.id) ? (
                <div className="space-y-3">
                  <p className="font-bold text-slate-700 mb-3">¿Qué arma usás y cómo respondés?</p>
                  {escenario.opciones.map((opcion) => (
                    <button
                      key={opcion.id}
                      onClick={() => {
                        setSimuladorActivo(escenario.id);
                        handleSimuladorSelect(escenario.id, opcion.id);
                      }}
                      className="w-full p-5 text-left rounded-xl border-2 border-slate-300 bg-white hover:border-orange-400 hover:bg-orange-50 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-slate-200 text-slate-700 group-hover:bg-orange-500 group-hover:text-white transition-all">
                          {opcion.id}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-orange-600 mb-1">🛡️ {opcion.arma}</p>
                          <p className="font-medium text-slate-900 italic">"{opcion.respuesta}"</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                simuladorActivo === escenario.id && (
                  <div className="space-y-4">
                    {escenario.opciones.map((opcion) => (
                      respuestaSimulador === opcion.id && (
                        <div key={opcion.id} className={`p-6 rounded-xl ${
                          opcion.correcta ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                        }`}>
                          <div className="flex items-start gap-3">
                            {opcion.correcta ? (
                              <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-10 h-10 text-red-600 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-bold text-slate-600 mb-1">🛡️ Arma: {opcion.arma}</p>
                              <p className="font-bold text-lg text-slate-900 mb-2 italic">
                                "{opcion.respuesta}"
                              </p>
                              <p className={`text-lg font-bold ${opcion.correcta ? 'text-green-900' : 'text-red-900'}`}>
                                {opcion.feedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    <button
                      onClick={resetSimulador}
                      className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all"
                    >
                      Siguiente Batalla
                    </button>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Errores Fatales */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-300 shadow-xl">
        <div className="text-center mb-6">
          <Skull className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            ☠️ Errores Fatales
          </h2>
          <p className="text-lg text-slate-600">
            Los 5 errores que matan el 90% de las ventas
          </p>
        </div>

        <div className="space-y-4">
          {erroresFatales.map((errorObj, idx) => (
            <div key={idx} className={`bg-gradient-to-r ${errorObj.color} rounded-xl p-6 text-white shadow-lg`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-white/20 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center">
                  <p className="text-2xl font-black">{idx + 1}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{errorObj.error}</h3>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4 mb-3">
                    <p className="text-sm font-bold mb-1">⚠️ Consecuencia:</p>
                    <p className="text-white">{errorObj.consecuencia}</p>
                  </div>
                  <div className="bg-white/30 backdrop-blur rounded-lg p-4 mb-3">
                    <p className="text-sm font-bold mb-1">✅ Solución:</p>
                    <p className="text-white font-bold">{errorObj.solucion}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold">Cometen este error:</p>
                    <div className="flex-1 bg-white/30 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-white"
                        style={{ width: `${errorObj.porcentaje}%` }}
                      />
                    </div>
                    <p className="text-lg font-black">{errorObj.porcentaje}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-900 p-6 rounded-xl text-white text-center">
          <p className="text-xl font-bold">
            💀 Si evitás estos 5 errores, ya estás en el top 10% de vendedores.
          </p>
        </div>
      </div>

      {/* BONUS OCULTO */}
      <div className="bg-gradient-to-br from-slate-900 to-red-900 rounded-2xl p-8 text-white border-2 border-red-500 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-red-200 text-center mb-6">
          Preparación mental de guerrero
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-red-200 leading-relaxed">
            🧠 Actuá como un mentor de ventas con experiencia real. Imaginá que estoy por hacer mis primeras llamadas. Quiero que me prepares mentalmente para empezar con el pie derecho: decime qué errores mentales comete la mayoría al principio, qué hábitos debo evitar desde ya, y cómo puedo desarrollar una mentalidad firme, segura y enfocada para liderar cada conversación. Sé directo. Dame claridad. Quiero empezar fuerte y sin miedos.
          </p>
        </div>
      </div>

      {/* Cierre Épico */}
      <div className="bg-gradient-to-r from-black via-red-900 to-black rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
          }} />
        </div>
        <div className="relative z-10">
          <Sword className="w-24 h-24 mx-auto text-red-500 mb-6" />
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-red-400 via-orange-300 to-red-200 bg-clip-text text-transparent">
            ⚔️ VENDÉ COMO UN PROFESIONAL
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-white">
              Este arsenal no es para memorizar.
            </p>
            <p className="text-2xl font-bold text-red-300">
              Es para internalizar.
            </p>
            <div className="my-8 h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full" />
            <p className="text-xl text-slate-200">
              Cada herramienta es una extensión tuya.
            </p>
            <p className="text-xl text-slate-200">
              Te da autoridad, te da claridad...
            </p>
            <p className="text-2xl text-white font-bold">
              Y lo más importante: te da el poder de ayudar desde el respeto y el liderazgo.
            </p>
            <div className="my-8" />
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 rounded-2xl mt-8 inline-block shadow-2xl">
              <p className="text-3xl font-black text-white mb-3">
                Si dominás esto, no solo vendés más.
              </p>
              <p className="text-2xl font-bold text-white">
                Te convertís en un vendedor imparable,<br/>
                un comunicador magnético...<br/>
                y un agente real de cambio.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/30 to-red-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const manualGuerraMetadata = {
  id: 5,
  title: "El Manual de Guerra del Vendedor",
  type: "document" as const,
  duration: "50 min"
};