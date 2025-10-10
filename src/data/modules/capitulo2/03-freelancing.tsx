import React from 'react';

export const FreelancingContent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">💼 Freelancing 101</h2>
      <p className="text-lg">Contenido del módulo de freelancing...</p>
    </div>
  );
};

export const freelancingMetadata = {
  id: 3,
  title: "Freelancing 101",
  type: "video" as const,
  duration: "20 min"
};
