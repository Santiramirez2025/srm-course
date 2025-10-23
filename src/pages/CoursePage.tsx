import React from 'react';
import { BookOpen, Award, TrendingUp } from 'lucide-react';
import { ChapterList } from '@components/course/ChapterList';
import { ModuleContent } from '@components/course/ModuleContent';
import { CourseData, Module, Chapter } from '@data/types';

interface CoursePageProps {
  courseData: CourseData;
  expandedChapter: number | null;
  selectedModule: (Module & { chapterTitle: string; chapterId: number }) | null;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  completedModules?: Set<number>;
  onNavigateModule?: (direction: 'prev' | 'next') => void;
  onModuleComplete?: (moduleId: number) => void;
  onModuleBookmark?: (moduleId: number) => void;
  bookmarkedModules?: Set<number>;
  hasPrevious?: boolean;
  hasNext?: boolean;
  currentModuleNumber?: number;
  totalModules?: number;
  courseProgress?: {
    total: number;
    completed: number;
    percentage: number;
  };
  isLoading?: boolean;
}

export const CoursePage: React.FC<CoursePageProps> = ({
  courseData,
  expandedChapter,
  selectedModule,
  onToggleChapter,
  onSelectModule,
  completedModules = new Set(),
  onNavigateModule,
  onModuleComplete,
  onModuleBookmark,
  bookmarkedModules = new Set(),
  hasPrevious = false,
  hasNext = false,
  currentModuleNumber = 1,
  totalModules = 0,
  courseProgress,
  isLoading = false
}) => {
  // Loading skeleton - MEJORADO
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-pulse">
          <div className="h-10 sm:h-12 bg-gray-200 rounded-xl w-3/4 mx-auto mb-4" />
          <div className="h-6 sm:h-7 bg-gray-200 rounded-lg w-1/2 mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-200 rounded-2xl h-96 sm:h-[480px] animate-pulse" />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-2xl h-96 sm:h-[480px] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* Safe Area Top */}
      <div className="safe-area-top" />

      {/* Header del curso - OPTIMIZADO */}
      <header className="text-center mb-8 sm:mb-10 md:mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {courseData.title}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed px-4 sm:px-6">
            {courseData.subtitle}
          </p>

          {/* Stats del curso - TOUCH TARGETS OPTIMIZADOS */}
          {courseProgress && courseProgress.total > 0 && (
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-2">
              {/* Total de módulos */}
              <div className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-white rounded-xl shadow-sm border border-gray-200 min-h-[44px] touch-manipulation">
                <BookOpen size={18} className="sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-gray-700">
                  {courseProgress.total} módulo{courseProgress.total !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Completados */}
              <div className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-green-50 rounded-xl border border-green-200 min-h-[44px] touch-manipulation">
                <Award size={18} className="sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-green-700">
                  {courseProgress.completed} completado{courseProgress.completed !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Porcentaje */}
              <div className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-amber-50 rounded-xl border border-amber-200 min-h-[44px] touch-manipulation">
                <TrendingUp size={18} className="sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                <span className="text-sm sm:text-base font-bold text-amber-700">
                  {courseProgress.percentage}%
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Grid principal - OPTIMIZADO PARA MÓVIL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
        {/* Sidebar - Lista de capítulos */}
        <aside 
          className="lg:col-span-1 order-2 lg:order-1"
          aria-label="Lista de capítulos del curso"
        >
          <ChapterList
            chapters={courseData.chapters}
            expandedChapter={expandedChapter}
            selectedModule={selectedModule}
            onToggleChapter={onToggleChapter}
            onSelectModule={onSelectModule}
            completedModules={completedModules}
            isLoading={false}
          />
        </aside>

        {/* Main content - Contenido del módulo */}
        <main 
          className="lg:col-span-2 order-1 lg:order-2"
          aria-label="Contenido del módulo"
        >
          {selectedModule ? (
            <ModuleContent
              module={selectedModule}
              onComplete={onModuleComplete}
              onNavigate={onNavigateModule}
              onBookmark={onModuleBookmark}
              isCompleted={completedModules.has(selectedModule.id)}
              isBookmarked={bookmarkedModules?.has(selectedModule.id)}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              currentModuleNumber={currentModuleNumber}
              totalModules={totalModules}
              isLoading={false}
            />
          ) : (
            <EmptyModuleState 
              totalModules={totalModules}
              courseTitle={courseData.title}
            />
          )}
        </main>
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

        /* Optimización para pantallas muy pequeñas */
        @media (max-width: 360px) {
          .text-3xl {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

// Componente EmptyState OPTIMIZADO 100% MOBILE
interface EmptyModuleStateProps {
  totalModules: number;
  courseTitle: string;
}

const EmptyModuleState: React.FC<EmptyModuleStateProps> = ({ 
  totalModules,
  courseTitle 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 md:p-10 lg:p-12 text-center">
      <div className="max-w-md mx-auto">
        {/* Icono - MÁS GRANDE */}
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-amber-200 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
            <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-amber-600" />
          </div>
        </div>

        {/* Título - RESPONSIVE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
          Selecciona un Módulo
        </h2>

        {/* Descripción - MEJOR LEGIBILIDAD */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
          Elige un módulo de la lista para comenzar tu aprendizaje en{' '}
          <span className="font-semibold text-gray-900">{courseTitle}</span>
        </p>

        {/* Estadísticas - TOUCH TARGET OPTIMIZADO */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-sm sm:text-base bg-amber-50 text-amber-700 px-5 py-3 rounded-full border border-amber-200 min-h-[44px] shadow-sm">
            <BookOpen size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-semibold">
              {totalModules} módulo{totalModules !== 1 ? 's' : ''} disponible{totalModules !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Instrucciones - OPTIMIZADO */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-left shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-xl sm:text-2xl">💡</span>
            <span>Cómo empezar:</span>
          </h3>
          <ol className="text-sm sm:text-base text-gray-700 space-y-3 sm:space-y-4 pl-1">
            <li className="flex items-start gap-3">
              <span className="font-black text-amber-600 flex-shrink-0 text-base sm:text-lg">1.</span>
              <span className="leading-relaxed">Explora los capítulos en el menú lateral</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-black text-amber-600 flex-shrink-0 text-base sm:text-lg">2.</span>
              <span className="leading-relaxed">Haz clic en un capítulo para ver sus módulos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-black text-amber-600 flex-shrink-0 text-base sm:text-lg">3.</span>
              <span className="leading-relaxed">Selecciona un módulo para comenzar a aprender</span>
            </li>
          </ol>
        </div>

        {/* CTA decorativo - MÁS VISIBLE */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 font-medium">
          <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-gray-300" />
          <span>Comienza tu aprendizaje ahora</span>
          <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-gray-300" />
        </div>
      </div>
    </div>
  );
};