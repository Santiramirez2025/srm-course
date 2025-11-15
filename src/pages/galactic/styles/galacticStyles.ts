// src/components/course/styles/galacticStyles.ts

/**
 * Galactic Theme Styles
 * Estilos CSS optimizados para el tema galáctico con efectos holográficos,
 * glassmorphism y animaciones fluidas. Todas las animaciones respetan
 * prefers-reduced-motion y están optimizadas para rendimiento.
 */

export const galacticStyles = `
  /* ========================================================================
     KEYFRAME ANIMATIONS
     Animaciones reutilizables optimizadas con transform/opacity para
     mejor rendimiento (GPU-accelerated)
     ======================================================================== */

  /* Flotación suave - para elementos espaciales */
  @keyframes float {
    0%, 100% { 
      transform: translateY(0) translateZ(0);
    }
    50% { 
      transform: translateY(-20px) translateZ(0);
    }
  }
  
  /* Flotación sutil para móviles */
  @keyframes float-mobile {
    0%, 100% { 
      transform: translateY(0) translateZ(0);
    }
    50% { 
      transform: translateY(-10px) translateZ(0);
    }
  }

  /* Pulso luminoso - para efectos de energía */
  @keyframes pulse-glow {
    0%, 100% { 
      opacity: 0.5;
      transform: scale(1) translateZ(0);
    }
    50% { 
      opacity: 1;
      transform: scale(1.05) translateZ(0);
    }
  }

  /* Rotación lenta - para elementos decorativos */
  @keyframes rotate-slow {
    from { 
      transform: rotate(0deg) translateZ(0);
    }
    to { 
      transform: rotate(360deg) translateZ(0);
    }
  }

  /* Brillo holográfico - efecto de luz deslizante */
  @keyframes holographic-shine {
    0% { 
      transform: translateX(-100%) translateY(-100%) rotate(45deg) translateZ(0);
    }
    100% { 
      transform: translateX(100%) translateY(100%) rotate(45deg) translateZ(0);
    }
  }

  /* Onda de energía expansiva */
  @keyframes energy-ripple {
    0% {
      transform: scale(1) translateZ(0);
      opacity: 1;
    }
    100% {
      transform: scale(2) translateZ(0);
      opacity: 0;
    }
  }

  /* Parpadeo suave - para estrellas y partículas */
  @keyframes twinkle {
    0%, 100% { 
      opacity: 0.3;
      transform: scale(1) translateZ(0);
    }
    50% { 
      opacity: 1;
      transform: scale(1.2) translateZ(0);
    }
  }

  /* ========================================================================
     UTILITY CLASSES - ANIMATIONS
     Clases de animación aplicables a cualquier elemento
     ======================================================================== */

  .animate-float {
    animation: float 6s ease-in-out infinite;
    will-change: transform;
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
    will-change: transform, opacity;
  }

  .animate-rotate-slow {
    animation: rotate-slow 20s linear infinite;
    will-change: transform;
  }

  .animate-hologram {
    animation: holographic-shine 3s linear infinite;
    will-change: transform;
  }

  .animate-energy-ripple {
    animation: energy-ripple 1.5s ease-out infinite;
    will-change: transform, opacity;
  }

  .animate-twinkle {
    animation: twinkle 3s ease-in-out infinite;
    will-change: transform, opacity;
  }

  /* ========================================================================
     GLASSMORPHISM EFFECTS
     Efectos de vidrio con blur y transparencia
     ======================================================================== */

  .glass-panel {
    background: rgba(15, 5, 40, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px); /* Safari support */
    border: 1px solid rgba(147, 51, 234, 0.3);
    box-shadow: 
      0 0 40px rgba(147, 51, 234, 0.2),
      inset 0 0 20px rgba(147, 51, 234, 0.1);
  }

  /* Variante sutil para elementos secundarios */
  .glass-panel-subtle {
    background: rgba(15, 5, 40, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(147, 51, 234, 0.2);
    box-shadow: 
      0 0 20px rgba(147, 51, 234, 0.15),
      inset 0 0 10px rgba(147, 51, 234, 0.05);
  }

  /* Variante intensa para elementos destacados */
  .glass-panel-intense {
    background: rgba(15, 5, 40, 0.8);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid rgba(147, 51, 234, 0.4);
    box-shadow: 
      0 0 60px rgba(147, 51, 234, 0.3),
      inset 0 0 30px rgba(147, 51, 234, 0.15);
  }

  /* ========================================================================
     HOLOGRAPHIC EFFECTS
     Efectos holográficos con gradientes animados
     ======================================================================== */

  .holographic {
    position: relative;
    overflow: hidden;
  }

  .holographic::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(147, 51, 234, 0.1) 50%,
      transparent 70%
    );
    pointer-events: none;
    animation: holographic-shine 3s linear infinite;
    will-change: transform;
  }

  /* Variante cian para diversidad visual */
  .holographic-cyan::before {
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(6, 182, 212, 0.1) 50%,
      transparent 70%
    );
  }

  /* Variante sin animación para elementos estáticos */
  .holographic-static::before {
    animation: none;
  }

  /* ========================================================================
     MOBILE OPTIMIZATIONS
     Adaptaciones para pantallas pequeñas
     ======================================================================== */

  @media (max-width: 768px) {
    /* Reducir blur en móviles para mejor rendimiento */
    .glass-panel {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 
        0 0 20px rgba(147, 51, 234, 0.15),
        inset 0 0 10px rgba(147, 51, 234, 0.08);
    }

    .glass-panel-intense {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    /* Usar animación más ligera en móviles */
    .animate-float {
      animation: float-mobile 4s ease-in-out infinite;
    }

    /* Reducir intensidad de efectos holográficos */
    .holographic::before {
      opacity: 0.7;
    }
  }

  /* ========================================================================
     REDUCED MOTION SUPPORT
     Desactivar animaciones para usuarios que prefieren movimiento reducido
     ======================================================================== */

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    /* Mantener efectos estáticos sin animación */
    .animate-float,
    .animate-pulse-glow,
    .animate-rotate-slow,
    .animate-hologram,
    .animate-energy-ripple,
    .animate-twinkle {
      animation: none !important;
    }

    .holographic::before {
      animation: none !important;
      opacity: 0.5;
    }
  }

  /* ========================================================================
     PERFORMANCE OPTIMIZATIONS
     Optimizaciones generales de rendimiento
     ======================================================================== */

  /* GPU acceleration hints para elementos animados */
  .animate-float,
  .animate-pulse-glow,
  .animate-rotate-slow,
  .animate-hologram,
  .animate-energy-ripple,
  .animate-twinkle,
  .holographic::before {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  /* Optimizar render de elementos con blur */
  .glass-panel,
  .glass-panel-subtle,
  .glass-panel-intense {
    transform: translateZ(0);
  }

  /* ========================================================================
     HIGH CONTRAST MODE
     Mejoras de accesibilidad para modo de alto contraste
     ======================================================================== */

  @media (prefers-contrast: high) {
    .glass-panel,
    .glass-panel-subtle,
    .glass-panel-intense {
      border-width: 2px;
      border-color: rgba(147, 51, 234, 0.8);
    }

    .holographic::before {
      opacity: 0.3;
    }
  }

  /* ========================================================================
     PRINT STYLES
     Estilos para impresión
     ======================================================================== */

  @media print {
    /* Desactivar todos los efectos visuales en impresión */
    .glass-panel,
    .glass-panel-subtle,
    .glass-panel-intense {
      background: white !important;
      backdrop-filter: none !important;
      border: 1px solid #000 !important;
      box-shadow: none !important;
    }

    .holographic::before {
      display: none !important;
    }

    .animate-float,
    .animate-pulse-glow,
    .animate-rotate-slow,
    .animate-hologram,
    .animate-energy-ripple,
    .animate-twinkle {
      animation: none !important;
    }
  }
`;