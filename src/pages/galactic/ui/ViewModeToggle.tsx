// src/components/course/ui/ViewModeToggle.tsx
import React, { memo, useCallback } from 'react';
import { Map, List } from 'lucide-react';

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

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
} as const;

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
} as const;

interface ToggleOption {
  mode: ViewMode;
  label: string;
  icon: typeof Map;
  ariaLabel: string;
}

const options: ToggleOption[] = [
  { mode: 'map', label: 'Vista Mapa', icon: Map, ariaLabel: 'Cambiar a vista de mapa' },
  { mode: 'list', label: 'Vista Lista', icon: List, ariaLabel: 'Cambiar a vista de lista' }
];

export const ViewModeToggle = memo<ViewModeToggleProps>(({ 
  viewMode, 
  setViewMode,
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const handleModeChange = useCallback((mode: ViewMode) => {
    if (!disabled && mode !== viewMode) {
      setViewMode(mode);
    }
  }, [disabled, viewMode, setViewMode]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, mode: ViewMode) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleModeChange(mode);
    }
  }, [disabled, handleModeChange]);

  return (
    <div 
      className={`glass-panel holographic rounded-2xl p-2 flex gap-2 ${className}`}
      role="group"
      aria-label="Selector de vista"
    >
      {options.map(({ mode, label, icon: Icon, ariaLabel }) => {
        const isActive = viewMode === mode;
        
        return (
          <button
            key={mode}
            onClick={() => handleModeChange(mode)}
            onKeyDown={(e) => handleKeyDown(e, mode)}
            disabled={disabled}
            className={`
              ${sizeClasses[size]}
              rounded-xl 
              font-bold 
              transition-all 
              duration-300
              flex 
              items-center 
              gap-2
              ${isActive 
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `.trim().replace(/\s+/g, ' ')}
            aria-label={ariaLabel}
            aria-pressed={isActive}
            aria-disabled={disabled}
            type="button"
          >
            <Icon className={iconSizes[size]} aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
});

ViewModeToggle.displayName = 'ViewModeToggle';