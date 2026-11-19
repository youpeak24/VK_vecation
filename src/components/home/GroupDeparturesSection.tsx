import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Send, 
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { SCHEDULED_DEPARTURES } from '../../data/departures';
import { formatINR, formatDate } from '../../utils/formatters';
import { useInquiryModal } from '../../context/InquiryModalContext';

export const GroupDeparturesSection: React.FC = () => {
  const { openInquiryModal } = useInquiryModal();
  const [selectedCity, setSelectedCity] = useState<string>('All');

  const departureCities = ['All', 'Chennai', 'Bangalore', 'Coimbatore'];

  const filteredDepartures = SCHEDULED_DEPARTURES.filter(dep => {
    if (selectedCity === 'All') return true;
    return dep.departureCity === selectedCity;
  });

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <Users size={13} />
              <span>FIXED GROUP DEPARTURES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
              TRAVEL TOGETHER.{' '}
              <span className="text-[#0866D9]">CREATE MEMORIES FOREVER.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-xl">
              Hassle-free guided departures with experienced VK tour managers, delicious Indian meals, and fun-loving fellow travelers.
            </p>
          </div>

          <Link
            to="/group-tours"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] hover:text-[#064ea5] group"
          >
            <span>See Full Departure Calendar</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Departure City Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <span className="text-xs font-bold text-[#142238] mr-2 shrink-0">Departure Hub:</span>
          {departureCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#071B35] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {city === 'All' ? 'All Hubs' : `Ex-${city}`}
            </button>
          ))}
        </div>

        {/* Departure Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartures.map((dep) => {
            const avail = dep.availableSeats ?? 10;
            const total = dep.totalSeats || 30;
            const seatsPercent = Math.round(((total - avail) / total) * 100);
            return (
              <div
                key={dep.id}
                className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Status & City */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-heading font-bold uppercase tracking-wider bg-white border border-slate-200 text-[#071B35] px-2.5 py-1 rounded-full shadow-2xs">
                      <MapPin size={11} className="text-[#0866D9]" />
                      <span>Ex-{dep.departureCity}</span>
                    </span>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-heading font-bold uppercase tracking-wider ${
                      dep.status === 'Limited Seats' 
                        ? 'bg-rose-100 text-rose-700' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {dep.status}
                    </span>
                  </div>

                  {/* Title & Destination */}
                  <h3 className="font-heading font-bold text-lg text-[#071B35] leading-snug">
                    {dep.title}
                  </h3>

                  <p className="text-xs text-[#00B8A9] font-semibold mt-1">
                    {dep.destination} • {dep.durationDays} Days Tour
                  </p>

                  {/* Dates & Highlights */}
                  <div className="mt-4 p-3.5 bg-white rounded-2xl border border-slate-200/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Calendar size={14} className="text-[#FF8A38]" />
                        <span>Departure Date:</span>
                      </span>
                      <span className="font-bold text-[#071B35]">{formatDate(dep.departureDate)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-700">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Users size={14} className="text-[#0866D9]" />
                        <span>Seat Availability:</span>
                      </span>
                      <span className="font-bold text-slate-800">
                        {dep.availableSeats} seats left of {dep.totalSeats}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-gradient-to-r from-[#00B8A9] to-[#FF8A38] h-full rounded-full transition-all duration-500"
                        style={{ width: `${seatsPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="mt-5 pt-4 border-t border-slate-200/60">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Fixed Departure Fare</span>
                      <span className="font-heading font-extrabold text-xl text-[#0866D9]">
                        {formatINR(dep.pricePerPerson || dep.pricePerPax || 0)}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">all-inclusive</span>
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
                      className="py-2.5 px-3 rounded-xl bg-[#0866D9] hover:bg-[#064ea5] text-white font-heading font-bold text-xs uppercase tracking-wider text-center shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Book Seat</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
