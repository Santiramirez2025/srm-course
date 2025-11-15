import React, { useState } from 'react';
import { 
  Users, Target, Award, TrendingUp, DollarSign, CheckCircle,
  MessageCircle, Brain, Heart, Eye, Zap, Star, Trophy,
  Calendar, Clock, Briefcase, Phone, Mail, FileText,
  ThumbsUp, AlertCircle, Sparkles, Rocket, Crown, Flag,
  Search, Filter, BarChart3, PieChart, ArrowRight, Gift
} from 'lucide-react';

export const EntrevistarContratarContent = () => {
  const [checklistCompletada, setChecklistCompletada] = useState<{[key: string]: boolean}>({});
  const [evaluacionCandidato, setEvaluacionCandidato] = useState<{[key: string]: number}>({});
  const [calculadoraAbierta, setCalculadoraAbierta] = useState(false);
  const [ventasMes, setVentasMes] = useState(20);
  const [tasaCierre, setTasaCierre] = useState(25);

  const checklistPreEntrevista = [
    {
      id: 'evidencia',
      item: '¿Pediste evidencia? (grabaciones, números, referencias)',
      categoria: 'Validación',
      icono: <FileText className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'porque',
      item: '¿Entendiste su "por qué"? (necesidad, hambre, pasión)',
      categoria: 'Motivación',
      icono: <Heart className="w-5 h-5" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'historial',
      item: '¿Revisaste historias de rendimiento pasado?',
      categoria: 'Track Record',
      icono: <TrendingUp className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'escucha',
      item: '¿Observaste su capacidad de escuchar y enfocarse?',
      categoria: 'Habilidades',
      icono: <Eye className="w-5 h-5" />,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'adaptacion',
      item: '¿Se adaptan a tu metodología o vienen con su propio manual?',
      categoria: 'Flexibilidad',
      icono: <Zap className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'presencia',
      item: '¿Evaluaste su presencia? (cámara, luz, actitud)',
      categoria: 'Profesionalismo',
      icono: <Award className="w-5 h-5" />,
      color: 'from-amber-500 to-yellow-500'
    }
  ];

  const preguntasEntrevista = [
    {
      categoria: 'Romper el Hielo',
      preguntas: [
        {
          pregunta: '¿Por qué te postulaste?',
          queRevela: 'Motivación inicial y alineación',
          respuestaIdeal: 'Respuesta específica sobre tu empresa/producto, no genérica'
        },
        {
          pregunta: '¿Qué hacés ahora?',
          queRevela: 'Situación actual y momentum',
          respuestaIdeal: 'Claridad sobre su presente y por qué buscan cambiar'
        },
        {
          pregunta: '¿Qué buscás al cambiar?',
          queRevela: 'Expectativas y deseos reales',
          respuestaIdeal: 'Objetivos claros, no respuestas vagas'
        },
        {
          pregunta: '¿Qué te atrae de esta industria?',
          queRevela: 'Conexión con el mercado',
          respuestaIdeal: 'Genuino interés, no solo "quiero ganar plata"'
        },
        {
          pregunta: 'Contame un problema difícil que hayas resuelto y cómo lo hiciste',
          queRevela: 'Pensamiento crítico y resiliencia',
          respuestaIdeal: 'Historia específica con proceso claro y resultado'
        }
      ],
      color: 'from-blue-500 to-cyan-500',
      icono: <MessageCircle className="w-6 h-6" />
    },
    {
      categoria: 'Historia Real en Ventas',
      preguntas: [
        {
          pregunta: '¿Qué vendiste? ¿A quién?',
          queRevela: 'Experiencia específica y nicho',
          respuestaIdeal: 'Detalles concretos, no generalidades'
        },
        {
          pregunta: '¿Cuáles eran tus resultados?',
          queRevela: 'Track record verificable',
          respuestaIdeal: 'Números específicos, métricas claras'
        },
        {
          pregunta: '¿Cómo generabas tus ventas?',
          queRevela: 'Metodología y autonomía',
          respuestaIdeal: 'Proceso claro, no dependencia de leads calientes'
        },
        {
          pregunta: 'Contame una vez que, escuchando bien, resolviste un conflicto',
          queRevela: 'Capacidad de escucha y empatía',
          respuestaIdeal: 'Historia donde la escucha fue protagonista'
        },
        {
          pregunta: '¿Trabajaste con comisiones puras?',
          queRevela: 'Tolerancia al riesgo y confianza',
          respuestaIdeal: 'Experiencia con pago por performance'
        },
        {
          pregunta: '¿Tenés otros proyectos?',
          queRevela: 'Disponibilidad y compromiso',
          respuestaIdeal: 'Foco completo o claridad sobre tiempo disponible'
        },
        {
          pregunta: '¿Qué libros o entrenamientos hiciste?',
          queRevela: 'Inversión en desarrollo profesional',
          respuestaIdeal: 'Evidencia de aprendizaje continuo'
        },
        {
          pregunta: '¿Qué cosa creés que es verdad aunque la mayoría no está de acuerdo?',
          queRevela: 'Pensamiento independiente y carácter',
          respuestaIdeal: 'Opinión fundamentada, no populista'
        }
      ],
      color: 'from-purple-500 to-pink-500',
      icono: <Target className="w-6 h-6" />
    },
    {
      categoria: 'Presentar tu Empresa',
      preguntas: [
        {
          pregunta: 'Nuestra misión es [X]',
          queRevela: 'Reacción a tu propósito',
          respuestaIdeal: 'Resonancia genuina, preguntas de interés'
        },
        {
          pregunta: 'Ayudamos a [público] con [solución]',
          queRevela: 'Comprensión del negocio',
          respuestaIdeal: 'Asiente, conecta, hace preguntas inteligentes'
        },
        {
          pregunta: '¿Cuándo podrías arrancar si te contrato?',
          queRevela: 'Urgencia y disponibilidad real',
          respuestaIdeal: 'Fecha concreta, no vago'
        }
      ],
      color: 'from-green-500 to-emerald-500',
      icono: <Briefcase className="w-6 h-6" />
    },
    {
      categoria: 'Compensación',
      preguntas: [
        {
          pregunta: 'Es 100% a comisión: 10% de lo cobrado. ¿Esto tiene sentido para vos?',
          queRevela: 'Aceptación del modelo y confianza',
          respuestaIdeal: 'Comprensión clara y entusiasmo por performance'
        },
        {
          pregunta: 'Si vendés $5.800, ganás $580. Los pagos se procesan cuando el cliente paga.',
          queRevela: 'Comprensión del flujo de caja',
          respuestaIdeal: 'Entiende y acepta el modelo'
        }
      ],
      color: 'from-yellow-500 to-amber-500',
      icono: <DollarSign className="w-6 h-6" />
    }
  ];

  const criteriosEvaluacion = [
    { id: 'experiencia', criterio: 'Experiencia verificable en ventas', peso: 20 },
    { id: 'comunicacion', criterio: 'Habilidades de comunicación', peso: 20 },
    { id: 'motivacion', criterio: 'Motivación y hambre', peso: 15 },
    { id: 'escucha', criterio: 'Capacidad de escucha activa', peso: 15 },
    { id: 'resiliencia', criterio: 'Resiliencia y mentalidad', peso: 10 },
    { id: 'adaptabilidad', criterio: 'Adaptabilidad a metodología', peso: 10 },
    { id: 'profesionalismo', criterio: 'Presencia y profesionalismo', peso: 10 }
  ];

  const toggleChecklist = (id: string) => {
    setChecklistCompletada({
      ...checklistCompletada,
      [id]: !checklistCompletada[id]
    });
  };

  const handleEvaluacion = (id: string, valor: number) => {
    setEvaluacionCandidato({
      ...evaluacionCandidato,
      [id]: valor
    });
  };

  const checklistProgress = Object.values(checklistCompletada).filter(v => v).length;
  const checklistPercentage = (checklistProgress / checklistPreEntrevista.length) * 100;

  const calcularScore = () => {
    let scoreTotal = 0;
    criteriosEvaluacion.forEach(criterio => {
      const valor = evaluacionCandidato[criterio.id] || 0;
      scoreTotal += (valor / 10) * criterio.peso;
    });
    return Math.round(scoreTotal);
  };

  const scoreTotal = calcularScore();
  const tieneScore = Object.keys(evaluacionCandidato).length > 0;

  // Calculadora
  const llamadasDia = 6;
  const diasMes = 20;
  const llamadasMes = llamadasDia * diasMes;
  const cierresMes = Math.round((llamadasMes * (tasaCierre / 100)));
  const ticketPromedio = 5800;
  const comisionPorcentaje = 10;
  const ingresoMensual = Math.round((cierresMes * ticketPromedio * comisionPorcentaje) / 100);

  return (
    <div className="space-y-8">
      {/* Hero Épico */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
              Capítulo 3 · Módulo 9 · GRAN FINAL
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-20 h-20 text-yellow-400" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-blue-300 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            👥 ENTREVISTAR Y CONTRATAR
          </h1>
          <h2 className="text-4xl font-bold text-center mb-4 text-blue-100">
            VERDADEROS VENDEDORES
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-xl text-blue-200">
              Imaginá esto: estás por entrevistar a alguien que dice ser un crack en ventas.
            </p>
            <p className="text-2xl text-white font-black">
              ¿Cómo sabés si es humo o si realmente puede cerrar?
            </p>
            <div className="my-6 h-1 w-64 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
            <p className="text-xl text-purple-300 font-bold">
              Este no es un guion más. Es tu sistema.
            </p>
            <p className="text-lg text-slate-300">
              Tu escudo para filtrar a los que dicen... de los que hacen.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>

      {/* Checklist Pre-Entrevista */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-300 shadow-xl">
        <div className="text-center mb-6">
          <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🧭 Antes de Apretar "Llamar"
          </h2>
          <p className="text-lg text-slate-600">
            Claridad total sobre qué estás buscando
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Preparación</p>
              <p className="text-3xl font-black text-blue-600">{checklistProgress}/{checklistPreEntrevista.length}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-slate-900">{Math.round(checklistPercentage)}%</p>
              <p className="text-sm text-slate-600">Completo</p>
            </div>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner mb-6">
            <div 
              className="h-full transition-all duration-700 bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${checklistPercentage}%` }}
            />
          </div>

          <div className="space-y-3">
            {checklistPreEntrevista.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  checklistCompletada[item.id]
                    ? `bg-gradient-to-r ${item.color} text-white border-transparent shadow-lg`
                    : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklistCompletada[item.id] || false}
                  onChange={() => toggleChecklist(item.id)}
                  className="mt-1 w-6 h-6 rounded"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={checklistCompletada[item.id] ? 'text-white' : 'text-slate-600'}>
                      {item.icono}
                    </div>
                    <span className={`text-xs font-bold uppercase ${
                      checklistCompletada[item.id] ? 'text-white/80' : 'text-slate-500'
                    }`}>
                      {item.categoria}
                    </span>
                  </div>
                  <p className={`font-medium ${
                    checklistCompletada[item.id] ? 'text-white' : 'text-slate-800'
                  }`}>
                    {item.item}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {checklistPercentage === 100 && (
            <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-xl text-white text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-3" />
              <p className="text-2xl font-bold">✅ Listo para Entrevistar</p>
              <p className="text-green-100">Tenés todo lo necesario para filtrar con precisión</p>
            </div>
          )}
        </div>
      </div>

      {/* Banco de Preguntas */}
      <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-8">
          <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            💬 Banco de Preguntas Reveladoras
          </h2>
          <p className="text-lg text-slate-600">
            20 preguntas que separan el humo de la realidad
          </p>
        </div>

        <div className="space-y-6">
          {preguntasEntrevista.map((seccion, idx) => (
            <div key={idx} className={`bg-gradient-to-r ${seccion.color} rounded-xl p-6 text-white`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur rounded-lg">
                  {seccion.icono}
                </div>
                <h3 className="text-2xl font-bold">{seccion.categoria}</h3>
              </div>

              <div className="space-y-4">
                {seccion.preguntas.map((p, pIdx) => (
                  <div key={pIdx} className="bg-white/10 backdrop-blur rounded-lg p-5">
                    <p className="font-bold text-lg mb-3">"{p.pregunta}"</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-white/20 backdrop-blur p-3 rounded">
                        <p className="text-xs font-bold mb-1">🔍 Qué revela:</p>
                        <p className="text-sm">{p.queRevela}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur p-3 rounded">
                        <p className="text-xs font-bold mb-1">✅ Respuesta ideal:</p>
                        <p className="text-sm">{p.respuestaIdeal}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sistema de Scoring */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-300 shadow-xl">
        <div className="text-center mb-6">
          <BarChart3 className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📊 Sistema de Evaluación
          </h2>
          <p className="text-lg text-slate-600">
            Puntúa al candidato objetivamente (1-10)
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-4">
          {criteriosEvaluacion.map((criterio) => (
            <div key={criterio.id} className="bg-slate-50 p-5 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{criterio.criterio}</p>
                  <p className="text-sm text-slate-600">Peso: {criterio.peso}%</p>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleEvaluacion(criterio.id, num)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        evaluacionCandidato[criterio.id] === num
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-110'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {tieneScore && (
            <div className={`p-8 rounded-xl text-white text-center ${
              scoreTotal >= 80
                ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                : scoreTotal >= 60
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600'
                : 'bg-gradient-to-r from-red-600 to-pink-600'
            }`}>
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <p className="text-sm font-bold mb-2">SCORE TOTAL</p>
              <p className="text-6xl font-black mb-3">{scoreTotal}/100</p>
              {scoreTotal >= 80 && (
                <div>
                  <p className="text-2xl font-bold mb-2">✅ CONTRATALO YA</p>
                  <p className="text-lg">Este candidato es un fit excelente</p>
                </div>
              )}
              {scoreTotal >= 60 && scoreTotal < 80 && (
                <div>
                  <p className="text-2xl font-bold mb-2">⚠️ CONSIDERAR</p>
                  <p className="text-lg">Buen potencial, puede necesitar entrenamiento</p>
                </div>
              )}
              {scoreTotal < 60 && (
                <div>
                  <p className="text-2xl font-bold mb-2">❌ DESCARTAR</p>
                  <p className="text-lg">No es el candidato indicado para tu equipo</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Calculadora de Compensación */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300 shadow-xl">
        <div className="text-center mb-6">
          <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            💰 Calculadora de Compensación
          </h2>
          <p className="text-lg text-slate-600">
            Muestra escenarios reales de ingresos
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-bold text-slate-900 mb-2">
                Cierres por Mes
              </label>
              <input
                type="range"
                min="5"
                max="40"
                value={ventasMes}
                onChange={(e) => setVentasMes(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-3xl font-black text-green-600 mt-2">{ventasMes} cierres</p>
            </div>

            <div>
              <label className="block font-bold text-slate-900 mb-2">
                Tasa de Cierre (%)
              </label>
              <input
                type="range"
                min="10"
                max="40"
                value={tasaCierre}
                onChange={(e) => setTasaCierre(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-3xl font-black text-green-600 mt-2">{tasaCierre}%</p>
            </div>
          </div>

          <div className="bg-slate-100 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-slate-900 mb-4">Escenario Base:</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-slate-600 mb-1">Llamadas/Día</p>
                <p className="text-2xl font-black text-slate-900">{llamadasDia}</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-slate-600 mb-1">Días/Mes</p>
                <p className="text-2xl font-black text-slate-900">{diasMes}</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-slate-600 mb-1">Llamadas/Mes</p>
                <p className="text-2xl font-black text-slate-900">{llamadasMes}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-xl text-white text-center">
            <p className="text-sm font-bold mb-2">INGRESO MENSUAL PROYECTADO</p>
            <p className="text-6xl font-black mb-3">${ingresoMensual.toLocaleString()}</p>
            <p className="text-lg">
              Con {cierresMes} cierres al mes × ${ticketPromedio.toLocaleString()} × {comisionPorcentaje}%
            </p>
          </div>

          <div className="mt-6 bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
            <p className="font-bold text-blue-900 mb-2">💡 Cómo explicarlo:</p>
            <p className="text-slate-800">
              "Si vendés ${ticketPromedio.toLocaleString()}, ganás ${(ticketPromedio * comisionPorcentaje / 100).toLocaleString()}. 
              Con {llamadasDia} llamadas diarias y una tasa de cierre del {tasaCierre}%, 
              podrías hacer {cierresMes} cierres mensuales = <span className="font-bold text-green-700">${ingresoMensual.toLocaleString()}/mes</span>"
            </p>
          </div>
        </div>
      </div>

      {/* Scripts de Cierre */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-300 shadow-xl">
        <div className="text-center mb-6">
          <Target className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🤝 Scripts de Cierre
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500 mb-4">
              <p className="font-bold text-green-900 mb-2">✅ Si lo querés en tu equipo:</p>
              <p className="text-xl text-slate-800 italic mb-4">
                "Me parece que sos un gran fit. Te quiero hacer una oferta para que te sumes."
              </p>
              <p className="text-slate-700 font-bold">[Quedate callado. Dejá que hable.]</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-4">
              <p className="font-bold text-blue-900 mb-2">Si dice que sí:</p>
              <ul className="space-y-2 text-slate-800">
                <li>• Coordiná cómo deja su trabajo actual</li>
                <li>• Agendá entrenamientos</li>
                <li>• Poné fecha de inicio</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <p className="font-bold text-orange-900 mb-2">⚠️ Si no estás seguro todavía:</p>
              <p className="text-lg text-slate-800 italic">
                "Estamos entrevistando varios perfiles. Si decidimos avanzar con vos, te contactamos por mail. ¿Te parece?"
              </p>
            </div>
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
          Simulador de entrevista con IA
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-indigo-200 leading-relaxed">
            🎯 Actuá como un headhunter élite con 15 años de experiencia en ventas B2B de alto ticket. Simulá una entrevista completa y desafiante para filtrar vendedores mediocres y descubrir a los que tienen verdadero talento excepcional. 
            <br/><br/>
            Haceme preguntas profundas que revelen: motivación real más allá del dinero, resiliencia ante el rechazo, experiencia práctica verificable, pensamiento crítico independiente, y compromiso genuino con el crecimiento.
            <br/><br/>
            Sé exigente pero justo, como si estuvieras contratando para una empresa de alto impacto donde cada vendedor puede cambiar el rumbo del negocio. Dame feedback honesto sobre mis respuestas y sugerí mejoras específicas para destacarme como candidato de élite.
          </p>
        </div>
      </div>

      {/* CIERRE ÉPICO DEL CURSO COMPLETO */}
      <div className="bg-gradient-to-r from-black via-purple-900 to-black rounded-2xl p-16 text-white text-center relative overflow-hidden shadow-2xl border-4 border-yellow-500">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,215,0,.05) 10px, rgba(255,215,0,.05) 20px)'
        }} />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Trophy className="w-20 h-20 text-yellow-400" />
            <Crown className="w-24 h-24 text-yellow-400" />
            <Trophy className="w-20 h-20 text-yellow-400" />
          </div>

          <h2 className="text-6xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
            🎓 FELICITACIONES
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-3xl font-black text-white">
              Completaste la capacitacion SRM Academy
            </p>
            
            <div className="my-8 h-1 w-48 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto rounded-full" />

            <div className="grid md:grid-cols-3 gap-6 my-12">
              <div className="bg-white/10 backdrop-blur p-8 rounded-xl border border-white/20">
                <Flag className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-2xl font-bold text-green-400 mb-2">CAPÍTULO 1</p>
                <p className="text-xl text-white font-bold mb-2">Vivir Mejor</p>
                <p className="text-slate-300">Fundamentos, paradigmas, energía y constantes de vida</p>
              </div>

              <div className="bg-white/10 backdrop-blur p-8 rounded-xl border border-white/20">
                <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <p className="text-2xl font-bold text-blue-400 mb-2">CAPÍTULO 2</p>
                <p className="text-xl text-white font-bold mb-2">Trabajar Online</p>
                <p className="text-slate-300">Nicho, ofertas, comunicación y sistemas de trabajo</p>
              </div>

              <div className="bg-white/10 backdrop-blur p-8 rounded-xl border border-white/20">
                <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-2xl font-bold text-purple-400 mb-2">CAPÍTULO 3</p>
                <p className="text-xl text-white font-bold mb-2">Aprender a Vender</p>
                <p className="text-slate-300">Scripts, objeciones, cierre y construcción de equipos</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-600 p-10 rounded-2xl my-12 shadow-2xl">
              <p className="text-4xl font-black text-white mb-6">
                🏆 27 MÓDULOS COMPLETADOS
              </p>
              <p className="text-2xl text-white font-bold">
                9 módulos de vida + 10 de trabajo + 8 de ventas
              </p>
            </div>

            <div className="my-12 space-y-6">
              <p className="text-3xl font-bold text-yellow-400">
                Tu viaje de transformación:
              </p>
              
              <div className="bg-white/10 backdrop-blur p-8 rounded-xl border border-white/20 text-left">
                <p className="text-xl text-white mb-4">
                  ✅ Aprendiste a <span className="text-green-400 font-bold">vivir con propósito</span> y claridad mental
                </p>
                <p className="text-xl text-white mb-4">
                  ✅ Dominaste cómo <span className="text-blue-400 font-bold">construir un negocio online</span> rentable
                </p>
                <p className="text-xl text-white mb-4">
                  ✅ Te convertiste en un <span className="text-purple-400 font-bold">vendedor profesional</span> con sistemas probados
                </p>
                <p className="text-xl text-white">
                  ✅ Descubriste cómo <span className="text-yellow-400 font-bold">liderar y escalar</span> equipos de alto rendimiento
                </p>
              </div>
            </div>

            <div className="my-12 h-1 w-64 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />

            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-10 rounded-2xl border-2 border-purple-400 my-12">
              <Gift className="w-16 h-16 text-purple-300 mx-auto mb-6" />
              <p className="text-3xl font-black text-white mb-4">
                🎁 AHORA ES TU MOMENTO
              </p>
              <p className="text-xl text-purple-200 leading-relaxed">
                No dejes que este conocimiento se quede en teoría.<br/>
                Cada módulo que completaste es una herramienta.<br/>
                Cada concepto que aprendiste es un arma.<br/>
                Cada sistema que descubriste es tu ventaja competitiva.
              </p>
            </div>

            <div className="space-y-6 text-2xl text-white leading-relaxed">
              <p className="font-bold text-yellow-400">
                El conocimiento sin acción es entretenimiento.
              </p>
              <p className="font-bold text-blue-400">
                La acción sin conocimiento es caos.
              </p>
              <p className="text-3xl font-black text-white">
                Pero el conocimiento + la acción =
              </p>
              <p className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                TRANSFORMACIÓN IMPARABLE
              </p>
            </div>

            <div className="my-12 h-1 w-64 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full" />

            <div className="bg-white/10 backdrop-blur p-10 rounded-2xl border border-white/20 my-12">
              <Rocket className="w-20 h-20 text-blue-400 mx-auto mb-6" />
              <p className="text-3xl font-black text-white mb-6">
                📞 TUS PRÓXIMOS PASOS
              </p>
              <div className="space-y-4 text-left text-lg">
                <p className="text-white">
                  <span className="font-bold text-green-400">1. HOY:</span> Revisá tus notas. Elegí UN módulo para implementar esta semana.
                </p>
                <p className="text-white">
                  <span className="font-bold text-blue-400">2. ESTA SEMANA:</span> Hacé tu primera llamada usando el script que creaste.
                </p>
                <p className="text-white">
                  <span className="font-bold text-purple-400">3. ESTE MES:</span> Completá tus primeras 30 llamadas y analizá con el feedback form.
                </p>
                <p className="text-white">
                  <span className="font-bold text-yellow-400">4. ESTE AÑO:</span> Construí el negocio y la vida que diseñaste en el Capítulo 1.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 p-10 rounded-2xl my-12 shadow-2xl">
              <p className="text-4xl font-black text-white mb-6">
                ⚠️ ADVERTENCIA FINAL
              </p>
              <p className="text-2xl text-white leading-relaxed">
                Este curso no te va a cambiar la vida.<br/>
                <span className="text-yellow-300 font-black">VOS te vas a cambiar la vida.</span><br/>
                <br/>
                El curso solo te dio el mapa.<br/>
                Ahora vos tenés que caminar el camino.
              </p>
            </div>

            <div className="my-12 space-y-6">
              <p className="text-4xl font-black text-white">
                No seas de los que...
              </p>
              <div className="space-y-4 text-xl text-slate-300">
                <p>❌ Completan el curso y lo archivan</p>
                <p>❌ Saben qué hacer pero nunca empiezan</p>
                <p>❌ Tienen todas las herramientas pero siguen en el mismo lugar</p>
              </div>

              <div className="my-8 h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full" />

              <p className="text-4xl font-black text-white mb-6">
                Sé de los que...
              </p>
              <div className="space-y-4 text-xl text-white font-bold">
                <p>✅ Implementan antes de que el miedo se instale</p>
                <p>✅ Cometen errores pero siguen avanzando</p>
                <p>✅ Transforman el conocimiento en resultados reales</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-black p-12 rounded-2xl border-4 border-yellow-500 my-12 shadow-2xl">
              <Star className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
              <p className="text-5xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                EL JUEGO EMPIEZA AHORA
              </p>
              <p className="text-2xl text-white leading-relaxed mb-6">
                Tres personas terminan este curso:<br/>
                <br/>
                <span className="text-red-400">Uno lo archiva y sigue igual.</span><br/>
                <span className="text-yellow-400">Otro lo implementa parcialmente y mejora un poco.</span><br/>
                <span className="text-green-400 font-black">Y uno lo domina completamente y cambia su vida para siempre.</span><br/>
                <br/>
              </p>
              <p className="text-4xl font-black text-white">
                ¿Cuál vas a ser vos?
              </p>
            </div>

            <div className="my-12 space-y-6">
              <p className="text-3xl font-black text-white">
                Cerramos con esto:
              </p>
              <div className="bg-white/10 backdrop-blur p-10 rounded-2xl border border-white/20">
                <p className="text-2xl text-white leading-relaxed italic">
                  "La diferencia entre quien eras al empezar este curso<br/>
                  y quien podés llegar a ser...<br/>
                  <br/>
                  No está en el contenido que consumiste.<br/>
                  <span className="text-yellow-400 font-black not-italic">Está en las decisiones que tomás desde ahora.</span>"
                </p>
              </div>
            </div>

            <div className="my-12 h-2 w-full bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-pink-500 rounded-full" />

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 p-12 rounded-2xl shadow-2xl">
              <p className="text-5xl font-black text-white mb-6">
                🚀 ANDÁ Y CONQUISTÁ
              </p>
              <p className="text-2xl text-white font-bold mb-4">
                Vendé con propósito.
              </p>
              <p className="text-2xl text-white font-bold mb-4">
                Construí con integridad.
              </p>
              <p className="text-2xl text-white font-bold mb-8">
                Viví con libertad.
              </p>
              <div className="h-1 w-48 bg-white/50 mx-auto rounded-full mb-8" />
              <p className="text-3xl text-white font-black">
                El mundo está esperando lo que solo vos podés dar.
              </p>
              <p className="text-xl text-green-100 mt-6">
                Nos vemos en la cima. 👑
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/30 to-amber-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const entrevistarContratarMetadata = {
  id: 9,
  title: "Entrevistar y Contratar Verdaderos Vendedores",
  type: "document" as const,
  duration: "50 min"
};
