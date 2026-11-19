import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  RotateCcw, 
  Compass
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/packages';
import { PackageCard } from '../components/packages/PackageCard';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';
import type { TourPackage } from '../types';

export const Packages: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('dest') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [selectedScope, setSelectedScope] = useState<'All' | 'Domestic' | 'International'>('All');
  const [priceSort, setPriceSort] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');
  const [maxPrice, setMaxPrice] = useState<number>(200000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All',
    'India Tours',
    'International Tours',
    'Honeymoon',
    'Group Tours',
    'Europe',
    'Luxury'
  ];

  // Filtering logic
  const filtered = TOUR_PACKAGES.filter((pkg: TourPackage) => {
    // Search keyword
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      const match = pkg.title.toLowerCase().includes(q) ||
        pkg.destination.toLowerCase().includes(q) ||
        pkg.country.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category
    if (selectedCategory !== 'All') {
      if (!pkg.category.some((c: string) => c.toLowerCase() === selectedCategory.toLowerCase())) {
        return false;
      }
    }

    // Scope (Domestic vs International)
    if (selectedScope === 'Domestic' && pkg.isInternational) return false;
    if (selectedScope === 'International' && !pkg.isInternational) return false;

    // Max Price
    if (pkg.startingPrice > maxPrice) return false;

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (priceSort === 'low-to-high') return a.startingPrice - b.startingPrice;
    if (priceSort === 'high-to-low') return b.startingPrice - a.startingPrice;
    return 0;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedScope('All');
    setPriceSort('default');
    setMaxPrice(200000);
    setSearchParams({});
  };

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="All Tour Packages — Domestic & International Holidays | VK Vacations"
        description="Explore 65+ curated domestic and international tour packages by VK Vacations. Transparent prices, verified 4-star & 5-star hotels, private AC transfers, and flexible dates."
        keywords={["tour packages India", "holiday packages Chennai", "international vacation deals", "domestic holiday tours", "VK Vacations packages"]}
        canonical="/packages"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "All Packages", url: "/packages" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Compass size={13} />
            <span>EXPLORE OUR DESTINATIONS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            CURATED TOUR <span className="text-[#0866D9]">PACKAGES</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Handcrafted holiday itineraries designed with authentic care, vetted hotels, and transparent pricing.
          </p>
        </div>

        {/* Filter and Search Bar Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 mb-10 space-y-6">
          
          {/* Top Search & Sort Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by destination (e.g. Kashmir, Maldives, Dubai)..."
                className="w-full pl-11 pr-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
              />
            </div>

            {/* Scope (All / Domestic / International) */}
            <div className="md:col-span-3 flex items-center bg-[#F8FAFC] p-1 rounded-2xl border border-slate-200">
              {(['All', 'Domestic', 'International'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedScope(s)}
                  className={`flex-1 py-2 text-xs font-heading font-semibold rounded-xl transition-all cursor-pointer ${
                    selectedScope === s
                      ? 'bg-white text-[#0866D9] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Price Sort */}
            <div className="md:col-span-3">
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as any)}
                className="w-full py-3 px-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-xs text-[#142238] focus:outline-none focus:border-[#0866D9] cursor-pointer"
              >
                <option value="default">Sort by: Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#142238] mr-1">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0866D9] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {(searchTerm || selectedCategory !== 'All' || selectedScope !== 'All' || priceSort !== 'default') && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#64748B]">
          <span>Showing <strong>{sorted.length}</strong> matching tour packages</span>
          <span>Prices in INR (₹)</span>
        </div>

        {/* Packages Grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((pkg) => (
              <PackageCard key={pkg.id} packageData={pkg} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <Compass size={40} className="text-slate-400 mx-auto" />
            <h3 className="text-lg font-heading font-bold text-[#071B35]">No Packages Match Your Criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any packages matching your exact search. Try adjusting the keywords or clear filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-[#0866D9] text-white text-xs font-heading font-bold uppercase tracking-wider cursor-pointer"
            >
              Show All Packages
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
