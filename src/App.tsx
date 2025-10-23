import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
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

  useEffect(() => {
    if (courseData?.chapters) {
      initializeChapters(courseData.chapters);
    }
  }, [initializeChapters]);

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

  const handleStartCourse = () => {
    navigateTo('course');
    if (courseData.chapters?.[0]?.modules?.[0]) {
      selectModule(courseData.chapters[0], courseData.chapters[0].modules[0]);
    }
  };

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

  const handleSelectPlan = async (planId: string) => {
    try {
      activateSubscription(planId as 'monthly' | 'yearly' | 'lifetime');
      setShowPricingModal(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar. Intenta de nuevo.');
    }
  };

  if (authLoading || subLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-60 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-black text-3xl">S</span>
            </div>
          </div>
          <p className="text-gray-600 font-medium mt-4">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <AuthModal 
          onClose={() => {}} 
          onLogin={login}
          onRegister={register}
          onGoogleLogin={loginWithGoogle}
        />
      </div>
    );
  }

  return (
    <>
      <SubscriptionGate
        hasAccess={hasAccess}
        onUpgrade={() => setShowPricingModal(true)}
      >
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          <audio ref={audioRef} loop preload="metadata">
            <source src="/music/background.mp3" type="audio/mpeg" />
          </audio>

          {!audioError && (
            <button
              onClick={toggleMusic}
              className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center group"
              type="button"
            >
              {isMusicPlaying ? (
                <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
              ) : (
                <VolumeX size={24} className="group-hover:scale-110 transition-transform" />
              )}
            </button>
          )}

          <Navigation 
            currentView={currentView} 
            onNavigate={navigateTo}
            courseProgress={courseProgress}
            showProgress={currentView === 'course'}
            user={user}
            onLogout={logout}
          />

          <main className="flex-1">
            {currentView === 'home' ? (
              <HomePage
                courseData={courseData}
                onStartCourse={handleStartCourse}
                completedModules={completedModules}
                courseProgress={courseProgress}
                onChapterClick={handleChapterClick}
              />
            ) : (
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
            )}
          </main>

          <Footer />
        </div>
      </SubscriptionGate>

      {showPricingModal && (
        <PricingModal
          onClose={() => setShowPricingModal(false)}
          onSelectPlan={handleSelectPlan}
        />
      )}
    </>
  );
};

export default App;