import React from 'react';
import { Chapter } from '@data/types';
import { BookOpen, ChevronRight, CheckCircle, Lock, TrendingUp, Sparkles, Zap } from 'lucide-react';

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
        cardBg: 'from-green-500/5 to-emerald-500/5',
        border: 'border-green-400/30',
        glowColor: 'from-green-500 to-emerald-600',
        numberBg: 'from-green-500 to-emerald-600',
        numberShadow: 'shadow-green-500/30',
        textHover: 'group-hover:text-green-400',
        buttonBg: 'from-green-500/10 to-emerald-500/10',
        buttonBorder: 'border-green-400/30',
        buttonText: 'text-green-400',
        buttonHover: 'hover:bg-green-500/20 hover:border-green-400/50',
        progress: 'from-green-500 to-emerald-600',
        badgeBg: 'from-green-500/20 to-emerald-500/20',
        badgeBorder: 'border-green-400/30',
        badgeText: 'text-green-400'
      };
    }
    if (progress.isStarted) {
      return {
        gradient: 'from-purple-500 to-fuchsia-600',
        cardBg: 'from-purple-500/5 to-fuchsia-500/5',
        border: 'border-purple-400/30',
        glowColor: 'from-purple-500 to-fuchsia-600',
        numberBg: 'from-purple-500 to-fuchsia-600',
        numberShadow: 'shadow-purple-500/30',
        textHover: 'group-hover:text-purple-400',
        buttonBg: 'from-purple-500/10 to-fuchsia-500/10',
        buttonBorder: 'border-purple-400/30',
        buttonText: 'text-purple-400',
        buttonHover: 'hover:bg-purple-500/20 hover:border-purple-400/50',
        progress: 'from-purple-500 to-fuchsia-600',
        badgeBg: 'from-purple-500/20 to-fuchsia-500/20',
        badgeBorder: 'border-purple-400/30',
        badgeText: 'text-purple-400'
      };
    }
    return {
      gradient: 'from-gray-400 to-gray-500',
      cardBg: 'from-white/5 to-white/5',
      border: 'border-white/10',
      glowColor: 'from-gray-400 to-gray-500',
      numberBg: 'from-gray-600 to-gray-700',
      numberShadow: 'shadow-gray-500/20',
      textHover: 'group-hover:text-purple-400',
      buttonBg: 'from-white/5 to-white/10',
      buttonBorder: 'border-white/20',
      buttonText: 'text-gray-300',
      buttonHover: 'hover:bg-white/10 hover:border-purple-400/30 hover:text-purple-400',
      progress: 'from-gray-500 to-gray-600',
      badgeBg: 'from-gray-500/20 to-gray-600/20',
      badgeBorder: 'border-gray-400/30',
      badgeText: 'text-gray-400'
    };
  };

  const isChapterLocked = (index: number) => {
    return false;
  };

  if (isLoading) {
    return (
      <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-6 animate-pulse min-h-[340px] border border-white/10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl mb-4" />
            <div className="h-7 bg-white/10 rounded mb-3 w-3/4" />
            <div className="h-4 bg-white/10 rounded mb-2 w-full" />
            <div className="h-4 bg-white/10 rounded mb-4 w-full" />
            <div className="h-12 bg-white/10 rounded w-full mt-6" />
          </div>
        ))}
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <div className="mt-20 text-center py-16 max-w-6xl mx-auto px-4">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full opacity-30 blur-2xl" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <BookOpen size={40} className="text-white" />
          </div>
        </div>
        <p className="text-gray-300 text-lg font-medium">No hay capítulos disponibles</p>
      </div>
    );
  }

  const totalModulesCount = chapters.reduce((sum, ch) => sum + (ch.modules?.length || 0), 0);
  const overallProgress = totalModulesCount > 0 
    ? Math.round((completedModules.size / totalModulesCount) * 100) 
    : 0;

  return (
    <div className="mt-8 sm:mt-12 md:mt-14 lg:mt-16 max-w-6xl mx-auto">
      {/* Header Premium con estadísticas */}
      <div className="mb-10 sm:mb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 mb-2">
              Explora los Capítulos
            </h2>
            <p className="text-base sm:text-lg text-gray-300 font-medium">
              {chapters.length} capítulo{chapters.length !== 1 ? 's' : ''} • {totalModulesCount} módulos totales
            </p>
          </div>
          
          {/* Progress badge premium */}
          {completedModules.size > 0 && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity duration-300" />
              <div className="relative flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                    {overallProgress}%
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Completado
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid Premium de capítulos */}
      <div className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 pb-safe">
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
                group relative rounded-3xl overflow-hidden
                transition-all duration-500 ease-out
                min-h-[340px] sm:min-h-[360px]
                ${isLocked 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'cursor-pointer hover:scale-105 hover:-translate-y-2'
                }
                ${isActive ? 'scale-105' : ''}
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
              {/* Mega glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${colors.glowColor} rounded-3xl opacity-0 ${!isLocked && 'group-hover:opacity-40'} blur-xl transition-opacity duration-500`} />
              
              {/* Card background */}
              <div className={`relative h-full bg-gradient-to-br ${colors.cardBg} backdrop-blur-2xl border-2 ${colors.border} rounded-3xl shadow-2xl overflow-hidden`}>
                
                {/* Progress bar superior premium */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-white/5 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${colors.progress} transition-all duration-1000 ease-out relative shadow-lg`}
                    style={{ 
                      width: `${progress.percentage}%`,
                      boxShadow: progress.percentage > 0 ? '0 0 20px currentColor' : 'none'
                    }}
                    role="progressbar"
                    aria-valuenow={progress.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {progress.percentage > 0 && progress.percentage < 100 && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        style={{ animation: 'shimmer 3s infinite' }}
                      />
                    )}
                  </div>
                </div>

                {/* Status badge premium */}
                <div className="absolute top-5 right-5 z-10">
                  {isLocked ? (
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-xl border border-white/20">
                      <Lock size={20} className="text-gray-400" />
                    </div>
                  ) : progress.isComplete ? (
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50" />
                      <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-2xl">
                        <CheckCircle size={24} className="text-white" />
                      </div>
                    </div>
                  ) : progress.isStarted ? (
                    <div className={`relative px-4 py-2 bg-gradient-to-br ${colors.badgeBg} backdrop-blur-xl border-2 ${colors.badgeBorder} rounded-xl shadow-lg`}>
                      <span className={`text-sm font-black ${colors.badgeText}`}>
                        {progress.percentage}%
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="p-6 flex flex-col h-full relative z-10">
                  {/* Número del capítulo premium */}
                  <div className="relative mb-5">
                    <div className={`absolute -inset-1 bg-gradient-to-br ${colors.numberBg} rounded-2xl blur opacity-50`} />
                    <div className={`
                      relative w-16 h-16 bg-gradient-to-br ${colors.numberBg}
                      rounded-2xl flex items-center justify-center 
                      text-white font-black text-3xl shadow-2xl ${colors.numberShadow}
                      transition-all duration-500
                      ${!isLocked && 'group-hover:scale-110 group-hover:rotate-6'}
                    `}>
                      {chapter.id}
                      {/* Overlay shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                    </div>
                  </div>

                  {/* Título premium */}
                  <h3 className={`
                    text-2xl sm:text-3xl font-black text-white mb-3 leading-tight
                    transition-colors duration-300
                    ${colors.textHover}
                  `}>
                    {chapter.title}
                  </h3>
                  
                  {/* Descripción */}
                  <p className="text-gray-300 text-base mb-5 line-clamp-2 leading-relaxed flex-grow">
                    {chapter.description}
                  </p>

                  {/* Info de módulos premium */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 bg-gradient-to-br ${colors.numberBg} rounded-lg flex items-center justify-center shadow-lg`}>
                        <BookOpen size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-bold text-gray-300">
                        {chapter.modules?.length || 0} módulo{(chapter.modules?.length || 0) !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {progress.isStarted && !isLocked && (
                      <div className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br ${colors.badgeBg} border ${colors.badgeBorder} rounded-xl shadow-lg backdrop-blur-xl`}>
                        <Zap size={14} className={colors.badgeText} />
                        <span className={`text-sm font-black ${colors.badgeText}`}>
                          {progress.completed}/{progress.total}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button premium */}
                  {!isLocked && (
                    <button 
                      className={`
                        mt-5 w-full group/btn relative overflow-hidden
                        py-4 px-5 rounded-xl font-black text-base
                        transition-all duration-300
                        min-h-[56px]
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChapterClick(chapter.id);
                      }}
                      type="button"
                      aria-label={`${progress.isComplete ? 'Revisar' : progress.isStarted ? 'Continuar' : 'Comenzar'} capítulo ${chapter.id}`}
                    >
                      {/* Button background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.buttonBg} backdrop-blur-xl border-2 ${colors.buttonBorder} rounded-xl ${colors.buttonHover} transition-all duration-300`} />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 rounded-xl" />
                      
                      <span className={`relative flex items-center justify-center gap-2 ${colors.buttonText} group-hover/btn:scale-105 transition-transform`}>
                        {progress.isComplete && <CheckCircle size={20} />}
                        {progress.isStarted && !progress.isComplete && <Zap size={20} />}
                        {!progress.isStarted && <Sparkles size={20} />}
                        <span>
                          {progress.isComplete 
                            ? 'Revisar capítulo' 
                            : progress.isStarted 
                              ? 'Continuar' 
                              : 'Comenzar'}
                        </span>
                        <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  )}

                  {isLocked && (
                    <div className="mt-5 w-full flex items-center justify-center gap-2 py-4 px-5 bg-white/5 backdrop-blur-xl text-gray-400 rounded-xl text-base font-bold border-2 border-white/10 min-h-[56px]">
                      <Lock size={20} />
                      <span>Próximamente</span>
                    </div>
                  )}
                </div>

                {/* Active indicator */}
                {isActive && !isLocked && (
                  <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${colors.progress} shadow-lg`} 
                       style={{ boxShadow: '0 -4px 20px currentColor' }} />
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Safe Area Bottom */}
      <div className="safe-area-bottom" />
    </div>
  );
};