// src/pages/galactic/PlanetaryMap.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Planet } from './Planet';
import { Chapter, Module } from '@data/types';

interface PlanetaryMapProps {
  chapters: Chapter[];
  expandedChapter: number | null;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  completedModules: Set<number>;
}

// Constantes que deben coincidir con Planet.tsx
const PLANET_CONSTANTS = {
  ORBITAL_RADIUS: 220,
  SATELLITE_SIZE: 64,
  TOOLTIP_HEIGHT: 80,
  SAFETY_MARGIN: 20,
  PLANET_CORE_SIZE: 192, // w-48 h-48 = 192px
} as const;

// Calcular el tamaño total del contenedor expandido
const getExpandedContainerSize = () => {
  const { ORBITAL_RADIUS, SATELLITE_SIZE, TOOLTIP_HEIGHT, SAFETY_MARGIN } = PLANET_CONSTANTS;
  return (ORBITAL_RADIUS + SATELLITE_SIZE / 2 + TOOLTIP_HEIGHT + SAFETY_MARGIN) * 2;
};

// Animaciones suavizadas
const ANIMATION = {
  planet: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: (index: number) => ({
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.34, 1.56, 0.64, 1] as const
    })
  },
  constellation: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 0.4 },
    transition: (index: number) => ({
      duration: 1,
      delay: index * 0.2,
      ease: "easeInOut" as const
    })
  }
} as const;

// Cálculo de posiciones de constelación
const getConstellationPath = (
  index: number, 
  expandedChapter: number | null, 
  chapters: Chapter[], 
  svgWidth: number = 1000
) => {
  const centerX = svgWidth / 2;
  const baseY = 250;
  
  // Usar el tamaño calculado dinámicamente
  const expandedSize = getExpandedContainerSize();
  const collapsedSize = PLANET_CONSTANTS.PLANET_CORE_SIZE + 100; // planeta + padding
  
  const normalSpacing = collapsedSize + 600; // espacio entre planetas colapsados
  const expandedSpacing = expandedSize + 100; // espacio cuando está expandido
  
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

export const PlanetaryMap: React.FC<PlanetaryMapProps> = ({
  chapters,
  expandedChapter,
  onToggleChapter,
  onSelectModule,
  completedModules
}) => {
  const constellationPaths = useMemo(
    () => chapters.slice(0, -1).map((_, i) => getConstellationPath(i, expandedChapter, chapters, window.innerWidth)),
    [chapters.length, expandedChapter]
  );

  // Calcular alturas dinámicas
  const expandedSize = getExpandedContainerSize();
  const collapsedSize = PLANET_CONSTANTS.PLANET_CORE_SIZE + 100;

  return (
    <div className="relative min-h-screen py-20 pb-40 overflow-hidden">
      
      {/* Fondo espacial sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Líneas de constelación */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.2))' }}
      >
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

        {constellationPaths.map((pathData, index) => (
          <g key={index}>
            <motion.path
              d={pathData.path}
              fill="none"
              stroke="url(#constellationGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="6 10"
              filter="url(#constellationGlow)"
              initial={ANIMATION.constellation.initial}
              animate={ANIMATION.constellation.animate}
              transition={ANIMATION.constellation.transition(index)}
            />
            
            <motion.circle
              cx={500}
              cy={pathData.y1}
              r="3"
              fill="#a855f7"
              opacity="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.4, duration: 0.3 }}
            />
          </g>
        ))}
      </svg>

      {/* Grid de planetas */}
      <div className="relative">
        {chapters.map((chapter, index) => {
          const isExpanded = expandedChapter === chapter.id;
          
          // Altura dinámica basada en si está expandido o no
          const containerHeight = isExpanded ? expandedSize : collapsedSize;
          const marginBottom = index < chapters.length - 1 ? 600 : 200;
          
          return (
            <motion.div
              key={chapter.id}
              initial={ANIMATION.planet.initial}
              animate={ANIMATION.planet.animate}
              transition={ANIMATION.planet.transition(index)}
              className="flex items-center justify-center transition-all duration-500"
              style={{
                minHeight: `${containerHeight}px`,
                marginBottom: `${marginBottom}px`
              }}
            >
              <div style={{ zIndex: isExpanded ? 200 : 10 }} className="relative">
                <Planet
                  chapter={chapter}
                  isExpanded={isExpanded}
                  onToggle={() => onToggleChapter(chapter.id)}
                  onSelectModule={onSelectModule}
                  completedModules={completedModules}
                  index={index}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Estrellas ambiente sutiles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
    </div>
  );
};