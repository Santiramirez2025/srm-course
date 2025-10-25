import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Globe, LogOut, Menu, X } from 'lucide-react';
import { ViewType } from '@data/types';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  user?: {
    uid: string;
    email: string;
    name: string;
    photoURL?: string;
  };
  onLogout?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onNavigate,
  user,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize Google Translate
  useEffect(() => {
    if (!(window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'es',
            includedLanguages: 'es,en,fr,de,it,pt,zh-CN,ja,ko,ar',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
        
        // Initialize mobile version
        setTimeout(() => {
          const mobileElement = document.getElementById('google_translate_element_mobile');
          if (mobileElement && mobileElement.children.length === 0) {
            new (window as any).google.translate.TranslateElement(
              {
                pageLanguage: 'es',
                includedLanguages: 'es,en,fr,de,it,pt,zh-CN,ja,ko,ar',
                layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              },
              'google_translate_element_mobile'
            );
          }
        }, 100);
      };

      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Reinitialize mobile translate when menu opens
  useEffect(() => {
    if (isMobileMenuOpen && (window as any).google?.translate?.TranslateElement) {
      setTimeout(() => {
        const mobileElement = document.getElementById('google_translate_element_mobile');
        if (mobileElement && mobileElement.children.length === 0) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'es',
              includedLanguages: 'es,en,fr,de,it,pt,zh-CN,ja,ko,ar',
              layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            },
            'google_translate_element_mobile'
          );
        }
      }, 100);
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const Logo = () => (
    <button
      onClick={() => onNavigate('home')}
      className="flex items-center gap-2 sm:gap-3 group touch-manipulation"
      aria-label="Volver al inicio"
    >
      <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
        <span className="text-white font-black text-lg sm:text-xl">S</span>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-lg font-black text-gray-900 leading-none">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">SRM</span>
        </h1>
        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider -mt-0.5">Academy</p>
      </div>
    </button>
  );

  const NavButton = ({ view, icon: Icon, label }: { view: ViewType; icon: any; label: string }) => {
    const isActive = currentView === view;
    
    return (
      <button
        onClick={() => onNavigate(view)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all touch-manipulation
          ${isActive 
            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md' 
            : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
          }
        `}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon size={20} />
        <span className="text-sm">{label}</span>
      </button>
    );
  };

  const TranslateWidget = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors touch-manipulation">
      <Globe size={18} className="text-amber-600 flex-shrink-0" />
      <div id={isMobile ? 'google_translate_element_mobile' : 'google_translate_element'} className="translate-widget" />
    </div>
  );

  const UserMenu = () => {
    if (!user || !onLogout) return null;

    const initial = user.name.charAt(0).toUpperCase();

    return (
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{initial}</span>
            </div>
          )}
          <span className="text-sm font-semibold text-gray-700 max-w-[120px] truncate">
            {user.name}
          </span>
        </div>

        {user.photoURL ? (
          <img 
            src={user.photoURL} 
            alt={user.name}
            className="lg:hidden w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="lg:hidden w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{initial}</span>
          </div>
        )}

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors touch-manipulation"
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} />
          <span className="hidden xl:inline text-sm font-medium">Salir</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <nav 
        className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="safe-area-top" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <TranslateWidget />
              <div className="w-px h-6 bg-gray-300" aria-hidden="true" />
              <NavButton view="home" icon={Home} label="Inicio" />
              <NavButton view="course" icon={BookOpen} label="Curso" />
              <div className="w-px h-6 bg-gray-300" aria-hidden="true" />
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`
          fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 md:hidden
          transform transition-transform duration-300 ease-out shadow-2xl
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="safe-area-top" />
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-black text-gray-900">Menú</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col h-full overflow-y-auto p-5 pb-safe space-y-4">
          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-lg">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <NavButton view="home" icon={Home} label="Inicio" />
            <NavButton view="course" icon={BookOpen} label="Curso" />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <TranslateWidget isMobile />
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg transition-all font-medium touch-manipulation"
            >
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          )}

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500 font-medium">
              SRM Academy © 2025
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .safe-area-top {
          height: env(safe-area-inset-top);
        }
        
        .pb-safe {
          padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
        }

        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .translate-widget {
          display: inline-block;
          line-height: 1;
        }
        
        .goog-te-gadget {
          font-family: ui-sans-serif, system-ui, sans-serif !important;
          font-size: 0 !important;
        }
        
        .goog-te-gadget-simple {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          color: #374151 !important;
          cursor: pointer !important;
        }
        
        .goog-te-gadget-simple:hover {
          opacity: 0.8;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value {
          color: #374151 !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value span {
          color: #374151 !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none !important;
        }
        
        .goog-te-gadget-icon {
          display: none !important;
        }
        
        .goog-te-menu-frame {
          max-height: 400px !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #e5e7eb !important;
        }
        
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }

        button:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};