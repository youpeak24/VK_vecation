import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { ImageField } from '../../components/admin/ImageField';
import { TourPackage } from '../../types';

export const CreatePackage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<TourPackage['category']>('International Tours');
  const [destination, setDestination] = useState('');
  const [isInternational, setIsInternational] = useState(true);
  const [price, setPrice] = useState<number>(45000);
  const [originalPrice, setOriginalPrice] = useState<number>(55000);
  const [days, setDays] = useState<number>(5);
  const [nights, setNights] = useState<number>(4);
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80');
  const [overview, setOverview] = useState('');
  const [highlights, setHighlights] = useState('Luxury 4-Star Resort Stay, Daily Breakfast & Dinner, Chauffeur-driven AC Transfers, Sightseeing passes included');
  const [inclusions, setInclusions] = useState('4-Star Accommodation, Daily Buffet Breakfast, Airport Transfers, Guided Tours, Entry Tickets');
  const [exclusions, setExclusions] = useState('International/Domestic Flight Tickets, Personal Expenses & Room Service, Travel Insurance, Visa Charges');

  // Auto-generate slug when title changes
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !destination || !price) return;

    api.packages.create({
      title,
      slug: slug || `pkg-${Date.now()}`,
      subtitle,
      destination,
      country: destination,
      category: [category as any],
      isInternational,
      startingPrice: Number(price),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      duration: { days: Number(days), nights: Number(nights) },
      featuredImage,
      galleryImages: [featuredImage],
      gallery: [featuredImage],
      overview: overview || `${title} offers an enchanting luxury travel experience with VK Vacations.`,
      highlights: highlights.split(',').map(h => h.trim()).filter(Boolean),
      inclusions: inclusions.split(',').map(i => i.trim()).filter(Boolean),
      exclusions: exclusions.split(',').map(ex => ex.trim()).filter(Boolean),
      itinerary: [
        {
          day: 1,
          title: 'Arrival & Welcome Dinner',
          description: `Arrival at destination airport. Warm meet and greet by VK Vacations representative. Transfer to hotel and relax. Evening welcome dinner.`,
          mealsIncluded: ['Dinner'],
          highlights: ['Airport Welcome', 'Evening Dinner']
        },
        {
          day: 2,
          title: 'City Exploration & Iconic Landmarks',
          description: `Full day guided sightseeing tour covering major highlights, cultural centers, and scenic viewpoints.`,
          mealsIncluded: ['Breakfast', 'Lunch'],
          highlights: ['Guided City Tour', 'Scenic Viewpoints']
        }
      ],
      isFeatured: true,
      isTrending: true
    } as any);

    navigate('/admin/packages');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          to="/admin/packages" 
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-slate-500 hover:text-[#0866D9] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Packages</span>
        </Link>
        <span className="text-xs bg-blue-50 text-[#0866D9] px-3 py-1 rounded-full font-heading font-bold">
          New Package Builder
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <h1 className="text-2xl font-heading font-black text-[#071B35] mb-1">
          Create Tour Package
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Fill in package details. Once saved, it immediately appears on the live website and booking engine.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Package Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Magnificent Swiss Alps & Paris"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="magnificent-swiss-alps-paris"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20 font-mono text-[11px]"
              />
            </div>
          </div>

          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Subtitle / Short Hook</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Zurich, Lucerne, Interlaken & Paris Eiffel Tower"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
            />
          </div>

          {/* Category, Destination & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20 font-medium"
              >
                <option value="International Tours">International Tours</option>
                <option value="Domestic Tours">Domestic Tours</option>
                <option value="Honeymoon Packages">Honeymoon Packages</option>
                <option value="Group Tours">Group Tours</option>
                <option value="Luxury Vacations">Luxury Vacations</option>
                <option value="Educational Tours">Educational Tours</option>
                <option value="Corporate Tours">Corporate Tours</option>
              </select>
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Destination Name *</label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Switzerland"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Domestic / International</label>
              <select
                value={isInternational ? 'int' : 'dom'}
                onChange={(e) => setIsInternational(e.target.value === 'int')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20 font-medium"
              >
                <option value="int">International Tour</option>
                <option value="dom">Domestic (India) Tour</option>
              </select>
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Original / MRP (₹)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Days</label>
              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Nights</label>
              <input
                type="number"
                min={0}
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>
          </div>

          {/* Featured Image */}
          <ImageField label="Featured Photography" value={featuredImage} onChange={setFeaturedImage} required />

          {/* Overview */}
          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Package Editorial Overview</label>
            <textarea
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Describe what makes this luxury experience unique..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
            />
          </div>

          {/* Highlights & Inclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Highlights (comma separated)</label>
              <textarea
                rows={3}
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Inclusions (comma separated)</label>
              <textarea
                rows={3}
                value={inclusions}
                onChange={(e) => setInclusions(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link
              to="/admin/packages"
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-heading font-bold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0866D9] hover:bg-blue-700 text-white rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-500/25"
            >
              Publish Package Live
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default CreatePackage;
