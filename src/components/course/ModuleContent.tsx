import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, FileText, Clock, CheckCircle, ChevronLeft, ChevronRight, 
  Check, ExternalLink, BookOpen, Share2, Printer,
  Bookmark, AlertCircle, Sparkles
} from 'lucide-react';

interface Resource {
  title: string;
  url: string;
  type: 'pdf' | 'doc' | 'link' | 'video' | 'image';
}

interface Module {
  id: number;
  title: string;
  type: 'video' | 'document' | 'text';
  content: React.ComponentType<any> | string;
  driveUrl?: string;
  duration?: string;
  resources?: Resource[];
  description?: string;
}

interface ModuleContentProps {
  module: Module & { chapterTitle: string };
  onComplete?: (moduleId: number) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  onBookmark?: (moduleId: number) => void;
  isCompleted?: boolean;
  isBookmarked?: boolean;
  hasPrevious?: boolean;
  hasNext?: boolean;
  currentModuleNumber?: number;
  totalModules?: number;
  isLoading?: boolean;
}

export const ModuleContent: React.FC<ModuleContentProps> = ({ 
  module,
  onComplete,
  onNavigate,
  onBookmark,
  isCompleted = false,
  isBookmarked = false,
  hasPrevious = false,
  hasNext = true,
  currentModuleNumber = 1,
  totalModules = 1,
  isLoading = false
}) => {
  const [completed, setCompleted] = useState(isCompleted);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isComponentContent = typeof module.content === 'function';
  const ContentComponent = isComponentContent ? (module.content as React.ComponentType<any>) : null;

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const estimatedReadTime = () => {
    if (module.type === 'video' || !module.content || typeof module.content !== 'string') return null;
    const words = (module.content as string).split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  const typeConfig = {
    video: {
      gradient: 'from-purple-500 via-purple-600 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200 hover:border-purple-300',
      icon: Play,
      iconBg: 'bg-purple-500',
      label: 'Video'
    },
    document: {
      gradient: 'from-blue-500 via-blue-600 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200 hover:border-blue-300',
      icon: FileText,
      iconBg: 'bg-blue-500',
      label: 'Documento'
    },
    text: {
      gradient: 'from-green-500 via-green-600 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200 hover:border-green-300',
      icon: BookOpen,
      iconBg: 'bg-green-500',
      label: 'Lectura'
    }
  };

  const config = typeConfig[module.type as keyof typeof typeConfig] ?? typeConfig.text;
const TypeIcon = config.icon;

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleComplete = () => {
    const newState = !completed;
    setCompleted(newState);
    
    if (onComplete && newState) {
      onComplete(module.id);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleBookmark = () => {
    const newState = !bookmarked;
    setBookmarked(newState);
    if (onBookmark) {
      onBookmark(module.id);
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (onNavigate) {
      onNavigate(direction);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: module.title,
          text: `Módulo: ${module.title}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="bg-gray-200 h-32 sm:h-40 md:h-48" />
        <div className="p-5 sm:p-6 md:p-8 space-y-4">
          <div className="h-6 sm:h-7 bg-gray-200 rounded-lg w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Success toast - MEJORADO */}
      {showSuccessMessage && (
        <div className="fixed top-20 sm:top-24 right-3 sm:right-4 z-50 bg-green-500 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2 sm:gap-3 animate-fadeInUp min-h-[48px] max-w-[calc(100%-24px)] sm:max-w-none">
          <CheckCircle size={20} className="sm:w-6 sm:h-6 flex-shrink-0" />
          <span className="font-semibold text-sm sm:text-base">¡Módulo completado!</span>
        </div>
      )}

      {/* Header - OPTIMIZADO */}
      <header className={`bg-gradient-to-r ${config.gradient} p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32" />
          <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-white rounded-full -ml-16 sm:-ml-24 -mb-16 sm:-mb-24" />
        </div>

        <div className="relative">
          {/* Breadcrumb - MEJORADO */}
          <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
            <BookOpen size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{module.chapterTitle}</span>
            <span>•</span>
            <span className="flex-shrink-0">{config.label}</span>
          </div>

          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              {/* Título - RESPONSIVE */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 sm:mb-4">
                {module.title}
              </h1>

              {/* Descripción - MEJORADA */}
              {module.description && (
                <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4 sm:mb-5 leading-relaxed">
                  {module.description}
                </p>
              )}

              {/* Metadata - TOUCH TARGETS OPTIMIZADOS */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {module.duration && (
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-sm min-h-[36px] sm:min-h-[40px]">
                    <Clock size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="font-medium">{module.duration}</span>
                  </div>
                )}
                
                {estimatedReadTime() && (
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-sm min-h-[36px] sm:min-h-[40px]">
                    <BookOpen size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="font-medium">{estimatedReadTime()} min lectura</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-sm min-h-[36px] sm:min-h-[40px]">
                  <span className="font-medium">
                    Módulo {currentModuleNumber} de {totalModules}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons - TOUCH TARGETS PERFECTOS */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              {/* Bookmark button - 48x48px */}
              <button
                onClick={handleBookmark}
                className={`
                  w-12 h-12 sm:w-13 sm:h-13 rounded-xl backdrop-blur-sm
                  transition-all transform active:scale-95 flex items-center justify-center
                  touch-manipulation group
                  ${bookmarked
                    ? 'bg-amber-500 shadow-lg'
                    : 'bg-white/10 hover:bg-white/20'
                  }
                `}
                title={bookmarked ? 'Guardado' : 'Guardar'}
                aria-label={bookmarked ? 'Módulo guardado' : 'Guardar módulo'}
              >
                <Bookmark 
                  size={20} 
                  className={`sm:w-6 sm:h-6 transition-all ${bookmarked ? 'fill-white text-white' : 'text-white group-hover:scale-110'}`}
                />
              </button>

              {/* Complete button - 48x48px */}
              <button
                onClick={handleComplete}
                className={`
                  w-12 h-12 sm:w-13 sm:h-13 rounded-xl backdrop-blur-sm
                  transition-all transform active:scale-95 flex items-center justify-center
                  touch-manipulation group
                  ${completed
                    ? 'bg-green-500 shadow-lg'
                    : 'bg-white/10 hover:bg-white/20'
                  }
                `}
                title={completed ? 'Completado' : 'Marcar como completado'}
                aria-label={completed ? 'Módulo completado' : 'Marcar como completado'}
              >
                {completed ? (
                  <Check size={22} className="sm:w-7 sm:h-7 text-white" strokeWidth={3} />
                ) : (
                  <CheckCircle size={22} className="sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {/* Progress bar - MÁS GRUESA */}
          <div className="mt-5 sm:mt-6">
            <div className="flex items-center justify-between text-xs sm:text-sm text-white/80 mb-2">
              <span className="font-medium">Progreso del curso</span>
              <span className="font-bold">
                {Math.round((currentModuleNumber / totalModules) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 sm:h-3 overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${(currentModuleNumber / totalModules) * 100}%` }}
                role="progressbar"
                aria-valuenow={Math.round((currentModuleNumber / totalModules) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Content - OPTIMIZADO */}
      <div className="p-5 sm:p-6 md:p-8 lg:p-10" ref={contentRef}>
        {/* Completion alert - MEJORADO */}
        {completed && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl flex items-start gap-3 sm:gap-4 animate-fadeIn">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <Check size={18} className="sm:w-5 sm:h-5 text-white" strokeWidth={3} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 text-base sm:text-lg">
                ¡Módulo completado!
              </h3>
              <p className="text-green-700 text-sm sm:text-base mt-1">
                Continúa con el siguiente módulo para seguir aprendiendo
              </p>
            </div>
          </div>
        )}

        {/* Module content - MEJORADO */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none mb-6 sm:mb-8 md:mb-10">
          {ContentComponent ? (
            <ContentComponent />
          ) : (
            <div className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {module.content as string}
            </div>
          )}
        </div>
        
        {/* Main material - TOUCH TARGET OPTIMIZADO */}
        {module.driveUrl && (
          <button
            onClick={() => openLink(module.driveUrl!)}
            className={`
              w-full mb-6 sm:mb-8 p-5 sm:p-6 bg-gradient-to-br ${config.bgColor}
              border-2 ${config.borderColor} rounded-xl sm:rounded-2xl
              transition-all flex items-center gap-3 sm:gap-4 group hover:shadow-xl
              min-h-[80px] sm:min-h-[88px] active:scale-[0.98] touch-manipulation
            `}
          >
            <div className={`
              w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${config.gradient}
              rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg
              group-hover:scale-110 transition-transform
            `}>
              <TypeIcon size={26} className="sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg md:text-xl mb-1 flex items-center gap-2">
                {module.type === 'video' ? 'Ver Video' : 'Abrir Material'}
                <Sparkles size={18} className="sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
              </h3>
              <p className="text-sm sm:text-base text-gray-600 line-clamp-1">
                {module.type === 'video' 
                  ? 'Contenido principal en video' 
                  : 'Material complementario del módulo'}
              </p>
            </div>
            <ExternalLink className="text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" size={22} />
          </button>
        )}

        {/* Resources - TOUCH TARGETS OPTIMIZADOS */}
        {module.resources && module.resources.length > 0 && (
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h3 className="font-black text-gray-900 text-lg sm:text-xl md:text-2xl mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl">📚</span>
              <span>Recursos Adicionales</span>
              <span className="text-sm sm:text-base font-normal text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {module.resources.length}
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {module.resources.map((resource, index) => (
                <button
                  key={index}
                  onClick={() => openLink(resource.url)}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 hover:bg-amber-50 rounded-xl sm:rounded-2xl transition-all border-2 border-gray-200 hover:border-amber-300 text-left group min-h-[72px] sm:min-h-[80px] active:scale-[0.98] touch-manipulation"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <FileText size={20} className="sm:w-6 sm:h-6 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
                      {resource.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 uppercase mt-1">
                      {resource.type}
                    </p>
                  </div>
                  <ChevronRight size={18} className="sm:w-5 sm:h-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Secondary actions - TOUCH TARGETS OPTIMIZADOS */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all min-h-[44px] active:scale-95 touch-manipulation"
            aria-label="Compartir módulo"
          >
            <Share2 size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Compartir</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all min-h-[44px] active:scale-95 touch-manipulation"
            aria-label="Imprimir módulo"
          >
            <Printer size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Imprimir</span>
          </button>
        </div>

        {/* Navigation - TOUCH TARGETS PERFECTOS */}
        <nav className="flex items-center justify-between gap-3 sm:gap-4" aria-label="Navegación de módulos">
          {/* Botón Anterior - MEJORADO */}
          <button 
            onClick={() => handleNavigation('prev')}
            disabled={!hasPrevious}
            className={`
              flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base
              transition-all group touch-manipulation
              min-h-[48px] sm:min-h-[52px]
              ${hasPrevious
                ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50 active:scale-95 border-2 border-gray-200 hover:border-amber-300'
                : 'text-gray-300 cursor-not-allowed opacity-50 border-2 border-gray-200'
              }
            `}
            aria-label="Módulo anterior"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform flex-shrink-0" />
            <span>Anterior</span>
          </button>

          {/* Indicador módulo actual - MEJORADO */}
          <div className="text-sm sm:text-base text-gray-500 font-bold px-4 py-2.5 sm:py-3 bg-gray-100 rounded-xl min-h-[44px] flex items-center">
            {currentModuleNumber} / {totalModules}
          </div>

          {/* Botón Siguiente - MEJORADO */}
          <button 
            onClick={() => handleNavigation('next')}
            disabled={!hasNext}
            className={`
              flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base
              transition-all group touch-manipulation
              min-h-[48px] sm:min-h-[52px]
              ${hasNext
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-md hover:shadow-xl active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              }
            `}
            aria-label="Módulo siguiente"
          >
            <span>Siguiente</span>
            <ChevronRight size={20} className="sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </button>
        </nav>
      </div>

      {/* Safe Area Bottom */}
      <div className="safe-area-bottom" />

      {/* Styles */}
      <style>{`
        /* Safe Area Support */
        .safe-area-bottom {
          height: env(safe-area-inset-bottom);
        }

        /* Touch manipulation */
        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Animaciones */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }

        /* Line clamp */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Print styles */
        @media print {
          header button,
          nav,
          .no-print {
            display: none !important;
          }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Optimización para pantallas muy pequeñas */
        @media (max-width: 360px) {
          .text-2xl {
            font-size: 1.375rem;
          }
        }
      `}</style>
    </article>
  );
};