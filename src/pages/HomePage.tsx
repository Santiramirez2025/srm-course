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
    <div className="relative min-h-screen pb-16 sm:pb-20 lg:pb-24">
      <Hero
        title={courseData.title}
        subtitle={courseData.subtitle}
        onStartCourse={onStartCourse}
        courseProgress={courseProgress}
        stats={{
          totalModules: totalModules,
          estimatedHours: undefined,  // ✅ Opcional
          completionRate: courseProgress?.percentage
        }}
        // ✅ Removido logo prop (opcional)
      />
      
      <ChapterGrid 
        chapters={courseData.chapters || []}
        onChapterClick={handleChapterClick}
        completedModules={completedModules}
        isLoading={false}
      />
    </div>
  );
};