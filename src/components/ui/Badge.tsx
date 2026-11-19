import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ocean' | 'teal' | 'sunset' | 'navy' | 'yellow' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'ocean',
  size = 'md',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wide',
    md: 'text-xs px-3 py-1 font-medium'
  };

  const variantStyles = {
    ocean: 'bg-[#EAF6FF] text-[#0866D9] border border-[#0866D9]/20',
    teal: 'bg-[#d6f8f5] text-[#008f83] border border-[#00B8A9]/20',
    sunset: 'bg-orange-50 text-[#FF8A38] border border-orange-200',
    navy: 'bg-[#071B35] text-white',
    yellow: 'bg-amber-50 text-amber-800 border border-amber-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-heading font-semibold uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
