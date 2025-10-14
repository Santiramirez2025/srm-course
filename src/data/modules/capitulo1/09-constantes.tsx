import React, { useState } from 'react';

export const ConstantesContent = () => {
  const [nicho, setNicho] = useState('');
  const [problema, setProblema] = useState('');
  const [solucion, setSolucion] = useState('');
  const [tiempo, setTiempo] = useState('6');
  const [commitment, setCommitment] = useState(false);
  const [showManifest, setShowManifest] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const ejemplosNicho = [
    { malo: 'Ayudo a emprendedores', bueno: 'Ayudo a dentistas que quieren más pacientes privados' },
    { malo: 'Trabajo con empresas', bueno: 'Trabajo con restaurantes que luchan por llenar mesas' }
  ];

  const ejemplosProblema = [
    { persona: 'Esteticista frustrada', situacion: 'Sube contenido todos los días, tiene 2,000 seguidores', problema: 'No convierte seguidores en clientes' },
    { persona: 'Coach sin ventas', situacion: 'Tiene 5,000 seguidores, hace lives inspiradores', problema: 'No sabe cómo vender sin parecer desesperado' },
    { persona: 'Nutricionista que regala consultas', situacion: 'Le escriben 10 personas, responde todo gratis', problema: 'No sabe cómo cobrar por su conocimiento' }
  ];

  const isComplete = nicho.trim() && problema.trim() && solucion.trim() && tiempo;

  const handleCommit = () => {
    if (isComplete && !commitment) {
      setCommitment(true);
      setShowManifest(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🎯 CONSTANTES
        </h1>
        <p className="text-2xl text-indigo-600 font-medium">
          El Éxito - La suma de decisiones constantes
        </p>
      </div>

      {/* Intro potente */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl text-center">
        <p className="text-3xl font-bold mb-4">
          El éxito no es casualidad.
        </p>
        <p className="text-xl">
          Es la suma de <strong className="text-yellow-300">decisiones constantes.</strong>
        </p>
      </div>

      {/* CONSTANTE 1: Nicho */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">👥</span>
          CONSTANTE 1: Tu Nicho
        </h2>
        
        <p className="text-xl text-gray-800 font-medium mb-6">
          ¿A quién vas a dedicarle tu vida?
        </p>

        <div className="bg-white p-5 rounded-lg border-l-4 border-blue-500 mb-6">
          <p className="text-lg text-gray-700 mb-4">
            Tu nicho no es solo tu mercado. <strong className="text-blue-600">Es tu tribu.</strong>
          </p>
          <p className="text-gray-700 mb-3">Vas a pasar años:</p>
          <div className="space-y-2 text-gray-700">
            <p>• Entendiendo sus problemas</p>
            <p>• Hablando su idioma</p>
            <p>• Diseñando soluciones para ellos</p>
            <p>• Construyendo relaciones con ellos</p>
          </div>
        </div>

        <div className="bg-purple-100 p-5 rounded-lg border-2 border-purple-300 mb-6">
          <p className="text-lg font-bold text-purple-800 mb-3">🎯 La pregunta clave:</p>
          <p className="text-xl text-gray-800 italic">
            "¿Con qué grupo de personas podría pasar los próximos 3 años sin aburrirme?"
          </p>
        </div>

        {/* Ejemplos buenos vs malos */}
        <div className="space-y-3 mb-6">
          {ejemplosNicho.map((ej, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                <p className="text-sm font-bold text-red-600 mb-2">❌ Malo:</p>
                <p className="text-gray-700">"{ej.malo}"</p>
                <p className="text-xs text-gray-600 mt-1 italic">(muy amplio/vago)</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                <p className="text-sm font-bold text-green-600 mb-2">✅ Bueno:</p>
                <p className="text-gray-700">"{ej.bueno}"</p>
                <p className="text-xs text-gray-600 mt-1 italic">(específico y claro)</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-5 rounded-lg">
          <p className="font-bold text-gray-900 mb-3">Tu nicho debe:</p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700"><strong>Inspirarte</strong> (que te emocione ayudarlos)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700"><strong>Retarte</strong> (problemas interesantes)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700"><strong>Moverte</strong> (que marcás diferencia)</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONSTANTE 2: Problema */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">❗</span>
          CONSTANTE 2: El Problema Real
        </h2>
        
        <p className="text-xl text-gray-800 font-medium mb-6">
          ¿Qué dolor concreto vas a resolver?
        </p>

        <div className="bg-white p-5 rounded-lg border-l-4 border-orange-500 mb-6">
          <p className="text-lg text-gray-700 mb-3">
            Aquí está la clave: <strong className="text-orange-600">No se trata de lo que VOS sabés hacer.</strong>
          </p>
          <p className="text-lg text-gray-700">
            Se trata de lo que <strong>ELLOS no pueden resolver solos.</strong>
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-orange-100 p-5 rounded-lg border-2 border-red-300 mb-6">
          <p className="text-lg font-bold text-gray-900 text-center">
            El mejor negocio nace cuando alguien grita: <br/>
            <span className="text-xl text-red-600">"¡Necesito ayuda con esto y no sé a quién acudir!"</span>
          </p>
        </div>

        {/* Ejemplos reales */}
        <div className="space-y-4 mb-6">
          <p className="font-bold text-gray-900">📌 Ejemplos reales:</p>
          {ejemplosProblema.map((ej, index) => (
            <div key={index} className="bg-white p-5 rounded-lg border-2 border-orange-200">
              <p className="font-bold text-orange-700 mb-2">{index + 1}. {ej.persona}</p>
              <p className="text-sm text-gray-600 mb-2">{ej.situacion}</p>
              <p className="text-gray-900">
                <strong>Su problema:</strong> <span className="text-red-600">{ej.problema}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="bg-orange-100 p-5 rounded-lg border-2 border-orange-300">
          <p className="font-bold text-gray-900 mb-3">🎯 La fórmula para encontrar TU problema:</p>
          <p className="text-gray-800 italic">
            "Mi cliente ideal no puede <span className="text-orange-600 font-bold">________</span>, 
            y eso le hace sentir <span className="text-orange-600 font-bold">________</span>. 
            Yo puedo ayudarlo a <span className="text-orange-600 font-bold">________</span>."
          </p>
        </div>
      </div>

      {/* CONSTANTE 3: Solución */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">💡</span>
          CONSTANTE 3: Tu Solución
        </h2>
        
        <p className="text-xl text-gray-800 font-medium mb-6">
          ¿Cuál es tu respuesta concreta?
        </p>

        <div className="bg-white p-5 rounded-lg border-l-4 border-green-500 mb-6">
          <p className="text-lg text-gray-700">
            Tu solución debe ser como una <strong className="text-green-600">llave que abre la puerta</strong> del 
            problema específico de tu nicho.
          </p>
        </div>

        <div className="bg-green-100 p-5 rounded-lg border-2 border-green-300 mb-6">
          <p className="font-bold text-gray-900 mb-3">Una buena solución tiene 5 características:</p>
          <div className="space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700"><strong>Funciona</strong> (resuelve el problema real)</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700"><strong>Es accesible</strong> (no cuesta una fortuna implementar)</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700"><strong>Es rápida</strong> (da resultados en tiempo razonable)</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700"><strong>Es simple</strong> (fácil de ejecutar)</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-gray-700"><strong>Es repetible</strong> (puedes usarla con otros clientes)</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-green-200">
          <p className="font-bold text-gray-900 mb-3">📌 Ejemplos de soluciones efectivas:</p>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-green-700">Para la esteticista:</p>
              <p className="text-sm text-gray-700">Un sistema de 5 pasos para convertir seguidores en clientes que paguen</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">Para el coach:</p>
              <p className="text-sm text-gray-700">Una estrategia de ventas consultivas para vender programas sin parecer vendedor</p>
            </div>
            <div>
              <p className="font-semibold text-green-700">Para el nutricionista:</p>
              <p className="text-sm text-gray-700">Un método para cobrar consultas desde el primer mensaje</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONSTANTE 4: Tiempo */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">⏳</span>
          CONSTANTE 4: El Tiempo
        </h2>
        
        <p className="text-xl text-gray-800 font-medium mb-6">
          El ingrediente que nadie ve, pero lo cambia todo
        </p>

        <div className="bg-white p-5 rounded-lg border-l-4 border-purple-500 mb-6">
          <p className="text-lg text-gray-700 mb-4">
            Podés tener el nicho perfecto, el problema ideal y la solución genial.
          </p>
          <p className="text-xl font-bold text-purple-600">
            Pero sin tiempo constante, todo se diluye.
          </p>
        </div>

        <div className="bg-purple-100 p-5 rounded-lg border-2 border-purple-300 mb-6">
          <p className="font-bold text-gray-900 mb-3">Tiempo no es solo paciencia. Es:</p>
          <div className="space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-purple-600">→</span>
              <span className="text-gray-700"><strong>Persistencia enfocada</strong> (seguir aunque no veas resultados inmediatos)</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-600">→</span>
              <span className="text-gray-700"><strong>Compromiso diario</strong> (trabajar en esto incluso cuando no tenés ganas)</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-600">→</span>
              <span className="text-gray-700"><strong>Visión a largo plazo</strong> (saber que los resultados grandes toman tiempo)</span>
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-5 rounded-lg border-2 border-purple-300">
          <p className="font-bold text-gray-900 mb-3">📅 La realidad del tiempo:</p>
          <div className="space-y-2 text-gray-700">
            <p><strong>Mes 1-3:</strong> Aprendés y ajustás</p>
            <p><strong>Mes 4-6:</strong> Empezás a ver primeros resultados</p>
            <p><strong>Mes 7-12:</strong> Los resultados se vuelven consistentes</p>
            <p><strong>Año 2+:</strong> Los resultados se vuelven exponenciales</p>
          </div>
        </div>
      </div>

      {/* EJERCICIO FINAL - Define tus constantes */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🔥</span>
          Define Tus Constantes AHORA
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 font-medium">
          Pará de leer y completá esto <strong className="text-indigo-600">HOY:</strong>
        </p>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border-2 border-blue-300">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              👥 Mi Nicho:
            </label>
            <p className="text-sm text-gray-600 mb-2">Ayudo específicamente a:</p>
            <input
              type="text"
              value={nicho}
              onChange={(e) => setNicho(e.target.value)}
              placeholder="Ej: Dentistas que quieren más pacientes privados"
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-orange-300">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              ❗ Su Problema Principal:
            </label>
            <p className="text-sm text-gray-600 mb-2">Su mayor frustración es:</p>
            <input
              type="text"
              value={problema}
              onChange={(e) => setProblema(e.target.value)}
              placeholder="Ej: No saben cómo conseguir pacientes que paguen sin descuentos"
              className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none"
            />
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-green-300">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              💡 Mi Solución:
            </label>
            <p className="text-sm text-gray-600 mb-2">Yo los ayudo a:</p>
            <input
              type="text"
              value={solucion}
              onChange={(e) => setSolucion(e.target.value)}
              placeholder="Ej: Crear un sistema de marketing que atrae pacientes privados de alto valor"
              className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-400 focus:outline-none"
            />
          </div>

          <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              ⏳ Mi Compromiso de Tiempo:
            </label>
            <p className="text-sm text-gray-600 mb-2">Voy a trabajar en esto consistentemente durante:</p>
            <select
              value={tiempo}
              onChange={(e) => setTiempo(e.target.value)}
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none"
            >
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>
        </div>

        {isComplete && !commitment && (
          <button
            onClick={handleCommit}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg text-xl"
          >
            🚀 Hacer mi compromiso
          </button>
        )}
      </div>

      {/* La Decisión Final */}
      {isComplete && (
        <div className="bg-gray-900 text-white p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">⚔️ La Decisión Final</h2>
          
          <p className="text-xl text-center mb-8">
            Llegaste hasta aquí. Ahora tenés dos opciones:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-900/30 border-2 border-red-500/50 p-6 rounded-lg">
              <p className="text-xl font-bold text-red-400 mb-4">OPCIÓN 1: Seguir Improvisando</p>
              <div className="space-y-2 text-gray-300">
                <p>• Volver a tu rutina normal</p>
                <p>• Seguir probando cosas al azar</p>
                <p>• Cambiar de enfoque cada mes</p>
                <p>• Seguir igual dentro de un año</p>
              </div>
            </div>

            <div className="bg-green-900/30 border-2 border-green-500/50 p-6 rounded-lg">
              <p className="text-xl font-bold text-green-400 mb-4">OPCIÓN 2: Construir con Constantes</p>
              <div className="space-y-2 text-gray-300">
                <p>• Definir tus 4 constantes HOY</p>
                <p>• Comprometerte por al menos {tiempo} meses</p>
                <p>• Trabajar de forma enfocada y sistemática</p>
                <p>• Tener resultados reales dentro de un año</p>
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-center mt-8 text-yellow-300">
            ¿Cuál elegís?
          </p>
        </div>
      )}

      {/* Manifiesto de compromiso */}
      {showManifest && commitment && (
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white p-10 rounded-xl text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">🏆 El Compromiso Final</h2>
          
          <div className="bg-white/10 backdrop-blur p-8 rounded-lg max-w-3xl mx-auto">
            <p className="text-2xl font-bold mb-6">Tu Promesa:</p>
            <p className="text-xl leading-relaxed italic mb-6">
              "Me comprometo a definir mis constantes hoy, y a trabajar con ellas durante los próximos {tiempo} meses 
              sin cambiar de rumbo."
            </p>
            
            <div className="bg-white/20 p-6 rounded-lg">
              <p className="font-bold mb-3">📋 Tus Constantes:</p>
              <div className="space-y-2 text-lg text-left">
                <p><strong>Nicho:</strong> {nicho}</p>
                <p><strong>Problema:</strong> {problema}</p>
                <p><strong>Solución:</strong> {solucion}</p>
                <p><strong>Tiempo:</strong> {tiempo} meses</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xl mb-4">
              Si no podés hacer esta promesa, no estás listo.
            </p>
            <p className="text-2xl font-bold text-yellow-300">
              Si SÍ podés hacerla... entonces estás a punto de cambiar todo.
            </p>
          </div>
        </div>
      )}

      {/* La Verdad Final */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">🎯 La Verdad Final</h2>
        <div className="space-y-6 text-xl leading-relaxed max-w-3xl mx-auto">
          <p className="text-3xl font-bold">
            El éxito no es casualidad.
          </p>
          <p className="text-2xl">
            Es la suma de <strong className="text-yellow-300">decisiones constantes.</strong>
          </p>
          <p className="text-xl">
            Las constantes que definas hoy van a determinar dónde estés el próximo año.
          </p>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg mt-8">
            <p className="text-2xl font-bold mb-4">¿Qué vas a elegir?</p>
            <p className="text-xl">
              ¿Improvisación... o construcción?
            </p>
          </div>
          <div className="mt-8">
            <p className="text-2xl font-bold mb-2">El momento es ahora.</p>
            <p className="text-2xl font-bold mb-2">La decisión es tuya.</p>
            <p className="text-xl text-gray-200">Como siempre lo ha sido.</p>
          </div>
        </div>
      </div>

      {/* Cierre épico */}
      <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-6">🚀 Tu Nuevo Comienzo</h2>
        <div className="space-y-4 text-lg max-w-2xl mx-auto">
          <p>Este no es el final del curso.</p>
          <p className="text-xl font-bold text-yellow-300">Es el inicio de tu transformación.</p>
          <div className="bg-white/10 p-6 rounded-lg mt-6 space-y-3">
            <p>Ya no eres alguien que busca respuestas.</p>
            <p><strong className="text-green-400">Eres alguien que construye soluciones.</strong></p>
            <p>Ya no improvisas.</p>
            <p><strong className="text-blue-400">Trabajas con constantes.</strong></p>
            <p>Ya no esperas que las cosas pasen.</p>
            <p><strong className="text-purple-400">Haces que las cosas pasen.</strong></p>
          </div>
          <p className="text-2xl font-bold mt-8 text-yellow-300">
            Tu futuro está esperando del otro lado de estas 4 constantes.
          </p>
          <p className="text-xl mt-6">
            Define. Compromete. Construye.
          </p>
          <p className="text-2xl font-bold text-red-400 mt-6">
            Es hora de dejar de ser espectador de tu propia vida.
          </p>
        </div>
      </div>

      {/* BONUS PROMPT FINAL */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6 rounded-xl border-2 border-amber-300">
        <h3 className="text-2xl font-bold mb-4 text-amber-700 flex items-center gap-2">
          <span className="text-3xl">🔓</span>
          BONUS FINAL: Descubrí tu Nicho Ideal
        </h3>
        <p className="text-gray-700 mb-4">
          Si aún no tenés claridad total sobre tu nicho, usá este prompt poderoso en ChatGPT o Claude 
          para que te guíe con preguntas estratégicas:
        </p>
        <div className="bg-white p-5 rounded-lg border-2 border-amber-400 shadow-md">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {`🎯 Actuá como un mentor experto en estrategia de negocios, desarrollo personal y posicionamiento digital.

Tu tarea es ayudarme a descubrir mi NICHO IDEAL de trabajo o negocio, combinando tres factores clave:

1. Lo que me apasiona (intereses y temas que disfruto profundamente)
2. Lo que sé hacer o puedo aprender rápido (habilidades, talentos, conocimientos)
3. Lo que el mercado realmente necesita y por lo que la gente está dispuesta a pagar

Quiero que me hagas preguntas poderosas para identificar:
- Mis temas o actividades con las que más disfruto ayudar a otros
- Los problemas o dolores que más me interesa resolver
- El tipo de personas con las que más me gustaría trabajar
- Ejemplos concretos de oportunidades de mercado alineadas con mi perfil

Al final, mostrame:
✅ 3 posibles nichos bien definidos
✅ Para cada nicho: el tipo de cliente ideal, problema que resuelve y oferta potencial que podría crear
✅ Una breve reflexión sobre cuál parece más alineado con mi propósito y mis fortalezas

Empecemos.`}
          </p>
        </div>
        <button 
          onClick={() => {
            const promptText = `🎯 Actuá como un mentor experto en estrategia de negocios, desarrollo personal y posicionamiento digital.

Tu tarea es ayudarme a descubrir mi NICHO IDEAL de trabajo o negocio, combinando tres factores clave:

1. Lo que me apasiona (intereses y temas que disfruto profundamente)
2. Lo que sé hacer o puedo aprender rápido (habilidades, talentos, conocimientos)
3. Lo que el mercado realmente necesita y por lo que la gente está dispuesta a pagar

Quiero que me hagas preguntas poderosas para identificar:
- Mis temas o actividades con las que más disfruto ayudar a otros
- Los problemas o dolores que más me interesa resolver
- El tipo de personas con las que más me gustaría trabajar
- Ejemplos concretos de oportunidades de mercado alineadas con mi perfil

Al final, mostrame:
✅ 3 posibles nichos bien definidos
✅ Para cada nicho: el tipo de cliente ideal, problema que resuelve y oferta potencial que podría crear
✅ Una breve reflexión sobre cuál parece más alineado con mi propósito y mis fortalezas

Empecemos.`;
            navigator.clipboard.writeText(promptText);
            setCopiedPrompt(true);
            setTimeout(() => setCopiedPrompt(false), 2000);
          }}
          className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {copiedPrompt ? (
            <>
              <span className="text-xl">✓</span>
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <span className="text-xl">📋</span>
              <span>Copiar prompt de descubrimiento de nicho</span>
            </>
          )}
        </button>
        
        <div className="mt-6 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-400 p-4 rounded-lg">
          <p className="text-sm text-gray-800 flex items-start gap-2">
            <span className="text-xl">💡</span>
            <span>
              <strong>Pro tip:</strong> Este prompt te hará preguntas estratégicas para descubrir tu nicho ideal 
              combinando pasión, habilidades y necesidades del mercado. La IA te guiará paso a paso y te dará 
              3 opciones concretas de nicho con todo detallado. Perfecto si todavía estás explorando opciones.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const constantesMetadata = {
  id: 9,
  title: "Constantes - El Éxito",
  type: "document" as const,
  duration: "30 min"
};