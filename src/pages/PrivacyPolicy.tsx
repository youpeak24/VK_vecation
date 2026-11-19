import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COMPANY } from '../data/company';
import { SEOHead } from '../components/seo/SEOHead';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="Privacy Policy | VK Vacations India"
        description="Read the official Privacy Policy of VK Vacations. Transparent terms on customer data protection, encryption, cookies and booking details."
        canonical="/privacy-policy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#0866D9] font-semibold mb-6 hover:underline">
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0866D9] block mb-1">
              Legal Transparency
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#071B35]">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">Last Updated: January 2026</p>
          </div>

          <p>
            At <strong>{COMPANY.name}</strong>, your privacy and trust are our highest priorities. This Privacy Policy details how we collect, use, and protect your personal information when you browse our website or book holiday packages through our travel desk.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">1. Information We Collect</h3>
          <p>
            We collect personal details provided willingly by you during trip inquiries or bookings, including: full name, contact phone number, email address, city of residence, number of travelers, passport copies (strictly when necessary for international visa and airline ticket issuance), and dietary preferences.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">2. How We Use Your Information</h3>
          <p>
            Your information is used solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Generate customized day-by-day travel quotations and itineraries.</li>
            <li>Book verified accommodations, private vehicle drivers, and activity permits on your behalf.</li>
            <li>Submit visa documentation to accredited consular agencies and VFS Global partners.</li>
            <li>Provide critical travel updates and 24/7 hotline support throughout your tour.</li>
          </ul>

          <h3 className="font-heading font-bold text-base text-[#071B35]">3. No Sale of Personal Data</h3>
          <p>
            We do not sell, rent, or trade your personal information to third-party telemarketers or external advertisers under any circumstances.
          </p>

          <h3 className="font-heading font-bold text-base text-[#071B35]">4. Contact Our Privacy Officer</h3>
          <p>
            If you have questions regarding your data or wish to request deletion of your inquiry details, please contact us at <a href={`mailto:${COMPANY.email}`} className="text-[#0866D9] font-semibold">{COMPANY.email}</a> or call our registered office.
          </p>
        </div>

      </div>
    </div>
  );
};
