import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  ShieldCheck, 
  HelpCircle, 
  Send, 
  Info,
  DollarSign
} from 'lucide-react';
import { PackageCard } from '../components/packages/PackageCard';
import { useInquiryModal } from '../context/InquiryModalContext';
import { SEOHead } from '../components/seo/SEOHead';
import { buildDestinationSchema, buildBreadcrumbSchema } from '../utils/seoSchemas';
import { usePackages, useDestinations } from '../hooks/useContent';

export const DestinationDetail: React.FC = () => {
  const allPackages = usePackages();
  const allDestinations = useDestinations();
  const { slug } = useParams<{ slug: string }>();
  const { openInquiryModal } = useInquiryModal();

  const dest = allDestinations.find((d: any) => d.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!dest) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
        <h2 className="text-3xl font-heading font-extrabold text-[#071B35] mb-2">Destination Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">We couldn't locate this destination guide in our directory.</p>
        <Link to="/destinations" className="px-6 py-3 rounded-full bg-[#0866D9] text-white font-heading font-bold text-xs uppercase tracking-wider">
          Explore All Destinations
        </Link>
      </div>
    );
  }

  // Find packages corresponding to this destination
  const matchedPackages = allPackages.filter((p: any) => 
    p.destination.toLowerCase().includes(dest.name.toLowerCase()) ||
    dest.name.toLowerCase().includes(p.destination.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC]">
      <SEOHead
        title={`${dest.name} Travel Guide & Tour Packages | VK Vacations`}
        description={dest.overview || dest.tagline || `Discover ${dest.name}: best time to visit, top attractions, climate, visa rules and luxury holiday packages by VK Vacations.`}
        keywords={[dest.name, dest.country, "travel guide", "best time to visit", "tour packages", "VK Vacations"]}
        canonical={`/destinations/${dest.slug}`}
        ogImage={dest.heroImage}
        schema={[
          buildDestinationSchema(dest, `/destinations/${dest.slug}`),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Destinations", url: "/destinations" },
            { name: dest.name, url: `/destinations/${dest.slug}` }
          ])
        ]}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/" className="hover:text-[#0866D9]">Home</Link>
          <span>/</span>
          <Link to="/destinations" className="hover:text-[#0866D9]">Destinations</Link>
          <span>/</span>
          <span className="text-[#142238] font-semibold">{dest.name}</span>
        </div>
      </div>

      {/* Hero Visual Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] sm:aspect-[21/9] max-h-[500px] bg-slate-900">
          <img
            src={dest.heroImage}
            alt={dest.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/90 via-[#071B35]/40 to-transparent" />

          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white">
            <span className="px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20 w-fit mb-2">
              {dest.country} • {dest.isInternational ? 'International Gateway' : 'Incredible India'}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
              {dest.name}
            </h1>

            <p className="text-sm sm:text-lg text-slate-200 mt-2 max-w-2xl font-sans">
              {dest.tagline}
            </p>

            {/* Quick Fast Facts Bar */}
            <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-slate-200">
              <div className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[#FF8A38]" />
                <span><strong>Best Time:</strong> {dest.bestTimeToVisit.split('(')[0]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#00B8A9]" />
                <span><strong>Ideal Duration:</strong> {dest.idealDuration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign size={15} className="text-[#FFC857]" />
                <span><strong>Currency:</strong> {dest.currency}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8 cols): Overview, Attractions, Travel Tips, FAQs */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block">
                Destination Profile
              </span>
              <h2 className="text-2xl font-heading font-bold text-[#071B35]">
                About {dest.name}
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                {dest.overview}
              </p>
            </section>

            {/* Top Attractions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
                  Must-See Sights
                </span>
                <h2 className="text-2xl font-heading font-bold text-[#071B35]">
                  Top Attractions & Experiences in {dest.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.topAttractions.map((att: any, i: number) => (
                  <div key={i} className="group rounded-2xl overflow-hidden border border-slate-200/80 bg-[#F8FAFC] flex flex-col justify-between">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={att.image} alt={att.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-heading font-bold text-sm text-[#071B35] group-hover:text-[#0866D9] transition-colors">
                        {att.name}
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {att.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Travel Tips & Visa Advisory */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
                  Travel Advisory
                </span>
                <h2 className="text-2xl font-heading font-bold text-[#071B35]">
                  Insider Tips & Guidelines
                </h2>
              </div>

              <div className="space-y-2.5">
                {dest.travelTips.map((tip: string, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/60 flex items-start gap-3 text-xs text-slate-700">
                    <Info size={16} className="text-[#0866D9] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              {/* Visa Information Box (if international) */}
              {dest.visaInfo && (
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-amber-600" />
                      <span>Visa Guidelines for Indian Citizens</span>
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded">
                      {dest.visaInfo.lastUpdated}
                    </span>
                  </div>
                  <p className="text-slate-800 font-medium">
                    <strong>Type:</strong> {dest.visaInfo.type}
                  </p>
                  <p className="text-slate-700">
                    <strong>Processing Time:</strong> {dest.visaInfo.processingTime}
                  </p>
                  <p className="text-slate-600 italic">
                    Note: {dest.visaInfo.note}
                  </p>
                </div>
              )}
            </section>

            {/* Frequently Asked Questions */}
            {dest.faqs && dest.faqs.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
                    Good To Know
                  </span>
                  <h2 className="text-2xl font-heading font-bold text-[#071B35]">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-3">
                  {dest.faqs.map((faq: any, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-1.5">
                      <h4 className="font-heading font-bold text-sm text-[#071B35] flex items-start gap-2">
                        <HelpCircle size={15} className="text-[#0866D9] shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-xs text-[#64748B] pl-6 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Column (4 cols): Inquiry Box & Available Packages */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
                  Ready to Visit {dest.name}?
                </span>
                <h3 className="text-xl font-heading font-bold text-[#071B35]">
                  Get a Free Custom Quote
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  Our travel planners will craft a tailored day-by-day proposal with flight guidance and meal preferences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Ideal Trip:</span>
                  <span className="font-semibold text-slate-800">{dest.idealDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Best Season:</span>
                  <span className="font-semibold text-slate-800">{dest.bestTimeToVisit.split('(')[0]}</span>
                </div>
              </div>

              <button
                onClick={() => openInquiryModal({ destination: dest.name })}
                className="w-full py-4 px-6 rounded-2xl bg-[#FF8A38] hover:bg-[#e06c1d] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <Send size={15} />
                <span>PLAN MY {dest.name.toUpperCase()} VACATION</span>
              </button>

              <div className="pt-2 text-center text-xs text-[#64748B]">
                <span>Immediate assistance: </span>
                <Link to="/contact" className="font-bold text-[#0866D9] hover:underline">Contact Desk</Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Available Packages for this Destination */}
      {matchedPackages.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block">
                Holiday Packages
              </span>
              <h3 className="text-2xl font-heading font-bold text-[#071B35]">
                Curated Packages for {dest.name}
              </h3>
            </div>
            <Link to="/packages" className="text-xs font-bold text-[#0866D9] hover:underline">
              View All Packages
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedPackages.map((pkg: any) => (
              <PackageCard key={pkg.id} packageData={pkg} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
