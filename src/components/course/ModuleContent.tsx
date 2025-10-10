import React from 'react';
import { Play, FileText, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
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
}

export const ModuleContent: React.FC<ModuleContentProps> = ({ module }) => {
  const { t } = useTranslation();
  const isComponentContent = typeof module.content === 'function';
  const ContentComponent = isComponentContent ? (module.content as React.ComponentType<any>) : null;

  const typeColors = {
    video: 'from-purple-500 to-pink-600',
    document: 'from-blue-500 to-cyan-600',
    text: 'from-green-500 to-emerald-600'
  };

  const openLink = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className={`bg-gradient-to-r ${typeColors[module.type] || 'from-amber-500 to-orange-600'} p-6`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-white/80 text-sm">{module.chapterTitle}</span>
            <h2 className="text-3xl font-bold text-white mt-1">{module.title}</h2>
            {module.duration && (
              <div className="flex items-center gap-2 text-white/90 mt-2">
                <Clock size={16} />
                <span className="text-sm">{module.duration}</span>
              </div>
            )}
          </div>
          <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center">
            <CheckCircle size={24} className="text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-8">
        <div className="prose prose-lg max-w-none mb-8">
          {ContentComponent ? <ContentComponent /> : <p className="text-gray-700 text-lg leading-relaxed">{module.content as string}</p>}
        </div>
        
        {module.driveUrl && (
          <button
            onClick={() => openLink(module.driveUrl!)}
            className="w-full mb-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300 rounded-xl transition-all flex items-center gap-4 group"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${typeColors[module.type]} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
              {module.type === 'video' ? <Play size={28} className="text-white" /> : <FileText size={28} className="text-white" />}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {module.type === 'video' ? t('module.viewVideo') : t('module.openMaterial')}
              </h3>
              <p className="text-sm text-gray-600">
                {module.type === 'video' ? t('module.videoContent') : t('module.complementaryMaterial')}
              </p>
            </div>
            <ChevronRight className="text-amber-600 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {module.resources && module.resources.length > 0 && (
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3">📚 {t('module.resources')} ({module.resources.length})</h3>
            <div className="space-y-2">
              {module.resources.map((res, i) => (
                <button
                  key={i}
                  onClick={() => openLink(res.url)}
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all border border-gray-200 hover:border-amber-300 text-left"
                >
                  <FileText size={20} className="text-amber-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{res.title}</p>
                    <p className="text-xs text-gray-500 uppercase">{res.type}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors">
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">{t('module.previous')}</span>
          </button>
          <span className="text-sm text-gray-500">{t('module.module')} {module.id}</span>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all">
            <span className="hidden sm:inline">{t('module.next')}</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};