import React from 'react';

export const PsicologiaContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🧠 Psicología del Comprador</h2>
      <p className="text-lg">Contenido del módulo de psicología...</p>
    </div>
  );
};

export const psicologiaMetadata = {
  id: 2,
  title: "Psicología del Comprador",
  type: "video" as const,
  duration: "18 min"
};
