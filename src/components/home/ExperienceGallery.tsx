import React, { useState } from 'react';
import { Camera, Maximize2, MapPin } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/gallery';
import { Lightbox } from '../ui/Lightbox';

export const ExperienceGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['All', 'Beaches', 'Mountains', 'Cities', 'Honeymoon', 'Cultural', 'Adventure'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = filteredItems.map(item => ({
    url: item.image,
    title: item.title,
    caption: item.caption,
    location: item.location
  }));

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Camera size={13} />
            <span>Curated Visual Memories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            MOMENTS WORTH <span className="text-[#0866D9]">REMEMBERING</span>
          </h2>

          <p className="text-sm sm:text-base text-[#64748B] mt-3">
            Glimpses of breathtaking landscapes, intimate cultural encounters, and joyful horizons curated for our travelers.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0866D9] text-white shadow-md shadow-blue-500/25 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightboxAt(idx)}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 aspect-[4/5] bg-slate-900 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/90 via-[#071B35]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white" />

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1 text-[11px] text-[#00B8A9] font-medium">
                    <MapPin size={11} />
                    <span>{item.location}</span>
                  </div>
                  <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} />
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-white group-hover:text-[#FFC857] transition-colors leading-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-90 transition-opacity">
                  {item.caption}
                </p>
              </div>

              {/* Category Pill Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-heading font-semibold bg-black/40 backdrop-blur-md text-white border border-white/20">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          All images represent licensed destination vistas curated by the VK Vacations editorial desk.
        </p>

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
      />
    </section>
  );
};
