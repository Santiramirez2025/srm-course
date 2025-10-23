import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Home, BookOpen, TrendingUp, Globe, Award, LogOut, Menu, X } from 'lucide-react';
import { ViewType } from '@data/types';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  courseProgress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  showProgress?: boolean;
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
  courseProgress,
  showProgress = true,
  user,
  onLogout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const NavButton = useMemo(() => {
    return ({ 
      view, 
      icon: Icon, 
      label,
      mobile = false
    }: { 
      view: ViewType; 
      icon: any; 
      label: string;
      mobile?: boolean;
    }) => {
      const isActive = currentView === view;
      
      const baseClasses = "transition-all duration-200 font-medium flex items-center gap-2 active:scale-95";
      const activeClasses = mobile
        ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
        : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30";
      const inactiveClasses = mobile
        ? "bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200 active:bg-amber-100"
        : "text-gray-600 hover:text-amber-600 hover:bg-amber-50 active:bg-amber-100";

      if (mobile) {
        return (
          <button
            onClick={() => onNavigate(view)}
            className={`
              w-full ${baseClasses} gap-3 px-5 py-4 rounded-xl group text-base
              ${isActive ? activeClasses : inactiveClasses}
              min-h-[56px] touch-manipulation
            `}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={22} className={isActive ? '' : 'group-hover:text-amber-600'} />
            <span className="font-semibold">{label}</span>
            {isActive && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </button>
        );
      }

      return (
        <button
          onClick={() => onNavigate(view)}
          className={`
            relative px-4 py-2.5 rounded-xl ${baseClasses} text-sm
            ${isActive ? activeClasses : inactiveClasses}
            min-h-[44px] touch-manipulation
          `}
          aria-label={label}
          aria-current={isActive ? 'page' : undefined}
        >
          <Icon size={18} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
          <span className="hidden lg:inline">{label}</span>
          {isActive && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-white rounded-full" />
          )}
        </button>
      );
    };
  }, [currentView, onNavigate]);

  const ProgressBar = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (!showProgress || !courseProgress || courseProgress.total === 0 || currentView !== 'course') {
      return null;
    }

    const { completed, total, percentage } = courseProgress;
    const isComplete = percentage === 100;

    return (
      <div className={`${isMobile ? 'pb-4 px-1' : 'flex items-center gap-3'}`}>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
          <TrendingUp size={16} className="text-amber-600 flex-shrink-0" />
          <span className={isMobile ? 'inline' : 'hidden xl:inline'}>Progreso</span>
        </div>
        <div className={`flex-1 ${isMobile ? 'mt-2' : 'max-w-xs'}`}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500">{completed}/{total}</span>
            <span className="font-bold text-amber-600">{percentage}%</span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progreso del curso: ${percentage}%`}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </div>
          </div>
        </div>
        {isComplete && !isMobile && (
          <Award size={18} className="text-amber-500 animate-bounce flex-shrink-0" />
        )}
      </div>
    );
  };

  const Logo = () => (
    <button
      onClick={() => onNavigate('home')}
      className="flex items-center gap-2 sm:gap-3 group -ml-1 sm:-ml-2 px-1 sm:px-2 py-1.5 rounded-lg hover:bg-amber-50 transition-colors min-h-[44px] touch-manipulation"
      aria-label="Volver al inicio"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
          <span className="text-white font-black text-xl sm:text-2xl">S</span>
        </div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight leading-none">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            SRM
          </span>
        </h1>
        <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium uppercase tracking-wider -mt-0.5">
          Academy
        </p>
      </div>
    </button>
  );

  const TranslateWidget = ({ isMobile = false }: { isMobile?: boolean }) => {
    const containerId = isMobile ? 'google_translate_element_mobile' : 'google_translate_element';
    
    return (
      <div className={`
        flex items-center gap-2 rounded-lg transition-all touch-manipulation
        ${isMobile 
          ? 'justify-center px-5 py-4 bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 min-h-[56px]' 
          : 'px-3 py-2 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 min-h-[44px]'
        }
      `}>
        <Globe size={isMobile ? 20 : 16} className="text-amber-600 flex-shrink-0" />
        <div id={containerId} className="translate-widget" />
      </div>
    );
  };

  const UserMenu = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (!user || !onLogout) return null;

    const initial = user.name.charAt(0).toUpperCase();

    if (isMobile) {
      return (
        <div className="space-y-3">
          {/* User Info Card - Mejorado para móvil */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl min-h-[80px]">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={user.name}
                className="w-14 h-14 rounded-full shadow-lg flex-shrink-0 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white font-black text-xl">{initial}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate text-base">{user.name}</p>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>
          </div>

          {/* Logout Button - Más grande */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-xl transition-all font-semibold group min-h-[56px] text-base touch-manipulation active:scale-95"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        {/* Desktop: Avatar + Nombre (lg+) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.name}
              className="w-7 h-7 rounded-full shadow-md object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xs">{initial}</span>
            </div>
          )}
          <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
            {user.name}
          </span>
        </div>

        {/* Tablet: Solo Avatar */}
        {user.photoURL ? (
          <img 
            src={user.photoURL} 
            alt={user.name}
            className="lg:hidden w-10 h-10 rounded-full shadow-md object-cover min-h-[44px] min-w-[44px]"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="lg:hidden w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-md min-h-[44px] min-w-[44px]">
            <span className="text-white font-bold text-sm">{initial}</span>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium group min-h-[44px] touch-manipulation active:scale-95"
          title="Cerrar sesión"
        >
          <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden xl:inline">Salir</span>
        </button>
      </div>
    );
  };

  const HamburgerIcon = () => (
    <div className="relative w-6 h-5">
      <span className={`
        absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300
        ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}
      `} />
      <span className={`
        absolute left-0 top-2 w-full h-0.5 bg-current rounded-full transition-all duration-300
        ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
      `} />
      <span className={`
        absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300
        ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}
      `} />
    </div>
  );

  return (
    <>
      <nav 
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100' 
            : 'bg-white shadow-md'
          }
        `}
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* Safe Area Top para iOS */}
        <div className="safe-area-inset-top" />
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Logo />

            {/* Desktop Progress */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <ProgressBar />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <TranslateWidget />
              <div className="w-px h-6 bg-gray-300 mx-1" aria-hidden="true" />
              <NavButton view="home" icon={Home} label="Inicio" />
              <NavButton view="course" icon={BookOpen} label="Curso" />
              <div className="w-px h-6 bg-gray-300 mx-1" aria-hidden="true" />
              <UserMenu />
            </div>

            {/* Mobile Menu Button - MEJORADO: 48x48px */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-12 h-12 flex items-center justify-center text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors touch-manipulation active:scale-95 min-h-[48px] min-w-[48px]"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile/Tablet Progress - MEJORADO */}
          <div className="md:hidden lg:hidden pb-2">
            <ProgressBar isMobile />
          </div>
        </div>

        {/* Mobile Menu Overlay - MEJORADO */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Drawer - MEJORADO con safe-area */}
        <div 
          id="mobile-menu"
          className={`
            fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-white to-gray-50 z-50 md:hidden
            transform transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Header del drawer con botón cerrar */}
          <div className="safe-area-inset-top" />
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">SRM</h2>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider -mt-0.5">Menu</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors touch-manipulation active:scale-95"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido del drawer con scroll y safe-area */}
          <div className="h-full overflow-y-auto overscroll-contain px-4 py-6 space-y-3 pb-safe">
            <UserMenu isMobile />
            <div className="h-px bg-gray-200 my-4" />
            <TranslateWidget isMobile />
            <NavButton view="home" icon={Home} label="Inicio" mobile />
            <NavButton view="course" icon={BookOpen} label="Curso" mobile />

            {/* Footer del menú con safe-area */}
            <div className="pt-8 mt-8 border-t border-gray-200 pb-safe">
              <p className="text-xs text-center text-gray-500 font-medium">
                SRM Academy © 2025
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Optimized Styles */}
      <style>{`
        /* Safe Area Support para iOS */
        .safe-area-inset-top {
          height: env(safe-area-inset-top);
        }
        
        .pb-safe {
          padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
        }

        /* Touch manipulation para mejor UX */
        .touch-manipulation {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* Animaciones */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        /* Scroll suave en menú móvil */
        .overscroll-contain {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        /* Google Translate Styles */
        .translate-widget {
          display: inline-block;
          line-height: 1;
        }
        
        .goog-te-gadget {
          font-family: ui-sans-serif, system-ui, sans-serif !important;
          font-size: 0 !important;
          color: transparent !important;
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
          overflow-x: hidden;
        }

        /* Focus visible para accesibilidad */
        button:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }

        /* Mejoras para pantallas muy pequeñas */
        @media (max-width: 360px) {
          .text-base {
            font-size: 0.9375rem;
          }
        }
      `}</style>
    </>
  );
};