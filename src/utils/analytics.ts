// src/utils/analytics.ts

// Tipos para Vite env
interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GOOGLE_TRANSLATE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Tipos básicos para GA4 (sin dependencia externa)
interface GAEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class Analytics {
  private initialized: boolean = false;
  private measurementId: string | undefined;

  constructor() {
    this.measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  }

  // Inicializar Google Analytics 4
  initialize(): void {
    if (this.initialized || !this.measurementId) {
      return;
    }

    try {
      // Cargar script de GA4
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
      document.head.appendChild(script);

      // Inicializar gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', this.measurementId);

      this.initialized = true;
      console.log('✅ Analytics inicializado');
    } catch (error) {
      console.error('Error inicializando analytics:', error);
    }
  }

  // Trackear página vista
  trackPageView(path: string, title?: string): void {
    if (!this.initialized || !window.gtag) return;

    try {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title || document.title
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  // Trackear evento personalizado
  trackEvent(event: GAEvent): void {
    if (!this.initialized || !window.gtag) return;

    try {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  // Eventos específicos del curso
  trackModuleView(moduleId: number, moduleTitle: string): void {
    this.trackEvent({
      category: 'Course',
      action: 'view_module',
      label: moduleTitle,
      value: moduleId
    });
  }

  trackModuleComplete(moduleId: number, moduleTitle: string): void {
    this.trackEvent({
      category: 'Course',
      action: 'complete_module',
      label: moduleTitle,
      value: moduleId
    });
  }

  trackChapterExpand(chapterId: number, chapterTitle: string): void {
    this.trackEvent({
      category: 'Course',
      action: 'expand_chapter',
      label: chapterTitle,
      value: chapterId
    });
  }

  trackLanguageChange(fromLang: string, toLang: string): void {
    this.trackEvent({
      category: 'Settings',
      action: 'change_language',
      label: `${fromLang} -> ${toLang}`
    });
  }

  trackResourceClick(resourceUrl: string, resourceTitle: string): void {
    this.trackEvent({
      category: 'Resources',
      action: 'click_resource',
      label: resourceTitle
    });
  }
}

// Tipos globales para window
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Singleton
const analytics = new Analytics();

export default analytics;