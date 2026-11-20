import React, { useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import { PackageCard } from '../components/packages/PackageCard';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';
import { usePackages } from '../hooks/useContent';

export const InternationalTours: React.FC = () => {
  const allPackages = usePackages();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const intlPackages = allPackages.filter((p: any) => p.isInternational);

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="International Holiday Tour Packages — Dubai, Europe, Bali, Singapore & Maldives | VK Vacations"
        description="Book luxury international holidays from India with VK Vacations. Complete packages for Dubai, Maldives overwater villas, Switzerland, Paris, Bali & Singapore with visa support."
        keywords={["international tour packages", "Dubai holiday package", "Maldives vacation from Chennai", "Europe tour packages", "Bali pool villa package", "Singapore holiday"]}
        canonical="/international-tours"
        ogImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "International Tours", url: "/international-tours" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Globe2 size={13} />
            <span>GLOBAL WONDERS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            INTERNATIONAL <span className="text-[#0866D9]">TOUR PACKAGES</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Explore world icons: Dubai's futuristic marvels, Bali's tropical villas, Singapore's gardens, and Switzerland's alpine splendor with expert Indian tour coordination.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {intlPackages.map((pkg: any) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>

      </div>
    </div>
  );
};
