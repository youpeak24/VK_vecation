import { initializeAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';
import { app } from './client';

/**
 * Google Analytics 4 via Firebase.
 *  - Only runs in production builds on a real hostname (no dev / localhost noise).
 *  - Page views are sent manually on every SPA route change (see RouteTracker).
 *  - Admin screens are never tracked.
 *  - Opt out with VITE_FIREBASE_ANALYTICS=false.
 */
let analytics: Analytics | null = null;
let initPromise: Promise<Analytics | null> | null = null;

function shouldTrack(): boolean {
  if (typeof window === 'undefined') return false;
  if (!import.meta.env.PROD) return false;
  if (import.meta.env.VITE_FIREBASE_ANALYTICS === 'false') return false;
  return !['localhost', '127.0.0.1'].includes(window.location.hostname);
}

export function initAnalytics(): Promise<Analytics | null> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    if (!shouldTrack()) return null;
    try {
      if (!(await isSupported())) return null; // blocked cookies / unsupported browser
      analytics = initializeAnalytics(app, { config: { send_page_view: false } });
      return analytics;
    } catch {
      return null;
    }
  })();
  return initPromise;
}

type EventParams = Record<string, string | number | boolean | undefined>;

export async function trackEvent(name: string, params?: EventParams): Promise<void> {
  const instance = await initAnalytics();
  if (!instance) return;
  try {
    logEvent(instance, name, params);
  } catch {
    /* analytics must never break the app */
  }
}

export function trackPageView(path: string, title: string): void {
  if (path.startsWith('/admin')) return;
  void trackEvent('page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}
