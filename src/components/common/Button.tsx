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

  // Estilos base
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium rounded-xl
    transition-all duration-200 outline-none
    focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
    select-none relative overflow-hidden
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

  // Tamaños
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  // Tamaños de iconos según el tamaño del botón
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
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
      <span className="relative truncate">{children}</span>

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

// Componente de grupo de botones (bonus)
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
        inline-flex
        ${orientation === 'horizontal' ? 'flex-row gap-2' : 'flex-col gap-2'}
        ${className}
      `}
      role="group"
    >
      {children}
    </div>
  );
};

// Componente de botón icon-only (bonus)
interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
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

  const baseStyles = `
    inline-flex items-center justify-center rounded-xl
    transition-all duration-200 outline-none
    focus:ring-2 focus:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed
    select-none relative overflow-hidden
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

  const sizes = {
    xs: 'w-6 h-6 p-1',
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-14 h-14 p-3'
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
        <Loader2 className="w-full h-full animate-spin" />
      ) : (
        <span className="w-full h-full flex items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
};