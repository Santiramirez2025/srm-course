// src/components/course/GalacticCoursePage.tsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

// Galactic Components
import { GalacticHub } from './galactic/GalacticHub';
import { PlanetaryMap } from './galactic/PlanetaryMap';
import { HolographicCabin } from './galactic/HolographicCabin';
import { OrbitalProgress } from './galactic/OrbitalProgress';

// UI Components
import { 
  HolographicPanel, 
  ViewModeToggle, 
  AchievementBadge,
  EnergyBar 
} from './galactic/ui';

// Background Components
import { 
  StarField, 
  AnimatedNebulas, 
  GalacticLoadingScreen 
} from './galactic/background';

// Existing Components
import { ChapterList } from '../components/course/ChapterList';
import { ModuleContent } from '../components/course/ModuleContent';

// Types
import { CourseData, Module, Chapter } from '@data/types';

// Styles
import { galacticStyles } from './galactic/styles/galacticStyles';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Throttle optimizado con trailing call
 */
function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime = 0;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    lastArgs = args;
    
    if (!timeoutId) {
      const timeSinceLastCall = now - lastCallTime;
      const remainingDelay = Math.max(0, delay - timeSinceLastCall);
      
      timeoutId = setTimeout(() => {
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastCallTime = Date.now();
          lastArgs = null;
        }
        timeoutId = null;
      }, remainingDelay);
    }
  } as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      lastArgs = null;
    }
  };

  return throttled;
}

// ============================================
// MEMOIZED COMPONENTS
// ============================================

const MemoizedGalacticHub = React.memo(GalacticHub, (prev, next) => {
  return (
    prev.courseData === next.courseData &&
    prev.courseProgress?.percentage === next.courseProgress?.percentage &&
    prev.currentModuleNumber === next.currentModuleNumber &&
    prev.totalModules === next.totalModules
  );
});

const MemoizedPlanetaryMap = React.memo(PlanetaryMap, (prev, next) => {
  return (
    prev.chapters === next.chapters &&
    prev.expandedChapter === next.expandedChapter &&
    prev.completedModules === next.completedModules
  );
});

const MemoizedChapterList = React.memo(ChapterList);
const MemoizedHolographicCabin = React.memo(HolographicCabin);
const MemoizedOrbitalProgress = React.memo(OrbitalProgress);
const MemoizedEnergyBar = React.memo(EnergyBar);
const MemoizedStarField = React.memo(StarField);
const MemoizedAnimatedNebulas = React.memo(AnimatedNebulas);

// ============================================
// PROPS INTERFACE
// ============================================
interface GalacticCoursePageProps {
  courseData: CourseData;
  expandedChapter: number | null;
  selectedModule: (Module & { chapterTitle: string; chapterId: number }) | null;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  onBackToMap: () => void;
  completedModules?: Set<number>;
  onNavigateModule?: (direction: 'prev' | 'next') => void;
  onModuleComplete?: (moduleId: number) => void;
  onModuleBookmark?: (moduleId: number) => void;
  bookmarkedModules?: Set<number>;
  hasPrevious?: boolean;
  hasNext?: boolean;
  currentModuleNumber?: number;
  totalModules?: number;
  courseProgress?: {
    total: number;
    completed: number;
    percentage: number;
  };
  isLoading?: boolean;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// ============================================
// MAIN COMPONENT
// ============================================
export const GalacticCoursePage: React.FC<GalacticCoursePageProps> = ({
  courseData,
  expandedChapter,
  selectedModule,
  onToggleChapter,
  onSelectModule,
  onBackToMap,
  completedModules = new Set(),
  onNavigateModule,
  onModuleComplete,
  onModuleBookmark,
  bookmarkedModules = new Set(),
  hasPrevious = false,
  hasNext = false,
  currentModuleNumber = 1,
  totalModules = 0,
  courseProgress,
  isLoading = false,
  onError
}) => {
  // ============================================
  // STATE
  // ============================================
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [showAchievement, setShowAchievement] = useState(false);
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // ============================================
  // REFS
  // ============================================
  const moduleMainRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prevCompletedRef = useRef(completedModules);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastSelectedModuleId = useRef<number | null>(null);

  // ============================================
  // MEMOIZED VALUES
  // ============================================
  const energyProgress = useMemo(
    () => completedModules.size * 100,
    [completedModules.size]
  );

  const energyMax = useMemo(
    () => totalModules * 100,
    [totalModules]
  );

  const starsProgress = useMemo(
    () => completedModules.size,
    [completedModules.size]
  );

  // ============================================
  // CALLBACKS
  // ============================================
  const handleBackToMap = useCallback(() => {
    setIsTransitioning(true);
    lastSelectedModuleId.current = null;
    onBackToMap();
    
    setTimeout(() => setIsTransitioning(false), 600);
  }, [onBackToMap]);

  const handleModuleComplete = useCallback((moduleId: number) => {
    try {
      onModuleComplete?.(moduleId);
    } catch (error) {
      console.error('Error completing module:', error);
    }
  }, [onModuleComplete]);

  const handleModuleBookmark = useCallback((moduleId: number) => {
    try {
      onModuleBookmark?.(moduleId);
    } catch (error) {
      console.error('Error bookmarking module:', error);
    }
  }, [onModuleBookmark]);

  const handleNavigateModule = useCallback((direction: 'prev' | 'next') => {
    try {
      onNavigateModule?.(direction);
    } catch (error) {
      console.error('Error navigating module:', error);
    }
  }, [onNavigateModule]);

  // Throttled mouse handler - 60fps
  const handleMouseMove = useMemo(
    () => throttle((e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }, 16),
    [mouseX, mouseY]
  );

  // ============================================
  // EFFECTS
  // ============================================
  
  // Mount effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse tracking
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      handleMouseMove.cancel();
    };
  }, [handleMouseMove]);

  // Achievement trigger
  useEffect(() => {
    if (
      selectedModule && 
      mounted &&
      !prevCompletedRef.current.has(selectedModule.id) &&
      completedModules.has(selectedModule.id)
    ) {
      setRecentAchievement(`Módulo "${selectedModule.title}" completado`);
      setShowAchievement(true);
      
      const timer = setTimeout(() => {
        setShowAchievement(false);
      }, 4000);
      
      prevCompletedRef.current = new Set(completedModules);
      
      return () => clearTimeout(timer);
    }
  }, [completedModules, selectedModule, mounted]);

  // Scroll optimizado - SOLO cuando se selecciona un módulo nuevo
  useEffect(() => {
    // Guards estrictos para prevenir scroll accidental
    if (!selectedModule) return;
    if (!moduleMainRef.current) return;
    if (!mounted) return;
    if (isTransitioning) return;
    
    // Solo hacer scroll si es un módulo diferente
    if (lastSelectedModuleId.current === selectedModule.id) return;
    
    // Actualizar referencia
    lastSelectedModuleId.current = selectedModule.id;
    
    // Doble RAF para asegurar estabilidad del layout
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        if (moduleMainRef.current && selectedModule) {
          moduleMainRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      });
      
      scrollTimeoutRef.current = frame2;
    });
    
    return () => {
      cancelAnimationFrame(frame1);
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [selectedModule?.id, mounted, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (selectedModule) {
        switch (e.key) {
          case 'ArrowLeft':
            if (hasPrevious) {
              e.preventDefault();
              handleNavigateModule('prev');
            }
            break;
          case 'ArrowRight':
            if (hasNext) {
              e.preventDefault();
              handleNavigateModule('next');
            }
            break;
          case 'Escape':
            e.preventDefault();
            handleBackToMap();
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedModule, hasPrevious, hasNext, handleNavigateModule, handleBackToMap]);

  // Analytics tracking
  useEffect(() => {
    if (selectedModule && mounted) {
      console.log('Module viewed:', {
        moduleId: selectedModule.id,
        moduleName: selectedModule.title,
        chapterId: selectedModule.chapterId
      });
    }
  }, [selectedModule, mounted]);

  // ============================================
  // LOADING STATE
  // ============================================
  if (isLoading) {
    return <GalacticLoadingScreen />;
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-[#0a0118] relative overflow-hidden">
      
      {/* Background Effects */}
      <MemoizedStarField />
      <MemoizedAnimatedNebulas mouseX={mouseX} mouseY={mouseY} />
      
      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && recentAchievement && (
          <AchievementBadge message={recentAchievement} />
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16"
        >
          <MemoizedGalacticHub 
            courseData={courseData}
            courseProgress={courseProgress}
            currentModuleNumber={currentModuleNumber}
            totalModules={totalModules}
          />
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          
          {/* Navigation View */}
          {!selectedModule && (
            <div className="lg:col-span-12">
              {viewMode === 'map' ? (
                <MemoizedPlanetaryMap
                  chapters={courseData.chapters}
                  expandedChapter={expandedChapter}
                  onToggleChapter={onToggleChapter}
                  onSelectModule={onSelectModule}
                  completedModules={completedModules}
                />
              ) : (
                <div className="max-w-5xl mx-auto">
                  <HolographicPanel>
                    <MemoizedChapterList
                      chapters={courseData.chapters}
                      expandedChapter={expandedChapter}
                      selectedModule={selectedModule}
                      onToggleChapter={onToggleChapter}
                      onSelectModule={onSelectModule}
                      completedModules={completedModules}
                      isLoading={false}
                    />
                  </HolographicPanel>
                </div>
              )}
            </div>
          )}

          {/* Module Content View */}
          {selectedModule && (
            <>
              {/* Sidebar */}
              <motion.aside 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-3 space-y-6"
              >
                <HolographicPanel>
                  <div className="p-6 space-y-6">
                    {/* Back Button */}
                    <button
                      onClick={handleBackToMap}
                      aria-label="Volver al mapa del curso"
                      className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0118] rounded-lg p-2 -m-2"
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      <span className="font-bold">Volver al mapa</span>
                    </button>

                    {/* Progress Ring */}
                    {courseProgress && (
                      <MemoizedOrbitalProgress 
                        percentage={courseProgress.percentage}
                        completed={courseProgress.completed}
                        total={courseProgress.total}
                        size="small"
                      />
                    )}

                    <div className="text-center">
                      <p className="text-sm text-gray-400">
                        Módulo {currentModuleNumber} de {totalModules}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        ← → para navegar | ESC para volver
                      </p>
                    </div>
                  </div>
                </HolographicPanel>

                {/* Energy Stats */}
                <HolographicPanel>
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span role="img" aria-label="energía">⚡</span>
                      Energía Acumulada
                    </h3>
                    <div className="space-y-3">
                      <MemoizedEnergyBar 
                        label="XP Obtenido"
                        value={energyProgress}
                        max={energyMax}
                        color="purple"
                      />
                      <MemoizedEnergyBar 
                        label="Estrellas"
                        value={starsProgress}
                        max={totalModules}
                        color="yellow"
                      />
                    </div>
                  </div>
                </HolographicPanel>
              </motion.aside>

              {/* Main Module Content */}
              <motion.main 
                ref={moduleMainRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-9"
                role="main"
                aria-label="Contenido del módulo"
              >
                <MemoizedHolographicCabin
                  module={selectedModule}
                  onComplete={handleModuleComplete}
                  onNavigate={handleNavigateModule}
                  onBookmark={handleModuleBookmark}
                  isCompleted={completedModules.has(selectedModule.id)}
                  isBookmarked={bookmarkedModules?.has(selectedModule.id)}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  currentModuleNumber={currentModuleNumber}
                  totalModules={totalModules}
                />
              </motion.main>
            </>
          )}
        </motion.div>
      </div>

      {/* Global Styles */}
      <style>{galacticStyles}</style>
    </div>
  );
};

export default GalacticCoursePage;