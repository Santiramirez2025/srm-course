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

  // Iconos por tipo de módulo
  const getModuleIcon = (type: Module['type']) => {
    const icons = {
      video: <Play size={16} className="flex-shrink-0 text-amber-600" />,
      document: <FileText size={16} className="flex-shrink-0 text-blue-600" />,
      text: <FileText size={16} className="flex-shrink-0 text-purple-600" />
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

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-20 sm:top-24">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
          <div className="h-6 bg-white/20 rounded w-3/4 mb-2" />
          <div className="h-4 bg-white/20 rounded w-1/2" />
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
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
    <aside className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden sticky top-20 sm:top-24 max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-7rem)] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 p-4 sm:p-5 relative overflow-hidden flex-shrink-0">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12" />
        </div>
        
        <div className="relative">
          <h2 className="text-white font-black text-lg sm:text-xl mb-1">
            Contenido del Curso
          </h2>
          <p className="text-amber-50 text-xs sm:text-sm">
            {stats.totalChapters} capítulo{stats.totalChapters !== 1 ? 's' : ''} • {stats.totalModules} módulo{stats.totalModules !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Barra de progreso en header */}
        {stats.totalModules > 0 && (
          <div className="mt-3 relative">
            <div className="flex items-center justify-between text-xs text-amber-50 mb-1.5">
              <span className="font-medium">Tu Progreso</span>
              <span className="font-bold">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${stats.percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Lista de capítulos con scroll */}
      <div className="divide-y divide-gray-100 overflow-y-auto flex-1 custom-scrollbar">
        {chapters.map((chapter) => {
          const progress = getChapterProgress(chapter);
          const isExpanded = expandedChapter === chapter.id;
          const isComplete = progress.completed === progress.total && progress.total > 0;

          return (
            <div key={chapter.id} className="transition-colors duration-200">
              {/* Header del capítulo */}
              <button
                onClick={() => onToggleChapter(chapter.id)}
                className="w-full px-4 py-3 sm:py-4 flex items-center justify-between hover:bg-amber-50 transition-all duration-200 group"
                aria-expanded={isExpanded}
                aria-label={`${chapter.title}, ${progress.completed} de ${progress.total} módulos completados`}
              >
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  {/* Número del capítulo */}
                  <div className={`
                    w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center 
                    text-sm sm:text-base font-bold transition-all duration-300
                    flex-shrink-0
                    ${isComplete
                      ? 'bg-green-500 text-white shadow-md'
                      : progress.completed > 0
                        ? 'bg-amber-100 text-amber-700 group-hover:bg-amber-200'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }
                  `}>
                    {isComplete ? (
                      <CheckCircle2 size={16} className="sm:w-5 sm:h-5" />
                    ) : (
                      chapter.id
                    )}
                  </div>
                  
                  {/* Info del capítulo */}
                  <div className="text-left flex-1 min-w-0">
                    <span className="font-semibold text-gray-900 block text-sm sm:text-base truncate group-hover:text-amber-700 transition-colors">
                      {chapter.title}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">
                        {progress.total} módulo{progress.total !== 1 ? 's' : ''}
                      </span>
                      {progress.completed > 0 && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className={`text-xs font-semibold ${
                            isComplete ? 'text-green-600' : 'text-amber-600'
                          }`}>
                            {progress.percentage}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Icono chevron */}
                <div className="flex-shrink-0 ml-2">
                  {isExpanded ? (
                    <ChevronDown size={18} className="sm:w-5 sm:h-5 text-amber-600 transition-transform" />
                  ) : (
                    <ChevronRight size={18} className="sm:w-5 sm:h-5 text-gray-400 group-hover:text-amber-600 transition-all" />
                  )}
                </div>
              </button>
              
              {/* Lista de módulos expandida */}
              {isExpanded && (
                <div className="bg-gradient-to-b from-gray-50 to-white px-3 sm:px-4 py-2 animate-fadeIn">
                  {chapter.modules?.map((module, index) => {
                    const isSelected = isModuleSelected(chapter.title, module.id);
                    const isCompleted = isModuleCompleted(module.id);

                    return (
                      <button
                        key={module.id}
                        onClick={() => onSelectModule(chapter, module)}
                        className={`
                          w-full text-left px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl mb-1.5
                          flex items-center gap-2 sm:gap-3 transition-all duration-200 group/module
                          ${isSelected
                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 shadow-md border border-amber-200 scale-[1.02]'
                            : isCompleted
                              ? 'bg-green-50 hover:bg-green-100 border border-green-100'
                              : 'bg-white hover:bg-amber-50 border border-gray-100 hover:border-amber-200 hover:shadow-sm'
                          }
                        `}
                        type="button"
                        aria-label={`${module.title}${isCompleted ? ', completado' : ''}`}
                      >
                        {/* Icono de tipo */}
                        <div className="flex-shrink-0">
                          {getModuleIcon(module.type)}
                        </div>
                        
                        {/* Info del módulo */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`
                              text-xs sm:text-sm font-medium block truncate
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
                              text-[10px] sm:text-xs
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
                        
                        {/* Iconos de estado */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {isCompleted && (
                            <CheckCircle2 
                              size={14} 
                              className={`sm:w-4 sm:h-4 ${
                                isSelected ? 'text-amber-600' : 'text-green-600'
                              }`}
                            />
                          )}
                          {module.driveUrl && (
                            <ExternalLink 
                              size={12} 
                              className={`sm:w-3.5 sm:h-3.5 ${
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
      
      {/* Footer con estadísticas */}
      <div className="bg-gradient-to-r from-gray-50 to-amber-50 px-4 py-3 sm:py-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              ${stats.percentage === 100 
                ? 'bg-green-500' 
                : stats.percentage > 0 
                  ? 'bg-amber-500' 
                  : 'bg-gray-400'
              }
            `}>
              <span className="text-white font-bold text-xs sm:text-sm">
                {stats.percentage}%
              </span>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                {stats.completed}/{stats.totalModules} completados
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600">
                {stats.totalModules - stats.completed} restante{stats.totalModules - stats.completed !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {stats.percentage === 100 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 border border-green-200 rounded-full">
              <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5 text-green-600" />
              <span className="text-[10px] sm:text-xs font-bold text-green-700">
                ¡Completado!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Estilos personalizados */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
      `}</style>
    </aside>
  );
};