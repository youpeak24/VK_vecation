import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COMPANY } from '../data/company';
import { SEOHead } from '../components/seo/SEOHead';

export const TermsConditions: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="Terms & Conditions | VK Vacations India"
        description="Official customer terms and conditions for holiday package bookings, travel documentation, airline schedules and payment commitments with VK Vacations."
        canonical="/terms"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#0866D9] font-semibold mb-6 hover:underline">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
              Customer Agreement
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#071B35]">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-400 mt-1">Effective: January 2026</p>
          </div>

          <p>
            Welcome to <strong>{COMPANY.name}</strong>. By accessing our portal, submitting an inquiry, or booking a package, you agree to comply with and be bound by the following terms and booking guidelines.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">1. Booking Confirmation & Payment Terms</h3>
          <p>
            A non-refundable advance deposit (typically 25% to 50% depending on airline and resort non-refundable booking windows) is required to secure reservations. The balance payment must be settled at least 15 days prior to scheduled departure.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">2. Flight & Visa Regulatory Terms</h3>
          <p>
            Visa issuance and entry permits are the sole discretion of the respective embassy or immigration authority. While VK Vacations provides expert documentation assistance, we cannot guarantee visa approval. Airline baggage rules and flight schedule amendments are subject to carrier conditions.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">3. Force Majeure</h3>
          <p>
            VK Vacations shall not be held liable for delays, losses, or alterations arising from acts of God, extreme weather events, natural disasters, geopolitical restrictions, or carrier operational strikes. Alternative arrangements will be provided in best faith.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">4. Jurisdiction</h3>
          <p>
            Any disputes arising from travel agreements with VK Vacations shall be subject exclusively to the courts of Chennai, Tamil Nadu, India.
          </p>
        </div>

      </div>
    </div>
  );
};
