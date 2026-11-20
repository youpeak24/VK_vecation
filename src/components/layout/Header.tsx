import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  PhoneCall, 
  Sparkles,
  Compass
} from 'lucide-react';
import { COMPANY } from '../../data/company';
import { TopContactBar } from './TopContactBar';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { useInquiryModal } from '../../context/InquiryModalContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openInquiryModal } = useInquiryModal();
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change or click outside
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside mega menu listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideButton = megaMenuRef.current?.contains(target);
      const insidePanel = megaPanelRef.current?.contains(target);
      if (!insideButton && !insidePanel) {
        setIsMegaMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMegaMenuOpen(false);
    };
    if (isMegaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMegaMenuOpen]);

  // Determine whether header is in transparent hero mode or sticky solid mode
  const isSolid = isScrolled || !isHome;

  // Shared nav link styling: single line, compact on xl, roomier on 2xl
  const navBase =
    'whitespace-nowrap text-[11px] 2xl:text-xs font-heading font-bold uppercase tracking-wide 2xl:tracking-wider transition-colors';
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${navBase} hover:text-[#0866D9] ${
      isActive ? 'text-[#0866D9]' : isSolid ? 'text-[#142238]' : 'text-white'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Contact Bar */}
      <TopContactBar />

      {/* Main Navigation Bar */}
      <div 
        className={`w-full transition-all duration-300 border-b ${
          isSolid
            ? 'bg-white/95 backdrop-blur-md shadow-md border-slate-200/80 py-3 text-[#142238]'
            : 'bg-gradient-to-b from-[#071B35]/80 via-[#071B35]/40 to-transparent border-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 xl:px-4 2xl:px-6 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
            aria-label="VK Vacations Home"
          >
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden border border-slate-200/50 flex items-center justify-center shrink-0">
              <img 
                src="/android-chrome-192x192.png" 
                alt="VK Vacations Logo" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="whitespace-nowrap">
              <span className={`font-heading font-extrabold text-lg 2xl:text-xl tracking-tight leading-none block ${isSolid ? 'text-[#071B35]' : 'text-white'}`}>
                VK <span className="text-[#0866D9]">VACATIONS</span>
              </span>
              {/* Tagline hidden on the tight xl range so the nav stays on one line */}
              <span className="text-[9px] sm:text-[10px] font-medium tracking-widest uppercase block xl:hidden 2xl:block text-[#00B8A9] mt-1 leading-none">
                Explore More. Experience Beyond.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-3 2xl:gap-7 min-w-0">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>

            {/* Mega Menu Trigger for Tour Packages */}
            <div ref={megaMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`${navBase} flex items-center gap-1 hover:text-[#0866D9] py-2 cursor-pointer ${
                  isMegaMenuOpen ? 'text-[#0866D9]' : isSolid ? 'text-[#142238]' : 'text-white'
                }`}
                aria-expanded={isMegaMenuOpen}
              >
                <span>Tour Packages</span>
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#0866D9]' : ''}`} 
                />
              </button>
            </div>

            <NavLink to="/india-tours" className={navLinkClass}>India Tours</NavLink>

            <NavLink
              to="/temple-tours"
              className={({ isActive }) =>
                `${navBase} hover:text-amber-500 flex items-center gap-1.5 ${
                  isActive ? 'text-amber-500' : isSolid ? 'text-[#142238]' : 'text-white'
                }`
              }
            >
              <span>Temple Tours</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            </NavLink>

            <NavLink to="/international-tours" className={navLinkClass}>International</NavLink>
            <NavLink to="/honeymoon" className={navLinkClass}>Honeymoon</NavLink>
            <NavLink to="/group-tours" className={navLinkClass}>Group Tours</NavLink>
            <NavLink to="/destinations" className={navLinkClass}>Destinations</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          {/* Right Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openInquiryModal()}
              className="hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 2xl:px-5 py-2.5 rounded-full font-heading font-bold text-[11px] 2xl:text-xs uppercase tracking-wider text-white bg-[#FF8A38] hover:bg-[#e06c1d] shadow-md shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles size={14} className="shrink-0 xl:hidden 2xl:block" />
              <span>Plan My Trip</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 rounded-xl xl:hidden transition-colors cursor-pointer ${
                isSolid 
                  ? 'text-[#142238] hover:bg-slate-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>

        {/* Mega Menu Dropdown */}
        {isMegaMenuOpen && (
          <div ref={megaPanelRef}>
            <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenInquiry={() => openInquiryModal()}
      />
    </header>
  );
};
