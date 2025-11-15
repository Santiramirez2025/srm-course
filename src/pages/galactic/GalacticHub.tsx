import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, CheckCircle2, Star, Layers } from 'lucide-react';
import { OrbitalProgress } from './OrbitalProgress';
import { HolographicStat } from './ui/HolographicStat';
import { CourseData } from '@data/types';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface GalacticHubProps {
  courseData: CourseData;
  courseProgress?: CourseProgress;
  currentModuleNumber: number;
  totalModules: number;
}

interface CourseProgress {
  total: number;
  completed: number;
  percentage: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Animaciones más ligeras para mobile
const CORE_ANIMATION = {
  desktop: { 
    scale: [1, 1.1, 1], 
    rotate: [0, 180, 360] 
  },
  mobile: { 
    scale: [1, 1.05, 1], 
    rotate: [0, 90, 180] 
  }
};

const ICON_ROTATION = {
  desktop: { rotateY: [0, 360] },
  mobile: { rotateY: [0, 180] }
};

const STATS_CONFIG = [
  { icon: BookOpen, labelKey: 'total', label: 'Módulos' },
  { icon: CheckCircle2, labelKey: 'completed', label: 'Completados' },
  { icon: Star, labelKey: 'completed', label: 'Estrellas' }
] as const;

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const CoreIcon = React.memo<{ prefersReducedMotion: boolean }>(({ prefersReducedMotion }) => {
  const rotation = prefersReducedMotion ? {} : ICON_ROTATION.mobile;
  const duration = prefersReducedMotion ? 0 : 10;

  return (
    <motion.div
      className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto"
      animate={rotation}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-50 animate-pulse-glow" />
      <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
        <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
});

CoreIcon.displayName = 'CoreIcon';

const HolographicTitle = React.memo<{ 
  title: string; 
  subtitle?: string;
  prefersReducedMotion: boolean;
}>(({ title, subtitle, prefersReducedMotion }) => {
  const titleVariants = prefersReducedMotion 
    ? {} 
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      };

  const subtitleVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      };

  return (
    <div className="space-y-3 sm:space-y-4">
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-cyan-300 leading-tight px-4 sm:px-0"
        {...titleVariants}
        transition={prefersReducedMotion ? {} : { delay: 0.2 }}
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-6 leading-relaxed"
          {...subtitleVariants}
          transition={prefersReducedMotion ? {} : { delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
});

HolographicTitle.displayName = 'HolographicTitle';

const ProgressRing = React.memo<{ 
  courseProgress: CourseProgress;
  prefersReducedMotion: boolean;
}>(({ courseProgress, prefersReducedMotion }) => {
  const variants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 }
      };

  return (
    <motion.div
      {...variants}
      transition={prefersReducedMotion ? {} : { delay: 0.6 }}
      className="flex justify-center px-4"
    >
      <OrbitalProgress 
        percentage={courseProgress.percentage}
        completed={courseProgress.completed}
        total={courseProgress.total}
        size="large"
      />
    </motion.div>
  );
});

ProgressRing.displayName = 'ProgressRing';

const StatsGrid = React.memo<{ 
  courseProgress: CourseProgress;
  prefersReducedMotion: boolean;
}>(({ courseProgress, prefersReducedMotion }) => {
  const variants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      };

  return (
    <motion.div
      {...variants}
      transition={prefersReducedMotion ? {} : { delay: 0.8 }}
      className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4"
      role="list"
      aria-label="Estadísticas del curso"
    >
      {STATS_CONFIG.map(({ icon, labelKey, label }) => (
        <div key={label} role="listitem">
          <HolographicStat 
            icon={icon} 
            value={courseProgress[labelKey as keyof CourseProgress] as number} 
            label={label}
          />
        </div>
      ))}
    </motion.div>
  );
});

StatsGrid.displayName = 'StatsGrid';

const EnergyCore = React.memo<{ prefersReducedMotion: boolean; isMobile: boolean }>(({ 
  prefersReducedMotion, 
  isMobile 
}) => {
  const animation = isMobile ? CORE_ANIMATION.mobile : CORE_ANIMATION.desktop;
  const duration = prefersReducedMotion ? 0 : (isMobile ? 15 : 20);

  if (prefersReducedMotion) {
    return (
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 via-fuchsia-600/20 to-cyan-600/20 rounded-full blur-3xl"
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div 
      className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 via-fuchsia-600/20 to-cyan-600/20 rounded-full blur-3xl"
      animate={animation}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  );
});

EnergyCore.displayName = 'EnergyCore';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const GalacticHub: React.FC<GalacticHubProps> = React.memo(({ 
  courseData, 
  courseProgress,
  currentModuleNumber,
  totalModules 
}) => {
  // Detect reduced motion preference
  const prefersReducedMotion = useReducedMotion() || false;

  // Detect mobile viewport
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  // Memoize progress check
  const hasProgress = useMemo(() => 
    courseProgress != null && courseProgress.total > 0,
    [courseProgress]
  );

  return (
    <section 
      className="relative"
      aria-labelledby="galactic-hub-title"
    >
      {/* Energy Core Background */}
      <EnergyCore prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} />

      <div className="relative glass-panel holographic rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center space-y-6 sm:space-y-8">
        
        {/* Core Icon */}
        <CoreIcon prefersReducedMotion={prefersReducedMotion} />

        {/* Holographic Title */}
        <HolographicTitle 
          title={courseData.title}
          subtitle={courseData.subtitle}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Energy Progress Ring */}
        {hasProgress && courseProgress && (
          <ProgressRing 
            courseProgress={courseProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}

        {/* Stats Grid */}
        {courseProgress && (
          <StatsGrid 
            courseProgress={courseProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </div>

      <GalacticHubStyles />
    </section>
  );
});

GalacticHub.displayName = 'GalacticHub';

// ============================================================================
// STYLES COMPONENT
// ============================================================================

const GalacticHubStyles = React.memo(() => (
  <style>{`
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 0.8; }
    }

    .animate-pulse-glow {
      animation: pulse-glow 3s ease-in-out infinite;
    }

    /* Glass morphism effects */
    .glass-panel {
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .holographic {
      box-shadow: 
        0 0 40px rgba(168, 85, 247, 0.15),
        inset 0 0 60px rgba(168, 85, 247, 0.05);
    }

    /* Optimize for mobile performance */
    @media (max-width: 768px) {
      .glass-panel {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }

      .holographic {
        box-shadow: 
          0 0 20px rgba(168, 85, 247, 0.1),
          inset 0 0 30px rgba(168, 85, 247, 0.03);
      }
    }

    /* Reduce motion */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }

      .animate-pulse-glow {
        animation: none !important;
        opacity: 0.5;
      }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .glass-panel {
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid white;
      }

      .holographic {
        box-shadow: 0 0 0 2px white;
      }
    }

    /* Focus visible */
    *:focus-visible {
      outline: 3px solid rgba(168, 85, 247, 0.8);
      outline-offset: 2px;
    }

    /* Print styles */
    @media print {
      .glass-panel {
        background: white;
        color: black;
        border: 1px solid black;
      }

      .holographic {
        box-shadow: none;
      }

      [aria-hidden="true"] {
        display: none;
      }
    }
  `}</style>
));

GalacticHubStyles.displayName = 'GalacticHubStyles';