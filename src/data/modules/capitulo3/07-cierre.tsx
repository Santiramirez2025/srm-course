import React from 'react';

export const CierreContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🤝 Técnicas de Cierre</h2>
      <p className="text-lg">Contenido del módulo de cierre...</p>
    </div>
  );
};

export const cierreMetadata = {
  id: 7,
  title: "Técnicas de Cierre",
  type: "document" as const,
  duration: "13 min"
};
