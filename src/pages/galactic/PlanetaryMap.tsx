import React, { useMemo, useCallback, useState, useEffect } from 'react';
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
// CONSTANTS - RESPONSIVE
// ============================================================================

const PLANET_CONSTANTS = {
  // Desktop
  DESKTOP: {
    ORBITAL_RADIUS: 220,
    SATELLITE_SIZE: 64,
    TOOLTIP_HEIGHT: 80,
    SAFETY_MARGIN: 20,
    PLANET_CORE_SIZE: 192,
  },
  // Mobile
  MOBILE: {
    ORBITAL_RADIUS: 160,
    SATELLITE_SIZE: 52,
    TOOLTIP_HEIGHT: 60,
    SAFETY_MARGIN: 15,
    PLANET_CORE_SIZE: 140,
  }
} as const;

const SPACING = {
  DESKTOP: {
    NORMAL: 600,
    EXPANDED: 100,
    COLLAPSED_PADDING: 100,
    LAST_MARGIN: 200,
  },
  MOBILE: {
    NORMAL: 400,
    EXPANDED: 80,
    COLLAPSED_PADDING: 60,
    LAST_MARGIN: 120,
  }
} as const;

const ANIMATION_CONFIG = {
  planet: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    getTransition: (index: number, reducedMotion: boolean, isMobile: boolean) => ({
      duration: reducedMotion ? 0.15 : (isMobile ? 0.3 : 0.5),
      delay: reducedMotion ? 0 : (isMobile ? index * 0.05 : index * 0.1),
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number]
    })
  },
  constellation: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 0.4 },
    getTransition: (index: number, reducedMotion: boolean, isMobile: boolean) => ({
      duration: reducedMotion ? 0.15 : (isMobile ? 0.6 : 1),
      delay: reducedMotion ? 0 : (isMobile ? index * 0.1 : index * 0.2),
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
      opacity: [0.15, 0.25, 0.15],
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
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.1, 1],
      baseDuration: 2
    }
  }
};

// ============================================================================
// UTILITY FUNCTIONS - RESPONSIVE
// ============================================================================

const getExpandedContainerSize = (isMobile: boolean): number => {
  const constants = isMobile ? PLANET_CONSTANTS.MOBILE : PLANET_CONSTANTS.DESKTOP;
  return (constants.ORBITAL_RADIUS + constants.SATELLITE_SIZE / 2 + constants.TOOLTIP_HEIGHT + constants.SAFETY_MARGIN) * 2;
};

const getCollapsedSize = (isMobile: boolean): number => {
  const constants = isMobile ? PLANET_CONSTANTS.MOBILE : PLANET_CONSTANTS.DESKTOP;
  const spacing = isMobile ? SPACING.MOBILE : SPACING.DESKTOP;
  return constants.PLANET_CORE_SIZE + spacing.COLLAPSED_PADDING;
};

const getConstellationPath = (
  index: number,
  expandedChapter: number | null,
  chapters: Chapter[],
  svgWidth: number,
  isMobile: boolean
): ConstellationPath => {
  const centerX = svgWidth / 2;
  const baseY = isMobile ? 150 : 250;
  
  const expandedSize = getExpandedContainerSize(isMobile);
  const collapsedSize = getCollapsedSize(isMobile);
  
  const spacing = isMobile ? SPACING.MOBILE : SPACING.DESKTOP;
  const normalSpacing = collapsedSize + spacing.NORMAL;
  const expandedSpacing = expandedSize + spacing.EXPANDED;
  
  let y1 = baseY;
  
  for (let i = 0; i < index; i++) {
    const isExpanded = expandedChapter === chapters[i].id;
    y1 += isExpanded ? expandedSpacing : normalSpacing;
  }
  
  const isCurrentExpanded = expandedChapter === chapters[index].id;
  const y2 = y1 + (isCurrentExpanded ? expandedSpacing : normalSpacing);
  
  const midY = (y1 + y2) / 2;
  const curveOffset = isMobile ? 25 : 40;
  
  return {
    y1,
    y2,
    path: `M ${centerX} ${y1} Q ${centerX} ${midY + curveOffset}, ${centerX} ${y2}`
  };
};

// ============================================================================
// CUSTOM HOOK: Mobile Detection
// ============================================================================

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    let timeoutId: number;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', debouncedCheck);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedCheck);
    };
  }, []);
  
  return isMobile;
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
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 lg:w-[500px] h-48 sm:h-64 md:h-96 lg:h-[500px] bg-purple-500/5 rounded-full blur-[40px] sm:blur-[60px] md:blur-[80px] lg:blur-[100px] opacity-20 sm:opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 lg:w-[500px] h-48 sm:h-64 md:h-96 lg:h-[500px] bg-cyan-500/5 rounded-full blur-[40px] sm:blur-[60px] md:blur-[80px] lg:blur-[100px] opacity-20 sm:opacity-30" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 lg:w-[500px] h-48 sm:h-64 md:h-96 lg:h-[500px] bg-purple-500/5 rounded-full blur-[40px] sm:blur-[60px] md:blur-[80px] lg:blur-[100px]"
        animate={{
          scale: config.scale,
          opacity: config.opacity
        }}
        transition={{ duration: config.duration, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 lg:w-[500px] h-48 sm:h-64 md:h-96 lg:h-[500px] bg-cyan-500/5 rounded-full blur-[40px] sm:blur-[60px] md:blur-[80px] lg:blur-[100px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: isMobile ? [0.25, 0.15, 0.25] : [0.5, 0.3, 0.5]
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
  isMobile: boolean;
  centerX: number;
}>(({ pathData, index, prefersReducedMotion, isMobile, centerX }) => {
  const lineTransition = ANIMATION_CONFIG.constellation.getTransition(index, prefersReducedMotion, isMobile);
  const circleDelay = prefersReducedMotion ? 0 : (isMobile ? index * 0.1 + 0.2 : index * 0.2 + 0.4);

  return (
    <g>
      <motion.path
        d={pathData.path}
        fill="none"
        stroke="url(#constellationGradient)"
        strokeWidth={isMobile ? "1" : "1.5"}
        strokeLinecap="round"
        strokeDasharray={isMobile ? "4 8" : "6 10"}
        filter="url(#constellationGlow)"
        initial={ANIMATION_CONFIG.constellation.initial}
        animate={ANIMATION_CONFIG.constellation.animate}
        transition={lineTransition}
      />
      
      <motion.circle
        cx={centerX}
        cy={pathData.y1}
        r={isMobile ? "2.5" : "3"}
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
  isMobile: boolean;
  centerX: number;
}>(({ paths, prefersReducedMotion, isMobile, centerX }) => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ filter: isMobile ? 'drop-shadow(0 0 2px rgba(168, 85, 247, 0.15))' : 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.2))' }}
    aria-hidden="true"
  >
    <ConstellationGradients />

    {paths.map((pathData, index) => (
      <ConstellationLine
        key={index}
        pathData={pathData}
        index={index}
        prefersReducedMotion={prefersReducedMotion}
        isMobile={isMobile}
        centerX={centerX}
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
        className={`absolute bg-white rounded-full ${isMobile ? 'w-0.5 h-0.5 opacity-15' : 'w-1 h-1 opacity-20'}`}
        style={style}
      />
    );
  }

  return (
    <motion.div
      className={`absolute bg-white rounded-full ${isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'}`}
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
  <div className={`absolute inset-0 pointer-events-none ${isMobile ? 'opacity-15' : 'opacity-20'}`} aria-hidden="true">
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
  marginBottom: number;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  completedModules: Set<number>;
  prefersReducedMotion: boolean;
  isMobile: boolean;
}>(({ 
  chapter, 
  index, 
  isExpanded, 
  isLastChapter,
  containerHeight,
  marginBottom,
  onToggleChapter,
  onSelectModule,
  completedModules,
  prefersReducedMotion,
  isMobile
}) => {
  const transition = ANIMATION_CONFIG.planet.getTransition(index, prefersReducedMotion, isMobile);

  const handleToggle = useCallback(() => {
    onToggleChapter(chapter.id);
  }, [onToggleChapter, chapter.id]);

  return (
    <motion.div
      initial={ANIMATION_CONFIG.planet.initial}
      animate={ANIMATION_CONFIG.planet.animate}
      transition={transition}
      className="flex items-center justify-center transition-all duration-500 ease-out"
      style={{
        minHeight: `${containerHeight}px`,
        marginBottom: `${marginBottom}px`
      }}
    >
      <div 
        style={{ zIndex: isExpanded ? 200 : 10 }} 
        className="relative w-full max-w-full px-2 sm:px-4"
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
  // Detect user preferences and viewport
  const prefersReducedMotion = useReducedMotion() || false;
  const isMobile = useIsMobile();
  
  // Get viewport width for constellation calculations
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1000
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    let timeoutId: number;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  // Calculate constellation paths with mobile support
  const constellationPaths = useMemo(
    () => chapters.slice(0, -1).map((_, i) => 
      getConstellationPath(i, expandedChapter, chapters, viewportWidth, isMobile)
    ),
    [chapters, expandedChapter, viewportWidth, isMobile]
  );

  // Memoize size calculations
  const sizes = useMemo(() => ({
    expanded: getExpandedContainerSize(isMobile),
    collapsed: getCollapsedSize(isMobile)
  }), [isMobile]);

  // Get spacing constants
  const spacing = isMobile ? SPACING.MOBILE : SPACING.DESKTOP;

  // Adjust star count for mobile
  const starCount = isMobile ? 8 : 15;

  // Center X for constellation lines
  const centerX = viewportWidth / 2;

  // Stable callbacks
  const handleToggleChapter = useCallback((chapterId: number) => {
    onToggleChapter(chapterId);
  }, [onToggleChapter]);

  const handleSelectModule = useCallback((chapter: Chapter, module: Module) => {
    onSelectModule(chapter, module);
  }, [onSelectModule]);

  return (
    <div 
      className="relative min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 pb-16 sm:pb-24 md:pb-32 lg:pb-40 overflow-x-hidden"
      role="main"
      aria-label="Mapa de capítulos del curso"
    >
      {/* Ambient background */}
      <AmbientBackground isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />

      {/* Constellation lines */}
      <ConstellationLines 
        paths={constellationPaths} 
        prefersReducedMotion={prefersReducedMotion}
        isMobile={isMobile}
        centerX={centerX}
      />

      {/* Planet grid */}
      <nav 
        className="relative px-2 sm:px-4"
        aria-label="Capítulos del curso"
      >
        {chapters.map((chapter, index) => {
          const isExpanded = expandedChapter === chapter.id;
          const isLastChapter = index === chapters.length - 1;
          const containerHeight = isExpanded ? sizes.expanded : sizes.collapsed;
          const marginBottom = isLastChapter ? spacing.LAST_MARGIN : spacing.NORMAL;
          
          return (
            <PlanetContainer
              key={chapter.id}
              chapter={chapter}
              index={index}
              isExpanded={isExpanded}
              isLastChapter={isLastChapter}
              containerHeight={containerHeight}
              marginBottom={marginBottom}
              onToggleChapter={handleToggleChapter}
              onSelectModule={handleSelectModule}
              completedModules={completedModules}
              prefersReducedMotion={prefersReducedMotion}
              isMobile={isMobile}
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
    /* Mobile optimizations */
    @media (max-width: 768px) {
      /* Reduce blur intensity for performance */
      [class*="blur-"] {
        filter: blur(30px) !important;
      }

      /* Optimize transforms */
      [class*="motion-"],
      [class*="animate-"] {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }

      /* Reduce SVG complexity */
      svg path {
        shape-rendering: optimizeSpeed;
      }

      /* Touch targets */
      button,
      [role="button"] {
        min-height: 44px;
        min-width: 44px;
      }
    }

    /* Tablet optimizations */
    @media (min-width: 768px) and (max-width: 1024px) {
      [class*="blur-"] {
        filter: blur(50px) !important;
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
        opacity: 0.9 !important;
      }

      svg path {
        stroke-width: 2.5px !important;
        opacity: 0.8 !important;
      }
    }

    /* Focus visible */
    button:focus-visible,
    [role="button"]:focus-visible {
      outline: 3px solid rgba(168, 85, 247, 0.8);
      outline-offset: 4px;
      border-radius: 8px;
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

      motion-div {
        opacity: 1 !important;
        transform: none !important;
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

    /* Safe area support for notched devices */
    @supports (padding: env(safe-area-inset-bottom)) {
      .safe-area-padding {
        padding-bottom: calc(env(safe-area-inset-bottom) + 1rem);
      }
    }

    /* Smooth font rendering on mobile */
    @media (max-width: 768px) {
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    /* Prevent text size adjustment on orientation change */
    html {
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      text-size-adjust: 100%;
    }

    /* Optimize scrolling on iOS */
    * {
      -webkit-overflow-scrolling: touch;
    }
  `}</style>
));

PlanetaryMapStyles.displayName = 'PlanetaryMapStyles';