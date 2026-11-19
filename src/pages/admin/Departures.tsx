import React, { useState, useEffect } from 'react';
import { Plus, PlaneTakeoff, Calendar, Users, MapPin, X } from 'lucide-react';
import { api } from '../../services/api';
import { DepartureRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';

export const Departures: React.FC = () => {
  const [departures, setDepartures] = useState<DepartureRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [packageTitle, setPackageTitle] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [exCity, setExCity] = useState('Chennai / Bangalore');
  const [totalSeats, setTotalSeats] = useState<number>(30);
  const [pricePerPax, setPricePerPax] = useState<number>(75000);

  const loadDepartures = () => {
    setDepartures(api.departures.getAll());
  };

  useEffect(() => {
    loadDepartures();
    const handleUpdate = () => loadDepartures();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleAddDeparture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageTitle || !departureDate) return;

    api.departures.create({
      packageId: `pkg-${Date.now()}`,
      packageTitle,
      departureDate,
      returnDate: returnDate || departureDate,
      exCity,
      totalSeats: Number(totalSeats),
      bookedSeats: 0,
      pricePerPax: Number(pricePerPax),
      status: 'Available'
    });

    setPackageTitle('');
    setDepartureDate('');
    setReturnDate('');
    setShowAddModal(false);
  };

  const columns: Column<DepartureRecord>[] = [
    {
      key: 'packageTitle',
      header: 'Group Tour Itinerary',
      sortable: true,
      render: (d) => (
        <div>
          <span className="font-heading font-bold text-xs text-[#071B35] block">{d.packageTitle}</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin size={11} className="text-[#FF8A38]" /> Ex-Hubs: {d.exCity}
          </span>
        </div>
      )
    },
    {
      key: 'departureDate',
      header: 'Departure & Return Dates',
      sortable: true,
      render: (d) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-700">
          <Calendar size={13} className="text-[#0866D9]" />
          <span>{d.departureDate}</span>
          {d.returnDate && <span className="text-slate-400">to {d.returnDate}</span>}
        </div>
      )
    },
    {
      key: 'pricePerPax',
      header: 'Fare Per Pax',
      sortable: true,
      render: (d) => (
        <span className="font-heading font-bold text-xs text-[#071B35]">
          {formatCurrency(d.pricePerPax || d.pricePerPerson || 0)}
        </span>
      )
    },
    {
      key: 'seatInventory',
      header: 'Seat Capacity & Occupancy',
      render: (d) => {
        const booked = d.bookedSeats ?? (d.totalSeats - (d.availableSeats ?? 0));
        const total = d.totalSeats || 30;
        const percent = Math.min(100, Math.round((booked / total) * 100));
        const seatsLeft = Math.max(0, total - booked);
        return (
          <div className="w-36">
            <div className="flex justify-between text-[11px] mb-1 font-medium">
              <span className="text-slate-600">{booked}/{total} Booked</span>
              <span className="text-emerald-700 font-bold">{seatsLeft} Left</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                style={{ width: `${percent}%` }}
                className={`h-full rounded-full ${
                  percent >= 90 ? 'bg-rose-500' : percent >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
            </div>
          </div>
        );
      }
    },
    {
      key: 'status',
      header: 'Batch Status',
      sortable: true,
      render: (d) => (
        <span className={`text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full border ${
          d.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          d.status === 'Filling Fast' ? 'bg-amber-50 text-amber-700 border-amber-200' :
          'bg-rose-50 text-rose-700 border-rose-200'
        }`}>
          {d.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Group Departures Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Scheduled fixed departure tours with dedicated South Indian tour managers and verified flights.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>New Departure Batch</span>
        </button>
      </div>

      <DataTable
        title="Scheduled Fixed Departures"
        data={departures}
        columns={columns}
        searchPlaceholder="Search departure by tour title or city..."
        searchKey={(d) => `${d.packageTitle} ${d.exCity} ${d.departureDate}`}
      />

      {/* Add Departure Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-lg text-[#071B35]">Schedule Group Departure</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddDeparture} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={packageTitle}
                  onChange={(e) => setPackageTitle(e.target.value)}
                  placeholder="e.g. European Extravaganza 12D"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Departure Date *</label>
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Ex-City Hub</label>
                  <input
                    type="text"
                    value={exCity}
                    onChange={(e) => setExCity(e.target.value)}
                    placeholder="Chennai / Bangalore"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Total Seats</label>
                  <input
                    type="number"
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Price Per Person (₹)</label>
                <input
                  type="number"
                  value={pricePerPax}
                  onChange={(e) => setPricePerPax(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                />
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
                  Schedule Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Departures;
