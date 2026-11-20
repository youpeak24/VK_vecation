import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PackageCard } from '../packages/PackageCard';
import { usePackages } from '../../hooks/useContent';

export const TrendingPackages: React.FC = () => {
  const allPackages = usePackages();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Domestic' | 'International' | 'Honeymoon' | 'Family' | 'Luxury'>('All');

  const filteredPackages = allPackages.filter((pkg) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Domestic') return !pkg.isInternational;
    if (activeFilter === 'International') return pkg.isInternational;
    if (activeFilter === 'Honeymoon') return pkg.category.includes('Honeymoon');
    if (activeFilter === 'Family') return Boolean(pkg.suitableFor?.includes('Family'));
    if (activeFilter === 'Luxury') return pkg.category.includes('Luxury');
    return true;
  });

  const filters = [
    { label: 'All Packages', key: 'All' },
    { label: 'Domestic (India)', key: 'Domestic' },
    { label: 'International', key: 'International' },
    { label: 'Honeymoon Escapes', key: 'Honeymoon' },
    { label: 'Family Specials', key: 'Family' },
    { label: 'Luxury Collections', key: 'Luxury' }
  ] as const;

  return (
    <section className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <Sparkles size={13} />
              <span>HANDPICKED FOR 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
              TRENDING <span className="text-[#0866D9]">DESTINATIONS</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2">
              Discover the places everyone is dreaming about — with transparent pricing and verified itineraries.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] hover:text-[#064ea5] group"
          >
            <span>Browse Complete Portfolio</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === filter.key
                  ? 'bg-[#0866D9] text-white shadow-md shadow-blue-500/25 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.slice(0, 6).map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>

        {/* Bottom CTA to see all */}
        <div className="mt-14 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#071B35] hover:bg-[#040e1d] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
          >
            <span>VIEW ALL AVAILABLE HOLIDAYS</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
};
