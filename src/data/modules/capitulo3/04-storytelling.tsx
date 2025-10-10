import React from 'react';

export const StorytellingContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">📖 Storytelling en Ventas</h2>
      <p className="text-lg">Contenido del módulo de storytelling...</p>
    </div>
  );
};

export const storytellingMetadata = {
  id: 4,
  title: "Storytelling en Ventas",
  type: "document" as const,
  duration: "15 min"
};
