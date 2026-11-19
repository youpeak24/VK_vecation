import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Check, 
  X, 
  Hotel, 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  Share2,
  Utensils,
  Send,
  ShieldCheck
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/packages';
import { COMPANY } from '../data/company';
import { formatINR, generateWhatsAppLink } from '../utils/formatters';
import { RatingStars } from '../components/ui/RatingStars';
import { useInquiryModal } from '../context/InquiryModalContext';
import { PackageCard } from '../components/packages/PackageCard';
import { packageService } from '../services/packageService';
import { SEOHead } from '../components/seo/SEOHead';
import { buildPackageSchema, buildBreadcrumbSchema } from '../utils/seoSchemas';

export const PackageDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openInquiryModal } = useInquiryModal();

  const [activeDay, setActiveDay] = useState<number>(1);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>('');

  const pkg = TOUR_PACKAGES.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pkg && pkg.featuredImage) {
      setSelectedGalleryImg(pkg.featuredImage);
    }
  }, [slug, pkg]);

  if (!pkg) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
        <h2 className="text-3xl font-heading font-extrabold text-[#071B35] mb-2">Package Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">The requested holiday package is currently unavailable or has been archived.</p>
        <Link to="/packages" className="px-6 py-3 rounded-full bg-[#0866D9] text-white font-heading font-bold text-xs uppercase tracking-wider">
          Browse All Available Packages
        </Link>
      </div>
    );
  }

  const relatedPackages = packageService.getRelatedPackages(pkg.slug, 3);

  const waPackageLink = generateWhatsAppLink(
    COMPANY.whatsappNumber,
    `Hello VK Vacations! I am interested in the ${pkg.title} package (${pkg.duration.days}D/${pkg.duration.nights}N). Please share detailed itinerary and pricing.`
  );

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC]">
      <SEOHead
        title={`${pkg.title} (${pkg.duration.days}D/${pkg.duration.nights}N) | VK Vacations`}
        description={pkg.overview || pkg.subtitle || `${pkg.title} holiday package with luxury accommodation, transfers, guided tours and meals.`}
        keywords={[pkg.title, pkg.destination, pkg.country, "holiday package", "tour package Chennai", "VK Vacations"]}
        canonical={`/packages/${pkg.slug}`}
        ogImage={pkg.featuredImage}
        ogType="product"
        schema={[
          buildPackageSchema(pkg, `/packages/${pkg.slug}`),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Packages", url: "/packages" },
            { name: pkg.title, url: `/packages/${pkg.slug}` }
          ])
        ]}
      />
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#0866D9]">Home</Link>
            <span>/</span>
            <Link to="/packages" className="hover:text-[#0866D9]">Packages</Link>
            <span>/</span>
            <span className="text-[#142238] font-semibold truncate max-w-xs">{pkg.destination}</span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: pkg.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Package link copied to clipboard!");
              }
            }}
            className="flex items-center gap-1 hover:text-[#0866D9] transition-colors cursor-pointer"
          >
            <Share2 size={14} />
            <span>Share Package</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] sm:aspect-[21/9] max-h-[550px] bg-slate-900">
          <img
            src={selectedGalleryImg || pkg.featuredImage}
            alt={pkg.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/90 via-[#071B35]/40 to-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-[#FF8A38] text-white">
                {pkg.category[0]}
              </span>
              {pkg.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {pkg.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight max-w-4xl">
              {pkg.title}
            </h1>

            <p className="text-xs sm:text-base text-slate-200 mt-2 max-w-3xl line-clamp-2">
              {pkg.subtitle}
            </p>

            {/* Quick stats on banner */}
            <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-1.5 font-semibold">
                <Clock size={16} className="text-[#FFC857]" />
                <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold">
                <MapPin size={16} className="text-[#00B8A9]" />
                <span>{pkg.destination}, {pkg.country}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RatingStars rating={pkg.rating || 4.9} reviewCount={pkg.reviewCount} />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Thumbnails Strip */}
        {pkg.galleryImages && pkg.galleryImages.length > 1 && (
          <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 no-scrollbar">
            {pkg.galleryImages.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedGalleryImg(img)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  selectedGalleryImg === img ? 'border-[#0866D9] scale-105 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${pkg.destination} photo ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Main Content & Sticky Inquiry Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8 cols): Overview, Itinerary, Hotels, Inclusions */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Overview & Highlights */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
                  Tour Overview
                </span>
                <h2 className="text-2xl font-heading font-bold text-[#071B35]">
                  What Makes This Journey Special
                </h2>
                <p className="text-sm text-[#64748B] mt-3 leading-relaxed">
                  {pkg.overview}
                </p>
              </div>

              {/* Key Highlights Checklist */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/60 space-y-3">
                <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#071B35]">
                  Signature Highlights Included
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((hl: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-[#00B8A9]/10 text-[#00B8A9] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span className="font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Interactive Day-by-Day Itinerary */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
                    Day-by-Day Schedule
                  </span>
                  <h2 className="text-2xl font-heading font-bold text-[#071B35]">
                    Interactive Tour Itinerary
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {pkg.itinerary.length} Days Planned
                </span>
              </div>

              <div className="space-y-4">
                {pkg.itinerary.map((day: any) => {
                  const isOpen = activeDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setActiveDay(isOpen ? 0 : day.day)}
                        className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                          isOpen ? 'bg-[#EAF6FF]/60 text-[#0866D9]' : 'bg-[#F8FAFC] text-[#071B35] hover:bg-slate-100/80'
                        }`}
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-heading font-bold text-xs shrink-0 ${
                            isOpen ? 'bg-[#0866D9] text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            D{day.day}
                          </span>
                          <div>
                            <h4 className="font-heading font-bold text-sm sm:text-base leading-snug">
                              {day.title}
                            </h4>
                            <span className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                              <MapPin size={11} className="text-[#FF8A38]" />
                              <span>{day.location}</span>
                            </span>
                          </div>
                        </div>

                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0866D9]' : 'text-slate-400'}`}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-5 bg-white space-y-4 text-xs leading-relaxed text-slate-700 animate-in fade-in duration-200">
                          <p>{day.description}</p>

                          {/* Meals Included */}
                          {day.mealsIncluded && day.mealsIncluded.length > 0 && (
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl w-fit">
                              <Utensils size={12} className="text-emerald-600" />
                              <span>Meals Included: {day.mealsIncluded.join(', ')}</span>
                            </div>
                          )}

                          {/* Highlights */}
                          {day.highlights && day.highlights.length > 0 && (
                            <div className="pt-2 border-t border-slate-100">
                              <span className="font-bold text-[#071B35] block mb-1.5">Key Highlights for the Day:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {day.highlights.map((h: string, i: number) => (
                                  <span key={i} className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                                    • {h}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. Inclusions & Exclusions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
                  Transparent Terms
                </span>
                <h2 className="text-2xl font-heading font-bold text-[#071B35]">
                  What's Included & Excluded
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <Check size={16} className="text-emerald-600" />
                    <span>Package Inclusions</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {pkg.inclusions.map((inc: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-3">
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-rose-900 flex items-center gap-2">
                    <X size={16} className="text-rose-600" />
                    <span>Package Exclusions</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {pkg.exclusions.map((exc: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <X size={13} className="text-rose-600 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Hotel Accommodations */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
                  Where You Stay
                </span>
                <h2 className="text-2xl font-heading font-bold text-[#071B35]">
                  Verified Hotel & Resort Accommodations
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Properties selected for hygiene, comfort, scenic views, and high guest satisfaction.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(pkg.hotels || []).map((h: any, i: number) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 text-[#0866D9]">
                        <Hotel size={18} />
                        <span className="font-heading font-bold text-sm text-[#071B35]">{h.name}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {h.nights} Nights
                      </span>
                    </div>

                    <div className="text-xs text-[#00B8A9] font-medium">
                      {h.category} • {h.location}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {h.amenities.map((am: string, idx: number) => (
                        <span key={idx} className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200/60">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column (4 cols): Sticky Price Card & Inquiry Box */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              
              {/* Pricing Header */}
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#64748B] block">
                  Package Starting From
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-heading font-extrabold text-[#0866D9]">
                    {formatINR(pkg.startingPrice)}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatINR(pkg.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {pkg.priceNote || 'per person on twin sharing'}
                </span>
              </div>

              {/* Quick Departure Info */}
              <div className="p-4 rounded-2xl bg-[#EAF6FF]/60 border border-blue-100 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Departure Hubs:</span>
                  <span className="font-semibold text-slate-800">{pkg.departureCities ? pkg.departureCities.slice(0, 3).join(', ') : 'Chennai, Bangalore, Mumbai'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-slate-500">Best For:</span>
                  <span className="font-semibold text-slate-800">{pkg.suitableFor ? pkg.suitableFor.join(', ') : 'Couples, Families, Groups'}</span>
                </div>
              </div>

              {/* Direct Booking & Inquire Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => openInquiryModal({
                    packageName: pkg.title,
                    destination: pkg.destination,
                    price: pkg.startingPrice
                  })}
                  className="w-full py-4 px-6 rounded-2xl bg-[#FF8A38] hover:bg-[#e06c1d] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <Send size={15} />
                  <span>INQUIRE / CUSTOMIZE TRIP</span>
                </button>

                <a
                  href={waPackageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`}
                  className="w-full py-3 px-6 rounded-2xl border border-slate-300 hover:border-[#0866D9] text-[#142238] font-heading font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Phone size={14} className="text-[#0866D9]" />
                  <span>Call Holiday Desk: {COMPANY.phone}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-[#64748B]">
                <ShieldCheck size={14} className="text-[#00B8A9]" />
                <span>Govt. Reg. Operator • 100% Verified Hotels</span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Related Packages Carousel/Grid */}
      {relatedPackages.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block">
                More Like This
              </span>
              <h3 className="text-2xl font-heading font-bold text-[#071B35]">
                Similar Handcrafted Holidays
              </h3>
            </div>
            <Link to="/packages" className="text-xs font-bold text-[#0866D9] hover:underline">
              View All Packages
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPackages.map((rp: any) => (
              <PackageCard key={rp.id} packageData={rp} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">From</span>
          <span className="font-heading font-extrabold text-base text-[#0866D9]">
            {formatINR(pkg.startingPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`}
            className="p-3 bg-slate-100 text-[#0866D9] rounded-xl"
            aria-label="Call Now"
          >
            <Phone size={18} />
          </a>

          <button
            onClick={() => openInquiryModal({
              packageName: pkg.title,
              destination: pkg.destination,
              price: pkg.startingPrice
            })}
            className="py-3 px-5 bg-[#FF8A38] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>

    </div>
  );
};
