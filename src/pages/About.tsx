import React, { useEffect } from 'react';
import { 
  Compass, 
  Target, 
  Eye
} from 'lucide-react';
import { COMPANY } from '../data/company';
import { CounterNumber } from '../components/animations/CounterNumber';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Vignesh Kumar",
      role: "Founder & Managing Director",
      bio: "With over 18 years across South Indian and international tour operations, Vignesh founded VK Vacations to deliver uncompromising personal attention and honest holiday planning.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Kavitha Ranganathan",
      role: "Head of International Operations",
      bio: "Overseeing seamless supplier relations across UAE, Southeast Asia, and Europe, Kavitha ensures high-standard private transfers and verified resort stays.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "S. Murugan",
      role: "Chief Tour Experience Manager",
      bio: "Leading our escort team across fixed group departures, Murugan ensures elderly guests and children receive warm hospitality and authentic South Indian dining.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="About VK Vacations — South India's Premier Luxury Travel Agency | Chennai"
        description="Learn about VK Vacations, our 18+ years of travel industry leadership, dedicated holiday consultants, mission, and why 28,500+ happy travelers trust us for bespoke holidays."
        keywords={["About VK Vacations", "luxury tour operator Chennai", "VK Vacations team", "best travel agency Tamil Nadu", "registered tour company India"]}
        canonical="/about"
        ogImage="/android-chrome-512x512.png"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        
        {/* Hero Narrative */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Compass size={13} />
            <span>DISCOVER OUR STORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight leading-tight">
            CRAFTING MEANINGFUL JOURNEYS,{' '}
            <span className="text-[#0866D9]">ONE TRAVELER AT A TIME.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            At VK Vacations, we believe that traveling is one of life's greatest privileges. 
            Rooted in Chennai and catering to travelers worldwide, our mission is to deliver 
            flawlessly orchestrated holiday packages that inspire wonder, comfort, and togetherness.
          </p>
        </section>

        {/* 2-Column Story with Visuals */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                alt="VK Vacations Team Vision"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#FFC857]">
                  Our Travel Philosophy
                </span>
                <p className="text-base font-bold text-white">
                  "Your Journey. Our Passion."
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#071B35]">
              Built On Integrity, Care & Unmatched Service
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              We started with a straightforward realization: travelers don't want generic cookie-cutter itineraries. They want authentic recommendations from specialists who know which hotel room has the best sunset view, which flight transfer is smoothest for senior family members, and where authentic vegetarian food can be savored in foreign capitals.
            </p>
            <p className="text-sm text-[#64748B] leading-relaxed">
              From individual customized honeymoons to group departures with 35 delighted guests, VK Vacations handles every detail with pride, transparency, and personal accountability.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="p-3 bg-[#EAF6FF] text-[#0866D9] rounded-xl font-heading font-bold text-xs uppercase tracking-wider">
                Govt. Registered Operator
              </div>
              <div className="p-3 bg-teal-50 text-[#00B8A9] rounded-xl font-heading font-bold text-xs uppercase tracking-wider">
                Direct Local Support
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0866D9] flex items-center justify-center">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold text-[#071B35]">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              To empower travelers to discover the world with total confidence and ease by curating transparent, high-value, and culturally considerate holiday packages backed by relentless on-ground customer support.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00B8A9] flex items-center justify-center">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold text-[#071B35]">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              To be South India's most trusted, innovative, and customer-loved travel enterprise, celebrated for crafting transformative journeys that unite families, foster cultural appreciation, and create memories that endure for generations.
            </p>
          </div>
        </section>

        {/* Verified Stats Banner */}
        <section className="bg-[#071B35] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {COMPANY.metrics.map((m: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#FFC857]">
                  <CounterNumber end={m.value} suffix={m.suffix} prefix={m.prefix} />
                </div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-white uppercase tracking-wider">
                  {m.label}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
              Experienced Professionals
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#071B35]">
              The People Behind VK Vacations
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Passionate globetrotters and industry veterans committed to your holiday comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md p-6 text-center space-y-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-[#EAF6FF] shadow-md">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#071B35]">
                    {member.name}
                  </h4>
                  <span className="text-xs text-[#0866D9] font-semibold block mt-0.5">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 text-center space-y-4">
          <h3 className="text-2xl font-heading font-bold text-[#071B35]">
            Let's Plan Your Next Adventure Together
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-lg mx-auto">
            Reach out to our Chennai headquarters or start an inquiry online for custom quotation and dates.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full bg-[#0866D9] hover:bg-[#064ea5] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Contact Our Team
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
