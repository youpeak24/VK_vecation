import { TourPackage } from '../types';

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "pkg-kashmir-paradise",
    slug: "kashmir-paradise-on-earth",
    title: "Kashmir: Paradise on Earth with Houseboat",
    subtitle: "Srinagar, Gulmarg, Pahalgam & Dal Lake Shikara Serenade",
    destination: "Kashmir",
    country: "India",
    isInternational: false,
    region: "North India",
    category: ["India Tours", "Honeymoon", "Group Tours"],
    duration: { days: 6, nights: 5 },
    startingPrice: 28500,
    originalPrice: 34000,
    priceNote: "per person on twin sharing basis",
    featuredImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1626014303757-64665427d142?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Experience why Mughal Emperor Jahangir said, 'If there is paradise on earth, it is here.' From romantic Dal Lake houseboats to the snowy heights of the Apharwat peak in Gulmarg and saffron valleys of Pahalgam, this trip delivers pure Himalayan poetry.",
    highlights: [
      "1 Night stay in a handcrafted luxury Houseboat on Dal Lake",
      "Sunset Shikara ride across Floating Gardens and Char Chinar",
      "Gulmarg Gondola ride to Phase 1 & Phase 2 snow peaks",
      "Betaab Valley, Aru Valley & Chandanwari excursion in Pahalgam",
      "Mughal Gardens visit: Shalimar Bagh & Nishat Bagh"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Dal Lake Shikara Serenade",
        location: "Srinagar",
        description: "Warm welcome at Srinagar Airport by our representative. Check-in to your luxury Dal Lake Houseboat. In the evening, enjoy a 1-hour relaxing Shikara ride witnessing the floating market and vibrant mountain reflections.",
        mealsIncluded: ["Dinner"],
        highlights: ["Warm Kahwa welcome", "Shikara Ride", "Overnight in Houseboat"]
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg — Meadow of Flowers",
        location: "Gulmarg",
        description: "Drive through scenic pine forests to Gulmarg (2,730m). Board the famous Gulmarg Gondola Cable Car ascending toward snow-capped Apharwat Peak. Enjoy snow activities or peaceful mountain walks.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["World's highest cable car ride", "Snow activities", "Alpine vistas"]
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam — Valley of Shepherds",
        location: "Pahalgam",
        description: "Post breakfast, travel past saffron fields of Pampore and willow bat factories to Pahalgam along the Lidder River. Stroll through the local pine woods and riverside trails.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Saffron fields", "Lidder river walk", "Pine forest tranquility"]
      },
      {
        day: 4,
        title: "Pahalgam Valley Exploration (Betaab & Aru)",
        location: "Pahalgam",
        description: "Explore the picturesque Betaab Valley, named after the Bollywood film, followed by Aru Valley's lush meadows. Evening at leisure exploring Pahalgam market for Kashmiri handicrafts.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Betaab Valley", "Aru Valley", "Pashmina & Walnut shopping"]
      },
      {
        day: 5,
        title: "Pahalgam to Srinagar & Mughal Gardens",
        location: "Srinagar",
        description: "Return to Srinagar. Visit the celebrated Mughal Gardens — Nishat Bagh (Garden of Pleasure) and Shalimar Bagh (Abode of Love) built during the 17th century. Sunset view from Shankaracharya Temple.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Nishat Bagh", "Shalimar Bagh", "Shankaracharya Temple"]
      },
      {
        day: 6,
        title: "Farewell Srinagar & Homeward Flight",
        location: "Srinagar Airport",
        description: "Savor a leisurely Kashmiri breakfast. Transfer to Srinagar Airport with unforgettable memories of Kashmir.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Airport transfer", "Sweet souvenirs"]
      }
    ],
    inclusions: [
      "5 Nights accommodation (1N Deluxe Houseboat + 4N 4-Star Resort)",
      "Daily Buffet Breakfast and Dinner (Authentic North & South Indian options)",
      "Dedicated Private Chauffeured Cab for entire tour (Sedan/SUV)",
      "1-Hour Sunset Shikara Ride on Dal Lake",
      "Toll taxes, parking fees, driver allowances, and fuel charges",
      "24/7 On-Tour VK Concierge Support"
    ],
    exclusions: [
      "Flight or Train tickets to/from Srinagar",
      "Gondola cable car ticket and pony rides (assistance provided)",
      "Local Union Cabs in Pahalgam (Aru/Betaab Valley)",
      "Personal expenses, laundry, tips, and camera permits"
    ],
    hotels: [
      {
        name: "Mascot Royal Houseboat",
        category: "Premium Heritage Houseboat",
        location: "Dal Lake, Srinagar",
        nights: 1,
        amenities: ["Lake View", "Traditional Kashmiri Wood Carving", "Heated Rooms", "Wi-Fi"]
      },
      {
        name: "Pine Palace Resort & Spa",
        category: "4-Star Luxury Resort",
        location: "Gulmarg",
        nights: 1,
        amenities: ["Mountain View", "Central Heating", "Fireplace Lounge", "Restaurant"]
      },
      {
        name: "Grand Mumtaz Resorts",
        category: "4-Star Riverside Property",
        location: "Pahalgam",
        nights: 2,
        amenities: ["Lidder River View", "Spa", "Kids Play Area", "Multi-cuisine Dining"]
      },
      {
        name: "The Grand Kaiser Hotel",
        category: "4-Star Boutique Hotel",
        location: "Srinagar",
        nights: 1,
        amenities: ["City Center", "Free Wi-Fi", "Gourmet Dining", "Conference Hall"]
      }
    ],
    departureCities: ["Chennai", "Bangalore", "Coimbatore", "Hyderabad", "Delhi", "Mumbai"],
    upcomingDepartures: ["Every Sunday & Wednesday", "Summer Specials Booking Open"],
    badge: "Trending Best Seller",
    rating: 4.9,
    reviewCount: 312,
    suitableFor: ["Family", "Couple", "Group"]
  },
  {
    id: "pkg-kerala-backwaters",
    slug: "kerala-gods-own-country",
    title: "Kerala: God's Own Country & Backwater Serenity",
    subtitle: "Munnar Tea Hills, Thekkady Wildlife & Alleppey Houseboat",
    destination: "Kerala",
    country: "India",
    isInternational: false,
    region: "South India",
    category: ["India Tours", "Honeymoon", "Group Tours"],
    duration: { days: 6, nights: 5 },
    startingPrice: 22500,
    originalPrice: 26000,
    priceNote: "per person on twin sharing basis",
    featuredImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Immerse yourself in lush emerald tea gardens of Munnar, aromatic spice plantations in Thekkady, and cruise the gentle canals of Alleppey aboard a traditional private Kettuvallam houseboat.",
    highlights: [
      "Cheeyappara & Valara Waterfalls en route to Munnar",
      "Munnar Eravikulam National Park (Nilgiri Tahr habitat)",
      "Thekkady Spice Plantation tour & Periyar Lake boat safari",
      "Private Deluxe Houseboat cruise with freshly cooked Kerala meals",
      "Fort Kochi heritage stroll and Chinese Fishing Nets"
    ],
    itinerary: [
      {
        day: 1,
        title: "Cochin to Munnar Tea Hills",
        location: "Munnar",
        description: "Pickup from Cochin Airport/Railway Station. Drive to Munnar winding through mist-clad Western Ghats and cascading waterfalls. Check in to tea estate resort.",
        mealsIncluded: ["Dinner"],
        highlights: ["Cheeyappara Waterfalls", "Tea garden vistas"]
      },
      {
        day: 2,
        title: "Munnar Sightseeing Extravaganza",
        location: "Munnar",
        description: "Visit Eravikulam National Park, Mattupetty Dam, Echo Point, and the Tata Tea Museum with tea tasting session.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Eravikulam National Park", "Mattupetty Dam", "Echo Point"]
      },
      {
        day: 3,
        title: "Munnar to Thekkady (Periyar Wildlife)",
        location: "Thekkady",
        description: "Travel to Thekkady. Walk through fragrant cardamom and cinnamon plantations. Optional Kathakali or Kalaripayattu martial arts cultural show.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Spice plantation tour", "Cultural show evening"]
      },
      {
        day: 4,
        title: "Thekkady to Alleppey Houseboat Cruise",
        location: "Alleppey",
        description: "Board your private traditional houseboat at noon. Glide through tranquil backwaters witnessing village life, paddy fields, and duck farms. Savor authentic Kerala lunch and Karimeen fry.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Alleppey Backwaters", "Traditional Kerala Sadya & Seafood"]
      },
      {
        day: 5,
        title: "Alleppey to Cochin Heritage",
        location: "Cochin",
        description: "Disembark after breakfast. Drive to Fort Kochi. Visit St. Francis Church, Jewish Synagogue, Dutch Palace, and iconic Chinese Fishing Nets.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry"]
      },
      {
        day: 6,
        title: "Departure from Cochin",
        location: "Cochin Airport",
        description: "Transfer to Cochin Airport/Railway station with sweet banana chips and unforgettable memories.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Airport drop"]
      }
    ],
    inclusions: [
      "5 Nights accommodation (4N Premium Resort + 1N Private Houseboat)",
      "All meals during Houseboat stay (Lunch, Evening Tea, Dinner, Breakfast)",
      "Daily Breakfast & Dinner at resorts",
      "AC Sedan/Innova vehicle throughout the tour",
      "Driver beta, fuel, interstate permit, and toll taxes",
      "Spice plantation entry ticket"
    ],
    exclusions: [
      "Airfare or Train fare",
      "Periyar Lake boat safari tickets & forest entry fees",
      "Personal water sports, ayurvedic massages, and expenses"
    ],
    hotels: [
      {
        name: "The Fog Munnar Resort & Spa",
        category: "4-Star Luxury Valley Resort",
        location: "Munnar",
        nights: 2,
        amenities: ["Valley View Infinity Pool", "Tea Lounge", "Ayurvedic Spa"]
      },
      {
        name: "Greenwoods Resort",
        category: "4-Star Nature Resort",
        location: "Thekkady",
        nights: 1,
        amenities: ["Spice Garden Walk", "Swimming Pool", "Treehouse Restaurant"]
      },
      {
        name: "Lakes & Lagoons Deluxe Houseboat",
        category: "Premium Private Houseboat",
        location: "Alleppey",
        nights: 1,
        amenities: ["Private Chef", "Sundeck", "AC Bedroom", "Lake Cruise"]
      },
      {
        name: "Casino Hotel — CGH Earth",
        category: "5-Star Heritage Property",
        location: "Cochin",
        nights: 1,
        amenities: ["Swimming Pool", "Seafood Specialty Restaurant", "Spa"]
      }
    ],
    departureCities: ["Chennai", "Coimbatore", "Bangalore", "Madurai", "Tiruchirappalli", "Hyderabad"],
    badge: "South India Classic",
    rating: 4.95,
    reviewCount: 420,
    suitableFor: ["Family", "Couple", "Senior"]
  },
  {
    id: "pkg-dubai-extravaganza",
    slug: "dubai-luxury-extravaganza",
    title: "Dubai Extravaganza: Skyline & Desert Dunes",
    subtitle: "Burj Khalifa, Desert Safari with BBQ, Marina Cruise & Abu Dhabi Day Tour",
    destination: "Dubai",
    country: "United Arab Emirates",
    isInternational: true,
    category: ["International Tours", "Luxury", "Group Tours"],
    duration: { days: 5, nights: 4 },
    startingPrice: 54999,
    originalPrice: 62000,
    priceNote: "per person, flights package available on request",
    featuredImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Step into the city of the future! Soar up Burj Khalifa to the 124th floor, conquer golden Arabian sand dunes in a 4x4 Land Cruiser with belly dance and barbecue, and marvel at the Grand Sheikh Zayed Mosque in Abu Dhabi.",
    highlights: [
      "Burj Khalifa 124th & 125th Floor observation deck ticket",
      "Thrilling 4x4 Desert Safari with Dune Bashing, Camel ride & BBQ Buffet",
      "Dubai Marina Luxury Dhow Cruise with international dinner buffet",
      "Dubai City Tour covering Palm Jumeirah, Burj Al Arab & Gold Souk",
      "Full-Day Abu Dhabi Tour including Grand Sheikh Zayed Mosque"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai & Marina Dhow Cruise Dinner",
        location: "Dubai",
        description: "Touch down at Dubai International Airport. Private transfer to your 4-star hotel. Evening boarding of an illuminated Marina Dhow Cruise featuring 5-star buffet dining and Tanoura dance.",
        mealsIncluded: ["Dinner"],
        highlights: ["Luxury Marina views", "Tanoura dance", "Dinner buffet"]
      },
      {
        day: 2,
        title: "Dubai City Tour & Burj Khalifa 124th Floor",
        location: "Dubai Downtown",
        description: "Morning guided city tour: Dubai Frame photo stop, Jumeirah Mosque, Burj Al Arab, and Atlantis The Palm. Afternoon visit Dubai Mall and ascend Burj Khalifa's 124th floor. Watch the musical Dubai Fountain show.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Burj Khalifa 124th floor", "Dubai Mall", "Fountain Show"]
      },
      {
        day: 3,
        title: "Miracle Garden & Thrilling Red Dune Desert Safari",
        location: "Dubai Desert",
        description: "Morning visit to Dubai Miracle Garden (seasonal) or Museum of the Future. Afternoon pickup for thrilling 4x4 Dune Bashing in Lahbab Red Dunes, sandboarding, camel rides, and Arabic BBQ dinner camp.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["4x4 Dune Bashing", "Fire Show", "Belly Dance & BBQ"]
      },
      {
        day: 4,
        title: "Full Day Abu Dhabi Tour & BAPS Hindu Mandir",
        location: "Abu Dhabi",
        description: "Scenic drive along the Persian Gulf to Abu Dhabi. Visit the breathtaking Sheikh Zayed Grand Mosque, drive past Corniche and Emirates Palace, and visit the historic BAPS Hindu Mandir.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Sheikh Zayed Mosque", "BAPS Mandir", "Abu Dhabi Corniche"]
      },
      {
        day: 5,
        title: "Gold Souk Shopping & Departure",
        location: "Dubai Airport",
        description: "Time for last-minute shopping at Meena Bazaar or Gold Souk. Private transfer to Dubai Airport for departure.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Gold & Spice Souk", "Airport transfer"]
      }
    ],
    inclusions: [
      "4 Nights in 4-Star Hotel in Dubai (Bur Dubai / Deira / Barsha)",
      "Daily International Buffet Breakfast",
      "Burj Khalifa 124th Floor Off-Peak Entry Ticket",
      "Desert Safari with 4x4 Dune Bashing, Tanoura, Fire Show & BBQ Dinner",
      "Marina Dhow Cruise with Dinner",
      "Abu Dhabi City Tour with Sheikh Zayed Mosque",
      "All transfers on private/seat-in-coach basis",
      "UAE Tourist Visa and Travel Insurance (30 Days)"
    ],
    exclusions: [
      "International flights (custom booking available)",
      "Tourism Dirham Fee payable directly at hotel check-in (~AED 15-20/night)",
      "Personal shopping, quad biking, and optional meals"
    ],
    hotels: [
      {
        name: "Grand Excelsior Hotel / Hyatt Place",
        category: "4-Star Luxury City Hotel",
        location: "Al Barsha / Deira, Dubai",
        nights: 4,
        amenities: ["Rooftop Pool", "Free Wi-Fi", "Metro Proximity", "Indian Restaurant Options"]
      }
    ],
    departureCities: ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Kochi"],
    upcomingDepartures: ["Every Thursday & Saturday", "Festive Batch Available"],
    badge: "Most Popular International",
    rating: 4.88,
    reviewCount: 389,
    suitableFor: ["Family", "Couple", "Group"]
  },
  {
    id: "pkg-bali-tropical",
    slug: "bali-tropical-paradise",
    title: "Bali: Island of the Gods & Private Pool Villa",
    subtitle: "Ubud Culture, Kintamani Volcano, Nusa Penida Island & Uluwatu Sunset",
    destination: "Bali",
    country: "Indonesia",
    isInternational: true,
    category: ["International Tours", "Honeymoon", "Customized"],
    duration: { days: 6, nights: 5 },
    startingPrice: 42999,
    originalPrice: 49500,
    priceNote: "per person on twin sharing with 1N Private Pool Villa",
    featuredImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Bali is where spirituality meets tropical bliss. Swing over emerald rice terraces in Ubud, watch fiery sunsets over Uluwatu cliff temple, discover the dinosaur-shaped T-Rex cliff at Nusa Penida, and unwind in your private pool villa.",
    highlights: [
      "1 Night in a Luxury Private Pool Villa in Seminyak or Ubud",
      "Excursion to Nusa Penida Island: Kelingking Beach, Broken Beach & Angel's Billabong",
      "Ubud Bali Swing & Tegalalang Rice Terraces",
      "Kintamani Volcano overlook & Coffee Plantation tour",
      "Uluwatu Sunset Temple perched 70m above Indian Ocean waves"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Denpasar Bali & Check-in to Ubud",
        location: "Ubud",
        description: "Welcome to Bali with fragrant frangipani flower garlands. Transfer to Ubud resort nestled amidst rainforest greenery.",
        mealsIncluded: ["Dinner"],
        highlights: ["Flower garland welcome", "Rainforest resort check-in"]
      },
      {
        day: 2,
        title: "Kintamani Volcano, Ubud Swing & Rice Terraces",
        location: "Kintamani & Ubud",
        description: "Witness Mount Batur active volcano across Lake Batur. Fly high on the iconic Bali jungle swing with epic rice terrace photos. Visit traditional Luwak coffee plantation.",
        mealsIncluded: ["Breakfast", "Lunch"],
        highlights: ["Bali Swing", "Tegalalang Rice Terraces", "Mount Batur panorama"]
      },
      {
        day: 3,
        title: "Nusa Penida Island Speedboat Day Tour",
        location: "Nusa Penida Island",
        description: "Board speedboat to Nusa Penida. Visit the jaw-dropping Kelingking T-Rex cliff, Angel's Billabong natural infinity pool, and Broken Beach circular cove.",
        mealsIncluded: ["Breakfast", "Lunch"],
        highlights: ["Kelingking Beach", "Angel's Billabong", "Speedboat adventure"]
      },
      {
        day: 4,
        title: "Tanah Lot Temple & Water Sports at Tanjung Benoa",
        location: "Seminyak / Benoa",
        description: "Enjoy Banana Boat ride and parasailing at Tanjung Benoa beach. Later, visit Tanah Lot temple standing majestically on an offshore rock formation amidst crashing waves.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Tanjung Benoa water sports", "Tanah Lot sea temple"]
      },
      {
        day: 5,
        title: "Uluwatu Cliff Sunset & Private Pool Villa Relaxation",
        location: "Seminyak Villa",
        description: "Check in to your Private Pool Villa. Relax and enjoy the floating breakfast experience. In the evening, visit dramatic Uluwatu Cliff Temple overlooking the Indian Ocean.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Private Pool Villa", "Uluwatu cliff sunset"]
      },
      {
        day: 6,
        title: "Seminyak Shopping & Return Flight",
        location: "Denpasar Airport",
        description: "Enjoy a leisurely morning. Pickup for souvenir shopping in Kuta/Seminyak and transfer to Ngurah Rai Airport.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Souvenir shopping", "Departure transfer"]
      }
    ],
    inclusions: [
      "4 Nights in 4-Star Resort + 1 Night in Private Pool Villa",
      "Daily Breakfast including 1 signature Floating Breakfast in Villa",
      "Nusa Penida West Island Tour with Speedboat transfers & lunch",
      "Ubud Swing with safety harness & photo assistance",
      "Tanjung Benoa water sports package (Banana Boat ride)",
      "Private AC transport with English-speaking local tour guide",
      "Indonesia SIM card assistance and local 24/7 coordinator"
    ],
    exclusions: [
      "International flights (available on request)",
      "Indonesia Visa on Arrival (~USD 35 at airport)",
      "Bali Tourism Levy (~USD 10)"
    ],
    hotels: [
      {
        name: "Element by Westin Ubud / Rama Phala",
        category: "4-Star Rainforest Resort",
        location: "Ubud",
        nights: 3,
        amenities: ["Infinity Pool", "Yoga Shala", "River View", "Spa"]
      },
      {
        name: "The Royal Bali Villas / Aksari Villa",
        category: "5-Star Luxury Private Pool Villa",
        location: "Seminyak",
        nights: 2,
        amenities: ["Private Swimming Pool", "Sun Loungers", "Floating Breakfast", "Bathtub"]
      }
    ],
    departureCities: ["Chennai", "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Kochi"],
    badge: "Honeymooner's Dream",
    rating: 4.92,
    reviewCount: 275,
    suitableFor: ["Couple", "Family", "Solo"]
  },
  {
    id: "pkg-maldives-luxury",
    slug: "magical-maldives-water-villa",
    title: "Magical Maldives: All-Inclusive Water Villa Escape",
    subtitle: "Overwater Bungalows, Turquoise Lagoons & Speedboat Transfers",
    destination: "Maldives",
    country: "Maldives",
    isInternational: true,
    category: ["International Tours", "Honeymoon", "Luxury"],
    duration: { days: 4, nights: 3 },
    startingPrice: 88500,
    originalPrice: 99000,
    priceNote: "per person on twin sharing with All-Inclusive Meals & Drinks",
    featuredImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Pure unadulterated luxury. Wake up to direct lagoon access from your private overwater sundeck, swim with gentle reef sharks, and indulge in all-inclusive dining with world-class chefs on a private island paradise.",
    highlights: [
      "Stay in an authentic Overwater Villa with direct lagoon access",
      "All-Inclusive dining: Unlimited breakfast, lunch, dinner & premium beverages",
      "Complimentary snorkeling equipment and non-motorized water sports",
      "Romantic bed decoration with sparkling wine for couples",
      "Roundtrip Scenic Speedboat or Seaplane airport transfer"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Malé & Scenic Speedboat to Island Resort",
        location: "Private Island Resort",
        description: "Welcome at Velana International Airport (Malé). Board your luxury resort speedboat gliding over crystal clear waters to your private coral island resort. Check in to your villa.",
        mealsIncluded: ["Lunch", "Dinner"],
        highlights: ["Speedboat transfer", "Island cocktail welcome", "Overwater villa check-in"]
      },
      {
        day: 2,
        title: "Snorkeling Safari & House Reef Marine Life",
        location: "Coral Lagoon",
        description: "Grab your snorkeling gear and step directly from your villa ladder into the house reef. Encounter colorful butterflyfish, sea turtles, and baby blacktip reef sharks. Evening sunset cruise.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["House reef snorkeling", "Sunset cocktail", "Live acoustic beach music"]
      },
      {
        day: 3,
        title: "Romantic Spa Session & Private Beach Dinner",
        location: "Overwater Spa",
        description: "Pamper yourselves with an overwater spa treatment overlooking coral shoals. Spend the afternoon paddle-boarding across turquoise shallows. Candlelit table under the stars.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Paddleboarding", "Romantic beach dining", "Stargazing"]
      },
      {
        day: 4,
        title: "Sunrise Lagoon Dip & Farewell Maldives",
        location: "Malé Airport",
        description: "Final sunrise swim in the lagoon followed by a decadent champagne breakfast. Speedboat transfer back to Malé airport for your journey home.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Champagne breakfast", "Speedboat drop"]
      }
    ],
    inclusions: [
      "3 Nights in Deluxe Overwater Villa",
      "All-Inclusive Plan: Breakfast, Lunch, Afternoon Tea, Dinner & Unlimited beverages",
      "Roundtrip Airport Speedboat Transfers",
      "Free use of Snorkeling gear, Kayaks, and Stand-Up Paddleboards",
      "Special Honeymoon Cake, Fruit Basket & Flower Bed decoration",
      "All Maldives Green Tax and Service Charges included"
    ],
    exclusions: [
      "International flights to Malé (direct flights from Chennai/Bangalore/Mumbai)",
      "Motorized water sports (Jet Ski, Parasailing, Seabob)",
      "Personal spa treatments"
    ],
    hotels: [
      {
        name: "Adaaran Prestige Vadoo / Centara Ras Fushi",
        category: "5-Star Luxury Private Island Resort",
        location: "South Malé Atoll",
        nights: 3,
        amenities: ["Direct Lagoon Access", "Glass Floor Panel", "Butler Service", "Overwater Spa"]
      }
    ],
    departureCities: ["Chennai", "Bangalore", "Kochi", "Mumbai", "Delhi", "Hyderabad"],
    badge: "Ultimate Luxury",
    rating: 4.98,
    reviewCount: 194,
    suitableFor: ["Couple", "Luxury"]
  },
  {
    id: "pkg-swiss-paris-wonder",
    slug: "switzerland-paris-grand-tour",
    title: "Swiss Alps & Paris: The Grand European Dream",
    subtitle: "Zurich, Mount Titlis, Lucerne, Interlaken & Paris Eiffel Tower",
    destination: "Switzerland & France",
    country: "Switzerland",
    isInternational: true,
    category: ["International Tours", "Europe", "Honeymoon", "Group Tours"],
    duration: { days: 8, nights: 7 },
    startingPrice: 158000,
    originalPrice: 175000,
    priceNote: "per person on twin sharing with Swiss Travel Pass",
    featuredImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "The quintessential European fairy tale! Stand atop Mount Titlis in a revolving cable car 10,000 feet high, cruise Lake Lucerne, stroll through charming Swiss chalets, and experience the dazzling lights of Paris from the Eiffel Tower and the River Seine.",
    highlights: [
      "Mount Titlis with Rotair revolving cable car & Cliff Walk suspension bridge",
      "Lucerne city tour: Chapel Bridge, Lion Monument & Lake Lucerne cruise",
      "Scenic Swiss countryside rail journey with Swiss Travel Pass",
      "Paris Eiffel Tower 2nd Level access with panoramic city view",
      "Seine River Cruise past Notre Dame, Louvre, and illuminated bridges"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Zurich & Transfer to Lucerne",
        location: "Lucerne, Switzerland",
        description: "Land at Zurich Airport. Board high-speed Swiss rail to Lucerne. Walk across the 14th-century wooden Chapel Bridge and enjoy lakeside dining.",
        mealsIncluded: ["Dinner"],
        highlights: ["Scenic rail journey", "Chapel Bridge", "Lake Lucerne"]
      },
      {
        day: 2,
        title: "Excursion to Mount Titlis & Eternal Snow",
        location: "Engelberg & Mt Titlis",
        description: "Ascend Engelberg to Mt Titlis via the world's first revolving cable car. Walk through the Glacier Cave and brave the Titlis Cliff Walk Europe's highest suspension bridge.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Rotair Cable Car", "Glacier Cave", "Titlis Cliff Walk"]
      },
      {
        day: 3,
        title: "Interlaken & Jungfrau Panorama",
        location: "Interlaken",
        description: "Explore the picturesque town of Interlaken situated between Lake Thun and Lake Brienz. Optional Jungfraujoch Top of Europe excursion.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Interlaken town", "Alpine lakes", "Swiss watch boutiques"]
      },
      {
        day: 4,
        title: "Rhine Falls & High-Speed TGV Train to Paris",
        location: "Paris, France",
        description: "Visit Rhine Falls — Europe's largest waterfall. In the afternoon, board the high-speed TGV Lyria train whisking you straight into Paris, the City of Light.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Rhine Falls", "TGV Lyria high speed train", "Arrival in Paris"]
      },
      {
        day: 5,
        title: "Paris City Tour & Eiffel Tower Summit / 2nd Floor",
        location: "Paris",
        description: "Guided panoramic tour: Champs-Élysées, Arc de Triomphe, Place de la Concorde, and Louvre exterior. Ascend the Eiffel Tower for commanding vistas of Paris.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Eiffel Tower", "Arc de Triomphe", "Champs-Élysées"]
      },
      {
        day: 6,
        title: "Seine River Cruise & Louvre / Fragonard Perfumery",
        location: "Paris",
        description: "Glide on a glass-topped Bateaux Mouches boat along the River Seine. Visit the historic Fragonard perfume museum and shop at Galeries Lafayette.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Seine River Cruise", "Fragonard Museum", "Galeries Lafayette"]
      },
      {
        day: 7,
        title: "Disneyland Paris Full-Day Fun (Optional) or Palace of Versailles",
        location: "Paris",
        description: "Day free to explore Disneyland Paris 1-Day 1-Park or take an optional royal tour of the Palace of Versailles and its hall of mirrors.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Disneyland Paris or Versailles Palace"]
      },
      {
        day: 8,
        title: "Farewell Paris & Departure to India",
        location: "Paris Charles de Gaulle Airport",
        description: "Enjoy warm croissants for breakfast. Transfer to CDG Airport for your return flight.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Airport transfer"]
      }
    ],
    inclusions: [
      "7 Nights accommodation in 4-Star hotels (3N Switzerland + 4N Paris)",
      "Daily Continental Breakfast and 5 Indian Dinners",
      "Mount Titlis cable car excursion tickets",
      "Paris Eiffel Tower 2nd Level tickets & Seine River Cruise",
      "Swiss Travel Pass (Consecutive days for seamless train travel)",
      "High-speed TGV Train ticket from Switzerland to Paris",
      "All airport and sightseeing transfers mentioned in itinerary",
      "Schengen Visa assistance and Travel Insurance"
    ],
    exclusions: [
      "International flights India - Zurich / Paris - India",
      "Schengen Visa fee (~EUR 80 payable at VFS Global)",
      "Optional Jungfraujoch or Disneyland Paris ticket"
    ],
    hotels: [
      {
        name: "Radisson Blu Hotel Lucerne",
        category: "4-Star Lake Property",
        location: "Lucerne, Switzerland",
        nights: 3,
        amenities: ["Lake View", "Sauna", "Central Station 5 mins", "Restaurant"]
      },
      {
        name: "Novotel Paris Centre Tour Eiffel",
        category: "4-Star Riverview Hotel",
        location: "Paris, France",
        nights: 4,
        amenities: ["Indoor Heated Pool", "Eiffel Tower View", "Fitness Center"]
      }
    ],
    departureCities: ["Chennai", "Bangalore", "Mumbai", "Delhi"],
    upcomingDepartures: ["Every 2nd & 4th Saturday", "Spring & Summer batches open"],
    badge: "Bucket List Europe",
    rating: 4.94,
    reviewCount: 168,
    suitableFor: ["Family", "Couple", "Group"]
  },
  {
    id: "pkg-singapore-sentosa",
    slug: "singapore-sentosa-future-city",
    title: "Singapore: Gardens by the Bay & Universal Studios",
    subtitle: "Marina Bay Sands, Sentosa Island, Night Safari & Jurong Bird Paradise",
    destination: "Singapore",
    country: "Singapore",
    isInternational: true,
    category: ["International Tours", "Group Tours"],
    duration: { days: 5, nights: 4 },
    startingPrice: 48500,
    originalPrice: 56000,
    priceNote: "per person on twin sharing with Universal Studios pass",
    featuredImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Experience the cleanest, greenest futuristic metropolis on earth. Walk through the alien canopy of Supertree Grove, brave cutting-edge rollercoasters at Universal Studios Sentosa, and observe nocturnal wildlife on the world's first Night Safari.",
    highlights: [
      "Full-Day Universal Studios Singapore pass with Transformers The Ride",
      "Gardens by the Bay: Flower Dome, Cloud Forest & Supertree Grove Light Show",
      "World's first Night Safari tram ride through multi-climate animal habitats",
      "Sentosa Cable Car ride & Wings of Time laser light water show",
      "Singapore City Tour: Merlion Park, Chinatown & Little India"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive at Changi Jewel & Night Safari",
        location: "Singapore",
        description: "Arrive at award-winning Changi Airport. Marvel at the HSBC Rain Vortex waterfall inside Jewel. In the evening, venture into the famous Night Safari tram tour.",
        mealsIncluded: ["Dinner"],
        highlights: ["Jewel Changi Rain Vortex", "Night Safari tram"]
      },
      {
        day: 2,
        title: "Singapore City Tour & Gardens by the Bay",
        location: "Marina Bay",
        description: "City orientation tour visiting Merlion Park, Parliament House, and Padang. Afternoon visit Gardens by the Bay Cloud Forest and the breathtaking Supertree Light Show at 7:45 PM.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Merlion Park", "Cloud Forest", "Supertree Light Show"]
      },
      {
        day: 3,
        title: "Full Day Universal Studios Singapore",
        location: "Sentosa Island",
        description: "Spend a magical day at Universal Studios on Sentosa Island. Ride Battlestar Galactica, Jurassic Park Rapids, Revenge of the Mummy, and meet favourite movie characters.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Universal Studios Singapore", "Transformers Ride", "Battlestar Galactica"]
      },
      {
        day: 4,
        title: "Sentosa Island Cable Car, S.E.A. Aquarium & Wings of Time",
        location: "Sentosa",
        description: "Board scenic Singapore Cable Car. Visit S.E.A. Aquarium home to 100,000 marine animals. Watch the spectacular Wings of Time fireworks and laser water show on Siloso beach.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Cable Car", "S.E.A. Aquarium", "Wings of Time show"]
      },
      {
        day: 5,
        title: "Little India Shopping & Departure",
        location: "Changi Airport",
        description: "Free morning for electronics and souvenir shopping at Mustafa Centre or Orchard Road. Transfer to Changi Airport for your flight.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Mustafa Centre", "Changi Airport departure"]
      }
    ],
    inclusions: [
      "4 Nights in 4-Star Hotel in Singapore (Little India / Orchard area)",
      "Daily Buffet Breakfast and 3 Indian Dinners",
      "Universal Studios Singapore 1-Day Pass",
      "Gardens by the Bay 2 Domes entry (Flower Dome + Cloud Forest)",
      "Night Safari Tram Ticket and animal show",
      "Sentosa Cable Car + Wings of Time show ticket",
      "Singapore Tourist eVisa processing",
      "All airport transfers and tour transportation"
    ],
    exclusions: [
      "Airfare (direct flights from South India easily bookable)",
      "Personal meals, drinks, and shopping"
    ],
    hotels: [
      {
        name: "V Hotel Lavender / Park Hotel Farrer Park",
        category: "4-Star Modern Hotel",
        location: "Central Singapore",
        nights: 4,
        amenities: ["MRT Station doorstep", "Outdoor Swimming Pool", "Free Wi-Fi", "Indian Dining close by"]
      }
    ],
    departureCities: ["Chennai", "Tiruchirappalli", "Bangalore", "Madurai", "Coimbatore", "Hyderabad"],
    badge: "Family Favorite",
    rating: 4.87,
    reviewCount: 341,
    suitableFor: ["Family", "Group"]
  },
  {
    id: "pkg-rajasthan-heritage",
    slug: "royal-rajasthan-forts-palaces",
    title: "Royal Rajasthan: Land of Maharajas & Forts",
    subtitle: "Jaipur Pink City, Jodhpur Blue City & Udaipur Lake Palace",
    destination: "Rajasthan",
    country: "India",
    isInternational: false,
    region: "West India",
    category: ["India Tours", "Luxury", "Group Tours"],
    duration: { days: 7, nights: 6 },
    startingPrice: 31500,
    originalPrice: 37000,
    priceNote: "per person on twin sharing basis",
    featuredImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Relive the regal glory of the Rajput kings. Explore the Amber Fort atop elephants/jeeps in Jaipur, peer down the blue houses from Jodhpur's Mehrangarh Fort, and cruise the shimmering waters of Lake Pichola in Udaipur.",
    highlights: [
      "Amer Fort, Hawa Mahal & City Palace in Jaipur",
      "Mighty Mehrangarh Fort and Jaswant Thada in Jodhpur",
      "Romantic Lake Pichola boat cruise in Udaipur",
      "Fabled Ranakpur Jain Temple with 1,444 marble pillars",
      "Traditional Rajasthani Folk Dance & cultural dinner at Chokhi Dhani"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Jaipur — The Pink City",
        location: "Jaipur",
        description: "Arrival at Jaipur Airport. Check in to heritage hotel. Evening visit to Birla Temple and the colorful Johari Bazaar.",
        mealsIncluded: ["Dinner"],
        highlights: ["Pink City welcome", "Johari Bazaar"]
      },
      {
        day: 2,
        title: "Jaipur Royal Forts & Palaces",
        location: "Jaipur",
        description: "Jeep ride up Amber Fort with mirrored Sheesh Mahal. Photo stop at Jal Mahal (Water Palace), visit Hawa Mahal (Palace of Winds), and Jantar Mantar solar observatory.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Amber Fort", "Hawa Mahal", "Jantar Mantar"]
      },
      {
        day: 3,
        title: "Jaipur to Jodhpur — The Sun City",
        location: "Jodhpur",
        description: "Drive across the semi-arid countryside to Jodhpur. Check in to hotel. Evening walk through old blue city alleys and Clock Tower market.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Clock Tower market", "Blue city streets"]
      },
      {
        day: 4,
        title: "Mehrangarh Fort to Udaipur via Ranakpur",
        location: "Ranakpur & Udaipur",
        description: "Tour colossal Mehrangarh Fort. Continue to Udaipur stopping at the architectural wonder Ranakpur Jain Temple. Arrive in Udaipur, City of Lakes.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Mehrangarh Fort", "Ranakpur marble carvings"]
      },
      {
        day: 5,
        title: "Udaipur City Palace & Lake Pichola Boat Cruise",
        location: "Udaipur",
        description: "Explore Udaipur City Palace, Saheliyon-ki-Bari royal maiden gardens, and take a sunset boat cruise on Lake Pichola past Jag Mandir Island.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["City Palace Udaipur", "Lake Pichola boat cruise", "Saheliyon-ki-Bari"]
      },
      {
        day: 6,
        title: "Chittorgarh Fort Excursion or Leisure",
        location: "Udaipur / Chittorgarh",
        description: "Optional day trip to historic Chittorgarh Fort or enjoy a leisurely day browsing Udaipur's miniature paintings, pottery, and silver jewelry.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Rajasthani crafts & art"]
      },
      {
        day: 7,
        title: "Farewell Udaipur & Departure",
        location: "Udaipur Airport",
        description: "Transfer to Udaipur Airport or Jaipur for your return flight.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Airport drop"]
      }
    ],
    inclusions: [
      "6 Nights in Heritage & 4-Star Hotels",
      "Daily Royal Buffet Breakfast and Dinner",
      "Lake Pichola Boat Cruise ticket",
      "Chokhi Dhani cultural village dinner entry",
      "Dedicated AC Private Vehicle with verified driver",
      "All monument entrance guidance and tourist permits"
    ],
    exclusions: [
      "Flight or Train tickets to Jaipur / from Udaipur",
      "Monument entry tickets & camera fees",
      "Elephant ride at Amber Fort"
    ],
    hotels: [
      {
        name: "Alsisar Haveli / Mandawa Haveli",
        category: "Heritage Boutique Hotel",
        location: "Jaipur",
        nights: 2,
        amenities: ["Courtyard Pool", "Fresco Architecture", "Royal Dining"]
      },
      {
        name: "Ranbanka Palace",
        category: "Heritage Property",
        location: "Jodhpur",
        nights: 1,
        amenities: ["Jodhpur Stone Architecture", "Spa", "Lounge"]
      },
      {
        name: "Fateh Garh Heritage Resort",
        category: "Heritage Palace on Hilltop",
        location: "Udaipur",
        nights: 3,
        amenities: ["Panoramic Lake & Hill View", "Infinity Pool", "Vintage Car Collection"]
      }
    ],
    departureCities: ["Chennai", "Bangalore", "Hyderabad", "Delhi", "Mumbai"],
    badge: "Royal Heritage",
    rating: 4.89,
    reviewCount: 215,
    suitableFor: ["Family", "Couple", "Group"]
  },
  {
    id: "pkg-andaman-island",
    slug: "andaman-exotic-islands-havelock",
    title: "Andaman: Radhanagar Beach & Coral Reefs",
    subtitle: "Port Blair Cellular Jail, Havelock Island Scuba & Neil Island",
    destination: "Andaman & Nicobar",
    country: "India",
    isInternational: false,
    region: "Islands",
    category: ["India Tours", "Honeymoon", "Group Tours"],
    duration: { days: 6, nights: 5 },
    startingPrice: 34500,
    originalPrice: 41000,
    priceNote: "per person on twin sharing with Makruzz Cruise transfers",
    featuredImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Crystal clear water, pristine white sands, and untamed tropical greenery. Walk barefoot on Radhanagar Beach — voted Asia's best beach — snorkel vibrant coral reefs at Elephant Beach, and discover India's freedom history at Cellular Jail.",
    highlights: [
      "Radhanagar Beach sunset — Asia's #1 white sand beach",
      "High-speed Catamaran (Makruzz / Green Ocean) between islands",
      "Elephant Beach water sports and complimentary snorkeling",
      "Cellular Jail Light & Sound historical show in Port Blair",
      "Natural Coral Bridge and Bharatpur beach at Neil Island"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Port Blair & Cellular Jail Light and Sound Show",
        location: "Port Blair",
        description: "Arrive at Veer Savarkar Airport Port Blair. Check in to seaside hotel. Visit the historic Cellular Jail and attend the patriotic Light & Sound show.",
        mealsIncluded: ["Dinner"],
        highlights: ["Cellular Jail", "Corbyn's Cove Beach", "Light & Sound Show"]
      },
      {
        day: 2,
        title: "Port Blair to Havelock Island via Makruzz Catamaran",
        location: "Havelock Island",
        description: "Board high-speed luxury catamaran cruise to Havelock Island. Check in to beachfront resort. Afternoon visit to the world-famous Radhanagar Beach (Beach No. 7).",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Makruzz Cruise", "Radhanagar Beach sunset"]
      },
      {
        day: 3,
        title: "Elephant Beach Snorkeling & Coral Excursion",
        location: "Elephant Beach",
        description: "Speedboat ride to Elephant Beach. Complimentary snorkeling over shallow coral gardens. Optional Scuba Diving or Sea Walk experiences.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Elephant Beach", "Snorkeling", "Corals & Sea Life"]
      },
      {
        day: 4,
        title: "Havelock to Neil Island (Shaheed Dweep)",
        location: "Neil Island",
        description: "Cruise to tranquil Neil Island. Visit Bharatpur Beach, Laxmanpur Beach for sunset, and the remarkable Natural Living Rock Bridge.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Natural Coral Bridge", "Laxmanpur Sunset", "Quiet beaches"]
      },
      {
        day: 5,
        title: "Neil Island to Port Blair",
        location: "Port Blair",
        description: "Return to Port Blair by luxury ferry. Evening free for shopping at Sagarika Government Handicraft Emporium for shells and wooden souvenirs.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Sagarika Emporium", "Seafood dinner"]
      },
      {
        day: 6,
        title: "Departure from Port Blair",
        location: "Port Blair Airport",
        description: "Post breakfast, transfer to Port Blair airport with memories of emerald seas.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Airport transfer"]
      }
    ],
    inclusions: [
      "5 Nights accommodation (2N Port Blair + 2N Havelock + 1N Neil Island)",
      "Daily Buffet Breakfast and Dinner",
      "Private AC Vehicle for all land transfers",
      "All inter-island ferry tickets in Makruzz / Nautika (Premium Class)",
      "Entry tickets & boat permits for all sightseeing spots",
      "Complimentary snorkeling at Elephant Beach"
    ],
    exclusions: [
      "Flight tickets to/from Port Blair",
      "Personal Scuba Diving / Sea Walk / Jet ski charges",
      "Camera permits"
    ],
    hotels: [
      {
        name: "Symphony Samudra Beachside",
        category: "5-Star Luxury Resort",
        location: "Port Blair",
        nights: 2,
        amenities: ["Infinity Pool", "Private Beach", "Sunset Lounge"]
      },
      {
        name: "Havelock Island Beach Resort",
        category: "4-Star Beachfront Resort",
        location: "Havelock Island",
        nights: 2,
        amenities: ["Private Sand Beach", "Beachside Candlelight Dining", "Scuba Center"]
      },
      {
        name: "Summer Sands Beach Resort",
        category: "4-Star Villa Resort",
        location: "Neil Island",
        nights: 1,
        amenities: ["Swimming Pool", "Garden Villas", "Multi-cuisine Restaurant"]
      }
    ],
    departureCities: ["Chennai", "Bangalore", "Kolkata", "Hyderabad", "Delhi"],
    badge: "Pristine Islands",
    rating: 4.91,
    reviewCount: 204,
    suitableFor: ["Couple", "Family", "Adventure"]
  },
  {
    id: "pkg-ooty-kodaikanal",
    slug: "ooty-kodaikanal-hills-retreat",
    title: "Ooty & Kodaikanal: Queen & Princess of Hills",
    subtitle: "Nilgiri Toy Train, Botanical Gardens, Kodai Lake & Coaker's Walk",
    destination: "Ooty & Kodaikanal",
    country: "India",
    isInternational: false,
    region: "South India",
    category: ["India Tours", "Honeymoon", "Group Tours"],
    duration: { days: 5, nights: 4 },
    startingPrice: 17500,
    originalPrice: 21000,
    priceNote: "per person on twin sharing basis",
    featuredImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Escape into the cool, misty embrace of the Western Ghats. Ride the UNESCO heritage Nilgiri Toy Train, smell fresh pine needles at Doddabetta Peak, boat across serene Kodaikanal Lake, and gaze over Pillar Rocks.",
    highlights: [
      "UNESCO Nilgiri Mountain Toy Train ride through 16 tunnels",
      "Doddabetta Peak & Ooty Government Botanical Garden",
      "Pykara Lake boat ride & cascading Pykara Waterfalls",
      "Kodaikanal Lake boating & cycling along scenic lakeside",
      "Coaker's Walk, Pillar Rocks & Pine Forest exploration"
    ],
    itinerary: [
      {
        day: 1,
        title: "Coimbatore to Ooty via Nilgiri Hills",
        location: "Ooty",
        description: "Pickup from Coimbatore Airport / Railway Station. Ascend through 36 hairpin bends of the Nilgiri hills. Check in to colonial heritage resort. Visit Ooty Lake in the evening.",
        mealsIncluded: ["Dinner"],
        highlights: ["Scenic hairpin drive", "Ooty Lake boating"]
      },
      {
        day: 2,
        title: "Ooty Sightseeing & Toy Train",
        location: "Ooty & Coonoor",
        description: "Experience the Nilgiri Mountain Toy Train to Coonoor. Visit Sim's Park, Dolphin's Nose viewpoint, and Tea Factory with handmade chocolate tasting.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Heritage Toy Train", "Sim's Park Coonoor", "Handmade chocolate shopping"]
      },
      {
        day: 3,
        title: "Ooty to Kodaikanal — The Princess of Hills",
        location: "Kodaikanal",
        description: "Drive through scenic Palani hills to Kodaikanal. Check in to hotel. Evening stroll along star-shaped Kodai Lake.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Palani hills drive", "Star-shaped Kodai Lake"]
      },
      {
        day: 4,
        title: "Kodaikanal Scenic Marvels",
        location: "Kodaikanal",
        description: "Visit Coaker's Walk for valley views, Pillar Rocks, Green Valley View, Pine Forest, and Silver Cascade Waterfalls.",
        mealsIncluded: ["Breakfast", "Dinner"],
        highlights: ["Coaker's Walk", "Pillar Rocks", "Pine Forest"]
      },
      {
        day: 5,
        title: "Departure from Madurai or Coimbatore",
        location: "Madurai / Coimbatore Airport",
        description: "Descend to Madurai or Coimbatore for your homeward train or flight with refreshing memories.",
        mealsIncluded: ["Breakfast"],
        highlights: ["Descent drive", "Airport transfer"]
      }
    ],
    inclusions: [
      "4 Nights accommodation (2N Ooty + 2N Kodaikanal) in 3-4 Star properties",
      "Daily Breakfast and Dinner",
      "Exclusive AC Private Cab for all transfers and sightseeing",
      "Driver beta, fuel, toll taxes, and parking charges",
      "All interstate permits"
    ],
    exclusions: [
      "Toy Train tickets (subject to railway availability)",
      "Boating charges & entrance tickets",
      "Personal expenses"
    ],
    hotels: [
      {
        name: "Savoy — IHCL SeleQtions",
        category: "Heritage Luxury Hotel",
        location: "Ooty",
        nights: 2,
        amenities: ["Colonial Fireplace", "Landscaped English Gardens", "Fine Dining"]
      },
      {
        name: "The Carlton Hotel",
        category: "5-Star Lakeside Hotel",
        location: "Kodaikanal",
        nights: 2,
        amenities: ["Lake View Rooms", "Private Boating Jetty", "Spa"]
      }
    ],
    departureCities: ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Bangalore"],
    badge: "Budget Friendly & Scenic",
    rating: 4.85,
    reviewCount: 380,
    suitableFor: ["Family", "Couple", "Group"]
  }
];
