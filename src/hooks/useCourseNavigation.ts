import { useState, useCallback, useEffect, useMemo } from 'react';
import { Chapter, Module, ViewType } from '@data/types';

interface SelectedModule extends Module {
  chapterTitle: string;
  chapterId: number;
}

interface FlatModule {
  module: Module;
  chapter: Chapter;
  index: number;
}

export const useCourseNavigation = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<SelectedModule | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [bookmarkedModules, setBookmarkedModules] = useState<Set<number>>(new Set());
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    try {
      // Cargar módulos completados
      const savedCompleted = localStorage.getItem('completedModules');
      if (savedCompleted) {
        const ids = JSON.parse(savedCompleted) as number[];
        setCompletedModules(new Set(ids));
      }

      // Cargar módulos marcados
      const savedBookmarked = localStorage.getItem('bookmarkedModules');
      if (savedBookmarked) {
        const ids = JSON.parse(savedBookmarked) as number[];
        setBookmarkedModules(new Set(ids));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Inicializar capítulos - Solo expandir el primero, NO seleccionar módulo
  const initializeChapters = useCallback((chapters: Chapter[]) => {
    setAllChapters(chapters);
    
    // Solo expandir el primer capítulo para mostrar la lista de módulos
    // pero NO seleccionar ningún módulo automáticamente
    if (chapters.length > 0) {
      setExpandedChapter(chapters[0].id);
    }
  }, []);

  // Crear lista plana de módulos con índices (MEMOIZADA)
  const flatModules = useMemo<FlatModule[]>(() => {
    const flatList: FlatModule[] = [];
    let globalIndex = 0;
    
    allChapters.forEach(chapter => {
      if (chapter.modules && Array.isArray(chapter.modules)) {
        chapter.modules.forEach(module => {
          flatList.push({ 
            module, 
            chapter,
            index: globalIndex++
          });
        });
      }
    });
    
    return flatList;
  }, [allChapters]);

  // Encontrar índice del módulo actual (MEMOIZADO)
  const currentModuleIndex = useMemo(() => {
    if (!selectedModule) return -1;
    
    return flatModules.findIndex(
      item => item.module.id === selectedModule.id && 
              item.chapter.id === selectedModule.chapterId
    );
  }, [selectedModule, flatModules]);

  // Número del módulo actual (1-based)
  const currentModuleNumber = useMemo(() => {
    return currentModuleIndex >= 0 ? currentModuleIndex + 1 : 0;
  }, [currentModuleIndex]);

  // Total de módulos
  const totalModules = flatModules.length;

  // Verificar si hay módulo anterior/siguiente (MEMOIZADO)
  const hasPrevious = useMemo(() => {
    return currentModuleIndex > 0;
  }, [currentModuleIndex]);

  const hasNext = useMemo(() => {
    return currentModuleIndex >= 0 && currentModuleIndex < flatModules.length - 1;
  }, [currentModuleIndex, flatModules.length]);

  // Toggle capítulo
  const toggleChapter = useCallback((chapterId: number) => {
    setExpandedChapter(prev => prev === chapterId ? null : chapterId);
  }, []);

  // Seleccionar módulo (CORREGIDO: Ahora acepta null para deseleccionar y eliminó scroll forzado)
  const selectModule = useCallback((chapter: Chapter | null, module: Module | null) => {
    if (chapter === null || module === null) {
      setSelectedModule(null);
      return;
    }
    
    const newSelectedModule: SelectedModule = {
      ...module,
      chapterTitle: chapter.title,
      chapterId: chapter.id
    };
    
    setSelectedModule(newSelectedModule);
    setExpandedChapter(chapter.id);
    
    // ❌ Scroll forzado eliminado. El scroll es manejado por GalacticCoursePage.tsx (block: 'nearest').
  }, []);

  // Navegar a otra vista
  const navigateTo = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  // Navegación entre módulos (CORREGIDO: Eliminó scroll forzado)
  const navigateModule = useCallback((direction: 'prev' | 'next') => {
    if (currentModuleIndex === -1 || flatModules.length === 0) return;

    const newIndex = direction === 'next' 
      ? currentModuleIndex + 1 
      : currentModuleIndex - 1;

    // Validar rango
    if (newIndex < 0 || newIndex >= flatModules.length) return;

    const { module, chapter } = flatModules[newIndex];

    // Actualizar estado
    setExpandedChapter(chapter.id);
    setSelectedModule({
      ...module,
      chapterTitle: chapter.title,
      chapterId: chapter.id
    });

    // ❌ Scroll forzado eliminado. El scroll es manejado por GalacticCoursePage.tsx (block: 'nearest').
  }, [currentModuleIndex, flatModules]);

  // Marcar módulo como completado (toggle)
  const markModuleComplete = useCallback((moduleId: number) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      
      // Guardar en localStorage
      try {
        localStorage.setItem('completedModules', JSON.stringify([...newSet]));
      } catch (error) {
        console.error('Error saving completed modules:', error);
      }
      
      return newSet;
    });
  }, []);

  // Marcar módulo como favorito (toggle)
  const toggleModuleBookmark = useCallback((moduleId: number) => {
    setBookmarkedModules(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      
      // Guardar en localStorage
      try {
        localStorage.setItem('bookmarkedModules', JSON.stringify([...newSet]));
      } catch (error) {
        console.error('Error saving bookmarked modules:', error);
      }
      
      return newSet;
    });
  }, []);

  // Verificar si un módulo está completado
  const isModuleCompleted = useCallback((moduleId: number) => {
    return completedModules.has(moduleId);
  }, [completedModules]);

  // Verificar si un módulo está marcado
  const isModuleBookmarked = useCallback((moduleId: number) => {
    return bookmarkedModules.has(moduleId);
  }, [bookmarkedModules]);

  // Calcular progreso del curso (MEMOIZADO)
  const courseProgress = useMemo(() => ({
    total: flatModules.length,
    completed: completedModules.size,
    percentage: flatModules.length > 0 
      ? Math.round((completedModules.size / flatModules.length) * 100) 
      : 0
  }), [flatModules.length, completedModules.size]);

  // Obtener módulo siguiente (para preview)
  const getNextModule = useCallback(() => {
    if (!hasNext || currentModuleIndex === -1) return null;
    return flatModules[currentModuleIndex + 1];
  }, [hasNext, currentModuleIndex, flatModules]);

  // Obtener módulo anterior (para preview)
  const getPreviousModule = useCallback(() => {
    if (!hasPrevious || currentModuleIndex === -1) return null;
    return flatModules[currentModuleIndex - 1];
  }, [hasPrevious, currentModuleIndex, flatModules]);

  // Obtener todos los módulos completados en un capítulo
  const getChapterProgress = useCallback((chapterId: number) => {
    const chapter = allChapters.find(ch => ch.id === chapterId);
    if (!chapter || !chapter.modules) return { completed: 0, total: 0, percentage: 0 };

    const total = chapter.modules.length;
    const completed = chapter.modules.filter(m => completedModules.has(m.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  }, [allChapters, completedModules]);

  // Resetear progreso (útil para testing o comenzar de nuevo)
  const resetProgress = useCallback(() => {
    setCompletedModules(new Set());
    setBookmarkedModules(new Set());
    try {
      localStorage.removeItem('completedModules');
      localStorage.removeItem('bookmarkedModules');
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  }, []);

  // Ir al siguiente módulo no completado
  const goToNextIncompleteModule = useCallback(() => {
    const nextIncomplete = flatModules.find(({ module }) => !completedModules.has(module.id));
    
    if (nextIncomplete) {
      selectModule(nextIncomplete.chapter, nextIncomplete.module);
    }
  }, [flatModules, completedModules, selectModule]);

  return {
    // Estados básicos
    currentView,
    expandedChapter,
    selectedModule,
    allChapters,
    
    // Navegación de vistas y capítulos
    toggleChapter,
    selectModule,
    navigateTo,
    initializeChapters,
    
    // Navegación entre módulos
    navigateModule,
    hasPrevious,
    hasNext,
    currentModuleIndex,
    currentModuleNumber,
    totalModules,
    flatModules,
    
    // Preview de módulos
    getNextModule,
    getPreviousModule,
    
    // Sistema de progreso
    markModuleComplete,
    toggleModuleBookmark,
    isModuleCompleted,
    isModuleBookmarked,
    courseProgress,
    completedModules,
    bookmarkedModules,
    getChapterProgress,
    resetProgress,
    goToNextIncompleteModule,
  };
};