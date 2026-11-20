import { useMemo, useSyncExternalStore } from 'react';
import type { DepartureRecord, Destination, TemplePackage, TourPackage } from '../types';
import { subscribeDb } from '../lib/firebase/events';
import type { CollectionStore } from '../lib/firebase/store';
import { stores } from '../lib/firebase/stores';

/**
 * Live website content. Re-renders when Firestore data changes, and shows the
 * bundled content until Firestore is ready, so the site is never empty.
 * Drafts (`isActive === false`) are hidden from visitors.
 */
function useStore<T extends { id: string }>(store: CollectionStore<T>): readonly T[] {
  return useSyncExternalStore(subscribeDb, () => store.snapshot(), () => store.snapshot());
}

const isLive = (item: { isActive?: boolean }): boolean => item.isActive !== false;

export function usePackages(): TourPackage[] {
  const all = useStore(stores.packages);
  return useMemo(() => all.filter(isLive), [all]);
}

export function useTemplePackages(): TemplePackage[] {
  const all = useStore(stores.templePackages);
  return useMemo(() => all.filter(isLive), [all]);
}

export function useDestinations(): Destination[] {
  const all = useStore(stores.destinations);
  return useMemo(() => all.filter(isLive), [all]);
}

export function useDepartures(): DepartureRecord[] {
  return useStore(stores.departures) as DepartureRecord[];
}
