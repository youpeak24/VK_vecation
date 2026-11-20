import { doc, onSnapshot } from 'firebase/firestore';
import { authService, type AuthState } from '../../services/auth';
import { db } from './client';
import { COLLECTIONS, CONTENT_META_DOC } from './collections';
import { setContentSeeded } from './contentState';
import { ensureContentSeeded } from './seed';
import { allStores } from './stores';

const publicStores = allStores.filter((s) => s.scope === 'public');
const adminStores = allStores.filter((s) => s.scope === 'admin');

let started = false;

/**
 * Wires Firestore to the app. Call once at startup.
 *  - Everyone: live website content (drafts hidden by the query + rules).
 *  - Authorised admin: additionally all operational collections; the content
 *    stores widen to include drafts, and site content is seeded on first use.
 *  - Sign-out: admin data is dropped from memory immediately.
 */
export function startDataSync(): void {
  if (started) return;
  started = true;

  // Has the site content been seeded? Controls bundled-vs-Firestore content.
  onSnapshot(
    doc(db, COLLECTIONS.meta, CONTENT_META_DOC),
    (snap) => {
      if (!snap.exists() && snap.metadata.fromCache) return setContentSeeded(null); // offline: unknown
      setContentSeeded(snap.exists());
    },
    () => setContentSeeded(null),
  );

  const apply = (auth: AuthState): void => {
    if (auth.user) {
      publicStores.forEach((s) => s.start(true));
      adminStores.forEach((s) => s.start(true));
      void ensureContentSeeded();
    } else {
      adminStores.forEach((s) => s.stop(true));
      publicStores.forEach((s) => s.start(false));
    }
  };

  apply(authService.getState());
  authService.subscribe(() => apply(authService.getState()));
}
