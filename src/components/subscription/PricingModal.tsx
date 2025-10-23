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
  console.log('🎨 PricingModal renderizado');
  
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    console.log('💳 Seleccionando plan:', planId);
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
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      {/* Safe Area Top */}
      <div className="safe-area-top" />

      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full p-6 sm:p-8 md:p-10 relative shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - TOUCH TARGET OPTIMIZADO */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors w-11 h-11 sm:w-12 sm:h-12 rounded-xl hover:bg-gray-100 flex items-center justify-center touch-manipulation z-10 min-h-[44px]"
          aria-label="Cerrar modal de precios"
          type="button"
          disabled={loading}
        >
          <X size={24} className="sm:w-7 sm:h-7" />
        </button>

        {/* Header - RESPONSIVE */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-amber-50 border-2 border-amber-200 rounded-full mb-4 sm:mb-5">
            <Sparkles size={16} className="sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold text-amber-700">
              Elige tu plan
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 px-2">
            Invierte en tu Futuro
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Accede a contenido premium, certificados y soporte prioritario. Sin compromisos.
          </p>
        </div>

        {/* Plans Grid - OPTIMIZADO PARA MÓVIL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isLoading = loading && selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`
                  relative bg-white rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300
                  ${plan.popular 
                    ? 'border-amber-500 shadow-2xl shadow-amber-500/20 sm:scale-105 ring-2 ring-amber-200' 
                    : 'border-gray-200 hover:border-amber-300 hover:shadow-xl'
                  }
                `}
              >
                {/* Popular Badge - RESPONSIVE */}
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                      MÁS POPULAR
                    </div>
                  </div>
                )}

                {/* Icon - RESPONSIVE */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${plan.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>

                {/* Plan Name - RESPONSIVE */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2 sm:mb-3">
                  {plan.name}
                </h3>

                {/* Price - RESPONSIVE */}
                <div className="mb-5 sm:mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-600 font-medium">
                      /{plan.interval}
                    </span>
                  </div>
                  {plan.badge && (
                    <span className="inline-block mt-2 text-xs sm:text-sm font-bold text-green-600 bg-green-50 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-green-200">
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Features List - RESPONSIVE */}
                <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                      <Check 
                        size={18} 
                        className={`flex-shrink-0 mt-0.5 sm:w-5 sm:h-5 ${plan.popular ? 'text-amber-600' : 'text-green-600'}`} 
                      />
                      <span className="text-gray-700 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button - TOUCH TARGET OPTIMIZADO */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading}
                  type="button"
                  className={`
                    w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300
                    transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                    flex items-center justify-center gap-2 sm:gap-3
                    touch-manipulation min-h-[52px] sm:min-h-[56px]
                    ${plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-2 border-gray-200 hover:border-gray-300'
                    }
                  `}
                  aria-label={`Seleccionar plan ${plan.name}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
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

        {/* Trust Badges - RESPONSIVE */}
        <div className="text-center pt-5 sm:pt-6 border-t-2 border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-green-50 rounded-lg border border-green-200">
              <Check size={14} className="sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
              <span className="font-medium text-green-700">Garantía de 30 días</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-50 rounded-lg border border-blue-200">
              <Check size={14} className="sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              <span className="font-medium text-blue-700">Cancela cuando quieras</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-purple-50 rounded-lg border border-purple-200">
              <Check size={14} className="sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
              <span className="font-medium text-purple-700">Pago seguro con Stripe</span>
            </div>
          </div>
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
          .sm\\:scale-105 {
            transform: none !important;
          }
        }

        /* Optimización para pantallas muy pequeñas */
        @media (max-width: 360px) {
          .text-2xl {
            font-size: 1.375rem;
          }
          .text-3xl {
            font-size: 1.625rem;
          }
        }
      `}</style>
    </div>
  );
};