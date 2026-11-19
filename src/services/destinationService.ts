import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';

export const destinationService = {
  getAllDestinations(): Destination[] {
    return DESTINATIONS;
  },

  getDestinationBySlug(slug: string): Destination | undefined {
    return DESTINATIONS.find(d => d.slug === slug);
  },

  getInternationalDestinations(): Destination[] {
    return DESTINATIONS.filter(d => d.isInternational);
  },

  getDomesticDestinations(): Destination[] {
    return DESTINATIONS.filter(d => !d.isInternational);
  }
};
