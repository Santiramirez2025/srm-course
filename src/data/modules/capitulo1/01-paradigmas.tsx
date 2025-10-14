import React, { useState } from 'react';

export const ParadigmasContent = () => {
  const [selectedBelief, setSelectedBelief] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [testAnswers, setTestAnswers] = useState<boolean[]>([]);
  const [showTestResult, setShowTestResult] = useState(false);

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

  const testQuestions = [
    "Suelo decir 'no puedo' antes de intentar",
    "Cuando algo sale mal, lo tomo como confirmación de mis límites",
    "Me cuesta aceptar elogios o logros",
    "Evito situaciones nuevas por miedo a fallar"
  ];

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

  const handleTestAnswer = (index: number, answer: boolean) => {
    const newAnswers = [...testAnswers];
    newAnswers[index] = answer;
    setTestAnswers(newAnswers);
    
    if (newAnswers.filter(a => a !== undefined).length === testQuestions.length) {
      setShowTestResult(true);
    }
  };

  const countYes = testAnswers.filter(a => a === true).length;

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

      {/* TEST INICIAL - NUEVO */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Test rápido: ¿Tenés paradigmas limitantes?</h2>
        <p className="text-gray-700 mb-6">Respondé con honestidad SÍ o NO a cada afirmación:</p>
        
        <div className="space-y-4">
          {testQuestions.map((question, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <p className="text-gray-800 mb-3 font-medium">{question}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleTestAnswer(index, true)}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
                    testAnswers[index] === true
                      ? 'bg-red-100 border-red-400 text-red-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-red-300'
                  }`}
                >
                  SÍ
                </button>
                <button
                  onClick={() => handleTestAnswer(index, false)}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all ${
                    testAnswers[index] === false
                      ? 'bg-green-100 border-green-400 text-green-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-green-300'
                  }`}
                >
                  NO
                </button>
              </div>
            </div>
          ))}
        </div>

        {showTestResult && (
          <div className={`mt-6 p-5 rounded-lg border-2 ${
            countYes >= 3 ? 'bg-red-50 border-red-300' :
            countYes >= 2 ? 'bg-orange-50 border-orange-300' :
            'bg-green-50 border-green-300'
          }`}>
            <p className="font-bold text-gray-900 mb-2">📊 Resultado:</p>
            {countYes >= 3 && (
              <p className="text-gray-800">
                <strong>Alerta alta:</strong> Tenés varios paradigmas limitantes activos. 
                Este módulo es especialmente importante para vos. Seguí leyendo con atención.
              </p>
            )}
            {countYes === 2 && (
              <p className="text-gray-800">
                <strong>Alerta media:</strong> Algunos paradigmas te están frenando. 
                Es el momento ideal para trabajar en ellos.
              </p>
            )}
            {countYes <= 1 && (
              <p className="text-gray-800">
                <strong>Buen camino:</strong> Tenés paradigmas saludables, pero siempre hay espacio para crecer. 
                Este módulo te ayudará a optimizar aún más tu mentalidad.
              </p>
            )}
          </div>
        )}
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

      {/* Experimento mejorado de las gafas */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          👓 Experimento: ¿Qué color ves?
        </h3>
        
        <div className="space-y-6">
          {/* Introducción más clara */}
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
            <p className="text-lg text-gray-800 font-medium mb-2">
              Dos personas miran la misma situación:
            </p>
            <p className="text-gray-700 text-lg italic">
              "Me ofrecieron un proyecto nuevo en el trabajo"
            </p>
          </div>

          {/* Dos interpretaciones lado a lado */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Persona con paradigma limitante */}
            <div className="bg-white rounded-lg p-5 border-3 border-red-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                  😰
                </div>
                <div>
                  <p className="font-bold text-gray-900">Persona A</p>
                  <p className="text-xs text-red-600">Lentes limitantes</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Ve:</p>
                  <p className="text-sm text-gray-700">"Es demasiado para mí"</p>
                </div>
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Siente:</p>
                  <p className="text-sm text-gray-700">Miedo, inseguridad</p>
                </div>
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Actúa:</p>
                  <p className="text-sm text-gray-700">Rechaza o hace mal el trabajo</p>
                </div>
              </div>
            </div>

            {/* Persona con paradigma potenciador */}
            <div className="bg-white rounded-lg p-5 border-3 border-green-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                  😊
                </div>
                <div>
                  <p className="font-bold text-gray-900">Persona B</p>
                  <p className="text-xs text-green-600">Lentes potenciadores</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Ve:</p>
                  <p className="text-sm text-gray-700">"Una oportunidad de crecer"</p>
                </div>
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Siente:</p>
                  <p className="text-sm text-gray-700">Emoción, curiosidad</p>
                </div>
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Actúa:</p>
                  <p className="text-sm text-gray-700">Acepta y da lo mejor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Revelación */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-5 rounded-lg border-2 border-amber-300">
            <div className="flex items-start gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  La revelación:
                </p>
                <p className="text-gray-800 leading-relaxed">
                  <strong>La situación es la misma.</strong> El proyecto no cambió. 
                  Lo que cambió fue el <span className="text-amber-700 font-bold">paradigma</span> con el que cada uno lo interpretó.
                </p>
                <p className="text-gray-700 mt-3 text-sm italic">
                  Tu paradigma no cambia lo que pasa... cambia lo que hacés con lo que pasa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cómo se forma - CON NEUROPLASTICIDAD */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">👶 ¿Cómo se forma tu paradigma?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Cuando nacés, tu mente es como una esponja: abierta, receptiva, sin filtros. 
          Todo lo que escuchás, vivís o sentís en tus primeros años <strong>queda grabado como una verdad.</strong>
        </p>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-lg mb-4">
          <p className="font-semibold text-gray-900 mb-2">📖 Ejemplo real:</p>
          <p className="text-gray-700 leading-relaxed">
            Un niño cocina en el colegio, se confunde con los ingredientes, y todos se ríen. 
            Años después, ese mismo niño cree que <em>"no sirve para cocinar"</em>.
          </p>
          <p className="text-gray-700 mt-3 font-medium">
            No porque sea verdad, sino porque así lo vivió, y así lo creyó.
          </p>
        </div>
        
        {/* Neuroplasticidad - NUEVO */}
        <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-lg">
          <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-2xl">🧬</span> La buena noticia:
          </p>
          <p className="text-gray-700 leading-relaxed">
            Tu cerebro tiene <strong>neuroplasticidad</strong>: puede cambiar y formar nuevas conexiones 
            durante toda tu vida. Los paradigmas no son permanentes. Con repetición consciente, podés 
            reescribir las creencias que te limitan.
          </p>
        </div>
      </div>

      {/* El ciclo de las creencias - MEJORADO CON CONTRASTE */}
      <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🔁 Dos ciclos, dos realidades</h2>
        <p className="text-lg text-gray-700 mb-6">
          El mismo evento, dos paradigmas diferentes, dos resultados opuestos:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Ciclo limitante */}
          <div className="space-y-3">
            <h3 className="font-bold text-red-600 text-center mb-4">❌ Ciclo Limitante</h3>
            {[
              { num: 1, title: "Creencia:", desc: '"No soy bueno para cocinar"', color: "red" },
              { num: 2, title: "Actuás:", desc: "No te animás. Dudás. No lo disfrutás.", color: "red" },
              { num: 3, title: "Fallás:", desc: "Se te quema la comida.", color: "red" },
              { num: 4, title: "Confirmás:", desc: '"¿Ves? Te dije que no sirvo."', color: "red" }
            ].map((step) => (
              <div key={step.num} className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <p className="font-semibold text-gray-900">{step.title}</p>
                <p className={`text-gray-700 text-sm ${step.desc.startsWith('"') ? 'italic' : ''}`}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Ciclo potenciador */}
          <div className="space-y-3">
            <h3 className="font-bold text-green-600 text-center mb-4">✅ Ciclo Potenciador</h3>
            {[
              { num: 1, title: "Creencia:", desc: '"Estoy aprendiendo a cocinar"', color: "green" },
              { num: 2, title: "Actuás:", desc: "Intentás con curiosidad. Experimentás.", color: "green" },
              { num: 3, title: "Fallás:", desc: "Se te quema la comida (igual).", color: "green" },
              { num: 4, title: "Reinterpretás:", desc: '"Es parte del proceso. La próxima mejor."', color: "green" }
            ].map((step) => (
              <div key={step.num} className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <p className="font-semibold text-gray-900">{step.title}</p>
                <p className={`text-gray-700 text-sm ${step.desc.startsWith('"') ? 'italic' : ''}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-lg mt-6">
          <p className="text-gray-800 font-medium text-center">
            🎯 El error es el mismo. La diferencia está en cómo lo interpretás.
          </p>
        </div>
      </div>

      {/* Caso de transformación - NUEVO */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🦋 Historia de transformación real</h2>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">👩‍💼</div>
            <div>
              <p className="font-bold text-gray-900 text-lg">María, 28 años</p>
              <p className="text-gray-600 text-sm">Hoy es contadora en una empresa multinacional</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 pl-4">
              <p className="text-sm font-semibold text-red-600">ANTES:</p>
              <p className="text-gray-700 italic">"Soy mala con los números. Nunca voy a entender matemáticas."</p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-amber-100 px-4 py-2 rounded-full">
                <p className="text-sm font-bold text-amber-700">¿Qué cambió?</p>
              </div>
            </div>
            
            <div className="border-l-4 border-green-400 pl-4">
              <p className="text-sm font-semibold text-green-600">DESPUÉS:</p>
              <p className="text-gray-700 italic">"Los números son un lenguaje. Puedo aprenderlo como cualquier otro."</p>
            </div>
          </div>
          
          <p className="mt-4 text-gray-700 text-center font-medium">
            No cambiaron sus habilidades. Cambió su <span className="text-purple-600 font-bold">paradigma</span>.
          </p>
        </div>
      </div>

      {/* Transformador de creencias - CON ACCIÓN INMEDIATA */}
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
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border-2 border-green-300">
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
                </div>
              </div>
            </div>

            {/* Acción inmediata - NUEVO */}
            <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-lg">
              <p className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📱</span> Acción inmediata:
              </p>
              <ol className="space-y-2 text-gray-700 ml-6">
                <li><strong>1.</strong> Configurá una alarma en tu celular</li>
                <li><strong>2.</strong> Que diga: <span className="italic text-green-600">"{empoweringBeliefs[selectedBelief]}"</span></li>
                <li><strong>3.</strong> Repetila cada día durante 21 días consecutivos</li>
              </ol>
              <p className="text-sm text-gray-600 mt-3 italic">
                💡 La neuroplasticidad funciona con repetición. Dale tiempo a tu cerebro.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Escribe tu propia creencia */}
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
              <li>• ¿Qué evidencia tengo que contradice esta creencia?</li>
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

      {/* Bonus prompt */}
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