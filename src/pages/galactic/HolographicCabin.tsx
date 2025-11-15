// src/components/course/galactic/HolographicCabin.tsx
import React, { useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, CheckCircle2, Sparkles, Zap } from 'lucide-react';
import { HolographicPanel } from './ui/HolographicPanel';
import { WarpButton } from './ui/WarpButton';
import { ModuleContent } from '../../components/course/ModuleContent';
import { Module } from '@data/types';

// ============================================================================
// TYPES
// ============================================================================

interface HolographicCabinProps {
  module: Module & { chapterTitle: string; chapterId: number };
  onComplete?: (moduleId: number) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  onBookmark?: (moduleId: number) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  currentModuleNumber: number;
  totalModules: number;
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const AnimatedBackground = React.memo<{ prefersReducedMotion: boolean }>(
  ({ prefersReducedMotion }) => {
    if (prefersReducedMotion) {
      return (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), transparent 70%)'
          }}
          aria-hidden="true"
        />
      );
    }

    return (
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />
    );
  }
);
AnimatedBackground.displayName = 'AnimatedBackground';

const ProgressBar = React.memo<{ percentage: number; prefersReducedMotion: boolean }>(
  ({ percentage, prefersReducedMotion }) => (
    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800/50 overflow-hidden" aria-hidden="true">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 1, ease: "easeOut" }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progreso del curso: ${Math.round(percentage)}%`}
      />
    </div>
  )
);
ProgressBar.displayName = 'ProgressBar';

const FloatingParticle = React.memo<{ 
  position: 'top-right' | 'bottom-left';
  color: string;
  delay?: number;
}>(({ position, color, delay = 0 }) => {
  const positionClasses = position === 'top-right' 
    ? '-top-1 -right-1' 
    : '-bottom-1 -left-1';
  
  const animation = position === 'top-right'
    ? { y: [-5, 5, -5] }
    : { y: [5, -5, 5] };

  return (
    <motion.div
      className={`absolute ${positionClasses} w-2 h-2 ${color} rounded-full`}
      animate={{
        ...animation,
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      aria-hidden="true"
    />
  );
});
FloatingParticle.displayName = 'FloatingParticle';

const ModuleIcon = React.memo<{ prefersReducedMotion: boolean }>(
  ({ prefersReducedMotion }) => {
    const iconAnimation = useMemo(() => {
      if (prefersReducedMotion) {
        return {
          animate: {},
          whileHover: {},
          transition: {}
        };
      }

      return {
        animate: { rotate: [0, 360] as number[] },
        whileHover: { scale: 1.1 },
        transition: {
          rotate: { duration: 20, repeat: Infinity, ease: "linear" as const },
          scale: { duration: 0.3 }
        }
      };
    }, [prefersReducedMotion]);

    const glowAnimation = useMemo(() => {
      if (prefersReducedMotion) {
        return {
          animate: {},
          transition: {}
        };
      }

      return {
        animate: {
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.4)",
            "0 0 40px rgba(168, 85, 247, 0.6)",
            "0 0 20px rgba(168, 85, 247, 0.4)",
          ] as string[]
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut" as const
        }
      };
    }, [prefersReducedMotion]);

    return (
      <motion.div
        className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0"
        {...iconAnimation}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-60"
          {...glowAnimation}
        />
        
        {/* Icon container */}
        <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
          {/* Inner shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
          <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" aria-hidden="true" />
        </div>
        
        {/* Floating particles */}
        {!prefersReducedMotion && (
          <>
            <FloatingParticle position="top-right" color="bg-cyan-400" />
            <FloatingParticle position="bottom-left" color="bg-purple-400" delay={1} />
          </>
        )}
      </motion.div>
    );
  }
);
ModuleIcon.displayName = 'ModuleIcon';

const Breadcrumb = React.memo<{ 
  chapterTitle: string;
  currentModuleNumber: number;
}>(({ chapterTitle, currentModuleNumber }) => (
  <motion.nav
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-2 mb-2"
    aria-label="Breadcrumb"
  >
    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
      {chapterTitle}
    </span>
    <span className="text-gray-600" aria-hidden="true">•</span>
    <span className="text-xs text-gray-500 font-medium">
      Módulo {currentModuleNumber}
    </span>
  </motion.nav>
));
Breadcrumb.displayName = 'Breadcrumb';

const ModuleTitle = React.memo<{ title: string }>(({ title }) => (
  <motion.h1
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 leading-tight"
  >
    {title}
  </motion.h1>
));
ModuleTitle.displayName = 'ModuleTitle';

const ProgressIndicator = React.memo<{ 
  current: number;
  total: number;
}>(({ current, total }) => (
  <div className="hidden sm:flex flex-col items-end">
    <span className="text-xs text-gray-500 font-medium mb-1">Progreso</span>
    <span className="text-lg font-black text-white" aria-label={`Módulo ${current} de ${total}`}>
      {current}/{total}
    </span>
  </div>
));
ProgressIndicator.displayName = 'ProgressIndicator';

const CompletionBadge = React.memo<{ prefersReducedMotion: boolean }>(
  ({ prefersReducedMotion }) => {
    const springConfig = prefersReducedMotion
      ? { duration: 0.3 }
      : {
          type: "spring" as const,
          stiffness: 260,
          damping: 20
        };

    const glowAnimation = useMemo(() => {
      if (prefersReducedMotion) {
        return { animate: {}, transition: {} };
      }

      return {
        animate: {
          scale: [1, 1.2, 1] as number[],
          opacity: [0.5, 0.7, 0.5] as number[]
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut" as const
        }
      };
    }, [prefersReducedMotion]);

    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={springConfig}
        className="relative"
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50"
          {...glowAnimation}
          aria-hidden="true"
        />
        
        {/* Badge */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
          <span className="sr-only">Módulo completado</span>
        </div>
        
        {/* Sparkles */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            aria-hidden="true"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        )}
      </motion.div>
    );
  }
);
CompletionBadge.displayName = 'CompletionBadge';

const CompleteButton = React.memo<{
  isCompleted: boolean;
  onComplete: () => void;
  prefersReducedMotion: boolean;
}>(({ isCompleted, onComplete, prefersReducedMotion }) => {
  return (
    <motion.button
      onClick={onComplete}
      disabled={isCompleted}
      className={`
        group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-base sm:text-lg
        transition-all duration-500 overflow-hidden
        ${isCompleted 
          ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 cursor-not-allowed border-2 border-green-500/30' 
          : 'bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 border-2 border-purple-400/50'
        }
      `}
      whileHover={isCompleted || prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={isCompleted || prefersReducedMotion ? {} : { scale: 0.98 }}
      aria-pressed={isCompleted}
    >
      {/* Animated background */}
      {!isCompleted && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-purple-600"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            <span className="hidden sm:inline">Completado</span>
            <span className="sm:hidden">Hecho</span>
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
            <span className="hidden sm:inline">Marcar como Completado</span>
            <span className="sm:hidden">Completar</span>
          </>
        )}
      </span>

      {/* Shine effect */}
      {!isCompleted && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-200%', '200%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
});
CompleteButton.displayName = 'CompleteButton';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const HolographicCabin: React.FC<HolographicCabinProps> = React.memo(({
  module,
  onComplete,
  onNavigate,
  onBookmark,
  isCompleted,
  isBookmarked,
  hasPrevious,
  hasNext,
  currentModuleNumber,
  totalModules
}) => {
  const prefersReducedMotion = useReducedMotion() || false;
  
  // Memoize progress calculation
  const progressPercentage = useMemo(
    () => (currentModuleNumber / totalModules) * 100,
    [currentModuleNumber, totalModules]
  );

  // Memoize callbacks
  const handleComplete = useCallback(() => {
    onComplete?.(module.id);
  }, [onComplete, module.id]);

  const handleNavigatePrev = useCallback(() => {
    onNavigate?.('prev');
  }, [onNavigate]);

  const handleNavigateNext = useCallback(() => {
    onNavigate?.('next');
  }, [onNavigate]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Holográfico Premium */}
      <HolographicPanel>
        <div className="relative overflow-hidden">
          {/* Animated background */}
          <AnimatedBackground prefersReducedMotion={prefersReducedMotion} />

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* Progress Bar */}
            <ProgressBar 
              percentage={progressPercentage} 
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Header Content */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                {/* Module Icon */}
                <ModuleIcon prefersReducedMotion={prefersReducedMotion} />
                
                <div className="flex-1 min-w-0">
                  {/* Breadcrumb */}
                  <Breadcrumb 
                    chapterTitle={module.chapterTitle}
                    currentModuleNumber={currentModuleNumber}
                  />
                  
                  {/* Title */}
                  <ModuleTitle title={module.title} />
                </div>
              </div>

              {/* Status Badge Premium */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 sm:gap-4 flex-shrink-0 self-end lg:self-auto"
              >
                {/* Progress indicator */}
                <ProgressIndicator 
                  current={currentModuleNumber}
                  total={totalModules}
                />

                {/* Completion Badge */}
                {isCompleted && (
                  <CompletionBadge prefersReducedMotion={prefersReducedMotion} />
                )}
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4"
              aria-label="Navegación de módulos"
            >
              <WarpButton
                direction="prev"
                onClick={handleNavigatePrev}
                disabled={!hasPrevious}
              />
              
              {/* Complete Button */}
              <CompleteButton
                isCompleted={isCompleted}
                onComplete={handleComplete}
                prefersReducedMotion={prefersReducedMotion}
              />

              <WarpButton
                direction="next"
                onClick={handleNavigateNext}
                disabled={!hasNext}
              />
            </motion.nav>
          </div>
        </div>
      </HolographicPanel>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <HolographicPanel>
          <div className="p-6 sm:p-8 lg:p-10">
            <ModuleContent
              module={module}
              onComplete={onComplete}
              onNavigate={onNavigate}
              onBookmark={onBookmark}
              isCompleted={isCompleted}
              isBookmarked={isBookmarked}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              currentModuleNumber={currentModuleNumber}
              totalModules={totalModules}
              isLoading={false}
            />
          </div>
        </HolographicPanel>
      </motion.div>
    </div>
  );
});

HolographicCabin.displayName = 'HolographicCabin';