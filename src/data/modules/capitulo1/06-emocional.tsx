import React from 'react';

export const EmocionalContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">❤️ Gestión Emocional</h2>
      <p className="text-lg">Contenido del módulo de gestión emocional...</p>
    </div>
  );
};

export const emocionalMetadata = {
  id: 6,
  title: "Gestión Emocional",
  type: "document" as const,
  duration: "14 min"
};
