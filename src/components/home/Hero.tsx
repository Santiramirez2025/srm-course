import React, { useEffect, useState } from 'react';
import { Play, BookOpen, Clock, Award, Sparkles, TrendingUp, Zap } from 'lucide-react';

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
  logo?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  onStartCourse,
  courseProgress,
  stats,
  logo = 'S'
}) => {
  const [mounted, setMounted] = useState(false);
  const hasStarted = courseProgress && courseProgress.completed > 0;
  const isCompleted = courseProgress && courseProgress.percentage === 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  const getMotivationalMessage = () => {
    if (!courseProgress) return '';
    const { percentage } = courseProgress;
    
    if (percentage < 25) return '🚀 Excelente inicio';
    if (percentage < 50) return '💪 Vas por buen camino';
    if (percentage < 75) return '🔥 Más de la mitad';
    if (percentage < 100) return '⭐ La meta está cerca';
    return '🏆 Logro completado';
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      
      <div className="relative text-center">
        
        {/* Premium Logo con mega glow */}
        <div className="mb-10 sm:mb-12 inline-block">
          <div className="relative group">
            {/* Mega glow layers */}
            <div 
              className="absolute -inset-6 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-orange-600 rounded-3xl blur-3xl transition-opacity duration-1000"
              style={{ opacity: mounted ? 0.5 : 0 }}
            />
            <div 
              className="absolute -inset-4 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
            />
            
            {/* Logo container premium */}
            <div 
              className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
              style={{ 
                transform: mounted ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
                opacity: mounted ? 1 : 0
              }}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
              
              <span className="text-white font-black text-5xl sm:text-6xl lg:text-7xl transition-transform duration-300 group-hover:scale-110">
                {logo.length === 1 ? logo : <img src={logo} alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain" />}
              </span>
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Sparkle particles */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        </div>

        {/* Status Badge Premium */}
        {hasStarted && !isCompleted && (
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border-2 border-purple-400/30 text-white rounded-full text-sm font-bold mb-8 shadow-2xl shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-400/50"
            style={{ 
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: '0.2s'
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
            </div>
            <span>En progreso</span>
            <Zap size={16} className="text-purple-400" />
          </div>
        )}

        {isCompleted && (
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-400/30 text-white rounded-full text-sm font-bold mb-8 shadow-2xl shadow-green-500/20 transition-all duration-300 hover:scale-105"
            style={{ 
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
              transitionDelay: '0.2s'
            }}
          >
            <Award size={18} className="text-green-400" />
            <span>Curso completado</span>
            <Sparkles size={16} className="text-green-400" />
          </div>
        )}

        {/* Title Premium con gradiente animado */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.05] tracking-tight px-4"
          style={{ 
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.3s',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
            {title}
          </span>
        </h1>

        {/* Subtitle Premium */}
        <p 
          className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-12 sm:mb-14 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-medium px-4"
          style={{ 
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.4s',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {subtitle}
        </p>

        {/* Progress Card Premium */}
        {hasStarted && courseProgress && (
          <div 
            className="max-w-xl mx-auto mb-12 sm:mb-14"
            style={{ 
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.5s',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-7 sm:p-8 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <span className="font-black text-white text-xl">Tu progreso</span>
                  </div>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                    {courseProgress.percentage}%
                  </span>
                </div>
                
                {/* Progress Bar Premium */}
                <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden mb-5 shadow-inner">
                  {/* Progress fill */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-purple-500/50"
                    style={{ 
                      width: `${courseProgress.percentage}%`
                    }}
                  >
                    {/* Shimmer effect */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ animation: 'shimmer 3s infinite' }}
                    />
                    
                    {/* Inner glow */}
                    {courseProgress.percentage > 0 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-sm opacity-50" />
                    )}
                  </div>

                  {/* Milestone markers */}
                  <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                    {[...Array(courseProgress.total)].map((_, i) => {
                      const milestonePercentage = ((i + 1) / courseProgress.total) * 100;
                      const isPassed = courseProgress.percentage >= milestonePercentage;
                      
                      return (
                        <div 
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isPassed 
                              ? 'bg-white shadow-lg shadow-white/50 scale-125' 
                              : 'bg-white/20'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
                
                {/* Stats row */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-semibold">
                    {courseProgress.completed} de {courseProgress.total} módulos
                  </span>
                  <span className="text-purple-400 font-bold flex items-center gap-2">
                    {getMotivationalMessage()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button Premium con mega effects */}
        <div 
          className="flex justify-center mb-14 sm:mb-16"
          style={{ 
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.6s',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <button
            onClick={onStartCourse}
            className="group relative px-10 py-5 sm:px-12 sm:py-6 font-black text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 min-w-[320px] overflow-hidden"
            type="button"
            aria-label={isCompleted ? "Revisar curso" : hasStarted ? "Continuar curso" : "Comenzar curso"}
          >
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl" />
            
            {/* Glow layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl blur-xl opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
            
            {/* Animated shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
            
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-2xl bg-white/10 scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" />
            
            <span className="relative flex items-center justify-center gap-3 text-white font-black">
              <Play size={24} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" fill="white" />
              {isCompleted ? 'Revisar curso' : hasStarted ? 'Continuar curso' : 'Comenzar curso'}
              <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Stats Grid Premium */}
        {stats && (
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto"
            style={{ 
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.7s',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {stats.totalModules && (
              <StatCard
                icon={BookOpen}
                value={stats.totalModules}
                label="Módulos"
                color="purple"
              />
            )}

            {stats.estimatedHours && (
              <StatCard
                icon={Clock}
                value={`${stats.estimatedHours}h`}
                label="Duración"
                color="blue"
              />
            )}

            {stats.completionRate !== undefined && (
              <StatCard
                icon={Award}
                value={`${stats.completionRate}%`}
                label="Completado"
                color="green"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// Stat Card Component Premium
interface StatCardProps {
  icon: React.ElementType;
  value: number | string;
  label: string;
  color: 'purple' | 'blue' | 'green';
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, color }) => {
  const colorClasses = {
    purple: {
      bg: 'from-purple-500/10 to-violet-500/10',
      border: 'border-purple-400/30',
      iconBg: 'from-purple-500 to-violet-600',
      iconShadow: 'shadow-purple-500/30',
      text: 'text-purple-400'
    },
    blue: {
      bg: 'from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-400/30',
      iconBg: 'from-blue-500 to-cyan-600',
      iconShadow: 'shadow-blue-500/30',
      text: 'text-blue-400'
    },
    green: {
      bg: 'from-green-500/10 to-emerald-500/10',
      border: 'border-green-400/30',
      iconBg: 'from-green-500 to-emerald-600',
      iconShadow: 'shadow-green-500/30',
      text: 'text-green-400'
    }
  };

  const classes = colorClasses[color];

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${classes.iconBg} rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300`} />
      
      {/* Card */}
      <div className={`relative flex items-center gap-4 px-6 py-5 bg-gradient-to-br ${classes.bg} border-2 ${classes.border} backdrop-blur-xl rounded-2xl shadow-xl hover:scale-105 transition-all duration-300`}>
        <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${classes.iconBg} rounded-xl flex items-center justify-center shadow-lg ${classes.iconShadow}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex flex-col">
          <span className={`text-3xl font-black ${classes.text}`}>
            {value}
          </span>
          <span className="text-sm font-bold text-gray-300 uppercase tracking-wide">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};