import React from 'react';
import { 
  Sparkles, 
  Map, 
  Compass, 
  Globe2, 
  SlidersHorizontal, 
  Headphones, 
  Users 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      icon: Map,
      title: "Personalized Travel Planning",
      description: "Every journey is customized to match your family's pace, dates, accommodation preferences, and individual interests.",
      color: "text-[#0866D9]",
      bg: "bg-blue-50"
    },
    {
      icon: Compass,
      title: "Thoughtfully Designed Itineraries",
      description: "Optimal balance between iconic landmark sightseeing, leisure time, scenic routes, and comfortable transit intervals.",
      color: "text-[#00B8A9]",
      bg: "bg-teal-50"
    },
    {
      icon: Globe2,
      title: "Domestic & International Packages",
      description: "Seamless coverage across Incredible India's top circuits and the most sought-after international holiday destinations.",
      color: "text-[#FF8A38]",
      bg: "bg-orange-50"
    },
    {
      icon: SlidersHorizontal,
      title: "Flexible Travel Options",
      description: "Choose between guided group departures with fixed dates or fully private chauffeured tours tailored exclusively for you.",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      icon: Headphones,
      title: "Dedicated Travel Assistance",
      description: "Direct access to our holiday desk team from initial inquiry until your safe return home, ensuring total peace of mind.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: Users,
      title: "Group & Family Experiences",
      description: "Kid-friendly activities, senior-citizen care, and wholesome South Indian dining choices thoughtfully arranged.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles size={13} />
            <span>THE VK VACATIONS DIFFERENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            YOUR HOLIDAY.{' '}
            <span className="text-[#0866D9]">OUR COMMITMENT.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#64748B] mt-3">
            Crafting journeys that celebrate personal comfort, authentic experiences, and lifelong family joy.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xs`}>
                    <Icon size={28} />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#071B35] group-hover:text-[#0866D9] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#00B8A9]">
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
