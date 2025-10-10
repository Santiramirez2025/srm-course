import React from 'react';
import { Chapter } from '@data/types';

interface ChapterGridProps {
  chapters: Chapter[];
  onChapterClick: (chapterId: number) => void;
}

export const ChapterGrid: React.FC<ChapterGridProps> = ({ chapters, onChapterClick }) => {
  return (
    <div className="mt-20 grid sm:grid-cols-3 gap-6">
      {chapters.map((chapter) => (
        <div 
          key={chapter.id}
          onClick={() => onChapterClick(chapter.id)}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105"
        >
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-xl mb-4">
            {chapter.id}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {chapter.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {chapter.description}
          </p>
          <p className="text-amber-600 font-medium text-sm">
            {chapter.modules.length} módulos
          </p>
        </div>
      ))}
    </div>
  );
};