import React from 'react';

export const EnergiaContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">⚡ Gestión de Energía</h2>
      <p className="text-lg">Contenido del módulo de energía...</p>
    </div>
  );
};

export const energiaMetadata = {
  id: 8,
  title: "Gestión de Energía",
  type: "video" as const,
  duration: "16 min"
};
