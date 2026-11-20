import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { api } from '../services/api';
import { TemplePackage } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useInquiryModal } from '../context/InquiryModalContext';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';

export const TempleTours: React.FC = () => {
  const [templePackages, setTemplePackages] = useState<TemplePackage[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const { openModal } = useInquiryModal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadPackages = () => {
      setTemplePackages(api.templePackages.getAll().filter((p) => p.isActive !== false));
    };
    loadPackages();

    const handleUpdate = () => loadPackages();
    window.addEventListener('vk_db_update', handleUpdate);
    return () => window.removeEventListener('vk_db_update', handleUpdate);
  }, []);

  const filterCategories = ['All', 'Lord Murugan', 'Lord Shiva', 'Navagraha Circuit', 'South Divya Desam'];

  const filtered = templePackages.filter((pkg) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Lord Murugan') return pkg.deity.toLowerCase().includes('murugan');
    if (selectedFilter === 'Lord Shiva') return pkg.deity.toLowerCase().includes('shiva');
    if (selectedFilter === 'Navagraha Circuit') return pkg.circuit.toLowerCase().includes('navagraha');
    if (selectedFilter === 'South Divya Desam') return pkg.title.toLowerCase().includes('rameshwaram') || pkg.deity.toLowerCase().includes('vishnu');
    return true;
  });

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="South Indian Temple Tours & Spiritual Pilgrimage Packages | VK Vacations"
        description="Experience divine bliss with VK Vacations sacred pilgrimage circuits: Arupadai Veedu Murugan temples, Navagraha Kumbakonam, Pancha Bhoota Stalam, Rameshwaram with VIP Darshan & Satvik dining."
        keywords={["South Indian temple tours", "Arupadai Veedu tour package", "Navagraha temple tour Kumbakonam", "Pancha Bhoota Stalam", "Rameshwaram yatra", "temple packages Chennai"]}
        canonical="/temple-tours"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Temple Tours", url: "/temple-tours" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-heading font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 border border-amber-200">
            <Sparkles size={14} className="text-amber-500" />
            <span>SACRED PILGRIMAGES & DIVINE DARSHAN</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            SPIRITUAL & <span className="text-amber-600">TEMPLE TOURS</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-3">
            Experience divine tranquility across Tamil Nadu & South India’s holiest sanctuaries. 
            VIP special darshan passes, satvik vegetarian feasts, and luxurious AC transfers with seasoned guides.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Pilgrimage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Badges */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.featuredImage} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Deity & Duration Badges */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  <span className="bg-amber-600 text-white text-xs font-heading font-bold px-3 py-1 rounded-full shadow-md">
                    {pkg.deity}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-heading font-medium px-3 py-1 rounded-full border border-white/20">
                    {pkg.duration.days}D / {pkg.duration.nights}N
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-amber-300 text-xs font-medium tracking-wide flex items-center gap-1 mb-1">
                    <MapPin size={13} /> {pkg.state} • {pkg.circuit}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white line-clamp-1">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {pkg.overview}
                  </p>

                  {/* Temples Covered Preview */}
                  <div className="mb-4">
                    <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Temples Enclosed:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.templesCovered.slice(0, 4).map((temple, i) => (
                        <span key={i} className="text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200/60">
                          {temple}
                        </span>
                      ))}
                      {pkg.templesCovered.length > 4 && (
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                          +{pkg.templesCovered.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Darshan Perks */}
                  <div className="mb-6 space-y-1.5">
                    {pkg.darshanTypes.slice(0, 2).map((darshan, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>{darshan}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Starting from</span>
                    <div className="text-xl font-heading font-extrabold text-[#071B35]">
                      {formatCurrency(pkg.startingPrice)}
                      <span className="text-xs font-normal text-slate-500"> /person</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal({ packageTitle: pkg.title })}
                      className="px-4 py-2 text-xs font-heading font-bold rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors"
                    >
                      Inquire
                    </button>
                    <Link
                      to={`/temple-tours/${pkg.slug}`}
                      className="px-4 py-2 text-xs font-heading font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center gap-1 shadow-sm shadow-amber-600/30"
                    >
                      <span>Explore</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Pilgrimage CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#071B35] to-[#0A2540] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <span className="text-amber-400 font-heading text-xs font-bold uppercase tracking-wider">
              Customized Sacred Journeys
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold mt-1 text-white">
              Planning a Family Pilgrimage or Homam Tour?
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              We arrange special archana tickets, dedicated priests for rituals, wheelchair support for elderly parents, and pure satvik meal arrangements across South India.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => openModal({ packageTitle: 'Custom Temple Pilgrimage' })}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/30 text-center"
            >
              Request Custom Pilgrimage
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TempleTours;
