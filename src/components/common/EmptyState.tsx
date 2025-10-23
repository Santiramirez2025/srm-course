import React from 'react';
import { BookOpen } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10 md:p-12 lg:p-16 text-center">
      {/* Icono - MÁS GRANDE Y RESPONSIVE */}
      <div className="relative inline-block mb-6 sm:mb-8">
        <div className="absolute inset-0 bg-amber-200 rounded-full blur-2xl opacity-30 animate-pulse" />
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-md">
          <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-amber-600" />
        </div>
      </div>

      {/* Título - RESPONSIVE */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 sm:mb-4">
        Selecciona un módulo
      </h3>
      
      {/* Descripción - MEJORADA */}
      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
        Elige un capítulo y luego un módulo para comenzar tu aprendizaje
      </p>

      {/* Decoración opcional - CTA */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
        <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
        <span className="font-medium">Empieza ahora</span>
        <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
      </div>

      {/* Estilos */}
      <style>{`
        /* Optimización para pantallas muy pequeñas */
        @media (max-width: 360px) {
          .text-xl {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};