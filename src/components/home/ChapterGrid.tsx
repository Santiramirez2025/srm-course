import React from 'react';
import { Chapter } from '@data/types';
import { BookOpen, ChevronRight, CheckCircle, Lock, TrendingUp } from 'lucide-react';

interface ChapterGridProps {
  chapters: Chapter[];
  onChapterClick: (chapterId: number) => void;
  completedModules?: Set<number>;
  currentChapterId?: number | null;
  isLoading?: boolean;
}

export const ChapterGrid: React.FC<ChapterGridProps> = ({ 
  chapters, 
  onChapterClick,
  completedModules = new Set(),
  currentChapterId = null,
  isLoading = false
}) => {
  const getChapterProgress = (chapter: Chapter) => {
    const totalModules = chapter.modules?.length || 0;
    const completed = chapter.modules?.filter(m => completedModules.has(m.id)).length || 0;
    const percentage = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
    const isComplete = completed === totalModules && totalModules > 0;
    const isStarted = completed > 0;

    return { completed, total: totalModules, percentage, isComplete, isStarted };
  };

  const getChapterColors = (progress: ReturnType<typeof getChapterProgress>) => {
    if (progress.isComplete) {
      return {
        gradient: 'from-green-500 to-emerald-600',
        badge: 'bg-green-100 text-green-700 border-green-200',
        number: 'from-green-500 to-emerald-600',
        hoverBg: 'group-hover:from-green-50/50 group-hover:to-emerald-50/30',
        ring: 'ring-green-500',
        progress: 'from-green-400 to-emerald-600'
      };
    }
    if (progress.isStarted) {
      return {
        gradient: 'from-amber-500 to-orange-600',
        badge: 'bg-amber-100 text-amber-700 border-amber-200',
        number: 'from-amber-500 to-orange-600',
        hoverBg: 'group-hover:from-amber-50/50 group-hover:to-orange-50/30',
        ring: 'ring-amber-500',
        progress: 'from-amber-400 to-orange-600'
      };
    }
    return {
      gradient: 'from-gray-400 to-gray-500',
      badge: 'bg-gray-100 text-gray-600 border-gray-200',
      number: 'from-gray-400 to-gray-500',
      hoverBg: 'group-hover:from-gray-50/50 group-hover:to-gray-100/30',
      ring: 'ring-gray-400',
      progress: 'from-gray-400 to-gray-600'
    };
  };

  const isChapterLocked = (index: number) => {
    return false;
  };

  if (isLoading) {
    return (
      <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 animate-pulse min-h-[300px]">
            <div className="w-14 h-14 bg-gray-200 rounded-xl mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-3 w-3/4" />
            <div className="h-4 bg-gray-200 rounded mb-2 w-full" />
            <div className="h-4 bg-gray-200 rounded mb-4 w-full" />
            <div className="h-10 bg-gray-200 rounded w-full mt-6" />
          </div>
        ))}
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <div className="mt-20 text-center py-12 max-w-6xl mx-auto px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen size={32} className="sm:w-10 sm:h-10 text-amber-600" />
        </div>
        <p className="text-gray-600 text-base sm:text-lg font-medium">No hay capítulos disponibles</p>
      </div>
    );
  }

  return (
    <div className="mt-8 sm:mt-12 md:mt-14 lg:mt-16 max-w-6xl mx-auto">
      {/* Header con estadísticas - MEJORADO */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-1 sm:mb-2">
            Contenido del Curso
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {chapters.length} capítulo{chapters.length !== 1 ? 's' : ''} disponible{chapters.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Progreso general - MEJORADO */}
        {completedModules.size > 0 && (
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/90 backdrop-blur-sm border border-amber-200 rounded-xl shadow-sm min-h-[44px]">
            <TrendingUp size={18} className="sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
            <span className="text-sm sm:text-base font-semibold text-amber-700">
              {Math.round((completedModules.size / chapters.reduce((sum, ch) => sum + (ch.modules?.length || 0), 0)) * 100) || 0}% completado
            </span>
          </div>
        )}
      </div>

      {/* Grid de capítulos - OPTIMIZADO */}
      <div className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 px-4 sm:px-6 lg:px-8 pb-safe">
        {chapters.map((chapter, index) => {
          const progress = getChapterProgress(chapter);
          const isActive = currentChapterId === chapter.id;
          const isLocked = isChapterLocked(index);
          const colors = getChapterColors(progress);

          return (
            <article 
              key={chapter.id}
              onClick={() => !isLocked && onChapterClick(chapter.id)}
              className={`
                group relative bg-white/95 backdrop-blur-sm rounded-2xl 
                shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden
                touch-manipulation
                min-h-[300px] sm:min-h-[320px]
                ${isLocked 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'cursor-pointer hover:-translate-y-1 active:scale-98'
                }
                ${isActive ? `ring-2 ${colors.ring} scale-[1.02]` : ''}
              `}
              role="button"
              tabIndex={isLocked ? -1 : 0}
              aria-label={`Capítulo ${chapter.id}: ${chapter.title}. ${progress.completed} de ${progress.total} módulos completados`}
              aria-disabled={isLocked}
              onKeyDown={(e) => {
                if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  onChapterClick(chapter.id);
                }
              }}
            >
              {/* Barra de progreso superior - MÁS GRUESA */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-200 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colors.progress} transition-all duration-700 ease-out relative`}
                  style={{ width: `${progress.percentage}%` }}
                  role="progressbar"
                  aria-valuenow={progress.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {progress.percentage > 0 && progress.percentage < 100 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  )}
                </div>
              </div>

              {/* Badge de estado - MÁS GRANDE */}
              <div className="absolute top-4 right-4 z-10">
                {isLocked ? (
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
                    <Lock size={20} className="sm:w-6 sm:h-6 text-gray-500" />
                  </div>
                ) : progress.isComplete ? (
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle size={22} className="sm:w-6 sm:h-6 text-white" />
                  </div>
                ) : progress.isStarted ? (
                  <div className={`px-3 py-1.5 ${colors.badge} border rounded-full shadow-sm min-h-[32px] flex items-center justify-center`}>
                    <span className="text-xs sm:text-sm font-bold">{progress.percentage}%</span>
                  </div>
                ) : null}
              </div>

              <div className="p-5 sm:p-6 flex flex-col h-full">
                {/* Número del capítulo - MÁS GRANDE */}
                <div className={`
                  w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${colors.number}
                  rounded-xl flex items-center justify-center 
                  text-white font-black text-2xl sm:text-3xl mb-4 shadow-lg
                  transform transition-all duration-300
                  ${!isLocked && 'group-hover:scale-110 group-hover:rotate-3'}
                `}>
                  {chapter.id}
                </div>

                {/* Título - MÁS LEGIBLE */}
                <h3 className={`
                  text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight
                  transition-colors duration-300
                  ${!isLocked && 'group-hover:text-amber-600'}
                `}>
                  {chapter.title}
                </h3>
                
                {/* Descripción - MEJOR LEGIBILIDAD */}
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 leading-relaxed flex-grow">
                  {chapter.description}
                </p>

                {/* Info de módulos - MÁS GRANDE */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      {chapter.modules?.length || 0} módulo{(chapter.modules?.length || 0) !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {progress.isStarted && !isLocked && (
                    <div className={`flex items-center gap-1 px-3 py-1.5 ${colors.badge} border rounded-full shadow-sm min-h-[32px]`}>
                      <span className="text-xs sm:text-sm font-bold">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                  )}
                </div>

                {/* Botón de acción - TOUCH TARGET OPTIMIZADO */}
                {!isLocked && (
                  <button 
                    className={`
                      mt-4 sm:mt-5 w-full flex items-center justify-center gap-2 
                      py-3 sm:py-3.5 px-4 rounded-xl font-semibold text-sm sm:text-base
                      transition-all duration-300 transform
                      touch-manipulation
                      min-h-[48px] sm:min-h-[52px]
                      ${progress.isComplete
                        ? 'bg-green-50 hover:bg-green-100 text-green-700 border-2 border-green-200 hover:border-green-300'
                        : progress.isStarted
                          ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-2 border-amber-200 hover:border-amber-300'
                          : 'bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 border-2 border-gray-200 hover:border-amber-200'
                      }
                      active:scale-95
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChapterClick(chapter.id);
                    }}
                    type="button"
                    aria-label={`${progress.isComplete ? 'Revisar' : progress.isStarted ? 'Continuar' : 'Comenzar'} capítulo ${chapter.id}`}
                  >
                    <span>
                      {progress.isComplete 
                        ? 'Revisar' 
                        : progress.isStarted 
                          ? 'Continuar' 
                          : 'Comenzar'}
                    </span>
                    <ChevronRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </button>
                )}

                {isLocked && (
                  <div className="mt-4 sm:mt-5 w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 bg-gray-100 text-gray-500 rounded-xl text-sm sm:text-base font-semibold border-2 border-gray-200 min-h-[48px] sm:min-h-[52px]">
                    <Lock size={16} className="sm:w-5 sm:h-5" />
                    <span>Bloqueado</span>
                  </div>
                )}
              </div>

              {/* Efecto hover de fondo */}
              {!isLocked && (
                <div className={`
                  absolute inset-0 bg-gradient-to-br from-transparent to-transparent
                  ${colors.hoverBg}
                  transition-all duration-300 pointer-events-none
                `} />
              )}

              {/* Indicator de capítulo activo - MÁS GRUESO */}
              {isActive && !isLocked && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600" />
              )}
            </article>
          );
        })}
      </div>

      {/* Safe Area Bottom */}
      <div className="safe-area-bottom" />

      {/* Estilos optimizados */}
      <style>{`
        /* Safe Area Support */
        .safe-area-bottom {
          height: env(safe-area-inset-bottom);
        }
        
        .pb-safe {
          padding-bottom: calc(1rem + env(safe-area-inset-bottom));
        }

        /* Touch manipulation */
        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Animaciones */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .active\:scale-98:active {
          transform: scale(0.98);
        }

        /* Line clamp para descripción */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Mejoras para pantallas muy pequeñas */
        @media (max-width: 360px) {
          .text-xl {
            font-size: 1.125rem;
          }
        }

        /* Reducir movimiento para usuarios con preferencia */
        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer,
          .group-hover\:scale-110,
          .group-hover\:rotate-3,
          .group-hover\:translate-x-1,
          .hover\:-translate-y-1 {
            animation: none;
            transform: none;
          }
        }

        /* Optimización de grid para tablets */
        @media (min-width: 640px) and (max-width: 1023px) {
          .min-\[640px\]\:grid-cols-2 > article:last-child:nth-child(odd) {
            grid-column: span 2;
            max-width: 50%;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};