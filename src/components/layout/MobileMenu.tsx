import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  X, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ChevronRight, 
  Compass, 
  Heart, 
  Users, 
  Globe2, 
  BookOpen, 
  Info,
  CalendarCheck,
  Sparkles
} from 'lucide-react';
import { COMPANY } from '../../data/company';
import { generateWhatsAppLink } from '../../utils/formatters';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenInquiry
}) => {
  if (!isOpen) return null;

  const links = [
    { name: "Home", path: "/", icon: Compass },
    { name: "All Packages", path: "/packages", icon: CalendarCheck },
    { name: "Temple Tours", path: "/temple-tours", icon: Sparkles },
    { name: "India Tours", path: "/india-tours", icon: MapPin },
    { name: "International Tours", path: "/international-tours", icon: Globe2 },
    { name: "Honeymoon Packages", path: "/honeymoon", icon: Heart },
    { name: "Group Tours", path: "/group-tours", icon: Users },
    { name: "Destinations", path: "/destinations", icon: MapPin },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Travel Blog", path: "/blog", icon: BookOpen },
    { name: "Contact Us", path: "/contact", icon: Phone }
  ];

  const waLink = generateWhatsAppLink(
    COMPANY.whatsappNumber,
    "Hello VK Vacations, I would like to inquire about holiday packages."
  );

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#071B35] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white p-0.5 shadow-md overflow-hidden flex items-center justify-center shrink-0">
              <img 
                src="/android-chrome-192x192.png" 
                alt="VK Vacations Logo" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-base tracking-wider text-white block">
                {COMPANY.name}
              </span>
              <p className="text-[10px] text-[#00B8A9] font-medium tracking-wide">
                Explore More. Experience Beyond.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 bg-[#EAF6FF] grid grid-cols-2 gap-2 border-b border-blue-100">
          <a
            href={`tel:${COMPANY.phone.replace(/\s+/g, '')}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white text-[#0866D9] rounded-xl font-heading font-semibold text-xs shadow-xs hover:bg-blue-50 transition-colors"
          >
            <Phone size={14} className="text-[#0866D9]" />
            <span>Call Desk</span>
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] text-white rounded-xl font-heading font-semibold text-xs shadow-xs hover:bg-[#20ba59] transition-colors"
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-3 px-3 space-y-1">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={idx}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl font-heading text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#EAF6FF] text-[#0866D9]'
                      : 'text-[#142238] hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-[#64748B]" />
                  <span>{link.name}</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </NavLink>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-slate-100 bg-[#F8FAFC]">
          <button
            onClick={() => {
              onClose();
              onOpenInquiry();
            }}
            className="w-full py-3.5 px-4 bg-[#FF8A38] hover:bg-[#e06c1d] text-white font-heading font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 text-center transition-colors cursor-pointer"
          >
            PLAN MY HOLIDAY
          </button>
          <div className="mt-3 text-center">
            <span className="text-[11px] text-[#64748B]">
              Assistance: {COMPANY.phone}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
