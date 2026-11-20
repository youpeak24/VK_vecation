import React from 'react';
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY } from '../../data/company';

export const TopContactBar: React.FC = () => {
  return (
    <div className="bg-[#071B35] text-slate-300 text-xs py-2 px-4 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Trust & Travel Assistance */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-white font-medium">
            <span className="w-2 h-2 rounded-full bg-[#00B8A9] animate-pulse"></span>
            <span className="font-heading font-bold text-white tracking-wider">{COMPANY.name}</span>
            <span className="text-slate-400">| Travel Assistance</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <Clock size={13} className="text-[#FF8A38]" />
            <span>{COMPANY.businessHours}</span>
          </div>
        </div>

        {/* Right: Verified Direct Contacts */}
        <div className="flex items-center gap-5">
          <a
            href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors group"
          >
            <Phone size={13} className="text-[#00B8A9] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">{COMPANY.phone}</span>
          </a>

          <a
            href={`mailto:${COMPANY.email}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail size={13} className="text-[#FF8A38]" />
            <span>{COMPANY.email}</span>
          </a>

          <div className="hidden xl:flex items-center gap-1 text-[11px] text-[#00B8A9] font-medium bg-[#00B8A9]/10 px-2 py-0.5 rounded-full">
            <ShieldCheck size={12} />
            <span>Govt. Reg. Travel Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
};
