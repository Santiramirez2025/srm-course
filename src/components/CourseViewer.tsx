import React, { useState, useEffect } from 'react';
import { ModuleContent } from './course/ModuleContent';
import { courseData } from '../data/courseData';
import type { Module } from '../data/types';

interface ModuleWithChapter extends Module {
  chapterTitle: string;
}

export const CourseViewer: React.FC = () => {
  // Estado principal
  const [currentModuleId, setCurrentModuleId] = useState(1);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [bookmarkedModules, setBookmarkedModules] = useState<Set<number>>(new Set());

  // Funciones helper
  const getAllModules = (): ModuleWithChapter[] => {
    return courseData.chapters.flatMap(chapter =>
      chapter.modules.map(module => ({
        ...module,
        chapterTitle: chapter.title
      }))
    );
  };

  const getCurrentModule = () => {
    const allModules = getAllModules();
    return allModules.find(m => m.id === currentModuleId);
  };

  const getCurrentIndex = () => {
    const allModules = getAllModules();
    return allModules.findIndex(m => m.id === currentModuleId);
  };

  const getTotalModules = () => {
    return getAllModules().length;
  };

  // Navegación
  const handleNavigate = (direction: 'prev' | 'next') => {
    const allModules = getAllModules();
    const currentIndex = getCurrentIndex();

    if (direction === 'next' && currentIndex < allModules.length - 1) {
      setCurrentModuleId(allModules[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setCurrentModuleId(allModules[currentIndex - 1].id);
    }
  };

  // Completado
  const handleComplete = (moduleId: number) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // Bookmark
  const handleBookmark = (moduleId: number) => {
    setBookmarkedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // Persistencia en localStorage
  useEffect(() => {
    const saved = localStorage.getItem('courseProgress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentModuleId(data.currentModuleId || 1);
        setCompletedModules(new Set(data.completedModules || []));
        setBookmarkedModules(new Set(data.bookmarkedModules || []));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify({
      currentModuleId,
      completedModules: Array.from(completedModules),
      bookmarkedModules: Array.from(bookmarkedModules)
    }));
  }, [currentModuleId, completedModules, bookmarkedModules]);

  // Render
  const currentModule = getCurrentModule();
  const currentIndex = getCurrentIndex();
  const totalModules = getTotalModules();

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Cargando módulo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ModuleContent
          module={currentModule}
          onComplete={handleComplete}
          onNavigate={handleNavigate}
          onBookmark={handleBookmark}
          isCompleted={completedModules.has(currentModule.id)}
          isBookmarked={bookmarkedModules.has(currentModule.id)}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < totalModules - 1}
          currentModuleNumber={currentIndex + 1}
          totalModules={totalModules}
        />
      </div>
    </div>
  );
};

export default CourseViewer;
