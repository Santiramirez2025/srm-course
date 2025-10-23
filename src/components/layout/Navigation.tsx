import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Home, BookOpen, Menu, TrendingUp, Globe, Award } from 'lucide-react';
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
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentView, 
  onNavigate,
  courseProgress,
  showProgress = true
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
      
      const baseClasses = "transition-all duration-200 font-medium text-sm flex items-center gap-2";
      const activeClasses = mobile
        ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
        : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30";
      const inactiveClasses = mobile
        ? "bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200"
        : "text-gray-600 hover:text-amber-600 hover:bg-amber-50";

      if (mobile) {
        return (
          <button
            onClick={() => onNavigate(view)}
            className={`w-full ${baseClasses} gap-3 px-4 py-3.5 rounded-xl group ${isActive ? activeClasses : inactiveClasses}`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={20} className={isActive ? '' : 'group-hover:text-amber-600'} />
            <span>{label}</span>
            {isActive && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </button>
        );
      }

      return (
        <button
          onClick={() => onNavigate(view)}
          className={`relative px-4 py-2.5 rounded-xl ${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
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
      <div className={`${isMobile ? 'pb-3' : 'flex items-center gap-3'}`}>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
          <TrendingUp size={16} className="text-amber-600 flex-shrink-0" />
          <span className={isMobile ? 'inline' : 'hidden xl:inline'}>Progreso</span>
        </div>
        <div className={`flex-1 ${isMobile ? 'mt-2' : 'max-w-xs'}`}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500">{completed}/{total}</span>
            <span className="font-bold text-amber-600">{percentage}%</span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
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
      className="flex items-center gap-3 group -ml-2 px-2 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
      aria-label="Volver al inicio"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
          <span className="text-white font-black text-lg sm:text-xl">S</span>
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

  // ✨ NUEVO TranslateWidget - Más limpio y profesional
  const TranslateWidget = ({ isMobile = false }: { isMobile?: boolean }) => {
    const containerId = isMobile ? 'google_translate_element_mobile' : 'google_translate_element';
    
    return (
      <div className={`
        flex items-center gap-2 rounded-lg transition-all
        ${isMobile 
          ? 'justify-center px-4 py-3 bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50' 
          : 'px-3 py-2 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300'
        }
      `}>
        <Globe size={isMobile ? 18 : 16} className="text-amber-600 flex-shrink-0" />
        <div id={containerId} className="translate-widget" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <HamburgerIcon />
            </button>
          </div>

          {/* Mobile/Tablet Progress */}
          <div className="md:hidden lg:hidden">
            <ProgressBar isMobile />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Drawer */}
        <div 
          id="mobile-menu"
          className={`
            fixed top-16 left-0 right-0 bottom-0 bg-gradient-to-b from-white to-gray-50 z-50 md:hidden
            transform transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="h-full overflow-y-auto px-4 py-6 space-y-3">
            <TranslateWidget isMobile />
            <NavButton view="home" icon={Home} label="Inicio" mobile />
            <NavButton view="course" icon={BookOpen} label="Curso" mobile />

            <div className="pt-6 mt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                SRM Academy © 2025
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Optimized Styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        /* ✨ Google Translate Styling - LIMPIO Y PROFESIONAL */
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
        
        /* ✨ Ocultar "Seleccionar idioma" - SOLO MOSTRAR CÓDIGO */
        .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none !important;
        }
        
        /* Ocultar icono de Google */
        .goog-te-gadget-icon {
          display: none !important;
        }
        
        /* Mejorar dropdown */
        .goog-te-menu-frame {
          max-height: 400px !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #e5e7eb !important;
        }

        /* Ocultar banner de Google */
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

        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
};