import React, { useMemo, useCallback } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, Play, FileText, CheckCircle2, Circle, Lock, Sparkles, TrendingUp, Award } from 'lucide-react';
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

// ============================================
// MEMOIZED SUB-COMPONENTS
// ============================================

const ModuleIcon = React.memo<{ type: Module['type'] }>(({ type }) => {
  const icons = {
    video: <Play size={18} className="sm:w-5 sm:h-5 flex-shrink-0 text-purple-400" />,
    document: <FileText size={18} className="sm:w-5 sm:h-5 flex-shrink-0 text-blue-400" />,
    text: <FileText size={18} className="sm:w-5 sm:h-5 flex-shrink-0 text-fuchsia-400" />,
    game: <Lock size={18} className="sm:w-5 sm:h-5 flex-shrink-0 text-pink-400" />
  };
  return icons[type] || icons.text;
});

ModuleIcon.displayName = 'ModuleIcon';

// ============================================
// MODULE ITEM COMPONENT
// ============================================

interface ModuleItemProps {
  module: Module;
  chapter: Chapter;
  moduleIndex: number;
  isSelected: boolean;
  isCompleted: boolean;
  onSelect: (chapter: Chapter, module: Module) => void;
}

const ModuleItem = React.memo<ModuleItemProps>(({
  module,
  chapter,
  moduleIndex,
  isSelected,
  isCompleted,
  onSelect
}) => {
  const handleClick = useCallback(() => {
    onSelect(chapter, module);
  }, [onSelect, chapter, module]);

  return (
    <button
      onClick={handleClick}
      className={`
        relative group/module w-full text-left p-4 sm:p-5 rounded-2xl mb-3
        flex items-center gap-3 sm:gap-4 transition-all duration-300
        touch-manipulation
        min-h-[64px] sm:min-h-[72px]
        ${isSelected
          ? 'bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 shadow-2xl border-2 border-purple-400/50 scale-[1.02]'
          : isCompleted
            ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:bg-green-500/20 border-2 border-green-400/30 hover:border-green-400/50'
            : 'bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-purple-400/30 hover:shadow-lg'
        }
      `}
      type="button"
      aria-label={`${module.title}${isCompleted ? ', completado' : ''}`}
      style={{
        animation: 'fadeInUp 0.4s ease-out both',
        animationDelay: `${moduleIndex * 50}ms`
      }}
    >
      {/* Glow effect en hover */}
      {!isSelected && (
        <div className={`
          absolute -inset-1 rounded-2xl opacity-0 group-hover/module:opacity-100 blur transition-opacity duration-300
          ${isCompleted 
            ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30'
            : 'bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30'
          }
        `} />
      )}

      {/* Icono de tipo */}
      <div className={`
        relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300
        ${isSelected
          ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-500/30 scale-110'
          : isCompleted
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30 group-hover/module:scale-110'
            : 'bg-white/10 group-hover/module:bg-white/20 group-hover/module:scale-110'
        }
      `}>
        <ModuleIcon type={module.type} />
      </div>
      
      {/* Info del módulo */}
      <div className="relative flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`
            text-sm sm:text-base font-bold block line-clamp-1
            ${isSelected 
              ? 'text-white' 
              : isCompleted
                ? 'text-green-300'
                : 'text-gray-200'
            }
          `}>
            {module.title}
          </span>
        </div>
        {module.duration && (
          <span className={`
            text-xs sm:text-sm font-semibold
            ${isSelected 
              ? 'text-purple-200' 
              : isCompleted
                ? 'text-green-400'
                : 'text-gray-400'
            }
          `}>
            {module.duration}
          </span>
        )}
      </div>
      
      {/* Iconos de estado */}
      <div className="relative flex items-center gap-2 flex-shrink-0">
        {isCompleted && (
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            ${isSelected 
              ? 'bg-white/20' 
              : 'bg-green-500/20'
            }
          `}>
            <CheckCircle2 
              className={`w-5 h-5 ${
                isSelected ? 'text-white' : 'text-green-400'
              }`}
              strokeWidth={2.5}
            />
          </div>
        )}
        {module.driveUrl && (
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center transition-all
            ${isSelected 
              ? 'bg-white/20' 
              : isCompleted
                ? 'bg-green-500/20'
                : 'bg-white/5 group-hover/module:bg-purple-500/20'
            }
          `}>
            <ExternalLink 
              className={`w-4 h-4 ${
                isSelected 
                  ? 'text-white' 
                  : isCompleted
                    ? 'text-green-400'
                    : 'text-gray-400 group-hover/module:text-purple-400'
              }`}
            />
          </div>
        )}
      </div>
    </button>
  );
}, (prev, next) => {
  // Custom comparator para prevenir re-renders innecesarios
  return (
    prev.module.id === next.module.id &&
    prev.isSelected === next.isSelected &&
    prev.isCompleted === next.isCompleted &&
    prev.moduleIndex === next.moduleIndex
  );
});

ModuleItem.displayName = 'ModuleItem';

// ============================================
// CHAPTER ITEM COMPONENT
// ============================================

interface ChapterItemProps {
  chapter: Chapter;
  chapterIndex: number;
  isExpanded: boolean;
  progress: { completed: number; total: number; percentage: number };
  selectedModule: (Module & { chapterTitle: string }) | null;
  completedModules: Set<number>;
  onToggle: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
}

const ChapterItem = React.memo<ChapterItemProps>(({
  chapter,
  chapterIndex,
  isExpanded,
  progress,
  selectedModule,
  completedModules,
  onToggle,
  onSelectModule
}) => {
  const isComplete = progress.completed === progress.total && progress.total > 0;

  const handleToggle = useCallback(() => {
    onToggle(chapter.id);
  }, [onToggle, chapter.id]);

  return (
    <div 
      className="transition-colors duration-200"
      style={{
        animation: 'fadeInLeft 0.5s ease-out both',
        animationDelay: `${chapterIndex * 50}ms`
      }}
    >
      {/* Header del capítulo */}
      <button
        onClick={handleToggle}
        className="w-full px-5 sm:px-6 py-5 sm:py-6 flex items-center justify-between hover:bg-white/5 transition-all duration-300 group touch-manipulation min-h-[80px] sm:min-h-[88px]"
        aria-expanded={isExpanded}
        aria-label={`${chapter.title}, ${progress.completed} de ${progress.total} módulos completados`}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Número del capítulo */}
          <div className="relative">
            <div className={`
              w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center 
              text-lg sm:text-xl font-black transition-all duration-300
              flex-shrink-0 shadow-lg
              ${isComplete
                ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/30 scale-110'
                : progress.completed > 0
                  ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-purple-500/30 group-hover:scale-110'
                  : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white'
              }
            `}>
              {isComplete ? (
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
              ) : (
                chapter.id
              )}
            </div>

            {/* Badge de progreso */}
            {progress.completed > 0 && !isComplete && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-lg border-2 border-slate-950">
                {progress.completed}
              </div>
            )}
          </div>
          
          {/* Info del capítulo */}
          <div className="text-left flex-1 min-w-0">
            <span className="font-black text-white block text-base sm:text-lg line-clamp-1 group-hover:text-purple-300 transition-colors">
              {chapter.title}
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-sm text-gray-400 font-semibold">
                {progress.total} módulo{progress.total !== 1 ? 's' : ''}
              </span>
              {progress.completed > 0 && (
                <>
                  <span className="text-gray-600">•</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      isComplete ? 'bg-green-400 animate-pulse' : 'bg-purple-400 animate-pulse'
                    }`} />
                    <span className={`text-sm font-black ${
                      isComplete ? 'text-green-400' : 'text-purple-400'
                    }`}>
                      {progress.percentage}%
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Icono chevron */}
        <div className="flex-shrink-0 ml-3">
          {isExpanded ? (
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-purple-400 transition-transform" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-white/5 group-hover:bg-white/10 rounded-xl flex items-center justify-center transition-all">
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-all" />
            </div>
          )}
        </div>
      </button>
      
      {/* Lista de módulos expandida */}
      {isExpanded && chapter.modules && (
        <div className="bg-gradient-to-b from-white/5 to-transparent px-4 sm:px-5 py-3 sm:py-4 animate-fadeIn">
          {chapter.modules.map((module, moduleIndex) => {
            const isSelected = selectedModule?.id === module.id && selectedModule?.chapterTitle === chapter.title;
            const isCompleted = completedModules.has(module.id);

            return (
              <ModuleItem
                key={module.id}
                module={module}
                chapter={chapter}
                moduleIndex={moduleIndex}
                isSelected={isSelected}
                isCompleted={isCompleted}
                onSelect={onSelectModule}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}, (prev, next) => {
  // Custom comparator para prevenir re-renders innecesarios
  return (
    prev.chapter.id === next.chapter.id &&
    prev.isExpanded === next.isExpanded &&
    prev.progress.completed === next.progress.completed &&
    prev.progress.percentage === next.progress.percentage &&
    prev.selectedModule?.id === next.selectedModule?.id &&
    prev.completedModules === next.completedModules
  );
});

ChapterItem.displayName = 'ChapterItem';

// ============================================
// MAIN COMPONENT
// ============================================

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
  }, [chapters, completedModules.size]);

  // Calcular progreso por capítulo - Memoizado con key específica
  const chapterProgressMap = useMemo(() => {
    const map = new Map();
    chapters.forEach(chapter => {
      const totalModules = chapter.modules?.length || 0;
      const completed = chapter.modules?.filter(m => completedModules.has(m.id)).length || 0;
      const percentage = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
      
      map.set(chapter.id, { completed, total: totalModules, percentage });
    });
    return map;
  }, [chapters, completedModules]);

  // Callback estable
  const handleToggleChapter = useCallback((chapterId: number) => {
    onToggleChapter(chapterId);
  }, [onToggleChapter]);

  const handleSelectModule = useCallback((chapter: Chapter, module: Module) => {
    onSelectModule(chapter, module);
  }, [onSelectModule]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden sticky top-20 sm:top-24">
        <div className="bg-gradient-to-r from-purple-600/50 to-fuchsia-600/50 p-6 sm:p-8">
          <div className="h-8 bg-white/10 rounded-xl w-3/4 mb-3 animate-pulse" />
          <div className="h-5 bg-white/10 rounded-lg w-1/2 animate-pulse" />
        </div>
        <div className="divide-y divide-white/5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 sm:p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 bg-white/5 rounded-lg w-3/4 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-7rem)] flex flex-col">
      {/* Header Premium */}
      <div className="relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600" />
        
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16 blur-3xl" />
        </div>
        
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-black text-xl sm:text-2xl leading-tight">
                Contenido del Curso
              </h2>
              <p className="text-purple-100 text-sm sm:text-base font-medium">
                {stats.totalChapters} capítulo{stats.totalChapters !== 1 ? 's' : ''} • {stats.totalModules} módulo{stats.totalModules !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Progress bar premium */}
          {stats.totalModules > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-white">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-bold">Tu Progreso</span>
                </div>
                <span className="text-2xl font-black">
                  {stats.percentage}%
                </span>
              </div>
              
              <div className="relative w-full bg-white/20 rounded-full h-3 sm:h-3.5 overflow-hidden backdrop-blur-sm border border-white/30">
                <div
                  className="h-full bg-white rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${stats.percentage}%` }}
                  role="progressbar"
                  aria-valuenow={stats.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  
                  {stats.percentage > 0 && (
                    <div className="absolute inset-0 bg-white blur-sm opacity-50" />
                  )}
                </div>

                <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
                  {[...Array(stats.totalChapters)].map((_, i) => {
                    const milestonePercentage = ((i + 1) / stats.totalChapters) * 100;
                    const isPassed = stats.percentage >= milestonePercentage;
                    
                    return (
                      <div 
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isPassed 
                            ? 'bg-white shadow-lg shadow-white/50 scale-125' 
                            : 'bg-white/30'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Motivational message */}
              {stats.percentage > 0 && stats.percentage < 100 && (
                <p className="text-xs text-purple-100 text-center animate-fade-in">
                  {stats.percentage < 30 && "🚀 Excelente comienzo!"}
                  {stats.percentage >= 30 && stats.percentage < 60 && "💪 Vas por buen camino!"}
                  {stats.percentage >= 60 && stats.percentage < 90 && "🔥 Casi ahí, seguí así!"}
                  {stats.percentage >= 90 && "⭐ Un último esfuerzo!"}
                </p>
              )}

              {stats.percentage === 100 && (
                <div className="flex items-center justify-center gap-2 text-yellow-300 animate-bounce">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    ¡Todo Completado!
                  </span>
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Lista de capítulos con scroll */}
      <div className="divide-y divide-white/5 overflow-y-auto flex-1 custom-scrollbar">
        {chapters.map((chapter, chapterIndex) => {
          const progress = chapterProgressMap.get(chapter.id) || { completed: 0, total: 0, percentage: 0 };
          const isExpanded = expandedChapter === chapter.id;

          return (
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              chapterIndex={chapterIndex}
              isExpanded={isExpanded}
              progress={progress}
              selectedModule={selectedModule}
              completedModules={completedModules}
              onToggle={handleToggleChapter}
              onSelectModule={handleSelectModule}
            />
          );
        })}
      </div>
      
      {/* Footer con estadísticas */}
      <div className="relative overflow-hidden flex-shrink-0 min-h-[88px] sm:min-h-[96px]">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/30 to-slate-900" />
        
        <div className="relative px-5 sm:px-6 py-5 sm:py-6 border-t-2 border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`
                relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500
                ${stats.percentage === 100 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/50 animate-pulse' 
                  : stats.percentage > 0 
                    ? 'bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-purple-500/50' 
                    : 'bg-white/10'
                }
              `}>
                {stats.percentage === 100 ? (
                  <Award className="w-8 h-8 text-white" />
                ) : (
                  <span className="text-white font-black text-lg sm:text-xl">
                    {stats.percentage}%
                  </span>
                )}
              </div>
              <div>
                <p className="text-base sm:text-lg font-black text-white">
                  {stats.completed}/{stats.totalModules}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 font-semibold">
                  {stats.totalModules - stats.completed} restante{stats.totalModules - stats.completed !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {stats.percentage === 100 && (
              <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/30 rounded-full shadow-lg backdrop-blur-sm min-h-[40px] sm:min-h-[44px]">
                <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                <span className="text-sm sm:text-base font-black text-green-300">
                  ¡Completado!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estilos personalizados */}
      <style>{`
        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(168, 85, 247, 0.5) rgba(255, 255, 255, 0.05);
        }

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