import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle
} from 'lucide-react';
import { COMPANY } from '../data/company';
import { generateWhatsAppLink } from '../utils/formatters';
import { inquiryService } from '../services/inquiryService';
import { SEOHead } from '../components/seo/SEOHead';
import { buildBreadcrumbSchema } from '../utils/seoSchemas';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    honeypot: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.honeypot) return; // bot detection

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await inquiryService.submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '', honeypot: '' });
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to deliver message. Please contact us on phone or WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const waLink = generateWhatsAppLink(
    COMPANY.whatsappNumber,
    "Hello VK Vacations, I would like to get in touch with your travel assistance desk."
  );

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <SEOHead
        title="Contact VK Vacations — Chennai Travel Desk, Phone & Head Office"
        description="Contact VK Vacations travel consultants. Call +91 9384957775, chat on WhatsApp or visit our Cathedral Road, Chennai office for customized international and domestic vacation planning."
        keywords={["Contact VK Vacations", "VK Vacations phone number", "travel agency Chennai address", "holiday consultant Cathedral Road", "tour operator contact"]}
        canonical="/contact"
        ogImage="/android-chrome-512x512.png"
        schema={buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact Us", url: "/contact" }
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#EAF6FF] text-[#0866D9] text-xs font-heading font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            <Phone size={13} />
            <span>WE ARE HERE TO HELP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#071B35] tracking-tight">
            CONTACT <span className="text-[#0866D9]">VK VACATIONS</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Visit our Chennai offices, call our travel hotline, or send us a message below. We look forward to crafting your next holiday.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Phone */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0866D9] flex items-center justify-center">
              <Phone size={22} />
            </div>
            <h3 className="font-heading font-bold text-base text-[#071B35]">Call Travel Desk</h3>
            <div className="text-xs space-y-1">
              <a href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`} className="block font-bold text-[#0866D9] hover:underline text-sm">
                {COMPANY.phone}
              </a>
              <span className="text-slate-500 block text-[11px]">Direct Line & Reservations Hotline</span>
            </div>
            <span className="text-[11px] text-slate-400 block pt-1">Direct holiday consultant support</span>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle size={22} />
            </div>
            <h3 className="font-heading font-bold text-base text-[#071B35]">WhatsApp Chat</h3>
            <p className="text-xs text-slate-600">
              Quick itinerary PDFs, custom quotations, and instant query resolution.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:underline pt-1"
            >
              <span>Chat Now ({COMPANY.displayWhatsapp})</span>
            </a>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF8A38] flex items-center justify-center">
              <Mail size={22} />
            </div>
            <h3 className="font-heading font-bold text-base text-[#071B35]">Email Inquiries</h3>
            <div className="text-xs space-y-1">
              <a href={`mailto:${COMPANY.email}`} className="block font-bold text-[#0866D9] hover:underline">
                {COMPANY.email}
              </a>
              <a href={`mailto:${COMPANY.supportEmail}`} className="block text-slate-600 hover:underline">
                {COMPANY.supportEmail}
              </a>
            </div>
            <span className="text-[11px] text-slate-400 block pt-1">Response within 2-4 business hours</span>
          </div>

          {/* Card 4: Office Hours */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={22} />
            </div>
            <h3 className="font-heading font-bold text-base text-[#071B35]">Office Hours</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {COMPANY.businessHours}
            </p>
            <span className="text-[11px] text-[#00B8A9] font-semibold block pt-1">
              24/7 Hotline for onboard guests
            </span>
          </div>

        </div>

        {/* Form and Office Location Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold text-[#071B35]">Send Us a Message</h3>
              <p className="text-xs text-[#64748B] mt-1">
                Whether you have a general inquiry, corporate offsite requirement, or group request, our team will assist you.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-base text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out to VK Vacations. A dedicated travel counselor will respond to your phone or email shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot */}
                <input
                  type="text"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#142238] mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Meenakshi Sundaram"
                      className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
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
                      placeholder="e.g. meenakshi@example.com"
                      className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                    />
                  </div>
                </div>

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
                      className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#142238] mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                    >
                      <option value="General Holiday Inquiry">General Holiday Inquiry</option>
                      <option value="Custom Itinerary Request">Custom Itinerary Request</option>
                      <option value="Corporate / Group Tour">Corporate / Group Tour</option>
                      <option value="Existing Booking Assistance">Existing Booking Assistance</option>
                      <option value="Vendor / Partner Collaboration">Vendor / Partner Collaboration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#142238] mb-1">
                    Your Message / Requirements <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're looking for, destinations in mind, dates, traveler count..."
                    className="w-full bg-[#F8FAFC] border border-slate-300 rounded-xl p-3 text-xs text-[#142238] focus:outline-none focus:border-[#0866D9]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#0866D9] hover:bg-[#064ea5] shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>SEND MESSAGE TO TRAVEL TEAM</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Office Address & Map Presentation (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#071B35] rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#00B8A9] block">
                Headquarters
              </span>
              <h3 className="text-xl font-heading font-extrabold text-white">
                VK Vacations Tower
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#FF8A38] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{COMPANY.address.line1}</p>
                    <p>{COMPANY.address.line2}</p>
                    <p>{COMPANY.address.city}, {COMPANY.address.state} - {COMPANY.address.pincode}</p>
                    <p className="text-slate-400">{COMPANY.address.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Phone size={16} className="text-[#00B8A9] shrink-0" />
                  <span>{COMPANY.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#FF8A38] shrink-0" />
                  <span>{COMPANY.email}</span>
                </div>
              </div>

              {/* Map Locator Preview */}
              <div className="pt-4 border-t border-white/10">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-800 border border-white/15 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80"
                    alt="VK Vacations Location Map"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-[#071B35]/50 flex flex-col items-center justify-center p-4 text-center">
                    <MapPin size={28} className="text-[#FF8A38] mb-1 animate-bounce" />
                    <span className="text-xs font-bold text-white">T. Nagar, Chennai</span>
                    <span className="text-[11px] text-slate-300">Cathedral Road Landmark</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
