import React from 'react';
import { ChevronDown, ChevronRight, ExternalLink, Play, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Chapter, Module } from '@data/types';

interface ChapterListProps {
  chapters: Chapter[];
  expandedChapter: number | null;
  selectedModule: (Module & { chapterTitle: string }) | null;
  onToggleChapter: (chapterId: number) => void;
  onSelectModule: (chapter: Chapter, module: Module) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  expandedChapter,
  selectedModule,
  onToggleChapter,
  onSelectModule
}) => {
  const { t } = useTranslation();

  const getModuleIcon = (type: Module['type']) => {
    const icons = {
      video: <Play size={16} className="flex-shrink-0 text-amber-600" />,
      document: <FileText size={16} className="flex-shrink-0 text-blue-600" />,
      text: <FileText size={16} className="flex-shrink-0 text-gray-600" />
    };
    return icons[type];
  };

  const isModuleSelected = (chapterTitle: string, moduleId: number): boolean => {
    return selectedModule?.id === moduleId && selectedModule?.chapterTitle === chapterTitle;
  };

  const totalModules = chapters.reduce((acc, ch) => acc + ch.modules.length, 0);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
        <h2 className="text-white font-semibold text-lg">{t('chapter.content')}</h2>
        <p className="text-amber-100 text-sm mt-1">
          {chapters.length} {t('chapter.chapters')} • {totalModules} {t('chapter.modules')}
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <button
              onClick={() => onToggleChapter(chapter.id)}
              className="w-full px-4 py-4 flex items-center justify-between hover:bg-amber-50 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-semibold text-sm group-hover:bg-amber-200 transition-colors">
                  {chapter.id}
                </div>
                <div className="text-left flex-1">
                  <span className="font-medium text-gray-900 block">{chapter.title}</span>
                  <span className="text-xs text-gray-500">{chapter.modules.length} {t('chapter.modules')}</span>
                </div>
              </div>
              {expandedChapter === chapter.id ? (
                <ChevronDown size={20} className="text-amber-600" />
              ) : (
                <ChevronRight size={20} className="text-gray-400 group-hover:text-amber-600" />
              )}
            </button>
            
            {expandedChapter === chapter.id && (
              <div className="bg-gray-50 px-4 py-2">
                {chapter.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => onSelectModule(chapter, module)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 flex items-center gap-2 transition-all ${
                      isModuleSelected(chapter.title, module.id)
                        ? 'bg-amber-100 text-amber-700 shadow-sm'
                        : 'hover:bg-white text-gray-700 hover:shadow-sm'
                    }`}
                  >
                    {getModuleIcon(module.type)}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium block truncate">{module.title}</span>
                      {module.duration && <span className="text-xs text-gray-500">{module.duration}</span>}
                    </div>
                    {module.driveUrl && (
                      <ExternalLink size={14} className={`flex-shrink-0 ${isModuleSelected(chapter.title, module.id) ? 'text-amber-600' : 'text-gray-400'}`} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{t('chapter.progress')}: 0/{totalModules}</span>
          <span className="text-amber-600 font-medium">0% {t('chapter.completed')}</span>
        </div>
      </div>
    </div>
  );
};