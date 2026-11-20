import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase/client';
import { COLLECTIONS } from '../lib/firebase/collections';
import { friendlyFirebaseError } from '../lib/firebase/events';
import type { AdminUser } from '../types';

/**
 * Staff authentication.
 *
 * Signing in with Firebase Auth is NOT enough to enter the admin console: a
 * matching document must exist at `admins/{uid}` (created by a Super Admin or
 * in the Firebase console). Firestore security rules enforce the same check
 * server-side, so the UI guard below is only a convenience.
 */

const ROLES: AdminUser['role'][] = ['Super Admin', 'Tour Manager', 'Sales Specialist', 'Accounts Executive'];

export interface AuthState {
  user: AdminUser | null;
  /** False until Firebase has restored (or ruled out) a saved session. */
  ready: boolean;
}

type ProfileResult = { status: 'ok'; user: AdminUser } | { status: 'denied' } | { status: 'error'; error: unknown };

class AuthMessage extends Error {}

const NOT_AUTHORISED = 'This account is not authorised to access the admin console.';

let state: AuthState = { user: null, ready: false };
const listeners = new Set<() => void>();

function setState(next: AuthState): void {
  state = next;
  listeners.forEach((listener) => listener());
}

function initialsAvatar(name: string): string {
  const initials =
    name
      .split(/\s+/)
      .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ''))
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]!.toUpperCase())
      .join('') || 'VK';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#0866D9"/>` +
    `<text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#fff">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

async function loadAdminProfile(user: User): Promise<ProfileResult> {
  try {
    const snap = await getDoc(doc(db, COLLECTIONS.admins, user.uid));
    if (!snap.exists()) return { status: 'denied' };
    const data = snap.data();
    if (data.active === false) return { status: 'denied' };

    const name = String(data.name || user.displayName || user.email || 'Staff');
    const role = ROLES.includes(data.role) ? (data.role as AdminUser['role']) : 'Sales Specialist';
    return {
      status: 'ok',
      user: {
        id: user.uid,
        name,
        email: user.email ?? String(data.email ?? ''),
        role,
        avatar: typeof data.avatar === 'string' && data.avatar ? data.avatar : initialsAvatar(name),
      },
    };
  } catch (error) {
    // Rules answer "permission-denied" for signed-in users with no admins/{uid} doc.
    if ((error as { code?: string }).code === 'permission-denied') return { status: 'denied' };
    return { status: 'error', error };
  }
}

// Restore / track the session for the whole app lifetime.
onAuthStateChanged(auth, async (firebaseUser) => {
  if (!firebaseUser) {
    setState({ user: null, ready: true });
    return;
  }
  const result = await loadAdminProfile(firebaseUser);
  if (result.status === 'ok') {
    setState({ user: result.user, ready: true });
    return;
  }
  if (result.status === 'denied') await signOut(auth).catch(() => undefined);
  setState({ user: null, ready: true });
});

export const authService = {
  async login(email: string, password: string): Promise<AdminUser> {
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const result = await loadAdminProfile(credential.user);
      if (result.status !== 'ok') {
        await signOut(auth).catch(() => undefined);
        throw new AuthMessage(
          result.status === 'denied' ? NOT_AUTHORISED : friendlyFirebaseError(result.error),
        );
      }
      setState({ user: result.user, ready: true });
      return result.user;
    } catch (error) {
      if (error instanceof AuthMessage) throw error;
      throw new Error(friendlyFirebaseError(error));
    }
  },

  /** Sends a password-reset email. Never reveals whether the address has an account. */
  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code === 'auth/user-not-found') return;
      throw new Error(friendlyFirebaseError(error));
    }
  },

  async logout(): Promise<void> {
    setState({ user: null, ready: true }); // lock the UI immediately
    await signOut(auth).catch(() => undefined);
  },

  getState(): AuthState {
    return state;
  },

  getCurrentUser(): AdminUser | null {
    return state.user;
  },

  isAuthenticated(): boolean {
    return state.user !== null;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
