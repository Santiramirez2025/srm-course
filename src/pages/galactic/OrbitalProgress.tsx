// src/components/course/galactic/OrbitalProgress.tsx
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface OrbitalProgressProps {
  percentage: number;
  completed: number;
  total: number;
  size?: 'small' | 'large';
}

interface SizeConfig {
  container: number;
  radius: number;
  center: number;
  stroke: number;
}

const SIZE_CONFIGS: Record<'small' | 'large', SizeConfig> = {
  large: { container: 240, radius: 90, center: 120, stroke: 8 },
  small: { container: 120, radius: 50, center: 60, stroke: 6 }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const BackgroundGlow = React.memo<{ config: SizeConfig }>(({ config }) => (
  <div 
    className="absolute inset-0 rounded-full opacity-20 blur-3xl"
    style={{
      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)'
    }}
    aria-hidden="true"
  />
));
BackgroundGlow.displayName = 'BackgroundGlow';

const ProgressRing = React.memo<{
  config: SizeConfig;
  circumference: number;
  offset: number;
  prefersReducedMotion: boolean;
}>(({ config, circumference, offset, prefersReducedMotion }) => {
  const duration = prefersReducedMotion ? 0.5 : 1.2;
  const easing = prefersReducedMotion 
    ? "easeOut" as const
    : [0.34, 1.56, 0.64, 1] as [number, number, number, number];

  return (
    <svg 
      className="w-full h-full -rotate-90"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Background track */}
      <circle
        cx={config.center}
        cy={config.center}
        r={config.radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth={config.stroke}
      />
      
      {/* Progress bar */}
      <motion.circle
        cx={config.center}
        cy={config.center}
        r={config.radius}
        fill="none"
        stroke="url(#progressGradient)"
        strokeWidth={config.stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration, ease: easing }}
        style={{
          filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))'
        }}
      />
    </svg>
  );
});
ProgressRing.displayName = 'ProgressRing';

const CentralContent = React.memo<{
  percentage: number;
  completed: number;
  total: number;
  isLarge: boolean;
  prefersReducedMotion: boolean;
}>(({ percentage, completed, total, isLarge, prefersReducedMotion }) => {
  const delay = prefersReducedMotion ? 0 : 0.3;
  const duration = prefersReducedMotion ? 0.2 : 0.5;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration }}
        className="text-center px-2"
      >
        <span
          className={`
            font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent
            ${isLarge ? 'text-4xl sm:text-5xl' : 'text-xl sm:text-2xl'}
          `}
          aria-label={`${percentage} por ciento completado`}
        >
          {percentage}%
        </span>
        
        {isLarge && (
          <p 
            className="text-xs font-medium text-gray-500 mt-2 tracking-wider"
            aria-label={`${completed} de ${total} módulos completados`}
          >
            {completed} de {total} completados
          </p>
        )}
      </motion.div>
    </div>
  );
});
CentralContent.displayName = 'CentralContent';

const ProgressIndicator = React.memo<{
  percentage: number;
  config: SizeConfig;
  prefersReducedMotion: boolean;
}>(({ percentage, config, prefersReducedMotion }) => {
  // Calculate position based on percentage
  const angle = (percentage / 100) * Math.PI * 2 - Math.PI / 2;
  const x = Math.cos(angle) * config.radius;
  const y = Math.sin(angle) * config.radius;

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute w-3 h-3 bg-white rounded-full shadow-lg opacity-80"
        style={{
          top: '50%',
          left: '50%',
          marginTop: -6,
          marginLeft: -6,
          transform: `translate(${x}px, ${y}px)`
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
      style={{
        top: '50%',
        left: '50%',
        marginTop: -6,
        marginLeft: -6,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.6, 1, 0.6] as number[],
        x,
        y,
      }}
      transition={{
        opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
        x: { duration: 0.8, ease: "easeOut" as const },
        y: { duration: 0.8, ease: "easeOut" as const }
      }}
      aria-hidden="true"
    />
  );
});
ProgressIndicator.displayName = 'ProgressIndicator';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const OrbitalProgress: React.FC<OrbitalProgressProps> = React.memo(({
  percentage,
  completed,
  total,
  size = 'large'
}) => {
  const prefersReducedMotion = useReducedMotion() || false;
  const isLarge = size === 'large';
  
  // Memoize configuration based on size
  const config = useMemo(() => SIZE_CONFIGS[size], [size]);
  
  // Memoize calculations
  const { circumference, offset } = useMemo(() => {
    const circ = 2 * Math.PI * config.radius;
    return {
      circumference: circ,
      offset: circ * (1 - percentage / 100)
    };
  }, [config.radius, percentage]);

  // Show indicator only for large size and when there's progress
  const showIndicator = isLarge && percentage > 0;

  return (
    <div 
      className="relative"
      style={{ width: config.container, height: config.container }}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progreso del curso: ${percentage}% completado, ${completed} de ${total} módulos`}
    >
      {/* Background glow (only for large) */}
      {isLarge && <BackgroundGlow config={config} />}
      
      {/* Progress Ring */}
      <ProgressRing 
        config={config}
        circumference={circumference}
        offset={offset}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Central Content */}
      <CentralContent
        percentage={percentage}
        completed={completed}
        total={total}
        isLarge={isLarge}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Progress Indicator Dot */}
      {showIndicator && (
        <ProgressIndicator
          percentage={percentage}
          config={config}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
    </div>
  );
});

OrbitalProgress.displayName = 'OrbitalProgress';