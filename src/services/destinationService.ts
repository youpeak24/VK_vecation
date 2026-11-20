import { stores } from '../lib/firebase/stores';
import { Destination } from '../types';

const liveDestinations = (): Destination[] => stores.destinations.snapshot().filter((d) => d.isActive !== false);

export const destinationService = {
  getAllDestinations(): Destination[] {
    return liveDestinations();
  },

  getDestinationBySlug(slug: string): Destination | undefined {
    return liveDestinations().find(d => d.slug === slug);
  },

  getInternationalDestinations(): Destination[] {
    return liveDestinations().filter(d => d.isInternational);
  },

  getDomesticDestinations(): Destination[] {
    return liveDestinations().filter(d => !d.isInternational);
  }
};
