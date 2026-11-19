import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle, 
  Calendar, 
  Users, 
  MapPin, 
  DollarSign,
  ShieldCheck,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useInquiryModal } from '../../context/InquiryModalContext';
import { inquiryService, InquiryResponse } from '../../services/inquiryService';
import { InquiryFormData } from '../../types';
import { COMPANY, VACATION_TYPES, BUDGET_RANGES } from '../../data/company';
import { generateWhatsAppLink, formatINR } from '../../utils/formatters';

export const InquiryModal: React.FC = () => {
  const { isOpen, packageContext, closeInquiryModal } = useInquiryModal();

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
    packageName: '',
    honeypot: '',
    consent: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<InquiryResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync packageContext when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmissionResult(null);
      setErrorMessage(null);
      if (packageContext) {
        setFormData(prev => ({
          ...prev,
          packageName: packageContext.packageName || '',
          destination: packageContext.destination || prev.destination || '',
        }));
      }
    }
  }, [isOpen, packageContext]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeInquiryModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeInquiryModal]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.destination.trim()) {
      setErrorMessage("Please fill in all required fields marked with *.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please accept the privacy consent to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await inquiryService.submitInquiry(formData);
      setSubmissionResult(response);
      
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // graceful ignore if confetti cannot run
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit inquiry. Please try again or call our hotline directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const waFollowUpLink = submissionResult
    ? generateWhatsAppLink(
        COMPANY.whatsappNumber,
        `Hello VK Vacations, I have submitted inquiry #${submissionResult.referenceNumber} for ${formData.destination} (${formData.travelers} travelers, travel date: ${formData.travelDate || 'flexible'}). Please assist with itinerary and pricing.`
      )
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col border border-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#071B35] via-[#0866D9] to-[#00B8A9] text-white p-6 relative shrink-0">
          <button
            onClick={closeInquiryModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFC857] mb-1">
            <Sparkles size={14} />
            <span>VK Vacations Concierge</span>
          </div>

          <h3 id="inquiry-title" className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            {packageContext?.packageName 
              ? `Inquire About ${packageContext.packageName}` 
              : "Plan Your Dream Holiday"}
          </h3>
          <p className="text-xs text-sky-100 mt-1 max-w-lg">
            Personalized itineraries, transparent pricing, and South Indian travel care. No hidden charges.
          </p>

          {packageContext?.price && (
            <div className="mt-3 inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">
              <span>Starting from {formatINR(packageContext.price)}</span>
            </div>
          )}
        </div>

        {/* Modal Body / Scrollable Form */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#F8FAFC]">
          
          {submissionResult ? (
            /* Success State */
            <div className="py-8 px-4 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Inquiry Confirmed: #{submissionResult.referenceNumber}
                </span>
                <h4 className="text-xl font-heading font-bold text-[#071B35]">
                  Thank you, {formData.fullName}!
                </h4>
                <p className="text-sm text-[#64748B] max-w-md mx-auto">
                  {submissionResult.message}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-800">{formData.destination}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Travelers:</span>
                  <span className="font-semibold text-slate-800">{formData.travelers} Guests</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Vacation Type:</span>
                  <span className="font-semibold text-slate-800">{formData.vacationType}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Estimated Travel Date:</span>
                  <span className="font-semibold text-slate-800">{formData.travelDate || 'Flexible'}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={waFollowUpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp Directly</span>
                </a>
                <button
                  onClick={closeInquiryModal}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot field (hidden from genuine users) */}
              <input
                type="text"
                name="vk_bot_check"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Row 1: Full Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9] focus:ring-1 focus:ring-[#0866D9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    City of Residence <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Chennai / Bangalore"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9] focus:ring-1 focus:ring-[#0866D9]"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 9384957775"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9] focus:ring-1 focus:ring-[#0866D9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. anand@example.com"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9] focus:ring-1 focus:ring-[#0866D9]"
                  />
                </div>
              </div>

              {/* Row 3: Destination & Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    Travel Destination <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Kashmir / Maldives / Dubai"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9] focus:ring-1 focus:ring-[#0866D9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    Expected Travel Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9] focus:ring-1 focus:ring-[#0866D9]"
                  />
                </div>
              </div>

              {/* Row 4: Travelers & Vacation Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    Number of Travelers <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                  >
                    <option value={1}>1 Solo Explorer</option>
                    <option value={2}>2 Adults (Couple / Twin)</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Travelers (Family)</option>
                    <option value={5}>5 Travelers (Family)</option>
                    <option value={6}>6+ Group Travelers</option>
                    <option value={10}>10+ Large Group</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    Vacation Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.vacationType}
                    onChange={(e) => setFormData({ ...formData, vacationType: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                  >
                    {VACATION_TYPES.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5: Budget Range */}
              <div>
                <label className="block text-xs font-semibold text-[#142238] mb-1">
                  Estimated Budget Range
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                >
                  {BUDGET_RANGES.map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-xs font-semibold text-[#142238] mb-1">
                  Special Requirements (Food preferences, hotel stars, senior citizens, flight city)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  placeholder="e.g. Require pure vegetarian South Indian food, 4-star lake-view room, departure from Chennai."
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-[#142238] placeholder:text-slate-400 focus:outline-none focus:border-[#0866D9]"
                />
              </div>

              {/* Consent & Security */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent-check"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded text-[#0866D9] focus:ring-[#0866D9]"
                />
                <label htmlFor="consent-check" className="text-[11px] text-[#64748B] leading-tight">
                  I agree to receive personalized itinerary details, call assistance, and quotes from VK Vacations. Your contact details remain 100% confidential.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#0866D9] hover:bg-[#064ea5] shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Connecting to Holiday Desk...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>SUBMIT HOLIDAY INQUIRY</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-[11px] text-[#64748B] pt-1">
                <ShieldCheck size={14} className="text-[#00B8A9]" />
                <span>Govt. Registered Operator • 100% Secure & Confidential</span>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
