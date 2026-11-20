import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../lib/firebase/analytics';

/** Sends a GA4 page_view on every client-side route change (SPAs don't reload the page). */
export const RouteTracker: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Wait briefly so lazy-loaded pages can set their <title> first.
    const timer = window.setTimeout(() => trackPageView(pathname + search, document.title), 500);
    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  return null;
};

export default RouteTracker;
