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

  const config = typeConfig[module.type];
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
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="bg-gray-200 h-32 sm:h-40" />
        <div className="p-6 sm:p-8 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
      {/* Success toast */}
      {showSuccessMessage && (
        <div className="fixed top-20 sm:top-24 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle size={20} />
          <span className="font-semibold text-sm">¡Módulo completado!</span>
        </div>
      )}

      {/* Header */}
      <header className={`bg-gradient-to-r ${config.gradient} p-4 sm:p-6 lg:p-8 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24" />
        </div>

        <div className="relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm mb-2 sm:mb-3">
            <BookOpen size={14} className="flex-shrink-0" />
            <span className="truncate">{module.chapterTitle}</span>
            <span>•</span>
            <span className="flex-shrink-0">{config.label}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-3 sm:mb-4">
                {module.title}
              </h1>

              {module.description && (
                <p className="text-white/90 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                  {module.description}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {module.duration && (
                  <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Clock size={14} className="flex-shrink-0" />
                    <span className="font-medium">{module.duration}</span>
                  </div>
                )}
                
                {estimatedReadTime() && (
                  <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <BookOpen size={14} className="flex-shrink-0" />
                    <span className="font-medium">{estimatedReadTime()} min lectura</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <span className="font-medium">
                    Módulo {currentModuleNumber} de {totalModules}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-start gap-2 flex-shrink-0">
              {/* Bookmark button - ✅ CORREGIDO */}
              <button
                onClick={handleBookmark}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-all flex items-center justify-center group"
                title={bookmarked ? 'Quitar marcador' : 'Marcar para después'}
                aria-label={bookmarked ? 'Quitar marcador' : 'Marcar para después'}
              >
                <Bookmark 
                  size={18} 
                  className={`sm:w-5 sm:h-5 group-hover:scale-110 transition-transform ${
                    bookmarked ? 'fill-current' : ''
                  }`}
                />
              </button>

              {/* Complete button */}
              <button 
                onClick={handleComplete}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all flex items-center justify-center group
                  ${completed 
                    ? 'bg-white text-green-600 shadow-lg scale-110' 
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white hover:scale-105'
                  }
                `}
                title={completed ? 'Completado' : 'Marcar como completado'}
                aria-label={completed ? 'Completado' : 'Marcar como completado'}
              >
                {completed ? (
                  <Check size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
                ) : (
                  <CheckCircle size={20} className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 sm:mt-6">
            <div className="flex items-center justify-between text-xs text-white/80 mb-2">
              <span>Progreso del curso</span>
              <span className="font-bold">
                {Math.round((currentModuleNumber / totalModules) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${(currentModuleNumber / totalModules) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8" ref={contentRef}>
        {/* Completion alert */}
        {completed && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fadeIn">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Check size={16} className="text-white" strokeWidth={3} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-green-900 text-sm sm:text-base">
                ¡Módulo completado!
              </h3>
              <p className="text-green-700 text-xs sm:text-sm mt-0.5">
                Continúa con el siguiente módulo para seguir aprendiendo
              </p>
            </div>
          </div>
        )}

        {/* Module content */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-6 sm:mb-8">
          {ContentComponent ? (
            <ContentComponent />
          ) : (
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {module.content as string}
            </div>
          )}
        </div>
        
        {/* Main material */}
        {module.driveUrl && (
          <button
            onClick={() => openLink(module.driveUrl!)}
            className={`
              w-full mb-6 p-4 sm:p-6 bg-gradient-to-br ${config.bgColor}
              border-2 ${config.borderColor} rounded-xl sm:rounded-2xl
              transition-all flex items-center gap-3 sm:gap-4 group hover:shadow-lg
            `}
          >
            <div className={`
              w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${config.gradient}
              rounded-xl flex items-center justify-center flex-shrink-0 shadow-md
              group-hover:scale-110 transition-transform
            `}>
              <TypeIcon size={24} className="sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 flex items-center gap-2">
                {module.type === 'video' ? 'Ver Video' : 'Abrir Material'}
                <Sparkles size={16} className="text-amber-500 flex-shrink-0" />
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {module.type === 'video' 
                  ? 'Contenido principal en video' 
                  : 'Material complementario del módulo'}
              </p>
            </div>
            <ExternalLink className="text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" size={20} />
          </button>
        )}

        {/* Resources */}
        {module.resources && module.resources.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="font-black text-gray-900 text-lg sm:text-xl mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>Recursos Adicionales</span>
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {module.resources.length}
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {module.resources.map((resource, index) => (
                <button
                  key={index}
                  onClick={() => openLink(resource.url)}
                  className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 hover:bg-amber-50 rounded-xl transition-all border border-gray-200 hover:border-amber-300 text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileText size={18} className="text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-amber-700 transition-colors">
                      {resource.title}
                    </p>
                    <p className="text-xs text-gray-500 uppercase mt-0.5">
                      {resource.type}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Secondary actions */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">Compartir</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between gap-4" aria-label="Navegación de módulos">
          <button 
            onClick={() => handleNavigation('prev')}
            disabled={!hasPrevious}
            className={`
              flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base
              transition-all group
              ${hasPrevious
                ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50 active:scale-95'
                : 'text-gray-300 cursor-not-allowed opacity-50'
              }
            `}
            aria-label="Módulo anterior"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <div className="text-xs sm:text-sm text-gray-500 font-semibold px-3 py-2 bg-gray-100 rounded-lg">
            {currentModuleNumber} / {totalModules}
          </div>

          <button 
            onClick={() => handleNavigation('next')}
            disabled={!hasNext}
            className={`
              flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base
              transition-all group
              ${hasNext
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-md hover:shadow-lg active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
              }
            `}
            aria-label="Módulo siguiente"
          >
            <span>Siguiente</span>
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </nav>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @media print {
          header button,
          nav,
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </article>
  );
};