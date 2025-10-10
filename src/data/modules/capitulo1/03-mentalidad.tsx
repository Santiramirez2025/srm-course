import React from 'react';

export const MentalidadContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🧠 Mentalidad de Crecimiento</h2>
      <p className="text-lg">Contenido del módulo de mentalidad...</p>
    </div>
  );
};

export const mentalidadMetadata = {
  id: 3,
  title: "Mentalidad de Crecimiento",
  type: "document" as const,
  duration: "12 min"
};
