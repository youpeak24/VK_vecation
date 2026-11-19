import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { PopularCategories } from '../components/home/PopularCategories';
import { AboutSection } from '../components/home/AboutSection';
import { TrustStats } from '../components/home/TrustStats';
import { TrendingPackages } from '../components/home/TrendingPackages';
import { InternationalShowcase } from '../components/home/InternationalShowcase';
import { IndiaToursSection } from '../components/home/IndiaToursSection';
import { HoneymoonSection } from '../components/home/HoneymoonSection';
import { GroupDeparturesSection } from '../components/home/GroupDeparturesSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ExperienceGallery } from '../components/home/ExperienceGallery';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { LeadInquirySection } from '../components/home/LeadInquirySection';
import { ExclusiveDeals } from '../components/home/ExclusiveDeals';
import { BlogSection } from '../components/home/BlogSection';

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. Immersive Hero Slider & Search */}
      <HeroSection />

      {/* 2. Popular Tour Categories */}
      <PopularCategories />

      {/* 3. About VK Vacations */}
      <AboutSection />

      {/* 4. Trust & Experience Metrics */}
      <TrustStats />

      {/* 5. Trending Packages Grid */}
      <TrendingPackages />

      {/* 6. International Gateways Showcase */}
      <InternationalShowcase />

      {/* 7. Incredible India Tours */}
      <IndiaToursSection />

      {/* 8. Romantic Honeymoon Escapes */}
      <HoneymoonSection />

      {/* 9. Fixed Group Departures */}
      <GroupDeparturesSection />

      {/* 10. Why Choose VK Vacations */}
      <WhyChooseUs />

      {/* 11. Exclusive Deals & Countdown */}
      <ExclusiveDeals />

      {/* 12. Experience Gallery with Lightbox */}
      <ExperienceGallery />

      {/* 13. Customer Testimonials */}
      <TestimonialsSection />

      {/* 14. Lead Generation Inquiry Desk */}
      <LeadInquirySection />

      {/* 15. The Travel Journal Blog */}
      <BlogSection />
    </div>
  );
};
