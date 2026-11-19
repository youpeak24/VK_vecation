import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle,
  Calendar,
  Users,
  MapPin,
  Clock,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { inquiryService, InquiryResponse } from '../../services/inquiryService';
import { InquiryFormData } from '../../types';
import { COMPANY, VACATION_TYPES, BUDGET_RANGES } from '../../data/company';
import { generateWhatsAppLink } from '../../utils/formatters';

export const LeadInquirySection: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    city: '',
    email: '',
    phone: '',
    whatsapp: '',
    destination: '',
    travelDate: '',
    travelers: 2,
    vacationType: 'Family Vacation',
    budgetRange: '₹30,000 - ₹60,000 / person',
    specialRequirements: '',
    preferredContactMethod: 'Phone',
    honeypot: '',
    consent: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<InquiryResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.destination.trim()) {
      setErrorMessage("Please complete all required fields (*).");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please accept the terms to receive your customized itinerary.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await inquiryService.submitInquiry(formData);
      setResult(res);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // graceful ignore
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Unable to send inquiry. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const waLink = result
    ? generateWhatsAppLink(
        COMPANY.whatsappNumber,
        `Hello VK Vacations! I just submitted an inquiry for ${formData.destination} (Ref #${result.referenceNumber}, ${formData.travelers} guests). Please send me the custom quote.`
      )
    : '';

  return (
    <section id="book-vacation" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-[#EAF6FF]/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Why Inquire & Direct Help (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              <Sparkles size={13} />
              <span>CUSTOMIZED TRAVEL DESK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight leading-tight">
              YOUR DREAM VACATION{' '}
              <span className="text-[#0866D9]">STARTS RIGHT HERE.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Tell us what you envision. Our certified holiday consultants in Chennai will prepare a transparent day-by-day itinerary with exact inclusions, vehicle options, and honest advice.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-100 text-[#0866D9] shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#071B35]">
                    Fast Turnaround within 2 Hours
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Receive an initial consultation and customized cost sheet without delay.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-teal-100 text-[#00B8A9] shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#071B35]">
                    No Hidden Booking Surcharges
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Clear hotel grades, driver allowances, toll permits, and tax transparency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-orange-100 text-[#FF8A38] shrink-0 mt-0.5">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#071B35]">
                    Direct Travel Desk Hotline
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Prefer speaking to a human? Call <a href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`} className="font-bold text-[#0866D9] hover:underline">{COMPANY.phone}</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/80 relative">
              
              {result ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>

                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                    Inquiry Reference: #{result.referenceNumber}
                  </span>

                  <h3 className="text-2xl font-heading font-extrabold text-[#071B35]">
                    Inquiry Received Successfully!
                  </h3>

                  <p className="text-sm text-[#64748B] max-w-md mx-auto">
                    {result.message}
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                    >
                      <MessageCircle size={16} />
                      <span>Connect via WhatsApp Now</span>
                    </a>

                    <button
                      onClick={() => setResult(null)}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-[#071B35]">
                      Request a Custom Quote
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Fill out your travel details and we'll curate your personalized vacation plan.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle size={15} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="vk_anti_bot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                  />

                  {/* Row 1: Name & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh S."
                        className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                        City of Residence <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Chennai, Tamil Nadu"
                        className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 9384957775"
                        className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Destination & Travel Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                        Dream Destination <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="e.g. Switzerland / Kashmir / Dubai"
                        className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                        Expected Travel Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                      />
                    </div>
                  </div>

                  {/* Row 4: Guests & Vacation Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                        Travelers <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                        className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                      >
                        <option value={1}>1 Solo Explorer</option>
                        <option value={2}>2 Adults (Couple / Twin)</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Travelers (Family)</option>
                        <option value={5}>5 Travelers (Family)</option>
                        <option value={6}>6+ Group Travelers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                        Vacation Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.vacationType}
                        onChange={(e) => setFormData({ ...formData, vacationType: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                      >
                        {VACATION_TYPES.map((type, i) => (
                          <option key={i} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Budget Range */}
                  <div>
                    <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                      Budget Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                    >
                      {BUDGET_RANGES.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Special requirements */}
                  <div>
                    <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-[#142238] mb-1">
                      Special Requirements & Preferences
                    </label>
                    <textarea
                      rows={2}
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                      placeholder="Vegetarian meal requirements, senior citizens, specific departure city, hotel categories..."
                      className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl p-3 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9]"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="inline-consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 rounded text-[#0866D9]"
                    />
                    <label htmlFor="inline-consent" className="text-[11px] text-[#64748B]">
                      I authorize VK Vacations to provide customized travel quotations and travel updates.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#0866D9] hover:bg-[#064ea5] shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Processing Request...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>GET MY CUSTOM ITINERARY</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    🔒 SSL Secured • Direct Verified Quote • No Spam Guarantee
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
