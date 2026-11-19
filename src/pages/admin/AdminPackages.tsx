import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Eye, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { TourPackage } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';

export const AdminPackages: React.FC = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);

  const loadPackages = () => {
    setPackages(api.packages.getAll());
  };

  useEffect(() => {
    loadPackages();
    const handleUpdate = () => loadPackages();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      api.packages.delete(id);
    }
  };

  const columns: Column<TourPackage>[] = [
    {
      key: 'title',
      header: 'Package Title & Destination',
      sortable: true,
      render: (p) => (
        <div className="flex items-center gap-3">
          <img
            src={p.featuredImage}
            alt={p.title}
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
          />
          <div>
            <span className="font-heading font-bold text-xs text-[#071B35] block line-clamp-1">
              {p.title}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-[#0866D9]" />
              {p.destination} • {p.isInternational ? 'International' : 'Domestic'}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (p) => (
        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
          {p.category}
        </span>
      )
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (p) => (
        <span className="text-xs font-semibold text-slate-700">
          {p.duration.days}D / {p.duration.nights}N
        </span>
      )
    },
    {
      key: 'price',
      header: 'Price (INR)',
      sortable: true,
      render: (p) => (
        <div>
          <span className="font-heading font-bold text-xs text-[#071B35] block">
            {formatCurrency(p.startingPrice || p.price || 0)}
          </span>
          {p.originalPrice && (
            <span className="text-[10px] text-slate-400 line-through">
              {formatCurrency(p.originalPrice)}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/packages/${p.slug}`}
            target="_blank"
            className="p-1.5 text-slate-500 hover:text-[#0866D9] hover:bg-blue-50 rounded-lg transition-colors"
            title="Preview Live on Website"
          >
            <Eye size={15} />
          </Link>
          <Link
            to={`/admin/packages/${p.id}/edit`}
            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Edit Package"
          >
            <Edit3 size={15} />
          </Link>
          <button
            onClick={() => handleDelete(p.id, p.title)}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Package"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
            Tour Package Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, pricing, and showcase holiday packages displayed on the public website.
          </p>
        </div>

        <Link
          to="/admin/packages/create"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm shadow-blue-500/25"
        >
          <Plus size={15} />
          <span>Create New Package</span>
        </Link>
      </div>

      <DataTable
        title="All Catalogued Packages"
        description="Changes made here are instantaneously updated across all public pages and menus"
        data={packages}
        columns={columns}
        searchPlaceholder="Search packages by title or destination..."
        searchKey={(p) => `${p.title} ${p.destination} ${p.category}`}
      />

    </div>
  );
};

export default AdminPackages;
