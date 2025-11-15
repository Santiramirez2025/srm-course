import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, Users, Target, Clock, Map, Gift, Shield, Filter, 
  Scale, DollarSign, MessageSquare, Sparkles, ChevronRight,
  Trophy, Flame, Zap, Copy, Check, Brain, Rocket, Lock,
  Unlock, Star, ArrowRight, Eye, AlertCircle, Award,
  TrendingUp, Heart, Lightbulb, Radio, Building2
} from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  speed: number;
}

interface Seccion {
  id: number;
  icon: React.ReactNode;
  titulo: string;
  emoji: string;
  campo: string;
  descripcion: string;
  preguntas: string[];
  placeholder: string;
  tips: string[];
  gradient: string;
}

export const HojaTrabajoOfertasContent: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'build' | 'preview' | 'bonus' | 'complete'>('intro');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState<number>(1);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedOferta, setCopiedOferta] = useState(false);
  
  const [formData, setFormData] = useState({
    quien: '',
    resultado: '',
    tiempo: '',
    metodo: '',
    garantia: '',
    polarizacion: '',
    precio: '',
    mensajeCorto: '',
    pitch: ''
  });

  const [completados, setCompletados] = useState<{[key: number]: boolean}>({});

  const secciones: Seccion[] = [
    {
      id: 1,
      icon: <Users className="w-6 h-6" />,
      titulo: 'Define a quién te dirigís',
      emoji: '🎯',
      campo: 'quien',
      descripcion: 'Sin precisión en este punto, tu oferta se vuelve genérica, y lo genérico no vende.',
      preguntas: [
        '¿Quién es exactamente tu cliente ideal?',
        '¿Qué problema específico tiene que nadie más está resolviendo bien?',
        '¿Qué palabras usa cuando describe su frustración?'
      ],
      placeholder: 'Ej: Psicólogos que quieren llevar su consulta online pero no saben por dónde empezar',
      tips: [
        'Sé ultra específico - "emprendedores" es muy amplio',
        'Piensa en su situación actual, no en lo que hacen',
        'Usa sus palabras exactas, no jerga de marketing'
      ],
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 2,
      icon: <Target className="w-6 h-6" />,
      titulo: 'Prometé un resultado irresistible',
      emoji: '🚀',
      campo: 'resultado',
      descripcion: 'No lo que vos sabés hacer. Sino lo que ellos mueren por conseguir.',
      preguntas: [
        '¿Qué resultado específico van a lograr?',
        '¿Cómo se van a sentir cuando lo logren?',
        '¿Qué cambia en su vida o negocio?'
      ],
      placeholder: 'Ej: Conseguir 10 pacientes nuevos por mes sin depender de referidos',
      tips: [
        'Enfócate en el "después", no en el proceso',
        'Debe ser medible y verificable',
        'Habla de transformación, no de información'
      ],
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 3,
      icon: <Clock className="w-6 h-6" />,
      titulo: 'Tiempo realista y deseable',
      emoji: '⏱️',
      campo: 'tiempo',
      descripcion: 'Un plazo que motive sin frustrar. Lo ideal: entre 21 y 90 días.',
      preguntas: [
        '¿En cuánto tiempo pueden lograr ese resultado?',
        '¿Por qué toma ese tiempo específicamente?',
        '¿Qué podés hacer para acelerar el proceso?'
      ],
      placeholder: 'Ej: En 60 días - 30 para implementar + 30 para ver resultados',
      tips: [
        'Muy rápido = desconfianza. Muy lento = impaciencia',
        'Explicá por qué ese tiempo específico',
        'Divide en fases si es necesario'
      ],
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 4,
      icon: <Map className="w-6 h-6" />,
      titulo: 'Método paso a paso',
      emoji: '🗺️',
      campo: 'metodo',
      descripcion: 'Nadie compra confusión. Tu método debe entenderlo un chico de 10 años.',
      preguntas: [
        '¿Cuáles son los 3 a 5 pasos clave?',
        '¿Qué hace que este camino funcione y otros no?',
        '¿Por qué es más rápido/fácil/efectivo?'
      ],
      placeholder: 'Ej: Paso 1: Configuras tu perfil en 10 min\nPaso 2: Te enviamos pacientes calificados\nPaso 3: Agendas consultas automáticamente',
      tips: [
        'Entre 3 y 5 pasos - ni muy simple ni muy complejo',
        'Cada paso debe ser claro y accionable',
        'Muestra la lógica del proceso'
      ],
      gradient: 'from-orange-500/20 to-amber-500/20'
    },
    {
      id: 5,
      icon: <Shield className="w-6 h-6" />,
      titulo: 'Inversión del riesgo',
      emoji: '🛡️',
      campo: 'garantia',
      descripcion: 'El cliente teme perder tiempo y quedar como tonto. Vos asumís el riesgo.',
      preguntas: [
        '¿Qué garantía podés ofrecer?',
        '¿Devolución de dinero? ¿Tiempo extra? ¿Compensación?',
        '¿Qué pasa si no funciona?'
      ],
      placeholder: 'Ej: Si en 60 días no conseguís al menos 5 pacientes nuevos, te devolvemos todo + 3 meses gratis',
      tips: [
        'Mientras más fuerte la garantía, más confianza generas',
        'Podés combinar garantías (tiempo + resultados)',
        'Asegúrate de poder cumplirla'
      ],
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 6,
      icon: <Filter className="w-6 h-6" />,
      titulo: 'Polarización: no sos para todos',
      emoji: '⚡',
      campo: 'polarizacion',
      descripcion: 'Cuando sos claro sobre a quién NO ayudás, te posicionás como experto.',
      preguntas: [
        '¿Para quién NO es esto?',
        '¿Qué tipo de cliente rechazás?',
        '¿Qué mentalidad o actitud no tolerás?'
      ],
      placeholder: 'Ej: Esto NO es para vos si buscás resultados mágicos sin esfuerzo, o si no estás dispuesto a seguir un proceso probado',
      tips: [
        'Repeler es tan importante como atraer',
        'Sé honesto sobre lo que NO funciona',
        'Esto filtra malos clientes y atrae mejores'
      ],
      gradient: 'from-indigo-500/20 to-purple-500/20'
    },
    {
      id: 7,
      icon: <DollarSign className="w-6 h-6" />,
      titulo: 'Precio con propósito',
      emoji: '💰',
      campo: 'precio',
      descripcion: 'No es "ponerle un número". Es hacer sentir que vale mucho más de lo que cuesta.',
      preguntas: [
        '¿Cuánto vale el resultado final para tu cliente?',
        '¿Qué cobra tu competencia?',
        '¿Qué extras podés sumar para justificar precio premium?'
      ],
      placeholder: 'Ej: $997/mes (si cada paciente vale $200 y conseguís 10, son $2000 de retorno)',
      tips: [
        'Ancla el precio al valor del resultado, no al costo',
        'Muestra el ROI claramente',
        'Justifica con lógica, no con excusas'
      ],
      gradient: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      id: 8,
      icon: <MessageSquare className="w-6 h-6" />,
      titulo: 'Mensaje corto (El anzuelo)',
      emoji: '🎣',
      campo: 'mensajeCorto',
      descripcion: 'Una frase que capte atención al instante. Para DMs, redes o publicaciones.',
      preguntas: [
        '¿Cómo resumís tu oferta en una línea?',
        '¿Qué gancho atrapa la atención?',
        '¿Genera curiosidad sin vender todo de una?'
      ],
      placeholder: 'Ej: ¿Y si pudieras llenar tu agenda de pacientes en 60 días sin gastar en publicidad?',
      tips: [
        'Debe caber en un tweet (280 caracteres)',
        'Empieza con pregunta o declaración fuerte',
        'Deja algo de misterio'
      ],
      gradient: 'from-pink-500/20 to-rose-500/20'
    },
    {
      id: 9,
      icon: <Sparkles className="w-6 h-6" />,
      titulo: 'Pitch de 2 minutos',
      emoji: '🎤',
      campo: 'pitch',
      descripcion: 'Cómo lo explicás en llamadas, reuniones o eventos. Claro, corto, enfocado.',
      preguntas: [
        '¿Cómo lo presentás cara a cara?',
        '¿Qué decís en menos de 2 minutos?',
        '¿Está enfocado en el resultado, no en el proceso?'
      ],
      placeholder: 'Ej: Ayudo a psicólogos a conseguir 10 pacientes por mes en 60 días usando un sistema probado de atracción digital, sin depender de referidos',
      tips: [
        'Estructura: Quién + Resultado + Tiempo + Diferenciador',
        'Practícalo hasta que fluya natural',
        'Termina con una pregunta o llamado a acción'
      ],
      gradient: 'from-teal-500/20 to-cyan-500/20'
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

  const handleInputChange = useCallback((campo: string, valor: string) => {
    setFormData(prev => ({
      ...prev,
      [campo]: valor
    }));
  }, []);

  const marcarCompletado = useCallback((id: number) => {
    const seccion = secciones.find(s => s.id === id);
    if (seccion && formData[seccion.campo as keyof typeof formData].trim()) {
      setCompletados(prev => ({
        ...prev,
        [id]: true
      }));
      
      // Auto-avanzar a la siguiente sección
      if (id < secciones.length) {
        setTimeout(() => {
          setSeccionActiva(id + 1);
        }, 500);
      }
    }
  }, [formData, secciones]);

  const calcularProgreso = useCallback(() => {
    const total = secciones.length;
    const completado = Object.values(completados).filter(v => v).length;
    return Math.round((completado / total) * 100);
  }, [completados, secciones.length]);

  const generarOfertaCompleta = useCallback(() => {
    if (!formData.quien || !formData.resultado || !formData.tiempo) {
      return null;
    }

    const metodoIntro = formData.metodo 
      ? `usando ${formData.metodo.split('\n')[0].replace(/^(Paso \d+:|•|-)\s*/i, '').toLowerCase()}`
      : 'con un sistema probado';

    const garantiaTexto = formData.garantia 
      ? ` Garantía: ${formData.garantia.toLowerCase()}`
      : '';

    return `Te ayudo a ${formData.resultado.toLowerCase()} en ${formData.tiempo.toLowerCase()}, ${metodoIntro}.${garantiaTexto}`;
  }, [formData]);

  const generarPromptIA = useCallback(() => {
    const prompt = `Quiero que me ayudes a mejorar y expandir esta oferta irresistible:

**CLIENTE IDEAL:** ${formData.quien || '[definir]'}

**RESULTADO PROMETIDO:** ${formData.resultado || '[definir]'}

**TIEMPO:** ${formData.tiempo || '[definir]'}

**MÉTODO:** ${formData.metodo || '[definir]'}

**GARANTÍA:** ${formData.garantia || '[definir]'}

**POLARIZACIÓN:** ${formData.polarizacion || '[definir]'}

**PRECIO:** ${formData.precio || '[definir]'}

Por favor, ayúdame a:
1. Hacer la promesa más irresistible y específica
2. Fortalecer el método para que se entienda al instante
3. Crear un ángulo único que me diferencie de mi competencia
4. Generar 3 variaciones del mensaje corto (anzuelo)
5. Mejorar mi pitch de 2 minutos con estructura persuasiva
6. Sugerir bonuses o incentivos que aumenten el valor percibido

Quiero que hables con el tono y lenguaje que usa mi cliente cuando expresa su dolor y su deseo. Quiero que se sienta comprendido y urgido a tomar acción.`;

    return prompt;
  }, [formData]);

  const copyPrompt = useCallback(() => {
    navigator.clipboard.writeText(generarPromptIA());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  }, [generarPromptIA]);

  const copyOferta = useCallback(() => {
    const oferta = generarOfertaCompleta();
    if (oferta) {
      navigator.clipboard.writeText(oferta);
      setCopiedOferta(true);
      setTimeout(() => setCopiedOferta(false), 2500);
    }
  }, [generarOfertaCompleta]);

  const puedeAvanzar = (seccionId: number) => {
    if (seccionId === 1) return true;
    return completados[seccionId - 1] === true;
  };

  // ============= INTRO SCREEN =============
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 relative overflow-hidden">
        
        {/* Animated Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse"
            style={{ animationDuration: '8s', animationDelay: '2s' }}
          />
        </div>

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: (particle.life / 120) * 0.6,
              transform: `translateY(-${(120 - particle.life) * particle.speed * 0.5}px) scale(${particle.life / 120})`,
              transition: 'all 0.1s ease-out',
              boxShadow: '0 0 8px rgba(52, 211, 153, 0.5)'
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
                <p className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                  Módulo 7 · Aplicación Práctica
                </p>
              </div>
            </div>

            {/* Icon Hero */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative text-9xl sm:text-[10rem] animate-float">
                🛠️
              </div>
            </div>
            
            {/* Title Premium */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 leading-tight">
                  Hoja de Trabajo
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 leading-tight">
                  Interactiva
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl text-emerald-400 font-bold">
                Construí tu oferta paso a paso con orientación en tiempo real
              </p>
            </div>
            
            {/* Main Hook Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-2xl transition-opacity duration-1000" />
              
              <div className="relative bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="space-y-8">
                  {/* Hook */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Building2 className="w-16 h-16 text-emerald-400" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white text-center mb-6">
                      🎯 De la Estrategia a la Ejecución
                    </h3>
                    
                    <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                      Ya entendés la teoría. Ahora es momento de <strong className="text-emerald-400">construir tu oferta</strong> con 
                      <strong className="text-teal-400"> precisión quirúrgica</strong>.
                    </p>
                  </div>

                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

                  {/* Key Insight */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl opacity-20 blur-xl" />
                    <div className="relative bg-gradient-to-br from-teal-500/10 to-cyan-500/10 p-8 rounded-2xl border-2 border-teal-400/30 backdrop-blur-xl text-center">
                      <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 leading-tight">
                        💡 Esta no es una hoja de trabajo común.
                        <br />
                        Es un sistema guiado que te lleva de la mano.
                      </p>
                    </div>
                  </div>

                  {/* What You'll Build */}
                  <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      🎮 Modo de Juego:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { icon: '📝', text: '9 Misiones Progresivas' },
                        { icon: '💡', text: 'Tips en Tiempo Real' },
                        { icon: '🎯', text: 'Vista Previa Live' },
                        { icon: '🤖', text: 'Generador Prompt IA' },
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
              onClick={() => setGameState('build')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-xl sm:text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Rocket className="relative w-7 h-7" />
              <span className="relative">Comenzar construcción</span>
              <ChevronRight className="relative w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <p className="text-white/50 text-sm font-light">
              Cada pregunta te acerca a una oferta imparable. 💪
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

  // ============= BUILD SCREEN =============
  if (gameState === 'build') {
    const progress = calcularProgreso();
    const seccionActual = secciones.find(s => s.id === seccionActiva);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[150px]" />
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
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-2xl p-6 rounded-3xl border-2 border-emerald-400/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-emerald-300 font-bold text-sm uppercase tracking-wider mb-1">
                      Tu Progreso
                    </p>
                    <p className="text-white text-3xl font-black">
                      {Object.values(completados).filter(v => v).length} / {secciones.length} Misiones
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      {progress}%
                    </p>
                  </div>
                </div>
                
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden border border-white/20">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${progress}%`,
                      boxShadow: '0 0 20px rgba(52, 211, 153, 0.5)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>

                {progress === 100 && (
                  <div className="mt-4 bg-emerald-500/20 backdrop-blur-xl p-4 rounded-2xl border-2 border-emerald-400/30 text-center animate-fadeIn">
                    <p className="text-emerald-200 font-bold text-lg">
                      🎉 ¡Completaste todas las misiones! Ahora podés ver tu oferta completa
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Secciones Navegables */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
            {secciones.map((sec) => {
              const bloqueado = !puedeAvanzar(sec.id);
              const estaActiva = seccionActiva === sec.id;
              const completada = completados[sec.id];

              return (
                <button
                  key={sec.id}
                  onClick={() => !bloqueado && setSeccionActiva(sec.id)}
                  disabled={bloqueado}
                  className={`relative group p-3 rounded-xl transition-all ${
                    bloqueado 
                      ? 'bg-gray-800/50 opacity-50 cursor-not-allowed' 
                      : estaActiva 
                        ? 'bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-2 border-emerald-400 scale-105' 
                        : completada
                          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400 hover:scale-105'
                          : 'bg-white/5 border-2 border-white/10 hover:border-white/30 hover:scale-105'
                  }`}
                >
                  <div className="text-center">
                    {bloqueado ? (
                      <Lock className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                    ) : completada ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-1" />
                    ) : (
                      <span className="text-2xl block mb-1">{sec.emoji}</span>
                    )}
                    <p className={`text-xs font-bold ${
                      bloqueado ? 'text-gray-500' : estaActiva ? 'text-emerald-300' : completada ? 'text-green-300' : 'text-white/70'
                    }`}>
                      {sec.id}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sección Actual */}
          {seccionActual && (
            <div 
              className="space-y-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Header de la Sección */}
              <div className="relative group">
                <div className={`absolute -inset-1 rounded-3xl opacity-20 blur-xl bg-gradient-to-r ${seccionActual.gradient.replace('/20', '')}`} />
                
                <div className={`relative bg-gradient-to-br ${seccionActual.gradient} backdrop-blur-2xl p-8 rounded-3xl border-2 border-white/10`}>
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`p-4 rounded-2xl ${
                      completados[seccionActual.id] 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-white'
                    }`}>
                      {completados[seccionActual.id] ? (
                        <CheckCircle2 className="w-8 h-8" />
                      ) : (
                        seccionActual.icon
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-5xl">{seccionActual.emoji}</span>
                        <div>
                          <p className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                            Misión {seccionActual.id} de {secciones.length}
                          </p>
                          <h2 className="text-3xl font-bold text-white">
                            {seccionActual.titulo}
                          </h2>
                        </div>
                      </div>
                      <p className="text-white/80 text-lg leading-relaxed">
                        {seccionActual.descripcion}
                      </p>
                    </div>
                  </div>

                  {completados[seccionActual.id] && (
                    <div className="bg-green-500/20 backdrop-blur-xl p-4 rounded-2xl border-2 border-green-400/30 animate-fadeIn">
                      <p className="text-green-200 text-center font-bold">
                        ✅ Misión Completada - ¡Excelente trabajo!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Preguntas Guía */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-2xl p-6 rounded-3xl border-2 border-blue-400/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-blue-400" />
                    <h3 className="font-bold text-xl text-white">💭 Preguntas guía:</h3>
                  </div>
                  <ul className="space-y-3">
                    {seccionActual.preguntas.map((pregunta, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/80">
                        <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                        <span>{pregunta}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Campo de Texto */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border-2 border-emerald-400/30">
                  <label className="block text-lg font-bold text-white mb-3">
                    ✍️ Tu respuesta:
                  </label>
                  <textarea
                    value={formData[seccionActual.campo as keyof typeof formData]}
                    onChange={(e) => handleInputChange(seccionActual.campo, e.target.value)}
                    placeholder={seccionActual.placeholder}
                    className="w-full p-5 bg-white/10 backdrop-blur-xl text-white text-lg placeholder-white/40 rounded-2xl border-2 border-white/20 focus:border-emerald-400 focus:outline-none transition-all duration-300 min-h-[180px]"
                    rows={seccionActual.campo === 'metodo' ? 8 : 6}
                  />
                  
                  <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{formData[seccionActual.campo as keyof typeof formData].length} caracteres</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-2xl p-6 rounded-3xl border-2 border-amber-400/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-amber-400" />
                    <h3 className="font-bold text-xl text-white">⚡ Tips profesionales:</h3>
                  </div>
                  <ul className="space-y-3">
                    {seccionActual.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/80">
                        <span className="text-amber-400 flex-shrink-0 mt-1">→</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4">
                {formData[seccionActual.campo as keyof typeof formData].trim() && !completados[seccionActual.id] && (
                  <button
                    onClick={() => marcarCompletado(seccionActual.id)}
                    className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <CheckCircle2 className="relative w-6 h-6" />
                    <span className="relative">Completar misión</span>
                  </button>
                )}

                {seccionActual.id < secciones.length && completados[seccionActual.id] && (
                  <button
                    onClick={() => setSeccionActiva(seccionActual.id + 1)}
                    className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <span className="relative">Siguiente misión</span>
                    <ChevronRight className="relative w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                )}

                {progress === 100 && (
                  <button
                    onClick={() => setGameState('preview')}
                    className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    <Eye className="relative w-6 h-6" />
                    <span className="relative">Ver mi oferta completa</span>
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
    const ofertaCompleta = generarOfertaCompleta();

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
              ✨ Tu Oferta Irresistible
            </h2>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Así es como tu mercado va a ver tu propuesta de valor
            </p>
          </div>

          {/* Oferta Principal */}
          {ofertaCompleta && (
            <div 
              className="mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
                
                <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-2xl p-12 rounded-[2rem] border-2 border-white/20 shadow-2xl">
                  <div className="text-center mb-8">
                    <Trophy className="w-20 h-20 text-amber-400 mx-auto mb-6 animate-float" />
                    <p className="text-purple-300 font-bold text-sm uppercase tracking-wider mb-4">
                      Tu Propuesta de Valor
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 mb-6">
                    <p className="text-2xl sm:text-3xl text-white leading-relaxed text-center font-light">
                      {ofertaCompleta}
                    </p>
                  </div>

                  <button
                    onClick={copyOferta}
                    className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {copiedOferta ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Copiado al portapapeles!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copiar oferta</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desglose de Componentes */}
          <div 
            className="mb-12 space-y-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s'
            }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              🎯 Desglose de tu Oferta
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { titulo: 'Cliente Ideal', valor: formData.quien, emoji: '👥', color: 'from-blue-500 to-cyan-500' },
                { titulo: 'Resultado', valor: formData.resultado, emoji: '🎯', color: 'from-purple-500 to-pink-500' },
                { titulo: 'Tiempo', valor: formData.tiempo, emoji: '⏱️', color: 'from-green-500 to-emerald-500' },
                { titulo: 'Precio', valor: formData.precio, emoji: '💰', color: 'from-yellow-500 to-amber-500' },
              ].filter(item => item.valor).map((item, i) => (
                <div
                  key={i}
                  className="relative group"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'scale(1)' : 'scale(0.95)',
                    transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`
                  }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-20 blur-xl`} />
                  
                  <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <h4 className="font-bold text-white">{item.titulo}</h4>
                    </div>
                    <p className="text-white/80 leading-relaxed">{item.valor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Método */}
          {formData.metodo && (
            <div 
              className="mb-12"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s'
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-2xl p-8 rounded-3xl border-2 border-orange-400/30">
                  <div className="flex items-center gap-3 mb-6">
                    <Map className="w-8 h-8 text-orange-400" />
                    <h3 className="text-2xl font-bold text-white">🗺️ Tu Método</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                    <p className="text-white/90 leading-relaxed whitespace-pre-wrap">{formData.metodo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Garantía y Polarización */}
          <div 
            className="mb-12 grid md:grid-cols-2 gap-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s'
            }}
          >
            {formData.garantia && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl p-6 rounded-2xl border-2 border-green-400/30 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-green-400" />
                    <h4 className="font-bold text-white">🛡️ Garantía</h4>
                  </div>
                  <p className="text-white/80 leading-relaxed">{formData.garantia}</p>
                </div>
              </div>
            )}

            {formData.polarizacion && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl p-6 rounded-2xl border-2 border-red-400/30 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <h4 className="font-bold text-white">⚡ NO es para ti si...</h4>
                  </div>
                  <p className="text-white/80 leading-relaxed">{formData.polarizacion}</p>
                </div>
              </div>
            )}
          </div>

          {/* Mensajes */}
          <div 
            className="mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s'
            }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              📣 Tus Mensajes Clave
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {formData.mensajeCorto && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl opacity-20 blur-xl" />
                  
                  <div className="relative bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl p-6 rounded-2xl border-2 border-pink-400/30">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare className="w-6 h-6 text-pink-400" />
                      <h4 className="font-bold text-white">🎣 Tu Anzuelo</h4>
                    </div>
                    <p className="text-lg text-white/90 leading-relaxed">{formData.mensajeCorto}</p>
                    <p className="text-white/60 text-sm mt-3">
                      Úsalo en redes sociales, DMs, publicaciones
                    </p>
                  </div>
                </div>
              )}

              {formData.pitch && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl opacity-20 blur-xl" />
                  
                  <div className="relative bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-xl p-6 rounded-2xl border-2 border-teal-400/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-teal-400" />
                      <h4 className="font-bold text-white">🎤 Tu Pitch</h4>
                    </div>
                    <p className="text-lg text-white/90 leading-relaxed">{formData.pitch}</p>
                    <p className="text-white/60 text-sm mt-3">
                      Úsalo en llamadas, reuniones, eventos
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botones de Navegación */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setGameState('build')}
              className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-5 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
              <span>Editar oferta</span>
            </button>

            <button
              onClick={() => setGameState('bonus')}
              className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <Brain className="relative w-6 h-6" />
              <span className="relative">Mejorar con IA</span>
              <Sparkles className="relative w-6 h-6" />
            </button>
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

  // ============= BONUS SCREEN =============
  if (gameState === 'bonus') {
    const promptIA = generarPromptIA();

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
                🤖 Generador IA
              </h2>
              <Sparkles className="w-12 h-12 text-purple-400" />
            </div>
            <p className="text-xl text-white/70 font-light max-w-3xl mx-auto">
              Llevá tu oferta al siguiente nivel con inteligencia artificial
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
                    Cómo funciona este generador:
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    { num: '1', text: 'Copiá el prompt personalizado con tu información', icon: '📋' },
                    { num: '2', text: 'Pegalo en ChatGPT, Claude o tu IA favorita', icon: '🤖' },
                    { num: '3', text: 'Recibí múltiples variaciones y mejoras profesionales', icon: '✨' },
                    { num: '4', text: 'Elegí lo que más resuene con tu audiencia', icon: '🎯' }
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
                    onClick={copyPrompt}
                    className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {copiedPrompt ? (
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
                    {promptIA}
                  </pre>
                </div>

                <div className="bg-indigo-500/20 backdrop-blur-xl p-6 rounded-2xl border-2 border-indigo-400/40">
                  <p className="text-indigo-200 leading-relaxed">
                    <strong className="text-indigo-300">💡 Pro Tip:</strong> La IA puede darte variaciones increíbles, 
                    pero vos conocés a tu audiencia mejor que nadie. Usá su output como inspiración y ajustalo a tu voz.
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
                    📻 Recordá: La Resonancia es Todo
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 leading-relaxed mb-6 text-center">
                  Una gran oferta no solo se escucha, <strong className="text-pink-400">se siente</strong>. 
                  Es como sintonizar una radio en la frecuencia exacta del cliente.
                </p>
                
                <div className="bg-gradient-to-r from-pink-100/10 to-rose-100/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                  <p className="text-white/90 text-center leading-relaxed text-lg">
                    Cuando hablás con las emociones que no dicen en voz alta —pero que los mueven por dentro— 
                    se genera algo mágico: <strong className="text-pink-300">resonás con ellos.</strong>
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
              <span>Ver mi oferta</span>
            </button>

            <button
              onClick={() => setGameState('complete')}
              className="flex-1 group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-xl font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
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
    const ofertaCompleta = generarOfertaCompleta();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900 relative overflow-hidden">
        
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[150px]" />
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
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-[2rem] opacity-30 group-hover:opacity-50 blur-3xl transition-opacity duration-1000 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-2xl p-12 sm:p-16 rounded-[2rem] border-2 border-white/20 shadow-2xl text-center">
                
                <div className="relative inline-block mb-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative">
                    <Trophy className="w-32 h-32 text-amber-400 mx-auto animate-float" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  🎉 ¡Completaste la Hoja de Trabajo!
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                    Tu Oferta está Lista
                  </span>
                </h2>
                
                <p className="text-2xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto mb-8">
                  Acabás de construir algo que la mayoría de emprendedores nunca logra: 
                  una oferta clara, poderosa e irresistible.
                </p>

                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                  <p className="text-xl text-white/90 leading-relaxed">
                    Ahora tenés una propuesta de valor que atrae, convierte y retiene clientes 
                    con naturalidad. No es magia. Es <strong className="text-emerald-300">estrategia ejecutada</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-emerald-500/30 text-center">
                  <p className="text-emerald-300 font-bold text-sm uppercase tracking-wider mb-2">
                    Misiones Completadas
                  </p>
                  <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                    {Object.values(completados).filter(v => v).length}/{secciones.length}
                  </p>
                  <p className="text-white/70 mt-2">100% Completado</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-teal-500/30 text-center">
                  <p className="text-teal-300 font-bold text-sm uppercase tracking-wider mb-2">
                    Elementos Definidos
                  </p>
                  <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                    9/9
                  </p>
                  <p className="text-white/70 mt-2">Oferta Completa</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border-2 border-cyan-500/30 text-center">
                  <p className="text-cyan-300 font-bold text-sm uppercase tracking-wider mb-2">
                    Nivel de Claridad
                  </p>
                  <p className="text-6xl">💎</p>
                  <p className="text-white/70 mt-2">Cristalino</p>
                </div>
              </div>
            </div>

            {/* Your Offer Recap */}
            {ofertaCompleta && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl opacity-20 blur-xl" />
                
                <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-purple-400/30">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    🎯 Tu Oferta Final
                  </h3>
                  
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 mb-6">
                    <p className="text-2xl text-white leading-relaxed text-center">
                      {ofertaCompleta}
                    </p>
                  </div>

                  <button
                    onClick={copyOferta}
                    className="w-full group/btn relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    {copiedOferta ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copiar mi oferta</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-2xl p-10 rounded-3xl border-2 border-yellow-400/30">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  🚀 Próximos Pasos
                </h3>

                <div className="space-y-4">
                  {[
                    { icon: '🧪', text: 'Testeá tu oferta con 5-10 clientes potenciales reales' },
                    { icon: '👂', text: 'Escuchá su feedback y ajustá el mensaje' },
                    { icon: '🤖', text: 'Usá el prompt IA para generar variaciones' },
                    { icon: '📈', text: 'Medí resultados: ¿cuántos dicen "sí"?' },
                    { icon: '🔄', text: 'Refiná constantemente basándote en datos reales' },
                    { icon: '💰', text: 'Aumentá el precio conforme crece el valor percibido' }
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
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />
              
              <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 backdrop-blur-2xl p-10 rounded-3xl text-center">
                <p className="text-2xl font-bold text-white mb-4">
                  Recordá siempre:
                </p>
                <p className="text-4xl font-black text-white leading-tight mb-6">
                  La mejor oferta no persigue clientes.
                  <br />
                  Los atrae con magnetismo natural.
                </p>
                <p className="text-xl text-emerald-100">
                  Ahora salí y probala en el mundo real. 💪
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
                <span>Editar mi oferta</span>
              </button>

              <button
                onClick={() => setGameState('bonus')}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <Brain className="w-6 h-6" />
                <span>Ver prompt IA</span>
              </button>
            </div>

            {/* Final Wisdom */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400" />
                <Star className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400" />
              </div>
              
              <p className="text-xl text-white/70">
                El mercado está esperando tu oferta. No lo hagas esperar más. 🔥
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

export const hojaTrabajoOfertasMetadata = {
  id: 7,
  title: "Hoja de Trabajo - Construcción de Ofertas",
  type: "document" as const,
  duration: "Interactivo"
};

export default HojaTrabajoOfertasContent;