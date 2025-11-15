import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Play, FileText, Clock, CheckCircle, ChevronLeft, ChevronRight, 
  Check, ExternalLink, BookOpen, Share2, Printer,
  Bookmark, Award, Sparkles, Zap, TrendingUp
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

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

// ============================================================================
// CONSTANTS
// ============================================================================

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

const READING_SPEED_WPM = 200;
const SUCCESS_MESSAGE_DURATION = 3000;
const GRAIN_TEXTURE_SVG = 'data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const calculateReadTime = (content: string | React.ComponentType<any>, type: string): number | null => {
  if (type === 'video' || typeof content !== 'string') return null;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / READING_SPEED_WPM);
};

const handleShareAction = async (title: string, url: string): Promise<void> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: `Módulo: ${title}`,
        url
      });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      alert('Enlace copiado al portapapeles');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

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
  // ========== State ==========
  const [completed, setCompleted] = useState(isCompleted);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // ========== Refs ==========
  const contentRef = useRef<HTMLDivElement>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout>>();
  
  // ========== Memoized Values ==========
  const isComponentContent = useMemo(() => 
    typeof module.content === 'function', 
    [module.content]
  );
  
  const ContentComponent = useMemo(() => 
    isComponentContent ? (module.content as React.ComponentType<any>) : null,
    [isComponentContent, module.content]
  );

  const config = useMemo(() => 
    TYPE_CONFIG[module.type] ?? TYPE_CONFIG.text,
    [module.type]
  );

  const TypeIcon = config.icon;

  const progressPercentage = useMemo(() => 
    Math.round((currentModuleNumber / totalModules) * 100),
    [currentModuleNumber, totalModules]
  );

  const estimatedReadTime = useMemo(() => 
    calculateReadTime(module.content, module.type),
    [module.content, module.type]
  );

  // ========== Effects ==========
  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [module.id]);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  // ========== Handlers ==========
  const openLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleComplete = useCallback(() => {
    const newState = !completed;
    setCompleted(newState);
    
    if (onComplete && newState) {
      onComplete(module.id);
      setShowSuccessMessage(true);
      
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
      
      successTimerRef.current = setTimeout(() => {
        setShowSuccessMessage(false);
      }, SUCCESS_MESSAGE_DURATION);
    }
  }, [completed, onComplete, module.id]);

  const handleBookmark = useCallback(() => {
    const newState = !bookmarked;
    setBookmarked(newState);
    onBookmark?.(module.id);
  }, [bookmarked, onBookmark, module.id]);

  const handleNavigation = useCallback((direction: 'prev' | 'next') => {
    onNavigate?.(direction);
  }, [onNavigate]);

  const handleShare = useCallback(() => 
    handleShareAction(module.title, window.location.href),
    [module.title]
  );

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // ========== Render Loading State ==========
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // ========== Main Render ==========
  return (
    <article 
      className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
      itemScope 
      itemType="https://schema.org/LearningResource"
    >
      {/* Success Toast */}
      <SuccessToast show={showSuccessMessage} />

      {/* Header */}
      <ModuleHeader
        module={module}
        config={config}
        TypeIcon={TypeIcon}
        estimatedReadTime={estimatedReadTime}
        progressPercentage={progressPercentage}
        currentModuleNumber={currentModuleNumber}
        totalModules={totalModules}
        completed={completed}
        bookmarked={bookmarked}
        onComplete={handleComplete}
        onBookmark={handleBookmark}
      />
      
      {/* Content */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12" ref={contentRef}>
        {/* Completion Alert */}
        {completed && <CompletionAlert />}

        {/* Module Content */}
        <div 
          className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl prose-invert max-w-none mb-6 sm:mb-8 md:mb-10"
          itemProp="educationalUse"
        >
          {ContentComponent ? (
            <ContentComponent />
          ) : (
            <div className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-line">
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
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10">
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
      <div className="h-[env(safe-area-inset-bottom)]" />

      <ModuleStyles />
    </article>
  );
});

ModuleContent.displayName = 'ModuleContent';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const LoadingSkeleton = React.memo(() => (
  <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden animate-pulse">
    <div className="bg-white/5 h-40 sm:h-48 md:h-56" />
    <div className="p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
      <div className="h-6 sm:h-8 bg-white/5 rounded-xl w-3/4" />
      <div className="h-4 sm:h-5 bg-white/5 rounded-lg w-full" />
      <div className="h-4 sm:h-5 bg-white/5 rounded-lg w-5/6" />
      <div className="h-4 sm:h-5 bg-white/5 rounded-lg w-4/6" />
    </div>
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

const SuccessToast = React.memo<{ show: boolean }>(({ show }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed top-16 sm:top-20 right-4 sm:right-6 z-50 animate-fadeInUp"
      role="alert"
      aria-live="polite"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-75 blur" />
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-2 sm:gap-3 backdrop-blur-xl border border-green-400/30 max-w-[calc(100vw-2rem)]">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="font-black text-sm sm:text-base lg:text-lg truncate">¡Módulo completado!</p>
            <p className="text-xs sm:text-sm text-green-100 truncate">Seguí con el siguiente</p>
          </div>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse flex-shrink-0" />
        </div>
      </div>
    </div>
  );
});

SuccessToast.displayName = 'SuccessToast';

interface ModuleHeaderProps {
  module: Module & { chapterTitle: string };
  config: typeof TYPE_CONFIG[keyof typeof TYPE_CONFIG];
  TypeIcon: React.ElementType;
  estimatedReadTime: number | null;
  progressPercentage: number;
  currentModuleNumber: number;
  totalModules: number;
  completed: boolean;
  bookmarked: boolean;
  onComplete: () => void;
  onBookmark: () => void;
}

const ModuleHeader = React.memo<ModuleHeaderProps>(({
  module,
  config,
  TypeIcon,
  estimatedReadTime,
  progressPercentage,
  currentModuleNumber,
  totalModules,
  completed,
  bookmarked,
  onComplete,
  onBookmark
}) => (
  <header className="relative overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />
    
    {/* Decorative Elements */}
    <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-full -mr-24 sm:-mr-32 -mt-24 sm:-mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-36 h-36 sm:w-48 sm:h-48 bg-white rounded-full -ml-18 sm:-ml-24 -mb-18 sm:-mb-24 blur-3xl" />
    </div>

    {/* Grain Texture */}
    <div 
      className="absolute inset-0 opacity-[0.03] pointer-events-none" 
      style={{ backgroundImage: `url("${GRAIN_TEXTURE_SVG}")` }}
      aria-hidden="true"
    />

    <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-white/90 text-xs sm:text-sm mb-3 sm:mb-4" aria-label="Navegación de ruta">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <span className="font-semibold truncate">{module.chapterTitle}</span>
        <span className="text-white/60" aria-hidden="true">•</span>
        <span className="flex-shrink-0 font-semibold">{config.label}</span>
      </nav>

      <div className="flex items-start justify-between gap-3 sm:gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-3 sm:mb-4 md:mb-6 animate-fadeIn"
            itemProp="name"
          >
            {module.title}
          </h1>

          {/* Description */}
          {module.description && (
            <p 
              className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 leading-relaxed max-w-3xl"
              itemProp="description"
            >
              {module.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {module.duration && (
              <MetadataBadge Icon={Clock} label={module.duration} />
            )}
            
            {estimatedReadTime && (
              <MetadataBadge Icon={BookOpen} label={`${estimatedReadTime} min`} />
            )}

            <MetadataBadge Icon={TrendingUp} label={`${currentModuleNumber}/${totalModules}`} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 sm:gap-3 flex-shrink-0">
          <ActionButton
            onClick={onBookmark}
            isActive={bookmarked}
            activeGradient="from-amber-500 to-orange-500"
            Icon={Bookmark}
            fillWhenActive
            ariaLabel={bookmarked ? 'Quitar marcador' : 'Agregar marcador'}
          />

          <ActionButton
            onClick={onComplete}
            isActive={completed}
            activeGradient="from-green-500 to-emerald-500"
            Icon={completed ? Check : CheckCircle}
            strokeWidth={completed ? 3 : undefined}
            animatePulse={completed}
            ariaLabel={completed ? 'Marcar como no completado' : 'Marcar como completado'}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5 sm:mt-6 md:mt-8">
        <div className="flex items-center justify-between text-xs sm:text-sm text-white/90 mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="font-bold">Progreso del curso</span>
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-black">{progressPercentage}%</span>
        </div>
        <ProgressBar progress={progressPercentage} />
      </div>
    </div>
  </header>
));

ModuleHeader.displayName = 'ModuleHeader';

const MetadataBadge = React.memo<{ Icon: React.ElementType; label: string }>(({ Icon, label }) => (
  <div className="flex items-center gap-1.5 sm:gap-2 text-white bg-white/20 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/30 shadow-lg">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
    <span className="font-bold text-xs sm:text-sm md:text-base">{label}</span>
  </div>
));

MetadataBadge.displayName = 'MetadataBadge';

interface ActionButtonProps {
  onClick: () => void;
  isActive: boolean;
  activeGradient: string;
  Icon: React.ElementType;
  fillWhenActive?: boolean;
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
  strokeWidth,
  animatePulse,
  ariaLabel 
}) => (
  <button 
    onClick={onClick} 
    className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl" 
    aria-label={ariaLabel}
    aria-pressed={isActive}
  >
    <div className={`
      absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300
      ${isActive ? `bg-gradient-to-r ${activeGradient}` : 'bg-gradient-to-r from-purple-500 to-fuchsia-500'}
    `} aria-hidden="true" />
    <div className={`
      relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl backdrop-blur-xl
      transition-all transform active:scale-95 flex items-center justify-center
      touch-manipulation shadow-xl border-2
      ${isActive
        ? `bg-gradient-to-br ${activeGradient} border-opacity-50 ${animatePulse ? 'animate-pulse' : ''}`
        : 'bg-white/20 border-white/30 hover:bg-white/30'
      }
    `}>
      <Icon 
        className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all ${
          isActive && fillWhenActive ? 'fill-white text-white' : 'text-white group-hover:scale-110'
        }`}
        strokeWidth={strokeWidth}
        aria-hidden="true"
      />
    </div>
  </button>
));

ActionButton.displayName = 'ActionButton';

const ProgressBar = React.memo<{ progress: number }>(({ progress }) => (
  <div className="relative w-full bg-white/20 rounded-full h-2.5 sm:h-3 md:h-3.5 overflow-hidden backdrop-blur-sm border border-white/30">
    <div
      className="h-full bg-white rounded-full transition-all duration-1000 ease-out relative"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progreso del curso: ${progress}%`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" aria-hidden="true" />
      <div className="absolute inset-0 bg-white blur-sm opacity-50" aria-hidden="true" />
    </div>
  </div>
));

ProgressBar.displayName = 'ProgressBar';

const CompletionAlert = React.memo(() => (
  <div className="mb-6 sm:mb-8 md:mb-10 relative group" role="status" aria-live="polite">
    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-30 blur-xl" aria-hidden="true" />
    <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-400/30 rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 flex items-start gap-3 sm:gap-4 md:gap-5 shadow-2xl animate-fadeIn">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
        <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-white text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">
          ¡Módulo completado!
        </h3>
        <p className="text-green-200 text-sm sm:text-base md:text-lg leading-relaxed">
          Continuá con el siguiente módulo para seguir aprendiendo
        </p>
      </div>
      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 animate-pulse flex-shrink-0" aria-hidden="true" />
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
  <div className="mb-6 sm:mb-8 md:mb-10 relative group">
    <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500`} aria-hidden="true" />
    
    <button
      onClick={() => onOpen(driveUrl)}
      className="relative w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-white/30 rounded-3xl transition-all group/btn shadow-2xl hover:shadow-3xl active:scale-[0.98] touch-manipulation p-4 sm:p-5 md:p-6 lg:p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={moduleType === 'video' ? 'Abrir video principal' : 'Abrir material principal'}
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        <div className={`
          relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${gradient}
          rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl
          group-hover/btn:scale-110 transition-transform duration-300
        `}>
          <TypeIcon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" aria-hidden="true" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-50 blur-xl animate-pulse`} aria-hidden="true" />
        </div>
        
        <div className="flex-1 text-left min-w-0">
          <h3 className="font-black text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3 flex-wrap">
            {moduleType === 'video' ? 'Ver Video Principal' : 'Abrir Material'}
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-xs sm:text-sm font-bold text-amber-300">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
              Recomendado
            </span>
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 line-clamp-1">
            {moduleType === 'video' 
              ? 'Contenido principal en video' 
              : 'Material complementario del módulo'}
          </p>
        </div>
        
        <ExternalLink className="text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" aria-hidden="true" />
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
  <section className="mb-6 sm:mb-8 md:mb-10 lg:mb-12" aria-labelledby="recursos-adicionales">
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
        <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
      </div>
      <div>
        <h2 id="recursos-adicionales" className="font-black text-white text-xl sm:text-2xl md:text-3xl">
          Recursos Adicionales
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base">
          {resources.length} recurso{resources.length !== 1 ? 's' : ''} disponible{resources.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
      {resources.map((resource, index) => (
        <ResourceItem key={`${resource.url}-${index}`} resource={resource} onOpen={onOpen} />
      ))}
    </div>
  </section>
));

ResourcesList.displayName = 'ResourcesList';

interface ResourceItemProps {
  resource: Resource;
  onOpen: (url: string) => void;
}

const ResourceItem = React.memo<ResourceItemProps>(({ resource, onOpen }) => (
  <button
    onClick={() => onOpen(resource.url)}
    className="group/resource relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
    aria-label={`Abrir recurso: ${resource.title}`}
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover/resource:opacity-30 blur transition-opacity duration-300" aria-hidden="true" />
    
    <div className="relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl transition-all border-2 border-white/10 hover:border-blue-400/30 active:scale-[0.98] touch-manipulation shadow-lg hover:shadow-2xl">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 group-hover/resource:scale-110 transition-transform shadow-lg">
        <FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-400" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm sm:text-base md:text-lg font-bold text-white line-clamp-1 group-hover/resource:text-blue-300 transition-colors mb-0.5 sm:mb-1">
          {resource.title}
        </p>
        <p className="text-xs sm:text-sm text-gray-400 uppercase font-semibold">
          {resource.type}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover/resource:text-blue-400 group-hover/resource:translate-x-1 transition-all flex-shrink-0" aria-hidden="true" />
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
  <button 
    onClick={onClick} 
    className="group/action relative focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-xl"
    aria-label={label}
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl opacity-0 group-hover/action:opacity-30 blur transition-opacity" aria-hidden="true" />
    <div className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all active:scale-95 touch-manipulation border border-white/10 hover:border-purple-400/30">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
      <span className="hidden xs:inline">{label}</span>
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
  <nav className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4" aria-label="Navegación de módulos">
    {/* Previous Button */}
    <button 
      onClick={() => onNavigate('prev')}
      disabled={!hasPrevious}
      className={`
        group relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-2xl font-bold text-sm sm:text-base
        transition-all touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
        ${hasPrevious
          ? 'text-white bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-purple-400/50 active:scale-95'
          : 'text-gray-600 cursor-not-allowed opacity-40 bg-white/5 border-2 border-white/10'
        }
      `}
      aria-label="Módulo anterior"
      aria-disabled={!hasPrevious}
    >
      {hasPrevious && (
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity" aria-hidden="true" />
      )}
      <ChevronLeft className="relative w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform flex-shrink-0" aria-hidden="true" />
      <span className="relative hidden xs:inline">Anterior</span>
    </button>

    {/* Current Module Indicator */}
    <div 
      className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 flex items-center"
      role="status"
      aria-label={`Módulo ${currentModuleNumber} de ${totalModules}`}
    >
      <span className="text-sm sm:text-base font-black text-white whitespace-nowrap">
        {currentModuleNumber} / {totalModules}
      </span>
    </div>

    {/* Next Button */}
    <button 
      onClick={() => onNavigate('next')}
      disabled={!hasNext}
      className={`
        group relative flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-2xl font-black text-sm sm:text-base
        transition-all touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
        ${hasNext
          ? 'text-white shadow-2xl active:scale-95'
          : 'text-gray-600 cursor-not-allowed opacity-40 bg-white/5 border-2 border-white/10'
        }
      `}
      aria-label="Módulo siguiente"
      aria-disabled={!hasNext}
    >
      {hasNext && (
        <>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-2xl" aria-hidden="true" />
        </>
      )}
      <span className="relative hidden xs:inline">Siguiente</span>
      <ChevronRight className="relative w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" aria-hidden="true" />
    </button>
  </nav>
));

Navigation.displayName = 'Navigation';

// ============================================================================
// STYLES COMPONENT
// ============================================================================

const ModuleStyles = React.memo(() => (
  <style>{`
    /* Touch manipulation */
    .touch-manipulation {
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
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
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-shimmer {
      animation: shimmer 3s infinite;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.4s ease-out;
    }

    /* Line clamp */
    .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Prose styling for dark theme */
    .prose-invert {
      color: rgb(229, 231, 235);
    }

    .prose-invert h1,
    .prose-invert h2,
    .prose-invert h3,
    .prose-invert h4,
    .prose-invert h5,
    .prose-invert h6 {
      color: white;
      font-weight: 900;
    }

    .prose-invert strong {
      color: white;
      font-weight: 700;
    }

    .prose-invert a {
      color: rgb(168, 85, 247);
      text-decoration: underline;
    }

    .prose-invert a:hover {
      color: rgb(196, 181, 253);
    }

    .prose-invert code {
      color: rgb(196, 181, 253);
      background-color: rgba(255, 255, 255, 0.1);
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
    }

    .prose-invert blockquote {
      border-left-color: rgba(255, 255, 255, 0.3);
      color: rgb(209, 213, 219);
    }

    .prose-invert ul,
    .prose-invert ol {
      color: rgb(229, 231, 235);
    }

    /* Extra small breakpoint for xs: prefix */
    @media (min-width: 475px) {
      .xs\\:inline {
        display: inline;
      }
    }

    /* Print styles */
    @media print {
      header button,
      nav[aria-label="Navegación de módulos"],
      button[aria-label*="Compartir"],
      button[aria-label*="Imprimir"],
      .no-print {
        display: none !important;
      }

      article {
        background: white !important;
        color: black !important;
        border: none !important;
      }

      .prose-invert {
        color: black !important;
      }

      .prose-invert h1,
      .prose-invert h2,
      .prose-invert h3,
      .prose-invert h4,
      .prose-invert h5,
      .prose-invert h6,
      .prose-invert strong {
        color: black !important;
      }

      @page {
        margin: 2cm;
      }
    }

    /* Reduce motion */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      button,
      a {
        border: 2px solid currentColor !important;
      }
    }

    /* Focus visible improvements */
    button:focus-visible,
    a:focus-visible {
      outline: 3px solid white;
      outline-offset: 2px;
    }
  `}</style>
));

ModuleStyles.displayName = 'ModuleStyles';