import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TicketCheck, Eye, Calendar, DollarSign, Users, X } from 'lucide-react';
import { api } from '../../services/api';
import { BookingRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [packageTitle, setPackageTitle] = useState('Maldives Overwater Bliss');
  const [travelDate, setTravelDate] = useState('2026-04-10');
  const [passengers, setPassengers] = useState<number>(2);
  const [totalAmount, setTotalAmount] = useState<number>(177000);
  const [paidAmount, setPaidAmount] = useState<number>(177000);

  const loadBookings = () => {
    setBookings(api.bookings.getAll());
  };

  useEffect(() => {
    loadBookings();
    const handleUpdate = () => loadBookings();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleStatusChange = (id: string, newStatus: any) => {
    api.bookings.updateStatus(id, newStatus);
  };

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !packageTitle) return;

    api.bookings.create({
      customerId: `cust-${Date.now()}`,
      customerName,
      customerPhone: '+91 98400 00000',
      customerEmail: 'guest@vkvacations.com',
      destination: packageTitle,
      returnDate: travelDate,
      balanceAmount: Math.max(0, Number(totalAmount) - Number(paidAmount)),
      packageTitle,
      travelDate,
      guestsCount: Number(passengers),
      passengers: Number(passengers),
      totalAmount: Number(totalAmount),
      paidAmount: Number(paidAmount),
      status: 'Confirmed',
      bookingStatus: 'Confirmed',
      paymentStatus: Number(paidAmount) >= Number(totalAmount) ? 'Paid in Full' : 'Partially Paid'
    } as any);

    setCustomerName('');
    setShowAddModal(false);
  };

  const columns: Column<BookingRecord>[] = [
    {
      key: 'bookingRef',
      header: 'Booking Ref & Traveler',
      sortable: true,
      render: (b) => (
        <div>
          <span className="font-mono text-xs font-bold text-[#0866D9] block">{b.bookingRef || b.bookingReference}</span>
          <span className="font-heading font-bold text-xs text-[#071B35] mt-0.5 block">{b.customerName}</span>
          <span className="text-[11px] text-slate-400">Created: {b.createdAt}</span>
        </div>
      )
    },
    {
      key: 'packageTitle',
      header: 'Tour Itinerary',
      sortable: true,
      render: (b) => (
        <div className="max-w-[220px]">
          <span className="text-xs font-semibold text-slate-800 line-clamp-1 block">{b.packageTitle}</span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
            <Calendar size={11} className="text-[#FF8A38]" /> {b.travelDate} • {b.passengers || b.guestsCount || 1} Pax
          </span>
        </div>
      )
    },
    {
      key: 'totalAmount',
      header: 'Amount / Paid',
      sortable: true,
      render: (b) => (
        <div>
          <span className="font-heading font-bold text-xs text-[#071B35] block">
            {formatCurrency(b.totalAmount)}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold">
            Paid: {formatCurrency(b.paidAmount)}
          </span>
        </div>
      )
    },
    {
      key: 'bookingStatus',
      header: 'Tour Status',
      sortable: true,
      render: (b) => {
        const curStatus = b.bookingStatus || b.status || 'Confirmed';
        return (
          <select
            value={curStatus}
            onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
            className={`text-xs font-heading font-bold rounded-lg px-2 py-1 border ${
              curStatus === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              curStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              curStatus === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        );
      }
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      sortable: true,
      render: (b) => (
        <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border ${
          b.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          b.paymentStatus === 'Partial' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          {b.paymentStatus}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Action',
      render: (b) => (
        <Link
          to={`/admin/bookings/${b.id}`}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-heading font-bold text-[#0866D9] hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Eye size={13} />
          <span>Voucher</span>
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Booking Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official travel vouchers, reservation statuses, customer manifests, and payment tracking.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>Create New Booking</span>
        </button>
      </div>

      <DataTable
        title="All Customer Bookings"
        data={bookings}
        columns={columns}
        searchPlaceholder="Search booking by ref, customer, or tour..."
        searchKey={(b) => `${b.bookingRef} ${b.customerName} ${b.packageTitle}`}
      />

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-lg text-[#071B35]">Create New Booking Voucher</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Dr. Karthik S."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Package Itinerary Title *</label>
                <input
                  type="text"
                  required
                  value={packageTitle}
                  onChange={(e) => setPackageTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Passengers</label>
                  <input
                    type="number"
                    min={1}
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Total Fare (₹)</label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Paid Amount (₹)</label>
                  <input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-heading font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0866D9] text-white rounded-xl font-heading font-bold"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Bookings;
