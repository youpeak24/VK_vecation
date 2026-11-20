/**
 * Firebase web-app configuration.
 *
 * These values identify the Firebase project; they are NOT secrets. Access is
 * enforced by Firestore Security Rules (see /firestore.rules), never by hiding
 * this config. Every value can be overridden per-environment with VITE_FIREBASE_*
 * variables (see .env.example); the defaults below point at the production project.
 */
const env = import.meta.env;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyDBwSLnYZIjS_jYbBtpMKdpGMOwNgvU31k',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'vkvacation-acca7.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'vkvacation-acca7',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'vkvacation-acca7.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '89528939487',
  appId: env.VITE_FIREBASE_APP_ID || '1:89528939487:web:feae2ddb2cc306a0d04a6a',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'G-3CLESK3P58',
} as const;

/** Optional reCAPTCHA v3 site key. When set, Firebase App Check is enabled. */
export const appCheckSiteKey: string | undefined = env.VITE_FIREBASE_APPCHECK_SITE_KEY || undefined;

/** Point the app at the local Firebase Emulator Suite (npm run emulators). */
export const useEmulators = env.VITE_USE_FIREBASE_EMULATOR === 'true';
