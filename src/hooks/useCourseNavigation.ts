import { useState, useCallback } from 'react';
import { Chapter, Module, ViewType } from '@data/types';

interface SelectedModule extends Module {
  chapterTitle: string;
}

export const useCourseNavigation = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<SelectedModule | null>(null);

  const toggleChapter = useCallback((chapterId: number) => {
    setExpandedChapter(prev => prev === chapterId ? null : chapterId);
    setSelectedModule(null);
  }, []);

  const selectModule = useCallback((chapter: Chapter, module: Module) => {
    setSelectedModule({
      ...module,
      chapterTitle: chapter.title
    });
  }, []);

  const navigateTo = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  return {
    currentView,
    expandedChapter,
    selectedModule,
    toggleChapter,
    selectModule,
    navigateTo
  };
};