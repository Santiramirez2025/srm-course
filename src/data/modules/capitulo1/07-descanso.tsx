import React from 'react';

export const DescansoContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">😴 Descanso y Recuperación</h2>
      <p className="text-lg">Contenido del módulo de descanso...</p>
    </div>
  );
};

export const descansoMetadata = {
  id: 7,
  title: "Descanso y Recuperación",
  type: "document" as const,
  duration: "10 min"
};
