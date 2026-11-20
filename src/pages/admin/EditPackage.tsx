import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { ImageField } from '../../components/admin/ImageField';
import { TourPackage } from '../../types';

export const EditPackage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState<TourPackage | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<TourPackage['category']>('International Tours');
  const [destination, setDestination] = useState('');
  const [isInternational, setIsInternational] = useState(true);
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [days, setDays] = useState<number>(5);
  const [nights, setNights] = useState<number>(4);
  const [featuredImage, setFeaturedImage] = useState('');
  const [overview, setOverview] = useState('');

  useEffect(() => {
    if (!id) return;
    const found = api.packages.getById(id);
    if (found) {
      setPkg(found);
      setTitle(found.title);
      setSlug(found.slug);
      setSubtitle(found.subtitle || '');
      setCategory(Array.isArray(found.category) ? (found.category[0] as any) : (found.category as any));
      setDestination(found.destination);
      setIsInternational(found.isInternational);
      setPrice(found.startingPrice || (found as any).price || 0);
      setOriginalPrice(found.originalPrice);
      setDays(found.duration.days);
      setNights(found.duration.nights);
      setFeaturedImage(found.featuredImage);
      setOverview(found.overview);
    }
  }, [id]);

  if (!pkg) {
    return (
      <div className="p-10 text-center">
        <p className="text-slate-500">Package not found.</p>
        <Link to="/admin/packages" className="text-[#0866D9] mt-2 inline-block">Back to Packages</Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    api.packages.update(id, {
      title,
      slug,
      subtitle,
      category: [category as any],
      destination,
      isInternational,
      startingPrice: Number(price),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      duration: { days: Number(days), nights: Number(nights) },
      featuredImage,
      overview
    } as any);

    navigate('/admin/packages');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between">
        <Link 
          to="/admin/packages" 
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-slate-500 hover:text-[#0866D9] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Packages</span>
        </Link>
        <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-heading font-bold">
          Editing Package ID: {id}
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <h1 className="text-2xl font-heading font-black text-[#071B35] mb-1">
          Edit Tour Package
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Update prices, itinerary text, or destination properties. Changes take effect instantly.
        </p>

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Package Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px]"
              />
            </div>
          </div>

          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
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
              <label className="block font-heading font-bold text-slate-700 mb-1">Destination</label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Type</label>
              <select
                value={isInternational ? 'int' : 'dom'}
                onChange={(e) => setIsInternational(e.target.value === 'int')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="int">International Tour</option>
                <option value="dom">Domestic (India) Tour</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Original Price (₹)</label>
              <input
                type="number"
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-500"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Days</label>
              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Nights</label>
              <input
                type="number"
                min={0}
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <ImageField label="Featured Photography" value={featuredImage} onChange={setFeaturedImage} required />

          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Overview</label>
            <textarea
              rows={4}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>

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
              Save Changes
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default EditPackage;
