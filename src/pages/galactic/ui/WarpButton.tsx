// src/components/course/ui/WarpButton.tsx
import React, { useMemo, useCallback } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface WarpButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
  /** Etiqueta para accesibilidad */
  ariaLabel?: string;
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg';
  /** Desactiva animaciones manualmente */
  disableAnimation?: boolean;
  className?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SIZE_CLASSES = {
  sm: 'w-9 h-9 sm:w-10 sm:h-10',
  md: 'w-12 h-12 sm:w-14 sm:h-14',
  lg: 'w-14 h-14 sm:w-16 sm:h-16'
} as const;

const ICON_SIZES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5 sm:w-6 sm:h-6',
  lg: 'w-7 h-7 sm:w-8 sm:h-8'
} as const;

const DEFAULT_LABELS = {
  prev: 'Módulo anterior',
  next: 'Módulo siguiente'
} as const;

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const createButtonVariants = (reducedMotion: boolean): Variants => {
  if (reducedMotion) {
    return {
      idle: { scale: 1 },
      hover: { scale: 1 },
      tap: { scale: 1 }
    };
  }

  return {
    idle: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };
};

const createPulseVariants = (reducedMotion: boolean): Variants => {
  if (reducedMotion) {
    return {
      animate: { scale: 1, opacity: 0 }
    };
  }

  return {
    animate: {
      scale: [1, 1.5] as number[],
      opacity: [0.5, 0] as number[],
    }
  };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const PulseEffect = React.memo<{ reducedMotion: boolean }>(({ reducedMotion }) => {
  const variants = useMemo(() => createPulseVariants(reducedMotion), [reducedMotion]);
  
  if (reducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
      variants={variants}
      animate="animate"
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut" as const
      }}
      aria-hidden="true"
    />
  );
});
PulseEffect.displayName = 'PulseEffect';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const WarpButton = React.memo<WarpButtonProps>(({ 
  direction, 
  onClick, 
  disabled = false,
  ariaLabel,
  size = 'md',
  disableAnimation = false,
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion() || false;
  const shouldAnimate = !disabled && !disableAnimation && !prefersReducedMotion;

  // Memoize icon component
  const Icon = useMemo(
    () => direction === 'prev' ? ChevronLeft : ChevronRight,
    [direction]
  );

  // Memoize default label
  const defaultLabel = useMemo(
    () => DEFAULT_LABELS[direction],
    [direction]
  );

  // Memoize animation variants
  const buttonVariants = useMemo(
    () => shouldAnimate ? createButtonVariants(false) : undefined,
    [shouldAnimate]
  );

  // Memoize button classes
  const buttonClasses = useMemo(() => {
    return [
      'relative',
      SIZE_CLASSES[size],
      'rounded-full',
      'flex items-center justify-center',
      'transition-all duration-300',
      'focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-400/50',
      disabled 
        ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed opacity-50' 
        : 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white hover:shadow-xl hover:shadow-purple-500/40',
      className
    ]
      .filter(Boolean)
      .join(' ');
  }, [size, disabled, className]);

  // Memoize handlers
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick();
    }
  }, [disabled, onClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <motion.button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      variants={buttonVariants}
      initial="idle"
      whileHover={shouldAnimate ? "hover" : undefined}
      whileTap={shouldAnimate ? "tap" : undefined}
      className={buttonClasses}
      aria-label={ariaLabel || defaultLabel}
      aria-disabled={disabled}
      type="button"
    >
      {/* Pulse Effect */}
      {shouldAnimate && (
        <PulseEffect reducedMotion={prefersReducedMotion} />
      )}

      {/* Icon */}
      <Icon 
        className={ICON_SIZES[size]} 
        aria-hidden="true"
        strokeWidth={2.5}
      />
    </motion.button>
  );
});

WarpButton.displayName = 'WarpButton';