import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { PackageCard } from '../components/packages/PackageCard';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';
import type { IndiaRegion } from '../types';
import { usePackages } from '../hooks/useContent';

export const IndiaTours: React.FC = () => {
  const allPackages = usePackages();
  const [selectedRegion, setSelectedRegion] = useState<'All' | IndiaRegion>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const indiaPackages = allPackages.filter((p: any) => !p.isInternational);

  const filtered = indiaPackages.filter((p: any) => {
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
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="Incredible India Tour Packages — Kashmir, Kerala, Rajasthan & Andaman | VK Vacations"
        description="Discover the magic of India with curated domestic tour packages across Kashmir houseboats, Kerala backwaters, royal Rajasthan palaces, and exotic Andaman beaches."
        keywords={["India tour packages", "Kashmir holiday", "Kerala tour package", "Rajasthan heritage tour", "Andaman islands package", "domestic holidays Chennai"]}
        canonical="/india-tours"
        ogImage="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "India Tours", url: "/india-tours" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF8A38] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 border border-orange-200">
            <Sparkles size={13} />
            <span>DISCOVER THE MOTHERLAND</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            INCREDIBLE INDIA <span className="text-[#FF8A38]">HOLIDAYS</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Experience the golden sands of Rajasthan, the misty tea hills of Kerala and Ooty, the snow summits of Kashmir, and the turquoise waters of the Andaman Islands.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#FF8A38] text-white shadow-md shadow-orange-500/25 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {reg === 'All' ? 'All India Circuits' : reg}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg: any) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>

      </div>
    </div>
  );
};
