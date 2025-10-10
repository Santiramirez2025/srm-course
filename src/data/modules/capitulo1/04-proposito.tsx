import React from 'react';

export const PropositoContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🎯 Descubrir tu Propósito</h2>
      <p className="text-lg">Contenido del módulo de propósito...</p>
    </div>
  );
};

export const propositoMetadata = {
  id: 4,
  title: "Descubrir tu Propósito",
  type: "video" as const,
  duration: "18 min"
};
