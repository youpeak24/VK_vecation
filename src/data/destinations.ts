import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-maldives",
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    tagline: "Turquoise lagoons and luxury overwater living",
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    isInternational: true,
    bestTimeToVisit: "November to April (Dry Season & Calm Waters)",
    idealDuration: "4 to 5 Days",
    currency: "Maldivian Rufiyaa (MVR) / USD widely accepted",
    visaInfo: {
      type: "Free 30-Day Tourist Visa on Arrival for Indian Passport Holders",
      processingTime: "Instant on Arrival at Velana Airport",
      note: "Valid passport with 6 months validity, return ticket, and resort confirmation required.",
      lastUpdated: "Updated 2026"
    },
    overview: "The Maldives is an archipelago of over 1,000 coral islands scattered across the equator in the Indian Ocean. Famous for its world-class private island resorts, powdery white beaches, turquoise crystalline lagoons, and vibrant marine life, it is the ultimate romantic and luxury travel sanctuary.",
    topAttractions: [
      {
        name: "Private Atoll Overwater Bungalows",
        description: "Wake up suspended over crystalline waters with steps directly into the ocean reef.",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Bioluminescent Beach & Sandbanks",
        description: "Witness glowing phytoplankton or dine on a private sandbank completely surrounded by sea.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Manta Point & Shark Reef Snorkeling",
        description: "Encounter graceful manta rays, gentle whale sharks, and sea turtles in their natural habitat.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
      }
    ],
    travelTips: [
      "Opt for an All-Inclusive meal plan to save on luxury island dining and beverages.",
      "Speedboat transfers operate 24/7 for close atolls; seaplanes operate during daylight hours only.",
      "Carry reef-safe sunscreen to protect delicate coral reefs."
    ],
    faqs: [
      {
        question: "Do Indians need a visa before flying to Maldives?",
        answer: "No. Indian passport holders receive a complimentary 30-day tourist visa on arrival at Malé Airport with valid return tickets and hotel voucher."
      },
      {
        question: "Is Indian vegetarian or Jain food available?",
        answer: "Yes! All luxury partner resorts working with VK Vacations provide dedicated Indian vegetarian and Jain meal preparations."
      }
    ],
    packageCount: 3,
    popularFor: ["Honeymoon", "Luxury Overwater Villas", "Marine Diving", "Romantic Dinners"]
  },
  {
    id: "dest-switzerland",
    slug: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    tagline: "Snow-crowned Alps, emerald lakes and timeless romance",
    heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    isInternational: true,
    bestTimeToVisit: "May to October (Scenic Greens & Lakes) | Dec to March (Snow & Skiing)",
    idealDuration: "6 to 8 Days",
    currency: "Swiss Franc (CHF) / EUR partially accepted",
    visaInfo: {
      type: "Schengen Visa (Short Stay Type C)",
      processingTime: "15 to 20 working days through VFS Global",
      note: "VK Vacations provides complete document verification, appointment assistance, and cover letter prep.",
      lastUpdated: "Updated 2026"
    },
    overview: "Nestled in the heart of Europe, Switzerland represents pristine natural perfection. With panoramic cogwheel trains scaling jagged alpine peaks, glassy lakes framed by snow summits, and world-renowned chocolates, Switzerland is every traveler's bucket-list fantasy.",
    topAttractions: [
      {
        name: "Mount Titlis & Rotair Cable Car",
        description: "The world's first revolving cable car offering 360-degree vistas across perpetual glaciers.",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Lucerne & Chapel Bridge",
        description: "Historic wooden pedestrian bridge dating to 1333 overlooking swans on Lake Lucerne.",
        image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Jungfraujoch — Top of Europe",
        description: "The highest railway station in Europe at 3,454 meters with panoramic observation decks.",
        image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=600&q=80"
      }
    ],
    travelTips: [
      "The Swiss Travel Pass provides unlimited rides on all trains, buses, lake boats, and museum entries.",
      "Carry layered clothing even in summer as alpine peaks reach below-freezing temperatures.",
      "Try local Swiss cheese fondue and visit Lindt Home of Chocolate in Zurich."
    ],
    faqs: [
      {
        question: "How far in advance should we apply for a Switzerland Schengen visa?",
        answer: "We recommend applying at least 6 to 8 weeks before departure to ensure timely VFS appointments and processing."
      },
      {
        question: "Is Switzerland suitable for Indian seniors and children?",
        answer: "Absolutely. Swiss transport is world-class with step-free train boarding, comfortable seating, and scenic cable cars accessible for all ages."
      }
    ],
    packageCount: 2,
    popularFor: ["Alpine Mountains", "Scenic Train Journeys", "Honeymoon", "Lakes & Waterfalls"]
  },
  {
    id: "dest-bali",
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    tagline: "Island of the Gods, sacred temples, and tropical soul",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    isInternational: true,
    bestTimeToVisit: "April to October (Dry, sunny, and pleasant breezes)",
    idealDuration: "5 to 7 Days",
    currency: "Indonesian Rupiah (IDR)",
    visaInfo: {
      type: "Visa On Arrival (VoA) / e-VoA for Indian Citizens (30 Days)",
      processingTime: "Instant on Arrival or 48 hours online",
      note: "Fee is approximately USD 35 / IDR 500,000.",
      lastUpdated: "Updated 2026"
    },
    overview: "Bali is steeped in spiritual serenity, dramatic volcanic landscapes, terraced emerald rice fields, and vibrant beachfront nightlife. Whether swinging above Ubud's palm forests, discovering the sea temples of Tanah Lot and Uluwatu, or swimming in private pool villas, Bali enchants every visitor.",
    topAttractions: [
      {
        name: "Ubud Rice Terraces & Jungle Swings",
        description: "Iconic multi-tiered rice paddies and adrenaline-fueled photo swings over forest valleys.",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Nusa Penida Kelingking T-Rex Cliff",
        description: "Breathtaking coastal headland shaped like a Tyrannosaurus Rex overlooking turquoise waters.",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Uluwatu Sunset Temple & Fire Dance",
        description: "Clifftop temple 70 meters above crashing waves hosting the mesmerizing Kecak Fire Dance.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80"
      }
    ],
    travelTips: [
      "Spend at least 2 nights in Ubud for cultural tranquility and 2 nights in Seminyak for beaches and dining.",
      "Dress respectfully when visiting Hindu temples (sarongs are provided or required).",
      "Try the iconic Bali Floating Breakfast in your private villa."
    ],
    faqs: [
      {
        question: "Can we get Indian food in Bali?",
        answer: "Yes, Seminyak, Kuta, Ubud, and Nusa Dua have numerous celebrated Indian restaurants serving North and South Indian vegetarian fare."
      }
    ],
    packageCount: 4,
    popularFor: ["Private Pool Villas", "Culture & Temples", "Beaches & Sunsets", "Affordable Luxury"]
  },
  {
    id: "dest-dubai",
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "Futuristic architecture, desert thrills and golden luxury",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    isInternational: true,
    bestTimeToVisit: "October to April (Comfortable sunny weather)",
    idealDuration: "4 to 6 Days",
    currency: "United Arab Emirates Dirham (AED)",
    visaInfo: {
      type: "Tourist eVisa (30 Days / 60 Days)",
      processingTime: "3 to 4 working days",
      note: "VK Vacations handles the end-to-end paperless visa application with passport scans.",
      lastUpdated: "Updated 2026"
    },
    overview: "Dubai is the jewel of the Middle East — a dazzling oasis where ultramodern skyscrapers pierce the sky next to ancient desert sand dunes. From the dizzying height of Burj Khalifa to mega shopping malls, indoor theme parks, and thrilling desert safaris, Dubai delivers endless entertainment.",
    topAttractions: [
      {
        name: "Burj Khalifa 124th & 125th Floor",
        description: "The world's tallest building with high-speed elevators reaching panoramic observation decks.",
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Red Dune Desert Safari & BBQ Camp",
        description: "4x4 Land Cruiser dune bashing, camel rides, quad biking, and fire shows under the stars.",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Museum of the Future",
        description: "An architectural marvel inscribed with Arabic calligraphy exploring life in the year 2071.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
      }
    ],
    travelTips: [
      "Book Burj Khalifa sunset slots in advance to catch daytime, sunset, and night lights together.",
      "The Dubai Metro is clean, air-conditioned, and connects major attractions efficiently.",
      "Bargain politely at Deira Gold Souk and Spice Souk."
    ],
    faqs: [
      {
        question: "Is Dubai safe for solo women and family travelers?",
        answer: "Dubai is officially ranked among the safest cities in the world with strict laws and exceptional emergency services."
      }
    ],
    packageCount: 5,
    popularFor: ["Skyline & Architecture", "Desert Safari", "Luxury Shopping", "Family Theme Parks"]
  },
  {
    id: "dest-kashmir",
    slug: "kashmir",
    name: "Kashmir",
    country: "India",
    tagline: "The crown of India with snow peaks, houseboats and valleys",
    heroImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
    isInternational: false,
    region: "North India",
    bestTimeToVisit: "March to October (Blooming Flowers & Valleys) | Dec to Feb (Snow & Skiing)",
    idealDuration: "5 to 7 Days",
    currency: "Indian Rupee (INR)",
    overview: "Rightfully known as Jannat-e-Kashmir, this crown of the Indian subcontinent boasts serene Dal Lake houseboats, the meadows of Gulmarg, the pine-clad river banks of Pahalgam, and the dramatic mountain passes of Sonamarg.",
    topAttractions: [
      {
        name: "Dal Lake & Shikara Serenade",
        description: "Glide gently past floating flower markets, wooden carved houseboats, and mountain reflections.",
        image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Gulmarg Gondola & Apharwat Peak",
        description: "Ascend over pine canopies to 14,000 feet for snow sports and Himalayan panoramas.",
        image: "https://images.unsplash.com/photo-1626014303757-64665427d142?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Betaab & Aru Valleys, Pahalgam",
        description: "Postcard meadows where crystal streams flow through sheep pastures and spruce woods.",
        image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80"
      }
    ],
    travelTips: [
      "Book Gulmarg Gondola Phase 1 & 2 tickets well in advance as daily slots sell out fast.",
      "Sip authentic Kashmiri Kahwa tea infused with saffron and almonds.",
      "Bring post-paid SIM cards as pre-paid SIMs from outside J&K do not work in the valley."
    ],
    faqs: [
      {
        question: "Is Kashmir safe for tourists?",
        answer: "Yes, tourism areas (Srinagar, Gulmarg, Pahalgam, Sonamarg) are welcoming, vibrant, and well-guarded with hundreds of thousands of Indian families visiting peacefully every year."
      }
    ],
    packageCount: 3,
    popularFor: ["Snow & Mountains", "Houseboat Stay", "Honeymoon", "Lakes & Valleys"]
  },
  {
    id: "dest-kerala",
    slug: "kerala",
    name: "Kerala",
    country: "India",
    tagline: "God's Own Country: tea hills, backwaters and coastal spices",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    isInternational: false,
    region: "South India",
    bestTimeToVisit: "September to March (Pleasant hills and backwaters)",
    idealDuration: "5 to 7 Days",
    currency: "Indian Rupee (INR)",
    overview: "Kerala is a tropical paradise defined by palm-fringed backwaters, rolling emerald tea estates in Munnar, aromatic spice hills in Thekkady, and ancient Ayurvedic wellness traditions.",
    topAttractions: [
      {
        name: "Alleppey Houseboat Cruise",
        description: "Drift along serene lagoons and coconut groves on a handcrafted wooden Kettuvallam.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Munnar Tea Plantations & Eravikulam",
        description: "Mist-covered rolling hills home to the endangered Nilgiri Tahr mountain goat.",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Fort Kochi Heritage & Chinese Nets",
        description: "Colonial Portuguese, Dutch and British mansions alongside cantilevered fishing nets.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      }
    ],
    travelTips: [
      "Taste fresh Karimeen Pollichathu (pearl spot fish wrapped in banana leaf) on the houseboat.",
      "Experience an authentic 60-minute Ayurvedic Abhyanga oil massage at an authorized center."
    ],
    faqs: [
      {
        question: "What is the best route for a 6-day Kerala trip?",
        answer: "Cochin arrival -> Munnar (2N) -> Thekkady (1N) -> Alleppey Houseboat (1N) -> Cochin departure is the most popular and scenic route."
      }
    ],
    packageCount: 4,
    popularFor: ["Houseboats", "Tea Gardens", "Ayurvedic Wellness", "Family Vacations"]
  },
  {
    id: "dest-singapore",
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    tagline: "The Lion City of tomorrow with green innovation and entertainment",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    isInternational: true,
    bestTimeToVisit: "Year-Round (Pleasant tropical weather with occasional afternoon showers)",
    idealDuration: "4 to 5 Days",
    currency: "Singapore Dollar (SGD)",
    visaInfo: {
      type: "Singapore Tourist eVisa (30 Days Multiple Entry)",
      processingTime: "3 to 5 working days",
      note: "VK Vacations is an authorized visa submission partner.",
      lastUpdated: "Updated 2026"
    },
    overview: "A glittering island city-state where nature and cutting-edge technology harmonize. From the breathtaking bio-domes of Gardens by the Bay to the world-class rides of Sentosa and street food hawker centers, Singapore is a dream destination for travelers of all ages.",
    topAttractions: [
      {
        name: "Gardens by the Bay & Supertree Grove",
        description: "Vertical garden towers that come alive at night with a synchronized music and light show.",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Universal Studios Singapore Sentosa",
        description: "Blockbuster film theme park with thrilling rides, live stunt shows, and Hollywood magic.",
        image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=600&q=80"
      }
    ],
    travelTips: [
      "Get an EZ-Link card or use your contactless credit/debit card on MRT and public buses.",
      "Visit Jewel Changi Airport early to witness the 40-meter indoor Rain Vortex."
    ],
    faqs: [
      {
        question: "Is Singapore easy for Indian families?",
        answer: "Extremely easy. Tamil is one of Singapore's 4 official languages, signage is multilingual, and Little India offers hundreds of authentic vegetarian and South Indian restaurants."
      }
    ],
    packageCount: 3,
    popularFor: ["Family Holiday", "Theme Parks", "Futuristic Architecture", "Shopping"]
  },
  {
    id: "dest-rajasthan",
    slug: "rajasthan",
    name: "Rajasthan",
    country: "India",
    tagline: "The royal realm of maharajas, desert castles and vibrant culture",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
    cardImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    isInternational: false,
    region: "West India",
    bestTimeToVisit: "October to March (Pleasant winter days and crisp desert nights)",
    idealDuration: "6 to 8 Days",
    currency: "Indian Rupee (INR)",
    overview: "Step back into the chivalric era of warrior kings and maharanis. Rajasthan dazzles with towering hilltop fortresses, ornate havelis, camel safaris on Thar Desert dunes, and romantic boat rides across Udaipur's Lake Pichola.",
    topAttractions: [
      {
        name: "Amber Fort & Palace, Jaipur",
        description: "Majestic fortress with royal courtyards, mirror mosaics, and sweeping valley ramparts.",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Lake Pichola & City Palace, Udaipur",
        description: "White marble palace floating on mirrored waters surrounded by the Aravalli hills.",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
      }
    ],
    travelTips: [
      "Carry light woolens for winter evenings as desert temperatures drop significantly after sunset.",
      "Shop for authentic Jaipuri quilts, blue pottery, and silver jewelry in verified markets."
    ],
    faqs: [
      {
        question: "Can we experience a stay in an authentic heritage palace?",
        answer: "Yes! VK Vacations partners with authentic havelis and converted royal palaces where you sleep in restored regal chambers."
      }
    ],
    packageCount: 2,
    popularFor: ["Heritage & Palaces", "Royal Luxury", "Desert Camping", "Cultural Cuisine"]
  }
];
