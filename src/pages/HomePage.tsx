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
// HERO COMPONENT
// ============================================

const Hero: React.FC<HeroProps> = ({ title, subtitle, onStartCourse, courseProgress, stats }) => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300">
        <Sparkles className="w-4 h-4 text-violet-400" />
        <span>Academia Digital SRM</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
        <span className="bg-gradient-to-br from-white via-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      
      <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>

      {courseProgress && (
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span className="text-gray-300">{stats.totalModules} módulos</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-violet-400" />
            <span className="text-gray-300">{courseProgress.percentage}% completado</span>
          </div>
        </div>
      )}
      
      <button
        onClick={onStartCourse}
        className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="relative z-10">Comenzar Curso</span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
      </button>
    </div>
  </div>
);

// ============================================
// CHAPTER GRID COMPONENT
// ============================================

const ChapterGrid: React.FC<ChapterGridProps> = ({ chapters, onChapterClick, completedModules }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
    {chapters.map((chapter: Chapter, index: number) => {
      const completed = chapter.modules?.filter((m: Module) => completedModules.has(m.id)).length || 0;
      const total = chapter.modules?.length || 0;
      const progress = total > 0 ? (completed / total) * 100 : 0;
      
      return (
        <div
          key={chapter.id}
          onClick={() => onChapterClick(chapter.id)}
          className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all duration-500" />
          
          <div className="relative space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center text-sm font-bold text-violet-300">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {total} módulos
                  </p>
                </div>
              </div>
            </div>

            {chapter.description && (
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                {chapter.description}
              </p>
            )}

            {progress > 0 && (
              <div className="space-y-2">
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
// MAIN COMPONENT
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
  const chaptersRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

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
      behavior: 'smooth', 
      block: 'start' 
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
      
      {/* Minimal starfield */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent)
          `,
          backgroundSize: '200px 200px, 300px 300px, 250px 250px, 400px 400px, 350px 350px',
          backgroundPosition: '0 0, 40px 60px, 130px 270px, 70px 100px, 200px 150px',
        }}
      />

      {/* Subtle ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
            transform: `translate(${scrollProgress * 50}px, ${scrollProgress * 80}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.3) 0%, transparent 70%)',
            bottom: '10%',
            right: '-10%',
            transform: `translate(-${scrollProgress * 40}px, -${scrollProgress * 60}px)`,
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
        
        {/* Elegant scroll indicator */}
        {!courseProgress?.completed && (
          <button
            onClick={scrollToChapters}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer"
            aria-label="Ver capítulos del curso"
          >
            <span className="text-xs font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider">
              Explorar Contenido
            </span>

            <div className="relative w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110 transition-all duration-300">
              <ChevronDown 
                size={20} 
                className="text-gray-400 group-hover:text-white group-hover:translate-y-0.5 transition-all duration-300" 
                strokeWidth={2}
              />
            </div>
          </button>
        )}
      </div>

      {/* Chapters Section */}
      <div 
        ref={chaptersRef}
        className="relative z-10 scroll-mt-20 pt-32 pb-32"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
        }}
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 mb-16 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
            Contenido del Curso
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {courseData.chapters?.length || 0} capítulos diseñados para llevar tu carrera al siguiente nivel
          </p>

          {courseProgress && courseProgress.total > 0 && (
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300 mt-6">
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

      {/* Minimal Footer */}
      <footer className="relative z-10 mt-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              Academia Digital <span className="text-violet-400 font-semibold">SRM</span> © 2025
            </p>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Transformando carreras profesionales con educación de calidad
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Progress Card */}
      {courseProgress && courseProgress.completed > 0 && (
        <div 
          className="fixed bottom-8 right-8 z-40 transition-all duration-500"
          style={{
            opacity: isHeroVisible ? 0 : 1,
            transform: isHeroVisible ? 'translateY(100px) scale(0.9)' : 'translateY(0) scale(1)',
            pointerEvents: isHeroVisible ? 'none' : 'auto'
          }}
        >
          <div className="relative group">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20 p-5 min-w-[240px] group-hover:bg-white/[0.05] group-hover:border-white/20 transition-all duration-300">
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <span className="text-white font-bold text-xl">
                    {courseProgress.percentage}%
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Progreso Total
                  </p>
                  <p className="text-sm font-semibold text-white">
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

      {/* Scroll to Top Button */}
      {scrollProgress > 0.3 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-40 w-12 h-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/[0.08] hover:text-white hover:border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-black/10"
          aria-label="Volver arriba"
          style={{
            opacity: scrollProgress > 0.3 ? 1 : 0,
            transform: `translateY(${scrollProgress > 0.3 ? '0' : '20px'})`
          }}
        >
          <ChevronUp size={20} strokeWidth={2} />
        </button>
      )}
    </div>
  );
};

export { HomePage };
export default HomePage;