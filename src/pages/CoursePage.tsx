import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Award, TrendingUp, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
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
  const [mounted, setMounted] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll progress in content
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const progress = scrollHeight > clientHeight 
          ? Math.min(scrollTop / (scrollHeight - clientHeight), 1)
          : 0;
        setScrollProgress(progress);
      }
    };

    const ref = contentRef.current;
    ref?.addEventListener('scroll', handleScroll, { passive: true });
    return () => ref?.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading state premium
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="space-y-8 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-4">
              <div className="h-12 bg-white/60 rounded-2xl w-2/3 mx-auto" />
              <div className="h-6 bg-white/60 rounded-xl w-1/2 mx-auto" />
              <div className="flex justify-center gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 w-32 bg-white/60 rounded-xl" />
                ))}
              </div>
            </div>
            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 h-96 bg-white/60 rounded-3xl" />
              <div className="lg:col-span-8 h-96 bg-white/60 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      
      {/* Animated ambient orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl transition-transform duration-[5000ms]"
          style={{ transform: `translate(${scrollProgress * 50}px, ${scrollProgress * 100}px)` }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl transition-transform duration-[5000ms]"
          style={{ transform: `translate(-${scrollProgress * 30}px, -${scrollProgress * 80}px)` }}
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        
        {/* Header Premium */}
        <header 
          className="mb-8 lg:mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 lg:p-10 overflow-hidden">
            
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-orange-50/30 pointer-events-none" />
            
            <div className="relative">
              {/* Title & Subtitle */}
              <div className="text-center mb-6 lg:mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight">
                  <span className="bg-gradient-to-br from-amber-600 via-orange-600 to-orange-700 bg-clip-text text-transparent">
                    {courseData.title}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                  {courseData.subtitle}
                </p>
              </div>

              {/* Progress Stats Premium */}
              {courseProgress && courseProgress.total > 0 && (
                <div className="space-y-6">
                  {/* Progress bar with animation */}
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles size={18} className="text-amber-500" />
                        <span>Progreso del curso</span>
                      </div>
                      <span className="text-2xl font-black bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {courseProgress.percentage}%
                      </span>
                    </div>
                    
                    <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${courseProgress.percentage}%`,
                          boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-2">
                      <span>{courseProgress.completed} de {courseProgress.total} completados</span>
                      {selectedModule && (
                        <span className="font-semibold text-amber-600">
                          Módulo {currentModuleNumber} de {totalModules}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <StatCard 
                      icon={BookOpen}
                      value={courseProgress.total}
                      label="Módulos"
                      color="amber"
                    />
                    <StatCard 
                      icon={Award}
                      value={courseProgress.completed}
                      label="Completados"
                      color="green"
                    />
                    <StatCard 
                      icon={TrendingUp}
                      value={`${courseProgress.percentage}%`}
                      label="Avance"
                      color="orange"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
          }}
        >
          
          {/* Sidebar - Chapter List */}
          <aside 
            className={`
              lg:col-span-4 xl:col-span-3 order-2 lg:order-1
              transition-all duration-500 ease-out
              ${sidebarCollapsed ? 'lg:col-span-1' : 'lg:col-span-4 xl:col-span-3'}
            `}
          >
            <div className="sticky top-6 space-y-4">
              {/* Collapse button - Desktop only */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex items-center justify-center w-full py-3 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                aria-label={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="text-gray-600 group-hover:text-amber-600 transition-colors" />
                ) : (
                  <ChevronLeft className="text-gray-600 group-hover:text-amber-600 transition-colors" />
                )}
              </button>

              {/* Chapter list with conditional rendering */}
              {!sidebarCollapsed && (
                <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                  <ChapterList
                    chapters={courseData.chapters}
                    expandedChapter={expandedChapter}
                    selectedModule={selectedModule}
                    onToggleChapter={onToggleChapter}
                    onSelectModule={onSelectModule}
                    completedModules={completedModules}
                    isLoading={false}
                  />
                </div>
              )}
            </div>
          </aside>

          {/* Main Content Area */}
          <main 
            ref={contentRef}
            className={`
              lg:col-span-8 xl:col-span-9 order-1 lg:order-2
              transition-all duration-500 ease-out
              ${sidebarCollapsed ? 'lg:col-span-11' : 'lg:col-span-8 xl:col-span-9'}
            `}
          >
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/50 overflow-hidden min-h-[600px]">
              {selectedModule ? (
                <div className="relative">
                  {/* Module navigation - Floating on scroll */}
                  {scrollProgress > 0.1 && (
                    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-gray-900 truncate max-w-xs">
                          {selectedModule.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasPrevious && onNavigateModule && (
                          <button
                            onClick={() => onNavigateModule('prev')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Módulo anterior"
                          >
                            <ChevronLeft size={18} />
                          </button>
                        )}
                        {hasNext && onNavigateModule && (
                          <button
                            onClick={() => onNavigateModule('next')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Módulo siguiente"
                          >
                            <ChevronRight size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

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
                </div>
              ) : (
                <EmptyModuleState 
                  totalModules={totalModules}
                  courseTitle={courseData.title}
                  hasProgress={courseProgress && courseProgress.completed > 0}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* GPU acceleration */
        [style*="transform"] {
          will-change: transform;
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  icon: React.ElementType;
  value: number | string;
  label: string;
  color: 'amber' | 'green' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color }) => {
  const colorClasses = {
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700'
  };

  const iconClasses = {
    amber: 'text-amber-600',
    green: 'text-green-600',
    orange: 'text-orange-600'
  };

  return (
    <div className={`flex items-center gap-2.5 px-5 py-3 ${colorClasses[color]} rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 min-h-[48px]`}>
      <Icon size={20} className={`${iconClasses[color]} flex-shrink-0`} />
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-black">{value}</span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
    </div>
  );
};

// Empty State Premium
interface EmptyModuleStateProps {
  totalModules: number;
  courseTitle: string;
  hasProgress?: boolean;
}

const EmptyModuleState: React.FC<EmptyModuleStateProps> = ({ 
  totalModules,
  courseTitle,
  hasProgress = false
}) => {
  return (
    <div className="flex items-center justify-center min-h-[600px] p-8 sm:p-12">
      <div className="max-w-lg text-center space-y-8">
        
        {/* Animated icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-amber-200/50 rounded-full blur-3xl animate-pulse" />
          <div className="relative w-32 h-32 bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-2xl">
            <BookOpen className="w-16 h-16 text-amber-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            {hasProgress ? '¡Continúa aprendiendo!' : 'Comienza tu viaje'}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {hasProgress 
              ? 'Selecciona un módulo para continuar con tu progreso en '
              : 'Explora los módulos disponibles en '}
            <span className="font-bold text-gray-900">{courseTitle}</span>
          </p>
        </div>

        {/* Module count */}
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-lg">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <BookOpen size={20} className="text-amber-600" />
          </div>
          <div className="text-left">
            <div className="text-2xl font-black text-gray-900">{totalModules}</div>
            <div className="text-sm font-semibold text-gray-600">Módulos disponibles</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-200/50 rounded-2xl p-6 text-left space-y-4 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">💡</span>
            </div>
            <h3 className="font-black text-gray-900">Pasos para comenzar</h3>
          </div>
          
          <div className="space-y-3">
            {[
              'Explora los capítulos en el menú lateral',
              'Haz clic en un capítulo para expandirlo',
              'Selecciona un módulo para empezar'
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <div className="w-6 h-6 bg-amber-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative separator */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300" />
          <Sparkles size={16} className="text-amber-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300" />
        </div>
      </div>
    </div>
  );
};