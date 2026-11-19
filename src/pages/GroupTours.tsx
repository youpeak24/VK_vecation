import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Send, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { SCHEDULED_DEPARTURES } from '../data/departures';
import { formatINR, formatDate } from '../utils/formatters';
import { useInquiryModal } from '../context/InquiryModalContext';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';

export const GroupTours: React.FC = () => {
  const { openInquiryModal } = useInquiryModal();
  const [selectedHub, setSelectedHub] = useState('All');
  const [selectedGroupType, setSelectedGroupType] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = SCHEDULED_DEPARTURES.filter((dep: any) => {
    if (selectedHub !== 'All' && dep.departureCity !== selectedHub) return false;
    if (selectedGroupType !== 'All' && dep.groupType !== selectedGroupType) return false;
    return true;
  });

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="Fixed Group Tour Departures — Escorted Family & Corporate Tours | VK Vacations"
        description="Join scheduled fixed group tours with VK Vacations. Dedicated tour managers, South Indian meal care, AC luxury coaches, and guaranteed departure dates from Chennai & Bangalore."
        keywords={["group tours India", "fixed departures Chennai", "escorted holiday tours", "family group vacations", "corporate travel group tours"]}
        canonical="/group-tours"
        ogImage="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1200&q=80"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Group Tours", url: "/group-tours" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Users size={13} />
            <span>ESCORTED GROUP VACATIONS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            FIXED GROUP <span className="text-[#0866D9]">DEPARTURES</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Scheduled departure dates with dedicated VK Tour Managers, authentic South Indian cuisine, verified luxury coaches, and transparent per-seat pricing.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-[#142238]">Departure Hub:</span>
            {['All', 'Chennai', 'Bangalore', 'Coimbatore'].map(hub => (
              <button
                key={hub}
                onClick={() => setSelectedHub(hub)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-semibold transition-all cursor-pointer ${
                  selectedHub === hub
                    ? 'bg-[#0866D9] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {hub === 'All' ? 'All Cities' : `Ex-${hub}`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <ShieldCheck size={16} className="text-[#00B8A9]" />
            <span>Guaranteed Departures • Experienced Tour Managers</span>
          </div>
        </div>

        {/* Departures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dep: any) => {
            const seatsPercent = Math.round(((dep.totalSeats - dep.availableSeats) / dep.totalSeats) * 100);
            return (
              <div
                key={dep.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase tracking-wider bg-[#EAF6FF] text-[#0866D9]">
                      Ex-{dep.departureCity}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-heading font-bold uppercase tracking-wider ${
                      dep.status === 'Limited Seats' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {dep.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#071B35] leading-snug">
                    {dep.title}
                  </h3>

                  <p className="text-xs text-[#00B8A9] font-semibold mt-1">
                    {dep.destination} • {dep.durationDays} Days / {dep.durationDays - 1} Nights
                  </p>

                  <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/60 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar size={13} className="text-[#FF8A38]" />
                        <span>Departure:</span>
                      </span>
                      <span className="font-bold text-[#071B35]">{formatDate(dep.departureDate)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar size={13} className="text-[#0866D9]" />
                        <span>Return:</span>
                      </span>
                      <span className="font-bold text-slate-700">{formatDate(dep.returnDate)}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span className="text-slate-500">Seat Status:</span>
                      <span className="font-bold text-slate-800">{dep.availableSeats} of {dep.totalSeats} seats open</span>
                    </div>

                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#00B8A9] h-full rounded-full" style={{ width: `${seatsPercent}%` }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Fixed Tour Fare</span>
                      <span className="font-heading font-extrabold text-xl text-[#0866D9]">
                        {formatINR(dep.pricePerPerson)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">per person all-inclusive</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/packages/${dep.packageSlug}`}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:border-[#0866D9] hover:text-[#0866D9] font-heading font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Itinerary</span>
                      <ArrowRight size={13} />
                    </Link>

                    <button
                      onClick={() => openInquiryModal({
                        packageName: `${dep.title} (Ex-${dep.departureCity})`,
                        destination: dep.destination,
                        price: dep.pricePerPerson
                      })}
                      className="py-2.5 px-3 rounded-xl bg-[#0866D9] hover:bg-[#064ea5] text-white font-heading font-bold text-xs uppercase tracking-wider text-center shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Reserve</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
