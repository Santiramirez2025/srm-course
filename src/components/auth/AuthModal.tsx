import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  onRegister: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  onGoogleLogin: () => Promise<{ success: boolean; error: string | null }>; // ✨ NUEVO
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  onClose, 
  onLogin, 
  onRegister,
  onGoogleLogin // ✨ NUEVO
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

  // ✨ NUEVO: Handler para Google
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-slideUp">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
          disabled={loading}
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-black text-2xl">S</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
          </h2>
          <p className="text-gray-600 text-sm">
            {isLogin ? 'Continúa tu aprendizaje' : 'Comienza tu viaje de aprendizaje'}
          </p>
        </div>

        {/* ✨ NUEVO: Botón de Google - PRIMERO */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group mb-6"
          type="button"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar con Google</span>
            </>
          )}
        </button>

        {/* Divisor */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">O continúa con email</span>
          </div>
        </div>

        {/* Formulario de Email/Password */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Mail size={16} className="text-amber-600" /> 
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="tu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Lock size={16} className="text-amber-600" /> 
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="••••••••"
              required
              minLength={6}
              disabled={loading}
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-shake">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Procesando...</span>
              </>
            ) : (
              <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm text-gray-600 hover:text-amber-600 transition-colors font-medium"
            disabled={loading}
          >
            {isLogin ? (
              <>¿No tienes cuenta? <span className="font-bold">Regístrate</span></>
            ) : (
              <>¿Ya tienes cuenta? <span className="font-bold">Inicia sesión</span></>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
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
          animation: slideUp 0.3s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};