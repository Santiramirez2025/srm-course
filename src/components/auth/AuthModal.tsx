import React, { useState, useCallback } from 'react';
import { X, Mail, Lock, Loader2, AlertCircle, Sparkles, Zap } from 'lucide-react';

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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
  }, [isLogin, email, password, onLogin, onRegister, onClose]);

  const handleGoogleLogin = useCallback(async () => {
    setError('');
    setLoading(true);
    
    const result = await onGoogleLogin();
    
    setLoading(false);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Error con Google');
    }
  }, [onGoogleLogin, onClose]);

  const toggleMode = useCallback(() => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
  }, [isLogin]);

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-black/80 via-purple-900/40 to-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-3xl max-w-md w-full p-8 md:p-10 shadow-2xl border border-white/10 backdrop-blur-2xl animate-slideUp my-auto">
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 rounded-3xl blur-xl opacity-20 animate-pulse" />
        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all w-12 h-12 rounded-xl hover:bg-white/10 flex items-center justify-center touch-manipulation backdrop-blur-sm group z-10"
          aria-label="Cerrar modal"
          disabled={loading}
          type="button"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        {/* Header */}
        <div className="text-center mb-8 relative">
          {/* Logo con efecto holográfico */}
          <div className="relative inline-block mb-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl blur-2xl opacity-60 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
              <Sparkles className="w-10 h-10 text-white relative z-10" />
            </div>
          </div>

          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 mb-2 leading-tight">
            {isLogin ? 'Bienvenido de Nuevo' : 'Únete a Nosotros'}
          </h2>
          <p className="text-gray-400 text-base font-medium">
            {isLogin ? 'Continúa tu viaje de aprendizaje' : 'Comienza tu aventura educativa'}
          </p>
        </div>

        {/* Google Button Premium */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="relative w-full group overflow-hidden rounded-2xl mb-6 touch-manipulation"
          type="button"
          aria-label="Continuar con Google"
        >
          {/* Gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          
          {/* Button content */}
          <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl font-bold text-base text-white transition-all duration-300 backdrop-blur-sm min-h-[56px] group-active:scale-95">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continuar con Google</span>
              </>
            )}
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </button>

        {/* Divider Premium */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 text-gray-400 font-bold">
              O continúa con email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input Premium */}
          <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">
              <Mail className="w-4 h-4 text-purple-400" /> 
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 focus:outline-none transition-all text-white text-lg placeholder:text-gray-500 min-h-[56px] touch-manipulation backdrop-blur-sm"
                placeholder="tu@email.com"
                required
                disabled={loading}
                aria-label="Correo electrónico"
              />
              {/* Focus glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity" />
            </div>
          </div>

          {/* Password Input Premium */}
          <div className="relative group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-300 mb-2">
              <Lock className="w-4 h-4 text-purple-400" /> 
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl focus:border-purple-500 focus:bg-white/10 focus:outline-none transition-all text-white text-lg placeholder:text-gray-500 min-h-[56px] touch-manipulation backdrop-blur-sm"
                placeholder="••••••••"
                required
                minLength={6}
                disabled={loading}
                aria-label="Contraseña"
              />
              {/* Focus glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity" />
            </div>
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-2 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Mínimo 6 caracteres
              </p>
            )}
          </div>

          {/* Error Message Premium */}
          {error && (
            <div className="relative overflow-hidden rounded-xl bg-red-500/10 border-2 border-red-500/30 backdrop-blur-sm animate-shake">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent" />
              <div className="relative flex items-start gap-3 p-4 text-red-300 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          )}

          {/* Submit Button Premium */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full group overflow-hidden rounded-2xl touch-manipulation"
            aria-label={isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 opacity-100 group-hover:opacity-90 transition-opacity" />
            
            {/* Moving gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            
            {/* Button content */}
            <div className="relative py-4 font-black text-lg text-white shadow-2xl min-h-[56px] flex items-center justify-center gap-3 group-active:scale-95 transition-transform">
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                </>
              )}
            </div>

            {/* Bottom glow */}
            <div className="absolute -bottom-1 inset-x-0 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 blur-lg opacity-60" />
          </button>
        </form>

        {/* Toggle Mode Premium */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="relative group inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all touch-manipulation overflow-hidden"
            disabled={loading}
            type="button"
          >
            {/* Hover background */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="relative">
              {isLogin ? (
                <>¿No tienes cuenta? <span className="text-purple-400 group-hover:text-purple-300">Regístrate</span></>
              ) : (
                <>¿Ya tienes cuenta? <span className="text-purple-400 group-hover:text-purple-300">Inicia sesión</span></>
              )}
            </span>
          </button>
        </div>

        {/* Decorative bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      </div>

      {/* Styles */}
      <style>{`
        /* Touch manipulation */
        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-shake {
          animation: shake 0.4s ease-out;
        }

        /* Prevent input zoom on iOS */
        @media (max-width: 768px) {
          input {
            font-size: 16px !important;
          }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
};