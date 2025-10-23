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
  // Auth hook
  const { user, loading: authLoading, login, register, loginWithGoogle, logout } = useAuth();
  
  // Subscription hook
  const { subscription, loading: subLoading, activateSubscription, hasAccess } = useSubscription(user?.uid);

  // Estado de pricing modal
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Estado de audio
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Estado de bookmarks
  const [bookmarkedModules, setBookmarkedModules] = useState<Set<number>>(new Set());

  // Hook de navegación del curso
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

  // Inicializar capítulos una sola vez
  useEffect(() => {
    if (courseData?.chapters) {
      initializeChapters(courseData.chapters);
    }
  }, [initializeChapters]);

  // Cargar bookmarks desde localStorage (por usuario)
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

  // Manejar bookmark de módulo
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

  // Setup de audio con cleanup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      console.warn('Audio no disponible');
      setAudioError(true);
      setIsMusicPlaying(false);
    };

    const handleEnded = () => {
      setIsMusicPlaying(false);
    };

    const handleCanPlay = () => {
      setAudioError(false);
    };

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

  // Toggle música
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

  // Handler para comenzar curso desde HomePage
  const handleStartCourse = () => {
    navigateTo('course');
    if (courseData.chapters?.[0]?.modules?.[0]) {
      selectModule(courseData.chapters[0], courseData.chapters[0].modules[0]);
    }
  };

  // Handler para click en capítulo desde HomePage
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

  // Handler para seleccionar plan
  const handleSelectPlan = async (planId: string) => {
    try {
      console.log('Plan seleccionado:', planId);
      
      // Activar suscripción inmediatamente (sin Stripe por ahora)
      activateSubscription(planId as 'monthly' | 'yearly' | 'lifetime');
      setShowPricingModal(false);
      
      // TODO: En producción, integrar con Stripe:
      // const stripe = await loadStripe(STRIPE_CONFIG.publishableKey);
      // const { error } = await stripe.redirectToCheckout({
      //   lineItems: [{ price: STRIPE_CONFIG.prices[planId].id, quantity: 1 }],
      //   mode: planId === 'lifetime' ? 'payment' : 'subscription',
      //   successUrl: `${window.location.origin}/success`,
      //   cancelUrl: `${window.location.origin}/`,
      // });
      
      // Mostrar mensaje de éxito
      alert('¡Suscripción activada con éxito! 🎉\n\nBienvenido a SRM Academy.');
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago. Por favor, intenta de nuevo.');
    }
  };

  // Loading state mientras verifica autenticación
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-60 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-black text-3xl">S</span>
            </div>
          </div>
          <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-600 rounded-full animate-loading" />
          </div>
          <p className="text-gray-600 font-medium mt-4">Cargando SRM Academy...</p>
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          .animate-loading {
            animation: loading 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Si no está autenticado, mostrar modal de login
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

  // Loading de suscripción
  if (subLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-60 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-black text-3xl">S</span>
            </div>
          </div>
          <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-600 rounded-full animate-loading" />
          </div>
          <p className="text-gray-600 font-medium mt-4">Verificando suscripción...</p>
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          .animate-loading {
            animation: loading 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Usuario autenticado - Aplicar subscription gate
  return (
    <SubscriptionGate
      hasAccess={hasAccess}
      onUpgrade={() => setShowPricingModal(true)}
    >
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Audio Element */}
        <audio 
          ref={audioRef} 
          loop 
          preload="metadata"
          aria-label="Música de fondo"
        >
          <source src="/music/background.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>

        {/* Music Toggle Button */}
        {!audioError && (
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center group"
            aria-label={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
            title={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
            type="button"
          >
            {isMusicPlaying ? (
              <Volume2 
                size={24} 
                className="group-hover:scale-110 transition-transform" 
                aria-hidden="true"
              />
            ) : (
              <VolumeX 
                size={24} 
                className="group-hover:scale-110 transition-transform" 
                aria-hidden="true"
              />
            )}
          </button>
        )}

        {/* Navigation */}
        <Navigation 
          currentView={currentView} 
          onNavigate={navigateTo}
          courseProgress={courseProgress}
          showProgress={currentView === 'course'}
          user={user}
          onLogout={logout}
        />

        {/* Main Content */}
        <main className="flex-1" role="main">
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

        {/* Footer */}
        <Footer />

        {/* Pricing Modal */}
        {showPricingModal && (
          <PricingModal
            onClose={() => setShowPricingModal(false)}
            onSelectPlan={handleSelectPlan}
          />
        )}
      </div>
    </SubscriptionGate>
  );
};

export default App;