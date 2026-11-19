import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp, Users, Calendar, DollarSign, Filter } from 'lucide-react';
import { api } from '../../services/api';
import { RevenueAreaChart, StatusDonutChart } from '../../components/admin/Charts';
import { formatCurrency } from '../../utils/formatters';

export const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '1y'>('1y');

  const topPackages = [
    { title: 'Maldives Overwater Bliss (5D/4N)', bookings: 42, revenue: 3717000 },
    { title: 'Swiss Alpine Wonder & Paris (7D/6N)', bookings: 28, revenue: 4424000 },
    { title: 'Arupadai Veedu Murugan Temples (6D/5N)', bookings: 36, revenue: 882000 },
    { title: 'Kashmir Paradise on Earth (6D/5N)', bookings: 24, revenue: 804000 },
    { title: 'Dubai Luxury Extravaganza (5D/4N)', bookings: 22, revenue: 1155000 }
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Package,Total Bookings,Total Revenue (INR)\n"
      + topPackages.map(p => `"${p.title}",${p.bookings},${p.revenue}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vk_vacations_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Reports & Business Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Revenue trends, popular destination analytics, customer retention, and exportable financial data.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Download size={15} />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueAreaChart />
        </div>
        <div className="lg:col-span-1">
          <StatusDonutChart />
        </div>
      </div>

      {/* Top Performing Packages Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
        <h3 className="font-heading font-bold text-base text-[#071B35] mb-4">
          Top Performing Tour Packages by Revenue
        </h3>
        
        <div className="divide-y divide-slate-100 text-xs">
          {topPackages.map((pkg, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-[#0866D9] font-heading font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <span className="font-heading font-bold text-xs text-[#071B35] block">{pkg.title}</span>
                  <span className="text-[11px] text-slate-400">{pkg.bookings} Bookings confirmed</span>
                </div>
              </div>
              <span className="font-heading font-bold text-emerald-700 text-sm">
                {formatCurrency(pkg.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Reports;
