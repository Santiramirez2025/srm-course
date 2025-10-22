import React, { useState, useEffect } from 'react';
import { 
  Phone, Shield, Heart, Brain, Target, Sparkles, Clock, 
  TrendingUp, Award, Eye, Mic, Volume2, Zap, CheckCircle,
  AlertTriangle, ArrowRight, DollarSign, BarChart3, Users,
  Compass, Radio, Headphones, Star, Diamond, Crown, Flame
} from 'lucide-react';

export const CerrarPoderEmpatiaContent = () => {
  const [ritualChecks, setRitualChecks] = useState<boolean[]>(new Array(6).fill(false));
  const [radarEmocional, setRadarEmocional] = useState<string>('');
  const [brechaData, setBrechaData] = useState({ actual: '', deseado: '' });
  const [preguntaActiva, setPreguntaActiva] = useState<number | null>(null);
  const [silencioActivo, setSilencioActivo] = useState(false);
  const [silencioSegundos, setSilencioSegundos] = useState(0);
  const [estiloPersonal, setEstiloPersonal] = useState<string[]>([]);

  const ritualProfesional = [
    { 
      item: 'Número del prospecto listo y verificado',
      categoria: 'Preparación Técnica',
      icono: <Phone className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      item: 'Ambiente tranquilo, sin distracciones',
      categoria: 'Entorno',
      icono: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      item: 'Mentalidad de médico: diagnosticar primero',
      categoria: 'Mindset',
      icono: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      item: 'Notas del prospecto a la vista',
      categoria: 'Información',
      icono: <Target className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    { 
      item: 'Auriculares puestos, grabadora lista',
      categoria: 'Equipamiento',
      icono: <Headphones className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      item: 'Energía enfocada, presencia total',
      categoria: 'Estado Interior',
      icono: <Flame className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const fasesLlamada = [
    {
      id: 1,
      fase: 'Conexión Ligera',
      descripcion: 'Sonreí. Preguntá cómo va su semana. Creá calidez humana.',
      duracion: '1 min',
      objetivo: 'Rapport + Liderazgo firme pero suave',
      script: '"Te voy a hacer unas preguntas para entender tu negocio. Si veo que hay buen encaje, te explico cómo trabajamos. Luego decidís si seguimos."',
      clave: 'Autoridad sin agresión. Guía sin presión.',
      color: 'from-blue-500 to-cyan-500',
      icono: <Heart className="w-8 h-8" />
    },
    {
      id: 2,
      fase: 'Detectar la Chispa',
      descripcion: 'Preguntá qué los motivó a agendar esta llamada.',
      duracion: '3-4 min',
      objetivo: 'Encontrar la urgencia emocional real',
      script: '"¿Qué te motivó a buscar ayuda ahora?" → "¿Por qué creés que pasa eso?" → "¿Desde cuándo lo vivís así?"',
      clave: 'Ese momento es oro puro. Ahí aparecen deseos ocultos y frustraciones reales.',
      color: 'from-orange-500 to-red-500',
      icono: <Zap className="w-8 h-8" />
    },
    {
      id: 3,
      fase: 'Mapear su Negocio',
      descripcion: 'Datos duros, pero con alma.',
      duracion: '4-5 min',
      objetivo: 'Armar el rompecabezas completo',
      script: '"¿Qué vendés? ¿Cómo cobrás? ¿Quién es tu cliente ideal? ¿Qué problema resolvés? ¿Cómo transformás leads en ventas?"',
      clave: 'Cada respuesta es una pieza. Necesitás el mapa antes de ofrecer la solución.',
      color: 'from-purple-500 to-pink-500',
      icono: <Compass className="w-8 h-8" />
    },
    {
      id: 4,
      fase: 'Mostrar la Brecha',
      descripcion: 'Preguntas que duelen... pero curan.',
      duracion: '3-4 min',
      objetivo: 'Que vean con números la distancia entre hoy y su meta',
      script: '"¿Cómo conseguís clientes hoy?" → "¿Tenés un sistema predecible?" → "¿Cuánto facturás al mes?"',
      clave: 'Esa es la brecha. Y vos sos el puente.',
      color: 'from-red-500 to-pink-500',
      icono: <BarChart3 className="w-8 h-8" />
    },
    {
      id: 5,
      fase: 'Futuro Deseado',
      descripcion: 'Los llevás al futuro con los pies en la tierra.',
      duracion: '2-3 min',
      objetivo: 'Crear una visión concreta, emocional y posible',
      script: '"¿Cuánto te gustaría facturar en 12 meses?" → "¿Por qué ese número?" → "¿Qué cambiaría en tu vida si lo lográs?"',
      clave: 'No es motivación vacía. Es visualización real.',
      color: 'from-green-500 to-emerald-500',
      icono: <TrendingUp className="w-8 h-8" />
    },
    {
      id: 6,
      fase: 'No Se Puede Solo',
      descripcion: 'Que reconozcan que necesitan ayuda.',
      duracion: '1-2 min',
      objetivo: 'Quiebre del ego',
      script: '"¿Qué te impide lograrlo por tu cuenta?"',
      clave: 'La mayoría dirá: No sé cómo, me falta velocidad, o necesito un mentor.',
      color: 'from-indigo-500 to-purple-500',
      icono: <Users className="w-8 h-8" />
    },
    {
      id: 7,
      fase: 'Tocar la Emoción',
      descripcion: 'Vas más profundo. Esta parte es poderosa.',
      duracion: '3-5 min',
      objetivo: 'Activar el motor emocional del cambio',
      script: '"¿Por qué no seguir igual?" → "¿Cómo te afecta esto en tu día a día?" → "¿Qué tan listo estás para cambiarlo ahora?"',
      clave: 'Algunos se emocionan. Otros se quiebran. Vos tenés que estar ahí: presente, empático, firme.',
      color: 'from-red-600 to-orange-600',
      icono: <Heart className="w-8 h-8" />
    },
    {
      id: 8,
      fase: 'Afirmar y Pedir Permiso',
      descripcion: 'Confianza absoluta.',
      duracion: '30 seg',
      objetivo: 'Cambiar de diagnóstico a solución',
      script: '"Estoy completamente seguro de que podemos ayudarte. ¿Querés que te cuente cómo?"',
      clave: 'Ellos van a decir que sí. Ese "sí" lo cambia todo.',
      color: 'from-cyan-500 to-blue-500',
      icono: <CheckCircle className="w-8 h-8" />
    },
    {
      id: 9,
      fase: 'Despertar Curiosidad',
      descripcion: 'Beneficios, no detalles técnicos.',
      duracion: '2-3 min',
      objetivo: 'Crear deseo sin revelar todo',
      script: '"Nuestro programa te lleva paso a paso desde donde estás, hasta tener un sistema de ventas funcionando con estabilidad y resultados."',
      clave: 'Nada de precio todavía. Dejá que la curiosidad trabaje a tu favor.',
      color: 'from-purple-500 to-pink-500',
      icono: <Eye className="w-8 h-8" />
    },
    {
      id: 10,
      fase: 'El Precio con Poder',
      descripcion: 'Incentivo + Silencio absoluto.',
      duracion: '30 seg + silencio',
      objetivo: 'Cerrar con elegancia y poder',
      script: '"El programa cuesta $1.500 al mes más una tarifa de configuración de $2.000. Pero si decidís avanzar hoy, eliminamos esa tarifa. Solo $1.500 mensuales." [SILENCIO]',
      clave: 'El silencio no es tensión. Es poder.',
      color: 'from-amber-500 to-yellow-500',
      icono: <DollarSign className="w-8 h-8" />
    }
  ];

  const preguntasProfundas = [
    {
      id: 1,
      momento: 'Cuando dicen "no tengo tiempo"',
      pregunta: '¿Qué pasaría si dentro de 6 meses seguís sin tener tiempo?',
      porque: 'Los llevás al futuro doloroso. La urgencia aparece.',
      nivel: 'Profundo'
    },
    {
      id: 2,
      momento: 'Cuando dicen "está caro"',
      pregunta: '¿Cuánto te está costando NO tener esto resuelto?',
      porque: 'Reencuadrás el precio como inversión vs. costo de oportunidad.',
      nivel: 'Profundo'
    },
    {
      id: 3,
      momento: 'Cuando dudan',
      pregunta: '¿Qué parte de vos ya sabe que esto es lo correcto?',
      porque: 'Conectás con su intuición, no con su miedo.',
      nivel: 'Muy Profundo'
    },
    {
      id: 4,
      momento: 'Al mapear su negocio',
      pregunta: '¿Cómo te sentís cuando un mes no alcanzás tus metas?',
      porque: 'Tocás la frustración emocional, no solo los números.',
      nivel: 'Emocional'
    },
    {
      id: 5,
      momento: 'Al visualizar el futuro',
      pregunta: '¿Cómo cambiaría tu relación con tu familia si lográs esto?',
      porque: 'Conectás el resultado con lo que realmente importa.',
      nivel: 'Muy Profundo'
    }
  ];

  const estilosPersonales = [
    {
      estilo: 'El Consejero',
      caracteristicas: ['Empático', 'Paciente', 'Escucha profunda', 'Tono cálido'],
      fortaleza: 'Conexión emocional natural',
      trabajar: 'Ser más directo al cerrar',
      color: 'from-green-500 to-emerald-500'
    },
    {
      estilo: 'El Estratega',
      caracteristicas: ['Analítico', 'Lógico', 'Datos y números', 'Estructurado'],
      fortaleza: 'Credibilidad técnica',
      trabajar: 'Añadir más calidez humana',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      estilo: 'El Entusiasta',
      caracteristicas: ['Energético', 'Motivador', 'Carismático', 'Inspirador'],
      fortaleza: 'Crea momentum emocional',
      trabajar: 'Escuchar más, hablar menos',
      color: 'from-orange-500 to-red-500'
    },
    {
      estilo: 'El Consultor',
      caracteristicas: ['Profesional', 'Autoridad', 'Directo', 'Confiable'],
      fortaleza: 'Posicionamiento de experto',
      trabajar: 'Mostrar más vulnerabilidad',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const toggleRitualCheck = (index: number) => {
    const newChecks = [...ritualChecks];
    newChecks[index] = !newChecks[index];
    setRitualChecks(newChecks);
  };

  const ritualScore = ritualChecks.filter(c => c).length;
  const ritualPercentage = (ritualScore / 6) * 100;

  const calcularBrecha = () => {
    if (!brechaData.actual || !brechaData.deseado) return null;
    const actual = parseFloat(brechaData.actual.replace(/[^0-9.-]+/g, ''));
    const deseado = parseFloat(brechaData.deseado.replace(/[^0-9.-]+/g, ''));
    if (isNaN(actual) || isNaN(deseado)) return null;
    
    const gap = deseado - actual;
    const multiplicador = deseado / actual;
    return { gap, multiplicador, actual, deseado };
  };

  const brecha = calcularBrecha();

  const iniciarSilencio = () => {
    setSilencioActivo(true);
    setSilencioSegundos(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (silencioActivo && silencioSegundos < 15) {
      interval = setInterval(() => {
        setSilencioSegundos(prev => prev + 1);
      }, 1000);
    } else if (silencioSegundos >= 15) {
      setSilencioActivo(false);
    }
    return () => clearInterval(interval);
  }, [silencioActivo, silencioSegundos]);

  const toggleEstiloPersonal = (estilo: string) => {
    if (estiloPersonal.includes(estilo)) {
      setEstiloPersonal(estiloPersonal.filter(e => e !== estilo));
    } else {
      setEstiloPersonal([...estiloPersonal, estilo]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Premium */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black via-slate-900 to-amber-900 p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Capítulo 3 · Módulo 4
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Crown className="w-20 h-20 text-amber-400" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Crown className="w-20 h-20 text-amber-400" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-100 bg-clip-text text-transparent">
            CERRAR CON PODER
          </h1>
          <h2 className="text-4xl font-bold text-center mb-4 text-amber-100">
            Y EMPATÍA
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-xl text-amber-200">
              Un mapa psicológico, estratégico y emocionalmente inteligente
            </p>
            <p className="text-xl text-amber-200">
              para cerrar ventas de alto valor en una sola llamada.
            </p>
            <div className="my-6 h-1 w-64 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full" />
            <p className="text-2xl text-white font-bold">
              Tan preciso como un cirujano.
            </p>
            <p className="text-2xl text-white font-bold">
              Tan empático como un terapeuta.
            </p>
            <p className="text-2xl text-white font-bold">
              Tan confiable como un piloto comercial.
            </p>
            <p className="text-xl text-amber-300 font-bold mt-6">
              Y si lo dominás, no solo vas a cerrar tratos... vas a cambiar vidas.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl" />
      </div>

      {/* Ritual Profesional Pre-Llamada */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border-2 border-slate-300 shadow-xl">
        <div className="text-center mb-6">
          <Diamond className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎯 Ritual Profesional Pre-Llamada
          </h2>
          <p className="text-lg text-slate-600">
            La venta empieza antes de marcar. Preparate como un profesional de élite.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-slate-700 text-lg">Estado de Preparación:</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-black text-slate-900">{ritualScore}/6</p>
                {ritualScore === 6 && <Star className="w-8 h-8 text-amber-500" />}
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-5 overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-700 ${
                  ritualPercentage === 100 
                    ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500' 
                    : 'bg-gradient-to-r from-slate-400 to-slate-600'
                }`}
                style={{ width: `${ritualPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {ritualProfesional.map((ritual, idx) => (
              <label 
                key={idx}
                className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  ritualChecks[idx]
                    ? `bg-gradient-to-r ${ritual.color} text-white border-transparent shadow-lg`
                    : 'bg-white border-slate-300 hover:border-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={ritualChecks[idx]}
                  onChange={() => toggleRitualCheck(idx)}
                  className="mt-1 w-6 h-6 rounded focus:ring-2 focus:ring-amber-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={ritualChecks[idx] ? 'text-white' : 'text-slate-600'}>
                      {ritual.icono}
                    </div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${
                      ritualChecks[idx] ? 'text-white/80' : 'text-slate-500'
                    }`}>
                      {ritual.categoria}
                    </p>
                  </div>
                  <p className={`font-medium ${ritualChecks[idx] ? 'text-white' : 'text-slate-900'}`}>
                    {ritual.item}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {ritualScore === 6 && (
            <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 p-8 rounded-xl text-white text-center shadow-2xl">
              <Crown className="w-16 h-16 mx-auto mb-4" />
              <p className="text-3xl font-black mb-2">¡PROFESIONAL DE ÉLITE!</p>
              <p className="text-xl">Estás listo para cerrar ventas de alto valor. Las ventas grandes no perdonan la mediocridad.</p>
            </div>
          )}

          {ritualScore < 6 && ritualScore > 0 && (
            <div className="bg-slate-100 p-6 rounded-xl border-2 border-slate-300 text-center">
              <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="font-bold text-slate-900 text-lg">Te faltan {6 - ritualScore} elementos</p>
              <p className="text-slate-700">Completá el ritual antes de llamar a un prospecto de alto valor.</p>
            </div>
          )}
        </div>
      </div>

      {/* Las 10 Fases de la Llamada */}
      <div className="bg-white rounded-2xl p-8 border-2 border-amber-200 shadow-xl">
        <div className="text-center mb-8">
          <Radio className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📡 Las 10 Fases de la Llamada Premium
          </h2>
          <p className="text-lg text-slate-600">
            El mapa completo para ventas de alto valor
          </p>
        </div>

        <div className="space-y-4">
          {fasesLlamada.map((fase) => (
            <div key={fase.id} className="bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <button
                onClick={() => setPreguntaActiva(preguntaActiva === fase.id ? null : fase.id)}
                className={`w-full p-6 flex items-center justify-between transition-all ${
                  preguntaActiva === fase.id ? `bg-gradient-to-r ${fase.color} text-white` : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl ${
                    preguntaActiva === fase.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {fase.icono}
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                      preguntaActiva === fase.id ? 'text-white/80' : 'text-slate-500'
                    }`}>
                      {fase.duracion} · Fase {fase.id} de 10
                    </p>
                    <h3 className={`text-2xl font-bold ${
                      preguntaActiva === fase.id ? 'text-white' : 'text-slate-900'
                    }`}>
                      {fase.fase}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      preguntaActiva === fase.id ? 'text-white/90' : 'text-slate-600'
                    }`}>
                      {fase.descripcion}
                    </p>
                  </div>
                </div>
                <ArrowRight className={`w-6 h-6 transition-transform ${
                  preguntaActiva === fase.id ? 'rotate-90 text-white' : 'text-slate-400'
                }`} />
              </button>

              {preguntaActiva === fase.id && (
                <div className="p-6 bg-white border-t-2 border-slate-200">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                      <p className="font-bold text-blue-900 mb-2">🎯 Objetivo:</p>
                      <p className="text-slate-800 text-lg">{fase.objetivo}</p>
                    </div>

                    <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                      <p className="font-bold text-purple-900 mb-3">💬 Script:</p>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-slate-800 italic leading-relaxed">{fase.script}</p>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-500">
                      <p className="font-bold text-amber-900 mb-2">🔑 Clave de Oro:</p>
                      <p className="text-slate-800 font-medium">{fase.clave}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Calculadora de Brecha */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-xl">
        <div className="text-center mb-6">
          <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📊 Calculadora de Brecha
          </h2>
          <p className="text-lg text-slate-600">
            Mostrá con números la distancia entre hoy y el futuro deseado
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-bold text-slate-900 mb-2">
                💰 Facturación Actual (mensual)
              </label>
              <input
                type="text"
                placeholder="Ej: $5000"
                value={brechaData.actual}
                onChange={(e) => setBrechaData({...brechaData, actual: e.target.value})}
                className="w-full p-4 border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-900 mb-2">
                🎯 Facturación Deseada (mensual)
              </label>
              <input
                type="text"
                placeholder="Ej: $20000"
                value={brechaData.deseado}
                onChange={(e) => setBrechaData({...brechaData, deseado: e.target.value})}
                className="w-full p-4 border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg"
              />
            </div>
          </div>

          {brecha && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl text-white text-center shadow-lg">
                <p className="text-sm font-bold uppercase tracking-wider mb-2 text-indigo-200">La Brecha</p>
                <p className="text-6xl font-black mb-2">${brecha.gap.toLocaleString()}</p>
                <p className="text-xl">de diferencia por mes</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-300">
                  <p className="font-bold text-orange-900 mb-2">📈 Crecimiento necesario:</p>
                  <p className="text-4xl font-black text-slate-900">{brecha.multiplicador.toFixed(1)}x</p>
                  <p className="text-slate-700 mt-2">Tu facturación actual</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
                  <p className="font-bold text-green-900 mb-2">💰 En 12 meses serían:</p>
                  <p className="text-4xl font-black text-slate-900">${(brecha.gap * 12).toLocaleString()}</p>
                  <p className="text-slate-700 mt-2">De diferencia anual</p>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-xl text-white text-center">
                <p className="text-xl font-bold">
                  🔑 "Esa es la brecha. Y vos sos el puente."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preguntas Profundas */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200 shadow-xl">
        <div className="text-center mb-6">
          <Brain className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🧠 Preguntas que Transforman
          </h2>
          <p className="text-lg text-slate-600">
            Cuando vas más profundo, tocás la emoción que impulsa el cambio
          </p>
        </div>

        <div className="space-y-4">
          {preguntasProfundas.map((p) => (
            <div key={p.id} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-red-400 transition-all">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 px-4 py-2 rounded-lg font-bold text-sm ${
                  p.nivel === 'Muy Profundo' 
                    ? 'bg-red-600 text-white'
                    : p.nivel === 'Profundo'
                    ? 'bg-orange-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}>
                  {p.nivel}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-600 mb-2">📍 {p.momento}</p>
                  <div className="bg-red-50 p-4 rounded-lg mb-3 border-l-4 border-red-500">
                    <p className="text-lg font-bold text-slate-900 italic">"{p.pregunta}"</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-bold text-green-900 mb-1">💡 Por qué funciona:</p>
                    <p className="text-slate-800">{p.porque}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-900 p-6 rounded-xl text-white text-center">
          <p className="text-xl font-bold mb-2">
            ⚠️ Con gran poder viene gran responsabilidad
          </p>
          <p className="text-slate-300">
            Estas preguntas son poderosas. Usálas solo cuando realmente podés ayudar. No estás vendiendo. Estás ayudando a tomar una decisión que cambia vidas.
          </p>
        </div>
      </div>

      {/* El Silencio de Poder 2.0 */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-900 to-black rounded-2xl p-8 border-2 border-amber-500 shadow-2xl">
        <div className="text-center mb-6">
          <Volume2 className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-3">
            🔇 El Silencio de Poder
          </h2>
          <p className="text-xl text-amber-200">
            El momento más importante de toda la llamada
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
          <div className="bg-slate-900 p-6 rounded-lg">
            <p className="font-bold text-amber-400 mb-3 text-lg">💬 El script final:</p>
            <div className="space-y-3">
              <div className="bg-slate-800 p-4 rounded border-l-4 border-blue-500">
                <p className="text-white">"El programa cuesta $1.500 al mes..."</p>
              </div>
              <div className="bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                <p className="text-white">"...más una tarifa de configuración de $2.000."</p>
              </div>
              <div className="bg-slate-800 p-4 rounded border-l-4 border-green-500">
                <p className="text-white">"Pero si decidís avanzar hoy, eliminamos esa tarifa."</p>
              </div>
              <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 p-6 rounded shadow-lg">
                <p className="text-black font-black text-center text-2xl">[SILENCIO ABSOLUTO]</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
            <p className="text-3xl font-black text-red-900 text-center mb-3">
              EL SILENCIO NO ES TENSIÓN
            </p>
            <p className="text-4xl font-black text-center text-slate-900">
              ES PODER
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={iniciarSilencio}
              disabled={silencioActivo}
              className={`px-10 py-5 rounded-xl font-bold text-xl transition-all ${
                silencioActivo 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {silencioActivo ? 'Silencio en progreso...' : 'Practicar Silencio de Poder'}
            </button>
          </div>

          {silencioActivo && (
            <div className="bg-black p-12 rounded-xl text-center border-4 border-amber-500">
              <div className="text-9xl font-black text-amber-400 mb-4 animate-pulse">
                {silencioSegundos}
              </div>
              <p className="text-3xl text-white font-bold mb-4">segundos...</p>
              <div className="max-w-2xl mx-auto">
                {silencioSegundos < 3 && (
                  <p className="text-xl text-slate-300">🧘‍♂️ Respirá profundo. Mantené la calma.</p>
                )}
                {silencioSegundos >= 3 && silencioSegundos < 7 && (
                  <p className="text-xl text-slate-300">😰 Va a sentirse incómodo. No cedas.</p>
                )}
                {silencioSegundos >= 7 && silencioSegundos < 12 && (
                  <p className="text-xl text-amber-300 font-bold">🎯 Ellos están procesando. NO HABLES.</p>
                )}
                {silencioSegundos >= 12 && (
                  <p className="text-xl text-green-400 font-bold">✅ Perfecto. Esperá a que hablen (ellos primero).</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Descubre Tu Estilo Personal */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-6">
          <Mic className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎤 Descubre Tu Voz Única
          </h2>
          <p className="text-lg text-slate-600">
            Cada vendedor de élite tiene un estilo propio. ¿Cuál es el tuyo?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {estilosPersonales.map((estilo) => (
            <button
              key={estilo.estilo}
              onClick={() => toggleEstiloPersonal(estilo.estilo)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                estiloPersonal.includes(estilo.estilo)
                  ? `bg-gradient-to-r ${estilo.color} text-white border-transparent shadow-lg`
                  : 'bg-white border-slate-300 hover:border-purple-400'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className={`text-2xl font-bold ${
                  estiloPersonal.includes(estilo.estilo) ? 'text-white' : 'text-slate-900'
                }`}>
                  {estilo.estilo}
                </h3>
                {estiloPersonal.includes(estilo.estilo) && (
                  <CheckCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <p className={`text-sm font-bold mb-1 ${
                    estiloPersonal.includes(estilo.estilo) ? 'text-white/80' : 'text-slate-600'
                  }`}>
                    Características:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {estilo.caracteristicas.map((c, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded text-xs font-medium ${
                        estiloPersonal.includes(estilo.estilo) 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${
                  estiloPersonal.includes(estilo.estilo) ? 'bg-white/20' : 'bg-green-50'
                }`}>
                  <p className={`text-sm font-bold mb-1 ${
                    estiloPersonal.includes(estilo.estilo) ? 'text-white/80' : 'text-green-900'
                  }`}>
                    💪 Tu fortaleza:
                  </p>
                  <p className={`text-sm ${
                    estiloPersonal.includes(estilo.estilo) ? 'text-white' : 'text-slate-800'
                  }`}>
                    {estilo.fortaleza}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  estiloPersonal.includes(estilo.estilo) ? 'bg-white/20' : 'bg-orange-50'
                }`}>
                  <p className={`text-sm font-bold mb-1 ${
                    estiloPersonal.includes(estilo.estilo) ? 'text-white/80' : 'text-orange-900'
                  }`}>
                    📈 A trabajar:
                  </p>
                  <p className={`text-sm ${
                    estiloPersonal.includes(estilo.estilo) ? 'text-white' : 'text-slate-800'
                  }`}>
                    {estilo.trabajar}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {estiloPersonal.length > 0 && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-xl text-white text-center">
            <Star className="w-16 h-16 mx-auto mb-4" />
            <p className="text-2xl font-bold mb-3">
              Tu perfil: {estiloPersonal.join(' + ')}
            </p>
            <p className="text-lg">
              Usá este autoconocimiento para potenciar tu estilo natural y trabajar conscientemente en tus puntos de mejora.
            </p>
          </div>
        )}
      </div>

      {/* BONUS OCULTO */}
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 text-white border-2 border-purple-500 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-purple-200 text-center mb-6">
          Desbloqueá tu propia voz de cierre
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-purple-200 leading-relaxed">
            Actuá como un coach experto en ventas premium y programación neurolingüística. Ayudame a descubrir y entrenar mi estilo único de comunicación persuasiva, basado en mi personalidad, energía y valores. Quiero integrar el método con mi autenticidad para cerrar más ventas sin sentirme forzado.
          </p>
        </div>
      </div>

      {/* Cierre Épico */}
      <div className="bg-gradient-to-r from-black via-amber-900 to-black rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        <div className="relative z-10">
          <Crown className="w-24 h-24 mx-auto text-amber-400 mb-6" />
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-100 bg-clip-text text-transparent">
            ✅ CIERRE TRANSFORMADOR
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-white">
              Este no es un guión para manipular.
            </p>
            <p className="text-2xl font-bold text-amber-300">
              Es un método para crear claridad, conectar emocionalmente y liderar con poder.
            </p>
            <div className="my-8 h-1 w-32 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full" />
            <p className="text-xl text-slate-200">
              Si lo estudiás, lo practicás, y lo hacés tuyo...
            </p>
            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-8 rounded-2xl mt-8 inline-block shadow-2xl">
              <p className="text-3xl font-black text-black">
                No solo vas a cerrar ventas.
              </p>
              <p className="text-4xl font-black text-black mt-2">
                Vas a liberar potencial.
              </p>
              <p className="text-2xl font-bold text-black/80 mt-2">
                En vos. Y en los demás.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/30 to-yellow-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-500/30 to-amber-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const cerrarPoderEmpatiaMetadata = {
  id: 4,
  title: "Cerrar con Poder y Empatía",
  type: "document" as const,
  duration: "55 min"
};