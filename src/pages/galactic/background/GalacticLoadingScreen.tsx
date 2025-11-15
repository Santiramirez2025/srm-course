// src/components/course/background/GalacticLoadingScreen.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const GalacticLoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulated realistic loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Exponential easing for natural feel
        const increment = (100 - prev) * 0.1 + Math.random() * 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50">
      
      {/* Ultra subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Minimal starfield - 8 stars only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${15 + ((i % 3) * 30)}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + (i * 0.3),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-6 max-w-md"
      >
        
        {/* Logo/Icon - Minimalist */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl opacity-20 blur-xl" />
            
            {/* Main icon container */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mb-8"
        >
          <h2 className="text-2xl font-bold text-white">
            Cargando curso
          </h2>
          <p className="text-sm text-gray-400">
            Preparando tu experiencia de aprendizaje
          </p>
        </motion.div>

        {/* Progress bar - Clean and minimal */}
        <div className="space-y-3">
          <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden mx-auto">
            <motion.div 
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          {/* Progress percentage */}
          <motion.p 
            className="text-xs text-gray-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>

        {/* Loading dots animation */}
        <motion.div 
          className="flex items-center justify-center gap-1.5 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-violet-400 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom subtle gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />
    </div>
  );
};

// Demo wrapper
export default function LoadingScreenDemo() {
  const [showLoading, setShowLoading] = React.useState(true);

  React.useEffect(() => {
    // Auto-hide after 3 seconds for demo
    const timer = setTimeout(() => setShowLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      {showLoading ? (
        <GalacticLoadingScreen />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Contenido Cargado</h1>
            <p className="text-gray-400">La pantalla de carga se ha completado</p>
            <button
              onClick={() => setShowLoading(true)}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-300"
            >
              Ver Loading de Nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}