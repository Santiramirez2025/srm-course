import React from 'react';

export const BrandingContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">✨ Personal Branding</h2>
      <p className="text-lg">Contenido del módulo de branding...</p>
    </div>
  );
};

export const brandingMetadata = {
  id: 4,
  title: "Personal Branding",
  type: "document" as const,
  duration: "18 min"
};
