import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY } from '../../data/company';
import { generateWhatsAppLink } from '../../utils/formatters';

interface FloatingWhatsAppProps {
  customMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  customMessage = "Hello VK Vacations, I would like to know more about your holiday packages."
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const waUrl = generateWhatsAppLink(COMPANY.whatsappNumber, customMessage);

  return (
    <div className="fixed bottom-24 right-6 z-30 flex items-end gap-3 group">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#142238] px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/80 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="text-left">
            <span className="block text-[11px] font-bold text-[#00B8A9] uppercase tracking-wider">
              VK Travel Desk Online
            </span>
            <p className="text-xs text-[#142238] font-medium">
              Plan your holiday on WhatsApp
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-1"
            aria-label="Dismiss chat tooltip"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer"
        aria-label="Chat with VK Vacations on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        <MessageCircle size={28} className="drop-shadow-sm" />
      </a>
    </div>
  );
};
