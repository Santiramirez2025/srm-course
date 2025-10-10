import React from 'react';

export const PresentacionContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🎤 Presentación de Ofertas</h2>
      <p className="text-lg">Contenido del módulo de presentación...</p>
    </div>
  );
};

export const presentacionMetadata = {
  id: 6,
  title: "Presentación de Ofertas",
  type: "document" as const,
  duration: "14 min"
};
