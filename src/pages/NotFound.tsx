import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center bg-[#F8FAFC]">
      <div className="w-20 h-20 rounded-3xl bg-[#EAF6FF] text-[#0866D9] flex items-center justify-center mb-6 shadow-md">
        <Compass size={40} className="animate-spin-slow" />
      </div>

      <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-[#FF8A38] mb-2 block">
        404 — Page Not Found
      </span>

      <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight max-w-md">
        Looks Like You've Wandered Off The Map
      </h1>

      <p className="text-sm text-[#64748B] max-w-md mt-3 mb-8">
        The destination you are trying to visit doesn't exist or has moved. Let's get you back on course.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0866D9] hover:bg-[#064ea5] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
        >
          <Home size={15} />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/packages"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#071B35] border border-slate-200 font-heading font-bold text-xs uppercase tracking-wider shadow-xs transition-all"
        >
          <Search size={15} />
          <span>Browse Packages</span>
        </Link>
      </div>
    </div>
  );
};
