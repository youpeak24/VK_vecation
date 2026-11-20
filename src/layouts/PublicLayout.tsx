import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { AIChatbot } from '../components/chat/AIChatbot';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { InquiryModal } from '../components/forms/InquiryModal';
import { SmoothScroll } from '../components/animations/SmoothScroll';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const PublicLayout: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#142238] font-sans antialiased selection:bg-[#0866D9] selection:text-white">
        <ScrollToTop />
        
        {/* Sticky Header with Mega Menu & Top Contact Bar */}
        <Header />

        {/* Public Content Outlet */}
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>

        {/* Luxury Footer */}
        <Footer />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* Floating AI Travel Concierge Chatbot */}
        <AIChatbot />

        {/* Global Lead Inquiry Modal */}
        <InquiryModal />
      </div>
    </SmoothScroll>
  );
};

export default PublicLayout;
