import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Globe2, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';

export const Destinations: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Domestic' | 'International'>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = DESTINATIONS.filter((d: any) => {
    if (filter === 'Domestic') return !d.isInternational;
    if (filter === 'International') return d.isInternational;
    return true;
  });

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="Destinations Travel Directory — Domestic & International Guides | VK Vacations"
        description="Comprehensive travel guides to Maldives, Switzerland, Dubai, Bali, Kashmir, Kerala, Singapore and Rajasthan. Weather, best time to visit, visa info and tour packages."
        keywords={["travel destinations guide", "holiday destinations from India", "best time to visit Maldives", "Switzerland travel guide", "Dubai tourism"]}
        canonical="/destinations"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Destinations", url: "/destinations" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Globe2 size={13} />
            <span>GLOBAL & DOMESTIC DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            EXPLORE <span className="text-[#0866D9]">DESTINATIONS</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            In-depth travel guides, weather insights, visa requirements, and curated packages across our top vacation spots.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            {(['All', 'Domestic', 'International'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-[#0866D9] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'Domestic' ? 'Incredible India' : tab === 'International' ? 'International' : 'All Gateways'}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest: any) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={dest.cardImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#071B35]">
                    {dest.isInternational ? 'International' : 'Domestic'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
                  <div className="flex items-center gap-1 font-medium">
                    <MapPin size={13} className="text-[#00B8A9]" />
                    <span>{dest.country}</span>
                  </div>
                  <span className="text-[11px] bg-black/50 px-2.5 py-0.5 rounded-full">
                    {dest.idealDuration}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#071B35] group-hover:text-[#0866D9] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-[#00B8A9] font-medium mt-0.5">
                    {dest.tagline}
                  </p>
                  <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                    {dest.overview}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Best Time:</span> {dest.bestTimeToVisit.split('(')[0]}
                  </div>

                  <span className="text-xs font-heading font-bold text-[#0866D9] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>View Guide</span>
                    <ArrowRight size={13} />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};
