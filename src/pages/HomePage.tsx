import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { ChevronDown, ChevronUp, Sparkles, BookOpen, Award } from 'lucide-react';
import { Chapter, Module } from '@data/types';

// ============================================
// INTERFACES
// ============================================

interface CourseProgress {
  total: number;
  completed: number;
  percentage: number;
}

interface Stats {
  totalModules: number;
  completionRate?: number;
}

interface CourseData {
  title: string;
  subtitle: string;
  chapters: Chapter[];
}

interface HeroProps {
  title: string;
  subtitle: string;
  onStartCourse: () => void;
  courseProgress?: CourseProgress | null;
  stats: Stats;
}

interface ChapterGridProps {
  chapters: Chapter[];
  onChapterClick: (chapterId: number) => void;
  completedModules: Set<number>;
}

interface HomePageProps {
  courseData: CourseData;
  onStartCourse: () => void;
  completedModules?: Set<number>;
  courseProgress?: CourseProgress | null;
  onChapterClick?: (id: number) => void;
}

// ============================================
// HERO COMPONENT - RESPONSIVE
// ============================================

const Hero: React.FC<HeroProps> = ({ title, subtitle, onStartCourse, courseProgress, stats }) => (
  <div className="min-h-[100svh] flex items-center justify-center px-4 sm:px-6 md:px-8">
    <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs sm:text-sm text-gray-300">
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400" />
        <span>Academia Digital SRM</span>
      </div>
      
      {/* Title - Responsive */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight px-4">
        <span className="bg-gradient-to-br from-white via-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      
      {/* Subtitle - Responsive */}
      <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
        {subtitle}
      </p>

      {/* Stats - Responsive */}
      {courseProgress && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span className="text-gray-300">{stats.totalModules} módulos</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-violet-400" />
            <span className="text-gray-300">{courseProgress.percentage}% completado</span>
          </div>
        </div>
      )}
      
      {/* CTA Button - Responsive */}
      <button
        onClick={onStartCourse}
        className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-sm sm:text-base text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
      >
        <span className="relative z-10">Comenzar Curso</span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
      </button>
    </div>
  </div>
);

// ============================================
// CHAPTER GRID COMPONENT - RESPONSIVE
// ============================================

const ChapterGrid: React.FC<ChapterGridProps> = ({ chapters, onChapterClick, completedModules }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    {chapters.map((chapter: Chapter, index: number) => {
      const completed = chapter.modules?.filter((m: Module) => completedModules.has(m.id)).length || 0;
      const total = chapter.modules?.length || 0;
      const progress = total > 0 ? (completed / total) * 100 : 0;
      
      return (
        <div
          key={chapter.id}
          onClick={() => onChapterClick(chapter.id)}
          className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 cursor-pointer touch-manipulation active:scale-[0.98]"
        >
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-500" />
          
          <div className="relative space-y-3 sm:space-y-4">
            {/* Header - Responsive */}
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center text-xs sm:text-sm font-bold text-violet-300 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base sm:text-lg leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                    {total} módulos
                  </p>
                </div>
              </div>
            </div>

            {/* Description - Responsive */}
            {chapter.description && (
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                {chapter.description}
              </p>
            )}

            {/* Progress Bar - Responsive */}
            {progress > 0 && (
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Progreso</span>
                  <span className="text-violet-400 font-medium">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

// ============================================
// MAIN COMPONENT - RESPONSIVE
// ============================================

const HomePage: React.FC<HomePageProps> = ({ 
  courseData,
  onStartCourse,
  completedModules = new Set(),
  courseProgress = null,
  onChapterClick
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsHeroVisible(heroBottom > 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterClick = useCallback((chapterId: number) => {
    if (onChapterClick) {
      onChapterClick(chapterId);
    } else {
      onStartCourse();
    }
  }, [onChapterClick, onStartCourse]);

  const scrollToChapters = useCallback(() => {
    chaptersRef.current?.scrollIntoView({ 
      behavior: isMobile ? 'instant' : 'smooth', 
      block: 'start' 
    });
  }, [isMobile]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: isMobile ? 'instant' : 'smooth' 
    });
  }, [isMobile]);

  const totalModules = useMemo(() => {
    return courseData.chapters?.reduce(
      (sum, ch) => sum + (ch.modules?.length || 0), 
      0
    ) || 0;
  }, [courseData.chapters]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      
      {/* Ultra-subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-[#0a0a0f] to-fuchsia-950/10" />
      
      {/* Minimal starfield - Optimizado para mobile */}
      <div 
        className={`fixed inset-0 ${isMobile ? 'opacity-20' : 'opacity-30'}`}
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent)
          `,
          backgroundSize: isMobile 
            ? '150px 150px, 200px 200px, 175px 175px, 250px 250px, 225px 225px'
            : '200px 200px, 300px 300px, 250px 250px, 400px 400px, 350px 350px',
          backgroundPosition: '0 0, 40px 60px, 130px 270px, 70px 100px, 200px 150px',
        }}
      />

      {/* Subtle ambient glow - Reducido en mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute rounded-full ${isMobile ? 'opacity-10' : 'opacity-20'} blur-3xl`}
          style={{ 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            width: isMobile ? '400px' : '600px',
            height: isMobile ? '400px' : '600px',
            top: '10%',
            left: '-10%',
            transform: isMobile 
              ? `translate(${scrollProgress * 30}px, ${scrollProgress * 50}px)`
              : `translate(${scrollProgress * 50}px, ${scrollProgress * 80}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className={`absolute rounded-full ${isMobile ? 'opacity-8' : 'opacity-15'} blur-3xl`}
          style={{ 
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.3) 0%, transparent 70%)',
            width: isMobile ? '350px' : '500px',
            height: isMobile ? '350px' : '500px',
            bottom: '10%',
            right: '-10%',
            transform: isMobile
              ? `translate(-${scrollProgress * 25}px, -${scrollProgress * 40}px)`
              : `translate(-${scrollProgress * 40}px, -${scrollProgress * 60}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Minimal progress bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-0.5 z-50 transition-opacity duration-300"
        style={{ opacity: scrollProgress > 0.02 ? 1 : 0 }}
      >
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-200 ease-out origin-left"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Hero
          title={courseData.title}
          subtitle={courseData.subtitle}
          onStartCourse={onStartCourse}
          courseProgress={courseProgress}
          stats={{
            totalModules: totalModules,
            completionRate: courseProgress?.percentage
          }}
        />
        
        {/* Elegant scroll indicator - Responsive */}
        {!courseProgress?.completed && (
          <button
            onClick={scrollToChapters}
            className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer touch-manipulation"
            aria-label="Ver capítulos del curso"
          >
            <span className="text-xs font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider hidden sm:block">
              Explorar Contenido
            </span>

            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110 active:scale-95 transition-all duration-300">
              <ChevronDown 
                size={isMobile ? 18 : 20} 
                className="text-gray-400 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-300" 
                strokeWidth={2}
              />
            </div>
          </button>
        )}
      </div>

      {/* Chapters Section - Responsive spacing */}
      <div 
        ref={chaptersRef}
        className="relative z-10 scroll-mt-16 sm:scroll-mt-20 pt-20 sm:pt-28 md:pt-32 pb-20 sm:pb-28 md:pb-32"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
        }}
      >
        {/* Section Header - Responsive */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12 sm:mb-14 md:mb-16 text-center space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
            Contenido del Curso
          </h2>
          
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            {courseData.chapters?.length || 0} capítulos diseñados para llevar tu carrera al siguiente nivel
          </p>

          {courseProgress && courseProgress.total > 0 && (
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs sm:text-sm text-gray-300 mt-4 sm:mt-6">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <span>{courseProgress.completed} de {courseProgress.total} módulos completados</span>
            </div>
          )}
        </div>

        <ChapterGrid 
          chapters={courseData.chapters || []}
          onChapterClick={handleChapterClick}
          completedModules={completedModules}
        />
      </div>

      {/* Minimal Footer - Responsive */}
      <footer className="relative z-10 mt-20 sm:mt-28 md:mt-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm text-gray-500">
              Academia Digital <span className="text-violet-400 font-semibold">SRM</span> © 2025
            </p>
            <p className="text-xs text-gray-600 max-w-md mx-auto px-4">
              Transformando carreras profesionales con educación de calidad
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Progress Card - Responsive */}
      {courseProgress && courseProgress.completed > 0 && (
        <div 
          className={`fixed z-40 transition-all duration-500 ${
            isMobile 
              ? 'bottom-4 right-4 left-4' 
              : 'bottom-8 right-8'
          }`}
          style={{
            opacity: isHeroVisible ? 0 : 1,
            transform: isHeroVisible ? 'translateY(100px) scale(0.9)' : 'translateY(0) scale(1)',
            pointerEvents: isHeroVisible ? 'none' : 'auto'
          }}
        >
          <div className="relative group">
            <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl shadow-black/20 p-4 sm:p-5 ${
              isMobile ? 'w-full' : 'min-w-[240px]'
            } group-hover:bg-white/[0.05] group-hover:border-white/20 transition-all duration-300`}>
              
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
                  <span className="text-white font-bold text-lg sm:text-xl">
                    {courseProgress.percentage}%
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Progreso Total
                  </p>
                  <p className="text-sm font-semibold text-white truncate">
                    {courseProgress.completed}/{courseProgress.total} módulos
                  </p>
                </div>
              </div>
              
              <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${courseProgress.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button - Responsive */}
      {scrollProgress > 0.3 && (
        <button
          onClick={scrollToTop}
          className={`fixed z-40 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/[0.08] hover:text-white hover:border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-black/10 touch-manipulation ${
            isMobile 
              ? 'bottom-20 left-4 w-10 h-10'
              : 'bottom-8 left-8 w-12 h-12'
          }`}
          aria-label="Volver arriba"
          style={{
            opacity: scrollProgress > 0.3 ? 1 : 0,
            transform: `translateY(${scrollProgress > 0.3 ? '0' : '20px'})`
          }}
        >
          <ChevronUp size={isMobile ? 18 : 20} strokeWidth={2} />
        </button>
      )}
    </div>
  );
};

export { HomePage };
export default HomePage;