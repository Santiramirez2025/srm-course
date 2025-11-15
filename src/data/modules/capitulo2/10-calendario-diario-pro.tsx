import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Target, TrendingUp, Coffee, Moon, Sun, Check, 
  Copy, Download, Sparkles, Zap, AlertTriangle, Award, Star,
  ChevronRight, ArrowRight, Trophy, Activity, BarChart3, Timer,
  Bell, CheckCircle, X, Plus, Edit3, Save, RefreshCw, Upload,
  Filter, Eye, EyeOff, Settings, Lightbulb, Flame
} from 'lucide-react';

type Screen = 'intro' | 'explorer' | 'dayview' | 'customizer' | 'generator' | 'bonus' | 'complete';

interface TimeBlock {
  tiempo: string;
  actividad: string;
  emoji: string;
  categoria: string;
  duracion?: number;
  prioridad?: 'alta' | 'media' | 'baja';
}

interface DaySchedule {
  nombre: string;
  emoji: string;
  subtitulo: string;
  color: string;
  bgGradient: string;
  horarios: TimeBlock[];
  stats?: {
    trabajoProfundo: number;
    descanso: number;
    personal: number;
    salud: number;
  };
}

interface UserProfile {
  despertarHora: string;
  dormirHora: string;
  tipoTrabajo: 'remoto' | 'oficina' | 'hibrido';
  prioridades: string[];
  diasLibres: string[];
}

export const CalendarioDiarioProContent = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [progress, setProgress] = useState(0);
  const [diaSeleccionado, setDiaSeleccionado] = useState<string>('lunes-viernes');
  const [copiado, setCopiado] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'blocks'>('timeline');
  const [editMode, setEditMode] = useState(false);
  const [customSchedule, setCustomSchedule] = useState<TimeBlock[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    despertarHora: '06:30',
    dormirHora: '22:00',
    tipoTrabajo: 'remoto',
    prioridades: [],
    diasLibres: []
  });
  const [streak, setStreak] = useState(0);
  const [completedDays, setCompletedDays] = useState<string[]>([]);

  const calendarios: { [key: string]: DaySchedule } = {
    'lunes-viernes': {
      nombre: 'Lunes a Viernes',
      emoji: '💼',
      subtitulo: 'Ritmo Alto con Foco',
      color: 'purple',
      bgGradient: 'from-purple-600 via-pink-600 to-fuchsia-700',
      horarios: [
        { tiempo: '06:30 – 07:00', actividad: 'Despertar + hidratación + afirmaciones', emoji: '☀️', categoria: 'ritual', duracion: 30, prioridad: 'alta' },
        { tiempo: '07:00 – 08:00', actividad: 'Entrenamiento físico + ducha', emoji: '🏋️', categoria: 'salud', duracion: 60, prioridad: 'alta' },
        { tiempo: '08:00 – 08:30', actividad: 'Desayuno saludable', emoji: '🥗', categoria: 'salud', duracion: 30, prioridad: 'media' },
        { tiempo: '08:30 – 09:00', actividad: 'Planificación del día (Prioridades)', emoji: '✍️', categoria: 'planificacion', duracion: 30, prioridad: 'alta' },
        { tiempo: '09:00 – 11:00', actividad: 'Bloque de trabajo profundo', emoji: '🎯', categoria: 'trabajo', duracion: 120, prioridad: 'alta' },
        { tiempo: '11:00 – 11:30', actividad: 'Pausa activa', emoji: '☕', categoria: 'descanso', duracion: 30, prioridad: 'media' },
        { tiempo: '11:30 – 13:00', actividad: 'Continuación del trabajo', emoji: '💻', categoria: 'trabajo', duracion: 90, prioridad: 'alta' },
        { tiempo: '13:00 – 14:00', actividad: 'Almuerzo desconectado (nada de pantallas)', emoji: '🍽️', categoria: 'salud', duracion: 60, prioridad: 'alta' },
        { tiempo: '14:00 – 15:30', actividad: 'Bloque creativo o resolución de problemas', emoji: '🧠', categoria: 'trabajo', duracion: 90, prioridad: 'media' },
        { tiempo: '15:30 – 16:00', actividad: 'Descanso / siesta breve / paseo', emoji: '🚶', categoria: 'descanso', duracion: 30, prioridad: 'media' },
        { tiempo: '16:00 – 17:30', actividad: 'Continuación del trabajo', emoji: '📊', categoria: 'trabajo', duracion: 90, prioridad: 'media' },
        { tiempo: '17:30 – 18:00', actividad: 'Revisión del día + plan para mañana', emoji: '📝', categoria: 'planificacion', duracion: 30, prioridad: 'alta' },
        { tiempo: '18:00 – 19:30', actividad: 'Cena ligera + tiempo con seres queridos / relax', emoji: '❤️', categoria: 'personal', duracion: 90, prioridad: 'media' },
        { tiempo: '20:00 – 21:00', actividad: 'Rutina nocturna: journaling, lectura, estiramientos', emoji: '📖', categoria: 'ritual', duracion: 60, prioridad: 'alta' },
        { tiempo: '21:00 – 06:30', actividad: 'Sueño profundo reparador', emoji: '😴', categoria: 'descanso', duracion: 570, prioridad: 'alta' }
      ],
      stats: {
        trabajoProfundo: 390,
        descanso: 630,
        personal: 90,
        salud: 150
      }
    },
    'sabado': {
      nombre: 'Sábado',
      emoji: '🎨',
      subtitulo: 'Día de Balance y Recarga',
      color: 'green',
      bgGradient: 'from-green-600 via-emerald-600 to-teal-700',
      horarios: [
        { tiempo: '08:00 – 09:00', actividad: 'Rutina de mañana tranquila', emoji: '🌅', categoria: 'ritual', duracion: 60, prioridad: 'media' },
        { tiempo: '09:00 – 10:30', actividad: 'Revisión de la semana (logros, aprendizajes, mejoras)', emoji: '📊', categoria: 'planificacion', duracion: 90, prioridad: 'alta' },
        { tiempo: '10:30 – 13:00', actividad: 'Tareas personales, compras, organización', emoji: '🏠', categoria: 'personal', duracion: 150, prioridad: 'media' },
        { tiempo: '13:00 – 18:00', actividad: 'Tiempo libre de calidad (hobbies, salidas, naturaleza)', emoji: '🌳', categoria: 'personal', duracion: 300, prioridad: 'alta' },
        { tiempo: '18:00 – 21:00', actividad: 'Cena especial, socializar, desconexión digital', emoji: '🍷', categoria: 'personal', duracion: 180, prioridad: 'media' },
        { tiempo: '21:00 – 08:00', actividad: 'Dormir', emoji: '😴', categoria: 'descanso', duracion: 660, prioridad: 'alta' }
      ],
      stats: {
        trabajoProfundo: 0,
        descanso: 660,
        personal: 630,
        salud: 60
      }
    },
    'domingo': {
      nombre: 'Domingo',
      emoji: '🧘',
      subtitulo: 'Preparación y Recarga Total',
      color: 'blue',
      bgGradient: 'from-blue-600 via-indigo-600 to-purple-700',
      horarios: [
        { tiempo: '08:00 – 09:30', actividad: 'Rutina slow + journaling de gratitud', emoji: '🌞', categoria: 'ritual', duracion: 90, prioridad: 'alta' },
        { tiempo: '09:30 – 11:00', actividad: 'Planificación semanal: objetivos + bloques de tiempo', emoji: '🧠', categoria: 'planificacion', duracion: 90, prioridad: 'alta' },
        { tiempo: '11:00 – 13:00', actividad: 'Inspiración (podcast, lectura estratégica, ideas nuevas)', emoji: '📚', categoria: 'personal', duracion: 120, prioridad: 'media' },
        { tiempo: '13:00 – 18:00', actividad: 'Libre total (sin obligaciones, 100% para recargar energía)', emoji: '🔋', categoria: 'personal', duracion: 300, prioridad: 'alta' },
        { tiempo: '18:00 – 20:00', actividad: 'Preparar la semana: orden físico y mental', emoji: '🗂️', categoria: 'planificacion', duracion: 120, prioridad: 'media' },
        { tiempo: '20:00 – 21:00', actividad: 'Ritual nocturno (baño, visualización semanal)', emoji: '🛁', categoria: 'ritual', duracion: 60, prioridad: 'alta' },
        { tiempo: '21:00 – 08:00', actividad: 'Dormir', emoji: '😴', categoria: 'descanso', duracion: 660, prioridad: 'alta' }
      ],
      stats: {
        trabajoProfundo: 0,
        descanso: 660,
        personal: 420,
        salud: 150
      }
    }
  };

  const getCategoriaColor = (categoria: string) => {
    const colores = {
      ritual: 'from-yellow-500 to-orange-500',
      salud: 'from-green-500 to-emerald-500',
      planificacion: 'from-blue-500 to-cyan-500',
      trabajo: 'from-purple-500 to-pink-500',
      descanso: 'from-indigo-500 to-blue-500',
      personal: 'from-red-500 to-pink-500'
    };
    return colores[categoria as keyof typeof colores] || 'from-gray-500 to-gray-600';
  };

  const getPrioridadColor = (prioridad?: string) => {
    if (prioridad === 'alta') return 'border-red-500 bg-red-500/10';
    if (prioridad === 'media') return 'border-yellow-500 bg-yellow-500/10';
    return 'border-green-500 bg-green-500/10';
  };

  // Calcular progreso
  useEffect(() => {
    let newProgress = 0;
    if (currentScreen === 'intro') newProgress = 0;
    else if (currentScreen === 'explorer') newProgress = 20;
    else if (currentScreen === 'dayview') newProgress = 40;
    else if (currentScreen === 'customizer') newProgress = 60;
    else if (currentScreen === 'generator') newProgress = 80;
    else if (currentScreen === 'bonus') newProgress = 90;
    else if (currentScreen === 'complete') newProgress = 100;
    
    setProgress(newProgress);
  }, [currentScreen]);

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
        <div className="inline-block px-6 py-2 bg-indigo-500/20 rounded-full border border-indigo-500/30 backdrop-blur-sm animate-pulse">
          <p className="text-sm font-bold text-indigo-400 tracking-wider">
            MÓDULO 10 · SISTEMA DE ALTO RENDIMIENTO
          </p>
        </div>

        <h1 className="text-6xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-shimmer">
          📅 Calendario Diario<br />PRO
        </h1>

        <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Tu sistema anticaos: diseñado para productividad, enfoque mental, salud física y tiempo personal
        </p>

        <div className="grid md:grid-cols-3 gap-6 pt-8">
          {[
            { icon: <Target className="w-8 h-8" />, title: 'Estructura', desc: 'Día perfectamente diseñado' },
            { icon: <Activity className="w-8 h-8" />, title: 'Balance', desc: 'Trabajo + vida + salud' },
            { icon: <Trophy className="w-8 h-8" />, title: 'Resultados', desc: 'Alto rendimiento sostenible' }
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-indigo-400 mb-3 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">
            🧠 ¿Por qué un calendario diario cambia tu vida?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              'Claridad sobre tus prioridades',
              'Eliminar improvisación que consume energía',
              'Crear foco, ritmo y estructura',
              'Terminar el día con sensación de avance real'
            ].map((texto, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">{texto}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCurrentScreen('explorer')}
          className="group relative px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-xl text-white shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/80 transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Explorar Calendarios
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <p className="text-sm text-gray-500 pt-4">
          ⏱️ 15 minutos · 🎯 Sistema personalizable incluido
        </p>
      </div>
    </div>
  );

  // EXPLORER SCREEN
  const ExplorerScreen = () => (
    <div className="relative min-h-screen p-8">
      <Particles />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            🗓️ Explora los Calendarios
          </h2>
          <p className="text-xl text-gray-400">
            Tres calendarios profesionales diseñados para alto rendimiento
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Días Activos', value: '7', icon: <Calendar className="w-5 h-5" />, color: 'blue' },
            { label: 'Bloques Profundos', value: '24', icon: <Target className="w-5 h-5" />, color: 'purple' },
            { label: 'Horas Descanso', value: '56', icon: <Moon className="w-5 h-5" />, color: 'indigo' },
            { label: 'Balance Score', value: '95%', icon: <Award className="w-5 h-5" />, color: 'green' }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
              <div className={`text-${stat.color}-400 mb-2`}>{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Calendar Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {Object.entries(calendarios).map(([key, calendario], index) => (
            <div
              key={key}
              className={`group relative p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 animate-fadeIn cursor-pointer ${
                diaSeleccionado === key
                  ? 'bg-gray-800/80 border-indigo-500 shadow-2xl shadow-indigo-500/30 scale-105'
                  : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600 hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                setDiaSeleccionado(key);
                setTimeout(() => setCurrentScreen('dayview'), 300);
              }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-7xl mb-4 animate-bounce">{calendario.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{calendario.nombre}</h3>
                <p className="text-gray-400">{calendario.subtitulo}</p>
              </div>

              {/* Stats Preview */}
              {calendario.stats && (
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">💼 Trabajo Profundo</span>
                    <span className="text-white font-bold">{Math.floor(calendario.stats.trabajoProfundo / 60)}h</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">😴 Descanso</span>
                    <span className="text-white font-bold">{Math.floor(calendario.stats.descanso / 60)}h</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">❤️ Personal</span>
                    <span className="text-white font-bold">{Math.floor(calendario.stats.personal / 60)}h</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">🏋️ Salud</span>
                    <span className="text-white font-bold">{Math.floor(calendario.stats.salud / 60)}h</span>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${calendario.bgGradient} transition-all duration-500`}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* CTA */}
              <div className={`text-center p-3 rounded-lg bg-gradient-to-r ${calendario.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity`}>
                <p className="text-white font-bold">Ver Detalles →</p>
              </div>

              {/* Selected Badge */}
              {diaSeleccionado === key && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center animate-fadeIn">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setCurrentScreen('dayview')}
            disabled={!diaSeleccionado}
            className={`group px-12 py-5 rounded-xl font-bold text-xl text-white shadow-2xl transition-all duration-300 ${
              diaSeleccionado
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/50 hover:shadow-blue-500/80 hover:scale-105'
                : 'bg-gray-700 cursor-not-allowed opacity-50'
            }`}
          >
            <span className="flex items-center gap-3">
              Ver Calendario Completo
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // DAYVIEW SCREEN
  const DayViewScreen = () => {
    const calendarioActual = calendarios[diaSeleccionado];
    if (!calendarioActual) return null;

    return (
      <div className="relative min-h-screen p-8">
        <Particles />
        
        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className={`p-8 rounded-2xl bg-gradient-to-r ${calendarioActual.bgGradient} shadow-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{calendarioActual.emoji}</div>
                <div>
                  <h2 className="text-4xl font-black text-white mb-1">{calendarioActual.nombre}</h2>
                  <p className="text-xl text-white/80">{calendarioActual.subtitulo}</p>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-2 rounded font-bold transition-all ${
                    viewMode === 'timeline'
                      ? 'bg-white text-gray-900'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode('blocks')}
                  className={`px-4 py-2 rounded font-bold transition-all ${
                    viewMode === 'blocks'
                      ? 'bg-white text-gray-900'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Bloques
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            {calendarioActual.stats && (
              <div className="grid grid-cols-4 gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{Math.floor(calendarioActual.stats.trabajoProfundo / 60)}h</div>
                  <div className="text-sm text-white/70">Trabajo Profundo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{Math.floor(calendarioActual.stats.descanso / 60)}h</div>
                  <div className="text-sm text-white/70">Descanso</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{Math.floor(calendarioActual.stats.personal / 60)}h</div>
                  <div className="text-sm text-white/70">Personal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{Math.floor(calendarioActual.stats.salud / 60)}h</div>
                  <div className="text-sm text-white/70">Salud</div>
                </div>
              </div>
            )}
          </div>

          {/* Timeline View */}
          {viewMode === 'timeline' && (
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
              <div className="space-y-2">
                {calendarioActual.horarios.map((horario, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 animate-fadeIn hover:scale-[1.02] ${getPrioridadColor(horario.prioridad)}`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {/* Time */}
                    <div className="flex-shrink-0 w-32 text-center">
                      <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm font-bold text-white">{horario.tiempo}</p>
                    </div>

                    {/* Category Badge */}
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoriaColor(horario.categoria)} text-white text-xs font-bold`}>
                      {horario.categoria}
                    </div>

                    {/* Activity */}
                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-3xl">{horario.emoji}</span>
                      <p className="text-white font-medium">{horario.actividad}</p>
                    </div>

                    {/* Duration */}
                    {horario.duracion && (
                      <div className="flex-shrink-0 flex items-center gap-2 bg-gray-900/50 px-3 py-1 rounded-lg">
                        <Timer className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{horario.duracion}min</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blocks View */}
          {viewMode === 'blocks' && (
            <div className="grid md:grid-cols-2 gap-4">
              {calendarioActual.horarios.map((horario, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl bg-gradient-to-br ${getCategoriaColor(horario.categoria)} shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeIn hover:scale-105`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-5xl">{horario.emoji}</span>
                    <span className="text-white/80 text-sm font-bold">{horario.tiempo}</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{horario.actividad}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">{horario.categoria}</span>
                    {horario.duracion && (
                      <span className="text-white/70 text-sm">{horario.duracion}min</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentScreen('customizer')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Edit3 className="w-5 h-5" />
                Personalizar
              </span>
            </button>
            
            <button
              onClick={() => setCurrentScreen('generator')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/80 transition-all hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generar Mi Calendario
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // CUSTOMIZER SCREEN
  const CustomizerScreen = () => (
    <div className="relative min-h-screen p-8">
      <Particles />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ⚙️ Personaliza Tu Calendario
          </h2>
          <p className="text-xl text-gray-400">
            Ajusta los parámetros según tu estilo de vida
          </p>
        </div>

        {/* Horarios Preferidos */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Sun className="w-7 h-7 text-yellow-400" />
            Horarios Preferidos
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2 font-bold">Hora de Despertar</label>
              <input
                type="time"
                value={userProfile.despertarHora}
                onChange={(e) => setUserProfile({...userProfile, despertarHora: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg text-white focus:border-yellow-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 font-bold">Hora de Dormir</label>
              <input
                type="time"
                value={userProfile.dormirHora}
                onChange={(e) => setUserProfile({...userProfile, dormirHora: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg text-white focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Tipo de Trabajo */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Target className="w-7 h-7 text-blue-400" />
            Tipo de Trabajo
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { value: 'remoto', label: 'Remoto', emoji: '🏠' },
              { value: 'oficina', label: 'Oficina', emoji: '🏢' },
              { value: 'hibrido', label: 'Híbrido', emoji: '🔄' }
            ].map((tipo) => (
              <button
                key={tipo.value}
                onClick={() => setUserProfile({...userProfile, tipoTrabajo: tipo.value as any})}
                className={`p-6 rounded-xl transition-all ${
                  userProfile.tipoTrabajo === tipo.value
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg scale-105'
                    : 'bg-gray-900/50 border-2 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-4xl mb-2">{tipo.emoji}</div>
                <div className="text-white font-bold">{tipo.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prioridades */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Star className="w-7 h-7 text-purple-400" />
            Tus Prioridades (selecciona hasta 3)
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Trabajo profundo',
              'Ejercicio físico',
              'Tiempo familiar',
              'Desarrollo personal',
              'Hobbies',
              'Descanso de calidad'
            ].map((prioridad) => (
              <button
                key={prioridad}
                onClick={() => {
                  if (userProfile.prioridades.includes(prioridad)) {
                    setUserProfile({
                      ...userProfile,
                      prioridades: userProfile.prioridades.filter(p => p !== prioridad)
                    });
                  } else if (userProfile.prioridades.length < 3) {
                    setUserProfile({
                      ...userProfile,
                      prioridades: [...userProfile.prioridades, prioridad]
                    });
                  }
                }}
                className={`p-4 rounded-lg font-bold transition-all ${
                  userProfile.prioridades.includes(prioridad)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-900/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                }`}
              >
                <span className="flex items-center justify-between">
                  {prioridad}
                  {userProfile.prioridades.includes(prioridad) && <Check className="w-5 h-5" />}
                </span>
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            {userProfile.prioridades.length}/3 seleccionadas
          </p>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setCurrentScreen('generator')}
            className="group px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-3">
              Generar Mi Calendario
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  // GENERATOR SCREEN
  const GeneratorScreen = () => {
    const copiarPrompt = () => {
      const prompt = `Actúa como mi coach de productividad y mindset. 

Crea un calendario diario realista para esta semana basado en mi perfil:
- Hora de despertar: ${userProfile.despertarHora}
- Hora de dormir: ${userProfile.dormirHora}
- Tipo de trabajo: ${userProfile.tipoTrabajo}
- Prioridades principales: ${userProfile.prioridades.join(', ')}

Necesito bloques claros de:
- Ejercicio físico
- Alimentación saludable
- Trabajo enfocado sin distracciones
- Descansos estratégicos
- Tiempo personal de calidad

Entrégame:
1. Calendario semanal (lunes a domingo) con horarios específicos
2. Una versión para importar a Google Calendar (.ics)
3. Consejos para mantener la consistencia
4. Hazme 2 preguntas clave para ajustar la rutina a mi vida real

Considera distracciones digitales, fatiga mental, y que el calendario debe ser sostenible a largo plazo.`;

      navigator.clipboard.writeText(prompt);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    };

    return (
      <div className="relative min-h-screen p-8">
        <Particles />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-block px-6 py-2 bg-green-500/20 rounded-full border border-green-500/30 backdrop-blur-sm mb-4 animate-pulse">
              <p className="text-sm font-bold text-green-400 tracking-wider">
                ✨ GENERADOR ACTIVADO
              </p>
            </div>
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Tu Calendario Personalizado
            </h2>
            <p className="text-xl text-gray-400">
              Basado en tus preferencias y estilo de vida
            </p>
          </div>

          {/* Profile Summary */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Tu Perfil Configurado
            </h3>
            <div className="grid md:grid-cols-2 gap-6 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div>
                <p className="text-white/70 text-sm mb-1">Horario de Sueño</p>
                <p className="text-white font-bold text-lg">{userProfile.despertarHora} - {userProfile.dormirHora}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Tipo de Trabajo</p>
                <p className="text-white font-bold text-lg capitalize">{userProfile.tipoTrabajo}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/70 text-sm mb-2">Prioridades</p>
                <div className="flex flex-wrap gap-2">
                  {userProfile.prioridades.map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-bold">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Prompt Generator */}
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lightbulb className="w-7 h-7 text-yellow-400" />
              Prompt IA Personalizado
            </h3>
            
            <div className="bg-black/30 p-6 rounded-xl mb-6 max-h-[400px] overflow-y-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
{`Actúa como mi coach de productividad y mindset. 

Crea un calendario diario realista para esta semana basado en mi perfil:
- Hora de despertar: ${userProfile.despertarHora}
- Hora de dormir: ${userProfile.dormirHora}
- Tipo de trabajo: ${userProfile.tipoTrabajo}
- Prioridades principales: ${userProfile.prioridades.join(', ') || 'No especificadas'}

Necesito bloques claros de:
- Ejercicio físico
- Alimentación saludable
- Trabajo enfocado sin distracciones
- Descansos estratégicos
- Tiempo personal de calidad

Entrégame:
1. Calendario semanal (lunes a domingo) con horarios específicos
2. Una versión para importar a Google Calendar (.ics)
3. Consejos para mantener la consistencia
4. Hazme 2 preguntas clave para ajustar la rutina a mi vida real

Considera distracciones digitales, fatiga mental, y que el calendario debe ser sostenible a largo plazo.`}
              </pre>
            </div>

            <div className="flex gap-4">
              <button
                onClick={copiarPrompt}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  {copiado ? (
                    <>
                      <Check className="w-5 h-5" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar Prompt
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-lg font-bold text-blue-400 mb-4">📋 Cómo usar este prompt:</h4>
            <div className="space-y-3">
              {[
                'Copia el prompt personalizado arriba',
                'Pégalo en ChatGPT 4 o Claude',
                'Responde las preguntas que te haga la IA',
                'Descarga tu calendario en formato PDF o .ics',
                'Impórtalo a Google Calendar o tu app favorita'
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
                    {i + 1}
                  </div>
                  <p className="text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Buttons */}
          <div className="flex gap-4 justify-center pt-8">
            <button
              onClick={() => setCurrentScreen('bonus')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl font-bold text-white shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/80 transition-all hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Ver BONUS
                <Sparkles className="w-5 h-5" />
              </span>
            </button>
            
            <button
              onClick={() => setCurrentScreen('complete')}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-white shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transition-all hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Completar Módulo
                <Trophy className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // BONUS SCREEN
  const BonusScreen = () => (
    <div className="relative min-h-screen p-8">
      <Particles />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-block px-6 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30 backdrop-blur-sm mb-4">
            <p className="text-sm font-bold text-yellow-400 tracking-wider">
              🎁 CONTENIDO BONUS
            </p>
          </div>
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Recursos Extra
          </h2>
          <p className="text-xl text-gray-400">
            Herramientas adicionales para maximizar tu productividad
          </p>
        </div>

        {/* Bonus Resources */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Regla de Oro',
              emoji: '🎯',
              content: 'No es solo organizar tu tiempo. Es diseñar tu vida con intención.',
              color: 'from-red-500 to-orange-500'
            },
            {
              title: 'Sistema de Hábitos',
              emoji: '🔄',
              content: 'Implementa tu calendario durante 21 días para que se vuelva tu nueva normalidad.',
              color: 'from-purple-500 to-pink-500'
            },
            {
              title: 'Tracking Semanal',
              emoji: '📊',
              content: 'Revisa cada domingo qué funcionó y qué mejorar para la siguiente semana.',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Balance Score',
              emoji: '⚖️',
              content: 'Mantén un balance 60% trabajo, 20% salud, 20% personal para alto rendimiento sostenible.',
              color: 'from-green-500 to-emerald-500'
            }
          ].map((bonus, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-gradient-to-br ${bonus.color} shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeIn hover:scale-105`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-5xl mb-4">{bonus.emoji}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{bonus.title}</h3>
              <p className="text-white/90">{bonus.content}</p>
            </div>
          ))}
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-3xl shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Flame className="w-6 h-6" />
            Pro Tips para Mantener Consistencia
          </h3>
          <div className="space-y-4">
            {[
              'Usa alarmas con nombres descriptivos (ej: "💪 Hora de entrenar")',
              'Prepara todo la noche anterior (ropa, comida, workspace)',
              'Ten un "plan B" para días caóticos',
              'Celebra pequeñas victorias diarias',
              'Ajusta semanalmente según resultados reales'
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
                  {i + 1}
                </div>
                <p className="text-white">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
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

  // COMPLETE SCREEN
  const CompleteScreen = () => {
    return (
      <div className="relative min-h-screen flex items-center justify-center p-8">
        <Particles />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
          {/* Trophy Animation */}
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-red-500/30 animate-pulse" />
            <div className="relative">
              <div className="text-9xl animate-bounce mb-4">🏆</div>
              <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</div>
            </div>
          </div>

          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            ¡Capítulo 2 Completado!
          </h1>

          <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
            Ahora tenés todas las herramientas para trabajar online con alto rendimiento y estructura profesional
          </p>

          {/* Achievement Stats */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {[
              { icon: <CheckCircle className="w-8 h-8" />, label: 'Módulos', value: '10/10' },
              { icon: <Trophy className="w-8 h-8" />, label: 'Capítulos', value: '2/2' },
              { icon: <Star className="w-8 h-8" />, label: 'Nivel', value: 'PRO' }
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-fadeIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-yellow-400 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* What You Learned */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              ✨ Lo que lograste en el Capítulo 2:
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                'Sistema completo para trabajar online',
                'Guía de cobro con 5 modelos profesionales',
                'Calendario diario de alto rendimiento',
                'Herramientas de análisis y personalización',
                'Prompts IA para automatizar procesos',
                'Balance perfecto trabajo-vida-salud'
              ].map((logro, i) => (
                <div key={i} className="flex items-start gap-3 text-white bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>{logro}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">🚀 Próximos Pasos:</h3>
            <div className="space-y-2 text-gray-300 text-left max-w-2xl mx-auto">
              <p>✓ Implementa tu calendario durante 21 días</p>
              <p>✓ Testea tu modelo de cobro con 3 clientes</p>
              <p>✓ Usa los prompts IA para optimizar procesos</p>
              <p>✓ Mide resultados y ajusta según necesites</p>
              <p>✓ Comparte tu progreso en la comunidad</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="pt-8">
            <p className="text-xl text-gray-400 mb-6">
              ¿Listo para seguir creciendo?
            </p>
            <button
              onClick={() => {/* Navigate to next chapter */}}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-xl text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/80 transition-all duration-300 hover:scale-105"
            >
              Ir al Siguiente Capítulo
            </button>
          </div>

          {/* Restart Option */}
          <button
            onClick={() => {
              setCurrentScreen('intro');
              setDiaSeleccionado('lunes-viernes');
              setUserProfile({
                despertarHora: '06:30',
                dormirHora: '22:00',
                tipoTrabajo: 'remoto',
                prioridades: [],
                diasLibres: []
              });
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Revisar este módulo
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
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="bg-gray-900/80 backdrop-blur-sm px-6 py-3 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const screens: Screen[] = ['intro', 'explorer', 'dayview', 'customizer', 'generator', 'bonus', 'complete'];
                  const currentIndex = screens.indexOf(currentScreen);
                  if (currentIndex > 0) setCurrentScreen(screens[currentIndex - 1]);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Atrás
              </button>
              <span className="text-sm text-gray-400">Módulo 10: Calendario Diario PRO</span>
            </div>
            <span className="text-sm font-bold text-indigo-400">{progress}% Completado</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={currentScreen !== 'intro' && currentScreen !== 'complete' ? 'pt-16' : ''}>
        {currentScreen === 'intro' && <IntroScreen />}
        {currentScreen === 'explorer' && <ExplorerScreen />}
        {currentScreen === 'dayview' && <DayViewScreen />}
        {currentScreen === 'customizer' && <CustomizerScreen />}
        {currentScreen === 'generator' && <GeneratorScreen />}
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

export const calendarioDiarioProMetadata = {
  id: 10,
  title: "Calendario Diario PRO - Sistema Anticaos",
  type: "document" as const,
  duration: "15 min"
};