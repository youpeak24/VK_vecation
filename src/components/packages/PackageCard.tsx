import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Send, 
  Heart 
} from 'lucide-react';
import { TourPackage } from '../../types';
import { formatINR } from '../../utils/formatters';
import { RatingStars } from '../ui/RatingStars';
import { useInquiryModal } from '../../context/InquiryModalContext';

interface PackageCardProps {
  packageData: TourPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ packageData }) => {
  const { openInquiryModal } = useInquiryModal();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      
      {/* Top Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={packageData.featuredImage}
          alt={packageData.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
          {packageData.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-heading font-bold uppercase tracking-wider bg-[#FF8A38] text-white shadow-sm">
              {packageData.badge}
            </span>
          )}
          <span className="ml-auto px-2.5 py-1 rounded-full text-[11px] font-heading font-semibold bg-white/90 backdrop-blur-md text-[#071B35] shadow-sm">
            {packageData.isInternational ? 'International' : 'India Tour'}
          </span>
        </div>

        {/* Bottom Duration overlay on image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
            <Clock size={13} className="text-[#FFC857]" />
            <span className="font-semibold">{packageData.duration.days}D / {packageData.duration.nights}N</span>
          </div>

          <div className="flex items-center gap-1 text-white font-medium text-xs drop-shadow-md">
            <MapPin size={13} className="text-[#00B8A9]" />
            <span>{packageData.destination}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Ratings & Category */}
          <div className="flex items-center justify-between mb-2">
            <RatingStars
              rating={packageData.rating || 4.9}
              reviewCount={packageData.reviewCount}
            />
            <span className="text-[11px] font-medium text-[#0866D9] bg-[#EAF6FF] px-2.5 py-0.5 rounded-full">
              {packageData.category[0]}
            </span>
          </div>

          {/* Title */}
          <Link to={`/packages/${packageData.slug}`}>
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#071B35] group-hover:text-[#0866D9] transition-colors leading-snug line-clamp-2">
              {packageData.title}
            </h3>
          </Link>

          <p className="text-xs text-[#64748B] mt-1 line-clamp-1">
            {packageData.subtitle}
          </p>

          {/* Highlights checklist */}
          <div className="mt-3.5 pt-3.5 border-t border-slate-100 space-y-1.5">
            {packageData.highlights.slice(0, 3).map((hl, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <Check size={13} className="text-[#00B8A9] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTAs */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#64748B] block">
                Starting from
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-extrabold text-xl text-[#0866D9]">
                  {formatINR(packageData.startingPrice)}
                </span>
                {packageData.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatINR(packageData.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[10px] text-slate-400">per person</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/packages/${packageData.slug}`}
              className="py-2.5 px-3 rounded-xl border border-[#0866D9] text-[#0866D9] hover:bg-[#0866D9] hover:text-white font-heading font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>Details</span>
              <ArrowRight size={13} />
            </Link>

            <button
              onClick={() => openInquiryModal({
                packageName: packageData.title,
                destination: packageData.destination,
                price: packageData.startingPrice
              })}
              className="py-2.5 px-3 rounded-xl bg-[#FF8A38] hover:bg-[#e06c1d] text-white font-heading font-bold text-xs uppercase tracking-wider text-center shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Send size={13} />
              <span>Inquire</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
