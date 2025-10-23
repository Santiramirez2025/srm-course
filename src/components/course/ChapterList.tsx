import React, { useMemo } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, Play, FileText, CheckCircle2, Circle, Lock } from 'lucide-react';
import { Chapter, Module } from '@data/types';

interface ChapterListProps {
  chapters: Chapter[];
  expandedChapter: number | null;
  selectedModule: (Module & { chapterTitle: string }) | null;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  completedModules?: Set<number>;
  isLoading?: boolean;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  expandedChapter,
  selectedModule,
  onToggleChapter,
  onSelectModule,
  completedModules = new Set(),
  isLoading = false
}) => {
  // Calcular totales y progreso
  const stats = useMemo(() => {
    const totalModules = chapters.reduce((acc, ch) => acc + (ch.modules?.length || 0), 0);
    const completed = completedModules.size;
    const percentage = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
    
    return {
      totalChapters: chapters.length,
      totalModules,
      completed,
      percentage
    };
  }, [chapters, completedModules]);

  // Calcular progreso por capítulo
  const getChapterProgress = useMemo(() => {
    return (chapter: Chapter) => {
      const totalModules = chapter.modules?.length || 0;
      const completed = chapter.modules?.filter(m => completedModules.has(m.id)).length || 0;
      const percentage = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
      
      return { completed, total: totalModules, percentage };
    };
  }, [completedModules]);

  // Iconos por tipo de módulo - MÁS GRANDES
  const getModuleIcon = (type: Module['type']) => {
    const icons = {
      video: <Play size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0 text-amber-600" />,
      document: <FileText size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0 text-blue-600" />,
      text: <FileText size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0 text-purple-600" />
    };
    return icons[type] || icons.text;
  };

  // Verificar si módulo está seleccionado
  const isModuleSelected = (chapterTitle: string, moduleId: number): boolean => {
    return selectedModule?.id === moduleId && selectedModule?.chapterTitle === chapterTitle;
  };

  // Verificar si módulo está completado
  const isModuleCompleted = (moduleId: number): boolean => {
    return completedModules.has(moduleId);
  };

  // Loading skeleton - MEJORADO
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-20 sm:top-24">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-5 sm:p-6">
          <div className="h-6 sm:h-7 bg-white/20 rounded-lg w-3/4 mb-2 sm:mb-3" />
          <div className="h-4 bg-white/20 rounded w-1/2" />
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 sm:p-5 animate-pulse">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 rounded-xl" />
                <div className="flex-1">
                  <div className="h-4 sm:h-5 bg-gray-200 rounded-lg w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-20 sm:top-24 max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-7rem)] flex flex-col">
      {/* Header - OPTIMIZADO */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 p-5 sm:p-6 relative overflow-hidden flex-shrink-0">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white rounded-full -mr-16 sm:-mr-20 -mt-16 sm:-mt-20" />
          <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-full -ml-12 sm:-ml-16 -mb-12 sm:-mb-16" />
        </div>
        
        <div className="relative">
          <h2 className="text-white font-black text-xl sm:text-2xl mb-1 sm:mb-2">
            Contenido del Curso
          </h2>
          <p className="text-amber-50 text-sm sm:text-base">
            {stats.totalChapters} capítulo{stats.totalChapters !== 1 ? 's' : ''} • {stats.totalModules} módulo{stats.totalModules !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Barra de progreso en header - MÁS GRUESA */}
        {stats.totalModules > 0 && (
          <div className="mt-4 sm:mt-5 relative">
            <div className="flex items-center justify-between text-xs sm:text-sm text-amber-50 mb-2">
              <span className="font-semibold">Tu Progreso</span>
              <span className="font-bold">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 sm:h-3 overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${stats.percentage}%` }}
                role="progressbar"
                aria-valuenow={stats.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Lista de capítulos con scroll - OPTIMIZADA */}
      <div className="divide-y divide-gray-100 overflow-y-auto flex-1 custom-scrollbar">
        {chapters.map((chapter) => {
          const progress = getChapterProgress(chapter);
          const isExpanded = expandedChapter === chapter.id;
          const isComplete = progress.completed === progress.total && progress.total > 0;

          return (
            <div key={chapter.id} className="transition-colors duration-200">
              {/* Header del capítulo - TOUCH TARGET OPTIMIZADO */}
              <button
                onClick={() => onToggleChapter(chapter.id)}
                className="w-full px-4 sm:px-5 py-4 sm:py-5 flex items-center justify-between hover:bg-amber-50 transition-all duration-200 group touch-manipulation min-h-[68px] sm:min-h-[76px]"
                aria-expanded={isExpanded}
                aria-label={`${chapter.title}, ${progress.completed} de ${progress.total} módulos completados`}
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Número del capítulo - MÁS GRANDE */}
                  <div className={`
                    w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center 
                    text-base sm:text-lg font-bold transition-all duration-300
                    flex-shrink-0 shadow-sm
                    ${isComplete
                      ? 'bg-green-500 text-white shadow-md'
                      : progress.completed > 0
                        ? 'bg-amber-100 text-amber-700 group-hover:bg-amber-200'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }
                  `}>
                    {isComplete ? (
                      <CheckCircle2 size={18} className="sm:w-5 sm:h-5" />
                    ) : (
                      chapter.id
                    )}
                  </div>
                  
                  {/* Info del capítulo - MEJORADA */}
                  <div className="text-left flex-1 min-w-0">
                    <span className="font-bold text-gray-900 block text-sm sm:text-base line-clamp-1 group-hover:text-amber-700 transition-colors">
                      {chapter.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        {progress.total} módulo{progress.total !== 1 ? 's' : ''}
                      </span>
                      {progress.completed > 0 && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className={`text-xs sm:text-sm font-bold ${
                            isComplete ? 'text-green-600' : 'text-amber-600'
                          }`}>
                            {progress.percentage}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Icono chevron - MÁS GRANDE */}
                <div className="flex-shrink-0 ml-2 sm:ml-3">
                  {isExpanded ? (
                    <ChevronDown size={20} className="sm:w-6 sm:h-6 text-amber-600 transition-transform" />
                  ) : (
                    <ChevronRight size={20} className="sm:w-6 sm:h-6 text-gray-400 group-hover:text-amber-600 transition-all" />
                  )}
                </div>
              </button>
              
              {/* Lista de módulos expandida - TOUCH TARGETS OPTIMIZADOS */}
              {isExpanded && (
                <div className="bg-gradient-to-b from-gray-50 to-white px-3 sm:px-4 py-2 sm:py-3 animate-fadeIn">
                  {chapter.modules?.map((module, index) => {
                    const isSelected = isModuleSelected(chapter.title, module.id);
                    const isCompleted = isModuleCompleted(module.id);

                    return (
                      <button
                        key={module.id}
                        onClick={() => onSelectModule(chapter, module)}
                        className={`
                          w-full text-left px-3 sm:px-4 py-3 sm:py-4 rounded-xl mb-2
                          flex items-center gap-2 sm:gap-3 transition-all duration-200 group/module
                          touch-manipulation
                          min-h-[56px] sm:min-h-[64px]
                          ${isSelected
                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 shadow-lg border-2 border-amber-300 scale-[1.02]'
                            : isCompleted
                              ? 'bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-300'
                              : 'bg-white hover:bg-amber-50 border-2 border-gray-200 hover:border-amber-300 hover:shadow-md'
                          }
                        `}
                        type="button"
                        aria-label={`${module.title}${isCompleted ? ', completado' : ''}`}
                      >
                        {/* Icono de tipo - MÁS GRANDE */}
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                          {getModuleIcon(module.type)}
                        </div>
                        
                        {/* Info del módulo - MEJORADA */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`
                              text-sm sm:text-base font-semibold block line-clamp-1
                              ${isSelected 
                                ? 'text-amber-900' 
                                : isCompleted
                                  ? 'text-green-900'
                                  : 'text-gray-900'
                              }
                            `}>
                              {module.title}
                            </span>
                          </div>
                          {module.duration && (
                            <span className={`
                              text-xs sm:text-sm font-medium
                              ${isSelected 
                                ? 'text-amber-700' 
                                : isCompleted
                                  ? 'text-green-600'
                                  : 'text-gray-500'
                              }
                            `}>
                              {module.duration}
                            </span>
                          )}
                        </div>
                        
                        {/* Iconos de estado - MÁS GRANDES */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                          {isCompleted && (
                            <CheckCircle2 
                              size={16} 
                              className={`sm:w-5 sm:h-5 ${
                                isSelected ? 'text-amber-600' : 'text-green-600'
                              }`}
                            />
                          )}
                          {module.driveUrl && (
                            <ExternalLink 
                              size={14} 
                              className={`sm:w-4 sm:h-4 ${
                                isSelected 
                                  ? 'text-amber-600' 
                                  : isCompleted
                                    ? 'text-green-500'
                                    : 'text-gray-400 group-hover/module:text-amber-500'
                              }`}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Footer con estadísticas - TOUCH TARGETS OPTIMIZADOS */}
      <div className="bg-gradient-to-r from-gray-50 to-amber-50 px-4 sm:px-5 py-4 sm:py-5 border-t-2 border-gray-200 flex-shrink-0 min-h-[72px] sm:min-h-[80px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`
              w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md
              ${stats.percentage === 100 
                ? 'bg-green-500' 
                : stats.percentage > 0 
                  ? 'bg-amber-500' 
                  : 'bg-gray-400'
              }
            `}>
              <span className="text-white font-black text-sm sm:text-base">
                {stats.percentage}%
              </span>
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-gray-900">
                {stats.completed}/{stats.totalModules} completados
              </p>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {stats.totalModules - stats.completed} restante{stats.totalModules - stats.completed !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {stats.percentage === 100 && (
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-100 border-2 border-green-200 rounded-full shadow-sm min-h-[36px] sm:min-h-[40px]">
              <CheckCircle2 size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-green-700">
                ¡Completado!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Estilos personalizados */}
      <style>{`
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Line clamp */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </aside>
  );
};