import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Compass, MapPin, Eye, Star } from 'lucide-react';
import { api } from '../../services/api';
import { Destination } from '../../types';
import { DataTable, Column } from '../../components/admin/DataTable';
import { formatCurrency } from '../../utils/formatters';

export const AdminDestinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const loadDestinations = () => {
    setDestinations(api.destinations.getAll());
  };

  useEffect(() => {
    loadDestinations();
    const handleUpdate = () => loadDestinations();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const handleToggleFeatured = (id: string, current?: boolean) => {
    api.destinations.update(id, { isFeatured: !current });
  };

  const columns: Column<Destination>[] = [
    {
      key: 'name',
      header: 'Destination & Country',
      sortable: true,
      render: (d) => (
        <div className="flex items-center gap-3">
          <img
            src={d.heroImage}
            alt={d.name}
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
          />
          <div>
            <span className="font-heading font-bold text-xs text-[#071B35] block">
              {d.name}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-[#0866D9]" />
              {d.country} • {d.region}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'bestTimeToVisit',
      header: 'Best Travel Season',
      render: (d) => <span className="text-xs text-slate-700">{d.bestTimeToVisit}</span>
    },
    {
      key: 'startingPrice',
      header: 'Starting From',
      sortable: true,
      render: (d) => (
        <span className="font-heading font-bold text-xs text-emerald-700">
          {formatCurrency(d.startingPrice || 24500)}
        </span>
      )
    },
    {
      key: 'packagesCount',
      header: 'Available Tours',
      sortable: true,
      render: (d) => (
        <span className="text-xs font-semibold text-slate-700">
          {d.packagesCount ?? d.packageCount ?? 4} Packages
        </span>
      )
    },
    {
      key: 'isFeatured',
      header: 'Featured on Homepage',
      render: (d) => (
        <button
          onClick={() => handleToggleFeatured(d.id, Boolean(d.isFeatured))}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-heading font-bold transition-colors cursor-pointer ${
            d.isFeatured
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
          }`}
        >
          <Star size={11} className={d.isFeatured ? 'fill-amber-500 text-amber-500' : ''} />
          <span>{d.isFeatured ? 'Featured' : 'Standard'}</span>
        </button>
      )
    },
    {
      key: 'actions',
      header: 'Preview',
      render: (d) => (
        <Link
          to={`/destinations/${d.slug}`}
          target="_blank"
          className="p-1.5 text-slate-500 hover:text-[#0866D9] hover:bg-blue-50 rounded-lg transition-colors inline-block"
          title="Preview Destination Guide"
        >
          <Eye size={15} />
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-[#071B35]">
          Destination Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore and configure global and Indian travel hubs featured across VK Vacations.
        </p>
      </div>

      <DataTable
        title="Global Destinations"
        data={destinations}
        columns={columns}
        searchPlaceholder="Search destination or country..."
        searchKey={(d) => `${d.name} ${d.country} ${d.region}`}
      />

    </div>
  );
};

export default AdminDestinations;
