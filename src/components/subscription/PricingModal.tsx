import React, { useState } from 'react';
import { X, Check, Sparkles, Zap, Crown, Loader2 } from 'lucide-react';
import { STRIPE_CONFIG } from '../../config/stripe';

interface PricingModalProps {
  onClose: () => void;
  onSelectPlan: (planId: string) => Promise<void>;
}

export const PricingModal: React.FC<PricingModalProps> = ({ 
  onClose, 
  onSelectPlan
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    setLoading(true);
    setSelectedPlan(planId);
    try {
      await onSelectPlan(planId);
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  const plans = [
    {
      id: 'monthly',
      name: 'Mensual',
      icon: Sparkles,
      price: STRIPE_CONFIG.prices.monthly.amount,
      interval: 'mes',
      color: 'from-blue-500 to-blue-600',
      features: [
        'Acceso completo a todos los cursos',
        'Actualizaciones mensuales',
        'Soporte prioritario',
        'Certificados al completar',
        'Cancela cuando quieras'
      ],
      popular: false
    },
    {
      id: 'yearly',
      name: 'Anual',
      icon: Zap,
      price: STRIPE_CONFIG.prices.yearly.amount,
      interval: 'año',
      color: 'from-amber-500 to-orange-600',
      badge: '30% OFF',
      features: [
        'Todo lo del plan Mensual',
        'Ahorra $110 al año',
        'Acceso a contenido exclusivo',
        'Webinars en vivo mensuales',
        'Grupo privado de Discord',
        'Material descargable'
      ],
      popular: true
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      icon: Crown,
      price: STRIPE_CONFIG.prices.lifetime.amount,
      interval: 'pago único',
      color: 'from-purple-500 to-pink-600',
      features: [
        'Todo lo del plan Anual',
        'Acceso de por vida',
        'Todos los cursos futuros gratis',
        'Sesiones 1-on-1 trimestrales',
        'Acceso VIP a eventos',
        'Sin pagos recurrentes'
      ],
      popular: false
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full p-8 relative shadow-2xl my-8">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full mb-4">
            <Sparkles size={16} className="text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              Elige tu plan
            </span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-3">
            Invierte en tu Futuro
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accede a contenido premium, certificados y soporte prioritario. Sin compromisos.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isLoading = loading && selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`
                  relative bg-white rounded-2xl border-2 p-6 transition-all duration-300
                  ${plan.popular 
                    ? 'border-amber-500 shadow-2xl shadow-amber-500/20 scale-105' 
                    : 'border-gray-200 hover:border-amber-300 hover:shadow-xl'
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      MÁS POPULAR
                    </div>
                  </div>
                )}

                <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon size={28} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">
                      /{plan.interval}
                    </span>
                  </div>
                  {plan.badge && (
                    <span className="inline-block mt-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check size={18} className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-amber-600' : 'text-green-600'}`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading}
                  className={`
                    w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300
                    transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2
                    ${plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <span>Comenzar Ahora</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="text-center pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span>Garantía de 30 días</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span>Cancela cuando quieras</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span>Pago seguro con Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};