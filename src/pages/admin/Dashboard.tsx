import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  Sparkles, 
  Plus, 
  Download, 
  MapPin, 
  Phone, 
  TicketCheck, 
  Clock, 
  MessageSquare
} from 'lucide-react';
import { api } from '../../services/api';
import { authService } from '../../services/auth';
import { StatCard } from '../../components/admin/StatCard';
import { RevenueAreaChart, StatusDonutChart } from '../../components/admin/Charts';
import { formatCurrency } from '../../utils/formatters';
import { BookingRecord, EnquiryRecord } from '../../types';

export const Dashboard: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [metrics, setMetrics] = useState({
    totalRevenue: 8480000,
    totalBookingsCount: 128,
    activeEnquiriesCount: 14,
    totalCustomersCount: 382,
    pendingFollowUps: 8,
    conversionRate: 0
  });

  const [recentBookings, setRecentBookings] = useState<BookingRecord[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<EnquiryRecord[]>([]);

  useEffect(() => {
    const loadData = () => {
      setMetrics(api.reports.getOverviewMetrics());
      setRecentBookings(api.bookings.getAll().slice(0, 5));
      setRecentEnquiries(api.enquiries.getAll().slice(0, 5));
    };
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-[#0866D9] text-[11px] font-heading font-semibold mb-2">
            <Sparkles size={13} />
            <span>VK Vacations Operations Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Welcome back, {currentUser?.name || 'Administrator'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here is your live travel performance overview for today, {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/packages/create"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm shadow-blue-500/20"
          >
            <Plus size={15} />
            <span>Create Package</span>
          </Link>
          <Link
            to="/admin/reports"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-heading font-semibold transition-colors"
          >
            <Download size={15} />
            <span>Export</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue (YTD)"
          value={formatCurrency(metrics.totalRevenue)}
          icon={CreditCard}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Active Bookings"
          value={metrics.totalBookingsCount}
          icon={TicketCheck}
          iconColor="text-[#0866D9]"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="New Tour Inquiries"
          value={metrics.activeEnquiriesCount}
          icon={MessageSquare}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Lead Conversion Rate"
          value={`${metrics.conversionRate}%`}
          icon={TrendingUp}
          iconColor="text-[#00B8A9]"
          iconBg="bg-teal-50"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueAreaChart />
        </div>
        <div className="lg:col-span-1">
          <StatusDonutChart />
        </div>
      </div>

      {/* Operational Two-Column Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Bookings Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-[#071B35]">
                  Recent Bookings
                </h3>
                <p className="text-xs text-slate-400">Latest confirmed & pending guest departures</p>
              </div>
              <Link to="/admin/bookings" className="text-xs font-heading font-bold text-[#0866D9] hover:underline flex items-center gap-1">
                <span>View all</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentBookings.map((bkg) => (
                <div key={bkg.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-xs text-[#071B35]">
                        {bkg.customerName}
                      </span>
                      <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(bkg.bookingStatus || bkg.status || 'Confirmed')}`}>
                        {bkg.bookingStatus || bkg.status || 'Confirmed'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 block truncate max-w-xs mt-0.5">
                      {bkg.packageTitle}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Travel Date: {bkg.travelDate} • {bkg.passengers || bkg.guestsCount || 1} Adults
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-heading font-bold text-[#071B35] block">
                      {formatCurrency(bkg.totalAmount)}
                    </span>
                    <Link
                      to={`/admin/bookings/${bkg.id}`}
                      className="text-[11px] text-[#0866D9] font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Enquiries & Leads */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-[#071B35]">
                  Live Website Inquiries
                </h3>
                <p className="text-xs text-slate-400">Fresh leads arriving from the public website</p>
              </div>
              <Link to="/admin/enquiries" className="text-xs font-heading font-bold text-[#0866D9] hover:underline flex items-center gap-1">
                <span>View all</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-xs text-[#071B35]">
                        {enq.name || enq.customerName}
                      </span>
                      <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold border border-blue-200">
                        {enq.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      Interested in: <strong className="text-slate-800">{enq.packageTitle || enq.destination}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Phone size={10} /> {enq.phone} • {enq.travelersCount || enq.travelers || 2} Pax
                    </span>
                  </div>

                  <div className="shrink-0 text-right">
                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[11px] font-heading font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-block"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
