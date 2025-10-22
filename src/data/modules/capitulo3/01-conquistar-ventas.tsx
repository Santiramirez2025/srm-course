import React, { useState } from 'react';
import { ShieldCheck, Brain, Heart, Zap, TrendingUp, Lock, Unlock, Target, AlertTriangle, CheckCircle, X, Sparkles, ArrowRight } from 'lucide-react';

export const ConquistarVentasContent = () => {
  const [seccionActiva, setSeccionActiva] = useState<number | null>(1);
  const [miedosRevelados, setMiedosRevelados] = useState<number[]>([]);
  const [principiosDesbloqueados, setPrincipiosDesbloqueados] = useState<number[]>([]);

  const miedos = [
    { 
      id: 1, 
      titulo: 'Miedo al conflicto', 
      descripcion: 'Evitan el momento incómodo, como si una objeción fuera un ataque',
      solucion: 'Entender que una objeción es una oportunidad, no un ataque'
    },
    { 
      id: 2, 
      titulo: 'Miedo al juicio', 
      descripcion: 'Prefieren agradar y ser simpáticos antes que cerrar la venta',
      solucion: 'Ser auténtico y profesional es más valioso que ser "simpático"'
    },
    { 
      id: 3, 
      titulo: 'Miedo a perder', 
      descripcion: 'Se quedan atrapados en un "quizás" eterno, porque temen recibir un "no" claro',
      solucion: 'Un "no" claro es mejor que un "quizás" eterno. Te libera para avanzar'
    }
  ];

  const principiosConquista = [
    {
      id: 1,
      icono: <ShieldCheck className="w-8 h-8" />,
      titulo: 'Prevenir es cerrar antes de tiempo',
      subtitulo: 'Anticípate a la objeción',
      contenido: 'No esperes a que lo digan. Decilo vos primero. Mostrá por qué no es así. Desactivá el miedo antes de que se active.',
      frase: '"Ganá la guerra antes de entrar al campo de batalla."',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 2,
      icono: <Heart className="w-8 h-8" />,
      titulo: 'Hacete amigo de la objeción',
      subtitulo: 'Cambia tu actitud',
      contenido: 'Una objeción no es un ataque. Es el cliente diciéndote: "Tengo dudas, ayudame a confiar." Respondé con calma y genuinidad.',
      frase: '"El cliente no necesita que lo convenzas. Necesita que le transmitas que vos sabés manejar ese momento."',
      color: 'from-red-600 to-pink-600'
    },
    {
      id: 3,
      icono: <Brain className="w-8 h-8" />,
      titulo: 'Reencuadrar: tu arma secreta',
      subtitulo: 'Toma el control del marco',
      contenido: 'No entres en su marco de miedo. Reencuadrá con una respuesta firme, positiva y emocionalmente superior.',
      frase: '"Cuando dominás el marco, la energía cambia."',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 4,
      icono: <Heart className="w-8 h-8" />,
      titulo: 'Empatía Radical',
      subtitulo: 'Escucha de verdad',
      contenido: 'No se trata de decir "te entiendo". Se trata de sentir desde dónde viene esa duda. La empatía radical desarma cualquier barrera.',
      frase: '"Cuando el otro se siente comprendido, baja la defensa y abre la puerta."',
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 5,
      icono: <TrendingUp className="w-8 h-8" />,
      titulo: 'El ciclo que cierra',
      subtitulo: 'Confirma cada victoria',
      contenido: 'Cada objeción conquistada refuerza la confianza. No te quedes solo en responder, cerrá con confirmación positiva.',
      frase: '"La confianza se construye en loops."',
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const objecionesCortina = [
    { frase: 'Déjame pensarlo', realidad: 'Todavía no estoy seguro' },
    { frase: 'Ahora no es el mejor momento', realidad: 'No confío del todo' },
    { frase: 'Tengo que hablarlo con alguien más', realidad: 'Necesito validación externa porque no me siento seguro' }
  ];

  const toggleMiedo = (id: number) => {
    if (miedosRevelados.includes(id)) {
      setMiedosRevelados(miedosRevelados.filter(m => m !== id));
    } else {
      setMiedosRevelados([...miedosRevelados, id]);
    }
  };

  const togglePrincipio = (id: number) => {
    if (principiosDesbloqueados.includes(id)) {
      setPrincipiosDesbloqueados(principiosDesbloqueados.filter(p => p !== id));
    } else {
      setPrincipiosDesbloqueados([...principiosDesbloqueados, id]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Ultra Moderno */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-12 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            <p className="text-sm font-bold uppercase tracking-wider text-purple-300">
              Capítulo 3 · Módulo 1
            </p>
            <div className="h-1 w-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-6 text-center bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            🎯 CONQUISTAR VENTAS
          </h1>
          <p className="text-xl text-purple-200 max-w-4xl mx-auto text-center leading-relaxed">
            No vamos a hablar de "manejar objeciones", porque eso suena defensivo.<br/>
            <strong className="text-white">Vamos a conquistarlas.</strong> A transformarlas en el terreno donde se cierra la venta de verdad.
          </p>
        </div>
        
        {/* Decoración geométrica */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Dónde empieza la venta */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 shadow-lg">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              📍 ¿Dónde empieza realmente la venta?
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-slate-700">
                No te equivoques: vender no empieza cuando mostrás tu producto ni cuando hacés tu presentación.
              </p>
              <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-md">
                <p className="text-xl font-bold text-slate-900 mb-2">
                  Empieza cuando la otra persona te dice su primer <span className="text-red-600">"pero..."</span>
                </p>
                <p className="text-slate-600">
                  Ahí se juega todo. Ahí descubrís si sos alguien que solo ofrece... o alguien que realmente sabe cerrar ventas.
                </p>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-xl text-white">
                <p className="text-lg font-bold text-center">
                  La objeción es el momento real. Porque cuando alguien duda, no se esconde: se muestra lo que realmente piensa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ¿Qué es una objeción? */}
      <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4">
            <AlertTriangle className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            💡 Las Objeciones
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Una objeción es una duda o resistencia que expresa una persona antes de tomar una decisión, especialmente en una venta.
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
          <h3 className="text-xl font-bold text-red-900 mb-4">
            ⚠️ ¿Por qué la mayoría fracasa cuando aparece una objeción?
          </h3>
          <p className="text-lg text-red-800 font-bold mb-4">Porque reaccionan desde el miedo.</p>
          
          {/* Los 3 Miedos Revelables */}
          <div className="space-y-3">
            {miedos.map((miedo) => (
              <div key={miedo.id} className="bg-white rounded-lg border-2 border-red-200 overflow-hidden">
                <button
                  onClick={() => toggleMiedo(miedo.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {miedosRevelados.includes(miedo.id) ? (
                      <Unlock className="w-6 h-6 text-green-600" />
                    ) : (
                      <Lock className="w-6 h-6 text-red-600" />
                    )}
                    <div className="text-left">
                      <p className="font-bold text-slate-900">{miedo.titulo}</p>
                      <p className="text-sm text-slate-600">{miedo.descripcion}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-5 h-5 transition-transform ${miedosRevelados.includes(miedo.id) ? 'rotate-90' : ''}`} />
                </button>
                {miedosRevelados.includes(miedo.id) && (
                  <div className="p-4 bg-green-50 border-t-2 border-green-200">
                    <p className="text-sm font-bold text-green-800 mb-1">✅ La solución:</p>
                    <p className="text-sm text-green-900">{miedo.solucion}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 bg-slate-900 p-5 rounded-xl text-white text-center">
            <p className="text-lg font-bold">
              📌 Hasta que no reconozcas estos miedos, ninguna técnica te va a servir.
            </p>
            <p className="text-purple-300 mt-2">
              La primera batalla se gana adentro. Superar esos miedos es tu verdadero primer cierre.
            </p>
          </div>
        </div>
      </div>

      {/* Los 5 Principios de Conquista */}
      <div className="space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            🛡️ Los 5 Principios de Conquista
          </h2>
          <p className="text-lg text-slate-600">
            Hacé click en cada principio para desbloquearlo
          </p>
        </div>

        {principiosConquista.map((principio, idx) => (
          <div key={principio.id} className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-2xl transition-all">
            <button
              onClick={() => togglePrincipio(principio.id)}
              className={`w-full p-6 flex items-center justify-between transition-all ${
                principiosDesbloqueados.includes(principio.id) ? 'bg-gradient-to-r ' + principio.color : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${
                  principiosDesbloqueados.includes(principio.id) 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {principio.icono}
                </div>
                <div className="text-left">
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                    principiosDesbloqueados.includes(principio.id) ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    Principio {idx + 1}
                  </p>
                  <h3 className={`text-xl font-bold ${
                    principiosDesbloqueados.includes(principio.id) ? 'text-white' : 'text-slate-900'
                  }`}>
                    {principio.titulo}
                  </h3>
                  <p className={`text-sm ${
                    principiosDesbloqueados.includes(principio.id) ? 'text-white/90' : 'text-slate-600'
                  }`}>
                    {principio.subtitulo}
                  </p>
                </div>
              </div>
              <div className={principiosDesbloqueados.includes(principio.id) ? 'text-white' : 'text-slate-400'}>
                {principiosDesbloqueados.includes(principio.id) ? (
                  <CheckCircle className="w-8 h-8" />
                ) : (
                  <Lock className="w-8 h-8" />
                )}
              </div>
            </button>

            {principiosDesbloqueados.includes(principio.id) && (
              <div className="p-6 bg-slate-50 border-t-2 border-slate-200">
                <p className="text-slate-700 mb-4 leading-relaxed">
                  {principio.contenido}
                </p>
                <div className="bg-white p-4 rounded-lg border-l-4 border-slate-900">
                  <p className="text-slate-900 font-bold italic">
                    {principio.frase}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Objeciones Cortina de Humo */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            🧱 Objeciones Cortina de Humo
          </h2>
          <p className="text-lg text-amber-900">
            <strong>Hasta el 80% de las objeciones no son reales.</strong> Son excusas que esconden falta de confianza.
          </p>
        </div>

        <div className="space-y-4">
          {objecionesCortina.map((objecion, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border-2 border-amber-300 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-4xl">💬</div>
                <div className="flex-1">
                  <div className="bg-red-50 p-4 rounded-lg mb-3 border-l-4 border-red-500">
                    <p className="text-sm font-bold text-red-800 mb-1">❌ Lo que dicen:</p>
                    <p className="text-lg font-bold text-slate-900">"{objecion.frase}"</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-bold text-green-800 mb-1">✅ Lo que realmente significa:</p>
                    <p className="text-slate-900">"{objecion.realidad}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-900 p-6 rounded-xl text-white">
          <p className="text-lg font-bold mb-2">📌 La clave:</p>
          <p className="text-amber-100">
            No discutas la excusa. Descubrí lo que está detrás. Preguntá con calma: "¿Qué parte te genera más duda?" o "¿Qué necesitarías ver para sentirte 100% seguro?"
          </p>
        </div>
      </div>

      {/* Umbrales de Decisión */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          🎚️ Umbrales de Decisión
        </h2>
        
        <p className="text-lg text-slate-700 text-center mb-8">
          Cada cliente tiene un punto exacto donde dice "sí". Tu trabajo es mover las variables clave:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border-2 border-green-300">
            <p className="text-2xl font-bold text-green-700 mb-4">🔼 Aumentá:</p>
            <ul className="space-y-2">
              {[
                'El deseo por el resultado',
                'La urgencia de actuar ahora',
                'La claridad sobre cómo funciona',
                'La confianza en vos y en tu solución'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-red-300">
            <p className="text-2xl font-bold text-red-700 mb-4">🔽 Reducí:</p>
            <ul className="space-y-2">
              {[
                'La comodidad de quedarse igual',
                'Las dudas sin resolver',
                'El miedo a equivocarse',
                'La incertidumbre sobre el proceso'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl text-white text-center">
          <p className="text-xl font-bold">
            💡 Cuando el deseo vence al miedo, el cliente decide. Ese es el verdadero cierre.
          </p>
        </div>
      </div>

      {/* BONUS */}
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 text-white border-2 border-purple-500">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold">🔓 BONUS OCULTO</h2>
          <Sparkles className="w-8 h-8 text-yellow-400" />
        </div>
        
        <p className="text-lg text-purple-200 text-center mb-6">
          Prompt para desbloquear tu poder de cierre
        </p>

        <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
          <p className="text-sm font-mono text-purple-200 leading-relaxed">
            Actuá como un coach de élite en neuroventas. Quiero que analices mi pitch actual y me señales todos los posibles puntos de objeción que puede tener un cliente. Luego, dame las mejores formas de anticiparlas y reencuadrarlas con seguridad emocional, autoridad profesional y ejemplos aplicados a mi industria.
          </p>
        </div>
      </div>

      {/* Cierre Épico */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-12 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            ✅ Conquistar es Cerrar
          </h2>
          <p className="text-xl text-purple-200 mb-4">
            Las objeciones no son piedras en el camino. Son señales de que vas por el camino correcto.
          </p>
          <p className="text-2xl font-bold text-white">
            Cada una conquistada es un paso más hacia el cierre.
          </p>
        </div>
      </div>
    </div>
  );
};

export const conquistarVentasMetadata = {
  id: 1,
  title: "Conquistar Ventas - El Arte de las Objeciones",
  type: "document" as const,
  duration: "40 min"
};