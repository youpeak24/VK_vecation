import React from 'react';
import { Compass } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-[#EAF6FF] border-t-[#0866D9] animate-spin" />
        <Compass size={24} className="text-[#00B8A9] absolute animate-pulse" />
      </div>
      <span className="font-heading font-bold text-xs uppercase tracking-widest text-[#071B35] mt-4 block">
        VK Vacations
      </span>
      <p className="text-[11px] text-[#64748B] mt-0.5">
        Preparing your luxury travel experience...
      </p>
    </div>
  );
};
