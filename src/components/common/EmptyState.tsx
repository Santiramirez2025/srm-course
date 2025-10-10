import React from 'react';
import { BookOpen } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center">
      <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Selecciona un módulo
      </h3>
      <p className="text-gray-600">
        Elige un capítulo y luego un módulo para comenzar tu aprendizaje
      </p>
    </div>
  );
};