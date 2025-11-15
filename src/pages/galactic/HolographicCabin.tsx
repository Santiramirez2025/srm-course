// src/components/course/galactic/HolographicCabin.tsx
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, CheckCircle2, Sparkles, Zap } from 'lucide-react';
import { HolographicPanel } from './ui/HolographicPanel';
import { WarpButton } from './ui/WarpButton';
import { ModuleContent } from '../../components/course/ModuleContent';
import { Module } from '@data/types';

interface HolographicCabinProps {
  module: Module & { chapterTitle: string; chapterId: number };
  onComplete?: (moduleId: number) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  onBookmark?: (moduleId: number) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  currentModuleNumber: number;
  totalModules: number;
}

export const HolographicCabin: React.FC<HolographicCabinProps> = ({
  module,
  onComplete,
  onNavigate,
  onBookmark,
  isCompleted,
  isBookmarked,
  hasPrevious,
  hasNext,
  currentModuleNumber,
  totalModules
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  // Calcular progreso del curso
  const progressPercentage = useMemo(
    () => (currentModuleNumber / totalModules) * 100,
    [currentModuleNumber, totalModules]
  );

  // Variantes de animación adaptativas
  const iconVariants = useMemo(() => ({
    idle: { 
      rotate: shouldReduceMotion ? 0 : [0, 360],
      scale: 1 
    },
    hover: { 
      scale: shouldReduceMotion ? 1 : 1.1,
      rotate: shouldReduceMotion ? 0 : 360 
    }
  }), [shouldReduceMotion]);

  const glowVariants = useMemo(() => ({
    pulse: shouldReduceMotion ? {} : {
      boxShadow: [
        "0 0 20px rgba(168, 85, 247, 0.4)",
        "0 0 40px rgba(168, 85, 247, 0.6)",
        "0 0 20px rgba(168, 85, 247, 0.4)",
      ],
    }
  }), [shouldReduceMotion]);

  return (
    <div className="space-y-6">
      {/* Header Holográfico Premium */}
      <HolographicPanel>
        <div className="relative overflow-hidden">
          {/* Gradiente de fondo animado */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), transparent 70%)'
            }}
            animate={shouldReduceMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative p-8 lg:p-10">
            {/* Progress Bar Sutil */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800/50 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            {/* Header Content */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-start gap-5">
                {/* Icono 3D mejorado */}
                <motion.div
                  className="relative w-20 h-20 flex-shrink-0"
                  variants={iconVariants}
                  animate="idle"
                  whileHover="hover"
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.3 }
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-60"
                    variants={glowVariants}
                    animate="pulse"
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Icon container */}
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    {/* Brillo interno */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
                    <Compass className="w-10 h-10 text-white relative z-10" />
                  </div>
                  
                  {/* Partículas flotantes */}
                  {!shouldReduceMotion && (
                    <>
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{
                          y: [-5, 5, -5],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full"
                        animate={{
                          y: [5, -5, 5],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      />
                    </>
                  )}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  {/* Breadcrumb mejorado */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mb-2"
                  >
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                      {module.chapterTitle}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-xs text-gray-500 font-medium">
                      Módulo {currentModuleNumber}
                    </span>
                  </motion.div>
                  
                  {/* Título con gradiente */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 leading-tight"
                  >
                    {module.title}
                  </motion.h2>
                </div>
              </div>

              {/* Status Badge Premium */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 flex-shrink-0"
              >
                {/* Progress indicator */}
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-gray-500 font-medium mb-1">Progreso</span>
                  <span className="text-lg font-black text-white">
                    {currentModuleNumber}/{totalModules}
                  </span>
                </div>

                {/* Completion Badge */}
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    className="relative"
                  >
                    {/* Glow */}
                    <motion.div
                      className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50"
                      animate={shouldReduceMotion ? {} : {
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.7, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Badge */}
                    <div className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Sparkles */}
                    {!shouldReduceMotion && (
                      <>
                        <motion.div
                          className="absolute -top-1 -right-1"
                          animate={{
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-yellow-300" />
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Navigation Controls Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
            >
              <WarpButton
                direction="prev"
                onClick={() => onNavigate?.('prev')}
                disabled={!hasPrevious}
              />
              
              {/* CTA Button Premium */}
              <motion.button
                onClick={() => onComplete?.(module.id)}
                disabled={isCompleted}
                className={`
                  group relative px-8 py-4 rounded-2xl font-black text-lg
                  transition-all duration-500 overflow-hidden
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 cursor-not-allowed border-2 border-green-500/30' 
                    : 'bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 border-2 border-purple-400/50'
                  }
                `}
                whileHover={isCompleted ? {} : { scale: 1.02 }}
                whileTap={isCompleted ? {} : { scale: 0.98 }}
              >
                {/* Animated background */}
                {!isCompleted && !shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-purple-600"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Completado
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Marcar como Completado
                    </>
                  )}
                </span>

                {/* Shine effect */}
                {!isCompleted && !shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>

              <WarpButton
                direction="next"
                onClick={() => onNavigate?.('next')}
                disabled={!hasNext}
              />
            </motion.div>
          </div>
        </div>
      </HolographicPanel>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <HolographicPanel>
          <div className="p-8 lg:p-10">
            <ModuleContent
              module={module}
              onComplete={onComplete}
              onNavigate={onNavigate}
              onBookmark={onBookmark}
              isCompleted={isCompleted}
              isBookmarked={isBookmarked}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              currentModuleNumber={currentModuleNumber}
              totalModules={totalModules}
              isLoading={false}
            />
          </div>
        </HolographicPanel>
      </motion.div>
    </div>
  );
};