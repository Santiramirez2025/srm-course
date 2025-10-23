import React from 'react';
import { Hero } from '@components/home/Hero';
import { ChapterGrid } from '@components/home/ChapterGrid';
import { CourseData } from '@data/types';

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
  const handleChapterClick = (chapterId: number) => {
    if (onChapterClick) {
      onChapterClick(chapterId);
    } else {
      onStartCourse();
    }
  };

  const totalModules = React.useMemo(() => {
    return courseData.chapters?.reduce(
      (sum, ch) => sum + (ch.modules?.length || 0), 
      0
    ) || 0;
  }, [courseData.chapters]);

  return (
    <div className="relative min-h-screen">
      {/* Safe Area Top para iOS */}
      <div className="safe-area-top" />
      
      {/* Container principal con padding responsive mejorado */}
      <div className="pb-16 sm:pb-20 md:pb-24 lg:pb-28">
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
        
        {/* Separación optimizada entre Hero y ChapterGrid */}
        <div className="h-8 sm:h-12 md:h-16" aria-hidden="true" />
        
        <ChapterGrid 
          chapters={courseData.chapters || []}
          onChapterClick={handleChapterClick}
          completedModules={completedModules}
          isLoading={false}
        />
      </div>

      {/* Safe Area Bottom para iOS */}
      <div className="safe-area-bottom" />

      {/* Estilos específicos para HomePage */}
      <style>{`
        /* Safe Area Support para iOS */
        .safe-area-top {
          height: env(safe-area-inset-top);
        }
        
        .safe-area-bottom {
          height: env(safe-area-inset-bottom);
        }

        /* Optimización de scroll en móvil */
        @media (max-width: 768px) {
          html {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Prevenir zoom accidental en inputs (móvil) */
        @media (max-width: 768px) {
          input, textarea, select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};