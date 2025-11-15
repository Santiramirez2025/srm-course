// src/components/course/GalacticCoursePage.tsx
import React, { 
  useState, 
  useEffect, 
  useRef, 
  useMemo, 
  useCallback,
  lazy,
  Suspense 
} from 'react';
import { motion, AnimatePresence, useMotionValue, useReducedMotion } from 'framer-motion';
import { ChevronLeft, Loader2 } from 'lucide-react';

// ============================================
// LAZY LOADED COMPONENTS
// ============================================
const PlanetaryMap = lazy(() => 
  import('./galactic/PlanetaryMap').then(m => ({ default: m.PlanetaryMap }))
);
const HolographicCabin = lazy(() => 
  import('./galactic/HolographicCabin').then(m => ({ default: m.HolographicCabin }))
);
const AnimatedNebulas = lazy(() => 
  import('./galactic/background').then(m => ({ default: m.AnimatedNebulas }))
);

// ============================================
// EAGER LOADED COMPONENTS
// ============================================
import { GalacticHub } from './galactic/GalacticHub';
import { OrbitalProgress } from './galactic/OrbitalProgress';
import { 
  HolographicPanel, 
  ViewModeToggle, 
  AchievementBadge,
  EnergyBar 
} from './galactic/ui';
import { StarField, GalacticLoadingScreen } from './galactic/background';
import { ChapterList } from '../components/course/ChapterList';

// ============================================
// TYPES
// ============================================
import { CourseData, Module, Chapter } from '@data/types';

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
// UTILITY: Throttle optimizado
// ============================================
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
// UTILITY: Detectar dispositivo móvil
// ============================================
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

// ============================================
// LOADING FALLBACK COMPONENT
// ============================================
const ComponentLoader: React.FC = () => (
  <div className="flex items-center justify-center py-16 sm:py-24" role="status">
    <div className="text-center space-y-4">
      <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 animate-spin mx-auto" />
      <p className="text-sm sm:text-base text-gray-400" aria-live="polite">
        Cargando componente...
      </p>
    </div>
  </div>
);

// ============================================
// MEMOIZED COMPONENTS
// ============================================
const MemoizedGalacticHub = React.memo(GalacticHub, (prev, next) => 
  prev.courseData === next.courseData &&
  prev.courseProgress?.percentage === next.courseProgress?.percentage &&
  prev.currentModuleNumber === next.currentModuleNumber &&
  prev.totalModules === next.totalModules
);

const MemoizedChapterList = React.memo(ChapterList);
const MemoizedOrbitalProgress = React.memo(OrbitalProgress);
const MemoizedEnergyBar = React.memo(EnergyBar);
const MemoizedStarField = React.memo(StarField);

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
  // HOOKS: Detección de rendimiento
  // ============================================
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
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

  // Animaciones adaptativas según el dispositivo
  const animationConfig = useMemo(() => {
    if (shouldReduceMotion) {
      return {
        duration: 0.01,
        ease: 'linear' as const
      };
    }
    if (isMobile) {
      return {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const
      };
    }
    return {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1] as const
    };
  }, [shouldReduceMotion, isMobile]);

  // ============================================
  // CALLBACKS
  // ============================================
  const handleBackToMap = useCallback(() => {
    setIsTransitioning(true);
    lastSelectedModuleId.current = null;
    onBackToMap();
    
    setTimeout(() => setIsTransitioning(false), isMobile ? 400 : 600);
  }, [onBackToMap, isMobile]);

  const handleModuleComplete = useCallback((moduleId: number) => {
    try {
      onModuleComplete?.(moduleId);
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error, { componentStack: '' } as React.ErrorInfo);
      }
    }
  }, [onModuleComplete, onError]);

  const handleModuleBookmark = useCallback((moduleId: number) => {
    try {
      onModuleBookmark?.(moduleId);
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error, { componentStack: '' } as React.ErrorInfo);
      }
    }
  }, [onModuleBookmark, onError]);

  const handleNavigateModule = useCallback((direction: 'prev' | 'next') => {
    try {
      onNavigateModule?.(direction);
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error, { componentStack: '' } as React.ErrorInfo);
      }
    }
  }, [onNavigateModule, onError]);

  // Throttled mouse handler - 60fps desktop, deshabilitado en móvil
  const handleMouseMove = useMemo(() => {
    if (isMobile) {
      const noop = (() => {}) as (() => void) & { cancel: () => void };
      noop.cancel = () => {};
      return noop;
    }
    return throttle((e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }, 16);
  }, [mouseX, mouseY, isMobile]);

  // ============================================
  // EFFECTS
  // ============================================
  
  // Detección inicial de dispositivo y mount
  useEffect(() => {
    setIsMobile(isMobileDevice());
    setMounted(true);

    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse tracking (solo desktop)
  useEffect(() => {
    if (isMobile || shouldReduceMotion) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (typeof handleMouseMove === 'function' && 'cancel' in handleMouseMove) {
        handleMouseMove.cancel();
      }
    };
  }, [handleMouseMove, isMobile, shouldReduceMotion]);

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
      
      const timer = setTimeout(() => setShowAchievement(false), 4000);
      prevCompletedRef.current = new Set(completedModules);
      
      return () => clearTimeout(timer);
    }
  }, [completedModules, selectedModule, mounted]);

  // Scroll optimizado - SOLO cuando cambia el módulo
  useEffect(() => {
    if (!selectedModule || !moduleMainRef.current || !mounted || isTransitioning) {
      return;
    }
    
    if (lastSelectedModuleId.current === selectedModule.id) return;
    
    lastSelectedModuleId.current = selectedModule.id;
    
    // En móvil, scroll inmediato sin animación
    if (isMobile) {
      moduleMainRef.current.scrollIntoView({ 
        behavior: 'auto', 
        block: 'start'
      });
      return;
    }
    
    // Desktop: doble RAF para estabilidad
    const frame1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        moduleMainRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      });
    });
    
    return () => cancelAnimationFrame(frame1);
  }, [selectedModule?.id, mounted, isTransitioning, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedModule) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

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
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedModule, hasPrevious, hasNext, handleNavigateModule, handleBackToMap]);

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
      
      {/* Background Effects - Optimizado según dispositivo */}
      <MemoizedStarField />
      {!isMobile && !shouldReduceMotion && (
        <Suspense fallback={null}>
          <AnimatedNebulas mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      )}
      
      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && recentAchievement && (
          <AchievementBadge message={recentAchievement} />
        )}
      </AnimatePresence>

      {/* Main Container - Responsive padding */}
      <div 
        className="max-w-[2000px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 relative z-10"
        role="main"
      >
        
        {/* Header - SEO optimizado */}
        <header>
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={animationConfig}
            className="mb-8 sm:mb-16"
          >
            <MemoizedGalacticHub 
              courseData={courseData}
              courseProgress={courseProgress}
              currentModuleNumber={currentModuleNumber}
              totalModules={totalModules}
            />
          </motion.div>
        </header>

        {/* View Mode Toggle - Touch-friendly */}
        <nav aria-label="Vista del curso">
          <motion.div 
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
            className="flex justify-center mb-6 sm:mb-12"
          >
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </motion.div>
        </nav>

        {/* Main Content Grid - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: animationConfig.duration }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8"
        >
          
          {/* Navigation View */}
          {!selectedModule && (
            <section 
              className="lg:col-span-12"
              aria-label="Navegación del curso"
            >
              {viewMode === 'map' ? (
                <Suspense fallback={<ComponentLoader />}>
                  <PlanetaryMap
                    chapters={courseData.chapters}
                    expandedChapter={expandedChapter}
                    onToggleChapter={onToggleChapter}
                    onSelectModule={onSelectModule}
                    completedModules={completedModules}
                  />
                </Suspense>
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
            </section>
          )}

          {/* Module Content View */}
          {selectedModule && (
            <>
              {/* Sidebar - Responsive */}
              <aside 
                className="lg:col-span-3 space-y-4 sm:space-y-6"
                aria-label="Barra lateral de navegación"
              >
                <HolographicPanel>
                  <nav className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Back Button - Touch optimizado */}
                    <button
                      onClick={handleBackToMap}
                      aria-label="Volver al mapa del curso"
                      className="flex items-center gap-2 sm:gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0118] rounded-lg p-2 sm:p-3 -m-2 min-h-[44px] w-full sm:w-auto touch-manipulation"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" />
                      <span className="font-bold text-sm sm:text-base">Volver al mapa</span>
                    </button>

                    {/* Progress Ring */}
                    {courseProgress && (
                      <div className="py-2">
                        <MemoizedOrbitalProgress 
                          percentage={courseProgress.percentage}
                          completed={courseProgress.completed}
                          total={courseProgress.total}
                          size="small"
                        />
                      </div>
                    )}

                    <div className="text-center space-y-2">
                      <p className="text-sm sm:text-base text-gray-400">
                        Módulo {currentModuleNumber} de {totalModules}
                      </p>
                      {!isMobile && (
                        <p className="text-xs text-gray-500 hidden sm:block">
                          ← → para navegar | ESC para volver
                        </p>
                      )}
                    </div>
                  </nav>
                </HolographicPanel>

                {/* Energy Stats */}
                <HolographicPanel>
                  <section 
                    className="p-4 sm:p-6 space-y-3 sm:space-y-4"
                    aria-label="Estadísticas de progreso"
                  >
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span role="img" aria-label="energía">⚡</span>
                      Energía Acumulada
                    </h2>
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
                  </section>
                </HolographicPanel>
              </aside>

              {/* Main Module Content */}
              <motion.article 
                ref={moduleMainRef}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={animationConfig}
                className="lg:col-span-9"
                aria-label={`Contenido del módulo: ${selectedModule.title}`}
              >
                <Suspense fallback={<ComponentLoader />}>
                  <HolographicCabin
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
                </Suspense>
              </motion.article>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GalacticCoursePage;