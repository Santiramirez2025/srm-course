// src/components/course/ui/HolographicPanel.tsx
import React, { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

interface HolographicPanelProps {
  children: React.ReactNode;
  className?: string;
  /** Variant del efecto holográfico */
  variant?: 'default' | 'subtle' | 'intense';
  /** Desactiva animaciones para mejor rendimiento */
  static?: boolean;
  /** Etiqueta ARIA personalizada para el panel */
  ariaLabel?: string;
  /** Rol ARIA personalizado */
  role?: React.AriaRole;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const VARIANT_CLASSES: Record<'default' | 'subtle' | 'intense', string> = {
  default: 'holographic',
  subtle: 'holographic opacity-60',
  intense: 'holographic brightness-110'
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const HolographicPanel = React.memo<HolographicPanelProps>(({ 
  children, 
  className = '',
  variant = 'default',
  static: isStatic = false,
  ariaLabel = 'Panel holográfico',
  role = 'region'
}) => {
  const prefersReducedMotion = useReducedMotion() || false;
  
  // Compute classes only when dependencies change
  const panelClasses = useMemo(() => {
    const variantClass = VARIANT_CLASSES[variant];
    const animationClass = (isStatic || prefersReducedMotion) ? '' : 'animate-hologram';
    
    return [
      'glass-panel',
      variantClass,
      animationClass,
      'rounded-2xl sm:rounded-3xl',
      'overflow-hidden',
      className
    ]
      .filter(Boolean)
      .join(' ');
  }, [variant, isStatic, prefersReducedMotion, className]);

  return (
    <div 
      className={panelClasses}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
});

HolographicPanel.displayName = 'HolographicPanel';