// src/components/course/styles/galacticStyles.ts
export const galacticStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .animate-rotate-slow {
    animation: rotate-slow 20s linear infinite;
  }

  /* Glassmorphism */
  .glass-panel {
    background: rgba(15, 5, 40, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(147, 51, 234, 0.3);
    box-shadow: 
      0 0 40px rgba(147, 51, 234, 0.2),
      inset 0 0 20px rgba(147, 51, 234, 0.1);
  }

  /* Holographic effect */
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
    animation: holographic-shine 3s linear infinite;
  }

  @keyframes holographic-shine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }

  /* Energy ripple */
  @keyframes energy-ripple {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  .energy-ripple {
    animation: energy-ripple 1.5s ease-out infinite;
  }
`;