import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Plus } from 'lucide-react';
import { api } from '../../services/api';

export const CreateTemplePackage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [deity, setDeity] = useState('Lord Murugan');
  const [primaryTemple, setPrimaryTemple] = useState('');
  const [circuit, setCircuit] = useState('Sacred Pilgrimage Circuit');
  const [state, setState] = useState('Tamil Nadu');
  const [startingPrice, setStartingPrice] = useState<number>(24500);
  const [days, setDays] = useState<number>(5);
  const [nights, setNights] = useState<number>(4);
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80');
  const [overview, setOverview] = useState('');
  const [templesCovered, setTemplesCovered] = useState('Tiruttani Murugan Temple, Swamimalai Temple, Palani Dhandayuthapani Temple, Thiruchendur Sea Shrine');
  const [darshanTypes, setDarshanTypes] = useState('VIP Special Entry Darshan, Morning Viswaroopa Seva, Special Archana & Prasadam');
  const [highlights, setHighlights] = useState('Special VIP Darshan tickets, Pure Satvik vegetarian meals, AC Chauffeur vehicle, Experienced devotional guide');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !primaryTemple || !startingPrice) return;

    api.templePackages.create({
      title,
      slug: slug || `temple-tour-${Date.now()}`,
      subtitle,
      deity,
      primaryTemple,
      circuit,
      state,
      startingPrice: Number(startingPrice),
      duration: { days: Number(days), nights: Number(nights) },
      featuredImage,
      overview: overview || `Experience sacred darshan and devotional tranquility with VK Vacations.`,
      templesCovered: templesCovered.split(',').map(t => t.trim()).filter(Boolean),
      darshanTypes: darshanTypes.split(',').map(d => d.trim()).filter(Boolean),
      highlights: highlights.split(',').map(h => h.trim()).filter(Boolean),
      inclusions: ['Special VIP Darshan tickets', 'Satvik Meals', 'Deluxe AC stay', 'Chauffeur AC Innova/Coach'],
      exclusions: ['Flight/Train Tickets', 'Personal Temple Donations', 'Camera Tickets'],
      departureCities: ['Chennai', 'Coimbatore', 'Madurai', 'Bangalore'],
      itinerary: [
        {
          day: 1,
          title: 'Departure & First Abode Darshan',
          location: primaryTemple,
          description: `Early morning departure from Chennai/Coimbatore. Arrival at ${primaryTemple}. Special VIP Darshan and temple rituals. Evening devotional satvik dinner.`,
          mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
          highlights: ['Special VIP Darshan', 'Temple Archana']
        },
        {
          day: 2,
          title: 'Sacred Circuit Continuing & Holy Bath',
          location: circuit,
          description: `Morning pooja rituals followed by travel through holy shrines. Afternoon cleansing bath and spiritual satsang.`,
          mealsIncluded: ['Breakfast', 'Lunch', 'Dinner'],
          highlights: ['Morning Seva', 'Satvik Lunch']
        }
      ]
    });

    navigate('/admin/temple-packages');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="flex items-center justify-between">
        <Link 
          to="/admin/temple-packages" 
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-slate-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Temple Tours</span>
        </Link>
        <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-heading font-bold">
          Sacred Circuit Creator
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm">
        <h1 className="text-2xl font-heading font-black text-[#071B35] mb-1">
          Add Temple Tour Pilgrimage
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Publish a new South Indian pilgrimage package complete with temple lists, darshan passes, and satvik dining.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Tour Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Navagraha 9 Temple Sthalam Pilgrimage"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">URL Slug *</label>
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
              placeholder="Kumbakonam, Thanjavur, Suryanar Koil, Thirunallar"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Deity Honored *</label>
              <input
                type="text"
                required
                value={deity}
                onChange={(e) => setDeity(e.target.value)}
                placeholder="Lord Murugan / Lord Shiva / Navagraha"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Primary Temple *</label>
              <input
                type="text"
                required
                value={primaryTemple}
                onChange={(e) => setPrimaryTemple(e.target.value)}
                placeholder="Thiruchendur / Palani"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Sacred Circuit / State</label>
              <input
                type="text"
                value={circuit}
                onChange={(e) => setCircuit(e.target.value)}
                placeholder="Arupadai Veedu Circuit"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">Starting Price (₹) *</label>
              <input
                type="number"
                required
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block font-heading font-bold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
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

          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Sacred Temples Enclosed (comma separated)</label>
            <textarea
              rows={2}
              value={templesCovered}
              onChange={(e) => setTemplesCovered(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Special Darshan Privileges (comma separated)</label>
            <input
              type="text"
              value={darshanTypes}
              onChange={(e) => setDarshanTypes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Featured Photo URL</label>
            <input
              type="url"
              required
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-heading font-bold text-slate-700 mb-1">Overview</label>
            <textarea
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <Link
              to="/admin/temple-packages"
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-heading font-bold"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-md shadow-amber-600/25"
            >
              Publish Sacred Tour
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default CreateTemplePackage;
