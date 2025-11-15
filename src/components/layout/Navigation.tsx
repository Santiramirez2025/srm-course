import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Globe, LogOut, Menu, X, Sparkles, User, Mail } from 'lucide-react';

// Mock types for demo
type ViewType = 'home' | 'course';

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
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const Logo = () => (
    <button
      onClick={() => onNavigate('home')}
      className="flex items-center gap-3 group relative z-50"
      aria-label="Volver al inicio"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
      
      <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <span className="text-white font-black text-xl">S</span>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
      </div>
      
      <div className="hidden sm:block relative">
        <h1 className="text-xl font-black leading-none">
          <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 bg-clip-text text-transparent">
            SRM Academy
          </span>
        </h1>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" />
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Learning Platform
          </p>
        </div>
      </div>
    </button>
  );

  const NavButton = ({ view, icon: Icon, label }: { view: ViewType; icon: any; label: string }) => {
    const isActive = currentView === view;
    
    return (
      <button
        onClick={() => onNavigate(view)}
        className={`
          relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 group overflow-hidden
          ${isActive 
            ? 'text-white' 
            : 'text-gray-300 hover:text-white'
          }
        `}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
      >
        {/* Background gradient for active state */}
        {isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 rounded-xl blur opacity-50" />
          </>
        )}
        
        {/* Hover background for inactive */}
        {!isActive && (
          <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        <Icon size={18} className={`relative z-10 ${isActive ? 'animate-pulse' : ''}`} />
        <span className="text-sm relative z-10">{label}</span>
        
        {/* Active indicator dot */}
        {isActive && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
        )}
      </button>
    );
  };

  const TranslateWidget = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
      
      <div className="relative flex items-center gap-2.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 transition-all duration-300">
        <Globe size={18} className="text-purple-400 flex-shrink-0" />
        <div id={isMobile ? 'google_translate_element_mobile' : 'google_translate_element'} className="translate-widget" />
      </div>
    </div>
  );

  const UserMenu = () => {
    if (!user || !onLogout) return null;

    const initial = user.name.charAt(0).toUpperCase();

    return (
      <div className="flex items-center gap-3">
        {/* Desktop user info */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
          {user.photoURL ? (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full opacity-50 blur" />
              <img 
                src={user.photoURL} 
                alt={user.name}
                className="relative w-9 h-9 rounded-full object-cover ring-2 ring-white/20"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full opacity-50 blur" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center ring-2 ring-white/20">
                <span className="text-white font-black text-sm">{initial}</span>
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white max-w-[120px] truncate leading-tight">
              {user.name}
            </span>
            <span className="text-xs text-gray-400 font-medium">Estudiante</span>
          </div>
        </div>

        {/* Mobile avatar */}
        {user.photoURL ? (
          <div className="lg:hidden relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full opacity-50 blur" />
            <img 
              src={user.photoURL} 
              alt={user.name}
              className="relative w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="lg:hidden relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full opacity-50 blur" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center ring-2 ring-white/20">
              <span className="text-white font-black text-sm">{initial}</span>
            </div>
          </div>
        )}

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-gray-300 hover:text-white transition-all duration-300 group overflow-hidden"
          aria-label="Cerrar sesión"
        >
          <div className="absolute inset-0 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors duration-300" />
          <LogOut size={18} className="relative z-10" />
          <span className="hidden xl:inline text-sm relative z-10">Salir</span>
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-[100] transition-all duration-500
          ${scrolled 
            ? 'bg-slate-950/80 backdrop-blur-2xl shadow-2xl border-b border-white/10' 
            : 'bg-slate-950/50 backdrop-blur-xl border-b border-white/5'
          }
        `}
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* Animated gradient line on top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
        </div>
        
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <NavButton view="home" icon={Home} label="Inicio" />
              <NavButton view="course" icon={BookOpen} label="Curso" />
              
              <div className="w-px h-8 bg-white/10 mx-2" aria-hidden="true" />
              
              <TranslateWidget />
              
              <div className="w-px h-8 bg-white/10 mx-2" aria-hidden="true" />
              
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-11 h-11 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 z-[110] group"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[105] md:hidden animate-fade-in backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`
          fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-[110] md:hidden
          bg-slate-950 border-l border-white/10
          transform transition-all duration-500 ease-out shadow-2xl
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Drawer animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Drawer Header */}
        <div className="relative flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            <h2 className="text-xl font-black text-white">Menú</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="relative flex flex-col h-[calc(100vh-5rem)] overflow-y-auto p-6 space-y-6">
          {/* User Info Card */}
          {user && (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl opacity-20 blur-xl" />
              
              <div className="relative flex items-center gap-4 p-5 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-white/10 rounded-2xl backdrop-blur-xl">
                {user.photoURL ? (
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full opacity-50 blur" />
                    <img 
                      src={user.photoURL} 
                      alt={user.name}
                      className="relative w-14 h-14 rounded-full object-cover ring-2 ring-white/20 shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full opacity-50 blur" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-full flex items-center justify-center ring-2 ring-white/20 shadow-xl">
                      <span className="text-white font-black text-xl">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-black text-white truncate text-lg">{user.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail size={12} className="text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-400 truncate font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-2">
            <button
              onClick={() => onNavigate('home')}
              className={`
                relative w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold transition-all duration-300 group overflow-hidden
                ${currentView === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'}
              `}
            >
              {currentView === 'home' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 rounded-xl blur opacity-50" />
                </>
              )}
              {currentView !== 'home' && (
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              <Home size={20} className="relative z-10" />
              <span className="relative z-10">Inicio</span>
            </button>

            <button
              onClick={() => onNavigate('course')}
              className={`
                relative w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold transition-all duration-300 group overflow-hidden
                ${currentView === 'course' ? 'text-white' : 'text-gray-300 hover:text-white'}
              `}
            >
              {currentView === 'course' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 rounded-xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-600 rounded-xl blur opacity-50" />
                </>
              )}
              {currentView !== 'course' && (
                <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              <BookOpen size={20} className="relative z-10" />
              <span className="relative z-10">Curso</span>
            </button>
          </div>

          {/* Translate Widget */}
          <div className="pt-4 border-t border-white/10">
            <TranslateWidget isMobile />
          </div>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="relative w-full flex items-center justify-center gap-3 px-5 py-4 rounded-xl font-bold text-white transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
              <LogOut size={20} className="relative z-10" />
              <span className="relative z-10">Cerrar sesión</span>
            </button>
          )}

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <p className="text-xs text-center text-gray-400 font-bold uppercase tracking-widest">
                SRM Academy © 2025
              </p>
              <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
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
          font-weight: 700 !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          color: rgb(192, 132, 252) !important;
          cursor: pointer !important;
        }
        
        .goog-te-gadget-simple:hover {
          opacity: 0.8;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value {
          color: rgb(192, 132, 252) !important;
        }
        
        .goog-te-gadget-simple .goog-te-menu-value span {
          color: rgb(192, 132, 252) !important;
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
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          z-index: 9999 !important;
        }
        
        .goog-te-banner-frame {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }

        button:focus-visible {
          outline: 2px solid rgb(168, 85, 247);
          outline-offset: 2px;
        }

        /* GPU acceleration */
        [style*="transform"] {
          will-change: transform;
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};

// Demo Component
export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  
  const mockUser = {
    uid: '123',
    email: 'estudiante@srm.com',
    name: 'Juan Pérez',
    photoURL: undefined
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <Navigation 
        currentView={currentView}
        onNavigate={setCurrentView}
        user={mockUser}
        onLogout={() => alert('Logout')}
      />
      
      {/* Content demo */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl opacity-20 blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              <h1 className="text-4xl font-black text-white">
                Navegación Premium 2025
              </h1>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Header completamente rediseñado con el mismo estilo visual premium del CoursePage. 
              Incluye efectos glassmorphism, gradientes vibrantes, animaciones suaves y una 
              experiencia de usuario moderna y cohesiva.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Glassmorphism', desc: 'Backdrop blur y transparencias' },
                { title: 'Gradientes', desc: 'Purple → Fuchsia → Orange' },
                { title: 'Animaciones', desc: 'Transiciones suaves 300-500ms' }
              ].map((feature, i) => (
                <div key={i} className="relative group/card">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl opacity-0 group-hover/card:opacity-30 blur transition-opacity duration-300" />
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}