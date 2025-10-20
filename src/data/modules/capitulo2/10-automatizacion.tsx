import React from 'react';

export const ConclusionTOContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🎓 Conclusión - Trabajar Online</h2>
      <p className="text-lg">Contenido de conclusión del capítulo...</p>
    </div>
  );
};

export const conclusionTOMetadata = {
  id: 10,
  title: "Conclusión - Trabajar Online",
  type: "document" as const,
  duration: "10 min"
};
