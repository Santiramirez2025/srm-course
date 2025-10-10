import React from 'react';

export const ProductividadContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">⚡ Productividad Digital</h2>
      <p className="text-lg">Contenido del módulo de productividad...</p>
    </div>
  );
};

export const productividadMetadata = {
  id: 6,
  title: "Productividad Digital",
  type: "video" as const,
  duration: "17 min"
};
