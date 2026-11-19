import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Send, 
  CheckCircle2 
} from 'lucide-react';
import { COMPANY } from '../../data/company';

// Inline brand SVGs for guaranteed rendering
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
  </svg>
);

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#071B35] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center shrink-0">
                <img 
                  src="/android-chrome-192x192.png" 
                  alt="VK Vacations Logo" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white block">
                  VK <span className="text-[#0866D9]">VACATIONS</span>
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase block text-[#00B8A9]">
                  {COMPANY.tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              At VK Vacations, we believe every journey should be as unique as the traveler. 
              From relaxing beach escapes and romantic honeymoons to exciting international adventures 
              and unforgettable family holidays, we help turn travel dreams into meaningful experiences.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-medium">Follow our journeys:</span>
              <div className="flex items-center gap-2">
                <a
                  href={COMPANY.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#FF8A38] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={COMPANY.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#0866D9] text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={COMPANY.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
                <a
                  href={COMPANY.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#00B8A9] text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#00B8A9]">
              <ShieldCheck size={16} />
              <span>Certified Tour Operator & Travel Specialist</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#0866D9]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#0866D9]" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#0866D9]" />
                  <span>Tour Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#0866D9]" />
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#0866D9]" />
                  <span>Travel Journal</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#0866D9]" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Holidays (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white">
              Popular Holidays
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/india-tours" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#FF8A38]" />
                  <span>India Tours (Kashmir, Kerala)</span>
                </Link>
              </li>
              <li>
                <Link to="/international-tours" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#FF8A38]" />
                  <span>International (Dubai, Bali, Singapore)</span>
                </Link>
              </li>
              <li>
                <Link to="/honeymoon" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#FF8A38]" />
                  <span>Honeymoon Water Villas & Chalets</span>
                </Link>
              </li>
              <li>
                <Link to="/group-tours" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#FF8A38]" />
                  <span>Fixed Group Departures</span>
                </Link>
              </li>
              <li>
                <Link to="/packages?category=Europe" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#FF8A38]" />
                  <span>Europe Swiss & Paris Specials</span>
                </Link>
              </li>
              <li>
                <Link to="/packages?category=Luxury" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <ArrowRight size={12} className="text-[#FF8A38]" />
                  <span>Luxury Private Island Vacations</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-white">
              Connect With Us
            </h4>
            
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#00B8A9] shrink-0 mt-0.5" />
                <span>
                  {COMPANY.address.line1}, {COMPANY.address.city}, {COMPANY.address.state} - {COMPANY.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#0866D9] shrink-0" />
                <a href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`} className="hover:text-white font-medium">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#FF8A38] shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <Clock size={15} className="text-amber-400 shrink-0" />
                <span>{COMPANY.businessHours}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-white mb-1.5">
                Get Secret Travel Deals & Updates
              </span>
              {newsletterSubscribed ? (
                <div className="flex items-center gap-1.5 text-xs text-[#00B8A9] bg-[#00B8A9]/10 p-2.5 rounded-xl">
                  <CheckCircle2 size={14} />
                  <span>Subscribed! Check your inbox for exclusive perks.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0866D9]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#0866D9] hover:bg-[#064ea5] text-white rounded-xl text-xs font-heading font-semibold transition-colors cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 {COMPANY.name}. All Rights Reserved. Crafted with care for passionate travelers.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-200 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-slate-200 transition-colors">
              Cancellation & Refund Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
