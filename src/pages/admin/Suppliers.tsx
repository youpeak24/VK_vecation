import React, { useState, useEffect } from 'react';
import { Plus, Truck, Phone, Mail, MapPin, Star, X } from 'lucide-react';
import { api } from '../../services/api';
import { SupplierRecord } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';

export const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SupplierRecord['category']>('Hotel');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const loadSuppliers = () => {
    setSuppliers(api.suppliers.getAll());
  };

  useEffect(() => {
    loadSuppliers();
    const handleUpdate = () => loadSuppliers();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    api.suppliers.create({
      name,
      category: category as any,
      contactPerson,
      phone,
      email,
      city,
      rating: 4.8,
      status: 'Active',
      contractStatus: 'Active'
    });

    setName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setCity('');
    setShowAddModal(false);
  };

  const columns: Column<SupplierRecord>[] = [
    {
      key: 'name',
      header: 'Supplier / Vendor Name',
      sortable: true,
      render: (s) => (
        <div>
          <span className="font-heading font-bold text-xs text-[#071B35] block">{s.name}</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-[#0866D9]" /> {s.city}
          </span>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Vendor Category',
      sortable: true,
      render: (s) => (
        <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium border border-slate-200">
          {s.category}
        </span>
      )
    },
    {
      key: 'contactPerson',
      header: 'Contact Person & Phone',
      render: (s) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 block">{s.contactPerson}</span>
          <span className="text-[11px] text-slate-500">{s.phone}</span>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Email',
      render: (s) => <span className="text-xs text-slate-600">{s.email}</span>
    },
    {
      key: 'rating',
      header: 'Quality Rating',
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-1 text-xs font-heading font-bold text-slate-800">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span>{s.rating}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (s) => (
        <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded-full border ${
          s.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          {s.status}
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
            Suppliers & Vendor Partners
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Directory of vetted hotel chains, transport fleet providers, airlines, and licensed local guides.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Supplier</span>
        </button>
      </div>

      <DataTable
        title="Vendor Directory"
        data={suppliers}
        columns={columns}
        searchPlaceholder="Search vendor by name, category, or city..."
        searchKey={(s) => `${s.name} ${s.category} ${s.city} ${s.contactPerson}`}
      />

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-heading font-bold text-lg text-[#071B35]">Add Vendor Partner</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Company / Vendor Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radisson Blu Resort & Spa"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Hotel">Hotel / Resort</option>
                    <option value="Transport">Transport / Coach</option>
                    <option value="Airline">Airlines</option>
                    <option value="Guide">Tour Guide Service</option>
                  </select>
                </div>
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Location / Hub</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Malé, Maldives"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Anandha Kumar"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-heading font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94440 12345"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-heading font-bold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reservations@hotel.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
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
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Suppliers;
