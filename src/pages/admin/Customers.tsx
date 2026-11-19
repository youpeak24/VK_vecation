import React, { useState, useEffect } from 'react';
import { Plus, Phone, Mail, MapPin, Crown, User, Calendar, DollarSign, X } from 'lucide-react';
import { api } from '../../services/api';
import { Customer } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Customer Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [notes, setNotes] = useState('');

  const loadCustomers = () => {
    setCustomers(api.customers.getAll());
  };

  useEffect(() => {
    loadCustomers();
    const handleUpdate = () => loadCustomers();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    api.customers.create({
      name,
      email,
      phone,
      city,
      state,
      notes,
      totalBookings: 0,
      totalSpent: 0,
      status: 'Active'
    });

    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setNotes('');
    setShowAddModal(false);
  };

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      header: 'Customer Details',
      sortable: true,
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 text-[#0866D9] font-heading font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
            {c.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-xs text-[#071B35]">{c.name}</span>
              {c.status === 'VIP' && (
                <span className="inline-flex items-center gap-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-200">
                  <Crown size={10} className="text-amber-500" /> VIP
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-0.5"><Phone size={10} /> {c.phone}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5"><MapPin size={10} /> {c.city}, {c.state}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Email Address',
      render: (c) => <span className="text-xs text-slate-600">{c.email}</span>
    },
    {
      key: 'totalBookings',
      header: 'Tours Taken',
      sortable: true,
      render: (c) => (
        <span className="font-heading font-bold text-xs text-[#071B35]">
          {c.totalBookings} {c.totalBookings === 1 ? 'Tour' : 'Tours'}
        </span>
      )
    },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      sortable: true,
      render: (c) => (
        <span className="font-heading font-bold text-xs text-emerald-700">
          {formatCurrency(c.totalSpent)}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (c) => (
        <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border ${
          c.status === 'VIP' ? 'bg-amber-50 text-amber-700 border-amber-200' :
          c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          {c.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCustomer(c)}
            className="px-2.5 py-1 text-xs font-semibold text-[#0866D9] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
          >
            Profile
          </button>
          <a
            href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 text-[11px] font-heading font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Customer Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete CRM profiles, travel histories, preferences, and direct communication logs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Customers Data Table */}
      <DataTable
        title="All Registered Travelers"
        description="Search by traveler name, telephone number, city, or email"
        data={customers}
        columns={columns}
        searchPlaceholder="Search customer by name or phone..."
        searchKey={(c) => `${c.name} ${c.phone} ${c.email} ${c.city}`}
      />

      {/* Customer Profile View Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0866D9] text-white flex items-center justify-center font-heading font-bold text-lg">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#071B35]">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Client since {selectedCustomer.createdAt}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Phone Number</span>
                  <span className="font-heading font-bold text-slate-800 text-xs mt-0.5 block">{selectedCustomer.phone}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Email</span>
                  <span className="font-heading font-bold text-slate-800 text-xs mt-0.5 block truncate">{selectedCustomer.email}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Location</span>
                  <span className="font-heading font-bold text-slate-800 text-xs mt-0.5 block">{selectedCustomer.city}, {selectedCustomer.state}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Lifetime Value</span>
                  <span className="font-heading font-bold text-emerald-700 text-xs mt-0.5 block">{formatCurrency(selectedCustomer.totalSpent)}</span>
                </div>
              </div>

              {selectedCustomer.notes && (
                <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                  <span className="font-heading font-bold text-blue-900 block mb-1">
                    Traveler Preferences & Special Notes:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedCustomer.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <a
                href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-heading font-bold transition-colors"
              >
                Send WhatsApp
              </a>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-heading font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-lg text-[#071B35]">Add New Traveler Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. S. Murugan"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98400 12345"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@gmail.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Chennai"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Tamil Nadu"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-slate-700 mb-1">Preferences / Dietary Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Prefers pure vegetarian, elderly assistance, etc."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-heading font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0866D9] text-white rounded-xl text-xs font-heading font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Customers;
