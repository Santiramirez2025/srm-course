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
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);

  // Cargar módulos completados desde localStorage al iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('completedModules');
      if (saved) {
        const ids = JSON.parse(saved) as number[];
        setCompletedModules(new Set(ids));
      }
    } catch (error) {
      console.error('Error loading completed modules:', error);
    }
  }, []);

  // Inicializar capítulos
  const initializeChapters = useCallback((chapters: Chapter[]) => {
    setAllChapters(chapters);
    
    // Auto-expandir primer capítulo y seleccionar primer módulo
    if (chapters.length > 0 && chapters[0].modules && chapters[0].modules.length > 0) {
      setExpandedChapter(chapters[0].id);
      // Opcional: auto-seleccionar primer módulo
      // selectModule(chapters[0], chapters[0].modules[0]);
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

  // Seleccionar módulo
  const selectModule = useCallback((chapter: Chapter, module: Module) => {
    const newSelectedModule: SelectedModule = {
      ...module,
      chapterTitle: chapter.title,
      chapterId: chapter.id
    };
    
    setSelectedModule(newSelectedModule);
    setExpandedChapter(chapter.id);
    
    // Scroll suave al inicio
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  // Navegar a otra vista
  const navigateTo = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  // ✨ NAVEGACIÓN ENTRE MÓDULOS - OPTIMIZADA
  const navigateModule = useCallback((direction: 'prev' | 'next') => {
    if (currentModuleIndex === -1 || flatModules.length === 0) {
      console.warn('⚠️ No hay módulo seleccionado o lista vacía');
      return;
    }

    const newIndex = direction === 'next' 
      ? currentModuleIndex + 1 
      : currentModuleIndex - 1;

    // Validar rango
    if (newIndex < 0 || newIndex >= flatModules.length) {
      console.warn('⚠️ No hay más módulos en esa dirección');
      return;
    }

    const { module, chapter } = flatModules[newIndex];
    
    // Debug info (comentar en producción)
    console.log('✅ Navegando:', {
      direction,
      from: selectedModule?.title,
      to: module.title,
      chapter: chapter.title,
      newIndex: newIndex + 1,
      total: flatModules.length
    });

    // Actualizar estado
    setExpandedChapter(chapter.id);
    setSelectedModule({
      ...module,
      chapterTitle: chapter.title,
      chapterId: chapter.id
    });

    // Scroll suave al inicio
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [currentModuleIndex, flatModules, selectedModule]);

  // Marcar módulo como completado
  const markModuleComplete = useCallback((moduleId: number) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId); // Toggle off
      } else {
        newSet.add(moduleId); // Toggle on
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

  // Verificar si un módulo está completado
  const isModuleCompleted = useCallback((moduleId: number) => {
    return completedModules.has(moduleId);
  }, [completedModules]);

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

  // Resetear progreso (útil para testing)
  const resetProgress = useCallback(() => {
    setCompletedModules(new Set());
    try {
      localStorage.removeItem('completedModules');
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  }, []);

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
    isModuleCompleted,
    courseProgress,
    completedModules,
    resetProgress,
  };
};