// src/components/course/ui/WarpButton.tsx
import React, { memo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WarpButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
  /** Etiqueta para accesibilidad */
  ariaLabel?: string;
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg';
  /** Desactiva animaciones */
  disableAnimation?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-16 h-16'
} as const;

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
} as const;

const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 }
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.5],
    opacity: [0.5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeOut'
    }
  }
};

export const WarpButton = memo<WarpButtonProps>(({ 
  direction, 
  onClick, 
  disabled = false,
  ariaLabel,
  size = 'md',
  disableAnimation = false,
  className = ''
}) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const defaultLabel = direction === 'prev' ? 'Anterior' : 'Siguiente';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      variants={!disabled && !disableAnimation ? buttonVariants : undefined}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      className={`
        relative
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center
        transition-all duration-300
        ${disabled 
          ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed' 
          : 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-purple-500/50'
        }
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      aria-label={ariaLabel || defaultLabel}
      aria-disabled={disabled}
      type="button"
    >
      {!disabled && !disableAnimation && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
          variants={pulseVariants}
          animate="animate"
        />
      )}
      <Icon className={iconSizes[size]} aria-hidden="true" />
    </motion.button>
  );
});

WarpButton.displayName = 'WarpButton';