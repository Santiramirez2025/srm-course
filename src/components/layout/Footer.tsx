import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-gradient-to-br from-gray-50 via-white to-amber-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Contenido Principal */}
        <div className="text-center space-y-4 sm:space-y-5">
          {/* Logo y nombre - MÁS GRANDE EN MÓVIL */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 rounded-lg sm:rounded-xl blur-md opacity-40" />
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl sm:text-2xl">S</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                SRM Academy
              </h3>
            </div>
          </div>

          {/* Línea decorativa - MÁS ANCHA EN MÓVIL */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent to-amber-300" />
            <Sparkles size={16} className="sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
            <div className="w-16 sm:w-20 h-px bg-gradient-to-l from-transparent to-amber-300" />
          </div>

          {/* Texto principal - MEJOR LEGIBILIDAD */}
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed px-4 sm:px-0">
            Transformando vidas a través del aprendizaje continuo y el desarrollo personal
          </p>

          {/* Copyright - RESPONSIVE */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200 mt-6 sm:mt-8">
            <p className="text-xs sm:text-sm text-gray-500 px-4 sm:px-0">
              © {currentYear} SRM Academy. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Safe Area Bottom para iOS */}
      <div className="safe-area-bottom" />

      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-50/30 to-transparent pointer-events-none" />

      {/* Estilos */}
      <style>{`
        /* Safe Area Support para iOS */
        .safe-area-bottom {
          height: env(safe-area-inset-bottom);
        }

        /* Optimización para pantallas muy pequeñas */
        @media (max-width: 360px) {
          .text-xl {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </footer>
  );
};