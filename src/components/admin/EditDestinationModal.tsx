import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Destination, IndiaRegion } from '../../types';
import { ImageField } from './ImageField';

const REGIONS: IndiaRegion[] = ['North India', 'South India', 'East India', 'West India', 'Islands'];

const inputClass =
  'w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0866D9]/20 focus:border-[#0866D9] text-xs';

interface EditDestinationModalProps {
  destination: Destination;
  onClose: () => void;
  onSave: (changes: Partial<Destination>) => void;
}

export const EditDestinationModal: React.FC<EditDestinationModalProps> = ({ destination, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: destination.name,
    country: destination.country,
    tagline: destination.tagline ?? '',
    heroImage: destination.heroImage ?? '',
    cardImage: destination.cardImage ?? '',
    region: (destination.region ?? '') as IndiaRegion | '',
    bestTimeToVisit: destination.bestTimeToVisit ?? '',
    idealDuration: destination.idealDuration ?? '',
    currency: destination.currency ?? '',
    overview: destination.overview ?? '',
    startingPrice: String(destination.startingPrice ?? ''),
    popularFor: (destination.popularFor ?? []).join(', '),
    isFeatured: Boolean(destination.isFeatured),
    isActive: destination.isActive !== false,
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.country.trim()) return;
    const price = Number(form.startingPrice);
    onSave({
      name: form.name.trim(),
      country: form.country.trim(),
      tagline: form.tagline.trim(),
      heroImage: form.heroImage.trim(),
      cardImage: form.cardImage.trim(),
      ...(!destination.isInternational && form.region ? { region: form.region } : {}),
      bestTimeToVisit: form.bestTimeToVisit.trim(),
      idealDuration: form.idealDuration.trim(),
      currency: form.currency.trim(),
      overview: form.overview.trim(),
      ...(Number.isFinite(price) && price > 0 ? { startingPrice: price } : {}),
      popularFor: form.popularFor.split(',').map((t) => t.trim()).filter(Boolean),
      isFeatured: form.isFeatured,
      isActive: form.isActive,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl my-8 max-h-[92vh] flex flex-col"
      >
        <div className="flex items-start justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="font-heading font-black text-lg text-[#071B35]">Edit Destination</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Public page: <span className="font-mono">/destinations/{destination.slug}</span> (the URL stays the same)
            </p>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block font-heading font-bold text-slate-700 mb-1">Name *</span>
              <input required className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} />
            </label>
            <label className="block">
              <span className="block font-heading font-bold text-slate-700 mb-1">Country *</span>
              <input required className={inputClass} value={form.country} onChange={(e) => set('country', e.target.value)} />
            </label>
          </div>

          <label className="block">
            <span className="block font-heading font-bold text-slate-700 mb-1">Tagline</span>
            <input className={inputClass} value={form.tagline} onChange={(e) => set('tagline', e.target.value)} />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageField label="Hero image" value={form.heroImage} onChange={(url) => set('heroImage', url)} />
            <ImageField label="Card image" value={form.cardImage} onChange={(url) => set('cardImage', url)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="block">
              <span className="block font-heading font-bold text-slate-700 mb-1">Starting price (INR)</span>
              <input type="number" min={0} className={inputClass} value={form.startingPrice} onChange={(e) => set('startingPrice', e.target.value)} />
            </label>
            <label className="block">
              <span className="block font-heading font-bold text-slate-700 mb-1">Ideal duration</span>
              <input className={inputClass} value={form.idealDuration} onChange={(e) => set('idealDuration', e.target.value)} />
            </label>
            <label className="block">
              <span className="block font-heading font-bold text-slate-700 mb-1">Currency</span>
              <input className={inputClass} value={form.currency} onChange={(e) => set('currency', e.target.value)} />
            </label>
          </div>

          {!destination.isInternational && (
            <label className="block">
              <span className="block font-heading font-bold text-slate-700 mb-1">Region (India)</span>
              <select className={inputClass} value={form.region} onChange={(e) => set('region', e.target.value as IndiaRegion)}>
                <option value="">Select region</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="block">
            <span className="block font-heading font-bold text-slate-700 mb-1">Best travel season</span>
            <input className={inputClass} value={form.bestTimeToVisit} onChange={(e) => set('bestTimeToVisit', e.target.value)} />
          </label>

          <label className="block">
            <span className="block font-heading font-bold text-slate-700 mb-1">Popular for (comma separated)</span>
            <input className={inputClass} value={form.popularFor} onChange={(e) => set('popularFor', e.target.value)} />
          </label>

          <label className="block">
            <span className="block font-heading font-bold text-slate-700 mb-1">Overview</span>
            <textarea rows={4} className={inputClass} value={form.overview} onChange={(e) => set('overview', e.target.value)} />
          </label>

          <div className="flex flex-wrap gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} />
              <span className="font-heading font-semibold text-slate-700">Featured on homepage</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} />
              <span className="font-heading font-semibold text-slate-700">Published (visible to visitors)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-heading font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#0866D9] hover:bg-blue-700 text-white text-xs font-heading font-bold cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDestinationModal;
