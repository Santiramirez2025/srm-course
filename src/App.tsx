import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Navigation } from '@components/layout/Navigation';
import { Footer } from '@components/layout/Footer';
import { HomePage } from '@pages/HomePage';
import { CoursePage } from '@pages/CoursePage';
import { courseData } from '@data/courseData';
import { useCourseNavigation } from '@hooks/useCourseNavigation';

const App: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    currentView,
    expandedChapter,
    selectedModule,
    toggleChapter,
    selectModule,
    navigateTo,
    navigateModule,
    hasPrevious,
    hasNext,
    totalModules,
    isModuleCompleted,
    markModuleComplete,
    initializeChapters
  } = useCourseNavigation();

  // Inicializar los capítulos cuando el componente carga
  React.useEffect(() => {
    if (courseData?.chapters) {
      initializeChapters(courseData.chapters);
    }
  }, [courseData, initializeChapters]);

  // Manejar errores de audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      console.warn('Error al cargar el audio de fondo');
      setAudioError(true);
      setIsMusicPlaying(false);
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current || audioError) return;

    try {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        // Intentar reproducir y manejar el rechazo del navegador
        await audioRef.current.play();
        setIsMusicPlaying(true);
      }
    } catch (error) {
      console.warn('No se pudo reproducir el audio:', error);
      setIsMusicPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Audio player oculto */}
      <audio 
        ref={audioRef} 
        loop
        preload="auto"
      >
        <source src="/music/background.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Botón de música flotante - solo si no hay error */}
      {!audioError && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-50 transition-all transform hover:scale-110 active:scale-95"
          aria-label={isMusicPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
          title={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      )}

      <Navigation 
        currentView={currentView} 
        onNavigate={navigateTo} 
      />

      <main>
        {currentView === 'home' ? (
          <HomePage
            courseData={courseData}
            onStartCourse={() => navigateTo('course')}
          />
        ) : (
          <CoursePage
            courseData={courseData}
            expandedChapter={expandedChapter}
            selectedModule={selectedModule}
            onToggleChapter={toggleChapter}
            onSelectModule={selectModule}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;