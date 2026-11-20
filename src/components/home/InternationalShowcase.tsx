import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { useDestinations } from '../../hooks/useContent';

export const InternationalShowcase: React.FC = () => {
  const allDestinations = useDestinations();
  const intlDests = allDestinations.filter(d => d.isInternational);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <Globe2 size={13} />
              <span>GLOBAL GATEWAYS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
              EXPLORE <span className="text-[#0866D9]">BEYOND BORDERS</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-xl">
              From the glittering towers of Dubai and Singapore to the overwater lagoons of Maldives and alpine ridges of Switzerland.
            </p>
          </div>

          <Link
            to="/international-tours"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] hover:text-[#064ea5] group"
          >
            <span>View All International Tours</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {intlDests.map((dest, idx) => {
            // Give first card wider presence or standard tall aspect
            return (
              <Link
                key={dest.id}
                to={`/destinations/${dest.slug}`}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#071B35] shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-end"
              >
                {/* Background image */}
                <img
                  src={dest.cardImage}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B35] via-[#071B35]/40 to-transparent group-hover:via-[#071B35]/60 transition-colors" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-heading font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {dest.idealDuration}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 text-white space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#00B8A9] font-medium">
                    <MapPin size={12} />
                    <span>{dest.country}</span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-[#FFC857] transition-colors">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                    {dest.tagline}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider text-white group-hover:text-[#FF8A38] transition-colors">
                    <span>Explore Destination</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
