import React from 'react';

export const FidelizacionContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">💝 Fidelización de Clientes</h2>
      <p className="text-lg">Contenido del módulo de fidelización...</p>
    </div>
  );
};

export const fidelizacionMetadata = {
  id: 8,
  title: "Fidelización de Clientes",
  type: "video" as const,
  duration: "16 min"
};
