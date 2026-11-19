import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ocean' | 'sunset' | 'navy' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'ocean',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-heading font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5'
  };

  const variantStyles = {
    ocean: 'bg-[#0866D9] hover:bg-[#064ea5] text-white focus:ring-[#0866D9] shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30',
    sunset: 'bg-[#FF8A38] hover:bg-[#e06c1d] text-white focus:ring-[#FF8A38] shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/30',
    navy: 'bg-[#071B35] hover:bg-[#040e1d] text-white focus:ring-[#071B35] shadow-navy-500/25 hover:shadow-lg hover:shadow-navy-900/30',
    outline: 'border-2 border-[#0866D9] text-[#0866D9] hover:bg-[#0866D9] hover:text-white focus:ring-[#0866D9]',
    ghost: 'text-[#142238] hover:bg-slate-100/80 focus:ring-slate-300 shadow-none',
    glass: 'bg-white/80 backdrop-blur-md border border-white/60 text-[#071B35] hover:bg-white hover:shadow-md'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
