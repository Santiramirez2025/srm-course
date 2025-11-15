// src/components/common/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

// ============================================
// TYPES
// ============================================
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// ============================================
// ERROR BOUNDARY CLASS COMPONENT
// ============================================
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Actualizar el estado para que el siguiente render muestre la UI de error
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log del error a un servicio de reporte (ej: Sentry, LogRocket)
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
    
    // Actualizar estado con información detallada
    this.setState({
      error,
      errorInfo,
    });

    // Callback personalizado si se proporciona
    this.props.onError?.(error, errorInfo);

    // Opcional: Enviar a servicio de monitoreo
    if (import.meta.env.PROD) {
      this.logErrorToService(error, errorInfo);
    }
  }

  // Método para enviar errores a servicios externos
  private logErrorToService(error: Error, errorInfo: ErrorInfo): void {
    // Ejemplo: Sentry.captureException(error, { extra: errorInfo });
    // Ejemplo: LogRocket.captureException(error);
    
    // Por ahora solo console para desarrollo
    console.log('📤 Error enviado a servicio de monitoreo:', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  }

  // Reset del error boundary
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    
    this.props.onReset?.();
  };

  // Recargar página completa
  handleReload = (): void => {
    window.location.reload();
  };

  // Volver al inicio
  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Si hay un fallback personalizado, usarlo
      if (fallback) {
        return fallback;
      }

      // UI de error por defecto
      return (
        <DefaultErrorFallback
          error={error}
          errorInfo={errorInfo}
          onReset={this.handleReset}
          onReload={this.handleReload}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return children;
  }
}

// ============================================
// DEFAULT ERROR FALLBACK UI
// ============================================
interface DefaultErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  onReset: () => void;
  onReload: () => void;
  onGoHome: () => void;
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({
  error,
  errorInfo,
  onReset,
  onReload,
  onGoHome,
}) => {
  const isDevelopment = import.meta.env.DEV;

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950 flex items-center justify-center p-4 sm:p-6"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-2xl w-full">
        {/* Card principal */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-red-500/20 shadow-2xl shadow-red-500/10 p-6 sm:p-8 space-y-6">
          
          {/* Header con icono */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
                ¡Oops! Algo salió mal
              </h1>
              <p className="text-slate-300 text-sm sm:text-base">
                Lo sentimos, hemos encontrado un error inesperado. Nuestro equipo ha sido notificado.
              </p>
            </div>
          </div>

          {/* Mensaje de error (solo en desarrollo) */}
          {isDevelopment && error && (
            <div className="bg-slate-950/50 rounded-lg p-4 border border-red-500/30">
              <h2 className="text-red-400 font-semibold text-sm mb-2">
                Detalles del Error (Modo Desarrollo)
              </h2>
              <pre className="text-red-300/80 text-xs overflow-x-auto whitespace-pre-wrap break-words">
                {error.toString()}
              </pre>
              
              {errorInfo?.componentStack && (
                <details className="mt-3">
                  <summary className="text-red-400/70 text-xs cursor-pointer hover:text-red-400 transition-colors">
                    Ver stack trace completo
                  </summary>
                  <pre className="text-red-300/60 text-xs mt-2 overflow-x-auto whitespace-pre-wrap break-words">
                    {errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40"
              type="button"
            >
              <RefreshCw className="w-4 h-4" />
              Intentar de nuevo
            </button>

            <button
              onClick={onGoHome}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200 border border-slate-700"
              type="button"
            >
              <Home className="w-4 h-4" />
              Volver al inicio
            </button>

            <button
              onClick={onReload}
              className="sm:w-auto px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-200 border border-slate-700/50"
              type="button"
            >
              Recargar página
            </button>
          </div>

          {/* Footer informativo */}
          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-400 text-xs sm:text-sm text-center">
              Si el problema persiste, por favor contacta con soporte técnico
            </p>
          </div>
        </div>

        {/* Tips adicionales */}
        <div className="mt-6 bg-slate-900/40 backdrop-blur-sm rounded-lg p-4 border border-slate-800">
          <h3 className="text-white font-semibold text-sm mb-2">
            💡 Sugerencias
          </h3>
          <ul className="text-slate-400 text-xs sm:text-sm space-y-1">
            <li>• Intenta recargar la página</li>
            <li>• Verifica tu conexión a internet</li>
            <li>• Limpia la caché del navegador</li>
            <li>• Actualiza la página con Ctrl+Shift+R (Cmd+Shift+R en Mac)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HOOK HELPER - Para usar error boundary funcionalmente
// ============================================
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return setError;
};

// ============================================
// EXPORTS
// ============================================
export default ErrorBoundary;