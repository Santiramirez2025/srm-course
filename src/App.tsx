import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@components/layout/Navigation';
import { Footer } from '@components/layout/Footer';
import { HomePage } from '@pages/HomePage';
import { CoursePage } from '@pages/CoursePage';
import { AuthModal } from '@components/auth/AuthModal';
import { PricingModal } from '@components/subscription/PricingModal';
import { SubscriptionGate } from '@components/subscription/SubscriptionGate';
import { courseData } from '@data/courseData';
import { useCourseNavigation } from '@hooks/useCourseNavigation';
import { useAuth } from '@hooks/useAuth';
import { useSubscription } from '@hooks/useSubscription';

// 🎬 Variantes de animación profesionales (TypeScript fix)
const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const
};

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: pageTransition
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const loadingVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const }
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

const App: React.FC = () => {
  const { user, loading: authLoading, login, register, loginWithGoogle, logout } = useAuth();
  const { subscription, loading: subLoading, activateSubscription, hasAccess } = useSubscription(user?.uid);
  
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [bookmarkedModules, setBookmarkedModules] = useState<Set<number>>(new Set());

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

  // Bookmark handler
  const handleBookmark = (moduleId: number) => {
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
  };

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

  // Toggle music
  const toggleMusic = async () => {
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
  };

  // Start course
  const handleStartCourse = () => {
    navigateTo('course');
    if (courseData.chapters?.[0]?.modules?.[0]) {
      selectModule(courseData.chapters[0], courseData.chapters[0].modules[0]);
    }
  };

  // Chapter navigation
  const handleChapterClick = (chapterId: number) => {
    navigateTo('course');
    const chapter = courseData.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      toggleChapter(chapterId);
      if (chapter.modules?.[0]) {
        selectModule(chapter, chapter.modules[0]);
      }
    }
  };

  // Plan selection
  const handleSelectPlan = async (planId: string) => {
    try {
      activateSubscription(planId as 'monthly' | 'yearly' | 'lifetime');
      setShowPricingModal(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar. Intenta de nuevo.');
    }
  };

  // 🎨 Loading con animación
  if (authLoading || subLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <motion.div 
          className="text-center"
          variants={loadingVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-60"
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
            <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <motion.span 
                className="text-white font-black text-3xl"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                S
              </motion.span>
            </div>
          </div>
          <motion.p 
            className="text-gray-600 font-medium mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Cargando...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // 🔐 Auth gate con animación
  if (!user) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
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

  // 🚀 Main app
  return (
    <>
      <SubscriptionGate
        hasAccess={hasAccess}
        onUpgrade={() => setShowPricingModal(true)}
      >
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          {/* Background Music */}
          <audio ref={audioRef} loop preload="metadata">
            <source src="/music/lofibro.m4a" type="audio/mp4" />
          </audio>

          {/* 🎵 Music Toggle Button con animación */}
          {!audioError && (
            <motion.button
              onClick={toggleMusic}
              className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center touch-manipulation"
              variants={musicButtonVariants}
              initial="initial"
              animate="animate"
              whileTap="tap"
              whileHover="hover"
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

          {/* 🎬 Main Content con transiciones */}
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
                  <CoursePage
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
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SubscriptionGate>

      {/* 💳 Pricing Modal con animación */}
      <AnimatePresence>
        {showPricingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PricingModal
              onClose={() => setShowPricingModal(false)}
              onSelectPlan={handleSelectPlan}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;