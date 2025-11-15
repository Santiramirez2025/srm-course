// src/components/course/ui/EnergyBar.tsx
import React, { memo, useMemo } from 'react';
import { motion, type Transition } from 'framer-motion';

interface EnergyBarProps {
  label: string;
  value: number;
  max: number;
  color?: 'purple' | 'yellow' | 'blue' | 'green' | 'red';
  /** Altura de la barra */
  height?: 'sm' | 'md' | 'lg';
  /** Muestra porcentaje en lugar de valores */
  showPercentage?: boolean;
  /** Desactiva animaciones */
  disableAnimation?: boolean;
  /** Callback cuando la barra está llena */
  onFull?: () => void;
  className?: string;
}

const colorGradients = {
  purple: 'from-purple-500 to-fuchsia-500',
  yellow: 'from-yellow-400 to-orange-500',
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  red: 'from-red-500 to-rose-600'
} as const;

const heightClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4'
} as const;

const barTransition: Transition = {
  duration: 1,
  ease: 'easeOut'
};

export const EnergyBar = memo<EnergyBarProps>(({ 
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
  const percentage = useMemo(() => {
    const calc = Math.max(0, Math.min((value / max) * 100, 100));
    return isNaN(calc) ? 0 : calc;
  }, [value, max]);

  const isFull = percentage === 100;
  
  // Trigger callback cuando está llena
  React.useEffect(() => {
    if (isFull && onFull) {
      onFull();
    }
  }, [isFull, onFull]);

  const displayValue = showPercentage 
    ? `${Math.round(percentage)}%`
    : `${value} / ${max}`;

  const BarWrapper = disableAnimation ? 'div' : motion.div;
  const barProps = disableAnimation 
    ? { style: { width: `${percentage}%` } }
    : {
        initial: { width: 0 },
        animate: { width: `${percentage}%` },
        transition: barTransition
      };

  return (
    <div className={className} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <div className="flex justify-between items-baseline text-sm mb-2 gap-2">
        <span className="text-gray-400 font-bold truncate" title={label}>
          {label}
        </span>
        <span className="text-white font-bold tabular-nums whitespace-nowrap">
          {displayValue}
        </span>
      </div>
      
      <div className={`
        relative 
        ${heightClasses[height]} 
        bg-white/10 
        rounded-full 
        overflow-hidden
        ${isFull ? 'shadow-lg shadow-current' : ''}
      `.trim().replace(/\s+/g, ' ')}>
        <BarWrapper
          {...barProps}
          className={`
            h-full 
            bg-gradient-to-r ${colorGradients[color]} 
            rounded-full
            ${isFull ? 'animate-pulse' : ''}
          `.trim().replace(/\s+/g, ' ')}
        />
      </div>
    </div>
  );
});

EnergyBar.displayName = 'EnergyBar';