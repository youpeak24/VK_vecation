const DOMAIN = 'https://vkvacations.in';

/**
 * Builds standard Google BreadcrumbList schema
 */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${DOMAIN}${item.url.startsWith('/') ? '' : '/'}${item.url}`
    }))
  };
}

/**
 * Builds TouristTrip & Product schema for Tour Package Details
 * Unlocks Google Rich Snippet Star Ratings, Price Badges & Itinerary Highlights
 */
export function buildPackageSchema(pkg: any, path: string) {
  const url = `${DOMAIN}${path.startsWith('/') ? '' : '/'}${path}`;
  
  const itineraryItems = pkg.itinerary?.map((day: any, idx: number) => ({
    "@type": "ListItem",
    "position": idx + 1,
    "name": `Day ${day.day || idx + 1}: ${day.title}`,
    "description": day.description || day.activities?.join('. ') || ''
  })) || [];

  return {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    "@id": `${url}#tour`,
    "name": pkg.title,
    "description": pkg.overview || pkg.subtitle || pkg.metaDescription || pkg.shortDescription,
    "image": pkg.featuredImage || pkg.heroImage || pkg.image || `${DOMAIN}/android-chrome-512x512.png`,
    "touristType": ["Family", "Couples", "Honeymoon", "Group Travelers"],
    "itinerary": itineraryItems.length > 0 ? {
      "@type": "ItemList",
      "numberOfItems": itineraryItems.length,
      "itemListElement": itineraryItems
    } : undefined,
    "offers": {
      "@type": "Offer",
      "price": pkg.startingPrice || pkg.pricing?.standard || pkg.price || 25000,
      "priceCurrency": "INR",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": url,
      "seller": {
        "@type": "TravelAgency",
        "name": "VK Vacations",
        "url": DOMAIN,
        "telephone": "+91-9384957775"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (pkg.rating || 4.9).toString(),
      "reviewCount": (pkg.reviewsCount || pkg.reviewCount || 120).toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "VK Vacations",
      "url": DOMAIN,
      "telephone": "+91-9384957775"
    }
  };
}

/**
 * Builds TouristTrip schema for Temple Tour Pilgrimage Packages
 */
export function buildTempleTourSchema(tour: any, path: string) {
  const url = `${DOMAIN}${path.startsWith('/') ? '' : '/'}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    "@id": `${url}#temple-trip`,
    "name": tour.title,
    "description": tour.overview || tour.metaDescription || tour.title,
    "image": tour.featuredImage || tour.image || `${DOMAIN}/android-chrome-512x512.png`,
    "touristType": ["Pilgrim", "Family", "Senior Citizens", "Spiritual"],
    "offers": {
      "@type": "Offer",
      "price": tour.startingPrice || tour.pricing?.standard || tour.price || 15000,
      "priceCurrency": "INR",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": url,
      "seller": {
        "@type": "TravelAgency",
        "name": "VK Vacations",
        "url": DOMAIN,
        "telephone": "+91-9384957775"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (tour.rating || 4.9).toString(),
      "reviewCount": (tour.reviewsCount || 95).toString(),
      "bestRating": "5"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "VK Vacations",
      "url": DOMAIN,
      "telephone": "+91-9384957775"
    }
  };
}

/**
 * Builds TouristDestination schema for Destination Detail pages
 */
export function buildDestinationSchema(dest: any, path: string) {
  const url = `${DOMAIN}${path.startsWith('/') ? '' : '/'}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${url}#destination`,
    "name": dest.name || dest.title,
    "description": dest.overview || dest.description || dest.tagline || dest.heroSubtitle,
    "image": dest.heroImage || dest.cardImage || dest.image,
    "touristType": ["International Travelers", "Holiday Seekers", "Couples", "Families"],
    "url": url
  };
}

/**
 * Builds BlogPosting schema for Travel Articles & Guides
 */
export function buildBlogPostSchema(post: any, path: string) {
  const url = `${DOMAIN}${path.startsWith('/') ? '' : '/'}${path}`;
  const authorName = typeof post.author === 'object' && post.author?.name ? post.author.name : (post.author || "VK Vacations Editorial Team");

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    "headline": post.title,
    "description": post.summary || post.excerpt,
    "image": post.coverImage || post.image,
    "datePublished": post.publishedAt || "2026-01-15T09:00:00+05:30",
    "dateModified": post.publishedAt || "2026-11-19T18:00:00+05:30",
    "mainEntityOfPage": url,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "VK Vacations",
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/android-chrome-512x512.png`
      }
    }
  };
}
