import React from 'react';

export const CopywritingContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">✍️ Copywriting Persuasivo</h2>
      <p className="text-lg">Contenido del módulo de copywriting...</p>
    </div>
  );
};

export const copywritingMetadata = {
  id: 3,
  title: "Copywriting Persuasivo",
  type: "document" as const,
  duration: "16 min"
};
