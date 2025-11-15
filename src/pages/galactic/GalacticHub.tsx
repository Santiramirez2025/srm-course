// src/components/course/galactic/GalacticHub.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Star, Layers } from 'lucide-react';
import { OrbitalProgress } from './OrbitalProgress';
import { HolographicStat } from './ui/HolographicStat';
import { CourseData } from '@data/types';

interface GalacticHubProps {
  courseData: CourseData;
  courseProgress?: {
    total: number;
    completed: number;
    percentage: number;
  };
  currentModuleNumber: number;
  totalModules: number;
}

export const GalacticHub: React.FC<GalacticHubProps> = ({ 
  courseData, 
  courseProgress,
  currentModuleNumber,
  totalModules 
}) => {
  const hasProgress = courseProgress && courseProgress.total > 0;

  return (
    <div className="relative">
      {/* Energy Core Background */}
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 via-fuchsia-600/20 to-cyan-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative glass-panel holographic rounded-3xl p-12 text-center space-y-8">
        
        {/* Core Icon */}
        <motion.div
          className="relative w-24 h-24 mx-auto"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-50 animate-pulse-glow" />
          <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Layers className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Holographic Title */}
        <div>
          <motion.h1 
            className="text-6xl lg:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-cyan-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {courseData.title}
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {courseData.subtitle}
          </motion.p>
        </div>

        {/* Energy Progress Ring */}
        {hasProgress && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <OrbitalProgress 
              percentage={courseProgress.percentage}
              completed={courseProgress.completed}
              total={courseProgress.total}
              size="large"
            />
          </motion.div>
        )}

        {/* Stats Grid */}
        {courseProgress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <HolographicStat icon={BookOpen} value={courseProgress.total} label="Módulos" />
            <HolographicStat icon={CheckCircle2} value={courseProgress.completed} label="Completados" />
            <HolographicStat icon={Star} value={courseProgress.completed} label="Estrellas" />
          </motion.div>
        )}
      </div>
    </div>
  );
};