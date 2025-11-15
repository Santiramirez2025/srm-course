// src/components/course/ui/AchievementBadge.tsx
import React, { useMemo, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Award, Trophy, Star, Zap, X, type LucideIcon } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

type AchievementType = 'default' | 'trophy' | 'star' | 'zap';
type Position = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left';

interface AchievementBadgeProps {
  message: string;
  /** Título personalizado */
  title?: string;
  /** Tipo de logro */
  type?: AchievementType;
  /** Posición en pantalla */
  position?: Position;
  /** Auto-cierre después de X ms */
  autoClose?: number;
  /** Callback al cerrar */
  onClose?: () => void;
  /** Desactiva animaciones manualmente */
  disableAnimation?: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ACHIEVEMENT_ICONS: Record<AchievementType, LucideIcon> = {
  default: Award,
  trophy: Trophy,
  star: Star,
  zap: Zap
};

const ACHIEVEMENT_COLORS: Record<AchievementType, string> = {
  default: 'from-yellow-400 to-orange-500',
  trophy: 'from-amber-400 to-yellow-600',
  star: 'from-purple-400 to-pink-500',
  zap: 'from-cyan-400 to-blue-500'
};

const ACHIEVEMENT_SHADOWS: Record<AchievementType, string> = {
  default: 'shadow-yellow-500/50',
  trophy: 'shadow-amber-500/50',
  star: 'shadow-purple-500/50',
  zap: 'shadow-cyan-500/50'
};

const POSITION_CLASSES: Record<Position, string> = {
  'top-right': 'top-4 right-4 sm:top-8 sm:right-8',
  'top-left': 'top-4 left-4 sm:top-8 sm:left-8',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 sm:top-8',
  'bottom-right': 'bottom-4 right-4 sm:bottom-8 sm:right-8',
  'bottom-left': 'bottom-4 left-4 sm:bottom-8 sm:left-8'
} as const;

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const createBadgeVariants = (reducedMotion: boolean, position: Position): Variants => {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };
  }

  const isTop = position.startsWith('top');
  const yValue = isTop ? -100 : 100;

  return {
    initial: { y: yValue, opacity: 0, scale: 0.8 },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    exit: { 
      y: yValue, 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: 'easeIn' as const
      }
    }
  };
};

const createIconVariants = (reducedMotion: boolean): Variants => {
  if (reducedMotion) {
    return {};
  }

  return {
    animate: {
      rotate: [0, 360] as number[],
      transition: {
        duration: 2,
        ease: 'easeInOut' as const,
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const AchievementIcon = React.memo<{
  type: AchievementType;
  reducedMotion: boolean;
}>(({ type, reducedMotion }) => {
  const Icon = ACHIEVEMENT_ICONS[type];
  const iconVariants = useMemo(() => createIconVariants(reducedMotion), [reducedMotion]);
  
  const iconClasses = useMemo(() => {
    return [
      'w-12 h-12 sm:w-16 sm:h-16',
      `bg-gradient-to-br ${ACHIEVEMENT_COLORS[type]}`,
      'rounded-xl sm:rounded-2xl',
      'flex items-center justify-center',
      `shadow-lg ${ACHIEVEMENT_SHADOWS[type]}`,
      'flex-shrink-0'
    ].join(' ');
  }, [type]);

  const IconWrapper = reducedMotion ? 'div' : motion.div;
  const motionProps = reducedMotion ? {} : {
    variants: iconVariants,
    animate: 'animate'
  };

  return (
    <IconWrapper
      className={iconClasses}
      aria-hidden="true"
      {...motionProps}
    >
      <Icon 
        className="w-6 h-6 sm:w-8 sm:h-8 text-white" 
        strokeWidth={2.5}
      />
    </IconWrapper>
  );
});
AchievementIcon.displayName = 'AchievementIcon';

const CloseButton = React.memo<{
  onClose: () => void;
}>(({ onClose }) => (
  <button
    onClick={onClose}
    className="
      ml-2 
      w-7 h-7 sm:w-8 sm:h-8
      flex items-center justify-center 
      rounded-lg 
      text-gray-400 
      hover:text-white 
      hover:bg-white/10 
      transition-colors
      flex-shrink-0
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-white/50
    "
    aria-label="Cerrar notificación de logro"
    type="button"
  >
    <X className="w-4 h-4 sm:w-5 sm:h-5" />
  </button>
));
CloseButton.displayName = 'CloseButton';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const AchievementBadge = React.memo<AchievementBadgeProps>(({ 
  message,
  title = '¡Logro Desbloqueado!',
  type = 'default',
  position = 'top-right',
  autoClose,
  onClose,
  disableAnimation = false
}) => {
  const prefersReducedMotion = useReducedMotion() || false;
  const shouldAnimate = !disableAnimation && !prefersReducedMotion;

  // Memoize animation variants
  const badgeVariants = useMemo(
    () => shouldAnimate ? createBadgeVariants(false, position) : undefined,
    [shouldAnimate, position]
  );

  // Memoize container classes
  const containerClasses = useMemo(() => {
    return [
      'fixed',
      POSITION_CLASSES[position],
      'z-50',
      'glass-panel',
      'holographic',
      'rounded-xl sm:rounded-2xl',
      'p-4 sm:p-6',
      'max-w-[calc(100vw-2rem)] sm:max-w-md',
      'shadow-2xl',
      'pointer-events-auto'
    ].join(' ');
  }, [position]);

  // Auto-close effect with cleanup
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  // Memoize close handler
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const BadgeWrapper = shouldAnimate ? motion.div : 'div';
  const badgeProps = shouldAnimate ? {
    variants: badgeVariants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit'
  } : {};

  return (
    <BadgeWrapper
      {...badgeProps}
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Achievement Icon */}
        <AchievementIcon 
          type={type} 
          reducedMotion={prefersReducedMotion}
        />
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base sm:text-lg font-black text-white mb-0.5 sm:mb-1 leading-tight">
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-snug">
            {message}
          </p>
        </div>

        {/* Close Button */}
        {onClose && (
          <CloseButton onClose={handleClose} />
        )}
      </div>
    </BadgeWrapper>
  );
});

AchievementBadge.displayName = 'AchievementBadge';