import React from 'react';
import { Play, BookOpen, Clock, Award, Sparkles } from 'lucide-react';

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
  const hasStarted = courseProgress && courseProgress.completed > 0;
  const isCompleted = courseProgress && courseProgress.percentage === 100;

  return (
    <section className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Safe Area Top */}
      <div className="safe-area-top" />
      
      {/* Decoración de fondo animada - optimizada para móvil */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 sm:opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 sm:opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 sm:opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="text-center">
        {/* Logo optimizado responsive */}
        <div className="mb-6 sm:mb-8 inline-block">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-50 sm:opacity-60 group-hover:opacity-75 sm:group-hover:opacity-90 transition-all duration-500" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl shadow-xl sm:shadow-2xl transform group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-3 sm:group-hover:rotate-6 transition-all duration-500">
              {logo.length === 1 ? (
                logo
              ) : (
                <img src={logo} alt="Logo del curso" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" />
              )}
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
          </div>
        </div>

        {/* Badge de estado responsive */}
        {hasStarted && !isCompleted && (
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-sm border border-amber-200 text-amber-700 rounded-full text-sm sm:text-base font-semibold mb-4 sm:mb-5 animate-fadeIn shadow-sm min-h-[40px]">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
            <span>En Progreso</span>
          </div>
        )}

        {isCompleted && (
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/90 backdrop-blur-sm border border-green-200 text-green-700 rounded-full text-sm sm:text-base font-semibold mb-4 sm:mb-5 animate-fadeIn shadow-sm min-h-[40px]">
            <Award size={16} className="sm:w-5 sm:h-5 animate-bounce flex-shrink-0" />
            <span>¡Curso Completado!</span>
          </div>
        )}

        {/* Título responsive - optimizado para móvil */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight px-2 sm:px-4 animate-fadeInUp">
          <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-orange-700 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtítulo responsive - mejorado legibilidad */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 animate-fadeInUp animation-delay-200">
          {subtitle}
        </p>

        {/* Barra de progreso responsive - CON BACKDROP BLUR */}
        {hasStarted && courseProgress && (
          <div className="max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8 md:mb-10 px-3 sm:px-0 animate-fadeInUp animation-delay-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between text-sm sm:text-base text-gray-600 mb-3">
                <span className="font-medium flex items-center gap-2">
                  <Sparkles size={16} className="sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
                  <span>Tu Progreso</span>
                </span>
                <span className="font-bold text-amber-600">
                  {courseProgress.completed}/{courseProgress.total}
                </span>
              </div>
              
              {/* Progress bar más alta en móvil */}
              <div className="relative w-full bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden shadow-inner">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end"
                  style={{ width: `${courseProgress.percentage}%` }}
                  role="progressbar"
                  aria-valuenow={courseProgress.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progreso del curso: ${courseProgress.percentage}%`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  {courseProgress.percentage > 10 && (
                    <span className="text-xs sm:text-sm font-bold text-white mr-2 sm:mr-3 relative z-10">
                      {courseProgress.percentage}%
                    </span>
                  )}
                </div>
              </div>
              
              {/* Mensajes motivacionales */}
              {courseProgress.percentage < 100 && (
                <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 text-center leading-relaxed">
                  {courseProgress.percentage < 25 && "¡Excelente inicio! Sigue así 🚀"}
                  {courseProgress.percentage >= 25 && courseProgress.percentage < 50 && "¡Vas por buen camino! 💪"}
                  {courseProgress.percentage >= 50 && courseProgress.percentage < 75 && "¡Más de la mitad! Ya casi 🔥"}
                  {courseProgress.percentage >= 75 && courseProgress.percentage < 100 && "¡Casi lo logras! 🎯"}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Botón principal responsive - TOUCH TARGET OPTIMIZADO */}
        <div className="flex justify-center items-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4 animate-fadeInUp animation-delay-400">
          <button
            onClick={onStartCourse}
            className="group relative w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 transition-all duration-300 max-w-sm sm:max-w-none sm:min-w-[280px] overflow-hidden touch-manipulation min-h-[56px] sm:min-h-[60px]"
            type="button"
            aria-label={isCompleted ? "Revisar curso completo" : hasStarted ? "Continuar con el curso" : "Comenzar curso ahora"}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <span className="relative flex items-center justify-center gap-2 sm:gap-3">
              <Play size={20} className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
              <span className="truncate">
                {isCompleted 
                  ? "Revisar Curso"
                  : hasStarted 
                    ? "Continuar Curso" 
                    : "Comenzar Curso"}
              </span>
            </span>
          </button>
        </div>

        {/* Estadísticas responsive - TOUCH TARGETS OPTIMIZADOS */}
        {stats && (
          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-8 sm:pt-10 md:pt-12 border-t border-gray-200/50 animate-fadeInUp animation-delay-500 max-w-4xl mx-auto px-3 sm:px-4 md:px-0">
            {stats.totalModules && (
              <div className="group">
                <div className="flex items-center gap-3 sm:gap-4 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 min-h-[88px] sm:min-h-[96px]">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner flex-shrink-0">
                    <BookOpen size={24} className="sm:w-7 sm:h-7 text-amber-600" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-3xl sm:text-4xl font-black text-gray-900 truncate">
                      {stats.totalModules}
                    </div>
                    <div className="text-sm sm:text-base font-medium text-gray-500">
                      Módulos
                    </div>
                  </div>
                </div>
              </div>
            )}

            {stats.estimatedHours && (
              <div className="group">
                <div className="flex items-center gap-3 sm:gap-4 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 min-h-[88px] sm:min-h-[96px]">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner flex-shrink-0">
                    <Clock size={24} className="sm:w-7 sm:h-7 text-blue-600" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-3xl sm:text-4xl font-black text-gray-900 truncate">
                      {stats.estimatedHours}h
                    </div>
                    <div className="text-sm sm:text-base font-medium text-gray-500">
                      Duración
                    </div>
                  </div>
                </div>
              </div>
            )}

            {stats.completionRate !== undefined && (
              <div className="group min-[380px]:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 sm:gap-4 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 min-h-[88px] sm:min-h-[96px]">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner flex-shrink-0">
                    <Award size={24} className="sm:w-7 sm:h-7 text-green-600" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-3xl sm:text-4xl font-black text-gray-900 truncate">
                      {stats.completionRate}%
                    </div>
                    <div className="text-sm sm:text-base font-medium text-gray-500">
                      Completado
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Safe Area Bottom */}
      <div className="safe-area-bottom" />

      {/* Estilos optimizados */}
      <style>{`
        /* Safe Area Support */
        .safe-area-top {
          height: env(safe-area-inset-top);
        }
        .safe-area-bottom {
          height: env(safe-area-inset-bottom);
        }

        /* Touch manipulation */
        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Animaciones optimizadas */
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
          will-change: transform;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        /* Reducir movimiento para usuarios con preferencia */
        @media (prefers-reduced-motion: reduce) {
          .animate-blob,
          .animate-shimmer,
          .animate-fadeIn,
          .animate-fadeInUp {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* Optimización para pantallas pequeñas */
        @media (max-width: 360px) {
          .text-3xl {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
};