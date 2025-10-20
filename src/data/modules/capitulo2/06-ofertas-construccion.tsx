import React, { useState } from 'react';
import { TrendingUp, Award, Activity, CheckCircle, Sparkles, Target, Zap } from 'lucide-react';

export const OfertasIIConstruccionContent = () => {
  const [pilaresChecked, setPilaresChecked] = useState<{[key: number]: boolean}>({});
  const [nichoInput, setNichoInput] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);

  const sietePilares = [
    {
      id: 1,
      emoji: '🎯',
      nombre: 'Promesa clara y específica',
      descripcion: 'Mostrá el destino, no el camino.'
    },
    {
      id: 2,
      emoji: '⏱️',
      nombre: 'Tiempo estimado para lograrlo',
      descripcion: 'Cuanto más concreto, más creíble.'
    },
    {
      id: 3,
      emoji: '🧭',
      nombre: 'Método paso a paso',
      descripcion: 'Si lo entienden, lo compran.'
    },
    {
      id: 4,
      emoji: '🧠',
      nombre: 'Diferenciación real',
      descripcion: 'Lo común no vende. Lo único, sí.'
    },
    {
      id: 5,
      emoji: '🛟',
      nombre: 'Garantía o red de seguridad',
      descripcion: 'Si compartís el riesgo, el cliente avanza.'
    },
    {
      id: 6,
      emoji: '⚡',
      nombre: 'Filtro claro (polarización)',
      descripcion: 'Cuando repelés a quien no querés, atraés con más fuerza a quien sí.'
    },
    {
      id: 7,
      emoji: '💰',
      nombre: 'Precio basado en el valor',
      descripcion: 'Cuando resolvés algo importante, el precio deja de importar.'
    }
  ];

  const erroresLetales = [
    {
      error: 'Copiar sin pensar',
      consecuencia: 'te volvés invisible',
      solucion: 'Lo que funciona para otros puede no tener alma para tu público. No imites. Interpretá.'
    },
    {
      error: 'Jugar a lo seguro',
      consecuencia: 'no generás confianza',
      solucion: 'Una oferta tibia no transmite autoridad. La gente sigue a quien se la juega, no a quien duda.'
    },
    {
      error: 'Hablar complicado',
      consecuencia: 'confundís, perdés',
      solucion: 'Si tu mensaje no se entiende en 5 segundos, se pierde para siempre.'
    },
    {
      error: 'No hablar su idioma',
      consecuencia: 'no hay conexión',
      solucion: 'Usar lenguaje genérico es como gritar en una sala vacía. Conectá con sus palabras.'
    },
    {
      error: 'Empezar por el producto',
      consecuencia: 'error fatal',
      solucion: 'Una oferta irresistible no nace del producto, nace del cliente. Primero entendé el dolor.'
    }
  ];

  const togglePilar = (id: number) => {
    setPilaresChecked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const calcularProgresoPilares = () => {
    const total = sietePilares.length;
    const completados = Object.values(pilaresChecked).filter(v => v).length;
    return Math.round((completados / total) * 100);
  };

  const copyPrompt = () => {
    const prompt = `Quiero que me ayudes a crear una oferta irresistible para [${nichoInput || 'mi nicho/cliente ideal'}]. Necesito que incluya: 
- Una promesa transformadora clara,
- Un ángulo único que me diferencie de mi competencia,
- Una justificación lógica del valor,
- Una garantía sólida o red de seguridad,
- Una razón para actuar ahora.
También quiero que hables con el tono y lenguaje que usa ese cliente cuando expresa su dolor y su deseo. Quiero que se sienta comprendido y urgido a tomar acción. Dame varias opciones si es posible.`;
    
    navigator.clipboard.writeText(prompt);
    setSelectedPrompt(1);
    setTimeout(() => setSelectedPrompt(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-2">
            Módulo 5B · Parte 2 de 2
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            🏗️ Ofertas II: Construcción y Ejecución
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Ahora que entendés la psicología, es momento de construir tu oferta irresistible paso a paso.
          </p>
        </div>
      </div>

      {/* Recap Rápido */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          📚 Recap Rápido: Lo que ya sabés
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
            <p className="font-bold text-blue-700 mb-2">✓ Las 6 Fuerzas</p>
            <p className="text-sm text-gray-700">Impulso, Meta, Problema, Dolor, Acción, Confianza</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
            <p className="font-bold text-blue-700 mb-2">✓ Las 3 Llaves</p>
            <p className="text-sm text-gray-700">Tu Oferta, Vos, Tus Clientes</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
            <p className="font-bold text-blue-700 mb-2">✓ El Umbral de Acción</p>
            <p className="text-sm text-gray-700">Dolor × Confianza = Decisión</p>
          </div>
        </div>
        <div className="mt-4 bg-blue-100 p-4 rounded-lg text-center">
          <p className="text-gray-800">
            <strong>Ahora vamos a usar todo eso para construir ofertas que vendan solas.</strong>
          </p>
        </div>
      </div>

      {/* La Brecha A → B */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🔧 La Brecha que Tu Oferta Debe Cerrar
        </h2>

        <div className="bg-white p-6 rounded-lg border-2 border-teal-300 mb-6">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-300">
              <p className="text-5xl mb-2">😰</p>
              <p className="font-bold text-gray-900 text-lg mb-2">PUNTO A</p>
              <p className="text-sm text-gray-700">Un lugar incómodo, doloroso, frustrante</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg">
                <p className="font-bold text-lg">🌉 TU OFERTA</p>
                <p className="text-xs mt-1">El puente más directo, claro, seguro y atractivo</p>
              </div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-300">
              <p className="text-5xl mb-2">🎯</p>
              <p className="font-bold text-gray-900 text-lg mb-2">PUNTO B</p>
              <p className="text-sm text-gray-700">Su meta, su deseo, su estado ideal</p>
            </div>
          </div>
        </div>

        <div className="bg-teal-100 p-5 rounded-lg border-l-4 border-teal-600 mb-4">
          <p className="font-bold text-gray-900 mb-3">💡 Tu tarea como emprendedor:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Hacer que sientan el dolor de estar en A</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>Hacer que deseen intensamente llegar a B</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Mostrar que tu oferta es el único puente que vale la pena cruzar</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-5 rounded-lg text-center">
          <p className="text-lg font-bold">
            La venta no sucede en el producto.
          </p>
          <p className="text-xl font-bold mt-2">
            Sucede en la historia que le contás sobre cómo va a pasar de A a B gracias a vos.
          </p>
        </div>
      </div>

      {/* Qué es y qué no es una Oferta */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎯 Qué Es (y Qué No Es) una Oferta
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-yellow-300 mb-6">
          <p className="text-lg text-gray-800 mb-3">
            Muchas personas confunden "producto" con "oferta". Y ahí es donde sus ventas se estancan.
          </p>
          <p className="text-center text-yellow-700 font-bold">
            Tu producto es lo que hacés. Tu oferta es cómo lo presentás para que sea imposible decir que no.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
            <h3 className="font-bold text-red-700 mb-3 text-center">❌ Una oferta NO es:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Tu producto</li>
              <li>• Un descuento tentador</li>
              <li>• Una garantía extensa</li>
              <li>• Un precio "razonable"</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3 italic">
              Eso son solo componentes. Pero no hacen una oferta poderosa por sí solos.
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
            <h3 className="font-bold text-green-700 mb-3 text-center">✅ Una oferta SÍ es:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Cómo posicionás tu solución como única</li>
              <li>• Cómo la conectás con el dolor real del cliente</li>
              <li>• Cómo mostrás que no hay mejor momento que ahora</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3 italic">
              🔍 El producto es la herramienta. La oferta es la historia que hace que quieran usarla.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-5 rounded-lg text-center">
          <p className="text-xl font-bold">
            🎯 Cuando tu oferta es fuerte, la venta fluye.
          </p>
          <p className="mt-2">
            Cuando es débil, la venta se fuerza.
          </p>
        </div>
      </div>

      {/* Los 7 Pilares */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🏛️ Los 7 Pilares de una Oferta Irresistible
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-indigo-300 mb-6">
          <p className="text-lg text-gray-800">
            Una buena oferta no se improvisa, se construye como una casa firme: paso a paso, con estrategia.
          </p>
          <p className="text-red-600 font-bold text-center mt-3">
            Si te falta uno de estos pilares… la gente duda, se va o simplemente no compra.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {sietePilares.map((pilar) => (
            <label
              key={pilar.id}
              className="flex items-start gap-4 p-5 bg-white rounded-lg border-2 border-indigo-200 cursor-pointer hover:border-indigo-400 transition-all"
            >
              <input
                type="checkbox"
                checked={pilaresChecked[pilar.id] || false}
                onChange={() => togglePilar(pilar.id)}
                className="mt-1 w-5 h-5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{pilar.emoji}</span>
                  <h3 className="text-lg font-bold text-gray-900">{pilar.nombre}</h3>
                </div>
                <p className="text-sm text-gray-700">{pilar.descripcion}</p>
              </div>
            </label>
          ))}
        </div>

        {calcularProgresoPilares() > 0 && (
          <div className="bg-indigo-100 p-5 rounded-lg border-2 border-indigo-300">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-gray-900">Fortaleza de tu Oferta:</p>
              <p className="text-3xl font-bold text-indigo-700">{calcularProgresoPilares()}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all flex items-center justify-end pr-2"
                style={{ width: `${calcularProgresoPilares()}%` }}
              >
                {calcularProgresoPilares() > 20 && (
                  <span className="text-white text-xs font-bold">{calcularProgresoPilares()}%</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700 text-center">
              {calcularProgresoPilares() < 50 ? '⚠️ Tu oferta necesita más trabajo' :
               calcularProgresoPilares() < 85 ? '👍 Vas bien, pero podés mejorar' :
               '🔥 ¡Oferta sólida! Estás listo para vender'}
            </p>
          </div>
        )}

        <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-lg text-center">
          <p className="text-xl font-bold">
            🧲 Una oferta irresistible no necesita perseguir a nadie.
          </p>
          <p className="mt-2">
            Atrae sola, genera confianza y convierte con naturalidad.
          </p>
        </div>
      </div>

      {/* Errores Letales */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-xl border-2 border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">
          🚫 Los Errores que Matan Ofertas
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Podés tener un gran producto, pero si caés en estos errores, tu oferta va a pasar desapercibida.
        </p>

        <div className="space-y-4">
          {erroresLetales.map((item, idx) => (
            <div key={idx} className="bg-gray-700 p-5 rounded-lg border-2 border-gray-600">
              <div className="flex items-start gap-4">
                <div className="text-4xl">❌</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-red-400 mb-2">
                    {item.error} → {item.consecuencia}
                  </h3>
                  <div className="bg-green-900/30 p-3 rounded border-l-4 border-green-500">
                    <p className="text-sm text-white">{item.solucion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-red-900/50 p-5 rounded-lg border-2 border-red-500 text-center">
          <p className="text-xl font-bold">
            Evitá estos errores, y ya estarás varios pasos adelante del 90% del mercado.
          </p>
        </div>
      </div>

      {/* Producto vs Oferta */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎁 Producto y Oferta: Una Relación Invertida
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-blue-300 mb-4">
          <p className="text-lg text-gray-800 mb-3">
            <strong>Primero diseñás la oferta:</strong> lo que prometés y cómo vas a ayudar.
          </p>
          <p className="text-lg text-gray-800">
            <strong>Después creás el producto</strong> para cumplir esa promesa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300 text-center">
            <p className="text-4xl mb-3">❌</p>
            <p className="text-gray-700">Vendés lo que ya tenés</p>
          </div>
          <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300 text-center">
            <p className="text-4xl mb-3">✅</p>
            <p className="text-gray-700">Creás lo que la gente necesita y quiere comprar</p>
          </div>
        </div>

        <div className="bg-blue-100 p-5 rounded-lg border-l-4 border-blue-600">
          <p className="text-gray-800 text-center">
            🔦 <strong>La oferta es el faro que guía.</strong><br/>
            🚢 <strong>El producto es el barco que lleva hasta ahí.</strong>
          </p>
          <p className="text-center text-gray-700 mt-3 font-bold">
            Hacerlo al revés es construir barcos sin rumbo.
          </p>
        </div>
      </div>

      {/* Filosofía de Precios */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border-2 border-amber-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          💵 Filosofía de Precios de Alto Valor
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-amber-300 mb-6">
          <p className="text-lg text-gray-800 mb-3">
            Muchos creen que para vender más, hay que ser más barato.
          </p>
          <p className="text-2xl font-bold text-red-600 text-center mb-3">Error.</p>
          <p className="text-gray-700 text-center">
            La gente no busca "lo más barato". Busca lo que más vale por lo que paga.
          </p>
        </div>

        <div className="bg-amber-100 p-5 rounded-lg border-l-4 border-amber-600 mb-4">
          <h3 className="font-bold text-gray-900 mb-3">🧠 Tres verdades clave:</h3>
          <div className="space-y-3 text-gray-700">
            <p><strong>1. El precio no solo cobra. También comunica.</strong> Si es muy bajo, genera desconfianza. Si está bien posicionado, transmite calidad.</p>
            <p><strong>2. No sigas el promedio del mercado.</strong> Vos no estás compitiendo por ser "uno más". Estás compitiendo por ser el mejor en la mente de tu cliente ideal.</p>
            <p><strong>3. Lo caro se respeta. Lo barato se justifica.</strong> Y justificar mata ventas.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-5 rounded-lg text-center">
          <p className="text-xl font-bold">
            🎯 Vendé por valor, no por miedo a perder la venta.
          </p>
          <p className="mt-2">
            Porque cuando tu oferta es fuerte, el precio se defiende solo.
          </p>
        </div>
      </div>

      {/* La Sintonía de la Resonancia */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border-2 border-pink-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          📻 La Sintonía de la Resonancia
        </h2>

        <div className="bg-white p-6 rounded-lg border-2 border-pink-300 mb-6">
          <div className="text-center mb-4">
            <span className="text-6xl">📻</span>
          </div>
          <p className="text-lg text-gray-800 mb-4">
            Una gran oferta no solo se escucha, se siente. Es como sintonizar una radio en la frecuencia exacta del cliente.
          </p>
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-5 rounded-lg">
            <p className="text-center text-gray-800">
              Cuando hablás con las emociones que no dicen en voz alta —pero que los mueven por dentro— se genera algo mágico: <strong className="text-pink-700">resonás con ellos.</strong>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 rounded-lg text-center">
          <p className="text-xl font-bold mb-3">
            🎯 Cuando lográs eso, te volvés su estación favorita.
          </p>
          <p className="text-lg">
            Ya no quieren escuchar a nadie más.
          </p>
          <p className="text-sm mt-4 text-pink-100">
            La clave no es decir lo correcto… Es decir lo que ellos ya sienten, pero no saben cómo expresar.
          </p>
        </div>
      </div>

      {/* El Efecto Multiplicador */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          💥 El Efecto Multiplicador de una Gran Oferta
        </h2>

        <div className="bg-white p-5 rounded-lg border-2 border-green-300 mb-6">
          <p className="text-lg text-gray-800 mb-3">
            Una gran oferta no solo mejora tus ventas. Transforma todo tu negocio.
          </p>
          <p className="text-center text-green-700 font-bold">
            Es como agregarle turbinas a tu estrategia: hacés menos esfuerzo, y llegás mucho más lejos, más rápido.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Atrae más personas
            </h3>
            <p className="text-sm text-gray-700">
              Porque habla con las palabras exactas que tu cliente usa y siente. Se sienten entendidos.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Convierte más rápido
            </h3>
            <p className="text-sm text-gray-700">
              Porque elimina dudas, miedos y complicaciones. Todo se ve simple, seguro y claro.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Retiene por más tiempo
            </h3>
            <p className="text-sm text-gray-700">
              Porque entrega lo que promete. Las personas confían y quieren seguir.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border-2 border-green-200">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Te deja cobrar más
            </h3>
            <p className="text-sm text-gray-700">
              Porque el valor que perciben es tan alto, que el precio parece barato en comparación.
            </p>
          </div>
        </div>

        <div className="bg-green-100 p-5 rounded-lg border-l-4 border-green-600 mb-4">
          <p className="font-bold text-gray-900 mb-2">📈 Apalancamiento Asimétrico:</p>
          <p className="text-gray-700">
            Invertís poco tiempo en crearla… y te devuelve resultados enormes, repetibles y escalables.
            Es como construir una llave maestra: la usás una vez y abre muchas puertas sin esfuerzo adicional.
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-5 rounded-lg text-center">
          <p className="text-lg font-bold">
            Una gran oferta no te pide más tiempo ni más anuncios.
          </p>
          <p className="text-xl font-bold mt-2">
            Multiplica lo que ya tenés.
          </p>
        </div>
      </div>

      {/* BONUS: Prompt para IA */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600" />
          🔓 BONUS: Prompt para Crear tu Oferta con IA
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Primero, escribí tu nicho o cliente ideal:
          </label>
          <input
            type="text"
            value={nichoInput}
            onChange={(e) => setNichoInput(e.target.value)}
            placeholder="Ej: coaches de vida que recién empiezan"
            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
          />
        </div>

        {nichoInput.trim().length > 3 && (
          <>
            <button
              onClick={() => setShowPrompts(!showPrompts)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all mb-4"
            >
              {showPrompts ? '🔒 Ocultar Prompt' : '🔓 Ver Prompt Personalizado'}
            </button>

            {showPrompts && (
              <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Tu Prompt Personalizado:</h3>
                  <button
                    onClick={copyPrompt}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded transition-all"
                  >
                    {selectedPrompt === 1 ? '✓ Copiado' : '📋 Copiar'}
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded border-2 border-gray-200">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">
                    {`Quiero que me ayudes a crear una oferta irresistible para [${nichoInput}]. Necesito que incluya: 
- Una promesa transformadora clara,
- Un ángulo único que me diferencie de mi competencia,
- Una justificación lógica del valor,
- Una garantía sólida o red de seguridad,
- Una razón para actuar ahora.
También quiero que hables con el tono y lenguaje que usa ese cliente cuando expresa su dolor y su deseo. Quiero que se sienta comprendido y urgido a tomar acción. Dame varias opciones si es posible.`}
                  </p>
                </div>
                <div className="mt-4 bg-purple-100 p-4 rounded-lg border-2 border-purple-400">
                  <p className="text-sm text-purple-800">
                    <strong>💡 Cómo usar:</strong> Copiá este prompt, pegalo en ChatGPT o Claude, 
                    y usá las respuestas para crear una oferta que resuene profundamente con tu audiencia.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Conclusión Final */}
      <div className="bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-xl border-2 border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">
          📌 Conclusión Final: La Oferta Gana el Juego
        </h2>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-xl leading-relaxed mb-4">
              Una oferta poderosa no es casualidad. Es estrategia, empatía y precisión quirúrgica.
            </p>
            <p className="text-lg text-gray-300">
              Convertí tu producto en el vehículo más confiable para cruzar la brecha entre el dolor de tu cliente y su meta soñada.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-6 rounded-lg text-center">
            <p className="text-2xl font-bold mb-3">
              Y recordá siempre:
            </p>
            <p className="text-3xl font-bold">
              El que tiene la mejor oferta, no solo gana ventas… gana el mercado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-5 rounded-lg border-2 border-green-500">
              <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-bold text-lg mb-2">Lo que dominás ahora:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>✅ La psicología completa de compra</li>
                <li>✅ Los 7 pilares de una oferta</li>
                <li>✅ Cómo evitar los errores letales</li>
                <li>✅ La relación producto-oferta</li>
                <li>✅ Filosofía de precios de alto valor</li>
                <li>✅ El efecto multiplicador</li>
              </ul>
            </div>

            <div className="bg-white/5 p-5 rounded-lg border-2 border-orange-500">
              <Target className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="font-bold text-lg mb-2">Tu plan de acción:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>🎯 Aplicá los 7 pilares a tu oferta</li>
                <li>🎯 Usá el prompt de IA para versiones</li>
                <li>🎯 Testeá con 5-10 clientes reales</li>
                <li>🎯 Refiná según feedback</li>
                <li>🎯 Aumentá precio conforme crece valor</li>
                <li>🎯 Documenta qué funciona mejor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Transición al siguiente módulo */}
      <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 text-center">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          ✅ Ya tenés tu nicho, tu oferta irresistible y la psicología dominada...
        </p>
        <p className="text-xl text-gray-700 mb-4">
          Ahora es momento de volverse ultra productivo para ejecutar sin dispersión.
        </p>
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold">
          Siguiente: Productividad sin Límites →
        </div>
      </div>
    </div>
  );
};

export const ofertasIIConstruccionMetadata = {
  id: 6,
  title: "Ofertas II - Construcción y Ejecución",
  type: "document" as const,
  duration: "25 min"
};