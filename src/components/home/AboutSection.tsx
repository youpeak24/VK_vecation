import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Compass,
  PhoneCall
} from 'lucide-react';
import { useInquiryModal } from '../../context/InquiryModalContext';

export const AboutSection: React.FC = () => {
  const { openInquiryModal } = useInquiryModal();

  const services = [
    {
      title: "Customized Travel Planning",
      desc: "Bespoke itineraries tailored to your family's pace, budget, and tastes."
    },
    {
      title: "Domestic & International Holidays",
      desc: "Handpicked resorts and sightseeing in 65+ destinations across India and overseas."
    },
    {
      title: "Personalized Itineraries",
      desc: "Day-by-day curated experiences with verified hotels and South Indian meal care."
    },
    {
      title: "Dedicated Travel Assistance",
      desc: "Live travel support desk throughout your departure until safe homeward arrival."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overlapping Photos & Floating Tags (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Primary Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] w-[85%] border-8 border-[#F8FAFC]">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                  alt="VK Vacations Tropical Beach Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#FFC857]">
                    Handcrafted Journeys
                  </span>
                  <p className="text-sm font-bold text-white">
                    Unforgettable Moments in Paradise
                  </p>
                </div>
              </div>

              {/* Secondary Overlapping Image */}
              <div className="absolute -bottom-8 -right-2 sm:-right-4 w-[60%] aspect-square rounded-3xl overflow-hidden shadow-2xl border-6 border-white">
                <img
                  src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80"
                  alt="Kashmir Shikara Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#00B8A9]">
                    <MapPin size={12} />
                    <span>Dal Lake, Kashmir</span>
                  </div>
                </div>
              </div>

              {/* Floating Brand Badge */}
              <div className="absolute -top-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white p-0.5 shadow-sm border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                  <img 
                    src="/android-chrome-192x192.png" 
                    alt="VK Vacations Insignia" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <span className="block font-heading font-extrabold text-sm text-[#071B35] leading-none">
                    VK Vacations
                  </span>
                  <span className="text-[11px] text-[#0866D9] font-bold">
                    Govt. Regd. Tour Operator
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Services (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                <Sparkles size={13} />
                <span>WELCOME TO VK VACATIONS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight leading-tight">
                WE DON'T JUST PLAN TRIPS.{' '}
                <span className="text-[#0866D9]">WE CREATE MEMORIES.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                At VK Vacations, we believe every journey should be as unique as the traveler. From relaxing beach escapes and romantic honeymoons to exciting international adventures and unforgettable family holidays, we help turn travel dreams into meaningful experiences.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {services.map((srv, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 hover:border-[#0866D9]/40 transition-colors">
                  <div className="flex items-center gap-2 text-[#0866D9] font-heading font-bold text-xs uppercase tracking-wide mb-1">
                    <CheckCircle2 size={16} className="text-[#00B8A9] shrink-0" />
                    <span className="text-[#071B35]">{srv.title}</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="px-7 py-3.5 rounded-full bg-[#071B35] hover:bg-[#040e1d] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight size={14} />
              </Link>

              <button
                onClick={() => openInquiryModal()}
                className="px-7 py-3.5 rounded-full bg-[#FF8A38] hover:bg-[#e06c1d] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall size={14} />
                <span>PLAN WITH SPECIALIST</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
