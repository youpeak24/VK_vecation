import { TemplePackage } from '../types';

export const TEMPLE_PACKAGES: TemplePackage[] = [
  {
    id: "tmpl-arupadai-veedu",
    slug: "arupadai-veedu-murugan-temples",
    title: "Arupadai Veedu: The 6 Holy Abodes of Lord Murugan",
    subtitle: "Tiruttani, Swamimalai, Palani, Thiruparankundram, Pazhamudircholai & Thiruchendur",
    deity: "Lord Murugan",
    primaryTemple: "Thiruchendur Murugan Temple & Palani Murugan Temple",
    circuit: "Arupadai Veedu Sacred Circuit",
    state: "Tamil Nadu",
    startingPrice: 24500,
    duration: { days: 6, nights: 5 },
    featuredImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    overview: "Embark on Tamil Nadu's most revered pilgrimage honoring Lord Murugan across all his six divine abodes (Arupadai Veedu). From the hilltop of Tiruttani where the Lord rested after vanquishing Surapadman to the seashore shrine of Thiruchendur and Palani Dhandayuthapani temple, this spiritual journey cleanses the soul with traditional South Indian hospitality.",
    templesCovered: [
      "Thiruttani Murugan Temple",
      "Swamimalai Swaminatha Swamy Temple",
      "Palani Dhandayuthapani Swamy Temple",
      "Thiruparankundram Murugan Temple",
      "Pazhamudircholai Solaimalai Murugan",
      "Thiruchendur Subramanya Swamy Temple (Sea shore)"
    ],
    darshanTypes: ["VIP Special Entry Darshan", "Morning Viswaroopa Seva", "Panchamirtham Prasadam Ticket"],
    highlights: [
      "Special VIP Darshan tickets included for quick queuing",
      "Palani Winch / Rope Car ticket to hilltop shrine",
      "Holy sea bath & cleansing rituals at Thiruchendur",
      "Pure vegetarian South Indian Satvik meals throughout",
      "Chauffeured AC Coach/Innova with devotional audio and knowledgeable tour guide"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai Departure to Tiruttani & Drive to Kumbakonam",
        location: "Tiruttani & Swamimalai",
        description: "Early morning start from Chennai. Visit Tiruttani Murugan Temple (5th abode) climbing the 365 steps or road transit. Afternoon drive to Swamimalai (4th abode) near Kumbakonam where the son preached Pranava Mantra 'OM' to his father Shiva.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Tiruttani Darshan", "Swamimalai Darshan", "Kumbakonam stay"]
      },
      {
        day: 2,
        title: "Kumbakonam to Palani Hilltop",
        location: "Palani",
        description: "Morning pooja at Swamimalai. Scenic drive through fertile Kaveri delta plains to Palani (3rd abode). Ascend via the ropeway or winch. Witness Lord Dhandayuthapani adorned in sandalwood paste.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Rope car to Palani hill", "Abhishekam Darshan", "Palani Panchamirtham"]
      },
      {
        day: 3,
        title: "Palani to Madurai — Thiruparankundram & Pazhamudircholai",
        location: "Madurai",
        description: "Travel to Madurai. Visit Thiruparankundram (1st abode), the rock-cut cave temple where Murugan married Deivanai. Continue to Pazhamudircholai (6th abode) atop lush Alagar hills.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Thiruparankundram Cave Temple", "Pazhamudircholai Solaimalai", "Alagar Kovil"]
      },
      {
        day: 4,
        title: "Madurai Meenakshi Amman Darshan & Drive to Thiruchendur",
        location: "Madurai & Thiruchendur",
        description: "Early morning darshan at world-renowned Madurai Meenakshi Amman Temple. Drive through palm groves to coastal Thiruchendur (2nd abode) situated directly on the Bay of Bengal shore.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Meenakshi Amman VIP Darshan", "Thiruchendur seashore arrival"]
      },
      {
        day: 5,
        title: "Thiruchendur Sacred Sea Bath & Sanmugar Darshan",
        location: "Thiruchendur",
        description: "Early morning holy sea dip at Thiruchendur. Attend the auspicious Viswaroopa Darshan and Special Shanmugar Pooja. Evening devotional walk along the temple prakaram with cooling sea breeze.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Holy sea dip", "Viswaroopa Darshan", "Nazhi Kinaru sacred spring"]
      },
      {
        day: 6,
        title: "Thiruchendur to Madurai / Trichy / Chennai Return",
        location: "Homeward Journey",
        description: "Morning prayer and return transfer to Madurai or Trichy Airport/Railway Station, or return drive to Chennai with Murugan's grace.",
        mealsIncluded: ["Breakfast", "Lunch"],
        highlights: ["Homeward journey", "Prasadam distribution"]
      }
    ],
    inclusions: [
      "5 Nights accommodation in clean 3-4 Star AC Hotels",
      "All meals: Authentic South Indian Pure Vegetarian (Breakfast, Lunch, Dinner)",
      "Dedicated AC Private Vehicle (Innova / Tempo Traveller)",
      "VIP Special Darshan tickets across all 6 abodes",
      "Palani Rope car/Winch ticket",
      "Driver beta, fuel, toll, and parking charges",
      "Experienced devotee tour escort"
    ],
    exclusions: [
      "Personal pooja tickets, archanai, and tonsure (Mottai) fees",
      "Train or Flight fare to/from reporting cities"
    ],
    departureCities: ["Chennai", "Bangalore", "Coimbatore", "Madurai", "Trichy"],
    badge: "Most Sacred Pilgrimage",
    rating: 4.97,
    reviewCount: 480,
    isActive: true
  },
  {
    id: "tmpl-pancha-bhoota",
    slug: "pancha-bhoota-stalam-shiva-circuit",
    title: "Pancha Bhoota Stalam: 5 Elemental Shiva Temples",
    subtitle: "Chidambaram (Space), Sri Kalahasti (Air), Tiruvannamalai (Fire), Thiruvanaikaval (Water) & Kanchipuram (Earth)",
    deity: "Lord Shiva",
    primaryTemple: "Chidambaram Nataraja & Tiruvannamalai Annamalaiyar",
    circuit: "Pancha Bhoota Sacred Elemental Circuit",
    state: "Tamil Nadu & Andhra Pradesh",
    startingPrice: 21500,
    duration: { days: 5, nights: 4 },
    featuredImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    overview: "A profound spiritual journey through the 5 manifestations of Lord Shiva as the cosmic elements of nature: Earth (Ekambareswarar, Kanchipuram), Water (Jambukeswarar, Thiruvanaikaval), Fire (Annamalaiyar, Tiruvannamalai), Air (Kalahasteeswara, Sri Kalahasti), and Space (Nataraja, Chidambaram).",
    templesCovered: [
      "Ekambareswarar Temple, Kanchipuram (Prithvi - Earth)",
      "Sri Kalahasteeswara Temple, Kalahasti (Vayu - Air)",
      "Annamalaiyar Temple, Tiruvannamalai (Agni - Fire)",
      "Jambukeswarar Temple, Trichy (Appu - Water)",
      "Thillai Nataraja Temple, Chidambaram (Akasha - Space)"
    ],
    darshanTypes: ["Special Entry Darshan", "Rahu Ketu Pooja Assistance (Kalahasti)", "Nataraja Chidambara Rahasya Darshan"],
    highlights: [
      "Witnessing the sacred underground spring at Jambukeswarar temple",
      "Tiruvannamalai Girivalam path & Arunachala ashram visit",
      "Secret Chidambara Rahasyam curtain opening ceremony",
      "Kanchipuram silk weaving demonstration and temple heritage",
      "Pure Satvik vegetarian catering throughout the circuit"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai to Sri Kalahasti (Vayu) & Kanchipuram (Prithvi)",
        location: "Kalahasti & Kanchipuram",
        description: "Pickup from Chennai. Drive to Sri Kalahasti for Air Lingam darshan where the oil lamp flickers with no breeze. Afternoon visit Kanchipuram Ekambareswarar Temple with its 3,500-year-old mango tree.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Sri Kalahasti Vayu Lingam", "Kanchi Ekambareswarar Prithvi Lingam"]
      },
      {
        day: 2,
        title: "Kanchipuram to Tiruvannamalai (Agni Stalam)",
        location: "Tiruvannamalai",
        description: "Drive to the mystical holy mountain of Arunachala. Darshan of the massive Annamalaiyar Temple complex with its soaring 66-meter gopurams. Evening peaceful walk around Sri Ramana Maharshi Ashram.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Annamalaiyar Agni Lingam", "Ramana Maharshi Ashram", "Arunachala mountain view"]
      },
      {
        day: 3,
        title: "Tiruvannamalai to Chidambaram (Akasha Stalam)",
        location: "Chidambaram",
        description: "Drive to Chidambaram. Experience Thillai Nataraja Temple where Shiva is worshipped in three forms: physical murti, ruby Nataraja, and formless space (Chidambara Rahasyam). Attend the dramatic evening pooja.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Chidambaram Nataraja", "Chidambara Rahasyam", "Spatika Lingam Abhishekam"]
      },
      {
        day: 4,
        title: "Chidambaram to Thiruvanaikaval (Appu Stalam) & Srirangam",
        location: "Trichy",
        description: "Proceed to Trichy. Darshan of Jambukeswarar Temple where the Shiva Lingam is submerged in natural subterranean spring water representing the Water element. Evening darshan at Srirangam Ranganathaswamy Temple.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Jambukeswarar Water Lingam", "Srirangam Temple", "Rockfort Temple"]
      },
      {
        day: 5,
        title: "Trichy to Chennai Return",
        location: "Return",
        description: "Morning prayers, breakfast, and return journey to Chennai or drop-off at Trichy Airport.",
        mealsIncluded: ["Breakfast", "Lunch"],
        highlights: ["Blessings of the 5 elements", "Airport/Station drop"]
      }
    ],
    inclusions: [
      "4 Nights accommodation in quality pilgrim hotels",
      "Pure Vegetarian South Indian meals",
      "Private AC transport with knowledgeable driver",
      "Special darshan ticket coordination",
      "All toll, parking, and driver allowances"
    ],
    exclusions: [
      "Special Rahu Ketu Pooja tickets at Kalahasti (~₹500 to ₹2500)",
      "Personal archana, camera permits"
    ],
    departureCities: ["Chennai", "Bangalore", "Vellore", "Tirupati"],
    badge: "Elemental Cosmic Circuit",
    rating: 4.95,
    reviewCount: 395,
    isActive: true
  },
  {
    id: "tmpl-navagraha-circuit",
    slug: "navagraha-temples-kumbakonam",
    title: "Navagraha Temples: 9 Planetary Shrines of Kumbakonam",
    subtitle: "Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu & Ketu in 3 Days",
    deity: "Navagraha Devatas & Lord Shiva",
    primaryTemple: "Suryanar Koil & Thirunallar Saniswaran Temple",
    circuit: "Navagraha Planetary Circuit",
    state: "Tamil Nadu",
    startingPrice: 16500,
    duration: { days: 3, nights: 2 },
    featuredImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    overview: "Neutralize planetary doshas and seek cosmic harmony across the 9 ancient Chola-era Navagraha temples surrounding Kumbakonam and Mayiladuthurai. Perfectly timed itinerary allowing peaceful poojas and pariharam rituals.",
    templesCovered: [
      "Suryanar Koil (Sun)",
      "Thingaloor Kailasanathar (Moon)",
      "Vaitheeswaran Koil (Mars / Sevvai)",
      "Thiruvenkadu Swetharanyeswarar (Mercury / Budhan)",
      "Alangudi Apatsahayeswarar (Jupiter / Guru)",
      "Kanjanur Agneeswarar (Venus / Sukran)",
      "Thirunallar Darbaranyeswarar (Saturn / Sani)",
      "Thirunageswaram Naganathar (Rahu)",
      "Keezhperumpallam Naganathar (Ketu)"
    ],
    darshanTypes: ["Parihara Pooja Assistance", "Nallennai Deepam (Thirunallar)", "Special Entry Darshan"],
    highlights: [
      "All 9 planetary temples visited in optimal astrological sequence",
      "Gingelly oil lamp offering at Thirunallar Saneeswaran shrine",
      "Milk abhishekam at Thirunageswaram where milk turns blue over Rahu",
      "Kumbakonam traditional degree coffee and Thanjavur art stop",
      "Pure Satvik vegetarian dining"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chennai/Trichy to Thingaloor (Moon), Alangudi (Guru) & Thirunageswaram (Rahu)",
        location: "Kumbakonam",
        description: "Morning departure. Arrive in Kumbakonam area. Visit Thingaloor (Chandran), Alangudi (Guru Bhagavan), and Thirunageswaram (Rahu Stalam) for milk abhishekam.",
        mealsIncluded: ["Lunch", "Dinner"],
        highlights: ["Thingaloor Chandran", "Alangudi Guru", "Thirunageswaram Rahu"]
      },
      {
        day: 2,
        title: "Suryanar (Sun), Kanjanur (Sukran), Vaitheeswaran (Mars) & Thiruvenkadu (Budhan)",
        location: "Mayiladuthurai & Kumbakonam",
        description: "Visit Suryanar Koil (Suriyan), Kanjanur (Sukran), Vaitheeswaran Koil (Angaragan / Sevvai), and Thiruvenkadu (Budhan). Attend special evening prayers.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Suryanar Koil", "Kanjanur Sukran", "Vaitheeswaran Koil", "Thiruvenkadu"]
      },
      {
        day: 3,
        title: "Keezhperumpallam (Ketu) & Thirunallar (Sani) — Homeward Return",
        location: "Thirunallar & Return",
        description: "Visit Keezhperumpallam (Ketu). Continue to Thirunallar for Darbaranyeswarar and Saneeswaran darshan with Nala Theertham holy dip. Return journey.",
        mealsIncluded: ["Breakfast", "Lunch"],
        highlights: ["Keezhperumpallam Ketu", "Thirunallar Saniswaran", "Nala Theertham"]
      }
    ],
    inclusions: [
      "2 Nights AC Hotel stay in Kumbakonam / Mayiladuthurai",
      "All pure vegetarian South Indian meals",
      "AC Vehicle with knowledgeable devotional driver",
      "Temple sequence coordination",
      "All road taxes and tolls"
    ],
    exclusions: ["Special pooja and pariharam archana tokens"],
    departureCities: ["Chennai", "Trichy", "Coimbatore", "Bangalore"],
    badge: "Navagraha Pariharam",
    rating: 4.96,
    reviewCount: 320,
    isActive: true
  },
  {
    id: "tmpl-rameshwaram-madurai",
    slug: "rameshwaram-madurai-kanyakumari-yatra",
    title: "Rameshwaram, Madurai & Kanyakumari Pilgrimage",
    subtitle: "22 Holy Teerthams, Meenakshi Amman & Triveni Sangam Sunrise",
    deity: "Lord Shiva, Goddess Meenakshi, Goddess Bhagavati",
    primaryTemple: "Rameshwaram Ramanathaswamy & Madurai Meenakshi",
    circuit: "Southern Sacred Triangle",
    state: "Tamil Nadu",
    startingPrice: 19500,
    duration: { days: 5, nights: 4 },
    featuredImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    overview: "The most sacred journey of Southern India. Bathe in the 22 holy teerthams inside the majestic 1,200-pillar corridor of Ramanathaswamy Temple in Rameshwaram, marvel at the vibrant gopurams of Madurai Meenakshi, visit the ghost town of Dhanushkodi where Ram Setu begins, and witness the confluence of three oceans at Kanyakumari.",
    templesCovered: [
      "Ramanathaswamy Jyotirlinga Temple, Rameshwaram",
      "Kothandaramaswamy Temple, Dhanushkodi",
      "Meenakshi Sundareswarar Temple, Madurai",
      "Bhagavati Amman Temple, Kanyakumari",
      "Suchindram Thanumalayan Temple (Trinity shrine)"
    ],
    darshanTypes: ["22 Teertham Holy Bath Guide", "VIP Meenakshi Darshan", "Spatika Lingam Morning Darshan"],
    highlights: [
      "Assisted holy bath at all 22 wells inside Rameshwaram Temple",
      "4x4 Jeep/Bus ride to Dhanushkodi and Ram Setu point",
      "Scenic train or cab ride across Pamban Sea Bridge",
      "Sunrise and Sunset at Kanyakumari Triveni Sangam",
      "Suchindram unique temple where Shiva, Vishnu and Brahma are one"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive in Madurai — The Temple City",
        location: "Madurai",
        description: "Pickup from Madurai. Check in to hotel. Evening darshan at Meenakshi Amman Temple. Experience the magnificent musical pillar hall and Thousand Pillar Mandapam.",
        mealsIncluded: ["Lunch", "Dinner"],
        highlights: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Mahal"]
      },
      {
        day: 2,
        title: "Madurai to Rameshwaram via Pamban Bridge",
        location: "Rameshwaram",
        description: "Drive across the iconic Pamban Sea Bridge into Pamban Island. Check in to hotel. Visit Agni Teertham sea shore, Ramar Patham, and Panchamukhi Hanuman Temple.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Pamban Sea Bridge", "Agni Teertham", "Panchamukhi Hanuman"]
      },
      {
        day: 3,
        title: "Rameshwaram 22 Teertham Bath & Dhanushkodi",
        location: "Rameshwaram & Dhanushkodi",
        description: "Early morning bath in 22 sacred teertham wells followed by Spatika Lingam darshan. Afternoon visit to Dhanushkodi ghost town, Vibhishan temple, and the vantage point of Adam's Bridge (Ram Setu).",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["22 Teertham Bath", "Dhanushkodi Ram Setu", "Ramanathaswamy corridor"]
      },
      {
        day: 4,
        title: "Rameshwaram to Kanyakumari via Suchindram",
        location: "Kanyakumari",
        description: "Drive along coastal Tamil Nadu to Kanyakumari. En route visit Suchindram Thanumalayan Temple. Evening watch spectacular sunset over the confluence of Indian Ocean, Arabian Sea, and Bay of Bengal.",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Suchindram Temple", "Kanyakumari Sunset", "Triveni Sangam"]
      },
      {
        day: 5,
        title: "Kanyakumari Sunrise, Vivekananda Rock & Departure",
        location: "Kanyakumari / Trivandrum",
        description: "Witness glorious sunrise over the ocean. Ferry ride to Vivekananda Rock Memorial and Thiruvalluvar Statue. Drop-off at Trivandrum or Madurai Airport/Railway station.",
        mealsIncluded: ["Breakfast", "Lunch"],
        highlights: ["Triveni Sunrise", "Vivekananda Rock Memorial", "Airport drop"]
      }
    ],
    inclusions: [
      "4 Nights in 3-4 Star AC Hotels",
      "Pure Vegetarian South Indian meals",
      "Chauffeured AC Cab (Innova/Sedan)",
      "22 Teertham bath entry permits & guide",
      "Vivekananda Rock ferry ticket",
      "All tolls, parking, and driver allowances"
    ],
    exclusions: ["Personal poojas, boat rides at Dhanushkodi"],
    departureCities: ["Chennai", "Bangalore", "Madurai", "Coimbatore", "Trichy"],
    badge: "South India Spiritual Classic",
    rating: 4.98,
    reviewCount: 520,
    isActive: true
  }
];
