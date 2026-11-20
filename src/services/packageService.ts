import { stores } from '../lib/firebase/stores';
import { TourPackage, PackageCategory } from '../types';

const livePackages = (): TourPackage[] => stores.packages.snapshot().filter((p) => p.isActive !== false);

export const packageService = {
  getAllPackages(): TourPackage[] {
    return livePackages();
  },

  getPackageBySlug(slug: string): TourPackage | undefined {
    return livePackages().find(p => p.slug === slug);
  },

  getRelatedPackages(currentSlug: string, limit = 3): TourPackage[] {
    const current = this.getPackageBySlug(currentSlug);
    if (!current) return livePackages().slice(0, limit);

    return livePackages()
      .filter(p => p.slug !== currentSlug)
      .filter(p => p.isInternational === current.isInternational || p.destination === current.destination)
      .slice(0, limit);
  },

  getPackagesByCategory(category: PackageCategory): TourPackage[] {
    return livePackages().filter(p => p.category.includes(category));
  },

  getIndiaPackages(): TourPackage[] {
    return livePackages().filter(p => !p.isInternational);
  },

  getInternationalPackages(): TourPackage[] {
    return livePackages().filter(p => p.isInternational);
  },

  getHoneymoonPackages(): TourPackage[] {
    return livePackages().filter(p => p.category.includes('Honeymoon'));
  },

  searchPackages(query: {
    destination?: string;
    category?: string;
    maxPrice?: number;
    durationDays?: number;
    region?: string;
  }): TourPackage[] {
    return livePackages().filter(p => {
      if (query.destination && query.destination.trim() !== '') {
        const dest = query.destination.toLowerCase();
        const matchesDest = p.destination.toLowerCase().includes(dest) ||
          p.title.toLowerCase().includes(dest) ||
          p.country.toLowerCase().includes(dest);
        if (!matchesDest) return false;
      }

      if (query.category && query.category !== 'All') {
        if (!p.category.some((c: string) => c.toLowerCase() === query.category?.toLowerCase())) {
          return false;
        }
      }

      if (query.maxPrice && p.startingPrice > query.maxPrice) {
        return false;
      }

      if (query.region && p.region && p.region !== query.region) {
        return false;
      }

      return true;
    });
  }
};
