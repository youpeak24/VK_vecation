import { emitDbUpdate } from './events';

/**
 * Whether the site content (packages, destinations, ...) has been seeded into
 * Firestore yet. Until it has, the public site keeps showing the bundled
 * content, so a fresh project never renders an empty website.
 *   null  = unknown (still loading / Firestore unreachable)
 *   false = Firestore reachable, but not seeded yet
 *   true  = Firestore is the source of truth
 */
export const contentState: { seeded: boolean | null } = { seeded: null };

export function setContentSeeded(value: boolean | null): void {
  if (contentState.seeded === value) return;
  contentState.seeded = value;
  emitDbUpdate('meta');
}
