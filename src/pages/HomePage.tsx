import React, { useEffect, useState, useRef } from 'react';
import { Hero } from '@components/home/Hero';
import { ChapterGrid } from '@components/home/ChapterGrid';
import { CourseData } from '@data/types';
import { ChevronDown } from 'lucide-react';

interface HomePageProps {
  courseData: CourseData;
  onStartCourse: () => void;
  completedModules?: Set<number>;
  courseProgress?: {
    total: number;
    completed: number;
    percentage: number;
  };
  onChapterClick?: (chapterId: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  courseData, 
  onStartCourse,
  completedModules = new Set(),
  courseProgress,
  onChapterClick
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mount animation trigger
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Hero visibility tracking
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsHeroVisible(heroBottom > 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterClick = (chapterId: number) => {
    if (onChapterClick) {
      onChapterClick(chapterId);
    } else {
      onStartCourse();
    }
  };

  const scrollToChapters = () => {
    chaptersRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const totalModules = React.useMemo(() => {
    return courseData.chapters?.reduce(
      (sum, ch) => sum + (ch.modules?.length || 0), 
      0
    ) || 0;
  }, [courseData.chapters]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" />
      
      {/* Ambient blur orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-200/40 rounded-full blur-3xl transition-all duration-[3000ms] ease-out"
          style={{ 
            transform: `translate(${scrollProgress * 100}px, ${scrollProgress * 200}px) scale(${1 + scrollProgress * 0.5})`,
            opacity: 0.6 - scrollProgress * 0.3
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-3xl transition-all duration-[3000ms] ease-out"
          style={{ 
            transform: `translate(-${scrollProgress * 80}px, -${scrollProgress * 150}px) scale(${1 + scrollProgress * 0.3})`,
            opacity: 0.5 - scrollProgress * 0.2
          }}
        />
      </div>

      {/* Progress indicator */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 z-50 transition-transform duration-150 ease-out origin-left"
        style={{ 
          transform: `scaleX(${scrollProgress})`,
          opacity: scrollProgress > 0.05 ? 1 : 0
        }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de scroll"
      />

      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <Hero
          title={courseData.title}
          subtitle={courseData.subtitle}
          onStartCourse={onStartCourse}
          courseProgress={courseProgress}
          stats={{
            totalModules: totalModules,
            estimatedHours: undefined,
            completionRate: courseProgress?.percentage
          }}
        />
        
        {/* Scroll indicator - Solo visible si no hay progreso */}
        {!courseProgress?.completed && (
          <button
            onClick={scrollToChapters}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-amber-600 transition-all duration-300 group animate-bounce-slow"
            aria-label="Ver capítulos del curso"
          >
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Ver capítulos
            </span>
            <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:border-amber-300 transition-all">
              <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </div>
          </button>
        )}
      </div>

      {/* Transition gradient overlay */}
      <div 
        className="relative h-24 sm:h-32 lg:h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 251, 235, 0) 0%, rgba(255, 251, 235, 0.5) 50%, rgba(255, 251, 235, 1) 100%)',
          marginTop: '-6rem'
        }}
      />

      {/* Chapters Section */}
      <div 
        ref={chaptersRef}
        className="relative z-10 scroll-mt-20"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
        }}
      >
        {/* Section header con animación de entrada */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
              <span className="bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Contenido del Curso
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              {courseData.chapters?.length || 0} capítulos diseñados para tu crecimiento profesional
            </p>
          </div>
        </div>

        {/* Chapter Grid con reveal escalonado */}
        <div className="pb-16 sm:pb-20 lg:pb-24">
          <ChapterGrid 
            chapters={courseData.chapters || []}
            onChapterClick={handleChapterClick}
            completedModules={completedModules}
            isLoading={false}
          />
        </div>
      </div>

      {/* Floating progress badge - Solo visible cuando hay progreso */}
      {courseProgress && courseProgress.completed > 0 && (
        <div 
          className="fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out"
          style={{
            opacity: isHeroVisible ? 0 : 1,
            transform: isHeroVisible ? 'translateY(100px) scale(0.8)' : 'translateY(0) scale(1)',
            pointerEvents: isHeroVisible ? 'none' : 'auto'
          }}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-4 min-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">
                  {courseProgress.percentage}%
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Progreso total
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {courseProgress.completed}/{courseProgress.total} módulos
                </p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${courseProgress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {scrollProgress > 0.3 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-xl border border-gray-200/50 flex items-center justify-center text-gray-700 hover:text-amber-600 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Volver arriba"
          style={{
            opacity: scrollProgress > 0.3 ? 1 : 0,
            transform: `translateY(${scrollProgress > 0.3 ? '0' : '20px'})`
          }}
        >
          <ChevronDown size={24} className="rotate-180" />
        </button>
      )}

      <style>{`
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 5rem;
        }

        /* iOS momentum scrolling */
        * {
          -webkit-overflow-scrolling: touch;
        }

        /* Bounce animation optimizada */
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }

        /* Prevent layout shift */
        .scroll-mt-20 {
          scroll-margin-top: 5rem;
        }

        /* GPU acceleration para elementos animados */
        [style*="transform"] {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Optimización para móviles */
        @media (max-width: 768px) {
          /* Prevent zoom on input focus */
          input, textarea, select {
            font-size: 16px !important;
          }

          /* Reduce motion on mobile for performance */
          @media (prefers-reduced-motion: no-preference) {
            * {
              scroll-behavior: smooth;
            }
          }
        }

        /* Mejora de contraste para accesibilidad */
        @media (prefers-contrast: high) {
          .bg-white\\/90 {
            background-color: white;
          }
        }

        /* Reduce motion para usuarios con preferencia */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Safe areas para notch de iOS */
        @supports (padding: env(safe-area-inset-top)) {
          .safe-area-inset {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }
      `}</style>
    </div>
  );
};