import React from 'react';

export const HabitosContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">🔄 Hábitos Saludables</h2>
      
      <p className="text-lg text-gray-700">
        Los hábitos son la base de una vida exitosa. Pequeñas acciones diarias 
        crean grandes transformaciones.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <p className="font-semibold text-amber-900">
          💡 Clave: No son los grandes gestos. Son las pequeñas decisiones repetidas.
        </p>
      </div>

      <h3 className="text-xl font-bold text-gray-800">¿Por qué importan los hábitos?</h3>
      <p className="text-gray-700">
        Tus hábitos determinan quién eres. Son votos automáticos a favor o en contra 
        de la persona que querés ser.
      </p>

      <h3 className="text-xl font-bold text-gray-800">3 Hábitos clave para empezar</h3>
      <ul className="space-y-3">
        <li className="flex gap-3">
          <span className="text-2xl">🌅</span>
          <div>
            <strong>Levantate temprano:</strong> Las primeras horas del día son oro puro.
          </div>
        </li>
        <li className="flex gap-3">
          <span className="text-2xl">💧</span>
          <div>
            <strong>Hidrátate:</strong> Empezá el día con agua. Simple pero poderoso.
          </div>
        </li>
        <li className="flex gap-3">
          <span className="text-2xl">📝</span>
          <div>
            <strong>Planificá tu día:</strong> 5 minutos cada mañana cambian todo.
          </div>
        </li>
      </ul>

      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-gray-800 italic">
          "Somos lo que hacemos repetidamente. La excelencia, entonces, 
          no es un acto sino un hábito." - Aristóteles
        </p>
      </div>
    </div>
  );
};

export const habitosMetadata = {
  id: 2,
  title: "Hábitos Saludables",
  type: "document" as const,
  duration: "10 min"
};