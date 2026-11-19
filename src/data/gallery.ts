export interface GalleryItem {
  id: string;
  title: string;
  category: 'Beaches' | 'Mountains' | 'Cities' | 'Honeymoon' | 'Cultural' | 'Adventure';
  location: string;
  image: string;
  caption: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Overwater Dreams in Malé Atoll",
    category: "Honeymoon",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    caption: "Private sunrise over emerald lagoon villas in South Malé Atoll.",
    aspectRatio: "tall"
  },
  {
    id: "gal-02",
    title: "Alpine Majesty of Mount Titlis",
    category: "Mountains",
    location: "Engelberg, Switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    caption: "Standing 10,000 feet above the world on the glacier ridge of Mount Titlis.",
    aspectRatio: "wide"
  },
  {
    id: "gal-03",
    title: "Sunset Shikara on Dal Lake",
    category: "Cultural",
    location: "Srinagar, Kashmir",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
    caption: "Wooden carved boats drifting over mirrored lotus waters as twilight falls.",
    aspectRatio: "tall"
  },
  {
    id: "gal-04",
    title: "The Golden Mirage of Dubai Marina",
    category: "Cities",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    caption: "Illuminated skyscrapers reflecting in the waters of Dubai Marina yacht harbor.",
    aspectRatio: "wide"
  },
  {
    id: "gal-05",
    title: "Kelingking Beach T-Rex Headland",
    category: "Adventure",
    location: "Nusa Penida, Bali",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
    caption: "The world-famous turquoise cove and dramatic natural cliff promontory.",
    aspectRatio: "tall"
  },
  {
    id: "gal-06",
    title: "Tranquil Backwaters of Alleppey",
    category: "Beaches",
    location: "Kerala, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    caption: "Cruising along coconut-lined waterways aboard a private luxury houseboat.",
    aspectRatio: "wide"
  },
  {
    id: "gal-07",
    title: "Supertree Grove Twilight Illumination",
    category: "Cities",
    location: "Gardens by the Bay, Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    caption: "Futuristic 50-meter vertical gardens ablaze in celestial colors.",
    aspectRatio: "square"
  },
  {
    id: "gal-08",
    title: "Amer Palace Sheesh Mahal Reflections",
    category: "Cultural",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    caption: "Intricate concave glass mirrors glowing under amber courtyard lamps.",
    aspectRatio: "wide"
  }
];
