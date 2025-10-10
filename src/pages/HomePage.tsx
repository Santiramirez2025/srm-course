import React from 'react';
import { Hero } from '@components/home/Hero';
import { ChapterGrid } from '@components/home/ChapterGrid';
import { CourseData } from '@data/types';

interface HomePageProps {
  courseData: CourseData;
  onStartCourse: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ courseData, onStartCourse }) => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Hero
        title={courseData.title}
        subtitle={courseData.subtitle}
        onStartCourse={onStartCourse}
      />
      <ChapterGrid 
        chapters={courseData.chapters}
        onChapterClick={onStartCourse}
      />
    </div>
  );
};