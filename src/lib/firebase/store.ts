import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
  type CollectionReference,
  type DocumentData,
  type Query,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './client';
import { contentState } from './contentState';
import { emitDbUpdate, reportDbError } from './events';

/** Bookkeeping fields the store adds to every document it writes. */
type Meta = { order?: number; createdAtMs?: number };
type Stored<T> = T & Meta;

export interface StoreOptions<T> {
  /** Firestore collection name. */
  name: string;
  /**
   * 'public': listened to for everyone (website content).
   * 'admin' : only listened to while an authorised admin is signed in.
   */
  scope: 'public' | 'admin';
  /** Visitors may only read documents with `isActive == true` (drafts stay private). */
  gateActive?: boolean;
  /** Bundled content shown until Firestore content is available (public content only). */
  fallback?: () => readonly T[];
  /** Keeps a manual `order` (lower = first) instead of newest-first. */
  ordered?: boolean;
  /** Custom query, e.g. `orderBy` + `limit` for large collections. */
  buildQuery?: (ref: CollectionReference<DocumentData>) => Query<DocumentData>;
}

type ListenMode = 'gated' | 'all';

const TIME_FIELDS = ['createdAtMs', 'submittedAt', 'createdAt', 'timestamp', 'requestedDate', 'issuedDate', 'date', 'joinedDate'];

function timeOf(item: Record<string, unknown>): number {
  for (const field of TIME_FIELDS) {
    const value = item[field];
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = Date.parse(value);
      if (!Number.isNaN(parsed)) return parsed;
    }
  }
  return 0;
}

function compareItems(a: Stored<{ id: string }>, b: Stored<{ id: string }>): number {
  const ao = typeof a.order === 'number' ? a.order : null;
  const bo = typeof b.order === 'number' ? b.order : null;
  if (ao !== null && bo !== null && ao !== bo) return ao - bo;
  if (ao !== null && bo === null) return -1;
  if (ao === null && bo !== null) return 1;
  const diff = timeOf(b as Record<string, unknown>) - timeOf(a as Record<string, unknown>);
  return diff !== 0 ? diff : b.id.localeCompare(a.id);
}

/** Firestore Timestamps -> ISO strings (deep), so documents match the app's plain-JSON types. */
function normalize(value: unknown): unknown {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, normalize(v)]));
  }
  return value;
}

/**
 * A real-time, write-through cache over one Firestore collection.
 *
 *  - Reads are synchronous (`getAll`) and served from memory, so the existing
 *    pages keep working unchanged; data streams in through `onSnapshot`.
 *  - Writes update the cache immediately (optimistic) and are sent to Firestore.
 *    If the server rejects a write, Firestore re-emits the true state and the
 *    UI snaps back automatically.
 *  - Every change fires `vk_db_update` (see events.ts).
 */
export class CollectionStore<T extends { id: string }> {
  readonly name: string;
  private readonly opts: StoreOptions<T>;

  private items: Stored<T>[] = [];
  private loaded = false;
  private unsub: Unsubscribe | null = null;
  private mode: ListenMode | null = null;

  private version = 0;
  private cachedSig = '';
  private cachedView: readonly T[] = [];

  constructor(opts: StoreOptions<T>) {
    this.name = opts.name;
    this.opts = opts;
  }

  // ───────────────────────── reads ─────────────────────────

  /** Stable (referentially) list; use with useSyncExternalStore. */
  snapshot(): readonly T[] {
    const sig = `${this.loaded}|${contentState.seeded}|${this.version}`;
    if (sig !== this.cachedSig) {
      this.cachedSig = sig;
      this.cachedView = this.usingFallback()
        ? this.opts.fallback!()
        : [...this.items].sort(compareItems);
    }
    return this.cachedView;
  }

  /** Fresh copy, safe for callers to sort/mutate. */
  getAll(): T[] {
    return this.snapshot().slice();
  }

  find(id: string): T | undefined {
    return this.snapshot().find((item) => item.id === id);
  }

  get isLoaded(): boolean {
    return this.loaded;
  }

  get scope(): 'public' | 'admin' {
    return this.opts.scope;
  }

  private usingFallback(): boolean {
    return !!this.opts.fallback && (!this.loaded || contentState.seeded !== true);
  }

  // ───────────────────────── live sync ─────────────────────────

  /** (Re)start listening. Safe to call repeatedly; restarts only when the mode changes. */
  start(asAdmin: boolean): void {
    const mode: ListenMode = this.opts.scope === 'public' && this.opts.gateActive && !asAdmin ? 'gated' : 'all';
    if (this.unsub && this.mode === mode) return;
    this.stop(false);
    this.mode = mode;

    const ref = collection(db, this.name);
    let q: Query<DocumentData> = ref;
    if (this.opts.buildQuery) q = this.opts.buildQuery(ref);
    else if (mode === 'gated') q = query(ref, where('isActive', '==', true));

    this.unsub = onSnapshot(
      q,
      (snap) => {
        this.items = snap.docs.map(
          (d) => ({ ...(normalize(d.data({ serverTimestamps: 'estimate' })) as object), id: d.id }) as Stored<T>,
        );
        this.loaded = true;
        this.touch();
      },
      (err) => {
        // Most commonly: rules not deployed yet / signed-out user hitting an admin collection.
        console.warn(`[db] listener for "${this.name}" stopped:`, (err as Error).message);
      },
    );
  }

  /** Stop listening; optionally drop cached data (always do this on sign-out). */
  stop(clear = true): void {
    this.unsub?.();
    this.unsub = null;
    this.mode = null;
    if (clear) {
      this.items = [];
      this.loaded = false;
      this.touch();
    }
  }

  private touch(): void {
    this.version += 1;
    emitDbUpdate(this.name);
  }

  // ───────────────────────── writes ─────────────────────────

  /** Create or fully replace a document. */
  put(item: T): T {
    const existing = this.items.find((i) => i.id === item.id);
    const stamped: Stored<T> = {
      ...item,
      createdAtMs: existing?.createdAtMs ?? Date.now(),
      order: (item as Meta).order ?? existing?.order ?? (this.opts.ordered ? this.topOrder() : undefined),
    };
    this.items = [stamped, ...this.items.filter((i) => i.id !== item.id)];
    this.touch();
    this.track('write', setDoc(doc(db, this.name, item.id), stripId(stamped as DocumentData)));
    return stamped;
  }

  /** Merge fields into an existing document and return the updated record. */
  patch(id: string, changes: Partial<T>): T {
    const current = this.find(id);
    if (!current) throw new Error('Record not found');
    const merged = { ...current, ...changes, id } as Stored<T>;

    const wasLocal = !this.items.some((i) => i.id === id); // bundled fallback item, not in Firestore yet
    this.items = [merged, ...this.items.filter((i) => i.id !== id)];
    this.touch();

    const payload = (wasLocal ? merged : changes) as DocumentData;
    this.track('update', setDoc(doc(db, this.name, id), stripId(payload), { merge: true }));
    return merged;
  }

  remove(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
    this.touch();
    this.track('delete', deleteDoc(doc(db, this.name, id)));
  }

  private topOrder(): number {
    const orders = this.items.map((i) => i.order).filter((o): o is number => typeof o === 'number');
    return orders.length ? Math.min(...orders) - 1 : 0;
  }

  private track(op: string, promise: Promise<unknown>): void {
    promise.catch((err) => reportDbError(`${op} ${this.name}`, err));
  }
}

function stripId(data: DocumentData): DocumentData {
  const { id: _id, ...rest } = data;
  return rest;
}
