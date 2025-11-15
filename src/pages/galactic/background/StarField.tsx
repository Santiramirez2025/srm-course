// src/components/course/background/StarField.tsx
import React, { useEffect, useRef, useCallback, useMemo } from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number; // Fase inicial del parpadeo
}

interface StarFieldConfig {
  /** Densidad de estrellas (estrellas por 10000px²) */
  density?: number;
  /** Rango de tamaño de estrellas [min, max] en px */
  sizeRange?: [number, number];
  /** Rango de opacidad base [min, max] */
  opacityRange?: [number, number];
  /** Rango de velocidad de parpadeo [min, max] */
  twinkleSpeedRange?: [number, number];
  /** Opacidad del canvas completo */
  canvasOpacity?: number;
}

interface NebulaConfig {
  color: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size: number;
  opacity: number;
  blurIntensity: number;
  animationDuration: number;
  reverse?: boolean;
}

interface LoadingScreenProps {
  onComplete?: () => void;
  simulateProgress?: boolean;
  progressDuration?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_STAR_CONFIG: Required<StarFieldConfig> = {
  density: 1.25, // estrellas por 10000px²
  sizeRange: [0.3, 1.5],
  opacityRange: [0.2, 0.6],
  twinkleSpeedRange: [0.005, 0.02],
  canvasOpacity: 0.3
};

const NEBULA_PRESETS: NebulaConfig[] = [
  {
    color: 'rgba(139, 92, 246, 0.3)', // Purple
    position: { top: '-10%', left: '10%' },
    size: 800,
    opacity: 0.08,
    blurIntensity: 100,
    animationDuration: 20,
    reverse: false
  },
  {
    color: 'rgba(236, 72, 153, 0.25)', // Pink
    position: { bottom: '-10%', right: '15%' },
    size: 700,
    opacity: 0.06,
    blurIntensity: 120,
    animationDuration: 25,
    reverse: true
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calcula el número de estrellas basado en el área del viewport y la densidad
 */
const calculateStarCount = (width: number, height: number, density: number): number => {
  const area = width * height;
  return Math.floor((area / 10000) * density);
};

/**
 * Genera un valor aleatorio dentro de un rango
 */
const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Crea una estrella con propiedades aleatorias
 */
const createStar = (width: number, height: number, config: Required<StarFieldConfig>): Star => {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: randomInRange(config.sizeRange[0], config.sizeRange[1]),
    baseOpacity: randomInRange(config.opacityRange[0], config.opacityRange[1]),
    twinkleSpeed: randomInRange(config.twinkleSpeedRange[0], config.twinkleSpeedRange[1]),
    twinklePhase: Math.random() * Math.PI * 2 // Fase inicial aleatoria
  };
};

// ============================================================================
// STARFIELD COMPONENT
// ============================================================================

export const StarField: React.FC<StarFieldConfig> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  );

  // Merge config with defaults
  const config = useMemo<Required<StarFieldConfig>>(() => ({
    ...DEFAULT_STAR_CONFIG,
    ...props
  }), [props]);

  /**
   * Inicializa las estrellas basándose en el tamaño del canvas
   */
  const initStars = useCallback((width: number, height: number) => {
    const starCount = calculateStarCount(width, height, config.density);
    const stars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push(createStar(width, height, config));
    }
    
    starsRef.current = stars;
  }, [config]);

  /**
   * Dibuja una estrella individual en el canvas
   */
  const drawStar = useCallback((
    ctx: CanvasRenderingContext2D,
    star: Star,
    time: number
  ) => {
    // Calcular parpadeo usando seno con fase inicial
    const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.2;
    const currentOpacity = Math.max(0.1, Math.min(0.7, star.baseOpacity + twinkle));

    ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true // Mejor rendimiento en algunos navegadores
    });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    /**
     * Ajusta el tamaño del canvas al viewport
     */
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Ajustar canvas para pantallas de alta densidad
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      initStars(width, height);
    };
    
    resizeCanvas();
    
    // Debounced resize handler
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 150);
    };
    
    window.addEventListener('resize', handleResize);

    /**
     * Loop de animación principal
     */
    const animate = (time: number) => {
      // Calcular delta time para animación consistente
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Limpiar canvas
      ctx.clearRect(0, 0, width, height);

      // Si prefers-reduced-motion, dibujar sin animación
      if (prefersReducedMotion.current) {
        starsRef.current.forEach(star => {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.baseOpacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        // Dibujar estrellas con animación
        starsRef.current.forEach(star => {
          drawStar(ctx, star, time * 0.001); // Convertir a segundos
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initStars, drawStar, config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: config.canvasOpacity }}
      aria-hidden="true"
      role="presentation"
    />
  );
};

// ============================================================================
// NEBULA COMPONENT
// ============================================================================

interface NebulaProps {
  config?: NebulaConfig;
  className?: string;
}

const Nebula: React.FC<NebulaProps> = React.memo(({ config, className = '' }) => {
  if (!config) return null;

  const style: React.CSSProperties = {
    ...config.position,
    width: `${config.size}px`,
    height: `${config.size}px`,
    background: `radial-gradient(circle, ${config.color} 0%, transparent 65%)`,
    filter: `blur(${config.blurIntensity}px)`,
    opacity: config.opacity,
    animation: `nebula-float ${config.animationDuration}s ease-in-out infinite ${config.reverse ? 'reverse' : ''}`
  };

  return (
    <div 
      className={`absolute rounded-full ${className}`}
      style={style}
      aria-hidden="true"
      role="presentation"
    />
  );
});
Nebula.displayName = 'Nebula';

/**
 * Componente de nebulosas animadas minimalistas
 */
export const AnimatedNebulas: React.FC<{ nebulas?: NebulaConfig[] }> = ({ 
  nebulas = NEBULA_PRESETS 
}) => {
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
      role="presentation"
    >
      {nebulas.map((nebula, index) => (
        <Nebula key={index} config={nebula} />
      ))}

      <style>{`
        @keyframes nebula-float {
          0%, 100% { 
            transform: translate(0, 0) scale(1) translateZ(0);
          }
          50% { 
            transform: translate(30px, -30px) scale(1.05) translateZ(0);
          }
        }

        /* Responsive: nebulosas más pequeñas en móvil */
        @media (max-width: 768px) {
          @keyframes nebula-float {
            0%, 100% { 
              transform: translate(0, 0) scale(0.7) translateZ(0);
            }
            50% { 
              transform: translate(15px, -15px) scale(0.75) translateZ(0);
            }
          }
        }

        /* Desactivar animación si prefers-reduced-motion */
        ${prefersReducedMotion ? `
          @media (prefers-reduced-motion: reduce) {
            @keyframes nebula-float {
              0%, 100% { 
                transform: translate(0, 0) scale(1) translateZ(0);
              }
            }
          }
        ` : ''}
      `}</style>
    </div>
  );
};

// ============================================================================
// LOADING SCREEN COMPONENT
// ============================================================================

export const GalacticLoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  simulateProgress = true,
  progressDuration = 2000
}) => {
  const [progress, setProgress] = React.useState(0);
  const intervalRef = React.useRef<number>();

  React.useEffect(() => {
    if (!simulateProgress) return;

    const intervalTime = 100; // Actualizar cada 100ms
    const increment = (100 / progressDuration) * intervalTime;

    intervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + increment + Math.random() * 5, 100);
        
        // Trigger callback cuando llegue a 100%
        if (next >= 100 && onComplete) {
          setTimeout(onComplete, 300); // Pequeño delay para suavidad
        }
        
        return next;
      });
    }, intervalTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [simulateProgress, progressDuration, onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50"
      role="status"
      aria-live="polite"
      aria-label={`Cargando: ${Math.round(progress)}%`}
    >
      <div className="text-center space-y-6 px-4">
        {/* Animated Icon */}
        <div className="relative mx-auto w-14 h-14 sm:w-16 sm:h-16">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl animate-pulse-glow"
            aria-hidden="true"
          />
          
          {/* Core sphere */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/20">
            <div 
              className="w-2 h-2 bg-white rounded-full animate-pulse-glow"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-semibold text-white/90">
            Cargando
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Preparando tu experiencia
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-40 sm:w-48 mx-auto">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          
          {/* Percentage text (optional, for screen readers) */}
          <span className="sr-only">
            {Math.round(progress)}% completado
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DEMO COMPONENT (EJEMPLO DE USO)
// ============================================================================

export default function StarFieldDemo() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      {/* Background layers */}
      <StarField 
        density={1.5}
        canvasOpacity={0.4}
      />
      <AnimatedNebulas />
      
      {/* Loading screen */}
      {isLoading && (
        <GalacticLoadingScreen 
          onComplete={() => setIsLoading(false)}
          progressDuration={3000}
        />
      )}
      
      {/* Content */}
      {!isLoading && (
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4 px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Academia 2025
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Diseño premium, minimalista y elegante
            </p>
          </div>
        </div>
      )}
    </div>
  );
}