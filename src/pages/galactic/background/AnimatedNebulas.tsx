// src/components/course/background/AnimatedNebulas.tsx
import React, { useState, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface AnimatedNebulasProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const AnimatedNebulas: React.FC<AnimatedNebulasProps> = ({ mouseX, mouseY }) => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimensions({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });

    const handleResize = () => {
      setDimensions({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ultra-subtle parallax transforms - reduced range
  const x1 = useTransform(mouseX, [0, dimensions.width], [-15, 15]);
  const y1 = useTransform(mouseY, [0, dimensions.height], [-15, 15]);
  
  const x2 = useTransform(mouseX, [0, dimensions.width], [-20, 20]);
  const y2 = useTransform(mouseY, [0, dimensions.height], [-20, 20]);
  
  const x3 = useTransform(mouseX, [0, dimensions.width], [-10, 10]);
  const y3 = useTransform(mouseY, [0, dimensions.height], [-10, 10]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* Primary Nebula - Violet (Top Left) */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px]"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <div 
          className="w-full h-full rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Secondary Nebula - Fuchsia (Bottom Right) */}
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px]"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <div 
          className="w-full h-full rounded-full opacity-12"
          style={{
            background: 'radial-gradient(circle, rgba(217, 70, 239, 0.2) 0%, rgba(217, 70, 239, 0.08) 45%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </motion.div>

      {/* Accent Nebula - Violet/Blue (Center) */}
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px]"
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <div 
          className="w-full h-full rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </motion.div>

      {/* Ultra-subtle ambient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

// Demo Component
export default function NebulasDemo() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  // Create mock MotionValues for demo
  const mouseX = {
    get: () => mousePos.x,
    set: (x: number) => setMousePos(prev => ({ ...prev, x })),
    onChange: (callback: (x: number) => void) => {
      const listener = (e: MouseEvent) => callback(e.clientX);
      window.addEventListener('mousemove', listener);
      return () => window.removeEventListener('mousemove', listener);
    }
  } as any;

  const mouseY = {
    get: () => mousePos.y,
    set: (y: number) => setMousePos(prev => ({ ...prev, y })),
    onChange: (callback: (y: number) => void) => {
      const listener = (e: MouseEvent) => callback(e.clientY);
      window.addEventListener('mousemove', listener);
      return () => window.removeEventListener('mousemove', listener);
    }
  } as any;

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <AnimatedNebulas mouseX={mouseX} mouseY={mouseY} />
      
      {/* Demo content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-5xl font-bold bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
            Premium Nebulas 2025
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Nebulosas ultra sutiles con parallax minimalista. Mueve el mouse para ver el efecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
          {[
            { 
              title: '3 Nebulas', 
              desc: 'Solo 3 capas estratégicas',
              icon: '🌌'
            },
            { 
              title: 'Parallax Sutil', 
              desc: 'Movimiento ±10-20px',
              icon: '✨'
            },
            { 
              title: 'Sin Rotación', 
              desc: 'Solo scale pulse suave',
              icon: '🎯'
            }
          ].map((item, i) => (
            <div 
              key={i}
              className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span>Opacidades: 10-15%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
            <span>Blur: 80-100px</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-300 rounded-full animate-pulse" />
            <span>Duración: 18-25s</span>
          </div>
        </div>
      </div>
    </div>
  );
}