import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface RevenuePoint {
  month: string;
  revenue: number;
}

export const RevenueAreaChart: React.FC<{ data?: RevenuePoint[] }> = ({ data }) => {
  const defaultData: RevenuePoint[] = [
    { month: 'Jun', revenue: 640000 },
    { month: 'Jul', revenue: 820000 },
    { month: 'Aug', revenue: 790000 },
    { month: 'Sep', revenue: 950000 },
    { month: 'Oct', revenue: 1280000 },
    { month: 'Nov', revenue: 1650000 },
    { month: 'Dec', revenue: 2150000 },
    { month: 'Jan', revenue: 1840000 },
    { month: 'Feb', revenue: 1420000 },
    { month: 'Mar', revenue: 1980000 },
    { month: 'Apr', revenue: 2450000 },
    { month: 'May', revenue: 2890000 }
  ];

  const chartData = data || defaultData;
  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-heading font-bold text-base text-[#071B35]">
            Annual Revenue Growth
          </h4>
          <p className="text-xs text-slate-400">Total bookings and inquiries fulfilled in INR</p>
        </div>
        <span className="text-xs font-heading font-bold px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
          +34.2% YoY
        </span>
      </div>

      {/* SVG Bar / Area visualization */}
      <div className="h-48 flex items-end gap-2 pt-6 pb-2 border-b border-slate-100">
        {chartData.map((item, idx) => {
          const heightPercent = Math.max(12, Math.round((item.revenue / maxRevenue) * 100));
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
              {/* Tooltip on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#071B35] text-white text-[10px] font-bold px-2 py-1 rounded-md pointer-events-none whitespace-nowrap z-20 shadow-md">
                {formatCurrency(item.revenue)}
              </div>

              {/* Bar */}
              <div 
                style={{ height: `${heightPercent}%` }}
                className="w-full bg-gradient-to-t from-[#0866D9] to-[#00B8A9] rounded-t-lg group-hover:from-blue-600 group-hover:to-teal-400 transition-all duration-300"
              />
              <span className="text-[10px] text-slate-400 group-hover:text-slate-800 transition-colors font-medium">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StatusDonutChart: React.FC = () => {
  const stats = [
    { label: 'Confirmed', count: 48, color: 'bg-emerald-500', hex: '#10B981' },
    { label: 'Pending', count: 18, color: 'bg-amber-500', hex: '#F59E0B' },
    { label: 'Completed', count: 62, color: 'bg-[#0866D9]', hex: '#0866D9' },
    { label: 'Cancelled', count: 4, color: 'bg-rose-500', hex: '#EF4444' }
  ];

  const total = stats.reduce((acc, s) => acc + s.count, 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <h4 className="font-heading font-bold text-base text-[#071B35]">
          Booking Status Distribution
        </h4>
        <p className="text-xs text-slate-400">Total volume of {total} booked itineraries</p>
      </div>

      <div className="my-6 flex items-center justify-center relative">
        {/* SVG Circular Ring */}
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth="3.5"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#10B981"
            strokeWidth="3.5"
            strokeDasharray="36 64"
            strokeDashoffset="0"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#0866D9"
            strokeWidth="3.5"
            strokeDasharray="46 54"
            strokeDashoffset="-36"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeDasharray="14 86"
            strokeDashoffset="-82"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-heading font-black text-[#071B35]">{total}</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Tours</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
            <span className="text-xs text-slate-600">{s.label}:</span>
            <span className="text-xs font-heading font-bold text-slate-900">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
