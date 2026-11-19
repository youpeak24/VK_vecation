import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Clock, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Send 
} from 'lucide-react';
import { EXCLUSIVE_DEALS } from '../../data/deals';
import { formatINR } from '../../utils/formatters';
import { useInquiryModal } from '../../context/InquiryModalContext';

export const ExclusiveDeals: React.FC = () => {
  const { openInquiryModal } = useInquiryModal();

  // Reusable countdown timer state (calculates days, hours, mins, secs remaining)
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 32,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF8A38] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 border border-orange-200">
              <Flame size={14} className="text-[#FF8A38] fill-[#FF8A38]" />
              <span>LIMITED PROMOTIONAL PRIVILEGES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
              EXCLUSIVE <span className="text-[#FF8A38]">TRAVEL OFFERS</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 max-w-xl">
              Special negotiated partner rates with transparent booking terms and complimentary room upgrades.
            </p>
          </div>

          {/* Countdown timer badge */}
          <div className="bg-[#071B35] text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
            <Clock size={20} className="text-[#FFC857] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
                Flash Season Offer Ends In
              </span>
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-white mt-0.5">
                <span className="bg-white/10 px-2 py-0.5 rounded">{timeLeft.days}d</span>
                <span>:</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">{timeLeft.hours}h</span>
                <span>:</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">{timeLeft.minutes}m</span>
                <span>:</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-[#FFC857]">{timeLeft.seconds}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXCLUSIVE_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="bg-[#F8FAFC] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Discount Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider bg-[#FF8A38] text-white shadow-md">
                    Save {deal.discountPercentage}% OFF
                  </span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
                  <span className="font-semibold text-white drop-shadow-md">
                    {deal.destination}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                    {deal.duration}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#071B35] group-hover:text-[#0866D9] transition-colors leading-snug">
                    {deal.title}
                  </h3>

                  <div className="mt-3 space-y-1.5 border-t border-slate-200/60 pt-3">
                    {deal.terms.map((term, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check size={13} className="text-[#00B8A9] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Promotional Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading font-extrabold text-xl text-[#0866D9]">
                          {formatINR(deal.offerPrice)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {formatINR(deal.originalPrice)}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full">
                      Only {deal.slotsRemaining} slots left
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/packages/${deal.packageSlug}`}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:border-[#0866D9] hover:text-[#0866D9] font-heading font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight size={13} />
                    </Link>

                    <button
                      onClick={() => openInquiryModal({
                        packageName: `${deal.title} (Promo Offer)`,
                        destination: deal.destination,
                        price: deal.offerPrice
                      })}
                      className="py-2.5 px-3 rounded-xl bg-[#FF8A38] hover:bg-[#e06c1d] text-white font-heading font-bold text-xs uppercase tracking-wider text-center shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Claim Deal</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
