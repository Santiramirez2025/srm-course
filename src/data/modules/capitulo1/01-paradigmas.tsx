import React, { useState, useEffect, useRef } from 'react';
import { Check, Lock, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

// ==================== TYPES ====================
interface PhaseState {
  currentPhase: number;
  completedPhases: Set<number>;
  unlockedPhases: Set<number>;
}

// ==================== MAIN COMPONENT ====================
export const ParadigmasContent = () => {
  // State Management
  const [phaseState, setPhaseState] = useState<PhaseState>({
    currentPhase: 1,
    completedPhases: new Set([]),
    unlockedPhases: new Set([1])
  });
  
  const [testAnswers, setTestAnswers] = useState<boolean[]>([]);
  const [showTestResult, setShowTestResult] = useState(false);
  const [selectedBelief, setSelectedBelief] = useState<string>('');
  const [showBeliefResult, setShowBeliefResult] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const phaseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const totalPhases = 8;

  // ==================== DATA ====================
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

  // ==================== HANDLERS ====================
  const unlockNextPhase = (currentPhaseNum: number) => {
    const nextPhase = currentPhaseNum + 1;
    if (nextPhase <= totalPhases) {
      setPhaseState(prev => ({
        ...prev,
        completedPhases: new Set([...prev.completedPhases, currentPhaseNum]),
        unlockedPhases: new Set([...prev.unlockedPhases, nextPhase])
      }));
      
      // Scroll to next phase after a small delay
      setTimeout(() => {
        goToPhase(nextPhase);
      }, 300);
    }
  };

  const goToPhase = (phaseNum: number) => {
    if (phaseState.unlockedPhases.has(phaseNum)) {
      setPhaseState(prev => ({ ...prev, currentPhase: phaseNum }));
      
      // Smooth scroll to phase
      setTimeout(() => {
        phaseRefs.current[phaseNum]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };

  const handleTestAnswer = (index: number, answer: boolean) => {
    const newAnswers = [...testAnswers];
    newAnswers[index] = answer;
    setTestAnswers(newAnswers);
    
    if (newAnswers.filter(a => a !== undefined).length === testQuestions.length) {
      setShowTestResult(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleBeliefSelect = (belief: string) => {
    setSelectedBelief(belief);
    setShowBeliefResult(true);
  };

  const copyPrompt = () => {
    const prompt = "Ayudame a ver qué creencias sobre mí mismo podrían estar frenándome sin que me dé cuenta. Basate en cómo hablo de mí, de mis hábitos y resultados. Después, charlemos cómo podría verlo distinto. Sé directo pero amigable.";
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const countYes = testAnswers.filter(a => a === true).length;
  const progressPercentage = (phaseState.completedPhases.size / totalPhases) * 100;

  // ==================== COMPONENTS ====================
  const ProgressBar = () => (
    <div className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Progreso: {phaseState.completedPhases.size}/{totalPhases} fases
          </span>
          <span className="text-sm font-bold text-amber-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );

  const PhaseIndicator = ({ phaseNum, title }: { phaseNum: number; title: string }) => {
    const isCompleted = phaseState.completedPhases.has(phaseNum);
    const isUnlocked = phaseState.unlockedPhases.has(phaseNum);
    const isCurrent = phaseState.currentPhase === phaseNum;

    return (
      <button
        onClick={() => goToPhase(phaseNum)}
        disabled={!isUnlocked}
        className={`
          flex items-center gap-3 p-3 rounded-lg transition-all duration-200
          ${isCurrent ? 'bg-amber-100 border-2 border-amber-400' : ''}
          ${isCompleted && !isCurrent ? 'bg-green-50 border border-green-300 hover:bg-green-100' : ''}
          ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
          ${isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-amber-500' : 'bg-gray-300'}
        `}>
          {isCompleted ? (
            <Check size={18} className="text-white" />
          ) : isUnlocked ? (
            <span className="text-white font-bold text-sm">{phaseNum}</span>
          ) : (
            <Lock size={16} className="text-white" />
          )}
        </div>
        <span className={`text-sm font-medium ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
          {title}
        </span>
      </button>
    );
  };

  const ContinueButton = ({ phaseNum, label = "Continuar" }: { phaseNum: number; label?: string }) => (
    <button
      onClick={() => unlockNextPhase(phaseNum)}
      className="group w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
    >
      <span>{label}</span>
      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
    </button>
  );

  const PhaseContainer = ({ 
    phaseNum, 
    title, 
    children, 
    icon 
  }: { 
    phaseNum: number; 
    title: string; 
    children: React.ReactNode;
    icon?: string;
  }) => {
    const isUnlocked = phaseState.unlockedPhases.has(phaseNum);
    const isCompleted = phaseState.completedPhases.has(phaseNum);

    if (!isUnlocked) {
      return (
        <div 
        ref={el => { if (el) phaseRefs.current[phaseNum] = el }}
          className="bg-gray-100 border-2 border-gray-300 rounded-xl p-8 relative overflow-hidden opacity-60"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <Lock size={48} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-semibold">Completa la fase anterior</p>
            </div>
          </div>
          <div className="blur-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {icon} {title}
            </h2>
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={el => phaseRefs.current[phaseNum] = el}
        className={`
          bg-white border-2 rounded-xl p-6 sm:p-8 transition-all duration-500
          ${isCompleted ? 'border-green-400 shadow-md' : 'border-amber-400 shadow-xl'}
          animate-fade-in-up
        `}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {icon} {title}
          </h2>
          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600 font-semibold animate-scale-in">
              <Check size={20} />
              <span className="hidden sm:inline">Completado</span>
            </div>
          )}
        </div>
        {children}
      </div>
    );
  };

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ProgressBar />

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Phase Navigator */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                Fases del Módulo
              </h3>
              <PhaseIndicator phaseNum={1} title="Test Inicial" />
              <PhaseIndicator phaseNum={2} title="Tu Resultado" />
              <PhaseIndicator phaseNum={3} title="El Concepto" />
              <PhaseIndicator phaseNum={4} title="Ejemplo Real" />
              <PhaseIndicator phaseNum={5} title="Transforma Creencias" />
              <PhaseIndicator phaseNum={6} title="Plan de Acción" />
              <PhaseIndicator phaseNum={7} title="Reflexión Personal" />
              <PhaseIndicator phaseNum={8} title="Cierre + Bonus" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero */}
            <div className="text-center py-6 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                🎙️ Paradigmas
              </h1>
              <p className="text-xl text-gray-600 font-medium leading-relaxed">
                Cuando algo te sale mal, ¿pensás "mala suerte" o "lo sabía, no soy para esto"?
                <br />
                <span className="text-gray-800 font-semibold">Esa diferencia lo cambia todo.</span>
              </p>
            </div>

            {/* FASE 1: Test Inicial */}
            <PhaseContainer phaseNum={1} title="Pregunta honesta antes de seguir" icon="🤔">
              <p className="text-gray-700 mb-6">
                No es un test. Es simplemente para que veas si te identificás con algo de esto. Respondé honesto (nadie más lo ve):
              </p>
              
              <div className="space-y-4">
                {testQuestions.map((question, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <p className="text-gray-800 mb-3 font-medium">{question}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleTestAnswer(index, true)}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all transform hover:scale-105 ${
                          testAnswers[index] === true
                            ? 'bg-amber-100 border-amber-400 text-amber-800 shadow-md'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-amber-300'
                        }`}
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => handleTestAnswer(index, false)}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all transform hover:scale-105 ${
                          testAnswers[index] === false
                            ? 'bg-green-100 border-green-400 text-green-700 shadow-md'
                            : 'bg-white border-gray-300 text-gray-600 hover:border-green-300'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {showTestResult && (
                <div className="mt-6 animate-fade-in-up">
                  <ContinueButton phaseNum={1} label="Ver mi resultado" />
                </div>
              )}
            </PhaseContainer>

            {/* FASE 2: Resultado del Test */}
            <PhaseContainer phaseNum={2} title="Tu resultado" icon="📊">
              <div className={`p-6 rounded-lg border-2 ${
                countYes >= 3 ? 'bg-amber-50 border-amber-300' :
                countYes >= 2 ? 'bg-blue-50 border-blue-300' :
                'bg-green-50 border-green-300'
              }`}>
                <p className="text-gray-800 leading-relaxed text-lg">
                  {countYes >= 3 && (
                    <>
                      <strong className="text-xl">Si contestaste "sí" a varias:</strong><br /><br />
                      No voy a decirte "tranqui, es normal". Porque sí, es común, pero que sea común no significa que esté bueno.
                      <br /><br />
                      Lo que sí te digo: esto no es un diagnóstico de "algo está mal con vos". Es simplemente que en algún momento 
                      tu cerebro aprendió a protegerte de una forma que ahora te limita. Tipo, cuando eras pibe y evitabas ciertas 
                      situaciones porque genuinamente no estabas listo. Pero ahora sos adulto y ese mecanismo sigue activado.
                      <br /><br />
                      Este módulo no va a "arreglarte". Va a mostrarte cómo funciona ese mecanismo para que vos decidas si querés ajustarlo.
                    </>
                  )}
                  {countYes === 2 && (
                    <>
                      <strong className="text-xl">Interesante:</strong><br /><br />
                      Hay algunos patrones ahí que capaz nunca miraste de cerca. 
                      Seguí leyendo, puede que entiendas algo que no tenías en el radar.
                    </>
                  )}
                  {countYes <= 1 && (
                    <>
                      <strong className="text-xl">Bien ahí:</strong><br /><br />
                      Parece que tenés bastante claridad mental sobre estas cosas. 
                      Igual el módulo puede darte un par de herramientas para afinar lo que ya tenés.
                    </>
                  )}
                </p>
              </div>

              <div className="mt-8">
                <ContinueButton phaseNum={2} label="Entender por qué pasa esto" />
              </div>
            </PhaseContainer>

            {/* FASE 3: ¿Qué es un paradigma? */}
            <PhaseContainer phaseNum={3} title="Fijate si te pasa esto" icon="🧩">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  ¿Alguna vez estuviste por mandar un mensaje, aplicar a un laburo o arrancar algo... y justo antes pensaste "mejor no"?
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Y después, cuando no pasó nada, te dijiste: "Claro, sabía que no iba a funcionar".
                </p>
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-xl">
                  <p className="text-lg font-semibold">
                    Eso. Eso que acabás de sentir leyendo esto tiene un nombre: <span className="text-amber-400">paradigma</span>.
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Un paradigma es el filtro con el que mirás todo:</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start bg-white p-4 rounded-lg">
                      <span className="text-blue-500 text-xl mt-1">→</span>
                      <span className="text-gray-700"><strong>Si creés que sos malo para algo</strong> → ni lo intentás (o lo intentás esperando fallar)</span>
                    </div>
                    <div className="flex gap-3 items-start bg-white p-4 rounded-lg">
                      <span className="text-green-500 text-xl mt-1">→</span>
                      <span className="text-gray-700"><strong>Si creés que la gente no te valora</strong> → buscás confirmación de eso en cada interacción</span>
                    </div>
                    <div className="flex gap-3 items-start bg-white p-4 rounded-lg">
                      <span className="text-orange-500 text-xl mt-1">→</span>
                      <span className="text-gray-700"><strong>Si creés que "ya es tarde para vos"</strong> → cada año que pasa lo confirma</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-2 border-amber-400 p-5 rounded-lg">
                  <p className="text-gray-800 leading-relaxed font-medium">
                    <strong>Acá está el tema:</strong> No es que seas pesimista. Es que tu cerebro está configurado para ver una versión de la realidad. 
                    Y lo jodido es que cuanto más tiempo operás con ese filtro, más pruebas encontrás de que "tenés razón".
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <ContinueButton phaseNum={3} label="Ver ejemplo concreto" />
              </div>
            </PhaseContainer>

            {/* FASE 4: Ejemplo Visceral */}
            <PhaseContainer phaseNum={4} title="Ejemplo concreto" icon="💡">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border-2 border-red-300">
                  <p className="font-semibold text-gray-900 mb-3 text-lg">Situación: Te llega una llamada de un número que no conocés</p>
                  <div className="bg-white p-5 rounded-lg border-l-4 border-red-400 mb-4">
                    <p className="text-gray-700 mb-3 font-semibold">Paradigma A (desconfianza):</p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• Pensás: "Seguro es spam" o "Va a ser algo malo"</li>
                      <li>• No atendés</li>
                      <li>• Confirmación: "Menos mal que no atendí, seguro era una boludez"</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg border-l-4 border-green-400">
                    <p className="text-gray-700 mb-3 font-semibold">Paradigma B (curiosidad neutral):</p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• Pensás: "No sé quién es, veamos"</li>
                      <li>• Atendés</li>
                      <li>• Era una oportunidad que ni sabías que existía (o sí era spam, cortás y listo)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-4 border-amber-400 shadow-lg">
                  <p className="text-xl font-bold text-gray-900 text-center">
                    Misma llamada. Misma realidad. Resultados completamente diferentes.
                  </p>
                  <p className="text-lg text-amber-700 text-center mt-2 font-semibold">
                    Eso es un paradigma en acción.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <ContinueButton phaseNum={4} label="Transformar mis creencias" />
              </div>
            </PhaseContainer>

            {/* FASE 5: Selector de Creencias */}
            <PhaseContainer phaseNum={5} title="Mismo tema, filtros distintos" icon="🔄">
              <p className="text-gray-700 mb-6 text-lg">
                Elegí una de estas creencias y fijate cómo cambia cuando la mirás con otro filtro:
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {limitingBeliefs.map((belief, index) => (
                  <button
                    key={belief}
                    onClick={() => handleBeliefSelect(belief)}
                    className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 text-left animate-fade-in ${
                      selectedBelief === belief
                        ? 'bg-amber-100 border-amber-400 shadow-lg'
                        : 'bg-white border-gray-300 hover:border-amber-300'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <p className="text-sm font-medium text-gray-800">{belief}</p>
                  </button>
                ))}
              </div>

              {showBeliefResult && selectedBelief && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="bg-white p-6 rounded-lg border-2 border-green-400 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">🔴</div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-1">Lo que venías creyendo:</p>
                          <p className="text-gray-800 font-bold text-lg">{selectedBelief}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <ChevronRight size={32} className="text-gray-400 animate-pulse" />
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">🟢</div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-1">Mismo tema, otro filtro:</p>
                          <p className="text-green-700 font-bold text-xl">{empoweringBeliefs[selectedBelief]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ContinueButton phaseNum={5} label="Crear mi plan de acción" />
                </div>
              )}
            </PhaseContainer>

            {/* FASE 6: Plan de Acción */}
            {selectedBelief && (
              <PhaseContainer phaseNum={6} title="Tu plan de 7 días" icon="📱">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 p-6 rounded-xl space-y-4">
                  <div className="bg-white p-5 rounded-lg shadow-md">
                    <p className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                      <span>🎯</span> Tu frase de transformación:
                    </p>
                    <p className="text-green-700 font-bold text-xl italic border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded">
                      "{empoweringBeliefs[selectedBelief]}"
                    </p>
                  </div>

                  <div className="space-y-3 text-gray-700">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-semibold mb-2">Paso 1: Configurá tu alarma</p>
                      <p className="text-sm">Guardate una alarma en el celu con esta frase de nombre. Que suene todos los días a una hora random.</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-semibold mb-2">Paso 2: Cuando suene, hacé esto</p>
                      <p className="text-sm">No la repitas como robot. Leela y preguntate: <span className="font-semibold">"¿En qué cosa chiquita de hoy puedo ver esto?"</span></p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-semibold mb-2">Ejemplo:</p>
                      <p className="text-sm italic">Si tu frase es "Estoy aprendiendo cada día", cuando suene pensá: "¿Qué aprendí hoy, aunque sea algo pelotudo?" (tipo "aprendí que el café frío me cae mal" cuenta).</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800 mb-2">¿Por qué 7 días y no 21?</p>
                    <p className="text-sm text-gray-700">
                      Porque 21 días suena a compromiso de gym en enero. 7 días suena a "puedo hacer esto". 
                      Y si después de una semana funciona, lo vas a seguir solo. Si no, al menos probaste.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <ContinueButton phaseNum={6} label="Reflexión personal" />
                </div>
              </PhaseContainer>
            )}

            {/* FASE 7: Reflexión Personal */}
            <PhaseContainer phaseNum={7} title="Tu turno de reflexionar" icon="✍️">
              <p className="text-gray-700 mb-6 text-lg">
                ¿Hay algo que te repetís seguido y que capaz te está cagando? Escribilo acá abajo. 
                A veces solo el hecho de ponerlo en palabras ya cambia algo.
              </p>
              
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ej: No puedo aprender a programar porque..."
                className="w-full p-5 border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 min-h-[120px] text-lg transition-all"
              />

              {userInput && (
                <div className="mt-6 bg-white p-6 rounded-xl border-2 border-purple-400 shadow-md animate-fade-in-up">
                  <p className="text-sm text-gray-700 mb-4 font-semibold text-lg">Preguntate esto (en serio, tomate un minuto):</p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-3 items-start p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-600 font-bold text-xl">•</span>
                      <span>¿Desde cuándo pienso esto? ¿Me lo dijeron o lo concluí yo?</span>
                    </li>
                    <li className="flex gap-3 items-start p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-600 font-bold text-xl">•</span>
                      <span>¿Es una verdad universal o una interpretación mía de algo que pasó?</span>
                    </li>
                    <li className="flex gap-3 items-start p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-600 font-bold text-xl">•</span>
                      <span>¿Cómo lo diría alguien que cree en sí mismo? (no hace falta que lo creas, solo pensá cómo lo diría)</span>
                    </li>
                    <li className="flex gap-3 items-start p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-600 font-bold text-xl">•</span>
                      <span>¿Hubo alguna vez algo que contradice esta creencia? Aunque sea chiquito.</span>
                    </li>
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <ContinueButton phaseNum={7} label="Ir al cierre" />
              </div>
            </PhaseContainer>

            {/* FASE 8: Cierre + Bonus */}
            <PhaseContainer phaseNum={8} title="Para cerrar" icon="🎯">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-xl text-center shadow-xl">
                  <p className="text-2xl font-bold mb-4 leading-relaxed">
                    Cambiar cómo pensás no es lo mismo que "pensar positivo".
                  </p>
                  <p className="text-xl mb-4">
                    Es ver las mismas cosas de siempre y darte cuenta de que hay otra forma de leerlas.
                  </p>
                  <div className="h-px bg-blue-400 my-6" />
                  <p className="text-lg text-blue-100 mb-4">
                    No te va a cambiar la vida en una semana. Pero en seis meses, cuando mires para atrás, 
                    vas a ver que empezaste a tomar decisiones distintas sin darte cuenta.
                  </p>
                  <p className="text-2xl font-bold">
                    Y eso sí te cambia la vida.
                  </p>
                </div>

                <div className="bg-gray-900 text-white p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">🤖 Bonus: Usá IA para autoconocimiento</h3>
                  <p className="text-gray-300 mb-4">
                    Si querés ir más profundo en entender tus propios patrones, probá este prompt con ChatGPT, Claude o tu asistente favorito:
                  </p>
                  <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Ayudame a ver qué creencias sobre mí mismo podrían estar frenándome sin que me dé cuenta. 
                      Basate en cómo hablo de mí, de mis hábitos y resultados. 
                      Después, charlemos cómo podría verlo distinto. Sé directo pero amigable.
                    </p>
                  </div>
                  <button 
                    onClick={copyPrompt}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all w-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    {copiedPrompt ? (
                      <>
                        <Check size={20} />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copiar prompt</span>
                      </>
                    )}
                  </button>
                  <p className="text-gray-400 text-sm mt-3">
                    💡 Cuanto más honesto seas en tu conversación, más útil va a ser el feedback que recibas.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 p-6 rounded-xl text-center">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Completaste el módulo!</h3>
                  <p className="text-gray-700">
                    Ahora tenés las herramientas para empezar a ver las cosas de otra forma. El resto depende de vos.
                  </p>
                </div>

                <div className="bg-gray-100 border-l-4 border-gray-500 p-5 rounded-lg">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    <strong>Aclaración importante:</strong> Esto no es terapia ni ciencia con papers detrás. Es una herramienta de 
                    autoconocimiento basada en cómo funciona el pensamiento. Si sentís que necesitás ayuda más profunda, 
                    un terapeuta va a poder hacer mucho más que un módulo. Esto es complementario, no sustituto.
                  </p>
                </div>
              </div>
            </PhaseContainer>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export const paradigmasMetadata = {
  id: 1,
  title: "Paradigmas",
  type: "document" as const,
  duration: "15-20 min"
};