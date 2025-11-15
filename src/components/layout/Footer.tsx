import React, { useState } from 'react';
import { Heart, Coffee, X } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const tipAmounts = [
    { value: 5, label: '$5', emoji: '☕' },
    { value: 10, label: '$10', emoji: '🍕' },
    { value: 20, label: '$20', emoji: '🎁' },
    { value: 50, label: '$50', emoji: '⭐' }
  ];

  const handleSendTip = () => {
    if (selectedAmount) {
      alert(`¡Gracias por tu apoyo de $${selectedAmount}! 💜`);
      setShowTipModal(false);
      setSelectedAmount(null);
    }
  };

  return (
    <>
      <footer className="relative mt-auto bg-[#0a0a0f] border-t border-white/5">
        
        {/* Glow sutil superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-24 bg-violet-500/5 blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center space-y-8">
            
            {/* Logo simple */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white/90">
                  SRM Academy
                </h3>
                <p className="text-xs text-gray-600 uppercase tracking-wider mt-0.5">
                  Learning Platform
                </p>
              </div>
            </div>

            {/* Línea decorativa */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-px bg-white/5" />
              <div className="w-1 h-1 bg-violet-500/50 rounded-full" />
              <div className="w-16 h-px bg-white/5" />
            </div>

            {/* Tagline */}
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              Transformando vidas a través del aprendizaje continuo
            </p>

            {/* Botón de apoyo */}
            <button
              onClick={() => setShowTipModal(true)}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg font-medium text-white text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              <span>Apoyar con un Cafecito</span>
              <Coffee className="w-4 h-4" />
            </button>
            <p className="text-xs text-gray-600">
              ¿Te gustó el curso? Tu apoyo hace la diferencia 💜
            </p>

            {/* Copyright */}
            <div className="pt-8 border-t border-white/5">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-gray-600">
                <span>© {currentYear} SRM Academy</span>
                <span className="hidden sm:inline text-gray-800">•</span>
                <span>Todos los derechos reservados</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Tips */}
      {showTipModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={() => setShowTipModal(false)}
          />
          
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <div 
              className="relative w-full max-w-sm bg-[#0f0f14] border border-white/10 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow del modal */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur-xl" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">¡Apóyanos!</h3>
                      <p className="text-xs text-gray-500">Tu aporte nos ayuda</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTipModal(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-5">
                  <p className="text-sm text-gray-400 text-center">
                    ¿Te gustó el contenido? Tu apoyo nos motiva 💜
                  </p>

                  {/* Montos */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {tipAmounts.map((amount) => (
                      <button
                        key={amount.value}
                        onClick={() => setSelectedAmount(amount.value)}
                        className={`
                          p-4 rounded-lg font-medium transition-all
                          ${selectedAmount === amount.value
                            ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 border border-white/10'
                            : 'bg-white/[0.02] text-gray-400 hover:bg-white/[0.05] border border-white/5'
                          }
                        `}
                      >
                        <div className="text-xl mb-1">{amount.emoji}</div>
                        <div className="text-base font-semibold">{amount.label}</div>
                      </button>
                    ))}
                  </div>

                  {/* Monto personalizado */}
                  <input
                    type="number"
                    placeholder="Otra cantidad..."
                    value={selectedAmount && !tipAmounts.find(a => a.value === selectedAmount) ? selectedAmount : ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > 0) setSelectedAmount(value);
                    }}
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-violet-500 focus:outline-none transition-colors"
                  />

                  {/* Botón enviar */}
                  <button
                    onClick={handleSendTip}
                    disabled={!selectedAmount}
                    className={`
                      w-full py-3 rounded-lg font-medium transition-all
                      ${selectedAmount
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:scale-[1.02] shadow-lg shadow-violet-500/30'
                        : 'bg-white/[0.02] text-gray-600 cursor-not-allowed border border-white/5'
                      }
                    `}
                  >
                    {selectedAmount ? (
                      <span className="flex items-center justify-center gap-2">
                        <Heart className="w-4 h-4" fill="currentColor" />
                        Enviar ${selectedAmount}
                      </span>
                    ) : (
                      'Selecciona un monto'
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-600">
                    Procesado de forma segura • 100% voluntario
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg mx-auto" />
          <h1 className="text-3xl font-bold text-white">Footer Minimalista</h1>
          <p className="text-gray-500 text-sm max-w-md">
            Diseño sutil y elegante para 2025
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}