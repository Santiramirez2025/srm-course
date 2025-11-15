// src/App.tsx
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
// ANIMATION VARIANTS - Optimizados con prefers-reduced-motion
// ============================================
const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const
};

const createPageVariants = (shouldReduceMotion: boolean) => ({
  initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: shouldReduceMotion ? { duration: 0.2 } : pageTransition
  },
  exit: { 
    opacity: 0, 
    y: shouldReduceMotion ? 0 : -20, 
    scale: shouldReduceMotion ? 1 : 0.98,
    transition: { duration: shouldReduceMotion ? 0.1 : 0.3, ease: [0.22, 1, 0.36, 1] as const }
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
    transition: { delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }
  },
  tap: { scale: 0.9 },
  hover: { scale: 1.1, rotate: 5 }
};

// ============================================
// LOADING COMPONENT - Memoizado
// ============================================
const LoadingScreen = React.memo(() => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950">
    <motion.div 
      className="text-center"
      variants={loadingVariants}
      initial="initial"
      animate="animate"
    >
      {/* Logo holográfico */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur-2xl opacity-60"
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
        <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
          <Sparkles className="w-12 h-12 text-white relative z-10" />
        </div>
      </div>
      
      <motion.p 
        className="text-white font-bold text-lg"
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
// SUSPENSE FALLBACK
// ============================================
const SuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse text-purple-400 text-lg font-medium">
      Cargando módulo...
    </div>
  </div>
);

// ============================================
// MAIN APP COMPONENT
// ============================================
const App: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const pageVariants = useMemo(() => createPageVariants(!!shouldReduceMotion), [shouldReduceMotion]);
  
  // ============================================
  // HOOKS
  // ============================================
  const { user, loading: authLoading, login, register, loginWithGoogle, logout } = useAuth();
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

  // Scroll to top on view change
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'instant' 
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [currentView]);

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

  // ============================================
  // CALLBACKS - Memoizados para evitar re-renders
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
    navigateTo('course');
  }, [navigateTo]);

  const handleChapterClick = useCallback((chapterId: number) => {
    navigateTo('course');
    toggleChapter(chapterId);
  }, [navigateTo, toggleChapter]);

  const handleBackToMap = useCallback(() => {
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
  // LOADING STATE
  // ============================================
  if (authLoading || subLoading) {
    return <LoadingScreen />;
  }

  // ============================================
  // AUTH GATE
  // ============================================
  if (!user) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AuthModal 
          onClose={() => {}} 
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
        <div className="flex flex-col min-h-screen bg-[#0a0118] text-white">
          
          {/* Background Music */}
          <audio ref={audioRef} loop preload="metadata">
            <source src="/music/lofibro.m4a" type="audio/mp4" />
          </audio>

          {/* Music Toggle Button */}
          {!audioError && (
            <motion.button
              onClick={toggleMusic}
              className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-full shadow-lg shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/60 flex items-center justify-center touch-manipulation backdrop-blur-sm"
              variants={shouldReduceMotion ? undefined : musicButtonVariants}
              initial={shouldReduceMotion ? undefined : "initial"}
              animate={shouldReduceMotion ? undefined : "animate"}
              whileTap={shouldReduceMotion ? undefined : "tap"}
              whileHover={shouldReduceMotion ? undefined : "hover"}
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
                    <Volume2 size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="volume-off"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VolumeX size={24} />
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

          {/* Main Content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {currentView === 'home' ? (
                <motion.div
                  key="home"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
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