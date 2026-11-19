import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Palmtree, 
  Globe2, 
  Heart, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Crown, 
  Sparkles,
  ArrowRight,
  MapPin
} from 'lucide-react';

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const categories = [
    {
      title: "Temple & Pilgrimages",
      desc: "Arupadai Veedu, Navagraha, Rameshwaram",
      path: "/temple-tours",
      icon: Sparkles,
      color: "text-amber-500"
    },
    {
      title: "Domestic Tours",
      desc: "Kashmir, Kerala, Himachal, Goa, Ooty",
      path: "/india-tours",
      icon: Palmtree,
      color: "text-[#FF8A38]"
    },
    {
      title: "International Tours",
      desc: "Dubai, Singapore, Bali, Europe, Thailand",
      path: "/international-tours",
      icon: Globe2,
      color: "text-[#0866D9]"
    },
    {
      title: "Honeymoon Packages",
      desc: "Maldives villas, Bali pools, Swiss chalets",
      path: "/honeymoon",
      icon: Heart,
      color: "text-rose-500"
    },
    {
      title: "Group Departures",
      desc: "Guided tours with South Indian cuisine",
      path: "/group-tours",
      icon: Users,
      color: "text-[#00B8A9]"
    },
    {
      title: "Educational Tours",
      desc: "School & college experiential learning",
      path: "/packages?category=Educational",
      icon: GraduationCap,
      color: "text-indigo-500"
    },
    {
      title: "Corporate Tours",
      desc: "MICE, annual offsites & leadership retreats",
      path: "/contact?type=corporate",
      icon: Briefcase,
      color: "text-slate-700"
    },
    {
      title: "Luxury Vacations",
      desc: "5-star resorts, private yachts & transfers",
      path: "/packages?category=Luxury",
      icon: Crown,
      color: "text-amber-500"
    },
    {
      title: "Customized Packages",
      desc: "Tailored private itineraries for your family",
      path: "/contact?type=custom",
      icon: Sparkles,
      color: "text-emerald-500"
    }
  ];

  const featuredDestinations = [
    {
      name: "Maldives",
      desc: "Overwater Villas",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80",
      slug: "maldives",
      price: "From ₹88,500"
    },
    {
      name: "Kashmir",
      desc: "Dal Lake & Snow Peaks",
      image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=400&q=80",
      slug: "kashmir",
      price: "From ₹28,500"
    },
    {
      name: "Dubai",
      desc: "Desert & Skyscrapers",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
      slug: "dubai",
      price: "From ₹54,999"
    },
    {
      name: "Bali",
      desc: "Private Pool Villa Bliss",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
      slug: "bali",
      price: "From ₹42,999"
    }
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-2xl shadow-2xl border-t border-slate-100 py-8 px-6 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Categories Column (8 cols) */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div>
              <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-[#071B35]">
                Curated Travel Categories
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Every journey crafted around personalized comfort and uncompromised quality.
              </p>
            </div>
            <Link
              to="/packages"
              onClick={onClose}
              className="text-xs font-semibold text-[#0866D9] hover:text-[#064ea5] flex items-center gap-1 group"
            >
              <span>View All 12+ Packages</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  to={cat.path}
                  onClick={onClose}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-slate-200/80 transition-all duration-200 group"
                >
                  <div className={`p-2.5 rounded-lg bg-slate-50 group-hover:bg-white shadow-xs shrink-0 ${cat.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h5 className="font-heading font-semibold text-sm text-[#142238] group-hover:text-[#0866D9] transition-colors">
                      {cat.title}
                    </h5>
                    <p className="text-xs text-[#64748B] line-clamp-1 mt-0.5">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Destinations Preview Column (4 cols) */}
        <div className="lg:col-span-4 bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/60">
          <div className="flex items-center justify-between mb-4">
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#071B35]">
              Featured Gateways
            </span>
            <Link
              to="/destinations"
              onClick={onClose}
              className="text-xs font-semibold text-[#0866D9] hover:underline"
            >
              All Destinations
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {featuredDestinations.map((dest, i) => (
              <Link
                key={i}
                to={`/destinations/${dest.slug}`}
                onClick={onClose}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] block shadow-xs hover:shadow-md transition-shadow"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/90 via-[#071B35]/30 to-transparent p-2.5 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-1 text-[10px] text-[#00B8A9] font-medium">
                    <MapPin size={10} />
                    <span>{dest.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-white leading-tight">
                    {dest.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-[#64748B]">
            <span>Need customized assistance?</span>
            <Link
              to="/contact"
              onClick={onClose}
              className="font-bold text-[#FF8A38] hover:underline"
            >
              Talk to Specialist
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
