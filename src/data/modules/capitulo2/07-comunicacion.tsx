import React from 'react';

export const ComunicacionContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">💬 Comunicación Efectiva</h2>
      <p className="text-lg">Contenido del módulo de comunicación...</p>
    </div>
  );
};

export const comunicacionMetadata = {
  id: 7,
  title: "Comunicación Efectiva",
  type: "document" as const,
  duration: "14 min"
};
