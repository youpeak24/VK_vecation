import React, { useState } from 'react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Sparkles, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { RatingStars } from '../ui/RatingStars';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-[#071B35] text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0866D9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#FFC857] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles size={13} />
            <span>AUTHENTIC TRAVEL REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            STORIES FROM <span className="text-[#00B8A9]">OUR TRAVELERS</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Read heartfelt feedback from families, couples, and seniors who experienced holidays with VK Vacations.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 relative shadow-2xl">
          <Quote className="absolute top-8 right-8 text-white/10 w-20 h-20 -scale-x-100 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="shrink-0 text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#00B8A9] shadow-lg mx-auto mb-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00B8A9] bg-[#00B8A9]/15 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 size={12} />
                <span>Verified Trip</span>
              </span>
            </div>

            {/* Testimonial Content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <RatingStars rating={item.rating} size={16} />
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-[#FFC857] font-semibold">{item.tourName}</span>
              </div>

              <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed italic">
                "{item.review}"
              </p>

              <div className="pt-2">
                <h4 className="font-heading font-bold text-lg text-white">
                  {item.name}
                </h4>
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-400 mt-0.5">
                  <MapPin size={12} className="text-[#FF8A38]" />
                  <span>{item.city}</span>
                  <span>•</span>
                  <span>{item.travelType}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex ? 'w-8 bg-[#00B8A9]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to review ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
