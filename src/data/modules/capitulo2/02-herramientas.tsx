import React from 'react';

export const HerramientasContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🛠️ Herramientas Esenciales</h2>
      <p className="text-lg">Contenido del módulo de herramientas...</p>
    </div>
  );
};

export const herramientasMetadata = {
  id: 2,
  title: "Herramientas Esenciales",
  type: "document" as const,
  duration: "12 min"
};
