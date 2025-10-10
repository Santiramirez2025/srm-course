import React from 'react';
import { ChapterList } from '@components/course/ChapterList';
import { ModuleContent } from '@components/course/ModuleContent';
import { EmptyState } from '@components/common/EmptyState';
import { CourseData, Module, Chapter } from '@data/types';

interface CoursePageProps {
  courseData: CourseData;
  expandedChapter: number | null;
  selectedModule: (Module & { chapterTitle: string }) | null;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({
  courseData,
  expandedChapter,
  selectedModule,
  onToggleChapter,
  onSelectModule
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {courseData.title}
        </h1>
        <p className="text-lg text-gray-600">{courseData.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ChapterList
            chapters={courseData.chapters}
            expandedChapter={expandedChapter}
            selectedModule={selectedModule}
            onToggleChapter={onToggleChapter}
            onSelectModule={onSelectModule}
          />
        </div>

        <div className="lg:col-span-2">
          {selectedModule ? (
            <ModuleContent module={selectedModule} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};