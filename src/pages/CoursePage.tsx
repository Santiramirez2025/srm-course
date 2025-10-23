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
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-8 sm:mb-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-2xl h-96 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      {/* Header del curso */}
      <header className="text-center mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {courseData.title}
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-4">
            {courseData.subtitle}
          </p>

          {/* Stats del curso */}
          {courseProgress && courseProgress.total > 0 && (
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {/* Total de módulos */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <BookOpen size={18} className="text-amber-600 flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-700">
                  {courseProgress.total} módulos
                </span>
              </div>

              {/* Completados */}
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl border border-green-200">
                <Award size={18} className="text-green-600 flex-shrink-0" />
                <span className="text-sm font-semibold text-green-700">
                  {courseProgress.completed} completados
                </span>
              </div>

              {/* Porcentaje */}
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
                <TrendingUp size={18} className="text-amber-600 flex-shrink-0" />
                <span className="text-sm font-bold text-amber-700">
                  {courseProgress.percentage}%
                </span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Sidebar - Lista de capítulos */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
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
        <main className="lg:col-span-2 order-1 lg:order-2">
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
    </div>
  );
};

// Componente EmptyState optimizado
interface EmptyModuleStateProps {
  totalModules: number;
  courseTitle: string;
}

const EmptyModuleState: React.FC<EmptyModuleStateProps> = ({ 
  totalModules,
  courseTitle 
}) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center">
      <div className="max-w-md mx-auto">
        {/* Icono */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-amber-200 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600" />
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
          Selecciona un Módulo
        </h2>

        {/* Descripción */}
        <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
          Elige un módulo de la lista para comenzar tu aprendizaje en{' '}
          <span className="font-semibold text-gray-900">{courseTitle}</span>
        </p>

        {/* Estadísticas */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm bg-amber-50 text-amber-700 px-4 py-2 rounded-full border border-amber-200">
            <BookOpen size={16} className="flex-shrink-0" />
            <span className="font-semibold">
              {totalModules} módulo{totalModules !== 1 ? 's' : ''} disponible{totalModules !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 text-left">
          <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
            <span className="text-amber-600">💡</span>
            Cómo empezar:
          </h3>
          <ol className="text-xs sm:text-sm text-gray-700 space-y-2 pl-1">
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-600 flex-shrink-0">1.</span>
              <span>Explora los capítulos en el menú lateral</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-600 flex-shrink-0">2.</span>
              <span>Haz clic en un capítulo para ver sus módulos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-amber-600 flex-shrink-0">3.</span>
              <span>Selecciona un módulo para comenzar a aprender</span>
            </li>
          </ol>
        </div>

        {/* CTA decorativo */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300" />
          <span>Comienza tu aprendizaje ahora</span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300" />
        </div>
      </div>
    </div>
  );
};