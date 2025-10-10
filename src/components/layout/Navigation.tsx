import React from 'react';
import { Home, BookOpen, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ViewType } from '@data/types';
import { Button } from '@components/common/Button';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onNavigate 
}) => {
  const { t, i18n } = useTranslation();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="text-xl font-bold text-gray-800">SRM</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="pt">🇧🇷 PT</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
              <option value="zh">🇨🇳 ZH</option>
            </select>
            <Globe size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            icon={<Home size={20} />}
          >
            <span className="hidden sm:inline">{t('nav.home')}</span>
          </Button>
          
          <Button
            variant="primary"
            onClick={() => onNavigate('course')}
            icon={<BookOpen size={20} />}
          >
            {t('nav.course')}
          </Button>
        </div>
      </div>
    </nav>
  );
};