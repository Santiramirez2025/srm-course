import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, Sun, Wind, Sparkles, Target, CheckCircle2, ChevronRight,
  Eye, Lightbulb, Clock, Smartphone, Bed, Coffee, BookOpen,
  DollarSign, Award, TrendingUp, AlertTriangle, Zap, Heart,
  Settings, BarChart3, Shield, Star, Flame, Gift, Users,
  Brain, ArrowRight, Calendar, Megaphone
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Principle {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tips: string[];
  color: string;
  gradient: string;
}

interface SpaceType {
  id: string;
  icon: string;
  title: string;
  description: string;
  challenges: string[];
  solutions: string[];
  color: string;
  gradient: string;
}

interface Budget {
  id: string;
  icon: string;
  range: string;
  title: string;
  items: string[];
  color: string;
  gradient: string;
}

export const EntornoTrabajoContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'evaluation' | 'optimization' | 'digital' | 'complete'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [environmentScore, setEnvironmentScore] = useState(0);
  
  // Evaluation state
  const [principlesChecked, setPrinciplesChecked] = useState<string[]>([]);
  const [comfortLevel, setComfortLevel] = useState(5);
  
  // Optimization state
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  
  // Digital state
  const [digitalDistractions, setDigitalDistractions] = useState<string[]>([]);
  
  // Plan state
  const [bestChange, setBestChange] = useState('');
  const [nextWeekGoal, setNextWeekGoal] = useState('');

  const principles: Principle[] = [
    {
      id: 'luz',
      icon: <Sun className="w-8 h-8" />,
      title: 'Luz Natural',
      subtitle: 'Tu mejor aliado gratuito',
      tips: [
        'Trabajá cerca de ventanas',
        'Abrí cortinas durante el día',
        'Tomá descansos al aire libre',
        'Usá luz blanca si no hay ventanas'
      ],
      color: 'from-yellow-500 to-amber-500',
      gradient: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      id: 'aire',
      icon: <Wind className="w-8 h-8" />,
      title: 'Aire Fresco',
      subtitle: 'Energía y claridad mental',
      tips: [
        'Ventilá 10-15 minutos cada 2 horas',
        'Salí regularmente si no podés ventilar',
        'Una planta ayuda con el oxígeno',
        'Evitá espacios cerrados por mucho tiempo'
      ],
      color: 'from-cyan-500 to-blue-500',
      gradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      id: 'orden',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Orden Básico',
      subtitle: 'Claridad mental sin minimalismo extremo',
      tips: [
        'Superficie de trabajo despejada',
        'Un lugar para cada cosa',
        '5-10 minutos de orden al día',
        'Eliminá lo que no uses'
      ],
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'comodidad',
      icon: <Heart className="w-8 h-8" />,
      title: 'Comodidad Física',
      subtitle: 'Tu cuerpo es tu herramienta',
      tips: [
        'Pantalla a altura de ojos',
        'Pies tocando el suelo',
        'Cambiar de posición cada hora',
        'Espalda apoyada correctamente'
      ],
      color: 'from-red-500 to-orange-500',
      gradient: 'from-red-500/20 to-orange-500/20'
    }
  ];

  const spaceTypes: SpaceType[] = [
    {
      id: 'dormitorio',
      icon: '🛏️',
      title: 'Dormitorio Compartido',
      description: 'Espacio limitado pero con potencial',
      challenges: ['Poco espacio', 'Distracciones', 'Falta de privacidad'],
      solutions: ['Crear horarios', 'Usar auriculares', 'Señales visuales'],
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'cocina',
      icon: '🍽️',
      title: 'Mesa de Cocina/Comedor',
      description: 'Uso múltiple que requiere organización',
      challenges: ['Uso múltiple', 'Necesidad de despejar', 'Ruido familiar'],
      solutions: ['Horarios definidos', 'Kit móvil de trabajo', 'Acuerdos familiares'],
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 'sala',
      icon: '🛋️',
      title: 'Sala Compartida',
      description: 'Espacio social que puede ser productivo',
      challenges: ['TV y distracciones', 'Tráfico constante', 'Sin espacio fijo'],
      solutions: ['Zona designada', 'Auriculares', 'Organización portátil'],
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'biblioteca',
      icon: '📚',
      title: 'Biblioteca/Cafetería',
      description: 'Espacios públicos con sus propias ventajas',
      challenges: ['Sin control del entorno', 'Tiempo limitado', 'Ruido variable'],
      solutions: ['Kit portátil', 'Múltiples opciones', 'Horarios estratégicos'],
      color: 'from-orange-500 to-amber-500',
      gradient: 'from-orange-500/20 to-amber-500/20'
    }
  ];

  const budgets: Budget[] = [
    {
      id: 'free',
      icon: '🆓',
      range: '$0',
      title: 'Sin Costo',
      items: [
        'Reorganizar cerca de ventana',
        'Limpiar y ordenar',
        'Ajustar altura de monitor con libros',
        'Crear ritual de trabajo',
        'Eliminar distracciones visuales'
      ],
      color: 'from-gray-500 to-slate-600',
      gradient: 'from-gray-500/20 to-slate-600/20'
    },
    {
      id: 'low',
      icon: '💵',
      range: '$10-50',
      title: 'Inversión Mínima',
      items: [
        'Planta pequeña',
        'Lámpara de escritorio',
        'Cojín ergonómico',
        'Organizadores básicos',
        'Botella de agua reutilizable'
      ],
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 'medium',
      icon: '💰',
      range: '$50-200',
      title: 'Mejoras Significativas',
      items: [
        'Silla ergonómica básica',
        'Monitor externo usado',
        'Escritorio pequeño',
        'Auriculares con cancelación',
        'Lámpara de espectro completo'
      ],
      color: 'from-blue-500 to-indigo-500',
      gradient: 'from-blue-500/20 to-indigo-500/20'
    }
  ];

  const distractionSignals = [
    'Revisás redes automáticamente sin razón',
    'Te sentís peor después de usar redes sociales',
    'No podés concentrarte sin revisar el teléfono',
    'Comparás constantemente tu vida con otros',
    'Perdés horas sin darte cuenta'
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => p.life > 0).map(p => ({...p, life: p.life - 1}));
        if (Math.random() > 0.8 && filtered.length < 20) {
          filtered.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            life: 100,
            speed: Math.random() * 1.5 + 0.5
          });
        }
        return filtered;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const togglePrinciple = useCallback((id: string) => {
    setPrinciplesChecked(prev => {
      const newChecked = prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id];
      
      // Update score
      const principleScore = (newChecked.length / principles.length) * 25;
      const comfortScore = (comfortLevel / 10) * 25;
      setEnvironmentScore(Math.round(principleScore + comfortScore));
      
      return newChecked;
    });
  }, [comfortLevel, principles.length]);

  const handleComfortChange = useCallback((value: number) => {
    setComfortLevel(value);
    const principleScore = (principlesChecked.length / principles.length) * 25;
    const comfortScore = (value / 10) * 25;
    setEnvironmentScore(Math.round(principleScore + comfortScore));
  }, [principlesChecked.length, principles.length]);

  const toggleImprovement = useCallback((id: string) => {
    setSelectedImprovements(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const toggleDistraction = useCallback((distraction: string) => {
    setDigitalDistractions(prev =>
      prev.includes(distraction) ? prev.filter(d => d !== distraction) : [...prev, distraction]
    );
  }, []);

  const calculateFinalScore = useCallback(() => {
    const base = environmentScore;
    const spaceBonus = selectedSpace ? 10 : 0;
    const budgetBonus = selectedBudget ? 10 : 0;
    const improvementsBonus = Math.min(selectedImprovements.length * 3, 15);
    const digitalBonus = digitalDistractions.length >= 3 ? 10 : 5;
    const planBonus = (bestChange && nextWeekGoal) ? 10 : 0;
    
    return Math.min(base + spaceBonus + budgetBonus + improvementsBonus + digitalBonus + planBonus, 100);
  }, [environmentScore, selectedSpace, selectedBudget, selectedImprovements, digitalDistractions, bestChange, nextWeekGoal]);

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 100) * 0.6,
              transform: `translateY(-${(100 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 100})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(20, 184, 166, 0.5)'
            }}
          />
        ))}
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
          <div 
            className="text-center space-y-12 max-w-5xl"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Chapter Badge */}
            <div className="inline-block">
              <div className="bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20">
                <p className="text-teal-300 font-bold text-sm uppercase tracking-wider">
                  Capítulo 2 · Trabajar Online
                </p>
              </div>
            </div>

            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🏠
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 leading-tight">
                  Tu Entorno
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-cyan-400 font-bold">
                Cómo crear un espacio que te apoye (sin gastar una fortuna)
              </p>
            </div>
            
            {/* Andrea's Story Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Story Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-3xl">🤝</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">La Historia de Andrea</h3>
                      <p className="text-white/60">Y por qué importa</p>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="space-y-6">
                    <p className="text-xl text-white/90 leading-relaxed font-light">
                      Andrea era estudiante universitaria. Vivía en una residencia compartida. 
                      Su "oficina" era un escritorio básico junto a la ventana.
                    </p>
                    
                    <div className="bg-red-500/10 border-l-4 border-red-400 p-6 rounded-xl backdrop-blur-xl">
                      <p className="text-red-300 text-lg italic leading-relaxed">
                        😔 "Siento que no puedo ser productiva aquí. No tengo la iluminación perfecta, 
                        mi compañera hace ruido, y mi escritorio es básico."
                      </p>
                    </div>

                    <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                    <p className="text-xl text-white/90 font-light">
                      <strong className="text-teal-300">La transformación:</strong> En lugar de enfocarse en lo que NO tenía, 
                      optimizó lo que SÍ controlaba.
                    </p>

                    <div className="bg-green-500/10 border-l-4 border-green-400 p-6 rounded-xl backdrop-blur-xl">
                      <p className="text-green-300 font-bold text-lg mb-3">✅ 6 meses después:</p>
                      <div className="space-y-2 text-white/80">
                        <p>• Mejoró significativamente sus calificaciones</p>
                        <p>• Se sentía cómoda y productiva</p>
                        <p>• Sin gastar en "oficina perfecta"</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Insight */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 rounded-2xl border-2 border-amber-400/30 backdrop-blur-xl text-center">
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 leading-tight">
                        💡 No necesitás un entorno perfecto para prosperar.
                        <br />
                        Necesitás un entorno que funcione para vos.
                      </p>
                    </div>
                  </div>

                  {/* Stats Preview */}
                  <div className="grid sm:grid-cols-4 gap-4">
                    {[
                      { icon: <Sun className="w-6 h-6" />, label: 'Luz', color: 'from-yellow-400 to-amber-400' },
                      { icon: <Wind className="w-6 h-6" />, label: 'Aire', color: 'from-cyan-400 to-blue-400' },
                      { icon: <Sparkles className="w-6 h-6" />, label: 'Orden', color: 'from-purple-400 to-pink-400' },
                      { icon: <Heart className="w-6 h-6" />, label: 'Comodidad', color: 'from-red-400 to-orange-400' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 text-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                          {item.icon}
                        </div>
                        <p className="text-white/70 text-sm font-medium">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mission */}
                  <div className="text-center space-y-4">
                    <p className="text-2xl font-black text-white">
                      Vamos a optimizar TU espacio.
                    </p>
                    <p className="text-xl text-white/70 font-light">
                      Con lo que tenés, desde donde estés.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => setGameState('evaluation')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Home className="relative w-7 h-7" />
              <span className="relative">Evaluar mi espacio</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              Tu mejor entorno te está esperando. 🌟
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============= EVALUATION SCREEN =============
  if (gameState === 'evaluation') {
    const canProceed = principlesChecked.length > 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[150px]" />
        </div>

        {/* Subtle particles */}
        {particles.slice(0, 10).map(particle => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life / 200,
              boxShadow: '0 0 4px rgba(6, 182, 212, 0.3)'
            }}
          />
        ))}

        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Score Header */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-xl animate-pulse" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                        <Home className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                        Puntuación de Entorno
                      </p>
                      <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                        {environmentScore}%
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-1">
                      Progreso
                    </p>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                      {principlesChecked.length}<span className="text-white/30">/{principles.length}</span>
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 mt-6">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${environmentScore}%`,
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div 
            className="mb-8 max-w-4xl mx-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-xl p-6 rounded-2xl border-2 border-teal-400/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Evaluá tu espacio actual</h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    Revisá los 4 principios universales. Marcá los que <strong className="text-cyan-300">ya tenés optimizados</strong> en tu espacio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Principles Grid */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              💡 4 Principios Universales
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, index) => {
                const isChecked = principlesChecked.includes(principle.id);

                return (
                  <div
                    key={principle.id}
                    className="relative transition-all duration-300"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                    }}
                  >
                    <div 
                      className={`absolute -inset-1 bg-gradient-to-r ${principle.color} rounded-3xl transition-all duration-500 ${
                        isChecked ? 'opacity-40 blur-xl' : 'opacity-0'
                      }`}
                    />

                    <button
                      onClick={() => togglePrinciple(principle.id)}
                      className={`relative w-full text-left cursor-pointer transform transition-all duration-300`}
                    >
                      <div className={`bg-gradient-to-br ${principle.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
                        isChecked 
                          ? 'border-white/30 shadow-2xl' 
                          : 'border-white/10 shadow-xl hover:border-white/20'
                      }`}>
                        
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-16 h-16 bg-gradient-to-br ${principle.color} rounded-2xl flex items-center justify-center shadow-xl`}>
                                {principle.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-2xl font-bold text-white mb-1 leading-tight">
                                  {principle.title}
                                </h4>
                                <p className="text-white/60 text-sm font-light italic">
                                  {principle.subtitle}
                                </p>
                              </div>
                            </div>
                            {isChecked && (
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                  <CheckCircle2 className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Tips */}
                          <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10">
                            <p className="text-white/80 text-sm font-medium mb-3">Implementación práctica:</p>
                            <div className="space-y-2">
                              {principle.tips.map((tip, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="text-cyan-400 flex-shrink-0 text-sm">✓</span>
                                  <span className="text-white/70 text-sm font-light">{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comfort Slider */}
          <div 
            className="mb-12 max-w-3xl mx-auto"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  📊 ¿Cómo está tu comodidad actual?
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-white/80 font-medium">
                        Nivel de comodidad:
                      </label>
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {comfortLevel}/10
                      </div>
                    </div>
                    
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={comfortLevel}
                      onChange={(e) => handleComfortChange(Number(e.target.value))}
                      className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer slider-thumb"
                      style={{
                        background: `linear-gradient(to right, 
                          rgb(168, 85, 247) 0%, 
                          rgb(168, 85, 247) ${comfortLevel * 10}%, 
                          rgba(255,255,255,0.1) ${comfortLevel * 10}%, 
                          rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                    
                    <div className="flex justify-between mt-3">
                      <span className="text-white/40 text-sm">😔 Incómodo</span>
                      <span className="text-white/40 text-sm">😊 Perfecto</span>
                    </div>
                  </div>

                  {comfortLevel <= 5 && (
                    <div className="bg-amber-500/20 backdrop-blur-xl p-5 rounded-2xl border-2 border-amber-400/30 animate-fadeIn">
                      <p className="text-amber-200 text-sm leading-relaxed">
                        💡 Con pequeños cambios podés mejorar mucho. Empezá con los principios universales.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('optimization')}
              disabled={!canProceed}
              className={`group relative inline-flex items-center gap-3 px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 ${
                canProceed
                  ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white hover:scale-105 shadow-2xl hover:shadow-cyan-500/50'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              {canProceed && (
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              )}
              <span className="relative">Optimizar mi espacio</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
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

          .slider-thumb::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
          }

          .slider-thumb::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          }

          .slider-thumb::-moz-range-thumb {
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border: none;
            transition: all 0.2s ease;
          }

          .slider-thumb::-moz-range-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // ============= OPTIMIZATION SCREEN =============
  if (gameState === 'optimization') {
    const canProceed = selectedSpace !== null && selectedBudget !== null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Header */}
          <div 
            className="mb-12 text-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              🏠 Soluciones Para Tu Situación
            </h2>
            <p className="text-xl text-white/70 font-light">
              Seleccioná tu tipo de espacio y presupuesto
            </p>
          </div>

          {/* Space Types */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              1️⃣ Tu tipo de espacio
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {spaceTypes.map((space, index) => {
                const isSelected = selectedSpace === space.id;

                return (
                  <div
                    key={space.id}
                    className="relative transition-all duration-300"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'scale(1)' : 'scale(0.95)',
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                    }}
                  >
                    <div 
                      className={`absolute -inset-1 bg-gradient-to-r ${space.color} rounded-3xl transition-all duration-500 ${
                        isSelected ? 'opacity-40 blur-xl' : 'opacity-0'
                      }`}
                    />

                    <button
                      onClick={() => setSelectedSpace(space.id)}
                      className="relative w-full text-left"
                    >
                      <div className={`bg-gradient-to-br ${space.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-white/30 shadow-2xl' 
                          : 'border-white/10 hover:border-white/20'
                      }`}>
                        
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <span className="text-5xl">{space.icon}</span>
                              <div>
                                <h4 className="text-xl font-bold text-white mb-1">
                                  {space.title}
                                </h4>
                                <p className="text-white/60 text-sm font-light">
                                  {space.description}
                                </p>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>

                          {isSelected && (
                            <div className="space-y-4 animate-fadeIn">
                              <div className="bg-red-500/10 backdrop-blur-xl p-4 rounded-xl border border-red-400/30">
                                <p className="text-red-300 text-sm font-semibold mb-2">🚨 Desafíos comunes:</p>
                                <div className="space-y-1">
                                  {space.challenges.map((challenge, i) => (
                                    <p key={i} className="text-white/70 text-sm">• {challenge}</p>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-green-500/10 backdrop-blur-xl p-4 rounded-xl border border-green-400/30">
                                <p className="text-green-300 text-sm font-semibold mb-2">✅ Soluciones prácticas:</p>
                                <div className="space-y-1">
                                  {space.solutions.map((solution, i) => (
                                    <p key={i} className="text-white/70 text-sm">• {solution}</p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget Options */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              2️⃣ Tu presupuesto disponible
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {budgets.map((budget, index) => {
                const isSelected = selectedBudget === budget.id;

                return (
                  <div
                    key={budget.id}
                    className="relative transition-all duration-300"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'scale(1)' : 'scale(0.95)',
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
                    }}
                  >
                    <div 
                      className={`absolute -inset-1 bg-gradient-to-r ${budget.color} rounded-3xl transition-all duration-500 ${
                        isSelected ? 'opacity-40 blur-xl' : 'opacity-0'
                      }`}
                    />

                    <button
                      onClick={() => setSelectedBudget(budget.id)}
                      className="relative w-full"
                    >
                      <div className={`bg-gradient-to-br ${budget.gradient} backdrop-blur-2xl rounded-3xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-white/30 shadow-2xl' 
                          : 'border-white/10 hover:border-white/20'
                      }`}>
                        
                        <div className="p-6">
                          <div className="text-center mb-4">
                            <span className="text-5xl mb-3 block">{budget.icon}</span>
                            <p className="text-3xl font-black text-white mb-1">{budget.range}</p>
                            <p className="text-white/60 text-sm font-medium">{budget.title}</p>
                          </div>

                          {isSelected && (
                            <div className="space-y-3 animate-fadeIn">
                              <p className="text-white/80 text-sm font-semibold text-center">
                                Opciones disponibles:
                              </p>
                              {budget.items.map((item, i) => (
                                <label key={i} className="flex items-start gap-2 cursor-pointer bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={selectedImprovements.includes(`${budget.id}-${i}`)}
                                    onChange={() => toggleImprovement(`${budget.id}-${i}`)}
                                    className="mt-0.5"
                                  />
                                  <span className="text-white/80 text-sm font-light">{item}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {selectedImprovements.length > 0 && (
              <div className="mt-6 bg-green-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-green-400/30 animate-fadeIn">
                <p className="text-green-300 font-bold text-lg mb-2">
                  ✅ Has seleccionado {selectedImprovements.length} mejoras
                </p>
                <p className="text-white/70 text-sm">
                  Empezá con 1-2 cambios esta semana. El progreso gradual es más sostenible.
                </p>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('digital')}
              disabled={!canProceed}
              className={`group relative inline-flex items-center gap-3 px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 ${
                canProceed
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 shadow-2xl hover:shadow-purple-500/50'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              {canProceed && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              )}
              <span className="relative">Revisar higiene digital</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= DIGITAL SCREEN =============
  if (gameState === 'digital') {
    const hasDistractions = digitalDistractions.length >= 3;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Header */}
          <div 
            className="mb-12 text-center"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-7xl">📱</div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Higiene Digital
            </h2>
            <p className="text-xl text-white/70 font-light">
              Tu espacio virtual es tan importante como tu espacio físico
            </p>
          </div>

          {/* Distraction Checklist */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-red-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  Señales de alerta
                </h3>

                <p className="text-white/70 mb-6 font-light">
                  Marcá las que te identifiquen:
                </p>

                <div className="space-y-3">
                  {distractionSignals.map((signal, i) => (
                    <label
                      key={i}
                      className="flex items-start gap-3 cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300"
                    >
                      <input
                        type="checkbox"
                        checked={digitalDistractions.includes(signal)}
                        onChange={() => toggleDistraction(signal)}
                        className="mt-0.5"
                      />
                      <span className="text-white/90 font-light leading-relaxed">
                        {signal}
                      </span>
                    </label>
                  ))}
                </div>

                {hasDistractions && (
                  <div className="mt-6 bg-red-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-red-400/40 animate-fadeIn">
                    <p className="text-red-300 font-bold text-lg flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6" />
                      Identificaste {digitalDistractions.length} señales. Es hora de actuar.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4-Week Plan */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-purple-400" />
                  Plan de Limpieza Digital (4 Semanas)
                </h3>

                <div className="space-y-5">
                  {[
                    { week: 1, title: 'Auditoría', desc: 'Revisa tiempo de pantalla, identifica apps problemáticas', color: 'from-purple-400 to-purple-500' },
                    { week: 2, title: 'Curación', desc: 'Deja de seguir cuentas tóxicas, silencia palabras negativas', color: 'from-pink-400 to-pink-500' },
                    { week: 3, title: 'Límites', desc: 'Configura límites de tiempo, crea zonas libres de teléfono', color: 'from-orange-400 to-orange-500' },
                    { week: 4, title: 'Hábitos nuevos', desc: 'Reemplaza scroll con actividades productivas', color: 'from-green-400 to-green-500' }
                  ].map((week, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border-l-4 border-white/20">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${week.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <span className="text-white font-bold text-lg">{week.week}</span>
                        </div>
                        <div className="flex-1">
                          <p className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${week.color} mb-2`}>
                            Semana {week.week}: {week.title}
                          </p>
                          <p className="text-white/70 font-light">{week.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('complete')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Crear mi plan final</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= COMPLETE SCREEN =============
  if (gameState === 'complete') {
    const finalScore = calculateFinalScore();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 py-16">
          
          <div 
            className="space-y-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Epic Hero Section */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Award className="w-32 h-32 text-teal-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  🎉 Tu Espacio
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
                    Está Listo
                  </span>
                </h2>
                
                <p className="text-2xl sm:text-3xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                  Optimizaste tu entorno para el éxito
                </p>

                {/* Final Score */}
                <div className="inline-block">
                  <div className="bg-white/10 backdrop-blur-xl px-12 py-8 rounded-3xl border-2 border-teal-400/30">
                    <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Puntuación Final</p>
                    <p className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                      {finalScore}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Plan */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-indigo-400/30">
                <h3 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                  <Target className="w-10 h-10 text-indigo-400" />
                  Tu Plan Personalizado
                </h3>

                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                    <label className="block text-white/80 font-semibold mb-3">
                      ¿Qué cambio tuvo mayor impacto esta semana?
                    </label>
                    <textarea
                      value={bestChange}
                      onChange={(e) => setBestChange(e.target.value)}
                      placeholder="Ej: Reorganicé mi escritorio cerca de la ventana y ahora tengo mejor luz..."
                      className="w-full bg-white/5 backdrop-blur-xl text-white placeholder-white/40 px-6 py-4 rounded-xl border-2 border-white/20 focus:border-indigo-400 focus:outline-none min-h-[100px] resize-none font-light"
                    />
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                    <label className="block text-white/80 font-semibold mb-3">
                      ¿Qué querés mejorar la próxima semana?
                    </label>
                    <textarea
                      value={nextWeekGoal}
                      onChange={(e) => setNextWeekGoal(e.target.value)}
                      placeholder="Ej: Voy a configurar límites de tiempo en Instagram..."
                      className="w-full bg-white/5 backdrop-blur-xl text-white placeholder-white/40 px-6 py-4 rounded-xl border-2 border-white/20 focus:border-indigo-400 focus:outline-none min-h-[100px] resize-none font-light"
                    />
                  </div>

                  {(bestChange || nextWeekGoal) && (
                    <div className="bg-green-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-green-400/30 animate-fadeIn">
                      <p className="text-green-300 font-bold text-lg mb-2">
                        🎯 Tu plan está tomando forma
                      </p>
                      <p className="text-white/70">
                        Recordá: Progreso gradual &gt; Perfección instantánea
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: 'Principios', value: `${principlesChecked.length}/4`, icon: <CheckCircle2 className="w-6 h-6" />, color: 'from-teal-400 to-cyan-400' },
                { label: 'Mejoras', value: selectedImprovements.length, icon: <TrendingUp className="w-6 h-6" />, color: 'from-purple-400 to-pink-400' },
                { label: 'Consciencia', value: digitalDistractions.length >= 3 ? 'Alta' : 'Media', icon: <Brain className="w-6 h-6" />, color: 'from-orange-400 to-amber-400' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                    {stat.icon}
                  </div>
                  <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                  <p className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Final Message */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-12 rounded-3xl border-2 border-white/20 text-center">
                <h3 className="text-3xl font-bold text-white mb-6">
                  ✨ La Verdad Sobre Espacios "Perfectos"
                </h3>

                <div className="space-y-6 max-w-3xl mx-auto">
                  <p className="text-2xl text-white/90 leading-relaxed">
                    No existe el entorno perfecto universal.
                  </p>
                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    Tu mejor espacio es el que se adapta a TU realidad.
                  </p>
                  <p className="text-xl text-white/70 font-light leading-relaxed">
                    Miles de personas exitosas trabajaron desde cocinas, bibliotecas, 
                    cafeterías y espacios compartidos.
                  </p>

                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 mt-8">
                    <p className="text-2xl font-bold text-white">
                      Tu entorno debe apoyarte...
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                        Pero NO define tu potencial. 💪
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-teal-400" />
                <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-teal-400" />
              </div>
              
              <p className="text-2xl font-bold text-white">
                🚀 Ya tenés tu espacio optimizado...
              </p>
              <p className="text-xl text-white/70">
                Ahora es hora de encontrar tu nicho perfecto en el mundo online.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return null;
};

export const entornoTrabajoMetadata = {
  id: 2,
  title: "Tu Entorno de Trabajo",
  type: "document" as const,
  duration: "25 min"
};

export default EntornoTrabajoContent;