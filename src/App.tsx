import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Navigation } from '@components/layout/Navigation';
import { Footer } from '@components/layout/Footer';
import { HomePage } from '@pages/HomePage';
import { CoursePage } from '@pages/CoursePage';
import { courseData } from '@data/courseData';
import { useCourseNavigation } from '@hooks/useCourseNavigation';

const App: React.FC = () => {
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

  // Cargar bookmarks desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bookmarkedModules');
      if (saved) {
        const ids = JSON.parse(saved) as number[];
        setBookmarkedModules(new Set(ids));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }, []);

  // Manejar bookmark de módulo
  const handleBookmark = (moduleId: number) => {
    setBookmarkedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      
      try {
        localStorage.setItem('bookmarkedModules', JSON.stringify([...newSet]));
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
    // Auto-seleccionar primer módulo
    if (courseData.chapters?.[0]?.modules?.[0]) {
      selectModule(courseData.chapters[0], courseData.chapters[0].modules[0]);
    }
  };

  // Handler para click en capítulo desde HomePage
  const handleChapterClick = (chapterId: number) => {
    navigateTo('course');
    const chapter = courseData.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      // Expandir capítulo
      toggleChapter(chapterId);
      // Seleccionar primer módulo del capítulo
      if (chapter.modules?.[0]) {
        selectModule(chapter, chapter.modules[0]);
      }
    }
  };

  return (
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
    </div>
  );
};

export default App;