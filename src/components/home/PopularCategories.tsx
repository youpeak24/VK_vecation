import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { POPULAR_CATEGORIES } from '../../data/categories';

export const PopularCategories: React.FC = () => {
  return (
    <section className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles size={13} />
            <span>Handcrafted Holiday Collections</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            YOUR NEXT ADVENTURE <span className="text-[#0866D9]">STARTS HERE</span>
          </h2>

          <p className="text-sm sm:text-base text-[#64748B] mt-3">
            Explore holidays designed for every kind of traveler — from intimate romantic retreats to grand family voyages.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#071B35] flex flex-col justify-end aspect-[4/5] sm:aspect-[3/4]"
            >
              {/* Background Image with Zoom Effect */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B35] via-[#071B35]/40 to-transparent group-hover:via-[#071B35]/60 transition-colors duration-300" />

              {/* Top Badge */}
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3.5 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {cat.badge}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="text-xs font-semibold text-[#00B8A9] uppercase tracking-wider block mb-1">
                  {cat.tagline}
                </span>

                <h3 className="text-2xl font-heading font-bold text-white group-hover:text-[#FFC857] transition-colors leading-tight">
                  {cat.name}
                </h3>

                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed opacity-90">
                  {cat.description}
                </p>

                {/* Popular Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                  {cat.highlights.slice(0, 3).map((item, i) => (
                    <span key={i} className="text-[11px] text-white/80 bg-white/10 px-2 py-0.5 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>

                {/* Explore Action */}
                <div className="mt-4 pt-3 flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider text-white group-hover:text-[#FF8A38] transition-colors">
                  <span>Explore Collection</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#FF8A38] text-white flex items-center justify-center transition-colors">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
