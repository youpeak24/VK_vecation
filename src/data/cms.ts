import { WebsiteBanner, SEOMetadata } from '../types';

// Default website CMS content, written to Firestore on first admin sign-in.
export const SEED_BANNERS: WebsiteBanner[] = [
  {
    id: "banner-01",
    title: "Summer in Switzerland: Alpine Dreams",
    subtitle: "Exclusive 15% discount for families departing from Chennai & Bangalore",
    tagline: "LUXURY ALPS RETREAT",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore Swiss Alps",
    ctaLink: "/packages/swiss-alpine-wonder-paris",
    isActive: true,
    order: 1
  },
  {
    id: "banner-02",
    title: "Sacred South India: Arupadai Veedu",
    subtitle: "Special VIP Darshan passes & Pure Satvik dining arranged",
    tagline: "DIVINE PILGRIMAGE",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    ctaText: "View Pilgrimages",
    ctaLink: "/temple-tours",
    isActive: true,
    order: 2
  }
];

export const SEED_SEO: SEOMetadata[] = [
  {
    id: "seo-home",
    route: "/",
    pagePath: "/",
    title: "VK Vacations — Premium International & Domestic Holiday Tours | Explore More. Experience Beyond.",
    pageTitle: "VK Vacations — Premium International & Domestic Holiday Tours",
    description: "Book luxury international tour packages, domestic India holidays, honeymoon getaways & sacred South Indian temple circuits with VK Vacations. 100% customized travel with 24/7 dedicated concierge.",
    metaDescription: "Book luxury international tour packages, domestic India holidays, honeymoon getaways & sacred South Indian temple circuits with VK Vacations.",
    keywords: ["VK Vacations", "luxury travel India", "holiday packages Chennai", "international tour packages", "honeymoon packages", "South Indian temple tours", "Maldives packages", "Swiss tours"],
    metaKeywords: "VK Vacations, luxury travel India, holiday packages Chennai, international tour packages, honeymoon packages, South Indian temple tours",
    ogImage: "https://www.vkvacations.in/android-chrome-512x512.png",
    canonicalUrl: "https://www.vkvacations.in/"
  },
  {
    id: "seo-packages",
    route: "/packages",
    pagePath: "/packages",
    title: "All Tour Packages — Domestic & International Holidays | VK Vacations",
    pageTitle: "All Tour Packages — Domestic & International Holidays",
    description: "Explore our curated catalog of luxury domestic and international holiday packages with transparent pricing, verified hotels, VIP transfers, and bespoke itineraries.",
    metaDescription: "Explore our curated catalog of luxury domestic and international holiday packages with transparent pricing and bespoke itineraries.",
    keywords: ["holiday packages", "tour packages from Chennai", "domestic holiday deals", "international tours India", "family vacation packages"],
    metaKeywords: "holiday packages, tour packages from Chennai, domestic holiday deals, international tours India",
    ogImage: "https://www.vkvacations.in/android-chrome-512x512.png",
    canonicalUrl: "https://www.vkvacations.in/packages"
  },
  {
    id: "seo-temple",
    route: "/temple-tours",
    pagePath: "/temple-tours",
    title: "South Indian Temple Tours & Spiritual Pilgrimage Packages | VK Vacations",
    pageTitle: "Temple Tours & Spiritual Pilgrimages — VK Vacations",
    description: "Sacred South Indian pilgrimage circuits: Arupadai Veedu Murugan temples, Navagraha Kumbakonam, Pancha Bhoota Stalam, Rameshwaram with VIP Darshan & pure Satvik meals.",
    metaDescription: "Sacred South Indian pilgrimage circuits: Arupadai Veedu Murugan temples, Navagraha, Pancha Bhoota Stalam, Rameshwaram with VIP Darshan.",
    keywords: ["temple tours South India", "arupadai veedu tour package", "navagraha temple circuit", "pancha bhoota stalam", "rameshwaram yatra", "spiritual tours Chennai"],
    metaKeywords: "temple tours South India, arupadai veedu tour package, navagraha temple circuit, rameshwaram yatra",
    ogImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: "https://www.vkvacations.in/temple-tours"
  },
  {
    id: "seo-india",
    route: "/india-tours",
    pagePath: "/india-tours",
    title: "Incredible India Tour Packages — Kashmir, Kerala, Rajasthan & Andaman | VK Vacations",
    pageTitle: "Incredible India Domestic Tour Packages",
    description: "Discover the breathtaking beauty of India with customized holiday packages across Kashmir, Kerala backwaters, royal Rajasthan, and pristine Andaman beaches.",
    metaDescription: "Discover the breathtaking beauty of India with customized holiday packages across Kashmir, Kerala, Rajasthan, and Andaman.",
    keywords: ["India tour packages", "Kashmir holiday", "Kerala backwaters tour", "Rajasthan forts tour", "Andaman honeymoon package"],
    metaKeywords: "India tour packages, Kashmir holiday, Kerala backwaters tour, Rajasthan forts tour, Andaman honeymoon package",
    ogImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: "https://www.vkvacations.in/india-tours"
  },
  {
    id: "seo-intl",
    route: "/international-tours",
    pagePath: "/international-tours",
    title: "International Holiday Packages — Europe, Dubai, Bali, Singapore & Maldives | VK Vacations",
    pageTitle: "International Holiday Tour Packages",
    description: "Travel the world with ease. Premium international packages to Dubai, Maldives, Switzerland, Paris, Bali, and Singapore with visa assistance and guaranteed luxury stays.",
    metaDescription: "Travel the world with ease. Premium international packages to Dubai, Maldives, Switzerland, Paris, Bali, and Singapore with visa assistance.",
    keywords: ["international holiday packages", "Dubai tour package from India", "Maldives water villa", "Switzerland Paris tour", "Bali holiday package"],
    metaKeywords: "international holiday packages, Dubai tour package from India, Maldives water villa, Switzerland Paris tour, Bali holiday package",
    ogImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: "https://www.vkvacations.in/international-tours"
  },
  {
    id: "seo-honeymoon",
    route: "/honeymoon",
    pagePath: "/honeymoon",
    title: "Romantic Honeymoon Packages — Luxury Overwater Villas & Hill Escapes | VK Vacations",
    pageTitle: "Romantic Honeymoon Vacation Packages",
    description: "Celebrate love in idyllic paradises. Private pool villas in Bali, luxury overwater bungalows in Maldives, and romantic Swiss Alpine retreats with candlelit dinners & floral setups.",
    metaDescription: "Celebrate love in idyllic paradises. Private pool villas in Bali, luxury overwater bungalows in Maldives, and romantic Swiss Alpine retreats.",
    keywords: ["honeymoon packages", "Maldives honeymoon", "Bali romantic getaway", "luxury honeymoon tours", "couple vacation packages"],
    metaKeywords: "honeymoon packages, Maldives honeymoon, Bali romantic getaway, luxury honeymoon tours",
    ogImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    canonicalUrl: "https://www.vkvacations.in/honeymoon"
  },
  {
    id: "seo-contact",
    route: "/contact",
    pagePath: "/contact",
    title: "Contact VK Vacations — Chennai Travel Desk & Holiday Consultants",
    pageTitle: "Contact VK Vacations Travel Desk",
    description: "Get in touch with VK Vacations holiday specialists. Call +91 9384957775 or visit our Cathedral Road, Chennai office for customized holiday planning.",
    metaDescription: "Get in touch with VK Vacations holiday specialists. Call +91 9384957775 or visit our Cathedral Road, Chennai office.",
    keywords: ["VK Vacations contact", "travel agency Cathedral Road Chennai", "tour operator phone number Chennai", "holiday consultant"],
    metaKeywords: "VK Vacations contact, travel agency Cathedral Road Chennai, tour operator phone number Chennai",
    ogImage: "https://www.vkvacations.in/android-chrome-512x512.png",
    canonicalUrl: "https://www.vkvacations.in/contact"
  }
];
