import React from 'react';
import { Lock, Clock } from 'lucide-react';

interface SubscriptionGateProps {
  hasAccess: boolean;
  trialDaysLeft?: number;
  onUpgrade: () => void;
  children: React.ReactNode;
}

export const SubscriptionGate: React.FC<SubscriptionGateProps> = ({
  hasAccess,
  trialDaysLeft,
  onUpgrade,
  children
}) => {
  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Lock size={40} className="text-white" />
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-3">
          {trialDaysLeft ? 'Prueba Finalizada' : 'Contenido Premium'}
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {trialDaysLeft 
            ? `Tu periodo de prueba de 7 días ha terminado. Actualiza para continuar aprendiendo.`
            : 'Desbloquea acceso completo a todos los cursos, certificados y soporte prioritario.'
          }
        </p>

        {trialDaysLeft && trialDaysLeft > 0 && (
          <div className="flex items-center justify-center gap-2 mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
            <Clock size={18} className="text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              {trialDaysLeft} {trialDaysLeft === 1 ? 'día' : 'días'} restantes de prueba
            </span>
          </div>
        )}

        <button
          onClick={onUpgrade}
          className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Ver Planes y Precios
        </button>

        <p className="text-xs text-gray-500 mt-4">
          Garantía de devolución de 30 días • Cancela cuando quieras
        </p>
      </div>
    </div>
  );
};