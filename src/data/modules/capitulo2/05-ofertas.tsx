import React from 'react';

export const OfertasContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">💎 Crear Ofertas Irresistibles</h2>
      <p className="text-lg">Contenido del módulo de ofertas...</p>
    </div>
  );
};

export const ofertasMetadata = {
  id: 5,
  title: "Crear Ofertas Irresistibles",
  type: "document" as const,
  duration: "16 min"
};
