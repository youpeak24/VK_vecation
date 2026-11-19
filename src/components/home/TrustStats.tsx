import React from 'react';
import { 
  Users, 
  Globe2, 
  CalendarCheck, 
  Smile, 
  ShieldCheck, 
  Headphones, 
  Map, 
  HeartHandshake 
} from 'lucide-react';
import { CounterNumber } from '../animations/CounterNumber';
import { COMPANY } from '../../data/company';

export const TrustStats: React.FC = () => {
  const qualitativePillars = [
    {
      icon: Map,
      title: "Personalized Itineraries",
      desc: "Tailored to your family's pace, preferences, and dietary requirements."
    },
    {
      icon: Headphones,
      title: "Dedicated Travel Assistance",
      desc: "Round-the-clock support from your dedicated Chennai holiday coordinator."
    },
    {
      icon: ShieldCheck,
      title: "Carefully Planned Experiences",
      desc: "Pre-screened luxury hotels, certified drivers, and authentic local guides."
    },
    {
      icon: HeartHandshake,
      title: "Memorable Journeys",
      desc: "Over two decades of crafting smiles and lifelong travel memories."
    }
  ];

  return (
    <section className="py-20 bg-[#071B35] text-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0866D9]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B8A9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Animated Metrics Counters Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-16 border-b border-white/10">
          {COMPANY.metrics.map((metric, idx) => {
            const icons = [Users, Globe2, CalendarCheck, Smile];
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className="text-center sm:text-left space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-white/10 text-[#00B8A9] mb-1">
                  <Icon size={24} />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
                  <CounterNumber
                    end={metric.value}
                    suffix={metric.suffix}
                    prefix={metric.prefix}
                  />
                </div>
                <h4 className="font-heading font-bold text-sm text-[#FFC857]">
                  {metric.label}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {metric.verifiedNote}
                </p>
              </div>
            );
          })}
        </div>

        {/* Qualitative Trust Statements */}
        <div className="pt-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#00B8A9] block mb-2">
              WHY THOUSANDS TRUST US
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Built on Transparency, Passion & Care
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualitativePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0866D9] to-[#00B8A9] text-white flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h4 className="font-heading font-bold text-base text-white">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
