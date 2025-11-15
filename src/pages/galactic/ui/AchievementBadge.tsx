// src/components/course/ui/AchievementBadge.tsx
import React, { memo, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Award, Trophy, Star, Zap, type LucideIcon } from 'lucide-react';

type AchievementType = 'default' | 'trophy' | 'star' | 'zap';

interface AchievementBadgeProps {
  message: string;
  /** Título personalizado */
  title?: string;
  /** Tipo de logro */
  type?: AchievementType;
  /** Posición en pantalla */
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left';
  /** Auto-cierre después de X ms */
  autoClose?: number;
  /** Callback al cerrar */
  onClose?: () => void;
  /** Desactiva animaciones */
  disableAnimation?: boolean;
}

const achievementIcons: Record<AchievementType, LucideIcon> = {
  default: Award,
  trophy: Trophy,
  star: Star,
  zap: Zap
};

const achievementColors: Record<AchievementType, string> = {
  default: 'from-yellow-400 to-orange-500 shadow-yellow-500/50',
  trophy: 'from-amber-400 to-yellow-600 shadow-amber-500/50',
  star: 'from-purple-400 to-pink-500 shadow-purple-500/50',
  zap: 'from-cyan-400 to-blue-500 shadow-cyan-500/50'
};

const positionClasses = {
  'top-right': 'top-8 right-8',
  'top-left': 'top-8 left-8',
  'top-center': 'top-8 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-8 right-8',
  'bottom-left': 'bottom-8 left-8'
} as const;

const badgeVariants: Variants = {
  initial: { y: -100, opacity: 0, scale: 0.8 },
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
    y: -100, 
    opacity: 0, 
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

const iconVariants: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1
    }
  }
};

export const AchievementBadge = memo<AchievementBadgeProps>(({ 
  message,
  title = '¡Logro Desbloqueado!',
  type = 'default',
  position = 'top-right',
  autoClose,
  onClose,
  disableAnimation = false
}) => {
  const Icon = achievementIcons[type];

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const BadgeWrapper = disableAnimation ? 'div' : motion.div;
  const IconWrapper = disableAnimation ? 'div' : motion.div;

  const badgeProps = disableAnimation ? {} : {
    variants: badgeVariants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit'
  };

  const iconProps = disableAnimation ? {} : {
    variants: iconVariants,
    animate: 'animate'
  };

  return (
    <BadgeWrapper
      {...badgeProps}
      className={`
        fixed 
        ${positionClasses[position]}
        z-50 
        glass-panel 
        holographic 
        rounded-2xl 
        p-6 
        max-w-md 
        shadow-2xl
        pointer-events-auto
      `.trim().replace(/\s+/g, ' ')}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-4">
        <IconWrapper
          {...iconProps}
          className={`
            w-16 h-16 
            bg-gradient-to-br ${achievementColors[type]}
            rounded-2xl 
            flex items-center justify-center 
            shadow-lg
            flex-shrink-0
          `.trim().replace(/\s+/g, ' ')}
          aria-hidden="true"
        >
          <Icon className="w-8 h-8 text-white" />
        </IconWrapper>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-black text-white mb-1">
            {title}
          </h4>
          <p className="text-sm text-gray-300 line-clamp-2">
            {message}
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="
              ml-2 
              w-8 h-8 
              flex items-center justify-center 
              rounded-lg 
              text-gray-400 
              hover:text-white 
              hover:bg-white/10 
              transition-colors
              flex-shrink-0
            "
            aria-label="Cerrar notificación"
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </BadgeWrapper>
  );
});

AchievementBadge.displayName = 'AchievementBadge';