import React from 'react';

export const NichoContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🎯 Encontrar tu Nicho</h2>
      <p className="text-lg">Contenido del módulo de nicho...</p>
    </div>
  );
};

export const nichoMetadata = {
  id: 1,
  title: "Encontrar tu Nicho",
  type: "document" as const,
  duration: "15 min"
};
