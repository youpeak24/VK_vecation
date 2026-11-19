import { ExclusiveDeal } from '../types';

export const EXCLUSIVE_DEALS: ExclusiveDeal[] = [
  {
    id: "deal-bali-honeymoon",
    packageSlug: "bali-tropical-paradise",
    title: "Bali Luxury Villa Escape with Floating Breakfast",
    destination: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    originalPrice: 49500,
    offerPrice: 42999,
    discountPercentage: 15,
    validUntil: "2026-05-30T23:59:59Z",
    duration: "6 Days / 5 Nights",
    terms: [
      "Twin sharing basis with 1 night private pool villa upgrade",
      "Valid for bookings confirmed before validity deadline",
      "Complimentary candlelit dinner for couples"
    ],
    slotsRemaining: 7
  },
  {
    id: "deal-dubai-extravaganza",
    packageSlug: "dubai-luxury-extravaganza",
    title: "Dubai Skyline & Red Dunes Explorer",
    destination: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    originalPrice: 62000,
    offerPrice: 54999,
    discountPercentage: 12,
    validUntil: "2026-05-15T23:59:59Z",
    duration: "5 Days / 4 Nights",
    terms: [
      "Includes Burj Khalifa 124th floor ticket and Desert Safari",
      "4-star hotel stay with international breakfast",
      "Free UAE tourist visa processing"
    ],
    slotsRemaining: 5
  },
  {
    id: "deal-kashmir-paradise",
    packageSlug: "kashmir-paradise-on-earth",
    title: "Kashmir Spring Blossom with Deluxe Houseboat",
    destination: "Kashmir, India",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
    originalPrice: 34000,
    offerPrice: 28500,
    discountPercentage: 16,
    validUntil: "2026-04-30T23:59:59Z",
    duration: "6 Days / 5 Nights",
    terms: [
      "Includes Dal Lake Shikara ride and Gulmarg snow excursion",
      "Special Kashmiri Kahwa welcome and warm hospitality",
      "Dedicated chauffeured vehicle"
    ],
    slotsRemaining: 8
  }
];
