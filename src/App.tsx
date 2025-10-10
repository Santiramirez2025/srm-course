import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Navigation } from '@components/layout/Navigation';
import { Footer } from '@components/layout/Footer';
import { HomePage } from '@pages/HomePage';
import { CoursePage } from '@pages/CoursePage';
import { courseData } from '@data/courseData';
import { useCourseNavigation } from '@hooks/useCourseNavigation';

const App: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    currentView,
    expandedChapter,
    selectedModule,
    toggleChapter,
    selectModule,
    navigateTo
  } = useCourseNavigation();

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Audio player oculto */}
      <audio ref={audioRef} loop>
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      {/* Botón de música flotante */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-50 transition-all transform hover:scale-110"
        title={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <Navigation 
        currentView={currentView} 
        onNavigate={navigateTo} 
      />

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

      <Footer />
    </div>
  );
};

export default App;