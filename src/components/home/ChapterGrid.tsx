import React from 'react';
import { Chapter } from '@data/types';
import { BookOpen, ChevronRight, CheckCircle, Lock, TrendingUp, Clock } from 'lucide-react';

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
  // Calcular progreso del capítulo
  const getChapterProgress = (chapter: Chapter) => {
    const totalModules = chapter.modules?.length || 0;
    const completed = chapter.modules?.filter(m => completedModules.has(m.id)).length || 0;
    const percentage = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
    const isComplete = completed === totalModules && totalModules > 0;
    const isStarted = completed > 0;

    return { completed, total: totalModules, percentage, isComplete, isStarted };
  };

  // Determinar colores según estado
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

  // Determinar si un capítulo está bloqueado (opcional)
  const isChapterLocked = (index: number) => {
    // Lógica opcional: desbloquear capítulos secuencialmente
    // return index > 0 && getChapterProgress(chapters[index - 1]).percentage < 100;
    return false; // Por defecto todos desbloqueados
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="w-14 h-14 bg-gray-200 rounded-xl mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
            <div className="h-4 bg-gray-200 rounded mb-4 w-full" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <div className="mt-20 text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">No hay capítulos disponibles</p>
      </div>
    );
  }

  return (
    <div className="mt-8 sm:mt-12 lg:mt-16">
      {/* Header con estadísticas */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
            Contenido del Curso
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {chapters.length} capítulos disponibles
          </p>
        </div>
        
        {/* Progreso general */}
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
          <TrendingUp size={18} className="text-amber-600 flex-shrink-0" />
          <span className="text-sm font-semibold text-amber-700">
            {Math.round((completedModules.size / chapters.reduce((sum, ch) => sum + (ch.modules?.length || 0), 0)) * 100) || 0}% completado
          </span>
        </div>
      </div>

      {/* Grid de capítulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                group relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl 
                transition-all duration-300 overflow-hidden
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
              {/* Barra de progreso superior animada */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colors.progress} transition-all duration-700 ease-out relative`}
                  style={{ width: `${progress.percentage}%` }}
                >
                  {/* Shimmer effect */}
                  {progress.percentage > 0 && progress.percentage < 100 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  )}
                </div>
              </div>

              {/* Badge de estado */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                {isLocked ? (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
                    <Lock size={16} className="sm:w-5 sm:h-5 text-gray-500" />
                  </div>
                ) : progress.isComplete ? (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-soft">
                    <CheckCircle size={18} className="sm:w-5 sm:h-5 text-white" />
                  </div>
                ) : progress.isStarted ? (
                  <div className={`px-2 py-1 ${colors.badge} border rounded-full shadow-sm`}>
                    <span className="text-[10px] sm:text-xs font-bold">{progress.percentage}%</span>
                  </div>
                ) : null}
              </div>

              <div className="p-4 sm:p-6">
                {/* Número del capítulo */}
                <div className={`
                  w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${colors.number}
                  rounded-lg sm:rounded-xl flex items-center justify-center 
                  text-white font-black text-xl sm:text-2xl mb-3 sm:mb-4 shadow-lg
                  transform transition-all duration-300
                  ${!isLocked && 'group-hover:scale-110 group-hover:rotate-3'}
                `}>
                  {chapter.id}
                </div>

                {/* Título */}
                <h3 className={`
                  text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight
                  transition-colors duration-300
                  ${!isLocked && 'group-hover:text-amber-600'}
                `}>
                  {chapter.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                  {chapter.description}
                </p>

                {/* Info de módulos */}
                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {chapter.modules?.length || 0} módulo{(chapter.modules?.length || 0) !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {progress.isStarted && !isLocked && (
                    <div className={`flex items-center gap-1 px-2 py-1 ${colors.badge} border rounded-full shadow-sm`}>
                      <span className="text-[10px] sm:text-xs font-bold">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                  )}
                </div>

                {/* Botón de acción */}
                {!isLocked && (
                  <button 
                    className={`
                      mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 
                      py-2 sm:py-2.5 px-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm
                      transition-all duration-300 transform
                      ${progress.isComplete
                        ? 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200'
                        : progress.isStarted
                          ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-700 border border-gray-200 hover:border-amber-200'
                      }
                      active:scale-95
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChapterClick(chapter.id);
                    }}
                    type="button"
                  >
                    <span>
                      {progress.isComplete 
                        ? 'Revisar' 
                        : progress.isStarted 
                          ? 'Continuar' 
                          : 'Comenzar'}
                    </span>
                    <ChevronRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </button>
                )}

                {isLocked && (
                  <div className="mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-4 bg-gray-100 text-gray-500 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium border border-gray-200">
                    <Lock size={14} className="sm:w-4 sm:h-4" />
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

              {/* Indicator de capítulo activo */}
              {isActive && !isLocked && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
              )}
            </article>
          );
        })}
      </div>

      {/* Estilos adicionales */}
      <style>{`
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
      `}</style>
    </div>
  );
};