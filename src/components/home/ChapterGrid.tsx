import React from 'react';
import { Chapter } from '@data/types';
import { BookOpen, ChevronRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChapterGridProps {
  chapters: Chapter[];
  onChapterClick: (chapterId: number) => void;
  completedModules?: Set<number>;
  currentChapterId?: number | null;
}

export const ChapterGrid: React.FC<ChapterGridProps> = ({ 
  chapters, 
  onChapterClick,
  completedModules = new Set(),
  currentChapterId = null
}) => {
  const { t } = useTranslation();

  // Calcular módulos completados por capítulo
  const getChapterProgress = (chapter: Chapter) => {
    const totalModules = chapter.modules.length;
    const completed = chapter.modules.filter(m => completedModules.has(m.id)).length;
    const percentage = totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
    const isComplete = completed === totalModules && totalModules > 0;

    return { completed, total: totalModules, percentage, isComplete };
  };

  // Determinar el color del capítulo según progreso
  const getChapterColor = (progress: ReturnType<typeof getChapterProgress>) => {
    if (progress.isComplete) return 'from-green-500 to-emerald-600';
    if (progress.completed > 0) return 'from-amber-500 to-orange-600';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {chapters.map((chapter, index) => {
        const progress = getChapterProgress(chapter);
        const isActive = currentChapterId === chapter.id;
        const gradientColor = getChapterColor(progress);

        return (
          <div 
            key={chapter.id}
            onClick={() => onChapterClick(chapter.id)}
            className={`
              group relative bg-white rounded-xl shadow-md hover:shadow-xl 
              transition-all duration-300 cursor-pointer overflow-hidden
              ${isActive ? 'ring-2 ring-amber-500 scale-105' : 'hover:scale-105'}
            `}
            role="button"
            tabIndex={0}
            aria-label={`${chapter.title}, ${progress.completed} de ${progress.total} módulos completados`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChapterClick(chapter.id);
              }
            }}
          >
            {/* Barra de progreso superior */}
            {progress.percentage > 0 && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className={`h-full bg-gradient-to-r ${gradientColor} transition-all duration-500`}
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            )}

            {/* Badge de completado */}
            {progress.isComplete && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10">
                <CheckCircle size={20} className="text-white" />
              </div>
            )}

            <div className="p-6">
              {/* Número del capítulo con gradiente */}
              <div className={`
                w-14 h-14 bg-gradient-to-br ${gradientColor}
                rounded-xl flex items-center justify-center 
                text-white font-bold text-2xl mb-4 shadow-md
                group-hover:scale-110 transition-transform duration-300
              `}>
                {chapter.id}
              </div>

              {/* Título y descripción */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {chapter.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                {chapter.description}
              </p>

              {/* Info de módulos y progreso */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {chapter.modules.length} {chapter.modules.length === 1 ? t('chapter.module') : t('chapter.modules')}
                  </span>
                </div>

                {progress.completed > 0 && (
                  <span className={`
                    text-xs font-semibold px-2 py-1 rounded-full
                    ${progress.isComplete 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'}
                  `}>
                    {progress.completed}/{progress.total}
                  </span>
                )}
              </div>

              {/* Botón de acción */}
              <button 
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors group-hover:bg-amber-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onChapterClick(chapter.id);
                }}
              >
                <span className="font-medium text-sm">
                  {progress.isComplete 
                    ? t('chapter.review') 
                    : progress.completed > 0 
                      ? t('chapter.continue') 
                      : t('chapter.start')}
                </span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Efecto hover de fondo */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/50 group-hover:to-orange-50/30 transition-all duration-300 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};