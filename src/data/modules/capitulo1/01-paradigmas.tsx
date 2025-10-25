import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useDragControls, PanInfo } from 'framer-motion';
import confetti from 'canvas-confetti';

// Types
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
}

interface JournalEntry {
  id: string;
  belief: string;
  reflection: string;
  timestamp: number;
}

interface UserProgress {
  points: number;
  level: number;
  achievements: Achievement[];
  completedActions: string[];
  streak: number;
  lastVisit: number;
}

export const ParadigmasContent = () => {
  const [selectedBelief, setSelectedBelief] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [testAnswers, setTestAnswers] = useState<boolean[]>([]);
  const [showTestResult, setShowTestResult] = useState(false);
  
  // Advanced features
  const [userProgress, setUserProgress] = useState<UserProgress>({
    points: 0,
    level: 1,
    achievements: [],
    completedActions: [],
    streak: 1,
    lastVisit: Date.now()
  });
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [currentJournal, setCurrentJournal] = useState('');
  const [showJournal, setShowJournal] = useState(false);
  const [draggedBelief, setDraggedBelief] = useState<string | null>(null);
  const [beliefTransformations, setBeliefTransformations] = useState<{[key: string]: boolean}>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [transformationScore, setTransformationScore] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState<string>('');
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const journalRef = useRef<HTMLTextAreaElement>(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const limitingBeliefs = [
    "No soy bueno para esto",
    "No tengo suerte",
    "Soy malo con el dinero",
    "No tengo tiempo",
    "Ya es muy tarde para mí",
    "No soy creativo"
  ];

  const empoweringBeliefs: { [key: string]: string } = {
    "No soy bueno para esto": "Estoy aprendiendo y mejorando cada día",
    "No tengo suerte": "Creo mis propias oportunidades",
    "Soy malo con el dinero": "Estoy desarrollando inteligencia financiera",
    "No tengo tiempo": "Administro mi tiempo según mis prioridades",
    "Ya es muy tarde para mí": "Es el momento perfecto para empezar",
    "No soy creativo": "La creatividad se desarrolla con práctica"
  };

  const testQuestions = [
    "Suelo decir 'no puedo' antes de intentar",
    "Cuando algo sale mal, lo tomo como confirmación de mis límites",
    "Me cuesta aceptar elogios o logros",
    "Evito situaciones nuevas por miedo a fallar"
  ];

  const achievements: Achievement[] = [
    { id: 'first_test', title: 'Autoconocimiento', description: 'Completaste el test inicial', icon: '🔍', unlocked: false, points: 10 },
    { id: 'belief_selected', title: 'Identificación', description: 'Seleccionaste tu primera creencia', icon: '🎯', unlocked: false, points: 15 },
    { id: 'transformation', title: 'Transformador', description: 'Transformaste una creencia limitante', icon: '✨', unlocked: false, points: 20 },
    { id: 'journal_entry', title: 'Reflexivo', description: 'Escribiste tu primera reflexión', icon: '📝', unlocked: false, points: 25 },
    { id: 'all_beliefs', title: 'Explorador Mental', description: 'Exploraste todas las creencias', icon: '🧠', unlocked: false, points: 30 },
    { id: 'daily_challenge', title: 'Desafío Diario', description: 'Completaste el desafío del día', icon: '🏆', unlocked: false, points: 50 },
    { id: 'master', title: 'Maestro de Paradigmas', description: 'Alcanzaste 100 puntos', icon: '👑', unlocked: false, points: 0 },
  ];

  const dailyChallenges = [
    "Comparte tu transformación con alguien cercano",
    "Escribe 3 evidencias que contradigan tu creencia limitante",
    "Practica tu nueva creencia en una situación real hoy",
    "Medita 5 minutos visualizando tu nuevo paradigma",
    "Enseña a alguien sobre paradigmas usando tus propias palabras"
  ];

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('paradigmas-progress');
    const savedJournal = localStorage.getItem('paradigmas-journal');
    const savedTransformations = localStorage.getItem('paradigmas-transformations');
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
    }
    
    if (savedJournal) {
      setJournalEntries(JSON.parse(savedJournal));
    }
    
    if (savedTransformations) {
      setBeliefTransformations(JSON.parse(savedTransformations));
    }

    // Set daily challenge
    const today = new Date().toDateString();
    const savedChallenge = localStorage.getItem('paradigmas-daily-challenge');
    const savedChallengeDate = localStorage.getItem('paradigmas-challenge-date');
    
    if (savedChallengeDate !== today) {
      const randomChallenge = dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];
      setDailyChallenge(randomChallenge);
      localStorage.setItem('paradigmas-daily-challenge', randomChallenge);
      localStorage.setItem('paradigmas-challenge-date', today);
      setChallengeCompleted(false);
      localStorage.removeItem('paradigmas-challenge-completed');
    } else {
      setDailyChallenge(savedChallenge || dailyChallenges[0]);
      setChallengeCompleted(localStorage.getItem('paradigmas-challenge-completed') === 'true');
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('paradigmas-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('paradigmas-journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('paradigmas-transformations', JSON.stringify(beliefTransformations));
  }, [beliefTransformations]);

  // Calculate transformation score
  useEffect(() => {
    const score = Object.keys(beliefTransformations).filter(k => beliefTransformations[k]).length;
    setTransformationScore(score);
  }, [beliefTransformations]);

  // Play sound effect
  const playSound = (type: 'success' | 'achievement' | 'level-up') => {
    if (!soundEnabled) return;
    
    // You can add actual audio files here
    const frequencies: {[key: string]: number} = {
      'success': 800,
      'achievement': 1000,
      'level-up': 1200
    };
    
    // Web Audio API for simple beep
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequencies[type];
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Trigger confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#8b5cf6']
    });
    playSound('achievement');
  };

  // Award points and check achievements
  const awardPoints = (points: number, achievementId?: string) => {
    setUserProgress(prev => {
      const newPoints = prev.points + points;
      const newLevel = Math.floor(newPoints / 50) + 1;
      const leveledUp = newLevel > prev.level;
      
      if (leveledUp) {
        triggerConfetti();
        playSound('level-up');
      } else {
        playSound('success');
      }

      let updatedAchievements = [...prev.achievements];
      
      if (achievementId) {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement && !prev.achievements.find(a => a.id === achievementId)) {
          updatedAchievements.push({ ...achievement, unlocked: true });
          setShowAchievement({ ...achievement, unlocked: true });
          setTimeout(() => setShowAchievement(null), 3000);
          triggerConfetti();
        }
      }

      // Check master achievement
      if (newPoints >= 100 && !prev.achievements.find(a => a.id === 'master')) {
        const masterAchievement = achievements.find(a => a.id === 'master');
        if (masterAchievement) {
          updatedAchievements.push({ ...masterAchievement, unlocked: true });
          setShowAchievement({ ...masterAchievement, unlocked: true });
          setTimeout(() => setShowAchievement(null), 4000);
          triggerConfetti();
        }
      }

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        achievements: updatedAchievements
      };
    });
  };

  const handleBeliefSelect = (belief: string) => {
    setSelectedBelief(belief);
    setShowResult(true);
    
    if (!userProgress.completedActions.includes('belief_selected')) {
      awardPoints(15, 'belief_selected');
      setUserProgress(prev => ({
        ...prev,
        completedActions: [...prev.completedActions, 'belief_selected']
      }));
    }
  };

  const handleTestAnswer = (index: number, answer: boolean) => {
    const newAnswers = [...testAnswers];
    newAnswers[index] = answer;
    setTestAnswers(newAnswers);
    
    if (newAnswers.filter(a => a !== undefined).length === testQuestions.length) {
      setShowTestResult(true);
      
      if (!userProgress.completedActions.includes('first_test')) {
        awardPoints(10, 'first_test');
        setUserProgress(prev => ({
          ...prev,
          completedActions: [...prev.completedActions, 'first_test']
        }));
      }
    }
  };

  const handleTransformBelief = (belief: string) => {
    setBeliefTransformations(prev => ({
      ...prev,
      [belief]: true
    }));
    
    if (!userProgress.completedActions.includes('transformation')) {
      awardPoints(20, 'transformation');
      setUserProgress(prev => ({
        ...prev,
        completedActions: [...prev.completedActions, 'transformation']
      }));
    }

    // Check if all beliefs explored
    const transformedCount = Object.keys({...beliefTransformations, [belief]: true}).length;
    if (transformedCount === limitingBeliefs.length && !userProgress.completedActions.includes('all_beliefs')) {
      setTimeout(() => {
        awardPoints(30, 'all_beliefs');
        setUserProgress(prev => ({
          ...prev,
          completedActions: [...prev.completedActions, 'all_beliefs']
        }));
      }, 500);
    }
  };

  const saveJournalEntry = () => {
    if (currentJournal.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        belief: selectedBelief,
        reflection: currentJournal,
        timestamp: Date.now()
      };
      
      setJournalEntries(prev => [entry, ...prev]);
      setCurrentJournal('');
      
      if (!userProgress.completedActions.includes('journal_entry')) {
        awardPoints(25, 'journal_entry');
        setUserProgress(prev => ({
          ...prev,
          completedActions: [...prev.completedActions, 'journal_entry']
        }));
      } else {
        awardPoints(5);
      }
    }
  };

  const handleDailyChallenge = () => {
    setChallengeCompleted(true);
    localStorage.setItem('paradigmas-challenge-completed', 'true');
    
    if (!userProgress.completedActions.includes('daily_challenge')) {
      awardPoints(50, 'daily_challenge');
      setUserProgress(prev => ({
        ...prev,
        completedActions: [...prev.completedActions, 'daily_challenge']
      }));
    }
  };

  const countYes = testAnswers.filter(a => a === true).length;

  const copyPrompt = () => {
    const prompt = "🎯 Quiero que actúes como un coach mental experto. Mostrame cuáles son mis paradigmas limitantes ocultos basándote en cómo me describo a mí mismo, mis hábitos y mis resultados. Después, ayudame a transformarlos por nuevas creencias que me permitan alcanzar mi máximo potencial. Sé directo.";
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
    playSound('success');
  };

  const shareProgress = () => {
    const shareText = `🚀 ¡Estoy transformando mis paradigmas!\n\n📊 Nivel ${userProgress.level}\n⭐ ${userProgress.points} puntos\n✨ ${transformationScore}/${limitingBeliefs.length} creencias transformadas\n\n#DesarrolloPersonal #Paradigmas`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mi Progreso en Paradigmas',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('¡Texto copiado! Compartí tu progreso en redes sociales 🎉');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-amber-50/30'
    }`}>
      {/* Fixed Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/20">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl"
                >
                  {showAchievement.icon}
                </motion.div>
                <div>
                  <p className="font-bold text-lg">¡Logro Desbloqueado!</p>
                  <p className="text-sm opacity-90">{showAchievement.title}</p>
                  <p className="text-xs opacity-75">+{showAchievement.points} puntos</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Controls */}
      <div className="fixed top-6 right-6 z-40 flex gap-3">
        {/* Sound Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`w-12 h-12 rounded-xl shadow-lg flex items-center justify-center transition-colors ${
            soundEnabled 
              ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white' 
              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600'
          }`}
        >
          <span className="text-xl">{soundEnabled ? '🔊' : '🔇'}</span>
        </motion.button>

        {/* Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-12 rounded-xl shadow-lg flex items-center justify-center transition-colors ${
            darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-white text-gray-600'
          }`}
        >
          <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
        </motion.button>

        {/* Stats Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowStats(!showStats)}
          className={`w-12 h-12 rounded-xl shadow-lg flex items-center justify-center transition-colors ${
            darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-600'
          }`}
        >
          <span className="text-xl">📊</span>
        </motion.button>
      </div>

      {/* User Progress Panel */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-6 top-24 z-40 w-80 max-h-[80vh] overflow-y-auto"
          >
            <div className={`rounded-3xl shadow-2xl p-6 ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Tu Progreso</h3>
                <button onClick={() => setShowStats(false)} className="text-2xl">×</button>
              </div>

              {/* Level & XP */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold">Nivel {userProgress.level}</span>
                  <span className="text-lg text-amber-500">{userProgress.points} pts</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(userProgress.points % 50) * 2}%` }}
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {50 - (userProgress.points % 50)} puntos para nivel {userProgress.level + 1}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-amber-50'}`}>
                  <p className="text-2xl font-bold">{transformationScore}/{limitingBeliefs.length}</p>
                  <p className="text-xs opacity-75">Transformaciones</p>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                  <p className="text-2xl font-bold">{journalEntries.length}</p>
                  <p className="text-xs opacity-75">Reflexiones</p>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <span>🏆</span> Logros ({userProgress.achievements.length}/{achievements.length})
                </h4>
                <div className="space-y-2">
                  {achievements.map(achievement => {
                    const unlocked = userProgress.achievements.find(a => a.id === achievement.id);
                    return (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: unlocked ? 1.03 : 1 }}
                        className={`p-3 rounded-xl flex items-center gap-3 transition-all ${
                          unlocked 
                            ? darkMode ? 'bg-gradient-to-r from-amber-600 to-orange-600' : 'bg-gradient-to-r from-amber-100 to-orange-100'
                            : darkMode ? 'bg-gray-700 opacity-50' : 'bg-gray-100 opacity-50'
                        }`}
                      >
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{achievement.title}</p>
                          <p className="text-xs opacity-75">{achievement.description}</p>
                        </div>
                        {achievement.points > 0 && (
                          <span className="text-xs font-bold">+{achievement.points}</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={shareProgress}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <span>📤</span> Compartir Progreso
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <motion.div 
          style={{ opacity, scale }}
          className="text-center py-12 relative"
        >
          <motion.div
            animate={floatingAnimation}
            className="inline-block"
          >
            <div className="text-7xl sm:text-8xl mb-6 filter drop-shadow-lg">
              🎙️
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl sm:text-7xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'
            }`}
          >
            Paradigmas
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent`}
          >
            El lente invisible que define tu realidad
          </motion.p>
        </motion.div>

        {/* Test with Drag & Drop */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="relative group">
              <div className={`relative p-8 sm:p-10 rounded-3xl shadow-xl ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white/80 backdrop-blur-xl border border-indigo-100'
              }`}>
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <span className="text-3xl">🔍</span>
                  </motion.div>
                  <div>
                    <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Test rápido
                    </h2>
                    <p className="text-indigo-600 font-medium">¿Tenés paradigmas limitantes?</p>
                  </div>
                </div>

                <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Respondé con honestidad <span className="font-bold text-indigo-600">SÍ</span> o <span className="font-bold text-green-600">NO</span> a cada afirmación:
                </p>
                
                <div className="space-y-4">
                  {testQuestions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        darkMode 
                          ? 'bg-gray-700/50 border-gray-600 hover:border-indigo-500' 
                          : 'bg-white/60 backdrop-blur-sm border-gray-100 hover:border-indigo-200 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <motion.div
                          animate={testAnswers[index] !== undefined ? { scale: [1, 1.2, 1] } : {}}
                          className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center"
                        >
                          <span className="text-sm font-bold text-indigo-600">{index + 1}</span>
                        </motion.div>
                        <p className={`font-medium leading-relaxed flex-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {question}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTestAnswer(index, true)}
                          className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                            testAnswers[index] === true
                              ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-600 text-white shadow-lg'
                              : darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-red-500'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:bg-red-50'
                          }`}
                        >
                          SÍ
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTestAnswer(index, false)}
                          className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                            testAnswers[index] === false
                              ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-600 text-white shadow-lg'
                              : darkMode
                                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-green-500'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50'
                          }`}
                        >
                          NO
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence>
                  {showTestResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-8 p-6 rounded-2xl border-2 ${
                        countYes >= 3 
                          ? darkMode ? 'bg-red-900/30 border-red-500' : 'bg-gradient-to-br from-red-50 to-red-100/50 border-red-200'
                          : countYes >= 2 
                          ? darkMode ? 'bg-orange-900/30 border-orange-500' : 'bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200'
                          : darkMode ? 'bg-green-900/30 border-green-500' : 'bg-gradient-to-br from-green-50 to-green-100/50 border-green-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 1 }}
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                            countYes >= 3 ? 'bg-red-200' :
                            countYes >= 2 ? 'bg-orange-200' : 'bg-green-200'
                          }`}
                        >
                          <span className="text-2xl">
                            {countYes >= 3 ? '⚠️' : countYes >= 2 ? '⚡' : '✨'}
                          </span>
                        </motion.div>
                        <div className="flex-1">
                          <p className={`font-bold mb-2 text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            📊 Resultado:
                          </p>
                          {countYes >= 3 && (
                            <p className={`leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              <strong className="text-red-700">Alerta alta:</strong> Tenés varios paradigmas limitantes activos. 
                              Este módulo es especialmente importante para vos. Seguí leyendo con atención.
                            </p>
                          )}
                          {countYes === 2 && (
                            <p className={`leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              <strong className="text-orange-700">Alerta media:</strong> Algunos paradigmas te están frenando. 
                              Es el momento ideal para trabajar en ellos.
                            </p>
                          )}
                          {countYes <= 1 && (
                            <p className={`leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                              <strong className="text-green-700">Buen camino:</strong> Tenés paradigmas saludables, pero siempre hay espacio para crecer. 
                              Este módulo te ayudará a optimizar aún más tu mentalidad.
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hook Inicial */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <div className={`relative p-8 rounded-3xl shadow-lg border-l-4 border-amber-500 ${
              darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-amber-50 to-orange-50'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">👁️</div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ¿Y si tu vida no fuera lo que pensás?
                </h2>
              </div>
              
              <p className={`text-xl leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                ¿Alguna vez te detuviste a pensar por qué vivís lo que vivís? Tus ingresos, 
                tus vínculos, tu nivel de confianza, tus logros o frustraciones… 
                <strong className="text-amber-700 font-bold"> nada de eso es casual.</strong>
              </p>
              <p className={`text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Todo está profundamente conectado con cómo interpretás el mundo.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Idea Central - Quote */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-12 rounded-3xl shadow-2xl text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
              
            <div className="relative z-10">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-bold mb-3"
              >
                No vivís la vida que querés.
              </motion.p>
                
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent"
              >
                Vivís la vida que creés.
              </motion.p>
                
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300"
              >
                Y esa creencia está moldeada por una sola palabra:{' '}
                <span className="text-amber-400 font-bold text-2xl">paradigma</span>
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* ¿Qué es un paradigma? */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className={`text-4xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="text-5xl">🧠</span>
              ¿Qué es un paradigma?
            </h2>
            
            <p className={`text-xl leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Un paradigma no es solo una idea. Es el <strong className="text-indigo-600">lente invisible</strong> con el que mirás la vida:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: "🌍", text: "Filtra qué ves y qué ignorás" },
                { icon: "💭", text: "Da sentido a lo que te pasa" },
                { icon: "🎯", text: "Define tus acciones (o tu parálisis)" },
                { icon: "✨", text: "Construye tu identidad" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100 hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-4xl"
                    >
                      {item.icon}
                    </motion.div>
                    <p className={`font-medium text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ejemplo Visual con Transformación 3D */}
          <motion.div variants={itemVariants} className="mt-12">
            <div className={`relative p-8 rounded-3xl shadow-xl border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-100'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🔬</div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ejemplo práctico
                </h3>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: -5 }}
                  className={`p-6 rounded-2xl border-2 ${
                    darkMode ? 'bg-red-900/20 border-red-500' : 'bg-gradient-to-br from-red-50 to-red-100/50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                      <span className="font-bold text-red-700">A</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-600 mb-1">ANTES:</p>
                      <p className={`italic leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        "Soy malo con los números. Nunca voy a entender esto."
                      </p>
                    </div>
                  </div>
                </motion.div>
                  
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white font-bold">↻</span>
                  </motion.div>
                </div>
                  
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`p-6 rounded-2xl border-2 ${
                    darkMode ? 'bg-green-900/20 border-green-500' : 'bg-gradient-to-br from-green-50 to-green-100/50 border-green-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="font-bold text-green-700">D</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-600 mb-1">DESPUÉS:</p>
                      <p className={`italic leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                        "Los números son un lenguaje. Puedo aprenderlo como cualquier otro."
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
                
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className={`mt-6 pt-6 border-t-2 ${darkMode ? 'border-gray-700' : 'border-purple-100'}`}
              >
                <p className={`text-center text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  No cambiaron sus habilidades. Cambió su{' '}
                  <span className="font-bold text-purple-600 text-xl">paradigma</span>.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Transformador de Creencias - DRAG & DROP VERSION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className={`relative p-8 sm:p-10 rounded-3xl shadow-xl border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-xl border-green-100'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🛠</span>
                </div>
                <div>
                  <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Transformador de creencias
                  </h2>
                  <p className="text-green-600 font-medium">Arrastrá para transformar</p>
                </div>
              </div>

              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Click o arrastrá una creencia limitante para descubrir su versión potenciadora:
              </p>
                
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {limitingBeliefs.map((belief, index) => {
                  const isTransformed = beliefTransformations[belief];
                  return (
                    <motion.div
                      key={belief}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={0.8}
                      onDragEnd={(e, info) => {
                        if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 50) {
                          handleBeliefSelect(belief);
                          handleTransformBelief(belief);
                          triggerConfetti();
                        }
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      whileDrag={{ scale: 1.1, rotate: 5 }}
                      onClick={() => {
                        handleBeliefSelect(belief);
                        handleTransformBelief(belief);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-grab active:cursor-grabbing ${
                        isTransformed
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-600 text-white shadow-lg'
                          : selectedBelief === belief
                            ? 'bg-gradient-to-br from-amber-500 to-orange-600 border-orange-600 text-white shadow-lg'
                            : darkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-amber-500'
                              : 'bg-white border-gray-200 hover:border-amber-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={isTransformed ? { rotate: [0, 360], scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className="text-lg"
                        >
                          {isTransformed ? '✓' : '❌'}
                        </motion.span>
                        <p className={`text-sm font-semibold ${
                          isTransformed || selectedBelief === belief ? 'text-white' : darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {belief}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {showResult && selectedBelief && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className={`p-8 rounded-2xl border-2 shadow-lg ${
                        darkMode ? 'bg-green-900/20 border-green-500' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                      }`}
                    >
                      <div className="flex items-start gap-6">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          <span className="text-3xl">✨</span>
                        </motion.div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="text-sm text-red-600 font-semibold mb-2 line-through opacity-75">
                              ❌ {selectedBelief}
                            </p>
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xl text-green-700 font-bold leading-relaxed"
                            >
                              ✅ {empoweringBeliefs[selectedBelief]}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`border-2 p-6 rounded-2xl ${
                        darkMode ? 'bg-amber-900/20 border-amber-500' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-200 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">📱</span>
                        </div>
                        <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Acción inmediata:
                        </p>
                      </div>
                        
                      <div className="space-y-3 ml-13">
                        {[
                          "Configurá una alarma en tu celular",
                          <span key="text">Que diga: <span className="italic text-green-600 font-semibold">"{empoweringBeliefs[selectedBelief]}"</span></span>,
                          "Repetila cada día durante 21 días consecutivos"
                        ].map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-start gap-3"
                          >
                            <div className="flex-shrink-0 w-7 h-7 bg-amber-200 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-amber-700 font-bold text-sm">{index + 1}</span>
                            </div>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {step}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                        
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`mt-5 pt-5 border-t-2 ${darkMode ? 'border-amber-700' : 'border-amber-200'}`}
                      >
                        <p className={`text-sm italic flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="text-lg">💡</span>
                          La neuroplasticidad funciona con repetición. Dale tiempo a tu cerebro.
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* Journal Button */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowJournal(true)}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span className="text-xl">📔</span> Reflexionar en mi Diario
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Visual Progress of Transformations */}
              <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Creencias Transformadas
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {transformationScore}/{limitingBeliefs.length}
                  </p>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(transformationScore / limitingBeliefs.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Journal Modal */}
        <AnimatePresence>
          {showJournal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowJournal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className={`max-w-2xl w-full rounded-3xl shadow-2xl p-8 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">📔</span>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Mi Diario de Transformación
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowJournal(false)}
                    className={`text-3xl ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    ×
                  </button>
                </div>

                <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                    <strong>Creencia seleccionada:</strong> {selectedBelief}
                  </p>
                </div>

                <textarea
                  ref={journalRef}
                  value={currentJournal}
                  onChange={(e) => setCurrentJournal(e.target.value)}
                  placeholder="Reflexioná sobre esta transformación... ¿Qué sentís? ¿Qué te frena? ¿Cómo podés aplicar este nuevo paradigma?"
                  className={`w-full p-6 rounded-2xl border-2 focus:outline-none min-h-[200px] text-lg resize-none transition-all ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20'
                      : 'bg-white border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100'
                  }`}
                />

                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      saveJournalEntry();
                      setShowJournal(false);
                    }}
                    disabled={!currentJournal.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    💾 Guardar Reflexión
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowTimeline(true)}
                    className={`px-6 py-4 rounded-2xl font-semibold ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    📜 Ver Historial
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline Modal */}
        <AnimatePresence>
          {showTimeline && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowTimeline(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className={`max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-3xl shadow-2xl p-8 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-6 sticky top-0 bg-inherit pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">📜</span>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Timeline de Transformación
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowTimeline(false)}
                    className={`text-3xl ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    ×
                  </button>
                </div>

                {journalEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Aún no tenés reflexiones guardadas. ¡Empezá tu journey!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {journalEntries.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative p-6 rounded-2xl border-l-4 ${
                          darkMode 
                            ? 'bg-gray-700 border-purple-500' 
                            : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-400'
                        }`}
                      >
                        <div className="absolute -left-3 top-6 w-6 h-6 bg-purple-500 rounded-full border-4 border-white dark:border-gray-800" />
                        
                        <div className="mb-2 flex items-center justify-between">
                          <p className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                            {entry.belief}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {new Date(entry.timestamp).toLocaleDateString('es-AR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {entry.reflection}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textarea - Identificá tu creencia */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative group"
          >
            <div className={`relative p-8 rounded-3xl shadow-lg border-2 ${
              darkMode ? 'bg-gray-800 border-purple-600' : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">✍️</div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Identificá tu creencia limitante
                </h2>
              </div>
              
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                ¿Qué pensamiento te está frenando ahora mismo?
              </p>
              
              <div className="relative">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ejemplo: No puedo aprender idiomas..."
                  className={`w-full p-6 border-2 rounded-2xl focus:outline-none min-h-[120px] text-lg transition-all resize-none ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20'
                      : 'bg-white border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100'
                  }`}
                />
                <AnimatePresence>
                  {userInput && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white text-xl">✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <AnimatePresence>
                {userInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6"
                  >
                    <div className={`p-6 rounded-2xl border-2 shadow-md ${
                      darkMode ? 'bg-gray-700 border-purple-500' : 'bg-white border-purple-300'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          darkMode ? 'bg-purple-700' : 'bg-purple-200'
                        }`}>
                          <span className="text-2xl">💡</span>
                        </div>
                        <p className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Preguntate:
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          "¿De dónde viene esta creencia?",
                          "¿Es realmente verdad o es una interpretación?",
                          "¿Cómo podría replantear esto de forma empoderadora?",
                          "¿Qué evidencia tengo que contradice esta creencia?"
                        ].map((question, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                              darkMode ? 'hover:bg-gray-600' : 'hover:bg-purple-50'
                            }`}
                          >
                            <span className="text-purple-500 mt-0.5">•</span>
                            <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {question}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Las 3 llaves */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className={`text-4xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className="text-5xl">🗝️</span>
              Las 3 llaves para cambiar
            </h2>
            
            <p className={`text-xl mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Cambiar un paradigma no es fácil. Te obliga a cuestionar todo lo que diste por hecho. 
              Pero en ese cuestionamiento… empieza tu libertad.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { 
                  icon: "🙏", 
                  title: "Humildad", 
                  desc: "Para aceptar que podrías estar equivocado",
                  gradient: "from-amber-500 to-orange-500"
                },
                { 
                  icon: "🔁", 
                  title: "Repetición", 
                  desc: "Lo nuevo se instala con práctica, no con buenas intenciones",
                  gradient: "from-orange-500 to-red-500"
                },
                { 
                  icon: "📚", 
                  title: "Conocimiento", 
                  desc: "Para elegir nuevas ideas con conciencia y claridad",
                  gradient: "from-red-500 to-pink-500"
                }
              ].map((key, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    rotateY: 5
                  }}
                  className="relative group cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${key.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                  
                  <div className={`relative p-8 rounded-2xl shadow-lg border-t-4 transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-800 border-amber-500 hover:shadow-2xl' 
                      : 'bg-white border-amber-500 hover:shadow-2xl'
                  }`}>
                    <motion.div 
                      className="text-5xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {key.icon}
                    </motion.div>
                    <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {key.title}
                    </h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {key.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Llamado Final */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white p-12 rounded-3xl text-center overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10" />
              
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="text-5xl mb-6"
              >
                📌
              </motion.div>
                
              <h2 className="text-4xl font-bold mb-6">La invitación</h2>
                
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl mb-6 leading-relaxed"
              >
                Si cambiás la forma en que mirás las cosas, las cosas que mirás cambian.
              </motion.p>
                
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl"
              >
                No porque el mundo sea diferente, sino porque <strong>vos sos diferente.</strong>
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bonus Prompt */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-10 rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" 
                   style={{
                     backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251,191,36,0.2) 1px, transparent 0)`,
                     backgroundSize: '40px 40px'
                   }}
              />
            </div>
              
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-3xl">🔓</span>
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    BONUS: Prompt para tu IA
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">Llevá tu transformación al siguiente nivel</p>
                </div>
              </div>
                
              <p className="text-gray-300 mb-6 text-lg">
                Usá este prompt con ChatGPT, Claude o tu coach digital favorito:
              </p>
                
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-amber-500/20 shadow-xl mb-6 relative overflow-hidden"
              >
                <p className="text-gray-300 leading-relaxed">
                  🎯 Quiero que actúes como un coach mental experto. Mostrame cuáles son mis paradigmas limitantes ocultos 
                  basándote en cómo me describo a mí mismo, mis hábitos y mis resultados. Después, ayudame a transformarlos 
                  por nuevas creencias que me permitan alcanzar mi máximo potencial. Sé directo.
                </p>
              </motion.div>
                
              <motion.button 
                onClick={copyPrompt}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-gray-900 font-bold px-8 py-4 rounded-2xl transition-all w-full sm:w-auto flex items-center justify-center gap-3 shadow-lg group"
              >
                <AnimatePresence mode="wait">
                  {copiedPrompt ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xl">✓</span>
                      <span className="text-lg">¡Copiado!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">📋</span>
                      <span className="text-lg">Copiar prompt</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Daily Challenge - Final */}
        {dailyChallenge && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r rounded-3xl blur-xl opacity-20 ${
                challengeCompleted ? 'from-green-400 to-emerald-500' : 'from-purple-400 to-indigo-500'
              }`} />
              
              <div className={`relative p-10 rounded-3xl shadow-2xl border-2 ${
                challengeCompleted
                  ? darkMode 
                    ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500'
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                  : darkMode 
                    ? 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500'
                    : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-300'
              }`}>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <motion.div
                    animate={{ 
                      rotate: challengeCompleted ? [0, 360] : [0, -10, 10, -10, 0],
                      scale: challengeCompleted ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      duration: challengeCompleted ? 0.6 : 0.5, 
                      repeat: challengeCompleted ? 1 : Infinity, 
                      repeatDelay: 3 
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl ${
                      challengeCompleted
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                        : 'bg-gradient-to-br from-purple-500 to-indigo-500'
                    }`}
                  >
                    <span className="text-5xl">{challengeCompleted ? '✓' : '🎯'}</span>
                  </motion.div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {challengeCompleted ? '¡Desafío Completado!' : 'Tu Desafío de Hoy'}
                    </h3>
                    <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {dailyChallenge}
                    </p>
                    
                    {!challengeCompleted && (
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDailyChallenge}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all"
                      >
                        ✓ Marcar como completado
                      </motion.button>
                    )}
                    
                    {challengeCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-2 text-green-600 font-bold text-xl"
                      >
                        <span className="text-3xl">🎉</span> 
                        <span>+50 puntos ganados</span>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {!challengeCompleted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`mt-6 pt-6 border-t-2 ${
                      darkMode ? 'border-purple-700/50' : 'border-purple-200'
                    }`}
                  >
                    <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      💡 Completá este desafío para ganar <strong className="text-purple-600">50 puntos extra</strong> y desbloquear el logro especial
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Completion Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={floatingAnimation}
            className="inline-block"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4">
              <span className="text-5xl">🏆</span>
            </div>
          </motion.div>
          <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Has completado el módulo sobre Paradigmas
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-amber-600 font-bold mt-2 text-lg"
          >
            +{userProgress.points} puntos totales • Nivel {userProgress.level}
          </motion.p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export const paradigmasMetadata = {
  id: 1,
  title: "Paradigmas",
  type: "document" as const,
  duration: "15 min"
};