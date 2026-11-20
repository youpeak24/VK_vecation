import React, { useEffect } from 'react';
import { Heart, Send } from 'lucide-react';
import { PackageCard } from '../components/packages/PackageCard';
import { useInquiryModal } from '../context/InquiryModalContext';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';
import { usePackages } from '../hooks/useContent';

export const Honeymoon: React.FC = () => {
  const allPackages = usePackages();
  const { openInquiryModal } = useInquiryModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const honeymoonPackages = allPackages.filter((p: any) => p.category.includes('Honeymoon'));

  return (
    <div className="pt-28 pb-24 bg-gradient-to-b from-[#FFF9F5] via-white to-[#F8FAFC]">
      <SEOHead
        title="Romantic Honeymoon Packages — Luxury Overwater Villas & Hill Escapes | VK Vacations"
        description="Celebrate romance with VK Vacations honeymoon packages. Private pool villas in Bali, Maldives water chalets, Kashmir Shikara stays & Swiss alpine getaways with candlelight dinners."
        keywords={["honeymoon packages", "Maldives honeymoon package", "Bali honeymoon pool villa", "romantic holidays", "couples travel India", "honeymoon packages Chennai"]}
        canonical="/honeymoon"
        ogImage="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Honeymoon Specials", url: "/honeymoon" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 border border-rose-200">
            <Heart size={13} className="fill-rose-500 text-rose-500" />
            <span>ROMANTIC GETAWAYS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            HONEYMOON <span className="text-rose-600">SPECIALS</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Handcrafted sanctuaries for couples. Overwater bungalows, secluded beach dinners, alpine snow chalets, and private pool villas tailored for romantic memories.
          </p>

          <div className="mt-5">
            <button
              onClick={() => openInquiryModal({ destination: 'Honeymoon Special' })}
              className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Send size={14} />
              <span>CUSTOMIZE YOUR HONEYMOON</span>
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {honeymoonPackages.map((pkg: any) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>

      </div>
    </div>
  );
};
