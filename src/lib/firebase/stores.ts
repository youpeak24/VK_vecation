import { limit, orderBy, query } from 'firebase/firestore';
import type {
  AuditLogRecord,
  BookingRecord,
  ContactSubmission,
  Customer,
  DepartureRecord,
  Destination,
  EnquiryRecord,
  FollowUpRecord,
  InvoiceRecord,
  LeadRecord,
  PaymentRecord,
  RefundRecord,
  SEOMetadata,
  StaffRecord,
  SupplierRecord,
  TemplePackage,
  TourPackage,
  WebsiteBanner,
} from '../../types';
import { TOUR_PACKAGES } from '../../data/packages';
import { TEMPLE_PACKAGES } from '../../data/templePackages';
import { DESTINATIONS } from '../../data/destinations';
import { SCHEDULED_DEPARTURES } from '../../data/departures';
import { SEED_BANNERS, SEED_SEO } from '../../data/cms';
import { COLLECTIONS } from './collections';
import { CollectionStore } from './store';

/**
 * One store per Firestore collection.
 *   public : website content, listened to for every visitor (drafts hidden)
 *   admin  : operational data, listened to only while an admin is signed in
 */
export const stores = {
  // ── public website content (falls back to bundled data until seeded) ──
  packages: new CollectionStore<TourPackage>({
    name: COLLECTIONS.packages,
    scope: 'public',
    gateActive: true,
    ordered: true,
    fallback: () => TOUR_PACKAGES,
  }),
  templePackages: new CollectionStore<TemplePackage>({
    name: COLLECTIONS.templePackages,
    scope: 'public',
    gateActive: true,
    ordered: true,
    fallback: () => TEMPLE_PACKAGES,
  }),
  destinations: new CollectionStore<Destination>({
    name: COLLECTIONS.destinations,
    scope: 'public',
    gateActive: true,
    ordered: true,
    fallback: () => DESTINATIONS,
  }),
  departures: new CollectionStore<DepartureRecord>({
    name: COLLECTIONS.departures,
    scope: 'public',
    ordered: true,
    fallback: () => SCHEDULED_DEPARTURES,
  }),
  banners: new CollectionStore<WebsiteBanner>({
    name: COLLECTIONS.banners,
    scope: 'public',
    ordered: true,
    fallback: () => SEED_BANNERS,
  }),
  seo: new CollectionStore<SEOMetadata & { id: string }>({
    name: COLLECTIONS.seo,
    scope: 'public',
    ordered: true,
    fallback: () => SEED_SEO as (SEOMetadata & { id: string })[],
  }),

  // ── admin-only operational data ──
  enquiries: new CollectionStore<EnquiryRecord>({ name: COLLECTIONS.enquiries, scope: 'admin' }),
  contactSubmissions: new CollectionStore<ContactSubmission>({ name: COLLECTIONS.contactSubmissions, scope: 'admin' }),
  customers: new CollectionStore<Customer>({ name: COLLECTIONS.customers, scope: 'admin' }),
  leads: new CollectionStore<LeadRecord>({ name: COLLECTIONS.leads, scope: 'admin' }),
  followUps: new CollectionStore<FollowUpRecord>({ name: COLLECTIONS.followUps, scope: 'admin' }),
  bookings: new CollectionStore<BookingRecord>({ name: COLLECTIONS.bookings, scope: 'admin' }),
  payments: new CollectionStore<PaymentRecord>({ name: COLLECTIONS.payments, scope: 'admin' }),
  invoices: new CollectionStore<InvoiceRecord>({ name: COLLECTIONS.invoices, scope: 'admin' }),
  refunds: new CollectionStore<RefundRecord>({ name: COLLECTIONS.refunds, scope: 'admin' }),
  suppliers: new CollectionStore<SupplierRecord>({ name: COLLECTIONS.suppliers, scope: 'admin' }),
  staff: new CollectionStore<StaffRecord>({ name: COLLECTIONS.staff, scope: 'admin' }),
  auditLogs: new CollectionStore<AuditLogRecord>({
    name: COLLECTIONS.auditLogs,
    scope: 'admin',
    // Immutable, ever-growing log: only stream the most recent entries.
    buildQuery: (ref) => query(ref, orderBy('timestamp', 'desc'), limit(300)),
  }),
};

export const allStores = Object.values(stores) as CollectionStore<{ id: string }>[];
