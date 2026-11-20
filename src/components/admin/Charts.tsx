import React, { useMemo, useSyncExternalStore } from 'react';
import { formatCurrency } from '../../utils/formatters';
import { subscribeDb } from '../../lib/firebase/events';
import { stores } from '../../lib/firebase/stores';

/** Re-render whenever the underlying Firestore collection changes. */
function useLive<T extends { id: string }>(store: { snapshot(): readonly T[] }): readonly T[] {
  return useSyncExternalStore(subscribeDb, () => store.snapshot(), () => store.snapshot());
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface RevenuePoint {
  month: string;
  revenue: number;
}

/** Real revenue: payments received, grouped by month for the last 12 months. */
export const RevenueAreaChart: React.FC<{ data?: RevenuePoint[] }> = ({ data }) => {
  const payments = useLive(stores.payments);

  const chartData = useMemo<RevenuePoint[]>(() => {
    if (data) return data;
    const now = new Date();
    const buckets = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      return { key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, month: MONTHS[d.getMonth()], revenue: 0 };
    });
    for (const payment of payments) {
      if (payment.status === 'Failed' || !payment.date) continue;
      const bucket = buckets.find((b) => payment.date!.startsWith(b.key));
      if (bucket) bucket.revenue += payment.amount || 0;
    }
    return buckets.map(({ month, revenue }) => ({ month, revenue }));
  }, [data, payments]);

  const total = chartData.reduce((sum, d) => sum + d.revenue, 0);
  const maxRevenue = Math.max(1, ...chartData.map((d) => d.revenue));

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-heading font-bold text-base text-[#071B35]">Revenue, Last 12 Months</h4>
          <p className="text-xs text-slate-400">Payments received, in INR</p>
        </div>
        <span className="text-xs font-heading font-bold px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg">
          {formatCurrency(total)}
        </span>
      </div>

      {total === 0 ? (
        <div className="h-48 flex items-center justify-center text-xs text-slate-400 border-b border-slate-100">
          No payments recorded yet. Revenue will appear here as payments are added.
        </div>
      ) : (
        <div className="h-48 flex items-end gap-2 pt-6 pb-2 border-b border-slate-100">
          {chartData.map((item, idx) => {
            const heightPercent = item.revenue === 0 ? 3 : Math.max(8, Math.round((item.revenue / maxRevenue) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#071B35] text-white text-[10px] font-bold px-2 py-1 rounded-md pointer-events-none whitespace-nowrap z-20 shadow-md">
                  {formatCurrency(item.revenue)}
                </div>
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
      )}
    </div>
  );
};

const STATUSES = [
  { label: 'Confirmed', color: 'bg-emerald-500', hex: '#10B981' },
  { label: 'Pending', color: 'bg-amber-500', hex: '#F59E0B' },
  { label: 'In Progress', color: 'bg-sky-500', hex: '#0EA5E9' },
  { label: 'Completed', color: 'bg-[#0866D9]', hex: '#0866D9' },
  { label: 'Cancelled', color: 'bg-rose-500', hex: '#EF4444' },
] as const;

/** Real booking status distribution, drawn as a donut. */
export const StatusDonutChart: React.FC = () => {
  const bookings = useLive(stores.bookings);

  const stats = useMemo(
    () =>
      STATUSES.map((s) => ({
        ...s,
        count: bookings.filter((b) => (b.status ?? b.bookingStatus) === s.label).length,
      })),
    [bookings],
  );
  const total = stats.reduce((acc, s) => acc + s.count, 0);

  // Donut segments as stroke-dasharray slices of a 100-unit circumference.
  let offset = 0;
  const segments = stats
    .filter((s) => s.count > 0)
    .map((s) => {
      const length = (s.count / total) * 100;
      const segment = { hex: s.hex, dash: `${length} ${100 - length}`, offset: -offset };
      offset += length;
      return segment;
    });

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <h4 className="font-heading font-bold text-base text-[#071B35]">Booking Status Distribution</h4>
        <p className="text-xs text-slate-400">
          {total === 0 ? 'No bookings yet' : `Total volume of ${total} booked itineraries`}
        </p>
      </div>

      <div className="my-6 flex items-center justify-center relative">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#F1F5F9" strokeWidth="3.5" />
          {segments.map((seg) => (
            <circle
              key={seg.hex}
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              stroke={seg.hex}
              strokeWidth="3.5"
              strokeDasharray={seg.dash}
              strokeDashoffset={seg.offset}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-heading font-black text-[#071B35]">{total}</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Bookings</span>
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
