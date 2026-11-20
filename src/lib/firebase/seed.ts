import { doc, getDoc, serverTimestamp, setDoc, writeBatch, type DocumentData } from 'firebase/firestore';
import { TOUR_PACKAGES } from '../../data/packages';
import { TEMPLE_PACKAGES } from '../../data/templePackages';
import { DESTINATIONS } from '../../data/destinations';
import { SCHEDULED_DEPARTURES } from '../../data/departures';
import { SEED_BANNERS, SEED_SEO } from '../../data/cms';
import { auth, db } from './client';
import { COLLECTIONS, CONTENT_META_DOC } from './collections';
import { reportDbError } from './events';

type Seedable = { id?: string; isActive?: boolean; order?: number };

interface SeedSet {
  collection: string;
  items: readonly Seedable[];
  /** Hide-from-public flag the Firestore rules query on. */
  gated: boolean;
}

const SEED_SETS: SeedSet[] = [
  { collection: COLLECTIONS.packages, items: TOUR_PACKAGES, gated: true },
  { collection: COLLECTIONS.templePackages, items: TEMPLE_PACKAGES, gated: true },
  { collection: COLLECTIONS.destinations, items: DESTINATIONS, gated: true },
  { collection: COLLECTIONS.departures, items: SCHEDULED_DEPARTURES, gated: false },
  { collection: COLLECTIONS.banners, items: SEED_BANNERS, gated: false },
  { collection: COLLECTIONS.seo, items: SEED_SEO, gated: false },
];

const BATCH_SIZE = 100;
let seeding: Promise<void> | null = null;

/**
 * One-time bootstrap: copies the bundled site content (packages, destinations,
 * departures, banners, SEO) into Firestore so the admin console can edit it.
 * Idempotent and safe to call on every admin sign-in; it only writes when
 * `meta/content` does not exist yet. Operational data (customers, bookings, ...)
 * is never seeded: production starts clean.
 */
export function ensureContentSeeded(): Promise<void> {
  if (seeding) return seeding;

  seeding = (async () => {
    const metaRef = doc(db, COLLECTIONS.meta, CONTENT_META_DOC);
    if ((await getDoc(metaRef)).exists()) return;

    const base = Date.now();
    const writes: { path: [string, string]; data: DocumentData }[] = [];

    for (const set of SEED_SETS) {
      set.items.forEach((item, index) => {
        if (!item.id) return;
        const { id, ...rest } = item as Seedable & Record<string, unknown>;
        writes.push({
          path: [set.collection, id as string],
          data: {
            ...rest,
            ...(set.gated ? { isActive: item.isActive ?? true } : {}),
            order: item.order ?? index,
            createdAtMs: base - index,
          },
        });
      });
    }

    for (let i = 0; i < writes.length; i += BATCH_SIZE) {
      const batch = writeBatch(db);
      for (const { path, data } of writes.slice(i, i + BATCH_SIZE)) {
        batch.set(doc(db, path[0], path[1]), data);
      }
      await batch.commit();
    }

    // Written last: a half-finished seed is retried on the next sign-in.
    await setDoc(metaRef, {
      seededAt: serverTimestamp(),
      seededBy: auth.currentUser?.uid ?? null,
      documents: writes.length,
      version: 1,
    });
  })().catch((err) => {
    seeding = null; // allow a retry
    reportDbError('seed site content', err);
  });

  return seeding;
}
