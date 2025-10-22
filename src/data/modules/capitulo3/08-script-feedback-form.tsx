import React, { useState, useEffect } from 'react';
import { 
  Clipboard, CheckCircle, Circle, TrendingUp, BarChart3, 
  Eye, Edit3, Lightbulb, Target, Award, Clock, Users,
  MessageCircle, Heart, Brain, Zap, AlertCircle, Star,
  FileText, Search, Filter, Download, RefreshCw, Sparkles,
  ArrowRight, ThumbsUp, ThumbsDown, PieChart
} from 'lucide-react';

export const ScriptFeedbackFormContent = () => {
  const [llamadasCompletadas, setLlamadasCompletadas] = useState<boolean[]>(new Array(30).fill(false));
  const [respuestas, setRespuestas] = useState<{[key: string]: string}>({});
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const preguntas = [
    {
      id: 'frases-repetidas',
      categoria: 'Lo que dicen',
      pregunta: '¿Qué frases o palabras repiten?',
      placeholder: 'Ej: "No tengo tiempo", "Está complicado", "Ya probé otras cosas"...',
      insight: 'Es su lenguaje. Usalo. Vas a sonar como "uno de los suyos".',
      icono: <MessageCircle className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'historias-situaciones',
      categoria: 'Lo que dicen',
      pregunta: '¿Qué historias o situaciones mencionan?',
      placeholder: 'Ej: "Mi socio se fue", "Perdí clientes el mes pasado"...',
      insight: 'Son sus dolores reales. Hablales con ejemplos que ya sienten como propios.',
      icono: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'partes-aburridas',
      categoria: 'Lo que dicen',
      pregunta: '¿Qué partes de tu pitch los aburren o desmotivan?',
      placeholder: 'Ej: "Cuando hablo de features técnicos", "La parte del proceso"...',
      insight: 'Eso es ruido. Editá o eliminá. Cada palabra tiene que generar energía, no drenarla.',
      icono: <ThumbsDown className="w-6 h-6" />,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'metaforas',
      categoria: 'Lo que dicen',
      pregunta: '¿Qué metáforas usan?',
      placeholder: 'Ej: "Es como estar en un laberinto", "Siento que estoy corriendo en círculos"...',
      insight: 'Copialas. Las metáforas son autopistas hacia la conexión emocional.',
      icono: <Lightbulb className="w-6 h-6" />,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'partes-entusiasman',
      categoria: 'Lo que dicen',
      pregunta: '¿Qué partes los entusiasman?',
      placeholder: 'Ej: "Cuando muestro resultados", "Al hablar del ROI"...',
      insight: 'Ese es tu gancho emocional. Amplialo.',
      icono: <ThumbsUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'adjetivos-situacion',
      categoria: 'Cómo perciben su realidad',
      pregunta: '¿Qué adjetivos usan para describir su situación actual?',
      placeholder: 'Ej: "Frustrante", "Estancado", "Agobiante"...',
      insight: 'Dolor puro. Usalo para afilar tus preguntas.',
      icono: <AlertCircle className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'deseos-repetidos',
      categoria: 'Cómo perciben su realidad',
      pregunta: '¿Qué deseos se repiten?',
      placeholder: 'Ej: "Quiero más tiempo libre", "Necesito clientes predecibles"...',
      insight: 'Ahí está el núcleo de tu propuesta. No vendas productos: vendé soluciones a esos deseos.',
      icono: <Heart className="w-6 h-6" />,
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 'preguntas-post-pitch',
      categoria: 'Lo que no quedó claro',
      pregunta: '¿Qué preguntas aparecen después del pitch?',
      placeholder: 'Ej: "¿Cuánto tiempo lleva?", "¿Cómo es el onboarding?"...',
      insight: 'Clarificá antes. Evitá la confusión.',
      icono: <Eye className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'objeciones-comunes',
      categoria: 'Lo que no quedó claro',
      pregunta: '¿Cuáles son las objeciones más comunes?',
      placeholder: 'Ej: "Está caro", "No tengo tiempo", "Tengo que pensarlo"...',
      insight: 'Anticipalas. Prepará tus "respuestas de oro".',
      icono: <Target className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'como-terminan',
      categoria: 'Cierres y energía',
      pregunta: '¿Cómo terminan la mayoría de tus llamadas?',
      placeholder: 'Ej: "Con entusiasmo pero sin compromiso", "Con dudas"...',
      insight: 'Analizá patrones: entusiasmo, duda, desconexión...',
      icono: <Clock className="w-6 h-6" />,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'frases-impacto',
      categoria: 'Cierres y energía',
      pregunta: '¿Qué frases tuyas generan más impacto?',
      placeholder: 'Ej: "¿Y si en 6 meses seguís igual?", "¿Cuánto te está costando NO resolverlo?"...',
      insight: 'Tus "frases asesinas". Memorizalas. Repetilas.',
      icono: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'patron-energia',
      categoria: 'Cierres y energía',
      pregunta: '¿Notás algún patrón en la energía de las llamadas?',
      placeholder: 'Ej: "Pierdo momentum después del precio", "Arrancan fríos pero calientan"...',
      insight: 'La energía es data. Identificá dónde sube y dónde cae.',
      icono: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-teal-500'
    }
  ];

  const toggleLlamada = (index: number) => {
    const newLlamadas = [...llamadasCompletadas];
    newLlamadas[index] = !newLlamadas[index];
    setLlamadasCompletadas(newLlamadas);
  };

  const llamadasRealizadas = llamadasCompletadas.filter(l => l).length;
  const progresoPercentage = (llamadasRealizadas / 30) * 100;
  const puedeAnalizar = llamadasRealizadas >= 30;

  const handleRespuestaChange = (id: string, value: string) => {
    setRespuestas({...respuestas, [id]: value});
  };

  const respuestasCompletadas = Object.values(respuestas).filter(r => r.trim()).length;

  const generarInsights = () => {
    const insights = [];
    
    // Analizar patrones
    if (respuestas['frases-repetidas']?.length > 50) {
      insights.push({
        tipo: 'lenguaje',
        titulo: 'Patrón de Lenguaje Detectado',
        descripcion: 'Identificaste frases repetidas. Incorporalas en tu apertura para generar rapport instantáneo.',
        accion: 'Reescribí tu apertura usando sus palabras exactas.',
        prioridad: 'alta'
      });
    }

    if (respuestas['partes-aburridas']?.length > 30) {
      insights.push({
        tipo: 'pitch',
        titulo: 'Momento de Editar',
        descripcion: 'Detectaste partes que drenan energía. Es momento de cortar sin piedad.',
        accion: 'Eliminá o acortá esas secciones en tu próxima versión.',
        prioridad: 'crítica'
      });
    }

    if (respuestas['objeciones-comunes']?.length > 50) {
      insights.push({
        tipo: 'objeciones',
        titulo: 'Objeciones Recurrentes',
        descripcion: 'Tenés suficiente data sobre objeciones. Podés anticiparlas.',
        accion: 'Creá respuestas preventivas para incluir en tu pitch.',
        prioridad: 'alta'
      });
    }

    if (respuestas['frases-impacto']?.length > 50) {
      insights.push({
        tipo: 'arsenal',
        titulo: 'Frases de Oro Identificadas',
        descripcion: 'Ya sabés qué funciona. Hora de sistematizarlo.',
        accion: 'Creá un "arsenal de frases" y úsalas estratégicamente.',
        prioridad: 'media'
      });
    }

    if (respuestas['como-terminan']?.includes('sin compromiso') || respuestas['como-terminan']?.includes('dudas')) {
      insights.push({
        tipo: 'cierre',
        titulo: 'Problema en el Cierre',
        descripcion: 'Tus llamadas no están terminando con decisión. Hay debilidad en el cierre.',
        accion: 'Revisá tu secuencia de cierre. Posiblemente necesitás más directitud.',
        prioridad: 'crítica'
      });
    }

    return insights;
  };

  const insights = mostrarAnalisis ? generarInsights() : [];

  return (
    <div className="space-y-8">
      {/* Hero Profesional */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-teal-300">
              Capítulo 3 · Módulo 8
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <Clipboard className="w-20 h-20 text-teal-400" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
            📊 SCRIPT FEEDBACK
          </h1>
          <h2 className="text-4xl font-bold text-center mb-4 text-teal-100">
            FORM
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-2xl text-white font-black">
              🎯 La herramienta que separa amateurs de profesionales
            </p>
            <p className="text-xl text-teal-200">
              Puede parecer un simple formulario…
            </p>
            <p className="text-xl text-teal-200">
              Pero en realidad, estás frente a uno de los instrumentos más poderosos que vas a tener como vendedor.
            </p>
            <div className="my-6 h-1 w-64 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full" />
            <p className="text-xl text-white font-bold">
              Es tu espejo más honesto.
            </p>
            <p className="text-lg text-slate-300">
              Refleja lo que funciona, lo que falla y lo que te está frenando sin que lo sepas.
            </p>
            <p className="text-xl text-cyan-300 font-bold mt-4">
              Si lo usás bien, vas a dejar de improvisar para empezar a evolucionar con datos, no con suposiciones.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl" />
      </div>

      {/* Para qué sirve */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
        <div className="text-center mb-6">
          <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📋 ¿Para qué sirve este formulario?
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
          <p className="text-xl text-slate-800 text-center leading-relaxed">
            El objetivo es simple pero brutalmente efectivo:
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl text-white text-center">
            <p className="text-2xl font-bold">
              Auditar tu script con precisión quirúrgica, detectar patrones reales y rediseñar tu proceso de ventas con inteligencia estratégica.
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-red-900 text-lg mb-2">⚠️ Pero ojo:</p>
                <p className="text-slate-800 text-lg">
                  <span className="font-bold">No modifiques ni una coma de tu guion hasta que no hayas hecho 30 llamadas completas.</span> Ni 10, ni 15… <span className="text-red-700 font-black">Treinta.</span>
                </p>
                <p className="text-slate-700 mt-3">
                  Solo así vas a tener una muestra real. Cualquier cambio antes de eso es ruido emocional, no mejora profesional.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border-2 border-green-300">
            <h3 className="font-bold text-green-900 text-lg mb-3">✅ Cómo usarlo:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">1.</span>
                <span className="text-slate-800">Completalo después de cada llamada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">2.</span>
                <span className="text-slate-800">Registrá patrones y tendencias</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">3.</span>
                <span className="text-slate-800">Una vez al mes, analizá resultados y actualizá tu script</span>
              </li>
            </ul>
            <p className="text-slate-700 mt-4 font-bold">
              Así funciona el crecimiento real.
            </p>
          </div>
        </div>
      </div>

      {/* Tracker de 30 Llamadas */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            ✅ Paso 1: Las 30 Llamadas
          </h2>
          <p className="text-lg text-slate-600">
            Tu entrenamiento mental. Disciplina emocional pura.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Progreso</p>
              <p className="text-4xl font-black text-green-600">{llamadasRealizadas}/30</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Completado</p>
              <p className="text-4xl font-black text-slate-900">{Math.round(progresoPercentage)}%</p>
            </div>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden shadow-inner mb-8">
            <div 
              className={`h-full transition-all duration-700 ${
                progresoPercentage === 100 
                  ? 'bg-gradient-to-r from-green-600 via-emerald-500 to-green-600' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}
              style={{ width: `${progresoPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-10 gap-3 mb-6">
            {llamadasCompletadas.map((completada, index) => (
              <button
                key={index}
                onClick={() => toggleLlamada(index)}
                className={`aspect-square rounded-lg flex items-center justify-center font-bold transition-all ${
                  completada
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {completada ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
            ))}
          </div>

          {progresoPercentage === 100 && (
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-xl text-white text-center">
              <Award className="w-20 h-20 mx-auto mb-4" />
              <p className="text-3xl font-black mb-2">🎉 ¡30 LLAMADAS COMPLETADAS!</p>
              <p className="text-xl">Ahora sí tenés una muestra real. Es momento de analizar y evolucionar tu script.</p>
            </div>
          )}

          {progresoPercentage < 100 && (
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-300">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-blue-900 mb-2">💡 Recordá:</p>
                  <p className="text-slate-800">
                    No analices. No edites. No te juzgues. Solo ejecutá y registrá. 
                    Esto entrena tu mente para observar con objetividad. 
                    Y eso, en ventas, vale más que mil cursos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Las 12 Preguntas de Oro */}
      <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-8">
          <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🧠 Las 12 Preguntas de Oro
          </h2>
          <p className="text-lg text-slate-600">
            Una linterna que te guía a lo que tu mercado verdaderamente siente y piensa
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Preguntas Respondidas</p>
              <p className="text-3xl font-black text-purple-600">{respuestasCompletadas}/12</p>
            </div>
            {respuestasCompletadas === 12 && (
              <button
                onClick={() => setMostrarAnalisis(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Generar Análisis
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {preguntas.map((pregunta) => (
            <div key={pregunta.id} className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${pregunta.color}`}>
                  <div className="text-white">
                    {pregunta.icono}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {pregunta.categoria}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {pregunta.pregunta}
                  </h3>
                  <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400 mb-3">
                    <p className="text-sm text-amber-900">
                      <span className="font-bold">💡 Insight:</span> {pregunta.insight}
                    </p>
                  </div>
                  <textarea
                    value={respuestas[pregunta.id] || ''}
                    onChange={(e) => handleRespuestaChange(pregunta.id, e.target.value)}
                    placeholder={pregunta.placeholder}
                    className="w-full p-4 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 min-h-24"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Análisis Generado */}
      {mostrarAnalisis && insights.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-300 shadow-xl">
          <div className="text-center mb-6">
            <PieChart className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              📊 Análisis de Patrones
            </h2>
            <p className="text-lg text-slate-600">
              Basado en tus respuestas, estos son los insights detectados
            </p>
          </div>

          <div className="space-y-4">
            {insights.map((insight, idx) => (
              <div key={idx} className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${
                insight.prioridad === 'crítica' 
                  ? 'border-red-500'
                  : insight.prioridad === 'alta'
                  ? 'border-orange-500'
                  : 'border-yellow-500'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        insight.prioridad === 'crítica'
                          ? 'bg-red-100 text-red-800'
                          : insight.prioridad === 'alta'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {insight.prioridad === 'crítica' ? '🔴' : insight.prioridad === 'alta' ? '🟠' : '🟡'} {insight.prioridad.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                        {insight.tipo}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{insight.titulo}</h3>
                    <p className="text-slate-700 mb-3">{insight.descripcion}</p>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <p className="font-bold text-green-900 text-sm mb-1">✅ Acción Recomendada:</p>
                      <p className="text-slate-800">{insight.accion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plan de Acción */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-300 shadow-xl">
        <div className="text-center mb-6">
          <RefreshCw className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🧰 ¿Y ahora qué hago con todo esto?
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <p className="text-lg text-slate-700 mb-6 text-center">
            Una vez que completes las 30 llamadas y respondas las preguntas, seguí este plan:
          </p>

          <div className="space-y-4">
            {[
              {
                paso: 1,
                titulo: 'Marcá lo que necesita cambio inmediato',
                descripcion: '¿Tu apertura? ¿Tus preguntas? ¿El cierre?',
                icono: <Search className="w-6 h-6" />,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                paso: 2,
                titulo: 'Creá tu nueva versión del guion',
                descripcion: 'V2.0, V3.0, V100 si hace falta. Siempre desde evidencia, no desde la emoción.',
                icono: <Edit3 className="w-6 h-6" />,
                color: 'from-purple-500 to-pink-500'
              },
              {
                paso: 3,
                titulo: 'Volvé a empezar',
                descripcion: 'Esto no termina. Se afila constantemente.',
                icono: <RefreshCw className="w-6 h-6" />,
                color: 'from-green-500 to-emerald-500'
              }
            ].map((item) => (
              <div key={item.paso} className={`bg-gradient-to-r ${item.color} rounded-xl p-6 text-white`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-white/20 backdrop-blur rounded-full w-12 h-12 flex items-center justify-center font-black text-2xl">
                    {item.paso}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.titulo}</h3>
                    <p className="text-white/90">{item.descripcion}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {item.icono}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* El Secreto */}
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 border-2 border-purple-500 shadow-2xl">
        <div className="text-center mb-6">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-3">
            🚀 El secreto no es el script. Sos vos.
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
          <p className="text-2xl text-white font-bold text-center leading-relaxed">
            🔑 No existe un guion perfecto.<br/>
            Solo existen guiones <span className="text-purple-300">vivos</span>, <span className="text-cyan-300">adaptados</span> y <span className="text-green-300">probados</span>.
          </p>
          <p className="text-xl text-slate-200 text-center mt-6">
            Y la única forma de que eso pase… es que lo pongas a prueba con rigor, sin excusas y con hambre de mejora.
          </p>
        </div>
      </div>

      {/* BONUS OCULTO */}
      <div className="bg-gradient-to-br from-slate-900 to-teal-900 rounded-2xl p-8 text-white border-2 border-teal-500 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-teal-200 text-center mb-6">
          Adaptá tu guion con IA basado en patrones detectados
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-teal-200 leading-relaxed">
            Actuá como un entrenador de alto rendimiento en ventas. Mostrame ejemplos concretos de cómo adaptar mi guion según los patrones detectados con el Script Feedback Form, incluyendo frases reales para apertura, diagnóstico, pitch y cierre. Quiero que cada frase esté cargada de emoción, empatía y precisión estratégica.
          </p>
        </div>
      </div>

      {/* Cierre Épico */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-900 to-cyan-900 rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <Clipboard className="w-24 h-24 mx-auto text-teal-400 mb-6" />
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
            📊 DATOS, NO SUPOSICIONES
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-white">
              Este formulario es tu GPS.
            </p>
            <p className="text-2xl font-bold text-teal-300">
              Te muestra exactamente dónde estás y hacia dónde ir.
            </p>
            <div className="my-8 h-1 w-32 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full" />
            <p className="text-xl text-slate-200">
              Los amateurs mejoran por accidente.
            </p>
            <p className="text-xl text-slate-200">
              Los profesionales mejoran por diseño.
            </p>
            <div className="my-8" />
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-8 rounded-2xl mt-8 inline-block shadow-2xl">
              <p className="text-3xl font-black text-white mb-3">
                30 llamadas.<br/>
                12 preguntas.<br/>
                Infinitas mejoras.
              </p>
              <p className="text-xl font-bold text-white mt-4">
                Así se construye la maestría.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/30 to-teal-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const scriptFeedbackFormMetadata = {
  id: 8,
  title: "Script Feedback Form",
  type: "document" as const,
  duration: "40 min"
};