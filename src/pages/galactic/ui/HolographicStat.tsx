// src/components/course/ui/HolographicStat.tsx
import React, { memo } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface HolographicStatProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  /** Variante de color del gradiente */
  variant?: 'purple' | 'blue' | 'green' | 'orange';
  /** Desactiva animaciones */
  disableAnimation?: boolean;
  /** Callback al hacer click */
  onClick?: () => void;
  /** Clase CSS adicional */
  className?: string;
}

const gradientVariants = {
  purple: 'from-purple-500 to-cyan-500',
  blue: 'from-blue-500 to-indigo-600',
  green: 'from-green-500 to-emerald-600',
  orange: 'from-orange-500 to-pink-600'
} as const;

const animationVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.05, 
    y: -5,
    transition: { 
      type: 'spring', 
      stiffness: 400, 
      damping: 17 
    }
  }
};

export const HolographicStat = memo<HolographicStatProps>(({ 
  icon: Icon, 
  value, 
  label,
  variant = 'purple',
  disableAnimation = false,
  onClick,
  className = ''
}) => {
  const MotionWrapper = disableAnimation ? 'div' : motion.div;
  const motionProps = disableAnimation ? {} : {
    variants: animationVariants,
    initial: 'initial',
    whileHover: 'hover'
  };

  const isInteractive = !!onClick;

  return (
    <MotionWrapper
      {...motionProps}
      onClick={onClick}
      className={`
        glass-panel 
        holographic 
        rounded-2xl 
        p-6 
        min-w-[140px]
        ${isInteractive ? 'cursor-pointer' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role={isInteractive ? 'button' : 'article'}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={`${label}: ${value}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div 
          className={`
            w-12 h-12 
            bg-gradient-to-br ${gradientVariants[variant]}
            rounded-xl 
            flex items-center justify-center 
            shadow-lg
          `.trim().replace(/\s+/g, ' ')}
          aria-hidden="true"
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <span className="text-4xl font-black text-white tabular-nums">
          {value}
        </span>
        
        <span className="text-sm text-gray-400 font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>
    </MotionWrapper>
  );
});

HolographicStat.displayName = 'HolographicStat';