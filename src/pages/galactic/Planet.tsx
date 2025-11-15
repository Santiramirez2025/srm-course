import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import { Chapter, Module } from '@data/types';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface PlanetProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  completedModules: Set<number>;
  index: number;
}

interface PlanetTheme {
  gradient: string;
  glow: string;
  ring: string;
}

interface OrbitalPosition {
  x: number;
  y: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const PLANET_THEMES: PlanetTheme[] = [
  { 
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    glow: 'rgba(168, 85, 247, 0.4)',
    ring: '#a855f7'
  },
  { 
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glow: 'rgba(6, 182, 212, 0.4)',
    ring: '#06b6d4'
  },
  { 
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    glow: 'rgba(236, 72, 153, 0.4)',
    ring: '#ec4899'
  },
  { 
    gradient: 'from-violet-500 via-purple-500 to-indigo-500',
    glow: 'rgba(139, 92, 246, 0.4)',
    ring: '#8b5cf6'
  },
];

const DIMENSIONS = {
  ORBITAL_RADIUS: 220,
  SATELLITE_SIZE: 64,
  TOOLTIP_HEIGHT: 80,
  SAFETY_MARGIN: 20,
  PLANET_SIZE: 192, // 48 * 4 = 192px (w-48 h-48)
} as const;

const ANIMATIONS = {
  glow: {
    desktop: {
      animate: {
        scale: [1, 1.05, 1] as number[],
        opacity: [0.3, 0.4, 0.3] as number[]
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number]
      }
    },
    mobile: {
      animate: {
        scale: [1, 1.03, 1] as number[],
        opacity: [0.2, 0.3, 0.2] as number[]
      },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number]
      }
    }
  },
  ripple: {
    hover: {
      scale: 1.8,
      opacity: [0, 0.6, 0] as number[]
    },
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
    }
  },
  planet: {
    desktop: {
      hover: { scale: 1.05, rotateY: 5 },
      tap: { scale: 0.98 }
    },
    mobile: {
      hover: { scale: 1.02 },
      tap: { scale: 0.95 }
    }
  }
} as const;
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getContainerSize = (): number => {
  const { ORBITAL_RADIUS, SATELLITE_SIZE, TOOLTIP_HEIGHT, SAFETY_MARGIN } = DIMENSIONS;
  return (ORBITAL_RADIUS + SATELLITE_SIZE / 2 + TOOLTIP_HEIGHT + SAFETY_MARGIN) * 2;
};

const getOrbitalPosition = (moduleIndex: number, total: number): OrbitalPosition => {
  const angle = (moduleIndex / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * DIMENSIONS.ORBITAL_RADIUS,
    y: Math.sin(angle) * DIMENSIONS.ORBITAL_RADIUS
  };
};

const calculateCircumference = (radius: number): number => {
  return 2 * Math.PI * radius;
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const AmbientGlow = React.memo<{ 
  theme: PlanetTheme; 
  isMobile: boolean;
  prefersReducedMotion: boolean;
}>(({ theme, isMobile, prefersReducedMotion }) => {
  const config = isMobile ? ANIMATIONS.glow.mobile : ANIMATIONS.glow.desktop;

  if (prefersReducedMotion) {
    return (
      <div 
        className={`absolute -inset-6 sm:-inset-8 md:-inset-10 bg-gradient-to-r ${theme.gradient} rounded-full blur-2xl sm:blur-3xl opacity-30`}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div 
      className={`absolute -inset-6 sm:-inset-8 md:-inset-10 bg-gradient-to-r ${theme.gradient} rounded-full blur-2xl sm:blur-3xl`}
      animate={config.animate}
      transition={config.transition}
      aria-hidden="true"
    />
  );
});

AmbientGlow.displayName = 'AmbientGlow';

const HoverRipple = React.memo<{ prefersReducedMotion: boolean }>(({ prefersReducedMotion }) => {
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-white/60"
      initial={{ scale: 1, opacity: 0 }}
      whileHover={ANIMATIONS.ripple.hover}
      transition={ANIMATIONS.ripple.transition}
      aria-hidden="true"
    />
  );
});

HoverRipple.displayName = 'HoverRipple';

const HolographicShine = React.memo<{ prefersReducedMotion: boolean }>(({ prefersReducedMotion }) => {
  if (prefersReducedMotion) {
    return (
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/10 to-transparent"
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/10 to-transparent"
      animate={{ 
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      style={{ backgroundSize: '200% 200%' }}
      aria-hidden="true"
    />
  );
});

HolographicShine.displayName = 'HolographicShine';

const ProgressRing = React.memo<{ 
  progress: number; 
  circumference: number;
  prefersReducedMotion: boolean;
}>(({ progress, circumference, prefersReducedMotion }) => {
  const duration = prefersReducedMotion ? 0.5 : 1.5;

  return (
    <svg className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
      <circle
        cx="96"
        cy="96"
        r="88"
        fill="none"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="3"
      />
      <motion.circle
        cx="96"
        cy="96"
        r="88"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
        transition={{ duration, ease: "easeOut" }}
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
      />
    </svg>
  );
});

ProgressRing.displayName = 'ProgressRing';

const PlanetContent = React.memo<{ 
  chapterId: number;
  title: string;
  completedCount: number;
  totalModules: number;
  prefersReducedMotion: boolean;
}>(({ chapterId, title, completedCount, totalModules, prefersReducedMotion }) => {
  const delays = prefersReducedMotion ? { number: 0, title: 0, badge: 0 } : { number: 0.2, title: 0.3, badge: 0.4 };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-6 text-center">
      <motion.span 
        className="text-xl sm:text-2xl font-black tracking-wider"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delays.number }}
      >
        {chapterId}
      </motion.span>
      
      <motion.span 
        className="text-xs sm:text-sm font-bold mt-1.5 sm:mt-2 leading-tight line-clamp-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delays.title }}
      >
        {title}
      </motion.span>
      
      <motion.div 
        className="mt-2 sm:mt-3 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delays.badge }}
      >
        <span className="text-xs font-bold">
          {completedCount}/{totalModules}
        </span>
      </motion.div>
    </div>
  );
});

PlanetContent.displayName = 'PlanetContent';

const OrbitalRing = React.memo<{ 
  theme: PlanetTheme;
  prefersReducedMotion: boolean;
}>(({ theme, prefersReducedMotion }) => {
  const duration = prefersReducedMotion ? 0.15 : 0.3;

  return (
    <motion.svg 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
      width="440" 
      height="440"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration }}
      aria-hidden="true"
    >
      <circle
        cx="220"
        cy="220"
        r="220"
        fill="none"
        stroke={theme.ring}
        strokeWidth="1"
        strokeDasharray="4 8"
        opacity="0.3"
      />
    </motion.svg>
  );
});

OrbitalRing.displayName = 'OrbitalRing';

const SatelliteTooltip = React.memo<{ 
  title: string;
  isCompleted: boolean;
  prefersReducedMotion: boolean;
}>(({ title, isCompleted, prefersReducedMotion }) => {
  const duration = prefersReducedMotion ? 0.1 : 0.2;

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -top-16 sm:-top-20 opacity-0 group-hover:opacity-100 pointer-events-none z-50"
      initial={{ y: 10 }}
      whileHover={{ y: 0 }}
      transition={{ duration }}
    >
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-2xl whitespace-nowrap">
        <p className="text-xs sm:text-sm font-bold text-white">{title}</p>
        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
          {isCompleted ? '✓ Completado' : '🔒 Bloqueado'}
        </p>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-white/10" />
    </motion.div>
  );
});

SatelliteTooltip.displayName = 'SatelliteTooltip';

const CompletionPulse = React.memo<{ prefersReducedMotion: boolean }>(({ prefersReducedMotion }) => {
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-emerald-300"
      animate={{ 
        scale: [1, 1.4],
        opacity: [0.6, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }}
      aria-hidden="true"
    />
  );
});

CompletionPulse.displayName = 'CompletionPulse';

const ModuleSatellite = React.memo<{
  module: Module;
  chapter: Chapter;
  moduleIndex: number;
  totalModules: number;
  isCompleted: boolean;
  containerSize: number;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  prefersReducedMotion: boolean;
}>(({ 
  module, 
  chapter, 
  moduleIndex, 
  totalModules, 
  isCompleted, 
  containerSize,
  onSelectModule,
  prefersReducedMotion
}) => {
  const pos = useMemo(() => 
    getOrbitalPosition(moduleIndex, totalModules), 
    [moduleIndex, totalModules]
  );

  const centerOffset = containerSize / 2;

  const handleClick = useCallback(() => {
    onSelectModule(chapter, module);
  }, [onSelectModule, chapter, module]);

  const delay = prefersReducedMotion ? 0 : moduleIndex * 0.08;
  const springConfig = prefersReducedMotion 
    ? { type: "tween" as const, duration: 0.2 }
    : { type: "spring" as const, stiffness: 260, damping: 20 };

  return (
    <motion.button
      onClick={handleClick}
      className="absolute group z-30 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 rounded-full"
      style={{
        left: `${centerOffset + pos.x}px`,
        top: `${centerOffset + pos.y}px`,
        marginLeft: '-32px',
        marginTop: '-32px',
        pointerEvents: 'auto'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ delay, ...springConfig }}
      whileHover={{ scale: prefersReducedMotion ? 1.1 : 1.25 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`${module.title} - ${isCompleted ? 'Completado' : 'Bloqueado'}`}
    >
      {/* Satellite Glow */}
      <div 
        className="absolute inset-0 rounded-full blur-md sm:blur-lg -z-10"
        style={{
          backgroundColor: isCompleted ? 'rgba(34, 197, 94, 0.5)' : 'rgba(107, 114, 128, 0.4)',
        }}
        aria-hidden="true"
      />

      {/* Satellite Body */}
      <div className={`
        relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
        transition-all duration-300
        ${isCompleted 
          ? 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-green-500/60' 
          : 'bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg shadow-gray-700/60'
        }
      `}>
        {isCompleted ? (
          <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
        ) : (
          <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" strokeWidth={2} />
        )}
        
        {/* Completion Pulse */}
        {isCompleted && (
          <CompletionPulse prefersReducedMotion={prefersReducedMotion} />
        )}
      </div>

      {/* Tooltip */}
      <SatelliteTooltip 
        title={module.title}
        isCompleted={isCompleted}
        prefersReducedMotion={prefersReducedMotion}
      />
    </motion.button>
  );
});

ModuleSatellite.displayName = 'ModuleSatellite';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const Planet: React.FC<PlanetProps> = React.memo(({ 
  chapter, 
  isExpanded, 
  onToggle, 
  onSelectModule, 
  completedModules, 
  index 
}) => {
  // Detect user preferences
  const prefersReducedMotion = useReducedMotion() || false;

  // Detect mobile
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  // Memoize calculations
  const completedCount = useMemo(() => 
    chapter.modules.filter(m => completedModules.has(m.id)).length,
    [chapter.modules, completedModules]
  );

  const progress = useMemo(() => 
    (completedCount / chapter.modules.length) * 100,
    [completedCount, chapter.modules.length]
  );

  const theme = useMemo(() => 
    PLANET_THEMES[index % PLANET_THEMES.length],
    [index]
  );

  const circumference = useMemo(() => 
    calculateCircumference(88),
    []
  );

  const containerSize = useMemo(() => 
    getContainerSize(),
    []
  );

  // Animation configs
  const planetAnimation = isMobile ? ANIMATIONS.planet.mobile : ANIMATIONS.planet.desktop;
  const springTransition = { type: "spring" as const, stiffness: 400, damping: 25 };

  return (
    <div 
      className="relative" 
      style={{ 
        width: `${containerSize}px`, 
        height: `${containerSize}px`,
        overflow: 'visible'
      }}
      role="region"
      aria-label={`Capítulo ${chapter.id}: ${chapter.title}`}
    >
      {/* Planet Core Button */}
      <button
        onClick={onToggle}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 rounded-full cursor-pointer"
        style={{ zIndex: 20 }}
        aria-label={`${chapter.title} - ${completedCount} de ${chapter.modules.length} completados`}
        aria-expanded={isExpanded}
        aria-controls={`orbital-modules-${chapter.id}`}
      >
        {/* Ambient Glow Layer */}
        <AmbientGlow theme={theme} isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
        
        {/* Hover Ripple Effect */}
        <HoverRipple prefersReducedMotion={prefersReducedMotion} />

        {/* Planet Sphere */}
        <motion.div 
          className={`relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 bg-gradient-to-br ${theme.gradient} rounded-full shadow-2xl overflow-hidden`}
          style={{ 
            boxShadow: `0 20px 60px ${theme.glow}, 0 0 40px ${theme.glow}` 
          }}
          whileHover={planetAnimation.hover}
          whileTap={planetAnimation.tap}
          transition={springTransition}
        >
          {/* Holographic Shine */}
          <HolographicShine prefersReducedMotion={prefersReducedMotion} />
          
          {/* Progress Ring SVG */}
          <ProgressRing 
            progress={progress} 
            circumference={circumference}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Planet Content */}
          <PlanetContent
            chapterId={chapter.id}
            title={chapter.title}
            completedCount={completedCount}
            totalModules={chapter.modules.length}
            prefersReducedMotion={prefersReducedMotion}
          />
        </motion.div>
      </button>

      {/* Orbital Ring and Satellites */}
      <AnimatePresence>
        {isExpanded && (
          <div
            id={`orbital-modules-${chapter.id}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ pointerEvents: 'none' }}
            role="group"
            aria-label={`Módulos del ${chapter.title}`}
          >
            {/* Orbital Path Ring */}
            <OrbitalRing theme={theme} prefersReducedMotion={prefersReducedMotion} />

            {/* Module Satellites */}
            {chapter.modules.map((module, moduleIndex) => {
              const isCompleted = completedModules.has(module.id);
              
              return (
                <ModuleSatellite
                  key={module.id}
                  module={module}
                  chapter={chapter}
                  moduleIndex={moduleIndex}
                  totalModules={chapter.modules.length}
                  isCompleted={isCompleted}
                  containerSize={containerSize}
                  onSelectModule={onSelectModule}
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <PlanetStyles />
    </div>
  );
});

Planet.displayName = 'Planet';

// ============================================================================
// STYLES COMPONENT
// ============================================================================

const PlanetStyles = React.memo(() => (
  <style>{`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Optimize blur for mobile */
    @media (max-width: 768px) {
      [class*="blur-"] {
        filter: blur(8px) !important;
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
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      button {
        border: 2px solid white !important;
      }

      [aria-hidden="true"] {
        opacity: 0.8 !important;
      }
    }

    /* Focus visible improvements */
    button:focus-visible {
      outline: 3px solid rgba(255, 255, 255, 0.8);
      outline-offset: 4px;
    }

    /* GPU acceleration hints */
    [class*="motion-"],
    [class*="absolute"] {
      will-change: transform, opacity;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    /* Print styles */
    @media print {
      [aria-hidden="true"] {
        display: none !important;
      }

      button {
        pointer-events: none !important;
      }
    }
  `}</style>
));

PlanetStyles.displayName = 'PlanetStyles';