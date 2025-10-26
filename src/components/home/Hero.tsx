import React, { useEffect, useState } from 'react';
import { Play, BookOpen, Clock, Award, Sparkles, TrendingUp } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  onStartCourse: () => void;
  courseProgress?: {
    total: number;
    completed: number;
    percentage: number;
  };
  stats?: {
    totalModules?: number;
    estimatedHours?: number;
    completionRate?: number;
  };
  logo?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  onStartCourse,
  courseProgress,
  stats,
  logo = 'S'
}) => {
  const [mounted, setMounted] = useState(false);
  const hasStarted = courseProgress && courseProgress.completed > 0;
  const isCompleted = courseProgress && courseProgress.percentage === 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mensaje motivacional dinámico
  const getMotivationalMessage = () => {
    if (!courseProgress) return '';
    const { percentage } = courseProgress;
    
    if (percentage < 25) return 'Excelente inicio. Cada paso cuenta';
    if (percentage < 50) return 'Vas por buen camino. Mantén el ritmo';
    if (percentage < 75) return 'Más de la mitad. Ya casi llegas';
    if (percentage < 100) return 'La meta está cerca. ¡Último empujón!';
    return 'Logro desbloqueado';
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
      
      {/* Ambient Background - Optimizado */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl opacity-60" 
             style={{ transform: mounted ? 'scale(1)' : 'scale(0.8)', transition: 'transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-3xl opacity-40" 
             style={{ transform: mounted ? 'scale(1)' : 'scale(0.8)', transition: 'transform 2.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
      </div>

      <div className="relative text-center">
        
        {/* Logo con reveal cinemático */}
        <div className="mb-8 sm:mb-10 inline-block">
          <div className="relative group">
            {/* Glow layer */}
            <div 
              className="absolute -inset-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl blur-2xl opacity-0 transition-opacity duration-1000"
              style={{ opacity: mounted ? 0.4 : 0 }}
            />
            
            {/* Logo container */}
            <div 
              className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-700 ease-out group-hover:shadow-amber-500/50"
              style={{ 
                transform: mounted ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
                opacity: mounted ? 1 : 0
              }}
            >
              <span className="text-white font-black text-4xl sm:text-5xl lg:text-6xl transition-transform duration-300 group-hover:scale-110">
                {logo.length === 1 ? logo : <img src={logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain" />}
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {hasStarted && !isCompleted && (
          <div 
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/80 backdrop-blur-xl border border-amber-200/50 text-amber-700 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-amber-100/50 transition-all duration-300 hover:shadow-xl"
            style={{ 
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: '0.2s'
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-amber-500 rounded-full" />
            </div>
            <span className="tracking-tight">En progreso</span>
          </div>
        )}

        {isCompleted && (
          <div 
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-xl border border-green-200/50 text-green-700 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-green-100/50"
            style={{ 
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: '0.2s'
            }}
          >
            <Award size={18} className="text-green-600" />
            <span className="tracking-tight">Curso completado</span>
          </div>
        )}

        {/* Title con efecto gradiente animado */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight"
          style={{ 
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.3s',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <span className="bg-gradient-to-br from-amber-600 via-orange-600 to-orange-700 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtitle mejorado */}
        <p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 sm:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-medium"
          style={{ 
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.4s',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {subtitle}
        </p>

        {/* Progress Card Premium */}
        {hasStarted && courseProgress && (
          <div 
            className="max-w-md mx-auto mb-10 sm:mb-12"
            style={{ 
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.5s',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <TrendingUp size={18} className="text-white" />
                  </div>
                  <span className="font-bold text-gray-900 text-lg">Tu progreso</span>
                </div>
                <span className="text-2xl font-black bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {courseProgress.percentage}%
                </span>
              </div>
              
              {/* Progress Bar Premium */}
              <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50" />
                
                {/* Progress fill con animación */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${courseProgress.percentage}%`,
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)'
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </div>
              </div>
              
              {/* Stats row */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">
                  {courseProgress.completed} de {courseProgress.total} módulos
                </span>
                <span className="text-amber-600 font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} />
                  {getMotivationalMessage()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button Premium con glow animado */}
        <div 
          className="flex justify-center mb-12 sm:mb-16"
          style={{ 
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.6s',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <button
            onClick={onStartCourse}
            className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-w-[280px] overflow-hidden"
            type="button"
            aria-label={isCompleted ? "Revisar curso" : hasStarted ? "Continuar curso" : "Comenzar curso"}
          >
            {/* Animated glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Pulsing ring on hover */}
            <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            
            <span className="relative flex items-center justify-center gap-3 font-bold tracking-tight">
              <Play size={22} className="group-hover:scale-110 transition-transform duration-300" fill="white" />
              {isCompleted ? 'Revisar curso' : hasStarted ? 'Continuar curso' : 'Comenzar curso'}
            </span>
          </button>
        </div>

        {/* Stats Grid Premium */}
        {stats && (
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto"
            style={{ 
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.7s',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {stats.totalModules && (
              <div className="group bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-amber-200/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen size={26} className="text-amber-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black text-gray-900">{stats.totalModules}</div>
                    <div className="text-sm font-semibold text-gray-500">Módulos</div>
                  </div>
                </div>
              </div>
            )}

            {stats.estimatedHours && (
              <div className="group bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-blue-200/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock size={26} className="text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black text-gray-900">{stats.estimatedHours}h</div>
                    <div className="text-sm font-semibold text-gray-500">Duración</div>
                  </div>
                </div>
              </div>
            )}

            {stats.completionRate !== undefined && (
              <div className="group bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-green-200/50 transition-all duration-300 hover:-translate-y-1 sm:col-span-1">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award size={26} className="text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-black text-gray-900">{stats.completionRate}%</div>
                    <div className="text-sm font-semibold text-gray-500">Completado</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Mejora de contraste para accesibilidad */
        @media (prefers-contrast: high) {
          .bg-white\\/60, .bg-white\\/70, .bg-white\\/80 {
            background-color: white;
          }
        }

        /* Optimización touch targets */
        button {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* GPU acceleration */
        .group:hover > * {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};