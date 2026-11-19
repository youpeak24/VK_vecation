import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useInquiryModal } from '../../context/InquiryModalContext';
import { formatINR } from '../../utils/formatters';

export const HoneymoonSection: React.FC = () => {
  const { openInquiryModal } = useInquiryModal();

  const honeymoonDestinations = [
    {
      name: "Maldives Overwater Sanctuary",
      tag: "Turquoise Bliss",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
      price: 88500,
      slug: "magical-maldives-water-villa",
      perk: "Private villa ladder into coral reef & sparkling wine"
    },
    {
      name: "Bali Jungle & Pool Villa",
      tag: "Tropical Romance",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      price: 42999,
      slug: "bali-tropical-paradise",
      perk: "Floating breakfast in private pool & Uluwatu cliff sunset"
    },
    {
      name: "Swiss Alps & Paris Dream",
      tag: "Alpine Fairytale",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
      price: 158000,
      slug: "switzerland-paris-grand-tour",
      perk: "Mount Titlis revolving cable car & Seine river twilight cruise"
    },
    {
      name: "Kashmir Dal Lake Serenade",
      tag: "Poetic Heritage",
      image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
      price: 28500,
      slug: "kashmir-paradise-on-earth",
      perk: "Deluxe houseboat with warm saffron Kahwa & private Shikara"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#FFF9F5] via-white to-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 border border-rose-200">
            <Heart size={13} className="fill-rose-500 text-rose-500" />
            <span>Curated Romantic Escapes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            LOVE DESERVES <span className="text-rose-600">A BEAUTIFUL DESTINATION.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#64748B] mt-3">
            Celebrate the beginning of forever with candlelit beach dinners, private overwater decks, and unforgettable sunset vistas.
          </p>
        </div>

        {/* 4 Romantic Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {honeymoonDestinations.map((h, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-rose-100 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-rose-700">
                  {h.tag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#071B35] group-hover:text-rose-600 transition-colors">
                    {h.name}
                  </h3>
                  <div className="flex items-start gap-1.5 text-xs text-slate-600 mt-2">
                    <Sparkles size={13} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{h.perk}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Starting from</span>
                    <span className="font-heading font-extrabold text-base text-[#0866D9]">
                      {formatINR(h.price)}
                    </span>
                  </div>

                  <Link
                    to={`/packages/${h.slug}`}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                    aria-label={`View ${h.name}`}
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honeymoon CTA Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-500 to-[#FF8A38] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-rose-500/20">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-100">
              Complimentary Honeymoon Inclusions
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              Complimentary Bed Decor, Cake & Romantic Dining Perks
            </h3>
            <p className="text-xs sm:text-sm text-rose-50">
              Mention you are newlyweds when booking to unlock our exclusive partner resort privileges.
            </p>
          </div>

          <button
            onClick={() => openInquiryModal({ destination: 'Maldives / Bali Honeymoon' })}
            className="px-8 py-3.5 rounded-full bg-white text-rose-600 hover:bg-rose-50 font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all shrink-0 cursor-pointer"
          >
            PLAN YOUR HONEYMOON
          </button>
        </div>

      </div>
    </section>
  );
};
