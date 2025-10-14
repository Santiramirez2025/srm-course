import React, { useState, useEffect } from 'react';
import { Play, FileText, Clock, CheckCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Resource {
  title: string;
  url: string;
  type: 'pdf' | 'doc' | 'link';
}

interface Module {
  id: number;
  title: string;
  type: 'video' | 'document' | 'text';
  content: React.ComponentType<any> | string;
  driveUrl?: string;
  duration?: string;
  resources?: Resource[];
}

interface ModuleContentProps {
  module: Module & { chapterTitle: string };
  onComplete?: (moduleId: number) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  isCompleted?: boolean;
  hasPrevious?: boolean;
  hasNext?: boolean;
  totalModules?: number;
}

export const ModuleContent: React.FC<ModuleContentProps> = ({ 
  module,
  onComplete,
  onNavigate,
  isCompleted = false,
  hasPrevious = false,
  hasNext = true,
  totalModules
}) => {
  const { t } = useTranslation();
  const [completed, setCompleted] = useState(isCompleted);
  const isComponentContent = typeof module.content === 'function';
  const ContentComponent = isComponentContent ? (module.content as React.ComponentType<any>) : null;

  // Sincronizar estado local con prop externa
  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const typeColors = {
    video: 'from-purple-500 to-pink-600',
    document: 'from-blue-500 to-cyan-600',
    text: 'from-green-500 to-emerald-600'
  };

  const typeIcons = {
    video: Play,
    document: FileText,
    text: FileText
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleComplete = () => {
    const newCompletedState = !completed;
    setCompleted(newCompletedState);
    if (onComplete && newCompletedState) {
      onComplete(module.id);
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (onNavigate) {
      onNavigate(direction);
      // Scroll suave al inicio
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const TypeIcon = typeIcons[module.type];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header con gradiente */}
      <div className={`bg-gradient-to-r ${typeColors[module.type] || 'from-amber-500 to-orange-600'} p-6`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className="text-white/80 text-sm font-medium">
              {module.chapterTitle}
            </span>
            <h2 className="text-3xl font-bold text-white mt-1 leading-tight">
              {module.title}
            </h2>
            <div className="flex items-center gap-4 mt-3">
              {module.duration && (
                <div className="flex items-center gap-2 text-white/90">
                  <Clock size={16} />
                  <span className="text-sm">{module.duration}</span>
                </div>
              )}
              {totalModules && (
                <div className="text-white/80 text-sm">
                  {t('module.module')} {module.id} {t('module.of')} {totalModules}
                </div>
              )}
            </div>
          </div>
          
          {/* Botón de completar */}
          <button 
            onClick={handleComplete}
            className={`w-12 h-12 rounded-full transition-all flex items-center justify-center ${
              completed 
                ? 'bg-white text-green-600 shadow-lg' 
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
            title={completed ? t('module.completed') : t('module.markAsCompleted')}
            aria-label={completed ? t('module.completed') : t('module.markAsCompleted')}
          >
            {completed ? (
              <Check size={24} strokeWidth={3} />
            ) : (
              <CheckCircle size={24} />
            )}
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="p-8">
        {/* Contenido del módulo */}
        <div className="prose prose-lg max-w-none mb-8">
          {ContentComponent ? (
            <ContentComponent />
          ) : (
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {module.content as string}
            </p>
          )}
        </div>
        
        {/* Enlace a Drive/Material principal */}
        {module.driveUrl && (
          <button
            onClick={() => openLink(module.driveUrl!)}
            className="w-full mb-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300 rounded-xl transition-all flex items-center gap-4 group hover:shadow-md"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${typeColors[module.type]} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
              <TypeIcon size={28} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {module.type === 'video' ? t('module.viewVideo') : t('module.openMaterial')}
              </h3>
              <p className="text-sm text-gray-600">
                {module.type === 'video' 
                  ? t('module.videoContent') 
                  : t('module.complementaryMaterial')}
              </p>
            </div>
            <ChevronRight className="text-amber-600 group-hover:translate-x-1 transition-transform" size={24} />
          </button>
        )}

        {/* Recursos adicionales */}
        {module.resources && module.resources.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span>{t('module.resources')}</span>
              <span className="text-sm font-normal text-gray-500">
                ({module.resources.length})
              </span>
            </h3>
            <div className="grid gap-3">
              {module.resources.map((res, i) => (
                <button
                  key={i}
                  onClick={() => openLink(res.url)}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-amber-50 rounded-lg transition-all border border-gray-200 hover:border-amber-300 text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate group-hover:text-amber-700">
                      {res.title}
                    </p>
                    <p className="text-xs text-gray-500 uppercase mt-0.5">
                      {res.type}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navegación entre módulos */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button 
            onClick={() => handleNavigation('prev')}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              hasPrevious
                ? 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            aria-label={t('module.previous')}
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline font-medium">
              {t('module.previous')}
            </span>
          </button>

          {totalModules && (
            <span className="text-sm text-gray-500 font-medium">
              {module.id} / {totalModules}
            </span>
          )}

          <button 
            onClick={() => handleNavigation('next')}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all font-medium ${
              hasNext
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label={t('module.next')}
          >
            <span className="hidden sm:inline">
              {t('module.next')}
            </span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};