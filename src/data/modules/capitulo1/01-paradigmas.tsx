import React, { useState } from 'react';

export const ParadigmasContent = () => {
  const [selectedBelief, setSelectedBelief] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const limitingBeliefs = [
    "No soy bueno para esto",
    "No tengo suerte",
    "Soy malo con el dinero",
    "No tengo tiempo",
    "Ya es muy tarde para mí",
    "No soy creativo"
  ];

  const empoweringBeliefs: { [key: string]: string } = {
    "No soy bueno para esto": "Estoy aprendiendo y mejorando cada día",
    "No tengo suerte": "Creo mis propias oportunidades",
    "Soy malo con el dinero": "Estoy desarrollando inteligencia financiera",
    "No tengo tiempo": "Administro mi tiempo según mis prioridades",
    "Ya es muy tarde para mí": "Es el momento perfecto para empezar",
    "No soy creativo": "La creatividad se desarrolla con práctica"
  };

  const handleBeliefSelect = (belief: string) => {
    setSelectedBelief(belief);
    setShowResult(true);
  };

  const toggleStep = (step: number) => {
    if (completedSteps.includes(step)) {
      setCompletedSteps(completedSteps.filter(s => s !== step));
    } else {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const copyPrompt = () => {
    const prompt = "🎯 Quiero que actúes como un coach mental experto. Mostrame cuáles son mis paradigmas limitantes ocultos basándote en cómo me describo a mí mismo, mis hábitos y mis resultados. Después, ayudame a transformarlos por nuevas creencias que me permitan alcanzar mi máximo potencial. Sé directo.";
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Intro Hero */}
      <div className="text-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🎙️ Paradigmas
        </h1>
        <p className="text-2xl text-amber-600 font-medium">
          El lente invisible que define tu realidad
        </p>
      </div>

      {/* Hook inicial */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          👁️ ¿Y si tu vida no fuera lo que pensás?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          ¿Alguna vez te detuviste a pensar por qué vivís lo que vivís? Tus ingresos, 
          tus vínculos, tu nivel de confianza, tus logros o frustraciones… 
          <strong className="text-amber-700"> nada de eso es casual.</strong>
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Todo está profundamente conectado con cómo interpretás el mundo.
        </p>
      </div>

      {/* Idea central */}
      <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg text-center">
        <p className="text-xl sm:text-2xl font-bold mb-2">
          No vivís la vida que querés.
        </p>
        <p className="text-3xl sm:text-4xl font-bold text-amber-400">
          Vivís la vida que creés.
        </p>
        <p className="text-lg mt-4 text-gray-300">
          Y esa creencia está moldeada por una sola palabra: <span className="text-amber-400 font-bold">paradigma</span>
        </p>
      </div>

      {/* ¿Qué es un paradigma? */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🧠 ¿Qué es un paradigma?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Un paradigma no es solo una idea. Es el <strong>lente invisible</strong> con el que mirás la vida:
        </p>
        <ul className="space-y-3 ml-6">
          <li className="flex gap-3 items-start">
            <span className="text-amber-500 text-xl mt-1">→</span>
            <span className="text-gray-700">Lo que pensás que podés o no podés hacer</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-amber-500 text-xl mt-1">→</span>
            <span className="text-gray-700">Lo que esperás de los demás</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-amber-500 text-xl mt-1">→</span>
            <span className="text-gray-700">Lo que te animás a intentar</span>
          </li>
        </ul>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-6 italic text-center">
          <p className="text-lg text-gray-800">
            "No vemos las cosas como son. Las vemos como somos."
          </p>
        </div>
      </div>

      {/* Analogía de las gafas - INTERACTIVA */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          🎨 Experimento interactivo: Las gafas
        </h3>
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed">
            Imaginá un lienzo blanco con un cuadrado negro en el centro. 
            Dos personas lo miran con diferentes lentes.
          </p>
          
          {/* Cuadrado interactivo */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <div className="text-center">
              <div className="w-40 h-40 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center mb-2">
                <div className="w-20 h-20 bg-red-600 rounded"></div>
              </div>
              <p className="text-sm font-medium text-red-600">Con gafas rojas</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center mb-2">
                <div className="w-20 h-20 bg-blue-600 rounded"></div>
              </div>
              <p className="text-sm font-medium text-blue-600">Con gafas azules</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center mb-2">
                <div className="w-20 h-20 bg-black rounded"></div>
              </div>
              <p className="text-sm font-medium text-gray-600">Sin gafas (realidad)</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 text-center">
            <p className="text-lg font-semibold text-gray-800">
              💡 Así funciona nuestra mente
            </p>
            <p className="text-gray-600 mt-2">
              El paradigma es tan sutil que ni siquiera notás que lo estás usando… pero lo influye todo.
            </p>
          </div>
        </div>
      </div>

      {/* Cómo se forma */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">👶 ¿Cómo se forma tu paradigma?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Cuando nacés, tu mente es como una esponja: abierta, receptiva, sin filtros. 
          Todo lo que escuchás, vivís o sentís en tus primeros años <strong>queda grabado como una verdad.</strong>
        </p>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-lg">
          <p className="font-semibold text-gray-900 mb-2">📖 Ejemplo real:</p>
          <p className="text-gray-700 leading-relaxed">
            Un niño cocina en el colegio, se confunde con los ingredientes, y todos se ríen. 
            Años después, ese mismo niño cree que <em>"no sirve para cocinar"</em>.
          </p>
          <p className="text-gray-700 mt-3 font-medium">
            No porque sea verdad, sino porque así lo vivió, y así lo creyó.
          </p>
        </div>
      </div>

      {/* El ciclo de las creencias - INTERACTIVO */}
      <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🔁 Tus creencias moldean tu realidad</h2>
        <p className="text-lg text-gray-700 mb-6">
          No fallamos por falta de talento, sino por lo que creemos sobre nosotros mismos.
        </p>
        
        <div className="space-y-4">
          {[
            { num: 1, title: "Tenés una creencia:", desc: '"No soy bueno para cocinar"', color: "red" },
            { num: 2, title: "Actuás desde esa creencia:", desc: "No te animás. Dudás. No lo disfrutás.", color: "orange" },
            { num: 3, title: "Fallás (como todos al principio):", desc: "Se te quema la comida.", color: "yellow" },
            { num: 4, title: "Confirmás tu historia interna:", desc: '"¿Ves? Te dije que no sirvo."', color: "green" }
          ].map((step) => (
            <button
              key={step.num}
              onClick={() => toggleStep(step.num)}
              className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                completedSteps.includes(step.num)
                  ? 'bg-amber-50 border-amber-300'
                  : 'bg-white border-gray-200 hover:border-amber-200'
              }`}
            >
              <div className={`w-10 h-10 bg-${step.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                {completedSteps.includes(step.num) ? (
                  <span className="text-amber-600 font-bold">✓</span>
                ) : (
                  <span className={`text-${step.color}-600 font-bold`}>{step.num}</span>
                )}
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-900">{step.title}</p>
                <p className={`text-gray-600 ${step.desc.startsWith('"') ? 'italic' : ''}`}>{step.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg mt-6">
          <p className="text-gray-800 font-medium">
            ⚠️ El error no te define. Pero tu creencia hace que lo tomes como prueba de que no podés.
          </p>
        </div>
      </div>

      {/* Transformador de creencias - INTERACTIVO */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🛠 Transformador de creencias</h2>
        <p className="text-lg text-gray-700 mb-4">
          Seleccioná una creencia limitante y descubrí su versión potenciadora:
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {limitingBeliefs.map((belief) => (
            <button
              key={belief}
              onClick={() => handleBeliefSelect(belief)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedBelief === belief
                  ? 'bg-red-100 border-red-300'
                  : 'bg-white border-gray-200 hover:border-red-200'
              }`}
            >
              <p className="text-sm font-medium text-gray-700">❌ {belief}</p>
            </button>
          ))}
        </div>

        {showResult && selectedBelief && (
          <div className="bg-white p-6 rounded-lg border-2 border-green-300 animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-red-600 font-medium mb-2 line-through">
                  ❌ {selectedBelief}
                </p>
                <p className="text-lg text-green-600 font-bold">
                  ✅ {empoweringBeliefs[selectedBelief]}
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  Repetí esta nueva creencia cada día durante 21 días y observá el cambio.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Escribe tu propia creencia - INTERACTIVO */}
      <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">✍️ Identificá tu creencia limitante</h2>
        <p className="text-gray-700 mb-4">
          ¿Qué pensamiento te está frenando ahora mismo?
        </p>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ejemplo: No puedo aprender idiomas..."
          className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none min-h-[100px]"
        />
        {userInput && (
          <div className="mt-4 bg-white p-4 rounded-lg border-2 border-purple-300">
            <p className="text-sm text-gray-600 mb-2">💡 Preguntate:</p>
            <ul className="space-y-2 text-gray-700 text-sm ml-5">
              <li>• ¿De dónde viene esta creencia?</li>
              <li>• ¿Es realmente verdad o es una interpretación?</li>
              <li>• ¿Cómo podría replantear esto de forma empoderadora?</li>
            </ul>
          </div>
        )}
      </div>

      {/* Las 3 llaves */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🗝️ Las 3 llaves para cambiar</h2>
        <p className="text-lg text-gray-700 mb-6">
          Cambiar un paradigma no es fácil. Te obliga a cuestionar todo lo que diste por hecho. 
          Pero en ese cuestionamiento… empieza tu libertad.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-amber-500 hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-3">🙏</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Humildad</h3>
            <p className="text-gray-600 text-sm">Para aceptar que podrías estar equivocado</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500 hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-3">🔁</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Repetición</h3>
            <p className="text-gray-600 text-sm">Lo nuevo se instala con práctica, no con buenas intenciones</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500 hover:scale-105 transition-transform cursor-pointer">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Conocimiento</h3>
            <p className="text-gray-600 text-sm">Para elegir nuevas ideas con conciencia y claridad</p>
          </div>
        </div>
      </div>

      {/* Llamado final */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">📌 La invitación</h2>
        <p className="text-xl mb-4 leading-relaxed">
          Si cambiás la forma en que mirás las cosas, las cosas que mirás cambian.
        </p>
        <p className="text-lg">
          No porque el mundo sea diferente, sino porque <strong>vos sos diferente.</strong>
        </p>
      </div>

      {/* Bonus prompt - INTERACTIVO */}
      <div className="bg-gray-900 text-white p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-amber-400">🔓 BONUS: Prompt para tu IA</h3>
        <p className="text-gray-300 mb-4">Usá este prompt con ChatGPT, Claude o tu coach digital favorito:</p>
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300 leading-relaxed">
            🎯 Quiero que actúes como un coach mental experto. Mostrame cuáles son mis paradigmas limitantes ocultos 
            basándote en cómo me describo a mí mismo, mis hábitos y mis resultados. Después, ayudame a transformarlos 
            por nuevas creencias que me permitan alcanzar mi máximo potencial. Sé directo.
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
              <span>Copiar prompt</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const paradigmasMetadata = {
  id: 1,
  title: "Paradigmas",
  type: "document" as const,
  duration: "15 min"
};