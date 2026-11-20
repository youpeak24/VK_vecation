import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Eye, Pencil, Sparkles, MapPin } from 'lucide-react';
import { api } from '../../services/api';
import { TemplePackage } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';

export const TemplePackages: React.FC = () => {
  const [templePackages, setTemplePackages] = useState<TemplePackage[]>([]);

  const loadPackages = () => {
    setTemplePackages(api.templePackages.getAll());
  };

  useEffect(() => {
    loadPackages();
    const handleUpdate = () => loadPackages();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove pilgrimage "${title}"?`)) {
      api.templePackages.delete(id);
    }
  };

  const columns: Column<TemplePackage>[] = [
    {
      key: 'title',
      header: 'Pilgrimage Circuit & Temples',
      sortable: true,
      render: (p) => (
        <div className="flex items-center gap-3">
          <img
            src={p.featuredImage}
            alt={p.title}
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-amber-200"
          />
          <div>
            <span className="font-heading font-bold text-xs text-[#071B35] block line-clamp-1">
              {p.title}
            </span>
            <span className="text-[11px] text-amber-800 flex items-center gap-1 mt-0.5 font-medium">
              <Sparkles size={11} className="text-amber-500" />
              {p.primaryTemple}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'deity',
      header: 'Deity',
      sortable: true,
      render: (p) => (
        <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-md font-heading font-bold">
          {p.deity}
        </span>
      )
    },
    {
      key: 'circuit',
      header: 'Sacred Circuit & State',
      render: (p) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 block">{p.circuit}</span>
          <span className="text-[11px] text-slate-400">{p.state}</span>
        </div>
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
      key: 'startingPrice',
      header: 'Starting Rate',
      sortable: true,
      render: (p) => (
        <span className="font-heading font-bold text-xs text-[#071B35]">
          {formatCurrency(p.startingPrice)}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/temple-tours/${p.slug}`}
            target="_blank"
            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Preview Live Pilgrimage"
          >
            <Eye size={15} />
          </Link>
          <Link
            to={`/admin/temple-packages/${p.id}/edit`}
            className="p-1.5 text-slate-500 hover:text-[#0866D9] hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Pilgrimage"
          >
            <Pencil size={15} />
          </Link>
          <button
            onClick={() => handleDelete(p.id, p.title)}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Pilgrimage"
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
            Temple Tours & Pilgrimages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage sacred circuits across Tamil Nadu and South India with VIP darshan passes and Satvik catering.
          </p>
        </div>

        <Link
          to="/admin/temple-packages/create"
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm shadow-amber-600/25"
        >
          <Plus size={15} />
          <span>Add Temple Package</span>
        </Link>
      </div>

      <DataTable
        title="Active Spiritual Circuits"
        description="All temple packages published to /temple-tours"
        data={templePackages}
        columns={columns}
        searchPlaceholder="Search pilgrimage by deity, temple, or circuit..."
        searchKey={(p) => `${p.title} ${p.deity} ${p.circuit} ${p.primaryTemple}`}
      />

    </div>
  );
};

export default TemplePackages;
