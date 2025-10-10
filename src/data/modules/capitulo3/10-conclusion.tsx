import React from 'react';

export const ConclusionVentasContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">🎓 Conclusión - Vender con Propósito</h2>
      <p className="text-lg">Contenido de conclusión del capítulo...</p>
    </div>
  );
};

export const conclusionVentasMetadata = {
  id: 10,
  title: "Conclusión - Vender con Propósito",
  type: "document" as const,
  duration: "10 min"
};
