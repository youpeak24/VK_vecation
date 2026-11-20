import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Users, 
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { api } from '../services/api';
import { TemplePackage } from '../types';
import { formatCurrency } from '../utils/formatters';
import { useInquiryModal } from '../context/InquiryModalContext';
import { COMPANY } from '../data/company';
import { SEOHead } from '../components/seo/SEOHead';
import { useTemplePackages } from '../hooks/useContent';
import { buildTempleTourSchema, buildBreadcrumbSchema } from '../utils/seoSchemas';

export const TempleTourDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const templePackages = useTemplePackages();
  const pkg: TemplePackage | null = templePackages.find((t) => t.slug === slug) ?? null;
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [passengers, setPassengers] = useState<number>(2);
  const { openModal } = useInquiryModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!pkg) {
    return (
      <div className="pt-36 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-heading font-bold text-[#071B35] mb-2">Temple Pilgrimage Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">The sacred tour you are looking for is not listed or has been modified.</p>
        <Link to="/temple-tours" className="px-5 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider">
          Back to Temple Tours
        </Link>
      </div>
    );
  }

  const totalPrice = pkg.startingPrice * passengers;

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title={`${pkg.title} (${pkg.duration.days}D/${pkg.duration.nights}N) | VK Vacations Temple Tours`}
        description={pkg.overview || `${pkg.title} sacred pilgrimage package with VIP Darshan, AC transfers, verified hotel stays and pure Satvik vegetarian dining.`}
        keywords={[pkg.title, pkg.circuit, "temple tour package", "South Indian pilgrimage", "VIP Darshan", "VK Vacations"]}
        canonical={`/temple-tours/${pkg.slug}`}
        ogImage={pkg.featuredImage}
        ogType="product"
        schema={[
          buildTempleTourSchema(pkg, `/temple-tours/${pkg.slug}`),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Temple Tours", url: "/temple-tours" },
            { name: pkg.title, url: `/temple-tours/${pkg.slug}` }
          ])
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/temple-tours" 
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-slate-500 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>All Temple Tours</span>
          </Link>

          <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-heading font-semibold">
            {pkg.circuit}
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-2xl">
          <div className="h-[360px] sm:h-[440px] md:h-[500px] relative">
            <img 
              src={pkg.featuredImage} 
              alt={pkg.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B35] via-[#071B35]/40 to-transparent" />
            
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-amber-600 text-white text-xs font-heading font-bold px-3 py-1 rounded-full">
                  {pkg.deity}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white text-xs font-heading font-medium px-3 py-1 rounded-full border border-white/20">
                  {pkg.duration.days} Days / {pkg.duration.nights} Nights
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white text-xs font-heading font-medium px-3 py-1 rounded-full border border-white/20">
                  <MapPin size={12} className="inline mr-1 text-amber-400" />
                  {pkg.state}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight text-white mb-2">
                {pkg.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-3xl line-clamp-2">
                {pkg.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-heading font-bold text-[#071B35] mb-3 flex items-center gap-2">
                <Sparkles size={20} className="text-amber-600" />
                Spiritual Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {pkg.overview}
              </p>
            </div>

            {/* Temples Covered */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-sm">
              <h2 className="text-xl font-heading font-bold text-[#071B35] mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-amber-600" />
                Sacred Temples & Shrines Visited
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.templesCovered.map((temple, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-heading font-bold text-[#071B35]">{temple}</h4>
                      <p className="text-[11px] text-amber-800 font-medium">Special Darshan Privileges Included</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Darshan & VIP Privileges */}
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-white p-6 sm:p-8 rounded-3xl border border-amber-200">
              <h2 className="text-xl font-heading font-bold text-[#071B35] mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-amber-600" />
                Included Darshan Privileges & Rituals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.darshanTypes.map((darshan, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 bg-white p-3 rounded-xl border border-amber-200/80 shadow-sm">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{darshan}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Tour Highlights */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-heading font-bold text-[#071B35] mb-4">
                Pilgrimage Highlights
              </h2>
              <ul className="space-y-3">
                {pkg.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sacred Day-by-Day Itinerary */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl font-heading font-bold text-[#071B35] mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-amber-600" />
                Detailed Daily Pilgrimage Schedule
              </h2>

              <div className="space-y-4">
                {pkg.itinerary.map((dayItem) => {
                  const isExpanded = expandedDay === dayItem.day;
                  return (
                    <div 
                      key={dayItem.day}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setExpandedDay(isExpanded ? null : dayItem.day)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-50/50 hover:bg-slate-100/70 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-xs font-heading font-bold">
                            Day {dayItem.day}
                          </span>
                          <div>
                            <h4 className="text-sm sm:text-base font-heading font-bold text-[#071B35]">
                              {dayItem.title}
                            </h4>
                            <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin size={12} /> {dayItem.location}
                            </span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                      </button>

                      {isExpanded && (
                        <div className="p-4 sm:p-5 pt-2 border-t border-slate-100 bg-white space-y-3">
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {dayItem.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                            <span className="text-xs font-semibold text-slate-500">Meals included:</span>
                            {dayItem.mealsIncluded.map((meal, mIdx) => (
                              <span key={mIdx} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md font-medium border border-emerald-200/50">
                                {meal}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-emerald-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                  What is Included
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 mt-1 shrink-0" />
                    <span>Special VIP Darshan tokens at all major shrines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 mt-1 shrink-0" />
                    <span>Pure vegetarian South Indian Satvik breakfast & meals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 mt-1 shrink-0" />
                    <span>Deluxe AC Hotel / Ashram stay near sacred premises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 mt-1 shrink-0" />
                    <span>Dedicated AC Coach or Innova vehicle with driver</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 mt-1 shrink-0" />
                    <span>Devotional Tamil / English tour pilgrimage guide</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-3xl">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-rose-800 mb-4 flex items-center gap-2">
                  <XCircle size={18} className="text-rose-600" />
                  What is Excluded
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-rose-950">
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-rose-600 mt-1 shrink-0" />
                    <span>Airfare or Train tickets to departure city</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-rose-600 mt-1 shrink-0" />
                    <span>Private archana or family sankalpam homam donations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-rose-600 mt-1 shrink-0" />
                    <span>Camera / video entry fees at temple entrances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle size={14} className="text-rose-600 mt-1 shrink-0" />
                    <span>Personal laundry, tips, and room service</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Sticky Booking & Inquiry Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xl space-y-6">
              
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-heading font-semibold block">
                  Fixed Package Rate
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-heading font-black text-[#071B35]">
                    {formatCurrency(pkg.startingPrice)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ person (Twin Sharing)</span>
                </div>
                <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block font-medium">
                  ✓ Includes GST & All VIP Darshan Fees
                </div>
              </div>

              {/* Passenger Selector */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="text-xs font-heading font-bold text-slate-700 block">
                  Select Number of Pilgrims
                </label>
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-2 bg-slate-50/50">
                  <div className="flex items-center gap-2 pl-2">
                    <Users size={16} className="text-amber-600" />
                    <span className="text-xs font-medium text-slate-700">{passengers} Adults</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-7 h-7 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{passengers}</span>
                    <button 
                      onClick={() => setPassengers(passengers + 1)}
                      className="w-7 h-7 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-700 font-bold hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-between text-xs text-slate-600">
                  <span>Estimated Total:</span>
                  <span className="font-heading font-bold text-base text-[#071B35]">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Inquiry Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openModal({ packageTitle: pkg.title, notes: `Inquiry for ${passengers} pilgrims. Total: ${formatCurrency(totalPrice)}` })}
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md shadow-amber-600/30 text-center cursor-pointer"
                >
                  Book Darshan / Send Inquiry
                </button>

                <a 
                  href={`https://wa.me/${COMPANY.whatsappNumber}?text=Namaskaram!%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.title)}%20package%20for%20${passengers}%20pilgrims.`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Need Help Assistance */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-2">
                <span className="text-xs font-heading font-bold text-[#071B35] block">
                  Pilgrimage Assistance Desk
                </span>
                <p className="text-[11px] text-slate-500">
                  Need elderly assistance, homam scheduling, or special pooja arrangements?
                </p>
                <a 
                  href={`tel:${COMPANY.phone.replace(/[^0-9+]/g, '')}`} 
                  className="text-xs font-heading font-bold text-amber-700 hover:underline inline-flex items-center gap-1.5"
                >
                  <Phone size={13} />
                  {COMPANY.phone}
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TempleTourDetail;
