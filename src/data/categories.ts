export interface TourCategoryItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  link: string;
  accentColor: string;
  badge: string;
  highlights: string[];
}

export const POPULAR_CATEGORIES: TourCategoryItem[] = [
  {
    id: "cat-india",
    name: "India Tour Packages",
    slug: "india-tours",
    tagline: "Incredible Heritage & Landscapes",
    description: "From the snow-crowned Himalayas of Kashmir to the tranquil backwaters of Kerala and golden dunes of Rajasthan.",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=80", // Kashmir Shikara
    link: "/india-tours",
    accentColor: "#FF8A38",
    badge: "Domestic Favorite",
    highlights: ["Kashmir", "Kerala", "Goa", "Himachal", "Andaman"]
  },
  {
    id: "cat-intl",
    name: "International Tour Packages",
    slug: "international-tours",
    tagline: "Explore Beyond Borders",
    description: "Iconic global skylines, exotic beaches, culinary capitals, and world wonder adventures tailored for Indian travelers.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80", // Dubai skyline
    link: "/international-tours",
    accentColor: "#0866D9",
    badge: "World Wonders",
    highlights: ["Dubai", "Singapore", "Bali", "Thailand", "Malaysia"]
  },
  {
    id: "cat-honeymoon",
    name: "Honeymoon Packages",
    slug: "honeymoon",
    tagline: "Love Deserves A Beautiful Destination",
    description: "Overwater villas, private candlelit beach dinners, scenic alpine chalets, and intimate experiences to start your journey together.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80", // Maldives overwater
    link: "/honeymoon",
    accentColor: "#00B8A9",
    badge: "Romantic Escapes",
    highlights: ["Maldives", "Bali", "Switzerland", "Munnar", "Kashmir"]
  },
  {
    id: "cat-europe",
    name: "Europe Tour Packages",
    slug: "europe",
    tagline: "Fairytale Castles & Alpine Vistas",
    description: "Swiss mountain peaks, Parisian boulevards, Italian history, and timeless continental charm with expert Indian tour managers.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80", // Switzerland alpine
    link: "/packages?category=Europe",
    accentColor: "#071B35",
    badge: "Grand Continental",
    highlights: ["Switzerland", "France", "Italy", "Austria", "Germany"]
  },
  {
    id: "cat-edu",
    name: "Educational Tours",
    slug: "educational",
    tagline: "Inspiring Young Minds Beyond Classrooms",
    description: "Curated learning expeditions for schools and colleges, featuring science centers, aerospace hubs, historical trails, and teamwork camps.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80", // Educational team
    link: "/packages?category=Educational",
    accentColor: "#0866D9",
    badge: "Schools & Colleges",
    highlights: ["NASA / Space", "Heritage Trails", "Ecology Tours", "Industrial Visits"]
  },
  {
    id: "cat-group",
    name: "Group Tour Packages",
    slug: "group-tours",
    tagline: "Travel Together. Create Memories Forever.",
    description: "Hassle-free guided group departures with fixed dates, delicious Indian meals, comfortable coaches, and caring tour managers.",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1000&q=80", // Group travel
    link: "/group-tours",
    accentColor: "#FFC857",
    badge: "Fixed Departures",
    highlights: ["South India Specials", "Senior Friendly", "Family Groups", "Fixed Dates"]
  }
];
