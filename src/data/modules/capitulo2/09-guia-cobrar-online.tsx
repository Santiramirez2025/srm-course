import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Shield, Zap, AlertTriangle, CheckCircle, Sparkles, HelpCircle } from 'lucide-react';

export const GuiaCobrarOnlineContent = () => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState<string | null>(null);
  const [tipoClienteSeleccionado, setTipoClienteSeleccionado] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState({
    casosExito: null as boolean | null,
    medirResultados: null as boolean | null,
    asumirRiesgo: null as boolean | null
  });
  const [modeloSeleccionado, setModeloSeleccionado] = useState<number | null>(null);

  const modelos = [
    {
      id: 1,
      nombre: 'Fijo Mensual',
      emoji: '💰',
      descripcion: 'Cobrás lo mismo cada mes',
      idealSi: 'Querés ingresos estables y previsibles',
      ventajas: ['Previsibilidad total', 'Fácil de facturar', 'Cliente sabe qué paga'],
      desventajas: ['Poco escalable', 'No crece con resultados'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      nombre: 'Por Resultado',
      emoji: '🎯',
      descripcion: 'Cobrás solo si hay acción (cita, venta, etc.)',
      idealSi: 'Tus clientes desconfían o están probando',
      ventajas: ['Sin riesgo para el cliente', 'Fácil de vender', 'Alta confianza'],
      desventajas: ['Ingresos variables', 'Dependes de factores externos'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 3,
      nombre: 'Mixto (Fijo + Variable)',
      emoji: '⚖️',
      descripcion: 'Parte fija + parte según resultados',
      idealSi: 'Ya tenés experiencia y querés equilibrio',
      ventajas: ['Lo mejor de ambos', 'Estabilidad + crecimiento', 'Win-win'],
      desventajas: ['Más complejo de explicar', 'Requiere seguimiento'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      nombre: 'Retainer Escalable',
      emoji: '📈',
      descripcion: 'Empezás con algo chico y después ampliás',
      idealSi: 'Querés relaciones largas y vender más después',
      ventajas: ['Fácil de arrancar', 'Crece con el cliente', 'Fidelización'],
      desventajas: ['Inicio lento', 'Requiere paciencia'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      nombre: 'Market-Pays (Todo incluido)',
      emoji: '🚀',
      descripcion: 'Vos manejás todo y cobrás por performance',
      idealSi: 'Tenés equipo y estructura sólida',
      ventajas: ['Alto potencial de ganancia', 'Control total', 'Escalable'],
      desventajas: ['Requiere equipo', 'Mayor responsabilidad', 'Más riesgo'],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const niveles = [
    {
      id: 'principiante',
      nombre: 'Principiante',
      emoji: '🟢',
      descripcion: '0–5 clientes, poca estructura',
      modelosRecomendados: [2, 4],
      color: 'green'
    },
    {
      id: 'intermedio',
      nombre: 'Intermedio',
      emoji: '⚠️',
      descripcion: '5–15 clientes, algo de sistema',
      modelosRecomendados: [3, 4],
      color: 'yellow'
    },
    {
      id: 'avanzado',
      nombre: 'Avanzado',
      emoji: '🔴',
      descripcion: '15+ clientes y equipo armado',
      modelosRecomendados: [3, 5],
      color: 'red'
    }
  ];

  const tiposCliente = [
    {
      id: 'desconfiado',
      nombre: 'Desconfiado',
      emoji: '😬',
      descripcion: 'Nunca trabajó con agencias',
      modeloIdeal: 2,
      color: 'red'
    },
    {
      id: 'quemado',
      nombre: 'Quemado',
      emoji: '😤',
      descripcion: 'Tuvo malas experiencias',
      modeloIdeal: 4,
      color: 'orange'
    },
    {
      id: 'profesional',
      nombre: 'Profesional',
      emoji: '💼',
      descripcion: 'Tiene equipo y presupuesto',
      modelosIdeales: [3, 5],
      color: 'blue'
    }
  ];

  const calcularRecomendacion = () => {
    if (!nivelSeleccionado) return null;

    const nivel = niveles.find(n => n.id === nivelSeleccionado);
    if (!nivel) return null;

    let recomendacion = nivel.modelosRecomendados[0];

    // Ajustar por tipo de cliente
    if (tipoClienteSeleccionado === 'desconfiado') {
      recomendacion = 2;
    } else if (tipoClienteSeleccionado === 'quemado') {
      recomendacion = 4;
    }

    // Ajustar por respuestas
    if (respuestas.casosExito && respuestas.medirResultados && respuestas.asumirRiesgo) {
      if (nivelSeleccionado === 'principiante') recomendacion = 2;
      if (nivelSeleccionado === 'intermedio') recomendacion = 3;
      if (nivelSeleccionado === 'avanzado') recomendacion = 5;
    }

    return modelos.find(m => m.id === recomendacion);
  };

  const modeloRecomendado = calcularRecomendacion();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-green-200 mb-2">
            Módulo 9 · Monetización Inteligente
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            📊 Guía para Cobrar Online
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Elegí cómo cobrar sin enredarte: simple, claro y con foco en ganar bien sin volverte loco
          </p>
        </div>
      </div>

      {/* Lo que vas a resolver */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🔍 Lo que vas a resolver
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            '¿Qué modelo de cobro me conviene hoy?',
            '¿Cómo evitar complicarme o estresarme?',
            '¿Cuál puedo vender con confianza y cumplir bien?'
          ].map((pregunta, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border-2 border-blue-200 flex items-start gap-3">
              <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-gray-800 font-medium">{pregunta}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Los 5 Modelos */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🧱 Los 5 Modelos que Funcionan
        </h2>
        <div className="space-y-4">
          {modelos.map((modelo) => (
            <button
              key={modelo.id}
              onClick={() => setModeloSeleccionado(modeloSeleccionado === modelo.id ? null : modelo.id)}
              className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                modeloSeleccionado === modelo.id
                  ? 'ring-4 ring-purple-300 border-purple-500'
                  : 'border-purple-200 hover:border-purple-400'
              } bg-white`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{modelo.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{modelo.nombre}</h3>
                    <p className="text-sm text-gray-600">{modelo.descripcion}</p>
                  </div>
                </div>
                <div className="text-2xl">
                  {modeloSeleccionado === modelo.id ? '▼' : '▶'}
                </div>
              </div>

              <div className={`bg-gradient-to-r ${modelo.color} text-white p-3 rounded-lg mb-3`}>
                <p className="font-bold text-sm">Ideal si: {modelo.idealSi}</p>
              </div>

              {modeloSeleccionado === modelo.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-green-700 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Ventajas:
                    </p>
                    <ul className="space-y-1">
                      {modelo.ventajas.map((ventaja, idx) => (
                        <li key={idx} className="text-sm text-gray-700">• {ventaja}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-red-700 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Desventajas:
                    </p>
                    <ul className="space-y-1">
                      {modelo.desventajas.map((desventaja, idx) => (
                        <li key={idx} className="text-sm text-gray-700">• {desventaja}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Semáforo de Decisión */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🚦 Tu Semáforo de Decisión
        </h2>
        <p className="text-gray-700 mb-6">
          Elegí tu nivel actual para ver qué modelo te conviene:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {niveles.map((nivel) => (
            <button
              key={nivel.id}
              onClick={() => setNivelSeleccionado(nivel.id)}
              className={`p-5 rounded-lg border-2 transition-all text-left ${
                nivelSeleccionado === nivel.id
                  ? 'ring-4 ring-blue-300 border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
            >
              <div className="text-center mb-3">
                <span className="text-5xl">{nivel.emoji}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{nivel.nombre}</h3>
              <p className="text-sm text-gray-600 text-center mb-3">{nivel.descripcion}</p>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-xs font-bold text-gray-700 mb-1">Modelos recomendados:</p>
                {nivel.modelosRecomendados.map(modeloId => {
                  const modelo = modelos.find(m => m.id === modeloId);
                  return modelo ? (
                    <p key={modeloId} className="text-xs text-gray-600">• {modelo.nombre}</p>
                  ) : null;
                })}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tipo de Cliente */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎯 Tipo de Cliente
        </h2>
        <p className="text-gray-700 mb-6">
          El tipo de cliente influye en qué modelo funciona mejor:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {tiposCliente.map((tipo) => (
            <button
              key={tipo.id}
              onClick={() => setTipoClienteSeleccionado(tipo.id)}
              className={`p-5 rounded-lg border-2 transition-all text-left ${
                tipoClienteSeleccionado === tipo.id
                  ? 'ring-4 ring-orange-300 border-orange-500 bg-orange-50'
                  : 'border-orange-200 hover:border-orange-400 bg-white'
              }`}
            >
              <div className="text-center mb-3">
                <span className="text-5xl">{tipo.emoji}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{tipo.nombre}</h3>
              <p className="text-sm text-gray-600 text-center mb-3">{tipo.descripcion}</p>
              <div className="bg-orange-50 p-3 rounded">
                <p className="text-xs font-bold text-gray-700 mb-1">Modelo ideal:</p>
                <p className="text-xs text-gray-600">
                  {Array.isArray(tipo.modelosIdeales) 
                    ? tipo.modelosIdeales.map(id => modelos.find(m => m.id === id)?.nombre).join(' o ')
                    : modelos.find(m => m.id === tipo.modeloIdeal)?.nombre}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preguntas Rápidas */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border-2 border-yellow-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ✅ Preguntas Rápidas
        </h2>
        <p className="text-gray-700 mb-6">
          Respondé estas preguntas para afinar tu recomendación:
        </p>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-lg border-2 border-yellow-300">
            <p className="font-bold text-gray-900 mb-3">1. ¿Tenés casos de éxito para mostrar?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setRespuestas({...respuestas, casosExito: true})}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  respuestas.casosExito === true
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sí
              </button>
              <button
                onClick={() => setRespuestas({...respuestas, casosExito: false})}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  respuestas.casosExito === false
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-yellow-300">
            <p className="font-bold text-gray-900 mb-3">2. ¿Podés medir tus resultados?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setRespuestas({...respuestas, medirResultados: true})}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  respuestas.medirResultados === true
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sí
              </button>
              <button
                onClick={() => setRespuestas({...respuestas, medirResultados: false})}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  respuestas.medirResultados === false
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-yellow-300">
            <p className="font-bold text-gray-900 mb-3">3. ¿Querés asumir un poco de riesgo para crecer más rápido?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setRespuestas({...respuestas, asumirRiesgo: true})}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  respuestas.asumirRiesgo === true
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sí
              </button>
              <button
                onClick={() => setRespuestas({...respuestas, asumirRiesgo: false})}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  respuestas.asumirRiesgo === false
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendación Personalizada */}
      {modeloRecomendado && (
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-8 rounded-xl border-2 border-green-700">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8" />
            Tu Modelo Recomendado
          </h2>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <div className="text-center mb-4">
              <span className="text-7xl">{modeloRecomendado.emoji}</span>
            </div>
            <h3 className="text-2xl font-bold text-center mb-3">{modeloRecomendado.nombre}</h3>
            <p className="text-xl text-center mb-4">{modeloRecomendado.descripcion}</p>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="font-bold mb-2">Por qué este modelo:</p>
              <p className="text-green-100">{modeloRecomendado.idealSi}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recomendación Final */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🧠 Recomendación Final (Reglas Generales)
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-lg border-l-4 border-green-500">
            <p className="font-bold text-green-700 mb-2">🟢 Si estás empezando:</p>
            <p className="text-gray-800"><strong>Modelo 2 (Por Resultado).</strong> Simple, confiable y sin riesgos grandes.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border-l-4 border-yellow-500">
            <p className="font-bold text-yellow-700 mb-2">⚠️ Si ya tenés base:</p>
            <p className="text-gray-800"><strong>Modelo 3 (Mixto).</strong> Combina estabilidad con crecimiento.</p>
          </div>
          <div className="bg-white p-5 rounded-lg border-l-4 border-red-500">
            <p className="font-bold text-red-700 mb-2">🔴 Si estás consolidado:</p>
            <p className="text-gray-800"><strong>Modelo 5 (Market-Pays).</strong> Alta ganancia, pero requiere estructura.</p>
          </div>
        </div>
      </div>

      {/* Regla de Oro */}
      <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          📌 Regla de Oro
        </h2>
        <p className="text-2xl font-bold mb-2">
          No cobres como soñás.
        </p>
        <p className="text-3xl font-bold">
          Cobrá como podés cumplir con claridad y confianza.
        </p>
        <p className="text-xl mt-4 text-yellow-100">
          Ahí está tu modelo ideal.
        </p>
      </div>

      {/* BONUS */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-600" />
          🔓 BONUS: Prompt para IA
        </h2>
        <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
          <p className="text-gray-800 mb-4 font-bold">
            Usá este prompt para que la IA te ayude a elegir:
          </p>
          <div className="bg-purple-50 p-4 rounded border-2 border-purple-200">
            <p className="text-sm text-gray-800">
              "Ayudame a elegir un modelo de cobro simple y efectivo para escalar mi agencia desde cero, con 0–5 clientes y poca estructura. Quiero minimizar el estrés y tener potencial de crecimiento real. Indicame cuál modelo elegir, por qué, y qué rango o comisión usar para empezar. También dame un consejo clave para evitar frustraciones comunes."
            </p>
          </div>
        </div>
      </div>

      {/* Transición */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          ✅ Ya sabés cómo cobrar de forma inteligente...
        </p>
        <p className="text-xl text-gray-700">
          Felicitaciones por completar el Capítulo 2: Trabajar Online. Estás listo para aplicar todo lo aprendido.
        </p>
      </div>
    </div>
  );
};

export const guiaCobrarOnlineMetadata = {
  id: 9,
  title: "Guía para Cobrar Online",
  type: "document" as const,
  duration: "20 min"
};