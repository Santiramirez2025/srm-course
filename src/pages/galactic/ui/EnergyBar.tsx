// src/components/course/ui/EnergyBar.tsx
import React, { useMemo, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

interface EnergyBarProps {
  label: string;
  value: number;
  max: number;
  color?: 'purple' | 'yellow' | 'blue' | 'green' | 'red';
  /** Altura de la barra */
  height?: 'sm' | 'md' | 'lg';
  /** Muestra porcentaje en lugar de valores */
  showPercentage?: boolean;
  /** Desactiva animaciones manualmente */
  disableAnimation?: boolean;
  /** Callback cuando la barra está llena */
  onFull?: () => void;
  className?: string;
}

type ColorKey = 'purple' | 'yellow' | 'blue' | 'green' | 'red';

// ============================================================================
// CONSTANTS
// ============================================================================

const COLOR_GRADIENTS: Record<ColorKey, string> = {
  purple: 'from-purple-500 to-fuchsia-500',
  yellow: 'from-yellow-400 to-orange-500',
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  red: 'from-red-500 to-rose-600'
} as const;

const COLOR_GLOWS: Record<ColorKey, string> = {
  purple: 'shadow-purple-500/50',
  yellow: 'shadow-yellow-500/50',
  blue: 'shadow-blue-500/50',
  green: 'shadow-green-500/50',
  red: 'shadow-red-500/50'
} as const;

const HEIGHT_CLASSES = {
  sm: 'h-1.5 sm:h-2',
  md: 'h-2 sm:h-3',
  lg: 'h-3 sm:h-4'
} as const;

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const BarLabel = React.memo<{ 
  label: string; 
  displayValue: string;
}>(({ label, displayValue }) => (
  <div className="flex justify-between items-baseline text-xs sm:text-sm mb-1.5 sm:mb-2 gap-2">
    <span 
      className="text-gray-400 font-bold truncate" 
      title={label}
    >
      {label}
    </span>
    <span className="text-white font-bold tabular-nums whitespace-nowrap flex-shrink-0">
      {displayValue}
    </span>
  </div>
));
BarLabel.displayName = 'BarLabel';

const FullBarGlow = React.memo<{ 
  color: ColorKey;
  reducedMotion: boolean;
}>(({ color, reducedMotion }) => {
  if (reducedMotion) {
    return null;
  }

  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r ${COLOR_GRADIENTS[color]} rounded-full opacity-50`}
      animate={{
        scale: [1, 1.05, 1] as number[],
        opacity: [0.3, 0.5, 0.3] as number[]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }}
      aria-hidden="true"
    />
  );
});
FullBarGlow.displayName = 'FullBarGlow';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const EnergyBar = React.memo<EnergyBarProps>(({ 
  label, 
  value, 
  max,
  color = 'purple',
  height = 'md',
  showPercentage = false,
  disableAnimation = false,
  onFull,
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion() || false;
  const shouldAnimate = !disableAnimation && !prefersReducedMotion;

  // Calculate percentage
  const percentage = useMemo(() => {
    if (max <= 0) return 0;
    const calc = Math.max(0, Math.min((value / max) * 100, 100));
    return isNaN(calc) ? 0 : calc;
  }, [value, max]);

  const isFull = percentage === 100;

  // Display value
  const displayValue = useMemo(() => {
    return showPercentage 
      ? `${Math.round(percentage)}%`
      : `${value} / ${max}`;
  }, [showPercentage, percentage, value, max]);

  // Bar transition
  const barTransition = useMemo<Transition>(() => {
    if (!shouldAnimate) {
      return { duration: 0 };
    }
    return {
      duration: prefersReducedMotion ? 0.5 : 1,
      ease: "easeOut" as const
    };
  }, [shouldAnimate, prefersReducedMotion]);

  // Container classes
  const containerClasses = useMemo(() => {
    return [
      'relative',
      HEIGHT_CLASSES[height],
      'bg-white/10',
      'rounded-full',
      'overflow-hidden',
      isFull && shouldAnimate ? `shadow-lg ${COLOR_GLOWS[color]}` : ''
    ]
      .filter(Boolean)
      .join(' ');
  }, [height, isFull, shouldAnimate, color]);

  // Bar classes
  const barClasses = useMemo(() => {
    return [
      'h-full',
      `bg-gradient-to-r ${COLOR_GRADIENTS[color]}`,
      'rounded-full',
      'relative'
    ].join(' ');
  }, [color]);

  // Trigger onFull callback (with stability)
  const handleFull = useCallback(() => {
    if (isFull && onFull) {
      onFull();
    }
  }, [isFull, onFull]);

  useEffect(() => {
    handleFull();
  }, [handleFull]);

  // Render bar with or without animation
  const BarElement = shouldAnimate ? motion.div : 'div';
  const barProps = shouldAnimate
    ? {
        initial: { width: 0 },
        animate: { width: `${percentage}%` },
        transition: barTransition
      }
    : { 
        style: { width: `${percentage}%` } 
      };

  return (
    <div 
      className={className}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`${label}: ${displayValue}`}
      aria-live="polite"
    >
      {/* Label and value */}
      <BarLabel label={label} displayValue={displayValue} />
      
      {/* Bar container */}
      <div className={containerClasses}>
        {/* Bar fill */}
        <BarElement
          {...barProps}
          className={barClasses}
        >
          {/* Full bar glow effect */}
          {isFull && shouldAnimate && (
            <FullBarGlow color={color} reducedMotion={prefersReducedMotion} />
          )}
        </BarElement>
      </div>
    </div>
  );
});

EnergyBar.displayName = 'EnergyBar';