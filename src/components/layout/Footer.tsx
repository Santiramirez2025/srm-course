import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-gradient-to-br from-gray-50 via-white to-amber-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Contenido Principal */}
        <div className="text-center space-y-4">
          {/* Logo y nombre */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 rounded-lg blur-md opacity-40" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">S</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                SRM Academy
              </h3>
            </div>
          </div>

          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300" />
            <Sparkles size={14} className="text-amber-500" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300" />
          </div>

          {/* Texto principal */}
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Transformando vidas a través del aprendizaje continuo y el desarrollo personal
          </p>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200 mt-6">
            <p className="text-xs text-gray-500">
              © {currentYear} SRM Academy. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-50/30 to-transparent pointer-events-none" />
    </footer>
  );
};