import React from 'react';
import { Play, BookOpen, Clock, Award } from 'lucide-react';
import { Button } from '@components/common/Button';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  title: string;
  subtitle: string;
  onStartCourse: () => void;
  courseProgress?: {
    total: number;
    completed: number;
    percentage: number;
  };
  stats?: {
    totalModules?: number;
    estimatedHours?: number;
    completionRate?: number;
  };
  logo?: string; // URL o letra
}

export const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  onStartCourse,
  courseProgress,
  stats,
  logo = 'S'
}) => {
  const { t } = useTranslation();
  const hasStarted = courseProgress && courseProgress.completed > 0;
  const isCompleted = courseProgress && courseProgress.percentage === 100;

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="text-center">
        {/* Logo/Icono */}
        <div className="mb-8 inline-block">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl sm:text-5xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
              {logo.length === 1 ? (
                logo
              ) : (
                <img src={logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
              )}
            </div>
          </div>
        </div>

        {/* Badge de estado (si ya comenzó el curso) */}
        {hasStarted && !isCompleted && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4 animate-fade-in">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            {t('hero.inProgress')}
          </div>
        )}

        {isCompleted && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4 animate-fade-in">
            <Award size={16} />
            {t('hero.completed')}
          </div>
        )}

        {/* Título */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
          {title}
        </h1>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          {subtitle}
        </p>

        {/* Barra de progreso (si ya comenzó) */}
        {hasStarted && courseProgress && (
          <div className="max-w-md mx-auto mb-8 animate-fade-in-up animation-delay-300">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{t('hero.yourProgress')}</span>
              <span className="font-bold text-amber-600">
                {courseProgress.completed}/{courseProgress.total} {t('hero.modules')}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end"
                style={{ width: `${courseProgress.percentage}%` }}
              >
                {courseProgress.percentage > 10 && (
                  <span className="text-xs font-bold text-white mr-2">
                    {courseProgress.percentage}%
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Botón principal */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-400">
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCourse}
            icon={<Play size={24} />}
            className="transform hover:-translate-y-1 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
          >
            {isCompleted 
              ? t('hero.reviewCourse')
              : hasStarted 
                ? t('hero.continueCourse') 
                : t('hero.startCourse')}
          </Button>
        </div>

        {/* Estadísticas del curso */}
        {stats && (
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-500">
            {stats.totalModules && (
              <div className="flex items-center gap-3 text-gray-600 group">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={24} className="text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.totalModules}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('hero.modules')}
                  </div>
                </div>
              </div>
            )}

            {stats.estimatedHours && (
              <div className="flex items-center gap-3 text-gray-600 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock size={24} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.estimatedHours}h
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('hero.duration')}
                  </div>
                </div>
              </div>
            )}

            {stats.completionRate !== undefined && (
              <div className="flex items-center gap-3 text-gray-600 group">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award size={24} className="text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.completionRate}%
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('hero.completion')}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Estilos para animaciones */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};