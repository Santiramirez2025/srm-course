// src/components/course/background/GalacticLoadingScreen.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Loader2, type LucideIcon } from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface LoadingScreenConfig {
  /** Duración total de la carga en ms (si simulateProgress es true) */
  duration?: number;
  /** Intervalo de actualización del progreso en ms */
  updateInterval?: number;
  /** Título personalizado */
  title?: string;
  /** Subtítulo/descripción */
  subtitle?: string;
  /** Icono personalizado (componente Lucide) */
  icon?: LucideIcon;
  /** Número de estrellas de fondo */
  starCount?: number;
  /** Callback al completar la carga */
  onComplete?: () => void;
  /** Simular progreso automático */
  simulateProgress?: boolean;
  /** Progreso controlado externamente (0-100) */
  controlledProgress?: number;
}

interface GalacticLoadingScreenProps extends LoadingScreenConfig {
  className?: string;
}

interface StarProps {
  index: number;
  total: number;
  reducedMotion: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_CONFIG: Required<Omit<LoadingScreenConfig, 'onComplete' | 'controlledProgress'>> = {
  duration: 3000,
  updateInterval: 150,
  title: 'Cargando curso',
  subtitle: 'Preparando tu experiencia de aprendizaje',
  icon: Sparkles,
  starCount: 8,
  simulateProgress: true
};

// Easing function for natural loading progression
const exponentialEasing = (progress: number): number => {
  return (100 - progress) * 0.1 + Math.random() * 5;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calcula la posición de una estrella en un patrón distribuido
 */
const calculateStarPosition = (index: number, total: number): { left: string; top: string } => {
  const spread = 60; // Rango de distribución en porcentaje
  const baseLeft = 20;
  const baseTop = 15;
  
  return {
    left: `${baseLeft + (index * (spread / total))}%`,
    top: `${baseTop + ((index % 3) * 30)}%`
  };
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Estrella individual animada
 */
const Star: React.FC<StarProps> = React.memo(({ index, total, reducedMotion }) => {
  const position = useMemo(() => calculateStarPosition(index, total), [index, total]);
  
  const animation = useMemo(() => {
    if (reducedMotion) {
      return { opacity: 0.3 };
    }
    return {
      opacity: [0.2, 0.5, 0.2] as number[]
    };
  }, [reducedMotion]);

  const transition = useMemo(() => ({
    duration: 2 + (index * 0.3),
    repeat: Infinity,
    ease: "easeInOut" as const
  }), [index]);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/40 rounded-full"
      style={position}
      animate={animation}
      transition={transition}
      aria-hidden="true"
    />
  );
});
Star.displayName = 'Star';

/**
 * Campo de estrellas minimalista de fondo
 */
const StarField: React.FC<{ count: number; reducedMotion: boolean }> = React.memo(({ 
  count, 
  reducedMotion 
}) => (
  <div 
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    {Array.from({ length: count }, (_, i) => (
      <Star key={i} index={i} total={count} reducedMotion={reducedMotion} />
    ))}
  </div>
));
StarField.displayName = 'StarField';

/**
 * Nebulosa de fondo sutil
 */
const AmbientGlow: React.FC = React.memo(() => (
  <div 
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <div 
      className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
      style={{ 
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
      }}
    />
  </div>
));
AmbientGlow.displayName = 'AmbientGlow';

/**
 * Icono central con animación y glow
 */
const LoadingIcon: React.FC<{ 
  Icon: LucideIcon; 
  reducedMotion: boolean;
}> = React.memo(({ Icon, reducedMotion }) => {
  const containerAnimation = useMemo(() => {
    if (reducedMotion) {
      return { scale: 1 };
    }
    return {
      scale: [1, 1.02, 1] as number[]
    };
  }, [reducedMotion]);

  const iconAnimation = useMemo(() => {
    if (reducedMotion) {
      return { scale: 1, opacity: 1 };
    }
    return {
      scale: [1, 1.2, 1] as number[],
      opacity: [0.6, 1, 0.6] as number[]
    };
  }, [reducedMotion]);

  return (
    <motion.div
      animate={containerAnimation}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }}
      className="mb-6 sm:mb-8 inline-block"
    >
      <div className="relative">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl sm:rounded-2xl opacity-20 blur-xl"
          aria-hidden="true"
        />
        
        {/* Icon container */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25">
          <motion.div
            animate={iconAnimation}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut" as const
            }}
          >
            <Icon 
              className="w-7 h-7 sm:w-8 sm:h-8 text-white" 
              strokeWidth={2}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});
LoadingIcon.displayName = 'LoadingIcon';

/**
 * Texto de carga con título y subtítulo
 */
const LoadingText: React.FC<{ 
  title: string; 
  subtitle: string;
}> = React.memo(({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="space-y-2 sm:space-y-3 mb-6 sm:mb-8"
  >
    <h2 className="text-xl sm:text-2xl font-bold text-white">
      {title}
    </h2>
    <p className="text-xs sm:text-sm text-gray-400 px-4">
      {subtitle}
    </p>
  </motion.div>
));
LoadingText.displayName = 'LoadingText';

/**
 * Barra de progreso minimalista
 */
const ProgressBar: React.FC<{ 
  progress: number;
  reducedMotion: boolean;
}> = React.memo(({ progress, reducedMotion }) => {
  const duration = reducedMotion ? 0.1 : 0.3;

  return (
    <div className="space-y-2 sm:space-y-3">
      <div 
        className="w-48 sm:w-64 h-1 sm:h-1.5 bg-white/5 rounded-full overflow-hidden mx-auto"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progreso de carga: ${Math.round(progress)}%`}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration, ease: "easeOut" as const }}
        />
      </div>
      
      {/* Progress percentage */}
      <motion.p 
        className="text-xs text-gray-500 font-medium tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Math.round(progress)}%
      </motion.p>
    </div>
  );
});
ProgressBar.displayName = 'ProgressBar';

/**
 * Puntos animados de loading activo
 */
const LoadingDots: React.FC<{ reducedMotion: boolean }> = React.memo(({ reducedMotion }) => {
  const dotAnimation = useCallback((index: number) => {
    if (reducedMotion) {
      return { opacity: 0.5, scale: 1 };
    }
    return {
      opacity: [0.3, 1, 0.3] as number[],
      scale: [1, 1.2, 1] as number[]
    };
  }, [reducedMotion]);

  return (
    <motion.div 
      className="flex items-center justify-center gap-1.5 mt-4 sm:mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-violet-400 rounded-full"
          animate={dotAnimation(i)}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut" as const
          }}
        />
      ))}
    </motion.div>
  );
});
LoadingDots.displayName = 'LoadingDots';

/**
 * Gradiente inferior sutil
 */
const BottomGradient: React.FC = React.memo(() => (
  <div 
    className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none"
    aria-hidden="true"
  />
));
BottomGradient.displayName = 'BottomGradient';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Pantalla de carga galáctica con animaciones suaves y progreso visual
 * 
 * Features:
 * - Nebulosa de fondo sutil con estrellas animadas
 * - Icono central pulsante con glow
 * - Barra de progreso minimalista
 * - Animaciones con easing natural
 * - Soporte para reduced motion
 * - Accesible con ARIA attributes
 */
export const GalacticLoadingScreen: React.FC<GalacticLoadingScreenProps> = ({
  duration = DEFAULT_CONFIG.duration,
  updateInterval = DEFAULT_CONFIG.updateInterval,
  title = DEFAULT_CONFIG.title,
  subtitle = DEFAULT_CONFIG.subtitle,
  icon = DEFAULT_CONFIG.icon,
  starCount = DEFAULT_CONFIG.starCount,
  onComplete,
  simulateProgress = DEFAULT_CONFIG.simulateProgress,
  controlledProgress,
  className = ''
}) => {
  const reducedMotion = useReducedMotion() || false;
  const [progress, setProgress] = useState(0);

  /**
   * Simular progreso de carga con easing exponencial
   */
  useEffect(() => {
    // Si el progreso está controlado externamente, no simular
    if (controlledProgress !== undefined || !simulateProgress) {
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Trigger callback al completar
          if (onComplete) {
            setTimeout(onComplete, 300); // Delay para suavidad visual
          }
          return 100;
        }
        
        // Easing exponencial para sensación natural
        const increment = exponentialEasing(prev);
        return Math.min(prev + increment, 100);
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [simulateProgress, controlledProgress, updateInterval, onComplete]);

  /**
   * Sincronizar progreso controlado externamente
   */
  useEffect(() => {
    if (controlledProgress !== undefined) {
      setProgress(controlledProgress);
      
      // Trigger callback cuando llega a 100%
      if (controlledProgress >= 100 && onComplete) {
        setTimeout(onComplete, 300);
      }
    }
  }, [controlledProgress, onComplete]);

  // Progreso actual (controlado o simulado)
  const currentProgress = controlledProgress !== undefined ? controlledProgress : progress;

  return (
    <div 
      className={`fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy={currentProgress < 100}
      aria-label="Pantalla de carga"
    >
      {/* Ambient glow */}
      <AmbientGlow />

      {/* Starfield */}
      <StarField count={starCount} reducedMotion={reducedMotion} />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-md w-full"
      >
        {/* Loading Icon */}
        <LoadingIcon Icon={icon} reducedMotion={reducedMotion} />

        {/* Loading Text */}
        <LoadingText title={title} subtitle={subtitle} />

        {/* Progress Bar */}
        <ProgressBar progress={currentProgress} reducedMotion={reducedMotion} />

        {/* Loading Dots */}
        <LoadingDots reducedMotion={reducedMotion} />
      </motion.div>

      {/* Bottom Gradient */}
      <BottomGradient />
    </div>
  );
};

GalacticLoadingScreen.displayName = 'GalacticLoadingScreen';

// ============================================================================
// DEMO COMPONENT
// ============================================================================

export default function LoadingScreenDemo() {
  const [showLoading, setShowLoading] = useState(true);
  const [controlledProgress, setControlledProgress] = useState<number | undefined>(undefined);
  const [useControlled, setUseControlled] = useState(false);

  // Simular carga controlada manualmente
  useEffect(() => {
    if (!useControlled || !showLoading) return;

    const interval = setInterval(() => {
      setControlledProgress(prev => {
        const next = (prev || 0) + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [useControlled, showLoading]);

  const handleComplete = useCallback(() => {
    setTimeout(() => setShowLoading(false), 500);
  }, []);

  const handleRestart = useCallback(() => {
    setShowLoading(true);
    setControlledProgress(undefined);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      {showLoading ? (
        <GalacticLoadingScreen 
          duration={4000}
          onComplete={handleComplete}
          simulateProgress={!useControlled}
          controlledProgress={useControlled ? controlledProgress : undefined}
        />
      ) : (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Contenido Cargado
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                La pantalla de carga se ha completado exitosamente
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
              >
                Ver Loading de Nuevo
              </button>
              
              <button
                onClick={() => {
                  setUseControlled(!useControlled);
                  handleRestart();
                }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-white transition-colors duration-300 text-sm sm:text-base"
              >
                {useControlled ? 'Modo Auto' : 'Modo Controlado'}
              </button>
            </div>

            <div className="pt-4 space-y-2 text-xs sm:text-sm text-gray-500">
              <p>✨ Animaciones suaves con easing exponencial</p>
              <p>🌌 Nebulosas y estrellas de fondo</p>
              <p>♿ Soporte para prefers-reduced-motion</p>
              <p>📱 Responsive y mobile-first</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}