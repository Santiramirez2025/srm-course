import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Globe, Menu, X, Award, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ViewType } from '@data/types';
import { Button } from '@components/common/Button';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  courseProgress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  showProgress?: boolean;
}

const LANGUAGES = [
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'pt', flag: '🇧🇷', name: 'Português' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'zh', flag: '🇨🇳', name: '中文' }
];

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onNavigate,
  courseProgress,
  showProgress = true
}) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Detectar scroll para cambiar estilo del nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar vista
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  // Cerrar menú de idiomas al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsLangMenuOpen(false);
      }
    };

    if (isLangMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangMenuOpen]);

  const handleNavigate = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];

  return (
    <nav className={`
      bg-white sticky top-0 z-50 transition-all duration-300
      ${isScrolled ? 'shadow-md' : 'shadow-sm'}
    `}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                S
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                SRM
              </span>
              <span className="text-xs text-gray-500 block -mt-1">
                {t('nav.learningPlatform')}
              </span>
            </div>
          </button>

          {/* Barra de progreso en nav (desktop) */}
          {showProgress && courseProgress && courseProgress.total > 0 && currentView === 'course' && (
            <div className="hidden lg:flex items-center gap-3 flex-1 max-w-xs mx-8">
              <TrendingUp size={18} className="text-amber-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span className="font-medium">{t('nav.progress')}</span>
                  <span className="font-bold text-amber-600">
                    {courseProgress.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${courseProgress.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {/* Selector de idioma con dropdown */}
            <div className="relative language-selector">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangMenuOpen(!isLangMenuOpen);
                }}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden lg:inline">{currentLanguage.code.toUpperCase()}</span>
                <Globe size={16} className="text-gray-400" />
              </button>

              {/* Dropdown de idiomas */}
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 animate-fade-in-down">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2 text-sm text-left
                        transition-colors
                        ${lang.code === i18n.language 
                          ? 'bg-amber-50 text-amber-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'}
                      `}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {lang.code === i18n.language && (
                        <Award size={14} className="ml-auto text-amber-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botones de navegación */}
            <Button
              variant={currentView === 'home' ? 'primary' : 'ghost'}
              onClick={() => handleNavigate('home')}
              icon={<Home size={20} />}
              className="transition-all"
            >
              <span className="hidden lg:inline">{t('nav.home')}</span>
            </Button>
            
            <Button
              variant={currentView === 'course' ? 'primary' : 'ghost'}
              onClick={() => handleNavigate('course')}
              icon={<BookOpen size={20} />}
              className="transition-all"
            >
              {t('nav.course')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-amber-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Barra de progreso móvil */}
        {showProgress && courseProgress && courseProgress.total > 0 && currentView === 'course' && (
          <div className="md:hidden pb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span className="font-medium flex items-center gap-2">
                <TrendingUp size={14} className="text-amber-600" />
                {t('nav.progress')}
              </span>
              <span className="font-bold text-amber-600">
                {courseProgress.completed}/{courseProgress.total} · {courseProgress.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${courseProgress.percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-fade-in-down">
          <div className="px-4 py-4 space-y-3">
            <Button
              variant={currentView === 'home' ? 'primary' : 'ghost'}
              onClick={() => handleNavigate('home')}
              icon={<Home size={20} />}
              className="w-full justify-start"
            >
              {t('nav.home')}
            </Button>
            
            <Button
              variant={currentView === 'course' ? 'primary' : 'ghost'}
              onClick={() => handleNavigate('course')}
              icon={<BookOpen size={20} />}
              className="w-full justify-start"
            >
              {t('nav.course')}
            </Button>

            {/* Selector de idioma móvil */}
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 mb-2 px-3">
                {t('nav.selectLanguage')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                      ${lang.code === i18n.language 
                        ? 'bg-amber-100 text-amber-700 font-medium' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animaciones */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};