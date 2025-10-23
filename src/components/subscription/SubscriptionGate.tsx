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
  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* Logo */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-xl opacity-60 animate-pulse" />
          <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-black text-3xl">S</span>
          </div>
        </div>

        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={32} className="text-amber-600" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-black text-gray-900 mb-3">
          Acceso Exclusivo
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Desbloquea acceso completo a todos los cursos, certificados profesionales y soporte prioritario.
        </p>

        {/* Features */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-amber-600 flex-shrink-0" />
            <span className="font-bold text-gray-900 text-sm">Incluye:</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">✓</span>
              <span>Acceso ilimitado a todos los cursos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">✓</span>
              <span>Certificados profesionales al completar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">✓</span>
              <span>Actualizaciones de contenido continuas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">✓</span>
              <span>Soporte prioritario 24/7</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={onUpgrade}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 mb-4"
        >
          Ver Planes y Precios
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="text-green-600">✓</span> Pago seguro
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-600">✓</span> Cancela cuando quieras
          </span>
        </div>
      </div>
    </div>
  );
};