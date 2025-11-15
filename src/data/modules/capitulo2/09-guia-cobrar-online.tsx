import React, { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, Users, Shield, Zap, AlertTriangle, 
  CheckCircle, Sparkles, HelpCircle, Lock, Unlock, ChevronRight,
  Target, Award, Star, TrendingDown, Scale, Rocket, Activity,
  Check, X, ArrowRight, BarChart3, Lightbulb, Trophy
} from 'lucide-react';

type Screen = 'intro' | 'explore' | 'analyzer' | 'quiz' | 'recommendation' | 'bonus' | 'complete';

interface Model {
  id: number;
  nombre: string;
  emoji: string;
  descripcion: string;
  idealSi: string;
  ventajas: string[];
  desventajas: string[];
  color: string;
  bgGradient: string;
  icon: React.ReactNode;
  precio: string;
  complejidad: number;
  riesgo: number;
  escalabilidad: number;
}

interface QuizAnswer {
  casosExito: boolean | null;
  medirResultados: boolean | null;
  asumirRiesgo: boolean | null;
  tieneEquipo: boolean | null;
  clientesActuales: number | null;
}

export const GuiaCobrarOnlineContent = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [progress, setProgress] = useState(0);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [nivelSeleccionado, setNivelSeleccionado] = useState<string | null>(null);
  const [tipoClienteSeleccionado, setTipoClienteSeleccionado] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer>({
    casosExito: null,
    medirResultados: null,
    asumirRiesgo: null,
    tieneEquipo: null,
    clientesActuales: null
  });
  const [compareMode, setCompareMode] = useState(false);
  const [compareModels, setCompareModels] = useState<number[]>([]);
  const [showParticles, setShowParticles] = useState(true);

  const modelos: Model[] = [
    {
      id: 1,
      nombre: 'Fijo Mensual',
      emoji: '💰',
      descripcion: 'Cobrás lo mismo cada mes',
      idealSi: 'Querés ingresos estables y previsibles',
      ventajas: ['Previsibilidad total', 'Fácil de facturar', 'Cliente sabe qué paga', 'Simple de gestionar'],
      desventajas: ['Poco escalable', 'No crece con resultados', 'Techo de ingresos bajo'],
      color: 'blue',
      bgGradient: 'from-blue-600 via-blue-700 to-cyan-800',
      icon: <DollarSign className="w-6 h-6" />,
      precio: '€500-2000/mes',
      complejidad: 1,
      riesgo: 1,
      escalabilidad: 2
    },
    {
      id: 2,
      nombre: 'Por Resultado',
      emoji: '🎯',
      descripcion: 'Cobrás solo si hay acción (cita, venta, etc.)',
      idealSi: 'Tus clientes desconfían o están probando',
      ventajas: ['Sin riesgo para el cliente', 'Fácil de vender', 'Alta confianza', 'Cierre rápido'],
      desventajas: ['Ingresos variables', 'Dependes de factores externos', 'Mayor presión'],
      color: 'orange',
      bgGradient: 'from-orange-600 via-red-600 to-pink-700',
      icon: <Target className="w-6 h-6" />,
      precio: '€50-200/acción',
      complejidad: 2,
      riesgo: 3,
      escalabilidad: 4
    },
    {
      id: 3,
      nombre: 'Mixto (Fijo + Variable)',
      emoji: '⚖️',
      descripcion: 'Parte fija + parte según resultados',
      idealSi: 'Ya tenés experiencia y querés equilibrio',
      ventajas: ['Lo mejor de ambos', 'Estabilidad + crecimiento', 'Win-win', 'Motivación alineada'],
      desventajas: ['Más complejo de explicar', 'Requiere seguimiento', 'Negociación más larga'],
      color: 'purple',
      bgGradient: 'from-purple-600 via-pink-600 to-fuchsia-700',
      icon: <Scale className="w-6 h-6" />,
      precio: '€300 + 10-15%',
      complejidad: 3,
      riesgo: 2,
      escalabilidad: 4
    },
    {
      id: 4,
      nombre: 'Retainer Escalable',
      emoji: '📈',
      descripcion: 'Empezás con algo chico y después ampliás',
      idealSi: 'Querés relaciones largas y vender más después',
      ventajas: ['Fácil de arrancar', 'Crece con el cliente', 'Fidelización', 'Upsells naturales'],
      desventajas: ['Inicio lento', 'Requiere paciencia', 'Inversión de tiempo inicial'],
      color: 'green',
      bgGradient: 'from-green-600 via-emerald-600 to-teal-700',
      icon: <TrendingUp className="w-6 h-6" />,
      precio: '€200→€2000+',
      complejidad: 2,
      riesgo: 1,
      escalabilidad: 5
    },
    {
      id: 5,
      nombre: 'Market-Pays',
      emoji: '🚀',
      descripcion: 'Vos manejás todo y cobrás por performance',
      idealSi: 'Tenés equipo y estructura sólida',
      ventajas: ['Alto potencial de ganancia', 'Control total', 'Escalable', 'Ingresos ilimitados'],
      desventajas: ['Requiere equipo', 'Mayor responsabilidad', 'Más riesgo', 'Alta complejidad'],
      color: 'indigo',
      bgGradient: 'from-indigo-600 via-purple-700 to-violet-800',
      icon: <Rocket className="w-6 h-6" />,
      precio: '15-30% revenue',
      complejidad: 5,
      riesgo: 4,
      escalabilidad: 5
    }
  ];

  const niveles = [
    {
      id: 'principiante',
      nombre: 'Principiante',
      emoji: '🌱',
      descripcion: '0–5 clientes, poca estructura',
      modelosRecomendados: [2, 4],
      color: 'green',
      bgGradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'intermedio',
      nombre: 'Intermedio',
      emoji: '⚡',
      descripcion: '5–15 clientes, algo de sistema',
      modelosRecomendados: [3, 4],
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'avanzado',
      nombre: 'Avanzado',
      emoji: '🔥',
      descripcion: '15+ clientes y equipo armado',
      modelosRecomendados: [3, 5],
      color: 'red',
      bgGradient: 'from-red-500 to-pink-600'
    }
  ];

  const tiposCliente = [
    {
      id: 'desconfiado',
      nombre: 'Desconfiado',
      emoji: '😬',
      descripcion: 'Nunca trabajó con agencias',
      modeloIdeal: 2,
      color: 'red',
      bgGradient: 'from-red-400 to-orange-500'
    },
    {
      id: 'quemado',
      nombre: 'Quemado',
      emoji: '😤',
      descripcion: 'Tuvo malas experiencias',
      modeloIdeal: 4,
      color: 'orange',
      bgGradient: 'from-orange-400 to-yellow-500'
    },
    {
      id: 'profesional',
      nombre: 'Profesional',
      emoji: '💼',
      descripcion: 'Tiene equipo y presupuesto',
      modelosIdeales: [3, 5],
      color: 'blue',
      bgGradient: 'from-blue-400 to-cyan-500'
    }
  ];

  // Calcular recomendación inteligente
  const calcularRecomendacion = (): Model | null => {
    let score: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    // Nivel de experiencia
    if (nivelSeleccionado === 'principiante') {
      score[2] += 3;
      score[4] += 2;
      score[1] += 1;
    } else if (nivelSeleccionado === 'intermedio') {
      score[3] += 3;
      score[4] += 2;
      score[2] += 1;
    } else if (nivelSeleccionado === 'avanzado') {
      score[5] += 3;
      score[3] += 2;
      score[1] += 1;
    }

    // Tipo de cliente
    if (tipoClienteSeleccionado === 'desconfiado') {
      score[2] += 3;
      score[4] += 1;
    } else if (tipoClienteSeleccionado === 'quemado') {
      score[4] += 3;
      score[2] += 1;
    } else if (tipoClienteSeleccionado === 'profesional') {
      score[3] += 2;
      score[5] += 2;
    }

    // Quiz answers
    if (quizAnswers.casosExito === true) {
      score[2] += 2;
      score[5] += 1;
    } else if (quizAnswers.casosExito === false) {
      score[1] += 2;
      score[4] += 1;
    }

    if (quizAnswers.medirResultados === true) {
      score[2] += 2;
      score[3] += 2;
      score[5] += 1;
    } else if (quizAnswers.medirResultados === false) {
      score[1] += 2;
    }

    if (quizAnswers.asumirRiesgo === true) {
      score[2] += 2;
      score[5] += 2;
    } else if (quizAnswers.asumirRiesgo === false) {
      score[1] += 2;
      score[4] += 1;
    }

    if (quizAnswers.tieneEquipo === true) {
      score[5] += 3;
      score[3] += 1;
    } else if (quizAnswers.tieneEquipo === false) {
      score[1] += 1;
      score[2] += 1;
      score[4] += 1;
    }

    if (quizAnswers.clientesActuales !== null) {
      if (quizAnswers.clientesActuales < 5) {
        score[2] += 2;
        score[4] += 2;
      } else if (quizAnswers.clientesActuales < 15) {
        score[3] += 2;
        score[4] += 1;
      } else {
        score[5] += 2;
        score[3] += 1;
      }
    }

    // Encontrar el modelo con mayor score
    const maxScore = Math.max(...Object.values(score));
    const recommendedId = Object.keys(score).find(key => score[Number(key)] === maxScore);

    return modelos.find(m => m.id === Number(recommendedId)) || null;
  };

  const modeloRecomendado = calcularRecomendacion();

  // Calcular progreso
  useEffect(() => {
    let newProgress = 0;
    if (currentScreen === 'intro') newProgress = 0;
    else if (currentScreen === 'explore') newProgress = 20;
    else if (currentScreen === 'analyzer') newProgress = 40;
    else if (currentScreen === 'quiz') newProgress = 60;
    else if (currentScreen === 'recommendation') newProgress = 80;
    else if (currentScreen === 'bonus') newProgress = 90;
    else if (currentScreen === 'complete') newProgress = 100;
    
    setProgress(newProgress);
  }, [currentScreen]);

  // Verificar si puede avanzar
  const canAdvance = () => {
    if (currentScreen === 'analyzer') {
      return nivelSeleccionado !== null && tipoClienteSeleccionado !== null;
    }
    if (currentScreen === 'quiz') {
      return Object.values(quizAnswers).every(v => v !== null);
    }
    return true;
  };

  // Toggle compare models
  const toggleCompare = (id: number) => {
    if (compareModels.includes(id)) {
      setCompareModels(compareModels.filter(m => m !== id));
    } else if (compareModels.length < 3) {
      setCompareModels([...compareModels, id]);
    }
  };

  // Render Particles
  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            opacity: 0.1 + Math.random() * 0.3
          }}
        />
      ))}
    </div>
  );

  // INTRO SCREEN
  const IntroScreen = () => (
    <div className="relative min-h-screen flex items-center justify-center p-8">
      <Particles />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
        <div className="inline-block px-6 py-2 bg-green-500/20 rounded-full border border-green-500/30 backdrop-blur-sm animate-pulse">
          <p className="text-sm font-bold text-green-400 tracking-wider">
            MÓDULO 9 · MONETIZACIÓN INTELIGENTE
          </p>
        </div>

        <h1 className="text-6xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-shimmer">
          💰 Guía Premium<br />Cobro Online
        </h1>

        <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Descubrí el modelo de cobro perfecto para tu agencia con nuestro sistema de análisis inteligente
        </p>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          {[
            { icon: <Target className="w-8 h-8" />, title: '5 Modelos', desc: 'Analizados' },
            { icon: <Activity className="w-8 h-8" />, title: 'Sistema IA', desc: 'Recomendación' },
            { icon: <Trophy className="w-8 h-8" />, title: 'Estrategia', desc: 'Personalizada' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-green-400 mb-3 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setCurrentScreen('explore')}
          className="group relative px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-xl text-white shadow-2xl shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Comenzar Análisis
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <p className="text-sm text-gray-500 pt-4">
          ⏱️ 15 minutos · 🎯 Recomendación personalizada incluida
        </p>
      </div>
    </div>
  );

  // EXPLORE SCREEN
  const ExploreScreen = () => (
    <div className="relative min-h-screen p-8">
      <Particles />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            🧱 Los 5 Modelos Que Funcionan
          </h2>
          <p className="text-xl text-gray-400">
            Explorá cada modelo en detalle y descubrí cuál se adapta mejor a tu situación
          </p>
        </div>

        {/* Compare Toggle */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              compareMode
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            {compareMode ? '✓ Modo Comparación' : 'Comparar Modelos'}
          </button>
          
          {compareMode && compareModels.length >= 2 && (
            <button
              onClick={() => {/* Show comparison view */}}
              className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform"
            >
              Ver Comparación ({compareModels.length})
            </button>
          )}
        </div>

        {/* Models Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {modelos.map((modelo, index) => (
            <div
              key={modelo.id}
              className={`group relative p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 animate-fadeIn cursor-pointer ${
                selectedModel === modelo.id
                  ? 'bg-gray-800/80 border-green-500 shadow-2xl shadow-green-500/30'
                  : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600 hover:shadow-xl'
              } ${
                compareMode && compareModels.includes(modelo.id)
                  ? 'ring-4 ring-purple-500/50'
                  : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                if (compareMode) {
                  toggleCompare(modelo.id);
                } else {
                  setSelectedModel(selectedModel === modelo.id ? null : modelo.id);
                }
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${modelo.bgGradient} flex items-center justify-center text-3xl shadow-lg`}>
                    {modelo.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{modelo.nombre}</h3>
                    <p className="text-sm text-gray-400">{modelo.descripcion}</p>
                  </div>
                </div>
                
                {compareMode && (
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    compareModels.includes(modelo.id)
                      ? 'bg-purple-600 border-purple-600'
                      : 'border-gray-600'
                  }`}>
                    {compareModels.includes(modelo.id) && <Check className="w-4 h-4 text-white" />}
                  </div>
                )}
              </div>

              {/* Ideal Para */}
              <div className={`p-4 rounded-xl bg-gradient-to-r ${modelo.bgGradient} mb-4`}>
                <p className="font-bold text-white text-sm">💡 Ideal si: {modelo.idealSi}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Complejidad</div>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < modelo.complejidad ? 'bg-yellow-400' : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center p-2 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Riesgo</div>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < modelo.riesgo ? 'bg-red-400' : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center p-2 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Escalabilidad</div>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < modelo.escalabilidad ? 'bg-green-400' : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Precio */}
              <div className="mb-4 p-3 bg-gray-900/50 rounded-lg text-center">
                <p className="text-xs text-gray-400 mb-1">Rango de Precio</p>
                <p className="text-lg font-bold text-white">{modelo.precio}</p>
              </div>

              {/* Expandible Content */}
              {selectedModel === modelo.id && !compareMode && (
                <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Ventajas:
                      </p>
                      <ul className="space-y-2">
                        {modelo.ventajas.map((ventaja, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 mt-1">+</span>
                            {ventaja}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Desventajas:
                      </p>
                      <ul className="space-y-2">
                        {modelo.desventajas.map((desventaja, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-red-400 mt-1">-</span>
                            {desventaja}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setCurrentScreen('analyzer')}
            className="group px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-xl text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-3">
              Siguiente: Análisis Personalizado
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // ANALYZER SCREEN
  const AnalyzerScreen = () => (
    <div className="relative min-h-screen p-8">
      <Particles />
      
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎯 Analizador Inteligente
          </h2>
          <p className="text-xl text-gray-400">
            Seleccioná tu perfil para obtener una recomendación precisa
          </p>
        </div>

        {/* Nivel de Experiencia */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-green-400" />
            Tu Nivel de Experiencia
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {niveles.map((nivel) => (
              <button
                key={nivel.id}
                onClick={() => setNivelSeleccionado(nivel.id)}
                className={`group relative p-6 rounded-xl transition-all duration-300 ${
                  nivelSeleccionado === nivel.id
                    ? `bg-gradient-to-br ${nivel.bgGradient} shadow-2xl scale-105`
                    : 'bg-gray-900/50 border-2 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{nivel.emoji}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{nivel.nombre}</h4>
                  <p className="text-sm text-gray-300 mb-4">{nivel.descripcion}</p>
                  
                  {nivelSeleccionado === nivel.id && (
                    <div className="animate-fadeIn">
                      <div className="w-8 h-8 mx-auto bg-white rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de Cliente */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-blue-400" />
            Tipo de Cliente Principal
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {tiposCliente.map((tipo) => (
              <button
                key={tipo.id}
                onClick={() => setTipoClienteSeleccionado(tipo.id)}
                className={`group relative p-6 rounded-xl transition-all duration-300 ${
                  tipoClienteSeleccionado === tipo.id
                    ? `bg-gradient-to-br ${tipo.bgGradient} shadow-2xl scale-105`
                    : 'bg-gray-900/50 border-2 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{tipo.emoji}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{tipo.nombre}</h4>
                  <p className="text-sm text-gray-300 mb-4">{tipo.descripcion}</p>
                  
                  {tipoClienteSeleccionado === tipo.id && (
                    <div className="animate-fadeIn">
                      <div className="w-8 h-8 mx-auto bg-white rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => canAdvance() && setCurrentScreen('quiz')}
            disabled={!canAdvance()}
            className={`group px-12 py-5 rounded-xl font-bold text-xl text-white shadow-2xl transition-all duration-300 ${
              canAdvance()
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-105'
                : 'bg-gray-700 cursor-not-allowed opacity-50'
            }`}
          >
            <span className="flex items-center gap-3">
              {canAdvance() ? (
                <>
                  Siguiente: Quiz Rápido
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  <Lock className="w-6 h-6" />
                  Completá ambas selecciones
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // QUIZ SCREEN
  const QuizScreen = () => {
    const questions = [
      {
        id: 'casosExito',
        question: '¿Tenés casos de éxito comprobables para mostrar?',
        icon: <Award className="w-6 h-6" />,
        color: 'from-yellow-500 to-orange-500'
      },
      {
        id: 'medirResultados',
        question: '¿Podés medir y reportar resultados de forma clara?',
        icon: <BarChart3 className="w-6 h-6" />,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'asumirRiesgo',
        question: '¿Estás dispuesto a asumir riesgo para crecer más rápido?',
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'from-green-500 to-emerald-500'
      },
      {
        id: 'tieneEquipo',
        question: '¿Tenés un equipo que te puede ayudar?',
        icon: <Users className="w-6 h-6" />,
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 'clientesActuales',
        question: '¿Cuántos clientes tenés actualmente?',
        icon: <Target className="w-6 h-6" />,
        color: 'from-red-500 to-orange-500',
        type: 'number'
      }
    ];

    const answeredCount = Object.values(quizAnswers).filter(v => v !== null).length;
    const quizProgress = (answeredCount / questions.length) * 100;

    return (
      <div className="relative min-h-screen p-8">
        <Particles />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              ✅ Quiz Rápido
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              5 preguntas para afinar tu recomendación perfecta
            </p>
            
            {/* Quiz Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{answeredCount} de {questions.length}</span>
                <span>{Math.round(quizProgress)}%</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500 rounded-full"
                  style={{ width: `${quizProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${q.color} flex items-center justify-center text-white flex-shrink-0`}>
                    {q.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-white mb-1">
                      {index + 1}. {q.question}
                    </p>
                  </div>
                </div>

                {q.type === 'number' ? (
                  <div className="flex gap-3">
                    {[
                      { label: '0-5', value: 3 },
                      { label: '5-15', value: 10 },
                      { label: '15+', value: 20 }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setQuizAnswers({...quizAnswers, [q.id]: option.value})}
                        className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                          quizAnswers[q.id as keyof QuizAnswer] === option.value
                            ? `bg-gradient-to-r ${q.color} text-white shadow-lg scale-105`
                            : 'bg-gray-900/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setQuizAnswers({...quizAnswers, [q.id]: true})}
                      className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                        quizAnswers[q.id as keyof QuizAnswer] === true
                          ? 'bg-green-600 text-white shadow-lg shadow-green-500/50 scale-105'
                          : 'bg-gray-900/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      ✓ Sí
                    </button>
                    <button
                      onClick={() => setQuizAnswers({...quizAnswers, [q.id]: false})}
                      className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                        quizAnswers[q.id as keyof QuizAnswer] === false
                          ? 'bg-red-600 text-white shadow-lg shadow-red-500/50 scale-105'
                          : 'bg-gray-900/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      ✗ No
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={() => canAdvance() && setCurrentScreen('recommendation')}
              disabled={!canAdvance()}
              className={`group px-12 py-5 rounded-xl font-bold text-xl text-white shadow-2xl transition-all duration-300 ${
                canAdvance()
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 shadow-yellow-500/50 hover:shadow-yellow-500/80 hover:scale-105'
                  : 'bg-gray-700 cursor-not-allowed opacity-50'
              }`}
            >
              <span className="flex items-center gap-3">
                {canAdvance() ? (
                  <>
                    Ver Mi Recomendación
                    <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6" />
                    Completá todas las preguntas
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // RECOMMENDATION SCREEN
  const RecommendationScreen = () => {
    if (!modeloRecomendado) return null;

    return (
      <div className="relative min-h-screen p-8">
        <Particles />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-block px-6 py-2 bg-green-500/20 rounded-full border border-green-500/30 backdrop-blur-sm mb-4 animate-pulse">
              <p className="text-sm font-bold text-green-400 tracking-wider">
                ✨ ANÁLISIS COMPLETADO
              </p>
            </div>
            <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Tu Modelo Ideal
            </h2>
            <p className="text-xl text-gray-400">
              Basado en tu perfil y respuestas, este es el modelo perfecto para ti
            </p>
          </div>

          {/* Main Recommendation Card */}
          <div className={`relative p-10 rounded-3xl bg-gradient-to-br ${modeloRecomendado.bgGradient} shadow-2xl animate-fadeIn`}>
            <div className="absolute inset-0 bg-black/20 rounded-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="text-9xl mb-6 animate-bounce">{modeloRecomendado.emoji}</div>
                <h3 className="text-4xl font-black text-white mb-3">{modeloRecomendado.nombre}</h3>
                <p className="text-xl text-white/90 mb-6">{modeloRecomendado.descripcion}</p>
                
                <div className="inline-block px-8 py-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <p className="text-2xl font-bold text-white">{modeloRecomendado.precio}</p>
                </div>
              </div>

              {/* Why This Model */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  Por qué este modelo es perfecto para ti:
                </h4>
                <p className="text-lg text-white/90">{modeloRecomendado.idealSi}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-3xl font-black text-white mb-1">{modeloRecomendado.complejidad}/5</div>
                  <div className="text-sm text-white/80">Complejidad</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-3xl font-black text-white mb-1">{modeloRecomendado.riesgo}/5</div>
                  <div className="text-sm text-white/80">Riesgo</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-3xl font-black text-white mb-1">{modeloRecomendado.escalabilidad}/5</div>
                  <div className="text-sm text-white/80">Escalabilidad</div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Ventajas Clave:
                  </h4>
                  <ul className="space-y-2">
                    {modeloRecomendado.ventajas.map((ventaja, idx) => (
                      <li key={idx} className="text-white/90 flex items-start gap-2">
                        <span className="text-green-300 mt-1">✓</span>
                        {ventaja}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Puntos a Considerar:
                  </h4>
                  <ul className="space-y-2">
                    {modeloRecomendado.desventajas.map((desventaja, idx) => (
                      <li key={idx} className="text-white/90 flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">!</span>
                        {desventaja}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Rocket className="w-7 h-7 text-blue-400" />
              Plan de Acción Inmediato
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: '1', title: 'Preparar Propuesta', desc: 'Creá tu oferta basada en este modelo' },
                { step: '2', title: 'Testear con Cliente', desc: 'Probalo con tu próximo prospect' },
                { step: '3', title: 'Iterar y Escalar', desc: 'Ajustá según feedback y crecé' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                  <div className="text-3xl font-black text-green-400 mb-2">{item.step}</div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Buttons */}
          <div className="flex gap-4 justify-center pt-8">
            <button
              onClick={() => setCurrentScreen('bonus')}
              className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-3">
                Ver BONUS: Prompt IA
                <Sparkles className="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // BONUS SCREEN
  const BonusScreen = () => {
    const promptTemplate = `Ayudame a implementar el modelo "${modeloRecomendado?.nombre}" para mi agencia de marketing.

Mi situación:
- Nivel: ${nivelSeleccionado}
- Tipo de cliente principal: ${tipoClienteSeleccionado}
- Tengo casos de éxito: ${quizAnswers.casosExito ? 'Sí' : 'No'}
- Puedo medir resultados: ${quizAnswers.medirResultados ? 'Sí' : 'No'}
- Clientes actuales: ${quizAnswers.clientesActuales}

Necesito:
1. Una propuesta de valor específica para este modelo
2. Rangos de precio recomendados según mi mercado
3. Estructura de contrato clara
4. Estrategia de cierre para este tipo de cliente
5. KPIs para medir éxito del modelo

Por favor, dame un plan accionable y específico.`;

    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText(promptTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative min-h-screen p-8">
        <Particles />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-block px-6 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm mb-4">
              <p className="text-sm font-bold text-purple-400 tracking-wider">
                🎁 CONTENIDO BONUS
              </p>
            </div>
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Prompt IA Personalizado
            </h2>
            <p className="text-xl text-gray-400">
              Usá este prompt con ChatGPT o Claude para profundizar en tu estrategia
            </p>
          </div>

          {/* Prompt Card */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Tu Prompt Personalizado:
              </h3>
              <div className="bg-black/30 p-6 rounded-xl">
                <pre className="text-sm text-white/90 whitespace-pre-wrap font-mono">
                  {promptTemplate}
                </pre>
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              {copied ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  ¡Copiado al portapapeles!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Copiar Prompt
                  <Sparkles className="w-5 h-5" />
                </span>
              )}
            </button>
          </div>

          {/* How to Use */}
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6">
              📋 Cómo usar este prompt:
            </h3>
            <div className="space-y-4">
              {[
                { num: '1', text: 'Copiá el prompt completo' },
                { num: '2', text: 'Pegalo en ChatGPT 4 o Claude' },
                { num: '3', text: 'Recibí una estrategia personalizada en segundos' },
                { num: '4', text: 'Implementá los consejos en tu agencia' }
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white">
                    {step.num}
                  </div>
                  <p className="text-gray-300">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={() => setCurrentScreen('complete')}
              className="group px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-xl text-white shadow-2xl shadow-green-500/50 hover:shadow-green-500/80 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-3">
                Completar Módulo
                <Trophy className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // COMPLETE SCREEN
  const CompleteScreen = () => {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <Particles />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
          {/* Trophy Animation */}
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-red-500/30 animate-pulse" />
            <div className="relative text-9xl animate-bounce">
              🏆
            </div>
          </div>

          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            ¡Módulo Completado!
          </h1>

          <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
            Ahora tenés el modelo de cobro perfecto para tu agencia y una estrategia clara para implementarlo
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {[
              { icon: <Target className="w-8 h-8" />, label: 'Modelo Seleccionado', value: modeloRecomendado?.nombre || 'N/A' },
              { icon: <CheckCircle className="w-8 h-8" />, label: 'Quiz Completado', value: '5/5' },
              { icon: <Sparkles className="w-8 h-8" />, label: 'Nivel', value: nivelSeleccionado || 'N/A' }
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-green-400 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              🎯 Próximos Pasos:
            </h2>
            <div className="space-y-4 text-left">
              {[
                'Implementá tu modelo elegido con el próximo cliente',
                'Usá el prompt IA para crear tu propuesta perfecta',
                'Documentá tus resultados y ajustá según necesites',
                'Escalá gradualmente mientras mantenés la calidad'
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-white">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-lg">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="pt-8">
            <p className="text-xl text-gray-400 mb-6">
              ¿Listo para dominar completamente tu negocio online?
            </p>
            <button
              onClick={() => {/* Navigate to next module */}}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-xl text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 hover:scale-105"
            >
              Continuar al Siguiente Módulo
            </button>
          </div>

          {/* Restart Option */}
          <button
            onClick={() => {
              setCurrentScreen('intro');
              setSelectedModel(null);
              setNivelSeleccionado(null);
              setTipoClienteSeleccionado(null);
              setQuizAnswers({
                casosExito: null,
                medirResultados: null,
                asumirRiesgo: null,
                tieneEquipo: null,
                clientesActuales: null
              });
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Volver a hacer el análisis
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Progress Bar */}
      {currentScreen !== 'intro' && currentScreen !== 'complete' && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="bg-gray-900/80 backdrop-blur-sm px-6 py-3 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const screens: Screen[] = ['intro', 'explore', 'analyzer', 'quiz', 'recommendation', 'bonus', 'complete'];
                  const currentIndex = screens.indexOf(currentScreen);
                  if (currentIndex > 0) setCurrentScreen(screens[currentIndex - 1]);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Atrás
              </button>
              <span className="text-sm text-gray-400">Módulo 9: Guía de Cobro Online</span>
            </div>
            <span className="text-sm font-bold text-green-400">{progress}% Completado</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={currentScreen !== 'intro' && currentScreen !== 'complete' ? 'pt-16' : ''}>
        {currentScreen === 'intro' && <IntroScreen />}
        {currentScreen === 'explore' && <ExploreScreen />}
        {currentScreen === 'analyzer' && <AnalyzerScreen />}
        {currentScreen === 'quiz' && <QuizScreen />}
        {currentScreen === 'recommendation' && <RecommendationScreen />}
        {currentScreen === 'bonus' && <BonusScreen />}
        {currentScreen === 'complete' && <CompleteScreen />}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export const guiaCobrarOnlineMetadata = {
  id: 9,
  title: "Guía para Cobrar Online",
  type: "document" as const,
  duration: "20 min"
};