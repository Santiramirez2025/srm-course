// src/components/course/galactic/OrbitalProgress.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface OrbitalProgressProps {
  percentage: number;
  completed: number;
  total: number;
  size?: 'small' | 'large';
}

export const OrbitalProgress: React.FC<OrbitalProgressProps> = ({
  percentage,
  completed,
  total,
  size = 'large'
}) => {
  const isLarge = size === 'large';
  const config = isLarge 
    ? { container: 240, radius: 90, center: 120, stroke: 8 }
    : { container: 120, radius: 50, center: 60, stroke: 6 };
  
  const circumference = 2 * Math.PI * config.radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <div 
      className="relative"
      style={{ width: config.container, height: config.container }}
    >
      
      {/* Sutil glow de fondo */}
      {isLarge && (
        <div 
          className="absolute inset-0 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)'
          }}
        />
      )}
      
      {/* Progress Ring */}
      <svg className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Background track sutil */}
        <circle
          cx={config.center}
          cy={config.center}
          r={config.radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={config.stroke}
        />
        
        {/* Progress bar */}
        <motion.circle
          cx={config.center}
          cy={config.center}
          r={config.radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))'
          }}
        />
      </svg>

      {/* Contenido central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <span
            className={`font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent ${isLarge ? 'text-5xl' : 'text-2xl'}`}
          >
            {percentage}%
          </span>
          
          {isLarge && (
            <p className="text-xs font-medium text-gray-500 mt-2 tracking-wider">
              {completed} de {total} completados
            </p>
          )}
        </motion.div>
      </div>

      {/* Punto indicador sutil en el progreso */}
      {isLarge && percentage > 0 && (
        <motion.div
          className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
          style={{
            top: '50%',
            left: '50%',
            marginTop: -6,
            marginLeft: -6,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            x: Math.cos((percentage / 100) * Math.PI * 2 - Math.PI / 2) * config.radius,
            y: Math.sin((percentage / 100) * Math.PI * 2 - Math.PI / 2) * config.radius,
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      )}
    </div>
  );
};