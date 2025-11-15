// src/components/course/ui/ViewModeToggle.tsx
import React, { useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Map, List } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

type ViewMode = 'map' | 'list';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  /** Tamaño del toggle */
  size?: 'sm' | 'md' | 'lg';
  /** Desactiva el toggle */
  disabled?: boolean;
  className?: string;
}

interface ToggleOption {
  mode: ViewMode;
  label: string;
  icon: typeof Map;
  ariaLabel: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm',
  md: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
  lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg'
} as const;

const ICON_SIZES = {
  sm: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
  md: 'w-4 h-4 sm:w-5 sm:h-5',
  lg: 'w-5 h-5 sm:w-6 sm:h-6'
} as const;

const OPTIONS: ToggleOption[] = [
  { 
    mode: 'map', 
    label: 'Mapa', 
    icon: Map, 
    ariaLabel: 'Vista de mapa galáctico' 
  },
  { 
    mode: 'list', 
    label: 'Lista', 
    icon: List, 
    ariaLabel: 'Vista de lista de módulos' 
  }
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const ToggleButton = React.memo<{
  option: ToggleOption;
  isActive: boolean;
  disabled: boolean;
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  prefersReducedMotion: boolean;
}>(({ option, isActive, disabled, size, onClick, onKeyDown, prefersReducedMotion }) => {
  const { mode, label, icon: Icon, ariaLabel } = option;

  // Memoize button classes
  const buttonClasses = useMemo(() => {
    return [
      SIZE_CLASSES[size],
      'rounded-xl',
      'font-bold',
      'transition-all',
      'duration-300',
      'flex',
      'items-center',
      'justify-center',
      'gap-1.5 sm:gap-2',
      'focus:outline-none',
      'focus-visible:ring-4',
      'focus-visible:ring-purple-400/50',
      isActive 
        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30' 
        : 'text-gray-400 hover:text-white hover:bg-white/5',
      disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'cursor-pointer'
    ]
      .filter(Boolean)
      .join(' ');
  }, [size, isActive, disabled]);

  // Animation variants
  const buttonVariants = useMemo(() => {
    if (prefersReducedMotion || disabled) {
      return undefined;
    }

    return {
      hover: isActive ? {} : { scale: 1.05 },
      tap: isActive ? {} : { scale: 0.98 }
    };
  }, [prefersReducedMotion, disabled, isActive]);

  const ButtonComponent = prefersReducedMotion ? 'button' : motion.button;
  const motionProps = prefersReducedMotion ? {} : {
    whileHover: buttonVariants?.hover,
    whileTap: buttonVariants?.tap
  };

  return (
    <ButtonComponent
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className={buttonClasses}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      aria-disabled={disabled}
      type="button"
      {...motionProps}
    >
      <Icon 
        className={ICON_SIZES[size]} 
        aria-hidden="true"
        strokeWidth={2.5}
      />
      <span className="hidden sm:inline">{label}</span>
    </ButtonComponent>
  );
});
ToggleButton.displayName = 'ToggleButton';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ViewModeToggle = React.memo<ViewModeToggleProps>(({ 
  viewMode, 
  setViewMode,
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion() || false;

  // Memoize container classes
  const containerClasses = useMemo(() => {
    return [
      'glass-panel',
      'holographic',
      'rounded-xl sm:rounded-2xl',
      'p-1.5 sm:p-2',
      'flex',
      'gap-1.5 sm:gap-2',
      'w-fit',
      className
    ]
      .filter(Boolean)
      .join(' ');
  }, [className]);

  // Memoized handlers
  const handleModeChange = useCallback((mode: ViewMode) => {
    if (!disabled && mode !== viewMode) {
      setViewMode(mode);
    }
  }, [disabled, viewMode, setViewMode]);

  const createKeyDownHandler = useCallback((mode: ViewMode) => {
    return (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled && mode !== viewMode) {
        e.preventDefault();
        handleModeChange(mode);
      }
    };
  }, [disabled, viewMode, handleModeChange]);

  return (
    <div 
      className={containerClasses}
      role="group"
      aria-label="Selector de modo de visualización"
    >
      {OPTIONS.map((option) => {
        const isActive = viewMode === option.mode;
        
        return (
          <ToggleButton
            key={option.mode}
            option={option}
            isActive={isActive}
            disabled={disabled}
            size={size}
            onClick={() => handleModeChange(option.mode)}
            onKeyDown={createKeyDownHandler(option.mode)}
            prefersReducedMotion={prefersReducedMotion}
          />
        );
      })}
    </div>
  );
});

ViewModeToggle.displayName = 'ViewModeToggle';