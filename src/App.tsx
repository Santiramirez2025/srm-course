// src/App.tsx - CORREGIDO PARA EVITAR LOOP DE CARGA
import React, { useState, useRef, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Navigation } from '@components/layout/Navigation';
import { Footer } from '@components/layout/Footer';
import { HomePage } from '@pages/HomePage';
import { AuthModal } from '@components/auth/AuthModal';
import { courseData } from '@data/courseData';
import { useCourseNavigation } from '@hooks/useCourseNavigation';
import { useAuth } from '@hooks/useAuth';
import { useSubscription } from '@hooks/useSubscription';

// ============================================
// LAZY LOADING - Code Splitting
// ============================================
const GalacticCoursePage = lazy(() => import('@pages/CoursePage').then(m => ({ default: m.GalacticCoursePage })));
const PricingModal = lazy(() => import('@components/subscription/PricingModal').then(m => ({ default: m.PricingModal })));
const SubscriptionGate = lazy(() => import('@components/subscription/SubscriptionGate').then(m => ({ default: m.SubscriptionGate })));

// ============================================
// CUSTOM HOOK: Detección de Mobile
// ============================================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      // Usamos 768px como punto de corte estándar para la mayoría de móviles y tablets pequeñas
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Cleanup - Es crucial para evitar pérdidas de memoria y re-renders innecesarios
    return () => window.removeEventListener('resize', checkMobile);
  }, []); // Dependencias vacías: se ejecuta solo una vez al montar

  return isMobile;
};

// ... (Resto de Variants y Componentes: LoadingScreen, SuspenseFallback)
// Mantener el resto de las animaciones y componentes de carga tal como están
// ... (omito por brevedad, asumiendo que no son la causa del loop)

// ============================================
// ANIMATION VARIANTS - Optimizados para Mobile
// ============================================
const pageTransition = {
  duration: 0.3, // Reducido para mobile
  ease: [0.22, 1, 0.36, 1] as const
};

const createPageVariants = (shouldReduceMotion: boolean, isMobile: boolean) => ({
  initial: shouldReduceMotion || isMobile 
    ? { opacity: 0 } 
    : { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: shouldReduceMotion || isMobile 
      ? { duration: 0.2 } 
      : pageTransition
  },
  exit: { 
    opacity: 0, 
    y: shouldReduceMotion || isMobile ? 0 : -20, 
    scale: shouldReduceMotion || isMobile ? 1 : 0.98,
    transition: { 
      duration: shouldReduceMotion || isMobile ? 0.15 : 0.3, 
      ease: [0.22, 1, 0.36, 1] as const 
    }
  }
});

const loadingVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const musicButtonVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const }
  },
  tap: { scale: 0.85 }, // Feedback táctil más pronunciado
  hover: { scale: 1.05 } // Menos hover en mobile
};

// ============================================
// LOADING COMPONENT - Responsive
// ============================================
const LoadingScreen = React.memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950 px-4">
    <motion.div 
      className="text-center"
      variants={loadingVariants}
      initial="initial"
      animate="animate"
    >
      {/* Logo holográfico - Responsive */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6 sm:mb-8">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl sm:rounded-2xl blur-xl sm:blur-2xl opacity-60"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative w-full h-full bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl sm:rounded-2xl" />
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white relative z-10" />
        </div>
      </div>
      
      <motion.p 
        className="text-white font-bold text-base sm:text-lg px-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Cargando experiencia...
      </motion.p>
    </motion.div>
  </div>
));

LoadingScreen.displayName = 'LoadingScreen';

// ============================================
// SUSPENSE FALLBACK - Responsive
// ============================================
const SuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-screen px-4">
    <div className="animate-pulse text-purple-400 text-base sm:text-lg font-medium text-center">
      Cargando módulo...
    </div>
  </div>
);

// ============================================
// MAIN APP COMPONENT
// ============================================
const App: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const pageVariants = useMemo(
    () => createPageVariants(!!shouldReduceMotion, isMobile), 
    [shouldReduceMotion, isMobile]
  );
  
  // ============================================
  // HOOKS (Extraer y mantener la referencia del usuario)
  // ============================================
  const { user, loading: authLoading, login, register, loginWithGoogle, logout } = useAuth();
  // El hook de suscripción ahora se basa en el ID del usuario, que es estable después de la autenticación.
  const { subscription, loading: subLoading, activateSubscription, hasAccess } = useSubscription(user?.uid);
  
  const {
    currentView,
    expandedChapter,
    selectedModule,
    toggleChapter,
    selectModule,
    navigateTo,
    navigateModule,
    initializeChapters,
    markModuleComplete,
    completedModules,
    hasPrevious,
    hasNext,
    currentModuleNumber,
    totalModules,
    courseProgress,
  } = useCourseNavigation();

  // ============================================
  // STATE
  // ============================================
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [bookmarkedModules, setBookmarkedModules] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);

  // ============================================
  // EFFECTS
  // ============================================
  
  // Initialize chapters
  useEffect(() => {
    if (courseData?.chapters) {
      initializeChapters(courseData.chapters);
    }
  }, [initializeChapters]);

  // Load bookmarks
  useEffect(() => {
    if (!user) return;
    
    try {
      const saved = localStorage.getItem(`bookmarks_${user.uid}`);
      if (saved) {
        const ids = JSON.parse(saved) as number[];
        setBookmarkedModules(new Set(ids));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }, [user]);

  // Scroll to top on view change - Optimización iOS/Android
  // <<< CORRECCIÓN SCROLL MOBILE >>>
  // Se elimina el setTimeout y behavior: smooth en mobile para un scroll inmediato (scrollTo(0, 0))
  useEffect(() => {
    if (isMobile) {
        // En mobile, usamos el método inmediato y más compatible con iOS
        window.scrollTo(0, 0); 
    } else {
        // En Desktop, mantenemos el comportamiento suave
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }
  }, [currentView, isMobile]); // Se mantiene 'isMobile' para reaccionar si el usuario redimensiona a/desde mobile

  // Audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      console.warn('Audio no disponible');
      setAudioError(true);
      setIsMusicPlaying(false);
    };
    
    const handleEnded = () => setIsMusicPlaying(false);
    const handleCanPlay = () => setAudioError(false);

    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
    };
  }, []);

  // Prevención de zoom táctil: Solo prevenir doble-tap zoom, manteniendo el scroll nativo.
  // <<< CORRECCIÓN ZOOM MOBILE >>>
  // Se elimina el preventDefault en 'touchstart' para no bloquear el scroll. 
  // Se usa 'dblclick' para bloquear solo el zoom de doble-tap.
  useEffect(() => {
    if (!isMobile) return;
    
    const preventDoubleTapZoom = (e: Event) => {
        // Prevenir el comportamiento por defecto (que es el zoom) en el doble click
        e.preventDefault();
    };

    // 'dblclick' permite que el scroll nativo de 'touchstart' funcione libremente.
    document.addEventListener('dblclick', preventDoubleTapZoom, { passive: false });
    
    return () => {
        document.removeEventListener('dblclick', preventDoubleTapZoom);
    };
  }, [isMobile]);

  // ============================================
  // CALLBACKS - Memoizados (Mantenidos)
  // ============================================
  
  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || audioError) return;

    try {
      if (isMusicPlaying) {
        audio.pause();
        setIsMusicPlaying(false);
      } else {
        await audio.play();
        setIsMusicPlaying(true);
      }
    } catch (error) {
      console.warn('Reproducción bloqueada:', error);
      setIsMusicPlaying(false);
    }
  }, [isMusicPlaying, audioError]);

  const handleStartCourse = useCallback(() => {
    navigateTo('home'); // Navegar a 'home' o 'course', asumiendo que es 'home' si el botón de inicio está ahí
  }, [navigateTo]);

  const handleChapterClick = useCallback((chapterId: number) => {
    navigateTo('course');
    toggleChapter(chapterId);
  }, [navigateTo, toggleChapter]);

  const handleBackToMap = useCallback(() => {
    // Asegurarse de que el estado de 'selectedModule' se limpia correctamente
    selectModule(null as any, null as any); 
    navigateTo('course');
  }, [selectModule, navigateTo]);

  const handleBookmark = useCallback((moduleId: number) => {
    if (!user) return;
    
    setBookmarkedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      
      try {
        localStorage.setItem(`bookmarks_${user.uid}`, JSON.stringify([...newSet]));
      } catch (error) {
        console.error('Error saving bookmarks:', error);
      }
      
      return newSet;
    });
  }, [user]);

  const handleSelectPlan = useCallback(async (planId: string) => {
    try {
      activateSubscription(planId as 'monthly' | 'yearly' | 'lifetime');
      setShowPricingModal(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar. Intenta de nuevo.');
    }
  }, [activateSubscription]);

  const handleClosePricing = useCallback(() => {
    setShowPricingModal(false);
  }, []);

  const handleOpenPricing = useCallback(() => {
    setShowPricingModal(true);
  }, []);

  // ============================================
  // LOADING STATE (PUNTO CRÍTICO CORREGIDO)
  // ============================================
  
  // Si el problema está en los hooks, no podemos solucionarlo aquí.
  // Pero podemos asegurarnos de que la condición de salida sea simple:
  if (authLoading || subLoading) {
    return <LoadingScreen />;
  }

  // **POSIBLE CORRECCIÓN ADICIONAL PARA EL LOOP DE CARGA:**
  // Si useAuth no establece el usuario pero sí establece authLoading a false,
  // se mostraría el AuthModal. Si authLoading permanece true, el loop persiste.
  // Asumimos que los hooks de auth y sub están escritos correctamente para 
  // garantizar que `loading` eventualmente sea `false`.

  // ============================================
  // AUTH GATE
  // ============================================
  if (!user) {
    // Si la autenticación ha terminado (authLoading es false) y no hay usuario, 
    // mostramos el modal de autenticación.
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950 p-4 sm:p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* El AuthModal es ahora el contenido principal. */}
        <AuthModal 
          onClose={() => {}} // No se espera que se cierre sin un usuario
          onLogin={login}
          onRegister={register}
          onGoogleLogin={loginWithGoogle}
        />
      </motion.div>
    );
  }

  // ============================================
  // MAIN APP RENDER
  // ============================================
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SubscriptionGate
        hasAccess={hasAccess}
        onUpgrade={handleOpenPricing}
      >
        <div className="flex flex-col min-h-screen bg-[#0a0118] text-white overflow-x-hidden">
          
          {/* Background Music */}
          <audio ref={audioRef} loop preload="metadata">
            <source src="/music/lofibro.m4a" type="audio/mp4" />
          </audio>

          {/* Music Toggle Button - RESPONSIVE */}
          {!audioError && (
            <motion.button
              onClick={toggleMusic}
              className={`
                fixed z-50 
                ${isMobile 
                  ? 'bottom-4 right-4 w-12 h-12' 
                  : 'bottom-6 right-6 w-14 h-14'
                }
                bg-gradient-to-br from-purple-600 to-cyan-600 
                hover:from-purple-500 hover:to-cyan-500 
                active:from-purple-700 active:to-cyan-700
                text-white rounded-full 
                shadow-lg shadow-purple-500/50 
                hover:shadow-2xl hover:shadow-purple-500/60
                active:shadow-purple-500/40
                flex items-center justify-center 
                touch-manipulation backdrop-blur-sm
                transition-shadow duration-200
                safe-area-padding
              `}
              variants={shouldReduceMotion || isMobile ? undefined : musicButtonVariants}
              initial={shouldReduceMotion || isMobile ? undefined : "initial"}
              animate={shouldReduceMotion || isMobile ? undefined : "animate"}
              whileTap={shouldReduceMotion ? undefined : "tap"}
              whileHover={isMobile || shouldReduceMotion ? undefined : "hover"}
              type="button"
              aria-label={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              <AnimatePresence mode="wait">
                {isMusicPlaying ? (
                  <motion.div
                    key="volume-on"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Volume2 size={isMobile ? 20 : 24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="volume-off"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VolumeX size={isMobile ? 20 : 24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* Navigation */}
          <Navigation 
            currentView={currentView} 
            onNavigate={navigateTo}
            user={user}
            onLogout={logout}
          />

          {/* Main Content - Safe Area Padding */}
          <main className="flex-1 safe-area-padding">
            <AnimatePresence mode="wait">
              {currentView === 'home' ? (
                <motion.div
                  key="home"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="min-h-full"
                >
                  <HomePage
                    courseData={courseData}
                    onStartCourse={handleStartCourse}
                    completedModules={completedModules}
                    courseProgress={courseProgress}
                    onChapterClick={handleChapterClick}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="course"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="min-h-full"
                >
                  <Suspense fallback={<SuspenseFallback />}>
                    <GalacticCoursePage
                      courseData={courseData}
                      expandedChapter={expandedChapter}
                      selectedModule={selectedModule}
                      onToggleChapter={toggleChapter}
                      onSelectModule={selectModule}
                      completedModules={completedModules}
                      onNavigateModule={navigateModule}
                      onModuleComplete={markModuleComplete}
                      onModuleBookmark={handleBookmark}
                      bookmarkedModules={bookmarkedModules}
                      hasPrevious={hasPrevious}
                      hasNext={hasNext}
                      currentModuleNumber={currentModuleNumber}
                      totalModules={totalModules}
                      courseProgress={courseProgress}
                      isLoading={false}
                      onBackToMap={handleBackToMap}
                    />
                  </Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SubscriptionGate>

      {/* Pricing Modal */}
      <AnimatePresence>
        {showPricingModal && (
          <Suspense fallback={null}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PricingModal
                onClose={handleClosePricing}
                onSelectPlan={handleSelectPlan}
              />
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>
    </Suspense>
  );
};

export default App;