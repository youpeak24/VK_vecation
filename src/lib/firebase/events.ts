/**
 * Tiny pub/sub over window events so that both the legacy admin pages
 * (`window.addEventListener('vk_db_update')`) and React hooks stay in sync
 * with the Firestore-backed stores.
 */
export const DB_UPDATE_EVENT = 'vk_db_update';
export const DB_ERROR_EVENT = 'vk_db_error';

const pending = new Set<string>();

/** Coalesces bursts of snapshot updates into one event per collection per tick. */
export function emitDbUpdate(key: string): void {
  if (typeof window === 'undefined') return;
  if (pending.has(key)) return;
  pending.add(key);
  queueMicrotask(() => {
    pending.delete(key);
    window.dispatchEvent(new CustomEvent(DB_UPDATE_EVENT, { detail: { key } }));
  });
}

export function subscribeDb(callback: () => void): () => void {
  window.addEventListener(DB_UPDATE_EVENT, callback);
  return () => window.removeEventListener(DB_UPDATE_EVENT, callback);
}

/** Turns a Firebase error into a message safe to show to a person. */
export function friendlyFirebaseError(err: unknown): string {
  const code = (err as { code?: string } | null)?.code ?? '';
  switch (code) {
    case 'permission-denied':
    case 'firestore/permission-denied':
      return 'You do not have permission to do that.';
    case 'unavailable':
    case 'firestore/unavailable':
    case 'auth/network-request-failed':
      return 'Network problem. Please check your connection and try again.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-email':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    default:
      return err instanceof Error && err.message ? err.message : 'Something went wrong. Please try again.';
  }
}

/** Surfaces a failed background write (shown by <DbErrorBanner /> in the admin layout). */
export function reportDbError(operation: string, err: unknown): void {
  console.error(`[db] ${operation} failed:`, err);
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(DB_ERROR_EVENT, { detail: { operation, message: friendlyFirebaseError(err) } }),
  );
}
