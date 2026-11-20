import type {
  BookingRecord,
  Customer,
  ContactSubmission,
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
} from '../types';
import { newId, newReference } from '../lib/ids';
import type { CollectionStore } from '../lib/firebase/store';
import { stores } from '../lib/firebase/stores';
import { authService } from './auth';

/**
 * Universal data API for the public website and the admin console.
 *
 * Backed by Firestore through real-time stores (see src/lib/firebase):
 *   - reads are synchronous and served from the live in-memory cache,
 *   - writes apply instantly and are persisted to Firestore,
 *   - every change fires `vk_db_update`, which the admin pages already listen to.
 */

const today = (): string => new Date().toISOString().split('T')[0];

function require_<T extends { id: string }>(store: CollectionStore<T>, id: string, label: string): T {
  const record = store.find(id);
  if (!record) throw new Error(`${label} not found`);
  return record;
}

/** Immutable audit trail entry attributed to the signed-in staff member. */
function recordAudit(action: string, module: string, targetId: string, details: string): void {
  const user = authService.getCurrentUser();
  if (!user) return; // only authenticated staff actions are audited
  try {
    stores.auditLogs.put({
      id: newId('log'),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action,
      module,
      targetId,
      details,
      ipAddress: '—', // not observable from a browser
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Audit log error:', error);
  }
}

export const api = {
  // --- PACKAGES ---
  packages: {
    getAll(): TourPackage[] {
      return stores.packages.getAll();
    },
    getBySlug(slug: string): TourPackage | undefined {
      return stores.packages.snapshot().find((p) => p.slug === slug);
    },
    getById(id: string): TourPackage | undefined {
      return stores.packages.find(id);
    },
    create(data: Omit<TourPackage, 'id'>): TourPackage {
      const created = stores.packages.put({ ...data, id: newId('pkg'), isActive: data.isActive ?? true } as TourPackage);
      recordAudit('CREATE', 'Packages', created.id, `Created tour package "${created.title}"`);
      return created;
    },
    update(id: string, data: Partial<TourPackage>): TourPackage {
      require_(stores.packages, id, 'Package');
      const updated = stores.packages.patch(id, data);
      recordAudit('UPDATE', 'Packages', id, `Updated tour package "${updated.title}"`);
      return updated;
    },
    delete(id: string): void {
      stores.packages.remove(id);
      recordAudit('DELETE', 'Packages', id, `Deleted tour package id ${id}`);
    },
  },

  // --- TEMPLE PACKAGES ---
  templePackages: {
    getAll(): TemplePackage[] {
      return stores.templePackages.getAll();
    },
    getBySlug(slug: string): TemplePackage | undefined {
      return stores.templePackages.snapshot().find((t) => t.slug === slug);
    },
    getById(id: string): TemplePackage | undefined {
      return stores.templePackages.find(id);
    },
    create(data: Omit<TemplePackage, 'id'>): TemplePackage {
      const created = stores.templePackages.put({
        ...data,
        id: newId('tmpl'),
        isActive: data.isActive ?? true,
      } as TemplePackage);
      recordAudit('CREATE', 'Temple Packages', created.id, `Created temple package "${created.title}"`);
      return created;
    },
    update(id: string, data: Partial<TemplePackage>): TemplePackage {
      require_(stores.templePackages, id, 'Temple package');
      const updated = stores.templePackages.patch(id, data);
      recordAudit('UPDATE', 'Temple Packages', id, `Updated temple package "${updated.title}"`);
      return updated;
    },
    delete(id: string): void {
      stores.templePackages.remove(id);
      recordAudit('DELETE', 'Temple Packages', id, `Deleted temple package id ${id}`);
    },
  },

  // --- DESTINATIONS ---
  destinations: {
    getAll(): Destination[] {
      return stores.destinations.getAll();
    },
    getBySlug(slug: string): Destination | undefined {
      return stores.destinations.snapshot().find((d) => d.slug === slug);
    },
    create(data: Omit<Destination, 'id'>): Destination {
      const created = stores.destinations.put({ ...data, id: newId('dest'), isActive: true } as Destination);
      recordAudit('CREATE', 'Destinations', created.id, `Created destination "${created.name}"`);
      return created;
    },
    update(id: string, data: Partial<Destination>): Destination {
      require_(stores.destinations, id, 'Destination');
      const updated = stores.destinations.patch(id, data);
      recordAudit('UPDATE', 'Destinations', id, `Updated destination "${updated.name}"`);
      return updated;
    },
    delete(id: string): void {
      stores.destinations.remove(id);
      recordAudit('DELETE', 'Destinations', id, `Deleted destination id ${id}`);
    },
  },

  // --- DEPARTURES ---
  departures: {
    getAll(): DepartureRecord[] {
      return stores.departures.getAll();
    },
    create(data: Omit<DepartureRecord, 'id'>): DepartureRecord {
      const created = stores.departures.put({ ...data, id: newId('dep') } as DepartureRecord);
      recordAudit('CREATE', 'Departures', created.id, `Created departure "${created.title}" Ex-${created.departureCity}`);
      return created;
    },
    update(id: string, data: Partial<DepartureRecord>): DepartureRecord {
      require_(stores.departures, id, 'Departure');
      const updated = stores.departures.patch(id, data);
      recordAudit('UPDATE', 'Departures', id, `Updated departure "${updated.title}"`);
      return updated;
    },
    delete(id: string): void {
      stores.departures.remove(id);
      recordAudit('DELETE', 'Departures', id, `Deleted departure id ${id}`);
    },
  },

  // --- CUSTOMERS ---
  customers: {
    getAll(): Customer[] {
      return stores.customers.getAll();
    },
    getById(id: string): Customer | undefined {
      return stores.customers.find(id);
    },
    create(data: Omit<Customer, 'id' | 'createdAt'>): Customer {
      const created = stores.customers.put({ ...data, id: newId('cust'), createdAt: today() } as Customer);
      recordAudit('CREATE', 'Customers', created.id, `Added customer "${created.name}"`);
      return created;
    },
    update(id: string, data: Partial<Customer>): Customer {
      require_(stores.customers, id, 'Customer');
      const updated = stores.customers.patch(id, data);
      recordAudit('UPDATE', 'Customers', id, `Updated customer "${updated.name}"`);
      return updated;
    },
    delete(id: string): void {
      stores.customers.remove(id);
      recordAudit('DELETE', 'Customers', id, `Removed customer ${id}`);
    },
  },

  // --- ENQUIRIES (created by website visitors via inquiryService) ---
  enquiries: {
    getAll(): EnquiryRecord[] {
      return stores.enquiries.getAll();
    },
    updateStatus(id: string, status: EnquiryRecord['status'], notes?: string): EnquiryRecord {
      const current = require_(stores.enquiries, id, 'Enquiry');
      const updated = stores.enquiries.patch(id, {
        status,
        ...(notes ? { notes } : {}),
        updatedAt: new Date().toISOString(),
      });
      recordAudit('UPDATE', 'Enquiries', current.referenceNumber || id, `Status updated to ${status}`);
      return updated;
    },
    assignStaff(id: string, staffName: string): EnquiryRecord {
      const current = require_(stores.enquiries, id, 'Enquiry');
      const updated = stores.enquiries.patch(id, { assignedTo: staffName, updatedAt: new Date().toISOString() });
      recordAudit('UPDATE', 'Enquiries', current.referenceNumber || id, `Assigned to ${staffName}`);
      return updated;
    },
    update(id: string, data: Partial<EnquiryRecord>): EnquiryRecord {
      require_(stores.enquiries, id, 'Enquiry');
      return stores.enquiries.patch(id, { ...data, updatedAt: new Date().toISOString() });
    },
  },

  // --- CONTACT SUBMISSIONS (created by website visitors via inquiryService) ---
  contactSubmissions: {
    getAll(): ContactSubmission[] {
      return stores.contactSubmissions.getAll();
    },
    updateStatus(id: string, status: ContactSubmission['status'], replyNotes?: string): ContactSubmission {
      require_(stores.contactSubmissions, id, 'Submission');
      return stores.contactSubmissions.patch(id, { status, ...(replyNotes ? { replyNotes } : {}) });
    },
  },

  // --- LEADS CRM ---
  leads: {
    getAll(): LeadRecord[] {
      return stores.leads.getAll();
    },
    create(data: Omit<LeadRecord, 'id' | 'createdAt'>): LeadRecord {
      const created = stores.leads.put({ ...data, id: newId('lead'), createdAt: today() } as LeadRecord);
      recordAudit('CREATE', 'Leads', created.id, `Created sales lead "${created.title}" (₹${created.dealValue})`);
      return created;
    },
    updateStage(id: string, stage: LeadRecord['stage']): LeadRecord {
      require_(stores.leads, id, 'Lead');
      const updated = stores.leads.patch(id, { stage });
      recordAudit('UPDATE', 'Leads', id, `Lead stage changed to ${stage}`);
      return updated;
    },
    update(id: string, data: Partial<LeadRecord>): LeadRecord {
      require_(stores.leads, id, 'Lead');
      return stores.leads.patch(id, data);
    },
    delete(id: string): void {
      stores.leads.remove(id);
      recordAudit('DELETE', 'Leads', id, `Deleted lead ${id}`);
    },
  },

  // --- FOLLOW-UPS ---
  followUps: {
    getAll(): FollowUpRecord[] {
      return stores.followUps.getAll();
    },
    create(data: Omit<FollowUpRecord, 'id' | 'createdAt'>): FollowUpRecord {
      return stores.followUps.put({ ...data, id: newId('fol'), createdAt: today() } as FollowUpRecord);
    },
    toggleComplete(id: string): FollowUpRecord {
      const current = require_(stores.followUps, id, 'Follow up');
      return stores.followUps.patch(id, { status: current.status === 'Completed' ? 'Pending' : 'Completed' });
    },
    update(id: string, data: Partial<FollowUpRecord>): FollowUpRecord {
      require_(stores.followUps, id, 'Follow up');
      return stores.followUps.patch(id, data);
    },
    delete(id: string): void {
      stores.followUps.remove(id);
    },
  },

  // --- BOOKINGS ---
  bookings: {
    getAll(): BookingRecord[] {
      return stores.bookings.getAll();
    },
    getById(id: string): BookingRecord | undefined {
      return stores.bookings.snapshot().find((b) => b.id === id || b.bookingReference === id);
    },
    create(data: Omit<BookingRecord, 'id' | 'bookingReference' | 'createdAt'>): BookingRecord {
      const reference = newReference('VK-BK');
      const created = stores.bookings.put({
        ...data,
        id: newId('bkg'),
        bookingReference: reference,
        createdAt: today(),
      } as BookingRecord);
      recordAudit('CREATE', 'Bookings', reference, `Created booking for ${created.customerName} (${created.packageTitle})`);
      return created;
    },
    updateStatus(id: string, status: BookingRecord['status']): BookingRecord {
      require_(stores.bookings, id, 'Booking');
      const updated = stores.bookings.patch(id, { status, bookingStatus: status });
      recordAudit('UPDATE', 'Bookings', updated.bookingReference, `Booking status changed to ${status}`);
      return updated;
    },
    update(id: string, data: Partial<BookingRecord>): BookingRecord {
      require_(stores.bookings, id, 'Booking');
      return stores.bookings.patch(id, data);
    },
  },

  // --- PAYMENTS ---
  payments: {
    getAll(): PaymentRecord[] {
      return stores.payments.getAll();
    },
    create(data: Omit<PaymentRecord, 'id' | 'paymentRef' | 'date'>): PaymentRecord {
      const reference = newReference('PAY');
      const created = stores.payments.put({ ...data, id: newId('pay'), paymentRef: reference, date: today() } as PaymentRecord);
      recordAudit('CREATE', 'Payments', reference, `Received payment ₹${created.amount} for ${created.bookingRef}`);
      return created;
    },
  },

  // --- INVOICES ---
  invoices: {
    getAll(): InvoiceRecord[] {
      return stores.invoices.getAll();
    },
    create(data: Omit<InvoiceRecord, 'id' | 'invoiceNumber' | 'issuedDate'>): InvoiceRecord {
      const invoiceNumber = newReference('VK-INV');
      const created = stores.invoices.put({
        ...data,
        id: newId('inv'),
        invoiceNumber,
        issuedDate: today(),
      } as InvoiceRecord);
      recordAudit('CREATE', 'Invoices', invoiceNumber, `Issued invoice ${invoiceNumber} (₹${created.totalAmount})`);
      return created;
    },
  },

  // --- REFUNDS ---
  refunds: {
    getAll(): RefundRecord[] {
      return stores.refunds.getAll();
    },
    create(data: Omit<RefundRecord, 'id' | 'refundRef' | 'requestedDate'>): RefundRecord {
      const reference = newReference('REF');
      const created = stores.refunds.put({
        ...data,
        id: newId('ref'),
        refundRef: reference,
        requestedDate: today(),
      } as RefundRecord);
      recordAudit('CREATE', 'Refunds', reference, `Refund requested for ${created.bookingRef} (₹${created.requestedAmount})`);
      return created;
    },
    updateStatus(id: string, status: RefundRecord['status'], approvedBy?: string): RefundRecord {
      const current = require_(stores.refunds, id, 'Refund');
      const updated = stores.refunds.patch(id, {
        status,
        ...(approvedBy ? { approvedBy } : {}),
        ...(status === 'Processed' ? { processedDate: today() } : {}),
      });
      recordAudit('UPDATE', 'Refunds', current.refundRef || id, `Refund status updated to ${status}`);
      return updated;
    },
    update(id: string, data: Partial<RefundRecord>): RefundRecord {
      require_(stores.refunds, id, 'Refund');
      return stores.refunds.patch(id, data);
    },
  },

  // --- SUPPLIERS ---
  suppliers: {
    getAll(): SupplierRecord[] {
      return stores.suppliers.getAll();
    },
    create(data: Omit<SupplierRecord, 'id'>): SupplierRecord {
      const created = stores.suppliers.put({ ...data, id: newId('sup') } as SupplierRecord);
      recordAudit('CREATE', 'Suppliers', created.id, `Added supplier "${created.name}"`);
      return created;
    },
    update(id: string, data: Partial<SupplierRecord>): SupplierRecord {
      require_(stores.suppliers, id, 'Supplier');
      return stores.suppliers.patch(id, data);
    },
  },

  // --- STAFF DIRECTORY (sign-in access is managed separately in `admins/{uid}`) ---
  staff: {
    getAll(): StaffRecord[] {
      return stores.staff.getAll();
    },
    create(data: Omit<StaffRecord, 'id' | 'joinedDate'>): StaffRecord {
      const created = stores.staff.put({ ...data, id: newId('stf'), joinedDate: today() } as StaffRecord);
      recordAudit('CREATE', 'Staff', created.id, `Added staff member "${created.name}"`);
      return created;
    },
    update(id: string, data: Partial<StaffRecord>): StaffRecord {
      require_(stores.staff, id, 'Staff member');
      return stores.staff.patch(id, data);
    },
  },

  // --- AUDIT LOGS (read-only; entries are immutable) ---
  auditLogs: {
    getAll() {
      return stores.auditLogs.getAll();
    },
  },

  // --- WEBSITE CMS ---
  website: {
    getBanners(): WebsiteBanner[] {
      return stores.banners.getAll();
    },
    createBanner(data: Omit<WebsiteBanner, 'id'>): WebsiteBanner {
      return stores.banners.put({ ...data, id: newId('bnr') } as WebsiteBanner);
    },
    updateBanner(id: string, data: Partial<WebsiteBanner>): WebsiteBanner {
      require_(stores.banners, id, 'Banner');
      return stores.banners.patch(id, data);
    },
    getSEO(): SEOMetadata[] {
      return stores.seo.getAll();
    },
    updateSEO(route: string, data: Partial<SEOMetadata>): SEOMetadata {
      const match = stores.seo.snapshot().find((s) => s.route === route || s.pagePath === route);
      if (!match) throw new Error('SEO meta not found');
      return stores.seo.patch(match.id, data);
    },
  },

  // --- ANALYTICS / REPORTS ---
  reports: {
    getOverviewMetrics() {
      const bookings = stores.bookings.snapshot();
      const enquiries = stores.enquiries.snapshot();
      const converted = enquiries.filter((e) => e.status === 'Converted').length;
      return {
        totalRevenue: bookings.reduce((sum, b) => sum + (b.paidAmount || 0), 0),
        totalBookingsCount: bookings.length,
        activeEnquiriesCount: enquiries.filter((e) => e.status === 'New' || e.status === 'In Review').length,
        totalCustomersCount: stores.customers.snapshot().length,
        pendingFollowUps: stores.followUps.snapshot().filter((f) => f.status === 'Pending').length,
        conversionRate: enquiries.length ? Math.round((converted / enquiries.length) * 1000) / 10 : 0,
      };
    },
  },
};
