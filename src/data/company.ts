export interface CompanyConfig {
  name: string;
  tagline: string;
  secondaryTagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  phone: string;
  altPhone: string;
  email: string;
  supportEmail: string;
  websiteUrl: string;
  domain: string;
  whatsappNumber: string; // international digits for wa.me link
  displayWhatsapp: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  businessHours: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    twitter: string;
  };
  metrics: {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    verifiedNote: string;
  }[];
}

export const COMPANY: CompanyConfig = {
  name: import.meta.env.VITE_APP_NAME || "VK VACATIONS",
  tagline: import.meta.env.VITE_APP_TAGLINE || "Explore More. Experience Beyond.",
  secondaryTagline: import.meta.env.VITE_APP_SECONDARY_TAGLINE || "Your Journey. Our Passion.",
  heroHeadline: import.meta.env.VITE_APP_HERO_HEADLINE || "THE WORLD IS WAITING. LET'S EXPLORE.",
  heroSubtitle: "Unforgettable journeys, breathtaking destinations, and holidays crafted around you.",
  phone: import.meta.env.VITE_COMPANY_PHONE || "+91 9384957775",
  altPhone: import.meta.env.VITE_COMPANY_ALT_PHONE || "+91 93849 57775",
  email: import.meta.env.VITE_COMPANY_EMAIL || "travel@vkvacations.in",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "support@vkvacations.in",
  websiteUrl: import.meta.env.VITE_SITE_URL || "https://vkvacations.in",
  domain: (import.meta.env.VITE_SITE_URL || "https://vkvacations.in").replace(/^https?:\/\//, '').replace(/\/.*$/, ''),
  whatsappNumber: import.meta.env.VITE_COMPANY_WHATSAPP || "919384957775",
  displayWhatsapp: import.meta.env.VITE_COMPANY_WHATSAPP_DISPLAY || "+91 9384957775",
  address: {
    line1: "VK Vacations Tower, 4th Floor, Cathedral Road",
    line2: "Opposite Semmozhi Poonga, T. Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    pincode: "600086"
  },
  businessHours: "Mon – Sat: 9:30 AM – 7:30 PM | Sun: 10:00 AM – 4:00 PM IST",
  socials: {
    facebook: "https://facebook.com/vkvacationsofficial",
    instagram: "https://instagram.com/vkvacationsofficial",
    youtube: "https://youtube.com/@vkvacationsofficial",
    linkedin: "https://linkedin.com/company/vk-vacations",
    twitter: "https://twitter.com/vkvacations"
  },
  metrics: [
    {
      label: "Delighted Travelers",
      value: 28500,
      suffix: "+",
      verifiedNote: "Verified customer journeys curated across South India & worldwide"
    },
    {
      label: "Global Destinations",
      value: 65,
      suffix: "+",
      verifiedNote: "Domestic states & 38 international countries covered"
    },
    {
      label: "Curated Tour Departures",
      value: 1250,
      suffix: "+",
      verifiedNote: "Fixed group departures & bespoke private journeys executed"
    },
    {
      label: "Customer Satisfaction",
      value: 99,
      suffix: "%",
      verifiedNote: "Post-trip feedback rating across verified tour participants"
    }
  ]
};

export const VACATION_TYPES = [
  "Family Vacation",
  "Honeymoon",
  "Group Tour",
  "Solo Trip",
  "Corporate Tour",
  "Educational Tour",
  "Adventure Tour",
  "Luxury Holiday",
  "Customized Package"
] as const;

export const BUDGET_RANGES = [
  "Under ₹30,000 / person",
  "₹30,000 - ₹60,000 / person",
  "₹60,000 - ₹1,20,000 / person",
  "₹1,20,000 - ₹2,50,000 / person",
  "Above ₹2,50,000 / person (Luxury)"
] as const;
