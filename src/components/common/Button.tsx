import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  tooltip?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  ariaLabel,
  tooltip
}) => {
  const isDisabled = disabled || loading;

  // Estilos base - MEJORADOS CON TOUCH MANIPULATION
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium rounded-xl
    transition-all duration-200 outline-none
    focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
    select-none relative overflow-hidden
    touch-manipulation
  `;

  // Variantes de color
  const variants = {
    primary: `
      bg-gradient-to-r from-amber-500 to-orange-600 text-white
      hover:from-amber-600 hover:to-orange-700
      active:from-amber-700 active:to-orange-800
      shadow-md hover:shadow-lg hover:-translate-y-0.5
      focus:ring-amber-500
      disabled:hover:shadow-md disabled:hover:translate-y-0
    `,
    secondary: `
      bg-white text-gray-700 border-2 border-gray-200
      hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50
      active:bg-amber-100
      shadow-sm hover:shadow-md
      focus:ring-amber-500
    `,
    ghost: `
      text-gray-700 bg-transparent
      hover:text-amber-600 hover:bg-amber-50
      active:bg-amber-100
      focus:ring-amber-500
    `,
    success: `
      bg-gradient-to-r from-green-500 to-emerald-600 text-white
      hover:from-green-600 hover:to-emerald-700
      active:from-green-700 active:to-emerald-800
      shadow-md hover:shadow-lg hover:-translate-y-0.5
      focus:ring-green-500
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 text-white
      hover:from-red-600 hover:to-red-700
      active:from-red-700 active:to-red-800
      shadow-md hover:shadow-lg hover:-translate-y-0.5
      focus:ring-red-500
    `,
    warning: `
      bg-gradient-to-r from-yellow-400 to-orange-500 text-white
      hover:from-yellow-500 hover:to-orange-600
      active:from-yellow-600 active:to-orange-700
      shadow-md hover:shadow-lg hover:-translate-y-0.5
      focus:ring-yellow-500
    `,
    outline: `
      bg-transparent text-amber-600 border-2 border-amber-500
      hover:bg-amber-500 hover:text-white
      active:bg-amber-600
      shadow-sm hover:shadow-md
      focus:ring-amber-500
    `
  };

  // Tamaños - OPTIMIZADOS PARA TOUCH TARGETS
  const sizes = {
    xs: 'px-3 py-2 text-xs sm:text-sm min-h-[44px]',              // 44px móvil
    sm: 'px-4 py-2.5 text-sm sm:text-base min-h-[44px]',          // 44px móvil
    md: 'px-5 py-3 text-base sm:text-lg min-h-[48px]',            // 48px móvil
    lg: 'px-6 py-3.5 text-lg sm:text-xl min-h-[52px]',            // 52px móvil
    xl: 'px-8 py-4 text-xl sm:text-2xl min-h-[56px] sm:min-h-[60px]' // 56-60px
  };

  // Tamaños de iconos según el tamaño del botón - RESPONSIVE
  const iconSizes = {
    xs: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
    sm: 'w-4 h-4 sm:w-[18px] sm:h-[18px]',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-7 sm:h-7',
    xl: 'w-7 h-7 sm:w-8 sm:h-8'
  };

  // Width completo
  const widthClass = fullWidth ? 'w-full' : '';

  // Contenido del botón
  const buttonContent = (
    <>
      {/* Efecto de brillo al hover */}
      {!isDisabled && (
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
      )}

      {/* Loading spinner */}
      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin flex-shrink-0`} />
      )}

      {/* Icono izquierdo */}
      {!loading && icon && iconPosition === 'left' && (
        <span className={`flex-shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
          {icon}
        </span>
      )}

      {/* Texto */}
      <span className="relative truncate font-semibold">{children}</span>

      {/* Icono derecho */}
      {!loading && icon && iconPosition === 'right' && (
        <span className={`flex-shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
          {icon}
        </span>
      )}
    </>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${!isDisabled && 'group active:scale-95'}
        ${className}
      `}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      title={tooltip}
      aria-busy={loading}
    >
      {buttonContent}
    </button>
  );
};

// Componente de grupo de botones - OPTIMIZADO
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  orientation = 'horizontal'
}) => {
  return (
    <div
      className={`
        inline-flex flex-wrap
        ${orientation === 'horizontal' ? 'flex-row gap-2 sm:gap-3' : 'flex-col gap-2 sm:gap-3'}
        ${className}
      `}
      role="group"
    >
      {children}
    </div>
  );
};

// Componente de botón icon-only - OPTIMIZADO PARA TOUCH
interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonProps['variant'];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  ariaLabel: string; // Requerido para accesibilidad
  tooltip?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  variant = 'ghost',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  ariaLabel,
  tooltip
}) => {
  const isDisabled = disabled || loading;

  // Estilos base - CON TOUCH MANIPULATION
  const baseStyles = `
    inline-flex items-center justify-center rounded-xl
    transition-all duration-200 outline-none
    focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
    select-none relative overflow-hidden
    touch-manipulation
  `;

  const variants = {
    primary: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-md hover:shadow-lg focus:ring-amber-500',
    secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-500 hover:text-amber-600 shadow-sm focus:ring-amber-500',
    ghost: 'text-gray-700 hover:text-amber-600 hover:bg-amber-50 focus:ring-amber-500',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg focus:ring-green-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg focus:ring-red-500',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-md hover:shadow-lg focus:ring-yellow-500',
    outline: 'bg-transparent text-amber-600 border-2 border-amber-500 hover:bg-amber-500 hover:text-white shadow-sm focus:ring-amber-500'
  };

  // Tamaños - TOUCH TARGETS PERFECTOS
  const sizes = {
    xs: 'min-w-[44px] min-h-[44px] p-2',         // 44x44px
    sm: 'min-w-[44px] min-h-[44px] p-2.5',       // 44x44px
    md: 'min-w-[48px] min-h-[48px] p-2.5',       // 48x48px
    lg: 'min-w-[52px] min-h-[52px] sm:min-w-[56px] sm:min-h-[56px] p-3',  // 52-56px
    xl: 'min-w-[56px] min-h-[56px] sm:min-w-[60px] sm:min-h-[60px] p-3.5' // 56-60px
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${!isDisabled && 'group active:scale-95 hover:-translate-y-0.5'}
        ${className}
      `}
      aria-label={ariaLabel}
      title={tooltip || ariaLabel}
      aria-busy={loading}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
      ) : (
        <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
};

// Estilos globales necesarios (añadir a tu CSS global si no existen)
const globalStyles = `
  /* Touch manipulation */
  .touch-manipulation {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    .group-hover\\:translate-x-\\[100\\%\\],
    .hover\\:-translate-y-0\\.5,
    .active\\:scale-95 {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }
`;