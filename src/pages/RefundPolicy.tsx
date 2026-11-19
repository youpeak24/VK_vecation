import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COMPANY } from '../data/company';
import { SEOHead } from '../components/seo/SEOHead';

export const RefundPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="Cancellation & Refund Policy | VK Vacations India"
        description="Official cancellation timeline, refund percentages, flight ticket rules and hotel supplier refund procedures with VK Vacations."
        canonical="/refund-policy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#0866D9] font-semibold mb-6 hover:underline">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
              Cancellation Guidelines
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#071B35]">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">Effective: January 2026</p>
          </div>

          <p>
            At <strong>{COMPANY.name}</strong>, we strive to maintain transparent and fair cancellation policies. Because travel services involve pre-booking with hotels, airlines, and transport vendors, cancellation charges apply as outlined below.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">1. Standard Cancellation Fee Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-[#071B35] text-white">
                <tr>
                  <th className="p-3">Timeline Prior to Departure</th>
                  <th className="p-3">Cancellation Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3">30 Days or more before departure</td>
                  <td className="p-3 font-semibold text-emerald-700">Service token charge only (₹2,500/person) + non-refundable vendor costs</td>
                </tr>
                <tr>
                  <td className="p-3">29 to 15 Days before departure</td>
                  <td className="p-3 font-semibold text-amber-700">25% of total package cost + non-refundable airfare</td>
                </tr>
                <tr>
                  <td className="p-3">14 to 7 Days before departure</td>
                  <td className="p-3 font-semibold text-orange-700">50% of total package cost + non-refundable airfare</td>
                </tr>
                <tr>
                  <td className="p-3">Less than 7 Days or No Show</td>
                  <td className="p-3 font-semibold text-rose-700">100% of package cost (No Refund)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading font-bold text-base text-[#071B35]">2. Refund Processing Time</h3>
          <p>
            Eligible refunds will be processed via original bank transfer / UPI method within 7 to 10 working days of official written cancellation notice receipt.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">3. Non-Refundable Components</h3>
          <p>
            Please note that non-refundable air tickets, visa submission fees paid to embassies, and peak holiday surcharge deposits (such as Diwali, Christmas, or New Year resort supplements) are strictly non-refundable once committed.
          </p>
        </div>

      </div>
    </div>
  );
};
