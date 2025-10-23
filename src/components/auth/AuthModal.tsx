import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  onRegister: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  onGoogleLogin: () => Promise<{ success: boolean; error: string | null }>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  onClose, 
  onLogin, 
  onRegister,
  onGoogleLogin
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = isLogin 
      ? await onLogin(email, password)
      : await onRegister(email, password);

    setLoading(false);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Error desconocido');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    
    const result = await onGoogleLogin();
    
    setLoading(false);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Error con Google');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      {/* Safe Area Top */}
      <div className="safe-area-top" />

      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-6 sm:p-8 md:p-10 relative shadow-2xl animate-slideUp my-auto">
        {/* Close button - TOUCH TARGET OPTIMIZADO */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors w-11 h-11 sm:w-12 sm:h-12 rounded-xl hover:bg-gray-100 flex items-center justify-center touch-manipulation min-h-[44px]"
          aria-label="Cerrar modal"
          disabled={loading}
          type="button"
        >
          <X size={24} className="sm:w-7 sm:h-7" />
        </button>
        
        {/* Header - RESPONSIVE */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
            <span className="text-white font-black text-2xl sm:text-3xl">S</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
            {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {isLogin ? 'Continúa tu aprendizaje' : 'Comienza tu viaje de aprendizaje'}
          </p>
        </div>

        {/* Botón de Google - TOUCH TARGET OPTIMIZADO */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5 sm:py-4 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group mb-5 sm:mb-6 touch-manipulation active:scale-95 min-h-[52px] sm:min-h-[56px]"
          type="button"
          aria-label="Continuar con Google"
        >
          {loading ? (
            <Loader2 size={20} className="sm:w-6 sm:h-6 animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar con Google</span>
            </>
          )}
        </button>

        {/* Divisor - MEJORADO */}
        <div className="relative mb-5 sm:mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-3 sm:px-4 bg-white text-gray-500 font-semibold">O continúa con email</span>
          </div>
        </div>

        {/* Formulario de Email/Password - OPTIMIZADO */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email Input */}
          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
              <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-amber-600 flex-shrink-0" /> 
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all text-base sm:text-lg min-h-[52px] sm:min-h-[56px] touch-manipulation"
              placeholder="tu@email.com"
              required
              disabled={loading}
              aria-label="Correo electrónico"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-700 mb-2">
              <Lock size={16} className="sm:w-[18px] sm:h-[18px] text-amber-600 flex-shrink-0" /> 
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all text-base sm:text-lg min-h-[52px] sm:min-h-[56px] touch-manipulation"
              placeholder="••••••••"
              required
              minLength={6}
              disabled={loading}
              aria-label="Contraseña"
            />
            {!isLogin && (
              <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">Mínimo 6 caracteres</p>
            )}
          </div>

          {/* Error Message - MEJORADO */}
          {error && (
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl text-red-700 text-sm sm:text-base animate-shake">
              <AlertCircle size={18} className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Submit Button - TOUCH TARGET OPTIMIZADO */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 sm:gap-3 min-h-[52px] sm:min-h-[56px] touch-manipulation"
            aria-label={isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="sm:w-6 sm:h-6 animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
            )}
          </button>
        </form>

        {/* Toggle Login/Register - TOUCH TARGET OPTIMIZADO */}
        <div className="mt-5 sm:mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm sm:text-base text-gray-600 hover:text-amber-600 transition-colors font-medium inline-flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-amber-50 touch-manipulation min-h-[44px]"
            disabled={loading}
            type="button"
          >
            {isLogin ? (
              <>¿No tienes cuenta? <span className="font-bold">Regístrate</span></>
            ) : (
              <>¿Ya tienes cuenta? <span className="font-bold">Inicia sesión</span></>
            )}
          </button>
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

        /* Animaciones */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-shake {
          animation: shake 0.3s ease-out;
        }

        /* Prevent input zoom on iOS */
        @media (max-width: 768px) {
          input {
            font-size: 16px !important;
          }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-slideUp,
          .animate-shake,
          .hover\\:scale-\\[1\\.02\\],
          .active\\:scale-95 {
            animation: none !important;
            transform: none !important;
          }
        }

        /* Optimización para pantallas muy pequeñas */
        @media (max-width: 360px) {
          .text-2xl {
            font-size: 1.375rem;
          }
        }
      `}</style>
    </div>
  );
};