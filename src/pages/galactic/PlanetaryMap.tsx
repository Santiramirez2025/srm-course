import React, { useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Planet } from './Planet';
import { Chapter, Module } from '@data/types';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface PlanetaryMapProps {
  chapters: Chapter[];
  expandedChapter: number | null;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  completedModules: Set<number>;
}

interface ConstellationPath {
  y1: number;
  y2: number;
  path: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const PLANET_CONSTANTS = {
  ORBITAL_RADIUS: 220,
  SATELLITE_SIZE: 64,
  TOOLTIP_HEIGHT: 80,
  SAFETY_MARGIN: 20,
  PLANET_CORE_SIZE: 192,
} as const;

const SPACING = {
  NORMAL: 600,
  EXPANDED: 100,
  COLLAPSED_PADDING: 100,
  LAST_MARGIN: 200,
} as const;

const ANIMATION_CONFIG = {
  planet: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    getTransition: (index: number, reducedMotion: boolean) => ({
      duration: reducedMotion ? 0.2 : 0.5,
      delay: reducedMotion ? 0 : index * 0.1,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number]
    })
  },
  constellation: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 0.4 },
    getTransition: (index: number, reducedMotion: boolean) => ({
      duration: reducedMotion ? 0.2 : 1,
      delay: reducedMotion ? 0 : index * 0.2,
      ease: "easeInOut" as const
    })
  },
  ambientBg: {
    desktop: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
      duration: 10
    },
    mobile: {
      scale: [1, 1.05, 1],
      opacity: [0.2, 0.3, 0.2],
      duration: 8
    }
  },
  stars: {
    desktop: {
      opacity: [0.1, 0.6, 0.1],
      scale: [1, 1.3, 1],
      baseDuration: 3
    },
    mobile: {
      opacity: [0.1, 0.4, 0.1],
      scale: [1, 1.1, 1],
      baseDuration: 2
    }
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getExpandedContainerSize = (): number => {
  const { ORBITAL_RADIUS, SATELLITE_SIZE, TOOLTIP_HEIGHT, SAFETY_MARGIN } = PLANET_CONSTANTS;
  return (ORBITAL_RADIUS + SATELLITE_SIZE / 2 + TOOLTIP_HEIGHT + SAFETY_MARGIN) * 2;
};

const getCollapsedSize = (): number => {
  return PLANET_CONSTANTS.PLANET_CORE_SIZE + SPACING.COLLAPSED_PADDING;
};

const getConstellationPath = (
  index: number,
  expandedChapter: number | null,
  chapters: Chapter[],
  svgWidth: number
): ConstellationPath => {
  const centerX = svgWidth / 2;
  const baseY = 250;
  
  const expandedSize = getExpandedContainerSize();
  const collapsedSize = getCollapsedSize();
  
  const normalSpacing = collapsedSize + SPACING.NORMAL;
  const expandedSpacing = expandedSize + SPACING.EXPANDED;
  
  let y1 = baseY;
  
  for (let i = 0; i < index; i++) {
    const isExpanded = expandedChapter === chapters[i].id;
    y1 += isExpanded ? expandedSpacing : normalSpacing;
  }
  
  const isCurrentExpanded = expandedChapter === chapters[index].id;
  const y2 = y1 + (isCurrentExpanded ? expandedSpacing : normalSpacing);
  
  const midY = (y1 + y2) / 2;
  const curveOffset = 40;
  
  return {
    y1,
    y2,
    path: `M ${centerX} ${y1} Q ${centerX} ${midY + curveOffset}, ${centerX} ${y2}`
  };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const AmbientBackground = React.memo<{ 
  isMobile: boolean; 
  prefersReducedMotion: boolean 
}>(({ isMobile, prefersReducedMotion }) => {
  const config = isMobile ? ANIMATION_CONFIG.ambientBg.mobile : ANIMATION_CONFIG.ambientBg.desktop;
  
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 md:w-[500px] h-64 sm:h-96 md:h-[500px] bg-purple-500/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 md:w-[500px] h-64 sm:h-96 md:h-[500px] bg-cyan-500/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] opacity-30" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 sm:w-96 md:w-[500px] h-64 sm:h-96 md:h-[500px] bg-purple-500/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px]"
        animate={{
          scale: config.scale,
          opacity: config.opacity
        }}
        transition={{ duration: config.duration, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 md:w-[500px] h-64 sm:h-96 md:h-[500px] bg-cyan-500/5 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: config.duration + 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
});

AmbientBackground.displayName = 'AmbientBackground';

const ConstellationGradients = React.memo(() => (
  <defs>
    <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
      <stop offset="50%" stopColor="#ec4899" stopOpacity="0.3" />
      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
    </linearGradient>
    
    <filter id="constellationGlow">
      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
));

ConstellationGradients.displayName = 'ConstellationGradients';

const ConstellationLine = React.memo<{
  pathData: ConstellationPath;
  index: number;
  prefersReducedMotion: boolean;
}>(({ pathData, index, prefersReducedMotion }) => {
  const lineTransition = ANIMATION_CONFIG.constellation.getTransition(index, prefersReducedMotion);
  const circleDelay = prefersReducedMotion ? 0 : index * 0.2 + 0.4;

  return (
    <g>
      <motion.path
        d={pathData.path}
        fill="none"
        stroke="url(#constellationGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 10"
        filter="url(#constellationGlow)"
        initial={ANIMATION_CONFIG.constellation.initial}
        animate={ANIMATION_CONFIG.constellation.animate}
        transition={lineTransition}
      />
      
      <motion.circle
        cx={500}
        cy={pathData.y1}
        r="3"
        fill="#a855f7"
        opacity="0.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: circleDelay, duration: prefersReducedMotion ? 0.1 : 0.3 }}
      />
    </g>
  );
});

ConstellationLine.displayName = 'ConstellationLine';

const ConstellationLines = React.memo<{
  paths: ConstellationPath[];
  prefersReducedMotion: boolean;
}>(({ paths, prefersReducedMotion }) => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.2))' }}
    aria-hidden="true"
  >
    <ConstellationGradients />

    {paths.map((pathData, index) => (
      <ConstellationLine
        key={index}
        pathData={pathData}
        index={index}
        prefersReducedMotion={prefersReducedMotion}
      />
    ))}
  </svg>
));

ConstellationLines.displayName = 'ConstellationLines';

const AmbientStar = React.memo<{
  index: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}>(({ index, isMobile, prefersReducedMotion }) => {
  const config = isMobile ? ANIMATION_CONFIG.stars.mobile : ANIMATION_CONFIG.stars.desktop;
  const randomDelay = Math.random() * 3;
  const randomDuration = config.baseDuration + Math.random() * 2;

  const style = useMemo(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }), []);

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
        style={style}
      />
    );
  }

  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={style}
      animate={{
        opacity: config.opacity,
        scale: config.scale
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay
      }}
    />
  );
});

AmbientStar.displayName = 'AmbientStar';

const AmbientStars = React.memo<{
  count: number;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}>(({ count, isMobile, prefersReducedMotion }) => (
  <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => (
      <AmbientStar
        key={i}
        index={i}
        isMobile={isMobile}
        prefersReducedMotion={prefersReducedMotion}
      />
    ))}
  </div>
));

AmbientStars.displayName = 'AmbientStars';

const PlanetContainer = React.memo<{
  chapter: Chapter;
  index: number;
  isExpanded: boolean;
  isLastChapter: boolean;
  containerHeight: number;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  completedModules: Set<number>;
  prefersReducedMotion: boolean;
}>(({ 
  chapter, 
  index, 
  isExpanded, 
  isLastChapter,
  containerHeight,
  onToggleChapter,
  onSelectModule,
  completedModules,
  prefersReducedMotion
}) => {
  const marginBottom = isLastChapter ? SPACING.LAST_MARGIN : SPACING.NORMAL;
  const transition = ANIMATION_CONFIG.planet.getTransition(index, prefersReducedMotion);

  const handleToggle = useCallback(() => {
    onToggleChapter(chapter.id);
  }, [onToggleChapter, chapter.id]);

  return (
    <motion.div
      initial={ANIMATION_CONFIG.planet.initial}
      animate={ANIMATION_CONFIG.planet.animate}
      transition={transition}
      className="flex items-center justify-center transition-all duration-500"
      style={{
        minHeight: `${containerHeight}px`,
        marginBottom: `${marginBottom}px`
      }}
    >
      <div 
        style={{ zIndex: isExpanded ? 200 : 10 }} 
        className="relative"
      >
        <Planet
          chapter={chapter}
          isExpanded={isExpanded}
          onToggle={handleToggle}
          onSelectModule={onSelectModule}
          completedModules={completedModules}
          index={index}
        />
      </div>
    </motion.div>
  );
});

PlanetContainer.displayName = 'PlanetContainer';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const PlanetaryMap: React.FC<PlanetaryMapProps> = React.memo(({
  chapters,
  expandedChapter,
  onToggleChapter,
  onSelectModule,
  completedModules
}) => {
  // Detect user preferences
  const prefersReducedMotion = useReducedMotion() || false;
  
  // Detect mobile viewport
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  // Get viewport width for constellation calculations
  const viewportWidth = useMemo(() => {
    if (typeof window === 'undefined') return 1000;
    return window.innerWidth;
  }, []);

  // Calculate constellation paths
  const constellationPaths = useMemo(
    () => chapters.slice(0, -1).map((_, i) => 
      getConstellationPath(i, expandedChapter, chapters, viewportWidth)
    ),
    [chapters, expandedChapter, viewportWidth]
  );

  // Memoize size calculations
  const sizes = useMemo(() => ({
    expanded: getExpandedContainerSize(),
    collapsed: getCollapsedSize()
  }), []);

  // Adjust star count for mobile
  const starCount = isMobile ? 10 : 15;

  // Stable callbacks
  const handleToggleChapter = useCallback((chapterId: number) => {
    onToggleChapter(chapterId);
  }, [onToggleChapter]);

  const handleSelectModule = useCallback((chapter: Chapter, module: Module) => {
    onSelectModule(chapter, module);
  }, [onSelectModule]);

  return (
    <div 
      className="relative min-h-screen py-12 sm:py-16 md:py-20 pb-20 sm:pb-32 md:pb-40 overflow-hidden"
      role="main"
      aria-label="Mapa de capítulos del curso"
    >
      {/* Ambient background */}
      <AmbientBackground isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />

      {/* Constellation lines */}
      <ConstellationLines paths={constellationPaths} prefersReducedMotion={prefersReducedMotion} />

      {/* Planet grid */}
      <nav 
        className="relative"
        aria-label="Capítulos del curso"
      >
        {chapters.map((chapter, index) => {
          const isExpanded = expandedChapter === chapter.id;
          const isLastChapter = index === chapters.length - 1;
          const containerHeight = isExpanded ? sizes.expanded : sizes.collapsed;
          
          return (
            <PlanetContainer
              key={chapter.id}
              chapter={chapter}
              index={index}
              isExpanded={isExpanded}
              isLastChapter={isLastChapter}
              containerHeight={containerHeight}
              onToggleChapter={handleToggleChapter}
              onSelectModule={handleSelectModule}
              completedModules={completedModules}
              prefersReducedMotion={prefersReducedMotion}
            />
          );
        })}
      </nav>

      {/* Ambient stars */}
      <AmbientStars 
        count={starCount} 
        isMobile={isMobile} 
        prefersReducedMotion={prefersReducedMotion}
      />

      <PlanetaryMapStyles />
    </div>
  );
});

PlanetaryMap.displayName = 'PlanetaryMap';

// ============================================================================
// STYLES COMPONENT
// ============================================================================

const PlanetaryMapStyles = React.memo(() => (
  <style>{`
    /* Optimize blur for mobile */
    @media (max-width: 768px) {
      [class*="blur-"] {
        filter: blur(40px) !important;
      }
    }

    /* Reduce motion support */
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
      [aria-hidden="true"] {
        opacity: 0.8 !important;
      }

      svg path {
        stroke-width: 2.5px !important;
      }
    }

    /* Focus visible */
    button:focus-visible,
    [role="button"]:focus-visible {
      outline: 3px solid rgba(168, 85, 247, 0.8);
      outline-offset: 4px;
    }

    /* Print styles */
    @media print {
      [aria-hidden="true"] {
        display: none !important;
      }

      nav {
        display: block !important;
      }

      .relative {
        position: static !important;
      }
    }

    /* Improve scrolling performance */
    @supports (scroll-behavior: smooth) {
      html {
        scroll-behavior: smooth;
      }
    }

    /* GPU acceleration hints */
    [class*="motion-"] {
      will-change: transform, opacity;
      transform: translateZ(0);
      backface-visibility: hidden;
    }
  `}</style>
));

PlanetaryMapStyles.displayName = 'PlanetaryMapStyles';