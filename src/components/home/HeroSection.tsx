import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Compass,
  ArrowDown
} from 'lucide-react';
import { useInquiryModal } from '../../context/InquiryModalContext';
import { BUDGET_RANGES } from '../../data/company';

interface HeroSlide {
  id: string;
  destination: string;
  country: string;
  tagline: string;
  headline: string;
  image: string;
  accent: string;
  packageSlug: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    destination: 'Maldives',
    country: 'Indian Ocean',
    tagline: 'Private Lagoon Overwater Villas',
    headline: 'WHERE TURQUOISE DREAMS MEET ENDLESS HORIZONS',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=85',
    accent: '#00B8A9',
    packageSlug: 'magical-maldives-water-villa'
  },
  {
    id: 'slide-2',
    destination: 'Switzerland',
    country: 'European Alps',
    tagline: 'Snow Peaks, Panoramic Trains & Alpine Romance',
    headline: 'FEEL THE MAJESTY OF THE SWISS ALPS',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=85',
    accent: '#0866D9',
    packageSlug: 'switzerland-paris-grand-tour'
  },
  {
    id: 'slide-3',
    destination: 'Kashmir',
    country: 'Incredible India',
    tagline: 'Paradise on Earth with Heritage Houseboats',
    headline: 'POETRY IN SNOW, PINE AND LOTUS LAKES',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1920&q=85',
    accent: '#FF8A38',
    packageSlug: 'kashmir-paradise-on-earth'
  },
  {
    id: 'slide-4',
    destination: 'Dubai',
    country: 'United Arab Emirates',
    tagline: 'Future Skyline & Golden Arabian Sand Dunes',
    headline: 'THE GLITTERING CITY OF MODERN WONDERS',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85',
    accent: '#FFC857',
    packageSlug: 'dubai-luxury-extravaganza'
  },
  {
    id: 'slide-5',
    destination: 'Bali',
    country: 'Indonesia',
    tagline: 'Island of Gods, Sacred Temples & Private Pool Villas',
    headline: 'TROPICAL SERENITY CRAFTED FOR YOUR SOUL',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85',
    accent: '#00B8A9',
    packageSlug: 'bali-tropical-paradise'
  }
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { openInquiryModal } = useInquiryModal();
  const navigate = useNavigate();

  // Search form state
  const [searchDestination, setSearchDestination] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [searchTravelers, setSearchTravelers] = useState('2');
  const [searchBudget, setSearchBudget] = useState('All');

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const slide = HERO_SLIDES[currentSlide];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDestination.trim()) params.set('dest', searchDestination.trim());
    if (searchBudget && searchBudget !== 'All') params.set('budget', searchBudget);
    navigate(`/packages?${params.toString()}`);
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#071B35]">
      
      {/* Background Slides with crossfade */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={s.image}
            alt={s.destination}
            className="w-full h-full object-cover object-center"
          />
          {/* Cinematic Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B35]/90 via-[#071B35]/50 to-[#071B35]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B35] via-transparent to-[#071B35]/60" />
        </div>
      ))}

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Content Hero Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-36 pb-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Aspirational Typography & CTAs */}
          <div className="lg:col-span-8 space-y-4">
            {/* Destination Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-top-4 duration-500 w-fit">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: slide.accent }} />
              <span className="text-[#FFC857]">{slide.destination}</span>
              <span className="text-white/60">•</span>
              <span className="text-white/90">{slide.country}</span>
            </div>

            <div className="space-y-4">
              <span className="font-editorial italic text-lg sm:text-2xl text-[#00B8A9] font-normal block">
                "Explore More. Experience Beyond."
              </span>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1] text-balance">
                THE WORLD IS WAITING.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B8A9] via-[#3a8df4] to-[#FF8A38]">
                  LET'S EXPLORE.
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-200 font-sans max-w-2xl leading-relaxed">
                {slide.tagline}. Unforgettable journeys, breathtaking destinations, and luxury holidays crafted around you.
              </p>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/packages')}
                  className="px-8 py-3.5 rounded-full bg-[#0866D9] hover:bg-[#064ea5] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <Compass size={16} />
                  <span>EXPLORE PACKAGES</span>
                </button>

                <button
                  onClick={() => openInquiryModal({ destination: slide.destination })}
                  className="px-8 py-3.5 rounded-full bg-[#FF8A38] hover:bg-[#e06c1d] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>PLAN MY TRIP</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-white/80 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#00B8A9]">✓</span>
                  <span>100% Tailored Holidays</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#00B8A9]">✓</span>
                  <span>24/7 Dedicated Concierge</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#00B8A9]">✓</span>
                  <span>South Indian Meal Care</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic Banner */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#0866D9] via-[#00B8A9] to-[#FF8A38] rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse" />
              
              {/* Hero Banner Card */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-xs text-white">
                <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center mb-4">
                  <img 
                    src="/hero.png" 
                    alt="VK Vacations Exclusive Journeys" 
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="w-full pt-3 border-t border-white/15 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFC857] block">
                      Trusted Choice
                    </span>
                    <span className="font-heading font-extrabold text-sm text-white block">
                      VK VACATIONS
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white flex items-center justify-end gap-1 text-[#FF8A38]">
                      ★ 4.9/5
                    </span>
                    <span className="text-[10px] text-white/70 block">
                      1,200+ Reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Modern Destination Search Panel */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mb-12 w-full">
        <div className="glass-panel p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/80">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
            
            {/* Field 1: Destination */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-colors">
              <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-[#64748B]">
                Destination
              </label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={16} className="text-[#0866D9] shrink-0" />
                <input
                  type="text"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  placeholder="Where to? (e.g. Kashmir, Bali)"
                  className="w-full bg-transparent text-xs font-semibold text-[#142238] placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Field 2: Travel Month */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-colors">
              <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-[#64748B]">
                Travel Month
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={16} className="text-[#00B8A9] shrink-0" />
                <select
                  value={searchMonth}
                  onChange={(e) => setSearchMonth(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[#142238] focus:outline-none cursor-pointer"
                >
                  <option value="">Any Month</option>
                  <option value="April 2026">April 2026</option>
                  <option value="May 2026">May 2026</option>
                  <option value="June 2026">June 2026</option>
                  <option value="July 2026">July 2026</option>
                  <option value="Winter 2026">Winter 2026</option>
                </select>
              </div>
            </div>

            {/* Field 3: Travelers */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-colors">
              <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-[#64748B]">
                Guests
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Users size={16} className="text-[#FF8A38] shrink-0" />
                <select
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[#142238] focus:outline-none cursor-pointer"
                >
                  <option value="1">1 Solo</option>
                  <option value="2">2 (Couple)</option>
                  <option value="4">4 (Family)</option>
                  <option value="6">6+ (Group)</option>
                </select>
              </div>
            </div>

            {/* Field 4: Budget */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-colors">
              <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-[#64748B]">
                Budget Range
              </label>
              <div className="flex items-center gap-2 mt-1">
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-[#142238] focus:outline-none cursor-pointer"
                >
                  <option value="All">All Budgets</option>
                  <option value="Under ₹30,000">Under ₹30,000</option>
                  <option value="₹30,000 - ₹60,000">₹30,000 - ₹60,000</option>
                  <option value="₹60,000 - ₹1,20,000">₹60,000 - ₹1,20,000</option>
                  <option value="Above ₹1,20,000">Above ₹1,20,000 (Luxury)</option>
                </select>
              </div>
            </div>

            {/* Search Submit CTA */}
            <div>
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#0866D9] hover:bg-[#064ea5] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Search size={16} />
                <span>SEARCH PACKAGES</span>
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Slider Progress Bar & Dots */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-4 flex items-center justify-between text-white/70 text-xs">
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-[#00B8A9]' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300">
          <ArrowDown size={14} className="animate-bounce text-[#FF8A38]" />
          <span>Scroll to explore</span>
        </div>
      </div>

    </section>
  );
};
