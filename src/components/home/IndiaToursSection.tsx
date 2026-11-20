import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MapPin, Clock } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { IndiaRegion } from '../../types';
import { usePackages } from '../../hooks/useContent';

export const IndiaToursSection: React.FC = () => {
  const allPackages = usePackages();
  const [selectedRegion, setSelectedRegion] = useState<'All' | IndiaRegion>('All');

  const indiaPackages = allPackages.filter(p => !p.isInternational);

  const filteredPackages = indiaPackages.filter(p => {
    if (selectedRegion === 'All') return true;
    return p.region === selectedRegion;
  });

  const regions: ('All' | IndiaRegion)[] = [
    'All',
    'North India',
    'South India',
    'West India',
    'Islands'
  ];

  return (
    <section className="py-24 bg-[#071B35] text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#FF8A38]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#00B8A9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-[#FFC857] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <Sparkles size={13} />
              <span>DISCOVER MOTHER INDIA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
              INCREDIBLE INDIA.{' '}
              <span className="text-[#FF8A38]">UNFORGETTABLE EXPERIENCES.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl">
              From snow-kissed Himalayan passes to tranquil backwaters and royal desert fortresses.
            </p>
          </div>

          <Link
            to="/india-tours"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#00B8A9] hover:text-white transition-colors group"
          >
            <span>Explore All India Tours</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#FF8A38] text-white shadow-lg shadow-orange-500/25 scale-105'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {reg === 'All' ? 'All India' : reg}
            </button>
          ))}
        </div>

        {/* Asymmetric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Link
              key={pkg.id}
              to={`/packages/${pkg.slug}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-end"
            >
              <img
                src={pkg.featuredImage}
                alt={pkg.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071B35] via-[#071B35]/40 to-transparent group-hover:via-[#071B35]/60 transition-colors" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold bg-[#FF8A38] text-white uppercase tracking-wider">
                  {pkg.region}
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-heading font-semibold bg-black/50 backdrop-blur-md text-white">
                  {pkg.duration.days}D / {pkg.duration.nights}N
                </span>
              </div>

              <div className="relative z-10 p-6 text-white space-y-2">
                <div className="flex items-center gap-1 text-xs text-[#00B8A9] font-medium">
                  <MapPin size={13} />
                  <span>{pkg.destination}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-white group-hover:text-[#FFC857] transition-colors leading-snug">
                  {pkg.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                  {pkg.overview}
                </p>

                <div className="pt-2 flex items-baseline justify-between border-t border-white/15">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Starting from</span>
                    <span className="font-heading font-extrabold text-lg text-white">
                      {formatINR(pkg.startingPrice)}
                    </span>
                  </div>

                  <span className="text-xs font-heading font-bold text-[#FF8A38] group-hover:underline flex items-center gap-1">
                    <span>View Itinerary</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
