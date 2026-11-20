/** Firestore collection names. Keep in sync with /firestore.rules. */
export const COLLECTIONS = {
  // Public website content (readable by everyone; `isActive` gates drafts)
  packages: 'packages',
  templePackages: 'templePackages',
  destinations: 'destinations',
  departures: 'departures',
  banners: 'banners',
  seo: 'seo',

  // Operational data (admins only; visitors may only *create* enquiries / contact messages)
  enquiries: 'enquiries',
  contactSubmissions: 'contactSubmissions',
  customers: 'customers',
  leads: 'leads',
  followUps: 'followUps',
  bookings: 'bookings',
  payments: 'payments',
  invoices: 'invoices',
  refunds: 'refunds',
  suppliers: 'suppliers',
  staff: 'staff',
  auditLogs: 'auditLogs',

  // Access control + bookkeeping
  admins: 'admins',
  meta: 'meta',
} as const;

/** Document in `meta` that records the one-time content seeding. */
export const CONTENT_META_DOC = 'content';
