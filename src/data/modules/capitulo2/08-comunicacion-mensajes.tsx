import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageSquare, AlignLeft, Map, Megaphone, Lightbulb, Copy, 
  CheckCircle2, Sparkles, ChevronRight, Trophy, Flame, Zap,
  Check, Brain, Rocket, Lock, Unlock, Star, ArrowRight, Eye,
  AlertCircle, Award, TrendingUp, Heart, Radio, Building2,
  Target, Clock, Shield, Users, Volume2, Mic, Speaker,
  Layers, Focus, BarChart3, CheckCircle
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Componente {
  id: number;
  icon: React.ReactNode;
  titulo: string;
  emoji: string;
  subtitulo: string;
  descripcion: string;
  caracteristicas: string[];
  tips: string[];
  gradient: string;
}

export const ComunicacionMensajesContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'examples' | 'build' | 'preview' | 'bonus' | 'complete'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [componenteActivo, setComponenteActivo] = useState<number>(1);
  const [completados, setCompletados] = useState<{[key: number]: boolean}>({});
  
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  
  // Formularios
  const [mensajeCorto, setMensajeCorto] = useState('');
  const [mensajeLargo, setMensajeLargo] = useState({
    quien: '',
    resultado: '',
    tiempo: '',
    garantia: '',
    polarizacion: ''
  });
  const [estrategia, setEstrategia] = useState('');
  const [pitch, setPitch] = useState({
    promesa: '',
    estrategia: '',
    garantia: '',
    ultimatum: '',
    empaque: ''
  });

  const ejemplosReales = [
    {
      marca: 'Nike',
      mensaje: 'Just Do It',
      explicacion: 'No habla de zapatillas, habla de la actitud: ser valiente y activo.',
      color: 'from-orange-500 to-red-500',
      icon: '👟'
    },
    {
      marca: 'Apple',
      mensaje: 'Think Different',
      explicacion: 'No habla de computadoras, habla de sentirse único e innovador.',
      color: 'from-gray-500 to-slate-600',
      icon: '🍎'
    },
    {
      marca: 'L\'Oréal',
      mensaje: 'Because You\'re Worth It',
      explicacion: 'Habla de autoestima y valor personal, no de maquillaje.',
      color: 'from-pink-500 to-rose-500',
      icon: '💄'
    },
    {
      marca: 'Red Bull',
      mensaje: 'Gives You Wings',
      explicacion: 'No vende energía, vende libertad y posibilidades.',
      color: 'from-blue-500 to-indigo-500',
      icon: '🪽'
    },
    {
      marca: 'Mastercard',
      mensaje: 'There are some things money can\'t buy',
      explicacion: 'Vende experiencias memorables, no tarjetas de crédito.',
      color: 'from-amber-500 to-yellow-500',
      icon: '💳'
    },
    {
      marca: 'BMW',
      mensaje: 'The Ultimate Driving Machine',
      explicacion: 'No vende autos, vende la experiencia de conducir perfecto.',
      color: 'from-cyan-500 to-blue-600',
      icon: '🚗'
    }
  ];

  const componentes: Componente[] = [
    {
      id: 1,
      icon: <MessageSquare className="w-6 h-6" />,
      titulo: 'El Mensaje Corto',
      emoji: '💬',
      subtitulo: 'Tu carta de presentación (3-6 palabras)',
      descripcion: 'Es lo primero que la gente va a recordar de vos. Tiene que ser fuerte, clara y memorable.',
      caracteristicas: [
        'Clara: se entiende al instante',
        'Fuerte: genera emoción o curiosidad',
        'Memorable: fácil de recordar y compartir',
        'Única: diferente a tu competencia'
      ],
      tips: [
        'No expliques paso a paso lo que hacés',
        'Hablá de la transformación que lográs',
        'Conectá con el deseo profundo del cliente',
        'Debe caber en una tarjeta de presentación'
      ],
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 2,
      icon: <AlignLeft className="w-6 h-6" />,
      titulo: 'El Mensaje Largo',
      emoji: '📝',
      subtitulo: 'Ampliá el zoom sin perder fuerza (1-4 oraciones)',
      descripcion: 'Explica claramente a quién ayudás, qué resultado entregás, en cuánto tiempo y con qué garantía.',
      caracteristicas: [
        'A quién ayudás (nicho específico)',
        'Qué resultado entregás (transformación)',
        'En cuánto tiempo (plazo tangible)',
        'Qué garantía ofrecés (reducción de riesgo)'
      ],
      tips: [
        'Sé claro y concreto, nada de ambigüedades',
        'Usa números o plazos tangibles',
        'Incluí una garantía creíble',
        'Agregá polarización para filtrar'
      ],
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 3,
      icon: <Map className="w-6 h-6" />,
      titulo: 'La Estrategia',
      emoji: '🗺️',
      subtitulo: '¿Cómo vas a lograr el resultado?',
      descripcion: 'Mostrá que tenés un camino claro, bien pensado y probado. No cuentes todo, solo genera confianza.',
      caracteristicas: [
        'Un método claro y estructurado',
        'Pasos concretos que dan confianza',
        'Sistema probado, no improvisación',
        'Diferenciador frente a competencia'
      ],
      tips: [
        'No tiene que contar todos los secretos',
        'Solo despertar interés y dar seguridad',
        'Dejar con ganas de saber más',
        'Mostrar que hay un proceso detrás'
      ],
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 4,
      icon: <Megaphone className="w-6 h-6" />,
      titulo: 'El Pitch Final',
      emoji: '🎤',
      subtitulo: 'Tu mensaje estrella (menos de 2 minutos)',
      descripcion: 'La presentación completa de tu oferta, lista para usar en videos, webs, correos, llamadas.',
      caracteristicas: [
        'La Promesa: resultado concreto',
        'La Estrategia: cómo lo lográs',
        'La Garantía: qué pasa si no funciona',
        'El Ultimátum: qué pierde si no actúa',
        'El Empaque: comparación clara'
      ],
      tips: [
        'Debe leerse en menos de 2 minutos',
        'Hacer pensar: "Esto es justo lo que necesito"',
        'Es tu carta maestra en cualquier situación',
        'Practicalo hasta que fluya natural'
      ],
      gradient: 'from-orange-500/20 to-amber-500/20'
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const filtered = prev.filter(p => p.life > 0).map(p => ({...p, life: p.life - 1}));
        if (Math.random() > 0.8 && filtered.length < 30) {
          filtered.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            life: 120,
            speed: Math.random() * 1.5 + 0.5
          });
        }
        return filtered;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const marcarCompletado = useCallback((id: number) => {
    // Validar que tenga contenido antes de marcar como completado
    if (id === 1 && !mensajeCorto.trim()) return;
    if (id === 2 && (!mensajeLargo.quien || !mensajeLargo.resultado || !mensajeLargo.tiempo)) return;
    if (id === 3 && !estrategia.trim()) return;
    if (id === 4 && (!pitch.promesa || !pitch.estrategia || !pitch.garantia)) return;

    setCompletados(prev => ({
      ...prev,
      [id]: true
    }));
    
    // Auto-avanzar a la siguiente sección
    if (id < componentes.length) {
      setTimeout(() => {
        setComponenteActivo(id + 1);
      }, 500);
    }
  }, [mensajeCorto, mensajeLargo, estrategia, pitch, componentes.length]);

  const calcularProgreso = useCallback(() => {
    const total = componentes.length;
    const completado = Object.values(completados).filter(v => v).length;
    return Math.round((completado / total) * 100);
  }, [completados, componentes.length]);

  const generarMensajeLargo = useCallback(() => {
    if (!mensajeLargo.quien || !mensajeLargo.resultado || !mensajeLargo.tiempo) {
      return null;
    }

    let mensaje = `Te ayudo a ${mensajeLargo.quien} a lograr ${mensajeLargo.resultado} en ${mensajeLargo.tiempo}.`;
    
    if (mensajeLargo.garantia) {
      mensaje += ` ${mensajeLargo.garantia}`;
    }
    
    if (mensajeLargo.polarizacion) {
      mensaje += `\n\n⚠️ Esto NO es para vos si ${mensajeLargo.polarizacion}`;
    }

    return mensaje;
  }, [mensajeLargo]);

  const generarPitchCompleto = useCallback(() => {
    if (!pitch.promesa || !pitch.estrategia || !pitch.garantia) {
      return null;
    }

    return `🎯 La Promesa:\n${pitch.promesa}\n\n⚙️ Cómo lo logramos:\n${pitch.estrategia}\n\n🛡️ Garantía:\n${pitch.garantia}\n\n⚠️ El Ultimátum:\n${pitch.ultimatum || 'Podés seguir igual... o probar algo que sí funciona.'}\n\n📦 En resumen:\n${pitch.empaque || 'Somos la solución más clara y efectiva para tu problema.'}`;
  }, [pitch]);

  const generarPromptBonus = useCallback(() => {
    const prompt = `Actuá como un experto en copywriting y marketing que conoce profundamente a mi cliente ideal.

**CONTEXTO DE MI NEGOCIO:**
${mensajeCorto ? `- Mensaje corto: "${mensajeCorto}"` : ''}
${mensajeLargo.quien ? `- Cliente ideal: ${mensajeLargo.quien}` : ''}
${mensajeLargo.resultado ? `- Resultado que ofrezco: ${mensajeLargo.resultado}` : ''}
${estrategia ? `- Mi estrategia: ${estrategia}` : ''}

**TU TAREA:**
Ayúdame a descubrir mi diferencial invisible respondiendo estas preguntas:

1. ¿Qué problema tiene mi cliente cada día que nadie más está resolviendo bien?
2. ¿Qué ha probado sin éxito y por qué falló?
3. ¿Qué busca desesperadamente en una solución?
4. ¿Qué lenguaje exacto usa cuando habla de su frustración?
5. ¿Qué desearía encontrar en alguien como yo?
6. ¿Qué objeciones tiene en su mente antes de comprar?
7. ¿Qué lo haría decir "¡ESTO ES EXACTAMENTE LO QUE NECESITO!"?

Luego, basándote en esas respuestas, dame:
- 5 variaciones de mi mensaje corto (3-6 palabras cada uno)
- 3 opciones de mensaje largo más poderosas
- Ideas de ángulos únicos que me diferencien de mi competencia
- Frases que podría usar en mi pitch que generen urgencia genuina

Quiero que hables con el lenguaje emocional de mi cliente, no con jerga de marketing.`;

    return prompt;
  }, [mensajeCorto, mensajeLargo, estrategia]);

  const copyToClipboard = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2500);
  }, []);

  const puedeAvanzar = (componenteId: number) => {
    if (componenteId === 1) return true;
    return completados[componenteId - 1] === true;
  };

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 120) * 0.6,
              transform: `translateY(-${(120 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 120})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(96, 165, 250, 0.5)'
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
                <p className="text-blue-300 font-bold text-sm uppercase tracking-wider">
                  Módulo 8 · El Arte de Comunicar Valor
                </p>
              </div>
            </div>

            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🎙️
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 leading-tight">
                  Mensajes
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 leading-tight">
                  Irresistibles
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-blue-400 font-bold">
                Cómo construir ofertas que el mercado no pueda ignorar
              </p>
            </div>
            
            {/* Main Hook Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Volume2 className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white text-center mb-6">
                      🎯 El Poder de las Palabras Correctas
                    </h3>
                    
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Tenés algo valioso. Ahora necesitás <strong className="text-blue-400">comunicarlo</strong> de forma que el mercado 
                      <strong className="text-indigo-400"> lo desee</strong>, lo busque y esté dispuesto a pagarlo.
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

                  {/* Key Insight */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 rounded-2xl border-2 border-indigo-400/30 backdrop-blur-xl text-center">
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 leading-tight">
                        💡 No es sobre ventas. Es sobre liderazgo.
                        <br />
                        No es lo que hacés. Es cómo lo contás.
                      </p>
                    </div>
                  </div>

                  {/* What You'll Build */}
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      🎮 Vas a crear:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { icon: '💬', text: 'Mensaje Corto Memorable' },
                        { icon: '📝', text: 'Mensaje Largo Completo' },
                        { icon: '🗺️', text: 'Estrategia Clara' },
                        { icon: '🎤', text: 'Pitch de 2 Minutos' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
                          <span className="text-3xl">{item.icon}</span>
                          <p className="text-white font-medium">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Premium */}
            <button
              onClick={() => setGameState('examples')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Rocket className="relative w-7 h-7" />
              <span className="relative">Ver ejemplos que funcionan</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              Las palabras correctas pueden cambiar tu negocio. 🎯
            </p>
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

  // ============= EXAMPLES SCREEN =============
  if (gameState === 'examples') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[150px]" />
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
              💡 Ejemplos que Funcionan en el Mundo Real
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Estas marcas no explican lo que hacen. Hablan de transformación, identidad y sentimiento.
            </p>
          </div>

          {/* Key Insight */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-amber-400/30 text-center">
                <Lightbulb className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <p className="text-2xl font-bold text-white mb-4">
                  🎯 ¿Qué tienen en común estos mensajes?
                </p>
                <p className="text-xl text-white/90 leading-relaxed">
                  No explican paso a paso. <strong className="text-amber-300">Hablan de transformación, identidad y deseo profundo.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Ejemplos de Marcas */}
          <div 
            className="mb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s'
            }}
          >
            {ejemplosReales.map((ejemplo, idx) => (
              <div
                key={idx}
                className="relative group"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'scale(1)' : 'scale(0.95)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.1}s`
                }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${ejemplo.color} rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border-2 border-white/10 group-hover:border-white/20 transition-all duration-300 h-full">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{ejemplo.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{ejemplo.marca}</h3>
                  </div>
                  
                  <div className={`bg-gradient-to-r ${ejemplo.color} p-6 rounded-2xl mb-4 text-center`}>
                    <p className="text-2xl font-black text-white leading-tight">
                      "{ejemplo.mensaje}"
                    </p>
                  </div>
                  
                  <p className="text-white/70 leading-relaxed text-center">
                    {ejemplo.explicacion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lección Clave */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 backdrop-blur-2xl p-10 rounded-3xl text-center">
                <p className="text-2xl font-bold text-white mb-4">
                  La lección es clara:
                </p>
                <p className="text-3xl font-black text-white leading-tight">
                  Los mejores mensajes no venden productos.
                  <br />
                  Venden transformación, identidad y aspiración.
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setGameState('build')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Crear mis mensajes</span>
              <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= BUILD SCREEN =============
  if (gameState === 'build') {
    const progress = calcularProgreso();
    const componenteActual = componentes.find(c => c.id === componenteActivo);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
          {/* Header con Progress */}
          <div 
            className="mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-2xl p-6 rounded-3xl border-2 border-blue-400/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-blue-300 font-bold text-sm uppercase tracking-wider mb-1">
                      Tu Progreso
                    </p>
                    <p className="text-white text-3xl font-black">
                      {Object.values(completados).filter(v => v).length} / {componentes.length} Componentes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                      {progress}%
                    </p>
                  </div>
                </div>
                
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${progress}%`,
                      boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>

                {progress === 100 && (
                  <div className="mt-4 bg-blue-500/20 backdrop-blur-xl p-4 rounded-2xl border-2 border-blue-400/30 text-center animate-fadeIn">
                    <p className="text-blue-200 font-bold text-lg">
                      🎉 ¡Completaste todos los componentes! Tu comunicación está lista
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navegación de Componentes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {componentes.map((comp) => {
              const bloqueado = !puedeAvanzar(comp.id);
              const estaActivo = componenteActivo === comp.id;
              const completado = completados[comp.id];

              return (
                <button
                  key={comp.id}
                  onClick={() => !bloqueado && setComponenteActivo(comp.id)}
                  disabled={bloqueado}
                  className={`relative group p-4 rounded-2xl transition-all ${
                    bloqueado 
                      ? 'bg-gray-800/50 opacity-50 cursor-not-allowed' 
                      : estaActivo 
                        ? 'bg-gradient-to-br from-blue-500/30 to-indigo-500/30 border-2 border-blue-400 scale-105' 
                        : completado
                          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400 hover:scale-105'
                          : 'bg-white/5 border-2 border-white/10 hover:border-white/30 hover:scale-105'
                  }`}
                >
                  <div className="text-center">
                    {bloqueado ? (
                      <Lock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    ) : completado ? (
                      <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    ) : (
                      <span className="text-4xl block mb-2">{comp.emoji}</span>
                    )}
                    <p className={`text-sm font-bold ${
                      bloqueado ? 'text-gray-500' : estaActivo ? 'text-blue-300' : completado ? 'text-green-300' : 'text-white/70'
                    }`}>
                      {comp.titulo}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Componente Actual */}
          {componenteActual && (
            <div 
              className="space-y-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Header del Componente */}
              <div className="relative group">
                <div className={`absolute -inset-1 rounded-3xl opacity-20 blur-xl bg-gradient-to-r ${componenteActual.gradient.replace('/20', '')}`} />
                
                <div className={`relative bg-gradient-to-br ${componenteActual.gradient} backdrop-blur-2xl p-8 rounded-3xl border-2 border-white/10`}>
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`p-4 rounded-2xl ${
                      completados[componenteActual.id] 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-white'
                    }`}>
                      {completados[componenteActual.id] ? (
                        <CheckCircle2 className="w-8 h-8" />
                      ) : (
                        componenteActual.icon
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-5xl">{componenteActual.emoji}</span>
                        <div>
                          <p className="text-blue-300 font-bold text-sm uppercase tracking-wider">
                            Componente {componenteActual.id} de {componentes.length}
                          </p>
                          <h2 className="text-3xl font-bold text-white">
                            {componenteActual.titulo}
                          </h2>
                          <p className="text-white/70 text-lg mt-1">
                            {componenteActual.subtitulo}
                          </p>
                        </div>
                      </div>
                      <p className="text-white/80 text-lg leading-relaxed">
                        {componenteActual.descripcion}
                      </p>
                    </div>
                  </div>

                  {completados[componenteActual.id] && (
                    <div className="bg-green-500/20 backdrop-blur-xl p-4 rounded-2xl border-2 border-green-400/30 animate-fadeIn">
                      <p className="text-green-200 text-center font-bold">
                        ✅ Componente Completado - ¡Excelente trabajo!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Características */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl p-6 rounded-3xl border-2 border-indigo-400/30">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-indigo-400" />
                    <h3 className="font-bold text-xl text-white">✅ Debe incluir:</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {componenteActual.caracteristicas.map((caract, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <p className="text-white/80">{caract}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-2xl p-6 rounded-3xl border-2 border-amber-400/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-amber-400" />
                    <h3 className="font-bold text-xl text-white">💡 Tips profesionales:</h3>
                  </div>
                  <div className="space-y-3">
                    {componenteActual.tips.map((tip, idx) => (
                      <div key={idx} className="bg-amber-500/10 backdrop-blur-xl p-4 rounded-xl border-l-4 border-amber-400">
                        <p className="text-white/80 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Formulario Dinámico */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border-2 border-blue-400/30">
                  {/* Componente 1: Mensaje Corto */}
                  {componenteActual.id === 1 && (
                    <div className="space-y-4">
                      <label className="block text-lg font-bold text-white mb-3">
                        ✍️ Creá tu Mensaje Corto (3-6 palabras):
                      </label>
                      <input
                        type="text"
                        value={mensajeCorto}
                        onChange={(e) => setMensajeCorto(e.target.value)}
                        placeholder="Ej: Creá. Conectá. Vendé."
                        maxLength={50}
                        className="w-full p-5 bg-white/10 backdrop-blur-xl text-white text-xl placeholder-white/40 rounded-2xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all duration-300"
                      />
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Eye className="w-4 h-4" />
                        <span>{mensajeCorto.length}/50 caracteres</span>
                      </div>
                      
                      {mensajeCorto && (
                        <div className="mt-4 animate-fadeIn">
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-2xl text-center">
                            <p className="text-sm text-white/80 uppercase tracking-wider mb-2">Vista Previa:</p>
                            <p className="text-4xl font-black text-white leading-tight">
                              {mensajeCorto}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Componente 2: Mensaje Largo */}
                  {componenteActual.id === 2 && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          ¿A quién ayudás?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.quien}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, quien: e.target.value})}
                          placeholder="Ej: clínicas de estética"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          ¿Qué resultado entregás?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.resultado}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, resultado: e.target.value})}
                          placeholder="Ej: organizar turnos sin perder sesiones"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          ¿En cuánto tiempo?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.tiempo}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, tiempo: e.target.value})}
                          placeholder="Ej: 30 días"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          ¿Qué garantía ofrecés?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.garantia}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, garantia: e.target.value})}
                          placeholder="Ej: Si no funciona, te devolvemos el dinero"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          Polarización (opcional): ¿Para quién NO es?
                        </label>
                        <input
                          type="text"
                          value={mensajeLargo.polarizacion}
                          onChange={(e) => setMensajeLargo({...mensajeLargo, polarizacion: e.target.value})}
                          placeholder="Ej: buscás soluciones rápidas sin comprometerte"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>

                      {generarMensajeLargo() && (
                        <div className="mt-6 animate-fadeIn">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl">
                            <p className="text-sm text-white/80 uppercase tracking-wider mb-3">Vista Previa:</p>
                            <p className="text-xl text-white leading-relaxed whitespace-pre-wrap">
                              {generarMensajeLargo()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Componente 3: Estrategia */}
                  {componenteActual.id === 3 && (
                    <div className="space-y-4">
                      <label className="block text-lg font-bold text-white mb-3">
                        ✍️ Describe tu estrategia (sin contar todo):
                      </label>
                      <textarea
                        value={estrategia}
                        onChange={(e) => setEstrategia(e.target.value)}
                        placeholder="Ej: Usamos un sistema de 3 pasos probado con más de 100 clínicas: automatizamos la agenda, recordamos turnos y analizamos patrones para optimizar horarios."
                        className="w-full p-5 bg-white/10 backdrop-blur-xl text-white text-lg placeholder-white/40 rounded-2xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all duration-300 min-h-[180px]"
                        rows={6}
                      />
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Eye className="w-4 h-4" />
                        <span>{estrategia.length} caracteres</span>
                      </div>

                      {estrategia && (
                        <div className="mt-4 animate-fadeIn">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-2xl">
                            <p className="text-sm text-white/80 uppercase tracking-wider mb-3">Vista Previa:</p>
                            <p className="text-lg text-white leading-relaxed">
                              {estrategia}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Componente 4: Pitch */}
                  {componenteActual.id === 4 && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          1. La Promesa (resultado concreto):
                        </label>
                        <input
                          type="text"
                          value={pitch.promesa}
                          onChange={(e) => setPitch({...pitch, promesa: e.target.value})}
                          placeholder="Ej: Te ayudamos a duplicar tus ventas en 90 días"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          2. La Estrategia (cómo lo lográs):
                        </label>
                        <textarea
                          value={pitch.estrategia}
                          onChange={(e) => setPitch({...pitch, estrategia: e.target.value})}
                          placeholder="Ej: Con un sistema probado de 3 pasos..."
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          3. La Garantía (qué pasa si no funciona):
                        </label>
                        <input
                          type="text"
                          value={pitch.garantia}
                          onChange={(e) => setPitch({...pitch, garantia: e.target.value})}
                          placeholder="Ej: Si no ves resultados en 90 días, te devolvemos todo"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          4. El Ultimátum (qué pierde si no actúa):
                        </label>
                        <input
                          type="text"
                          value={pitch.ultimatum}
                          onChange={(e) => setPitch({...pitch, ultimatum: e.target.value})}
                          placeholder="Ej: Podés seguir igual... o probar algo que sí funciona"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">
                          5. El Empaque (comparación clara):
                        </label>
                        <input
                          type="text"
                          value={pitch.empaque}
                          onChange={(e) => setPitch({...pitch, empaque: e.target.value})}
                          placeholder="Ej: Somos como el Uber de las citas profesionales"
                          className="w-full p-4 bg-white/10 backdrop-blur-xl text-white placeholder-white/40 rounded-xl border-2 border-white/20 focus:border-blue-400 focus:outline-none transition-all"
                        />
                      </div>

                      {generarPitchCompleto() && (
                        <div className="mt-6 animate-fadeIn">
                          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 rounded-2xl">
                            <p className="text-sm text-white/80 uppercase tracking-wider mb-3">Vista Previa del Pitch:</p>
                            <div className="text-white leading-relaxed whitespace-pre-wrap">
                              {generarPitchCompleto()}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!completados[componenteActual.id] && (
                  <button
                    onClick={() => marcarCompletado(componenteActual.id)}
                    disabled={
                      (componenteActual.id === 1 && !mensajeCorto.trim()) ||
                      (componenteActual.id === 2 && (!mensajeLargo.quien || !mensajeLargo.resultado || !mensajeLargo.tiempo)) ||
                      (componenteActual.id === 3 && !estrategia.trim()) ||
                      (componenteActual.id === 4 && (!pitch.promesa || !pitch.estrategia || !pitch.garantia))
                    }
                    className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 active:scale-95 disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <CheckCircle2 className="relative w-6 h-6" />
                    <span className="relative">Completar componente</span>
                  </button>
                )}

                {componenteActual.id < componentes.length && completados[componenteActual.id] && (
                  <button
                    onClick={() => setComponenteActivo(componenteActual.id + 1)}
                    className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <span className="relative">Siguiente componente</span>
                    <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                )}

                {progress === 100 && (
                  <button
                    onClick={() => setGameState('preview')}
                    className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <Eye className="relative w-6 h-6" />
                    <span className="relative">Ver todos mis mensajes</span>
                    <Sparkles className="relative w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          
          .animate-shimmer {
            animation: shimmer 3s infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // ============= PREVIEW SCREEN =============
  if (gameState === 'preview') {
    const mensajeLargoGenerado = generarMensajeLargo();
    const pitchCompleto = generarPitchCompleto();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
          
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
              ✨ Tu Kit de Mensajes Completo
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Todos tus mensajes listos para usar en cualquier situación
            </p>
          </div>

          {/* Mensaje Corto */}
          {mensajeCorto && (
            <div 
              className="mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
                
                <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-2xl p-12 rounded-[2rem] border-2 border-white/20 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <MessageSquare className="w-12 h-12 text-blue-400" />
                    <div>
                      <p className="text-blue-300 font-bold text-sm uppercase tracking-wider">
                        Tu Mensaje Corto
                      </p>
                      <p className="text-white/70 text-sm">Memoriza esto. Es tu identidad.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-10 rounded-2xl mb-6 text-center">
                    <p className="text-5xl font-black text-white leading-tight">
                      {mensajeCorto}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(mensajeCorto, 'mensaje-corto')}
                    className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {copiedItem === 'mensaje-corto' ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copiar mensaje</span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 bg-blue-500/20 backdrop-blur-xl p-4 rounded-xl border border-blue-400/30">
                    <p className="text-blue-200 text-sm">
                      💡 <strong>Úsalo en:</strong> Redes sociales, email subject, tarjetas de presentación, firma de email
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mensaje Largo */}
          {mensajeLargoGenerado && (
            <div 
              className="mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/30">
                  <div className="flex items-center gap-4 mb-6">
                    <AlignLeft className="w-10 h-10 text-purple-400" />
                    <div>
                      <p className="text-purple-300 font-bold text-lg uppercase tracking-wider">
                        Tu Mensaje Largo
                      </p>
                      <p className="text-white/70">Tu propuesta de valor completa</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-2xl mb-6">
                    <p className="text-2xl text-white leading-relaxed whitespace-pre-wrap">
                      {mensajeLargoGenerado}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(mensajeLargoGenerado, 'mensaje-largo')}
                    className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {copiedItem === 'mensaje-largo' ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copiar mensaje</span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 bg-purple-500/20 backdrop-blur-xl p-4 rounded-xl border border-purple-400/30">
                    <p className="text-purple-200 text-sm">
                      💡 <strong>Úsalo en:</strong> Bio de Instagram/LinkedIn, página About, introducción de webinars
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estrategia */}
          {estrategia && (
            <div 
              className="mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-green-400/30">
                  <div className="flex items-center gap-4 mb-6">
                    <Map className="w-10 h-10 text-green-400" />
                    <div>
                      <p className="text-green-300 font-bold text-lg uppercase tracking-wider">
                        Tu Estrategia
                      </p>
                      <p className="text-white/70">Cómo lográs el resultado</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 rounded-2xl mb-6">
                    <p className="text-xl text-white leading-relaxed">
                      {estrategia}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(estrategia, 'estrategia')}
                    className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {copiedItem === 'estrategia' ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copiar estrategia</span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 bg-green-500/20 backdrop-blur-xl p-4 rounded-xl border border-green-400/30">
                    <p className="text-green-200 text-sm">
                      💡 <strong>Úsalo en:</strong> Páginas de ventas, reuniones con clientes, presentaciones
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pitch Completo */}
          {pitchCompleto && (
            <div 
              className="mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-orange-400/30">
                  <div className="flex items-center gap-4 mb-6">
                    <Megaphone className="w-10 h-10 text-orange-400" />
                    <div>
                      <p className="text-orange-300 font-bold text-lg uppercase tracking-wider">
                        Tu Pitch Final
                      </p>
                      <p className="text-white/70">Tu mensaje estrella completo</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 rounded-2xl mb-6">
                    <div className="text-white leading-relaxed whitespace-pre-wrap text-lg">
                      {pitchCompleto}
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(pitchCompleto, 'pitch')}
                    className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {copiedItem === 'pitch' ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copiar pitch completo</span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 bg-orange-500/20 backdrop-blur-xl p-4 rounded-xl border border-orange-400/30">
                    <p className="text-orange-200 text-sm">
                      💡 <strong>Úsalo en:</strong> Videos de ventas, llamadas de cierre, emails largos, páginas de inicio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botones de Navegación */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setGameState('build')}
              className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-5 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
              <span>Editar mensajes</span>
            </button>

            <button
              onClick={() => setGameState('bonus')}
              className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Brain className="relative w-6 h-6" />
              <span className="relative">Mejorar con IA</span>
              <Sparkles className="relative w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= BONUS SCREEN =============
  if (gameState === 'bonus') {
    const promptBonus = generarPromptBonus();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
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
            <div className="inline-flex items-center gap-4 mb-6">
              <Sparkles className="w-12 h-12 text-indigo-400" />
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                🔓 BONUS: Desbloqueá tu Diferencial
              </h2>
              <Sparkles className="w-12 h-12 text-purple-400" />
            </div>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Descubrí mensajes únicos que nadie más puede copiarte
            </p>
          </div>

          {/* Explicación */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-indigo-400/30">
                <div className="text-center mb-6">
                  <Brain className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Tu Diferencial Invisible
                  </h3>
                </div>

                <p className="text-xl text-white/90 leading-relaxed mb-6 text-center">
                  Este prompt personalizado te ayuda a <strong className="text-indigo-300">descubrir ángulos únicos</strong> que 
                  tu competencia no está usando.
                </p>

                <div className="space-y-4">
                  {[
                    { num: '1', text: 'Copiá el prompt personalizado con toda tu información', icon: '📋' },
                    { num: '2', text: 'Pegalo en ChatGPT, Claude o tu IA favorita', icon: '🤖' },
                    { num: '3', text: 'Obtendrás insights profundos sobre tu cliente', icon: '💡' },
                    { num: '4', text: 'Usá esas respuestas para refinar tus mensajes', icon: '✨' }
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10"
                      style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                        transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`
                      }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-black">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90 leading-relaxed">{step.text}</p>
                      </div>
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Generado */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 rounded-3xl border-2 border-purple-400/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Tu Prompt Personalizado:
                  </h3>
                  <button
                    onClick={() => copyToClipboard(promptBonus, 'prompt-bonus')}
                    className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {copiedItem === 'prompt-bonus' ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copiar Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 mb-6 max-h-[500px] overflow-y-auto">
                  <pre className="text-white/90 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {promptBonus}
                  </pre>
                </div>

                <div className="bg-indigo-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-indigo-400/40">
                  <p className="text-indigo-200 leading-relaxed">
                    <strong className="text-indigo-300">💡 Pro Tip:</strong> Este prompt está personalizado con TUS datos. 
                    Cuanto más completa sea tu información, mejores serán los insights que recibas de la IA.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resonancia */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-pink-400/30">
                <div className="text-center mb-6">
                  <Radio className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-4">
                    📻 El Poder del Lenguaje Correcto
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 leading-relaxed mb-6 text-center">
                  Las palabras correctas no solo informan, <strong className="text-pink-400">transforman</strong>. 
                  Cuando hablás el idioma emocional de tu cliente, la venta se vuelve natural.
                </p>
                
                <div className="bg-gradient-to-r from-pink-100/10 to-rose-100/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                  <p className="text-white/90 text-center leading-relaxed text-lg">
                    No copies mensajes de otros. Creá los tuyos usando <strong className="text-pink-300">las palabras exactas</strong> que 
                    tu cliente usa para describir su problema y su deseo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Navegación */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setGameState('preview')}
              className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-5 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
              <span>Ver mis mensajes</span>
            </button>

            <button
              onClick={() => setGameState('complete')}
              className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative">Completar módulo</span>
              <Trophy className="relative w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============= COMPLETE SCREEN =============
  if (gameState === 'complete') {
    const progress = calcularProgreso();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
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
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Trophy className="w-32 h-32 text-amber-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  🎉 ¡Completaste el Módulo!
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    Tu Comunicación es Irresistible
                  </span>
                </h2>
                
                <p className="text-2xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto mb-8">
                  Ahora tenés un kit completo de mensajes que comunican tu valor con claridad y poder.
                </p>

                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                  <p className="text-xl text-white/90 leading-relaxed">
                    Ya no necesitás improvisar. Tenés mensajes <strong className="text-blue-300">probados, refinados y listos</strong> para 
                    usar en cualquier situación.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-blue-500/30 text-center">
                  <p className="text-blue-300 font-bold text-sm uppercase tracking-wider mb-2">
                    Componentes Creados
                  </p>
                  <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {Object.values(completados).filter(v => v).length}/4
                  </p>
                  <p className="text-white/70 mt-2">100% Completo</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-indigo-500/30 text-center">
                  <p className="text-indigo-300 font-bold text-sm uppercase tracking-wider mb-2">
                    Mensajes Listos
                  </p>
                  <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    4
                  </p>
                  <p className="text-white/70 mt-2">Kit Completo</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-purple-500/30 text-center">
                  <p className="text-purple-300 font-bold text-sm uppercase tracking-wider mb-2">
                    Nivel de Claridad
                  </p>
                  <p className="text-6xl">🎯</p>
                  <p className="text-white/70 mt-2">Cristalino</p>
                </div>
              </div>
            </div>

            {/* Lo que lograste */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-green-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  🚀 Lo que lograste:
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Mensaje corto memorable (3-6 palabras)',
                    'Mensaje largo completo y persuasivo',
                    'Estrategia clara que genera confianza',
                    'Pitch de 2 minutos listo para usar',
                    'Prompt IA para mejoras continuas',
                    'Entendimiento profundo de tu diferencial'
                  ].map((logro, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10"
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/90 leading-relaxed">{logro}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-amber-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  📋 Próximos Pasos
                </h3>

                <div className="space-y-4">
                  {[
                    { icon: '✅', text: 'Guardá todos tus mensajes en un doc compartido con tu equipo' },
                    { icon: '🎤', text: 'Practicá tu pitch hasta que salga natural' },
                    { icon: '🧪', text: 'Testeá tus mensajes en diferentes canales' },
                    { icon: '👂', text: 'Escuchá feedback y ajustá el lenguaje' },
                    { icon: '🤖', text: 'Usá el prompt IA regularmente para refinar' },
                    { icon: '📊', text: 'Medí qué mensajes generan más conversiones' }
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10"
                    >
                      <span className="text-4xl flex-shrink-0">{step.icon}</span>
                      <p className="text-white/90 leading-relaxed text-lg pt-2">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final Message */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 backdrop-blur-2xl p-10 rounded-3xl text-center">
                <p className="text-2xl font-bold text-white mb-4">
                  💎 No es sobre ventas. Es sobre liderazgo.
                </p>
                <p className="text-4xl font-black text-white leading-tight mb-6">
                  No es lo que hacés.
                  <br />
                  Es cómo lo contás.
                </p>
                <p className="text-xl text-blue-100">
                  Cuando comunicás con claridad, empatía y poder... no solo vendés más. Liderás tu mercado. 🚀
                </p>
              </div>
            </div>

            {/* Back to Edit */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setGameState('build')}
                className="group relative inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
                <span>Editar mensajes</span>
              </button>

              <button
                onClick={() => setGameState('preview')}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <Eye className="w-6 h-6" />
                <span>Ver todos los mensajes</span>
              </button>
            </div>

            {/* Final Wisdom */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-400" />
                <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-400" />
              </div>
              
              <p className="text-xl text-white/70">
                Las palabras correctas pueden cambiar tu negocio. Úsalas sabiamente. 💬
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

export const comunicacionMensajesMetadata = {
  id: 8,
  title: "Comunicación - Mensajes Irresistibles",
  type: "document" as const,
  duration: "Interactivo"
};

export default ComunicacionMensajesContent;