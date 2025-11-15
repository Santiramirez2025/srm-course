// src/components/course/background/StarField.tsx
import React, { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
}

export const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();

  const initStars = useCallback((width: number, height: number) => {
    const starCount = Math.floor((width * height) / 8000); // Menos estrellas
    const stars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.3, // 0.3 a 1.5px
        opacity: Math.random() * 0.4 + 0.2, // 0.2 a 0.6
        twinkleSpeed: Math.random() * 0.015 + 0.005
      });
    }
    
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars(width, height);
    };
    
    resizeCanvas();
    
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };
    
    window.addEventListener('resize', handleResize);

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.2;
        const currentOpacity = Math.max(0.1, Math.min(0.7, star.opacity + twinkle));

        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

// Nebulas minimalistas
export const AnimatedNebulas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Nebula superior */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08]"
        style={{ 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 65%)',
          top: '-10%',
          left: '10%',
          filter: 'blur(100px)',
          animation: 'float 20s ease-in-out infinite'
        }}
      />

      {/* Nebula inferior */}
      <div 
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.06]"
        style={{ 
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 65%)',
          bottom: '-10%',
          right: '15%',
          filter: 'blur(120px)',
          animation: 'float 25s ease-in-out infinite reverse'
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

// Loading minimalista
export const GalacticLoadingScreen: React.FC = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 15, 100));
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* Icon simple */}
        <div className="relative mx-auto w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/20">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>

        {/* Texto */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white/90">Cargando</h2>
          <p className="text-sm text-gray-500">Preparando tu experiencia</p>
        </div>

        {/* Progress bar minimalista */}
        <div className="w-48 mx-auto">
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo
export default function StarFieldDemo() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      <StarField />
      <AnimatedNebulas />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Academia 2025
          </h1>
          <p className="text-gray-500 text-sm">
            Diseño premium, minimalista y elegante
          </p>
        </div>
      </div>
    </div>
  );
}