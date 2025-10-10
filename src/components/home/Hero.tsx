import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@components/common/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  onStartCourse: () => void;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, onStartCourse }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-lg">
          S
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={onStartCourse}
        icon={<Play size={24} />}
        className="transform hover:-translate-y-0.5"
      >
        Ver Curso Completo
      </Button>
    </div>
  );
};