import React, { useState } from 'react';
import { 
  Edit3, Mic, Radio, FileText, Save, Copy, Trash2, 
  TrendingUp, Zap, Award, Brain, Heart, Target, Eye,
  Clock, CheckCircle, AlertTriangle, Sparkles, PlayCircle,
  RefreshCw, BookOpen, Lightbulb, Volume2, MessageCircle,
  GitBranch, Code, Wrench, Star, Archive
} from 'lucide-react';

export const ReescribirScriptContent = () => {
  const [scriptVersion, setScriptVersion] = useState(1);
  const [frasesGuardadas, setFrasesGuardadas] = useState<string[]>([]);
  const [nuevaFrase, setNuevaFrase] = useState('');
  const [elementoEditando, setElementoEditando] = useState<string | null>(null);
  const [testAutenticidad, setTestAutenticidad] = useState<boolean[]>([]);

  const elementosModificables = [
    {
      id: 'preguntas',
      nombre: 'Preguntas de Descubrimiento',
      descripcion: 'Adaptá las preguntas a tu estilo y cliente ideal',
      ejemplo: {
        original: '"¿Cuánto facturás por mes?"',
        adaptacion1: '"¿Cómo vienen los números últimamente?"',
        adaptacion2: '"¿Estás contento con tus ventas actuales?"'
      },
      cuandoCambiar: 'Si suena muy directo para tu industria o personalidad',
      cuidado: 'No elimines la intención: necesitás datos concretos',
      icono: <MessageCircle className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'objeciones',
      nombre: 'Respuestas a Objeciones',
      descripcion: 'Personalizá cómo manejar cada excusa',
      ejemplo: {
        original: '"¿Caro comparado con qué?"',
        adaptacion1: '"Entiendo. ¿Qué estás comparando exactamente?"',
        adaptacion2: '"Te entiendo. ¿Puedo preguntarte qué te hace pensar eso?"'
      },
      cuandoCambiar: 'Cuando tu cliente ideal responde mejor a un tono más suave',
      cuidado: 'No pierdas el reencuadre. La pregunta debe mantener el control',
      icono: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'pitch',
      nombre: 'Tu Pitch Personal',
      descripcion: 'Hacé tuya la presentación de valor',
      ejemplo: {
        original: '"Ayudamos a negocios a escalar con sistemas probados"',
        adaptacion1: '"Trabajo con empresarios que quieren resultados predecibles"',
        adaptacion2: '"Me especializo en transformar equipos de ventas en máquinas de cierre"'
      },
      cuandoCambiar: 'Para reflejar tu experiencia y posicionamiento único',
      cuidado: 'Mantené la claridad y el beneficio específico',
      icono: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'tonoypausa',
      nombre: 'Tono y Pausas',
      descripcion: 'Tu velocidad, energía y silencios',
      ejemplo: {
        original: '"Estoy seguro de que podemos ayudarte." [pausa corta]',
        adaptacion1: '"Mirá... [pausa larga] Estoy completamente seguro de que esto es para vos."',
        adaptacion2: '"Honestamente, sé que podemos hacer algo increíble juntos." [tono cálido]'
      },
      cuandoCambiar: 'Para que coincida con tu energía natural',
      cuidado: 'Los silencios estratégicos son herramientas, no accidentes',
      icono: <Volume2 className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'experiencia',
      nombre: 'Cómo Presentás Tu Experiencia',
      descripcion: 'Tus credenciales y casos de éxito',
      ejemplo: {
        original: '"Trabajé con +50 empresas en los últimos 3 años"',
        adaptacion1: '"Vengo ayudando a empresas como la tuya desde 2020"',
        adaptacion2: '"En los últimos años cerré +200 tratos usando este sistema"'
      },
      cuandoCambiar: 'Para reflejar tu experiencia real',
      cuidado: 'Nunca mientas. La credibilidad es todo',
      icono: <Award className="w-6 h-6" />,
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  const momentosClave = [
    {
      momento: 'Perdiste su atención',
      señales: ['Respuestas monosílabas', 'Silencios largos incómodos', 'Te interrumpen constantemente'],
      diagnostico: 'Estás hablando demasiado o no estás conectando emocionalmente',
      accion: 'Hacé más preguntas. Menos pitch, más descubrimiento',
      color: 'from-red-500 to-orange-500'
    },
    {
      momento: 'Se engancharon',
      señales: ['Empiezan a hacer preguntas', 'Se inclinan hacia adelante (en video)', 'Su tono cambia'],
      diagnostico: 'Tocaste un dolor real o un deseo profundo',
      accion: 'Guardá esa frase exacta. Profundizá ahí',
      color: 'from-green-500 to-emerald-500'
    },
    {
      momento: 'Pusieron una objeción real',
      señales: ['Dicen "pero..." con detalle', 'Comparten miedos específicos', 'Piden aclaraciones'],
      diagnostico: 'Están considerando seriamente la compra',
      accion: 'Esto es bueno. Responde con calma y pregunta más',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      momento: 'Te perdiste en tu propio script',
      señales: ['Usaste muletillas', 'Tuviste que volver atrás', 'Sonaste inseguro'],
      diagnostico: 'Esa parte del script no es tuya aún',
      accion: 'Reescribila con tus palabras. Practica 10 veces más',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      momento: 'Lograste un "sí" intermedio',
      señales: ['Dicen "tiene sentido"', 'Asienten repetidamente', 'Dicen "me gusta eso"'],
      diagnostico: 'Estás construyendo momentum',
      accion: 'No frenes. Seguí al siguiente paso con confianza',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const versionesScript = [
    {
      version: 1.0,
      fecha: 'Semana 1',
      cambios: 'Script original del curso',
      resultado: '10% conversión',
      aprendizaje: 'Muy rígido, no suena a mí'
    },
    {
      version: 2.0,
      fecha: 'Semana 2',
      cambios: 'Adapté las preguntas a mi tono',
      resultado: '15% conversión',
      aprendizaje: 'Mejor, pero pierdo control en objeciones'
    },
    {
      version: 3.0,
      fecha: 'Semana 4',
      cambios: 'Nuevas respuestas a objeciones',
      resultado: '22% conversión',
      aprendizaje: 'Funciona. Guardé 5 frases de oro'
    },
    {
      version: 4.0,
      fecha: 'Mes 2',
      cambios: 'Pitch personalizado + pausas estratégicas',
      resultado: '30% conversión',
      aprendizaje: 'Esto ya es mío. Suena natural'
    }
  ];

  const preguntasAutenticidad = [
    '¿Dirías esto en una conversación casual con un amigo?',
    '¿Te sientes cómodo diciendo estas palabras en voz alta?',
    '¿Refleja tu experiencia y conocimiento real?',
    '¿Suena como TÚ o como alguien más?',
    '¿Podrías repetir esto 10 veces sin sonar robot?'
  ];

  const reglasOro = [
    {
      regla: 'Cambiá UNA cosa por vez',
      porque: 'Si tocás tres elementos y mejora, nunca sabrás cuál funcionó',
      ejemplo: 'Semana 1: Solo cambio mis preguntas. Semana 2: Solo cambio pitch.',
      icono: <RefreshCw className="w-6 h-6" />
    },
    {
      regla: 'Grabá TODO',
      porque: 'Tu mejor maestro sos vos en acción',
      ejemplo: 'Carpeta en Drive: "Llamadas/[Fecha]/[Cliente]/grabacion.mp3"',
      icono: <Radio className="w-6 h-6" />
    },
    {
      regla: 'Las preguntas incómodas se quedan',
      porque: 'Si te da miedo preguntarlo... probablemente es donde está el oro',
      ejemplo: '"¿Cuánto facturás?" no se cambia por "¿Cómo te va?" - Perdés datos críticos',
      icono: <AlertTriangle className="w-6 h-6" />
    },
    {
      regla: 'Tu script tiene versiones',
      porque: 'Como software: V1.0, V2.0, V3.0... hasta ∞',
      ejemplo: 'Si tu V1.0 te sirve para siempre, no estás creciendo',
      icono: <GitBranch className="w-6 h-6" />
    },
    {
      regla: 'Guardá las frases de oro',
      porque: 'Ese momento donde el cliente dijo "exacto" - esa frase vale oro',
      ejemplo: 'Nota en tu celular: "Frases que funcionaron" con fecha y contexto',
      icono: <Star className="w-6 h-6" />
    }
  ];

  const agregarFrase = () => {
    if (nuevaFrase.trim()) {
      setFrasesGuardadas([...frasesGuardadas, nuevaFrase]);
      setNuevaFrase('');
    }
  };

  const eliminarFrase = (index: number) => {
    setFrasesGuardadas(frasesGuardadas.filter((_, i) => i !== index));
  };

  const toggleTestAutenticidad = (index: number) => {
    const newTest = [...testAutenticidad];
    newTest[index] = !newTest[index];
    setTestAutenticidad(newTest);
  };

  const autenticidadScore = testAutenticidad.filter(t => t).length;

  return (
    <div className="space-y-8">
      {/* Hero Creativo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-blue-300">
              Capítulo 3 · Módulo 6
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Edit3 className="w-20 h-20 text-blue-400" />
              <div className="absolute inset-0 animate-pulse">
                <Edit3 className="w-20 h-20 text-blue-400 opacity-30" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-blue-300 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            ✍️ EL ARTE DE
          </h1>
          <h2 className="text-4xl font-bold text-center mb-4 text-blue-100">
            REESCRIBIR TU SCRIPT
          </h2>
          <div className="max-w-4xl mx-auto space-y-3 text-center">
            <p className="text-xl text-blue-200">
              Un script de ventas es una guía que te ayuda a saber qué decir
            </p>
            <p className="text-xl text-blue-200">
              y cómo decirlo durante una conversación para vender
            </p>
            <p className="text-xl text-white font-bold">
              con claridad, confianza y resultados.
            </p>
            <div className="my-6 h-1 w-64 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
            <p className="text-2xl text-white font-black">
              El script no es una jaula.
            </p>
            <p className="text-2xl text-blue-300 font-bold">
              Es un plano de construcción... pero vos sos el arquitecto.
            </p>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>

      {/* Por qué no sonar como robot */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200 shadow-xl">
        <div className="text-center mb-6">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🛑 Vender Sin Sonar Como Robot
          </h2>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
          <p className="text-xl text-slate-800 leading-relaxed">
            Hoy quiero hablarte de algo que separa a los <span className="font-bold text-red-600">amateurs</span> de los que <span className="font-bold text-green-600">dominan el juego</span>: hacer tuyo el script de ventas sin perder su poder original.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
              <h3 className="text-xl font-bold text-red-900 mb-3">❌ El Amateur</h3>
              <ul className="space-y-2 text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Lee el script palabra por palabra</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Suena mecánico y sin alma</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>No se atreve a modificar nada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Pierde autenticidad</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-300">
              <h3 className="text-xl font-bold text-green-900 mb-3">✅ El Profesional</h3>
              <ul className="space-y-2 text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Usa el script como estructura</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Lo adapta a su estilo natural</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Mantiene la intención, cambia las palabras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Suena auténtico y poderoso</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-6 rounded-xl text-white text-center">
            <p className="text-2xl font-bold mb-2">
              🔑 El Guion No Es Un Auto de Alquiler
            </p>
            <p className="text-lg text-blue-200">
              La primera vez que lo usás se siente rígido, incómodo. Pero no te quedes ahí. Moldealo a tu tono, tu energía, tu cliente ideal.
            </p>
          </div>
        </div>
      </div>

      {/* Qué Podés Modificar */}
      <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
        <div className="text-center mb-8">
          <Wrench className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎯 ¿Qué Podés Modificar Exactamente?
          </h2>
          <p className="text-lg text-slate-600">
            Todo puede ser variable, pero no todo al mismo tiempo
          </p>
        </div>

        <div className="space-y-4">
          {elementosModificables.map((elemento) => (
            <div key={elemento.id} className="bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <button
                onClick={() => setElementoEditando(elementoEditando === elemento.id ? null : elemento.id)}
                className={`w-full p-6 flex items-center justify-between transition-all ${
                  elementoEditando === elemento.id ? `bg-gradient-to-r ${elemento.color} text-white` : 'hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    elementoEditando === elemento.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {elemento.icono}
                  </div>
                  <div className="text-left">
                    <h3 className={`text-xl font-bold ${
                      elementoEditando === elemento.id ? 'text-white' : 'text-slate-900'
                    }`}>
                      {elemento.nombre}
                    </h3>
                    <p className={`text-sm ${
                      elementoEditando === elemento.id ? 'text-white/90' : 'text-slate-600'
                    }`}>
                      {elemento.descripcion}
                    </p>
                  </div>
                </div>
                <Edit3 className={`w-6 h-6 ${elementoEditando === elemento.id ? 'text-white' : 'text-slate-400'}`} />
              </button>

              {elementoEditando === elemento.id && (
                <div className="p-6 bg-white border-t-2 border-slate-200">
                  <div className="space-y-4">
                    <div className="bg-slate-100 p-5 rounded-lg">
                      <p className="font-bold text-slate-900 mb-3">📝 Ejemplos de Adaptación:</p>
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded border-l-4 border-slate-400">
                          <p className="text-xs font-bold text-slate-600 mb-1">Original:</p>
                          <p className="text-slate-900 italic">{elemento.ejemplo.original}</p>
                        </div>
                        <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                          <p className="text-xs font-bold text-blue-600 mb-1">Adaptación 1:</p>
                          <p className="text-slate-900 italic">{elemento.ejemplo.adaptacion1}</p>
                        </div>
                        <div className="bg-white p-4 rounded border-l-4 border-green-500">
                          <p className="text-xs font-bold text-green-600 mb-1">Adaptación 2:</p>
                          <p className="text-slate-900 italic">{elemento.ejemplo.adaptacion2}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                        <p className="font-bold text-green-900 text-sm mb-2">✅ Cuándo cambiarlo:</p>
                        <p className="text-slate-800 text-sm">{elemento.cuandoCambiar}</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                        <p className="font-bold text-red-900 text-sm mb-2">⚠️ Cuidado:</p>
                        <p className="text-slate-800 text-sm">{elemento.cuidado}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-amber-600 to-orange-600 p-6 rounded-xl text-white text-center">
          <p className="text-2xl font-bold mb-2">
            ⚠️ Regla de Oro
          </p>
          <p className="text-xl">
            Cambiá UNA sola cosa por vez. Si tocás tres y mejora... nunca sabrás cuál fue la que funcionó.
          </p>
        </div>
      </div>

      {/* Las 5 Reglas de Oro */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-300 shadow-xl">
        <div className="text-center mb-6">
          <BookOpen className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📚 Las 5 Reglas de Oro
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {reglasOro.map((regla, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-lg text-yellow-600">
                  {regla.icono}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {idx + 1}. {regla.regla}
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-blue-900 mb-1">Por qué:</p>
                      <p className="text-sm text-slate-800">{regla.porque}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-green-900 mb-1">Ejemplo:</p>
                      <p className="text-sm text-slate-800 italic">{regla.ejemplo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analizador de Momentos Clave */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-6">
          <Eye className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🎧 Analizador de Momentos Clave
          </h2>
          <p className="text-lg text-slate-600">
            Qué buscar cuando reescuchás tus grabaciones
          </p>
        </div>

        <div className="space-y-4">
          {momentosClave.map((momento, idx) => (
            <div key={idx} className={`bg-gradient-to-r ${momento.color} rounded-xl p-6 text-white shadow-lg`}>
              <h3 className="text-2xl font-bold mb-3">
                {idx + 1}. {momento.momento}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-sm mb-2">🔍 Señales:</p>
                  <ul className="space-y-1 text-sm">
                    {momento.señales.map((señal, sIdx) => (
                      <li key={sIdx}>• {señal}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-sm mb-2">📊 Diagnóstico:</p>
                  <p className="text-sm">{momento.diagnostico}</p>
                </div>
                <div className="bg-white/30 backdrop-blur rounded-lg p-4">
                  <p className="font-bold text-sm mb-2">✅ Acción:</p>
                  <p className="text-sm font-bold">{momento.accion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-900 p-6 rounded-xl text-white text-center">
          <Radio className="w-12 h-12 mx-auto mb-3" />
          <p className="text-xl font-bold mb-2">
            🎙️ Tu mejor maestro no es el script: sos vos en acción
          </p>
          <p className="text-slate-300">
            Reescuchá tus llamadas como un cirujano. Detectá los momentos exactos donde perdiste al cliente... o donde lo hiciste decir "quiero más".
          </p>
        </div>
      </div>

      {/* Biblioteca de Frases de Oro */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-amber-300 shadow-xl">
        <div className="text-center mb-6">
          <Archive className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            💎 Tu Biblioteca de Frases de Oro
          </h2>
          <p className="text-lg text-slate-600">
            Guardá las frases que funcionaron. Son tesoros escondidos.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={nuevaFrase}
              onChange={(e) => setNuevaFrase(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && agregarFrase()}
              placeholder='Ej: "¿Y si en 6 meses seguís igual?"'
              className="flex-1 p-4 border-2 border-slate-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
            <button
              onClick={agregarFrase}
              className="px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Guardar
            </button>
          </div>

          {frasesGuardadas.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <Lightbulb className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">
                Aún no guardaste ninguna frase de oro
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Después de cada llamada exitosa, guardá la frase exacta que funcionó
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {frasesGuardadas.map((frase, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200 group hover:shadow-md transition-all">
                  <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="flex-1 text-slate-800 italic font-medium">"{frase}"</p>
                  <button
                    onClick={() => eliminarFrase(idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Versionado de Scripts */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300 shadow-xl">
        <div className="text-center mb-6">
          <GitBranch className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            ♾️ El Juego No Termina: V1.0 → V∞
          </h2>
          <p className="text-lg text-slate-600">
            Tu script tiene versiones como el software
          </p>
        </div>

        <div className="space-y-4">
          {versionesScript.map((version) => (
            <div key={version.version} className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full text-sm">
                      V{version.version}
                    </span>
                    <span className="text-sm text-slate-600">{version.fecha}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{version.cambios}</h3>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-green-600">{version.resultado}</p>
                  <p className="text-xs text-slate-600">conversión</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-bold text-blue-900 mb-1">💡 Aprendizaje:</p>
                <p className="text-slate-800">{version.aprendizaje}</p>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-xl text-white text-center">
            <TrendingUp className="w-16 h-16 mx-auto mb-4" />
            <p className="text-2xl font-bold mb-2">
              El guion que hoy te queda justo... mañana te va a quedar chico.
            </p>
            <p className="text-lg text-green-100">
              Esa es la señal de que estás creciendo.
            </p>
          </div>
        </div>
      </div>

      {/* Test de Autenticidad */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-300 shadow-xl">
        <div className="text-center mb-6">
          <Heart className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            💯 Test de Autenticidad
          </h2>
          <p className="text-lg text-slate-600">
            ¿Tu script suena a ti o a robot?
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <p className="text-lg text-slate-700 mb-6 text-center">
            Respondé con honestidad brutal. Cada "sí" te acerca a tu voz auténtica.
          </p>

          <div className="space-y-3 mb-6">
            {preguntasAutenticidad.map((pregunta, idx) => (
              <label 
                key={idx}
                className="flex items-start gap-3 p-5 bg-slate-50 rounded-lg border-2 border-slate-200 cursor-pointer hover:border-indigo-400 transition-all"
              >
                <input
                  type="checkbox"
                  checked={testAutenticidad[idx] || false}
                  onChange={() => toggleTestAutenticidad(idx)}
                  className="mt-1 w-6 h-6 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="flex-1 text-slate-800 font-medium">{pregunta}</span>
              </label>
            ))}
          </div>

          <div className={`p-8 rounded-xl text-center transition-all ${
            autenticidadScore === 5 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
              : autenticidadScore >= 3
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
              : 'bg-gradient-to-r from-red-600 to-red-700 text-white'
          }`}>
            {autenticidadScore === 5 && (
              <div>
                <CheckCircle className="w-16 h-16 mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">✅ Script Auténtico</p>
                <p className="text-xl">Este script es tuyo. Suena natural y poderoso.</p>
              </div>
            )}
            {autenticidadScore >= 3 && autenticidadScore < 5 && (
              <div>
                <AlertTriangle className="w-16 h-16 mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">⚠️ Casi ahí</p>
                <p className="text-xl">Seguí adaptándolo. Te falta poco para que sea completamente tuyo.</p>
              </div>
            )}
            {autenticidadScore < 3 && (
              <div>
                <AlertTriangle className="w-16 h-16 mx-auto mb-3" />
                <p className="text-3xl font-bold mb-2">🔴 Necesita trabajo</p>
                <p className="text-xl">Este script aún suena genérico. Reescribilo con TUS palabras.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BONUS OCULTO */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-8 text-white border-2 border-indigo-500 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-indigo-200 text-center mb-6">
          Creá tu primer script desde cero
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-indigo-200 leading-relaxed">
            🧠 Actuá como un coach de ventas con 20 años de experiencia. Ayudame a crear mi primer script de ventas desde cero, adaptado a mi personalidad, mi estilo de comunicación y el tipo de cliente que quiero atraer.
            <br/><br/>
            Quiero que me ayudes a:
            <br/>
            • Estructurar una conversación de ventas clara y natural.
            <br/>
            • Incluir preguntas clave para descubrir lo que mi cliente realmente necesita.
            <br/>
            • Sugerirme cómo responder objeciones sin sonar a vendedor barato.
            <br/>
            • Usar un tono cálido, auténtico y seguro.
            <br/><br/>
            Además, ayudame a armar una lista con las 10 objeciones más comunes que podría recibir, y qué puedo decir para responderlas con confianza.
          </p>
        </div>
      </div>

      {/* Cierre Épico */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <Edit3 className="w-24 h-24 mx-auto text-blue-400 mb-6" />
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-300 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            ✍️ TU VOZ, TU PODER
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-2xl font-bold text-white">
              El script perfecto no existe.
            </p>
            <p className="text-2xl font-bold text-blue-300">
              Existe el script que es tuyo.
            </p>
            <div className="my-8 h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
            <p className="text-xl text-slate-200">
              Cada error, cada cierre, cada "no"... es combustible.
            </p>
            <p className="text-xl text-slate-200">
              Tu script tiene versiones como el software.
            </p>
            <div className="my-8" />
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl mt-8 inline-block shadow-2xl">
              <p className="text-3xl font-black text-white mb-3">
                V1.0, V2.0, V3.0... V∞
              </p>
              <p className="text-xl font-bold text-white">
                Y si sos honesto, vas a llegar a tu V21.0. Y más.
              </p>
              <p className="text-lg text-blue-100 mt-3">
                El guion que hoy te queda justo... mañana te va a quedar chico.
              </p>
              <p className="text-lg text-blue-100">
                Esa es la señal de que estás creciendo.
              </p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export const reescribirScriptMetadata = {
  id: 6,
  title: "El Arte de Reescribir Tu Script de Ventas",
  type: "document" as const,
  duration: "45 min"
};