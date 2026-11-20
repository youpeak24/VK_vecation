import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  type Firestore,
} from 'firebase/firestore';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { appCheckSiteKey, firebaseConfig, useEmulators } from './config';

export const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// App Check (optional): blocks traffic that does not come from the real site.
// Must be initialised before Firestore/Auth are used.
if (appCheckSiteKey && typeof window !== 'undefined') {
  if (import.meta.env.DEV) {
    (self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch {
    /* already initialised (HMR) */
  }
}

function createFirestore(): Firestore {
  try {
    return initializeFirestore(app, {
      // In-memory cache only: admin data (customer PII) must never be written to
      // IndexedDB on a shared computer. The public site falls back to bundled data.
      localCache: memoryLocalCache(),
      // Firestore rejects `undefined`; drop such fields instead of throwing.
      ignoreUndefinedProperties: true,
      // Some corporate networks / proxies break WebChannel streaming.
      experimentalAutoDetectLongPolling: true,
    });
  } catch {
    // Already initialised (e.g. Vite HMR re-evaluating this module).
    return getFirestore(app);
  }
}

export const db: Firestore = createFirestore();
export const auth: Auth = getAuth(app);

if (useEmulators) {
  try {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  } catch {
    /* already connected (HMR) */
  }
}
