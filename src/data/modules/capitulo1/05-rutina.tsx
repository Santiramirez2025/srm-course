import React from 'react';

export const RutinaContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">⏰ Rutina Diaria Efectiva</h2>
      <p className="text-lg">Contenido del módulo de rutina...</p>
    </div>
  );
};

export const rutinaMetadata = {
  id: 5,
  title: "Rutina Diaria Efectiva",
  type: "document" as const,
  duration: "15 min"
};
