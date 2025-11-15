// src/components/course/ui/HolographicPanel.tsx
import React, { memo } from 'react';

interface HolographicPanelProps {
  children: React.ReactNode;
  className?: string;
  /** Variant del efecto holográfico */
  variant?: 'default' | 'subtle' | 'intense';
  /** Desactiva animaciones para mejor rendimiento */
  static?: boolean;
}

export const HolographicPanel = memo<HolographicPanelProps>(({ 
  children, 
  className = '',
  variant = 'default',
  static: isStatic = false
}) => {
  const variantClasses = {
    default: 'holographic',
    subtle: 'holographic opacity-60',
    intense: 'holographic brightness-110'
  };

  const animationClass = isStatic ? '' : 'animate-hologram';

  return (
    <div 
      className={`
        glass-panel 
        ${variantClasses[variant]} 
        ${animationClass}
        rounded-3xl 
        overflow-hidden 
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role="region"
      aria-label="Panel holográfico"
    >
      {children}
    </div>
  );
});

HolographicPanel.displayName = 'HolographicPanel';