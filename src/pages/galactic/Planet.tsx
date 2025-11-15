import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock } from 'lucide-react';
import { Chapter, Module } from '@data/types';

interface PlanetProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
  completedModules: Set<number>;
  index: number;
}

const PLANET_THEMES = [
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

const ANIMATIONS = {
  glow: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.4, 0.3]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const
    }
  },
  ripple: {
    hover: {
      scale: 1.8,
      opacity: [0, 0.6, 0]
    },
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

export const Planet: React.FC<PlanetProps> = ({ 
  chapter, 
  isExpanded, 
  onToggle, 
  onSelectModule, 
  completedModules, 
  index 
}) => {
  const completedCount = chapter.modules.filter(m => completedModules.has(m.id)).length;
  const progress = (completedCount / chapter.modules.length) * 100;
  const theme = PLANET_THEMES[index % PLANET_THEMES.length];
  const circumference = 2 * Math.PI * 88;

  // CONSTANTES PARA EL CÁLCULO DEL TAMAÑO
  const ORBITAL_RADIUS = 220;
  const SATELLITE_SIZE = 64;
  const TOOLTIP_HEIGHT = 80;
  const SAFETY_MARGIN = 20;
  const CONTAINER_SIZE = (ORBITAL_RADIUS + SATELLITE_SIZE / 2 + TOOLTIP_HEIGHT + SAFETY_MARGIN) * 2;

  const getOrbitalPosition = (moduleIndex: number, total: number) => {
    const angle = (moduleIndex / total) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * ORBITAL_RADIUS,
      y: Math.sin(angle) * ORBITAL_RADIUS
    };
  };

  return (
    <div 
      className="relative" 
      style={{ 
        width: `${CONTAINER_SIZE}px`, 
        height: `${CONTAINER_SIZE}px`,
        overflow: 'visible'
      }}
    >
      
      {/* Planet Core Button */}
      <button
        onClick={onToggle}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 rounded-full cursor-pointer"
        style={{ zIndex: 20 }}
        aria-label={`${chapter.title} - ${completedCount} de ${chapter.modules.length} completados`}
        aria-expanded={isExpanded}
      >
        
        {/* Ambient Glow Layer */}
        <motion.div 
          className={`absolute -inset-10 bg-gradient-to-r ${theme.gradient} rounded-full blur-3xl`}
          animate={ANIMATIONS.glow.animate}
          transition={ANIMATIONS.glow.transition}
        />
        
        {/* Hover Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/60"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={ANIMATIONS.ripple.hover}
          transition={ANIMATIONS.ripple.transition}
        />

        {/* Planet Sphere */}
        <motion.div 
          className={`relative w-48 h-48 bg-gradient-to-br ${theme.gradient} rounded-full shadow-2xl overflow-hidden`}
          style={{ 
            boxShadow: `0 20px 60px ${theme.glow}, 0 0 40px ${theme.glow}` 
          }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          
          {/* Holographic Shine */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-white/30 via-white/10 to-transparent"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            style={{ backgroundSize: '200% 200%' }}
          />
          
          {/* Progress Ring SVG */}
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
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }}
            />
          </svg>

          {/* Planet Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
            <motion.span 
              className="text-2xl font-black tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {chapter.id}
            </motion.span>
            
            <motion.span 
              className="text-sm font-bold mt-2 leading-tight line-clamp-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {chapter.title}
            </motion.span>
            
            <motion.div 
              className="mt-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs font-bold">
                {completedCount}/{chapter.modules.length}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </button>

      {/* Orbital Ring and Satellites */}
      <AnimatePresence>
        {isExpanded && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ pointerEvents: 'none' }}
          >
            {/* Orbital Path Ring */}
            <motion.svg 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
              width="440" 
              height="440"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
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

            {/* Module Satellites */}
            {chapter.modules.map((module, moduleIndex) => {
              const pos = getOrbitalPosition(moduleIndex, chapter.modules.length);
              const isCompleted = completedModules.has(module.id);
              const centerOffset = CONTAINER_SIZE / 2;
              
              return (
                <motion.button
                  key={module.id}
                  onClick={() => onSelectModule(chapter, module)}
                  className="absolute group z-30"
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
                  transition={{
                    delay: moduleIndex * 0.08,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`${module.title} - ${isCompleted ? 'Completado' : 'Bloqueado'}`}
                >
                  
                  {/* Satellite Glow */}
                  <div 
                    className="absolute inset-0 rounded-full blur-lg -z-10"
                    style={{
                      backgroundColor: isCompleted ? 'rgba(34, 197, 94, 0.5)' : 'rgba(107, 114, 128, 0.4)',
                    }}
                  />

                  {/* Satellite Body */}
                  <div className={`
                    relative w-16 h-16 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isCompleted 
                      ? 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-green-500/60' 
                      : 'bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg shadow-gray-700/60'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
                    ) : (
                      <Lock className="w-6 h-6 text-white/80" strokeWidth={2} />
                    )}
                    
                    {/* Completion Pulse */}
                    {isCompleted && (
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
                      />
                    )}
                  </div>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 -top-20 opacity-0 group-hover:opacity-100 pointer-events-none"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/10 shadow-2xl whitespace-nowrap">
                      <p className="text-sm font-bold text-white">{module.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {isCompleted ? '✓ Completado' : '🔒 Bloqueado'}
                      </p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-white/10" />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};