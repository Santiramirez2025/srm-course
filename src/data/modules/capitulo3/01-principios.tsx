import React from 'react';

export const PrincipiosContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">📚 Principios de Venta</h2>
      <p className="text-lg">Contenido del módulo de principios...</p>
    </div>
  );
};

export const principiosMetadata = {
  id: 1,
  title: "Principios de Venta",
  type: "document" as const,
  duration: "14 min"
};
