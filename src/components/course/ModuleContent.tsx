// src/components/course/ModuleContent.tsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Play, FileText, Clock, CheckCircle, ChevronLeft, ChevronRight, 
  Check, ExternalLink, BookOpen, Share2, Printer,
  Bookmark, Award, Sparkles, Zap, TrendingUp
} from 'lucide-react';

interface Resource {
  title: string;
  url: string;
  type: 'pdf' | 'doc' | 'link' | 'video' | 'image';
}

interface Module {
  id: number;
  title: string;
  type: 'video' | 'document' | 'text' | 'game';
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

// Configuración de tipos memoizada fuera del componente
const TYPE_CONFIG = {
  video: {
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
    icon: Play,
    label: 'Video'
  },
  document: {
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    icon: FileText,
    label: 'Documento'
  },
  text: {
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    icon: BookOpen,
    label: 'Lectura'
  },
  game: {
    gradient: 'from-pink-600 via-rose-600 to-red-600',
    icon: Sparkles,
    label: 'Interactivo'
  }
} as const;

export const ModuleContent: React.FC<ModuleContentProps> = React.memo(({ 
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
  
  // Memoizar valores derivados
  const isComponentContent = useMemo(() => typeof module.content === 'function', [module.content]);
  const ContentComponent = useMemo(() => 
    isComponentContent ? (module.content as React.ComponentType<any>) : null,
    [isComponentContent, module.content]
  );

  const config = useMemo(() => 
    TYPE_CONFIG[module.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG.text,
    [module.type]
  );

  const TypeIcon = config.icon;

  const progressPercentage = useMemo(() => 
    Math.round((currentModuleNumber / totalModules) * 100),
    [currentModuleNumber, totalModules]
  );

  // Calcular tiempo de lectura estimado
  const estimatedReadTime = useMemo(() => {
    if (module.type === 'video' || !module.content || typeof module.content !== 'string') {
      return null;
    }
    const words = (module.content as string).split(/\s+/).length;
    return Math.ceil(words / 200);
  }, [module.type, module.content]);

  // Sincronizar estados con props
  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  // Reset scroll interno al cambiar módulo
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [module.id]);

  // Handlers memoizados
  const openLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleComplete = useCallback(() => {
    const newState = !completed;
    setCompleted(newState);
    
    if (onComplete && newState) {
      onComplete(module.id);
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [completed, onComplete, module.id]);

  const handleBookmark = useCallback(() => {
    const newState = !bookmarked;
    setBookmarked(newState);
    if (onBookmark) {
      onBookmark(module.id);
    }
  }, [bookmarked, onBookmark, module.id]);

  const handleNavigation = useCallback((direction: 'prev' | 'next') => {
    if (onNavigate) {
      onNavigate(direction);
    }
  }, [onNavigate]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: module.title,
          text: `Módulo: ${module.title}`,
          url: window.location.href
        });
      } catch (err) {
        // Usuario canceló el share
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  }, [module.title]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden animate-pulse">
        <div className="bg-white/5 h-48 sm:h-56 md:h-64" />
        <div className="p-6 sm:p-8 md:p-10 space-y-4">
          <div className="h-8 bg-white/5 rounded-xl w-3/4" />
          <div className="h-5 bg-white/5 rounded-lg w-full" />
          <div className="h-5 bg-white/5 rounded-lg w-5/6" />
          <div className="h-5 bg-white/5 rounded-lg w-4/6" />
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
      {/* Success Toast */}
      {showSuccessMessage && (
        <div className="fixed top-20 sm:top-24 right-4 sm:right-6 z-50 animate-fadeInUp">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-75 blur group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border border-green-400/30 min-h-[60px] max-w-[calc(100%-32px)] sm:max-w-none">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-black text-base sm:text-lg">¡Módulo completado!</p>
                <p className="text-xs sm:text-sm text-green-100">Seguí con el siguiente</p>
              </div>
              <Sparkles className="w-5 h-5 animate-pulse flex-shrink-0" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24 blur-3xl" />
        </div>

        {/* Grain Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' 
          }} 
        />

        <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/90 text-sm mb-4 sm:mb-5">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-semibold truncate">{module.chapterTitle}</span>
            <span className="text-white/60">•</span>
            <span className="flex-shrink-0 font-semibold">{config.label}</span>
          </div>

          <div className="flex items-start justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 sm:mb-6 animate-fadeIn">
                {module.title}
              </h1>

              {/* Description */}
              {module.description && (
                <p className="text-white/90 text-base sm:text-lg md:text-xl mb-5 sm:mb-6 leading-relaxed max-w-3xl">
                  {module.description}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3">
                {module.duration && (
                  <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/30 min-h-[44px] shadow-lg">
                    <Clock className="w-5 h-5 flex-shrink-0" />
                    <span className="font-bold text-sm sm:text-base">{module.duration}</span>
                  </div>
                )}
                
                {estimatedReadTime && (
                  <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/30 min-h-[44px] shadow-lg">
                    <BookOpen className="w-5 h-5 flex-shrink-0" />
                    <span className="font-bold text-sm sm:text-base">{estimatedReadTime} min</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/30 min-h-[44px] shadow-lg">
                  <TrendingUp className="w-5 h-5 flex-shrink-0" />
                  <span className="font-bold text-sm sm:text-base">
                    {currentModuleNumber}/{totalModules}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              <ActionButton
                onClick={handleBookmark}
                isActive={bookmarked}
                activeGradient="from-amber-500 to-orange-500"
                Icon={Bookmark}
                fillWhenActive
                ariaLabel={bookmarked ? 'Quitar marcador' : 'Agregar marcador'}
              />

              <ActionButton
                onClick={handleComplete}
                isActive={completed}
                activeGradient="from-green-500 to-emerald-500"
                Icon={completed ? Check : CheckCircle}
                iconSize={completed ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-7 h-7 sm:w-8 sm:h-8'}
                strokeWidth={completed ? 3 : undefined}
                animatePulse={completed}
                ariaLabel={completed ? 'Marcar como no completado' : 'Marcar como completado'}
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 sm:mt-8">
            <div className="flex items-center justify-between text-sm text-white/90 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold">Progreso del curso</span>
              </div>
              <span className="text-2xl font-black">{progressPercentage}%</span>
            </div>
            <ProgressBar progress={progressPercentage} />
          </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="p-6 sm:p-8 md:p-10 lg:p-12" ref={contentRef}>
        {/* Completion Alert */}
        {completed && (
          <CompletionAlert />
        )}

        {/* Module Content */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl prose-invert max-w-none mb-8 sm:mb-10 md:mb-12">
          {ContentComponent ? (
            <ContentComponent />
          ) : (
            <div className="text-gray-200 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {module.content as string}
            </div>
          )}
        </div>
        
        {/* Main Material */}
        {module.driveUrl && (
          <MainMaterialButton
            driveUrl={module.driveUrl}
            moduleType={module.type}
            gradient={config.gradient}
            TypeIcon={TypeIcon}
            onOpen={openLink}
          />
        )}

        {/* Resources */}
        {module.resources && module.resources.length > 0 && (
          <ResourcesList resources={module.resources} onOpen={openLink} />
        )}

        {/* Secondary Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-white/10">
          <SecondaryButton onClick={handleShare} Icon={Share2} label="Compartir" />
          <SecondaryButton onClick={handlePrint} Icon={Printer} label="Imprimir" />
        </div>

        {/* Navigation */}
        <Navigation
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          currentModuleNumber={currentModuleNumber}
          totalModules={totalModules}
          onNavigate={handleNavigation}
        />
      </div>

      {/* Safe Area Bottom */}
      <div className="safe-area-bottom" />

      <ModuleStyles />
    </article>
  );
});

ModuleContent.displayName = 'ModuleContent';

// ============================================================================
// SUB-COMPONENTS (Optimizados y extraídos)
// ============================================================================

interface ActionButtonProps {
  onClick: () => void;
  isActive: boolean;
  activeGradient: string;
  Icon: React.ElementType;
  fillWhenActive?: boolean;
  iconSize?: string;
  strokeWidth?: number;
  animatePulse?: boolean;
  ariaLabel: string;
}

const ActionButton = React.memo<ActionButtonProps>(({ 
  onClick, 
  isActive, 
  activeGradient, 
  Icon, 
  fillWhenActive,
  iconSize = 'w-7 h-7 sm:w-8 sm:h-8',
  strokeWidth,
  animatePulse,
  ariaLabel 
}) => (
  <button onClick={onClick} className="group relative" aria-label={ariaLabel}>
    <div className={`
      absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300
      ${isActive ? `bg-gradient-to-r ${activeGradient}` : 'bg-gradient-to-r from-purple-500 to-fuchsia-500'}
    `} />
    <div className={`
      relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl backdrop-blur-xl
      transition-all transform active:scale-95 flex items-center justify-center
      touch-manipulation shadow-xl border-2
      ${isActive
        ? `bg-gradient-to-br ${activeGradient} border-opacity-50 ${animatePulse ? 'animate-pulse' : ''}`
        : 'bg-white/20 border-white/30 hover:bg-white/30'
      }
    `}>
      <Icon 
        className={`${iconSize} transition-all ${
          isActive && fillWhenActive ? 'fill-white text-white' : 'text-white group-hover:scale-110'
        }`}
        strokeWidth={strokeWidth}
      />
    </div>
  </button>
));

ActionButton.displayName = 'ActionButton';

const ProgressBar = React.memo<{ progress: number }>(({ progress }) => (
  <div className="relative w-full bg-white/20 rounded-full h-3.5 overflow-hidden backdrop-blur-sm border border-white/30">
    <div
      className="h-full bg-white rounded-full transition-all duration-1000 ease-out relative"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      <div className="absolute inset-0 bg-white blur-sm opacity-50" />
    </div>
  </div>
));

ProgressBar.displayName = 'ProgressBar';

const CompletionAlert = React.memo(() => (
  <div className="mb-8 sm:mb-10 relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-xl" />
    <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-400/30 rounded-3xl p-6 sm:p-7 flex items-start gap-4 sm:gap-5 shadow-2xl animate-fadeIn">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
        <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="font-black text-white text-xl sm:text-2xl mb-2">
          ¡Módulo completado!
        </h3>
        <p className="text-green-200 text-base sm:text-lg leading-relaxed">
          Continuá con el siguiente módulo para seguir aprendiendo
        </p>
      </div>
      <Sparkles className="w-6 h-6 text-green-400 animate-pulse flex-shrink-0" />
    </div>
  </div>
));

CompletionAlert.displayName = 'CompletionAlert';

interface MainMaterialButtonProps {
  driveUrl: string;
  moduleType: string;
  gradient: string;
  TypeIcon: React.ElementType;
  onOpen: (url: string) => void;
}

const MainMaterialButton = React.memo<MainMaterialButtonProps>(({ 
  driveUrl, 
  moduleType, 
  gradient, 
  TypeIcon, 
  onOpen 
}) => (
  <div className="mb-8 sm:mb-10 relative group">
    <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500`} />
    
    <button
      onClick={() => onOpen(driveUrl)}
      className="relative w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-white/30 rounded-3xl transition-all group/btn shadow-2xl hover:shadow-3xl min-h-[100px] sm:min-h-[112px] active:scale-[0.98] touch-manipulation p-6 sm:p-7"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <div className={`
          relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${gradient}
          rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl
          group-hover/btn:scale-110 transition-transform duration-300
        `}>
          <TypeIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-50 blur-xl animate-pulse`} />
        </div>
        
        <div className="flex-1 text-left min-w-0">
          <h3 className="font-black text-white text-xl sm:text-2xl md:text-3xl mb-2 flex items-center gap-3 flex-wrap">
            {moduleType === 'video' ? 'Ver Video Principal' : 'Abrir Material'}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-sm font-bold text-amber-300">
              <Zap className="w-4 h-4" />
              Recomendado
            </span>
          </h3>
          <p className="text-base sm:text-lg text-gray-300 line-clamp-1">
            {moduleType === 'video' 
              ? 'Contenido principal en video' 
              : 'Material complementario del módulo'}
          </p>
        </div>
        
        <ExternalLink className="text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7" />
      </div>
    </button>
  </div>
));

MainMaterialButton.displayName = 'MainMaterialButton';

interface ResourcesListProps {
  resources: Resource[];
  onOpen: (url: string) => void;
}

const ResourcesList = React.memo<ResourcesListProps>(({ resources, onOpen }) => (
  <div className="mb-8 sm:mb-10 md:mb-12">
    <div className="flex items-center gap-3 sm:gap-4 mb-6">
      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
        <FileText className="w-7 h-7 text-white" />
      </div>
      <div>
        <h3 className="font-black text-white text-2xl sm:text-3xl">
          Recursos Adicionales
        </h3>
        <p className="text-gray-400 text-sm sm:text-base">
          {resources.length} recurso{resources.length !== 1 ? 's' : ''} disponible{resources.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      {resources.map((resource, index) => (
        <ResourceItem key={index} resource={resource} onOpen={onOpen} />
      ))}
    </div>
  </div>
));

ResourcesList.displayName = 'ResourcesList';

interface ResourceItemProps {
  resource: Resource;
  onOpen: (url: string) => void;
}

const ResourceItem = React.memo<ResourceItemProps>(({ resource, onOpen }) => (
  <button
    onClick={() => onOpen(resource.url)}
    className="group/resource relative"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover/resource:opacity-30 blur transition-opacity duration-300" />
    
    <div className="relative flex items-center gap-4 p-5 sm:p-6 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl transition-all border-2 border-white/10 hover:border-blue-400/30 min-h-[88px] sm:min-h-[96px] active:scale-[0.98] touch-manipulation shadow-lg hover:shadow-2xl">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 group-hover/resource:scale-110 transition-transform shadow-lg">
        <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-base sm:text-lg font-bold text-white line-clamp-1 group-hover/resource:text-blue-300 transition-colors mb-1">
          {resource.title}
        </p>
        <p className="text-xs sm:text-sm text-gray-400 uppercase font-semibold">
          {resource.type}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover/resource:text-blue-400 group-hover/resource:translate-x-1 transition-all flex-shrink-0" />
    </div>
  </button>
));

ResourceItem.displayName = 'ResourceItem';

interface SecondaryButtonProps {
  onClick: () => void;
  Icon: React.ElementType;
  label: string;
}

const SecondaryButton = React.memo<SecondaryButtonProps>(({ onClick, Icon, label }) => (
  <button onClick={onClick} className="group/action relative">
    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl opacity-0 group-hover/action:opacity-30 blur transition-opacity" />
    <div className="relative flex items-center gap-2 px-5 py-3 text-base font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all min-h-[48px] active:scale-95 touch-manipulation border border-white/10 hover:border-purple-400/30">
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span>{label}</span>
    </div>
  </button>
));

SecondaryButton.displayName = 'SecondaryButton';

interface NavigationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  currentModuleNumber: number;
  totalModules: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const Navigation = React.memo<NavigationProps>(({ 
  hasPrevious, 
  hasNext, 
  currentModuleNumber, 
  totalModules, 
  onNavigate 
}) => (
  <nav className="flex items-center justify-between gap-4" aria-label="Navegación de módulos">
    {/* Previous Button */}
    <button 
      onClick={() => onNavigate('prev')}
      disabled={!hasPrevious}
      className={`
        group relative flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-base
        transition-all touch-manipulation min-h-[56px]
        ${hasPrevious
          ? 'text-white bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-purple-400/50 active:scale-95'
          : 'text-gray-600 cursor-not-allowed opacity-40 bg-white/5 border-2 border-white/10'
        }
      `}
      aria-label="Módulo anterior"
    >
      {hasPrevious && (
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity" />
      )}
      <ChevronLeft className="relative w-6 h-6 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
      <span className="relative">Anterior</span>
    </button>

    {/* Current Module Indicator */}
    <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 min-h-[48px] flex items-center">
      <span className="text-base font-black text-white">
        {currentModuleNumber} / {totalModules}
      </span>
    </div>

    {/* Next Button */}
    <button 
      onClick={() => onNavigate('next')}
      disabled={!hasNext}
      className={`
        group relative flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-base
        transition-all touch-manipulation min-h-[56px]
        ${hasNext
          ? 'text-white shadow-2xl active:scale-95'
          : 'text-gray-600 cursor-not-allowed opacity-40 bg-white/5 border-2 border-white/10'
        }
      `}
      aria-label="Módulo siguiente"
    >
      {hasNext && (
        <>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-2xl" />
        </>
      )}
      <span className="relative">Siguiente</span>
      <ChevronRight className="relative w-6 h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
    </button>
  </nav>
));

Navigation.displayName = 'Navigation';

// ============================================================================
// STYLES COMPONENT
// ============================================================================

const ModuleStyles = React.memo(() => (
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

    /* Animations */
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-shimmer {
      animation: shimmer 3s infinite;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.5s ease-out;
    }

    /* Line clamp */
    .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Prose styling for dark theme */
    .prose-invert {
      color: rgba(229, 231, 235, 1);
    }

    .prose-invert h1,
    .prose-invert h2,
    .prose-invert h3,
    .prose-invert h4 {
      color: white;
    }

    .prose-invert strong {
      color: white;
    }

    .prose-invert a {
      color: rgba(168, 85, 247, 1);
    }

    .prose-invert code {
      color: rgba(196, 181, 253, 1);
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
  `}</style>
));

ModuleStyles.displayName = 'ModuleStyles';