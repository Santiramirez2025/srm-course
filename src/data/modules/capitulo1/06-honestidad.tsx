import React, { useState } from 'react';

export const HonestidadContent = () => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [burningItems, setBurningItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [letterContent, setLetterContent] = useState('');
  const [showLetter, setShowLetter] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const layers = [
    { id: 1, title: 'Tus excusas', icon: '🎭', description: 'Las historias que te contás para no actuar' },
    { id: 2, title: 'Tus autoengaños', icon: '🤥', description: 'Las verdades que evitás ver' },
    { id: 3, title: 'Tu dependencia de aplausos', icon: '👏', description: 'Vivir para validación externa' },
    { id: 4, title: 'Tu adicción a la comodidad', icon: '🛋️', description: 'Elegir lo fácil sobre lo necesario' },
    { id: 5, title: 'Tu tolerancia al "más o menos"', icon: '😐', description: 'Conformarte con la mediocridad' }
  ];

  const addBurningItem = () => {
    if (newItem.trim()) {
      setBurningItems([...burningItems, newItem]);
      setNewItem('');
    }
  };

  const removeBurningItem = (index: number) => {
    setBurningItems(burningItems.filter((_, i) => i !== index));
  };

  const copyPrompt = () => {
    const prompt = `🔥 Imaginá que ya pasaste por todo lo difícil. Lo lograste. Cambiaste. Ahora, desde ese "nuevo yo" que superó el fuego, escribile una carta sincera y directa a tu "yo de hoy".

Contale:
• Qué dejaste atrás
• Qué verdades duras enfrentaste
• En qué cambió tu vida, y por qué ya no sos el mismo

${burningItems.length > 0 ? `\nCosas que dejé atrás en el fuego:\n${burningItems.map(item => `- ${item}`).join('\n')}` : ''}

No te mientas. No lo disfraces. Escribí con coraje. Como alguien que estuvo en las llamas... y salió transformado.`;
    
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero con advertencia */}
      <div className="text-center py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-orange-900/20" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            🔥 Honestidad
          </h1>
          <p className="text-2xl text-red-600 font-medium">
            El fuego que quema lo que ya no sos
          </p>
        </div>
      </div>

      {/* Advertencia brutal */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🧨</span>
          La verdadera prueba
        </h2>
        <div className="space-y-4">
          <p className="text-xl text-gray-800 leading-relaxed font-medium">
            No estás ante un texto motivacional. <br/>
            <strong className="text-red-600">Estás ante una advertencia.</strong>
          </p>
          <div className="bg-white p-5 rounded-lg border-2 border-red-300">
            <p className="text-lg text-gray-700 mb-3">
              Si venís buscando una solución sin sudor, un empujoncito suave o una frase para pegar en la heladera...
            </p>
            <p className="text-2xl font-bold text-red-600 text-center">
              Salí de acá. Ahora.
            </p>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Esto no es solo avanzar, es una <strong>transformación profunda.</strong> Como un fuego que quema lo viejo 
            para que nazca algo nuevo. Una purga de lo que te está matando por dentro.
          </p>
        </div>
      </div>

      {/* Verdad dura */}
      <div className="bg-gray-900 text-white p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-2xl font-bold">
            La mayoría no fracasa por ignorancia.
          </p>
          <p className="text-3xl font-bold text-red-400">
            Fracasa porque no soporta el dolor que exige dejar de ser lo que ya no sirve.
          </p>
          <div className="bg-red-900/30 border-2 border-red-500/50 p-6 rounded-lg mt-6">
            <p className="text-xl mb-3">Porque crecer duele.</p>
            <p className="text-2xl font-bold text-yellow-300">
              El éxito no se conquista: se sobrevive.
            </p>
          </div>
        </div>
      </div>

      {/* El juicio */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">⚔️</span>
          El Juicio
        </h2>
        
        <div className="space-y-4">
          <p className="text-xl text-gray-800 font-medium">
            Un día algo dentro tuyo grita. <strong className="text-orange-600">Basta.</strong>
          </p>
          
          <div className="bg-white p-5 rounded-lg border-l-4 border-orange-500">
            <div className="space-y-2 text-lg text-gray-700">
              <p>Basta de fingir.</p>
              <p>Basta de aceptar menos.</p>
              <p>Basta de verte al espejo y no respetarte.</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            Ese grito no viene de afuera. No es tu jefe. No es tu familia. 
            <strong className="text-orange-600"> Sos vos... enfrentándote a vos.</strong>
          </p>

          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-lg border-2 border-orange-400">
            <p className="text-xl font-bold text-gray-900 mb-3 text-center">
              Y ahí empieza el juicio. Cruel. Implacable. Interno.
            </p>
            <p className="text-lg text-gray-800 text-center">
              Y frente a ese juicio, hay solo dos caminos:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-red-100 p-5 rounded-lg border-2 border-red-400 text-center">
              <div className="text-4xl mb-3">😵</div>
              <p className="font-bold text-red-700">Seguir vendiéndote excusas</p>
            </div>
            <div className="bg-orange-100 p-5 rounded-lg border-2 border-orange-400 text-center">
              <div className="text-4xl mb-3">🔥</div>
              <p className="font-bold text-orange-700">Entrar al fuego</p>
            </div>
          </div>
        </div>
      </div>

      {/* El fuego - Visual intenso */}
      <div className="bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 text-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center flex items-center justify-center gap-3">
          <span className="text-5xl">🔥</span>
          El Fuego
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-2xl font-bold text-center">
            El fuego no es una metáfora linda. Es crudo. Es real.
          </p>
          
          <div className="bg-black/30 backdrop-blur p-6 rounded-lg">
            <p className="text-xl leading-relaxed">
              Es el momento en que se acaban las distracciones, y te queda una sola cosa: 
              <strong className="text-yellow-300"> la verdad.</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
              <p className="text-lg font-medium">Te arranca las máscaras</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
              <p className="text-lg font-medium">Te enfrenta con lo que evitás</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg text-center">
              <p className="text-lg font-medium">Te deja sin escondites</p>
            </div>
          </div>

          <div className="bg-yellow-500/20 border-2 border-yellow-400/50 p-6 rounded-lg">
            <p className="text-xl text-center font-bold">
              No es para destruirte. <br/>
              Es para quebrarte... de lo que ya no sos. <br/>
              <span className="text-yellow-300">Para fundirte en algo nuevo.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Las Capas - INTERACTIVO */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🧱</span>
          Las Capas que arden
        </h2>
        
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Lo que arde no es tu cuerpo. Es tu ego. Es tu versión tibia. Es todo lo que te impide ser libre.
        </p>

        <div className="space-y-4 mb-6">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
              className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                selectedLayer === layer.id
                  ? 'bg-red-100 border-red-400 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-red-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{layer.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900">{layer.title}</p>
                    <p className="text-sm text-gray-600">{layer.description}</p>
                  </div>
                </div>
                <span className="text-2xl">{selectedLayer === layer.id ? '🔥' : '💨'}</span>
              </div>
              
              {selectedLayer === layer.id && (
                <div className="mt-4 bg-white p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="text-sm text-gray-700 italic">
                    Esta capa está ardiendo... Soltala. Dejala ir. Ya no te sirve.
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg border-2 border-orange-400">
          <p className="text-lg font-bold text-gray-900 mb-3 text-center">
            Una a una. Caen. Crujen.
          </p>
          <p className="text-xl text-orange-600 font-bold text-center">
            Y vos... quedás más liviano. Más limpio. Más real.
          </p>
        </div>
      </div>

      {/* Tu fuego personal - EJERCICIO */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">🔥</span>
          ¿Qué necesitás quemar hoy?
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Escribí aquello que estás listo para dejar en el fuego. Excusas, miedos, hábitos, creencias... 
          Todo lo que ya no te sirve.
        </p>

        <div className="bg-white p-5 rounded-lg border-2 border-purple-300 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addBurningItem()}
              placeholder="Ejemplo: Mi miedo al rechazo..."
              className="flex-1 p-3 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none"
            />
            <button
              onClick={addBurningItem}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all"
            >
              🔥 Quemar
            </button>
          </div>
        </div>

        {burningItems.length > 0 && (
          <div className="bg-gradient-to-br from-orange-100 to-red-100 p-5 rounded-lg border-2 border-orange-300">
            <p className="font-bold text-gray-900 mb-4">🔥 En el fuego:</p>
            <div className="space-y-2">
              {burningItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/50 p-3 rounded-lg group hover:bg-red-200 transition-all"
                >
                  <p className="text-gray-800 flex-1">{item}</p>
                  <button
                    onClick={() => removeBurningItem(index)}
                    className="text-red-600 hover:text-red-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center italic">
              {burningItems.length} {burningItems.length === 1 ? 'cosa' : 'cosas'} ardiendo. Soltá. Dejá ir.
            </p>
          </div>
        )}
      </div>

      {/* Alquimia */}
      <div className="bg-gray-900 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
          <span className="text-4xl">🧬</span>
          Alquimia
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xl text-center leading-relaxed">
            Ahí, en ese fuego brutal, si aguantás... ocurre la alquimia.
          </p>
          
          <p className="text-2xl font-bold text-center text-yellow-300">
            El fuego deja de ser castigo. Se vuelve forja.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <p className="font-bold text-yellow-300">Tu voluntad</p>
              <p className="text-sm text-gray-300">Templada</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="font-bold text-yellow-300">Tu enfoque</p>
              <p className="text-sm text-gray-300">Afilado</p>
            </div>
            <div className="bg-white/10 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">💎</div>
              <p className="font-bold text-yellow-300">Tu esencia</p>
              <p className="text-sm text-gray-300">Revelada</p>
            </div>
          </div>

          <div className="bg-red-900/30 border-2 border-red-500/50 p-6 rounded-lg">
            <div className="space-y-2 text-lg text-center">
              <p>No hay evolución sin duelo.</p>
              <p>No hay crecimiento sin caos.</p>
              <p className="text-xl font-bold text-red-400">No hay libertad sin primero... arder.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ¿Estás dispuesto? */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-4xl">🏹</span>
          ¿Estás dispuesto?
        </h2>
        
        <div className="space-y-6">
          <p className="text-xl text-gray-800 leading-relaxed">
            No importa si podés. <strong className="text-red-600">Importa si querés.</strong>
          </p>
          
          <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
            <p className="text-lg text-gray-700 mb-3">
              Si tenés las agallas para morir como quien fuiste... <br/>
              y nacer como quien estás destinado a ser.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-lg border-2 border-orange-400">
            <p className="text-lg text-gray-800 mb-3">
              No hay fórmula. No hay plan garantizado. Pero hay una verdad:
            </p>
            <p className="text-2xl font-bold text-center text-red-600">
              El que no huye del fuego, regresa transformado.
            </p>
          </div>

          <div className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-400">
            <p className="font-bold text-gray-900 mb-2">Y ese nuevo vos...</p>
            <div className="space-y-1 text-gray-700">
              <p>✓ Decide con claridad</p>
              <p>✓ Actúa con poder</p>
              <p>✓ Crea lo que antes solo soñaba</p>
            </div>
          </div>
        </div>
      </div>

      {/* No es un curso. Es un umbral */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-10 rounded-xl text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">🧾 No es un curso. Es un umbral.</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-2xl leading-relaxed">
            "Honestidad" no es un manual. <br/>
            <strong className="text-yellow-300">Es un espejo ardiente.</strong>
          </p>
          
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-xl mb-3">¿Vas a seguir obedeciendo a tu yo mediocre?</p>
            <p className="text-2xl font-bold text-yellow-300">
              ¿O vas a entrar al fuego... y salir irreconocible?
            </p>
          </div>

          <div className="text-xl">
            <p>No se trata de sumar. Se trata de quemar lo que sobra.</p>
            <p className="mt-2">De abrazar el dolor.</p>
            <p className="mt-2 text-2xl font-bold">De ser... puro. Real. Inevitable.</p>
          </div>
        </div>
      </div>

      {/* Carta al futuro - EJERCICIO */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-4xl">✉️</span>
          Carta desde el futuro
        </h2>
        
        <p className="text-lg text-gray-700 mb-6">
          Escribí desde tu "yo del futuro" que ya superó el fuego. Contale a tu yo de hoy qué cambió:
        </p>

        <textarea
          value={letterContent}
          onChange={(e) => setLetterContent(e.target.value)}
          placeholder="Querido yo del pasado... Hoy, después del fuego..."
          className="w-full p-4 border-2 border-indigo-200 rounded-lg focus:border-indigo-400 focus:outline-none min-h-[150px] text-gray-800 mb-4"
        />

        {letterContent.trim().length > 20 && (
          <button
            onClick={() => setShowLetter(!showLetter)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all mb-4"
          >
            {showLetter ? '🔒 Guardar carta' : '👁️ Leer mi transformación'}
          </button>
        )}

        {showLetter && letterContent && (
          <div className="bg-white p-6 rounded-lg border-2 border-indigo-400 shadow-lg">
            <p className="text-sm font-bold text-indigo-600 mb-3">📜 TU CARTA DE TRANSFORMACIÓN:</p>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line italic">
              {letterContent}
            </p>
          </div>
        )}
      </div>

      {/* Bonus prompt */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">🔓 BONUS: Desbloqueá tu alquimia</h3>
        <p className="text-gray-300 mb-4">
          Usá este prompt en ChatGPT o Claude para recibir tu carta desde el futuro:
        </p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {`🔥 Imaginá que ya pasaste por todo lo difícil. Lo lograste. Cambiaste.

Ahora, desde ese "nuevo yo" que superó el fuego, escribile una carta sincera y directa a tu "yo de hoy".

Contale:
• Qué dejaste atrás
• Qué verdades duras enfrentaste
• En qué cambió tu vida, y por qué ya no sos el mismo

No te mientas. No lo disfraces. Escribí con coraje. Como alguien que estuvo en las llamas... y salió transformado.`}
          </p>
        </div>
        <button 
          onClick={copyPrompt}
          className="mt-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {copiedPrompt ? (
            <>
              <span>✓</span>
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copiar prompt de transformación</span>
            </>
          )}
        </button>
        
        {burningItems.length > 0 && (
          <div className="mt-6 bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
            <p className="text-sm text-amber-200 flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Tu prompt incluye:</strong> Las {burningItems.length} {burningItems.length === 1 ? 'cosa' : 'cosas'} que estás quemando. 
                La IA usará esto para escribir una carta desde tu futuro transformado.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const honestidadMetadata = {
  id: 6,
  title: "Honestidad",
  type: "document" as const,
  duration: "25 min"
};