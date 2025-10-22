import React, { useState } from 'react';
import { Calendar, Clock, Target, TrendingUp, Coffee, Moon, Sun, Check, Copy, Download, Sparkles, Zap } from 'lucide-react';

export const CalendarioDiarioProContent = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState<string>('lunes-viernes');
  const [copiado, setCopiado] = useState(false);

  const calendarios = {
    'lunes-viernes': {
      nombre: 'Lunes a Viernes',
      emoji: '💼',
      subtitulo: 'Ritmo Alto con Foco',
      horarios: [
        { tiempo: '06:30 – 07:00', actividad: 'Despertar + hidratación + afirmaciones', emoji: '☀️', categoria: 'ritual' },
        { tiempo: '07:00 – 08:00', actividad: 'Entrenamiento físico + ducha', emoji: '🏋️', categoria: 'salud' },
        { tiempo: '08:00 – 08:30', actividad: 'Desayuno saludable', emoji: '🥗', categoria: 'salud' },
        { tiempo: '08:30 – 09:00', actividad: 'Planificación del día (Prioridades)', emoji: '✍️', categoria: 'planificacion' },
        { tiempo: '09:00 – 11:00', actividad: 'Bloque de trabajo profundo', emoji: '🎯', categoria: 'trabajo' },
        { tiempo: '11:00 – 11:30', actividad: 'Pausa activa', emoji: '☕', categoria: 'descanso' },
        { tiempo: '11:30 – 13:00', actividad: 'Continuación del trabajo', emoji: '💻', categoria: 'trabajo' },
        { tiempo: '13:00 – 14:00', actividad: 'Almuerzo desconectado (nada de pantallas)', emoji: '🍽️', categoria: 'salud' },
        { tiempo: '14:00 – 15:30', actividad: 'Bloque creativo o resolución de problemas', emoji: '🧠', categoria: 'trabajo' },
        { tiempo: '15:30 – 16:00', actividad: 'Descanso / siesta breve / paseo', emoji: '🚶', categoria: 'descanso' },
        { tiempo: '16:00 – 17:30', actividad: 'Continuación del trabajo', emoji: '📊', categoria: 'trabajo' },
        { tiempo: '17:30 – 18:00', actividad: 'Revisión del día + plan para mañana', emoji: '📝', categoria: 'planificacion' },
        { tiempo: '18:00 – 19:30', actividad: 'Cena ligera + tiempo con seres queridos / relax', emoji: '❤️', categoria: 'personal' },
        { tiempo: '20:00 – 21:00', actividad: 'Rutina nocturna: journaling, lectura, estiramientos', emoji: '📖', categoria: 'ritual' },
        { tiempo: '21:00 – 06:30', actividad: 'Sueño profundo reparador', emoji: '😴', categoria: 'descanso' }
      ]
    },
    'sabado': {
      nombre: 'Sábado',
      emoji: '🎨',
      subtitulo: 'Día de Balance y Recarga',
      horarios: [
        { tiempo: '08:00 – 09:00', actividad: 'Rutina de mañana tranquila', emoji: '🌅', categoria: 'ritual' },
        { tiempo: '09:00 – 10:30', actividad: 'Revisión de la semana (logros, aprendizajes, mejoras)', emoji: '📊', categoria: 'planificacion' },
        { tiempo: '10:30 – 13:00', actividad: 'Tareas personales, compras, organización', emoji: '🏠', categoria: 'personal' },
        { tiempo: '13:00 – 18:00', actividad: 'Tiempo libre de calidad (hobbies, salidas, naturaleza)', emoji: '🌳', categoria: 'personal' },
        { tiempo: '18:00 – 21:00', actividad: 'Cena especial, socializar, desconexión digital', emoji: '🍷', categoria: 'personal' },
        { tiempo: '21:00 – 08:00', actividad: 'Dormir', emoji: '😴', categoria: 'descanso' }
      ]
    },
    'domingo': {
      nombre: 'Domingo',
      emoji: '🧘',
      subtitulo: 'Preparación y Recarga Total',
      horarios: [
        { tiempo: '08:00 – 09:30', actividad: 'Rutina slow + journaling de gratitud', emoji: '🌞', categoria: 'ritual' },
        { tiempo: '09:30 – 11:00', actividad: 'Planificación semanal: objetivos + bloques de tiempo', emoji: '🧠', categoria: 'planificacion' },
        { tiempo: '11:00 – 13:00', actividad: 'Inspiración (podcast, lectura estratégica, ideas nuevas)', emoji: '📚', categoria: 'personal' },
        { tiempo: '13:00 – 18:00', actividad: 'Libre total (sin obligaciones, 100% para recargar energía)', emoji: '🔋', categoria: 'personal' },
        { tiempo: '18:00 – 20:00', actividad: 'Preparar la semana: orden físico y mental', emoji: '🗂️', categoria: 'planificacion' },
        { tiempo: '20:00 – 21:00', actividad: 'Ritual nocturno (baño, visualización semanal)', emoji: '🛁', categoria: 'ritual' },
        { tiempo: '21:00 – 08:00', actividad: 'Dormir', emoji: '😴', categoria: 'descanso' }
      ]
    }
  };

  const beneficios = [
    { icon: <Target className="w-6 h-6" />, texto: 'Tener claridad sobre tus prioridades' },
    { icon: <Zap className="w-6 h-6" />, texto: 'Eliminar la improvisación que consume energía' },
    { icon: <TrendingUp className="w-6 h-6" />, texto: 'Crear foco, ritmo y estructura en tu día' },
    { icon: <Check className="w-6 h-6" />, texto: 'Diseñar hábitos poderosos y sostenibles' },
    { icon: <TrendingUp className="w-6 h-6" />, texto: 'Maximizar productividad sin sacrificar bienestar' },
    { icon: <Check className="w-6 h-6" />, texto: 'Terminar el día con sensación de avance real' }
  ];

  const getCategoriaColor = (categoria: string) => {
    const colores = {
      ritual: 'from-yellow-500 to-orange-500',
      salud: 'from-green-500 to-emerald-500',
      planificacion: 'from-blue-500 to-cyan-500',
      trabajo: 'from-purple-500 to-pink-500',
      descanso: 'from-indigo-500 to-blue-500',
      personal: 'from-red-500 to-pink-500'
    };
    return colores[categoria as keyof typeof colores] || 'from-gray-500 to-gray-600';
  };

  const calendarioActual = calendarios[diaSeleccionado as keyof typeof calendarios];

  const copiarPrompt = () => {
    const prompt = `Actúa como mi coach de productividad y mindset. Crea un calendario diario realista para esta semana, con bloques claros de ejercicio, alimentación, trabajo enfocado y descanso, que pueda cumplir sin agotarme ni perder energía. Considera distracciones digitales y fatiga mental.

Entrégame el calendario por días (lunes a domingo) con horarios prácticos, una versión para importar a Google Calendar y otra para imprimir en PDF.

Finalmente, hazme 2 preguntas clave para ajustar la rutina a mi vida real y necesidades actuales.`;

    navigator.clipboard.writeText(prompt);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-200 mb-2">
            Módulo 10 · Sistema de Alto Rendimiento
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            📅 Calendario Diario PRO
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Tu sistema anticaos: diseñado para productividad, enfoque mental, salud física y tiempo personal
          </p>
        </div>
      </div>

      {/* Por qué funciona */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🧠 ¿Por qué tener un calendario diario cambia tu vida?
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          Tener un calendario diario no es solo organización: es una <strong>estrategia de alto rendimiento mental.</strong>
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {beneficios.map((beneficio, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border-2 border-yellow-300">
              <div className="text-yellow-600 flex-shrink-0 mt-1">
                {beneficio.icon}
              </div>
              <p className="text-gray-800">{beneficio.texto}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-orange-100 p-5 rounded-lg border-l-4 border-orange-500">
          <p className="text-gray-900 font-bold text-center">
            El entorno digital puede distraerte en segundos. Un calendario bien armado es tu sistema anticaos.
          </p>
        </div>
      </div>

      {/* Selector de Días */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          🗓️ Seleccioná tu día
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(calendarios).map(([key, calendario]) => (
            <button
              key={key}
              onClick={() => setDiaSeleccionado(key)}
              className={`p-5 rounded-lg border-2 transition-all ${
                diaSeleccionado === key
                  ? 'bg-blue-600 text-white border-blue-700 ring-4 ring-blue-300'
                  : 'bg-white text-gray-900 border-blue-200 hover:border-blue-400'
              }`}
            >
              <div className="text-center">
                <span className="text-5xl mb-3 block">{calendario.emoji}</span>
                <h3 className="text-lg font-bold mb-1">{calendario.nombre}</h3>
                <p className={`text-sm ${diaSeleccionado === key ? 'text-blue-100' : 'text-gray-600'}`}>
                  {calendario.subtitulo}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Calendario del Día Seleccionado */}
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        <div className={`bg-gradient-to-r ${
          diaSeleccionado === 'lunes-viernes' ? 'from-purple-600 to-pink-600' :
          diaSeleccionado === 'sabado' ? 'from-green-600 to-emerald-600' :
          'from-blue-600 to-indigo-600'
        } text-white p-6`}>
          <div className="flex items-center justify-center gap-3">
            <Calendar className="w-8 h-8" />
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-1">{calendarioActual.nombre}</h3>
              <p className="text-lg">{calendarioActual.subtitulo}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {calendarioActual.horarios.map((horario, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all"
            >
              <div className="flex-shrink-0 text-center min-w-[140px]">
                <Clock className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                <p className="text-sm font-bold text-gray-900">{horario.tiempo}</p>
              </div>
              <div className="flex-1">
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getCategoriaColor(horario.categoria)} text-white text-xs font-bold mb-2`}>
                  {horario.categoria}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{horario.emoji}</span>
                  <p className="text-gray-800 font-medium">{horario.actividad}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda de Categorías */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-300">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          🎨 Categorías del Calendario
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { nombre: 'Ritual', categoria: 'ritual' },
            { nombre: 'Salud', categoria: 'salud' },
            { nombre: 'Planificación', categoria: 'planificacion' },
            { nombre: 'Trabajo', categoria: 'trabajo' },
            { nombre: 'Descanso', categoria: 'descanso' },
            { nombre: 'Personal', categoria: 'personal' }
          ].map((cat, idx) => (
            <div key={idx} className={`p-3 rounded-lg bg-gradient-to-r ${getCategoriaColor(cat.categoria)} text-white text-center font-bold`}>
              {cat.nombre}
            </div>
          ))}
        </div>
      </div>

      {/* Cómo ChatGPT puede ayudarte */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-600" />
          ⚙️ Cómo ChatGPT puede ayudarte
        </h2>
        <p className="text-gray-800 mb-6">
          Usa este prompt para que la IA cree tu calendario personalizado, listo para imprimir o importar a Google Calendar:
        </p>

        <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-gray-900">📋 PROMPT PARA IA:</p>
            <button
              onClick={copiarPrompt}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all flex items-center gap-2"
            >
              {copiado ? (
                <>
                  <Check className="w-5 h-5" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copiar
                </>
              )}
            </button>
          </div>
          <div className="bg-purple-50 p-4 rounded border-2 border-purple-200 max-h-[300px] overflow-y-auto">
            <p className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
              {`Actúa como mi coach de productividad y mindset. Crea un calendario diario realista para esta semana, con bloques claros de ejercicio, alimentación, trabajo enfocado y descanso, que pueda cumplir sin agotarme ni perder energía. Considera distracciones digitales y fatiga mental.

Entrégame el calendario por días (lunes a domingo) con horarios prácticos, una versión para importar a Google Calendar y otra para imprimir en PDF.

Finalmente, hazme 2 preguntas clave para ajustar la rutina a mi vida real y necesidades actuales.`}
            </p>
          </div>
        </div>

        <div className="mt-4 bg-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
          <p className="text-sm text-purple-900">
            <strong>💡 Tip:</strong> Después de copiar este prompt, pégalo en ChatGPT o Claude. La IA te hará preguntas para personalizar tu calendario según tu estilo de vida.
          </p>
        </div>
      </div>

      {/* Beneficios del Sistema */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ✨ Beneficios de Este Sistema
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { titulo: 'Formato Integral', descripcion: 'Productividad + salud + descanso en equilibrio' },
            { titulo: 'Bloques de Trabajo Profundo', descripcion: 'Máximo foco sin distracciones' },
            { titulo: 'Descansos Estratégicos', descripcion: 'Evita el agotamiento mental' },
            { titulo: 'Fines de Semana Recargados', descripcion: 'Balance real entre hacer y descansar' },
            { titulo: 'Rituales Mañana/Noche', descripcion: 'Empieza y termina con intención' },
            { titulo: 'Personalizable', descripcion: 'Adaptable a tu vida y objetivos' }
          ].map((beneficio, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border-2 border-green-300">
              <h3 className="font-bold text-green-700 mb-2">{beneficio.titulo}</h3>
              <p className="text-sm text-gray-700">{beneficio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Regla de Oro */}
      <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          🎯 Regla de Oro
        </h2>
        <p className="text-2xl font-bold mb-3">
          No es solo organizar tu tiempo.
        </p>
        <p className="text-3xl font-bold">
          Es diseñar tu vida con intención.
        </p>
        <p className="text-xl mt-4 text-yellow-100">
          Un día bien estructurado es un día bien vivido.
        </p>
      </div>

      {/* Cierre */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          ✅ Ahora tenés tu calendario profesional de alto rendimiento
        </p>
        <p className="text-xl text-gray-700 mb-4">
          El siguiente paso: implementarlo con constancia durante 21 días para que se vuelva tu nueva normalidad.
        </p>
        <div className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
          <Check className="w-6 h-6" />
          ¡Felicitaciones por completar el Capítulo 2!
        </div>
      </div>
    </div>
  );
};

export const calendarioDiarioProMetadata = {
  id: 10,
  title: "Calendario Diario PRO - Sistema Anticaos",
  type: "document" as const,
  duration: "15 min"
};