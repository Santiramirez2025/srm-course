import React from 'react';

export const ObjecionesContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🛡️ Manejo de Objeciones</h2>
      <p className="text-lg">Contenido del módulo de objeciones...</p>
    </div>
  );
};

export const objecionesMetadata = {
  id: 5,
  title: "Manejo de Objeciones",
  type: "video" as const,
  duration: "17 min"
};
