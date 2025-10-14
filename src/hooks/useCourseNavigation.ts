import { useState, useCallback, useEffect } from 'react';
import { Chapter, Module, ViewType } from '@data/types';

interface SelectedModule extends Module {
  chapterTitle: string;
  chapterId: number;
}

export const useCourseNavigation = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<SelectedModule | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);

  // Cargar módulos completados desde localStorage
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
  }, []);

  // Crear lista plana de módulos
  const getFlatModules = useCallback(() => {
    const flatList: Array<{ module: Module; chapter: Chapter }> = [];
    
    allChapters.forEach(chapter => {
      if (chapter.modules && Array.isArray(chapter.modules)) {
        chapter.modules.forEach(module => {
          flatList.push({ module, chapter });
        });
      }
    });
    
    return flatList;
  }, [allChapters]);

  // Encontrar índice del módulo actual
  const getCurrentModuleIndex = useCallback(() => {
    if (!selectedModule) return -1;
    
    const flatList = getFlatModules();
    return flatList.findIndex(
      item => item.module.id === selectedModule.id
    );
  }, [selectedModule, getFlatModules]);

  const toggleChapter = useCallback((chapterId: number) => {
    setExpandedChapter(prev => prev === chapterId ? null : chapterId);
    setSelectedModule(null);
  }, []);

  const selectModule = useCallback((chapter: Chapter, module: Module) => {
    setSelectedModule({
      ...module,
      chapterTitle: chapter.title,
      chapterId: chapter.id
    });
  }, []);

  const navigateTo = useCallback((view: ViewType) => {
    setCurrentView(view);
  }, []);

  // FUNCIÓN CLAVE: Navegar entre módulos
  const navigateModule = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = getCurrentModuleIndex();
    const flatList = getFlatModules();
    
    console.log('🔍 Debug navegación:', {
      direction,
      currentIndex,
      totalModules: flatList.length,
      selectedModule: selectedModule?.title
    });

    if (currentIndex === -1 || flatList.length === 0) {
      console.log('❌ No hay módulo seleccionado o lista vacía');
      return;
    }

    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    console.log('📍 Nuevo índice:', newIndex);

    if (newIndex >= 0 && newIndex < flatList.length) {
      const { module, chapter } = flatList[newIndex];
      
      console.log('✅ Navegando a:', {
        moduleTitle: module.title,
        chapterTitle: chapter.title
      });
      
      // Expandir el capítulo correspondiente
      setExpandedChapter(chapter.id);
      
      // Seleccionar el nuevo módulo
      setSelectedModule({
        ...module,
        chapterTitle: chapter.title,
        chapterId: chapter.id
      });

      // Scroll al inicio
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      console.log('❌ Índice fuera de rango');
    }
  }, [getCurrentModuleIndex, getFlatModules, selectedModule]);

  // Marcar módulo como completado
  const markModuleComplete = useCallback((moduleId: number) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId); // Toggle
      } else {
        newSet.add(moduleId);
      }
      
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

  // Calcular si hay siguiente/anterior
  const currentIndex = getCurrentModuleIndex();
  const flatList = getFlatModules();
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < flatList.length - 1;

  // Calcular progreso
  const courseProgress = {
    total: flatList.length,
    completed: completedModules.size,
    percentage: flatList.length > 0 
      ? Math.round((completedModules.size / flatList.length) * 100) 
      : 0
  };

  return {
    // Estados básicos
    currentView,
    expandedChapter,
    selectedModule,
    
    // Navegación de vistas y capítulos
    toggleChapter,
    selectModule,
    navigateTo,
    initializeChapters,
    
    // Navegación entre módulos
    navigateModule,
    hasPrevious,
    hasNext,
    currentModuleIndex: currentIndex,
    totalModules: flatList.length,
    
    // Sistema de progreso
    markModuleComplete,
    isModuleCompleted,
    courseProgress,
    completedModules
  };
};