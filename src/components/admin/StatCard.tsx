import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  iconColor = 'text-[#0866D9]',
  iconBg = 'bg-blue-50',
  subtitle
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-heading font-black text-[#071B35] tracking-tight">
          {value}
        </span>
        {change && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-heading font-bold px-1.5 py-0.5 rounded-md ${
            isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default StatCard;
