import { TOUR_PACKAGES } from '../data/packages';
import { TEMPLE_PACKAGES } from '../data/templePackages';
import { COMPANY } from '../data/company';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedPackages?: Array<{
    title: string;
    slug: string;
    price: number;
    duration: string;
    image: string;
    isTemple?: boolean;
  }>;
}

// Never hardcode keys in source. Set VITE_GROQ_API_KEY in .env.local / Vercel env vars.
// NOTE: any VITE_* value is visible in the browser bundle; see README ("Securing the AI chatbot").
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

// Model configuration with automatic fallback
const PRIMARY_MODEL = import.meta.env.VITE_GROQ_PRIMARY_MODEL || 'openai/gpt-oss-120b';
const FALLBACK_MODEL = import.meta.env.VITE_GROQ_FALLBACK_MODEL || 'qwen/qwen3.8-27b';

// System knowledge base for VK Vacations
const SYSTEM_PROMPT = `You are "VK AI Concierge", the official luxury travel consultant for VK VACATIONS (vkvacations.in).

BRAND IDENTITY:
- Company: VK Vacations
- Tagline: "Explore More. Experience Beyond."
- Secondary Tagline: "Your Journey. Our Passion."
- Phone & WhatsApp: ${COMPANY.phone}
- Email: ${COMPANY.email}
- Headquarters: ${COMPANY.address.line1}, ${COMPANY.address.city}, ${COMPANY.address.state} - ${COMPANY.address.pincode}, India.
- Operating Hours: ${COMPANY.businessHours}

CORE CAPABILITIES & PACKAGES:
1. Kashmir Paradise on Earth: 6D/5N from ₹28,500 (Srinagar, Gulmarg Gondola, Pahalgam, Dal Lake Houseboat stay)
2. Kerala God's Own Country: 5D/4N from ₹22,000 (Munnar tea hills, Alleppey backwaters luxury houseboat, Thekkady)
3. Dubai Luxury Extravaganza: 5D/4N from ₹45,000 (Burj Khalifa 124th floor, Desert Safari BBQ, Marina luxury yacht)
4. Bali Tropical Paradise: 6D/5N from ₹38,000 (Private pool villa, Ubud jungle swing, Nusa Penida island, Seminyak)
5. Magical Maldives Water Villa: 4D/3N from ₹68,000 (All-inclusive overwater lagoon villa, speedboat transfers)
6. Switzerland & Paris European Grand Tour: 8D/7N from ₹1,65,000 (Jungfraujoch Top of Europe, Mt. Titlis, Eiffel Tower, Seine cruise)
7. Singapore Sentosa Future City: 5D/4N from ₹42,000 (Universal Studios, Gardens by the Bay, Marina Bay Sands)
8. Royal Rajasthan Forts & Palaces: 7D/6N from ₹29,500 (Jaipur Amber Fort, Jodhpur Mehrangarh, Udaipur Lake Pichola)
9. Andaman Exotic Islands: 6D/5N from ₹32,000 (Havelock Radhanagar Beach, Elephant Beach snorkeling, Cellular Jail)
10. Ooty & Kodaikanal Hills: 5D/4N from ₹18,500 (Nilgiri Mountain Railway, Botanical gardens, Pine forests)

SACRED SOUTH INDIAN TEMPLE CIRCUITS (Specialty):
1. Arupadai Veedu Murugan Yatra: 6 Abodes (Tiruttani, Swamimalai, Palani, Thiruparankundram, Pazhamudircholai, Tiruchendur) with VIP Darshan & Satvik meals.
2. Navagraha Temples Kumbakonam: Complete 9 planetary shrines with certified priests and pre-booked puja.
3. Pancha Bhoota Stalam: 5 Elemental Shiva shrines (Chidambaram, Kanchipuram, Tiruvannamalai, Kalahasti, Tiruvanaikaval).
4. Rameshwaram, Madurai & Kanyakumari: 22 Holy Theertham baths, Meenakshi Amman Temple, Vivekananda Rock.

SERVICES PROVIDED:
- 100% Customized private holiday packages tailored to family, couple, senior citizen, or corporate requirements.
- Flight bookings, visa assistance (Schengen, UAE, Singapore, Indonesia), travel insurance, verified 4-star/5-star hotels.
- South Indian vegetarian & Jain meals care on all tours.
- 24/7 dedicated travel concierge desk throughout the journey.

RESPONSE GUIDELINES:
- Greet warmly ("Namaste! Welcome to VK Vacations" or similar cordial tone).
- Be polite, knowledgeable, structured, and helpful.
- Keep responses concise (2 to 4 paragraphs max) so users can easily read on mobile or desktop.
- Use markdown formatting with bullet points and friendly travel emojis (🏖️, ✈️, 🕉️, 🏔️).
- Invite the user to customize their trip, call our helpline (+91 9384957775), or click to view packages.
- Always recommend relevant packages from our list when users inquire about destinations or budgets.`;

/**
 * Intelligent helper to extract package recommendations from user inquiry or AI text
 */
export function detectRecommendedPackages(query: string, responseText: string) {
  const combined = (query + ' ' + responseText).toLowerCase();
  const recommendations: ChatMessage['recommendedPackages'] = [];

  // Match Tour Packages
  for (const pkg of TOUR_PACKAGES) {
    const dest = pkg.destination.toLowerCase();
    const title = pkg.title.toLowerCase();
    if (combined.includes(dest) || combined.includes(title.slice(0, 8))) {
      recommendations.push({
        title: pkg.title,
        slug: `/packages/${pkg.slug}`,
        price: pkg.startingPrice,
        duration: `${pkg.duration.days}D / ${pkg.duration.nights}N`,
        image: pkg.featuredImage,
        isTemple: false
      });
      if (recommendations.length >= 2) break;
    }
  }

  // Match Temple Packages
  if (recommendations.length < 2) {
    for (const tp of TEMPLE_PACKAGES) {
      const title = tp.title.toLowerCase();
      const circuit = tp.circuit.toLowerCase();
      if (combined.includes('temple') || combined.includes('pilgrim') || combined.includes('darshan') || combined.includes(circuit.slice(0, 6)) || combined.includes('murugan') || combined.includes('shiva')) {
        recommendations.push({
          title: tp.title,
          slug: `/temple-tours/${tp.slug}`,
          price: tp.startingPrice,
          duration: `${tp.duration.days}D / ${tp.duration.nights}N`,
          image: tp.featuredImage,
          isTemple: true
        });
        break;
      }
    }
  }

  return recommendations.length > 0 ? recommendations : undefined;
}

/**
 * Sends chat message to Groq API with automatic fallback
 */
export async function sendChatMessageToGroq(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
): Promise<string> {
  const conversation = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages
  ];

  // Try Primary Model first
  try {
    const res = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: PRIMARY_MODEL,
        messages: conversation,
        max_tokens: 380,
        temperature: 0.65
      })
    });

    if (res.ok) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim().length > 0) {
        return content.trim();
      }
    }
  } catch (err) {
    console.warn('Groq primary model error, trying fallback model...', err);
  }

  // Fallback to Secondary Model
  try {
    const resFallback = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: FALLBACK_MODEL,
        messages: conversation,
        max_tokens: 380,
        temperature: 0.7
      })
    });

    if (resFallback.ok) {
      const data = await resFallback.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim().length > 0) {
        return content.trim();
      }
    }
  } catch (fallbackErr) {
    console.error('Groq fallback model also failed:', fallbackErr);
  }

  // Graceful Offline / Network Resilience Fallback
  return `Namaste! 🙏 Thank you for reaching out to **VK Vacations**! 

We would love to help you plan your dream holiday! Whether you are exploring our **Maldives Overwater Villas**, **Kashmir Paradise**, **Switzerland & Paris Grand Tour**, or our sacred **South Indian Temple Circuits with VIP Darshan**, our travel specialists are ready to curate a bespoke itinerary for you.

📞 **Direct Helpline & WhatsApp:** [${COMPANY.phone}](tel:${COMPANY.phone.replace(/\\s+/g, '')})
🏢 **Chennai Office:** ${COMPANY.address.line1}, ${COMPANY.address.city}

Please feel free to ask about specific destinations, budgets, or family packages!`;
}
