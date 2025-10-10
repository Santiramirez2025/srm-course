import React from 'react';

export const UpsellingContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">📈 Upselling y Cross-selling</h2>
      <p className="text-lg">Contenido del módulo de upselling...</p>
    </div>
  );
};

export const upsellingMetadata = {
  id: 9,
  title: "Upselling y Cross-selling",
  type: "document" as const,
  duration: "12 min"
};
