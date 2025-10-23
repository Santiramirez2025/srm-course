import React from 'react';
import { Lock, Sparkles } from 'lucide-react';

interface SubscriptionGateProps {
  hasAccess: boolean;
  onUpgrade: () => void;
  children: React.ReactNode;
}

export const SubscriptionGate: React.FC<SubscriptionGateProps> = ({
  hasAccess,
  onUpgrade,
  children
}) => {
  // Si tiene acceso, mostrar el contenido
  if (hasAccess) {
    return <>{children}</>;
  }

  // Si NO tiene acceso, mostrar el bloqueo
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4 sm:p-6">
      {/* Safe Area Top */}
      <div className="safe-area-top" />

      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 text-center my-auto">
        {/* Logo - RESPONSIVE */}
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-xl opacity-60 animate-pulse" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-black text-3xl sm:text-4xl">S</span>
          </div>
        </div>

        {/* Icon - RESPONSIVE */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-md">
          <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
        </div>

        {/* Title - RESPONSIVE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
          Acceso Exclusivo
        </h2>

        {/* Description - RESPONSIVE */}
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          Desbloquea acceso completo a todos los cursos, certificados profesionales y soporte prioritario.
        </p>

        {/* Features - MEJORADO */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 text-left">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-sm sm:text-base">Incluye:</span>
          </div>
          <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-amber-600 font-black text-lg flex-shrink-0">✓</span>
              <span>Acceso ilimitado a todos los cursos</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-amber-600 font-black text-lg flex-shrink-0">✓</span>
              <span>Certificados profesionales al completar</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-amber-600 font-black text-lg flex-shrink-0">✓</span>
              <span>Actualizaciones de contenido continuas</span>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-amber-600 font-black text-lg flex-shrink-0">✓</span>
              <span>Soporte prioritario 24/7</span>
            </li>
          </ul>
        </div>

        {/* CTA Button - TOUCH TARGET OPTIMIZADO */}
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log('🔥 Botón clickeado - abriendo modal');
            onUpgrade();
          }}
          type="button"
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 mb-4 sm:mb-6 touch-manipulation min-h-[56px] sm:min-h-[60px]"
          aria-label="Ver planes y precios"
        >
          Ver Planes y Precios
        </button>

        {/* Trust badges - MEJORADOS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 bg-green-50 rounded-lg border border-green-200">
            <span className="text-green-600 font-bold text-base">✓</span>
            <span className="text-green-700 font-medium">Pago seguro</span>
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-blue-600 font-bold text-base">✓</span>
            <span className="text-blue-700 font-medium">Cancela cuando quieras</span>
          </span>
        </div>
      </div>

      {/* Safe Area Bottom */}
      <div className="safe-area-bottom" />

      {/* Estilos */}
      <style>{`
        /* Safe Area Support */
        .safe-area-top {
          height: env(safe-area-inset-top);
        }
        
        .safe-area-bottom {
          height: env(safe-area-inset-bottom);
        }

        /* Touch manipulation */
        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .hover\\:scale-105,
          .active\\:scale-95,
          .animate-pulse {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};